/**
 *  File    : bags/ActivitySequence.js
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
import JumpInfo from './JumpInfo';
import ActivitySequenceElement from './ActivitySequenceElement';
import ActivitySequenceJump from './ActivitySequenceJump';
import { nSlash } from '../Utils';

/**
 * This class stores the definition of the sequence to follow to show the activities of a
 * {@link module:project/JClicProject.JClicProject JClicProject}. The sequence are formed by an ordered list of objects of type
 * {@link module:bags/ActivitySequenceElement.ActivitySequenceElement ActivitySequenceElement}.
 * It stores also a transient pointer to the current sequence element.
 */
export class ActivitySequence {
  /**
   * ActivitySequence constructor
   * @param {JClicProject} project - The JClic project to which this ActivitySequence belongs
   */
  constructor(project) {
    this.project = project;
    this.elements = [];
  }

  /**
   * Loads the object settings from a specific JQuery XML element
   * @param {external:jQuery} $xml - The XML element to parse
   */
  setProperties($xml) {
    $xml.children('item').each((_i, data) => this.elements.push(new ActivitySequenceElement().setProperties($(data))));
    return this;
  }

  /**
   * Gets a object with the basic attributes needed to rebuild this instance excluding functions,
   * parent references, constants and also attributes retaining the default value.
   * The resulting object is commonly usued to serialize elements in JSON format.
   * @returns {object} - The resulting object, with minimal attrributes
   */
  getAttributes() {
    return this.elements.map(el => el.getAttributes());
  }

  /**
   * Loads the object settings from a data object
   * @param {object} data - The data object to parse
   */
  setAttributes(data) {
    data.forEach(el => this.elements.push(new ActivitySequenceElement().setAttributes(el)));
    return this;
  }

  /**
   * Returns the index of the specified element in the sequence.
   * @param {ActivitySequenceElement} ase - The element to search.
   * @returns {number} - The requested index, or `null` if not found.
   */
  getElementIndex(ase) {
    return ase === null ? -1 : this.elements.indexOf(ase);
  }

  /**
   * Returns the nth element of the sequence.
   * @param {number} n - Index of the requested element
   * @param {boolean} updateCurrentAct - when `true`, the `currentAct` index will be updated.
   * @returns {ActivitySequenceElement} - The requested element, or `null` if out of range.
   */
  getElement(n, updateCurrentAct) {
    let result = null;
    if (n >= 0 && n < this.elements.length) {
      result = this.elements[n];
      if (updateCurrentAct)
        this.currentAct = n;
    }
    return result;
  }

  /**
   * Search into the sequence for a element with the provided tag
   * @param {string} tag - The tag to search
   * @param {boolean} updateCurrentAct - when `true`, the `currentAct` index will be updated.
   * @returns {ActivitySequenceElement} - The requested element, or `null` if not found.
   */
  getElementByTag(tag, updateCurrentAct) {
    let
      result = null,
      resultIndex = -1;
    if (tag) {
      tag = nSlash(tag);
      this.elements.some((el, index) => {
        if (el.tag === tag) {
          result = el;
          resultIndex = index;
        }
        return resultIndex !== -1;
      });
      if (resultIndex !== -1 && updateCurrentAct)
        this.currentAct = resultIndex;
    }
    return result;
  }

  /**
   * Gets the sequence element pointed by the `currentAct` member.
   * @returns {ActivitySequenceElement} - The current sequence element, or `null` if not set.
   */
  getCurrentAct() {
    return this.getElement(this.currentAct, false);
  }

  /**
   * Checks if it's possible to go forward from the current position in the sequence.
   * @param {boolean} hasReturn - Indicates whether the history of jumps done since the beginning
   * of the JClic session is empty or not. When not empty, a `RETURN` action is still possible.
   * @returns {boolean} - `true` when the user is allowed to go ahead to a next activity,
   * `false` otherwise. */
  hasNextAct(hasReturn) {
    let result = false;
    const ase = this.getCurrentAct();
    if (ase) {
      if (ase.fwdJump === null)
        result = true;
      else
        switch (ase.fwdJump.action) {
          case 'STOP':
            break;
          case 'RETURN':
            result = hasReturn;
            break;
          default:
            result = true;
        }
    }
    return result;
  }

  /**
   * Checks if it's possible to go back from the current position in the sequence.
   * @param {boolean} hasReturn - Indicates whether the history of jumps done since the beginning
   * of the JClic session is empty or not. When not empty, a `RETURN` action is still possible.
   * @returns {boolean} - `true` when the user is allowed to go back to a previous activity,
   * `false` otherwise. */
  hasPrevAct(hasReturn) {
    let result = false;
    const ase = this.getCurrentAct();
    if (ase) {
      if (ase.backJump === null)
        result = true;
      else
        switch (ase.backJump.action) {
          case 'STOP':
            break;
          case 'RETURN':
            result = hasReturn;
            break;
          default:
            result = true;
        }
    }
    return result;
  }

  /**
   * Gets the current state for the 'next' and 'prev' buttons.
   * @returns {string} - One of the possible values of {@link ActivitySequenceElement#navButtons},
   * thus: `none`, `fwd`, `back` or `both`
   */
  getNavButtonsFlag() {
    let flag = 'none';
    const ase = this.getCurrentAct();
    if (ase)
      flag = ase.navButtons;
    return flag;
  }

  /**
   * Computes the jump to perform from the current position on the sequence
   * @param {boolean} back - When `true`, the request is for the 'go back' button. Otherwise, is
   * for the 'next' one.
   * @param {Reporter} reporter - The reporting engine that will provide values about score average
   * and time spend on the activities, used only to compute conditional jumps.
   * @returns {JumpInfo} - The jump info if a valid jump is possible, `null` otherwise.
   */
  getJump(back, reporter) {
    const ase = this.getCurrentAct();
    let result = null;
    if (ase) {
      const asj = back ? ase.backJump : ase.fwdJump;
      if (asj === null) {
        let i = this.currentAct + (back ? -1 : 1);
        if (i >= this.elements.length || i < 0)
          i = 0;
        result = new JumpInfo('JUMP', i);
      } else {
        let
          rating = -1,
          time = -1;
        if (reporter !== null) {
          const seqRegInfo = reporter.getCurrentSequenceInfo();
          if (seqRegInfo !== null) {
            rating = Math.round(seqRegInfo.tScore);
            time = Math.round(seqRegInfo.tTime / 1000);
          }
        }
        result = asj.resolveJump(rating, time);
      }
    }
    return result;
  }

  /**
   * Finds the nearest sequence element with a valid 'tag', looking back in the `elements` list.
   * @param {number} num - The point of the sequence from which to start looking back.
   * @returns {string} - The nearest 'tag', or `null` if not found.
   */
  getSequenceForElement(num) {
    let tag = null;
    if (num >= 0 && num < this.elements.length)
      for (let i = num; tag === null && i >= 0; i--) {
        tag = this.getElement(i, false).tag;
      }
    return tag;
  }

  /**
   * Gets the first {@link module:bags/ActivitySequenceElement.ActivitySequenceElement ActivitySequenceElement} in the `elements` list pointing to the
   * specified activity name.
   * The search is always case-insensitive.
   * @param {string} activity - The name of the activity to search for.
   * @returns {ActivitySequenceElement} The requested element or `null` if not found.
   */
  getElementByActivityName(activity) {
    let result = null;
    if (activity !== null) {
      for (let i = 0; result === null && i < this.elements.length; i++) {
        const ase = this.getElement(i, false);
        if (ase.activity.toLowerCase() === activity.toLowerCase())
          result = ase;
      }
    }
    return result;
  }

  /**
   * Utility function to check if the current sequence element corresponds to the specified
   * activity. If negative, the `currentAct` will be accordingly set.
   * @param {string} activity - The name of the activity to check
   */
  checkCurrentActivity(activity) {
    let ase = this.getCurrentAct();
    if (ase === null || ase.activity.toUpperCase() !== activity.toUpperCase()) {
      for (let i = 0; i < this.elements.length; i++) {
        if (this.getElement(i, false).activity.toUpperCase() === activity.toUpperCase()) {
          this.currentAct = i;
          return false;
        }
      }
      ase = new ActivitySequenceElement();
      ase.activity = activity;
      ase.fwdJump = new ActivitySequenceJump('STOP');
      ase.backJump = new ActivitySequenceJump('STOP');
      this.elements.push(ase);
      this.currentAct = this.elements.length - 1;
      return false;
    }
    return true;
  }
}

Object.assign(ActivitySequence.prototype, {
  /**
   * The ordered list of {@link module:bags/ActivitySequenceElement.ActivitySequenceElement ActivitySequenceElement} objects
   * @name module:bags/ActivitySequence.ActivitySequence#elements
   * @type {ActivitySequenceElement[]} */
  elements: null,
  /**
   * The JClic project to which this ActivitySequence belongs.
   * @name module:bags/ActivitySequence.ActivitySequence#project
   * @type {JClicProject} */
  project: null,
  /**
   * Pointer to the {@link module:bags/ActivitySequenceElement.ActivitySequenceElement ActivitySequenceElement} currently running (points inside
   * the `elements` array).
   * @name module:bags/ActivitySequence.ActivitySequence#currentAct
   * @type {number} */
  currentAct: -1,
});

export default ActivitySequence;
