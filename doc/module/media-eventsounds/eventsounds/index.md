---
title: EventSounds
kind: class
longname: module:media/EventSounds.EventSounds
description: "The EventSounds objects contains specific sounds to be played when JClic events are fired: start click actionError actionOk finishedError finishedOk The sounds are stored in an array of {@link module:media/EventSoundsElement EventSoundsElement} objects."
---

# EventSounds

<SourceLink href="/source/media/eventsounds-js/#L55" label="EventSounds.js:55" />

The EventSounds objects contains specific sounds to be played when JClic events are fired:

- start
- click
- actionError
- actionOk
- finishedError
- finishedOk

The sounds are stored in an array of [EventSoundsElement](/module/media-eventsoundselement) objects.

---

## Constructor

<Signature
  code="new EventSounds(
	parent?: module:media/EventSounds.EventSounds,
): EventSounds"
/>

EventSounds constructor

**Parameters**

- `parent` ([module:media/EventSounds.EventSounds](/module/media-eventsounds#eventsounds), optional) — Another EventSounds object that will act as a parent of this one,\
  used to resolve which sound must be played for events when not defined here.

---

## Instance Methods

<MemberHeading id="setproperties" depth="3" name="setProperties" sig="setProperties($xml: external:jQuery)" />

<MemberMeta sourceHref="/source/media/eventsounds-js/#L72" sourceLabel="EventSounds.js:72" />

Reads the object properties from an XML element

**Parameters**

- `$xml` ([external:jQuery](/module/utils#jquery)) — The XML element to be parsed

<MemberHeading id="getattributes" depth="3" name="getAttributes" sig="getAttributes(): object" />

<MemberMeta sourceHref="/source/media/eventsounds-js/#L88" sourceLabel="EventSounds.js:88" />

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
): module:media/EventSounds.EventSounds"
/>

<MemberMeta sourceHref="/source/media/eventsounds-js/#L100" sourceLabel="EventSounds.js:100" />

Reads the properties of this EventSounds from a data object

**Parameters**

- `data` (object) — The data object to be parsed

**Returns**

- [`module:media/EventSounds.EventSounds`](/module/media-eventsounds#eventsounds)

<MemberHeading
  id="realize"
  depth="3"
  name="realize"
  sig="realize(
	ps: module:JClicPlayer.JClicPlayer,
	mediaBag: module:bags/MediaBag.MediaBag,
)"
/>

<MemberMeta sourceHref="/source/media/eventsounds-js/#L112" sourceLabel="EventSounds.js:112" />

Instantiates the audio objects needed to play event sounds

**Parameters**

- `ps` ([module:JClicPlayer.JClicPlayer](/module/jclicplayer#jclicplayer))
- `mediaBag` ([module:bags/MediaBag.MediaBag](/module/bags-mediabag#mediabag))

<MemberHeading id="play" depth="3" name="play" sig="play(eventName: string)" />

<MemberMeta sourceHref="/source/media/eventsounds-js/#L121" sourceLabel="EventSounds.js:121" />

Plays a specific event sound

**Parameters**

- `eventName` (string) — The identifier of the event to be played

## Instance Fields

<MemberHeading id="elements" depth="3" name="elements" sig="elements: object" />

<MemberMeta sourceHref="/source/media/eventsounds-js/#L148" sourceLabel="EventSounds.js:148" />

Collection of [EventSoundsElement](/module/media-eventsoundselement) objects

<MemberHeading id="enabled" depth="3" name="enabled" sig="enabled: number" />

<MemberMeta sourceHref="/source/media/eventsounds-js/#L160" sourceLabel="EventSounds.js:160" />

Whether this event sounds are enabled or not

<MemberHeading id="globalenabled" depth="3" name="globalEnabled" sig="globalEnabled: boolean" />

<MemberMeta sourceHref="/source/media/eventsounds-js/#L166" sourceLabel="EventSounds.js:166" />

This attribute is intended to be used at prototype level, to indicate a globally disabled\
or enabled state.

## Static Fields

<MemberHeading id="media" depth="3" name="MEDIA" sig="MEDIA: object" />

<MemberMeta badges="static" sourceHref="/source/media/eventsounds-js/#L134" sourceLabel="EventSounds.js:134" />

Audio data for default event sounds
