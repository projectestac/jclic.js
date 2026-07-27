---
title: report/SCORM
kind: module
longname: module:report/SCORM
description: "File : report/SCORM.js Created : 18/07/2016 By : Francesc Busquets francesc@gmail.com JClic.js An HTML5 player of JClic activities https://projectestac.github.io/jclic.js"
---

# report/SCORM

<SourceLink href="/source/report/scorm-js/#L32" label="SCORM.js:32" />

File : report/SCORM.js\
Created : 18/07/2016\
By : Francesc Busquets [francesc@gmail.com](mailto:francesc@gmail.com)

JClic.js\
An HTML5 player of JClic activities\
https\://projectestac.github.io/jclic.js

- **License:** EUPL-1.2

---

## Other

<MemberHeading id="scorm" depth="3" name="SCORM" sig="SCORM" />

<MemberMeta badges="static" sourceHref="/source/report/scorm-js/#L40" sourceLabel="SCORM.js:40" />

This class detects if JClic.js is running in an SCORM environment and, if true,\
exposes the methods needed to notify the results of activities.\
Both SCORM 1.2 and 2004 are supported.

**Parameters**

- `API` (object) — The global SCORM API object
- `reporter` ([module:report/Reporter.Reporter](/module/report-reporter#reporter)) — The `Reporter` associated to this SCORM object
