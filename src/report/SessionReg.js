/**
 *  File    : report/SessionReg.js
 *  Created : 17/05/2016
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
  "../Utils",
  "../project/JClicProject",
  "./SequenceReg"
], function ($, Utils, JClicProject, SequenceReg) {
  /**
   * This class encapsulates data of a user's working session, usually associated to a single {@link JClicProject}
   * It's main component is `sequences`, an array of {@link SequenceReg} objects.
   * @exports SessionReg
   * @class
   * @param {JClicProject} project - The JClicProject referenced by this session.
   * @param {string=} code - Optional code to be used by this SessionReg
   */
  var SessionReg = function (project, code) {
    this.projectName = project.name;
    this.code = code || project.code;
    this.sequences = [];
    this.actNames = [];
    this.started = new Date();
    this.info = new SessionReg.Info(this);
    this.reportableActs = project.reportableActs;
  };

  SessionReg.prototype = {
    constructor: SessionReg,
    /**
     * Number of activities suitable to be reported in this session
     * @type {number}
     */
    reportableActs: 0,
    /**
     * Array with unique names of the activities being reported in this session
     * @type {string[]}
     */
    actNames: null,
    /**
     * List of sequences done in this session
     * @type {SequenceReg[]} */
    sequences: null,
    /**
     * The sequence currently active
     * @type {SequenceReg} */
    currentSequence: null,
    /**
     * Starting date and time of this session
     * @type {Date} */
    started: null,
    /**
     * Name of the {@link JClicProject} associated to this session
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
    /**
     * Renders the results corresponding to this session into a DOM tree
     * @param {PlayStation} ps - The {@link PlayStation} used to retrieve localized messages
     * @param {boolean} recalcInfo - When `true`, global variables (number of sequences, score, total time...)
     * will be recalculated from the data stored in the {@link SequenceReg} objects.
     * @param {boolean} writeProjectName - When `true`, a paragraph with the project name will be
     * added to the resulting output.
     * @returns {external:jQuery[]} - Array of jQuery objects containing the full report. The main
     * object is a `table` element.
     */
    $print: function (ps, recalcInfo, writeProjectName) {
      if (recalcInfo)
        this.info.recalc();
      var $html = Utils.$HTML;

      var result = [];

      var $t = $('<table/>', { class: 'JCDetailed' });

      if (this.info.numSequences > 0) {

        result.push($('<p/>').html(writeProjectName ? ps.getMsg('Project') + ' ' + this.projectName : ''));

        $t.append($('<thead/>').append($('<tr/>').append(
          $html.th(ps.getMsg('sequence')),
          $html.th(ps.getMsg('activity')),
          $html.th(ps.getMsg('OK')),
          $html.th(ps.getMsg('actions')),
          $html.th(ps.getMsg('score')),
          $html.th(ps.getMsg('time')))));

        for (var p = 0; p < this.sequences.length; p++)
          $t.append(this.sequences[p].$print(ps));

        $t.append($('<tr/>').append(
          $html.td(ps.getMsg('Total:')),
          $html.td(this.info.nActivities + ' (' + Utils.getPercent(this.info.ratioPlayed) + ')'),
          $html.td(this.info.nActSolved + ' (' + Utils.getPercent(this.info.ratioSolved) + ')'),
          $html.td(this.info.nActions),
          $html.td(Utils.getPercent(this.info.tScore / 100)),
          $html.td(Utils.getHMStime(this.info.tTime))));
      }
      result.push($t);

      return result;
    },
    /**
     * Returns the `info` element associated to this SessionReg.
     * @returns {SessionReg.Info}
     */
    getInfo: function () {
      return this.info.recalc();
    },
    /**
     * Closes this session
     */
    end: function () {
      this.endSequence();
    },
    /**
     * This method should be called when the current working session finishes.
     */
    endSequence: function () {
      if (this.currentSequence && this.currentSequence.totalTime === 0)
        this.currentSequence.endSequence();
      this.currentSequence = null;
      this.info.valid = false;
    },
    /**
     * This method should be invoked when a new sequence starts
     * @param {ActivitySequenceElement} ase - The {@link ActivitySequenceElement} referenced by this sequence.
     */
    newSequence: function (ase) {
      this.endSequence();
      this.currentSequence = new SequenceReg(ase);
      this.sequences.push(this.currentSequence);
      this.info.valid = false;
    },
    /**
     * This method should be invoked when the user starts a new activity
     * @param {Activity} act - The {@link Activity} that has just started
     */
    newActivity: function (act) {
      if (this.currentSequence) {
        // Save activity name if not yet registered
        if (this.actNames.indexOf(act.name) === -1)
          this.actNames.push(act.name);
        this.currentSequence.newActivity(act);
        this.info.valid = false;
      }
    },
    /**
     * This method should be called when the current activity finishes. Data about user's final results
     * on the activity will then be saved.
     * @param {number} score - The final score, usually in a 0-100 scale.
     * @param {number} numActions - The total number of actions done by the user to solve the activity
     * @param {boolean} solved - `true` if the activity was finally solved, `false` otherwise.
     */
    endActivity: function (score, numActions, solved) {
      if (this.currentSequence) {
        this.currentSequence.endActivity(score, numActions, solved);
        this.info.valid = false;
      }
    },
    /**
     * Reports a new action done by the user while playing the current activity
     * @param {string} type - Type of action (`click`, `write`, `move`, `select`...)
     * @param {string}+ source - Description of the object on which the action is done.
     * @param {string}+ dest - Description of the object that acts as a target of the action (used in pairings)
     * @param {boolean} ok - `true` if the action was OK, `false`, `null` or `undefined` otherwise
     */
    newAction: function (type, source, dest, ok) {
      if (this.currentSequence) {
        this.currentSequence.newAction(type, source, dest, ok);
        this.info.valid = false;
      }
    },
    /**
     * Gets the name of the current sequence
     * @returns {string}
     */
    getCurrentSequenceTag: function () {
      return this.currentSequence ? this.currentSequence.name : null;
    },
    /**
     * Gets information about the current sequence
     * @returns {SequenceReg.Info}
     */
    getCurrentSequenceInfo: function () {
      return this.currentSequence ? this.currentSequence.getInfo() : null;
    }
  };

  /**
   * This object stores the global results of a {@link SessionReg}
   * @class
   * @param {SessionReg} sReg - The {@link SessionReg} associated tho this `Info` object.
   */
  SessionReg.Info = function (sReg) {
    this.sReg = sReg;
  };

  SessionReg.Info.prototype = {
    constructor: SessionReg.Info,
    /**
     * The SessionReg linked to this Info object
     * @type {SessionReg}
     */
    sReg: null,
    /**
     * When `false`, this session info needs to be recalculated
     * @type {boolean} */
    valid: false,
    /**
     * Number of sequences played
     * @type {number} */
    numSequences: 0,
    /**
     * Number of activities played
     * @type {number} */
    nActivities: 0,
    /**
     * Number of activities solved
     * @type {number} */
    nActSolved: 0,
    /**
     * Number of activities with score > 0
     * @type {number} */
    nActScore: 0,
    /**
     * Percentage of solved activities
     * @type {number} */
    ratioSolved: 0,
    /**
     * Percentage of reportable activities played
     * @type {number} */
    ratioPlayed: 0,
    /**
     * Number of actions done by the user while in this working session
     * @type {number} */
    nActions: 0,
    /**
     * Sum of the scores of all the activities played
     * @type {number} */
    tScore: 0,
    /**
     * Sum of the playing time reported by each activity (not always equals to the session's total time)
     * @type {number} */
    tTime: 0,
    /**
     * Clears all data associated with this working session
     */
    clear: function () {
      this.numSequences = this.nActivities = this.nActSolved = this.nActScore = 0;
      this.ratioSolved = this.ratioPlayed = this.nActions = this.tScore = this.tTime = 0;
      this.valid = false;
    },
    /**
     * Computes the value of all global variables based on the data stored in `sequences`
     * @returns {SessionReg.Info} - This "info" object
     */
    recalc: function () {
      if (!this.valid) {
        this.clear();
        for (var p = 0; p < this.sReg.sequences.length; p++) {
          var sri = this.sReg.sequences[p].getInfo();
          if (sri.nActivities > 0) {
            this.numSequences++;
            if (sri.nActClosed > 0) {
              this.nActivities += sri.nActClosed;
              this.nActions += sri.nActions;
              if (sri.nActScore > 0) {
                this.nActScore += sri.nActScore;
                this.tScore += sri.tScore * sri.nActScore;
              }
              this.tTime += sri.tTime;
              this.nActSolved += sri.nActSolved;
            }
          }
        }
        if (this.nActScore > 0)
          this.tScore = Math.round(this.tScore / this.nActScore);
        if (this.nActivities > 0) {
          this.ratioSolved = this.nActSolved / this.nActivities;
          if (this.sReg.reportableActs > 0)
            this.ratioPlayed = this.sReg.actNames.length / this.sReg.reportableActs;
        }
        this.valid = true;
      }
      return this;
    }
  };

  return SessionReg;

});
