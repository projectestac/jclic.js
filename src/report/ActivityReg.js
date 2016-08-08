//  File    : ActivityReg.js  
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
  "./ActionReg"
], function ($, Utils, ActionReg) {
  /**
   * This class stores miscellaneous data obtained by the current user playing an {@link Activity}.
   * @exports ActivityReg
   * @class
   * @param {Activity} act - The [@link Activity} referenced by this object.
   */
  var ActivityReg = function (act) {
    this.name = act.name;
    this.code = act.code;
    this.actions = [];
    this.startTime = (new Date()).valueOf();
    this.minActions = act.getMinNumActions();
    this.reportActions = act.reportActions;
  };

  ActivityReg.prototype = {
    constructor: ActivityReg,
    /**
     * Name of the associated activity
     * @type {string} */
    name: '',
    /**
     * Optional code assigned to this activity, used for later filtering
     * @type {string} */
    code: '',
    /**
     * Timestamp when the user starts playing the activity
     * @type {number} */
    startTime: 0,
    /**
     * Total time spent by the user in the activity, measured in milliseconds
     * @type {number} */
    totalTime: 0,
    /**
     * Collection of actions done by the user while playing the activity
     * @type {ActionReg[]} */
    actions: [],
    /**
     * `true` only when the user has finished and solved the activity
     * @type {boolean} */
    solved: false,
    /**
     * Last {@link ActionReg} performed by the user in this activity
     * @type {ActionReg} */
    lastAction: null,
    /**
     * Final score obtained by the current user in this activity
     * @type {number} */
    score: 0,
    /**
     * Minimum number of actions needed to solve the activity
     * @type {number} */
    minActions: 0,
    /**
     * `true` when the activity has finished, `false` for the activity that is currently playing
     * @type {boolean} */
    closed: false,
    /**
     * `true` when this type of activity should record specific actions done by the users
     * @type {boolean} */
    reportActions: false,
    /**
     * Number of actions done by the user playing this activity
     * @type {number} */
    numActions: 0,
    /**
     * Provides the data associated with the current activity in an XML format suitable for a
     * [JClic Reports server](http://clic.xtec.cat/en/jclic/reports/).
     * @returns {external:jQuery}
     */
    $getXML: function () {
      var attr = {
        start: this.startTime,
        time: this.totalTime,
        solved: this.solved,
        score: this.score,
        minActions: this.minActions,
        actions: this.numActions
      };
      if (this.name)
        attr.name = this.name;
      if (this.code)
        attr.code = this.code;
      if (!this.closed)
        attr.closed = false;
      if (this.reportActions)
        attr.reportActions = true;

      var $result = $('<activity/>', attr);
      for (var p = 0; p < this.actions.length; p++) {
        $result.append(this.actions[p].$getXML());
      }
      return $result;
    },
    /**
     * Fills this ActivityReg with data provided in XML format
     * @param {external:jQuery} $xml -The XML element to be processed, already wrapped as jQUery object
     */
    setProperties: function ($xml) {
      var actReg = this;
      $each($xml.get(0).attributes, function () {
        var name = this.name;
        var value = this.value;
        switch (name) {
          case 'name':
          case 'code':
            actReg[name] = value;
            break;
          case 'start':
          case 'time':
          case 'score':
          case 'minActions':
          case 'actions':
            actReg[name] = Number(value);
            break;
          case 'solved':
          case 'closed':
          case 'reportActions':
            actReg[name] = Utils.getBoolean(value, false);
            break;
        }
      });
      $xml.children('action').each(function () {
        var action = new ActionReg();
        action.setProperties($(this));
        actReg.actions.push(action);
      });
    },
    /**
     * Renders the results of this activity into a DOM tree
     * @param {PlayStation} ps - The {@link PlayStation} used to retrieve localized messages
     * @returns {external:jQuery[]} - Am array of jQuery objects of type "td" containing each
     * one specific results of the activity.
     */
    $print: function (ps) {
      var $html = Utils.$HTML;
      var result = [];
      if (this.closed) {
        result.push($html.td(this.name));
        result.push(this.solved ? $html.td(ps.getMsg('YES'), 'ok') : $html.td(ps.getMsg('NO'), 'no'));
        result.push($html.td(this.numActions));
        result.push($html.td(Utils.getPercent(this.getPrecision() / 100)));
        result.push($html.td(Utils.getHMStime(this.totalTime)));
      } else {
        result.push($html.td(this.name, 'incomplete'));
        for (var p = 0; p < 4; p++)
          result.push($html.td('-', 'incomplete'));
      }
      return result;
    },
    /**
     * Reports a new action done by the user while playing the current activity
     * @param {string} type - Type of action (`click`, `write`, `move`, `select`...)
     * @param {string}+ source - Description of the object on which the action is done.
     * @param {string}+ dest - Description of the object that acts as a target of the action (used in pairings)
     * @param {boolean} ok - `true` if the action was OK, `false`, `null` or `undefined` otherwhise
     */
    newAction: function (type, source, dest, ok) {
      if (!this.closed) {
        this.lastAction = new ActionReg(type, source, dest, ok);
        this.actions.push(this.lastAction);
      }
    },
    /**
     * Retrieves a specific {@link ActionReg} element from `actions`
     * @param {number} index - The nth action to be retrieved
     * @returns {ActionReg}
     */
    getActionReg: function (index) {
      return index >= this.actions.length ? null : this.actions[index];
    },
    /**
     * Closes the current activity, adjusting total time if needed
     */
    closeActivity: function () {
      if (!this.closed) {
        if (this.lastAction)
          this.totalTime = this.lastAction.time - this.startTime;
        else
          this.totalTime = (new Date()).valueOf() - this.startTime;
        this.closed = true;
      }
    },
    /**
     * calculates the final score obtained by the user in this activity.
     * The algorithm used takes in account the minimal number of actions needed, the actions
     * really done by the user, and if the activity was finally solved or not.
     * @returns {number}
     */
    getPrecision: function () {
      var result = 0;
      if (this.closed && this.minActions > 0 && this.numActions > 0) {
        if (this.solved) {
          if (this.numActions < this.minActions)
            result = 100;
          else
            result = Math.round(this.minActions * 100 / this.numActions);
        } else {
          result = Math.round(100 * (this.score * this.score) / (this.minActions * this.numActions));
        }
      }
      return result;
    },
    /**
     * This method should be called when the current activity finishes. Data about user's final results
     * on the activity will then be saved.
     * @param {number} score - The final score, usually in a 0-100 scale.
     * @param {number} numActions - The total number of actions done by the user to solve the activity
     * @param {boolean} solved - `true` if the activity was finally solved, `false` otherwise.
     */
    endActivity: function (score, numActions, solved) {
      if (!this.closed) {
        this.solved = solved;
        this.numActions = numActions;
        this.score = score;
        this.closeActivity();
      }
    }
  };

  return ActivityReg;

});
