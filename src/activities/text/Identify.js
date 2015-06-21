//    File    : Identify.js  
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
  // TODO: Implement Identify text activities
  var Identify = function (project) {
    TextActivityBase.call(this, project);
  };

  Identify.prototype = {
    constructor: Identify,
    //
    // Constructor of this Activity.Panel object
    Panel: function (act, ps, $div) {
      TextActivityBase.prototype.Panel.call(this, act, ps, $div);
    }
  };

  // 
  // Identify extends TextActivityBase
  Identify.prototype = $.extend(Object.create(TextActivityBase.prototype), Identify.prototype);

  // 
  // Properties and methods specific to Identify.Panel
  var ActPanelAncestor = TextActivityBase.prototype.Panel.prototype;
  Identify.prototype.Panel.prototype = {
    constructor: Identify.prototype.Panel
  };

  // Identify.Panel extends TextActivityBase.Panel
  Identify.prototype.Panel.prototype = $.extend(
      Object.create(ActPanelAncestor),
      Identify.prototype.Panel.prototype);

  // 
  // Register class in Activity.prototype
  Activity.prototype._CLASSES['@text.Identify'] = Identify;

  return Identify;
});


