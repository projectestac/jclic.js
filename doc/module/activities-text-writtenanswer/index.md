---
title: activities/text/WrittenAnswer
kind: module
longname: module:activities/text/WrittenAnswer
description: "File : activities/text/WrittenAnswer.js Created : 04/06/2015 By : Francesc Busquets francesc@gmail.com JClic.js An HTML5 player of JClic activities https://projectestac.github.io/jclic.js"
---

# activities/text/WrittenAnswer

<SourceLink href="/source/activities/text/writtenanswer-js/#L32" label="WrittenAnswer.js:32" />

File : activities/text/WrittenAnswer.js\
Created : 04/06/2015\
By : Francesc Busquets [francesc@gmail.com](mailto:francesc@gmail.com)

JClic.js\
An HTML5 player of JClic activities\
https\://projectestac.github.io/jclic.js

- **License:** EUPL-1.2

---

## Other

<MemberHeading id="writtenanswer" depth="3" name="WrittenAnswer" sig="WrittenAnswer" />

<MemberMeta badges="static" sourceHref="/source/activities/text/writtenanswer-js/#L50" sourceLabel="WrittenAnswer.js:50" />

**Extends:&#x20;**`module:Activity.Activity`

This class of [Activity](/module/activity#activity) shows a panel with [ActiveBox](/module/boxes-activebox#activebox) objects acting as cells\
with questions. The answers to these questions must be written in a separate text field.

The ActiveBox objects are filled with data stored in [ActiveBagContent](/module/boxes-activebagcontent#activebagcontent) repositories.

A second [ActiveBagContent](/module/boxes-activebagcontent#activebagcontent) can be used as alternative content, revealed as the questions\
are solved.

**Parameters**

- `project` ([module:project/JClicProject.JClicProject](/module/project-jclicproject#jclicproject)) — The JClic project to which this activity belongs

<MemberHeading id="writtenanswerpanel" depth="3" name="WrittenAnswerPanel" sig="WrittenAnswerPanel" />

<MemberMeta badges="static" sourceHref="/source/activities/text/writtenanswer-js/#L125" sourceLabel="WrittenAnswer.js:125" />

**Extends:&#x20;**`module:Activity.ActivityPanel`

The [ActivityPanel](/module/activity#activitypanel) where [WrittenAnswer](/module/activities-text-writtenanswer#writtenanswer) activities are played.

**Parameters**

- `act` ([module:Activity.Activity](/module/activity#activity)) — The [Activity](/module/activity#activity) to which this Panel belongs
- `ps` ([module:JClicPlayer.JClicPlayer](/module/jclicplayer#jclicplayer)) — Any object implementing the methods defined in the\
  [PlayStation](http://projectestac.github.io/jclic/apidoc/edu/xtec/jclic/PlayStation.html) Java interface.
- `$div` ([external:jQuery](/module/utils#jquery), optional) — The jQuery DOM element where this Panel will deploy
