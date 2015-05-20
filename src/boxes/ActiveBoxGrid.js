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

//
//
//
// SKELETON FOR A CLASS 'XXX' DERIVED FROM 'BaseClass'
define([
  "jquery",
  "./ActiveBoxBag",
  "./ActiveBox",
  "../AWT",
  "../Utils"
], function ($, ActiveBoxBag, ActiveBox, AWT, Utils) {

  //
  //  This class extends [ActiveBoxBag](ActiveBoxBag.html) with constructors that
  //  take an argument of type [Shaper](Shaper.html) to build all its [ActiveBox](ActiveBox.html)
  //  elements. It also mantains information about the number of "rows" and "columns", useful to
  //  compute appropiate (integer) values when resizing or moving the its components.
  //  
  //  parent (AbstractBox)
  //  container (AWT.Container)
  //  boxBase (BoxBase)
  //  px (number)
  //  py (number)
  //  setWidth (number)
  //  setHeight (number)
  //  sh (Shaper)
  var ActiveBoxGrid = function (parent, container, boxBase, px, py, setWidth, setHeight, sh) {
    // ActiveBoxGrid derives from ActiveBoxBag
    ActiveBoxBag.call(this, parent, container, boxBase);

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
    for (var i = 0; i < sh.nCells; i++) {
      var tmpSh = sh.getShape(i, r);
      var bx = new ActiveBox(this, container, boxBase, i, tmpSh.getBounds());
      if (!sh.rectangularShapes)
        bx.setShape(tmpSh);
      this.addActiveBox(bx);
    }

    // If the Shaper has `remainder` (extra space), set the background box of this
    // [BoxBag](BoxBag.html)
    if (sh.hasRemainder) {
      var tmpSh = sh.getRemainderShape(r);
      var bx = new ActiveBox(this, container, boxBase, 0, tmpSh.getBounds());
      bx.setShape(tmpSh);
      this.setBackgroundBox(bx);
    }
  };

  ActiveBoxGrid.prototype = {
    constructor: ActiveBoxGrid,
    //
    // Number of rows and columns of this box grid
    nCols: 1,
    nRows: 1,
    //
    // Gets the minimum size of this grid
    getMinimumSize: function () {
      return new AWT.Dimension(
          Utils.settings.MIN_CELL_SIZE * this.nCols,
          Utils.settings.MIN_CELL_SIZE * this.nRows);
    },
    //
    // Gets a scaled size
    getScaledSize: function (scale) {
      return new AWT.Dimension(
          Utils.roundTo(scale * this.preferredBounds.dim.width, this.nCols),
          Utils.roundTo(scale * this.preferredBounds.dim.height, this.nRows));
    },
    //
    // This prototype method creates a new grid with the number of cells indicated by the provided
    // [ActiveBagContent](ActiveBagContent.html), but without filling the cells with its contents.
    // parent (AbstractBox)
    // container (AWT.Container)
    // px (number)
    // py (number)
    // abc (ActiveBagContent)
    // sh (Shaper)
    // boxBase (BoxBase)
    // Returns: the resulting ActiveBoxGrid
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
    // Returns the 'logical' co-ordinates of the provided ActiveBox
    // Resulting units are not pixels, but ordinal numbers of columns and rows in the grid
    // bx (ActiveBox)
    // returns: AWT.Point
    getCoord: function (bx) {
      var py = bx.idLoc / this.nCols;
      var px = bx.idLoc % this.nCols;
      return new AWT.Point(px, py);
    },
    // Calculates the 'logical' distance between two ActiveBox objects
    // Resulting units are not pixels, but ordinal numbers columns and rows in the grid
    // src (ActiveBox)
    // dest (ActiveBox)
    // returns: AWT.Point
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
