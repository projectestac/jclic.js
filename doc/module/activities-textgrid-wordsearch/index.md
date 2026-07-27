---
title: activities/textGrid/WordSearch
kind: module
longname: module:activities/textGrid/WordSearch
description: "File : activities/textGrid/WordSearch.js Created : 15/06/2015 By : Francesc Busquets francesc@gmail.com JClic.js An HTML5 player of JClic activities https://projectestac.github.io/jclic.js"
---

# activities/textGrid/WordSearch

<SourceLink href="/source/activities/textgrid/wordsearch-js/#L32" label="WordSearch.js:32" />

File : activities/textGrid/WordSearch.js\
Created : 15/06/2015\
By : Francesc Busquets [francesc@gmail.com](mailto:francesc@gmail.com)

JClic.js\
An HTML5 player of JClic activities\
https\://projectestac.github.io/jclic.js

- **License:** EUPL-1.2

---

## Other

<MemberHeading id="wordsearch" depth="3" name="WordSearch" sig="WordSearch" />

<MemberMeta badges="static" sourceHref="/source/activities/textgrid/wordsearch-js/#L50" sourceLabel="WordSearch.js:50" />

**Extends:&#x20;**`module:Activity.Activity`

This class of [Activity](/module/activity#activity) shows a [TextGrid](/module/boxes-textgrid#textgrid) with some words placed in horizontal,\
vertical or diagonal direction, written right or upside down. The remaining grid cells will be\
filled with randomly selected characters.

The aim of the activity is to find all the words hidden on the text grid.\
The content of an optional [ActiveBagContent](/module/boxes-activebagcontent#activebagcontent) can be revealed on an auxiliary panel as\
words are found.

**Parameters**

- `project` ([module:project/JClicProject.JClicProject](/module/project-jclicproject#jclicproject)) — The JClic project to which this activity belongs

<MemberHeading id="wordsearchpanel" depth="3" name="WordSearchPanel" sig="WordSearchPanel" />

<MemberMeta badges="static" sourceHref="/source/activities/textgrid/wordsearch-js/#L118" sourceLabel="WordSearch.js:118" />

**Extends:&#x20;**`module:Activity.ActivityPanel`

The [ActivityPanel](/module/activity#activitypanel) where [WordSearch](/module/activities-textgrid-wordsearch#wordsearch) activities are played.

**Parameters**

- `act` ([module:Activity.Activity](/module/activity#activity)) — The [Activity](/module/activity#activity) to which this Panel belongs
- `ps` ([module:JClicPlayer.JClicPlayer](/module/jclicplayer#jclicplayer)) — Any object implementing the methods defined in the\
  [PlayStation](http://projectestac.github.io/jclic/apidoc/edu/xtec/jclic/PlayStation.html) Java interface.
- `$div` ([external:jQuery](/module/utils#jquery), optional) — The jQuery DOM element where this Panel will deploy
