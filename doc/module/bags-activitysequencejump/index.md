---
title: bags/ActivitySequenceJump
kind: module
longname: module:bags/ActivitySequenceJump
description: "File : bags/ActivitySequenceJump.js Created : 05/04/2015 By : Francesc Busquets francesc@gmail.com JClic.js An HTML5 player of JClic activities https://projectestac.github.io/jclic.js"
---

# bags/ActivitySequenceJump

<SourceLink href="/source/bags/activitysequencejump-js/#L32" label="ActivitySequenceJump.js:32" />

File : bags/ActivitySequenceJump.js\
Created : 05/04/2015\
By : Francesc Busquets [francesc@gmail.com](mailto:francesc@gmail.com)

JClic.js\
An HTML5 player of JClic activities\
https\://projectestac.github.io/jclic.js

- **License:** EUPL-1.2

---

## Other

<MemberHeading id="activitysequencejump" depth="3" name="ActivitySequenceJump" sig="ActivitySequenceJump" />

<MemberMeta badges="static" sourceHref="/source/bags/activitysequencejump-js/#L47" sourceLabel="ActivitySequenceJump.js:47" />

**Extends:&#x20;**`module:bags/JumpInfo.JumpInfo`

This is a special case of [JumpInfo](/module/bags-jumpinfo#jumpinfo), used only in [ActivitySequenceElement](/module/bags-activitysequenceelement#activitysequenceelement) objects.\
Sequence elements can contain up to two ActivitySequenceJump objects: one to be processed\
when the user clicks on the "next" button (or when the activity finishes, if in automatic mode),\
and the other used with the "prev" button. ActivitySequenceJump objects define a default jump\
or action to be performed, but can also have up to two [ConditionalJumpInfo](/module/bags-conditionaljumpinfo#conditionaljumpinfo) objects. These\
define alternative jumps that are performed only when score or time are below or over a specific\
threshold.

**Parameters**

- `action` (string) — Must be one of the described actions.
- `sq` (number | string, optional) — Can be the tag of the sequence element to jump to, or its\
  cardinal number in the list.
