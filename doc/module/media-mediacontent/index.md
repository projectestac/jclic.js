---
title: media/MediaContent
kind: module
longname: module:media/MediaContent
description: "File : media/MediaContent.js Created : 13/04/2015 By : Francesc Busquets francesc@gmail.com JClic.js An HTML5 player of JClic activities https://projectestac.github.io/jclic.js"
---

# media/MediaContent

<SourceLink href="/source/media/mediacontent-js/#L32" label="MediaContent.js:32" />

File : media/MediaContent.js\
Created : 13/04/2015\
By : Francesc Busquets [francesc@gmail.com](mailto:francesc@gmail.com)

JClic.js\
An HTML5 player of JClic activities\
https\://projectestac.github.io/jclic.js

- **License:** EUPL-1.2

---

## Other

<MemberHeading id="mediacontent" depth="3" name="MediaContent" sig="MediaContent" />

<MemberMeta badges="static" sourceHref="/source/media/mediacontent-js/#L48" sourceLabel="MediaContent.js:48" />

This object contains a description of any multimedia content (sound, video, MIDI, voice\
recording..) or special actions (jump to another point in the sequence, link to an URL, etc.)\
associated to an [ActiveBox](/module/boxes-activebox#activebox) object.

**Parameters**

- `type` (string) — The type of media. Valid values are: `UNKNOWN`, `PLAY_AUDIO`, `PLAY_VIDEO`,\
  `PLAY_MIDI`, `PLAY_CDAUDIO`, `RECORD_AUDIO`, `PLAY_RECORDED_AUDIO`, `RUN_CLIC_ACTIVITY`,\
  `RUN_CLIC_PACKAGE`, `RUN_EXTERNAL`, `URL`, `EXIT` and `RETURN`
- `file` (string, optional) — Optional parameter indicating the media file name

<MemberHeading id="icons" depth="3" name="ICONS" sig="ICONS: object" />

<MemberMeta sourceHref="/source/media/mediacontent-js/#L304" sourceLabel="MediaContent.js:304" />

Default icons for media types.
