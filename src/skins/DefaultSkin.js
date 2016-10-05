/**
 *  File    : skins/DefaultSkin.js
 *  Created : 12/05/2015
 *  By      : Francesc Busquets <francesc@gmail.com>
 *
 *  JClic.js
 *  An HTML5 player of JClic activities
 *  https://projectestac.github.io/jclic.js
 *
 *  @source https://github.com/projectestac/jclic.js
 *
 *  @license EUPL-1.1
 *  @licstart
 *  (c) 2000-2016 Catalan Educational Telematic Network (XTEC)
 *
 *  Licensed under the EUPL, Version 1.1 or -as soon they will be approved by
 *  the European Commission- subsequent versions of the EUPL (the "Licence");
 *  You may not use this work except in compliance with the Licence.
 *
 *  You may obtain a copy of the Licence at:
 *  https://joinup.ec.europa.eu/software/page/eupl
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the Licence is distributed on an "AS IS" basis, WITHOUT
 *  WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 *  Licence for the specific language governing permissions and limitations
 *  under the Licence.
 *  @licend
 */

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
   * realize the media objects needed tot build the Skin.
   * @param {string=} name - The skin class name
   * @param {options=} options - Optional parameter with additional options, used by subclasses
   * this skin. When `null` or `undefined`, a new one will be created.
   */
  var DefaultSkin = function (ps, name, options) {

    options = options || {};

    // DefaultSkin extends [Skin](Skin.html)
    Skin.call(this, ps, name);

    var skin = this,
        msg = '';

    AWT.Font.loadGoogleFonts(this.cssFonts);

    // Add waiting panel
    this.$waitPanel = $('<div/>')
        .css({display: 'none', 'background-color': 'rgba(255, 255, 255, .60)', 'z-index': 99})
        .append($('<div/>', {class: 'waitPanel'})
            .append($('<div/>', {class: 'animImgBox'})
                .append($(this.waitImgBig), $(this.waitImgSmall))));
    this.$playerCnt.append(this.$waitPanel);

    // Create the main container for buttons, counters and message box
    this.$ctrlCnt = $('<div/>', {class: 'JClicCtrlCnt unselectableText', role: 'navigation'});
    this.$div.append(this.$ctrlCnt);

    // Add `prev` button
    msg = ps.getMsg('Previous activity');
    this.buttons.prev = $('<button/>', {class: 'JClicBtn', title: msg, 'aria-label': msg})
        .append($(Utils.getSvg(this.prevIcon, this.iconWidth, this.iconHeight, this.iconFill)))
        .on('click', function (evt) {
          if (skin.ps)
            skin.ps.actions.prev.processEvent(evt);
        });
    this.$ctrlCnt.append(this.buttons.prev);

    // Add message box
    this.$msgBoxDiv = $('<div/>', {class: 'JClicMsgBox'});
    this.msgBox = new ActiveBox();
    this.msgBox.role = 'message';
    var thisMsgBox = this.msgBox;
    this.$msgBoxDiv.on('click', function (ev) {
      thisMsgBox.playMedia(ps);
      return false;
    });
    this.$ctrlCnt.append(this.$msgBoxDiv);

    // Add `next` button
    msg = ps.getMsg('Next activity');
    this.buttons.next = $('<button/>', {class: 'JClicBtn', title: msg, 'aria-label': msg})
        .append($(Utils.getSvg(this.nextIcon, this.iconWidth, this.iconHeight, this.iconFill)))
        .on('click', function (evt) {
          if (skin.ps)
            skin.ps.actions.next.processEvent(evt);
        });
    this.$ctrlCnt.append(this.buttons.next);

    // Add counters
    if (false !== this.ps.options.counters && false !== options.counters) {
      // Create counters
      msg = ps.getMsg('Reports');
      var $countCnt = $('<button/>', {class: 'JClicCountCnt', 'aria-label': msg})
          .on('click', function (evt) {
            if (skin.ps)
              skin.ps.actions.reports.processEvent(evt);
          });
      $.each(Skin.prototype.counters, function (name) {
        msg = ps.getMsg(name);
        skin.counters[name] = new Counter(name, $('<div/>', {class: 'JClicCounter', title: msg, 'aria-label': msg})
            .css({
              'background-image': 'url(' + Utils.svgToURI(skin[name + 'Icon'], skin.counterIconWidth, skin.counterIconHeight, skin.counterIconFill) + ')',
              color: skin.counterIconFill
            })
            .html('000')
            .appendTo($countCnt));
      });
      this.$ctrlCnt.append($countCnt);
    }

    // Add info button
    if (true === this.ps.options.info || true === options.info) {
      msg = ps.getMsg('Information');
      this.buttons.info = $('<button/>', {class: 'JClicBtn', title: msg, 'aria-label': msg})
          .append($(Utils.getSvg(this.infoIcon, this.iconWidth, this.iconHeight, this.iconFill)))
          .on('click', function (evt) {
            if (skin.ps)
              skin.ps.actions.info.processEvent(evt);
          });
      this.$ctrlCnt.append(this.buttons.info);
    }

    // Add reports button
    if (true === this.ps.options.reportsBtn || true === options.reportsBtn) {
      msg = ps.getMsg('Reports');
      this.buttons.about = $('<button/>', {class: 'JClicBtn', title: msg, 'aria-label': msg})
          .append($(Utils.getSvg(this.reportsIcon, this.iconWidth, this.iconHeight, this.iconFill)))
          .on('click', function (evt) {
            if (skin.ps)
              skin.ps.actions.reports.processEvent(evt);
          });
      this.$ctrlCnt.append(this.buttons.about);
    }

    // Add `full screen` button
    if (screenfull && screenfull.enabled) {
      msg = ps.getMsg('Toggle full screen');
      this.buttons.fullscreen = $('<button/>', {class: 'JClicBtn', title: msg, 'aria-label': msg})
          .append($('<img/>', {src: Utils.svgToURI(this.fullScreenIcon, this.iconWidth, this.iconHeight, this.iconFill)}))
          .on('click', function () {
            skin.setScreenFull(null);
          });
      this.$ctrlCnt.append(this.buttons.fullscreen);
    }

    // Add `close` button
    if (typeof this.ps.options.closeFn === 'function') {
      msg = ps.getMsg('Close');
      var closeFn = this.ps.options.closeFn;
      this.buttons.close = $('<button/>', {class: 'JClicBtn', title: msg, 'aria-label': msg})
          .append($(Utils.getSvg(this.closeIcon, this.iconWidth, this.iconHeight, this.iconFill)))
          .on('click', function () {
            Utils.log('info', 'Closing the player');
            closeFn();
          });
      this.$ctrlCnt.append(this.buttons.close);
    }

    // Workaround for a bug in Edge and Explorer: SVG objects not implementing `blur` and `focus` methods
    // See: [https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/8479637/]
    // This affects Polymer `iron-overlay-behavior`. See: [https://github.com/PolymerElements/iron-overlay-behavior/pull/211]
    var nilFunc = null;
    $.each(this.buttons, function(key, value){
      if(value && (typeof value[0].focus !== 'function' || typeof value[0].blur !== 'function')){
        if(nilFunc === null)
          nilFunc = function(){
            Utils.log('error', '"blur" and "focus" not defined for SVG objects in Explorer/Edge');
          };
        value[0].focus = value[0].blur = nilFunc;
      }
    });

  };

  DefaultSkin.prototype = {
    constructor: DefaultSkin,
    /**
     * Class name of this skin. It will be used as a base selector in the definition of all CSS styles.
     * @type {string}
     */
    skinId: 'JClicDefaultSkin',
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
     * Returns the CSS styles used by this skin. This method should be called only from
     * `Skin` constructor, and overridden by subclasses if needed.
     * @returns {string}
     */
    _getStyleSheets: function () {
      return Skin.prototype._getStyleSheets() + this.mainCSS + this.waitAnimCSS;
    },
    /**
     *
     * Updates the graphic contents of this skin.
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
      // Set the fullScreen icon
      if (this.buttons.fullscreen)
        this.buttons.fullscreen.find('img').get(0).src = Utils.svgToURI(
            this[screenfull.isFullscreen ? 'fullScreenExitIcon' : 'fullScreenIcon'],
            this.iconWidth, this.iconHeight, this.iconFill);

      // Resize player accordingly
      this.player.doLayout();

      // Temporary remove canvas to let div get its natural size:
      if (this.$msgBoxDivCanvas)
        this.$msgBoxDivCanvas.remove();

      // Get current size of message box div without canvas
      var msgWidth = this.$msgBoxDiv.outerWidth(),
          msgHeight = this.$msgBoxDiv.outerHeight();

      // Replace existing canvas if size has changed
      if (this.$msgBoxDivCanvas === null ||
          this.msgBox.dim.widht !== msgWidth ||
          this.msgBox.dim.height !== msgHeight) {
        this.msgBox.ctx = null;
        if (this.$msgBoxDivCanvas) {
          this.$msgBoxDivCanvas.remove();
          this.$msgBoxDivCanvas = null;
        }
        this.$msgBoxDivCanvas = $('<canvas width="' + msgWidth + '" height="' + msgHeight + '"/>');
        this.msgBox.setBounds(new AWT.Rectangle(0, 0, msgWidth + 1, msgHeight));
        var thisSkin = this;
        window.setTimeout(function(){
          thisSkin.msgBox.buildAccessibleElement(thisSkin.$msgBoxDivCanvas, thisSkin.$msgBoxDiv);          
        }, 0);
      }
      // restore canvas
      this.$msgBoxDiv.append(this.$msgBoxDivCanvas);
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
     * Enables or disables the `tabindex` attribute of the main buttons. Useful when a modal dialog
     * overlay is active, to avoid direct access to controls not related with the dialog.
     * @param {boolean} status - `true` to make main controls navigable, `false` otherwise
     */
    enableMainButtons: function(status) {
      this.$ctrlCnt.find('.JClicBtn,.JClicCountCnt').attr('tabindex', status ? '0' : '-1');
    },
    /**
     *
     * Enables or disables an object changing its opacity
     * @param {external:jQuery} $object - A JQuery DOM element
     * @param {boolean} enabled
     */
    setEnabled: function ($object, enabled) {
      $object.css('opacity', enabled ? 1.0 : 0.3).prop('disabled', !enabled);
    },
    //
    //Buttons and other graphical resources used by this skin.
    //
    // Styles used in this skin
    mainCSS: '\
.SKINID .JClicCtrlCnt {margin:0 9px 18px 9px; display:-webkit-flex; display:flex; -webkit-flex-direction:row; flex-direction:row; -webkit-align-items:center; align-items:center;}\
.SKINID .JClicCountCnt {display:-webkit-flex; display:flex; -webkit-flex-direction:column; flex-direction:column;}\
.SKINID .JClicMsgBox {height:60px; -webkit-flex-grow:1; flex-grow:1; background-color:lightblue;}\
.SKINID .JClicBtn {cursor:pointer; line-height:0;}\
.SKINID .JClicCounter {width:40px; height:20px; padding-left:20px; color:white; cursor:pointer; font-family:Roboto,Sans-serif; font-size:18px; text-align:center; background-repeat:no-repeat; background-position:left}',
    waitAnimCSS: '\
.SKINID .waitPanel {display:-webkit-flex; display:flex; width:100%; height:100%; -webkit-justify-content:center; justify-content:center; -webkit-align-items:center; align-items:center;}\
.SKINID .animImgBox {position:relative; width:300px; height:300px; max-width:80%; max-height:80%;}\
.SKINID .animImgBox svg {position:absolute; width:100%; height:100%; animation-iteration-count:infinite; animation-timing-function:linear;}\
.SKINID #waitImgBig {animation-duration:0.8s; animation-name:rotate-right;}\
@keyframes rotate-right {from {transform:rotate(0);} to {transform:rotate(1turn);}}\
.SKINID #waitImgSmall {animation-duration:0.6s; animation-name:rotate-left;}\
@keyframes rotate-left {from {transform:rotate(0);} to {transform:rotate(-1turn);}}',
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
    // Default settings for icons (can be overridden in subclasses)
    iconWidth: 36,
    iconHeight: 36,
    iconFill: '#FFFFFF',
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
    fullScreenIcon: '<svg fill="#FFFFFF" viewBox="0 0 24 24" width="36" height="36" xmlns="http://www.w3.org/2000/svg">\
<path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>\
</svg>',
    fullScreenExitIcon: '<svg fill="#FFFFFF" viewBox="0 0 24 24" width="36" height="36" xmlns="http://www.w3.org/2000/svg">\
<path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/>\
</svg>',
    //
    // Close button:
    closeIcon: '<svg fill="#FFFFFF" viewBox="0 0 24 24" width="36" height="36" xmlns="http://www.w3.org/2000/svg">\
<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>\
</svg>',
    //
    // Info button:
    infoIcon: '<svg fill="#FFFFFF" viewBox="0 0 24 24" width="36" height="36" xmlns="http://www.w3.org/2000/svg">\
<path d="M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 9h2V7h-2v2z"/>\
</svg>',
    //
    // Reports button
    reportsIcon: '<svg fill="#FFFFFF" viewBox="0 0 24 24" width="36" height="36" xmlns="http://www.w3.org/2000/svg">\
<path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>\
</svg>',
    //
    // Settings for counters:
    counterIconWidth: 18,
    counterIconHeight: 18,
    counterIconFill: '#FFFFFF',
    // Counters:
    timeIcon: '<svg fill="#FFFFFF" viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">\
<path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>\
<path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>\
</svg>',
    scoreIcon: '<svg fill="#FFFFFF" viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">\
<path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>\
</svg>',
    actionsIcon: '<svg fill="#FFFFFF" viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">\
<path d="M13.49 5.48c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-3.6 13.9l1-4.4 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1l-5.2 2.2v4.7h2v-3.4l1.8-.7-1.6 8.1-4.9-1-.4 2 7 1.4z"/>\
</svg>'
  };

  // DefaultSkin extends [Skin](Skin.html)
  DefaultSkin.prototype = $.extend(Object.create(Skin.prototype), DefaultSkin.prototype);

  // Register this class in the list of available skins
  Skin.CLASSES['default'] = DefaultSkin;
  return DefaultSkin;

});
