---
title: ActivitySequenceJump
kind: class
longname: module:bags/ActivitySequenceJump.ActivitySequenceJump
description: "This is a special case of {@link module:bags/JumpInfo.JumpInfo JumpInfo}, used only in {@link module:bags/ActivitySequenceElement.ActivitySequenceElement ActivitySequenceElement} objects. Sequence elements can contain up to two ActivitySequenceJump objects: one to be processed when the user clicks on the &quot;next&quot; button (or when the activity finishes, if in automatic mode), and the other used with the &quot;prev&quot; button. ActivitySequenceJump objects define a default jump or action to be performed, but can also have up to two {@link module:bags/ConditionalJumpInfo.ConditionalJumpInfo ConditionalJumpInfo} objects. These define alternative jumps that are performed only when score or time are below or over a specific threshold."
---

# ActivitySequenceJump

**Extends:&#x20;**[`module:bags/JumpInfo.JumpInfo`](/module/bags-jumpinfo#jumpinfo)

<SourceLink href="/source/bags/activitysequencejump-js/#L47" label="ActivitySequenceJump.js:47" />

This is a special case of [JumpInfo](/module/bags-jumpinfo#jumpinfo), used only in [ActivitySequenceElement](/module/bags-activitysequenceelement#activitysequenceelement) objects.\
Sequence elements can contain up to two ActivitySequenceJump objects: one to be processed\
when the user clicks on the "next" button (or when the activity finishes, if in automatic mode),\
and the other used with the "prev" button. ActivitySequenceJump objects define a default jump\
or action to be performed, but can also have up to two [ConditionalJumpInfo](/module/bags-conditionaljumpinfo#conditionaljumpinfo) objects. These\
define alternative jumps that are performed only when score or time are below or over a specific\
threshold.

---

## Constructor

<Signature
  code="new ActivitySequenceJump(
	action: string,
	sq?: number | string,
): ActivitySequenceJump"
/>

ActivitySequenceJump constructor

**Parameters**

- `action` (string) — Must be one of the described actions.
- `sq` (number | string, optional) — Can be the tag of the sequence element to jump to, or its\
  cardinal number in the list.

---

## Instance Methods

<MemberHeading id="setproperties" depth="3" name="setProperties" sig="setProperties($xml: external:jQuery)" />

<MemberMeta sourceHref="/source/bags/activitysequencejump-js/#L62" sourceLabel="ActivitySequenceJump.js:62" />

**Overrides:&#x20;**`module:bags/JumpInfo.JumpInfo#setProperties`

Loads the object settings from a specific JQuery XML element.

**Parameters**

- `$xml` ([external:jQuery](/module/utils#jquery)) — The XML element to parse

<MemberHeading id="getattributes" depth="3" name="getAttributes" sig="getAttributes(): object" />

<MemberMeta sourceHref="/source/bags/activitysequencejump-js/#L82" sourceLabel="ActivitySequenceJump.js:82" />

**Overrides:&#x20;**`module:bags/JumpInfo.JumpInfo#getAttributes`

Gets a object with the basic attributes needed to rebuild this instance excluding functions,\
parent references, constants and also attributes retaining the default value.\
The resulting object is commonly usued to serialize elements in JSON format.

**Returns**

- `object`

<MemberHeading id="setattributes" depth="3" name="setAttributes" sig="setAttributes(data: object)" />

<MemberMeta sourceHref="/source/bags/activitysequencejump-js/#L90" sourceLabel="ActivitySequenceJump.js:90" />

**Overrides:&#x20;**`module:bags/JumpInfo.JumpInfo#setAttributes`

Loads the jump settings from a data object

**Parameters**

- `data` (object) — The data object to parse

<MemberHeading
  id="resolvejump"
  depth="3"
  name="resolveJump"
  sig="resolveJump(
	rating: number,
	time: number,
): module:bags/JumpInfo.JumpInfo"
/>

<MemberMeta sourceHref="/source/bags/activitysequencejump-js/#L110" sourceLabel="ActivitySequenceJump.js:110" />

Resolves what [JumpInfo](/module/bags-jumpinfo#jumpinfo) must be taken, based on a done time and average rating obtained\
in activities.

**Parameters**

- `rating` (number) — Average rating obtained by the user in the activities done during the\
  last sequence stretch.
- `time` (number) — Total time spend doing the activities.

**Returns**

- [`module:bags/JumpInfo.JumpInfo`](/module/bags-jumpinfo#jumpinfo)

## Instance Fields

<MemberHeading id="upperjump" depth="3" name="upperJump" sig="upperJump: module:bags/ConditionalJumpInfo.ConditionalJumpInfo" />

<MemberMeta sourceHref="/source/bags/activitysequencejump-js/#L132" sourceLabel="ActivitySequenceJump.js:132" />

Optional jump to be performed when the results (score and time) are above a specific threshold.

<MemberHeading id="lowerjump" depth="3" name="lowerJump" sig="lowerJump: module:bags/ConditionalJumpInfo.ConditionalJumpInfo" />

<MemberMeta sourceHref="/source/bags/activitysequencejump-js/#L137" sourceLabel="ActivitySequenceJump.js:137" />

Optional jump to be performed when the results (score or time) are below a specific threshold.

<MemberHeading id="id" depth="3" name="id" sig="id: string" />

<MemberMeta sourceHref="/source/bags/jumpinfo-js/#L112" sourceLabel="JumpInfo.js:112" />

_Inherited from `module:bags/JumpInfo.JumpInfo#id`_

**Overrides:&#x20;**`module:bags/JumpInfo.JumpInfo#id`

The JumpInfo identifier

- For regular jumps: 'forward', 'back'
- For conditional jumps: 'upper', 'lower'

<MemberHeading id="action" depth="3" name="action" sig="action: string" />

<MemberMeta sourceHref="/source/bags/jumpinfo-js/#L118" sourceLabel="JumpInfo.js:118" />

_Inherited from `module:bags/JumpInfo.JumpInfo#action`_

**Overrides:&#x20;**`module:bags/JumpInfo.JumpInfo#action`

The current action.\
Possible values are: `JUMP`, `STOP`, `RETURN` and `EXIT`.

<MemberHeading id="actnum" depth="3" name="actNum" sig="actNum: number" />

<MemberMeta sourceHref="/source/bags/jumpinfo-js/#L123" sourceLabel="JumpInfo.js:123" />

_Inherited from `module:bags/JumpInfo.JumpInfo#actNum`_

**Overrides:&#x20;**`module:bags/JumpInfo.JumpInfo#actNum`

Activity number in the sequence list

<MemberHeading id="sequence" depth="3" name="sequence" sig="sequence: string" />

<MemberMeta sourceHref="/source/bags/jumpinfo-js/#L128" sourceLabel="JumpInfo.js:128" />

_Inherited from `module:bags/JumpInfo.JumpInfo#sequence`_

**Overrides:&#x20;**`module:bags/JumpInfo.JumpInfo#sequence`

Current sequence tag

<MemberHeading id="projectpath" depth="3" name="projectPath" sig="projectPath: string" />

<MemberMeta sourceHref="/source/bags/jumpinfo-js/#L133" sourceLabel="JumpInfo.js:133" />

_Inherited from `module:bags/JumpInfo.JumpInfo#projectPath`_

**Overrides:&#x20;**`module:bags/JumpInfo.JumpInfo#projectPath`

Path of another JClic project to jump to
