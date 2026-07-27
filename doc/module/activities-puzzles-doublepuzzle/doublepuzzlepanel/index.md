---
title: DoublePuzzlePanel
kind: class
longname: module:activities/puzzles/DoublePuzzle.DoublePuzzlePanel
description: The {@link module:Activity.ActivityPanel ActivityPanel} where {@link module:activities/puzzles/DoublePuzzle.DoublePuzzle DoublePuzzle} activities are played.
---

# DoublePuzzlePanel

**Extends:&#x20;**[`module:Activity.ActivityPanel`](/module/activity#activitypanel)

<SourceLink href="/source/activities/puzzles/doublepuzzle-js/#L98" label="DoublePuzzle.js:98" />

The [ActivityPanel](/module/activity#activitypanel) where [DoublePuzzle](/module/activities-puzzles-doublepuzzle#doublepuzzle) activities are played.

---

## Constructor

<Signature
  code="new DoublePuzzlePanel(
	act: module:Activity.Activity,
	ps: module:JClicPlayer.JClicPlayer,
	$div?: external:jQuery,
): DoublePuzzlePanel"
/>

DoublePuzzlePanel constructor

**Parameters**

- `act` ([module:Activity.Activity](/module/activity#activity)) — The [Activity](/module/activity#activity) to which this Panel belongs
- `ps` ([module:JClicPlayer.JClicPlayer](/module/jclicplayer#jclicplayer)) — Any object implementing the methods defined in the\
  [PlayStation](http://projectestac.github.io/jclic/apidoc/edu/xtec/jclic/PlayStation.html)\
  Java interface.
- `$div` ([external:jQuery](/module/utils#jquery), optional) — The jQuery DOM element where this Panel will deploy

---

## Instance Methods

<MemberHeading id="clear" depth="3" name="clear" sig="clear()" />

<MemberMeta sourceHref="/source/activities/puzzles/doublepuzzle-js/#L115" sourceLabel="DoublePuzzle.js:115" />

Miscellaneous cleaning operations

<MemberHeading id="buildvisualcomponents" depth="3" name="buildVisualComponents" sig="buildVisualComponents()" />

<MemberMeta sourceHref="/source/activities/puzzles/doublepuzzle-js/#L130" sourceLabel="DoublePuzzle.js:130" />

Prepares the visual components of the activity

<MemberHeading id="initactivity" depth="3" name="initActivity" sig="initActivity()" />

<MemberMeta sourceHref="/source/activities/puzzles/doublepuzzle-js/#L165" sourceLabel="DoublePuzzle.js:165" />

Basic initialization procedure

<MemberHeading id="updatecontent" depth="3" name="updateContent" sig="updateContent(dirtyRegion: module:AWT.Rectangle)" />

<MemberMeta sourceHref="/source/activities/puzzles/doublepuzzle-js/#L189" sourceLabel="DoublePuzzle.js:189" />

Updates the graphic content of this panel.\
This method will be called from [module:AWT.Container#update](/module/awt/container#update) when needed.

**Parameters**

- `dirtyRegion` ([module:AWT.Rectangle](/module/awt#rectangle)) — Specifies the area to be updated. When `null`,\
  it's the whole panel.

<MemberHeading
  id="setdimension"
  depth="3"
  name="setDimension"
  sig="setDimension(
	preferredMaxSize: module:AWT.Dimension,
): module:AWT.Dimension"
/>

<MemberMeta sourceHref="/source/activities/puzzles/doublepuzzle-js/#L210" sourceLabel="DoublePuzzle.js:210" />

Sets the real dimension of this panel.

**Parameters**

- `preferredMaxSize` ([module:AWT.Dimension](/module/awt#dimension)) — The maximum surface available for the activity panel

**Returns**

- [`module:AWT.Dimension`](/module/awt#dimension)

<MemberHeading id="setbounds" depth="3" name="setBounds" sig="setBounds(rect: module:AWT.Rectangle)" />

<MemberMeta sourceHref="/source/activities/puzzles/doublepuzzle-js/#L221" sourceLabel="DoublePuzzle.js:221" />

Sets the size and position of this activity panel

**Parameters**

- `rect` ([module:AWT.Rectangle](/module/awt#rectangle))

<MemberHeading id="buildaccessiblecomponents" depth="3" name="buildAccessibleComponents" sig="buildAccessibleComponents()" />

<MemberMeta sourceHref="/source/activities/puzzles/doublepuzzle-js/#L249" sourceLabel="DoublePuzzle.js:249" />

Builds the accessible components needed for this ActivityPanel\
This method is called when all main elements are placed and visible, when the activity is ready\
to start or when resized.

<MemberHeading id="processevent" depth="3" name="processEvent" sig="processEvent(event: external:Event): boolean" />

<MemberMeta sourceHref="/source/activities/puzzles/doublepuzzle-js/#L268" sourceLabel="DoublePuzzle.js:268" />

Main handler used to process mouse, touch, keyboard and edit events

**Parameters**

- `event` ([external:Event](/module/utils#event)) — The HTML event to be processed

**Returns**

- `boolean`

<MemberHeading id="setbounds" depth="3" name="setBounds" sig="setBounds(rect: module:AWT.Rectangle)" />

<MemberMeta sourceHref="/source/activities/puzzles/doublepuzzle-js/#L221" sourceLabel="DoublePuzzle.js:221" />

_Inherited from `module:activities/puzzles/DoublePuzzle.DoublePuzzlePanel#setBounds`_

**Overrides:&#x20;**`module:Activity.ActivityPanel#setBounds`

Sets the size and position of this activity panel

**Parameters**

- `rect` ([module:AWT.Rectangle](/module/awt#rectangle))

<MemberHeading id="buildvisualcomponents" depth="3" name="buildVisualComponents" sig="buildVisualComponents()" />

<MemberMeta sourceHref="/source/activities/puzzles/doublepuzzle-js/#L130" sourceLabel="DoublePuzzle.js:130" />

_Inherited from `module:activities/puzzles/DoublePuzzle.DoublePuzzlePanel#buildVisualComponents`_

**Overrides:&#x20;**`module:Activity.ActivityPanel#buildVisualComponents`

Prepares the visual components of the activity

<MemberHeading id="updatecontent" depth="3" name="updateContent" sig="updateContent(dirtyRegion: module:AWT.Rectangle)" />

<MemberMeta sourceHref="/source/activities/puzzles/doublepuzzle-js/#L189" sourceLabel="DoublePuzzle.js:189" />

_Inherited from `module:activities/puzzles/DoublePuzzle.DoublePuzzlePanel#updateContent`_

**Overrides:&#x20;**`module:Activity.ActivityPanel#updateContent`

Updates the graphic content of this panel.\
This method will be called from [module:AWT.Container#update](/module/awt/container#update) when needed.

**Parameters**

- `dirtyRegion` ([module:AWT.Rectangle](/module/awt#rectangle)) — Specifies the area to be updated. When `null`,\
  it's the whole panel.

<MemberHeading id="playevent" depth="3" name="playEvent" sig="playEvent(event: string)" />

<MemberMeta sourceHref="/source/activity-js/#L969" sourceLabel="Activity.js:969" />

_Inherited from `module:Activity.ActivityPanel#playEvent`_

**Overrides:&#x20;**`module:Activity.ActivityPanel#playEvent`

Plays the specified event sound

**Parameters**

- `event` (string) — The type of event to be performed

<MemberHeading id="initactivity" depth="3" name="initActivity" sig="initActivity()" />

<MemberMeta sourceHref="/source/activities/puzzles/doublepuzzle-js/#L165" sourceLabel="DoublePuzzle.js:165" />

_Inherited from `module:activities/puzzles/DoublePuzzle.DoublePuzzlePanel#initActivity`_

**Overrides:&#x20;**`module:Activity.ActivityPanel#initActivity`

Basic initialization procedure

<MemberHeading id="startactivity" depth="3" name="startActivity" sig="startActivity()" />

<MemberMeta sourceHref="/source/activity-js/#L990" sourceLabel="Activity.js:990" />

_Inherited from `module:Activity.ActivityPanel#startActivity`_

**Overrides:&#x20;**`module:Activity.ActivityPanel#startActivity`

Called when the activity starts playing

<MemberHeading id="activityready" depth="3" name="activityReady" sig="activityReady()" />

<MemberMeta sourceHref="/source/activity-js/#L998" sourceLabel="Activity.js:998" />

_Inherited from `module:Activity.ActivityPanel#activityReady`_

**Overrides:&#x20;**`module:Activity.ActivityPanel#activityReady`

Called by [JClicPlayer](/module/jclicplayer#jclicplayer) when this activity panel is fully visible, just after the\
initialization process.

<MemberHeading id="showhelp" depth="3" name="showHelp" sig="showHelp()" />

<MemberMeta sourceHref="/source/activity-js/#L1005" sourceLabel="Activity.js:1005" />

_Inherited from `module:Activity.ActivityPanel#showHelp`_

**Overrides:&#x20;**`module:Activity.ActivityPanel#showHelp`

Displays help about the activity

<MemberHeading
  id="setdimension"
  depth="3"
  name="setDimension"
  sig="setDimension(
	preferredMaxSize: module:AWT.Dimension,
): module:AWT.Dimension"
/>

<MemberMeta sourceHref="/source/activities/puzzles/doublepuzzle-js/#L210" sourceLabel="DoublePuzzle.js:210" />

_Inherited from `module:activities/puzzles/DoublePuzzle.DoublePuzzlePanel#setDimension`_

**Overrides:&#x20;**`module:Activity.ActivityPanel#setDimension`

Sets the real dimension of this panel.

**Parameters**

- `preferredMaxSize` ([module:AWT.Dimension](/module/awt#dimension)) — The maximum surface available for the activity panel

**Returns**

- [`module:AWT.Dimension`](/module/awt#dimension)

<MemberHeading id="attachevents" depth="3" name="attachEvents" sig="attachEvents()" />

<MemberMeta sourceHref="/source/activity-js/#L1023" sourceLabel="Activity.js:1023" />

_Inherited from `module:Activity.ActivityPanel#attachEvents`_

**Overrides:&#x20;**`module:Activity.ActivityPanel#attachEvents`

Attaches the events specified in the `events` member to the `$div` member

<MemberHeading id="attachevent" depth="3" name="attachEvent" sig="attachEvent($obj: external:jQuery, evt: string)" />

<MemberMeta sourceHref="/source/activity-js/#L1035" sourceLabel="Activity.js:1035" />

_Inherited from `module:Activity.ActivityPanel#attachEvent`_

**Overrides:&#x20;**`module:Activity.ActivityPanel#attachEvent`

Attaches a single event to the specified object

**Parameters**

- `$obj` ([external:jQuery](/module/utils#jquery)) — The object to which the event will be attached
- `evt` (string) — The event name

<MemberHeading id="processevent" depth="3" name="processEvent" sig="processEvent(event: external:Event): boolean" />

<MemberMeta sourceHref="/source/activities/puzzles/doublepuzzle-js/#L268" sourceLabel="DoublePuzzle.js:268" />

_Inherited from `module:activities/puzzles/DoublePuzzle.DoublePuzzlePanel#processEvent`_

**Overrides:&#x20;**`module:Activity.ActivityPanel#processEvent`

Main handler used to process mouse, touch, keyboard and edit events

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

_Inherited from `module:Activity.ActivityPanel#fitTo`_

**Overrides:&#x20;**`module:Activity.ActivityPanel#fitTo`

Fits the panel within the `proposed` rectangle. The panel can occupy more space, but always\
not surpassing the `bounds` rectangle.

**Parameters**

- `proposed` ([module:AWT.Rectangle](/module/awt#rectangle)) — The proposed rectangle
- `bounds` ([module:AWT.Rectangle](/module/awt#rectangle)) — The maximum allowed bounds

<MemberHeading id="buildaccessiblecomponents" depth="3" name="buildAccessibleComponents" sig="buildAccessibleComponents()" />

<MemberMeta sourceHref="/source/activities/puzzles/doublepuzzle-js/#L249" sourceLabel="DoublePuzzle.js:249" />

_Inherited from `module:activities/puzzles/DoublePuzzle.DoublePuzzlePanel#buildAccessibleComponents`_

**Overrides:&#x20;**`module:Activity.ActivityPanel#buildAccessibleComponents`

Builds the accessible components needed for this ActivityPanel\
This method is called when all main elements are placed and visible, when the activity is ready\
to start or when resized.

<MemberHeading id="forcefinishactivity" depth="3" name="forceFinishActivity" sig="forceFinishActivity()" />

<MemberMeta sourceHref="/source/activity-js/#L1111" sourceLabel="Activity.js:1111" />

_Inherited from `module:Activity.ActivityPanel#forceFinishActivity`_

**Overrides:&#x20;**`module:Activity.ActivityPanel#forceFinishActivity`

Forces the ending of the activity.

<MemberHeading id="finishactivity" depth="3" name="finishActivity" sig="finishActivity(result: boolean)" />

<MemberMeta sourceHref="/source/activity-js/#L1119" sourceLabel="Activity.js:1119" />

_Inherited from `module:Activity.ActivityPanel#finishActivity`_

**Overrides:&#x20;**`module:Activity.ActivityPanel#finishActivity`

Ordinary ending of the activity, usually called form `processEvent`

**Parameters**

- `result` (boolean) — `true` if the activity was successfully completed, `false` otherwise

<MemberHeading id="setandplaymsg" depth="3" name="setAndPlayMsg" sig="setAndPlayMsg(msgCode: string, eventSoundsCode?: string)" />

<MemberMeta sourceHref="/source/activity-js/#L1140" sourceLabel="Activity.js:1140" />

_Inherited from `module:Activity.ActivityPanel#setAndPlayMsg`_

**Overrides:&#x20;**`module:Activity.ActivityPanel#setAndPlayMsg`

Sets the message to be displayed in the skin message box and optionally plays a sound event.

**Parameters**

- `msgCode` (string) — Type of message (initial, final, finalError...)
- `eventSoundsCode` (string, optional) — Optional name of the event sound to be played.

<MemberHeading id="end" depth="3" name="end" sig="end()" />

<MemberMeta sourceHref="/source/activity-js/#L1150" sourceLabel="Activity.js:1150" />

_Inherited from `module:Activity.ActivityPanel#end`_

**Overrides:&#x20;**`module:Activity.ActivityPanel#end`

Ends the activity

<MemberHeading id="clear" depth="3" name="clear" sig="clear()" />

<MemberMeta sourceHref="/source/activities/puzzles/doublepuzzle-js/#L115" sourceLabel="DoublePuzzle.js:115" />

_Inherited from `module:activities/puzzles/DoublePuzzle.DoublePuzzlePanel#clear`_

**Overrides:&#x20;**`module:Activity.ActivityPanel#clear`

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

_Inherited from `module:Activity.ActivityPanel#enableCounters`_

**Overrides:&#x20;**`module:Activity.ActivityPanel#enableCounters`

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

_Inherited from `module:Activity.ActivityPanel#shuffle`_

**Overrides:&#x20;**`module:Activity.ActivityPanel#shuffle`

Shuffles the contents of the activity

**Parameters**

- `bg` (Array.\<[module:boxes/ActiveBoxBag.ActiveBoxBag](/module/boxes-activeboxbag#activeboxbag)>) — The sets of boxes to be shuffled
- `visible` (boolean) — The shuffle process must be animated on the screen (not yet implemented!)
- `fitInArea` (boolean) — Shuffled pieces cannot go out of the current area

<MemberHeading id="invalidate" depth="3" name="invalidate" sig="invalidate(rect: module:AWT.Rectangle)" />

<MemberMeta sourceHref="/source/awt-js/#L1994" sourceLabel="AWT.js:1994" />

_Inherited from `module:AWT.Container#invalidate`_

**Overrides:&#x20;**`module:Activity.ActivityPanel#invalidate`

Adds the provided rectangle to the invalidated area.

**Parameters**

- `rect` ([module:AWT.Rectangle](/module/awt#rectangle))

<MemberHeading id="update" depth="3" name="update" sig="update()" />

<MemberMeta sourceHref="/source/awt-js/#L2008" sourceLabel="AWT.js:2008" />

_Inherited from `module:AWT.Container#update`_

**Overrides:&#x20;**`module:Activity.ActivityPanel#update`

Updates the invalidated area

<MemberHeading id="getbounds" depth="3" name="getBounds" sig="getBounds(): module:AWT.Rectangle" />

<MemberMeta sourceHref="/source/awt-js/#L1081" sourceLabel="AWT.js:1081" />

_Inherited from `module:AWT.Rectangle#getBounds`_

**Overrides:&#x20;**`module:Activity.ActivityPanel#getBounds`

Gets the enclosing [Rectangle](/module/awt#rectangle) of this Shape.

**Returns**

- [`module:AWT.Rectangle`](/module/awt#rectangle)

<MemberHeading id="equals" depth="3" name="equals" sig="equals(r: module:AWT.Shape): boolean" />

<MemberMeta sourceHref="/source/awt-js/#L1105" sourceLabel="AWT.js:1105" />

_Inherited from `module:AWT.Rectangle#equals`_

**Overrides:&#x20;**`module:Activity.ActivityPanel#equals`

Checks if two shapes are equivalent.

**Parameters**

- `r` ([module:AWT.Shape](/module/awt#shape)) — The Shape to compare against

**Returns**

- `boolean`

<MemberHeading id="clone" depth="3" name="clone" sig="clone(): module:AWT.Rectangle" />

<MemberMeta sourceHref="/source/awt-js/#L1113" sourceLabel="AWT.js:1113" />

_Inherited from `module:AWT.Rectangle#clone`_

**Overrides:&#x20;**`module:Activity.ActivityPanel#clone`

Clones this Rectangle

**Returns**

- [`module:AWT.Rectangle`](/module/awt#rectangle)

<MemberHeading id="scaleby" depth="3" name="scaleBy" sig="scaleBy(delta: Point | Dimension): module:AWT.Rectangle" />

<MemberMeta sourceHref="/source/awt-js/#L1122" sourceLabel="AWT.js:1122" />

_Inherited from `module:AWT.Rectangle#scaleBy`_

**Overrides:&#x20;**`module:Activity.ActivityPanel#scaleBy`

Multiplies the dimension of the Shape by the specified `delta` amount.

**Parameters**

- `delta` ([Point](/module/awt#point) | [Dimension](/module/awt#dimension)) — Object containing the X and Y ratio to be scaled.

**Returns**

- [`module:AWT.Rectangle`](/module/awt#rectangle)

<MemberHeading id="grow" depth="3" name="grow" sig="grow(dx: number, dy: number): module:AWT.Rectangle" />

<MemberMeta sourceHref="/source/awt-js/#L1134" sourceLabel="AWT.js:1134" />

_Inherited from `module:AWT.Rectangle#grow`_

**Overrides:&#x20;**`module:Activity.ActivityPanel#grow`

Expands the boundaries of this shape. This affects the current position and dimension.

**Parameters**

- `dx` (number) — The amount to grow (or decrease) in horizontal direction
- `dy` (number) — The amount to grow (or decrease) in vertical direction

**Returns**

- [`module:AWT.Rectangle`](/module/awt#rectangle)

<MemberHeading id="getoppositevertex" depth="3" name="getOppositeVertex" sig="getOppositeVertex(): module:AWT.Point" />

<MemberMeta sourceHref="/source/awt-js/#L1146" sourceLabel="AWT.js:1146" />

_Inherited from `module:AWT.Rectangle#getOppositeVertex`_

**Overrides:&#x20;**`module:Activity.ActivityPanel#getOppositeVertex`

Gets the [module:AWT.Point](/module/awt#point) corresponding to the lower-right vertex of the Rectangle.

**Returns**

- [`module:AWT.Point`](/module/awt#point)

<MemberHeading id="add" depth="3" name="add" sig="add(shape: module:AWT.Shape): module:AWT.Rectangle" />

<MemberMeta sourceHref="/source/awt-js/#L1155" sourceLabel="AWT.js:1155" />

_Inherited from `module:AWT.Rectangle#add`_

**Overrides:&#x20;**`module:Activity.ActivityPanel#add`

Adds the boundaries of another shape to the current one

**Parameters**

- `shape` ([module:AWT.Shape](/module/awt#shape)) — The [module:AWT.Shape](/module/awt#shape) to be added

**Returns**

- [`module:AWT.Rectangle`](/module/awt#rectangle)

<MemberHeading id="getcoords" depth="3" name="getCoords" sig="getCoords(): string" />

<MemberMeta sourceHref="/source/awt-js/#L1222" sourceLabel="AWT.js:1222" />

_Inherited from `module:AWT.Rectangle#getCoords`_

**Overrides:&#x20;**`module:Activity.ActivityPanel#getCoords`

Gets a string with the co-ordinates of the upper-left and lower-right vertexs of this rectangle,\
(with values rounded to int)

**Returns**

- `string`

<MemberHeading id="getattributes" depth="3" name="getAttributes" sig="getAttributes(): object" />

<MemberMeta sourceHref="/source/awt-js/#L1232" sourceLabel="AWT.js:1232" />

_Inherited from `module:AWT.Rectangle#getAttributes`_

**Overrides:&#x20;**`module:Activity.ActivityPanel#getAttributes`

Gets a object with the basic attributes needed to rebuild this instance excluding functions,\
parent references, constants and also attributes retaining the default value.\
The resulting object is commonly usued to serialize elements in JSON format.

**Returns**

- `object`

<MemberHeading id="setattributes" depth="3" name="setAttributes" sig="setAttributes(data: object): module:AWT.Rectangle" />

<MemberMeta sourceHref="/source/awt-js/#L1241" sourceLabel="AWT.js:1241" />

_Inherited from `module:AWT.Rectangle#setAttributes`_

**Overrides:&#x20;**`module:Activity.ActivityPanel#setAttributes`

Reads the properties of this Rectangle from a data object

**Parameters**

- `data` (object) — The data object to be parsed

**Returns**

- [`module:AWT.Rectangle`](/module/awt#rectangle)

<MemberHeading id="moveby" depth="3" name="moveBy" sig="moveBy(delta: Point | Dimension): module:AWT.Shape" />

<MemberMeta sourceHref="/source/awt-js/#L834" sourceLabel="AWT.js:834" />

_Inherited from `module:AWT.Shape#moveBy`_

**Overrides:&#x20;**`module:Activity.ActivityPanel#moveBy`

Shifts the shape a specified amount in horizontal and vertical directions

**Parameters**

- `delta` ([Point](/module/awt#point) | [Dimension](/module/awt#dimension)) — The amount to shift the Shape

**Returns**

- [`module:AWT.Shape`](/module/awt#shape)

<MemberHeading id="moveto" depth="3" name="moveTo" sig="moveTo(newPos: module:AWT.Point): module:AWT.Shape" />

<MemberMeta sourceHref="/source/awt-js/#L844" sourceLabel="AWT.js:844" />

_Inherited from `module:AWT.Shape#moveTo`_

**Overrides:&#x20;**`module:Activity.ActivityPanel#moveTo`

Moves this shape to a new position

**Parameters**

- `newPos` ([module:AWT.Point](/module/awt#point)) — The new position of the shape

**Returns**

- [`module:AWT.Shape`](/module/awt#shape)

<MemberHeading id="getshape" depth="3" name="getShape" sig="getShape(rect: module:AWT.Rectangle): module:AWT.Shape" />

<MemberMeta sourceHref="/source/awt-js/#L883" sourceLabel="AWT.js:883" />

_Inherited from `module:AWT.Shape#getShape`_

**Overrides:&#x20;**`module:Activity.ActivityPanel#getShape`

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

**Overrides:&#x20;**`module:Activity.ActivityPanel#contains`

Checks if the provided [module:AWT.Point](/module/awt#point) is inside this shape.

**Parameters**

- `_p` ([module:AWT.Point](/module/awt#point)) — The point to check

**Returns**

- `boolean`

<MemberHeading id="intersects" depth="3" name="intersects" sig="intersects(_r: module:AWT.Rectangle): boolean" />

<MemberMeta sourceHref="/source/awt-js/#L902" sourceLabel="AWT.js:902" />

_Inherited from `module:AWT.Shape#intersects`_

**Overrides:&#x20;**`module:Activity.ActivityPanel#intersects`

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

**Overrides:&#x20;**`module:Activity.ActivityPanel#fill`

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

**Overrides:&#x20;**`module:Activity.ActivityPanel#stroke`

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

**Overrides:&#x20;**`module:Activity.ActivityPanel#preparePath`

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

**Overrides:&#x20;**`module:Activity.ActivityPanel#clip`

Creates a clipping region on the specified HTML canvas 2D rendering context

**Parameters**

- `ctx` ([external:CanvasRenderingContext2D](/module/utils#canvasrenderingcontext2d)) — The rendering context
- `fillRule` (string, optional, default: "'nonzero'") — Can be 'nonzero' (default when not set) or 'evenodd'

**Returns**

- [`external:CanvasRenderingContext2D`](/module/utils#canvasrenderingcontext2d)

<MemberHeading id="isrect" depth="3" name="isRect" sig="isRect(): boolean" />

<MemberMeta sourceHref="/source/awt-js/#L967" sourceLabel="AWT.js:967" />

_Inherited from `module:AWT.Shape#isRect`_

**Overrides:&#x20;**`module:Activity.ActivityPanel#isRect`

Shorthand method for determining if a Shape is an [Rectangle](/module/awt#rectangle)

**Returns**

- `boolean`

<MemberHeading id="tostring" depth="3" name="toString" sig="toString(): string" />

<MemberMeta sourceHref="/source/awt-js/#L975" sourceLabel="AWT.js:975" />

_Inherited from `module:AWT.Shape#toString`_

**Overrides:&#x20;**`module:Activity.ActivityPanel#toString`

Overwrites the original 'Object.toString' method with a more descriptive text

**Returns**

- `string`

<MemberHeading id="setbounds" depth="3" name="setBounds" sig="setBounds(rect: module:AWT.Rectangle)" />

<MemberMeta sourceHref="/source/activities/puzzles/doublepuzzle-js/#L221" sourceLabel="DoublePuzzle.js:221" />

_Inherited from `module:activities/puzzles/DoublePuzzle.DoublePuzzlePanel#setBounds`_

**Overrides:&#x20;**`module:Activity.ActivityPanel#setBounds`

Sets the size and position of this activity panel

**Parameters**

- `rect` ([module:AWT.Rectangle](/module/awt#rectangle))

<MemberHeading id="buildvisualcomponents" depth="3" name="buildVisualComponents" sig="buildVisualComponents()" />

<MemberMeta sourceHref="/source/activities/puzzles/doublepuzzle-js/#L130" sourceLabel="DoublePuzzle.js:130" />

_Inherited from `module:activities/puzzles/DoublePuzzle.DoublePuzzlePanel#buildVisualComponents`_

**Overrides:&#x20;**`module:Activity.ActivityPanel#buildVisualComponents`

Prepares the visual components of the activity

<MemberHeading id="updatecontent" depth="3" name="updateContent" sig="updateContent(dirtyRegion: module:AWT.Rectangle)" />

<MemberMeta sourceHref="/source/activities/puzzles/doublepuzzle-js/#L189" sourceLabel="DoublePuzzle.js:189" />

_Inherited from `module:activities/puzzles/DoublePuzzle.DoublePuzzlePanel#updateContent`_

**Overrides:&#x20;**`module:Activity.ActivityPanel#updateContent`

Updates the graphic content of this panel.\
This method will be called from [module:AWT.Container#update](/module/awt/container#update) when needed.

**Parameters**

- `dirtyRegion` ([module:AWT.Rectangle](/module/awt#rectangle)) — Specifies the area to be updated. When `null`,\
  it's the whole panel.

<MemberHeading id="initactivity" depth="3" name="initActivity" sig="initActivity()" />

<MemberMeta sourceHref="/source/activities/puzzles/doublepuzzle-js/#L165" sourceLabel="DoublePuzzle.js:165" />

_Inherited from `module:activities/puzzles/DoublePuzzle.DoublePuzzlePanel#initActivity`_

**Overrides:&#x20;**`module:Activity.ActivityPanel#initActivity`

Basic initialization procedure

<MemberHeading
  id="setdimension"
  depth="3"
  name="setDimension"
  sig="setDimension(
	preferredMaxSize: module:AWT.Dimension,
): module:AWT.Dimension"
/>

<MemberMeta sourceHref="/source/activities/puzzles/doublepuzzle-js/#L210" sourceLabel="DoublePuzzle.js:210" />

_Inherited from `module:activities/puzzles/DoublePuzzle.DoublePuzzlePanel#setDimension`_

**Overrides:&#x20;**`module:Activity.ActivityPanel#setDimension`

Sets the real dimension of this panel.

**Parameters**

- `preferredMaxSize` ([module:AWT.Dimension](/module/awt#dimension)) — The maximum surface available for the activity panel

**Returns**

- [`module:AWT.Dimension`](/module/awt#dimension)

<MemberHeading id="processevent" depth="3" name="processEvent" sig="processEvent(event: external:Event): boolean" />

<MemberMeta sourceHref="/source/activities/puzzles/doublepuzzle-js/#L268" sourceLabel="DoublePuzzle.js:268" />

_Inherited from `module:activities/puzzles/DoublePuzzle.DoublePuzzlePanel#processEvent`_

**Overrides:&#x20;**`module:Activity.ActivityPanel#processEvent`

Main handler used to process mouse, touch, keyboard and edit events

**Parameters**

- `event` ([external:Event](/module/utils#event)) — The HTML event to be processed

**Returns**

- `boolean`

<MemberHeading id="buildaccessiblecomponents" depth="3" name="buildAccessibleComponents" sig="buildAccessibleComponents()" />

<MemberMeta sourceHref="/source/activities/puzzles/doublepuzzle-js/#L249" sourceLabel="DoublePuzzle.js:249" />

_Inherited from `module:activities/puzzles/DoublePuzzle.DoublePuzzlePanel#buildAccessibleComponents`_

**Overrides:&#x20;**`module:Activity.ActivityPanel#buildAccessibleComponents`

Builds the accessible components needed for this ActivityPanel\
This method is called when all main elements are placed and visible, when the activity is ready\
to start or when resized.

<MemberHeading id="clear" depth="3" name="clear" sig="clear()" />

<MemberMeta sourceHref="/source/activities/puzzles/doublepuzzle-js/#L115" sourceLabel="DoublePuzzle.js:115" />

_Inherited from `module:activities/puzzles/DoublePuzzle.DoublePuzzlePanel#clear`_

**Overrides:&#x20;**`module:Activity.ActivityPanel#clear`

Miscellaneous cleaning operations

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

<MemberHeading id="bga" depth="3" name="bgA" sig="bgA: module:boxes/ActiveBoxBag.ActiveBoxBag" />

<MemberMeta sourceHref="/source/activities/puzzles/doublepuzzle-js/#L398" sourceLabel="DoublePuzzle.js:398" />

The `ActiveBoxBag` object containing the information to be displayed in the `primary` panel

<MemberHeading id="bgb" depth="3" name="bgB" sig="bgB: module:boxes/ActiveBoxBag.ActiveBoxBag" />

<MemberMeta sourceHref="/source/activities/puzzles/doublepuzzle-js/#L403" sourceLabel="DoublePuzzle.js:403" />

The secondary `ActiveBoxBag`, initially empty.

<MemberHeading id="bc" depth="3" name="bc" sig="bc: module:boxes/BoxConnector.BoxConnector" />

<MemberMeta sourceHref="/source/activities/puzzles/doublepuzzle-js/#L408" sourceLabel="DoublePuzzle.js:408" />

**Overrides:&#x20;**`module:Activity.ActivityPanel#bc`

The box connector

<MemberHeading id="events" depth="3" name="events" sig="events: Array.<string>" />

<MemberMeta sourceHref="/source/activities/puzzles/doublepuzzle-js/#L414" sourceLabel="DoublePuzzle.js:414" />

List of mouse, touch and keyboard events intercepted by this panel

<MemberHeading id="act" depth="3" name="act" sig="act: module:Activity.Activity" />

<MemberMeta sourceHref="/source/activity-js/#L1214" sourceLabel="Activity.js:1214" />

_Inherited from `module:Activity.ActivityPanel#act`_

**Overrides:&#x20;**`module:Activity.ActivityPanel#act`

The Activity this panel is related to

<MemberHeading id="div" depth="3" name="$div" sig="$div: external:jQuery" />

<MemberMeta sourceHref="/source/activity-js/#L1219" sourceLabel="Activity.js:1219" />

_Inherited from `module:Activity.ActivityPanel#$div`_

**Overrides:&#x20;**`module:Activity.ActivityPanel#$div`

The jQuery div element used by this panel

<MemberHeading id="canvas" depth="3" name="$canvas" sig="$canvas: external:jQuery" />

<MemberMeta sourceHref="/source/activity-js/#L1224" sourceLabel="Activity.js:1224" />

_Inherited from `module:Activity.ActivityPanel#$canvas`_

**Overrides:&#x20;**`module:Activity.ActivityPanel#$canvas`

The jQuery main canvas element used by this panel

<MemberHeading id="accessiblecanvas" depth="3" name="accessibleCanvas" sig="accessibleCanvas: boolean" />

<MemberMeta sourceHref="/source/activity-js/#L1231" sourceLabel="Activity.js:1231" />

_Inherited from `module:Activity.ActivityPanel#accessibleCanvas`_

**Overrides:&#x20;**`module:Activity.ActivityPanel#accessibleCanvas`

Always true, since canvas hit regions have been deprecated!\
See: https\://developer.mozilla.org/en-US/docs/Web/API/Canvas\_API/Tutorial/Hit\_regions\_and\_accessibility

<MemberHeading id="skin" depth="3" name="skin" sig="skin: module:skins/Skin.Skin" />

<MemberMeta sourceHref="/source/activity-js/#L1236" sourceLabel="Activity.js:1236" />

_Inherited from `module:Activity.ActivityPanel#skin`_

**Overrides:&#x20;**`module:Activity.ActivityPanel#skin`

The realized current [Skin](/module/skins-skin#skin)

<MemberHeading id="animatedbg" depth="3" name="$animatedBg" sig="$animatedBg: external:jQuery" />

<MemberMeta sourceHref="/source/activity-js/#L1241" sourceLabel="Activity.js:1241" />

_Inherited from `module:Activity.ActivityPanel#$animatedBg`_

**Overrides:&#x20;**`module:Activity.ActivityPanel#$animatedBg`

Background element (currently a `span`) used to place animated GIFs when needed

<MemberHeading id="animatedbgb" depth="3" name="$animatedBgB" sig="$animatedBgB: external:jQuery" />

<MemberMeta sourceHref="/source/activity-js/#L1246" sourceLabel="Activity.js:1246" />

_Inherited from `module:Activity.ActivityPanel#$animatedBgB`_

**Overrides:&#x20;**`module:Activity.ActivityPanel#$animatedBgB`

Additional background element for animated GIFs, used in associations

<MemberHeading id="solved" depth="3" name="solved" sig="solved: boolean" />

<MemberMeta sourceHref="/source/activity-js/#L1251" sourceLabel="Activity.js:1251" />

_Inherited from `module:Activity.ActivityPanel#solved`_

**Overrides:&#x20;**`module:Activity.ActivityPanel#solved`

`true` when the activity is solved, `false` otherwise

<MemberHeading id="bgimage" depth="3" name="bgImage" sig="bgImage: external:HTMLImageElement" />

<MemberMeta sourceHref="/source/activity-js/#L1256" sourceLabel="Activity.js:1256" />

_Inherited from `module:Activity.ActivityPanel#bgImage`_

**Overrides:&#x20;**`module:Activity.ActivityPanel#bgImage`

The realized image used as a background

<MemberHeading id="playing" depth="3" name="playing" sig="playing: boolean" />

<MemberMeta sourceHref="/source/activity-js/#L1261" sourceLabel="Activity.js:1261" />

_Inherited from `module:Activity.ActivityPanel#playing`_

**Overrides:&#x20;**`module:Activity.ActivityPanel#playing`

`true` while the activity is playing

<MemberHeading id="firstrun" depth="3" name="firstRun" sig="firstRun: boolean" />

<MemberMeta sourceHref="/source/activity-js/#L1266" sourceLabel="Activity.js:1266" />

_Inherited from `module:Activity.ActivityPanel#firstRun`_

**Overrides:&#x20;**`module:Activity.ActivityPanel#firstRun`

`true` if the activity is running for first time (not due to a click on the `replay` button)

<MemberHeading id="currentitem" depth="3" name="currentItem" sig="currentItem: number" />

<MemberMeta sourceHref="/source/activity-js/#L1271" sourceLabel="Activity.js:1271" />

_Inherited from `module:Activity.ActivityPanel#currentItem`_

**Overrides:&#x20;**`module:Activity.ActivityPanel#currentItem`

Currently selected item. Used in some types of activities.

<MemberHeading id="ps" depth="3" name="ps" sig="ps: module:JClicPlayer.JClicPlayer" />

<MemberMeta sourceHref="/source/activity-js/#L1282" sourceLabel="Activity.js:1282" />

_Inherited from `module:Activity.ActivityPanel#ps`_

**Overrides:&#x20;**`module:Activity.ActivityPanel#ps`

The PlayStation used to realize media objects and communicate with the player services\
(usually a [JClicPlayer](/module/jclicplayer#jclicplayer)

<MemberHeading id="minimumsize" depth="3" name="minimumSize" sig="minimumSize: module:AWT.Dimension" />

<MemberMeta sourceHref="/source/activity-js/#L1287" sourceLabel="Activity.js:1287" />

_Inherited from `module:Activity.ActivityPanel#minimumSize`_

**Overrides:&#x20;**`module:Activity.ActivityPanel#minimumSize`

The minimum size of this kind of ActivityPanel

<MemberHeading id="preferredsize" depth="3" name="preferredSize" sig="preferredSize: module:AWT.Dimension" />

<MemberMeta sourceHref="/source/activity-js/#L1292" sourceLabel="Activity.js:1292" />

_Inherited from `module:Activity.ActivityPanel#preferredSize`_

**Overrides:&#x20;**`module:Activity.ActivityPanel#preferredSize`

The preferred size of this kind of ActivityPanel

<MemberHeading id="events" depth="3" name="events" sig="events: Array.<string>" />

<MemberMeta sourceHref="/source/activities/puzzles/doublepuzzle-js/#L414" sourceLabel="DoublePuzzle.js:414" />

_Inherited from `module:activities/puzzles/DoublePuzzle.DoublePuzzlePanel#events`_

**Overrides:&#x20;**`module:Activity.ActivityPanel#events`

List of mouse, touch and keyboard events intercepted by this panel

<MemberHeading id="invalidatedrect" depth="3" name="invalidatedRect" sig="invalidatedRect: module:AWT.Rectangle" />

<MemberMeta sourceHref="/source/awt-js/#L2031" sourceLabel="AWT.js:2031" />

_Inherited from `module:AWT.Container#invalidatedRect`_

**Overrides:&#x20;**`module:Activity.ActivityPanel#invalidatedRect`

The currently "invalidated" area

<MemberHeading id="type" depth="3" name="type" sig="type: string" />

<MemberMeta sourceHref="/source/awt-js/#L1255" sourceLabel="AWT.js:1255" />

_Inherited from `module:AWT.Rectangle#type`_

**Overrides:&#x20;**`module:Activity.ActivityPanel#type`

Shape type id

<MemberHeading id="dim" depth="3" name="dim" sig="dim: module:AWT.Dimension" />

<MemberMeta sourceHref="/source/awt-js/#L1260" sourceLabel="AWT.js:1260" />

_Inherited from `module:AWT.Rectangle#dim`_

**Overrides:&#x20;**`module:Activity.ActivityPanel#dim`

The [Dimension](/module/awt#dimension) of the Rectangle

<MemberHeading id="pos" depth="3" name="pos" sig="pos: module:AWT.Point" />

<MemberMeta sourceHref="/source/awt-js/#L1019" sourceLabel="AWT.js:1019" />

_Inherited from `module:AWT.Shape#pos`_

**Overrides:&#x20;**`module:Activity.ActivityPanel#pos`

The current position of the shape

<MemberHeading id="events" depth="3" name="events" sig="events: Array.<string>" />

<MemberMeta sourceHref="/source/activities/puzzles/doublepuzzle-js/#L414" sourceLabel="DoublePuzzle.js:414" />

_Inherited from `module:activities/puzzles/DoublePuzzle.DoublePuzzlePanel#events`_

**Overrides:&#x20;**`module:Activity.ActivityPanel#events`

List of mouse, touch and keyboard events intercepted by this panel
