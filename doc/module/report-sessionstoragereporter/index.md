---
title: report/SessionStorageReporter
kind: module
longname: module:report/SessionStorageReporter
description: "File : report/SessionStorageReporter.js Created : 06/09/2017 By : Francesc Busquets francesc@gmail.com JClic.js An HTML5 player of JClic activities https://projectestac.github.io/jclic.js"
---

# report/SessionStorageReporter

<SourceLink href="/source/report/sessionstoragereporter-js/#L32" label="SessionStorageReporter.js:32" />

File : report/SessionStorageReporter.js\
Created : 06/09/2017\
By : Francesc Busquets [francesc@gmail.com](mailto:francesc@gmail.com)

JClic.js\
An HTML5 player of JClic activities\
https\://projectestac.github.io/jclic.js

- **License:** EUPL-1.2

---

## Other

<MemberHeading id="sessionstoragereporter" depth="3" name="SessionStorageReporter" sig="SessionStorageReporter" />

<MemberMeta badges="static" sourceHref="/source/report/sessionstoragereporter-js/#L42" sourceLabel="SessionStorageReporter.js:42" />

**Extends:&#x20;**`module:reports/Reporter.Reporter`

This JClic `Reporter` writes persistent data to the browser local session storage. It uses some of\
the [JClic Reports API](https://github.com/projectestac/jclic/wiki/JClic-Reports-developers-guide).\
Connection parameters (`key`, `context`...) are passed through the `options` element of [JClicPlayer](/module/jclicplayer#jclicplayer) (acting as [JClicPlayer](/module/jclicplayer#jclicplayer)).\
Set `storage=local` in `options` to store reports in \[`window.localStorage`][https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)\
instead of \[`window.sessionStorage`][https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage) (default).

**Parameters**

- `ps` ([module:JClicPlayer.JClicPlayer](/module/jclicplayer#jclicplayer)) — The [JClicPlayer](/module/jclicplayer#jclicplayer) used to retrieve settings and localized messages
