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

  /**
   * This type of text activity suggests users to click on specific words or single letters of a
   * given text, without any help on where these elements are placed.
   * @exports IdentifyText
   * @class
   * @extends TextActivityBase
   * @param {JClicProject} project - The project to which this activity belongs
   */
  //
  // TODO: Implement Identify text activities
  var IdentifyText = function (project) {
    TextActivityBase.call(this, project);
  };

  IdentifyText.prototype = {
    constructor: IdentifyText
  };

  // 
  // Identify extends TextActivityBase
  IdentifyText.prototype = $.extend(Object.create(TextActivityBase.prototype), IdentifyText.prototype);

  /**
   * The {@link TextActivityBase.Panel} where this kind of text activities are played.
   * @class
   * @extends TextActivityBase.Panel
   * @param {Activity} act - The {@link Activity} to wich this Panel belongs
   * @param {JClicPlayer} ps - Any object implementing the methods defined in the 
   * [PlayStation](http://projectestac.github.io/jclic/apidoc/edu/xtec/jclic/PlayStation.html)
   * Java interface.
   * @param {external:jQuery=} $div - The jQuery DOM element where this Panel will deploy
   */
  IdentifyText.Panel = function (act, ps, $div) {
    TextActivityBase.Panel.call(this, act, ps, $div);
  };

  var ActPanelAncestor = TextActivityBase.Panel.prototype;
  IdentifyText.Panel.prototype = {
    constructor: IdentifyText.Panel,
    /**
     * Flag indicating if targets must be visually marked when the activity begins. In this type of
     * activity should be always `false` to avoid revealing the words o letters that must be found.
     * @type {boolean} */
    targetsMarked: false
  };

  // Identify.Panel extends TextActivityBase.Panel
  IdentifyText.Panel.prototype = $.extend(Object.create(ActPanelAncestor), IdentifyText.Panel.prototype);

  // Register class in Activity.prototype
  Activity.CLASSES['@text.Identify'] = IdentifyText;

  return IdentifyText;
});
