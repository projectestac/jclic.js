---
title: activities/text/TextActivityDocument
kind: module
longname: module:activities/text/TextActivityDocument
description: "File : activities/text/TextActivityDocument.js Created : 14/04/2015 By : Francesc Busquets francesc@gmail.com JClic.js An HTML5 player of JClic activities https://projectestac.github.io/jclic.js"
---

# activities/text/TextActivityDocument

<SourceLink href="/source/activities/text/textactivitydocument-js/#L32" label="TextActivityDocument.js:32" />

File : activities/text/TextActivityDocument.js\
Created : 14/04/2015\
By : Francesc Busquets [francesc@gmail.com](mailto:francesc@gmail.com)

JClic.js\
An HTML5 player of JClic activities\
https\://projectestac.github.io/jclic.js

- **License:** EUPL-1.2

---

## Other

<MemberHeading id="textactivitydocument" depth="3" name="TextActivityDocument" sig="TextActivityDocument" />

<MemberMeta badges="static" sourceHref="/source/activities/text/textactivitydocument-js/#L43" sourceLabel="TextActivityDocument.js:43" />

This is the HTML DOM element used in text activities like [FillInBlanks](/module/activities-text-fillinblanks#fillinblanks),\
[IdentifyText](/module/activities-text-identifytext#identifytext), [OrderText](/module/activities-text-ordertext#ordertext) and [Complete](/module/activities-text-complete#complete). It contains the main document of\
the activity, usually with some elements marked as "targets". In [FillInBlanks](/module/activities-text-fillinblanks#fillinblanks), this\
targets are encapsulated in [TextTarget](/module/activities-text-textactivitydocument#texttarget) objects.

<MemberHeading id="texttarget" depth="3" name="TextTarget" sig="TextTarget" />

<MemberMeta badges="static" sourceHref="/source/activities/text/textactivitydocument-js/#L359" sourceLabel="TextActivityDocument.js:359" />

This class contains the properties and methods of the document elements that are the real\
targets of user actions in text activities.

**Parameters**

- `doc` ([module:activities/text/TextActivityDocument.TextActivityDocument](/module/activities-text-textactivitydocument#textactivitydocument)) — The document to which this target belongs.
- `text` (string) — Main text of this target.
