---
title: Stroke
kind: class
longname: module:AWT.Stroke
description: Contains properties used to draw lines in HTML canvas elements.
---

# Stroke

<SourceLink href="/source/awt-js/#L502" label="AWT.js:502" />

Contains properties used to draw lines in HTML `canvas` elements.

- **See:**
  - [http://bucephalus.org/text/CanvasHandbook/CanvasHandbook.html#line-caps-and-joins](http://bucephalus.org/text/CanvasHandbook/CanvasHandbook.html#line-caps-and-joins)

---

## Constructor

<Signature
  code="new Stroke(
	lineWidth?: number,
	lineCap?: string,
	lineJoin?: string,
	miterLimit?: number,
): Stroke"
/>

Stroke constructor

**Parameters**

- `lineWidth` (number, optional, default: 1) — The line width of the stroke
- `lineCap` (string, optional, default: "'butt'") — The line ending type. Possible values are: `butt`, `round`\
  and `square`.
- `lineJoin` (string, optional, default: "'miter'") — The type of drawing used when two lines join. Possible\
  values are: `round`, `bevel` and `miter`.
- `miterLimit` (number, optional, default: 10) — The ratio between the miter length and half `lineWidth`.

---

## Instance Methods

<MemberHeading id="getattributes" depth="3" name="getAttributes" sig="getAttributes(): object" />

<MemberMeta sourceHref="/source/awt-js/#L529" sourceLabel="AWT.js:529" />

Gets a object with the basic attributes needed to rebuild this instance excluding functions,\
parent references, constants and also attributes retaining the default value.\
The resulting object is commonly usued to serialize elements in JSON format.

**Returns**

- `object`

<MemberHeading id="setattributes" depth="3" name="setAttributes" sig="setAttributes(data: object): module:AWT.Stroke" />

<MemberMeta sourceHref="/source/awt-js/#L540" sourceLabel="AWT.js:540" />

Reads the properties of this Stroke from a data object

**Parameters**

- `data` (object) — The data object to be parsed

**Returns**

- [`module:AWT.Stroke`](/module/awt#stroke)

<MemberHeading
  id="setstroke"
  depth="3"
  name="setStroke"
  sig="setStroke(
	ctx: external:CanvasRenderingContext2D,
): external:CanvasRenderingContext2D"
/>

<MemberMeta sourceHref="/source/awt-js/#L549" sourceLabel="AWT.js:549" />

Sets the properties of this stroke to a CanvasRenderingContext2D

**Parameters**

- `ctx` ([external:CanvasRenderingContext2D](/module/utils#canvasrenderingcontext2d)) — The canvas 2D rendering context

**Returns**

- [`external:CanvasRenderingContext2D`](/module/utils#canvasrenderingcontext2d)

## Instance Fields

<MemberHeading id="linewidth" depth="3" name="lineWidth" sig="lineWidth: number" />

<MemberMeta sourceHref="/source/awt-js/#L563" sourceLabel="AWT.js:563" />

The line width

<MemberHeading id="linecap" depth="3" name="lineCap" sig="lineCap: string" />

<MemberMeta sourceHref="/source/awt-js/#L568" sourceLabel="AWT.js:568" />

The line ending type (`butt`, `round` or `square`)

<MemberHeading id="linejoin" depth="3" name="lineJoin" sig="lineJoin: string" />

<MemberMeta sourceHref="/source/awt-js/#L573" sourceLabel="AWT.js:573" />

The drawing used when two lines join (`round`, `bevel` or `miter`)

<MemberHeading id="miterlimit" depth="3" name="miterLimit" sig="miterLimit: number" />

<MemberMeta sourceHref="/source/awt-js/#L578" sourceLabel="AWT.js:578" />

Ratio between the miter length and half `lineWidth`
