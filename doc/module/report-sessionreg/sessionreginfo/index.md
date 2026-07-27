---
title: SessionRegInfo
kind: class
longname: module:report/SessionReg.SessionRegInfo
description: This object stores the global results of a {@link module:report/SessionReg.SessionReg SessionReg}
---

# SessionRegInfo

<SourceLink href="/source/report/sessionreg-js/#L226" label="SessionReg.js:226" />

This object stores the global results of a [SessionReg](/module/report-sessionreg#sessionreg)

---

## Constructor

<Signature
  code="new SessionRegInfo(
	sReg: module:report/SessionReg.SessionReg,
): SessionRegInfo"
/>

SessionRegInfo constructor

**Parameters**

- `sReg` ([module:report/SessionReg.SessionReg](/module/report-sessionreg#sessionreg)) — The [SessionReg](/module/report-sessionreg#sessionreg) associated tho this `Info` object.

---

## Instance Methods

<MemberHeading id="clear" depth="3" name="clear" sig="clear()" />

<MemberMeta sourceHref="/source/report/sessionreg-js/#L238" sourceLabel="SessionReg.js:238" />

Clears all data associated with this working session

<MemberHeading id="recalc" depth="3" name="recalc" sig="recalc(): module:report/SessionReg.SessionRegInfo" />

<MemberMeta sourceHref="/source/report/sessionreg-js/#L248" sourceLabel="SessionReg.js:248" />

Computes the value of all global variables based on the data stored in `sequences`

**Returns**

- [`module:report/SessionReg.SessionRegInfo`](/module/report-sessionreg#sessionreginfo)

## Instance Fields

<MemberHeading id="sreg" depth="3" name="sReg" sig="sReg: module:report/SessionReg.SessionReg" />

<MemberMeta sourceHref="/source/report/sessionreg-js/#L285" sourceLabel="SessionReg.js:285" />

The SessionReg linked to this Info object

<MemberHeading id="valid" depth="3" name="valid" sig="valid: boolean" />

<MemberMeta sourceHref="/source/report/sessionreg-js/#L290" sourceLabel="SessionReg.js:290" />

When `false`, this session info needs to be recalculated

<MemberHeading id="numsequences" depth="3" name="numSequences" sig="numSequences: number" />

<MemberMeta sourceHref="/source/report/sessionreg-js/#L295" sourceLabel="SessionReg.js:295" />

Number of sequences played

<MemberHeading id="nactivities" depth="3" name="nActivities" sig="nActivities: number" />

<MemberMeta sourceHref="/source/report/sessionreg-js/#L300" sourceLabel="SessionReg.js:300" />

Number of activities played

<MemberHeading id="nactsolved" depth="3" name="nActSolved" sig="nActSolved: number" />

<MemberMeta sourceHref="/source/report/sessionreg-js/#L305" sourceLabel="SessionReg.js:305" />

Number of activities solved

<MemberHeading id="nactscore" depth="3" name="nActScore" sig="nActScore: number" />

<MemberMeta sourceHref="/source/report/sessionreg-js/#L310" sourceLabel="SessionReg.js:310" />

Number of activities with score > 0

<MemberHeading id="ratiosolved" depth="3" name="ratioSolved" sig="ratioSolved: number" />

<MemberMeta sourceHref="/source/report/sessionreg-js/#L315" sourceLabel="SessionReg.js:315" />

Percentage of solved activities

<MemberHeading id="ratioplayed" depth="3" name="ratioPlayed" sig="ratioPlayed: number" />

<MemberMeta sourceHref="/source/report/sessionreg-js/#L320" sourceLabel="SessionReg.js:320" />

Percentage of reportable activities played

<MemberHeading id="nactions" depth="3" name="nActions" sig="nActions: number" />

<MemberMeta sourceHref="/source/report/sessionreg-js/#L325" sourceLabel="SessionReg.js:325" />

Number of actions done by the user while in this working session

<MemberHeading id="tscore" depth="3" name="tScore" sig="tScore: number" />

<MemberMeta sourceHref="/source/report/sessionreg-js/#L330" sourceLabel="SessionReg.js:330" />

Sum of the scores of all the activities played

<MemberHeading id="ttime" depth="3" name="tTime" sig="tTime: number" />

<MemberMeta sourceHref="/source/report/sessionreg-js/#L335" sourceLabel="SessionReg.js:335" />

Sum of the playing time reported by each activity (not always equals to the session's total time)
