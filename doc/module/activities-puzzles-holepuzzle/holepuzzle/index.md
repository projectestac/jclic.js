---
title: HolePuzzle
kind: class
longname: module:activities/puzzles/HolePuzzle.HolePuzzle
description: This class of {@link module:Activity.Activity Activity} shows only one panel with shuffled {@link module:boxes/ActiveBox.ActiveBox ActiveBox} cells. One of the cells is out of the main panel, thus allowing its neighbors occupy their space. Only immediate neighbors of the &quot;hole&quot; can move into it. When all cells are on place, the initially &quot;expulsed&quot; cell comes back home and the activity is done.
---

# HolePuzzle

**Extends:&#x20;**[`module:Activity.Activity`](/module/activity#activity)

<SourceLink href="/source/activities/puzzles/holepuzzle-js/#L48" label="HolePuzzle.js:48" />

This class of [Activity](/module/activity#activity) shows only one panel with shuffled [ActiveBox](/module/boxes-activebox#activebox) cells.

One of the cells is out of the main panel, thus allowing its neighbors occupy their space.\
Only immediate neighbors of the "hole" can move into it.

When all cells are on place, the initially "expulsed" cell comes back home and the activity is done.

---

## Constructor

<Signature
  code="new HolePuzzle(
	project: module:project/JClicProject.JClicProject,
): HolePuzzle"
/>

HolePuzzle constructor

**Parameters**

- `project` ([module:project/JClicProject.JClicProject](/module/project-jclicproject#jclicproject)) — The [JClicProject](/module/project-jclicproject#jclicproject) to which this activity belongs

---

## Instance Methods

<MemberHeading id="getminnumactions" depth="3" name="getMinNumActions" sig="getMinNumActions(): number" />

<MemberMeta sourceHref="/source/activities/puzzles/holepuzzle-js/#L62" sourceLabel="HolePuzzle.js:62" />

Retrieves the minimum number of actions needed to solve this activity.

**Returns**

- `number`

<MemberHeading id="hasrandom" depth="3" name="hasRandom" sig="hasRandom(): boolean" />

<MemberMeta sourceHref="/source/activities/puzzles/holepuzzle-js/#L71" sourceLabel="HolePuzzle.js:71" />

Whether or not the activity uses random to shuffle internal components

**Returns**

- `boolean`

<MemberHeading id="shufflealways" depth="3" name="shuffleAlways" sig="shuffleAlways(): boolean" />

<MemberMeta sourceHref="/source/activities/puzzles/holepuzzle-js/#L80" sourceLabel="HolePuzzle.js:80" />

When `true`, the activity must always be shuffled

**Returns**

- `boolean`

<MemberHeading id="helpsolutionallowed" depth="3" name="helpSolutionAllowed" sig="helpSolutionAllowed(): boolean" />

<MemberMeta sourceHref="/source/activities/puzzles/holepuzzle-js/#L89" sourceLabel="HolePuzzle.js:89" />

Whether the activity allows the user to request help

**Returns**

- `boolean`

<MemberHeading id="setproperties" depth="3" name="setProperties" sig="setProperties($xml: external:jQuery)" />

<MemberMeta sourceHref="/source/activity-js/#L107" sourceLabel="Activity.js:107" />

_Inherited from `module:Activity.Activity#setProperties`_

**Overrides:&#x20;**`module:Activity.Activity#setProperties`

Loads this object settings from an XML element

**Parameters**

- `$xml` ([external:jQuery](/module/utils#jquery)) — The jQuery XML element to parse

<MemberHeading
  id="readmessage"
  depth="3"
  name="readMessage"
  sig="readMessage(
	$xml: external:jQuery,
): module:boxes/ActiveBoxContent.ActiveBoxContent"
/>

<MemberMeta sourceHref="/source/activity-js/#L356" sourceLabel="Activity.js:356" />

_Inherited from `module:Activity.Activity#readMessage`_

**Overrides:&#x20;**`module:Activity.Activity#readMessage`

Read an activity message from an XML element

**Parameters**

- `$xml` ([external:jQuery](/module/utils#jquery)) — The XML element to be parsed

**Returns**

- [`module:boxes/ActiveBoxContent.ActiveBoxContent`](/module/boxes-activeboxcontent#activeboxcontent)

<MemberHeading id="getattributes" depth="3" name="getAttributes" sig="getAttributes(): object" />

<MemberMeta sourceHref="/source/activity-js/#L372" sourceLabel="Activity.js:372" />

_Inherited from `module:Activity.Activity#getAttributes`_

**Overrides:&#x20;**`module:Activity.Activity#getAttributes`

Gets a object with the basic attributes needed to rebuild this instance excluding functions,\
parent references, constants and also attributes retaining the default value.\
The resulting object is commonly usued to serialize elements in JSON format.

**Returns**

- `object`

<MemberHeading id="setattributes" depth="3" name="setAttributes" sig="setAttributes(data: object)" />

<MemberMeta sourceHref="/source/activity-js/#L412" sourceLabel="Activity.js:412" />

_Inherited from `module:Activity.Activity#setAttributes`_

**Overrides:&#x20;**`module:Activity.Activity#setAttributes`

Load the activity settings from a data object

**Parameters**

- `data` (object) — The data object to parse

<MemberHeading id="initautocontentprovider" depth="3" name="initAutoContentProvider" sig="initAutoContentProvider()" />

<MemberMeta sourceHref="/source/activity-js/#L454" sourceLabel="Activity.js:454" />

_Inherited from `module:Activity.Activity#initAutoContentProvider`_

**Overrides:&#x20;**`module:Activity.Activity#initAutoContentProvider`

Initialises the [AutoContentProvider](/module/automation-autocontentprovider#autocontentprovider), when defined.

<MemberHeading id="preparemedia" depth="3" name="prepareMedia" sig="prepareMedia(ps: module:JClicPlayer.JClicPlayer)" />

<MemberMeta sourceHref="/source/activity-js/#L463" sourceLabel="Activity.js:463" />

_Inherited from `module:Activity.Activity#prepareMedia`_

**Overrides:&#x20;**`module:Activity.Activity#prepareMedia`

Preloads the media content of the activity.

**Parameters**

- `ps` ([module:JClicPlayer.JClicPlayer](/module/jclicplayer#jclicplayer)) — The [module:JClicPlayer.JClicPlayer](/module/jclicplayer#jclicplayer) used to realize the media objects.

<MemberHeading id="helpsolutionallowed" depth="3" name="helpSolutionAllowed" sig="helpSolutionAllowed(): boolean" />

<MemberMeta sourceHref="/source/activities/puzzles/holepuzzle-js/#L89" sourceLabel="HolePuzzle.js:89" />

_Inherited from `module:activities/puzzles/HolePuzzle.HolePuzzle#helpSolutionAllowed`_

**Overrides:&#x20;**`module:Activity.Activity#helpSolutionAllowed`

Whether the activity allows the user to request help

**Returns**

- `boolean`

<MemberHeading id="helpwindowallowed" depth="3" name="helpWindowAllowed" sig="helpWindowAllowed(): boolean" />

<MemberMeta sourceHref="/source/activity-js/#L487" sourceLabel="Activity.js:487" />

_Inherited from `module:Activity.Activity#helpWindowAllowed`_

**Overrides:&#x20;**`module:Activity.Activity#helpWindowAllowed`

Whether the activity allows the user to request help.

**Returns**

- `boolean`

<MemberHeading id="getminnumactions" depth="3" name="getMinNumActions" sig="getMinNumActions(): number" />

<MemberMeta sourceHref="/source/activities/puzzles/holepuzzle-js/#L62" sourceLabel="HolePuzzle.js:62" />

_Inherited from `module:activities/puzzles/HolePuzzle.HolePuzzle#getMinNumActions`_

**Overrides:&#x20;**`module:Activity.Activity#getMinNumActions`

Retrieves the minimum number of actions needed to solve this activity.

**Returns**

- `number`

<MemberHeading id="mustpausesequence" depth="3" name="mustPauseSequence" sig="mustPauseSequence(): boolean" />

<MemberMeta sourceHref="/source/activity-js/#L505" sourceLabel="Activity.js:505" />

_Inherited from `module:Activity.Activity#mustPauseSequence`_

**Overrides:&#x20;**`module:Activity.Activity#mustPauseSequence`

When this method returns `true`, the automatic jump to the next activity must be paused at\
this activity.

**Returns**

- `boolean`

<MemberHeading id="canreinit" depth="3" name="canReinit" sig="canReinit(): boolean" />

<MemberMeta sourceHref="/source/activity-js/#L513" sourceLabel="Activity.js:513" />

_Inherited from `module:Activity.Activity#canReinit`_

**Overrides:&#x20;**`module:Activity.Activity#canReinit`

Whether or not the activity can be reset

**Returns**

- `boolean`

<MemberHeading id="hasinfo" depth="3" name="hasInfo" sig="hasInfo(): boolean" />

<MemberMeta sourceHref="/source/activity-js/#L521" sourceLabel="Activity.js:521" />

_Inherited from `module:Activity.Activity#hasInfo`_

**Overrides:&#x20;**`module:Activity.Activity#hasInfo`

Whether or not the activity has additional information to be shown.

**Returns**

- `boolean`

<MemberHeading id="hasrandom" depth="3" name="hasRandom" sig="hasRandom(): boolean" />

<MemberMeta sourceHref="/source/activities/puzzles/holepuzzle-js/#L71" sourceLabel="HolePuzzle.js:71" />

_Inherited from `module:activities/puzzles/HolePuzzle.HolePuzzle#hasRandom`_

**Overrides:&#x20;**`module:Activity.Activity#hasRandom`

Whether or not the activity uses random to shuffle internal components

**Returns**

- `boolean`

<MemberHeading id="shufflealways" depth="3" name="shuffleAlways" sig="shuffleAlways(): boolean" />

<MemberMeta sourceHref="/source/activities/puzzles/holepuzzle-js/#L80" sourceLabel="HolePuzzle.js:80" />

_Inherited from `module:activities/puzzles/HolePuzzle.HolePuzzle#shuffleAlways`_

**Overrides:&#x20;**`module:Activity.Activity#shuffleAlways`

When `true`, the activity must always be shuffled

**Returns**

- `boolean`

<MemberHeading id="needskeyboard" depth="3" name="needsKeyboard" sig="needsKeyboard(): boolean" />

<MemberMeta sourceHref="/source/activity-js/#L546" sourceLabel="Activity.js:546" />

_Inherited from `module:Activity.Activity#needsKeyboard`_

**Overrides:&#x20;**`module:Activity.Activity#needsKeyboard`

When `true`, the activity makes use of the keyboard

**Returns**

- `boolean`

<MemberHeading id="end" depth="3" name="end" sig="end()" />

<MemberMeta sourceHref="/source/activity-js/#L553" sourceLabel="Activity.js:553" />

_Inherited from `module:Activity.Activity#end`_

**Overrides:&#x20;**`module:Activity.Activity#end`

Called when the activity must be disposed

<MemberHeading id="clear" depth="3" name="clear" sig="clear()" />

<MemberMeta sourceHref="/source/activity-js/#L561" sourceLabel="Activity.js:561" />

_Inherited from `module:Activity.Activity#clear`_

**Overrides:&#x20;**`module:Activity.Activity#clear`

Called when the activity must reset its internal components

<MemberHeading id="getwindowsize" depth="3" name="getWindowSize" sig="getWindowSize(): module:AWT.Dimension" />

<MemberMeta sourceHref="/source/activity-js/#L569" sourceLabel="Activity.js:569" />

_Inherited from `module:Activity.Activity#getWindowSize`_

**Overrides:&#x20;**`module:Activity.Activity#getWindowSize`

Getter method for `windowSize`

**Returns**

- [`module:AWT.Dimension`](/module/awt#dimension)

<MemberHeading id="setwindowsize" depth="3" name="setWindowSize" sig="setWindowSize(windowSize: module:AWT.Dimension)" />

<MemberMeta sourceHref="/source/activity-js/#L577" sourceLabel="Activity.js:577" />

_Inherited from `module:Activity.Activity#setWindowSize`_

**Overrides:&#x20;**`module:Activity.Activity#setWindowSize`

Setter method for `windowSize`

**Parameters**

- `windowSize` ([module:AWT.Dimension](/module/awt#dimension))

<MemberHeading
  id="getactivitypanel"
  depth="3"
  name="getActivityPanel"
  sig="getActivityPanel(
	ps: module:JClicPlayer.JClicPlayer,
): module:Activity.ActivityPanel"
/>

<MemberMeta sourceHref="/source/activity-js/#L587" sourceLabel="Activity.js:587" />

_Inherited from `module:Activity.Activity#getActivityPanel`_

**Overrides:&#x20;**`module:Activity.Activity#getActivityPanel`

Builds the [ActivityPanel](/module/activity#activitypanel) object.\
Subclasses must update the `Panel` member of its prototypes to produce specific panels.

**Parameters**

- `ps` ([module:JClicPlayer.JClicPlayer](/module/jclicplayer#jclicplayer)) — The [JClicPlayer](/module/jclicplayer#jclicplayer) used to build media objects.

**Returns**

- [`module:Activity.ActivityPanel`](/module/activity#activitypanel)

<MemberHeading id="helpsolutionallowed" depth="3" name="helpSolutionAllowed" sig="helpSolutionAllowed(): boolean" />

<MemberMeta sourceHref="/source/activities/puzzles/holepuzzle-js/#L89" sourceLabel="HolePuzzle.js:89" />

_Inherited from `module:activities/puzzles/HolePuzzle.HolePuzzle#helpSolutionAllowed`_

**Overrides:&#x20;**`module:Activity.Activity#helpSolutionAllowed`

Whether the activity allows the user to request help

**Returns**

- `boolean`

<MemberHeading id="getminnumactions" depth="3" name="getMinNumActions" sig="getMinNumActions(): number" />

<MemberMeta sourceHref="/source/activities/puzzles/holepuzzle-js/#L62" sourceLabel="HolePuzzle.js:62" />

_Inherited from `module:activities/puzzles/HolePuzzle.HolePuzzle#getMinNumActions`_

**Overrides:&#x20;**`module:Activity.Activity#getMinNumActions`

Retrieves the minimum number of actions needed to solve this activity.

**Returns**

- `number`

<MemberHeading id="hasrandom" depth="3" name="hasRandom" sig="hasRandom(): boolean" />

<MemberMeta sourceHref="/source/activities/puzzles/holepuzzle-js/#L71" sourceLabel="HolePuzzle.js:71" />

_Inherited from `module:activities/puzzles/HolePuzzle.HolePuzzle#hasRandom`_

**Overrides:&#x20;**`module:Activity.Activity#hasRandom`

Whether or not the activity uses random to shuffle internal components

**Returns**

- `boolean`

<MemberHeading id="shufflealways" depth="3" name="shuffleAlways" sig="shuffleAlways(): boolean" />

<MemberMeta sourceHref="/source/activities/puzzles/holepuzzle-js/#L80" sourceLabel="HolePuzzle.js:80" />

_Inherited from `module:activities/puzzles/HolePuzzle.HolePuzzle#shuffleAlways`_

**Overrides:&#x20;**`module:Activity.Activity#shuffleAlways`

When `true`, the activity must always be shuffled

**Returns**

- `boolean`

## Static Methods

<MemberHeading
  id="registerclass"
  depth="3"
  name="registerClass"
  sig="registerClass(
	activityName: string,
	activityClass: function,
): module:Activity.Activity"
/>

<MemberMeta badges="static" sourceHref="/source/activity-js/#L73" sourceLabel="Activity.js:73" />

_Inherited from `module:Activity.Activity`_

Registers a new type of activity

**Parameters**

- `activityName` (string) — The name used to identify this activity
- `activityClass` (function) — The activity class, usually extending Activity

**Returns**

- [`module:Activity.Activity`](/module/activity#activity)

<MemberHeading
  id="getactivity"
  depth="3"
  name="getActivity"
  sig="getActivity(
	data: object | external:jQuery,
	project: module:project/JClicProject.JClicProject,
): module:Activity.Activity"
/>

<MemberMeta badges="static" sourceHref="/source/activity-js/#L85" sourceLabel="Activity.js:85" />

_Inherited from `module:Activity.Activity`_

Factory constructor that returns a specific type of Activity based on the `class` attribute\
declared in `data`.

**Parameters**

- `data` (object | [external:jQuery](/module/utils#jquery)) — Can be a jQuery XML element, or an object obtained with a call to `getAttributes`
- `project` ([module:project/JClicProject.JClicProject](/module/project-jclicproject#jclicproject)) — The [JClicProject](/module/project-jclicproject#jclicproject) to which this activity belongs

**Returns**

- [`module:Activity.Activity`](/module/activity#activity)

## Instance Fields

<MemberHeading id="project" depth="3" name="project" sig="project: module:project/JClicProject.JClicProject" />

<MemberMeta sourceHref="/source/activity-js/#L606" sourceLabel="Activity.js:606" />

_Inherited from `module:Activity.Activity#project`_

**Overrides:&#x20;**`module:Activity.Activity#project`

The [JClicProject](/module/project-jclicproject#jclicproject) to which this activity belongs

<MemberHeading id="name" depth="3" name="name" sig="name: string" />

<MemberMeta sourceHref="/source/activity-js/#L611" sourceLabel="Activity.js:611" />

_Inherited from `module:Activity.Activity#name`_

**Overrides:&#x20;**`module:Activity.Activity#name`

The Activity name

<MemberHeading id="classname" depth="3" name="className" sig="className: string" />

<MemberMeta sourceHref="/source/activity-js/#L616" sourceLabel="Activity.js:616" />

_Inherited from `module:Activity.Activity#className`_

**Overrides:&#x20;**`module:Activity.Activity#className`

The class name of this Activity

<MemberHeading id="code" depth="3" name="code" sig="code: string" />

<MemberMeta sourceHref="/source/activity-js/#L621" sourceLabel="Activity.js:621" />

_Inherited from `module:Activity.Activity#code`_

**Overrides:&#x20;**`module:Activity.Activity#code`

Code used in reports to filter queries. Default is `null`.

<MemberHeading id="type" depth="3" name="type" sig="type: string" />

<MemberMeta sourceHref="/source/activity-js/#L628" sourceLabel="Activity.js:628" />

_Inherited from `module:Activity.Activity#type`_

**Overrides:&#x20;**`module:Activity.Activity#type`

Type of activity, used in text activities to distinguish between different variants of the\
same activity. Possible values are: `orderWords`, `orderParagraphs`, `identifyWords` and\
`identifyChars`.

<MemberHeading id="description" depth="3" name="description" sig="description: string" />

<MemberMeta sourceHref="/source/activity-js/#L633" sourceLabel="Activity.js:633" />

_Inherited from `module:Activity.Activity#description`_

**Overrides:&#x20;**`module:Activity.Activity#description`

A short description of the activity

<MemberHeading id="margin" depth="3" name="margin" sig="margin: number" />

<MemberMeta sourceHref="/source/activity-js/#L638" sourceLabel="Activity.js:638" />

_Inherited from `module:Activity.Activity#margin`_

**Overrides:&#x20;**`module:Activity.Activity#margin`

The space between the activity components measured in pixels.

<MemberHeading id="bgcolor" depth="3" name="bgColor" sig="bgColor: string" />

<MemberMeta sourceHref="/source/activity-js/#L643" sourceLabel="Activity.js:643" />

_Inherited from `module:Activity.Activity#bgColor`_

**Overrides:&#x20;**`module:Activity.Activity#bgColor`

The background color of the activity panel

<MemberHeading id="bggradient" depth="3" name="bgGradient" sig="bgGradient: module:AWT.Gradient" />

<MemberMeta sourceHref="/source/activity-js/#L648" sourceLabel="Activity.js:648" />

_Inherited from `module:Activity.Activity#bgGradient`_

**Overrides:&#x20;**`module:Activity.Activity#bgGradient`

When set, gradient used to draw the activity window background

<MemberHeading id="tiledbgimg" depth="3" name="tiledBgImg" sig="tiledBgImg: boolean" />

<MemberMeta sourceHref="/source/activity-js/#L653" sourceLabel="Activity.js:653" />

_Inherited from `module:Activity.Activity#tiledBgImg`_

**Overrides:&#x20;**`module:Activity.Activity#tiledBgImg`

Whether the bgImage (if any) has to be tiled across the panel background

<MemberHeading id="bgimagefile" depth="3" name="bgImageFile" sig="bgImageFile: string" />

<MemberMeta sourceHref="/source/activity-js/#L658" sourceLabel="Activity.js:658" />

_Inherited from `module:Activity.Activity#bgImageFile`_

**Overrides:&#x20;**`module:Activity.Activity#bgImageFile`

Filename of the image used as a panel background.

<MemberHeading id="border" depth="3" name="border" sig="border: boolean" />

<MemberMeta sourceHref="/source/activity-js/#L663" sourceLabel="Activity.js:663" />

_Inherited from `module:Activity.Activity#border`_

**Overrides:&#x20;**`module:Activity.Activity#border`

Whether to draw a border around the activity panel

<MemberHeading id="absolutepositioned" depth="3" name="absolutePositioned" sig="absolutePositioned: boolean" />

<MemberMeta sourceHref="/source/activity-js/#L669" sourceLabel="Activity.js:669" />

_Inherited from `module:Activity.Activity#absolutePositioned`_

**Overrides:&#x20;**`module:Activity.Activity#absolutePositioned`

Whether to place the activity panel at the point specified by `absolutePosition` or leave\
it centered on the main player's window.

<MemberHeading id="absoluteposition" depth="3" name="absolutePosition" sig="absolutePosition: module:AWT.Point" />

<MemberMeta sourceHref="/source/activity-js/#L674" sourceLabel="Activity.js:674" />

_Inherited from `module:Activity.Activity#absolutePosition`_

**Overrides:&#x20;**`module:Activity.Activity#absolutePosition`

The position of the activity panel on the player.

<MemberHeading id="includeinreports" depth="3" name="includeInReports" sig="includeInReports: boolean" />

<MemberMeta sourceHref="/source/activity-js/#L679" sourceLabel="Activity.js:679" />

_Inherited from `module:Activity.Activity#includeInReports`_

**Overrides:&#x20;**`module:Activity.Activity#includeInReports`

Whether to generate usage reports

<MemberHeading id="reportactions" depth="3" name="reportActions" sig="reportActions: boolean" />

<MemberMeta sourceHref="/source/activity-js/#L684" sourceLabel="Activity.js:684" />

_Inherited from `module:Activity.Activity#reportActions`_

**Overrides:&#x20;**`module:Activity.Activity#reportActions`

Whether to send action events to the `Reporter`

<MemberHeading id="helpwindow" depth="3" name="helpWindow" sig="helpWindow: boolean" />

<MemberMeta sourceHref="/source/activity-js/#L689" sourceLabel="Activity.js:689" />

_Inherited from `module:Activity.Activity#helpWindow`_

**Overrides:&#x20;**`module:Activity.Activity#helpWindow`

Whether to allow help about the activity or not.

<MemberHeading id="showsolution" depth="3" name="showSolution" sig="showSolution: boolean" />

<MemberMeta sourceHref="/source/activity-js/#L694" sourceLabel="Activity.js:694" />

_Inherited from `module:Activity.Activity#showSolution`_

**Overrides:&#x20;**`module:Activity.Activity#showSolution`

Whether to show the solution on the help window.

<MemberHeading id="helpmsg" depth="3" name="helpMsg" sig="helpMsg: string" />

<MemberMeta sourceHref="/source/activity-js/#L699" sourceLabel="Activity.js:699" />

_Inherited from `module:Activity.Activity#helpMsg`_

**Overrides:&#x20;**`module:Activity.Activity#helpMsg`

Message to be shown in the help window when `showSolution` is `false`.

<MemberHeading id="eventsounds" depth="3" name="eventSounds" sig="eventSounds: module:media/EventSounds.EventSounds" />

<MemberMeta sourceHref="/source/activity-js/#L705" sourceLabel="Activity.js:705" />

_Inherited from `module:Activity.Activity#eventSounds`_

**Overrides:&#x20;**`module:Activity.Activity#eventSounds`

Specific set of [EventSounds](/module/media-eventsounds#eventsounds) used in the activity. The default is `null`, meaning\
to use the default event sounds.

<MemberHeading id="useorder" depth="3" name="useOrder" sig="useOrder: boolean" />

<MemberMeta sourceHref="/source/activity-js/#L710" sourceLabel="Activity.js:710" />

_Inherited from `module:Activity.Activity#useOrder`_

**Overrides:&#x20;**`module:Activity.Activity#useOrder`

Wheter the activity must be solved in a specific order or not.

<MemberHeading id="dragcells" depth="3" name="dragCells" sig="dragCells: boolean" />

<MemberMeta sourceHref="/source/activity-js/#L716" sourceLabel="Activity.js:716" />

_Inherited from `module:Activity.Activity#dragCells`_

**Overrides:&#x20;**`module:Activity.Activity#dragCells`

Wheter the cells of the activity will be dragged across the screen.\
When `false`, a line will be painted to link elements.

<MemberHeading id="skinfilename" depth="3" name="skinFileName" sig="skinFileName: string" />

<MemberMeta sourceHref="/source/activity-js/#L722" sourceLabel="Activity.js:722" />

_Inherited from `module:Activity.Activity#skinFileName`_

**Overrides:&#x20;**`module:Activity.Activity#skinFileName`

File name of the Skin used by the activity. The default value is `null`, meaning that the\
activity will use the skin specified for the project.

<MemberHeading id="maxtime" depth="3" name="maxTime" sig="maxTime: number" />

<MemberMeta sourceHref="/source/activity-js/#L728" sourceLabel="Activity.js:728" />

_Inherited from `module:Activity.Activity#maxTime`_

**Overrides:&#x20;**`module:Activity.Activity#maxTime`

Maximum amount of time (seconds) to solve the activity. The default value is 0, meaning\
unlimited time.

<MemberHeading id="countdowntime" depth="3" name="countDownTime" sig="countDownTime: boolean" />

<MemberMeta sourceHref="/source/activity-js/#L733" sourceLabel="Activity.js:733" />

_Inherited from `module:Activity.Activity#countDownTime`_

**Overrides:&#x20;**`module:Activity.Activity#countDownTime`

Whether the time counter should display a countdown when `maxTime > 0`

<MemberHeading id="maxactions" depth="3" name="maxActions" sig="maxActions: number" />

<MemberMeta sourceHref="/source/activity-js/#L739" sourceLabel="Activity.js:739" />

_Inherited from `module:Activity.Activity#maxActions`_

**Overrides:&#x20;**`module:Activity.Activity#maxActions`

Maximum number of actions allowed to solve the activity. The default value is 0, meaning\
unlimited actions.

<MemberHeading id="countdownactions" depth="3" name="countDownActions" sig="countDownActions: boolean" />

<MemberMeta sourceHref="/source/activity-js/#L744" sourceLabel="Activity.js:744" />

_Inherited from `module:Activity.Activity#countDownActions`_

**Overrides:&#x20;**`module:Activity.Activity#countDownActions`

Whether the actions counter should display a countdown when `maxActions > 0`

<MemberHeading id="infourl" depth="3" name="infoUrl" sig="infoUrl: string" />

<MemberMeta sourceHref="/source/activity-js/#L749" sourceLabel="Activity.js:749" />

_Inherited from `module:Activity.Activity#infoUrl`_

**Overrides:&#x20;**`module:Activity.Activity#infoUrl`

URL to be launched when the user clicks on the 'info' button. Default is `null`.

<MemberHeading id="infocmd" depth="3" name="infoCmd" sig="infoCmd: string" />

<MemberMeta sourceHref="/source/activity-js/#L755" sourceLabel="Activity.js:755" />

_Inherited from `module:Activity.Activity#infoCmd`_

**Overrides:&#x20;**`module:Activity.Activity#infoCmd`

System command to be launched when the user clicks on the 'info' button. Default is `null`.\
Important: this parameter is currently not being used

<MemberHeading id="messages" depth="3" name="messages" sig="messages: Array.<module:boxes/ActiveBoxContent.ActiveBoxContent>" />

<MemberMeta sourceHref="/source/activity-js/#L760" sourceLabel="Activity.js:760" />

_Inherited from `module:Activity.Activity#messages`_

**Overrides:&#x20;**`module:Activity.Activity#messages`

The content of the initial, final, previous and error messages shown by the activity.

<MemberHeading id="windowsize" depth="3" name="windowSize" sig="windowSize: module:AWT.Dimension" />

<MemberMeta sourceHref="/source/activity-js/#L765" sourceLabel="Activity.js:765" />

_Inherited from `module:Activity.Activity#windowSize`_

**Overrides:&#x20;**`module:Activity.Activity#windowSize`

Preferred dimension of the activity window

<MemberHeading id="transparentbg" depth="3" name="transparentBg" sig="transparentBg: boolean" />

<MemberMeta sourceHref="/source/activity-js/#L770" sourceLabel="Activity.js:770" />

_Inherited from `module:Activity.Activity#transparentBg`_

**Overrides:&#x20;**`module:Activity.Activity#transparentBg`

Whether the activity window has transparent background.

<MemberHeading id="activitybgcolor" depth="3" name="activityBgColor" sig="activityBgColor: string" />

<MemberMeta sourceHref="/source/activity-js/#L775" sourceLabel="Activity.js:775" />

_Inherited from `module:Activity.Activity#activityBgColor`_

**Overrides:&#x20;**`module:Activity.Activity#activityBgColor`

The background color of the activity

<MemberHeading id="activitybggradient" depth="3" name="activityBgGradient" sig="activityBgGradient: module:AWT.Gradient" />

<MemberMeta sourceHref="/source/activity-js/#L780" sourceLabel="Activity.js:780" />

_Inherited from `module:Activity.Activity#activityBgGradient`_

**Overrides:&#x20;**`module:Activity.Activity#activityBgGradient`

Gradient used to draw backgrounds inside the activity.

<MemberHeading id="btimecounter" depth="3" name="bTimeCounter" sig="bTimeCounter: boolean" />

<MemberMeta sourceHref="/source/activity-js/#L785" sourceLabel="Activity.js:785" />

_Inherited from `module:Activity.Activity#bTimeCounter`_

**Overrides:&#x20;**`module:Activity.Activity#bTimeCounter`

Whether to display or not the 'time' counter

<MemberHeading id="bscorecounter" depth="3" name="bScoreCounter" sig="bScoreCounter: boolean" />

<MemberMeta sourceHref="/source/activity-js/#L790" sourceLabel="Activity.js:790" />

_Inherited from `module:Activity.Activity#bScoreCounter`_

**Overrides:&#x20;**`module:Activity.Activity#bScoreCounter`

Whether to display or not the 'score' counter

<MemberHeading id="bactionscounter" depth="3" name="bActionsCounter" sig="bActionsCounter: boolean" />

<MemberMeta sourceHref="/source/activity-js/#L795" sourceLabel="Activity.js:795" />

_Inherited from `module:Activity.Activity#bActionsCounter`_

**Overrides:&#x20;**`module:Activity.Activity#bActionsCounter`

Whether to display or not the 'actions' counter

<MemberHeading id="acp" depth="3" name="acp" sig="acp: module:automation/AutoContentProvider.AutoContentProvider" />

<MemberMeta sourceHref="/source/activity-js/#L800" sourceLabel="Activity.js:800" />

_Inherited from `module:Activity.Activity#acp`_

**Overrides:&#x20;**`module:Activity.Activity#acp`

Special object used to generate random content at the start of the activity

<MemberHeading id="abc" depth="3" name="abc" sig="abc: Array.<module:boxes/ActiveBagContent.ActiveBagContent>" />

<MemberMeta sourceHref="/source/activity-js/#L809" sourceLabel="Activity.js:809" />

_Inherited from `module:Activity.Activity#abc`_

**Overrides:&#x20;**`module:Activity.Activity#abc`

Array of bags with the description of the content to be displayed on panels and cells.

<MemberHeading id="tgc" depth="3" name="tgc" sig="tgc: module:boxes/TextGridContent.TextGridContent" />

<MemberMeta sourceHref="/source/activity-js/#L814" sourceLabel="Activity.js:814" />

_Inherited from `module:Activity.Activity#tgc`_

**Overrides:&#x20;**`module:Activity.Activity#tgc`

Content of the grid of letters used in crosswords and shuffled letters

<MemberHeading id="document" depth="3" name="document" sig="document: module:activities/text/TextActivityDocument.TextActivityDocument" />

<MemberMeta sourceHref="/source/activity-js/#L819" sourceLabel="Activity.js:819" />

_Inherited from `module:Activity.Activity#document`_

**Overrides:&#x20;**`module:Activity.Activity#document`

The main document used in text activities

<MemberHeading id="boxgridpos" depth="3" name="boxGridPos" sig="boxGridPos: string" />

<MemberMeta sourceHref="/source/activity-js/#L824" sourceLabel="Activity.js:824" />

_Inherited from `module:Activity.Activity#boxGridPos`_

**Overrides:&#x20;**`module:Activity.Activity#boxGridPos`

Relative position of the text grid (uses the same position codes as box grids)

<MemberHeading id="shuffles" depth="3" name="shuffles" sig="shuffles: number" />

<MemberMeta sourceHref="/source/activity-js/#L829" sourceLabel="Activity.js:829" />

_Inherited from `module:Activity.Activity#shuffles`_

**Overrides:&#x20;**`module:Activity.Activity#shuffles`

Number of times to shuffle the cells at the beginning of the activity

<MemberHeading id="shufflea" depth="3" name="shuffleA" sig="shuffleA: boolean" />

<MemberMeta sourceHref="/source/activity-js/#L834" sourceLabel="Activity.js:834" />

_Inherited from `module:Activity.Activity#shuffleA`_

**Overrides:&#x20;**`module:Activity.Activity#shuffleA`

Box grid A must be shuffled.

<MemberHeading id="shuffleb" depth="3" name="shuffleB" sig="shuffleB: boolean" />

<MemberMeta sourceHref="/source/activity-js/#L839" sourceLabel="Activity.js:839" />

_Inherited from `module:Activity.Activity#shuffleB`_

**Overrides:&#x20;**`module:Activity.Activity#shuffleB`

Box grid B must be shuffled.

<MemberHeading id="invass" depth="3" name="invAss" sig="invAss: boolean" />

<MemberMeta sourceHref="/source/activity-js/#L844" sourceLabel="Activity.js:844" />

_Inherited from `module:Activity.Activity#invAss`_

**Overrides:&#x20;**`module:Activity.Activity#invAss`

Flag to indicate "inverse resolution" in complex associations

<MemberHeading id="menuelements" depth="3" name="menuElements" sig="menuElements: Array.<object>" />

<MemberMeta sourceHref="/source/activity-js/#L849" sourceLabel="Activity.js:849" />

_Inherited from `module:Activity.Activity#menuElements`_

**Overrides:&#x20;**`module:Activity.Activity#menuElements`

Array of menu elements, used in activities of type [Menu](/module/activities-panels-menu#menu)

<MemberHeading id="numericcontent" depth="3" name="numericContent" sig="numericContent: boolean" />

<MemberMeta sourceHref="/source/activity-js/#L856" sourceLabel="Activity.js:856" />

_Inherited from `module:Activity.Activity#numericContent`_

**Overrides:&#x20;**`module:Activity.Activity#numericContent`

This activity uses numeric expressions, so text literals should be\
converted to numbers for comparisions, taking in account the\
number format of the current locale (dot or comma as decimal separator)

## Static Fields

<MemberHeading id="panel" depth="3" name="Panel" sig="Panel: class" />

<MemberMeta badges="static" sourceHref="/source/activities/puzzles/holepuzzle-js/#L357" sourceLabel="HolePuzzle.js:357" />

Panel class associated to this type of activity: [HolePuzzlePanel](/module/activities-puzzles-holepuzzle#holepuzzlepanel)

<MemberHeading id="classes" depth="3" name="CLASSES" sig="CLASSES: object" />

<MemberMeta badges="static" sourceHref="/source/activity-js/#L597" sourceLabel="Activity.js:597" />

_Inherited from `module:Activity.Activity`_

Classes derived from `Activity` should register themselves by adding a field to\
`Activity.CLASSES` using `Activity.registerClass`
