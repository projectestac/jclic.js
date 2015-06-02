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
  var BoxConnector = function (parent, ctx) {
    this.parent = parent;
    this.ctx = ctx;
    this.dim = new AWT.Dimension(ctx.canvas.width, ctx.canvas.height);
    this.origin = new AWT.Point();
    this.dest = new AWT.Point();
    this.relativePos = new AWT.Point();
  };

  BoxConnector.prototype = {
    constructor: BoxConnector,
    // 
    // The background image, saved and redrawn on each movement
    bgImg: null,
    bgRect: null,
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
    // The Graphics context where the BoxConnector will paint, and its dimension
    ctx: null,
    dim: null,
    // 
    // The AWT.Container this connector belongs to
    parent: null,
    // 
    // The width of the connecor line
    line_width: 1.5,
    //
    //
    moveBy: function (dx, dy) {
      this.moveTo(AWT.Point(this.dest.x + dx, this.dest.y + dy));
    },
    //
    // tp (AWT.Point)
    // forcePaint (boolean)
    moveTo: function (pt, forcePaint) {
      if (!this.active || (!forcePaint && this.dest.equals(pt)))
        return;

      if(this.bgRect && this.bgImg)
        this.ctx.putImageData(this.bgImg, this.bgRect.pos.x, this.bgRect.pos.y);
        
      //this.ctx.clearRect(0, 0, this.dim.width, this.dim.height);
      var pt1 = new AWT.Point(this.origin.x - this.relativePos.x, this.origin.y - this.relativePos.y);
      this.bgRect = new AWT.Rectangle(pt1, this.bx ? this.bx.dim : new AWT.Dimension());
      var pt2 = new AWT.Point(pt.x - this.relativePos.x, pt.y - this.relativePos.y);      
      this.bgRect.add(new AWT.Rectangle(pt2, this.bx ? this.bx.dim : new AWT.Dimension()));
      // Include border
      this.bgRect.grow(10, 10);
      this.bgImg = this.ctx.getImageData(this.bgRect.pos.x, this.bgRect.pos.y, this.bgRect.dim.width, this.bgRect.dim.height);
      
      if (this.bx !== null) {
        this.bx.moveTo(new AWT.Point(pt.x - this.relativePos.x, pt.y - this.relativePos.y));
        this.bx.setTemporaryHidden(false);
        this.bx.update(this.ctx, null);
        this.bx.setTemporaryHidden(true);
      }
      else {
        this.dest.moveTo(pt);
        this.drawLine();
        this.linePainted = true;
      }
    },
    //
    // pt (AWT.Point) - Starting point
    // box (ActiveBox) - Only when the BoxConnector runs in drag&drop mode
    begin: function (pt, box) {
      if (this.active)
        this.end();
      this.origin.moveTo(pt);
      this.dest.moveTo(pt);
      this.linePainted = false;
      this.active = true;
      //this.parent.setCursor('HAND_CURSOR');

      if (box) {
        this.bx = box;
        this.relativePos.moveTo(pt.x - box.pos.x, pt.y - box.pos.y);
        this.bx.setTemporaryHidden(true);
        this.linePainted = false;
        this.parent.invalidate().update();
      }
      
      this.bgImg = null;
      this.bgRect = null;
      
      this.moveTo(pt, true);
    },
    //
    //    
    end: function () {
      if (!this.active)
        return;

      this.active = false;
      this.linePainted = false;
      
      if(this.bgRect && this.bgImg)
        this.ctx.putImageData(this.bgImg, this.bgRect.pos.x, this.bgRect.pos.y);
      this.bgRect = null;
      this.bgImg = null;
      //this.ctx.clearRect(0, 0, this.dim.width, this.dim.height);

      if (this.bx) {
        this.bx.moveTo(this.origin.x - this.relativePos.x, this.origin.y - this.relativePos.y);
        this.bx.setTemporaryHidden(false);
        this.bx = null;
        this.relativePos.moveTo(0, 0);
      }
      this.parent.invalidate().update();
    },
    //
    // origin (AWT.Point)
    // dest (AWT.Point)
    // arrow (boolean)
    // color (string)
    // xorColor (string)
    // arrow_l (number)
    // arrowAngle (number)
    // strokeWidth (number)
    drawLine: function (ctx, origin, dest, arrow, color, xorColor, arrow_l, arrowAngle, strokeWidth) {

      if (!ctx)
        ctx = this.ctx;

      if (!origin)
        origin = this.origin;

      if (!dest)
        dest = this.dest;

      if (typeof arrow === 'undefined')
        arrow = this.arrow;

      if (!color)
        color = this.lineColor;

      if (!xorColor)
        xorColor = this.xorColor;

      if (typeof arrow_l === 'undefined')
        arrow_l = this.arrow_l;

      if (typeof arrowAngle === 'undefined')
        arrowAngle = this.arrow_angle;

      if (typeof strokeWidth === 'undefined')
        strokeWidth = this.line_width;

      ctx.strokeStyle = color;
      
      var compositeTypes = ['source-over','source-in','source-out','source-atop',
        'destination-over','destination-in','destination-out','destination-atop',
        'lighter','darker','copy','xor'];

      //if (this.USE_XOR && xorColor) {
        // TODO: xorColor never used!
        ctx.strokeStyle = 'white';
        ctx.globalCompositeOperation = 'difference';      
      //}
      ctx.lineWidth = strokeWidth;

      ctx.beginPath();
      ctx.moveTo(origin.x, origin.y);
      ctx.lineTo(dest.x, dest.y);
      
      ctx.stroke();

      if (arrow) {
        var beta = Math.atan2(origin.x - dest.x, dest.x - origin.x);
        var arp = new AWT.Point(dest.x - arrow_l * Math.cos(beta + arrowAngle),
            dest.y + arrow_l * Math.sin(beta + arrowAngle));
        ctx.beginPath();
        ctx.moveTo(dest.x, dest.y);
        ctx.lineTo(arp.x, arp.y);
        ctx.stroke();

        arp.moveTo(dest.x - arrow_l * Math.cos(beta - arrowAngle),
            dest.y + arrow_l * Math.sin(beta - arrowAngle));
        ctx.beginPath();
        ctx.moveTo(dest.x, dest.y);
        ctx.lineTo(arp.x, arp.y);
        ctx.stroke();
      }
      if (this.USE_XOR && xorColor) {
        // reset default settings
        ctx.globalCompositeOperation = 'source-over';
      }
    }
  };

  return BoxConnector;
});
