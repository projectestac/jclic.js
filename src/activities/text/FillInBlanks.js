//    File    : FillInBlanks.js  
//    Created : 20/06/2015  
//    By      : fbusquet  
//
//    JClic.js  
//    HTML5 player of [JClic](http://clic.xtec.cat) activities  
//    https://github.com/projectestac/jclic.js  
//    (c) 2000-2015 Catalan Educational Telematic Network (XTEC)  
//    This program is free software: you can redistribute it and/or modify it under the terms of
//    the GNU General Public License as published by the Free Software Foundation, version. This
//    program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without
//    even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
//    General Public License for more details. You should have received a copy of the GNU General
//    Public License along with this program. If not, see [http://www.gnu.org/licenses/].  

define([
  "jquery",
  "../../Utils",
  "../../Activity",
  "./TextActivityBase"
], function ($, Utils, Activity, TextActivityBase) {

  //
  // In this type of activity the text has some blanks that must be filled-in. The blanks can be
  // drop-down boxes or text fields (empty or pre-filled with an initial text). Blanks can also
  // have associated clues.
  var FillInBlanks = function (project) {
    TextActivityBase.call(this, project);
  };

  FillInBlanks.prototype = {
    constructor: FillInBlanks,
    //
    // The activity uses the keyboard
    needsKeyboard: function () {
      return true;
    },
    //
    // Constructor of this Activity.Panel object
    Panel: function (act, ps, $div) {
      TextActivityBase.prototype.Panel.call(this, act, ps, $div);
    }
  };

  // 
  // FillInBlanks extends TextActivityBase
  FillInBlanks.prototype = $.extend(Object.create(TextActivityBase.prototype), FillInBlanks.prototype);

  // 
  // Properties and methods specific to FillInBlanks.Panel
  var ActPanelAncestor = TextActivityBase.prototype.Panel.prototype;
  FillInBlanks.prototype.Panel.prototype = {
    constructor: FillInBlanks.prototype.Panel,
    //
    // Flag indicating if the activity is open or locked
    locked: true,
    //
    // The TextActivityDocument used in this Panel
    tad: null,
    //
    // Creates the target DOM element
    // Function to be overrided in derivative classes to create specific types of targets
    // target (TextTarget) - The target related to the DOM object to be created
    // $span (JQuery DOM object) - An initial DOM object (usually a `span`) that can be used to
    // store the target, or replaced by another type of object.
    $createTarget: function (target, $span) {

      var id = this.targets.length - 1;
      var idLabel = 'target' + ('000' + id).slice(-3);
      var thisPanel = this;

      if (target.isList && target.options) {
        // Use a `select` element
        $span = $('<select/>').attr({id: idLabel, name: idLabel});
        for (var i = 0; i < target.options.length; i++)
          $('<option/>', {value: target.options[i], text: target.options[i]}).appendTo($span);
        target.$comboList = $span.bind('change', function (event) {
          event.textTarget = target;
          thisPanel.processEvent(event);
        });
      } else {
        // Use a `span` element with the `contentEditable` attribute set `on`        
        target.currentText = target.iniText ?
            target.iniText
            : Utils.fillString(target.iniChar, target.numIniChars);

        target.$span = $span.html(target.currentText).attr({
          contenteditable: 'true',
          id: idLabel,
          autocomplete: 'off'
        }).bind('input', function (event) {
          event.textTarget = target;
          thisPanel.processEvent(event);
        });

      }
      return $span;
    },
    //
    // Checks if the specified TextTarget has a valid answer in its `currentText` field
    // target (TextTarget) - The target to be checked
    // onlyCheck (boolean) - When `true`, the cursor will no be re-positioned
    // Returns: Boolean - `true` when the target has a valid answer
    checkTarget: function (target, onlyCheck, jumpTo) {

      var result = this.act.ev.evalText(target.currentText, target.answers);
      var ok = this.act.ev.isOk(result);
      target.targetStatus = ok ? 'SOLVED' : 'WITH_ERROR';

      if (onlyCheck)
        return ok;

      var targetsOk = this.countSolvedTargets(false);

      if (target.currentText.length > 0) {
        this.ps.reportNewAction(this.act, 'WRITE', target.currentText, target.getAnswers(), ok, targetsOk);
      }
      if (ok && targetsOk === this.targets.length) {
        this.finishActivity(true);
        return ok;
      }
      else if (target.currentText.length > 0)
        this.playEvent(ok ? 'actionOk' : 'actionError');

      if (!ok)
        this.markTarget(target);

      if (jumpTo && jumpTo !== 0) {
        var p = target.num + jumpTo;
        if (p >= this.targets.length)
          p = 0;
        else if (p < 0)
          p = this.targets.length - 1;

        target = this.targets[p];

        if (target.$span) {
          target.$span.focus();
          Utils.setSelectionRange(target.$span.get(0), 0, 0);
        }
        else if (target.$comboList)
          target.$comboList.focus();
      }

      return ok;
    },
    // 
    // Counts targets with `SOLVED` status
    // checkNow (Boolean) - When `true`, all targets will be checked
    countSolvedTargets: function (checkNow) {
      var n = 0;
      for (var i = 0; i < this.targets.length; i++) {
        var target = this.targets[i];
        if (checkNow) {
          if (target.$span)
            target.currentText = target.$span.html();
          else if (target.$comboList)
            target.currentText = target.$comboList.val();
          this.checkTarget(target, true);
        }
        if (target.targetStatus === 'SOLVED')
          n++;
      }
      return n;
    },
    //
    // Visually marks the target as 'solved OK' or 'with errors'.
    // target ([TextTarget](TextActivityDocument.html#TextTarget)) - The text target to be marked.
    markTarget: function (target) {
      // TODO: Implement markTarget
    },
    //
    // Regular ending of the activity
    // reault (boolean) - Indicates if the activity was successfully done by the user
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
    // 
    // Main handler to receive mouse and key events
    // Overrides same function in TextActivityBase.Panel
    processEvent: function (event) {

      if (!ActPanelAncestor.processEvent.call(this, event))
        return false;

      var target = event.textTarget;

      switch (event.type) {
        case 'input':
          if (target && target.$span) {
            var $span = target.$span;
            var txt = $span.html();
            if (txt !== target.currentText) {
              // Span text has changed!
              var added = txt.length - target.currentText.length;
              if (added > 0) {
                // Check for `enter` key
                var p = txt.indexOf('<br>');
                if (p >= 0) {
                  txt = txt.replace(/<br>/g, '');
                  $span.html(txt);
                  target.currentText = txt;
                  return this.checkTarget(target, false, 1);
                }

                if (txt.indexOf(target.iniChar) >= 0) {
                  // Remove filling chars
                  var pos = Utils.getCaretCharacterOffsetWithin($span.get(0));
                  for (var i = 0; i < added; i++) {
                    var p = txt.indexOf(target.iniChar);
                    if (p < 0)
                      break;
                    txt = txt.substr(0, p) + txt.substr(p + 1);
                    if (p < pos)
                      pos--;
                  }
                  $span.html(txt);
                  Utils.setSelectionRange($span.get(0), pos, pos);
                }

                // Check if current text exceeds max length
                if (txt.length > target.maxLenResp) {
                  var pos = Utils.getCaretCharacterOffsetWithin($span.get(0));
                  txt = txt.substr(0, target.maxLenResp);
                  pos = Math.min(pos, txt.length);
                  $span.html(txt);
                  Utils.setSelectionRange($span.get(0), pos, pos);
                }
              }
              target.currentText = txt;
            }
          }
          break;

        case 'change':
          if (target && target.$comboList) {
            target.currentText = target.$comboList.val();
            return this.checkTarget(target, false, 1);
          }
          break;

        default:
          break;

      }
      return true;
    }
  };

  // FillInBlanks.Panel extends TextActivityBase.Panel
  FillInBlanks.prototype.Panel.prototype = $.extend(
      Object.create(ActPanelAncestor),
      FillInBlanks.prototype.Panel.prototype);

  // 
  // Register class in Activity.prototype
  Activity.prototype._CLASSES['@text.FillInBlanks'] = FillInBlanks;

  return FillInBlanks;

});
