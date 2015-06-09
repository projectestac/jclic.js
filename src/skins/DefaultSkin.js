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
      'background-image': 'url('+ this.resources.waitGif + ')',
      'background-repeat': 'no-repeat',
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
      // Animated GIF to be shown when loading resources
      waitGif: 'data:image/gif;base64,' +
          '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' +
          'MFGmb/BC1fMmcYkIADs=',
      waitGifSize: {w: 64, h: 64}
    }
  };

  // DefaultSkin extends [Skin](Skin.html)
  DefaultSkin.prototype = $.extend(Object.create(Skin.prototype), DefaultSkin.prototype);

  // Register this class in the list of available skins
  // Register class in Activity.prototype
  Skin.prototype._CLASSES['DefaultSkin'] = DefaultSkin;

  return DefaultSkin;
});
