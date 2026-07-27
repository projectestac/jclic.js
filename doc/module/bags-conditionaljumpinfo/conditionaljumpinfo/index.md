---
title: ConditionalJumpInfo
kind: class
longname: module:bags/ConditionalJumpInfo.ConditionalJumpInfo
description: This special case of {@link module:bags/JumpInfo.JumpInfo JumpInfo} is used in {@link module:bags/ActivitySequenceJump.ActivitySequenceJump ActivitySequenceJump} objects to decide the type of jump or action to be performed, based on the results obtained by the user when playing previous JClic activities. In addition to the standard {@link module:bags/JumpInfo.JumpInfo JumpInfo} fields and methods, this class has two public members where score and time thresholds are stored. The exact meaning of this members will depend on the type of ConditionalJumpInfo in the {@link module:bags/ActivitySequenceJump.ActivitySequenceJump ActivitySequenceJump} (it can be upperJump or lowerJump ).
---

# ConditionalJumpInfo

**Extends:&#x20;**[`module:bags/JumpInfo.JumpInfo`](/module/bags-jumpinfo#jumpinfo)

<SourceLink href="/source/bags/conditionaljumpinfo-js/#L47" label="ConditionalJumpInfo.js:47" />

This special case of [JumpInfo](/module/bags-jumpinfo#jumpinfo) is used in [ActivitySequenceJump](/module/bags-activitysequencejump#activitysequencejump) objects to decide\
the type of jump or action to be performed, based on the results obtained by the user when\
playing previous JClic activities.

In addition to the standard [JumpInfo](/module/bags-jumpinfo#jumpinfo) fields and methods, this class has two public\
members where score and time thresholds are stored.

The exact meaning of this members will depend on the type of `ConditionalJumpInfo` in the\
[ActivitySequenceJump](/module/bags-activitysequencejump#activitysequencejump) (it can be `upperJump` or `lowerJump`).

---

## Constructor

<Signature
  code="new ConditionalJumpInfo(
	action: string,
	sq?: number | string,
	threshold?: number,
	time?: number,
): ConditionalJumpInfo"
/>

ConditionalJumpInfo constructor

**Parameters**

- `action` (string) — Must be one of the described actions.
- `sq` (number | string, optional) — Can be the tag of the sequence element to jump to, or its\
  cardinal number in the list.
- `threshold` (number, optional) — Threshold above or below which the action will be triggered,\
  depending on the type of JumpInfo.
- `time` (number, optional) — Delay to be applied in automatic jumps.

---

## Instance Methods

<MemberHeading id="setproperties" depth="3" name="setProperties" sig="setProperties($xml: external:jQuery)" />

<MemberMeta sourceHref="/source/bags/conditionaljumpinfo-js/#L67" sourceLabel="ConditionalJumpInfo.js:67" />

**Overrides:&#x20;**`module:bags/JumpInfo.JumpInfo#setProperties`

Loads this object settings from a specific JQuery XML element

**Parameters**

- `$xml` ([external:jQuery](/module/utils#jquery)) — The XML element to parse

<MemberHeading id="getattributes" depth="3" name="getAttributes" sig="getAttributes(): object" />

<MemberMeta sourceHref="/source/bags/conditionaljumpinfo-js/#L82" sourceLabel="ConditionalJumpInfo.js:82" />

**Overrides:&#x20;**`module:bags/JumpInfo.JumpInfo#getAttributes`

Gets a object with the basic attributes needed to rebuild this instance excluding functions,\
parent references, constants and also attributes retaining the default value.\
The resulting object is commonly usued to serialize elements in JSON format.

**Returns**

- `object`

<MemberHeading id="setattributes" depth="3" name="setAttributes" sig="setAttributes(data: object)" />

<MemberMeta sourceHref="/source/bags/conditionaljumpinfo-js/#L90" sourceLabel="ConditionalJumpInfo.js:90" />

**Overrides:&#x20;**`module:bags/JumpInfo.JumpInfo#setAttributes`

Loads this conditional jump settings from a data object

**Parameters**

- `data` (object) — The data object to parse

## Instance Fields

<MemberHeading id="threshold" depth="3" name="threshold" sig="threshold: number" />

<MemberMeta sourceHref="/source/bags/conditionaljumpinfo-js/#L105" sourceLabel="ConditionalJumpInfo.js:105" />

Threshold above or below which the action will be triggered, depending on the type of JumpInfo.

<MemberHeading id="time" depth="3" name="time" sig="time: number" />

<MemberMeta sourceHref="/source/bags/conditionaljumpinfo-js/#L110" sourceLabel="ConditionalJumpInfo.js:110" />

Delay to be applied in automatic jumps.

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
