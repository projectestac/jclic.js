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
 *  @license EUPL-1.2
 *  @licstart
 *  (c) 2000-2020 Educational Telematic Network of Catalonia (XTEC)
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
 *  @module
 */

/* global URL, Uint8Array, XMLHttpRequest, Image, document */

import $ from 'jquery';
import MidiAudioPlayer from '../media/MidiAudioPlayer';
import { log, settings, nSlash, getAttr, isEmpty, getPathPromise, parseXmlNode, appendStyleAtHead } from '../Utils';
import { Font } from '../AWT';

/**
 * This kind of objects are the components of {@link module:bags/MediaBag.MediaBag MediaBag}.
 *
 * Media elements have a name, a reference to a file (the `file` field) and, when initialized,
 * a `data` field pointing to a object containing the real media. They have also a flag indicating
 * if the data must be saved on the {@link module:project/JClicProject.JClicProject JClicProject} zip file or just maintained as a reference
 * to an external file.
 */
export class MediaBagElement {
  /**
   * MediaBagElement constructor
   * @param {string} basePath - Path to be used as a prefix of the file name
   * @param {string} file - The media file name
   * @param {external:JSZip} [zip] - An optional JSZip object from which the file must be extracted.
   */
  constructor(basePath, file, zip) {
    if (basePath)
      this.basePath = basePath;
    if (file) {
      this.file = nSlash(file);
      this.name = nSlash(file);
      this.ext = this.file.toLowerCase().split('.').pop();
      this.type = this.getFileType(this.ext);
      if (this.ext === 'gif')
        this.checkAnimatedGif();
    }
    if (zip)
      this.zip = zip;
    this.timeout = Date.now() + settings.LOAD_TIMEOUT;
  }


  /**
   * Private static array of {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement HTMLAudioElements},
   * to be reused between all media elements of type 'audio'. One for each priority level
   * @name module:bags/MediaBagElement#_audioPlayers
   * @type {external:HTMLAudioElement[]}
   */
  static _audioPlayers = [];

  /**
   * Gets the static {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement HTMLAudioElement}
   * associated to the requested priority level.
   * @param {number} level=1 - The priority level
   * @returns {external:HTMLAudioElement}
   */
  static getAudioPlayer(level = 1) {
    if (!MediaBagElement._audioPlayers[level])
      MediaBagElement._audioPlayers[level] = document.createElement('audio');
    return MediaBagElement._audioPlayers[level];
  }

  /**
   * Private static array of {@link bags/MediaBagElement MediaBagElements},
   * used to store a reference to the element using each `audioPlayer`
   * @name module:bags/MediaBagElement#_currentAudioElements
   * @type {bags/MediaBagElement[]}
   */
  static _currentAudioElements = [];

  /**
   * Clear all references to audio players and audio elements
   * To be called when a new activity starts
   */
  static resetAudioElements() {
    MediaBagElement._audioPlayers.fill(null);
    MediaBagElement._currentAudioElements.fill(null);
  }

  /**
   * Loads this object settings from a specific JQuery XML element
   * @param {external:jQuery} $xml - The XML element to parse
   */
  setProperties($xml) {
    this.name = nSlash($xml.attr('name'));
    this.file = nSlash($xml.attr('file'));
    this.ext = this.file.toLowerCase().split('.').pop();
    this.type = this.getFileType(this.ext);
    // Check if it's an animated GIF
    if (this.ext === 'gif') {
      const anim = $xml.attr('animated');
      if (typeof anim === 'undefined')
        this.checkAnimatedGif();
      else
        this.animated = anim === 'true';
    }
    if (this.type === 'font') {
      this.fontName = this.name === this.file && this.name.lastIndexOf('.') > 0 ?
        this.name.substring(0, this.name.lastIndexOf('.')) :
        this.name;
    }
    return this;
  }

  /**
   * Gets a object with the basic attributes needed to rebuild this instance excluding functions,
   * parent references, constants and also attributes retaining the default value.
   * The resulting object is commonly usued to serialize elements in JSON format.
   * @returns {object} - The resulting object, with minimal attrributes
   */
  getAttributes() {
    return getAttr(this, ['name', 'file', 'animated']);
  }

  /**
   * Loads the element properties from a data object
   * @param {object} data - The data object to parse
   */
  setAttributes(data) {
    ['name', 'file', 'animated'].forEach(attr => {
      if (!isEmpty(data[attr]))
        this[attr] = data[attr];
    });

    this.ext = this.file.toLowerCase().split('.').pop();
    this.type = this.getFileType(this.ext);

    // Check if it's an animated GIF
    if (this.ext === 'gif' && this.animated === 'undefined')
      this.checkAnimatedGif();

    if (this.type === 'font') {
      this.fontName = this.name === this.file && this.name.lastIndexOf('.') > 0 ?
        this.name.substring(0, this.name.lastIndexOf('.')) :
        this.name;
    }
    return this;
  }

  /**
   * Checks if the image associated with this MediaBagElement is an animated GIF
   *
   * Based on: {@link https://gist.github.com/marckubischta/261ad8427a214022890b}
   * Thanks to `@lakenen` and `@marckubischta`
   */
  checkAnimatedGif() {
    const request = new XMLHttpRequest();
    // Set `responseType` moved after calling `open`
    // see: https://stackoverflow.com/questions/20760635/why-does-setting-xmlhttprequest-responsetype-before-calling-open-throw
    // request.responseType = 'arraybuffer'
    request.addEventListener('load', () => {
      const
        arr = new Uint8Array(request.response),
        length = arr.length;

      // make sure it's a gif (GIF8)
      if (arr[0] !== 0x47 || arr[1] !== 0x49 ||
        arr[2] !== 0x46 || arr[3] !== 0x38) {
        this.animated = false;
        return;
      }

      // Ported from PHP [http://www.php.net/manual/en/function.imagecreatefromgif.php#104473]
      // an animated gif contains multiple "frames", with each frame having a
      // header made up of:
      // * a static 3-byte sequence (\x00\x21\xF9
      // * one byte indicating the length of the header (usually \x04)
      // * variable length header (usually 4 bytes)
      // * a static 2-byte sequence (\x00\x2C) (some variants may use \x00\x21 ?)
      // We read through the file as long as we haven't reached the end of the file
      // and we haven't yet found at least 2 frame headers
      for (let i = 0, len = length - 3, frames = 0; i < len && frames < 2; ++i) {
        if (arr[i] === 0x00 && arr[i + 1] === 0x21 && arr[i + 2] === 0xF9) {
          const
            blocklength = arr[i + 3],
            afterblock = i + 4 + blocklength;
          if (afterblock + 1 < length &&
            arr[afterblock] === 0x00 &&
            (arr[afterblock + 1] === 0x2C || arr[afterblock + 1] === 0x21)) {
            if (++frames > 1) {
              this.animated = true;
              log('debug', `Animated GIF detected: ${this.file}`);
              break;
            }
          }
        }
      }
    });

    this.getFullPathPromise()
      .then(fullPath => {
        request.open('GET', fullPath, true);
        request.responseType = 'arraybuffer';
        request.send();
      });
  }

  /**
   * Checks if the MediaBagElement has been initiated
   * @returns {boolean}
   */
  isEmpty() {
    return this.data === null;
  }

  /**
   * Determines the type of a file from its extension
   * @param {string} ext - The file name extension
   * @returns {string}
   */
  getFileType(ext) {
    let result = null;
    for (let type in settings.FILE_TYPES) {
      if (settings.FILE_TYPES[type].indexOf(ext) >= 0) {
        result = type;
        break;
      }
    }
    return result;
  }

  /**
   * Instantiates the media content
   * @param {function} callback - Callback method called when the referred resource is ready
   * @param {module:JClicPlayer.JClicPlayer} ps=null - An optional `PlayStation` (currently a {@link module:JClicPlayer.JClicPlayer JClicPlayer}) used to dynamically load fonts
   * @param {boolean} force=false - Used only in media of type 'audio'. When `true`, a static {@link MediaBagElement._audioPlayers audioPlayer element} will be loaded with this media source
   * @param {number} level=1 - Priority level of the media content to be built. Used only n audio elements.
   */
  build(callback, ps = null, force = false, level = 1) {
    // Mock data when running in NodeJS
    if (settings.NODEJS) {
      this.data = [];
      this.ready = true;
    }

    if (callback) {
      if (!this._whenReady)
        this._whenReady = [];
      this._whenReady.push(callback);
    }

    if (!this.data)
      this.getFullPathPromise()
        .then(fullPath => {
          switch (this.type) {
            case 'font':
              const
                format = this.ext === 'ttf' ? 'truetype' : this.ext === 'otf' ? 'embedded-opentype' : this.ext,
                css = `@font-face{font-family:"${this.fontName}";src:url(${fullPath}) format("${format}");}`;

              appendStyleAtHead(css, ps);
              this.data = new Font(this.name);
              this.ready = true;
              break;

            case 'image':
              this.data = new Image();
              this.data.addEventListener('load', () => { this._onReady.call(this); }, { once: true });
              this.data.src = fullPath;
              break;

            case 'video':
              this.data = document.createElement(this.type);
              this.data.addEventListener('canplay', () => { this._onReady.call(this); }, { once: true });
              this.data.src = fullPath;
              this.data.load();
              this.data.pause();
              break;

            case 'audio':
              // HTML Audio objects will be created on demand, when the param 'force' is set to true
              if (force) {
                // Clean up state in current audio element, if any
                const currentAudioElement = MediaBagElement._currentAudioElements[level];
                if (currentAudioElement && currentAudioElement !== this) {
                  currentAudioElement.data = null;
                  currentAudioElement.ready = false;
                }
                // Register as a current audio element
                MediaBagElement._currentAudioElements[level] = this;
                // Configure the audio player
                const audioPlayer = MediaBagElement.getAudioPlayer(level);
                if (audioPlayer.src !== fullPath) {
                  log('trace', `Loading static player #${level} with new audio: ${fullPath}`);
                  this.data = audioPlayer;
                  this.ready = false;
                  audioPlayer.addEventListener('canplay', () => { this._onReady.call(this); }, { once: true });
                  audioPlayer.src = fullPath;
                  audioPlayer.load();
                  audioPlayer.pause();
                }
                else
                  log('trace', `Reusing existing audio in player #${level}: ${fullPath}`);
              }
              else
                this.ready = true;
              break;

            case 'anim':
              // TODO: Use [Ruffle](https://ruffle.rs/) to play Flash movies
              this.data = $(`<object type"application/x-shockwave-flash" width="300" height="200" data="${fullPath}"/>`).get(-1);
              // Unable to check the loading progress in elements of type `object`. so we mark it always as `ready`:
              this.ready = true;
              break;

            case 'xml':
              $.get(fullPath, null, null, 'xml').done(xmlData => {
                const children = xmlData ? xmlData.children || xmlData.childNodes : null;
                this.data = children && children.length > 0 ? parseXmlNode(children[0]) : null;
                this._onReady();
              }).fail(err => {
                log('error', `Error loading ${this.name}: ${err}`);
                this._onReady();
              });
              break;

            case 'midi':
              const request = new XMLHttpRequest();
              request.onreadystatechange = () => {
                if (request.readyState === 4) {
                  if (request.status === 200)
                    this.data = new MidiAudioPlayer(request.response, ps && ps.options);
                  else
                    log('error', `Error loading ${this.name}: ${request.statusText}`);
                  this._onReady();
                }
              };
              request.open('GET', fullPath, true);
              request.responseType = 'arraybuffer';
              request.send();
              break;

            default:
              log('trace', `Media currently not supported: ${this.name}`);
              this.ready = true;
          }

          if (this.ready)
            this._onReady();
        });
    else if (this.ready)
      this._onReady();

    return this;
  }

  /**
   * Checks if this media element is ready to start
   * @returns {boolean} - `true` if ready, `false` otherwise
   */
  checkReady() {
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
  }

  /**
   * Checks if this resource has timed out.
   * @returns {boolean} - `true` if the resource has exhausted the allowed time to load, `false` otherwise
   */
  checkTimeout() {
    const result = Date.now() > this.timeout;
    if (result)
      log('warn', `Timeout while loading: ${this.name}`);
    return result;
  }

  /**
   * Notify listeners that the resource is ready
   */
  _onReady() {
    this.ready = true;
    if (this._whenReady) {
      this._whenReady.forEach(fn => fn.call(this, this));
      this._whenReady = null;
    }
  }

  /**
   * Gets the full path of the file associated to this element.
   * WARNING: This function should be called only after a successful call to `getFullPathPromise`
   * @returns {string}
   */
  getFullPath() {
    return this._fullPath;
  }

  /**
   * Gets a promise with the full path of the file associated to this element.
   * @returns {external:Promise}
   */
  getFullPathPromise() {
    return getPathPromise(this.basePath, this.file, this.zip)
      .then(fullPath => {
        // Process full URL only when running in a browser
        this._fullPath = settings.NODEJS
          ? fullPath
          : (new URL(fullPath, document.location.href)).toString();
        return this._fullPath;
      });
  }
}

Object.assign(MediaBagElement.prototype, {
  /**
   * The name of this element. Usually is the same as `file`
   * @name module:bags/MediaBagElement.MediaBagElement#name
   * @type {string} */
  name: '',
  /**
   * The name of the file where this element is stored
   * @name module:bags/MediaBagElement.MediaBagElement#file
   * @type {string} */
  file: '',
  /**
   * The font family name, used only in elements of type 'font'
   * @name module:bags/MediaBagElement.MediaBagElement#fontName
   * @type {string} */
  fontName: '',
  /**
   * The path to be used as base to access this media element
   * @name module:bags/MediaBagElement.MediaBagElement#basePath
   * @type {string} */
  basePath: '',
  /**
   * An optional JSZip object that can act as a container of this media
   * @name module:bags/MediaBagElement.MediaBagElement#zip
   * @type {external:JSZip} */
  zip: null,
  /**
   * When loaded, this field will store the realized media object
   * @name module:bags/MediaBagElement.MediaBagElement#data
   * @type {object} */
  data: null,
  /**
   * Flag indicating that `data` is ready to be used
   * @name module:bags/MediaBagElement.MediaBagElement#ready
   * @type {boolean} */
  ready: false,
  /**
   * Array of callback methods to be called when the resource becomes ready
   * @name module:bags/MediaBagElement.MediaBagElement#_whenReady
   * @private
   * @type {function[]} */
  _whenReady: null,
  /**
   * Normalized extension of `file`, useful to guess the media type
   * @name module:bags/MediaBagElement.MediaBagElement#ext
   * @type {string} */
  ext: '',
  /**
   * The resource type ('audio', 'image', 'midi', 'video', 'font')
   * @name module:bags/MediaBagElement.MediaBagElement#type
   * @type {string} */
  type: null,
  /**
   * Time set to load the resource before leaving
   * @name module:bags/MediaBagElement.MediaBagElement#timeout
   * @type {number} */
  timeout: 0,
  //
  /**
   * Flag used for animated GIFs
   * @name module:bags/MediaBagElement.MediaBagElement#animated
   * @type {boolean} */
  animated: false,
  /**
   * Full path obtained after a successful call to getFullPathPromise
   * @name module:bags/MediaBagElement.MediaBagElement#_fullPath
   * @private
   * @type {string}
   */
  _fullPath: null,
});

export default MediaBagElement;
