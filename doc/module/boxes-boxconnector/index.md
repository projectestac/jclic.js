---
title: boxes/BoxConnector
kind: module
longname: module:boxes/BoxConnector
description: "File : boxes/BoxConnector.js Created : 26/05/2015 By : Francesc Busquets francesc@gmail.com JClic.js An HTML5 player of JClic activities https://projectestac.github.io/jclic.js"
---

# boxes/BoxConnector

<SourceLink href="/source/boxes/boxconnector-js/#L32" label="BoxConnector.js:32" />

File : boxes/BoxConnector.js\
Created : 26/05/2015\
By : Francesc Busquets [francesc@gmail.com](mailto:francesc@gmail.com)

JClic.js\
An HTML5 player of JClic activities\
https\://projectestac.github.io/jclic.js

- **License:** EUPL-1.2

---

## Other

<MemberHeading id="boxconnector" depth="3" name="BoxConnector" sig="BoxConnector" />

<MemberMeta badges="static" sourceHref="/source/boxes/boxconnector-js/#L46" sourceLabel="BoxConnector.js:46" />

BoxConnector allows users to visually connect two [ActiveBox](/module/boxes-activebox#activebox) objects of an\
[ActivityPanel](/module/activity#activitypanel). There are two modes of operation:

- Drawing a line between an origin point (usually the point where the user clicks on) and a\
  destination point.
- Dragging the ActiveBox from one location to another.

The connecting lines can have arrowheads at its endings.

**Parameters**

- `parent` ([module:AWT.Container](/module/awt#container)) — The Container to which this BoxConnector belongs
- `$canvas` ([external:jQuery](/module/utils#jquery)) — The HTML `canvas` element where this BoxConnector will draw.
