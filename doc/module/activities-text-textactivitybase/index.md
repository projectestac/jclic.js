---
title: activities/text/TextActivityBase
kind: module
longname: module:activities/text/TextActivityBase
description: "File : activities/text/TextActivityBase.js Created : 16/05/2015 By : Francesc Busquets francesc@gmail.com JClic.js An HTML5 player of JClic activities https://projectestac.github.io/jclic.js"
---

# activities/text/TextActivityBase

<SourceLink href="/source/activities/text/textactivitybase-js/#L32" label="TextActivityBase.js:32" />

File : activities/text/TextActivityBase.js\
Created : 16/05/2015\
By : Francesc Busquets [francesc@gmail.com](mailto:francesc@gmail.com)

JClic.js\
An HTML5 player of JClic activities\
https\://projectestac.github.io/jclic.js

- **License:** EUPL-1.2

---

## Other

<MemberHeading id="textactivitybase" depth="3" name="TextActivityBase" sig="TextActivityBase" />

<MemberMeta badges="static" sourceHref="/source/activities/text/textactivitybase-js/#L43" sourceLabel="TextActivityBase.js:43" />

**Extends:&#x20;**`module:Activity.Activity`

This class and its visual component [TextActivityBasePanel](/module/activities-text-textactivitybase#textactivitybasepanel) are the base for text\
activities like [FillInBlanks](/module/activities-text-fillinblanks#fillinblanks), [IdentifyText](/module/activities-text-identifytext#identifytext), [OrderText](/module/activities-text-ordertext#ordertext) and [Complete](/module/activities-text-complete#complete).

**Parameters**

- `project` ([module:project/JClicProject.JClicProject](/module/project-jclicproject#jclicproject)) — The project to which this activity belongs

<MemberHeading id="textactivitybasepanel" depth="3" name="TextActivityBasePanel" sig="TextActivityBasePanel" />

<MemberMeta badges="static" sourceHref="/source/activities/text/textactivitybase-js/#L101" sourceLabel="TextActivityBase.js:101" />

**Extends:&#x20;**`module:Activity.ActivityPanel`

The [ActivityPanel](/module/activity#activitypanel) where text activities (based on [TextActivityBase](/module/activities-text-textactivitybase#textactivitybase)) are played.

**Parameters**

- `act` ([module:Activity.Activity](/module/activity#activity)) — The [Activity](/module/activity#activity) to which this Panel belongs
- `ps` ([module:JClicPlayer.JClicPlayer](/module/jclicplayer#jclicplayer)) — Any object implementing the methods defined in the\
  [PlayStation](http://projectestac.github.io/jclic/apidoc/edu/xtec/jclic/PlayStation.html) Java interface.
- `$div` ([external:jQuery](/module/utils#jquery), optional) — The jQuery DOM element where this Panel will deploy
