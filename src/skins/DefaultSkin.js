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
  "./Counter"
], function ($, screenfull, AWT, Skin, ActiveBox, Counter) {

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

    $div.addClass('JCSkin').append($('<style type="text/css"/>').html(this.resources.css.replace(/SKINID/g, this.skinId)));

    // Add waiting panel    
    // TODO: Change SVG animation (deprecated) to web animation
    this.$waitPanel = $('<div/>').css({
      'background-color': 'rgba(255, 255, 255, .60)',
      'background-image': 'url(' + this.resources.waitImg + ')',
      'background-repeat': 'no-repeat',
      'background-size': '20%',
      'background-position': 'center',
      'z-index': 99,
      display: 'none'
    });
    this.$playerCnt.append(this.$waitPanel);

    // Create the main container for buttons, counters and message box
    this.$ctrlCnt = $('<div/>', {class: 'JClicCtrlCnt'});
    this.$div.append(this.$ctrlCnt);

    // Add `prev` button
    this.buttons.prev = $('<img/>').on('click',
        function (evt) {
          if (skin.ps)
            skin.ps.actions.prev.processEvent(evt);
        });
    this.buttons.prev.get(0).src = this.resources.prevBtn;
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
    this.buttons.next = $('<img/>').on('click',
        function (evt) {
          if (skin.ps)
            skin.ps.actions.next.processEvent(evt);
        });
    this.buttons.next.get(0).src = this.resources.nextBtn;
    this.$ctrlCnt.append($('<div/>', {class: 'JClicBtn'}).append(this.buttons.next));

    // Add counters    
    if (false !== this.ps.options.counters) {
      // Create counters
      var padding = this.resources.counterIconSize.w + 2;
      var cssWidth = this.countersWidth - padding;
      var cssHeight = this.countersHeight;
      var $countCnt = $('<div/>', {class: 'JClicCountCnt'});
      $.each(Skin.prototype.counters, function (name) {
        skin.counters[name] = new Counter(name, $('<div/>', {class: 'counter', title: ps.getMsg(name)}).css({
          'width': cssWidth + 'px',
          'height': cssHeight + 'px',
          'font-size': (cssHeight - 2) + 'px',
          'text-align': 'center',
          'padding-left': padding + 'px',
          'background-image': 'url(' + skin.resources[name] + ')',
          'background-repeat': 'no-repeat',
          'background-position': 'left'
        }).html('000').on('click', function (evt) {
          if (skin.ps)
            skin.ps.actions.reports.processEvent(evt);
        }).appendTo($countCnt));
      });
      this.$ctrlCnt.append($countCnt);
    }

    // Add `full screen` button
    if (screenfull && screenfull.enabled) {
      this.buttons.fullscreen = $('<img/>').on('click',
          function () {
            skin.setScreenFull(null);
          });
      this.buttons.fullscreen.get(0).src = this.resources.fullScreen;
      this.$ctrlCnt.append($('<div/>', {class: 'JClicBtn'}).append(this.buttons.fullscreen));
    }

    // Add `close` button
    if (typeof this.ps.options.closeFn === 'function') {
      var closeFn = this.ps.options.closeFn;
      this.buttons.close = $('<img/>').on('click',
          function () {
            closeFn();
          });
      this.buttons.close.get(0).src = this.resources.close;
      this.$ctrlCnt.append($('<div/>', {class: 'JClicBtn'}).append(this.buttons.close));
    }
  };

  DefaultSkin.prototype = {
    constructor: DefaultSkin,
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
        this.buttons.fullscreen.get(0).src = this.resources[
            screenfull.isFullscreen ? 'fullScreenExit' : 'fullScreen'];
        
      var autoFit = this.ps.options.autoFit | (screenfull && screenfull.enabled && screenfull.isFullscreen);
      var mainWidth = autoFit ? $(window).width() : this.ps.options.width;
      var mainHeight = autoFit ? $(window).height() : this.ps.options.height;
      this.$div.css({
        width: (Math.max(this.ps.options.minWidth, Math.min(this.ps.options.maxWidth, mainWidth))-this.margin) + 'px',
        height: (Math.max(this.ps.options.minHeight, Math.min(this.ps.options.maxHeight, mainHeight))-this.margin) + 'px'
      });
      
      this.player.doLayout();
            
      this.msgBox.ctx = null;
      if (this.$msgBoxDivCanvas) {
        this.$msgBoxDivCanvas.remove();
        this.$msgBoxDivCanvas = null;
      }
      var msgBoxRect = new AWT.Rectangle(0, 0, this.$msgBoxDiv.width(), this.$msgBoxDiv.height());
      console.log('msgBoxDiv: %d x %d', this.$msgBoxDiv.width(), this.$msgBoxDiv.height());
      this.$msgBoxDivCanvas = $('<canvas width="' + msgBoxRect.dim.width + '" height="' + msgBoxRect.dim.height + '"/>');
      this.$msgBoxDiv.append(this.$msgBoxDivCanvas);
      // Internal bounds, relative to the origin of `$msgBoxDivCanvas`
      this.msgBox.setBounds(new AWT.Rectangle(0, 0, msgBoxRect.dim.width, msgBoxRect.dim.height));
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
      css: '\
.SKINID {background-color:#3F51B5; padding:9px; overflow:hidden; display:flex; flex-direction:column;}\
.SKINID .JClicPlayerCnt {background-color:lightblue; margin:9px; flex-grow:1; position: relative;}\
.SKINID .JClicPlayerCnt > div {position:absolute; width:100%; height:100%;}\
.SKINID .JClicCtrlCnt {margin:9px 0; display:flex; flex-direction:row; align-items:center;}\
.SKINID .JClicCountCnt {display:flex; flex-direction:column;}\
.SKINID .JClicMsgBox {height:60px; flex-grow:1; background-color:lightblue;}\
.SKINID .counter {font-family:Roboto,Sans-serif; color:white; cursor: pointer}\
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
      // Fonts used in this skin
      cssFonts: ['Roboto'],
      //
      // SVG image for the 'previous activity' button
      // See `/misc/skin/default` for original Inkscape images
      prevBtn: 'data:image/svg+xml;base64,\
PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIGZpbGw9IiNGRkZGRkYi\
IGhlaWdodD0iMzYiIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjM2IiB4bWxucz0iaHR0cDov\
L3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0xNS40MSA3LjQxTDE0IDZsLTYgNiA2IDYg\
MS40MS0xLjQxTDEwLjgzIDEyeiI+PC9wYXRoPjxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9\
Im5vbmUiPjwvcGF0aD48L3N2Zz4K',
      prevBtnSize: {w: 36, h: 36},
      //
      // SVG image for the 'next activity' button
      // See `/misc/skin/default` for original Inkscape images
      nextBtn: 'data:image/svg+xml;base64,\
PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIGZpbGw9IiNGRkZGRkYi\
IGhlaWdodD0iMzYiIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjM2IiB4bWxucz0iaHR0cDov\
L3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0xMCA2TDguNTkgNy40MSAxMy4xNyAxMmwt\
NC41OCA0LjU5TDEwIDE4bDYtNnoiPjwvcGF0aD48cGF0aCBkPSJNMCAwaDI0djI0SDB6IiBmaWxs\
PSJub25lIj48L3BhdGg+PC9zdmc+Cg==',
      nextBtnSize: {w: 36, h: 36},
      //
      // Animated image to be shown when loading resources
      // Thanks to Ryan Allen: http://articles.dappergentlemen.com/2015/01/13/svg-spinner/
      waitImg: 'data:image/svg+xml;base64,\
PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIGNsYXNzPSJzdmctbG9h\
ZGVyIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCA4MCA4MCIgeD0iMHB4IiB4bWw6c3BhY2U9\
InByZXNlcnZlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5r\
PSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB5PSIwcHgiPjxwYXRoIGQ9Ik0xMCw0MGMw\
LDAsMC0wLjQsMC0xLjFjMC0wLjMsMC0wLjgsMC0xLjNjMC0wLjMsMC0wLjUsMC0wLjhjMC0wLjMs\
MC4xLTAuNiwwLjEtMC45YzAuMS0wLjYsMC4xLTEuNCwwLjItMi4xIGMwLjItMC44LDAuMy0xLjYs\
MC41LTIuNWMwLjItMC45LDAuNi0xLjgsMC44LTIuOGMwLjMtMSwwLjgtMS45LDEuMi0zYzAuNS0x\
LDEuMS0yLDEuNy0zLjFjMC43LTEsMS40LTIuMSwyLjItMy4xIGMxLjYtMi4xLDMuNy0zLjksNi01\
LjZjMi4zLTEuNyw1LTMsNy45LTQuMWMwLjctMC4yLDEuNS0wLjQsMi4yLTAuN2MwLjctMC4zLDEu\
NS0wLjMsMi4zLTAuNWMwLjgtMC4yLDEuNS0wLjMsMi4zLTAuNGwxLjItMC4xIGwwLjYtMC4xbDAu\
MywwbDAuMSwwbDAuMSwwbDAsMGMwLjEsMC0wLjEsMCwwLjEsMGMxLjUsMCwyLjktMC4xLDQuNSww\
LjJjMC44LDAuMSwxLjYsMC4xLDIuNCwwLjNjMC44LDAuMiwxLjUsMC4zLDIuMywwLjUgYzMsMC44\
LDUuOSwyLDguNSwzLjZjMi42LDEuNiw0LjksMy40LDYuOCw1LjRjMSwxLDEuOCwyLjEsMi43LDMu\
MWMwLjgsMS4xLDEuNSwyLjEsMi4xLDMuMmMwLjYsMS4xLDEuMiwyLjEsMS42LDMuMSBjMC40LDEs\
MC45LDIsMS4yLDNjMC4zLDEsMC42LDEuOSwwLjgsMi43YzAuMiwwLjksMC4zLDEuNiwwLjUsMi40\
YzAuMSwwLjQsMC4xLDAuNywwLjIsMWMwLDAuMywwLjEsMC42LDAuMSwwLjkgYzAuMSwwLjYsMC4x\
LDEsMC4xLDEuNEM3NCwzOS42LDc0LDQwLDc0LDQwYzAuMiwyLjItMS41LDQuMS0zLjcsNC4zcy00\
LjEtMS41LTQuMy0zLjdjMC0wLjEsMC0wLjIsMC0wLjNsMC0wLjRjMCwwLDAtMC4zLDAtMC45IGMw\
LTAuMywwLTAuNywwLTEuMWMwLTAuMiwwLTAuNSwwLTAuN2MwLTAuMi0wLjEtMC41LTAuMS0wLjhj\
LTAuMS0wLjYtMC4xLTEuMi0wLjItMS45Yy0wLjEtMC43LTAuMy0xLjQtMC40LTIuMiBjLTAuMi0w\
LjgtMC41LTEuNi0wLjctMi40Yy0wLjMtMC44LTAuNy0xLjctMS4xLTIuNmMtMC41LTAuOS0wLjkt\
MS44LTEuNS0yLjdjLTAuNi0wLjktMS4yLTEuOC0xLjktMi43Yy0xLjQtMS44LTMuMi0zLjQtNS4y\
LTQuOSBjLTItMS41LTQuNC0yLjctNi45LTMuNmMtMC42LTAuMi0xLjMtMC40LTEuOS0wLjZjLTAu\
Ny0wLjItMS4zLTAuMy0xLjktMC40Yy0xLjItMC4zLTIuOC0wLjQtNC4yLTAuNWwtMiwwYy0wLjcs\
MC0xLjQsMC4xLTIuMSwwLjEgYy0wLjcsMC4xLTEuNCwwLjEtMiwwLjNjLTAuNywwLjEtMS4zLDAu\
My0yLDAuNGMtMi42LDAuNy01LjIsMS43LTcuNSwzLjFjLTIuMiwxLjQtNC4zLDIuOS02LDQuN2Mt\
MC45LDAuOC0xLjYsMS44LTIuNCwyLjcgYy0wLjcsMC45LTEuMywxLjktMS45LDIuOGMtMC41LDEt\
MSwxLjktMS40LDIuOGMtMC40LDAuOS0wLjgsMS44LTEsMi42Yy0wLjMsMC45LTAuNSwxLjYtMC43\
LDIuNGMtMC4yLDAuNy0wLjMsMS40LTAuNCwyLjEgYy0wLjEsMC4zLTAuMSwwLjYtMC4yLDAuOWMw\
LDAuMy0wLjEsMC42LTAuMSwwLjhjMCwwLjUtMC4xLDAuOS0wLjEsMS4zQzEwLDM5LjYsMTAsNDAs\
MTAsNDB6IiBmaWxsPSIjM0Y1MUI1Ij48YW5pbWF0ZVRyYW5zZm9ybSBhdHRyaWJ1dGVOYW1lPSJ0\
cmFuc2Zvcm0iIGF0dHJpYnV0ZVR5cGU9InhtbCIgZHVyPSIwLjhzIiBmcm9tPSIwIDQwIDQwIiBy\
ZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgdG89IjM2MCA0MCA0MCIgdHlwZT0icm90YXRlIj48L2Fu\
aW1hdGVUcmFuc2Zvcm0+PC9wYXRoPjxwYXRoIGQ9Ik02Miw0MC4xYzAsMCwwLDAuMi0wLjEsMC43\
YzAsMC4yLDAsMC41LTAuMSwwLjhjMCwwLjIsMCwwLjMsMCwwLjVjMCwwLjItMC4xLDAuNC0wLjEs\
MC43IGMtMC4xLDAuNS0wLjIsMS0wLjMsMS42Yy0wLjIsMC41LTAuMywxLjEtMC41LDEuOGMtMC4y\
LDAuNi0wLjUsMS4zLTAuNywxLjljLTAuMywwLjctMC43LDEuMy0xLDIuMWMtMC40LDAuNy0wLjks\
MS40LTEuNCwyLjEgYy0wLjUsMC43LTEuMSwxLjQtMS43LDJjLTEuMiwxLjMtMi43LDIuNS00LjQs\
My42Yy0xLjcsMS0zLjYsMS44LTUuNSwyLjRjLTIsMC41LTQsMC43LTYuMiwwLjdjLTEuOS0wLjEt\
NC4xLTAuNC02LTEuMSBjLTEuOS0wLjctMy43LTEuNS01LjItMi42Yy0xLjUtMS4xLTIuOS0yLjMt\
NC0zLjdjLTAuNi0wLjYtMS0xLjQtMS41LTJjLTAuNC0wLjctMC44LTEuNC0xLjItMmMtMC4zLTAu\
Ny0wLjYtMS4zLTAuOC0yIGMtMC4yLTAuNi0wLjQtMS4yLTAuNi0xLjhjLTAuMS0wLjYtMC4zLTEu\
MS0wLjQtMS42Yy0wLjEtMC41LTAuMS0xLTAuMi0xLjRjLTAuMS0wLjktMC4xLTEuNS0wLjEtMmMw\
LTAuNSwwLTAuNywwLTAuNyBzMCwwLjIsMC4xLDAuN2MwLjEsMC41LDAsMS4xLDAuMiwyYzAuMSww\
LjQsMC4yLDAuOSwwLjMsMS40YzAuMSwwLjUsMC4zLDEsMC41LDEuNmMwLjIsMC42LDAuNCwxLjEs\
MC43LDEuOCBjMC4zLDAuNiwwLjYsMS4yLDAuOSwxLjljMC40LDAuNiwwLjgsMS4zLDEuMiwxLjlj\
MC41LDAuNiwxLDEuMywxLjYsMS44YzEuMSwxLjIsMi41LDIuMyw0LDMuMmMxLjUsMC45LDMuMiwx\
LjYsNSwyLjEgYzEuOCwwLjUsMy42LDAuNiw1LjYsMC42YzEuOC0wLjEsMy43LTAuNCw1LjQtMWMx\
LjctMC42LDMuMy0xLjQsNC43LTIuNGMxLjQtMSwyLjYtMi4xLDMuNi0zLjNjMC41LTAuNiwwLjkt\
MS4yLDEuMy0xLjggYzAuNC0wLjYsMC43LTEuMiwxLTEuOGMwLjMtMC42LDAuNi0xLjIsMC44LTEu\
OGMwLjItMC42LDAuNC0xLjEsMC41LTEuN2MwLjEtMC41LDAuMi0xLDAuMy0xLjVjMC4xLTAuNCww\
LjEtMC44LDAuMS0xLjIgYzAtMC4yLDAtMC40LDAuMS0wLjVjMC0wLjIsMC0wLjQsMC0wLjVjMC0w\
LjMsMC0wLjYsMC0wLjhjMC0wLjUsMC0wLjcsMC0wLjdjMC0xLjEsMC45LTIsMi0yczIsMC45LDIs\
MkM2Miw0MCw2Miw0MC4xLDYyLDQwLjF6IiBmaWxsPSIjM0Y1MUI1Ij48YW5pbWF0ZVRyYW5zZm9y\
bSBhdHRyaWJ1dGVOYW1lPSJ0cmFuc2Zvcm0iIGF0dHJpYnV0ZVR5cGU9InhtbCIgZHVyPSIwLjZz\
IiBmcm9tPSIwIDQwIDQwIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgdG89Ii0zNjAgNDAgNDAi\
IHR5cGU9InJvdGF0ZSI+PC9hbmltYXRlVHJhbnNmb3JtPjwvcGF0aD48L3N2Zz4K',
      waitImgSize: {w: 80, h: 80},
      //
      // SVG images for 'fullscreen' and 'fullscreen extit' actions.
      // By **Google Material design Icons**:
      // https://google.github.io/material-design-icons/
      fullScreen: 'data:image/svg+xml;base64,\
PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIGZpbGw9IiNGRkZGRkYi\
IGhlaWdodD0iMzYiIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjM2IiB4bWxucz0iaHR0cDov\
L3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUi\
PjwvcGF0aD48cGF0aCBkPSJNNyAxNEg1djVoNXYtMkg3di0zem0tMi00aDJWN2gzVjVINXY1em0x\
MiA3aC0zdjJoNXYtNWgtMnYzek0xNCA1djJoM3YzaDJWNWgtNXoiPjwvcGF0aD48L3N2Zz4K',
      fullScreenExit: 'data:image/svg+xml;base64,\
PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIGZpbGw9IiNGRkZGRkYi\
IGhlaWdodD0iMzYiIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjM2IiB4bWxucz0iaHR0cDov\
L3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUi\
PjwvcGF0aD48cGF0aCBkPSJNNSAxNmgzdjNoMnYtNUg1djJ6bTMtOEg1djJoNVY1SDh2M3ptNiAx\
MWgydi0zaDN2LTJoLTV2NXptMi0xMVY1aC0ydjVoNVY4aC0zeiI+PC9wYXRoPjwvc3ZnPgo=',
      fullScreenSize: {w: 36, h: 36},
      //
      // Close button
      close: 'data:image/svg+xml;base64,\
PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIGZpbGw9IiNGRkZGRkYi\
IGhlaWdodD0iMzYiIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjM2IiB4bWxucz0iaHR0cDov\
L3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0xOSA2LjQxTDE3LjU5IDUgMTIgMTAuNTkg\
Ni40MSA1IDUgNi40MSAxMC41OSAxMiA1IDE3LjU5IDYuNDEgMTkgMTIgMTMuNDEgMTcuNTkgMTkg\
MTkgMTcuNTkgMTMuNDEgMTJ6Ij48L3BhdGg+PHBhdGggZD0iTTAgMGgyNHYyNEgweiIgZmlsbD0i\
bm9uZSI+PC9wYXRoPjwvc3ZnPgo=',
      closeSize: {w: 36, h: 36},
      //
      // Icons for counters
      time: 'data:image/svg+xml;base64,\
PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIGZpbGw9IiNGRkZGRkYi\
IGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjE4IiB4bWxucz0iaHR0cDov\
L3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0xMS45OSAyQzYuNDcgMiAyIDYuNDggMiAx\
MnM0LjQ3IDEwIDkuOTkgMTBDMTcuNTIgMjIgMjIgMTcuNTIgMjIgMTJTMTcuNTIgMiAxMS45OSAy\
ek0xMiAyMGMtNC40MiAwLTgtMy41OC04LThzMy41OC04IDgtOCA4IDMuNTggOCA4LTMuNTggOC04\
IDh6Ij48L3BhdGg+PHBhdGggZD0iTTAgMGgyNHYyNEgweiIgZmlsbD0ibm9uZSI+PC9wYXRoPjxw\
YXRoIGQ9Ik0xMi41IDdIMTF2Nmw1LjI1IDMuMTUuNzUtMS4yMy00LjUtMi42N3oiPjwvcGF0aD48\
L3N2Zz4K',
      score: 'data:image/svg+xml;base64,\
PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIGZpbGw9IiNGRkZGRkYi\
IGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjE4IiB4bWxucz0iaHR0cDov\
L3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUi\
PjwvcGF0aD48cGF0aCBkPSJNOSAxNi4yTDQuOCAxMmwtMS40IDEuNEw5IDE5IDIxIDdsLTEuNC0x\
LjRMOSAxNi4yeiI+PC9wYXRoPjwvc3ZnPgo=',
      actions: 'data:image/svg+xml;base64,\
PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIGZpbGw9IiNGRkZGRkYi\
IGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjE4IiB4bWxucz0iaHR0cDov\
L3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUi\
PjwvcGF0aD48cGF0aCBkPSJNMTMuNDkgNS40OGMxLjEgMCAyLS45IDItMnMtLjktMi0yLTItMiAu\
OS0yIDIgLjkgMiAyIDJ6bS0zLjYgMTMuOWwxLTQuNCAyLjEgMnY2aDJ2LTcuNWwtMi4xLTIgLjYt\
M2MxLjMgMS41IDMuMyAyLjUgNS41IDIuNXYtMmMtMS45IDAtMy41LTEtNC4zLTIuNGwtMS0xLjZj\
LS40LS42LTEtMS0xLjctMS0uMyAwLS41LjEtLjguMWwtNS4yIDIuMnY0LjdoMnYtMy40bDEuOC0u\
Ny0xLjYgOC4xLTQuOS0xLS40IDIgNyAxLjR6Ij48L3BhdGg+PC9zdmc+Cg==',
      counterIconSize: {w: 18, h: 18}
    }
  };
  // DefaultSkin extends [Skin](Skin.html)
  DefaultSkin.prototype = $.extend(Object.create(Skin.prototype), DefaultSkin.prototype);
  // Inherit Skin resources
  DefaultSkin.prototype.resources = $.extend(Object.create(Skin.prototype.resources), DefaultSkin.prototype.resources);

  // Register this class in the list of available skins
  Skin.CLASSES['DefaultSkin'] = DefaultSkin;
  return DefaultSkin;
});
