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
   * done by users playing JClic activities. These operations include: identification of users,
   * compilation of data coming from the activities, storage of this data for later use, and
   * presentation of summarized results.
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
     * User ID currently associated with this reporting system
     * @type {string} */
    userId: null,
    /**
     * Optional key to be added as a field in session records
     * @type {string} */
    sessionKey: null,
    /**
     * A second optional key to be reported as a field in session records
     * @type {string} */
    sessionContext: null,
    /**
     * Optional filter key to be used in the group selection dialog
     * @type {string} */
    groupCodeFilter: null,
    /**
     * Another optional filter key to be used in the user selection dialog
     * @type {string} */
    userCodeFilter: null,
    /**
     * Description of this reporting system
     * @type {string} */
    descriptionKey: 'Results are not currently being saved',
    /**
     * Starting date and time of this report
     * @type {Date} */
    started: null,
    /**
     * Array of sessions included in this report
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
     * When `false`, a generic ID will be used. 
     * @type {boolean} */
    bUserBased: null,
    /**
     * Get a specific property from this reporting system
     * @param {string} key - Requested property
     * @param {string+} defaultValue - Default return value when requested property does not exist
     * @returns {string}
     */
    getProperty: function (key, defaultValue) {
      return defaultValue;
    },
    /**
     * Get a specific boolean property from this reporting system
     * @param {string} key - Requested property
     * @param {boolean+} defaultValue - Default return when requested property does not exist
     * @returns {boolean}
     */
    getBooleanProperty: function (key, defaultValue) {
      var s = getProperty(key, defaultValue === true ? 'true' : 'false');
      return key === null ? defaultValue : s === 'true' ? true : false;
    },
    /**
     * Get the list of current groups or organizations registered on this reporting system
     * @returns {Object[]}
     */
    getGroups: function () {
      return null;
    },
    /**
     * Get the list of current users registered on this reporting system, optionally filtered by
     * a specific group ID.
     * @param {string+} groupId - Optional group ID to be used as a filter criteria
     * @returns {Object[]}
     */
    getUsers: function (groupId) {
      return null;
    },
    /**
     * Get extended data associated with a specific user
     * @param {string} userId - The requested user ID
     * @returns {Object}
     */
    getUserData: function (userId) {
      return null;
    },
    /**
     * Gen extended data associated with a specific group or organization
     * @param {string} groupId - The requested group ID
     * @returns {Object}
     */
    getGroupData: function (groupId) {
      return null;
    },
    /**
     * Checks if this reporting system manages its own database of users and groups. Defaults to `false`
     * @returns {boolean}
     */
    userBased: function () {
      if (this.bUserBased === null)
        this.bUserBased = this.getBooleanProperty('USER_TABLES', false);
      return this.bUserBased;
    },
    /**
     * Allows the current user to create a new group, and asks his name
     * @returns {string} - The name choosen for the new group
     */
    promptForNewGroup: function () {
      // TODO: Implement promptForNewGroup
      return null;
    },
    /**
     * Allows the current user to create a new user ID, and asks his ID and password
     * @returns {string} - The choosen user ID
     */
    promptForNewUser: function () {
      // TODO: Implement promptForNewUser
      return null;
    },
    /**
     * Allows the current user to select its group or organization from the current groups list
     * @returns {string} - The choosen group ID
     */
    promptGroupId: function () {
      // TODO: Implement promptGroupId
      return null;
    },
    /**
     * Asks the current user which is its ID
     * @returns {string} - A valid user ID, or `null` if cancelled or error thrown
     */
    promptUserId: function () {
      // TODO: Implement promptUserId
      return null;
    },
    /**
     * Renders the data contained in this report into a DOM tree
     * @param {PlayStation} ps - The {@link PlayStation} used to retrieve localized messages
     * @returns {external:jQuery} - A jQuery object with a `div` element containing the full report.
     */
    $print: function (ps) {
      var $html = Utils.$HTML;
      var result = [];

      result.push($('<div/>', {class: 'subTitle'}).html(ps.getMsg('Current results')));

      var $t = $('<table/>', {class: 'JCGlobalResults'});
      $t.append(
          $html.doubleCell(ps.getMsg('Session started:'), this.started.toLocaleDateString() + ' ' + this.started.toLocaleTimeString()),
          $html.doubleCell(ps.getMsg('Reports system:'), ps.getMsg(this.descriptionKey)));
      if (this.userId)
        $t.append($html.doubleCell(this.ps.getMsg('User:'), this.userId));

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
          $t.append($html.doubleCell(ps.getMsg('Projects:'), numSessions));
        $t.append($html.doubleCell(ps.getMsg('Sequences:'), numSequences),
            $html.doubleCell(ps.getMsg('Activities done:'), nActivities));
        if (nActivities > 0) {
          percentSolved = nActSolved / nActivities;
          $t.append($html.doubleCell(ps.getMsg('Activities solved:'), nActSolved + " (" + Utils.getPercent(percentSolved) + ")"));
          if (nActScore > 0)
            $t.append($html.doubleCell(ps.getMsg('Global score:'), Utils.getPercent(tScore / (nActScore * 100))));
          $t.append($html.doubleCell(ps.getMsg('Total time in activities:'), Utils.getHMStime(tTime)),
              $html.doubleCell(ps.getMsg('Actions done:'), nActions));
        }

        result.push($t);

        for (var p = 0; p < this.sessions.length; p++) {
          var sr = this.sessions[p];
          if (sr.getInfo(false).numSequences > 0)
            result = result.concat(sr.$print(ps, false, numSessions > 1));
        }
      } else
        result.push($('<p/>').html(ps.getMsg('No activities done!')));

      return result;
    },
    /**
     * Initializes this report system with an optional set of parameters
     * @param {Object} properties - Initial settings passed to the reporting system
     */
    init: function (properties) {
      this.userId = Utils.getVal(properties.user);
      this.sessionKey = Utils.getVal(properties.key);
      this.sessionContext = Utils.getVal(properties.context);
      this.groupCodeFilter = Utils.getVal(properties.groupCodeFilter);
      this.userCodeFilter = Utils.getVal(properties.userCodeFilter);
      this.initiated = true;
    },
    /**
     * Closes this reporting system
     */
    end: function () {
      this.endSession();
    },
    /**
     * Finalizes the current sequence
     */
    endSequence: function () {
      if (this.currentSession)
        this.currentSession.endSequence();
    },
    /**
     * Finalizes the current session
     */
    endSession: function () {
      this.endSequence();
      this.currentSession = null;
    },
    /**
     * Creates a new group (method to be implemented in subclasses)
     * @param {GroupData} gd
     */
    newGroup: function (gd) {
      throw "No database!";
    },
    /**
     * Creates a new user (method to be implemented in subclasses)
     * @param {UserData} ud
     */
    newUser: function (ud) {
      throw "No database!";
    },
    /**
     * This method should be invoked when a new session starts
     * @param {JClicProject|string} jcp - The {@link JClicProject} referenced by this session, or
     * just its name.
     */
    newSession: function (jcp) {
      this.endSession();
      this.currentSession = new SessionReg(jcp);
      this.sessions.push(this.currentSession);
    },
    /**
     * This method should be invoked when a new sequence starts
     * @param {ActivitySequenceElement} ase - The {@link ActivitySequenceElement} referenced by this sequence.
     */
    newSequence: function (ase) {
      if (this.currentSession)
        this.currentSession.newSequence(ase);
    },
    /**
     * This method should be invoked when users start a new activity
     * @param {Activity} act - The {@link Activity} just started.
     */
    newActivity: function (act) {
      if (this.currentSession)
        this.currentSession.newActivity(act);
    },
    /**
     * This method should be called when the current activity finishes. It provides data about the
     * final results obtained by the user playing this activity.
     * @param {number} score - The final score, usually in a 0-100 scale.
     * @param {number} numActions - The total number of actions done by the user to solve the activity
     * @param {boolean} solved - `true` if the activity was finally solved, `false` otherwise.
     */
    endActivity: function (score, numActions, solved) {
      if (this.currentSession)
        this.currentSession.endActivity(score, numActions, solved);
    },
    /**
     * Reports a new action done by the user while playing the current activity
     * @param {string} type - Type of action (`click`, `write`, `move`, `select`...)
     * @param {string+} source - Description of the object on which the action was done.
     * @param {string+} dest - Description of the object that has acted as a target of the action (usually in pairings)
     * @param {boolean} ok - `true` if the action was OK, `false`, `null` or `undefined` otherwhise
     */
    newAction: function (type, source, dest, ok) {
      if (this.currentSession)
        this.currentSession.newAction(type, source, dest, ok);
    },
    /**
     * Gets information about the current sequence
     * @returns {SequenceReg.Info}
     */
    getCurrentSequenceInfo: function () {
      return this.currentSession === null ? null : this.currentSession.getCurrentSequenceInfo();
    },
    /**
     * Gets the name of the current sequence
     * @returns {string}
     */
    getCurrentSequenceTag: function () {
      return this.currentSession === null ? null : this.currentSession.getCurrentSequenceTag();
    }
  };

  /**
   * List of classes derived from Reporter. It should be filled by Reporter classes at declaration time.
   * @type {Object}
   */
  Reporter.CLASSES = {'Reporter': Reporter};

  /**
   * Creates a new reporter of the requested class
   * @param {string} className - Class name of the requested reporter.
   * @param {Object} options - Initial settings to be passed to the constuctor of the new reporter.
   * @returns {Reporter}
   */
  Reporter.getReporter = function (className, options) {
    var result = null;
    if (className === null) {
      className = 'Reporter';
      if (options.hasOwnProperty('reporter'))
        className = options.reporter;
    }
    if (Reporter.CLASSES.hasOwnProperty(className)) {
      result = new Reporter.CLASSES[className]();
      // TODO: Group reporter params into a single Object (as `reporterParams` in JClic)?
      result.init(options);
    } else {
      console.log('Unknown reporter class: ' + className);
    }
    return result;
  };

  return Reporter;

});
