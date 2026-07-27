---
title: AbstractBox
kind: class
longname: module:boxes/AbstractBox.AbstractBox
description: This abstract class is the base for most graphic components of JClic. It describes an area (by default an {@link module:AWT.Rectangle}) with some special properties that determine how it must be drawn on screen. Some types of boxes can act as containers for other boxes, establishing a hierarchy of dependences.
---

# AbstractBox

**Extends:&#x20;**[`module:AWT.Rectangle`](/module/awt#rectangle)

<SourceLink href="/source/boxes/abstractbox-js/#L44" label="AbstractBox.js:44" />

**Modifiers:** `abstract`

This abstract class is the base for most graphic components of JClic. It describes an area\
(by default an [module:AWT.Rectangle](/module/awt#rectangle)) with some special properties that determine how it must\
be drawn on screen.

Some types of boxes can act as containers for other boxes, establishing a hierarchy of dependences.

---

## Constructor

<Signature
  code="new AbstractBox(
	parent: module:AbstractBox,
	container: module:AWT.Container,
	boxBase: module:BoxBase,
): AbstractBox"
/>

AbstractBox constructor

**Parameters**

- `parent` ([module:AbstractBox](/module/boxes-abstractbox#abstractbox)) — The AbstractBox to which this one belongs
- `container` ([module:AWT.Container](/module/awt#container)) — The container where this box is placed.
- `boxBase` ([module:BoxBase](/module/boxes-boxbase#boxbase)) — The object where colors, fonts, border and other graphic properties\
  of this box are defined.

---

## Instance Methods

<MemberHeading id="setparent" depth="3" name="setParent" sig="setParent(parent: module:boxes/AbstractBox.AbstractBox)" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L67" sourceLabel="AbstractBox.js:67" />

Setter method for `parent`

**Parameters**

- `parent` ([module:boxes/AbstractBox.AbstractBox](/module/boxes-abstractbox#abstractbox)) — The new parent of this box

<MemberHeading id="getparent" depth="3" name="getParent" sig="getParent(): module:boxes/AbstractBox.AbstractBox" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L75" sourceLabel="AbstractBox.js:75" />

Gets the current parent of this box

**Returns**

- [`module:boxes/AbstractBox.AbstractBox`](/module/boxes-abstractbox#abstractbox)

<MemberHeading id="end" depth="3" name="end" sig="end()" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L82" sourceLabel="AbstractBox.js:82" />

Finisher method

<MemberHeading id="setcontainer" depth="3" name="setContainer" sig="setContainer(newContainer: module:AWT.Container)" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L89" sourceLabel="AbstractBox.js:89" />

Setter method for `container`

**Parameters**

- `newContainer` ([module:AWT.Container](/module/awt#container)) — The new Container assigned to this box

<MemberHeading id="getcontainerx" depth="3" name="getContainerX" sig="getContainerX(): module:AWT.Container" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L101" sourceLabel="AbstractBox.js:101" />

Gets the `container` attribute of this box, without checking its parent

**Returns**

- [`module:AWT.Container`](/module/awt#container)

<MemberHeading id="getcontainerresolve" depth="3" name="getContainerResolve" sig="getContainerResolve(): module:AWT.Container" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L109" sourceLabel="AbstractBox.js:109" />

Gets the container associated to this box, asking its parents when `null`.

**Returns**

- [`module:AWT.Container`](/module/awt#container)

<MemberHeading id="invalidate" depth="3" name="invalidate" sig="invalidate(rect: module:AWT.Rectangle)" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L121" sourceLabel="AbstractBox.js:121" />

Invalidates the zone corresponding to this box in the associated [module:AWT.Container](/module/awt#container), if any.

**Parameters**

- `rect` ([module:AWT.Rectangle](/module/awt#rectangle)) — The rectangle to be invalidated. When `null`, it's the full\
  container area.

<MemberHeading id="setboxbase" depth="3" name="setBoxBase" sig="setBoxBase(boxBase: module:boxes/BoxBase.BoxBase)" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L131" sourceLabel="AbstractBox.js:131" />

Sets the [BoxBase](/module/boxes-boxbase#boxbase) of this box

**Parameters**

- `boxBase` ([module:boxes/BoxBase.BoxBase](/module/boxes-boxbase#boxbase)) — The new BoxBase

<MemberHeading id="getboxbaseresolve" depth="3" name="getBoxBaseResolve" sig="getBoxBaseResolve(): module:boxes/BoxBase.BoxBase" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L140" sourceLabel="AbstractBox.js:140" />

Gets the real [BoxBase](/module/boxes-boxbase#boxbase) associated to this box, scanning down parent relationships.

**Returns**

- [`module:boxes/BoxBase.BoxBase`](/module/boxes-boxbase#boxbase)

<MemberHeading id="setshape" depth="3" name="setShape" sig="setShape(sh: module:AWT.Shape)" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L151" sourceLabel="AbstractBox.js:151" />

Sets the shape used to draw the content of this box

**Parameters**

- `sh` ([module:AWT.Shape](/module/awt#shape)) — The shape to be set

<MemberHeading id="getshape" depth="3" name="getShape" sig="getShape(): module:AWT.Shape" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L163" sourceLabel="AbstractBox.js:163" />

**Overrides:&#x20;**`module:AWT.Rectangle#getShape`

Gets the current shape used in this box

**Returns**

- [`module:AWT.Shape`](/module/awt#shape)

<MemberHeading id="contains" depth="3" name="contains" sig="contains(p: module:AWT.Point): boolean" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L173" sourceLabel="AbstractBox.js:173" />

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
)"
/>

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L186" sourceLabel="AbstractBox.js:186" />

Sets a new size and/or dimension to this box

**Parameters**

- `rect` ([AWT.Rectangle](/module/awt#rectangle) | number) — An AWT.Rectangle object, or the `x` coordinate of the\
  upper-left corner of a new rectangle.
- `y` (number, optional) — `y` coordinate of the upper-left corner of the new rectangle.
- `w` (number, optional) — Width of the new rectangle.
- `h` (number, optional) — Height of the new rectangle.

<MemberHeading id="moveto" depth="3" name="moveTo" sig="moveTo(newPos: AWT.Point | number, y?: number)" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L218" sourceLabel="AbstractBox.js:218" />

**Overrides:&#x20;**`module:AWT.Rectangle#moveTo`

Sets a new location for this box. In JClic this method was named `setLocation`

**Parameters**

- `newPos` ([AWT.Point](/module/awt#point) | number) — A point or the `x` coordinate of a new point.
- `y` (number, optional) — The `y` coordinate of a new point.

<MemberHeading id="moveby" depth="3" name="moveBy" sig="moveBy(dx: number, dy: number)" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L229" sourceLabel="AbstractBox.js:229" />

**Overrides:&#x20;**`module:AWT.Rectangle#moveBy`

Sets a new location to this box. In JClic this method was named `translate`.

**Parameters**

- `dx` (number) — The displacement on the X axis
- `dy` (number) — The displacement on the Y axis

<MemberHeading id="setsize" depth="3" name="setSize" sig="setSize(width: number, height: number)" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L238" sourceLabel="AbstractBox.js:238" />

Changes the size of this box

**Parameters**

- `width` (number)
- `height` (number)

<MemberHeading id="hasborder" depth="3" name="hasBorder" sig="hasBorder(): boolean" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L246" sourceLabel="AbstractBox.js:246" />

Checks if this box has border

**Returns**

- `boolean`

<MemberHeading id="setborder" depth="3" name="setBorder" sig="setBorder(newVal: boolean)" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L254" sourceLabel="AbstractBox.js:254" />

Sets/unsets a border to this box

**Parameters**

- `newVal` (boolean) — `true` to set a border.

<MemberHeading id="isvisible" depth="3" name="isVisible" sig="isVisible(): boolean" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L266" sourceLabel="AbstractBox.js:266" />

Checks if this box is fully visible

**Returns**

- `boolean`

<MemberHeading id="setvisible" depth="3" name="setVisible" sig="setVisible(newVal: boolean)" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L274" sourceLabel="AbstractBox.js:274" />

Sets this box visible or invisible

**Parameters**

- `newVal` (boolean) — `true` for visible

<MemberHeading id="sethostedcomponentvisible" depth="3" name="setHostedComponentVisible" sig="setHostedComponentVisible()" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L284" sourceLabel="AbstractBox.js:284" />

Makes [module:boxes/AbstractBox.AbstractBox#$hostedComponent](/module/boxes-abstractbox/abstractbox#hostedcomponent) visible or invisible, based on the value of\
the AbstractBox `visible` flag.

<MemberHeading id="istemporaryhidden" depth="3" name="isTemporaryHidden" sig="isTemporaryHidden(): boolean" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L293" sourceLabel="AbstractBox.js:293" />

Checks if this box is temporary hidden

**Returns**

- `boolean`

<MemberHeading id="settemporaryhidden" depth="3" name="setTemporaryHidden" sig="setTemporaryHidden(newVal: boolean)" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L301" sourceLabel="AbstractBox.js:301" />

Makes this box temporary hidden (newVal `true`) or resets its original state (newVal `false`)

**Parameters**

- `newVal` (boolean)

<MemberHeading id="isinactive" depth="3" name="isInactive" sig="isInactive(): boolean" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L309" sourceLabel="AbstractBox.js:309" />

Checks if this box is currently inactive.

**Returns**

- `boolean`

<MemberHeading id="setinactive" depth="3" name="setInactive" sig="setInactive(newVal: boolean)" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L317" sourceLabel="AbstractBox.js:317" />

Makes this box active (`false`) or inactive (`true`)

**Parameters**

- `newVal` (boolean)

<MemberHeading id="isinverted" depth="3" name="isInverted" sig="isInverted(): boolean" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L338" sourceLabel="AbstractBox.js:338" />

Checks if this box is in `inverted` state.

**Returns**

- `boolean`

<MemberHeading id="setinverted" depth="3" name="setInverted" sig="setInverted(newVal: boolean)" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L347" sourceLabel="AbstractBox.js:347" />

Puts this box in `inverted` mode or restores its original state.

**Parameters**

- `newVal` (boolean)

<MemberHeading id="ismarked" depth="3" name="isMarked" sig="isMarked(): boolean" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L359" sourceLabel="AbstractBox.js:359" />

Checks if this box is `marked`

**Returns**

- `boolean`

<MemberHeading id="setmarked" depth="3" name="setMarked" sig="setMarked(newVal: boolean)" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L367" sourceLabel="AbstractBox.js:367" />

Sets this box in `marked` mode, or restores its original state.

**Parameters**

- `newVal` (boolean)

<MemberHeading id="isfocused" depth="3" name="isFocused" sig="isFocused(): boolean" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L382" sourceLabel="AbstractBox.js:382" />

Checks if this box has the input focus

**Returns**

- `boolean`

<MemberHeading id="setfocused" depth="3" name="setFocused" sig="setFocused(newVal: boolean)" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L391" sourceLabel="AbstractBox.js:391" />

Sets or unsets the input focus to this box.

**Parameters**

- `newVal` (boolean)

<MemberHeading id="isalternative" depth="3" name="isAlternative" sig="isAlternative(): boolean" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L406" sourceLabel="AbstractBox.js:406" />

Checks if this box is in `alternative` state.

**Returns**

- `boolean`

<MemberHeading id="setalternative" depth="3" name="setAlternative" sig="setAlternative(newVal: boolean)" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L414" sourceLabel="AbstractBox.js:414" />

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
	_ctx: external:CanvasRenderingContext2D,
	_dirtyRegion?: module:AWT.Rectangle,
)"
/>

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L476" sourceLabel="AbstractBox.js:476" />

Here is where classes derived from [AbstractBox](/module/boxes-abstractbox#abstractbox) should implement the drawing of its\
content. Background and border are already painted in [module:boxes/AbstractBox.AbstractBox#update](/module/boxes-abstractbox/abstractbox#update).

**Parameters**

- `_ctx` ([external:CanvasRenderingContext2D](/module/utils#canvasrenderingcontext2d)) — The canvas rendering context used to draw the\
  box content.
- `_dirtyRegion` ([module:AWT.Rectangle](/module/awt#rectangle), optional) — The area that must be repainted. `null` refers to the whole box.

<MemberHeading id="drawborder" depth="3" name="drawBorder" sig="drawBorder(ctx: external:CanvasRenderingContext2D)" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L484" sourceLabel="AbstractBox.js:484" />

Draws the box border

**Parameters**

- `ctx` ([external:CanvasRenderingContext2D](/module/utils#canvasrenderingcontext2d)) — The canvas rendering context where the border\
  will be drawn.

<MemberHeading id="getborderbounds" depth="3" name="getBorderBounds" sig="getBorderBounds(): module:AWT.Rectangle" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L509" sourceLabel="AbstractBox.js:509" />

Returns the enclosing Rectangle of this box including its border (if any)

**Returns**

- [`module:AWT.Rectangle`](/module/awt#rectangle)

<MemberHeading id="sethostedcomponent" depth="3" name="setHostedComponent" sig="setHostedComponent($hc: external:jQuery)" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L525" sourceLabel="AbstractBox.js:525" />

Sets the [$hostedComponent](/module/boxes-abstractbox/abstractbox#hostedcomponent) member.

**Parameters**

- `$hc` ([external:jQuery](/module/utils#jquery)) — The jQuery DOM component hosted by this box.

<MemberHeading id="gethostedcomponent" depth="3" name="getHostedComponent" sig="getHostedComponent(): external:jQuery" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L545" sourceLabel="AbstractBox.js:545" />

Gets the current [$hostedComponent](/module/boxes-abstractbox/abstractbox#hostedcomponent) member

**Returns**

- [`external:jQuery`](/module/utils#jquery)

<MemberHeading id="sethostedcomponentcolors" depth="3" name="setHostedComponentColors" sig="setHostedComponentColors()" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L553" sourceLabel="AbstractBox.js:553" />

Sets [$hostedComponent](/module/boxes-abstractbox/abstractbox#hostedcomponent) colors and other css properties\
based on the current [BoxBase](/module/boxes-boxbase#boxbase) of this box.

<MemberHeading id="sethostedcomponentborder" depth="3" name="setHostedComponentBorder" sig="setHostedComponentBorder()" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L568" sourceLabel="AbstractBox.js:568" />

Sets the [$hostedComponent](/module/boxes-abstractbox/abstractbox#hostedcomponent) border, based on the current\
[BoxBase](/module/boxes-boxbase#boxbase) of this box.

<MemberHeading id="sethostedcomponentbounds" depth="3" name="setHostedComponentBounds" sig="setHostedComponentBounds(_sizeChanged: boolean)" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L584" sourceLabel="AbstractBox.js:584" />

Places and resizes [$hostedComponent](/module/boxes-abstractbox/abstractbox#hostedcomponent), based on the size\
and position of this box.

**Parameters**

- `_sizeChanged` (boolean) — `true` when this [ActiveBox](/module/boxes-activebox#activebox) has changed its size

<MemberHeading id="getbounds" depth="3" name="getBounds" sig="getBounds(): module:AWT.Rectangle" />

<MemberMeta sourceHref="/source/awt-js/#L1081" sourceLabel="AWT.js:1081" />

_Inherited from `module:AWT.Rectangle#getBounds`_

**Overrides:&#x20;**`module:AWT.Rectangle#getBounds`

Gets the enclosing [Rectangle](/module/awt#rectangle) of this Shape.

**Returns**

- [`module:AWT.Rectangle`](/module/awt#rectangle)

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

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L186" sourceLabel="AbstractBox.js:186" />

_Inherited from `module:boxes/AbstractBox.AbstractBox#setBounds`_

**Overrides:&#x20;**`module:AWT.Rectangle#setBounds`

Sets a new size and/or dimension to this box

**Parameters**

- `rect` ([AWT.Rectangle](/module/awt#rectangle) | number) — An AWT.Rectangle object, or the `x` coordinate of the\
  upper-left corner of a new rectangle.
- `y` (number, optional) — `y` coordinate of the upper-left corner of the new rectangle.
- `w` (number, optional) — Width of the new rectangle.
- `h` (number, optional) — Height of the new rectangle.

**Returns**

- [`module:AWT.Rectangle`](/module/awt#rectangle)

<MemberHeading id="equals" depth="3" name="equals" sig="equals(r: module:AWT.Shape): boolean" />

<MemberMeta sourceHref="/source/awt-js/#L1105" sourceLabel="AWT.js:1105" />

_Inherited from `module:AWT.Rectangle#equals`_

**Overrides:&#x20;**`module:AWT.Rectangle#equals`

Checks if two shapes are equivalent.

**Parameters**

- `r` ([module:AWT.Shape](/module/awt#shape)) — The Shape to compare against

**Returns**

- `boolean`

<MemberHeading id="clone" depth="3" name="clone" sig="clone(): module:AWT.Rectangle" />

<MemberMeta sourceHref="/source/awt-js/#L1113" sourceLabel="AWT.js:1113" />

_Inherited from `module:AWT.Rectangle#clone`_

**Overrides:&#x20;**`module:AWT.Rectangle#clone`

Clones this Rectangle

**Returns**

- [`module:AWT.Rectangle`](/module/awt#rectangle)

<MemberHeading id="scaleby" depth="3" name="scaleBy" sig="scaleBy(delta: Point | Dimension): module:AWT.Rectangle" />

<MemberMeta sourceHref="/source/awt-js/#L1122" sourceLabel="AWT.js:1122" />

_Inherited from `module:AWT.Rectangle#scaleBy`_

**Overrides:&#x20;**`module:AWT.Rectangle#scaleBy`

Multiplies the dimension of the Shape by the specified `delta` amount.

**Parameters**

- `delta` ([Point](/module/awt#point) | [Dimension](/module/awt#dimension)) — Object containing the X and Y ratio to be scaled.

**Returns**

- [`module:AWT.Rectangle`](/module/awt#rectangle)

<MemberHeading id="grow" depth="3" name="grow" sig="grow(dx: number, dy: number): module:AWT.Rectangle" />

<MemberMeta sourceHref="/source/awt-js/#L1134" sourceLabel="AWT.js:1134" />

_Inherited from `module:AWT.Rectangle#grow`_

**Overrides:&#x20;**`module:AWT.Rectangle#grow`

Expands the boundaries of this shape. This affects the current position and dimension.

**Parameters**

- `dx` (number) — The amount to grow (or decrease) in horizontal direction
- `dy` (number) — The amount to grow (or decrease) in vertical direction

**Returns**

- [`module:AWT.Rectangle`](/module/awt#rectangle)

<MemberHeading id="getoppositevertex" depth="3" name="getOppositeVertex" sig="getOppositeVertex(): module:AWT.Point" />

<MemberMeta sourceHref="/source/awt-js/#L1146" sourceLabel="AWT.js:1146" />

_Inherited from `module:AWT.Rectangle#getOppositeVertex`_

**Overrides:&#x20;**`module:AWT.Rectangle#getOppositeVertex`

Gets the [module:AWT.Point](/module/awt#point) corresponding to the lower-right vertex of the Rectangle.

**Returns**

- [`module:AWT.Point`](/module/awt#point)

<MemberHeading id="add" depth="3" name="add" sig="add(shape: module:AWT.Shape): module:AWT.Rectangle" />

<MemberMeta sourceHref="/source/awt-js/#L1155" sourceLabel="AWT.js:1155" />

_Inherited from `module:AWT.Rectangle#add`_

**Overrides:&#x20;**`module:AWT.Rectangle#add`

Adds the boundaries of another shape to the current one

**Parameters**

- `shape` ([module:AWT.Shape](/module/awt#shape)) — The [module:AWT.Shape](/module/awt#shape) to be added

**Returns**

- [`module:AWT.Rectangle`](/module/awt#rectangle)

<MemberHeading id="getcoords" depth="3" name="getCoords" sig="getCoords(): string" />

<MemberMeta sourceHref="/source/awt-js/#L1222" sourceLabel="AWT.js:1222" />

_Inherited from `module:AWT.Rectangle#getCoords`_

**Overrides:&#x20;**`module:AWT.Rectangle#getCoords`

Gets a string with the co-ordinates of the upper-left and lower-right vertexs of this rectangle,\
(with values rounded to int)

**Returns**

- `string`

<MemberHeading id="getattributes" depth="3" name="getAttributes" sig="getAttributes(): object" />

<MemberMeta sourceHref="/source/awt-js/#L1232" sourceLabel="AWT.js:1232" />

_Inherited from `module:AWT.Rectangle#getAttributes`_

**Overrides:&#x20;**`module:AWT.Rectangle#getAttributes`

Gets a object with the basic attributes needed to rebuild this instance excluding functions,\
parent references, constants and also attributes retaining the default value.\
The resulting object is commonly usued to serialize elements in JSON format.

**Returns**

- `object`

<MemberHeading id="setattributes" depth="3" name="setAttributes" sig="setAttributes(data: object): module:AWT.Rectangle" />

<MemberMeta sourceHref="/source/awt-js/#L1241" sourceLabel="AWT.js:1241" />

_Inherited from `module:AWT.Rectangle#setAttributes`_

**Overrides:&#x20;**`module:AWT.Rectangle#setAttributes`

Reads the properties of this Rectangle from a data object

**Parameters**

- `data` (object) — The data object to be parsed

**Returns**

- [`module:AWT.Rectangle`](/module/awt#rectangle)

<MemberHeading id="contains" depth="3" name="contains" sig="contains(p: module:AWT.Point): boolean" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L173" sourceLabel="AbstractBox.js:173" />

_Inherited from `module:AWT.Shape#contains`_

**Overrides:&#x20;**`module:AWT.Rectangle#contains`

Check if this box contains the specified point

**Parameters**

- `p` ([module:AWT.Point](/module/awt#point)) — The point to be checked

**Returns**

- `boolean`

<MemberHeading id="intersects" depth="3" name="intersects" sig="intersects(_r: module:AWT.Rectangle): boolean" />

<MemberMeta sourceHref="/source/awt-js/#L902" sourceLabel="AWT.js:902" />

_Inherited from `module:AWT.Shape#intersects`_

**Overrides:&#x20;**`module:AWT.Rectangle#intersects`

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

**Overrides:&#x20;**`module:AWT.Rectangle#fill`

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

**Overrides:&#x20;**`module:AWT.Rectangle#stroke`

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

**Overrides:&#x20;**`module:AWT.Rectangle#preparePath`

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

**Overrides:&#x20;**`module:AWT.Rectangle#clip`

Creates a clipping region on the specified HTML canvas 2D rendering context

**Parameters**

- `ctx` ([external:CanvasRenderingContext2D](/module/utils#canvasrenderingcontext2d)) — The rendering context
- `fillRule` (string, optional, default: "'nonzero'") — Can be 'nonzero' (default when not set) or 'evenodd'

**Returns**

- [`external:CanvasRenderingContext2D`](/module/utils#canvasrenderingcontext2d)

<MemberHeading id="isrect" depth="3" name="isRect" sig="isRect(): boolean" />

<MemberMeta sourceHref="/source/awt-js/#L967" sourceLabel="AWT.js:967" />

_Inherited from `module:AWT.Shape#isRect`_

**Overrides:&#x20;**`module:AWT.Rectangle#isRect`

Shorthand method for determining if a Shape is an [Rectangle](/module/awt#rectangle)

**Returns**

- `boolean`

<MemberHeading id="tostring" depth="3" name="toString" sig="toString(): string" />

<MemberMeta sourceHref="/source/awt-js/#L975" sourceLabel="AWT.js:975" />

_Inherited from `module:AWT.Shape#toString`_

**Overrides:&#x20;**`module:AWT.Rectangle#toString`

Overwrites the original 'Object.toString' method with a more descriptive text

**Returns**

- `string`

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

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L186" sourceLabel="AbstractBox.js:186" />

_Inherited from `module:boxes/AbstractBox.AbstractBox#setBounds`_

**Overrides:&#x20;**`module:AWT.Rectangle#setBounds`

Sets a new size and/or dimension to this box

**Parameters**

- `rect` ([AWT.Rectangle](/module/awt#rectangle) | number) — An AWT.Rectangle object, or the `x` coordinate of the\
  upper-left corner of a new rectangle.
- `y` (number, optional) — `y` coordinate of the upper-left corner of the new rectangle.
- `w` (number, optional) — Width of the new rectangle.
- `h` (number, optional) — Height of the new rectangle.

**Returns**

- [`module:AWT.Rectangle`](/module/awt#rectangle)

<MemberHeading id="contains" depth="3" name="contains" sig="contains(p: module:AWT.Point): boolean" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L173" sourceLabel="AbstractBox.js:173" />

_Inherited from `module:AWT.Shape#contains`_

**Overrides:&#x20;**`module:AWT.Rectangle#contains`

Check if this box contains the specified point

**Parameters**

- `p` ([module:AWT.Point](/module/awt#point)) — The point to be checked

**Returns**

- `boolean`

## Static Methods

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

<MemberHeading id="parent" depth="3" name="parent" sig="parent: module:boxes/AbstractBox.AbstractBox" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L605" sourceLabel="AbstractBox.js:605" />

The parent AbstractBox (can be `null`)

<MemberHeading id="container" depth="3" name="container" sig="container: module:AWT.Container" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L610" sourceLabel="AbstractBox.js:610" />

The Container to which this AbstractBox belongs

<MemberHeading id="boxbase" depth="3" name="boxBase" sig="boxBase: module:boxes/BoxBase.BoxBase" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L616" sourceLabel="AbstractBox.js:616" />

The [BoxBase](/module/boxes-boxbase#boxbase) related to this AbstractBox. When `null`, the parent can provide an\
alternative one.

<MemberHeading id="border" depth="3" name="border" sig="border: boolean" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L621" sourceLabel="AbstractBox.js:621" />

Whether this box has a border or not

<MemberHeading id="shape" depth="3" name="shape" sig="shape: module:AWT.Shape" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L626" sourceLabel="AbstractBox.js:626" />

The shape of this box (the box Rectangle or a special Shape, if set)

<MemberHeading id="specialshape" depth="3" name="specialShape" sig="specialShape: boolean" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L631" sourceLabel="AbstractBox.js:631" />

Whether this box has a shape that is not a rectangle

<MemberHeading id="visible" depth="3" name="visible" sig="visible: boolean" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L636" sourceLabel="AbstractBox.js:636" />

Whether this box is visible or not

<MemberHeading id="temporaryhidden" depth="3" name="temporaryHidden" sig="temporaryHidden: boolean" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L641" sourceLabel="AbstractBox.js:641" />

Used to temporary hide a box while other drawing operations are done

<MemberHeading id="tmptrans" depth="3" name="tmpTrans" sig="tmpTrans: boolean" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L646" sourceLabel="AbstractBox.js:646" />

Cells with this attribute will be transparent but with painted border

<MemberHeading id="inactive" depth="3" name="inactive" sig="inactive: boolean" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L651" sourceLabel="AbstractBox.js:651" />

Whether this box is active or inactive

<MemberHeading id="inverted" depth="3" name="inverted" sig="inverted: boolean" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L656" sourceLabel="AbstractBox.js:656" />

Whether this box must be displayed with inverted or regular colors

<MemberHeading id="alternative" depth="3" name="alternative" sig="alternative: boolean" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L661" sourceLabel="AbstractBox.js:661" />

Whether this box must be displayed with alternative or regular color and font settings

<MemberHeading id="marked" depth="3" name="marked" sig="marked: boolean" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L666" sourceLabel="AbstractBox.js:666" />

Whether this box is marked (selected) or not

<MemberHeading id="focused" depth="3" name="focused" sig="focused: boolean" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L671" sourceLabel="AbstractBox.js:671" />

Whether this box holds the input focus

<MemberHeading id="accessibletext" depth="3" name="accessibleText" sig="accessibleText: string" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L676" sourceLabel="AbstractBox.js:676" />

Text to be used in accessible contexts

<MemberHeading id="role" depth="3" name="role" sig="role: string" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L681" sourceLabel="AbstractBox.js:681" />

Describes the main role of this box on the activity. Useful in wai-aria descriptions.

<MemberHeading id="accessibleelement" depth="3" name="$accessibleElement" sig="$accessibleElement: external:jQuery" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L686" sourceLabel="AbstractBox.js:686" />

DOM element used to display this cell content in wai-aria contexts

<MemberHeading id="accessiblealwaysactive" depth="3" name="accessibleAlwaysActive" sig="accessibleAlwaysActive: boolean" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L691" sourceLabel="AbstractBox.js:691" />

Flag indicating that $accessibleElement should be always active

<MemberHeading id="hostedcomponent" depth="3" name="$hostedComponent" sig="$hostedComponent: external:jQuery" />

<MemberMeta sourceHref="/source/boxes/abstractbox-js/#L696" sourceLabel="AbstractBox.js:696" />

An external JQuery DOM element hosted by this box

<MemberHeading id="type" depth="3" name="type" sig="type: string" />

<MemberMeta sourceHref="/source/awt-js/#L1255" sourceLabel="AWT.js:1255" />

_Inherited from `module:AWT.Rectangle#type`_

**Overrides:&#x20;**`module:AWT.Rectangle#type`

Shape type id

<MemberHeading id="dim" depth="3" name="dim" sig="dim: module:AWT.Dimension" />

<MemberMeta sourceHref="/source/awt-js/#L1260" sourceLabel="AWT.js:1260" />

_Inherited from `module:AWT.Rectangle#dim`_

**Overrides:&#x20;**`module:AWT.Rectangle#dim`

The [Dimension](/module/awt#dimension) of the Rectangle

<MemberHeading id="pos" depth="3" name="pos" sig="pos: module:AWT.Point" />

<MemberMeta sourceHref="/source/awt-js/#L1019" sourceLabel="AWT.js:1019" />

_Inherited from `module:AWT.Shape#pos`_

**Overrides:&#x20;**`module:AWT.Rectangle#pos`

The current position of the shape
