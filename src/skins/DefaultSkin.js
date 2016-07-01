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
        .html((this.resources.mainCSS + this.resources.reportsCSS).replace(/SKINID/g, this.skinId)));

    // Add waiting panel    
    this.$waitPanel = $('<div/>')
        .css({display: 'none', 'background-color':'rgba(255, 255, 255, .60)', 'z-index': 99})
        .append($('<div/>', {class: 'waitPanel'})
        .append($(this.resources.waitImgBig))
        .append($(this.resources.waitImgSmall)));
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
#SKINID .waitPanel {position: relative; width:100%; height:100%;}\
#SKINID .waitPanel svg {position:absolute; width:60%; height:60%; top:50%; left:50%; animation-iteration-count:infinite; animation-timing-function:linear;}\
#SKINID .waitPanel #waitImgBig {animation-duration:0.8s; animation-name: rotate-right;}\
@keyframes rotate-right {from {transform:translate(-50%,-50%) rotate(0);} to {transform:translate(-50%,-50%) rotate(1turn);}}\
#SKINID .waitPanel #waitImgSmall {animation-duration:0.6s; animation-name:rotate-left;}\
@keyframes rotate-left {from {transform:translate(-50%,-50%) rotate(0);} to {transform:translate(-50%,-50%) rotate(-1turn);}}\
#SKINID .JClicCtrlCnt {margin:9px 0; display:flex; flex-direction:row; align-items:center;}\
#SKINID .JClicCountCnt {display:flex; flex-direction:column;}\
#SKINID .JClicMsgBox {height:60px; flex-grow:1; background-color:lightblue;}\
#SKINID .JClicBtn {cursor:pointer}\
#SKINID .JClicCounter {width:40px; height:20px; padding-left:20px; color:white; cursor:pointer; font-family:Roboto,Sans-serif; font-size:18px; text-align:center; background-repeat:no-repeat; background-position:left}',
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
      // SVG image for the 'previous activity' button
      // See `/misc/skin/default` for original images
      prevIcon: '<svg fill="#FFFFFF" viewBox="0 0 24 24" width="36" height="36" xmlns="http://www.w3.org/2000/svg">\
<path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>\
</svg>',
      //
      // SVG image for the 'next activity' button
      // See `/misc/skin/default` for original images
      nextIcon: '<svg fill="#FFFFFF" viewBox="0 0 24 24" width="36" height="36" xmlns="http://www.w3.org/2000/svg">\
<path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>\
</svg>',
      //
      // Animated image to be shown when loading resources
      // Thanks to Ryan Allen: http://articles.dappergentlemen.com/2015/01/13/svg-spinner/
      waitImgBig: '<svg viewBox="0 0 80 80" id="waitImgBig">\
<path fill="#3F51B5" d="M10,40c0,0,0-0.4,0-1.1c0-0.3,0-0.8,0-1.3c0-0.3,0-0.5,0-0.8c0-0.3,0.1-0.6,0.1-0.9c0.1-0.6,0.1-1.4,0.2-2.1 \
c0.2-0.8,0.3-1.6,0.5-2.5c0.2-0.9,0.6-1.8,0.8-2.8c0.3-1,0.8-1.9,1.2-3c0.5-1,1.1-2,1.7-3.1c0.7-1,1.4-2.1,2.2-3.1 \
c1.6-2.1,3.7-3.9,6-5.6c2.3-1.7,5-3,7.9-4.1c0.7-0.2,1.5-0.4,2.2-0.7c0.7-0.3,1.5-0.3,2.3-0.5c0.8-0.2,1.5-0.3,2.3-0.4l1.2-0.1 \
l0.6-0.1l0.3,0l0.1,0l0.1,0l0,0c0.1,0-0.1,0,0.1,0c1.5,0,2.9-0.1,4.5,0.2c0.8,0.1,1.6,0.1,2.4,0.3c0.8,0.2,1.5,0.3,2.3,0.5 \
c3,0.8,5.9,2,8.5,3.6c2.6,1.6,4.9,3.4,6.8,5.4c1,1,1.8,2.1,2.7,3.1c0.8,1.1,1.5,2.1,2.1,3.2c0.6,1.1,1.2,2.1,1.6,3.1 \
c0.4,1,0.9,2,1.2,3c0.3,1,0.6,1.9,0.8,2.7c0.2,0.9,0.3,1.6,0.5,2.4c0.1,0.4,0.1,0.7,0.2,1c0,0.3,0.1,0.6,0.1,0.9 \
c0.1,0.6,0.1,1,0.1,1.4C74,39.6,74,40,74,40c0.2,2.2-1.5,4.1-3.7,4.3s-4.1-1.5-4.3-3.7c0-0.1,0-0.2,0-0.3l0-0.4c0,0,0-0.3,0-0.9 \
c0-0.3,0-0.7,0-1.1c0-0.2,0-0.5,0-0.7c0-0.2-0.1-0.5-0.1-0.8c-0.1-0.6-0.1-1.2-0.2-1.9c-0.1-0.7-0.3-1.4-0.4-2.2 \
c-0.2-0.8-0.5-1.6-0.7-2.4c-0.3-0.8-0.7-1.7-1.1-2.6c-0.5-0.9-0.9-1.8-1.5-2.7c-0.6-0.9-1.2-1.8-1.9-2.7c-1.4-1.8-3.2-3.4-5.2-4.9 \
c-2-1.5-4.4-2.7-6.9-3.6c-0.6-0.2-1.3-0.4-1.9-0.6c-0.7-0.2-1.3-0.3-1.9-0.4c-1.2-0.3-2.8-0.4-4.2-0.5l-2,0c-0.7,0-1.4,0.1-2.1,0.1 \
c-0.7,0.1-1.4,0.1-2,0.3c-0.7,0.1-1.3,0.3-2,0.4c-2.6,0.7-5.2,1.7-7.5,3.1c-2.2,1.4-4.3,2.9-6,4.7c-0.9,0.8-1.6,1.8-2.4,2.7 \
c-0.7,0.9-1.3,1.9-1.9,2.8c-0.5,1-1,1.9-1.4,2.8c-0.4,0.9-0.8,1.8-1,2.6c-0.3,0.9-0.5,1.6-0.7,2.4c-0.2,0.7-0.3,1.4-0.4,2.1 \
c-0.1,0.3-0.1,0.6-0.2,0.9c0,0.3-0.1,0.6-0.1,0.8c0,0.5-0.1,0.9-0.1,1.3C10,39.6,10,40,10,40z"/>\
</svg>',
      waitImgSmall: '<svg viewBox="0 0 80 80" id="waitImgSmall">\
<path fill="#3F51B5" d="M62,40.1c0,0,0,0.2-0.1,0.7c0,0.2,0,0.5-0.1,0.8c0,0.2,0,0.3,0,0.5c0,0.2-0.1,0.4-0.1,0.7 \
c-0.1,0.5-0.2,1-0.3,1.6c-0.2,0.5-0.3,1.1-0.5,1.8c-0.2,0.6-0.5,1.3-0.7,1.9c-0.3,0.7-0.7,1.3-1,2.1c-0.4,0.7-0.9,1.4-1.4,2.1 \
c-0.5,0.7-1.1,1.4-1.7,2c-1.2,1.3-2.7,2.5-4.4,3.6c-1.7,1-3.6,1.8-5.5,2.4c-2,0.5-4,0.7-6.2,0.7c-1.9-0.1-4.1-0.4-6-1.1 \
c-1.9-0.7-3.7-1.5-5.2-2.6c-1.5-1.1-2.9-2.3-4-3.7c-0.6-0.6-1-1.4-1.5-2c-0.4-0.7-0.8-1.4-1.2-2c-0.3-0.7-0.6-1.3-0.8-2 \
c-0.2-0.6-0.4-1.2-0.6-1.8c-0.1-0.6-0.3-1.1-0.4-1.6c-0.1-0.5-0.1-1-0.2-1.4c-0.1-0.9-0.1-1.5-0.1-2c0-0.5,0-0.7,0-0.7 \
s0,0.2,0.1,0.7c0.1,0.5,0,1.1,0.2,2c0.1,0.4,0.2,0.9,0.3,1.4c0.1,0.5,0.3,1,0.5,1.6c0.2,0.6,0.4,1.1,0.7,1.8 \
c0.3,0.6,0.6,1.2,0.9,1.9c0.4,0.6,0.8,1.3,1.2,1.9c0.5,0.6,1,1.3,1.6,1.8c1.1,1.2,2.5,2.3,4,3.2c1.5,0.9,3.2,1.6,5,2.1 \
c1.8,0.5,3.6,0.6,5.6,0.6c1.8-0.1,3.7-0.4,5.4-1c1.7-0.6,3.3-1.4,4.7-2.4c1.4-1,2.6-2.1,3.6-3.3c0.5-0.6,0.9-1.2,1.3-1.8 \
c0.4-0.6,0.7-1.2,1-1.8c0.3-0.6,0.6-1.2,0.8-1.8c0.2-0.6,0.4-1.1,0.5-1.7c0.1-0.5,0.2-1,0.3-1.5c0.1-0.4,0.1-0.8,0.1-1.2 \
c0-0.2,0-0.4,0.1-0.5c0-0.2,0-0.4,0-0.5c0-0.3,0-0.6,0-0.8c0-0.5,0-0.7,0-0.7c0-1.1,0.9-2,2-2s2,0.9,2,2C62,40,62,40.1,62,40.1z"/>\
</svg>',
      //
      // SVG images for 'fullscreen' and 'fullscreen extit' actions.
      // By **Google Material design Icons**:
      // https://google.github.io/material-design-icons/
      fullScreen: '<svg fill="#FFFFFF" viewBox="0 0 24 24" width="36" height="36" xmlns="http://www.w3.org/2000/svg">\
<path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>\
</svg>',
      fullScreenExit: '<svg fill="#FFFFFF" viewBox="0 0 24 24" width="36" height="36" xmlns="http://www.w3.org/2000/svg">\
<path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/>\
</svg>',
      //
      // Close button
      closeIcon: '<svg fill="#FFFFFF" viewBox="0 0 24 24" width="36" height="36" xmlns="http://www.w3.org/2000/svg">\
<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>\
</svg>',
      //
      // Icons for counters
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
