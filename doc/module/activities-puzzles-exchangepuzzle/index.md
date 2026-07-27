---
title: activities/puzzles/ExchangePuzzle
kind: module
longname: module:activities/puzzles/ExchangePuzzle
description: "File : activities/puzzles/ExchangePuzzle.js Created : 30/05/2015 By : Francesc Busquets francesc@gmail.com JClic.js An HTML5 player of JClic activities https://projectestac.github.io/jclic.js"
---

# activities/puzzles/ExchangePuzzle

<SourceLink href="/source/activities/puzzles/exchangepuzzle-js/#L32" label="ExchangePuzzle.js:32" />

File : activities/puzzles/ExchangePuzzle.js\
Created : 30/05/2015\
By : Francesc Busquets [francesc@gmail.com](mailto:francesc@gmail.com)

JClic.js\
An HTML5 player of JClic activities\
https\://projectestac.github.io/jclic.js

- **License:** EUPL-1.2

---

## Other

<MemberHeading id="exchangepuzzle" depth="3" name="ExchangePuzzle" sig="ExchangePuzzle" />

<MemberMeta badges="static" sourceHref="/source/activities/puzzles/exchangepuzzle-js/#L45" sourceLabel="ExchangePuzzle.js:45" />

**Extends:&#x20;**`module:Activity.Activity`

This class of [Activity](/module/activity#activity) shows only one panel with shuffled [ActiveBox](/module/boxes-activebox#activebox) objects.\
To solve the activity, each cell must exchange its location with another one. When all cells are\
on place, the activity is done.

**Parameters**

- `project` ([module:project/JClicProject.JClicProject](/module/project-jclicproject#jclicproject)) — The [JClicProject](/module/project-jclicproject#jclicproject) to which this activity belongs

<MemberHeading id="exchangepuzzlepanel" depth="3" name="ExchangePuzzlePanel" sig="ExchangePuzzlePanel" />

<MemberMeta sourceHref="/source/activities/puzzles/exchangepuzzle-js/#L95" sourceLabel="ExchangePuzzle.js:95" />

**Extends:&#x20;**`module:Activity.ActivityPanel`

The [ActivityPanel](/module/activity#activitypanel) where activities of type [ExchangePuzzle](/module/activities-puzzles-exchangepuzzle#exchangepuzzle) are played.

**Parameters**

- `act` ([module:Activity.Activity](/module/activity#activity)) — The [Activity](/module/activity#activity) to which this Panel belongs
- `ps` ([module:JClicPlayer.JClicPlayer](/module/jclicplayer#jclicplayer)) — Any object implementing the methods defined in the\
  [PlayStation](http://projectestac.github.io/jclic/apidoc/edu/xtec/jclic/PlayStation.html) Java interface.
- `$div` ([external:jQuery](/module/utils#jquery), optional) — The jQuery DOM element where this Panel will deploy
