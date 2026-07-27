---
title: ActiveBox
kind: class
longname: module:boxes/ActiveBox.ActiveBox
description: "Objects of this class are widely used in JClic activities: cells in puzzles and associations, messages and other objects are active boxes. The specific content, size and location of ActiveBox objects is determined by its {@link module:boxes/ActiveBoxContent.ActiveBoxContent ActiveBoxContent} member. Most ActiveBoxes have only one content, but some of them can have a secondary or &quot;alternative&quot; content stored in the altContent field. This content is used only when the alternative flag of the ActiveBox is on . Active boxes can host video and interactive media content (specified in the mediaContent member of the {@link module:boxes/ActiveBoxContent.ActiveBoxContent ActiveBoxContent} through its hostedMediaPlayer member."
---

# ActiveBox

**Extends:&#x20;**[`module:boxes/AbstractBox.AbstractBox`](/module/boxes-abstractbox#abstractbox)

<SourceLink href="/source/boxes/activebox-js/#L52" label="ActiveBox.js:52" />

Objects of this class are widely used in JClic activities: cells in puzzles and associations,\
messages and other objects are active boxes.

The specific content, size and location of `ActiveBox` objects is determined by its\
[ActiveBoxContent](/module/boxes-activeboxcontent#activeboxcontent) member. Most ActiveBoxes have only one content, but some of them can\
have a secondary or "alternative" content stored in the `altContent` field. This content is\
used only when the `alternative` flag of the ActiveBox is `on`.

Active boxes can host video and interactive media content (specified in the `mediaContent`\
member of the [ActiveBoxContent](/module/boxes-activeboxcontent#activeboxcontent) through its `hostedMediaPlayer` member.

---

## Constructor

<Signature
  code="new ActiveBox(
	parent?: module:boxes/AbstractBox.AbstractBox,
	container?: module:AWT.Container,
	boxBase?: module:boxes/BoxBase.BoxBase,
	setIdLoc?: number,
	rect?: module:AWT.Rectangle,
): ActiveBox"
/>

ActiveBox constructor

**Parameters**

- `parent` ([module:boxes/AbstractBox.AbstractBox](/module/boxes-abstractbox#abstractbox), optional) — The AbstractBox to which this ActiveBox belongs
- `container` ([module:AWT.Container](/module/awt#container), optional) — The container where this box is placed.
- `boxBase` ([module:boxes/BoxBase.BoxBase](/module/boxes-boxbase#boxbase), optional) — The object where colors, fonts, border and other graphic properties\
  of this box are defined.
- `setIdLoc` (number, optional) — A numeric identifier, used to locate this box in a set of sibling objects.
- `rect` ([module:AWT.Rectangle](/module/awt#rectangle), optional) — The initial bounds of the box.

---

## Instance Methods

<MemberHeading
  id="getcurrentcontent"
  depth="3"
  name="getCurrentContent"
  sig="getCurrentContent(
): module:boxes/ActiveBoxContent.ActiveBoxContent"
/>

<MemberMeta sourceHref="/source/boxes/activebox-js/#L106" sourceLabel="ActiveBox.js:106" />

Returns the current content used by the box

**Returns**

- [`module:boxes/ActiveBoxContent.ActiveBoxContent`](/module/boxes-activeboxcontent#activeboxcontent)

<MemberHeading id="getcontent" depth="3" name="getContent" sig="getContent(): module:boxes/ActiveBoxContent.ActiveBoxContent" />

<MemberMeta sourceHref="/source/boxes/activebox-js/#L114" sourceLabel="ActiveBox.js:114" />

Returns the current content, creating an empty one if needed.

**Returns**

- [`module:boxes/ActiveBoxContent.ActiveBoxContent`](/module/boxes-activeboxcontent#activeboxcontent)

<MemberHeading id="clear" depth="3" name="clear" sig="clear()" />

<MemberMeta sourceHref="/source/boxes/activebox-js/#L123" sourceLabel="ActiveBox.js:123" />

Clears the current content

<MemberHeading
  id="isequivalent"
  depth="3"
  name="isEquivalent"
  sig="isEquivalent(
	bx: module:boxes/ActiveBox.ActiveBox,
	checkCase?: boolean,
): boolean"
/>

<MemberMeta sourceHref="/source/boxes/activebox-js/#L144" sourceLabel="ActiveBox.js:144" />

Checks if two ActiveBox objects have equivalent content

**Parameters**

- `bx` ([module:boxes/ActiveBox.ActiveBox](/module/boxes-activebox#activebox)) — The ActiveBox to check against this.
- `checkCase` (boolean, optional) — When `true`, the comparing will be case-sensitive.

**Returns**

- `boolean`

<MemberHeading
  id="iscurrentcontentequivalent"
  depth="3"
  name="isCurrentContentEquivalent"
  sig="isCurrentContentEquivalent(
	bx: module:boxes/ActiveBox.ActiveBox,
	checkCase?: boolean,
): boolean"
/>

<MemberMeta sourceHref="/source/boxes/activebox-js/#L156" sourceLabel="ActiveBox.js:156" />

Same functionality as [isEquivalent](/module/boxes-activebox/activebox#isequivalent), but comparing the current content.

**Parameters**

- `bx` ([module:boxes/ActiveBox.ActiveBox](/module/boxes-activebox#activebox)) — The ActiveBox to check against this.
- `checkCase` (boolean, optional) — When `true`, the comparing will be case-sensitive.

**Returns**

- `boolean`

<MemberHeading id="exchangelocation" depth="3" name="exchangeLocation" sig="exchangeLocation(bx: module:boxes/ActiveBox.ActiveBox)" />

<MemberMeta sourceHref="/source/boxes/activebox-js/#L166" sourceLabel="ActiveBox.js:166" />

Swaps the location of two active boxes

**Parameters**

- `bx` ([module:boxes/ActiveBox.ActiveBox](/module/boxes-activebox#activebox)) — The ActiveBox to swap with this one.

<MemberHeading id="copycontent" depth="3" name="copyContent" sig="copyContent(bx: module:boxes/ActiveBox.ActiveBox)" />

<MemberMeta sourceHref="/source/boxes/activebox-js/#L180" sourceLabel="ActiveBox.js:180" />

Copy the content of another ActiveBox into this one

**Parameters**

- `bx` ([module:boxes/ActiveBox.ActiveBox](/module/boxes-activebox#activebox)) — The ActiveBox from which to take the content

<MemberHeading id="exchangecontent" depth="3" name="exchangeContent" sig="exchangeContent(bx: module:boxes/ActiveBox.ActiveBox)" />

<MemberMeta sourceHref="/source/boxes/activebox-js/#L208" sourceLabel="ActiveBox.js:208" />

Exhanges the content of this ActiveBox with another one

**Parameters**

- `bx` ([module:boxes/ActiveBox.ActiveBox](/module/boxes-activebox#activebox)) — The ActiveBox with which to exchange the content.

<MemberHeading id="settextcontent" depth="3" name="setTextContent" sig="setTextContent(tx: string)" />

<MemberMeta sourceHref="/source/boxes/activebox-js/#L220" sourceLabel="ActiveBox.js:220" />

Sets the text content of this ActiveBox.

**Parameters**

- `tx` (string) — The text to set.

<MemberHeading id="setdefaultidass" depth="3" name="setDefaultIdAss" sig="setDefaultIdAss()" />

<MemberMeta sourceHref="/source/boxes/activebox-js/#L242" sourceLabel="ActiveBox.js:242" />

Sets the default value to `idAss`

<MemberHeading id="isatplace" depth="3" name="isAtPlace" sig="isAtPlace(): boolean" />

<MemberMeta sourceHref="/source/boxes/activebox-js/#L250" sourceLabel="ActiveBox.js:250" />

Checks if this ActiveBox is at its original place.

**Returns**

- `boolean`

<MemberHeading id="setcontent" depth="3" name="setContent" sig="setContent(abc: ActiveBoxContent | ActiveBagContent, i: number)" />

<MemberMeta sourceHref="/source/boxes/activebox-js/#L260" sourceLabel="ActiveBox.js:260" />

Sets the [ActiveBoxContent](/module/boxes-activeboxcontent#activeboxcontent) of this ActiveBox

**Parameters**

- `abc` ([ActiveBoxContent](/module/boxes-activeboxcontent#activeboxcontent) | [ActiveBagContent](/module/boxes-activebagcontent#activebagcontent)) — Object containing the content to set.
- `i` (number) — When `abc` is an [ActiveBagContent](/module/boxes-activebagcontent#activebagcontent), this field indicates an\
  index in the content array.

<MemberHeading
  id="setaltcontent"
  depth="3"
  name="setAltContent"
  sig="setAltContent(
	abc: ActiveBoxContent | ActiveBagContent,
	i: number,
)"
/>

<MemberMeta sourceHref="/source/boxes/activebox-js/#L325" sourceLabel="ActiveBox.js:325" />

Sets the [ActiveBoxContent](/module/boxes-activeboxcontent#activeboxcontent) that will act as an alternative content (`altContent` field)\
of this ActiveBox,

**Parameters**

- `abc` ([ActiveBoxContent](/module/boxes-activeboxcontent#activeboxcontent) | [ActiveBagContent](/module/boxes-activebagcontent#activebagcontent)) — Object containing the content to set.
- `i` (number) — When `abc` is an [ActiveBagContent](/module/boxes-activebagcontent#activebagcontent), this field indicates an\
  index in the content array.

<MemberHeading
  id="setcurrentcontent"
  depth="3"
  name="setCurrentContent"
  sig="setCurrentContent(
	abc: module:boxes/ActiveBoxContent.ActiveBoxContent,
)"
/>

<MemberMeta sourceHref="/source/boxes/activebox-js/#L347" sourceLabel="ActiveBox.js:347" />

Sets the current content of this ActiveBox

**Parameters**

- `abc` ([module:boxes/ActiveBoxContent.ActiveBoxContent](/module/boxes-activeboxcontent#activeboxcontent)) — The content to set.

<MemberHeading id="switchtoalt" depth="3" name="switchToAlt" sig="switchToAlt()" />

<MemberMeta sourceHref="/source/boxes/activebox-js/#L358" sourceLabel="ActiveBox.js:358" />

Puts this ActiveBox in "alternative" mode, meaning that `altContent` will be used instead of `content`

<MemberHeading id="checkhostedcomponent" depth="3" name="checkHostedComponent" sig="checkHostedComponent()" />

<MemberMeta sourceHref="/source/boxes/activebox-js/#L378" sourceLabel="ActiveBox.js:378" />

Checks the presence of content susceptible to be treated as HTML DOM embedded in this ActiveBox.

- **See:**
  - [https://developer.mozilla.org/en-US/docs/Web/API/Canvas\_API/Drawing\_DOM\_objects\_into\_a\_canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Drawing_DOM_objects_into_a_canvas)

<MemberHeading id="checkautostartmedia" depth="3" name="checkAutoStartMedia" sig="checkAutoStartMedia()" />

<MemberMeta sourceHref="/source/boxes/activebox-js/#L391" sourceLabel="ActiveBox.js:391" />

Checks if the call has a [module:media/MediaContent.MediaContent](/module/media-mediacontent#mediacontent) set to `autostart`, and launches it when found.

<MemberHeading
  id="updatecontent"
  depth="3"
  name="updateContent"
  sig="updateContent(
	ctx: external:CanvasRenderingContext2D,
	dirtyRegion?: module:AWT.Rectangle,
)"
/>

<MemberMeta sourceHref="/source/boxes/activebox-js/#L405" sourceLabel="ActiveBox.js:405" />

Draws the content of this Activebox on the specified canvas context.

**Parameters**

- `ctx` ([external:CanvasRenderingContext2D](/module/utils#canvasrenderingcontext2d)) — The canvas rendering context used to draw the\
  box content.
- `dirtyRegion` ([module:AWT.Rectangle](/module/awt#rectangle), optional) — The area that must be repainted. `null` refers to the whole box.

<MemberHeading id="focusaccessibleelement" depth="3" name="_focusAccessibleElement" sig="_focusAccessibleElement(ctx: external:CanvasRenderingContext2D)" />

<MemberMeta sourceHref="/source/boxes/activebox-js/#L589" sourceLabel="ActiveBox.js:589" />

Draw focus on accessible element if needed

**Parameters**

- `ctx` ([external:CanvasRenderingContext2D](/module/utils#canvasrenderingcontext2d)) — The canvas rendering context used to draw the\
  box content.

<MemberHeading id="getdescription" depth="3" name="getDescription" sig="getDescription(): string" />

<MemberMeta sourceHref="/source/boxes/activebox-js/#L601" sourceLabel="ActiveBox.js:601" />

Gets the `description` field of the current [ActiveBoxContent](/module/boxes-activeboxcontent#activeboxcontent)

**Returns**

- `string`

<MemberHeading id="tostring" depth="3" name="toString" sig="toString(): string" />

<MemberMeta sourceHref="/source/boxes/activebox-js/#L609" sourceLabel="ActiveBox.js:609" />

**Overrides:&#x20;**`module:boxes/AbstractBox.AbstractBox#toString`

Gets a descriptive text for this ActiveBox

**Returns**

- `string`

<MemberHeading
  id="playmedia"
  depth="3"
  name="playMedia"
  sig="playMedia(
	ps: module:JClicPlayer.JClicPlayer,
	delayedActions: Array.<function()>,
)"
/>

<MemberMeta sourceHref="/source/boxes/activebox-js/#L618" sourceLabel="ActiveBox.js:618" />

Plays the action or media associated with this ActiveBox

**Parameters**

- `ps` ([module:JClicPlayer.JClicPlayer](/module/jclicplayer#jclicplayer)) — Usually, a [JClicPlayer](/module/jclicplayer#jclicplayer)
- `delayedActions` (Array.\<function()>, default: null) — If set, store the the action in this array for future execution

<MemberHeading
  id="sethostedmediaplayer"
  depth="3"
  name="setHostedMediaPlayer"
  sig="setHostedMediaPlayer(
	amp: module:media/ActiveMediaPlayer.ActiveMediaPlayer,
)"
/>

<MemberMeta sourceHref="/source/boxes/activebox-js/#L632" sourceLabel="ActiveBox.js:632" />

Sets the hosted media player of this ActiveBox

**Parameters**

- `amp` ([module:media/ActiveMediaPlayer.ActiveMediaPlayer](/module/media-activemediaplayer#activemediaplayer)) — The media player.

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

<MemberMeta sourceHref="/source/boxes/activebox-js/#L650" sourceLabel="ActiveBox.js:650" />

Sets a new size and/or dimension to this box.

**Parameters**

- `rect` ([AWT.Rectangle](/module/awt#rectangle) | number) — An AWT.Rectangle object, or the `x` coordinate of the\
  upper-left corner of a new rectangle.
- `y` (number, optional) — `y` coordinate of the upper-left corner of the new rectangle.
- `w` (number, optional) — Width of the new rectangle.
- `h` (number, optional) — Height of the new rectangle.

<MemberHeading id="sethostedcomponentbounds" depth="3" name="setHostedComponentBounds" sig="setHostedComponentBounds(sizeChanged: boolean)" />

<MemberMeta sourceHref="/source/boxes/activebox-js/#L668" sourceLabel="ActiveBox.js:668" />

Places and resizes [$hostedComponent](/module/boxes-abstractbox/abstractbox#hostedcomponent), based on the size\
and position of this box.

**Parameters**

- `sizeChanged` (boolean) — `true` when this [ActiveBox](/module/boxes-activebox#activebox) has changed its size

<MemberHeading
  id="buildaccessibleelement"
  depth="3"
  name="buildAccessibleElement"
  sig="buildAccessibleElement(
	$canvas: external:jQuery,
	$clickReceiver: external:jQuery,
	$canvasGroup?: external:jQuery,
	eventType?: string,
): external:jQuery"
/>

<MemberMeta sourceHref="/source/boxes/activebox-js/#L713" sourceLabel="ActiveBox.js:713" />

Builds a hidden `buton` that will act as a accessible element associated to the canvas area\
of this ActiveBox.\
The button will be created only when `CanvasRenderingContext2D` has a method named `addHitRegion`.\
See https\://developer.mozilla.org/en-US/docs/Web/API/Canvas\_API/Tutorial/Hit\_regions\_and\_accessibility\
for more information and supported browsers.

**Parameters**

- `$canvas` ([external:jQuery](/module/utils#jquery)) — The `canvas` where this `ActiveBox` will deploy, wrapped up in a jQuery object
- `$clickReceiver` ([external:jQuery](/module/utils#jquery)) — The DOM element that will be notified when `$accessibleElement` is activated.
- `$canvasGroup` ([external:jQuery](/module/utils#jquery), optional) — Optional DOM element containing the accessible element. Useful to group cells in associations. When `null`, the element belongs to $canvas.
- `eventType` (string, optional) — Type of event sent to $clickReceiver. Default is `click`.

**Returns**

- [`external:jQuery`](/module/utils#jquery)

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
	y?: number,
	w?: number,
	h?: number,
): module:AWT.Rectangle"
/>

<MemberMeta sourceHref="/source/boxes/activebox-js/#L650" sourceLabel="ActiveBox.js:650" />

_Inherited from `module:boxes/ActiveBox.ActiveBox#setBounds`_

**Overrides:&#x20;**`module:boxes/AbstractBox.AbstractBox#setBounds`

Sets a new size and/or dimension to this box.

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

<MemberMeta sourceHref="/source/boxes/activebox-js/#L405" sourceLabel="ActiveBox.js:405" />

_Inherited from `module:boxes/ActiveBox.ActiveBox#updateContent`_

**Overrides:&#x20;**`module:boxes/AbstractBox.AbstractBox#updateContent`

Draws the content of this Activebox on the specified canvas context.

**Parameters**

- `ctx` ([external:CanvasRenderingContext2D](/module/utils#canvasrenderingcontext2d)) — The canvas rendering context used to draw the\
  box content.
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

<MemberHeading id="sethostedcomponentbounds" depth="3" name="setHostedComponentBounds" sig="setHostedComponentBounds(sizeChanged: boolean)" />

<MemberMeta sourceHref="/source/boxes/activebox-js/#L668" sourceLabel="ActiveBox.js:668" />

_Inherited from `module:boxes/ActiveBox.ActiveBox#setHostedComponentBounds`_

**Overrides:&#x20;**`module:boxes/AbstractBox.AbstractBox#setHostedComponentBounds`

Places and resizes [$hostedComponent](/module/boxes-abstractbox/abstractbox#hostedcomponent), based on the size\
and position of this box.

**Parameters**

- `sizeChanged` (boolean) — `true` when this [ActiveBox](/module/boxes-activebox#activebox) has changed its size

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

<MemberMeta sourceHref="/source/boxes/activebox-js/#L650" sourceLabel="ActiveBox.js:650" />

_Inherited from `module:boxes/ActiveBox.ActiveBox#setBounds`_

**Overrides:&#x20;**`module:boxes/AbstractBox.AbstractBox#setBounds`

Sets a new size and/or dimension to this box.

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

<MemberMeta sourceHref="/source/boxes/activebox-js/#L405" sourceLabel="ActiveBox.js:405" />

_Inherited from `module:boxes/ActiveBox.ActiveBox#updateContent`_

**Overrides:&#x20;**`module:boxes/AbstractBox.AbstractBox#updateContent`

Draws the content of this Activebox on the specified canvas context.

**Parameters**

- `ctx` ([external:CanvasRenderingContext2D](/module/utils#canvasrenderingcontext2d)) — The canvas rendering context used to draw the\
  box content.
- `dirtyRegion` ([module:AWT.Rectangle](/module/awt#rectangle), optional) — The area that must be repainted. `null` refers to the whole box.

<MemberHeading id="sethostedcomponentbounds" depth="3" name="setHostedComponentBounds" sig="setHostedComponentBounds(sizeChanged: boolean)" />

<MemberMeta sourceHref="/source/boxes/activebox-js/#L668" sourceLabel="ActiveBox.js:668" />

_Inherited from `module:boxes/ActiveBox.ActiveBox#setHostedComponentBounds`_

**Overrides:&#x20;**`module:boxes/AbstractBox.AbstractBox#setHostedComponentBounds`

Places and resizes [$hostedComponent](/module/boxes-abstractbox/abstractbox#hostedcomponent), based on the size\
and position of this box.

**Parameters**

- `sizeChanged` (boolean) — `true` when this [ActiveBox](/module/boxes-activebox#activebox) has changed its size

## Static Methods

<MemberHeading
  id="createcell"
  depth="3"
  name="createCell"
  sig="createCell(
	$dom: external:jQuery,
	abc: module:boxes/ActiveBoxContent.ActiveBoxContent,
): module:boxes/ActiveBox.ActiveBox"
/>

<MemberMeta badges="static" sourceHref="/source/boxes/activebox-js/#L82" sourceLabel="ActiveBox.js:82" />

Factory constructor that creates a new cell inside a JQuery DOM element.

**Parameters**

- `$dom` ([external:jQuery](/module/utils#jquery)) — The DOM element that will act as a container
- `abc` ([module:boxes/ActiveBoxContent.ActiveBoxContent](/module/boxes-activeboxcontent#activeboxcontent)) — The cell's content. Must not be null and have the `dimension`\
  member initialized.

**Returns**

- [`module:boxes/ActiveBox.ActiveBox`](/module/boxes-activebox#activebox)

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

<MemberHeading id="idorder" depth="3" name="idOrder" sig="idOrder: number" />

<MemberMeta sourceHref="/source/boxes/activebox-js/#L764" sourceLabel="ActiveBox.js:764" />

Identifier used to set the relative position of this box in a set.

<MemberHeading id="idloc" depth="3" name="idLoc" sig="idLoc: number" />

<MemberMeta sourceHref="/source/boxes/activebox-js/#L769" sourceLabel="ActiveBox.js:769" />

Identifier used to set a relative position in the space.

<MemberHeading id="idass" depth="3" name="idAss" sig="idAss: number" />

<MemberMeta sourceHref="/source/boxes/activebox-js/#L774" sourceLabel="ActiveBox.js:774" />

Identifier used to establish relationships between cells of different sets (in associations)

<MemberHeading id="pos0" depth="3" name="pos0" sig="pos0: module:AWT.Point" />

<MemberMeta sourceHref="/source/boxes/activebox-js/#L779" sourceLabel="ActiveBox.js:779" />

Backup of the original position of the cell, useful when the real position must be restored after a temporary change.

<MemberHeading id="content" depth="3" name="content" sig="content: module:boxes/ActiveBoxContent.ActiveBoxContent" />

<MemberMeta sourceHref="/source/boxes/activebox-js/#L784" sourceLabel="ActiveBox.js:784" />

Main content of this box

<MemberHeading id="altcontent" depth="3" name="altContent" sig="altContent: module:boxes/ActiveBoxContent.ActiveBoxContent" />

<MemberMeta sourceHref="/source/boxes/activebox-js/#L789" sourceLabel="ActiveBox.js:789" />

Alternative content of this box

<MemberHeading id="hostedcomponent" depth="3" name="hostedComponent" sig="hostedComponent: boolean" />

<MemberMeta sourceHref="/source/boxes/activebox-js/#L794" sourceLabel="ActiveBox.js:794" />

Flag to check if this box has a 'hosted component'

<MemberHeading id="hostedmediaplayer" depth="3" name="hostedMediaPlayer" sig="hostedMediaPlayer: module:media/ActiveMediaPlayer.ActiveMediaPlayer" />

<MemberMeta sourceHref="/source/boxes/activebox-js/#L799" sourceLabel="ActiveBox.js:799" />

The media player associated to this box

<MemberHeading id="isbackground" depth="3" name="isBackground" sig="isBackground: boolean" />

<MemberMeta sourceHref="/source/boxes/activebox-js/#L804" sourceLabel="ActiveBox.js:804" />

Indicates that this box is used as a background. When drawing, the clipping region must be respected.

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
