---
title: Evaluator
kind: class
longname: module:activities/text/Evaluator.Evaluator
description: This class and its derivatives {@link module:activities/text/Evaluator.BasicEvaluator BasicEvaluator} and {@link module:activities/text/Evaluator.ComplexEvaluator ComplexEvaluator} are used to evaluate the answers written by the final users in text activities.
---

# Evaluator

<SourceLink href="/source/activities/text/evaluator-js/#L39" label="Evaluator.js:39" />

This class and its derivatives [BasicEvaluator](/module/activities-text-evaluator#basicevaluator) and\
[ComplexEvaluator](/module/activities-text-evaluator#complexevaluator) are used to evaluate the answers written by the final users\
in text activities.

---

## Constructor

<Signature code="new Evaluator(className: string): Evaluator" />

Evaluator constructor

**Parameters**

- `className` (string) — The class name of this evaluator.

---

## Instance Methods

<MemberHeading id="setproperties" depth="3" name="setProperties" sig="setProperties($xml: external:jQuery)" />

<MemberMeta sourceHref="/source/activities/text/evaluator-js/#L75" sourceLabel="Evaluator.js:75" />

Loads the object settings from a specific JQuery XML element

**Parameters**

- `$xml` ([external:jQuery](/module/utils#jquery)) — The jQuery XML element to parse

<MemberHeading id="getattributes" depth="3" name="getAttributes" sig="getAttributes(): object" />

<MemberMeta sourceHref="/source/activities/text/evaluator-js/#L121" sourceLabel="Evaluator.js:121" />

Gets a object with the basic attributes needed to rebuild this instance excluding functions,\
parent references, constants and also attributes retaining the default value.\
The resulting object is commonly usued to serialize elements in JSON format.

**Returns**

- `object`

<MemberHeading id="init" depth="3" name="init" sig="init(_locales: Array.<string>)" />

<MemberMeta sourceHref="/source/activities/text/evaluator-js/#L133" sourceLabel="Evaluator.js:133" />

Initializes this evaluator

**Parameters**

- `_locales` (Array.\<string>) — An array of valid locales, to be used by Intl.Collator

<MemberHeading id="checktext" depth="3" name="checkText" sig="checkText(text: string, match: string | Array.<string>): boolean" />

<MemberMeta sourceHref="/source/activities/text/evaluator-js/#L143" sourceLabel="Evaluator.js:143" />

Checks the given text against a set of valid matches

**Parameters**

- `text` (string) — The text to be checked
- `match` (string | Array.\<string>) — The valid expression or expressions with which to compare.

**Returns**

- `boolean`

<MemberHeading id="checktext" depth="3" name="_checkText" sig="_checkText(_text: string, _match: string): boolean" />

<MemberMeta sourceHref="/source/activities/text/evaluator-js/#L159" sourceLabel="Evaluator.js:159" />

Abstract method to be implemented in subclasses.\
Performs the validation of a string against a single match.

**Parameters**

- `_text` (string) — The text to be checked
- `_match` (string) — A valid expression with which to compare.

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

Evaluates the given text against a set of valid matches, returning an array of flags useful\
to indicate where the mistakes are located.

**Parameters**

- `text` (string) — The text to be checked
- `match` (string | Array.\<string>) — The valid expression or expressions with which to compare.

**Returns**

- `Array.<number>`

<MemberHeading id="evaltext" depth="3" name="_evalText" sig="_evalText(_text: string, _match: string): Array.<number>" />

<MemberMeta sourceHref="/source/activities/text/evaluator-js/#L186" sourceLabel="Evaluator.js:186" />

Abstract method to be implemented in subclasses.\
Performs the evaluation of a string against an array of valid matches, returning an array of\
flags useful to indicate where the mistakes are located.

**Parameters**

- `_text` (string) — The text to be checked
- `_match` (string) — A valid expression with which to compare.

**Returns**

- `Array.<number>`

<MemberHeading id="isok" depth="3" name="isOk" sig="isOk(flags: Array.<number>): boolean" />

<MemberMeta sourceHref="/source/activities/text/evaluator-js/#L196" sourceLabel="Evaluator.js:196" />

Checks if the given array of flags (usually returned by `evalText`) can be considered as a\
valid or erroneous answer.

**Parameters**

- `flags` (Array.\<number>)

**Returns**

- `boolean`

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

Builds a new Evaluator, based on the properties specified in a data object

**Parameters**

- `data` (object) — The data object to be parsed

**Returns**

- [`module:activities/text/Evaluator.Evaluator`](/module/activities-text-evaluator#evaluator)

## Instance Fields

<MemberHeading id="classname" depth="3" name="className" sig="className: string" />

<MemberMeta sourceHref="/source/activities/text/evaluator-js/#L206" sourceLabel="Evaluator.js:206" />

The type of evaluator.

<MemberHeading id="initiated" depth="3" name="initiated" sig="initiated: boolean" />

<MemberMeta sourceHref="/source/activities/text/evaluator-js/#L211" sourceLabel="Evaluator.js:211" />

Whether this evaluator has been initialized or not.

<MemberHeading id="collator" depth="3" name="collator" sig="collator: external:Collator" />

<MemberMeta sourceHref="/source/activities/text/evaluator-js/#L216" sourceLabel="Evaluator.js:216" />

The Intl.Collator object used to compare strings, when available.

<MemberHeading id="checkcase" depth="3" name="checkcase" sig="checkcase: boolean" />

<MemberMeta sourceHref="/source/activities/text/evaluator-js/#L221" sourceLabel="Evaluator.js:221" />

Whether uppercase and lowercase expressions must be considered equivalent or not.
