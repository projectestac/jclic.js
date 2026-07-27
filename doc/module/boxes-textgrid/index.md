---
title: boxes/TextGrid
kind: module
longname: module:boxes/TextGrid
description: "File : boxes/TextGrid.js Created : 12/06/2015 By : Francesc Busquets francesc@gmail.com JClic.js An HTML5 player of JClic activities https://projectestac.github.io/jclic.js"
---

# boxes/TextGrid

<SourceLink href="/source/boxes/textgrid-js/#L32" label="TextGrid.js:32" />

File : boxes/TextGrid.js\
Created : 12/06/2015\
By : Francesc Busquets [francesc@gmail.com](mailto:francesc@gmail.com)

JClic.js\
An HTML5 player of JClic activities\
https\://projectestac.github.io/jclic.js

- **License:** EUPL-1.2

---

## Other

<MemberHeading id="defaults" depth="3" name="defaults" sig="defaults: object" />

<MemberMeta badges="static" sourceHref="/source/boxes/textgrid-js/#L41" sourceLabel="TextGrid.js:41" />

Default values

<MemberHeading id="flags" depth="3" name="flags" sig="flags: object" />

<MemberMeta badges="static" sourceHref="/source/boxes/textgrid-js/#L51" sourceLabel="TextGrid.js:51" />

Binary flags used to mark status

<MemberHeading id="textgrid" depth="3" name="TextGrid" sig="TextGrid" />

<MemberMeta badges="static" sourceHref="/source/boxes/textgrid-js/#L67" sourceLabel="TextGrid.js:67" />

**Extends:&#x20;**`module:boxes/AbstractBox.AbstractBox`

This class is a special type of [AbstractBox](/module/boxes-abstractbox#abstractbox) that displays a grid of single\
characters.

It's used [CrossWord](/module/activities-textgrid-crossword#crossword) and [WordSearch](/module/activities-textgrid-wordsearch#wordsearch) activities.

**Parameters**

- `parent` ([module:boxes/AbstractBox.AbstractBox](/module/boxes-abstractbox#abstractbox)) — The AbstractBox to which this text grid belongs
- `container` ([module:AWT.Container](/module/awt#container)) — The container where this text grid is placed.
- `boxBase` ([module:boxes/BoxBase.BoxBase](/module/boxes-boxbase#boxbase)) — The object where colors, fonts, border and other graphic properties
- `x` (number) — `X` coordinate of the upper left corner of this grid
- `y` (number) — `Y` coordinate of the upper left corner of this grid
- `ncw` (number) — Number of columns of the grid
- `nch` (number) — Nomber of rows of the grid
- `cellW` (number) — Width of the cells
- `cellH` (number) — Height of the cells
- `border` (boolean) — When `true`, a border must be drawn between the cells
