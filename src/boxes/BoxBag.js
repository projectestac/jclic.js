//    File    : BoxBag.js  
//    Created : 21/04/2015  
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
  "./AbstractBox",
  "../AWT",
  "../Utils"
], function ($, AbstractBox, AWT, Utils) {

//
// `BoxBag` is a class derivated from [AbstractBox](AbstractBox.html) that contains
// a collection of "boxes" (objects also derived from AbstractBox). The class 
// implements methods to add, remove and retrieve boxes, and to manage some of 
// its properties like visibility, status, location and size.
  var BoxBag = function (parent, container, boxBase) {
    // BoxBag extends AbstractBox
    AbstractBox.call(this, parent, container, boxBase);
    this.preferredBounds = new AWT.Rectangle();
    this.cells = [];
  };

  BoxBag.prototype = {
    constructor: BoxBag,
    //
    // The array of cells
    cells: [],
    //
    // Rectangle containing the preferred bounds of the BoxBag
    preferredBounds: new AWT.Rectangle(),
    //
    // The background of this BoxBag, defined by an [AbstractBox](AbstractBox.html)
    backgroundBox: null,
    //
    // Miscellaneous functions to get the preferred and current sizes
    // of this `BoxBag`
    getPreferredSize: function () {
      return this.preferredBounds.dim;
    },
    getMinimumSize: function () {
      var d = this.getPreferredSize();
      return new AWT.Dimension(
          Math.max(Utils.settings.MIN_CELL_SIZE, d.width),
          Math.max(Utils.settings.MIN_CELL_SIZE, d.height));
    },
    getScaledSize: function (scale) {
      var d = this.getPreferredSize();
      return new AWT.Dimension(Math.round(scale * d.width), Math.round(scale * d.height));
    },
    // Adds an [AbstractBox](AbstractBox.html) to the collection of cells
    addBox: function (bx) {
      this.cells.push(bx);
      bx.setParent(this);
      if (this.cells.length === 1) {
        this.setBounds(bx);
      }
      else {
        this.add(bx);
      }
      this.preferredBounds.setBounds(this.getBounds());
    },
    //
    // Returns the index of a specific box in the `cells` array
    boxIndex: function (bx) {
      return bx === null ? -1 : this.cells.indexOf(bx);
    },
    // 
    // Returns the box at a specific index in the `cells` array
    getBox: function (n) {
      return (n < 0 || n >= this.cells.length) ? null : this.cells[n];
    },
    // 
    // Getter and setter for the `backgroundBox` property
    getBackgroundBox: function () {
      return this.backgroundBox;
    },
    setBackgroundBox: function (bx) {
      this.backgroundBox = bx;
      if (bx !== null) {
        bx.setParent(this);
      }
      this.preferredBounds.setRect(this.getBounds());
    },
    //
    // Recalculates the total size of this BoxBag
    // (useful after direct additions o deletions of elemnts in the `cells` array
    recalcSize: function () {
      var r = new AWT.Rectangle(this.pos.x, this.pos.y, 0, 0);
      if (this.backgroundBox !== null)
        r.add(backgroundBox);
      for (var i = 0; i < this.cells.length; i++)
        r.add(this.cells[i]);
      this.preferredBounds.setRect(r);
      this.x = r.pos.x;
      this.y = r.pos.y;
      this.dim.width = r.dim.width;
      this.dim.height = r.dim.height;
    },
    //
    // Returns the number of cells stored in this BoxBag
    // (function can be overrided by subclasses)
    getNumCells: function () {
      return this.cells.length;
    },
    //
    // Overrides the `setBorder` method of [AbstractBox](AbstractBox.html)
    // iterating through all cells
    setBorder: function (newVal) {
      for (var i = 0; i < this.cells.length; i++)
        this.getBox(i).setBorder(newVal);
    },
    //
    // Overrides the `setVisible` method of [AbstractBox](AbstractBox.html)
    // iterating through all cells
    setVisible: function (newVal) {
      for (var i = 0; i < this.cells.length; i++)
        this.getBox(i).setVisible(newVal);
    },
    //
    // Overrides the `setAlternative` method of [AbstractBox](AbstractBox.html)
    // iterating through all cells
    setAlternative: function (newVal) {
      AbstractBox.prototype.setAlternative.call(this, newVal);
      for (var i = 0; i < this.cells.length; i++)
        this.getBox(i).setAlternative(newVal);
    },
    //
    // Overrides the `setBounds` method of [AbstractBox](AbstractBox.html)
    // adjusting the position and size of all cells
    setBounds: function (rect, y, w, h) {
      if(typeof rect === 'number')
        // Arguments are co-ordinates and size
        rect = new AWT.Rectangle(rect, y, w, h);
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
    //
    // Sets the CanvasRenderingContext2D to be used by this box
    // Overwrites same function in [AbstractBox](AbstractBox.html)
    setContext2D: function(ctx){
      this.ctx = ctx;
      for (var i = 0; i < this.cells.length; i++) {
        this.getBox(i).setContext2D(ctx);
      }
    },
    //
    // Graphics operations based on a Canvas context ctx
    // Overrides same method in [AbstractBox](AbstractBox.html)
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
    //
    // Updates content
    updateContent: function (ctx, dirtyRegion) {
      return true;
    },
    //
    // Finds the first [AbstractBox](AbstractBox.html) located under the
    // provided AWT.Point
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
    //
    // Count the number of cells of this BoxBag that are in `inactive` state
    countInactiveCells: function () {
      var n = 0;
      for (var i = 0; i < this.cells.length; i++) {
        if (this.getBox(i).isInactive())
          n++;
      }
      return n;
    },
    //
    // Sets the position and dimension of a Resizable object based on a preferred 
    // maximum size and a margin.
    // preferredMaxSize (AWT.Dimension) - The preferred maximum size
    // rs (currently a [BoxBag](BoxBag.html) or a [TextGrid](TextGrid.html) 
    // implementing the methods described in the 
    // [Resizable](http://projectestac.github.io/jclic/apidoc/edu/xtec/jclic/boxes/Resizable.html)
    // interface of JClic) - The object to be positioned and resized.
    // margin (number) - The margin between the available area and the BoxBag
    // Returns: an AWT.Dimension object with the final size of the container
    layoutSingle: function (preferredMaxSize, rs, margin) {

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
      if ((scale * d.height) > maxSize.height) {
        scale = maxSize.height / d.height;
      }
      // resize the Resizable object
      d = rs.getScaledSize(scale);
      rs.setBounds(margin, margin, d.width, d.height);

      // restore margins
      d.width += 2 * margin;
      d.height += 2 * margin;

      return d;
    },
    //
    // Sets the position and dimension of two Resizable objects based on a preferred 
    // maximum size, a layout schema and a margin.
    // desiredMaxSize (AWT.Dimension) - The preferred maximum size
    // rsA and rsB (currently a [BoxBag](BoxBag.html) or a [TextGrid](TextGrid.html) 
    // implementing the methods described in the 
    // [Resizable](http://projectestac.github.io/jclic/apidoc/edu/xtec/jclic/boxes/Resizable.html)
    // interface of JClic) - The objects to be positioned and resized.
    // boxGridPos (string) - The layout schema (_AB_, _BA_, _AUB_ or _BUA_)
    // margin (number) - The margin between the available area and the BoxBag
    // Returns: an AWT.Dimension object with the final size of the container
    layoutDouble: function (desiredMaxSize, rsA, rsB, boxGridPos, margin) {
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
      var minSize = new Dimension(
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
      if ((scale * d.height) > maxSize.height) {
        scale = maxSize.height / d.height;
      }
      // 
      // correct possible minimal infractions
      // ...
      // resize
      da = rsA.getScaledSize(scale);
      db = rsB.getScaledSize(scale);

      // margins to center one box relative to the other
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

      // recompute d adding margins
      var r = new AWT.Rectangle(rsA.getBounds());
      r.add(rsB.getBounds());
      d.width = r.dim.width + 2 * margin;
      d.height = r.dim.height + 2 * margin;

      return d;
    }

  };

  // BoxBag extends AbstractBox
  BoxBag.prototype = $.extend(Object.create(AbstractBox.prototype), BoxBag.prototype);

  return BoxBag;

});
