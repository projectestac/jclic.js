//    File    : Order.js  
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
   * In this type of text activity users must put in order some words or paragrafs that have been
   * initially scrambled.
   * @exports OrderText
   * @class
   * @extends TextActivityBase
   * @param {JClicProject} project - The project to which this activity belongs
   */
  //
  // TODO: Implement order text activities
  var OrderText = function (project) {
    TextActivityBase.call(this, project);
  };

  OrderText.prototype = {
    constructor: OrderText,
    /**
     * Whether to allow or not to scramble words among different paragraphs.
     * @type {boolean} */
    amongParagraphs: false    
  };

  // OrderText extends TextActivityBase
  OrderText.prototype = $.extend(Object.create(TextActivityBase.prototype), OrderText.prototype);

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
  OrderText.Panel = function (act, ps, $div) {
    TextActivityBase.Panel.call(this, act, ps, $div);
  };

  // Properties and methods specific to OrderText.Panel
  var ActPanelAncestor = TextActivityBase.Panel.prototype;
  OrderText.Panel.prototype = {
    constructor: OrderText.Panel
  };

  // OrderText.Panel extends TextActivityBase.Panel
  OrderText.Panel.prototype = $.extend(Object.create(ActPanelAncestor), OrderText.Panel.prototype);

  // Register class in Activity.prototype
  Activity.CLASSES['@text.Order'] = OrderText;

  return OrderText;
});
