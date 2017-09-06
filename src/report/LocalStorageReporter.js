/**
 *  File    : report/LocalStorageReporter.js
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

/* global define, document */

define([
  "jquery",
  "./Reporter",
  "../Utils"
], function ($, Reporter, Utils) {

  /**
   * This JClic {@link Reporter} writes persistent data to the browser local storage. It uses some of the
   * @link{https://github.com/projectestac/jclic/wiki/JClic-Reports-developers-guide|JClic Reports API}.
   * Connection parameters (`path`, `service`, `userId`, `key`, `context`...),
   * passed through the `options` element of {@link JClicPlayer} (acting as {@link PlayStation}).
   * @exports LocalStorageReporter
   * @class
   * @extends Reporter
   * @param {PlayStation} ps - The {@link PlayStation} used to retrieve settings and localized messages
   */
  var LocalStorageReporter = function (ps) {
    Reporter.call(this, ps);
    this.tasks = [];
  };

  LocalStorageReporter.prototype = {
    constructor: LocalStorageReporter,
    /**
     * Description of this reporting system
     * @override
     * @type {string} */
    descriptionKey: 'Reporting to local storage',
    /**
     * Additional info to display after the reporter's `description`
     * @override
     * @type {string} */
    descriptionDetail: '(not set)'

    // TODO: Implement reporter!

  };

  // LocalStorageReporter extends Reporter
  LocalStorageReporter.prototype = $.extend(Object.create(Reporter.prototype), LocalStorageReporter.prototype);

  // Register class in Reporter.CLASSES
  Reporter.CLASSES['LocalStorageReporter'] = LocalStorageReporter;

  return LocalStorageReporter;

});
