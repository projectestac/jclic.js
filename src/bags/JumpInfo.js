//    File    : JumpInfo.js  
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

define([], function () {
  /**
   * This class contains information about what things JClic sequence manager has to do in certain
   * circumstances, such as:
   * - an activity finishes
   * - the user clicks on the "next" or "prev" buttons
   * - the user clicks or a cell with special "active content"
   * <br>
   * Different kinds of actions are possible for each of these events:
   * - RETURN: to go back to a previous point in the sequence.
   * - EXIT: to exit the program (thus navigating to another URL)
   * - STOP: to do nothing.
   * - JUMP: to jump to a specific point in the sequence of activities, or to another JClic project.
   * @exports JumpInfo
   * @class
   * @param {string} action - Must be one of the described actions.
   * @param {(number|string)=} sq - Can be the tag of the sequence element to jump to, or its
   * cardinal number in the list.
   */
  var JumpInfo = function (action, sq) {
    this.action = action;
    switch (typeof sq) {
      case 'string':
        this.sequence = sq;
        break;
      case 'number':
        this.actNum = sq;
        break;
    }
  };

  JumpInfo.prototype = {
    constructor: JumpInfo,
    /**
     * The JumpInfo identifier
     * - For regular jumps: 'forward', 'back'
     * - For conditional jumps: 'upper', 'lower'
     * @type {string} */
    id: null,
    /**
     * The current action.<br>
     * Possible values are: `JUMP`, `STOP`, `RETURN` and `EXIT`.
     * @type {string} */
    action: undefined,
    /**
     * Activity number in the sequence list
     * @type {number} */
    actNum: -1,
    /**
     * Current sequence tag
     * @type {string} */
    sequence: undefined,
    /**
     * Path of another JClic project to jump to
     * @type {string} */
    projectPath: undefined,
    /**
     * 
     * Loads the object settings from a specific JQuery XML element
     * @param {external:jQuery} $xml - The XML element to parse
     */
    setProperties: function ($xml) {
      this.id = $xml.attr('id');
      this.action = $xml.attr('action') ? $xml.attr('action') : 'JUMP';
      this.sequence = $xml.attr('tag');
      this.projectPath = $xml.attr('project');
      return this;
    }
  };

  return JumpInfo;

});
