---
title: MidiAudioPlayer
kind: class
longname: module:media/MidiAudioPlayer.MidiAudioPlayer
description: "A simple MIDI player based on MidiPlayerJS https://github.com/grimmdude/MidiPlayerJS See also: http://www.midijs.net (https://github.com/babelsberg/babelsberg-js/tree/master/midijs)"
---

# MidiAudioPlayer

<SourceLink href="/source/media/midiaudioplayer-js/#L45" label="MidiAudioPlayer.js:45" />

A simple MIDI player based on MidiPlayerJS\
https\://github.com/grimmdude/MidiPlayerJS\
See also: http\://www\.midijs.net (https\://github.com/babelsberg/babelsberg-js/tree/master/midijs)

---

## Constructor

<Signature
  code="new MidiAudioPlayer(
	data: external:ArrayBuffer,
	options?: object,
): MidiAudioPlayer"
/>

MidiAudioPlayer constructor

**Parameters**

- `data` (external:ArrayBuffer) — The MIDI file content, in ArrayBuffer format
- `options` (object, optional, default: "{}") — Optional params related to the type of soundfont used. Valid options inside this object are:

---

## Instance Methods

<MemberHeading id="pause" depth="3" name="pause" sig="pause()" />

<MemberMeta sourceHref="/source/media/midiaudioplayer-js/#L95" sourceLabel="MidiAudioPlayer.js:95" />

Pauses the player

<MemberHeading id="play" depth="3" name="play" sig="play()" />

<MemberMeta sourceHref="/source/media/midiaudioplayer-js/#L105" sourceLabel="MidiAudioPlayer.js:105" />

Starts or resumes playing

<MemberHeading id="playevent" depth="3" name="playEvent" sig="playEvent(ev: object)" />

<MemberMeta sourceHref="/source/media/midiaudioplayer-js/#L149" sourceLabel="MidiAudioPlayer.js:149" />

Plays a MIDI event

**Parameters**

- `ev` (object) — The event data. See http\://grimmdude.com/MidiPlayerJS/docs/index.html for details

## Static Methods

<MemberHeading
  id="prepareinstrument"
  depth="3"
  name="prepareInstrument"
  sig="prepareInstrument(
	options: object,
	audioContext: external:AudioContext,
)"
/>

<MemberMeta badges="static" sourceHref="/source/media/midiaudioplayer-js/#L74" sourceLabel="MidiAudioPlayer.js:74" />

Initializes the soundfont instrument, loading data from GitHub\
NOTE: This will not work when off-line!\
TODO: Provided a basic, simple, static soundfont

**Parameters**

- `options` (object) — Optional param with options related to the MIDI soundfont. See details in `constructor` description.
- `audioContext` ([external:AudioContext](/module/utils#audiocontext)) — The AudioContext object (see: https\://developer.mozilla.org/en-US/docs/Web/API/AudioContext)

## Instance Fields

<MemberHeading id="paused" depth="3" name="paused" sig="paused" />

<MemberMeta sourceHref="/source/media/midiaudioplayer-js/#L116" sourceLabel="MidiAudioPlayer.js:116" />

Gets the ' paused' state of the current player

**Returns**

- boolean

<MemberHeading id="ended" depth="3" name="ended" sig="ended" />

<MemberMeta sourceHref="/source/media/midiaudioplayer-js/#L124" sourceLabel="MidiAudioPlayer.js:124" />

Checks if the current player has ended or is already playing

**Returns**

- boolean

<MemberHeading id="currenttime" depth="3" name="currentTime" sig="currentTime" />

<MemberMeta sourceHref="/source/media/midiaudioplayer-js/#L132" sourceLabel="MidiAudioPlayer.js:132" />

Gets the current time

**Returns**

- number

<MemberHeading id="currenttime" depth="3" name="currentTime" sig="currentTime" />

<MemberMeta sourceHref="/source/media/midiaudioplayer-js/#L140" sourceLabel="MidiAudioPlayer.js:140" />

Sets the current time of this player (in milliseconds)

**Parameters**

- `time` (number) — The time position where the player pointer must be placed

<MemberHeading id="data" depth="3" name="data" sig="data: external:ArrayBuffer" />

<MemberMeta sourceHref="/source/media/midiaudioplayer-js/#L174" sourceLabel="MidiAudioPlayer.js:174" />

The MIDI file data used by this MIDI player

<MemberHeading id="player" depth="3" name="player" sig="player: external:MidiPlayerJS" />

<MemberMeta sourceHref="/source/media/midiaudioplayer-js/#L179" sourceLabel="MidiAudioPlayer.js:179" />

The grimmdude's MidiPlayer used by this player

<MemberHeading id="playto" depth="3" name="playTo" sig="playTo: number" />

<MemberMeta sourceHref="/source/media/midiaudioplayer-js/#L184" sourceLabel="MidiAudioPlayer.js:184" />

When >0, time position at which the music must end

<MemberHeading id="mainvolume" depth="3" name="mainVolume" sig="mainVolume: number" />

<MemberMeta sourceHref="/source/media/midiaudioplayer-js/#L189" sourceLabel="MidiAudioPlayer.js:189" />

Main volume of this track (set with a MIDI message of type `Controller Change` #7)

<MemberHeading id="startednotes" depth="3" name="startedNotes" sig="startedNotes: Array.<function()>" />

<MemberMeta sourceHref="/source/media/midiaudioplayer-js/#L195" sourceLabel="MidiAudioPlayer.js:195" />

This array is used when processing 'Note off' events to stop notes that are currently playing.\
It contains a collection of 'instrument.play' instances, one for each active note

## Static Fields

<MemberHeading id="audiocontext" depth="3" name="audioContext" sig="audioContext: external:AudioContext" />

<MemberMeta badges="static" sourceHref="/source/media/midiaudioplayer-js/#L202" sourceLabel="MidiAudioPlayer.js:202" />

The [external:AudioContext](/module/utils#audiocontext) used by this MIDI player.

<MemberHeading id="instrument" depth="3" name="instrument" sig="instrument: external:Instrument" />

<MemberMeta badges="static" sourceHref="/source/media/midiaudioplayer-js/#L209" sourceLabel="MidiAudioPlayer.js:209" />

The "Instrument" object used by this MIDI player.\
See: https\://github.com/danigb/soundfont-player

<MemberHeading id="loadinginstrument" depth="3" name="loadingInstrument" sig="loadingInstrument: boolean" />

<MemberMeta badges="static" sourceHref="/source/media/midiaudioplayer-js/#L215" sourceLabel="MidiAudioPlayer.js:215" />

A flag used to avoid re-entrant calls to `prepareInstrument`

<MemberHeading id="midisoundfontobject" depth="3" name="MIDISoundFontObject" sig="MIDISoundFontObject: object" />

<MemberMeta badges="static" sourceHref="/source/media/midiaudioplayer-js/#L223" sourceLabel="MidiAudioPlayer.js:223" />

An object containing the full soundfont data used by `instrument`\
When this member is set, no other settings related to the sounfFont will be used.\
This value can be overwritten by the global parameter `MIDISoundFontObject`

<MemberHeading id="midisoundfontbase" depth="3" name="MIDISoundFontBase" sig="MIDISoundFontBase: string" />

<MemberMeta badges="static" sourceHref="/source/media/midiaudioplayer-js/#L230" sourceLabel="MidiAudioPlayer.js:230" />

The URL used as base for the current collection of MIDI soundfonts.\
This value can be overwritten by the global parameter `MIDISoundFontBase`

<MemberHeading id="midisoundfontname" depth="3" name="MIDISoundFontName" sig="MIDISoundFontName: string" />

<MemberMeta badges="static" sourceHref="/source/media/midiaudioplayer-js/#L242" sourceLabel="MidiAudioPlayer.js:242" />

The MIDI instrument name.\
This value can be overwritten by the global parameter `MIDISoundFontName`\
See [MIDI.js Soundfonts](https://github.com/gleitz/midi-js-soundfonts) for full lists of MIDI instrument names.

<MemberHeading id="midisoundfontextension" depth="3" name="MIDISoundFontExtension" sig="MIDISoundFontExtension: string" />

<MemberMeta badges="static" sourceHref="/source/media/midiaudioplayer-js/#L250" sourceLabel="MidiAudioPlayer.js:250" />

An extension to be added to `MIDISoundFontName` in order to build the full file name of the soundfont JS file.\
Current valid options are `-mp3.js` and `-ogg.js`\
This value can be overwritten by the global parameter `MIDISoundFontExtension`
