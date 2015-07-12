//    File    : TriangularJigSaw.js  
//    Created : 25/05/2015  
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
  "./JigSaw",
  "../AWT"
], function ($, JigSaw, AWT) {
  /**
   * This {@link Shaper} returns a set of rectangular shapes with triangular teeth and slots that
   * fit between them.
   * @exports TriangularJigSaw
   * @class
   * @extends JigSaw
   * @param {number} nx - Number of columns
   * @param {number} ny - Number of rows
   */
  var TriangularJigSaw = function (nx, ny) {
    JigSaw.call(this, nx, ny);
  };

  TriangularJigSaw.prototype = {
    constructor: TriangularJigSaw,
    /**
     * 
     * Overrides {@link JigSaw#hLine}
     * @param {AWT.Path} sd - The Path to which the line will be added
     * @param {number} type - Type  of tooth: 0 is flat (no tooth), 1 means tooth up, and 2 means tooth down
     * @param {number} x - X coordinate of the starting point
     * @param {number} y - Y coordinate of the starting point
     * @param {number} w - Width of the piece
     * @param {number} h - Height of the piece
     * @param {boolean} inv - The line must be drawn right to left
     */
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
        sd.addStroke(new AWT.PathStroke('L', [x0 + wb / 2, y + hb]));
        sd.addStroke(new AWT.PathStroke('L', [x0 + wb, y]));
        // Draw the remaining line
        sd.addStroke(new AWT.PathStroke('L', [x + w * kx, y]));
      }
    },
    /**
     * 
     * Overrides {@link JigSaw#vLine}
     * @param {AWT.Path} sd - The Path to which the line will be added
     * @param {number} type - Type  of tooth: 0 is flat (no tooth), 1 means tooth right, and 2 means tooth left
     * @param {number} x - X coordinate of the starting point
     * @param {number} y - Y coordinate of the starting point
     * @param {number} w - Width of the piece
     * @param {number} h - Height of the piece
     * @param {boolean} inv - The line must be drawn bottom to top
     */
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
        sd.addStroke(new AWT.PathStroke('L', [x + wb, y0 + hb / 2]));
        sd.addStroke(new AWT.PathStroke('L', [x, y0 + hb]));
        // Draw the remaining line
        sd.addStroke(new AWT.PathStroke('L', [x, y + h * ky]));
      }
    }
  };

  // TriangularJigSaw extends JigSaw
  TriangularJigSaw.prototype = $.extend(Object.create(JigSaw.prototype), TriangularJigSaw.prototype);

  // Register this class in the list of known shapers
  JigSaw.prototype._CLASSES['@TriangularJigSaw'] = TriangularJigSaw;

  return TriangularJigSaw;
});
