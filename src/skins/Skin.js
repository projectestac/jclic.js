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
  "screenfull",
  "clipboard-js",
  "../Utils",
  "../AWT"
], function ($, screenfull, clipboard, Utils, AWT) {

  // In some cases, require.js does not return a valid value for screenfull. Check it:
  if (!screenfull)
    screenfull = window.screenfull;

  /**
   * This abstract class manages the layout, position ans size of the visual components of JClic:
   * player window, message box, counters, buttons, status... and also the appareance of the main
   * container.<br>
   * The basic implementation of Skin is {@link DefaultSkin}.
   * @exports Skin
   * @class
   * @abstract
   * @extends AWT.Container
   * @param {PlayStation} ps - The PlayStation (currently a {@link JClicPlayer}) used to load and
   * realize the media objects meeded tot build the Skin.
   * @param {string=} name - The skin name
   */
  var Skin = function (ps, name) {

    // Skin extends [AWT.Container](AWT.html)
    AWT.Container.call(this);

    if (Skin.registeredStylesheets.indexOf(this.skinId) < 0) {
      $('head').append($('<style type="text/css"/>')
          .html(this._getStyleSheets().replace(/SKINID/g, this.skinId)));
      Skin.registeredStylesheets.push(this.skinId);
    }

    var skin = this;

    this.$div = $('<div/>', {class: this.skinId});
    this.$playerCnt = $('<div/>', {class: 'JClicPlayerCnt'});

    this.buttons = Utils.cloneObject(Skin.prototype.buttons);
    this.counters = Utils.cloneObject(Skin.prototype.counters);
    this.msgArea = Utils.cloneObject(Skin.prototype.msgArea);
    if (ps)
      this.ps = ps;
    if (name)
      this.name = name;

    // Create dialog overlay and panel
    this.$dlgOverlay = $('<div/>', {class: 'dlgOverlay'}).css({
      'z-index': 98,
      position: 'fixed',
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      display: 'none',
      'background-color': 'rgba(30,30,30,0.7)'
    }).on('click', function () {
      if (!skin._isModalDlg)
        // Non-modal dialogs are closed on click outside the main area
        skin._closeDlg(true);
      return false;
    });

    var $dlgDiv = $('<div/>', {class: 'dlgDiv'}).css({
      display: 'inline-block',
      position: 'relative',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    }).on('click', function () {
      // Clicks not passed to parent
      return false;
    });

    this.$dlgMainPanel = $('<div/>', {class: 'dlgMainPanel'});
    this.$dlgBottomPanel = $('<div/>', {class: 'dlgBottomPanel'});

    // Basic dialog structure:
    this.$div.append(
        this.$playerCnt,
        this.$dlgOverlay.append(
            $dlgDiv.append(
                this.$dlgMainPanel,
                this.$dlgBottomPanel)));

    this.$infoHead = $('<div/>', {class: 'infoHead'})
        .append($('<div/>', {class: 'headTitle'})
            .append($(this.appLogo).css({width: '1.5em', height: '1.5em', 'vertical-align': 'bottom'}))
            .append($('<span/>').html('JClic.js')))
        .append($('<p/>').css({'margin-top': 0, 'margin-left': '3.5em'})
            .append($('<a/>', {href: 'http://clic.xtec.cat/repo/index.html?page=info'}).html('http://clic.xtec.cat'))
            .append($('<br>'))
            .append($('<span/>').html(ps.getMsg('Version') + ' ' + this.ps.JClicVersion)));

    this.$reportsPanel = $('<div/>', {class: 'reportsPanel'});

    this.$copyBtn = $('<a/>', {title: ps.getMsg('Copy data to clipboard')})
        .append($(this.copyIcon).css({width: '26px', height: '26px'}))
        .on('click', function () {
          clipboard.copy({
            'text/plain': '===> ' + ps.getMsg('The data has been copied in HTML format. Please paste them into a spreadsheet or in a rich text editor') + ' <===',
            'text/html': skin.$reportsPanel.html()
          });
          $(this).parent().append(
              $('<div/>', {class: 'smallPopup'})
              .html(ps.getMsg('The data has been copied to clipboard'))
              .fadeIn()
              .delay(3000)
              .fadeOut(function () {
                $(this).remove();
              }));
        });

    this.$closeDlgBtn = $('<a/>', {title: ps.getMsg('Close')})
        .append($(this.closeDialogIcon).css({width: '26px', height: '26px'}))
        .on('click', function () {
          skin._closeDlg(true);
        });

    this.$okDlgBtn = $('<a/>', {title: ps.getMsg('OK')})
        .append($(this.okDialogIcon).css({width: '26px', height: '26px'}))
        .on('click', function () {
          skin._closeDlg(true);
        });

    this.$cancelDlgBtn = $('<a/>', {title: ps.getMsg('Cancel')})
        .append($(this.closeDialogIcon).css({width: '26px', height: '26px'}))
        .on('click', function () {
          skin._closeDlg(false);
        });

    // Registers this Skin in the list of realized Skin objects
    Skin.skinStack.push(this);
  };

  /**
   * Collection of realized __Skin__ objects.<br>
   * @type {Skin[]} */
  Skin.skinStack = [];
  /**
   * Collection of skin stylesheets already registered on the current document
   * @type {string[]} */
  Skin.registeredStylesheets = [];

  /**
   * List of classes derived from Skin. It should be filled by real skin classes at declaration time.
   * @type {object} */
  Skin.CLASSES = {};

  Skin.prototype = {
    constructor: Skin,
    /**
     * Class name of this skin. It will be used as a base selector in the definition of all CSS styles.
     * @type {string}
     */
    skinId: 'JClicBasicSkin',
    /**
     * The HTML div object used by this Skin
     * @type {external:jQuery} */
    $div: null,
    /**
     * The HTML div where JClic Player will be placed
     * @type {external:jQuery} */
    $playerCnt: null,
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
     * Main panel used to display modal and non-modal dialogs
     * @type {external:jQuery} */
    $dlgOverlay: null,
    /**
     * Main panel of dialogs, where relevant information must be placed
     * @type {external:jQuery} */
    $dlgMainPanel: null,
    /**
     * Bottom panel of dialogs, used for action buttons
     * @type {external:jQuery} */
    $dlgBottomPanel: null,
    /**
     * Element usually used as header in dialogs, with JClic logo, name and version
     * @type {external:jQuery} */
    $infoHead: null,
    /**
     * Iconic button used to copy content to clipboard
     * @type {external:jQuery} */
    $copyBtn: null,
    /**
     * Iconic button used to close the dialog
     * @type {external:jQuery} */
    $closeDlgBtn: null,
    /**
     * OK dialog button
     * @type {external:jQuery} */
    $okDlgBtn: null,
    /**
     * Cancel dialog button
     * @type {external:jQuery} */
    $cancelDlgBtn: null,
    /**
     * Value to be returned by the dialog promise when the presented task is fulfilled
     * @type {Object} */
    _dlgOkValue: null,
    /**
     * Value to be returned in user-cancelled dialogs
     * @type {Object} */
    _dlgCancelValue: null,
    /**
     * Flag indicating if the current dialog is modal or not
     * @type {boolean} */
    _isModalDlg: false,
    /**
     * Div inside @link{$dlgOverlay} where JClicPlayer will place the information to be shown
     * @type {external:jQuery} */
    $reportsPanel: null,
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
      'fullscreen': null,
      'close': null
    },
    /**
     * The collection of counters
     * @type {object} */
    counters: {
      'actions': null,
      'score': null,
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
     * Returns the CSS styles used by this skin. This methos should be called only from
     * `Skin` constructor, and overrided by subclasses if needed.
     * @returns {string}
     */
    _getStyleSheets: function () {
      return this.basicCSS + this.reportsCSS;
    },
    /**
     * 
     * Attaches a {@link JClicPlayer} object to this Skin
     * @param {JClicPlayer} player
     */
    attach: function (player) {
      this.detach();
      if (player !== null && player.skin !== null)
        player.skin.detach();
      this.player = player;
      this.$playerCnt.prepend(player.$div);
      player.$topDiv.append(this.$div);
    },
    /**
     * 
     * Detaches the `player` element from this Skin
     */
    detach: function () {
      if (this.player !== null) {
        this.player.$div.remove();
        this.$div.detach();
        this.player = null;
      }
    },
    /**
     * 
     * Gets the specified Skin from skinStack, or creates a new one if not found.<br>
     * This function should be used only through `Skin.prototype.getSkin`
     * @param {string} skinName - The name of the searched skin
     * @param {PlayStation} ps - The PlayStation (usually a {@link JClicPlayer}) used to build the new skin.
     * @param {external:jQuery} $xml - An XML element with the properties of the new skin
     * @returns {Skin}
     */
    getSkin: function (skinName, ps, $xml) {
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
        sk = new cl(ps, skinName);
        if ($xml)
          sk.setProperties($xml);
      } else
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
     * 
     * Resets all counters
     * @param {boolean} bEnabled - Leave it enabled/disabled
     */
    resetAllCounters: function (bEnabled) {
      $.each(this.counters, function (name, counter) {
        if (counter !== null) {
          counter.value = 0;
          counter.countDown = 0;
          counter.enabled = bEnabled;
          counter.refreshDisplay();
        }
      });
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
            display: this.waitCursorCount > 0 ? 'initial' : 'none'
          });
      } else {
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
     * Shows a "dialog" panel, useful for displaying information or prompt something to users
     * @param {boolean} modal - When `true`, the dialog should be closed by any click outside the main panel
     * @param {object} options - This object should have two components: `main` and `bottom`, both
     * containing a jQuery HTML element (or array of elements) to be placed on the main and bottom panels
     * of the dialog.
     * @returns {external:Promise} - A {@link external:Promise} that will be fulfilled when the dialog is closed.
     */
    showDlg: function (modal, options) {
      var skin = this;
      return new Promise(function (resolve, reject) {
        skin._dlgOkValue = 'ok';
        skin._dlgCancelValue = 'cancelled';
        skin._isModalDlg = modal;

        skin.$dlgMainPanel.children().detach();
        skin.$dlgBottomPanel.children().detach();
        if (options.main)
          skin.$dlgMainPanel.append(options.main);
        if (options.bottom)
          skin.$dlgBottomPanel.append(options.bottom);

        skin._closeDlg = function (resolved) {
          if (resolved && resolve)
            resolve(skin._dlgOkValue);
          else if (!resolved && reject)
            reject(skin._dlgCancelValue);
          skin.$dlgOverlay.css({display: 'none'});
          skin._closeDlg = Skin.prototype._closeDlg;
        };
        skin.$dlgOverlay.css({display: 'initial'});
      });
    },
    /**
     * Called when the dialog must be closed, usually only by Skin members.
     * This method is re-defined on each call to `showDlg`, so the `resolve` and `reject`
     * functions can be safelly called.
     */
    _closeDlg: function () {},
    /**
     * 
     * Displays a dialog with a report of the current results achieved by the user.
     * @param {Reporter} reporter - The reporter system currently in use
     * @returns {external:Promise} - The {@link external:Promise} returned by {@link Skin.showDlg}.
     */
    showReports: function (reporter) {
      this.$reportsPanel.html(reporter ? reporter.$print(this.ps) : '');
      return this.showDlg(false, {
        main: [this.$infoHead, this.$reportsPanel],
        bottom: [this.$copyBtn, this.$closeDlgBtn]
      });
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
     * adjusts the skin to the dimension of its `$div` container
     * @returns {AWT.Dimension} the new dimension of the skin
     */
    fit: function () {
      this.ps.options.width = this.$div.width();
      this.ps.options.height = this.$div.height();
      this.doLayout();
      return new AWT.Dimension(this.$div.width(), this.$div.height());
    },
    /**
     * 
     * Sets or unsets the player in screenfull mode, when allowed, using the 
     * [screenfull.js](https://github.com/sindresorhus/screenfull.js) library.
     * @param {boolean} status - Whether to set or unset the player in fullscreen mode. When `null`
     * or `undefined`, the status toggles between fullscreen and windowed modes.
     * @returns {boolean} `true` if the request was successfull, `false` otherwise.
     */
    setScreenFull: function (status) {
      if (screenfull && screenfull.enabled && (
          status === true && !screenfull.isFullscreen ||
          status === false && !screenfull.isFullScreen ||
          status !== true && status !== false)) {
        screenfull.toggle(this.$div[0]);
      }
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
    },
    // 
    // Buttons and other graphical resources used by this skin.
    //
    // Styles:
    basicCSS: '\
.SKINID {background-color:#3F51B5; padding:9px; overflow:hidden; display:flex; flex-direction:column;}\
.SKINID .JClicPlayerCnt {background-color:lightblue; margin:9px; flex-grow:1; position:relative;}\
.SKINID .JClicPlayerCnt > div {position:absolute; width:100%; height:100%;}\
.SKINID .unselectableText {-webkit-user-select:none; -moz-user-select:none; -ms-user-select:none; user-select: none;}',
    reportsCSS: '\
.SKINID .dlgDiv {background-color:#efefef; color:#757575; font-family:Roboto,sans-serif; font-size:10pt; line-height:normal;}\
.SKINID .dlgDiv a,a:visited,a:active,a:hover {text-decoration:none; color:inherit;}\
.SKINID .dlgMainPanel {padding:1em 2em; max-height:calc(100vh - 8em); max-width:calc(100vw - 2em); min-width:20em; overflow:auto;}\
.SKINID .dlgMainPanel .headTitle {font-size:2.5em; font-weight:bold; margin:auto;}\
.SKINID .dlgMainPanel .subTitle {font-size:1.4em; font-weight:bold; margin-bottom:0.5em;}\
.SKINID .dlgMainPanel p {font-size:1.1em; margin-bottom:0.5em;}\
.SKINID .dlgMainPanel table {table-layout:fixed; width:40em; margin:0.5em 0 1.7em 0; border-collapse:collapse;}\
.SKINID .dlgMainPanel select {min-width:20em; font-size:1.2em; font-family:Roboto,sans-serif; color:#757575;}\
.SKINID .dlgMainPanel input {margin-left:1em; font-size:1.2em; font-family:Roboto,sans-serif; border-color:lightgray;}\
.SKINID .infoHead {padding:1em 0em 0.5em;}\
.SKINID .JCGlobalResults td {padding:0.4em; border-bottom:1px solid #b6b6b6;}\
.SKINID .JCGlobalResults td:first-child {font-weight:600; width:11em;}\
.SKINID .JCDetailed td,th {border-bottom:1px solid #b6b6b6; padding:0.3em 0.4em; vertical-align:top; text-align:center; overflow:hidden; text-overflow:ellipsis;}\
.SKINID .JCDetailed thead {font-weight:600;}\
.SKINID .JCDetailed th:first-child {width:8em;}\
.SKINID .JCDetailed th:nth-last-child(4) {width:3em;}\
.SKINID .JCDetailed th:nth-last-child(-n+3) {width:4.1em; text-align:right;}\
.SKINID .JCDetailed td:nth-last-child(-n+3) {text-align:right;}\
.SKINID .JCDetailed .ok {color:#4bae4f; font-weight:600;}\
.SKINID .JCDetailed .no {color:#f34235; font-weight:600;}\
.SKINID .JCDetailed tr:last-child {font-weight:bold;}\
.SKINID .JCDetailed .incomplete {font-style:italic;}\
.SKINID .dlgBottomPanel {height:3.5em; background-color:white; padding:0.5em; font-weight:bold; text-align:right; border-top:1px solid #eee; position:relative;}\
.SKINID .dlgBottomPanel .smallPopup {background-color:#222; color:#ddd; padding:0.5em; font-size:0.9em; position:absolute; right:6em; top:1em;}\
.SKINID .dlgBottomPanel a {display:inline-block; padding:10px; cursor:pointer; line-height:0;}\
.SKINID .dlgBottomPanel a:hover {background-color:#eee; border-radius:80px;}\
.SKINID .dlgBottomPanel a:active {background-color:#b3e5fc;}',
    //
    // Icons used in buttons:
    //
    // Close dialog button
    closeDialogIcon: '<svg fill="#757575" viewBox="0 0 24 24" width="36" height="36" xmlns="http://www.w3.org/2000/svg">\
<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>\
</svg>',
    //
    //OK dialog button
    okDialogIcon: '<svg fill="#757575" viewBox="0 0 24 24" width="36" height="36" xmlns="http://www.w3.org/2000/svg">\
<path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>\
</svg>',
    //
    // Copy text button
    copyIcon: '<svg fill="#757575" viewBox="0 0 24 24" width="36" height="36" xmlns="http://www.w3.org/2000/svg">\
<path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>\
</svg>',
    //
    // JClic logo
    appLogo: '<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><g transform="matrix(.02081 0 0-.02081 5 62.33)">\
<path d="m1263 1297l270 1003 996-267-267-990c-427-1583-2420-1046-1999 519 3 11 999-266 999-266z" fill="none" stroke="#9d6329" stroke-linejoin="round" stroke-linecap="round" stroke-width="180" stroke-miterlimit="3.864"/>\
<path d="m1263 1297l270 1003 996-267-267-990c-427-1583-2420-1046-1998 519 3 11 999-266 999-266" fill="#f89c0e"/>\
<path d="m357 2850l1000-268-267-992-1000 266 267 994z" fill="none" stroke="#86882b" stroke-linejoin="round" stroke-linecap="round" stroke-width="180" stroke-miterlimit="3.864"/>\n\
<path d="m357 2850l1000-268-267-992-1000 266 267 994" fill="#d9e70c"/>\n\
</g></svg>'
  };

  // Skin extends [AWT.Container](AWT.html)
  Skin.prototype = $.extend(Object.create(AWT.Container.prototype), Skin.prototype);

  return Skin;
});
