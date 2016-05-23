//  File    : SessionReg.js  
//  Created : 17/05/2016  
//  By      : fbusquet  
//
//  JClic.js  
//  HTML5 player of [JClic](http://clic.xtec.cat) activities  
//  http://projectestac.github.io/jclic.js  
//  (c) 2000-2015 Catalan Educational Telematic Network (XTEC)  
//  This program is free software: you can redistribute it and/or modify it under the terms of
//  the GNU General Public License as published by the Free Software Foundation, version. This
//  program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without
//  even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
//  General Public License for more details. You should have received a copy of the GNU General
//  Public License along with this program. If not, see [http://www.gnu.org/licenses/].  

define([
  "jquery",
  "../Utils",
  "../project/JClicProject",
  "./SequenceReg"
], function ($, Utils, JClicProject, SequenceReg) {
  /**
   * 
   * @exports SessionReg
   * @class
   * @param {JClicProject|string} project - The JClicProject referenced by this session, or just its name.
   * @param {string=} code - Optional code to be used by this SessionReg
   */
  var SessionReg = function (project, code) {
    this.projectName = project instanceof JClicProject ? project.getName() : project;
    this.code = project instanceof JClicProject ? project.code : code ? code : null;
    this.sequences = [];
    this.started = new Date();
    this.info = new SessionReg.Info(this);
  };

  SessionReg.prototype = {
    constructor: SessionReg,
    /**
     * List of sequences done in this session
     * @type {SequenceReg[]} */
    sequences: [],
    /**
     * Sequence that is currently running
     * @type {SequenceReg} */
    currentSequence: null,
    /**
     * Starting date and time of this session
     * @type {Date} */
    started: null,
    /**
     * Name of the project
     * @type {string} */
    projectName: '',
    /**
     * Current session info
     * @type {SessionReg.Info}
     */
    info: null,
    /**
     * Optional code to be used with this session
     * @type {string} */
    code: null,
    $print: function (recalcInfo, writeProjectName) {
      if (recalcInfo)
        this.info.recalc();
      var $html = Utils.$HTML;
      
      var result = [];

      var $t = $('<table/>', {class: 'JCDetailed'});

      if (this.info.numSequences > 0) {
        
        result.push(($('<p/>').html(writeProjectName ? 'Project ' + this.projectName : '')));
        
        $t.append($('<thead/>').append($('<tr/>').append(
            $html.th('sequence'),
            $html.th('activity'),
            $html.th('solved'),
            $html.th('actions'),
            $html.th('score'),
            $html.th('time'))));

        for (var p = 0; p < this.sequences.length; p++)
          $t.append(this.sequences[p].$print());

        $t.append($('<tr/>').append(
            $html.td('Totals:'),
            $html.td(this.info.nActivities),
            $html.td(this.info.nActSolved),
            $html.td(this.info.nActions),
            $html.td(Utils.getPercent(this.info.tScore / 100)),
            $html.td(Utils.getHMStime(this.info.tTime))));
      }
      result.push($t);
      
      return result;
    },
    getInfo: function (recalc) {
      if (recalc)
        this.info.recalc();
      return this.info;
    },
    end: function () {
      this.endSequence();
    },
    endSequence: function () {
      if (this.currentSequence && this.currentSequence.totalTime === 0)
        this.currentSequence.endSequence();
      this.currentSequence = null;
    },
    newSequence: function (ase) {
      this.endSequence();
      this.currentSequence = new SequenceReg(ase);
      this.sequences.push(this.currentSequence);
    },
    newActivity: function (act) {
      if (this.currentSequence)
        this.currentSequence.newActivity(act);
    },
    endActivity: function (score, numActions, solved) {
      if (this.currentSequence)
        this.currentSequence.endActivity(score, numActions, solved);
    },
    newAction: function (type, source, dest, ok) {
      if (this.currentSequence)
        this.currentSequence.newAction(type, source, dest, ok);
    },
    getCurrentSequenceTag: function () {
      return this.currentSequence ? this.currentSequence.name : null;
    },
    getCurrentSequenceInfo: function () {
      return this.currentSequence ? this.currentSequence.getInfo(true) : null;
    }
  };

  SessionReg.Info = function (sReg) {
    this.sReg = sReg;
  };

  SessionReg.Info.prototype = {
    sReg: null,
    constructor: SessionReg.Info,
    numSequences: 0,
    nActivities: 0,
    nActSolved: 0,
    nActScore: 0,
    percentSolved: 0,
    nActions: 0,
    tScore: 0,
    tTime: 0,
    clear: function () {
      this.numSequences = this.nActivities = this.nActSolved = this.nActScore = 0;
      this.percentSolved = this.nActions = this.tScore = this.tTime = 0;
    },
    recalc: function () {
      this.clear();
      for (var p = 0; p < this.sReg.sequences.length; p++) {
        var sri = this.sReg.sequences[p].getInfo(true);
        if (sri.nActivities > 0) {
          this.numSequences++;
          if (sri.nActClosed > 0) {
            this.nActivities += sri.nActClosed;
            this.nActions += sri.nActions;
            if (sri.nActScore > 0) {
              this.nActScore += sri.nActScore;
              this.tScore += (sri.tScore * sri.nActScore);
            }
            this.tTime += sri.tTime;
            this.nActSolved += sri.nActSolved;
          }
        }
      }
      if (this.nActScore > 0)
        this.tScore = Math.round(this.tScore / this.nActScore);
      if (this.nActivities > 0)
        this.percentSolved = Math.round((this.nActSolved * 100) / this.nActivities);
    }
  };

  return SessionReg;

});

