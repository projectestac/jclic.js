---
title: activities/text/FillInBlanks
kind: module
longname: module:activities/text/FillInBlanks
description: "File : activities/text/FillInBlanks.js Created : 20/06/2015 By : Francesc Busquets francesc@gmail.com JClic.js An HTML5 player of JClic activities https://projectestac.github.io/jclic.js"
---

# activities/text/FillInBlanks

<SourceLink href="/source/activities/text/fillinblanks-js/#L32" label="FillInBlanks.js:32" />

File : activities/text/FillInBlanks.js\
Created : 20/06/2015\
By : Francesc Busquets [francesc@gmail.com](mailto:francesc@gmail.com)

JClic.js\
An HTML5 player of JClic activities\
https\://projectestac.github.io/jclic.js

- **License:** EUPL-1.2

---

## Other

<MemberHeading id="fillinblanks" depth="3" name="FillInBlanks" sig="FillInBlanks" />

<MemberMeta badges="static" sourceHref="/source/activities/text/fillinblanks-js/#L43" sourceLabel="FillInBlanks.js:43" />

**Extends:&#x20;**`module:activities/text/TextActivityBase.TextActivityBase`

In this type of activity the text document has some blanks that must be filled-in. The blanks\
can be drop-down boxes or text fields (empty or pre-filled with an initial text). Blanks can\
also have associated clues, shown as "pop-ups".

**Parameters**

- `project` ([module:project/JClicProject.JClicProject](/module/project-jclicproject#jclicproject)) — The [JClicProject](/module/project-jclicproject#jclicproject) to which this activity belongs

<MemberHeading id="fillinblankspanel" depth="3" name="FillInBlanksPanel" sig="FillInBlanksPanel" />

<MemberMeta badges="static" sourceHref="/source/activities/text/fillinblanks-js/#L80" sourceLabel="FillInBlanks.js:80" />

**Extends:&#x20;**`module:activities/text/TextActivityBase.TextActivityBasePanel`

The [module:activities/text/TextActivityBase.TextActivityBasePanel](/module/activities-text-textactivitybase#textactivitybasepanel) where [FillInBlanks](/module/activities-text-fillinblanks#fillinblanks) activities are played.

**Parameters**

- `act` ([module:Activity.Activity](/module/activity#activity)) — The [Activity](/module/activity#activity) to which this Panel belongs
- `ps` ([module:JClicPlayer.JClicPlayer](/module/jclicplayer#jclicplayer)) — Any object implementing the methods defined in the\
  [PlayStation](http://projectestac.github.io/jclic/apidoc/edu/xtec/jclic/PlayStation.html) Java interface.
- `$div` ([external:jQuery](/module/utils#jquery), optional) — The jQuery DOM element where this Panel will deploy
