//    File    : TextGrid.js  
//    Created : 12/06/2015  
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
  "../AWT",
  "../Utils",
  "./AbstractBox",
  "./TextGridContent"
], function ($, AWT, Utils, AbstractBox, TextGridContent) {
  
  /**
   * This class is a special type of {@link AbstractBox} that displays a grid of single
   * characters.<br>
   * It's used {@link CrossWord} and {@link WordSearch} activities.
   * @exports TextGrid
   * @class
   * @extends AbstractBox
   * @param {?AbstractBox} parent - The AbstractBox to which this text grid belongs
   * @param {?AWT.Container} container - The container where this text grid is placed.  
   * @param {?BoxBase} boxBase - The object where colors, fonts, border and other graphic properties
   * @param {number} x - `X` coordinate of the upper left corner of this grid
   * @param {number} y - `Y` coordinate of the upper left corner of this grid
   * @param {number} ncw - Number of columns of the grid
   * @param {number} nch - Nomber of rows of the grid
   * @param {number} cellW - Width of the cells
   * @param {number} cellH - Height of the cells
   * @param {boolean} border - When `true`, a border must be drawn between the cells
   */
  var TextGrid = function (parent, container, boxBase, x, y, ncw, nch, cellW, cellH, border) {

    // *TextGrid* extends [AbstractBox](AbstractBox.html)
    AbstractBox.call(this, parent, container, boxBase);

    var thisTG = this;
    this.pos.x = x;
    this.pos.y = y;
    this.nCols = Math.max(1, ncw);
    this.nRows = Math.max(1, nch);
    this.cellWidth = Math.max(cellW, this.defaults.MIN_CELL_SIZE);
    this.cellHeight = Math.max(cellH, this.defaults.MIN_CELL_SIZE);
    this.dim.width = cellW * this.nCols;
    this.dim.height = cellH * this.nRows;
    this.setChars(' ');
    this.preferredBounds = new AWT.Rectangle(this.pos, this.dim);
    this.setBorder(border);
    this.cursorTimer = new AWT.Timer(function () {
      thisTG.blink(0);
    }, 500, false);
    this.cursorEnabled = false;
    this.useCursor = false;
    this.wildTransparent = false;
    this.cursor = new AWT.Point();
  };

  TextGrid.prototype = {
    constructor: TextGrid,
    /**
     * Number of rows
     * @type {number} */
    nRows: 1,
    /**
     * Number of columns
     * @type {number} */
    nCols: 1,
    /**
     * Two-dimension array of characters
     * @type {string[][]} */
    chars: null,
    /**
     * Two-dimension array with the expected characters, used to check user's answers.
     * @type {string[][]} */    
    answers: null,
    /**
     * Two-dimension array of bytes used as containers of boolean attributes
     * @see textGrid#flags
     * @type {number[][]} */
    attributes: null,
    /**
     * The cell width, in pixels
     * @type {number} */
    cellWidth: 20,
    /**
     * The cell height, in pixels
     * @type {number} */    
    cellHeight: 20,
    /**
     * The preferred bounds of this grid
     * @type {AWT.Rectangle} */
    preferredBounds: null,
    /**
     * The character to be used as wildcard
     * @type {string} */    
    wild: TextGridContent.prototype.wild,
    /**
     * Characters that can be used when randomizing the content of this grid
     * @see TextGridContent#randomChars
     * @type {string} */
    randomChars: TextGridContent.prototype.randomChars,
    /**
     * Whether the blinking cursor is enabled or disabled
     * @type {boolean} */
    cursorEnabled: false,
    /**
     * Whether this grid uses a blinking cursor or not
     * @type {boolean} */
    useCursor: false,
    /**
     * The current position of the cursor
     * @type {AWT.Point} */    
    cursor: null,
    /**
     * `true` when the cursor is "blinking" (cell drawed with {@link BoxBase} `inverse` attributes)
     * @type {boolean} */
    cursorBlink: false,
    /**
     * Controls the blinking of the cursor
     * @type {AWT.Timer} */
    cursorTimer: null,
    /**
     * Whether the wildcard is transparent or opaque
     * @type {boolean} */
    wildTransparent: false,
    /**
     * Default values
     * @constant
     * @type {object} */
    defaults: {
      MIN_CELL_SIZE: 12,
      DEFAULT_CELL_SIZE: 20,
      MIN_INTERNAL_MARGIN: 2
    },
    /**
     * Binary flags used to mark status
     * @constant
     * @type {object} */
    flags: {
      NORMAL: 0,
      INVERTED: 1,
      HIDDEN: 2,
      LOCKED: 4,
      MARKED: 8,
      TRANSPARENT: 16
    },
    /**
     * 
     * Creates an empty grid based on a {@link TextGridContent}
     * This static method should be called always as `TextGrid.prototype._createEmptyGrid(...)`
     * @static
     * @param {?AbstractBox} parent - The AbstractBox to which the text grid belongs
     * @param {?AWT.Container} container - The container where the text grid will be placed.  
     * @param {number} x - `X` coordinate of the upper left corner of the grid
     * @param {number} y - `Y` coordinate of the upper left corner of the grid
     * @param {TextGridContent} tgc - Object with the content and other settings of the grid
     * @param {boolean} wildTransparent - When `true`, the wildcard will be transparent
     * @returns {TextGrid}
     */
    _createEmptyGrid: function (parent, container, x, y, tgc, wildTransparent) {
      var result = new TextGrid(parent, container, tgc.bb,
          x, y, tgc.ncw, tgc.nch, tgc.w, tgc.h, tgc.border);
      result.wild = tgc.wild;
      result.randomChars = tgc.randomChars;
      result.wildTransparent = wildTransparent;
      return result;
    },
    /**
     * 
     * Sets the characters to be placed in the cells of this TextGrid
     * @param {string} text
     */
    setChars: function (text) {
      this.chars = [];
      this.answers = [];
      this.attributes = [];
      for (var py = 0; py < this.nRows; py++) {
        var line = py < text.length ? text[py] : '';
        this.chars[py] = line.split('');
        this.answers[py] = [];
        this.attributes[py] = [];
        for (var px = 0; px < this.nCols; px++) {
          if (px >= line.length)
            this.chars[py][px] = ' ';
          this.answers[py][px] = this.chars[py][px];
          this.attributes[py][px] = this.flags.NORMAL;
        }
      }
      //this.repaint();
    },
    /**
     * 
     * Substitutes the current content of all cells with wildcards with a randomly generated char.
     * @see TextGridContent#randomChars
     */
    randomize: function () {
      for (var py = 0; py < this.nRows; py++)
        for (var px = 0; px < this.nCols; px++)
          if (this.chars[py][px] === this.wild)
            this.chars[py][px] = this.randomChars.charAt(
                Math.floor(Math.random() * this.randomChars.length));
    },
    /**
     * 
     * Clears or sets global attributes to all cells
     * @param {boolean} lockWild - When `true`, the wildcard cells will be marked with special
     * attributes (used in CrossWords to mark black cells)
     * @param {boolean} clearChars - When `true`, the current content of cells will be erased.
     */
    setCellAttributes: function (lockWild, clearChars) {
      var atr = this.flags.LOCKED;
      if (this.wildTransparent)
        atr |= this.flags.TRANSPARENT;
      else
        atr |= this.flags.INVERTED | this.flags.HIDDEN;
      for (var py = 0; py < this.nRows; py++) {
        for (var px = 0; px < this.nCols; px++) {
          if (lockWild && this.chars[py][px] === this.wild)
            this.attributes[py][px] = atr;
          else {
            this.attributes[py][px] = this.flags.NORMAL;
            if (clearChars)
              this.chars[py][px] = ' ';
          }
        }
      }
    },
    /**
     * 
     * Sets or unsets the `locked` properties (black cell) to a specific cell.
     * @param {number} px - The logical 'X' coordinate of the cell
     * @param {number} py - The logical 'Y' coordinate of the cell
     * @param {boolean} locked - When true, the `locked` attribute will be on.
     * @returns {undefined}
     */
    setCellLocked: function (px, py, locked) {
      if (px >= 0 && px < this.nCols && py >= 0 && py < this.nRows) {
        this.attributes[py][px] = locked ?
            this.flags.LOCKED |
            (this.wildTransparent ?
                this.flags.TRANSPARENT :
                this.flags.INVERTED |
                this.flags.HIDDEN) :
            this.flags.NORMAL;
      }
    },
    /**
     * 
     * For a specific cell located at column `rx` and row `ry`, finds the number of words delimited
     * by wildchars located behind its current position and in the same row and column. Used in
     * {@link CrossWord} activities to find the definition for a specific cell.<br>
     * The result is returned as 'x' and 'y' properties of a logical point.
     * @param {type} rx - The 'X' position of the cell
     * @param {type} ry - The 'Y' position of the cell
     * @returns {AWT.Point} - The logical positions of the definition for this cell inside the list
     * of current definitions of its row and column. '0' means first definition of its row/column,
     * '1' the second one, etc.
     */
    getItemFor: function (rx, ry) {

      if (!this.isValidCell(rx, ry))
        return null;

      var point = new AWT.Point(),
          inBlack = false,
          startCount = false,
          px, py;

      for (px = 0; px < rx; px++) {
        if ((this.attributes[ry][px] & this.flags.LOCKED) !== 0) {
          if (!inBlack) {
            if (startCount)
              point.x++;
            inBlack = true;
          }
        } else {
          startCount = true;
          inBlack = false;
        }
      }
      inBlack = false;
      startCount = false;
      for (py = 0; py < ry; py++) {
        if ((this.attributes[py][rx] & this.flags.LOCKED) !== 0) {
          if (!inBlack) {
            if (startCount)
              point.y++;
            inBlack = true;
          }
        } else {
          startCount = true;
          inBlack = false;
        }
      }
      return point;
    },
    /**
     * 
     * Whether the blinking cursor must be enabled or disabled.
     * @param {boolean} status
     */
    setCursorEnabled: function (status) {
      this.cursorEnabled = status;
      if (status === true)
        this.startCursorBlink();
      else
        this.stopCursorBlink();
    },
    /**
     * 
     * Starts the {@link AWT.Timer} that makes the cursor blink.
     */
    startCursorBlink: function () {
      if (this.useCursor && this.cursorEnabled && this.cursorTimer && !this.cursorTimer.isRunning()) {
        this.blink(1);
        this.cursorTimer.start();
      }
    },
    /**
     * 
     * Stops the {@link AWT.Timer} that makes the cursor blink.
     */
    stopCursorBlink: function () {
      if (this.cursorTimer && this.cursorTimer.isRunning()) {
        this.cursorTimer.stop();
        this.blink(-1);
      }
    },
    /**
     * 
     * Moves the cursor in the specified x and y directions.
     * @param {number} dx - Amount to move in the 'X' axis
     * @param {number} dy - Amount to move in the 'Y' axis
     * @param {boolean} skipLocked - Skip locked cells (wildcards in {@link CrossWord})
     */
    moveCursor: function (dx, dy, skipLocked) {
      if (this.useCursor) {

        var point = this.findNextCellWithAttr(this.cursor.x, this.cursor.y,
            skipLocked ? this.flags.LOCKED : this.flags.NORMAL,
            dx, dy, false);

        if (!this.cursor.equals(point))
          this.setCursorAt(point.x, point.y, skipLocked);
      }
    },
    /**
     * 
     * Finds the coordinates of the nearest non-locked cell (non wildcard) moving on the indicated
     * 'X' and 'Y' directions.
     * @param {AWT.Point} - Logical coordinates of the starting point
     * @param {number} dx - 0 means no movement, 1 go right, -1 go left.
     * @param {number} dy - 0 means no movement, 1 go down, -1 go up.
     * @returns {AWT.Point}
     */
    findFreeCell: function (from, dx, dy) {
      var result = null;
      if (from && (dx !== 0 || dy !== 0)) {
        var scan = new AWT.Point(from);
        while (result === null) {
          scan.x += dx;
          scan.y += dy;
          if (scan.x < 0 || scan.x >= this.nCols || scan.y < 0 || scan.y >= this.nRows)
            break;
          if (!this.getCellAttribute(scan.x, scan.y, this.flags.LOCKED))
            result = scan;
        }
      }
      return result;
    },
    /**
     * 
     * Finds the first cell with the specified attributes at the specified state, starting
     * at specified point.
     * @param {number} startX - Starting X coordinate
     * @param {number} startY - Starting Y coordinate
     * @param {number} attr - Attribute to check. See {@link TextGrid#flags}.
     * @param {number} dx - 0 means no movement, 1 go right, -1 go left.
     * @param {number} dy - 0 means no movement, 1 go down, -1 go up.
     * @param {boolean} attrState - Desired state (enabled or disabled) of `attr`
     * @returns {AWT.Point}
     */
    findNextCellWithAttr: function (startX, startY, attr, dx, dy, attrState) {
      var point = new AWT.Point(startX + dx, startY + dy);
      while (true) {
        if (point.x < 0) {
          point.x = this.nCols - 1;
          if (point.y > 0)
            point.y--;
          else
            point.y = this.nRows - 1;
        }
        else if (point.x >= this.nCols) {
          point.x = 0;
          if (point.y < this.nRows - 1)
            point.y++;
          else
            point.y = 0;
        }
        if (point.y < 0) {
          point.y = this.nRows - 1;
          if (point.x > 0)
            point.x--;
          else
            point.x = this.nCols - 1;
        }
        else if (point.y >= this.nRows) {
          point.y = 0;
          if (point.x < this.nCols - 1)
            point.x++;
          else
            point.x = 0;
        }
        if ((point.x === startX && point.y === startY) ||
            this.getCellAttribute(point.x, point.y, attr) === attrState)
          break;
        point.x += dx;
        point.y += dy;
      }
      return point;
    },
    /**
     * 
     * Sets the blinking cursor at a specific point
     * @param {number} px - X coordinate
     * @param {number} py - Y coordinate
     * @param {boolean} skipLocked - Skip locked (wildcard) cells
     */
    setCursorAt: function (px, py, skipLocked) {
      this.stopCursorBlink();
      if (this.isValidCell(px, py)) {
        this.cursor.x = px;
        this.cursor.y = py;
        this.useCursor = true;
        if (skipLocked && this.getCellAttribute(px, py, this.flags.LOCKED)) {
          this.moveCursor(1, 0, skipLocked);
        }
        else {
          if (this.cursorEnabled)
            this.startCursorBlink();
        }
      }
    },
    /**
     * 
     * Sets the `useCursor` property of this text grid
     * @param {boolean} value
     */
    setUseCursor: function (value) {
      this.useCursor = value;
    },
    /**
     * 
     * Gets the current position of the blinking cursor
     * @returns {AWT.Point}
     */
    getCursor: function () {
      return this.cursor;
    },
    /**
     * 
     * Counts the number of cells of this grid with the specified character
     * @param {string} ch
     * @returns {number}
     */
    countCharsLike: function (ch) {
      var result = 0,
          px, py;

      for (py = 0; py < this.nRows; py++)
        for (px = 0; px < this.nCols; px++)
          if (this.chars[py][px] === ch)
            result++;

      return result;
    },
    /**
     * 
     * Gets the number of cells of this grid
     * @returns {number}
     */
    getNumCells: function () {
      return this.nRows * this.nCols;
    },
    /**
     * 
     * Counts the number of coincidences between the `answers` array and the current content of this grid
     * @param {boolean} checkCase - Make comparisions case-sensitive
     * @returns {number}
     */
    countCoincidences: function (checkCase) {
      var result = 0,
          px, py;

      if (this.answers)
        for (py = 0; py < this.nRows; py++)
          for (px = 0; px < this.nCols; px++)
            if (this.isCellOk(px, py, checkCase))
              result++;

      return result;
    },
    /**
     * 
     * Checks if a specific cell is equivalent to the content of `answers` at its position
     * @param {number} px - X coordinate
     * @param {number} py - Y coordinate
     * @param {boolean} checkCase - Make comparisions case-sensitive
     * @returns {boolean}
     */
    isCellOk: function (px, py, checkCase) {
      var result = false,
          ch, ch2;

      if (this.isValidCell(px, py)) {
        ch = this.chars[py][px];
        if (ch !== this.wild) {
          ch2 = this.answers[py][px];
          if (ch === ch2 ||
              (!checkCase && ch.toUpperCase() === ch2.toUpperCase()))
            result = true;
        }
      }
      return result;
    },
    /**
     * 
     * Gets the logical coordinates (in 'cell' units) of a device point into the grid
     * @param {AWT.Point} devicePoint
     * @returns {AWT.Point}
     * 
     */
    getLogicalCoords: function (devicePoint) {

      if (!this.contains(devicePoint))
        return null;

      var px = Math.floor((devicePoint.x - this.pos.x) / this.cellWidth),
          py = Math.floor((devicePoint.y - this.pos.y) / this.cellHeight);

      if (this.isValidCell(px, py)) {
        return new AWT.Point(px, py);
      }
      else
        return null;
    },
    /**
     * 
     * Checks if the specified logical coordinates are inside the valid bounds of the grid.
     * @param {number} px - 'X' coordinate
     * @param {number} py - 'Y' coordinate
     * @returns {boolean}
     */
    isValidCell: function (px, py) {
      return px < this.nCols && py < this.nRows && px >= 0 && py >= 0;
    },
    /**
     * 
     * Sets the specified character as a content of the cell at specified coordinates
     * @param {number} px - 'X' coordinate
     * @param {number} py - 'Y' coordinate
     * @param {string} ch - The character to set.
     */
    setCharAt: function (px, py, ch) {
      if (this.isValidCell(px, py)) {
        this.chars[py][px] = ch;
        this.repaintCell(px, py);
      }
    },
    /**
     * Gets the character of the cell at the specified coordinates
     * @param {number} px - 'X' coordinate
     * @param {number} py - 'Y' coordinate
     * @returns {string}
     */
    getCharAt: function (px, py) {
      if (this.isValidCell(px, py))
        return this.chars[py][px];
      else
        return ' ';
    },
    /**
     * 
     * Gets the text formed by the letters between two cells that share a straight line on the grid.<br>
     * The text can be formed horizontally, vertically and diagonal, both in left-to-right or
     * right-to-left direction.<br>
     * @param {number} x0 - 'X' coordinate of the first cell
     * @param {number} y0 - 'Y' coordinate of the first cell
     * @param {number} x1 - 'X' coordinate of the second cell
     * @param {number} y1 - 'Y' coordinate of the second cell
     * @returns {string}
     */
    getStringBetween: function (x0, y0, x1, y1) {

      var sb = '', i, dx, dy, steps;

      if (this.isValidCell(x0, y0) && this.isValidCell(x1, y1)) {
        dx = x1 - x0;
        dy = y1 - y0;
        if (dx === 0 || dy === 0 || Math.abs(dx) === Math.abs(dy)) {
          steps = Math.max(Math.abs(dx), Math.abs(dy));
          if (steps > 0) {
            dx /= steps;
            dy /= steps;
          }
          for (i = 0; i <= steps; i++)
            sb += this.getCharAt(x0 + dx * i, y0 + dy * i);
        }
      }
      return sb;
    },
    /**
     * Sets a specific attribute to all cells forming a straight line between two cells on the grid.
     * @param {number} x0 - 'X' coordinate of the first cell
     * @param {number} y0 - 'Y' coordinate of the first cell
     * @param {number} x1 - 'X' coordinate of the second cell
     * @param {number} y1 - 'Y' coordinate of the second cell
     * @param {number} attribute - The binary flag representing this attribute. See {@link textGrid#flags}.
     * @param {boolean} value - Whether to set or unset the attribute.
     */
    setAttributeBetween: function (x0, y0, x1, y1, attribute, value) {

      if (this.isValidCell(x0, y0) && this.isValidCell(x1, y1)) {

        var dx = x1 - x0,
            dy = y1 - y0;

        if (dx === 0 || dy === 0 || Math.abs(dx) === Math.abs(dy)) {
          var steps = Math.max(Math.abs(dx), Math.abs(dy));
          if (steps > 0) {
            dx /= steps;
            dy /= steps;
          }
          for (var i = 0; i <= steps; i++)
            this.setAttribute(x0 + dx * i, y0 + dy * i, attribute, value);
        }
      }
    },
    /**
     * 
     * Sets or unsets a specifi attrobut to a cell.
     * @param {number} px - The 'X' coordinate of the cell
     * @param {number} py - The 'Y' coordinate of the cell
     * @param {number} attribute - The binary flag representing this attribute. See {@link textGrid#flags}.
     * @param {boolean} state - Whether to set or unset the attribute.
     */
    setAttribute: function (px, py, attribute, state) {
      if (this.isValidCell(px, py)) {
        if (this.attribute === this.flags.MARKED && !state)
          this.repaintCell(px, py);
        this.attributes[py][px] &= ~attribute;
        this.attributes[py][px] |= (state ? attribute : 0);
        if (attribute !== this.flags.MARKED || state)
          this.repaintCell(px, py);
      }
    },
    /**
     * 
     * Sets the specified attribute to all cells.
     * @param {number} attribute - The binary flag representing this attribute. See {@link textGrid#flags}.
     * @param {boolean} state - Whether to set or unset the attribute.
     */
    setAllCellsAttribute: function (attribute, state) {
      for (var py = 0; py < this.nRows; py++)
        for (var px = 0; px < this.nCols; px++)
          this.setAttribute(px, py, attribute, state);
    },
    /**
     * 
     * Gets the specified attribute of a cell
     * @param {number} px - The 'X' coordinate of the cell
     * @param {number} py - The 'Y' coordinate of the cell
     * @param {number} attribute - The binary flag representing this attribute. See {@link textGrid#flags}.
     * @returns {boolean} - `true` if the cell has this attribute, `false` otherwise.
     */
    getCellAttribute: function (px, py, attribute) {
      if (this.isValidCell(px, py))
        return (this.attributes[py][px] & attribute) !== 0;
      else
        return false;
    },
    /**
     * 
     * Gets the rectangle enclosing a specific cell
     * @param {number} px - The 'X' coordinate of the cell
     * @param {number} py - The 'Y' coordinate of the cell
     * @returns {AWT.Rectangle}
     */
    getCellRect: function (px, py) {
      return new AWT.Rectangle(this.pos.x + px * this.cellWidth, this.pos.y + py * this.cellHeight, this.cellWidth, this.cellHeight);
    },
    /**
     * 
     * Gets the rectangle enclosing a specific cell, including the border thick.
     * @param {number} px - The 'X' coordinate of the cell
     * @param {number} py - The 'Y' coordinate of the cell
     * @returns {AWT.Rectangle}
     */
    getCellBorderBounds: function (px, py) {

      var isMarked = this.getCellAttribute(px, py, this.flags.MARKED);

      if (!this.border && !isMarked)
        return this.getCellRect(px, py);

      var bb = this.getBoxBaseResolve(),
          strk = isMarked ? bb.markerStroke : bb.borderStroke;

      return  this.getCellRect(px, py).grow(strk.lineWidth, strk.lineWidth);
    },
    /**
     * 
     * Repaints a cell
     * @param {number} px - The 'X' coordinate of the cell
     * @param {number} py - The 'Y' coordinate of the cell
     */
    repaintCell: function (px, py) {
      if (this.container) {
        this.container.invalidate(this.getCellBorderBounds(px, py)).update();
      }
    },
    /**
     * 
     * Gets the preferred size of this grid
     * @returns {AWT.Dimension}
     */
    getPreferredSize: function () {
      return this.preferredBounds.dim;
    },
    /**
     * 
     * Gets the minimum size of this grid
     * @returns {AWT.Dimension}
     */
    getMinimumSize: function () {
      return new AWT.Dimension(this.defaults.MIN_CELL_SIZE * this.nCols, this.defaults.MIN_CELL_SIZE * this.nRows);
    },
    /**
     * 
     * Scales the grid to a new size
     * @param {number} scale - The factor used to multiply all coordinates and sizes
     * @returns {AWT.Dimension}
     */
    getScaledSize: function (scale) {
      return new AWT.Dimension(
          Utils.roundTo(scale * this.preferredBounds.dim.width, this.nCols),
          Utils.roundTo(scale * this.preferredBounds.dim.height, this.nRows));
    },
    /**
     * 
     * Overrides {@link AbstractBox#setBounds}
     * @param {(AWT.Rectangle|number)} rect - An AWT.Rectangle object, or the `x` coordinate of the
     * upper-left corner of a new rectangle.
     * @param {number=} y - `y` coordinate of the upper-left corner of the new rectangle.
     * @param {number=} w - Width of the new rectangle.
     * @param {number=} h - Height of the new rectangle.
     */
    setBounds: function (rect, y, w, h) {
      AbstractBox.prototype.setBounds.call(this, rect, y, w, h);
      this.cellWidth = this.dim.width / this.nCols;
      this.cellHeight = this.dim.height / this.nRows;
    },
    /**
     * 
     * Overrides {@link AbstractBox#updateContent}
     * @param {external:CanvasRenderingContext2D} ctx - The canvas rendering context used to draw the
     * grid.
     * @param {AWT.Rectangle=} dirtyRegion - The area that must be repainted. `null` refers to the whole box.
     */
    updateContent: function (ctx, dirtyRegion) {

      var bb = this.getBoxBaseResolve();

      // test font size        
      ctx.font = bb.font.cssFont();
      ctx.textBaseline = 'hanging';
      bb.prepareText(ctx, 'W',
          this.cellWidth - 2 * this.defaults.MIN_INTERNAL_MARGIN,
          this.cellHeight - 2 * this.defaults.MIN_INTERNAL_MARGIN);


      var ch = [],
          attr, isMarked, isInverted, isCursor,
          boxBounds,
          dx, dy, px, py, ry, bxr;
      // 
      // TODO: Check in different browsers and devices what is the real font height.
      // In Chrome on Linux (Gnome), substracting `bb.font._metrics.descent / 4` produces
      // good results, but in iPad this correction places the character at the bottom of the cell.
      ry = (this.cellHeight - bb.font.getHeight()) / 2;

      for (py = 0; py < this.nRows; py++) {
        for (px = 0; px < this.nCols; px++) {
          bxr = this.getCellBorderBounds(px, py);
          if (bxr.intersects(dirtyRegion)) {
            attr = this.attributes[py][px];
            if ((attr & this.flags.TRANSPARENT) === 0) {
              isInverted = (attr & this.flags.INVERTED) !== 0;
              isMarked = (attr & this.flags.MARKED) !== 0;
              isCursor = (this.useCursor && this.cursor.x === px && this.cursor.y === py);
              boxBounds = this.getCellRect(px, py);
              ctx.fillStyle = (isCursor && this.cursorBlink) ?
                  bb.inactiveColor :
                  isInverted ? bb.textColor : bb.backColor;
              boxBounds.fill(ctx);
              ctx.strokeStyle = 'black';
              if ((attr & this.flags.HIDDEN) === 0) {
                ch[0] = this.chars[py][px];
                if (ch[0]) {
                  dx = boxBounds.pos.x + (this.cellWidth - ctx.measureText(ch[0]).width) / 2;
                  dy = boxBounds.pos.y + ry;

                  if (bb.shadow) {
                    // Render text shadow
                    var d = Math.max(1, bb.font.size / 10);
                    ctx.fillStyle = bb.shadowColor;
                    ctx.fillText(ch[0], dx + d, dy + d);
                  }
                  // Render text
                  ctx.fillStyle = isInverted ? bb.backColor
                      : this.isAlternative() ? bb.alternativeColor : bb.textColor;
                  ctx.fillText(ch[0], dx, dy);
                }
              }
              if (this.border || isMarked) {
                ctx.strokeStyle = bb.borderColor;
                bb[isMarked ? 'markerStroke' : 'borderStroke'].setStroke(ctx);
                if (isMarked)
                  ctx.globalCompositeOperation = 'xor';

                // Draw border
                boxBounds.stroke(ctx);

                // Reset ctx default values
                if (isMarked)
                  ctx.globalCompositeOperation = 'source-over';

              }
              ctx.strokeStyle = 'black';
              AWT.Stroke.prototype.setStroke(ctx);
            }
          }
        }
      }
      return true;
    },
    /**
     * 
     * Makes the cursor blink, alternating between two states. This function should be called only by
     * {@link TextGrid.cursorTimer}
     * @param {boolean} status
     */
    blink: function (status) {
      // TODO: Move blink and timer to Activity.Panel
      if (this.useCursor) {
        this.cursorBlink = status === 1 ? true : status === -1 ? false : !this.cursorBlink;
        this.repaintCell(this.cursor.x, this.cursor.y);
      }
    },
    /**
     * 
     * Stops the cursor timer if not `null` and active
     */
    end: function () {
      if (this.cursorTimer) {
        this.cursorTimer.stop();
        this.cursorTimer = null;
      }
    }
  };

  // TextGrid extends AbstractBox
  TextGrid.prototype = $.extend(Object.create(AbstractBox.prototype), TextGrid.prototype);

  return TextGrid;
});
