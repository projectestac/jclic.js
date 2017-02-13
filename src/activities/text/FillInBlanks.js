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

define([
  "jquery",
  "../../Utils",
  "../../Activity",
  "./TextActivityBase"
], function ($, Utils, Activity, TextActivityBase) {

  /**
   * In this type of activity the text document has some blanks that must be filled-in. The blanks
   * can be drop-down boxes or text fields (empty or pre-filled with an initial text). Blanks can
   * also have associated clues, shown as "pop-ups".
   * @exports FillInBlanks
   * @class
   * @extends TextActivityBase
   * @param {JClicProject} project - The {@link JClicProject} to which this activity belongs
   */
  var FillInBlanks = function (project) {
    TextActivityBase.call(this, project);
  };

  FillInBlanks.prototype = {
    constructor: FillInBlanks,
    /**
     * Whether to jump or not to the next target when the current one is solved.
     * @type {boolean} */
    autoJump: false,
    /**
     * Whether to block or not the jump to other targets until the current one
     * is resolved.
     * @type {boolean} */
    forceOkToAdvance: false,
    /**
     *
     * This kind of activity usually makes use of the keyboard
     * @returns {boolean}
     */
    needsKeyboard: function () {
      return true;
    }
  };

  // FillInBlanks extends TextActivityBase
  FillInBlanks.prototype = $.extend(Object.create(TextActivityBase.prototype), FillInBlanks.prototype);

  /**
   * The {@link TextActivityBase.Panel} where fill-in blank activities are played.
   * @class
   * @extends TextActivityBase.Panel
   * @param {Activity} act - The {@link Activity} to which this Panel belongs
   * @param {JClicPlayer} ps - Any object implementing the methods defined in the
   * [PlayStation](http://projectestac.github.io/jclic/apidoc/edu/xtec/jclic/PlayStation.html)
   * Java interface.
   * @param {external:jQuery=} $div - The jQuery DOM element where this Panel will deploy
   */
  FillInBlanks.Panel = function (act, ps, $div) {
    TextActivityBase.Panel.call(this, act, ps, $div);
  };

  var ActPanelAncestor = TextActivityBase.Panel.prototype;
  FillInBlanks.Panel.prototype = {
    constructor: FillInBlanks.Panel,
    /**
     * Flag indicating if the activity is open or locked
     * @type {boolean} */
    locked: true,
    /**
     *
     * Creates a target DOM element for the provided target. This DOM element can be an editable
     * `span` or a `select` with specific `option` elements (when the target is a drop-down list)
     * @param {TextActivityDocument.TextTarget} target - The target related to the DOM object to be created
     * @param {external:jQuery} $span -  - An initial DOM object (usually a `span`) that can be used
     * to store the target, or replaced by another type of object.
     * @returns {external:jQuery} - The jQuery DOM element loaded with the target data.
     */
    $createTargetElement: function (target, $span) {

      var id = this.targets.length - 1;
      var idLabel = 'target' + ('000' + id).slice(-3);
      var panel = this;

      $span.addClass('JClicTextTarget');

      if (target.isList && target.options) {
        // Use a `select` element
        $span = $('<select/>', { id: idLabel, name: idLabel });
        for (var i = 0; i < target.options.length; i++)
          $('<option/>', { value: target.options[i], text: target.options[i] }).appendTo($span);
        target.$comboList = $span.bind('focus change', function (event) {
          event.textTarget = target;
          panel.processEvent(event);
        });
      } else {
        // Use a `span` element with the `contentEditable` attribute set `on`
        target.currentText = target.iniText ?
          target.iniText
          : Utils.fillString(target.iniChar, target.numIniChars);

        target.$span = $span.text(target.currentText).attr({
          contenteditable: 'true',
          id: idLabel,
          autocomplete: 'off',
          spellcheck: 'false'
        }).bind('focus input blur', function (event) {
          event.textTarget = target;
          panel.processEvent(event);
        });

      }
      return $span;
    },
    /**
     *
     * Evaluates all the targets in this panel. This method is usually called from the `Check` button.
     * @returns {boolean} - `true` when all targets are OK, `false` otherwise.
     */
    evaluatePanel: function () {
      var targetsOk = 0;
      var numTargets = this.targets.length;
      for (var i = 0; i < numTargets; i++) {
        var target = this.targets[i];
        var result = this.act.ev.evalText(target.readCurrentText(), target.answers);
        var ok = this.act.ev.isOk(result);
        target.targetStatus = ok ? 'SOLVED' : 'WITH_ERROR';
        if (ok)
          targetsOk++;
        this.markTarget(target, result);
        this.ps.reportNewAction(this.act, 'WRITE', target.currentText, target.getAnswers(), ok, targetsOk);
      }
      if (targetsOk === numTargets) {
        this.finishActivity(true);
        return true;
      } else {
        this.playEvent('finishedError');
      }
      return false;
    },
    /**
     *
     * Checks if the specified TextTarget has a valid answer in its `currentText` field
     * @param {TextActivityDocument.TextTarget} target - The target to check
     * @param {boolean} onlyCheck - When `true`, the cursor will no be re-positioned
     * @param {number=} jumpDirection - `1` to go forward, `-1` to go back.
     * @returns {boolean} - `true` when the target contains a valid answer
     */
    checkTarget: function (target, onlyCheck, jumpDirection) {

      var result = this.act.ev.evalText(target.currentText, target.answers);
      var ok = this.act.ev.isOk(result);
      target.targetStatus = ok ? 'SOLVED' : 'WITH_ERROR';

      if (onlyCheck)
        return ok;

      this.markTarget(target, result);

      var targetsOk = this.countSolvedTargets(false, false);

      if (target.currentText.length > 0) {
        this.ps.reportNewAction(this.act, 'WRITE', target.currentText, target.getAnswers(), ok, targetsOk);
      }
      if (ok && targetsOk === this.targets.length) {
        this.finishActivity(true);
        return ok;
      } else if (target.currentText.length > 0)
        this.playEvent(ok ? 'actionOk' : 'actionError');

      if (jumpDirection && jumpDirection !== 0) {
        var p = target.num + jumpDirection;
        if (p >= this.targets.length)
          p = 0;
        else if (p < 0)
          p = this.targets.length - 1;

        target = this.targets[p];

        if (target.$span) {
          target.$span.focus();
          Utils.setSelectionRange(target.$span.get(0), 0, 0);
        } else if (target.$comboList)
          target.$comboList.focus();
      }

      return ok;
    },
    /**
     *
     * Counts the number of targets with `SOLVED` status
     * @param {boolean} checkNow - When `true`, all targets will be evaluated. Otherwise, only the
     * current value of `targetStatus` will be checked.
     * @param {boolean=} mark - When `true`, errors in the target answer will be marked.
     * @returns {number} - The number of targets currently solved.
     */
    countSolvedTargets: function (checkNow, mark) {
      var n = 0;
      for (var i = 0; i < this.targets.length; i++) {
        var target = this.targets[i];
        if (checkNow) {
          target.readCurrentText();
          this.checkTarget(target, !mark);
        }
        if (target.targetStatus === 'SOLVED')
          n++;
      }
      return n;
    },
    /**
     *
     * Visually marks the target as 'solved OK' or 'with errors'.
     * @param {TextActivityDocument.TextTarget} target - The text target to be marked.
     * @param {number[]} attributes -  - Array of flags indicating the status (OK or error) for each
     * character in `target.currentText`.
     */
    markTarget: function (target, attributes) {

      var i = 0;

      if (target.$comboList || this.act.ev.isOk(attributes))
        target.checkColors();
      else if (target.$span) {
        // Identify text fragments
        var txt = target.currentText;
        var fragments = [];
        var currentStatus = -1;
        var currentFragment = -1;
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
        for (i = 0; i < fragments.length; i++) {
          $('<span/>')
            .text(fragments[i])
            .css(target.doc.style[currentStatus === 0 ? 'target' : 'targetError'].css)
            .appendTo(target.$span);
          currentStatus ^= 1;
        }
      }
      // Target has been marked, so clear the 'modified' flag
      target.flagModified = false;
    },
    /**
     *
     * Called by {@link JClicPlayer} when this activity panel is fully visible, just after the
     * initialization process.
     */
    activityReady: function () {
      ActPanelAncestor.activityReady.call(this);

      // Prevent strange behavior with GoogleChrome when `white-space` CSS attribute is set to
      // `pre-wrap` (needed for tabulated texts)
      $('.JClicTextTarget').css('white-space', 'normal');

      if (this.targets.length > 0 && this.targets[0].$span) {
        this.targets[0].$span.focus();
      }
    },
    /**
     *
     * Ordinary ending of the activity, usually called form `processEvent`
     * @param {boolean} result - `true` if the activity was successfully completed, `false` otherwise
     */
    finishActivity: function (result) {
      for (var i = 0; i < this.targets.length; i++) {
        var target = this.targets[i];
        if (target.$span)
          target.$span.removeAttr('contenteditable').blur();
        else if (target.$comboList)
          target.$comboList.attr('disabled', 'true').blur();
      }
      return ActPanelAncestor.finishActivity.call(this, result);
    },
    /**
     *
     * Main handler used to process mouse, touch, keyboard and edit events.
     * @param {HTMLEvent} event - The HTML event to be processed
     * @returns {boolean=} - When this event handler returns `false`, jQuery will stop its
     * propagation through the DOM tree. See: {@link http://api.jquery.com/on}
     */
    processEvent: function (event) {

      if (!ActPanelAncestor.processEvent.call(this, event))
        return false;

      var target = event.textTarget,
        $span = null,
        pos = 0;

      switch (event.type) {
        case 'focus':
          if (target) {
            if (target.$span && target.$span.children().length > 0) {
              // Clear inner spans used to mark errors
              $span = target.$span;
              pos = Math.min(
                target.currentText.length,
                Utils.getCaretCharacterOffsetWithin($span.get(0)));
              $span.empty();
              $span.text(target.currentText);
              Utils.setSelectionRange($span.get(0), pos, pos);
              target.flagModified = true;
            } else if (target.$comboList) {
              target.$comboList.css(target.doc.style['target'].css);
            }
          }
          break;

        case 'blur':
          if (target.flagModified && !this.$checkButton)
            this.checkTarget(target, false, 1);
          break;

        case 'input':
          if (target && target.$span) {
            $span = target.$span;
            var txt = $span.html();
            // Check for `enter` key
            if (txt.indexOf('<br>') >= 0) {
              txt = txt.replace(/<br>/g, '');
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
              var added = txt.length - target.currentText.length;
              if (added > 0) {
                if (txt.indexOf(target.iniChar) >= 0) {
                  // Remove filling chars
                  pos = Utils.getCaretCharacterOffsetWithin($span.get(0));
                  for (var i = 0; i < added; i++) {
                    var p = txt.indexOf(target.iniChar);
                    if (p < 0)
                      break;
                    txt = txt.substr(0, p) + txt.substr(p + 1);
                    if (p < pos)
                      pos--;
                  }
                  $span.text(txt);
                  Utils.setSelectionRange($span.get(0), pos, pos);
                }

                // Check if current text exceeds max length
                if (txt.length > target.maxLenResp) {
                  pos = Utils.getCaretCharacterOffsetWithin($span.get(0));
                  txt = txt.substr(0, target.maxLenResp);
                  pos = Math.min(pos, txt.length);
                  $span.text(txt);
                  Utils.setSelectionRange($span.get(0), pos, pos);
                }
              } else if (txt === '') {
                txt = target.iniChar;
                $span.text(txt);
                Utils.setSelectionRange($span.get(0), 0, 0);
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
  };

  // FillInBlanks.Panel extends TextActivityBase.Panel
  FillInBlanks.Panel.prototype = $.extend(Object.create(ActPanelAncestor), FillInBlanks.Panel.prototype);

  // Register class in Activity.prototype
  Activity.CLASSES['@text.FillInBlanks'] = FillInBlanks;

  return FillInBlanks;

});
