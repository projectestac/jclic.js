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
        width: wMsgBox + 'px',
        height: h + 'px',
        top: 2 * margin + playerHeight + 'px',
        left: 2 * margin + prv.w + 'px',
        'background-color': 'lightblue'
      });

      this.buttons.prev.css({
        position: 'absolute',
        top: 2 * margin + playerHeight + (h - prv.h) / 2 + 'px',
        left: margin + 'px'
      });

      this.buttons.next.css({
        position: 'absolute',
        top: 2 * margin + playerHeight + (h - nxt.h) / 2 + 'px',
        left: w + margin - nxt.w + 'px'
      });

      this.$msgBoxDivCanvas = $('<canvas width="' + wMsgBox + '" height="' + h + '"/>');
      this.$msgBoxDiv.append(this.$msgBoxDivCanvas);
      this.msgBox.setBounds(new AWT.Rectangle(0, 0, wMsgBox, h));
      this.msgBox.ctx = this.$msgBoxDivCanvas.get(0).getContext('2d');
      this.msgBox.repaint();
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
      nextBtnSize: {w: 48, h: 48}
    }
  };

  // DefaultSkin extends [Skin](Skin.html)
  DefaultSkin.prototype = $.extend(Object.create(Skin.prototype), DefaultSkin.prototype);

  // Register this class in the list of available skins
  // Register class in Activity.prototype
  Skin.prototype._CLASSES['DefaultSkin'] = DefaultSkin;

  return DefaultSkin;
});
