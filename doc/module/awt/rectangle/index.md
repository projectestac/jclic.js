---
title: Rectangle
kind: class
longname: module:AWT.Rectangle
description: The rectangular {@link module:AWT.Shape} accepts five different sets of parameters:
---

# Rectangle

**Extends:&#x20;**[`module:AWT.Shape`](/module/awt#shape)

<SourceLink href="/source/awt-js/#L1038" label="AWT.js:1038" />

The rectangular [module:AWT.Shape](/module/awt#shape) accepts five different sets of parameters:

**Example**

```js
<p>// Calling Rectangle() with different sets of parameters<br>
// A Point and a Dimension:<br>
new Rectangle(pos, dim)<br>
// Another Rectangle, to be cloned:<br>
new Rectangle(rect)<br>
// Two Point objects containing the coordinates of upper-left and lower-right vertexs:<br>
new Rectangle(p0, p1)<br>
// An array of four numbers with the coordinates of the same vertexs:<br>
new Rectangle([x0, y0, x1, y1])<br>
// Four single numbers, meaning the same coordinates as above:<br>
new Rectangle(x0, y0, x1, y1)</p>
```

---

## Constructor

<Signature
  code="new Rectangle(
	pos: Point | Rectangle | number | Array.<number>,
	dim?: Dimension | number,
	w?: number,
	h?: number,
): Rectangle"
/>

Rectangle constructor

**Parameters**

- `pos` ([Point](/module/awt#point) | [Rectangle](/module/awt#rectangle) | number | Array.\<number>)
- `dim` ([Dimension](/module/awt#dimension) | number, optional)
- `w` (number, optional)
- `h` (number, optional)

---

## Instance Methods

<MemberHeading id="getbounds" depth="3" name="getBounds" sig="getBounds(): module:AWT.Rectangle" />

<MemberMeta sourceHref="/source/awt-js/#L1081" sourceLabel="AWT.js:1081" />

**Overrides:&#x20;**`module:AWT.Shape#getBounds`

Gets the enclosing [Rectangle](/module/awt#rectangle) of this Shape.

**Returns**

- [`module:AWT.Rectangle`](/module/awt#rectangle)

<MemberHeading id="setbounds" depth="3" name="setBounds" sig="setBounds(rect: module:AWT.Rectangle): module:AWT.Rectangle" />

<MemberMeta sourceHref="/source/awt-js/#L1090" sourceLabel="AWT.js:1090" />

Sets this Rectangle the position and dimension of another one

**Parameters**

- `rect` ([module:AWT.Rectangle](/module/awt#rectangle))

**Returns**

- [`module:AWT.Rectangle`](/module/awt#rectangle)

<MemberHeading id="equals" depth="3" name="equals" sig="equals(r: module:AWT.Shape): boolean" />

<MemberMeta sourceHref="/source/awt-js/#L1105" sourceLabel="AWT.js:1105" />

**Overrides:&#x20;**`module:AWT.Shape#equals`

Checks if two shapes are equivalent.

**Parameters**

- `r` ([module:AWT.Shape](/module/awt#shape)) — The Shape to compare against

**Returns**

- `boolean`

<MemberHeading id="clone" depth="3" name="clone" sig="clone(): module:AWT.Rectangle" />

<MemberMeta sourceHref="/source/awt-js/#L1113" sourceLabel="AWT.js:1113" />

Clones this Rectangle

**Returns**

- [`module:AWT.Rectangle`](/module/awt#rectangle)

<MemberHeading id="scaleby" depth="3" name="scaleBy" sig="scaleBy(delta: Point | Dimension): module:AWT.Rectangle" />

<MemberMeta sourceHref="/source/awt-js/#L1122" sourceLabel="AWT.js:1122" />

**Overrides:&#x20;**`module:AWT.Shape#scaleBy`

Multiplies the dimension of the Shape by the specified `delta` amount.

**Parameters**

- `delta` ([Point](/module/awt#point) | [Dimension](/module/awt#dimension)) — Object containing the X and Y ratio to be scaled.

**Returns**

- [`module:AWT.Rectangle`](/module/awt#rectangle)

<MemberHeading id="grow" depth="3" name="grow" sig="grow(dx: number, dy: number): module:AWT.Rectangle" />

<MemberMeta sourceHref="/source/awt-js/#L1134" sourceLabel="AWT.js:1134" />

Expands the boundaries of this shape. This affects the current position and dimension.

**Parameters**

- `dx` (number) — The amount to grow (or decrease) in horizontal direction
- `dy` (number) — The amount to grow (or decrease) in vertical direction

**Returns**

- [`module:AWT.Rectangle`](/module/awt#rectangle)

<MemberHeading id="getoppositevertex" depth="3" name="getOppositeVertex" sig="getOppositeVertex(): module:AWT.Point" />

<MemberMeta sourceHref="/source/awt-js/#L1146" sourceLabel="AWT.js:1146" />

Gets the [module:AWT.Point](/module/awt#point) corresponding to the lower-right vertex of the Rectangle.

**Returns**

- [`module:AWT.Point`](/module/awt#point)

<MemberHeading id="add" depth="3" name="add" sig="add(shape: module:AWT.Shape): module:AWT.Rectangle" />

<MemberMeta sourceHref="/source/awt-js/#L1155" sourceLabel="AWT.js:1155" />

Adds the boundaries of another shape to the current one

**Parameters**

- `shape` ([module:AWT.Shape](/module/awt#shape)) — The [module:AWT.Shape](/module/awt#shape) to be added

**Returns**

- [`module:AWT.Rectangle`](/module/awt#rectangle)

<MemberHeading id="getcoords" depth="3" name="getCoords" sig="getCoords(): string" />

<MemberMeta sourceHref="/source/awt-js/#L1222" sourceLabel="AWT.js:1222" />

Gets a string with the co-ordinates of the upper-left and lower-right vertexs of this rectangle,\
(with values rounded to int)

**Returns**

- `string`

<MemberHeading id="getattributes" depth="3" name="getAttributes" sig="getAttributes(): object" />

<MemberMeta sourceHref="/source/awt-js/#L1232" sourceLabel="AWT.js:1232" />

Gets a object with the basic attributes needed to rebuild this instance excluding functions,\
parent references, constants and also attributes retaining the default value.\
The resulting object is commonly usued to serialize elements in JSON format.

**Returns**

- `object`

<MemberHeading id="setattributes" depth="3" name="setAttributes" sig="setAttributes(data: object): module:AWT.Rectangle" />

<MemberMeta sourceHref="/source/awt-js/#L1241" sourceLabel="AWT.js:1241" />

**Overrides:&#x20;**`module:AWT.Shape#setAttributes`

Reads the properties of this Rectangle from a data object

**Parameters**

- `data` (object) — The data object to be parsed

**Returns**

- [`module:AWT.Rectangle`](/module/awt#rectangle)

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

<MemberMeta sourceHref="/source/awt-js/#L1255" sourceLabel="AWT.js:1255" />

**Overrides:&#x20;**`module:AWT.Shape#type`

Shape type id

<MemberHeading id="dim" depth="3" name="dim" sig="dim: module:AWT.Dimension" />

<MemberMeta sourceHref="/source/awt-js/#L1260" sourceLabel="AWT.js:1260" />

The [Dimension](/module/awt#dimension) of the Rectangle

<MemberHeading id="pos" depth="3" name="pos" sig="pos: module:AWT.Point" />

<MemberMeta sourceHref="/source/awt-js/#L1019" sourceLabel="AWT.js:1019" />

_Inherited from `module:AWT.Shape#pos`_

**Overrides:&#x20;**`module:AWT.Shape#pos`

The current position of the shape
