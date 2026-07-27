---
title: ActiveBagContent
kind: class
longname: module:boxes/ActiveBagContent.ActiveBagContent
description: This class packs a collection of {@link module:boxes/ActiveBoxContent.ActiveBoxContent ActiveBoxContent} objects and provides methods to access and manage it. The two main members of ActiveBagContent are the {@link module:shapers/Shaper.Shaper Shaper}, responsible for determining the position and shape of each {@link module:boxes/ActiveBox.ActiveBox ActiveBox}, and the {@link module:boxes/BoxBase.BoxBase BoxBase} (field style ), provider of a common visual style.
---

# ActiveBagContent

<SourceLink href="/source/boxes/activebagcontent-js/#L45" label="ActiveBagContent.js:45" />

This class packs a collection of [ActiveBoxContent](/module/boxes-activeboxcontent#activeboxcontent) objects and provides methods to access\
and manage it. The two main members of `ActiveBagContent` are the [Shaper](/module/shapers-shaper#shaper), responsible for\
determining the position and shape of each [ActiveBox](/module/boxes-activebox#activebox), and the [BoxBase](/module/boxes-boxbase#boxbase) (field `style`),\
provider of a common visual style.

---

## Constructor

<Signature
  code="new ActiveBagContent(
	id?: string,
	ncw: number,
	nch: number,
): ActiveBagContent"
/>

ActiveBagContent constructor

**Parameters**

- `id` (string, optional) — An optional text tag identifying this ActiveBagContent
- `ncw` (number) — In grid-based distributions, number of columns.
- `nch` (number) — In grid-based distributions, number of rows.

---

## Instance Methods

<MemberHeading
  id="setproperties"
  depth="3"
  name="setProperties"
  sig="setProperties(
	$xml: external:jQuery,
	mediaBag: module:bags/MediaBag.MediaBag,
)"
/>

<MemberMeta sourceHref="/source/boxes/activebagcontent-js/#L65" sourceLabel="ActiveBagContent.js:65" />

Loads the object settings from a specific JQuery XML element

**Parameters**

- `$xml` ([external:jQuery](/module/utils#jquery)) — The XML element to parse
- `mediaBag` ([module:bags/MediaBag.MediaBag](/module/bags-mediabag#mediabag)) — The project's MediaBag

<MemberHeading id="getattributes" depth="3" name="getAttributes" sig="getAttributes(): object" />

<MemberMeta sourceHref="/source/boxes/activebagcontent-js/#L167" sourceLabel="ActiveBagContent.js:167" />

Gets a object with the basic attributes needed to rebuild this instance excluding functions,\
parent references, constants and also attributes retaining the default value.\
The resulting object is commonly usued to serialize elements in JSON format.

**Returns**

- `object`

<MemberHeading
  id="setattributes"
  depth="3"
  name="setAttributes"
  sig="setAttributes(
	data: object,
	mediaBag: module:bags/MediaBag.MediaBag,
): module:boxes/ActiveBagContent.ActiveBagContent"
/>

<MemberMeta sourceHref="/source/boxes/activebagcontent-js/#L186" sourceLabel="ActiveBagContent.js:186" />

Reads the properties of this ActiveBagContent from a data object

**Parameters**

- `data` (object) — The data object to be parsed
- `mediaBag` ([module:bags/MediaBag.MediaBag](/module/bags-mediabag#mediabag)) — The project's MediaBag

**Returns**

- [`module:boxes/ActiveBagContent.ActiveBagContent`](/module/boxes-activebagcontent#activebagcontent)

<MemberHeading id="preparemedia" depth="3" name="prepareMedia" sig="prepareMedia(playStation: module:JClicPlayer.JClicPlayer)" />

<MemberMeta sourceHref="/source/boxes/activebagcontent-js/#L238" sourceLabel="ActiveBagContent.js:238" />

Prepares the media content of all elements

**Parameters**

- `playStation` ([module:JClicPlayer.JClicPlayer](/module/jclicplayer#jclicplayer)) — The [JClicPlayer](/module/jclicplayer#jclicplayer)

<MemberHeading id="gettotalwidth" depth="3" name="getTotalWidth" sig="getTotalWidth(): number" />

<MemberMeta sourceHref="/source/boxes/activebagcontent-js/#L246" sourceLabel="ActiveBagContent.js:246" />

Gets the estimated total width of this content bag

**Returns**

- `number`

<MemberHeading id="gettotalheight" depth="3" name="getTotalHeight" sig="getTotalHeight(): number" />

<MemberMeta sourceHref="/source/boxes/activebagcontent-js/#L254" sourceLabel="ActiveBagContent.js:254" />

Gets the estimated total height of this bag

**Returns**

- `number`

<MemberHeading id="getnumcells" depth="3" name="getNumCells" sig="getNumCells(): number" />

<MemberMeta sourceHref="/source/boxes/activebagcontent-js/#L262" sourceLabel="ActiveBagContent.js:262" />

Gets the total number of cells of this bag

**Returns**

- `number`

<MemberHeading id="isempty" depth="3" name="isEmpty" sig="isEmpty(): boolean" />

<MemberMeta sourceHref="/source/boxes/activebagcontent-js/#L270" sourceLabel="ActiveBagContent.js:270" />

Checks if the bag is empty

**Returns**

- `boolean`

<MemberHeading id="getshaper" depth="3" name="getShaper" sig="getShaper(): module:shapers/Shaper.Shaper" />

<MemberMeta sourceHref="/source/boxes/activebagcontent-js/#L278" sourceLabel="ActiveBagContent.js:278" />

Retrieves the [Shaper](/module/shapers-shaper#shaper) of this bag, creating a new one if it was _null_

**Returns**

- [`module:shapers/Shaper.Shaper`](/module/shapers-shaper#shaper)

<MemberHeading id="getboxbase" depth="3" name="getBoxBase" sig="getBoxBase(): module:boxes/BoxBase.BoxBase" />

<MemberMeta sourceHref="/source/boxes/activebagcontent-js/#L288" sourceLabel="ActiveBagContent.js:288" />

Retrieves the [BoxBase](/module/boxes-boxbase#boxbase) of this bag, creating a new one if it was _null_

**Returns**

- [`module:boxes/BoxBase.BoxBase`](/module/boxes-boxbase#boxbase)

<MemberHeading
  id="addactiveboxcontent"
  depth="3"
  name="addActiveBoxContent"
  sig="addActiveBoxContent(
	ab: module:boxes/ActiveBoxContent.ActiveBoxContent,
)"
/>

<MemberMeta sourceHref="/source/boxes/activebagcontent-js/#L298" sourceLabel="ActiveBagContent.js:298" />

Adds a new [ActiveBoxContent](/module/boxes-activeboxcontent#activeboxcontent) to this bag

**Parameters**

- `ab` ([module:boxes/ActiveBoxContent.ActiveBoxContent](/module/boxes-activeboxcontent#activeboxcontent)) — The ActiveBoxContent to add

<MemberHeading
  id="getactiveboxcontent"
  depth="3"
  name="getActiveBoxContent"
  sig="getActiveBoxContent(
	i: number,
): module:boxes/ActiveBoxContent.ActiveBoxContent"
/>

<MemberMeta sourceHref="/source/boxes/activebagcontent-js/#L310" sourceLabel="ActiveBagContent.js:310" />

Gets the nth [ActiveBoxContent](/module/boxes-activeboxcontent#activeboxcontent) in `cells`

**Parameters**

- `i` (number) — The index of the content to be retrieved

**Returns**

- [`module:boxes/ActiveBoxContent.ActiveBoxContent`](/module/boxes-activeboxcontent#activeboxcontent)

<MemberHeading
  id="getactiveboxcontentwith"
  depth="3"
  name="getActiveBoxContentWith"
  sig="getActiveBoxContentWith(
	id: number,
	item: number,
): module:boxes/ActiveBoxContent.ActiveBoxContent"
/>

<MemberMeta sourceHref="/source/boxes/activebagcontent-js/#L324" sourceLabel="ActiveBagContent.js:324" />

Finds the ActiveBoxContent with specific `id` and `item` values

**Parameters**

- `id` (number)
- `item` (number)

**Returns**

- [`module:boxes/ActiveBoxContent.ActiveBoxContent`](/module/boxes-activeboxcontent#activeboxcontent)

<MemberHeading
  id="setimgcontent"
  depth="3"
  name="setImgContent"
  sig="setImgContent(
	mb: module:bags/MediaBag.MediaBag,
	sh: module:shapers/Shaper.Shaper,
	roundSizes: boolean,
)"
/>

<MemberMeta sourceHref="/source/boxes/activebagcontent-js/#L335" sourceLabel="ActiveBagContent.js:335" />

Sets the content of the cells based on a image spliced by a shaper

**Parameters**

- `mb` ([module:bags/MediaBag.MediaBag](/module/bags-mediabag#mediabag)) — The MediaBag used to retrieve the image
- `sh` ([module:shapers/Shaper.Shaper](/module/shapers-shaper#shaper)) — The Shaper used to splice the image
- `roundSizes` (boolean) — When `true`, the size and coordinates of cells will be rounded\
  to the nearest integer values.

<MemberHeading
  id="settextcontent"
  depth="3"
  name="setTextContent"
  sig="setTextContent(
	txt: Array.<string>,
	setNcw: number,
	setNch: number,
)"
/>

<MemberMeta sourceHref="/source/boxes/activebagcontent-js/#L377" sourceLabel="ActiveBagContent.js:377" />

Sets the content of this bag based on an array of strings

**Parameters**

- `txt` (Array.\<string>) — The array of strings to be used as content.
- `setNcw` (number) — Number of columns
- `setNch` (number) — Number of rows

<MemberHeading id="setids" depth="3" name="setIds" sig="setIds(ids: Array.<number>)" />

<MemberMeta sourceHref="/source/boxes/activebagcontent-js/#L389" sourceLabel="ActiveBagContent.js:389" />

Sets `id` values to a all the [ActiveBoxContent](/module/boxes-activeboxcontent#activeboxcontent) elements of his bag.

**Parameters**

- `ids` (Array.\<number>) — Array of numeric identifiers

<MemberHeading id="setcellsattribute" depth="3" name="setCellsAttribute" sig="setCellsAttribute(key: string, value: any)" />

<MemberMeta sourceHref="/source/boxes/activebagcontent-js/#L399" sourceLabel="ActiveBagContent.js:399" />

Sets `value` to the `key` attribute of all cells

**Parameters**

- `key` (string) — The key where the value will be stored
- `value` (any) — The supplied value. Can be of any type.

<MemberHeading id="avoidallidsnull" depth="3" name="avoidAllIdsNull" sig="avoidAllIdsNull(maxId: number)" />

<MemberMeta sourceHref="/source/boxes/activebagcontent-js/#L409" sourceLabel="ActiveBagContent.js:409" />

Cheks if the `id` values of all [ActiveBoxContent](/module/boxes-activeboxcontent#activeboxcontent) objects are -1 and, if true,\
sets new ids to them, with values between 0 and `maxId`

**Parameters**

- `maxId` (number) — The maximum value of identifiers

## Instance Fields

<MemberHeading id="id" depth="3" name="id" sig="id: string" />

<MemberMeta sourceHref="/source/boxes/activebagcontent-js/#L422" sourceLabel="ActiveBagContent.js:422" />

The global identifier of this object: `primary`, `secondary`...

<MemberHeading id="image" depth="3" name="image" sig="image: string" />

<MemberMeta sourceHref="/source/boxes/activebagcontent-js/#L427" sourceLabel="ActiveBagContent.js:427" />

The name of the image file used as a common image of this bag

<MemberHeading id="img" depth="3" name="img" sig="img: external:HTMLImageElement" />

<MemberMeta sourceHref="/source/boxes/activebagcontent-js/#L432" sourceLabel="ActiveBagContent.js:432" />

The built image object

<MemberHeading id="animatedgiffile" depth="3" name="animatedGifFile" sig="animatedGifFile: string" />

<MemberMeta sourceHref="/source/boxes/activebagcontent-js/#L437" sourceLabel="ActiveBagContent.js:437" />

Name of the img source when is an animated GIF

<MemberHeading id="ncw" depth="3" name="ncw" sig="ncw: number" />

<MemberMeta sourceHref="/source/boxes/activebagcontent-js/#L442" sourceLabel="ActiveBagContent.js:442" />

Number of columns when cells are distributed in a grid

<MemberHeading id="nch" depth="3" name="nch" sig="nch: number" />

<MemberMeta sourceHref="/source/boxes/activebagcontent-js/#L447" sourceLabel="ActiveBagContent.js:447" />

Number of rows when cells are distributed in a grid

<MemberHeading id="w" depth="3" name="w" sig="w: number" />

<MemberMeta sourceHref="/source/boxes/activebagcontent-js/#L452" sourceLabel="ActiveBagContent.js:452" />

Optimal cell width

<MemberHeading id="h" depth="3" name="h" sig="h: number" />

<MemberMeta sourceHref="/source/boxes/activebagcontent-js/#L457" sourceLabel="ActiveBagContent.js:457" />

Optimal cell height

<MemberHeading id="border" depth="3" name="border" sig="border: boolean" />

<MemberMeta sourceHref="/source/boxes/activebagcontent-js/#L462" sourceLabel="ActiveBagContent.js:462" />

Whether the cells must have a border or not

<MemberHeading id="style" depth="3" name="style" sig="style: module:boxes/BoxBase.BoxBase" />

<MemberMeta sourceHref="/source/boxes/activebagcontent-js/#L467" sourceLabel="ActiveBagContent.js:467" />

The BoxBase used for this bag of cell contents

<MemberHeading id="shaper" depth="3" name="shaper" sig="shaper: module:shapers/Shaper.Shaper" />

<MemberMeta sourceHref="/source/boxes/activebagcontent-js/#L472" sourceLabel="ActiveBagContent.js:472" />

The Shaper used to define the specific shape of each cell

<MemberHeading id="backgroundcontent" depth="3" name="backgroundContent" sig="backgroundContent: module:boxes/ActiveBoxContent.ActiveBoxContent" />

<MemberMeta sourceHref="/source/boxes/activebagcontent-js/#L477" sourceLabel="ActiveBagContent.js:477" />

An optional ActiveBoxContent object with background settings.

<MemberHeading id="cells" depth="3" name="cells" sig="cells: Array.<module:boxes/ActiveBoxContent.ActiveBoxContent>" />

<MemberMeta sourceHref="/source/boxes/activebagcontent-js/#L482" sourceLabel="ActiveBagContent.js:482" />

The main Array of [ActiveBoxContent](/module/boxes-activeboxcontent#activeboxcontent) objects

<MemberHeading id="defaultidvalue" depth="3" name="defaultIdValue" sig="defaultIdValue: number" />

<MemberMeta sourceHref="/source/boxes/activebagcontent-js/#L487" sourceLabel="ActiveBagContent.js:487" />

The default value to be assigned at the 'id' field of children

<MemberHeading id="ids" depth="3" name="ids" sig="ids: string" />

<MemberMeta sourceHref="/source/boxes/activebagcontent-js/#L492" sourceLabel="ActiveBagContent.js:492" />

Used in special cases where all cells have empty content with only numeric identifiers
