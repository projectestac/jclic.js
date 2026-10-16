---
title: ProjectSettings
kind: class
longname: module:project/ProjectSettings.ProjectSettings
description: "This class contains miscellaneous settings of JClic projects. In addition to the members of this class, there can be other properties in JClic project files that are not currently loaded: iconFileName descriptors area level locale authors organizations revisions"
---

# ProjectSettings

<SourceLink href="/source/project/projectsettings-js/#L50" label="ProjectSettings.js:50" />

This class contains miscellaneous settings of JClic projects.

In addition to the members of this class, there can be other properties in JClic project files\
that are not currently loaded:

- iconFileName
- descriptors
- area
- level
- locale
- authors
- organizations
- revisions

---

## Constructor

<Signature
  code="new ProjectSettings(
	project: module:project/JClicProject.JClicProject,
): ProjectSettings"
/>

ProjectSettings constructor

**Parameters**

- `project` ([module:project/JClicProject.JClicProject](/module/project-jclicproject#jclicproject)) — The project to which this settings belongs

---

## Instance Methods

<MemberHeading id="setproperties" depth="3" name="setProperties" sig="setProperties($xml: external:jQuery)" />

<MemberMeta sourceHref="/source/project/projectsettings-js/#L71" sourceLabel="ProjectSettings.js:71" />

Reads the ProjectSettings values from a JQuery XML element

**Parameters**

- `$xml` ([external:jQuery](/module/utils#jquery)) — The XML element to parse

<MemberHeading id="getattributes" depth="3" name="getAttributes" sig="getAttributes(): object" />

<MemberMeta sourceHref="/source/project/projectsettings-js/#L185" sourceLabel="ProjectSettings.js:185" />

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
): module:project/ProjectSettings.ProjectSettings"
/>

<MemberMeta sourceHref="/source/project/projectsettings-js/#L202" sourceLabel="ProjectSettings.js:202" />

Reads the properties of this ProjectSettings from a data object

**Parameters**

- `data` (object) — The data object to be parsed, or just the text content

**Returns**

- [`module:project/ProjectSettings.ProjectSettings`](/module/project-projectsettings#projectsettings)

## Instance Fields

<MemberHeading id="project" depth="3" name="project" sig="project: module:project/JClicProject.JClicProject" />

<MemberMeta sourceHref="/source/project/projectsettings-js/#L235" sourceLabel="ProjectSettings.js:235" />

The JClicProject to which this ProjectSettings belongs

<MemberHeading id="title" depth="3" name="title" sig="title: string" />

<MemberMeta sourceHref="/source/project/projectsettings-js/#L240" sourceLabel="ProjectSettings.js:240" />

The project title

<MemberHeading id="authors" depth="3" name="authors" sig="authors: Array.<object>" />

<MemberMeta sourceHref="/source/project/projectsettings-js/#L247" sourceLabel="ProjectSettings.js:247" />

The authors of this project.\
Each author is represented by an object with the following attributes:\
`name` (mandatory), `mail`, `rol`, `organization` and `url`

<MemberHeading id="organizations" depth="3" name="organizations" sig="organizations: Array.<object>" />

<MemberMeta sourceHref="/source/project/projectsettings-js/#L254" sourceLabel="ProjectSettings.js:254" />

Schools, companies and other institutions involved on this project.\
Each organization is represented by an object with the following attributes:\
`name` (mandatory), `mail`, `url`, `address`, `pc`, `city`, `state`, `country`, `comments`

<MemberHeading id="revisions" depth="3" name="revisions" sig="revisions: Array.<object>" />

<MemberMeta sourceHref="/source/project/projectsettings-js/#L261" sourceLabel="ProjectSettings.js:261" />

The history of revisions made to this project.\
Revisions are represented by objects with the following attributes:\
`date` (mandatory), `description`, `comments` and `author`

<MemberHeading id="description" depth="3" name="description" sig="description: object" />

<MemberMeta sourceHref="/source/project/projectsettings-js/#L266" sourceLabel="ProjectSettings.js:266" />

Project's description, maybe in multiple languages.

<MemberHeading id="languages" depth="3" name="languages" sig="languages: Array.<string>" />

<MemberMeta sourceHref="/source/project/projectsettings-js/#L271" sourceLabel="ProjectSettings.js:271" />

JClic projects can use more than one language, so use a string array

<MemberHeading id="locales" depth="3" name="locales" sig="locales: Array.<string>" />

<MemberMeta sourceHref="/source/project/projectsettings-js/#L284" sourceLabel="ProjectSettings.js:284" />

Array of canonical locales, as defined in\
[Intl](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#Locale_identification_and_negotiation)

<MemberHeading id="skinfilename" depth="3" name="skinFileName" sig="skinFileName: string" />

<MemberMeta sourceHref="/source/project/projectsettings-js/#L289" sourceLabel="ProjectSettings.js:289" />

The name of an optional 'skin' (visual aspect) can be set for the whole project, or for each [Activity](/module/activity#activity)

<MemberHeading id="eventsoundsplayer" depth="3" name="eventSoundsPlayer" sig="eventSoundsPlayer: module:media/EventSounds.EventSounds" />

<MemberMeta sourceHref="/source/project/projectsettings-js/#L294" sourceLabel="ProjectSettings.js:294" />

The main [EventSounds](/module/media-eventsounds#eventsounds) object of the project

<MemberHeading id="eventsounds" depth="3" name="eventSounds" sig="eventSounds: object" />

<MemberMeta sourceHref="/source/project/projectsettings-js/#L299" sourceLabel="ProjectSettings.js:299" />

Data used to recreate the main [EventSounds](/module/media-eventsounds#eventsounds) object of the project
