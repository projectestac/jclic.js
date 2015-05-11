//    File    : MediaBag.js  
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
  "./MediaBagElement",
  "../skins/Skin"
], function ($, MediaBagElement, Skin) {

//
// Description
// This class stores and manages all the media components (images, sounds, 
// animations, video, MIDI files, etc.) needed to run the activities of a
// [JClicProject](JClicProject.html). The main member of the class is the
// `elements` array, that stores [MediaBagElement](MediaBagElement.html)
// objects.
//
  var MediaBag = function (project) {
    this.project = project;
    this.elements = {};
  };

  MediaBag.prototype = {
    constructor: MediaBag,
    // 
    // The collection of [MediaBagElement](MediaBagElement.html) objects:
    elements: null,
    //
    // The [JClicProject](JClicProject.html) this MediaBag belongs to
    project: null,
    //
    // Loads the object settings from a specific JQuery XML element 
    setProperties: function ($xml) {
      var elements = this.elements;
      $xml.children('media').each(function () {
        var mbe = new MediaBagElement().setProperties($(this));
        elements[mbe.name] = mbe;
      });
      return this;
    },
    // 
    // Gets a [MediaBagElement](MediaBagElement.html) by file name
    getElementByFileName: function (fileName) {
      var result = null;
      if (fileName !== null) {
        for (var name in this.elements) {
          if (this.elements[name].fileName === fileName) {
            result = this.elements[name];
            break;
          }
        }
      }
      return result;
    },
    // 
    // Preload all resources
    // **Use with care!** Calling this method will start loading all the resources
    // defined in the MediaBag, whether used or not in the current activity.
    // type (String) - The type of media to be build. When `null` or `undefined`, all
    // resources are build.
    buildAll: function (type) {
      $.each(this.elements, function (name, element) {
        if (!type || element.name === type) {
          element.build(function () {
            console.log(this.name + ' ready');
          });
        }
      });
    },
    //
    // Check if there are media waiting to be loaded
    isWaiting: function () {            
      var result = false;
      /*
      // Only for debug purposes: return always 'false'
      // TODO: Check loading process!
      $.each(this.elements, function (name, element) {
        if (element.data && !element.ready) {
          result = true;
          return false;
        }
      });
      */
      return result;
    },
    //
    // loads a [Skin](Skin.html) object
    // name (String) - The name of the element to be loaded
    // ps (PlayStation) - The [PlayStation](PlayStation.html) linked to the skin
    getSkinElement: function (name, ps) {
      // TODO: Implement loading skins      
      return Skin.prototype.getSkin('default', ps);
    }

  };

  return MediaBag;

});
