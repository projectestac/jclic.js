---
title: TextTarget
kind: class
longname: module:activities/text/TextActivityDocument.TextTarget
description: This class contains the properties and methods of the document elements that are the real targets of user actions in text activities.
---

# TextTarget

<SourceLink href="/source/activities/text/textactivitydocument-js/#L359" label="TextActivityDocument.js:359" />

This class contains the properties and methods of the document elements that are the real\
targets of user actions in text activities.

---

## Constructor

<Signature
  code="new TextTarget(
	doc: module:activities/text/TextActivityDocument.TextActivityDocument,
	text: string,
): TextTarget"
/>

TextTarget constructor

**Parameters**

- `doc` ([module:activities/text/TextActivityDocument.TextActivityDocument](/module/activities-text-textactivitydocument#textactivitydocument)) — The document to which this target belongs.
- `text` (string) — Main text of this target.

---

## Instance Methods

<MemberHeading id="reset" depth="3" name="reset" sig="reset(status?: string)" />

<MemberMeta sourceHref="/source/activities/text/textactivitydocument-js/#L377" sourceLabel="TextActivityDocument.js:377" />

Resets the TextTarget status

**Parameters**

- `status` (string, optional) — The `targetStatus` to be established. Default is `NOT_EDITED`

<MemberHeading
  id="setproperties"
  depth="3"
  name="setProperties"
  sig="setProperties(
	$xml: external:jQuery,
	mediaBag: module:bags/MediaBag.MediaBag,
)"
/>

<MemberMeta sourceHref="/source/activities/text/textactivitydocument-js/#L387" sourceLabel="TextActivityDocument.js:387" />

Loads the text target settings from a specific JQuery XML element

**Parameters**

- `$xml` ([external:jQuery](/module/utils#jquery)) — The XML element to parse
- `mediaBag` ([module:bags/MediaBag.MediaBag](/module/bags-mediabag#mediabag)) — The media bag used to load images and media content

<MemberHeading id="getattributes" depth="3" name="getAttributes" sig="getAttributes(): object" />

<MemberMeta sourceHref="/source/activities/text/textactivitydocument-js/#L458" sourceLabel="TextActivityDocument.js:458" />

Gets a object with the basic attributes needed to rebuild this instance excluding functions,\
parent references, constants and also attributes retaining the default value.\
The resulting object is commonly usued to serialize elements in JSON format.

**Returns**

- `object`

<MemberHeading
  id="setattributes"
  depth="3"
  name="setAttributes"
  sig="setAttributes(
	data: object,
): module:activities/text/TextActivityDocument.TextTarget"
/>

<MemberMeta sourceHref="/source/activities/text/textactivitydocument-js/#L472" sourceLabel="TextActivityDocument.js:472" />

Reads the properties of this TextTarget from a data object

**Parameters**

- `data` (object) — The data object to be parsed, or just the text content

**Returns**

- [`module:activities/text/TextActivityDocument.TextTarget`](/module/activities-text-textactivitydocument#texttarget)

<MemberHeading id="getanswers" depth="3" name="getAnswers" sig="getAnswers(): string" />

<MemberMeta sourceHref="/source/activities/text/textactivitydocument-js/#L485" sourceLabel="TextActivityDocument.js:485" />

Gets a string with all valid answers of this TextTarget. Useful for reporting users' activity.

**Returns**

- `string`

<MemberHeading id="checkcolors" depth="3" name="checkColors" sig="checkColors()" />

<MemberMeta sourceHref="/source/activities/text/textactivitydocument-js/#L493" sourceLabel="TextActivityDocument.js:493" />

Sets specific colors to the target jQuery element, based on its `targetStatus` value. Red\
color usually means error.

<MemberHeading id="readcurrenttext" depth="3" name="readCurrentText" sig="readCurrentText(): string" />

<MemberMeta sourceHref="/source/activities/text/textactivitydocument-js/#L509" sourceLabel="TextActivityDocument.js:509" />

Fills the `currentText` member with the text currently hosted in $span or selected in $comboList

**Returns**

- `string`

## Instance Fields

<MemberHeading id="doc" depth="3" name="doc" sig="doc: module:activities/text/TextActivityDocument.TextActivityDocument" />

<MemberMeta sourceHref="/source/activities/text/textactivitydocument-js/#L523" sourceLabel="TextActivityDocument.js:523" />

The [TextActivityDocument](/module/activities-text-textactivitydocument#textactivitydocument) to which this target belongs

<MemberHeading id="text" depth="3" name="text" sig="text: string" />

<MemberMeta sourceHref="/source/activities/text/textactivitydocument-js/#L528" sourceLabel="TextActivityDocument.js:528" />

The current text displayed by this TextTarget

<MemberHeading id="attr" depth="3" name="attr" sig="attr: object" />

<MemberMeta sourceHref="/source/activities/text/textactivitydocument-js/#L533" sourceLabel="TextActivityDocument.js:533" />

A set of optional attributes for `text`

<MemberHeading id="islist" depth="3" name="isList" sig="isList: boolean" />

<MemberMeta sourceHref="/source/activities/text/textactivitydocument-js/#L538" sourceLabel="TextActivityDocument.js:538" />

`true` when the target is a drop-down list

<MemberHeading id="numinichars" depth="3" name="numIniChars" sig="numIniChars: number" />

<MemberMeta sourceHref="/source/activities/text/textactivitydocument-js/#L543" sourceLabel="TextActivityDocument.js:543" />

Number of characters initially displayed on the text field

<MemberHeading id="inichar" depth="3" name="iniChar" sig="iniChar: string" />

<MemberMeta sourceHref="/source/activities/text/textactivitydocument-js/#L548" sourceLabel="TextActivityDocument.js:548" />

Character used to fill-in the text field

<MemberHeading id="maxlenresp" depth="3" name="maxLenResp" sig="maxLenResp: number" />

<MemberMeta sourceHref="/source/activities/text/textactivitydocument-js/#L553" sourceLabel="TextActivityDocument.js:553" />

Maximum length of the answer

<MemberHeading id="answers" depth="3" name="answers" sig="answers: Array.<string>" />

<MemberMeta sourceHref="/source/activities/text/textactivitydocument-js/#L558" sourceLabel="TextActivityDocument.js:558" />

Array of valid answers

<MemberHeading id="options" depth="3" name="options" sig="options: object" />

<MemberMeta sourceHref="/source/activities/text/textactivitydocument-js/#L563" sourceLabel="TextActivityDocument.js:563" />

Set of specific options

<MemberHeading id="initext" depth="3" name="iniText" sig="iniText: string" />

<MemberMeta sourceHref="/source/activities/text/textactivitydocument-js/#L568" sourceLabel="TextActivityDocument.js:568" />

Text displayed by the target when the activity begins

<MemberHeading id="infomode" depth="3" name="infoMode" sig="infoMode: string" />

<MemberMeta sourceHref="/source/activities/text/textactivitydocument-js/#L574" sourceLabel="TextActivityDocument.js:574" />

Type of additional information offered to the user. Possible values are: `no_info`, `always`,\
`onError` and `onDemand`.

<MemberHeading id="popupkey" depth="3" name="popupKey" sig="popupKey: string" />

<MemberMeta sourceHref="/source/activities/text/textactivitydocument-js/#L579" sourceLabel="TextActivityDocument.js:579" />

Key that triggers the associated popup when `infoMode` is `onDemand`

<MemberHeading id="popupcontent" depth="3" name="popupContent" sig="popupContent: module:boxes/ActiveBoxContent.ActiveBoxContent" />

<MemberMeta sourceHref="/source/activities/text/textactivitydocument-js/#L584" sourceLabel="TextActivityDocument.js:584" />

An optional [ActiveBoxContent](/module/boxes-activeboxcontent#activeboxcontent) with information about this TextTarget

<MemberHeading id="popupdelay" depth="3" name="popupDelay" sig="popupDelay: number" />

<MemberMeta sourceHref="/source/activities/text/textactivitydocument-js/#L589" sourceLabel="TextActivityDocument.js:589" />

Time (seconds) to wait before showing the additional information

<MemberHeading id="popupmaxtime" depth="3" name="popupMaxTime" sig="popupMaxTime: number" />

<MemberMeta sourceHref="/source/activities/text/textactivitydocument-js/#L594" sourceLabel="TextActivityDocument.js:594" />

Maximum amount of time (seconds) that the additional information will be shown

<MemberHeading id="onlyplay" depth="3" name="onlyPlay" sig="onlyPlay: boolean" />

<MemberMeta sourceHref="/source/activities/text/textactivitydocument-js/#L600" sourceLabel="TextActivityDocument.js:600" />

When this flag is `true` and `popupContent` contains audio, no visual feedback will be\
provided (meaning that audio will be just played)

<MemberHeading id="combolist" depth="3" name="$comboList" sig="$comboList: external:jQuery" />

<MemberMeta sourceHref="/source/activities/text/textactivitydocument-js/#L608" sourceLabel="TextActivityDocument.js:608" />

The drop-down list associated to this target

<MemberHeading id="span" depth="3" name="$span" sig="$span: external:jQuery" />

<MemberMeta sourceHref="/source/activities/text/textactivitydocument-js/#L613" sourceLabel="TextActivityDocument.js:613" />

The span element associated to this target

<MemberHeading id="p" depth="3" name="$p" sig="$p: external:jQuery" />

<MemberMeta sourceHref="/source/activities/text/textactivitydocument-js/#L618" sourceLabel="TextActivityDocument.js:618" />

The paragraph element where $span is currently located

<MemberHeading id="popup" depth="3" name="$popup" sig="$popup: external:jQuery" />

<MemberMeta sourceHref="/source/activities/text/textactivitydocument-js/#L623" sourceLabel="TextActivityDocument.js:623" />

The span element containing the popup

<MemberHeading id="currenttext" depth="3" name="currentText" sig="currentText: string" />

<MemberMeta sourceHref="/source/activities/text/textactivitydocument-js/#L628" sourceLabel="TextActivityDocument.js:628" />

Current text in the $span element

<MemberHeading id="num" depth="3" name="num" sig="num: number" />

<MemberMeta sourceHref="/source/activities/text/textactivitydocument-js/#L633" sourceLabel="TextActivityDocument.js:633" />

Ordinal number of this target in the collection of targets

<MemberHeading id="pos" depth="3" name="pos" sig="pos: number" />

<MemberMeta sourceHref="/source/activities/text/textactivitydocument-js/#L639" sourceLabel="TextActivityDocument.js:639" />

Current ordinal position of this target in the document\
(used in [OrderText](/module/activities-text-ordertext#ordertext) activities)

<MemberHeading id="targetstatus" depth="3" name="targetStatus" sig="targetStatus: string" />

<MemberMeta sourceHref="/source/activities/text/textactivitydocument-js/#L644" sourceLabel="TextActivityDocument.js:644" />

Current status of the target. Valid values are: `NOT_EDITED`, `EDITED`, `SOLVED`, `WITH_ERROR` and `HIDDEN`

<MemberHeading id="flagmodified" depth="3" name="flagModified" sig="flagModified: boolean" />

<MemberMeta sourceHref="/source/activities/text/textactivitydocument-js/#L649" sourceLabel="TextActivityDocument.js:649" />

Flag to control if the initial content of this TextTarget has been modified

<MemberHeading id="parentpane" depth="3" name="parentPane" sig="parentPane: module:activities/text/TextActivityBase.TextActivityBasePanel" />

<MemberMeta sourceHref="/source/activities/text/textactivitydocument-js/#L654" sourceLabel="TextActivityDocument.js:654" />

Pointer to the activity panel containing this TextTarget
