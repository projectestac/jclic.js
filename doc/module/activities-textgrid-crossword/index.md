---
title: activities/textGrid/CrossWord
kind: module
longname: module:activities/textGrid/CrossWord
description: "File : activities/textGrid/CrossWord.js Created : 17/06/2015 By : Francesc Busquets francesc@gmail.com JClic.js An HTML5 player of JClic activities https://projectestac.github.io/jclic.js"
---

# activities/textGrid/CrossWord

<SourceLink href="/source/activities/textgrid/crossword-js/#L32" label="CrossWord.js:32" />

File : activities/textGrid/CrossWord.js\
Created : 17/06/2015\
By : Francesc Busquets [francesc@gmail.com](mailto:francesc@gmail.com)

JClic.js\
An HTML5 player of JClic activities\
https\://projectestac.github.io/jclic.js

- **License:** EUPL-1.2

---

## Other

<MemberHeading id="crossword" depth="3" name="CrossWord" sig="CrossWord" />

<MemberMeta badges="static" sourceHref="/source/activities/textgrid/crossword-js/#L60" sourceLabel="CrossWord.js:60" />

**Extends:&#x20;**`module:Activity.Activity`

This class of [Activity](/module/activity#activity) shows a [TextGrid](/module/boxes-textgrid#textgrid) initially empty, with some cells\
marked in negative color that act as word stoppers. A blinking "cursor" indicates the cell that\
will receive the next character entered by the user on the keyboard.

The letter in each cell of the grid is always shared by two words: one in horizontal direction\
and the other one in vertical direction. Two [ActiveBox](/module/boxes-activebox#activebox) objects are placed next to the\
[TextGrid](/module/boxes-textgrid#textgrid), hosting the definitions of the horizontal and vertical words crossing at the\
cell currently marked by the cursor.

Two special buttons placed near this boxes allow to write on the grid horizontally or vertically.\
The aim of the activity is to fill all the text grid with the correct words.

**Parameters**

- `project` ([module:project/JClicProject.JClicProject](/module/project-jclicproject#jclicproject)) — The JClic project to which this activity belongs

<MemberHeading id="crosswordpanel" depth="3" name="CrossWordPanel" sig="CrossWordPanel" />

<MemberMeta badges="static" sourceHref="/source/activities/textgrid/crossword-js/#L110" sourceLabel="CrossWord.js:110" />

**Extends:&#x20;**`module:Activity.ActivityPanel`

The [ActivityPanel](/module/activity#activitypanel) where [CrossWord](/module/activities-textgrid-crossword#crossword) activities are played.

**Parameters**

- `act` ([module:Activity.Activity](/module/activity#activity)) — The [Activity](/module/activity#activity) to which this Panel belongs
- `ps` ([module:JClicPlayer.JClicPlayer](/module/jclicplayer#jclicplayer)) — Any object implementing the methods defined in the\
  [PlayStation](http://projectestac.github.io/jclic/apidoc/edu/xtec/jclic/PlayStation.html) Java interface.
- `$div` ([external:jQuery](/module/utils#jquery), optional) — The jQuery DOM element where this Panel will deploy
