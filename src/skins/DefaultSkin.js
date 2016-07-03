//  File    : DefaultSkin.js
//  Created : 12/05/2015  
//  By      : fbusquet  
//
//  JClic.js  
//  HTML5 player of [JClic](http://clic.xtec.cat) activities  
//  https://github.com/projectestac/jclic.js  
//  (c) 2000-2015 Catalan Educational Telematic Network (XTEC)  
//  This program is free software: you can redistribute it and/or modify it under the terms of
//  the GNU General Public License as published by the Free Software Foundation, version. This
//  program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without
//  even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
//  General Public License for more details. You should have received a copy of the GNU General
//  Public License along with this program. If not, see [http://www.gnu.org/licenses/].  

define([
  "jquery",
  "screenfull",
  "../AWT",
  "./Skin",
  "../boxes/ActiveBox",
  "./Counter",
  "../Utils"
], function ($, screenfull, AWT, Skin, ActiveBox, Counter, Utils) {

// In some cases, require.js does not return a valid value for screenfull. Check it:
  if (!screenfull)
    screenfull = window.screenfull;

  /**
   * This is the default {@link Skin} used by JClic.js
   * @exports DefaultSkin
   * @class
   * @extends Skin
   * @param {PlayStation} ps - The PlayStation (currently a {@link JClicPlayer}) used to load and
   * realize the media objects meeded tot build the Skin.
   * @param {string=} name - The skin class name
   * @param {external:jQuery=} $div - The DOM element (usually a `div`) to be used as a recipient for
   * this skin. When `null` or `undefined`, a new one will be created.  
   */
  var DefaultSkin = function (ps, name, $div) {

    // DefaultSkin extends [Skin](Skin.html)
    Skin.call(this, ps, name, $div);

    var skin = this;

    AWT.Font.loadGoogleFonts(this.resources.cssFonts);

    $('head').append($('<style type="text/css"/>')
        .html((this.resources.mainCSS + this.resources.waitAnimCSS + this.resources.reportsCSS).replace(/SKINID/g, this.skinId)));

    // Add waiting panel    
    this.$waitPanel = $('<div/>')
        .css({display: 'none', 'background-color': 'rgba(255, 255, 255, .60)', 'z-index': 99})
        .append($('<div/>', {class: 'waitPanel'})
            .append($('<div/>', {class: 'animImgBox'})
                .append($(this.resources.waitImgBig), $(this.resources.waitImgSmall))));
    this.$playerCnt.append(this.$waitPanel);

    // Create the main container for buttons, counters and message box
    this.$ctrlCnt = $('<div/>', {class: 'JClicCtrlCnt'});
    this.$div.append(this.$ctrlCnt);

    // Add `prev` button
    this.buttons.prev = $(this.resources.prevIcon).on('click',
        function (evt) {
          if (skin.ps)
            skin.ps.actions.prev.processEvent(evt);
        });
    this.$ctrlCnt.append($('<div/>', {class: 'JClicBtn'}).append(this.buttons.prev));

    // Add message box
    this.$msgBoxDiv = $('<div/>', {class: 'JClicMsgBox'});
    this.msgBox = new ActiveBox();
    var thisMsgBox = this.msgBox;
    this.$msgBoxDiv.on('click', function () {
      thisMsgBox.playMedia(ps);
    });
    this.$ctrlCnt.append(this.$msgBoxDiv);

    // Add `next` button
    this.buttons.next = $(this.resources.nextIcon).on('click',
        function (evt) {
          if (skin.ps)
            skin.ps.actions.next.processEvent(evt);
        });
    this.$ctrlCnt.append($('<div/>', {class: 'JClicBtn'}).append(this.buttons.next));

    // Add counters    
    if (false !== this.ps.options.counters) {
      // Create counters
      var $countCnt = $('<div/>', {class: 'JClicCountCnt'});
      $.each(Skin.prototype.counters, function (name) {
        skin.counters[name] = new Counter(name, $('<div/>', {class: 'JClicCounter', title: ps.getMsg(name)})
            .css({'background-image': 'url(' + Utils.svgToURI(skin.resources[name]) + ')'}).html('000')
            .on('click', function (evt) {
              if (skin.ps)
                skin.ps.actions.reports.processEvent(evt);
            }).appendTo($countCnt));
      });
      this.$ctrlCnt.append($countCnt);
    }

    // Add `full screen` button
    if (screenfull && screenfull.enabled) {
      this.buttons.fullscreen = $('<img/>', {src: Utils.svgToURI(this.resources.fullScreen)}).on('click',
          function () {
            skin.setScreenFull(null);
          });
      this.$ctrlCnt.append($('<div/>', {class: 'JClicBtn'}).append(this.buttons.fullscreen));
    }

    // Add `close` button
    if (typeof this.ps.options.closeFn === 'function') {
      var closeFn = this.ps.options.closeFn;
      this.buttons.close = $(this.resources.closeIcon).on('click',
          function () {
            closeFn();
          });
      this.$ctrlCnt.append($('<div/>', {class: 'JClicBtn'}).append(this.buttons.close));
    }
  };

  DefaultSkin.prototype = {
    constructor: DefaultSkin,
    /**
     * Unique ID of this skin
     * @type {string}
     */
    skinId: 'JC' + Math.round((100000 + Math.random() * 100000)),
    /**
     * The HTML div where buttons, counters and message box are placed 
     * @type {external:jQuery} */
    $ctrlCnt: null,
    /**
     * The box used to display the main messages of JClic activities
     * @type {ActiveBox} */
    msgBox: null,
    /**
     * The `div` DOM object where `msgBox` is located
     * @type {external:jQuery} */
    $msgBoxDiv: null,
    /*
     * An HTML `canvas` object created in `$msgBoxDiv`
     * @type {external:jQuery} */
    $msgBoxDivCanvas: null,
    //
    // Background, margin and height of the messageBox
    /**
     * Background color used to fill the skin base
     * @type {string} */
    background: '#3F51B5',
    /**
     * Space (pixels) between the components of this {@link Skin}
     * @type {number} */
    margin: 18,
    /**
     * Height of {@link DefaultSkin#msgBox}
     * @type {number} */
    msgBoxHeight: 60,
    /**
     * Width of counters, in pixels
     * @type {number} */
    countersWidth: 60,
    /**
     * Height of counters, in pixels
     * @type {number} */
    countersHeight: 20,
    /**
     * 
     * Updates the graphic contents of this skin.<br>
     * This method should be called from {@link Skin#update}
     * @param {AWT.Rectangle} dirtyRegion - Specifies the area to be updated. When `null`, it's the
     * whole panel.
     */
    updateContent: function (dirtyRegion) {
      if (this.$msgBoxDivCanvas) {
        var ctx = this.$msgBoxDivCanvas.get(0).getContext('2d');
        ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
        this.msgBox.update(ctx, dirtyRegion);
      }
      return Skin.prototype.updateContent.call(this);
    },
    /**
     * 
     * Main method used to build the content of the skin. Resizes and places internal objects.
     */
    doLayout: function () {

      // Set the appropiate fullScreen icon
      if (this.buttons.fullscreen)
        this.buttons.fullscreen.get(0).src = Utils.svgToURI(this.resources[
            screenfull.isFullscreen ? 'fullScreenExit' : 'fullScreen']);

      var autoFit = this.ps.options.autoFit | (screenfull && screenfull.enabled && screenfull.isFullscreen);
      var mainWidth = autoFit ? $(window).width() : this.ps.options.width;
      var mainHeight = autoFit ? $(window).height() : this.ps.options.height;
      this.$div.css({
        width: (Math.max(this.ps.options.minWidth, Math.min(this.ps.options.maxWidth, mainWidth)) - this.margin) + 'px',
        height: (Math.max(this.ps.options.minHeight, Math.min(this.ps.options.maxHeight, mainHeight)) - this.margin) + 'px'
      });

      this.player.doLayout();

      this.msgBox.ctx = null;
      if (this.$msgBoxDivCanvas) {
        this.$msgBoxDivCanvas.remove();
        this.$msgBoxDivCanvas = null;
      }
      var msgWidth = this.$msgBoxDiv.width(),
          msgHeight = this.$msgBoxDiv.height();
      this.$msgBoxDivCanvas = $('<canvas width="' + msgWidth + '" height="' + msgHeight + '"/>');
      this.$msgBoxDiv.append(this.$msgBoxDivCanvas);
      this.msgBox.setBounds(new AWT.Rectangle(0, 0, msgWidth, msgHeight));
      this.updateContent();
    },
    /**
     * 
     * Gets the {@link ActiveBox} used to display the main messages of activities
     * @returns {ActiveBox}
     */
    getMsgBox: function () {
      return this.msgBox;
    },
    /**
     * 
     * Method used to notify this skin that a specific action has changed its enabled/disabled status
     * @param {AWT.Action} act - The action originating the change event
     */
    actionStatusChanged: function (act) {
      switch (act.name) {
        case 'next':
          this.setEnabled(this.buttons.next, act.enabled);
          break;
        case 'prev':
          this.setEnabled(this.buttons.prev, act.enabled);
          break;
        default:
          break;
      }
    },
    /**
     * 
     * Enables or disables an object changing its opacity
     * @param {external:jQuery} $object - A JQuery DOM element
     * @param {boolean} enabled
     */
    setEnabled: function ($object, enabled) {
      $object.css('opacity', enabled ? 1.0 : 0.3);
    },
    /**
     * Buttons and other graphical resources used by this skin.
     * @type {object} */
    resources: {
      //
      // Styles used in this skin
      mainCSS: '\
#SKINID {background-color:#3F51B5; padding:9px; overflow:hidden; display:flex; flex-direction:column;}\
#SKINID .JClicPlayerCnt {background-color:lightblue; margin:9px; flex-grow:1; position:relative;}\
#SKINID .JClicPlayerCnt > div {position:absolute; width:100%; height:100%;}\
#SKINID .JClicCtrlCnt {margin:9px 0; display:flex; flex-direction:row; align-items:center;}\
#SKINID .JClicCountCnt {display:flex; flex-direction:column;}\
#SKINID .JClicMsgBox {height:60px; flex-grow:1; background-color:lightblue;}\
#SKINID .JClicBtn {cursor:pointer}\
#SKINID .JClicCounter {width:40px; height:20px; padding-left:20px; color:white; cursor:pointer; font-family:Roboto,Sans-serif; font-size:18px; text-align:center; background-repeat:no-repeat; background-position:left}',
      waitAnimCSS: '\
#SKINID .waitPanel {display:flex; width:100%; height:100%; justify-content:center; align-items:center;}\
#SKINID .animImgBox {position:relative; width:300px; height:300px; max-width:80%; max-height:80%;}\
#SKINID .animImgBox svg {position:absolute; width:100%; height:100%; animation-iteration-count:infinite; animation-timing-function:linear;}\
#SKINID #waitImgBig {animation-duration:0.8s; animation-name:rotate-right;}\
@keyframes rotate-right {from {transform:rotate(0);} to {transform:rotate(1turn);}}\
#SKINID #waitImgSmall {animation-duration:0.6s; animation-name:rotate-left;}\
@keyframes rotate-left {from {transform:rotate(0);} to {transform:rotate(-1turn);}}',
      reportsCSS: '\
#SKINID .dlgDiv {background-color:#efefef; color:#757575; font-family:Roboto,sans-serif; font-size:10pt; line-height:normal;}\
#SKINID .dlgDiv a,a:visited,a:active,a:hover {text-decoration:none; color:inherit;}\
#SKINID .dlgMainPanel {padding:1em 2em; max-height:calc(100vh - 8em); max-width:calc(100vw - 2em); min-width:20em; overflow:auto;}\
#SKINID .dlgMainPanel .headTitle {font-size:2.5em; font-weight:bold; margin:auto;}\
#SKINID .dlgMainPanel .subTitle {font-size:1.4em; font-weight:bold; margin-bottom:0.5em;}\
#SKINID .dlgMainPanel p {font-size:1.1em; margin-bottom:0.5em;}\
#SKINID .dlgMainPanel table {table-layout:fixed; width:40em; margin:0.5em 0 1.7em 0; border-collapse:collapse;}\
#SKINID .dlgMainPanel select {min-width:20em; font-size:1.2em; font-family:Roboto,sans-serif; color:#757575;}\
#SKINID .dlgMainPanel input {margin-left:1em; font-size:1.2em; font-family:Roboto,sans-serif; border-color:lightgray;}\
#SKINID .infoHead {padding:1em 0em 0.5em;}\
#SKINID .JCGlobalResults td {padding:0.4em; border-bottom:1px solid #b6b6b6;}\
#SKINID .JCGlobalResults td:first-child {font-weight:600; width:11em;}\
#SKINID .JCDetailed td,th {border-bottom:1px solid #b6b6b6; padding:0.3em 0.4em; vertical-align:top; text-align:center; overflow:hidden; text-overflow:ellipsis;}\
#SKINID .JCDetailed thead {font-weight:600;}\
#SKINID .JCDetailed th:first-child {width:8em;}\
#SKINID .JCDetailed th:nth-last-child(4) {width:3em;}\
#SKINID .JCDetailed th:nth-last-child(-n+3) {width:4.1em; text-align:right;}\
#SKINID .JCDetailed td:nth-last-child(-n+3) {text-align:right;}\
#SKINID .JCDetailed .ok {color:#4bae4f; font-weight:600;}\
#SKINID .JCDetailed .no {color:#f34235; font-weight:600;}\
#SKINID .JCDetailed tr:last-child {font-weight:bold;}\
#SKINID .JCDetailed .incomplete {font-style:italic;}\
#SKINID .dlgBottomPanel {height:3.5em; background-color:white; padding:0.5em; font-weight:bold; text-align:right; border-top:1px solid #eee; position:relative;}\
#SKINID .dlgBottomPanel .smallPopup {background-color:#222; color:#ddd; padding:0.5em; font-size:0.9em; position:absolute; right:6em; top:1em;}\
#SKINID .dlgBottomPanel a {display:inline-block; padding:10px; cursor:pointer; line-height:0;}\
#SKINID .dlgBottomPanel a:hover {background-color:#eee; border-radius:80px;}\
#SKINID .dlgBottomPanel a:active {background-color:#b3e5fc;}',
      //
      // Fonts used in this skin
      cssFonts: ['Roboto'],
      //
      // Animated image displayed while loading resources
      // Based on Ryan Allen's [svg-spinner](http://articles.dappergentlemen.com/2015/01/13/svg-spinner/)
      waitImgBig: '<svg id="waitImgBig" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">\
<path fill="#3F51B5" d="m 65.99,40.19 c -0.42,5.33 7.80,4.94 8.11,0.20 C 74.50,34.37 66.35,8.59 42.92,\
7.98 15.90,7.29 9.96,29.50 9.94,39.41 15.33,-1.66 68.61,7.048 65.99,40.19 Z" />\
</svg>',
      waitImgSmall: '<svg id="waitImgSmall" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">\
<path fill="#3F51B5"d="m 57.00,39.43 c -0.28,-3.53 5.16,-3.27 5.37,-0.13 0.26,3.99 -5.13,21.04 -20.63,\
21.44 C 23.85,61.19 19.93,46.50 19.92,39.94 23.48,67.11 58.73,61.35 57.00,39.43 Z"/>\
</svg>',
      //
      // SVG images for action buttons
      // Based on [Google Material design Icons](https://google.github.io/material-design-icons/)
      //
      // Icon for 'previous activity' button
      prevIcon: '<svg fill="#FFFFFF" viewBox="0 0 24 24" width="36" height="36" xmlns="http://www.w3.org/2000/svg">\
<path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>\
</svg>',
      //
      // Icon for 'next activity' button
      nextIcon: '<svg fill="#FFFFFF" viewBox="0 0 24 24" width="36" height="36" xmlns="http://www.w3.org/2000/svg">\
<path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>\
</svg>',
      //
      // Full screen on and off:
      fullScreen: '<svg fill="#FFFFFF" viewBox="0 0 24 24" width="36" height="36" xmlns="http://www.w3.org/2000/svg">\
<path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>\
</svg>',
      fullScreenExit: '<svg fill="#FFFFFF" viewBox="0 0 24 24" width="36" height="36" xmlns="http://www.w3.org/2000/svg">\
<path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/>\
</svg>',
      //
      // Close button:
      closeIcon: '<svg fill="#FFFFFF" viewBox="0 0 24 24" width="36" height="36" xmlns="http://www.w3.org/2000/svg">\
<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>\
</svg>',
      //
      // Counters:
      time: '<svg fill="#FFFFFF" viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">\
<path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>\
<path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>\
</svg>',
      score: '<svg fill="#FFFFFF" viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">\
<path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>\
</svg>',
      actions: '<svg fill="#FFFFFF" viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">\
<path d="M13.49 5.48c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-3.6 13.9l1-4.4 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1l-5.2 2.2v4.7h2v-3.4l1.8-.7-1.6 8.1-4.9-1-.4 2 7 1.4z"/>\
</svg>'
    }
  };
  // Inherit Skin resources prior to merge prototypes
  var resources = $.extend(Object.create(Skin.prototype.resources), DefaultSkin.prototype.resources);
  // DefaultSkin extends [Skin](Skin.html)
  DefaultSkin.prototype = $.extend(Object.create(Skin.prototype), DefaultSkin.prototype);
  // Set resources
  DefaultSkin.prototype.resources = resources;

  // Register this class in the list of available skins
  Skin.CLASSES['DefaultSkin'] = DefaultSkin;
  return DefaultSkin;
});
