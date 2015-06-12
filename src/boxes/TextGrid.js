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
  "./AbstractBox",
  "./TextGridContent"
], function ($, AWT, AbstractBox, TextGridContent) {
  //
  // This class is a special type of [AbstractBox](AbstractBox.html) that displays a grid of single
  // characters. It is used in activities like crosswords and scrambled letters. 
  var TextGrid = function (parent, container, boxBase, x, x, ncw, nch, cellW, cellH, border) {
    AbstractBox.call(this, parent, container, boxBase);

    this.pos.x = x;
    this.pos.y = y;
    this.nCols = Math.max(1, ncw);
    this.nRows = Math.max(1, nch);
    this.cellWidth = Math.max(cellW, this.defaults.MIN_CELL_SIZE);
    this.cellHeight = Math.max(cellH, this.defaults.MIN_CELL_SIZE);
    this.dim.width = cellW * this.nCols;
    this.dim.height = cellH * this.nRows;
    this.preferredBounds = new AWT.Rectangle(this.pos, this.dim);
    this.setBorder(border);
    this.cursorTimer = new AWT.Timer(function () {
      // TODO: Implement method to be called by cursorTimer
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
    // Substitutes wild characters with randomly selected others
    randomize: function () {
      for (var py = 0; py < this.nRows; py++)
        for (var px = 0; px < this.nCols; px++)
          if (this.chars[py][px] === this.wild)
            this.chars[py][px] = this.randomChars.charAt(
                Math.floor(Math.random() * this.randomChars.length));
      //this.repaint();
    },
    //
    // lockWild (Boolean)
    // clearChars (Boolean)
    setCellAttributes: function (lockWild, clearChars) {
      var atr = this.flags.LOCKED;
      if (this.wildTransparent)
        atr |= this.flags.TRANSPARENT;
      else
        atr |= this.flags.INVERTED | this.flags.HIDDEN;
      for (var py = 0; py < this.nRows; py++)
        for (var px = 0; px < this.nCols; px++)
          if (lockWild && this.chars[py][px] === this.wild)
            this.attributes[py][px] = atr;
          else {
            this.attributes[py][px] = this.flags.NORMAL;
            if (clearChars)
              this.chars[py][px] = ' ';
          }
      //this.repaint();
    },
    //
    // px (Number)
    // py (Number)
    // locked (Boolean)
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
    }
    // TODO: Continue here with getItemFor
  };

  // TextGrid extends AbstractBox
  TextGrid.prototype = $.extend(Object.create(AbstractBox.prototype), TextGrid.prototype);

  return TextGrid;
});
