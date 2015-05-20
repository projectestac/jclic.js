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
  "./Shaper",
  "../AWT"
], function ($, Shaper, AWT) {

  //
  // This [Shaper](Shaper.html) returns a set of rectangular shapes
  var Holes = function (nx, ny) {
    Shaper.call(this, 1, 1);
    this.nCols = nx;
    this.nRows = ny;
    this.showEnclosure = true;
  };

  Holes.prototype = {
    constructor: Holes,
    //
    // Shapes are already loaded by [Shaper](Shaper.html)
    buildShapes: function () {
      if (this.nCells > 0)
        this.initiated = true;
    }
  };

  // Rectangular extends Shaper
  Holes.prototype = $.extend(Object.create(Shaper.prototype), Holes.prototype);

  Shaper.prototype._CLASSES['@Holes'] = Holes;

  return Holes;

});



