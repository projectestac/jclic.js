/**
 *  File    : bags/MediaBagElement.js
 *  Created : 07/04/2015
 *  By      : Francesc Busquets <francesc@gmail.com>
 *
 *  JClic.js
 *  An HTML5 player of JClic activities
 *  https://projectestac.github.io/jclic.js
 *
 *  @source https://github.com/projectestac/jclic.js
 *
 *  @license EUPL-1.1
 *  @licstart
 *  (c) 2000-2016 Ministry of Education of Catalonia (http://xtec.cat)
 *
 *  Licensed under the EUPL, Version 1.1 or -as soon they will be approved by
 *  the European Commission- subsequent versions of the EUPL (the "Licence");
 *  You may not use this work except in compliance with the Licence.
 *
 *  You may obtain a copy of the Licence at:
 *  https://joinup.ec.europa.eu/software/page/eupl
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the Licence is distributed on an "AS IS" basis, WITHOUT
 *  WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 *  Licence for the specific language governing permissions and limitations
 *  under the Licence.
 *  @licend
 */

define([
  "jquery",
  "../Utils",
  "../AWT"
], function ($, Utils, AWT) {

  /**
   * This kind of objects are the components of {@link MediaBag}.
   *
   * Media elements have a name, a reference to a file (the `fileName` field) and, when initialized,
   * a `data` field pointing to a object containing the real media. They have also a flag indicating
   * if the data must be saved on the {@link JClicProject} zip file or just maintained as a reference
   * to an external file.
   * @exports MediaBagElement
   * @class
   * @param {string} basePath - Path to be used as a prefix of the file name
   * @param {string} fileName - The media file name
   * @param {external:JSZip=} zip - An optional JSZip object from which the file must be extracted.
   */
  var MediaBagElement = function (basePath, fileName, zip) {
    if (basePath)
      this.basePath = basePath;
    if (fileName) {
      this.fileName = Utils.nSlash(fileName);
      this.name = Utils.nSlash(fileName);
      this.ext = this.fileName.toLowerCase().split('.').pop();
      this.type = this.getFileType(this.ext);
      if (this.ext === 'gif')
        this.checkAnimatedGif();
    }
    if (zip)
      this.zip = zip;
    this.timeout = Date.now() + Utils.settings.LOAD_TIMEOUT;
  };

  MediaBagElement.prototype = {
    constructor: MediaBagElement,
    /**
     * The name of this element. Usually is the same as `fileName`
     * @type {string} */
    name: '',
    /**
     * The name of the file where this element is stored
     * @type {string} */
    fileName: '',
    /**
     * The path to be used as base to access this media element
     * @type {string} */
    basePath: '',
    /**
     * An optional JSZip object that can act as a container of this media
     * @type {external:JSZip} */
    zip: null,
    /**
     * When loaded, this field will store the realized media object
     * @type {object} */
    data: null,
    /**
     * Flag indicating that `data` is ready to be used
     * @type {boolean} */
    ready: false,
    /**
     * Array of callback methods to be called when the resource becomes ready
     * @type {function[]} */
    _whenReady: null,
    /**
     * Normalized extension of `fileName`, useful to determine the media type
     * @type {string} */
    ext: '',
    /**
     * The resource type ('audio', 'image', 'midi', 'video', 'font')
     * @type {string} */
    type: null,
    /**
     * Time set to load the resource before leaving
     * @type {number} */
    timeout: 0,
    //
    /**
     * Flag used for animated GIFs
     * @type {boolean} */
    animated: false,
    /**
     * Full path obtained after a successful call to getFullPathPromise
     * @type {string}
     */
    _fullPath: null,
    //
    // Other fields present in JClic, currently not used:
    // usageCount: 0,
    // projectFlag: false,
    // saveFlag: true,
    // hasThumb: false,
    //
    /**
     *
     * Loads this object settings from a specific JQuery XML element
     * @param {external:jQuery} $xml - The XML element to parse
     */
    setProperties: function ($xml) {
      this.name = Utils.nSlash($xml.attr('name'));
      this.fileName = Utils.nSlash($xml.attr('file'));
      this.ext = this.fileName.toLowerCase().split('.').pop();
      this.type = this.getFileType(this.ext);
      // Check if it's an animated GIF
      if (this.ext === 'gif') {
        var anim = $xml.attr('animated');
        if (typeof anim === 'undefined')
          this.checkAnimatedGif();
        else
          this.animated = anim === 'true';
      }
      return this;
    },
    /**
     * Checks if the image associated with this MediaBagElement is an animated GIF
     *
     * Based on: {@link https://gist.github.com/marckubischta/261ad8427a214022890b}
     * Thanks to `@lakenen` and `@marckubischta`
     */
    checkAnimatedGif: function () {
      var mbe = this;
      var request = new XMLHttpRequest();
      request.responseType = 'arraybuffer';
      request.addEventListener('load', function () {
        var arr = new Uint8Array(request.response),
            i, len, length = arr.length, frames = 0;

        // make sure it's a gif (GIF8)
        if (arr[0] !== 0x47 || arr[1] !== 0x49 ||
            arr[2] !== 0x46 || arr[3] !== 0x38) {
          mbe.animated = false;
          return;
        }

        //ported from PHP [http://www.php.net/manual/en/function.imagecreatefromgif.php#104473]
        //an animated gif contains multiple "frames", with each frame having a
        //header made up of:
        // * a static 3-byte sequence (\x00\x21\xF9
        // * one byte indicating the length of the header (usually \x04)
        // * variable length header (usually 4 bytes)
        // * a static 2-byte sequence (\x00\x2C) (some variants may use \x00\x21 ?)
        // We read through the file as long as we haven't reached the end of the file
        // and we haven't yet found at least 2 frame headers
        for (i = 0, len = length - 3; i < len && frames < 2; ++i) {
          if (arr[i] === 0x00 && arr[i + 1] === 0x21 && arr[i + 2] === 0xF9) {
            var blocklength = arr[i + 3];
            var afterblock = i + 4 + blocklength;
            if (afterblock + 1 < length &&
                arr[afterblock] === 0x00 &&
                (arr[afterblock + 1] === 0x2C || arr[afterblock + 1] === 0x21)) {
              if (++frames > 1) {
                mbe.animated = true;
                Utils.log('debug', 'Animated GIF detected: %s', mbe.fileName);
                break;
              }
            }
          }
        }
      });

      this.getFullPathPromise().then(function (fullPath) {
        request.open('GET', fullPath, true);
        request.send();
      });
    },
    /**
     *
     * Checks if the MediaBagElement has been initiated
     * @returns {boolean}
     */
    isEmpty: function () {
      return this.data === null;
    },
    /**
     *
     * Determines the type of a file from its extension
     * @param {string} ext - The file name extension
     * @returns {string}
     */
    getFileType: function (ext) {
      var result = null;
      for (var type in Utils.settings.FILE_TYPES) {
        if (Utils.settings.FILE_TYPES[type].indexOf(ext) >= 0)
          result = type;
      }
      return result;
    },
    /**
     *
     * Instantiates the media content
     * @param {function} callback - Callback method called when the referred resource is ready
     */
    build: function (callback) {
      var media = this;

      if (callback) {
        if (!this._whenReady)
          this._whenReady = [];
        this._whenReady.push(callback);
      }

      if (!media.data)
        media.getFullPathPromise().then(function (fullPath) {
          switch (media.type) {
            case 'font':
              var format = media.ext === 'ttf' ? 'truetype'
                  : media.ext === 'otf' ? 'embedded-opentype'
                  : media.ext;
              $('head').prepend(
                  '<style type="text/css">' +
                  '@font-face{font-family:"' + media.name + '";' +
                  'src:url(' + fullPath + ') format("' + format + '");}' +
                  '</style>');
              media.data = new AWT.Font(media.name);
              media.ready = true;
              break;

            case 'image':
              media.data = new Image();
              $(media.data).on('load', function () {
                media._onReady.call(media);
              });
              media.data.src = fullPath;
              break;

            case 'audio':
            case 'video':
              media.data = document.createElement(media.type);
              $(media.data).on('canplay', function () {
                media._onReady.call(media);
              });
              media.data.src = fullPath;
              media.data.pause();
              break;

            case 'anim':
              media.data = $('<object type"application/x-shockwave-flash" width="300" height="200" data="' + fullPath + '"/>').get(0);
              // Unable to check the loading progress in elements of type `object`. so we mark it always as `ready`:
              media.ready = true;
              break;

            case 'xml':
              media.data = '';
              media.ready = true;
              // Since we are not yet supporting complex skins, there
              // is no need to read XML files
              /*
               $.get(fullPath, null, null, 'xml')
               .done(function (data) {
               media.data = data;
               media._onReady();
               }).fail(function () {
               Utils.log('error', 'error loading %s', media.name);
               media.data = null;
               });
               */
              break;

            default:
              // TODO: Load the real resource
              return;
          }

          if (media.ready)
            media._onReady();
        });
      else if (media.ready)
        media._onReady();

      return this;
    },
    /**
     *
     * Checks if this media element is ready to start
     * @returns {Boolean} - `true` if ready, `false` otherwise
     */
    checkReady: function () {
      if (this.data && !this.ready) {
        switch (this.type) {
          case 'image':
            this.ready = this.data.complete === true;
            break;
          case 'audio':
          case 'video':
          case 'anim':
            this.ready = this.data.readyState >= 1;
            break;
          default:
            this.ready = true;
        }
      }
      return this.ready;
    },
    /**
     *
     * Checks if this resource has timed out.
     * @returns {Boolean} - `true` if the resource has exhausted the allowed time to load, `false` otherwise
     */
    checkTimeout: function () {
      var result = Date.now() > this.timeout;
      if (result)
        Utils.log('warn', 'Timeout while loading: %s', this.name);
      return result;
    },
    /**
     *
     * Notify listeners that the resource is ready
     */
    _onReady: function () {
      this.ready = true;
      if (this._whenReady) {
        for (var i = 0; i < this._whenReady.length; i++) {
          var callback = this._whenReady[i];
          callback.apply(this);
        }
        this._whenReady = null;
      }
    },
    /**
     *
     * Gets the full path of the file associated to this element.
     * WARNING: This function should be called only after a successful call to `getFullPathPromise`
     * @returns {string}
     */
    getFullPath: function () {
      return this._fullPath;
    },
    /**
     *
     * Gets a promise with the full path of the file associated to this element.
     * @returns {Promise}
     */
    getFullPathPromise: function () {
      var media = this;
      return new Promise(function (resolve, reject) {
        Utils.getPathPromise(media.basePath, media.fileName, media.zip).then(function (fullPath) {
          media._fullPath = fullPath;
          resolve(fullPath);
        }).catch(reject);
      });
    }
  };

  return MediaBagElement;

});
