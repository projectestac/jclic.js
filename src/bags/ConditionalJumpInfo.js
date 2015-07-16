//    File    : ConditionalJumpInfo.js  
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
  "./JumpInfo"
], function ($, JumpInfo) {
  
  /**
   * This special case of {@link JumpInfo} is used in {@link ActivitySequenceJump} objects to decide
   * the type of jump or action to be performed, based on the results obtained by the user when
   * playing previous JClic activities.<br>
   * In addition to the standard {@link JumpInfo} fields and methods, this class has two public
   * members where score and time thresholds are stored.<br>
   * The exact meaning of this members will depend on the type of `ConditionalJumpInfo` in the
   * {@link ActivitySequenceJump} (it can be `upperJump` or `lowerJump`).
   * @exports ConditionalJumpInfo
   * @class
   * @extends JumpInfo
   * @param {string} action - Must be one of the described actions.
   * @param {(number|string)=} sq - Can be the tag of the sequence element to jump to, or its
   * cardinal number in the list.
   * @param {number=} threshold - Threshold above or below which the action will be triggered,
   * depending on the type of JumpInfo.
   * @param {number=} time - Delay to be applied in automatic jumps.
   */
  var ConditionalJumpInfo = function (action, sq, threshold, time) {
    JumpInfo.call(this, action, sq);
    this.threshold = (typeof threshold === 'number' ? threshold : -1);
    this.time = (typeof threshold === 'number' ? time : -1);
  };
  
  ConditionalJumpInfo.prototype = {
    constructor: ConditionalJumpInfo,
    /**
     * Threshold above or below which the action will be triggered, depending on the type of JumpInfo.
     * @type {number} */
    threshold: -1,
    /**
     * Delay to be applied in automatic jumps.
     * @type {number} */
    time: -1,
    /**
     * 
     * Loads this object settings from a specific JQuery XML element
     * @param {external:jQuery} $xml - The XML element to parse
     */
    setProperties: function ($xml) {
      JumpInfo.prototype.setProperties.call(this, $xml);
      if ($xml.attr('threshold') !== undefined)
        this.threshold = $xml.attr('threshold');
      if ($xml.attr('time') !== undefined)
        this.time = $xml.attr('time');
      return this;
    }
  };

  // ConditionalJumpInfo extends JumpInfo
  ConditionalJumpInfo.prototype = $.extend(Object.create(JumpInfo.prototype), ConditionalJumpInfo.prototype);

  return ConditionalJumpInfo;
  
});
