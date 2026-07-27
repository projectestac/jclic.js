---
title: JClicProject
kind: class
longname: module:project/JClicProject.JClicProject
description: "JClicProject contains all the components of a JClic project: activities, sequences, media files, descriptors and metadata. This encapsulation is achieved by three auxiliary objects: {@link module:project/ProjectSettings.ProjectSettings ProjectSettings}: stores metadata like full title, description, authors, languages, educational topics... {@link module:bags/ActivitySequence.ActivitySequence ActivitySequence}: defines the order in which the activities must be shown. {@link module:bags/MediaBag.MediaBag MediaBag}: contains the list of all media files used by the activities"
---

# JClicProject

<SourceLink href="/source/project/jclicproject-js/#L50" label="JClicProject.js:50" />

JClicProject contains all the components of a JClic project: activities, sequences, media\
files, descriptors and metadata.

This encapsulation is achieved by three auxiliary objects:

- [ProjectSettings](/module/project-projectsettings#projectsettings): stores metadata like full title, description, authors, languages,\
  educational topics...
- [ActivitySequence](/module/bags-activitysequence#activitysequence): defines the order in which the activities must be shown.
- [MediaBag](/module/bags-mediabag#mediabag): contains the list of all media files used by the activities

---

## Constructor

<Signature code="new JClicProject(): JClicProject" />

JClicProject constructor

---

## Instance Methods

<MemberHeading
  id="setproperties"
  depth="3"
  name="setProperties"
  sig="setProperties(
	$xml: external:jQuery,
	path: string,
	zip?: external:JSZip,
	options?: object,
): module:project/JClicProject.JClicProject"
/>

<MemberMeta sourceHref="/source/project/jclicproject-js/#L69" sourceLabel="JClicProject.js:69" />

Loads the project settings from a main jQuery XML element

**Parameters**

- `$xml` ([external:jQuery](/module/utils#jquery)) — The XML element
- `path` (string) — The full path of this project
- `zip` ([external:JSZip](/module/utils#jszip), optional) — An optional JSZip object where this project is encapsulated
- `options` (object, optional) — An object with miscellaneous options

**Returns**

- [`module:project/JClicProject.JClicProject`](/module/project-jclicproject#jclicproject)

<MemberHeading id="getattributes" depth="3" name="getAttributes" sig="getAttributes(): object" />

<MemberMeta sourceHref="/source/project/jclicproject-js/#L112" sourceLabel="JClicProject.js:112" />

Gets a object with the basic attributes needed to rebuild this instance excluding functions,\
parent references, constants and also attributes retaining the default value.\
The resulting object is commonly usued to serialize elements in JSON format.

**Returns**

- `object`

<MemberHeading id="getjson" depth="3" name="getJSON" sig="getJSON(space?: number): string" />

<MemberMeta sourceHref="/source/project/jclicproject-js/#L129" sourceLabel="JClicProject.js:129" />

Gets a JSON string representing the content of this project. This string can be transformed later into a data\
object suitable for `setAttributes`.

**Parameters**

- `space` (number, optional, default: 0) — The number of white spaces to place between items. Defaults to zero (meaning all the JSON rendered in one single line)

**Returns**

- `string`

<MemberHeading
  id="setattributes"
  depth="3"
  name="setAttributes"
  sig="setAttributes(
	data: object,
	path: string,
	zip?: external:JSZip,
	options?: object,
): module:project/JClicProject.JClicProject"
/>

<MemberMeta sourceHref="/source/project/jclicproject-js/#L145" sourceLabel="JClicProject.js:145" />

Loads the project settings from a data object

**Parameters**

- `data` (object) — The data object
- `path` (string) — The full path of this project
- `zip` ([external:JSZip](/module/utils#jszip), optional) — An optional JSZip object where this project is encapsulated
- `options` (object, optional) — An object with miscellaneous options

**Returns**

- [`module:project/JClicProject.JClicProject`](/module/project-jclicproject#jclicproject)

<MemberHeading id="getactivity" depth="3" name="getActivity" sig="getActivity(name: string): module:Activity.Activity" />

<MemberMeta sourceHref="/source/project/jclicproject-js/#L182" sourceLabel="JClicProject.js:182" />

Finds activities by name and builds the corresponding [Activity](/module/activity#activity) object.

**Parameters**

- `name` (string) — The name of the requested activity

**Returns**

- [`module:Activity.Activity`](/module/activity#activity)

<MemberHeading id="realize" depth="3" name="realize" sig="realize(ps: module:JClicPlayer.JClicPlayer)" />

<MemberMeta sourceHref="/source/project/jclicproject-js/#L191" sourceLabel="JClicProject.js:191" />

Builds the [Skin](/module/skins-skin#skin), [EventSounds](/module/media-eventsounds#eventsounds) and [MediaBag](/module/bags-mediabag#mediabag) fonts associated to this project.

**Parameters**

- `ps` ([module:JClicPlayer.JClicPlayer](/module/jclicplayer#jclicplayer)) — The PlayStation (usually a [JClicPlayer](/module/jclicplayer#jclicplayer)) linked to this project.

<MemberHeading id="end" depth="3" name="end" sig="end()" />

<MemberMeta sourceHref="/source/project/jclicproject-js/#L205" sourceLabel="JClicProject.js:205" />

Run finalizers on realized objects

## Instance Fields

<MemberHeading id="name" depth="3" name="name" sig="name: string" />

<MemberMeta sourceHref="/source/project/jclicproject-js/#L215" sourceLabel="JClicProject.js:215" />

The project's name

<MemberHeading id="version" depth="3" name="version" sig="version: string" />

<MemberMeta sourceHref="/source/project/jclicproject-js/#L220" sourceLabel="JClicProject.js:220" />

The version of the XML file format used to save the project (currently 0.1.3)

<MemberHeading id="type" depth="3" name="type" sig="type: string" />

<MemberMeta sourceHref="/source/project/jclicproject-js/#L225" sourceLabel="JClicProject.js:225" />

Optional property that can be used by reporting systems

<MemberHeading id="code" depth="3" name="code" sig="code: string" />

<MemberMeta sourceHref="/source/project/jclicproject-js/#L230" sourceLabel="JClicProject.js:230" />

Optional property that can be used by reporting systems

<MemberHeading id="settings" depth="3" name="settings" sig="settings: module:project/ProjectSettings.ProjectSettings" />

<MemberMeta sourceHref="/source/project/jclicproject-js/#L235" sourceLabel="JClicProject.js:235" />

Object containing the project settings

<MemberHeading id="activitysequence" depth="3" name="activitySequence" sig="activitySequence: module:bags/ActivitySequence.ActivitySequence" />

<MemberMeta sourceHref="/source/project/jclicproject-js/#L240" sourceLabel="JClicProject.js:240" />

Object containing the order in which the activities should be played

<MemberHeading id="reportableacts" depth="3" name="reportableActs" sig="reportableActs: number" />

<MemberMeta sourceHref="/source/project/jclicproject-js/#L253" sourceLabel="JClicProject.js:253" />

Number of activities suitable to be included reports

<MemberHeading id="mediabag" depth="3" name="mediaBag" sig="mediaBag: module:bags/MediaBag.MediaBag" />

<MemberMeta sourceHref="/source/project/jclicproject-js/#L258" sourceLabel="JClicProject.js:258" />

The collection of all media elements used in this project

<MemberHeading id="skin" depth="3" name="skin" sig="skin: module:skins/Skin.Skin" />

<MemberMeta sourceHref="/source/project/jclicproject-js/#L263" sourceLabel="JClicProject.js:263" />

The object that builds and manages the visual interface presented to users

<MemberHeading id="basepath" depth="3" name="basePath" sig="basePath: string" />

<MemberMeta sourceHref="/source/project/jclicproject-js/#L269" sourceLabel="JClicProject.js:269" />

Relative path or absolute URL to be used as a base to access files, usually in conjunction\
with [module:JClicPlayer.JClicPlayer#basePath](/module/jclicplayer/jclicplayer#basepath)

<MemberHeading id="path" depth="3" name="path" sig="path: string" />

<MemberMeta sourceHref="/source/project/jclicproject-js/#L274" sourceLabel="JClicProject.js:274" />

Full path of this project

<MemberHeading id="zip" depth="3" name="zip" sig="zip: external:JSZip" />

<MemberMeta sourceHref="/source/project/jclicproject-js/#L279" sourceLabel="JClicProject.js:279" />

The JSZip object where this project is stored (can be `null`)
