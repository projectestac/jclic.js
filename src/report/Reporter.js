/**
 *  File    : report/Reporter.js
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
  "./SessionReg",
  "./EncryptMin",
  "./SCORM",
  "../Utils"
], function ($, SessionReg, Encryption, Scorm, Utils) {

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
    this.info = new Reporter.Info(this);
  };

  Reporter.prototype = {
    constructor: Reporter,
    /**
     * The {@link Reporter.Info} used to calculate and store global results.
     * @type {Reporter.Info}
     */
    info: null,
    /**
     * The {@link PlayStation} used to retrieve messages
     * @type {PlayStation} */
    ps: null,
    /**
     * A valid SCORM bridge, or `null` if no SCORM API detected.
     */
    SCORM: null,
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
     * Returns the `info` element associated to this Reporter.
     * @returns {Reporter.Info}
     */
    getInfo: function () {
      return this.info.recalc();
    },
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
      return Utils.Promise.reject('No groups defined!');
    },
    /**
     *
     * Gets the list of users currently registered in the system, optionally filtered by
     * a specific group ID. This method should be implemented by classes derived of `Reporter`.
     * @param {string}+ groupId - Optional group ID to be used as a filter criteria
     * @returns {external:Promise} - When fulfilled, an object with a collection of user data records
     * is returned
     */
    getUsers: function (groupId) {
      return Utils.Promise.reject('No users defined in ' + groupId);
    },
    /**
     *
     * Gets extended data associated with a specific user. This is a method intended to be
     * implemented in subclasses.
     * @param {string} _userId - The requested user ID
     * @returns {external:Promise} - When fulfilled, an object with user data is returned.
     */
    getUserData: function (_userId) {
      return Utils.Promise.reject('Unknown user!');
    },
    /**
     *
     * Gets extended data associated with a specific group or organization. This
     * is a method intended to be implemented in subclasses.
     * @param {string} _groupId - The requested group ID
     * @returns {external:Promise} - When fulfilled, an object with group data is returned.
     */
    getGroupData: function (_groupId) {
      return Utils.Promise.reject('Unknown group!');
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
     * @returns {external:Promise} - When fulfilled, the chosen name for the new group is returned.
     */
    promptForNewGroup: function () {
      // TODO: Implement promptForNewGroup
      return Utils.Promise.reject('Remote creation of groups not yet implemented!');
    },
    /**
     *
     * Allows the current user to create a new user ID, and asks his ID and password
     * @returns {external:Promise} - When fulfilled, an object with the new user ID and password
     * is returned.
     */
    promptForNewUser: function () {
      // TODO: Implement promptForNewUser
      return Utils.Promise.reject('Remote creation of users not yet implemented!');
    },
    /**
     *
     * Allows the current user to select its group or organization from the current groups list
     * @returns {external:Promise}
     */
    promptGroupId: function () {
      var reporter = this;
      return new Utils.Promise(function (resolve, reject) {
        if (!reporter.userBased())
          reject('This system does not manage users!');
        else {
          reporter.getGroups().then(function (groupList) {
            // Creation of new groups not yet implemented!
            if (!groupList || groupList.length < 1)
              reject('No groups defined!');
            else {
              var sel = 0;
              var $groupSelect = $('<select/>').attr({ size: Math.max(3, Math.min(15, groupList.length)) });
              for (var p = 0; p < groupList.length; p++)
                $groupSelect.append($('<option/>').attr({ value: groupList[p].id }).text(groupList[p].name));
              $groupSelect.change(function () {
                sel = this.selectedIndex;
              });
              reporter.ps.skin.showDlg(true, {
                main: [
                  $('<h2/>', { class: 'subtitle' }).html(reporter.ps.getMsg('Select group:')),
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
      return new Utils.Promise(function (resolve, reject) {
        if (reporter.userId !== null && !forcePrompt)
          resolve(reporter.userId);
        else if (!reporter.userBased())
          reject('This system does not manage users!');
        else {
          var $pwdInput = $('<input/>', { type: 'password', size: 8, maxlength: 64 });
          if (reporter.getBooleanProperty('SHOW_USER_LIST', true)) {
            reporter.promptGroupId().then(function (groupId) {
              reporter.getUsers(groupId).then(function (userList) {
                // Creation of new users not yet implemented
                // var userCreationAllowed = reporter.getBooleanProperty('ALLOW_CREATE_USERS', false);
                if (!userList || userList.length < 1)
                  reject('Group ' + groupId + ' has no users!');
                else {
                  var sel = -1;
                  var $userSelect = $('<select/>').attr({ size: Math.max(3, Math.min(15, userList.length)) });
                  for (var p = 0; p < userList.length; p++)
                    $userSelect.append($('<option/>').attr({ value: userList[p].id }).text(userList[p].name));
                  $userSelect.change(function () {
                    sel = this.selectedIndex;
                  });
                  reporter.ps.skin.showDlg(true, {
                    main: [
                      $('<h2/>', { class: 'subtitle' }).html(reporter.ps.getMsg('Select user:')),
                      $userSelect,
                      $('<h2/>', { class: 'subtitle' }).html(reporter.ps.getMsg('Password:')).append($pwdInput)],
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
            var $userInput = $('<input/>', { type: 'text', size: 8, maxlength: 64 });
            reporter.ps.skin.showDlg(true, {
              main: [
                $('<div/>').css({ 'text-align': 'right' })
                  .append($('<h2/>', { class: 'subtitle' }).html(reporter.ps.getMsg('User:'))
                    .append($userInput))
                  .append($('<h2/>', { class: 'subtitle' }).html(reporter.ps.getMsg('Password:'))
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
      this.info.recalc();

      var $html = Utils.$HTML;
      var result = [];

      result.push($('<div/>', { class: 'subTitle', id: this.ps.getUniqueId('ReportsLb') }).html(this.ps.getMsg('Current results')));

      var $t = $('<table/>', { class: 'JCGlobalResults' });
      $t.append(
        $html.doubleCell(
          this.ps.getMsg('Session started:'),
          this.started.toLocaleDateString() + ' ' + this.started.toLocaleTimeString()),
        $html.doubleCell(
          this.ps.getMsg('Reports system:'),
          this.ps.getMsg(this.descriptionKey) + ' ' + this.descriptionDetail));
      if (this.userId)
        $t.append($html.doubleCell(
          this.ps.getMsg('User:'),
          this.userId));
      else if (this.SCORM)
        $t.append($html.doubleCell(
          this.ps.getMsg('User:'),
          this.SCORM.studentName + (this.SCORM.studentId === '' ? '' : ' (' + this.SCORM.studentId + ')')));

      if (this.info.numSequences > 0) {
        if (this.info.numSessions > 1)
          $t.append($html.doubleCell(
            this.ps.getMsg('Projects:'),
            this.info.numSessions));
        $t.append(
          $html.doubleCell(
            this.ps.getMsg('Sequences:'),
            this.info.numSequences),
          $html.doubleCell(
            this.ps.getMsg('Activities done:'),
            this.info.nActivities),
          $html.doubleCell(
            this.ps.getMsg('Activities played at least once:'),
            this.info.nActPlayed + '/' + this.info.reportableActs + " (" + Utils.getPercent(this.info.ratioPlayed) + ")"));
        if (this.info.nActivities > 0) {
          $t.append($html.doubleCell(
            this.ps.getMsg('Activities solved:'),
            this.info.nActSolved + " (" + Utils.getPercent(this.info.ratioSolved) + ")"));
          if (this.info.nActScore > 0)
            $t.append(
              $html.doubleCell(
                this.ps.getMsg('Partial score:'),
                Utils.getPercent(this.info.partialScore) + ' ' + this.ps.getMsg('(out of played activities)')),
              $html.doubleCell(
                this.ps.getMsg('Global score:'),
                Utils.getPercent(this.info.globalScore) + ' ' + this.ps.getMsg('(out of all project activities)')));
          $t.append(
            $html.doubleCell(
              this.ps.getMsg('Total time in activities:'),
              Utils.getHMStime(this.info.tTime)),
            $html.doubleCell(
              this.ps.getMsg('Actions done:'),
              this.info.nActions));
        }
        result.push($t);

        for (var n = 0; n < this.sessions.length; n++) {
          var sr = this.sessions[n];
          if (sr.getInfo().numSequences > 0)
            result = result.concat(sr.$print(this.ps, false, this.info.numSessions > 1));
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
      if (options.SCORM !== false) {
        this.SCORM = Scorm.getSCORM(this);
        if (this.SCORM !== null && this.descriptionKey === Reporter.prototype.descriptionKey)
          this.descriptionKey = this.SCORM.getScormType();
      }
      this.initiated = true;
      Utils.log('debug', 'Basic Reporter initialized');
      return Utils.Promise.resolve(true);
    },
    /**
     *
     * Closes this reporting system
     * @returns {external:Promise} - A promise to be fullfilled when all pending tasks are finished.
     */
    end: function () {
      Utils.log('debug', 'Basic Reporter ending');
      this.endSession();
      return Utils.Promise.resolve(true);
    },
    /**
     *
     * Finalizes the current sequence
     */
    endSequence: function () {
      if (this.currentSession) {
        this.currentSession.endSequence();
        this.info.valid = false;
      }
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
     * @param {GroupData} _gd
     */
    newGroup: function (_gd) {
      throw "No database!";
    },
    /**
     *
     * Creates a new user (method to be implemented in subclasses)
     * @param {UserData} _ud
     */
    newUser: function (_ud) {
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
      this.info.valid = false;
    },
    /**
     *
     * This method should be invoked when a new sequence starts
     * @param {ActivitySequenceElement} ase - The {@link ActivitySequenceElement} referenced by this sequence.
     */
    newSequence: function (ase) {
      if (this.currentSession) {
        this.currentSession.newSequence(ase);
        this.info.valid = false;
        if (this.SCORM)
          this.SCORM.commitInfo();
      }
    },
    /**
     *
     * This method should be invoked when the user starts a new activity
     * @param {Activity} act - The {@link Activity} reporter has just started
     */
    newActivity: function (act) {
      if (this.currentSession) {
        this.currentSession.newActivity(act);
        this.info.valid = false;
      }
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
      if (this.currentSession) {
        this.currentSession.endActivity(score, numActions, solved);
        this.info.valid = false;
      }
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
      if (this.currentSession) {
        this.currentSession.newAction(type, source, dest, ok);
        this.info.valid = false;
      }
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
   * This object stores the global results of a {@link Reporter}
   * @class
   * @param {Reporter} rep - The {@link Reporter} associated tho this `Info` object.
   */
  Reporter.Info = function (rep) {
    this.rep = rep;
  };

  Reporter.Info.prototype = {
    constructor: Reporter.Info,
    /**
     * The Reporter linked to this Info object
     * @type {Reporter}
     */
    rep: null,
    /**
     * When `false`, data must be recalculated
     * @type {boolean} */
    valid: false,
    /**
     * Number of sessions registered
     * @type {number} */
    numSessions: 0,
    /**
     * Number of sequences played
     * @type {number} */
    numSequences: 0,
    /**
     * Number of activities played
     * @type {number} */
    nActivities: 0,
    /**
     * Number of activities in existing in the played projects suitable to be reported
     * @type {number} */
    reportableActs: 0,
    /**
     * Number of activities solved
     * @type {number} */
    nActSolved: 0,
    /**
     * Number of different activities played
     * @type {number} */
    nActPlayed: 0,
    /**
     * Global score obtained in all sessions registered by this reporter
     * @type {number} */
    nActScore: 0,
    /**
     * Number of actions done by the user while in this working session
     * @type {number} */
    nActions: 0,
    /**
     * Percentage of solved activities
     * @type {number} */
    ratioSolved: 0,
    /**
     * Percentage of reportable activities played
     * @type {number} */
    ratioPlayed: 0,
    /**
     * Sum of the scores of all the activities played
     * @type {number} */
    tScore: 0,
    /**
     * Global score obtained
     * @type {number} */
    partialScore: 0,
    /**
     * Sum of the playing time reported by each activity (not always equals to the sum of all session's time)
     * @type {number} */
    tTime: 0,
    /**
     * Final score based on the percent of reportable activities played. If the user plays all the
     * activities, this result equals to `partialScore`.
     */
    globalScore: 0,
    /**
     * Clears all data associated with this Reporter.Info
     */
    clear: function () {
      this.numSessions = this.numSequences = this.nActivities = this.reportableActs = this.nActSolved =
        this.nActPlayed = this.nActScore = this.nActions = this.ratioSolved = this.ratioPlayed =
        this.tScore = this.tTime = this.partialScore = this.globalScore = 0;
      this.valid = false;
    },
    /**
     * Computes the value of all global variables based on the data stored in `sessions`
     * @returns {Reporter.Info} - This "info" object
     */
    recalc: function () {
      if (!this.valid) {
        this.clear();
        for (var p = 0; p < this.rep.sessions.length; p++) {
          var inf = this.rep.sessions[p].getInfo();
          this.reportableActs += inf.sReg.reportableActs;
          if (inf.numSequences > 0) {
            this.numSessions++;
            this.numSequences += inf.numSequences;
            if (inf.nActivities > 0) {
              this.nActivities += inf.nActivities;
              this.nActPlayed += inf.sReg.actNames.length;
              this.nActSolved += inf.nActSolved;
              this.nActions += inf.nActions;
              if (inf.nActScore > 0) {
                this.tScore += inf.tScore * inf.nActScore;
                this.nActScore += inf.nActScore;
              }
              this.tTime += inf.tTime;
            }
          }
        }
        if (this.nActivities > 0) {
          this.ratioSolved = this.nActSolved / this.nActivities;
          if (this.reportableActs > 0)
            this.ratioPlayed = this.nActPlayed / this.reportableActs;
          this.partialScore = this.tScore / (this.nActScore * 100);
          this.globalScore = this.partialScore * this.ratioPlayed;
        }
        this.valid = true;
      }
      return this;
    }
  };


  /**
   * Static list of classes derived from Reporter. It should be filled by Reporter classes at declaration time.
   * @type {Object}
   */
  Reporter.CLASSES = { 'Reporter': Reporter };

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
      Utils.log('error', 'Unknown reporter class: %s', className);
    }
    return result;
  };

  return Reporter;

});
