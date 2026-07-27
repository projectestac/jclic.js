---
title: SessionReg
kind: class
longname: module:report/SessionReg.SessionReg
description: This class encapsulates data of a user's working session, usually associated to a single {@link module:project/JClicProject.JClicProject JClicProject} It's main component is sequences , an array of {@link module:report/SequenceReg.SequenceReg SequenceReg} objects.
---

# SessionReg

<SourceLink href="/source/report/sessionreg-js/#L38" label="SessionReg.js:38" />

This class encapsulates data of a user's working session, usually associated to a single [JClicProject](/module/project-jclicproject#jclicproject)\
It's main component is `sequences`, an array of [SequenceReg](/module/report-sequencereg#sequencereg) objects.

---

## Constructor

<Signature
  code="new SessionReg(
	project: module:project/JClicProject.JClicProject,
	code?: string,
): SessionReg"
/>

SessionReg constructor

**Parameters**

- `project` ([module:project/JClicProject.JClicProject](/module/project-jclicproject#jclicproject)) — The JClicProject referenced by this session.
- `code` (string, optional) — Optional code to be used by this SessionReg

---

## Instance Methods

<MemberHeading id="getdata" depth="3" name="getData" sig="getData(recalcInfo: boolean, includeEmpty: boolean): object" />

<MemberMeta sourceHref="/source/report/sessionreg-js/#L61" sourceLabel="SessionReg.js:61" />

Builds a complex object with the results of all activities done during this working session

**Parameters**

- `recalcInfo` (boolean) — When `true`, global variables (number of sequences, score, total time...)\
  will be recalculated from the data stored in the [SequenceReg](/module/report-sequencereg#sequencereg) objects.
- `includeEmpty` (boolean) — When `true`, sequences without reported activities will be also included in the results

**Returns**

- `object`

<MemberHeading id="getinfo" depth="3" name="getInfo" sig="getInfo(): module:report/SessionReg.SessionRegInfo" />

<MemberMeta sourceHref="/source/report/sessionreg-js/#L89" sourceLabel="SessionReg.js:89" />

Returns the `info` element associated to this SessionReg.

**Returns**

- [`module:report/SessionReg.SessionRegInfo`](/module/report-sessionreg#sessionreginfo)

<MemberHeading id="end" depth="3" name="end" sig="end()" />

<MemberMeta sourceHref="/source/report/sessionreg-js/#L96" sourceLabel="SessionReg.js:96" />

Closes this session

<MemberHeading id="endsequence" depth="3" name="endSequence" sig="endSequence()" />

<MemberMeta sourceHref="/source/report/sessionreg-js/#L103" sourceLabel="SessionReg.js:103" />

This method should be called when the current working session finishes.

<MemberHeading
  id="newsequence"
  depth="3"
  name="newSequence"
  sig="newSequence(
	ase: module:bags/ActivitySequenceElement.ActivitySequenceElement,
)"
/>

<MemberMeta sourceHref="/source/report/sessionreg-js/#L114" sourceLabel="SessionReg.js:114" />

This method should be invoked when a new sequence starts

**Parameters**

- `ase` ([module:bags/ActivitySequenceElement.ActivitySequenceElement](/module/bags-activitysequenceelement#activitysequenceelement)) — The [ActivitySequenceElement](/module/bags-activitysequenceelement#activitysequenceelement) referenced by this sequence.

<MemberHeading id="newactivity" depth="3" name="newActivity" sig="newActivity(act: module:Activity.Activity)" />

<MemberMeta sourceHref="/source/report/sessionreg-js/#L125" sourceLabel="SessionReg.js:125" />

This method should be invoked when the user starts a new activity

**Parameters**

- `act` ([module:Activity.Activity](/module/activity#activity)) — The [Activity](/module/activity#activity) that has just started

<MemberHeading id="endactivity" depth="3" name="endActivity" sig="endActivity(score: number, numActions: number, solved: boolean)" />

<MemberMeta sourceHref="/source/report/sessionreg-js/#L142" sourceLabel="SessionReg.js:142" />

This method should be called when the current activity finishes. Data about user's final results\
on the activity will then be saved.

**Parameters**

- `score` (number) — The final score, usually in a 0-100 scale.
- `numActions` (number) — The total number of actions done by the user to solve the activity
- `solved` (boolean) — `true` if the activity was finally solved, `false` otherwise.

<MemberHeading id="newaction" depth="3" name="newAction" sig="newAction(type: string, +: string, +: string, ok: boolean)" />

<MemberMeta sourceHref="/source/report/sessionreg-js/#L156" sourceLabel="SessionReg.js:156" />

Reports a new action done by the user while playing the current activity

**Parameters**

- `type` (string) — Type of action (`click`, `write`, `move`, `select`...)
- `+` (string) — source - Description of the object on which the action is done.
- `+` (string) — dest - Description of the object that acts as a target of the action (used in pairings)
- `ok` (boolean) — `true` if the action was OK, `false`, `null` or `undefined` otherwise

<MemberHeading id="getcurrentsequencetag" depth="3" name="getCurrentSequenceTag" sig="getCurrentSequenceTag(): string" />

<MemberMeta sourceHref="/source/report/sessionreg-js/#L167" sourceLabel="SessionReg.js:167" />

Gets the name of the current sequence

**Returns**

- `string`

<MemberHeading
  id="getcurrentsequenceinfo"
  depth="3"
  name="getCurrentSequenceInfo"
  sig="getCurrentSequenceInfo(
): module:report/SequenceReg.SequenceRegInfo"
/>

<MemberMeta sourceHref="/source/report/sessionreg-js/#L175" sourceLabel="SessionReg.js:175" />

Gets information about the current sequence

**Returns**

- [`module:report/SequenceReg.SequenceRegInfo`](/module/report-sequencereg#sequencereginfo)

## Instance Fields

<MemberHeading id="reportableacts" depth="3" name="reportableActs" sig="reportableActs: number" />

<MemberMeta sourceHref="/source/report/sessionreg-js/#L185" sourceLabel="SessionReg.js:185" />

Number of activities suitable to be reported in this session

<MemberHeading id="actnames" depth="3" name="actNames" sig="actNames: Array.<string>" />

<MemberMeta sourceHref="/source/report/sessionreg-js/#L190" sourceLabel="SessionReg.js:190" />

Array with unique names of the activities being reported in this session

<MemberHeading id="sequences" depth="3" name="sequences" sig="sequences: Array.<module:report/SequenceReg.SequenceReg>" />

<MemberMeta sourceHref="/source/report/sessionreg-js/#L195" sourceLabel="SessionReg.js:195" />

List of sequences done in this session

<MemberHeading id="currentsequence" depth="3" name="currentSequence" sig="currentSequence: module:report/SequenceReg.SequenceReg" />

<MemberMeta sourceHref="/source/report/sessionreg-js/#L200" sourceLabel="SessionReg.js:200" />

The sequence currently active

<MemberHeading id="started" depth="3" name="started" sig="started: external:Date" />

<MemberMeta sourceHref="/source/report/sessionreg-js/#L205" sourceLabel="SessionReg.js:205" />

Starting date and time of this session

<MemberHeading id="projectname" depth="3" name="projectName" sig="projectName: string" />

<MemberMeta sourceHref="/source/report/sessionreg-js/#L210" sourceLabel="SessionReg.js:210" />

Name of the [JClicProject](/module/project-jclicproject#jclicproject) associated to this session

<MemberHeading id="info" depth="3" name="info" sig="info: module:report/SessionReg.SessionRegInfo" />

<MemberMeta sourceHref="/source/report/sessionreg-js/#L215" sourceLabel="SessionReg.js:215" />

Current session info

<MemberHeading id="code" depth="3" name="code" sig="code: string" />

<MemberMeta sourceHref="/source/report/sessionreg-js/#L220" sourceLabel="SessionReg.js:220" />

Optional code to be used with this session
