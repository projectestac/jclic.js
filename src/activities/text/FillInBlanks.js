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
  "../../Activity",
  "./TextActivityBase"
], function ($, Activity, TextActivityBase) {

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
    constructor: FillInBlanks.prototype.Panel
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
