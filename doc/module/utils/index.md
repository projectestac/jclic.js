---
title: Utils
kind: module
longname: module:Utils
description: "File : Utils.js Created : 01/04/2015 By : Francesc Busquets francesc@gmail.com JClic.js An HTML5 player of JClic activities https://projectestac.github.io/jclic.js"
---

# Utils

<SourceLink href="/source/utils-js/#L32" label="Utils.js:32" />

File : Utils.js\
Created : 01/04/2015\
By : Francesc Busquets [francesc@gmail.com](mailto:francesc@gmail.com)

JClic.js\
An HTML5 player of JClic activities\
https\://projectestac.github.io/jclic.js

- **License:** EUPL-1.2

---

## Static Methods

<MemberHeading
  id="init"
  depth="3"
  name="init"
  sig="init(
	options: object,
	setLog?: boolean,
	setLang?: boolean,
): object"
/>

<MemberMeta badges="static" sourceHref="/source/utils-js/#L217" sourceLabel="Utils.js:217" />

Initializes the global settings

**Parameters**

- `options` (object) — An object with global settings
- `setLog` (boolean, optional, default: true) — When `true`, the log level will be set
- `setLang` (boolean, optional, default: true) — When `true`, the current language will be set

**Returns**

- `object` — The normalized `options` object

<MemberHeading id="getmsg" depth="3" name="getMsg" sig="getMsg(key: string): string" />

<MemberMeta badges="static" sourceHref="/source/utils-js/#L244" sourceLabel="Utils.js:244" />

Function that will return the translation of the provided key\
into the current language.

**Parameters**

- `key` (string) — ID of the expression to be translated

**Returns**

- `string`

<MemberHeading id="normalizelocale" depth="3" name="normalizeLocale" sig="normalizeLocale(locale: string)" />

<MemberMeta badges="static" sourceHref="/source/utils-js/#L255" sourceLabel="Utils.js:255" />

Converts expressions of type 'pt-br', 'FR', 'ca\_es\@valencia'... to the format expected by the i18n system:\
lc\[\_CC]\[@variant] where 'lc' is a two or three lowercase letter language code, CC is an optional two uppercase\
letter country code, followed by an optional 'variant' consisting in letters and/or digits.

**Parameters**

- `locale` (string) — The locale expression to be normalized

**Returns**

- string - The normalized locale

<MemberHeading
  id="checkpreferredlanguage"
  depth="3"
  name="checkPreferredLanguage"
  sig="checkPreferredLanguage(
	availableLangs: Array.<string>,
	defaultLang?: string,
	requestedLang?: string,
): string"
/>

<MemberMeta badges="static" sourceHref="/source/utils-js/#L270" sourceLabel="Utils.js:270" />

Checks if the language preferred by the user (based on browser and/or specific settings)\
is in a list of available languages.

**Parameters**

- `availableLangs` (Array.\<string>) — Array of available languages. It should contain at least one item.
- `defaultLang` (string, optional, default: "en") — Language to be used by default when not found the selected one
- `requestedLang` (string, optional, default: "''") — Request this specific language

**Returns**

- `string`

<MemberHeading id="setloglevel" depth="3" name="setLogLevel" sig="setLogLevel(level: string)" />

<MemberMeta badges="static" sourceHref="/source/utils-js/#L316" sourceLabel="Utils.js:316" />

Establishes the current verbosity level of the logging system

**Parameters**

- `level` (string) — One of the valid strings in [module:Utils.LOG\_LEVELS](/module/utils#loglevels)

<MemberHeading id="log" depth="3" name="log" sig="log(type: string, msg: string)" />

<MemberMeta badges="static" sourceHref="/source/utils-js/#L328" sourceLabel="Utils.js:328" />

Reports a new message to the logging system

**Parameters**

- `type` (string) — The type of message. Mus be `error`, `warn`, `info`, `debug` or `trace`.
- `msg` (string) — The main message to be logged. Additional parameters can be added, like\
  in `console.log` (see: [https://developer.mozilla.org/en-US/docs/Web/API/Console/log](https://developer.mozilla.org/en-US/docs/Web/API/Console/log))

<MemberHeading id="getboolean" depth="3" name="getBoolean" sig="getBoolean(val: string, defaultValue?: boolean): number" />

<MemberMeta badges="static" sourceHref="/source/utils-js/#L352" sourceLabel="Utils.js:352" />

Gets a boolean value from a textual expression

**Parameters**

- `val` (string) — The value to be parsed (`true` for true, null or otherwise for `false`)
- `defaultValue` (boolean, optional, default: false) — The default value to return when `val` is false

**Returns**

- `number`

<MemberHeading id="getval" depth="3" name="getVal" sig="getVal(val: any, defaultValue?: any): any" />

<MemberMeta badges="static" sourceHref="/source/utils-js/#L362" sourceLabel="Utils.js:362" />

Gets a value from an given expression that can be `null`, `undefined` or empty string ('')

**Parameters**

- `val` (any) — The expression to parse
- `defaultValue` (any, optional, default: null) — The value to return when `val` is `null`, `''` or `undefined`

**Returns**

- `any`

<MemberHeading id="getnumber" depth="3" name="getNumber" sig="getNumber(val: any, defaultValue?: number): number" />

<MemberMeta badges="static" sourceHref="/source/utils-js/#L372" sourceLabel="Utils.js:372" />

Gets a number from a string or another number

**Parameters**

- `val` (any) — The expression to parse
- `defaultValue` (number, optional, default: 0) — The default value

**Returns**

- `number`

<MemberHeading id="getpercent" depth="3" name="getPercent" sig="getPercent(val: number): string" />

<MemberMeta badges="static" sourceHref="/source/utils-js/#L381" sourceLabel="Utils.js:381" />

Gets the plain percent expression (without decimals) of the given value

**Parameters**

- `val` (number) — The value to be expressed as a percentile

**Returns**

- `string`

<MemberHeading id="zp" depth="3" name="zp" sig="zp(val: number): string" />

<MemberMeta badges="static" sourceHref="/source/utils-js/#L391" sourceLabel="Utils.js:391" />

Returns the two-digits text expression representing the given number (lesser than 100) zero-padded at left\
Useful for representing hours, minutes and seconds

**Parameters**

- `val` (number) — The number to be processed

**Returns**

- `string`

<MemberHeading id="gethmstime" depth="3" name="getHMStime" sig="getHMStime(millis: number): string" />

<MemberMeta badges="static" sourceHref="/source/utils-js/#L400" sourceLabel="Utils.js:400" />

Returns a given time in \[00h 00'00"] format

**Parameters**

- `millis` (number) — Amount of milliseconds to be processed

**Returns**

- `string`

<MemberHeading id="getdatetime" depth="3" name="getDateTime" sig="getDateTime(date: external:Date): string" />

<MemberMeta badges="static" sourceHref="/source/utils-js/#L411" sourceLabel="Utils.js:411" />

Returns a formatted string with the provided date and time

**Parameters**

- `date` ([external:Date](/module/utils#date)) — The date to be formatted. When `null` or `undefined`, the current date will be used.

**Returns**

- `string`

<MemberHeading id="parseolddate" depth="3" name="parseOldDate" sig="parseOldDate(text: string): external:Date" />

<MemberMeta badges="static" sourceHref="/source/utils-js/#L421" sourceLabel="Utils.js:421" />

Parse 'date' fields generated by "JClic Author" in format d/m/y, with\
variable number of digits.

**Parameters**

- `text` (string) — The old 'date' field

**Returns**

- [`external:Date`](/module/utils#date)

<MemberHeading id="cleanoldlanguagetag" depth="3" name="cleanOldLanguageTag" sig="cleanOldLanguageTag(text: string): string" />

<MemberMeta badges="static" sourceHref="/source/utils-js/#L450" sourceLabel="Utils.js:450" />

Extracts just the ISO-639 language code from complex\
expressions like "English (en)", buid by JClic Author.

**Parameters**

- `text` (string) — The expression to parse

**Returns**

- `string`

<MemberHeading id="gettristate" depth="3" name="getTriState" sig="getTriState(val: string, def: any): number" />

<MemberMeta badges="static" sourceHref="/source/utils-js/#L479" sourceLabel="Utils.js:479" />

Gets a numeric value (0, 1 or 2) from a set of possible values: `false`, `true` and `default`.

**Parameters**

- `val` (string) — The text to be parsed
- `def` (any) — An optional default value

**Returns**

- `number`

<MemberHeading id="fillstring" depth="3" name="fillString" sig="fillString(tag: string, repeats: number): string" />

<MemberMeta badges="static" sourceHref="/source/utils-js/#L489" sourceLabel="Utils.js:489" />

Returns a string with the given `tag` repeated n times

**Parameters**

- `tag` (string) — The tag to be repeated
- `repeats` (number) — The number of times to repeat the tag

**Returns**

- `string`

<MemberHeading id="isnullorundef" depth="3" name="isNullOrUndef" sig="isNullOrUndef(val: any): boolean" />

<MemberMeta badges="static" sourceHref="/source/utils-js/#L498" sourceLabel="Utils.js:498" />

Checks if the provided value is 'null' or 'undefined'.

**Parameters**

- `val` (any) — The value to be parsed

**Returns**

- `boolean`

<MemberHeading id="isequivalent" depth="3" name="isEquivalent" sig="isEquivalent(a: any, b: any): boolean" />

<MemberMeta badges="static" sourceHref="/source/utils-js/#L510" sourceLabel="Utils.js:510" />

Checks if two expressions are equivalent.\
Returns `true` when both parameters are `null` or `undefined`, and also when both have\
equivalent values.

**Parameters**

- `a` (any)
- `b` (any)

**Returns**

- `boolean`

<MemberHeading id="getxmltext" depth="3" name="getXmlText" sig="getXmlText(xml: object): string" />

<MemberMeta badges="static" sourceHref="/source/utils-js/#L519" sourceLabel="Utils.js:519" />

Reads paragraphs, identified by `<p></p>` elements, inside XML data

**Parameters**

- `xml` (object) — The DOM-XML element to be parsed

**Returns**

- `string`

<MemberHeading id="parsexmlnode" depth="3" name="parseXmlNode" sig="parseXmlNode(xml: object, withText?: boolean): object" />

<MemberMeta badges="static" sourceHref="/source/utils-js/#L531" sourceLabel="Utils.js:531" />

Parse the provided XML element node, returning a complex object

**Parameters**

- `xml` (object) — The root XML element to parse
- `withText` (boolean, optional, default: false) — When `true`, any text found inside the XML element is also included in the resulting object.

**Returns**

- `object`

<MemberHeading id="getxmlnodetext" depth="3" name="getXmlNodeText" sig="getXmlNodeText(xml: object): string | object" />

<MemberMeta badges="static" sourceHref="/source/utils-js/#L603" sourceLabel="Utils.js:603" />

Parse the given XML node, known as containing only text elements,\
and return its content as a string (when possible)

**Parameters**

- `xml` (object) — The XML element to parse

**Returns**

- `string | object`

<MemberHeading id="reducetextstostrings" depth="3" name="reduceTextsToStrings" sig="reduceTextsToStrings(obj: object): object" />

<MemberMeta badges="static" sourceHref="/source/utils-js/#L622" sourceLabel="Utils.js:622" />

Recursively explore the given object, converting to a string\
all attributes with a single attribute named 'text'.\
Example:\
{a:1, b:{text:"hello"}, c:{d:2, text:"world"}} => {a:1, b:"hello", c:{d:2, text:"world"}}

**Parameters**

- `obj` (object) — The object to explore

**Returns**

- `object`

<MemberHeading id="csstostring" depth="3" name="cssToString" sig="cssToString(cssObj: object): string" />

<MemberMeta badges="static" sourceHref="/source/utils-js/#L645" sourceLabel="Utils.js:645" />

Creates a string suitable to be used in the 'style' attribute of HTML tags, filled with the\
CSS attributes contained in the provided object.

**Parameters**

- `cssObj` (object)

**Returns**

- `string`

<MemberHeading id="checkcolor" depth="3" name="checkColor" sig="checkColor(color?: string, defaultColor?: string): string" />

<MemberMeta badges="static" sourceHref="/source/utils-js/#L655" sourceLabel="Utils.js:655" />

Converts java-like color codes (like '0xRRGGBB') to valid CSS values like '#RRGGBB' or 'rgba(r,g,b,a)'

**Parameters**

- `color` (string, optional) — A color, as codified in Java
- `defaultColor` (string, optional) — The default color to be used

**Returns**

- `string`

<MemberHeading id="colorhastransparency" depth="3" name="colorHasTransparency" sig="colorHasTransparency(color: string): boolean" />

<MemberMeta badges="static" sourceHref="/source/utils-js/#L672" sourceLabel="Utils.js:672" />

Checks if the provided color has an alpha value less than 1

**Parameters**

- `color` (string) — The color to be analyzed

**Returns**

- `boolean`

<MemberHeading id="cloneobject" depth="3" name="cloneObject" sig="cloneObject(obj: object): object" />

<MemberMeta badges="static" sourceHref="/source/utils-js/#L687" sourceLabel="Utils.js:687" />

Clones the provided object\
See: https\://stackoverflow\.com/questions/41474986/how-to-clone-a-javascript-es6-class-instance

**Parameters**

- `obj` (object)

**Returns**

- `object`

<MemberHeading id="normalizeobject" depth="3" name="normalizeObject" sig="normalizeObject(obj: object): object" />

<MemberMeta badges="static" sourceHref="/source/utils-js/#L696" sourceLabel="Utils.js:696" />

Converts string values to number or boolean when needed

**Parameters**

- `obj` (object) — The object to be processed

**Returns**

- `object`

<MemberHeading id="getattr" depth="3" name="getAttr" sig="getAttr(obj: object, keys?: Array.<string>): object" />

<MemberMeta badges="static" sourceHref="/source/utils-js/#L718" sourceLabel="Utils.js:718" />

Returns an partial clone of an object, containing only the own attributes specified in an array of possible keys.\
When the value of an attribute is of type 'Object' and this object has a method named `getAttributes`, the result of calling\
this method is returned instead of the crude object.

**Parameters**

- `obj` (object) — The object to be processed
- `keys` (Array.\<string>, optional) — An optional array of keys to be included in the resulting object.\
  When null or not set, all keys of `obj` are included. Keys can include a default value separed by '|'.\
  Attributes with default value will be excluded from the resulting object.

**Returns**

- `object`

<MemberHeading id="getvalue" depth="3" name="getValue" sig="getValue(value: any): any" />

<MemberMeta badges="static" sourceHref="/source/utils-js/#L743" sourceLabel="Utils.js:743" />

Gets the minimal representation of the given value (object, array, string, number...)

**Parameters**

- `value` (any) — The value to be processed

**Returns**

- `any`

<MemberHeading id="isempty" depth="3" name="isEmpty" sig="isEmpty(v: any): boolean" />

<MemberMeta badges="static" sourceHref="/source/utils-js/#L760" sourceLabel="Utils.js:760" />

Checks if the given value is an empty object, null or a zero-length string

**Parameters**

- `v` (any) — The value to be checked

**Returns**

- `boolean`

<MemberHeading id="setattr" depth="3" name="setAttr" sig="setAttr(obj: object, data: object, attr: Array.<string>): object" />

<MemberMeta badges="static" sourceHref="/source/utils-js/#L794" sourceLabel="Utils.js:794" />

Fills an object with specific attributes from another data object

**Parameters**

- `obj` (object) — The target object
- `data` (object) — The data object
- `attr` (Array.\<string>) — The list of attributes to be copied from `data` to `obj`\
  Elements of this list can be:\
  a) Just a string. In this case, the native object will be used as a value\
  b) An object with the following members:\
  \- `key`{string} - The attribute name\
  \- `fn` {function} - The function to be invoked to build the object\
  \- `params` {string\[]} - Optional params to be passed to the `setAttributes` method of the created object\
  \- `group` {string} - Used when `data` is an object or an array (possible values are `object` and `array`), and multiple results\
  should be aggregated in a resulting object or array with the same keys (or ordering) as data.\
  \- `init` {string} - Optional parameter indicating if `fn` should be passed with an additional param. This param can be:\
  \- `key` - The member's key

**Returns**

- `object`

<MemberHeading
  id="buildobj"
  depth="3"
  name="buildObj"
  sig="buildObj(
	objType: function,
	data?: object,
	init?: any,
	params?: Array.<object>,
): object"
/>

<MemberMeta badges="static" sourceHref="/source/utils-js/#L826" sourceLabel="Utils.js:826" />

Builds a new object based on the provided constructor, data and initialization value\
Objects used with this function should implement `setAttributes`, or an static method named `factory`

**Parameters**

- `objType` (function) — A class or function to be invoked to build the object.
- `data` (object, optional) — An optional object filled with the attributes to be assigned to the newly created object.
- `init` (any, optional) — An optional value to be passed to the function when invoked with `new`
- `params` (Array.\<object>, optional, default: "\[]") — Optional array of params to be passed when calling `setAttributes` on the final object

**Returns**

- `object`

<MemberHeading id="isseparator" depth="3" name="isSeparator" sig="isSeparator(ch: string): boolean" />

<MemberMeta badges="static" sourceHref="/source/utils-js/#L835" sourceLabel="Utils.js:835" />

Check if the given char is a separator

**Parameters**

- `ch` (string) — A string with a single character

**Returns**

- `boolean`

<MemberHeading id="isworddelimiter" depth="3" name="isWordDelimiter" sig="isWordDelimiter(ch: string): boolean" />

<MemberMeta badges="static" sourceHref="/source/utils-js/#L844" sourceLabel="Utils.js:844" />

Check if the given char is a word delimiter

**Parameters**

- `ch` (string) — A string with a single character

**Returns**

- `boolean`

<MemberHeading id="stringtowords" depth="3" name="stringToWords" sig="stringToWords(str: *): Array.<object>" />

<MemberMeta badges="static" sourceHref="/source/utils-js/#L863" sourceLabel="Utils.js:863" />

Converts a string in an array of objects with 'text' and 'sep' attributes, where 'text' are single words and 'sep'\
are the word separators following each word in the sentence.

**Parameters**

- `str` (\*) — The text to be tokenized

**Returns**

- `Array.<object>`

**Example**

```js
<p>stringToWords(&quot;Hello, World! That's all&quot;) returns:<br>
[<br>
{text: &quot;Hello&quot;, sep: &quot;, &quot;},<br>
{text: &quot;World&quot;, sep: &quot;! &quot;},<br>
{text: &quot;That&quot;, sep: &quot;'&quot;},<br>
{text: &quot;s&quot;, sep: &quot; &quot;},<br>
{text: &quot;all&quot;, sep: &quot;&quot;},<br>
]</p>
```

<MemberHeading id="roundto" depth="3" name="roundTo" sig="roundTo(v: number, n: number): number" />

<MemberMeta badges="static" sourceHref="/source/utils-js/#L897" sourceLabel="Utils.js:897" />

Rounds `v` to the nearest multiple of `n`

**Parameters**

- `v` (number)
- `n` (number) — Cannot be zero!

**Returns**

- `number`

<MemberHeading id="fx" depth="3" name="fx" sig="fx(v: any, n: number): any" />

<MemberMeta badges="static" sourceHref="/source/utils-js/#L907" sourceLabel="Utils.js:907" />

Set the maximum number of decimals for a number

**Parameters**

- `v` (any) — The value to be converted to a fixed number of decimals. Can be anything.
- `n` (number, default: 4) — the maximum number of decimals

**Returns**

- `any`

<MemberHeading
  id="comparemultipleoptions"
  depth="3"
  name="compareMultipleOptions"
  sig="compareMultipleOptions(
	answer: string,
	check: string,
	checkCase?: boolean,
	numeric?: boolean,
): boolean"
/>

<MemberMeta badges="static" sourceHref="/source/utils-js/#L920" sourceLabel="Utils.js:920" />

Compares the provided answer against multiple valid options. These valid options are\
concatenated in a string, separated by pipe chars (`|`). The comparing can be case sensitive.

**Parameters**

- `answer` (string) — The text to check against to
- `check` (string) — String containing one or multiple options, separated by `|`
- `checkCase` (boolean, optional, default: false) — When true, the comparing will be case-sensitive
- `numeric` (boolean, optional, default: false) — When true, we are comparing numeric expressions

**Returns**

- `boolean`

<MemberHeading id="endswith" depth="3" name="endsWith" sig="endsWith(text: string, expr: string, trim?: boolean): boolean" />

<MemberMeta badges="static" sourceHref="/source/utils-js/#L948" sourceLabel="Utils.js:948" />

Checks if the given string ends with the specified expression

**Parameters**

- `text` (string) — The string where to find the expression
- `expr` (string) — The expression to search for.
- `trim` (boolean, optional) — When `true`, the `text` string will be trimmed before check

**Returns**

- `boolean`

<MemberHeading id="startswith" depth="3" name="startsWith" sig="startsWith(text: string, expr: string, trim?: boolean): boolean" />

<MemberMeta badges="static" sourceHref="/source/utils-js/#L959" sourceLabel="Utils.js:959" />

Checks if the given string starts with the specified expression

**Parameters**

- `text` (string) — The string where to find the expression
- `expr` (string) — The expression to search for.
- `trim` (boolean, optional) — When `true`, the `text` string will be trimmed before check

**Returns**

- `boolean`

<MemberHeading id="nslash" depth="3" name="nSlash" sig="nSlash(str: string): string" />

<MemberMeta badges="static" sourceHref="/source/utils-js/#L969" sourceLabel="Utils.js:969" />

Replaces all occurrences of the backslash character () by a regular slash (/)\
This is useful to normalize bad path names present in some old JClic projects

**Parameters**

- `str` (string) — The string to be normalized

**Returns**

- `string`

<MemberHeading id="isurl" depth="3" name="isURL" sig="isURL(exp: string): boolean" />

<MemberMeta badges="static" sourceHref="/source/utils-js/#L978" sourceLabel="Utils.js:978" />

Checks if the given expression is an absolute URL

**Parameters**

- `exp` (string) — The expression to be checked

**Returns**

- `boolean`

<MemberHeading id="getbasepath" depth="3" name="getBasePath" sig="getBasePath(path: string): string" />

<MemberMeta badges="static" sourceHref="/source/utils-js/#L988" sourceLabel="Utils.js:988" />

Gets the base path of the given file path (absolute or full URL). This base path always ends\
with `/`, meaning it can be concatenated with relative paths without adding a separator.

**Parameters**

- `path` (string) — The full path to be parsed

**Returns**

- `string`

<MemberHeading id="getrelativepath" depth="3" name="getRelativePath" sig="getRelativePath(file: string, path?: string): string" />

<MemberMeta badges="static" sourceHref="/source/utils-js/#L999" sourceLabel="Utils.js:999" />

Gets the full path of `file` relative to `basePath`

**Parameters**

- `file` (string) — The file name
- `path` (string, optional) — The base path

**Returns**

- `string`

<MemberHeading id="getpath" depth="3" name="getPath" sig="getPath(basePath: string, path: string): string" />

<MemberMeta badges="static" sourceHref="/source/utils-js/#L1009" sourceLabel="Utils.js:1009" />

Gets the complete path of a relative or absolute URL, using the provided `basePath`

**Parameters**

- `basePath` (string) — The base URL
- `path` (string) — The filename

**Returns**

- `string`

<MemberHeading
  id="getpathpromise"
  depth="3"
  name="getPathPromise"
  sig="getPathPromise(
	basePath: string,
	path: string,
	zip?: external:JSZip,
): external:Promise"
/>

<MemberMeta badges="static" sourceHref="/source/utils-js/#L1021" sourceLabel="Utils.js:1021" />

Gets a promise with the complete path of a relative or absolute URL, using the provided `basePath`

**Parameters**

- `basePath` (string) — The base URL
- `path` (string) — The filename
- `zip` ([external:JSZip](/module/utils#jszip), optional) — An optional [external:JSZip](/module/utils#jszip) object where to look\
  for the file

**Returns**

- [`external:Promise`](/module/utils#promise)

<MemberHeading
  id="getsvg"
  depth="3"
  name="getSvg"
  sig="getSvg(
	svg: string,
	width?: string,
	height?: string,
	fill?: string,
): string"
/>

<MemberMeta badges="static" sourceHref="/source/utils-js/#L1057" sourceLabel="Utils.js:1057" />

Replaces `width`, `height` and `fill` attributes of a simple SVG image\
with the provided values

**Parameters**

- `svg` (string) — The SVG image as XML string
- `width` (string, optional) — Optional setting for "width" property
- `height` (string, optional) — Optional setting for "height" property
- `fill` (string, optional) — Optional setting for "fill" property

**Returns**

- `string`

<MemberHeading
  id="svgtouri"
  depth="3"
  name="svgToURI"
  sig="svgToURI(
	svg: string,
	width?: string,
	height?: string,
	fill?: string,
): string"
/>

<MemberMeta badges="static" sourceHref="/source/utils-js/#L1076" sourceLabel="Utils.js:1076" />

Encodes a svg expression into a [data URI](https://developer.mozilla.org/en-US/docs/Web/HTTP/data_URIs)\
suitable for the `src` property of `img` elements, optionally changing its original size and fill values.

**Parameters**

- `svg` (string) — The SVG image as XML string
- `width` (string, optional) — Optional setting for "width" property
- `height` (string, optional) — Optional setting for "height" property
- `fill` (string, optional) — Optional setting for "fill" property

**Returns**

- `string`

<MemberHeading
  id="tocsssize"
  depth="3"
  name="toCssSize"
  sig="toCssSize(
	exp: string | number,
	css: object,
	key: string,
	def: string,
): string"
/>

<MemberMeta badges="static" sourceHref="/source/utils-js/#L1089" sourceLabel="Utils.js:1089" />

Converts the given expression into a valid value for CSS size values

**Parameters**

- `exp` (string | number) — The expression to be evaluated. Can be a numeric value, `null` or `undefined`.\
  Positive values are in "px" units, negative ones are "%"
- `css` (object) — An optional Object where the resulting expression (if any) will be saved
- `key` (string) — The key under which the result will be stored in `css`
- `def` (string) — Default value to be used when `exp` is `null` or `undefined`

**Returns**

- `string`

<MemberHeading id="getimgclipurl" depth="3" name="getImgClipUrl" sig="getImgClipUrl(img: object, rect: module:AWT.Rectangle): string" />

<MemberMeta badges="static" sourceHref="/source/utils-js/#L1102" sourceLabel="Utils.js:1102" />

Gets a clip of the give image data, in a URL base64 encoded format

**Parameters**

- `img` (object) — The binary data of the realized image, usually obtained from a `module:bads/MediaBagElement.MediaBagElement`
- `rect` ([module:AWT.Rectangle](/module/awt#rectangle)) — A rectangle containing the requested clip

**Returns**

- `string`

<MemberHeading id="getroothead" depth="3" name="getRootHead" sig="getRootHead(el?: external:HTMLElement): external:HTMLElement" />

<MemberMeta badges="static" sourceHref="/source/utils-js/#L1126" sourceLabel="Utils.js:1126" />

Finds the nearest `head` or root node of a given HTMLElement, useful to place `<style/>` elements when\
the main component of JClic is behind a shadow-root.\
This method will be replaced by a call to [Node.getRootNode()](https://developer.mozilla.org/en-US/docs/Web/API/Node/getRootNode)\
when fully supported by all major browsers.

**Parameters**

- `el` ([external:HTMLElement](/module/utils#htmlelement), optional) — The element from which to start the search

**Returns**

- [`external:HTMLElement`](/module/utils#htmlelement)

<MemberHeading
  id="appendstyleathead"
  depth="3"
  name="appendStyleAtHead"
  sig="appendStyleAtHead(
	css: string,
	ps?: module:JClicPlayer.JClicPlayer,
): external:HTMLStyleElement"
/>

<MemberMeta badges="static" sourceHref="/source/utils-js/#L1146" sourceLabel="Utils.js:1146" />

Appends a style element to the `head` or root node nearest to the given `HTMLElement`.

**Parameters**

- `css` (string) — The content of the stylesheet
- `ps` ([module:JClicPlayer.JClicPlayer](/module/jclicplayer#jclicplayer), optional) — An optional `PlayStation` (currently a [JClicPlayer](/module/jclicplayer#jclicplayer)) used as a base to find the root node

**Returns**

- [`external:HTMLStyleElement`](/module/utils#htmlstyleelement)

<MemberHeading
  id="appendstylesheetathead"
  depth="3"
  name="appendStylesheetAtHead"
  sig="appendStylesheetAtHead(
	href: string,
	ps?: module:JClicPlayer.JClicPlayer,
): external:HTMLLinkElement"
/>

<MemberMeta badges="static" sourceHref="/source/utils-js/#L1160" sourceLabel="Utils.js:1160" />

Appends a stylesheet element to the `head` or root node nearest to the given `HTMLElement`.

**Parameters**

- `href` (string) — URL pointing to the stylesheet
- `ps` ([module:JClicPlayer.JClicPlayer](/module/jclicplayer#jclicplayer), optional) — An optional `PlayStation` (currently a [JClicPlayer](/module/jclicplayer#jclicplayer)) used as a base to find the root node

**Returns**

- [`external:HTMLLinkElement`](/module/utils#htmllinkelement)

<MemberHeading
  id="attrforeach"
  depth="3"
  name="attrForEach"
  sig="attrForEach(
	attributes: external:NamedNodeMap,
	callback: function,
)"
/>

<MemberMeta badges="static" sourceHref="/source/utils-js/#L1176" sourceLabel="Utils.js:1176" />

Traverses all the attributes defined in an Element, calling a function with its name and value as a parameters

**Parameters**

- `attributes` ([external:NamedNodeMap](/module/utils#namednodemap)) — The [Element.attributes](https://developer.mozilla.org/en-US/docs/Web/API/Element/attributes)\
  object to be traversed
- `callback` (function) — The function to be called for each [Attr](https://developer.mozilla.org/en-US/docs/Web/API/NamedNodeMap)\
  object. It should take two parametres: `name` and `value`

<MemberHeading
  id="findparentswithchild"
  depth="3"
  name="findParentsWithChild"
  sig="findParentsWithChild(
	obj: object,
	childName: string,
): Array.<object>"
/>

<MemberMeta badges="static" sourceHref="/source/utils-js/#L1188" sourceLabel="Utils.js:1188" />

Recursive traversal of all nodes of the given object looking for children having the `childName` attribute\
WARNING: Don't call this method on objects with circular dependencies!

**Parameters**

- `obj` (object) — The object to be analized
- `childName` (string) — Name of the attribute to search for

**Returns**

- `Array.<object>`

<MemberHeading id="getcaretcharacteroffsetwithin" depth="3" name="getCaretCharacterOffsetWithin" sig="getCaretCharacterOffsetWithin(element: object): number" />

<MemberMeta badges="static" sourceHref="/source/utils-js/#L1210" sourceLabel="Utils.js:1210" />

Gets the caret position within the given element. Thanks to\
[Tim Down](http://stackoverflow.com/users/96100/tim-down) answers in:\
[http://stackoverflow.com/questions/4811822/get-a-ranges-start-and-end-offsets-relative-to-its-parent-container](http://stackoverflow.com/questions/4811822/get-a-ranges-start-and-end-offsets-relative-to-its-parent-container)\
and [http://stackoverflow.com/questions/6240139/highlight-text-range-using-javascript/6242538](http://stackoverflow.com/questions/6240139/highlight-text-range-using-javascript/6242538)

**Parameters**

- `element` (object) — A DOM element

**Returns**

- `number`

<MemberHeading id="gettextnodesin" depth="3" name="getTextNodesIn" sig="getTextNodesIn(node: object): Array.<object>" />

<MemberMeta badges="static" sourceHref="/source/utils-js/#L1239" sourceLabel="Utils.js:1239" />

Utility function called by [module:Utils.getCaretCharacterOffsetWithin](/module/utils#getcaretcharacteroffsetwithin)

**Parameters**

- `node` (object) — A text node

**Returns**

- `Array.<object>`

<MemberHeading id="setselectionrange" depth="3" name="setSelectionRange" sig="setSelectionRange(el: object, start: number, end: number)" />

<MemberMeta badges="static" sourceHref="/source/utils-js/#L1260" sourceLabel="Utils.js:1260" />

Sets the selection range (or the cursor position, when `start` and `end` are the same) to a\
specific position inside a DOM element.

**Parameters**

- `el` (object) — The DOM element where to set the cursor
- `start` (number) — The start position of the selection (or cursor position)
- `end` (number) — The end position of the selection. When null or identical to `start`,\
  indicates a cursor position.

<MemberHeading id="mreplace" depth="3" name="mReplace" sig="mReplace(replacements: Array.<Object>, str: String): String" />

<MemberMeta badges="static" sourceHref="/source/utils-js/#L1305" sourceLabel="Utils.js:1305" />

Performs multiple replacements on the provided string\
See: https\://stackoverflow\.com/questions/2501435/replacing-multiple-patterns-in-a-block-of-data

**Parameters**

- `replacements` (Array.\<Object>) — Array of pairs formed by an "expression" (regexp or string) and a "value" (string) to replace the fragments found
- `str` (String) — The string to be checked for replacements

**Returns**

- `String`

## Instance Fields

<MemberHeading id="messages" depth="3" name="_messages" sig="_messages" />

<MemberMeta sourceHref="/source/utils-js/#L208" sourceLabel="Utils.js:208" />

Current dictionary of string translations

## Other

<MemberHeading id="event" depth="3" name="Event" sig="Event" />

<MemberMeta sourceHref="/source/utils-js/#L40" sourceLabel="Utils.js:40" />

The Event interface represents an event which takes place in the DOM.

- **See:**
  - [https://developer.mozilla.org/en-US/docs/Web/API/Event](https://developer.mozilla.org/en-US/docs/Web/API/Event)

<MemberHeading id="htmlelement" depth="3" name="HTMLElement" sig="HTMLElement" />

<MemberMeta sourceHref="/source/utils-js/#L47" sourceLabel="Utils.js:47" />

The HTMLElement interface represents any HTML element. Some elements directly implement this\
interface, others implement it via an interface that inherits it.

- **See:**
  - [https://developer.mozilla.org/ca/docs/Web/API/HTMLElement](https://developer.mozilla.org/ca/docs/Web/API/HTMLElement)

<MemberHeading id="jquery" depth="3" name="jQuery" sig="jQuery" />

<MemberMeta sourceHref="/source/utils-js/#L53" sourceLabel="Utils.js:53" />

A jQuery object

- **See:**
  - [http://api.jquery.com/jQuery/](http://api.jquery.com/jQuery/)

<MemberHeading id="jqxhr" depth="3" name="jqXHR" sig="jqXHR" />

<MemberMeta sourceHref="/source/utils-js/#L62" sourceLabel="Utils.js:62" />

The jQuery XMLHttpRequest (jqXHR) object returned by `$.ajax()` as of jQuery 1.5 is a superset\
of the browser's native [XMLHttpRequest](https://developer.mozilla.org/docs/XMLHttpRequest) object.\
As of jQuery 1.5, jqXHR objects implement the Promise interface, giving them\
all the properties, methods, and behavior of a Promise.

- **See:**
  - [https://api.jquery.com/jQuery.ajax/#jqXHR](https://api.jquery.com/jQuery.ajax/#jqXHR)

<MemberHeading id="canvasrenderingcontext2d" depth="3" name="CanvasRenderingContext2D" sig="CanvasRenderingContext2D" />

<MemberMeta sourceHref="/source/utils-js/#L69" sourceLabel="Utils.js:69" />

The CanvasRenderingContext2D interface provides the 2D rendering context for the drawing surface\
of a \<canvas> element.

- **See:**
  - [https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D)

<MemberHeading id="htmlimageelement" depth="3" name="HTMLImageElement" sig="HTMLImageElement" />

<MemberMeta sourceHref="/source/utils-js/#L78" sourceLabel="Utils.js:78" />

The HTMLImageElement interface provides special properties and methods (beyond the regular\
[HTMLElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement) interface it\
also has available to it by inheritance) for manipulating the layout and presentation of\
\<img> elements.

- **See:**
  - [https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement)

<MemberHeading id="htmlaudioelement" depth="3" name="HTMLAudioElement" sig="HTMLAudioElement" />

<MemberMeta sourceHref="/source/utils-js/#L86" sourceLabel="Utils.js:86" />

The HTMLAudioElement interface provides access to the properties of \<audio> elements, as\
well as methods to manipulate them. It derives from the\
[HTMLMediaElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement) interface.

- **See:**
  - [https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement)

<MemberHeading id="audiocontext" depth="3" name="AudioContext" sig="AudioContext" />

<MemberMeta sourceHref="/source/utils-js/#L92" sourceLabel="Utils.js:92" />

The AudioContext interface represents an audio-processing graph built from audio modules linked together.

- **See:**
  - [https://developer.mozilla.org/en-US/docs/Web/API/AudioContext](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext)

<MemberHeading id="collator" depth="3" name="Collator" sig="Collator" />

<MemberMeta sourceHref="/source/utils-js/#L99" sourceLabel="Utils.js:99" />

The Intl.Collator object is a constructor for collators, objects that enable language sensitive\
string comparison.

- **See:**
  - [https://developer.mozilla.org/ca/docs/Web/JavaScript/Reference/Global\_Objects/Collator](https://developer.mozilla.org/ca/docs/Web/JavaScript/Reference/Global_Objects/Collator)

<MemberHeading id="jszip" depth="3" name="JSZip" sig="JSZip" />

<MemberMeta sourceHref="/source/utils-js/#L105" sourceLabel="Utils.js:105" />

A JSZip object

- **See:**
  - [https://stuk.github.io/jszip](https://stuk.github.io/jszip)

<MemberHeading id="mediarecorder" depth="3" name="MediaRecorder" sig="MediaRecorder" />

<MemberMeta sourceHref="/source/utils-js/#L112" sourceLabel="Utils.js:112" />

The MediaRecorder interface of the [MediaRecorder API](https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder_API)\
provides functionality to easily capture media.

- **See:**
  - [https://developer.mozilla.org/ca/docs/Web/API/MediaRecorder](https://developer.mozilla.org/ca/docs/Web/API/MediaRecorder)

<MemberHeading id="promise" depth="3" name="Promise" sig="Promise" />

<MemberMeta sourceHref="/source/utils-js/#L119" sourceLabel="Utils.js:119" />

The Promise object is used for asynchronous computations. A Promise represents an operation\
that hasn't completed yet, but is expected in the future.

- **See:**
  - [https://developer.mozilla.org/ca/docs/Web/JavaScript/Reference/Global\_Objects/Promise](https://developer.mozilla.org/ca/docs/Web/JavaScript/Reference/Global_Objects/Promise)

<MemberHeading id="storage" depth="3" name="Storage" sig="Storage" />

<MemberMeta sourceHref="/source/utils-js/#L126" sourceLabel="Utils.js:126" />

The Storage interface of the Web Storage API provides access to the session storage or local storage for a particular domain,\
allowing you to for example add, modify or delete stored data items.

- **See:**
  - [https://developer.mozilla.org/en-US/docs/Web/API/Storage](https://developer.mozilla.org/en-US/docs/Web/API/Storage)

<MemberHeading id="namednodemap" depth="3" name="NamedNodeMap" sig="NamedNodeMap" />

<MemberMeta sourceHref="/source/utils-js/#L133" sourceLabel="Utils.js:133" />

The NamedNodeMap interface represents a collection of Attr objects. Objects inside a NamedNodeMap are not in any particular\
order, unlike NodeList, although they may be accessed by an index as in an array.

- **See:**
  - [https://developer.mozilla.org/en-US/docs/Web/API/NamedNodeMap](https://developer.mozilla.org/en-US/docs/Web/API/NamedNodeMap)

<MemberHeading id="midiplayerjs" depth="3" name="MidiPlayerJS" sig="MidiPlayerJS" />

<MemberMeta sourceHref="/source/utils-js/#L139" sourceLabel="Utils.js:139" />

MidiPlayerJS is a JavaScript library which reads standard MIDI files and emits JSON events in real time.

- **See:**
  - [https://github.com/grimmdude/MidiPlayerJS](https://github.com/grimmdude/MidiPlayerJS)

<MemberHeading id="date" depth="3" name="Date" sig="Date" />

<MemberMeta sourceHref="/source/utils-js/#L145" sourceLabel="Utils.js:145" />

JavaScript Date objects represent a single moment in time in a platform-independent format.

- **See:**
  - [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global\_Objects/Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)

<MemberHeading id="htmlstyleelement" depth="3" name="HTMLStyleElement" sig="HTMLStyleElement" />

<MemberMeta sourceHref="/source/utils-js/#L152" sourceLabel="Utils.js:152" />

The HTMLStyleElement interface represents a [style](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/style) element.\
It inherits properties and methods from its parent, HTMLElement, and from LinkStyle.

- **See:**
  - [https://developer.mozilla.org/en-US/docs/Web/API/HTMLStyleElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLStyleElement)

<MemberHeading id="htmllinkelement" depth="3" name="HTMLLinkElement" sig="HTMLLinkElement" />

<MemberMeta sourceHref="/source/utils-js/#L159" sourceLabel="Utils.js:159" />

The HTMLLinkElement interface represents reference information for external resources and the relationship of those resources to a document and vice versa.\
It inherits properties and methods from its parent, HTMLElement, and from LinkStyle.

- **See:**
  - [https://developer.mozilla.org/en-US/docs/Web/API/HTMLLinkElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLLinkElement)

<MemberHeading id="instrument" depth="3" name="Instrument" sig="Instrument" />

<MemberMeta sourceHref="/source/utils-js/#L165" sourceLabel="Utils.js:165" />

Type of MIDI instrument used by Soundfont Player

- **See:**
  - [https://github.com/danigb/soundfont-player](https://github.com/danigb/soundfont-player)

<MemberHeading id="pkg" depth="3" name="pkg" sig="pkg" />

<MemberMeta badges="static" sourceHref="/source/utils-js/#L175" sourceLabel="Utils.js:175" />

Exports third-party NPM packages used by JClic, so they become available to other scripts through\
the global variable `JClicObject` (defined in `module:JClic.JClic`)

<MemberHeading id="loglevels" depth="3" name="LOG_LEVELS" sig="LOG_LEVELS: Array.<string>" />

<MemberMeta badges="static" sourceHref="/source/utils-js/#L185" sourceLabel="Utils.js:185" />

List of valid verbosity levels

<MemberHeading id="logprintlabels" depth="3" name="LOG_PRINT_LABELS" sig="LOG_PRINT_LABELS: Array.<string>" />

<MemberMeta badges="static" sourceHref="/source/utils-js/#L191" sourceLabel="Utils.js:191" />

Labels printed on logs for each message type

<MemberHeading id="logoptions" depth="3" name="LOG_OPTIONS" sig="LOG_OPTIONS: object" />

<MemberMeta badges="static" sourceHref="/source/utils-js/#L196" sourceLabel="Utils.js:196" />

Options of the logging system

<MemberHeading id="false" depth="3" name="FALSE" sig="FALSE: number" />

<MemberMeta badges="static" sourceHref="/source/utils-js/#L465" sourceLabel="Utils.js:465" />

<MemberHeading id="true" depth="3" name="TRUE" sig="TRUE: number" />

<MemberMeta badges="static" sourceHref="/source/utils-js/#L468" sourceLabel="Utils.js:468" />

<MemberHeading id="default" depth="3" name="DEFAULT" sig="DEFAULT: number" />

<MemberMeta badges="static" sourceHref="/source/utils-js/#L471" sourceLabel="Utils.js:471" />

<MemberHeading id="html" depth="3" name="$HTML" sig="$HTML: object" />

<MemberMeta badges="static" sourceHref="/source/utils-js/#L1041" sourceLabel="Utils.js:1041" />

Utility object that provides several methods to build simple and complex DOM objects

<MemberHeading id="settings" depth="3" name="settings" sig="settings" />

<MemberMeta badges="static" sourceHref="/source/utils-js/#L1313" sourceLabel="Utils.js:1313" />

Global constants

<MemberHeading id="utils" depth="3" name="Utils" sig="Utils" />

<MemberMeta badges="static" sourceHref="/source/utils-js/#L1433" sourceLabel="Utils.js:1433" />

Miscellaneous utility functions and constants
