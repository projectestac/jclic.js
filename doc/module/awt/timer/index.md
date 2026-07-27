---
title: Timer
kind: class
longname: module:AWT.Timer
description: This class provides a timer that will launch a function at specific intervals
---

# Timer

<SourceLink href="/source/awt-js/#L1868" label="AWT.js:1868" />

This class provides a timer that will launch a function at specific intervals

---

## Constructor

<Signature
  code="new Timer(
	actionPerformed: function,
	interval: number,
	enabled?: boolean,
): Timer"
/>

Timer constructor

**Parameters**

- `actionPerformed` (function) — The function to be triggered when the timer is enabled.
- `interval` (number) — The interval between action calls, specified in milliseconds.
- `enabled` (boolean, optional, default: false) — Flag to indicate if the timer will be initially enabled.

---

## Instance Methods

<MemberHeading id="actionperformed" depth="3" name="actionPerformed" sig="actionPerformed(_thisTimer: module:AWT.Timer)" />

<MemberMeta sourceHref="/source/awt-js/#L1885" sourceLabel="AWT.js:1885" />

Here is where subclasses must define the function to be performed when this timer ticks.

**Parameters**

- `_thisTimer` ([module:AWT.Timer](/module/awt#timer))

<MemberHeading id="processtimer" depth="3" name="processTimer" sig="processTimer(_event: external:Event)" />

<MemberMeta sourceHref="/source/awt-js/#L1893" sourceLabel="AWT.js:1893" />

This is the method called by `window.setInterval`

**Parameters**

- `_event` ([external:Event](/module/utils#event))

<MemberHeading id="setenabled" depth="3" name="setEnabled" sig="setEnabled(enabled: boolean, retainCounter?: boolean)" />

<MemberMeta sourceHref="/source/awt-js/#L1905" sourceLabel="AWT.js:1905" />

Enables or disables this timer

**Parameters**

- `enabled` (boolean) — Indicates if the timer should be enabled or disabled
- `retainCounter` (boolean, optional, default: false) — When `true`, the ticks counter will not be cleared

<MemberHeading id="isrunning" depth="3" name="isRunning" sig="isRunning(): boolean" />

<MemberMeta sourceHref="/source/awt-js/#L1928" sourceLabel="AWT.js:1928" />

Checks if this timer is running

**Returns**

- `boolean`

<MemberHeading id="start" depth="3" name="start" sig="start(retainCounter?: boolean)" />

<MemberMeta sourceHref="/source/awt-js/#L1936" sourceLabel="AWT.js:1936" />

Starts this timer

**Parameters**

- `retainCounter` (boolean, optional, default: false) — When `true`, the ticks counter will not be cleared

<MemberHeading id="stop" depth="3" name="stop" sig="stop(retainCounter?: boolean)" />

<MemberMeta sourceHref="/source/awt-js/#L1944" sourceLabel="AWT.js:1944" />

Stops this timer

**Parameters**

- `retainCounter` (boolean, optional, default: false) — When `true`, the ticks counter will not be cleared

## Instance Fields

<MemberHeading id="interval" depth="3" name="interval" sig="interval: number" />

<MemberMeta sourceHref="/source/awt-js/#L1954" sourceLabel="AWT.js:1954" />

The timer interval, in milliseconds

<MemberHeading id="ticks" depth="3" name="ticks" sig="ticks: number" />

<MemberMeta sourceHref="/source/awt-js/#L1959" sourceLabel="AWT.js:1959" />

The ticks counter

<MemberHeading id="timer" depth="3" name="timer" sig="timer: object" />

<MemberMeta sourceHref="/source/awt-js/#L1964" sourceLabel="AWT.js:1964" />

The object returned by `window.setInterval`

<MemberHeading id="repeats" depth="3" name="repeats" sig="repeats: boolean" />

<MemberMeta sourceHref="/source/awt-js/#L1969" sourceLabel="AWT.js:1969" />

When `true`, the timer should repeat until `stop` is called
