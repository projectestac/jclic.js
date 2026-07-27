---
title: Arith
kind: class
longname: module:automation/arith/Arith.Arith
description: Arith provides randomly generated mental arithmetics operations, ready to be used in JClic activities. The operations can be additions, subtractions, multiplications or divides. The unknown of these operations can be the result of the operation ( A op B = ? ), any of the two operators ( A op ? = C or ? op B = C ) or also the operator itself ( A ? B = C ).
---

# Arith

**Extends:&#x20;**[`module:automation/AutoContentProvider.AutoContentProvider`](/module/automation-autocontentprovider#autocontentprovider)

<SourceLink href="/source/automation/arith/arith-js/#L54" label="Arith.js:54" />

Arith provides randomly generated mental arithmetics operations, ready to be used in JClic activities.

The operations can be additions, subtractions, multiplications or divides. The unknown of these\
operations can be the result of the operation (`A op B = ?`), any of the two operators\
(`A op ? = C` or `? op B = C`) or also the operator itself (`A ? B = C`).

---

## Constructor

<Signature code="new Arith(): Arith" />

Arith constructor

---

## Instance Methods

<MemberHeading id="setproperties" depth="3" name="setProperties" sig="setProperties($xml: external:jQuery)" />

<MemberMeta sourceHref="/source/automation/arith/arith-js/#L91" sourceLabel="Arith.js:91" />

Loads the object settings from a specific JQuery XML element

**Parameters**

- `$xml` ([external:jQuery](/module/utils#jquery)) — The XML element to parse

<MemberHeading id="getattributes" depth="3" name="getAttributes" sig="getAttributes(): object" />

<MemberMeta sourceHref="/source/automation/arith/arith-js/#L142" sourceLabel="Arith.js:142" />

**Overrides:&#x20;**`module:automation/AutoContentProvider.AutoContentProvider#getAttributes`

Gets a object with the basic attributes needed to rebuild this instance excluding functions,\
parent references, constants and also attributes retaining the default value.\
The resulting object is commonly usued to serialize elements in JSON format.

**Returns**

- `object`

<MemberHeading id="setattributes" depth="3" name="setAttributes" sig="setAttributes(data: object): object" />

<MemberMeta sourceHref="/source/automation/arith/arith-js/#L158" sourceLabel="Arith.js:158" />

Reads the properties of this Arith object from a dataset

**Parameters**

- `data` (object) — The data object to be parsed

**Returns**

- `object`

<MemberHeading
  id="gennum"
  depth="3"
  name="genNum"
  sig="genNum(
	n: module:automation/arith/Arith.Num,
	op: module:automation/arith/Arith.Operator,
	limInf2: number,
	limSup2: number,
): boolean"
/>

<MemberMeta sourceHref="/source/automation/arith/arith-js/#L179" sourceLabel="Arith.js:179" />

Fills the `n` parameter (an `Num`) with a value in accordance with the\
specifications of `op` (an `Operator`), between two limits.

**Parameters**

- `n` (module:automation/arith/Arith.Num) — The number
- `op` (module:automation/arith/Arith.Operator) — The operator
- `limInf2` (number) — Lower limit
- `limSup2` (number) — Upper limit

**Returns**

- `boolean`

<MemberHeading id="genop" depth="3" name="genOp" sig="genOp(o: module:automation/arith/Arith.Operator): boolean" />

<MemberMeta sourceHref="/source/automation/arith/arith-js/#L230" sourceLabel="Arith.js:230" />

Fills the provided `Operator` with real values

**Parameters**

- `o` (module:automation/arith/Arith.Operator) — The operator to use to generate the operation

**Returns**

- `boolean`

<MemberHeading
  id="process"
  depth="3"
  name="process"
  sig="process(
	kit: module:automation/AutoContentProvider.ActiveBagContentKit,
): boolean"
/>

<MemberMeta sourceHref="/source/automation/arith/arith-js/#L421" sourceLabel="Arith.js:421" />

Fills the provided ActiveBagContentKit with randomly generated operations

**Parameters**

- `kit` (module:automation/AutoContentProvider.ActiveBagContentKit) — The composite object to be filled with data.

**Returns**

- `boolean`

<MemberHeading id="setproperties" depth="3" name="setProperties" sig="setProperties($xml: external:jQuery)" />

<MemberMeta sourceHref="/source/automation/arith/arith-js/#L91" sourceLabel="Arith.js:91" />

_Inherited from `module:automation/arith/Arith.Arith#setProperties`_

**Overrides:&#x20;**`module:automation/AutoContentProvider.AutoContentProvider#setProperties`

Loads the object settings from a specific JQuery XML element

**Parameters**

- `$xml` ([external:jQuery](/module/utils#jquery)) — The XML element to parse

<MemberHeading id="init" depth="3" name="init" sig="init()" />

<MemberMeta sourceHref="/source/automation/autocontentprovider-js/#L103" sourceLabel="AutoContentProvider.js:103" />

_Inherited from `module:automation/AutoContentProvider.AutoContentProvider#init`_

**Overrides:&#x20;**`module:automation/AutoContentProvider.AutoContentProvider#init`

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

_Inherited from `module:automation/AutoContentProvider.AutoContentProvider#generateContent`_

**Overrides:&#x20;**`module:automation/AutoContentProvider.AutoContentProvider#generateContent`

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
	kit: module:automation/AutoContentProvider.ActiveBagContentKit,
): boolean"
/>

<MemberMeta sourceHref="/source/automation/arith/arith-js/#L421" sourceLabel="Arith.js:421" />

_Inherited from `module:automation/arith/Arith.Arith#process`_

**Overrides:&#x20;**`module:automation/AutoContentProvider.AutoContentProvider#process`

Fills the provided ActiveBagContentKit with randomly generated operations

**Parameters**

- `kit` (module:automation/AutoContentProvider.ActiveBagContentKit) — The composite object to be filled with data.

**Returns**

- `boolean`

<MemberHeading id="setproperties" depth="3" name="setProperties" sig="setProperties($xml: external:jQuery)" />

<MemberMeta sourceHref="/source/automation/arith/arith-js/#L91" sourceLabel="Arith.js:91" />

_Inherited from `module:automation/arith/Arith.Arith#setProperties`_

**Overrides:&#x20;**`module:automation/AutoContentProvider.AutoContentProvider#setProperties`

Loads the object settings from a specific JQuery XML element

**Parameters**

- `$xml` ([external:jQuery](/module/utils#jquery)) — The XML element to parse

<MemberHeading
  id="process"
  depth="3"
  name="process"
  sig="process(
	kit: module:automation/AutoContentProvider.ActiveBagContentKit,
): boolean"
/>

<MemberMeta sourceHref="/source/automation/arith/arith-js/#L421" sourceLabel="Arith.js:421" />

_Inherited from `module:automation/arith/Arith.Arith#process`_

**Overrides:&#x20;**`module:automation/AutoContentProvider.AutoContentProvider#process`

Fills the provided ActiveBagContentKit with randomly generated operations

**Parameters**

- `kit` (module:automation/AutoContentProvider.ActiveBagContentKit) — The composite object to be filled with data.

**Returns**

- `boolean`

## Static Methods

<MemberHeading id="decformat" depth="3" name="DecFormat" sig="DecFormat(val: number, dec: number, pre: number): string" />

<MemberMeta badges="static" sourceHref="/source/automation/arith/arith-js/#L74" sourceLabel="Arith.js:74" />

Formats the number with a fixed number of decimals, optionally filling the result with leading\
zeroes to have a fixed number of digits.

**Parameters**

- `val` (number) — The value to format
- `dec` (number) — Number of decimals
- `pre` (number) — Minimal number of digits before dot.

**Returns**

- `string`

<MemberHeading id="operatorsetproperties" depth="3" name="Operator#setProperties" sig="Operator#setProperties($xml: external:jQuery)" />

<MemberMeta badges="static" sourceHref="/source/automation/arith/arith-js/#L732" sourceLabel="Arith.js:732" />

Loads Operator settings from a specific JQuery XML element

**Parameters**

- `$xml` ([external:jQuery](/module/utils#jquery)) — The XML element to parse

<MemberHeading id="operatorgetattributes" depth="3" name="Operator#getAttributes" sig="Operator#getAttributes(): object" />

<MemberMeta badges="static" sourceHref="/source/automation/arith/arith-js/#L774" sourceLabel="Arith.js:774" />

Gets a object with the basic attributes needed to rebuild this instance excluding functions,\
parent references, constants and also attributes retaining the default value.\
The resulting object is commonly usued to serialize elements in JSON format.

**Returns**

- `object`

<MemberHeading
  id="operatorsetattributes"
  depth="3"
  name="Operator#setAttributes"
  sig="Operator#setAttributes(
	data: object,
): module:automation/arith/Arith.Arith"
/>

<MemberMeta badges="static" sourceHref="/source/automation/arith/arith-js/#L788" sourceLabel="Arith.js:788" />

Reads the properties of this operator from a dataset

**Parameters**

- `data` (object) — The data object to be parsed

**Returns**

- [`module:automation/arith/Arith.Arith`](/module/automation-arith-arith#arith)

<MemberHeading
  id="getprovider"
  depth="3"
  name="getProvider"
  sig="getProvider(
	$xml: external.jQuery,
): module:automation/AutoContentProvider.AutoContentProvider"
/>

<MemberMeta badges="static" sourceHref="/source/automation/autocontentprovider-js/#L54" sourceLabel="AutoContentProvider.js:54" />

_Inherited from `module:automation/AutoContentProvider.AutoContentProvider`_

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

_Inherited from `module:automation/AutoContentProvider.AutoContentProvider`_

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

_Inherited from `module:automation/AutoContentProvider.AutoContentProvider`_

Registers a new type of AutoContentProvider

**Parameters**

- `providerName` (string) — The name used to identify this AutoContentProvider
- `providerClass` (function) — The activity class, usually extending AutoContentProvider

**Returns**

- [`module:automation/AutoContentProvider.AutoContentProvider`](/module/automation-autocontentprovider#autocontentprovider)

## Instance Fields

<MemberHeading id="opa" depth="3" name="opA" sig="opA: module:automation/arith/Arith.Operator" />

<MemberMeta sourceHref="/source/automation/arith/arith-js/#L635" sourceLabel="Arith.js:635" />

First operator

<MemberHeading id="opb" depth="3" name="opB" sig="opB: module:automation/arith/Arith.Operator" />

<MemberMeta sourceHref="/source/automation/arith/arith-js/#L640" sourceLabel="Arith.js:640" />

Second operator

<MemberHeading id="useadd" depth="3" name="use_add" sig="use_add: boolean" />

<MemberMeta sourceHref="/source/automation/arith/arith-js/#L645" sourceLabel="Arith.js:645" />

Allow additions

<MemberHeading id="usesubst" depth="3" name="use_subst" sig="use_subst: boolean" />

<MemberMeta sourceHref="/source/automation/arith/arith-js/#L650" sourceLabel="Arith.js:650" />

Allow subtractions

<MemberHeading id="usemult" depth="3" name="use_mult" sig="use_mult: boolean" />

<MemberMeta sourceHref="/source/automation/arith/arith-js/#L655" sourceLabel="Arith.js:655" />

Allow multiplications

<MemberHeading id="usediv" depth="3" name="use_div" sig="use_div: boolean" />

<MemberMeta sourceHref="/source/automation/arith/arith-js/#L660" sourceLabel="Arith.js:660" />

Allow divides

<MemberHeading id="expabx" depth="3" name="exp_abx" sig="exp_abx: boolean" />

<MemberMeta sourceHref="/source/automation/arith/arith-js/#L665" sourceLabel="Arith.js:665" />

Allow expressions of type `A op B = X`

<MemberHeading id="expaxc" depth="3" name="exp_axc" sig="exp_axc: boolean" />

<MemberMeta sourceHref="/source/automation/arith/arith-js/#L670" sourceLabel="Arith.js:670" />

Allow expressions of type `A op X = C`

<MemberHeading id="expxbc" depth="3" name="exp_xbc" sig="exp_xbc: boolean" />

<MemberMeta sourceHref="/source/automation/arith/arith-js/#L675" sourceLabel="Arith.js:675" />

Allow expressions of type `X op B = C`

<MemberHeading id="expaxbc" depth="3" name="exp_axbc" sig="exp_axbc: boolean" />

<MemberMeta sourceHref="/source/automation/arith/arith-js/#L680" sourceLabel="Arith.js:680" />

Allow expressions of type `A x B = C`

<MemberHeading id="expcaxb" depth="3" name="exp_caxb" sig="exp_caxb: boolean" />

<MemberMeta sourceHref="/source/automation/arith/arith-js/#L685" sourceLabel="Arith.js:685" />

Allow inverse expressions, like `C = A op B`

<MemberHeading id="resultliminf" depth="3" name="resultLimInf" sig="resultLimInf: number" />

<MemberMeta sourceHref="/source/automation/arith/arith-js/#L690" sourceLabel="Arith.js:690" />

Lower limit of the result

<MemberHeading id="resultlimsup" depth="3" name="resultLimSup" sig="resultLimSup: number" />

<MemberMeta sourceHref="/source/automation/arith/arith-js/#L695" sourceLabel="Arith.js:695" />

Upper limit of the result

<MemberHeading id="resultcarry" depth="3" name="resultCarry" sig="resultCarry: boolean" />

<MemberMeta sourceHref="/source/automation/arith/arith-js/#L701" sourceLabel="Arith.js:701" />

Allow carry operations

- **See:**
  - [https://en.wikipedia.org/wiki/Carry\_(arithmetic)](https://en.wikipedia.org/wiki/Carry_\(arithmetic\))

<MemberHeading id="resultnodup" depth="3" name="resultNoDup" sig="resultNoDup: boolean" />

<MemberMeta sourceHref="/source/automation/arith/arith-js/#L706" sourceLabel="Arith.js:706" />

Avoid operations with the same result

<MemberHeading id="resultorder" depth="3" name="resultOrder" sig="resultOrder: string" />

<MemberMeta sourceHref="/source/automation/arith/arith-js/#L711" sourceLabel="Arith.js:711" />

Type of sorting of results. Possible values are: 'NOSORT', 'SORTASC' and 'SORTDESC'

<MemberHeading id="opcond" depth="3" name="opCond" sig="opCond: string" />

<MemberMeta sourceHref="/source/automation/arith/arith-js/#L717" sourceLabel="Arith.js:717" />

Sorting of the operands in commutative operations. Possible values are: 'AGB' (_A greater than B_),\
'BGA' (_B greater tan A_) and 'INDIF' (default)

<MemberHeading id="numericcontent" depth="3" name="numericContent" sig="numericContent: boolean" />

<MemberMeta sourceHref="/source/automation/autocontentprovider-js/#L149" sourceLabel="AutoContentProvider.js:149" />

_Inherited from `module:automation/AutoContentProvider.AutoContentProvider#numericContent`_

**Overrides:&#x20;**`module:automation/AutoContentProvider.AutoContentProvider#numericContent`

This AutoContentProvider manages numeric expressions, so text literals should be\
converted to numbers for comparisions, taking in account the\
number format of the current locale (dot or comma as decimal separator)

## Static Fields

<MemberHeading id="classes" depth="3" name="CLASSES" sig="CLASSES: object" />

<MemberMeta badges="static" sourceHref="/source/automation/autocontentprovider-js/#L174" sourceLabel="AutoContentProvider.js:174" />

_Inherited from `module:automation/AutoContentProvider.AutoContentProvider`_

Contains the current list of classes derived from AutoContentProvider.\
This object should be updated by real automation classes at declaration time.\
Currently, only two types of "AutoContentProvider" are defined: [Arith](/module/automation-arith-arith#arith) and TagReplace.

## Other

<MemberHeading id="operator" depth="3" name="Operator" sig="Operator" />

<MemberMeta badges="static" sourceHref="/source/automation/arith/arith-js/#L724" sourceLabel="Arith.js:724" />

Operator is an Utility class used by Arith to encapsulate the properties and methods related\
to the members of the operations.

<MemberHeading id="activebagcontentkit" depth="3" name="ActiveBagContentKit" sig="ActiveBagContentKit" />

<MemberMeta badges="static" sourceHref="/source/automation/autocontentprovider-js/#L160" sourceLabel="AutoContentProvider.js:160" />

_Inherited from `module:automation/AutoContentProvider.AutoContentProvider`_

Utility class used to encapsulate multiple sets of box contents

**Parameters**

- `nRows` (number) — Number of rows to be processed
- `nCols` (number) — Number of columns to be processed
- `content` (Array.\<[module:boxes/ActiveBagContent.ActiveBagContent](/module/boxes-activebagcontent#activebagcontent)>) — Array with one or more containers of [ActiveBoxContent](/module/boxes-activeboxcontent#activeboxcontent)\
  objects to be filled with new content.
- `useIds` (boolean) — `true` when the `id` field of [ActiveBoxContent](/module/boxes-activeboxcontent#activeboxcontent) objects is significant.
