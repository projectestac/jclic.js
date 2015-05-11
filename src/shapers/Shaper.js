//    File    : Shaper.js  
//    Created : 13/04/2015  
//    By      : Francesc Busquets  
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
  "../Utils"
], function ($, Utils) {

//
// This class (and its derivatives) draws a set of "shapes" used to place the
// [ActiveBox](ActiveBox.html) objects in a specific position, and to determine
// its dimension and appareance.
  var Shaper = function (className) {
    this.className = className;
    this.shapeData = [];
  };

  Shaper.prototype = {
    constructor: Shaper,
    //
    // Shaper class name
    className: null,
    // 
    // Number of columns (nCols) and rows (nRows)
    nCols: 0, nRows: 0, nCells: 0,
    //
    // Contains the specific definition of each shape
    shapeData: null,
    //
    // Flag used to check if the `Shaper`has been initiated
    initiated: false,
    //
    // Fields used only in JigSaw shapers
    baseWidthFactor: 1.0 / 3,
    toothHeightFactor: 1.0 / 6,
    randomLines: false,
    //
    // Fields used only in the `Holes` shaper
    scaleX: 1.0, scaleY: 1.0,
    enclosing: null,
    showEnclosure: false,
    // 
    // Loads the object settings from a specific JQuery XML element 
    setProperties: function ($xml) {

      var shaper = this;
      $.each($xml.get(0).attributes, function () {
        switch (this.name) {
          case 'class':
            shaper.className = this.value;
            break;
          case 'cols':
            shaper.nCols = Number(this.value);
            break;
          case 'rows':
            shaper.nRows = Number(this.value);
            break;
          case 'baseWidthFactor':
          case 'toothHeightFactor':
          case 'scaleX':
          case 'scaleY':
            shaper [this.name] = Number(this.value);
            break;
          case 'randomLines':
          case 'showEnclosure':
            shaper [this.name] = Utils.getBoolean(this.value, true);
            break;
        }
      });
      // Reads the 'enclosing'
      // (main shape area where the other shape elements are placed)
      $xml.children('enclosing:first').each(function () {
        $(this).children('shape:first').each(function (data) {
          shaper.enclosing = shaper.readShapeData(this)[0];
        });
      });
      // Read the shape elements
      $xml.children('shape').each(function (i, data) {
        shaper.shapeData[i] = shaper.readShapeData(data);
      });
      // Correction needed for '@Holes' shaper
      if (shaper.shapeData.length > 0) {
        shaper.nRows = shaper.shapeData.length;
        shaper.nCols = 1;
      }
      return this;
    },
    //
    // Reads a shape from XML
    // Shapes are arrays of `stroke` objects
    // Each `stroke` has an `action` (_move to_, _line to_, _quad to_, etc.)
    // and corresponding `data`.
    readShapeData: function ($xml) {
      var shd = [];
      $.each($xml.textContent.split('|'), function () {
        var stroke = {};
        var sd = this.split(':');
        // Possible strokes are: `rectangle`, `ellipse`, `M`, `L`, `Q`, `B`, `X`
        // Also possible, but not currently used in JClic: `roundRectangle` and `pie`
        stroke.action = sd[0];
        if (sd.length > 1) {
          stroke.data = sd[1].split(',');
        }
        shd.push(stroke);
      });
      return shd;
    },
    //
    // Returns a Shaper of the requested class
    getShaper: function (className) {
      var shaper = null;
      // TODO: Create classes for each shaper type    
      switch (className) {
        case '@Holes':
        case '@ClassicJigSaw':
        case '@JigSaw':
        case '@TriangularJigSaw':
        case '@Rectangular':
          shaper = new Shaper(className);
          break;
        default:
          console.log('unknown shaper: ' + className);
      }

      return shaper;
    },
    //
    // Function to be implemented in derivatives:
    buildShapes: function () {
    }

  };

  return Shaper;
});
