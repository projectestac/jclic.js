---
title: project/JClicProject
kind: module
longname: module:project/JClicProject
description: "File : project/JClicProject.js Created : 01/04/2015 By : Francesc Busquets francesc@gmail.com JClic.js An HTML5 player of JClic activities https://projectestac.github.io/jclic.js"
---

# project/JClicProject

<SourceLink href="/source/project/jclicproject-js/#L32" label="JClicProject.js:32" />

File : project/JClicProject.js\
Created : 01/04/2015\
By : Francesc Busquets [francesc@gmail.com](mailto:francesc@gmail.com)

JClic.js\
An HTML5 player of JClic activities\
https\://projectestac.github.io/jclic.js

- **License:** EUPL-1.2

---

## Other

<MemberHeading id="jclicproject" depth="3" name="JClicProject" sig="JClicProject" />

<MemberMeta badges="static" sourceHref="/source/project/jclicproject-js/#L50" sourceLabel="JClicProject.js:50" />

JClicProject contains all the components of a JClic project: activities, sequences, media\
files, descriptors and metadata.

This encapsulation is achieved by three auxiliary objects:

- [ProjectSettings](/module/project-projectsettings#projectsettings): stores metadata like full title, description, authors, languages,\
  educational topics...
- [ActivitySequence](/module/bags-activitysequence#activitysequence): defines the order in which the activities must be shown.
- [MediaBag](/module/bags-mediabag#mediabag): contains the list of all media files used by the activities
