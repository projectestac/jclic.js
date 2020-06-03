/**
 *  File    : report/SCORM.js
 *  Created : 18/07/2016
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

/* global window */

import $ from 'jquery';
import { log } from '../Utils';

/**
 * This class detects if JClic.js is running in an SCORM environment and, if true,
 * exposes the methods needed to notify the results of activities.
 * Both SCORM 1.2 and 2004 are supported.
 */
export class SCORM {
  /**
   * SCORM constructor
   * @param {object} API - The global SCORM API object
   * @param {Reporter} reporter - The {@link module:Reporter.Reporter Reporter} associated to this SCORM object
   */
  constructor(API, reporter) {
    this.API = API;
    // Check if 'API' has a function named 'Initialized'
    if (typeof API.Initialize === 'function')
      this.is2004 = true;
    else {
      // SCORM 1.2
      this.prefix = 'LMS';
      this.core = 'cmi.core.';
    }
    this.reporter = reporter;
  }

  /**
   * Recursive function used to find the SCORM "API" object
   * @param {object} win - The 'window' object to scan for global SCORM API objects
   * @param {number} tries - Recursive attempts currently achieved
   * @returns {object} - The global SCORM API object, or `null` if not found
   */
  static scanForAPI(win, tries) {
    if (win.API_1484_11 && win.API_1184_11.Initialize && win.API_1184_11.SetValue && win.API_1184_11.Commit)
      return win.API_1184_11;
    else if (win.API && win.API.LMSInitialize && win.API.LMSSetValue && win.API.LMSCommit)
      return win.API;
    else if (win.parent && win.parent !== win && tries++ < SCORM.DISCOVER_MAX_TRIES)
      return SCORM.scanForAPI(win.parent, tries);
    else
      return null;
  }

  /**
   * Checks for the presence of a SCORM API on the current browser session.
   * @returns {SCORM} - A valid SCORM object, or `null` if no SCORM API was found.
   * @param {Reporter} reporter - The {@link module:Reporter.Reporter Reporter} linked to the requested SCORM object
   */
  static getSCORM(reporter) {
    let result = null;
    try {
      let api = SCORM.scanForAPI(window, 0);
      if (api === null && window.opener)
        api = SCORM.scanForAPI(window.opener, 0);

      if (api) {
        result = new SCORM(api, reporter);
        if (!result.initialize())
          result = null;
      }
    } catch (ex) {
      result = null;
      log('warn', 'Unable to use SCORM: %s', ex.toString());
    }
    return result;
  }

  /**
   * Initializes communication with the SCORM API
   * @returns {Boolean}
   */
  initialize() {
    let result = false;
    try {
      result = this.API[this.prefix + 'Initialize']('');
      if (result) {
        this.studentId = this.getValue(this.core + (this.is2004 ? 'learner_id' : 'student_id'));
        this.studentName = this.getValue(this.core + (this.is2004 ? 'learner_name' : 'student_name'));
        this.setValue(this.core + 'score.min', 0);
        this.setValue(this.core + 'score.max', 100);
        $(window).on('unload', () => {
          this.commitInfo();
          this.terminate();
          this.API = null;
        });
      }
      log('debug', 'SCORM initialized');
    } catch (ex) {
      log('error', `Error initializing SCORM API: ${ex.message}`);
    }
    return result;
  }

  /**
   * Terminates communication with the SCORM API
   * @returns {Boolean}
   */
  terminate() {
    let result = false;
    try {
      result = this.API[this.is2004 ? 'Terminate' : 'LMSFinish']('');
    } catch (ex) {
      log('error', `Error terminating SCORM API: ${ex.message}`);
    }
    return result;
  }

  /**
   * Commits the current information to the SCORM API
   */
  commitInfo() {
    const
      info = this.reporter.getInfo(),
      score = Math.round(info.globalScore * 100),
      time = this.getTimeExpression(info.tTime);

    this.setValue(this.core + 'score.raw', score);
    this.setValue(this.core + 'session_time', time);
    this.commit();
    log('debug', `SCORM results reported: ${score} (${time})`);
  }

  /**
   * Commits current pending data to the SCORM API
   * @returns {Boolean}
   */
  commit() {
    let result = false;
    try {
      result = this.API[this.prefix + 'Commit']('');
    } catch (ex) {
      log('error', 'Error commiting data to the SCORM API: ${ex.message}');
    }
    return result;
  }

  /**
   * Sends a specific value to the SCORM API
   * @param {tring} key - A SCORM valid key
   * @param {string|number} value - The value associated with this key
   * @returns {string}
   */
  setValue(key, value) {
    let result = false;
    try {
      result = this.API[this.prefix + 'SetValue'](key, value);
    } catch (ex) {
      log('error', `Error setting value "${value}" to "${key}" in SCORM API: ${ex.message}`);
    }
    return result;
  }

  /**
   * Gets a specific value from the SCORM API
   * @param {tring} key - A SCORM valid key
   * @returns {string} - The value associated with the provided key, or `null` if not found
   */
  getValue(key) {
    let result = false;
    try {
      result = this.API[this.prefix + 'GetValue'](key);
    } catch (ex) {
      log('error', `Error retrieving "${key}" from SCORM API: ${ex.message}`);
    }
    return result;
  }

  /**
   * Gets a string expression of the given time (in milliseconds) suitable for a SCORM transaction.
   * @see {@link http://www.ostyn.com/standards/scorm/samples/ISOTimeForSCORM.htm}
   * @param {type} millis - The amount of time, in milliseconds
   * @returns {String} - An ISO8601 valid expression
   */
  getTimeExpression(millis) {
    const
      d = new Date(millis),
      h = d.getUTCHours(),
      m = d.getUTCMinutes(),
      s = d.getUTCSeconds();

    return this.is2004 ?
      `PT${h}H${m}M${s}S` :
      `${('0000' + h).slice(-4)}:${('00' + m).slice(-2)}:${('00' + s).slice(-2)}`;
  }

  /**
   * Gets the SCORM type of this SCORM object
   * @returns {string}
   */
  getScormType() {
    return `SCORM ${this.is2004 ? '2004' : '1.2'}`;
  }
}

Object.assign(SCORM.prototype, {
  /**
   * True when the API is of type SCORM 2004, false for SCORM 1.2
   * @name SCORM#is2004
   * @type {boolean} */
  is2004: false,
  /**
   * The Reporter associated to this SCORM object
   * @name SCORM#reporter
   * @type {Reporter} */
  reporter: null,
  /**
   * Prefix to be used in SCORM function names. Should be 'LMS' for SCORM 1.2
   * @name SCORM#prefix
   * @type {string} */
  prefix: '',
  /**
   * Prefix used in core SCORM keys. Should be 'cmi.core.' for 1.2 and 'cmi.' for 2004
   * @name SCORM#core
   * @type {string} */
  core: 'cmi.',
  /**
   * SCORM API object used to communicate with the LMS
   * @name SCORM#API
   * @type {object} */
  API: null,
  /**
   * The student ID retrieved from the SCORM API
   * @name SCORM#studentId
   * @type {string} */
  studentId: '',
  /**
   * The student name retrieved from the SCORM API
   * @name SCORM#studentName
   * @type {string} */
  studentName: '',
});

/**
 * Maximum recursive attempts allowed to find the global SCORM API object
 * @type {number} */
SCORM.DISCOVER_MAX_TRIES = 50;

export default SCORM;
