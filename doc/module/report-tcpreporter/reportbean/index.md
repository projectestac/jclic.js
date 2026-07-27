---
title: ReportBean
kind: class
longname: module:report/TCPReporter.ReportBean
description: This inner class encapsulates a chunk of information in XML format, ready to be transmitted to the remote reports server.
---

# ReportBean

<SourceLink href="/source/report/tcpreporter-js/#L580" label="TCPReporter.js:580" />

This inner class encapsulates a chunk of information in XML format, ready to be\
transmitted to the remote reports server.

---

## Constructor

<Signature code="new ReportBean(id: string, $data: external:jQuery): ReportBean" />

ReportBean constructor

**Parameters**

- `id` (string) — The main identifier of this ReportBean. Current valid values are:\
  `get property`, `get_properties`, `add session`, `add activity`, `get groups`, `get users`,\
  `get user data`, `get group data`, `new group`, `new user` and `multiple`.
- `$data` ([external:jQuery](/module/utils#jquery))

---

## Instance Methods

<MemberHeading id="appenddata" depth="3" name="appendData" sig="appendData($data: external:jQuery)" />

<MemberMeta sourceHref="/source/report/tcpreporter-js/#L598" sourceLabel="TCPReporter.js:598" />

Adds an XML element to the bean

**Parameters**

- `$data` ([external:jQuery](/module/utils#jquery)) — The XML element to be added to this bean

<MemberHeading id="setparam" depth="3" name="setParam" sig="setParam(name: string, value: string | number | boolean)" />

<MemberMeta sourceHref="/source/report/tcpreporter-js/#L609" sourceLabel="TCPReporter.js:609" />

Adds an XML element of type `param` to this ReportBean

**Parameters**

- `name` (string) — The key name of the parameter
- `value` (string | number | boolean) — The value of the parameter

## Instance Fields

<MemberHeading id="bean" depth="3" name="$bean" sig="$bean: external:jQuery" />

<MemberMeta sourceHref="/source/report/tcpreporter-js/#L620" sourceLabel="TCPReporter.js:620" />

The main jQuery XML object managed by this ReportBean
