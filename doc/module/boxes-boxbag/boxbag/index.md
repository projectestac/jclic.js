---
title: BoxBag
kind: class
longname: module:boxes/BoxBag.BoxBag
description: BoxBag is a class derived from {@link module:boxes/AbstractBox.AbstractBox AbstractBox} that contains a collection of &quot;boxes&quot; (objects also derived from {@link module:boxes/AbstractBox.AbstractBox AbstractBox}). This class implements methods to add, remove and retrieve boxes, and to manage some of its properties like visibility, status, location and size.
---

# BoxBag

**Extends:&#x20;**[`module:boxes/AbstractBox.AbstractBox`](/module/boxes-abstractbox#abstractbox)

<SourceLink href="/source/boxes/boxbag-js/#L42" label="BoxBag.js:42" />

BoxBag is a class derived from [AbstractBox](/module/boxes-abstractbox#abstractbox) that contains a collection of "boxes"\
(objects also derived from [AbstractBox](/module/boxes-abstractbox#abstractbox)). This class implements methods to add, remove\
and retrieve boxes, and to manage some of its properties like visibility, status, location and size.

---

## Constructor

<Signature
  code="new BoxBag(
	parent?: module:boxes/AbstractBox.AbstractBox,
	container?: module:AWT.Container,
	boxBase?: module:boxes/BoxBase.BoxBase,
): BoxBag"
/>

BoxBag constructor

**Parameters**

- `parent` ([module:boxes/AbstractBox.AbstractBox](/module/boxes-abstractbox#abstractbox), optional) — The AbstractBox to which this box bag belongs
- `container` ([module:AWT.Container](/module/awt#container), optional) — The container where this box bag is placed.
- `boxBase` ([module:boxes/BoxBase.BoxBase](/module/boxes-boxbase#boxbase), optional) — The object where colors, fonts, border and other graphic properties

---

## Instance Methods

<MemberHeading id="getpreferredsize" depth="3" name="getPreferredSize" sig="getPreferredSize(): module:AWT.Dimension" />

<MemberMeta sourceHref="/source/boxes/boxbag-js/#L230" sourceLabel="BoxBag.js:230" />

Gets the preferred size of this `BoxBag`

**Returns**

- [`module:AWT.Dimension`](/module/awt#dimension)

<MemberHeading id="getminimumsize" depth="3" name="getMinimumSize" sig="getMinimumSize(): module:AWT.Dimension" />

<MemberMeta sourceHref="/source/boxes/boxbag-js/#L238" sourceLabel="BoxBag.js:238" />

Gets the minimum size requested by this `BoxBag`

**Returns**

- [`module:AWT.Dimension`](/module/awt#dimension)

<MemberHeading id="getscaledsize" depth="3" name="getScaledSize" sig="getScaledSize(scale: number): module:AWT.Dimension" />

<MemberMeta sourceHref="/source/boxes/boxbag-js/#L250" sourceLabel="BoxBag.js:250" />

Scales the current size of this box bag, multiplying all values by a specific factor

**Parameters**

- `scale` (number) — The scale factor

**Returns**

- [`module:AWT.Dimension`](/module/awt#dimension)

<MemberHeading id="addbox" depth="3" name="addBox" sig="addBox(bx: module:boxes/AbstractBox.AbstractBox)" />

<MemberMeta sourceHref="/source/boxes/boxbag-js/#L259" sourceLabel="BoxBag.js:259" />

Adds an [AbstractBox](/module/boxes-abstractbox#abstractbox) to the collection of cells

**Parameters**

- `bx` ([module:boxes/AbstractBox.AbstractBox](/module/boxes-abstractbox#abstractbox)) — The box to add

<MemberHeading id="boxindex" depth="3" name="boxIndex" sig="boxIndex(bx: module:boxes/AbstractBox.AbstractBox): number" />

<MemberMeta sourceHref="/source/boxes/boxbag-js/#L276" sourceLabel="BoxBag.js:276" />

Returns the index of a specific box in the `cells` array

**Parameters**

- `bx` ([module:boxes/AbstractBox.AbstractBox](/module/boxes-abstractbox#abstractbox))

**Returns**

- `number`

<MemberHeading id="getbox" depth="3" name="getBox" sig="getBox(n: number): module:boxes/AbstractBox.AbstractBox" />

<MemberMeta sourceHref="/source/boxes/boxbag-js/#L285" sourceLabel="BoxBag.js:285" />

Returns the box at a specific index in the `cells` array

**Parameters**

- `n` (number) — The index

**Returns**

- [`module:boxes/AbstractBox.AbstractBox`](/module/boxes-abstractbox#abstractbox)

<MemberHeading id="getbackgroundbox" depth="3" name="getBackgroundBox" sig="getBackgroundBox(): module:boxes/AbstractBox.AbstractBox" />

<MemberMeta sourceHref="/source/boxes/boxbag-js/#L293" sourceLabel="BoxBag.js:293" />

Gets the background box

**Returns**

- [`module:boxes/AbstractBox.AbstractBox`](/module/boxes-abstractbox#abstractbox)

<MemberHeading id="setbackgroundbox" depth="3" name="setBackgroundBox" sig="setBackgroundBox(bx: module:boxes/AbstractBox.AbstractBox)" />

<MemberMeta sourceHref="/source/boxes/boxbag-js/#L301" sourceLabel="BoxBag.js:301" />

Sets the background box

**Parameters**

- `bx` ([module:boxes/AbstractBox.AbstractBox](/module/boxes-abstractbox#abstractbox))

<MemberHeading id="recalcsize" depth="3" name="recalcSize" sig="recalcSize()" />

<MemberMeta sourceHref="/source/boxes/boxbag-js/#L317" sourceLabel="BoxBag.js:317" />

Recalculates the total size of this BoxBag (useful after direct additions o deletions of\
elements in the `cells` array).\
Updates `preferredBounds` and the current position and size of the box bag.

<MemberHeading id="getnumcells" depth="3" name="getNumCells" sig="getNumCells(): number" />

<MemberMeta sourceHref="/source/boxes/boxbag-js/#L338" sourceLabel="BoxBag.js:338" />

Returns the number of cells stored in this BoxBag

**Returns**

- `number`

<MemberHeading id="setcellattr" depth="3" name="setCellAttr" sig="setCellAttr(key: string, value: any)" />

<MemberMeta sourceHref="/source/boxes/boxbag-js/#L347" sourceLabel="BoxBag.js:347" />

Sets the specified key - value pair to all cells of this bag.

**Parameters**

- `key` (string) — The key to be established
- `value` (any) — The value, of any type

<MemberHeading id="setborder" depth="3" name="setBorder" sig="setBorder(newVal: boolean)" />

<MemberMeta sourceHref="/source/boxes/boxbag-js/#L358" sourceLabel="BoxBag.js:358" />

Overrides [module:boxes/AbstractBox.AbstractBox#setBorder](/module/boxes-abstractbox/abstractbox#setborder) iterating over all the cells stored in this box bag.

**Parameters**

- `newVal` (boolean) — Whether to set or unset the border

<MemberHeading id="setvisible" depth="3" name="setVisible" sig="setVisible(newVal: boolean)" />

<MemberMeta sourceHref="/source/boxes/boxbag-js/#L367" sourceLabel="BoxBag.js:367" />

Overrides [module:boxes/AbstractBox.AbstractBox#setVisible](/module/boxes-abstractbox/abstractbox#setvisible) iterating over all the cells stored in this box bag.

**Parameters**

- `newVal` (boolean) — Whether to set the cells visible or not

<MemberHeading id="setalternative" depth="3" name="setAlternative" sig="setAlternative(newVal: boolean)" />

<MemberMeta sourceHref="/source/boxes/boxbag-js/#L376" sourceLabel="BoxBag.js:376" />

Overrides [module:boxes/AbstractBox.AbstractBox#setAlternative](/module/boxes-abstractbox/abstractbox#setalternative) iterating over all the cells stored in this box bag.

**Parameters**

- `newVal` (boolean) — Whether to set or unset the cells in "alternative" mode

<MemberHeading
  id="setbounds"
  depth="3"
  name="setBounds"
  sig="setBounds(
	rect: AWT.Rectangle | number,
	ry?: number,
	rw?: number,
	rh?: number,
)"
/>

<MemberMeta sourceHref="/source/boxes/boxbag-js/#L390" sourceLabel="BoxBag.js:390" />

Overrides [module:boxes/AbstractBox.AbstractBox#setBounds](/module/boxes-abstractbox/abstractbox#setbounds) adjusting the position and size of all cells

**Parameters**

- `rect` ([AWT.Rectangle](/module/awt#rectangle) | number) — An AWT.Rectangle object, or the `x` coordinate of the\
  upper-left corner of a new rectangle.
- `ry` (number, optional) — `y` coordinate of the upper-left corner of the new rectangle.
- `rw` (number, optional) — Width of the new rectangle.
- `rh` (number, optional) — Height of the new rectangle.

<MemberHeading
  id="update"
  depth="3"
  name="update"
  sig="update(
	ctx: external:CanvasRenderingContext2D,
	dirtyRegion?: module:AWT.Rectangle,
)"
/>

<MemberMeta sourceHref="/source/boxes/boxbag-js/#L433" sourceLabel="BoxBag.js:433" />

Performs graphics operations for each cell.\
Overrides [module:boxes/AbstractBox.AbstractBox#update](/module/boxes-abstractbox/abstractbox#update)

**Parameters**

- `ctx` ([external:CanvasRenderingContext2D](/module/utils#canvasrenderingcontext2d)) — The canvas rendering context used to draw the\
  box contents.
- `dirtyRegion` ([module:AWT.Rectangle](/module/awt#rectangle), optional) — The area that must be repainted. `null` refers to the whole box.

<MemberHeading
  id="findbox"
  depth="3"
  name="findBox"
  sig="findBox(
	p: module:AWT.Point,
): module:boxes/AbstractBox.AbstractBox"
/>

<MemberMeta sourceHref="/source/boxes/boxbag-js/#L461" sourceLabel="BoxBag.js:461" />

Finds the first visible [AbstractBox](/module/boxes-abstractbox#abstractbox) located under the specified point

**Parameters**

- `p` ([module:AWT.Point](/module/awt#point))

**Returns**

- [`module:boxes/AbstractBox.AbstractBox`](/module/boxes-abstractbox#abstractbox)

<MemberHeading id="countinactivecells" depth="3" name="countInactiveCells" sig="countInactiveCells(): number" />

<MemberMeta sourceHref="/source/boxes/boxbag-js/#L477" sourceLabel="BoxBag.js:477" />

Count the number of cells of this BoxBag that are in "inactive" state

**Returns**

- `number`

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

<MemberHeading id="end" depth="3" name="end" sig="end()" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L82" sourceLabel="AbstractBox.js:82" />

_Inherited from `module:boxes/AbstractBox.AbstractBox#end`_

**Overrides:&#x20;**`module:boxes/AbstractBox.AbstractBox#end`

Finisher method

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
	ry?: number,
	rw?: number,
	rh?: number,
): module:AWT.Rectangle"
/>

<MemberMeta sourceHref="/source/boxes/boxbag-js/#L390" sourceLabel="BoxBag.js:390" />

_Inherited from `module:boxes/BoxBag.BoxBag#setBounds`_

**Overrides:&#x20;**`module:boxes/AbstractBox.AbstractBox#setBounds`

Overrides [module:boxes/AbstractBox.AbstractBox#setBounds](/module/boxes-abstractbox/abstractbox#setbounds) adjusting the position and size of all cells

**Parameters**

- `rect` ([AWT.Rectangle](/module/awt#rectangle) | number) — An AWT.Rectangle object, or the `x` coordinate of the\
  upper-left corner of a new rectangle.
- `ry` (number, optional) — `y` coordinate of the upper-left corner of the new rectangle.
- `rw` (number, optional) — Width of the new rectangle.
- `rh` (number, optional) — Height of the new rectangle.

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

<MemberMeta sourceHref="/source/boxes/boxbag-js/#L358" sourceLabel="BoxBag.js:358" />

_Inherited from `module:boxes/BoxBag.BoxBag#setBorder`_

**Overrides:&#x20;**`module:boxes/AbstractBox.AbstractBox#setBorder`

Overrides [module:boxes/AbstractBox.AbstractBox#setBorder](/module/boxes-abstractbox/abstractbox#setborder) iterating over all the cells stored in this box bag.

**Parameters**

- `newVal` (boolean) — Whether to set or unset the border

<MemberHeading id="isvisible" depth="3" name="isVisible" sig="isVisible(): boolean" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L266" sourceLabel="AbstractBox.js:266" />

_Inherited from `module:boxes/AbstractBox.AbstractBox#isVisible`_

**Overrides:&#x20;**`module:boxes/AbstractBox.AbstractBox#isVisible`

Checks if this box is fully visible

**Returns**

- `boolean`

<MemberHeading id="setvisible" depth="3" name="setVisible" sig="setVisible(newVal: boolean)" />

<MemberMeta sourceHref="/source/boxes/boxbag-js/#L367" sourceLabel="BoxBag.js:367" />

_Inherited from `module:boxes/BoxBag.BoxBag#setVisible`_

**Overrides:&#x20;**`module:boxes/AbstractBox.AbstractBox#setVisible`

Overrides [module:boxes/AbstractBox.AbstractBox#setVisible](/module/boxes-abstractbox/abstractbox#setvisible) iterating over all the cells stored in this box bag.

**Parameters**

- `newVal` (boolean) — Whether to set the cells visible or not

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

<MemberMeta sourceHref="/source/boxes/boxbag-js/#L376" sourceLabel="BoxBag.js:376" />

_Inherited from `module:boxes/BoxBag.BoxBag#setAlternative`_

**Overrides:&#x20;**`module:boxes/AbstractBox.AbstractBox#setAlternative`

Overrides [module:boxes/AbstractBox.AbstractBox#setAlternative](/module/boxes-abstractbox/abstractbox#setalternative) iterating over all the cells stored in this box bag.

**Parameters**

- `newVal` (boolean) — Whether to set or unset the cells in "alternative" mode

<MemberHeading
  id="update"
  depth="3"
  name="update"
  sig="update(
	ctx: external:CanvasRenderingContext2D,
	dirtyRegion?: module:AWT.Rectangle,
)"
/>

<MemberMeta sourceHref="/source/boxes/boxbag-js/#L433" sourceLabel="BoxBag.js:433" />

_Inherited from `module:boxes/BoxBag.BoxBag#update`_

**Overrides:&#x20;**`module:boxes/AbstractBox.AbstractBox#update`

Performs graphics operations for each cell.\
Overrides [module:boxes/AbstractBox.AbstractBox#update](/module/boxes-abstractbox/abstractbox#update)

**Parameters**

- `ctx` ([external:CanvasRenderingContext2D](/module/utils#canvasrenderingcontext2d)) — The canvas rendering context used to draw the\
  box contents.
- `dirtyRegion` ([module:AWT.Rectangle](/module/awt#rectangle), optional) — The area that must be repainted. `null` refers to the whole box.

<MemberHeading
  id="updatecontent"
  depth="3"
  name="updateContent"
  sig="updateContent(
	_ctx: external:CanvasRenderingContext2D,
	_dirtyRegion?: module:AWT.Rectangle,
)"
/>

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L476" sourceLabel="AbstractBox.js:476" />

_Inherited from `module:boxes/AbstractBox.AbstractBox#updateContent`_

**Overrides:&#x20;**`module:boxes/AbstractBox.AbstractBox#updateContent`

Here is where classes derived from [AbstractBox](/module/boxes-abstractbox#abstractbox) should implement the drawing of its\
content. Background and border are already painted in [module:boxes/AbstractBox.AbstractBox#update](/module/boxes-abstractbox/abstractbox#update).

**Parameters**

- `_ctx` ([external:CanvasRenderingContext2D](/module/utils#canvasrenderingcontext2d)) — The canvas rendering context used to draw the\
  box content.
- `_dirtyRegion` ([module:AWT.Rectangle](/module/awt#rectangle), optional) — The area that must be repainted. `null` refers to the whole box.

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
	ry?: number,
	rw?: number,
	rh?: number,
): module:AWT.Rectangle"
/>

<MemberMeta sourceHref="/source/boxes/boxbag-js/#L390" sourceLabel="BoxBag.js:390" />

_Inherited from `module:boxes/BoxBag.BoxBag#setBounds`_

**Overrides:&#x20;**`module:boxes/AbstractBox.AbstractBox#setBounds`

Overrides [module:boxes/AbstractBox.AbstractBox#setBounds](/module/boxes-abstractbox/abstractbox#setbounds) adjusting the position and size of all cells

**Parameters**

- `rect` ([AWT.Rectangle](/module/awt#rectangle) | number) — An AWT.Rectangle object, or the `x` coordinate of the\
  upper-left corner of a new rectangle.
- `ry` (number, optional) — `y` coordinate of the upper-left corner of the new rectangle.
- `rw` (number, optional) — Width of the new rectangle.
- `rh` (number, optional) — Height of the new rectangle.

**Returns**

- [`module:AWT.Rectangle`](/module/awt#rectangle)

<MemberHeading id="setborder" depth="3" name="setBorder" sig="setBorder(newVal: boolean)" />

<MemberMeta sourceHref="/source/boxes/boxbag-js/#L358" sourceLabel="BoxBag.js:358" />

_Inherited from `module:boxes/BoxBag.BoxBag#setBorder`_

**Overrides:&#x20;**`module:boxes/AbstractBox.AbstractBox#setBorder`

Overrides [module:boxes/AbstractBox.AbstractBox#setBorder](/module/boxes-abstractbox/abstractbox#setborder) iterating over all the cells stored in this box bag.

**Parameters**

- `newVal` (boolean) — Whether to set or unset the border

<MemberHeading id="setvisible" depth="3" name="setVisible" sig="setVisible(newVal: boolean)" />

<MemberMeta sourceHref="/source/boxes/boxbag-js/#L367" sourceLabel="BoxBag.js:367" />

_Inherited from `module:boxes/BoxBag.BoxBag#setVisible`_

**Overrides:&#x20;**`module:boxes/AbstractBox.AbstractBox#setVisible`

Overrides [module:boxes/AbstractBox.AbstractBox#setVisible](/module/boxes-abstractbox/abstractbox#setvisible) iterating over all the cells stored in this box bag.

**Parameters**

- `newVal` (boolean) — Whether to set the cells visible or not

<MemberHeading id="setalternative" depth="3" name="setAlternative" sig="setAlternative(newVal: boolean)" />

<MemberMeta sourceHref="/source/boxes/boxbag-js/#L376" sourceLabel="BoxBag.js:376" />

_Inherited from `module:boxes/BoxBag.BoxBag#setAlternative`_

**Overrides:&#x20;**`module:boxes/AbstractBox.AbstractBox#setAlternative`

Overrides [module:boxes/AbstractBox.AbstractBox#setAlternative](/module/boxes-abstractbox/abstractbox#setalternative) iterating over all the cells stored in this box bag.

**Parameters**

- `newVal` (boolean) — Whether to set or unset the cells in "alternative" mode

<MemberHeading
  id="update"
  depth="3"
  name="update"
  sig="update(
	ctx: external:CanvasRenderingContext2D,
	dirtyRegion?: module:AWT.Rectangle,
)"
/>

<MemberMeta sourceHref="/source/boxes/boxbag-js/#L433" sourceLabel="BoxBag.js:433" />

_Inherited from `module:boxes/BoxBag.BoxBag#update`_

**Overrides:&#x20;**`module:boxes/AbstractBox.AbstractBox#update`

Performs graphics operations for each cell.\
Overrides [module:boxes/AbstractBox.AbstractBox#update](/module/boxes-abstractbox/abstractbox#update)

**Parameters**

- `ctx` ([external:CanvasRenderingContext2D](/module/utils#canvasrenderingcontext2d)) — The canvas rendering context used to draw the\
  box contents.
- `dirtyRegion` ([module:AWT.Rectangle](/module/awt#rectangle), optional) — The area that must be repainted. `null` refers to the whole box.

## Static Methods

<MemberHeading
  id="layoutsingle"
  depth="3"
  name="layoutSingle"
  sig="layoutSingle(
	preferredMaxSize: module:AWT.Dimension,
	rs: Resizable,
	margin: number,
): module:AWT.Dimension"
/>

<MemberMeta badges="static" sourceHref="/source/boxes/boxbag-js/#L66" sourceLabel="BoxBag.js:66" />

Static method that sets the position and dimension of a `Resizable` object based on a\
preferred maximum dimension and a margin.

**Parameters**

- `preferredMaxSize` ([module:AWT.Dimension](/module/awt#dimension)) — The preferred maximum size
- `rs` (Resizable) — A resizable object implementing the methods described in the\
  [Resizable](http://projectestac.github.io/jclic/apidoc/edu/xtec/jclic/boxes/Resizable.html)\
  interface of JClic. Currently a [BoxBag](/module/boxes-boxbag#boxbag) or [TextGrid](/module/boxes-textgrid#textgrid).
- `margin` (number) — The margin between the available area and the BoxBag

**Returns**

- [`module:AWT.Dimension`](/module/awt#dimension)

<MemberHeading
  id="layoutdouble"
  depth="3"
  name="layoutDouble"
  sig="layoutDouble(
	desiredMaxSize: module:AWT.Dimension,
	rsA: Resizable,
	rsB: Resizable,
	boxGridPos: string,
	margin: number,
): module:AWT.Dimension"
/>

<MemberMeta badges="static" sourceHref="/source/boxes/boxbag-js/#L117" sourceLabel="BoxBag.js:117" />

Static method that sets the position and dimension of two `Resizable` objects based on a\
preferred maximum size, a layout schema and a margin.

**Parameters**

- `desiredMaxSize` ([module:AWT.Dimension](/module/awt#dimension)) — The preferred maximum size
- `rsA` (Resizable) — First resizable object implementing the methods described in the\
  [Resizable](http://projectestac.github.io/jclic/apidoc/edu/xtec/jclic/boxes/Resizable.html)\
  interface of JClic. Currently a [BoxBag](/module/boxes-boxbag#boxbag) or [TextGrid](/module/boxes-textgrid#textgrid).
- `rsB` (Resizable) — Second resizable object
- `boxGridPos` (string) — The layout schema. Possible values are:
- `margin` (number) — The margin between the available area and the BoxBag

**Returns**

- [`module:AWT.Dimension`](/module/awt#dimension)

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

<MemberHeading id="cells" depth="3" name="cells" sig="cells: Array.<module:boxes/AbstractBox.AbstractBox>" />

<MemberMeta sourceHref="/source/boxes/boxbag-js/#L487" sourceLabel="BoxBag.js:487" />

The array of cells

<MemberHeading id="preferredbounds" depth="3" name="preferredBounds" sig="preferredBounds: module:AWT.Rectangle" />

<MemberMeta sourceHref="/source/boxes/boxbag-js/#L492" sourceLabel="BoxBag.js:492" />

Rectangle containing the preferred bounds of the BoxBag

<MemberHeading id="backgroundbox" depth="3" name="backgroundBox" sig="backgroundBox: module:boxes/AbstractBox.AbstractBox" />

<MemberMeta sourceHref="/source/boxes/boxbag-js/#L497" sourceLabel="BoxBag.js:497" />

An optional box used as a background by this BoxBag

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
