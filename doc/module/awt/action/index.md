---
title: Action
kind: class
longname: module:AWT.Action
description: This class encapsulates actions that can be linked to buttons, menus and other active objects
---

# Action

<SourceLink href="/source/awt-js/#L1779" label="AWT.js:1779" />

This class encapsulates actions that can be linked to buttons, menus and other active objects

---

## Constructor

<Signature code="new Action(name: string, actionPerformed: function): Action" />

Action constructor

**Parameters**

- `name` (string) — The name of this Action
- `actionPerformed` (function) — The callback to be triggered by this Action

---

## Instance Methods

<MemberHeading id="actionperformed" depth="3" name="actionPerformed" sig="actionPerformed(_thisAction: module:AWT.Action, _event: object)" />

<MemberMeta sourceHref="/source/awt-js/#L1797" sourceLabel="AWT.js:1797" />

Here is where subclasses must define the callback to be triggered when\
this Action object is called

**Parameters**

- `_thisAction` ([module:AWT.Action](/module/awt#action)) — Pointer to this Action object
- `_event` (object) — The original action event that has originated this action

<MemberHeading id="processevent" depth="3" name="processEvent" sig="processEvent(event: object)" />

<MemberMeta sourceHref="/source/awt-js/#L1809" sourceLabel="AWT.js:1809" />

This is the method to be passed to DOM event triggers

**Parameters**

- `event` (object) — The event object passed by the DOM event trigger

**Example**

```js
<p>const myFunc = () =&gt; { alert('Hello!') }<br>
const myAction = new Action('hello', myFunc)<br>
$( &quot;#foo&quot; ).on( &quot;click&quot;, myAction.processEvent)</p>
```

<MemberHeading id="addstatuslistener" depth="3" name="addStatusListener" sig="addStatusListener(listener: function)" />

<MemberMeta sourceHref="/source/awt-js/#L1818" sourceLabel="AWT.js:1818" />

Adds a status listener

**Parameters**

- `listener` (function) — The callback method to be called when the status of this\
  Action changes

<MemberHeading id="removestatuslistener" depth="3" name="removeStatusListener" sig="removeStatusListener(listener: function)" />

<MemberMeta sourceHref="/source/awt-js/#L1826" sourceLabel="AWT.js:1826" />

Removes a previously registered status listener

**Parameters**

- `listener` (function) — The listener to be removed

<MemberHeading id="setenabled" depth="3" name="setEnabled" sig="setEnabled(enabled: boolean)" />

<MemberMeta sourceHref="/source/awt-js/#L1834" sourceLabel="AWT.js:1834" />

Enables or disables this action

**Parameters**

- `enabled` (boolean)

## Instance Fields

<MemberHeading id="name" depth="3" name="name" sig="name: string" />

<MemberMeta sourceHref="/source/awt-js/#L1846" sourceLabel="AWT.js:1846" />

The action's name

<MemberHeading id="description" depth="3" name="description" sig="description: string" />

<MemberMeta sourceHref="/source/awt-js/#L1851" sourceLabel="AWT.js:1851" />

An optional description

<MemberHeading id="enabled" depth="3" name="enabled" sig="enabled: boolean" />

<MemberMeta sourceHref="/source/awt-js/#L1856" sourceLabel="AWT.js:1856" />

Action status. `true` means enabled, `false` disabled
