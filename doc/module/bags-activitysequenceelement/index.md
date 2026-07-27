---
title: bags/ActivitySequenceElement
kind: module
longname: module:bags/ActivitySequenceElement
description: "File : bags/ActivitySequenceElement.js Created : 05/04/2015 By : Francesc Busquets francesc@gmail.com JClic.js An HTML5 player of JClic activities https://projectestac.github.io/jclic.js"
---

# bags/ActivitySequenceElement

<SourceLink href="/source/bags/activitysequenceelement-js/#L32" label="ActivitySequenceElement.js:32" />

File : bags/ActivitySequenceElement.js\
Created : 05/04/2015\
By : Francesc Busquets [francesc@gmail.com](mailto:francesc@gmail.com)

JClic.js\
An HTML5 player of JClic activities\
https\://projectestac.github.io/jclic.js

- **License:** EUPL-1.2

---

## Other

<MemberHeading id="activitysequenceelement" depth="3" name="ActivitySequenceElement" sig="ActivitySequenceElement" />

<MemberMeta badges="static" sourceHref="/source/bags/activitysequenceelement-js/#L49" sourceLabel="ActivitySequenceElement.js:49" />

This class is the basic component of [ActivitySequence](/module/bags-activitysequence#activitysequence) objects. It represents a specific\
point in the project's sequence of JClic activities.

For each point of the sequence, some options can be set:

- What activity must run at this point
- What to do or where to jump when the activity finishes
- The behavior of the "next" button
- The behavior of the "prev" button

Sequence points can also have a "tag", used to refer to them with a unique name.
