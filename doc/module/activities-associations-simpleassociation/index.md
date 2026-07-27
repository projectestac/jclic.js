---
title: activities/associations/SimpleAssociation
kind: module
longname: module:activities/associations/SimpleAssociation
description: "File : activities/associations/SimpleAssociation.js Created : 02/06/2015 By : Francesc Busquets francesc@gmail.com JClic.js An HTML5 player of JClic activities https://projectestac.github.io/jclic.js"
---

# activities/associations/SimpleAssociation

<SourceLink href="/source/activities/associations/simpleassociation-js/#L32" label="SimpleAssociation.js:32" />

File : activities/associations/SimpleAssociation.js\
Created : 02/06/2015\
By : Francesc Busquets [francesc@gmail.com](mailto:francesc@gmail.com)

JClic.js\
An HTML5 player of JClic activities\
https\://projectestac.github.io/jclic.js

- **License:** EUPL-1.2

---

## Other

<MemberHeading id="simpleassociation" depth="3" name="SimpleAssociation" sig="SimpleAssociation" />

<MemberMeta badges="static" sourceHref="/source/activities/associations/simpleassociation-js/#L49" sourceLabel="SimpleAssociation.js:49" />

**Extends:&#x20;**`module:Activity.Activity`

This class of [Activity](/module/activity#activity) uses two panels (`primary` and `secondary`) formed by\
[ActiveBox](/module/boxes-activebox#activebox) objects filled with data stored in [ActiveBagContent](/module/boxes-activebagcontent#activebagcontent) repositories.

Both panels have the same number of elements, associated one-to-one. A third [ActiveBagContent](/module/boxes-activebagcontent#activebagcontent)\
can be used as alternative content, that will be revealed in the `primary` panel as the pairings\
of its cells are solved.

**Parameters**

- `project` ([module:project/JClicProject.JClicProject](/module/project-jclicproject#jclicproject)) — The JClic project to which this activity belongs

<MemberHeading id="simpleassociationpanel" depth="3" name="SimpleAssociationPanel" sig="SimpleAssociationPanel" />

<MemberMeta badges="static" sourceHref="/source/activities/associations/simpleassociation-js/#L107" sourceLabel="SimpleAssociation.js:107" />

**Extends:&#x20;**`module:Activity.ActivityPanel`

The [ActivityPanel](/module/activity#activitypanel) where [SimpleAssociation](/module/activities-associations-simpleassociation#simpleassociation) activities are played.

**Parameters**

- `act` ([module:Activity.Activity](/module/activity#activity)) — The [Activity](/module/activity#activity) to which this Panel belongs
- `ps` ([module:JClicPlayer.JClicPlayer](/module/jclicplayer#jclicplayer)) — Any object implementing the methods defined in the\
  [PlayStation](http://projectestac.github.io/jclic/apidoc/edu/xtec/jclic/PlayStation.html) Java interface.
- `$div` ([external:jQuery](/module/utils#jquery), optional) — The jQuery DOM element where this Panel will deploy
