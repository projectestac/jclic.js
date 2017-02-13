/**
 *  File    : boxes/AbstractBox.js
 *  Created : 18/04/2015
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

/* global define */

define([
  "jquery",
  "../AWT",
  "./BoxBase"
], function ($, AWT, BoxBase) {

  /**
   * This abstract class is the base for most graphic components of JClic. It describes an area
   * (by default an {@link AWT.Rectangle}) with some special properties that determine how it must
   * be drawn on screen.
   *
   * Some types of boxes can act as containers for other boxes, establishing a hierarchy of dependences.
   * @exports AbstractBox
   * @abstract
   * @class
   * @extends AWT.Rectangle
   * @param {?AbstractBox} parent - The AbstractBox to which this one belongs
   * @param {?AWT.Container} container - The container where this box is placed.
   * @param {?BoxBase} boxBase - The object where colors, fonts, border and other graphic properties
   * of this box are defined.
   */
  var AbstractBox = function (parent, container, boxBase) {

    // AbstractBox extends AWT.Rectangle
    AWT.Rectangle.call(this);

    this.container = container;
    this.parent = parent;
    this.boxBase = boxBase;
    this.shape = this;
    this.specialShape = false;
    this.visible = true;
  };

  AbstractBox.prototype = {
    constructor: AbstractBox,
    /**
     * The parent AbstractBox (can be `null`)
     * @type {AbstractBox} */
    parent: null,
    /**
     * The Container to which this AbstractBox belongs
     * @type {AWT.Container} */
    container: null,
    /**
     * The {@link BoxBase} related to this AbstractBox. When `null`, the parent can provide an
     * alternative one.
     * @type {BoxBase} */
    boxBase: null,
    /**
     * Whether this box has a border or not
     * @type {boolean} */
    border: false,
    /**
     * The shape of this box (the box Rectangle or a special Shape, if set)
     * @type {AWT.Shape} */
    shape: null,
    /**
     * Whether this box has a shape that is not a rectangle
     * @type {boolean} */
    specialShape: false,
    /**
     * Whether this box is visible or not
     * @type {boolean} */
    visible: true,
    /**
     * Used to temporary hide a box while other drawing operations are done
     * @type {boolean} */
    temporaryHidden: false,
    /**
     * Cells with this attribute will be transparent but with painted border
     * @type {boolean}*/
    tmpTrans: false,
    /**
     * Whether this box is active or inactive
     * @type {boolean} */
    inactive: false,
    /**
     * Whether this box must be displayed with inverted or regular colors
     * @type {boolean} */
    inverted: false,
    /**
     * Whether this box must be displayed with alternative or regular color and font settings
     * @type {boolean} */
    alternative: false,
    /**
     * Whether this box is marked (selected) or not
     * @type {boolean} */
    marked: false,
    /**
     * Whether this box holds the input focus
     * @type {boolean} */
    focused: false,
    /**
     * Text to be used in accessible contexts
     * @type {string} */
    accessibleText: '',
    /**
     * Describes the main role of this box on the activity. Useful in wai-aria descriptions.
     * @type {string} */
    role: 'cell',
    /**
     * DOM element used to display this cell content in wai-aria contexts
     * @type {external:jQuery} */
    $accessibleElement: null,
    /**
     * Flag indicating that $accessibleElement should be always active
     * @type {boolean} */
    accessibleAlwaysActive: false,
    /**
     * An external JQuery DOM element hosted by this box
     * @type {external:jQuery} */
    $hostedComponent: null,
    /**
     *
     * Setter method for `parent`
     * @param {AbstractBox} parent - The new parent of this box
     */
    setParent: function (parent) {
      this.parent = parent;
    },
    /**
     *
     * Gets the current parent of this box
     * @returns {AbstractBox}
     */
    getParent: function () {
      return this.parent;
    },
    /**
     *
     * Finisher method
     */
    end: function () {
    },
    /**
     *
     * Setter method for `container`
     * @param {AWT.Container} newContainer - The new Container assigned to this box
     */
    setContainer: function (newContainer) {
      this.container = newContainer;
      if (this.$hostedComponent && this.container && this.container.$div) {
        this.$hostedComponent.detach();
        this.container.$div.append(this.$hostedComponent);
      }
    },
    /**
     *
     * Gets the `container` attribute of this box, without checking its parent
     * @returns {?AWT.Container}
     */
    getContainerX: function () {
      return this.container;
    },
    /**
     *
     * Gets the container associated to this box, asking its parents when `null`.
     * @returns {?AWT.Container}
     */
    getContainerResolve: function () {
      var ab = this;
      while (ab.container === null && ab.parent !== null)
        ab = ab.parent;
      return ab.container;
    },
    /**
     *
     * Invalidates the zone corresponding to this box in the associated {@link AWT.Container}, if any.
     * @param {AWT.Rectangle} rect - The rectangle to be invalidated. When `null`, it's the full
     * container area.
     */
    invalidate: function (rect) {
      //if (!rect)
      //  rect = this;
      var cnt = this.getContainerResolve();
      if (cnt)
        cnt.invalidate(rect);
    },
    /**
     *
     * Sets the {@link BoxBase} of this box
     * @param {BoxBase} boxBase - The new BoxBase
     */
    setBoxBase: function (boxBase) {
      this.boxBase = boxBase;
      this.invalidate();
    },
    /**
     *
     * Gets the real {@link BoxBase} associated to this box, scanning down parent relationships.
     * @returns {BoxBase}
     */
    getBoxBaseResolve: function () {
      var ab = this;
      while (!ab.boxBase && ab.parent)
        ab = ab.parent;
      return ab.boxBase || BoxBase.prototype.defaultBoxBase;
    },
    /**
     *
     * Sets the shape used to draw the content of this box
     * @param {AWT.Shape} sh - The shape to be set
     */
    setShape: function (sh) {
      this.shape = sh;
      this.specialShape = true;
      this.invalidate();
      AWT.Rectangle.prototype.setBounds.call(this, sh.getBounds());
      this.invalidate();
    },
    /**
     *
     * Gets the current shape used in this box
     * @returns {AWT.Shape}
     */
    getShape: function () {
      return this.shape;
    },
    /**
     *
     * Check if this box contains the specified point
     * @param {AWT.Point} p - The point to be checked
     * @returns {boolean}
     */
    contains: function (p) {
      return this.shape === this ?
        AWT.Rectangle.prototype.contains.call(this, p) :
        this.shape.contains(p);
    },
    /**
     *
     * Sets a new size and/or dimension to this box
     * @param {(AWT.Rectangle|number)} rect - An AWT.Rectangle object, or the `x` coordinate of the
     * upper-left corner of a new rectangle.
     * @param {number=} y - `y` coordinate of the upper-left corner of the new rectangle.
     * @param {number=} w - Width of the new rectangle.
     * @param {number=} h - Height of the new rectangle.
     */
    setBounds: function (rect, y, w, h) {
      if (typeof rect === 'number')
        // arguments are co-ordinates and size
        rect = new AWT.Rectangle(rect, y, w, h);
      // Rectangle comparision
      if (this.equals(rect))
        return;
      var sizeChanged = !this.dim.equals(rect.dim);
      if (this.specialShape) {
        if (sizeChanged) {
          this.shape.scaleBy(new AWT.Dimension(rect.dim.width / this.dim.width, rect.dim.height / this.dim.height));
          this.setShape(this.shape);
        }
        if (!this.pos.equals(rect.pos)) {
          this.shape.moveTo(rect.pos);
        }
        this.setShape(this.shape);
      } else
        AWT.Rectangle.prototype.setBounds.call(this, rect);

      if (this.$hostedComponent)
        this.setHostedComponentBounds(sizeChanged);

      return this;
    },
    /**
     *
     * Set a new location for this box. In JClic this method was named `setLocation`
     * @param {(AWT.Point|number)} newPos - A point or the `x` coordinate of a new point.
     * @param {number=} y - The `y` coordinate of a new point.
     */
    moveTo: function (newPos, y) {
      if (typeof newPos === 'number')
        newPos = new AWT.Point(newPos, y);
      this.setBounds((new AWT.Rectangle(this)).moveTo(newPos));
    },
    /**
     *
     * Sets a new location to this box. In JClic this method was named `translate`.
     * @param {number} dx - The displacement on the X axis
     * @param {number} dy - The displacement on the Y axis
     */
    moveBy: function (dx, dy) {
      this.setBounds((new AWT.Rectangle(this)).moveBy(dx, dy));
    },
    /**
     *
     * Changes the size of this box
     * @param {number} width
     * @param {number} height
     */
    setSize: function (width, height) {
      this.setBounds(new AWT.Rectangle(this.pos, new AWT.Dimension(width, height)));
    },
    /**
     *
     * Checks if this box has border
     * @returns {boolean}
     */
    hasBorder: function () {
      return this.border;
    },
    /**
     * Sets/unsets a border to this box
     * @param {boolean} newVal - `true` to set a border.
     */
    setBorder: function (newVal) {
      if (!newVal)
        this.invalidate();
      this.border = newVal;
      if (newVal)
        this.invalidate();
    },
    /**
     *
     * Checks if this box is fully visible
     * @returns {boolean}
     */
    isVisible: function () {
      return this.visible;
    },
    /**
     * Sets this box visible or invisible
     * @param {boolean} newVal - `true` for visible
     */
    setVisible: function (newVal) {
      this.visible = newVal;
      this.setHostedComponentVisible();
      this.invalidate();
    },
    /**
     *
     * Makes {@link AbstractBox#$hostedComponent} visible or invisible, based on the value of
     * the AbstractBox `visible` flag.
     */
    setHostedComponentVisible: function () {
      if (this.$hostedComponent)
        this.$hostedComponent.css('visibility', this.visible ? 'visible' : 'hidden');
    },
    /**
     *
     * Checks if this box is temporary hidden
     * @returns {boolean}
     */
    isTemporaryHidden: function () {
      return this.temporaryHidden;
    },
    /**
     *
     * Makes this box temporary hidden (newVal `true`) or resets its original state (newVal `false`)
     * @param {boolean} newVal
     */
    setTemporaryHidden: function (newVal) {
      this.temporaryHidden = newVal;
    },
    /**
     *
     * Checks if this box is currently inactive.
     * @returns {boolean}
     */
    isInactive: function () {
      return this.inactive;
    },
    /**
     *
     * Makes this box active (`false`) or inactive (`true`)
     * @param {boolean} newVal
     */
    setInactive: function (newVal) {
      this.inactive = newVal;
      if (this.$hostedComponent) {
        this.setHostedComponentColors();
        this.setHostedComponentVisible();
      } else {
        if (this.$accessibleElement) {
          var disabled = this.isInactive() && !this.accessibleAlwaysActive;
          this.$accessibleElement.prop({
            disabled: disabled,
            tabindex: disabled ? -1 : 0
          });
        }
        this.invalidate();
      }
    },
    /**
     * Checks if this box is in `inactive` state.
     * @returns {boolean}
     */
    isInverted: function () {
      return this.inverted;
    },
    /**
     *
     * Puts this box in `inverted` mode or restores its original state.
     * @param {boolean} newVal
     */
    setInverted: function (newVal) {
      this.inverted = newVal;
      if (this.$hostedComponent)
        this.setHostedComponentColors();
      else
        this.invalidate();
    },
    /**
     *
     * Checks if this box is `marked`
     * @returns {boolean}
     */
    isMarked: function () {
      return this.marked;
    },
    /**
     *
     * Sets this box in `marked` mode, or restores its original state.
     * @param {boolean} newVal
     */
    setMarked: function (newVal) {
      if (!newVal)
        this.invalidate();
      this.marked = newVal;
      if (this.$hostedComponent) {
        this.setHostedComponentColors();
        this.setHostedComponentBorder();
      } else if (newVal)
        this.invalidate();
    },
    /**
     *
     * Checks if this box has the input focus
     * @returns {boolean}
     */
    isFocused: function () {
      return this.focused;
    },
    /**
     *
     * Sets or unsets the input focus to this box.
     * @param {boolean} newVal
     */
    setFocused: function (newVal) {
      if (!newVal)
        this.invalidate();
      this.focused = newVal;
      if (newVal)
        this.invalidate();
      // Put hosted component on top
      if (this.$hostedComponent)
        this.$hostedComponent.css('z-index', this.focused ? 20 : 2);
    },
    /**
     * Checks if this box is in `alternative` state.
     * @returns {boolean}
     */
    isAlternative: function () {
      return this.alternative;
    },
    /**
     *
     * Sets this box in `alternative` mode, or restores its original state.
     * @param {boolean} newVal
     */
    setAlternative: function (newVal) {
      this.alternative = newVal;
      this.invalidate();
    },
    /**
     *
     * Draws the content of this box on an HTML `canvas` element. At this level, only background
     * and border are painted/stroked. Derived classes should implement specific drawing tasks in
     * {@link AbstractBox#updateContent}.
     * @param {external:CanvasRenderingContext2D} ctx - The canvas rendering context used to draw the
     * box content.
     * @param {AWT.Rectangle=} dirtyRegion - The area that must be repainted. `null` refers to the whole box.
     */
    update: function (ctx, dirtyRegion) {
      if (this.isEmpty() || !this.isVisible() || this.isTemporaryHidden())
        return false;

      if (dirtyRegion && !this.shape.intersects(dirtyRegion))
        return false;

      /**
       * TODO: Implement clipping
       Shape saveClip=new Area(g2.getClip());
       Area clip=new Area(saveClip);
       clip.intersect(new Area(shape));
       g2.setClip(clip);
       */

      var bb = this.getBoxBaseResolve();
      if (!bb.transparent && !bb.dontFill && !this.tmpTrans) {
        if (!bb.bgGradient || bb.bgGradient.hasTransparency()) {
          // Prepare the rendering context
          ctx.fillStyle = this.inactive ?
            bb.inactiveColor :
            this.inverted ? bb.textColor : bb.backColor;
          // Fill the shape
          this.shape.fill(ctx, dirtyRegion);
        }
        if (bb.bgGradient) {
          ctx.fillStyle = bb.bgGradient.getGradient(ctx, this.shape.getBounds());
          this.shape.fill(ctx, dirtyRegion);
        }
        // Reset the canvas context
        ctx.fillStyle = 'black';
      }

      if (!this.$hostedComponent)
        this.updateContent(ctx, dirtyRegion);

      this.drawBorder(ctx);
      return true;
    },
    /**
     *
     * Here is on classes derived from {@link AbstractBox} should implement the drawing of its
     * content. Background and border are already painted in {@link AbstractBox#update}.
     * @param {external:CanvasRenderingContext2D} _ctx - The canvas rendering context used to draw the
     * box content.
     * @param {AWT.Rectangle=} _dirtyRegion - The area that must be repainted. `null` refers to the whole box.
     */
    //
    // Abstract method, to be implemented in subclasses
    updateContent: function (_ctx, _dirtyRegion) {
    },
    /**
     *
     * Draws the box border
     * @param {external:CanvasRenderingContext2D} ctx - The canvas rendering context where the border
     * will be drawn.
     */
    drawBorder: function (ctx) {
      if (this.border || this.marked) {
        var bb = this.getBoxBaseResolve();

        // Prepare stroke settings
        ctx.strokeStyle = bb.borderColor;
        bb[this.marked ? 'markerStroke' : 'borderStroke'].setStroke(ctx);
        if (this.marked)
          ctx.globalCompositeOperation = 'xor';

        // Draw border
        this.shape.stroke(ctx);

        // Reset ctx default values
        if (this.marked)
          ctx.globalCompositeOperation = 'source-over';
        ctx.strokeStyle = 'black';
        AWT.Stroke.prototype.setStroke(ctx);
      }
    },
    /**
     *
     * Returns the enclosing Rectangle of this box including its border (if any)
     * @returns {AWT.Rectangle}
     */
    getBorderBounds: function () {
      var result = new AWT.Rectangle(this.getBounds());
      if (this.border || this.marked) {
        var bb = this.getBoxBaseResolve();
        var w = bb[this.marked ? 'markerStroke' : 'borderStroke'].lineWidth;
        result.moveBy(-w / 2, -w / 2);
        result.dim.width += w;
        result.dim.height += w;
      }
      return result;
    },
    /**
     *
     * Sets the {@link AbstractBox#$hostedComponent $hostedComponent} member.
     * @param {external:jQuery} $hc - The jQuery DOM component hosted by this box.
     */
    setHostedComponent: function ($hc) {
      if (this.$hostedComponent)
        this.$hostedComponent.detach();

      this.$hostedComponent = $hc;

      if (this.$hostedComponent) {
        this.setContainer(this.container);
        this.setHostedComponentColors();
        this.setHostedComponentBorder();
        this.setHostedComponentBounds(true);
        this.setHostedComponentVisible();
        this.setFocused(this.focused);
      }
    },
    /**
     *
     * Gets the current {@link AbstractBox#$hostedComponent|$hostedComponent} member
     * @returns {external:jQuery}
     */
    getHostedComponent: function () {
      return this.$hostedComponent;
    },
    /**
     *
     * Sets {@link AbstractBox#$hostedComponent|$hostedComponent} colors and other css properties
     * based on the current {@link BoxBase} of this box.
     */
    setHostedComponentColors: function () {
      if (this.$hostedComponent) {
        var bb = this.getBoxBaseResolve();
        this.$hostedComponent.css(bb.getCSS(null, this.inactive, this.inverted, this.alternative));
      }
    },
    /**
     *
     * Sets the {@link AbstractBox#$hostedComponent|$hostedComponent} border, based on the current
     * {@link BoxBase} of this box.
     */
    setHostedComponentBorder: function () {
      if (this.$hostedComponent && (this.border || this.marked)) {
        var bb = this.getBoxBaseResolve();
        this.$hostedComponent.css({
          'border-width': bb.get(this.marked ? 'markerStroke' : 'borderStroke').lineWidth + 'px',
          'border-style': 'solid',
          'border-color': bb.get('borderColor')
        });
      }
    },
    /**
     *
     * Places and resizes {@link AbstractBox#$hostedComponent|$hostedComponent}, based on the size
     * and position of this box.
     * @param {boolean} _sizeChanged - `true` when this {@link ActiveBox} has changed its size
     */
    setHostedComponentBounds: function (_sizeChanged) {
      if (this.$hostedComponent) {
        var r = this.getBounds();
        var b = this.border || this.marked ?
          this.getBoxBaseResolve().get(this.marked ? 'markerStroke' : 'borderStroke').lineWidth :
          0;
        this.$hostedComponent.css({
          position: 'absolute',
          width: r.dim.width - 2 * b + 'px',
          height: r.dim.height - 2 * b + 'px',
          top: r.pos.y + 'px',
          left: r.pos.x + 'px'
        });
      }
    }
  };

  // AbstractBox extends AWT.Rectangle
  AbstractBox.prototype = $.extend(Object.create(AWT.Rectangle.prototype), AbstractBox.prototype);

  return AbstractBox;
});
