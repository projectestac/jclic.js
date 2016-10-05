/**
 *  File    : shapers/Holes.js
 *  Created : 20/05/2015
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

define([
  "jquery",
  "./Shaper"
], function ($, Shaper) {

  /**
   * This {@link Shaper} consists of a set of arbitrary shapes placed over a main rectangle that
   * acts as a enclosure.
   * The components can be of type {@link AWT.Rectangle}, {@link AWT.Ellipse} or {@link AWT.Path}.
   * This components have internal dimension values relative to the horizontal and vertical
   * sizes of the enclosure. Its values (always between 0 and 1) must be scaled to real sizes
   * of graphic objects.
   * @exports Holes
   * @class
   * @extends Shaper
   * @param {number} nx - Not used
   * @param {number} ny - Not used
   */
  var Holes = function (nx, ny) {
    Shaper.call(this, 1, 1);
    this.nCols = nx;
    this.nRows = ny;
    this.showEnclosure = true;
  };

  Holes.prototype = {
    constructor: Holes,
    /**
     *
     * Shapes are already loaded by {@link Shaper}, so this function just sets `initiated` to `true`
     */
    buildShapes: function () {
      if (this.nCells > 0)
        this.initiated = true;
    },
    /**
     *
     * Gets the rectangle that contains all shapes
     * @returns {AWT.Rectangle}
     */
    getEnclosingShapeData: function () {
      if (!this.showEnclosure)
        return null;
      return this.enclosing || Shaper.prototype.getEnclosingShapeData.call(this);
    }
  };

  // Rectangular extends Shaper
  Holes.prototype = $.extend(Object.create(Shaper.prototype), Holes.prototype);

  // Register this class in the list of known shapers
  Shaper.CLASSES['@Holes'] = Holes;

  return Holes;

});
