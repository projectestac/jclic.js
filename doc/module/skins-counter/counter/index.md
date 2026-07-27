---
title: Counter
kind: class
longname: module:skins/Counter.Counter
description: This class encapsulates the operation of a numeric counter, used to display the current values of score, actions and time.
---

# Counter

<SourceLink href="/source/skins/counter-js/#L36" label="Counter.js:36" />

This class encapsulates the operation of a numeric counter, used to display the current\
values of score, actions and time.

---

## Constructor

<Signature code="new Counter(id: string, $div?: external:jQuery): Counter" />

Counter constructor

**Parameters**

- `id` (string) — The type of information stored on this counter
- `$div` ([external:jQuery](/module/utils#jquery), optional) — The HTML element where this counter will show values (can be _null_)

---

## Instance Methods

<MemberHeading id="getdisplayvalue" depth="3" name="getDisplayValue" sig="getDisplayValue(): number" />

<MemberMeta sourceHref="/source/skins/counter-js/#L53" sourceLabel="Counter.js:53" />

Gets the current display value of this counter

**Returns**

- `number`

<MemberHeading id="refreshdisplay" depth="3" name="refreshDisplay" sig="refreshDisplay()" />

<MemberMeta sourceHref="/source/skins/counter-js/#L64" sourceLabel="Counter.js:64" />

Paints the value of this counter on screen\
(method to be overridden by subclasses)

<MemberHeading id="setenabled" depth="3" name="setEnabled" sig="setEnabled(enabled: boolean)" />

<MemberMeta sourceHref="/source/skins/counter-js/#L73" sourceLabel="Counter.js:73" />

Enables or disables this counter

**Parameters**

- `enabled` (boolean) — State been assigned to this counter

<MemberHeading id="setcountdown" depth="3" name="setCountDown" sig="setCountDown(maxValue: number)" />

<MemberMeta sourceHref="/source/skins/counter-js/#L87" sourceLabel="Counter.js:87" />

Sets the initial value of the counter

**Parameters**

- `maxValue` (number) — Value from which the countdown will start

<MemberHeading id="incvalue" depth="3" name="incValue" sig="incValue()" />

<MemberMeta sourceHref="/source/skins/counter-js/#L95" sourceLabel="Counter.js:95" />

Increments by one the value of this counter

<MemberHeading id="setvalue" depth="3" name="setValue" sig="setValue(value: number)" />

<MemberMeta sourceHref="/source/skins/counter-js/#L105" sourceLabel="Counter.js:105" />

Sets a specific value to this counter

**Parameters**

- `value` (number) — The value to set

## Instance Fields

<MemberHeading id="id" depth="3" name="id" sig="id: string" />

<MemberMeta sourceHref="/source/skins/counter-js/#L116" sourceLabel="Counter.js:116" />

Type of counter (usually: `score`, `actions` or `time`)

<MemberHeading id="div" depth="3" name="$div" sig="$div: external:jQuery" />

<MemberMeta sourceHref="/source/skins/counter-js/#L122" sourceLabel="Counter.js:122" />

The HTML element where this counter shows its value

<MemberHeading id="value" depth="3" name="value" sig="value: number" />

<MemberMeta sourceHref="/source/skins/counter-js/#L127" sourceLabel="Counter.js:127" />

Current value of this counter

<MemberHeading id="countdown" depth="3" name="countDown" sig="countDown: number" />

<MemberMeta sourceHref="/source/skins/counter-js/#L132" sourceLabel="Counter.js:132" />

When set, the counter displays a countdown from this value to zero

<MemberHeading id="enabled" depth="3" name="enabled" sig="enabled: boolean" />

<MemberMeta sourceHref="/source/skins/counter-js/#L137" sourceLabel="Counter.js:137" />

Flag indicating if this counter is currently enabled

<MemberHeading id="maxdisplayvalue" depth="3" name="MAX_DISPLAY_VALUE" sig="MAX_DISPLAY_VALUE: number" />

<MemberMeta sourceHref="/source/skins/counter-js/#L142" sourceLabel="Counter.js:142" />

Maximum value to be displayed by this counter

<MemberHeading id="displaydifffrom" depth="3" name="displayDiffFrom" sig="displayDiffFrom: module:skins/Counter.Counter" />

<MemberMeta sourceHref="/source/skins/counter-js/#L149" sourceLabel="Counter.js:149" />

An optional Counter used as a subtractor to display the current value.\
Useful to display `errors` subtracting `score` from `actions`.
