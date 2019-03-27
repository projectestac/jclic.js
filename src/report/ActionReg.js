/**
 *  File    : report/ActionReg.js
 *  Created : 17/05/2016
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
 *  (c) 2000-2019 Educational Telematic Network of Catalonia (XTEC)
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

/* global define */

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
   */
  class ActionReg {
    /**
     * ActionReg constructor
     * @param {string} type - Type of action (`click`, `write`, `move`, `select`...)
     * @param {string}+ source - Description of the object on which the action is done.
     * @param {string}+ dest - Description of the object that acts as a target of the action (used in pairings)
     * @param {boolean} ok - `true` if the action was OK, `false`, `null` or `undefined` otherwise
     */
    constructor(type, source, dest, ok) {
      this.type = type;
      this.source = source || null;
      this.dest = dest || null;
      this.ok = ok || false;
      this.time = (new Date()).valueOf();
    }

    /**
     * Provides the data associated with this action in XML format suitable for a
     * {@link http://clic.xtec.cat/en/jclic/reports/|JClic Reports Server}.
     * @returns {external:jQuery}
     */
    $getXML() {
      const attr = { ok: this.ok, time: this.time };
      if (this.type)
        attr.type = this.type;
      if (this.source)
        attr.source = this.source;
      if (this.dest)
        attr.dest = this.dest;
      return $('<action/>', attr);
    }

    /**
     * Fills this ActionReg with data provided in XML format
     * @param {external:jQuery} $xml - The XML element to be processed, already wrapped as jQuery object
     */
    setProperties($xml) {
      Utils.attrForEach($xml.get(0).attributes, (name, value) => {
        switch (name) {
          case 'type':
          case 'source':
          case 'dest':
            this[name] = value;
            break;
          case 'time':
            this[name] = Number(value);
            break;
          case 'ok':
            this[name] = Utils.getBoolean(value, false);
            break;
        }
      });
    }
  }

  Object.assign(ActionReg.prototype, {
    /**
     * The type of action (`click`, `write`, `move`, `select`...)
     * @name ActionReg#type
     * @type {string} */
    type: 'unknown',
    /**
     * Description of the object on which the action was done
     * @name ActionReg#source
     * @type {string} */
    source: null,
    /**
     * Description of the object that has acted as a target of the action (used in pairings)
     * @name ActionReg#dest
     * @type {string} */
    dest: null,
    /**
     * Time stamp taken when the action was done
     * @name ActionReg#time
     * @type {number} */
    time: 0,
    /**
     * `true` if the action was OK
     * @name ActionReg#isOk
     * @type {boolean} */
    isOk: false,
  });

  return ActionReg;
});
