---
title: boxes/BoxBag
kind: module
longname: module:boxes/BoxBag
description: "File : boxes/BoxBag.js Created : 21/04/2015 By : Francesc Busquets francesc@gmail.com JClic.js An HTML5 player of JClic activities https://projectestac.github.io/jclic.js"
---

# boxes/BoxBag

<SourceLink href="/source/boxes/boxbag-js/#L32" label="BoxBag.js:32" />

File : boxes/BoxBag.js\
Created : 21/04/2015\
By : Francesc Busquets [francesc@gmail.com](mailto:francesc@gmail.com)

JClic.js\
An HTML5 player of JClic activities\
https\://projectestac.github.io/jclic.js

- **License:** EUPL-1.2

---

## Other

<MemberHeading id="boxbag" depth="3" name="BoxBag" sig="BoxBag" />

<MemberMeta badges="static" sourceHref="/source/boxes/boxbag-js/#L42" sourceLabel="BoxBag.js:42" />

**Extends:&#x20;**`module:boxes/AbstractBox.AbstractBox`

BoxBag is a class derived from [AbstractBox](/module/boxes-abstractbox#abstractbox) that contains a collection of "boxes"\
(objects also derived from [AbstractBox](/module/boxes-abstractbox#abstractbox)). This class implements methods to add, remove\
and retrieve boxes, and to manage some of its properties like visibility, status, location and size.

**Parameters**

- `parent` ([module:boxes/AbstractBox.AbstractBox](/module/boxes-abstractbox#abstractbox), optional) — The AbstractBox to which this box bag belongs
- `container` ([module:AWT.Container](/module/awt#container), optional) — The container where this box bag is placed.
- `boxBase` ([module:boxes/BoxBase.BoxBase](/module/boxes-boxbase#boxbase), optional) — The object where colors, fonts, border and other graphic properties
