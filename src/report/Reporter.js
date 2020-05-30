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
 *  (c) 2000-2019 Educational Telematic Network of Catalonia (XTEC)
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

/* global Promise, window */

import $ from 'jquery';
import SessionReg from './SessionReg';
import Encryption from './EncryptMin';
import Scorm from './SCORM';
import Utils from '../Utils';

/**
 * This class implements the basic operations related with the processing of times and scores
 * done by users playing JClic activities. These operations include: identification of users,
 * compilation of data coming from the activities, storage of this data for later use, and
 * presentation of summarized results.
 * @exports Reporter
 * @class
 */
export class Reporter {
  /**
   * Reporter constructor
   * @param {PlayStation} ps - The {@link PlayStation} used to retrieve localized messages
   */
  constructor(ps) {
    this.ps = ps;
    this.sessions = [];
    this.started = new Date();
    this.initiated = false;
    this.info = new ReporterInfo(this);
  }

  /**
   * Registers a new type of reporter
   * @param {string} reporterName - The name used to identify this reporter
   * @param {function} reporterClass - The reporter class, usually extending Reporter
   * @returns {Reporter} - The provided reporter class
   */
  static registerClass(reporterName, reporterClass) {
    Reporter.CLASSES[reporterName] = reporterClass;
    return reporterClass;
  }

  /**
   * Creates a new Reporter of the requested class
   * The resulting object must be prepared to operate with a call to its `init` method.
   * @param {string} className - Class name of the requested reporter. When `null`, a basic Reporter is created.
   * @param {PlayStation} ps - The {@link PlayStation} used to retrieve localized messages
   * @returns {Reporter}
   */
  static getReporter(className, ps) {
    let result = null;
    if (className === null) {
      className = 'Reporter';
      if (ps.options.hasOwnProperty('reporter'))
        className = ps.options.reporter;
    }
    if (Reporter.CLASSES.hasOwnProperty(className))
      result = new Reporter.CLASSES[className](ps);
    else
      Utils.log('error', 'Unknown reporter class: %s', className);

    return result;
  }

  /**
   * Returns the `info` element associated to this Reporter.
   * @returns {ReporterInfo}
   */
  getInfo() {
    return this.info.recalc();
  }

  /**
   * Gets a specific property from this reporting system
   * @param {string} key - Requested property
   * @param {string}+ defaultValue - Default return value when requested property does not exist
   * @returns {string}
   */
  getProperty(key, defaultValue) {
    return defaultValue;
  }

  /**
   * Gets a specific boolean property from this reporting system
   * @param {string} key - Requested property
   * @param {boolean}+ defaultValue - Default return when requested property does not exist
   * @returns {boolean}
   */
  getBooleanProperty(key, defaultValue) {
    const s = this.getProperty(key, defaultValue === true ? 'true' : 'false');
    return key === null ? defaultValue : s === 'true' ? true : false;
  }

  /**
   * Gets the list of groups or organizations currently registered in the system. This
   * method should be implemented by classes derived of `Reporter`.
   * @returns {Promise} - When fulfilled, an array of group data is returned as a result
   */
  getGroups() {
    return Promise.reject('No groups defined!');
  }

  /**
   * Gets the list of users currently registered in the system, optionally filtered by
   * a specific group ID. This method should be implemented by classes derived of `Reporter`.
   * @param {string}+ groupId - Optional group ID to be used as a filter criteria
   * @returns {Promise} - When fulfilled, an object with a collection of user data records
   * is returned
   */
  getUsers(groupId) {
    return Promise.reject('No users defined in ' + groupId);
  }

  /**
   * Gets extended data associated with a specific user. This is a method intended to be
   * implemented in subclasses.
   * @param {string} _userId - The requested user ID
   * @returns {Promise} - When fulfilled, an object with user data is returned.
   */
  getUserData(_userId) {
    return Promise.reject('Unknown user!');
  }

  /**
   * Gets extended data associated with a specific group or organization. This
   * is a method intended to be implemented in subclasses.
   * @param {string} _groupId - The requested group ID
   * @returns {Promise} - When fulfilled, an object with group data is returned.
   */
  getGroupData(_groupId) {
    return Promise.reject('Unknown group!');
  }

  /**
   * Checks if this reporting system manages its own database of users and groups. Defaults to `false`
   * @returns {boolean}
   */
  userBased() {
    if (this.bUserBased === null)
      this.bUserBased = this.getBooleanProperty('USER_TABLES', false);
    return this.bUserBased;
  }

  /**
   * Allows the current user to create a new group, and asks his name
   * @returns {Promise} - When fulfilled, the chosen name for the new group is returned.
   */
  promptForNewGroup() {
    // TODO: Implement promptForNewGroup
    return Promise.reject('Remote creation of groups not yet implemented!');
  }

  /**
   * Allows the current user to create a new user ID, and asks his ID and password
   * @returns {Promise} - When fulfilled, an object with the new user ID and password
   * is returned.
   */
  promptForNewUser() {
    // TODO: Implement promptForNewUser
    return Promise.reject('Remote creation of users not yet implemented!');
  }

  /**
   * Allows the current user to select its group or organization from the current groups list
   * @returns {Promise}
   */
  promptGroupId() {
    return new Promise((resolve, reject) => {
      if (!this.userBased())
        reject('This system does not manage users!');
      else {
        this.getGroups().then((groupList) => {
          // Creation of new groups not yet implemented!
          if (!groupList || groupList.length < 1)
            reject('No groups defined!');
          else {
            let sel = 0;
            const $groupSelect = $('<select/>').attr({ size: Math.max(3, Math.min(15, groupList.length)) });
            groupList.forEach(g => $groupSelect.append($('<option/>').attr({ value: g.id }).text(g.name)));
            $groupSelect.change(ev => { sel = ev.target.selectedIndex; });
            this.ps.skin.showDlg(true, {
              main: [
                $('<h2/>', { class: 'subtitle' }).html(this.ps.getMsg('Select group:')),
                $groupSelect],
              bottom: [
                this.ps.skin.$okDlgBtn,
                this.ps.skin.$cancelDlgBtn]
            }).then(() => {
              resolve(groupList[sel].id);
            }).catch(reject);
          }
        }).catch(reject);
      }
    });
  }

  /**
   * Asks for a valid user ID fulfilling the promise if found, rejecting it otherwise
   * @param {boolean}+ forcePrompt - Prompt also if `userId` is already defined (default is `false`)
   * @returns {Promise}
   */
  promptUserId(forcePrompt) {
    return new Promise((resolve, reject) => {
      if (this.userId !== null && !forcePrompt)
        resolve(this.userId);
      else if (!this.userBased())
        reject('This system does not manage users!');
      else {
        const $pwdInput = $('<input/>', { type: 'password', size: 8, maxlength: 64 });
        if (this.getBooleanProperty('SHOW_USER_LIST', true)) {
          this.promptGroupId().then(groupId => {
            this.getUsers(groupId).then(userList => {
              // Creation of new users not yet implemented
              // let userCreationAllowed = this.getBooleanProperty('ALLOW_CREATE_USERS', false)
              if (!userList || userList.length < 1)
                reject('Group ' + groupId + ' has no users!');
              else {
                let sel = -1;
                const $userSelect = $('<select/>').attr({ size: Math.max(3, Math.min(15, userList.length)) });
                userList.forEach(u => $userSelect.append($('<option/>').attr({ value: u.id }).text(u.name)));
                $userSelect.change(ev => { sel = ev.target.selectedIndex; });
                this.ps.skin.showDlg(true, {
                  main: [
                    $('<h2/>', { class: 'subtitle' }).html(this.ps.getMsg('Select user:')),
                    $userSelect,
                    $('<h2/>', { class: 'subtitle' }).html(this.ps.getMsg('Password:')).append($pwdInput)],
                  bottom: [
                    this.ps.skin.$okDlgBtn,
                    this.ps.skin.$cancelDlgBtn]
                }).then(() => {
                  if (sel >= 0) {
                    if (userList[sel].pwd && Encryption.Decrypt(userList[sel].pwd) !== $pwdInput.val()) {
                      window.alert(this.ps.getMsg('Incorrect password'));
                      reject('Incorrect password');
                    } else {
                      this.userId = userList[sel].id;
                      resolve(this.userId);
                    }
                  } else
                    reject('No user has been selected');
                }).catch(reject);
              }
            }).catch(reject);
          }).catch(reject);
        } else {
          const $userInput = $('<input/>', { type: 'text', size: 8, maxlength: 64 });
          this.ps.skin.showDlg(true, {
            main: [
              $('<div/>').css({ 'text-align': 'right' })
                .append($('<h2/>', { class: 'subtitle' }).html(this.ps.getMsg('User:'))
                  .append($userInput))
                .append($('<h2/>', { class: 'subtitle' }).html(this.ps.getMsg('Password:'))
                  .append($pwdInput))],
            bottom: [
              this.ps.skin.$okDlgBtn,
              this.ps.skin.$cancelDlgBtn]
          }).then(() => {
            this.getUserData($userInput.val()).then(user => {
              if (user.pwd && Encryption.Decrypt(user.pwd) !== $pwdInput.val()) {
                window.alert(this.ps.getMsg('Incorrect password'));
                reject('Incorrect password');
              } else {
                this.userId = user.id;
                resolve(this.userId);
              }
            }).catch(reject);
          }).catch(reject);
        }
      }
    });
  }

  /**
   * Builds a complex object containing all the results reported while playing activities
   * @returns {Object} - The current results
   */
  getData() {

    // Force the re-calculation of all scores
    this.info.recalc();

    const result = {
      started: this.started.toISOString(),
      descriptionKey: this.descriptionKey,
      descriptionDetail: this.descriptionDetail,
      projects: this.info.numSessions,
      sequences: this.info.numSequences,
      activitiesDone: this.info.nActivities,
      playedOnce: this.info.nActPlayed,
      reportable: this.info.reportableActs,
      ratioPlayed: Math.round(this.info.ratioPlayed * 100),
      activitiesSolved: this.info.nActSolved,
      ratioSolved: Math.round(this.info.ratioSolved * 100),
      actScore: this.info.nActScore,
      partialScore: Math.round(this.info.partialScore * 100),
      globalScore: Math.round(this.info.globalScore * 100),
      time: Math.round(this.info.tTime / 10) / 100,
      actions: this.info.nActions,
      sessions: []
    };

    if (this.userId)
      result.userId = this.userId;
    else if (this.SCORM)
      result.user = this.SCORM.studentName + (this.SCORM.studentId === '' ? '' : ` (${this.SCORM.studentId})`);

    this.sessions.forEach(sr => {
      if (sr.getInfo().numSequences > 0)
        result.sessions.push(sr.getData(false, false));
    });

    return result;
  }

  /**
   * Initializes this report system with an optional set of parameters.
   * Returns a Promise, fulfilled when the reporter is fully initialized.
   * @param {?Object} options - Initial settings passed to the reporting system
   * @returns {Promise}
   */
  init(options) {
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
    return Promise.resolve(true);
  }

  /**
   * Closes this reporting system
   * @returns {Promise} - A Promise object to be fullfilled when all pending tasks are finished.
   */
  end() {
    Utils.log('debug', 'Basic Reporter ending');
    this.endSession();
    return Promise.resolve(true);
  }

  /**
   * Finalizes the current sequence
   */
  endSequence() {
    if (this.currentSession) {
      this.currentSession.endSequence();
      this.info.valid = false;
    }
  }

  /**
   * Finalizes the current session
   */
  endSession() {
    this.endSequence();
    this.currentSession = null;
  }

  /**
   * Creates a new group (method to be implemented in subclasses)
   * @param {GroupData} _gd
   */
  newGroup(_gd) {
    throw "No database!";
  }

  /**
   * Creates a new user (method to be implemented in subclasses)
   * @param {UserData} _ud
   */
  newUser(_ud) {
    throw "No database!";
  }

  /**
   * This method should be invoked when a new session starts.
   * @param {JClicProject} jcp - The {@link JClicProject} this session refers to.
   */
  newSession(jcp) {
    this.endSession();
    this.currentSession = new SessionReg(jcp);
    this.sessions.push(this.currentSession);
    this.info.valid = false;
  }

  /**
   * This method should be invoked when a new sequence starts
   * @param {ActivitySequenceElement} ase - The {@link ActivitySequenceElement} referenced by this sequence.
   */
  newSequence(ase) {
    if (this.currentSession) {
      this.currentSession.newSequence(ase);
      this.info.valid = false;
      if (this.SCORM)
        this.SCORM.commitInfo();
    }
  }

  /**
   * This method should be invoked when the user starts a new activity
   * @param {Activity} act - The {@link Activity} reporter has just started
   */
  newActivity(act) {
    if (this.currentSession) {
      this.currentSession.newActivity(act);
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
    if (this.currentSession) {
      this.currentSession.endActivity(score, numActions, solved);
      this.info.valid = false;
    }
  }

  /**
   * Reports a new action done by the user while playing the current activity
   * @param {string} type - Type of action (`click`, `write`, `move`, `select`...)
   * @param {string}+ source - Description of the object on which the action is done.
   * @param {string}+ dest - Description of the object reporter acts as a target of the action (usually in pairings)
   * @param {boolean} ok - `true` if the action was OK, `false`, `null` or `undefined` otherwhise
   */
  newAction(type, source, dest, ok) {
    if (this.currentSession) {
      this.currentSession.newAction(type, source, dest, ok);
      this.info.valid = false;
    }
  }

  /**
   * Gets information about the current sequence
   * @returns {SequenceReg.Info}
   */
  getCurrentSequenceInfo() {
    return this.currentSession === null ? null : this.currentSession.getCurrentSequenceInfo();
  }

  /**
   * Gets the name of the current sequence
   * @returns {string}
   */
  getCurrentSequenceTag() {
    return this.currentSession === null ? null : this.currentSession.getCurrentSequenceTag();
  }
}

Object.assign(Reporter.prototype, {
  /**
   * The {@link ReporterInfo} used to calculate and store global results.
   * @name Reporter#info
   * @type {ReporterInfo} */
  info: null,
  /**
   * The {@link PlayStation} used to retrieve messages
   * @name Reporter#ps
   * @type {PlayStation} */
  ps: null,
  /**
   * A valid SCORM bridge, or `null` if no SCORM API detected.
   * @name Reporter#SCORM */
  SCORM: null,
  /**
   * User ID currently associated with this reporting system
   * @name Reporter#userId
   * @type {string} */
  userId: null,
  /**
   * Optional key to be added as a field in session records
   * @name Reporter#sessionKey
   * @type {string} */
  sessionKey: null,
  /**
   * A second optional key to be reported as a field in session records
   * @name Reporter#sessionContext
   * @type {string} */
  sessionContext: null,
  /**
   * Optional filter key to be used in the group selection dialog
   * @name Reporter#groupCodeFilter
   * @type {string} */
  groupCodeFilter: null,
  /**
   * Another optional filter key to be used in the user selection dialog
   * @name Reporter#userCodeFilter
   * @type {string} */
  userCodeFilter: null,
  /**
   * Description of this reporting system
   * @name Reporter#descriptionKey
   * @type {string} */
  descriptionKey: 'Results are not currently being saved',
  /**
   * Additional info to display after the reporter's `description`
   * @name Reporter#descriptionDetail
   * @type {string} */
  descriptionDetail: '',
  /**
   * Starting date and time of this report
   * @name Reporter#started
   * @type {Date} */
  started: null,
  /**
   * Array of sessions included in this report
   * @name Reporter#sessions
   * @type {SessionReg[]} */
  sessions: [],
  /**
   * Currently active session
   * @name Reporter#currentSession
   * @type {SessionReg} */
  currentSession: null,
  /**
   * `true` if the system was successfully initiated, `false` otherwise
   * @name Reporter#initiated
   * @type {boolean} */
  initiated: false,
  /**
   * `true` if the system is connected to a database with user's data.
   * When `false`, a generic ID will be used.
   * @name Reporter#bUserBased
   * @type {boolean} */
  bUserBased: null,
  /**
   * Maximum number of incorrect UserID attempts
   * @name Reporter#MAX_USERID_PROMPT_ATTEMPTS
   * @type {number} */
  MAX_USERID_PROMPT_ATTEMPTS: 3,
});

/**
 * This object stores the global results of a {@link Reporter}
 * @class
 */
export class ReporterInfo {
  /**
   * ReporterInfo constructor
   * @param {Reporter} rep - The {@link Reporter} associated tho this `Info` object.
   */
  constructor(rep) {
    this.rep = rep;
  }

  /**
   * Clears all data associated with this ReporterInfo
   */
  clear() {
    this.numSessions = this.numSequences = this.nActivities = this.reportableActs = this.nActSolved =
      this.nActPlayed = this.nActScore = this.nActions = this.ratioSolved = this.ratioPlayed =
      this.tScore = this.tTime = this.partialScore = this.globalScore = 0;
    this.valid = false;
  }

  /**
   * Computes the value of all global variables based on the data stored in `sessions`
   * @returns {ReporterInfo} - This "info" object
   */
  recalc() {
    if (!this.valid) {
      this.clear();
      this.rep.sessions.forEach(ses => {
        const inf = ses.getInfo();
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
      });
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
}

Object.assign(ReporterInfo.prototype, {
  /**
   * The Reporter linked to this Info object
   * @name ReporterInfo#rep
   * @type {Reporter}
   */
  rep: null,
  /**
   * When `false`, data must be recalculated
   * @name ReporterInfo#valid
   * @type {boolean} */
  valid: false,
  /**
   * Number of sessions registered
   * @name ReporterInfo#numSessions
   * @type {number} */
  numSessions: 0,
  /**
   * Number of sequences played
   * @name ReporterInfo#numSequences
   * @type {number} */
  numSequences: 0,
  /**
   * Number of activities played
   * @name ReporterInfo#nActivities
   * @type {number} */
  nActivities: 0,
  /**
   * Number of activities in existing in the played projects suitable to be reported
   * @name ReporterInfo#reportableActs
   * @type {number} */
  reportableActs: 0,
  /**
   * Number of activities solved
   * @name ReporterInfo#nActSolved
   * @type {number} */
  nActSolved: 0,
  /**
   * Number of different activities played
   * @name ReporterInfo#nActPlayed
   * @type {number} */
  nActPlayed: 0,
  /**
   * Global score obtained in all sessions registered by this reporter
   * @name ReporterInfo#nActScore
   * @type {number} */
  nActScore: 0,
  /**
   * Number of actions done by the user while in this working session
   * @name ReporterInfo#nActions
   * @type {number} */
  nActions: 0,
  /**
   * Percentage of solved activities
   * @name ReporterInfo#ratioSolved
   * @type {number} */
  ratioSolved: 0,
  /**
   * Percentage of reportable activities played
   * @name ReporterInfo#ratioPlayed
   * @type {number} */
  ratioPlayed: 0,
  /**
   * Sum of the scores of all the activities played
   * @name ReporterInfo#tScore
   * @type {number} */
  tScore: 0,
  /**
   * Global score obtained
   * @name ReporterInfo#partialScore
   * @type {number} */
  partialScore: 0,
  /**
   * Sum of the playing time reported by each activity (not always equals to the sum of all session's time)
   * @name ReporterInfo#tTime
   * @type {number} */
  tTime: 0,
  /**
   * Final score based on the percent of reportable activities played. If the user plays all the
   * activities, this result equals to `partialScore`.
   * @name ReporterInfo#globalScore
   * @type {number} */
  globalScore: 0,
});

Reporter.Info = ReporterInfo;

/**
 * Static list of classes derived from Reporter. It should be filled by Reporter classes at declaration time.
 * @type {Object}
 */
Reporter.CLASSES = { 'Reporter': Reporter };

export default Reporter;
