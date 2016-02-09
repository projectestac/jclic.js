//    File    : MediaBagElement.js  
//    Created : 07/04/2015  
//    By      : Francesc Busquets  
//
//    JClic.js  
//    HTML5 player of [JClic](http://clic.xtec.cat) activities  
//    https://github.com/projectestac/jclic.js  
//    (c) 2000-2015 Catalan Educational Telematic Network (XTEC)  
//    This program is free software: you can redistribute it and/or modify it under the terms of
//    the GNU General Public License as published by the Free Software Foundation, version. This
//    program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without
//    even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
//    General Public License for more details. You should have received a copy of the GNU General
//    Public License along with this program. If not, see [http://www.gnu.org/licenses/].  

define([
  "jquery",
  "../Utils",
  "../AWT"
], function ($, Utils, AWT) {

  /**
   * This kind of objects are the components of {@link MediaBag}.<br>
   * Media elements have a name, a reference to a file (the `fileName` field) and, when initialized,
   * a `data` field pointing to a object containing the real media. They have also a flag indicating
   * if the data must be saved on the {@link JClicProject} zip file or just mantained as a reference
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
    }
    if (zip)
      this.zip = zip;
    this.timeout = Date.now() + 10000;
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
    // 
    // Other fields present in JClic, currently not used:  
    // animated: false,  
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
      return this;
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

      if (!this.data) {
        var fullPath = this.getFullPath();
        switch (this.type) {
          case 'font':
            var format = this.ext === 'ttf' ? 'truetype'
                : this.ext === 'otf' ? 'embedded-opentype'
                : this.ext;
            $('head').prepend(
                '<style type="text/css">' +
                '@font-face{font-family:"' + this.name + '";' +
                'src:url(' + fullPath + ') format("' + format + '");}' +
                '</style>');
            this.data = new AWT.Font(this.name);
            this.ready = true;
            break;

          case 'image':
            this.data = new Image();
            $(this.data).on('load', function(){media._onReady.call(media);});
            this.data.src = fullPath;
            break;

          case 'audio':
          case 'video':
            this.data = document.createElement(this.type);
            $(this.data).on('canplay', function () {media._onReady.call(media);});
            this.data.src = fullPath;
            this.data.pause();
            break;

          case 'xml':
            this.data = '';
            this.ready = true;
            // Since we are not yet supporting complex skins, there
            // is no need to read XML files
            /*
             $.get(fullPath, null, null, 'xml')
             .done(function (data) {
             media.data = data;
             media._onReady();
             }).fail(function () {
             console.log('Error loading ' + media.name);
             media.data = null;
             });
             */
            break;

          default:
            // TODO: Load the real resource
            return;
        }
      }

      if (this.ready)
        this._onReady();

      return this;
    },
    checkReady: function () {
      if (this.data && !this.ready) {
        switch (this.type) {
          case 'image':
            this.ready = (this.data.complete === true);
            break;
          case 'audio':
          case 'video':
            this.ready = (this.data.readyState >= 1);
            if(this.ready)
              console.log(this.name+" ready - checked");
            break;
          default:
            this.ready = true;
        }
      }
      return this.ready;
    },
    checkTimeout: function() {
      return Date.now() > this.timeout;
    },
    /**
     * 
     * Notify listeners that the resource is ready
     */
    _onReady: function () {
      this.ready = true;
      console.log(this.name+" ready - callback");
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
     * Gets the full path of the file associated to this element
     * @returns {string}
     */
    getFullPath: function () {
      return Utils.getPath(this.basePath, this.fileName, this.zip);
    }
  };

  return MediaBagElement;

});
