//    File    : BoxBase.js  
//    Created : 12/04/2015  
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
  "../AWT"
], function ($, Utils, AWT) {

  var defaultValues = Utils.settings.BoxBase;

//
// This class contains all the main visual attributes needed to draw
// [AbstractBox](AbstractBox.html) objects: background and foreground colors
// and gradient, colors for special states (inactive, alternative, disabled...),
// margins, fonts, strokes for borders, etc. Objects derived from [AbstractBox](AbstractBox.html)
// can have inheritance: boxes that act as "containers" of other boxes
// (like [BoxBag](BoxBag.html)). Most of the attributes of `BoxBase` can be `null`,
// meaning that the value of the ancestor -or the default value if the box has no 
// ancestors- must be used.
  var BoxBase = function (parent) {
    this.parent = parent ? parent : null;
  };

  BoxBase.prototype = {
    constructor: BoxBase,
    //
    // The parent BoxBase object
    parent: null,
    //
    // Original font specifications
    originalFont: new AWT.Font(),
    // Font size can be dynamically reduced to fit the available space if any
    // element using this `BoxBase` requests it. The `font` field contains
    // the font currently used to draw text
    font: new AWT.Font(),
    dynFontSize: 0,
    resetFontCounter: 0,
    //
    // Colors, gradients, shadows, margins, borders and transparencies:
    backColor: defaultValues.BACK_COLOR,
    bgGradient: null,
    textColor: defaultValues.TEXT_COLOR,
    shadowColor: defaultValues.SHADOW_COLOR,
    borderColor: defaultValues.BORDER_COLOR,
    inactiveColor: defaultValues.INACTIVE_COLOR,
    alternativeColor: defaultValues.ALTERNATIVE_COLOR,
    shadow: false,
    transparent: false,
    textMargin: defaultValues.AC_MARGIN,
    borderStroke: new AWT.Stroke(defaultValues.BORDER_STROKE_WIDTH),
    markerStroke: new AWT.Stroke(defaultValues.MARKER_STROKE_WIDTH),
    //
    // Loads the object settings from a specific JQuery XML element 
    setProperties: function ($xml) {

      var bb = this;
      //
      // Read attributes
      $.each($xml.get(0).attributes, function () {
        var name = this.name;
        var val = this.value;
        switch (this.name) {
          case 'shadow':
          case 'transparent':
            bb[name] = Utils.getBoolean(val, false);
            break;
          case 'margin':
            bb[name] = Number(val);
            break;
          case 'borderStroke':
            bb.borderStroke = new AWT.Stroke(Number(val));
            break;
          case 'markerStroke':
            bb.markerStroke = new AWT.Stroke(Number(val));
            break;
        }
      });
      //
      // Read inner elements
      $xml.children().each(function () {
        var $node = $(this);
        switch (this.nodeName) {
          case 'font':
            bb.font = (new AWT.Font()).setProperties($node);
            bb.originalFont = Utils.cloneObject(bb.font);
            break;

          case 'gradient':
            bb.bgGradient = new AWT.Gradient().setProperties($node);
            break;

          case 'color':
            bb.textColor = Utils.checkColor($node.attr('foreground'), bb.textColor);
            bb.backColor = Utils.checkColor($node.attr('background'), bb.backColor);
            bb.shadowColor = Utils.checkColor($node.attr('shadow'), bb.shadowColor);
            bb.inactiveColor = Utils.checkColor($node.attr('inactive'), bb.inactiveColor);
            bb.alternativeColor = Utils.checkColor($node.attr('alternative'), bb.alternativeColor);
            bb.borderColor = Utils.checkColor($node.attr('border'), bb.borderColor);
            break;
        }
      });
      return this;
    },
    //
    // Utility functions:
    // 
    // Get property value, scanning down to prototype if not defined
    get: function (property) {
      if (this.hasOwnProperty(property) || this.parent === null)
        return this[property];
      else
        return this.parent.get(property);
    },
    //
    // Default values
    default: defaultValues,
    // Global static variables. Modify it only through `BoxBase.prototype`
    resetAllFontsCounter: 0,
    flagFontReduced: false,
    //
    // Get properties as a collection of CSS attributes
    getCSS: function (css) {
      // (css will ne created by [AWT.Font.toCss](AWT.html) if null or undefined)
      var font = this.get('font');
      css = font.toCss(css);

      css['color'] = this.get('textColor');

      var transparent = this.get('transparent');
      css['background-color'] = transparent ? 'transparent' : this.get('backColor');

      var bgGradient = this.get('bgGradient');
      if (bgGradient && !transparent)
        css['background-image'] = bgGradient.getCss();

      if (this.shadow === 1) {
        var delta = Math.max(1, Math.round(font.size / 10));
        var color = this.get('shadowColor');
        css['text-shadow'] = delta + 'px ' + delta + 'px 3px ' + color;
      }

      return css;
    },
    // Utility methods used to display text on HTML Canvas elements
    //
    // Computes the width and height of a text rendered on a HTML Canvas element,
    // reducing the `font` size of the BoxBase if it don fit in the specified
    // maxWidth and maxHeight
    prepareText: function (ctx, text, maxWidth, maxHeight) {
      var result = [];
      var height = this.font.getHeight();
      var totalHeight = 0;

      // divide the text in lines
      var lines = text.trim().split('\n');
      ctx.font = this.font.cssFont();
      for (var l = 0; l < lines.length; l++) {
        var line = lines[l].trim();
        var width = ctx.measureText(line).width;
        if (width > maxWidth) {
          // retain the last string offset that was inside maxWidth
          var lastOK = 0;
          var lastOKWidth = 0;
          for (var p = 0; p < line.length; p++) {
            // Find next separator
            if (Utils.isSeparator(line[p])) {
              var w = ctx.measureText(line.substr(0, p).trim()).width;
              if (w > maxWidth)
                break;
              lastOK = p;
              lastOKWidth = w;
            }
          }
          if (lastOK > 0) {
            // Add a new line with the tail of the line
            lines.splice(l + 1, 0, line.substr(lastOK + 1).trim());
            // Adjust the current line
            line = lines[l] = line.substr(0, lastOK).trim();
            width = lastOKWidth;
          }
          else {
            // No solution found. Try resizing down the font.
            if (this.font.size > defaultValues.MIN_FONT_SIZE) {
              this.font.setSize(this.font.size - 1);
              this.flagFontReduced = true;
              return this.prepareText(ctx, text, maxWidth, maxHeight);
            }
          }
        }

        // Add the line and the calculed dimension to `result`
        result.push({
          text: line,
          size: new AWT.Dimension(width, height)
        });

        totalHeight += height;

        if (totalHeight > maxHeight && this.font.size > defaultValues.MIN_FONT_SIZE) {
          // Max height exceeded. Try resizing down the font
          this.font.setSize(this.font.size - 1);
          this.flagFontReduced = true;
          return this.prepareText(ctx, text, maxWidth, maxHeight);
        }
      }
      return result;
    }
  };

  BoxBase.prototype.defaultBoxBase = new BoxBase();

  return BoxBase;
});
