---
title: BoxBase
kind: class
longname: module:boxes/BoxBase.BoxBase
description: "This class contains all the main visual attributes needed to draw {@link module:boxes/AbstractBox.AbstractBox AbstractBox} objects: background and foreground colors, gradients, colors for special states (inactive, alternative, disabled...), margins, fonts, border strokes, etc. Objects derived from {@link module:boxes/AbstractBox.AbstractBox AbstractBox} can have inheritance: boxes that act as &quot;containers&quot; of other boxes (like {@link module:boxes/BoxBag.BoxBag BoxBag}). Most of the attributes of BoxBase can be null , meaning that the value of the ancestor -or the default value if the box has no ancestors- must be used."
---

# BoxBase

<SourceLink href="/source/boxes/boxbase-js/#L48" label="BoxBase.js:48" />

This class contains all the main visual attributes needed to draw [AbstractBox](/module/boxes-abstractbox#abstractbox) objects:\
background and foreground colors, gradients, colors for special states (inactive, alternative,\
disabled...), margins, fonts, border strokes, etc.

Objects derived from [AbstractBox](/module/boxes-abstractbox#abstractbox) can have inheritance: boxes that act as "containers"\
of other boxes (like [BoxBag](/module/boxes-boxbag#boxbag)). Most of the attributes of `BoxBase` can be `null`,\
meaning that the value of the ancestor -or the default value if the box has no ancestors- must\
be used.

---

## Constructor

<Signature code="new BoxBase(parent?: module:boxes/BoxBase.BoxBase): BoxBase" />

BoxBase constructor

**Parameters**

- `parent` ([module:boxes/BoxBase.BoxBase](/module/boxes-boxbase#boxbase), optional) — Another BoxBase object used to determine the value of properties not\
  locally set.

---

## Instance Methods

<MemberHeading id="setproperties" depth="3" name="setProperties" sig="setProperties($xml: external:jQuery)" />

<MemberMeta sourceHref="/source/boxes/boxbase-js/#L62" sourceLabel="BoxBase.js:62" />

Loads the BoxBase settings from a specific JQuery XML element

**Parameters**

- `$xml` ([external:jQuery](/module/utils#jquery)) — The XML element to parse

<MemberHeading id="getattributes" depth="3" name="getAttributes" sig="getAttributes(): object" />

<MemberMeta sourceHref="/source/boxes/boxbase-js/#L114" sourceLabel="BoxBase.js:114" />

Gets a object with the basic attributes needed to rebuild this instance excluding functions,\
parent references, constants and also attributes retaining the default value.\
The resulting object is commonly usued to serialize elements in JSON format.

**Returns**

- `object`

<MemberHeading id="setattributes" depth="3" name="setAttributes" sig="setAttributes(data: object): module:boxes/BoxBase.BoxBase" />

<MemberMeta sourceHref="/source/boxes/boxbase-js/#L134" sourceLabel="BoxBase.js:134" />

Reads the properties of this BoxBase from a data object

**Parameters**

- `data` (object) — The data object to be parsed

**Returns**

- [`module:boxes/BoxBase.BoxBase`](/module/boxes-boxbase#boxbase)

<MemberHeading id="get" depth="3" name="get" sig="get(property: string): any" />

<MemberMeta sourceHref="/source/boxes/boxbase-js/#L155" sourceLabel="BoxBase.js:155" />

Gets the value of the specified property, scanning down to parents and prototype if not defined.

**Parameters**

- `property` (string) — The property to retrieve

**Returns**

- `any`

<MemberHeading id="set" depth="3" name="set" sig="set(property: string, value: any)" />

<MemberMeta sourceHref="/source/boxes/boxbase-js/#L167" sourceLabel="BoxBase.js:167" />

Sets the value of a specific property.

**Parameters**

- `property` (string) — The property name.
- `value` (any) — Depends on the type of property

<MemberHeading id="getown" depth="3" name="getOwn" sig="getOwn(property: string): any" />

<MemberMeta sourceHref="/source/boxes/boxbase-js/#L178" sourceLabel="BoxBase.js:178" />

Gets the value of the specified property, scanning down to parents if not defined, and returning\
always an own property (not from prototype)

**Parameters**

- `property` (string) — The property to retrieve

**Returns**

- `any`

<MemberHeading
  id="getcss"
  depth="3"
  name="getCSS"
  sig="getCSS(
	css?: object,
	inactive?: boolean,
	inverse?: boolean,
	alternative?: boolean,
): object"
/>

<MemberMeta sourceHref="/source/boxes/boxbase-js/#L200" sourceLabel="BoxBase.js:200" />

Gets the properties defined in this BoxBase as a collection of CSS attributes

**Parameters**

- `css` (object, optional) — An optional set of initial CSS properties
- `inactive` (boolean, optional, default: false) — When `true`, get CSS attributes for an inactive cell
- `inverse` (boolean, optional, default: false) — When `true`, get CSS attributes for an inverse cell
- `alternative` (boolean, optional, default: false) — When `true`, get CSS attributes for an alternative cell

**Returns**

- `object`

<MemberHeading
  id="preparetext"
  depth="3"
  name="prepareText"
  sig="prepareText(
	ctx: external:CanvasRenderingContext2D,
	text: string,
	maxWidth: number,
	maxHeight: number,
): Array.<object>"
/>

<MemberMeta sourceHref="/source/boxes/boxbase-js/#L237" sourceLabel="BoxBase.js:237" />

This utility method computes the width and height of text lines rendered on an HTML\
**canvas** element, reducing the font size of the BoxBase as needed when they exceed the maximum\
width and/or height.

**Parameters**

- `ctx` ([external:CanvasRenderingContext2D](/module/utils#canvasrenderingcontext2d)) — The canvas rendering context used to draw the text.
- `text` (string) — The text to drawn.
- `maxWidth` (number) — Maximum width
- `maxHeight` (number) — Maximum height

**Returns**

- `Array.<object>`

## Instance Fields

<MemberHeading id="parent" depth="3" name="parent" sig="parent: module:boxes/BoxBase.BoxBase" />

<MemberMeta sourceHref="/source/boxes/boxbase-js/#L304" sourceLabel="BoxBase.js:304" />

The parent BoxBase object

<MemberHeading id="defaultvalues" depth="3" name="defaultValues" sig="defaultValues: object" />

<MemberMeta sourceHref="/source/boxes/boxbase-js/#L309" sourceLabel="BoxBase.js:309" />

Default values

<MemberHeading id="font" depth="3" name="font" sig="font: module:AWT.Font" />

<MemberMeta sourceHref="/source/boxes/boxbase-js/#L316" sourceLabel="BoxBase.js:316" />

Font size can be dynamically reduced to fit the available space if any element using this\
`BoxBase` requests it. When this happen, this field contains the real font currently used\
to draw text.

<MemberHeading id="dynfontsize" depth="3" name="dynFontSize" sig="dynFontSize: number" />

<MemberMeta sourceHref="/source/boxes/boxbase-js/#L321" sourceLabel="BoxBase.js:321" />

The current font size of this BoxBase. Can be dynamically adjusted when drawing.

<MemberHeading id="resetfontcounter" depth="3" name="resetFontCounter" sig="resetFontCounter: number" />

<MemberMeta sourceHref="/source/boxes/boxbase-js/#L327" sourceLabel="BoxBase.js:327" />

Counts the number of times the `dynFontSize` has been reset. This is useful to avoid excessive\
recursive loops searching the optimal font size.

<MemberHeading id="backcolor" depth="3" name="backColor" sig="backColor: string" />

<MemberMeta sourceHref="/source/boxes/boxbase-js/#L332" sourceLabel="BoxBase.js:332" />

The background color

<MemberHeading id="bggradient" depth="3" name="bgGradient" sig="bgGradient: module:AWT.Gradient" />

<MemberMeta sourceHref="/source/boxes/boxbase-js/#L337" sourceLabel="BoxBase.js:337" />

The background gradient. Default is `null`.

<MemberHeading id="textcolor" depth="3" name="textColor" sig="textColor: string" />

<MemberMeta sourceHref="/source/boxes/boxbase-js/#L342" sourceLabel="BoxBase.js:342" />

The color used to write text.

<MemberHeading id="shadowcolor" depth="3" name="shadowColor" sig="shadowColor: string" />

<MemberMeta sourceHref="/source/boxes/boxbase-js/#L347" sourceLabel="BoxBase.js:347" />

The color used to draw a shadow below regular text.

<MemberHeading id="bordercolor" depth="3" name="borderColor" sig="borderColor: string" />

<MemberMeta sourceHref="/source/boxes/boxbase-js/#L352" sourceLabel="BoxBase.js:352" />

The color of the border.

<MemberHeading id="inactivecolor" depth="3" name="inactiveColor" sig="inactiveColor: string" />

<MemberMeta sourceHref="/source/boxes/boxbase-js/#L357" sourceLabel="BoxBase.js:357" />

The color used to draw text when a cell is in `inactive` state.

<MemberHeading id="alternativecolor" depth="3" name="alternativeColor" sig="alternativeColor: string" />

<MemberMeta sourceHref="/source/boxes/boxbase-js/#L362" sourceLabel="BoxBase.js:362" />

The color used to draw text when a cell is in `alternative` state.

<MemberHeading id="shadow" depth="3" name="shadow" sig="shadow: boolean" />

<MemberMeta sourceHref="/source/boxes/boxbase-js/#L367" sourceLabel="BoxBase.js:367" />

Whether the text should have a shadow or not

<MemberHeading id="transparent" depth="3" name="transparent" sig="transparent: boolean" />

<MemberMeta sourceHref="/source/boxes/boxbase-js/#L372" sourceLabel="BoxBase.js:372" />

Whether the cell's background (and its hosted component, if any) should be transparent

<MemberHeading id="dontfill" depth="3" name="dontFill" sig="dontFill: boolean" />

<MemberMeta sourceHref="/source/boxes/boxbase-js/#L378" sourceLabel="BoxBase.js:378" />

Wheter the cell's background should be painted or not. This property has no effect on\
hosted components.

<MemberHeading id="textmargin" depth="3" name="textMargin" sig="textMargin: number" />

<MemberMeta sourceHref="/source/boxes/boxbase-js/#L383" sourceLabel="BoxBase.js:383" />

The margin to respect between text elements and the limits of the cell or other elements.

<MemberHeading id="borderstroke" depth="3" name="borderStroke" sig="borderStroke: module:AWT.Stroke" />

<MemberMeta sourceHref="/source/boxes/boxbase-js/#L388" sourceLabel="BoxBase.js:388" />

The stroke used to draw the border.

<MemberHeading id="markerstroke" depth="3" name="markerStroke" sig="markerStroke: module:AWT.Stroke" />

<MemberMeta sourceHref="/source/boxes/boxbase-js/#L393" sourceLabel="BoxBase.js:393" />

The stroke used to draw a border around marked cells.
