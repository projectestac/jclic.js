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

/* global window */

import Reporter from './Reporter';

/**
 * This JClic {@link Reporter} writes persistent data to the browser local session storage. It uses some of
 * the {@link https://github.com/projectestac/jclic/wiki/JClic-Reports-developers-guide JClic Reports API}.
 * Connection parameters (`key`, `context`...) are passed through the `options` element of {@link JClicPlayer} (acting as {@link PlayStation}).
 * Set `storage=local` in `options` to store reports in [`window.localStorage`]{@link https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage}
 * instead of [`window.sessionStorage`]{@link https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage} (default).
 * @exports SessionStorageReporter
 * @class
 * @extends Reporter
 */
export class SessionStorageReporter extends Reporter {
  /**
   * SessionStorageReporter constructor
   * @param {PlayStation} ps - The {@link PlayStation} used to retrieve settings and localized messages
   */
  constructor(ps) {
    super(ps);
    this.key = `jclic_${(new Date()).toISOString()}#${Math.ceil(Math.random() * 1000)}`;
  }

  /**
   * Initializes this report system with an optional set of parameters.
   * Returns a Promise, fulfilled when the reporter is fully initialized.
   * @override
   * @param {?Object} options - Initial settings passed to the reporting system
   * @returns {Promise}
   */
  init(options) {
    if (typeof options === 'undefined' || options === null)
      options = this.ps.options;
    if (options.storage === 'local') {
      this.storage = window.localStorage;
      this.descriptionKey = 'Reporting to local storage';
    }
    return Reporter.prototype.init.call(this, options);
  }

  /**
   * 
   * Saves the current report data to sessionStorage
   */
  saveCurrentReport() {
    // Update results out of current thread
    window.setTimeout(() => {
      this.storage.setItem(this.key, JSON.stringify(this.getData()));
    }, 0);
  }

  /**
   * Finalizes the current sequence
   * @override
   */
  endSequence() {
    super.endSequence();
    this.saveCurrentReport();
  }

  /**
   * This method should be called when the current activity finishes. Data about user's final results
   * on the activity will then be saved.
   * @override
   * @param {number} score - The final score, usually in a 0-100 scale.
   * @param {number} numActions - The total number of actions done by the user to solve the activity
   * @param {boolean} solved - `true` if the activity was finally solved, `false` otherwise.
   */
  endActivity(score, numActions, solved) {
    super.endActivity(score, numActions, solved);
    this.saveCurrentReport();
  }
}

Object.assign(SessionStorageReporter.prototype, {
  /**
   * Type of storage to be used. Defaults to `window.sessionStorage`
   * @name SessionStorageReporter#storage
   * @type {external:Storage} */
  storage: window.sessionStorage,
  /**
   * Description of this reporting system
   * @name SessionStorageReporter#descriptionKey
   * @override
   * @type {string} */
  descriptionKey: 'Reporting to session storage',
  /**
   * Additional info to display after the reporter's `description`
   * @name SessionStorageReporter#descriptionDetail
   * @override
   * @type {string} */
  descriptionDetail: '(browser session)',
  /**
   * Key used to save the report into sessionStorage
   * @name SessionStorageReporter#key 
   * @type {string} */
  key: null,
});

// Register class in Reporter.CLASSES
export default Reporter.registerClass('SessionStorageReporter', SessionStorageReporter);
