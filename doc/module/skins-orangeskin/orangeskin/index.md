---
title: OrangeSkin
kind: class
longname: module:skins/OrangeSkin.OrangeSkin
description: This is a variant of the default {@link module:skins/Skin.Skin Skin} used by JClic.js It differs from {@link module:skins/DefaultSkin.DefaultSkin DefaultSkin} only in some colors
---

# OrangeSkin

**Extends:&#x20;**[`module:skins/DefaultSkin.DefaultSkin`](/module/skins-defaultskin#defaultskin)

<SourceLink href="/source/skins/orangeskin-js/#L40" label="OrangeSkin.js:40" />

This is a variant of the default [Skin](/module/skins-skin#skin) used by JClic.js\
It differs from [DefaultSkin](/module/skins-defaultskin#defaultskin) only in some colors

---

## Constructor

<Signature
  code="new OrangeSkin(
	ps: module:JClicPlayer.JClicPlayer,
	name?: string,
	options?: object,
): OrangeSkin"
/>

OrangeSkin constructor

**Parameters**

- `ps` ([module:JClicPlayer.JClicPlayer](/module/jclicplayer#jclicplayer)) — The PlayStation (currently a [JClicPlayer](/module/jclicplayer#jclicplayer)) used to load and\
  realize the media objects meeded tot build the Skin.
- `name` (string, optional, default: null) — The skin class name
- `options` (object, optional) — Optional parameter with additional options

---

## Instance Methods

<MemberHeading id="getstylesheets" depth="3" name="_getStyleSheets" sig="_getStyleSheets(media: string): string" />

<MemberMeta sourceHref="/source/skins/orangeskin-js/#L59" sourceLabel="OrangeSkin.js:59" />

**Overrides:&#x20;**`module:skins/DefaultSkin.DefaultSkin#_getStyleSheets`

Returns the CSS styles used by this skin. This method should be called only from\
the `Skin` constructor, and overridded by subclasses if needed.

**Parameters**

- `media` (string, default: "default") — A specific media size. Possible values are: 'default', 'half' and 'twoThirds'

**Returns**

- `string`

<MemberHeading id="dolayout" depth="3" name="doLayout" sig="doLayout()" />

<MemberMeta sourceHref="/source/skins/defaultskin-js/#L205" sourceLabel="DefaultSkin.js:205" />

_Inherited from `module:skins/DefaultSkin.DefaultSkin#doLayout`_

Main method used to build the content of the skin. Resizes and places internal objects.

<MemberHeading id="enablemainbuttons" depth="3" name="enableMainButtons" sig="enableMainButtons(status: boolean)" />

<MemberMeta sourceHref="/source/skins/defaultskin-js/#L221" sourceLabel="DefaultSkin.js:221" />

_Inherited from `module:skins/DefaultSkin.DefaultSkin#enableMainButtons`_

**Overrides:&#x20;**`module:skins/DefaultSkin.DefaultSkin#enableMainButtons`

Enables or disables the `tabindex` attribute of the main buttons. Useful when a modal dialog\
overlay is active, to avoid direct access to controls not related with the dialog.

**Parameters**

- `status` (boolean) — `true` to make main controls navigable, `false` otherwise

<MemberHeading id="attach" depth="3" name="attach" sig="attach(player: module:JClicPlayer.JClicPlayer)" />

<MemberMeta sourceHref="/source/skins/skin-js/#L312" sourceLabel="Skin.js:312" />

_Inherited from `module:skins/Skin.Skin#attach`_

**Overrides:&#x20;**`module:skins/DefaultSkin.DefaultSkin#attach`

Attaches a [JClicPlayer](/module/jclicplayer#jclicplayer) object to this Skin

**Parameters**

- `player` ([module:JClicPlayer.JClicPlayer](/module/jclicplayer#jclicplayer))

<MemberHeading id="setskinsizes" depth="3" name="setSkinSizes" sig="setSkinSizes(full: boolean)" />

<MemberMeta sourceHref="/source/skins/skin-js/#L326" sourceLabel="Skin.js:326" />

_Inherited from `module:skins/Skin.Skin#setSkinSizes`_

**Overrides:&#x20;**`module:skins/DefaultSkin.DefaultSkin#setSkinSizes`

Sets the 'size' CSS values (max, min and compulsory) to the main `div` of this skin

**Parameters**

- `full` (boolean) — `true` when the skin is in full screen mode

<MemberHeading id="detach" depth="3" name="detach" sig="detach()" />

<MemberMeta sourceHref="/source/skins/skin-js/#L348" sourceLabel="Skin.js:348" />

_Inherited from `module:skins/Skin.Skin#detach`_

**Overrides:&#x20;**`module:skins/DefaultSkin.DefaultSkin#detach`

Detaches the `player` element from this Skin

<MemberHeading id="updatecontent" depth="3" name="updateContent" sig="updateContent(dirtyRegion: module:AWT.Rectangle)" />

<MemberMeta sourceHref="/source/skins/skin-js/#L363" sourceLabel="Skin.js:363" />

_Inherited from `module:skins/Skin.Skin#updateContent`_

Updates the graphic contents of this skin.\
This method should be called from [module:skins/Skin.Skin#update](/module/skins-skin/skin#update)

**Parameters**

- `dirtyRegion` ([module:AWT.Rectangle](/module/awt#rectangle)) — Specifies the area to be updated. When `null`, it's the\
  whole panel.

<MemberHeading id="resetallcounters" depth="3" name="resetAllCounters" sig="resetAllCounters(bEnabled: boolean)" />

<MemberMeta sourceHref="/source/skins/skin-js/#L376" sourceLabel="Skin.js:376" />

_Inherited from `module:skins/Skin.Skin#resetAllCounters`_

**Overrides:&#x20;**`module:skins/DefaultSkin.DefaultSkin#resetAllCounters`

Resets all counters

**Parameters**

- `bEnabled` (boolean) — Leave it enabled/disabled

<MemberHeading id="setwaitcursor" depth="3" name="setWaitCursor" sig="setWaitCursor(status: boolean)" />

<MemberMeta sourceHref="/source/skins/skin-js/#L392" sourceLabel="Skin.js:392" />

_Inherited from `module:skins/Skin.Skin#setWaitCursor`_

**Overrides:&#x20;**`module:skins/DefaultSkin.DefaultSkin#setWaitCursor`

Sets/unsets the 'wait' state

**Parameters**

- `status` (boolean) — Whether to set or unset the wait status. When `undefined`, the\
  `waitCursorCount` member is evaluated to decide if the wait state should be activated or deactivated.

<MemberHeading id="setprogress" depth="3" name="setProgress" sig="setProgress(val: number, max?: number)" />

<MemberMeta sourceHref="/source/skins/skin-js/#L420" sourceLabel="Skin.js:420" />

_Inherited from `module:skins/Skin.Skin#setProgress`_

**Overrides:&#x20;**`module:skins/DefaultSkin.DefaultSkin#setProgress`

Sets the current value of the progress bar

**Parameters**

- `val` (number) — The current value. Should be less or equal than `max`. When -1, the progress bar will be hidden.
- `max` (number, optional) — Optional parameter representing the maximum value. When passed, the progress bar will be displayed.

<MemberHeading id="incprogress" depth="3" name="incProgress" sig="incProgress(val?: number)" />

<MemberMeta sourceHref="/source/skins/skin-js/#L440" sourceLabel="Skin.js:440" />

_Inherited from `module:skins/Skin.Skin#incProgress`_

**Overrides:&#x20;**`module:skins/DefaultSkin.DefaultSkin#incProgress`

Increments the progress bar value by the specified amount, only when the progress bar is running.

**Parameters**

- `val` (number, optional) — The amount to increment. When not defined, it's 1.

<MemberHeading id="showhelp" depth="3" name="showHelp" sig="showHelp(_$hlpComponent: external:jQuery)" />

<MemberMeta sourceHref="/source/skins/skin-js/#L450" sourceLabel="Skin.js:450" />

_Inherited from `module:skins/Skin.Skin#showHelp`_

**Overrides:&#x20;**`module:skins/DefaultSkin.DefaultSkin#showHelp`

Shows a window with clues or help for the current activity

**Parameters**

- `_$hlpComponent` ([external:jQuery](/module/utils#jquery)) — A JQuery DOM element with the information to be shown.\
  It can be a string or number. When `null`, the help window (if any) must be closed.

<MemberHeading id="showdlg" depth="3" name="showDlg" sig="showDlg(modal: boolean, options: object): external:Promise" />

<MemberMeta sourceHref="/source/skins/skin-js/#L462" sourceLabel="Skin.js:462" />

_Inherited from `module:skins/Skin.Skin#showDlg`_

**Overrides:&#x20;**`module:skins/DefaultSkin.DefaultSkin#showDlg`

Shows a "dialog" panel, useful for displaying information or prompt something to users

**Parameters**

- `modal` (boolean) — When `true`, the dialog should be closed by any click outside the main panel
- `options` (object) — This object should have two components: `main` and `bottom`, both\
  containing a jQuery HTML element (or array of elements) to be placed on the main and bottom panels\
  of the dialog.

**Returns**

- [`external:Promise`](/module/utils#promise)

<MemberHeading id="closedlg" depth="3" name="_closeDlg" sig="_closeDlg()" />

<MemberMeta sourceHref="/source/skins/skin-js/#L503" sourceLabel="Skin.js:503" />

_Inherited from `module:skins/Skin.Skin#_closeDlg`_

**Overrides:&#x20;**`module:skins/DefaultSkin.DefaultSkin#_closeDlg`

Called when the dialog must be closed, usually only by Skin members.\
This method is re-defined on each call to `showDlg`, so the `resolve` and `reject`\
functions can be safely called.

<MemberHeading
  id="showreports"
  depth="3"
  name="showReports"
  sig="showReports(
	reporter: module:report/Reporter.Reporter,
): external:Promise"
/>

<MemberMeta sourceHref="/source/skins/skin-js/#L512" sourceLabel="Skin.js:512" />

_Inherited from `module:skins/Skin.Skin#showReports`_

**Overrides:&#x20;**`module:skins/DefaultSkin.DefaultSkin#showReports`

Displays a dialog with a report of the current results achieved by the user.

**Parameters**

- `reporter` ([module:report/Reporter.Reporter](/module/report-reporter#reporter)) — The reporter system currently in use

**Returns**

- [`external:Promise`](/module/utils#promise)

<MemberHeading
  id="printreport"
  depth="3"
  name="$printReport"
  sig="$printReport(
	reporter: module:report/Reporter.Reporter,
): Array.<external:jQuery>"
/>

<MemberMeta sourceHref="/source/skins/skin-js/#L525" sourceLabel="Skin.js:525" />

_Inherited from `module:skins/Skin.Skin#$printReport`_

**Overrides:&#x20;**`module:skins/DefaultSkin.DefaultSkin#$printReport`

Formats the current report in a DOM tree, ready to be placed in `$reportsPanel`

**Parameters**

- `reporter` ([module:report/Reporter.Reporter](/module/report-reporter#reporter)) — The reporter system currently in use

**Returns**

- `Array.<`[`external:jQuery`](/module/utils#jquery)`>`

<MemberHeading id="enablecounter" depth="3" name="enableCounter" sig="enableCounter(counter: string, bEnabled: boolean)" />

<MemberMeta sourceHref="/source/skins/skin-js/#L641" sourceLabel="Skin.js:641" />

_Inherited from `module:skins/Skin.Skin#enableCounter`_

**Overrides:&#x20;**`module:skins/DefaultSkin.DefaultSkin#enableCounter`

Enables or disables a specific counter

**Parameters**

- `counter` (string) — Which counter
- `bEnabled` (boolean) — When `true`, the counter will be enabled.

<MemberHeading id="fit" depth="3" name="fit" sig="fit(): module:AWT.Dimension" />

<MemberMeta sourceHref="/source/skins/skin-js/#L685" sourceLabel="Skin.js:685" />

_Inherited from `module:skins/Skin.Skin#fit`_

**Overrides:&#x20;**`module:skins/DefaultSkin.DefaultSkin#fit`

adjusts the skin to the dimension of its `$div` container

**Returns**

- [`module:AWT.Dimension`](/module/awt#dimension) — the new dimension of the skin

<MemberHeading id="setscreenfull" depth="3" name="setScreenFull" sig="setScreenFull(status: boolean): boolean" />

<MemberMeta sourceHref="/source/skins/skin-js/#L697" sourceLabel="Skin.js:697" />

_Inherited from `module:skins/Skin.Skin#setScreenFull`_

**Overrides:&#x20;**`module:skins/DefaultSkin.DefaultSkin#setScreenFull`

Sets or unsets the player in fullscreen mode, when allowed, using the\
[screenfull.js](https://github.com/sindresorhus/screenfull.js) library.

**Parameters**

- `status` (boolean) — Whether to set or unset the player in fullscreen mode. When `null`\
  or `undefined`, the status toggles between fullscreen and windowed modes.

**Returns**

- `boolean` — `true` if the request was successful, `false` otherwise.

<MemberHeading id="actionstatuschanged" depth="3" name="actionStatusChanged" sig="actionStatusChanged(_action: module:AWT.Action)" />

<MemberMeta sourceHref="/source/skins/skin-js/#L723" sourceLabel="Skin.js:723" />

_Inherited from `module:skins/Skin.Skin#actionStatusChanged`_

**Overrides:&#x20;**`module:skins/DefaultSkin.DefaultSkin#actionStatusChanged`

Method used to notify this skin that a specific action has changed its enabled/disabled status

**Parameters**

- `_action` ([module:AWT.Action](/module/awt#action)) — The action originating the change event

<MemberHeading id="setenabled" depth="3" name="setEnabled" sig="setEnabled($object: external:jQuery, enabled: boolean)" />

<MemberMeta sourceHref="/source/skins/skin-js/#L734" sourceLabel="Skin.js:734" />

_Inherited from `module:skins/Skin.Skin#setEnabled`_

Enables or disables an object

**Parameters**

- `$object` ([external:jQuery](/module/utils#jquery)) — A JQuery DOM element
- `enabled` (boolean)

<MemberHeading id="equals" depth="3" name="equals" sig="equals(skin: module:skins/Skin.Skin): boolean" />

<MemberMeta sourceHref="/source/skins/skin-js/#L744" sourceLabel="Skin.js:744" />

_Inherited from `module:skins/Skin.Skin#equals`_

**Overrides:&#x20;**`module:skins/DefaultSkin.DefaultSkin#equals`

Compares two Skin objects

**Parameters**

- `skin` ([module:skins/Skin.Skin](/module/skins-skin#skin)) — The Skin to compare against this

**Returns**

- `boolean`

<MemberHeading id="getmsgbox" depth="3" name="getMsgBox" sig="getMsgBox(): module:boxes/ActiveBox.ActiveBox" />

<MemberMeta sourceHref="/source/skins/skin-js/#L754" sourceLabel="Skin.js:754" />

_Inherited from `module:skins/Skin.Skin#getMsgBox`_

**Overrides:&#x20;**`module:skins/DefaultSkin.DefaultSkin#getMsgBox`

Gets the [ActiveBox](/module/boxes-activebox#activebox) used to display the main messages of activities

**Returns**

- [`module:boxes/ActiveBox.ActiveBox`](/module/boxes-activebox#activebox)

<MemberHeading id="invalidate" depth="3" name="invalidate" sig="invalidate(rect: module:AWT.Rectangle)" />

<MemberMeta sourceHref="/source/awt-js/#L1994" sourceLabel="AWT.js:1994" />

_Inherited from `module:AWT.Container#invalidate`_

**Overrides:&#x20;**`module:skins/DefaultSkin.DefaultSkin#invalidate`

Adds the provided rectangle to the invalidated area.

**Parameters**

- `rect` ([module:AWT.Rectangle](/module/awt#rectangle))

<MemberHeading id="update" depth="3" name="update" sig="update()" />

<MemberMeta sourceHref="/source/awt-js/#L2008" sourceLabel="AWT.js:2008" />

_Inherited from `module:AWT.Container#update`_

**Overrides:&#x20;**`module:skins/DefaultSkin.DefaultSkin#update`

Updates the invalidated area

<MemberHeading id="getbounds" depth="3" name="getBounds" sig="getBounds(): module:AWT.Rectangle" />

<MemberMeta sourceHref="/source/awt-js/#L1081" sourceLabel="AWT.js:1081" />

_Inherited from `module:AWT.Rectangle#getBounds`_

**Overrides:&#x20;**`module:skins/DefaultSkin.DefaultSkin#getBounds`

Gets the enclosing [Rectangle](/module/awt#rectangle) of this Shape.

**Returns**

- [`module:AWT.Rectangle`](/module/awt#rectangle)

<MemberHeading id="setbounds" depth="3" name="setBounds" sig="setBounds(rect: module:AWT.Rectangle): module:AWT.Rectangle" />

<MemberMeta sourceHref="/source/awt-js/#L1090" sourceLabel="AWT.js:1090" />

_Inherited from `module:AWT.Rectangle#setBounds`_

**Overrides:&#x20;**`module:skins/DefaultSkin.DefaultSkin#setBounds`

Sets this Rectangle the position and dimension of another one

**Parameters**

- `rect` ([module:AWT.Rectangle](/module/awt#rectangle))

**Returns**

- [`module:AWT.Rectangle`](/module/awt#rectangle)

<MemberHeading id="clone" depth="3" name="clone" sig="clone(): module:AWT.Rectangle" />

<MemberMeta sourceHref="/source/awt-js/#L1113" sourceLabel="AWT.js:1113" />

_Inherited from `module:AWT.Rectangle#clone`_

**Overrides:&#x20;**`module:skins/DefaultSkin.DefaultSkin#clone`

Clones this Rectangle

**Returns**

- [`module:AWT.Rectangle`](/module/awt#rectangle)

<MemberHeading id="scaleby" depth="3" name="scaleBy" sig="scaleBy(delta: Point | Dimension): module:AWT.Rectangle" />

<MemberMeta sourceHref="/source/awt-js/#L1122" sourceLabel="AWT.js:1122" />

_Inherited from `module:AWT.Rectangle#scaleBy`_

**Overrides:&#x20;**`module:skins/DefaultSkin.DefaultSkin#scaleBy`

Multiplies the dimension of the Shape by the specified `delta` amount.

**Parameters**

- `delta` ([Point](/module/awt#point) | [Dimension](/module/awt#dimension)) — Object containing the X and Y ratio to be scaled.

**Returns**

- [`module:AWT.Rectangle`](/module/awt#rectangle)

<MemberHeading id="grow" depth="3" name="grow" sig="grow(dx: number, dy: number): module:AWT.Rectangle" />

<MemberMeta sourceHref="/source/awt-js/#L1134" sourceLabel="AWT.js:1134" />

_Inherited from `module:AWT.Rectangle#grow`_

**Overrides:&#x20;**`module:skins/DefaultSkin.DefaultSkin#grow`

Expands the boundaries of this shape. This affects the current position and dimension.

**Parameters**

- `dx` (number) — The amount to grow (or decrease) in horizontal direction
- `dy` (number) — The amount to grow (or decrease) in vertical direction

**Returns**

- [`module:AWT.Rectangle`](/module/awt#rectangle)

<MemberHeading id="getoppositevertex" depth="3" name="getOppositeVertex" sig="getOppositeVertex(): module:AWT.Point" />

<MemberMeta sourceHref="/source/awt-js/#L1146" sourceLabel="AWT.js:1146" />

_Inherited from `module:AWT.Rectangle#getOppositeVertex`_

**Overrides:&#x20;**`module:skins/DefaultSkin.DefaultSkin#getOppositeVertex`

Gets the [module:AWT.Point](/module/awt#point) corresponding to the lower-right vertex of the Rectangle.

**Returns**

- [`module:AWT.Point`](/module/awt#point)

<MemberHeading id="add" depth="3" name="add" sig="add(shape: module:AWT.Shape): module:AWT.Rectangle" />

<MemberMeta sourceHref="/source/awt-js/#L1155" sourceLabel="AWT.js:1155" />

_Inherited from `module:AWT.Rectangle#add`_

**Overrides:&#x20;**`module:skins/DefaultSkin.DefaultSkin#add`

Adds the boundaries of another shape to the current one

**Parameters**

- `shape` ([module:AWT.Shape](/module/awt#shape)) — The [module:AWT.Shape](/module/awt#shape) to be added

**Returns**

- [`module:AWT.Rectangle`](/module/awt#rectangle)

<MemberHeading id="getcoords" depth="3" name="getCoords" sig="getCoords(): string" />

<MemberMeta sourceHref="/source/awt-js/#L1222" sourceLabel="AWT.js:1222" />

_Inherited from `module:AWT.Rectangle#getCoords`_

**Overrides:&#x20;**`module:skins/DefaultSkin.DefaultSkin#getCoords`

Gets a string with the co-ordinates of the upper-left and lower-right vertexs of this rectangle,\
(with values rounded to int)

**Returns**

- `string`

<MemberHeading id="getattributes" depth="3" name="getAttributes" sig="getAttributes(): object" />

<MemberMeta sourceHref="/source/awt-js/#L1232" sourceLabel="AWT.js:1232" />

_Inherited from `module:AWT.Rectangle#getAttributes`_

**Overrides:&#x20;**`module:skins/DefaultSkin.DefaultSkin#getAttributes`

Gets a object with the basic attributes needed to rebuild this instance excluding functions,\
parent references, constants and also attributes retaining the default value.\
The resulting object is commonly usued to serialize elements in JSON format.

**Returns**

- `object`

<MemberHeading id="setattributes" depth="3" name="setAttributes" sig="setAttributes(data: object): module:AWT.Rectangle" />

<MemberMeta sourceHref="/source/awt-js/#L1241" sourceLabel="AWT.js:1241" />

_Inherited from `module:AWT.Rectangle#setAttributes`_

**Overrides:&#x20;**`module:skins/DefaultSkin.DefaultSkin#setAttributes`

Reads the properties of this Rectangle from a data object

**Parameters**

- `data` (object) — The data object to be parsed

**Returns**

- [`module:AWT.Rectangle`](/module/awt#rectangle)

<MemberHeading id="moveby" depth="3" name="moveBy" sig="moveBy(delta: Point | Dimension): module:AWT.Shape" />

<MemberMeta sourceHref="/source/awt-js/#L834" sourceLabel="AWT.js:834" />

_Inherited from `module:AWT.Shape#moveBy`_

**Overrides:&#x20;**`module:skins/DefaultSkin.DefaultSkin#moveBy`

Shifts the shape a specified amount in horizontal and vertical directions

**Parameters**

- `delta` ([Point](/module/awt#point) | [Dimension](/module/awt#dimension)) — The amount to shift the Shape

**Returns**

- [`module:AWT.Shape`](/module/awt#shape)

<MemberHeading id="moveto" depth="3" name="moveTo" sig="moveTo(newPos: module:AWT.Point): module:AWT.Shape" />

<MemberMeta sourceHref="/source/awt-js/#L844" sourceLabel="AWT.js:844" />

_Inherited from `module:AWT.Shape#moveTo`_

**Overrides:&#x20;**`module:skins/DefaultSkin.DefaultSkin#moveTo`

Moves this shape to a new position

**Parameters**

- `newPos` ([module:AWT.Point](/module/awt#point)) — The new position of the shape

**Returns**

- [`module:AWT.Shape`](/module/awt#shape)

<MemberHeading id="getshape" depth="3" name="getShape" sig="getShape(rect: module:AWT.Rectangle): module:AWT.Shape" />

<MemberMeta sourceHref="/source/awt-js/#L883" sourceLabel="AWT.js:883" />

_Inherited from `module:AWT.Shape#getShape`_

**Overrides:&#x20;**`module:skins/DefaultSkin.DefaultSkin#getShape`

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

**Overrides:&#x20;**`module:skins/DefaultSkin.DefaultSkin#contains`

Checks if the provided [module:AWT.Point](/module/awt#point) is inside this shape.

**Parameters**

- `_p` ([module:AWT.Point](/module/awt#point)) — The point to check

**Returns**

- `boolean`

<MemberHeading id="intersects" depth="3" name="intersects" sig="intersects(_r: module:AWT.Rectangle): boolean" />

<MemberMeta sourceHref="/source/awt-js/#L902" sourceLabel="AWT.js:902" />

_Inherited from `module:AWT.Shape#intersects`_

**Overrides:&#x20;**`module:skins/DefaultSkin.DefaultSkin#intersects`

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

**Overrides:&#x20;**`module:skins/DefaultSkin.DefaultSkin#fill`

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

**Overrides:&#x20;**`module:skins/DefaultSkin.DefaultSkin#stroke`

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

**Overrides:&#x20;**`module:skins/DefaultSkin.DefaultSkin#preparePath`

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

**Overrides:&#x20;**`module:skins/DefaultSkin.DefaultSkin#clip`

Creates a clipping region on the specified HTML canvas 2D rendering context

**Parameters**

- `ctx` ([external:CanvasRenderingContext2D](/module/utils#canvasrenderingcontext2d)) — The rendering context
- `fillRule` (string, optional, default: "'nonzero'") — Can be 'nonzero' (default when not set) or 'evenodd'

**Returns**

- [`external:CanvasRenderingContext2D`](/module/utils#canvasrenderingcontext2d)

<MemberHeading id="isrect" depth="3" name="isRect" sig="isRect(): boolean" />

<MemberMeta sourceHref="/source/awt-js/#L967" sourceLabel="AWT.js:967" />

_Inherited from `module:AWT.Shape#isRect`_

**Overrides:&#x20;**`module:skins/DefaultSkin.DefaultSkin#isRect`

Shorthand method for determining if a Shape is an [Rectangle](/module/awt#rectangle)

**Returns**

- `boolean`

<MemberHeading id="tostring" depth="3" name="toString" sig="toString(): string" />

<MemberMeta sourceHref="/source/awt-js/#L975" sourceLabel="AWT.js:975" />

_Inherited from `module:AWT.Shape#toString`_

**Overrides:&#x20;**`module:skins/DefaultSkin.DefaultSkin#toString`

Overwrites the original 'Object.toString' method with a more descriptive text

**Returns**

- `string`

<MemberHeading id="dolayout" depth="3" name="doLayout" sig="doLayout()" />

<MemberMeta sourceHref="/source/skins/defaultskin-js/#L205" sourceLabel="DefaultSkin.js:205" />

_Inherited from `module:skins/DefaultSkin.DefaultSkin#doLayout`_

Main method used to build the content of the skin. Resizes and places internal objects.

<MemberHeading id="updatecontent" depth="3" name="updateContent" sig="updateContent(dirtyRegion: module:AWT.Rectangle)" />

<MemberMeta sourceHref="/source/skins/skin-js/#L363" sourceLabel="Skin.js:363" />

_Inherited from `module:skins/Skin.Skin#updateContent`_

Updates the graphic contents of this skin.\
This method should be called from [module:skins/Skin.Skin#update](/module/skins-skin/skin#update)

**Parameters**

- `dirtyRegion` ([module:AWT.Rectangle](/module/awt#rectangle)) — Specifies the area to be updated. When `null`, it's the\
  whole panel.

<MemberHeading id="setenabled" depth="3" name="setEnabled" sig="setEnabled($object: external:jQuery, enabled: boolean)" />

<MemberMeta sourceHref="/source/skins/skin-js/#L734" sourceLabel="Skin.js:734" />

_Inherited from `module:skins/Skin.Skin#setEnabled`_

Enables or disables an object

**Parameters**

- `$object` ([external:jQuery](/module/utils#jquery)) — A JQuery DOM element
- `enabled` (boolean)

## Static Methods

<MemberHeading
  id="registerclass"
  depth="3"
  name="registerClass"
  sig="registerClass(
	skinName: string,
	skinClass: function,
): module:skins/Skin.Skin"
/>

<MemberMeta badges="static" sourceHref="/source/skins/skin-js/#L216" sourceLabel="Skin.js:216" />

_Inherited from `module:skins/Skin.Skin`_

Registers a new type of skin

**Parameters**

- `skinName` (string) — The name used to identify this skin
- `skinClass` (function) — The skin class, usually extending Skin

**Returns**

- [`module:skins/Skin.Skin`](/module/skins-skin#skin)

<MemberHeading
  id="registerstylesheet"
  depth="3"
  name="registerStyleSheet"
  sig="registerStyleSheet(
	skinId: string,
	ps?: module:JClicPlayer.JClicPlayer,
): boolean"
/>

<MemberMeta badges="static" sourceHref="/source/skins/skin-js/#L227" sourceLabel="Skin.js:227" />

_Inherited from `module:skins/Skin.Skin`_

Checks if the provided stylesheet ID is already registered in the root node where the current player is placed

**Parameters**

- `skinId` (string) — The unique identifier of the skin to check
- `ps` ([module:JClicPlayer.JClicPlayer](/module/jclicplayer#jclicplayer), optional) — An optional `PlayStation` (currently a [JClicPlayer](/module/jclicplayer#jclicplayer)) used as a base to find the root node

**Returns**

- `boolean`

<MemberHeading
  id="getskin"
  depth="3"
  name="getSkin"
  sig="getSkin(
	skinName: string,
	ps: module:JClicPlayer.JClicPlayer,
	options?: object,
): module:skins/Skin.Skin"
/>

<MemberMeta badges="static" sourceHref="/source/skins/skin-js/#L256" sourceLabel="Skin.js:256" />

_Inherited from `module:skins/Skin.Skin`_

Gets the specified Skin from `skinStack`, or creates a new one if not found.\
This function should be used only through `Skin.getSkin`

**Parameters**

- `skinName` (string, default: "default") — The name of the searched skin
- `ps` ([module:JClicPlayer.JClicPlayer](/module/jclicplayer#jclicplayer)) — The PlayStation (usually a [JClicPlayer](/module/jclicplayer#jclicplayer)) used to build the new skin.
- `options` (object, optional) — Optional parameter with additional options

**Returns**

- [`module:skins/Skin.Skin`](/module/skins-skin#skin)

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

<MemberHeading id="skinid" depth="3" name="skinId" sig="skinId: string" />

<MemberMeta sourceHref="/source/skins/orangeskin-js/#L70" sourceLabel="OrangeSkin.js:70" />

Class name of this skin. It will be used as a base selector in the definition of all CSS styles.

<MemberHeading id="skincss" depth="3" name="skinCSS" sig="skinCSS: string" />

<MemberMeta sourceHref="/source/skins/orangeskin-js/#L75" sourceLabel="OrangeSkin.js:75" />

Styles used in this skin

<MemberHeading id="skinid" depth="3" name="skinId" sig="skinId: string" />

<MemberMeta sourceHref="/source/skins/orangeskin-js/#L70" sourceLabel="OrangeSkin.js:70" />

_Inherited from `module:skins/OrangeSkin.OrangeSkin#skinId`_

**Overrides:&#x20;**`module:skins/DefaultSkin.DefaultSkin#skinId`

Class name of this skin. It will be used as a base selector in the definition of all CSS styles.

<MemberHeading id="ctrlcnt" depth="3" name="$ctrlCnt" sig="$ctrlCnt: external:jQuery" />

<MemberMeta sourceHref="/source/skins/defaultskin-js/#L238" sourceLabel="DefaultSkin.js:238" />

_Inherited from `module:skins/DefaultSkin.DefaultSkin#$ctrlCnt`_

**Overrides:&#x20;**`module:skins/DefaultSkin.DefaultSkin#$ctrlCnt`

The HTML div where buttons, counters and message box are placed

<MemberHeading id="margin" depth="3" name="margin" sig="margin: number" />

<MemberMeta sourceHref="/source/skins/defaultskin-js/#L243" sourceLabel="DefaultSkin.js:243" />

_Inherited from `module:skins/DefaultSkin.DefaultSkin#margin`_

**Overrides:&#x20;**`module:skins/DefaultSkin.DefaultSkin#margin`

Space (pixels) between the components of this [Skin](/module/skins-skin#skin)

<MemberHeading id="msgboxheight" depth="3" name="msgBoxHeight" sig="msgBoxHeight: number" />

<MemberMeta sourceHref="/source/skins/defaultskin-js/#L248" sourceLabel="DefaultSkin.js:248" />

_Inherited from `module:skins/DefaultSkin.DefaultSkin#msgBoxHeight`_

**Overrides:&#x20;**`module:skins/DefaultSkin.DefaultSkin#msgBoxHeight`

Height of `msgBox`

<MemberHeading id="counterswidth" depth="3" name="countersWidth" sig="countersWidth: number" />

<MemberMeta sourceHref="/source/skins/defaultskin-js/#L253" sourceLabel="DefaultSkin.js:253" />

_Inherited from `module:skins/DefaultSkin.DefaultSkin#countersWidth`_

**Overrides:&#x20;**`module:skins/DefaultSkin.DefaultSkin#countersWidth`

Width of counters, in pixels

<MemberHeading id="countersheight" depth="3" name="countersHeight" sig="countersHeight: number" />

<MemberMeta sourceHref="/source/skins/defaultskin-js/#L258" sourceLabel="DefaultSkin.js:258" />

_Inherited from `module:skins/DefaultSkin.DefaultSkin#countersHeight`_

**Overrides:&#x20;**`module:skins/DefaultSkin.DefaultSkin#countersHeight`

Height of counters, in pixels

<MemberHeading id="maincss" depth="3" name="mainCSS" sig="mainCSS: string" />

<MemberMeta sourceHref="/source/skins/defaultskin-js/#L266" sourceLabel="DefaultSkin.js:266" />

_Inherited from `module:skins/DefaultSkin.DefaultSkin#mainCSS`_

**Overrides:&#x20;**`module:skins/DefaultSkin.DefaultSkin#mainCSS`

Styles used in this skin

<MemberHeading id="maincsshalf" depth="3" name="mainCSSHalf" sig="mainCSSHalf: string" />

<MemberMeta sourceHref="/source/skins/defaultskin-js/#L271" sourceLabel="DefaultSkin.js:271" />

_Inherited from `module:skins/DefaultSkin.DefaultSkin#mainCSSHalf`_

**Overrides:&#x20;**`module:skins/DefaultSkin.DefaultSkin#mainCSSHalf`

Styles used in this skin, sized to half its regular size

<MemberHeading id="maincsstwothirds" depth="3" name="mainCSSTwoThirds" sig="mainCSSTwoThirds: string" />

<MemberMeta sourceHref="/source/skins/defaultskin-js/#L276" sourceLabel="DefaultSkin.js:276" />

_Inherited from `module:skins/DefaultSkin.DefaultSkin#mainCSSTwoThirds`_

**Overrides:&#x20;**`module:skins/DefaultSkin.DefaultSkin#mainCSSTwoThirds`

Styles used in this skin, sized to two thirds of its regular size

<MemberHeading id="cssfonts" depth="3" name="cssFonts" sig="cssFonts: Array.<string>" />

<MemberMeta sourceHref="/source/skins/defaultskin-js/#L281" sourceLabel="DefaultSkin.js:281" />

_Inherited from `module:skins/DefaultSkin.DefaultSkin#cssFonts`_

**Overrides:&#x20;**`module:skins/DefaultSkin.DefaultSkin#cssFonts`

Fonts used in this skin

<MemberHeading id="iconwidth" depth="3" name="iconWidth" sig="iconWidth: number" />

<MemberMeta sourceHref="/source/skins/defaultskin-js/#L288" sourceLabel="DefaultSkin.js:288" />

_Inherited from `module:skins/DefaultSkin.DefaultSkin#iconWidth`_

**Overrides:&#x20;**`module:skins/DefaultSkin.DefaultSkin#iconWidth`

Icon width

<MemberHeading id="iconheight" depth="3" name="iconHeight" sig="iconHeight: number" />

<MemberMeta sourceHref="/source/skins/defaultskin-js/#L293" sourceLabel="DefaultSkin.js:293" />

_Inherited from `module:skins/DefaultSkin.DefaultSkin#iconHeight`_

**Overrides:&#x20;**`module:skins/DefaultSkin.DefaultSkin#iconHeight`

Icon height

<MemberHeading id="iconfill" depth="3" name="iconFill" sig="iconFill: string" />

<MemberMeta sourceHref="/source/skins/defaultskin-js/#L298" sourceLabel="DefaultSkin.js:298" />

_Inherited from `module:skins/DefaultSkin.DefaultSkin#iconFill`_

**Overrides:&#x20;**`module:skins/DefaultSkin.DefaultSkin#iconFill`

Fill color for icons

<MemberHeading id="previcon" depth="3" name="prevIcon" sig="prevIcon: string" />

<MemberMeta sourceHref="/source/skins/defaultskin-js/#L307" sourceLabel="DefaultSkin.js:307" />

_Inherited from `module:skins/DefaultSkin.DefaultSkin#prevIcon`_

**Overrides:&#x20;**`module:skins/DefaultSkin.DefaultSkin#prevIcon`

Icon for 'previous activity' button

<MemberHeading id="nexticon" depth="3" name="nextIcon" sig="nextIcon: string" />

<MemberMeta sourceHref="/source/skins/defaultskin-js/#L312" sourceLabel="DefaultSkin.js:312" />

_Inherited from `module:skins/DefaultSkin.DefaultSkin#nextIcon`_

**Overrides:&#x20;**`module:skins/DefaultSkin.DefaultSkin#nextIcon`

Icon for 'next activity' button

<MemberHeading id="fullscreenicon" depth="3" name="fullScreenIcon" sig="fullScreenIcon: string" />

<MemberMeta sourceHref="/source/skins/defaultskin-js/#L317" sourceLabel="DefaultSkin.js:317" />

_Inherited from `module:skins/DefaultSkin.DefaultSkin#fullScreenIcon`_

**Overrides:&#x20;**`module:skins/DefaultSkin.DefaultSkin#fullScreenIcon`

Full screen on icon

<MemberHeading id="fullscreenexiticon" depth="3" name="fullScreenExitIcon" sig="fullScreenExitIcon: string" />

<MemberMeta sourceHref="/source/skins/defaultskin-js/#L322" sourceLabel="DefaultSkin.js:322" />

_Inherited from `module:skins/DefaultSkin.DefaultSkin#fullScreenExitIcon`_

**Overrides:&#x20;**`module:skins/DefaultSkin.DefaultSkin#fullScreenExitIcon`

Full screen off icon

<MemberHeading id="closeicon" depth="3" name="closeIcon" sig="closeIcon: string" />

<MemberMeta sourceHref="/source/skins/defaultskin-js/#L327" sourceLabel="DefaultSkin.js:327" />

_Inherited from `module:skins/DefaultSkin.DefaultSkin#closeIcon`_

**Overrides:&#x20;**`module:skins/DefaultSkin.DefaultSkin#closeIcon`

Close button

<MemberHeading id="infoicon" depth="3" name="infoIcon" sig="infoIcon: string" />

<MemberMeta sourceHref="/source/skins/defaultskin-js/#L332" sourceLabel="DefaultSkin.js:332" />

_Inherited from `module:skins/DefaultSkin.DefaultSkin#infoIcon`_

**Overrides:&#x20;**`module:skins/DefaultSkin.DefaultSkin#infoIcon`

Info button

<MemberHeading id="reportsicon" depth="3" name="reportsIcon" sig="reportsIcon: string" />

<MemberMeta sourceHref="/source/skins/defaultskin-js/#L337" sourceLabel="DefaultSkin.js:337" />

_Inherited from `module:skins/DefaultSkin.DefaultSkin#reportsIcon`_

**Overrides:&#x20;**`module:skins/DefaultSkin.DefaultSkin#reportsIcon`

Reports button

<MemberHeading id="countericonwidth" depth="3" name="counterIconWidth" sig="counterIconWidth: number" />

<MemberMeta sourceHref="/source/skins/defaultskin-js/#L344" sourceLabel="DefaultSkin.js:344" />

_Inherited from `module:skins/DefaultSkin.DefaultSkin#counterIconWidth`_

**Overrides:&#x20;**`module:skins/DefaultSkin.DefaultSkin#counterIconWidth`

Counter icon width

<MemberHeading id="countericonheight" depth="3" name="counterIconHeight" sig="counterIconHeight: number" />

<MemberMeta sourceHref="/source/skins/defaultskin-js/#L349" sourceLabel="DefaultSkin.js:349" />

_Inherited from `module:skins/DefaultSkin.DefaultSkin#counterIconHeight`_

**Overrides:&#x20;**`module:skins/DefaultSkin.DefaultSkin#counterIconHeight`

Counter icon height

<MemberHeading id="countericonfill" depth="3" name="counterIconFill" sig="counterIconFill: string" />

<MemberMeta sourceHref="/source/skins/defaultskin-js/#L354" sourceLabel="DefaultSkin.js:354" />

_Inherited from `module:skins/DefaultSkin.DefaultSkin#counterIconFill`_

**Overrides:&#x20;**`module:skins/DefaultSkin.DefaultSkin#counterIconFill`

Counter icon fill color

<MemberHeading id="timeicon" depth="3" name="timeIcon" sig="timeIcon: string" />

<MemberMeta sourceHref="/source/skins/defaultskin-js/#L360" sourceLabel="DefaultSkin.js:360" />

_Inherited from `module:skins/DefaultSkin.DefaultSkin#timeIcon`_

**Overrides:&#x20;**`module:skins/DefaultSkin.DefaultSkin#timeIcon`

Time icon

<MemberHeading id="scoreicon" depth="3" name="scoreIcon" sig="scoreIcon: string" />

<MemberMeta sourceHref="/source/skins/defaultskin-js/#L365" sourceLabel="DefaultSkin.js:365" />

_Inherited from `module:skins/DefaultSkin.DefaultSkin#scoreIcon`_

**Overrides:&#x20;**`module:skins/DefaultSkin.DefaultSkin#scoreIcon`

Score icon

<MemberHeading id="actionsicon" depth="3" name="actionsIcon" sig="actionsIcon: string" />

<MemberMeta sourceHref="/source/skins/defaultskin-js/#L370" sourceLabel="DefaultSkin.js:370" />

_Inherited from `module:skins/DefaultSkin.DefaultSkin#actionsIcon`_

**Overrides:&#x20;**`module:skins/DefaultSkin.DefaultSkin#actionsIcon`

Actions icon

<MemberHeading id="div" depth="3" name="$div" sig="$div: external:jQuery" />

<MemberMeta sourceHref="/source/skins/skin-js/#L793" sourceLabel="Skin.js:793" />

_Inherited from `module:skins/Skin.Skin#$div`_

**Overrides:&#x20;**`module:skins/DefaultSkin.DefaultSkin#$div`

The HTML div object used by this Skin

<MemberHeading id="playercnt" depth="3" name="$playerCnt" sig="$playerCnt: external:jQuery" />

<MemberMeta sourceHref="/source/skins/skin-js/#L798" sourceLabel="Skin.js:798" />

_Inherited from `module:skins/Skin.Skin#$playerCnt`_

**Overrides:&#x20;**`module:skins/DefaultSkin.DefaultSkin#$playerCnt`

The HTML div where JClic Player will be placed

<MemberHeading id="name" depth="3" name="name" sig="name: string" />

<MemberMeta sourceHref="/source/skins/skin-js/#L803" sourceLabel="Skin.js:803" />

_Inherited from `module:skins/Skin.Skin#name`_

**Overrides:&#x20;**`module:skins/DefaultSkin.DefaultSkin#name`

Current name of the skin.

<MemberHeading id="options" depth="3" name="options" sig="options: object" />

<MemberMeta sourceHref="/source/skins/skin-js/#L808" sourceLabel="Skin.js:808" />

_Inherited from `module:skins/Skin.Skin#options`_

**Overrides:&#x20;**`module:skins/DefaultSkin.DefaultSkin#options`

Specific options of this skin

<MemberHeading id="waitpanel" depth="3" name="$waitPanel" sig="$waitPanel: external:jQuery" />

<MemberMeta sourceHref="/source/skins/skin-js/#L813" sourceLabel="Skin.js:813" />

_Inherited from `module:skins/Skin.Skin#$waitPanel`_

**Overrides:&#x20;**`module:skins/DefaultSkin.DefaultSkin#$waitPanel`

Waiting panel, displayed while loading resources.

<MemberHeading id="progress" depth="3" name="$progress" sig="$progress: external:jQuery" />

<MemberMeta sourceHref="/source/skins/skin-js/#L818" sourceLabel="Skin.js:818" />

_Inherited from `module:skins/Skin.Skin#$progress`_

**Overrides:&#x20;**`module:skins/DefaultSkin.DefaultSkin#$progress`

Graphic indicator of loading progress

<MemberHeading id="currentprogress" depth="3" name="currentProgress" sig="currentProgress: number" />

<MemberMeta sourceHref="/source/skins/skin-js/#L823" sourceLabel="Skin.js:823" />

_Inherited from `module:skins/Skin.Skin#currentProgress`_

**Overrides:&#x20;**`module:skins/DefaultSkin.DefaultSkin#currentProgress`

Current value of the progress bar

<MemberHeading id="maxprogress" depth="3" name="maxProgress" sig="maxProgress: number" />

<MemberMeta sourceHref="/source/skins/skin-js/#L828" sourceLabel="Skin.js:828" />

_Inherited from `module:skins/Skin.Skin#maxProgress`_

**Overrides:&#x20;**`module:skins/DefaultSkin.DefaultSkin#maxProgress`

Max value of the progress bar

<MemberHeading id="dlgoverlay" depth="3" name="$dlgOverlay" sig="$dlgOverlay: external:jQuery" />

<MemberMeta sourceHref="/source/skins/skin-js/#L848" sourceLabel="Skin.js:848" />

_Inherited from `module:skins/Skin.Skin#$dlgOverlay`_

**Overrides:&#x20;**`module:skins/DefaultSkin.DefaultSkin#$dlgOverlay`

Main panel used to display modal and non-modal dialogs

<MemberHeading id="dlgmainpanel" depth="3" name="$dlgMainPanel" sig="$dlgMainPanel: external:jQuery" />

<MemberMeta sourceHref="/source/skins/skin-js/#L853" sourceLabel="Skin.js:853" />

_Inherited from `module:skins/Skin.Skin#$dlgMainPanel`_

**Overrides:&#x20;**`module:skins/DefaultSkin.DefaultSkin#$dlgMainPanel`

Main panel of dialogs, where relevant information must be placed

<MemberHeading id="dlgbottompanel" depth="3" name="$dlgBottomPanel" sig="$dlgBottomPanel: external:jQuery" />

<MemberMeta sourceHref="/source/skins/skin-js/#L858" sourceLabel="Skin.js:858" />

_Inherited from `module:skins/Skin.Skin#$dlgBottomPanel`_

**Overrides:&#x20;**`module:skins/DefaultSkin.DefaultSkin#$dlgBottomPanel`

Bottom panel of dialogs, used for action buttons

<MemberHeading id="infohead" depth="3" name="infoHead" sig="infoHead: external:jQuery" />

<MemberMeta sourceHref="/source/skins/skin-js/#L863" sourceLabel="Skin.js:863" />

_Inherited from `module:skins/Skin.Skin#infoHead`_

**Overrides:&#x20;**`module:skins/DefaultSkin.DefaultSkin#infoHead`

Element usually used as header in dialogs, with JClic logo, name and version

<MemberHeading id="copybtn" depth="3" name="$copyBtn" sig="$copyBtn: external:jQuery" />

<MemberMeta sourceHref="/source/skins/skin-js/#L868" sourceLabel="Skin.js:868" />

_Inherited from `module:skins/Skin.Skin#$copyBtn`_

**Overrides:&#x20;**`module:skins/DefaultSkin.DefaultSkin#$copyBtn`

Iconic button used to copy content to clipboard

<MemberHeading id="closedlgbtn" depth="3" name="$closeDlgBtn" sig="$closeDlgBtn: external:jQuery" />

<MemberMeta sourceHref="/source/skins/skin-js/#L873" sourceLabel="Skin.js:873" />

_Inherited from `module:skins/Skin.Skin#$closeDlgBtn`_

**Overrides:&#x20;**`module:skins/DefaultSkin.DefaultSkin#$closeDlgBtn`

Iconic button used to close the dialog

<MemberHeading id="okdlgbtn" depth="3" name="$okDlgBtn" sig="$okDlgBtn: external:jQuery" />

<MemberMeta sourceHref="/source/skins/skin-js/#L878" sourceLabel="Skin.js:878" />

_Inherited from `module:skins/Skin.Skin#$okDlgBtn`_

**Overrides:&#x20;**`module:skins/DefaultSkin.DefaultSkin#$okDlgBtn`

OK dialog button

<MemberHeading id="canceldlgbtn" depth="3" name="$cancelDlgBtn" sig="$cancelDlgBtn: external:jQuery" />

<MemberMeta sourceHref="/source/skins/skin-js/#L883" sourceLabel="Skin.js:883" />

_Inherited from `module:skins/Skin.Skin#$cancelDlgBtn`_

**Overrides:&#x20;**`module:skins/DefaultSkin.DefaultSkin#$cancelDlgBtn`

Cancel dialog button

<MemberHeading id="dlgokvalue" depth="3" name="_dlgOkValue" sig="_dlgOkValue: object" />

<MemberMeta sourceHref="/source/skins/skin-js/#L888" sourceLabel="Skin.js:888" />

_Inherited from `module:skins/Skin.Skin#_dlgOkValue`_

**Overrides:&#x20;**`module:skins/DefaultSkin.DefaultSkin#_dlgOkValue`

Value to be returned by the dialog promise when the presented task is fulfilled

<MemberHeading id="dlgcancelvalue" depth="3" name="_dlgCancelValue" sig="_dlgCancelValue: object" />

<MemberMeta sourceHref="/source/skins/skin-js/#L893" sourceLabel="Skin.js:893" />

_Inherited from `module:skins/Skin.Skin#_dlgCancelValue`_

**Overrides:&#x20;**`module:skins/DefaultSkin.DefaultSkin#_dlgCancelValue`

Value to be returned in user-canceled dialogs

<MemberHeading id="ismodaldlg" depth="3" name="_isModalDlg" sig="_isModalDlg: boolean" />

<MemberMeta sourceHref="/source/skins/skin-js/#L898" sourceLabel="Skin.js:898" />

_Inherited from `module:skins/Skin.Skin#_isModalDlg`_

**Overrides:&#x20;**`module:skins/DefaultSkin.DefaultSkin#_isModalDlg`

Flag indicating if the current dialog is modal or not

<MemberHeading id="reportspanel" depth="3" name="$reportsPanel" sig="$reportsPanel: external:jQuery" />

<MemberMeta sourceHref="/source/skins/skin-js/#L903" sourceLabel="Skin.js:903" />

_Inherited from `module:skins/Skin.Skin#$reportsPanel`_

**Overrides:&#x20;**`module:skins/DefaultSkin.DefaultSkin#$reportsPanel`

Div inside [$dlgOverlay](/module/skins-skin/skin#dlgoverlay) where JClicPlayer will place the information to be shown

<MemberHeading id="buttons" depth="3" name="buttons" sig="buttons: object" />

<MemberMeta sourceHref="/source/skins/skin-js/#L908" sourceLabel="Skin.js:908" />

_Inherited from `module:skins/Skin.Skin#buttons`_

**Overrides:&#x20;**`module:skins/DefaultSkin.DefaultSkin#buttons`

The basic collection of buttons that most skins implement

<MemberHeading id="counters" depth="3" name="counters" sig="counters: object" />

<MemberMeta sourceHref="/source/skins/skin-js/#L924" sourceLabel="Skin.js:924" />

_Inherited from `module:skins/Skin.Skin#counters`_

**Overrides:&#x20;**`module:skins/DefaultSkin.DefaultSkin#counters`

The collection of counters

<MemberHeading id="msgarea" depth="3" name="msgArea" sig="msgArea: object" />

<MemberMeta sourceHref="/source/skins/skin-js/#L933" sourceLabel="Skin.js:933" />

_Inherited from `module:skins/Skin.Skin#msgArea`_

**Overrides:&#x20;**`module:skins/DefaultSkin.DefaultSkin#msgArea`

The collection of message areas

<MemberHeading id="player" depth="3" name="player" sig="player: module:JClicPlayer.JClicPlayer" />

<MemberMeta sourceHref="/source/skins/skin-js/#L942" sourceLabel="Skin.js:942" />

_Inherited from `module:skins/Skin.Skin#player`_

**Overrides:&#x20;**`module:skins/DefaultSkin.DefaultSkin#player`

The [JClicPlayer](/module/jclicplayer#jclicplayer) object associated to this skin

<MemberHeading id="ps" depth="3" name="ps" sig="ps: module:JClicPlayer.JClicPlayer" />

<MemberMeta sourceHref="/source/skins/skin-js/#L948" sourceLabel="Skin.js:948" />

_Inherited from `module:skins/Skin.Skin#ps`_

**Overrides:&#x20;**`module:skins/DefaultSkin.DefaultSkin#ps`

The [PlayStation](http://projectestac.github.io/jclic/apidoc/edu/xtec/jclic/PlayStation.html)\
used by this Skin. Usually, the same as `player`

<MemberHeading id="waitcursorcount" depth="3" name="waitCursorCount" sig="waitCursorCount: number" />

<MemberMeta sourceHref="/source/skins/skin-js/#L953" sourceLabel="Skin.js:953" />

_Inherited from `module:skins/Skin.Skin#waitCursorCount`_

**Overrides:&#x20;**`module:skins/DefaultSkin.DefaultSkin#waitCursorCount`

Counter to be incremented or decremented as `waitCursor` is requested or released.

<MemberHeading id="basiccss" depth="3" name="basicCSS" sig="basicCSS: string" />

<MemberMeta sourceHref="/source/skins/skin-js/#L961" sourceLabel="Skin.js:961" />

_Inherited from `module:skins/Skin.Skin#basicCSS`_

**Overrides:&#x20;**`module:skins/DefaultSkin.DefaultSkin#basicCSS`

Main styles

<MemberHeading id="waitanimcss" depth="3" name="waitAnimCSS" sig="waitAnimCSS: string" />

<MemberMeta sourceHref="/source/skins/skin-js/#L966" sourceLabel="Skin.js:966" />

_Inherited from `module:skins/Skin.Skin#waitAnimCSS`_

**Overrides:&#x20;**`module:skins/DefaultSkin.DefaultSkin#waitAnimCSS`

Waiting screen styles

<MemberHeading id="waitimgbig" depth="3" name="waitImgBig" sig="waitImgBig: string" />

<MemberMeta sourceHref="/source/skins/skin-js/#L972" sourceLabel="Skin.js:972" />

_Inherited from `module:skins/Skin.Skin#waitImgBig`_

**Overrides:&#x20;**`module:skins/DefaultSkin.DefaultSkin#waitImgBig`

Animated image displayed while loading resources\
Based on Ryan Allen's [svg-spinner](http://articles.dappergentlemen.com/2015/01/13/svg-spinner/)

<MemberHeading id="waitimgsmall" depth="3" name="waitImgSmall" sig="waitImgSmall: string" />

<MemberMeta sourceHref="/source/skins/skin-js/#L977" sourceLabel="Skin.js:977" />

_Inherited from `module:skins/Skin.Skin#waitImgSmall`_

**Overrides:&#x20;**`module:skins/DefaultSkin.DefaultSkin#waitImgSmall`

Animated image displayed while loading resources (small)

<MemberHeading id="reportscss" depth="3" name="reportsCSS" sig="reportsCSS: string" />

<MemberMeta sourceHref="/source/skins/skin-js/#L982" sourceLabel="Skin.js:982" />

_Inherited from `module:skins/Skin.Skin#reportsCSS`_

**Overrides:&#x20;**`module:skins/DefaultSkin.DefaultSkin#reportsCSS`

Reports screen styles

<MemberHeading id="closedialogicon" depth="3" name="closeDialogIcon" sig="closeDialogIcon: string" />

<MemberMeta sourceHref="/source/skins/skin-js/#L990" sourceLabel="Skin.js:990" />

_Inherited from `module:skins/Skin.Skin#closeDialogIcon`_

**Overrides:&#x20;**`module:skins/DefaultSkin.DefaultSkin#closeDialogIcon`

Icon for 'close dialog' button

<MemberHeading id="okdialogicon" depth="3" name="okDialogIcon" sig="okDialogIcon: string" />

<MemberMeta sourceHref="/source/skins/skin-js/#L995" sourceLabel="Skin.js:995" />

_Inherited from `module:skins/Skin.Skin#okDialogIcon`_

**Overrides:&#x20;**`module:skins/DefaultSkin.DefaultSkin#okDialogIcon`

Icon for 'ok' button

<MemberHeading id="copyicon" depth="3" name="copyIcon" sig="copyIcon: string" />

<MemberMeta sourceHref="/source/skins/skin-js/#L1000" sourceLabel="Skin.js:1000" />

_Inherited from `module:skins/Skin.Skin#copyIcon`_

**Overrides:&#x20;**`module:skins/DefaultSkin.DefaultSkin#copyIcon`

Icon for 'copy' button

<MemberHeading id="applogo" depth="3" name="appLogo" sig="appLogo: string" />

<MemberMeta sourceHref="/source/skins/skin-js/#L1005" sourceLabel="Skin.js:1005" />

_Inherited from `module:skins/Skin.Skin#appLogo`_

**Overrides:&#x20;**`module:skins/DefaultSkin.DefaultSkin#appLogo`

JClic logo

<MemberHeading id="invalidatedrect" depth="3" name="invalidatedRect" sig="invalidatedRect: module:AWT.Rectangle" />

<MemberMeta sourceHref="/source/awt-js/#L2031" sourceLabel="AWT.js:2031" />

_Inherited from `module:AWT.Container#invalidatedRect`_

**Overrides:&#x20;**`module:skins/DefaultSkin.DefaultSkin#invalidatedRect`

The currently "invalidated" area

<MemberHeading id="type" depth="3" name="type" sig="type: string" />

<MemberMeta sourceHref="/source/awt-js/#L1255" sourceLabel="AWT.js:1255" />

_Inherited from `module:AWT.Rectangle#type`_

**Overrides:&#x20;**`module:skins/DefaultSkin.DefaultSkin#type`

Shape type id

<MemberHeading id="dim" depth="3" name="dim" sig="dim: module:AWT.Dimension" />

<MemberMeta sourceHref="/source/awt-js/#L1260" sourceLabel="AWT.js:1260" />

_Inherited from `module:AWT.Rectangle#dim`_

**Overrides:&#x20;**`module:skins/DefaultSkin.DefaultSkin#dim`

The [Dimension](/module/awt#dimension) of the Rectangle

<MemberHeading id="pos" depth="3" name="pos" sig="pos: module:AWT.Point" />

<MemberMeta sourceHref="/source/awt-js/#L1019" sourceLabel="AWT.js:1019" />

_Inherited from `module:AWT.Shape#pos`_

**Overrides:&#x20;**`module:skins/DefaultSkin.DefaultSkin#pos`

The current position of the shape

<MemberHeading id="skinid" depth="3" name="skinId" sig="skinId: string" />

<MemberMeta sourceHref="/source/skins/orangeskin-js/#L70" sourceLabel="OrangeSkin.js:70" />

_Inherited from `module:skins/OrangeSkin.OrangeSkin#skinId`_

**Overrides:&#x20;**`module:skins/DefaultSkin.DefaultSkin#skinId`

Class name of this skin. It will be used as a base selector in the definition of all CSS styles.

## Static Fields

<MemberHeading id="skinstack" depth="3" name="skinStack" sig="skinStack: Array.<module:skins/Skin.Skin>" />

<MemberMeta badges="static" sourceHref="/source/skins/skin-js/#L763" sourceLabel="Skin.js:763" />

_Inherited from `module:skins/Skin.Skin`_

Collection of realized **Skin** objects.

<MemberHeading id="rootstyles" depth="3" name="rootStyles" sig="rootStyles: object" />

<MemberMeta badges="static" sourceHref="/source/skins/skin-js/#L769" sourceLabel="Skin.js:769" />

_Inherited from `module:skins/Skin.Skin`_

Collection of skin style sheets already registered on the current document

<MemberHeading id="lastid" depth="3" name="lastId" sig="lastId: number" />

<MemberMeta badges="static" sourceHref="/source/skins/skin-js/#L775" sourceLabel="Skin.js:775" />

_Inherited from `module:skins/Skin.Skin`_

Counter used to label root nodes with unique IDs

<MemberHeading id="classes" depth="3" name="CLASSES" sig="CLASSES: object" />

<MemberMeta badges="static" sourceHref="/source/skins/skin-js/#L781" sourceLabel="Skin.js:781" />

_Inherited from `module:skins/Skin.Skin`_

List of classes derived from Skin. It should be filled by real skin classes at declaration time.
