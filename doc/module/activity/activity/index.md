---
title: Activity
kind: class
longname: module:Activity.Activity
description: Activity is the abstract base class of JClic activities. It defines also the inner class {@link module:Activity.ActivityPanel ActivityPanel}, wich is responsible for user interaction with the activity content. Activities should extend both Activity and ActivityPanel classes in order to become fully operative.
---

# Activity

<SourceLink href="/source/activity-js/#L55" label="Activity.js:55" />

**Modifiers:** `abstract`

Activity is the abstract base class of JClic activities. It defines also the inner class\
[ActivityPanel](/module/activity#activitypanel), wich is responsible for user interaction with the activity\
content.\
Activities should extend both `Activity` and `ActivityPanel` classes in order to become fully\
operative.

---

## Constructor

<Signature
  code="new Activity(
	project: module:project/JClicProject.JClicProject,
): Activity"
/>

Activity constructor

**Parameters**

- `project` ([module:project/JClicProject.JClicProject](/module/project-jclicproject#jclicproject)) — The [JClicProject](/module/project-jclicproject#jclicproject) to which this activity belongs

---

## Instance Methods

<MemberHeading id="setproperties" depth="3" name="setProperties" sig="setProperties($xml: external:jQuery)" />

<MemberMeta sourceHref="/source/activity-js/#L107" sourceLabel="Activity.js:107" />

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

Read an activity message from an XML element

**Parameters**

- `$xml` ([external:jQuery](/module/utils#jquery)) — The XML element to be parsed

**Returns**

- [`module:boxes/ActiveBoxContent.ActiveBoxContent`](/module/boxes-activeboxcontent#activeboxcontent)

<MemberHeading id="getattributes" depth="3" name="getAttributes" sig="getAttributes(): object" />

<MemberMeta sourceHref="/source/activity-js/#L372" sourceLabel="Activity.js:372" />

Gets a object with the basic attributes needed to rebuild this instance excluding functions,\
parent references, constants and also attributes retaining the default value.\
The resulting object is commonly usued to serialize elements in JSON format.

**Returns**

- `object`

<MemberHeading id="setattributes" depth="3" name="setAttributes" sig="setAttributes(data: object)" />

<MemberMeta sourceHref="/source/activity-js/#L412" sourceLabel="Activity.js:412" />

Load the activity settings from a data object

**Parameters**

- `data` (object) — The data object to parse

<MemberHeading id="initautocontentprovider" depth="3" name="initAutoContentProvider" sig="initAutoContentProvider()" />

<MemberMeta sourceHref="/source/activity-js/#L454" sourceLabel="Activity.js:454" />

Initialises the [AutoContentProvider](/module/automation-autocontentprovider#autocontentprovider), when defined.

<MemberHeading id="preparemedia" depth="3" name="prepareMedia" sig="prepareMedia(ps: module:JClicPlayer.JClicPlayer)" />

<MemberMeta sourceHref="/source/activity-js/#L463" sourceLabel="Activity.js:463" />

Preloads the media content of the activity.

**Parameters**

- `ps` ([module:JClicPlayer.JClicPlayer](/module/jclicplayer#jclicplayer)) — The [module:JClicPlayer.JClicPlayer](/module/jclicplayer#jclicplayer) used to realize the media objects.

<MemberHeading id="helpsolutionallowed" depth="3" name="helpSolutionAllowed" sig="helpSolutionAllowed(): boolean" />

<MemberMeta sourceHref="/source/activity-js/#L479" sourceLabel="Activity.js:479" />

Whether the activity allows the user to request the solution.

**Returns**

- `boolean`

<MemberHeading id="helpwindowallowed" depth="3" name="helpWindowAllowed" sig="helpWindowAllowed(): boolean" />

<MemberMeta sourceHref="/source/activity-js/#L487" sourceLabel="Activity.js:487" />

Whether the activity allows the user to request help.

**Returns**

- `boolean`

<MemberHeading id="getminnumactions" depth="3" name="getMinNumActions" sig="getMinNumActions(): number" />

<MemberMeta sourceHref="/source/activity-js/#L496" sourceLabel="Activity.js:496" />

Retrieves the minimum number of actions needed to solve this activity.

**Returns**

- `number`

<MemberHeading id="mustpausesequence" depth="3" name="mustPauseSequence" sig="mustPauseSequence(): boolean" />

<MemberMeta sourceHref="/source/activity-js/#L505" sourceLabel="Activity.js:505" />

When this method returns `true`, the automatic jump to the next activity must be paused at\
this activity.

**Returns**

- `boolean`

<MemberHeading id="canreinit" depth="3" name="canReinit" sig="canReinit(): boolean" />

<MemberMeta sourceHref="/source/activity-js/#L513" sourceLabel="Activity.js:513" />

Whether or not the activity can be reset

**Returns**

- `boolean`

<MemberHeading id="hasinfo" depth="3" name="hasInfo" sig="hasInfo(): boolean" />

<MemberMeta sourceHref="/source/activity-js/#L521" sourceLabel="Activity.js:521" />

Whether or not the activity has additional information to be shown.

**Returns**

- `boolean`

<MemberHeading id="hasrandom" depth="3" name="hasRandom" sig="hasRandom(): boolean" />

<MemberMeta sourceHref="/source/activity-js/#L530" sourceLabel="Activity.js:530" />

Whether or not the activity uses random to shuffle internal components

**Returns**

- `boolean`

<MemberHeading id="shufflealways" depth="3" name="shuffleAlways" sig="shuffleAlways(): boolean" />

<MemberMeta sourceHref="/source/activity-js/#L538" sourceLabel="Activity.js:538" />

When `true`, the activity must always be shuffled

**Returns**

- `boolean`

<MemberHeading id="needskeyboard" depth="3" name="needsKeyboard" sig="needsKeyboard(): boolean" />

<MemberMeta sourceHref="/source/activity-js/#L546" sourceLabel="Activity.js:546" />

When `true`, the activity makes use of the keyboard

**Returns**

- `boolean`

<MemberHeading id="end" depth="3" name="end" sig="end()" />

<MemberMeta sourceHref="/source/activity-js/#L553" sourceLabel="Activity.js:553" />

Called when the activity must be disposed

<MemberHeading id="clear" depth="3" name="clear" sig="clear()" />

<MemberMeta sourceHref="/source/activity-js/#L561" sourceLabel="Activity.js:561" />

Called when the activity must reset its internal components

<MemberHeading id="getwindowsize" depth="3" name="getWindowSize" sig="getWindowSize(): module:AWT.Dimension" />

<MemberMeta sourceHref="/source/activity-js/#L569" sourceLabel="Activity.js:569" />

Getter method for `windowSize`

**Returns**

- [`module:AWT.Dimension`](/module/awt#dimension)

<MemberHeading id="setwindowsize" depth="3" name="setWindowSize" sig="setWindowSize(windowSize: module:AWT.Dimension)" />

<MemberMeta sourceHref="/source/activity-js/#L577" sourceLabel="Activity.js:577" />

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

Builds the [ActivityPanel](/module/activity#activitypanel) object.\
Subclasses must update the `Panel` member of its prototypes to produce specific panels.

**Parameters**

- `ps` ([module:JClicPlayer.JClicPlayer](/module/jclicplayer#jclicplayer)) — The [JClicPlayer](/module/jclicplayer#jclicplayer) used to build media objects.

**Returns**

- [`module:Activity.ActivityPanel`](/module/activity#activitypanel)

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

The [JClicProject](/module/project-jclicproject#jclicproject) to which this activity belongs

<MemberHeading id="name" depth="3" name="name" sig="name: string" />

<MemberMeta sourceHref="/source/activity-js/#L611" sourceLabel="Activity.js:611" />

The Activity name

<MemberHeading id="classname" depth="3" name="className" sig="className: string" />

<MemberMeta sourceHref="/source/activity-js/#L616" sourceLabel="Activity.js:616" />

The class name of this Activity

<MemberHeading id="code" depth="3" name="code" sig="code: string" />

<MemberMeta sourceHref="/source/activity-js/#L621" sourceLabel="Activity.js:621" />

Code used in reports to filter queries. Default is `null`.

<MemberHeading id="type" depth="3" name="type" sig="type: string" />

<MemberMeta sourceHref="/source/activity-js/#L628" sourceLabel="Activity.js:628" />

Type of activity, used in text activities to distinguish between different variants of the\
same activity. Possible values are: `orderWords`, `orderParagraphs`, `identifyWords` and\
`identifyChars`.

<MemberHeading id="description" depth="3" name="description" sig="description: string" />

<MemberMeta sourceHref="/source/activity-js/#L633" sourceLabel="Activity.js:633" />

A short description of the activity

<MemberHeading id="margin" depth="3" name="margin" sig="margin: number" />

<MemberMeta sourceHref="/source/activity-js/#L638" sourceLabel="Activity.js:638" />

The space between the activity components measured in pixels.

<MemberHeading id="bgcolor" depth="3" name="bgColor" sig="bgColor: string" />

<MemberMeta sourceHref="/source/activity-js/#L643" sourceLabel="Activity.js:643" />

The background color of the activity panel

<MemberHeading id="bggradient" depth="3" name="bgGradient" sig="bgGradient: module:AWT.Gradient" />

<MemberMeta sourceHref="/source/activity-js/#L648" sourceLabel="Activity.js:648" />

When set, gradient used to draw the activity window background

<MemberHeading id="tiledbgimg" depth="3" name="tiledBgImg" sig="tiledBgImg: boolean" />

<MemberMeta sourceHref="/source/activity-js/#L653" sourceLabel="Activity.js:653" />

Whether the bgImage (if any) has to be tiled across the panel background

<MemberHeading id="bgimagefile" depth="3" name="bgImageFile" sig="bgImageFile: string" />

<MemberMeta sourceHref="/source/activity-js/#L658" sourceLabel="Activity.js:658" />

Filename of the image used as a panel background.

<MemberHeading id="border" depth="3" name="border" sig="border: boolean" />

<MemberMeta sourceHref="/source/activity-js/#L663" sourceLabel="Activity.js:663" />

Whether to draw a border around the activity panel

<MemberHeading id="absolutepositioned" depth="3" name="absolutePositioned" sig="absolutePositioned: boolean" />

<MemberMeta sourceHref="/source/activity-js/#L669" sourceLabel="Activity.js:669" />

Whether to place the activity panel at the point specified by `absolutePosition` or leave\
it centered on the main player's window.

<MemberHeading id="absoluteposition" depth="3" name="absolutePosition" sig="absolutePosition: module:AWT.Point" />

<MemberMeta sourceHref="/source/activity-js/#L674" sourceLabel="Activity.js:674" />

The position of the activity panel on the player.

<MemberHeading id="includeinreports" depth="3" name="includeInReports" sig="includeInReports: boolean" />

<MemberMeta sourceHref="/source/activity-js/#L679" sourceLabel="Activity.js:679" />

Whether to generate usage reports

<MemberHeading id="reportactions" depth="3" name="reportActions" sig="reportActions: boolean" />

<MemberMeta sourceHref="/source/activity-js/#L684" sourceLabel="Activity.js:684" />

Whether to send action events to the `Reporter`

<MemberHeading id="helpwindow" depth="3" name="helpWindow" sig="helpWindow: boolean" />

<MemberMeta sourceHref="/source/activity-js/#L689" sourceLabel="Activity.js:689" />

Whether to allow help about the activity or not.

<MemberHeading id="showsolution" depth="3" name="showSolution" sig="showSolution: boolean" />

<MemberMeta sourceHref="/source/activity-js/#L694" sourceLabel="Activity.js:694" />

Whether to show the solution on the help window.

<MemberHeading id="helpmsg" depth="3" name="helpMsg" sig="helpMsg: string" />

<MemberMeta sourceHref="/source/activity-js/#L699" sourceLabel="Activity.js:699" />

Message to be shown in the help window when `showSolution` is `false`.

<MemberHeading id="eventsounds" depth="3" name="eventSounds" sig="eventSounds: module:media/EventSounds.EventSounds" />

<MemberMeta sourceHref="/source/activity-js/#L705" sourceLabel="Activity.js:705" />

Specific set of [EventSounds](/module/media-eventsounds#eventsounds) used in the activity. The default is `null`, meaning\
to use the default event sounds.

<MemberHeading id="useorder" depth="3" name="useOrder" sig="useOrder: boolean" />

<MemberMeta sourceHref="/source/activity-js/#L710" sourceLabel="Activity.js:710" />

Wheter the activity must be solved in a specific order or not.

<MemberHeading id="dragcells" depth="3" name="dragCells" sig="dragCells: boolean" />

<MemberMeta sourceHref="/source/activity-js/#L716" sourceLabel="Activity.js:716" />

Wheter the cells of the activity will be dragged across the screen.\
When `false`, a line will be painted to link elements.

<MemberHeading id="skinfilename" depth="3" name="skinFileName" sig="skinFileName: string" />

<MemberMeta sourceHref="/source/activity-js/#L722" sourceLabel="Activity.js:722" />

File name of the Skin used by the activity. The default value is `null`, meaning that the\
activity will use the skin specified for the project.

<MemberHeading id="maxtime" depth="3" name="maxTime" sig="maxTime: number" />

<MemberMeta sourceHref="/source/activity-js/#L728" sourceLabel="Activity.js:728" />

Maximum amount of time (seconds) to solve the activity. The default value is 0, meaning\
unlimited time.

<MemberHeading id="countdowntime" depth="3" name="countDownTime" sig="countDownTime: boolean" />

<MemberMeta sourceHref="/source/activity-js/#L733" sourceLabel="Activity.js:733" />

Whether the time counter should display a countdown when `maxTime > 0`

<MemberHeading id="maxactions" depth="3" name="maxActions" sig="maxActions: number" />

<MemberMeta sourceHref="/source/activity-js/#L739" sourceLabel="Activity.js:739" />

Maximum number of actions allowed to solve the activity. The default value is 0, meaning\
unlimited actions.

<MemberHeading id="countdownactions" depth="3" name="countDownActions" sig="countDownActions: boolean" />

<MemberMeta sourceHref="/source/activity-js/#L744" sourceLabel="Activity.js:744" />

Whether the actions counter should display a countdown when `maxActions > 0`

<MemberHeading id="infourl" depth="3" name="infoUrl" sig="infoUrl: string" />

<MemberMeta sourceHref="/source/activity-js/#L749" sourceLabel="Activity.js:749" />

URL to be launched when the user clicks on the 'info' button. Default is `null`.

<MemberHeading id="infocmd" depth="3" name="infoCmd" sig="infoCmd: string" />

<MemberMeta sourceHref="/source/activity-js/#L755" sourceLabel="Activity.js:755" />

System command to be launched when the user clicks on the 'info' button. Default is `null`.\
Important: this parameter is currently not being used

<MemberHeading id="messages" depth="3" name="messages" sig="messages: Array.<module:boxes/ActiveBoxContent.ActiveBoxContent>" />

<MemberMeta sourceHref="/source/activity-js/#L760" sourceLabel="Activity.js:760" />

The content of the initial, final, previous and error messages shown by the activity.

<MemberHeading id="windowsize" depth="3" name="windowSize" sig="windowSize: module:AWT.Dimension" />

<MemberMeta sourceHref="/source/activity-js/#L765" sourceLabel="Activity.js:765" />

Preferred dimension of the activity window

<MemberHeading id="transparentbg" depth="3" name="transparentBg" sig="transparentBg: boolean" />

<MemberMeta sourceHref="/source/activity-js/#L770" sourceLabel="Activity.js:770" />

Whether the activity window has transparent background.

<MemberHeading id="activitybgcolor" depth="3" name="activityBgColor" sig="activityBgColor: string" />

<MemberMeta sourceHref="/source/activity-js/#L775" sourceLabel="Activity.js:775" />

The background color of the activity

<MemberHeading id="activitybggradient" depth="3" name="activityBgGradient" sig="activityBgGradient: module:AWT.Gradient" />

<MemberMeta sourceHref="/source/activity-js/#L780" sourceLabel="Activity.js:780" />

Gradient used to draw backgrounds inside the activity.

<MemberHeading id="btimecounter" depth="3" name="bTimeCounter" sig="bTimeCounter: boolean" />

<MemberMeta sourceHref="/source/activity-js/#L785" sourceLabel="Activity.js:785" />

Whether to display or not the 'time' counter

<MemberHeading id="bscorecounter" depth="3" name="bScoreCounter" sig="bScoreCounter: boolean" />

<MemberMeta sourceHref="/source/activity-js/#L790" sourceLabel="Activity.js:790" />

Whether to display or not the 'score' counter

<MemberHeading id="bactionscounter" depth="3" name="bActionsCounter" sig="bActionsCounter: boolean" />

<MemberMeta sourceHref="/source/activity-js/#L795" sourceLabel="Activity.js:795" />

Whether to display or not the 'actions' counter

<MemberHeading id="acp" depth="3" name="acp" sig="acp: module:automation/AutoContentProvider.AutoContentProvider" />

<MemberMeta sourceHref="/source/activity-js/#L800" sourceLabel="Activity.js:800" />

Special object used to generate random content at the start of the activity

<MemberHeading id="abc" depth="3" name="abc" sig="abc: Array.<module:boxes/ActiveBagContent.ActiveBagContent>" />

<MemberMeta sourceHref="/source/activity-js/#L809" sourceLabel="Activity.js:809" />

Array of bags with the description of the content to be displayed on panels and cells.

<MemberHeading id="tgc" depth="3" name="tgc" sig="tgc: module:boxes/TextGridContent.TextGridContent" />

<MemberMeta sourceHref="/source/activity-js/#L814" sourceLabel="Activity.js:814" />

Content of the grid of letters used in crosswords and shuffled letters

<MemberHeading id="document" depth="3" name="document" sig="document: module:activities/text/TextActivityDocument.TextActivityDocument" />

<MemberMeta sourceHref="/source/activity-js/#L819" sourceLabel="Activity.js:819" />

The main document used in text activities

<MemberHeading id="boxgridpos" depth="3" name="boxGridPos" sig="boxGridPos: string" />

<MemberMeta sourceHref="/source/activity-js/#L824" sourceLabel="Activity.js:824" />

Relative position of the text grid (uses the same position codes as box grids)

<MemberHeading id="shuffles" depth="3" name="shuffles" sig="shuffles: number" />

<MemberMeta sourceHref="/source/activity-js/#L829" sourceLabel="Activity.js:829" />

Number of times to shuffle the cells at the beginning of the activity

<MemberHeading id="shufflea" depth="3" name="shuffleA" sig="shuffleA: boolean" />

<MemberMeta sourceHref="/source/activity-js/#L834" sourceLabel="Activity.js:834" />

Box grid A must be shuffled.

<MemberHeading id="shuffleb" depth="3" name="shuffleB" sig="shuffleB: boolean" />

<MemberMeta sourceHref="/source/activity-js/#L839" sourceLabel="Activity.js:839" />

Box grid B must be shuffled.

<MemberHeading id="invass" depth="3" name="invAss" sig="invAss: boolean" />

<MemberMeta sourceHref="/source/activity-js/#L844" sourceLabel="Activity.js:844" />

Flag to indicate "inverse resolution" in complex associations

<MemberHeading id="menuelements" depth="3" name="menuElements" sig="menuElements: Array.<object>" />

<MemberMeta sourceHref="/source/activity-js/#L849" sourceLabel="Activity.js:849" />

Array of menu elements, used in activities of type [Menu](/module/activities-panels-menu#menu)

<MemberHeading id="numericcontent" depth="3" name="numericContent" sig="numericContent: boolean" />

<MemberMeta sourceHref="/source/activity-js/#L856" sourceLabel="Activity.js:856" />

This activity uses numeric expressions, so text literals should be\
converted to numbers for comparisions, taking in account the\
number format of the current locale (dot or comma as decimal separator)

## Static Fields

<MemberHeading id="classes" depth="3" name="CLASSES" sig="CLASSES: object" />

<MemberMeta badges="static" sourceHref="/source/activity-js/#L597" sourceLabel="Activity.js:597" />

Classes derived from `Activity` should register themselves by adding a field to\
`Activity.CLASSES` using `Activity.registerClass`

<MemberHeading id="panel" depth="3" name="Panel" sig="Panel: module:Activity.ActivityPanel" />

<MemberMeta badges="static" sourceHref="/source/activity-js/#L1308" sourceLabel="Activity.js:1308" />

The panel class associated to each type of activity
