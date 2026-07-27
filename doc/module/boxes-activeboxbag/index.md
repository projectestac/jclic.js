---
title: boxes/ActiveBoxBag
kind: module
longname: module:boxes/ActiveBoxBag
description: "File : boxes/ActiveBoxBag.js Created : 21/04/2015 By : Francesc Busquets francesc@gmail.com JClic.js An HTML5 player of JClic activities https://projectestac.github.io/jclic.js"
---

# boxes/ActiveBoxBag

<SourceLink href="/source/boxes/activeboxbag-js/#L32" label="ActiveBoxBag.js:32" />

File : boxes/ActiveBoxBag.js\
Created : 21/04/2015\
By : Francesc Busquets [francesc@gmail.com](mailto:francesc@gmail.com)

JClic.js\
An HTML5 player of JClic activities\
https\://projectestac.github.io/jclic.js

- **License:** EUPL-1.2

---

## Other

<MemberHeading id="activeboxbag" depth="3" name="ActiveBoxBag" sig="ActiveBoxBag" />

<MemberMeta badges="static" sourceHref="/source/boxes/activeboxbag-js/#L43" sourceLabel="ActiveBoxBag.js:43" />

**Extends:&#x20;**`module:boxes/BoxBag.BoxBag`

This class is a special case of [BoxBag](/module/boxes-boxbag#boxbag) containing only objects of type [ActiveBox](/module/boxes-activebox#activebox).\
In addition to the members and methods of `BoxBag`, it implements specific methods to deal with\
[ActiveBagContent](/module/boxes-activebagcontent#activebagcontent) objects and with the other specific members of `ActiveBox` like its "ids"\
(`idOrder`, `idLoc` and `idAss`).

**Parameters**

- `parent` ([module:boxes/AbstractBox.AbstractBox](/module/boxes-abstractbox#abstractbox), optional) — The AbstractBox to which this box bag belongs
- `container` ([module:AWT.Container](/module/awt#container), optional) — The container where this box bag is placed.
- `boxBase` ([module:boxes/BoxBase.BoxBase](/module/boxes-boxbase#boxbase), optional) — The object where colors, fonts, border and other graphic properties\
  of this box bag are defined.
