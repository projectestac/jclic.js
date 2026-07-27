---
title: TextActivityDocument
kind: class
longname: module:activities/text/TextActivityDocument.TextActivityDocument
description: This is the HTML DOM element used in text activities like {@link module:activities/text/FillInBlanks.FillInBlanks FillInBlanks}, {@link module:activities/text/IdentifyText.IdentifyText IdentifyText}, {@link module:activities/text/OrderText.OrderText OrderText} and {@link module:activities/text/Complete.Complete Complete}. It contains the main document of the activity, usually with some elements marked as &quot;targets&quot;. In {@link module:activities/text/FillInBlanks.FillInBlanks FillInBlanks}, this targets are encapsulated in {@link module:activities/text/TextActivityDocument.TextTarget TextTarget} objects.
---

# TextActivityDocument

<SourceLink href="/source/activities/text/textactivitydocument-js/#L43" label="TextActivityDocument.js:43" />

This is the HTML DOM element used in text activities like [FillInBlanks](/module/activities-text-fillinblanks#fillinblanks),\
[IdentifyText](/module/activities-text-identifytext#identifytext), [OrderText](/module/activities-text-ordertext#ordertext) and [Complete](/module/activities-text-complete#complete). It contains the main document of\
the activity, usually with some elements marked as "targets". In [FillInBlanks](/module/activities-text-fillinblanks#fillinblanks), this\
targets are encapsulated in [TextTarget](/module/activities-text-textactivitydocument#texttarget) objects.

---

## Constructor

<Signature code="new TextActivityDocument(): TextActivityDocument" />

TextActivityDocument constructor

---

## Instance Methods

<MemberHeading
  id="setproperties"
  depth="3"
  name="setProperties"
  sig="setProperties(
	$xml: external:jQuery,
	mediaBag: module:bags/MediaBag.MediaBag,
)"
/>

<MemberMeta sourceHref="/source/activities/text/textactivitydocument-js/#L58" sourceLabel="TextActivityDocument.js:58" />

Loads the document settings from a specific JQuery XML element

**Parameters**

- `$xml` ([external:jQuery](/module/utils#jquery)) — The XML element to parse
- `mediaBag` ([module:bags/MediaBag.MediaBag](/module/bags-mediabag#mediabag)) — The media bag used to load images and media content

<MemberHeading id="readdocattributes" depth="3" name="readDocAttributes" sig="readDocAttributes($xml: external:jQuery): object" />

<MemberMeta sourceHref="/source/activities/text/textactivitydocument-js/#L138" sourceLabel="TextActivityDocument.js:138" />

Reads sets of text attributes, sometimes in form of named styles

**Parameters**

- `$xml` ([external:jQuery](/module/utils#jquery)) — The XML element to parse

**Returns**

- `object`

<MemberHeading id="getattributes" depth="3" name="getAttributes" sig="getAttributes(): object" />

<MemberMeta sourceHref="/source/activities/text/textactivitydocument-js/#L216" sourceLabel="TextActivityDocument.js:216" />

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
): module:activities/text/TextActivityDocument.TextActivityDocument"
/>

<MemberMeta sourceHref="/source/activities/text/textactivitydocument-js/#L226" sourceLabel="TextActivityDocument.js:226" />

Reads the properties of this TextActivityDocument from a data object

**Parameters**

- `data` (object) — The data object to be parsed, or just the text content

**Returns**

- [`module:activities/text/TextActivityDocument.TextActivityDocument`](/module/activities-text-textactivitydocument#textactivitydocument)

<MemberHeading id="getrawtext" depth="3" name="getRawText" sig="getRawText(): string" />

<MemberMeta sourceHref="/source/activities/text/textactivitydocument-js/#L251" sourceLabel="TextActivityDocument.js:251" />

Gets the full text of this document in raw format

**Returns**

- `string`

<MemberHeading id="getfullstyle" depth="3" name="getFullStyle" sig="getFullStyle(name: string): object" />

<MemberMeta sourceHref="/source/activities/text/textactivitydocument-js/#L289" sourceLabel="TextActivityDocument.js:289" />

Gets a `style` object filled with default attributes plus attributes present in the\
requested style name.

**Parameters**

- `name` (string) — The requested style name

**Returns**

- `object`

## Instance Fields

<MemberHeading id="tabspc" depth="3" name="tabSpc" sig="tabSpc: number" />

<MemberMeta sourceHref="/source/activities/text/textactivitydocument-js/#L321" sourceLabel="TextActivityDocument.js:321" />

Number of blank spaces between tabulators.

<MemberHeading id="lastboxid" depth="3" name="lastBoxId" sig="lastBoxId: number" />

<MemberMeta sourceHref="/source/activities/text/textactivitydocument-js/#L326" sourceLabel="TextActivityDocument.js:326" />

Index of the last [ActiveBox](/module/boxes-activebox#activebox) activated.

<MemberHeading id="tmb" depth="3" name="tmb" sig="tmb: object" />

<MemberMeta sourceHref="/source/activities/text/textactivitydocument-js/#L331" sourceLabel="TextActivityDocument.js:331" />

A bag of `TargetMarker` objects

<MemberHeading id="numtargets" depth="3" name="numTargets" sig="numTargets: number" />

<MemberMeta sourceHref="/source/activities/text/textactivitydocument-js/#L336" sourceLabel="TextActivityDocument.js:336" />

Number of targets

<MemberHeading id="targettype" depth="3" name="targetType" sig="targetType: string" />

<MemberMeta sourceHref="/source/activities/text/textactivitydocument-js/#L342" sourceLabel="TextActivityDocument.js:342" />

Type of targets used in this activity. Possible values are: `TT_FREE`, `TT_CHAR`, `TT_WORD`\
and `TT_PARAGRAPH`.

<MemberHeading id="style" depth="3" name="style" sig="style: object" />

<MemberMeta sourceHref="/source/activities/text/textactivitydocument-js/#L347" sourceLabel="TextActivityDocument.js:347" />

Collection of named styles of the document

<MemberHeading id="p" depth="3" name="p" sig="p: object" />

<MemberMeta sourceHref="/source/activities/text/textactivitydocument-js/#L352" sourceLabel="TextActivityDocument.js:352" />

The main document, represented as a collection of DOM objects

## Static Fields

<MemberHeading id="defaultdocstyle" depth="3" name="DEFAULT_DOC_STYLE" sig="DEFAULT_DOC_STYLE" />

<MemberMeta badges="static" sourceHref="/source/activities/text/textactivitydocument-js/#L299" sourceLabel="TextActivityDocument.js:299" />

Default style
