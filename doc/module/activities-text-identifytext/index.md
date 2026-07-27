---
title: activities/text/IdentifyText
kind: module
longname: module:activities/text/IdentifyText
description: "File : activities/text/Identify.js Created : 20/06/2015 By : Francesc Busquets francesc@gmail.com JClic.js An HTML5 player of JClic activities https://projectestac.github.io/jclic.js"
---

# activities/text/IdentifyText

<SourceLink href="/source/activities/text/identifytext-js/#L32" label="IdentifyText.js:32" />

File : activities/text/Identify.js\
Created : 20/06/2015\
By : Francesc Busquets [francesc@gmail.com](mailto:francesc@gmail.com)

JClic.js\
An HTML5 player of JClic activities\
https\://projectestac.github.io/jclic.js

- **License:** EUPL-1.2

---

## Other

<MemberHeading id="identifytext" depth="3" name="IdentifyText" sig="IdentifyText" />

<MemberMeta badges="static" sourceHref="/source/activities/text/identifytext-js/#L40" sourceLabel="IdentifyText.js:40" />

**Extends:&#x20;**`module:activities/text/TextActivityBase.TextActivityBase`

This type of text activity suggests users to click on specific words or single letters of a\
given text, without any help on where these elements are placed.

**Parameters**

- `project` ([module:project/JClicProject.JClicProject](/module/project-jclicproject#jclicproject)) — The project to which this activity belongs

<MemberHeading id="identifytextpanel" depth="3" name="IdentifyTextPanel" sig="IdentifyTextPanel" />

<MemberMeta sourceHref="/source/activities/text/identifytext-js/#L54" sourceLabel="IdentifyText.js:54" />

**Extends:&#x20;**`module:activities/text/TextActivityBase.TextActivityBasePanel`

The [TextActivityBasePanel](/module/activities-text-textactivitybase#textactivitybasepanel) where [IdentifyText](/module/activities-text-identifytext#identifytext) activities are played.

**Parameters**

- `act` ([module:Activity.Activity](/module/activity#activity)) — The [Activity](/module/activity#activity) to which this Panel belongs
- `ps` ([module:JClicPlayer.JClicPlayer](/module/jclicplayer#jclicplayer)) — Any object implementing the methods defined in the\
  [PlayStation](http://projectestac.github.io/jclic/apidoc/edu/xtec/jclic/PlayStation.html) Java interface.
- `$div` ([external:jQuery](/module/utils#jquery), optional) — The jQuery DOM element where this Panel will deploy
