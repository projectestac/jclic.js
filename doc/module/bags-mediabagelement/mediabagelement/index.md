---
title: MediaBagElement
kind: class
longname: module:bags/MediaBagElement.MediaBagElement
description: This kind of objects are the components of {@link module:bags/MediaBag.MediaBag MediaBag}. Media elements have a name, a reference to a file (the file field) and, when initialized, a data field pointing to a object containing the real media. They have also a flag indicating if the data must be saved on the {@link module:project/JClicProject.JClicProject JClicProject} zip file or just maintained as a reference to an external file.
---

# MediaBagElement

<SourceLink href="/source/bags/mediabagelement-js/#L45" label="MediaBagElement.js:45" />

This kind of objects are the components of [MediaBag](/module/bags-mediabag#mediabag).

Media elements have a name, a reference to a file (the `file` field) and, when initialized,\
a `data` field pointing to a object containing the real media. They have also a flag indicating\
if the data must be saved on the [JClicProject](/module/project-jclicproject#jclicproject) zip file or just maintained as a reference\
to an external file.

---

## Constructor

<Signature
  code="new MediaBagElement(
	basePath: string,
	file: string,
	zip?: external:JSZip,
): MediaBagElement"
/>

MediaBagElement constructor

**Parameters**

- `basePath` (string) — Path to be used as a prefix of the file name
- `file` (string) — The media file name
- `zip` ([external:JSZip](/module/utils#jszip), optional) — An optional JSZip object from which the file must be extracted.

---

## Instance Methods

<MemberHeading id="setproperties" depth="3" name="setProperties" sig="setProperties($xml: external:jQuery)" />

<MemberMeta sourceHref="/source/bags/mediabagelement-js/#L110" sourceLabel="MediaBagElement.js:110" />

Loads this object settings from a specific JQuery XML element

**Parameters**

- `$xml` ([external:jQuery](/module/utils#jquery)) — The XML element to parse

<MemberHeading id="getattributes" depth="3" name="getAttributes" sig="getAttributes(): object" />

<MemberMeta sourceHref="/source/bags/mediabagelement-js/#L137" sourceLabel="MediaBagElement.js:137" />

Gets a object with the basic attributes needed to rebuild this instance excluding functions,\
parent references, constants and also attributes retaining the default value.\
The resulting object is commonly usued to serialize elements in JSON format.

**Returns**

- `object`

<MemberHeading id="setattributes" depth="3" name="setAttributes" sig="setAttributes(data: object)" />

<MemberMeta sourceHref="/source/bags/mediabagelement-js/#L145" sourceLabel="MediaBagElement.js:145" />

Loads the element properties from a data object

**Parameters**

- `data` (object) — The data object to parse

<MemberHeading id="checkanimatedgif" depth="3" name="checkAnimatedGif" sig="checkAnimatedGif()" />

<MemberMeta sourceHref="/source/bags/mediabagelement-js/#L172" sourceLabel="MediaBagElement.js:172" />

Checks if the image associated with this MediaBagElement is an animated GIF

Based on: [https://gist.github.com/marckubischta/261ad8427a214022890b](https://gist.github.com/marckubischta/261ad8427a214022890b)\
Thanks to `@lakenen` and `@marckubischta`

<MemberHeading id="isempty" depth="3" name="isEmpty" sig="isEmpty(): boolean" />

<MemberMeta sourceHref="/source/bags/mediabagelement-js/#L228" sourceLabel="MediaBagElement.js:228" />

Checks if the MediaBagElement has been initiated

**Returns**

- `boolean`

<MemberHeading id="getfiletype" depth="3" name="getFileType" sig="getFileType(ext: string): string" />

<MemberMeta sourceHref="/source/bags/mediabagelement-js/#L237" sourceLabel="MediaBagElement.js:237" />

Determines the type of a file from its extension

**Parameters**

- `ext` (string) — The file name extension

**Returns**

- `string`

<MemberHeading
  id="build"
  depth="3"
  name="build"
  sig="build(
	callback: function,
	ps: module:JClicPlayer.JClicPlayer,
	force: boolean,
	level: number,
)"
/>

<MemberMeta sourceHref="/source/bags/mediabagelement-js/#L255" sourceLabel="MediaBagElement.js:255" />

Instantiates the media content

**Parameters**

- `callback` (function) — Callback method called when the referred resource is ready
- `ps` ([module:JClicPlayer.JClicPlayer](/module/jclicplayer#jclicplayer), default: null) — An optional `PlayStation` (currently a [JClicPlayer](/module/jclicplayer#jclicplayer)) used to dynamically load fonts
- `force` (boolean, default: false) — Used only in media of type 'audio'. When `true`, a static `audioPlayer element` will be loaded with this media source
- `level` (number, default: 1) — Priority level of the media content to be built. Used only n audio elements.

<MemberHeading id="checkready" depth="3" name="checkReady" sig="checkReady(): boolean" />

<MemberMeta sourceHref="/source/bags/mediabagelement-js/#L378" sourceLabel="MediaBagElement.js:378" />

Checks if this media element is ready to start

**Returns**

- `boolean`

<MemberHeading id="checktimeout" depth="3" name="checkTimeout" sig="checkTimeout(): boolean" />

<MemberMeta sourceHref="/source/bags/mediabagelement-js/#L400" sourceLabel="MediaBagElement.js:400" />

Checks if this resource has timed out.

**Returns**

- `boolean`

<MemberHeading id="onready" depth="3" name="_onReady" sig="_onReady()" />

<MemberMeta sourceHref="/source/bags/mediabagelement-js/#L410" sourceLabel="MediaBagElement.js:410" />

Notify listeners that the resource is ready

<MemberHeading id="getfullpath" depth="3" name="getFullPath" sig="getFullPath(): string" />

<MemberMeta sourceHref="/source/bags/mediabagelement-js/#L423" sourceLabel="MediaBagElement.js:423" />

Gets the full path of the file associated to this element.\
WARNING: This function should be called only after a successful call to `getFullPathPromise`

**Returns**

- `string`

<MemberHeading id="getfullpathpromise" depth="3" name="getFullPathPromise" sig="getFullPathPromise(): external:Promise" />

<MemberMeta sourceHref="/source/bags/mediabagelement-js/#L431" sourceLabel="MediaBagElement.js:431" />

Gets a promise with the full path of the file associated to this element.

**Returns**

- [`external:Promise`](/module/utils#promise)

## Static Methods

<MemberHeading id="getaudioplayer" depth="3" name="getAudioPlayer" sig="getAudioPlayer(level: number): external:HTMLAudioElement" />

<MemberMeta badges="static" sourceHref="/source/bags/mediabagelement-js/#L83" sourceLabel="MediaBagElement.js:83" />

Gets the static [HTMLAudioElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement)\
associated to the requested priority level.

**Parameters**

- `level` (number, default: 1) — The priority level

**Returns**

- [`external:HTMLAudioElement`](/module/utils#htmlaudioelement)

<MemberHeading id="resetaudioelements" depth="3" name="resetAudioElements" sig="resetAudioElements()" />

<MemberMeta badges="static" sourceHref="/source/bags/mediabagelement-js/#L101" sourceLabel="MediaBagElement.js:101" />

Clear all references to audio players and audio elements\
To be called when a new activity starts

## Instance Fields

<MemberHeading id="name" depth="3" name="name" sig="name: string" />

<MemberMeta sourceHref="/source/bags/mediabagelement-js/#L448" sourceLabel="MediaBagElement.js:448" />

The name of this element. Usually is the same as `file`

<MemberHeading id="file" depth="3" name="file" sig="file: string" />

<MemberMeta sourceHref="/source/bags/mediabagelement-js/#L453" sourceLabel="MediaBagElement.js:453" />

The name of the file where this element is stored

<MemberHeading id="fontname" depth="3" name="fontName" sig="fontName: string" />

<MemberMeta sourceHref="/source/bags/mediabagelement-js/#L458" sourceLabel="MediaBagElement.js:458" />

The font family name, used only in elements of type 'font'

<MemberHeading id="basepath" depth="3" name="basePath" sig="basePath: string" />

<MemberMeta sourceHref="/source/bags/mediabagelement-js/#L463" sourceLabel="MediaBagElement.js:463" />

The path to be used as base to access this media element

<MemberHeading id="zip" depth="3" name="zip" sig="zip: external:JSZip" />

<MemberMeta sourceHref="/source/bags/mediabagelement-js/#L468" sourceLabel="MediaBagElement.js:468" />

An optional JSZip object that can act as a container of this media

<MemberHeading id="data" depth="3" name="data" sig="data: object" />

<MemberMeta sourceHref="/source/bags/mediabagelement-js/#L473" sourceLabel="MediaBagElement.js:473" />

When loaded, this field will store the realized media object

<MemberHeading id="ready" depth="3" name="ready" sig="ready: boolean" />

<MemberMeta sourceHref="/source/bags/mediabagelement-js/#L478" sourceLabel="MediaBagElement.js:478" />

Flag indicating that `data` is ready to be used

<MemberHeading id="ext" depth="3" name="ext" sig="ext: string" />

<MemberMeta sourceHref="/source/bags/mediabagelement-js/#L489" sourceLabel="MediaBagElement.js:489" />

Normalized extension of `file`, useful to guess the media type

<MemberHeading id="type" depth="3" name="type" sig="type: string" />

<MemberMeta sourceHref="/source/bags/mediabagelement-js/#L494" sourceLabel="MediaBagElement.js:494" />

The resource type ('audio', 'image', 'midi', 'video', 'font')

<MemberHeading id="timeout" depth="3" name="timeout" sig="timeout: number" />

<MemberMeta sourceHref="/source/bags/mediabagelement-js/#L499" sourceLabel="MediaBagElement.js:499" />

Time set to load the resource before leaving

<MemberHeading id="animated" depth="3" name="animated" sig="animated: boolean" />

<MemberMeta sourceHref="/source/bags/mediabagelement-js/#L505" sourceLabel="MediaBagElement.js:505" />

Flag used for animated GIFs
