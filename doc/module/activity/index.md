---
title: Activity
kind: module
longname: module:Activity
description: "File : Activity.js Created : 07/04/2015 By : Francesc Busquets francesc@gmail.com JClic.js An HTML5 player of JClic activities https://projectestac.github.io/jclic.js"
---

# Activity

<SourceLink href="/source/activity-js/#L32" label="Activity.js:32" />

File : Activity.js\
Created : 07/04/2015\
By : Francesc Busquets [francesc@gmail.com](mailto:francesc@gmail.com)

JClic.js\
An HTML5 player of JClic activities\
https\://projectestac.github.io/jclic.js

- **License:** EUPL-1.2

---

## Other

<MemberHeading id="activity" depth="3" name="Activity" sig="Activity" />

<MemberMeta badges="static,abstract" sourceHref="/source/activity-js/#L55" sourceLabel="Activity.js:55" />

Activity is the abstract base class of JClic activities. It defines also the inner class\
[ActivityPanel](/module/activity#activitypanel), wich is responsible for user interaction with the activity\
content.\
Activities should extend both `Activity` and `ActivityPanel` classes in order to become fully\
operative.

**Parameters**

- `project` ([module:project/JClicProject.JClicProject](/module/project-jclicproject#jclicproject)) — The [JClicProject](/module/project-jclicproject#jclicproject) to which this activity belongs

<MemberHeading id="activitypanel" depth="3" name="ActivityPanel" sig="ActivityPanel" />

<MemberMeta badges="static" sourceHref="/source/activity-js/#L868" sourceLabel="Activity.js:868" />

**Extends:&#x20;**`module:AWT.Container`

This object is responsible for rendering the contents of the activity on the screen and\
managing user's interaction.\
Each type of Activity must implement its own `ActivityPanel`.\
In JClic, [Activity.Panel](http://projectestac.github.io/jclic/apidoc/edu/xtec/jclic/Activity.Panel.html)\
extends [javax.swing.JPanel](http://docs.oracle.com/javase/7/docs/api/javax/swing/JPanel.html).\
On this implementation, the JPanel will be replaced by an HTML `div` tag.

**Parameters**

- `act` ([module:Activity.Activity](/module/activity#activity)) — The [Activity](/module/activity#activity) to which this Panel belongs
- `ps` ([module:JClicPlayer.JClicPlayer](/module/jclicplayer#jclicplayer)) — Any object implementing the methods defined in the\
  [PlayStation](http://projectestac.github.io/jclic/apidoc/edu/xtec/jclic/PlayStation.html)\
  Java interface.
- `$div` ([external:jQuery](/module/utils#jquery), optional) — The jQuery DOM element where this Panel will deploy
