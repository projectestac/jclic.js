---
title: report/SessionReg
kind: module
longname: module:report/SessionReg
description: "File : report/SessionReg.js Created : 17/05/2016 By : Francesc Busquets francesc@gmail.com JClic.js An HTML5 player of JClic activities https://projectestac.github.io/jclic.js"
---

# report/SessionReg

<SourceLink href="/source/report/sessionreg-js/#L32" label="SessionReg.js:32" />

File : report/SessionReg.js\
Created : 17/05/2016\
By : Francesc Busquets [francesc@gmail.com](mailto:francesc@gmail.com)

JClic.js\
An HTML5 player of JClic activities\
https\://projectestac.github.io/jclic.js

- **License:** EUPL-1.2

---

## Other

<MemberHeading id="sessionreg" depth="3" name="SessionReg" sig="SessionReg" />

<MemberMeta badges="static" sourceHref="/source/report/sessionreg-js/#L38" sourceLabel="SessionReg.js:38" />

This class encapsulates data of a user's working session, usually associated to a single [JClicProject](/module/project-jclicproject#jclicproject)\
It's main component is `sequences`, an array of [SequenceReg](/module/report-sequencereg#sequencereg) objects.

**Parameters**

- `project` ([module:project/JClicProject.JClicProject](/module/project-jclicproject#jclicproject)) — The JClicProject referenced by this session.
- `code` (string, optional) — Optional code to be used by this SessionReg

<MemberHeading id="sessionreginfo" depth="3" name="SessionRegInfo" sig="SessionRegInfo" />

<MemberMeta badges="static" sourceHref="/source/report/sessionreg-js/#L226" sourceLabel="SessionReg.js:226" />

This object stores the global results of a [SessionReg](/module/report-sessionreg#sessionreg)

**Parameters**

- `sReg` ([module:report/SessionReg.SessionReg](/module/report-sessionreg#sessionreg)) — The [SessionReg](/module/report-sessionreg#sessionreg) associated tho this `Info` object.
