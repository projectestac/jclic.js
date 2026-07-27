---
title: Path
kind: class
longname: module:AWT.Path
description: A Path is a {@link module:AWT.Shape} formed by a serie of strokes, represented by {@link module:AWT.PathStroke} objects
---

# Path

**Extends:&#x20;**[`module:AWT.Shape`](/module/awt#shape)

<SourceLink href="/source/awt-js/#L1370" label="AWT.js:1370" />

A `Path` is a [module:AWT.Shape](/module/awt#shape) formed by a serie of strokes, represented by\
[module:AWT.PathStroke](/module/awt#pathstroke) objects

---

## Constructor

<Signature code="new Path(strokes: Array.<module:AWT.PathStroke>): Path" />

Path constructor

**Parameters**

- `strokes` (Array.\<[module:AWT.PathStroke](/module/awt#pathstroke)>) — The array of [module:AWT.PathStroke](/module/awt#pathstroke) objects defining this Path.

---

## Instance Methods

<MemberHeading id="addstroke" depth="3" name="addStroke" sig="addStroke(stroke: module:AWT.PathStroke)" />

<MemberMeta sourceHref="/source/awt-js/#L1404" sourceLabel="AWT.js:1404" />

Adds a [module:AWT.PathStroke](/module/awt#pathstroke) to `strokes`

**Parameters**

- `stroke` ([module:AWT.PathStroke](/module/awt#pathstroke))

<MemberHeading id="calcenclosingrect" depth="3" name="calcEnclosingRect" sig="calcEnclosingRect(): module:AWT.Rectangle" />

<MemberMeta sourceHref="/source/awt-js/#L1413" sourceLabel="AWT.js:1413" />

Calculates the polygon and the rectangle that (approximately) encloses this shape

**Returns**

- [`module:AWT.Rectangle`](/module/awt#rectangle)

<MemberHeading id="getattributes" depth="3" name="getAttributes" sig="getAttributes(): object" />

<MemberMeta sourceHref="/source/awt-js/#L1538" sourceLabel="AWT.js:1538" />

Gets a object with the basic attributes needed to rebuild this instance excluding functions,\
parent references, constants and also attributes retaining the default value.\
The resulting object is commonly usued to serialize elements in JSON format.

**Returns**

- `object`

<MemberHeading id="setattributes" depth="3" name="setAttributes" sig="setAttributes(data: object): module:AWT.Path" />

<MemberMeta sourceHref="/source/awt-js/#L1550" sourceLabel="AWT.js:1550" />

**Overrides:&#x20;**`module:AWT.Shape#setAttributes`

Reads the properties of this Path from a data object

**Parameters**

- `data` (object) — The data object to be parsed

**Returns**

- [`module:AWT.Path`](/module/awt#path)

<MemberHeading id="moveby" depth="3" name="moveBy" sig="moveBy(delta: Point | Dimension): module:AWT.Shape" />

<MemberMeta sourceHref="/source/awt-js/#L834" sourceLabel="AWT.js:834" />

_Inherited from `module:AWT.Shape#moveBy`_

**Overrides:&#x20;**`module:AWT.Shape#moveBy`

Shifts the shape a specified amount in horizontal and vertical directions

**Parameters**

- `delta` ([Point](/module/awt#point) | [Dimension](/module/awt#dimension)) — The amount to shift the Shape

**Returns**

- [`module:AWT.Shape`](/module/awt#shape)

<MemberHeading id="moveto" depth="3" name="moveTo" sig="moveTo(newPos: module:AWT.Point): module:AWT.Shape" />

<MemberMeta sourceHref="/source/awt-js/#L844" sourceLabel="AWT.js:844" />

_Inherited from `module:AWT.Shape#moveTo`_

**Overrides:&#x20;**`module:AWT.Shape#moveTo`

Moves this shape to a new position

**Parameters**

- `newPos` ([module:AWT.Point](/module/awt#point)) — The new position of the shape

**Returns**

- [`module:AWT.Shape`](/module/awt#shape)

<MemberHeading id="getbounds" depth="3" name="getBounds" sig="getBounds(): module:AWT.Rectangle" />

<MemberMeta sourceHref="/source/awt-js/#L853" sourceLabel="AWT.js:853" />

_Inherited from `module:AWT.Shape#getBounds`_

**Overrides:&#x20;**`module:AWT.Shape#getBounds`

Gets the enclosing [Rectangle](/module/awt#rectangle) of this Shape.

**Returns**

- [`module:AWT.Rectangle`](/module/awt#rectangle)

<MemberHeading id="equals" depth="3" name="equals" sig="equals(p: module:AWT.Shape): boolean" />

<MemberMeta sourceHref="/source/awt-js/#L862" sourceLabel="AWT.js:862" />

_Inherited from `module:AWT.Shape#equals`_

**Overrides:&#x20;**`module:AWT.Shape#equals`

Checks if two shapes are equivalent.

**Parameters**

- `p` ([module:AWT.Shape](/module/awt#shape)) — The Shape to compare against

**Returns**

- `boolean`

<MemberHeading id="scaleby" depth="3" name="scaleBy" sig="scaleBy(_delta: Point | Dimension): module:AWT.Shape" />

<MemberMeta sourceHref="/source/awt-js/#L871" sourceLabel="AWT.js:871" />

_Inherited from `module:AWT.Shape#scaleBy`_

**Overrides:&#x20;**`module:AWT.Shape#scaleBy`

Multiplies the dimension of the Shape by the specified `delta` amount.

**Parameters**

- `_delta` ([Point](/module/awt#point) | [Dimension](/module/awt#dimension)) — Object containing the X and Y ratio to be scaled.

**Returns**

- [`module:AWT.Shape`](/module/awt#shape)

<MemberHeading id="getshape" depth="3" name="getShape" sig="getShape(rect: module:AWT.Rectangle): module:AWT.Shape" />

<MemberMeta sourceHref="/source/awt-js/#L883" sourceLabel="AWT.js:883" />

_Inherited from `module:AWT.Shape#getShape`_

**Overrides:&#x20;**`module:AWT.Shape#getShape`

Gets a clone of this shape moved to the `pos` component of the rectangle and scaled\
by its `dim` value.

**Parameters**

- `rect` ([module:AWT.Rectangle](/module/awt#rectangle)) — The rectangle to be taken as a base for moving and scaling\
  this shape.

**Returns**

- [`module:AWT.Shape`](/module/awt#shape)

<MemberHeading id="contains" depth="3" name="contains" sig="contains(_p: module:AWT.Point): boolean" />

<MemberMeta sourceHref="/source/awt-js/#L892" sourceLabel="AWT.js:892" />

_Inherited from `module:AWT.Shape#contains`_

**Overrides:&#x20;**`module:AWT.Shape#contains`

Checks if the provided [module:AWT.Point](/module/awt#point) is inside this shape.

**Parameters**

- `_p` ([module:AWT.Point](/module/awt#point)) — The point to check

**Returns**

- `boolean`

<MemberHeading id="intersects" depth="3" name="intersects" sig="intersects(_r: module:AWT.Rectangle): boolean" />

<MemberMeta sourceHref="/source/awt-js/#L902" sourceLabel="AWT.js:902" />

_Inherited from `module:AWT.Shape#intersects`_

**Overrides:&#x20;**`module:AWT.Shape#intersects`

Checks if the provided [Rectangle](/module/awt#rectangle) `r` intersects with this shape.

**Parameters**

- `_r` ([module:AWT.Rectangle](/module/awt#rectangle))

**Returns**

- `boolean`

<MemberHeading
  id="fill"
  depth="3"
  name="fill"
  sig="fill(
	ctx: external:CanvasRenderingContext2D,
	dirtyRegion?: module:AWT.Rectangle,
): external:CanvasRenderingContext2D"
/>

<MemberMeta sourceHref="/source/awt-js/#L914" sourceLabel="AWT.js:914" />

_Inherited from `module:AWT.Shape#fill`_

**Overrides:&#x20;**`module:AWT.Shape#fill`

Fills the Shape with the current style in the provided HTML canvas context

**Parameters**

- `ctx` ([external:CanvasRenderingContext2D](/module/utils#canvasrenderingcontext2d)) — The canvas 2D rendering context where to fill this shape.
- `dirtyRegion` ([module:AWT.Rectangle](/module/awt#rectangle), optional) — The context region to be updated. Used as clipping\
  region when drawing.

**Returns**

- [`external:CanvasRenderingContext2D`](/module/utils#canvasrenderingcontext2d)

<MemberHeading
  id="stroke"
  depth="3"
  name="stroke"
  sig="stroke(
	ctx: external:CanvasRenderingContext2D,
): external:CanvasRenderingContext2D"
/>

<MemberMeta sourceHref="/source/awt-js/#L934" sourceLabel="AWT.js:934" />

_Inherited from `module:AWT.Shape#stroke`_

**Overrides:&#x20;**`module:AWT.Shape#stroke`

Draws this shape in the provided HTML canvas 2D rendering context.

**Parameters**

- `ctx` ([external:CanvasRenderingContext2D](/module/utils#canvasrenderingcontext2d)) — The canvas 2D rendering context where to draw the shape.

**Returns**

- [`external:CanvasRenderingContext2D`](/module/utils#canvasrenderingcontext2d)

<MemberHeading
  id="preparepath"
  depth="3"
  name="preparePath"
  sig="preparePath(
	ctx: external:CanvasRenderingContext2D,
): external:CanvasRenderingContext2D"
/>

<MemberMeta sourceHref="/source/awt-js/#L946" sourceLabel="AWT.js:946" />

_Inherited from `module:AWT.Shape#preparePath`_

**Overrides:&#x20;**`module:AWT.Shape#preparePath`

Prepares an HTML canvas 2D rendering context with a path that can be used to stroke a line,\
to fill a surface or to define a clipping region.

**Parameters**

- `ctx` ([external:CanvasRenderingContext2D](/module/utils#canvasrenderingcontext2d))

**Returns**

- [`external:CanvasRenderingContext2D`](/module/utils#canvasrenderingcontext2d)

<MemberHeading
  id="clip"
  depth="3"
  name="clip"
  sig="clip(
	ctx: external:CanvasRenderingContext2D,
	fillRule?: string,
): external:CanvasRenderingContext2D"
/>

<MemberMeta sourceHref="/source/awt-js/#L957" sourceLabel="AWT.js:957" />

_Inherited from `module:AWT.Shape#clip`_

**Overrides:&#x20;**`module:AWT.Shape#clip`

Creates a clipping region on the specified HTML canvas 2D rendering context

**Parameters**

- `ctx` ([external:CanvasRenderingContext2D](/module/utils#canvasrenderingcontext2d)) — The rendering context
- `fillRule` (string, optional, default: "'nonzero'") — Can be 'nonzero' (default when not set) or 'evenodd'

**Returns**

- [`external:CanvasRenderingContext2D`](/module/utils#canvasrenderingcontext2d)

<MemberHeading id="isrect" depth="3" name="isRect" sig="isRect(): boolean" />

<MemberMeta sourceHref="/source/awt-js/#L967" sourceLabel="AWT.js:967" />

_Inherited from `module:AWT.Shape#isRect`_

**Overrides:&#x20;**`module:AWT.Shape#isRect`

Shorthand method for determining if a Shape is an [Rectangle](/module/awt#rectangle)

**Returns**

- `boolean`

<MemberHeading id="tostring" depth="3" name="toString" sig="toString(): string" />

<MemberMeta sourceHref="/source/awt-js/#L975" sourceLabel="AWT.js:975" />

_Inherited from `module:AWT.Shape#toString`_

**Overrides:&#x20;**`module:AWT.Shape#toString`

Overwrites the original 'Object.toString' method with a more descriptive text

**Returns**

- `string`

## Static Methods

<MemberHeading id="buildshape" depth="3" name="buildShape" sig="buildShape(data: object): module:AWT.Shape" />

<MemberMeta badges="static" sourceHref="/source/awt-js/#L1000" sourceLabel="AWT.js:1000" />

_Inherited from `module:AWT.Shape`_

Builds a shape based on the provided `data` object.\
Data should contain a 'type' member, specifying the type of shape requested ('rect', 'ellipse', 'rectangle' or 'path')

**Parameters**

- `data` (object) — Specific data for this shape

**Returns**

- [`module:AWT.Shape`](/module/awt#shape)

## Instance Fields

<MemberHeading id="type" depth="3" name="type" sig="type: string" />

<MemberMeta sourceHref="/source/awt-js/#L1565" sourceLabel="AWT.js:1565" />

**Overrides:&#x20;**`module:AWT.Shape#type`

Shape type id

<MemberHeading id="strokes" depth="3" name="strokes" sig="strokes: Array.<module:AWT.PathStroke>" />

<MemberMeta sourceHref="/source/awt-js/#L1570" sourceLabel="AWT.js:1570" />

The strokes forming this Path.

<MemberHeading id="enclosing" depth="3" name="enclosing" sig="enclosing: module:AWT.Rectangle" />

<MemberMeta sourceHref="/source/awt-js/#L1575" sourceLabel="AWT.js:1575" />

The [Rectangle](/module/awt#rectangle) enclosing this Path (when drawing, this Rectangle don't include border width!)

<MemberHeading id="enclosingpoints" depth="3" name="enclosingPoints" sig="enclosingPoints: Array.<module:AWT.Point>" />

<MemberMeta sourceHref="/source/awt-js/#L1580" sourceLabel="AWT.js:1580" />

Set of vertexs of a polygon close to the real path of this shape

<MemberHeading id="pos" depth="3" name="pos" sig="pos: module:AWT.Point" />

<MemberMeta sourceHref="/source/awt-js/#L1019" sourceLabel="AWT.js:1019" />

_Inherited from `module:AWT.Shape#pos`_

**Overrides:&#x20;**`module:AWT.Shape#pos`

The current position of the shape
