---
title: boxes/ActiveBoxGrid
kind: module
longname: module:boxes/ActiveBoxGrid
description: "File : boxes/ActiveBoxGrid.js Created : 19/05/2015 By : Francesc Busquets francesc@gmail.com JClic.js An HTML5 player of JClic activities https://projectestac.github.io/jclic.js"
---

# boxes/ActiveBoxGrid

<SourceLink href="/source/boxes/activeboxgrid-js/#L32" label="ActiveBoxGrid.js:32" />

File : boxes/ActiveBoxGrid.js\
Created : 19/05/2015\
By : Francesc Busquets [francesc@gmail.com](mailto:francesc@gmail.com)

JClic.js\
An HTML5 player of JClic activities\
https\://projectestac.github.io/jclic.js

- **License:** EUPL-1.2

---

## Other

<MemberHeading id="activeboxgrid" depth="3" name="ActiveBoxGrid" sig="ActiveBoxGrid" />

<MemberMeta badges="static" sourceHref="/source/boxes/activeboxgrid-js/#L44" sourceLabel="ActiveBoxGrid.js:44" />

**Extends:&#x20;**`module:boxes/ActiveBoxBag.ActiveBoxBag`

This class extends `ActiveBoxBag` with constructors that take an argument of type\
[Shaper](/module/shapers-shaper#shaper) used to build all its [ActiveBox](/module/boxes-activebox#activebox)components. It also maintains information\
about the number of "rows" and "columns", useful to compute valid (integer) values when\
resizing or moving its components.

**Parameters**

- `parent` ([module:boxes/AbstractBox.AbstractBox](/module/boxes-abstractbox#abstractbox)) — The AbstractBox to which this box grid belongs
- `container` ([module:AWT.Container](/module/awt#container)) — The container where this box grid is placed.
- `boxBase` ([module:boxes/BoxBase](/module/boxes-boxbase)) — The object where colors, fonts, border and other graphic properties
- `px` (number) — `X` coordinate of the upper left corner of this box grid
- `py` (number) — `Y` coordinate of the upper left corner of this box grid
- `setWidth` (number) — Total width of the box grid
- `setHeight` (number) — Total height of the box grid
- `sh` ([module:shapers/Shaper.Shaper](/module/shapers-shaper#shaper)) — Shaper used to build the ActiveBox objects
