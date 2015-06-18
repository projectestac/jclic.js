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

  //
  // This abstract class manages the layout, position ans size of the visual components
  // of JClic: player window, message box, counters, buttons, status... and also
  // the appareance of the main container.
  // The basic implementation of Skin is [DefaultSkin](DefaultSkin.html)
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
    Skin.prototype._skinStack.push(this);

  };

  Skin.prototype = {
    constructor: Skin,
    // 
    // `Skin.prototype._CLASSES` contains the list of classes derived from Skin. It
    // should be read-only and updated by real skin classes at creation time.
    _CLASSES: {},
    //
    // The prototype stores a collection of realized __Skin__ objects:
    // Is important to access always this member as a `Skin.prototype.skinStack`
    _skinStack: [],
    //
    // The HTML div object used by this Skin
    $div: null,
    //
    // Current name of the skin and name of the XML file used to retrieve
    // the settings
    name: 'default',
    fileName: '',
    //
    // Waiting panel, displayed while loading resources
    $waitPanel: null,
    //
    // The collection of buttons
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
    //
    // The collection of counters
    counters: {
      'score': null,
      'actions': null,
      'time': null
    },
    //
    // The collection of message areas
    msgArea: {
      'main': null,
      'aux': null,
      'mem': null
    },
    //
    // The [JClicPlayer](JClicPlayer.html) object
    player: null,
    //
    // The [PlayStation](http://projectestac.github.io/jclic/apidoc/edu/xtec/jclic/PlayStation.html)
    // used by this Skin. Usually, the same as `player` 
    ps: null,
    // Miscellaneous boolean flags    
    waitCursorCount: 0,
    readyToPaint: false,
    //
    // Numbers and boolean flags used to display progess bars
    progressMax: 100,
    progress: 0,
    hasProgress: false,
    progressActive: false,
    progressStartTime: 0,
    //
    // Attaches a [JClicPlayer](JClicPlayer.html) object to this Skin    
    attach: function (player) {
      if (this.player !== null)
        this.detach();
      this.player = player;
      this.$div.prepend(this.player.$div);
      //this.setWaitCursor();
      //this.setEnabled(true);
      //this.revalidate();
    },
    //
    // Detaches the `player` element from this Skin
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
    //
    // Gets the specified Skin from skinStack, or creates a new one if not found
    // This function should be used only through `Skin.prototype.getSkin`
    // skinName (String) - The name of this skin
    // ps (PlayStation) - The PlayStation used to build this skin
    // $div (a JQuery `<div/>` object) - The `div` to be used as a recipient for this skin
    // $xml (JQuery XML element) - An optional element with the skin settings in XML format
    getSkin: function (skinName, ps, $div, $xml) {
      var sk = null;
      // look for the skin in the stack of realized skins
      if (skinName && ps) {
        for (var i = 0; i < Skin.prototype._skinStack; i++) {
          sk = Skin.prototype._skinStack[i];
          if (sk.name === skinName && sk.ps === ps)
            return sk;
        }
      }

      // Locates the class of the requested Skin (or [DefaultSkin](DefaultSkin.html)
      // if not specified), creates and registers it on `skinStack`
      var cl = Skin.prototype._CLASSES[skinName ? skinName : 'DefaultSkin'];
      if (cl) {
        sk = new cl(ps, skinName, $div);
        if ($xml)
          sk.setProperties($xml);
      }
      else
        console.log('Unknown skin class: ' + skinName);

      return sk;
    },
    //
    // Loads the object settings from a specific JQuery XML element 
    // To be implemented by subclasses
    setProperties: function ($xml) {
    },
    //
    // Overrides `AWT.Container.updateContent`
    // Updates the graphic contents of this skin.
    // The method should be called from `Skin.update`
    // dirtyRect (AWT.Rectangle) - Specifies the area to be updated. When `null`, it's the whole panel.
    updateContent: function (dirtyRegion) {
      // To be overrided. Does nothing in abstract Skin.
      return AWT.Container.prototype.updateContent.call(this);
    },
    //
    // Reset all counters
    // bEnabled (boolean) - Leave it enabled/disabled
    resetAllCounters: function (bEnabled) {
      // TODO: implement counters
    },
    //
    // Sets system messages
    setSystemMessage: function (msg1, msg2) {
      var s = '[JClic: ';
      if (msg1)
        s += msg1;
      if (msg2)
        s += (msg1 ? ' - ' : '') + msg2;
      s += ']';
      console.log(s);
    },
    //
    // sets/unsets the 'wait' state
    // status (boolean) - to set or unset the wait status. When `undefined`, the
    // `waitCursorCount`member is evaluated to decide if the wait state should be 
    // activated or deactivated
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
    //
    // Shows a window with clues or help for the current activity
    // $hlpComponent - A JQuery DOM element with the information to be shown. It can
    // also be a string or number. When is `null`, the help window (if any) must be closed.
    showHelp: function ($hlpComponent) {
      // TODO: Implement HelpWindow
    },
    //
    // Shows a window with information about ths results obtained in the activities
    // tabName (string) - The about window can have multiple tabs. This parameter indicates
    // what tab must be shown by default. When `null`, the window must be closed.
    showAbout: function (tabName) {
      // TODO: Implement showAbout      
    },
    // Enables or disables a specific counter
    enableCounter: function (counter, bEnabled) {
      if (this.counters[counter])
        this.counters[counter].setEnabled(bEnabled);
    },
    // 
    // Main method, to be implemented by subclasses
    doLayout: function () {
    },
    //
    // Compares two Skin objects
    equals: function (skin) {
      return skin &&
          this.name === skin.name &&
          this.ps === skin.ps;
    },
    //
    // Gets the [ActiveBox](ActiveBox.html) used to display the main messages of activities
    getMsgBox: function () {
      // Method to be implemented by subclasses
      return null;
    },
    //
    // Gets the JQuery top component, usually the `$div` object enclosing this skin
    $getTopComponent: function () {
      return this.$div;
    },
    //
    // Method used to notify this skin that a specific action has changed its enabled/disabled status
    // act (AWT.Action)
    actionStatusChanged: function(act){
      // To be implemented in subclasses      
    }
  };

  // Skin extends [AWT.Container](AWT.html)
  Skin.prototype = $.extend(Object.create(AWT.Container.prototype), Skin.prototype);

  return Skin;
});
