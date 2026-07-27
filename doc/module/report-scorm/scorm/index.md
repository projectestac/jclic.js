---
title: SCORM
kind: class
longname: module:report/SCORM.SCORM
description: This class detects if JClic.js is running in an SCORM environment and, if true, exposes the methods needed to notify the results of activities. Both SCORM 1.2 and 2004 are supported.
---

# SCORM

<SourceLink href="/source/report/scorm-js/#L40" label="SCORM.js:40" />

This class detects if JClic.js is running in an SCORM environment and, if true,\
exposes the methods needed to notify the results of activities.\
Both SCORM 1.2 and 2004 are supported.

---

## Constructor

<Signature
  code="new SCORM(
	API: object,
	reporter: module:report/Reporter.Reporter,
): SCORM"
/>

SCORM constructor

**Parameters**

- `API` (object) — The global SCORM API object
- `reporter` ([module:report/Reporter.Reporter](/module/report-reporter#reporter)) — The `Reporter` associated to this SCORM object

---

## Instance Methods

<MemberHeading id="initialize" depth="3" name="initialize" sig="initialize(): boolean" />

<MemberMeta sourceHref="/source/report/scorm-js/#L104" sourceLabel="SCORM.js:104" />

Initializes communication with the SCORM API

**Returns**

- `boolean`

<MemberHeading id="terminate" depth="3" name="terminate" sig="terminate(): boolean" />

<MemberMeta sourceHref="/source/report/scorm-js/#L130" sourceLabel="SCORM.js:130" />

Terminates communication with the SCORM API

**Returns**

- `boolean`

<MemberHeading id="commitinfo" depth="3" name="commitInfo" sig="commitInfo()" />

<MemberMeta sourceHref="/source/report/scorm-js/#L143" sourceLabel="SCORM.js:143" />

Commits the current information to the SCORM API

<MemberHeading id="commit" depth="3" name="commit" sig="commit(): boolean" />

<MemberMeta sourceHref="/source/report/scorm-js/#L159" sourceLabel="SCORM.js:159" />

Commits current pending data to the SCORM API

**Returns**

- `boolean`

<MemberHeading id="setvalue" depth="3" name="setValue" sig="setValue(key: string, value: string | number): string" />

<MemberMeta sourceHref="/source/report/scorm-js/#L175" sourceLabel="SCORM.js:175" />

Sends a specific value to the SCORM API

**Parameters**

- `key` (string) — A SCORM valid key
- `value` (string | number) — The value associated with this key

**Returns**

- `string`

<MemberHeading id="getvalue" depth="3" name="getValue" sig="getValue(key: string): string" />

<MemberMeta sourceHref="/source/report/scorm-js/#L190" sourceLabel="SCORM.js:190" />

Gets a specific value from the SCORM API

**Parameters**

- `key` (string) — A SCORM valid key

**Returns**

- `string`

<MemberHeading id="gettimeexpression" depth="3" name="getTimeExpression" sig="getTimeExpression(millis: number): string" />

<MemberMeta sourceHref="/source/report/scorm-js/#L206" sourceLabel="SCORM.js:206" />

Gets a string expression of the given time (in milliseconds) suitable for a SCORM transaction.

**Parameters**

- `millis` (number) — The amount of time, in milliseconds

**Returns**

- `string`

* **See:**
  - [http://www.ostyn.com/standards/scorm/samples/ISOTimeForSCORM.htm](http://www.ostyn.com/standards/scorm/samples/ISOTimeForSCORM.htm)

<MemberHeading id="getscormtype" depth="3" name="getScormType" sig="getScormType(): string" />

<MemberMeta sourceHref="/source/report/scorm-js/#L222" sourceLabel="SCORM.js:222" />

Gets the SCORM type of this SCORM object

**Returns**

- `string`

## Static Methods

<MemberHeading id="scanforapi" depth="3" name="scanForAPI" sig="scanForAPI(win: object, tries: number): object" />

<MemberMeta badges="static" sourceHref="/source/report/scorm-js/#L65" sourceLabel="SCORM.js:65" />

Recursive function used to find the SCORM "API" object

**Parameters**

- `win` (object) — The 'window' object to scan for global SCORM API objects
- `tries` (number) — Recursive attempts currently achieved

**Returns**

- `object`

<MemberHeading
  id="getscorm"
  depth="3"
  name="getSCORM"
  sig="getSCORM(
	reporter: module:report/Reporter.Reporter,
): module:report/SCORM.SCORM"
/>

<MemberMeta badges="static" sourceHref="/source/report/scorm-js/#L81" sourceLabel="SCORM.js:81" />

Checks for the presence of a SCORM API on the current browser session.

**Parameters**

- `reporter` ([module:report/Reporter.Reporter](/module/report-reporter#reporter)) — The `Reporter` linked to the requested SCORM object

**Returns**

- [`module:report/SCORM.SCORM`](/module/report-scorm#scorm)

## Instance Fields

<MemberHeading id="is2004" depth="3" name="is2004" sig="is2004: boolean" />

<MemberMeta sourceHref="/source/report/scorm-js/#L232" sourceLabel="SCORM.js:232" />

True when the API is of type SCORM 2004, false for SCORM 1.2

<MemberHeading id="reporter" depth="3" name="reporter" sig="reporter: module:report/Reporter.Reporter" />

<MemberMeta sourceHref="/source/report/scorm-js/#L237" sourceLabel="SCORM.js:237" />

The Reporter associated to this SCORM object

<MemberHeading id="prefix" depth="3" name="prefix" sig="prefix: string" />

<MemberMeta sourceHref="/source/report/scorm-js/#L242" sourceLabel="SCORM.js:242" />

Prefix to be used in SCORM function names. Should be 'LMS' for SCORM 1.2

<MemberHeading id="core" depth="3" name="core" sig="core: string" />

<MemberMeta sourceHref="/source/report/scorm-js/#L247" sourceLabel="SCORM.js:247" />

Prefix used in core SCORM keys. Should be 'cmi.core.' for 1.2 and 'cmi.' for 2004

<MemberHeading id="api" depth="3" name="API" sig="API: object" />

<MemberMeta sourceHref="/source/report/scorm-js/#L252" sourceLabel="SCORM.js:252" />

SCORM API object used to communicate with the LMS

<MemberHeading id="studentid" depth="3" name="studentId" sig="studentId: string" />

<MemberMeta sourceHref="/source/report/scorm-js/#L257" sourceLabel="SCORM.js:257" />

The student ID retrieved from the SCORM API

<MemberHeading id="studentname" depth="3" name="studentName" sig="studentName: string" />

<MemberMeta sourceHref="/source/report/scorm-js/#L262" sourceLabel="SCORM.js:262" />

The student name retrieved from the SCORM API

## Static Fields

<MemberHeading id="discovermaxtries" depth="3" name="DISCOVER_MAX_TRIES" sig="DISCOVER_MAX_TRIES: number" />

<MemberMeta badges="static" sourceHref="/source/report/scorm-js/#L268" sourceLabel="SCORM.js:268" />

Maximum recursive attempts allowed to find the global SCORM API object
