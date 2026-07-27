---
title: PlayerHistory
kind: class
longname: module:PlayerHistory.PlayerHistory
description: PlayerHistory uses an array to store the list of projects and activities done by the user. This class allows {@link module:JClicPlayer.JClicPlayer JClicPlayer} objects to rewind a sequence or to go back to a caller menu.
---

# PlayerHistory

<SourceLink href="/source/playerhistory-js/#L40" label="PlayerHistory.js:40" />

PlayerHistory uses an array to store the list of projects and activities done by the user.\
This class allows [JClicPlayer](/module/jclicplayer#jclicplayer) objects to rewind a sequence or to go back to a caller menu.

---

## Constructor

<Signature
  code="new PlayerHistory(
	player: module:JClicPlayer.JClicPlayer,
): PlayerHistory"
/>

PlayerHistory constructor

**Parameters**

- `player` ([module:JClicPlayer.JClicPlayer](/module/jclicplayer#jclicplayer)) — The JClicPlayer associated to this history

---

## Instance Methods

<MemberHeading id="processpopstateevent" depth="3" name="processPopStateEvent" sig="processPopStateEvent(state: PlayerHistory#HistoryElement)" />

<MemberMeta sourceHref="/source/playerhistory-js/#L63" sourceLabel="PlayerHistory.js:63" />

Process the `state` object received in a `popstate` event

**Parameters**

- `state` (PlayerHistory#HistoryElement) — The previously stored state

<MemberHeading id="pushbrowserhistory" depth="3" name="pushBrowserHistory" sig="pushBrowserHistory()" />

<MemberMeta sourceHref="/source/playerhistory-js/#L77" sourceLabel="PlayerHistory.js:77" />

Push a new entry on the window\.History stack,\
only when `browserHistory` is true and there is no `popstate` event in progress

<MemberHeading id="storedelementscount" depth="3" name="storedElementsCount" sig="storedElementsCount(): number" />

<MemberMeta sourceHref="/source/playerhistory-js/#L110" sourceLabel="PlayerHistory.js:110" />

Counts the number of [HistoryElement](/module/playerhistory/playerhistory#historyelement) objects stored in\
[sequenceStack](/module/playerhistory/playerhistory#sequencestack)

**Returns**

- `number`

<MemberHeading id="clearhistory" depth="3" name="clearHistory" sig="clearHistory()" />

<MemberMeta sourceHref="/source/playerhistory-js/#L118" sourceLabel="PlayerHistory.js:118" />

Removes all elements from [sequenceStack](/module/playerhistory/playerhistory#sequencestack)

<MemberHeading id="push" depth="3" name="push" sig="push()" />

<MemberMeta sourceHref="/source/playerhistory-js/#L125" sourceLabel="PlayerHistory.js:125" />

Adds the current project and activity to the top of the history stack.

<MemberHeading id="pop" depth="3" name="pop" sig="pop(): boolean" />

<MemberMeta sourceHref="/source/playerhistory-js/#L152" sourceLabel="PlayerHistory.js:152" />

Retrieves the [HistoryElement](/module/playerhistory/playerhistory#historyelement) placed at the top of the\
stack (if any) and instructs [JClicPlayer](/module/jclicplayer#jclicplayer) to load it. The obtained effect is to\
"rewind" or "go back", usually to an activity that acts as a menu.

**Returns**

- `boolean`

<MemberHeading
  id="processjump"
  depth="3"
  name="processJump"
  sig="processJump(
	ji: module:bags/JumpInfo.JumpInfo,
	allowReturn: boolean,
): boolean"
/>

<MemberMeta sourceHref="/source/playerhistory-js/#L177" sourceLabel="PlayerHistory.js:177" />

Processes the provided [JumpInfo](/module/bags-jumpinfo#jumpinfo) object, instructing [JClicPlayer](/module/jclicplayer#jclicplayer) to go back,\
stop or jump to another point in the sequence.

**Parameters**

- `ji` ([module:bags/JumpInfo.JumpInfo](/module/bags-jumpinfo#jumpinfo)) — The object to be processed
- `allowReturn` (boolean) — When this parameter is `true`, the jump instructed by `ji` (if any)\
  will be recorded, thus allowing to return to the current activity.

**Returns**

- `boolean`

<MemberHeading
  id="jumptosequence"
  depth="3"
  name="jumpToSequence"
  sig="jumpToSequence(
	sequence: string,
	path?: string,
	allowReturn?: boolean,
)"
/>

<MemberMeta sourceHref="/source/playerhistory-js/#L228" sourceLabel="PlayerHistory.js:228" />

Performs a jump to the specified sequence

**Parameters**

- `sequence` (string) — The [ActivitySequence](/module/bags-activitysequence#activitysequence) tag to jump to.
- `path` (string, optional, default: null) — When not `null`, indicates a new project file that must be loaded.\
  Otherwise, the `sequence` parameter refers to a tag on the [ActivitySequence](/module/bags-activitysequence#activitysequence) of the\
  current project.
- `allowReturn` (boolean, optional, default: false) — When this parameter is `true`, the jump will be recorded, thus\
  allowing to return to the current activity.

## Instance Fields

<MemberHeading id="player" depth="3" name="player" sig="player: module:JClicPlayer.JClicPlayer" />

<MemberMeta sourceHref="/source/playerhistory-js/#L260" sourceLabel="PlayerHistory.js:260" />

The [JClicPlayer](/module/jclicplayer#jclicplayer) object to which this `PlayerHistory` belongs

<MemberHeading id="sequencestack" depth="3" name="sequenceStack" sig="sequenceStack: Array.<module:PlayerHistory.PlayerHistory#HistoryElement>" />

<MemberMeta sourceHref="/source/playerhistory-js/#L266" sourceLabel="PlayerHistory.js:266" />

This is the main member of the class. PlayerHistory puts and retrieves\
on it information about the proects and activities done by the current user.

<MemberHeading id="testmode" depth="3" name="testMode" sig="testMode: boolean" />

<MemberMeta sourceHref="/source/playerhistory-js/#L271" sourceLabel="PlayerHistory.js:271" />

When in test mode, jumps are only simulated.

<MemberHeading id="historyelement" depth="3" name="HistoryElement" sig="HistoryElement" />

<MemberMeta sourceHref="/source/playerhistory-js/#L286" sourceLabel="PlayerHistory.js:286" />

Inner class used to store history elements.
