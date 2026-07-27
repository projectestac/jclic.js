---
title: CustomSkin
kind: class
longname: module:skins/CustomSkin.CustomSkin
description: Custom {@link module:skins/Skin.Skin Skin} for JClic.js, built assembling specific cuts of a canvas (usually a PNG file) defined in an XML file
---

# CustomSkin

**Extends:&#x20;**[`module:skins/Skin.Skin`](/module/skins-skin#skin)

<SourceLink href="/source/skins/customskin-js/#L43" label="CustomSkin.js:43" />

Custom [Skin](/module/skins-skin#skin) for JClic.js, built assembling specific cuts of a canvas (usually a PNG file) defined in an XML file

---

## Constructor

<Signature
  code="new CustomSkin(
	ps: module:JClicPlayer.JClicPlayer,
	name?: string,
	options?: object,
): CustomSkin"
/>

CustomSkin constructor

**Parameters**

- `ps` ([module:JClicPlayer.JClicPlayer](/module/jclicplayer#jclicplayer)) — The PlayStation (currently a [JClicPlayer](/module/jclicplayer#jclicplayer)) used to load and\
  realize the media objects needed tot build the Skin.
- `name` (string, optional, default: null) — The skin class name
- `options` (object, optional, default: null) — Optional parameter with additional options

---

## Instance Methods

<MemberHeading id="enablemainbuttons" depth="3" name="enableMainButtons" sig="enableMainButtons(status: boolean)" />

<MemberMeta sourceHref="/source/skins/customskin-js/#L114" sourceLabel="CustomSkin.js:114" />

**Overrides:&#x20;**`module:skins/Skin.Skin#enableMainButtons`

Enables or disables the `tabindex` attribute of the main buttons. Useful when a modal dialog\
overlay is active, to avoid direct access to controls not related with the dialog.

**Parameters**

- `status` (boolean) — `true` to make main controls navigable, `false` otherwise

<MemberHeading id="computestylesheets" depth="3" name="_computeStyleSheets" sig="_computeStyleSheets(): string" />

<MemberMeta sourceHref="/source/skins/customskin-js/#L123" sourceLabel="CustomSkin.js:123" />

Computes the CSS styles used by this skin in thre moodes: main, half ant twoThirds.\
The resulting strings will be stored in `cssVariants`

**Returns**

- `string`

<MemberHeading id="getstylesheets" depth="3" name="_getStyleSheets" sig="_getStyleSheets(media: string): string" />

<MemberMeta sourceHref="/source/skins/customskin-js/#L344" sourceLabel="CustomSkin.js:344" />

Returns the CSS styles used by this skin. This method should be called only from\
the `Skin` constructor, and overridded by subclasses if needed.

**Parameters**

- `media` (string, default: "default") — A specific media size. Possible values are: 'default', 'half' and 'twoThirds'

**Returns**

- `string`

<MemberHeading id="setwaitcursor" depth="3" name="setWaitCursor" sig="setWaitCursor(status: boolean)" />

<MemberMeta sourceHref="/source/skins/customskin-js/#L356" sourceLabel="CustomSkin.js:356" />

Sets/unsets the 'wait' state

**Parameters**

- `status` (boolean) — Whether to set or unset the wait status. When `undefined`, the\
  `waitCursorCount` member is evaluated to decide if the wait state should be activated or deactivated.

<MemberHeading id="getstylesheets" depth="3" name="_getStyleSheets" sig="_getStyleSheets(media: string): string" />

<MemberMeta sourceHref="/source/skins/customskin-js/#L344" sourceLabel="CustomSkin.js:344" />

_Inherited from `module:skins/CustomSkin.CustomSkin#_getStyleSheets`_

**Overrides:&#x20;**`module:skins/Skin.Skin#_getStyleSheets`

Returns the CSS styles used by this skin. This method should be called only from\
the `Skin` constructor, and overridded by subclasses if needed.

**Parameters**

- `media` (string, default: "default") — A specific media size. Possible values are: 'default', 'half' and 'twoThirds'

**Returns**

- `string`

<MemberHeading id="attach" depth="3" name="attach" sig="attach(player: module:JClicPlayer.JClicPlayer)" />

<MemberMeta sourceHref="/source/skins/skin-js/#L312" sourceLabel="Skin.js:312" />

_Inherited from `module:skins/Skin.Skin#attach`_

**Overrides:&#x20;**`module:skins/Skin.Skin#attach`

Attaches a [JClicPlayer](/module/jclicplayer#jclicplayer) object to this Skin

**Parameters**

- `player` ([module:JClicPlayer.JClicPlayer](/module/jclicplayer#jclicplayer))

<MemberHeading id="setskinsizes" depth="3" name="setSkinSizes" sig="setSkinSizes(full: boolean)" />

<MemberMeta sourceHref="/source/skins/skin-js/#L326" sourceLabel="Skin.js:326" />

_Inherited from `module:skins/Skin.Skin#setSkinSizes`_

**Overrides:&#x20;**`module:skins/Skin.Skin#setSkinSizes`

Sets the 'size' CSS values (max, min and compulsory) to the main `div` of this skin

**Parameters**

- `full` (boolean) — `true` when the skin is in full screen mode

<MemberHeading id="detach" depth="3" name="detach" sig="detach()" />

<MemberMeta sourceHref="/source/skins/skin-js/#L348" sourceLabel="Skin.js:348" />

_Inherited from `module:skins/Skin.Skin#detach`_

**Overrides:&#x20;**`module:skins/Skin.Skin#detach`

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

**Overrides:&#x20;**`module:skins/Skin.Skin#resetAllCounters`

Resets all counters

**Parameters**

- `bEnabled` (boolean) — Leave it enabled/disabled

<MemberHeading id="setwaitcursor" depth="3" name="setWaitCursor" sig="setWaitCursor(status: boolean)" />

<MemberMeta sourceHref="/source/skins/customskin-js/#L356" sourceLabel="CustomSkin.js:356" />

_Inherited from `module:skins/CustomSkin.CustomSkin#setWaitCursor`_

**Overrides:&#x20;**`module:skins/Skin.Skin#setWaitCursor`

Sets/unsets the 'wait' state

**Parameters**

- `status` (boolean) — Whether to set or unset the wait status. When `undefined`, the\
  `waitCursorCount` member is evaluated to decide if the wait state should be activated or deactivated.

<MemberHeading id="setprogress" depth="3" name="setProgress" sig="setProgress(val: number, max?: number)" />

<MemberMeta sourceHref="/source/skins/skin-js/#L420" sourceLabel="Skin.js:420" />

_Inherited from `module:skins/Skin.Skin#setProgress`_

**Overrides:&#x20;**`module:skins/Skin.Skin#setProgress`

Sets the current value of the progress bar

**Parameters**

- `val` (number) — The current value. Should be less or equal than `max`. When -1, the progress bar will be hidden.
- `max` (number, optional) — Optional parameter representing the maximum value. When passed, the progress bar will be displayed.

<MemberHeading id="incprogress" depth="3" name="incProgress" sig="incProgress(val?: number)" />

<MemberMeta sourceHref="/source/skins/skin-js/#L440" sourceLabel="Skin.js:440" />

_Inherited from `module:skins/Skin.Skin#incProgress`_

**Overrides:&#x20;**`module:skins/Skin.Skin#incProgress`

Increments the progress bar value by the specified amount, only when the progress bar is running.

**Parameters**

- `val` (number, optional) — The amount to increment. When not defined, it's 1.

<MemberHeading id="showhelp" depth="3" name="showHelp" sig="showHelp(_$hlpComponent: external:jQuery)" />

<MemberMeta sourceHref="/source/skins/skin-js/#L450" sourceLabel="Skin.js:450" />

_Inherited from `module:skins/Skin.Skin#showHelp`_

**Overrides:&#x20;**`module:skins/Skin.Skin#showHelp`

Shows a window with clues or help for the current activity

**Parameters**

- `_$hlpComponent` ([external:jQuery](/module/utils#jquery)) — A JQuery DOM element with the information to be shown.\
  It can be a string or number. When `null`, the help window (if any) must be closed.

<MemberHeading id="showdlg" depth="3" name="showDlg" sig="showDlg(modal: boolean, options: object): external:Promise" />

<MemberMeta sourceHref="/source/skins/skin-js/#L462" sourceLabel="Skin.js:462" />

_Inherited from `module:skins/Skin.Skin#showDlg`_

**Overrides:&#x20;**`module:skins/Skin.Skin#showDlg`

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

**Overrides:&#x20;**`module:skins/Skin.Skin#_closeDlg`

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

**Overrides:&#x20;**`module:skins/Skin.Skin#showReports`

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

**Overrides:&#x20;**`module:skins/Skin.Skin#$printReport`

Formats the current report in a DOM tree, ready to be placed in `$reportsPanel`

**Parameters**

- `reporter` ([module:report/Reporter.Reporter](/module/report-reporter#reporter)) — The reporter system currently in use

**Returns**

- `Array.<`[`external:jQuery`](/module/utils#jquery)`>`

<MemberHeading id="enablecounter" depth="3" name="enableCounter" sig="enableCounter(counter: string, bEnabled: boolean)" />

<MemberMeta sourceHref="/source/skins/skin-js/#L641" sourceLabel="Skin.js:641" />

_Inherited from `module:skins/Skin.Skin#enableCounter`_

**Overrides:&#x20;**`module:skins/Skin.Skin#enableCounter`

Enables or disables a specific counter

**Parameters**

- `counter` (string) — Which counter
- `bEnabled` (boolean) — When `true`, the counter will be enabled.

<MemberHeading id="dolayout" depth="3" name="doLayout" sig="doLayout()" />

<MemberMeta sourceHref="/source/skins/skin-js/#L649" sourceLabel="Skin.js:649" />

_Inherited from `module:skins/Skin.Skin#doLayout`_

**Overrides:&#x20;**`module:skins/Skin.Skin#doLayout`

Main method used to build the content of the skin. Resizes and places internal objects.

<MemberHeading id="fit" depth="3" name="fit" sig="fit(): module:AWT.Dimension" />

<MemberMeta sourceHref="/source/skins/skin-js/#L685" sourceLabel="Skin.js:685" />

_Inherited from `module:skins/Skin.Skin#fit`_

**Overrides:&#x20;**`module:skins/Skin.Skin#fit`

adjusts the skin to the dimension of its `$div` container

**Returns**

- [`module:AWT.Dimension`](/module/awt#dimension) — the new dimension of the skin

<MemberHeading id="setscreenfull" depth="3" name="setScreenFull" sig="setScreenFull(status: boolean): boolean" />

<MemberMeta sourceHref="/source/skins/skin-js/#L697" sourceLabel="Skin.js:697" />

_Inherited from `module:skins/Skin.Skin#setScreenFull`_

**Overrides:&#x20;**`module:skins/Skin.Skin#setScreenFull`

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

**Overrides:&#x20;**`module:skins/Skin.Skin#actionStatusChanged`

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

**Overrides:&#x20;**`module:skins/Skin.Skin#equals`

Compares two Skin objects

**Parameters**

- `skin` ([module:skins/Skin.Skin](/module/skins-skin#skin)) — The Skin to compare against this

**Returns**

- `boolean`

<MemberHeading id="getmsgbox" depth="3" name="getMsgBox" sig="getMsgBox(): module:boxes/ActiveBox.ActiveBox" />

<MemberMeta sourceHref="/source/skins/skin-js/#L754" sourceLabel="Skin.js:754" />

_Inherited from `module:skins/Skin.Skin#getMsgBox`_

**Overrides:&#x20;**`module:skins/Skin.Skin#getMsgBox`

Gets the [ActiveBox](/module/boxes-activebox#activebox) used to display the main messages of activities

**Returns**

- [`module:boxes/ActiveBox.ActiveBox`](/module/boxes-activebox#activebox)

<MemberHeading id="invalidate" depth="3" name="invalidate" sig="invalidate(rect: module:AWT.Rectangle)" />

<MemberMeta sourceHref="/source/awt-js/#L1994" sourceLabel="AWT.js:1994" />

_Inherited from `module:AWT.Container#invalidate`_

**Overrides:&#x20;**`module:skins/Skin.Skin#invalidate`

Adds the provided rectangle to the invalidated area.

**Parameters**

- `rect` ([module:AWT.Rectangle](/module/awt#rectangle))

<MemberHeading id="update" depth="3" name="update" sig="update()" />

<MemberMeta sourceHref="/source/awt-js/#L2008" sourceLabel="AWT.js:2008" />

_Inherited from `module:AWT.Container#update`_

**Overrides:&#x20;**`module:skins/Skin.Skin#update`

Updates the invalidated area

<MemberHeading id="getbounds" depth="3" name="getBounds" sig="getBounds(): module:AWT.Rectangle" />

<MemberMeta sourceHref="/source/awt-js/#L1081" sourceLabel="AWT.js:1081" />

_Inherited from `module:AWT.Rectangle#getBounds`_

**Overrides:&#x20;**`module:skins/Skin.Skin#getBounds`

Gets the enclosing [Rectangle](/module/awt#rectangle) of this Shape.

**Returns**

- [`module:AWT.Rectangle`](/module/awt#rectangle)

<MemberHeading id="setbounds" depth="3" name="setBounds" sig="setBounds(rect: module:AWT.Rectangle): module:AWT.Rectangle" />

<MemberMeta sourceHref="/source/awt-js/#L1090" sourceLabel="AWT.js:1090" />

_Inherited from `module:AWT.Rectangle#setBounds`_

**Overrides:&#x20;**`module:skins/Skin.Skin#setBounds`

Sets this Rectangle the position and dimension of another one

**Parameters**

- `rect` ([module:AWT.Rectangle](/module/awt#rectangle))

**Returns**

- [`module:AWT.Rectangle`](/module/awt#rectangle)

<MemberHeading id="clone" depth="3" name="clone" sig="clone(): module:AWT.Rectangle" />

<MemberMeta sourceHref="/source/awt-js/#L1113" sourceLabel="AWT.js:1113" />

_Inherited from `module:AWT.Rectangle#clone`_

**Overrides:&#x20;**`module:skins/Skin.Skin#clone`

Clones this Rectangle

**Returns**

- [`module:AWT.Rectangle`](/module/awt#rectangle)

<MemberHeading id="scaleby" depth="3" name="scaleBy" sig="scaleBy(delta: Point | Dimension): module:AWT.Rectangle" />

<MemberMeta sourceHref="/source/awt-js/#L1122" sourceLabel="AWT.js:1122" />

_Inherited from `module:AWT.Rectangle#scaleBy`_

**Overrides:&#x20;**`module:skins/Skin.Skin#scaleBy`

Multiplies the dimension of the Shape by the specified `delta` amount.

**Parameters**

- `delta` ([Point](/module/awt#point) | [Dimension](/module/awt#dimension)) — Object containing the X and Y ratio to be scaled.

**Returns**

- [`module:AWT.Rectangle`](/module/awt#rectangle)

<MemberHeading id="grow" depth="3" name="grow" sig="grow(dx: number, dy: number): module:AWT.Rectangle" />

<MemberMeta sourceHref="/source/awt-js/#L1134" sourceLabel="AWT.js:1134" />

_Inherited from `module:AWT.Rectangle#grow`_

**Overrides:&#x20;**`module:skins/Skin.Skin#grow`

Expands the boundaries of this shape. This affects the current position and dimension.

**Parameters**

- `dx` (number) — The amount to grow (or decrease) in horizontal direction
- `dy` (number) — The amount to grow (or decrease) in vertical direction

**Returns**

- [`module:AWT.Rectangle`](/module/awt#rectangle)

<MemberHeading id="getoppositevertex" depth="3" name="getOppositeVertex" sig="getOppositeVertex(): module:AWT.Point" />

<MemberMeta sourceHref="/source/awt-js/#L1146" sourceLabel="AWT.js:1146" />

_Inherited from `module:AWT.Rectangle#getOppositeVertex`_

**Overrides:&#x20;**`module:skins/Skin.Skin#getOppositeVertex`

Gets the [module:AWT.Point](/module/awt#point) corresponding to the lower-right vertex of the Rectangle.

**Returns**

- [`module:AWT.Point`](/module/awt#point)

<MemberHeading id="add" depth="3" name="add" sig="add(shape: module:AWT.Shape): module:AWT.Rectangle" />

<MemberMeta sourceHref="/source/awt-js/#L1155" sourceLabel="AWT.js:1155" />

_Inherited from `module:AWT.Rectangle#add`_

**Overrides:&#x20;**`module:skins/Skin.Skin#add`

Adds the boundaries of another shape to the current one

**Parameters**

- `shape` ([module:AWT.Shape](/module/awt#shape)) — The [module:AWT.Shape](/module/awt#shape) to be added

**Returns**

- [`module:AWT.Rectangle`](/module/awt#rectangle)

<MemberHeading id="getcoords" depth="3" name="getCoords" sig="getCoords(): string" />

<MemberMeta sourceHref="/source/awt-js/#L1222" sourceLabel="AWT.js:1222" />

_Inherited from `module:AWT.Rectangle#getCoords`_

**Overrides:&#x20;**`module:skins/Skin.Skin#getCoords`

Gets a string with the co-ordinates of the upper-left and lower-right vertexs of this rectangle,\
(with values rounded to int)

**Returns**

- `string`

<MemberHeading id="getattributes" depth="3" name="getAttributes" sig="getAttributes(): object" />

<MemberMeta sourceHref="/source/awt-js/#L1232" sourceLabel="AWT.js:1232" />

_Inherited from `module:AWT.Rectangle#getAttributes`_

**Overrides:&#x20;**`module:skins/Skin.Skin#getAttributes`

Gets a object with the basic attributes needed to rebuild this instance excluding functions,\
parent references, constants and also attributes retaining the default value.\
The resulting object is commonly usued to serialize elements in JSON format.

**Returns**

- `object`

<MemberHeading id="setattributes" depth="3" name="setAttributes" sig="setAttributes(data: object): module:AWT.Rectangle" />

<MemberMeta sourceHref="/source/awt-js/#L1241" sourceLabel="AWT.js:1241" />

_Inherited from `module:AWT.Rectangle#setAttributes`_

**Overrides:&#x20;**`module:skins/Skin.Skin#setAttributes`

Reads the properties of this Rectangle from a data object

**Parameters**

- `data` (object) — The data object to be parsed

**Returns**

- [`module:AWT.Rectangle`](/module/awt#rectangle)

<MemberHeading id="moveby" depth="3" name="moveBy" sig="moveBy(delta: Point | Dimension): module:AWT.Shape" />

<MemberMeta sourceHref="/source/awt-js/#L834" sourceLabel="AWT.js:834" />

_Inherited from `module:AWT.Shape#moveBy`_

**Overrides:&#x20;**`module:skins/Skin.Skin#moveBy`

Shifts the shape a specified amount in horizontal and vertical directions

**Parameters**

- `delta` ([Point](/module/awt#point) | [Dimension](/module/awt#dimension)) — The amount to shift the Shape

**Returns**

- [`module:AWT.Shape`](/module/awt#shape)

<MemberHeading id="moveto" depth="3" name="moveTo" sig="moveTo(newPos: module:AWT.Point): module:AWT.Shape" />

<MemberMeta sourceHref="/source/awt-js/#L844" sourceLabel="AWT.js:844" />

_Inherited from `module:AWT.Shape#moveTo`_

**Overrides:&#x20;**`module:skins/Skin.Skin#moveTo`

Moves this shape to a new position

**Parameters**

- `newPos` ([module:AWT.Point](/module/awt#point)) — The new position of the shape

**Returns**

- [`module:AWT.Shape`](/module/awt#shape)

<MemberHeading id="getshape" depth="3" name="getShape" sig="getShape(rect: module:AWT.Rectangle): module:AWT.Shape" />

<MemberMeta sourceHref="/source/awt-js/#L883" sourceLabel="AWT.js:883" />

_Inherited from `module:AWT.Shape#getShape`_

**Overrides:&#x20;**`module:skins/Skin.Skin#getShape`

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

**Overrides:&#x20;**`module:skins/Skin.Skin#contains`

Checks if the provided [module:AWT.Point](/module/awt#point) is inside this shape.

**Parameters**

- `_p` ([module:AWT.Point](/module/awt#point)) — The point to check

**Returns**

- `boolean`

<MemberHeading id="intersects" depth="3" name="intersects" sig="intersects(_r: module:AWT.Rectangle): boolean" />

<MemberMeta sourceHref="/source/awt-js/#L902" sourceLabel="AWT.js:902" />

_Inherited from `module:AWT.Shape#intersects`_

**Overrides:&#x20;**`module:skins/Skin.Skin#intersects`

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

**Overrides:&#x20;**`module:skins/Skin.Skin#fill`

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

**Overrides:&#x20;**`module:skins/Skin.Skin#stroke`

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

**Overrides:&#x20;**`module:skins/Skin.Skin#preparePath`

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

**Overrides:&#x20;**`module:skins/Skin.Skin#clip`

Creates a clipping region on the specified HTML canvas 2D rendering context

**Parameters**

- `ctx` ([external:CanvasRenderingContext2D](/module/utils#canvasrenderingcontext2d)) — The rendering context
- `fillRule` (string, optional, default: "'nonzero'") — Can be 'nonzero' (default when not set) or 'evenodd'

**Returns**

- [`external:CanvasRenderingContext2D`](/module/utils#canvasrenderingcontext2d)

<MemberHeading id="isrect" depth="3" name="isRect" sig="isRect(): boolean" />

<MemberMeta sourceHref="/source/awt-js/#L967" sourceLabel="AWT.js:967" />

_Inherited from `module:AWT.Shape#isRect`_

**Overrides:&#x20;**`module:skins/Skin.Skin#isRect`

Shorthand method for determining if a Shape is an [Rectangle](/module/awt#rectangle)

**Returns**

- `boolean`

<MemberHeading id="tostring" depth="3" name="toString" sig="toString(): string" />

<MemberMeta sourceHref="/source/awt-js/#L975" sourceLabel="AWT.js:975" />

_Inherited from `module:AWT.Shape#toString`_

**Overrides:&#x20;**`module:skins/Skin.Skin#toString`

Overwrites the original 'Object.toString' method with a more descriptive text

**Returns**

- `string`

<MemberHeading id="getstylesheets" depth="3" name="_getStyleSheets" sig="_getStyleSheets(media: string): string" />

<MemberMeta sourceHref="/source/skins/customskin-js/#L344" sourceLabel="CustomSkin.js:344" />

_Inherited from `module:skins/CustomSkin.CustomSkin#_getStyleSheets`_

**Overrides:&#x20;**`module:skins/Skin.Skin#_getStyleSheets`

Returns the CSS styles used by this skin. This method should be called only from\
the `Skin` constructor, and overridded by subclasses if needed.

**Parameters**

- `media` (string, default: "default") — A specific media size. Possible values are: 'default', 'half' and 'twoThirds'

**Returns**

- `string`

<MemberHeading id="updatecontent" depth="3" name="updateContent" sig="updateContent(dirtyRegion: module:AWT.Rectangle)" />

<MemberMeta sourceHref="/source/skins/skin-js/#L363" sourceLabel="Skin.js:363" />

_Inherited from `module:skins/Skin.Skin#updateContent`_

Updates the graphic contents of this skin.\
This method should be called from [module:skins/Skin.Skin#update](/module/skins-skin/skin#update)

**Parameters**

- `dirtyRegion` ([module:AWT.Rectangle](/module/awt#rectangle)) — Specifies the area to be updated. When `null`, it's the\
  whole panel.

<MemberHeading id="setwaitcursor" depth="3" name="setWaitCursor" sig="setWaitCursor(status: boolean)" />

<MemberMeta sourceHref="/source/skins/customskin-js/#L356" sourceLabel="CustomSkin.js:356" />

_Inherited from `module:skins/CustomSkin.CustomSkin#setWaitCursor`_

**Overrides:&#x20;**`module:skins/Skin.Skin#setWaitCursor`

Sets/unsets the 'wait' state

**Parameters**

- `status` (boolean) — Whether to set or unset the wait status. When `undefined`, the\
  `waitCursorCount` member is evaluated to decide if the wait state should be activated or deactivated.

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

<MemberMeta sourceHref="/source/skins/customskin-js/#L369" sourceLabel="CustomSkin.js:369" />

Class name of this skin. It will be used as a base selector in the definition of all CSS styles.

<MemberHeading id="image" depth="3" name="image" sig="image: string" />

<MemberMeta sourceHref="/source/skins/customskin-js/#L374" sourceLabel="CustomSkin.js:374" />

The name of the image file to be used as a base of this skin.

<MemberHeading id="skincss" depth="3" name="skinCSS" sig="skinCSS: string" />

<MemberMeta sourceHref="/source/skins/customskin-js/#L380" sourceLabel="CustomSkin.js:380" />

Styles used in this skin

<MemberHeading id="cssvariants" depth="3" name="cssVariants" sig="cssVariants: object" />

<MemberMeta sourceHref="/source/skins/customskin-js/#L389" sourceLabel="CustomSkin.js:389" />

Specifc styles (`default`, `half` and `twoThirds`) computed at run-time,\
based on the provided XML file

<MemberHeading id="msgkeys" depth="3" name="msgKeys" sig="msgKeys: object" />

<MemberMeta sourceHref="/source/skins/customskin-js/#L394" sourceLabel="CustomSkin.js:394" />

Key ids of currently supported buttons, associated with its helper literal

<MemberHeading id="skinid" depth="3" name="skinId" sig="skinId: string" />

<MemberMeta sourceHref="/source/skins/customskin-js/#L369" sourceLabel="CustomSkin.js:369" />

_Inherited from `module:skins/CustomSkin.CustomSkin#skinId`_

**Overrides:&#x20;**`module:skins/Skin.Skin#skinId`

Class name of this skin. It will be used as a base selector in the definition of all CSS styles.

<MemberHeading id="div" depth="3" name="$div" sig="$div: external:jQuery" />

<MemberMeta sourceHref="/source/skins/skin-js/#L793" sourceLabel="Skin.js:793" />

_Inherited from `module:skins/Skin.Skin#$div`_

**Overrides:&#x20;**`module:skins/Skin.Skin#$div`

The HTML div object used by this Skin

<MemberHeading id="playercnt" depth="3" name="$playerCnt" sig="$playerCnt: external:jQuery" />

<MemberMeta sourceHref="/source/skins/skin-js/#L798" sourceLabel="Skin.js:798" />

_Inherited from `module:skins/Skin.Skin#$playerCnt`_

**Overrides:&#x20;**`module:skins/Skin.Skin#$playerCnt`

The HTML div where JClic Player will be placed

<MemberHeading id="name" depth="3" name="name" sig="name: string" />

<MemberMeta sourceHref="/source/skins/skin-js/#L803" sourceLabel="Skin.js:803" />

_Inherited from `module:skins/Skin.Skin#name`_

**Overrides:&#x20;**`module:skins/Skin.Skin#name`

Current name of the skin.

<MemberHeading id="options" depth="3" name="options" sig="options: object" />

<MemberMeta sourceHref="/source/skins/skin-js/#L808" sourceLabel="Skin.js:808" />

_Inherited from `module:skins/Skin.Skin#options`_

**Overrides:&#x20;**`module:skins/Skin.Skin#options`

Specific options of this skin

<MemberHeading id="waitpanel" depth="3" name="$waitPanel" sig="$waitPanel: external:jQuery" />

<MemberMeta sourceHref="/source/skins/skin-js/#L813" sourceLabel="Skin.js:813" />

_Inherited from `module:skins/Skin.Skin#$waitPanel`_

**Overrides:&#x20;**`module:skins/Skin.Skin#$waitPanel`

Waiting panel, displayed while loading resources.

<MemberHeading id="progress" depth="3" name="$progress" sig="$progress: external:jQuery" />

<MemberMeta sourceHref="/source/skins/skin-js/#L818" sourceLabel="Skin.js:818" />

_Inherited from `module:skins/Skin.Skin#$progress`_

**Overrides:&#x20;**`module:skins/Skin.Skin#$progress`

Graphic indicator of loading progress

<MemberHeading id="currentprogress" depth="3" name="currentProgress" sig="currentProgress: number" />

<MemberMeta sourceHref="/source/skins/skin-js/#L823" sourceLabel="Skin.js:823" />

_Inherited from `module:skins/Skin.Skin#currentProgress`_

**Overrides:&#x20;**`module:skins/Skin.Skin#currentProgress`

Current value of the progress bar

<MemberHeading id="maxprogress" depth="3" name="maxProgress" sig="maxProgress: number" />

<MemberMeta sourceHref="/source/skins/skin-js/#L828" sourceLabel="Skin.js:828" />

_Inherited from `module:skins/Skin.Skin#maxProgress`_

**Overrides:&#x20;**`module:skins/Skin.Skin#maxProgress`

Max value of the progress bar

<MemberHeading id="dlgoverlay" depth="3" name="$dlgOverlay" sig="$dlgOverlay: external:jQuery" />

<MemberMeta sourceHref="/source/skins/skin-js/#L848" sourceLabel="Skin.js:848" />

_Inherited from `module:skins/Skin.Skin#$dlgOverlay`_

**Overrides:&#x20;**`module:skins/Skin.Skin#$dlgOverlay`

Main panel used to display modal and non-modal dialogs

<MemberHeading id="dlgmainpanel" depth="3" name="$dlgMainPanel" sig="$dlgMainPanel: external:jQuery" />

<MemberMeta sourceHref="/source/skins/skin-js/#L853" sourceLabel="Skin.js:853" />

_Inherited from `module:skins/Skin.Skin#$dlgMainPanel`_

**Overrides:&#x20;**`module:skins/Skin.Skin#$dlgMainPanel`

Main panel of dialogs, where relevant information must be placed

<MemberHeading id="dlgbottompanel" depth="3" name="$dlgBottomPanel" sig="$dlgBottomPanel: external:jQuery" />

<MemberMeta sourceHref="/source/skins/skin-js/#L858" sourceLabel="Skin.js:858" />

_Inherited from `module:skins/Skin.Skin#$dlgBottomPanel`_

**Overrides:&#x20;**`module:skins/Skin.Skin#$dlgBottomPanel`

Bottom panel of dialogs, used for action buttons

<MemberHeading id="infohead" depth="3" name="infoHead" sig="infoHead: external:jQuery" />

<MemberMeta sourceHref="/source/skins/skin-js/#L863" sourceLabel="Skin.js:863" />

_Inherited from `module:skins/Skin.Skin#infoHead`_

**Overrides:&#x20;**`module:skins/Skin.Skin#infoHead`

Element usually used as header in dialogs, with JClic logo, name and version

<MemberHeading id="copybtn" depth="3" name="$copyBtn" sig="$copyBtn: external:jQuery" />

<MemberMeta sourceHref="/source/skins/skin-js/#L868" sourceLabel="Skin.js:868" />

_Inherited from `module:skins/Skin.Skin#$copyBtn`_

**Overrides:&#x20;**`module:skins/Skin.Skin#$copyBtn`

Iconic button used to copy content to clipboard

<MemberHeading id="closedlgbtn" depth="3" name="$closeDlgBtn" sig="$closeDlgBtn: external:jQuery" />

<MemberMeta sourceHref="/source/skins/skin-js/#L873" sourceLabel="Skin.js:873" />

_Inherited from `module:skins/Skin.Skin#$closeDlgBtn`_

**Overrides:&#x20;**`module:skins/Skin.Skin#$closeDlgBtn`

Iconic button used to close the dialog

<MemberHeading id="okdlgbtn" depth="3" name="$okDlgBtn" sig="$okDlgBtn: external:jQuery" />

<MemberMeta sourceHref="/source/skins/skin-js/#L878" sourceLabel="Skin.js:878" />

_Inherited from `module:skins/Skin.Skin#$okDlgBtn`_

**Overrides:&#x20;**`module:skins/Skin.Skin#$okDlgBtn`

OK dialog button

<MemberHeading id="canceldlgbtn" depth="3" name="$cancelDlgBtn" sig="$cancelDlgBtn: external:jQuery" />

<MemberMeta sourceHref="/source/skins/skin-js/#L883" sourceLabel="Skin.js:883" />

_Inherited from `module:skins/Skin.Skin#$cancelDlgBtn`_

**Overrides:&#x20;**`module:skins/Skin.Skin#$cancelDlgBtn`

Cancel dialog button

<MemberHeading id="dlgokvalue" depth="3" name="_dlgOkValue" sig="_dlgOkValue: object" />

<MemberMeta sourceHref="/source/skins/skin-js/#L888" sourceLabel="Skin.js:888" />

_Inherited from `module:skins/Skin.Skin#_dlgOkValue`_

**Overrides:&#x20;**`module:skins/Skin.Skin#_dlgOkValue`

Value to be returned by the dialog promise when the presented task is fulfilled

<MemberHeading id="dlgcancelvalue" depth="3" name="_dlgCancelValue" sig="_dlgCancelValue: object" />

<MemberMeta sourceHref="/source/skins/skin-js/#L893" sourceLabel="Skin.js:893" />

_Inherited from `module:skins/Skin.Skin#_dlgCancelValue`_

**Overrides:&#x20;**`module:skins/Skin.Skin#_dlgCancelValue`

Value to be returned in user-canceled dialogs

<MemberHeading id="ismodaldlg" depth="3" name="_isModalDlg" sig="_isModalDlg: boolean" />

<MemberMeta sourceHref="/source/skins/skin-js/#L898" sourceLabel="Skin.js:898" />

_Inherited from `module:skins/Skin.Skin#_isModalDlg`_

**Overrides:&#x20;**`module:skins/Skin.Skin#_isModalDlg`

Flag indicating if the current dialog is modal or not

<MemberHeading id="reportspanel" depth="3" name="$reportsPanel" sig="$reportsPanel: external:jQuery" />

<MemberMeta sourceHref="/source/skins/skin-js/#L903" sourceLabel="Skin.js:903" />

_Inherited from `module:skins/Skin.Skin#$reportsPanel`_

**Overrides:&#x20;**`module:skins/Skin.Skin#$reportsPanel`

Div inside [$dlgOverlay](/module/skins-skin/skin#dlgoverlay) where JClicPlayer will place the information to be shown

<MemberHeading id="buttons" depth="3" name="buttons" sig="buttons: object" />

<MemberMeta sourceHref="/source/skins/skin-js/#L908" sourceLabel="Skin.js:908" />

_Inherited from `module:skins/Skin.Skin#buttons`_

**Overrides:&#x20;**`module:skins/Skin.Skin#buttons`

The basic collection of buttons that most skins implement

<MemberHeading id="counters" depth="3" name="counters" sig="counters: object" />

<MemberMeta sourceHref="/source/skins/skin-js/#L924" sourceLabel="Skin.js:924" />

_Inherited from `module:skins/Skin.Skin#counters`_

**Overrides:&#x20;**`module:skins/Skin.Skin#counters`

The collection of counters

<MemberHeading id="msgarea" depth="3" name="msgArea" sig="msgArea: object" />

<MemberMeta sourceHref="/source/skins/skin-js/#L933" sourceLabel="Skin.js:933" />

_Inherited from `module:skins/Skin.Skin#msgArea`_

**Overrides:&#x20;**`module:skins/Skin.Skin#msgArea`

The collection of message areas

<MemberHeading id="player" depth="3" name="player" sig="player: module:JClicPlayer.JClicPlayer" />

<MemberMeta sourceHref="/source/skins/skin-js/#L942" sourceLabel="Skin.js:942" />

_Inherited from `module:skins/Skin.Skin#player`_

**Overrides:&#x20;**`module:skins/Skin.Skin#player`

The [JClicPlayer](/module/jclicplayer#jclicplayer) object associated to this skin

<MemberHeading id="ps" depth="3" name="ps" sig="ps: module:JClicPlayer.JClicPlayer" />

<MemberMeta sourceHref="/source/skins/skin-js/#L948" sourceLabel="Skin.js:948" />

_Inherited from `module:skins/Skin.Skin#ps`_

**Overrides:&#x20;**`module:skins/Skin.Skin#ps`

The [PlayStation](http://projectestac.github.io/jclic/apidoc/edu/xtec/jclic/PlayStation.html)\
used by this Skin. Usually, the same as `player`

<MemberHeading id="waitcursorcount" depth="3" name="waitCursorCount" sig="waitCursorCount: number" />

<MemberMeta sourceHref="/source/skins/skin-js/#L953" sourceLabel="Skin.js:953" />

_Inherited from `module:skins/Skin.Skin#waitCursorCount`_

**Overrides:&#x20;**`module:skins/Skin.Skin#waitCursorCount`

Counter to be incremented or decremented as `waitCursor` is requested or released.

<MemberHeading id="basiccss" depth="3" name="basicCSS" sig="basicCSS: string" />

<MemberMeta sourceHref="/source/skins/skin-js/#L961" sourceLabel="Skin.js:961" />

_Inherited from `module:skins/Skin.Skin#basicCSS`_

**Overrides:&#x20;**`module:skins/Skin.Skin#basicCSS`

Main styles

<MemberHeading id="waitanimcss" depth="3" name="waitAnimCSS" sig="waitAnimCSS: string" />

<MemberMeta sourceHref="/source/skins/skin-js/#L966" sourceLabel="Skin.js:966" />

_Inherited from `module:skins/Skin.Skin#waitAnimCSS`_

**Overrides:&#x20;**`module:skins/Skin.Skin#waitAnimCSS`

Waiting screen styles

<MemberHeading id="waitimgbig" depth="3" name="waitImgBig" sig="waitImgBig: string" />

<MemberMeta sourceHref="/source/skins/skin-js/#L972" sourceLabel="Skin.js:972" />

_Inherited from `module:skins/Skin.Skin#waitImgBig`_

**Overrides:&#x20;**`module:skins/Skin.Skin#waitImgBig`

Animated image displayed while loading resources\
Based on Ryan Allen's [svg-spinner](http://articles.dappergentlemen.com/2015/01/13/svg-spinner/)

<MemberHeading id="waitimgsmall" depth="3" name="waitImgSmall" sig="waitImgSmall: string" />

<MemberMeta sourceHref="/source/skins/skin-js/#L977" sourceLabel="Skin.js:977" />

_Inherited from `module:skins/Skin.Skin#waitImgSmall`_

**Overrides:&#x20;**`module:skins/Skin.Skin#waitImgSmall`

Animated image displayed while loading resources (small)

<MemberHeading id="reportscss" depth="3" name="reportsCSS" sig="reportsCSS: string" />

<MemberMeta sourceHref="/source/skins/skin-js/#L982" sourceLabel="Skin.js:982" />

_Inherited from `module:skins/Skin.Skin#reportsCSS`_

**Overrides:&#x20;**`module:skins/Skin.Skin#reportsCSS`

Reports screen styles

<MemberHeading id="closedialogicon" depth="3" name="closeDialogIcon" sig="closeDialogIcon: string" />

<MemberMeta sourceHref="/source/skins/skin-js/#L990" sourceLabel="Skin.js:990" />

_Inherited from `module:skins/Skin.Skin#closeDialogIcon`_

**Overrides:&#x20;**`module:skins/Skin.Skin#closeDialogIcon`

Icon for 'close dialog' button

<MemberHeading id="okdialogicon" depth="3" name="okDialogIcon" sig="okDialogIcon: string" />

<MemberMeta sourceHref="/source/skins/skin-js/#L995" sourceLabel="Skin.js:995" />

_Inherited from `module:skins/Skin.Skin#okDialogIcon`_

**Overrides:&#x20;**`module:skins/Skin.Skin#okDialogIcon`

Icon for 'ok' button

<MemberHeading id="copyicon" depth="3" name="copyIcon" sig="copyIcon: string" />

<MemberMeta sourceHref="/source/skins/skin-js/#L1000" sourceLabel="Skin.js:1000" />

_Inherited from `module:skins/Skin.Skin#copyIcon`_

**Overrides:&#x20;**`module:skins/Skin.Skin#copyIcon`

Icon for 'copy' button

<MemberHeading id="applogo" depth="3" name="appLogo" sig="appLogo: string" />

<MemberMeta sourceHref="/source/skins/skin-js/#L1005" sourceLabel="Skin.js:1005" />

_Inherited from `module:skins/Skin.Skin#appLogo`_

**Overrides:&#x20;**`module:skins/Skin.Skin#appLogo`

JClic logo

<MemberHeading id="invalidatedrect" depth="3" name="invalidatedRect" sig="invalidatedRect: module:AWT.Rectangle" />

<MemberMeta sourceHref="/source/awt-js/#L2031" sourceLabel="AWT.js:2031" />

_Inherited from `module:AWT.Container#invalidatedRect`_

**Overrides:&#x20;**`module:skins/Skin.Skin#invalidatedRect`

The currently "invalidated" area

<MemberHeading id="type" depth="3" name="type" sig="type: string" />

<MemberMeta sourceHref="/source/awt-js/#L1255" sourceLabel="AWT.js:1255" />

_Inherited from `module:AWT.Rectangle#type`_

**Overrides:&#x20;**`module:skins/Skin.Skin#type`

Shape type id

<MemberHeading id="dim" depth="3" name="dim" sig="dim: module:AWT.Dimension" />

<MemberMeta sourceHref="/source/awt-js/#L1260" sourceLabel="AWT.js:1260" />

_Inherited from `module:AWT.Rectangle#dim`_

**Overrides:&#x20;**`module:skins/Skin.Skin#dim`

The [Dimension](/module/awt#dimension) of the Rectangle

<MemberHeading id="pos" depth="3" name="pos" sig="pos: module:AWT.Point" />

<MemberMeta sourceHref="/source/awt-js/#L1019" sourceLabel="AWT.js:1019" />

_Inherited from `module:AWT.Shape#pos`_

**Overrides:&#x20;**`module:skins/Skin.Skin#pos`

The current position of the shape

<MemberHeading id="skinid" depth="3" name="skinId" sig="skinId: string" />

<MemberMeta sourceHref="/source/skins/customskin-js/#L369" sourceLabel="CustomSkin.js:369" />

_Inherited from `module:skins/CustomSkin.CustomSkin#skinId`_

**Overrides:&#x20;**`module:skins/Skin.Skin#skinId`

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
