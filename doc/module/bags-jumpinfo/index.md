---
title: bags/JumpInfo
kind: module
longname: module:bags/JumpInfo
description: "File : bags/JumpInfo.js Created : 05/04/2015 By : Francesc Busquets francesc@gmail.com JClic.js An HTML5 player of JClic activities https://projectestac.github.io/jclic.js"
---

# bags/JumpInfo

<SourceLink href="/source/bags/jumpinfo-js/#L32" label="JumpInfo.js:32" />

File : bags/JumpInfo.js\
Created : 05/04/2015\
By : Francesc Busquets [francesc@gmail.com](mailto:francesc@gmail.com)

JClic.js\
An HTML5 player of JClic activities\
https\://projectestac.github.io/jclic.js

- **License:** EUPL-1.2

---

## Other

<MemberHeading id="jumpinfo" depth="3" name="JumpInfo" sig="JumpInfo" />

<MemberMeta badges="static" sourceHref="/source/bags/jumpinfo-js/#L49" sourceLabel="JumpInfo.js:49" />

This class contains information about what things JClic sequence manager has to do in certain\
circumstances, such as:

- an activity finishes
- the user clicks on the "next" or "prev" buttons
- the user clicks or a cell with special "active content"

Different kinds of actions are possible for each of these events:

- RETURN: to go back to a previous point in the sequence.
- EXIT: to exit the program (thus navigating to another URL)
- STOP: to do nothing.
- JUMP: to jump to a specific point in the sequence of activities, or to another JClic project.

**Parameters**

- `action` (string) — Must be one of the described actions.
- `sq` (number | string, optional) — Can be the tag of the sequence element to jump to, or its\
  cardinal number in the list.

* **See:**
  - [ActivitySequenceJump](/module/bags-activitysequencejump#activitysequencejump)
  - [ConditionalJumpInfo](/module/bags-conditionaljumpinfo#conditionaljumpinfo)
