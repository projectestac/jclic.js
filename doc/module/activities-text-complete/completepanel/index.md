---
title: CompletePanel
kind: class
longname: module:activities/text/Complete.CompletePanel
description: The {@link module:activities/text/TextActivityBase.TextActivityBasePanel TextActivityBasePanel} where {@link module:activities/text/Complete.Complete Complete} activities are played.
---

# CompletePanel

**Extends:&#x20;**`module:activities/text/TextActivityBasePanel.TextActivityBasePanel`

<SourceLink href="/source/activities/text/complete-js/#L54" label="Complete.js:54" />

The [TextActivityBasePanel](/module/activities-text-textactivitybase#textactivitybasepanel) where [Complete](/module/activities-text-complete#complete) activities are played.

---

## Constructor

<Signature
  code="new CompletePanel(
	act: module:Activity.Activity,
	ps: module:JClicPlayer.JClicPlayer,
	$div?: external:jQuery,
): CompletePanel"
/>

CompletePanel constructor

**Parameters**

- `act` ([module:Activity.Activity](/module/activity#activity)) — The [Activity](/module/activity#activity) to which this Panel belongs
- `ps` ([module:JClicPlayer.JClicPlayer](/module/jclicplayer#jclicplayer)) — Any object implementing the methods defined in the\
  [PlayStation](http://projectestac.github.io/jclic/apidoc/edu/xtec/jclic/PlayStation.html) Java interface.
- `$div` ([external:jQuery](/module/utils#jquery), optional) — The jQuery DOM element where this Panel will deploy

---

## Instance Methods

<MemberHeading
  id="createtargetelement"
  depth="3"
  name="$createTargetElement"
  sig="$createTargetElement(
	_target: module:activities/text/TextActivityDocument.TextTarget,
	_$span: external:jQuery,
): external:jQuery"
/>

<MemberMeta sourceHref="/source/activities/text/complete-js/#L74" sourceLabel="Complete.js:74" />

Creates a target DOM element for the provided target.

**Parameters**

- `_target` ([module:activities/text/TextActivityDocument.TextTarget](/module/activities-text-textactivitydocument#texttarget)) — The target related to the DOM object to be created
- `_$span` ([external:jQuery](/module/utils#jquery))

**Returns**

- [`external:jQuery`](/module/utils#jquery)

<MemberHeading id="startactivity" depth="3" name="startActivity" sig="startActivity()" />

<MemberMeta sourceHref="/source/activities/text/complete-js/#L83" sourceLabel="Complete.js:83" />

Called when the activity starts playing

<MemberHeading id="evaluatepanel" depth="3" name="evaluatePanel" sig="evaluatePanel(): boolean" />

<MemberMeta sourceHref="/source/activities/text/complete-js/#L93" sourceLabel="Complete.js:93" />

Evaluates all the targets in this panel. This method is usually called from the `Check` button.

**Returns**

- `boolean`

<MemberHeading id="finishactivity" depth="3" name="finishActivity" sig="finishActivity(result: boolean)" />

<MemberMeta sourceHref="/source/activities/text/complete-js/#L115" sourceLabel="Complete.js:115" />

Ordinary ending of the activity, usually called form `processEvent`

**Parameters**

- `result` (boolean) — `true` if the activity was successfully completed, `false` otherwise
