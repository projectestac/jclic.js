---
title: Gradient
kind: class
longname: module:AWT.Gradient
description: Contains parameters and methods to draw complex color gradients
---

# Gradient

<SourceLink href="/source/awt-js/#L385" label="AWT.js:385" />

Contains parameters and methods to draw complex color gradients

---

## Constructor

<Signature
  code="new Gradient(
	c1: string,
	c2: string,
	angle?: number,
	cycles?: number,
): Gradient"
/>

Gradient constructor

**Parameters**

- `c1` (string) — The initial color, in any CSS-valid form.
- `c2` (string) — The final color, in any CSS-valid form.
- `angle` (number, optional, default: 0) — The inclination of the gradient relative to the horizontal line.
- `cycles` (number, optional, default: 1) — The number of times the gradient will be repeated.

---

## Instance Methods

<MemberHeading id="setproperties" depth="3" name="setProperties" sig="setProperties($xml: external:jQuery): module:AWT.Gradient" />

<MemberMeta sourceHref="/source/awt-js/#L409" sourceLabel="AWT.js:409" />

Reads the properties of this Gradient from an XML element

**Parameters**

- `$xml` ([external:jQuery](/module/utils#jquery)) — The xml element to be parsed

**Returns**

- [`module:AWT.Gradient`](/module/awt#gradient)

<MemberHeading id="getattributes" depth="3" name="getAttributes" sig="getAttributes(): object" />

<MemberMeta sourceHref="/source/awt-js/#L423" sourceLabel="AWT.js:423" />

Gets a object with the basic attributes needed to rebuild this instance excluding functions,\
parent references, constants and also attributes retaining the default value.\
The resulting object is commonly usued to serialize elements in JSON format.

**Returns**

- `object`

<MemberHeading id="setattributes" depth="3" name="setAttributes" sig="setAttributes(data: object): module:AWT.Gradient" />

<MemberMeta sourceHref="/source/awt-js/#L434" sourceLabel="AWT.js:434" />

Reads the properties of this Gradient from a data object

**Parameters**

- `data` (object) — The data object to be parsed

**Returns**

- [`module:AWT.Gradient`](/module/awt#gradient)

<MemberHeading
  id="getgradient"
  depth="3"
  name="getGradient"
  sig="getGradient(
	ctx: external:CanvasRenderingContext2D,
	rect: module:AWT.Rectangle,
): module:AWT.Gradient"
/>

<MemberMeta sourceHref="/source/awt-js/#L445" sourceLabel="AWT.js:445" />

Creates a [CanvasGradient](https://developer.mozilla.org/en-US/docs/Web/API/CanvasGradient)\
based on the provided context and rectangle.

**Parameters**

- `ctx` ([external:CanvasRenderingContext2D](/module/utils#canvasrenderingcontext2d)) — The 2D rendering context
- `rect` ([module:AWT.Rectangle](/module/awt#rectangle)) — The rectangle where this gradient will be applied to

**Returns**

- [`module:AWT.Gradient`](/module/awt#gradient)

<MemberHeading id="getcss" depth="3" name="getCss" sig="getCss(): string" />

<MemberMeta sourceHref="/source/awt-js/#L459" sourceLabel="AWT.js:459" />

Gets the CSS 'linear-gradient' expression of this Gradient

**Returns**

- `string`

<MemberHeading id="hastransparency" depth="3" name="hasTransparency" sig="hasTransparency(): boolean" />

<MemberMeta sourceHref="/source/awt-js/#L470" sourceLabel="AWT.js:470" />

Checks if any of the gradient colors has transparency

**Returns**

- `boolean`

## Instance Fields

<MemberHeading id="c1" depth="3" name="c1" sig="c1: string" />

<MemberMeta sourceHref="/source/awt-js/#L480" sourceLabel="AWT.js:480" />

Initial color

<MemberHeading id="c2" depth="3" name="c2" sig="c2: string" />

<MemberMeta sourceHref="/source/awt-js/#L485" sourceLabel="AWT.js:485" />

Final color

<MemberHeading id="angle" depth="3" name="angle" sig="angle: number" />

<MemberMeta sourceHref="/source/awt-js/#L490" sourceLabel="AWT.js:490" />

Tilt angle

<MemberHeading id="cycles" depth="3" name="cycles" sig="cycles: number" />

<MemberMeta sourceHref="/source/awt-js/#L495" sourceLabel="AWT.js:495" />

Number of repetitions of the gradient
