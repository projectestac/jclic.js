---
title: activities/panels/InformationScreen
kind: module
longname: module:activities/panels/InformationScreen
description: "File : activities/panels/InformationScreen.js Created : 19/05/2015 By : Francesc Busquets francesc@gmail.com JClic.js An HTML5 player of JClic activities https://projectestac.github.io/jclic.js"
---

# activities/panels/InformationScreen

<SourceLink href="/source/activities/panels/informationscreen-js/#L32" label="InformationScreen.js:32" />

File : activities/panels/InformationScreen.js\
Created : 19/05/2015\
By : Francesc Busquets [francesc@gmail.com](mailto:francesc@gmail.com)

JClic.js\
An HTML5 player of JClic activities\
https\://projectestac.github.io/jclic.js

- **License:** EUPL-1.2

---

## Other

<MemberHeading id="informationscreen" depth="3" name="InformationScreen" sig="InformationScreen" />

<MemberMeta badges="static" sourceHref="/source/activities/panels/informationscreen-js/#L45" sourceLabel="InformationScreen.js:45" />

**Extends:&#x20;**`module:Activity.Activity`

This class of [Activity](/module/activity#activity) just shows a panel with [ActiveBox](/module/boxes-activebox#activebox) objects.\
Because active boxes can act as a links to specific points in the project's sequence of\
activities, this kind of activity is often used as a menu where users can choose from different\
options.

**Parameters**

- `project` ([module:project/JClicProject.JClicProject](/module/project-jclicproject#jclicproject)) — The [JClicProject](/module/project-jclicproject#jclicproject) to which this activity belongs

<MemberHeading id="informationscreenpanel" depth="3" name="InformationScreenPanel" sig="InformationScreenPanel" />

<MemberMeta badges="static" sourceHref="/source/activities/panels/informationscreen-js/#L62" sourceLabel="InformationScreen.js:62" />

**Extends:&#x20;**`module:Activity.ActivityPanel`

The [ActivityPanel](/module/activity#activitypanel) where [InformationScreen](/module/activities-panels-informationscreen#informationscreen) activities should display its content

**Parameters**

- `act` ([module:Activity.Activity](/module/activity#activity)) — The [Activity](/module/activity#activity) to which this Panel belongs
- `ps` ([module:JClicPlayer.JClicPlayer](/module/jclicplayer#jclicplayer)) — Any object implementing the methods defined in the\
  [PlayStation](http://projectestac.github.io/jclic/apidoc/edu/xtec/jclic/PlayStation.html) Java interface.
- `$div` ([external:jQuery](/module/utils#jquery), optional) — The jQuery DOM element where this Panel will deploy
