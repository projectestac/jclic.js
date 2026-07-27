---
title: bags/MediaBag
kind: module
longname: module:bags/MediaBag
description: "File : bags/MediaBag.js Created : 07/04/2015 By : Francesc Busquets francesc@gmail.com JClic.js An HTML5 player of JClic activities https://projectestac.github.io/jclic.js"
---

# bags/MediaBag

<SourceLink href="/source/bags/mediabag-js/#L32" label="MediaBag.js:32" />

File : bags/MediaBag.js\
Created : 07/04/2015\
By : Francesc Busquets [francesc@gmail.com](mailto:francesc@gmail.com)

JClic.js\
An HTML5 player of JClic activities\
https\://projectestac.github.io/jclic.js

- **License:** EUPL-1.2

---

## Other

<MemberHeading id="mediabag" depth="3" name="MediaBag" sig="MediaBag" />

<MemberMeta badges="static" sourceHref="/source/bags/mediabag-js/#L42" sourceLabel="MediaBag.js:42" />

This class stores and manages all the media components (images, sounds, animations, video,\
MIDI files, etc.) needed to run the activities of a [JClicProject](/module/project-jclicproject#jclicproject). The main member of\
the class is `elements`. This is where `module:bads/MediaBagElement.MediaBagElement` objects are stored.

**Parameters**

- `project` ([module:project/JClicProject.JClicProject](/module/project-jclicproject#jclicproject)) — The JClic project to which this media bag belongs
