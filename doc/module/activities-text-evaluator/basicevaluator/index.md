---
title: BasicEvaluator
kind: class
longname: module:activities/text/Evaluator.BasicEvaluator
description: A basic evaluator that just compares texts, without looking for possible coincidences of text fragments once erroneous characters removed.
---

# BasicEvaluator

**Extends:&#x20;**[`module:activities/text/Evaluator.Evaluator`](/module/activities-text-evaluator#evaluator)

<SourceLink href="/source/activities/text/evaluator-js/#L229" label="Evaluator.js:229" />

A basic evaluator that just compares texts, without looking for possible coincidences of text\
fragments once erroneous characters removed.

---

## Constructor

<Signature code="new BasicEvaluator(className: string): BasicEvaluator" />

BasicEvaluator constructor

**Parameters**

- `className` (string) — The class name of this evaluator.

---

## Instance Methods

<MemberHeading id="init" depth="3" name="init" sig="init(locales: Array.<string>)" />

<MemberMeta sourceHref="/source/activities/text/evaluator-js/#L243" sourceLabel="Evaluator.js:243" />

Initializes the [collator](/module/activities-text-evaluator/evaluator#collator).

**Parameters**

- `locales` (Array.\<string>) — An array of valid locales to be used by the Inlt.Collator object

<MemberHeading id="checktext" depth="3" name="_checkText" sig="_checkText(text: string, match: string): boolean" />

<MemberMeta sourceHref="/source/activities/text/evaluator-js/#L263" sourceLabel="Evaluator.js:263" />

Performs the validation of a string against a single match.

**Parameters**

- `text` (string) — The text to be checked
- `match` (string) — A valid expression with which to compare.

**Returns**

- `boolean`

<MemberHeading id="evaltext" depth="3" name="_evalText" sig="_evalText(text: string, match: string): Array.<number>" />

<MemberMeta sourceHref="/source/activities/text/evaluator-js/#L278" sourceLabel="Evaluator.js:278" />

Performs the evaluation of a string against an array of valid matches, returning an array of\
flags useful to indicate where the mistakes are located.\
In BasicEvaluator, all characters are just marked as 1 (error) or 0 (OK). See\
[ComplexEvaluator](/module/activities-text-evaluator#complexevaluator) for more detailed analysis of answers.

**Parameters**

- `text` (string) — The text to be checked
- `match` (string) — A valid expression with which to compare.

**Returns**

- `Array.<number>`

<MemberHeading id="getclearedtext" depth="3" name="getClearedText" sig="getClearedText(src: string, skipped: Array.<boolean>): string" />

<MemberMeta sourceHref="/source/activities/text/evaluator-js/#L289" sourceLabel="Evaluator.js:289" />

Removes double spaces and erroneous characters from a given text expression.

**Parameters**

- `src` (string) — The text to be processed.
- `skipped` (Array.\<boolean>) — An array of boolean indicating which characters should be removed\
  from the string.

**Returns**

- `string`

<MemberHeading id="setproperties" depth="3" name="setProperties" sig="setProperties($xml: external:jQuery)" />

<MemberMeta sourceHref="/source/activities/text/evaluator-js/#L75" sourceLabel="Evaluator.js:75" />

_Inherited from `module:activities/text/Evaluator.Evaluator#setProperties`_

**Overrides:&#x20;**`module:activities/text/Evaluator.Evaluator#setProperties`

Loads the object settings from a specific JQuery XML element

**Parameters**

- `$xml` ([external:jQuery](/module/utils#jquery)) — The jQuery XML element to parse

<MemberHeading id="getattributes" depth="3" name="getAttributes" sig="getAttributes(): object" />

<MemberMeta sourceHref="/source/activities/text/evaluator-js/#L121" sourceLabel="Evaluator.js:121" />

_Inherited from `module:activities/text/Evaluator.Evaluator#getAttributes`_

**Overrides:&#x20;**`module:activities/text/Evaluator.Evaluator#getAttributes`

Gets a object with the basic attributes needed to rebuild this instance excluding functions,\
parent references, constants and also attributes retaining the default value.\
The resulting object is commonly usued to serialize elements in JSON format.

**Returns**

- `object`

<MemberHeading id="init" depth="3" name="init" sig="init(locales: Array.<string>)" />

<MemberMeta sourceHref="/source/activities/text/evaluator-js/#L243" sourceLabel="Evaluator.js:243" />

_Inherited from `module:activities/text/Evaluator.BasicEvaluator#init`_

**Overrides:&#x20;**`module:activities/text/Evaluator.Evaluator#init`

Initializes the [collator](/module/activities-text-evaluator/evaluator#collator).

**Parameters**

- `locales` (Array.\<string>) — An array of valid locales to be used by the Inlt.Collator object

<MemberHeading id="checktext" depth="3" name="checkText" sig="checkText(text: string, match: string | Array.<string>): boolean" />

<MemberMeta sourceHref="/source/activities/text/evaluator-js/#L143" sourceLabel="Evaluator.js:143" />

_Inherited from `module:activities/text/Evaluator.Evaluator#checkText`_

**Overrides:&#x20;**`module:activities/text/Evaluator.Evaluator#checkText`

Checks the given text against a set of valid matches

**Parameters**

- `text` (string) — The text to be checked
- `match` (string | Array.\<string>) — The valid expression or expressions with which to compare.

**Returns**

- `boolean`

<MemberHeading id="checktext" depth="3" name="_checkText" sig="_checkText(text: string, match: string): boolean" />

<MemberMeta sourceHref="/source/activities/text/evaluator-js/#L263" sourceLabel="Evaluator.js:263" />

_Inherited from `module:activities/text/Evaluator.BasicEvaluator#_checkText`_

**Overrides:&#x20;**`module:activities/text/Evaluator.Evaluator#_checkText`

Performs the validation of a string against a single match.

**Parameters**

- `text` (string) — The text to be checked
- `match` (string) — A valid expression with which to compare.

**Returns**

- `boolean`

<MemberHeading
  id="evaltext"
  depth="3"
  name="evalText"
  sig="evalText(
	text: string,
	match: string | Array.<string>,
): Array.<number>"
/>

<MemberMeta sourceHref="/source/activities/text/evaluator-js/#L171" sourceLabel="Evaluator.js:171" />

_Inherited from `module:activities/text/Evaluator.Evaluator#evalText`_

**Overrides:&#x20;**`module:activities/text/Evaluator.Evaluator#evalText`

Evaluates the given text against a set of valid matches, returning an array of flags useful\
to indicate where the mistakes are located.

**Parameters**

- `text` (string) — The text to be checked
- `match` (string | Array.\<string>) — The valid expression or expressions with which to compare.

**Returns**

- `Array.<number>`

<MemberHeading id="evaltext" depth="3" name="_evalText" sig="_evalText(text: string, match: string): Array.<number>" />

<MemberMeta sourceHref="/source/activities/text/evaluator-js/#L278" sourceLabel="Evaluator.js:278" />

_Inherited from `module:activities/text/Evaluator.BasicEvaluator#_evalText`_

**Overrides:&#x20;**`module:activities/text/Evaluator.Evaluator#_evalText`

Performs the evaluation of a string against an array of valid matches, returning an array of\
flags useful to indicate where the mistakes are located.\
In BasicEvaluator, all characters are just marked as 1 (error) or 0 (OK). See\
[ComplexEvaluator](/module/activities-text-evaluator#complexevaluator) for more detailed analysis of answers.

**Parameters**

- `text` (string) — The text to be checked
- `match` (string) — A valid expression with which to compare.

**Returns**

- `Array.<number>`

<MemberHeading id="isok" depth="3" name="isOk" sig="isOk(flags: Array.<number>): boolean" />

<MemberMeta sourceHref="/source/activities/text/evaluator-js/#L196" sourceLabel="Evaluator.js:196" />

_Inherited from `module:activities/text/Evaluator.Evaluator#isOk`_

**Overrides:&#x20;**`module:activities/text/Evaluator.Evaluator#isOk`

Checks if the given array of flags (usually returned by `evalText`) can be considered as a\
valid or erroneous answer.

**Parameters**

- `flags` (Array.\<number>)

**Returns**

- `boolean`

<MemberHeading id="init" depth="3" name="init" sig="init(locales: Array.<string>)" />

<MemberMeta sourceHref="/source/activities/text/evaluator-js/#L243" sourceLabel="Evaluator.js:243" />

_Inherited from `module:activities/text/Evaluator.BasicEvaluator#init`_

**Overrides:&#x20;**`module:activities/text/Evaluator.Evaluator#init`

Initializes the [collator](/module/activities-text-evaluator/evaluator#collator).

**Parameters**

- `locales` (Array.\<string>) — An array of valid locales to be used by the Inlt.Collator object

<MemberHeading id="checktext" depth="3" name="_checkText" sig="_checkText(text: string, match: string): boolean" />

<MemberMeta sourceHref="/source/activities/text/evaluator-js/#L263" sourceLabel="Evaluator.js:263" />

_Inherited from `module:activities/text/Evaluator.BasicEvaluator#_checkText`_

**Overrides:&#x20;**`module:activities/text/Evaluator.Evaluator#_checkText`

Performs the validation of a string against a single match.

**Parameters**

- `text` (string) — The text to be checked
- `match` (string) — A valid expression with which to compare.

**Returns**

- `boolean`

<MemberHeading id="evaltext" depth="3" name="_evalText" sig="_evalText(text: string, match: string): Array.<number>" />

<MemberMeta sourceHref="/source/activities/text/evaluator-js/#L278" sourceLabel="Evaluator.js:278" />

_Inherited from `module:activities/text/Evaluator.BasicEvaluator#_evalText`_

**Overrides:&#x20;**`module:activities/text/Evaluator.Evaluator#_evalText`

Performs the evaluation of a string against an array of valid matches, returning an array of\
flags useful to indicate where the mistakes are located.\
In BasicEvaluator, all characters are just marked as 1 (error) or 0 (OK). See\
[ComplexEvaluator](/module/activities-text-evaluator#complexevaluator) for more detailed analysis of answers.

**Parameters**

- `text` (string) — The text to be checked
- `match` (string) — A valid expression with which to compare.

**Returns**

- `Array.<number>`

## Static Methods

<MemberHeading
  id="getevaluator"
  depth="3"
  name="getEvaluator"
  sig="getEvaluator(
	$xml: external:jQuery,
): module:activities/text/Evaluator.Evaluator"
/>

<MemberMeta badges="static" sourceHref="/source/activities/text/evaluator-js/#L57" sourceLabel="Evaluator.js:57" />

_Inherited from `module:activities/text/Evaluator.Evaluator`_

Factory constructor that returns a specific type of [Evaluator](/module/activities-text-evaluator#evaluator) based on the `class`\
attribute declared in the $xml element.

**Parameters**

- `$xml` ([external:jQuery](/module/utils#jquery)) — The XML element to be parsed.

**Returns**

- [`module:activities/text/Evaluator.Evaluator`](/module/activities-text-evaluator#evaluator)

<MemberHeading
  id="factory"
  depth="3"
  name="factory"
  sig="factory(
	data: object,
): module:activities/text/Evaluator.Evaluator"
/>

<MemberMeta badges="static" sourceHref="/source/activities/text/evaluator-js/#L102" sourceLabel="Evaluator.js:102" />

_Inherited from `module:activities/text/Evaluator.Evaluator`_

Builds a new Evaluator, based on the properties specified in a data object

**Parameters**

- `data` (object) — The data object to be parsed

**Returns**

- [`module:activities/text/Evaluator.Evaluator`](/module/activities-text-evaluator#evaluator)

## Instance Fields

<MemberHeading id="checkaccents" depth="3" name="checkAccents" sig="checkAccents: boolean" />

<MemberMeta sourceHref="/source/activities/text/evaluator-js/#L325" sourceLabel="Evaluator.js:325" />

Whether accented letters must be considered equivalent or not.

<MemberHeading id="checkpunctuation" depth="3" name="checkPunctuation" sig="checkPunctuation: boolean" />

<MemberMeta sourceHref="/source/activities/text/evaluator-js/#L330" sourceLabel="Evaluator.js:330" />

Whether to check or not dots, commas and other punctuation marks when comparing texts.

<MemberHeading id="checkdoublespaces" depth="3" name="checkDoubleSpaces" sig="checkDoubleSpaces: boolean" />

<MemberMeta sourceHref="/source/activities/text/evaluator-js/#L335" sourceLabel="Evaluator.js:335" />

Whether to check or not the extra spaces added between words.

<MemberHeading id="punctuation" depth="3" name="PUNCTUATION" sig="PUNCTUATION: string" />

<MemberMeta sourceHref="/source/activities/text/evaluator-js/#L340" sourceLabel="Evaluator.js:340" />

String containing all the characters considered as punctuation marks (currently ".,;:")

<MemberHeading id="classname" depth="3" name="className" sig="className: string" />

<MemberMeta sourceHref="/source/activities/text/evaluator-js/#L206" sourceLabel="Evaluator.js:206" />

_Inherited from `module:activities/text/Evaluator.Evaluator#className`_

**Overrides:&#x20;**`module:activities/text/Evaluator.Evaluator#className`

The type of evaluator.

<MemberHeading id="initiated" depth="3" name="initiated" sig="initiated: boolean" />

<MemberMeta sourceHref="/source/activities/text/evaluator-js/#L211" sourceLabel="Evaluator.js:211" />

_Inherited from `module:activities/text/Evaluator.Evaluator#initiated`_

**Overrides:&#x20;**`module:activities/text/Evaluator.Evaluator#initiated`

Whether this evaluator has been initialized or not.

<MemberHeading id="collator" depth="3" name="collator" sig="collator: external:Collator" />

<MemberMeta sourceHref="/source/activities/text/evaluator-js/#L216" sourceLabel="Evaluator.js:216" />

_Inherited from `module:activities/text/Evaluator.Evaluator#collator`_

**Overrides:&#x20;**`module:activities/text/Evaluator.Evaluator#collator`

The Intl.Collator object used to compare strings, when available.

<MemberHeading id="checkcase" depth="3" name="checkcase" sig="checkcase: boolean" />

<MemberMeta sourceHref="/source/activities/text/evaluator-js/#L221" sourceLabel="Evaluator.js:221" />

_Inherited from `module:activities/text/Evaluator.Evaluator#checkcase`_

**Overrides:&#x20;**`module:activities/text/Evaluator.Evaluator#checkcase`

Whether uppercase and lowercase expressions must be considered equivalent or not.
