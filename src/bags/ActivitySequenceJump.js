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
 *  @license EUPL-1.2
 *  @licstart
 *  (c) 2000-2020 Catalan Educational Telematic Network (XTEC)
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
 *  @module
 */

import $ from 'jquery';
import JumpInfo from './JumpInfo';
import ConditionalJumpInfo from './ConditionalJumpInfo';
import { getAttr } from '../Utils';

/**
 * This is a special case of {@link JumpInfo}, used only in {@link ActivitySequenceElement} objects.
 * Sequence elements can contain up to two ActivitySequenceJump objects: one to be processed
 * when the user clicks on the "next" button (or when the activity finishes, if in automatic mode),
 * and the other used with the "prev" button. ActivitySequenceJump objects define a default jump
 * or action to be performed, but can also have up to two {@link ConditionalJumpInfo} objects. These
 * define alternative jumps that are performed only when score or time are below or over a specific
 * threshold.
 * @extends module:JumpInfo
 */
export class ActivitySequenceJump extends JumpInfo {
  /**
   * ActivitySequenceJump constructor
   * @param {string} action - Must be one of the described actions.
   * @param {number|string} [sq] - Can be the tag of the sequence element to jump to, or its
   * cardinal number in the list.
   */
  constructor(action, sq) {
    super(action, sq);
  }

  /**
   * Loads the object settings from a specific JQuery XML element.
   * @param {external:jQuery} $xml - The XML element to parse
   */
  setProperties($xml) {
    super.setProperties($xml);

    // Read conditional jumps
    $xml.children('jump').each((_n, child) => {
      const condJmp = new ConditionalJumpInfo().setProperties($(child));
      if (condJmp.id === 'upper')
        this.upperJump = condJmp;
      else if (condJmp.id === 'lower')
        this.lowerJump = condJmp;
    });
    return this;
  }

  /**
   * Gets a object with the basic attributes needed to rebuild this instance excluding functions,
   * parent references, constants and also attributes retaining the default value.
   * The resulting object is commonly usued to serialize elements in JSON format.
   * @returns {object} - The resulting object, with minimal attrributes
   */
  getAttributes() {
    return Object.assign(super.getAttributes(), getAttr(this, ['upperJump', 'lowerJump']));
  }

  /**
    * Loads the jump settings from a data object
    * @param {object} data - The data object to parse
    */
  setAttributes(data) {
    super.setAttributes(data);

    ['upperJump', 'lowerJump'].forEach(cj => {
      if (data[cj])
        this[cj] = new ConditionalJumpInfo().setAttributes(data[cj]);
    });

    return this;
  }


  /**
   * Resolves what {@link JumpInfo} must be taken, based on a done time and average rating obtained
   * in activities.
   * @param {number} rating - Average rating obtained by the user in the activities done during the
   * last sequence stretch.
   * @param {number} time - Total time spend doing the activities.
   * @returns {JumpInfo}
   */
  resolveJump(rating, time) {
    let result = this;
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
}

Object.assign(ActivitySequenceJump.prototype, {
  /**
   * Optional jump to be performed when the results (score and time) are above a specific threshold.
   * @name ActivitySequenceJump#upperJump
   * @type {ConditionalJumpInfo} */
  upperJump: null,
  /**
   * Optional jump to be performed when the results (score or time) are below a specific threshold.
   * @name ActivitySequenceJump#lowerJump
   * @type {ConditionalJumpInfo} */
  lowerJump: null,
});

export default ActivitySequenceJump;
