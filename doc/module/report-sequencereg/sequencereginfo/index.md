---
title: SequenceRegInfo
kind: class
longname: module:report/SequenceReg.SequenceRegInfo
description: This object stores the global results of a {@link module:report/SequenceReg.SequenceReg SequenceReg}
---

# SequenceRegInfo

<SourceLink href="/source/report/sequencereg-js/#L168" label="SequenceReg.js:168" />

This object stores the global results of a [SequenceReg](/module/report-sequencereg#sequencereg)

---

## Constructor

<Signature
  code="new SequenceRegInfo(
	sqReg: module:report/SequenceReg.SequenceReg,
): SequenceRegInfo"
/>

SequenceRegInfo constructor

**Parameters**

- `sqReg` ([module:report/SequenceReg.SequenceReg](/module/report-sequencereg#sequencereg)) — The [SequenceReg](/module/report-sequencereg#sequencereg) associated tho this `Info` object.

---

## Instance Methods

<MemberHeading id="clear" depth="3" name="clear" sig="clear()" />

<MemberMeta sourceHref="/source/report/sequencereg-js/#L180" sourceLabel="SequenceReg.js:180" />

Clears all global data associated with this sequence

<MemberHeading id="recalc" depth="3" name="recalc" sig="recalc(): module:report/SequenceReg.SequenceRegInfo" />

<MemberMeta sourceHref="/source/report/sequencereg-js/#L190" sourceLabel="SequenceReg.js:190" />

Computes the value of all global variables based on the data stored in `activities`

**Returns**

- [`module:report/SequenceReg.SequenceRegInfo`](/module/report-sequencereg#sequencereginfo)

## Instance Fields

<MemberHeading id="sqreg" depth="3" name="sqReg" sig="sqReg: module:report/SequenceReg.SequenceReg" />

<MemberMeta sourceHref="/source/report/sequencereg-js/#L225" sourceLabel="SequenceReg.js:225" />

The [SequenceReg](/module/report-sequencereg#sequencereg) associated to this "info" object

<MemberHeading id="valid" depth="3" name="valid" sig="valid: boolean" />

<MemberMeta sourceHref="/source/report/sequencereg-js/#L230" sourceLabel="SequenceReg.js:230" />

When `false`, data must be recalculated

<MemberHeading id="nactivities" depth="3" name="nActivities" sig="nActivities: number" />

<MemberMeta sourceHref="/source/report/sequencereg-js/#L235" sourceLabel="SequenceReg.js:235" />

Number of activities played in this sequence

<MemberHeading id="nactclosed" depth="3" name="nActClosed" sig="nActClosed: number" />

<MemberMeta sourceHref="/source/report/sequencereg-js/#L240" sourceLabel="SequenceReg.js:240" />

Number of activities already closed

<MemberHeading id="nactsolved" depth="3" name="nActSolved" sig="nActSolved: number" />

<MemberMeta sourceHref="/source/report/sequencereg-js/#L245" sourceLabel="SequenceReg.js:245" />

Number of activities solved

<MemberHeading id="nactscore" depth="3" name="nActScore" sig="nActScore: number" />

<MemberMeta sourceHref="/source/report/sequencereg-js/#L250" sourceLabel="SequenceReg.js:250" />

Number of activities with score > 0

<MemberHeading id="ratiosolved" depth="3" name="ratioSolved" sig="ratioSolved: number" />

<MemberMeta sourceHref="/source/report/sequencereg-js/#L255" sourceLabel="SequenceReg.js:255" />

Percentage of solved activities

<MemberHeading id="nactions" depth="3" name="nActions" sig="nActions: number" />

<MemberMeta sourceHref="/source/report/sequencereg-js/#L260" sourceLabel="SequenceReg.js:260" />

Number of actions done by the user while in this sequence

<MemberHeading id="tscore" depth="3" name="tScore" sig="tScore: number" />

<MemberMeta sourceHref="/source/report/sequencereg-js/#L265" sourceLabel="SequenceReg.js:265" />

Sum of the scores of all the activities played

<MemberHeading id="ttime" depth="3" name="tTime" sig="tTime: number" />

<MemberMeta sourceHref="/source/report/sequencereg-js/#L270" sourceLabel="SequenceReg.js:270" />

Sum of the playing time reported by each activity (not always equals to the sequence's total time)
