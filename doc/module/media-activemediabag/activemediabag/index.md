---
title: ActiveMediaBag
kind: class
longname: module:media/ActiveMediaBag.ActiveMediaBag
description: This class stores a collection of realized {@link module:media/ActiveMediaPlayer.ActiveMediaPlayer ActiveMediaPlayer} objects, related to a {@link module:project/JClicProject.JClicProject JClicProject} or {@link module:Activity.Activity Activity}.
---

# ActiveMediaBag

<SourceLink href="/source/media/activemediabag-js/#L39" label="ActiveMediaBag.js:39" />

This class stores a collection of realized [ActiveMediaPlayer](/module/media-activemediaplayer#activemediaplayer) objects, related to a\
[JClicProject](/module/project-jclicproject#jclicproject) or [Activity](/module/activity#activity).

---

## Constructor

<Signature code="new ActiveMediaBag(): ActiveMediaBag" />

ActiveMediaBag constructor

---

## Instance Methods

<MemberHeading
  id="createactivemediaplayer"
  depth="3"
  name="createActiveMediaPlayer"
  sig="createActiveMediaPlayer(
	mc: module:media/MediaContent.MediaContent,
	mb: module:bags/MediaBag.MediaBag,
	ps: module:JClicPlayer.JClicPlayer,
): module:media/ActiveMediaPlayer.ActiveMediaPlayer"
/>

<MemberMeta sourceHref="/source/media/activemediabag-js/#L56" sourceLabel="ActiveMediaBag.js:56" />

Creates a new [ActiveMediaPlayer](/module/media-activemediaplayer#activemediaplayer) linked to this media bag

**Parameters**

- `mc` ([module:media/MediaContent.MediaContent](/module/media-mediacontent#mediacontent)) — The content used by the new player
- `mb` ([module:bags/MediaBag.MediaBag](/module/bags-mediabag#mediabag)) — The project's MediaBag
- `ps` ([module:JClicPlayer.JClicPlayer](/module/jclicplayer#jclicplayer)) — An object implementing the\
  [PlayStation](http://projectestac.github.io/jclic/apidoc/edu/xtec/jclic/PlayStation.html) interface,\
  usually a [JClicPlayer](/module/jclicplayer#jclicplayer).

**Returns**

- [`module:media/ActiveMediaPlayer.ActiveMediaPlayer`](/module/media-activemediaplayer#activemediaplayer)

<MemberHeading
  id="getactivemediaplayer"
  depth="3"
  name="getActiveMediaPlayer"
  sig="getActiveMediaPlayer(
	mc: module:media/MediaContent.MediaContent,
	mb: module:bags/MediaBag.MediaBag,
	ps: module:JClicPlayer.JClicPlayer,
): module:media/ActiveMediaPlayer.ActiveMediaPlayer"
/>

<MemberMeta sourceHref="/source/media/activemediabag-js/#L88" sourceLabel="ActiveMediaBag.js:88" />

Looks for an already existing [ActiveMediaPlayer](/module/media-activemediaplayer#activemediaplayer) equivalent to the requested.\
When not found, a new one is created and and returned.

**Parameters**

- `mc` ([module:media/MediaContent.MediaContent](/module/media-mediacontent#mediacontent)) — The content used by the new player
- `mb` ([module:bags/MediaBag.MediaBag](/module/bags-mediabag#mediabag)) — The project's MediaBag
- `ps` ([module:JClicPlayer.JClicPlayer](/module/jclicplayer#jclicplayer)) — An object implementing the\
  [PlayStation](http://projectestac.github.io/jclic/apidoc/edu/xtec/jclic/PlayStation.html) interface,\
  usually a [JClicPlayer](/module/jclicplayer#jclicplayer).

**Returns**

- [`module:media/ActiveMediaPlayer.ActiveMediaPlayer`](/module/media-activemediaplayer#activemediaplayer)

<MemberHeading
  id="removeactivemediaplayer"
  depth="3"
  name="removeActiveMediaPlayer"
  sig="removeActiveMediaPlayer(
	mc: module:media/MediaContent.MediaContent,
)"
/>

<MemberMeta sourceHref="/source/media/activemediabag-js/#L97" sourceLabel="ActiveMediaBag.js:97" />

Removes from the list of players the [ActiveMediaPlayer](/module/media-activemediaplayer#activemediaplayer) related to the specified [module:media/MediaContent.MediaContent](/module/media-mediacontent#mediacontent).

**Parameters**

- `mc` ([module:media/MediaContent.MediaContent](/module/media-mediacontent#mediacontent)) — The media content to look for.

<MemberHeading id="realizeall" depth="3" name="realizeAll" sig="realizeAll()" />

<MemberMeta sourceHref="/source/media/activemediabag-js/#L109" sourceLabel="ActiveMediaBag.js:109" />

Realizes all the media elements stored in this bag

<MemberHeading id="stopall" depth="3" name="stopAll" sig="stopAll(level: number)" />

<MemberMeta sourceHref="/source/media/activemediabag-js/#L117" sourceLabel="ActiveMediaBag.js:117" />

Stops playing all media elements stored in this bag

**Parameters**

- `level` (number) — Level at and below what all media players will be muted.

<MemberHeading id="removeall" depth="3" name="removeAll" sig="removeAll()" />

<MemberMeta sourceHref="/source/media/activemediabag-js/#L129" sourceLabel="ActiveMediaBag.js:129" />

Removes all players from this media bag

## Instance Fields

<MemberHeading id="players" depth="3" name="players" sig="players: Array.<module:media/ActiveMediaPlayer.ActiveMediaPlayer>" />

<MemberMeta sourceHref="/source/media/activemediabag-js/#L142" sourceLabel="ActiveMediaBag.js:142" />

The collection of [ActiveMediaPlayer](/module/media-activemediaplayer#activemediaplayer) objects stored in this media bag.
