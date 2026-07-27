---
title: ActivityPanel
kind: class
longname: module:Activity.ActivityPanel
description: This object is responsible for rendering the contents of the activity on the screen and managing user's interaction. Each type of Activity must implement its own ActivityPanel . In JClic, {@link http://projectestac.github.io/jclic/apidoc/edu/xtec/jclic/Activity.Panel.html Activity.Panel} extends {@link http://docs.oracle.com/javase/7/docs/api/javax/swing/JPanel.html javax.swing.JPanel}. On this implementation, the JPanel will be replaced by an HTML div tag.
---

# ActivityPanel

**Extends:&#x20;**[`module:AWT.Container`](/module/awt#container)

<SourceLink href="/source/activity-js/#L868" label="Activity.js:868" />

This object is responsible for rendering the contents of the activity on the screen and\
managing user's interaction.\
Each type of Activity must implement its own `ActivityPanel`.\
In JClic, [Activity.Panel](http://projectestac.github.io/jclic/apidoc/edu/xtec/jclic/Activity.Panel.html)\
extends [javax.swing.JPanel](http://docs.oracle.com/javase/7/docs/api/javax/swing/JPanel.html).\
On this implementation, the JPanel will be replaced by an HTML `div` tag.

---

## Constructor

<Signature
  code="new ActivityPanel(
	act: module:Activity.Activity,
	ps: module:JClicPlayer.JClicPlayer,
	$div?: external:jQuery,
): ActivityPanel"
/>

ActivityPanel constructor

**Parameters**

- `act` ([module:Activity.Activity](/module/activity#activity)) — The [Activity](/module/activity#activity) to which this Panel belongs
- `ps` ([module:JClicPlayer.JClicPlayer](/module/jclicplayer#jclicplayer)) — Any object implementing the methods defined in the\
  [PlayStation](http://projectestac.github.io/jclic/apidoc/edu/xtec/jclic/PlayStation.html)\
  Java interface.
- `$div` ([external:jQuery](/module/utils#jquery), optional) — The jQuery DOM element where this Panel will deploy

---

## Instance Methods

<MemberHeading id="setbounds" depth="3" name="setBounds" sig="setBounds(rect: module:AWT.Rectangle)" />

<MemberMeta sourceHref="/source/activity-js/#L895" sourceLabel="Activity.js:895" />

**Overrides:&#x20;**`module:AWT.Container#setBounds`

Sets the size and position of this activity panel

**Parameters**

- `rect` ([module:AWT.Rectangle](/module/awt#rectangle))

<MemberHeading id="buildvisualcomponents" depth="3" name="buildVisualComponents" sig="buildVisualComponents()" />

<MemberMeta sourceHref="/source/activity-js/#L914" sourceLabel="Activity.js:914" />

Prepares the visual components of the activity

<MemberHeading id="updatecontent" depth="3" name="updateContent" sig="updateContent(dirtyRegion: module:AWT.Rectangle)" />

<MemberMeta sourceHref="/source/activity-js/#L960" sourceLabel="Activity.js:960" />

**Overrides:&#x20;**`module:AWT.Container#updateContent`

Activities should implement this method to update the graphic content of its panel. The method\
will be called from [module:AWT.Container#update](/module/awt/container#update) when needed.

**Parameters**

- `dirtyRegion` ([module:AWT.Rectangle](/module/awt#rectangle)) — Specifies the area to be updated. When `null`,\
  it's the whole panel.

<MemberHeading id="playevent" depth="3" name="playEvent" sig="playEvent(event: string)" />

<MemberMeta sourceHref="/source/activity-js/#L969" sourceLabel="Activity.js:969" />

Plays the specified event sound

**Parameters**

- `event` (string) — The type of event to be performed

<MemberHeading id="initactivity" depth="3" name="initActivity" sig="initActivity()" />

<MemberMeta sourceHref="/source/activity-js/#L976" sourceLabel="Activity.js:976" />

Basic initialization procedure, common to all activities.

<MemberHeading id="startactivity" depth="3" name="startActivity" sig="startActivity()" />

<MemberMeta sourceHref="/source/activity-js/#L990" sourceLabel="Activity.js:990" />

Called when the activity starts playing

<MemberHeading id="activityready" depth="3" name="activityReady" sig="activityReady()" />

<MemberMeta sourceHref="/source/activity-js/#L998" sourceLabel="Activity.js:998" />

Called by [JClicPlayer](/module/jclicplayer#jclicplayer) when this activity panel is fully visible, just after the\
initialization process.

<MemberHeading id="showhelp" depth="3" name="showHelp" sig="showHelp()" />

<MemberMeta sourceHref="/source/activity-js/#L1005" sourceLabel="Activity.js:1005" />

Displays help about the activity

<MemberHeading
  id="setdimension"
  depth="3"
  name="setDimension"
  sig="setDimension(
	maxSize: module:AWT.Dimension,
): module:AWT.Dimension"
/>

<MemberMeta sourceHref="/source/activity-js/#L1014" sourceLabel="Activity.js:1014" />

Sets the real dimension of this ActivityPanel.

**Parameters**

- `maxSize` ([module:AWT.Dimension](/module/awt#dimension)) — The maximum surface available for the activity panel

**Returns**

- [`module:AWT.Dimension`](/module/awt#dimension)

<MemberHeading id="attachevents" depth="3" name="attachEvents" sig="attachEvents()" />

<MemberMeta sourceHref="/source/activity-js/#L1023" sourceLabel="Activity.js:1023" />

Attaches the events specified in the `events` member to the `$div` member

<MemberHeading id="attachevent" depth="3" name="attachEvent" sig="attachEvent($obj: external:jQuery, evt: string)" />

<MemberMeta sourceHref="/source/activity-js/#L1035" sourceLabel="Activity.js:1035" />

Attaches a single event to the specified object

**Parameters**

- `$obj` ([external:jQuery](/module/utils#jquery)) — The object to which the event will be attached
- `evt` (string) — The event name

<MemberHeading id="processevent" depth="3" name="processEvent" sig="processEvent(event: external:Event): boolean" />

<MemberMeta sourceHref="/source/activity-js/#L1056" sourceLabel="Activity.js:1056" />

Main handler used to process mouse, touch, keyboard and edit events.

**Parameters**

- `event` ([external:Event](/module/utils#event)) — The HTML event to be processed

**Returns**

- `boolean`

<MemberHeading
  id="fitto"
  depth="3"
  name="fitTo"
  sig="fitTo(
	proposed: module:AWT.Rectangle,
	bounds: module:AWT.Rectangle,
)"
/>

<MemberMeta sourceHref="/source/activity-js/#L1066" sourceLabel="Activity.js:1066" />

Fits the panel within the `proposed` rectangle. The panel can occupy more space, but always\
not surpassing the `bounds` rectangle.

**Parameters**

- `proposed` ([module:AWT.Rectangle](/module/awt#rectangle)) — The proposed rectangle
- `bounds` ([module:AWT.Rectangle](/module/awt#rectangle)) — The maximum allowed bounds

<MemberHeading id="buildaccessiblecomponents" depth="3" name="buildAccessibleComponents" sig="buildAccessibleComponents()" />

<MemberMeta sourceHref="/source/activity-js/#L1098" sourceLabel="Activity.js:1098" />

Builds the accessible components needed for this ActivityPanel\
This method is called when all main elements are placed and visible, when the activity is ready\
to start or when resized.

<MemberHeading id="forcefinishactivity" depth="3" name="forceFinishActivity" sig="forceFinishActivity()" />

<MemberMeta sourceHref="/source/activity-js/#L1111" sourceLabel="Activity.js:1111" />

Forces the ending of the activity.

<MemberHeading id="finishactivity" depth="3" name="finishActivity" sig="finishActivity(result: boolean)" />

<MemberMeta sourceHref="/source/activity-js/#L1119" sourceLabel="Activity.js:1119" />

Ordinary ending of the activity, usually called form `processEvent`

**Parameters**

- `result` (boolean) — `true` if the activity was successfully completed, `false` otherwise

<MemberHeading id="setandplaymsg" depth="3" name="setAndPlayMsg" sig="setAndPlayMsg(msgCode: string, eventSoundsCode?: string)" />

<MemberMeta sourceHref="/source/activity-js/#L1140" sourceLabel="Activity.js:1140" />

Sets the message to be displayed in the skin message box and optionally plays a sound event.

**Parameters**

- `msgCode` (string) — Type of message (initial, final, finalError...)
- `eventSoundsCode` (string, optional) — Optional name of the event sound to be played.

<MemberHeading id="end" depth="3" name="end" sig="end()" />

<MemberMeta sourceHref="/source/activity-js/#L1150" sourceLabel="Activity.js:1150" />

Ends the activity

<MemberHeading id="clear" depth="3" name="clear" sig="clear()" />

<MemberMeta sourceHref="/source/activity-js/#L1165" sourceLabel="Activity.js:1165" />

Miscellaneous cleaning operations

<MemberHeading
  id="enablecounters"
  depth="3"
  name="enableCounters"
  sig="enableCounters(
	eTime: boolean,
	eScore: boolean,
	eActions: boolean,
)"
/>

<MemberMeta sourceHref="/source/activity-js/#L1175" sourceLabel="Activity.js:1175" />

Enables or disables the three counters (time, score and actions)

**Parameters**

- `eTime` (boolean) — Whether to enable or disable the time counter
- `eScore` (boolean) — Whether to enable or disable the score counter
- `eActions` (boolean) — Whether to enable or disable the actions counter

<MemberHeading
  id="shuffle"
  depth="3"
  name="shuffle"
  sig="shuffle(
	bg: Array.<module:boxes/ActiveBoxBag.ActiveBoxBag>,
	visible: boolean,
	fitInArea: boolean,
)"
/>

<MemberMeta sourceHref="/source/activity-js/#L1198" sourceLabel="Activity.js:1198" />

Shuffles the contents of the activity

**Parameters**

- `bg` (Array.\<[module:boxes/ActiveBoxBag.ActiveBoxBag](/module/boxes-activeboxbag#activeboxbag)>) — The sets of boxes to be shuffled
- `visible` (boolean) — The shuffle process must be animated on the screen (not yet implemented!)
- `fitInArea` (boolean) — Shuffled pieces cannot go out of the current area

<MemberHeading id="invalidate" depth="3" name="invalidate" sig="invalidate(rect: module:AWT.Rectangle)" />

<MemberMeta sourceHref="/source/awt-js/#L1994" sourceLabel="AWT.js:1994" />

_Inherited from `module:AWT.Container#invalidate`_

**Overrides:&#x20;**`module:AWT.Container#invalidate`

Adds the provided rectangle to the invalidated area.

**Parameters**

- `rect` ([module:AWT.Rectangle](/module/awt#rectangle))

<MemberHeading id="update" depth="3" name="update" sig="update()" />

<MemberMeta sourceHref="/source/awt-js/#L2008" sourceLabel="AWT.js:2008" />

_Inherited from `module:AWT.Container#update`_

**Overrides:&#x20;**`module:AWT.Container#update`

Updates the invalidated area

<MemberHeading id="getbounds" depth="3" name="getBounds" sig="getBounds(): module:AWT.Rectangle" />

<MemberMeta sourceHref="/source/awt-js/#L1081" sourceLabel="AWT.js:1081" />

_Inherited from `module:AWT.Rectangle#getBounds`_

**Overrides:&#x20;**`module:AWT.Container#getBounds`

Gets the enclosing [Rectangle](/module/awt#rectangle) of this Shape.

**Returns**

- [`module:AWT.Rectangle`](/module/awt#rectangle)

<MemberHeading id="equals" depth="3" name="equals" sig="equals(r: module:AWT.Shape): boolean" />

<MemberMeta sourceHref="/source/awt-js/#L1105" sourceLabel="AWT.js:1105" />

_Inherited from `module:AWT.Rectangle#equals`_

**Overrides:&#x20;**`module:AWT.Container#equals`

Checks if two shapes are equivalent.

**Parameters**

- `r` ([module:AWT.Shape](/module/awt#shape)) — The Shape to compare against

**Returns**

- `boolean`

<MemberHeading id="clone" depth="3" name="clone" sig="clone(): module:AWT.Rectangle" />

<MemberMeta sourceHref="/source/awt-js/#L1113" sourceLabel="AWT.js:1113" />

_Inherited from `module:AWT.Rectangle#clone`_

**Overrides:&#x20;**`module:AWT.Container#clone`

Clones this Rectangle

**Returns**

- [`module:AWT.Rectangle`](/module/awt#rectangle)

<MemberHeading id="scaleby" depth="3" name="scaleBy" sig="scaleBy(delta: Point | Dimension): module:AWT.Rectangle" />

<MemberMeta sourceHref="/source/awt-js/#L1122" sourceLabel="AWT.js:1122" />

_Inherited from `module:AWT.Rectangle#scaleBy`_

**Overrides:&#x20;**`module:AWT.Container#scaleBy`

Multiplies the dimension of the Shape by the specified `delta` amount.

**Parameters**

- `delta` ([Point](/module/awt#point) | [Dimension](/module/awt#dimension)) — Object containing the X and Y ratio to be scaled.

**Returns**

- [`module:AWT.Rectangle`](/module/awt#rectangle)

<MemberHeading id="grow" depth="3" name="grow" sig="grow(dx: number, dy: number): module:AWT.Rectangle" />

<MemberMeta sourceHref="/source/awt-js/#L1134" sourceLabel="AWT.js:1134" />

_Inherited from `module:AWT.Rectangle#grow`_

**Overrides:&#x20;**`module:AWT.Container#grow`

Expands the boundaries of this shape. This affects the current position and dimension.

**Parameters**

- `dx` (number) — The amount to grow (or decrease) in horizontal direction
- `dy` (number) — The amount to grow (or decrease) in vertical direction

**Returns**

- [`module:AWT.Rectangle`](/module/awt#rectangle)

<MemberHeading id="getoppositevertex" depth="3" name="getOppositeVertex" sig="getOppositeVertex(): module:AWT.Point" />

<MemberMeta sourceHref="/source/awt-js/#L1146" sourceLabel="AWT.js:1146" />

_Inherited from `module:AWT.Rectangle#getOppositeVertex`_

**Overrides:&#x20;**`module:AWT.Container#getOppositeVertex`

Gets the [module:AWT.Point](/module/awt#point) corresponding to the lower-right vertex of the Rectangle.

**Returns**

- [`module:AWT.Point`](/module/awt#point)

<MemberHeading id="add" depth="3" name="add" sig="add(shape: module:AWT.Shape): module:AWT.Rectangle" />

<MemberMeta sourceHref="/source/awt-js/#L1155" sourceLabel="AWT.js:1155" />

_Inherited from `module:AWT.Rectangle#add`_

**Overrides:&#x20;**`module:AWT.Container#add`

Adds the boundaries of another shape to the current one

**Parameters**

- `shape` ([module:AWT.Shape](/module/awt#shape)) — The [module:AWT.Shape](/module/awt#shape) to be added

**Returns**

- [`module:AWT.Rectangle`](/module/awt#rectangle)

<MemberHeading id="getcoords" depth="3" name="getCoords" sig="getCoords(): string" />

<MemberMeta sourceHref="/source/awt-js/#L1222" sourceLabel="AWT.js:1222" />

_Inherited from `module:AWT.Rectangle#getCoords`_

**Overrides:&#x20;**`module:AWT.Container#getCoords`

Gets a string with the co-ordinates of the upper-left and lower-right vertexs of this rectangle,\
(with values rounded to int)

**Returns**

- `string`

<MemberHeading id="getattributes" depth="3" name="getAttributes" sig="getAttributes(): object" />

<MemberMeta sourceHref="/source/awt-js/#L1232" sourceLabel="AWT.js:1232" />

_Inherited from `module:AWT.Rectangle#getAttributes`_

**Overrides:&#x20;**`module:AWT.Container#getAttributes`

Gets a object with the basic attributes needed to rebuild this instance excluding functions,\
parent references, constants and also attributes retaining the default value.\
The resulting object is commonly usued to serialize elements in JSON format.

**Returns**

- `object`

<MemberHeading id="setattributes" depth="3" name="setAttributes" sig="setAttributes(data: object): module:AWT.Rectangle" />

<MemberMeta sourceHref="/source/awt-js/#L1241" sourceLabel="AWT.js:1241" />

_Inherited from `module:AWT.Rectangle#setAttributes`_

**Overrides:&#x20;**`module:AWT.Container#setAttributes`

Reads the properties of this Rectangle from a data object

**Parameters**

- `data` (object) — The data object to be parsed

**Returns**

- [`module:AWT.Rectangle`](/module/awt#rectangle)

<MemberHeading id="moveby" depth="3" name="moveBy" sig="moveBy(delta: Point | Dimension): module:AWT.Shape" />

<MemberMeta sourceHref="/source/awt-js/#L834" sourceLabel="AWT.js:834" />

_Inherited from `module:AWT.Shape#moveBy`_

**Overrides:&#x20;**`module:AWT.Container#moveBy`

Shifts the shape a specified amount in horizontal and vertical directions

**Parameters**

- `delta` ([Point](/module/awt#point) | [Dimension](/module/awt#dimension)) — The amount to shift the Shape

**Returns**

- [`module:AWT.Shape`](/module/awt#shape)

<MemberHeading id="moveto" depth="3" name="moveTo" sig="moveTo(newPos: module:AWT.Point): module:AWT.Shape" />

<MemberMeta sourceHref="/source/awt-js/#L844" sourceLabel="AWT.js:844" />

_Inherited from `module:AWT.Shape#moveTo`_

**Overrides:&#x20;**`module:AWT.Container#moveTo`

Moves this shape to a new position

**Parameters**

- `newPos` ([module:AWT.Point](/module/awt#point)) — The new position of the shape

**Returns**

- [`module:AWT.Shape`](/module/awt#shape)

<MemberHeading id="getshape" depth="3" name="getShape" sig="getShape(rect: module:AWT.Rectangle): module:AWT.Shape" />

<MemberMeta sourceHref="/source/awt-js/#L883" sourceLabel="AWT.js:883" />

_Inherited from `module:AWT.Shape#getShape`_

**Overrides:&#x20;**`module:AWT.Container#getShape`

Gets a clone of this shape moved to the `pos` component of the rectangle and scaled\
by its `dim` value.

**Parameters**

- `rect` ([module:AWT.Rectangle](/module/awt#rectangle)) — The rectangle to be taken as a base for moving and scaling\
  this shape.

**Returns**

- [`module:AWT.Shape`](/module/awt#shape)

<MemberHeading id="contains" depth="3" name="contains" sig="contains(_p: module:AWT.Point): boolean" />

<MemberMeta sourceHref="/source/awt-js/#L892" sourceLabel="AWT.js:892" />

_Inherited from `module:AWT.Shape#contains`_

**Overrides:&#x20;**`module:AWT.Container#contains`

Checks if the provided [module:AWT.Point](/module/awt#point) is inside this shape.

**Parameters**

- `_p` ([module:AWT.Point](/module/awt#point)) — The point to check

**Returns**

- `boolean`

<MemberHeading id="intersects" depth="3" name="intersects" sig="intersects(_r: module:AWT.Rectangle): boolean" />

<MemberMeta sourceHref="/source/awt-js/#L902" sourceLabel="AWT.js:902" />

_Inherited from `module:AWT.Shape#intersects`_

**Overrides:&#x20;**`module:AWT.Container#intersects`

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

**Overrides:&#x20;**`module:AWT.Container#fill`

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

**Overrides:&#x20;**`module:AWT.Container#stroke`

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

**Overrides:&#x20;**`module:AWT.Container#preparePath`

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

**Overrides:&#x20;**`module:AWT.Container#clip`

Creates a clipping region on the specified HTML canvas 2D rendering context

**Parameters**

- `ctx` ([external:CanvasRenderingContext2D](/module/utils#canvasrenderingcontext2d)) — The rendering context
- `fillRule` (string, optional, default: "'nonzero'") — Can be 'nonzero' (default when not set) or 'evenodd'

**Returns**

- [`external:CanvasRenderingContext2D`](/module/utils#canvasrenderingcontext2d)

<MemberHeading id="isrect" depth="3" name="isRect" sig="isRect(): boolean" />

<MemberMeta sourceHref="/source/awt-js/#L967" sourceLabel="AWT.js:967" />

_Inherited from `module:AWT.Shape#isRect`_

**Overrides:&#x20;**`module:AWT.Container#isRect`

Shorthand method for determining if a Shape is an [Rectangle](/module/awt#rectangle)

**Returns**

- `boolean`

<MemberHeading id="tostring" depth="3" name="toString" sig="toString(): string" />

<MemberMeta sourceHref="/source/awt-js/#L975" sourceLabel="AWT.js:975" />

_Inherited from `module:AWT.Shape#toString`_

**Overrides:&#x20;**`module:AWT.Container#toString`

Overwrites the original 'Object.toString' method with a more descriptive text

**Returns**

- `string`

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

<MemberHeading id="act" depth="3" name="act" sig="act: module:Activity.Activity" />

<MemberMeta sourceHref="/source/activity-js/#L1214" sourceLabel="Activity.js:1214" />

The Activity this panel is related to

<MemberHeading id="div" depth="3" name="$div" sig="$div: external:jQuery" />

<MemberMeta sourceHref="/source/activity-js/#L1219" sourceLabel="Activity.js:1219" />

The jQuery div element used by this panel

<MemberHeading id="canvas" depth="3" name="$canvas" sig="$canvas: external:jQuery" />

<MemberMeta sourceHref="/source/activity-js/#L1224" sourceLabel="Activity.js:1224" />

The jQuery main canvas element used by this panel

<MemberHeading id="accessiblecanvas" depth="3" name="accessibleCanvas" sig="accessibleCanvas: boolean" />

<MemberMeta sourceHref="/source/activity-js/#L1231" sourceLabel="Activity.js:1231" />

Always true, since canvas hit regions have been deprecated!\
See: https\://developer.mozilla.org/en-US/docs/Web/API/Canvas\_API/Tutorial/Hit\_regions\_and\_accessibility

<MemberHeading id="skin" depth="3" name="skin" sig="skin: module:skins/Skin.Skin" />

<MemberMeta sourceHref="/source/activity-js/#L1236" sourceLabel="Activity.js:1236" />

The realized current [Skin](/module/skins-skin#skin)

<MemberHeading id="animatedbg" depth="3" name="$animatedBg" sig="$animatedBg: external:jQuery" />

<MemberMeta sourceHref="/source/activity-js/#L1241" sourceLabel="Activity.js:1241" />

Background element (currently a `span`) used to place animated GIFs when needed

<MemberHeading id="animatedbgb" depth="3" name="$animatedBgB" sig="$animatedBgB: external:jQuery" />

<MemberMeta sourceHref="/source/activity-js/#L1246" sourceLabel="Activity.js:1246" />

Additional background element for animated GIFs, used in associations

<MemberHeading id="solved" depth="3" name="solved" sig="solved: boolean" />

<MemberMeta sourceHref="/source/activity-js/#L1251" sourceLabel="Activity.js:1251" />

`true` when the activity is solved, `false` otherwise

<MemberHeading id="bgimage" depth="3" name="bgImage" sig="bgImage: external:HTMLImageElement" />

<MemberMeta sourceHref="/source/activity-js/#L1256" sourceLabel="Activity.js:1256" />

The realized image used as a background

<MemberHeading id="playing" depth="3" name="playing" sig="playing: boolean" />

<MemberMeta sourceHref="/source/activity-js/#L1261" sourceLabel="Activity.js:1261" />

`true` while the activity is playing

<MemberHeading id="firstrun" depth="3" name="firstRun" sig="firstRun: boolean" />

<MemberMeta sourceHref="/source/activity-js/#L1266" sourceLabel="Activity.js:1266" />

`true` if the activity is running for first time (not due to a click on the `replay` button)

<MemberHeading id="currentitem" depth="3" name="currentItem" sig="currentItem: number" />

<MemberMeta sourceHref="/source/activity-js/#L1271" sourceLabel="Activity.js:1271" />

Currently selected item. Used in some types of activities.

<MemberHeading id="bc" depth="3" name="bc" sig="bc: module:boxes/BoxConnector.BoxConnector" />

<MemberMeta sourceHref="/source/activity-js/#L1276" sourceLabel="Activity.js:1276" />

The object used to connect cells and other elements in some types of activity

<MemberHeading id="ps" depth="3" name="ps" sig="ps: module:JClicPlayer.JClicPlayer" />

<MemberMeta sourceHref="/source/activity-js/#L1282" sourceLabel="Activity.js:1282" />

The PlayStation used to realize media objects and communicate with the player services\
(usually a [JClicPlayer](/module/jclicplayer#jclicplayer)

<MemberHeading id="minimumsize" depth="3" name="minimumSize" sig="minimumSize: module:AWT.Dimension" />

<MemberMeta sourceHref="/source/activity-js/#L1287" sourceLabel="Activity.js:1287" />

The minimum size of this kind of ActivityPanel

<MemberHeading id="preferredsize" depth="3" name="preferredSize" sig="preferredSize: module:AWT.Dimension" />

<MemberMeta sourceHref="/source/activity-js/#L1292" sourceLabel="Activity.js:1292" />

The preferred size of this kind of ActivityPanel

<MemberHeading id="events" depth="3" name="events" sig="events: Array.<string>" />

<MemberMeta sourceHref="/source/activity-js/#L1299" sourceLabel="Activity.js:1299" />

List of events intercepted by this ActivityPanel. Current events are: 'keydown', 'keyup',\
'keypress', 'mousedown', 'mouseup', 'click', 'dblclick', 'mousemove', 'mouseenter',\
'mouseleave', 'mouseover', 'mouseout', 'touchstart', 'touchend', 'touchmove' and 'touchcancel'.

<MemberHeading id="invalidatedrect" depth="3" name="invalidatedRect" sig="invalidatedRect: module:AWT.Rectangle" />

<MemberMeta sourceHref="/source/awt-js/#L2031" sourceLabel="AWT.js:2031" />

_Inherited from `module:AWT.Container#invalidatedRect`_

**Overrides:&#x20;**`module:AWT.Container#invalidatedRect`

The currently "invalidated" area

<MemberHeading id="type" depth="3" name="type" sig="type: string" />

<MemberMeta sourceHref="/source/awt-js/#L1255" sourceLabel="AWT.js:1255" />

_Inherited from `module:AWT.Rectangle#type`_

**Overrides:&#x20;**`module:AWT.Container#type`

Shape type id

<MemberHeading id="dim" depth="3" name="dim" sig="dim: module:AWT.Dimension" />

<MemberMeta sourceHref="/source/awt-js/#L1260" sourceLabel="AWT.js:1260" />

_Inherited from `module:AWT.Rectangle#dim`_

**Overrides:&#x20;**`module:AWT.Container#dim`

The [Dimension](/module/awt#dimension) of the Rectangle

<MemberHeading id="pos" depth="3" name="pos" sig="pos: module:AWT.Point" />

<MemberMeta sourceHref="/source/awt-js/#L1019" sourceLabel="AWT.js:1019" />

_Inherited from `module:AWT.Shape#pos`_

**Overrides:&#x20;**`module:AWT.Container#pos`

The current position of the shape
