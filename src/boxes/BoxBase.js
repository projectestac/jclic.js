/**
 *  File    : boxes/BoxBase.js
 *  Created : 12/04/2015
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
  "../Utils",
  "../AWT"
], function ($, Utils, AWT) {

  var defaultValues = Utils.settings.BoxBase;

  /**
   * This class contains all the main visual attributes needed to draw {@link AbstractBox} objects:
   * background and foreground colors, gradients, colors for special states (inactive, alternative,
   * disabled...), margins, fonts, border strokes, etc.
   *
   * Objects derived from {@link AbstractBox} can have inheritance: boxes that act as "containers"
   * of other boxes (like {@link BoxBag}). Most of the attributes of `BoxBase` can be `null`,
   * meaning that the value of the ancestor -or the default value if the box has no ancestors- must
   * be used.
   * @exports BoxBase
   * @class
   * @param {BoxBase=} parent - Another BoxBase object used to determine the value of properties not
   * locally set.
   */
  var BoxBase = function (parent) {
    this.parent = parent ? parent : null;
  };

  BoxBase.prototype = {
    constructor: BoxBase,
    /**
     * The parent BoxBase object
     * @type {BoxBase} */
    parent: null,
    /**
     * Default values
     * @type {object} */
    default: defaultValues,
    /**
     * Original font specification
     * @type {AWT.Font} */
    originalFont: new AWT.Font(),
    /**
     * Font size can be dynamically reduced to fit the available space if any element using this
     * `BoxBase` requests it. When this happen, this field contains the real font currently used
     * to draw text.
     * @type {AWT.Font} */
    font: new AWT.Font(),
    /**
     * The current font size of this BoxBase. Can be dynamically adjusted when drawing.
     * @type {number} */
    dynFontSize: 0,
    /**
     * Counts the number of times the `dynFontSize` has been reset. This is useful to avoid excessive
     * recursive loops searching the optimal font size.
     * @type {number} */
    resetFontCounter: 0,
    /**
     * The background color
     * @type {string} */
    backColor: defaultValues.BACK_COLOR,
    /**
     * The background gradient. Default is `null`.
     * @type {AWT.Gradient} */
    bgGradient: null,
    /**
     * The color used to write text.
     * @type {string} */
    textColor: defaultValues.TEXT_COLOR,
    /**
     * The color used to draw a shadow below regular text.
     * @type {string} */
    shadowColor: defaultValues.SHADOW_COLOR,
    /**
     * The color of the border.
     * @type {string} */
    borderColor: defaultValues.BORDER_COLOR,
    /**
     * The color used to draw text when a cell is in `inactive` state.
     * @type {string} */
    inactiveColor: defaultValues.INACTIVE_COLOR,
    /**
     * The color used to draw text when a cell is in `alternative` state.
     * @type {string} */
    alternativeColor: defaultValues.ALTERNATIVE_COLOR,
    /**
     * Whether the text should have a shadow or not
     * @type {boolean} */
    shadow: false,
    /**
     * Whether the cell's background should be transparent
     * @type {boolean} */
    transparent: false,
    /**
     * The margin to respect between text elements and the limits of the cell or other elements.
     * @type {number} */
    textMargin: defaultValues.AC_MARGIN,
    /**
     * The stroke used to draw the border.
     * @type {AWT.Stroke} */
    borderStroke: new AWT.Stroke(defaultValues.BORDER_STROKE_WIDTH),
    /**
     * The stroke used to draw a border around marked cells.
     * @type {AWT.Stroke} */
    markerStroke: new AWT.Stroke(defaultValues.MARKER_STROKE_WIDTH),
    /**
     * Counter to control the number of times the size of all fonts have been reduced
     * @type {number} */
    resetAllFontsCounter: 0,
    /**
     * `true` when the font size has been reduced.
     * @type {boolean} */
    flagFontReduced: false,
    /**
     *
     * Loads the BoxBase settings from a specific JQuery XML element
     * @param {external:jQuery} $xml - The XML element to parse
     */
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
    /**
     *
     * Gets the value of the specified property, scanning down to parents and prototype if not defined.
     * @param {string} property - The property to retrieve
     * @returns {*} - Depends on the type of property
     */
    get: function (property) {
      if (this.hasOwnProperty(property) || this.parent === null)
        return this[property];
      else
        return this.parent.get(property);
    },
    /**
     *
     * Sets the value of a specific property.
     * @param {string} property - The property name.
     * @param {*} value - Depends on the type of property
     */
    set: function (property, value) {
      this[property] = value;
      return this;
    },
    /**
     *
     * Gets the properties defined in this BoxBase as a collection of CSS attributes
     * @param {object=} css - An optional set of initial CSS properties
     * @param {boolean} inactive - When `true`, get CSS attributes for an inactive cell
     * @param {boolean} inverse - When `true`, get CSS attributes for an inverse cell
     * @param {boolean} alternative - When `true`, get CSS attributes for an alternative cell
     * @returns {object}
     */
    getCSS: function (css, inactive, inverse, alternative) {
      // (css will be created by [AWT.Font.toCss](AWT.html) if null or undefined)
      var font = this.get('font');
      css = font.toCss(css);

      css['color'] = inverse ? this.get('backColor')
          : alternative ? this.get('alternativeColor')
          : this.get('textColor');

      var transparent = this.get('transparent');
      css['background-color'] = transparent ? 'transparent'
          : inactive ? this.get('inactiveColor')
          : inverse ? this.get('textColor') : this.get('backColor');

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
    /**
     * This is utility function computes the width and height of text lines rendered on an HTML
     * __canvas__ element, reducing the font size of the BoxBase as needed when they exceed the maximum
     * width and/or height.
     * @param {external:CanvasRenderingContext2D} ctx - The canvas rendering context used to draw the text.
     * @param {string} text - The text to drawn.
     * @param {number} maxWidth - Maximum width
     * @param {number} maxHeight - Maximum height
     * @returns {object[]} - An array of objects representing lines of text. Each object has ha `text`
     * member with the text displayed in the line, and a `size` member with the line {@link AWT.Dimension}
     */
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

        // Add the line and the calculated dimension to `result`
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
