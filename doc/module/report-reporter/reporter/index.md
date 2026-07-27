---
title: Reporter
kind: class
longname: module:report/Reporter.Reporter
description: "This class implements the basic operations related with the processing of times and scores done by users playing JClic activities. These operations include: identification of users, compilation of data coming from the activities, storage of this data for later use, and presentation of summarized results."
---

# Reporter

<SourceLink href="/source/report/reporter-js/#L44" label="Reporter.js:44" />

This class implements the basic operations related with the processing of times and scores\
done by users playing JClic activities. These operations include: identification of users,\
compilation of data coming from the activities, storage of this data for later use, and\
presentation of summarized results.

---

## Constructor

<Signature code="new Reporter(ps: module:JClicPlayer.JClicPlayer): Reporter" />

Reporter constructor

**Parameters**

- `ps` ([module:JClicPlayer.JClicPlayer](/module/jclicplayer#jclicplayer)) — The [JClicPlayer](/module/jclicplayer#jclicplayer) used to retrieve localized messages

---

## Instance Methods

<MemberHeading id="getinfo" depth="3" name="getInfo" sig="getInfo(): module:report/Reporter.ReporterInfo" />

<MemberMeta sourceHref="/source/report/reporter-js/#L94" sourceLabel="Reporter.js:94" />

Returns the `info` element associated to this Reporter.

**Returns**

- [`module:report/Reporter.ReporterInfo`](/module/report-reporter#reporterinfo)

<MemberHeading id="getproperty" depth="3" name="getProperty" sig="getProperty(key: string, +: string): string" />

<MemberMeta sourceHref="/source/report/reporter-js/#L104" sourceLabel="Reporter.js:104" />

Gets a specific property from this reporting system

**Parameters**

- `key` (string) — Requested property
- `+` (string) — defaultValue - Default return value when requested property does not exist

**Returns**

- `string`

<MemberHeading id="getbooleanproperty" depth="3" name="getBooleanProperty" sig="getBooleanProperty(key: string, +: boolean): boolean" />

<MemberMeta sourceHref="/source/report/reporter-js/#L114" sourceLabel="Reporter.js:114" />

Gets a specific boolean property from this reporting system

**Parameters**

- `key` (string) — Requested property
- `+` (boolean) — defaultValue - Default return when requested property does not exist

**Returns**

- `boolean`

<MemberHeading id="getgroups" depth="3" name="getGroups" sig="getGroups(): external:Promise" />

<MemberMeta sourceHref="/source/report/reporter-js/#L124" sourceLabel="Reporter.js:124" />

Gets the list of groups or organizations currently registered in the system. This\
method should be implemented by classes derived of `Reporter`.

**Returns**

- [`external:Promise`](/module/utils#promise)

<MemberHeading id="getusers" depth="3" name="getUsers" sig="getUsers(+: string): external:Promise" />

<MemberMeta sourceHref="/source/report/reporter-js/#L135" sourceLabel="Reporter.js:135" />

Gets the list of users currently registered in the system, optionally filtered by\
a specific group ID. This method should be implemented by classes derived of `Reporter`.

**Parameters**

- `+` (string) — groupId - Optional group ID to be used as a filter criteria

**Returns**

- [`external:Promise`](/module/utils#promise)

<MemberHeading id="getuserdata" depth="3" name="getUserData" sig="getUserData(_userId: string): external:Promise" />

<MemberMeta sourceHref="/source/report/reporter-js/#L145" sourceLabel="Reporter.js:145" />

Gets extended data associated with a specific user. This is a method intended to be\
implemented in subclasses.

**Parameters**

- `_userId` (string) — The requested user ID

**Returns**

- [`external:Promise`](/module/utils#promise)

<MemberHeading id="getgroupdata" depth="3" name="getGroupData" sig="getGroupData(_groupId: string): external:Promise" />

<MemberMeta sourceHref="/source/report/reporter-js/#L155" sourceLabel="Reporter.js:155" />

Gets extended data associated with a specific group or organization. This\
is a method intended to be implemented in subclasses.

**Parameters**

- `_groupId` (string) — The requested group ID

**Returns**

- [`external:Promise`](/module/utils#promise)

<MemberHeading id="userbased" depth="3" name="userBased" sig="userBased(): boolean" />

<MemberMeta sourceHref="/source/report/reporter-js/#L163" sourceLabel="Reporter.js:163" />

Checks if this reporting system manages its own database of users and groups. Defaults to `false`

**Returns**

- `boolean`

<MemberHeading id="promptfornewgroup" depth="3" name="promptForNewGroup" sig="promptForNewGroup(): external:Promise" />

<MemberMeta sourceHref="/source/report/reporter-js/#L173" sourceLabel="Reporter.js:173" />

Allows the current user to create a new group, and asks his name

**Returns**

- [`external:Promise`](/module/utils#promise)

<MemberHeading id="promptfornewuser" depth="3" name="promptForNewUser" sig="promptForNewUser(): external:Promise" />

<MemberMeta sourceHref="/source/report/reporter-js/#L183" sourceLabel="Reporter.js:183" />

Allows the current user to create a new user ID, and asks his ID and password

**Returns**

- [`external:Promise`](/module/utils#promise)

<MemberHeading id="promptgroupid" depth="3" name="promptGroupId" sig="promptGroupId(): external:Promise" />

<MemberMeta sourceHref="/source/report/reporter-js/#L192" sourceLabel="Reporter.js:192" />

Allows the current user to select its group or organization from the current groups list

**Returns**

- [`external:Promise`](/module/utils#promise)

<MemberHeading id="promptuserid" depth="3" name="promptUserId" sig="promptUserId(+: boolean): external:Promise" />

<MemberMeta sourceHref="/source/report/reporter-js/#L227" sourceLabel="Reporter.js:227" />

Asks for a valid user ID fulfilling the promise if found, rejecting it otherwise

**Parameters**

- `+` (boolean) — forcePrompt - Prompt also if `userId` is already defined (default is `false`)

**Returns**

- [`external:Promise`](/module/utils#promise)

<MemberHeading id="getdata" depth="3" name="getData" sig="getData(): object" />

<MemberMeta sourceHref="/source/report/reporter-js/#L302" sourceLabel="Reporter.js:302" />

Builds a complex object containing all the results reported while playing activities

**Returns**

- `object`

<MemberHeading id="init" depth="3" name="init" sig="init(options?: object): external:Promise" />

<MemberMeta sourceHref="/source/report/reporter-js/#L346" sourceLabel="Reporter.js:346" />

Initializes this report system with an optional set of parameters.\
Returns a Promise, fulfilled when the reporter is fully initialized.

**Parameters**

- `options` (object, optional) — Initial settings passed to the reporting system

**Returns**

- [`external:Promise`](/module/utils#promise)

<MemberHeading id="end" depth="3" name="end" sig="end(): external:Promise" />

<MemberMeta sourceHref="/source/report/reporter-js/#L368" sourceLabel="Reporter.js:368" />

Closes this reporting system

**Returns**

- [`external:Promise`](/module/utils#promise)

<MemberHeading id="endsequence" depth="3" name="endSequence" sig="endSequence()" />

<MemberMeta sourceHref="/source/report/reporter-js/#L377" sourceLabel="Reporter.js:377" />

Finalizes the current sequence

<MemberHeading id="endsession" depth="3" name="endSession" sig="endSession()" />

<MemberMeta sourceHref="/source/report/reporter-js/#L387" sourceLabel="Reporter.js:387" />

Finalizes the current session

<MemberHeading id="newgroup" depth="3" name="newGroup" sig="newGroup(_gd: object)" />

<MemberMeta sourceHref="/source/report/reporter-js/#L396" sourceLabel="Reporter.js:396" />

Creates a new group (method to be implemented in subclasses)

**Parameters**

- `_gd` (object)

<MemberHeading id="newuser" depth="3" name="newUser" sig="newUser(_ud: object)" />

<MemberMeta sourceHref="/source/report/reporter-js/#L404" sourceLabel="Reporter.js:404" />

Creates a new user (method to be implemented in subclasses)

**Parameters**

- `_ud` (object)

<MemberHeading id="newsession" depth="3" name="newSession" sig="newSession(jcp: module:project/JClicProject.JClicProject)" />

<MemberMeta sourceHref="/source/report/reporter-js/#L412" sourceLabel="Reporter.js:412" />

This method should be invoked when a new session starts.

**Parameters**

- `jcp` ([module:project/JClicProject.JClicProject](/module/project-jclicproject#jclicproject)) — The [JClicProject](/module/project-jclicproject#jclicproject) this session refers to.

<MemberHeading
  id="newsequence"
  depth="3"
  name="newSequence"
  sig="newSequence(
	ase: module:bags/ActivitySequenceElement.ActivitySequenceElement,
)"
/>

<MemberMeta sourceHref="/source/report/reporter-js/#L423" sourceLabel="Reporter.js:423" />

This method should be invoked when a new sequence starts

**Parameters**

- `ase` ([module:bags/ActivitySequenceElement.ActivitySequenceElement](/module/bags-activitysequenceelement#activitysequenceelement)) — The [ActivitySequenceElement](/module/bags-activitysequenceelement#activitysequenceelement) referenced by this sequence.

<MemberHeading id="newactivity" depth="3" name="newActivity" sig="newActivity(act: module:Activity.Activity)" />

<MemberMeta sourceHref="/source/report/reporter-js/#L436" sourceLabel="Reporter.js:436" />

This method should be invoked when the user starts a new activity

**Parameters**

- `act` ([module:Activity.Activity](/module/activity#activity)) — The [Activity](/module/activity#activity) reporter has just started

<MemberHeading id="endactivity" depth="3" name="endActivity" sig="endActivity(score: number, numActions: number, solved: boolean)" />

<MemberMeta sourceHref="/source/report/reporter-js/#L450" sourceLabel="Reporter.js:450" />

This method should be called when the current activity finishes. Data about user's final results\
on the activity will then be saved.

**Parameters**

- `score` (number) — The final score, usually in a 0-100 scale.
- `numActions` (number) — The total number of actions done by the user to solve the activity
- `solved` (boolean) — `true` if the activity was finally solved, `false` otherwise.

<MemberHeading id="newaction" depth="3" name="newAction" sig="newAction(type: string, +: string, +: string, ok: boolean)" />

<MemberMeta sourceHref="/source/report/reporter-js/#L464" sourceLabel="Reporter.js:464" />

Reports a new action done by the user while playing the current activity

**Parameters**

- `type` (string) — Type of action (`click`, `write`, `move`, `select`...)
- `+` (string) — source - Description of the object on which the action is done.
- `+` (string) — dest - Description of the object reporter acts as a target of the action (usually in pairings)
- `ok` (boolean) — `true` if the action was OK, `false`, `null` or `undefined` otherwhise

<MemberHeading
  id="getcurrentsequenceinfo"
  depth="3"
  name="getCurrentSequenceInfo"
  sig="getCurrentSequenceInfo(
): module:report/SequenceReg.SequenceRegInfo"
/>

<MemberMeta sourceHref="/source/report/reporter-js/#L475" sourceLabel="Reporter.js:475" />

Gets information about the current sequence

**Returns**

- [`module:report/SequenceReg.SequenceRegInfo`](/module/report-sequencereg#sequencereginfo)

<MemberHeading id="getcurrentsequencetag" depth="3" name="getCurrentSequenceTag" sig="getCurrentSequenceTag(): string" />

<MemberMeta sourceHref="/source/report/reporter-js/#L483" sourceLabel="Reporter.js:483" />

Gets the name of the current sequence

**Returns**

- `string`

## Static Methods

<MemberHeading
  id="registerclass"
  depth="3"
  name="registerClass"
  sig="registerClass(
	reporterName: string,
	reporterClass: function,
): module:report/Reporter.Reporter"
/>

<MemberMeta badges="static" sourceHref="/source/report/reporter-js/#L63" sourceLabel="Reporter.js:63" />

Registers a new type of reporter

**Parameters**

- `reporterName` (string) — The name used to identify this reporter
- `reporterClass` (function) — The reporter class, usually extending Reporter

**Returns**

- [`module:report/Reporter.Reporter`](/module/report-reporter#reporter)

<MemberHeading
  id="getreporter"
  depth="3"
  name="getReporter"
  sig="getReporter(
	className: string,
	ps: module:JClicPlayer.JClicPlayer,
): module:report/Reporter.Reporter"
/>

<MemberMeta badges="static" sourceHref="/source/report/reporter-js/#L75" sourceLabel="Reporter.js:75" />

Creates a new Reporter of the requested class\
The resulting object must be prepared to operate with a call to its `init` method.

**Parameters**

- `className` (string) — Class name of the requested reporter. When `null`, a basic Reporter is created.
- `ps` ([module:JClicPlayer.JClicPlayer](/module/jclicplayer#jclicplayer)) — The [JClicPlayer](/module/jclicplayer#jclicplayer) used to retrieve localized messages

**Returns**

- [`module:report/Reporter.Reporter`](/module/report-reporter#reporter)

## Instance Fields

<MemberHeading id="info" depth="3" name="info" sig="info: module:report/Reporter.ReporterInfo" />

<MemberMeta sourceHref="/source/report/reporter-js/#L493" sourceLabel="Reporter.js:493" />

The [ReporterInfo](/module/report-reporter#reporterinfo) used to calculate and store global results.

<MemberHeading id="ps" depth="3" name="ps" sig="ps: module:JClicPlayer.JClicPlayer" />

<MemberMeta sourceHref="/source/report/reporter-js/#L498" sourceLabel="Reporter.js:498" />

The [JClicPlayer](/module/jclicplayer#jclicplayer) used to retrieve messages

<MemberHeading id="scorm" depth="3" name="SCORM" sig="SCORM" />

<MemberMeta sourceHref="/source/report/reporter-js/#L502" sourceLabel="Reporter.js:502" />

A valid SCORM bridge, or `null` if no SCORM API detected.

<MemberHeading id="userid" depth="3" name="userId" sig="userId: string" />

<MemberMeta sourceHref="/source/report/reporter-js/#L507" sourceLabel="Reporter.js:507" />

User ID currently associated with this reporting system

<MemberHeading id="sessionkey" depth="3" name="sessionKey" sig="sessionKey: string" />

<MemberMeta sourceHref="/source/report/reporter-js/#L512" sourceLabel="Reporter.js:512" />

Optional key to be added as a field in session records

<MemberHeading id="sessioncontext" depth="3" name="sessionContext" sig="sessionContext: string" />

<MemberMeta sourceHref="/source/report/reporter-js/#L517" sourceLabel="Reporter.js:517" />

A second optional key to be reported as a field in session records

<MemberHeading id="groupcodefilter" depth="3" name="groupCodeFilter" sig="groupCodeFilter: string" />

<MemberMeta sourceHref="/source/report/reporter-js/#L522" sourceLabel="Reporter.js:522" />

Optional filter key to be used in the group selection dialog

<MemberHeading id="usercodefilter" depth="3" name="userCodeFilter" sig="userCodeFilter: string" />

<MemberMeta sourceHref="/source/report/reporter-js/#L527" sourceLabel="Reporter.js:527" />

Another optional filter key to be used in the user selection dialog

<MemberHeading id="descriptionkey" depth="3" name="descriptionKey" sig="descriptionKey: string" />

<MemberMeta sourceHref="/source/report/reporter-js/#L532" sourceLabel="Reporter.js:532" />

Description of this reporting system

<MemberHeading id="descriptiondetail" depth="3" name="descriptionDetail" sig="descriptionDetail: string" />

<MemberMeta sourceHref="/source/report/reporter-js/#L537" sourceLabel="Reporter.js:537" />

Additional info to display after the reporter's `description`

<MemberHeading id="started" depth="3" name="started" sig="started: external:Date" />

<MemberMeta sourceHref="/source/report/reporter-js/#L542" sourceLabel="Reporter.js:542" />

Starting date and time of this report

<MemberHeading id="sessions" depth="3" name="sessions" sig="sessions: Array.<module:report/SessionReg.SessionReg>" />

<MemberMeta sourceHref="/source/report/reporter-js/#L547" sourceLabel="Reporter.js:547" />

Array of sessions included in this report

<MemberHeading id="currentsession" depth="3" name="currentSession" sig="currentSession: module:report/SessionReg.SessionReg" />

<MemberMeta sourceHref="/source/report/reporter-js/#L552" sourceLabel="Reporter.js:552" />

Currently active session

<MemberHeading id="initiated" depth="3" name="initiated" sig="initiated: boolean" />

<MemberMeta sourceHref="/source/report/reporter-js/#L557" sourceLabel="Reporter.js:557" />

`true` if the system was successfully initiated, `false` otherwise

<MemberHeading id="buserbased" depth="3" name="bUserBased" sig="bUserBased: boolean" />

<MemberMeta sourceHref="/source/report/reporter-js/#L563" sourceLabel="Reporter.js:563" />

`true` if the system is connected to a database with user's data.\
When `false`, a generic ID will be used.

<MemberHeading id="maxuseridpromptattempts" depth="3" name="MAX_USERID_PROMPT_ATTEMPTS" sig="MAX_USERID_PROMPT_ATTEMPTS: number" />

<MemberMeta sourceHref="/source/report/reporter-js/#L568" sourceLabel="Reporter.js:568" />

Maximum number of incorrect UserID attempts

## Static Fields

<MemberHeading id="classes" depth="3" name="CLASSES" sig="CLASSES: object" />

<MemberMeta badges="static" sourceHref="/source/report/reporter-js/#L723" sourceLabel="Reporter.js:723" />

Static list of classes derived from Reporter. It should be filled by Reporter classes at declaration time.
