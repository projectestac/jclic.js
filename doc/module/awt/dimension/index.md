---
title: Dimension
kind: class
longname: module:AWT.Dimension
description: This class encapsulates width and height properties.
---

# Dimension

<SourceLink href="/source/awt-js/#L711" label="AWT.js:711" />

This class encapsulates `width` and `height` properties.

---

## Constructor

<Signature code="new Dimension(w: number | Point, h: number | Point): Dimension" />

Dimension constructor

**Parameters**

- `w` (number | [Point](/module/awt#point)) — The width of this Dimension, or the upper-left vertex of a\
  virtual Rectangle
- `h` (number | [Point](/module/awt#point)) — The height of this Dimension, or the bottom-right vertex of a\
  virtual Rectangle

---

## Instance Methods

<MemberHeading id="setproperties" depth="3" name="setProperties" sig="setProperties($xml: external:jQuery): module:AWT.Dimension" />

<MemberMeta sourceHref="/source/awt-js/#L734" sourceLabel="AWT.js:734" />

Reads the properties of this Dimension from an XML element

**Parameters**

- `$xml` ([external:jQuery](/module/utils#jquery)) — The xml element to be parsed

**Returns**

- [`module:AWT.Dimension`](/module/awt#dimension)

<MemberHeading id="getattributes" depth="3" name="getAttributes" sig="getAttributes(): object" />

<MemberMeta sourceHref="/source/awt-js/#L746" sourceLabel="AWT.js:746" />

Gets a object with the basic attributes needed to rebuild this instance excluding functions,\
parent references, constants and also attributes retaining the default value.\
The resulting object is commonly usued to serialize elements in JSON format.

**Returns**

- `object`

<MemberHeading id="setattributes" depth="3" name="setAttributes" sig="setAttributes(data: object): module:AWT.Dimension" />

<MemberMeta sourceHref="/source/awt-js/#L755" sourceLabel="AWT.js:755" />

Reads the properties of this Dimension from a data object

**Parameters**

- `data` (object) — The data object to be parsed

**Returns**

- [`module:AWT.Dimension`](/module/awt#dimension)

<MemberHeading id="equals" depth="3" name="equals" sig="equals(d: module:AWT.Dimension): boolean" />

<MemberMeta sourceHref="/source/awt-js/#L764" sourceLabel="AWT.js:764" />

Check if two dimensions are equivalent

**Parameters**

- `d` ([module:AWT.Dimension](/module/awt#dimension))

**Returns**

- `boolean`

<MemberHeading id="multby" depth="3" name="multBy" sig="multBy(delta: Point | Dimension): module:AWT.Dimension" />

<MemberMeta sourceHref="/source/awt-js/#L773" sourceLabel="AWT.js:773" />

Multiplies the `w` and `h` co-ordinates by a specified `delta`

**Parameters**

- `delta` ([Point](/module/awt#point) | [Dimension](/module/awt#dimension))

**Returns**

- [`module:AWT.Dimension`](/module/awt#dimension)

<MemberHeading
  id="setdimension"
  depth="3"
  name="setDimension"
  sig="setDimension(
	width: number | Dimension,
	height?: number,
): module:AWT.Dimension"
/>

<MemberMeta sourceHref="/source/awt-js/#L786" sourceLabel="AWT.js:786" />

Sets new values for width and height.\
`width` can be a number or another `Dimension` object

**Parameters**

- `width` (number | [Dimension](/module/awt#dimension)) — The new width, or a full Dimension to copy it from.
- `height` (number, optional) — Not used when `width` is a Dimension

**Returns**

- [`module:AWT.Dimension`](/module/awt#dimension)

<MemberHeading id="getsurface" depth="3" name="getSurface" sig="getSurface(): number" />

<MemberMeta sourceHref="/source/awt-js/#L800" sourceLabel="AWT.js:800" />

Calculates the area of a Rectangle with this dimension

**Returns**

- `number` — The resulting area

## Instance Fields

<MemberHeading id="width" depth="3" name="width" sig="width: number" />

<MemberMeta sourceHref="/source/awt-js/#L809" sourceLabel="AWT.js:809" />

<MemberHeading id="height" depth="3" name="height" sig="height: number" />

<MemberMeta sourceHref="/source/awt-js/#L813" sourceLabel="AWT.js:813" />
