//    File    : Skin.js  
//    Created : 29/04/2015  
//    By      : Francesc Busquets  
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
  "../Utils",
  "../AWT"
], function ($, Utils, AWT) {

  /**
   * This abstract class manages the layout, position ans size of the visual components of JClic:
   * player window, message box, counters, buttons, status... and also the appareance of the main
   * container.<br>
   * The basic implementation of Skin is {@link DefaultSkin}.
   * @exports Skin
   * @class
   * @abstract
   * @extends AWT.Container
   * @param {PlayStation=} ps - The PlayStation (currently a {@link JClicPlayer}) used to load and
   * realize the media objects meeded tot build the Skin.
   * @param {string=} name - The skin name
   * @param {external:jQuery=} $div - The DOM component that will act as a main container of the skin
   */
  var Skin = function (ps, name, $div) {

    // Skin extends [AWT.Container](AWT.html)
    AWT.Container.call(this);

    this.$div = $div ? $div : $('<div class="JClic"/>');
    this.buttons = Utils.cloneObject(Skin.prototype.buttons);
    this.counters = Utils.cloneObject(Skin.prototype.counters);
    this.msgArea = Utils.cloneObject(Skin.prototype.msgArea);
    if (ps)
      this.ps = ps;
    if (name)
      this.name = name;

    // Registers this Skin in the list of realized Skin objects
    Skin.skinStack.push(this);

  };

  /**
   * Collection of realized __Skin__ objects.<br>
   * @type {Skin[]} */
  Skin.skinStack = [];

  /**
   * List of classes derived from Skin. It should be filled by real skin classes at declaration time.
   * @type {object} */
  Skin.CLASSES = {};

  Skin.prototype = {
    constructor: Skin,
    /**
     * The HTML div object used by this Skin
     * @type {external:jQuery} */
    $div: null,
    /**
     * Current name of the skin.
     * @type {string} */
    name: 'default',
    /**
     * Name of the XML file used to retrieve the skin settings.
     * @type {string} */
    fileName: '',
    /**
     * Waiting panel, displayed while loading resources.
     * @type {external:jQuery} */
    $waitPanel: null,
    /**
     * The basic collection of buttons that most skins implement
     * @type {object} */
    buttons: {
      'prev': null,
      'next': null,
      'return': null,
      'reset': null,
      'info': null,
      'help': null,
      'audio': null,
      'about': null,
      'fullscreen': null
    },
    /**
     * The collection of counters
     * @type {object} */
    counters: {
      'score': null,
      'actions': null,
      'time': null
    },
    /**
     * The collection of message areas
     * @type {object} */
    msgArea: {
      'main': null,
      'aux': null,
      'mem': null
    },
    /**
     * The {@link JClicPlayer} object associated to this skin
     * @type {JClicPlayer} */
    player: null,
    /**
     * The [PlayStation](http://projectestac.github.io/jclic/apidoc/edu/xtec/jclic/PlayStation.html)
     * used by this Skin. Usually, the same as `player` 
     * @type {PlayStation} */
    ps: null,
    /**
     * Counter to be incremented or decremented as `waitCursor` is requested or released.
     * @type {number} */
    waitCursorCount: 0,
    /**
     * 
     * Attaches a {@link JClicPlayer} object to this Skin
     * @param {JClicPlayer} player
     */
    attach: function (player) {
      if (this.player !== null)
        this.detach();
      this.player = player;
      this.$div.prepend(this.player.$div);
    },
    /**
     * 
     * Detaches the `player` element from this Skin
     */
    detach: function () {
      if (this.player !== null) {
        this.player.$div.remove();
        this.player = null;
      }
      if (this.currentHelpWindow !== null)
        this.currentHelpWindow.$div.hide();
      if (this.currentAboutWindow !== null)
        this.currentAboutWindow.$div.hide();
      this.setEnabled(false);
    },
    /**
     * 
     * Gets the specified Skin from skinStack, or creates a new one if not found.<br>
     * This function should be used only through `Skin.prototype.getSkin`
     * @param {string} skinName - The name of the searched skin
     * @param {PlayStation} ps - The PlayStation (usually a {@link JClicPlayer}) used to build the new skin.
     * @param {external:jQuery} $div - The DOM element where the skin will develop
     * @param {external:jQuery} $xml - An XML element with the properties of the new skin
     * @returns {Skin}
     */
    getSkin: function (skinName, ps, $div, $xml) {
      var sk = null;
      // look for the skin in the stack of realized skins
      if (skinName && ps) {
        for (var i = 0; i < Skin.skinStack; i++) {
          sk = Skin.skinStack[i];
          if (sk.name === skinName && sk.ps === ps)
            return sk;
        }
      }

      // Locates the class of the requested Skin (or [DefaultSkin](DefaultSkin.html)
      // if not specified), creates and registers it on `skinStack`
      var cl = Skin.CLASSES[skinName ? skinName : 'DefaultSkin'];
      if (cl) {
        sk = new cl(ps, skinName, $div);
        if ($xml)
          sk.setProperties($xml);
      }
      else
        console.log('Unknown skin class: ' + skinName);

      return sk;
    },
    /**
     * 
     * Loads the object settings from a specific JQuery XML element
     * @param {external:jQuery} $xml - The XML element containing the properties of the skin
     */
    setProperties: function ($xml) {
      // To be implemented by subclasses
    },
    /**
     * 
     * Updates the graphic contents of this skin.<br>
     * The method should be called from {@link Skin#update}
     * @param {AWT.Rectangle} dirtyRegion - The region to be painted. When `null`, refers to the full
     * skin area.
     */
    updateContent: function (dirtyRegion) {
      // To be overrided. Does nothing in abstract Skin.
      return AWT.Container.prototype.updateContent.call(this, dirtyRegion);
    },
    /**
     * Resets all counters
     * @param {boolean} bEnabled - Leave it enabled/disabled
     */
    resetAllCounters: function (bEnabled) {
      // TODO: implement counters
    },
    /**
     * 
     * Writes system messages to the javascript console
     * @param {string} msg1 - Main message
     * @param {string=} msg2 - Complementary message
     */
    setSystemMessage: function (msg1, msg2) {
      var s = '[JClic: ';
      if (msg1)
        s += msg1;
      if (msg2)
        s += (msg1 ? ' - ' : '') + msg2;
      s += ']';
      console.log(s);
    },
    /**
     * 
     * Sets/unsets the 'wait' state
     * @param {boolean} status - Whether to set or unset the wait status. When `undefined`, the
     * `waitCursorCount`member is evaluated to decide if the wait state should be activated or deactivated.
     */
    setWaitCursor: function (status) {
      if (typeof status === 'undefined') {
        if (this.$waitPanel)
          this.$waitPanel.css({
            display: this.waitCursorCount > 0 ? 'inherit' : 'none'
          });
      }
      else {
        if (status)
          this.waitCursorCount++;
        else if (--this.waitCursorCount < 0)
          this.waitCursorCount = 0;
        this.setWaitCursor();
      }
    },
    /**
     * 
     * Shows a window with clues or help for the current activity
     * @param {external:jQuery} $hlpComponent - A JQuery DOM element with the information to be shown.
     * It can be a string or number. When `null`, the help window (if any) must be closed.
     */
    showHelp: function ($hlpComponent) {
      // TODO: Implement HelpWindow
    },
    /**
     * 
     * Shows a window with information about ths results obtained in the activities
     * @param {string} tabName - The about window can have multiple tabs. This parameter indicates
     * what tab must be shown by default. When `null`, the window must be closed.
     */
    showAbout: function (tabName) {
      // TODO: Implement showAbout      
    },
    /**
     * 
     * Enables or disables a specific counter
     * @param {string} counter - Which counter
     * @param {boolean} bEnabled - When `true`, the counter will be enabled.
     */
    enableCounter: function (counter, bEnabled) {
      if (this.counters[counter])
        this.counters[counter].setEnabled(bEnabled);
    },
    /**
     * Main method, to be implemented by subclasses
     */
    doLayout: function () {
    },
    /**
     * 
     * Compares two Skin objects
     * @param {Skin} skin - The Skin to compare against this
     * @returns {boolean} - `true` if both skins are equivalent.
     */
    equals: function (skin) {
      return skin &&
          this.name === skin.name &&
          this.ps === skin.ps;
    },
    /**
     * 
     * Gets the {@link ActiveBox} used to display the main messages of activities
     * @returns {ActiveBox}
     */
    getMsgBox: function () {
      // Method to be implemented by subclasses
      return null;
    },
    /**
     * Gets the JQuery top component, usually the `$div` object enclosing this skin
     * @returns {external:jQuery}
     */
    $getTopComponent: function () {
      return this.$div;
    },
    /**
     * 
     * Method used to notify this skin that a specific action has changed its enabled/disabled status
     * @param {AWT.Action} act - The action originating the change event
     */
    actionStatusChanged: function (act) {
      // To be implemented in subclasses      
    }
  };

  // Skin extends [AWT.Container](AWT.html)
  Skin.prototype = $.extend(Object.create(AWT.Container.prototype), Skin.prototype);

  return Skin;
});
