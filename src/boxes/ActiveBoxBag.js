/**
 *  File    : boxes/ActiveBoxBag.js
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
  "./BoxBag",
  "../AWT",
  "../Utils"
], function ($, BoxBag, AWT, Utils) {

  /**
   * This class is a special case of {@link BoxBag} containing only objects of type {@link ActiveBox}.
   * In addition to the members and methods of `BoxBag`, it implements specific methods to deal with
   * {@link ActiveBagContent} objects and with the other specific members of `ActiveBox` like its "ids"
   * (`idOrder`, `idLoc` and `idAss`).
   * @exports ActiveBoxBag
   * @class
   * @extends BoxBag
   * @param {?AbstractBox} parent - The AbstractBox to which this box bag belongs
   * @param {?AWT.Container} container - The container where this box bag is placed.
   * @param {?BoxBase} boxBase - The object where colors, fonts, border and other graphic properties
   * of this box bag are defined.
   */
  var ActiveBoxBag = function (parent, container, boxBase) {
    // ActiveBoxBag extends BoxBag
    BoxBag.call(this, parent, container, boxBase);
  };

  ActiveBoxBag.prototype = {
    constructor: ActiveBoxBag,
    /**
     * `div` containing the accessible elements associated to this ActiveBoxBag
     * @type {external:jQuery} */
    $accessibleDiv: null,
    /**
     *
     * Adds an {@link ActiveBox} to this bag
     * @param {ActiveBox} bx - The ActiveBox to be added to this bag
     */
    addActiveBox: function (bx) {
      bx.idLoc = this.cells.length;
      bx.idOrder = bx.idLoc;
      return this.addBox(bx);
    },
    /**
     *
     * Finds an ActiveBox by its relative location (`idLoc` field)
     * @param {number} idLoc
     * @returns {ActiveBox}
     */
    getActiveBox: function (idLoc) {
      return this.getBox(idLoc);
    },
    /**
     *
     * Gets the background box
     * @returns {ActiveBox}
     */
    getBackgroundActiveBox: function () {
      return this.getBackgroundBox();
    },
    /**
     *
     * Sets the content of members of this ActiveBoxBag, based on one or more {@link ActiveBagContent}
     * objects.
     * @param {ActiveBagContent} abc - The main bag of content
     * @param {?ActiveBagContent=} altAbc - The alternative bag of content
     * @param {number=} fromIndex - Starts taking the cell content located at this position on the bag
     * @param {number=} toCell - Starts filling the box located at this position on the ActiveBoxBag
     * @param {type=} numCells - Acts only with a limited number of elements.
     */
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

      if (abc.backgroundContent !== null && this.getBackgroundActiveBox() !== null) {
        bx = this.getBackgroundActiveBox();
        bx.setContent(abc.backgroundContent);
        if (abc.bb !== bx.boxBase)
          bx.setBoxBase(abc.bb);
      }
    },
    /**
     *
     * Finds an ActiveBox by location
     * @param {AWT.Point} point - The location to search for
     * @returns {ActiveBox}
     */
    findActiveBox: function (point) {
      return this.findBox(point);
    },
    /**
     *
     * Clears the content of all boxes
     */
    clearAllBoxes: function () {
      for (var i = 0; i < this.cells.length; i++)
        this.getActiveBox(i).clear();
    },
    /**
     *
     * Clears the content of all boxes and background box
     */
    clearAll: function () {
      this.clearAllBoxes();
      if (this.backgroundBox !== null)
        this.getBackgroundActiveBox().clear();
    },
    /**
     *
     * Count the number of cells that are at its original place
     * @returns {number}
     */
    countCellsAtPlace: function () {
      var cellsAtPlace = 0;
      for (var i = 0; i < this.cells.length; i++)
        if (this.getActiveBox(i).isAtPlace())
          cellsAtPlace++;
      return cellsAtPlace;
    },
    /**
     *
     * Finds the {@link ActiveBox} that has the specified `idLoc` attribute
     * @param {number} idLoc - The idLoc to search for
     * @returns {ActiveBox}
     */
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
    /**
     *
     * Checks if the place occupied by a cell corresponds to a cell with equivalent content.
     * @param {ActiveBox} bx - The box to check
     * @param {boolean} checkCase - If `true`, check case when comparing texts
     * @returns {boolean}
     */
    cellIsAtEquivalentPlace: function (bx, checkCase) {
      return bx.isAtPlace() ||
        bx.isEquivalent(this.getActiveBoxWithIdLoc(bx.idOrder), checkCase);
    },
    /**
     *
     * Count the number of cells that are at its original place or equivalent
     * @param {type} checkCase -  - If `true`, check case when comparing texts
     * @returns {number}
     */
    countCellsAtEquivalentPlace: function (checkCase) {
      var cellsAtPlace = 0;
      for (var i = 0; i < this.cells.length; i++) {
        if (this.cellIsAtEquivalentPlace(this.getActiveBox(i), checkCase))
          cellsAtPlace++;
      }
      return cellsAtPlace;
    },
    /**
     *
     * Counts the number of cells that have the provided `idAss` attribute
     * @param {number} idAss - The `idAss` attribute to search
     * @returns {number}
     */
    countCellsWithIdAss: function (idAss) {
      var n = 0;
      for (var i = 0; i < this.cells.length; i++) {
        if (this.getActiveBox(i).idAss === idAss)
          n++;
      }
      return n;
    },
    /**
     *
     * Counts the number of inactive cells
     * @returns {number}
     */
    countInactiveCells: function () {
      var n = 0;
      for (var i = 0; i < this.cells.length; i++) {
        if (this.getActiveBox(i).isInactive())
          n++;
      }
      return n;
    },
    /**
     * Resets the default `idAss` attribute on all cells
     */
    setDefaultIdAss: function () {
      for (var i = 0; i < this.cells.length; i++)
        this.getActiveBox(i).setDefaultIdAss();
    },
    /**
     *
     * Shuffles the cells
     * @param {number} times - Number of times to shuffle
     * @param {boolean} fitInArea - Ensure that all cells are inside the bag rectangle
     */
    scrambleCells: function (times, fitInArea) {
      var nc = this.cells.length;
      if (nc >= 2) {
        // Array of AWT.Point objects
        var pos = [];
        var idLoc = [];
        var i, bx;
        for (i = 0; i < nc; i++) {
          bx = this.getActiveBox(i);
          pos[i] = new AWT.Point(bx.pos);
          idLoc[i] = bx.idLoc;
        }
        var p = new AWT.Point();
        var j;
        for (i = 0; i < times; i++) {
          var r1 = Math.floor(Math.random() * nc);
          var r2 = Math.floor(Math.random() * nc);
          if (r1 !== r2) {
            p.moveTo(pos[r1]);
            pos[r1].moveTo(pos[r2]);
            pos[r2].moveTo(p);
            j = idLoc[r1];
            idLoc[r1] = idLoc[r2];
            idLoc[r2] = j;
          }
        }

        for (i = 0; i < nc; i++) {
          bx = this.getActiveBox(i);
          var px = pos[i].x;
          var py = pos[i].y;
          bx.moveTo(new AWT.Point(px, py));
          if(fitInArea)
            this.fitCellInArea(bx);
          bx.idLoc = idLoc[i];
        }
      }
    },
    fitCellInArea: function(bx){
      if(!bx.pos0){
        bx.pos0=new AWT.Point(bx.pos);
      }
      var maxX = this.pos.x + this.dim.width;
      var maxY = this.pos.y + this.dim.height;
      var px = Math.min(Math.max(bx.pos.x, this.pos.x), maxX - bx.dim.width);
      var py = Math.min(Math.max(bx.pos.y, this.pos.y), maxY - bx.dim.height);
      if(px!==bx.pos.x || py!==bx.pos.y)
        bx.moveTo(new AWT.Point(px, py));
    },
    swapCellPositions: function(bxa, bxb, fitInArea){
      var posA=bxa.pos, posB=bxb.pos;
      var posA0=bxa.pos0||null, posB0=bxb.pos0||null;
      var idLocA=bxa.idLoc, idLocB=bxb.idLoc;
      bxb.moveTo(posA0||posA);
      bxb.pos0 = posA0;
      bxb.idLoc=idLocA;
      bxa.moveTo(posB0||posB);
      bxa.pos0 = posB0;
      bxa.idLoc=idLocB;
      if(fitInArea){
        this.fitCellInArea(bxa);
        this.fitCellInArea(bxb);
      }
    },
    /**
     *
     * Resets the IDs of all cells
     */
    resetIds: function () {
      for (var i = 0; i < this.cells.length; i++) {
        var bx = this.cells[i];
        if (bx) {
          bx.idOrder = i;
          bx.idAss = i;
          bx.idLoc = i;
        }
      }
    },
    /**
     *
     * Gets the index of box located in the `cells` array after the provided index, having the
     * provided `idAssValid` value as `idAss` attribute.
     * When `idAssValid` is `null` or `undefined`, search for the next cell with `idAss>0`
     * @param {type} currentItem - The index after to which start scanning
     * @param {type=} idAssValid - The `idAss` attribute value to search
     * @returns {number}
     */
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
        } else if (bx.idAss >= 0)
          break;
      }
      return i;
    },
    /**
     * 
     * Builds a group of hidden `buton` elements that will act as a accessible objects associated
     * to the canvas area of this ActiveBoxBag.
     * The buttons will only be created when `CanvasRenderingContext2D` has a method named `addHitRegion`.
     * See https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Hit_regions_and_accessibility
     * for more information and supported browsers.
     * @param {external:jQuery} $canvas - The `canvas` where this `ActiveBoxBag` will deploy, wrapped up in a jQuery object
     * @param {external:jQuery} $clickReceiver - The DOM element that will be notified  when a button is clicked.
     * @param {string=} eventType - Type of event sent to $clickReceiver. Default is `click`.
     * @returns {external:jQuery} - The $accessibleDiv member, containing the accessible elements associated to this ActiveBoxBag.
     */
    buildAccessibleElements: function ($canvas, $clickReceiver, eventType) {
      if (Utils.settings.CANVAS_HITREGIONS) {
        this.$accessibleDiv = this.accessibleText !== '' ? $('<div/>', { 'aria-label': this.accessibleText, tabindex: 0 }) : null;
        $canvas.append(this.$accessibleDiv);
        for (var i = 0; i < this.cells.length; i++)
          this.cells[i].buildAccessibleElement($canvas, $clickReceiver, this.$accessibleDiv, eventType);
      }
      return this.$accessibleDiv;
    }

  };

  // ActiveBoxBag extends BoxBag
  ActiveBoxBag.prototype = $.extend(Object.create(BoxBag.prototype), ActiveBoxBag.prototype);

  return ActiveBoxBag;
});
