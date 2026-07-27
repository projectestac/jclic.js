---
title: activities/panels/Identify
kind: module
longname: module:activities/panels/Identify
description: "File : activities/panels/Identify.js Created : 03/06/2015 By : Francesc Busquets francesc@gmail.com JClic.js An HTML5 player of JClic activities https://projectestac.github.io/jclic.js"
---

# activities/panels/Identify

<SourceLink href="/source/activities/panels/identify-js/#L32" label="Identify.js:32" />

File : activities/panels/Identify.js\
Created : 03/06/2015\
By : Francesc Busquets [francesc@gmail.com](mailto:francesc@gmail.com)

JClic.js\
An HTML5 player of JClic activities\
https\://projectestac.github.io/jclic.js

- **License:** EUPL-1.2

---

## Other

<MemberHeading id="identify" depth="3" name="Identify" sig="Identify" />

<MemberMeta badges="static" sourceHref="/source/activities/panels/identify-js/#L43" sourceLabel="Identify.js:43" />

**Extends:&#x20;**`module:Activity.Activity`

The aim of this type of [Activity](/module/activity#activity) is to identify [ActiveBox](/module/boxes-activebox#activebox) elements in a panel\
that satisfy a specific condition, usually exposed in the main message.

**Parameters**

- `project` ([module:project/JClicProject.JClicProject](/module/project-jclicproject#jclicproject)) — The [JClicProject](/module/project-jclicproject#jclicproject) to which this activity belongs

<MemberHeading id="identifypanel" depth="3" name="IdentifyPanel" sig="IdentifyPanel" />

<MemberMeta badges="static" sourceHref="/source/activities/panels/identify-js/#L89" sourceLabel="Identify.js:89" />

**Extends:&#x20;**`module:Activity.ActivityPanel`

The [ActivityPanel](/module/activity#activitypanel) where [Identify](/module/activities-panels-identify#identify) activities are played.

**Parameters**

- `act` ([module:Activity.Activity](/module/activity#activity)) — The [Activity](/module/activity#activity) to which this Panel belongs
- `ps` ([module:JClicPlayer.JClicPlayer](/module/jclicplayer#jclicplayer)) — Any object implementing the methods defined in the\
  [PlayStation](http://projectestac.github.io/jclic/apidoc/edu/xtec/jclic/PlayStation.html) Java interface.
- `$div` ([external:jQuery](/module/utils#jquery), optional) — The jQuery DOM element where this Panel will deploy
