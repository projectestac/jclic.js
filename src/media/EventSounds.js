//    File    : EventSounds.js  
//    Created : 01/04/2015  
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
  "./EventSoundsElement",
  "../Utils"
], function ($, EventSoundsElement, Utils) {

// The EventSounds objects contains specific sounds to be played when
// JClic events are fired:
// - start
// - click
// - actionError
// - actionOk
// - finishedError
// - finishedOk
// 
// The sounds are stored in an array of [EventSoundsElement](EventSoundsElement.html) objects.
//
  var EventSounds = function (parent) {
    this.parent = parent;
    this.elements = [];
  };

  EventSounds.prototype = {
    constructor: EventSounds,
    // 
    // The 'parent' EventSounds object, used in activities to point to
    // the project's setings.
    eventSoundsParent: null,
    // 
    // Array of [EventSoundsElement](EventSoundsElement.html) objects
    elements: null,
    //
    // 
    enabled: Utils.DEFAULT,
    //
    // Global `enabled`flag
    globalEnabled: true,
    //
    // Read the object properties from an XML element
    setProperties: function ($xml) {
      var elements = this.elements;
      $xml.children().each(function () {
        elements[this.nodeName] = new EventSoundsElement(this.nodeName);
        elements[this.nodeName].setProperties($(this));
      });
      return this;
    },
    // Gets the default EventSounds object
    defaultEventSounds: null,
    // 
    // TODO: Implement methods for playing sounds defined in 'elements'
    // See: [edu.xtec.jclic.media.EventSounds.java](https://github.com/projectestac/jclic/blob/master/src/core/edu/xtec/jclic/media/EventSounds.java)
    realize: function(mediaBag){
      // TODO: Implement EventSounds.realize      
    }
  };
  
  // TODO: Create the default eventSounds object
  EventSounds.prototype.defaultEventSounds = new EventSounds(null);

  return EventSounds;

});
