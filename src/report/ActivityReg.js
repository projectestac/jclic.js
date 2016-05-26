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
   * 
   * @exports ActivityReg
   * @class
   * @param {Activity} act - The Activity referenced by this sequence.
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
    name: '',
    code: '',
    startTime: 0,
    totalTime: 0,
    actions: [],
    solved: false,
    lastAction: null,
    score: 0,
    minActions: 0,
    closed: false,
    reportActions: false,
    numActions: 0,
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
          default:
            break;
        }
      });

      $xml.children('action').each(function () {
        var action = new ActionReg();
        action.setProperties($(this));
        actReg.actions.push(action);
      });
    },
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
    newAction: function (type, source, dest, ok) {
      if (!this.closed) {
        this.lastAction = new ActionReg(type, source, dest, ok);
        this.actions.push(lastAction);
      }
    },
    getActionReg: function (index) {
      return index >= this.actions.length ? null : this.actions[index];
    },
    closeActivity: function () {
      if (!this.closed) {
        if (this.lastAction)
          this.totalTime = this.lastAction.time - this.startTime;
        else
          this.totalTime = ((new Date()).valueOf()) - this.startTime;
        this.closed = true;
      }
    },
    getPrecision: function () {
      var result = 0;
      if (this.closed && this.minActions > 0 && this.numActions > 0) {
        if (this.solved) {
          if (this.numActions < this.minActions)
            result = 100;
          else
            result = Math.round((this.minActions * 100) / this.numActions);
        } else {
          result = Math.round(100 * (this.score * this.score) / (this.minActions * this.numActions));
        }
      }
      return result;
    },
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
