---
title: activities/puzzles/DoublePuzzle
kind: module
longname: module:activities/puzzles/DoublePuzzle
description: "File : activities/puzzles/DoublePuzzle.js Created : 22/05/2015 By : Francesc Busquets francesc@gmail.com JClic.js An HTML5 player of JClic activities https://projectestac.github.io/jclic.js"
---

# activities/puzzles/DoublePuzzle

<SourceLink href="/source/activities/puzzles/doublepuzzle-js/#L32" label="DoublePuzzle.js:32" />

File : activities/puzzles/DoublePuzzle.js\
Created : 22/05/2015\
By : Francesc Busquets [francesc@gmail.com](mailto:francesc@gmail.com)

JClic.js\
An HTML5 player of JClic activities\
https\://projectestac.github.io/jclic.js

- **License:** EUPL-1.2

---

## Other

<MemberHeading id="doublepuzzle" depth="3" name="DoublePuzzle" sig="DoublePuzzle" />

<MemberMeta badges="static" sourceHref="/source/activities/puzzles/doublepuzzle-js/#L48" sourceLabel="DoublePuzzle.js:48" />

**Extends:&#x20;**`module:Activity.Activity`

The aim of this class of [Activity](/module/activity#activity) is to put in order the shuffled elements of an\
[ActiveBagContent](/module/boxes-activebagcontent#activebagcontent) that contains an image, sounds, text... or any other media content.

The activity uses two panels: one with the shuffled cells, and other initially empty where\
this cells must be placed in order.

**Parameters**

- `project` ([module:project/JClicProject.JClicProject](/module/project-jclicproject#jclicproject)) — The [JClicProject](/module/project-jclicproject#jclicproject) to which this activity belongs

<MemberHeading id="doublepuzzlepanel" depth="3" name="DoublePuzzlePanel" sig="DoublePuzzlePanel" />

<MemberMeta badges="static" sourceHref="/source/activities/puzzles/doublepuzzle-js/#L98" sourceLabel="DoublePuzzle.js:98" />

**Extends:&#x20;**`module:Activity.ActivityPanel`

The [ActivityPanel](/module/activity#activitypanel) where [DoublePuzzle](/module/activities-puzzles-doublepuzzle#doublepuzzle) activities are played.

**Parameters**

- `act` ([module:Activity.Activity](/module/activity#activity)) — The [Activity](/module/activity#activity) to which this Panel belongs
- `ps` ([module:JClicPlayer.JClicPlayer](/module/jclicplayer#jclicplayer)) — Any object implementing the methods defined in the\
  [PlayStation](http://projectestac.github.io/jclic/apidoc/edu/xtec/jclic/PlayStation.html)\
  Java interface.
- `$div` ([external:jQuery](/module/utils#jquery), optional) — The jQuery DOM element where this Panel will deploy
