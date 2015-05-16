//    File    : TextActivityBase.js  
//    Created : 16/05/2015  
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
  "../../Activity"
], function ($, Activity) {

  //
  // This class acts as a base for all text activities
  var TextActivityBase = function (project) {
    Activity.call(this, project);
  };

  TextActivityBase.prototype = {
    constructor: TextActivityBase,
    Panel: function (act, ps, $div) {
      Activity.prototype.Panel.call(this, act, ps, $div);
    }
  };

  // 
  // TextActivityBase extends Activity
  TextActivityBase.prototype = $.extend(Object.create(Activity.prototype), TextActivityBase.prototype);
  
  // 
  // Properties and methods specific to textAvtivityBase.Panel
  var ActPanelProt = Activity.prototype.Panel.prototype;
  TextActivityBase.prototype.Panel.prototype = {
    constructor: TextActivityBase.prototype.Panel,
    //
    // Prepares the text panel
    buildVisualComponents: function(){
      ActPanelProt.buildVisualComponents.call(this);      
    }
  };

  // TextActivityBase.Panel extends Activity.Panel
  TextActivityBase.prototype.Panel.prototype = $.extend(
      Object.create(Activity.prototype.Panel.prototype), 
      TextActivityBase.prototype.Panel.prototype);

  // 
  // Register class in Activity.prototype
  Activity.prototype._CLASSES['@text.Complete'] = TextActivityBase;
  Activity.prototype._CLASSES['@text.FillInBlanks'] = TextActivityBase;
  Activity.prototype._CLASSES['@text.Identify'] = TextActivityBase;
  Activity.prototype._CLASSES['@text.Order'] = TextActivityBase;

  return TextActivityBase;

});
