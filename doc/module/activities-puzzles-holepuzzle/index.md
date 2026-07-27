---
title: activities/puzzles/HolePuzzle
kind: module
longname: module:activities/puzzles/HolePuzzle
description: "File : activities/puzzles/HolePuzzle.js Created : 01/06/2015 By : Francesc Busquets francesc@gmail.com JClic.js An HTML5 player of JClic activities https://projectestac.github.io/jclic.js"
---

# activities/puzzles/HolePuzzle

<SourceLink href="/source/activities/puzzles/holepuzzle-js/#L32" label="HolePuzzle.js:32" />

File : activities/puzzles/HolePuzzle.js\
Created : 01/06/2015\
By : Francesc Busquets [francesc@gmail.com](mailto:francesc@gmail.com)

JClic.js\
An HTML5 player of JClic activities\
https\://projectestac.github.io/jclic.js

- **License:** EUPL-1.2

---

## Other

<MemberHeading id="holepuzzle" depth="3" name="HolePuzzle" sig="HolePuzzle" />

<MemberMeta badges="static" sourceHref="/source/activities/puzzles/holepuzzle-js/#L48" sourceLabel="HolePuzzle.js:48" />

**Extends:&#x20;**`module:Activity.Activity`

This class of [Activity](/module/activity#activity) shows only one panel with shuffled [ActiveBox](/module/boxes-activebox#activebox) cells.

One of the cells is out of the main panel, thus allowing its neighbors occupy their space.\
Only immediate neighbors of the "hole" can move into it.

When all cells are on place, the initially "expulsed" cell comes back home and the activity is done.

**Parameters**

- `project` ([module:project/JClicProject.JClicProject](/module/project-jclicproject#jclicproject)) — The [JClicProject](/module/project-jclicproject#jclicproject) to which this activity belongs

<MemberHeading id="holepuzzlepanel" depth="3" name="HolePuzzlePanel" sig="HolePuzzlePanel" />

<MemberMeta badges="static" sourceHref="/source/activities/puzzles/holepuzzle-js/#L98" sourceLabel="HolePuzzle.js:98" />

**Extends:&#x20;**`module:Activity.ActivityPanel`

The [ActivityPanel](/module/activity#activitypanel) where [HolePuzzle](/module/activities-puzzles-holepuzzle#holepuzzle) activities are played

**Parameters**

- `act` ([module:Activity.Activity](/module/activity#activity)) — The [Activity](/module/activity#activity) to which this Panel belongs
- `ps` ([module:JClicPlayer.JClicPlayer](/module/jclicplayer#jclicplayer)) — Any object implementing the methods defined in the\
  [PlayStation](http://projectestac.github.io/jclic/apidoc/edu/xtec/jclic/PlayStation.html) Java interface.
- `$div` ([external:jQuery](/module/utils#jquery), optional) — The jQuery DOM element where this Panel will deploy
