//  File    : SCORM.js  
//  Created : 18/07/2016  
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

/* global window, console */

define([
  "jquery"
], function ($) {

  /**
   * This class detects if JClic.js is running in an SCORM environment and, if true,
   * exposes the methods needed to notify the results of activities.
   * Both SCORM 1.2 and 2004 are supported.
   * @exports SCORM
   * @param {object} API - The SCORM API object
   * @param {Reporter} reporter - The {@link Reporter} associated to this SCORM object
   * @class
   */
  var SCORM = function (API, reporter) {
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
  };

  SCORM.prototype = {
    constructor: SCORM,
    /**
     * True when the API is of type SCORM 2004, false for SCORM 1.2
     * @type {boolean} */
    is2004: false,
    /**
     * The Reporter associated to this SCORM object
     * @type {Reporter} */
    reporter: null,
    /**
     * Prefix to be used in SCORM function names. Should be 'LMS' for SCORM 1.2
     */
    prefix: '',
    /**
     * Prefix used in core SCORM keys. Should be 'cmi.core.' for 1.2 and 'cmi.' for 2004
     */
    core: 'cmi.',
    /**
     * SCORM API object used to communicate with the LMS
     * @type {object} */
    API: null,
    /**
     * The student ID retrieved from the SCORM API
     * @type {string} */
    studentId: '',
    /**
     * The student name retrieved from the SCORM API
     * @type {string} */
    studentName: '',
    /**
     * 
     * Initializes communication with the SCORM API
     * @returns {Boolean}
     */
    initialize: function () {
      var result = false;
      try {
        result = this.API[this.prefix + 'Initialize']('');
        if (result) {
          this.studentId = this.getValue(this.core + this.is2004 ? 'learner_id' : 'student_id');
          this.studentName = this.getValue(this.core + this.is2004 ? 'learner_name' : 'student_name');
          this.setValue(this.core + 'score.min', 0);
          this.setValue(this.core + 'score.max', 100);
          var thisScorm = this;
          $(window).on('unload', function () {
            thisScorm.commitInfo();
            thisScorm.terminate();
            thisScorm.API = null;
          });
        }

        console.log('SCORM initialized');

      } catch (ex) {
        console.log('Error initializing SCORM API: ' + ex);
      }
      return result;
    },
    /**
     * 
     * Terminates communication with the SCORM API
     * @returns {Boolean}
     */
    terminate: function () {
      var result = false;
      try {
        result = this.API[this.is2004 ? 'Terminate' : 'LMSFinish']('');
      } catch (ex) {
        console.log('Error terminating SCORM API: ' + ex);
      }
      return result;
    },
    commitInfo: function () {
      var info = this.reporter.getInfo(),
          score = Math.round(info.globalScore * 100),
          time = this.getTimeExpression(info.tTime);

      this.setValue(this.core + 'score.raw', score);
      this.setValue(this.core + 'session_time', time);
      this.commit();

      console.log('SCORM reported: ' + score + ' - ' + time);
    },
    /**
     * 
     * Commits current pending data to the SCORM API
     * @returns {Boolean}
     */
    commit: function () {
      var result = false;
      try {
        result = this.API[this.prefix + 'Commit']('');
      } catch (ex) {
        console.log('Error commiting data to the SCORM API: ' + ex);
      }
      return result;
    },
    /**
     * 
     * Sends a specific value to the SCORM API
     * @param {tring} key - A SCORM valid key
     * @param {string|number} value - The value associated with this key
     * @returns {string}
     */
    setValue: function (key, value) {
      var result = false;
      try {
        result = this.API[this.prefix + 'SetValue'](key, value);
      } catch (ex) {
        console.log('Error setting value "' + value + '" to "' + key + '" in SCORM API: ' + ex);
      }
      return result;
    },
    /**
     * 
     * Gets a specific value from the SCORM API
     * @param {tring} key - A SCORM valid key
     * @returns {string} - The value associated with the provided key, or `null` if not found
     */
    getValue: function (key) {
      var result = false;
      try {
        result = this.API[this.prefix + 'GetValue'](key);
      } catch (ex) {
        console.log('Error retrieving "' + key + '" from the SCORM API: ' + ex);
      }
      return result;
    },
    /**
     * Gets a string expression of the given time (in milliseconds) suitable for a SCORM transaction.
     * For details see: http://www.ostyn.com/standards/scorm/samples/ISOTimeForSCORM.htm
     * @param {type} millis - The amount of time, in milliseconds
     * @returns {String} - An ISO8601 valid expression
     */
    getTimeExpression: function (millis) {
      // See http://www.ostyn.com/standards/scorm/samples/ISOTimeForSCORM.htm

      var d = new Date(millis);
      var h = d.getUTCHours(),
          m = d.getUTCMinutes(),
          s = d.getUTCSeconds();

      return this.is2004 ?
          'PT' + h + 'H' + m + 'M' + s + 'S' :
          ('0000' + h).slice(-4) + ':' + ('00' + m).slice(-2) + ':' + ('00' + s).slice(-2);
    }
  };

  SCORM.DISCOVER_MAX_TRIES = 500;

  // Recursive method to find the SCORM API object
  SCORM.scanForAPI = function (win, tries) {
    if (win.API_1484_11 && win.API_1184_11.Initialize && win.API_1184_11.SetValue && win.API_1184_11.Commit)
      return win.API_1184_11;
    else if (win.API && win.API.LMSInitialize && win.API.LMSSetValue && win.API.LMSCommit)
      return win.API;
    else if (win.parent && win.parent !== win && tries++ < SCORM.DISCOVER_MAX_TRIES)
      return SCORM.scanForAPI(win.parent, tries);
    else
      return null;
  };

  /**
   * Checks for the presence of a SCORM API on the current browser session.
   * @returns {SCORM} - A valid SCORM object, or `null` if no SCORM API was found.
   * @param {Reporter} reporter - The {@link Reporter} linked to the requested SCROM object
   */
  SCORM.getSCORM = function (reporter) {
    var result = null;

    var api = SCORM.scanForAPI(window, 0);
    if (api === null && window.opener)
      api = SCORM.scanForAPI(window.opener, 0);

    if (api) {
      result = new SCORM(api, reporter);
      if (!result.initialize())
        result = null;
    }
    return result;
  };

  return SCORM;

});
