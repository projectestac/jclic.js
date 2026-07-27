---
title: JumpInfo
kind: class
longname: module:bags/JumpInfo.JumpInfo
description: "This class contains information about what things JClic sequence manager has to do in certain circumstances, such as: an activity finishes the user clicks on the &quot;next&quot; or &quot;prev&quot; buttons the user clicks or a cell with special &quot;active content&quot; Different kinds of actions are possible for each of these events: RETURN: to go back to a previous point in the sequence. EXIT: to exit the program (thus navigating to another URL) STOP: to do nothing. JUMP: to jump to a specific point in the sequence of activities, or to another JClic project."
---

# JumpInfo

<SourceLink href="/source/bags/jumpinfo-js/#L49" label="JumpInfo.js:49" />

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

* **See:**
  - [ActivitySequenceJump](/module/bags-activitysequencejump#activitysequencejump)
  - [ConditionalJumpInfo](/module/bags-conditionaljumpinfo#conditionaljumpinfo)

---

## Constructor

<Signature code="new JumpInfo(action: string, sq?: number | string): JumpInfo" />

JumpInfo constructor

**Parameters**

- `action` (string) — Must be one of the described actions.
- `sq` (number | string, optional) — Can be the tag of the sequence element to jump to, or its\
  cardinal number in the list.

---

## Instance Methods

<MemberHeading id="setproperties" depth="3" name="setProperties" sig="setProperties($xml: external:jQuery)" />

<MemberMeta sourceHref="/source/bags/jumpinfo-js/#L72" sourceLabel="JumpInfo.js:72" />

Loads the object settings from a specific JQuery XML element

**Parameters**

- `$xml` ([external:jQuery](/module/utils#jquery)) — The XML element to parse

<MemberHeading id="getattributes" depth="3" name="getAttributes" sig="getAttributes(): object" />

<MemberMeta sourceHref="/source/bags/jumpinfo-js/#L88" sourceLabel="JumpInfo.js:88" />

Gets a object with the basic attributes needed to rebuild this instance excluding functions,\
parent references, constants and also attributes retaining the default value.\
The resulting object is commonly usued to serialize elements in JSON format.

**Returns**

- `object`

<MemberHeading id="setattributes" depth="3" name="setAttributes" sig="setAttributes(data: object)" />

<MemberMeta sourceHref="/source/bags/jumpinfo-js/#L96" sourceLabel="JumpInfo.js:96" />

Loads the object settings from a data object

**Parameters**

- `data` (object) — The data object to parse

## Instance Fields

<MemberHeading id="id" depth="3" name="id" sig="id: string" />

<MemberMeta sourceHref="/source/bags/jumpinfo-js/#L112" sourceLabel="JumpInfo.js:112" />

The JumpInfo identifier

- For regular jumps: 'forward', 'back'
- For conditional jumps: 'upper', 'lower'

<MemberHeading id="action" depth="3" name="action" sig="action: string" />

<MemberMeta sourceHref="/source/bags/jumpinfo-js/#L118" sourceLabel="JumpInfo.js:118" />

The current action.\
Possible values are: `JUMP`, `STOP`, `RETURN` and `EXIT`.

<MemberHeading id="actnum" depth="3" name="actNum" sig="actNum: number" />

<MemberMeta sourceHref="/source/bags/jumpinfo-js/#L123" sourceLabel="JumpInfo.js:123" />

Activity number in the sequence list

<MemberHeading id="sequence" depth="3" name="sequence" sig="sequence: string" />

<MemberMeta sourceHref="/source/bags/jumpinfo-js/#L128" sourceLabel="JumpInfo.js:128" />

Current sequence tag

<MemberHeading id="projectpath" depth="3" name="projectPath" sig="projectPath: string" />

<MemberMeta sourceHref="/source/bags/jumpinfo-js/#L133" sourceLabel="JumpInfo.js:133" />

Path of another JClic project to jump to
