/**
 *  File    : boxes/ActiveBoxGrid.js
 *  Created : 19/05/2015
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

import ActiveBoxBag from './ActiveBoxBag';
import ActiveBox from './ActiveBox';
import { Rectangle, Dimension, Point } from '../AWT';
import { settings, roundTo } from '../Utils';

/**
 * This class extends {@link ActiveBoxBag} with constructors that take an argument of type
 * {@link Shaper} used to build all its {@link ActiveBox}components. It also maintains information
 * about the number of "rows" and "columns", useful to compute valid (integer) values when
 * resizing or moving its components.
 * @extends module:ActiveBoxBag
 */
export class ActiveBoxGrid extends ActiveBoxBag {
  /**
   * ActiveBxGrid constructor
   * @param {?AbstractBox} parent - The AbstractBox to which this box grid belongs
   * @param {?AWT.Container} container - The container where this box grid is placed.
   * @param {?BoxBase} boxBase - The object where colors, fonts, border and other graphic properties
   * @param {number} px - `X` coordinate of the upper left corner of this box grid
   * @param {number} py - `Y` coordinate of the upper left corner of this box grid
   * @param {number} setWidth - Total width of the box grid
   * @param {number} setHeight - Total height of the box grid
   * @param {Shaper} sh - Shaper used to build the ActiveBox objects
   */
  constructor(parent, container, boxBase, px, py, setWidth, setHeight, sh) {
    // ActiveBoxGrid derives from ActiveBoxBag
    super(parent, container, boxBase);

    this.nCols = sh.nCols;
    this.nRows = sh.nRows;

    // This will be the enclosing rectangle of this ActiveBox bag
    const r = new Rectangle(
      new Point(px, py),
      new Dimension(
        Math.round(setWidth / this.nCols) * this.nCols,
        Math.round(setHeight / this.nRows) * this.nRows));

    // Create all the [ActiveBox](ActiveBox.html) objects based on the
    // shapes provided by the [Shaper](Shaper.html)
    for (let i = 0; i < sh.nCells; i++) {
      const
        tmpSh = sh.getShape(i, r),
        bx = new ActiveBox(this, container, boxBase, i, tmpSh.getBounds());
      if (!sh.rectangularShapes)
        bx.setShape(tmpSh);
      this.addActiveBox(bx);
    }

    // If the Shaper has `remainder` (extra space), set the background box of this
    // [BoxBag](BoxBag.html)
    if (sh.hasRemainder) {
      const
        tmpSh = sh.getRemainderShape(r),
        bx = new ActiveBox(this, container, boxBase, 0, tmpSh.getBounds());
      bx.setShape(tmpSh);
      this.setBackgroundBox(bx);
    }
  }

  /**
   * This factory constructor creates a new empty grid with the number of cells indicated by the
   * {@link ActiveBagContent} `abc`, not filling the cells with any content.
   * @param {?AbstractBox} parent - The AbstractBox to which this box grid belongs
   * @param {?AWT.Container} container - The container where this box grid is placed.
   * @param {number} px - `X` coordinate of the upper left corner of this box grid
   * @param {number} py - `Y` coordinate of the upper left corner of this box grid
   * @param {ActiveBagContent} abc - Used only to get the number of cells and the shaper (when `sh` is `null`)
   * @param {?Shaper} sh - Shaper used to build the ActiveBox objects
   * @param {?BoxBase} boxBase - The object where colors, fonts, border and other graphic properties
   * of this box grid are defined.
   * @returns {ActiveBoxGrid}
   */
  static createEmptyGrid(parent, container, px, py, abc, sh, boxBase) {
    const result = abc ? new ActiveBoxGrid(parent, container,
      boxBase || abc.style,
      px, py,
      abc.getTotalWidth(), abc.getTotalHeight(),
      sh || abc.getShaper()) : null;

    if (result)
      result.setBorder(abc.border);

    return result;
  }

  /**
   * Gets the minimum size of this grid
   * @returns {module:AWT.Dimension}
   */
  getMinimumSize() {
    return new Dimension(
      settings.MIN_CELL_SIZE * this.nCols,
      settings.MIN_CELL_SIZE * this.nRows);
  }

  /**
   * Gets a scaled size of this grid, rounded to the nearest integer values
   * @param {number} scale - The scale factor
   * @returns {module:AWT.Dimension}
   */
  getScaledSize(scale) {
    return new Dimension(
      roundTo(scale * this.preferredBounds.dim.width, this.nCols),
      roundTo(scale * this.preferredBounds.dim.height, this.nRows));
  }

  /**
   * Returns the logical coordinates of the provided {@link ActiveBox}.
   * The units of the result are not pixels, but ordinal numbers (relative positions) of columns
   * and rows in the grid.
   * @param {ActiveBox} bx - The box to process
   * @returns {module:AWT.Point}
   */
  getCoord(bx) {
    return new Point(bx.idLoc % this.nCols, Math.floor(bx.idLoc / this.nCols));
  }

  /**
   * Calculates the logical distance between two {@link ActiveBox} objects.
   * Resulting units are not pixels, but ordinal numbers (relative positions) of columns and rows
   * in the grid.
   * @param {ActiveBox} src - First box
   * @param {ActiveBox} dest - Second box
   * @returns {module:AWT.Point}
   */
  getCoordDist(src, dest) {
    const
      ptSrc = this.getCoord(src),
      ptDest = this.getCoord(dest);
    return new Point(ptDest.x - ptSrc.x, ptDest.y - ptSrc.y);
  }
}

Object.assign(ActiveBoxGrid.prototype, {
  /**
   * Number of columns of this box grid
   * @name ActiveBoxGrid#nCols
   * @type {number} */
  nCols: 1,
  /**
   * Number of rows of this box grid
   * @name ActiveBoxGrid#nRows
   * @type {number} */
  nRows: 1,
});

export default ActiveBoxGrid;
