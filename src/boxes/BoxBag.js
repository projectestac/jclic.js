/**
 *  File    : boxes/BoxBag.js
 *  Created : 21/04/2015
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

/* global define */

define([
  "jquery",
  "./AbstractBox",
  "../AWT",
  "../Utils"
], function ($, AbstractBox, AWT, Utils) {

  /**
   *
   * BoxBag is a class derived from {@link AbstractBox} that contains a collection of "boxes"
   * (objects also derived from {@link AbstractBox}). This class implements methods to add, remove
   * and retrieve boxes, and to manage some of its properties like visibility, status, location and size.
   * @exports BoxBag
   * @class
   * @extends AbstractBox
   * @param {?AbstractBox} parent - The AbstractBox to which this box bag belongs
   * @param {?AWT.Container} container - The container where this box bag is placed.
   * @param {?BoxBase} boxBase - The object where colors, fonts, border and other graphic properties
   */
  var BoxBag = function (parent, container, boxBase) {
    // BoxBag extends AbstractBox
    AbstractBox.call(this, parent, container, boxBase);
    this.preferredBounds = new AWT.Rectangle();
    this.cells = [];
  };

  BoxBag.prototype = {
    constructor: BoxBag,
    /**
     * The array of cells.
     * @type {AbstractBox[]} */
    cells: [],
    /**
     * Rectangle containing the preferred bounds of the BoxBag
     * @type {AWT.Rectangle} */
    preferredBounds: new AWT.Rectangle(),
    /**
     * An optional box used as a background by this BoxBag
     * @type {AbstractBox} */
    backgroundBox: null,
    /**
     *
     * Gets the preferred size of this `BoxBag`
     * @returns {AWT.Dimension}
     */
    getPreferredSize: function () {
      return this.preferredBounds.dim;
    },
    /**
     *
     * Gets the minimum size requested by this `BoxBag`
     * @returns {AWT.Dimension}
     */
    getMinimumSize: function () {
      var d = this.getPreferredSize();
      return new AWT.Dimension(
        Math.max(Utils.settings.MIN_CELL_SIZE, d.width),
        Math.max(Utils.settings.MIN_CELL_SIZE, d.height));
    },
    /**
     *
     * Scales the current size of this box bag, multiplying all values by a specific factor
     * @param {number} scale - The scale factor
     * @returns {AWT.Dimension}
     */
    getScaledSize: function (scale) {
      var d = this.getPreferredSize();
      return new AWT.Dimension(Math.round(scale * d.width), Math.round(scale * d.height));
    },
    /**
     *
     * Adds an {@link AbstractBox} to the collection of cells
     * @param {AbstractBox} bx - The box to add
     */
    addBox: function (bx) {
      this.cells.push(bx);
      bx.setParent(this);

      if (this.cells.length === 1) {
        AWT.Rectangle.prototype.setBounds.call(this, bx);
      } else {
        this.add(bx);
      }
      this.preferredBounds.setBounds(this.getBounds());
    },
    /**
     *
     * Returns the index of a specific box in the `cells` array
     * @param {AbstractBox} bx
     * @returns {number}
     */
    boxIndex: function (bx) {
      return bx === null ? -1 : this.cells.indexOf(bx);
    },
    /**
     *
     * Returns the box at a specific index in the `cells` array
     * @param {number} n - The index
     * @returns {AbstractBox}
     */
    getBox: function (n) {
      return n < 0 || n >= this.cells.length ? null : this.cells[n];
    },
    /**
     *
     * Gets the background box
     * @returns {AbstractBox}
     */
    getBackgroundBox: function () {
      return this.backgroundBox;
    },
    /**
     *
     * Sets the background box
     * @param {AbstractBox} bx
     */
    setBackgroundBox: function (bx) {
      this.backgroundBox = bx;
      if (bx !== null) {
        bx.setParent(this);
        bx.isBackground = true;
      }
      // Add the `backgroundbox` rectangle to the global BoxBag rectangle
      AWT.Rectangle.prototype.add.call(this, bx);
      this.preferredBounds.setBounds(this.getBounds());
    },
    /**
     *
     * Recalculates the total size of this BoxBag (useful after direct additions o deletions of
     * elements in the `cells` array).
     * Updates `preferredBounds` and the current position and size of the box bag.
     */
    recalcSize: function () {
      var r = null;
      if (this.backgroundBox)
        r = new AWT.Rectangle(this.backgroundBox.pos, this.backgroundBox.dim);
      for (var i = 0; i < this.cells.length; i++) {
        if (!r)
          r = new AWT.Rectangle(this.cells[i].pos, this.cells[i].dim);
        else
          r.add(this.cells[i]);
      }
      if (!r)
        r = new AWT.Rectangle(this.pos.x, this.pos.y, 0, 0);
      this.preferredBounds.setRect(r);
      this.x = r.pos.x;
      this.y = r.pos.y;
      this.dim.width = r.dim.width;
      this.dim.height = r.dim.height;
    },
    /**
     *
     * Returns the number of cells stored in this BoxBag
     * @returns {number}
     */
    getNumCells: function () {
      return this.cells.length;
    },
    /**
     * 
     * Sets the specified key - value pair to all cells of this bag.
     * @param {string} key - The key to be established
     * @param {} value - The value, of any type
     */
    setCellAttr: function (key, value) {
      for (var i = 0; i < this.cells.length; i++)
        this.getBox(i)[key] = value;
      if (this.backgroundBox)
        this.backgroundBox[key] = value;
    },
    /**
     *
     * Overrides {@link AbstractBox#setBorder} iterating over all the cells stored in this box bag.
     * @param {boolean} newVal - Whether to set or unset the border
     */
    setBorder: function (newVal) {
      for (var i = 0; i < this.cells.length; i++)
        this.getBox(i).setBorder(newVal);
    },
    /**
     *
     * Overrides {@link AbstractBox#setVisible} iterating over all the cells stored in this box bag.
     * @param {boolean} newVal - Whether to set the cells visible or not
     */
    setVisible: function (newVal) {
      for (var i = 0; i < this.cells.length; i++)
        this.getBox(i).setVisible(newVal);
    },
    /**
     *
     * Overrides {@link AbstractBox#setAlternative} iterating over all the cells stored in this box bag.
     * @param {boolean} newVal - Whether to set or unset the cells in "alternative" mode
     */
    setAlternative: function (newVal) {
      AbstractBox.prototype.setAlternative.call(this, newVal);
      for (var i = 0; i < this.cells.length; i++)
        this.getBox(i).setAlternative(newVal);
    },
    /**
     *
     * Overrides {@link AbstractBox#setBounds} adjusting the position and size of all cells
     * @param {(AWT.Rectangle|number)} rect - An AWT.Rectangle object, or the `x` coordinate of the
     * upper-left corner of a new rectangle.
     * @param {number=} ry - `y` coordinate of the upper-left corner of the new rectangle.
     * @param {number=} rw - Width of the new rectangle.
     * @param {number=} rh - Height of the new rectangle.
     */
    setBounds: function (rect, ry, rw, rh) {
      if (typeof rect === 'number') {
        // Arguments are co-ordinates and size
        var rx = rect;
        rect = new AWT.Rectangle(rx, ry, rw, rh);
      }
      if (rect.getSurface() > 0 && !rect.equals(this)) {
        var scaleW = rect.dim.width / this.dim.width;
        var scaleH = rect.dim.height / this.dim.height;
        var dx = rect.pos.x - this.pos.x;
        var dy = rect.pos.y - this.pos.y;
        var p, bx;
        for (var i = 0; i < this.cells.length; i++) {
          bx = this.getBox(i);
          p = new AWT.Point(bx.pos.x - this.pos.x, bx.pos.y - this.pos.y);
          bx.setBounds(
            dx + this.pos.x + scaleW * p.x,
            dy + this.pos.y + scaleH * p.y,
            scaleW * bx.dim.width,
            scaleH * bx.dim.height);
        }
        if (this.backgroundBox !== null) {
          bx = this.backgroundBox;
          p = new AWT.Point(bx.pos.x - this.pos.x, bx.pos.y - this.pos.y);
          bx.setBounds(
            dx + this.pos.x + scaleW * p.x,
            dy + this.pos.y + scaleH * p.y,
            scaleW * bx.dim.width,
            scaleH * bx.dim.height);
        }
      }
      AbstractBox.prototype.setBounds.call(this, rect);
    },
    /**
     *
     * Performs graphics operations for each cell.
     * Overrides {@link AbstractBox#update}
     * @param {external:CanvasRenderingContext2D} ctx - The canvas rendering context used to draw the
     * box contents.
     * @param {AWT.Rectangle=} dirtyRegion - The area that must be repainted. `null` refers to the whole box.
     */
    update: function (ctx, dirtyRegion) {

      if (this.isEmpty() || !this.isVisible() || this.isTemporaryHidden())
        return false;

      if (dirtyRegion && !this.intersects(dirtyRegion))
        return false;

      if (this.backgroundBox !== null)
        this.backgroundBox.update(ctx, dirtyRegion);

      var bx;
      for (var i = 0; i < this.cells.length; i++) {
        bx = this.getBox(i);
        if (!bx.isMarked())
          bx.update(ctx, dirtyRegion);
      }

      // Make a second loop to repaint marked cells
      for (var l = 0; l < this.cells.length; l++) {
        bx = this.getBox(l);
        if (bx.isMarked())
          bx.update(ctx, dirtyRegion);
      }
      return true;
    },
    /**
     *
     * Finds the first visible {@link AbstractBox} located under the specified point
     * @param {AWT.Point} p
     * @returns {AbstractBox}
     */
    findBox: function (p) {
      var result = null;
      for (var i = this.cells.length - 1; i >= 0; i--) {
        var bx = this.getBox(i);
        if (bx.isVisible() && bx.contains(p)) {
          result = bx;
          break;
        }
      }
      return result;
    },
    /**
     *
     * Count the number of cells of this BoxBag that are in "inactive" state
     * @returns {number}
     */
    countInactiveCells: function () {
      var n = 0;
      for (var i = 0; i < this.cells.length; i++) {
        if (this.getBox(i).isInactive())
          n++;
      }
      return n;
    }
  };

  // BoxBag extends AbstractBox
  BoxBag.prototype = $.extend(Object.create(AbstractBox.prototype), BoxBag.prototype);

  /**
   * Static function that sets the position and dimension of a `Resizable` object based on a
   * preferred maximum dimension and a margin.
   * @param {AWT.Dimension} preferredMaxSize - The preferred maximum size
   * @param {Resizable} rs - A resizable object implementing the methods described in the
   * {@link http://projectestac.github.io/jclic/apidoc/edu/xtec/jclic/boxes/Resizable.html Resizable}
   * interface of JClic. Currently a {@link BoxBag} or {@link TextGrid}.
   * @param {number} margin - The margin between the available area and the BoxBag
   * @returns {AWT.Dimension} - The resulting size of the container
   */
  BoxBag.layoutSingle = function (preferredMaxSize, rs, margin) {

    // Avoid exceptions when rs is null
    if (!rs)
      return preferredMaxSize;

    // optimal dimension
    var d = rs.getPreferredSize();

    // minimal dimension
    var minSize = rs.getMinimumSize();
    // maximal dimension
    var maxSize = preferredMaxSize;
    // remove margins
    maxSize.width -= 2 * margin;
    maxSize.height -= 2 * margin;
    // correct maxSize if less than minSize
    if (minSize.width > maxSize.width || minSize.height > maxSize.height) {
      maxSize = minSize;
    }
    // compute scale factor
    var scale = 1;
    if (d.width > maxSize.width) {
      scale = maxSize.width / d.width;
    }
    if (scale * d.height > maxSize.height) {
      scale = maxSize.height / d.height;
    }
    // resize the `Resizable` object
    d = rs.getScaledSize(scale);
    rs.setBounds(margin, margin, d.width, d.height);

    // restore margins
    d.width += 2 * margin;
    d.height += 2 * margin;

    return d;
  };

  /**
   * Static function that sets the position and dimension of two `Resizable` objects based on a
   * preferred maximum size, a layout schema and a margin.
   * @param {AWT.Dimension} desiredMaxSize - The preferred maximum size
   * @param {Resizable} rsA - First resizable object implementing the methods described in the
   * {@link http://projectestac.github.io/jclic/apidoc/edu/xtec/jclic/boxes/Resizable.html Resizable}
   * interface of JClic. Currently a {@link BoxBag} or {@link TextGrid}.
   * @param {Resizable} rsB - Second resizable object
   * @param {string} boxGridPos - The layout schema. Possible values are:
   * - "AB" (_A_ at left, _B_ at right)
   * - "BA" (_B_ at left, _A_ at right)
   * - "AUB" (_A_ above _B_)
   * - "BUA" (_A_ below _B_).
   * @param {number} margin - The margin between the available area and the BoxBag
   * @returns {AWT.Dimension} - The resulting size of the container
   */
  BoxBag.layoutDouble = function (desiredMaxSize, rsA, rsB, boxGridPos, margin) {
    // number of horizontal and vertical grid lines
    var isHLayout = false;
    var nbh = 1, nbv = 1;
    switch (boxGridPos) {
      case 'AB':
      case 'BA':
        nbh = 2;
        nbv = 1;
        isHLayout = true;
        break;
      case 'AUB':
      case 'BUA':
        nbh = 1;
        nbv = 2;
        isHLayout = false;
        break;
    }
    var ra = rsA.getBounds();
    var rb = rsB.getBounds();
    // optimal dimensions
    var da = rsA.getPreferredSize();
    var db = rsB.getPreferredSize();
    var d = new AWT.Dimension(
      isHLayout ? da.width + db.width : Math.max(da.width, db.width),
      isHLayout ? Math.max(da.height, db.height) : da.height + db.height
    );
    // minimal dimensions
    var minSizeA = rsA.getMinimumSize();
    var minSizeB = rsB.getMinimumSize();
    var minSize = new AWT.Dimension(
      isHLayout ? minSizeA.width + minSizeB.width : Math.max(minSizeA.width, minSizeB.width),
      isHLayout ? Math.max(minSizeA.height, minSizeB.height) : minSizeA.height + minSizeB.height
    );
    // maximal dimension
    var maxSize = desiredMaxSize;
    // remove margins
    maxSize.width -= (1 + nbh) * margin;
    maxSize.height -= (1 + nbv) * margin;

    // correct maxSize if less than minSize
    if (minSize.width > maxSize.width || minSize.height > maxSize.height)
      maxSize.setDimension(minSize);

    // compute scale factor
    var scale = 1;
    if (d.width > maxSize.width) {
      scale = maxSize.width / d.width;
    }
    if (scale * d.height > maxSize.height) {
      scale = maxSize.height / d.height;
    }
    //
    // correct possible minimal infractions
    // ...
    // resize
    da = rsA.getScaledSize(scale);
    db = rsB.getScaledSize(scale);

    // set margins to center one box relative to the other
    var dah, dav, dbh, dbv;
    dah = db.width > da.width ? (db.width - da.width) / 2 : 0;
    dbh = da.width > db.width ? (da.width - db.width) / 2 : 0;
    dav = db.height > da.height ? (db.height - da.height) / 2 : 0;
    dbv = da.height > db.height ? (da.height - db.height) / 2 : 0;

    switch (boxGridPos) {
      case 'AB':
        rsA.setBounds(margin, margin + dav, da.width, da.height);
        rsB.setBounds(2 * margin + da.width, margin + dbv, db.width, db.height);
        break;
      case 'BA':
        rsB.setBounds(margin, margin + dbv, db.width, db.height);
        rsA.setBounds(2 * margin + db.width, margin + dav, da.width, da.height);
        break;
      case 'AUB':
        rsA.setBounds(margin + dah, margin, da.width, da.height);
        rsB.setBounds(margin + dbh, 2 * margin + da.height, db.width, db.height);
        break;
      case 'BUA':
        rsB.setBounds(margin + dbh, margin, db.width, db.height);
        rsA.setBounds(margin + dah, 2 * margin + db.height, da.width, da.height);
        break;
      default:
        rsA.setBounds(
          Math.round(margin + scale * ra.pos.x),
          Math.round(margin + scale * ra.pos.y),
          da.width, da.height);
        rsB.setBounds(
          Math.round(margin + scale * rb.pos.x),
          Math.round(margin + scale * rb.pos.y),
          da.width, da.height);
        break;
    }

    // recompute 'd' adding margins
    var r = new AWT.Rectangle(rsA.getBounds());
    r.add(rsB.getBounds());
    d.width = r.dim.width + 2 * margin;
    d.height = r.dim.height + 2 * margin;

    return d;
  };

  return BoxBag;

});
