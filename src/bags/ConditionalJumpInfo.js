/**
 *  File    : bags/ConditionalJumpInfo.js
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
 *  (c) 2000-2016 Catalan Educational Telematic Network (XTEC)
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
  "./JumpInfo"
], function ($, JumpInfo) {

  /**
   * This special case of {@link JumpInfo} is used in {@link ActivitySequenceJump} objects to decide
   * the type of jump or action to be performed, based on the results obtained by the user when
   * playing previous JClic activities.
   *
   * In addition to the standard {@link JumpInfo} fields and methods, this class has two public
   * members where score and time thresholds are stored.
   *
   * The exact meaning of this members will depend on the type of `ConditionalJumpInfo` in the
   * {@link ActivitySequenceJump} (it can be `upperJump` or `lowerJump`).
   * @exports ConditionalJumpInfo
   * @class
   * @extends JumpInfo
   */
  class ConditionalJumpInfo extends JumpInfo {
    /**
     * ConditionalJumpInfo constructor
     * @param {string} action - Must be one of the described actions.
     * @param {(number|string)=} sq - Can be the tag of the sequence element to jump to, or its
     * cardinal number in the list.
     * @param {number=} threshold - Threshold above or below which the action will be triggered,
     * depending on the type of JumpInfo.
     * @param {number=} time - Delay to be applied in automatic jumps.
     */
    constructor(action, sq, threshold, time) {
      super(action, sq)
      this.threshold = typeof threshold === 'number' ? threshold : -1
      this.time = typeof threshold === 'number' ? time : -1
    }

    /**
     * Loads this object settings from a specific JQuery XML element
     * @param {external:jQuery} $xml - The XML element to parse
     */
    setProperties($xml) {
      super.setProperties($xml)
      if ($xml.attr('threshold') !== undefined)
        this.threshold = $xml.attr('threshold')
      if ($xml.attr('time') !== undefined)
        this.time = $xml.attr('time')
      return this
    }
  }

  Object.assign(ConditionalJumpInfo.prototype, {
    /**
     * Threshold above or below which the action will be triggered, depending on the type of JumpInfo.
     * @name ConditionalJumpInfo#threshold
     * @type {number} */
    threshold: -1,
    /**
     * Delay to be applied in automatic jumps.
     * @name ConditionalJumpInfo#time
     * @type {number} */
    time: -1,
  })

  return ConditionalJumpInfo
})
