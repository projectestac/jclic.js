//    File    : ActivitySequence.js  
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
  "./JumpInfo",
  "./ActivitySequenceElement"
], function ($, JumpInfo, ActivitySequenceElement) {

  /**
   * This class stores the definition of the sequence to follow to show the activities of a
   * {@link JClicProject}. The sequence are formed by an ordered list of objects of type
   * {@link ActivitySequenceElement}.<br>
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
     * Pointer to the {@link ActivitySequenceElement} currently running (points inside the `elements`
     * array).
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
     * Searchs into the sequence for a element with the provided tag
     * @param {string} tag - The tag to search
     * @param {boolean} updateCurrentAct - when `true`, the `currentAct` index will be updated.
     * @returns {ActivitySequenceElement} - The requested element, or `null` if not found.
     */
    getElementByTag: function (tag, updateCurrentAct) {
      var result = null, resultIndex = -1;
      if (tag !== null) {
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
     * @param {boolean} hasReturn - Indicates whether the history of jumps done since the beggining
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
     * @param {boolean} hasReturn - Indicates whether the history of jumps done since the beggining
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
        var asj = (back ? ase.backJump : ase.fwdJump);
        if (asj === null) {
          var i = this.currentAct + (back ? -1 : 1);
          if (i >= this.elements.length || i < 0)
            i = 0;
          result = new JumpInfo('JUMP', i);
        }
        else {
          var rating = -1;
          var time = -1;
          // TODO: Implement Reporter and SequenceReg classes
          if (reporter !== null) {
            var seqRegInfo = reporter.getCurrentSequenceInfo();
            if (seqRegInfo !== null) {
              rating = (int)(seqRegInfo.tScore);
              time = (int)(seqRegInfo.tTime / 1000);
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
     * @param {number} num - The point of the sequence from which to start looking bak.
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
     * specified activity name.<br>
     * The search is always case-insensitive.
     * @param {string} activityName - The activity to search.
     * @returns {ActivitySequenceElement} The requested element or `null` if not found.
     */
    getElementByActivityName: function (activityName) {
      var result = null;
      if (activityName !== null) {
        for (var i = 0; result === null && i < this.elements.length; i++) {
          var ase = getElement(i, false);
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
      // TODO: Implement ActivitySequence.checkCurrentActivity
    }
  };

  return ActivitySequence;

});
