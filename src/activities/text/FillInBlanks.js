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

      this.targets.push(target);

      var $result = $span;
      var id = this.targets.length - 1;
      var idLabel = 'target' + ('000' + id).slice(-3);
      if (target.isList && target.options) {
        $result = $('<select/>').attr({id: idLabel, name: idLabel});
        for (var i = 0; i < target.options.length; i++)
          $('<option/>', {value: target.options[i], text: target.options[i]}).appendTo($result);
      } else {
        var iniText = target.iniText;
        if (!iniText) {
          iniText = '';
          for (var i = 0; i < target.numIniChars; i++)
            iniText += target.iniChar;
        }
        $span.html(iniText);

        var attr = {
          // type: 'text',
          id: idLabel,
          // name: idLabel,
          autocomplete: 'off',
          contentEditable: 'true'};
        //if(target.numIniChars>0)
        //  attr.size = target.numIniChars;
        if (target.maxLenResp > 0)
          attr.maxlength = target.maxLenResp;
        //if(target.iniText)
        //attr.value = target.iniText;
        //$result = $('<input/>').attr(attr);         
        $span.attr(attr);

        var currentText = iniText;
        $span.bind('input', function () {
          var txt = $span.html();
          if (txt !== currentText) {
            var added = txt.length - currentText.length;
            if (added > 0 && txt.indexOf(target.iniChar) >= 0) {
              // Remove filling chars, if any
              var pos = Utils.getCaretCharacterOffsetWithin($span.get(0));
              for (var i = 0; i < added; i++) {
                var p = txt.indexOf(target.iniChar);
                if (p < 0)
                  break;
                txt = txt.substr(0, p) + txt.substr(p + 1);
                if(p<pos)
                  pos--;
              }
              $span.html(txt);              
              Utils.setSelectionRange($span.get(0), pos, pos);
            }
            currentText = txt;
          }
        });
      }
      return $result;
    }


    /*
     initDocument: function(){
     if(this.tad!=null){
     this.playing=false;
     this.tad.tmb.setCurrentTarget(null, this);
     tad.tmb.reset();
     playDoc=new TextActivityDocument(styleContext);
     tad.cloneDoc(playDoc, false, true, false);
     pane.setStyledDocument(playDoc);
     playDoc.attachTo(pane, FillInBlanks.Panel.this);
     tad.tmb.setParentPane(pane);
     pane.setEnabled(true);
     if(playDoc.tmb.size()>0){
     pane.setEditable(true);
     pane.requestFocus();
     pane.getCaret().setVisible(true);
     setCaretPos(0);
     locked=false;
     }
     else{
     locked=true;
     pane.setEditable(false);
     pane.getCaret().setVisible(false);
     }
     }
     }
     */




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
