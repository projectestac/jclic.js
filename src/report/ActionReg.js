//  File    : ActionReg.js  
//  Created : 17/05/2016  
//  By      : fbusquet  
//
//  JClic.js  
//  HTML5 player of [JClic](http://clic.xtec.cat) activities  
//  http://projectestac.github.io/jclic.js  
//  (c) 2000-2015 Catalan Educational Telematic Network (XTEC)  
//  This program is free software: you can redistribute it and/or modify it under the terms of
//  the GNU General Public License as published by the Free Software Foundation, version. This
//  program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without
//  even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
//  General Public License for more details. You should have received a copy of the GNU General
//  Public License along with this program. If not, see [http://www.gnu.org/licenses/].  

define([
  "jquery",
  "../Utils"
], function ($, Utils) {
  /**
   * This class stores information about one specific action done by the current user while playing
   * an activity.
   * 
   * @exports ActionReg
   * @class
   * @param {string} type - Type of action (`click`, `write`, `move`, `select`...)
   * @param {string}+ source - Description of the object on which the action is done.
   * @param {string}+ dest - Description of the object that acts as a target of the action (used in pairings)
   * @param {boolean} ok - `true` if the action was OK, `false`, `null` or `undefined` otherwhise
   */
  var ActionReg = function (type, source, dest, ok) {
    this.type = type;
    this.source = source ? source : null;
    this.dest = dest ? dest : null;
    this.ok = ok ? ok : false;
    this.time = (new Date()).valueOf();
  };

  ActionReg.prototype = {
    constructor: ActionReg,
    /**
     * The type of action (`click`, `write`, `move`, `select`...)
     * @type {string} */
    type: 'unknown',
    /**
     * Description of the object on which the action was done
     * @type {string} */
    source: null,
    /**
     * Description of the object that has acted as a target of the action (used in pairings)
     * @type {string} */
    dest: null,
    /**
     * Timestamp taken when the action was done
     * @type {number} */
    time: 0,
    /**
     * `true` if the action was OK
     */
    isOk: false,
    /**
     * Provides the data associated with this action in XML format suitable for
     * [JClic Reports server](http://clic.xtec.cat/en/jclic/reports/).
     * @returns {external:jQuery}
     */
    $getXML: function () {
      var attr = {ok: this.ok, time: this.time};
      if (this.type)
        attr.type = this.type;
      if (this.source)
        attr.source = this.source;
      if (this.dest)
        attr.dest = this.dest;
      return $('<action/>', attr);
    },
    /**
     * Fills this ActionReg with data provided in XML format
     * @param {external:jQuery} $xml -The XML element to be processed, already wrapped as jQUery object
     */
    setProperties: function ($xml) {
      var actReg = this;
      $each($xml.get(0).attributes, function () {
        var name = this.name;
        var value = this.value;
        switch (name) {
          case 'type':
          case 'source':
          case 'dest':
            actReg[name] = value;
            break;
          case 'time':
            actReg[name] = Number(value);
            break;
          case 'ok':
            actReg[name] = Utils.getBoolean(value, false);
          default:
            break;
        }
      });
    }
  };

  return ActionReg;

});
