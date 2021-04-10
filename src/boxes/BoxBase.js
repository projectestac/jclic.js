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
 *  @license EUPL-1.2
 *  @licstart
 *  (c) 2000-2020 Catalan Educational Telematic Network (XTEC)
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
 *  @module
 */

import $ from 'jquery';
import { settings, attrForEach, getBoolean, checkColor, getAttr, setAttr, cloneObject, isSeparator } from '../Utils';
import { Stroke, Gradient, Font, Dimension } from '../AWT';

const defaultValues = settings.BoxBase;

/**
 * This class contains all the main visual attributes needed to draw {@link module:boxes/AbstractBox.AbstractBox AbstractBox} objects:
 * background and foreground colors, gradients, colors for special states (inactive, alternative,
 * disabled...), margins, fonts, border strokes, etc.
 *
 * Objects derived from {@link module:boxes/AbstractBox.AbstractBox AbstractBox} can have inheritance: boxes that act as "containers"
 * of other boxes (like {@link module:boxes/BoxBag.BoxBag BoxBag}). Most of the attributes of `BoxBase` can be `null`,
 * meaning that the value of the ancestor -or the default value if the box has no ancestors- must
 * be used.
 */
export class BoxBase {
  /**
   * BoxBase constructor
   * @param {module:boxes/BoxBase.BoxBase} [parent] - Another BoxBase object used to determine the value of properties not
   * locally set.
   */
  constructor(parent) {
    this.parent = parent || null;
  }

  /**
   * Loads the BoxBase settings from a specific JQuery XML element
   * @param {external:jQuery} $xml - The XML element to parse
   */
  setProperties($xml) {
    //
    // Read attributes
    attrForEach($xml.get(0).attributes, (name, val) => {
      switch (name) {
        case 'shadow':
        case 'transparent':
          this[name] = getBoolean(val, false);
          break;
        case 'margin':
          this[name] = Number(val);
          break;
        case 'borderStroke':
          this.borderStroke = new Stroke(Number(val));
          break;
        case 'markerStroke':
          this.markerStroke = new Stroke(Number(val));
          break;
      }
    });
    //
    // Read inner elements
    $xml.children().each((_n, child) => {
      const $node = $(child);
      switch (child.nodeName) {
        case 'font':
          this.font = (new Font()).setProperties($node);
          break;

        case 'gradient':
          this.bgGradient = new Gradient().setProperties($node);
          break;

        case 'color':
          this.textColor = checkColor($node.attr('foreground'), this.textColor);
          this.backColor = checkColor($node.attr('background'), this.backColor);
          this.shadowColor = checkColor($node.attr('shadow'), this.shadowColor);
          this.inactiveColor = checkColor($node.attr('inactive'), this.inactiveColor);
          this.alternativeColor = checkColor($node.attr('alternative'), this.alternativeColor);
          this.borderColor = checkColor($node.attr('border'), this.borderColor);
          break;
      }
    });
    return this;
  }

  /**
   * Gets a object with the basic attributes needed to rebuild this instance excluding functions,
   * parent references, constants and also attributes retaining the default value.
   * The resulting object is commonly usued to serialize elements in JSON format.
   * @returns {object} - The resulting object, with minimal attrributes
   */
  getAttributes() {
    return getAttr(this, [
      'shadow', 'transparent', 'margin',
      'borderStroke', 'markerStroke', // AWT.Stroke
      'font', // AWT.Font
      'bgGradient', // AWT.Gradient
      `textColor|${BoxBase.prototype.textColor}`,
      `backColor|${BoxBase.prototype.backColor}`,
      `shadowColor|${BoxBase.prototype.shadowColor}`,
      `inactiveColor|${BoxBase.prototype.inactiveColor}`,
      `alternativeColor|${BoxBase.prototype.alternativeColor}`,
      `borderColor|${BoxBase.prototype.borderColor}`,
    ]);
  }

  /**
   * Reads the properties of this BoxBase from a data object
   * @param {object} data - The data object to be parsed
   * @returns {module:boxes/BoxBase.BoxBase}
   */
  setAttributes(data) {
    return setAttr(this, data, [
      'shadow', 'transparent', 'margin',
      { key: 'borderStroke', fn: Stroke },
      { key: 'markerStroke', fn: Stroke },
      { key: 'font', fn: Font },
      { key: 'bgGradient', fn: Gradient },
      'textColor',
      'backColor',
      'shadowColor',
      'inactiveColor',
      'alternativeColor',
      'borderColor',
    ]);
  }

  /**
   * Gets the value of the specified property, scanning down to parents and prototype if not defined.
   * @param {string} property - The property to retrieve
   * @returns {any} - The object or value associated to this property
   */
  get(property) {
    if (this.hasOwnProperty(property) || this.parent === null)
      return this[property];
    else
      return this.parent.get(property);
  }

  /**
   * Sets the value of a specific property.
   * @param {string} property - The property name.
   * @param {any} value - Depends on the type of property
   */
  set(property, value) {
    this[property] = value;
    return this;
  }

  /**
   * Gets the value of the specified property, scanning down to parents if not defined, and returning
   * always an own property (not from prototype)
   * @param {string} property - The property to retrieve
   * @returns {any} - The object or value associated to this property
   */
  getOwn(property) {
    if (this.hasOwnProperty(property))
      return this[property];
    else if (this.parent !== null)
      return this.parent.getOwn(property);
    else {
      if (typeof this[property] === 'object')
        this[property] = cloneObject(BoxBase.prototype[property]);
      else
        this[property] = BoxBase.prototype[property];
    }
    return this[property];
  }

  /**
   * Gets the properties defined in this BoxBase as a collection of CSS attributes
   * @param {object} [css] - An optional set of initial CSS properties
   * @param {boolean} [inactive=false] - When `true`, get CSS attributes for an inactive cell
   * @param {boolean} [inverse=false] - When `true`, get CSS attributes for an inverse cell
   * @param {boolean} [alternative=false] - When `true`, get CSS attributes for an alternative cell
   * @returns {object}
   */
  getCSS(css, inactive = false, inverse = false, alternative = false) {
    // (css will be created by [AWT.Font.toCss](AWT.html) if null or undefined)
    const font = this.get('font');
    css = font.toCss(css);

    css['color'] = inverse ? this.get('backColor')
      : alternative ? this.get('alternativeColor')
        : this.get('textColor');

    const transparent = this.get('transparent');
    css['background-color'] = transparent ? 'transparent'
      : inactive ? this.get('inactiveColor')
        : inverse ? this.get('textColor') : this.get('backColor');

    const bgGradient = this.get('bgGradient');
    if (bgGradient && !transparent)
      css['background-image'] = bgGradient.getCss();

    if (this.shadow === 1) {
      const delta = Math.max(1, Math.round(font.size / 10));
      const color = this.get('shadowColor');
      css['text-shadow'] = `${delta}px ${delta}px 3px ${color}`;
    }
    return css;
  }

  /**
   * This utility method computes the width and height of text lines rendered on an HTML
   * __canvas__ element, reducing the font size of the BoxBase as needed when they exceed the maximum
   * width and/or height.
   * @param {external:CanvasRenderingContext2D} ctx - The canvas rendering context used to draw the text.
   * @param {string} text - The text to drawn.
   * @param {number} maxWidth - Maximum width
   * @param {number} maxHeight - Maximum height
   * @returns {object[]} - An array of objects representing lines of text. Each object has a `text`
   * member with the text displayed in the line, and a `size` member with the line {@link module:AWT.Dimension}
   */
  prepareText(ctx, text, maxWidth, maxHeight) {
    const
      result = [],
      font = this.get('font'),
      height = font.getHeight();
    let totalHeight = 0;

    // divide the text in lines
    const lines = text.trim().split('\n');
    ctx.font = font.cssFont();
    for (let l = 0; l < lines.length; l++) {
      let line = lines[l].trim();
      let width = ctx.measureText(line).width;
      if (width > maxWidth) {
        // retain the last string offset that was inside maxWidth
        let
          lastOK = 0,
          lastOKWidth = 0;
        for (let p = 0; p < line.length; p++) {
          // Find next separator
          if (isSeparator(line[p])) {
            const w = ctx.measureText(line.substr(0, p).trim()).width;
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
          if (font.size > defaultValues.MIN_FONT_SIZE) {
            this.getOwn('font').zoom(-1);
            return this.prepareText(ctx, text, maxWidth, maxHeight);
          }
        }
      }

      // Add the line and the calculated dimension to `result`
      result.push({
        text: line,
        size: new Dimension(width, height)
      });

      totalHeight += height;

      if (totalHeight > maxHeight && font.size > defaultValues.MIN_FONT_SIZE) {
        // Max height exceeded. Try resizing down the font
        this.getOwn('font').zoom(-1);
        return this.prepareText(ctx, text, maxWidth, maxHeight);
      }
    }
    return result;
  }
}

Object.assign(BoxBase.prototype, {
  /**
   * The parent BoxBase object
   * @name module:boxes/BoxBase.BoxBase#parent
   * @type {module:boxes/BoxBase.BoxBase} */
  parent: null,
  /**
   * Default values
   * @name module:boxes/BoxBase.BoxBase#defaultValues
   * @type {object} */
  default: defaultValues,
  /**
   * Font size can be dynamically reduced to fit the available space if any element using this
   * `BoxBase` requests it. When this happen, this field contains the real font currently used
   * to draw text.
   * @name module:boxes/BoxBase.BoxBase#font
   * @type {module:AWT.Font} */
  font: new Font(),
  /**
   * The current font size of this BoxBase. Can be dynamically adjusted when drawing.
   * @name module:boxes/BoxBase.BoxBase#dynFontSize
   * @type {number} */
  dynFontSize: 0,
  /**
   * Counts the number of times the `dynFontSize` has been reset. This is useful to avoid excessive
   * recursive loops searching the optimal font size.
   * @name module:boxes/BoxBase.BoxBase#resetFontCounter
   * @type {number} */
  resetFontCounter: 0,
  /**
   * The background color
   * @name module:boxes/BoxBase.BoxBase#backColor
   * @type {string} */
  backColor: defaultValues.BACK_COLOR,
  /**
   * The background gradient. Default is `null`.
   * @name module:boxes/BoxBase.BoxBase#bgGradient
   * @type {module:AWT.Gradient} */
  bgGradient: null,
  /**
   * The color used to write text.
   * @name module:boxes/BoxBase.BoxBase#textColor
   * @type {string} */
  textColor: defaultValues.TEXT_COLOR,
  /**
   * The color used to draw a shadow below regular text.
   * @name module:boxes/BoxBase.BoxBase#shadowColor
   * @type {string} */
  shadowColor: defaultValues.SHADOW_COLOR,
  /**
   * The color of the border.
   * @name module:boxes/BoxBase.BoxBase#borderColor
   * @type {string} */
  borderColor: defaultValues.BORDER_COLOR,
  /**
   * The color used to draw text when a cell is in `inactive` state.
   * @name module:boxes/BoxBase.BoxBase#inactiveColor
   * @type {string} */
  inactiveColor: defaultValues.INACTIVE_COLOR,
  /**
   * The color used to draw text when a cell is in `alternative` state.
   * @name module:boxes/BoxBase.BoxBase#alternativeColor
   * @type {string} */
  alternativeColor: defaultValues.ALTERNATIVE_COLOR,
  /**
   * Whether the text should have a shadow or not
   * @name module:boxes/BoxBase.BoxBase#shadow
   * @type {boolean} */
  shadow: false,
  /**
   * Whether the cell's background (and its hosted component, if any) should be transparent
   * @name module:boxes/BoxBase.BoxBase#transparent
   * @type {boolean} */
  transparent: false,
  /**
   * Wheter the cell's background should be painted or not. This property has no effect on
   * hosted components.
   * @name module:boxes/BoxBase.BoxBase#dontFill
   * @type {boolean} */
  dontFill: false,
  /**
   * The margin to respect between text elements and the limits of the cell or other elements.
   * @name module:boxes/BoxBase.BoxBase#textMargin
   * @type {number} */
  textMargin: defaultValues.AC_MARGIN,
  /**
   * The stroke used to draw the border.
   * @name module:boxes/BoxBase.BoxBase#borderStroke
   * @type {module:AWT.Stroke} */
  borderStroke: new Stroke(defaultValues.BORDER_STROKE_WIDTH),
  /**
   * The stroke used to draw a border around marked cells.
   * @name module:boxes/BoxBase.BoxBase#markerStroke
   * @type {module:AWT.Stroke} */
  markerStroke: new Stroke(defaultValues.MARKER_STROKE_WIDTH),
});

BoxBase.DEFAULT_BOX_BASE = new BoxBase();

export default BoxBase;
