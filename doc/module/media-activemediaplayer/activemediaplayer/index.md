---
title: ActiveMediaPlayer
kind: class
longname: module:media/ActiveMediaPlayer.ActiveMediaPlayer
description: This kind of object encapsulates a realized {@link module:media/MediaContent.MediaContent} and provides methods to start, stop, pause and record different types of media (audio, video, MIDI, voice recording...)
---

# ActiveMediaPlayer

<SourceLink href="/source/media/activemediaplayer-js/#L39" label="ActiveMediaPlayer.js:39" />

This kind of object encapsulates a realized [module:media/MediaContent.MediaContent](/module/media-mediacontent#mediacontent) and provides methods to start,\
stop, pause and record different types of media (audio, video, MIDI, voice recording...)

---

## Constructor

<Signature
  code="new ActiveMediaPlayer(
	mc: module:media/MediaContent.MediaContent,
	mb: module:bags/MediaBag.MediaBag,
	ps: module:JClicPlayer.JClicPlayer,
): ActiveMediaPlayer"
/>

ActiveMediaPlayer constructor

**Parameters**

- `mc` ([module:media/MediaContent.MediaContent](/module/media-mediacontent#mediacontent))
- `mb` ([module:bags/MediaBag.MediaBag](/module/bags-mediabag#mediabag)) — The project's MediaBag
- `ps` ([module:JClicPlayer.JClicPlayer](/module/jclicplayer#jclicplayer)) — An object implementing the\
  [PlayStation](http://projectestac.github.io/jclic/apidoc/edu/xtec/jclic/PlayStation.html) interface,\
  usually a [JClicPlayer](/module/jclicplayer#jclicplayer).

---

## Instance Methods

<MemberHeading id="realize" depth="3" name="realize" sig="realize()" />

<MemberMeta sourceHref="/source/media/activemediaplayer-js/#L74" sourceLabel="ActiveMediaPlayer.js:74" />

Generates the objects that will play media

<MemberHeading id="playnow" depth="3" name="playNow" sig="playNow(_setBx?: module:boxes/ActiveBox.ActiveBox)" />

<MemberMeta sourceHref="/source/media/activemediaplayer-js/#L91" sourceLabel="ActiveMediaPlayer.js:91" />

Plays the media, realizing it if needed.

**Parameters**

- `_setBx` ([module:boxes/ActiveBox.ActiveBox](/module/boxes-activebox#activebox), optional) — The active box where this media will be placed (when video)

<MemberHeading id="play" depth="3" name="play" sig="play(setBx?: module:boxes/ActiveBox.ActiveBox)" />

<MemberMeta sourceHref="/source/media/activemediaplayer-js/#L141" sourceLabel="ActiveMediaPlayer.js:141" />

Plays the media when available, without blocking the current thread.

**Parameters**

- `setBx` ([module:boxes/ActiveBox.ActiveBox](/module/boxes-activebox#activebox), optional) — The active box where this media will be placed (when video)

<MemberHeading id="stop" depth="3" name="stop" sig="stop()" />

<MemberMeta sourceHref="/source/media/activemediaplayer-js/#L149" sourceLabel="ActiveMediaPlayer.js:149" />

Stops the media playing

<MemberHeading id="clear" depth="3" name="clear" sig="clear()" />

<MemberMeta sourceHref="/source/media/activemediaplayer-js/#L159" sourceLabel="ActiveMediaPlayer.js:159" />

Frees all resources used by this player

<MemberHeading id="clearaudiobuffer" depth="3" name="clearAudioBuffer" sig="clearAudioBuffer(buffer: number)" />

<MemberMeta sourceHref="/source/media/activemediaplayer-js/#L169" sourceLabel="ActiveMediaPlayer.js:169" />

Clears the specified audio buffer

**Parameters**

- `buffer` (number) — Index of the buffer in `AUDIO_BUFFERS`

<MemberHeading id="clearallaudiobuffers" depth="3" name="clearAllAudioBuffers" sig="clearAllAudioBuffers()" />

<MemberMeta sourceHref="/source/media/activemediaplayer-js/#L181" sourceLabel="ActiveMediaPlayer.js:181" />

Clears all audio buffers

<MemberHeading id="countactivebuffers" depth="3" name="countActiveBuffers" sig="countActiveBuffers(): number" />

<MemberMeta sourceHref="/source/media/activemediaplayer-js/#L190" sourceLabel="ActiveMediaPlayer.js:190" />

Counts the number of active audio buffers

**Returns**

- `number`

<MemberHeading id="stopallaudiobuffers" depth="3" name="stopAllAudioBuffers" sig="stopAllAudioBuffers()" />

<MemberMeta sourceHref="/source/media/activemediaplayer-js/#L197" sourceLabel="ActiveMediaPlayer.js:197" />

Stops the playing or recording actions of all audio buffers

<MemberHeading id="stopaudiobuffer" depth="3" name="stopAudioBuffer" sig="stopAudioBuffer(buffer: number)" />

<MemberMeta sourceHref="/source/media/activemediaplayer-js/#L206" sourceLabel="ActiveMediaPlayer.js:206" />

Stops a specific audio buffer

**Parameters**

- `buffer` (number) — Index of the buffer in `AUDIO_BUFFERS`

<MemberHeading
  id="checkvisualcomponentbounds"
  depth="3"
  name="checkVisualComponentBounds"
  sig="checkVisualComponentBounds(
	_bxi: module:boxes/ActiveBox.ActiveBox,
)"
/>

<MemberMeta sourceHref="/source/media/activemediaplayer-js/#L217" sourceLabel="ActiveMediaPlayer.js:217" />

Checks the position of visual components after a displacement or resizing of its container

**Parameters**

- `_bxi` ([module:boxes/ActiveBox.ActiveBox](/module/boxes-activebox#activebox)) — The container where this player is hosted

<MemberHeading id="setvisualcomponentvisible" depth="3" name="setVisualComponentVisible" sig="setVisualComponentVisible(_state: boolean)" />

<MemberMeta sourceHref="/source/media/activemediaplayer-js/#L225" sourceLabel="ActiveMediaPlayer.js:225" />

Sets the visual component of this player visible or invisible

**Parameters**

- `_state` (boolean) — `true` for visible

<MemberHeading id="linkto" depth="3" name="linkTo" sig="linkTo(setBx: module:boxes/ActiveBox.ActiveBox)" />

<MemberMeta sourceHref="/source/media/activemediaplayer-js/#L233" sourceLabel="ActiveMediaPlayer.js:233" />

Sets the ActiveBox associated to this media player

**Parameters**

- `setBx` ([module:boxes/ActiveBox.ActiveBox](/module/boxes-activebox#activebox)) — The new container of this media. Can be `null`.

## Instance Fields

<MemberHeading id="mc" depth="3" name="mc" sig="mc: module:media/MediaContent.MediaContent" />

<MemberMeta sourceHref="/source/media/activemediaplayer-js/#L245" sourceLabel="ActiveMediaPlayer.js:245" />

The MediaContent associated to this player.

<MemberHeading id="ps" depth="3" name="ps" sig="ps: module:JClicPlayer.JClicPlayer" />

<MemberMeta sourceHref="/source/media/activemediaplayer-js/#L250" sourceLabel="ActiveMediaPlayer.js:250" />

The player to which this player belongs.

<MemberHeading id="bx" depth="3" name="bx" sig="bx: module:boxes/ActiveBox.ActiveBox" />

<MemberMeta sourceHref="/source/media/activemediaplayer-js/#L255" sourceLabel="ActiveMediaPlayer.js:255" />

MediaPlayers should be linked to [ActiveBox](/module/boxes-activebox#activebox) objects.

<MemberHeading id="visualcomponent" depth="3" name="$visualComponent" sig="$visualComponent: external:jQuery" />

<MemberMeta sourceHref="/source/media/activemediaplayer-js/#L260" sourceLabel="ActiveMediaPlayer.js:260" />

The visual component for videos, usually a `video` HTML element

<MemberHeading id="useaudiobuffer" depth="3" name="useAudioBuffer" sig="useAudioBuffer: boolean" />

<MemberMeta sourceHref="/source/media/activemediaplayer-js/#L265" sourceLabel="ActiveMediaPlayer.js:265" />

When `true`, this player makes use of a recording audio buffer

<MemberHeading id="mbe" depth="3" name="mbe" sig="mbe: module:bags/MediaBagElement.MediaBagElement" />

<MemberMeta sourceHref="/source/media/activemediaplayer-js/#L270" sourceLabel="ActiveMediaPlayer.js:270" />

The `module:bads/MediaBagElement.MediaBagElement` containing the reference to the media to be played

## Static Fields

<MemberHeading id="recenabled" depth="3" name="REC_ENABLED" sig="REC_ENABLED: Boolean" />

<MemberMeta badges="static" sourceHref="/source/media/activemediaplayer-js/#L279" sourceLabel="ActiveMediaPlayer.js:279" />

Recording of audio is enabled only when `navigator.getUserMedia` and `MediaRecorder` are defined\
In 02-Mar-2016 this is implemented only in Firefox 41 and Chrome 49 or later.\
See: [https://addpipe.com/blog/mediarecorder-api](https://addpipe.com/blog/mediarecorder-api)

<MemberHeading id="audiobuffers" depth="3" name="AUDIO_BUFFERS" sig="AUDIO_BUFFERS: Array.<external:AudioBuffer>" />

<MemberMeta badges="static" sourceHref="/source/media/activemediaplayer-js/#L293" sourceLabel="ActiveMediaPlayer.js:293" />

Audio buffers used for recording and playing voice are stored in a static array because\
they are common to all instances of [ActiveMediaPlayer](/module/media-activemediaplayer#activemediaplayer)\
Only initialized when `REC_ENABLED` is `true`.
