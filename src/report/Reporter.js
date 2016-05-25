//  File    : Reporter.js  
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
  "./SessionReg",
  "../Utils"
], function ($, SessionReg, Utils) {

  /**
   * This class implements the basic operations related with the processing of times and scores
   * done by users playing JClic activities. These operations include
   * users identification, compilation of data coming from the activities, storage of
   * this data for later use, and presentation of summarized results.
   * @exports Reporter
   * @class
   */
  var Reporter = function () {
    this.sessions = [];
    this.started = new Date();
    this.initiated = false;
  };

  Reporter.prototype = {
    constructor: Reporter,
    /**
     * User ID currently associated to this reporting system
     * @type {string} */
    userId: null,
    /**
     * Optional key to be added as a field of session records
     * @type {string} */
    sessionKey: null,
    /**
     * A second optional key to be reported as a field of session records
     * @type {string} */
    sessionContext: null,
    /**
     * Optional filter to be used in group selection dialog
     * @type {string} */
    groupCodeFilter: null,
    /**
     * Optional filter to be used in user selection dialog
     * @type {string} */
    userCodeFilter: null,
    /**
     * Details about this report system
     * @type {string} */
    description: 'Results are not currently being saved',
    /**
     * Starting date and time of this Reporter
     * @type {Date} */
    started: null,
    /**
     * Array of registered sessions
     * @type {SessionReg[]} */
    sessions: [],
    /**
     * Currently active session
     * @type {SessionReg} */
    currentSession: null,
    /**
     * `true` if the system was successfully initiated, `false` otherwise
     * @type {boolean} */
    initiated: false,
    /**
     * `true` if the system is connected to a database with user's data.
     * When `false`, a generic ID will be used. */
    bUserBased: null,
    getProperty: function (key, defaultValue) {
      return defaultValue;
    },
    getBooleanProperty: function (key, defaultValue) {
      var s = getProperty(key, defaultValue === true ? 'true' : 'false');
      return key === null ? defaultValue : s === 'true' ? true : false;
    },
    getGroups: function () {
      return null;
    },
    getUsers: function (groupId) {
      return null;
    },
    getUserData: function (userId) {
      return null;
    },
    getGroupData: function (groupId) {
      return null;
    },
    userBased: function () {
      if (this.bUserBased === null)
        this.bUserBased = this.getBooleanProperty('USER_TABLES', true);
      return this.bUserBased;
    },
    promptForNewGroup: function () {
      // TODO: Implement promptForNewGroup
      return null;
    },
    promptForNewUser: function () {
      // TODO: Implement promptForNewUser
      return null;
    },
    promptGroupId: function () {
      // TODO: Implement promptGroupId
      return null;
    },
    promptUserId: function () {
      // TODO: Implement promptUserId
      return null;
    },
    $print: function () {
      var $html = Utils.$HTML;
      var result = [];

      var $t = $('<table/>', {class: 'JCGlobalResults'});
      $t.append(
          $html.doubleCell('Session started:', this.started.toLocaleDateString() + ' ' + this.started.toLocaleTimeString()),
          $html.doubleCell('Reports system:', this.description));
      if (this.userId)
        $t.append($html.doubleCell('User:', this.userId));

      var numSessions = 0, numSequences = 0, nActivities = 0, nActSolved = 0, nActScore = 0, nActions = 0,
          percentSolved = 0, tScore = 0, tTime = 0;

      for (var p = 0; p < this.sessions.length; p++) {
        var inf = this.sessions[p].getInfo(true);
        if (inf.numSequences > 0) {
          numSessions++;
          numSequences += inf.numSequences;
          if (inf.nActivities > 0) {
            nActivities += inf.nActivities;
            nActSolved += inf.nActSolved;
            nActions += inf.nActions;
            if (inf.nActScore > 0) {
              tScore += (inf.tScore * inf.nActScore);
              nActScore += inf.nActScore;
            }
            tTime += inf.tTime;
          }
        }
      }

      if (numSequences > 0) {
        if (numSessions > 1)
          $t.append($html.doubleCell('Projects:', numSessions));
        $t.append($html.doubleCell('Sequences:', numSequences),
            $html.doubleCell('Activities done:', nActivities));
        if (nActivities > 0) {
          percentSolved = nActSolved / nActivities;
          $t.append($html.doubleCell('Activities solved:', nActSolved + " (" + Utils.getPercent(percentSolved) + ")"));
          if (nActScore > 0)
            $t.append($html.doubleCell('Global score:', Utils.getPercent(tScore / (nActScore * 100))));
          $t.append($html.doubleCell('Total time in activities:', Utils.getHMStime(tTime)),
              $html.doubleCell('Actions done:', nActions));
        }

        result.push($t);

        for (var p = 0; p < this.sessions.length; p++) {
          var sr = this.sessions[p];
          if (sr.getInfo(false).numSequences > 0)
            result = result.concat(sr.$print(false, numSessions > 1));
        }
      } else
        result.push($('<p/>').html('No activities done!'));

      return result;
    },
    init: function (properties) {
      this.userId = Utils.getVal(properties.user);
      this.sessionKey = Utils.getVal(properties.key);
      this.sessionContext = Utils.getVal(properties.context);
      this.groupCodeFilter = Utils.getVal(properties.groupCodeFilter);
      this.userCodeFilter = Utils.getVal(properties.userCodeFilter);
      this.initiated = true;
    },
    end: function () {
      this.endSession();
    },
    endSequence: function () {
      if (this.currentSession)
        this.currentSession.endSequence();
    },
    endSession: function () {
      this.endSequence();
      this.currentSession = null;
    },
    newGroup: function (gd) {
      throw "No database!";
    },
    newUser: function (ud) {
      throw "No database!";
    },
    newSession: function (jcp) {
      this.endSession();
      this.currentSession = new SessionReg(jcp);
      this.sessions.push(this.currentSession);
    },
    newSequence: function (ase) {
      if (this.currentSession)
        this.currentSession.newSequence(ase);
    },
    newActivity: function (act) {
      if (this.currentSession)
        this.currentSession.newActivity(act);
    },
    endActivity: function (score, numActions, solved) {
      if (this.currentSession)
        this.currentSession.endActivity(score, numActions, solved);
    },
    newAction: function (type, source, dest, ok) {
      if (this.currentSession)
        this.currentSession.newAction(type, source, dest, ok);
    },
    getCurrentSequenceInfo: function () {
      return this.currentSession === null ? null : this.currentSession.getCurrentSequenceInfo();
    },
    getCurrentSequenceTag: function () {
      return this.currentSession === null ? null : this.currentSession.getCurrentSequenceTag();
    }
  };

  /**
   * List of classes derived from Reporter. It should be filled by Reporter classes at declaration time.
   * @type {Object}
   */
  Reporter.CLASSES = {'Reporter': Reporter};

  Reporter.getReporter = function (className, properties) {
    var result = null;
    if (className === null) {
      className = 'Reporter';
      if (properties.hasOwnProperty('reporter'))
        className = properties.reporter;
    }
    if (Reporter.CLASSES.hasOwnProperty(className)) {
      result = new Reporter.CLASSES[className]();
      // TODO: Group reporter params into a single Object (as `reporterParams` in JClic)?
      result.init(properties);
    } else {
      console.log('Unknown reporter class: ' + className);
    }
    return result;
  };

  return Reporter;

});
