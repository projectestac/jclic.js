//    File    : ActivitySequenceJump.js  
//    Created : 05/04/2015  
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
  "./JumpInfo",
  "./ConditionalJumpInfo"
], function ($, JumpInfo, ConditionalJumpInfo) {

// 
// This is a special case of [JumpInfo](JumpInfo.html), used only in
// [ActivitySequenceElement](ActivitySequenceElement.html) objects. Sequence
// elements contain two [ActivitySequenceJump](ActivitySequenceJump.html)
// objects: one to be processed when the user clicks on the "next" button
// (or when the activity finishes, if in automatic mode), and the other one
// linked to the "prev" button. [ActivitySequenceJump](ActivitySequenceJump.html)
// objects define a default jump or action, but can have up to two
// [ConditionalJumpInfo](ConditionalJumpInfo.html) objects, used to define
// alternative jumps when the obtained score or the time spend to solve the
// activities are below or over specific values.
//
  var ActivitySequenceJump = function (action, sq) {
    JumpInfo.call(this, action, sq);
  };

  ActivitySequenceJump.prototype = {
    constructor: ActivitySequenceJump,
    upperJump: null,
    lowerJump: null,
    // 
    // Loads the object settings from a specific JQuery XML element 
    setProperties: function ($xml) {
      JumpInfo.prototype.setProperties.call(this, $xml);
      // Read conditional jumps
      var asj = this;
      $xml.children('jump').each(function () {
        var condJmp = new ConditionalJumpInfo().setProperties($(this));
        if (condJmp.id === 'upper')
          asj.upperJump = condJmp;
        else if (condJmp.id === 'lower')
          asj.lowerJump = condJmp;
      });
      return this;
    },
    // 
    // Resolves what [JumpInfo](JumpInfo.html) to take based on a done time
    // and average rating.
    // * rating (number): the average rating obtained by the user in the
    // activities done during the last sequence stretch.
    // * time (number): total time spend doing the activities.
    // * _returns_: a [JumpInfo](JumpInfo.html) object.
    resolveJump: function (rating, time) {
      var result = this;
      if (rating >= 0 && time >= 0) {
        if (this.upperJump !== null &&
            rating > this.upperJump.threshold &&
            (this.upperJump.time <= 0 || time < this.upperJump.time)) {
          result = this.upperJump;
        }
        else if (this.lowerJump !== null &&
            (rating < this.lowerJump.threshold ||
                (this.lowerJump.time > 0 && time > this.lowerJump.time))) {
          result = lowerJump;
        }
      }
      return result;
    }
  };

  // ActivitySequenceJump extends JumpInfo
  ActivitySequenceJump.prototype = $.extend(Object.create(JumpInfo.prototype), ActivitySequenceJump.prototype);

  return ActivitySequenceJump;
});
