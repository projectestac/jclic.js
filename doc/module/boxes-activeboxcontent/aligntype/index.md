---
title: AlignType
kind: class
longname: module:boxes/ActiveBoxContent.AlignType
description: This class is used as a container for horizontal and vertical alignments of content inside a cell.
---

# AlignType

<SourceLink href="/source/boxes/activeboxcontent-js/#L41" label="ActiveBoxContent.js:41" />

This class is used as a container for horizontal and vertical alignments of content inside a cell.

---

## Constructor

<Signature code="new AlignType(h?: string, v?: string): AlignType" />

AlignType constructor

**Parameters**

- `h` (string, optional) — Horizontal alignment. Possible values are `left`, `center` and `right`
- `v` (string, optional) — Vertical alignment. Possible values are `top`, `center` and `bottom`

---

## Instance Methods

<MemberHeading id="getattributes" depth="3" name="getAttributes" sig="getAttributes(): object" />

<MemberMeta sourceHref="/source/boxes/activeboxcontent-js/#L60" sourceLabel="ActiveBoxContent.js:60" />

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
): module:boxes/ActiveBoxContent.AlignType"
/>

<MemberMeta sourceHref="/source/boxes/activeboxcontent-js/#L69" sourceLabel="ActiveBoxContent.js:69" />

Reads the properties of this AlignType from a data object

**Parameters**

- `data` (object) — The data object to be parsed

**Returns**

- [`module:boxes/ActiveBoxContent.AlignType`](/module/boxes-activeboxcontent#aligntype)
