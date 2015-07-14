//    File    : ActiveBoxGrid.js  
//    Created : 19/05/2015  
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
  "./ActiveBoxBag",
  "./ActiveBox",
  "../AWT",
  "../Utils"
], function ($, ActiveBoxBag, ActiveBox, AWT, Utils) {

  /**
   * This class extends {@link ActiveBoxBag} with constructors that take an argument of type
   * {@link Shaper} used to build all its {@link ActiveBox}components. It also mantains information
   * about the number of "rows" and "columns", useful to compute appropiate (integer) values when
   * resizing or moving its components.
   * @exports ActiveBoxGrid
   * @class
   * @extends ActiveBoxBag
   * @param {?AbstractBox} parent - The AbstractBox to which this box grid belongs
   * @param {?AWT.Container} container - The container where this box grid is placed.  
   * @param {?BoxBase} boxBase - The object where colors, fonts, border and other graphic properties
   * @param {number} px - `X` coordinate of the upper left corner of this box grid
   * @param {number} py - `Y` coordinate of the upper left corner of this box grid
   * @param {number} setWidth - Total width of the box grid
   * @param {number} setHeight - Total height of the box grid
   * @param {Shaper} sh - Shaper used to build the ActiveBox objects
   */
  var ActiveBoxGrid = function (parent, container, boxBase, px, py, setWidth, setHeight, sh) {
    // ActiveBoxGrid derives from ActiveBoxBag
    ActiveBoxBag.call(this, parent, container, boxBase);

    var i, tmpSh, bx;

    this.nCols = sh.nCols;
    this.nRows = sh.nRows;

    // This will be the enclosing rectangle of this ActiveBox bag
    var r = new AWT.Rectangle(
        new AWT.Point(px, py),
        new AWT.Dimension(
            Math.round(setWidth / this.nCols) * this.nCols,
            Math.round(setHeight / this.nRows) * this.nRows));

    // Create all the [ActiveBox](ActiveBox.html) objects based on the
    // shapes provided by the [Shaper](Shaper.html)
    for (i = 0; i < sh.nCells; i++) {
      tmpSh = sh.getShape(i, r);
      bx = new ActiveBox(this, container, boxBase, i, tmpSh.getBounds());
      if (!sh.rectangularShapes)
        bx.setShape(tmpSh);
      this.addActiveBox(bx);
    }

    // If the Shaper has `remainder` (extra space), set the background box of this
    // [BoxBag](BoxBag.html)
    if (sh.hasRemainder) {
      tmpSh = sh.getRemainderShape(r);
      bx = new ActiveBox(this, container, boxBase, 0, tmpSh.getBounds());
      bx.setShape(tmpSh);
      this.setBackgroundBox(bx);
    }
  };

  ActiveBoxGrid.prototype = {
    constructor: ActiveBoxGrid,
    /**
     * Number of columns of this box grid
     * @type {number} */
    nCols: 1,
    /**
     * Number of rows of this box grid
     * @type {number} */
    nRows: 1,
    /**
     * 
     * Gets the minimum size of this grid
     * @returns {AWT.Dimension}
     */
    getMinimumSize: function () {
      return new AWT.Dimension(
          Utils.settings.MIN_CELL_SIZE * this.nCols,
          Utils.settings.MIN_CELL_SIZE * this.nRows);
    },
    /**
     * 
     * Gets a scaled size of this grid, rounded to the nearest integer values
     * @param {number} scale - The scale factor
     * @returns {AWT.Dimension}
     */
    getScaledSize: function (scale) {
      return new AWT.Dimension(
          Utils.roundTo(scale * this.preferredBounds.dim.width, this.nCols),
          Utils.roundTo(scale * this.preferredBounds.dim.height, this.nRows));
    },
    /**
     * 
     * This prototype method creates a new grid with the number of cells indicated by the
     * {@link ActiveBagContent} `abc`, but not filling the cells with any content.
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
    _createEmptyGrid: function (parent, container, px, py, abc, sh, boxBase) {
      var result = null;
      if (abc) {
        result = new ActiveBoxGrid(parent, container,
            boxBase ? boxBase : abc.bb,
            px, py,
            abc.getTotalWidth(), abc.getTotalHeight(),
            sh ? sh : abc.getShaper());

        result.setBorder(abc.border);
      }
      return result;
    },
    /**
     * 
     * Returns the logical coordinates of the provided {@link ActiveBox}.<br>
     * The units of the result are not pixels, but ordinal numbers (relative positions) of columns
     * and rows in the grid.
     * @param {ActiveBox} bx - The box to process
     * @returns {AWT.Point}
     */
    getCoord: function (bx) {
      var py = Math.floor(bx.idLoc / this.nCols);
      var px = bx.idLoc % this.nCols;
      return new AWT.Point(px, py);
    },
    /**
     * 
     * Calculates the logical distance between two ActiveBox objects.<br>
     * Resulting units are not pixels, but ordinal numbers (relative positions) of columns and rows
     * in the grid.
     * @param {ActiveBox} src - First box
     * @param {ActiveBox} dest - Second box
     * @returns {AWT.Point}
     */
    getCoordDist: function (src, dest) {
      var ptSrc = this.getCoord(src);
      var ptDest = this.getCoord(dest);
      return new AWT.Point(ptDest.x - ptSrc.x, ptDest.y - ptSrc.y);
    }
  };

  // ActiveBoxGrid extends ActiveBoxBag
  ActiveBoxGrid.prototype = $.extend(Object.create(ActiveBoxBag.prototype), ActiveBoxGrid.prototype);

  return ActiveBoxGrid;

});
