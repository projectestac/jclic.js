---
title: TCPReporter
kind: class
longname: module:report/TCPReporter.TCPReporter
description: This special case of {@link module:Reporter.Reporter Reporter} connects with an external service reporter providing the {@link https://github.com/projectestac/jclic/wiki/JClic-Reports-developers-guide JClic Reports API}. Connection parameters to the reports server ( path , service , userId , key , context ...) are passed through the options element of {@link module:JClicPlayer.JClicPlayer JClicPlayer} (acting as {@link module:JClicPlayer.JClicPlayer JClicPlayer}).
---

# TCPReporter

**Extends:&#x20;**`module:reports/Reporter.Reporter`

<SourceLink href="/source/report/tcpreporter-js/#L43" label="TCPReporter.js:43" />

This special case of `Reporter` connects with an external service reporter providing\
the [JClic Reports API](https://github.com/projectestac/jclic/wiki/JClic-Reports-developers-guide).\
Connection parameters to the reports server (`path`, `service`, `userId`, `key`, `context`...)\
are passed through the `options` element of [JClicPlayer](/module/jclicplayer#jclicplayer) (acting as [JClicPlayer](/module/jclicplayer#jclicplayer)).

---

## Constructor

<Signature code="new TCPReporter(ps: module:JClicPlayer.JClicPlayer): TCPReporter" />

TCPReporter constructor

**Parameters**

- `ps` ([module:JClicPlayer.JClicPlayer](/module/jclicplayer#jclicplayer)) — The [JClicPlayer](/module/jclicplayer#jclicplayer) used to retrieve settings and localized messages

---

## Instance Methods

<MemberHeading id="getproperty" depth="3" name="getProperty" sig="getProperty(key: string, +: string): string" />

<MemberMeta sourceHref="/source/report/tcpreporter-js/#L60" sourceLabel="TCPReporter.js:60" />

Gets a specific property from this reporting system

**Parameters**

- `key` (string) — Requested property
- `+` (string) — defaultValue - Default return value when requested property does not exist

**Returns**

- `string`

<MemberHeading id="addtask" depth="3" name="addTask" sig="addTask(bean: module:report/TCPReporter.ReportBean)" />

<MemberMeta sourceHref="/source/report/tcpreporter-js/#L70" sourceLabel="TCPReporter.js:70" />

Adds a new element to the list of report beans pending to be transmitted.

**Parameters**

- `bean` ([module:report/TCPReporter.ReportBean](/module/report-tcpreporter#reportbean))

<MemberHeading id="flushtaskspromise" depth="3" name="flushTasksPromise" sig="flushTasksPromise(): external:Promise" />

<MemberMeta sourceHref="/source/report/tcpreporter-js/#L84" sourceLabel="TCPReporter.js:84" />

Transmits all report beans currently stored in `tasks` to the reports server

**Returns**

- [`external:Promise`](/module/utils#promise)

<MemberHeading id="init" depth="3" name="init" sig="init(options?: object): external:Promise" />

<MemberMeta sourceHref="/source/report/tcpreporter-js/#L148" sourceLabel="TCPReporter.js:148" />

Initializes this report system with an optional set of parameters.\
Returns a Promise, fulfilled when the reporter is fully initialized.

**Parameters**

- `options` (object, optional) — Initial settings passed to the reporting system

**Returns**

- [`external:Promise`](/module/utils#promise)

<MemberHeading id="newsession" depth="3" name="newSession" sig="newSession(jcp: module:project/JClicProject.JClicProject)" />

<MemberMeta sourceHref="/source/report/tcpreporter-js/#L208" sourceLabel="TCPReporter.js:208" />

This method should be invoked when a new session starts.

**Parameters**

- `jcp` ([module:project/JClicProject.JClicProject](/module/project-jclicproject#jclicproject)) — The [JClicProject](/module/project-jclicproject#jclicproject) this session refers to.

<MemberHeading id="createdbsession" depth="3" name="createDBSession" sig="createDBSession(forceNewSession: boolean): external:Promise" />

<MemberMeta sourceHref="/source/report/tcpreporter-js/#L222" sourceLabel="TCPReporter.js:222" />

Creates a new session in the remote database and records its ID for future use

**Parameters**

- `forceNewSession` (boolean) — When `true`, a new session will always be created.

**Returns**

- [`external:Promise`](/module/utils#promise)

<MemberHeading id="end" depth="3" name="end" sig="end(): external:Promise" />

<MemberMeta sourceHref="/source/report/tcpreporter-js/#L262" sourceLabel="TCPReporter.js:262" />

Closes this reporting system

**Returns**

- [`external:Promise`](/module/utils#promise)

<MemberHeading id="transaction" depth="3" name="transaction" sig="transaction($xml: external:jQuery): external:jqXHR" />

<MemberMeta sourceHref="/source/report/tcpreporter-js/#L274" sourceLabel="TCPReporter.js:274" />

Performs a transaction on the remote server

**Parameters**

- `$xml` ([external:jQuery](/module/utils#jquery)) — The XML element to be transmited, wrapped into a jQuery object

**Returns**

- [`external:jqXHR`](/module/utils#jqxhr)

<MemberHeading id="getgroups" depth="3" name="getGroups" sig="getGroups(): external:Promise" />

<MemberMeta sourceHref="/source/report/tcpreporter-js/#L292" sourceLabel="TCPReporter.js:292" />

Gets the list of current groups or organizations registered on this reporting system.

**Returns**

- [`external:Promise`](/module/utils#promise)

<MemberHeading id="getusers" depth="3" name="getUsers" sig="getUsers(+: string): external:Promise" />

<MemberMeta sourceHref="/source/report/tcpreporter-js/#L322" sourceLabel="TCPReporter.js:322" />

Gets the list of users currently registered in the system, optionally filtered by\
a specific group ID.

**Parameters**

- `+` (string) — groupId - Optional group ID to be used as a filter criteria

**Returns**

- [`external:Promise`](/module/utils#promise)

<MemberHeading id="getuserdata" depth="3" name="getUserData" sig="getUserData(userId: string): external:Promise" />

<MemberMeta sourceHref="/source/report/tcpreporter-js/#L354" sourceLabel="TCPReporter.js:354" />

Gets extended data associated with a specific user.

**Parameters**

- `userId` (string) — The requested user ID

**Returns**

- [`external:Promise`](/module/utils#promise)

<MemberHeading id="stopreporting" depth="3" name="stopReporting" sig="stopReporting(): external:Promise" />

<MemberMeta sourceHref="/source/report/tcpreporter-js/#L391" sourceLabel="TCPReporter.js:391" />

Stops the reporting system, usually as a result of repeated errors or because the player\
shuts down.

**Returns**

- [`external:Promise`](/module/utils#promise)

<MemberHeading id="reportactivity" depth="3" name="reportActivity" sig="reportActivity(flushNow: boolean)" />

<MemberMeta sourceHref="/source/report/tcpreporter-js/#L416" sourceLabel="TCPReporter.js:416" />

Prepares a [ReportBean](/module/report-tcpreporter#reportbean) object with information related to the current\
activity, and pushes it into the list of pending `tasks`, to be processed by the main `timer`.

**Parameters**

- `flushNow` (boolean) — When `true`, the activity data will be sent to server as soon as possible

<MemberHeading id="newactivity" depth="3" name="newActivity" sig="newActivity(act: module:Activity.Activity)" />

<MemberMeta sourceHref="/source/report/tcpreporter-js/#L446" sourceLabel="TCPReporter.js:446" />

This method should be invoked when the user starts a new activity

**Parameters**

- `act` ([module:Activity.Activity](/module/activity#activity)) — The [Activity](/module/activity#activity) reporter has just started

<MemberHeading id="endactivity" depth="3" name="endActivity" sig="endActivity(score: number, numActions: number, solved: boolean)" />

<MemberMeta sourceHref="/source/report/tcpreporter-js/#L459" sourceLabel="TCPReporter.js:459" />

This method should be called when the current activity finishes. Data about user's final results\
on the activity will then be saved.

**Parameters**

- `score` (number) — The final score, usually in a 0-100 scale.
- `numActions` (number) — The total number of actions done by the user to solve the activity
- `solved` (boolean) — `true` if the activity was finally solved, `false` otherwise.

## Instance Fields

<MemberHeading id="descriptionkey" depth="3" name="descriptionKey" sig="descriptionKey: string" />

<MemberMeta sourceHref="/source/report/tcpreporter-js/#L471" sourceLabel="TCPReporter.js:471" />

Description of this reporting system

<MemberHeading id="descriptiondetail" depth="3" name="descriptionDetail" sig="descriptionDetail: string" />

<MemberMeta sourceHref="/source/report/tcpreporter-js/#L477" sourceLabel="TCPReporter.js:477" />

Additional info to display after the reporter's `description`

<MemberHeading id="serverpath" depth="3" name="serverPath" sig="serverPath: string" />

<MemberMeta sourceHref="/source/report/tcpreporter-js/#L482" sourceLabel="TCPReporter.js:482" />

Main path of the reports server (without protocol nor service)

<MemberHeading id="beforeunloadfunction" depth="3" name="beforeUnloadFunction" sig="beforeUnloadFunction: function" />

<MemberMeta sourceHref="/source/report/tcpreporter-js/#L487" sourceLabel="TCPReporter.js:487" />

Function to be called by the browser before leaving the current page

<MemberHeading id="currentsessionid" depth="3" name="currentSessionId" sig="currentSessionId: string" />

<MemberMeta sourceHref="/source/report/tcpreporter-js/#L492" sourceLabel="TCPReporter.js:492" />

Identifier of the current session, provided by the server

<MemberHeading id="lastactivity" depth="3" name="lastActivity" sig="lastActivity: module:report/ActivityReg.ActivityReg" />

<MemberMeta sourceHref="/source/report/tcpreporter-js/#L497" sourceLabel="TCPReporter.js:497" />

Last activity reported

<MemberHeading id="actcount" depth="3" name="actCount" sig="actCount: number" />

<MemberMeta sourceHref="/source/report/tcpreporter-js/#L502" sourceLabel="TCPReporter.js:502" />

Number of activities processed

<MemberHeading id="serviceurl" depth="3" name="serviceUrl" sig="serviceUrl: string" />

<MemberMeta sourceHref="/source/report/tcpreporter-js/#L507" sourceLabel="TCPReporter.js:507" />

Service URL of the JClic Reports server

<MemberHeading id="dbproperties" depth="3" name="dbProperties" sig="dbProperties: object" />

<MemberMeta sourceHref="/source/report/tcpreporter-js/#L512" sourceLabel="TCPReporter.js:512" />

Object used to store specific properties of the connected reports system

<MemberHeading id="tasks" depth="3" name="tasks" sig="tasks: Array.<module:report/TCPReporter.ReportBean>" />

<MemberMeta sourceHref="/source/report/tcpreporter-js/#L517" sourceLabel="TCPReporter.js:517" />

List of [ReportBean](/module/report-tcpreporter#reportbean) objects pending to be processed

<MemberHeading id="waitingtasks" depth="3" name="waitingTasks" sig="waitingTasks: Array.<module:report/TCPReporter.ReportBean>" />

<MemberMeta sourceHref="/source/report/tcpreporter-js/#L522" sourceLabel="TCPReporter.js:522" />

Waiting list of tasks, to be used while `tasks` is being processed

<MemberHeading id="processingtasks" depth="3" name="processingTasks" sig="processingTasks: boolean" />

<MemberMeta sourceHref="/source/report/tcpreporter-js/#L527" sourceLabel="TCPReporter.js:527" />

Flag used to indicate if `transaction` is currently running

<MemberHeading id="forceflush" depth="3" name="forceFlush" sig="forceFlush: boolean" />

<MemberMeta sourceHref="/source/report/tcpreporter-js/#L532" sourceLabel="TCPReporter.js:532" />

Force processing of pending tasks as soon as possible

<MemberHeading id="timer" depth="3" name="timer" sig="timer: number" />

<MemberMeta sourceHref="/source/report/tcpreporter-js/#L537" sourceLabel="TCPReporter.js:537" />

Identifier of the background function obtained with a call to `window.setInterval`

<MemberHeading id="timerlap" depth="3" name="timerLap" sig="timerLap: number" />

<MemberMeta sourceHref="/source/report/tcpreporter-js/#L542" sourceLabel="TCPReporter.js:542" />

Time between calls to the background function, in seconds

<MemberHeading id="failcount" depth="3" name="failCount" sig="failCount: number" />

<MemberMeta sourceHref="/source/report/tcpreporter-js/#L547" sourceLabel="TCPReporter.js:547" />

Counter of unsuccessful connection attempts with the report server

<MemberHeading id="maxfails" depth="3" name="maxFails" sig="maxFails: number" />

<MemberMeta sourceHref="/source/report/tcpreporter-js/#L552" sourceLabel="TCPReporter.js:552" />

Maximum number of failed attempts allowed before disconnecting

<MemberHeading id="defaultserverpath" depth="3" name="DEFAULT_SERVER_PATH" sig="DEFAULT_SERVER_PATH: string" />

<MemberMeta sourceHref="/source/report/tcpreporter-js/#L557" sourceLabel="TCPReporter.js:557" />

Default path of JClic Reports Server

<MemberHeading id="defaultserverservice" depth="3" name="DEFAULT_SERVER_SERVICE" sig="DEFAULT_SERVER_SERVICE: string" />

<MemberMeta sourceHref="/source/report/tcpreporter-js/#L562" sourceLabel="TCPReporter.js:562" />

Default name for the reports service

<MemberHeading id="defaultserverprotocol" depth="3" name="DEFAULT_SERVER_PROTOCOL" sig="DEFAULT_SERVER_PROTOCOL: string" />

<MemberMeta sourceHref="/source/report/tcpreporter-js/#L568" sourceLabel="TCPReporter.js:568" />

Default server protocol\
Use always 'https' except when in 'http' and protocol not set in options

<MemberHeading id="defaulttimerlap" depth="3" name="DEFAULT_TIMER_LAP" sig="DEFAULT_TIMER_LAP: number" />

<MemberMeta sourceHref="/source/report/tcpreporter-js/#L573" sourceLabel="TCPReporter.js:573" />

Default lap between calls to `flushTasks`, in seconds
