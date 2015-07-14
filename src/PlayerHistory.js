//    File    : PlayerHistory.js  
//    Created : 28/04/2015  
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
  "./Utils"
], function (Utils) {
  /**
   * 
   * PlayerHistory uses an array to store the list of projects and activities done by the user.
   * This class allows {@link JClicPlayer} objects to rewind a sequence or to go back to a caller menu.
   * @exports PlayerHistory
   * @class
   * @param {JClicPlayer} player - The JClicPlayer associated to this history
   */
  var PlayerHistory = function (player) {
    this.player = player;
    this.sequenceStack = [];
  };

  PlayerHistory.prototype = {
    constructor: PlayerHistory,
    /**
     * The {@link JClicPlayer} object to which this `PlayerHistory` belongs
     * @type {JClicPlayer} */
    player: null,
    /**
     * This is the main member of the class. PlayerHistory puts and retrieves
     * on it information about the proects and activities done by the current user.
     * @type {PlayerHistory#HistoryElement[]} */
    sequenceStack: [],
    /**
     * When in test mode, jumps are only simulated.
     * @type {boolean} */
    testMode: false,
    /**
     * 
     * Counts the number of {@link PlayerHistory#HistoryElement HistoryElement} objects stored in
     * {@link PlayerHistory#sequenceStack sequenceStack}
     * @returns {number}
     */
    storedElementsCount: function () {
      return this.sequenceStack.length;
    },
    /**
     * 
     * Removes all elements from {@link PlayerHistory#sequenceStack sequenceStack}
     */
    clearHistory: function () {
      this.sequenceStack.length = 0;
    },
    /**
     * 
     * Inner class used to store history elements.
     * @class
     * @param {string} projectPath - The full path of the project file
     * @param {?string} sequence - The nearest sequence tag
     * @param {number} activity - The index of the current activity on the project's {@link ActivitySequence}
     * @param {?type} fullZipPath - If `projectPath` resides in a {@link external:JSZip JSZip} object,
     * the full path of the zip file.
     */
    HistoryElement: function (projectPath, sequence, activity, fullZipPath) {
      this.projectPath = projectPath;
      this.sequence = sequence;
      this.activity = activity;
      this.fullZipPath = fullZipPath;
    },
    /**
     * 
     * Adds the current project and activity to the top of the history stack.
     */
    push: function () {
      if (this.player.project !== null && this.player.project.path !== null) {
        var ase = this.player.project.activitySequence;
        var act = ase.currentAct;
        if (act >= 0) {
          if (this.sequenceStack.length > 0) {
            var last = this.sequenceStack[this.sequenceStack.length - 1];
            if (last.projectPath === this.player.project.path && last.activity === act)
              return;
          }
          this.sequenceStack.push(
              new this.HistoryElement(
                  this.player.project.path,
                  ase.getSequenceForElement(act),
                  act,
                  this.player.zip ? this.player.zip.fullZipPath : null));
        }
      }
    },
    /**
     * 
     * Retrieves the {@link PlayerHistory#HistoryElement HistoryElement} placed at the top of the
     * stack (if any) and instructs {@link JClicPlayer} to load it. The obtained effect is to
     * "rewind" or "go back", usually to an activity that acts as a menu.
     * @returns {boolean}
     */
    pop: function () {
      // todo: check return value
      if (this.sequenceStack.length > 0) {
        var e = this.sequenceStack.pop();
        if (e.projectPath === this.player.project.path &&
            Utils.isEquivalent(e.fullZipPath, (this.player.zip ? this.player.zip.fullZipPath : null)))
          this.player.load(null, e.activity, null);
        else {
          if (this.testMode && e.projectPath !== null && e.projectPath.length > 0) {
            console.log('At this point, a jump to ' + e.projectPath + ' should be performed.');
          }
          else {
            var prj = e.fullZipPath ? e.fullZipPath : e.projectPath;
            this.player.load(prj, e.activity, null);
          }
        }
      }
      return true;
    },
    /**
     * 
     * Processes the provided {@link JumpInfo} object, instructing {@link JClicPlayer} to go back,
     * stop or jump to another point in the sequence.
     * @param {JumpInfo} ji - The object to be processed
     * @param {boolean} allowReturn - When this param is `true`, the jump instructed by `ji` (if any)
     * will be recorded, thus allowing to return to the current activity.
     * @returns {boolean} - `true` if the jump can be processed without errors, `false` otherwise.
     */
    processJump: function (ji, allowReturn) {
      var result = false;
      if (ji !== null && this.player.project !== null) {
        switch (ji.action) {
          case 'STOP':
            break;
          case 'RETURN':
            result = this.pop();
            break;
          case 'EXIT':
            if (this.testMode) {
              console.log('At this point, the program should exit');
            }
            else
              this.player.exit(ji.sequence);
            break;
          case 'JUMP':
            if (!ji.sequence && !ji.projectPath) {
              var ase = this.player.project.activitySequence.getElement(ji.actNum, true);
              if (ase !== null) {
                if (allowReturn)
                  this.push();
                this.player.load(null, null, ase.activityName);
                result = true;
              }
            }
            else {
              if (this.testMode && ji.projectPath !== null && ji.projectPath.length > 0) {
                console.log('At this point, a jump to ' + ji.projectPath + ' should be performed.');
              }
              else
                result = this.jumpToSequence(ji.sequence, ji.projectPath, allowReturn);
            }
            break;
        }
      }
      return result;
    },
    /**
     * 
     * Performs a jump to the specified sequence
     * @param {string} sequence - The {@link ActivitySequence} tag to jump to.
     * @param {?string} path - When not `null`, indicates a new project file that must be loaded.
     * Otherwise, the `sequence` parameter refers to a tag on the {@link ActivitySequence} of the
     * current project.
     * @param {boolean} allowReturn - When this param is `true`, the jump will be recorded, thus
     * allowing to return to the current activity.
     */
    jumpToSequence: function (sequence, path, allowReturn) {
      if (Utils.isNullOrUndef(sequence) && Utils.isNullOrUndef(path))
        return false;
      if (Utils.isNullOrUndef(path))
        path = this.player.project.path;
      if (this.sequenceStack.length > 0) {
        var e = this.sequenceStack[this.sequenceStack.length - 1];
        if (!Utils.isNullOrUndef(sequence) && path === e.projectPath) {
          var same = sequence === e.sequence;
          if (path === this.player.project.path) {
            var ase = this.player.project.activitySequence.getElement(e.activity, false);
            same = (ase !== null && sequence === ase.tag);
          }
          if (same)
            return this.pop();
        }
      }
      if (allowReturn)
        this.push();
      if (path === this.player.project.path)
        this.player.load(null, sequence, null);
      else
        this.player.load(path, sequence, null);
      return true;
    }
  };

  return PlayerHistory;

});
