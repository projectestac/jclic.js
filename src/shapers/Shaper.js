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
  "../Utils",
  "../AWT"
], function ($, Utils, AWT) {

//
// This class (and its derivatives) draws a set of "shapes" used to place the
// [ActiveBox](ActiveBox.html) objects in a specific position, and to determine
// its dimension and appareance.
  var Shaper = function (nx, ny) {
    this.reset(nx, ny);
  };

  Shaper.prototype = {
    constructor: Shaper,
    // 
    // `Shaper.prototype._CLASSES` contains the list of classes derived from Shaper. It
    // should be read-only and updated by real shaper classes.
    _CLASSES: {},
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
    // Flag indicating if this shaper organizes its cells in rows and columns
    rectangularShapes: false,
    // 
    // Initialises this Shaper to default values
    reset: function(nCols, nRows){        
        this.nCols=nCols;
        this.nRows=nRows;
        this.nCells=nRows * nCols;
        this.initiated=false;
        this.shapeData=[this.nCells];
        for(var i=0; i<this.nCells; i++)
            this.shapeData[i]=new AWT.Shape();
    },
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
          shaper.showEnclosure = true;
          shaper.hasRemainder = true;
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
        var sd = this.split(':');
        // Possible strokes are: `rectangle`, `ellipse`, `M`, `L`, `Q`, `B`, `X`
        // Also possible, but not currently used in JClic: `roundRectangle` and `pie`
        var data = sd.length > 1 ? sd[1].split(',') : null;
        //
        // Data should be always divided by the scale (X or Y)
        if(data){
          for(var i=0; i<data.length; i++){
            data[i] /= (i % 2 ? this.scaleY : this.scaleX);
          }
        }
        switch(sd[0]){
          case 'rectangle':
            return new AWT.Rectangle(data);
            break;
          case 'ellipse':
            return new AWT.Ellipse(data);
            break;          
          default:
            // It's an `AWT.PathStroke`
            shd.push(new AWT.PathStroke(sd[0], data));
            break;          
        }        
      });
      return new AWT.Path(shd);
    },
    //
    // Returns a Shaper of the requested class
    // Should be called by `Shaper.prototype._getShaper`
    _getShaper: function (className, nx, ny) {
      var shaper = null;      
      var cl = Shaper.prototype._CLASSES[className];
      if(cl){
        shaper = new cl(nx, ny);
      }
      else
        console.log('Unknown shaper: ' + className);

      return shaper;
    },
    //
    // Function to be implemented in derivatives:
    buildShapes: function () {
    },
    //
    // Gets a clone of the nth Shape object, scaled and located into a Rectangle
    getShape: function(n, rect){
        if(!this.initiated)
            this.buildShapes();
        if(n>=this.nCells || this.shapeData[n]===null)
            return null;
        return this.shapeData[n].getShape(rect);
    },
    //
    // Gets the nth Shape object
    getShapeData: function(n){
        return (n>=0 && n<this.shapeData.length) ? this.shapeData[n] : null;
    },
    //
    // Gets the AWT.Rectangle that contains all shapes
    // This method should be overwrited by objects derived from Shape
    getEnclosingShapeData: function(){
        return new AWT.Rectangle(0, 0, 1, 1);
    },
    //
    // Flag indicating if this Shaper deploys over a surface biggest than the rectangle enclosing
    // all its shapes
    hasRemainder: false,
    //
    // When `hasRemainder` is true, this method gets the rectangle containing the full surface on
    // which the Shaper develops.
    // rect (AWT.Rectangle) - The frame where to move and scale all the shapes
    getRemainderShape: function(rect){
      var r = new AWT.Rectangle;
      
        if(!this.hasRemainder)
            return null;
        
        if(!this.initiated)
            this.buildShapes();
        
        for(var i=0; i<this.nCells; i++){
            if(this.shapeData[i])
                r.add(shapeData[i].getShape(rect), false);
        }
        return r;
    }
  };

  return Shaper;
});
