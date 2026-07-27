---
title: ActiveBoxContent
kind: class
longname: module:boxes/ActiveBoxContent.ActiveBoxContent
description: This class defines a content that can be displayed by {@link module:boxes/ActiveBox.ActiveBox ActiveBox} objects. This content can be a text, an image, a fragment of an image or a combination of text and images. The style (colors, font and size, borders, shadows, margins, etc.) are specified in the style attribute, always pointing to a {@link module:boxes/BoxBase.BoxBase BoxBase} object.
---

# ActiveBoxContent

<SourceLink href="/source/boxes/activeboxcontent-js/#L85" label="ActiveBoxContent.js:85" />

This class defines a content that can be displayed by [ActiveBox](/module/boxes-activebox#activebox) objects. This content\
can be a text, an image, a fragment of an image or a combination of text and images. The style\
(colors, font and size, borders, shadows, margins, etc.) are specified in the `style` attribute,\
always pointing to a [BoxBase](/module/boxes-boxbase#boxbase) object.

---

## Constructor

<Signature code="new ActiveBoxContent(id?: string): ActiveBoxContent" />

ActiveBoxContent constructor

**Parameters**

- `id` (string, optional) — An optional identifier.

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

<MemberMeta sourceHref="/source/boxes/activeboxcontent-js/#L103" sourceLabel="ActiveBoxContent.js:103" />

Loads settings from a specific JQuery XML element

**Parameters**

- `$xml` ([external:jQuery](/module/utils#jquery)) — The XML element to be parsed
- `mediaBag` ([module:bags/MediaBag.MediaBag](/module/bags-mediabag#mediabag)) — The media bag used to retrieve images and other media

<MemberHeading id="getattributes" depth="3" name="getAttributes" sig="getAttributes(): object" />

<MemberMeta sourceHref="/source/boxes/activeboxcontent-js/#L175" sourceLabel="ActiveBoxContent.js:175" />

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
	data: object | string,
	mediaBag: module:bags/MediaBag.MediaBag,
): module:boxes/ActiveBoxContent.ActiveBoxContent"
/>

<MemberMeta sourceHref="/source/boxes/activeboxcontent-js/#L191" sourceLabel="ActiveBoxContent.js:191" />

Reads the properties of this ActiveBoxContent from a data object

**Parameters**

- `data` (object | string) — The data object to be parsed, or just the text content
- `mediaBag` ([module:bags/MediaBag.MediaBag](/module/bags-mediabag#mediabag)) — The media bag used to retrieve images and other media

**Returns**

- [`module:boxes/ActiveBoxContent.ActiveBoxContent`](/module/boxes-activeboxcontent#activeboxcontent)

<MemberHeading
  id="readalign"
  depth="3"
  name="readAlign"
  sig="readAlign(
	str: string,
): module:boxes/ActiveBoxContent.ActiveBoxContent~alignType"
/>

<MemberMeta sourceHref="/source/boxes/activeboxcontent-js/#L218" sourceLabel="ActiveBoxContent.js:218" />

Decode expressions with combined values of horizontal and vertical alignments in the form:\
"(left|middle|right),(top|middle|bottom)"

**Parameters**

- `str` (string) — The string to parse

**Returns**

- `module:boxes/ActiveBoxContent.ActiveBoxContent~alignType`

<MemberHeading id="isempty" depth="3" name="isEmpty" sig="isEmpty()" />

<MemberMeta sourceHref="/source/boxes/activeboxcontent-js/#L231" sourceLabel="ActiveBoxContent.js:231" />

Checks if this is an empty content (`text` and `img` are _null_)

<MemberHeading
  id="isequivalent"
  depth="3"
  name="isEquivalent"
  sig="isEquivalent(
	abc: module:boxes/ActiveBoxContent.ActiveBoxContent,
	checkCase: boolean,
): boolean"
/>

<MemberMeta sourceHref="/source/boxes/activeboxcontent-js/#L241" sourceLabel="ActiveBoxContent.js:241" />

Checks if two contents are equivalent

**Parameters**

- `abc` ([module:boxes/ActiveBoxContent.ActiveBoxContent](/module/boxes-activeboxcontent#activeboxcontent)) — The content to compare with this.
- `checkCase` (boolean) — When `true` the comparing will be case-sensitive.

**Returns**

- `boolean`

<MemberHeading id="settextcontent" depth="3" name="setTextContent" sig="setTextContent(tx: string)" />

<MemberMeta sourceHref="/source/boxes/activeboxcontent-js/#L267" sourceLabel="ActiveBoxContent.js:267" />

Sets the text content of this ActiveBox

**Parameters**

- `tx` (string)

<MemberHeading id="checkhtmltext" depth="3" name="checkHtmlText" sig="checkHtmlText()" />

<MemberMeta sourceHref="/source/boxes/activeboxcontent-js/#L281" sourceLabel="ActiveBoxContent.js:281" />

Checks if cell's text uses HTML, initializing the `innerHtmlText` member as needed.

<MemberHeading
  id="setimgcontent"
  depth="3"
  name="setImgContent"
  sig="setImgContent(
	img: external:HTMLImageElement,
	imgClip: module:AWT.Shape,
	animatedGifFile?: string,
)"
/>

<MemberMeta sourceHref="/source/boxes/activeboxcontent-js/#L302" sourceLabel="ActiveBoxContent.js:302" />

Sets a fragment of a main image as a graphic content of this cell.\
Cells cannot have two graphic contents, so `image` (the specific image of this cell) should\
be cleared with this setting.

**Parameters**

- `img` ([external:HTMLImageElement](/module/utils#htmlimageelement)) — The image data
- `imgClip` ([module:AWT.Shape](/module/awt#shape)) — A shape that clips the portion of image assigned to this content.
- `animatedGifFile` (string, optional) — When `img` is an animated GIF, its file name

<MemberHeading id="preparemedia" depth="3" name="prepareMedia" sig="prepareMedia(playStation: module:JClicPlayer.JClicPlayer)" />

<MemberMeta sourceHref="/source/boxes/activeboxcontent-js/#L314" sourceLabel="ActiveBoxContent.js:314" />

Prepares the media content

**Parameters**

- `playStation` ([module:JClicPlayer.JClicPlayer](/module/jclicplayer#jclicplayer)) — Usually a [JClicPlayer](/module/jclicplayer#jclicplayer)

<MemberHeading id="realizecontent" depth="3" name="realizeContent" sig="realizeContent(mediaBag: module:bags/MediaBag.MediaBag)" />

<MemberMeta sourceHref="/source/boxes/activeboxcontent-js/#L325" sourceLabel="ActiveBoxContent.js:325" />

Reads and initializes the image associated to this content

**Parameters**

- `mediaBag` ([module:bags/MediaBag.MediaBag](/module/bags-mediabag#mediabag)) — The media bag of the current project.

<MemberHeading id="getdescription" depth="3" name="getDescription" sig="getDescription(): string" />

<MemberMeta sourceHref="/source/boxes/activeboxcontent-js/#L349" sourceLabel="ActiveBoxContent.js:349" />

Gets a string representing this content, useful for checking if two different contents are\
equivalent.

**Returns**

- `string`

<MemberHeading id="tostring" depth="3" name="toString" sig="toString(): string" />

<MemberMeta sourceHref="/source/boxes/activeboxcontent-js/#L367" sourceLabel="ActiveBoxContent.js:367" />

Overwrites the original `Object.toString` method, returning `getDescription` instead

**Returns**

- `string`

## Instance Fields

<MemberHeading id="style" depth="3" name="style" sig="style: module:boxes/BoxBase.BoxBase" />

<MemberMeta sourceHref="/source/boxes/activeboxcontent-js/#L386" sourceLabel="ActiveBoxContent.js:386" />

The [BoxBase](/module/boxes-boxbase#boxbase) attribute of this content. Can be `null`, meaning [ActiveBox](/module/boxes-activebox#activebox) will\
try to find a suitable style scanning down through its own BoxBase, their parent's and, finally,\
the default values defined in `BoxBase.prototype`.

<MemberHeading id="dimension" depth="3" name="dimension" sig="dimension: module:AWT.Dimension" />

<MemberMeta sourceHref="/source/boxes/activeboxcontent-js/#L391" sourceLabel="ActiveBoxContent.js:391" />

Optimal dimension of any [ActiveBox](/module/boxes-activebox#activebox) taking this content.

<MemberHeading id="border" depth="3" name="border" sig="border: boolean | null" />

<MemberMeta sourceHref="/source/boxes/activeboxcontent-js/#L397" sourceLabel="ActiveBoxContent.js:397" />

The [ActiveBox](/module/boxes-activebox#activebox) can have or not a border despite the settings of [BoxBase](/module/boxes-boxbase#boxbase).\
The default value `null` means not to take in consideration this setting.

<MemberHeading id="text" depth="3" name="text" sig="text: string" />

<MemberMeta sourceHref="/source/boxes/activeboxcontent-js/#L402" sourceLabel="ActiveBoxContent.js:402" />

The text to display on the [ActiveBox](/module/boxes-activebox#activebox). It can have up to two paragraphs.

<MemberHeading id="image" depth="3" name="image" sig="image: string" />

<MemberMeta sourceHref="/source/boxes/activeboxcontent-js/#L407" sourceLabel="ActiveBoxContent.js:407" />

The name of the image file to display on the [ActiveBox](/module/boxes-activebox#activebox).

<MemberHeading id="imgclip" depth="3" name="imgClip" sig="imgClip: module:AWT.Shape" />

<MemberMeta sourceHref="/source/boxes/activeboxcontent-js/#L412" sourceLabel="ActiveBoxContent.js:412" />

An optional shape used to clip the image.

<MemberHeading id="mediacontent" depth="3" name="mediaContent" sig="mediaContent: module:media/MediaContent.MediaContent" />

<MemberMeta sourceHref="/source/boxes/activeboxcontent-js/#L417" sourceLabel="ActiveBoxContent.js:417" />

The media content associated with this object.

<MemberHeading id="imgalign" depth="3" name="imgAlign" sig="imgAlign: module:boxes/ActiveBoxContent.AlignType" />

<MemberMeta sourceHref="/source/boxes/activeboxcontent-js/#L427" sourceLabel="ActiveBoxContent.js:427" />

The horizontal and vertical alignment of the image inside the cell.

<MemberHeading id="txtalign" depth="3" name="txtAlign" sig="txtAlign: module:boxes/ActiveBoxContent.AlignType" />

<MemberMeta sourceHref="/source/boxes/activeboxcontent-js/#L433" sourceLabel="ActiveBoxContent.js:433" />

The horizontal and vertical alignment of the text inside the cell.\
Valid values are: `left`, `middle`, `right`, `top` and `bottom`.

<MemberHeading id="avoidoverlapping" depth="3" name="avoidOverlapping" sig="avoidOverlapping: boolean" />

<MemberMeta sourceHref="/source/boxes/activeboxcontent-js/#L438" sourceLabel="ActiveBoxContent.js:438" />

Whether to avoid overlapping of image and text inside the cell when both are present.

<MemberHeading id="id" depth="3" name="id" sig="id: number" />

<MemberMeta sourceHref="/source/boxes/activeboxcontent-js/#L443" sourceLabel="ActiveBoxContent.js:443" />

Numeric identifier used in activities to resolve relationships between cells

<MemberHeading id="item" depth="3" name="item" sig="item: number" />

<MemberMeta sourceHref="/source/boxes/activeboxcontent-js/#L448" sourceLabel="ActiveBoxContent.js:448" />

Numeric identifier used in activities to resolve relationships between cells

<MemberHeading id="img" depth="3" name="img" sig="img: external:HTMLImageElement" />

<MemberMeta sourceHref="/source/boxes/activeboxcontent-js/#L455" sourceLabel="ActiveBoxContent.js:455" />

The realized image used by this box content.

<MemberHeading id="animatedgiffile" depth="3" name="animatedGifFile" sig="animatedGifFile: string" />

<MemberMeta sourceHref="/source/boxes/activeboxcontent-js/#L460" sourceLabel="ActiveBoxContent.js:460" />

When `img` is an animated GIF file, this field should contain its file name

<MemberHeading id="innerhtmltext" depth="3" name="innerHtmlText" sig="innerHtmlText: string" />

<MemberMeta sourceHref="/source/boxes/activeboxcontent-js/#L465" sourceLabel="ActiveBoxContent.js:465" />

When not null, this content should be treated as an HTML element

<MemberHeading id="amp" depth="3" name="amp" sig="amp: module:media/ActiveMediaPlayer.ActiveMediaPlayer" />

<MemberMeta sourceHref="/source/boxes/activeboxcontent-js/#L470" sourceLabel="ActiveBoxContent.js:470" />

The [ActiveMediaPlayer](/module/media-activemediaplayer#activemediaplayer) associated with this content. Updated at run-time.

<MemberHeading id="mbe" depth="3" name="mbe" sig="mbe: module:bags/MediaBagElement.MediaBagElement" />

<MemberMeta sourceHref="/source/boxes/activeboxcontent-js/#L475" sourceLabel="ActiveBoxContent.js:475" />

The `module:bads/MediaBagElement.MediaBagElement` associated with this content, if any. Updated at run-time.

## Static Fields

<MemberHeading id="emptycontent" depth="3" name="EMPTY_CONTENT" sig="EMPTY_CONTENT: module:boxes/ActiveBoxContent.ActiveBoxContent" />

<MemberMeta badges="static" sourceHref="/source/boxes/activeboxcontent-js/#L482" sourceLabel="ActiveBoxContent.js:482" />

An empty ActiveBoxContent
