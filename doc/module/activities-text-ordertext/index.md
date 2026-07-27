---
title: activities/text/OrderText
kind: module
longname: module:activities/text/OrderText
description: "File : activities/text/OrderText.js Created : 20/06/2015 By : Francesc Busquets francesc@gmail.com JClic.js An HTML5 player of JClic activities https://projectestac.github.io/jclic.js"
---

# activities/text/OrderText

<SourceLink href="/source/activities/text/ordertext-js/#L32" label="OrderText.js:32" />

File : activities/text/OrderText.js\
Created : 20/06/2015\
By : Francesc Busquets [francesc@gmail.com](mailto:francesc@gmail.com)

JClic.js\
An HTML5 player of JClic activities\
https\://projectestac.github.io/jclic.js

- **License:** EUPL-1.2

---

## Other

<MemberHeading id="ordertext" depth="3" name="OrderText" sig="OrderText" />

<MemberMeta badges="static" sourceHref="/source/activities/text/ordertext-js/#L43" sourceLabel="OrderText.js:43" />

**Extends:&#x20;**`module:activities/text/TextActivityBase.TextActivityBase`

In this type of text activity users must put in order some words or paragraphs that have been\
initially shuffled.

**Parameters**

- `project` ([module:project/JClicProject.JClicProject](/module/project-jclicproject#jclicproject)) — The project to which this activity belongs

<MemberHeading id="ordertextpanel" depth="3" name="OrderTextPanel" sig="OrderTextPanel" />

<MemberMeta badges="static" sourceHref="/source/activities/text/ordertext-js/#L97" sourceLabel="OrderText.js:97" />

**Extends:&#x20;**`module:activities/text/TextActivityBase.TextActivityBasePanel`

The [TextActivityBasePanel](/module/activities-text-textactivitybase#textactivitybasepanel) where [OrderText](/module/activities-text-ordertext#ordertext) activities are played.

**Parameters**

- `act` ([module:Activity.Activity](/module/activity#activity)) — The [Activity](/module/activity#activity) to which this Panel belongs
- `ps` ([module:JClicPlayer.JClicPlayer](/module/jclicplayer#jclicplayer)) — Any object implementing the methods defined in the\
  [PlayStation](http://projectestac.github.io/jclic/apidoc/edu/xtec/jclic/PlayStation.html) Java interface.
- `$div` ([external:jQuery](/module/utils#jquery), optional) — The jQuery DOM element where this Panel will deploy
