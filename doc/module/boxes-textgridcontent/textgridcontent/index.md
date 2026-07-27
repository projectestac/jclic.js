---
title: TextGridContent
kind: class
longname: module:boxes/TextGridContent.TextGridContent
description: This class encapsulates the content of {@link module:boxes/TextGrid.TextGrid TextGrid} objects. It implements methods to set and retrieve individual characters on the grid, and parsing of XML objects. It also contains information about the optimal size and other graphic properties (fonts, colors, etc.) of the grid.
---

# TextGridContent

<SourceLink href="/source/boxes/textgridcontent-js/#L43" label="TextGridContent.js:43" />

This class encapsulates the content of [TextGrid](/module/boxes-textgrid#textgrid) objects.

It implements methods to set and retrieve individual characters on the grid, and parsing of\
XML objects. It also contains information about the optimal size and other graphic properties\
(fonts, colors, etc.) of the grid.

---

## Constructor

<Signature code="new TextGridContent(): TextGridContent" />

TextGridContent constructor

---

## Instance Methods

<MemberHeading id="setproperties" depth="3" name="setProperties" sig="setProperties($xml: external:jQuery)" />

<MemberMeta sourceHref="/source/boxes/textgridcontent-js/#L56" sourceLabel="TextGridContent.js:56" />

Loads the object settings from a specific JQuery XML element

**Parameters**

- `$xml` ([external:jQuery](/module/utils#jquery))

<MemberHeading id="getattributes" depth="3" name="getAttributes" sig="getAttributes(): object" />

<MemberMeta sourceHref="/source/boxes/textgridcontent-js/#L103" sourceLabel="TextGridContent.js:103" />

Gets a object with the basic attributes needed to rebuild this instance excluding functions,\
parent references, constants and also attributes retaining the default value.\
The resulting object is commonly usued to serialize elements in JSON format.

**Returns**

- `object`

<MemberHeading
  id="setattributes"
  depth="3"
  name="setAttributes"
  sig="setAttributes(
	data: object | string,
): module:boxes/TextGridContent.TextGridContent"
/>

<MemberMeta sourceHref="/source/boxes/textgridcontent-js/#L120" sourceLabel="TextGridContent.js:120" />

Reads the properties of this TextGridContent from a data object

**Parameters**

- `data` (object | string) — The data object to be parsed, or just the text content

**Returns**

- [`module:boxes/TextGridContent.TextGridContent`](/module/boxes-textgridcontent#textgridcontent)

<MemberHeading id="countwildchars" depth="3" name="countWildChars" sig="countWildChars(): number" />

<MemberMeta sourceHref="/source/boxes/textgridcontent-js/#L136" sourceLabel="TextGridContent.js:136" />

Counts the number of wildcard characters present in this TextGrid

**Returns**

- `number`

<MemberHeading id="getnumchars" depth="3" name="getNumChars" sig="getNumChars(): number" />

<MemberMeta sourceHref="/source/boxes/textgridcontent-js/#L150" sourceLabel="TextGridContent.js:150" />

Counts the total number of characters, including wildcard characters.

**Returns**

- `number`

<MemberHeading id="setcharat" depth="3" name="setCharAt" sig="setCharAt(x: number, y: number, ch: string)" />

<MemberMeta sourceHref="/source/boxes/textgridcontent-js/#L160" sourceLabel="TextGridContent.js:160" />

Sets the specified character as a content of the cell located at specific coordinates

**Parameters**

- `x` (number) — The X coordinate of the cell
- `y` (number) — The X coordinate of the cell
- `ch` (string) — The character to be placed on the specified cell

## Instance Fields

<MemberHeading id="ncw" depth="3" name="ncw" sig="ncw: number" />

<MemberMeta sourceHref="/source/boxes/textgridcontent-js/#L171" sourceLabel="TextGridContent.js:171" />

Grid columns

<MemberHeading id="nch" depth="3" name="nch" sig="nch: number" />

<MemberMeta sourceHref="/source/boxes/textgridcontent-js/#L176" sourceLabel="TextGridContent.js:176" />

Grid rows

<MemberHeading id="w" depth="3" name="w" sig="w: number" />

<MemberMeta sourceHref="/source/boxes/textgridcontent-js/#L181" sourceLabel="TextGridContent.js:181" />

Width of cells

<MemberHeading id="h" depth="3" name="h" sig="h: number" />

<MemberMeta sourceHref="/source/boxes/textgridcontent-js/#L186" sourceLabel="TextGridContent.js:186" />

Height of cells

<MemberHeading id="border" depth="3" name="border" sig="border: boolean" />

<MemberMeta sourceHref="/source/boxes/textgridcontent-js/#L191" sourceLabel="TextGridContent.js:191" />

Whether the cells must be surrounded by a border or not

<MemberHeading id="style" depth="3" name="style" sig="style: module:boxes/BoxBase.BoxBase" />

<MemberMeta sourceHref="/source/boxes/textgridcontent-js/#L196" sourceLabel="TextGridContent.js:196" />

The [BoxBase](/module/boxes-boxbase#boxbase) object with visual settings of the text grid

<MemberHeading id="text" depth="3" name="text" sig="text: Array.<string>" />

<MemberMeta sourceHref="/source/boxes/textgridcontent-js/#L202" sourceLabel="TextGridContent.js:202" />

An array of String objects textning the chars of cells. One string per row, one character of\
this string per cell.

<MemberHeading id="wild" depth="3" name="wild" sig="wild: string" />

<MemberMeta sourceHref="/source/boxes/textgridcontent-js/#L207" sourceLabel="TextGridContent.js:207" />

The letter used as wildcardtext

<MemberHeading id="randomchars" depth="3" name="randomChars" sig="randomChars: string" />

<MemberMeta sourceHref="/source/boxes/textgridcontent-js/#L212" sourceLabel="TextGridContent.js:212" />

A String with the chars to take as source when randomly filling empty cells
