/**
 *  File    : shapers/Rectangular.js
 *  Created : 19/05/2015
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
  "./Shaper",
  "../AWT"
], function ($, Shaper, AWT) {
  /**
   *
   * This is the simplest {@link Shaper}. It divides the graphic object in a set of rectangular
   * shapes distributed in the specified number of rows and columns.
   * @exports Rectangular
   * @class
   * @extends Shaper
   * @param {number} nx - Number of columns
   * @param {number} ny - Number of rows
   */
  var Rectangular = function (nx, ny) {
    Shaper.call(this, nx, ny);
  };

  Rectangular.prototype = {
    constructor: Rectangular,
    /**
     * Overrides same flag in {@link Shaper#rectangularShapes}
     * @type {boolean} */
    rectangularShapes: true,
    /**
     *
     * Builds the rectangular shapes based on the number of rows and columns
     */
    buildShapes: function () {
      var w = 1 / this.nCols;
      var h = 1 / this.nRows;
      for (var y = 0; y < this.nRows; y++) {
        for (var x = 0; x < this.nCols; x++) {
          this.shapeData[y * this.nCols + x] = new AWT.Rectangle(new AWT.Point(x * w, y * h), new AWT.Dimension(w, h));
        }
      }
      this.initiated = true;
    }
  };

  // Rectangular extends Shaper
  Rectangular.prototype = $.extend(Object.create(Shaper.prototype), Rectangular.prototype);

  // Register this class in the list of known shapers
  Shaper.CLASSES['@Rectangular'] = Rectangular;

  return Rectangular;

});
