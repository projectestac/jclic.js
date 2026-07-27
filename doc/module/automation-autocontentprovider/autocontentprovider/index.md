---
title: AutoContentProvider
kind: class
longname: module:automation/AutoContentProvider.AutoContentProvider
description: This abstract class is the base for classes that create on-time automatic content for JClic activities, usually using random parameters to assure different content in each session. Activities with AutoContentProvider objects rely on them to build new content on every start.
---

# AutoContentProvider

<SourceLink href="/source/automation/autocontentprovider-js/#L40" label="AutoContentProvider.js:40" />

This abstract class is the base for classes that create on-time automatic content for JClic\
activities, usually using random parameters to assure different content in each session.

Activities with `AutoContentProvider` objects rely on them to build new content on every start.

---

## Constructor

<Signature code="new AutoContentProvider(): AutoContentProvider" />

AutoContentProvider constructor

---

## Instance Methods

<MemberHeading id="setproperties" depth="3" name="setProperties" sig="setProperties($xml: external:jQuery)" />

<MemberMeta sourceHref="/source/automation/autocontentprovider-js/#L73" sourceLabel="AutoContentProvider.js:73" />

Loads the object settings from a specific jQuery XML element

**Parameters**

- `$xml` ([external:jQuery](/module/utils#jquery)) — The XML element to parse

<MemberHeading id="getattributes" depth="3" name="getAttributes" sig="getAttributes(): object" />

<MemberMeta sourceHref="/source/automation/autocontentprovider-js/#L84" sourceLabel="AutoContentProvider.js:84" />

Gets a object with the basic attributes needed to rebuild this instance excluding functions,\
parent references, constants and also attributes retaining the default value.\
The resulting object is commonly usued to serialize elements in JSON format.

**Returns**

- `object`

<MemberHeading id="init" depth="3" name="init" sig="init()" />

<MemberMeta sourceHref="/source/automation/autocontentprovider-js/#L103" sourceLabel="AutoContentProvider.js:103" />

Initializes the content provider

<MemberHeading
  id="generatecontent"
  depth="3"
  name="generateContent"
  sig="generateContent(
	nRows: number,
	nCols: number,
	content: Array.<module:boxes/ActiveBagContent.ActiveBagContent>,
	useIds: boolean,
): boolean"
/>

<MemberMeta sourceHref="/source/automation/autocontentprovider-js/#L116" sourceLabel="AutoContentProvider.js:116" />

Builds an `ActiveBagContentKit` and generates the automatized content.

**Parameters**

- `nRows` (number) — Number of rows to be processed
- `nCols` (number) — Number of columns to be processed
- `content` (Array.\<[module:boxes/ActiveBagContent.ActiveBagContent](/module/boxes-activebagcontent#activebagcontent)>) — Array with one or more containers of [ActiveBoxContent](/module/boxes-activeboxcontent#activeboxcontent)\
  objects to be filled with new content.
- `useIds` (boolean) — When `true`, the `id` field of [ActiveBoxContent](/module/boxes-activeboxcontent#activeboxcontent) objects is significant

**Returns**

- `boolean`

<MemberHeading
  id="process"
  depth="3"
  name="process"
  sig="process(
	_kit: module:automation/AutoContentProvider.ActiveBagContentKit,
): boolean"
/>

<MemberMeta sourceHref="/source/automation/autocontentprovider-js/#L125" sourceLabel="AutoContentProvider.js:125" />

Generates the automatized content

**Parameters**

- `_kit` (module:automation/AutoContentProvider.ActiveBagContentKit) — The objects to be filled with content

**Returns**

- `boolean`

## Static Methods

<MemberHeading
  id="getprovider"
  depth="3"
  name="getProvider"
  sig="getProvider(
	$xml: external.jQuery,
): module:automation/AutoContentProvider.AutoContentProvider"
/>

<MemberMeta badges="static" sourceHref="/source/automation/autocontentprovider-js/#L54" sourceLabel="AutoContentProvider.js:54" />

Dynamic constructor that returns a specific type of AutoContentProvider based on the `class`\
attribute declared on an $xml element.\
It should be called only from [Activity.setProperties](/module/activity/activity#setproperties)

**Parameters**

- `$xml` (external.jQuery) — The XML element to parse

**Returns**

- [`module:automation/AutoContentProvider.AutoContentProvider`](/module/automation-autocontentprovider#autocontentprovider)

<MemberHeading
  id="factory"
  depth="3"
  name="factory"
  sig="factory(
	data: object,
	params: Array.<object>,
): module:shapers/Shaper.Shaper"
/>

<MemberMeta badges="static" sourceHref="/source/automation/autocontentprovider-js/#L95" sourceLabel="AutoContentProvider.js:95" />

Builds a new AutoContentProvider, based on the properties specified in a data object

**Parameters**

- `data` (object) — The data object to be parsed
- `params` (Array.\<object>) — Optional parameters to be passed to `setAttributes`

**Returns**

- [`module:shapers/Shaper.Shaper`](/module/shapers-shaper#shaper)

<MemberHeading
  id="registerclass"
  depth="3"
  name="registerClass"
  sig="registerClass(
	providerName: string,
	providerClass: function,
): module:automation/AutoContentProvider.AutoContentProvider"
/>

<MemberMeta badges="static" sourceHref="/source/automation/autocontentprovider-js/#L136" sourceLabel="AutoContentProvider.js:136" />

Registers a new type of AutoContentProvider

**Parameters**

- `providerName` (string) — The name used to identify this AutoContentProvider
- `providerClass` (function) — The activity class, usually extending AutoContentProvider

**Returns**

- [`module:automation/AutoContentProvider.AutoContentProvider`](/module/automation-autocontentprovider#autocontentprovider)

## Instance Fields

<MemberHeading id="numericcontent" depth="3" name="numericContent" sig="numericContent: boolean" />

<MemberMeta sourceHref="/source/automation/autocontentprovider-js/#L149" sourceLabel="AutoContentProvider.js:149" />

This AutoContentProvider manages numeric expressions, so text literals should be\
converted to numbers for comparisions, taking in account the\
number format of the current locale (dot or comma as decimal separator)

## Static Fields

<MemberHeading id="classes" depth="3" name="CLASSES" sig="CLASSES: object" />

<MemberMeta badges="static" sourceHref="/source/automation/autocontentprovider-js/#L174" sourceLabel="AutoContentProvider.js:174" />

Contains the current list of classes derived from AutoContentProvider.\
This object should be updated by real automation classes at declaration time.\
Currently, only two types of "AutoContentProvider" are defined: [Arith](/module/automation-arith-arith#arith) and TagReplace.

## Other

<MemberHeading id="activebagcontentkit" depth="3" name="ActiveBagContentKit" sig="ActiveBagContentKit" />

<MemberMeta badges="static" sourceHref="/source/automation/autocontentprovider-js/#L160" sourceLabel="AutoContentProvider.js:160" />

Utility class used to encapsulate multiple sets of box contents

**Parameters**

- `nRows` (number) — Number of rows to be processed
- `nCols` (number) — Number of columns to be processed
- `content` (Array.\<[module:boxes/ActiveBagContent.ActiveBagContent](/module/boxes-activebagcontent#activebagcontent)>) — Array with one or more containers of [ActiveBoxContent](/module/boxes-activeboxcontent#activeboxcontent)\
  objects to be filled with new content.
- `useIds` (boolean) — `true` when the `id` field of [ActiveBoxContent](/module/boxes-activeboxcontent#activeboxcontent) objects is significant.
