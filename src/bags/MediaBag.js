/**
 *  File    : bags/MediaBag.js
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
 *  (c) 2000-2016 Catalan Educational Telematic Network (XTEC)
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
  "./MediaBagElement",
  "../skins/Skin",
  "../Utils"
], function ($, MediaBagElement, Skin, Utils) {
  /**
   * This class stores and manages all the media components (images, sounds, animations, video,
   * MIDI files, etc.) needed to run the activities of a {@link JClicProject}. The main member of
   * the class is `elements`. This is where {@link MediaBagElement} objects are stored.
   * @exports MediaBag
   * @class
   * @param {JClicProject} project - The JClic project to which this media bag belongs
   */
  var MediaBag = function (project) {
    this.project = project;
    this.elements = {};
  };

  MediaBag.prototype = {
    constructor: MediaBag,
    /**
     * The collection of {@link MediaBagElement} objects:
     * @type {object} */
    elements: null,
    /**
     * The JClic project to which this MediaBag belongs
     * @type {JClicProject} */
    project: null,
    /**
     *
     * Loads this object settings from a specific JQuery XML element
     * @param {external:jQuery} $xml - The XML element to parse
     */
    setProperties: function ($xml) {
      var mediabag = this;
      $xml.children('media').each(function () {
        var mbe = new MediaBagElement(mediabag.project.basePath, null, mediabag.project.zip);
        mbe.setProperties($(this));
        mediabag.elements[mbe.name] = mbe;
      });
      return this;
    },
    /**
     *
     * Finds a {@link MediaBagElement} by its name, creating a new one if not found and requested.
     * @param {string} name - The name of the element
     * @param {boolean=} create - When `true`, a new MediaBagElement will be created if not found,
     * using 'name' as its fileName..
     * @returns {MediaBagElement}
     */
    getElement: function (name, create) {
      name = Utils.nSlash(name);
      var result = this.elements[name];
      if (create && !result)
        result = this.getElementByFileName(name, create);
      return result;
    },
    /**
     *
     * Gets a {@link MediaBagElement} by its file name.
     * @param {string} fileName - The requested file name
     * @param {boolean=} create - When `true`, a new {@link MediaBagElement} will be created if not
     * found.
     * @returns {MediaBagElement}
     */
    getElementByFileName: function (fileName, create) {
      var result = null;
      if (fileName) {
        fileName = Utils.nSlash(fileName);
        for (var name in this.elements) {
          if (this.elements[name].fileName === fileName) {
            result = this.elements[name];
            break;
          }
        }
        if (!result && create) {
          result = new MediaBagElement(this.project.basePath, null, this.project.zip);
          result.name = fileName;
          result.fileName = fileName;
          result.ext = fileName.toLowerCase().split('#')[0].split('.').pop();
          result.type = result.getFileType(result.ext);
          this.elements[result.name] = result;
        }
      }
      return result;
    },
    /**
     * 
     * Get the names of the media elements that are of the given type.
     * When the search type is `font`, the `fontName` property is used instead of `name`
     * @param {string} type - The type of elements to search
     * @returns {String[]}
     */
    getElementsOfType: function (type) {
      var result = [];
      $.each(this.elements, function (name, element) {
        if (element.type === type)
          result.push(type === 'font' ? element.fontName : name);
      });
      return result;
    },
    /**
     *
     * Preload all resources.
     *
     * __Use with care!__ Calling this method will start loading all the resources defined in the
     * MediaBag, whether used or not in the current activity.
     * @param {string} type - The type of media to be build. When `null` or `undefined`, all
     * resources will be build.
     */
    buildAll: function (type) {
      $.each(this.elements, function (name, element) {
        if (!type || element.type === type) {
          element.build(function () {
            Utils.log('trace', '"%s" ready', name);
          });
        }
      });
    },
    /**
     *
     * Checks if there are media waiting to be loaded
     * @returns {boolean}
     */
    isWaiting: function () {
      var result = false;
      // Only for debug purposes: return always 'false'
      // TODO: Check loading process!
      $.each(this.elements, function (name, element) {
        if (element.data && !element.ready && !element.checkReady() && !element.checkTimeout()) {
          Utils.log('debug', '... waiting for: %s', name);
          result = true;
          return false;
        }
      });
      return result;
    },
    /**
     *
     * Loads a {@link Skin} object
     * @param {string} name - The skin name to be loaded
     * @param {string} ps - The {@link PlayStation} linked to the skin
     * @returns {Skin}
     */
    getSkinElement: function (name, ps) {
      return Skin.getSkin(name, ps);
    }
  };

  return MediaBag;

});
