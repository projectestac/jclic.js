---
title: boxes/ActiveBagContent
kind: module
longname: module:boxes/ActiveBagContent
description: "File : boxes/ActiveBagContent.js Created : 13/04/2015 By : Francesc Busquets francesc@gmail.com JClic.js An HTML5 player of JClic activities https://projectestac.github.io/jclic.js"
---

# boxes/ActiveBagContent

<SourceLink href="/source/boxes/activebagcontent-js/#L32" label="ActiveBagContent.js:32" />

File : boxes/ActiveBagContent.js\
Created : 13/04/2015\
By : Francesc Busquets [francesc@gmail.com](mailto:francesc@gmail.com)

JClic.js\
An HTML5 player of JClic activities\
https\://projectestac.github.io/jclic.js

- **License:** EUPL-1.2

---

## Other

<MemberHeading id="activebagcontent" depth="3" name="ActiveBagContent" sig="ActiveBagContent" />

<MemberMeta badges="static" sourceHref="/source/boxes/activebagcontent-js/#L45" sourceLabel="ActiveBagContent.js:45" />

This class packs a collection of [ActiveBoxContent](/module/boxes-activeboxcontent#activeboxcontent) objects and provides methods to access\
and manage it. The two main members of `ActiveBagContent` are the [Shaper](/module/shapers-shaper#shaper), responsible for\
determining the position and shape of each [ActiveBox](/module/boxes-activebox#activebox), and the [BoxBase](/module/boxes-boxbase#boxbase) (field `style`),\
provider of a common visual style.

**Parameters**

- `id` (string, optional) — An optional text tag identifying this ActiveBagContent
- `ncw` (number) — In grid-based distributions, number of columns.
- `nch` (number) — In grid-based distributions, number of rows.
