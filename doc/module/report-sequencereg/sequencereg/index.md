---
title: SequenceReg
kind: class
longname: module:report/SequenceReg.SequenceReg
description: This class stores the results of the activities related to an {@link module:bags/ActivitySequenceElement.ActivitySequenceElement ActivitySequenceElement}. It's main component is an array of {@link module:report/ActivityReg.ActivityReg ActivityReg} elements.
---

# SequenceReg

<SourceLink href="/source/report/sequencereg-js/#L38" label="SequenceReg.js:38" />

This class stores the results of the activities related to an [ActivitySequenceElement](/module/bags-activitysequenceelement#activitysequenceelement).\
It's main component is an array of [ActivityReg](/module/report-activityreg#activityreg) elements.

---

## Constructor

<Signature
  code="new SequenceReg(
	ase: module:bags/ActivitySequenceElement.ActivitySequenceElement,
): SequenceReg"
/>

SequenceReg constructor

**Parameters**

- `ase` ([module:bags/ActivitySequenceElement.ActivitySequenceElement](/module/bags-activitysequenceelement#activitysequenceelement)) — The [ActivitySequenceElement](/module/bags-activitysequenceelement#activitysequenceelement) related to this sequence.

---

## Instance Methods

<MemberHeading id="getdata" depth="3" name="getData" sig="getData(): object" />

<MemberMeta sourceHref="/source/report/sequencereg-js/#L57" sourceLabel="SequenceReg.js:57" />

Builds a complex object with data about the results of the activities done in this sequence

**Returns**

- `object`

<MemberHeading id="getinfo" depth="3" name="getInfo" sig="getInfo(): module:report/SequenceReg.SequenceRegInfo" />

<MemberMeta sourceHref="/source/report/sequencereg-js/#L70" sourceLabel="SequenceReg.js:70" />

Returns the `info` element associated to this SequenceReg.

**Returns**

- [`module:report/SequenceReg.SequenceRegInfo`](/module/report-sequencereg#sequencereginfo)

<MemberHeading id="endsequence" depth="3" name="endSequence" sig="endSequence()" />

<MemberMeta sourceHref="/source/report/sequencereg-js/#L77" sourceLabel="SequenceReg.js:77" />

This method should be called when the current working session finishes.

<MemberHeading id="newactivity" depth="3" name="newActivity" sig="newActivity(act: module:Activity.Activity)" />

<MemberMeta sourceHref="/source/report/sequencereg-js/#L90" sourceLabel="SequenceReg.js:90" />

This method should be invoked when the user starts a new activity

**Parameters**

- `act` ([module:Activity.Activity](/module/activity#activity)) — The [Activity](/module/activity#activity) that has just started

<MemberHeading id="endactivity" depth="3" name="endActivity" sig="endActivity(score: number, numActions: number, solved: boolean)" />

<MemberMeta sourceHref="/source/report/sequencereg-js/#L105" sourceLabel="SequenceReg.js:105" />

This method should be called when the current activity finishes. Data about user's final results\
on the activity will then be saved.

**Parameters**

- `score` (number) — The final score, usually in a 0-100 scale.
- `numActions` (number) — The total number of actions done by the user to solve the activity
- `solved` (boolean) — `true` if the activity was finally solved, `false` otherwise.

<MemberHeading id="newaction" depth="3" name="newAction" sig="newAction(type: string, +: string, +: string, ok: boolean)" />

<MemberMeta sourceHref="/source/report/sequencereg-js/#L119" sourceLabel="SequenceReg.js:119" />

Reports a new action done by the user while playing the current activity

**Parameters**

- `type` (string) — Type of action (`click`, `write`, `move`, `select`...)
- `+` (string) — source - Description of the object on which the action is done.
- `+` (string) — dest - Description of the object that acts as a target of the action (used in pairings)
- `ok` (boolean) — `true` if the action was OK, `false`, `null` or `undefined` otherwise

## Instance Fields

<MemberHeading id="name" depth="3" name="name" sig="name: string" />

<MemberMeta sourceHref="/source/report/sequencereg-js/#L132" sourceLabel="SequenceReg.js:132" />

The `tag` member of the associated [ActivitySequenceElement](/module/bags-activitysequenceelement#activitysequenceelement)

<MemberHeading id="description" depth="3" name="description" sig="description: string" />

<MemberMeta sourceHref="/source/report/sequencereg-js/#L137" sourceLabel="SequenceReg.js:137" />

Optional description given to the [ActivitySequenceElement](/module/bags-activitysequenceelement#activitysequenceelement)

<MemberHeading id="activities" depth="3" name="activities" sig="activities: Array.<module:report/ActivityReg.ActivityReg>" />

<MemberMeta sourceHref="/source/report/sequencereg-js/#L142" sourceLabel="SequenceReg.js:142" />

Collection of all the [ActivityReg](/module/report-activityreg#activityreg) elements done during this sequence.

<MemberHeading id="currentactivity" depth="3" name="currentActivity" sig="currentActivity: module:report/ActivityReg.ActivityReg" />

<MemberMeta sourceHref="/source/report/sequencereg-js/#L147" sourceLabel="SequenceReg.js:147" />

Registry linked to the [Activity](/module/activity#activity) that is currently running

<MemberHeading id="totaltime" depth="3" name="totalTime" sig="totalTime: number" />

<MemberMeta sourceHref="/source/report/sequencereg-js/#L152" sourceLabel="SequenceReg.js:152" />

Total time spent on the activities of this sequence

<MemberHeading id="closed" depth="3" name="closed" sig="closed: boolean" />

<MemberMeta sourceHref="/source/report/sequencereg-js/#L157" sourceLabel="SequenceReg.js:157" />

Flag indicating if the sequence is closed or already available for more activities

<MemberHeading id="info" depth="3" name="info" sig="info: module:report/SequenceReg.SequenceRegInfo" />

<MemberMeta sourceHref="/source/report/sequencereg-js/#L162" sourceLabel="SequenceReg.js:162" />

Object with global information associated to this sequence
