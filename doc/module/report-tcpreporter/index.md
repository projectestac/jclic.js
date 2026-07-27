---
title: report/TCPReporter
kind: module
longname: module:report/TCPReporter
description: "File : report/TCPReporter.js Created : 08/06/2016 By : Francesc Busquets francesc@gmail.com JClic.js An HTML5 player of JClic activities https://projectestac.github.io/jclic.js"
---

# report/TCPReporter

<SourceLink href="/source/report/tcpreporter-js/#L32" label="TCPReporter.js:32" />

File : report/TCPReporter.js\
Created : 08/06/2016\
By : Francesc Busquets [francesc@gmail.com](mailto:francesc@gmail.com)

JClic.js\
An HTML5 player of JClic activities\
https\://projectestac.github.io/jclic.js

- **License:** EUPL-1.2

---

## Other

<MemberHeading id="tcpreporter" depth="3" name="TCPReporter" sig="TCPReporter" />

<MemberMeta badges="static" sourceHref="/source/report/tcpreporter-js/#L43" sourceLabel="TCPReporter.js:43" />

**Extends:&#x20;**`module:reports/Reporter.Reporter`

This special case of `Reporter` connects with an external service reporter providing\
the [JClic Reports API](https://github.com/projectestac/jclic/wiki/JClic-Reports-developers-guide).\
Connection parameters to the reports server (`path`, `service`, `userId`, `key`, `context`...)\
are passed through the `options` element of [JClicPlayer](/module/jclicplayer#jclicplayer) (acting as [JClicPlayer](/module/jclicplayer#jclicplayer)).

**Parameters**

- `ps` ([module:JClicPlayer.JClicPlayer](/module/jclicplayer#jclicplayer)) — The [JClicPlayer](/module/jclicplayer#jclicplayer) used to retrieve settings and localized messages

<MemberHeading id="reportbean" depth="3" name="ReportBean" sig="ReportBean" />

<MemberMeta badges="static" sourceHref="/source/report/tcpreporter-js/#L580" sourceLabel="TCPReporter.js:580" />

This inner class encapsulates a chunk of information in XML format, ready to be\
transmitted to the remote reports server.

**Parameters**

- `id` (string) — The main identifier of this ReportBean. Current valid values are:\
  `get property`, `get_properties`, `add session`, `add activity`, `get groups`, `get users`,\
  `get user data`, `get group data`, `new group`, `new user` and `multiple`.
- `$data` ([external:jQuery](/module/utils#jquery))
