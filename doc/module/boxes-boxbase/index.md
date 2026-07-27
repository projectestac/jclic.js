---
title: boxes/BoxBase
kind: module
longname: module:boxes/BoxBase
description: "File : boxes/BoxBase.js Created : 12/04/2015 By : Francesc Busquets francesc@gmail.com JClic.js An HTML5 player of JClic activities https://projectestac.github.io/jclic.js"
---

# boxes/BoxBase

<SourceLink href="/source/boxes/boxbase-js/#L32" label="BoxBase.js:32" />

File : boxes/BoxBase.js\
Created : 12/04/2015\
By : Francesc Busquets [francesc@gmail.com](mailto:francesc@gmail.com)

JClic.js\
An HTML5 player of JClic activities\
https\://projectestac.github.io/jclic.js

- **License:** EUPL-1.2

---

## Other

<MemberHeading id="boxbase" depth="3" name="BoxBase" sig="BoxBase" />

<MemberMeta badges="static" sourceHref="/source/boxes/boxbase-js/#L48" sourceLabel="BoxBase.js:48" />

This class contains all the main visual attributes needed to draw [AbstractBox](/module/boxes-abstractbox#abstractbox) objects:\
background and foreground colors, gradients, colors for special states (inactive, alternative,\
disabled...), margins, fonts, border strokes, etc.

Objects derived from [AbstractBox](/module/boxes-abstractbox#abstractbox) can have inheritance: boxes that act as "containers"\
of other boxes (like [BoxBag](/module/boxes-boxbag#boxbag)). Most of the attributes of `BoxBase` can be `null`,\
meaning that the value of the ancestor -or the default value if the box has no ancestors- must\
be used.

**Parameters**

- `parent` ([module:boxes/BoxBase.BoxBase](/module/boxes-boxbase#boxbase), optional) — Another BoxBase object used to determine the value of properties not\
  locally set.
