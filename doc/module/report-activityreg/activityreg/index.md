---
title: ActivityReg
kind: class
longname: module:report/ActivityReg.ActivityReg
description: This class stores miscellaneous data obtained by the current user playing an {@link module:Activity.Activity Activity}.
---

# ActivityReg

<SourceLink href="/source/report/activityreg-js/#L39" label="ActivityReg.js:39" />

This class stores miscellaneous data obtained by the current user playing an [Activity](/module/activity#activity).

---

## Constructor

<Signature code="new ActivityReg(act: module:Activity.Activity): ActivityReg" />

ActivityReg constructor

**Parameters**

- `act` ([module:Activity.Activity](/module/activity#activity)) — The [Activity](/module/activity#activity) referenced by this object.

---

## Instance Methods

<MemberHeading id="getxml" depth="3" name="$getXML" sig="$getXML(): external:jQuery" />

<MemberMeta sourceHref="/source/report/activityreg-js/#L58" sourceLabel="ActivityReg.js:58" />

Provides the data associated with the current activity in an XML format suitable for a\
[JClic Reports Server](http://clic.xtec.cat/en/jclic/reports/).

**Returns**

- [`external:jQuery`](/module/utils#jquery)

<MemberHeading id="getdata" depth="3" name="getData" sig="getData(): object" />

<MemberMeta sourceHref="/source/report/activityreg-js/#L87" sourceLabel="ActivityReg.js:87" />

Builds an object with relevant data about the results obtained by the current student in this activity

**Returns**

- `object`

<MemberHeading id="setproperties" depth="3" name="setProperties" sig="setProperties($xml: external:jQuery)" />

<MemberMeta sourceHref="/source/report/activityreg-js/#L107" sourceLabel="ActivityReg.js:107" />

Fills this ActivityReg with data provided in XML format

**Parameters**

- `$xml` ([external:jQuery](/module/utils#jquery)) — The XML element to be processed, already wrapped as jQuery object

<MemberHeading id="newaction" depth="3" name="newAction" sig="newAction(type: string, +: string, +: string, ok: boolean)" />

<MemberMeta sourceHref="/source/report/activityreg-js/#L142" sourceLabel="ActivityReg.js:142" />

Reports a new action done by the user while playing the current activity

**Parameters**

- `type` (string) — Type of action (`click`, `write`, `move`, `select`...)
- `+` (string) — source - Description of the object on which the action is done.
- `+` (string) — dest - Description of the object that acts as a target of the action (used in pairings)
- `ok` (boolean) — `true` if the action was OK, `false`, `null` or `undefined` otherwise

<MemberHeading id="getactionreg" depth="3" name="getActionReg" sig="getActionReg(index: number): module:report/ActionReg.ActionReg" />

<MemberMeta sourceHref="/source/report/activityreg-js/#L154" sourceLabel="ActivityReg.js:154" />

Retrieves a specific [ActionReg](/module/report-actionreg#actionreg) element from `actions`

**Parameters**

- `index` (number) — The nth action to be retrieved

**Returns**

- [`module:report/ActionReg.ActionReg`](/module/report-actionreg#actionreg)

<MemberHeading id="closeactivity" depth="3" name="closeActivity" sig="closeActivity()" />

<MemberMeta sourceHref="/source/report/activityreg-js/#L161" sourceLabel="ActivityReg.js:161" />

Closes the current activity, adjusting total time if needed

<MemberHeading id="getprecision" depth="3" name="getPrecision" sig="getPrecision(): number" />

<MemberMeta sourceHref="/source/report/activityreg-js/#L177" sourceLabel="ActivityReg.js:177" />

calculates the final score obtained by the user in this activity.\
The algorithm used takes in account the minimal number of actions needed, the actions\
really done by the user, and if the activity was finally solved or not.

**Returns**

- `number`

<MemberHeading id="endactivity" depth="3" name="endActivity" sig="endActivity(score: number, numActions: number, solved: boolean)" />

<MemberMeta sourceHref="/source/report/activityreg-js/#L198" sourceLabel="ActivityReg.js:198" />

This method should be called when the current activity finishes. Data about user's final results\
on the activity will then be saved.

**Parameters**

- `score` (number) — The final score, usually in a 0-100 scale.
- `numActions` (number) — The total number of actions done by the user to solve the activity
- `solved` (boolean) — `true` if the activity was finally solved, `false` otherwise.

## Instance Fields

<MemberHeading id="name" depth="3" name="name" sig="name: string" />

<MemberMeta sourceHref="/source/report/activityreg-js/#L213" sourceLabel="ActivityReg.js:213" />

Name of the associated activity

<MemberHeading id="code" depth="3" name="code" sig="code: string" />

<MemberMeta sourceHref="/source/report/activityreg-js/#L218" sourceLabel="ActivityReg.js:218" />

Optional code assigned to this activity, used for later filtering

<MemberHeading id="starttime" depth="3" name="startTime" sig="startTime: number" />

<MemberMeta sourceHref="/source/report/activityreg-js/#L223" sourceLabel="ActivityReg.js:223" />

Timestamp when the user starts playing the activity

<MemberHeading id="totaltime" depth="3" name="totalTime" sig="totalTime: number" />

<MemberMeta sourceHref="/source/report/activityreg-js/#L228" sourceLabel="ActivityReg.js:228" />

Total time spent by the user in the activity, measured in milliseconds

<MemberHeading id="actions" depth="3" name="actions" sig="actions: Array.<module:report/ActionReg.ActionReg>" />

<MemberMeta sourceHref="/source/report/activityreg-js/#L233" sourceLabel="ActivityReg.js:233" />

Collection of actions done by the user while playing the activity

<MemberHeading id="solved" depth="3" name="solved" sig="solved: boolean" />

<MemberMeta sourceHref="/source/report/activityreg-js/#L238" sourceLabel="ActivityReg.js:238" />

`true` only when the user has finished and solved the activity

<MemberHeading id="lastaction" depth="3" name="lastAction" sig="lastAction: module:report/ActionReg.ActionReg" />

<MemberMeta sourceHref="/source/report/activityreg-js/#L243" sourceLabel="ActivityReg.js:243" />

Last [ActionReg](/module/report-actionreg#actionreg) performed by the user in this activity

<MemberHeading id="score" depth="3" name="score" sig="score: number" />

<MemberMeta sourceHref="/source/report/activityreg-js/#L248" sourceLabel="ActivityReg.js:248" />

Final score obtained by the current user in this activity

<MemberHeading id="minactions" depth="3" name="minActions" sig="minActions: number" />

<MemberMeta sourceHref="/source/report/activityreg-js/#L253" sourceLabel="ActivityReg.js:253" />

Minimum number of actions needed to solve the activity

<MemberHeading id="closed" depth="3" name="closed" sig="closed: boolean" />

<MemberMeta sourceHref="/source/report/activityreg-js/#L258" sourceLabel="ActivityReg.js:258" />

`true` when the activity has finished, `false` for the activity that is currently playing

<MemberHeading id="reportactions" depth="3" name="reportActions" sig="reportActions: boolean" />

<MemberMeta sourceHref="/source/report/activityreg-js/#L263" sourceLabel="ActivityReg.js:263" />

`true` when this type of activity should record specific actions done by the users

<MemberHeading id="numactions" depth="3" name="numActions" sig="numActions: number" />

<MemberMeta sourceHref="/source/report/activityreg-js/#L268" sourceLabel="ActivityReg.js:268" />

Number of actions done by the user playing this activity
