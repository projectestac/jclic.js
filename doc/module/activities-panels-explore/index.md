---
title: activities/panels/Explore
kind: module
longname: module:activities/panels/Explore
description: "File : activities/panels/Explore.js Created : 04/06/2015 By : Francesc Busquets francesc@gmail.com JClic.js An HTML5 player of JClic activities https://projectestac.github.io/jclic.js"
---

# activities/panels/Explore

<SourceLink href="/source/activities/panels/explore-js/#L32" label="Explore.js:32" />

File : activities/panels/Explore.js\
Created : 04/06/2015\
By : Francesc Busquets [francesc@gmail.com](mailto:francesc@gmail.com)

JClic.js\
An HTML5 player of JClic activities\
https\://projectestac.github.io/jclic.js

- **License:** EUPL-1.2

---

## Other

<MemberHeading id="explore" depth="3" name="Explore" sig="Explore" />

<MemberMeta badges="static" sourceHref="/source/activities/panels/explore-js/#L45" sourceLabel="Explore.js:45" />

**Extends:&#x20;**`module:Activity.Activity`

This class of [Activity](/module/activity#activity) shows a panel with [ActiveBox](/module/boxes-activebox#activebox) objects. Users can click\
on this objects to obtain associated information. This associated information, displayed in\
a second panel, can be text graphics, sound, video... or a combination of them.

**Parameters**

- `project` ([module:project/JClicProject.JClicProject](/module/project-jclicproject#jclicproject)) — The [JClicProject](/module/project-jclicproject#jclicproject) to which this activity belongs

<MemberHeading id="explorepanel" depth="3" name="ExplorePanel" sig="ExplorePanel" />

<MemberMeta badges="static" sourceHref="/source/activities/panels/explore-js/#L87" sourceLabel="Explore.js:87" />

**Extends:&#x20;**`module:Activity.ActivityPanel`

The [ActivityPanel](/module/activity#activitypanel) where [Explore](/module/activities-panels-explore#explore) activities are played.

**Parameters**

- `act` ([module:Activity.Activity](/module/activity#activity)) — The [Activity](/module/activity#activity) to which this Panel belongs
- `ps` ([module:JClicPlayer.JClicPlayer](/module/jclicplayer#jclicplayer)) — Any object implementing the methods defined in the\
  [PlayStation](http://projectestac.github.io/jclic/apidoc/edu/xtec/jclic/PlayStation.html) Java interface.
- `$div` ([external:jQuery](/module/utils#jquery), optional) — The jQuery DOM element where this Panel will deploy
