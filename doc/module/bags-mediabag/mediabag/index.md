---
title: MediaBag
kind: class
longname: module:bags/MediaBag.MediaBag
description: This class stores and manages all the media components (images, sounds, animations, video, MIDI files, etc.) needed to run the activities of a {@link module:project/JClicProject.JClicProject JClicProject}. The main member of the class is elements . This is where {@link module:bads/MediaBagElement.MediaBagElement} objects are stored.
---

# MediaBag

<SourceLink href="/source/bags/mediabag-js/#L42" label="MediaBag.js:42" />

This class stores and manages all the media components (images, sounds, animations, video,\
MIDI files, etc.) needed to run the activities of a [JClicProject](/module/project-jclicproject#jclicproject). The main member of\
the class is `elements`. This is where `module:bads/MediaBagElement.MediaBagElement` objects are stored.

---

## Constructor

<Signature
  code="new MediaBag(
	project: module:project/JClicProject.JClicProject,
): MediaBag"
/>

MediaBag constructor

**Parameters**

- `project` ([module:project/JClicProject.JClicProject](/module/project-jclicproject#jclicproject)) — The JClic project to which this media bag belongs

---

## Instance Methods

<MemberHeading id="setproperties" depth="3" name="setProperties" sig="setProperties($xml: external:jQuery)" />

<MemberMeta sourceHref="/source/bags/mediabag-js/#L56" sourceLabel="MediaBag.js:56" />

Loads this object settings from a specific JQuery XML element

**Parameters**

- `$xml` ([external:jQuery](/module/utils#jquery)) — The XML element to parse

<MemberHeading id="getattributes" depth="3" name="getAttributes" sig="getAttributes(): object" />

<MemberMeta sourceHref="/source/bags/mediabag-js/#L71" sourceLabel="MediaBag.js:71" />

Gets a object with the basic attributes needed to rebuild this instance excluding functions,\
parent references, constants and also attributes retaining the default value.\
The resulting object is commonly usued to serialize elements in JSON format.

**Returns**

- `object`

<MemberHeading id="setattributes" depth="3" name="setAttributes" sig="setAttributes(data: object)" />

<MemberMeta sourceHref="/source/bags/mediabag-js/#L79" sourceLabel="MediaBag.js:79" />

Loads the MediaBag content from a data object

**Parameters**

- `data` (object) — The data object to parse

<MemberHeading
  id="getelement"
  depth="3"
  name="getElement"
  sig="getElement(
	name: string,
	create?: boolean,
): module:bags/MediaBagElement.MediaBagElement"
/>

<MemberMeta sourceHref="/source/bags/mediabag-js/#L96" sourceLabel="MediaBag.js:96" />

Finds a `module:bads/MediaBagElement.MediaBagElement` by its name, creating a new one if not found and requested.

**Parameters**

- `name` (string) — The name of the element
- `create` (boolean, optional) — When `true`, a new MediaBagElement will be created if not found,\
  using 'name' as its file name.

**Returns**

- [`module:bags/MediaBagElement.MediaBagElement`](/module/bags-mediabagelement#mediabagelement)

<MemberHeading
  id="getelementbyfilename"
  depth="3"
  name="getElementByFileName"
  sig="getElementByFileName(
	file: string,
	create?: boolean,
): module:bags/MediaBagElement.MediaBagElement"
/>

<MemberMeta sourceHref="/source/bags/mediabag-js/#L111" sourceLabel="MediaBag.js:111" />

Gets a `module:bads/MediaBagElement.MediaBagElement` by its file name.

**Parameters**

- `file` (string) — The requested file name
- `create` (boolean, optional) — When `true`, a new `module:bads/MediaBagElement.MediaBagElement` will be created if not\
  found.

**Returns**

- [`module:bags/MediaBagElement.MediaBagElement`](/module/bags-mediabagelement#mediabagelement)

<MemberHeading id="getelementsoftype" depth="3" name="getElementsOfType" sig="getElementsOfType(type: string): Array.<string>" />

<MemberMeta sourceHref="/source/bags/mediabag-js/#L139" sourceLabel="MediaBag.js:139" />

Get the names of the media elements that are of the given type.\
When the search type is `font`, the `fontName` property is used instead of `name`

**Parameters**

- `type` (string) — The type of elements to search

**Returns**

- `Array.<string>`

<MemberHeading
  id="buildall"
  depth="3"
  name="buildAll"
  sig="buildAll(
	type: string,
	callback?: function,
	ps?: module:JClicPlayer.JClicPlayer,
): number"
/>

<MemberMeta sourceHref="/source/bags/mediabag-js/#L159" sourceLabel="MediaBag.js:159" />

Preloads all resources.

**Use with care!** Calling this method will start loading all the resources defined in the\
MediaBag, whether used or not in the current activity.

**Parameters**

- `type` (string) — The type of media to be build. When `null` or `undefined`, all\
  resources will be build.
- `callback` (function, optional) — Function to be called when each element is ready.
- `ps` ([module:JClicPlayer.JClicPlayer](/module/jclicplayer#jclicplayer), optional) — An optional `PlayStation` (currently a [JClicPlayer](/module/jclicplayer#jclicplayer)) used to dynamically load fonts

**Returns**

- `number`

<MemberHeading id="countwaitingelements" depth="3" name="countWaitingElements" sig="countWaitingElements(): number" />

<MemberMeta sourceHref="/source/bags/mediabag-js/#L174" sourceLabel="MediaBag.js:174" />

Checks if there are media waiting to be loaded

**Returns**

- `number`

<MemberHeading id="getskinelement" depth="3" name="getSkinElement" sig="getSkinElement(name: string, ps: string): module:skins/Skin.Skin" />

<MemberMeta sourceHref="/source/bags/mediabag-js/#L197" sourceLabel="MediaBag.js:197" />

Loads a [Skin](/module/skins-skin#skin) object

**Parameters**

- `name` (string) — The skin name to be loaded
- `ps` (string) — The [JClicPlayer](/module/jclicplayer#jclicplayer) linked to the skin

**Returns**

- [`module:skins/Skin.Skin`](/module/skins-skin#skin)

## Instance Fields

<MemberHeading id="elements" depth="3" name="elements" sig="elements: object" />

<MemberMeta sourceHref="/source/bags/mediabag-js/#L207" sourceLabel="MediaBag.js:207" />

The collection of `module:bads/MediaBagElement.MediaBagElement` objects

<MemberHeading id="project" depth="3" name="project" sig="project: module:project/JClicProject.JClicProject" />

<MemberMeta sourceHref="/source/bags/mediabag-js/#L212" sourceLabel="MediaBag.js:212" />

The JClic project to which this MediaBag belongs
