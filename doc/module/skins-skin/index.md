---
title: skins/Skin
kind: module
longname: module:skins/Skin
description: "File : skins/Skin.js Created : 29/04/2015 By : Francesc Busquets francesc@gmail.com JClic.js An HTML5 player of JClic activities https://projectestac.github.io/jclic.js"
---

# skins/Skin

<SourceLink href="/source/skins/skin-js/#L32" label="Skin.js:32" />

File : skins/Skin.js\
Created : 29/04/2015\
By : Francesc Busquets [francesc@gmail.com](mailto:francesc@gmail.com)

JClic.js\
An HTML5 player of JClic activities\
https\://projectestac.github.io/jclic.js

- **License:** EUPL-1.2

---

## Other

<MemberHeading id="skin" depth="3" name="Skin" sig="Skin" />

<MemberMeta badges="static,abstract" sourceHref="/source/skins/skin-js/#L55" sourceLabel="Skin.js:55" />

**Extends:&#x20;**`module:AWT.Container`

This abstract class manages the layout, position ans size of the visual components of JClic:\
player window, message box, counters, buttons, status... and also the appearance of the main\
container.\
The basic implementation of Skin is [DefaultSkin](/module/skins-defaultskin#defaultskin).

**Parameters**

- `ps` ([module:JClicPlayer.JClicPlayer](/module/jclicplayer#jclicplayer)) — The `PlayStation` (currently a [JClicPlayer](/module/jclicplayer#jclicplayer)) used to load and\
  realize the media objects needed tot build the Skin.
- `name` (string, optional, default: null) — The skin name
- `options` (object, optional) — Optional parameter with additional options
