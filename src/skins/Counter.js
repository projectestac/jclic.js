/**
 *  File    : skins/Counter.js
 *  Created : 07/05/2015
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

define([], function () {

  /**
   *
   * This class encapsulates the operation of a numeric counter, used to display the current
   * values of score, actions and time.
   * @param {string} id - The type of information stored on this counter
   * @param {external:jQuery=} $div - The HTML element where this counter will show values (can be _null_)
   */
  var Counter = function (id, $div) {
    if (id)
      this.id = id;
    if ($div)
      this.$div = $div;
  };

  Counter.prototype = {
    constructor: Counter,
    /**
     * Type of counter (usually: `score`, `actions` or `time`)
     * @type {string} */
    id: '',
    /**
     * The HTML element where this counter shows its value
     * @type {external:jQuery}
     */
    $div: null,
    /**
     * Current value of this counter
     * @type {number} */
    value: 0,
    /**
     * When set, the counter displays a countdown from this value to zero
     * @type {number} */
    countDown: 0,
    /**
     * Flag indicating if this counter is currently enabled
     * @type {boolean} */
    enabled: true,
    /**
     * Maximum value to be displayed by this counter
     * @type {Number} */
    MAX_DISPLAY_VALUE: 999,
    /**
     * An optional Counter used as a subtractor to display the current value.
     * Useful to display `errors` subtracting `score` from `actions`.
     * @type {Counter}
     */
    displayDiffFrom: null,
    /**
     *
     * Gets the current display value of this counter
     * @returns {number}
     */
    getDisplayValue: function () {
      var result = this.countDown > 0 ? this.countDown - this.value : this.value;
      if (this.displayDiffFrom)
        result = result - this.displayDiffFrom.value;
      return Math.max(0, Math.min(this.MAX_DISPLAY_VALUE, result));
    },
    /**
     *
     * Paints the value of this counter on screen
     * (method to be overridden by subclasses)
     */
    refreshDisplay: function () {
      if (this.$div) {
        this.$div.html(this.enabled ? (this.getDisplayValue() + 1000).toString().substr(1) : '000');
        this.$div.css('opacity', this.enabled ? 1.0 : 0.3);
      }
    },
    /**
     *
     * Enables or disables this counter
     * @param {boolean} enabled - State been assigned to this counter
     */
    setEnabled: function (enabled) {
      if (this.enabled !== (this.enabled = enabled))
        this.refreshDisplay();
    },
    /**
     *
     * Sets the initial value of the counter
     * @param {number} maxValue - Value from which the countdown will start
     */
    setCountDown: function (maxValue) {
      if (this.countDown !== (this.countDown = maxValue))
        this.refreshDisplay();
    },
    /**
     *
     * Increments by one the value of this counter
     */
    incValue: function () {
      this.value++;
      if (this.enabled)
        this.refreshDisplay();
    },
    /**
     *
     * Sets a specific value to this counter
     * @param {number} value - The value to set
     */
    setValue: function (value) {
      if (this.enabled && this.value !== (this.value = value))
        this.refreshDisplay();
    }
  };

  return Counter;

});
