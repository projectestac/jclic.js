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
  "./ActivitySequenceElement",
  "./ActivitySequenceJump",
  "../Utils"
], function ($, JumpInfo, ActivitySequenceElement, ActivitySequenceJump, Utils) {

  /**
   * This class stores the definition of the sequence to follow to show the activities of a
   * {@link JClicProject}. The sequence are formed by an ordered list of objects of type
   * {@link ActivitySequenceElement}.
   * It stores also a transient pointer to the current sequence element.
   * @exports ActivitySequence
   * @class
   * @param {JClicProject} project - The JClic project to which this ActivitySequence belongs
   */
  var ActivitySequence = function (project) {
    this.project = project;
    this.elements = [];
  };

  ActivitySequence.prototype = {
    constructor: ActivitySequence,
    /**
     * The ordered list of {@link ActivitySequenceElement} objects
     * @type {ActivitySequenceElement[]} */
    elements: null,
    /**
     * The JClic project to which this ActivitySequence belongs.
     * @type {JClicProject} */
    project: null,
    /**
     *
     * Pointer to the {@link ActivitySequenceElement} currently running (points inside
     * the `elements` array).
     * @type {number} */
    currentAct: -1,
    /**
     *
     * Loads the object settings from a specific JQuery XML element
     * @param {external:jQuery} $xml - The XML element to parse
     */
    setProperties: function ($xml) {
      var elements = this.elements;
      $xml.children('item').each(function (i, data) {
        var ase = new ActivitySequenceElement().setProperties($(data));
        elements.push(ase);
      });
      return this;
    },
    /**
     *
     * Returns the index of the specified element in the sequence.
     * @param {ActivitySequenceElement} ase - The element to search.
     * @returns {number} - The requested index, or `null` if not found.
     */
    getElementIndex: function (ase) {
      return ase === null ? -1 : this.elements.indexOf(ase);
    },
    /**
     *
     * Returns the nth element of the sequence.
     * @param {number} n - Index of the requested element
     * @param {boolean} updateCurrentAct - when `true`, the `currentAct` index will be updated.
     * @returns {ActivitySequenceElement} - The requested element, or `null` if out of range.
     */
    getElement: function (n, updateCurrentAct) {
      var result = null;
      if (n >= 0 && n < this.elements.length) {
        result = this.elements[n];
        if (updateCurrentAct)
          this.currentAct = n;
      }
      return result;
    },
    /**
     *
     * Search into the sequence for a element with the provided tag
     * @param {string} tag - The tag to search
     * @param {boolean} updateCurrentAct - when `true`, the `currentAct` index will be updated.
     * @returns {ActivitySequenceElement} - The requested element, or `null` if not found.
     */
    getElementByTag: function (tag, updateCurrentAct) {
      var result = null, resultIndex = -1;
      if (tag !== null) {
        tag = Utils.nSlash(tag);
        this.elements.some(function (el, index) {
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
    },
    /**
     *
     * Gets the sequence element pointed by the `currentAct` member.
     * @returns {ActivitySequenceElement} - The current sequence element, or `null` if not set.
     */
    getCurrentAct: function () {
      return this.getElement(this.currentAct, false);
    },
    /**
     *
     * Checks if it's possible to go forward from the current position in the sequence.
     * @param {boolean} hasReturn - Indicates whether the history of jumps done since the beginning
     * of the JClic session is empty or not. When not empty, a `RETURN` action is still possible.
     * @returns {boolean} - `true` when the user is allowed to go ahead to a next activity,
     * `false` otherwise. */
    hasNextAct: function (hasReturn) {
      var result = false;
      var ase = this.getCurrentAct();
      if (ase !== null) {
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
    },
    /**
     *
     * Checks if it's possible to go back from the current position in the sequence.
     * @param {boolean} hasReturn - Indicates whether the history of jumps done since the beginning
     * of the JClic session is empty or not. When not empty, a `RETURN` action is still possible.
     * @returns {boolean} - `true` when the user is allowed to go back to a previous activity,
     * `false` otherwise. */
    hasPrevAct: function (hasReturn) {
      var result = false;
      var ase = this.getCurrentAct();
      if (ase !== null) {
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
    },
    /**
     *
     * Gets the current state for the 'next' and 'prev' buttons.
     * @returns {string} - One of the possible values of {@link ActivitySequenceElement#navButtons},
     * thus: `none`, `fwd`, `back` or `both`
     */
    getNavButtonsFlag: function () {
      var flag = 'none';
      var ase = this.getCurrentAct();
      if (ase !== null)
        flag = ase.navButtons;
      return flag;
    },
    /**
     *
     * Computes the jump to perform from the current position on the sequence
     * @param {boolean} back - When `true`, the request is for the 'go back' button. Otherwise, is
     * for the 'next' one.
     * @param {Reporter} reporter - The reporting engine that will provide values about score average
     * and time spend on the activities, used only to compute conditional jumps.
     * @returns {JumpInfo} - The jump info if a valid jump is possible, `null` otherwise.
     */
    getJump: function (back, reporter) {
      var ase = this.getCurrentAct();
      var result = null;
      if (ase !== null) {
        var asj = back ? ase.backJump : ase.fwdJump;
        if (asj === null) {
          var i = this.currentAct + (back ? -1 : 1);
          if (i >= this.elements.length || i < 0)
            i = 0;
          result = new JumpInfo('JUMP', i);
        } else {
          var rating = -1;
          var time = -1;
          if (reporter !== null) {
            var seqRegInfo = reporter.getCurrentSequenceInfo();
            if (seqRegInfo !== null) {
              rating = Math.round(seqRegInfo.tScore);
              time = Math.round(seqRegInfo.tTime / 1000);
            }
          }
          result = asj.resolveJump(rating, time);
        }
      }
      return result;
    },
    /**
     *
     * Finds the nearest sequence element with a valid 'tag', looking back in the `elements` list.
     * @param {number} num - The point of the sequence from which to start looking back.
     * @returns {string} - The nearest 'tag', or `null` if not found.
     */
    getSequenceForElement: function (num) {
      var tag = null;
      if (num >= 0 && num < this.elements.length)
        for (var i = num; tag === null && i >= 0; i--) {
          tag = this.getElement(i, false).tag;
        }
      return tag;
    },
    /**
     *
     * Gets the first {@link ActivitySequenceElement} in the `elements` list pointing to the
     * specified activity name.
     * The search is always case-insensitive.
     * @param {string} activityName - The activity to search.
     * @returns {ActivitySequenceElement} The requested element or `null` if not found.
     */
    getElementByActivityName: function (activityName) {
      var result = null;
      if (activityName !== null) {
        for (var i = 0; result === null && i < this.elements.length; i++) {
          var ase = this.getElement(i, false);
          if (ase.activityName.toLowerCase() === activityName.toLowerCase())
            result = ase;
        }
      }
      return  result;
    },
    /**
     *
     * Utility function to check if the current sequence element corresponds to the specified
     * activity. If negative, the `currentAct` will be accordingly set.
     * @param {string} activityName - The activity to check
     */
    checkCurrentActivity: function (activityName) {
      var ase = this.getCurrentAct();
      if (ase === null || ase.activityName.toUpperCase() !== activityName.toUpperCase()) {
        for (var i = 0; i < this.elements.length; i++) {
          if (this.getElement(i, false).activityName.toUpperCase() === activityName.toUpperCase()) {
            this.currentAct = i;
            return false;
          }
        }
        ase = new ActivitySequenceElement();
        ase.activityName = activityName;
        ase.fwdJump = new ActivitySequenceJump('STOP');
        ase.backJump = new ActivitySequenceJump('STOP');
        this.elements.push(ase);
        this.currentAct = this.elements.length - 1;
        return false;
      }
      return true;
    }
  };

  return ActivitySequence;

});
