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
  "require",
  "jquery",
  "../AWT",
  "./Skin"
], function (require, $, AWT, nullSkin) {

  // Definition of [Skin](Skin.html) class delegated to a later call to
  // `require`, to avoid circular references
  var Skin;
  require(["./Skin"], function (aRealSkin) {
    Skin = aRealSkin;
  });

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

    /*
    var thisSkin = this;
    this.buttons.prev = $('<object type="image/svg+xml"/>').on('click',
    function(evt){
      if(thisSkin.ps)
        // TODO: Check if we need to pass the action in action's method
        thisSkin.ps.actions.prev.processEvent(thisSkin.ps.actions.prev, evt);
    });
    this.buttons.prev.data = this.resources.prevBtn;
    this.$div.append(this.buttons.prev);
    
    this.buttons.next = $('<object type="image/svg+xml"/>').on('click',
    function(evt){
      if(thisSkin.ps)
        // TODO: Check if we need to pass the action in action's method
        thisSkin.ps.actions.next.processEvent(thisSkin.ps.actions.next, evt);
    });
    this.buttons.next.data = this.resources.nextBtn;
    this.$div.append(this.buttons.next);    
    */
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
    // Main method used to build the contents
    // Resizes and places internal objects
    doLayout: function () {
      
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
      this.msgBox.repaint();
    },
    //
    // Gets the [ActiveBox](ActiveBox.html) used by activities to display the main message
    getMsgBox: function(){
      return this.msgBox;
    },
    //
    // Graphical resources used by this skin
    resources: {
      //
      // SVG image for the 'previous activity' button
      // See `/misc/skin/default` for original Inkscape images
      prevBtn: 'data:image/svg+xml;base64,' +
          'PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIGhlaWdodD0iNjAiIGlk' +
          'PSJzdmczMDk4IiB2ZXJzaW9uPSIxLjEiIHdpZHRoPSI0MiIgeG1sbnM9Imh0dHA6Ly93d3cudzMu' +
          'b3JnLzIwMDAvc3ZnIiB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIiB4' +
          'bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnJkZj0iaHR0' +
          'cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyIgeG1sbnM6c3ZnPSJodHRw' +
          'Oi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnMgaWQ9ImRlZnMzMTAwIj48L2RlZnM+PG1ldGFk' +
          'YXRhIGlkPSJtZXRhZGF0YTMxMDMiPjxyZGY6UkRGPjxjYzpXb3JrIHJkZjphYm91dD0iIj48ZGM6' +
          'Zm9ybWF0PmltYWdlL3N2Zyt4bWw8L2RjOmZvcm1hdD48ZGM6dHlwZSByZGY6cmVzb3VyY2U9Imh0' +
          'dHA6Ly9wdXJsLm9yZy9kYy9kY21pdHlwZS9TdGlsbEltYWdlIj48L2RjOnR5cGU+PGRjOnRpdGxl' +
          'PjwvZGM6dGl0bGU+PC9jYzpXb3JrPjwvcmRmOlJERj48L21ldGFkYXRhPjxnIGlkPSJsYXllcjEi' +
          'IHRyYW5zZm9ybT0idHJhbnNsYXRlKDAsLTQpIj48cGF0aCBkPSJtIDM5Ljg5MTcyMSw4LjYyMjA0' +
          'NzEgYyAyLjc3MDI1NSwyLjYxNzIxMTkgMi4zNTY3NzMsMTUuMDg1NjMwOSAyLjQ2NDk5MSwxOC44' +
          'OTUxNDQ5IDAuMTA4MjE3LDMuODA5NTEzIDEuMjI4ODQ2LDE2LjIzNDM1MiAtMS4zODgzNjYsMTku' +
          'MDA0NjA3IC0yLjYxNzIxMiwyLjc3MDI1NCAtMTUuMDg1NjMxLDIuMzU2NzczIC0xOC44OTUxNDQs' +
          'Mi40NjQ5OSBDIDE4LjI2MzY4OCw0OS4wOTUwMDYgNS44Mzg4NDg2LDUwLjIxNTYzNSAzLjA2ODU5' +
          'NDIsNDcuNTk4NDIzIDAuMjk4MzM5ODcsNDQuOTgxMjEyIDAuNzExODIxNTUsMzIuNTEyNzkzIDAu' +
          'NjAzNjA0MDcsMjguNzAzMjc5IDAuNDk1Mzg2NTgsMjQuODkzNzY1IC0wLjYyNTI0MTk3LDEyLjQ2' +
          'ODkyNiAxLjk5MTk2OTgsOS42OTg2NzE2IDQuNjA5MTgxNSw2LjkyODQxNzIgMTcuMDc3Niw3LjM0' +
          'MTg5ODkgMjAuODg3MTE0LDcuMjMzNjgxNCAyNC42OTY2MjgsNy4xMjU0NjM5IDM3LjEyMTQ2Nyw2' +
          'LjAwNDgzNTQgMzkuODkxNzIxLDguNjIyMDQ3MSB6IiBpZD0iZm9ucyIgc3R5bGU9Im9wYWNpdHk6' +
          'MC44O2ZpbGw6I2U3ZDNkMDtmaWxsLW9wYWNpdHk6MTtzdHJva2U6I2QzMmIzZDtzdHJva2Utb3Bh' +
          'Y2l0eToxIiB0cmFuc2Zvcm09Im1hdHJpeCgwLjk2MTQyMTY1LDAsMCwwLjk2MTQyMTY1LDAuMzc0' +
          'MTIzNjUsNi42Mjk5MDExKSI+PC9wYXRoPjxwYXRoIGQ9Ik0gMjAuNjg1OTQsNi4xMTg4MjY0IDIw' +
          'Ljk3NjUyNiwzNS43NjA2NDggLTQuODM5MzM4LDIxLjE5MTM5MyB6IiBpZD0iZmxldHhhIiBvbm1v' +
          'dXNlb3V0PSJldnQudGFyZ2V0LnNldEF0dHJpYnV0ZSgnc3R5bGUnLCBldnQudGFyZ2V0LmdldEF0' +
          'dHJpYnV0ZSgnc3R5bGUnKS5yZXBsYWNlKC9vcGFjaXR5OlxkKyhcLlxkKykvZywgJ29wYWNpdHk6' +
          'MC41JykpOyIgb25tb3VzZW92ZXI9ImV2dC50YXJnZXQuc2V0QXR0cmlidXRlKCdzdHlsZScsIGV2' +
          'dC50YXJnZXQuZ2V0QXR0cmlidXRlKCdzdHlsZScpLnJlcGxhY2UoL29wYWNpdHk6XGQrKFwuXGQr' +
          'KS9nLCAnb3BhY2l0eToxLjAnKSk7IiBzdHlsZT0ib3BhY2l0eTowLjU7ZmlsbDojMDEzMzk3O2Zp' +
          'bGwtb3BhY2l0eToxO3N0cm9rZTpub25lIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMS4wOTA5MDks' +
          'MTIuMzYzNjM3KSI+PC9wYXRoPjwvZz48L3N2Zz4K',
      //
      // SVG image for the 'next activity' button
      // See `/misc/skin/default` for original Inkscape images
      nextBtn: 'data:image/svg+xml;base64,' +
          'PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIGhlaWdodD0iNjAiIGlk' +
          'PSJzdmczMDk4IiB2ZXJzaW9uPSIxLjEiIHdpZHRoPSI0MiIgeG1sbnM9Imh0dHA6Ly93d3cudzMu' +
          'b3JnLzIwMDAvc3ZnIiB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIiB4' +
          'bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnJkZj0iaHR0' +
          'cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyIgeG1sbnM6c3ZnPSJodHRw' +
          'Oi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnMgaWQ9ImRlZnMzMTAwIj48L2RlZnM+PG1ldGFk' +
          'YXRhIGlkPSJtZXRhZGF0YTMxMDMiPjxyZGY6UkRGPjxjYzpXb3JrIHJkZjphYm91dD0iIj48ZGM6' +
          'Zm9ybWF0PmltYWdlL3N2Zyt4bWw8L2RjOmZvcm1hdD48ZGM6dHlwZSByZGY6cmVzb3VyY2U9Imh0' +
          'dHA6Ly9wdXJsLm9yZy9kYy9kY21pdHlwZS9TdGlsbEltYWdlIj48L2RjOnR5cGU+PGRjOnRpdGxl' +
          'PjwvZGM6dGl0bGU+PC9jYzpXb3JrPjwvcmRmOlJERj48L21ldGFkYXRhPjxnIGlkPSJsYXllcjEi' +
          'IHRyYW5zZm9ybT0idHJhbnNsYXRlKDAsLTQpIj48cGF0aCBkPSJtIDM5Ljg5MTcyMSw4LjYyMjA0' +
          'NzEgYyAyLjc3MDI1NSwyLjYxNzIxMTkgMi4zNTY3NzMsMTUuMDg1NjMwOSAyLjQ2NDk5MSwxOC44' +
          'OTUxNDQ5IDAuMTA4MjE3LDMuODA5NTEzIDEuMjI4ODQ2LDE2LjIzNDM1MiAtMS4zODgzNjYsMTku' +
          'MDA0NjA3IC0yLjYxNzIxMiwyLjc3MDI1NCAtMTUuMDg1NjMxLDIuMzU2NzczIC0xOC44OTUxNDQs' +
          'Mi40NjQ5OSBDIDE4LjI2MzY4OCw0OS4wOTUwMDYgNS44Mzg4NDg2LDUwLjIxNTYzNSAzLjA2ODU5' +
          'NDIsNDcuNTk4NDIzIDAuMjk4MzM5ODcsNDQuOTgxMjEyIDAuNzExODIxNTUsMzIuNTEyNzkzIDAu' +
          'NjAzNjA0MDcsMjguNzAzMjc5IDAuNDk1Mzg2NTgsMjQuODkzNzY1IC0wLjYyNTI0MTk3LDEyLjQ2' +
          'ODkyNiAxLjk5MTk2OTgsOS42OTg2NzE2IDQuNjA5MTgxNSw2LjkyODQxNzIgMTcuMDc3Niw3LjM0' +
          'MTg5ODkgMjAuODg3MTE0LDcuMjMzNjgxNCAyNC42OTY2MjgsNy4xMjU0NjM5IDM3LjEyMTQ2Nyw2' +
          'LjAwNDgzNTQgMzkuODkxNzIxLDguNjIyMDQ3MSB6IiBpZD0iZm9ucyIgc3R5bGU9Im9wYWNpdHk6' +
          'MC44O2ZpbGw6I2U3ZDNkMDtmaWxsLW9wYWNpdHk6MTtzdHJva2U6I2QzMmIzZDtzdHJva2Utb3Bh' +
          'Y2l0eToxIiB0cmFuc2Zvcm09Im1hdHJpeCgwLjk2MTc0NDM5LDAuMDI4NjQ1MDksLTAuMDI4Mzk1' +
          'MjIsMC45NjAyNTMyOSwxLjE2NTM4NzQsNi4wNDc0NDMyKSI+PC9wYXRoPjxwYXRoIGQ9Ik0gMjAu' +
          'Njg1OTQsNi4xMTg4MjY0IDIwLjk3NjUyNiwzNS43NjA2NDggLTQuODM5MzM4LDIxLjE5MTM5MyB6' +
          'IiBpZD0iZmxldHhhIiBvbm1vdXNlb3V0PSJldnQudGFyZ2V0LnNldEF0dHJpYnV0ZSgnc3R5bGUn' +
          'LCBldnQudGFyZ2V0LmdldEF0dHJpYnV0ZSgnc3R5bGUnKS5yZXBsYWNlKC9vcGFjaXR5OlxkKyhc' +
          'LlxkKykvZywgJ29wYWNpdHk6MC41JykpOyIgb25tb3VzZW92ZXI9ImV2dC50YXJnZXQuc2V0QXR0' +
          'cmlidXRlKCdzdHlsZScsIGV2dC50YXJnZXQuZ2V0QXR0cmlidXRlKCdzdHlsZScpLnJlcGxhY2Uo' +
          'L29wYWNpdHk6XGQrKFwuXGQrKS9nLCAnb3BhY2l0eToxLjAnKSk7IiBzdHlsZT0ib3BhY2l0eTow' +
          'LjU7ZmlsbDojMDEzMzk3O2ZpbGwtb3BhY2l0eToxO3N0cm9rZTpub25lIiB0cmFuc2Zvcm09Im1h' +
          'dHJpeCgwLjQ0NTg4NzUxLDAuODk1MDg5MDEsLTAuODk1MDg5MDEsMC40NDU4ODc1MSwzMi40NjEw' +
          'NjQsMTIuNzA3NDUxKSI+PC9wYXRoPjwvZz48L3N2Zz4K'
    }
  };

  return function () {
    
    // DefaultSkin extends [Skin](Skin.html)
    DefaultSkin.prototype = $.extend(Object.create(Skin.prototype), DefaultSkin.prototype);
    
    return DefaultSkin;
  };

});
