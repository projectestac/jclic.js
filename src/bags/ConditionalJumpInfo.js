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

  // 
  // This special case of [JumpInfo](JumpInfo.html) is used in
  // [ActivitySequenceJump](ActivitySequenceJump.html) objects to decide the
  // jump to be taken (or the action to be performed) based on the results
  // obtained by the user when playing previous JClic activities. In addition
  // to the standard [JumpInfo](JumpInfo.html) fields and methods, this
  // class has two public members where to store the score and time thresholds.
  // The exact meaning of this members will depend on the type of the
  // `ConditionalJumpInfo` in the [ActivitySequenceJump](ActivitySequenceJump.html)
  // (can be `upperJump` or `lowerJump`).
  var ConditionalJumpInfo = function (action, sq, threshold, time) {
    JumpInfo.call(this, action, sq);
    this.threshold = (typeof threshold === 'number' ? threshold : -1);
    this.time = (typeof threshold === 'number' ? time : -1);
  };

  ConditionalJumpInfo.prototype = {
    constructor: ConditionalJumpInfo,
    threshold: -1,
    time: -1,
    // Loads the object settings from a specific JQuery XML element 
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
