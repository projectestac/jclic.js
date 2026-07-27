---
title: SessionStorageReporter
kind: class
longname: module:report/SessionStorageReporter.SessionStorageReporter
description: This JClic {@link module:Reporter.Reporter Reporter} writes persistent data to the browser local session storage. It uses some of the {@link https://github.com/projectestac/jclic/wiki/JClic-Reports-developers-guide JClic Reports API}. Connection parameters ( key , context ...) are passed through the options element of {@link module:JClicPlayer.JClicPlayer JClicPlayer} (acting as {@link module:JClicPlayer.JClicPlayer JClicPlayer}). Set storage=local in options to store reports in [ window.localStorage ]{@link https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage} instead of [ window.sessionStorage ]{@link https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage} (default).
---

# SessionStorageReporter

**Extends:&#x20;**`module:reports/Reporter.Reporter`

<SourceLink href="/source/report/sessionstoragereporter-js/#L42" label="SessionStorageReporter.js:42" />

This JClic `Reporter` writes persistent data to the browser local session storage. It uses some of\
the [JClic Reports API](https://github.com/projectestac/jclic/wiki/JClic-Reports-developers-guide).\
Connection parameters (`key`, `context`...) are passed through the `options` element of [JClicPlayer](/module/jclicplayer#jclicplayer) (acting as [JClicPlayer](/module/jclicplayer#jclicplayer)).\
Set `storage=local` in `options` to store reports in \[`window.localStorage`][https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)\
instead of \[`window.sessionStorage`][https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage) (default).

---

## Constructor

<Signature
  code="new SessionStorageReporter(
	ps: module:JClicPlayer.JClicPlayer,
): SessionStorageReporter"
/>

SessionStorageReporter constructor

**Parameters**

- `ps` ([module:JClicPlayer.JClicPlayer](/module/jclicplayer#jclicplayer)) — The [JClicPlayer](/module/jclicplayer#jclicplayer) used to retrieve settings and localized messages

---

## Instance Methods

<MemberHeading id="init" depth="3" name="init" sig="init(options?: object): external:Promise" />

<MemberMeta sourceHref="/source/report/sessionstoragereporter-js/#L59" sourceLabel="SessionStorageReporter.js:59" />

Initializes this report system with an optional set of parameters.\
Returns a Promise, fulfilled when the reporter is fully initialized.

**Parameters**

- `options` (object, optional) — Initial settings passed to the reporting system

**Returns**

- [`external:Promise`](/module/utils#promise)

<MemberHeading id="savecurrentreport" depth="3" name="saveCurrentReport" sig="saveCurrentReport()" />

<MemberMeta sourceHref="/source/report/sessionstoragereporter-js/#L73" sourceLabel="SessionStorageReporter.js:73" />

Saves the current report data to sessionStorage

<MemberHeading id="endsequence" depth="3" name="endSequence" sig="endSequence()" />

<MemberMeta sourceHref="/source/report/sessionstoragereporter-js/#L84" sourceLabel="SessionStorageReporter.js:84" />

Finalizes the current sequence

<MemberHeading id="endactivity" depth="3" name="endActivity" sig="endActivity(score: number, numActions: number, solved: boolean)" />

<MemberMeta sourceHref="/source/report/sessionstoragereporter-js/#L97" sourceLabel="SessionStorageReporter.js:97" />

This method should be called when the current activity finishes. Data about user's final results\
on the activity will then be saved.

**Parameters**

- `score` (number) — The final score, usually in a 0-100 scale.
- `numActions` (number) — The total number of actions done by the user to solve the activity
- `solved` (boolean) — `true` if the activity was finally solved, `false` otherwise.

## Instance Fields

<MemberHeading id="storage" depth="3" name="storage" sig="storage: external:Storage" />

<MemberMeta sourceHref="/source/report/sessionstoragereporter-js/#L108" sourceLabel="SessionStorageReporter.js:108" />

Type of storage to be used. Defaults to `window.sessionStorage`

<MemberHeading id="descriptionkey" depth="3" name="descriptionKey" sig="descriptionKey: string" />

<MemberMeta sourceHref="/source/report/sessionstoragereporter-js/#L114" sourceLabel="SessionStorageReporter.js:114" />

Description of this reporting system

<MemberHeading id="descriptiondetail" depth="3" name="descriptionDetail" sig="descriptionDetail: string" />

<MemberMeta sourceHref="/source/report/sessionstoragereporter-js/#L120" sourceLabel="SessionStorageReporter.js:120" />

Additional info to display after the reporter's `description`

<MemberHeading id="key" depth="3" name="key" sig="key: string" />

<MemberMeta sourceHref="/source/report/sessionstoragereporter-js/#L125" sourceLabel="SessionStorageReporter.js:125" />

Key used to save the report into sessionStorage
