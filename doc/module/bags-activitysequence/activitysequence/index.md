---
title: ActivitySequence
kind: class
longname: module:bags/ActivitySequence.ActivitySequence
description: This class stores the definition of the sequence to follow to show the activities of a {@link module:project/JClicProject.JClicProject JClicProject}. The sequence are formed by an ordered list of objects of type {@link module:bags/ActivitySequenceElement.ActivitySequenceElement ActivitySequenceElement}. It stores also a transient pointer to the current sequence element.
---

# ActivitySequence

<SourceLink href="/source/bags/activitysequence-js/#L44" label="ActivitySequence.js:44" />

This class stores the definition of the sequence to follow to show the activities of a\
[JClicProject](/module/project-jclicproject#jclicproject). The sequence are formed by an ordered list of objects of type\
[ActivitySequenceElement](/module/bags-activitysequenceelement#activitysequenceelement).\
It stores also a transient pointer to the current sequence element.

---

## Constructor

<Signature
  code="new ActivitySequence(
	project: module:project/JClicProject.JClicProject,
): ActivitySequence"
/>

ActivitySequence constructor

**Parameters**

- `project` ([module:project/JClicProject.JClicProject](/module/project-jclicproject#jclicproject)) — The JClic project to which this ActivitySequence belongs

---

## Instance Methods

<MemberHeading id="setproperties" depth="3" name="setProperties" sig="setProperties($xml: external:jQuery)" />

<MemberMeta sourceHref="/source/bags/activitysequence-js/#L58" sourceLabel="ActivitySequence.js:58" />

Loads the object settings from a specific JQuery XML element

**Parameters**

- `$xml` ([external:jQuery](/module/utils#jquery)) — The XML element to parse

<MemberHeading id="getattributes" depth="3" name="getAttributes" sig="getAttributes(): object" />

<MemberMeta sourceHref="/source/bags/activitysequence-js/#L69" sourceLabel="ActivitySequence.js:69" />

Gets a object with the basic attributes needed to rebuild this instance excluding functions,\
parent references, constants and also attributes retaining the default value.\
The resulting object is commonly usued to serialize elements in JSON format.

**Returns**

- `object`

<MemberHeading id="setattributes" depth="3" name="setAttributes" sig="setAttributes(data: object)" />

<MemberMeta sourceHref="/source/bags/activitysequence-js/#L77" sourceLabel="ActivitySequence.js:77" />

Loads the object settings from a data object

**Parameters**

- `data` (object) — The data object to parse

<MemberHeading
  id="getelementindex"
  depth="3"
  name="getElementIndex"
  sig="getElementIndex(
	ase: module:bags/ActivitySequenceElement.ActivitySequenceElement,
): number"
/>

<MemberMeta sourceHref="/source/bags/activitysequence-js/#L87" sourceLabel="ActivitySequence.js:87" />

Returns the index of the specified element in the sequence.

**Parameters**

- `ase` ([module:bags/ActivitySequenceElement.ActivitySequenceElement](/module/bags-activitysequenceelement#activitysequenceelement)) — The element to search.

**Returns**

- `number`

<MemberHeading
  id="getelement"
  depth="3"
  name="getElement"
  sig="getElement(
	n: number,
	updateCurrentAct: boolean,
): module:bags/ActivitySequenceElement.ActivitySequenceElement"
/>

<MemberMeta sourceHref="/source/bags/activitysequence-js/#L97" sourceLabel="ActivitySequence.js:97" />

Returns the nth element of the sequence.

**Parameters**

- `n` (number) — Index of the requested element
- `updateCurrentAct` (boolean) — when `true`, the `currentAct` index will be updated.

**Returns**

- [`module:bags/ActivitySequenceElement.ActivitySequenceElement`](/module/bags-activitysequenceelement#activitysequenceelement)

<MemberHeading
  id="getelementbytag"
  depth="3"
  name="getElementByTag"
  sig="getElementByTag(
	tag: string,
	updateCurrentAct: boolean,
): module:bags/ActivitySequenceElement.ActivitySequenceElement"
/>

<MemberMeta sourceHref="/source/bags/activitysequence-js/#L113" sourceLabel="ActivitySequence.js:113" />

Search into the sequence for a element with the provided tag

**Parameters**

- `tag` (string) — The tag to search
- `updateCurrentAct` (boolean) — when `true`, the `currentAct` index will be updated.

**Returns**

- [`module:bags/ActivitySequenceElement.ActivitySequenceElement`](/module/bags-activitysequenceelement#activitysequenceelement)

<MemberHeading
  id="getcurrentact"
  depth="3"
  name="getCurrentAct"
  sig="getCurrentAct(
): module:bags/ActivitySequenceElement.ActivitySequenceElement"
/>

<MemberMeta sourceHref="/source/bags/activitysequence-js/#L136" sourceLabel="ActivitySequence.js:136" />

Gets the sequence element pointed by the `currentAct` member.

**Returns**

- [`module:bags/ActivitySequenceElement.ActivitySequenceElement`](/module/bags-activitysequenceelement#activitysequenceelement)

<MemberHeading id="hasnextact" depth="3" name="hasNextAct" sig="hasNextAct(hasReturn: boolean): boolean" />

<MemberMeta sourceHref="/source/bags/activitysequence-js/#L146" sourceLabel="ActivitySequence.js:146" />

Checks if it's possible to go forward from the current position in the sequence.

**Parameters**

- `hasReturn` (boolean) — Indicates whether the history of jumps done since the beginning\
  of the JClic session is empty or not. When not empty, a `RETURN` action is still possible.

**Returns**

- `boolean`

<MemberHeading id="hasprevact" depth="3" name="hasPrevAct" sig="hasPrevAct(hasReturn: boolean): boolean" />

<MemberMeta sourceHref="/source/bags/activitysequence-js/#L172" sourceLabel="ActivitySequence.js:172" />

Checks if it's possible to go back from the current position in the sequence.

**Parameters**

- `hasReturn` (boolean) — Indicates whether the history of jumps done since the beginning\
  of the JClic session is empty or not. When not empty, a `RETURN` action is still possible.

**Returns**

- `boolean`

<MemberHeading id="getnavbuttonsflag" depth="3" name="getNavButtonsFlag" sig="getNavButtonsFlag(): string" />

<MemberMeta sourceHref="/source/bags/activitysequence-js/#L197" sourceLabel="ActivitySequence.js:197" />

Gets the current state for the 'next' and 'prev' buttons.

**Returns**

- `string`

<MemberHeading
  id="getjump"
  depth="3"
  name="getJump"
  sig="getJump(
	back: boolean,
	reporter: module:report/Reporter.Reporter,
): module:bags/JumpInfo.JumpInfo"
/>

<MemberMeta sourceHref="/source/bags/activitysequence-js/#L213" sourceLabel="ActivitySequence.js:213" />

Computes the jump to perform from the current position on the sequence

**Parameters**

- `back` (boolean) — When `true`, the request is for the 'go back' button. Otherwise, is\
  for the 'next' one.
- `reporter` ([module:report/Reporter.Reporter](/module/report-reporter#reporter)) — The reporting engine that will provide values about score average\
  and time spend on the activities, used only to compute conditional jumps.

**Returns**

- [`module:bags/JumpInfo.JumpInfo`](/module/bags-jumpinfo#jumpinfo)

<MemberHeading id="getsequenceforelement" depth="3" name="getSequenceForElement" sig="getSequenceForElement(num: number): string" />

<MemberMeta sourceHref="/source/bags/activitysequence-js/#L245" sourceLabel="ActivitySequence.js:245" />

Finds the nearest sequence element with a valid 'tag', looking back in the `elements` list.

**Parameters**

- `num` (number) — The point of the sequence from which to start looking back.

**Returns**

- `string`

<MemberHeading
  id="getelementbyactivityname"
  depth="3"
  name="getElementByActivityName"
  sig="getElementByActivityName(
	activity: string,
): module:bags/ActivitySequenceElement.ActivitySequenceElement"
/>

<MemberMeta sourceHref="/source/bags/activitysequence-js/#L261" sourceLabel="ActivitySequence.js:261" />

Gets the first [ActivitySequenceElement](/module/bags-activitysequenceelement#activitysequenceelement) in the `elements` list pointing to the\
specified activity name.\
The search is always case-insensitive.

**Parameters**

- `activity` (string) — The name of the activity to search for.

**Returns**

- [`module:bags/ActivitySequenceElement.ActivitySequenceElement`](/module/bags-activitysequenceelement#activitysequenceelement) — The requested element or `null` if not found.

<MemberHeading id="checkcurrentactivity" depth="3" name="checkCurrentActivity" sig="checkCurrentActivity(activity: string)" />

<MemberMeta sourceHref="/source/bags/activitysequence-js/#L278" sourceLabel="ActivitySequence.js:278" />

Utility function to check if the current sequence element corresponds to the specified\
activity. If negative, the `currentAct` will be accordingly set.

**Parameters**

- `activity` (string) — The name of the activity to check

## Instance Fields

<MemberHeading id="elements" depth="3" name="elements" sig="elements: Array.<module:bags/ActivitySequenceElement.ActivitySequenceElement>" />

<MemberMeta sourceHref="/source/bags/activitysequence-js/#L304" sourceLabel="ActivitySequence.js:304" />

The ordered list of [ActivitySequenceElement](/module/bags-activitysequenceelement#activitysequenceelement) objects

<MemberHeading id="project" depth="3" name="project" sig="project: module:project/JClicProject.JClicProject" />

<MemberMeta sourceHref="/source/bags/activitysequence-js/#L309" sourceLabel="ActivitySequence.js:309" />

The JClic project to which this ActivitySequence belongs.

<MemberHeading id="currentact" depth="3" name="currentAct" sig="currentAct: number" />

<MemberMeta sourceHref="/source/bags/activitysequence-js/#L315" sourceLabel="ActivitySequence.js:315" />

Pointer to the [ActivitySequenceElement](/module/bags-activitysequenceelement#activitysequenceelement) currently running (points inside\
the `elements` array).
