---
title: Point
kind: class
longname: module:AWT.Point
description: Contains the x andy y coordinates of a point, and provides some useful methods.
---

# Point

<SourceLink href="/source/awt-js/#L584" label="AWT.js:584" />

Contains the `x` andy `y` coordinates of a point, and provides some useful methods.

---

## Constructor

<Signature code="new Point(x: number | Point, y?: number): Point" />

Point constructor

**Parameters**

- `x` (number | [Point](/module/awt#point)) — When `x` is an `Point` object, a clone of it will be created.
- `y` (number, optional) — Not used when `x` is an `Point`

---

## Instance Methods

<MemberHeading id="setproperties" depth="3" name="setProperties" sig="setProperties($xml: external:jQuery): module:AWT.Point" />

<MemberMeta sourceHref="/source/awt-js/#L606" sourceLabel="AWT.js:606" />

Reads the properties of this Point from an XML element

**Parameters**

- `$xml` ([external:jQuery](/module/utils#jquery)) — The xml element to be parsed

**Returns**

- [`module:AWT.Point`](/module/awt#point)

<MemberHeading id="getattributes" depth="3" name="getAttributes" sig="getAttributes(): object" />

<MemberMeta sourceHref="/source/awt-js/#L618" sourceLabel="AWT.js:618" />

Gets a object with the basic attributes needed to rebuild this instance excluding functions,\
parent references, constants and also attributes retaining the default value.\
The resulting object is commonly usued to serialize elements in JSON format.

**Returns**

- `object`

<MemberHeading id="setattributes" depth="3" name="setAttributes" sig="setAttributes(data: object): module:AWT.Point" />

<MemberMeta sourceHref="/source/awt-js/#L627" sourceLabel="AWT.js:627" />

Reads the properties of this Point from a data object

**Parameters**

- `data` (object) — The data object to be parsed

**Returns**

- [`module:AWT.Point`](/module/awt#point)

<MemberHeading id="moveby" depth="3" name="moveBy" sig="moveBy(delta: Point | Dimension): module:AWT.Point" />

<MemberMeta sourceHref="/source/awt-js/#L636" sourceLabel="AWT.js:636" />

Moves this Point to a new position, by a specified displacement

**Parameters**

- `delta` ([Point](/module/awt#point) | [Dimension](/module/awt#dimension)) — The amount to move

**Returns**

- [`module:AWT.Point`](/module/awt#point)

<MemberHeading id="moveto" depth="3" name="moveTo" sig="moveTo(newPos: number | Point, y?: number): module:AWT.Point" />

<MemberMeta sourceHref="/source/awt-js/#L648" sourceLabel="AWT.js:648" />

Moves this Point to a new position

**Parameters**

- `newPos` (number | [Point](/module/awt#point)) — The new position, or a x coordinate
- `y` (number, optional) — `null` or `undefined` when `newPos` is a Point

**Returns**

- [`module:AWT.Point`](/module/awt#point)

<MemberHeading id="multby" depth="3" name="multBy" sig="multBy(delta: Point | Dimension): module:AWT.Point" />

<MemberMeta sourceHref="/source/awt-js/#L664" sourceLabel="AWT.js:664" />

Multiplies the `x` and `y` coordinates by a specified `delta`

**Parameters**

- `delta` ([Point](/module/awt#point) | [Dimension](/module/awt#dimension)) — The amount to multiply by.

**Returns**

- [`module:AWT.Point`](/module/awt#point)

<MemberHeading id="equals" depth="3" name="equals" sig="equals(p: module:AWT.Point): boolean" />

<MemberMeta sourceHref="/source/awt-js/#L675" sourceLabel="AWT.js:675" />

Checks if two points are at the same place

**Parameters**

- `p` ([module:AWT.Point](/module/awt#point)) — The Point to check against to

**Returns**

- `boolean`

<MemberHeading id="distanceto" depth="3" name="distanceTo" sig="distanceTo(point: module:AWT.Point): number" />

<MemberMeta sourceHref="/source/awt-js/#L684" sourceLabel="AWT.js:684" />

Calculates the distance between two points

**Parameters**

- `point` ([module:AWT.Point](/module/awt#point)) — The Point to calculate the distance against to

**Returns**

- `number`

<MemberHeading id="clone" depth="3" name="clone" sig="clone(): module:AWT.Point" />

<MemberMeta sourceHref="/source/awt-js/#L692" sourceLabel="AWT.js:692" />

Clones this point

**Returns**

- [`module:AWT.Point`](/module/awt#point)

## Instance Fields

<MemberHeading id="x" depth="3" name="x" sig="x: number" />

<MemberMeta sourceHref="/source/awt-js/#L701" sourceLabel="AWT.js:701" />

<MemberHeading id="y" depth="3" name="y" sig="y: number" />

<MemberMeta sourceHref="/source/awt-js/#L705" sourceLabel="AWT.js:705" />
