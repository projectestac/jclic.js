---
title: boxes/AbstractBox
kind: module
longname: module:boxes/AbstractBox
description: "File : boxes/AbstractBox.js Created : 18/04/2015 By : Francesc Busquets francesc@gmail.com JClic.js An HTML5 player of JClic activities https://projectestac.github.io/jclic.js"
---

# boxes/AbstractBox

<SourceLink href="/source/boxes/abstractbox-js/#L32" label="AbstractBox.js:32" />

File : boxes/AbstractBox.js\
Created : 18/04/2015\
By : Francesc Busquets [francesc@gmail.com](mailto:francesc@gmail.com)

JClic.js\
An HTML5 player of JClic activities\
https\://projectestac.github.io/jclic.js

- **License:** EUPL-1.2

---

## Other

<MemberHeading id="abstractbox" depth="3" name="AbstractBox" sig="AbstractBox" />

<MemberMeta badges="static,abstract" sourceHref="/source/boxes/abstractbox-js/#L44" sourceLabel="AbstractBox.js:44" />

**Extends:&#x20;**`module:AWT.Rectangle`

This abstract class is the base for most graphic components of JClic. It describes an area\
(by default an [module:AWT.Rectangle](/module/awt#rectangle)) with some special properties that determine how it must\
be drawn on screen.

Some types of boxes can act as containers for other boxes, establishing a hierarchy of dependences.

**Parameters**

- `parent` ([module:AbstractBox](/module/boxes-abstractbox#abstractbox)) — The AbstractBox to which this one belongs
- `container` ([module:AWT.Container](/module/awt#container)) — The container where this box is placed.
- `boxBase` ([module:BoxBase](/module/boxes-boxbase#boxbase)) — The object where colors, fonts, border and other graphic properties\
  of this box are defined.
