//    File    : ActiveBoxBag.js  
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
  "./BoxBag",
  "../AWT"
], function ($, BoxBag, AWT) {

//
// This class is a special case of [BoxBag](BoxBag.html), containing only
// objects of type [ActiveBox](ActiveBox.html). In addition to the members and
// methods of `BoxBag`, it implements specific methods to deal with
// [ActiveBagContent](ActiveBagContent.html) objects and with other specific
// members of `ActiveBox` like its "ids" (`idOrder`, `idLoc` and `idAss`).
//
  var ActiveBoxBag = function (parent, container, boxBase) {
    BoxBag.call(this, parent, container, boxBase);
  };

  ActiveBoxBag.prototype = {
    constructor: ActiveBoxBag,
    //
    // Adds an (ActiveBox)[ActiveBox.html] to this bag
    addActiveBox: function (bx) {
      bx.idLoc = this.cells.size();
      bx.idOrder = bx.idLoc;
      return this.addBox(bx);
    },
    // 
    // Finds an ActiveBox by its numeric location
    getActiveBox: function (idLoc) {
      return this.getBox(idLoc);
    },
    //
    // Gets the background box
    getBackgroundActiveBox: function () {
      return this.getBackgroundBox();
    },
    //
    // Sets the contents of this ActiveBoxBag based on the provided
    // [ActiveBagContent](ActiveBagContent.html) objects
    // abc (ActiveBagContent) - The main content bag
    // altAbc (ActiveBagContent, optional) - The alternative content bag
    // fromIndex (number, optional) - Take [ActiveBoxContent](ActiveBoxContent.html)
    // from the specified index.
    // toCell (number, optional) - Start filling at this cell number
    // numCells (number, optional) - Take only a limited number of cells
    setContent: function (abc, altAbc, fromIndex, toCell, numCells) {

      var bx;
      if (!fromIndex)
        fromIndex = 0;
      if (!toCell)
        toCell = 0;
      if (!numCells)
        numCells = this.cells.length;

      for (var i = 0; i < numCells; i++) {
        bx = this.getActiveBox(toCell + i);
        bx.setContent(abc, fromIndex + i);
        bx.setAlternative(false);
        if (altAbc)
          bx.setAltContent(altAbc, fromIndex + i);
      }

      if (abc.backgroundContent !== null && (this.getBackgroundActiveBox() !== null)) {
        bx = this.getBackgroundActiveBox();
        bx.setContent(abc.backgroundContent);
        if (abc.bb !== bx.getBoxBaseX())
          bx.setBoxBase(abc.bb);
      }
    },
    //
    // Finds an ActiveBox by location
    // point: (AWT.Point) - The location to search for  
    findActiveBox: function (point) {
      return this.findBox(point);
    },
    //
    // Clear the content of all boxes
    clearAll: function () {
      for (var i = 0; i < this.cells.length; i++)
        this.getActiveBox(i).clear();
      if (this.backgroundBox !== null)
        this.getBackgroundActiveBox().clear();
    },
    //
    // Count the number of cells that are at its original place
    countCellsAtPlace: function () {
      var cellsAtPlace = 0;
      for (var i = 0; i < this.cells.length; i++)
        if (this.getActiveBox(i).isAtPlace())
          cellsAtPlace++;
      return cellsAtPlace;
    },
    //
    // Finds the [ActiveBox](ActiveBox.html) having the specified `idLoc` attribute
    getActiveBoxWithIdLoc: function (idLoc) {
      var result = null;
      for (var bx, i = 0; i < this.cells.length; i++) {
        if ((bx = this.getActiveBox(i)).idLoc === idLoc) {
          result = bx;
          break;
        }
      }
      return result;
    },
    //
    // Checks if a cell is at a place equivalent to its original position
    // bx (ActiveBox): The ActiveBox to check for
    // checkCase (boolean): check case when comparing texts
    cellIsAtEquivalentPlace: function (bx, checkCase) {
      return bx.isAtPlace() ||
          bx.isEquivalent(this.getActiveBoxWithIdLoc(bx.idOrder), checkCase);
    },
    //
    // Count the number of cells that are at its original place
    countCellsAtEquivalentPlace: function (checkCase) {
      var cellsAtPlace = 0;
      for (var i = 0; i < this.cells.length; i++) {
        if (this.cellIsAtEquivalentPlace(this.getActiveBox(i), checkCase))
          cellsAtPlace++;
      }
      return cellsAtPlace;
    },
    //
    // Count the number of cells having the provided `idAss` attribute    
    countCellsWithIdAss: function (idAss) {
      var n = 0;
      for (var i = 0; i < this.cells.length; i++) {
        if (this.getActiveBox(i).idAss === idAss)
          n++;
      }
      return n;
    },
    //
    // Count the number of inactive cells
    countInactiveCells: function () {
      var n = 0;
      for (var i = 0; i < this.cells.length; i++) {
        if (this.getActiveBox(i).isInactive())
          n++;
      }
      return n;
    },
    //
    // Resets the default `idAss`attribute of all cells
    setDefaultIdAss: function () {
      for (var i = 0; i < this.cells.length; i++)
        this.getActiveBox(i).setDefaultIdAss();
    },
    //
    // Scramble all the cells
    // times (number): Number of times to scramble
    // fitInArea (boolean): Ensure that all cells are inside the bag rectangle
    scrambleCells: function (times, fitInArea) {
      var nc = this.cells.length;
      if (nc >= 2) {
        // Array of AWT.Point objects
        var pos = [];
        var idLoc = [];
        var i, bx;
        for (i = 0; i < nc; i++) {
          bx = this.getActiveBox(i);
          pos[i] = new AWT.Point(bx.getLocation());
          idLoc[i] = bx.idLoc;
        }
        var p = new AWT.Point();
        var j;
        for (i = 0; i < times; i++) {
          var r1 = Math.random() * nc;
          var r2 = Math.random() * nc;
          if (r1 !== r2) {
            p.setLocation(pos[r1]);
            pos[r1].setLocation(pos[r2]);
            pos[r2].setLocation(p);
            j = idLoc[r1];
            idLoc[r1] = idLoc[r2];
            idLoc[r2] = j;
          }
        }

        var maxX = this.pos.x + this.dim.width;
        var maxY = this.pos.y + this.dim.height;
        for (i = 0; i < nc; i++) {
          bx = this.getActiveBox(i);
          var px = pos[i].x;
          var py = pos[i].y;
          if (fitInArea) {
            px = Math.min(Math.max(px, this.pos.x), maxX - bx.dim.width);
            py = Math.min(Math.max(py, this.pos.y), maxY - bx.dim.height);
          }
          bx.setLocation(px, py);
          bx.idLoc = idLoc[i];
        }
      }
    },
    //
    // Resets the IDs of all cells
    resetIds: function () {
      for (var i = 0; i < this.cells.length; i++) {
        var bx = cells[i];
        if (bx) {
          bx.idOrder = i;
          bx.idAss = i;
          bx.idLoc = i;
        }
      }
    },
    //
    // Gets the box located in the `cells` array after the provided index 
    // that has the provided `idAss` parameter (or, if not provided, any
    // value greather than zero)
    // currentItem (number): The index after to start scanning
    // idAssValid (number, optional): The `idAss` attribute to look for
    getNextItem: function (currentItem, idAssValid) {
      var IDASSNOTUSED = -12345;
      if (!idAssValid)
        idAssValid = IDASSNOTUSED;
      var i;
      for (i = currentItem + 1; i < this.cells.length; i++) {
        var bx = this.cells[i];
        if (!bx)
          break;
        if (idAssValid !== IDASSNOTUSED) {
          if (idAssValid === bx.idAss)
            break;
        }
        else if (bx.idAss >= 0)
          break;
      }
      return i;
    }
  };

  // ActiveBoxBag extends BoxBag
  ActiveBoxBag.prototype = $.extend(Object.create(BoxBag.prototype), ActiveBoxBag.prototype);

  return ActiveBoxBag;
});
