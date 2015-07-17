//    File    : ClassicJigSaw.js  
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
  "./Shaper",
  "./JigSaw",
  "../AWT"
], function ($, Shaper, JigSaw, AWT) {
  /**
   * This is the classic {@link JigSaw} {@link Shaper} used in puzzle toys, where teeth and slots
   * are shaped by bezier curves.
   * @exports ClassicJigSaw
   * @class
   * @extends JigSaw
   * @param {number} nx - Number of columns
   * @param {number} ny - Number of rows
   */
  var ClassicJigSaw = function (nx, ny) {
    JigSaw.call(this, nx, ny);
  };

  ClassicJigSaw.prototype = {
    constructor: ClassicJigSaw,
    /**
     * ClassicJigSaw needs a biggest base width
     * @type {number} */
    baseWidthFactor: 3.0 / 4,
    /**
     * ClassicJigSaw needs a biggest base height factor
     * @type {number} */
    toothHeightFactor: 3.0 / 5,
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
        var wb = w * (this.baseWidthFactor / 12) * kx;
        // Approximation to the tooth:
        sd.addStroke(new AWT.PathStroke('L', [x0, y]));
        // This is the tooth:
        var hb = ((h * this.toothHeightFactor) * ky) / 8;
        sd.addStroke(new AWT.PathStroke('B', [x0 + 4 * wb, y, x0 + 6 * wb, y - hb, x0 + 4 * wb, y - 3 * hb]));
        sd.addStroke(new AWT.PathStroke('B', [x0 + 2 * wb, y - 5 * hb, x0 + 10 * wb, y - 5 * hb, x0 + 8 * wb, y - 3 * hb]));
        sd.addStroke(new AWT.PathStroke('B', [x0 + 6 * wb, y - 1 * hb, x0 + 8 * wb, y, x0 + 12 * wb, y]));
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
        var hb = (h * this.baseWidthFactor) / 12 * ky;
        // Approximation to the tooth:
        sd.addStroke(new AWT.PathStroke('L', [x, y0]));
        // This is the tooth:
        var wb = (w * this.toothHeightFactor * kx) / 8;
        sd.addStroke(new AWT.PathStroke('B', [x, y0 + 4 * hb, x - wb, y0 + 6 * hb, x - 3 * wb, y0 + 4 * hb]));
        sd.addStroke(new AWT.PathStroke('B', [x - 5 * wb, y0 + 2 * hb, x - 5 * wb, y0 + 10 * hb, x - 3 * wb, y0 + 8 * hb]));
        sd.addStroke(new AWT.PathStroke('B', [x - 1 * wb, y0 + 6 * hb, x, y0 + 8 * hb, x, y0 + 12 * hb]));
        // Draw the remaining line
        sd.addStroke(new AWT.PathStroke('L', [x, y + h * ky]));
      }
    }
  };

  // ClassicJigSaw extends JigSaw
  ClassicJigSaw.prototype = $.extend(Object.create(JigSaw.prototype), ClassicJigSaw.prototype);

  // Register this class in the list of known shapers
  Shaper.CLASSES['@ClassicJigSaw'] = ClassicJigSaw;

  return ClassicJigSaw;
});
