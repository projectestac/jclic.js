---
title: PathStroke
kind: class
longname: module:AWT.PathStroke
description: PathStroke is the basic component of {@link module:AWT.Path} objects
---

# PathStroke

<SourceLink href="/source/awt-js/#L1586" label="AWT.js:1586" />

PathStroke is the basic component of [module:AWT.Path](/module/awt#path) objects

---

## Constructor

<Signature
  code="new PathStroke(
	type: string,
	points: Array.<module:AWT.Point>,
): PathStroke"
/>

PathStroke constructor

**Parameters**

- `type` (string) — The type of stroke. Possible values are: `M` (move to), `L` (line to),\
  `Q` (quadratic to), `B` (bezier to) and `X` (close path).
- `points` (Array.\<[module:AWT.Point](/module/awt#point)>) — The array of [module:AWT.Point](/module/awt#point) objects used in this Stroke.

---

## Instance Methods

<MemberHeading id="clone" depth="3" name="clone" sig="clone(): module:AWT.PathStroke" />

<MemberMeta sourceHref="/source/awt-js/#L1669" sourceLabel="AWT.js:1669" />

Clones this PathStroke

**Returns**

- [`module:AWT.PathStroke`](/module/awt#pathstroke)

<MemberHeading id="moveby" depth="3" name="moveBy" sig="moveBy(delta: Point | Dimension)" />

<MemberMeta sourceHref="/source/awt-js/#L1679" sourceLabel="AWT.js:1679" />

Increments or decrements by `delta` the x and y coordinates of all points

**Parameters**

- `delta` ([Point](/module/awt#point) | [Dimension](/module/awt#dimension)) — The amount to add to the `x` and `y`\
  coordinates of each point.

<MemberHeading id="multby" depth="3" name="multBy" sig="multBy(delta: Point | Dimension)" />

<MemberMeta sourceHref="/source/awt-js/#L1690" sourceLabel="AWT.js:1690" />

Multiplies each point coordinates by the `x` and `y` (or `w` and `h`) values of the\
passed [module:AWT.Point](/module/awt#point) or [Dimension](/module/awt#dimension).

**Parameters**

- `delta` ([Point](/module/awt#point) | [Dimension](/module/awt#dimension))

<MemberHeading id="stroke" depth="3" name="stroke" sig="stroke(ctx: external:CanvasRenderingContext2D)" />

<MemberMeta sourceHref="/source/awt-js/#L1700" sourceLabel="AWT.js:1700" />

Draws this PathStroke in the provided HTML canvas context

**Parameters**

- `ctx` ([external:CanvasRenderingContext2D](/module/utils#canvasrenderingcontext2d)) — The HTML canvas 2D rendering context

<MemberHeading
  id="getenclosingpoints"
  depth="3"
  name="getEnclosingPoints"
  sig="getEnclosingPoints(
	from: module:AWT.Point,
): Array.<module:AWT.Point>"
/>

<MemberMeta sourceHref="/source/awt-js/#L1732" sourceLabel="AWT.js:1732" />

Gets the set of points that will be included as a vertexs on the owner's shape\
enclosing polygon.

**Parameters**

- `from` ([module:AWT.Point](/module/awt#point)) — The starting point for this stroke

**Returns**

- `Array.<`[`module:AWT.Point`](/module/awt#point)`>`

<MemberHeading id="getattributes" depth="3" name="getAttributes" sig="getAttributes(): object" />

<MemberMeta sourceHref="/source/awt-js/#L1757" sourceLabel="AWT.js:1757" />

Gets a object with the basic attributes needed to rebuild this instance excluding functions,\
parent references, constants and also attributes retaining the default value.\
The resulting object is commonly usued to serialize elements in JSON format.

**Returns**

- `object`

## Static Methods

<MemberHeading
  id="getquadraticpoints"
  depth="3"
  name="getQuadraticPoints"
  sig="getQuadraticPoints(
	p0: module:AWT.Point,
	p1: module:AWT.Point,
	p2: module:AWT.Point,
	numPoints?: number,
): Array.<module:AWT.Point>"
/>

<MemberMeta badges="static" sourceHref="/source/awt-js/#L1623" sourceLabel="AWT.js:1623" />

Calculates some of the points included in a quadratic Bézier curve\
The number of points being calculated is defined in Utils.settings.BEZIER\_POINTS

**Parameters**

- `p0` ([module:AWT.Point](/module/awt#point)) — Starting point of the quadratic Bézier curve
- `p1` ([module:AWT.Point](/module/awt#point)) — Control point
- `p2` ([module:AWT.Point](/module/awt#point)) — Ending point
- `numPoints` (number, optional) — The number of intermediate points to calculate. When not defined,\
  the value will be obtained from `module:Utils.settings.BEZIER_POINTS`.

**Returns**

- `Array.<`[`module:AWT.Point`](/module/awt#point)`>`

* **See:**
  - [https://en.wikipedia.org/wiki/B%C3%A9zier\_curve](https://en.wikipedia.org/wiki/B%C3%A9zier_curve)
  - [https://www.jasondavies.com/animated-bezier/](https://www.jasondavies.com/animated-bezier/)

<MemberHeading
  id="getcubicpoints"
  depth="3"
  name="getCubicPoints"
  sig="getCubicPoints(
	p0: module:AWT.Point,
	p1: module:AWT.Point,
	p2: module:AWT.Point,
	p3: module:AWT.Point,
	numPoints?: number,
): Array.<module:AWT.Point>"
/>

<MemberMeta badges="static" sourceHref="/source/awt-js/#L1652" sourceLabel="AWT.js:1652" />

Calculates some of the points included in a cubic Bézier (curve with two control points)\
The number of points being calculated is defined in Utils.settings.BEZIER\_POINTS

**Parameters**

- `p0` ([module:AWT.Point](/module/awt#point)) — Starting point of the cubic Bézier curve
- `p1` ([module:AWT.Point](/module/awt#point)) — First control point
- `p2` ([module:AWT.Point](/module/awt#point)) — Second control point
- `p3` ([module:AWT.Point](/module/awt#point)) — Ending point
- `numPoints` (number, optional) — The number of intermediate points to calculate. When not defined,\
  the value will be obtained from `module:Utils.settings.BEZIER_POINTS`.

**Returns**

- `Array.<`[`module:AWT.Point`](/module/awt#point)`>`

## Instance Fields

<MemberHeading id="type" depth="3" name="type" sig="type: string" />

<MemberMeta sourceHref="/source/awt-js/#L1768" sourceLabel="AWT.js:1768" />

The Stroke type. Possible values are: `M` (move to), `L` (line to), `Q` (quadratic to),\
`B` (bezier to) and `X` (close path).

<MemberHeading id="points" depth="3" name="points" sig="points: Array.<module:AWT.Point>" />

<MemberMeta sourceHref="/source/awt-js/#L1773" sourceLabel="AWT.js:1773" />

The array of points used by this stroke. Can be `null`.
