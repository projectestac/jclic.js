---
title: Font
kind: class
longname: module:AWT.Font
description: Font contains properties and provides methods to manage fonts
---

# Font

<SourceLink href="/source/awt-js/#L38" label="AWT.js:38" />

Font contains properties and provides methods to manage fonts

---

## Constructor

<Signature
  code="new Font(
	family?: string,
	size?: number,
	bold?: number,
	italic?: number,
	variant?: string,
): Font"
/>

Font constructor

**Parameters**

- `family` (string, optional, default: "'Arial'")
- `size` (number, optional, default: 17)
- `bold` (number, optional, default: 0)
- `italic` (number, optional, default: 0)
- `variant` (string, optional, default: "''")

---

## Instance Methods

<MemberHeading id="setproperties" depth="3" name="setProperties" sig="setProperties($xml: external:jQuery): module:AWT.Font" />

<MemberMeta sourceHref="/source/awt-js/#L141" sourceLabel="AWT.js:141" />

Reads the properties of this Font from an XML element

**Parameters**

- `$xml` ([external:jQuery](/module/utils#jquery)) — The xml element to be parsed

**Returns**

- [`module:AWT.Font`](/module/awt#font)

<MemberHeading id="getattributes" depth="3" name="getAttributes" sig="getAttributes(): object" />

<MemberMeta sourceHref="/source/awt-js/#L161" sourceLabel="AWT.js:161" />

Gets a object with the basic attributes needed to rebuild this instance excluding functions,\
parent references, constants and also attributes retaining the default value.\
The resulting object is commonly usued to serialize elements in JSON format.

**Returns**

- `object`

<MemberHeading id="setattributes" depth="3" name="setAttributes" sig="setAttributes(data: object): module:AWT.Font" />

<MemberMeta sourceHref="/source/awt-js/#L170" sourceLabel="AWT.js:170" />

Reads the properties of this Font from a data object

**Parameters**

- `data` (object) — The data object to be parsed

**Returns**

- [`module:AWT.Font`](/module/awt#font)

<MemberHeading id="setsize" depth="3" name="setSize" sig="setSize(size: number): module:AWT.Font" />

<MemberMeta sourceHref="/source/awt-js/#L179" sourceLabel="AWT.js:179" />

Allows to change the `size` member, recalculating the vertical metrics.

**Parameters**

- `size` (number) — The new size to set

**Returns**

- [`module:AWT.Font`](/module/awt#font)

<MemberHeading id="zoom" depth="3" name="zoom" sig="zoom(amount: number): module:AWT.Font" />

<MemberMeta sourceHref="/source/awt-js/#L192" sourceLabel="AWT.js:192" />

Increases or decreases the current font size by the specified amount

**Parameters**

- `amount` (number) — The amount to increase or decrease current size

**Returns**

- [`module:AWT.Font`](/module/awt#font)

<MemberHeading id="getmetrics" depth="3" name="getMetrics" sig="getMetrics(): Object" />

<MemberMeta sourceHref="/source/awt-js/#L200" sourceLabel="AWT.js:200" />

Calculates the font metrics

**Returns**

- `Object`

<MemberHeading id="getheight" depth="3" name="getHeight" sig="getHeight(): number" />

<MemberMeta sourceHref="/source/awt-js/#L220" sourceLabel="AWT.js:220" />

Calculates the font metrics and returns its height

**Returns**

- `number`

<MemberHeading id="tocss" depth="3" name="toCss" sig="toCss(css: object): object" />

<MemberMeta sourceHref="/source/awt-js/#L231" sourceLabel="AWT.js:231" />

Translates the Font properties into CSS statements

**Parameters**

- `css` (object) — The object where to add CSS properties. When null or undefined, a new\
  object will be created and returned.

**Returns**

- `object`

<MemberHeading id="cssfont" depth="3" name="cssFont" sig="cssFont(): string" />

<MemberMeta sourceHref="/source/awt-js/#L250" sourceLabel="AWT.js:250" />

Gets the codification of this font in a single string, suitable to be used in a `font`\
CSS attribute.

**Returns**

- `string`

<MemberHeading id="calcheight" depth="3" name="_calcHeight" sig="_calcHeight(): module:AWT.Font" />

<MemberMeta sourceHref="/source/awt-js/#L267" sourceLabel="AWT.js:267" />

The [TextMetrics](https://developer.mozilla.org/en-US/docs/Web/API/TextMetrics) object used\
by [CanvasRenderingContext2D](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D)\
does not provide a `heigth` value for rendered text.\
This [stackoverflow question](http://stackoverflow.com/questions/1134586/how-can-you-find-the-height-of-text-on-an-html-canvas)\
has an excellent response by Daniel Earwicker explaining how to measure the\
vertical dimension of rendered text using a `span` element.\
The code has been slighty adapted to deal with Font objects.

_Warning_: Do not call this method direcly. Use [getHeight()](/module/awt/font#getheight) or [getMetrics()](/module/awt/font#getmetrics) instead

**Returns**

- [`module:AWT.Font`](/module/awt#font)

<MemberHeading id="equals" depth="3" name="equals" sig="equals(font: module:AWT.Font): boolean" />

<MemberMeta sourceHref="/source/awt-js/#L291" sourceLabel="AWT.js:291" />

Checks if two Font objects are equivalent

**Parameters**

- `font` ([module:AWT.Font](/module/awt#font)) — The Font object to compare against this one

**Returns**

- `boolean`

## Static Methods

<MemberHeading id="checktree" depth="3" name="checkTree" sig="checkTree($tree: external:jQuery, options?: object)" />

<MemberMeta badges="static" sourceHref="/source/awt-js/#L68" sourceLabel="AWT.js:68" />

Finds the XML elements with typeface specifications, checks its value against the font\
substitution list, replacing the `family` attribute and loading the alternative font when needed.

**Parameters**

- `$tree` ([external:jQuery](/module/utils#jquery)) — The xml element to be processed
- `options` (object, optional) — Optional param that can contain a `fontSubstitutions` attribute with\
  a substition table to be added to [SUBSTITUTIONS](/module/awt/font#substitutions)

<MemberHeading id="loadgooglefont" depth="3" name="loadGoogleFont" sig="loadGoogleFont(name: string)" />

<MemberMeta badges="static" sourceHref="/source/awt-js/#L119" sourceLabel="AWT.js:119" />

Try to load a specific font from \[http\://www\.google.com/fonts]

**Parameters**

- `name` (string) — The font family name

<MemberHeading id="loadgooglefonts" depth="3" name="loadGoogleFonts" sig="loadGoogleFonts(fonts: Array.<string>)" />

<MemberMeta badges="static" sourceHref="/source/awt-js/#L131" sourceLabel="AWT.js:131" />

Try to load a set of Google fonts

**Parameters**

- `fonts` (Array.\<string>) — An array of font names

## Instance Fields

<MemberHeading id="family" depth="3" name="family" sig="family: string" />

<MemberMeta sourceHref="/source/awt-js/#L350" sourceLabel="AWT.js:350" />

The `font-family` property

<MemberHeading id="size" depth="3" name="size" sig="size: number" />

<MemberMeta sourceHref="/source/awt-js/#L356" sourceLabel="AWT.js:356" />

The font size\
**Warning**: Do not change `size` directly. Use [setSize()](/module/awt/font#setsize) instead.

<MemberHeading id="bold" depth="3" name="bold" sig="bold: number" />

<MemberMeta sourceHref="/source/awt-js/#L361" sourceLabel="AWT.js:361" />

The font _bold_ value

<MemberHeading id="italic" depth="3" name="italic" sig="italic: number" />

<MemberMeta sourceHref="/source/awt-js/#L366" sourceLabel="AWT.js:366" />

The font _italic_ value

<MemberHeading id="variant" depth="3" name="variant" sig="variant: string" />

<MemberMeta sourceHref="/source/awt-js/#L371" sourceLabel="AWT.js:371" />

The font _variant_ value

## Static Fields

<MemberHeading id="alreadycalculatedfonts" depth="3" name="ALREADY_CALCULATED_FONTS" sig="ALREADY_CALCULATED_FONTS" />

<MemberMeta badges="static" sourceHref="/source/awt-js/#L303" sourceLabel="AWT.js:303" />

Array of font objects with already calculated heights

<MemberHeading id="alreadyloadedfonts" depth="3" name="ALREADY_LOADED_FONTS" sig="ALREADY_LOADED_FONTS" />

<MemberMeta badges="static" sourceHref="/source/awt-js/#L308" sourceLabel="AWT.js:308" />

Array of font names already loaded from Google Fonts, or generic names provided by browsers by default\
See: https\://developer.mozilla.org/en-US/docs/Web/CSS/font-family

<MemberHeading id="substitutions" depth="3" name="SUBSTITUTIONS" sig="SUBSTITUTIONS" />

<MemberMeta badges="static" sourceHref="/source/awt-js/#L318" sourceLabel="AWT.js:318" />

Google Fonts equivalent for special fonts used in some JClic projects.\
More substitutions can be added to the list for specific projects indicating a\
`fontSubstitutions` object in the `data-options` attribute of the HTML `div` element\
containing the player.\
For example:\
`<div class ="JClic" data-project="demo.jclic" data-options='{"fontSubstitutions":{"arial":"Arimo"}}'/>`

<MemberHeading id="googlefonts" depth="3" name="GOOGLEFONTS" sig="GOOGLEFONTS" />

<MemberMeta badges="static" sourceHref="/source/awt-js/#L341" sourceLabel="AWT.js:341" />

Google Fonts currently used in substitutions
