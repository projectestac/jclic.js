//    File    : Holes.js  
//    Created : 20/05/2015  
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
  "./Shaper"
], function ($, Shaper) {

  /**
   * This {@link Shaper} consists of a set of arbitrary shapes placed over a main rectangle that
   * acts as a enclosure.<br>
   * The components can be of type {@link AWT.Rectangle}, {@link AWT.Ellipse} or {@link AWT.Path}.<br>
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
      return this.enclosing ? this.enclosing : Shaper.prototype.getEnclosingShapeData.call(this);
    }
  };

  // Rectangular extends Shaper
  Holes.prototype = $.extend(Object.create(Shaper.prototype), Holes.prototype);

  // Register this class in the list of known shapers
  Shaper.prototype._CLASSES['@Holes'] = Holes;

  return Holes;

});
