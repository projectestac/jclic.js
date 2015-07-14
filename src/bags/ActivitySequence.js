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

// This class stores the definition of the sequence of activities of
// a [JClicProject](JClicProject.html). The sequence are formed by an ordered
// list of objects of type [ActivitySequenceElement](ActivitySequenceElement.html),
// It stores also a transient pointer to the current element.
//
  var ActivitySequence = function (project) {
    this.project = project;
    this.elements = [];
  };

  ActivitySequence.prototype = {
    constructor: ActivitySequence,
    // 
    // The array of [ActivitySequenceElement](ActivitySequenceElement.html) objects
    elements: null,
    //
    // The [JClicProject](JClicProject.html) to which this ActivitySequence belongs
    project: null,
    //
    // Pointer to the [ActivitySequenceElement](ActivitySequenceElement.html) currently running.
    currentAct: -1,
    // 
    // Loads the object settings from a specific JQuery XML element 
    setProperties: function ($xml) {
      var elements = this.elements;
      $xml.children('item').each(function (i, data) {
        var ase = new ActivitySequenceElement().setProperties($(data));
        elements.push(ase);
      });
      return this;
    },
    // 
    // Returns the index in the sequence of the provided element
    // - ase([ActivitySequenceElement](ActivitySequenceElement.html)): the
    // element to search.
    getElementIndex: function (ase) {
      return ase === null ? -1 : this.elements.indexOf(ase);
    },
    // 
    // Returns the nth element of the sequence
    // - n (number): The index of the requested element
    // - updateCurrentAct (boolean): when `true`, the `currentAct` index
    // will be updated
    // - returns the requested [ActivitySequenceElement](ActivitySequenceElement.html)
    // object, or `null` if the request was out of range.
    getElement: function (n, updateCurrentAct) {
      var result = null;
      if (n >= 0 && n < this.elements.length) {
        result = this.elements[n];
        if (updateCurrentAct)
          this.currentAct = n;
      }
      return result;
    },
    // 
    // Searchs the sequence for a element with the provided tag
    // - tag (string): The tag to search
    // - updateCurrentAct (boolean): when `true`, the `currentAct` index
    // will be updated
    // - returns the requested [ActivitySequenceElement](ActivitySequenceElement.html)
    // object, or `null` when not found.
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
    // 
    // Returns the [ActivitySequenceElement](ActivitySequenceElement.html)
    // pointed by `currentAct`, or `null` if not set.
    getCurrentAct: function () {
      return this.getElement(this.currentAct, false);
    },
    // 
    // Check if the current position in the sequence can continue forward
    // - hasReturn (boolean): indicates that the history of jumps done is
    // not empty, thus a `RETURN` action is still possible.
    // - returns: `true` if the user can go ahead to another activity, `false`
    // otherwise.
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
    // 
    // Check if the current position in the sequence can go back
    // - hasReturn (boolean): indicates that the history of jumps done is
    // not empty, thus a `RETURN` action is still possible.
    // - returns: `true` if the user can go back to another activity, `false`
    // otherwise.
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
    // 
    // Gets the current state for the 'next' and 'prev' buttons
    // - returns (string): one of the possible values of
    // [ActivitySequenceElement](ActivitySequenceElement.html).navButtons, 
    // thus: `none`, `fwd`, `back` or `both`
    getNavButtonsFlag: function () {
      var flag = 'none';
      var ase = this.getCurrentAct();
      if (ase !== null)
        flag = ase.navButtons;
      return flag;
    },
    // 
    // Computes the jump to be done from the current position
    // - back (boolean): when `true`, the request is for the 'go back' button. 
    // Otherwise, is for the 'next' one.
    // - reporter ([Reporter](Reporter.html)): The reporting engine that
    // will provide values for average score and time spend on the 
    // activities, used only in conditional jumps.
    // - returns: A [JumpInfo](JumpInfo) object if a valid jump is possible,
    // `null` otherwise.
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
    // 
    // Finds the nearest sequence element with a 'tag', always looking back
    // in the list.
    // num (number): The position in the element's list to start looking for.
    // returns: the nearest 'tag', or `null` if not found.
    getSequenceForElement: function (num) {
      var tag = null;
      if (num >= 0 && num < this.elements.length)
        for (var i = num; tag === null && i >= 0; i--) {
          tag = this.getElement(i, false).tag;
        }
      return tag;
    },
    // 
    // Gets the first [ActivitySequenceElement](ActivitySequenceElement.html)
    // of the sequence pointing to the provided activity name.
    // The search is case-insensitive.
    // - activityName (string): the name of the activity to search.
    // - returns: the [ActivitySequenceElement](ActivitySequenceElement.html)
    // if found, `null` otherwise.
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
    //
    // Utility function to check if the current activity is really the indicated
    checkCurrentActivity: function(activityName){
      // TODO: Implement ActivitySequence.checkCurrentActivity
    }
  };

  return ActivitySequence;

});
