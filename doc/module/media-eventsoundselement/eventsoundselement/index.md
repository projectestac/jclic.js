---
title: EventSoundsElement
kind: class
longname: module:media/EventSoundsElement.EventSoundsElement
description: "The EventSoundsElement object contains the description of a specific sound to be played when one of the JClic events are fired. For a full list of the JClic events see: {@link module:media/EventSounds.EventSounds EventSounds}"
---

# EventSoundsElement

<SourceLink href="/source/media/eventsoundselement-js/#L41" label="EventSoundsElement.js:41" />

The EventSoundsElement object contains the description of a specific sound to be played when\
one of the JClic events are fired.\
For a full list of the JClic events see: [EventSounds](/module/media-eventsounds#eventsounds)

---

## Constructor

<Signature
  code="new EventSoundsElement(
	id: string,
	file?: string,
): EventSoundsElement"
/>

EventSoundsElement constructor

**Parameters**

- `id` (string) — The identifier of this media sound
- `file` (string, optional) — An optional file name or URL containing the sound data

---

## Instance Methods

<MemberHeading id="setproperties" depth="3" name="setProperties" sig="setProperties($xml: external:jQuery)" />

<MemberMeta sourceHref="/source/media/eventsoundselement-js/#L61" sourceLabel="EventSoundsElement.js:61" />

Reads the properties of this object from an XML element

**Parameters**

- `$xml` ([external:jQuery](/module/utils#jquery)) — The XML element to be parsed

<MemberHeading id="getattributes" depth="3" name="getAttributes" sig="getAttributes(): object" />

<MemberMeta sourceHref="/source/media/eventsoundselement-js/#L73" sourceLabel="EventSoundsElement.js:73" />

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
): module:media/EventSoundsElement.EventSoundsElement"
/>

<MemberMeta sourceHref="/source/media/eventsoundselement-js/#L85" sourceLabel="EventSoundsElement.js:85" />

Reads the properties of this EventSoundsElement from a data object

**Parameters**

- `data` (object) — The data object to be parsed

**Returns**

- [`module:media/EventSoundsElement.EventSoundsElement`](/module/media-eventsoundselement#eventsoundselement)

<MemberHeading
  id="realize"
  depth="3"
  name="realize"
  sig="realize(
	ps: module:JClicPlayer.JClicPlayer,
	mediaBag: module:bags/MediaBag.MediaBag,
)"
/>

<MemberMeta sourceHref="/source/media/eventsoundselement-js/#L97" sourceLabel="EventSoundsElement.js:97" />

Instantiates this audio object

**Parameters**

- `ps` ([module:JClicPlayer.JClicPlayer](/module/jclicplayer#jclicplayer))
- `mediaBag` ([module:bags/MediaBag.MediaBag](/module/bags-mediabag#mediabag))

<MemberHeading id="play" depth="3" name="play" sig="play()" />

<MemberMeta sourceHref="/source/media/eventsoundselement-js/#L107" sourceLabel="EventSoundsElement.js:107" />

Plays the audio associated to this event

<MemberHeading id="stop" depth="3" name="stop" sig="stop()" />

<MemberMeta sourceHref="/source/media/eventsoundselement-js/#L120" sourceLabel="EventSoundsElement.js:120" />

Stops playing the audio associated to this event

## Instance Fields

<MemberHeading id="file" depth="3" name="file" sig="file: string" />

<MemberMeta sourceHref="/source/media/eventsoundselement-js/#L135" sourceLabel="EventSoundsElement.js:135" />

The name of the sound file used by this element

<MemberHeading id="enabled" depth="3" name="enabled" sig="enabled: number" />

<MemberMeta sourceHref="/source/media/eventsoundselement-js/#L140" sourceLabel="EventSoundsElement.js:140" />

Whether the sound for this event is enabled or not

<MemberHeading id="player" depth="3" name="player" sig="player: module:media/ActiveMediaPlayer.ActiveMediaPlayer" />

<MemberMeta sourceHref="/source/media/eventsoundselement-js/#L145" sourceLabel="EventSoundsElement.js:145" />

Media player used to play this sound

<MemberHeading id="audio" depth="3" name="audio" sig="audio: external:HTMLAudioElement" />

<MemberMeta sourceHref="/source/media/eventsoundselement-js/#L150" sourceLabel="EventSoundsElement.js:150" />

HTMLAudioElement used to play this sound
