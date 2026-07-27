---
title: report/ActionReg
kind: module
longname: module:report/ActionReg
description: "File : report/ActionReg.js Created : 17/05/2016 By : Francesc Busquets francesc@gmail.com JClic.js An HTML5 player of JClic activities https://projectestac.github.io/jclic.js"
---

# report/ActionReg

<SourceLink href="/source/report/actionreg-js/#L32" label="ActionReg.js:32" />

File : report/ActionReg.js\
Created : 17/05/2016\
By : Francesc Busquets [francesc@gmail.com](mailto:francesc@gmail.com)

JClic.js\
An HTML5 player of JClic activities\
https\://projectestac.github.io/jclic.js

- **License:** EUPL-1.2

---

## Other

<MemberHeading id="actionreg" depth="3" name="ActionReg" sig="ActionReg" />

<MemberMeta badges="static" sourceHref="/source/report/actionreg-js/#L40" sourceLabel="ActionReg.js:40" />

This class stores information about one specific action done by the current user while playing\
an activity.

**Parameters**

- `type` (string) — Type of action (`click`, `write`, `move`, `select`...)
- `+` (string) — source - Description of the object on which the action is done.
- `+` (string) — dest - Description of the object that acts as a target of the action (used in pairings)
- `ok` (boolean) — `true` if the action was OK, `false`, `null` or `undefined` otherwise
