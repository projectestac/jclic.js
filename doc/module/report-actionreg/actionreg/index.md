---
title: ActionReg
kind: class
longname: module:report/ActionReg.ActionReg
description: This class stores information about one specific action done by the current user while playing an activity.
---

# ActionReg

<SourceLink href="/source/report/actionreg-js/#L40" label="ActionReg.js:40" />

This class stores information about one specific action done by the current user while playing\
an activity.

---

## Constructor

<Signature
  code="new ActionReg(
	type: string,
	+: string,
	+: string,
	ok: boolean,
): ActionReg"
/>

ActionReg constructor

**Parameters**

- `type` (string) — Type of action (`click`, `write`, `move`, `select`...)
- `+` (string) — source - Description of the object on which the action is done.
- `+` (string) — dest - Description of the object that acts as a target of the action (used in pairings)
- `ok` (boolean) — `true` if the action was OK, `false`, `null` or `undefined` otherwise

---

## Instance Methods

<MemberHeading id="getxml" depth="3" name="$getXML" sig="$getXML(): external:jQuery" />

<MemberMeta sourceHref="/source/report/actionreg-js/#L61" sourceLabel="ActionReg.js:61" />

Provides the data associated with this action in XML format suitable for a\
[JClic Reports Server](http://clic.xtec.cat/en/jclic/reports/).

**Returns**

- [`external:jQuery`](/module/utils#jquery)

<MemberHeading id="setproperties" depth="3" name="setProperties" sig="setProperties($xml: external:jQuery)" />

<MemberMeta sourceHref="/source/report/actionreg-js/#L76" sourceLabel="ActionReg.js:76" />

Fills this ActionReg with data provided in XML format

**Parameters**

- `$xml` ([external:jQuery](/module/utils#jquery)) — The XML element to be processed, already wrapped as jQuery object

## Instance Fields

<MemberHeading id="type" depth="3" name="type" sig="type: string" />

<MemberMeta sourceHref="/source/report/actionreg-js/#L100" sourceLabel="ActionReg.js:100" />

The type of action (`click`, `write`, `move`, `select`...)

<MemberHeading id="source" depth="3" name="source" sig="source: string" />

<MemberMeta sourceHref="/source/report/actionreg-js/#L105" sourceLabel="ActionReg.js:105" />

Description of the object on which the action was done

<MemberHeading id="dest" depth="3" name="dest" sig="dest: string" />

<MemberMeta sourceHref="/source/report/actionreg-js/#L110" sourceLabel="ActionReg.js:110" />

Description of the object that has acted as a target of the action (used in pairings)

<MemberHeading id="time" depth="3" name="time" sig="time: number" />

<MemberMeta sourceHref="/source/report/actionreg-js/#L115" sourceLabel="ActionReg.js:115" />

Time stamp taken when the action was done

<MemberHeading id="isok" depth="3" name="isOk" sig="isOk: boolean" />

<MemberMeta sourceHref="/source/report/actionreg-js/#L120" sourceLabel="ActionReg.js:120" />

`true` if the action was OK
