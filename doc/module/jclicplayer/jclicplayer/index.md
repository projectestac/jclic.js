---
title: JClicPlayer
kind: class
longname: module:JClicPlayer.JClicPlayer
description: "JClicPlayer is one of the the main classes of the JClic system. It implements the {@link http://projectestac.github.io/jclic/apidoc/edu/xtec/jclic/PlayStation.html PlayStation} interface, needed to host JClic activities. JClicPlayer offers to {@link module:Activity.ActivityPanel ActivityPanel} objects all the necessary resources and functions: media bags (to load and realize images and other media contents), sequence control, management of the reporting system, user interface, display of system messages, etc."
---

# JClicPlayer

**Extends:&#x20;**[`module:AWT.Container`](/module/awt#container)

<SourceLink href="/source/jclicplayer-js/#L56" label="JClicPlayer.js:56" />

JClicPlayer is one of the the main classes of the JClic system. It implements the\
[PlayStation](http://projectestac.github.io/jclic/apidoc/edu/xtec/jclic/PlayStation.html)\
interface, needed to host JClic activities.\
JClicPlayer offers to [ActivityPanel](/module/activity#activitypanel) objects all the necessary resources and functions:\
media bags (to load and realize images and other media contents), sequence control, management\
of the reporting system, user interface, display of system messages, etc.

---

## Constructor

<Signature
  code="new JClicPlayer(
	$topDiv: external:jQuery,
	options?: object,
): JClicPlayer"
/>

JClicPlayer constructor

**Parameters**

- `$topDiv` ([external:jQuery](/module/utils#jquery)) — The HTML `div` element where this JClicPlayer will deploy.
- `options` (object, optional) — A set of optional customized options.

---

## Instance Methods

<MemberHeading id="listentouchevents" depth="3" name="listenTouchEvents" sig="listenTouchEvents()" />

<MemberMeta sourceHref="/source/jclicplayer-js/#L114" sourceLabel="JClicPlayer.js:114" />

Detects swipe-right, swipe-left and double touch gestures on touch devices,\
associating them with 'next activity', 'previous activity' and 'toggle full screen' actions

<MemberHeading id="getuniqueid" depth="3" name="getUniqueId" sig="getUniqueId(lb: string): string" />

<MemberMeta sourceHref="/source/jclicplayer-js/#L194" sourceLabel="JClicPlayer.js:194" />

Generates an unique ID for elements being used with this player

**Parameters**

- `lb` (string) — The element's label

**Returns**

- `string`

<MemberHeading id="buildactions" depth="3" name="buildActions" sig="buildActions()" />

<MemberMeta sourceHref="/source/jclicplayer-js/#L201" sourceLabel="JClicPlayer.js:201" />

Builds the [module:AWT.Action](/module/awt#action) objects for this player

<MemberHeading id="reset" depth="3" name="reset" sig="reset()" />

<MemberMeta sourceHref="/source/jclicplayer-js/#L233" sourceLabel="JClicPlayer.js:233" />

Resets the main components of this player

<MemberHeading id="stop" depth="3" name="stop" sig="stop()" />

<MemberMeta sourceHref="/source/jclicplayer-js/#L251" sourceLabel="JClicPlayer.js:251" />

Instructs the player to stop working

<MemberHeading id="end" depth="3" name="end" sig="end(): external:Promise" />

<MemberMeta sourceHref="/source/jclicplayer-js/#L259" sourceLabel="JClicPlayer.js:259" />

Executes miscellaneous finalization routines.

**Returns**

- [`external:Promise`](/module/utils#promise)

<MemberHeading id="initreporter" depth="3" name="initReporter" sig="initReporter(): external:Promise" />

<MemberMeta sourceHref="/source/jclicplayer-js/#L285" sourceLabel="JClicPlayer.js:285" />

Creates and initializes the `Reporter` member

**Returns**

- [`external:Promise`](/module/utils#promise)

<MemberHeading id="inittimers" depth="3" name="initTimers" sig="initTimers()" />

<MemberMeta sourceHref="/source/jclicplayer-js/#L297" sourceLabel="JClicPlayer.js:297" />

Creates and initializes objects of type [module:AWT.Timer](/module/awt#timer)

<MemberHeading id="showreports" depth="3" name="showReports" sig="showReports()" />

<MemberMeta sourceHref="/source/jclicplayer-js/#L322" sourceLabel="JClicPlayer.js:322" />

Opens the reports dialog

<MemberHeading id="closehelpwindow" depth="3" name="closeHelpWindow" sig="closeHelpWindow()" />

<MemberMeta sourceHref="/source/jclicplayer-js/#L329" sourceLabel="JClicPlayer.js:329" />

Closes the help dialog window

<MemberHeading id="setskin" depth="3" name="setSkin" sig="setSkin(newSkin?: module:skins/Skin.Skin)" />

<MemberMeta sourceHref="/source/jclicplayer-js/#L337" sourceLabel="JClicPlayer.js:337" />

Sets the current skin

**Parameters**

- `newSkin` ([module:skins/Skin.Skin](/module/skins-skin#skin), optional) — The skin to use. When `null`, `defaultSkin` will be used.

<MemberHeading id="setproject" depth="3" name="setProject" sig="setProject(project: module:project/JClicProject.JClicProject)" />

<MemberMeta sourceHref="/source/jclicplayer-js/#L350" sourceLabel="JClicPlayer.js:350" />

Sets the current project of this player, without starting any activity

**Parameters**

- `project` ([module:project/JClicProject.JClicProject](/module/project-jclicproject#jclicproject)) — The project to be set

<MemberHeading
  id="load"
  depth="3"
  name="load"
  sig="load(
	project?: string | JClicProject,
	sequence?: string | number,
	activity?: string,
)"
/>

<MemberMeta sourceHref="/source/jclicplayer-js/#L375" sourceLabel="JClicPlayer.js:375" />

Loads the specified project and starts playing at the specified activity or sequence tag.

**Parameters**

- `project` (string | [JClicProject](/module/project-jclicproject#jclicproject), optional) — The project to load (if it's a string) or to use (if it's an object of type [JClicProject](/module/project-jclicproject#jclicproject)).\
  When it's a `string`, it can be the absolute or relative path to:
- `sequence` (string | number, optional) — Sequence tag or numeric order in the [ActivitySequence](/module/bags-activitysequence#activitysequence)\
  to be loaded. If _sequence_ and _activity_ are both `null`, the first [ActivitySequenceElement](/module/bags-activitysequenceelement#activitysequenceelement)\
  will be loaded.
- `activity` (string, optional) — Name of the activity to be loaded (usually `null`)

<MemberHeading id="forcefinishactivity" depth="3" name="forceFinishActivity" sig="forceFinishActivity()" />

<MemberMeta sourceHref="/source/jclicplayer-js/#L681" sourceLabel="JClicPlayer.js:681" />

Forces the current activity to stop playing.

<MemberHeading id="removeactivity" depth="3" name="removeActivity" sig="removeActivity()" />

<MemberMeta sourceHref="/source/jclicplayer-js/#L696" sourceLabel="JClicPlayer.js:696" />

Removes the current [ActivityPanel](/module/activity#activitypanel) from this player

<MemberHeading id="initactivity" depth="3" name="initActivity" sig="initActivity()" />

<MemberMeta sourceHref="/source/jclicplayer-js/#L711" sourceLabel="JClicPlayer.js:711" />

Initializes the activity

<MemberHeading id="activityready" depth="3" name="activityReady" sig="activityReady()" />

<MemberMeta sourceHref="/source/jclicplayer-js/#L731" sourceLabel="JClicPlayer.js:731" />

Called by [module:JClicPlayer.JClicPlayer#load](/module/jclicplayer/jclicplayer#load) when the [ActivityPanel](/module/activity#activitypanel) is fully visible, just\
after the JQuery animation effect.

<MemberHeading id="startactivity" depth="3" name="startActivity" sig="startActivity()" />

<MemberMeta sourceHref="/source/jclicplayer-js/#L741" sourceLabel="JClicPlayer.js:741" />

Starts the activity. This method is usually called from text activities with previous text.

<MemberHeading id="dolayout" depth="3" name="doLayout" sig="doLayout()" />

<MemberMeta sourceHref="/source/jclicplayer-js/#L751" sourceLabel="JClicPlayer.js:751" />

Configures the layout and visual aspect of the player area.

<MemberHeading
  id="playmedia"
  depth="3"
  name="playMedia"
  sig="playMedia(
	mediaContent: module:media/MediaContent.MediaContent,
	mediaPlacement?: module:boxes/ActiveBox.ActiveBox,
	delayedActions?: Array.<function()>,
)"
/>

<MemberMeta sourceHref="/source/jclicplayer-js/#L812" sourceLabel="JClicPlayer.js:812" />

Plays the specified media.

**Parameters**

- `mediaContent` ([module:media/MediaContent.MediaContent](/module/media-mediacontent#mediacontent)) — The media to be played
- `mediaPlacement` ([module:boxes/ActiveBox.ActiveBox](/module/boxes-activebox#activebox), optional, default: null) — The cell where the graphic component of this media should be placed (used with video objects)
- `delayedActions` (Array.\<function()>, optional, default: null) — If set, store the the action in this array for future execution

<MemberHeading id="stopmedia" depth="3" name="stopMedia" sig="stopMedia(level?: number)" />

<MemberMeta sourceHref="/source/jclicplayer-js/#L883" sourceLabel="JClicPlayer.js:883" />

Stops currently playing media

**Parameters**

- `level` (number, optional, default: -1) — Sets the threshold above which all media objects with equal\
  or greater `level` will also also be muted.

<MemberHeading id="runcmd" depth="3" name="runCmd" sig="runCmd(cmd: string)" />

<MemberMeta sourceHref="/source/jclicplayer-js/#L894" sourceLabel="JClicPlayer.js:894" />

Launches the specified system command.\
Currently not implemented.

**Parameters**

- `cmd` (string)

<MemberHeading id="activityfinished" depth="3" name="activityFinished" sig="activityFinished(_completedOK: boolean)" />

<MemberMeta sourceHref="/source/jclicplayer-js/#L903" sourceLabel="JClicPlayer.js:903" />

Called from [Activity](/module/activity#activity) when finished.

**Parameters**

- `_completedOK` (boolean) — `true` when the activity was successfully completed, `false`\
  otherwise.

<MemberHeading id="startautopasstimer" depth="3" name="startAutoPassTimer" sig="startAutoPassTimer()" />

<MemberMeta sourceHref="/source/jclicplayer-js/#L913" sourceLabel="JClicPlayer.js:913" />

Starts the automatic jump to next activity, when applicable.

<MemberHeading id="setmsg" depth="3" name="setMsg" sig="setMsg(abc: module:boxes/ActiveBoxContent.ActiveBoxContent)" />

<MemberMeta sourceHref="/source/jclicplayer-js/#L927" sourceLabel="JClicPlayer.js:927" />

Sets the current main message.

**Parameters**

- `abc` ([module:boxes/ActiveBoxContent.ActiveBoxContent](/module/boxes-activeboxcontent#activeboxcontent)) — The content of the message

<MemberHeading id="playmsg" depth="3" name="playMsg" sig="playMsg()" />

<MemberMeta sourceHref="/source/jclicplayer-js/#L942" sourceLabel="JClicPlayer.js:942" />

Launches the active media content associated to the main message, if any.

<MemberHeading id="setcountervalue" depth="3" name="setCounterValue" sig="setCounterValue(counter: string, newValue: number)" />

<MemberMeta sourceHref="/source/jclicplayer-js/#L952" sourceLabel="JClicPlayer.js:952" />

Sets a value to the specified counter

**Parameters**

- `counter` (string) — The id of the counter ('score', 'actions' or 'time')
- `newValue` (number) — The value to be set

<MemberHeading id="getcountervalue" depth="3" name="getCounterValue" sig="getCounterValue(counter: string): number" />

<MemberMeta sourceHref="/source/jclicplayer-js/#L963" sourceLabel="JClicPlayer.js:963" />

Gets the current value for the specified counter

**Parameters**

- `counter` (string) — The id of the counter ('score', 'actions' or 'time')

**Returns**

- `number`

<MemberHeading id="setcounterenabled" depth="3" name="setCounterEnabled" sig="setCounterEnabled(counter: string, bEnabled: boolean)" />

<MemberMeta sourceHref="/source/jclicplayer-js/#L972" sourceLabel="JClicPlayer.js:972" />

Enables or disables a specific counter

**Parameters**

- `counter` (string) — The id of the counter ('score', 'actions' or 'time')
- `bEnabled` (boolean) — When `true`, the counter will be enabled.

<MemberHeading id="inccountervalue" depth="3" name="incCounterValue" sig="incCounterValue(counter: string)" />

<MemberMeta sourceHref="/source/jclicplayer-js/#L983" sourceLabel="JClicPlayer.js:983" />

Increments by 1 the value of the specified counter

**Parameters**

- `counter` (string) — The id of the counter ('score', 'actions' or 'time')

<MemberHeading id="setcountdown" depth="3" name="setCountDown" sig="setCountDown(counter: string, maxValue: number)" />

<MemberMeta sourceHref="/source/jclicplayer-js/#L1001" sourceLabel="JClicPlayer.js:1001" />

Sets the specified counter in count-down status, starting at `maxValue`.

**Parameters**

- `counter` (string) — The id of the counter ('score', 'actions' or 'time')
- `maxValue` (number) — The value from which to start counting down

<MemberHeading id="setwaitcursor" depth="3" name="setWaitCursor" sig="setWaitCursor(status: boolean)" />

<MemberMeta sourceHref="/source/jclicplayer-js/#L1011" sourceLabel="JClicPlayer.js:1011" />

Set/unset the panel in 'wait' state

**Parameters**

- `status` (boolean)

<MemberHeading id="setprogress" depth="3" name="setProgress" sig="setProgress(val: number, max?: number)" />

<MemberMeta sourceHref="/source/jclicplayer-js/#L1021" sourceLabel="JClicPlayer.js:1021" />

Sets the current value of the progress bar

**Parameters**

- `val` (number) — The current value. Should be less or equal than `max`. When -1, the progress bar will be hidden.
- `max` (number, optional) — Optional parameter representing the maximum value. When passed, the progress bar will be displayed.

<MemberHeading id="incprogress" depth="3" name="incProgress" sig="incProgress(val?: number)" />

<MemberMeta sourceHref="/source/jclicplayer-js/#L1030" sourceLabel="JClicPlayer.js:1030" />

Increments the progress bar value by the specified amount, only when the progress bar is running.

**Parameters**

- `val` (number, optional, default: 1) — The amount to increment. When not defined, it's 1.

<MemberHeading
  id="getactivemediaplayer"
  depth="3"
  name="getActiveMediaPlayer"
  sig="getActiveMediaPlayer(
	mediaContent: module:media/MediaContent.MediaContent,
): module:media/ActiveMediaPlayer.ActiveMediaPlayer"
/>

<MemberMeta sourceHref="/source/jclicplayer-js/#L1040" sourceLabel="JClicPlayer.js:1040" />

Builds an [ActiveMediaPlayer](/module/media-activemediaplayer#activemediaplayer) for the specified [module:media/MediaContent.MediaContent](/module/media-mediacontent#mediacontent)

**Parameters**

- `mediaContent` ([module:media/MediaContent.MediaContent](/module/media-mediacontent#mediacontent)) — The media content to be played

**Returns**

- [`module:media/ActiveMediaPlayer.ActiveMediaPlayer`](/module/media-activemediaplayer#activemediaplayer)

<MemberHeading id="reportnewactivity" depth="3" name="reportNewActivity" sig="reportNewActivity(act: module:Activity.Activity)" />

<MemberMeta sourceHref="/source/jclicplayer-js/#L1048" sourceLabel="JClicPlayer.js:1048" />

Notifies the reporting system that a new activity has started

**Parameters**

- `act` ([module:Activity.Activity](/module/activity#activity)) — The activity that is sending the notification

<MemberHeading
  id="reportnewaction"
  depth="3"
  name="reportNewAction"
  sig="reportNewAction(
	act: module:Activity.Activity,
	type: string,
	source: string,
	dest: string,
	ok: boolean,
	currentScore: number,
)"
/>

<MemberMeta sourceHref="/source/jclicplayer-js/#L1070" sourceLabel="JClicPlayer.js:1070" />

Notifies the reporting system that a new action has been performed on the current activity

**Parameters**

- `act` ([module:Activity.Activity](/module/activity#activity)) — The activity that is sending the notification
- `type` (string) — Type of action (match, move, switch...)
- `source` (string) — Object acting as a source of the action (cell, grid, clue...)
- `dest` (string) — When applicable, object acting as a receiver of the action (cell, grid...)
- `ok` (boolean) — Whether the action was OK or not
- `currentScore` (number) — The current score of the activity

<MemberHeading
  id="reportendactivity"
  depth="3"
  name="reportEndActivity"
  sig="reportEndActivity(
	act: module:Activity.Activity,
	solved: boolean,
)"
/>

<MemberMeta sourceHref="/source/jclicplayer-js/#L1084" sourceLabel="JClicPlayer.js:1084" />

Notifies the reporting system that the current activity has finished

**Parameters**

- `act` ([module:Activity.Activity](/module/activity#activity)) — The activity that is sending the notification
- `solved` (boolean) — Whether the activity was successfully completed or not.

<MemberHeading id="showhelp" depth="3" name="showHelp" sig="showHelp($hlpComponent: external:jQuery): boolean" />

<MemberMeta sourceHref="/source/jclicplayer-js/#L1094" sourceLabel="JClicPlayer.js:1094" />

Shows the help info provided by the activity

**Parameters**

- `$hlpComponent` ([external:jQuery](/module/utils#jquery)) — The jQuery DOM component to be shown.

**Returns**

- `boolean`

<MemberHeading id="displayurl" depth="3" name="displayURL" sig="displayURL(url: string, inFrame: boolean)" />

<MemberMeta sourceHref="/source/jclicplayer-js/#L1103" sourceLabel="JClicPlayer.js:1103" />

Navigates to the requested URL

**Parameters**

- `url` (string) — The URL to navigate to
- `inFrame` (boolean) — When `true` opens in a new frame

<MemberHeading id="exit" depth="3" name="exit" sig="exit(url: string)" />

<MemberMeta sourceHref="/source/jclicplayer-js/#L1117" sourceLabel="JClicPlayer.js:1117" />

Only when `exitUrl` has been specified in `options`, navigates to the specified URL

**Parameters**

- `url` (string) — The URL to navigate to.

<MemberHeading id="setwindowtitle" depth="3" name="setWindowTitle" sig="setWindowTitle(docTitle: string)" />

<MemberMeta sourceHref="/source/jclicplayer-js/#L1125" sourceLabel="JClicPlayer.js:1125" />

Sets a title in a specific HTML element, if provided.

**Parameters**

- `docTitle` (string)

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

<MemberHeading id="updatecontent" depth="3" name="updateContent" sig="updateContent(_dirtyRegion: module:AWT.Shape)" />

<MemberMeta sourceHref="/source/awt-js/#L2020" sourceLabel="AWT.js:2020" />

_Inherited from `module:AWT.Container#updateContent`_

**Overrides:&#x20;**`module:AWT.Container#updateContent`

Containers should implement this method to update its graphic contents. It should\
be called from [module:AWT.Container#update](/module/awt/container#update)

**Parameters**

- `_dirtyRegion` ([module:AWT.Shape](/module/awt#shape)) — Specifies the area to be updated. When `null`, it's the whole\
  Container.

<MemberHeading id="getbounds" depth="3" name="getBounds" sig="getBounds(): module:AWT.Rectangle" />

<MemberMeta sourceHref="/source/awt-js/#L1081" sourceLabel="AWT.js:1081" />

_Inherited from `module:AWT.Rectangle#getBounds`_

**Overrides:&#x20;**`module:AWT.Container#getBounds`

Gets the enclosing [Rectangle](/module/awt#rectangle) of this Shape.

**Returns**

- [`module:AWT.Rectangle`](/module/awt#rectangle)

<MemberHeading id="setbounds" depth="3" name="setBounds" sig="setBounds(rect: module:AWT.Rectangle): module:AWT.Rectangle" />

<MemberMeta sourceHref="/source/awt-js/#L1090" sourceLabel="AWT.js:1090" />

_Inherited from `module:AWT.Rectangle#setBounds`_

**Overrides:&#x20;**`module:AWT.Container#setBounds`

Sets this Rectangle the position and dimension of another one

**Parameters**

- `rect` ([module:AWT.Rectangle](/module/awt#rectangle))

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

<MemberHeading id="options" depth="3" name="options" sig="options: object" />

<MemberMeta sourceHref="/source/jclicplayer-js/#L1135" sourceLabel="JClicPlayer.js:1135" />

Object with miscellaneous options.

<MemberHeading id="id" depth="3" name="id" sig="id: string" />

<MemberMeta sourceHref="/source/jclicplayer-js/#L1169" sourceLabel="JClicPlayer.js:1169" />

Unique ID of this player, randomly generated by the constructor

<MemberHeading id="div" depth="3" name="$div" sig="$div: external:jQuery" />

<MemberMeta sourceHref="/source/jclicplayer-js/#L1174" sourceLabel="JClicPlayer.js:1174" />

The JQuery "div" element used by this player as stage for activities

<MemberHeading id="topdiv" depth="3" name="$topDiv" sig="$topDiv: external:jQuery" />

<MemberMeta sourceHref="/source/jclicplayer-js/#L1179" sourceLabel="JClicPlayer.js:1179" />

The JQuery top container where this player will deploy

<MemberHeading id="maincontainer" depth="3" name="$mainContainer" sig="$mainContainer: external:jQuery" />

<MemberMeta sourceHref="/source/jclicplayer-js/#L1184" sourceLabel="JClicPlayer.js:1184" />

The main container of all JClic components

<MemberHeading id="fullscreenchecked" depth="3" name="fullScreenChecked" sig="fullScreenChecked: boolean" />

<MemberMeta sourceHref="/source/jclicplayer-js/#L1189" sourceLabel="JClicPlayer.js:1189" />

Flag indicatig that this player has switched to full screen at least once

<MemberHeading id="project" depth="3" name="project" sig="project: module:project/JClicProject.JClicProject" />

<MemberMeta sourceHref="/source/jclicplayer-js/#L1194" sourceLabel="JClicPlayer.js:1194" />

The [JClicProject](/module/project-jclicproject#jclicproject) currently hosted in this player

<MemberHeading id="basepath" depth="3" name="basePath" sig="basePath: string" />

<MemberMeta sourceHref="/source/jclicplayer-js/#L1199" sourceLabel="JClicPlayer.js:1199" />

Relative path or absolute URL to be used as a base to access files

<MemberHeading id="zip" depth="3" name="zip" sig="zip: external:JSZip" />

<MemberMeta sourceHref="/source/jclicplayer-js/#L1208" sourceLabel="JClicPlayer.js:1208" />

A [external:JSZip](/module/utils#jszip) object pointing to a `jclic.zip` or `jclic.scorm.zip` file containing\
the current project.\
Two extra properties will be added to this object when loaded:

- **zip.fullZipPath** {string} - The full path of the ZIP file
- **zip.zipBasePath** {string} - The path to the folder containing the ZIP file

<MemberHeading id="localfs" depth="3" name="localFS" sig="localFS: boolean" />

<MemberMeta sourceHref="/source/jclicplayer-js/#L1214" sourceLabel="JClicPlayer.js:1214" />

This flag indicates if the player is running inside a document loaded by `file:` protocol

<MemberHeading id="actpanel" depth="3" name="actPanel" sig="actPanel: module:Activity.Activity#Panel" />

<MemberMeta sourceHref="/source/jclicplayer-js/#L1219" sourceLabel="JClicPlayer.js:1219" />

The [ActivityPanel](/module/activity#activitypanel) currently running on this player.

<MemberHeading id="history" depth="3" name="history" sig="history: module:PlayerHistory.PlayerHistory" />

<MemberMeta sourceHref="/source/jclicplayer-js/#L1224" sourceLabel="JClicPlayer.js:1224" />

This object records the list of the activities played during the current session.

<MemberHeading id="skin" depth="3" name="skin" sig="skin: module:skins/Skin.Skin" />

<MemberMeta sourceHref="/source/jclicplayer-js/#L1229" sourceLabel="JClicPlayer.js:1229" />

The Skin currently used by this player.

<MemberHeading id="defaultskin" depth="3" name="defaultSkin" sig="defaultSkin: module:skins/Skin.Skin" />

<MemberMeta sourceHref="/source/jclicplayer-js/#L1234" sourceLabel="JClicPlayer.js:1234" />

The default Skin to be used if none specified

<MemberHeading id="defaultskin" depth="3" name="defaultSkin" sig="defaultSkin: module:skins/Skin.Skin" />

<MemberMeta sourceHref="/source/jclicplayer-js/#L1239" sourceLabel="JClicPlayer.js:1239" />

The last skin directly specified by a [JClicProject](/module/project-jclicproject#jclicproject)

<MemberHeading id="activemediabag" depth="3" name="activeMediaBag" sig="activeMediaBag: module:media/ActiveMediaBag.ActiveMediaBag" />

<MemberMeta sourceHref="/source/jclicplayer-js/#L1244" sourceLabel="JClicPlayer.js:1244" />

Object containing references to realized media objects, ready to play.

<MemberHeading id="reporter" depth="3" name="reporter" sig="reporter: module:report/Reporter.Reporter" />

<MemberMeta sourceHref="/source/jclicplayer-js/#L1250" sourceLabel="JClicPlayer.js:1250" />

Object responsible for passing the scores obtained by users to a external reporting systems\
when playing activities.

<MemberHeading id="actions" depth="3" name="actions" sig="actions: Array.<module:AWT.Action>" />

<MemberMeta sourceHref="/source/jclicplayer-js/#L1255" sourceLabel="JClicPlayer.js:1255" />

Collection of [module:AWT.Action](/module/awt#action) objects used by this player.

<MemberHeading id="timer" depth="3" name="timer" sig="timer: module:AWT.Timer" />

<MemberMeta sourceHref="/source/jclicplayer-js/#L1260" sourceLabel="JClicPlayer.js:1260" />

Main timer object used to feed the time counter. Ticks every second.

<MemberHeading id="delayedtimer" depth="3" name="delayedTimer" sig="delayedTimer: module:AWT.Timer" />

<MemberMeta sourceHref="/source/jclicplayer-js/#L1265" sourceLabel="JClicPlayer.js:1265" />

Timer for delayed actions

<MemberHeading id="delayedaction" depth="3" name="delayedAction" sig="delayedAction: module:AWT.Action" />

<MemberMeta sourceHref="/source/jclicplayer-js/#L1270" sourceLabel="JClicPlayer.js:1270" />

This variable holds the action to be executed by `delayedTimer`

<MemberHeading id="counterval" depth="3" name="counterVal" sig="counterVal: module:JClicPlayer.JClicPlayer~counterValType" />

<MemberMeta sourceHref="/source/jclicplayer-js/#L1281" sourceLabel="JClicPlayer.js:1281" />

Current values of the counters

<MemberHeading id="bgimageorigin" depth="3" name="bgImageOrigin" sig="bgImageOrigin: module:AWT.Point" />

<MemberMeta sourceHref="/source/jclicplayer-js/#L1286" sourceLabel="JClicPlayer.js:1286" />

Point indicating the upper-left corner of the current background image

<MemberHeading id="audioenabled" depth="3" name="audioEnabled" sig="audioEnabled: boolean" />

<MemberMeta sourceHref="/source/jclicplayer-js/#L1292" sourceLabel="JClicPlayer.js:1292" />

Whether the player must play all sounds (including system sounds) and other media content\
of the activities.

<MemberHeading id="navbuttonsdisabled" depth="3" name="navButtonsDisabled" sig="navButtonsDisabled: boolean" />

<MemberMeta sourceHref="/source/jclicplayer-js/#L1297" sourceLabel="JClicPlayer.js:1297" />

Whether the navigation buttons `next` and `back` are enabled o disabled.

<MemberHeading id="navbuttonsalways" depth="3" name="navButtonsAlways" sig="navButtonsAlways: boolean" />

<MemberMeta sourceHref="/source/jclicplayer-js/#L1304" sourceLabel="JClicPlayer.js:1304" />

When this flag is `true`, the navigation buttons are always enabled despite\
of the indications made by the activities or the sequence control system.\
This is used only to debug projects with complicated sequence chaining.

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
