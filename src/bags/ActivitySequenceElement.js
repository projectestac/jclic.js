/**
 *  File    : bags/ActivitySequenceElement.js
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
 *  (c) 2000-2020 Educational Telematic Network of Catalonia (XTEC)
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
import ActivitySequenceJump from './ActivitySequenceJump';
import { attrForEach, nSlash, getAttr, isEmpty } from '../Utils';

/**
 *
 * This class is the basic component of {@link module:bags/ActivitySequence.ActivitySequence ActivitySequence} objects. It represents a specific
 * point in the project's sequence of JClic activities.
 *
 * For each point of the sequence, some options can be set:
 * - What activity must run at this point
 * - What to do or where to jump when the activity finishes
 * - The behavior of the "next" button
 * - The behavior of the  "prev" button
 *
 * Sequence points can also have a "tag", used to refer to them with a unique name.
 */
export class ActivitySequenceElement {
  constructor() {
  }

  /**
   * Loads the object settings from a specific JQuery XML element
   * @param {external:jQuery} $xml
   */
  setProperties($xml) {

    // Iterate on all provided attributes
    attrForEach($xml.get(0).attributes, (name, val) => {
      switch (name) {
        case 'id':
          this['tag'] = nSlash(val);
          break;
        case 'name':
          this['activity'] = val;
          break;
        case 'description':
        // possible navButtons values are: `none`, `fwd`, `back` or `both`
        case 'navButtons':
          this[name] = val;
          break;
        case 'delay':
          this[name] = Number(val);
          break;
      }
    });

    // Iterate on 'jump' elements to load fwdJump and/or backJump
    $xml.children('jump').each((_n, data) => {
      const jmp = new ActivitySequenceJump().setProperties($(data));
      if (jmp.id === 'forward')
        this.fwdJump = jmp;
      else if (jmp.id === 'back')
        this.backJump = jmp;
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
    return getAttr(this, ['tag', 'description', 'activity', 'fwdJump', 'backJump', 'navButtons', 'delay']);
  }

  /**
   * Loads sequence element settings from a data object
   * @param {object} data
   */
  setAttributes(data) {
    ['tag', 'description', 'activity', 'navButtons', 'delay'].forEach(t => {
      if (!isEmpty(data[t]))
        this[t] = data[t];
    });

    ['fwdJump', 'backJump'].forEach(jmp => {
      if (data[jmp]) {
        this[jmp] = new ActivitySequenceJump().setAttributes(data[jmp]);
      }
    });
    return this;
  }
}

Object.assign(ActivitySequenceElement.prototype, {
  /**
   * Optional unique identifier of this element in the {@link module:bags/ActivitySequence.ActivitySequence ActivitySequence}.
   * @name module:bags/ActivitySequenceElement.ActivitySequenceElement#tag
   * @type {string} */
  tag: null,
  /**
   * Optional description of this sequence element.
   * @name module:bags/ActivitySequenceElement.ActivitySequenceElement#description
   * @type {string} */
  description: null,
  /**
   * Name of the {@link module:Activity.Activity Activity} pointed by this element.
   * @name module:bags/ActivitySequenceElement.ActivitySequenceElement#activity
   * @type {string} */
  activity: '',
  /**
   * Jump to be processed by the 'next' button action
   * @name module:bags/ActivitySequenceElement.ActivitySequenceElement#fwdJump
   * @type {ActivitySequenceJump} */
  fwdJump: null,
  /**
   * Jump to be processed by the 'prev' button action.
   * @name module:bags/ActivitySequenceElement.ActivitySequenceElement#backJump
   * @type {ActivitySequenceJump} */
  backJump: null,
  /**
   * What buttons should be active at this point of the sequence. Valid values are:
   * - 'none'
   * - 'fwd'
   * - 'back'
   * - 'both'
   * @name module:bags/ActivitySequenceElement.ActivitySequenceElement#navButtons
   * @type {string} */
  navButtons: 'both',
  /**
   * Time delay (in seconds) before passing to the next/prev activity
   * @name module:bags/ActivitySequenceElement.ActivitySequenceElement#delay
   * @type {number} */
  delay: 0,
});

export default ActivitySequenceElement;
