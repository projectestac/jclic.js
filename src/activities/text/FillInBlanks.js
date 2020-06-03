/**
 *  File    : activities/text/FillInBlanks.js
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
 *  (c) 2000-2020 Catalan Educational Telematic Network (XTEC)
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

import $ from 'jquery';
import { fillString, setSelectionRange, getCaretCharacterOffsetWithin } from '../../Utils';
import Activity from '../../Activity';
import TextActivityBase from './TextActivityBase';

/**
 * In this type of activity the text document has some blanks that must be filled-in. The blanks
 * can be drop-down boxes or text fields (empty or pre-filled with an initial text). Blanks can
 * also have associated clues, shown as "pop-ups".
 * @extends module:TextActivityBase
 */
export class FillInBlanks extends TextActivityBase {
  /**
   * FillInBlanks constructor
   * @param {JClicProject} project - The {@link module:project/JclicProject.JClicProject JClicProject} to which this activity belongs
   */
  constructor(project) {
    super(project);
  }

  /**
   * This kind of activity usually makes use of the keyboard
   * @override
   * @returns {boolean}
   */
  needsKeyboard() {
    return true;
  }
}

Object.assign(FillInBlanks.prototype, {
  /**
   * Whether to jump or not to the next target when the current one is solved.
   * @name FillInBlanks#autoJump
   * @type {boolean} */
  autoJump: false,
  /**
   * Whether to block or not the jump to other targets until the current one
   * is resolved.
   * @name FillInBlanks#forceOkToAdvance
   * @type {boolean} */
  forceOkToAdvance: false,
});

/**
 * The {@link TextActivityBasePanel} where {@link module:activities/text/FillInBlanks.FillInBlanks FillInBlanks} activities are played.
 * @extends module:TextActivityBasePanel
 */
export class FillInBlanksPanel extends TextActivityBase.Panel {
  /**
   * FillInBlanksPanel constructor
   * @param {Activity} act - The {@link module:Activity.Activity Activity} to which this Panel belongs
   * @param {JClicPlayer} ps - Any object implementing the methods defined in the
   * [PlayStation](http://projectestac.github.io/jclic/apidoc/edu/xtec/jclic/PlayStation.html)
   * Java interface.
   * @param {external:jQuery} [$div] - The jQuery DOM element where this Panel will deploy
   */
  constructor(act, ps, $div) {
    super(act, ps, $div);
  }

  /**
   * Creates a target DOM element for the provided target. This DOM element can be an editable
   * `span` or a `select` with specific `option` elements (when the target is a drop-down list)
   * @override
   * @param {TextActivityDocument.TextTarget} target - The target related to the DOM object to be created
   * @param {external:jQuery} $span -  - An initial DOM object (usually a `span`) that can be used
   * to store the target, or replaced by another type of object.
   * @returns {external:jQuery} - The jQuery DOM element loaded with the target data.
   */
  $createTargetElement(target, $span) {

    $span.addClass('JClicTextTarget');

    const idLabel = `target${`000${this.targets.length - 1}`.slice(-3)}`;
    if (target.isList && target.options && target.options.length > 0) {
      // Use a `select` element
      $span = $('<select/>', { id: idLabel, name: idLabel });
      if (target.options[0].trim() !== '')
        $('<option selected/>', { value: '', text: '' }).appendTo($span);
      target.options.forEach(op => $('<option/>', { value: op, text: op }).appendTo($span));
      target.$comboList = $span.bind('focus change', event => {
        event.textTarget = target;
        this.processEvent(event);
      });
    } else {
      // Use a `span` element with the `contentEditable` attribute set `on`
      target.currentText = target.iniText ?
        target.iniText
        : fillString(target.iniChar, target.numIniChars);

      target.$span = $span.text(target.currentText).attr({
        contenteditable: 'true',
        id: idLabel,
        autocomplete: 'off',
        spellcheck: 'false'
      }).bind('focus input blur', event => {
        event.textTarget = target;
        this.processEvent(event);
      }).bind('keydown keyup', event => {
        // Catch `enter` key in Firefox
        if (event.keyCode === 13) {
          event.preventDefault();
          if (event.type === 'keydown') {
            // Simulate a `blur` event
            event.textTarget = target;
            event.type = 'blur';
            this.processEvent(event);
          }
        }
      });
    }
    return $span;
  }

  /**
   * Evaluates all the targets in this panel. This method is usually called from the `Check` button.
   * @override
   * @returns {boolean} - `true` when all targets are OK, `false` otherwise.
   */
  evaluatePanel() {
    let targetsOk = 0;
    const numTargets = this.targets.length;
    this.targets.forEach(target => {
      const
        result = this.act.ev.evalText(target.readCurrentText(), target.answers),
        ok = this.act.ev.isOk(result);
      target.targetStatus = ok ? 'SOLVED' : 'WITH_ERROR';
      if (ok)
        targetsOk++;
      this.markTarget(target, result);
      this.ps.reportNewAction(this.act, 'WRITE', target.currentText, target.getAnswers(), ok, targetsOk);
    });
    if (targetsOk === numTargets) {
      this.finishActivity(true);
      return true;
    } else
      this.playEvent('finishedError');
    return false;
  }

  /**
   * Checks if the specified TextTarget has a valid answer in its `currentText` field
   * @param {TextActivityDocument.TextTarget} target - The target to check
   * @param {boolean} onlyCheck - When `true`, the cursor will no be re-positioned
   * @param {number} [jumpDirection] - `1` to go forward, `-1` to go back.
   * @returns {boolean} - `true` when the target contains a valid answer
   */
  checkTarget(target, onlyCheck, jumpDirection) {
    const
      result = this.act.ev.evalText(target.currentText, target.answers),
      ok = this.act.ev.isOk(result);

    target.targetStatus = ok ? 'SOLVED' : 'WITH_ERROR';
    if (onlyCheck)
      return ok;

    this.markTarget(target, result);
    const targetsOk = this.countSolvedTargets(false, false);
    if (target.currentText.length > 0)
      this.ps.reportNewAction(this.act, 'WRITE', target.currentText, target.getAnswers(), ok, targetsOk);
    if (ok && targetsOk === this.targets.length) {
      this.finishActivity(true);
      return ok;
    } else if (target.currentText.length > 0)
      this.playEvent(ok ? 'actionOk' : 'actionError');

    if (jumpDirection && jumpDirection !== 0) {
      let p = target.num + jumpDirection;
      if (p >= this.targets.length)
        p = 0;
      else if (p < 0)
        p = this.targets.length - 1;

      const destTarget = this.targets[p];
      if (destTarget.$span) {
        destTarget.$span.focus();
        setSelectionRange(destTarget.$span.get(-1), 0, 0);
      } else if (destTarget.$comboList)
        destTarget.$comboList.focus();
    }
    return ok;
  }

  /**
   * Counts the number of targets with `SOLVED` status
   * @param {boolean} checkNow - When `true`, all targets will be evaluated. Otherwise, only the
   * current value of `targetStatus` will be checked.
   * @param {boolean} [mark] - When `true`, errors in the target answer will be marked.
   * @returns {number} - The number of targets currently solved.
   */
  countSolvedTargets(checkNow, mark) {
    return this.targets.reduce((n, target) => {
      if (checkNow) {
        target.readCurrentText();
        this.checkTarget(target, !mark);
      }
      return target.targetStatus === 'SOLVED' ? ++n : n;
    }, 0);
  }

  /**
   * Visually marks the target as 'solved OK' or 'with errors'.
   * @param {TextActivityDocument.TextTarget} target - The text target to be marked.
   * @param {number[]} attributes -  - Array of flags indicating the status (OK or error) for each
   * character in `target.currentText`.
   */
  markTarget(target, attributes) {
    if (target.$comboList || this.act.ev.isOk(attributes))
      target.checkColors();
    else if (target.$span) {
      // Identify text fragments
      const
        txt = target.currentText,
        fragments = [];
      let
        currentStatus = -1,
        currentFragment = -1,
        i = 0;
      for (; i < attributes.length && i < txt.length; i++) {
        if (attributes[i] !== currentStatus) {
          fragments[++currentFragment] = '';
          currentStatus = attributes[i];
        }
        fragments[currentFragment] += txt.charAt(i);
      }
      if (i < txt.length)
        fragments[currentFragment] += txt.substr(i);
      // Empty and re-fill $span
      target.$span.empty();
      currentStatus = attributes[0];
      fragments.forEach(fragment => {
        $('<span/>')
          .text(fragment)
          .css(target.doc.style[currentStatus === 0 ? 'target' : 'targetError'].css)
          .appendTo(target.$span);
        currentStatus ^= 1;
      });
    }
    // Target has been marked, so clear the 'modified' flag
    target.flagModified = false;
  }

  /**
   * Called by {@link module:JClicPlayer.JClicPlayer JClicPlayer} when this activity panel is fully visible, just after the
   * initialization process.
   * @override
   */
  activityReady() {
    super.activityReady();

    // Prevent strange behavior with GoogleChrome when `white-space` CSS attribute is set to
    // `pre-wrap` (needed for tabulated texts)
    $('.JClicTextTarget').css('white-space', 'normal');
    if (this.targets.length > 0 && this.targets[0].$span)
      this.targets[0].$span.focus();
  }

  /**
   * Ordinary ending of the activity, usually called form `processEvent`
   * @override
   * @param {boolean} result - `true` if the activity was successfully completed, `false` otherwise
   */
  finishActivity(result) {
    this.targets.forEach(target => {
      if (target.$span)
        target.$span.removeAttr('contenteditable').blur();
      else if (target.$comboList)
        target.$comboList.attr('disabled', 'true').blur();
    });
    return super.finishActivity(result);
  }

  /**
   * Main handler used to process mouse, touch, keyboard and edit events.
   * @override
   * @param {HTMLEvent} event - The HTML event to be processed
   * @returns {boolean} - When this event handler returns `false`, jQuery will stop its
   * propagation through the DOM tree. See: {@link http://api.jquery.com/on}
   */
  processEvent(event) {
    if (!super.processEvent(event))
      return false;

    const target = event.textTarget;
    let $span = null, pos = 0;
    switch (event.type) {
      case 'focus':
        if (target) {
          if (target.$span && target.$span.children().length > 0) {
            // Clear inner spans used to mark errors
            $span = target.$span;
            pos = Math.min(
              target.currentText.length,
              getCaretCharacterOffsetWithin($span.get(-1)));
            $span.empty();
            $span.text(target.currentText);
            setSelectionRange($span.get(-1), pos, pos);
            target.flagModified = true;
          } else if (target.$comboList)
            target.$comboList.css(target.doc.style['target'].css);

          if (target.$popup && (target.infoMode === 'always' || target.infoMode === 'onError' && target.targetStatus === 'WITH_ERROR'))
            this.showPopup(target.$popup, target.popupMaxTime, target.popupDelay);
          else
            this.showPopup(null);
        }
        break;

      case 'blur':
        if (target.flagModified && !this.$checkButton)
          this.checkTarget(target, false, 1);
        break;

      case 'input':
        if (target && target.$span) {
          $span = target.$span;
          let txt = $span.html();
          // Check for `enter` key
          if (/(<br>|\n|\r)/.test(txt)) {
            txt = txt.replace(/(<br>|\n|\r)/g, '');
            $span.html(txt);
            target.currentText = $span.text();
            return this.$checkButton ? false : this.checkTarget(target, false, 1);
          }
          // Check if text has changed
          // From here, use 'text' instead of 'html' to avoid HTML entities
          txt = $span.text();
          if (txt !== target.currentText) {
            // Span text has changed!
            target.flagModified = true;
            const added = txt.length - target.currentText.length;
            if (added > 0) {
              if (txt.indexOf(target.iniChar) >= 0) {
                // Remove filling chars
                pos = getCaretCharacterOffsetWithin($span.get(-1));
                for (let i = 0; i < added; i++) {
                  const p = txt.indexOf(target.iniChar);
                  if (p < 0)
                    break;
                  txt = txt.substr(0, p) + txt.substr(p + 1);
                  if (p < pos)
                    pos--;
                }
                $span.text(txt);
                setSelectionRange($span.get(-1), pos, pos);
              }

              // Check if current text exceeds max length
              if (txt.length > target.maxLenResp) {
                pos = getCaretCharacterOffsetWithin($span.get(-1));
                txt = txt.substr(0, target.maxLenResp);
                pos = Math.min(pos, txt.length);
                $span.text(txt);
                setSelectionRange($span.get(-1), pos, pos);
              }
            } else if (txt === '') {
              txt = target.iniChar;
              $span.text(txt);
              setSelectionRange($span.get(-1), 0, 0);
            }
            target.currentText = txt;
          }
        }
        break;

      case 'change':
        if (target && target.$comboList) {
          target.currentText = target.$comboList.val();
          target.flagModified = true;
          return this.$checkButton ? false : this.checkTarget(target, false, 1);
        }
        break;

      default:
        break;
    }
    return true;
  }
}

Object.assign(FillInBlanksPanel.prototype, {
  /**
   * Flag indicating if the activity is open or locked
   * @name FillInBlanksPanel#locked
   * @type {boolean} */
  locked: true,
});

/**
 * Panel class associated to this type of activity: {@link FillInBlanksPanel}
 * @type {class} */
FillInBlanks.Panel = FillInBlanksPanel;

// Register activity class
export default Activity.registerClass('@text.FillInBlanks', FillInBlanks);
