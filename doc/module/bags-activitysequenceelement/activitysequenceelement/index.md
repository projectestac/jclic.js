---
title: ActivitySequenceElement
kind: class
longname: module:bags/ActivitySequenceElement.ActivitySequenceElement
description: "This class is the basic component of {@link module:bags/ActivitySequence.ActivitySequence ActivitySequence} objects. It represents a specific point in the project's sequence of JClic activities. For each point of the sequence, some options can be set: What activity must run at this point What to do or where to jump when the activity finishes The behavior of the &quot;next&quot; button The behavior of the &quot;prev&quot; button Sequence points can also have a &quot;tag&quot;, used to refer to them with a unique name."
---

# ActivitySequenceElement

<SourceLink href="/source/bags/activitysequenceelement-js/#L49" label="ActivitySequenceElement.js:49" />

This class is the basic component of [ActivitySequence](/module/bags-activitysequence#activitysequence) objects. It represents a specific\
point in the project's sequence of JClic activities.

For each point of the sequence, some options can be set:

- What activity must run at this point
- What to do or where to jump when the activity finishes
- The behavior of the "next" button
- The behavior of the "prev" button

Sequence points can also have a "tag", used to refer to them with a unique name.

---

## Constructor

<Signature code="new ActivitySequenceElement(): ActivitySequenceElement" />

---

## Instance Methods

<MemberHeading id="setproperties" depth="3" name="setProperties" sig="setProperties($xml: external:jQuery)" />

<MemberMeta sourceHref="/source/bags/activitysequenceelement-js/#L57" sourceLabel="ActivitySequenceElement.js:57" />

Loads the object settings from a specific JQuery XML element

**Parameters**

- `$xml` ([external:jQuery](/module/utils#jquery))

<MemberHeading id="getattributes" depth="3" name="getAttributes" sig="getAttributes(): object" />

<MemberMeta sourceHref="/source/bags/activitysequenceelement-js/#L97" sourceLabel="ActivitySequenceElement.js:97" />

Gets a object with the basic attributes needed to rebuild this instance excluding functions,\
parent references, constants and also attributes retaining the default value.\
The resulting object is commonly usued to serialize elements in JSON format.

**Returns**

- `object`

<MemberHeading id="setattributes" depth="3" name="setAttributes" sig="setAttributes(data: object)" />

<MemberMeta sourceHref="/source/bags/activitysequenceelement-js/#L105" sourceLabel="ActivitySequenceElement.js:105" />

Loads sequence element settings from a data object

**Parameters**

- `data` (object)

## Instance Fields

<MemberHeading id="tag" depth="3" name="tag" sig="tag: string" />

<MemberMeta sourceHref="/source/bags/activitysequenceelement-js/#L125" sourceLabel="ActivitySequenceElement.js:125" />

Optional unique identifier of this element in the [ActivitySequence](/module/bags-activitysequence#activitysequence).

<MemberHeading id="description" depth="3" name="description" sig="description: string" />

<MemberMeta sourceHref="/source/bags/activitysequenceelement-js/#L130" sourceLabel="ActivitySequenceElement.js:130" />

Optional description of this sequence element.

<MemberHeading id="activity" depth="3" name="activity" sig="activity: string" />

<MemberMeta sourceHref="/source/bags/activitysequenceelement-js/#L135" sourceLabel="ActivitySequenceElement.js:135" />

Name of the [Activity](/module/activity#activity) pointed by this element.

<MemberHeading id="fwdjump" depth="3" name="fwdJump" sig="fwdJump: module:bags/ActivitySequenceJump.ActivitySequenceJump" />

<MemberMeta sourceHref="/source/bags/activitysequenceelement-js/#L140" sourceLabel="ActivitySequenceElement.js:140" />

Jump to be processed by the 'next' button action

<MemberHeading id="backjump" depth="3" name="backJump" sig="backJump: module:bags/ActivitySequenceJump.ActivitySequenceJump" />

<MemberMeta sourceHref="/source/bags/activitysequenceelement-js/#L145" sourceLabel="ActivitySequenceElement.js:145" />

Jump to be processed by the 'prev' button action.

<MemberHeading id="navbuttons" depth="3" name="navButtons" sig="navButtons: string" />

<MemberMeta sourceHref="/source/bags/activitysequenceelement-js/#L154" sourceLabel="ActivitySequenceElement.js:154" />

What buttons should be active at this point of the sequence. Valid values are:

- 'none'
- 'fwd'
- 'back'
- 'both'

<MemberHeading id="delay" depth="3" name="delay" sig="delay: number" />

<MemberMeta sourceHref="/source/bags/activitysequenceelement-js/#L159" sourceLabel="ActivitySequenceElement.js:159" />

Time delay (in seconds) before passing to the next/prev activity
