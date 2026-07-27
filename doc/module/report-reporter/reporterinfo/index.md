---
title: ReporterInfo
kind: class
longname: module:report/Reporter.ReporterInfo
description: This object stores the global results of a {@link module:Reporter.Reporter Reporter}
---

# ReporterInfo

<SourceLink href="/source/report/reporter-js/#L574" label="Reporter.js:574" />

This object stores the global results of a `Reporter`

---

## Constructor

<Signature
  code="new ReporterInfo(
	rep: module:report/Reporter.Reporter,
): ReporterInfo"
/>

ReporterInfo constructor

**Parameters**

- `rep` ([module:report/Reporter.Reporter](/module/report-reporter#reporter)) — The `Reporter` associated tho this `Info` object.

---

## Instance Methods

<MemberHeading id="clear" depth="3" name="clear" sig="clear()" />

<MemberMeta sourceHref="/source/report/reporter-js/#L586" sourceLabel="Reporter.js:586" />

Clears all data associated with this ReporterInfo

<MemberHeading id="recalc" depth="3" name="recalc" sig="recalc(): module:report/Reporter.ReporterInfo" />

<MemberMeta sourceHref="/source/report/reporter-js/#L597" sourceLabel="Reporter.js:597" />

Computes the value of all global variables based on the data stored in `sessions`

**Returns**

- [`module:report/Reporter.ReporterInfo`](/module/report-reporter#reporterinfo)

## Instance Fields

<MemberHeading id="rep" depth="3" name="rep" sig="rep: module:report/Reporter.Reporter" />

<MemberMeta sourceHref="/source/report/reporter-js/#L638" sourceLabel="Reporter.js:638" />

The Reporter linked to this Info object

<MemberHeading id="valid" depth="3" name="valid" sig="valid: boolean" />

<MemberMeta sourceHref="/source/report/reporter-js/#L643" sourceLabel="Reporter.js:643" />

When `false`, data must be recalculated

<MemberHeading id="numsessions" depth="3" name="numSessions" sig="numSessions: number" />

<MemberMeta sourceHref="/source/report/reporter-js/#L648" sourceLabel="Reporter.js:648" />

Number of sessions registered

<MemberHeading id="numsequences" depth="3" name="numSequences" sig="numSequences: number" />

<MemberMeta sourceHref="/source/report/reporter-js/#L653" sourceLabel="Reporter.js:653" />

Number of sequences played

<MemberHeading id="nactivities" depth="3" name="nActivities" sig="nActivities: number" />

<MemberMeta sourceHref="/source/report/reporter-js/#L658" sourceLabel="Reporter.js:658" />

Number of activities played

<MemberHeading id="reportableacts" depth="3" name="reportableActs" sig="reportableActs: number" />

<MemberMeta sourceHref="/source/report/reporter-js/#L663" sourceLabel="Reporter.js:663" />

Number of activities in existing in the played projects suitable to be reported

<MemberHeading id="nactsolved" depth="3" name="nActSolved" sig="nActSolved: number" />

<MemberMeta sourceHref="/source/report/reporter-js/#L668" sourceLabel="Reporter.js:668" />

Number of activities solved

<MemberHeading id="nactplayed" depth="3" name="nActPlayed" sig="nActPlayed: number" />

<MemberMeta sourceHref="/source/report/reporter-js/#L673" sourceLabel="Reporter.js:673" />

Number of different activities played

<MemberHeading id="nactscore" depth="3" name="nActScore" sig="nActScore: number" />

<MemberMeta sourceHref="/source/report/reporter-js/#L678" sourceLabel="Reporter.js:678" />

Global score obtained in all sessions registered by this reporter

<MemberHeading id="nactions" depth="3" name="nActions" sig="nActions: number" />

<MemberMeta sourceHref="/source/report/reporter-js/#L683" sourceLabel="Reporter.js:683" />

Number of actions done by the user while in this working session

<MemberHeading id="ratiosolved" depth="3" name="ratioSolved" sig="ratioSolved: number" />

<MemberMeta sourceHref="/source/report/reporter-js/#L688" sourceLabel="Reporter.js:688" />

Percentage of solved activities

<MemberHeading id="ratioplayed" depth="3" name="ratioPlayed" sig="ratioPlayed: number" />

<MemberMeta sourceHref="/source/report/reporter-js/#L693" sourceLabel="Reporter.js:693" />

Percentage of reportable activities played

<MemberHeading id="tscore" depth="3" name="tScore" sig="tScore: number" />

<MemberMeta sourceHref="/source/report/reporter-js/#L698" sourceLabel="Reporter.js:698" />

Sum of the scores of all the activities played

<MemberHeading id="partialscore" depth="3" name="partialScore" sig="partialScore: number" />

<MemberMeta sourceHref="/source/report/reporter-js/#L703" sourceLabel="Reporter.js:703" />

Global score obtained

<MemberHeading id="ttime" depth="3" name="tTime" sig="tTime: number" />

<MemberMeta sourceHref="/source/report/reporter-js/#L708" sourceLabel="Reporter.js:708" />

Sum of the playing time reported by each activity (not always equals to the sum of all session's time)

<MemberHeading id="globalscore" depth="3" name="globalScore" sig="globalScore: number" />

<MemberMeta sourceHref="/source/report/reporter-js/#L714" sourceLabel="Reporter.js:714" />

Final score based on the percent of reportable activities played. If the user plays all the\
activities, this result equals to `partialScore`.
