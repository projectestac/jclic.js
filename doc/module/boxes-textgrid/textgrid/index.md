---
title: TextGrid
kind: class
longname: module:boxes/TextGrid.TextGrid
description: This class is a special type of {@link module:boxes/AbstractBox.AbstractBox AbstractBox} that displays a grid of single characters. It's used {@link module:activities/textGrid/CrossWord.CrossWord CrossWord} and {@link module:activities/textGrid/WordSearch.WordSearch WordSearch} activities.
---

# TextGrid

**Extends:&#x20;**[`module:boxes/AbstractBox.AbstractBox`](/module/boxes-abstractbox#abstractbox)

<SourceLink href="/source/boxes/textgrid-js/#L67" label="TextGrid.js:67" />

This class is a special type of [AbstractBox](/module/boxes-abstractbox#abstractbox) that displays a grid of single\
characters.

It's used [CrossWord](/module/activities-textgrid-crossword#crossword) and [WordSearch](/module/activities-textgrid-wordsearch#wordsearch) activities.

---

## Constructor

<Signature
  code="new TextGrid(
	parent: module:boxes/AbstractBox.AbstractBox,
	container: module:AWT.Container,
	boxBase: module:boxes/BoxBase.BoxBase,
	x: number,
	y: number,
	ncw: number,
	nch: number,
	cellW: number,
	cellH: number,
	border: boolean,
): TextGrid"
/>

TextGrid constructor

**Parameters**

- `parent` ([module:boxes/AbstractBox.AbstractBox](/module/boxes-abstractbox#abstractbox)) — The AbstractBox to which this text grid belongs
- `container` ([module:AWT.Container](/module/awt#container)) — The container where this text grid is placed.
- `boxBase` ([module:boxes/BoxBase.BoxBase](/module/boxes-boxbase#boxbase)) — The object where colors, fonts, border and other graphic properties
- `x` (number) — `X` coordinate of the upper left corner of this grid
- `y` (number) — `Y` coordinate of the upper left corner of this grid
- `ncw` (number) — Number of columns of the grid
- `nch` (number) — Nomber of rows of the grid
- `cellW` (number) — Width of the cells
- `cellH` (number) — Height of the cells
- `border` (boolean) — When `true`, a border must be drawn between the cells

---

## Instance Methods

<MemberHeading id="setchars" depth="3" name="setChars" sig="setChars(text: string)" />

<MemberMeta sourceHref="/source/boxes/textgrid-js/#L125" sourceLabel="TextGrid.js:125" />

Sets the characters to be placed in the cells of this TextGrid

**Parameters**

- `text` (string)

<MemberHeading id="randomize" depth="3" name="randomize" sig="randomize()" />

<MemberMeta sourceHref="/source/boxes/textgrid-js/#L147" sourceLabel="TextGrid.js:147" />

Substitutes the current content of all cells with wildcards with a randomly generated char.

- **See:**
  - TextGridContent#randomChars

<MemberHeading id="setcellattributes" depth="3" name="setCellAttributes" sig="setCellAttributes(lockWild: boolean, clearChars: boolean)" />

<MemberMeta sourceHref="/source/boxes/textgrid-js/#L161" sourceLabel="TextGrid.js:161" />

Clears or sets global attributes to all cells

**Parameters**

- `lockWild` (boolean) — When `true`, the wildcard cells will be marked with special\
  attributes (used in CrossWords to mark black cells)
- `clearChars` (boolean) — When `true`, the current content of cells will be erased.

<MemberHeading id="setcelllocked" depth="3" name="setCellLocked" sig="setCellLocked(px: number, py: number, locked: boolean)" />

<MemberMeta sourceHref="/source/boxes/textgrid-js/#L186" sourceLabel="TextGrid.js:186" />

Sets or unsets the `locked` properties (black cell) to a specific cell.

**Parameters**

- `px` (number) — The logical 'X' coordinate of the cell
- `py` (number) — The logical 'Y' coordinate of the cell
- `locked` (boolean) — When true, the `locked` attribute will be on.

<MemberHeading id="getitemfor" depth="3" name="getItemFor" sig="getItemFor(rx: number, ry: number): module:AWT.Point" />

<MemberMeta sourceHref="/source/boxes/textgrid-js/#L210" sourceLabel="TextGrid.js:210" />

For a specific cell located at column `rx` and row `ry`, finds the number of words delimited\
by wildchars located behind its current position and in the same row and column. Used in\
[CrossWord](/module/activities-textgrid-crossword#crossword) activities to find the definition for a specific cell.

The result is returned as 'x' and 'y' properties of a logical point.

**Parameters**

- `rx` (number) — The 'X' position of the cell
- `ry` (number) — The 'Y' position of the cell

**Returns**

- [`module:AWT.Point`](/module/awt#point)

<MemberHeading id="setcursorenabled" depth="3" name="setCursorEnabled" sig="setCursorEnabled(status: boolean)" />

<MemberMeta sourceHref="/source/boxes/textgrid-js/#L252" sourceLabel="TextGrid.js:252" />

Whether the blinking cursor must be enabled or disabled.

**Parameters**

- `status` (boolean)

<MemberHeading id="startcursorblink" depth="3" name="startCursorBlink" sig="startCursorBlink()" />

<MemberMeta sourceHref="/source/boxes/textgrid-js/#L263" sourceLabel="TextGrid.js:263" />

Starts the [module:AWT.Timer](/module/awt#timer) that makes the cursor blink.

<MemberHeading id="stopcursorblink" depth="3" name="stopCursorBlink" sig="stopCursorBlink()" />

<MemberMeta sourceHref="/source/boxes/textgrid-js/#L273" sourceLabel="TextGrid.js:273" />

Stops the [module:AWT.Timer](/module/awt#timer) that makes the cursor blink.

<MemberHeading id="movecursor" depth="3" name="moveCursor" sig="moveCursor(dx: number, dy: number, skipLocked: boolean)" />

<MemberMeta sourceHref="/source/boxes/textgrid-js/#L286" sourceLabel="TextGrid.js:286" />

Moves the cursor in the specified x and y directions.

**Parameters**

- `dx` (number) — Amount to move in the 'X' axis
- `dy` (number) — Amount to move in the 'Y' axis
- `skipLocked` (boolean) — Skip locked cells (wildcards in [CrossWord](/module/activities-textgrid-crossword#crossword))

<MemberHeading
  id="findfreecell"
  depth="3"
  name="findFreeCell"
  sig="findFreeCell(
	from: module:AWT.Point,
	dx: number,
	dy: number,
): module:AWT.Point"
/>

<MemberMeta sourceHref="/source/boxes/textgrid-js/#L305" sourceLabel="TextGrid.js:305" />

Finds the coordinates of the nearest non-locked cell (non-wildcard) moving on the indicated\
'X' and 'Y' directions.

**Parameters**

- `from` ([module:AWT.Point](/module/awt#point)) — Logical coordinates of the starting point
- `dx` (number) — 0 means no movement, 1 go right, -1 go left.
- `dy` (number) — 0 means no movement, 1 go down, -1 go up.

**Returns**

- [`module:AWT.Point`](/module/awt#point)

<MemberHeading
  id="findnextcellwithattr"
  depth="3"
  name="findNextCellWithAttr"
  sig="findNextCellWithAttr(
	startX: number,
	startY: number,
	attr: number,
	dx: number,
	dy: number,
	attrState: boolean,
): module:AWT.Point"
/>

<MemberMeta sourceHref="/source/boxes/textgrid-js/#L332" sourceLabel="TextGrid.js:332" />

Finds the first cell with the specified attributes at the specified state, starting\
at specified point.

**Parameters**

- `startX` (number) — Starting X coordinate
- `startY` (number) — Starting Y coordinate
- `attr` (number) — Attribute to check. See [module:boxes/TextGrid.TextGrid.flags](/module/boxes-textgrid/textgrid#flags).
- `dx` (number) — 0 means no movement, 1 go right, -1 go left.
- `dy` (number) — 0 means no movement, 1 go down, -1 go up.
- `attrState` (boolean) — Desired state (enabled or disabled) of `attr`

**Returns**

- [`module:AWT.Point`](/module/awt#point)

<MemberHeading id="setcursorat" depth="3" name="setCursorAt" sig="setCursorAt(px: number, py: number, skipLocked: boolean)" />

<MemberMeta sourceHref="/source/boxes/textgrid-js/#L376" sourceLabel="TextGrid.js:376" />

Sets the blinking cursor at a specific point

**Parameters**

- `px` (number) — X coordinate
- `py` (number) — Y coordinate
- `skipLocked` (boolean) — Skip locked (wildcard) cells

<MemberHeading id="setusecursor" depth="3" name="setUseCursor" sig="setUseCursor(value: boolean)" />

<MemberMeta sourceHref="/source/boxes/textgrid-js/#L395" sourceLabel="TextGrid.js:395" />

Sets the `useCursor` property of this text grid

**Parameters**

- `value` (boolean)

<MemberHeading id="getcursor" depth="3" name="getCursor" sig="getCursor(): module:AWT.Point" />

<MemberMeta sourceHref="/source/boxes/textgrid-js/#L403" sourceLabel="TextGrid.js:403" />

Gets the current position of the blinking cursor

**Returns**

- [`module:AWT.Point`](/module/awt#point)

<MemberHeading id="countcharslike" depth="3" name="countCharsLike" sig="countCharsLike(ch: string): number" />

<MemberMeta sourceHref="/source/boxes/textgrid-js/#L412" sourceLabel="TextGrid.js:412" />

Counts the number of cells of this grid with the specified character

**Parameters**

- `ch` (string)

**Returns**

- `number`

<MemberHeading id="getnumcells" depth="3" name="getNumCells" sig="getNumCells(): number" />

<MemberMeta sourceHref="/source/boxes/textgrid-js/#L425" sourceLabel="TextGrid.js:425" />

Gets the number of cells of this grid

**Returns**

- `number`

<MemberHeading id="countcoincidences" depth="3" name="countCoincidences" sig="countCoincidences(checkCase: boolean): number" />

<MemberMeta sourceHref="/source/boxes/textgrid-js/#L434" sourceLabel="TextGrid.js:434" />

Counts the number of coincidences between the `answers` array and the current content of this grid

**Parameters**

- `checkCase` (boolean) — Make comparisions case-sensitive

**Returns**

- `number`

<MemberHeading id="iscellok" depth="3" name="isCellOk" sig="isCellOk(px: number, py: number, checkCase: boolean): boolean" />

<MemberMeta sourceHref="/source/boxes/textgrid-js/#L451" sourceLabel="TextGrid.js:451" />

Checks if a specific cell is equivalent to the content of `answers` at its position

**Parameters**

- `px` (number) — X coordinate
- `py` (number) — Y coordinate
- `checkCase` (boolean) — Make comparisions case-sensitive

**Returns**

- `boolean`

<MemberHeading
  id="getlogicalcoords"
  depth="3"
  name="getLogicalCoords"
  sig="getLogicalCoords(
	devicePoint: module:AWT.Point,
): module:AWT.Point"
/>

<MemberMeta sourceHref="/source/boxes/textgrid-js/#L470" sourceLabel="TextGrid.js:470" />

Gets the logical coordinates (in 'cell' units) of a device point into the grid

**Parameters**

- `devicePoint` ([module:AWT.Point](/module/awt#point))

**Returns**

- [`module:AWT.Point`](/module/awt#point)

<MemberHeading id="isvalidcell" depth="3" name="isValidCell" sig="isValidCell(px: number, py: number): boolean" />

<MemberMeta sourceHref="/source/boxes/textgrid-js/#L486" sourceLabel="TextGrid.js:486" />

Checks if the specified logical coordinates are inside the valid bounds of the grid.

**Parameters**

- `px` (number) — 'X' coordinate
- `py` (number) — 'Y' coordinate

**Returns**

- `boolean`

<MemberHeading id="setcharat" depth="3" name="setCharAt" sig="setCharAt(px: number, py: number, ch: string)" />

<MemberMeta sourceHref="/source/boxes/textgrid-js/#L496" sourceLabel="TextGrid.js:496" />

Sets the specified character as a content of the cell at specified coordinates

**Parameters**

- `px` (number) — 'X' coordinate
- `py` (number) — 'Y' coordinate
- `ch` (string) — The character to set.

<MemberHeading id="getcharat" depth="3" name="getCharAt" sig="getCharAt(px: number, py: number): string" />

<MemberMeta sourceHref="/source/boxes/textgrid-js/#L509" sourceLabel="TextGrid.js:509" />

Gets the character of the cell at the specified coordinates

**Parameters**

- `px` (number) — 'X' coordinate
- `py` (number) — 'Y' coordinate

**Returns**

- `string`

<MemberHeading
  id="getstringbetween"
  depth="3"
  name="getStringBetween"
  sig="getStringBetween(
	x0: number,
	y0: number,
	x1: number,
	y1: number,
): string"
/>

<MemberMeta sourceHref="/source/boxes/textgrid-js/#L523" sourceLabel="TextGrid.js:523" />

Gets the text formed by the letters between two cells that share a straight line on the grid.\
The text can be formed horizontally, vertically and diagonal, both in left-to-right or\
right-to-left direction.

**Parameters**

- `x0` (number) — 'X' coordinate of the first cell
- `y0` (number) — 'Y' coordinate of the first cell
- `x1` (number) — 'X' coordinate of the second cell
- `y1` (number) — 'Y' coordinate of the second cell

**Returns**

- `string`

<MemberHeading
  id="setattributebetween"
  depth="3"
  name="setAttributeBetween"
  sig="setAttributeBetween(
	x0: number,
	y0: number,
	x1: number,
	y1: number,
	attribute: number,
	value: boolean,
)"
/>

<MemberMeta sourceHref="/source/boxes/textgrid-js/#L551" sourceLabel="TextGrid.js:551" />

Sets a specific attribute to all cells forming a straight line between two cells on the grid.

**Parameters**

- `x0` (number) — 'X' coordinate of the first cell
- `y0` (number) — 'Y' coordinate of the first cell
- `x1` (number) — 'X' coordinate of the second cell
- `y1` (number) — 'Y' coordinate of the second cell
- `attribute` (number) — The binary flag representing this attribute. See [module:boxes/TextGrid.TextGrid.flags](/module/boxes-textgrid/textgrid#flags).
- `value` (boolean) — Whether to set or unset the attribute.

<MemberHeading
  id="setattribute"
  depth="3"
  name="setAttribute"
  sig="setAttribute(
	px: number,
	py: number,
	attribute: number,
	state: boolean,
)"
/>

<MemberMeta sourceHref="/source/boxes/textgrid-js/#L576" sourceLabel="TextGrid.js:576" />

Sets or unsets a specifi attrobut to a cell.

**Parameters**

- `px` (number) — The 'X' coordinate of the cell
- `py` (number) — The 'Y' coordinate of the cell
- `attribute` (number) — The binary flag representing this attribute. See [module:boxes/TextGrid.TextGrid.flags](/module/boxes-textgrid/textgrid#flags).
- `state` (boolean) — Whether to set or unset the attribute.

<MemberHeading id="setallcellsattribute" depth="3" name="setAllCellsAttribute" sig="setAllCellsAttribute(attribute: number, state: boolean)" />

<MemberMeta sourceHref="/source/boxes/textgrid-js/#L592" sourceLabel="TextGrid.js:592" />

Sets the specified attribute to all cells.

**Parameters**

- `attribute` (number) — The binary flag representing this attribute. See [module:boxes/TextGrid.TextGrid.flags](/module/boxes-textgrid/textgrid#flags).
- `state` (boolean) — Whether to set or unset the attribute.

<MemberHeading
  id="getcellattribute"
  depth="3"
  name="getCellAttribute"
  sig="getCellAttribute(
	px: number,
	py: number,
	attribute: number,
): boolean"
/>

<MemberMeta sourceHref="/source/boxes/textgrid-js/#L605" sourceLabel="TextGrid.js:605" />

Gets the specified attribute of a cell

**Parameters**

- `px` (number) — The 'X' coordinate of the cell
- `py` (number) — The 'Y' coordinate of the cell
- `attribute` (number) — The binary flag representing this attribute. See [module:boxes/TextGrid.TextGrid.flags](/module/boxes-textgrid/textgrid#flags).

**Returns**

- `boolean`

<MemberHeading id="getcellrect" depth="3" name="getCellRect" sig="getCellRect(px: number, py: number): module:AWT.Rectangle" />

<MemberMeta sourceHref="/source/boxes/textgrid-js/#L615" sourceLabel="TextGrid.js:615" />

Gets the rectangle enclosing a specific cell

**Parameters**

- `px` (number) — The 'X' coordinate of the cell
- `py` (number) — The 'Y' coordinate of the cell

**Returns**

- [`module:AWT.Rectangle`](/module/awt#rectangle)

<MemberHeading
  id="getcellborderbounds"
  depth="3"
  name="getCellBorderBounds"
  sig="getCellBorderBounds(
	px: number,
	py: number,
): module:AWT.Rectangle"
/>

<MemberMeta sourceHref="/source/boxes/textgrid-js/#L625" sourceLabel="TextGrid.js:625" />

Gets the rectangle enclosing a specific cell, including the border thick.

**Parameters**

- `px` (number) — The 'X' coordinate of the cell
- `py` (number) — The 'Y' coordinate of the cell

**Returns**

- [`module:AWT.Rectangle`](/module/awt#rectangle)

<MemberHeading id="repaintcell" depth="3" name="repaintCell" sig="repaintCell(px: number, py: number)" />

<MemberMeta sourceHref="/source/boxes/textgrid-js/#L642" sourceLabel="TextGrid.js:642" />

Repaints a cell

**Parameters**

- `px` (number) — The 'X' coordinate of the cell
- `py` (number) — The 'Y' coordinate of the cell

<MemberHeading id="getpreferredsize" depth="3" name="getPreferredSize" sig="getPreferredSize(): module:AWT.Dimension" />

<MemberMeta sourceHref="/source/boxes/textgrid-js/#L651" sourceLabel="TextGrid.js:651" />

Gets the preferred size of this grid

**Returns**

- [`module:AWT.Dimension`](/module/awt#dimension)

<MemberHeading id="getminimumsize" depth="3" name="getMinimumSize" sig="getMinimumSize(): module:AWT.Dimension" />

<MemberMeta sourceHref="/source/boxes/textgrid-js/#L659" sourceLabel="TextGrid.js:659" />

Gets the minimum size of this grid

**Returns**

- [`module:AWT.Dimension`](/module/awt#dimension)

<MemberHeading id="getscaledsize" depth="3" name="getScaledSize" sig="getScaledSize(scale: number): module:AWT.Dimension" />

<MemberMeta sourceHref="/source/boxes/textgrid-js/#L668" sourceLabel="TextGrid.js:668" />

Scales the grid to a new size

**Parameters**

- `scale` (number) — The factor used to multiply all coordinates and sizes

**Returns**

- [`module:AWT.Dimension`](/module/awt#dimension)

<MemberHeading
  id="setbounds"
  depth="3"
  name="setBounds"
  sig="setBounds(
	rect: AWT.Rectangle | number,
	y?: number,
	w?: number,
	h?: number,
)"
/>

<MemberMeta sourceHref="/source/boxes/textgrid-js/#L683" sourceLabel="TextGrid.js:683" />

Overrides [module:boxes/AbstractBox.AbstractBox#setBounds](/module/boxes-abstractbox/abstractbox#setbounds)

**Parameters**

- `rect` ([AWT.Rectangle](/module/awt#rectangle) | number) — An AWT.Rectangle object, or the `x` coordinate of the\
  upper-left corner of a new rectangle.
- `y` (number, optional) — `y` coordinate of the upper-left corner of the new rectangle.
- `w` (number, optional) — Width of the new rectangle.
- `h` (number, optional) — Height of the new rectangle.

<MemberHeading
  id="updatecontent"
  depth="3"
  name="updateContent"
  sig="updateContent(
	ctx: external:CanvasRenderingContext2D,
	dirtyRegion?: module:AWT.Rectangle,
)"
/>

<MemberMeta sourceHref="/source/boxes/textgrid-js/#L696" sourceLabel="TextGrid.js:696" />

Overrides [module:boxes/AbstractBox.AbstractBox#updateContent](/module/boxes-abstractbox/abstractbox#updatecontent)

**Parameters**

- `ctx` ([external:CanvasRenderingContext2D](/module/utils#canvasrenderingcontext2d)) — The canvas rendering context used to draw the\
  grid.
- `dirtyRegion` ([module:AWT.Rectangle](/module/awt#rectangle), optional) — The area that must be repainted. `null` refers to the whole box.

<MemberHeading id="blink" depth="3" name="blink" sig="blink(status: boolean)" />

<MemberMeta sourceHref="/source/boxes/textgrid-js/#L769" sourceLabel="TextGrid.js:769" />

Makes the cursor blink, alternating between two states. This method should be called only by\
[module:boxes/TextGrid.TextGrid#cursorTimer](/module/boxes-textgrid/textgrid#cursortimer)

**Parameters**

- `status` (boolean)

<MemberHeading id="end" depth="3" name="end" sig="end()" />

<MemberMeta sourceHref="/source/boxes/textgrid-js/#L780" sourceLabel="TextGrid.js:780" />

**Overrides:&#x20;**`module:boxes/AbstractBox.AbstractBox#end`

Stops the cursor timer if not `null` and active

<MemberHeading id="setparent" depth="3" name="setParent" sig="setParent(parent: module:boxes/AbstractBox.AbstractBox)" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L67" sourceLabel="AbstractBox.js:67" />

_Inherited from `module:boxes/AbstractBox.AbstractBox#setParent`_

**Overrides:&#x20;**`module:boxes/AbstractBox.AbstractBox#setParent`

Setter method for `parent`

**Parameters**

- `parent` ([module:boxes/AbstractBox.AbstractBox](/module/boxes-abstractbox#abstractbox)) — The new parent of this box

<MemberHeading id="getparent" depth="3" name="getParent" sig="getParent(): module:boxes/AbstractBox.AbstractBox" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L75" sourceLabel="AbstractBox.js:75" />

_Inherited from `module:boxes/AbstractBox.AbstractBox#getParent`_

**Overrides:&#x20;**`module:boxes/AbstractBox.AbstractBox#getParent`

Gets the current parent of this box

**Returns**

- [`module:boxes/AbstractBox.AbstractBox`](/module/boxes-abstractbox#abstractbox)

<MemberHeading id="setcontainer" depth="3" name="setContainer" sig="setContainer(newContainer: module:AWT.Container)" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L89" sourceLabel="AbstractBox.js:89" />

_Inherited from `module:boxes/AbstractBox.AbstractBox#setContainer`_

**Overrides:&#x20;**`module:boxes/AbstractBox.AbstractBox#setContainer`

Setter method for `container`

**Parameters**

- `newContainer` ([module:AWT.Container](/module/awt#container)) — The new Container assigned to this box

<MemberHeading id="getcontainerx" depth="3" name="getContainerX" sig="getContainerX(): module:AWT.Container" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L101" sourceLabel="AbstractBox.js:101" />

_Inherited from `module:boxes/AbstractBox.AbstractBox#getContainerX`_

**Overrides:&#x20;**`module:boxes/AbstractBox.AbstractBox#getContainerX`

Gets the `container` attribute of this box, without checking its parent

**Returns**

- [`module:AWT.Container`](/module/awt#container)

<MemberHeading id="getcontainerresolve" depth="3" name="getContainerResolve" sig="getContainerResolve(): module:AWT.Container" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L109" sourceLabel="AbstractBox.js:109" />

_Inherited from `module:boxes/AbstractBox.AbstractBox#getContainerResolve`_

**Overrides:&#x20;**`module:boxes/AbstractBox.AbstractBox#getContainerResolve`

Gets the container associated to this box, asking its parents when `null`.

**Returns**

- [`module:AWT.Container`](/module/awt#container)

<MemberHeading id="invalidate" depth="3" name="invalidate" sig="invalidate(rect: module:AWT.Rectangle)" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L121" sourceLabel="AbstractBox.js:121" />

_Inherited from `module:boxes/AbstractBox.AbstractBox#invalidate`_

**Overrides:&#x20;**`module:boxes/AbstractBox.AbstractBox#invalidate`

Invalidates the zone corresponding to this box in the associated [module:AWT.Container](/module/awt#container), if any.

**Parameters**

- `rect` ([module:AWT.Rectangle](/module/awt#rectangle)) — The rectangle to be invalidated. When `null`, it's the full\
  container area.

<MemberHeading id="setboxbase" depth="3" name="setBoxBase" sig="setBoxBase(boxBase: module:boxes/BoxBase.BoxBase)" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L131" sourceLabel="AbstractBox.js:131" />

_Inherited from `module:boxes/AbstractBox.AbstractBox#setBoxBase`_

**Overrides:&#x20;**`module:boxes/AbstractBox.AbstractBox#setBoxBase`

Sets the [BoxBase](/module/boxes-boxbase#boxbase) of this box

**Parameters**

- `boxBase` ([module:boxes/BoxBase.BoxBase](/module/boxes-boxbase#boxbase)) — The new BoxBase

<MemberHeading id="getboxbaseresolve" depth="3" name="getBoxBaseResolve" sig="getBoxBaseResolve(): module:boxes/BoxBase.BoxBase" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L140" sourceLabel="AbstractBox.js:140" />

_Inherited from `module:boxes/AbstractBox.AbstractBox#getBoxBaseResolve`_

**Overrides:&#x20;**`module:boxes/AbstractBox.AbstractBox#getBoxBaseResolve`

Gets the real [BoxBase](/module/boxes-boxbase#boxbase) associated to this box, scanning down parent relationships.

**Returns**

- [`module:boxes/BoxBase.BoxBase`](/module/boxes-boxbase#boxbase)

<MemberHeading id="setshape" depth="3" name="setShape" sig="setShape(sh: module:AWT.Shape)" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L151" sourceLabel="AbstractBox.js:151" />

_Inherited from `module:boxes/AbstractBox.AbstractBox#setShape`_

**Overrides:&#x20;**`module:boxes/AbstractBox.AbstractBox#setShape`

Sets the shape used to draw the content of this box

**Parameters**

- `sh` ([module:AWT.Shape](/module/awt#shape)) — The shape to be set

<MemberHeading id="getshape" depth="3" name="getShape" sig="getShape(): module:AWT.Shape" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L163" sourceLabel="AbstractBox.js:163" />

_Inherited from `module:boxes/AbstractBox.AbstractBox#getShape`_

**Overrides:&#x20;**`module:boxes/AbstractBox.AbstractBox#getShape`

Gets the current shape used in this box

**Returns**

- [`module:AWT.Shape`](/module/awt#shape)

<MemberHeading id="contains" depth="3" name="contains" sig="contains(p: module:AWT.Point): boolean" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L173" sourceLabel="AbstractBox.js:173" />

_Inherited from `module:boxes/AbstractBox.AbstractBox#contains`_

Check if this box contains the specified point

**Parameters**

- `p` ([module:AWT.Point](/module/awt#point)) — The point to be checked

**Returns**

- `boolean`

<MemberHeading
  id="setbounds"
  depth="3"
  name="setBounds"
  sig="setBounds(
	rect: AWT.Rectangle | number,
	y?: number,
	w?: number,
	h?: number,
): module:AWT.Rectangle"
/>

<MemberMeta sourceHref="/source/boxes/textgrid-js/#L683" sourceLabel="TextGrid.js:683" />

_Inherited from `module:boxes/TextGrid.TextGrid#setBounds`_

**Overrides:&#x20;**`module:boxes/AbstractBox.AbstractBox#setBounds`

Overrides [module:boxes/AbstractBox.AbstractBox#setBounds](/module/boxes-abstractbox/abstractbox#setbounds)

**Parameters**

- `rect` ([AWT.Rectangle](/module/awt#rectangle) | number) — An AWT.Rectangle object, or the `x` coordinate of the\
  upper-left corner of a new rectangle.
- `y` (number, optional) — `y` coordinate of the upper-left corner of the new rectangle.
- `w` (number, optional) — Width of the new rectangle.
- `h` (number, optional) — Height of the new rectangle.

**Returns**

- [`module:AWT.Rectangle`](/module/awt#rectangle)

<MemberHeading id="moveto" depth="3" name="moveTo" sig="moveTo(newPos: AWT.Point | number, y?: number)" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L218" sourceLabel="AbstractBox.js:218" />

_Inherited from `module:boxes/AbstractBox.AbstractBox#moveTo`_

**Overrides:&#x20;**`module:boxes/AbstractBox.AbstractBox#moveTo`

Sets a new location for this box. In JClic this method was named `setLocation`

**Parameters**

- `newPos` ([AWT.Point](/module/awt#point) | number) — A point or the `x` coordinate of a new point.
- `y` (number, optional) — The `y` coordinate of a new point.

<MemberHeading id="moveby" depth="3" name="moveBy" sig="moveBy(dx: number, dy: number)" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L229" sourceLabel="AbstractBox.js:229" />

_Inherited from `module:boxes/AbstractBox.AbstractBox#moveBy`_

**Overrides:&#x20;**`module:boxes/AbstractBox.AbstractBox#moveBy`

Sets a new location to this box. In JClic this method was named `translate`.

**Parameters**

- `dx` (number) — The displacement on the X axis
- `dy` (number) — The displacement on the Y axis

<MemberHeading id="setsize" depth="3" name="setSize" sig="setSize(width: number, height: number)" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L238" sourceLabel="AbstractBox.js:238" />

_Inherited from `module:boxes/AbstractBox.AbstractBox#setSize`_

**Overrides:&#x20;**`module:boxes/AbstractBox.AbstractBox#setSize`

Changes the size of this box

**Parameters**

- `width` (number)
- `height` (number)

<MemberHeading id="hasborder" depth="3" name="hasBorder" sig="hasBorder(): boolean" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L246" sourceLabel="AbstractBox.js:246" />

_Inherited from `module:boxes/AbstractBox.AbstractBox#hasBorder`_

**Overrides:&#x20;**`module:boxes/AbstractBox.AbstractBox#hasBorder`

Checks if this box has border

**Returns**

- `boolean`

<MemberHeading id="setborder" depth="3" name="setBorder" sig="setBorder(newVal: boolean)" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L254" sourceLabel="AbstractBox.js:254" />

_Inherited from `module:boxes/AbstractBox.AbstractBox#setBorder`_

**Overrides:&#x20;**`module:boxes/AbstractBox.AbstractBox#setBorder`

Sets/unsets a border to this box

**Parameters**

- `newVal` (boolean) — `true` to set a border.

<MemberHeading id="isvisible" depth="3" name="isVisible" sig="isVisible(): boolean" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L266" sourceLabel="AbstractBox.js:266" />

_Inherited from `module:boxes/AbstractBox.AbstractBox#isVisible`_

**Overrides:&#x20;**`module:boxes/AbstractBox.AbstractBox#isVisible`

Checks if this box is fully visible

**Returns**

- `boolean`

<MemberHeading id="setvisible" depth="3" name="setVisible" sig="setVisible(newVal: boolean)" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L274" sourceLabel="AbstractBox.js:274" />

_Inherited from `module:boxes/AbstractBox.AbstractBox#setVisible`_

**Overrides:&#x20;**`module:boxes/AbstractBox.AbstractBox#setVisible`

Sets this box visible or invisible

**Parameters**

- `newVal` (boolean) — `true` for visible

<MemberHeading id="sethostedcomponentvisible" depth="3" name="setHostedComponentVisible" sig="setHostedComponentVisible()" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L284" sourceLabel="AbstractBox.js:284" />

_Inherited from `module:boxes/AbstractBox.AbstractBox#setHostedComponentVisible`_

**Overrides:&#x20;**`module:boxes/AbstractBox.AbstractBox#setHostedComponentVisible`

Makes [module:boxes/AbstractBox.AbstractBox#$hostedComponent](/module/boxes-abstractbox/abstractbox#hostedcomponent) visible or invisible, based on the value of\
the AbstractBox `visible` flag.

<MemberHeading id="istemporaryhidden" depth="3" name="isTemporaryHidden" sig="isTemporaryHidden(): boolean" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L293" sourceLabel="AbstractBox.js:293" />

_Inherited from `module:boxes/AbstractBox.AbstractBox#isTemporaryHidden`_

**Overrides:&#x20;**`module:boxes/AbstractBox.AbstractBox#isTemporaryHidden`

Checks if this box is temporary hidden

**Returns**

- `boolean`

<MemberHeading id="settemporaryhidden" depth="3" name="setTemporaryHidden" sig="setTemporaryHidden(newVal: boolean)" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L301" sourceLabel="AbstractBox.js:301" />

_Inherited from `module:boxes/AbstractBox.AbstractBox#setTemporaryHidden`_

**Overrides:&#x20;**`module:boxes/AbstractBox.AbstractBox#setTemporaryHidden`

Makes this box temporary hidden (newVal `true`) or resets its original state (newVal `false`)

**Parameters**

- `newVal` (boolean)

<MemberHeading id="isinactive" depth="3" name="isInactive" sig="isInactive(): boolean" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L309" sourceLabel="AbstractBox.js:309" />

_Inherited from `module:boxes/AbstractBox.AbstractBox#isInactive`_

**Overrides:&#x20;**`module:boxes/AbstractBox.AbstractBox#isInactive`

Checks if this box is currently inactive.

**Returns**

- `boolean`

<MemberHeading id="setinactive" depth="3" name="setInactive" sig="setInactive(newVal: boolean)" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L317" sourceLabel="AbstractBox.js:317" />

_Inherited from `module:boxes/AbstractBox.AbstractBox#setInactive`_

**Overrides:&#x20;**`module:boxes/AbstractBox.AbstractBox#setInactive`

Makes this box active (`false`) or inactive (`true`)

**Parameters**

- `newVal` (boolean)

<MemberHeading id="isinverted" depth="3" name="isInverted" sig="isInverted(): boolean" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L338" sourceLabel="AbstractBox.js:338" />

_Inherited from `module:boxes/AbstractBox.AbstractBox#isInverted`_

**Overrides:&#x20;**`module:boxes/AbstractBox.AbstractBox#isInverted`

Checks if this box is in `inverted` state.

**Returns**

- `boolean`

<MemberHeading id="setinverted" depth="3" name="setInverted" sig="setInverted(newVal: boolean)" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L347" sourceLabel="AbstractBox.js:347" />

_Inherited from `module:boxes/AbstractBox.AbstractBox#setInverted`_

**Overrides:&#x20;**`module:boxes/AbstractBox.AbstractBox#setInverted`

Puts this box in `inverted` mode or restores its original state.

**Parameters**

- `newVal` (boolean)

<MemberHeading id="ismarked" depth="3" name="isMarked" sig="isMarked(): boolean" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L359" sourceLabel="AbstractBox.js:359" />

_Inherited from `module:boxes/AbstractBox.AbstractBox#isMarked`_

**Overrides:&#x20;**`module:boxes/AbstractBox.AbstractBox#isMarked`

Checks if this box is `marked`

**Returns**

- `boolean`

<MemberHeading id="setmarked" depth="3" name="setMarked" sig="setMarked(newVal: boolean)" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L367" sourceLabel="AbstractBox.js:367" />

_Inherited from `module:boxes/AbstractBox.AbstractBox#setMarked`_

**Overrides:&#x20;**`module:boxes/AbstractBox.AbstractBox#setMarked`

Sets this box in `marked` mode, or restores its original state.

**Parameters**

- `newVal` (boolean)

<MemberHeading id="isfocused" depth="3" name="isFocused" sig="isFocused(): boolean" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L382" sourceLabel="AbstractBox.js:382" />

_Inherited from `module:boxes/AbstractBox.AbstractBox#isFocused`_

**Overrides:&#x20;**`module:boxes/AbstractBox.AbstractBox#isFocused`

Checks if this box has the input focus

**Returns**

- `boolean`

<MemberHeading id="setfocused" depth="3" name="setFocused" sig="setFocused(newVal: boolean)" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L391" sourceLabel="AbstractBox.js:391" />

_Inherited from `module:boxes/AbstractBox.AbstractBox#setFocused`_

**Overrides:&#x20;**`module:boxes/AbstractBox.AbstractBox#setFocused`

Sets or unsets the input focus to this box.

**Parameters**

- `newVal` (boolean)

<MemberHeading id="isalternative" depth="3" name="isAlternative" sig="isAlternative(): boolean" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L406" sourceLabel="AbstractBox.js:406" />

_Inherited from `module:boxes/AbstractBox.AbstractBox#isAlternative`_

**Overrides:&#x20;**`module:boxes/AbstractBox.AbstractBox#isAlternative`

Checks if this box is in `alternative` state.

**Returns**

- `boolean`

<MemberHeading id="setalternative" depth="3" name="setAlternative" sig="setAlternative(newVal: boolean)" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L414" sourceLabel="AbstractBox.js:414" />

_Inherited from `module:boxes/AbstractBox.AbstractBox#setAlternative`_

**Overrides:&#x20;**`module:boxes/AbstractBox.AbstractBox#setAlternative`

Sets this box in `alternative` mode, or restores its original state.

**Parameters**

- `newVal` (boolean)

<MemberHeading
  id="update"
  depth="3"
  name="update"
  sig="update(
	ctx: external:CanvasRenderingContext2D,
	dirtyRegion?: module:AWT.Rectangle,
)"
/>

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L427" sourceLabel="AbstractBox.js:427" />

_Inherited from `module:boxes/AbstractBox.AbstractBox#update`_

**Overrides:&#x20;**`module:boxes/AbstractBox.AbstractBox#update`

Draws the content of this box on an HTML `canvas` element. At this level, only background\
and border are painted/stroked. Derived classes should implement specific drawing tasks in\
[module:boxes/AbstractBox.AbstractBox#updateContent](/module/boxes-abstractbox/abstractbox#updatecontent).

**Parameters**

- `ctx` ([external:CanvasRenderingContext2D](/module/utils#canvasrenderingcontext2d)) — The canvas rendering context used to draw the\
  box content.
- `dirtyRegion` ([module:AWT.Rectangle](/module/awt#rectangle), optional, default: null) — The area that must be repainted. `null` refers to the whole box.

<MemberHeading
  id="updatecontent"
  depth="3"
  name="updateContent"
  sig="updateContent(
	ctx: external:CanvasRenderingContext2D,
	dirtyRegion?: module:AWT.Rectangle,
)"
/>

<MemberMeta sourceHref="/source/boxes/textgrid-js/#L696" sourceLabel="TextGrid.js:696" />

_Inherited from `module:boxes/TextGrid.TextGrid#updateContent`_

**Overrides:&#x20;**`module:boxes/AbstractBox.AbstractBox#updateContent`

Overrides [module:boxes/AbstractBox.AbstractBox#updateContent](/module/boxes-abstractbox/abstractbox#updatecontent)

**Parameters**

- `ctx` ([external:CanvasRenderingContext2D](/module/utils#canvasrenderingcontext2d)) — The canvas rendering context used to draw the\
  grid.
- `dirtyRegion` ([module:AWT.Rectangle](/module/awt#rectangle), optional) — The area that must be repainted. `null` refers to the whole box.

<MemberHeading id="drawborder" depth="3" name="drawBorder" sig="drawBorder(ctx: external:CanvasRenderingContext2D)" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L484" sourceLabel="AbstractBox.js:484" />

_Inherited from `module:boxes/AbstractBox.AbstractBox#drawBorder`_

**Overrides:&#x20;**`module:boxes/AbstractBox.AbstractBox#drawBorder`

Draws the box border

**Parameters**

- `ctx` ([external:CanvasRenderingContext2D](/module/utils#canvasrenderingcontext2d)) — The canvas rendering context where the border\
  will be drawn.

<MemberHeading id="getborderbounds" depth="3" name="getBorderBounds" sig="getBorderBounds(): module:AWT.Rectangle" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L509" sourceLabel="AbstractBox.js:509" />

_Inherited from `module:boxes/AbstractBox.AbstractBox#getBorderBounds`_

**Overrides:&#x20;**`module:boxes/AbstractBox.AbstractBox#getBorderBounds`

Returns the enclosing Rectangle of this box including its border (if any)

**Returns**

- [`module:AWT.Rectangle`](/module/awt#rectangle)

<MemberHeading id="sethostedcomponent" depth="3" name="setHostedComponent" sig="setHostedComponent($hc: external:jQuery)" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L525" sourceLabel="AbstractBox.js:525" />

_Inherited from `module:boxes/AbstractBox.AbstractBox#setHostedComponent`_

**Overrides:&#x20;**`module:boxes/AbstractBox.AbstractBox#setHostedComponent`

Sets the [$hostedComponent](/module/boxes-abstractbox/abstractbox#hostedcomponent) member.

**Parameters**

- `$hc` ([external:jQuery](/module/utils#jquery)) — The jQuery DOM component hosted by this box.

<MemberHeading id="gethostedcomponent" depth="3" name="getHostedComponent" sig="getHostedComponent(): external:jQuery" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L545" sourceLabel="AbstractBox.js:545" />

_Inherited from `module:boxes/AbstractBox.AbstractBox#getHostedComponent`_

**Overrides:&#x20;**`module:boxes/AbstractBox.AbstractBox#getHostedComponent`

Gets the current [$hostedComponent](/module/boxes-abstractbox/abstractbox#hostedcomponent) member

**Returns**

- [`external:jQuery`](/module/utils#jquery)

<MemberHeading id="sethostedcomponentcolors" depth="3" name="setHostedComponentColors" sig="setHostedComponentColors()" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L553" sourceLabel="AbstractBox.js:553" />

_Inherited from `module:boxes/AbstractBox.AbstractBox#setHostedComponentColors`_

**Overrides:&#x20;**`module:boxes/AbstractBox.AbstractBox#setHostedComponentColors`

Sets [$hostedComponent](/module/boxes-abstractbox/abstractbox#hostedcomponent) colors and other css properties\
based on the current [BoxBase](/module/boxes-boxbase#boxbase) of this box.

<MemberHeading id="sethostedcomponentborder" depth="3" name="setHostedComponentBorder" sig="setHostedComponentBorder()" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L568" sourceLabel="AbstractBox.js:568" />

_Inherited from `module:boxes/AbstractBox.AbstractBox#setHostedComponentBorder`_

**Overrides:&#x20;**`module:boxes/AbstractBox.AbstractBox#setHostedComponentBorder`

Sets the [$hostedComponent](/module/boxes-abstractbox/abstractbox#hostedcomponent) border, based on the current\
[BoxBase](/module/boxes-boxbase#boxbase) of this box.

<MemberHeading id="sethostedcomponentbounds" depth="3" name="setHostedComponentBounds" sig="setHostedComponentBounds(_sizeChanged: boolean)" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L584" sourceLabel="AbstractBox.js:584" />

_Inherited from `module:boxes/AbstractBox.AbstractBox#setHostedComponentBounds`_

**Overrides:&#x20;**`module:boxes/AbstractBox.AbstractBox#setHostedComponentBounds`

Places and resizes [$hostedComponent](/module/boxes-abstractbox/abstractbox#hostedcomponent), based on the size\
and position of this box.

**Parameters**

- `_sizeChanged` (boolean) — `true` when this [ActiveBox](/module/boxes-activebox#activebox) has changed its size

<MemberHeading id="getbounds" depth="3" name="getBounds" sig="getBounds(): module:AWT.Rectangle" />

<MemberMeta sourceHref="/source/awt-js/#L1081" sourceLabel="AWT.js:1081" />

_Inherited from `module:AWT.Rectangle#getBounds`_

**Overrides:&#x20;**`module:boxes/AbstractBox.AbstractBox#getBounds`

Gets the enclosing [Rectangle](/module/awt#rectangle) of this Shape.

**Returns**

- [`module:AWT.Rectangle`](/module/awt#rectangle)

<MemberHeading id="equals" depth="3" name="equals" sig="equals(r: module:AWT.Shape): boolean" />

<MemberMeta sourceHref="/source/awt-js/#L1105" sourceLabel="AWT.js:1105" />

_Inherited from `module:AWT.Rectangle#equals`_

**Overrides:&#x20;**`module:boxes/AbstractBox.AbstractBox#equals`

Checks if two shapes are equivalent.

**Parameters**

- `r` ([module:AWT.Shape](/module/awt#shape)) — The Shape to compare against

**Returns**

- `boolean`

<MemberHeading id="clone" depth="3" name="clone" sig="clone(): module:AWT.Rectangle" />

<MemberMeta sourceHref="/source/awt-js/#L1113" sourceLabel="AWT.js:1113" />

_Inherited from `module:AWT.Rectangle#clone`_

**Overrides:&#x20;**`module:boxes/AbstractBox.AbstractBox#clone`

Clones this Rectangle

**Returns**

- [`module:AWT.Rectangle`](/module/awt#rectangle)

<MemberHeading id="scaleby" depth="3" name="scaleBy" sig="scaleBy(delta: Point | Dimension): module:AWT.Rectangle" />

<MemberMeta sourceHref="/source/awt-js/#L1122" sourceLabel="AWT.js:1122" />

_Inherited from `module:AWT.Rectangle#scaleBy`_

**Overrides:&#x20;**`module:boxes/AbstractBox.AbstractBox#scaleBy`

Multiplies the dimension of the Shape by the specified `delta` amount.

**Parameters**

- `delta` ([Point](/module/awt#point) | [Dimension](/module/awt#dimension)) — Object containing the X and Y ratio to be scaled.

**Returns**

- [`module:AWT.Rectangle`](/module/awt#rectangle)

<MemberHeading id="grow" depth="3" name="grow" sig="grow(dx: number, dy: number): module:AWT.Rectangle" />

<MemberMeta sourceHref="/source/awt-js/#L1134" sourceLabel="AWT.js:1134" />

_Inherited from `module:AWT.Rectangle#grow`_

**Overrides:&#x20;**`module:boxes/AbstractBox.AbstractBox#grow`

Expands the boundaries of this shape. This affects the current position and dimension.

**Parameters**

- `dx` (number) — The amount to grow (or decrease) in horizontal direction
- `dy` (number) — The amount to grow (or decrease) in vertical direction

**Returns**

- [`module:AWT.Rectangle`](/module/awt#rectangle)

<MemberHeading id="getoppositevertex" depth="3" name="getOppositeVertex" sig="getOppositeVertex(): module:AWT.Point" />

<MemberMeta sourceHref="/source/awt-js/#L1146" sourceLabel="AWT.js:1146" />

_Inherited from `module:AWT.Rectangle#getOppositeVertex`_

**Overrides:&#x20;**`module:boxes/AbstractBox.AbstractBox#getOppositeVertex`

Gets the [module:AWT.Point](/module/awt#point) corresponding to the lower-right vertex of the Rectangle.

**Returns**

- [`module:AWT.Point`](/module/awt#point)

<MemberHeading id="add" depth="3" name="add" sig="add(shape: module:AWT.Shape): module:AWT.Rectangle" />

<MemberMeta sourceHref="/source/awt-js/#L1155" sourceLabel="AWT.js:1155" />

_Inherited from `module:AWT.Rectangle#add`_

**Overrides:&#x20;**`module:boxes/AbstractBox.AbstractBox#add`

Adds the boundaries of another shape to the current one

**Parameters**

- `shape` ([module:AWT.Shape](/module/awt#shape)) — The [module:AWT.Shape](/module/awt#shape) to be added

**Returns**

- [`module:AWT.Rectangle`](/module/awt#rectangle)

<MemberHeading id="getcoords" depth="3" name="getCoords" sig="getCoords(): string" />

<MemberMeta sourceHref="/source/awt-js/#L1222" sourceLabel="AWT.js:1222" />

_Inherited from `module:AWT.Rectangle#getCoords`_

**Overrides:&#x20;**`module:boxes/AbstractBox.AbstractBox#getCoords`

Gets a string with the co-ordinates of the upper-left and lower-right vertexs of this rectangle,\
(with values rounded to int)

**Returns**

- `string`

<MemberHeading id="getattributes" depth="3" name="getAttributes" sig="getAttributes(): object" />

<MemberMeta sourceHref="/source/awt-js/#L1232" sourceLabel="AWT.js:1232" />

_Inherited from `module:AWT.Rectangle#getAttributes`_

**Overrides:&#x20;**`module:boxes/AbstractBox.AbstractBox#getAttributes`

Gets a object with the basic attributes needed to rebuild this instance excluding functions,\
parent references, constants and also attributes retaining the default value.\
The resulting object is commonly usued to serialize elements in JSON format.

**Returns**

- `object`

<MemberHeading id="setattributes" depth="3" name="setAttributes" sig="setAttributes(data: object): module:AWT.Rectangle" />

<MemberMeta sourceHref="/source/awt-js/#L1241" sourceLabel="AWT.js:1241" />

_Inherited from `module:AWT.Rectangle#setAttributes`_

**Overrides:&#x20;**`module:boxes/AbstractBox.AbstractBox#setAttributes`

Reads the properties of this Rectangle from a data object

**Parameters**

- `data` (object) — The data object to be parsed

**Returns**

- [`module:AWT.Rectangle`](/module/awt#rectangle)

<MemberHeading id="intersects" depth="3" name="intersects" sig="intersects(_r: module:AWT.Rectangle): boolean" />

<MemberMeta sourceHref="/source/awt-js/#L902" sourceLabel="AWT.js:902" />

_Inherited from `module:AWT.Shape#intersects`_

**Overrides:&#x20;**`module:boxes/AbstractBox.AbstractBox#intersects`

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

**Overrides:&#x20;**`module:boxes/AbstractBox.AbstractBox#fill`

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

**Overrides:&#x20;**`module:boxes/AbstractBox.AbstractBox#stroke`

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

**Overrides:&#x20;**`module:boxes/AbstractBox.AbstractBox#preparePath`

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

**Overrides:&#x20;**`module:boxes/AbstractBox.AbstractBox#clip`

Creates a clipping region on the specified HTML canvas 2D rendering context

**Parameters**

- `ctx` ([external:CanvasRenderingContext2D](/module/utils#canvasrenderingcontext2d)) — The rendering context
- `fillRule` (string, optional, default: "'nonzero'") — Can be 'nonzero' (default when not set) or 'evenodd'

**Returns**

- [`external:CanvasRenderingContext2D`](/module/utils#canvasrenderingcontext2d)

<MemberHeading id="isrect" depth="3" name="isRect" sig="isRect(): boolean" />

<MemberMeta sourceHref="/source/awt-js/#L967" sourceLabel="AWT.js:967" />

_Inherited from `module:AWT.Shape#isRect`_

**Overrides:&#x20;**`module:boxes/AbstractBox.AbstractBox#isRect`

Shorthand method for determining if a Shape is an [Rectangle](/module/awt#rectangle)

**Returns**

- `boolean`

<MemberHeading id="tostring" depth="3" name="toString" sig="toString(): string" />

<MemberMeta sourceHref="/source/awt-js/#L975" sourceLabel="AWT.js:975" />

_Inherited from `module:AWT.Shape#toString`_

**Overrides:&#x20;**`module:boxes/AbstractBox.AbstractBox#toString`

Overwrites the original 'Object.toString' method with a more descriptive text

**Returns**

- `string`

<MemberHeading id="contains" depth="3" name="contains" sig="contains(p: module:AWT.Point): boolean" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L173" sourceLabel="AbstractBox.js:173" />

_Inherited from `module:boxes/AbstractBox.AbstractBox#contains`_

Check if this box contains the specified point

**Parameters**

- `p` ([module:AWT.Point](/module/awt#point)) — The point to be checked

**Returns**

- `boolean`

<MemberHeading
  id="setbounds"
  depth="3"
  name="setBounds"
  sig="setBounds(
	rect: AWT.Rectangle | number,
	y?: number,
	w?: number,
	h?: number,
): module:AWT.Rectangle"
/>

<MemberMeta sourceHref="/source/boxes/textgrid-js/#L683" sourceLabel="TextGrid.js:683" />

_Inherited from `module:boxes/TextGrid.TextGrid#setBounds`_

**Overrides:&#x20;**`module:boxes/AbstractBox.AbstractBox#setBounds`

Overrides [module:boxes/AbstractBox.AbstractBox#setBounds](/module/boxes-abstractbox/abstractbox#setbounds)

**Parameters**

- `rect` ([AWT.Rectangle](/module/awt#rectangle) | number) — An AWT.Rectangle object, or the `x` coordinate of the\
  upper-left corner of a new rectangle.
- `y` (number, optional) — `y` coordinate of the upper-left corner of the new rectangle.
- `w` (number, optional) — Width of the new rectangle.
- `h` (number, optional) — Height of the new rectangle.

**Returns**

- [`module:AWT.Rectangle`](/module/awt#rectangle)

<MemberHeading
  id="updatecontent"
  depth="3"
  name="updateContent"
  sig="updateContent(
	ctx: external:CanvasRenderingContext2D,
	dirtyRegion?: module:AWT.Rectangle,
)"
/>

<MemberMeta sourceHref="/source/boxes/textgrid-js/#L696" sourceLabel="TextGrid.js:696" />

_Inherited from `module:boxes/TextGrid.TextGrid#updateContent`_

**Overrides:&#x20;**`module:boxes/AbstractBox.AbstractBox#updateContent`

Overrides [module:boxes/AbstractBox.AbstractBox#updateContent](/module/boxes-abstractbox/abstractbox#updatecontent)

**Parameters**

- `ctx` ([external:CanvasRenderingContext2D](/module/utils#canvasrenderingcontext2d)) — The canvas rendering context used to draw the\
  grid.
- `dirtyRegion` ([module:AWT.Rectangle](/module/awt#rectangle), optional) — The area that must be repainted. `null` refers to the whole box.

## Static Methods

<MemberHeading
  id="createemptygrid"
  depth="3"
  name="createEmptyGrid"
  sig="createEmptyGrid(
	parent: module:boxes/AbstractBox.AbstractBox,
	container: module:AWT.Container,
	x: number,
	y: number,
	tgc: module:boxes/TextGridContent.TextGridContent,
	wildTransparent: boolean,
): module:boxes/TextGrid.TextGrid"
/>

<MemberMeta badges="static" sourceHref="/source/boxes/textgrid-js/#L112" sourceLabel="TextGrid.js:112" />

Factory constructor that creates an empty grid based on a [TextGridContent](/module/boxes-textgridcontent#textgridcontent)

**Parameters**

- `parent` ([module:boxes/AbstractBox.AbstractBox](/module/boxes-abstractbox#abstractbox)) — The AbstractBox to which the text grid belongs
- `container` ([module:AWT.Container](/module/awt#container)) — The container where the text grid will be placed.
- `x` (number) — `X` coordinate of the upper left corner of the grid
- `y` (number) — `Y` coordinate of the upper left corner of the grid
- `tgc` ([module:boxes/TextGridContent.TextGridContent](/module/boxes-textgridcontent#textgridcontent)) — Object with the content and other settings of the grid
- `wildTransparent` (boolean) — When `true`, the wildcard character will be transparent

**Returns**

- [`module:boxes/TextGrid.TextGrid`](/module/boxes-textgrid#textgrid)

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

<MemberHeading id="nrows" depth="3" name="nRows" sig="nRows: number" />

<MemberMeta sourceHref="/source/boxes/textgrid-js/#L793" sourceLabel="TextGrid.js:793" />

Number of rows

<MemberHeading id="ncols" depth="3" name="nCols" sig="nCols: number" />

<MemberMeta sourceHref="/source/boxes/textgrid-js/#L798" sourceLabel="TextGrid.js:798" />

Number of columns

<MemberHeading id="chars" depth="3" name="chars" sig="chars: Array.<Array.<string>>" />

<MemberMeta sourceHref="/source/boxes/textgrid-js/#L803" sourceLabel="TextGrid.js:803" />

Two-dimension array of characters

<MemberHeading id="answers" depth="3" name="answers" sig="answers: Array.<Array.<string>>" />

<MemberMeta sourceHref="/source/boxes/textgrid-js/#L808" sourceLabel="TextGrid.js:808" />

Two-dimension array with the expected characters, used to check user's answers.

<MemberHeading id="attributes" depth="3" name="attributes" sig="attributes: Array.<Array.<number>>" />

<MemberMeta sourceHref="/source/boxes/textgrid-js/#L814" sourceLabel="TextGrid.js:814" />

Two-dimension array of bytes used as containers of boolean attributes

- **See:**
  - TextGrid.flags

<MemberHeading id="cellwidth" depth="3" name="cellWidth" sig="cellWidth: number" />

<MemberMeta sourceHref="/source/boxes/textgrid-js/#L819" sourceLabel="TextGrid.js:819" />

The cell width, in pixels

<MemberHeading id="cellheight" depth="3" name="cellHeight" sig="cellHeight: number" />

<MemberMeta sourceHref="/source/boxes/textgrid-js/#L824" sourceLabel="TextGrid.js:824" />

The cell height, in pixels

<MemberHeading id="preferredbounds" depth="3" name="preferredBounds" sig="preferredBounds: module:AWT.Rectangle" />

<MemberMeta sourceHref="/source/boxes/textgrid-js/#L829" sourceLabel="TextGrid.js:829" />

The preferred bounds of this grid

<MemberHeading id="wild" depth="3" name="wild" sig="wild: string" />

<MemberMeta sourceHref="/source/boxes/textgrid-js/#L834" sourceLabel="TextGrid.js:834" />

The character to be used as wildcard

<MemberHeading id="randomchars" depth="3" name="randomChars" sig="randomChars: string" />

<MemberMeta sourceHref="/source/boxes/textgrid-js/#L840" sourceLabel="TextGrid.js:840" />

Characters that can be used when randomizing the content of this grid

- **See:**
  - TextGridContent#randomChars

<MemberHeading id="cursorenabled" depth="3" name="cursorEnabled" sig="cursorEnabled: boolean" />

<MemberMeta sourceHref="/source/boxes/textgrid-js/#L845" sourceLabel="TextGrid.js:845" />

Whether the blinking cursor is enabled or disabled

<MemberHeading id="usecursor" depth="3" name="useCursor" sig="useCursor: boolean" />

<MemberMeta sourceHref="/source/boxes/textgrid-js/#L850" sourceLabel="TextGrid.js:850" />

Whether this grid uses a blinking cursor or not

<MemberHeading id="cursor" depth="3" name="cursor" sig="cursor: module:AWT.Point" />

<MemberMeta sourceHref="/source/boxes/textgrid-js/#L855" sourceLabel="TextGrid.js:855" />

The current position of the cursor

<MemberHeading id="cursorblink" depth="3" name="cursorBlink" sig="cursorBlink: boolean" />

<MemberMeta sourceHref="/source/boxes/textgrid-js/#L860" sourceLabel="TextGrid.js:860" />

`true` when the cursor is "blinking" (cell drawn with [BoxBase](/module/boxes-boxbase#boxbase) `inverse` attributes)

<MemberHeading id="cursortimer" depth="3" name="cursorTimer" sig="cursorTimer: module:AWT.Timer" />

<MemberMeta sourceHref="/source/boxes/textgrid-js/#L865" sourceLabel="TextGrid.js:865" />

Controls the blinking of the cursor

<MemberHeading id="wildtransparent" depth="3" name="wildTransparent" sig="wildTransparent: boolean" />

<MemberMeta sourceHref="/source/boxes/textgrid-js/#L870" sourceLabel="TextGrid.js:870" />

Whether the wildcard character is transparent or opaque

<MemberHeading id="parent" depth="3" name="parent" sig="parent: module:boxes/AbstractBox.AbstractBox" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L605" sourceLabel="AbstractBox.js:605" />

_Inherited from `module:boxes/AbstractBox.AbstractBox#parent`_

**Overrides:&#x20;**`module:boxes/AbstractBox.AbstractBox#parent`

The parent AbstractBox (can be `null`)

<MemberHeading id="container" depth="3" name="container" sig="container: module:AWT.Container" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L610" sourceLabel="AbstractBox.js:610" />

_Inherited from `module:boxes/AbstractBox.AbstractBox#container`_

**Overrides:&#x20;**`module:boxes/AbstractBox.AbstractBox#container`

The Container to which this AbstractBox belongs

<MemberHeading id="boxbase" depth="3" name="boxBase" sig="boxBase: module:boxes/BoxBase.BoxBase" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L616" sourceLabel="AbstractBox.js:616" />

_Inherited from `module:boxes/AbstractBox.AbstractBox#boxBase`_

**Overrides:&#x20;**`module:boxes/AbstractBox.AbstractBox#boxBase`

The [BoxBase](/module/boxes-boxbase#boxbase) related to this AbstractBox. When `null`, the parent can provide an\
alternative one.

<MemberHeading id="border" depth="3" name="border" sig="border: boolean" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L621" sourceLabel="AbstractBox.js:621" />

_Inherited from `module:boxes/AbstractBox.AbstractBox#border`_

**Overrides:&#x20;**`module:boxes/AbstractBox.AbstractBox#border`

Whether this box has a border or not

<MemberHeading id="shape" depth="3" name="shape" sig="shape: module:AWT.Shape" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L626" sourceLabel="AbstractBox.js:626" />

_Inherited from `module:boxes/AbstractBox.AbstractBox#shape`_

**Overrides:&#x20;**`module:boxes/AbstractBox.AbstractBox#shape`

The shape of this box (the box Rectangle or a special Shape, if set)

<MemberHeading id="specialshape" depth="3" name="specialShape" sig="specialShape: boolean" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L631" sourceLabel="AbstractBox.js:631" />

_Inherited from `module:boxes/AbstractBox.AbstractBox#specialShape`_

**Overrides:&#x20;**`module:boxes/AbstractBox.AbstractBox#specialShape`

Whether this box has a shape that is not a rectangle

<MemberHeading id="visible" depth="3" name="visible" sig="visible: boolean" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L636" sourceLabel="AbstractBox.js:636" />

_Inherited from `module:boxes/AbstractBox.AbstractBox#visible`_

**Overrides:&#x20;**`module:boxes/AbstractBox.AbstractBox#visible`

Whether this box is visible or not

<MemberHeading id="temporaryhidden" depth="3" name="temporaryHidden" sig="temporaryHidden: boolean" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L641" sourceLabel="AbstractBox.js:641" />

_Inherited from `module:boxes/AbstractBox.AbstractBox#temporaryHidden`_

**Overrides:&#x20;**`module:boxes/AbstractBox.AbstractBox#temporaryHidden`

Used to temporary hide a box while other drawing operations are done

<MemberHeading id="tmptrans" depth="3" name="tmpTrans" sig="tmpTrans: boolean" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L646" sourceLabel="AbstractBox.js:646" />

_Inherited from `module:boxes/AbstractBox.AbstractBox#tmpTrans`_

**Overrides:&#x20;**`module:boxes/AbstractBox.AbstractBox#tmpTrans`

Cells with this attribute will be transparent but with painted border

<MemberHeading id="inactive" depth="3" name="inactive" sig="inactive: boolean" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L651" sourceLabel="AbstractBox.js:651" />

_Inherited from `module:boxes/AbstractBox.AbstractBox#inactive`_

**Overrides:&#x20;**`module:boxes/AbstractBox.AbstractBox#inactive`

Whether this box is active or inactive

<MemberHeading id="inverted" depth="3" name="inverted" sig="inverted: boolean" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L656" sourceLabel="AbstractBox.js:656" />

_Inherited from `module:boxes/AbstractBox.AbstractBox#inverted`_

**Overrides:&#x20;**`module:boxes/AbstractBox.AbstractBox#inverted`

Whether this box must be displayed with inverted or regular colors

<MemberHeading id="alternative" depth="3" name="alternative" sig="alternative: boolean" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L661" sourceLabel="AbstractBox.js:661" />

_Inherited from `module:boxes/AbstractBox.AbstractBox#alternative`_

**Overrides:&#x20;**`module:boxes/AbstractBox.AbstractBox#alternative`

Whether this box must be displayed with alternative or regular color and font settings

<MemberHeading id="marked" depth="3" name="marked" sig="marked: boolean" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L666" sourceLabel="AbstractBox.js:666" />

_Inherited from `module:boxes/AbstractBox.AbstractBox#marked`_

**Overrides:&#x20;**`module:boxes/AbstractBox.AbstractBox#marked`

Whether this box is marked (selected) or not

<MemberHeading id="focused" depth="3" name="focused" sig="focused: boolean" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L671" sourceLabel="AbstractBox.js:671" />

_Inherited from `module:boxes/AbstractBox.AbstractBox#focused`_

**Overrides:&#x20;**`module:boxes/AbstractBox.AbstractBox#focused`

Whether this box holds the input focus

<MemberHeading id="accessibletext" depth="3" name="accessibleText" sig="accessibleText: string" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L676" sourceLabel="AbstractBox.js:676" />

_Inherited from `module:boxes/AbstractBox.AbstractBox#accessibleText`_

**Overrides:&#x20;**`module:boxes/AbstractBox.AbstractBox#accessibleText`

Text to be used in accessible contexts

<MemberHeading id="role" depth="3" name="role" sig="role: string" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L681" sourceLabel="AbstractBox.js:681" />

_Inherited from `module:boxes/AbstractBox.AbstractBox#role`_

**Overrides:&#x20;**`module:boxes/AbstractBox.AbstractBox#role`

Describes the main role of this box on the activity. Useful in wai-aria descriptions.

<MemberHeading id="accessibleelement" depth="3" name="$accessibleElement" sig="$accessibleElement: external:jQuery" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L686" sourceLabel="AbstractBox.js:686" />

_Inherited from `module:boxes/AbstractBox.AbstractBox#$accessibleElement`_

**Overrides:&#x20;**`module:boxes/AbstractBox.AbstractBox#$accessibleElement`

DOM element used to display this cell content in wai-aria contexts

<MemberHeading id="accessiblealwaysactive" depth="3" name="accessibleAlwaysActive" sig="accessibleAlwaysActive: boolean" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L691" sourceLabel="AbstractBox.js:691" />

_Inherited from `module:boxes/AbstractBox.AbstractBox#accessibleAlwaysActive`_

**Overrides:&#x20;**`module:boxes/AbstractBox.AbstractBox#accessibleAlwaysActive`

Flag indicating that $accessibleElement should be always active

<MemberHeading id="hostedcomponent" depth="3" name="$hostedComponent" sig="$hostedComponent: external:jQuery" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L696" sourceLabel="AbstractBox.js:696" />

_Inherited from `module:boxes/AbstractBox.AbstractBox#$hostedComponent`_

**Overrides:&#x20;**`module:boxes/AbstractBox.AbstractBox#$hostedComponent`

An external JQuery DOM element hosted by this box

<MemberHeading id="type" depth="3" name="type" sig="type: string" />

<MemberMeta sourceHref="/source/awt-js/#L1255" sourceLabel="AWT.js:1255" />

_Inherited from `module:AWT.Rectangle#type`_

**Overrides:&#x20;**`module:boxes/AbstractBox.AbstractBox#type`

Shape type id

<MemberHeading id="dim" depth="3" name="dim" sig="dim: module:AWT.Dimension" />

<MemberMeta sourceHref="/source/awt-js/#L1260" sourceLabel="AWT.js:1260" />

_Inherited from `module:AWT.Rectangle#dim`_

**Overrides:&#x20;**`module:boxes/AbstractBox.AbstractBox#dim`

The [Dimension](/module/awt#dimension) of the Rectangle

<MemberHeading id="pos" depth="3" name="pos" sig="pos: module:AWT.Point" />

<MemberMeta sourceHref="/source/awt-js/#L1019" sourceLabel="AWT.js:1019" />

_Inherited from `module:AWT.Shape#pos`_

**Overrides:&#x20;**`module:boxes/AbstractBox.AbstractBox#pos`

The current position of the shape

## Other

<MemberHeading id="defaults" depth="3" name="defaults" sig="defaults: object" />

<MemberMeta badges="static" sourceHref="/source/boxes/textgrid-js/#L878" sourceLabel="TextGrid.js:878" />

TextGrid default values

<MemberHeading id="flags" depth="3" name="flags" sig="flags: object" />

<MemberMeta badges="static" sourceHref="/source/boxes/textgrid-js/#L885" sourceLabel="TextGrid.js:885" />

Binary flags used to mark status
