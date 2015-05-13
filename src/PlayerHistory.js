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

define([], function () {

  //
  // PlayerHistory uses an array to store the list of projects and activities
  // done by the user. This class allows [JClicPlayer](JClicPlayer.html) objects
  // to rewind a sequence or go back to a caller menu.
  var PlayerHistory = function (player) {
    this.player = player;
    this.sequenceStack = [];
  };

  PlayerHistory.prototype = {
    constructor: PlayerHistory,
    // 
    // The [JClicPlayer](JClicPlayer.html) object this `PlayerHistory` belongs to
    player: null,
    // 
    // This is the main member of the class. PlayerHistory puts and retrieves
    // on it information about the proects and activities done by the current user.
    sequenceStack: [],
    //
    // When in test mode, jumps are only simulated.
    testMode: false,
    //
    // Counts the number of history elements stored in the stack
    storedElementsCount: function () {
      return this.sequenceStack.length;
    },
    //
    // Removes all the elements from the history stack
    clearHistory: function () {
      this.sequenceStack.length = 0;
    },
    // 
    // Inner class used to store history elements.
    HistoryElement: function (projectPath, sequence, activity) {
      this.projectPath = projectPath;
      this.sequence = sequence;
      this.activity = activity;
    },
    //
    // Adds the current project and activity to the top of the
    // history stack.
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
                  act));
        }
      }
    },
    //
    // Retrieves the history element placed at the top of the stack (if any) and instructs
    // the `JClicPlayer` to load it. The obtained effect is to "rewind" or "go back",
    // usually to a caller menu or activity.
    pop: function () {
      // todo: check return value
      if (this.sequenceStack.length > 0) {
        var e = this.sequenceStack.pop();
        if (e.projectPath === this.player.project.path)
          this.player.load(null, e.activity, null, null);
        else {
          if (this.testMode && e.projectPath !== null && e.projectPath.length > 0) {
            console.log('At this point, a jump to ' + e.projectPath + ' should be performed.');
          }
          else {
            this.player.load(e.projectPath, e.activity, null, null);
          }
        }
      }
      return true;
    },
    //
    // Processes the provided [JumpInfo](JumpInfo.html) object, instructing the
    // [JClicPlayer](JClicPlayer.html) to go back, stop or jump to another point
    // in the sequence.
    // ji (JumpInfo) - The object to be processed
    // allowReturn (boolean) - When this param is `true`, the jump instructed by
    // `ji` (if any) will be recorded, thus allowing to go back returning to
    // the current activity.
    // Returns `true` if the jump can be processed without errors, `false` otherwise.
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
            if (!ji.sequence  && !ji.projectPath) {
              var ase = this.player.project.activitySequence.getElement(ji.actNum, true);
              if (ase !== null) {
                if (allowReturn)
                  this.push();
                this.player.load(null, null, ase.activityName, null);
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
    //
    // Performs a jump to the specified sequence
    // sequence (String) - The [ActivitySequence](ActivitySequence.html) tag to jump to.
    // path (String) - When different of `null`, indicates a new project file that must
    // be loaded. Otherwise, the `sequence` parameter refers to the ActivitySequence of
    // the current project.
    // allowReturn (boolean) - When this param is `true`, the jump will be recorded,
    // thus allowing to go back returning to the current activity.    
    jumpToSequence: function (sequence, path, allowReturn) {
      if (sequence === null && path === null)
        return false;
      if (path === null)
        path = this.player.project.path;
      if (this.sequenceStack.length > 0) {
        var e = this.sequenceStack[this.sequenceStack.length - 1];
        if (sequence !== null && path === e.projectPath) {
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
        this.player.load(null, sequence, null, null);
      else
        this.player.load(path, sequence, null, null);
      return true;
    }
  };

  return PlayerHistory;

});
