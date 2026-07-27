---
title: media/EventSounds
kind: module
longname: module:media/EventSounds
description: "File : media/EventSounds.js Created : 01/04/2015 By : Francesc Busquets francesc@gmail.com JClic.js An HTML5 player of JClic activities https://projectestac.github.io/jclic.js"
---

# media/EventSounds

<SourceLink href="/source/media/eventsounds-js/#L32" label="EventSounds.js:32" />

File : media/EventSounds.js\
Created : 01/04/2015\
By : Francesc Busquets [francesc@gmail.com](mailto:francesc@gmail.com)

JClic.js\
An HTML5 player of JClic activities\
https\://projectestac.github.io/jclic.js

- **License:** EUPL-1.2

---

## Other

<MemberHeading id="eventsounds" depth="3" name="EventSounds" sig="EventSounds" />

<MemberMeta badges="static" sourceHref="/source/media/eventsounds-js/#L55" sourceLabel="EventSounds.js:55" />

The EventSounds objects contains specific sounds to be played when JClic events are fired:

- start
- click
- actionError
- actionOk
- finishedError
- finishedOk

The sounds are stored in an array of [EventSoundsElement](/module/media-eventsoundselement) objects.

**Parameters**

- `parent` ([module:media/EventSounds.EventSounds](/module/media-eventsounds#eventsounds), optional) — Another EventSounds object that will act as a parent of this one,\
  used to resolve which sound must be played for events when not defined here.
