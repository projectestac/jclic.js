//    File    : Rectangular.js  
//    Created : 19/05/2015  
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
  // This [Shaper](Shaper.html) returns a set of rectangular shapes
  var Rectangular = function (nx, ny) {
    Shaper.call(this, nx, ny);
  };

  Rectangular.prototype = {
    constructor: Rectangular,
    //
    // Builds the rectangular shapes
    buildShapes: function () {
      var w = 1 / this.nCols;
      var h = 1 / this.nRows;
      for (var y = 0; y < this.nRows; y++) {
        for (var x = 0; x < this.nCols; x++) {
          this.shapeData[y * this.nCols + x] = new AWT.Rectangle(new AWT.Point(x, y), new AWT.Dimension(w, h));
        }
      }
      this.initiated = true;
    }
  };

  // Rectangular extends Shaper
  Rectangular.prototype = $.extend(Object.create(Shaper.prototype), Rectangular.prototype);

  Shaper.prototype._CLASSES['@Rectangular'] = Rectangular;
  
  // TODO: Assign specific classes to JigSaw shapers!
  Shaper.prototype._CLASSES['@ClassicJigSaw'] = Rectangular;
  Shaper.prototype._CLASSES['@JigSaw'] = Rectangular;
  Shaper.prototype._CLASSES['@TriangularJigSaw'] = Rectangular;

  return Rectangular;

});
