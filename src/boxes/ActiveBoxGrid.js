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
  var ActiveBoxGrid = function (parent, container, boxBase, px, py, setWidth, setHeight, sh) {
    ActiveBoxBag.call(this, parent, container, boxBase);

    this.nCols = sh.getNumColumns();
    this.nRows = sh.getNumRows();

    var r = new AWT.Rectangle(
        new AWT.Point(px, py),
        new AWT.Dimension(
            Math.round(setWidth / this.nCols) * this.nCols,
            Math.round(setHeight / this.nRows) * this.nRows));

    this.ensureCapacity(sh.getNumCells());

    for (var i = 0; i < sh.getNumCells(); i++) {
      var tmpSh = sh.getShape(i, r);
      var bx = new ActiveBox(this, container, boxBase, i, tmpSh.getBounds2D());
      if (!sh.rectangularShapes())
        bx.setShape(tmpSh);
      this.addActiveBox(bx);
    }

    if (sh.hasRemainder()) {
      var tmpSh = sh.getRemainderShape(r);
      var bx = new ActiveBox(this, container, boxBase, 0, tmpSh.getBounds2D());
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
          Utils.roundTo(scale * this.preferredBounds.getWidth(), this.nCols),
          Utils.roundTo(scale * this.preferredBounds.getHeight(), this.nRows));
    }
  };

  // ActiveBoxGrid extends ActiveBoxBag
  ActiveBoxGrid.prototype = $.extend(Object.create(ActiveBoxBag.prototype), ActiveBoxGrid.prototype);

  return ActiveBoxGrid;

});
