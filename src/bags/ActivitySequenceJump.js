/**
 *  File    : bags/ActivitySequenceJump.js
 *  Created : 05/04/2015
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
  "./JumpInfo",
  "./ConditionalJumpInfo"
], function ($, JumpInfo, ConditionalJumpInfo) {

  /**
   * This is a special case of {@link JumpInfo}, used only in {@link ActivitySequenceElement} objects.
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
     * Resolves what {@link JumpInfo} must be taken, based on a done time and average rating obtained
     * in activities.
     * @param {number} rating - Average rating obtained by the user in the activities done during the
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
