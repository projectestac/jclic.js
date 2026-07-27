---
title: Encryption
kind: class
longname: module:report/EncryptMin.Encryption
description: "Utilities to encrypt and decrypt strings using simple methods, just to avoid write passwords in plain text in data and configuration files. Do not use it as a secure cryptographic system! Based on {@link https://github.com/projectestac/jclic/blob/master/src/utilities/edu/xtec/util/Encryption.java Encryption} utilities, created by Albert Llastarri for {@link https://github.com/projectestac/jclic JClic}. IMPORTANT: This is a shortened version of Encryption with only the methods needed to decrypt stored passwords. Full version is on file src/misc/encryption/Encryption.js"
---

# Encryption

<SourceLink href="/source/report/encryptmin-js/#L46" label="EncryptMin.js:46" />

**Modifiers:** `abstract`

Utilities to encrypt and decrypt strings using simple methods, just to avoid write\
passwords in plain text in data and configuration files. Do not use it as a\
secure cryptographic system!

Based on [Encryption](https://github.com/projectestac/jclic/blob/master/src/utilities/edu/xtec/util/Encryption.java)\
utilities, created by Albert Llastarri for [JClic](https://github.com/projectestac/jclic).

IMPORTANT: This is a shortened version of Encryption with only the methods needed to decrypt\
stored passwords. Full version is on file `src/misc/encryption/Encryption.js`

---

## Constructor

<Signature code="new Encryption(): Encryption" />

---

## Static Methods

<MemberHeading id="decrypt" depth="3" name="Decrypt" sig="Decrypt(txt: string): string" />

<MemberMeta badges="static" sourceHref="/source/report/encryptmin-js/#L52" sourceLabel="EncryptMin.js:52" />

Decrypts the given code

**Parameters**

- `txt` (string) — Code to be decrypted

**Returns**

- `string`

<MemberHeading id="hexchararraytochar" depth="3" name="hexCharArrayToChar" sig="hexCharArrayToChar(cA: string, fromIndex: number): string" />

<MemberMeta badges="static" sourceHref="/source/report/encryptmin-js/#L64" sourceLabel="EncryptMin.js:64" />

**Parameters**

- `cA` (string) — (was char\[])
- `fromIndex` (number)

**Returns**

- `string` — (was char)

<MemberHeading id="hexchararraytoint" depth="3" name="hexCharArrayToInt" sig="hexCharArrayToInt(cA: string, fromIndex: number): number" />

<MemberMeta badges="static" sourceHref="/source/report/encryptmin-js/#L81" sourceLabel="EncryptMin.js:81" />

**Parameters**

- `cA` (string) — (was char\[])
- `fromIndex` (number)

**Returns**

- `number`

<MemberHeading id="decodifyzerosfield" depth="3" name="decodifyZerosField" sig="decodifyZerosField(cA: string): string" />

<MemberMeta badges="static" sourceHref="/source/report/encryptmin-js/#L97" sourceLabel="EncryptMin.js:97" />

**Parameters**

- `cA` (string) — (was char\[])

**Returns**

- `string`

<MemberHeading id="decompresszeros" depth="3" name="decompressZeros" sig="decompressZeros(cA: string): string" />

<MemberMeta badges="static" sourceHref="/source/report/encryptmin-js/#L125" sourceLabel="EncryptMin.js:125" />

**Parameters**

- `cA` (string) — (was char\[])

**Returns**

- `string` — (was StringBuilder)

<MemberHeading id="decodifyfromhex" depth="3" name="decodifyFromHex" sig="decodifyFromHex(sb1: string): string" />

<MemberMeta badges="static" sourceHref="/source/report/encryptmin-js/#L154" sourceLabel="EncryptMin.js:154" />

**Parameters**

- `sb1` (string) — (was StringBuilder)

**Returns**

- `string`

<MemberHeading id="unchangeorder" depth="3" name="unchangeOrder" sig="unchangeOrder(s: string): string" />

<MemberMeta badges="static" sourceHref="/source/report/encryptmin-js/#L168" sourceLabel="EncryptMin.js:168" />

**Parameters**

- `s` (string)

**Returns**

- `string` — (was char\[])

<MemberHeading id="codify" depth="3" name="codify" sig="codify(word: string): string" />

<MemberMeta badges="static" sourceHref="/source/report/encryptmin-js/#L185" sourceLabel="EncryptMin.js:185" />

**Parameters**

- `word` (string)

**Returns**

- `string`

<MemberHeading id="decodify" depth="3" name="decodify" sig="decodify(word: string): string" />

<MemberMeta badges="static" sourceHref="/source/report/encryptmin-js/#L195" sourceLabel="EncryptMin.js:195" />

**Parameters**

- `word` (string)

**Returns**

- `string`

## Static Fields

<MemberHeading id="blank" depth="3" name="BLANK" sig="BLANK: string" />

<MemberMeta badges="static" sourceHref="/source/report/encryptmin-js/#L208" sourceLabel="EncryptMin.js:208" />

Default bank password
