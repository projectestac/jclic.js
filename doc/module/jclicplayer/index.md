---
title: JClicPlayer
kind: module
longname: module:JClicPlayer
description: "File : JClicPlayer.js Created : 28/04/2015 By : Francesc Busquets francesc@gmail.com JClic.js An HTML5 player of JClic activities https://projectestac.github.io/jclic.js"
---

# JClicPlayer

<SourceLink href="/source/jclicplayer-js/#L32" label="JClicPlayer.js:32" />

File : JClicPlayer.js\
Created : 28/04/2015\
By : Francesc Busquets [francesc@gmail.com](mailto:francesc@gmail.com)

JClic.js\
An HTML5 player of JClic activities\
https\://projectestac.github.io/jclic.js

- **License:** EUPL-1.2

---

## Other

<MemberHeading id="jclicplayer" depth="3" name="JClicPlayer" sig="JClicPlayer" />

<MemberMeta badges="static" sourceHref="/source/jclicplayer-js/#L56" sourceLabel="JClicPlayer.js:56" />

**Extends:&#x20;**`module:AWT.Container`

JClicPlayer is one of the the main classes of the JClic system. It implements the\
[PlayStation](http://projectestac.github.io/jclic/apidoc/edu/xtec/jclic/PlayStation.html)\
interface, needed to host JClic activities.\
JClicPlayer offers to [ActivityPanel](/module/activity#activitypanel) objects all the necessary resources and functions:\
media bags (to load and realize images and other media contents), sequence control, management\
of the reporting system, user interface, display of system messages, etc.

**Parameters**

- `$topDiv` ([external:jQuery](/module/utils#jquery)) — The HTML `div` element where this JClicPlayer will deploy.
- `options` (object, optional) — A set of optional customized options.
