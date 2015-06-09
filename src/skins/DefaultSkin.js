//    File    : DefaultSkin.js  
//    Created : 12/05/2015  
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
  "../AWT",
  "./Skin",
  "../boxes/ActiveBox",
  "../boxes/Counter"
], function ($, AWT, Skin, ActiveBox, Counter) {

  //
  // This is the default [Skin](Skin.html) used by jclic.js
  // $div (a JQuery `<div/>` object) - The `div` to be used as a recipient for
  // this skin. When `null` or `undefined`, a new one will be created.  
  var DefaultSkin = function (ps, name, $div) {

    // DefaultSkin extends [Skin](Skin.html)
    Skin.call(this, ps, name, $div);

    this.$msgBoxDiv = $div.children('.JClicMsgBox').first();
    if (this.$msgBoxDiv === null || this.$msgBoxDiv.length === 0) {
      this.$msgBoxDiv = $('<div class="JClicMsgBox"/>');
      this.$div.append(this.$msgBoxDiv);
    }
    this.$msgBoxDivCanvas = $('<canvas />');
    this.$msgBoxDiv.append(this.$msgBoxDivCanvas);
    this.msgBox = new ActiveBox();

    var thisSkin = this;
    this.buttons.prev = $('<img />').on('click',
        function (evt) {
          if (thisSkin.ps)
            thisSkin.ps.actions.prev.processEvent(evt);
        });
    this.buttons.prev.get(0).src = this.resources.prevBtn;
    this.$div.append(this.buttons.prev);

    this.buttons.next = $('<img />').on('click',
        function (evt) {
          if (thisSkin.ps)
            thisSkin.ps.actions.next.processEvent(evt);
        });
    this.buttons.next.get(0).src = this.resources.nextBtn;
    this.$div.append(this.buttons.next);

    this.$waitPanel = $('<div />').css({
      'background-color': 'rgba(64, 64, 64, .3)',
      'background-image': 'url(' + this.resources.waitImg + ')',
      'background-repeat': 'no-repeat',
      'background-size': '20%',
      'background-position': 'center',
      'z-index': 99,
      display: 'none'
    });
    this.$div.append(this.$waitPanel);
  };

  DefaultSkin.prototype = {
    constructor: DefaultSkin,
    // 
    // An object of type [ActiveBox](ActiveBox.html) used to display the main
    // messages of each JClic [Activity](Activity.html)
    msgBox: null,
    $msgBoxDiv: null,
    $msgBoxDivCanvas: null,
    //
    // Objects used as _help_ and _about_ windows
    currentHelpWindow: null,
    currentAboutWindow: null,
    //
    // Background, margin and height of the messageBox
    background: '#3F51B5',
    margin: 18,
    msgBoxHeight: 60,
    // 
    // Overrides `Skin.updateContent`
    // Updates the graphic contents of this skin.
    // The method should be called from `Skin.update`
    // dirtyRect (AWT.Rectangle) - Specifies the area to be updated. When `null`, it's the whole panel.
    updateContent: function (dirtyRegion) {
      if (this.$msgBoxDivCanvas)
        this.msgBox.update(this.$msgBoxDivCanvas.get(0).getContext('2d'), dirtyRegion);
      return Skin.prototype.updateContent.call(this);
    },
    // 
    // Main method used to build the contents
    // Resizes and places internal objects
    doLayout: function () {

      // Basic layout, just for testing:

      var margin = this.margin;
      var prv = this.resources.prevBtnSize;
      var nxt = this.resources.nextBtnSize;

      this.$div.css({
        position: 'relative',
        width: '100%',
        height: '600px',
        'background-color': this.background
      });

      var actualSize = new AWT.Dimension(this.$div.width(), this.$div.height());

      var w = Math.max(100, actualSize.width - 2 * margin);
      var wMsgBox = w - 2 * margin - prv.w - nxt.w;
      var h = this.msgBoxHeight;
      var playerHeight = Math.max(100, actualSize.height - 3 * margin - h);

      var playerCss = {
        position: 'absolute',
        width: w + 'px',
        height: playerHeight + 'px',
        top: margin + 'px',
        left: margin + 'px'
      };

      this.player.$div.css(playerCss).css({
        'background-color': 'olive'
      });

      this.player.doLayout();

      this.$waitPanel.css(playerCss);

      this.msgBox.ctx = null;
      this.$msgBoxDivCanvas.remove();
      this.$msgBoxDivCanvas = null;

      var msgBoxRect = new AWT.Rectangle(2 * margin + prv.w, 2 * margin + playerHeight, wMsgBox, h);

      this.$msgBoxDiv.css({
        position: 'absolute',
        width: msgBoxRect.dim.width + 'px',
        height: msgBoxRect.dim.height + 'px',
        top: msgBoxRect.pos.y + 'px',
        left: msgBoxRect.pos.x + 'px',
        'background-color': 'lightblue'
      });

      this.buttons.prev.css({
        position: 'absolute',
        top: msgBoxRect.pos.y + (h - prv.h) / 2 + 'px',
        left: margin + 'px'
      });

      this.buttons.next.css({
        position: 'absolute',
        top: msgBoxRect.pos.y + (h - nxt.h) / 2 + 'px',
        left: w + margin - nxt.w + 'px'
      });

      this.$msgBoxDivCanvas = $('<canvas width="' + wMsgBox + '" height="' + h + '"/>');
      this.$msgBoxDiv.append(this.$msgBoxDivCanvas);
      // Internal bounds, relative to the origin of `$msgBoxDivCanvas`
      this.msgBox.setBounds(new AWT.Rectangle(0, 0, wMsgBox, h));
      this.add(msgBoxRect);

      // Invalidates the msgBox area and calls `Container.update` to paint it
      this.invalidate(msgBoxRect);
      this.update();
    },
    //
    // Gets the [ActiveBox](ActiveBox.html) used by activities to display the main message
    getMsgBox: function () {
      return this.msgBox;
    },
    //
    // Graphical resources used by this skin
    resources: {
      //
      // SVG image for the 'previous activity' button
      // See `/misc/skin/default` for original Inkscape images
      prevBtn: 'data:image/svg+xml;base64,' +
          'PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIGhlaWdodD0iNDgiIGlk' +
          'PSJzdmcyIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCA0OCA0OCIgd2lkdGg9IjQ4IiB4bWxu' +
          'cz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOmNjPSJodHRwOi8vY3JlYXRpdmVj' +
          'b21tb25zLm9yZy9ucyMiIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4x' +
          'LyIgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMj' +
          'IiB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48bWV0YWRhdGEgaWQ9Im1l' +
          'dGFkYXRhMTIiPjxyZGY6UkRGPjxjYzpXb3JrIHJkZjphYm91dD0iIj48ZGM6Zm9ybWF0PmltYWdl' +
          'L3N2Zyt4bWw8L2RjOmZvcm1hdD48ZGM6dHlwZSByZGY6cmVzb3VyY2U9Imh0dHA6Ly9wdXJsLm9y' +
          'Zy9kYy9kY21pdHlwZS9TdGlsbEltYWdlIj48L2RjOnR5cGU+PGRjOnRpdGxlPjwvZGM6dGl0bGU+' +
          'PC9jYzpXb3JrPjwvcmRmOlJERj48L21ldGFkYXRhPjxkZWZzIGlkPSJkZWZzMTAiPjwvZGVmcz48' +
          'cGF0aCBkPSJNIDAsMCBIIDQ4IFYgNDggSCAwIHoiIGlkPSJwYXRoNCIgc3R5bGU9ImZpbGw6bm9u' +
          'ZSI+PC9wYXRoPjxwYXRoIGQ9Ik0gMjQsNCBDIDM1LjA1LDQgNDQsMTIuOTUgNDQsMjQgNDQsMzUu' +
          'MDUgMzUuMDUsNDQgMjQsNDQgMTIuOTUsNDQgNCwzNS4wNSA0LDI0IDQsMTIuOTUgMTIuOTUsNCAy' +
          'NCw0IHogbSA0LDI5IFYgMTUgbCAtMTIsOSAxMiw5IHoiIGlkPSJwYXRoNiIgc3R5bGU9ImZpbGw6' +
          'I2ZmZmZmZiI+PC9wYXRoPjwvc3ZnPgo=',
      prevBtnSize: {w: 48, h: 48},
      //
      // SVG image for the 'next activity' button
      // See `/misc/skin/default` for original Inkscape images
      nextBtn: 'data:image/svg+xml;base64,' +
          'PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIGhlaWdodD0iNDgiIGlk' +
          'PSJzdmcyIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCA0OCA0OCIgd2lkdGg9IjQ4IiB4bWxu' +
          'cz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOmNjPSJodHRwOi8vY3JlYXRpdmVj' +
          'b21tb25zLm9yZy9ucyMiIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4x' +
          'LyIgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMj' +
          'IiB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48bWV0YWRhdGEgaWQ9Im1l' +
          'dGFkYXRhMTIiPjxyZGY6UkRGPjxjYzpXb3JrIHJkZjphYm91dD0iIj48ZGM6Zm9ybWF0PmltYWdl' +
          'L3N2Zyt4bWw8L2RjOmZvcm1hdD48ZGM6dHlwZSByZGY6cmVzb3VyY2U9Imh0dHA6Ly9wdXJsLm9y' +
          'Zy9kYy9kY21pdHlwZS9TdGlsbEltYWdlIj48L2RjOnR5cGU+PGRjOnRpdGxlPjwvZGM6dGl0bGU+' +
          'PC9jYzpXb3JrPjwvcmRmOlJERj48L21ldGFkYXRhPjxkZWZzIGlkPSJkZWZzMTAiPjwvZGVmcz48' +
          'cGF0aCBkPSJNIDAsMCBIIDQ4IFYgNDggSCAwIHoiIGlkPSJwYXRoNCIgc3R5bGU9ImZpbGw6bm9u' +
          'ZSI+PC9wYXRoPjxwYXRoIGQ9Ik0gMjQsNCBDIDEyLjk1LDQgNCwxMi45NSA0LDI0IDQsMzUuMDUg' +
          'MTIuOTUsNDQgMjQsNDQgMzUuMDUsNDQgNDQsMzUuMDUgNDQsMjQgNDQsMTIuOTUgMzUuMDUsNCAy' +
          'NCw0IHogTSAyMCwzMyBWIDE1IGwgMTIsOSAtMTIsOSB6IiBpZD0icGF0aDYiIHN0eWxlPSJmaWxs' +
          'OiNmZmZmZmYiPjwvcGF0aD48L3N2Zz4K',
      nextBtnSize: {w: 48, h: 48},
      //
      // Animated image to be shown when loading resources
      // Thanks to Ryan Allen: http://articles.dappergentlemen.com/2015/01/13/svg-spinner/
      waitImg: 'data:image/svg+xml;base64,' +
    'PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIGNsYXNzPSJzdmctbG9h' +
    'ZGVyIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCA4MCA4MCIgeD0iMHB4IiB4bWw6c3BhY2U9' +
    'InByZXNlcnZlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5r' +
    'PSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB5PSIwcHgiPjxwYXRoIGQ9Ik0xMCw0MGMw' +
    'LDAsMC0wLjQsMC0xLjFjMC0wLjMsMC0wLjgsMC0xLjNjMC0wLjMsMC0wLjUsMC0wLjhjMC0wLjMs' +
    'MC4xLTAuNiwwLjEtMC45YzAuMS0wLjYsMC4xLTEuNCwwLjItMi4xIGMwLjItMC44LDAuMy0xLjYs' +
    'MC41LTIuNWMwLjItMC45LDAuNi0xLjgsMC44LTIuOGMwLjMtMSwwLjgtMS45LDEuMi0zYzAuNS0x' +
    'LDEuMS0yLDEuNy0zLjFjMC43LTEsMS40LTIuMSwyLjItMy4xIGMxLjYtMi4xLDMuNy0zLjksNi01' +
    'LjZjMi4zLTEuNyw1LTMsNy45LTQuMWMwLjctMC4yLDEuNS0wLjQsMi4yLTAuN2MwLjctMC4zLDEu' +
    'NS0wLjMsMi4zLTAuNWMwLjgtMC4yLDEuNS0wLjMsMi4zLTAuNGwxLjItMC4xIGwwLjYtMC4xbDAu' +
    'MywwbDAuMSwwbDAuMSwwbDAsMGMwLjEsMC0wLjEsMCwwLjEsMGMxLjUsMCwyLjktMC4xLDQuNSww' +
    'LjJjMC44LDAuMSwxLjYsMC4xLDIuNCwwLjNjMC44LDAuMiwxLjUsMC4zLDIuMywwLjUgYzMsMC44' +
    'LDUuOSwyLDguNSwzLjZjMi42LDEuNiw0LjksMy40LDYuOCw1LjRjMSwxLDEuOCwyLjEsMi43LDMu' +
    'MWMwLjgsMS4xLDEuNSwyLjEsMi4xLDMuMmMwLjYsMS4xLDEuMiwyLjEsMS42LDMuMSBjMC40LDEs' +
    'MC45LDIsMS4yLDNjMC4zLDEsMC42LDEuOSwwLjgsMi43YzAuMiwwLjksMC4zLDEuNiwwLjUsMi40' +
    'YzAuMSwwLjQsMC4xLDAuNywwLjIsMWMwLDAuMywwLjEsMC42LDAuMSwwLjkgYzAuMSwwLjYsMC4x' +
    'LDEsMC4xLDEuNEM3NCwzOS42LDc0LDQwLDc0LDQwYzAuMiwyLjItMS41LDQuMS0zLjcsNC4zcy00' +
    'LjEtMS41LTQuMy0zLjdjMC0wLjEsMC0wLjIsMC0wLjNsMC0wLjRjMCwwLDAtMC4zLDAtMC45IGMw' +
    'LTAuMywwLTAuNywwLTEuMWMwLTAuMiwwLTAuNSwwLTAuN2MwLTAuMi0wLjEtMC41LTAuMS0wLjhj' +
    'LTAuMS0wLjYtMC4xLTEuMi0wLjItMS45Yy0wLjEtMC43LTAuMy0xLjQtMC40LTIuMiBjLTAuMi0w' +
    'LjgtMC41LTEuNi0wLjctMi40Yy0wLjMtMC44LTAuNy0xLjctMS4xLTIuNmMtMC41LTAuOS0wLjkt' +
    'MS44LTEuNS0yLjdjLTAuNi0wLjktMS4yLTEuOC0xLjktMi43Yy0xLjQtMS44LTMuMi0zLjQtNS4y' +
    'LTQuOSBjLTItMS41LTQuNC0yLjctNi45LTMuNmMtMC42LTAuMi0xLjMtMC40LTEuOS0wLjZjLTAu' +
    'Ny0wLjItMS4zLTAuMy0xLjktMC40Yy0xLjItMC4zLTIuOC0wLjQtNC4yLTAuNWwtMiwwYy0wLjcs' +
    'MC0xLjQsMC4xLTIuMSwwLjEgYy0wLjcsMC4xLTEuNCwwLjEtMiwwLjNjLTAuNywwLjEtMS4zLDAu' +
    'My0yLDAuNGMtMi42LDAuNy01LjIsMS43LTcuNSwzLjFjLTIuMiwxLjQtNC4zLDIuOS02LDQuN2Mt' +
    'MC45LDAuOC0xLjYsMS44LTIuNCwyLjcgYy0wLjcsMC45LTEuMywxLjktMS45LDIuOGMtMC41LDEt' +
    'MSwxLjktMS40LDIuOGMtMC40LDAuOS0wLjgsMS44LTEsMi42Yy0wLjMsMC45LTAuNSwxLjYtMC43' +
    'LDIuNGMtMC4yLDAuNy0wLjMsMS40LTAuNCwyLjEgYy0wLjEsMC4zLTAuMSwwLjYtMC4yLDAuOWMw' +
    'LDAuMy0wLjEsMC42LTAuMSwwLjhjMCwwLjUtMC4xLDAuOS0wLjEsMS4zQzEwLDM5LjYsMTAsNDAs' +
    'MTAsNDB6IiBmaWxsPSIjM0Y1MUI1Ij48YW5pbWF0ZVRyYW5zZm9ybSBhdHRyaWJ1dGVOYW1lPSJ0' +
    'cmFuc2Zvcm0iIGF0dHJpYnV0ZVR5cGU9InhtbCIgZHVyPSIwLjhzIiBmcm9tPSIwIDQwIDQwIiBy' +
    'ZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgdG89IjM2MCA0MCA0MCIgdHlwZT0icm90YXRlIj48L2Fu' +
    'aW1hdGVUcmFuc2Zvcm0+PC9wYXRoPjxwYXRoIGQ9Ik02Miw0MC4xYzAsMCwwLDAuMi0wLjEsMC43' +
    'YzAsMC4yLDAsMC41LTAuMSwwLjhjMCwwLjIsMCwwLjMsMCwwLjVjMCwwLjItMC4xLDAuNC0wLjEs' +
    'MC43IGMtMC4xLDAuNS0wLjIsMS0wLjMsMS42Yy0wLjIsMC41LTAuMywxLjEtMC41LDEuOGMtMC4y' +
    'LDAuNi0wLjUsMS4zLTAuNywxLjljLTAuMywwLjctMC43LDEuMy0xLDIuMWMtMC40LDAuNy0wLjks' +
    'MS40LTEuNCwyLjEgYy0wLjUsMC43LTEuMSwxLjQtMS43LDJjLTEuMiwxLjMtMi43LDIuNS00LjQs' +
    'My42Yy0xLjcsMS0zLjYsMS44LTUuNSwyLjRjLTIsMC41LTQsMC43LTYuMiwwLjdjLTEuOS0wLjEt' +
    'NC4xLTAuNC02LTEuMSBjLTEuOS0wLjctMy43LTEuNS01LjItMi42Yy0xLjUtMS4xLTIuOS0yLjMt' +
    'NC0zLjdjLTAuNi0wLjYtMS0xLjQtMS41LTJjLTAuNC0wLjctMC44LTEuNC0xLjItMmMtMC4zLTAu' +
    'Ny0wLjYtMS4zLTAuOC0yIGMtMC4yLTAuNi0wLjQtMS4yLTAuNi0xLjhjLTAuMS0wLjYtMC4zLTEu' +
    'MS0wLjQtMS42Yy0wLjEtMC41LTAuMS0xLTAuMi0xLjRjLTAuMS0wLjktMC4xLTEuNS0wLjEtMmMw' +
    'LTAuNSwwLTAuNywwLTAuNyBzMCwwLjIsMC4xLDAuN2MwLjEsMC41LDAsMS4xLDAuMiwyYzAuMSww' +
    'LjQsMC4yLDAuOSwwLjMsMS40YzAuMSwwLjUsMC4zLDEsMC41LDEuNmMwLjIsMC42LDAuNCwxLjEs' +
    'MC43LDEuOCBjMC4zLDAuNiwwLjYsMS4yLDAuOSwxLjljMC40LDAuNiwwLjgsMS4zLDEuMiwxLjlj' +
    'MC41LDAuNiwxLDEuMywxLjYsMS44YzEuMSwxLjIsMi41LDIuMyw0LDMuMmMxLjUsMC45LDMuMiwx' +
    'LjYsNSwyLjEgYzEuOCwwLjUsMy42LDAuNiw1LjYsMC42YzEuOC0wLjEsMy43LTAuNCw1LjQtMWMx' +
    'LjctMC42LDMuMy0xLjQsNC43LTIuNGMxLjQtMSwyLjYtMi4xLDMuNi0zLjNjMC41LTAuNiwwLjkt' +
    'MS4yLDEuMy0xLjggYzAuNC0wLjYsMC43LTEuMiwxLTEuOGMwLjMtMC42LDAuNi0xLjIsMC44LTEu' +
    'OGMwLjItMC42LDAuNC0xLjEsMC41LTEuN2MwLjEtMC41LDAuMi0xLDAuMy0xLjVjMC4xLTAuNCww' +
    'LjEtMC44LDAuMS0xLjIgYzAtMC4yLDAtMC40LDAuMS0wLjVjMC0wLjIsMC0wLjQsMC0wLjVjMC0w' +
    'LjMsMC0wLjYsMC0wLjhjMC0wLjUsMC0wLjcsMC0wLjdjMC0xLjEsMC45LTIsMi0yczIsMC45LDIs' +
    'MkM2Miw0MCw2Miw0MC4xLDYyLDQwLjF6IiBmaWxsPSIjM0Y1MUI1Ij48YW5pbWF0ZVRyYW5zZm9y' +
    'bSBhdHRyaWJ1dGVOYW1lPSJ0cmFuc2Zvcm0iIGF0dHJpYnV0ZVR5cGU9InhtbCIgZHVyPSIwLjZz' +
    'IiBmcm9tPSIwIDQwIDQwIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgdG89Ii0zNjAgNDAgNDAi' +
    'IHR5cGU9InJvdGF0ZSI+PC9hbmltYXRlVHJhbnNmb3JtPjwvcGF0aD48L3N2Zz4K',
      waitImgSize: {w: 80, h: 80}
    }
  };

  // DefaultSkin extends [Skin](Skin.html)
  DefaultSkin.prototype = $.extend(Object.create(Skin.prototype), DefaultSkin.prototype);

  // Register this class in the list of available skins
  // Register class in Activity.prototype
  Skin.prototype._CLASSES['DefaultSkin'] = DefaultSkin;

  return DefaultSkin;
});
