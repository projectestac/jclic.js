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

import Activity from '../../Activity';
import TextActivityBase from './TextActivityBase';

/**
 * This type of text activity suggests users to complete a given text, without any help on where to
 * write the missing words or phrases.
 * @extends module:TextActivityBase
 */
export class Complete extends TextActivityBase {
  /**
   * Complete constructor
   * @param {JClicProject} project - The project to which this activity belongs
   */
  constructor(project) {
    super(project);
  }
}

/**
 * The {@link TextActivityBasePanel} where {@link Complete} activities are played.
 * @extends module:TextActivityBasePanel
 */
export class CompletePanel extends TextActivityBase.Panel {
  /**
   * CompletePanel constructor
   * @param {Activity} act - The {@link Activity} to which this Panel belongs
   * @param {JClicPlayer} ps - Any object implementing the methods defined in the
   * [PlayStation](http://projectestac.github.io/jclic/apidoc/edu/xtec/jclic/PlayStation.html)
   * Java interface.
   * @param {external:jQuery} [$div] - The jQuery DOM element where this Panel will deploy
   */
  constructor(act, ps, $div) {
    super(act, ps, $div);
  }

  /**
   * Creates a target DOM element for the provided target.
   * @override
   * @param {TextActivityDocument.TextTarget} _target - The target related to the DOM object to be created
   * @param {external:jQuery} _$span -  - An initial DOM object (usually a `span`) that can be used
   * to store the target, or replaced by another type of object.
   * @returns {external:jQuery} - The jQuery DOM element loaded with the target data.
   */
  $createTargetElement(_target, _$span) {
    // Targets are always hidden in this type of activities
    return null;
  }

  /**
   * Called when the activity starts playing
   * @override
   */
  startActivity() {
    super.startActivity();
    this.$div.find('.JClicTextDocument').attr('contenteditable', 'true').attr('spellcheck', 'false');
  }

  /**
   * Evaluates all the targets in this panel. This method is usually called from the `Check` button.
   * @override
   * @returns {boolean} - `true` when all targets are OK, `false` otherwise.
   */
  evaluatePanel() {
    // TODO: Mark errors!
    const
      currentText = this.$div.find('.JClicTextDocument').text().trim(),
      originalText = this.act.document.getRawText(),
      ok = this.act.ev.checkText(currentText, originalText);

    this.ps.reportNewAction(this.act, 'WRITE', currentText, originalText, ok, this.targets.length);

    if (ok) {
      this.finishActivity(true);
      return true;
    } else {
      this.playEvent('finishedError');
    }
    return false;
  }

  /**
   * Ordinary ending of the activity, usually called form `processEvent`
   * @param {boolean} result - `true` if the activity was successfully completed, `false` otherwise
   */
  finishActivity(result) {
    this.$div.find('.JClicTextDocument').attr('contenteditable', 'false');
    return super.finishActivity(result);
  }
}

/**
 * Panel class associated to this type of activity: {@link CompletePanel}
 * @type {class} */
Complete.Panel = CompletePanel;

// Register activity class
export default Activity.registerClass('@text.Complete', Complete);
