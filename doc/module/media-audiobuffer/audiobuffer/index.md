---
title: AudioBuffer
kind: class
longname: module:media/AudioBuffer.AudioBuffer
description: The AudioBuffer object provides sound recording and replaying to activities.
---

# AudioBuffer

<SourceLink href="/source/media/audiobuffer-js/#L37" label="AudioBuffer.js:37" />

The AudioBuffer object provides sound recording and replaying to activities.

---

## Constructor

<Signature code="new AudioBuffer(seconds?: number): AudioBuffer" />

AudioBuffer constructor

**Parameters**

- `seconds` (number, optional) — The maximum amount of time allowed to be recorded by this AudioBuffer

---

## Instance Methods

<MemberHeading id="play" depth="3" name="play" sig="play()" />

<MemberMeta sourceHref="/source/media/audiobuffer-js/#L53" sourceLabel="AudioBuffer.js:53" />

Starts playing the currently recorded audio, if any.

<MemberHeading id="stop" depth="3" name="stop" sig="stop()" />

<MemberMeta sourceHref="/source/media/audiobuffer-js/#L66" sourceLabel="AudioBuffer.js:66" />

Stops the current operation, either recording or playing audio

<MemberHeading id="record" depth="3" name="record" sig="record($div?: external:jQuery)" />

<MemberMeta sourceHref="/source/media/audiobuffer-js/#L77" sourceLabel="AudioBuffer.js:77" />

Starts recording audio, or stops the recording if already started.

**Parameters**

- `$div` ([external:jQuery](/module/utils#jquery), optional) — Optional `div` element where the recording is performed, as a jQuery ref.

<MemberHeading id="visualfeedbak" depth="3" name="visualFeedbak" sig="visualFeedbak(enabled: boolean, $div?: external:jQuery)" />

<MemberMeta sourceHref="/source/media/audiobuffer-js/#L150" sourceLabel="AudioBuffer.js:150" />

Set visual feedback to the user while the system is recording audio\
Currently changes the cursor pointer associated to the HTML element\
containing the recorder.

**Parameters**

- `enabled` (boolean) — Flag indicating if the visual feedback should be active or inactive
- `$div` ([external:jQuery](/module/utils#jquery), optional) — Optional `div` element where the recording is performed, as a jQuery ref.

<MemberHeading id="clear" depth="3" name="clear" sig="clear()" />

<MemberMeta sourceHref="/source/media/audiobuffer-js/#L158" sourceLabel="AudioBuffer.js:158" />

Clears all data associated to this AudioBuffer

## Instance Fields

<MemberHeading id="enabled" depth="3" name="enabled" sig="enabled: boolean" />

<MemberMeta sourceHref="/source/media/audiobuffer-js/#L170" sourceLabel="AudioBuffer.js:170" />

AudioBuffer is enabled only in browsers with `navigator.MediaDevices.getuserMedia`

<MemberHeading id="seconds" depth="3" name="seconds" sig="seconds: number" />

<MemberMeta sourceHref="/source/media/audiobuffer-js/#L176" sourceLabel="AudioBuffer.js:176" />

Maximum length of recordings allowed to this AudioBuffer (in seconds)

<MemberHeading id="mediarecorder" depth="3" name="mediaRecorder" sig="mediaRecorder: external:MediaRecorder" />

<MemberMeta sourceHref="/source/media/audiobuffer-js/#L182" sourceLabel="AudioBuffer.js:182" />

The object used to record audio data and convert it to a valid stream for the [ActiveMediaPlayer](/module/media-activemediaplayer#activemediaplayer)

<MemberHeading id="chunks" depth="3" name="chunks" sig="chunks: Array.<external:Blob>" />

<MemberMeta sourceHref="/source/media/audiobuffer-js/#L188" sourceLabel="AudioBuffer.js:188" />

Array of data chunks collected during the recording

<MemberHeading id="mediaplayer" depth="3" name="mediaPlayer" sig="mediaPlayer: external:HTMLAudioElement" />

<MemberMeta sourceHref="/source/media/audiobuffer-js/#L194" sourceLabel="AudioBuffer.js:194" />

The HTML audio element used to play the recorded sound

<MemberHeading id="timeoutid" depth="3" name="timeoutID" sig="timeoutID: number" />

<MemberMeta sourceHref="/source/media/audiobuffer-js/#L201" sourceLabel="AudioBuffer.js:201" />

The identifier of the timer launched to stop the recording when the maximum time is exceeded.\
This member is `null` when no timeout function is associated to this AudioBuffer

<MemberHeading id="playwhenfinished" depth="3" name="playWhenFinished" sig="playWhenFinished: boolean" />

<MemberMeta sourceHref="/source/media/audiobuffer-js/#L208" sourceLabel="AudioBuffer.js:208" />

Instructs this AudioBuffer recorder to start playing the collected audio at the end of the\
current `mediaRecorder` task.

## Static Fields

<MemberHeading id="maxrecordlength" depth="3" name="MAX_RECORD_LENGTH" sig="MAX_RECORD_LENGTH: number" />

<MemberMeta badges="static" sourceHref="/source/media/audiobuffer-js/#L215" sourceLabel="AudioBuffer.js:215" />

Maximum amount of time allowed for recordings (in seconds)
