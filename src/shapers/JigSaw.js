//    File    : JigSaw.js  
//    Created : 24/05/2015  
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
  "./Shaper",
  "../AWT"
], function ($, Shaper, AWT) {

  //
  // This [Shaper](Shaper.html) returns a set of rectangular shapes with teeth and slots that fit
  // between them.
  var JigSaw = function (nx, ny) {
    Shaper.call(this, nx, ny);
  };

  JigSaw.prototype = {
    constructor: JigSaw,
    //
    // Overwrites the `rectangularShapes` flag of [Shaper](Shaper.html)
    rectangularShapes: false,
    //
    // Builds the rectangular shapes
    buildShapes: function () {
      // Create two two-dimension arrays for storing the type of horizontal and vertical lines
      var hLineType = [];
      var vLineType = [];
      for (var i = 0; i <= this.nRows; i++) {
        hLineType[i] = [];
        vLineType[i] = [];
      }

      for (var row = 0; row < this.nRows; row++) {
        for (var col = 0; col < this.nCols; col++) {
          if (row === 0) {
            hLineType[row][col] = 0;
          } else {
            hLineType[row][col] = 1 + ((this.randomLines ? Math.round(Math.random() * 9) : row + col) % 2);
          }
          if (col === 0) {
            vLineType[row][col] = 0;
          } else {
            vLineType[row][col] = 1 + ((this.randomLines ? Math.round(Math.random() * 9) : col + row + 1) % 2);
          }
          if (col === this.nCols - 1)
            vLineType[row][col + 1] = 0;
          if (row === this.nRows - 1)
            hLineType[row + 1][col] = 0;
        }
      }

      var w = 1 / this.nCols;
      var h = 1 / this.nRows;

      for (var r = 0; r < this.nRows; r++) {
        for (var c = 0; c < this.nCols; c++) {
          var x = w * c;
          var y = h * r;
          var sd = new AWT.Path([new AWT.PathStroke('M', [x, y])]);
          this.hLine(sd, hLineType[r][c], x + 0, y + 0, w, h, false);
          this.vLine(sd, vLineType[r][c + 1], x + w, y + 0, w, h, false);
          this.hLine(sd, hLineType[r + 1][c], x + w, y + h, w, h, true);
          this.vLine(sd, vLineType[r][c], x + 0, y + h, w, h, true);
          sd.addStroke(new AWT.PathStroke('X'));
          sd.calcEnclosingRect();
          // Save the Path in `shapeData`
          this.shapeData[r * this.nCols + c] = sd;
        }
      }
      this.initiated = true;
    },
    //
    // Adds an horizontal line to the provided path
    // sd (AWT.Path) - The Path where the line will be added
    // type (number) - Type  of tooth: 0 is flat (no tooth), 1 means tooth up, 2 means tooth down
    // x and y (number) - Starting point
    // w and h (number) - Width and height of the piece
    // inv - The line will be drawn right to left
    hLine: function (sd, type, x, y, w, h, inv) {
      var kx = inv ? -1 : 1;
      var ky = (type === 1 ? 1 : -1);

      if (type === 0) {
        // Flat line
        sd.addStroke(new AWT.PathStroke('L', [x + w * kx, y]));
      }
      else {
        var x0 = x + ((w - w * this.baseWidthFactor) / 2) * kx;
        var wb = w * this.baseWidthFactor * kx;
        // Approximation to the tooth:
        sd.addStroke(new AWT.PathStroke('L', [x0, y]));
        // This is the tooth:
        var hb = (h * this.toothHeightFactor) * ky;
        sd.addStroke(new AWT.PathStroke('L', [x0, y + hb]));
        sd.addStroke(new AWT.PathStroke('L', [x0 + wb, y + hb]));
        sd.addStroke(new AWT.PathStroke('L', [x0 + wb, y]));
        // Draw the remaining line
        sd.addStroke(new AWT.PathStroke('L', [x + w * kx, y]));
      }
    },
    //
    // Adds an vertical line to the provided path
    // sd (AWT.Path) - The Path where the line will be added
    // type (number) - Type  of tooth: 0 is flat (no tooth), 1 means tooth right, 2 means tooth left
    // x and y (number) - Starting point
    // w and h (number) - Width and height of the piece
    // inv - The line will be drawn bottom to top
    vLine: function (sd, type, x, y, w, h, inv) {
      var ky = inv ? -1 : 1;
      var kx = (type === 1 ? 1 : -1);

      if (type === 0) {
        // Flat line
        sd.addStroke(new AWT.PathStroke('L', [x, y + h * ky]));
      }
      else {
        var y0 = y + ((h - h * this.baseWidthFactor) / 2) * ky;
        var hb = h * this.baseWidthFactor * ky;
        // Approximation to the tooth:
        sd.addStroke(new AWT.PathStroke('L', [x, y0]));
        // This is the tooth:
        var wb = w * this.toothHeightFactor * kx;
        sd.addStroke(new AWT.PathStroke('L', [x + wb, y0]));
        sd.addStroke(new AWT.PathStroke('L', [x + wb, y0 + hb]));
        sd.addStroke(new AWT.PathStroke('L', [x, y0 + hb]));
        // Draw the remaining line
        sd.addStroke(new AWT.PathStroke('L', [x, y + h * ky]));
      }
    }
  };

  // JigSaw extends Shaper
  JigSaw.prototype = $.extend(Object.create(Shaper.prototype), JigSaw.prototype);

  Shaper.prototype._CLASSES['@JigSaw'] = JigSaw;

  // TODO: Assign specific classes to JigSaw shapers!
  Shaper.prototype._CLASSES['@ClassicJigSaw'] = JigSaw;
  Shaper.prototype._CLASSES['@TriangularJigSaw'] = JigSaw;

  return JigSaw;

});
