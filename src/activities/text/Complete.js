/**
 *  File    : activities/text/Complete.js
 *  Created : 20/06/2015
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
 *  (c) 2000-2016 Ministry of Education of Catalonia (http://xtec.cat)
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

define([
  "jquery",
  "../../Activity",
  "./TextActivityBase"
], function ($, Activity, TextActivityBase) {

  /**
   * This type of text activity suggests users to complete a given text, without any help on where to
   * write the missing words or phrases.
   * @exports Complete
   * @class
   * @extends TextActivityBase
   * @param {JClicProject} project - The project to which this activity belongs
   */
  //
  // TODO: Implement Complete text activities
  var Complete = function (project) {
    TextActivityBase.call(this, project);
  };

  Complete.prototype = {
    constructor: Complete
        //
  };

  // Complete extends TextActivityBase
  Complete.prototype = $.extend(Object.create(TextActivityBase.prototype), Complete.prototype);

  /**
   * The {@link TextActivityBase.Panel} where this kind of text activities are played.
   * @class
   * @extends TextActivityBase.Panel
   * @param {Activity} act - The {@link Activity} to which this Panel belongs
   * @param {JClicPlayer} ps - Any object implementing the methods defined in the
   * [PlayStation](http://projectestac.github.io/jclic/apidoc/edu/xtec/jclic/PlayStation.html)
   * Java interface.
   * @param {external:jQuery=} $div - The jQuery DOM element where this Panel will deploy
   */
  Complete.Panel = function (act, ps, $div) {
    TextActivityBase.Panel.call(this, act, ps, $div);
  };

  var ActPanelAncestor = TextActivityBase.Panel.prototype;
  Complete.Panel.prototype = {
    constructor: Complete.Panel,
    /**
     *
     * Creates a target DOM element for the provided target.
     * @param {TextActivityDocument.TextTarget} target - The target related to the DOM object to be created
     * @param {external:jQuery} $span -  - An initial DOM object (usually a `span`) that can be used
     * to store the target, or replaced by another type of object.
     * @returns {external:jQuery} - The jQuery DOM element loaded with the target data.
     */
    $createTargetElement: function (target, $span) {
      // Targets are always hidden in this type of activities
      return null;
    },
    /**
     *
     * Basic initialization procedure
     */
    initActivity: function () {
      ActPanelAncestor.initActivity.call(this);
      this.$div.find('.JClicTextDocument').attr('contenteditable', 'true').attr('spellcheck', 'false');
      this.playing = true;
    },
    /**
     *
     * Evaluates all the targets in this panel. This method is usually called from the `Check` button.
     * @returns {boolean} - `true` when all targets are OK, `false` otherwise.
     */
    evaluatePanel: function () {

      // TODO: Mark errors!

      var currentText = this.$div.find('.JClicTextDocument').text().trim();
      var originalText = this.act.document.getRawText();
      var ok = this.act.ev.checkText(currentText, originalText);

      this.ps.reportNewAction(this.act, 'WRITE', currentText, originalText, ok, this.targets.length);

      if (ok) {
        this.finishActivity(true);
        return true;
      } else {
        this.playEvent('finishedError');
      }
      return false;
    },
    /**
     *
     * Ordinary ending of the activity, usually called form `processEvent`
     * @param {boolean} result - `true` if the activity was successfully completed, `false` otherwise
     */
    finishActivity: function (result) {
      this.$div.find('.JClicTextDocument').attr('contenteditable', 'false');
      return ActPanelAncestor.finishActivity.call(this, result);
    }

    // TODO: Check for activity completion without check button!
  };

  // Complete.Panel extends TextActivityBase.Panel
  Complete.Panel.prototype = $.extend(Object.create(ActPanelAncestor), Complete.Panel.prototype);

  // Register class in Activity.prototype
  Activity.CLASSES['@text.Complete'] = Complete;

  return Complete;

});
