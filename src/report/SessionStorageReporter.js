/**
 *  File    : report/SessionStorageReporter.js
 *  Created : 06/09/2017
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

/* global define, window */

define([
  "jquery",
  "./Reporter"
], function ($, Reporter) {

  /**
   * This JClic {@link Reporter} writes persistent data to the browser local session storage. It uses some of the
   * @link{https://github.com/projectestac/jclic/wiki/JClic-Reports-developers-guide|JClic Reports API}.
   * Connection parameters (`key`, `context`...),
   * passed through the `options` element of {@link JClicPlayer} (acting as {@link PlayStation}).
   * @exports SessionStorageReporter
   * @class
   * @extends Reporter
   * @param {PlayStation} ps - The {@link PlayStation} used to retrieve settings and localized messages
   */
  var SessionStorageReporter = function (ps) {
    Reporter.call(this, ps);
    this.key = 'jclic_' + (new Date()).toISOString() + '#' + Math.ceil(Math.random() * 1000);
  };

  SessionStorageReporter.prototype = {
    constructor: SessionStorageReporter,
    /**
     * Type of storage to be used. Defaults to `window.sessionStorage`
     * @type {external:Storage} */
    storage: window.sessionStorage,
    /**
     * Description of this reporting system
     * @override
     * @type {string} */
    descriptionKey: 'Reporting to session storage',
    /**
     * Additional info to display after the reporter's `description`
     * @override
     * @type {string} */
    descriptionDetail: '(browser session)',
    /**
     * Key used to save the report into sessionStorage 
     * @type {string} */
    key: null,
    /**
     *
     * Initializes this report system with an optional set of parameters.
     * Returns a {@link external:Promise}, fulfilled when the reporter is fully initialized.
     * @override
     * @param {?Object} options - Initial settings passed to the reporting system
     * @returns {external:Promise}
     */
    init: function (options) {
      if (typeof options === 'undefined' || options === null)
        options = this.ps.options;
      if(options.storage === 'local'){
        this.storage = window.localStorage;
        this.descriptionKey = 'Reporting to local storage';
      }
      return Reporter.prototype.init.call(this, options);
    },
    /**
     * 
     * Saves the current report data to sessionStorage
     */
    saveCurrentReport: function () {
      // Update results out of current thread
      var thisReporter = this;
      window.setTimeout(function () {
        thisReporter.storage.setItem(thisReporter.key, JSON.stringify(thisReporter.getData()));
      }, 0);
    },
    /**
     *
     * Finalizes the current sequence
     * @override
     */
    endSequence: function () {
      Reporter.prototype.endSequence.call(this);
      this.saveCurrentReport();
    },
    /**
     *
     * This method should be called when the current activity finishes. Data about user's final results
     * on the activity will then be saved.
     * @override
     * @param {number} score - The final score, usually in a 0-100 scale.
     * @param {number} numActions - The total number of actions done by the user to solve the activity
     * @param {boolean} solved - `true` if the activity was finally solved, `false` otherwise.
     */
    endActivity: function (score, numActions, solved) {
      Reporter.prototype.endActivity.call(this, score, numActions, solved);
      this.saveCurrentReport();
    }
  };

  // SessionStorageReporter extends Reporter
  SessionStorageReporter.prototype = $.extend(Object.create(Reporter.prototype), SessionStorageReporter.prototype);

  // Register class in Reporter.CLASSES
  Reporter.CLASSES['SessionStorageReporter'] = SessionStorageReporter;

  return SessionStorageReporter;

});
