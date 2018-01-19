/**
 *  File    : shapers/TriangularJigSaw.js
 *  Created : 25/05/2015
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
 *  (c) 2000-2018 Catalan Educational Telematic Network (XTEC)
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
  "./Shaper",
  "./JigSaw",
  "../AWT"
], function ($, Shaper, JigSaw, AWT) {
  /**
   * This {@link Shaper} returns a set of rectangular shapes with triangular teeth and slots that
   * fit between them.
   * @exports TriangularJigSaw
   * @class
   * @extends JigSaw
   */
  class TriangularJigSaw extends JigSaw {
    /**
     * TriangularJigSaw constructor
     * @param {number} nx - Number of columns
     * @param {number} ny - Number of rows
     */
    constructor(nx, ny) {
      super(nx, ny)
    }

    /**
     * Overrides {@link JigSaw#hLine}
     * @param {AWT.Path} sd - The Path to which the line will be added
     * @param {number} type - Type  of tooth: 0 is flat (no tooth), 1 means tooth up, and 2 means tooth down
     * @param {number} x - X coordinate of the starting point
     * @param {number} y - Y coordinate of the starting point
     * @param {number} w - Width of the piece
     * @param {number} h - Height of the piece
     * @param {boolean} inv - The line must be drawn right to left
     */
    hLine(sd, type, x, y, w, h, inv) {
      const
        kx = inv ? -1 : 1,
        ky = type === 1 ? 1 : -1

      if (type === 0)
        // Flat line
        sd.addStroke(new AWT.PathStroke('L', [x + w * kx, y]))
      else {
        const x0 = x + (w - w * this.baseWidthFactor) / 2 * kx
        const wb = w * this.baseWidthFactor * kx
        // Approximation to the tooth:
        sd.addStroke(new AWT.PathStroke('L', [x0, y]))
        // This is the tooth:
        const hb = h * this.toothHeightFactor * ky
        sd.addStroke(new AWT.PathStroke('L', [x0 + wb / 2, y + hb]))
        sd.addStroke(new AWT.PathStroke('L', [x0 + wb, y]))
        // Draw the remaining line
        sd.addStroke(new AWT.PathStroke('L', [x + w * kx, y]))
      }
    }

    /**
     * Overrides {@link JigSaw#vLine}
     * @param {AWT.Path} sd - The Path to which the line will be added
     * @param {number} type - Type  of tooth: 0 is flat (no tooth), 1 means tooth right, and 2 means tooth left
     * @param {number} x - X coordinate of the starting point
     * @param {number} y - Y coordinate of the starting point
     * @param {number} w - Width of the piece
     * @param {number} h - Height of the piece
     * @param {boolean} inv - The line must be drawn bottom to top
     */
    vLine(sd, type, x, y, w, h, inv) {
      const
        ky = inv ? -1 : 1,
        kx = type === 1 ? 1 : -1

      if (type === 0)
        // Flat line
        sd.addStroke(new AWT.PathStroke('L', [x, y + h * ky]))
      else {
        const
          y0 = y + (h - h * this.baseWidthFactor) / 2 * ky,
          hb = h * this.baseWidthFactor * ky

        // Approximation to the tooth:
        sd.addStroke(new AWT.PathStroke('L', [x, y0]))
        // This is the tooth:
        const wb = w * this.toothHeightFactor * kx
        sd.addStroke(new AWT.PathStroke('L', [x + wb, y0 + hb / 2]))
        sd.addStroke(new AWT.PathStroke('L', [x, y0 + hb]))
        // Draw the remaining line
        sd.addStroke(new AWT.PathStroke('L', [x, y + h * ky]))
      }
    }
  }

  // Register this class in the list of known shapers
  Shaper.CLASSES['@TriangularJigSaw'] = TriangularJigSaw

  return TriangularJigSaw

})
