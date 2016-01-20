//    File    : Complete.js  
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
   * This type of text activity suggests users to complete a given text, without any help on where to
   * write the missing words or phrases.
   * @exports Complete
   * @class
   * @extends TextActivityBase
   * @param {JClicProject} project - The project to which this activity belongs
   */
  //
  // TODO: Implement Complete text activities
  var Complete = function (project) {
    TextActivityBase.call(this, project);
  };

  Complete.prototype = {
    constructor: Complete
        //
  };

  // Complete extends TextActivityBase
  Complete.prototype = $.extend(Object.create(TextActivityBase.prototype), Complete.prototype);

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
  Complete.Panel = function (act, ps, $div) {
    TextActivityBase.Panel.call(this, act, ps, $div);
  };

  var ActPanelAncestor = TextActivityBase.Panel.prototype;
  Complete.Panel.prototype = {
    constructor: Complete.Panel,
    /**
     * 
     * Creates a target DOM element for the provided target.
     * @param {TextActivityDocument.TextTarget} target - The target related to the DOM object to be created
     * @param {external:jQuery} $span -  - An initial DOM object (usually a `span`) that can be used
     * to store the target, or replaced by another type of object.
     * @returns {external:jQuery} - The jQuery DOM element loaded with the target data.
     */
    $createTargetElement: function (target, $span) {
      // Targets are always hidden in this type of activities
      return null;
    },
    /**
     * 
     * Basic initialization procedure
     */
    initActivity: function () {
      ActPanelAncestor.initActivity.call(this);
      this.$div.find('.JClicTextDocument').attr('contenteditable', 'true').attr('spellcheck', 'false');
      this.playing = true;
    },    
    /**
     * 
     * Ordinary ending of the activity, usually called form `processEvent`
     * @param {boolean} result - `true` if the activity was successfully completed, `false` otherwise
     */
    finishActivity: function (result) {
      this.$div.find('.JClicTextDocument').attr('contenteditable', 'false');
      return ActPanelAncestor.finishActivity.call(this, result);
    }
    // TODO: Check activity completion!
  };

  // Complete.Panel extends TextActivityBase.Panel
  Complete.Panel.prototype = $.extend(Object.create(ActPanelAncestor), Complete.Panel.prototype);

  // Register class in Activity.prototype
  Activity.CLASSES['@text.Complete'] = Complete;

  return Complete;

});
