---
title: activities/memory/MemoryGame
kind: module
longname: module:activities/memory/MemoryGame
description: "File : activities/memory/MemoryGame.js Created : 04/06/2015 By : Francesc Busquets francesc@gmail.com JClic.js An HTML5 player of JClic activities https://projectestac.github.io/jclic.js"
---

# activities/memory/MemoryGame

<SourceLink href="/source/activities/memory/memorygame-js/#L32" label="MemoryGame.js:32" />

File : activities/memory/MemoryGame.js\
Created : 04/06/2015\
By : Francesc Busquets [francesc@gmail.com](mailto:francesc@gmail.com)

JClic.js\
An HTML5 player of JClic activities\
https\://projectestac.github.io/jclic.js

- **License:** EUPL-1.2

---

## Other

<MemberHeading id="memorygame" depth="3" name="MemoryGame" sig="MemoryGame" />

<MemberMeta badges="static" sourceHref="/source/activities/memory/memorygame-js/#L50" sourceLabel="MemoryGame.js:50" />

**Extends:&#x20;**`module:Activity.Activity`

This class of [Activity](/module/activity#activity) shows a panel with duplicate [ActiveBox](/module/boxes-activebox#activebox) objects initially\
hidden and shuffled. To complete the activity, all object pairs must be found. Only two objects\
are revealed in every move, so the user must remember the content of each cell.

The cell pairs can have identical content, defined in the `primary` [ActiveBagContent](/module/boxes-activebagcontent#activebagcontent) of\
the activity, or two different contents. In this case, the `secondary` bag elements will have\
content related to each `primary` element.

**Parameters**

- `project` ([module:project/JClicProject.JClicProject](/module/project-jclicproject#jclicproject)) — The [JClicProject](/module/project-jclicproject#jclicproject) to which this activity belongs

<MemberHeading id="memorygamepanel" depth="3" name="MemoryGamePanel" sig="MemoryGamePanel" />

<MemberMeta badges="static" sourceHref="/source/activities/memory/memorygame-js/#L91" sourceLabel="MemoryGame.js:91" />

**Extends:&#x20;**`module:Activity.ActivityPanel`

The [ActivityPanel](/module/activity#activitypanel) where [MemoryGame](/module/activities-memory-memorygame#memorygame) activities are played.

**Parameters**

- `act` ([module:Activity.Activity](/module/activity#activity)) — The [Activity](/module/activity#activity) to which this Panel belongs
- `ps` ([module:JClicPlayer.JClicPlayer](/module/jclicplayer#jclicplayer)) — Any object implementing the methods defined in the\
  [PlayStation](http://projectestac.github.io/jclic/apidoc/edu/xtec/jclic/PlayStation.html) Java interface.
- `$div` ([external:jQuery](/module/utils#jquery), optional) — The jQuery DOM element where this Panel will deploy
