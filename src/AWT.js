//    File    : AWT.js  
//    Created : 12/04/2015  
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
  "./Utils"
], function ($, Utils) {

  //
  // This object encapsulates utility clases for painting graphics and images,
  // as found in the Java [Abstract Window Toolkit](http://docs.oracle.com/javase/7/docs/api/java/awt/package-summary.html)
  //

  //
  // Font
  // Encapsulates properties and provides methotds to manage fonts
  var Font = function (family, size, bold, italic, variant) {
    if (family)
      this.family = family;
    if (typeof size === 'number')
      this.size = size;
    if (bold)
      this.bold = bold;
    if (italic)
      this.italic = italic;
    if (variant)
      this.variant = variant;
  };

  Font.prototype = {
    constructor: Font,
    family: 'Arial',
    // 
    // Warning: Do not change `size` directly. Instead, use the `setSize` method
    size: 17,
    bold: 0,
    italic: 0,
    variant: '',
    // 
    // Vertical font metrics calculated in `calcHeight`
    _ascent: -1,
    _descent: -1,
    _height: -1,
    //
    // Read Font properties from an XML element
    setProperties: function ($xml) {
      if ($xml.attr('family'))
        this.family = $xml.attr('family');
      if ($xml.attr('size'))
        this.size = Number($xml.attr('size'));
      if ($xml.attr('bold'))
        this.bold = Utils.getBoolean($xml.attr('bold'));
      if ($xml.attr('italic'))
        this.italic = Utils.getBoolean($xml.attr('italic'));
      if ($xml.attr('variant'))
        this.variant = $xml.attr('variant');
      return this;
    },
    //
    // Allows to change the `size` member, recalculating the vertical
    // metrics
    setSize: function (size) {
      var currentSize = this.size;
      this.size = size;
      if (currentSize !== size)
        this._height = -1;
      return this;
    },
    //
    // Gets the font height
    getHeight: function () {
      if (this._height < 0) {
        // Look for an equivalent font already calculed
        for (var i = 0; i < Font.prototype._ALREADY_CALCULED_FONTS.length; i++) {
          var font = Font.prototype._ALREADY_CALCULED_FONTS[i];
          if (font.equals(this)) {
            this._height = font._height;
            this._ascent = font._ascent;
            this._descent = font._descent;
            break;
          }
        }
        if (this._height < 0) {
          this._calcHeight();
          if (this._height > 0)
            Font.prototype._ALREADY_CALCULED_FONTS.push(this);
        }
      }
      return this._height;
    },
    //
    // Array of font objects with already calculed heights, always stored on the prototype
    _ALREADY_CALCULED_FONTS: [],
    //
    // Copies the properties into an object with CSS attributes
    // When `css` is null or undefined, a new object will be created and returned
    toCss: function (css) {
      if (!css)
        css = {};
      css['font-family'] = this.family;
      css['font-size'] = this.size + 'px';
      if (this.hasOwnProperty('bold'))
        css['font-weight'] = this.bold ? 'bold' : 'normal';
      if (this.hasOwnProperty('italic'))
        css['font-style'] = this.italic ? 'italic' : 'normal';
      if (this.hasOwnProperty('variant'))
        css['font-variant'] = this.variant;
      return css;
    },
    //
    // Gets the codification of this font in a single string
    // suitable to be use in the `font` CSS attribute
    cssFont: function () {
      return (this.italic ? 'italic ' : 'normal') + ' ' +
          (this.variant === '' ? 'normal' : this.variant) + ' ' +
          (this.bold ? 'bold ' : 'normal') + ' ' +
          this.size + 'pt ' +
          this.family;
    },
    //
    // The [TextMetrics](https://developer.mozilla.org/en-US/docs/Web/API/TextMetrics) 
    // object used by [CanvasRenderingContext2D](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D)
    // does not provide a `heigth` value for rendered text.
    // This [stackoverflow question](http://stackoverflow.com/questions/1134586/how-can-you-find-the-height-of-text-on-an-html-canvas)
    // has an excellent response by Daniel Earwicker explaining how to measure the
    // vertical dimension of rendered text using a `span` element.
    // The code has been slighty adapted to deal with Font objects.
    // Warning: Do not call this method direcly. Use `getHeight` instead
    _calcHeight: function () {
      var text = $('<span>Hg</span>').css(this.toCss());
      var block = $('<div style="display: inline-block; width: 1px; height: 0px;"></div>');
      var div = $('<div></div>');
      div.append(text, block);

      var body = $('body');
      body.append(div);

      try {
        block.css({verticalAlign: 'baseline'});
        this._ascent = block.offset().top - text.offset().top;

        block.css({verticalAlign: 'bottom'});
        this._height = block.offset().top - text.offset().top;

        this._descent = this._height - this._ascent;
      } finally {
        div.remove();
      }
      return this;
    },
    //
    // Check if two Font objects are equivalent
    equals: function (font) {
      return this.family === font.family &&
          this.size === font.size &&
          this.bold === font.bold &&
          this.italic === font.italic &&
          this.variant === font.variant;
    }
  };

  //
  // Gradient
  // Encapsulates parametres and methods to draw complex color gradients
  //
  var Gradient = function (c1, c2, angle, cycles) {
    if (c1)
      this.c1 = c1;
    if (c2)
      this.c2 = c2;
    if (typeof angle === 'number')
      this.angle = angle % 360;
    if (typeof cycles === 'number')
      this.cycles = cycles;
  };

  Gradient.prototype = {
    constructor: Gradient,
    //
    // Initial color
    c1: 'white',
    //
    // Final color
    c2: 'black',
    //
    // Tilt angle
    angle: 0,
    //
    // Number repetitions of the gradient
    cycles: 1,
    //
    // Loads the object settings from a specific JQuery XML element 
    setProperties: function ($xml) {
      this.c1 = Utils.checkColor($xml.attr('source'), 'black');
      this.c2 = Utils.checkColor($xml.attr('dest'), 'white');
      this.angle = Number($xml.attr('angle') || 0) % 360;
      this.cycles = Number($xml.attr('cycles') || 1);
      return this;
    },
    //
    // Creates a [CanvasGradient](https://developer.mozilla.org/en-US/docs/Web/API/CanvasGradient)
    // based on the provided context and rectangle
    // TODO: Implement gradients with angle
    getGradient: function (ctx, rect) {
      var p2 = rect.getOppositeVertex();
      var gradient = ctx.createLinearGradient(rect.pos.x, rect.pos.y, p2.x, p2.y);
      var step = 1 / Math.max(this.cycles, 1);
      for (var i = 0; i <= this.cycles; i++)
        gradient.addColorStop(i * step, i % 2 ? this.c1 : this.c2);
      return gradient;
    },
    //
    // Gets the CSS 'linear-gradient' expression of this Gradient
    getCss: function () {
      var result = 'linear-gradient(' +
          (this.angle + 90) + 'deg, ' +
          this.c1 + ', ' +
          this.c2;
      for (var i = 1; i < this.cycles; i++) {
        result += ', ' + (i % 2 > 0 ? this.c1 : this.c2);
      }
      result += ')';
      return result;
    },
    //
    // Checks if the gradient colors have transparency
    hasTransparency: function () {
      return Utils.colorHasTransparency(this.c1) || Utils.colorHasTransparency(this.c2);
    }
  };

  //
  // Stroke
  // Encapsulates the properties used to draw lines in `canvas` elements
  // See: http://bucephalus.org/text/CanvasHandbook/CanvasHandbook.html#line-caps-and-joins
  var Stroke = function (lineWidth, lineCap, lineJoin, miterLimit) {
    if (typeof lineWidth === 'number')
      this.lineWidth = lineWidth;
    if (lineCap)
      this.lineCap = lineCap;
    if (lineJoin)
      this.lineJoin = lineJoin;
    if (typeof miterLimit === 'number')
      this.miterLimit = miterLimit;
  };

  Stroke.prototype = {
    constructor: Stroke,
    lineWidth: 1.0,
    // Possible values are: `butt`, `round` and `square`
    lineCap: 'butt',
    // Possible values are `round`, `bevel` and `miter`
    lineJoin: 'miter',
    // Ratio between miter length and half lineWidth
    miterLimit: 10.0,
    //
    // Sets the properties to a CanvasRenderingContext2D
    setStroke: function (ctx) {
      ctx.lineWidth = this.lineWidth;
      ctx.lineCap = this.lineCap;
      ctx.lineJoin = this.lineJoin;
      ctx.miterLimit = this.miterLimit;
      return ctx;
    }
  };

  //
  // Point
  //
  var Point = function (x, y) {
    // Special case: constructor passing another point as unique parameter
    if (x instanceof Point) {
      this.x = x.x;
      this.y = x.y;
    }
    else {
      this.x = x ? x : 0;
      this.y = y ? y : 0;
    }
  };

  Point.prototype = {
    constructor: Point,
    x: 0,
    y: 0,
    //
    // Loads the object settings from a specific JQuery XML element 
    setProperties: function ($xml) {
      this.x = Number($xml.attr('x'));
      this.y = Number($xml.attr('y'));
      return this;
    },
    // 
    // Moves this Point to a new position, by a specified displacement
    // delta (Point or Dimension): The displacement
    moveBy: function (delta) {
      this.x += delta.x ? delta.x : delta.width ? delta.width : 0;
      this.y += delta.y ? delta.y : delta.height ? delta.height : 0;
      return this;
    },
    //
    // Moves this Point to a new position
    // newPos (Point): The new position, or a x co-ordinate
    // y (number): null if newPos is a Point
    moveTo: function (newPos, y) {
      if (typeof newPos === 'number') {
        this.x = newPos;
        this.y = y;
      }
      else {
        this.x = newPos.x;
        this.y = newPos.y;
      }
      return this;
    },
    // 
    // Multiplies the `x` and `y` co-ordinates by a specified `delta`
    // delta (Point or Dimension)
    multBy: function (delta) {
      this.x *= delta.x ? delta.x : delta.width ? delta.width : 0;
      this.y *= delta.y ? delta.y : delta.height ? delta.height : 0;
      return this;
    },
    //
    // Check if two points are the same
    equals: function (p) {
      return this.x === p.x && this.y === p.y;
    }
  };

  //
  // Dimension
  // w (number or Point) - The width of this Dimension, or the upper-left vertex of a virtual rectangle
  // h (number or Point) - The height of this Dimension, or the bottom-right vertex of a virtual rectangle
  var Dimension = function (w, h) {
    if (w instanceof Point && h instanceof Point) {
      this.width = h.x - w.x;
      this.height = h.y - w.y;
    }
    else {
      this.width = w ? w : 0;
      this.height = h ? h : 0;
    }
  };

  Dimension.prototype = {
    constructor: Dimension,
    width: 0,
    height: 0,
    //
    // Loads the object settings from a specific JQuery XML element 
    setProperties: function ($xml) {
      this.width = Number($xml.attr('width'));
      this.height = Number($xml.attr('height'));
      return this;
    },
    //
    // Check if two dimensions are equivalent
    equals: function (d) {
      return this.width === d.width && this.height === d.height;
    },
    // 
    // Multiplies the `x` and `y` co-ordinates by a specified `delta`
    // delta (Point or Dimension)
    multBy: function (delta) {
      this.width *= delta.x ? delta.x : delta.width ? delta.width : 0;
      this.height *= delta.y ? delta.y : delta.height ? delta.height : 0;
      return this;
    },
    //
    // Sets new values
    // width can be a number or a Dimension object
    setDimension: function (width, height) {
      if (width instanceof Dimension) {
        height = width.heigth;
        width = width.width;
      }
      this.width = width;
      this.height = height;
      return this;
    },
    //
    // Calcs the area of a rectangle with this dimension
    getSurface: function () {
      return this.width * this.height;
    }
  };

  //
  // Shape is a generic class for rectangles, ellipses and stroke-free shapes
  // pos (Point) - Indicates the shape top-left coordinates
  var Shape = function (pos) {
    this.pos = pos ? pos : new Point();
  };

  Shape.prototype = {
    constructor: Shape,
    //
    // The current position of the shape
    pos: new Point(),
    //
    // Moves the shape
    // delta (Point or Dimension) - The displacement to apply to the shape
    moveBy: function (delta) {
      this.pos.moveBy(delta);
      return this;
    },
    //
    // Moves the Shape
    // newPos (Point) - the new position of the shape
    moveTo: function (newPos) {
      this.pos.moveTo(newPos);
      return this;
    },
    //
    // Gets the enclosing rectangle of this Shape
    // Method to be overrided by each type of shape
    getBounds: function () {
      return new Rectangle(this.pos);
    },
    //
    // Check if two shapes are equivalent
    // (method to be overrided by subclasses)
    equals: function (p) {
      return this.pos.equals(p);
    },
    //
    // Multiplies the dimension of the Shape by the specified `delta` amount
    // (method to be overrided by subclasses)
    // delta (`AWT.Point` or `AWT.Dimension`) - Object containing the X and Y ratio to be scaled.
    scaleBy: function (delta) {
      // Nothing to scale in abstract shapes
      return this;
    },
    //
    // Gets a clone of this shape moved to the `pos` component of the rectangle, and scaled
    // by the `dim` values.
    // rect (`AWT.Rectangle`)
    getShape: function (rect) {
      //return $.extend(true, {}, this).scaleBy(rect.dim).moveBy(rect.pos);
      var newShape = this.clone();
      return newShape.scaleBy(rect.dim).moveBy(rect.pos);
    },
    //
    // Check if the provided Point `p` is inside this shape
    // (method to be overrided by subclasses)
    contains: function (p) {
      return false;
    },
    //
    // Check if the provided Rectangle `r` isntersects this shape
    // (method to be overrided by subclasses)
    intersects: function (r) {
      return false;
    },
    //
    // Fills the Shape with the current style in the provided canvas context
    // ctx: a [CanvasRenderingContext2D](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D)
    fill: function (ctx) {
      this.preparePath(ctx);
      ctx.fill();
      return ctx;
    },
    //
    // Draws the Shape with the current style in the provided canvas context
    // ctx: a [CanvasRenderingContext2D](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D)
    stroke: function (ctx) {
      this.preparePath(ctx);
      ctx.stroke();
      return ctx;
    },
    //
    // Prepares CanvasRenderingContext2D with a path that can be used to stroke a line, to fill a
    // surface or to define a clipping region.
    // ctx: a [CanvasRenderingContext2D](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D)
    preparePath: function (ctx) {
      // Nothing to do in abstract shapes
      // (to be implemented in subclasses
      return ctx;
    },
    //
    // Creates a clipping region in the provided canvas context
    // ctx ([CanvasRenderingContext2D](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D)
    // fillRule (String) - Can be 'nonzero' (default value when undefined) or 'evenodd'
    clip: function (ctx, fillRule) {
      this.preparePath(ctx);
      ctx.clip(fillRule ? fillRule : 'nonzero');
      return ctx;
    }
  };

  //
  // Rectangle
  //
  // pos: Object of type Position 
  // dim: Object of type Dimension or Point (if it's of type `Point`, the dimension
  // of the rectangle will be calculated substracting co-ordinates)
  // w and h: when defined, `pos` and `dim` will be treated as `x` and `y` co-ordinates
  var Rectangle = function (pos, dim, w, h) {
    var p = pos, d = dim;
    // Special case: constructor with a Rectangle as a unique parameter
    if (pos instanceof Rectangle) {
      d = new Dimension(pos.dim.width, pos.dim.height);
      p = new Point(pos.pos.x, pos.pos.y);
    }
    else if (pos instanceof Point) {
      p = new Point(pos.x, pos.y);
      if (dim instanceof Dimension)
        d = new Dimension(dim.width, dim.height);
    }
    else if (pos instanceof Array) {
      // Assume `pos` is an array of numbers indicating: x0, y0, x1, y1
      p = new Point(pos[0], pos[1]);
      d = new Dimension(pos[2] - pos[0], pos[3] - pos[1]);
    }
    else if (typeof w === 'number' && typeof h === 'number') {
      // width and height passed. Treat all parameters as co-ordinates:
      p = new Point(pos, dim);
      d = new Dimension(w, h);
    }
    Shape.call(this, p);
    if (d instanceof Dimension)
      this.dim = d;
    else if (d instanceof Point)
      this.dim = new Dimension(d.x - this.pos.x, d.y - this.pos.y);
    else
      this.dim = new Dimension();
  };

  Rectangle.prototype = {
    constructor: Rectangle,
    dim: new Dimension(),
    //
    // Overrides function in `Shape`. Returns itself
    getBounds: function () {
      return this;
    },
    //
    // Sets the position and dimension of another Rectangle
    setBounds: function (rect) {
      if (!rect)
        rect = new Rectangle();
      this.pos.x = rect.pos.x;
      this.pos.y = rect.pos.y;
      this.dim.width = rect.dim.width;
      this.dim.height = rect.dim.height;
      return this;
    },
    //
    // Check if two Rectangles are equivalent
    equals: function (r) {
      return r instanceof Rectangle && this.pos.equals(r.pos) && this.dim.equals(r.dim);
    },
    //
    // Clones this Rectangle
    clone: function () {
      return new Rectangle(this);
    },
    //
    // Multiplies the rectangle dimensions by the values supplied in `delta`
    // delta (Point or Dimension)
    scaleBy: function (delta) {
      this.pos.multBy(delta);
      this.dim.multBy(delta);
      return this;
    },
    //
    // Expands the boundaries of the rectangle. This affects the current position
    // and the dimension
    grow: function(dx, dy){
      this.pos.x-=dx;
      this.pos.y-=dy;
      this.dim.width+=2*dx;
      this.dim.height+=2*dy;
    },
    //
    // Gets the AWT.Point correspondinf to the lower-right vertex of the rectangle.
    getOppositeVertex: function () {
      return new Point(this.pos.x + this.dim.width, this.pos.y + this.dim.height);
    },
    //
    // Adds another `Rectangle` to the current one
    add: function (shape) {
      var myP2 = this.getOppositeVertex();
      var rectP2 = shape.getBounds().getOppositeVertex();

      this.pos.moveTo(
          Math.min(this.pos.x, shape.getBounds().pos.x),
          Math.min(this.pos.y, shape.getBounds().pos.y));
      this.dim.setDimension(
          Math.max(myP2.x, rectP2.x) - this.pos.x,
          Math.max(myP2.y, rectP2.y) - this.pos.y);
      return this;
    },
    //
    // Check if the provided point `p` is inside this Rectangle
    contains: function (p) {
      var p2 = this.getOppositeVertex();
      return p.x >= this.pos.x && p.x <= p2.x && p.y >= this.pos.y && p.y <= p2.y;
    },
    //
    // Check if the provided Rectangle `r` isntersects this Rectangle
    intersects: function (r) {
      var p1 = this.pos, p2 = this.getOppositeVertex();
      var r1 = r.pos, r2 = r.getOppositeVertex();
      return r2.x >= p1.x && r1.x <= p2.x && r2.y >= p1.y && r1.y <= p2.y;
    },
    // 
    // Prepares CanvasRenderingContext2D with a path that can be used to stroke a line, to fill a
    // surface or to define a clipping region.
    // ctx: a [CanvasRenderingContext2D](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D)
    preparePath: function (ctx) {
      ctx.beginPath();
      ctx.rect(this.pos.x, this.pos.y, this.dim.width, this.dim.height);
      return ctx;
    },
    //
    // Calcs the area of a rectangle with this dimension
    getSurface: function () {
      return this.dim.getSurface();
    },
    //
    // Checks if this rectangle is empty
    isEmpty: function () {
      return this.getSurface() === 0;
    }
  };
  // Rectangle extends Shape
  Rectangle.prototype = $.extend(Object.create(Shape.prototype), Rectangle.prototype);

  //
  // Ellipse
  //
  // pos (Point) - Upper left corner of the enclosing rectangle 
  // dim (Dimension or Point) - Dimension of the enclosing rectangle
  var Ellipse = function (pos, dim, w, h) {
    Rectangle.call(this, pos, dim, w, h);
  };

  Ellipse.prototype = {
    constructor: Ellipse,
    //
    // Check if two Rectangles are equivalent
    equals: function (e) {
      return e instanceof Ellipse && Rectangle.prototype.equals.call(this, e);
    },
    //
    // Clones this Ellipse
    clone: function () {
      return new Ellipse(this.pos, this.dim);
    }
    // TODO: Implement `preparePath`, `contains` and ìntersects` methods for Ellipse
    // (currently using the Rectangle method)
  };
  // Ellipse extends Rectangle
  Ellipse.prototype = $.extend(Object.create(Rectangle.prototype), Ellipse.prototype);


  //
  // A `Path` is formed by a serie of strokes, represented by `PathStroke`objects
  //
  var Path = function (strokes) {
    // Deep copy of the array of strokes
    if (strokes) {
      this.strokes = [];
      for (var n in strokes) {
        var str = strokes[n];
        str = new PathStroke(
            // In [Shaper](Shaper.html) objects, strokes have `action`, not `type`
            str.type ? str.type : str.action,
            // In [Shaper](Shaper.html) objects, strokes have `data`, not `points`
            str.points ? str.points : str.data);
        this.strokes.push(str);
      }
    }
    // Calculate the enclosing rectangle
    this.enclosing = new Rectangle();
    this.calcEnclosingRect();
    Shape.call(this, this.enclosing.pos);
  };

  Path.prototype = {
    constructor: Path,
    strokes: [],
    enclosing: new Rectangle(),
    //
    // Clones this Path
    clone: function () {
      var str = [];
      for (var i = 0; i < this.strokes.length; i++)
        str[i] = this.strokes[i].clone();
      return new Path(str);
    },
    //
    // Adds a PathStroke element to `strokes`
    addStroke: function(stroke){
      this.strokes.push(stroke);
      return this;      
    },
    //
    // Calculates the rectangle that (approximately) encloses the shape, taking
    // in consideration only the co-ordinates of the master points. Bezier and 
    // Quadratic curves can get out of this enclosing box.
    calcEnclosingRect: function () {
      var p0, p1;
      for (var n in this.strokes) {
        var str = this.strokes[n];
        if (str.points)
          for (var m in str.points) {
            var p = str.points[m];
            if (!p0 || !p1) {
              p0 = new Point(p);
              p1 = new Point(p);
            }
            else {
              // Check if `p` is at left or above `p0`
              p0.x = Math.min(p.x, p0.x);
              p0.y = Math.min(p.y, p0.y);
              // Check if `p` is at right or below `p1`
              p1.x = Math.max(p.x, p1.x);
              p1.y = Math.max(p.y, p1.y);
            }
          }
      }
      this.enclosing.setBounds(new Rectangle(p0, new Dimension(p0, p1)));
      
      return this.enclosing;
    },
    //
    // Overrides function in `Shape`
    getBounds: function () {
      return this.enclosing;
    },
    // 
    // Moves the Path by a specified `delta` Point or Dimension
    moveBy: function (delta) {
      for (var str in this.strokes)
        this.strokes[str].moveBy(delta);
      this.enclosing.moveBy(delta);
      return this;
    },
    //
    // Moves the path to a new position
    moveTo: function (newPos) {
      var d = new Dimension(newPos.x - this.pos.x, newPos.y - this.pos.y);
      return this.moveBy(d);
    },
    //
    // Check if two paths are equivalent
    // TODO: Implement comparision of complex paths
    equals: function (p) {
      return false;
    },
    //
    // Multiplies the shape dimension by the values supplied in `delta`
    // delta (Point or Dimension)
    scaleBy: function (delta) {
      for (var str in this.strokes)
        this.strokes[str].multBy(delta);
      this.enclosing.scaleBy(delta);
      return this;
    },
    //
    // Check if the provided point `p` is inside the Path rectangle
    // TODO: Implement a check algorithm based on the real shape
    contains: function (p) {
      return this.enclosing.contains(p);
    },
    //
    // Check if the provided Rectangle `r` isntersects this Shape
    // TODO: Implement a check algorithm based on the real shape
    intersects: function (r) {
      return this.enclosing.intersects(r);
    },
    //
    // Prepares CanvasRenderingContext2D with a path that can be used to stroke a line, to fill a
    // surface or to define a clipping region.
    // ctx: a [CanvasRenderingContext2D](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D)
    preparePath: function (ctx) {
      // TODO: Implement filling paths
      ctx.beginPath();
      for (n in this.strokes)
        this.strokes[n].stroke(ctx);
      return ctx;
    }
  };
  // Path extends Shape
  Path.prototype = $.extend(Object.create(Shape.prototype), Path.prototype);


  //
  // PathStrokes are basic elements of Paths
  //
  var PathStroke = function (type, points) {
    this.type = type;
    // Points are deep cloned, to avoid change the original values
    if (points && points.length > 0) {
      this.points = [];
      // Check if 'points' is an array of objects of type 'Point'
      if (points[0] instanceof Point) {
        for (var p in points)
          this.points.push(new Point(points[p].x, points[p].y));
      }
      // otherwise assume that 'points' contains just numbers
      // to be readed in pairs of x and y co-ordinates
      else {
        for (var i = 0; i < points.length; i += 2)
          this.points.push(new Point(points[i], points[i + 1]));
      }
    }
  };

  PathStroke.prototype = {
    constructor: PathStroke,
    // 
    // Possible stroke types are: `M` (move to), `L` (line to), `Q` (quadratic to),
    // `B` (bezier to) and `X` (close path)
    type: 'X',
    points: null,
    //
    // Clones this PathStroke
    clone: function () {
      // The constructors of PathStroke always make a deep copy of the `points` array
      return new PathStroke(this.type, this.points);
    },
    //
    // Multiplies by `delta` the x and y coordinates of all points
    moveBy: function (delta) {
      if (this.points)
        for (var p in this.points)
          this.points[p].moveBy(delta);
      return this;
    },
    //
    // Multiplies point co-ordinates by `dx` and `dy`
    multBy: function (delta) {
      if (this.points)
        for (var p in this.points)
          this.points[p].multBy(delta);
      return this;
    },
    //
    // Draws the PathStroke in the provided canvas context
    // ctx: ([CanvasRenderingContext2D](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D))
    stroke: function (ctx) {
      switch (this.type) {
        case 'M':
          ctx.moveTo(this.points[0].x, this.points[0].y);
          break;
        case 'L':
          ctx.lineTo(this.points[0].x, this.points[0].y);
          break;
        case 'Q':
          ctx.quadraticCurveTo(
              this.points[0].x, this.points[0].y,
              this.points[1].x, this.points[1].y);
          break;
        case 'B':
          ctx.bezierCurveTo(
              this.points[0].x, this.points[0].y,
              this.points[1].x, this.points[1].y,
              this.points[2].x, this.points[2].y);
          break;
        case 'X':
          ctx.closePath();
          break;
      }
      return ctx;
    }
  };

  // 
  // This class encapsulates actions that will be linked to buttons, menus and
  // other objects
  var Action = function (name, actionPerformed) {
    this.name = name;
    this.actionPerformed = actionPerformed;
  };

  Action.prototype = {
    constructor: Action,
    // 
    // The action's name and description
    name: null,
    description: null,
    //
    // Action status `true`: enabled, `false`: disabled
    enabled: false,
    // 
    // Here is where subclasses must define the function to be performed 
    // when this Action object is called.
    // thisAction - Pointer to this Action object
    // event - The ActionEvent originating this action
    actionPerformed: function (thisAction, event) {
      return this;
    },
    //
    // This is the method to be passed to event triggers
    processEvent: function (event) {
      return this.actionPerformed(this, event);
    },
    // Enables/disables the action
    setEnabled: function (enabled) {
      this.enabled = enabled;
      // TODO: Notify listeners
      return this;
    }
  };

  // 
  // This class encapsulates actions that will be linked to buttons, menus and
  // other objects
  var Timer = function (actionPerformed, interval, enabled) {
    this.actionPerformed = actionPerformed;
    this.interval = interval;
    this.setEnabled(enabled ? true : false);
  };

  Timer.prototype = {
    constructor: Timer,
    // 
    // The timer interval
    interval: 0,
    // 
    // Ticks counter
    ticks: 0,
    //
    // The JavaScript timer object
    timer: null,
    // 
    // The timer should repeat until `stop` is called
    repeats: true,
    // 
    // Here is where subclasses must define the function to be performed 
    // when this timer ticks.
    // thisTimer - Pointer to this Timer object
    // event - The ActionEvent originating this action
    actionPerformed: function (thisTimer) {
      return this;
    },
    //
    // This is the method to be called by setInterval
    processTimer: function (event) {
      this.ticks++;
      if (!this.repeats)
        this.stop();
      return this.actionPerformed.call(this);
    },
    // 
    // Enables/disables the timer
    // * enabled (boolean) : Indicates if the timer should be enabled or disabled
    // * retainCounter (boolean or null) : When `true`, the ticks counter will not be cleared
    setEnabled: function (enabled, retainCounter) {
      if (!retainCounter)
        this.ticks = 0;
      if (enabled && this.timer !== null) {
        // Timer already running
        return;
      }

      if (enabled) {
        var self = this;
        this.timer = window.setInterval(function () {
          self.processTimer(null);
        }, this.interval);
      }
      else {
        if (this.timer !== null) {
          window.clearInterval(this.timer);
          this.timer = null;
        }
      }
      return this;
    },
    //
    // Checks if the timer is running
    isRunning: function () {
      return this.timer !== null;
    },
    //
    // Starts the timer
    start: function (retainCounter) {
      return this.setEnabled(true, retainCounter);
    },
    //
    // Stops the timer
    stop: function (retainCounter) {
      return this.setEnabled(false, retainCounter);
    }
  };

  // Description
  //
  var Container = function (pos, dim, w, h) {
    Rectangle.call(this, pos, dim, w, h);
    //this.invalidatedRect = new Rectangle(new Point(), this.dim);
  };

  Container.prototype = {
    constructor: Container,
    //
    // Invalidated area
    invalidatedRect: null,
    //
    // Invalidates the specified rectangle
    invalidate: function (rect) {
      if (rect) {
        if (this.invalidatedRect === null)
          this.invalidatedRect = rect.clone();
        else
          this.invalidatedRect.add(rect);
      }
      else
        this.invalidatedRect = null;
      return this;
    },
    //
    // Updates the invalid area
    update: function () {
      this.updateContent(this.invalidatedRect);
      return this;
    },
    //
    // Containers should implement this method to update its graphic contents.
    // This method should be called from `AWT.Container.update`
    // dirtyRegion (AWT.Rectangle) - Specifies the area to be updated. When `null`, it's the
    // whole Container.
    updateContent: function (dirtyRegion) {
      // To be overrided. Here does nothing.
      return this;
    }
  };
  // Container extends Rectangle
  Container.prototype = $.extend(Object.create(Rectangle.prototype), Container.prototype);

  //
  // Global variable to be exported
  var AWT = {
    Font: Font,
    Gradient: Gradient,
    Stroke: Stroke,
    Point: Point,
    Dimension: Dimension,
    Shape: Shape,
    Rectangle: Rectangle,
    Ellipse: Ellipse,
    Path: Path,
    PathStroke: PathStroke,
    Action: Action,
    Timer: Timer,
    Container: Container
  };

  return AWT;
});