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

<MemberMeta sourceHref="/source/project/projectsettings-js/#L70" sourceLabel="ProjectSettings.js:70" />

Reads the ProjectSettings values from a JQuery XML element

**Parameters**

- `$xml` ([external:jQuery](/module/utils#jquery)) — The XML element to parse

<MemberHeading id="getattributes" depth="3" name="getAttributes" sig="getAttributes(): object" />

<MemberMeta sourceHref="/source/project/projectsettings-js/#L171" sourceLabel="ProjectSettings.js:171" />

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

<MemberMeta sourceHref="/source/project/projectsettings-js/#L187" sourceLabel="ProjectSettings.js:187" />

Reads the properties of this ProjectSettings from a data object

**Parameters**

- `data` (object) — The data object to be parsed, or just the text content

**Returns**

- [`module:project/ProjectSettings.ProjectSettings`](/module/project-projectsettings#projectsettings)

## Instance Fields

<MemberHeading id="project" depth="3" name="project" sig="project: module:project/JClicProject.JClicProject" />

<MemberMeta sourceHref="/source/project/projectsettings-js/#L213" sourceLabel="ProjectSettings.js:213" />

The JClicProject to which this ProjectSettings belongs

<MemberHeading id="title" depth="3" name="title" sig="title: string" />

<MemberMeta sourceHref="/source/project/projectsettings-js/#L218" sourceLabel="ProjectSettings.js:218" />

The project title

<MemberHeading id="authors" depth="3" name="authors" sig="authors: Array.<object>" />

<MemberMeta sourceHref="/source/project/projectsettings-js/#L225" sourceLabel="ProjectSettings.js:225" />

The authors of this project.\
Each author is represented by an object with the following attributes:\
`name` (mandatory), `mail`, `rol`, `organization` and `url`

<MemberHeading id="organizations" depth="3" name="organizations" sig="organizations: Array.<object>" />

<MemberMeta sourceHref="/source/project/projectsettings-js/#L232" sourceLabel="ProjectSettings.js:232" />

Schools, companies and other institutions involved on this project.\
Each organization is represented by an object with the following attributes:\
`name` (mandatory), `mail`, `url`, `address`, `pc`, `city`, `state`, `country`, `comments`

<MemberHeading id="revisions" depth="3" name="revisions" sig="revisions: Array.<object>" />

<MemberMeta sourceHref="/source/project/projectsettings-js/#L239" sourceLabel="ProjectSettings.js:239" />

The history of revisions made to this project.\
Revisions are represented by objects with the following attributes:\
`date` (mandatory), `description`, `comments` and `author`

<MemberHeading id="description" depth="3" name="description" sig="description: object" />

<MemberMeta sourceHref="/source/project/projectsettings-js/#L244" sourceLabel="ProjectSettings.js:244" />

Project's description, maybe in multiple languages.

<MemberHeading id="languages" depth="3" name="languages" sig="languages: Array.<string>" />

<MemberMeta sourceHref="/source/project/projectsettings-js/#L249" sourceLabel="ProjectSettings.js:249" />

JClic projects can use more than one language, so use a string array

<MemberHeading id="locales" depth="3" name="locales" sig="locales: Array.<string>" />

<MemberMeta sourceHref="/source/project/projectsettings-js/#L262" sourceLabel="ProjectSettings.js:262" />

Array of canonical locales, as defined in\
[Intl](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#Locale_identification_and_negotiation)

<MemberHeading id="skinfilename" depth="3" name="skinFileName" sig="skinFileName: string" />

<MemberMeta sourceHref="/source/project/projectsettings-js/#L267" sourceLabel="ProjectSettings.js:267" />

The name of an optional 'skin' (visual aspect) can be set for the whole project, or for each [Activity](/module/activity#activity)

<MemberHeading id="eventsounds" depth="3" name="eventSounds" sig="eventSounds: module:media/EventSounds.EventSounds" />

<MemberMeta sourceHref="/source/project/projectsettings-js/#L272" sourceLabel="ProjectSettings.js:272" />

The main [EventSounds](/module/media-eventsounds#eventsounds) object of the project
