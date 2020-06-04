/**
 *  File    : shapers/Shaper.js
 *  Created : 13/04/2015
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
 *  (c) 2000-2020 Educational Telematic Network of Catalonia (XTEC)
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
import { log, attrForEach, getBoolean, getAttr, setAttr } from '../Utils';
import { Shape, Rectangle, Ellipse, PathStroke, Path } from '../AWT';

/**
 * The function of this class and its subclasses is to draw a set of "shapes" that will be used to
 * place {@link module:boxes/ActiveBox.ActiveBox ActiveBox} objects at a specific position, and to determine its dimension and
 * appearance.
 */
export class Shaper {
  /**
   * Shaper constructor
   * @param {number} nx - Number of columns (in grid-based shapers)
   * @param {number} ny - Number of rows (in grid-based shapers)
   */
  constructor(nx, ny) {
    this.reset(nx, ny);
  }

  /**
   * Registers a new type of shaper
   * @param {string} shaperName - The name used to identify this shaper
   * @param {function} shaperClass - The shaper class, usually extending Shaper
   * @returns {module:shapers/Shaper.Shaper} - The provided shaper class
   */
  static registerClass(shaperName, shaperClass) {
    Shaper.CLASSES[shaperName] = shaperClass;
    return shaperClass;
  }

  /**
   * Factory constructor that returns a Shaper of the requested class.
   * @param {string} className - The class name of the requested Shaper.
   * @param {number} nx - Number of columns (in grid-based shapers)
   * @param {number} ny - Number of rows (in grid-based shapers)
   * @returns {module:shapers/Shaper.Shaper}
   */
  static getShaper(className, nx, ny) {
    const cl = Shaper.CLASSES[(className || '').replace(/^edu\.xtec\.jclic\.shapers\./, '@')];
    if (!cl)
      log('error', `Unknown shaper: ${className}`);
    return cl ? new cl(nx, ny) : null;
  }

  /**
   * Initializes this Shaper to default values
   * @param {number} nCols - Number of columns
   * @param {number} nRows - Number of rows
   */
  reset(nCols, nRows) {
    this.nCols = nCols;
    this.nRows = nRows;
    this.nCells = nRows * nCols;
    this.initiated = false;
    this.shapeData = [];
    for (let i = 0; i < this.nCells; i++)
      this.shapeData[i] = new Shape();
  }

  /**
   * Loads this shaper settings from a specific JQuery XML element
   * @param {external:jQuery} $xml - The XML element with the shaper data
   */
  setProperties($xml) {
    attrForEach($xml.get(0).attributes, (name, value) => {
      switch (name) {
        case 'class':
          this.className = value;
          break;
        case 'cols':
          this.nCols = Number(value);
          break;
        case 'rows':
          this.nRows = Number(value);
          break;
        case 'baseWidthFactor':
        case 'toothHeightFactor':
        case 'scaleX':
        case 'scaleY':
          this[name] = Number(value);
          break;
        case 'randomLines':
        case 'showEnclosure':
          this[name] = getBoolean(value, true);
          break;
      }
    });

    // Reads the 'enclosing'
    // (main shape area where the other shape elements are placed)
    $xml.children('enclosing:first').each((_n, child) => {
      $(child).children('shape:first').each((_n, child2) => {
        let sh = Shaper.readShapeData(child2, this.scaleX, this.scaleY);
        this.enclosing = sh;
        this.showEnclosure = true;
        this.hasRemainder = true;
      });
    });

    // Read the shape elements
    $xml.children('shape').each((n, child) => {
      this.shapeData[n] = Shaper.readShapeData(child, this.scaleX, this.scaleY);
    });

    // Correction needed for '@Holes' shaper
    if (this.shapeData.length > 0 /* && this.shapeData.length !== this.nRows * this.nCols */) {
      //this.nRows = this.shapeData.length
      //this.nCols = 1
      //this.nCells = this.nCols * this.nRows
      this.nCells = this.shapeData.length;
    }
    return this;
  }

  /**
   * Reads an individual shape from an XML element.
   * Shapes are arrays of `stroke` objects.
   * Each `stroke` has an `action` (_move to_, _line to_, _quad to_...) and associated `data`.
   * @param {external:jQuery} $xml - The XML element with the shape data
   * @param {number} scaleX
   * @param {number} scaleY
   * @returns {module:AWT.Shape}
   */
  static readShapeData(xml, scaleX, scaleY) {
    const shd = [];
    let result = null;
    $.each(xml.textContent.split('|'), (_n, txt) => {
      const sd = txt.split(':');
      // Possible strokes are: `rectangle`, `ellipse`, `M`, `L`, `Q`, `B`, `X`
      // Also possible, but not currently used in JClic: `roundRectangle` and `pie`
      let data = sd.length > 1 ? sd[1].split(',') : null;
      //
      // Data should be always divided by the scale (X or Y)
      if (data)
        data = data.map((d, n) => d / (n % 2 ? scaleY : scaleX));

      switch (sd[0]) {
        case 'rectangle':
          result = new Rectangle(data[0], data[1], data[2], data[3]);
          break;
        case 'ellipse':
          result = new Ellipse(data[0], data[1], data[2], data[3]);
          break;
        default:
          // It's an `AWT.PathStroke`
          shd.push(new PathStroke(sd[0], data));
          break;
      }
    });

    return !result && shd.length > 0 ? new Path(shd) : result;
  }

  /**
   * Gets a object with the basic attributes needed to rebuild this instance excluding functions,
   * parent references, constants and also attributes retaining the default value.
   * The resulting object is commonly usued to serialize elements in JSON format.
   * @returns {object} - The resulting object, with minimal attrributes
   */
  getAttributes() {
    const fields = [
      'className', 'nCols', 'nRows',
      'baseWidthFactor', 'toothHeightFactor',
      'scaleX', 'scaleY',
      'randomLines',
    ];

    if (this.customShapes) {
      ['showEnclosure', 'hasRemainder',
        'enclosing', 'shapeData', // Array of AWT.Rectangle, AWT.Ellipse or (AWT.Path -> AWT.PathStroke)
      ].forEach(f => fields.push(f));
    }

    return getAttr(this, fields);
  }

  /**
   * Builds a new shaper, based on the properties specified in a data object
   * @param {object} data - The data object to be parsed
   * @returns {module:shapers/Shaper.Shaper}
   */
  static factory(data) {
    const result = Shaper.getShaper(data.className, data.nCols, data.nRows);
    setAttr(result, data, [
      'className', 'nCols', 'nRows',
      'baseWidthFactor', 'toothHeightFactor',
      'scaleX', 'scaleY',
      'randomLines',
      'showEnclosure', 'hasRemainder',
      { key: 'enclosing', fn: Shape },
      { key: 'shapeData', fn: Shape, group: 'array' },
    ]);

    result.nCells = result.shapeData.length || result.nCols * result.nRows;

    return result;
  }

  /**
   * Builds the individual shapes that will form this Shaper
   */
  buildShapes() {
  }

  /**
   * Gets a clone of the nth Shape object, scaled and located inside a Rectangle
   * @param {number} n
   * @param {module:AWT.Rectangle} rect
   * @returns {module:AWT.Shape}
   */
  getShape(n, rect) {
    if (!this.initiated)
      this.buildShapes();
    if (n >= this.nCells || this.shapeData[n] === null)
      return null;
    return this.shapeData[n].getShape(rect);
  }

  /**
   * Gets the nth Shape data object
   * @param {number} n
   * @returns {object}
   */
  getShapeData(n) {
    return n >= 0 && n < this.shapeData.length ? this.shapeData[n] : null;
  }

  /**
   * Gets the AWT.Rectangle that contains all shapes of this Shaper.
   * @returns {module:AWT.Rectangle}
   */
  getEnclosingShapeData() {
    return new Rectangle(0, 0, 1, 1);
  }

  /**
   * When `hasRemainder` is true, this method gets the rectangle containing the full surface where
   * the Shaper develops.
   * @param {module:AWT.Rectangle} rect - The frame where to move and scale all the shapes
   * @returns {module:AWT.Rectangle}
   */
  getRemainderShape(rect) {
    if (!this.hasRemainder)
      return null;

    if (!this.initiated)
      this.buildShapes();

    const sh = this.getEnclosingShapeData();
    const r = sh ? sh.getShape(rect) : new Rectangle();
    for (let i = 0; i < this.nCells; i++) {
      if (this.shapeData[i])
        r.add(this.shapeData[i].getShape(rect), false);
    }
    return r;
  }
}

Object.assign(Shaper.prototype, {
  /**
   * This shaper class name
   * @name module:shapers/Shaper.Shaper#className
   * @type {string} */
  className: 'Shaper',
  /**
   * Number of columns (useful in grid-based shapers)
   * @name module:shapers/Shaper.Shaper#nCols
   * @type {number} */
  nCols: 0,
  /**
   * Number of rows (useful in grid-based shapers)
   * @name module:shapers/Shaper.Shaper#nRows
   * @type {number} */
  nRows: 0,
  /**
   * Number of cells managed by this shaper
   * @name module:shapers/Shaper.Shaper#nCells
   * @type {number} */
  nCells: 0,
  /**
   * Contains the specific definition of each shape
   * @name module:shapers/Shaper.Shaper#shapeData
   * @type {object} */
  shapeData: null,
  /**
   * Flag used to check if the `Shaper` has been initialized against a real surface
   * @name module:shapers/Shaper.Shaper#initiated
   * @type {boolean} */
  initiated: false,
  //
  // Fields used only in JigSaw shapers
  /**
   * In {@link module:shapers/JigSaw.JigSaw JigSaw}, ratio between the base width of the tooth and the total length of the side.
   * @name module:shapers/Shaper.Shaper#baseWidthFactor
   * @type {number} */
  baseWidthFactor: 1.0 / 3,
  /**
   * In {@link module:shapers/JigSaw.JigSaw JigSaw}, ratio between the tooth height and the total length of the side.
   * @name module:shapers/Shaper.Shaper#toothHeightFactor
   * @type {number} */
  toothHeightFactor: 1.0 / 6,
  /**
   * In {@link module:shapers/JigSaw.JigSaw JigSaw}, whether the tooths take random directions or not
   * @name module:shapers/Shaper.Shaper#randomLines
   * @type {boolean} */
  randomLines: false,
  //
  // Fields used only in the `Holes` shaper
  /**
   * In {@link module:shapers/Holes.Holes Holes}, scale to be applied to horizontal positions and lengths to achieve the real
   * value of the shape placed on a real surface.
   * @name module:shapers/Shaper.Shaper#scaleX
   * @type {number} */
  scaleX: 1.0,
  /**
   * In {@link module:shapers/Holes.Holes Holes}, scale to be applied to vertical positions and lengths to achieve the real
   * value of the shape placed on a real surface.
   * @name module:shapers/Shaper.Shaper#scaleY
   * @type {number} */
  scaleY: 1.0,
  /**
   * In {@link module:shapers/Holes.Holes Holes}, the enclosing area where all shapes are placed.
   * @name module:shapers/Shaper.Shaper#enclosing
   * @type {module:AWT.Shape} */
  enclosing: null,
  /**
   * In {@link module:shapers/Holes.Holes Holes}, when `true`, the enclosing area will be drawn
   * @name module:shapers/Shaper.Shaper#showEnclosure
   * @type {boolean} */
  showEnclosure: false,
  /**
   * Flag indicating if this shaper organizes its cells in rows and columns
   * @name module:shapers/Shaper.Shaper#rectangularShapes
   * @type {boolean} */
  rectangularShapes: false,
  /**
   * Flag indicating if this Shaper deploys over a surface biggest than the rectangle enclosing
   * all its shapes
   * @name module:shapers/Shaper.Shaper#hasRemainder
   * @type {boolean} */
  hasRemainder: false,
  /**
   * Only the `Holes` shaper has this flag activated
   * @name module:shapers/Shaper.Shaper#customShapes
   * @type {boolean} */
  customShapes: false,
});

/**
 * List of known classes derived from Shaper. It should be filled by real shaper classes at
 * declaration time.
 * @type {object} */
Shaper.CLASSES = {};

export default Shaper;
