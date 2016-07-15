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
//  program is distributed in the hope reporter it will be useful, but WITHOUT ANY WARRANTY; without
//  even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
//  General Public License for more details. You should have received a copy of the GNU General
//  Public License along with this program. If not, see [http://www.gnu.org/licenses/].  

/* global Promise */

define([
  "jquery",
  "./SessionReg",
  "./EncryptMin",
  "../Utils"
], function ($, SessionReg, Encryption, Utils) {

  /**
   * This class implements the basic operations related with the processing of times and scores
   * done by users playing JClic activities. These operations include: identification of users,
   * compilation of data coming from the activities, storage of this data for later use, and
   * presentation of summarized results.
   * @exports Reporter
   * @class
   * @param {PlayStation} ps - The {@link PlayStation} used to retrieve localized messages
   */
  var Reporter = function (ps) {
    this.ps = ps;
    this.sessions = [];
    this.started = new Date();
    this.initiated = false;
  };

  Reporter.prototype = {
    constructor: Reporter,
    /**
     * The {@link PlayStation} used to retrieve messages
     * @type {PlayStation} */
    ps: null,
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
     * Additional info to display after the reporter's `description`
     * @type {string} */
    descriptionDetail: '',
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
     * Maximum number of incorrect UserID attempts
     * @type {number} */
    MAX_USERID_PROMPT_ATTEMPTS: 3,
    /**
     * 
     * Gets a specific property from this reporting system
     * @param {string} key - Requested property
     * @param {string}+ defaultValue - Default return value when requested property does not exist
     * @returns {string}
     */
    getProperty: function (key, defaultValue) {
      return defaultValue;
    },
    /**
     * 
     * Gets a specific boolean property from this reporting system
     * @param {string} key - Requested property
     * @param {boolean}+ defaultValue - Default return when requested property does not exist
     * @returns {boolean}
     */
    getBooleanProperty: function (key, defaultValue) {
      var s = this.getProperty(key, defaultValue === true ? 'true' : 'false');
      return key === null ? defaultValue : s === 'true' ? true : false;
    },
    /**
     * 
     * Gets the list of groups or organizations currently registered in the system. This 
     * method should be implemented by classes derived of `Reporter`.
     * @returns {external:Promise} - When fulfilled, an array of group data is returned as a result
     */
    getGroups: function () {
      return Promise.reject('No groups defined!');
    },
    /**
     * 
     * Gets the list of users currently registered in the system, optionally filtered by
     * a specific group ID. This method should be implemented by classes drived of `Reporter`.
     * @param {string}+ groupId - Optional group ID to be used as a filter criteria
     * @returns {external:Promise} - When fulfilled, an object with a collection of user data records
     * is returned
     */
    getUsers: function (groupId) {
      return Promise.reject('No users defined in ' + groupId);
    },
    /**
     * 
     * Gets extended data associated with a specific user. This is a method intended to be
     * implemented in subclasses.
     * @param {string} userId - The requested user ID
     * @returns {external:Promise} - When fulfilled, an object with user data is returned.
     */
    getUserData: function (userId) {
      return Promise.reject('Unknown user!');
    },
    /**
     * 
     * Gets extended data associated with a specific group or organization. This 
     * is a method intended to be implemented in subclasses.
     * @param {string} groupId - The requested group ID
     * @returns {external:Promise} - When fulfilled, an object with group data is returned.
     */
    getGroupData: function (groupId) {
      return Promise.reject('Unknown group!');
    },
    /**
     * 
     * Checks if this reporting system manages its own database of users and groups. Defaults to `false`
     * @returns {boolean}
     */
    userBased: function () {
      if (this.bUserBased === null)
        this.bUserBased = this.getBooleanProperty('USER_TABLES', false);
      return this.bUserBased;
    },
    /**
     * 
     * Allows the current user to create a new group, and asks his name
     * @returns {external:Promise} - When fulfilled, the name choosen for the new group is returned.
     */
    promptForNewGroup: function () {
      // TODO: Implement promptForNewGroup
      return Promise.reject('Remote creation of groups not yet implemented!');
    },
    /**
     * 
     * Allows the current user to create a new user ID, and asks his ID and password
     * @returns {external:Promise} - When fulfilled, an object with the new user ID and password
     * is returned.
     */
    promptForNewUser: function () {
      // TODO: Implement promptForNewUser
      return Promise.reject('Remote creation of users not yet implemented!');
    },
    /**
     * 
     * Allows the current user to select its group or organization from the current groups list
     * @returns {external:Promise}
     */
    promptGroupId: function () {
      var reporter = this;
      return new Promise(function (resolve, reject) {
        if (!reporter.userBased())
          reject('This system does not manage users!');
        else {
          reporter.getGroups().then(function (groupList) {
            // Creation of new groups not yet implemented!            
            if (!groupList || groupList.length < 1)
              reject('No groups defined!');
            else {
              var sel = 0;
              var $groupSelect = $('<select/>').attr({size: Math.max(3, Math.min(15, groupList.length))});
              for (var p = 0; p < groupList.length; p++)
                $groupSelect.append($('<option/>').attr({value: groupList[p].id}).text(groupList[p].name));
              $groupSelect.change(function () {
                sel = this.selectedIndex;
              });
              reporter.ps.skin.showDlg(true, {
                main: [
                  $('<h2/>', {class: 'subtitle'}).html(reporter.ps.getMsg('Select group:')),
                  $groupSelect],
                bottom: [
                  reporter.ps.skin.$okDlgBtn,
                  reporter.ps.skin.$cancelDlgBtn]
              }).then(function () {
                resolve(groupList[sel].id);
              }).catch(reject);
            }
          }).catch(reject);
        }
      });
    },
    /**
     * 
     * Asks for a valid user ID fulfilling the promise if found, rejecting it otherwise
     * @param {boolean}+ forcePrompt - Prompt also if `userId` is already defined (default is `false`)
     * @returns {external:Promise}
     */
    promptUserId: function (forcePrompt) {
      var reporter = this;
      return new Promise(function (resolve, reject) {
        if (reporter.userId !== null && !forcePrompt)
          resolve(reporter.userId);
        else if (!reporter.userBased())
          reject('This system does not manage users!');
        else {
          var $pwdInput = $('<input/>', {type: 'password', size: 8, maxlength: 64});
          if (reporter.getBooleanProperty('SHOW_USER_LIST', true)) {
            reporter.promptGroupId().then(function (groupId) {
              reporter.getUsers(groupId).then(function (userList) {
                // Creation of new users not yet implemented
                //var userCreationAllowed = reporter.getBooleanProperty('ALLOW_CREATE_USERS', false);
                if (!userList || userList.length < 1)
                  reject('Group ' + groupId + ' has no users!');
                else {
                  var sel = -1;
                  var $userSelect = $('<select/>').attr({size: Math.max(3, Math.min(15, userList.length))});
                  for (var p = 0; p < userList.length; p++)
                    $userSelect.append($('<option/>').attr({value: userList[p].id}).text(userList[p].name));
                  $userSelect.change(function () {
                    sel = this.selectedIndex;
                  });
                  reporter.ps.skin.showDlg(true, {
                    main: [
                      $('<h2/>', {class: 'subtitle'}).html(reporter.ps.getMsg('Select user:')),
                      $userSelect,
                      $('<h2/>', {class: 'subtitle'}).html(reporter.ps.getMsg('Password:')).append($pwdInput)],
                    bottom: [
                      reporter.ps.skin.$okDlgBtn,
                      reporter.ps.skin.$cancelDlgBtn]
                  }).then(function () {
                    if (sel >= 0) {
                      if (userList[sel].pwd && Encryption.Decrypt(userList[sel].pwd) !== $pwdInput.val()) {
                        window.alert(reporter.ps.getMsg('Incorrect password'));
                        reject('Incorrect password');
                      } else {
                        reporter.userId = userList[sel].id;
                        resolve(reporter.userId);
                      }
                    } else
                      reject('No user has been selected');
                  }).catch(reject);
                }
              }).catch(reject);
            }).catch(reject);
          } else {
            var $userInput = $('<input/>', {type: 'text', size: 8, maxlength: 64});
            reporter.ps.skin.showDlg(true, {
              main: [
                $('<div/>').css({'text-align': 'right'})
                    .append($('<h2/>', {class: 'subtitle'}).html(reporter.ps.getMsg('User:'))
                        .append($userInput))
                    .append($('<h2/>', {class: 'subtitle'}).html(reporter.ps.getMsg('Password:'))
                        .append($pwdInput))],
              bottom: [
                reporter.ps.skin.$okDlgBtn,
                reporter.ps.skin.$cancelDlgBtn]
            }).then(function () {
              reporter.getUserData($userInput.val()).then(function (user) {
                if (user.pwd && Encryption.Decrypt(user.pwd) !== $pwdInput.val()) {
                  window.alert(reporter.ps.getMsg('Incorrect password'));
                  reject('Incorrect password');
                } else {
                  reporter.userId = user.id;
                  resolve(reporter.userId);
                }
              }).catch(reject);
            }).catch(reject);
          }
        }
      });
    },
    /**
     * 
     * Renders the data contained in this report into a DOM tree
     * @returns {external:jQuery} - A jQuery object with a `div` element containing the full report.
     */
    $print: function () {
      var $html = Utils.$HTML;
      var result = [];

      result.push($('<div/>', {class: 'subTitle'}).html(this.ps.getMsg('Current results')));

      var $t = $('<table/>', {class: 'JCGlobalResults'});
      $t.append(
          $html.doubleCell(this.ps.getMsg('Session started:'), this.started.toLocaleDateString() + ' ' + this.started.toLocaleTimeString()),
          $html.doubleCell(this.ps.getMsg('Reports system:'), this.ps.getMsg(this.descriptionKey) + ' ' + this.descriptionDetail));
      if (this.userId)
        $t.append($html.doubleCell(this.ps.getMsg('User:'), this.userId));
      
      // TODO: Save results in a Reporter.Info object
      var numSessions = 0, numSequences = 0, nActivities = 0, reportableActs = 0, nActSolved = 0, nActPlayed = 0,
          nActScore = 0, nActions = 0, percentSolved = 0, percentPlayed = 0, tScore = 0, tTime = 0, completionScore = 0;

      for (var p = 0; p < this.sessions.length; p++) {
        var inf = this.sessions[p].getInfo(true);
        reportableActs += inf.sReg.reportableActs;
        if (inf.numSequences > 0) {
          numSessions++;
          numSequences += inf.numSequences;
          if (inf.nActivities > 0) {
            nActivities += inf.nActivities;
            nActPlayed += inf.sReg.actNames.length;
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
      
      // TODO: Calc completion

      if (numSequences > 0) {
        if (numSessions > 1)
          $t.append($html.doubleCell(this.ps.getMsg('Projects:'), numSessions));
        $t.append($html.doubleCell(this.ps.getMsg('Sequences:'), numSequences),
            $html.doubleCell(this.ps.getMsg('Activities done:'), nActivities));
        if (nActivities > 0) {
          percentSolved = nActSolved / nActivities;
          $t.append($html.doubleCell(this.ps.getMsg('Activities solved:'), nActSolved + " (" + Utils.getPercent(percentSolved) + ")"));
          if (nActScore > 0)
            $t.append($html.doubleCell(this.ps.getMsg('Global score:'), Utils.getPercent(tScore / (nActScore * 100))));
          $t.append($html.doubleCell(this.ps.getMsg('Total time in activities:'), Utils.getHMStime(tTime)),
              $html.doubleCell(this.ps.getMsg('Actions done:'), nActions));
        }

        result.push($t);

        for (var n = 0; n < this.sessions.length; n++) {
          var sr = this.sessions[n];
          if (sr.getInfo(false).numSequences > 0)
            result = result.concat(sr.$print(this.ps, false, numSessions > 1));
        }
      } else
        result.push($('<p/>').html(this.ps.getMsg('No activities done!')));

      return result;
    },
    /**
     * 
     * Initializes this report system with an optional set of parameters.
     * Returns a {@link external:Promise}, fulfilled when the reporter is fully initialized.
     * @param {?Object} options - Initial settings passed to the reporting system
     * @returns {external:Promise}
     */
    init: function (options) {
      if (!options)
        options = this.ps.options;
      this.userId = Utils.getVal(options.user);
      this.sessionKey = Utils.getVal(options.key);
      this.sessionContext = Utils.getVal(options.context);
      this.groupCodeFilter = Utils.getVal(options.groupCodeFilter);
      this.userCodeFilter = Utils.getVal(options.userCodeFilter);
      this.initiated = true;
      return Promise.resolve(true);
    },
    /**
     * 
     * Closes this reporting system
     */
    end: function () {
      this.endSession();
    },
    /**
     * 
     * Finalizes the current sequence
     */
    endSequence: function () {
      if (this.currentSession)
        this.currentSession.endSequence();
    },
    /**
     * 
     * Finalizes the current session
     */
    endSession: function () {
      this.endSequence();
      this.currentSession = null;
    },
    /**
     * 
     * Creates a new group (method to be implemented in subclasses)
     * @param {GroupData} gd
     */
    newGroup: function (gd) {
      throw "No database!";
    },
    /**
     * 
     * Creates a new user (method to be implemented in subclasses)
     * @param {UserData} ud
     */
    newUser: function (ud) {
      throw "No database!";
    },
    /**
     * 
     * This method should be invoked when a new session starts.
     * @param {JClicProject} jcp - The {@link JClicProject} this session refers to.
     */
    newSession: function (jcp) {
      this.endSession();
      this.currentSession = new SessionReg(jcp);
      this.sessions.push(this.currentSession);
    },
    /**
     * 
     * This method should be invoked when a new sequence starts
     * @param {ActivitySequenceElement} ase - The {@link ActivitySequenceElement} referenced by this sequence.
     */
    newSequence: function (ase) {
      if (this.currentSession)
        this.currentSession.newSequence(ase);
    },
    /**
     * 
     * This method should be invoked when the user starts a new activity
     * @param {Activity} act - The {@link Activity} reporter has just started
     */
    newActivity: function (act) {
      if (this.currentSession)
        this.currentSession.newActivity(act);
    },
    /**
     * 
     * This method should be called when the current activity finishes. Data about user's final results
     * on the activity will then be saved.
     * @param {number} score - The final score, usually in a 0-100 scale.
     * @param {number} numActions - The total number of actions done by the user to solve the activity
     * @param {boolean} solved - `true` if the activity was finally solved, `false` otherwise.
     */
    endActivity: function (score, numActions, solved) {
      if (this.currentSession)
        this.currentSession.endActivity(score, numActions, solved);
    },
    /**
     * 
     * Reports a new action done by the user while playing the current activity
     * @param {string} type - Type of action (`click`, `write`, `move`, `select`...)
     * @param {string}+ source - Description of the object on which the action is done.
     * @param {string}+ dest - Description of the object reporter acts as a target of the action (usually in pairings)
     * @param {boolean} ok - `true` if the action was OK, `false`, `null` or `undefined` otherwhise
     */
    newAction: function (type, source, dest, ok) {
      if (this.currentSession)
        this.currentSession.newAction(type, source, dest, ok);
    },
    /**
     * 
     * Gets information about the current sequence
     * @returns {SequenceReg.Info}
     */
    getCurrentSequenceInfo: function () {
      return this.currentSession === null ? null : this.currentSession.getCurrentSequenceInfo();
    },
    /**
     * 
     * Gets the name of the current sequence
     * @returns {string}
     */
    getCurrentSequenceTag: function () {
      return this.currentSession === null ? null : this.currentSession.getCurrentSequenceTag();
    }
  };

  /** 
   * Static list of classes derived from Reporter. It should be filled by Reporter classes at declaration time.
   * @type {Object}
   */
  Reporter.CLASSES = {'Reporter': Reporter};

  /**
   * 
   * Creates a new Reporter of the requested class
   * The resulting object must be prepared to operate with a call to its `init` method.
   * @param {string} className - Class name of the requested reporter. When `null`, a basic Reporter is created.
   * @param {PlayStation} ps - The {@link PlayStation} used to retrieve localized messages
   * @returns {Reporter}
   */
  Reporter.getReporter = function (className, ps) {
    var result = null;
    if (className === null) {
      className = 'Reporter';
      if (ps.options.hasOwnProperty('reporter'))
        className = ps.options.reporter;
    }
    if (Reporter.CLASSES.hasOwnProperty(className)) {
      result = new Reporter.CLASSES[className](ps);
    } else {
      console.log('Unknown reporter class: ' + className);
    }
    return result;
  };

  return Reporter;

});
