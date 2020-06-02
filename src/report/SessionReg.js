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

import SequenceReg from './SequenceReg';

/**
 * This class encapsulates data of a user's working session, usually associated to a single {@link JClicProject}
 * It's main component is `sequences`, an array of {@link SequenceReg} objects.
 * @exports SessionReg
 * @class
 */
export class SessionReg {
  /**
   * SessionReg constructor
   * @param {JClicProject} project - The JClicProject referenced by this session.
   * @param {string} [code] - Optional code to be used by this SessionReg
   */
  constructor(project, code) {
    this.projectName = project.name;
    this.code = code || project.code;
    this.sequences = [];
    this.actNames = [];
    this.started = new Date();
    this.info = new SessionRegInfo(this);
    this.reportableActs = project.reportableActs;
  }

  /**
   * Builds a complex object with the results of all activities done during this working session
   * @param {booolean} recalcInfo - When `true`, global variables (number of sequences, score, total time...)
   * will be recalculated from the data stored in the {@link SequenceReg} objects.
   * @param {booolean} includeEmpty - When `true`, sequences without reported activities will be also included in the results
   * @returns {Object} - An object containing the full session data
   */
  getData(recalcInfo, includeEmpty) {
    if (recalcInfo)
      this.info.recalc();

    const result = {
      projectName: this.projectName,
      played: this.info.nActivities,
      ratioPlayed: Math.round(this.info.ratioPlayed * 100),
      solved: this.info.nActSolved,
      ratioSolved: Math.round(this.info.ratioSolved * 100),
      actions: this.info.nActions,
      score: this.info.tScore,
      time: Math.round(this.info.tTime / 10) / 100,
      sequences: []
    };

    this.sequences.forEach(s => {
      const seq = s.getData();
      if (includeEmpty || seq.activities.length > 0)
        result.sequences.push(seq);
    });
    return result;
  }

  /**
   * Returns the `info` element associated to this SessionReg.
   * @returns {SessionRegInfo}
   */
  getInfo() {
    return this.info.recalc();
  }

  /**
   * Closes this session
   */
  end() {
    this.endSequence();
  }

  /**
   * This method should be called when the current working session finishes.
   */
  endSequence() {
    if (this.currentSequence && this.currentSequence.totalTime === 0)
      this.currentSequence.endSequence();
    this.currentSequence = null;
    this.info.valid = false;
  }

  /**
   * This method should be invoked when a new sequence starts
   * @param {ActivitySequenceElement} ase - The {@link ActivitySequenceElement} referenced by this sequence.
   */
  newSequence(ase) {
    this.endSequence();
    this.currentSequence = new SequenceReg(ase);
    this.sequences.push(this.currentSequence);
    this.info.valid = false;
  }

  /**
   * This method should be invoked when the user starts a new activity
   * @param {Activity} act - The {@link Activity} that has just started
   */
  newActivity(act) {
    if (this.currentSequence) {
      // Save activity name if not yet registered
      if (this.actNames.indexOf(act.name) === -1)
        this.actNames.push(act.name);
      this.currentSequence.newActivity(act);
      this.info.valid = false;
    }
  }

  /**
   * This method should be called when the current activity finishes. Data about user's final results
   * on the activity will then be saved.
   * @param {number} score - The final score, usually in a 0-100 scale.
   * @param {number} numActions - The total number of actions done by the user to solve the activity
   * @param {boolean} solved - `true` if the activity was finally solved, `false` otherwise.
   */
  endActivity(score, numActions, solved) {
    if (this.currentSequence) {
      this.currentSequence.endActivity(score, numActions, solved);
      this.info.valid = false;
    }
  }

  /**
   * Reports a new action done by the user while playing the current activity
   * @param {string} type - Type of action (`click`, `write`, `move`, `select`...)
   * @param {string}+ source - Description of the object on which the action is done.
   * @param {string}+ dest - Description of the object that acts as a target of the action (used in pairings)
   * @param {boolean} ok - `true` if the action was OK, `false`, `null` or `undefined` otherwise
   */
  newAction(type, source, dest, ok) {
    if (this.currentSequence) {
      this.currentSequence.newAction(type, source, dest, ok);
      this.info.valid = false;
    }
  }

  /**
   * Gets the name of the current sequence
   * @returns {string}
   */
  getCurrentSequenceTag() {
    return this.currentSequence ? this.currentSequence.name : null;
  }

  /**
   * Gets information about the current sequence
   * @returns {SequenceReg.Info}
   */
  getCurrentSequenceInfo() {
    return this.currentSequence ? this.currentSequence.getInfo() : null;
  }
}

Object.assign(SessionReg.prototype, {
  /**
   * Number of activities suitable to be reported in this session
   * @name SessionReg#reportableActs
   * @type {number} */
  reportableActs: 0,
  /**
   * Array with unique names of the activities being reported in this session
   * @name SessionReg#actNames
   * @type {string[]} */
  actNames: null,
  /**
   * List of sequences done in this session
   * @name SessionReg#sequences
   * @type {SequenceReg[]} */
  sequences: null,
  /**
   * The sequence currently active
   * @name SessionReg#currentSequence
   * @type {SequenceReg} */
  currentSequence: null,
  /**
   * Starting date and time of this session
   * @name SessionReg#started
   * @type {Date} */
  started: null,
  /**
   * Name of the {@link JClicProject} associated to this session
   * @name SessionReg#projectName
   * @type {string} */
  projectName: '',
  /**
   * Current session info
   * @name SessionReg#info
   * @type {SessionRegInfo} */
  info: null,
  /**
   * Optional code to be used with this session
   * @name SessionReg#code
   * @type {string} */
  code: null,
});

/**
 * This object stores the global results of a {@link SessionReg}
 * @class
 */
export class SessionRegInfo {
  /**
   * SessionRegInfo constructor
   * @param {SessionReg} sReg - The {@link SessionReg} associated tho this `Info` object.
   */
  constructor(sReg) {
    this.sReg = sReg;
  }

  /**
   * Clears all data associated with this working session
   */
  clear() {
    this.numSequences = this.nActivities = this.nActSolved = this.nActScore = 0;
    this.ratioSolved = this.ratioPlayed = this.nActions = this.tScore = this.tTime = 0;
    this.valid = false;
  }

  /**
   * Computes the value of all global variables based on the data stored in `sequences`
   * @returns {SessionRegInfo} - This "info" object
   */
  recalc() {
    if (!this.valid) {
      this.clear();
      this.sReg.sequences.forEach(sr => {
        const sri = sr.getInfo();
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
      });
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
}

Object.assign(SessionRegInfo.prototype, {
  /**
   * The SessionReg linked to this Info object
   * @name SessionRegInfo#sReg
   * @type {SessionReg} */
  sReg: null,
  /**
   * When `false`, this session info needs to be recalculated
   * @name SessionRegInfo#valid
   * @type {boolean} */
  valid: false,
  /**
   * Number of sequences played
   * @name SessionRegInfo#numSequences
   * @type {number} */
  numSequences: 0,
  /**
   * Number of activities played
   * @name SessionRegInfo#nActivities
   * @type {number} */
  nActivities: 0,
  /**
   * Number of activities solved
   * @name SessionRegInfo#nActSolved
   * @type {number} */
  nActSolved: 0,
  /**
   * Number of activities with score > 0
   * @name SessionRegInfo#nActScore
   * @type {number} */
  nActScore: 0,
  /**
   * Percentage of solved activities
   * @name SessionRegInfo#ratioSolved
   * @type {number} */
  ratioSolved: 0,
  /**
   * Percentage of reportable activities played
   * @name SessionRegInfo#ratioPlayed
   * @type {number} */
  ratioPlayed: 0,
  /**
   * Number of actions done by the user while in this working session
   * @name SessionRegInfo#nActions
   * @type {number} */
  nActions: 0,
  /**
   * Sum of the scores of all the activities played
   * @name SessionRegInfo#tScore
   * @type {number} */
  tScore: 0,
  /**
   * Sum of the playing time reported by each activity (not always equals to the session's total time)
   * @name SessionRegInfo#tTime
   * @type {number} */
  tTime: 0,
});

SessionReg.Info = SessionRegInfo;

export default SessionReg;
