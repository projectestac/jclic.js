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
  //
  // This class is a special type of [AbstractBox](AbstractBox.html) that displays a grid of single
  // characters. It is used in activities like crosswords and scrambled letters. 
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
    nRows: 1,
    nCols: 1,
    chars: null,
    answers: null,
    attributes: null,
    cellWidth: 20,
    cellHeight: 20,
    preferredBounds: null,
    wild: TextGridContent.prototype.wild,
    randomChars: TextGridContent.prototype.randomChars,
    cursorEnabled: false,
    useCursor: false,
    cursor: null,
    cursorBlink: false,
    cursorTimer: null,
    wildTransparent: false,
    //
    // Default values
    defaults: {
      MIN_CELL_SIZE: 12,
      DEFAULT_CELL_SIZE: 20,
      MIN_INTERNAL_MARGIN: 2
    },
    //
    // Binary flags used to mark status
    flags: {
      NORMAL: 0,
      INVERTED: 1,
      HIDDEN: 2,
      LOCKED: 4,
      MARKED: 8,
      TRANSPARENT: 16
    },
    //
    // Creates an empty grid based on a [TextGridContent](TextGridContent.html)
    // parent (AbstractBox). This static method should be called always as
    // `TextGrid.prototype._createEmptyGrid(...)`
    // container (AWT.Container)
    // x and y (Number)
    // tgc (TextGridContent)
    // wildTransparent (Boolean)
    _createEmptyGrid: function (parent, container, x, y, tgc, wildTransparent) {
      var result = new TextGrid(parent, container, tgc.bb,
          x, y, tgc.ncw, tgc.nch, tgc.w, tgc.h, tgc.border);
      result.wild = tgc.wild;
      result.randomChars = tgc.randomChars;
      result.wildTransparent = wildTransparent;
      return result;
    },
    //
    // Sets the characters to be placed in the cells of this TextGrid
    // text (Array of String)
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
    //
    // Substitutes the current content of all cells with wildcards with a randomly generated char
    randomize: function () {
      for (var py = 0; py < this.nRows; py++)
        for (var px = 0; px < this.nCols; px++)
          if (this.chars[py][px] === this.wild)
            this.chars[py][px] = this.randomChars.charAt(
                Math.floor(Math.random() * this.randomChars.length));
    },
    // 
    // Clears or sets global attributes to all cells
    // lockWild (Boolean) - When `true`, the wildcard cells will be marked with special attributes.
    // (used in CrossWords to mark black cells)
    // clearChars (Boolean) - When `true`, the current content of the cell will be erased.
    setCellAttributes: function (lockWild, clearChars) {
      var atr = this.flags.LOCKED;
      if (this.wildTransparent)
        atr |= this.flags.TRANSPARENT;
      else
        atr |= this.flags.INVERTED | this.flags.HIDDEN;
      for (var py = 0; py < this.nRows; py++){
        for (var px = 0; px < this.nCols; px++){
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
    //
    // Sets or unsets the `locked` properties (black cell) to a specific cell
    // px and py (Number) - The logicat coordinates of the cell
    // locked (Boolean) - When true, the `locked` attributes will be on. Otherwise, off.
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
    // 
    // rx (Number)
    // ry (Number)
    // Returns: AWT.Point
    getItemFor: function (rx, ry) {
      if (!this.isValidCell(rx, ry))
        return null;
      var point = new AWT.Point();
      var inBlack = false;
      var startCount = false;
      for (var px = 0; px < rx; px++) {
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
      for (var py = 0; py < ry; py++) {
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
    //
    // status (Boolean)
    setCursorEnabled: function (status) {
      this.cursorEnabled = status;
      if (status === true)
        this.startCursorBlink();
      else
        this.stopCursorBlink();
    },
    //
    //
    startCursorBlink: function () {
      if (this.useCursor && this.cursorEnabled && this.cursorTimer && !this.cursorTimer.isRunning()) {
        this.blink(1);
        this.cursorTimer.start();
      }
    },
    //
    //
    stopCursorBlink: function () {
      if (this.cursorTimer && this.cursorTimer.isRunning()) {
        this.cursorTimer.stop();
        this.blink(-1);
      }
    },
    //
    // dx(Number)
    // dy (Number)
    // skipLocked (Boolean)
    moveCursor: function (dx, dy, skipLocked) {
      if (this.useCursor) {
        var point = this.findNextCellWithAttr(this.cursor.x, this.cursor.y,
            skipLocked ? this.flags.LOCKED : this.flags.NORMAL,
            dx, dy, false);
        if (!this.cursor.equals(point))
          this.setCursorAt(point.x, point.y, skipLocked);
      }
    },
    //
    // from (AWT.Point)
    // dx (Number)
    // dy (Number)
    // returns: AWT.Point
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
    //
    // pt (AWT.Point)
    // checkHorizontal (Boolean)
    // returns: Boolean
    isIntoBlacks: function (pt, checkHorizontal) {
      var result = false;
      if (checkHorizontal) {
        result = (pt.x <= 0 || this.getCellAttribute(pt.x - 1, pt.y, this.flags.LOCKED))
            && (pt.x >= this.nCols - 1 || this.getCellAttribute(pt.x + 1, pt.y, this.flags.LOCKED));
      }
      else {
        result = (pt.y <= 0 || this.getCellAttribute(pt.x, pt.y - 1, this.flags.LOCKED))
            && (pt.y >= this.nRows - 1 || this.getCellAttribute(pt.x, pt.y + 1, this.flags.LOCKED));
      }
      return result;
    },
    //
    // pt (AWT.Point)
    // checkHorizontal (Boolean)
    // returns: Boolean    
    isIntoWhites: function (pt, checkHorizontal) {
      var result = false;
      if (checkHorizontal) {
        result = (pt.x > 0 && !this.getCellAttribute(pt.x - 1, pt.y, this.flags.LOCKED))
            && (pt.x < this.nCols - 1 && !this.getCellAttribute(pt.x + 1, pt.y, this.flags.LOCKED));
      }
      else {
        result = (pt.y > 0 && !this.getCellAttribute(pt.x, pt.y - 1, this.flags.LOCKED))
            && (pt.y < this.nRows - 1 && !this.getCellAttribute(pt.x, pt.y + 1, this.flags.LOCKED));
      }
      return result;
    },
    //
    // startX (Number)
    // startY (Number)
    // attr (Nuber)
    // dx (Number)
    // dy (Number)
    // attrState (Boolean)
    // returns: AWT.Point   
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
    //
    // px (Number)
    // py (Number)
    // skipLocked (Boolean)
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
    //
    // value (Boolean)
    setUseCursor: function (value) {
      this.useCursor = value;
    },
    //
    // returns AWT.Point
    getCursor: function () {
      return this.cursor;
    },
    //
    // ch (char)
    // returns: Number
    countCharsLike: function (ch) {
      var result = 0;
      for (var py = 0; py < this.nRows; py++)
        for (var px = 0; px < this.nCols; px++)
          if (this.chars[py][px] === ch)
            result++;
      return result;
    },
    //
    // returns: Number   
    getNumCells: function () {
      return this.nRows * this.nCols;
    },
    //
    // checkCase (Boolean)
    // returns: Number    
    countCoincidences: function (checkCase) {
      var result = 0;
      if (this.answers)
        for (var py = 0; py < this.nRows; py++)
          for (var px = 0; px < this.nCols; px++)
            if (this.isCellOk(px, py, checkCase))
              result++;
      return result;
    },
    //
    // px (Number)
    // py (Number)
    // checkCase (boolean)
    // returns: Boolean
    isCellOk: function (px, py, checkCase) {
      var result = false;
      if (this.isValidCell(px, py)) {
        var ch = this.chars[py][px];
        if (ch !== this.wild) {
          var ch2 = this.answers[py][px];
          if (ch === ch2 ||
              (!checkCase && ch.toUpperCase() === ch2.toUpperCase()))
            result = true;
        }
      }
      return result;
    },
    //
    // devicePoint (AWT.Point)
    // returns: AWT.Point
    getLogicalCoords: function (devicePoint) {
      if (!this.contains(devicePoint))
        return null;
      var px = Math.floor((devicePoint.x - this.pos.x) / this.cellWidth);
      var py = Math.floor((devicePoint.y - this.pos.y) / this.cellHeight);
      if (this.isValidCell(px, py)) {
        return new AWT.Point(px, py);
      }
      else
        return null;
    },
    //
    // px (Number)
    // py (Number)
    // Returns: Boolean
    isValidCell: function (px, py) {
      return px < this.nCols && py < this.nRows && px >= 0 && py >= 0;
    },
    //
    // px (Number)
    // py (Number)
    // ch (char)
    setCharAt: function (px, py, ch) {
      if (this.isValidCell(px, py)) {
        this.chars[py][px] = ch;
        this.repaintCell(px, py);
      }
    },
    //
    // px (Number)
    // py (Number)
    // Returns: char   
    getCharAt: function (px, py) {
      if (this.isValidCell(px, py))
        return this.chars[py][px];
      else
        return ' ';
    },
    //
    // x0 and y0 (Number)
    // x1 and y1 (Number)
    // Returns: String
    getStringBetween: function (x0, y0, x1, y1) {
      var sb = '';
      if (this.isValidCell(x0, y0) && this.isValidCell(x1, y1)) {
        var dx = x1 - x0;
        var dy = y1 - y0;
        if (dx === 0 || dy === 0 || Math.abs(dx) === Math.abs(dy)) {
          var steps = Math.max(Math.abs(dx), Math.abs(dy));
          if (steps > 0) {
            dx /= steps;
            dy /= steps;
          }
          for (var i = 0; i <= steps; i++)
            sb += this.getCharAt(x0 + dx * i, y0 + dy * i);
        }
      }
      return sb;
    },
    //
    // x0 and y0 (Number)
    // x1 and y1 (Number)
    // atribute (Number)
    // value (Boolean)
    setAttributeBetween: function (x0, y0, x1, y1, attribute, value) {
      if (this.isValidCell(x0, y0) && this.isValidCell(x1, y1)) {
        var dx = x1 - x0;
        var dy = y1 - y0;
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
    //
    // px and py (Number)
    // attribute (Number)
    // state (Boolean)
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
    //
    // attribute (Number)
    // state (Boolean)
    setAllCellsAttribute: function (attribute, state) {
      for (var py = 0; py < this.nRows; py++)
        for (var px = 0; px < this.nCols; px++)
          this.setAttribute(px, py, attribute, state);
    },
    //
    // px and py (Number)
    // attribute (Number)
    // returns Boolean
    getCellAttribute: function (px, py, attribute) {
      if (this.isValidCell(px, py))
        return (this.attributes[py][px] & attribute) !== 0;
      else
        return false;
    },
    //
    // px and py (Number)
    // Returns: AWT.Rectangle
    getCellRect: function (px, py) {
      return new AWT.Rectangle(this.pos.x + px * this.cellWidth, this.pos.y + py * this.cellHeight, this.cellWidth, this.cellHeight);
    },
    //
    // px and py (Number)
    // Returns: AWT.Rectangle    
    getCellBorderBounds: function (px, py) {
      var isMarked = this.getCellAttribute(px, py, this.flags.MARKED);
      if (!this.border && !isMarked)
        return this.getCellRect(px, py);
      var bb = this.getBoxBaseResolve();
      var strk = isMarked ? bb.markerStroke : bb.borderStroke;
      return  this.getCellRect(px, py).grow(strk.lineWidth, strk.lineWidth);
    },
    //
    // px and py (Number)
    repaintCell: function (px, py) {
      if (this.container){
        this.container.invalidate(this.getCellBorderBounds(px, py)).update();
      }
    },
    //
    // Returns: AWT.Dimension
    getPreferredSize: function () {
      return this.preferredBounds.dim;
    },
    //
    // Returns: AWT.Dimension
    getMinimumSize: function () {
      return new AWT.Dimension(this.defaults.MIN_CELL_SIZE * this.nCols, this.defaults.MIN_CELL_SIZE * this.nRows);
    },
    // scale (Number)
    // Returns: AWT.Dimension
    getScaledSize: function (scale) {
      return new AWT.Dimension(
          Utils.roundTo(scale * this.preferredBounds.dim.width, this.nCols),
          Utils.roundTo(scale * this.preferredBounds.dim.height, this.nRows));
    },
    //
    // Overrides SetBounds in AWT.Rectangle
    // r (AWT.Rectangle)
    setBounds: function (r, y, w, h) {
      AbstractBox.prototype.setBounds.call(this, r, y, w, h);
      this.cellWidth = this.dim.width / this.nCols;
      this.cellHeight = this.dim.height / this.nRows;
    },
    //
    // Overrides updateContent in AbstractBox
    // ctx - Canvas graphic context
    // dirtyRegion (Rectangle)
    updateContent: function (ctx, dirtyRegion) {

      var bb = this.getBoxBaseResolve();

      // test font size        
      ctx.font = bb.font.cssFont();
      ctx.textBaseline = 'hanging';
      bb.prepareText(ctx, 'W',
          this.cellWidth - 2 * this.defaults.MIN_INTERNAL_MARGIN,
          this.cellHeight - 2 * this.defaults.MIN_INTERNAL_MARGIN);


      var ch = [];
      var attr;
      var isMarked, isInverted, isCursor;
      var boxBounds;
      var dx, dy;
      // 
      // TODO: Check in different browsers and devices what is the real font height.
      // In Chrome on Linux (Gnome), substracting `bb.font._descent / 4` produces
      // good results, but in iPad this correction places the character at the bottom of the cell.
      var ry = (this.cellHeight - bb.font.getHeight()) / 2;

      for (var py = 0; py < this.nRows; py++) {
        for (var px = 0; px < this.nCols; px++) {
          var bxr = this.getCellBorderBounds(px, py);
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
    //
    // TODO: Move blink and timer to Activity.Panel
    blink: function (status) {
      if (this.useCursor) {
        this.cursorBlink = status === 1 ? true : status === -1 ? false : !this.cursorBlink;
        this.repaintCell(this.cursor.x, this.cursor.y);
      }
    },
    //
    //
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
