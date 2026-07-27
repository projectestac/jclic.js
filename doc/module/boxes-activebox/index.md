---
title: boxes/ActiveBox
kind: module
longname: module:boxes/ActiveBox
description: "File : boxes/ActiveBox.js Created : 18/04/2015 By : Francesc Busquets francesc@gmail.com JClic.js An HTML5 player of JClic activities https://projectestac.github.io/jclic.js"
---

# boxes/ActiveBox

<SourceLink href="/source/boxes/activebox-js/#L32" label="ActiveBox.js:32" />

File : boxes/ActiveBox.js\
Created : 18/04/2015\
By : Francesc Busquets [francesc@gmail.com](mailto:francesc@gmail.com)

JClic.js\
An HTML5 player of JClic activities\
https\://projectestac.github.io/jclic.js

- **License:** EUPL-1.2

---

## Other

<MemberHeading id="activebox" depth="3" name="ActiveBox" sig="ActiveBox" />

<MemberMeta badges="static" sourceHref="/source/boxes/activebox-js/#L52" sourceLabel="ActiveBox.js:52" />

**Extends:&#x20;**`module:boxes/AbstractBox.AbstractBox`

Objects of this class are widely used in JClic activities: cells in puzzles and associations,\
messages and other objects are active boxes.

The specific content, size and location of `ActiveBox` objects is determined by its\
[ActiveBoxContent](/module/boxes-activeboxcontent#activeboxcontent) member. Most ActiveBoxes have only one content, but some of them can\
have a secondary or "alternative" content stored in the `altContent` field. This content is\
used only when the `alternative` flag of the ActiveBox is `on`.

Active boxes can host video and interactive media content (specified in the `mediaContent`\
member of the [ActiveBoxContent](/module/boxes-activeboxcontent#activeboxcontent) through its `hostedMediaPlayer` member.

**Parameters**

- `parent` ([module:boxes/AbstractBox.AbstractBox](/module/boxes-abstractbox#abstractbox), optional) — The AbstractBox to which this ActiveBox belongs
- `container` ([module:AWT.Container](/module/awt#container), optional) — The container where this box is placed.
- `boxBase` ([module:boxes/BoxBase.BoxBase](/module/boxes-boxbase#boxbase), optional) — The object where colors, fonts, border and other graphic properties\
  of this box are defined.
- `setIdLoc` (number, optional) — A numeric identifier, used to locate this box in a set of sibling objects.
- `rect` ([module:AWT.Rectangle](/module/awt#rectangle), optional) — The initial bounds of the box.
