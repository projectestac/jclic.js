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
    },
    //
    //
    moveBy: function (dx, dy) {
      this.moveTo(AWT.Point(this.dest.x + dx, this.dest.y + dy));
    },
    //
    // tp (AWT.Point)
    // forcePaint (boolean)
    moveTo: function (pt, forcePaint) {
      var clipRect;

      if (!this.active || (!forcePaint && this.dest.equals(pt)))
        return;

      if (this.bx !== null) {
        clipRect = new AWT.Rectangle(
            Math.floor(pt.x - this.relativePos.x),
            Math.floor(pt.y - this.relativePos.y),
            Math.ceil(this.bx.dim.width),
            Math.ceil(this.bx.dim.height));
        clipRect.add(this.bx);
        this.bx.moveTo(new AWT.Point(pt.x - this.relativePos.x,
            pt.y - this.relativePos.y));
      }
      else {
        if (forcePaint || !this.USE_XOR) {
          clipRect = new AWT.Rectangle(Math.floor(this.origin.x), Math.floor(this.origin.y), 0, 0);
          clipRect.add(pt);
          clipRect.add(this.dest);
          this.dest.moveTo(pt);
        }
        else {
          if (this.linePainted) {
            drawLine();
          }
          this.dest.moveTo(pt);
          this.drawLine();
          this.linePainted = true;
          return;
        }
      }
      clipRect.grow(this.arrow ? this.arrow_l : 1, this.arrow ? this.arrow_l : 1);
      this.parent.invalidate(clipRect).update();
    },
    //
    // pt (AWT.Point) - Starting point
    // box (ActiveBox) - Only when the BoxConnector runs in drag&drop mode
    begin: function (pt, box) {
      if (!box) {
        if (this.active)
          this.end();
        this.origin.moveTo(pt);
        this.dest.moveTo(pt);
        this.linePainted = false;
        this.active = true;
        //this.parent.setCursor('HAND_CURSOR');
      }
      else {
        this.begin(pt);
        this.bx = box;
        this.relativePos.moveTo(pt.x - box.pos.x, pt.y - box.pos.y);
        this.bx.setTemporaryHidden(true);
        var r = new AWT.Rectangle(this.bx.getBounds());
        r.grow(1, 1);
        this.linePainted = false;
        this.parent.invalidate(r).update();
      }
    },
    //
    //    
    end: function () {
      if (!this.active)
        return;
      if (this.bx) {
        var r = new AWT.Rectangle(this.bx.getBounds());
        r.grow(1, 1);
        this.parent.invalidate(r).update();
        this.bx.moveTo(this.origin.x - this.relativePos.x,
            this.y - this.relativePos.y);
        this.bx.setTemporaryHidden(false);
        r.setBounds(this.bx.getBounds());
        r.grow(1, 1);
        this.parent.invalidate(r).update();
        this.bx = null;
        this.relativePos.moveTo(0, 0);
      }
      else {
        this.moveTo(dest, true);
      }
      this.active = false;
      this.linePainted = false;
      //this.parent.setCursor(null);
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
      
      if (!origin)
        origin = this.origin;

      if (!dest)
        dest = this.dest;

      if (typeof arrow === 'undefined')
        arrow = this.arrow;

      if (!color)
        color = this.lineColor;

      if (!xorColor)
        color = this.xorColor;

      if (typeof arrow_l === 'undefined')
        arrow_l = this.arrow_l;

      if (typeof arrowAngle === 'undefined')
        arrowAngle = this.arrow_angle;


      if (typeof strokeWidth === 'undefined')
        strokeWidth = this.line_width;

      ctx.strokeStyle = color;
      if (this.USE_XOR && xorColor !== null) {
        // TODO: xorColor never used!
        ctx.globalCompositeOperation = 'xor';
      }
      ctx.lineWidth = strokeWidth;

      ctx.beginPath();
      ctx.moveTo(origin.x, origin.y);
      ctx.lineTo(dest.x, dest.y);
      //ctx.closePath();
      ctx.stroke();
      if (arrow) {
        var beta = Math.atan2(origin.x - dest.x, dest.x - origin.x);
        var arp = new AWT.Point(dest.x - arrow_l * Math.cos(beta + arrowAngle),
            dest.y + arrow_l * Math.sin(beta + arrowAngle));
        ctx.beginPath();
        ctx.moveTo(dest.x, dest.y);
        ctx.lineTo(arp.x, arp.y);
        // ctx.closePath();
        ctx.stroke();

        arp.moveTo(dest.x - arrow_l * Math.cos(beta - arrowAngle),
            dest.y + arrow_l * Math.sin(beta - arrowAngle));
        ctx.beginPath();
        ctx.moveTo(dest.x, dest.y);
        ctx.lineTo(arp.x, arp.y);
        // ctx.closePath();
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
