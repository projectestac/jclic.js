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

  /**
   * This is a special case of {@link JumpInfo}, used only in {@link ActivitySequenceElement} objects.<br>
   * Sequence elements can contain up to two ActivitySequenceJump objects: one to be processed
   * when the user clicks on the "next" button (or when the activity finishes, if in automatic mode),
   * and the other used with the "prev" button. ActivitySequenceJump objects define a default jump
   * or action to be performed, but can also have up to two {@link ConditionalJumpInfo} objects. These
   * define alternative jumps that are performed only when score or time are below or over a specific
   * threshold.
   * @exports ActivitySequenceJump
   * @class
   * @extends JumpInfo
   * @param {string} action - Must be one of the described actions.
   * @param {(number|string)=} sq - Can be the tag of the sequence element to jump to, or its
   * cardinal number in the list.
   */
  var ActivitySequenceJump = function (action, sq) {
    JumpInfo.call(this, action, sq);
  };

  ActivitySequenceJump.prototype = {
    constructor: ActivitySequenceJump,
    /**
     * Optional jump to be performed when the results (score and time) are above a specific threshold.
     * @type {ConditionalJumpInfo} */
    upperJump: null,
    /**
     * Optional jump to be performed when the results (score or time) are below a specific threshold.
     * @type {ConditionalJumpInfo} */
    lowerJump: null,
    /**
     * 
     * Loads the object settings from a specific JQuery XML element.
     * @param {external:jQuery} $xml - The XML element to parse
     */
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
    /**
     * 
     * Resolves what {@link JumpInfo} must be taked, based on a done time and average rating obtained
     * in activities.
     * @param {number} rating - Average rating obteined by the user in the activities done during the
     * last sequence stretch.
     * @param {number} time - Total time spend doing the activities.
     * @returns {JumpInfo}
     */
    resolveJump: function (rating, time) {
      var result = this;
      if (rating >= 0 && time >= 0) {
        if (this.upperJump !== null &&
            rating > this.upperJump.threshold &&
            (this.upperJump.time <= 0 || time < this.upperJump.time)) {
          result = this.upperJump;
        } else if (this.lowerJump !== null &&
            (rating < this.lowerJump.threshold ||
                this.lowerJump.time > 0 && time > this.lowerJump.time)) {
          result = this.lowerJump;
        }
      }
      return result;
    }
  };

  // ActivitySequenceJump extends JumpInfo
  ActivitySequenceJump.prototype = $.extend(Object.create(JumpInfo.prototype), ActivitySequenceJump.prototype);

  return ActivitySequenceJump;
});
