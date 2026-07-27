---
title: Rectangular
kind: class
longname: module:shapers/Rectangular.Rectangular
description: This is the simplest {@link module:shapers/Shaper.Shaper Shaper}. It divides the graphic object in a set of rectangular shapes distributed in the specified number of rows and columns.
---

# Rectangular

**Extends:&#x20;**[`module:shapers/Shaper.Shaper`](/module/shapers-shaper#shaper)

<SourceLink href="/source/shapers/rectangular-js/#L41" label="Rectangular.js:41" />

This is the simplest [Shaper](/module/shapers-shaper#shaper). It divides the graphic object in a set of rectangular\
shapes distributed in the specified number of rows and columns.

---

## Constructor

<Signature code="new Rectangular(nx: number, ny: number): Rectangular" />

Rectangular constructor

**Parameters**

- `nx` (number) — Number of columns
- `ny` (number) — Number of rows

---

## Instance Methods

<MemberHeading id="buildshapes" depth="3" name="buildShapes" sig="buildShapes()" />

<MemberMeta sourceHref="/source/shapers/rectangular-js/#L55" sourceLabel="Rectangular.js:55" />

Builds the rectangular shapes based on the number of rows and columns

<MemberHeading id="reset" depth="3" name="reset" sig="reset(nCols: number, nRows: number)" />

<MemberMeta sourceHref="/source/shapers/shaper-js/#L81" sourceLabel="Shaper.js:81" />

_Inherited from `module:shapers/Shaper.Shaper#reset`_

**Overrides:&#x20;**`module:shapers/Shaper.Shaper#reset`

Initializes this Shaper to default values

**Parameters**

- `nCols` (number) — Number of columns
- `nRows` (number) — Number of rows

<MemberHeading id="setproperties" depth="3" name="setProperties" sig="setProperties($xml: external:jQuery)" />

<MemberMeta sourceHref="/source/shapers/shaper-js/#L95" sourceLabel="Shaper.js:95" />

_Inherited from `module:shapers/Shaper.Shaper#setProperties`_

**Overrides:&#x20;**`module:shapers/Shaper.Shaper#setProperties`

Loads this shaper settings from a specific JQuery XML element

**Parameters**

- `$xml` ([external:jQuery](/module/utils#jquery)) — The XML element with the shaper data

<MemberHeading id="getattributes" depth="3" name="getAttributes" sig="getAttributes(): object" />

<MemberMeta sourceHref="/source/shapers/shaper-js/#L191" sourceLabel="Shaper.js:191" />

_Inherited from `module:shapers/Shaper.Shaper#getAttributes`_

**Overrides:&#x20;**`module:shapers/Shaper.Shaper#getAttributes`

Gets a object with the basic attributes needed to rebuild this instance excluding functions,\
parent references, constants and also attributes retaining the default value.\
The resulting object is commonly usued to serialize elements in JSON format.

**Returns**

- `object`

<MemberHeading id="buildshapes" depth="3" name="buildShapes" sig="buildShapes()" />

<MemberMeta sourceHref="/source/shapers/rectangular-js/#L55" sourceLabel="Rectangular.js:55" />

_Inherited from `module:shapers/Rectangular.Rectangular#buildShapes`_

**Overrides:&#x20;**`module:shapers/Shaper.Shaper#buildShapes`

Builds the rectangular shapes based on the number of rows and columns

<MemberHeading
  id="getshape"
  depth="3"
  name="getShape"
  sig="getShape(
	n: number,
	rect: module:AWT.Rectangle,
): module:AWT.Shape"
/>

<MemberMeta sourceHref="/source/shapers/shaper-js/#L242" sourceLabel="Shaper.js:242" />

_Inherited from `module:shapers/Shaper.Shaper#getShape`_

**Overrides:&#x20;**`module:shapers/Shaper.Shaper#getShape`

Gets a clone of the nth Shape object, scaled and located inside a Rectangle

**Parameters**

- `n` (number)
- `rect` ([module:AWT.Rectangle](/module/awt#rectangle))

**Returns**

- [`module:AWT.Shape`](/module/awt#shape)

<MemberHeading id="getshapedata" depth="3" name="getShapeData" sig="getShapeData(n: number): object" />

<MemberMeta sourceHref="/source/shapers/shaper-js/#L255" sourceLabel="Shaper.js:255" />

_Inherited from `module:shapers/Shaper.Shaper#getShapeData`_

**Overrides:&#x20;**`module:shapers/Shaper.Shaper#getShapeData`

Gets the nth Shape data object

**Parameters**

- `n` (number)

**Returns**

- `object`

<MemberHeading id="getenclosingshapedata" depth="3" name="getEnclosingShapeData" sig="getEnclosingShapeData(): module:AWT.Rectangle" />

<MemberMeta sourceHref="/source/shapers/shaper-js/#L263" sourceLabel="Shaper.js:263" />

_Inherited from `module:shapers/Shaper.Shaper#getEnclosingShapeData`_

**Overrides:&#x20;**`module:shapers/Shaper.Shaper#getEnclosingShapeData`

Gets the AWT.Rectangle that contains all shapes of this Shaper.

**Returns**

- [`module:AWT.Rectangle`](/module/awt#rectangle)

<MemberHeading
  id="getremaindershape"
  depth="3"
  name="getRemainderShape"
  sig="getRemainderShape(
	rect: module:AWT.Rectangle,
): module:AWT.Rectangle"
/>

<MemberMeta sourceHref="/source/shapers/shaper-js/#L273" sourceLabel="Shaper.js:273" />

_Inherited from `module:shapers/Shaper.Shaper#getRemainderShape`_

**Overrides:&#x20;**`module:shapers/Shaper.Shaper#getRemainderShape`

When `hasRemainder` is true, this method gets the rectangle containing the full surface where\
the Shaper develops.

**Parameters**

- `rect` ([module:AWT.Rectangle](/module/awt#rectangle)) — The frame where to move and scale all the shapes

**Returns**

- [`module:AWT.Rectangle`](/module/awt#rectangle)

<MemberHeading id="buildshapes" depth="3" name="buildShapes" sig="buildShapes()" />

<MemberMeta sourceHref="/source/shapers/rectangular-js/#L55" sourceLabel="Rectangular.js:55" />

_Inherited from `module:shapers/Rectangular.Rectangular#buildShapes`_

**Overrides:&#x20;**`module:shapers/Shaper.Shaper#buildShapes`

Builds the rectangular shapes based on the number of rows and columns

## Static Methods

<MemberHeading
  id="registerclass"
  depth="3"
  name="registerClass"
  sig="registerClass(
	shaperName: string,
	shaperClass: function,
): module:shapers/Shaper.Shaper"
/>

<MemberMeta badges="static" sourceHref="/source/shapers/shaper-js/#L57" sourceLabel="Shaper.js:57" />

_Inherited from `module:shapers/Shaper.Shaper`_

Registers a new type of shaper

**Parameters**

- `shaperName` (string) — The name used to identify this shaper
- `shaperClass` (function) — The shaper class, usually extending Shaper

**Returns**

- [`module:shapers/Shaper.Shaper`](/module/shapers-shaper#shaper)

<MemberHeading
  id="getshaper"
  depth="3"
  name="getShaper"
  sig="getShaper(
	className: string,
	nx: number,
	ny: number,
): module:shapers/Shaper.Shaper"
/>

<MemberMeta badges="static" sourceHref="/source/shapers/shaper-js/#L69" sourceLabel="Shaper.js:69" />

_Inherited from `module:shapers/Shaper.Shaper`_

Factory constructor that returns a Shaper of the requested class.

**Parameters**

- `className` (string) — The class name of the requested Shaper.
- `nx` (number) — Number of columns (in grid-based shapers)
- `ny` (number) — Number of rows (in grid-based shapers)

**Returns**

- [`module:shapers/Shaper.Shaper`](/module/shapers-shaper#shaper)

<MemberHeading
  id="readshapedata"
  depth="3"
  name="readShapeData"
  sig="readShapeData(
	$xml: external:jQuery,
	scaleX: number,
	scaleY: number,
): module:AWT.Shape"
/>

<MemberMeta badges="static" sourceHref="/source/shapers/shaper-js/#L155" sourceLabel="Shaper.js:155" />

_Inherited from `module:shapers/Shaper.Shaper`_

Reads an individual shape from an XML element.\
Shapes are arrays of `stroke` objects.\
Each `stroke` has an `action` (_move to_, _line to_, _quad to_...) and associated `data`.

**Parameters**

- `$xml` ([external:jQuery](/module/utils#jquery)) — The XML element with the shape data
- `scaleX` (number)
- `scaleY` (number)

**Returns**

- [`module:AWT.Shape`](/module/awt#shape)

<MemberHeading id="factory" depth="3" name="factory" sig="factory(data: object): module:shapers/Shaper.Shaper" />

<MemberMeta badges="static" sourceHref="/source/shapers/shaper-js/#L213" sourceLabel="Shaper.js:213" />

_Inherited from `module:shapers/Shaper.Shaper`_

Builds a new shaper, based on the properties specified in a data object

**Parameters**

- `data` (object) — The data object to be parsed

**Returns**

- [`module:shapers/Shaper.Shaper`](/module/shapers-shaper#shaper)

## Instance Fields

<MemberHeading id="rectangularshapes" depth="3" name="rectangularShapes" sig="rectangularShapes: boolean" />

<MemberMeta sourceHref="/source/shapers/rectangular-js/#L74" sourceLabel="Rectangular.js:74" />

Overrides same flag in `Shaper#rectangularShapes`

<MemberHeading id="classname" depth="3" name="className" sig="className: string" />

<MemberMeta sourceHref="/source/shapers/shaper-js/#L295" sourceLabel="Shaper.js:295" />

_Inherited from `module:shapers/Shaper.Shaper#className`_

**Overrides:&#x20;**`module:shapers/Shaper.Shaper#className`

This shaper class name

<MemberHeading id="ncols" depth="3" name="nCols" sig="nCols: number" />

<MemberMeta sourceHref="/source/shapers/shaper-js/#L300" sourceLabel="Shaper.js:300" />

_Inherited from `module:shapers/Shaper.Shaper#nCols`_

**Overrides:&#x20;**`module:shapers/Shaper.Shaper#nCols`

Number of columns (useful in grid-based shapers)

<MemberHeading id="nrows" depth="3" name="nRows" sig="nRows: number" />

<MemberMeta sourceHref="/source/shapers/shaper-js/#L305" sourceLabel="Shaper.js:305" />

_Inherited from `module:shapers/Shaper.Shaper#nRows`_

**Overrides:&#x20;**`module:shapers/Shaper.Shaper#nRows`

Number of rows (useful in grid-based shapers)

<MemberHeading id="ncells" depth="3" name="nCells" sig="nCells: number" />

<MemberMeta sourceHref="/source/shapers/shaper-js/#L310" sourceLabel="Shaper.js:310" />

_Inherited from `module:shapers/Shaper.Shaper#nCells`_

**Overrides:&#x20;**`module:shapers/Shaper.Shaper#nCells`

Number of cells managed by this shaper

<MemberHeading id="shapedata" depth="3" name="shapeData" sig="shapeData: object" />

<MemberMeta sourceHref="/source/shapers/shaper-js/#L315" sourceLabel="Shaper.js:315" />

_Inherited from `module:shapers/Shaper.Shaper#shapeData`_

**Overrides:&#x20;**`module:shapers/Shaper.Shaper#shapeData`

Contains the specific definition of each shape

<MemberHeading id="initiated" depth="3" name="initiated" sig="initiated: boolean" />

<MemberMeta sourceHref="/source/shapers/shaper-js/#L320" sourceLabel="Shaper.js:320" />

_Inherited from `module:shapers/Shaper.Shaper#initiated`_

**Overrides:&#x20;**`module:shapers/Shaper.Shaper#initiated`

Flag used to check if the `Shaper` has been initialized against a real surface

<MemberHeading id="basewidthfactor" depth="3" name="baseWidthFactor" sig="baseWidthFactor: number" />

<MemberMeta sourceHref="/source/shapers/shaper-js/#L327" sourceLabel="Shaper.js:327" />

_Inherited from `module:shapers/Shaper.Shaper#baseWidthFactor`_

**Overrides:&#x20;**`module:shapers/Shaper.Shaper#baseWidthFactor`

In [JigSaw](/module/shapers-jigsaw#jigsaw), ratio between the base width of the tooth and the total length of the side.

<MemberHeading id="toothheightfactor" depth="3" name="toothHeightFactor" sig="toothHeightFactor: number" />

<MemberMeta sourceHref="/source/shapers/shaper-js/#L332" sourceLabel="Shaper.js:332" />

_Inherited from `module:shapers/Shaper.Shaper#toothHeightFactor`_

**Overrides:&#x20;**`module:shapers/Shaper.Shaper#toothHeightFactor`

In [JigSaw](/module/shapers-jigsaw#jigsaw), ratio between the tooth height and the total length of the side.

<MemberHeading id="randomlines" depth="3" name="randomLines" sig="randomLines: boolean" />

<MemberMeta sourceHref="/source/shapers/shaper-js/#L337" sourceLabel="Shaper.js:337" />

_Inherited from `module:shapers/Shaper.Shaper#randomLines`_

**Overrides:&#x20;**`module:shapers/Shaper.Shaper#randomLines`

In [JigSaw](/module/shapers-jigsaw#jigsaw), whether the tooths take random directions or not

<MemberHeading id="scalex" depth="3" name="scaleX" sig="scaleX: number" />

<MemberMeta sourceHref="/source/shapers/shaper-js/#L345" sourceLabel="Shaper.js:345" />

_Inherited from `module:shapers/Shaper.Shaper#scaleX`_

**Overrides:&#x20;**`module:shapers/Shaper.Shaper#scaleX`

In [Holes](/module/shapers-holes#holes), scale to be applied to horizontal positions and lengths to achieve the real\
value of the shape placed on a real surface.

<MemberHeading id="scaley" depth="3" name="scaleY" sig="scaleY: number" />

<MemberMeta sourceHref="/source/shapers/shaper-js/#L351" sourceLabel="Shaper.js:351" />

_Inherited from `module:shapers/Shaper.Shaper#scaleY`_

**Overrides:&#x20;**`module:shapers/Shaper.Shaper#scaleY`

In [Holes](/module/shapers-holes#holes), scale to be applied to vertical positions and lengths to achieve the real\
value of the shape placed on a real surface.

<MemberHeading id="enclosing" depth="3" name="enclosing" sig="enclosing: module:AWT.Shape" />

<MemberMeta sourceHref="/source/shapers/shaper-js/#L356" sourceLabel="Shaper.js:356" />

_Inherited from `module:shapers/Shaper.Shaper#enclosing`_

**Overrides:&#x20;**`module:shapers/Shaper.Shaper#enclosing`

In [Holes](/module/shapers-holes#holes), the enclosing area where all shapes are placed.

<MemberHeading id="showenclosure" depth="3" name="showEnclosure" sig="showEnclosure: boolean" />

<MemberMeta sourceHref="/source/shapers/shaper-js/#L361" sourceLabel="Shaper.js:361" />

_Inherited from `module:shapers/Shaper.Shaper#showEnclosure`_

**Overrides:&#x20;**`module:shapers/Shaper.Shaper#showEnclosure`

In [Holes](/module/shapers-holes#holes), when `true`, the enclosing area will be drawn

<MemberHeading id="rectangularshapes" depth="3" name="rectangularShapes" sig="rectangularShapes: boolean" />

<MemberMeta sourceHref="/source/shapers/rectangular-js/#L74" sourceLabel="Rectangular.js:74" />

_Inherited from `module:shapers/Rectangular.Rectangular#rectangularShapes`_

**Overrides:&#x20;**`module:shapers/Shaper.Shaper#rectangularShapes`

Overrides same flag in `Shaper#rectangularShapes`

<MemberHeading id="hasremainder" depth="3" name="hasRemainder" sig="hasRemainder: boolean" />

<MemberMeta sourceHref="/source/shapers/shaper-js/#L372" sourceLabel="Shaper.js:372" />

_Inherited from `module:shapers/Shaper.Shaper#hasRemainder`_

**Overrides:&#x20;**`module:shapers/Shaper.Shaper#hasRemainder`

Flag indicating if this Shaper deploys over a surface biggest than the rectangle enclosing\
all its shapes

<MemberHeading id="customshapes" depth="3" name="customShapes" sig="customShapes: boolean" />

<MemberMeta sourceHref="/source/shapers/shaper-js/#L377" sourceLabel="Shaper.js:377" />

_Inherited from `module:shapers/Shaper.Shaper#customShapes`_

**Overrides:&#x20;**`module:shapers/Shaper.Shaper#customShapes`

Only the `Holes` shaper has this flag activated

<MemberHeading id="rectangularshapes" depth="3" name="rectangularShapes" sig="rectangularShapes: boolean" />

<MemberMeta sourceHref="/source/shapers/rectangular-js/#L74" sourceLabel="Rectangular.js:74" />

_Inherited from `module:shapers/Rectangular.Rectangular#rectangularShapes`_

**Overrides:&#x20;**`module:shapers/Shaper.Shaper#rectangularShapes`

Overrides same flag in `Shaper#rectangularShapes`

## Static Fields

<MemberHeading id="classes" depth="3" name="CLASSES" sig="CLASSES: object" />

<MemberMeta badges="static" sourceHref="/source/shapers/shaper-js/#L384" sourceLabel="Shaper.js:384" />

_Inherited from `module:shapers/Shaper.Shaper`_

List of known classes derived from Shaper. It should be filled by real shaper classes at\
declaration time.
