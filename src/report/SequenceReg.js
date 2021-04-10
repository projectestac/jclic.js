/**
 *  File    : report/SequenceReg.js
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

import ActivityReg from './ActivityReg';

/**
 * This class stores the results of the activities related to an {@link module:bags/ActivitySequenceElement.ActivitySequenceElement ActivitySequenceElement}.
 * It's main component is an array of {@link module:report/ActivityReg.ActivityReg ActivityReg} elements.
 */
export class SequenceReg {
  /**
   * SequenceReg constructor
   * @param {module:bags/ActivitySequenceElement.ActivitySequenceElement} ase - The {@link module:bags/ActivitySequenceElement.ActivitySequenceElement ActivitySequenceElement} related to this sequence.
   */
  constructor(ase) {
    this.name = ase.tag;
    this.description = ase.description;
    this.activities = [];
    this.currentActivity = null;
    this.totalTime = 0;
    this.closed = false;
    this.info = new SequenceRegInfo(this);
  }

  /**
   * Builds a complex object with data about the results of the activities done in this sequence
   * @returns {object} - The sequence results
   */
  getData() {
    const result = {
      sequence: this.name,
      activities: []
    };
    this.activities.forEach(act => result.activities.push(act.getData()));
    return result;
  }

  /**
   * Returns the `info` element associated to this SequenceReg.
   * @returns {module:report/SequenceReg.SequenceRegInfo}
   */
  getInfo() {
    return this.info.recalc();
  }

  /**
   * This method should be called when the current working session finishes.
   */
  endSequence() {
    if (this.currentActivity && this.activities.length > 0) {
      if (!this.currentActivity.closed)
        this.currentActivity.closeActivity();
      this.totalTime = this.currentActivity.startTime + this.currentActivity.totalTime - this.activities[0].startTime;
      this.info.valid = false;
    }
  }

  /**
   * This method should be invoked when the user starts a new activity
   * @param {module:Activity.Activity} act - The {@link module:Activity.Activity Activity} that has just started
   */
  newActivity(act) {
    if (!this.closed) {
      this.currentActivity = new ActivityReg(act);
      this.activities.push(this.currentActivity);
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
    if (this.currentActivity) {
      this.currentActivity.endActivity(score, numActions, solved);
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
    if (this.currentActivity) {
      this.currentActivity.newAction(type, source, dest, ok);
      this.info.valid = false;
    }
  }
}

Object.assign(SequenceReg.prototype, {
  /**
   * The `tag` member of the associated {@link module:bags/ActivitySequenceElement.ActivitySequenceElement ActivitySequenceElement}
   * @name module:report/SequenceReg.SequenceReg#name
   * @type {string} */
  name: '',
  /**
   * Optional description given to the {@link module:bags/ActivitySequenceElement.ActivitySequenceElement ActivitySequenceElement}
   * @name module:report/SequenceReg.SequenceReg#description
   * @type {string} */
  description: '',
  /**
   * Collection of all the {@link module:report/ActivityReg.ActivityReg ActivityReg} elements done during this sequence.
   * @name module:report/SequenceReg.SequenceReg#activities
   * @type {module:report/ActivityReg.ActivityReg[]} */
  activities: [],
  /**
   * Registry linked to the {@link module:Activity.Activity Activity} that is currently running
   * @name module:report/SequenceReg.SequenceReg#currentActivity
   * @type {module:report/ActivityReg.ActivityReg} */
  currentActivity: null,
  /**
   * Total time spent on the activities of this sequence
   * @name module:report/SequenceReg.SequenceReg#totalTime
   * @type {number} */
  totalTime: 0,
  /**
   * Flag indicating if the sequence is closed or already available for more activities
   * @name module:report/SequenceReg.SequenceReg#closed
   * @type {boolean} */
  closed: false,
  /**
   * Object with global information associated to this sequence
   * @name module:report/SequenceReg.SequenceReg#info
   * @type {module:report/SequenceReg.SequenceRegInfo} */
  info: null,
});

/**
 * This object stores the global results of a {@link module:report/SequenceReg.SequenceReg SequenceReg}
 */
export class SequenceRegInfo {
  /**
   * SequenceRegInfo constructor
   * @param {module:report/SequenceReg.SequenceReg} sqReg - The {@link module:report/SequenceReg.SequenceReg SequenceReg} associated tho this `Info` object.
   */
  constructor(sqReg) {
    this.sqReg = sqReg;
  }

  /**
   * Clears all global data associated with this sequence
   */
  clear() {
    this.nActivities = this.nActClosed = this.nActSolved = this.nActScore = 0;
    this.ratioSolved = this.nActions = this.tScore = this.tTime = 0;
    this.valid = false;
  }

  /**
   * Computes the value of all global variables based on the data stored in `activities`
   * @returns {module:report/SequenceReg.SequenceRegInfo} - This "info" object
   */
  recalc() {
    if (!this.valid) {
      this.clear();
      this.nActivities = this.sqReg.activities.length;
      if (this.nActivities > 0) {
        this.sqReg.activities.forEach(ar => {
          if (ar.closed) {
            this.nActClosed++;
            this.tTime += ar.totalTime;
            this.nActions += ar.numActions;
            if (ar.solved)
              this.nActSolved++;
            const r = ar.getPrecision();
            if (r >= 0) {
              this.tScore += r;
              this.nActScore++;
            }
          }
        });
        if (this.nActClosed > 0)
          this.ratioSolved = this.nActSolved / this.nActClosed;
        if (this.nActScore > 0)
          this.tScore = Math.round(this.tScore / this.nActScore);
      }
      this.valid = true;
    }
    return this;
  }
}

Object.assign(SequenceRegInfo.prototype, {
  /**
   * The {@link module:report/SequenceReg.SequenceReg SequenceReg} associated to this "info" object
   * @name module:report/SequenceReg.SequenceRegInfo#sqReg
   * @type {module:report/SequenceReg.SequenceReg} */
  sqReg: null,
  /**
   * When `false`, data must be recalculated
   * @name module:report/SequenceReg.SequenceRegInfo#valid
   * @type {boolean} */
  valid: false,
  /**
   * Number of activities played in this sequence
   * @name module:report/SequenceReg.SequenceRegInfo#nActivities
   * @type {number} */
  nActivities: 0,
  /**
   * Number of activities already closed
   * @name module:report/SequenceReg.SequenceRegInfo#nActClosed
   * @type {number} */
  nActClosed: 0,
  /**
   * Number of activities solved
   * @name module:report/SequenceReg.SequenceRegInfo#nActSolved
   * @type {number} */
  nActSolved: 0,
  /**
   * Number of activities with score > 0
   * @name module:report/SequenceReg.SequenceRegInfo#nActScore
   * @type {number} */
  nActScore: 0,
  /**
   * Percentage of solved activities
   * @name module:report/SequenceReg.SequenceRegInfo#ratioSolved
   * @type {number} */
  ratioSolved: 0,
  /**
   * Number of actions done by the user while in this sequence
   * @name module:report/SequenceReg.SequenceRegInfo#nActions
   * @type {number} */
  nActions: 0,
  /**
   * Sum of the scores of all the activities played
   * @name module:report/SequenceReg.SequenceRegInfo#tScore
   * @type {number} */
  tScore: 0,
  /**
   * Sum of the playing time reported by each activity (not always equals to the sequence's total time)
   * @name module:report/SequenceReg.SequenceRegInfo#tTime
   * @type {number} */
  tTime: 0,
});

SequenceReg.Info = SequenceRegInfo;

export default SequenceReg;
