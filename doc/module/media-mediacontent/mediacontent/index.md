---
title: MediaContent
kind: class
longname: module:media/MediaContent.MediaContent
description: This object contains a description of any multimedia content (sound, video, MIDI, voice recording..) or special actions (jump to another point in the sequence, link to an URL, etc.) associated to an {@link module:boxes/ActiveBox.ActiveBox ActiveBox} object.
---

# MediaContent

<SourceLink href="/source/media/mediacontent-js/#L48" label="MediaContent.js:48" />

This object contains a description of any multimedia content (sound, video, MIDI, voice\
recording..) or special actions (jump to another point in the sequence, link to an URL, etc.)\
associated to an [ActiveBox](/module/boxes-activebox#activebox) object.

---

## Constructor

<Signature code="new MediaContent(type: string, file?: string): MediaContent" />

MediaContent constructor

**Parameters**

- `type` (string) — The type of media. Valid values are: `UNKNOWN`, `PLAY_AUDIO`, `PLAY_VIDEO`,\
  `PLAY_MIDI`, `PLAY_CDAUDIO`, `RECORD_AUDIO`, `PLAY_RECORDED_AUDIO`, `RUN_CLIC_ACTIVITY`,\
  `RUN_CLIC_PACKAGE`, `RUN_EXTERNAL`, `URL`, `EXIT` and `RETURN`
- `file` (string, optional) — Optional parameter indicating the media file name

---

## Instance Methods

<MemberHeading id="setproperties" depth="3" name="setProperties" sig="setProperties($xml: external:jQuery)" />

<MemberMeta sourceHref="/source/media/mediacontent-js/#L66" sourceLabel="MediaContent.js:66" />

Loads the MediaContent settings from a specific JQuery XML element

**Parameters**

- `$xml` ([external:jQuery](/module/utils#jquery))

<MemberHeading id="getattributes" depth="3" name="getAttributes" sig="getAttributes(): object" />

<MemberMeta sourceHref="/source/media/mediacontent-js/#L121" sourceLabel="MediaContent.js:121" />

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
): module:media/MediaContent.MediaContent"
/>

<MemberMeta sourceHref="/source/media/mediacontent-js/#L136" sourceLabel="MediaContent.js:136" />

Reads the properties of this MediaContent from a data object

**Parameters**

- `data` (object) — The data object to be parsed

**Returns**

- [`module:media/MediaContent.MediaContent`](/module/media-mediacontent#mediacontent)

<MemberHeading
  id="isequivalent"
  depth="3"
  name="isEquivalent"
  sig="isEquivalent(
	mc: module:media/MediaContent.MediaContent,
): boolean"
/>

<MemberMeta sourceHref="/source/media/mediacontent-js/#L151" sourceLabel="MediaContent.js:151" />

Compares this object with another MediaContent.

**Parameters**

- `mc` ([module:media/MediaContent.MediaContent](/module/media-mediacontent#mediacontent)) — The Media Content to compare against to.

**Returns**

- `boolean`

<MemberHeading id="getdescription" depth="3" name="getDescription" sig="getDescription(): string" />

<MemberMeta sourceHref="/source/media/mediacontent-js/#L166" sourceLabel="MediaContent.js:166" />

Gets a string representing this media content, useful for checking if two different elements\
are equivalent.

**Returns**

- `string`

<MemberHeading id="tostring" depth="3" name="toString" sig="toString(): string" />

<MemberMeta sourceHref="/source/media/mediacontent-js/#L179" sourceLabel="MediaContent.js:179" />

Returns a simplified description of this media content. Useful for accessibility methods.

**Returns**

- `string`

<MemberHeading id="geticon" depth="3" name="getIcon" sig="getIcon(): external:HTMLImageElement" />

<MemberMeta sourceHref="/source/media/mediacontent-js/#L187" sourceLabel="MediaContent.js:187" />

Returns an image to be used as icon for representing this media content.

**Returns**

- [`external:HTMLImageElement`](/module/utils#htmlimageelement)

## Instance Fields

<MemberHeading id="type" depth="3" name="type" sig="type: string" />

<MemberMeta sourceHref="/source/media/mediacontent-js/#L221" sourceLabel="MediaContent.js:221" />

The type of media. Valid values are: `UNKNOWN`, `PLAY_AUDIO`, `PLAY_VIDEO`,\
`PLAY_MIDI`, `PLAY_CDAUDIO`, `RECORD_AUDIO`, `PLAY_RECORDED_AUDIO`, `RUN_CLIC_ACTIVITY`,\
`RUN_CLIC_PACKAGE`, `RUN_EXTERNAL`, `URL`, `EXIT` and `RETURN`

<MemberHeading id="level" depth="3" name="level" sig="level: number" />

<MemberMeta sourceHref="/source/media/mediacontent-js/#L227" sourceLabel="MediaContent.js:227" />

The priority level is important when different medias want to play together. Objects with\
highest priority level can mute lower ones.

<MemberHeading id="file" depth="3" name="file" sig="file: string" />

<MemberMeta sourceHref="/source/media/mediacontent-js/#L232" sourceLabel="MediaContent.js:232" />

Media file name

<MemberHeading id="externalparams" depth="3" name="externalParams" sig="externalParams: string" />

<MemberMeta sourceHref="/source/media/mediacontent-js/#L237" sourceLabel="MediaContent.js:237" />

Optional parameters passed to external calls

<MemberHeading id="from" depth="3" name="from" sig="from: number" />

<MemberMeta sourceHref="/source/media/mediacontent-js/#L243" sourceLabel="MediaContent.js:243" />

Special setting used to play only a fragment of media. `-1` means not used (plays full\
length, from the beginning)

<MemberHeading id="to" depth="3" name="to" sig="to: number" />

<MemberMeta sourceHref="/source/media/mediacontent-js/#L249" sourceLabel="MediaContent.js:249" />

Special setting used to play only a fragment of media. `-1` means not used (plays to the end\
of the media)

<MemberHeading id="length" depth="3" name="length" sig="length: number" />

<MemberMeta sourceHref="/source/media/mediacontent-js/#L255" sourceLabel="MediaContent.js:255" />

When `type` is `RECORD_AUDIO`, this member stores the maximum length of the recorded\
sound, in seconds.

<MemberHeading id="recbuffer" depth="3" name="recBuffer" sig="recBuffer: number" />

<MemberMeta sourceHref="/source/media/mediacontent-js/#L261" sourceLabel="MediaContent.js:261" />

When `type` is `RECORD_AUDIO`, this member stores the buffer ID where the recording\
will be stored.

<MemberHeading id="stretch" depth="3" name="stretch" sig="stretch: boolean" />

<MemberMeta sourceHref="/source/media/mediacontent-js/#L266" sourceLabel="MediaContent.js:266" />

Whether to stretch or not the video size to fit the cell space.

<MemberHeading id="free" depth="3" name="free" sig="free: boolean" />

<MemberMeta sourceHref="/source/media/mediacontent-js/#L271" sourceLabel="MediaContent.js:271" />

When `true`, the video plays out of the cell, centered on the activity window.

<MemberHeading id="abslocation" depth="3" name="absLocation" sig="absLocation: module:AWT.Point" />

<MemberMeta sourceHref="/source/media/mediacontent-js/#L276" sourceLabel="MediaContent.js:276" />

Places the video window at a specific location.

<MemberHeading id="abslocationfrom" depth="3" name="absLocationFrom" sig="absLocationFrom: string" />

<MemberMeta sourceHref="/source/media/mediacontent-js/#L282" sourceLabel="MediaContent.js:282" />

When [module:media/MediaContent.MediaContent#absLocation](/module/media-mediacontent/mediacontent#abslocation) is not `null`, this field indicates from where to\
measure its coordinates. Valid values are: `BOX`, `WINDOW` or `FRAME`.

<MemberHeading id="catchmouseevents" depth="3" name="catchMouseEvents" sig="catchMouseEvents: boolean" />

<MemberMeta sourceHref="/source/media/mediacontent-js/#L287" sourceLabel="MediaContent.js:287" />

`true` when the video window must catch mouse clicks.

<MemberHeading id="loop" depth="3" name="loop" sig="loop: boolean" />

<MemberMeta sourceHref="/source/media/mediacontent-js/#L292" sourceLabel="MediaContent.js:292" />

Whether to repeat the media in loop, or just one time.

<MemberHeading id="autostart" depth="3" name="autoStart" sig="autoStart: boolean" />

<MemberMeta sourceHref="/source/media/mediacontent-js/#L298" sourceLabel="MediaContent.js:298" />

When `true`, the media will automatically start playing when the associated [ActiveBox](/module/boxes-activebox#activebox)\
become active.

## Static Fields

<MemberHeading id="icons" depth="3" name="ICONS" sig="ICONS: object" />

<MemberMeta badges="static" sourceHref="/source/media/mediacontent-js/#L317" sourceLabel="MediaContent.js:317" />

Collection of icon [external:HTMLImageElement](/module/utils#htmlimageelement) objects
