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
import BoxBag from './BoxBag.js';
import { Point } from '../AWT.js';

/**
 * This class is a special case of {@link module:boxes/BoxBag.BoxBag BoxBag} containing only objects of type {@link module:boxes/ActiveBox.ActiveBox ActiveBox}.
 * In addition to the members and methods of `BoxBag`, it implements specific methods to deal with
 * {@link module:boxes/ActiveBagContent.ActiveBagContent ActiveBagContent} objects and with the other specific members of `ActiveBox` like its "ids"
 * (`idOrder`, `idLoc` and `idAss`).
 * @extends module:boxes/BoxBag.BoxBag
 */
export class ActiveBoxBag extends BoxBag {
  /**
   * ActiveBoxBag constructor
   * @param {module:boxes/AbstractBox.AbstractBox} [parent] - The AbstractBox to which this box bag belongs
   * @param {module:AWT.Container} [container] - The container where this box bag is placed.
   * @param {module:boxes/BoxBase.BoxBase} [boxBase] - The object where colors, fonts, border and other graphic properties
   * of this box bag are defined.
   */
  constructor(parent, container, boxBase) {
    // ActiveBoxBag extends BoxBag
    super(parent, container, boxBase);
  }

  /**
   * Adds an {@link module:boxes/ActiveBox.ActiveBox ActiveBox} to this bag
   * @param {module:boxes/ActiveBox.ActiveBox} bx - The ActiveBox to be added to this bag
   */
  addActiveBox(bx) {
    bx.idLoc = this.cells.length;
    bx.idOrder = bx.idLoc;
    return this.addBox(bx);
  }

  /**
   * Finds an ActiveBox by its relative location (`idLoc` field)
   * @param {number} idLoc
   * @returns {module:boxes/ActiveBox.ActiveBox}
   */
  getActiveBox(idLoc) {
    return this.getBox(idLoc);
  }

  /**
   * Gets the background box
   * @returns {module:boxes/ActiveBox.ActiveBox}
   */
  getBackgroundActiveBox() {
    return this.getBackgroundBox();
  }

  /**
   * Sets the content of members of this ActiveBoxBag, based on one or more {@link module:boxes/ActiveBagContent.ActiveBagContent ActiveBagContent}
   * objects.
   * @param {module:boxes/ActiveBagContent.ActiveBagContent} abc - The main bag of content
   * @param {module:boxes/ActiveBagContent.ActiveBagContent} [altAbc] - The alternative bag of content
   * @param {number} [fromIndex] - Starts taking the cell content located at this position on the bag
   * @param {number} [toCell] - Starts filling the box located at this position on the ActiveBoxBag
   * @param {number} [numCells] - Acts only with a limited number of elements.
   */
  setContent(abc, altAbc, fromIndex, toCell, numCells) {
    if (!fromIndex)
      fromIndex = 0;
    if (!toCell)
      toCell = 0;
    if (!numCells)
      numCells = this.cells.length;

    for (let i = 0; i < numCells; i++) {
      const bx = this.getActiveBox(toCell + i);
      bx.setContent(abc, fromIndex + i);
      bx.setAlternative(false);
      if (altAbc)
        bx.setAltContent(altAbc, fromIndex + i);
    }

    if (abc.backgroundContent !== null && this.getBackgroundActiveBox() !== null) {
      const bx = this.getBackgroundActiveBox();
      bx.setContent(abc.backgroundContent);
      if (abc.style !== bx.boxBase)
        bx.setBoxBase(abc.style);
    }
  }

  /**
   * Finds an ActiveBox by location
   * @param {module:AWT.Point} point - The location to search for
   * @returns {module:boxes/ActiveBox.ActiveBox}
   */
  findActiveBox(point) {
    return this.findBox(point);
  }

  /**
   * Clears the content of all boxes
   */
  clearAllBoxes() {
    this.cells.forEach(bx => bx.clear());
  }

  /**
   * Clears the content of all boxes and background box
   */
  clearAll() {
    this.clearAllBoxes();
    if (this.backgroundBox !== null)
      this.getBackgroundActiveBox().clear();
  }

  /**
   * Count the number of cells that are at its original place
   * @returns {number}
   */
  countCellsAtPlace() {
    return this.cells.reduce((n, bx) => bx.isAtPlace() ? ++n : n, 0);
  }

  /**
   * Finds the {@link module:boxes/ActiveBox.ActiveBox ActiveBox} that has the specified `idLoc` attribute
   * @param {number} idLoc - The idLoc to search for
   * @returns {module:boxes/ActiveBox.ActiveBox}
   */
  getActiveBoxWithIdLoc(idLoc) {
    return this.cells.find(bx => bx.idLoc === idLoc) || null;
  }

  /**
   * Checks if the place occupied by a cell corresponds to a cell with equivalent content.
   * @param {module:boxes/ActiveBox.ActiveBox} bx - The box to check
   * @param {boolean} checkCase - If `true`, check case when comparing texts
   * @returns {boolean}
   */
  cellIsAtEquivalentPlace(bx, checkCase) {
    return bx.isAtPlace() ||
      bx.isEquivalent(this.getActiveBoxWithIdLoc(bx.idOrder), checkCase);
  }

  /**
   * Count the number of cells that are at its original place or equivalent
   * @param {boolean} checkCase -  - If `true`, check case when comparing texts
   * @returns {number}
   */
  countCellsAtEquivalentPlace(checkCase) {
    return this.cells.reduce((n, bx) => this.cellIsAtEquivalentPlace(bx, checkCase) ? ++n : n, 0);
  }

  /**
   * Counts the number of cells that have the provided `idAss` attribute
   * @param {number} idAss - The `idAss` attribute to search
   * @returns {number}
   */
  countCellsWithIdAss(idAss) {
    return this.cells.reduce((n, bx) => bx.idAss === idAss ? ++n : n, 0);
  }

  /**
   * Resets the default `idAss` attribute on all cells
   */
  setDefaultIdAss() {
    this.cells.map(bx => bx.setDefaultIdAss());
  }

  /**
   * Shuffles the cells
   * @param {number} times - Number of times to shuffle
   * @param {boolean} fitInArea - Ensure that all cells are inside the bag rectangle
   */
  shuffleCells(times, fitInArea) {
    let nc = this.cells.length;
    if (nc >= 2) {
      // Array of AWT.Point objects
      const
        pos = [],
        idLoc = [],
        p = new Point();

      for (let i = 0; i < nc; i++) {
        const bx = this.getActiveBox(i);
        pos[i] = new Point(bx.pos);
        idLoc[i] = bx.idLoc;
      }

      for (let i = 0; i < times; i++) {
        const
          r1 = Math.floor(Math.random() * nc),
          r2 = Math.floor(Math.random() * nc);
        if (r1 !== r2) {
          p.moveTo(pos[r1]);
          pos[r1].moveTo(pos[r2]);
          pos[r2].moveTo(p);
          const j = idLoc[r1];
          idLoc[r1] = idLoc[r2];
          idLoc[r2] = j;
        }
      }

      for (let i = 0; i < nc; i++) {
        const
          bx = this.getActiveBox(i),
          px = pos[i].x,
          py = pos[i].y;
        bx.moveTo(new Point(px, py));
        if (fitInArea)
          this.fitCellsInArea([bx]);
        bx.idLoc = idLoc[i];
      }
    }
  }

  /**
   * Fits cells inside the ActiveBoxBag area. Useful when non-rectangular cells exchange its positions.
   * @param {module:boxes/ActiveBox.ActiveBox[]} boxes - The boxes to be checked
   */
  fitCellsInArea(boxes) {
    const
      maxX = this.pos.x + this.dim.width,
      maxY = this.pos.y + this.dim.height;

    boxes.forEach(bx => {
      // Save original position
      if (!bx.pos0)
        bx.pos0 = new Point(bx.pos);

      const
        px = Math.min(Math.max(bx.pos.x, this.pos.x), maxX - bx.dim.width),
        py = Math.min(Math.max(bx.pos.y, this.pos.y), maxY - bx.dim.height);
      if (px !== bx.pos.x || py !== bx.pos.y)
        bx.moveTo(new Point(px, py));
    });
  }

  /**
   * Exchange the positions of two cells inside the ActiveBoxBag area.
   * @param {module:boxes/ActiveBox.ActiveBox} bxa - The first box
   * @param {module:boxes/ActiveBox.ActiveBox} bxb - The second box
   * @param {boolean} fitInArea - Ensure that all cells are inside the bag rectangle
   */
  swapCellPositions(bxa, bxb, fitInArea) {
    // Save backup of bxb significant properties
    const
      posB = new Point(bxb.pos),
      posB0 = bxb.pos0,
      idLocB = bxb.idLoc;

    bxb.moveTo(bxa.pos0 || bxa.pos);
    bxb.pos0 = bxa.pos0;
    bxb.idLoc = bxa.idLoc;

    bxa.moveTo(posB0 || posB);
    bxa.pos0 = posB0;
    bxa.idLoc = idLocB;

    if (fitInArea)
      this.fitCellsInArea([bxa, bxb]);
  }

  /**
   * Resets the IDs of all cells
   */
  resetIds() {
    this.cells.forEach((bx, i) => {
      if (bx) {
        bx.idOrder = i;
        bx.idAss = i;
        bx.idLoc = i;
      }
    });
  }

  /**
   * Gets the index of box located in the `cells` array after the provided index, having the
   * provided `idAssValid` value as `idAss` attribute.
   * When `idAssValid` is `null` or `undefined`, search for the next cell with `idAss>0`
   * @param {number} currentItem - The index after to which start scanning
   * @param {string} [idAssValid] - The `idAss` attribute value to search
   * @returns {number}
   */
  getNextItem(currentItem, idAssValid) {
    const IDASSNOTUSED = -12345;
    if (!idAssValid)
      idAssValid = IDASSNOTUSED;
    let i = currentItem + 1;
    for (; i < this.cells.length; i++) {
      const bx = this.cells[i];
      if (!bx)
        break;
      if (idAssValid !== IDASSNOTUSED) {
        if (idAssValid === bx.idAss)
          break;
      } else if (bx.idAss >= 0)
        break;
    }
    return i;
  }

  /**
   * Builds a group of hidden `buton` elements that will act as a accessible objects associated
   * to the canvas area of this ActiveBoxBag.
   * The buttons will only be created when `CanvasRenderingContext2D` has a method named `addHitRegion`.
   * See https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Hit_regions_and_accessibility
   * for more information and supported browsers.
   * @param {external:jQuery} $canvas - The `canvas` where this `ActiveBoxBag` will deploy, wrapped up in a jQuery object
   * @param {external:jQuery} $clickReceiver - The DOM element that will be notified  when a button is clicked.
   * @param {string} [eventType] - Type of event sent to $clickReceiver. Default is `click`.
   * @returns {external:jQuery} - The $accessibleDiv member, containing the accessible elements associated to this ActiveBoxBag.
   */
  buildAccessibleElements($canvas, $clickReceiver, eventType) {
    this.$accessibleDiv = this.accessibleText !== '' ? $('<div/>', { 'aria-label': this.accessibleText, tabindex: 0 }) : null;
    $canvas.append(this.$accessibleDiv);
    this.cells
      .map(a => a)
      .sort((a, b) => a.idLoc > b.idLoc ? 1 : -1)
      .forEach(bx => bx.buildAccessibleElement($canvas, $clickReceiver, this.$accessibleDiv, eventType));
    return this.$accessibleDiv;
  }
}

Object.assign(ActiveBoxBag.prototype, {
  /**
   * `div` containing the accessible elements associated to this ActiveBoxBag
   * @name module:boxes/ActiveBoxBag.ActiveBoxBag#$accessibleDiv
   * @type {external:jQuery} */
  $accessibleDiv: null,
});

export default ActiveBoxBag;
