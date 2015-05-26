//    File    : BoxConnector.js  
//    Created : 26/05/2015  
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
  "../AWT"
], function (AWT) {

  //
  // BoxConnector allows users to visually connect two [ActiveBox](ActiveBox.html)
  // objects on an [Activity.Panel](Activity.html). There are two modes of operation:
  // drawing a line between an origin point (usually the point where the user clicks on) and a
  // destination point, or dragging the ActiveBox from one location to another. The connecting
  // lines can have arrowheads at its endings.
  // parent (AWT.Container) - The Container this BoxConnector belongs to
  var BoxConnector = function (parent) {
    this.parent = parent;
    this.origin = new AWT.Point();
    this.dest = new AWT.Point();
    this.relativePos = new AWT.Point();
  };

  BoxConnector.prototype = {
    constructor: BoxConnector,
    // 
    // `origin` and `dest` are objects of type [AWT](AWT.html).Point 
    origin: null,
    dest: null,
    // 
    // The connector ends in an arrowhead
    arrow: false,
    // 
    // The connector is active
    active: false,
    // 
    // The line is already painted (used for XOR expressions)
    linePainted: false,
    // 
    // The arrowhead length (in pixels)
    arrow_l: 10,
    // 
    // The arrowhead angle
    arrow_angle: Math.PI / 6,
    // 
    // The main color and a complementary color used for XOR operations
    lineColor: 'black',
    xorColor: 'white',
    USE_XOR: true,
    // 
    // Relative position of point B respeect to A (AWT.Point)
    relativePos: null,
    // 
    // The ActiveBox to be moved
    bx: null,
    // 
    // The AWT.Container this connector belongs to
    parent: null,
    // 
    // The width of the connecor line
    line_width: 1.5,
    //
    // Updates the BoxConnector area
    // ctx (CanvasRenderingContext2D) The rendering context where the BoxConnector must draw
    // dirtyRegion (AWT.Rectangle)
    update: function (ctx, dirtyRegion) {
      if (!this.active)
        return false;
      if (this.bx !== null) {
        this.bx.setTemporaryHidden(false);
        this.bx.update(ctx, dirtyRegion);
        this.bx.setTemporaryHidden(true);
      }
      else {
        this.drawLine(ctx);
        this.linePainted = true;
      }
      return true;
    }

    
    
  };

  return BoxConnector;
});
