//  File    : SequenceReg.js  
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
     * {@type string} */
    name: '',
    /**
     * Optional description given to the {@link ActivitySequenceElement}
     * {@type string} */
    description: '',
    /**
     * Collection of all the {@link ActivityReg} elements done during this sequence.
     * {@type ActivityReg[]} */
    activities: [],
    /**
     * Registry linked to the {@link Activity} that is currently running
     * {@type ActivityReg} */
    currentActivity: null,
    /**
     * Total time spent on the activities of this sequence
     * {@type number} */
    totalTime: 0,
    /**
     * Flag indicating if the sequence is closed or already available for more activities
     * {@type boolean} */
    closed: false,
    /**
     * Object with global information associated to this sequence
     * {@type SequenceReg.Info} */
    info: null,
    /**
     * 
     * @param {type} ps
     * @returns {Array}
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
    getInfo: function (recalc) {
      if (recalc)
        this.info.recalc();
      return this.info;
    },
    newActivity: function (act) {
      if (!this.closed) {
        this.currentActivity = new ActivityReg(act);
        this.activities.push(this.currentActivity);
      }
    },
    newAction: function (type, source, dest, ok) {
      if (this.currentActivity) {
        this.currentActivity.newAction(type, source, dest, ok);
      }
    },
    endActivity: function (score, numActions, solved) {
      if (this.currentActivity)
        this.currentActivity.endActivity(score, numActions, solved);
    },
    endSequence: function () {
      if (this.currentActivity && this.activities.length > 0) {
        if (!this.currentActivity.closed)
          this.currentActivity.closeActivity();
        var firstActivity = this.activities[0];
        this.totalTime = this.currentActivity.startTime + this.currentActivity.totalTime - firstActivity.startTime;
      }
    }
  };

  SequenceReg.Info = function (sqReg) {
    this.sqReg = sqReg;
  };

  SequenceReg.Info.prototype = {
    sqReg: null,
    constructor: SequenceReg.Info,
    nActivities: 0,
    nActClosed: 0,
    nActSolved: 0,
    nActScore: 0,
    percentSolved: 0,
    nActions: 0,
    tScore: 0,
    tTime: 0,
    clear: function () {
      this.nActivities = this.nActClosed = this.nActSolved = this.nActScore = 0;
      this.percentSolved = this.nActions = 0, this.tScore = this.tTime = 0;
    },
    recalc: function () {
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
          this.percentSolved = Math.round((this.nActSolved * 100) / this.nActClosed);
        if (this.nActScore > 0)
          this.tScore = Math.round(this.tScore / this.nActScore);
      }
    }
  };

  return SequenceReg;

});
