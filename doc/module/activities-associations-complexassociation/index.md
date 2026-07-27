---
title: activities/associations/ComplexAssociation
kind: module
longname: module:activities/associations/ComplexAssociation
description: "File : activities/associations/ComplexAssociation.js Created : 03/06/2015 By : Francesc Busquets francesc@gmail.com JClic.js An HTML5 player of JClic activities https://projectestac.github.io/jclic.js"
---

# activities/associations/ComplexAssociation

<SourceLink href="/source/activities/associations/complexassociation-js/#L33" label="ComplexAssociation.js:33" />

File : activities/associations/ComplexAssociation.js\
Created : 03/06/2015\
By : Francesc Busquets [francesc@gmail.com](mailto:francesc@gmail.com)

JClic.js\
An HTML5 player of JClic activities\
https\://projectestac.github.io/jclic.js

- **License:** EUPL-1.2

---

## Other

<MemberHeading id="complexassociation" depth="3" name="ComplexAssociation" sig="ComplexAssociation" />

<MemberMeta badges="static" sourceHref="/source/activities/associations/complexassociation-js/#L42" sourceLabel="ComplexAssociation.js:42" />

**Extends:&#x20;**`module:activities/associations/SimpleAssociation.SimpleAssociation`

This is a special case of [SimpleAssociation](/module/activities-associations-simpleassociation#simpleassociation) where the elements of the 'secondary' panel\
can have zero, one or more associated elements in the 'primary' panel.

**Parameters**

- `project` ([module:project/JClicProject.JClicProject](/module/project-jclicproject#jclicproject)) — The JClic project to which this activity belongs

<MemberHeading id="complexassociationpanel" depth="3" name="ComplexAssociationPanel" sig="ComplexAssociationPanel" />

<MemberMeta badges="static" sourceHref="/source/activities/associations/complexassociation-js/#L92" sourceLabel="ComplexAssociation.js:92" />

**Extends:&#x20;**`module:activities/associations/SimpleAssociation.SimpleAssociationPanel`

The [ActivityPanel](/module/activity#activitypanel) where [ComplexAssociation](/module/activities-associations-complexassociation#complexassociation) activities are played.

**Parameters**

- `act` ([module:Activity.Activity](/module/activity#activity)) — The [Activity](/module/activity#activity) to which this Panel belongs
- `ps` ([module:JClicPlayer.JClicPlayer](/module/jclicplayer#jclicplayer)) — Any object implementing the methods defined in the\
  [PlayStation](http://projectestac.github.io/jclic/apidoc/edu/xtec/jclic/PlayStation.html) Java interface.
- `$div` ([external:jQuery](/module/utils#jquery), optional) — The jQuery DOM element where this Panel will deploy
