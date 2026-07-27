---
title: activities/text/Complete
kind: module
longname: module:activities/text/Complete
description: "File : activities/text/Complete.js Created : 20/06/2015 By : Francesc Busquets francesc@gmail.com JClic.js An HTML5 player of JClic activities https://projectestac.github.io/jclic.js"
---

# activities/text/Complete

<SourceLink href="/source/activities/text/complete-js/#L32" label="Complete.js:32" />

File : activities/text/Complete.js\
Created : 20/06/2015\
By : Francesc Busquets [francesc@gmail.com](mailto:francesc@gmail.com)

JClic.js\
An HTML5 player of JClic activities\
https\://projectestac.github.io/jclic.js

- **License:** EUPL-1.2

---

## Other

<MemberHeading id="complete" depth="3" name="Complete" sig="Complete" />

<MemberMeta badges="static" sourceHref="/source/activities/text/complete-js/#L40" sourceLabel="Complete.js:40" />

**Extends:&#x20;**`module:activities/text/TextActivityBase.TextActivityBase`

This type of text activity suggests users to complete a given text, without any help on where to\
write the missing words or phrases.

**Parameters**

- `project` ([module:project/JClicProject.JClicProject](/module/project-jclicproject#jclicproject)) — The project to which this activity belongs

<MemberHeading id="completepanel" depth="3" name="CompletePanel" sig="CompletePanel" />

<MemberMeta badges="static" sourceHref="/source/activities/text/complete-js/#L54" sourceLabel="Complete.js:54" />

**Extends:&#x20;**`module:activities/text/TextActivityBasePanel.TextActivityBasePanel`

The [TextActivityBasePanel](/module/activities-text-textactivitybase#textactivitybasepanel) where [Complete](/module/activities-text-complete#complete) activities are played.

**Parameters**

- `act` ([module:Activity.Activity](/module/activity#activity)) — The [Activity](/module/activity#activity) to which this Panel belongs
- `ps` ([module:JClicPlayer.JClicPlayer](/module/jclicplayer#jclicplayer)) — Any object implementing the methods defined in the\
  [PlayStation](http://projectestac.github.io/jclic/apidoc/edu/xtec/jclic/PlayStation.html) Java interface.
- `$div` ([external:jQuery](/module/utils#jquery), optional) — The jQuery DOM element where this Panel will deploy
