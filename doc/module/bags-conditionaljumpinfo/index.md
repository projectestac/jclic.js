---
title: bags/ConditionalJumpInfo
kind: module
longname: module:bags/ConditionalJumpInfo
description: "File : bags/ConditionalJumpInfo.js Created : 05/04/2015 By : Francesc Busquets francesc@gmail.com JClic.js An HTML5 player of JClic activities https://projectestac.github.io/jclic.js"
---

# bags/ConditionalJumpInfo

<SourceLink href="/source/bags/conditionaljumpinfo-js/#L32" label="ConditionalJumpInfo.js:32" />

File : bags/ConditionalJumpInfo.js\
Created : 05/04/2015\
By : Francesc Busquets [francesc@gmail.com](mailto:francesc@gmail.com)

JClic.js\
An HTML5 player of JClic activities\
https\://projectestac.github.io/jclic.js

- **License:** EUPL-1.2

---

## Other

<MemberHeading id="conditionaljumpinfo" depth="3" name="ConditionalJumpInfo" sig="ConditionalJumpInfo" />

<MemberMeta badges="static" sourceHref="/source/bags/conditionaljumpinfo-js/#L47" sourceLabel="ConditionalJumpInfo.js:47" />

**Extends:&#x20;**`module:bags/JumpInfo.JumpInfo`

This special case of [JumpInfo](/module/bags-jumpinfo#jumpinfo) is used in [ActivitySequenceJump](/module/bags-activitysequencejump#activitysequencejump) objects to decide\
the type of jump or action to be performed, based on the results obtained by the user when\
playing previous JClic activities.

In addition to the standard [JumpInfo](/module/bags-jumpinfo#jumpinfo) fields and methods, this class has two public\
members where score and time thresholds are stored.

The exact meaning of this members will depend on the type of `ConditionalJumpInfo` in the\
[ActivitySequenceJump](/module/bags-activitysequencejump#activitysequencejump) (it can be `upperJump` or `lowerJump`).

**Parameters**

- `action` (string) — Must be one of the described actions.
- `sq` (number | string, optional) — Can be the tag of the sequence element to jump to, or its\
  cardinal number in the list.
- `threshold` (number, optional) — Threshold above or below which the action will be triggered,\
  depending on the type of JumpInfo.
- `time` (number, optional) — Delay to be applied in automatic jumps.
