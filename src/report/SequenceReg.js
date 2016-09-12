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
  "./ActivityReg"
], function ($, ActivityReg) {
  /**
   * This class stores the results of the activities related to an {@link ActivitySequenceElement}.
   * It's main component is an array of {@link ActivityReg} elements.
   * @exports SequenceReg
   * @class
   * @param {ActivitySequenceElement} ase - The {@link ActivitySequenceElement} related to this sequence.
   */
  var SequenceReg = function (ase) {
    this.name = ase.tag;
    this.description = ase.description;
    this.activities = [];
    this.currentActivity = null;
    this.totalTime = 0;
    this.closed = false;
    this.info = new SequenceReg.Info(this);
  };

  SequenceReg.prototype = {
    constructor: SequenceReg,
    /**
     * The `tag` member of the associated {@link ActivitySequenceElement}
     * @type {string} */
    name: '',
    /**
     * Optional description given to the {@link ActivitySequenceElement}
     * @type {string} */
    description: '',
    /**
     * Collection of all the {@link ActivityReg} elements done during this sequence.
     * @type {ActivityReg[]} */
    activities: [],
    /**
     * Registry linked to the {@link Activity} that is currently running
     * @type {ActivityReg} */
    currentActivity: null,
    /**
     * Total time spent on the activities of this sequence
     * @type {number} */
    totalTime: 0,
    /**
     * Flag indicating if the sequence is closed or already available for more activities
     * @type {boolean} */
    closed: false,
    /**
     * Object with global information associated to this sequence
     * @type {SequenceReg.Info} */
    info: null,
    /**
     * Renders the results corresponding to this sequence into a DOM tree
     * @param {PlayStation} ps - The {@link PlayStation} used to retrieve localized messages
     * @returns {external:jQuery[]} - Array of jQuery objects of type "tr" containing each
     * one data about one activity.
     */
    $print: function (ps) {
      var $trArray = [];
      var $tr = $('<tr/>').append($('<td/>', {rowspan: this.activities.length}).html(this.name));
      for (var p = 0; p < this.activities.length; p++) {
        $tr.append(this.activities[p].$print(ps));
        $trArray.push($tr);
        $tr = $('<tr/>');
      }
      return $trArray;
    },
    /**
     * Returns the `info` element associated to this SequenceReg.
     * @returns {SequenceReg.Info}
     */
    getInfo: function () {
      return this.info.recalc();
    },
    /**
     * This method should be called when the current working session finishes.
     */
    endSequence: function () {
      if (this.currentActivity && this.activities.length > 0) {
        if (!this.currentActivity.closed)
          this.currentActivity.closeActivity();
        var firstActivity = this.activities[0];
        this.totalTime = this.currentActivity.startTime + this.currentActivity.totalTime - firstActivity.startTime;
        this.info.valid = false;
      }
    },
    /**
     * This method should be invoked when the user starts a new activity
     * @param {Activity} act - The {@link Activity} that has just started
     */
    newActivity: function (act) {
      if (!this.closed) {
        this.currentActivity = new ActivityReg(act);
        this.activities.push(this.currentActivity);
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
      if (this.currentActivity) {
        this.currentActivity.endActivity(score, numActions, solved);
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
      if (this.currentActivity) {
        this.currentActivity.newAction(type, source, dest, ok);
        this.info.valid = false;
      }
    }
  };

  /**
   * This object stores the global results of a {@link SequenceReg}
   * @class
   * @param {SequenceReg} sqReg - The {@link SequenceReg} associated tho this `Info` object.
   */
  SequenceReg.Info = function (sqReg) {
    this.sqReg = sqReg;
  };

  SequenceReg.Info.prototype = {
    constructor: SequenceReg.Info,
    /**
     * The {@link SequenceReg} associated to this "info" object
     * @type {SequenceReg} */
    sqReg: null,
    /**
     * When `false`, data must be recalculated
     * @type {boolean} */
    valid: false,
    /**
     * Number of activities played in this sequence
     * @type {number} */
    nActivities: 0,
    /**
     * Number of activities already closed
     * @type {number} */
    nActClosed: 0,
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
     * Number of actions done by the user while in this sequence
     * @type {number} */
    nActions: 0,
    /**
     * Sum of the scores of all the activities played
     * @type {number} */
    tScore: 0,
    /**
     * Sum of the playing time reported by each activity (not always equals to the sequence's total time)
     * @type {number} */
    tTime: 0,
    /**
     * Clears all global data associated with this sequence
     */
    clear: function () {
      this.nActivities = this.nActClosed = this.nActSolved = this.nActScore = 0;
      this.ratioSolved = this.nActions = this.tScore = this.tTime = 0;
      this.valid = false;
    },
    /**
     * Computes the value of all global variables based on the data stored in `activities`
     * @returns {SequenceReg.Info} - This "info" object
     */
    recalc: function () {
      if (!this.valid) {
        this.clear();
        this.nActivities = this.sqReg.activities.length;
        if (this.nActivities > 0) {
          for (var p = 0; p < this.nActivities; p++) {
            var ar = this.sqReg.activities[p];
            if (ar.closed) {
              this.nActClosed++;
              this.tTime += ar.totalTime;
              this.nActions += ar.numActions;
              if (ar.solved)
                this.nActSolved++;
              var r = ar.getPrecision();
              if (r >= 0) {
                this.tScore += r;
                this.nActScore++;
              }
            }
          }
          if (this.nActClosed > 0)
            this.ratioSolved = this.nActSolved / this.nActClosed;
          if (this.nActScore > 0)
            this.tScore = Math.round(this.tScore / this.nActScore);
        }
        this.valid = true;
      }
      return this;
    }
  };

  return SequenceReg;
});
