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
  "../boxes/ActiveBox",
  "../boxes/Counter",
  "../AWT"
], function ($, Utils, ActiveBox, Counter, AWT) {

  //
  // This class manages the layout, position ans size of the visual components
  // of JClic: player window, message box, counters, buttons, status... and also
  // the appareance of the main container.
  // $div (a JQuery `<div/>` object) - The `div` to be used as a recipient for
  // this skin. When `null` or `undefined`, a new one will be created.
  var Skin = function (ps, name, $div) {
    
    // Skin extends AWT.Container
    AWT.Container.call(this);
        
    this.buttons = Utils.cloneObject(Skin.prototype.buttons);
    this.counters = Utils.cloneObject(Skin.prototype.counters);
    this.msgArea = Utils.cloneObject(Skin.prototype.msgArea);
    this.$div = $div ? $div : $('<div class="JClic"/>');
    this.$msgBoxDiv = $div.children('.JClicMsgBox').first();
    if (this.$msgBoxDiv === null || this.$msgBoxDiv.length === 0) {
      this.$msgBoxDiv = $('<div class="JClicMsgBox"/>');
      this.$div.append(this.$msgBoxDiv);
    }
    this.$msgBoxDivCanvas = $('<canvas />');
    this.$msgBoxDiv.append(this.$msgBoxDivCanvas);
    this.msgBox = new ActiveBox();
    if (ps)
      this.ps = ps;
    if (name)
      this.name = name;
    Skin.prototype.skinStack.push(this);
  };

  Skin.prototype = {
    constructor: Skin,
    //
    // The HTML div object used by this Skin
    $div: null,
    //
    // Current name of the skin and name of the XML file used to retrieve
    // the settings
    name: 'default',
    fileName: '',
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
      'about': null},
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
    //
    // An object of type [ActiveBox](ActiveBox.html) used to display the main
    // messages of each JClic [Activity](Activity.html)
    msgBox: null,
    $msgBoxDiv: null,
    $msgBoxDivCanvas: null,
    //
    // Miscellaneous boolean flags    
    waitCursorCount: 0,
    readyToPaint: false,
    //
    // Objects used as _help_ and _about_ windows
    currentHelpWindow: null,
    currentAboutWindow: null,
    //
    // Numbers and boolean flags used to display progess bars
    progressMax: 100,
    progress: 0,
    hasProgress: false,
    progressActive: false,
    progressStartTime: 0,
    //
    // The prototype stores a collection of realized __Skin__ objects:
    // Is important to access always this member as a `Skin.prototype.skinStack`
    skinStack: [],
    //
    // Clears the skin stack
    emptySkinStack: function () {
      this.prototype.skinStack.length = 0;
    },
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
        this.player.$div.detach();
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
      for (var i = 0; i < Skin.prototype.skinStack; i++) {
        sk = Skin.prototype.skinStack[i];
        if (sk.name === skinName && sk.ps === ps)
          return sk;
      }

      // TODO: Read the class of the requested skin in $xml, and
      // build the appropiate object
      sk = new Skin(ps, skinName, $div);

      if ($xml)
        sk.setproperties($xml);

      Skin.prototype.skinStack.push(sk);

      return sk;
    },
    //
    // Loads the object settings from a specific JQuery XML element 
    // To be implemented by subclasses
    setProperties: function ($xml) {
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
        // TODO: Enable/disable the wait state based on the value of `waitCursorCount`
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
    // $solution - A JQuery DOM element with the information to be shown. It can
    // also be a string or number.
    showHelp: function ($solution) {
      // TODO: Implement HelpWindow
    },
    //
    // Enables or disables a specific counter
    enableCounter: function (counter, bEnabled) {
      if (this.counters[counter])
        this.counters[counter].setEnabled(bEnabled);
    },
    // 
    // Places each component at the right position
    doLayout: function () {
      // TODO: Implement a real skin!
      // 
      // Basic layout, just for testing:

      var margin = 20;

      this.$div.css({
        position: 'relative',
        width: '100%',
        height: '600px',
        'background-color': 'salmon'
      });

      var actualSize = new AWT.Dimension(this.$div.width(), this.$div.height());

      var w = Math.max(100, actualSize.width - 2 * margin);
      var h = 60;
      var playerHeight = Math.max(100, actualSize.height - 3 * margin - 60);

      this.player.$div.css({
        position: 'absolute',
        width: w + 'px',
        height: playerHeight + 'px',
        top: margin + 'px',
        left: margin + 'px',
        'background-color': 'olive'
      });

      this.player.doLayout();

      this.msgBox.ctx = null;
      this.$msgBoxDivCanvas.remove();
      this.$msgBoxDivCanvas = null;
      
      this.$msgBoxDiv.css({
        position: 'absolute',
        width: w + 'px',
        height: h + 'px',
        top: 2 * margin + playerHeight + 'px',
        left: margin + 'px',
        'background-color': 'lightblue'
      });
      
      this.$msgBoxDivCanvas = $('<canvas width="' + w + '" height="' + h + '"/>');
      this.$msgBoxDiv.append(this.$msgBoxDivCanvas);
      this.msgBox.setBounds(new AWT.Rectangle(0, 0, w, h));
      this.msgBox.ctx = this.$msgBoxDivCanvas.get(0).getContext('2d');
      window.ctx = this.msgBox.ctx;
      this.msgBox.repaint();

    },
    //
    // Compares two Skin objects
    equals: function (skin) {
      return skin &&
          this.name === skin.name &&
          this.ps === skin.ps;
    }

  };

  // JClicPlayer extends AWT.Container
  Skin.prototype = $.extend(Object.create(AWT.Container.prototype), Skin.prototype);

  return Skin;
});
