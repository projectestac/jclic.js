---
title: activities/text/Evaluator
kind: module
longname: module:activities/text/Evaluator
description: "File : activities/text/Evaluator.js Created : 14/04/2015 By : Francesc Busquets francesc@gmail.com JClic.js An HTML5 player of JClic activities https://projectestac.github.io/jclic.js"
---

# activities/text/Evaluator

<SourceLink href="/source/activities/text/evaluator-js/#L32" label="Evaluator.js:32" />

File : activities/text/Evaluator.js\
Created : 14/04/2015\
By : Francesc Busquets [francesc@gmail.com](mailto:francesc@gmail.com)

JClic.js\
An HTML5 player of JClic activities\
https\://projectestac.github.io/jclic.js

- **License:** EUPL-1.2

---

## Other

<MemberHeading id="evaluator" depth="3" name="Evaluator" sig="Evaluator" />

<MemberMeta badges="static" sourceHref="/source/activities/text/evaluator-js/#L39" sourceLabel="Evaluator.js:39" />

This class and its derivatives [BasicEvaluator](/module/activities-text-evaluator#basicevaluator) and\
[ComplexEvaluator](/module/activities-text-evaluator#complexevaluator) are used to evaluate the answers written by the final users\
in text activities.

**Parameters**

- `className` (string) — The class name of this evaluator.

<MemberHeading id="basicevaluator" depth="3" name="BasicEvaluator" sig="BasicEvaluator" />

<MemberMeta badges="static" sourceHref="/source/activities/text/evaluator-js/#L229" sourceLabel="Evaluator.js:229" />

**Extends:&#x20;**`module:activities/text/Evaluator.Evaluator`

A basic evaluator that just compares texts, without looking for possible coincidences of text\
fragments once erroneous characters removed.

**Parameters**

- `className` (string) — The class name of this evaluator.

<MemberHeading id="complexevaluator" depth="3" name="ComplexEvaluator" sig="ComplexEvaluator" />

<MemberMeta badges="static" sourceHref="/source/activities/text/evaluator-js/#L348" sourceLabel="Evaluator.js:348" />

**Extends:&#x20;**`module:activities/text/Evaluator.BasicEvaluator`

ComplexEvaluator acts like [BasicEvaluator](/module/activities-text-evaluator#basicevaluator), but providing feedback about\
the location of mistakes on the user's answer.

**Parameters**

- `className` (string) — The class name of this evaluator.
