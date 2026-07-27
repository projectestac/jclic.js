---
title: bags/MediaBagElement
kind: module
longname: module:bags/MediaBagElement
description: "File : bags/MediaBagElement.js Created : 07/04/2015 By : Francesc Busquets francesc@gmail.com JClic.js An HTML5 player of JClic activities https://projectestac.github.io/jclic.js"
---

# bags/MediaBagElement

<SourceLink href="/source/bags/mediabagelement-js/#L32" label="MediaBagElement.js:32" />

File : bags/MediaBagElement.js\
Created : 07/04/2015\
By : Francesc Busquets [francesc@gmail.com](mailto:francesc@gmail.com)

JClic.js\
An HTML5 player of JClic activities\
https\://projectestac.github.io/jclic.js

- **License:** EUPL-1.2

---

## Instance Fields

<MemberHeading id="audioplayers" depth="3" name="_audioPlayers" sig="_audioPlayers: Array.<external:HTMLAudioElement>" />

<MemberMeta sourceHref="/source/bags/mediabagelement-js/#L75" sourceLabel="MediaBagElement.js:75" />

Private static array of [HTMLAudioElements](https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement),\
to be reused between all media elements of type 'audio'. One for each priority level

<MemberHeading id="currentaudioelements" depth="3" name="_currentAudioElements" sig="_currentAudioElements: Array.<bags/MediaBagElement>" />

<MemberMeta sourceHref="/source/bags/mediabagelement-js/#L95" sourceLabel="MediaBagElement.js:95" />

Private static array of [MediaBagElements](/module/bags-mediabagelement),\
used to store a reference to the element using each `audioPlayer`

## Other

<MemberHeading id="mediabagelement" depth="3" name="MediaBagElement" sig="MediaBagElement" />

<MemberMeta badges="static" sourceHref="/source/bags/mediabagelement-js/#L45" sourceLabel="MediaBagElement.js:45" />

This kind of objects are the components of [MediaBag](/module/bags-mediabag#mediabag).

Media elements have a name, a reference to a file (the `file` field) and, when initialized,\
a `data` field pointing to a object containing the real media. They have also a flag indicating\
if the data must be saved on the [JClicProject](/module/project-jclicproject#jclicproject) zip file or just maintained as a reference\
to an external file.

**Parameters**

- `basePath` (string) — Path to be used as a prefix of the file name
- `file` (string) — The media file name
- `zip` ([external:JSZip](/module/utils#jszip), optional) — An optional JSZip object from which the file must be extracted.
