---
title: activities/panels/Menu
kind: module
longname: module:activities/panels/Menu
description: "File : activities/panels/Menu.js Created : 20/07/2017 By : Francesc Busquets francesc@gmail.com JClic.js An HTML5 player of JClic activities https://projectestac.github.io/jclic.js"
---

# activities/panels/Menu

<SourceLink href="/source/activities/panels/menu-js/#L32" label="Menu.js:32" />

File : activities/panels/Menu.js\
Created : 20/07/2017\
By : Francesc Busquets [francesc@gmail.com](mailto:francesc@gmail.com)

JClic.js\
An HTML5 player of JClic activities\
https\://projectestac.github.io/jclic.js

- **License:** EUPL-1.2

---

## Other

<MemberHeading id="menu" depth="3" name="Menu" sig="Menu" />

<MemberMeta badges="static" sourceHref="/source/activities/panels/menu-js/#L49" sourceLabel="Menu.js:49" />

**Extends:&#x20;**`module:Activity.Activity`

This class of [Activity](/module/activity#activity) is only used in legacy JClic project libraries. It contains\
one or more buttons pointing to specific JClic projects or to other `Menu` activity panels.

**Parameters**

- `project` ([module:project/JClicProject.JClicProject](/module/project-jclicproject#jclicproject)) — The [JClicProject](/module/project-jclicproject#jclicproject) to which this activity belongs

<MemberHeading id="menupanel" depth="3" name="MenuPanel" sig="MenuPanel" />

<MemberMeta badges="static" sourceHref="/source/activities/panels/menu-js/#L67" sourceLabel="Menu.js:67" />

**Extends:&#x20;**`module:Activity.ActivityPanel`

The [ActivityPanel](/module/activity#activitypanel) where Menu will show its content.

**Parameters**

- `act` ([module:Activity.Activity](/module/activity#activity)) — The [Activity](/module/activity#activity) to which this Panel belongs
- `ps` ([module:JClicPlayer.JClicPlayer](/module/jclicplayer#jclicplayer)) — Any object implementing the methods defined in the\
  [PlayStation](http://projectestac.github.io/jclic/apidoc/edu/xtec/jclic/PlayStation.html) Java interface.
- `$div` ([external:jQuery](/module/utils#jquery), optional) — The jQuery DOM element where this Panel will deploy
