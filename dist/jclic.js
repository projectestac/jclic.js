// JClic.js version 0.1.5 (2015-10-07)
// HTML5 player of JClic activities
// (c) 2000-2015 Educational Telematic Network of Catalonia (XTEC)
// This program can be freely redistributed under the terms of the GNU General Public License
// WARNING: You are reading a minimized, uglifyed version of jclic.js. Full, readable source
// code is freely available at: http://projectestac.github.io/jclic.js

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

;(function (exports) {
	'use strict';

  var Arr = (typeof Uint8Array !== 'undefined')
    ? Uint8Array
    : Array

	var PLUS   = '+'.charCodeAt(0)
	var SLASH  = '/'.charCodeAt(0)
	var NUMBER = '0'.charCodeAt(0)
	var LOWER  = 'a'.charCodeAt(0)
	var UPPER  = 'A'.charCodeAt(0)
	var PLUS_URL_SAFE = '-'.charCodeAt(0)
	var SLASH_URL_SAFE = '_'.charCodeAt(0)

	function decode (elt) {
		var code = elt.charCodeAt(0)
		if (code === PLUS ||
		    code === PLUS_URL_SAFE)
			return 62 // '+'
		if (code === SLASH ||
		    code === SLASH_URL_SAFE)
			return 63 // '/'
		if (code < NUMBER)
			return -1 //no match
		if (code < NUMBER + 10)
			return code - NUMBER + 26 + 26
		if (code < UPPER + 26)
			return code - UPPER
		if (code < LOWER + 26)
			return code - LOWER + 26
	}

	function b64ToByteArray (b64) {
		var i, j, l, tmp, placeHolders, arr

		if (b64.length % 4 > 0) {
			throw new Error('Invalid string. Length must be a multiple of 4')
		}

		// the number of equal signs (place holders)
		// if there are two placeholders, than the two characters before it
		// represent one byte
		// if there is only one, then the three characters before it represent 2 bytes
		// this is just a cheap hack to not do indexOf twice
		var len = b64.length
		placeHolders = '=' === b64.charAt(len - 2) ? 2 : '=' === b64.charAt(len - 1) ? 1 : 0

		// base64 is 4/3 + up to two characters of the original data
		arr = new Arr(b64.length * 3 / 4 - placeHolders)

		// if there are placeholders, only get up to the last complete 4 chars
		l = placeHolders > 0 ? b64.length - 4 : b64.length

		var L = 0

		function push (v) {
			arr[L++] = v
		}

		for (i = 0, j = 0; i < l; i += 4, j += 3) {
			tmp = (decode(b64.charAt(i)) << 18) | (decode(b64.charAt(i + 1)) << 12) | (decode(b64.charAt(i + 2)) << 6) | decode(b64.charAt(i + 3))
			push((tmp & 0xFF0000) >> 16)
			push((tmp & 0xFF00) >> 8)
			push(tmp & 0xFF)
		}

		if (placeHolders === 2) {
			tmp = (decode(b64.charAt(i)) << 2) | (decode(b64.charAt(i + 1)) >> 4)
			push(tmp & 0xFF)
		} else if (placeHolders === 1) {
			tmp = (decode(b64.charAt(i)) << 10) | (decode(b64.charAt(i + 1)) << 4) | (decode(b64.charAt(i + 2)) >> 2)
			push((tmp >> 8) & 0xFF)
			push(tmp & 0xFF)
		}

		return arr
	}

	function uint8ToBase64 (uint8) {
		var i,
			extraBytes = uint8.length % 3, // if we have 1 byte left, pad 2 bytes
			output = "",
			temp, length

		function encode (num) {
			return lookup.charAt(num)
		}

		function tripletToBase64 (num) {
			return encode(num >> 18 & 0x3F) + encode(num >> 12 & 0x3F) + encode(num >> 6 & 0x3F) + encode(num & 0x3F)
		}

		// go through the array every three bytes, we'll deal with trailing stuff later
		for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
			temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
			output += tripletToBase64(temp)
		}

		// pad the end with zeros, but make sure to not forget the extra bytes
		switch (extraBytes) {
			case 1:
				temp = uint8[uint8.length - 1]
				output += encode(temp >> 2)
				output += encode((temp << 4) & 0x3F)
				output += '=='
				break
			case 2:
				temp = (uint8[uint8.length - 2] << 8) + (uint8[uint8.length - 1])
				output += encode(temp >> 10)
				output += encode((temp >> 4) & 0x3F)
				output += encode((temp << 2) & 0x3F)
				output += '='
				break
		}

		return output
	}

	exports.toByteArray = b64ToByteArray
	exports.fromByteArray = uint8ToBase64
}(typeof exports === 'undefined' ? (this.base64js = {}) : exports))

},{}],2:[function(require,module,exports){
(function (global){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */

var base64 = require('base64-js')
var ieee754 = require('ieee754')
var isArray = require('is-array')

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50
Buffer.poolSize = 8192 // not used by this implementation

var rootParent = {}

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Safari 5-7 lacks support for changing the `Object.prototype.constructor` property
 *     on objects.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : (function () {
      function Bar () {}
      try {
        var arr = new Uint8Array(1)
        arr.foo = function () { return 42 }
        arr.constructor = Bar
        return arr.foo() === 42 && // typed array instances can be augmented
            arr.constructor === Bar && // constructor can be set
            typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
            arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
      } catch (e) {
        return false
      }
    })()

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

/**
 * Class: Buffer
 * =============
 *
 * The Buffer constructor returns instances of `Uint8Array` that are augmented
 * with function properties for all the node `Buffer` API functions. We use
 * `Uint8Array` so that square bracket notation works as expected -- it returns
 * a single octet.
 *
 * By augmenting the instances, we can avoid modifying the `Uint8Array`
 * prototype.
 */
function Buffer (arg) {
  if (!(this instanceof Buffer)) {
    // Avoid going through an ArgumentsAdaptorTrampoline in the common case.
    if (arguments.length > 1) return new Buffer(arg, arguments[1])
    return new Buffer(arg)
  }

  this.length = 0
  this.parent = undefined

  // Common case.
  if (typeof arg === 'number') {
    return fromNumber(this, arg)
  }

  // Slightly less common case.
  if (typeof arg === 'string') {
    return fromString(this, arg, arguments.length > 1 ? arguments[1] : 'utf8')
  }

  // Unusual.
  return fromObject(this, arg)
}

function fromNumber (that, length) {
  that = allocate(that, length < 0 ? 0 : checked(length) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < length; i++) {
      that[i] = 0
    }
  }
  return that
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') encoding = 'utf8'

  // Assumption: byteLength() return value is always < kMaxLength.
  var length = byteLength(string, encoding) | 0
  that = allocate(that, length)

  that.write(string, encoding)
  return that
}

function fromObject (that, object) {
  if (Buffer.isBuffer(object)) return fromBuffer(that, object)

  if (isArray(object)) return fromArray(that, object)

  if (object == null) {
    throw new TypeError('must start with number, buffer, array or string')
  }

  if (typeof ArrayBuffer !== 'undefined') {
    if (object.buffer instanceof ArrayBuffer) {
      return fromTypedArray(that, object)
    }
    if (object instanceof ArrayBuffer) {
      return fromArrayBuffer(that, object)
    }
  }

  if (object.length) return fromArrayLike(that, object)

  return fromJsonObject(that, object)
}

function fromBuffer (that, buffer) {
  var length = checked(buffer.length) | 0
  that = allocate(that, length)
  buffer.copy(that, 0, 0, length)
  return that
}

function fromArray (that, array) {
  var length = checked(array.length) | 0
  that = allocate(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

// Duplicate of fromArray() to keep fromArray() monomorphic.
function fromTypedArray (that, array) {
  var length = checked(array.length) | 0
  that = allocate(that, length)
  // Truncating the elements is probably not what people expect from typed
  // arrays with BYTES_PER_ELEMENT > 1 but it's compatible with the behavior
  // of the old Buffer constructor.
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array) {
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    array.byteLength
    that = Buffer._augment(new Uint8Array(array))
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromTypedArray(that, new Uint8Array(array))
  }
  return that
}

function fromArrayLike (that, array) {
  var length = checked(array.length) | 0
  that = allocate(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

// Deserialize { type: 'Buffer', data: [1,2,3,...] } into a Buffer object.
// Returns a zero-length buffer for inputs that don't conform to the spec.
function fromJsonObject (that, object) {
  var array
  var length = 0

  if (object.type === 'Buffer' && isArray(object.data)) {
    array = object.data
    length = checked(array.length) | 0
  }
  that = allocate(that, length)

  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
}

function allocate (that, length) {
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = Buffer._augment(new Uint8Array(length))
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that.length = length
    that._isBuffer = true
  }

  var fromPool = length !== 0 && length <= Buffer.poolSize >>> 1
  if (fromPool) that.parent = rootParent

  return that
}

function checked (length) {
  // Note: cannot use `length < kMaxLength` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (subject, encoding) {
  if (!(this instanceof SlowBuffer)) return new SlowBuffer(subject, encoding)

  var buf = new Buffer(subject, encoding)
  delete buf.parent
  return buf
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  var i = 0
  var len = Math.min(x, y)
  while (i < len) {
    if (a[i] !== b[i]) break

    ++i
  }

  if (i !== len) {
    x = a[i]
    y = b[i]
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'binary':
    case 'base64':
    case 'raw':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) throw new TypeError('list argument must be an Array of Buffers.')

  if (list.length === 0) {
    return new Buffer(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; i++) {
      length += list[i].length
    }
  }

  var buf = new Buffer(length)
  var pos = 0
  for (i = 0; i < list.length; i++) {
    var item = list[i]
    item.copy(buf, pos)
    pos += item.length
  }
  return buf
}

function byteLength (string, encoding) {
  if (typeof string !== 'string') string = '' + string

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'binary':
      // Deprecated
      case 'raw':
      case 'raws':
        return len
      case 'utf8':
      case 'utf-8':
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

// pre-set for values that may exist in the future
Buffer.prototype.length = undefined
Buffer.prototype.parent = undefined

function slowToString (encoding, start, end) {
  var loweredCase = false

  start = start | 0
  end = end === undefined || end === Infinity ? this.length : end | 0

  if (!encoding) encoding = 'utf8'
  if (start < 0) start = 0
  if (end > this.length) end = this.length
  if (end <= start) return ''

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'binary':
        return binarySlice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return 0
  return Buffer.compare(this, b)
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset) {
  if (byteOffset > 0x7fffffff) byteOffset = 0x7fffffff
  else if (byteOffset < -0x80000000) byteOffset = -0x80000000
  byteOffset >>= 0

  if (this.length === 0) return -1
  if (byteOffset >= this.length) return -1

  // Negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = Math.max(this.length + byteOffset, 0)

  if (typeof val === 'string') {
    if (val.length === 0) return -1 // special case: looking for empty string always fails
    return String.prototype.indexOf.call(this, val, byteOffset)
  }
  if (Buffer.isBuffer(val)) {
    return arrayIndexOf(this, val, byteOffset)
  }
  if (typeof val === 'number') {
    if (Buffer.TYPED_ARRAY_SUPPORT && Uint8Array.prototype.indexOf === 'function') {
      return Uint8Array.prototype.indexOf.call(this, val, byteOffset)
    }
    return arrayIndexOf(this, [ val ], byteOffset)
  }

  function arrayIndexOf (arr, val, byteOffset) {
    var foundIndex = -1
    for (var i = 0; byteOffset + i < arr.length; i++) {
      if (arr[byteOffset + i] === val[foundIndex === -1 ? 0 : i - foundIndex]) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === val.length) return byteOffset + foundIndex
      } else {
        foundIndex = -1
      }
    }
    return -1
  }

  throw new TypeError('val must be string, number or Buffer')
}

// `get` is deprecated
Buffer.prototype.get = function get (offset) {
  console.log('.get() is deprecated. Access using array indexes instead.')
  return this.readUInt8(offset)
}

// `set` is deprecated
Buffer.prototype.set = function set (v, offset) {
  console.log('.set() is deprecated. Access using array indexes instead.')
  return this.writeUInt8(v, offset)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new Error('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; i++) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) throw new Error('Invalid hex string')
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function binaryWrite (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    var swap = encoding
    encoding = offset
    offset = length | 0
    length = swap
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'binary':
        return binaryWrite(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; i++) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function binarySlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; i++) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; i++) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = Buffer._augment(this.subarray(start, end))
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; i++) {
      newBuf[i] = this[i + start]
    }
  }

  if (newBuf.length) newBuf.parent = this.parent || this

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('buffer must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('value is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0)

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0)

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = value
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; i++) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = value
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; i++) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = value
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = value
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = value < 0 ? 1 : 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = value < 0 ? 1 : 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = value
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = value
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = value
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (value > max || value < min) throw new RangeError('value is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('index out of range')
  if (offset < 0) throw new RangeError('index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; i--) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; i++) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    target._set(this.subarray(start, start + len), targetStart)
  }

  return len
}

// fill(value, start=0, end=buffer.length)
Buffer.prototype.fill = function fill (value, start, end) {
  if (!value) value = 0
  if (!start) start = 0
  if (!end) end = this.length

  if (end < start) throw new RangeError('end < start')

  // Fill 0 bytes; we're done
  if (end === start) return
  if (this.length === 0) return

  if (start < 0 || start >= this.length) throw new RangeError('start out of bounds')
  if (end < 0 || end > this.length) throw new RangeError('end out of bounds')

  var i
  if (typeof value === 'number') {
    for (i = start; i < end; i++) {
      this[i] = value
    }
  } else {
    var bytes = utf8ToBytes(value.toString())
    var len = bytes.length
    for (i = start; i < end; i++) {
      this[i] = bytes[i % len]
    }
  }

  return this
}

/**
 * Creates a new `ArrayBuffer` with the *copied* memory of the buffer instance.
 * Added in Node 0.12. Only available in browsers that support ArrayBuffer.
 */
Buffer.prototype.toArrayBuffer = function toArrayBuffer () {
  if (typeof Uint8Array !== 'undefined') {
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      return (new Buffer(this)).buffer
    } else {
      var buf = new Uint8Array(this.length)
      for (var i = 0, len = buf.length; i < len; i += 1) {
        buf[i] = this[i]
      }
      return buf.buffer
    }
  } else {
    throw new TypeError('Buffer.toArrayBuffer not supported in this browser')
  }
}

// HELPER FUNCTIONS
// ================

var BP = Buffer.prototype

/**
 * Augment a Uint8Array *instance* (not the Uint8Array class!) with Buffer methods
 */
Buffer._augment = function _augment (arr) {
  arr.constructor = Buffer
  arr._isBuffer = true

  // save reference to original Uint8Array set method before overwriting
  arr._set = arr.set

  // deprecated
  arr.get = BP.get
  arr.set = BP.set

  arr.write = BP.write
  arr.toString = BP.toString
  arr.toLocaleString = BP.toString
  arr.toJSON = BP.toJSON
  arr.equals = BP.equals
  arr.compare = BP.compare
  arr.indexOf = BP.indexOf
  arr.copy = BP.copy
  arr.slice = BP.slice
  arr.readUIntLE = BP.readUIntLE
  arr.readUIntBE = BP.readUIntBE
  arr.readUInt8 = BP.readUInt8
  arr.readUInt16LE = BP.readUInt16LE
  arr.readUInt16BE = BP.readUInt16BE
  arr.readUInt32LE = BP.readUInt32LE
  arr.readUInt32BE = BP.readUInt32BE
  arr.readIntLE = BP.readIntLE
  arr.readIntBE = BP.readIntBE
  arr.readInt8 = BP.readInt8
  arr.readInt16LE = BP.readInt16LE
  arr.readInt16BE = BP.readInt16BE
  arr.readInt32LE = BP.readInt32LE
  arr.readInt32BE = BP.readInt32BE
  arr.readFloatLE = BP.readFloatLE
  arr.readFloatBE = BP.readFloatBE
  arr.readDoubleLE = BP.readDoubleLE
  arr.readDoubleBE = BP.readDoubleBE
  arr.writeUInt8 = BP.writeUInt8
  arr.writeUIntLE = BP.writeUIntLE
  arr.writeUIntBE = BP.writeUIntBE
  arr.writeUInt16LE = BP.writeUInt16LE
  arr.writeUInt16BE = BP.writeUInt16BE
  arr.writeUInt32LE = BP.writeUInt32LE
  arr.writeUInt32BE = BP.writeUInt32BE
  arr.writeIntLE = BP.writeIntLE
  arr.writeIntBE = BP.writeIntBE
  arr.writeInt8 = BP.writeInt8
  arr.writeInt16LE = BP.writeInt16LE
  arr.writeInt16BE = BP.writeInt16BE
  arr.writeInt32LE = BP.writeInt32LE
  arr.writeInt32BE = BP.writeInt32BE
  arr.writeFloatLE = BP.writeFloatLE
  arr.writeFloatBE = BP.writeFloatBE
  arr.writeDoubleLE = BP.writeDoubleLE
  arr.writeDoubleBE = BP.writeDoubleBE
  arr.fill = BP.fill
  arr.inspect = BP.inspect
  arr.toArrayBuffer = BP.toArrayBuffer

  return arr
}

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; i++) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00 | 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; i++) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"base64-js":1,"ieee754":3,"is-array":4}],3:[function(require,module,exports){
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}

},{}],4:[function(require,module,exports){

/**
 * isArray
 */

var isArray = Array.isArray;

/**
 * toString
 */

var str = Object.prototype.toString;

/**
 * Whether or not the given `val`
 * is an array.
 *
 * example:
 *
 *        isArray([]);
 *        // > true
 *        isArray(arguments);
 *        // > false
 *        isArray('');
 *        // > false
 *
 * @param {mixed} val
 * @return {bool}
 */

module.exports = isArray || function (val) {
  return !! val && '[object Array]' == str.call(val);
};

},{}],5:[function(require,module,exports){
/*!
 * jQuery JavaScript Library v2.1.4
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-04-28T16:01Z
 */

(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//

var arr = [];

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	version = "2.1.4",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray,

	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		return !jQuery.isArray( obj ) && (obj - parseFloat( obj ) + 1) >= 0;
	},

	isPlainObject: function( obj ) {
		// Not plain objects:
		// - Any object or value whose internal [[Class]] property is not "[object Object]"
		// - DOM nodes
		// - window
		if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		if ( obj.constructor &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
			return false;
		}

		// If the function hasn't returned already, we're confident that
		// |obj| is a plain object, created by {} or constructed with new Object
		return true;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		// Support: Android<4.0, iOS<6 (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		var script,
			indirect = eval;

		code = jQuery.trim( code );

		if ( code ) {
			// If the code includes a valid, prologue position
			// strict mode pragma, execute code by injecting a
			// script tag into the document.
			if ( code.indexOf("use strict") === 1 ) {
				script = document.createElement("script");
				script.text = code;
				document.head.appendChild( script ).parentNode.removeChild( script );
			} else {
			// Otherwise, avoid the DOM node creation, insertion
			// and removal by using an indirect global eval
				indirect( code );
			}
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Support: IE9-11+
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: Date.now,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.0-pre
 * http://sizzlejs.com/
 *
 * Copyright 2008, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-12-16
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + characterEncoding + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];
	nodeType = context.nodeType;

	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	if ( !seed && documentIsHTML ) {

		// Try to shortcut find operations when possible (e.g., not under DocumentFragment)
		if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType !== 1 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;
	parent = doc.defaultView;

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Support tests
	---------------------------------------------------------------------- */
	documentIsHTML = !isXML( doc );

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\f]' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.2+, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.7+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is no seed and only one group
	if ( match.length === 1 ) {

		// Take a shortcut and set the context if the root selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( indexOf.call( qualifier, elem ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			len = this.length,
			ret = [],
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[0] === "<" && selector[ selector.length - 1 ] === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Support: Blackberry 4.6
					// gEBID returns nodes no longer in the document (#6963)
					if ( elem && elem.parentNode ) {
						// Inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function( elem, dir, until ) {
		var matched = [],
			truncate = until !== undefined;

		while ( (elem = elem[ dir ]) && elem.nodeType !== 9 ) {
			if ( elem.nodeType === 1 ) {
				if ( truncate && jQuery( elem ).is( until ) ) {
					break;
				}
				matched.push( elem );
			}
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var matched = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				matched.push( n );
			}
		}

		return matched;
	}
});

jQuery.fn.extend({
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter(function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	while ( (cur = cur[dir]) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return elem.contentDocument || jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.unique( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// Flag to know if list is currently firing
		firing,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );
					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// Add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// If we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
});

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed, false );
	window.removeEventListener( "load", completed, false );
	jQuery.ready();
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// We once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		} else {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			len ? fn( elems[0], key ) : emptyGet;
};


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( owner ) {
	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	/* jshint -W018 */
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};


function Data() {
	// Support: Android<4,
	// Old WebKit does not have Object.preventExtensions/freeze method,
	// return new empty object instead with no [[set]] accessor
	Object.defineProperty( this.cache = {}, 0, {
		get: function() {
			return {};
		}
	});

	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;
Data.accepts = jQuery.acceptData;

Data.prototype = {
	key: function( owner ) {
		// We can accept data for non-element nodes in modern browsers,
		// but we should not, see #8335.
		// Always return the key for a frozen object.
		if ( !Data.accepts( owner ) ) {
			return 0;
		}

		var descriptor = {},
			// Check if the owner object already has a cache key
			unlock = owner[ this.expando ];

		// If not, create one
		if ( !unlock ) {
			unlock = Data.uid++;

			// Secure it in a non-enumerable, non-writable property
			try {
				descriptor[ this.expando ] = { value: unlock };
				Object.defineProperties( owner, descriptor );

			// Support: Android<4
			// Fallback to a less secure definition
			} catch ( e ) {
				descriptor[ this.expando ] = unlock;
				jQuery.extend( owner, descriptor );
			}
		}

		// Ensure the cache object
		if ( !this.cache[ unlock ] ) {
			this.cache[ unlock ] = {};
		}

		return unlock;
	},
	set: function( owner, data, value ) {
		var prop,
			// There may be an unlock assigned to this node,
			// if there is no entry for this "owner", create one inline
			// and set the unlock as though an owner entry had always existed
			unlock = this.key( owner ),
			cache = this.cache[ unlock ];

		// Handle: [ owner, key, value ] args
		if ( typeof data === "string" ) {
			cache[ data ] = value;

		// Handle: [ owner, { properties } ] args
		} else {
			// Fresh assignments by object are shallow copied
			if ( jQuery.isEmptyObject( cache ) ) {
				jQuery.extend( this.cache[ unlock ], data );
			// Otherwise, copy the properties one-by-one to the cache object
			} else {
				for ( prop in data ) {
					cache[ prop ] = data[ prop ];
				}
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		// Either a valid cache is found, or will be created.
		// New caches will be created and the unlock returned,
		// allowing direct access to the newly created
		// empty data object. A valid owner object must be provided.
		var cache = this.cache[ this.key( owner ) ];

		return key === undefined ?
			cache : cache[ key ];
	},
	access: function( owner, key, value ) {
		var stored;
		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				((key && typeof key === "string") && value === undefined) ) {

			stored = this.get( owner, key );

			return stored !== undefined ?
				stored : this.get( owner, jQuery.camelCase(key) );
		}

		// [*]When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i, name, camel,
			unlock = this.key( owner ),
			cache = this.cache[ unlock ];

		if ( key === undefined ) {
			this.cache[ unlock ] = {};

		} else {
			// Support array or space separated string of keys
			if ( jQuery.isArray( key ) ) {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = key.concat( key.map( jQuery.camelCase ) );
			} else {
				camel = jQuery.camelCase( key );
				// Try the string as a key before any manipulation
				if ( key in cache ) {
					name = [ key, camel ];
				} else {
					// If a key with the spaces exists, use it.
					// Otherwise, create an array by matching non-whitespace
					name = camel;
					name = name in cache ?
						[ name ] : ( name.match( rnotwhite ) || [] );
				}
			}

			i = name.length;
			while ( i-- ) {
				delete cache[ name[ i ] ];
			}
		}
	},
	hasData: function( owner ) {
		return !jQuery.isEmptyObject(
			this.cache[ owner[ this.expando ] ] || {}
		);
	},
	discard: function( owner ) {
		if ( owner[ this.expando ] ) {
			delete this.cache[ owner[ this.expando ] ];
		}
	}
};
var data_priv = new Data();

var data_user = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			data_user.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend({
	hasData: function( elem ) {
		return data_user.hasData( elem ) || data_priv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return data_user.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		data_user.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to data_priv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return data_priv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		data_priv.remove( elem, name );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = data_user.get( elem );

				if ( elem.nodeType === 1 && !data_priv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice(5) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					data_priv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				data_user.set( this, key );
			});
		}

		return access( this, function( value ) {
			var data,
				camelKey = jQuery.camelCase( key );

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {
				// Attempt to get data from the cache
				// with the key as-is
				data = data_user.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to get data from the cache
				// with the key camelized
				data = data_user.get( elem, camelKey );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, camelKey, undefined );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each(function() {
				// First, attempt to store a copy or reference of any
				// data that might've been store with a camelCased key.
				var data = data_user.get( this, camelKey );

				// For HTML5 data-* attribute interop, we have to
				// store property names with dashes in a camelCase form.
				// This might not apply to all properties...*
				data_user.set( this, camelKey, value );

				// *... In the case of properties that might _actually_
				// have dashes, we need to also store a copy of that
				// unchanged property.
				if ( key.indexOf("-") !== -1 && data !== undefined ) {
					data_user.set( this, key, value );
				}
			});
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each(function() {
			data_user.remove( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = data_priv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = data_priv.access( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return data_priv.get( elem, key ) || data_priv.access( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				data_priv.remove( elem, [ type + "queue", key ] );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = data_priv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};

var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Safari<=5.1
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari<=5.1, Android<4.2
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<=11+
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
})();
var strundefined = typeof undefined;



support.focusinBubbles = "onfocusin" in window;


var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = data_priv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== strundefined && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = data_priv.hasData( elem ) && data_priv.get( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;
			data_priv.remove( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( data_priv.get( cur, "events" ) || {} )[ event.type ] && data_priv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( data_priv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.disabled !== true || event.type !== "click" ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var eventDoc, doc, body,
				button = original.button;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: Cordova 2.5 (WebKit) (#13255)
		// All events should have a target; Cordova deviceready doesn't
		if ( !event.target ) {
			event.target = document;
		}

		// Support: Safari 6.0+, Chrome<28
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle, false );
	}
};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&
				// Support: Android<4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && e.preventDefault ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && e.stopPropagation ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// Support: Chrome 15+
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// Support: Firefox, Chrome, Safari
// Create "bubbling" focus and blur events
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = data_priv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				data_priv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = data_priv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					data_priv.remove( doc, fix );

				} else {
					data_priv.access( doc, fix, attaches );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var origFn, type;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


var
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {

		// Support: IE9
		option: [ 1, "<select multiple='multiple'>", "</select>" ],

		thead: [ 1, "<table>", "</table>" ],
		col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		_default: [ 0, "", "" ]
	};

// Support: IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

// Support: 1.x compatibility
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute("type");
	}

	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		data_priv.set(
			elems[ i ], "globalEval", !refElements || data_priv.get( refElements[ i ], "globalEval" )
		);
	}
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( data_priv.hasData( src ) ) {
		pdataOld = data_priv.access( src );
		pdataCur = data_priv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( data_user.hasData( src ) ) {
		udataOld = data_user.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		data_user.set( dest, udataCur );
	}
}

function getAll( context, tag ) {
	var ret = context.getElementsByTagName ? context.getElementsByTagName( tag || "*" ) :
			context.querySelectorAll ? context.querySelectorAll( tag || "*" ) :
			[];

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], ret ) :
		ret;
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var elem, tmp, tag, wrap, contains, j,
			fragment = context.createDocumentFragment(),
			nodes = [],
			i = 0,
			l = elems.length;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					// Support: QtWebKit, PhantomJS
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || fragment.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;
					tmp.innerHTML = wrap[ 1 ] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[ 2 ];

					// Descend through wrappers to the right content
					j = wrap[ 0 ];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Support: QtWebKit, PhantomJS
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, tmp.childNodes );

					// Remember the top-level container
					tmp = fragment.firstChild;

					// Ensure the created nodes are orphaned (#12392)
					tmp.textContent = "";
				}
			}
		}

		// Remove wrapper from fragment
		fragment.textContent = "";

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( fragment.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		return fragment;
	},

	cleanData: function( elems ) {
		var data, elem, type, key,
			special = jQuery.event.special,
			i = 0;

		for ( ; (elem = elems[ i ]) !== undefined; i++ ) {
			if ( jQuery.acceptData( elem ) ) {
				key = elem[ data_priv.expando ];

				if ( key && (data = data_priv.cache[ key ]) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}
					if ( data_priv.cache[ key ] ) {
						// Discard any remaining `private` data
						delete data_priv.cache[ key ];
					}
				}
			}
			// Discard any remaining `user` data
			delete data_user.cache[ elem[ data_user.expando ] ];
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each(function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				});
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var fragment, first, scripts, hasScripts, node, doc,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[ 0 ],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[ 0 ] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							// Support: QtWebKit
							// jQuery.merge because push.apply(_, arraylike) throws
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[ i ], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!data_priv.access( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( node.textContent.replace( rcleanScript, "" ) );
							}
						}
					}
				}
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: QtWebKit
			// .get() because push.apply(_, arraylike) throws
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var style,
		elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

			// Use of this method is a temporary fix (more like optimization) until something better comes along,
			// since it was removed from specification and supported only in FF
			style.display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = iframe[ 0 ].contentDocument;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {
		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		if ( elem.ownerDocument.defaultView.opener ) {
			return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
		}

		return window.getComputedStyle( elem, null );
	};



function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,
		style = elem.style;

	computed = computed || getStyles( elem );

	// Support: IE9
	// getPropertyValue is only needed for .css('filter') (#12537)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];
	}

	if ( computed ) {

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// Support: iOS < 6
		// A tribute to the "awesome hack by Dean Edwards"
		// iOS < 6 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
		// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
		if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?
		// Support: IE
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {
				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	var pixelPositionVal, boxSizingReliableVal,
		docElem = document.documentElement,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	if ( !div.style ) {
		return;
	}

	// Support: IE9-11+
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;" +
		"position:absolute";
	container.appendChild( div );

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computePixelPositionAndBoxSizingReliable() {
		div.style.cssText =
			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
			"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
			"border:1px;padding:1px;width:4px;position:absolute";
		div.innerHTML = "";
		docElem.appendChild( container );

		var divStyle = window.getComputedStyle( div, null );
		pixelPositionVal = divStyle.top !== "1%";
		boxSizingReliableVal = divStyle.width === "4px";

		docElem.removeChild( container );
	}

	// Support: node.js jsdom
	// Don't assume that getComputedStyle is a property of the global object
	if ( window.getComputedStyle ) {
		jQuery.extend( support, {
			pixelPosition: function() {

				// This test is executed only once but we still do memoizing
				// since we can use the boxSizingReliable pre-computing.
				// No need to check if the test was already performed, though.
				computePixelPositionAndBoxSizingReliable();
				return pixelPositionVal;
			},
			boxSizingReliable: function() {
				if ( boxSizingReliableVal == null ) {
					computePixelPositionAndBoxSizingReliable();
				}
				return boxSizingReliableVal;
			},
			reliableMarginRight: function() {

				// Support: Android 2.3
				// Check if div with explicit width and no margin-right incorrectly
				// gets computed margin-right based on width of container. (#3333)
				// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
				// This support function is only executed once so no memoizing is needed.
				var ret,
					marginDiv = div.appendChild( document.createElement( "div" ) );

				// Reset CSS: box-sizing; display; margin; border; padding
				marginDiv.style.cssText = div.style.cssText =
					// Support: Firefox<29, Android 2.3
					// Vendor-prefix box-sizing
					"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
					"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
				marginDiv.style.marginRight = marginDiv.style.width = "0";
				div.style.width = "1px";
				docElem.appendChild( container );

				ret = !parseFloat( window.getComputedStyle( marginDiv, null ).marginRight );

				docElem.removeChild( container );
				div.removeChild( marginDiv );

				return ret;
			}
		});
	}
})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
	// Swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[0].toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// Both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// At this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// At this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// At this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// Some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// Check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// Use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = data_priv.get( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = data_priv.access( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display !== "none" || !hidden ) {
				data_priv.set( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

jQuery.extend({

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		"float": "cssFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Support: IE9-11+
			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {
				style[ name ] = value;
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

// Support: Android 2.3
jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE9
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*.
					// Use string for doubling so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur(),
				// break the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = data_priv.get( elem, "fxshow" );

	// Handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// Ensure the complete handler is called before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// Height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE9-10 do not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			data_priv.get( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {
			style.display = "inline-block";
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always(function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		});
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = data_priv.access( elem, "fxshow", {} );
		}

		// Store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;

			data_priv.remove( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// Don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || data_priv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = data_priv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = data_priv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: iOS<=5.1, Android<=4.2+
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE<=11+
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: Android<=2.3
	// Options inside disabled selects are incorrectly marked as disabled
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE<=11+
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
})();


var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					elem[ propName ] = false;
				}

				elem.removeAttribute( name );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle;
		if ( !isXML ) {
			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ name ];
			attrHandle[ name ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				name.toLowerCase() :
				null;
			attrHandle[ name ] = handle;
		}
		return ret;
	};
});




var rfocusable = /^(?:input|select|textarea|button)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each(function() {
			delete this[ jQuery.propFix[ name ] || name ];
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				return elem.hasAttribute( "tabindex" ) || rfocusable.test( elem.nodeName ) || elem.href ?
					elem.tabIndex :
					-1;
			}
		}
	}
});

if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			proceed = typeof value === "string" && value,
			i = 0,
			len = this.length;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			proceed = arguments.length === 0 || typeof value === "string" && value,
			i = 0,
			len = this.length;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// Toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					data_priv.set( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : data_priv.get( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// Handle most common string cases
					ret.replace(rreturn, "") :
					// Handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// IE6-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];
					if ( (option.selected = jQuery.inArray( option.value, values ) >= 0) ) {
						optionSet = true;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



// Support: Android 2.3
// Workaround failure to string-cast null input
jQuery.parseJSON = function( data ) {
	return JSON.parse( data + "" );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE9
	try {
		tmp = new DOMParser();
		xml = tmp.parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Document location
	ajaxLocation = window.location.href,

	// Segment location into parts
	ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType[0] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

		// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,
			// URL without anti-cache param
			cacheURL,
			// Response headers
			responseHeadersString,
			responseHeaders,
			// timeout handle
			timeoutTimer,
			// Cross-domain detection vars
			parts,
			// To know if global events are to be dispatched
			fireGlobals,
			// Loop variable
			i,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// Shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		var wrap;

		if ( jQuery.isFunction( html ) ) {
			return this.each(function( i ) {
				jQuery( this ).wrapAll( html.call(this, i) );
			});
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function( i ) {
				jQuery( this ).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0;
};
jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


jQuery.ajaxSettings.xhr = function() {
	try {
		return new XMLHttpRequest();
	} catch( e ) {}
};

var xhrId = 0,
	xhrCallbacks = {},
	xhrSuccessStatus = {
		// file protocol always yields status code 0, assume 200
		0: 200,
		// Support: IE9
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE9
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]();
		}
	});
}

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport(function( options ) {
	var callback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr(),
					id = ++xhrId;

				xhr.open( options.type, options.url, options.async, options.username, options.password );

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers["X-Requested-With"] ) {
					headers["X-Requested-With"] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							delete xhrCallbacks[ id ];
							callback = xhr.onload = xhr.onerror = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {
								complete(
									// file: protocol always yields status 0; see #8605, #14207
									xhr.status,
									xhr.statusText
								);
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,
									// Support: IE9
									// Accessing binary-data responseText throws an exception
									// (#11426)
									typeof xhr.responseText === "string" ? {
										text: xhr.responseText
									} : undefined,
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				xhr.onerror = callback("error");

				// Create the abort callback
				callback = xhrCallbacks[ id ] = callback("abort");

				try {
					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {
					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
});




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {
	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery("<script>").prop({
					async: true,
					charset: s.scriptCharset,
					src: s.url
				}).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = jQuery.trim( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};




var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf("auto") > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			elem = this[ 0 ],
			box = { top: 0, left: 0 },
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// Support: BlackBerry 5, iOS 3 (original iPhone)
		// If we don't have gBCR, just use 0,0 rather than error
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top + win.pageYOffset - docElem.clientTop,
			left: box.left + win.pageXOffset - docElem.clientLeft
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// Assume getBoundingClientRect is there when computed position is fixed
			offset = elem.getBoundingClientRect();

		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : window.pageXOffset,
					top ? val : window.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Support: Safari<7+, Chrome<37+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://code.google.com/p/chromium/issues/detail?id=229280
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));

},{}],6:[function(require,module,exports){
'use strict';

var JSZipUtils = {};
// just use the responseText with xhr1, response with xhr2.
// The transformation doesn't throw away high-order byte (with responseText)
// because JSZip handles that case. If not used with JSZip, you may need to
// do it, see https://developer.mozilla.org/En/Using_XMLHttpRequest#Handling_binary_data
JSZipUtils._getBinaryFromXHR = function (xhr) {
    // for xhr.responseText, the 0xFF mask is applied by JSZip
    return xhr.response || xhr.responseText;
};

// taken from jQuery
function createStandardXHR() {
    try {
        return new window.XMLHttpRequest();
    } catch( e ) {}
}

function createActiveXHR() {
    try {
        return new window.ActiveXObject("Microsoft.XMLHTTP");
    } catch( e ) {}
}

// Create the request object
var createXHR = window.ActiveXObject ?
    /* Microsoft failed to properly
     * implement the XMLHttpRequest in IE7 (can't request local files),
     * so we use the ActiveXObject when it is available
     * Additionally XMLHttpRequest can be disabled in IE7/IE8 so
     * we need a fallback.
     */
    function() {
    return createStandardXHR() || createActiveXHR();
} :
    // For all other browsers, use the standard XMLHttpRequest object
    createStandardXHR;



JSZipUtils.getBinaryContent = function(path, callback) {
    /*
     * Here is the tricky part : getting the data.
     * In firefox/chrome/opera/... setting the mimeType to 'text/plain; charset=x-user-defined'
     * is enough, the result is in the standard xhr.responseText.
     * cf https://developer.mozilla.org/En/XMLHttpRequest/Using_XMLHttpRequest#Receiving_binary_data_in_older_browsers
     * In IE <= 9, we must use (the IE only) attribute responseBody
     * (for binary data, its content is different from responseText).
     * In IE 10, the 'charset=x-user-defined' trick doesn't work, only the
     * responseType will work :
     * http://msdn.microsoft.com/en-us/library/ie/hh673569%28v=vs.85%29.aspx#Binary_Object_upload_and_download
     *
     * I'd like to use jQuery to avoid this XHR madness, but it doesn't support
     * the responseType attribute : http://bugs.jquery.com/ticket/11461
     */
    try {

        var xhr = createXHR();

        xhr.open('GET', path, true);

        // recent browsers
        if ("responseType" in xhr) {
            xhr.responseType = "arraybuffer";
        }

        // older browser
        if(xhr.overrideMimeType) {
            xhr.overrideMimeType("text/plain; charset=x-user-defined");
        }

        xhr.onreadystatechange = function(evt) {
            var file, err;
            // use `xhr` and not `this`... thanks IE
            if (xhr.readyState === 4) {
                if (xhr.status === 200 || xhr.status === 0) {
                    file = null;
                    err = null;
                    try {
                        file = JSZipUtils._getBinaryFromXHR(xhr);
                    } catch(e) {
                        err = new Error(e);
                    }
                    callback(err, file);
                } else {
                    callback(new Error("Ajax error for " + path + " : " + this.status + " " + this.statusText), null);
                }
            }
        };

        xhr.send();

    } catch (e) {
        callback(new Error(e), null);
    }
};

// export
module.exports = JSZipUtils;

// enforcing Stuk's coding style
// vim: set shiftwidth=4 softtabstop=4:

},{}],7:[function(require,module,exports){
'use strict';
// private property
var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";


// public method for encoding
exports.encode = function(input, utf8) {
    var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;

    while (i < input.length) {

        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);

        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;

        if (isNaN(chr2)) {
            enc3 = enc4 = 64;
        }
        else if (isNaN(chr3)) {
            enc4 = 64;
        }

        output = output + _keyStr.charAt(enc1) + _keyStr.charAt(enc2) + _keyStr.charAt(enc3) + _keyStr.charAt(enc4);

    }

    return output;
};

// public method for decoding
exports.decode = function(input, utf8) {
    var output = "";
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;
    var i = 0;

    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

    while (i < input.length) {

        enc1 = _keyStr.indexOf(input.charAt(i++));
        enc2 = _keyStr.indexOf(input.charAt(i++));
        enc3 = _keyStr.indexOf(input.charAt(i++));
        enc4 = _keyStr.indexOf(input.charAt(i++));

        chr1 = (enc1 << 2) | (enc2 >> 4);
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        chr3 = ((enc3 & 3) << 6) | enc4;

        output = output + String.fromCharCode(chr1);

        if (enc3 != 64) {
            output = output + String.fromCharCode(chr2);
        }
        if (enc4 != 64) {
            output = output + String.fromCharCode(chr3);
        }

    }

    return output;

};

},{}],8:[function(require,module,exports){
'use strict';
function CompressedObject() {
    this.compressedSize = 0;
    this.uncompressedSize = 0;
    this.crc32 = 0;
    this.compressionMethod = null;
    this.compressedContent = null;
}

CompressedObject.prototype = {
    /**
     * Return the decompressed content in an unspecified format.
     * The format will depend on the decompressor.
     * @return {Object} the decompressed content.
     */
    getContent: function() {
        return null; // see implementation
    },
    /**
     * Return the compressed content in an unspecified format.
     * The format will depend on the compressed conten source.
     * @return {Object} the compressed content.
     */
    getCompressedContent: function() {
        return null; // see implementation
    }
};
module.exports = CompressedObject;

},{}],9:[function(require,module,exports){
'use strict';
exports.STORE = {
    magic: "\x00\x00",
    compress: function(content, compressionOptions) {
        return content; // no compression
    },
    uncompress: function(content) {
        return content; // no compression
    },
    compressInputType: null,
    uncompressInputType: null
};
exports.DEFLATE = require('./flate');

},{"./flate":14}],10:[function(require,module,exports){
'use strict';

var utils = require('./utils');

var table = [
    0x00000000, 0x77073096, 0xEE0E612C, 0x990951BA,
    0x076DC419, 0x706AF48F, 0xE963A535, 0x9E6495A3,
    0x0EDB8832, 0x79DCB8A4, 0xE0D5E91E, 0x97D2D988,
    0x09B64C2B, 0x7EB17CBD, 0xE7B82D07, 0x90BF1D91,
    0x1DB71064, 0x6AB020F2, 0xF3B97148, 0x84BE41DE,
    0x1ADAD47D, 0x6DDDE4EB, 0xF4D4B551, 0x83D385C7,
    0x136C9856, 0x646BA8C0, 0xFD62F97A, 0x8A65C9EC,
    0x14015C4F, 0x63066CD9, 0xFA0F3D63, 0x8D080DF5,
    0x3B6E20C8, 0x4C69105E, 0xD56041E4, 0xA2677172,
    0x3C03E4D1, 0x4B04D447, 0xD20D85FD, 0xA50AB56B,
    0x35B5A8FA, 0x42B2986C, 0xDBBBC9D6, 0xACBCF940,
    0x32D86CE3, 0x45DF5C75, 0xDCD60DCF, 0xABD13D59,
    0x26D930AC, 0x51DE003A, 0xC8D75180, 0xBFD06116,
    0x21B4F4B5, 0x56B3C423, 0xCFBA9599, 0xB8BDA50F,
    0x2802B89E, 0x5F058808, 0xC60CD9B2, 0xB10BE924,
    0x2F6F7C87, 0x58684C11, 0xC1611DAB, 0xB6662D3D,
    0x76DC4190, 0x01DB7106, 0x98D220BC, 0xEFD5102A,
    0x71B18589, 0x06B6B51F, 0x9FBFE4A5, 0xE8B8D433,
    0x7807C9A2, 0x0F00F934, 0x9609A88E, 0xE10E9818,
    0x7F6A0DBB, 0x086D3D2D, 0x91646C97, 0xE6635C01,
    0x6B6B51F4, 0x1C6C6162, 0x856530D8, 0xF262004E,
    0x6C0695ED, 0x1B01A57B, 0x8208F4C1, 0xF50FC457,
    0x65B0D9C6, 0x12B7E950, 0x8BBEB8EA, 0xFCB9887C,
    0x62DD1DDF, 0x15DA2D49, 0x8CD37CF3, 0xFBD44C65,
    0x4DB26158, 0x3AB551CE, 0xA3BC0074, 0xD4BB30E2,
    0x4ADFA541, 0x3DD895D7, 0xA4D1C46D, 0xD3D6F4FB,
    0x4369E96A, 0x346ED9FC, 0xAD678846, 0xDA60B8D0,
    0x44042D73, 0x33031DE5, 0xAA0A4C5F, 0xDD0D7CC9,
    0x5005713C, 0x270241AA, 0xBE0B1010, 0xC90C2086,
    0x5768B525, 0x206F85B3, 0xB966D409, 0xCE61E49F,
    0x5EDEF90E, 0x29D9C998, 0xB0D09822, 0xC7D7A8B4,
    0x59B33D17, 0x2EB40D81, 0xB7BD5C3B, 0xC0BA6CAD,
    0xEDB88320, 0x9ABFB3B6, 0x03B6E20C, 0x74B1D29A,
    0xEAD54739, 0x9DD277AF, 0x04DB2615, 0x73DC1683,
    0xE3630B12, 0x94643B84, 0x0D6D6A3E, 0x7A6A5AA8,
    0xE40ECF0B, 0x9309FF9D, 0x0A00AE27, 0x7D079EB1,
    0xF00F9344, 0x8708A3D2, 0x1E01F268, 0x6906C2FE,
    0xF762575D, 0x806567CB, 0x196C3671, 0x6E6B06E7,
    0xFED41B76, 0x89D32BE0, 0x10DA7A5A, 0x67DD4ACC,
    0xF9B9DF6F, 0x8EBEEFF9, 0x17B7BE43, 0x60B08ED5,
    0xD6D6A3E8, 0xA1D1937E, 0x38D8C2C4, 0x4FDFF252,
    0xD1BB67F1, 0xA6BC5767, 0x3FB506DD, 0x48B2364B,
    0xD80D2BDA, 0xAF0A1B4C, 0x36034AF6, 0x41047A60,
    0xDF60EFC3, 0xA867DF55, 0x316E8EEF, 0x4669BE79,
    0xCB61B38C, 0xBC66831A, 0x256FD2A0, 0x5268E236,
    0xCC0C7795, 0xBB0B4703, 0x220216B9, 0x5505262F,
    0xC5BA3BBE, 0xB2BD0B28, 0x2BB45A92, 0x5CB36A04,
    0xC2D7FFA7, 0xB5D0CF31, 0x2CD99E8B, 0x5BDEAE1D,
    0x9B64C2B0, 0xEC63F226, 0x756AA39C, 0x026D930A,
    0x9C0906A9, 0xEB0E363F, 0x72076785, 0x05005713,
    0x95BF4A82, 0xE2B87A14, 0x7BB12BAE, 0x0CB61B38,
    0x92D28E9B, 0xE5D5BE0D, 0x7CDCEFB7, 0x0BDBDF21,
    0x86D3D2D4, 0xF1D4E242, 0x68DDB3F8, 0x1FDA836E,
    0x81BE16CD, 0xF6B9265B, 0x6FB077E1, 0x18B74777,
    0x88085AE6, 0xFF0F6A70, 0x66063BCA, 0x11010B5C,
    0x8F659EFF, 0xF862AE69, 0x616BFFD3, 0x166CCF45,
    0xA00AE278, 0xD70DD2EE, 0x4E048354, 0x3903B3C2,
    0xA7672661, 0xD06016F7, 0x4969474D, 0x3E6E77DB,
    0xAED16A4A, 0xD9D65ADC, 0x40DF0B66, 0x37D83BF0,
    0xA9BCAE53, 0xDEBB9EC5, 0x47B2CF7F, 0x30B5FFE9,
    0xBDBDF21C, 0xCABAC28A, 0x53B39330, 0x24B4A3A6,
    0xBAD03605, 0xCDD70693, 0x54DE5729, 0x23D967BF,
    0xB3667A2E, 0xC4614AB8, 0x5D681B02, 0x2A6F2B94,
    0xB40BBE37, 0xC30C8EA1, 0x5A05DF1B, 0x2D02EF8D
];

/**
 *
 *  Javascript crc32
 *  http://www.webtoolkit.info/
 *
 */
module.exports = function crc32(input, crc) {
    if (typeof input === "undefined" || !input.length) {
        return 0;
    }

    var isArray = utils.getTypeOf(input) !== "string";

    if (typeof(crc) == "undefined") {
        crc = 0;
    }
    var x = 0;
    var y = 0;
    var b = 0;

    crc = crc ^ (-1);
    for (var i = 0, iTop = input.length; i < iTop; i++) {
        b = isArray ? input[i] : input.charCodeAt(i);
        y = (crc ^ b) & 0xFF;
        x = table[y];
        crc = (crc >>> 8) ^ x;
    }

    return crc ^ (-1);
};
// vim: set shiftwidth=4 softtabstop=4:

},{"./utils":27}],11:[function(require,module,exports){
'use strict';
var utils = require('./utils');

function DataReader(data) {
    this.data = null; // type : see implementation
    this.length = 0;
    this.index = 0;
}
DataReader.prototype = {
    /**
     * Check that the offset will not go too far.
     * @param {string} offset the additional offset to check.
     * @throws {Error} an Error if the offset is out of bounds.
     */
    checkOffset: function(offset) {
        this.checkIndex(this.index + offset);
    },
    /**
     * Check that the specifed index will not be too far.
     * @param {string} newIndex the index to check.
     * @throws {Error} an Error if the index is out of bounds.
     */
    checkIndex: function(newIndex) {
        if (this.length < newIndex || newIndex < 0) {
            throw new Error("End of data reached (data length = " + this.length + ", asked index = " + (newIndex) + "). Corrupted zip ?");
        }
    },
    /**
     * Change the index.
     * @param {number} newIndex The new index.
     * @throws {Error} if the new index is out of the data.
     */
    setIndex: function(newIndex) {
        this.checkIndex(newIndex);
        this.index = newIndex;
    },
    /**
     * Skip the next n bytes.
     * @param {number} n the number of bytes to skip.
     * @throws {Error} if the new index is out of the data.
     */
    skip: function(n) {
        this.setIndex(this.index + n);
    },
    /**
     * Get the byte at the specified index.
     * @param {number} i the index to use.
     * @return {number} a byte.
     */
    byteAt: function(i) {
        // see implementations
    },
    /**
     * Get the next number with a given byte size.
     * @param {number} size the number of bytes to read.
     * @return {number} the corresponding number.
     */
    readInt: function(size) {
        var result = 0,
            i;
        this.checkOffset(size);
        for (i = this.index + size - 1; i >= this.index; i--) {
            result = (result << 8) + this.byteAt(i);
        }
        this.index += size;
        return result;
    },
    /**
     * Get the next string with a given byte size.
     * @param {number} size the number of bytes to read.
     * @return {string} the corresponding string.
     */
    readString: function(size) {
        return utils.transformTo("string", this.readData(size));
    },
    /**
     * Get raw data without conversion, <size> bytes.
     * @param {number} size the number of bytes to read.
     * @return {Object} the raw data, implementation specific.
     */
    readData: function(size) {
        // see implementations
    },
    /**
     * Find the last occurence of a zip signature (4 bytes).
     * @param {string} sig the signature to find.
     * @return {number} the index of the last occurence, -1 if not found.
     */
    lastIndexOfSignature: function(sig) {
        // see implementations
    },
    /**
     * Get the next date.
     * @return {Date} the date.
     */
    readDate: function() {
        var dostime = this.readInt(4);
        return new Date(
        ((dostime >> 25) & 0x7f) + 1980, // year
        ((dostime >> 21) & 0x0f) - 1, // month
        (dostime >> 16) & 0x1f, // day
        (dostime >> 11) & 0x1f, // hour
        (dostime >> 5) & 0x3f, // minute
        (dostime & 0x1f) << 1); // second
    }
};
module.exports = DataReader;

},{"./utils":27}],12:[function(require,module,exports){
'use strict';
exports.base64 = false;
exports.binary = false;
exports.dir = false;
exports.createFolders = false;
exports.date = null;
exports.compression = null;
exports.compressionOptions = null;
exports.comment = null;
exports.unixPermissions = null;
exports.dosPermissions = null;

},{}],13:[function(require,module,exports){
'use strict';
var utils = require('./utils');

/**
 * @deprecated
 * This function will be removed in a future version without replacement.
 */
exports.string2binary = function(str) {
    return utils.string2binary(str);
};

/**
 * @deprecated
 * This function will be removed in a future version without replacement.
 */
exports.string2Uint8Array = function(str) {
    return utils.transformTo("uint8array", str);
};

/**
 * @deprecated
 * This function will be removed in a future version without replacement.
 */
exports.uint8Array2String = function(array) {
    return utils.transformTo("string", array);
};

/**
 * @deprecated
 * This function will be removed in a future version without replacement.
 */
exports.string2Blob = function(str) {
    var buffer = utils.transformTo("arraybuffer", str);
    return utils.arrayBuffer2Blob(buffer);
};

/**
 * @deprecated
 * This function will be removed in a future version without replacement.
 */
exports.arrayBuffer2Blob = function(buffer) {
    return utils.arrayBuffer2Blob(buffer);
};

/**
 * @deprecated
 * This function will be removed in a future version without replacement.
 */
exports.transformTo = function(outputType, input) {
    return utils.transformTo(outputType, input);
};

/**
 * @deprecated
 * This function will be removed in a future version without replacement.
 */
exports.getTypeOf = function(input) {
    return utils.getTypeOf(input);
};

/**
 * @deprecated
 * This function will be removed in a future version without replacement.
 */
exports.checkSupport = function(type) {
    return utils.checkSupport(type);
};

/**
 * @deprecated
 * This value will be removed in a future version without replacement.
 */
exports.MAX_VALUE_16BITS = utils.MAX_VALUE_16BITS;

/**
 * @deprecated
 * This value will be removed in a future version without replacement.
 */
exports.MAX_VALUE_32BITS = utils.MAX_VALUE_32BITS;


/**
 * @deprecated
 * This function will be removed in a future version without replacement.
 */
exports.pretty = function(str) {
    return utils.pretty(str);
};

/**
 * @deprecated
 * This function will be removed in a future version without replacement.
 */
exports.findCompression = function(compressionMethod) {
    return utils.findCompression(compressionMethod);
};

/**
 * @deprecated
 * This function will be removed in a future version without replacement.
 */
exports.isRegExp = function (object) {
    return utils.isRegExp(object);
};


},{"./utils":27}],14:[function(require,module,exports){
'use strict';
var USE_TYPEDARRAY = (typeof Uint8Array !== 'undefined') && (typeof Uint16Array !== 'undefined') && (typeof Uint32Array !== 'undefined');

var pako = require("pako");
exports.uncompressInputType = USE_TYPEDARRAY ? "uint8array" : "array";
exports.compressInputType = USE_TYPEDARRAY ? "uint8array" : "array";

exports.magic = "\x08\x00";
exports.compress = function(input, compressionOptions) {
    return pako.deflateRaw(input, {
        level : compressionOptions.level || -1 // default compression
    });
};
exports.uncompress =  function(input) {
    return pako.inflateRaw(input);
};

},{"pako":30}],15:[function(require,module,exports){
'use strict';

var base64 = require('./base64');

/**
Usage:
   zip = new JSZip();
   zip.file("hello.txt", "Hello, World!").file("tempfile", "nothing");
   zip.folder("images").file("smile.gif", base64Data, {base64: true});
   zip.file("Xmas.txt", "Ho ho ho !", {date : new Date("December 25, 2007 00:00:01")});
   zip.remove("tempfile");

   base64zip = zip.generate();

**/

/**
 * Representation a of zip file in js
 * @constructor
 * @param {String=|ArrayBuffer=|Uint8Array=} data the data to load, if any (optional).
 * @param {Object=} options the options for creating this objects (optional).
 */
function JSZip(data, options) {
    // if this constructor is used without `new`, it adds `new` before itself:
    if(!(this instanceof JSZip)) return new JSZip(data, options);

    // object containing the files :
    // {
    //   "folder/" : {...},
    //   "folder/data.txt" : {...}
    // }
    this.files = {};

    this.comment = null;

    // Where we are in the hierarchy
    this.root = "";
    if (data) {
        this.load(data, options);
    }
    this.clone = function() {
        var newObj = new JSZip();
        for (var i in this) {
            if (typeof this[i] !== "function") {
                newObj[i] = this[i];
            }
        }
        return newObj;
    };
}
JSZip.prototype = require('./object');
JSZip.prototype.load = require('./load');
JSZip.support = require('./support');
JSZip.defaults = require('./defaults');

/**
 * @deprecated
 * This namespace will be removed in a future version without replacement.
 */
JSZip.utils = require('./deprecatedPublicUtils');

JSZip.base64 = {
    /**
     * @deprecated
     * This method will be removed in a future version without replacement.
     */
    encode : function(input) {
        return base64.encode(input);
    },
    /**
     * @deprecated
     * This method will be removed in a future version without replacement.
     */
    decode : function(input) {
        return base64.decode(input);
    }
};
JSZip.compressions = require('./compressions');
module.exports = JSZip;

},{"./base64":7,"./compressions":9,"./defaults":12,"./deprecatedPublicUtils":13,"./load":16,"./object":19,"./support":23}],16:[function(require,module,exports){
'use strict';
var base64 = require('./base64');
var ZipEntries = require('./zipEntries');
module.exports = function(data, options) {
    var files, zipEntries, i, input;
    options = options || {};
    if (options.base64) {
        data = base64.decode(data);
    }

    zipEntries = new ZipEntries(data, options);
    files = zipEntries.files;
    for (i = 0; i < files.length; i++) {
        input = files[i];
        this.file(input.fileName, input.decompressed, {
            binary: true,
            optimizedBinaryString: true,
            date: input.date,
            dir: input.dir,
            comment : input.fileComment.length ? input.fileComment : null,
            unixPermissions : input.unixPermissions,
            dosPermissions : input.dosPermissions,
            createFolders: options.createFolders
        });
    }
    if (zipEntries.zipComment.length) {
        this.comment = zipEntries.zipComment;
    }

    return this;
};

},{"./base64":7,"./zipEntries":28}],17:[function(require,module,exports){
(function (Buffer){
'use strict';
module.exports = function(data, encoding){
    return new Buffer(data, encoding);
};
module.exports.test = function(b){
    return Buffer.isBuffer(b);
};

}).call(this,require("buffer").Buffer)

},{"buffer":2}],18:[function(require,module,exports){
'use strict';
var Uint8ArrayReader = require('./uint8ArrayReader');

function NodeBufferReader(data) {
    this.data = data;
    this.length = this.data.length;
    this.index = 0;
}
NodeBufferReader.prototype = new Uint8ArrayReader();

/**
 * @see DataReader.readData
 */
NodeBufferReader.prototype.readData = function(size) {
    this.checkOffset(size);
    var result = this.data.slice(this.index, this.index + size);
    this.index += size;
    return result;
};
module.exports = NodeBufferReader;

},{"./uint8ArrayReader":24}],19:[function(require,module,exports){
'use strict';
var support = require('./support');
var utils = require('./utils');
var crc32 = require('./crc32');
var signature = require('./signature');
var defaults = require('./defaults');
var base64 = require('./base64');
var compressions = require('./compressions');
var CompressedObject = require('./compressedObject');
var nodeBuffer = require('./nodeBuffer');
var utf8 = require('./utf8');
var StringWriter = require('./stringWriter');
var Uint8ArrayWriter = require('./uint8ArrayWriter');

/**
 * Returns the raw data of a ZipObject, decompress the content if necessary.
 * @param {ZipObject} file the file to use.
 * @return {String|ArrayBuffer|Uint8Array|Buffer} the data.
 */
var getRawData = function(file) {
    if (file._data instanceof CompressedObject) {
        file._data = file._data.getContent();
        file.options.binary = true;
        file.options.base64 = false;

        if (utils.getTypeOf(file._data) === "uint8array") {
            var copy = file._data;
            // when reading an arraybuffer, the CompressedObject mechanism will keep it and subarray() a Uint8Array.
            // if we request a file in the same format, we might get the same Uint8Array or its ArrayBuffer (the original zip file).
            file._data = new Uint8Array(copy.length);
            // with an empty Uint8Array, Opera fails with a "Offset larger than array size"
            if (copy.length !== 0) {
                file._data.set(copy, 0);
            }
        }
    }
    return file._data;
};

/**
 * Returns the data of a ZipObject in a binary form. If the content is an unicode string, encode it.
 * @param {ZipObject} file the file to use.
 * @return {String|ArrayBuffer|Uint8Array|Buffer} the data.
 */
var getBinaryData = function(file) {
    var result = getRawData(file),
        type = utils.getTypeOf(result);
    if (type === "string") {
        if (!file.options.binary) {
            // unicode text !
            // unicode string => binary string is a painful process, check if we can avoid it.
            if (support.nodebuffer) {
                return nodeBuffer(result, "utf-8");
            }
        }
        return file.asBinary();
    }
    return result;
};

/**
 * Transform this._data into a string.
 * @param {function} filter a function String -> String, applied if not null on the result.
 * @return {String} the string representing this._data.
 */
var dataToString = function(asUTF8) {
    var result = getRawData(this);
    if (result === null || typeof result === "undefined") {
        return "";
    }
    // if the data is a base64 string, we decode it before checking the encoding !
    if (this.options.base64) {
        result = base64.decode(result);
    }
    if (asUTF8 && this.options.binary) {
        // JSZip.prototype.utf8decode supports arrays as input
        // skip to array => string step, utf8decode will do it.
        result = out.utf8decode(result);
    }
    else {
        // no utf8 transformation, do the array => string step.
        result = utils.transformTo("string", result);
    }

    if (!asUTF8 && !this.options.binary) {
        result = utils.transformTo("string", out.utf8encode(result));
    }
    return result;
};
/**
 * A simple object representing a file in the zip file.
 * @constructor
 * @param {string} name the name of the file
 * @param {String|ArrayBuffer|Uint8Array|Buffer} data the data
 * @param {Object} options the options of the file
 */
var ZipObject = function(name, data, options) {
    this.name = name;
    this.dir = options.dir;
    this.date = options.date;
    this.comment = options.comment;
    this.unixPermissions = options.unixPermissions;
    this.dosPermissions = options.dosPermissions;

    this._data = data;
    this.options = options;

    /*
     * This object contains initial values for dir and date.
     * With them, we can check if the user changed the deprecated metadata in
     * `ZipObject#options` or not.
     */
    this._initialMetadata = {
      dir : options.dir,
      date : options.date
    };
};

ZipObject.prototype = {
    /**
     * Return the content as UTF8 string.
     * @return {string} the UTF8 string.
     */
    asText: function() {
        return dataToString.call(this, true);
    },
    /**
     * Returns the binary content.
     * @return {string} the content as binary.
     */
    asBinary: function() {
        return dataToString.call(this, false);
    },
    /**
     * Returns the content as a nodejs Buffer.
     * @return {Buffer} the content as a Buffer.
     */
    asNodeBuffer: function() {
        var result = getBinaryData(this);
        return utils.transformTo("nodebuffer", result);
    },
    /**
     * Returns the content as an Uint8Array.
     * @return {Uint8Array} the content as an Uint8Array.
     */
    asUint8Array: function() {
        var result = getBinaryData(this);
        return utils.transformTo("uint8array", result);
    },
    /**
     * Returns the content as an ArrayBuffer.
     * @return {ArrayBuffer} the content as an ArrayBufer.
     */
    asArrayBuffer: function() {
        return this.asUint8Array().buffer;
    }
};

/**
 * Transform an integer into a string in hexadecimal.
 * @private
 * @param {number} dec the number to convert.
 * @param {number} bytes the number of bytes to generate.
 * @returns {string} the result.
 */
var decToHex = function(dec, bytes) {
    var hex = "",
        i;
    for (i = 0; i < bytes; i++) {
        hex += String.fromCharCode(dec & 0xff);
        dec = dec >>> 8;
    }
    return hex;
};

/**
 * Merge the objects passed as parameters into a new one.
 * @private
 * @param {...Object} var_args All objects to merge.
 * @return {Object} a new object with the data of the others.
 */
var extend = function() {
    var result = {}, i, attr;
    for (i = 0; i < arguments.length; i++) { // arguments is not enumerable in some browsers
        for (attr in arguments[i]) {
            if (arguments[i].hasOwnProperty(attr) && typeof result[attr] === "undefined") {
                result[attr] = arguments[i][attr];
            }
        }
    }
    return result;
};

/**
 * Transforms the (incomplete) options from the user into the complete
 * set of options to create a file.
 * @private
 * @param {Object} o the options from the user.
 * @return {Object} the complete set of options.
 */
var prepareFileAttrs = function(o) {
    o = o || {};
    if (o.base64 === true && (o.binary === null || o.binary === undefined)) {
        o.binary = true;
    }
    o = extend(o, defaults);
    o.date = o.date || new Date();
    if (o.compression !== null) o.compression = o.compression.toUpperCase();

    return o;
};

/**
 * Add a file in the current folder.
 * @private
 * @param {string} name the name of the file
 * @param {String|ArrayBuffer|Uint8Array|Buffer} data the data of the file
 * @param {Object} o the options of the file
 * @return {Object} the new file.
 */
var fileAdd = function(name, data, o) {
    // be sure sub folders exist
    var dataType = utils.getTypeOf(data),
        parent;

    o = prepareFileAttrs(o);

    if (typeof o.unixPermissions === "string") {
        o.unixPermissions = parseInt(o.unixPermissions, 8);
    }

    // UNX_IFDIR  0040000 see zipinfo.c
    if (o.unixPermissions && (o.unixPermissions & 0x4000)) {
        o.dir = true;
    }
    // Bit 4    Directory
    if (o.dosPermissions && (o.dosPermissions & 0x0010)) {
        o.dir = true;
    }

    if (o.dir) {
        name = forceTrailingSlash(name);
    }

    if (o.createFolders && (parent = parentFolder(name))) {
        folderAdd.call(this, parent, true);
    }

    if (o.dir || data === null || typeof data === "undefined") {
        o.base64 = false;
        o.binary = false;
        data = null;
        dataType = null;
    }
    else if (dataType === "string") {
        if (o.binary && !o.base64) {
            // optimizedBinaryString == true means that the file has already been filtered with a 0xFF mask
            if (o.optimizedBinaryString !== true) {
                // this is a string, not in a base64 format.
                // Be sure that this is a correct "binary string"
                data = utils.string2binary(data);
            }
        }
    }
    else { // arraybuffer, uint8array, ...
        o.base64 = false;
        o.binary = true;

        if (!dataType && !(data instanceof CompressedObject)) {
            throw new Error("The data of '" + name + "' is in an unsupported format !");
        }

        // special case : it's way easier to work with Uint8Array than with ArrayBuffer
        if (dataType === "arraybuffer") {
            data = utils.transformTo("uint8array", data);
        }
    }

    var object = new ZipObject(name, data, o);
    this.files[name] = object;
    return object;
};

/**
 * Find the parent folder of the path.
 * @private
 * @param {string} path the path to use
 * @return {string} the parent folder, or ""
 */
var parentFolder = function (path) {
    if (path.slice(-1) == '/') {
        path = path.substring(0, path.length - 1);
    }
    var lastSlash = path.lastIndexOf('/');
    return (lastSlash > 0) ? path.substring(0, lastSlash) : "";
};


/**
 * Returns the path with a slash at the end.
 * @private
 * @param {String} path the path to check.
 * @return {String} the path with a trailing slash.
 */
var forceTrailingSlash = function(path) {
    // Check the name ends with a /
    if (path.slice(-1) != "/") {
        path += "/"; // IE doesn't like substr(-1)
    }
    return path;
};
/**
 * Add a (sub) folder in the current folder.
 * @private
 * @param {string} name the folder's name
 * @param {boolean=} [createFolders] If true, automatically create sub
 *  folders. Defaults to false.
 * @return {Object} the new folder.
 */
var folderAdd = function(name, createFolders) {
    createFolders = (typeof createFolders !== 'undefined') ? createFolders : false;

    name = forceTrailingSlash(name);

    // Does this folder already exist?
    if (!this.files[name]) {
        fileAdd.call(this, name, null, {
            dir: true,
            createFolders: createFolders
        });
    }
    return this.files[name];
};

/**
 * Generate a JSZip.CompressedObject for a given zipOject.
 * @param {ZipObject} file the object to read.
 * @param {JSZip.compression} compression the compression to use.
 * @param {Object} compressionOptions the options to use when compressing.
 * @return {JSZip.CompressedObject} the compressed result.
 */
var generateCompressedObjectFrom = function(file, compression, compressionOptions) {
    var result = new CompressedObject(),
        content;

    // the data has not been decompressed, we might reuse things !
    if (file._data instanceof CompressedObject) {
        result.uncompressedSize = file._data.uncompressedSize;
        result.crc32 = file._data.crc32;

        if (result.uncompressedSize === 0 || file.dir) {
            compression = compressions['STORE'];
            result.compressedContent = "";
            result.crc32 = 0;
        }
        else if (file._data.compressionMethod === compression.magic) {
            result.compressedContent = file._data.getCompressedContent();
        }
        else {
            content = file._data.getContent();
            // need to decompress / recompress
            result.compressedContent = compression.compress(utils.transformTo(compression.compressInputType, content), compressionOptions);
        }
    }
    else {
        // have uncompressed data
        content = getBinaryData(file);
        if (!content || content.length === 0 || file.dir) {
            compression = compressions['STORE'];
            content = "";
        }
        result.uncompressedSize = content.length;
        result.crc32 = crc32(content);
        result.compressedContent = compression.compress(utils.transformTo(compression.compressInputType, content), compressionOptions);
    }

    result.compressedSize = result.compressedContent.length;
    result.compressionMethod = compression.magic;

    return result;
};




/**
 * Generate the UNIX part of the external file attributes.
 * @param {Object} unixPermissions the unix permissions or null.
 * @param {Boolean} isDir true if the entry is a directory, false otherwise.
 * @return {Number} a 32 bit integer.
 *
 * adapted from http://unix.stackexchange.com/questions/14705/the-zip-formats-external-file-attribute :
 *
 * TTTTsstrwxrwxrwx0000000000ADVSHR
 * ^^^^____________________________ file type, see zipinfo.c (UNX_*)
 *     ^^^_________________________ setuid, setgid, sticky
 *        ^^^^^^^^^________________ permissions
 *                 ^^^^^^^^^^______ not used ?
 *                           ^^^^^^ DOS attribute bits : Archive, Directory, Volume label, System file, Hidden, Read only
 */
var generateUnixExternalFileAttr = function (unixPermissions, isDir) {

    var result = unixPermissions;
    if (!unixPermissions) {
        // I can't use octal values in strict mode, hence the hexa.
        //  040775 => 0x41fd
        // 0100664 => 0x81b4
        result = isDir ? 0x41fd : 0x81b4;
    }

    return (result & 0xFFFF) << 16;
};

/**
 * Generate the DOS part of the external file attributes.
 * @param {Object} dosPermissions the dos permissions or null.
 * @param {Boolean} isDir true if the entry is a directory, false otherwise.
 * @return {Number} a 32 bit integer.
 *
 * Bit 0     Read-Only
 * Bit 1     Hidden
 * Bit 2     System
 * Bit 3     Volume Label
 * Bit 4     Directory
 * Bit 5     Archive
 */
var generateDosExternalFileAttr = function (dosPermissions, isDir) {

    // the dir flag is already set for compatibility

    return (dosPermissions || 0)  & 0x3F;
};

/**
 * Generate the various parts used in the construction of the final zip file.
 * @param {string} name the file name.
 * @param {ZipObject} file the file content.
 * @param {JSZip.CompressedObject} compressedObject the compressed object.
 * @param {number} offset the current offset from the start of the zip file.
 * @param {String} platform let's pretend we are this platform (change platform dependents fields)
 * @return {object} the zip parts.
 */
var generateZipParts = function(name, file, compressedObject, offset, platform) {
    var data = compressedObject.compressedContent,
        utfEncodedFileName = utils.transformTo("string", utf8.utf8encode(file.name)),
        comment = file.comment || "",
        utfEncodedComment = utils.transformTo("string", utf8.utf8encode(comment)),
        useUTF8ForFileName = utfEncodedFileName.length !== file.name.length,
        useUTF8ForComment = utfEncodedComment.length !== comment.length,
        o = file.options,
        dosTime,
        dosDate,
        extraFields = "",
        unicodePathExtraField = "",
        unicodeCommentExtraField = "",
        dir, date;


    // handle the deprecated options.dir
    if (file._initialMetadata.dir !== file.dir) {
        dir = file.dir;
    } else {
        dir = o.dir;
    }

    // handle the deprecated options.date
    if(file._initialMetadata.date !== file.date) {
        date = file.date;
    } else {
        date = o.date;
    }

    var extFileAttr = 0;
    var versionMadeBy = 0;
    if (dir) {
        // dos or unix, we set the dos dir flag
        extFileAttr |= 0x00010;
    }
    if(platform === "UNIX") {
        versionMadeBy = 0x031E; // UNIX, version 3.0
        extFileAttr |= generateUnixExternalFileAttr(file.unixPermissions, dir);
    } else { // DOS or other, fallback to DOS
        versionMadeBy = 0x0014; // DOS, version 2.0
        extFileAttr |= generateDosExternalFileAttr(file.dosPermissions, dir);
    }

    // date
    // @see http://www.delorie.com/djgpp/doc/rbinter/it/52/13.html
    // @see http://www.delorie.com/djgpp/doc/rbinter/it/65/16.html
    // @see http://www.delorie.com/djgpp/doc/rbinter/it/66/16.html

    dosTime = date.getHours();
    dosTime = dosTime << 6;
    dosTime = dosTime | date.getMinutes();
    dosTime = dosTime << 5;
    dosTime = dosTime | date.getSeconds() / 2;

    dosDate = date.getFullYear() - 1980;
    dosDate = dosDate << 4;
    dosDate = dosDate | (date.getMonth() + 1);
    dosDate = dosDate << 5;
    dosDate = dosDate | date.getDate();

    if (useUTF8ForFileName) {
        // set the unicode path extra field. unzip needs at least one extra
        // field to correctly handle unicode path, so using the path is as good
        // as any other information. This could improve the situation with
        // other archive managers too.
        // This field is usually used without the utf8 flag, with a non
        // unicode path in the header (winrar, winzip). This helps (a bit)
        // with the messy Windows' default compressed folders feature but
        // breaks on p7zip which doesn't seek the unicode path extra field.
        // So for now, UTF-8 everywhere !
        unicodePathExtraField =
            // Version
            decToHex(1, 1) +
            // NameCRC32
            decToHex(crc32(utfEncodedFileName), 4) +
            // UnicodeName
            utfEncodedFileName;

        extraFields +=
            // Info-ZIP Unicode Path Extra Field
            "\x75\x70" +
            // size
            decToHex(unicodePathExtraField.length, 2) +
            // content
            unicodePathExtraField;
    }

    if(useUTF8ForComment) {

        unicodeCommentExtraField =
            // Version
            decToHex(1, 1) +
            // CommentCRC32
            decToHex(this.crc32(utfEncodedComment), 4) +
            // UnicodeName
            utfEncodedComment;

        extraFields +=
            // Info-ZIP Unicode Path Extra Field
            "\x75\x63" +
            // size
            decToHex(unicodeCommentExtraField.length, 2) +
            // content
            unicodeCommentExtraField;
    }

    var header = "";

    // version needed to extract
    header += "\x0A\x00";
    // general purpose bit flag
    // set bit 11 if utf8
    header += (useUTF8ForFileName || useUTF8ForComment) ? "\x00\x08" : "\x00\x00";
    // compression method
    header += compressedObject.compressionMethod;
    // last mod file time
    header += decToHex(dosTime, 2);
    // last mod file date
    header += decToHex(dosDate, 2);
    // crc-32
    header += decToHex(compressedObject.crc32, 4);
    // compressed size
    header += decToHex(compressedObject.compressedSize, 4);
    // uncompressed size
    header += decToHex(compressedObject.uncompressedSize, 4);
    // file name length
    header += decToHex(utfEncodedFileName.length, 2);
    // extra field length
    header += decToHex(extraFields.length, 2);


    var fileRecord = signature.LOCAL_FILE_HEADER + header + utfEncodedFileName + extraFields;

    var dirRecord = signature.CENTRAL_FILE_HEADER +
    // version made by (00: DOS)
    decToHex(versionMadeBy, 2) +
    // file header (common to file and central directory)
    header +
    // file comment length
    decToHex(utfEncodedComment.length, 2) +
    // disk number start
    "\x00\x00" +
    // internal file attributes TODO
    "\x00\x00" +
    // external file attributes
    decToHex(extFileAttr, 4) +
    // relative offset of local header
    decToHex(offset, 4) +
    // file name
    utfEncodedFileName +
    // extra field
    extraFields +
    // file comment
    utfEncodedComment;

    return {
        fileRecord: fileRecord,
        dirRecord: dirRecord,
        compressedObject: compressedObject
    };
};


// return the actual prototype of JSZip
var out = {
    /**
     * Read an existing zip and merge the data in the current JSZip object.
     * The implementation is in jszip-load.js, don't forget to include it.
     * @param {String|ArrayBuffer|Uint8Array|Buffer} stream  The stream to load
     * @param {Object} options Options for loading the stream.
     *  options.base64 : is the stream in base64 ? default : false
     * @return {JSZip} the current JSZip object
     */
    load: function(stream, options) {
        throw new Error("Load method is not defined. Is the file jszip-load.js included ?");
    },

    /**
     * Filter nested files/folders with the specified function.
     * @param {Function} search the predicate to use :
     * function (relativePath, file) {...}
     * It takes 2 arguments : the relative path and the file.
     * @return {Array} An array of matching elements.
     */
    filter: function(search) {
        var result = [],
            filename, relativePath, file, fileClone;
        for (filename in this.files) {
            if (!this.files.hasOwnProperty(filename)) {
                continue;
            }
            file = this.files[filename];
            // return a new object, don't let the user mess with our internal objects :)
            fileClone = new ZipObject(file.name, file._data, extend(file.options));
            relativePath = filename.slice(this.root.length, filename.length);
            if (filename.slice(0, this.root.length) === this.root && // the file is in the current root
            search(relativePath, fileClone)) { // and the file matches the function
                result.push(fileClone);
            }
        }
        return result;
    },

    /**
     * Add a file to the zip file, or search a file.
     * @param   {string|RegExp} name The name of the file to add (if data is defined),
     * the name of the file to find (if no data) or a regex to match files.
     * @param   {String|ArrayBuffer|Uint8Array|Buffer} data  The file data, either raw or base64 encoded
     * @param   {Object} o     File options
     * @return  {JSZip|Object|Array} this JSZip object (when adding a file),
     * a file (when searching by string) or an array of files (when searching by regex).
     */
    file: function(name, data, o) {
        if (arguments.length === 1) {
            if (utils.isRegExp(name)) {
                var regexp = name;
                return this.filter(function(relativePath, file) {
                    return !file.dir && regexp.test(relativePath);
                });
            }
            else { // text
                return this.filter(function(relativePath, file) {
                    return !file.dir && relativePath === name;
                })[0] || null;
            }
        }
        else { // more than one argument : we have data !
            name = this.root + name;
            fileAdd.call(this, name, data, o);
        }
        return this;
    },

    /**
     * Add a directory to the zip file, or search.
     * @param   {String|RegExp} arg The name of the directory to add, or a regex to search folders.
     * @return  {JSZip} an object with the new directory as the root, or an array containing matching folders.
     */
    folder: function(arg) {
        if (!arg) {
            return this;
        }

        if (utils.isRegExp(arg)) {
            return this.filter(function(relativePath, file) {
                return file.dir && arg.test(relativePath);
            });
        }

        // else, name is a new folder
        var name = this.root + arg;
        var newFolder = folderAdd.call(this, name);

        // Allow chaining by returning a new object with this folder as the root
        var ret = this.clone();
        ret.root = newFolder.name;
        return ret;
    },

    /**
     * Delete a file, or a directory and all sub-files, from the zip
     * @param {string} name the name of the file to delete
     * @return {JSZip} this JSZip object
     */
    remove: function(name) {
        name = this.root + name;
        var file = this.files[name];
        if (!file) {
            // Look for any folders
            if (name.slice(-1) != "/") {
                name += "/";
            }
            file = this.files[name];
        }

        if (file && !file.dir) {
            // file
            delete this.files[name];
        } else {
            // maybe a folder, delete recursively
            var kids = this.filter(function(relativePath, file) {
                return file.name.slice(0, name.length) === name;
            });
            for (var i = 0; i < kids.length; i++) {
                delete this.files[kids[i].name];
            }
        }

        return this;
    },

    /**
     * Generate the complete zip file
     * @param {Object} options the options to generate the zip file :
     * - base64, (deprecated, use type instead) true to generate base64.
     * - compression, "STORE" by default.
     * - type, "base64" by default. Values are : string, base64, uint8array, arraybuffer, blob.
     * @return {String|Uint8Array|ArrayBuffer|Buffer|Blob} the zip file
     */
    generate: function(options) {
        options = extend(options || {}, {
            base64: true,
            compression: "STORE",
            compressionOptions : null,
            type: "base64",
            platform: "DOS",
            comment: null,
            mimeType: 'application/zip'
        });

        utils.checkSupport(options.type);

        // accept nodejs `process.platform`
        if(
          options.platform === 'darwin' ||
          options.platform === 'freebsd' ||
          options.platform === 'linux' ||
          options.platform === 'sunos'
        ) {
          options.platform = "UNIX";
        }
        if (options.platform === 'win32') {
          options.platform = "DOS";
        }

        var zipData = [],
            localDirLength = 0,
            centralDirLength = 0,
            writer, i,
            utfEncodedComment = utils.transformTo("string", this.utf8encode(options.comment || this.comment || ""));

        // first, generate all the zip parts.
        for (var name in this.files) {
            if (!this.files.hasOwnProperty(name)) {
                continue;
            }
            var file = this.files[name];

            var compressionName = file.options.compression || options.compression.toUpperCase();
            var compression = compressions[compressionName];
            if (!compression) {
                throw new Error(compressionName + " is not a valid compression method !");
            }
            var compressionOptions = file.options.compressionOptions || options.compressionOptions || {};

            var compressedObject = generateCompressedObjectFrom.call(this, file, compression, compressionOptions);

            var zipPart = generateZipParts.call(this, name, file, compressedObject, localDirLength, options.platform);
            localDirLength += zipPart.fileRecord.length + compressedObject.compressedSize;
            centralDirLength += zipPart.dirRecord.length;
            zipData.push(zipPart);
        }

        var dirEnd = "";

        // end of central dir signature
        dirEnd = signature.CENTRAL_DIRECTORY_END +
        // number of this disk
        "\x00\x00" +
        // number of the disk with the start of the central directory
        "\x00\x00" +
        // total number of entries in the central directory on this disk
        decToHex(zipData.length, 2) +
        // total number of entries in the central directory
        decToHex(zipData.length, 2) +
        // size of the central directory   4 bytes
        decToHex(centralDirLength, 4) +
        // offset of start of central directory with respect to the starting disk number
        decToHex(localDirLength, 4) +
        // .ZIP file comment length
        decToHex(utfEncodedComment.length, 2) +
        // .ZIP file comment
        utfEncodedComment;


        // we have all the parts (and the total length)
        // time to create a writer !
        var typeName = options.type.toLowerCase();
        if(typeName==="uint8array"||typeName==="arraybuffer"||typeName==="blob"||typeName==="nodebuffer") {
            writer = new Uint8ArrayWriter(localDirLength + centralDirLength + dirEnd.length);
        }else{
            writer = new StringWriter(localDirLength + centralDirLength + dirEnd.length);
        }

        for (i = 0; i < zipData.length; i++) {
            writer.append(zipData[i].fileRecord);
            writer.append(zipData[i].compressedObject.compressedContent);
        }
        for (i = 0; i < zipData.length; i++) {
            writer.append(zipData[i].dirRecord);
        }

        writer.append(dirEnd);

        var zip = writer.finalize();



        switch(options.type.toLowerCase()) {
            // case "zip is an Uint8Array"
            case "uint8array" :
            case "arraybuffer" :
            case "nodebuffer" :
               return utils.transformTo(options.type.toLowerCase(), zip);
            case "blob" :
               return utils.arrayBuffer2Blob(utils.transformTo("arraybuffer", zip), options.mimeType);
            // case "zip is a string"
            case "base64" :
               return (options.base64) ? base64.encode(zip) : zip;
            default : // case "string" :
               return zip;
         }

    },

    /**
     * @deprecated
     * This method will be removed in a future version without replacement.
     */
    crc32: function (input, crc) {
        return crc32(input, crc);
    },

    /**
     * @deprecated
     * This method will be removed in a future version without replacement.
     */
    utf8encode: function (string) {
        return utils.transformTo("string", utf8.utf8encode(string));
    },

    /**
     * @deprecated
     * This method will be removed in a future version without replacement.
     */
    utf8decode: function (input) {
        return utf8.utf8decode(input);
    }
};
module.exports = out;

},{"./base64":7,"./compressedObject":8,"./compressions":9,"./crc32":10,"./defaults":12,"./nodeBuffer":17,"./signature":20,"./stringWriter":22,"./support":23,"./uint8ArrayWriter":25,"./utf8":26,"./utils":27}],20:[function(require,module,exports){
'use strict';
exports.LOCAL_FILE_HEADER = "PK\x03\x04";
exports.CENTRAL_FILE_HEADER = "PK\x01\x02";
exports.CENTRAL_DIRECTORY_END = "PK\x05\x06";
exports.ZIP64_CENTRAL_DIRECTORY_LOCATOR = "PK\x06\x07";
exports.ZIP64_CENTRAL_DIRECTORY_END = "PK\x06\x06";
exports.DATA_DESCRIPTOR = "PK\x07\x08";

},{}],21:[function(require,module,exports){
'use strict';
var DataReader = require('./dataReader');
var utils = require('./utils');

function StringReader(data, optimizedBinaryString) {
    this.data = data;
    if (!optimizedBinaryString) {
        this.data = utils.string2binary(this.data);
    }
    this.length = this.data.length;
    this.index = 0;
}
StringReader.prototype = new DataReader();
/**
 * @see DataReader.byteAt
 */
StringReader.prototype.byteAt = function(i) {
    return this.data.charCodeAt(i);
};
/**
 * @see DataReader.lastIndexOfSignature
 */
StringReader.prototype.lastIndexOfSignature = function(sig) {
    return this.data.lastIndexOf(sig);
};
/**
 * @see DataReader.readData
 */
StringReader.prototype.readData = function(size) {
    this.checkOffset(size);
    // this will work because the constructor applied the "& 0xff" mask.
    var result = this.data.slice(this.index, this.index + size);
    this.index += size;
    return result;
};
module.exports = StringReader;

},{"./dataReader":11,"./utils":27}],22:[function(require,module,exports){
'use strict';

var utils = require('./utils');

/**
 * An object to write any content to a string.
 * @constructor
 */
var StringWriter = function() {
    this.data = [];
};
StringWriter.prototype = {
    /**
     * Append any content to the current string.
     * @param {Object} input the content to add.
     */
    append: function(input) {
        input = utils.transformTo("string", input);
        this.data.push(input);
    },
    /**
     * Finalize the construction an return the result.
     * @return {string} the generated string.
     */
    finalize: function() {
        return this.data.join("");
    }
};

module.exports = StringWriter;

},{"./utils":27}],23:[function(require,module,exports){
(function (Buffer){
'use strict';
exports.base64 = true;
exports.array = true;
exports.string = true;
exports.arraybuffer = typeof ArrayBuffer !== "undefined" && typeof Uint8Array !== "undefined";
// contains true if JSZip can read/generate nodejs Buffer, false otherwise.
// Browserify will provide a Buffer implementation for browsers, which is
// an augmented Uint8Array (i.e., can be used as either Buffer or U8).
exports.nodebuffer = typeof Buffer !== "undefined";
// contains true if JSZip can read/generate Uint8Array, false otherwise.
exports.uint8array = typeof Uint8Array !== "undefined";

if (typeof ArrayBuffer === "undefined") {
    exports.blob = false;
}
else {
    var buffer = new ArrayBuffer(0);
    try {
        exports.blob = new Blob([buffer], {
            type: "application/zip"
        }).size === 0;
    }
    catch (e) {
        try {
            var Builder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder;
            var builder = new Builder();
            builder.append(buffer);
            exports.blob = builder.getBlob('application/zip').size === 0;
        }
        catch (e) {
            exports.blob = false;
        }
    }
}

}).call(this,require("buffer").Buffer)

},{"buffer":2}],24:[function(require,module,exports){
'use strict';
var DataReader = require('./dataReader');

function Uint8ArrayReader(data) {
    if (data) {
        this.data = data;
        this.length = this.data.length;
        this.index = 0;
    }
}
Uint8ArrayReader.prototype = new DataReader();
/**
 * @see DataReader.byteAt
 */
Uint8ArrayReader.prototype.byteAt = function(i) {
    return this.data[i];
};
/**
 * @see DataReader.lastIndexOfSignature
 */
Uint8ArrayReader.prototype.lastIndexOfSignature = function(sig) {
    var sig0 = sig.charCodeAt(0),
        sig1 = sig.charCodeAt(1),
        sig2 = sig.charCodeAt(2),
        sig3 = sig.charCodeAt(3);
    for (var i = this.length - 4; i >= 0; --i) {
        if (this.data[i] === sig0 && this.data[i + 1] === sig1 && this.data[i + 2] === sig2 && this.data[i + 3] === sig3) {
            return i;
        }
    }

    return -1;
};
/**
 * @see DataReader.readData
 */
Uint8ArrayReader.prototype.readData = function(size) {
    this.checkOffset(size);
    if(size === 0) {
        // in IE10, when using subarray(idx, idx), we get the array [0x00] instead of [].
        return new Uint8Array(0);
    }
    var result = this.data.subarray(this.index, this.index + size);
    this.index += size;
    return result;
};
module.exports = Uint8ArrayReader;

},{"./dataReader":11}],25:[function(require,module,exports){
'use strict';

var utils = require('./utils');

/**
 * An object to write any content to an Uint8Array.
 * @constructor
 * @param {number} length The length of the array.
 */
var Uint8ArrayWriter = function(length) {
    this.data = new Uint8Array(length);
    this.index = 0;
};
Uint8ArrayWriter.prototype = {
    /**
     * Append any content to the current array.
     * @param {Object} input the content to add.
     */
    append: function(input) {
        if (input.length !== 0) {
            // with an empty Uint8Array, Opera fails with a "Offset larger than array size"
            input = utils.transformTo("uint8array", input);
            this.data.set(input, this.index);
            this.index += input.length;
        }
    },
    /**
     * Finalize the construction an return the result.
     * @return {Uint8Array} the generated array.
     */
    finalize: function() {
        return this.data;
    }
};

module.exports = Uint8ArrayWriter;

},{"./utils":27}],26:[function(require,module,exports){
'use strict';

var utils = require('./utils');
var support = require('./support');
var nodeBuffer = require('./nodeBuffer');

/**
 * The following functions come from pako, from pako/lib/utils/strings
 * released under the MIT license, see pako https://github.com/nodeca/pako/
 */

// Table with utf8 lengths (calculated by first byte of sequence)
// Note, that 5 & 6-byte values and some 4-byte values can not be represented in JS,
// because max possible codepoint is 0x10ffff
var _utf8len = new Array(256);
for (var i=0; i<256; i++) {
  _utf8len[i] = (i >= 252 ? 6 : i >= 248 ? 5 : i >= 240 ? 4 : i >= 224 ? 3 : i >= 192 ? 2 : 1);
}
_utf8len[254]=_utf8len[254]=1; // Invalid sequence start

// convert string to array (typed, when possible)
var string2buf = function (str) {
    var buf, c, c2, m_pos, i, str_len = str.length, buf_len = 0;

    // count binary size
    for (m_pos = 0; m_pos < str_len; m_pos++) {
        c = str.charCodeAt(m_pos);
        if ((c & 0xfc00) === 0xd800 && (m_pos+1 < str_len)) {
            c2 = str.charCodeAt(m_pos+1);
            if ((c2 & 0xfc00) === 0xdc00) {
                c = 0x10000 + ((c - 0xd800) << 10) + (c2 - 0xdc00);
                m_pos++;
            }
        }
        buf_len += c < 0x80 ? 1 : c < 0x800 ? 2 : c < 0x10000 ? 3 : 4;
    }

    // allocate buffer
    if (support.uint8array) {
        buf = new Uint8Array(buf_len);
    } else {
        buf = new Array(buf_len);
    }

    // convert
    for (i=0, m_pos = 0; i < buf_len; m_pos++) {
        c = str.charCodeAt(m_pos);
        if ((c & 0xfc00) === 0xd800 && (m_pos+1 < str_len)) {
            c2 = str.charCodeAt(m_pos+1);
            if ((c2 & 0xfc00) === 0xdc00) {
                c = 0x10000 + ((c - 0xd800) << 10) + (c2 - 0xdc00);
                m_pos++;
            }
        }
        if (c < 0x80) {
            /* one byte */
            buf[i++] = c;
        } else if (c < 0x800) {
            /* two bytes */
            buf[i++] = 0xC0 | (c >>> 6);
            buf[i++] = 0x80 | (c & 0x3f);
        } else if (c < 0x10000) {
            /* three bytes */
            buf[i++] = 0xE0 | (c >>> 12);
            buf[i++] = 0x80 | (c >>> 6 & 0x3f);
            buf[i++] = 0x80 | (c & 0x3f);
        } else {
            /* four bytes */
            buf[i++] = 0xf0 | (c >>> 18);
            buf[i++] = 0x80 | (c >>> 12 & 0x3f);
            buf[i++] = 0x80 | (c >>> 6 & 0x3f);
            buf[i++] = 0x80 | (c & 0x3f);
        }
    }

    return buf;
};

// Calculate max possible position in utf8 buffer,
// that will not break sequence. If that's not possible
// - (very small limits) return max size as is.
//
// buf[] - utf8 bytes array
// max   - length limit (mandatory);
var utf8border = function(buf, max) {
    var pos;

    max = max || buf.length;
    if (max > buf.length) { max = buf.length; }

    // go back from last position, until start of sequence found
    pos = max-1;
    while (pos >= 0 && (buf[pos] & 0xC0) === 0x80) { pos--; }

    // Fuckup - very small and broken sequence,
    // return max, because we should return something anyway.
    if (pos < 0) { return max; }

    // If we came to start of buffer - that means vuffer is too small,
    // return max too.
    if (pos === 0) { return max; }

    return (pos + _utf8len[buf[pos]] > max) ? pos : max;
};

// convert array to string
var buf2string = function (buf) {
    var str, i, out, c, c_len;
    var len = buf.length;

    // Reserve max possible length (2 words per char)
    // NB: by unknown reasons, Array is significantly faster for
    //     String.fromCharCode.apply than Uint16Array.
    var utf16buf = new Array(len*2);

    for (out=0, i=0; i<len;) {
        c = buf[i++];
        // quick process ascii
        if (c < 0x80) { utf16buf[out++] = c; continue; }

        c_len = _utf8len[c];
        // skip 5 & 6 byte codes
        if (c_len > 4) { utf16buf[out++] = 0xfffd; i += c_len-1; continue; }

        // apply mask on first byte
        c &= c_len === 2 ? 0x1f : c_len === 3 ? 0x0f : 0x07;
        // join the rest
        while (c_len > 1 && i < len) {
            c = (c << 6) | (buf[i++] & 0x3f);
            c_len--;
        }

        // terminated by end of string?
        if (c_len > 1) { utf16buf[out++] = 0xfffd; continue; }

        if (c < 0x10000) {
            utf16buf[out++] = c;
        } else {
            c -= 0x10000;
            utf16buf[out++] = 0xd800 | ((c >> 10) & 0x3ff);
            utf16buf[out++] = 0xdc00 | (c & 0x3ff);
        }
    }

    // shrinkBuf(utf16buf, out)
    if (utf16buf.length !== out) {
        if(utf16buf.subarray) {
            utf16buf = utf16buf.subarray(0, out);
        } else {
            utf16buf.length = out;
        }
    }

    // return String.fromCharCode.apply(null, utf16buf);
    return utils.applyFromCharCode(utf16buf);
};


// That's all for the pako functions.


/**
 * Transform a javascript string into an array (typed if possible) of bytes,
 * UTF-8 encoded.
 * @param {String} str the string to encode
 * @return {Array|Uint8Array|Buffer} the UTF-8 encoded string.
 */
exports.utf8encode = function utf8encode(str) {
    if (support.nodebuffer) {
        return nodeBuffer(str, "utf-8");
    }

    return string2buf(str);
};


/**
 * Transform a bytes array (or a representation) representing an UTF-8 encoded
 * string into a javascript string.
 * @param {Array|Uint8Array|Buffer} buf the data de decode
 * @return {String} the decoded string.
 */
exports.utf8decode = function utf8decode(buf) {
    if (support.nodebuffer) {
        return utils.transformTo("nodebuffer", buf).toString("utf-8");
    }

    buf = utils.transformTo(support.uint8array ? "uint8array" : "array", buf);

    // return buf2string(buf);
    // Chrome prefers to work with "small" chunks of data
    // for the method buf2string.
    // Firefox and Chrome has their own shortcut, IE doesn't seem to really care.
    var result = [], k = 0, len = buf.length, chunk = 65536;
    while (k < len) {
        var nextBoundary = utf8border(buf, Math.min(k + chunk, len));
        if (support.uint8array) {
            result.push(buf2string(buf.subarray(k, nextBoundary)));
        } else {
            result.push(buf2string(buf.slice(k, nextBoundary)));
        }
        k = nextBoundary;
    }
    return result.join("");

};
// vim: set shiftwidth=4 softtabstop=4:

},{"./nodeBuffer":17,"./support":23,"./utils":27}],27:[function(require,module,exports){
'use strict';
var support = require('./support');
var compressions = require('./compressions');
var nodeBuffer = require('./nodeBuffer');
/**
 * Convert a string to a "binary string" : a string containing only char codes between 0 and 255.
 * @param {string} str the string to transform.
 * @return {String} the binary string.
 */
exports.string2binary = function(str) {
    var result = "";
    for (var i = 0; i < str.length; i++) {
        result += String.fromCharCode(str.charCodeAt(i) & 0xff);
    }
    return result;
};
exports.arrayBuffer2Blob = function(buffer, mimeType) {
    exports.checkSupport("blob");
	mimeType = mimeType || 'application/zip';

    try {
        // Blob constructor
        return new Blob([buffer], {
            type: mimeType
        });
    }
    catch (e) {

        try {
            // deprecated, browser only, old way
            var Builder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder;
            var builder = new Builder();
            builder.append(buffer);
            return builder.getBlob(mimeType);
        }
        catch (e) {

            // well, fuck ?!
            throw new Error("Bug : can't construct the Blob.");
        }
    }


};
/**
 * The identity function.
 * @param {Object} input the input.
 * @return {Object} the same input.
 */
function identity(input) {
    return input;
}

/**
 * Fill in an array with a string.
 * @param {String} str the string to use.
 * @param {Array|ArrayBuffer|Uint8Array|Buffer} array the array to fill in (will be mutated).
 * @return {Array|ArrayBuffer|Uint8Array|Buffer} the updated array.
 */
function stringToArrayLike(str, array) {
    for (var i = 0; i < str.length; ++i) {
        array[i] = str.charCodeAt(i) & 0xFF;
    }
    return array;
}

/**
 * Transform an array-like object to a string.
 * @param {Array|ArrayBuffer|Uint8Array|Buffer} array the array to transform.
 * @return {String} the result.
 */
function arrayLikeToString(array) {
    // Performances notes :
    // --------------------
    // String.fromCharCode.apply(null, array) is the fastest, see
    // see http://jsperf.com/converting-a-uint8array-to-a-string/2
    // but the stack is limited (and we can get huge arrays !).
    //
    // result += String.fromCharCode(array[i]); generate too many strings !
    //
    // This code is inspired by http://jsperf.com/arraybuffer-to-string-apply-performance/2
    var chunk = 65536;
    var result = [],
        len = array.length,
        type = exports.getTypeOf(array),
        k = 0,
        canUseApply = true;
      try {
         switch(type) {
            case "uint8array":
               String.fromCharCode.apply(null, new Uint8Array(0));
               break;
            case "nodebuffer":
               String.fromCharCode.apply(null, nodeBuffer(0));
               break;
         }
      } catch(e) {
         canUseApply = false;
      }

      // no apply : slow and painful algorithm
      // default browser on android 4.*
      if (!canUseApply) {
         var resultStr = "";
         for(var i = 0; i < array.length;i++) {
            resultStr += String.fromCharCode(array[i]);
         }
    return resultStr;
    }
    while (k < len && chunk > 1) {
        try {
            if (type === "array" || type === "nodebuffer") {
                result.push(String.fromCharCode.apply(null, array.slice(k, Math.min(k + chunk, len))));
            }
            else {
                result.push(String.fromCharCode.apply(null, array.subarray(k, Math.min(k + chunk, len))));
            }
            k += chunk;
        }
        catch (e) {
            chunk = Math.floor(chunk / 2);
        }
    }
    return result.join("");
}

exports.applyFromCharCode = arrayLikeToString;


/**
 * Copy the data from an array-like to an other array-like.
 * @param {Array|ArrayBuffer|Uint8Array|Buffer} arrayFrom the origin array.
 * @param {Array|ArrayBuffer|Uint8Array|Buffer} arrayTo the destination array which will be mutated.
 * @return {Array|ArrayBuffer|Uint8Array|Buffer} the updated destination array.
 */
function arrayLikeToArrayLike(arrayFrom, arrayTo) {
    for (var i = 0; i < arrayFrom.length; i++) {
        arrayTo[i] = arrayFrom[i];
    }
    return arrayTo;
}

// a matrix containing functions to transform everything into everything.
var transform = {};

// string to ?
transform["string"] = {
    "string": identity,
    "array": function(input) {
        return stringToArrayLike(input, new Array(input.length));
    },
    "arraybuffer": function(input) {
        return transform["string"]["uint8array"](input).buffer;
    },
    "uint8array": function(input) {
        return stringToArrayLike(input, new Uint8Array(input.length));
    },
    "nodebuffer": function(input) {
        return stringToArrayLike(input, nodeBuffer(input.length));
    }
};

// array to ?
transform["array"] = {
    "string": arrayLikeToString,
    "array": identity,
    "arraybuffer": function(input) {
        return (new Uint8Array(input)).buffer;
    },
    "uint8array": function(input) {
        return new Uint8Array(input);
    },
    "nodebuffer": function(input) {
        return nodeBuffer(input);
    }
};

// arraybuffer to ?
transform["arraybuffer"] = {
    "string": function(input) {
        return arrayLikeToString(new Uint8Array(input));
    },
    "array": function(input) {
        return arrayLikeToArrayLike(new Uint8Array(input), new Array(input.byteLength));
    },
    "arraybuffer": identity,
    "uint8array": function(input) {
        return new Uint8Array(input);
    },
    "nodebuffer": function(input) {
        return nodeBuffer(new Uint8Array(input));
    }
};

// uint8array to ?
transform["uint8array"] = {
    "string": arrayLikeToString,
    "array": function(input) {
        return arrayLikeToArrayLike(input, new Array(input.length));
    },
    "arraybuffer": function(input) {
        return input.buffer;
    },
    "uint8array": identity,
    "nodebuffer": function(input) {
        return nodeBuffer(input);
    }
};

// nodebuffer to ?
transform["nodebuffer"] = {
    "string": arrayLikeToString,
    "array": function(input) {
        return arrayLikeToArrayLike(input, new Array(input.length));
    },
    "arraybuffer": function(input) {
        return transform["nodebuffer"]["uint8array"](input).buffer;
    },
    "uint8array": function(input) {
        return arrayLikeToArrayLike(input, new Uint8Array(input.length));
    },
    "nodebuffer": identity
};

/**
 * Transform an input into any type.
 * The supported output type are : string, array, uint8array, arraybuffer, nodebuffer.
 * If no output type is specified, the unmodified input will be returned.
 * @param {String} outputType the output type.
 * @param {String|Array|ArrayBuffer|Uint8Array|Buffer} input the input to convert.
 * @throws {Error} an Error if the browser doesn't support the requested output type.
 */
exports.transformTo = function(outputType, input) {
    if (!input) {
        // undefined, null, etc
        // an empty string won't harm.
        input = "";
    }
    if (!outputType) {
        return input;
    }
    exports.checkSupport(outputType);
    var inputType = exports.getTypeOf(input);
    var result = transform[inputType][outputType](input);
    return result;
};

/**
 * Return the type of the input.
 * The type will be in a format valid for JSZip.utils.transformTo : string, array, uint8array, arraybuffer.
 * @param {Object} input the input to identify.
 * @return {String} the (lowercase) type of the input.
 */
exports.getTypeOf = function(input) {
    if (typeof input === "string") {
        return "string";
    }
    if (Object.prototype.toString.call(input) === "[object Array]") {
        return "array";
    }
    if (support.nodebuffer && nodeBuffer.test(input)) {
        return "nodebuffer";
    }
    if (support.uint8array && input instanceof Uint8Array) {
        return "uint8array";
    }
    if (support.arraybuffer && input instanceof ArrayBuffer) {
        return "arraybuffer";
    }
};

/**
 * Throw an exception if the type is not supported.
 * @param {String} type the type to check.
 * @throws {Error} an Error if the browser doesn't support the requested type.
 */
exports.checkSupport = function(type) {
    var supported = support[type.toLowerCase()];
    if (!supported) {
        throw new Error(type + " is not supported by this browser");
    }
};
exports.MAX_VALUE_16BITS = 65535;
exports.MAX_VALUE_32BITS = -1; // well, "\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF" is parsed as -1

/**
 * Prettify a string read as binary.
 * @param {string} str the string to prettify.
 * @return {string} a pretty string.
 */
exports.pretty = function(str) {
    var res = '',
        code, i;
    for (i = 0; i < (str || "").length; i++) {
        code = str.charCodeAt(i);
        res += '\\x' + (code < 16 ? "0" : "") + code.toString(16).toUpperCase();
    }
    return res;
};

/**
 * Find a compression registered in JSZip.
 * @param {string} compressionMethod the method magic to find.
 * @return {Object|null} the JSZip compression object, null if none found.
 */
exports.findCompression = function(compressionMethod) {
    for (var method in compressions) {
        if (!compressions.hasOwnProperty(method)) {
            continue;
        }
        if (compressions[method].magic === compressionMethod) {
            return compressions[method];
        }
    }
    return null;
};
/**
* Cross-window, cross-Node-context regular expression detection
* @param  {Object}  object Anything
* @return {Boolean}        true if the object is a regular expression,
* false otherwise
*/
exports.isRegExp = function (object) {
    return Object.prototype.toString.call(object) === "[object RegExp]";
};


},{"./compressions":9,"./nodeBuffer":17,"./support":23}],28:[function(require,module,exports){
'use strict';
var StringReader = require('./stringReader');
var NodeBufferReader = require('./nodeBufferReader');
var Uint8ArrayReader = require('./uint8ArrayReader');
var utils = require('./utils');
var sig = require('./signature');
var ZipEntry = require('./zipEntry');
var support = require('./support');
var jszipProto = require('./object');
//  class ZipEntries {{{
/**
 * All the entries in the zip file.
 * @constructor
 * @param {String|ArrayBuffer|Uint8Array} data the binary stream to load.
 * @param {Object} loadOptions Options for loading the stream.
 */
function ZipEntries(data, loadOptions) {
    this.files = [];
    this.loadOptions = loadOptions;
    if (data) {
        this.load(data);
    }
}
ZipEntries.prototype = {
    /**
     * Check that the reader is on the speficied signature.
     * @param {string} expectedSignature the expected signature.
     * @throws {Error} if it is an other signature.
     */
    checkSignature: function(expectedSignature) {
        var signature = this.reader.readString(4);
        if (signature !== expectedSignature) {
            throw new Error("Corrupted zip or bug : unexpected signature " + "(" + utils.pretty(signature) + ", expected " + utils.pretty(expectedSignature) + ")");
        }
    },
    /**
     * Read the end of the central directory.
     */
    readBlockEndOfCentral: function() {
        this.diskNumber = this.reader.readInt(2);
        this.diskWithCentralDirStart = this.reader.readInt(2);
        this.centralDirRecordsOnThisDisk = this.reader.readInt(2);
        this.centralDirRecords = this.reader.readInt(2);
        this.centralDirSize = this.reader.readInt(4);
        this.centralDirOffset = this.reader.readInt(4);

        this.zipCommentLength = this.reader.readInt(2);
        // warning : the encoding depends of the system locale
        // On a linux machine with LANG=en_US.utf8, this field is utf8 encoded.
        // On a windows machine, this field is encoded with the localized windows code page.
        this.zipComment = this.reader.readString(this.zipCommentLength);
        // To get consistent behavior with the generation part, we will assume that
        // this is utf8 encoded.
        this.zipComment = jszipProto.utf8decode(this.zipComment);
    },
    /**
     * Read the end of the Zip 64 central directory.
     * Not merged with the method readEndOfCentral :
     * The end of central can coexist with its Zip64 brother,
     * I don't want to read the wrong number of bytes !
     */
    readBlockZip64EndOfCentral: function() {
        this.zip64EndOfCentralSize = this.reader.readInt(8);
        this.versionMadeBy = this.reader.readString(2);
        this.versionNeeded = this.reader.readInt(2);
        this.diskNumber = this.reader.readInt(4);
        this.diskWithCentralDirStart = this.reader.readInt(4);
        this.centralDirRecordsOnThisDisk = this.reader.readInt(8);
        this.centralDirRecords = this.reader.readInt(8);
        this.centralDirSize = this.reader.readInt(8);
        this.centralDirOffset = this.reader.readInt(8);

        this.zip64ExtensibleData = {};
        var extraDataSize = this.zip64EndOfCentralSize - 44,
            index = 0,
            extraFieldId,
            extraFieldLength,
            extraFieldValue;
        while (index < extraDataSize) {
            extraFieldId = this.reader.readInt(2);
            extraFieldLength = this.reader.readInt(4);
            extraFieldValue = this.reader.readString(extraFieldLength);
            this.zip64ExtensibleData[extraFieldId] = {
                id: extraFieldId,
                length: extraFieldLength,
                value: extraFieldValue
            };
        }
    },
    /**
     * Read the end of the Zip 64 central directory locator.
     */
    readBlockZip64EndOfCentralLocator: function() {
        this.diskWithZip64CentralDirStart = this.reader.readInt(4);
        this.relativeOffsetEndOfZip64CentralDir = this.reader.readInt(8);
        this.disksCount = this.reader.readInt(4);
        if (this.disksCount > 1) {
            throw new Error("Multi-volumes zip are not supported");
        }
    },
    /**
     * Read the local files, based on the offset read in the central part.
     */
    readLocalFiles: function() {
        var i, file;
        for (i = 0; i < this.files.length; i++) {
            file = this.files[i];
            this.reader.setIndex(file.localHeaderOffset);
            this.checkSignature(sig.LOCAL_FILE_HEADER);
            file.readLocalPart(this.reader);
            file.handleUTF8();
            file.processAttributes();
        }
    },
    /**
     * Read the central directory.
     */
    readCentralDir: function() {
        var file;

        this.reader.setIndex(this.centralDirOffset);
        while (this.reader.readString(4) === sig.CENTRAL_FILE_HEADER) {
            file = new ZipEntry({
                zip64: this.zip64
            }, this.loadOptions);
            file.readCentralPart(this.reader);
            this.files.push(file);
        }
    },
    /**
     * Read the end of central directory.
     */
    readEndOfCentral: function() {
        var offset = this.reader.lastIndexOfSignature(sig.CENTRAL_DIRECTORY_END);
        if (offset === -1) {
            // Check if the content is a truncated zip or complete garbage.
            // A "LOCAL_FILE_HEADER" is not required at the beginning (auto
            // extractible zip for example) but it can give a good hint.
            // If an ajax request was used without responseType, we will also
            // get unreadable data.
            var isGarbage = true;
            try {
                this.reader.setIndex(0);
                this.checkSignature(sig.LOCAL_FILE_HEADER);
                isGarbage = false;
            } catch (e) {}

            if (isGarbage) {
                throw new Error("Can't find end of central directory : is this a zip file ? " +
                                "If it is, see http://stuk.github.io/jszip/documentation/howto/read_zip.html");
            } else {
                throw new Error("Corrupted zip : can't find end of central directory");
            }
        }
        this.reader.setIndex(offset);
        this.checkSignature(sig.CENTRAL_DIRECTORY_END);
        this.readBlockEndOfCentral();


        /* extract from the zip spec :
            4)  If one of the fields in the end of central directory
                record is too small to hold required data, the field
                should be set to -1 (0xFFFF or 0xFFFFFFFF) and the
                ZIP64 format record should be created.
            5)  The end of central directory record and the
                Zip64 end of central directory locator record must
                reside on the same disk when splitting or spanning
                an archive.
         */
        if (this.diskNumber === utils.MAX_VALUE_16BITS || this.diskWithCentralDirStart === utils.MAX_VALUE_16BITS || this.centralDirRecordsOnThisDisk === utils.MAX_VALUE_16BITS || this.centralDirRecords === utils.MAX_VALUE_16BITS || this.centralDirSize === utils.MAX_VALUE_32BITS || this.centralDirOffset === utils.MAX_VALUE_32BITS) {
            this.zip64 = true;

            /*
            Warning : the zip64 extension is supported, but ONLY if the 64bits integer read from
            the zip file can fit into a 32bits integer. This cannot be solved : Javascript represents
            all numbers as 64-bit double precision IEEE 754 floating point numbers.
            So, we have 53bits for integers and bitwise operations treat everything as 32bits.
            see https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Operators/Bitwise_Operators
            and http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-262.pdf section 8.5
            */

            // should look for a zip64 EOCD locator
            offset = this.reader.lastIndexOfSignature(sig.ZIP64_CENTRAL_DIRECTORY_LOCATOR);
            if (offset === -1) {
                throw new Error("Corrupted zip : can't find the ZIP64 end of central directory locator");
            }
            this.reader.setIndex(offset);
            this.checkSignature(sig.ZIP64_CENTRAL_DIRECTORY_LOCATOR);
            this.readBlockZip64EndOfCentralLocator();

            // now the zip64 EOCD record
            this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir);
            this.checkSignature(sig.ZIP64_CENTRAL_DIRECTORY_END);
            this.readBlockZip64EndOfCentral();
        }
    },
    prepareReader: function(data) {
        var type = utils.getTypeOf(data);
        if (type === "string" && !support.uint8array) {
            this.reader = new StringReader(data, this.loadOptions.optimizedBinaryString);
        }
        else if (type === "nodebuffer") {
            this.reader = new NodeBufferReader(data);
        }
        else {
            this.reader = new Uint8ArrayReader(utils.transformTo("uint8array", data));
        }
    },
    /**
     * Read a zip file and create ZipEntries.
     * @param {String|ArrayBuffer|Uint8Array|Buffer} data the binary string representing a zip file.
     */
    load: function(data) {
        this.prepareReader(data);
        this.readEndOfCentral();
        this.readCentralDir();
        this.readLocalFiles();
    }
};
// }}} end of ZipEntries
module.exports = ZipEntries;

},{"./nodeBufferReader":18,"./object":19,"./signature":20,"./stringReader":21,"./support":23,"./uint8ArrayReader":24,"./utils":27,"./zipEntry":29}],29:[function(require,module,exports){
'use strict';
var StringReader = require('./stringReader');
var utils = require('./utils');
var CompressedObject = require('./compressedObject');
var jszipProto = require('./object');

var MADE_BY_DOS = 0x00;
var MADE_BY_UNIX = 0x03;

// class ZipEntry {{{
/**
 * An entry in the zip file.
 * @constructor
 * @param {Object} options Options of the current file.
 * @param {Object} loadOptions Options for loading the stream.
 */
function ZipEntry(options, loadOptions) {
    this.options = options;
    this.loadOptions = loadOptions;
}
ZipEntry.prototype = {
    /**
     * say if the file is encrypted.
     * @return {boolean} true if the file is encrypted, false otherwise.
     */
    isEncrypted: function() {
        // bit 1 is set
        return (this.bitFlag & 0x0001) === 0x0001;
    },
    /**
     * say if the file has utf-8 filename/comment.
     * @return {boolean} true if the filename/comment is in utf-8, false otherwise.
     */
    useUTF8: function() {
        // bit 11 is set
        return (this.bitFlag & 0x0800) === 0x0800;
    },
    /**
     * Prepare the function used to generate the compressed content from this ZipFile.
     * @param {DataReader} reader the reader to use.
     * @param {number} from the offset from where we should read the data.
     * @param {number} length the length of the data to read.
     * @return {Function} the callback to get the compressed content (the type depends of the DataReader class).
     */
    prepareCompressedContent: function(reader, from, length) {
        return function() {
            var previousIndex = reader.index;
            reader.setIndex(from);
            var compressedFileData = reader.readData(length);
            reader.setIndex(previousIndex);

            return compressedFileData;
        };
    },
    /**
     * Prepare the function used to generate the uncompressed content from this ZipFile.
     * @param {DataReader} reader the reader to use.
     * @param {number} from the offset from where we should read the data.
     * @param {number} length the length of the data to read.
     * @param {JSZip.compression} compression the compression used on this file.
     * @param {number} uncompressedSize the uncompressed size to expect.
     * @return {Function} the callback to get the uncompressed content (the type depends of the DataReader class).
     */
    prepareContent: function(reader, from, length, compression, uncompressedSize) {
        return function() {

            var compressedFileData = utils.transformTo(compression.uncompressInputType, this.getCompressedContent());
            var uncompressedFileData = compression.uncompress(compressedFileData);

            if (uncompressedFileData.length !== uncompressedSize) {
                throw new Error("Bug : uncompressed data size mismatch");
            }

            return uncompressedFileData;
        };
    },
    /**
     * Read the local part of a zip file and add the info in this object.
     * @param {DataReader} reader the reader to use.
     */
    readLocalPart: function(reader) {
        var compression, localExtraFieldsLength;

        // we already know everything from the central dir !
        // If the central dir data are false, we are doomed.
        // On the bright side, the local part is scary  : zip64, data descriptors, both, etc.
        // The less data we get here, the more reliable this should be.
        // Let's skip the whole header and dash to the data !
        reader.skip(22);
        // in some zip created on windows, the filename stored in the central dir contains \ instead of /.
        // Strangely, the filename here is OK.
        // I would love to treat these zip files as corrupted (see http://www.info-zip.org/FAQ.html#backslashes
        // or APPNOTE#4.4.17.1, "All slashes MUST be forward slashes '/'") but there are a lot of bad zip generators...
        // Search "unzip mismatching "local" filename continuing with "central" filename version" on
        // the internet.
        //
        // I think I see the logic here : the central directory is used to display
        // content and the local directory is used to extract the files. Mixing / and \
        // may be used to display \ to windows users and use / when extracting the files.
        // Unfortunately, this lead also to some issues : http://seclists.org/fulldisclosure/2009/Sep/394
        this.fileNameLength = reader.readInt(2);
        localExtraFieldsLength = reader.readInt(2); // can't be sure this will be the same as the central dir
        this.fileName = reader.readString(this.fileNameLength);
        reader.skip(localExtraFieldsLength);

        if (this.compressedSize == -1 || this.uncompressedSize == -1) {
            throw new Error("Bug or corrupted zip : didn't get enough informations from the central directory " + "(compressedSize == -1 || uncompressedSize == -1)");
        }

        compression = utils.findCompression(this.compressionMethod);
        if (compression === null) { // no compression found
            throw new Error("Corrupted zip : compression " + utils.pretty(this.compressionMethod) + " unknown (inner file : " + this.fileName + ")");
        }
        this.decompressed = new CompressedObject();
        this.decompressed.compressedSize = this.compressedSize;
        this.decompressed.uncompressedSize = this.uncompressedSize;
        this.decompressed.crc32 = this.crc32;
        this.decompressed.compressionMethod = this.compressionMethod;
        this.decompressed.getCompressedContent = this.prepareCompressedContent(reader, reader.index, this.compressedSize, compression);
        this.decompressed.getContent = this.prepareContent(reader, reader.index, this.compressedSize, compression, this.uncompressedSize);

        // we need to compute the crc32...
        if (this.loadOptions.checkCRC32) {
            this.decompressed = utils.transformTo("string", this.decompressed.getContent());
            if (jszipProto.crc32(this.decompressed) !== this.crc32) {
                throw new Error("Corrupted zip : CRC32 mismatch");
            }
        }
    },

    /**
     * Read the central part of a zip file and add the info in this object.
     * @param {DataReader} reader the reader to use.
     */
    readCentralPart: function(reader) {
        this.versionMadeBy = reader.readInt(2);
        this.versionNeeded = reader.readInt(2);
        this.bitFlag = reader.readInt(2);
        this.compressionMethod = reader.readString(2);
        this.date = reader.readDate();
        this.crc32 = reader.readInt(4);
        this.compressedSize = reader.readInt(4);
        this.uncompressedSize = reader.readInt(4);
        this.fileNameLength = reader.readInt(2);
        this.extraFieldsLength = reader.readInt(2);
        this.fileCommentLength = reader.readInt(2);
        this.diskNumberStart = reader.readInt(2);
        this.internalFileAttributes = reader.readInt(2);
        this.externalFileAttributes = reader.readInt(4);
        this.localHeaderOffset = reader.readInt(4);

        if (this.isEncrypted()) {
            throw new Error("Encrypted zip are not supported");
        }

        this.fileName = reader.readString(this.fileNameLength);
        this.readExtraFields(reader);
        this.parseZIP64ExtraField(reader);
        this.fileComment = reader.readString(this.fileCommentLength);
    },

    /**
     * Parse the external file attributes and get the unix/dos permissions.
     */
    processAttributes: function () {
        this.unixPermissions = null;
        this.dosPermissions = null;
        var madeBy = this.versionMadeBy >> 8;

        // Check if we have the DOS directory flag set.
        // We look for it in the DOS and UNIX permissions
        // but some unknown platform could set it as a compatibility flag.
        this.dir = this.externalFileAttributes & 0x0010 ? true : false;

        if(madeBy === MADE_BY_DOS) {
            // first 6 bits (0 to 5)
            this.dosPermissions = this.externalFileAttributes & 0x3F;
        }

        if(madeBy === MADE_BY_UNIX) {
            this.unixPermissions = (this.externalFileAttributes >> 16) & 0xFFFF;
            // the octal permissions are in (this.unixPermissions & 0x01FF).toString(8);
        }

        // fail safe : if the name ends with a / it probably means a folder
        if (!this.dir && this.fileName.slice(-1) === '/') {
            this.dir = true;
        }
    },

    /**
     * Parse the ZIP64 extra field and merge the info in the current ZipEntry.
     * @param {DataReader} reader the reader to use.
     */
    parseZIP64ExtraField: function(reader) {

        if (!this.extraFields[0x0001]) {
            return;
        }

        // should be something, preparing the extra reader
        var extraReader = new StringReader(this.extraFields[0x0001].value);

        // I really hope that these 64bits integer can fit in 32 bits integer, because js
        // won't let us have more.
        if (this.uncompressedSize === utils.MAX_VALUE_32BITS) {
            this.uncompressedSize = extraReader.readInt(8);
        }
        if (this.compressedSize === utils.MAX_VALUE_32BITS) {
            this.compressedSize = extraReader.readInt(8);
        }
        if (this.localHeaderOffset === utils.MAX_VALUE_32BITS) {
            this.localHeaderOffset = extraReader.readInt(8);
        }
        if (this.diskNumberStart === utils.MAX_VALUE_32BITS) {
            this.diskNumberStart = extraReader.readInt(4);
        }
    },
    /**
     * Read the central part of a zip file and add the info in this object.
     * @param {DataReader} reader the reader to use.
     */
    readExtraFields: function(reader) {
        var start = reader.index,
            extraFieldId,
            extraFieldLength,
            extraFieldValue;

        this.extraFields = this.extraFields || {};

        while (reader.index < start + this.extraFieldsLength) {
            extraFieldId = reader.readInt(2);
            extraFieldLength = reader.readInt(2);
            extraFieldValue = reader.readString(extraFieldLength);

            this.extraFields[extraFieldId] = {
                id: extraFieldId,
                length: extraFieldLength,
                value: extraFieldValue
            };
        }
    },
    /**
     * Apply an UTF8 transformation if needed.
     */
    handleUTF8: function() {
        if (this.useUTF8()) {
            this.fileName = jszipProto.utf8decode(this.fileName);
            this.fileComment = jszipProto.utf8decode(this.fileComment);
        } else {
            var upath = this.findExtraFieldUnicodePath();
            if (upath !== null) {
                this.fileName = upath;
            }
            var ucomment = this.findExtraFieldUnicodeComment();
            if (ucomment !== null) {
                this.fileComment = ucomment;
            }
        }
    },

    /**
     * Find the unicode path declared in the extra field, if any.
     * @return {String} the unicode path, null otherwise.
     */
    findExtraFieldUnicodePath: function() {
        var upathField = this.extraFields[0x7075];
        if (upathField) {
            var extraReader = new StringReader(upathField.value);

            // wrong version
            if (extraReader.readInt(1) !== 1) {
                return null;
            }

            // the crc of the filename changed, this field is out of date.
            if (jszipProto.crc32(this.fileName) !== extraReader.readInt(4)) {
                return null;
            }

            return jszipProto.utf8decode(extraReader.readString(upathField.length - 5));
        }
        return null;
    },

    /**
     * Find the unicode comment declared in the extra field, if any.
     * @return {String} the unicode comment, null otherwise.
     */
    findExtraFieldUnicodeComment: function() {
        var ucommentField = this.extraFields[0x6375];
        if (ucommentField) {
            var extraReader = new StringReader(ucommentField.value);

            // wrong version
            if (extraReader.readInt(1) !== 1) {
                return null;
            }

            // the crc of the comment changed, this field is out of date.
            if (jszipProto.crc32(this.fileComment) !== extraReader.readInt(4)) {
                return null;
            }

            return jszipProto.utf8decode(extraReader.readString(ucommentField.length - 5));
        }
        return null;
    }
};
module.exports = ZipEntry;

},{"./compressedObject":8,"./object":19,"./stringReader":21,"./utils":27}],30:[function(require,module,exports){
// Top level file is just a mixin of submodules & constants
'use strict';

var assign    = require('./lib/utils/common').assign;

var deflate   = require('./lib/deflate');
var inflate   = require('./lib/inflate');
var constants = require('./lib/zlib/constants');

var pako = {};

assign(pako, deflate, inflate, constants);

module.exports = pako;

},{"./lib/deflate":31,"./lib/inflate":32,"./lib/utils/common":33,"./lib/zlib/constants":36}],31:[function(require,module,exports){
'use strict';


var zlib_deflate = require('./zlib/deflate.js');
var utils = require('./utils/common');
var strings = require('./utils/strings');
var msg = require('./zlib/messages');
var zstream = require('./zlib/zstream');

var toString = Object.prototype.toString;

/* Public constants ==========================================================*/
/* ===========================================================================*/

var Z_NO_FLUSH      = 0;
var Z_FINISH        = 4;

var Z_OK            = 0;
var Z_STREAM_END    = 1;
var Z_SYNC_FLUSH    = 2;

var Z_DEFAULT_COMPRESSION = -1;

var Z_DEFAULT_STRATEGY    = 0;

var Z_DEFLATED  = 8;

/* ===========================================================================*/


/**
 * class Deflate
 *
 * Generic JS-style wrapper for zlib calls. If you don't need
 * streaming behaviour - use more simple functions: [[deflate]],
 * [[deflateRaw]] and [[gzip]].
 **/

/* internal
 * Deflate.chunks -> Array
 *
 * Chunks of output data, if [[Deflate#onData]] not overriden.
 **/

/**
 * Deflate.result -> Uint8Array|Array
 *
 * Compressed result, generated by default [[Deflate#onData]]
 * and [[Deflate#onEnd]] handlers. Filled after you push last chunk
 * (call [[Deflate#push]] with `Z_FINISH` / `true` param)  or if you
 * push a chunk with explicit flush (call [[Deflate#push]] with
 * `Z_SYNC_FLUSH` param).
 **/

/**
 * Deflate.err -> Number
 *
 * Error code after deflate finished. 0 (Z_OK) on success.
 * You will not need it in real life, because deflate errors
 * are possible only on wrong options or bad `onData` / `onEnd`
 * custom handlers.
 **/

/**
 * Deflate.msg -> String
 *
 * Error message, if [[Deflate.err]] != 0
 **/


/**
 * new Deflate(options)
 * - options (Object): zlib deflate options.
 *
 * Creates new deflator instance with specified params. Throws exception
 * on bad params. Supported options:
 *
 * - `level`
 * - `windowBits`
 * - `memLevel`
 * - `strategy`
 *
 * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
 * for more information on these.
 *
 * Additional options, for internal needs:
 *
 * - `chunkSize` - size of generated data chunks (16K by default)
 * - `raw` (Boolean) - do raw deflate
 * - `gzip` (Boolean) - create gzip wrapper
 * - `to` (String) - if equal to 'string', then result will be "binary string"
 *    (each char code [0..255])
 * - `header` (Object) - custom header for gzip
 *   - `text` (Boolean) - true if compressed data believed to be text
 *   - `time` (Number) - modification time, unix timestamp
 *   - `os` (Number) - operation system code
 *   - `extra` (Array) - array of bytes with extra data (max 65536)
 *   - `name` (String) - file name (binary string)
 *   - `comment` (String) - comment (binary string)
 *   - `hcrc` (Boolean) - true if header crc should be added
 *
 * ##### Example:
 *
 * ```javascript
 * var pako = require('pako')
 *   , chunk1 = Uint8Array([1,2,3,4,5,6,7,8,9])
 *   , chunk2 = Uint8Array([10,11,12,13,14,15,16,17,18,19]);
 *
 * var deflate = new pako.Deflate({ level: 3});
 *
 * deflate.push(chunk1, false);
 * deflate.push(chunk2, true);  // true -> last chunk
 *
 * if (deflate.err) { throw new Error(deflate.err); }
 *
 * console.log(deflate.result);
 * ```
 **/
var Deflate = function(options) {

  this.options = utils.assign({
    level: Z_DEFAULT_COMPRESSION,
    method: Z_DEFLATED,
    chunkSize: 16384,
    windowBits: 15,
    memLevel: 8,
    strategy: Z_DEFAULT_STRATEGY,
    to: ''
  }, options || {});

  var opt = this.options;

  if (opt.raw && (opt.windowBits > 0)) {
    opt.windowBits = -opt.windowBits;
  }

  else if (opt.gzip && (opt.windowBits > 0) && (opt.windowBits < 16)) {
    opt.windowBits += 16;
  }

  this.err    = 0;      // error code, if happens (0 = Z_OK)
  this.msg    = '';     // error message
  this.ended  = false;  // used to avoid multiple onEnd() calls
  this.chunks = [];     // chunks of compressed data

  this.strm = new zstream();
  this.strm.avail_out = 0;

  var status = zlib_deflate.deflateInit2(
    this.strm,
    opt.level,
    opt.method,
    opt.windowBits,
    opt.memLevel,
    opt.strategy
  );

  if (status !== Z_OK) {
    throw new Error(msg[status]);
  }

  if (opt.header) {
    zlib_deflate.deflateSetHeader(this.strm, opt.header);
  }
};

/**
 * Deflate#push(data[, mode]) -> Boolean
 * - data (Uint8Array|Array|ArrayBuffer|String): input data. Strings will be
 *   converted to utf8 byte sequence.
 * - mode (Number|Boolean): 0..6 for corresponding Z_NO_FLUSH..Z_TREE modes.
 *   See constants. Skipped or `false` means Z_NO_FLUSH, `true` meansh Z_FINISH.
 *
 * Sends input data to deflate pipe, generating [[Deflate#onData]] calls with
 * new compressed chunks. Returns `true` on success. The last data block must have
 * mode Z_FINISH (or `true`). That will flush internal pending buffers and call
 * [[Deflate#onEnd]]. For interim explicit flushes (without ending the stream) you
 * can use mode Z_SYNC_FLUSH, keeping the compression context.
 *
 * On fail call [[Deflate#onEnd]] with error code and return false.
 *
 * We strongly recommend to use `Uint8Array` on input for best speed (output
 * array format is detected automatically). Also, don't skip last param and always
 * use the same type in your code (boolean or number). That will improve JS speed.
 *
 * For regular `Array`-s make sure all elements are [0..255].
 *
 * ##### Example
 *
 * ```javascript
 * push(chunk, false); // push one of data chunks
 * ...
 * push(chunk, true);  // push last chunk
 * ```
 **/
Deflate.prototype.push = function(data, mode) {
  var strm = this.strm;
  var chunkSize = this.options.chunkSize;
  var status, _mode;

  if (this.ended) { return false; }

  _mode = (mode === ~~mode) ? mode : ((mode === true) ? Z_FINISH : Z_NO_FLUSH);

  // Convert data if needed
  if (typeof data === 'string') {
    // If we need to compress text, change encoding to utf8.
    strm.input = strings.string2buf(data);
  } else if (toString.call(data) === '[object ArrayBuffer]') {
    strm.input = new Uint8Array(data);
  } else {
    strm.input = data;
  }

  strm.next_in = 0;
  strm.avail_in = strm.input.length;

  do {
    if (strm.avail_out === 0) {
      strm.output = new utils.Buf8(chunkSize);
      strm.next_out = 0;
      strm.avail_out = chunkSize;
    }
    status = zlib_deflate.deflate(strm, _mode);    /* no bad return value */

    if (status !== Z_STREAM_END && status !== Z_OK) {
      this.onEnd(status);
      this.ended = true;
      return false;
    }
    if (strm.avail_out === 0 || (strm.avail_in === 0 && (_mode === Z_FINISH || _mode === Z_SYNC_FLUSH))) {
      if (this.options.to === 'string') {
        this.onData(strings.buf2binstring(utils.shrinkBuf(strm.output, strm.next_out)));
      } else {
        this.onData(utils.shrinkBuf(strm.output, strm.next_out));
      }
    }
  } while ((strm.avail_in > 0 || strm.avail_out === 0) && status !== Z_STREAM_END);

  // Finalize on the last chunk.
  if (_mode === Z_FINISH) {
    status = zlib_deflate.deflateEnd(this.strm);
    this.onEnd(status);
    this.ended = true;
    return status === Z_OK;
  }

  // callback interim results if Z_SYNC_FLUSH.
  if (_mode === Z_SYNC_FLUSH) {
    this.onEnd(Z_OK);
    strm.avail_out = 0;
    return true;
  }

  return true;
};


/**
 * Deflate#onData(chunk) -> Void
 * - chunk (Uint8Array|Array|String): ouput data. Type of array depends
 *   on js engine support. When string output requested, each chunk
 *   will be string.
 *
 * By default, stores data blocks in `chunks[]` property and glue
 * those in `onEnd`. Override this handler, if you need another behaviour.
 **/
Deflate.prototype.onData = function(chunk) {
  this.chunks.push(chunk);
};


/**
 * Deflate#onEnd(status) -> Void
 * - status (Number): deflate status. 0 (Z_OK) on success,
 *   other if not.
 *
 * Called once after you tell deflate that the input stream is
 * complete (Z_FINISH) or should be flushed (Z_SYNC_FLUSH)
 * or if an error happened. By default - join collected chunks,
 * free memory and fill `results` / `err` properties.
 **/
Deflate.prototype.onEnd = function(status) {
  // On success - join
  if (status === Z_OK) {
    if (this.options.to === 'string') {
      this.result = this.chunks.join('');
    } else {
      this.result = utils.flattenChunks(this.chunks);
    }
  }
  this.chunks = [];
  this.err = status;
  this.msg = this.strm.msg;
};


/**
 * deflate(data[, options]) -> Uint8Array|Array|String
 * - data (Uint8Array|Array|String): input data to compress.
 * - options (Object): zlib deflate options.
 *
 * Compress `data` with deflate alrorythm and `options`.
 *
 * Supported options are:
 *
 * - level
 * - windowBits
 * - memLevel
 * - strategy
 *
 * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
 * for more information on these.
 *
 * Sugar (options):
 *
 * - `raw` (Boolean) - say that we work with raw stream, if you don't wish to specify
 *   negative windowBits implicitly.
 * - `to` (String) - if equal to 'string', then result will be "binary string"
 *    (each char code [0..255])
 *
 * ##### Example:
 *
 * ```javascript
 * var pako = require('pako')
 *   , data = Uint8Array([1,2,3,4,5,6,7,8,9]);
 *
 * console.log(pako.deflate(data));
 * ```
 **/
function deflate(input, options) {
  var deflator = new Deflate(options);

  deflator.push(input, true);

  // That will never happens, if you don't cheat with options :)
  if (deflator.err) { throw deflator.msg; }

  return deflator.result;
}


/**
 * deflateRaw(data[, options]) -> Uint8Array|Array|String
 * - data (Uint8Array|Array|String): input data to compress.
 * - options (Object): zlib deflate options.
 *
 * The same as [[deflate]], but creates raw data, without wrapper
 * (header and adler32 crc).
 **/
function deflateRaw(input, options) {
  options = options || {};
  options.raw = true;
  return deflate(input, options);
}


/**
 * gzip(data[, options]) -> Uint8Array|Array|String
 * - data (Uint8Array|Array|String): input data to compress.
 * - options (Object): zlib deflate options.
 *
 * The same as [[deflate]], but create gzip wrapper instead of
 * deflate one.
 **/
function gzip(input, options) {
  options = options || {};
  options.gzip = true;
  return deflate(input, options);
}


exports.Deflate = Deflate;
exports.deflate = deflate;
exports.deflateRaw = deflateRaw;
exports.gzip = gzip;

},{"./utils/common":33,"./utils/strings":34,"./zlib/deflate.js":38,"./zlib/messages":43,"./zlib/zstream":45}],32:[function(require,module,exports){
'use strict';


var zlib_inflate = require('./zlib/inflate.js');
var utils = require('./utils/common');
var strings = require('./utils/strings');
var c = require('./zlib/constants');
var msg = require('./zlib/messages');
var zstream = require('./zlib/zstream');
var gzheader = require('./zlib/gzheader');

var toString = Object.prototype.toString;

/**
 * class Inflate
 *
 * Generic JS-style wrapper for zlib calls. If you don't need
 * streaming behaviour - use more simple functions: [[inflate]]
 * and [[inflateRaw]].
 **/

/* internal
 * inflate.chunks -> Array
 *
 * Chunks of output data, if [[Inflate#onData]] not overriden.
 **/

/**
 * Inflate.result -> Uint8Array|Array|String
 *
 * Uncompressed result, generated by default [[Inflate#onData]]
 * and [[Inflate#onEnd]] handlers. Filled after you push last chunk
 * (call [[Inflate#push]] with `Z_FINISH` / `true` param) or if you
 * push a chunk with explicit flush (call [[Inflate#push]] with
 * `Z_SYNC_FLUSH` param).
 **/

/**
 * Inflate.err -> Number
 *
 * Error code after inflate finished. 0 (Z_OK) on success.
 * Should be checked if broken data possible.
 **/

/**
 * Inflate.msg -> String
 *
 * Error message, if [[Inflate.err]] != 0
 **/


/**
 * new Inflate(options)
 * - options (Object): zlib inflate options.
 *
 * Creates new inflator instance with specified params. Throws exception
 * on bad params. Supported options:
 *
 * - `windowBits`
 *
 * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
 * for more information on these.
 *
 * Additional options, for internal needs:
 *
 * - `chunkSize` - size of generated data chunks (16K by default)
 * - `raw` (Boolean) - do raw inflate
 * - `to` (String) - if equal to 'string', then result will be converted
 *   from utf8 to utf16 (javascript) string. When string output requested,
 *   chunk length can differ from `chunkSize`, depending on content.
 *
 * By default, when no options set, autodetect deflate/gzip data format via
 * wrapper header.
 *
 * ##### Example:
 *
 * ```javascript
 * var pako = require('pako')
 *   , chunk1 = Uint8Array([1,2,3,4,5,6,7,8,9])
 *   , chunk2 = Uint8Array([10,11,12,13,14,15,16,17,18,19]);
 *
 * var inflate = new pako.Inflate({ level: 3});
 *
 * inflate.push(chunk1, false);
 * inflate.push(chunk2, true);  // true -> last chunk
 *
 * if (inflate.err) { throw new Error(inflate.err); }
 *
 * console.log(inflate.result);
 * ```
 **/
var Inflate = function(options) {

  this.options = utils.assign({
    chunkSize: 16384,
    windowBits: 0,
    to: ''
  }, options || {});

  var opt = this.options;

  // Force window size for `raw` data, if not set directly,
  // because we have no header for autodetect.
  if (opt.raw && (opt.windowBits >= 0) && (opt.windowBits < 16)) {
    opt.windowBits = -opt.windowBits;
    if (opt.windowBits === 0) { opt.windowBits = -15; }
  }

  // If `windowBits` not defined (and mode not raw) - set autodetect flag for gzip/deflate
  if ((opt.windowBits >= 0) && (opt.windowBits < 16) &&
      !(options && options.windowBits)) {
    opt.windowBits += 32;
  }

  // Gzip header has no info about windows size, we can do autodetect only
  // for deflate. So, if window size not set, force it to max when gzip possible
  if ((opt.windowBits > 15) && (opt.windowBits < 48)) {
    // bit 3 (16) -> gzipped data
    // bit 4 (32) -> autodetect gzip/deflate
    if ((opt.windowBits & 15) === 0) {
      opt.windowBits |= 15;
    }
  }

  this.err    = 0;      // error code, if happens (0 = Z_OK)
  this.msg    = '';     // error message
  this.ended  = false;  // used to avoid multiple onEnd() calls
  this.chunks = [];     // chunks of compressed data

  this.strm   = new zstream();
  this.strm.avail_out = 0;

  var status  = zlib_inflate.inflateInit2(
    this.strm,
    opt.windowBits
  );

  if (status !== c.Z_OK) {
    throw new Error(msg[status]);
  }

  this.header = new gzheader();

  zlib_inflate.inflateGetHeader(this.strm, this.header);
};

/**
 * Inflate#push(data[, mode]) -> Boolean
 * - data (Uint8Array|Array|ArrayBuffer|String): input data
 * - mode (Number|Boolean): 0..6 for corresponding Z_NO_FLUSH..Z_TREE modes.
 *   See constants. Skipped or `false` means Z_NO_FLUSH, `true` meansh Z_FINISH.
 *
 * Sends input data to inflate pipe, generating [[Inflate#onData]] calls with
 * new output chunks. Returns `true` on success. The last data block must have
 * mode Z_FINISH (or `true`). That will flush internal pending buffers and call
 * [[Inflate#onEnd]]. For interim explicit flushes (without ending the stream) you
 * can use mode Z_SYNC_FLUSH, keeping the decompression context.
 *
 * On fail call [[Inflate#onEnd]] with error code and return false.
 *
 * We strongly recommend to use `Uint8Array` on input for best speed (output
 * format is detected automatically). Also, don't skip last param and always
 * use the same type in your code (boolean or number). That will improve JS speed.
 *
 * For regular `Array`-s make sure all elements are [0..255].
 *
 * ##### Example
 *
 * ```javascript
 * push(chunk, false); // push one of data chunks
 * ...
 * push(chunk, true);  // push last chunk
 * ```
 **/
Inflate.prototype.push = function(data, mode) {
  var strm = this.strm;
  var chunkSize = this.options.chunkSize;
  var status, _mode;
  var next_out_utf8, tail, utf8str;

  // Flag to properly process Z_BUF_ERROR on testing inflate call
  // when we check that all output data was flushed.
  var allowBufError = false;

  if (this.ended) { return false; }
  _mode = (mode === ~~mode) ? mode : ((mode === true) ? c.Z_FINISH : c.Z_NO_FLUSH);

  // Convert data if needed
  if (typeof data === 'string') {
    // Only binary strings can be decompressed on practice
    strm.input = strings.binstring2buf(data);
  } else if (toString.call(data) === '[object ArrayBuffer]') {
    strm.input = new Uint8Array(data);
  } else {
    strm.input = data;
  }

  strm.next_in = 0;
  strm.avail_in = strm.input.length;

  do {
    if (strm.avail_out === 0) {
      strm.output = new utils.Buf8(chunkSize);
      strm.next_out = 0;
      strm.avail_out = chunkSize;
    }

    status = zlib_inflate.inflate(strm, c.Z_NO_FLUSH);    /* no bad return value */

    if (status === c.Z_BUF_ERROR && allowBufError === true) {
      status = c.Z_OK;
      allowBufError = false;
    }

    if (status !== c.Z_STREAM_END && status !== c.Z_OK) {
      this.onEnd(status);
      this.ended = true;
      return false;
    }

    if (strm.next_out) {
      if (strm.avail_out === 0 || status === c.Z_STREAM_END || (strm.avail_in === 0 && (_mode === c.Z_FINISH || _mode === c.Z_SYNC_FLUSH))) {

        if (this.options.to === 'string') {

          next_out_utf8 = strings.utf8border(strm.output, strm.next_out);

          tail = strm.next_out - next_out_utf8;
          utf8str = strings.buf2string(strm.output, next_out_utf8);

          // move tail
          strm.next_out = tail;
          strm.avail_out = chunkSize - tail;
          if (tail) { utils.arraySet(strm.output, strm.output, next_out_utf8, tail, 0); }

          this.onData(utf8str);

        } else {
          this.onData(utils.shrinkBuf(strm.output, strm.next_out));
        }
      }
    }

    // When no more input data, we should check that internal inflate buffers
    // are flushed. The only way to do it when avail_out = 0 - run one more
    // inflate pass. But if output data not exists, inflate return Z_BUF_ERROR.
    // Here we set flag to process this error properly.
    //
    // NOTE. Deflate does not return error in this case and does not needs such
    // logic.
    if (strm.avail_in === 0 && strm.avail_out === 0) {
      allowBufError = true;
    }

  } while ((strm.avail_in > 0 || strm.avail_out === 0) && status !== c.Z_STREAM_END);

  if (status === c.Z_STREAM_END) {
    _mode = c.Z_FINISH;
  }

  // Finalize on the last chunk.
  if (_mode === c.Z_FINISH) {
    status = zlib_inflate.inflateEnd(this.strm);
    this.onEnd(status);
    this.ended = true;
    return status === c.Z_OK;
  }

  // callback interim results if Z_SYNC_FLUSH.
  if (_mode === c.Z_SYNC_FLUSH) {
    this.onEnd(c.Z_OK);
    strm.avail_out = 0;
    return true;
  }

  return true;
};


/**
 * Inflate#onData(chunk) -> Void
 * - chunk (Uint8Array|Array|String): ouput data. Type of array depends
 *   on js engine support. When string output requested, each chunk
 *   will be string.
 *
 * By default, stores data blocks in `chunks[]` property and glue
 * those in `onEnd`. Override this handler, if you need another behaviour.
 **/
Inflate.prototype.onData = function(chunk) {
  this.chunks.push(chunk);
};


/**
 * Inflate#onEnd(status) -> Void
 * - status (Number): inflate status. 0 (Z_OK) on success,
 *   other if not.
 *
 * Called either after you tell inflate that the input stream is
 * complete (Z_FINISH) or should be flushed (Z_SYNC_FLUSH)
 * or if an error happened. By default - join collected chunks,
 * free memory and fill `results` / `err` properties.
 **/
Inflate.prototype.onEnd = function(status) {
  // On success - join
  if (status === c.Z_OK) {
    if (this.options.to === 'string') {
      // Glue & convert here, until we teach pako to send
      // utf8 alligned strings to onData
      this.result = this.chunks.join('');
    } else {
      this.result = utils.flattenChunks(this.chunks);
    }
  }
  this.chunks = [];
  this.err = status;
  this.msg = this.strm.msg;
};


/**
 * inflate(data[, options]) -> Uint8Array|Array|String
 * - data (Uint8Array|Array|String): input data to decompress.
 * - options (Object): zlib inflate options.
 *
 * Decompress `data` with inflate/ungzip and `options`. Autodetect
 * format via wrapper header by default. That's why we don't provide
 * separate `ungzip` method.
 *
 * Supported options are:
 *
 * - windowBits
 *
 * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
 * for more information.
 *
 * Sugar (options):
 *
 * - `raw` (Boolean) - say that we work with raw stream, if you don't wish to specify
 *   negative windowBits implicitly.
 * - `to` (String) - if equal to 'string', then result will be converted
 *   from utf8 to utf16 (javascript) string. When string output requested,
 *   chunk length can differ from `chunkSize`, depending on content.
 *
 *
 * ##### Example:
 *
 * ```javascript
 * var pako = require('pako')
 *   , input = pako.deflate([1,2,3,4,5,6,7,8,9])
 *   , output;
 *
 * try {
 *   output = pako.inflate(input);
 * } catch (err)
 *   console.log(err);
 * }
 * ```
 **/
function inflate(input, options) {
  var inflator = new Inflate(options);

  inflator.push(input, true);

  // That will never happens, if you don't cheat with options :)
  if (inflator.err) { throw inflator.msg; }

  return inflator.result;
}


/**
 * inflateRaw(data[, options]) -> Uint8Array|Array|String
 * - data (Uint8Array|Array|String): input data to decompress.
 * - options (Object): zlib inflate options.
 *
 * The same as [[inflate]], but creates raw data, without wrapper
 * (header and adler32 crc).
 **/
function inflateRaw(input, options) {
  options = options || {};
  options.raw = true;
  return inflate(input, options);
}


/**
 * ungzip(data[, options]) -> Uint8Array|Array|String
 * - data (Uint8Array|Array|String): input data to decompress.
 * - options (Object): zlib inflate options.
 *
 * Just shortcut to [[inflate]], because it autodetects format
 * by header.content. Done for convenience.
 **/


exports.Inflate = Inflate;
exports.inflate = inflate;
exports.inflateRaw = inflateRaw;
exports.ungzip  = inflate;

},{"./utils/common":33,"./utils/strings":34,"./zlib/constants":36,"./zlib/gzheader":39,"./zlib/inflate.js":41,"./zlib/messages":43,"./zlib/zstream":45}],33:[function(require,module,exports){
'use strict';


var TYPED_OK =  (typeof Uint8Array !== 'undefined') &&
                (typeof Uint16Array !== 'undefined') &&
                (typeof Int32Array !== 'undefined');


exports.assign = function (obj /*from1, from2, from3, ...*/) {
  var sources = Array.prototype.slice.call(arguments, 1);
  while (sources.length) {
    var source = sources.shift();
    if (!source) { continue; }

    if (typeof source !== 'object') {
      throw new TypeError(source + 'must be non-object');
    }

    for (var p in source) {
      if (source.hasOwnProperty(p)) {
        obj[p] = source[p];
      }
    }
  }

  return obj;
};


// reduce buffer size, avoiding mem copy
exports.shrinkBuf = function (buf, size) {
  if (buf.length === size) { return buf; }
  if (buf.subarray) { return buf.subarray(0, size); }
  buf.length = size;
  return buf;
};


var fnTyped = {
  arraySet: function (dest, src, src_offs, len, dest_offs) {
    if (src.subarray && dest.subarray) {
      dest.set(src.subarray(src_offs, src_offs+len), dest_offs);
      return;
    }
    // Fallback to ordinary array
    for (var i=0; i<len; i++) {
      dest[dest_offs + i] = src[src_offs + i];
    }
  },
  // Join array of chunks to single array.
  flattenChunks: function(chunks) {
    var i, l, len, pos, chunk, result;

    // calculate data length
    len = 0;
    for (i=0, l=chunks.length; i<l; i++) {
      len += chunks[i].length;
    }

    // join chunks
    result = new Uint8Array(len);
    pos = 0;
    for (i=0, l=chunks.length; i<l; i++) {
      chunk = chunks[i];
      result.set(chunk, pos);
      pos += chunk.length;
    }

    return result;
  }
};

var fnUntyped = {
  arraySet: function (dest, src, src_offs, len, dest_offs) {
    for (var i=0; i<len; i++) {
      dest[dest_offs + i] = src[src_offs + i];
    }
  },
  // Join array of chunks to single array.
  flattenChunks: function(chunks) {
    return [].concat.apply([], chunks);
  }
};


// Enable/Disable typed arrays use, for testing
//
exports.setTyped = function (on) {
  if (on) {
    exports.Buf8  = Uint8Array;
    exports.Buf16 = Uint16Array;
    exports.Buf32 = Int32Array;
    exports.assign(exports, fnTyped);
  } else {
    exports.Buf8  = Array;
    exports.Buf16 = Array;
    exports.Buf32 = Array;
    exports.assign(exports, fnUntyped);
  }
};

exports.setTyped(TYPED_OK);

},{}],34:[function(require,module,exports){
// String encode/decode helpers
'use strict';


var utils = require('./common');


// Quick check if we can use fast array to bin string conversion
//
// - apply(Array) can fail on Android 2.2
// - apply(Uint8Array) can fail on iOS 5.1 Safary
//
var STR_APPLY_OK = true;
var STR_APPLY_UIA_OK = true;

try { String.fromCharCode.apply(null, [0]); } catch(__) { STR_APPLY_OK = false; }
try { String.fromCharCode.apply(null, new Uint8Array(1)); } catch(__) { STR_APPLY_UIA_OK = false; }


// Table with utf8 lengths (calculated by first byte of sequence)
// Note, that 5 & 6-byte values and some 4-byte values can not be represented in JS,
// because max possible codepoint is 0x10ffff
var _utf8len = new utils.Buf8(256);
for (var q=0; q<256; q++) {
  _utf8len[q] = (q >= 252 ? 6 : q >= 248 ? 5 : q >= 240 ? 4 : q >= 224 ? 3 : q >= 192 ? 2 : 1);
}
_utf8len[254]=_utf8len[254]=1; // Invalid sequence start


// convert string to array (typed, when possible)
exports.string2buf = function (str) {
  var buf, c, c2, m_pos, i, str_len = str.length, buf_len = 0;

  // count binary size
  for (m_pos = 0; m_pos < str_len; m_pos++) {
    c = str.charCodeAt(m_pos);
    if ((c & 0xfc00) === 0xd800 && (m_pos+1 < str_len)) {
      c2 = str.charCodeAt(m_pos+1);
      if ((c2 & 0xfc00) === 0xdc00) {
        c = 0x10000 + ((c - 0xd800) << 10) + (c2 - 0xdc00);
        m_pos++;
      }
    }
    buf_len += c < 0x80 ? 1 : c < 0x800 ? 2 : c < 0x10000 ? 3 : 4;
  }

  // allocate buffer
  buf = new utils.Buf8(buf_len);

  // convert
  for (i=0, m_pos = 0; i < buf_len; m_pos++) {
    c = str.charCodeAt(m_pos);
    if ((c & 0xfc00) === 0xd800 && (m_pos+1 < str_len)) {
      c2 = str.charCodeAt(m_pos+1);
      if ((c2 & 0xfc00) === 0xdc00) {
        c = 0x10000 + ((c - 0xd800) << 10) + (c2 - 0xdc00);
        m_pos++;
      }
    }
    if (c < 0x80) {
      /* one byte */
      buf[i++] = c;
    } else if (c < 0x800) {
      /* two bytes */
      buf[i++] = 0xC0 | (c >>> 6);
      buf[i++] = 0x80 | (c & 0x3f);
    } else if (c < 0x10000) {
      /* three bytes */
      buf[i++] = 0xE0 | (c >>> 12);
      buf[i++] = 0x80 | (c >>> 6 & 0x3f);
      buf[i++] = 0x80 | (c & 0x3f);
    } else {
      /* four bytes */
      buf[i++] = 0xf0 | (c >>> 18);
      buf[i++] = 0x80 | (c >>> 12 & 0x3f);
      buf[i++] = 0x80 | (c >>> 6 & 0x3f);
      buf[i++] = 0x80 | (c & 0x3f);
    }
  }

  return buf;
};

// Helper (used in 2 places)
function buf2binstring(buf, len) {
  // use fallback for big arrays to avoid stack overflow
  if (len < 65537) {
    if ((buf.subarray && STR_APPLY_UIA_OK) || (!buf.subarray && STR_APPLY_OK)) {
      return String.fromCharCode.apply(null, utils.shrinkBuf(buf, len));
    }
  }

  var result = '';
  for (var i=0; i < len; i++) {
    result += String.fromCharCode(buf[i]);
  }
  return result;
}


// Convert byte array to binary string
exports.buf2binstring = function(buf) {
  return buf2binstring(buf, buf.length);
};


// Convert binary string (typed, when possible)
exports.binstring2buf = function(str) {
  var buf = new utils.Buf8(str.length);
  for (var i=0, len=buf.length; i < len; i++) {
    buf[i] = str.charCodeAt(i);
  }
  return buf;
};


// convert array to string
exports.buf2string = function (buf, max) {
  var i, out, c, c_len;
  var len = max || buf.length;

  // Reserve max possible length (2 words per char)
  // NB: by unknown reasons, Array is significantly faster for
  //     String.fromCharCode.apply than Uint16Array.
  var utf16buf = new Array(len*2);

  for (out=0, i=0; i<len;) {
    c = buf[i++];
    // quick process ascii
    if (c < 0x80) { utf16buf[out++] = c; continue; }

    c_len = _utf8len[c];
    // skip 5 & 6 byte codes
    if (c_len > 4) { utf16buf[out++] = 0xfffd; i += c_len-1; continue; }

    // apply mask on first byte
    c &= c_len === 2 ? 0x1f : c_len === 3 ? 0x0f : 0x07;
    // join the rest
    while (c_len > 1 && i < len) {
      c = (c << 6) | (buf[i++] & 0x3f);
      c_len--;
    }

    // terminated by end of string?
    if (c_len > 1) { utf16buf[out++] = 0xfffd; continue; }

    if (c < 0x10000) {
      utf16buf[out++] = c;
    } else {
      c -= 0x10000;
      utf16buf[out++] = 0xd800 | ((c >> 10) & 0x3ff);
      utf16buf[out++] = 0xdc00 | (c & 0x3ff);
    }
  }

  return buf2binstring(utf16buf, out);
};


// Calculate max possible position in utf8 buffer,
// that will not break sequence. If that's not possible
// - (very small limits) return max size as is.
//
// buf[] - utf8 bytes array
// max   - length limit (mandatory);
exports.utf8border = function(buf, max) {
  var pos;

  max = max || buf.length;
  if (max > buf.length) { max = buf.length; }

  // go back from last position, until start of sequence found
  pos = max-1;
  while (pos >= 0 && (buf[pos] & 0xC0) === 0x80) { pos--; }

  // Fuckup - very small and broken sequence,
  // return max, because we should return something anyway.
  if (pos < 0) { return max; }

  // If we came to start of buffer - that means vuffer is too small,
  // return max too.
  if (pos === 0) { return max; }

  return (pos + _utf8len[buf[pos]] > max) ? pos : max;
};

},{"./common":33}],35:[function(require,module,exports){
'use strict';

// Note: adler32 takes 12% for level 0 and 2% for level 6.
// It doesn't worth to make additional optimizationa as in original.
// Small size is preferable.

function adler32(adler, buf, len, pos) {
  var s1 = (adler & 0xffff) |0,
      s2 = ((adler >>> 16) & 0xffff) |0,
      n = 0;

  while (len !== 0) {
    // Set limit ~ twice less than 5552, to keep
    // s2 in 31-bits, because we force signed ints.
    // in other case %= will fail.
    n = len > 2000 ? 2000 : len;
    len -= n;

    do {
      s1 = (s1 + buf[pos++]) |0;
      s2 = (s2 + s1) |0;
    } while (--n);

    s1 %= 65521;
    s2 %= 65521;
  }

  return (s1 | (s2 << 16)) |0;
}


module.exports = adler32;

},{}],36:[function(require,module,exports){
module.exports = {

  /* Allowed flush values; see deflate() and inflate() below for details */
  Z_NO_FLUSH:         0,
  Z_PARTIAL_FLUSH:    1,
  Z_SYNC_FLUSH:       2,
  Z_FULL_FLUSH:       3,
  Z_FINISH:           4,
  Z_BLOCK:            5,
  Z_TREES:            6,

  /* Return codes for the compression/decompression functions. Negative values
  * are errors, positive values are used for special but normal events.
  */
  Z_OK:               0,
  Z_STREAM_END:       1,
  Z_NEED_DICT:        2,
  Z_ERRNO:           -1,
  Z_STREAM_ERROR:    -2,
  Z_DATA_ERROR:      -3,
  //Z_MEM_ERROR:     -4,
  Z_BUF_ERROR:       -5,
  //Z_VERSION_ERROR: -6,

  /* compression levels */
  Z_NO_COMPRESSION:         0,
  Z_BEST_SPEED:             1,
  Z_BEST_COMPRESSION:       9,
  Z_DEFAULT_COMPRESSION:   -1,


  Z_FILTERED:               1,
  Z_HUFFMAN_ONLY:           2,
  Z_RLE:                    3,
  Z_FIXED:                  4,
  Z_DEFAULT_STRATEGY:       0,

  /* Possible values of the data_type field (though see inflate()) */
  Z_BINARY:                 0,
  Z_TEXT:                   1,
  //Z_ASCII:                1, // = Z_TEXT (deprecated)
  Z_UNKNOWN:                2,

  /* The deflate compression method */
  Z_DEFLATED:               8
  //Z_NULL:                 null // Use -1 or null inline, depending on var type
};

},{}],37:[function(require,module,exports){
'use strict';

// Note: we can't get significant speed boost here.
// So write code to minimize size - no pregenerated tables
// and array tools dependencies.


// Use ordinary array, since untyped makes no boost here
function makeTable() {
  var c, table = [];

  for (var n =0; n < 256; n++) {
    c = n;
    for (var k =0; k < 8; k++) {
      c = ((c&1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
    }
    table[n] = c;
  }

  return table;
}

// Create table on load. Just 255 signed longs. Not a problem.
var crcTable = makeTable();


function crc32(crc, buf, len, pos) {
  var t = crcTable,
      end = pos + len;

  crc = crc ^ (-1);

  for (var i = pos; i < end; i++) {
    crc = (crc >>> 8) ^ t[(crc ^ buf[i]) & 0xFF];
  }

  return (crc ^ (-1)); // >>> 0;
}


module.exports = crc32;

},{}],38:[function(require,module,exports){
'use strict';

var utils   = require('../utils/common');
var trees   = require('./trees');
var adler32 = require('./adler32');
var crc32   = require('./crc32');
var msg   = require('./messages');

/* Public constants ==========================================================*/
/* ===========================================================================*/


/* Allowed flush values; see deflate() and inflate() below for details */
var Z_NO_FLUSH      = 0;
var Z_PARTIAL_FLUSH = 1;
//var Z_SYNC_FLUSH    = 2;
var Z_FULL_FLUSH    = 3;
var Z_FINISH        = 4;
var Z_BLOCK         = 5;
//var Z_TREES         = 6;


/* Return codes for the compression/decompression functions. Negative values
 * are errors, positive values are used for special but normal events.
 */
var Z_OK            = 0;
var Z_STREAM_END    = 1;
//var Z_NEED_DICT     = 2;
//var Z_ERRNO         = -1;
var Z_STREAM_ERROR  = -2;
var Z_DATA_ERROR    = -3;
//var Z_MEM_ERROR     = -4;
var Z_BUF_ERROR     = -5;
//var Z_VERSION_ERROR = -6;


/* compression levels */
//var Z_NO_COMPRESSION      = 0;
//var Z_BEST_SPEED          = 1;
//var Z_BEST_COMPRESSION    = 9;
var Z_DEFAULT_COMPRESSION = -1;


var Z_FILTERED            = 1;
var Z_HUFFMAN_ONLY        = 2;
var Z_RLE                 = 3;
var Z_FIXED               = 4;
var Z_DEFAULT_STRATEGY    = 0;

/* Possible values of the data_type field (though see inflate()) */
//var Z_BINARY              = 0;
//var Z_TEXT                = 1;
//var Z_ASCII               = 1; // = Z_TEXT
var Z_UNKNOWN             = 2;


/* The deflate compression method */
var Z_DEFLATED  = 8;

/*============================================================================*/


var MAX_MEM_LEVEL = 9;
/* Maximum value for memLevel in deflateInit2 */
var MAX_WBITS = 15;
/* 32K LZ77 window */
var DEF_MEM_LEVEL = 8;


var LENGTH_CODES  = 29;
/* number of length codes, not counting the special END_BLOCK code */
var LITERALS      = 256;
/* number of literal bytes 0..255 */
var L_CODES       = LITERALS + 1 + LENGTH_CODES;
/* number of Literal or Length codes, including the END_BLOCK code */
var D_CODES       = 30;
/* number of distance codes */
var BL_CODES      = 19;
/* number of codes used to transfer the bit lengths */
var HEAP_SIZE     = 2*L_CODES + 1;
/* maximum heap size */
var MAX_BITS  = 15;
/* All codes must not exceed MAX_BITS bits */

var MIN_MATCH = 3;
var MAX_MATCH = 258;
var MIN_LOOKAHEAD = (MAX_MATCH + MIN_MATCH + 1);

var PRESET_DICT = 0x20;

var INIT_STATE = 42;
var EXTRA_STATE = 69;
var NAME_STATE = 73;
var COMMENT_STATE = 91;
var HCRC_STATE = 103;
var BUSY_STATE = 113;
var FINISH_STATE = 666;

var BS_NEED_MORE      = 1; /* block not completed, need more input or more output */
var BS_BLOCK_DONE     = 2; /* block flush performed */
var BS_FINISH_STARTED = 3; /* finish started, need only more output at next deflate */
var BS_FINISH_DONE    = 4; /* finish done, accept no more input or output */

var OS_CODE = 0x03; // Unix :) . Don't detect, use this default.

function err(strm, errorCode) {
  strm.msg = msg[errorCode];
  return errorCode;
}

function rank(f) {
  return ((f) << 1) - ((f) > 4 ? 9 : 0);
}

function zero(buf) { var len = buf.length; while (--len >= 0) { buf[len] = 0; } }


/* =========================================================================
 * Flush as much pending output as possible. All deflate() output goes
 * through this function so some applications may wish to modify it
 * to avoid allocating a large strm->output buffer and copying into it.
 * (See also read_buf()).
 */
function flush_pending(strm) {
  var s = strm.state;

  //_tr_flush_bits(s);
  var len = s.pending;
  if (len > strm.avail_out) {
    len = strm.avail_out;
  }
  if (len === 0) { return; }

  utils.arraySet(strm.output, s.pending_buf, s.pending_out, len, strm.next_out);
  strm.next_out += len;
  s.pending_out += len;
  strm.total_out += len;
  strm.avail_out -= len;
  s.pending -= len;
  if (s.pending === 0) {
    s.pending_out = 0;
  }
}


function flush_block_only (s, last) {
  trees._tr_flush_block(s, (s.block_start >= 0 ? s.block_start : -1), s.strstart - s.block_start, last);
  s.block_start = s.strstart;
  flush_pending(s.strm);
}


function put_byte(s, b) {
  s.pending_buf[s.pending++] = b;
}


/* =========================================================================
 * Put a short in the pending buffer. The 16-bit value is put in MSB order.
 * IN assertion: the stream state is correct and there is enough room in
 * pending_buf.
 */
function putShortMSB(s, b) {
//  put_byte(s, (Byte)(b >> 8));
//  put_byte(s, (Byte)(b & 0xff));
  s.pending_buf[s.pending++] = (b >>> 8) & 0xff;
  s.pending_buf[s.pending++] = b & 0xff;
}


/* ===========================================================================
 * Read a new buffer from the current input stream, update the adler32
 * and total number of bytes read.  All deflate() input goes through
 * this function so some applications may wish to modify it to avoid
 * allocating a large strm->input buffer and copying from it.
 * (See also flush_pending()).
 */
function read_buf(strm, buf, start, size) {
  var len = strm.avail_in;

  if (len > size) { len = size; }
  if (len === 0) { return 0; }

  strm.avail_in -= len;

  utils.arraySet(buf, strm.input, strm.next_in, len, start);
  if (strm.state.wrap === 1) {
    strm.adler = adler32(strm.adler, buf, len, start);
  }

  else if (strm.state.wrap === 2) {
    strm.adler = crc32(strm.adler, buf, len, start);
  }

  strm.next_in += len;
  strm.total_in += len;

  return len;
}


/* ===========================================================================
 * Set match_start to the longest match starting at the given string and
 * return its length. Matches shorter or equal to prev_length are discarded,
 * in which case the result is equal to prev_length and match_start is
 * garbage.
 * IN assertions: cur_match is the head of the hash chain for the current
 *   string (strstart) and its distance is <= MAX_DIST, and prev_length >= 1
 * OUT assertion: the match length is not greater than s->lookahead.
 */
function longest_match(s, cur_match) {
  var chain_length = s.max_chain_length;      /* max hash chain length */
  var scan = s.strstart; /* current string */
  var match;                       /* matched string */
  var len;                           /* length of current match */
  var best_len = s.prev_length;              /* best match length so far */
  var nice_match = s.nice_match;             /* stop if match long enough */
  var limit = (s.strstart > (s.w_size - MIN_LOOKAHEAD)) ?
      s.strstart - (s.w_size - MIN_LOOKAHEAD) : 0/*NIL*/;

  var _win = s.window; // shortcut

  var wmask = s.w_mask;
  var prev  = s.prev;

  /* Stop when cur_match becomes <= limit. To simplify the code,
   * we prevent matches with the string of window index 0.
   */

  var strend = s.strstart + MAX_MATCH;
  var scan_end1  = _win[scan + best_len - 1];
  var scan_end   = _win[scan + best_len];

  /* The code is optimized for HASH_BITS >= 8 and MAX_MATCH-2 multiple of 16.
   * It is easy to get rid of this optimization if necessary.
   */
  // Assert(s->hash_bits >= 8 && MAX_MATCH == 258, "Code too clever");

  /* Do not waste too much time if we already have a good match: */
  if (s.prev_length >= s.good_match) {
    chain_length >>= 2;
  }
  /* Do not look for matches beyond the end of the input. This is necessary
   * to make deflate deterministic.
   */
  if (nice_match > s.lookahead) { nice_match = s.lookahead; }

  // Assert((ulg)s->strstart <= s->window_size-MIN_LOOKAHEAD, "need lookahead");

  do {
    // Assert(cur_match < s->strstart, "no future");
    match = cur_match;

    /* Skip to next match if the match length cannot increase
     * or if the match length is less than 2.  Note that the checks below
     * for insufficient lookahead only occur occasionally for performance
     * reasons.  Therefore uninitialized memory will be accessed, and
     * conditional jumps will be made that depend on those values.
     * However the length of the match is limited to the lookahead, so
     * the output of deflate is not affected by the uninitialized values.
     */

    if (_win[match + best_len]     !== scan_end  ||
        _win[match + best_len - 1] !== scan_end1 ||
        _win[match]                !== _win[scan] ||
        _win[++match]              !== _win[scan + 1]) {
      continue;
    }

    /* The check at best_len-1 can be removed because it will be made
     * again later. (This heuristic is not always a win.)
     * It is not necessary to compare scan[2] and match[2] since they
     * are always equal when the other bytes match, given that
     * the hash keys are equal and that HASH_BITS >= 8.
     */
    scan += 2;
    match++;
    // Assert(*scan == *match, "match[2]?");

    /* We check for insufficient lookahead only every 8th comparison;
     * the 256th check will be made at strstart+258.
     */
    do {
      /*jshint noempty:false*/
    } while (_win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
             _win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
             _win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
             _win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
             scan < strend);

    // Assert(scan <= s->window+(unsigned)(s->window_size-1), "wild scan");

    len = MAX_MATCH - (strend - scan);
    scan = strend - MAX_MATCH;

    if (len > best_len) {
      s.match_start = cur_match;
      best_len = len;
      if (len >= nice_match) {
        break;
      }
      scan_end1  = _win[scan + best_len - 1];
      scan_end   = _win[scan + best_len];
    }
  } while ((cur_match = prev[cur_match & wmask]) > limit && --chain_length !== 0);

  if (best_len <= s.lookahead) {
    return best_len;
  }
  return s.lookahead;
}


/* ===========================================================================
 * Fill the window when the lookahead becomes insufficient.
 * Updates strstart and lookahead.
 *
 * IN assertion: lookahead < MIN_LOOKAHEAD
 * OUT assertions: strstart <= window_size-MIN_LOOKAHEAD
 *    At least one byte has been read, or avail_in == 0; reads are
 *    performed for at least two bytes (required for the zip translate_eol
 *    option -- not supported here).
 */
function fill_window(s) {
  var _w_size = s.w_size;
  var p, n, m, more, str;

  //Assert(s->lookahead < MIN_LOOKAHEAD, "already enough lookahead");

  do {
    more = s.window_size - s.lookahead - s.strstart;

    // JS ints have 32 bit, block below not needed
    /* Deal with !@#$% 64K limit: */
    //if (sizeof(int) <= 2) {
    //    if (more == 0 && s->strstart == 0 && s->lookahead == 0) {
    //        more = wsize;
    //
    //  } else if (more == (unsigned)(-1)) {
    //        /* Very unlikely, but possible on 16 bit machine if
    //         * strstart == 0 && lookahead == 1 (input done a byte at time)
    //         */
    //        more--;
    //    }
    //}


    /* If the window is almost full and there is insufficient lookahead,
     * move the upper half to the lower one to make room in the upper half.
     */
    if (s.strstart >= _w_size + (_w_size - MIN_LOOKAHEAD)) {

      utils.arraySet(s.window, s.window, _w_size, _w_size, 0);
      s.match_start -= _w_size;
      s.strstart -= _w_size;
      /* we now have strstart >= MAX_DIST */
      s.block_start -= _w_size;

      /* Slide the hash table (could be avoided with 32 bit values
       at the expense of memory usage). We slide even when level == 0
       to keep the hash table consistent if we switch back to level > 0
       later. (Using level 0 permanently is not an optimal usage of
       zlib, so we don't care about this pathological case.)
       */

      n = s.hash_size;
      p = n;
      do {
        m = s.head[--p];
        s.head[p] = (m >= _w_size ? m - _w_size : 0);
      } while (--n);

      n = _w_size;
      p = n;
      do {
        m = s.prev[--p];
        s.prev[p] = (m >= _w_size ? m - _w_size : 0);
        /* If n is not on any hash chain, prev[n] is garbage but
         * its value will never be used.
         */
      } while (--n);

      more += _w_size;
    }
    if (s.strm.avail_in === 0) {
      break;
    }

    /* If there was no sliding:
     *    strstart <= WSIZE+MAX_DIST-1 && lookahead <= MIN_LOOKAHEAD - 1 &&
     *    more == window_size - lookahead - strstart
     * => more >= window_size - (MIN_LOOKAHEAD-1 + WSIZE + MAX_DIST-1)
     * => more >= window_size - 2*WSIZE + 2
     * In the BIG_MEM or MMAP case (not yet supported),
     *   window_size == input_size + MIN_LOOKAHEAD  &&
     *   strstart + s->lookahead <= input_size => more >= MIN_LOOKAHEAD.
     * Otherwise, window_size == 2*WSIZE so more >= 2.
     * If there was sliding, more >= WSIZE. So in all cases, more >= 2.
     */
    //Assert(more >= 2, "more < 2");
    n = read_buf(s.strm, s.window, s.strstart + s.lookahead, more);
    s.lookahead += n;

    /* Initialize the hash value now that we have some input: */
    if (s.lookahead + s.insert >= MIN_MATCH) {
      str = s.strstart - s.insert;
      s.ins_h = s.window[str];

      /* UPDATE_HASH(s, s->ins_h, s->window[str + 1]); */
      s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[str + 1]) & s.hash_mask;
//#if MIN_MATCH != 3
//        Call update_hash() MIN_MATCH-3 more times
//#endif
      while (s.insert) {
        /* UPDATE_HASH(s, s->ins_h, s->window[str + MIN_MATCH-1]); */
        s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[str + MIN_MATCH-1]) & s.hash_mask;

        s.prev[str & s.w_mask] = s.head[s.ins_h];
        s.head[s.ins_h] = str;
        str++;
        s.insert--;
        if (s.lookahead + s.insert < MIN_MATCH) {
          break;
        }
      }
    }
    /* If the whole input has less than MIN_MATCH bytes, ins_h is garbage,
     * but this is not important since only literal bytes will be emitted.
     */

  } while (s.lookahead < MIN_LOOKAHEAD && s.strm.avail_in !== 0);

  /* If the WIN_INIT bytes after the end of the current data have never been
   * written, then zero those bytes in order to avoid memory check reports of
   * the use of uninitialized (or uninitialised as Julian writes) bytes by
   * the longest match routines.  Update the high water mark for the next
   * time through here.  WIN_INIT is set to MAX_MATCH since the longest match
   * routines allow scanning to strstart + MAX_MATCH, ignoring lookahead.
   */
//  if (s.high_water < s.window_size) {
//    var curr = s.strstart + s.lookahead;
//    var init = 0;
//
//    if (s.high_water < curr) {
//      /* Previous high water mark below current data -- zero WIN_INIT
//       * bytes or up to end of window, whichever is less.
//       */
//      init = s.window_size - curr;
//      if (init > WIN_INIT)
//        init = WIN_INIT;
//      zmemzero(s->window + curr, (unsigned)init);
//      s->high_water = curr + init;
//    }
//    else if (s->high_water < (ulg)curr + WIN_INIT) {
//      /* High water mark at or above current data, but below current data
//       * plus WIN_INIT -- zero out to current data plus WIN_INIT, or up
//       * to end of window, whichever is less.
//       */
//      init = (ulg)curr + WIN_INIT - s->high_water;
//      if (init > s->window_size - s->high_water)
//        init = s->window_size - s->high_water;
//      zmemzero(s->window + s->high_water, (unsigned)init);
//      s->high_water += init;
//    }
//  }
//
//  Assert((ulg)s->strstart <= s->window_size - MIN_LOOKAHEAD,
//    "not enough room for search");
}

/* ===========================================================================
 * Copy without compression as much as possible from the input stream, return
 * the current block state.
 * This function does not insert new strings in the dictionary since
 * uncompressible data is probably not useful. This function is used
 * only for the level=0 compression option.
 * NOTE: this function should be optimized to avoid extra copying from
 * window to pending_buf.
 */
function deflate_stored(s, flush) {
  /* Stored blocks are limited to 0xffff bytes, pending_buf is limited
   * to pending_buf_size, and each stored block has a 5 byte header:
   */
  var max_block_size = 0xffff;

  if (max_block_size > s.pending_buf_size - 5) {
    max_block_size = s.pending_buf_size - 5;
  }

  /* Copy as much as possible from input to output: */
  for (;;) {
    /* Fill the window as much as possible: */
    if (s.lookahead <= 1) {

      //Assert(s->strstart < s->w_size+MAX_DIST(s) ||
      //  s->block_start >= (long)s->w_size, "slide too late");
//      if (!(s.strstart < s.w_size + (s.w_size - MIN_LOOKAHEAD) ||
//        s.block_start >= s.w_size)) {
//        throw  new Error("slide too late");
//      }

      fill_window(s);
      if (s.lookahead === 0 && flush === Z_NO_FLUSH) {
        return BS_NEED_MORE;
      }

      if (s.lookahead === 0) {
        break;
      }
      /* flush the current block */
    }
    //Assert(s->block_start >= 0L, "block gone");
//    if (s.block_start < 0) throw new Error("block gone");

    s.strstart += s.lookahead;
    s.lookahead = 0;

    /* Emit a stored block if pending_buf will be full: */
    var max_start = s.block_start + max_block_size;

    if (s.strstart === 0 || s.strstart >= max_start) {
      /* strstart == 0 is possible when wraparound on 16-bit machine */
      s.lookahead = s.strstart - max_start;
      s.strstart = max_start;
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/


    }
    /* Flush if we may have to slide, otherwise block_start may become
     * negative and the data will be gone:
     */
    if (s.strstart - s.block_start >= (s.w_size - MIN_LOOKAHEAD)) {
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/
    }
  }

  s.insert = 0;

  if (flush === Z_FINISH) {
    /*** FLUSH_BLOCK(s, 1); ***/
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    /***/
    return BS_FINISH_DONE;
  }

  if (s.strstart > s.block_start) {
    /*** FLUSH_BLOCK(s, 0); ***/
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
    /***/
  }

  return BS_NEED_MORE;
}

/* ===========================================================================
 * Compress as much as possible from the input stream, return the current
 * block state.
 * This function does not perform lazy evaluation of matches and inserts
 * new strings in the dictionary only for unmatched strings or for short
 * matches. It is used only for the fast compression options.
 */
function deflate_fast(s, flush) {
  var hash_head;        /* head of the hash chain */
  var bflush;           /* set if current block must be flushed */

  for (;;) {
    /* Make sure that we always have enough lookahead, except
     * at the end of the input file. We need MAX_MATCH bytes
     * for the next match, plus MIN_MATCH bytes to insert the
     * string following the next match.
     */
    if (s.lookahead < MIN_LOOKAHEAD) {
      fill_window(s);
      if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH) {
        return BS_NEED_MORE;
      }
      if (s.lookahead === 0) {
        break; /* flush the current block */
      }
    }

    /* Insert the string window[strstart .. strstart+2] in the
     * dictionary, and set hash_head to the head of the hash chain:
     */
    hash_head = 0/*NIL*/;
    if (s.lookahead >= MIN_MATCH) {
      /*** INSERT_STRING(s, s.strstart, hash_head); ***/
      s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
      hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
      s.head[s.ins_h] = s.strstart;
      /***/
    }

    /* Find the longest match, discarding those <= prev_length.
     * At this point we have always match_length < MIN_MATCH
     */
    if (hash_head !== 0/*NIL*/ && ((s.strstart - hash_head) <= (s.w_size - MIN_LOOKAHEAD))) {
      /* To simplify the code, we prevent matches with the string
       * of window index 0 (in particular we have to avoid a match
       * of the string with itself at the start of the input file).
       */
      s.match_length = longest_match(s, hash_head);
      /* longest_match() sets match_start */
    }
    if (s.match_length >= MIN_MATCH) {
      // check_match(s, s.strstart, s.match_start, s.match_length); // for debug only

      /*** _tr_tally_dist(s, s.strstart - s.match_start,
                     s.match_length - MIN_MATCH, bflush); ***/
      bflush = trees._tr_tally(s, s.strstart - s.match_start, s.match_length - MIN_MATCH);

      s.lookahead -= s.match_length;

      /* Insert new strings in the hash table only if the match length
       * is not too large. This saves time but degrades compression.
       */
      if (s.match_length <= s.max_lazy_match/*max_insert_length*/ && s.lookahead >= MIN_MATCH) {
        s.match_length--; /* string at strstart already in table */
        do {
          s.strstart++;
          /*** INSERT_STRING(s, s.strstart, hash_head); ***/
          s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
          hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
          s.head[s.ins_h] = s.strstart;
          /***/
          /* strstart never exceeds WSIZE-MAX_MATCH, so there are
           * always MIN_MATCH bytes ahead.
           */
        } while (--s.match_length !== 0);
        s.strstart++;
      } else
      {
        s.strstart += s.match_length;
        s.match_length = 0;
        s.ins_h = s.window[s.strstart];
        /* UPDATE_HASH(s, s.ins_h, s.window[s.strstart+1]); */
        s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + 1]) & s.hash_mask;

//#if MIN_MATCH != 3
//                Call UPDATE_HASH() MIN_MATCH-3 more times
//#endif
        /* If lookahead < MIN_MATCH, ins_h is garbage, but it does not
         * matter since it will be recomputed at next deflate call.
         */
      }
    } else {
      /* No match, output a literal byte */
      //Tracevv((stderr,"%c", s.window[s.strstart]));
      /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/
      bflush = trees._tr_tally(s, 0, s.window[s.strstart]);

      s.lookahead--;
      s.strstart++;
    }
    if (bflush) {
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/
    }
  }
  s.insert = ((s.strstart < (MIN_MATCH-1)) ? s.strstart : MIN_MATCH-1);
  if (flush === Z_FINISH) {
    /*** FLUSH_BLOCK(s, 1); ***/
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    /***/
    return BS_FINISH_DONE;
  }
  if (s.last_lit) {
    /*** FLUSH_BLOCK(s, 0); ***/
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
    /***/
  }
  return BS_BLOCK_DONE;
}

/* ===========================================================================
 * Same as above, but achieves better compression. We use a lazy
 * evaluation for matches: a match is finally adopted only if there is
 * no better match at the next window position.
 */
function deflate_slow(s, flush) {
  var hash_head;          /* head of hash chain */
  var bflush;              /* set if current block must be flushed */

  var max_insert;

  /* Process the input block. */
  for (;;) {
    /* Make sure that we always have enough lookahead, except
     * at the end of the input file. We need MAX_MATCH bytes
     * for the next match, plus MIN_MATCH bytes to insert the
     * string following the next match.
     */
    if (s.lookahead < MIN_LOOKAHEAD) {
      fill_window(s);
      if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH) {
        return BS_NEED_MORE;
      }
      if (s.lookahead === 0) { break; } /* flush the current block */
    }

    /* Insert the string window[strstart .. strstart+2] in the
     * dictionary, and set hash_head to the head of the hash chain:
     */
    hash_head = 0/*NIL*/;
    if (s.lookahead >= MIN_MATCH) {
      /*** INSERT_STRING(s, s.strstart, hash_head); ***/
      s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
      hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
      s.head[s.ins_h] = s.strstart;
      /***/
    }

    /* Find the longest match, discarding those <= prev_length.
     */
    s.prev_length = s.match_length;
    s.prev_match = s.match_start;
    s.match_length = MIN_MATCH-1;

    if (hash_head !== 0/*NIL*/ && s.prev_length < s.max_lazy_match &&
        s.strstart - hash_head <= (s.w_size-MIN_LOOKAHEAD)/*MAX_DIST(s)*/) {
      /* To simplify the code, we prevent matches with the string
       * of window index 0 (in particular we have to avoid a match
       * of the string with itself at the start of the input file).
       */
      s.match_length = longest_match(s, hash_head);
      /* longest_match() sets match_start */

      if (s.match_length <= 5 &&
         (s.strategy === Z_FILTERED || (s.match_length === MIN_MATCH && s.strstart - s.match_start > 4096/*TOO_FAR*/))) {

        /* If prev_match is also MIN_MATCH, match_start is garbage
         * but we will ignore the current match anyway.
         */
        s.match_length = MIN_MATCH-1;
      }
    }
    /* If there was a match at the previous step and the current
     * match is not better, output the previous match:
     */
    if (s.prev_length >= MIN_MATCH && s.match_length <= s.prev_length) {
      max_insert = s.strstart + s.lookahead - MIN_MATCH;
      /* Do not insert strings in hash table beyond this. */

      //check_match(s, s.strstart-1, s.prev_match, s.prev_length);

      /***_tr_tally_dist(s, s.strstart - 1 - s.prev_match,
                     s.prev_length - MIN_MATCH, bflush);***/
      bflush = trees._tr_tally(s, s.strstart - 1- s.prev_match, s.prev_length - MIN_MATCH);
      /* Insert in hash table all strings up to the end of the match.
       * strstart-1 and strstart are already inserted. If there is not
       * enough lookahead, the last two strings are not inserted in
       * the hash table.
       */
      s.lookahead -= s.prev_length-1;
      s.prev_length -= 2;
      do {
        if (++s.strstart <= max_insert) {
          /*** INSERT_STRING(s, s.strstart, hash_head); ***/
          s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
          hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
          s.head[s.ins_h] = s.strstart;
          /***/
        }
      } while (--s.prev_length !== 0);
      s.match_available = 0;
      s.match_length = MIN_MATCH-1;
      s.strstart++;

      if (bflush) {
        /*** FLUSH_BLOCK(s, 0); ***/
        flush_block_only(s, false);
        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
        /***/
      }

    } else if (s.match_available) {
      /* If there was no match at the previous position, output a
       * single literal. If there was a match but the current match
       * is longer, truncate the previous match to a single literal.
       */
      //Tracevv((stderr,"%c", s->window[s->strstart-1]));
      /*** _tr_tally_lit(s, s.window[s.strstart-1], bflush); ***/
      bflush = trees._tr_tally(s, 0, s.window[s.strstart-1]);

      if (bflush) {
        /*** FLUSH_BLOCK_ONLY(s, 0) ***/
        flush_block_only(s, false);
        /***/
      }
      s.strstart++;
      s.lookahead--;
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
    } else {
      /* There is no previous match to compare with, wait for
       * the next step to decide.
       */
      s.match_available = 1;
      s.strstart++;
      s.lookahead--;
    }
  }
  //Assert (flush != Z_NO_FLUSH, "no flush?");
  if (s.match_available) {
    //Tracevv((stderr,"%c", s->window[s->strstart-1]));
    /*** _tr_tally_lit(s, s.window[s.strstart-1], bflush); ***/
    bflush = trees._tr_tally(s, 0, s.window[s.strstart-1]);

    s.match_available = 0;
  }
  s.insert = s.strstart < MIN_MATCH-1 ? s.strstart : MIN_MATCH-1;
  if (flush === Z_FINISH) {
    /*** FLUSH_BLOCK(s, 1); ***/
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    /***/
    return BS_FINISH_DONE;
  }
  if (s.last_lit) {
    /*** FLUSH_BLOCK(s, 0); ***/
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
    /***/
  }

  return BS_BLOCK_DONE;
}


/* ===========================================================================
 * For Z_RLE, simply look for runs of bytes, generate matches only of distance
 * one.  Do not maintain a hash table.  (It will be regenerated if this run of
 * deflate switches away from Z_RLE.)
 */
function deflate_rle(s, flush) {
  var bflush;            /* set if current block must be flushed */
  var prev;              /* byte at distance one to match */
  var scan, strend;      /* scan goes up to strend for length of run */

  var _win = s.window;

  for (;;) {
    /* Make sure that we always have enough lookahead, except
     * at the end of the input file. We need MAX_MATCH bytes
     * for the longest run, plus one for the unrolled loop.
     */
    if (s.lookahead <= MAX_MATCH) {
      fill_window(s);
      if (s.lookahead <= MAX_MATCH && flush === Z_NO_FLUSH) {
        return BS_NEED_MORE;
      }
      if (s.lookahead === 0) { break; } /* flush the current block */
    }

    /* See how many times the previous byte repeats */
    s.match_length = 0;
    if (s.lookahead >= MIN_MATCH && s.strstart > 0) {
      scan = s.strstart - 1;
      prev = _win[scan];
      if (prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan]) {
        strend = s.strstart + MAX_MATCH;
        do {
          /*jshint noempty:false*/
        } while (prev === _win[++scan] && prev === _win[++scan] &&
                 prev === _win[++scan] && prev === _win[++scan] &&
                 prev === _win[++scan] && prev === _win[++scan] &&
                 prev === _win[++scan] && prev === _win[++scan] &&
                 scan < strend);
        s.match_length = MAX_MATCH - (strend - scan);
        if (s.match_length > s.lookahead) {
          s.match_length = s.lookahead;
        }
      }
      //Assert(scan <= s->window+(uInt)(s->window_size-1), "wild scan");
    }

    /* Emit match if have run of MIN_MATCH or longer, else emit literal */
    if (s.match_length >= MIN_MATCH) {
      //check_match(s, s.strstart, s.strstart - 1, s.match_length);

      /*** _tr_tally_dist(s, 1, s.match_length - MIN_MATCH, bflush); ***/
      bflush = trees._tr_tally(s, 1, s.match_length - MIN_MATCH);

      s.lookahead -= s.match_length;
      s.strstart += s.match_length;
      s.match_length = 0;
    } else {
      /* No match, output a literal byte */
      //Tracevv((stderr,"%c", s->window[s->strstart]));
      /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/
      bflush = trees._tr_tally(s, 0, s.window[s.strstart]);

      s.lookahead--;
      s.strstart++;
    }
    if (bflush) {
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/
    }
  }
  s.insert = 0;
  if (flush === Z_FINISH) {
    /*** FLUSH_BLOCK(s, 1); ***/
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    /***/
    return BS_FINISH_DONE;
  }
  if (s.last_lit) {
    /*** FLUSH_BLOCK(s, 0); ***/
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
    /***/
  }
  return BS_BLOCK_DONE;
}

/* ===========================================================================
 * For Z_HUFFMAN_ONLY, do not look for matches.  Do not maintain a hash table.
 * (It will be regenerated if this run of deflate switches away from Huffman.)
 */
function deflate_huff(s, flush) {
  var bflush;             /* set if current block must be flushed */

  for (;;) {
    /* Make sure that we have a literal to write. */
    if (s.lookahead === 0) {
      fill_window(s);
      if (s.lookahead === 0) {
        if (flush === Z_NO_FLUSH) {
          return BS_NEED_MORE;
        }
        break;      /* flush the current block */
      }
    }

    /* Output a literal byte */
    s.match_length = 0;
    //Tracevv((stderr,"%c", s->window[s->strstart]));
    /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/
    bflush = trees._tr_tally(s, 0, s.window[s.strstart]);
    s.lookahead--;
    s.strstart++;
    if (bflush) {
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/
    }
  }
  s.insert = 0;
  if (flush === Z_FINISH) {
    /*** FLUSH_BLOCK(s, 1); ***/
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    /***/
    return BS_FINISH_DONE;
  }
  if (s.last_lit) {
    /*** FLUSH_BLOCK(s, 0); ***/
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
    /***/
  }
  return BS_BLOCK_DONE;
}

/* Values for max_lazy_match, good_match and max_chain_length, depending on
 * the desired pack level (0..9). The values given below have been tuned to
 * exclude worst case performance for pathological files. Better values may be
 * found for specific files.
 */
var Config = function (good_length, max_lazy, nice_length, max_chain, func) {
  this.good_length = good_length;
  this.max_lazy = max_lazy;
  this.nice_length = nice_length;
  this.max_chain = max_chain;
  this.func = func;
};

var configuration_table;

configuration_table = [
  /*      good lazy nice chain */
  new Config(0, 0, 0, 0, deflate_stored),          /* 0 store only */
  new Config(4, 4, 8, 4, deflate_fast),            /* 1 max speed, no lazy matches */
  new Config(4, 5, 16, 8, deflate_fast),           /* 2 */
  new Config(4, 6, 32, 32, deflate_fast),          /* 3 */

  new Config(4, 4, 16, 16, deflate_slow),          /* 4 lazy matches */
  new Config(8, 16, 32, 32, deflate_slow),         /* 5 */
  new Config(8, 16, 128, 128, deflate_slow),       /* 6 */
  new Config(8, 32, 128, 256, deflate_slow),       /* 7 */
  new Config(32, 128, 258, 1024, deflate_slow),    /* 8 */
  new Config(32, 258, 258, 4096, deflate_slow)     /* 9 max compression */
];


/* ===========================================================================
 * Initialize the "longest match" routines for a new zlib stream
 */
function lm_init(s) {
  s.window_size = 2 * s.w_size;

  /*** CLEAR_HASH(s); ***/
  zero(s.head); // Fill with NIL (= 0);

  /* Set the default configuration parameters:
   */
  s.max_lazy_match = configuration_table[s.level].max_lazy;
  s.good_match = configuration_table[s.level].good_length;
  s.nice_match = configuration_table[s.level].nice_length;
  s.max_chain_length = configuration_table[s.level].max_chain;

  s.strstart = 0;
  s.block_start = 0;
  s.lookahead = 0;
  s.insert = 0;
  s.match_length = s.prev_length = MIN_MATCH - 1;
  s.match_available = 0;
  s.ins_h = 0;
}


function DeflateState() {
  this.strm = null;            /* pointer back to this zlib stream */
  this.status = 0;            /* as the name implies */
  this.pending_buf = null;      /* output still pending */
  this.pending_buf_size = 0;  /* size of pending_buf */
  this.pending_out = 0;       /* next pending byte to output to the stream */
  this.pending = 0;           /* nb of bytes in the pending buffer */
  this.wrap = 0;              /* bit 0 true for zlib, bit 1 true for gzip */
  this.gzhead = null;         /* gzip header information to write */
  this.gzindex = 0;           /* where in extra, name, or comment */
  this.method = Z_DEFLATED; /* can only be DEFLATED */
  this.last_flush = -1;   /* value of flush param for previous deflate call */

  this.w_size = 0;  /* LZ77 window size (32K by default) */
  this.w_bits = 0;  /* log2(w_size)  (8..16) */
  this.w_mask = 0;  /* w_size - 1 */

  this.window = null;
  /* Sliding window. Input bytes are read into the second half of the window,
   * and move to the first half later to keep a dictionary of at least wSize
   * bytes. With this organization, matches are limited to a distance of
   * wSize-MAX_MATCH bytes, but this ensures that IO is always
   * performed with a length multiple of the block size.
   */

  this.window_size = 0;
  /* Actual size of window: 2*wSize, except when the user input buffer
   * is directly used as sliding window.
   */

  this.prev = null;
  /* Link to older string with same hash index. To limit the size of this
   * array to 64K, this link is maintained only for the last 32K strings.
   * An index in this array is thus a window index modulo 32K.
   */

  this.head = null;   /* Heads of the hash chains or NIL. */

  this.ins_h = 0;       /* hash index of string to be inserted */
  this.hash_size = 0;   /* number of elements in hash table */
  this.hash_bits = 0;   /* log2(hash_size) */
  this.hash_mask = 0;   /* hash_size-1 */

  this.hash_shift = 0;
  /* Number of bits by which ins_h must be shifted at each input
   * step. It must be such that after MIN_MATCH steps, the oldest
   * byte no longer takes part in the hash key, that is:
   *   hash_shift * MIN_MATCH >= hash_bits
   */

  this.block_start = 0;
  /* Window position at the beginning of the current output block. Gets
   * negative when the window is moved backwards.
   */

  this.match_length = 0;      /* length of best match */
  this.prev_match = 0;        /* previous match */
  this.match_available = 0;   /* set if previous match exists */
  this.strstart = 0;          /* start of string to insert */
  this.match_start = 0;       /* start of matching string */
  this.lookahead = 0;         /* number of valid bytes ahead in window */

  this.prev_length = 0;
  /* Length of the best match at previous step. Matches not greater than this
   * are discarded. This is used in the lazy match evaluation.
   */

  this.max_chain_length = 0;
  /* To speed up deflation, hash chains are never searched beyond this
   * length.  A higher limit improves compression ratio but degrades the
   * speed.
   */

  this.max_lazy_match = 0;
  /* Attempt to find a better match only when the current match is strictly
   * smaller than this value. This mechanism is used only for compression
   * levels >= 4.
   */
  // That's alias to max_lazy_match, don't use directly
  //this.max_insert_length = 0;
  /* Insert new strings in the hash table only if the match length is not
   * greater than this length. This saves time but degrades compression.
   * max_insert_length is used only for compression levels <= 3.
   */

  this.level = 0;     /* compression level (1..9) */
  this.strategy = 0;  /* favor or force Huffman coding*/

  this.good_match = 0;
  /* Use a faster search when the previous match is longer than this */

  this.nice_match = 0; /* Stop searching when current match exceeds this */

              /* used by trees.c: */

  /* Didn't use ct_data typedef below to suppress compiler warning */

  // struct ct_data_s dyn_ltree[HEAP_SIZE];   /* literal and length tree */
  // struct ct_data_s dyn_dtree[2*D_CODES+1]; /* distance tree */
  // struct ct_data_s bl_tree[2*BL_CODES+1];  /* Huffman tree for bit lengths */

  // Use flat array of DOUBLE size, with interleaved fata,
  // because JS does not support effective
  this.dyn_ltree  = new utils.Buf16(HEAP_SIZE * 2);
  this.dyn_dtree  = new utils.Buf16((2*D_CODES+1) * 2);
  this.bl_tree    = new utils.Buf16((2*BL_CODES+1) * 2);
  zero(this.dyn_ltree);
  zero(this.dyn_dtree);
  zero(this.bl_tree);

  this.l_desc   = null;         /* desc. for literal tree */
  this.d_desc   = null;         /* desc. for distance tree */
  this.bl_desc  = null;         /* desc. for bit length tree */

  //ush bl_count[MAX_BITS+1];
  this.bl_count = new utils.Buf16(MAX_BITS+1);
  /* number of codes at each bit length for an optimal tree */

  //int heap[2*L_CODES+1];      /* heap used to build the Huffman trees */
  this.heap = new utils.Buf16(2*L_CODES+1);  /* heap used to build the Huffman trees */
  zero(this.heap);

  this.heap_len = 0;               /* number of elements in the heap */
  this.heap_max = 0;               /* element of largest frequency */
  /* The sons of heap[n] are heap[2*n] and heap[2*n+1]. heap[0] is not used.
   * The same heap array is used to build all trees.
   */

  this.depth = new utils.Buf16(2*L_CODES+1); //uch depth[2*L_CODES+1];
  zero(this.depth);
  /* Depth of each subtree used as tie breaker for trees of equal frequency
   */

  this.l_buf = 0;          /* buffer index for literals or lengths */

  this.lit_bufsize = 0;
  /* Size of match buffer for literals/lengths.  There are 4 reasons for
   * limiting lit_bufsize to 64K:
   *   - frequencies can be kept in 16 bit counters
   *   - if compression is not successful for the first block, all input
   *     data is still in the window so we can still emit a stored block even
   *     when input comes from standard input.  (This can also be done for
   *     all blocks if lit_bufsize is not greater than 32K.)
   *   - if compression is not successful for a file smaller than 64K, we can
   *     even emit a stored file instead of a stored block (saving 5 bytes).
   *     This is applicable only for zip (not gzip or zlib).
   *   - creating new Huffman trees less frequently may not provide fast
   *     adaptation to changes in the input data statistics. (Take for
   *     example a binary file with poorly compressible code followed by
   *     a highly compressible string table.) Smaller buffer sizes give
   *     fast adaptation but have of course the overhead of transmitting
   *     trees more frequently.
   *   - I can't count above 4
   */

  this.last_lit = 0;      /* running index in l_buf */

  this.d_buf = 0;
  /* Buffer index for distances. To simplify the code, d_buf and l_buf have
   * the same number of elements. To use different lengths, an extra flag
   * array would be necessary.
   */

  this.opt_len = 0;       /* bit length of current block with optimal trees */
  this.static_len = 0;    /* bit length of current block with static trees */
  this.matches = 0;       /* number of string matches in current block */
  this.insert = 0;        /* bytes at end of window left to insert */


  this.bi_buf = 0;
  /* Output buffer. bits are inserted starting at the bottom (least
   * significant bits).
   */
  this.bi_valid = 0;
  /* Number of valid bits in bi_buf.  All bits above the last valid bit
   * are always zero.
   */

  // Used for window memory init. We safely ignore it for JS. That makes
  // sense only for pointers and memory check tools.
  //this.high_water = 0;
  /* High water mark offset in window for initialized bytes -- bytes above
   * this are set to zero in order to avoid memory check warnings when
   * longest match routines access bytes past the input.  This is then
   * updated to the new high water mark.
   */
}


function deflateResetKeep(strm) {
  var s;

  if (!strm || !strm.state) {
    return err(strm, Z_STREAM_ERROR);
  }

  strm.total_in = strm.total_out = 0;
  strm.data_type = Z_UNKNOWN;

  s = strm.state;
  s.pending = 0;
  s.pending_out = 0;

  if (s.wrap < 0) {
    s.wrap = -s.wrap;
    /* was made negative by deflate(..., Z_FINISH); */
  }
  s.status = (s.wrap ? INIT_STATE : BUSY_STATE);
  strm.adler = (s.wrap === 2) ?
    0  // crc32(0, Z_NULL, 0)
  :
    1; // adler32(0, Z_NULL, 0)
  s.last_flush = Z_NO_FLUSH;
  trees._tr_init(s);
  return Z_OK;
}


function deflateReset(strm) {
  var ret = deflateResetKeep(strm);
  if (ret === Z_OK) {
    lm_init(strm.state);
  }
  return ret;
}


function deflateSetHeader(strm, head) {
  if (!strm || !strm.state) { return Z_STREAM_ERROR; }
  if (strm.state.wrap !== 2) { return Z_STREAM_ERROR; }
  strm.state.gzhead = head;
  return Z_OK;
}


function deflateInit2(strm, level, method, windowBits, memLevel, strategy) {
  if (!strm) { // === Z_NULL
    return Z_STREAM_ERROR;
  }
  var wrap = 1;

  if (level === Z_DEFAULT_COMPRESSION) {
    level = 6;
  }

  if (windowBits < 0) { /* suppress zlib wrapper */
    wrap = 0;
    windowBits = -windowBits;
  }

  else if (windowBits > 15) {
    wrap = 2;           /* write gzip wrapper instead */
    windowBits -= 16;
  }


  if (memLevel < 1 || memLevel > MAX_MEM_LEVEL || method !== Z_DEFLATED ||
    windowBits < 8 || windowBits > 15 || level < 0 || level > 9 ||
    strategy < 0 || strategy > Z_FIXED) {
    return err(strm, Z_STREAM_ERROR);
  }


  if (windowBits === 8) {
    windowBits = 9;
  }
  /* until 256-byte window bug fixed */

  var s = new DeflateState();

  strm.state = s;
  s.strm = strm;

  s.wrap = wrap;
  s.gzhead = null;
  s.w_bits = windowBits;
  s.w_size = 1 << s.w_bits;
  s.w_mask = s.w_size - 1;

  s.hash_bits = memLevel + 7;
  s.hash_size = 1 << s.hash_bits;
  s.hash_mask = s.hash_size - 1;
  s.hash_shift = ~~((s.hash_bits + MIN_MATCH - 1) / MIN_MATCH);

  s.window = new utils.Buf8(s.w_size * 2);
  s.head = new utils.Buf16(s.hash_size);
  s.prev = new utils.Buf16(s.w_size);

  // Don't need mem init magic for JS.
  //s.high_water = 0;  /* nothing written to s->window yet */

  s.lit_bufsize = 1 << (memLevel + 6); /* 16K elements by default */

  s.pending_buf_size = s.lit_bufsize * 4;
  s.pending_buf = new utils.Buf8(s.pending_buf_size);

  s.d_buf = s.lit_bufsize >> 1;
  s.l_buf = (1 + 2) * s.lit_bufsize;

  s.level = level;
  s.strategy = strategy;
  s.method = method;

  return deflateReset(strm);
}

function deflateInit(strm, level) {
  return deflateInit2(strm, level, Z_DEFLATED, MAX_WBITS, DEF_MEM_LEVEL, Z_DEFAULT_STRATEGY);
}


function deflate(strm, flush) {
  var old_flush, s;
  var beg, val; // for gzip header write only

  if (!strm || !strm.state ||
    flush > Z_BLOCK || flush < 0) {
    return strm ? err(strm, Z_STREAM_ERROR) : Z_STREAM_ERROR;
  }

  s = strm.state;

  if (!strm.output ||
      (!strm.input && strm.avail_in !== 0) ||
      (s.status === FINISH_STATE && flush !== Z_FINISH)) {
    return err(strm, (strm.avail_out === 0) ? Z_BUF_ERROR : Z_STREAM_ERROR);
  }

  s.strm = strm; /* just in case */
  old_flush = s.last_flush;
  s.last_flush = flush;

  /* Write the header */
  if (s.status === INIT_STATE) {

    if (s.wrap === 2) { // GZIP header
      strm.adler = 0;  //crc32(0L, Z_NULL, 0);
      put_byte(s, 31);
      put_byte(s, 139);
      put_byte(s, 8);
      if (!s.gzhead) { // s->gzhead == Z_NULL
        put_byte(s, 0);
        put_byte(s, 0);
        put_byte(s, 0);
        put_byte(s, 0);
        put_byte(s, 0);
        put_byte(s, s.level === 9 ? 2 :
                    (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ?
                     4 : 0));
        put_byte(s, OS_CODE);
        s.status = BUSY_STATE;
      }
      else {
        put_byte(s, (s.gzhead.text ? 1 : 0) +
                    (s.gzhead.hcrc ? 2 : 0) +
                    (!s.gzhead.extra ? 0 : 4) +
                    (!s.gzhead.name ? 0 : 8) +
                    (!s.gzhead.comment ? 0 : 16)
                );
        put_byte(s, s.gzhead.time & 0xff);
        put_byte(s, (s.gzhead.time >> 8) & 0xff);
        put_byte(s, (s.gzhead.time >> 16) & 0xff);
        put_byte(s, (s.gzhead.time >> 24) & 0xff);
        put_byte(s, s.level === 9 ? 2 :
                    (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ?
                     4 : 0));
        put_byte(s, s.gzhead.os & 0xff);
        if (s.gzhead.extra && s.gzhead.extra.length) {
          put_byte(s, s.gzhead.extra.length & 0xff);
          put_byte(s, (s.gzhead.extra.length >> 8) & 0xff);
        }
        if (s.gzhead.hcrc) {
          strm.adler = crc32(strm.adler, s.pending_buf, s.pending, 0);
        }
        s.gzindex = 0;
        s.status = EXTRA_STATE;
      }
    }
    else // DEFLATE header
    {
      var header = (Z_DEFLATED + ((s.w_bits - 8) << 4)) << 8;
      var level_flags = -1;

      if (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2) {
        level_flags = 0;
      } else if (s.level < 6) {
        level_flags = 1;
      } else if (s.level === 6) {
        level_flags = 2;
      } else {
        level_flags = 3;
      }
      header |= (level_flags << 6);
      if (s.strstart !== 0) { header |= PRESET_DICT; }
      header += 31 - (header % 31);

      s.status = BUSY_STATE;
      putShortMSB(s, header);

      /* Save the adler32 of the preset dictionary: */
      if (s.strstart !== 0) {
        putShortMSB(s, strm.adler >>> 16);
        putShortMSB(s, strm.adler & 0xffff);
      }
      strm.adler = 1; // adler32(0L, Z_NULL, 0);
    }
  }

//#ifdef GZIP
  if (s.status === EXTRA_STATE) {
    if (s.gzhead.extra/* != Z_NULL*/) {
      beg = s.pending;  /* start of bytes to update crc */

      while (s.gzindex < (s.gzhead.extra.length & 0xffff)) {
        if (s.pending === s.pending_buf_size) {
          if (s.gzhead.hcrc && s.pending > beg) {
            strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
          }
          flush_pending(strm);
          beg = s.pending;
          if (s.pending === s.pending_buf_size) {
            break;
          }
        }
        put_byte(s, s.gzhead.extra[s.gzindex] & 0xff);
        s.gzindex++;
      }
      if (s.gzhead.hcrc && s.pending > beg) {
        strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
      }
      if (s.gzindex === s.gzhead.extra.length) {
        s.gzindex = 0;
        s.status = NAME_STATE;
      }
    }
    else {
      s.status = NAME_STATE;
    }
  }
  if (s.status === NAME_STATE) {
    if (s.gzhead.name/* != Z_NULL*/) {
      beg = s.pending;  /* start of bytes to update crc */
      //int val;

      do {
        if (s.pending === s.pending_buf_size) {
          if (s.gzhead.hcrc && s.pending > beg) {
            strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
          }
          flush_pending(strm);
          beg = s.pending;
          if (s.pending === s.pending_buf_size) {
            val = 1;
            break;
          }
        }
        // JS specific: little magic to add zero terminator to end of string
        if (s.gzindex < s.gzhead.name.length) {
          val = s.gzhead.name.charCodeAt(s.gzindex++) & 0xff;
        } else {
          val = 0;
        }
        put_byte(s, val);
      } while (val !== 0);

      if (s.gzhead.hcrc && s.pending > beg) {
        strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
      }
      if (val === 0) {
        s.gzindex = 0;
        s.status = COMMENT_STATE;
      }
    }
    else {
      s.status = COMMENT_STATE;
    }
  }
  if (s.status === COMMENT_STATE) {
    if (s.gzhead.comment/* != Z_NULL*/) {
      beg = s.pending;  /* start of bytes to update crc */
      //int val;

      do {
        if (s.pending === s.pending_buf_size) {
          if (s.gzhead.hcrc && s.pending > beg) {
            strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
          }
          flush_pending(strm);
          beg = s.pending;
          if (s.pending === s.pending_buf_size) {
            val = 1;
            break;
          }
        }
        // JS specific: little magic to add zero terminator to end of string
        if (s.gzindex < s.gzhead.comment.length) {
          val = s.gzhead.comment.charCodeAt(s.gzindex++) & 0xff;
        } else {
          val = 0;
        }
        put_byte(s, val);
      } while (val !== 0);

      if (s.gzhead.hcrc && s.pending > beg) {
        strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
      }
      if (val === 0) {
        s.status = HCRC_STATE;
      }
    }
    else {
      s.status = HCRC_STATE;
    }
  }
  if (s.status === HCRC_STATE) {
    if (s.gzhead.hcrc) {
      if (s.pending + 2 > s.pending_buf_size) {
        flush_pending(strm);
      }
      if (s.pending + 2 <= s.pending_buf_size) {
        put_byte(s, strm.adler & 0xff);
        put_byte(s, (strm.adler >> 8) & 0xff);
        strm.adler = 0; //crc32(0L, Z_NULL, 0);
        s.status = BUSY_STATE;
      }
    }
    else {
      s.status = BUSY_STATE;
    }
  }
//#endif

  /* Flush as much pending output as possible */
  if (s.pending !== 0) {
    flush_pending(strm);
    if (strm.avail_out === 0) {
      /* Since avail_out is 0, deflate will be called again with
       * more output space, but possibly with both pending and
       * avail_in equal to zero. There won't be anything to do,
       * but this is not an error situation so make sure we
       * return OK instead of BUF_ERROR at next call of deflate:
       */
      s.last_flush = -1;
      return Z_OK;
    }

    /* Make sure there is something to do and avoid duplicate consecutive
     * flushes. For repeated and useless calls with Z_FINISH, we keep
     * returning Z_STREAM_END instead of Z_BUF_ERROR.
     */
  } else if (strm.avail_in === 0 && rank(flush) <= rank(old_flush) &&
    flush !== Z_FINISH) {
    return err(strm, Z_BUF_ERROR);
  }

  /* User must not provide more input after the first FINISH: */
  if (s.status === FINISH_STATE && strm.avail_in !== 0) {
    return err(strm, Z_BUF_ERROR);
  }

  /* Start a new block or continue the current one.
   */
  if (strm.avail_in !== 0 || s.lookahead !== 0 ||
    (flush !== Z_NO_FLUSH && s.status !== FINISH_STATE)) {
    var bstate = (s.strategy === Z_HUFFMAN_ONLY) ? deflate_huff(s, flush) :
      (s.strategy === Z_RLE ? deflate_rle(s, flush) :
        configuration_table[s.level].func(s, flush));

    if (bstate === BS_FINISH_STARTED || bstate === BS_FINISH_DONE) {
      s.status = FINISH_STATE;
    }
    if (bstate === BS_NEED_MORE || bstate === BS_FINISH_STARTED) {
      if (strm.avail_out === 0) {
        s.last_flush = -1;
        /* avoid BUF_ERROR next call, see above */
      }
      return Z_OK;
      /* If flush != Z_NO_FLUSH && avail_out == 0, the next call
       * of deflate should use the same flush parameter to make sure
       * that the flush is complete. So we don't have to output an
       * empty block here, this will be done at next call. This also
       * ensures that for a very small output buffer, we emit at most
       * one empty block.
       */
    }
    if (bstate === BS_BLOCK_DONE) {
      if (flush === Z_PARTIAL_FLUSH) {
        trees._tr_align(s);
      }
      else if (flush !== Z_BLOCK) { /* FULL_FLUSH or SYNC_FLUSH */

        trees._tr_stored_block(s, 0, 0, false);
        /* For a full flush, this empty block will be recognized
         * as a special marker by inflate_sync().
         */
        if (flush === Z_FULL_FLUSH) {
          /*** CLEAR_HASH(s); ***/             /* forget history */
          zero(s.head); // Fill with NIL (= 0);

          if (s.lookahead === 0) {
            s.strstart = 0;
            s.block_start = 0;
            s.insert = 0;
          }
        }
      }
      flush_pending(strm);
      if (strm.avail_out === 0) {
        s.last_flush = -1; /* avoid BUF_ERROR at next call, see above */
        return Z_OK;
      }
    }
  }
  //Assert(strm->avail_out > 0, "bug2");
  //if (strm.avail_out <= 0) { throw new Error("bug2");}

  if (flush !== Z_FINISH) { return Z_OK; }
  if (s.wrap <= 0) { return Z_STREAM_END; }

  /* Write the trailer */
  if (s.wrap === 2) {
    put_byte(s, strm.adler & 0xff);
    put_byte(s, (strm.adler >> 8) & 0xff);
    put_byte(s, (strm.adler >> 16) & 0xff);
    put_byte(s, (strm.adler >> 24) & 0xff);
    put_byte(s, strm.total_in & 0xff);
    put_byte(s, (strm.total_in >> 8) & 0xff);
    put_byte(s, (strm.total_in >> 16) & 0xff);
    put_byte(s, (strm.total_in >> 24) & 0xff);
  }
  else
  {
    putShortMSB(s, strm.adler >>> 16);
    putShortMSB(s, strm.adler & 0xffff);
  }

  flush_pending(strm);
  /* If avail_out is zero, the application will call deflate again
   * to flush the rest.
   */
  if (s.wrap > 0) { s.wrap = -s.wrap; }
  /* write the trailer only once! */
  return s.pending !== 0 ? Z_OK : Z_STREAM_END;
}

function deflateEnd(strm) {
  var status;

  if (!strm/*== Z_NULL*/ || !strm.state/*== Z_NULL*/) {
    return Z_STREAM_ERROR;
  }

  status = strm.state.status;
  if (status !== INIT_STATE &&
    status !== EXTRA_STATE &&
    status !== NAME_STATE &&
    status !== COMMENT_STATE &&
    status !== HCRC_STATE &&
    status !== BUSY_STATE &&
    status !== FINISH_STATE
  ) {
    return err(strm, Z_STREAM_ERROR);
  }

  strm.state = null;

  return status === BUSY_STATE ? err(strm, Z_DATA_ERROR) : Z_OK;
}

/* =========================================================================
 * Copy the source state to the destination state
 */
//function deflateCopy(dest, source) {
//
//}

exports.deflateInit = deflateInit;
exports.deflateInit2 = deflateInit2;
exports.deflateReset = deflateReset;
exports.deflateResetKeep = deflateResetKeep;
exports.deflateSetHeader = deflateSetHeader;
exports.deflate = deflate;
exports.deflateEnd = deflateEnd;
exports.deflateInfo = 'pako deflate (from Nodeca project)';

/* Not implemented
exports.deflateBound = deflateBound;
exports.deflateCopy = deflateCopy;
exports.deflateSetDictionary = deflateSetDictionary;
exports.deflateParams = deflateParams;
exports.deflatePending = deflatePending;
exports.deflatePrime = deflatePrime;
exports.deflateTune = deflateTune;
*/

},{"../utils/common":33,"./adler32":35,"./crc32":37,"./messages":43,"./trees":44}],39:[function(require,module,exports){
'use strict';


function GZheader() {
  /* true if compressed data believed to be text */
  this.text       = 0;
  /* modification time */
  this.time       = 0;
  /* extra flags (not used when writing a gzip file) */
  this.xflags     = 0;
  /* operating system */
  this.os         = 0;
  /* pointer to extra field or Z_NULL if none */
  this.extra      = null;
  /* extra field length (valid if extra != Z_NULL) */
  this.extra_len  = 0; // Actually, we don't need it in JS,
                       // but leave for few code modifications

  //
  // Setup limits is not necessary because in js we should not preallocate memory
  // for inflate use constant limit in 65536 bytes
  //

  /* space at extra (only when reading header) */
  // this.extra_max  = 0;
  /* pointer to zero-terminated file name or Z_NULL */
  this.name       = '';
  /* space at name (only when reading header) */
  // this.name_max   = 0;
  /* pointer to zero-terminated comment or Z_NULL */
  this.comment    = '';
  /* space at comment (only when reading header) */
  // this.comm_max   = 0;
  /* true if there was or will be a header crc */
  this.hcrc       = 0;
  /* true when done reading gzip header (not used when writing a gzip file) */
  this.done       = false;
}

module.exports = GZheader;

},{}],40:[function(require,module,exports){
'use strict';

// See state defs from inflate.js
var BAD = 30;       /* got a data error -- remain here until reset */
var TYPE = 12;      /* i: waiting for type bits, including last-flag bit */

/*
   Decode literal, length, and distance codes and write out the resulting
   literal and match bytes until either not enough input or output is
   available, an end-of-block is encountered, or a data error is encountered.
   When large enough input and output buffers are supplied to inflate(), for
   example, a 16K input buffer and a 64K output buffer, more than 95% of the
   inflate execution time is spent in this routine.

   Entry assumptions:

        state.mode === LEN
        strm.avail_in >= 6
        strm.avail_out >= 258
        start >= strm.avail_out
        state.bits < 8

   On return, state.mode is one of:

        LEN -- ran out of enough output space or enough available input
        TYPE -- reached end of block code, inflate() to interpret next block
        BAD -- error in block data

   Notes:

    - The maximum input bits used by a length/distance pair is 15 bits for the
      length code, 5 bits for the length extra, 15 bits for the distance code,
      and 13 bits for the distance extra.  This totals 48 bits, or six bytes.
      Therefore if strm.avail_in >= 6, then there is enough input to avoid
      checking for available input while decoding.

    - The maximum bytes that a single length/distance pair can output is 258
      bytes, which is the maximum length that can be coded.  inflate_fast()
      requires strm.avail_out >= 258 for each loop to avoid checking for
      output space.
 */
module.exports = function inflate_fast(strm, start) {
  var state;
  var _in;                    /* local strm.input */
  var last;                   /* have enough input while in < last */
  var _out;                   /* local strm.output */
  var beg;                    /* inflate()'s initial strm.output */
  var end;                    /* while out < end, enough space available */
//#ifdef INFLATE_STRICT
  var dmax;                   /* maximum distance from zlib header */
//#endif
  var wsize;                  /* window size or zero if not using window */
  var whave;                  /* valid bytes in the window */
  var wnext;                  /* window write index */
  // Use `s_window` instead `window`, avoid conflict with instrumentation tools
  var s_window;               /* allocated sliding window, if wsize != 0 */
  var hold;                   /* local strm.hold */
  var bits;                   /* local strm.bits */
  var lcode;                  /* local strm.lencode */
  var dcode;                  /* local strm.distcode */
  var lmask;                  /* mask for first level of length codes */
  var dmask;                  /* mask for first level of distance codes */
  var here;                   /* retrieved table entry */
  var op;                     /* code bits, operation, extra bits, or */
                              /*  window position, window bytes to copy */
  var len;                    /* match length, unused bytes */
  var dist;                   /* match distance */
  var from;                   /* where to copy match from */
  var from_source;


  var input, output; // JS specific, because we have no pointers

  /* copy state to local variables */
  state = strm.state;
  //here = state.here;
  _in = strm.next_in;
  input = strm.input;
  last = _in + (strm.avail_in - 5);
  _out = strm.next_out;
  output = strm.output;
  beg = _out - (start - strm.avail_out);
  end = _out + (strm.avail_out - 257);
//#ifdef INFLATE_STRICT
  dmax = state.dmax;
//#endif
  wsize = state.wsize;
  whave = state.whave;
  wnext = state.wnext;
  s_window = state.window;
  hold = state.hold;
  bits = state.bits;
  lcode = state.lencode;
  dcode = state.distcode;
  lmask = (1 << state.lenbits) - 1;
  dmask = (1 << state.distbits) - 1;


  /* decode literals and length/distances until end-of-block or not enough
     input data or output space */

  top:
  do {
    if (bits < 15) {
      hold += input[_in++] << bits;
      bits += 8;
      hold += input[_in++] << bits;
      bits += 8;
    }

    here = lcode[hold & lmask];

    dolen:
    for (;;) { // Goto emulation
      op = here >>> 24/*here.bits*/;
      hold >>>= op;
      bits -= op;
      op = (here >>> 16) & 0xff/*here.op*/;
      if (op === 0) {                          /* literal */
        //Tracevv((stderr, here.val >= 0x20 && here.val < 0x7f ?
        //        "inflate:         literal '%c'\n" :
        //        "inflate:         literal 0x%02x\n", here.val));
        output[_out++] = here & 0xffff/*here.val*/;
      }
      else if (op & 16) {                     /* length base */
        len = here & 0xffff/*here.val*/;
        op &= 15;                           /* number of extra bits */
        if (op) {
          if (bits < op) {
            hold += input[_in++] << bits;
            bits += 8;
          }
          len += hold & ((1 << op) - 1);
          hold >>>= op;
          bits -= op;
        }
        //Tracevv((stderr, "inflate:         length %u\n", len));
        if (bits < 15) {
          hold += input[_in++] << bits;
          bits += 8;
          hold += input[_in++] << bits;
          bits += 8;
        }
        here = dcode[hold & dmask];

        dodist:
        for (;;) { // goto emulation
          op = here >>> 24/*here.bits*/;
          hold >>>= op;
          bits -= op;
          op = (here >>> 16) & 0xff/*here.op*/;

          if (op & 16) {                      /* distance base */
            dist = here & 0xffff/*here.val*/;
            op &= 15;                       /* number of extra bits */
            if (bits < op) {
              hold += input[_in++] << bits;
              bits += 8;
              if (bits < op) {
                hold += input[_in++] << bits;
                bits += 8;
              }
            }
            dist += hold & ((1 << op) - 1);
//#ifdef INFLATE_STRICT
            if (dist > dmax) {
              strm.msg = 'invalid distance too far back';
              state.mode = BAD;
              break top;
            }
//#endif
            hold >>>= op;
            bits -= op;
            //Tracevv((stderr, "inflate:         distance %u\n", dist));
            op = _out - beg;                /* max distance in output */
            if (dist > op) {                /* see if copy from window */
              op = dist - op;               /* distance back in window */
              if (op > whave) {
                if (state.sane) {
                  strm.msg = 'invalid distance too far back';
                  state.mode = BAD;
                  break top;
                }

// (!) This block is disabled in zlib defailts,
// don't enable it for binary compatibility
//#ifdef INFLATE_ALLOW_INVALID_DISTANCE_TOOFAR_ARRR
//                if (len <= op - whave) {
//                  do {
//                    output[_out++] = 0;
//                  } while (--len);
//                  continue top;
//                }
//                len -= op - whave;
//                do {
//                  output[_out++] = 0;
//                } while (--op > whave);
//                if (op === 0) {
//                  from = _out - dist;
//                  do {
//                    output[_out++] = output[from++];
//                  } while (--len);
//                  continue top;
//                }
//#endif
              }
              from = 0; // window index
              from_source = s_window;
              if (wnext === 0) {           /* very common case */
                from += wsize - op;
                if (op < len) {         /* some from window */
                  len -= op;
                  do {
                    output[_out++] = s_window[from++];
                  } while (--op);
                  from = _out - dist;  /* rest from output */
                  from_source = output;
                }
              }
              else if (wnext < op) {      /* wrap around window */
                from += wsize + wnext - op;
                op -= wnext;
                if (op < len) {         /* some from end of window */
                  len -= op;
                  do {
                    output[_out++] = s_window[from++];
                  } while (--op);
                  from = 0;
                  if (wnext < len) {  /* some from start of window */
                    op = wnext;
                    len -= op;
                    do {
                      output[_out++] = s_window[from++];
                    } while (--op);
                    from = _out - dist;      /* rest from output */
                    from_source = output;
                  }
                }
              }
              else {                      /* contiguous in window */
                from += wnext - op;
                if (op < len) {         /* some from window */
                  len -= op;
                  do {
                    output[_out++] = s_window[from++];
                  } while (--op);
                  from = _out - dist;  /* rest from output */
                  from_source = output;
                }
              }
              while (len > 2) {
                output[_out++] = from_source[from++];
                output[_out++] = from_source[from++];
                output[_out++] = from_source[from++];
                len -= 3;
              }
              if (len) {
                output[_out++] = from_source[from++];
                if (len > 1) {
                  output[_out++] = from_source[from++];
                }
              }
            }
            else {
              from = _out - dist;          /* copy direct from output */
              do {                        /* minimum length is three */
                output[_out++] = output[from++];
                output[_out++] = output[from++];
                output[_out++] = output[from++];
                len -= 3;
              } while (len > 2);
              if (len) {
                output[_out++] = output[from++];
                if (len > 1) {
                  output[_out++] = output[from++];
                }
              }
            }
          }
          else if ((op & 64) === 0) {          /* 2nd level distance code */
            here = dcode[(here & 0xffff)/*here.val*/ + (hold & ((1 << op) - 1))];
            continue dodist;
          }
          else {
            strm.msg = 'invalid distance code';
            state.mode = BAD;
            break top;
          }

          break; // need to emulate goto via "continue"
        }
      }
      else if ((op & 64) === 0) {              /* 2nd level length code */
        here = lcode[(here & 0xffff)/*here.val*/ + (hold & ((1 << op) - 1))];
        continue dolen;
      }
      else if (op & 32) {                     /* end-of-block */
        //Tracevv((stderr, "inflate:         end of block\n"));
        state.mode = TYPE;
        break top;
      }
      else {
        strm.msg = 'invalid literal/length code';
        state.mode = BAD;
        break top;
      }

      break; // need to emulate goto via "continue"
    }
  } while (_in < last && _out < end);

  /* return unused bytes (on entry, bits < 8, so in won't go too far back) */
  len = bits >> 3;
  _in -= len;
  bits -= len << 3;
  hold &= (1 << bits) - 1;

  /* update state and return */
  strm.next_in = _in;
  strm.next_out = _out;
  strm.avail_in = (_in < last ? 5 + (last - _in) : 5 - (_in - last));
  strm.avail_out = (_out < end ? 257 + (end - _out) : 257 - (_out - end));
  state.hold = hold;
  state.bits = bits;
  return;
};

},{}],41:[function(require,module,exports){
'use strict';


var utils = require('../utils/common');
var adler32 = require('./adler32');
var crc32   = require('./crc32');
var inflate_fast = require('./inffast');
var inflate_table = require('./inftrees');

var CODES = 0;
var LENS = 1;
var DISTS = 2;

/* Public constants ==========================================================*/
/* ===========================================================================*/


/* Allowed flush values; see deflate() and inflate() below for details */
//var Z_NO_FLUSH      = 0;
//var Z_PARTIAL_FLUSH = 1;
//var Z_SYNC_FLUSH    = 2;
//var Z_FULL_FLUSH    = 3;
var Z_FINISH        = 4;
var Z_BLOCK         = 5;
var Z_TREES         = 6;


/* Return codes for the compression/decompression functions. Negative values
 * are errors, positive values are used for special but normal events.
 */
var Z_OK            = 0;
var Z_STREAM_END    = 1;
var Z_NEED_DICT     = 2;
//var Z_ERRNO         = -1;
var Z_STREAM_ERROR  = -2;
var Z_DATA_ERROR    = -3;
var Z_MEM_ERROR     = -4;
var Z_BUF_ERROR     = -5;
//var Z_VERSION_ERROR = -6;

/* The deflate compression method */
var Z_DEFLATED  = 8;


/* STATES ====================================================================*/
/* ===========================================================================*/


var    HEAD = 1;       /* i: waiting for magic header */
var    FLAGS = 2;      /* i: waiting for method and flags (gzip) */
var    TIME = 3;       /* i: waiting for modification time (gzip) */
var    OS = 4;         /* i: waiting for extra flags and operating system (gzip) */
var    EXLEN = 5;      /* i: waiting for extra length (gzip) */
var    EXTRA = 6;      /* i: waiting for extra bytes (gzip) */
var    NAME = 7;       /* i: waiting for end of file name (gzip) */
var    COMMENT = 8;    /* i: waiting for end of comment (gzip) */
var    HCRC = 9;       /* i: waiting for header crc (gzip) */
var    DICTID = 10;    /* i: waiting for dictionary check value */
var    DICT = 11;      /* waiting for inflateSetDictionary() call */
var        TYPE = 12;      /* i: waiting for type bits, including last-flag bit */
var        TYPEDO = 13;    /* i: same, but skip check to exit inflate on new block */
var        STORED = 14;    /* i: waiting for stored size (length and complement) */
var        COPY_ = 15;     /* i/o: same as COPY below, but only first time in */
var        COPY = 16;      /* i/o: waiting for input or output to copy stored block */
var        TABLE = 17;     /* i: waiting for dynamic block table lengths */
var        LENLENS = 18;   /* i: waiting for code length code lengths */
var        CODELENS = 19;  /* i: waiting for length/lit and distance code lengths */
var            LEN_ = 20;      /* i: same as LEN below, but only first time in */
var            LEN = 21;       /* i: waiting for length/lit/eob code */
var            LENEXT = 22;    /* i: waiting for length extra bits */
var            DIST = 23;      /* i: waiting for distance code */
var            DISTEXT = 24;   /* i: waiting for distance extra bits */
var            MATCH = 25;     /* o: waiting for output space to copy string */
var            LIT = 26;       /* o: waiting for output space to write literal */
var    CHECK = 27;     /* i: waiting for 32-bit check value */
var    LENGTH = 28;    /* i: waiting for 32-bit length (gzip) */
var    DONE = 29;      /* finished check, done -- remain here until reset */
var    BAD = 30;       /* got a data error -- remain here until reset */
var    MEM = 31;       /* got an inflate() memory error -- remain here until reset */
var    SYNC = 32;      /* looking for synchronization bytes to restart inflate() */

/* ===========================================================================*/



var ENOUGH_LENS = 852;
var ENOUGH_DISTS = 592;
//var ENOUGH =  (ENOUGH_LENS+ENOUGH_DISTS);

var MAX_WBITS = 15;
/* 32K LZ77 window */
var DEF_WBITS = MAX_WBITS;


function ZSWAP32(q) {
  return  (((q >>> 24) & 0xff) +
          ((q >>> 8) & 0xff00) +
          ((q & 0xff00) << 8) +
          ((q & 0xff) << 24));
}


function InflateState() {
  this.mode = 0;             /* current inflate mode */
  this.last = false;          /* true if processing last block */
  this.wrap = 0;              /* bit 0 true for zlib, bit 1 true for gzip */
  this.havedict = false;      /* true if dictionary provided */
  this.flags = 0;             /* gzip header method and flags (0 if zlib) */
  this.dmax = 0;              /* zlib header max distance (INFLATE_STRICT) */
  this.check = 0;             /* protected copy of check value */
  this.total = 0;             /* protected copy of output count */
  // TODO: may be {}
  this.head = null;           /* where to save gzip header information */

  /* sliding window */
  this.wbits = 0;             /* log base 2 of requested window size */
  this.wsize = 0;             /* window size or zero if not using window */
  this.whave = 0;             /* valid bytes in the window */
  this.wnext = 0;             /* window write index */
  this.window = null;         /* allocated sliding window, if needed */

  /* bit accumulator */
  this.hold = 0;              /* input bit accumulator */
  this.bits = 0;              /* number of bits in "in" */

  /* for string and stored block copying */
  this.length = 0;            /* literal or length of data to copy */
  this.offset = 0;            /* distance back to copy string from */

  /* for table and code decoding */
  this.extra = 0;             /* extra bits needed */

  /* fixed and dynamic code tables */
  this.lencode = null;          /* starting table for length/literal codes */
  this.distcode = null;         /* starting table for distance codes */
  this.lenbits = 0;           /* index bits for lencode */
  this.distbits = 0;          /* index bits for distcode */

  /* dynamic table building */
  this.ncode = 0;             /* number of code length code lengths */
  this.nlen = 0;              /* number of length code lengths */
  this.ndist = 0;             /* number of distance code lengths */
  this.have = 0;              /* number of code lengths in lens[] */
  this.next = null;              /* next available space in codes[] */

  this.lens = new utils.Buf16(320); /* temporary storage for code lengths */
  this.work = new utils.Buf16(288); /* work area for code table building */

  /*
   because we don't have pointers in js, we use lencode and distcode directly
   as buffers so we don't need codes
  */
  //this.codes = new utils.Buf32(ENOUGH);       /* space for code tables */
  this.lendyn = null;              /* dynamic table for length/literal codes (JS specific) */
  this.distdyn = null;             /* dynamic table for distance codes (JS specific) */
  this.sane = 0;                   /* if false, allow invalid distance too far */
  this.back = 0;                   /* bits back of last unprocessed length/lit */
  this.was = 0;                    /* initial length of match */
}

function inflateResetKeep(strm) {
  var state;

  if (!strm || !strm.state) { return Z_STREAM_ERROR; }
  state = strm.state;
  strm.total_in = strm.total_out = state.total = 0;
  strm.msg = ''; /*Z_NULL*/
  if (state.wrap) {       /* to support ill-conceived Java test suite */
    strm.adler = state.wrap & 1;
  }
  state.mode = HEAD;
  state.last = 0;
  state.havedict = 0;
  state.dmax = 32768;
  state.head = null/*Z_NULL*/;
  state.hold = 0;
  state.bits = 0;
  //state.lencode = state.distcode = state.next = state.codes;
  state.lencode = state.lendyn = new utils.Buf32(ENOUGH_LENS);
  state.distcode = state.distdyn = new utils.Buf32(ENOUGH_DISTS);

  state.sane = 1;
  state.back = -1;
  //Tracev((stderr, "inflate: reset\n"));
  return Z_OK;
}

function inflateReset(strm) {
  var state;

  if (!strm || !strm.state) { return Z_STREAM_ERROR; }
  state = strm.state;
  state.wsize = 0;
  state.whave = 0;
  state.wnext = 0;
  return inflateResetKeep(strm);

}

function inflateReset2(strm, windowBits) {
  var wrap;
  var state;

  /* get the state */
  if (!strm || !strm.state) { return Z_STREAM_ERROR; }
  state = strm.state;

  /* extract wrap request from windowBits parameter */
  if (windowBits < 0) {
    wrap = 0;
    windowBits = -windowBits;
  }
  else {
    wrap = (windowBits >> 4) + 1;
    if (windowBits < 48) {
      windowBits &= 15;
    }
  }

  /* set number of window bits, free window if different */
  if (windowBits && (windowBits < 8 || windowBits > 15)) {
    return Z_STREAM_ERROR;
  }
  if (state.window !== null && state.wbits !== windowBits) {
    state.window = null;
  }

  /* update state and reset the rest of it */
  state.wrap = wrap;
  state.wbits = windowBits;
  return inflateReset(strm);
}

function inflateInit2(strm, windowBits) {
  var ret;
  var state;

  if (!strm) { return Z_STREAM_ERROR; }
  //strm.msg = Z_NULL;                 /* in case we return an error */

  state = new InflateState();

  //if (state === Z_NULL) return Z_MEM_ERROR;
  //Tracev((stderr, "inflate: allocated\n"));
  strm.state = state;
  state.window = null/*Z_NULL*/;
  ret = inflateReset2(strm, windowBits);
  if (ret !== Z_OK) {
    strm.state = null/*Z_NULL*/;
  }
  return ret;
}

function inflateInit(strm) {
  return inflateInit2(strm, DEF_WBITS);
}


/*
 Return state with length and distance decoding tables and index sizes set to
 fixed code decoding.  Normally this returns fixed tables from inffixed.h.
 If BUILDFIXED is defined, then instead this routine builds the tables the
 first time it's called, and returns those tables the first time and
 thereafter.  This reduces the size of the code by about 2K bytes, in
 exchange for a little execution time.  However, BUILDFIXED should not be
 used for threaded applications, since the rewriting of the tables and virgin
 may not be thread-safe.
 */
var virgin = true;

var lenfix, distfix; // We have no pointers in JS, so keep tables separate

function fixedtables(state) {
  /* build fixed huffman tables if first call (may not be thread safe) */
  if (virgin) {
    var sym;

    lenfix = new utils.Buf32(512);
    distfix = new utils.Buf32(32);

    /* literal/length table */
    sym = 0;
    while (sym < 144) { state.lens[sym++] = 8; }
    while (sym < 256) { state.lens[sym++] = 9; }
    while (sym < 280) { state.lens[sym++] = 7; }
    while (sym < 288) { state.lens[sym++] = 8; }

    inflate_table(LENS,  state.lens, 0, 288, lenfix,   0, state.work, {bits: 9});

    /* distance table */
    sym = 0;
    while (sym < 32) { state.lens[sym++] = 5; }

    inflate_table(DISTS, state.lens, 0, 32,   distfix, 0, state.work, {bits: 5});

    /* do this just once */
    virgin = false;
  }

  state.lencode = lenfix;
  state.lenbits = 9;
  state.distcode = distfix;
  state.distbits = 5;
}


/*
 Update the window with the last wsize (normally 32K) bytes written before
 returning.  If window does not exist yet, create it.  This is only called
 when a window is already in use, or when output has been written during this
 inflate call, but the end of the deflate stream has not been reached yet.
 It is also called to create a window for dictionary data when a dictionary
 is loaded.

 Providing output buffers larger than 32K to inflate() should provide a speed
 advantage, since only the last 32K of output is copied to the sliding window
 upon return from inflate(), and since all distances after the first 32K of
 output will fall in the output data, making match copies simpler and faster.
 The advantage may be dependent on the size of the processor's data caches.
 */
function updatewindow(strm, src, end, copy) {
  var dist;
  var state = strm.state;

  /* if it hasn't been done already, allocate space for the window */
  if (state.window === null) {
    state.wsize = 1 << state.wbits;
    state.wnext = 0;
    state.whave = 0;

    state.window = new utils.Buf8(state.wsize);
  }

  /* copy state->wsize or less output bytes into the circular window */
  if (copy >= state.wsize) {
    utils.arraySet(state.window,src, end - state.wsize, state.wsize, 0);
    state.wnext = 0;
    state.whave = state.wsize;
  }
  else {
    dist = state.wsize - state.wnext;
    if (dist > copy) {
      dist = copy;
    }
    //zmemcpy(state->window + state->wnext, end - copy, dist);
    utils.arraySet(state.window,src, end - copy, dist, state.wnext);
    copy -= dist;
    if (copy) {
      //zmemcpy(state->window, end - copy, copy);
      utils.arraySet(state.window,src, end - copy, copy, 0);
      state.wnext = copy;
      state.whave = state.wsize;
    }
    else {
      state.wnext += dist;
      if (state.wnext === state.wsize) { state.wnext = 0; }
      if (state.whave < state.wsize) { state.whave += dist; }
    }
  }
  return 0;
}

function inflate(strm, flush) {
  var state;
  var input, output;          // input/output buffers
  var next;                   /* next input INDEX */
  var put;                    /* next output INDEX */
  var have, left;             /* available input and output */
  var hold;                   /* bit buffer */
  var bits;                   /* bits in bit buffer */
  var _in, _out;              /* save starting available input and output */
  var copy;                   /* number of stored or match bytes to copy */
  var from;                   /* where to copy match bytes from */
  var from_source;
  var here = 0;               /* current decoding table entry */
  var here_bits, here_op, here_val; // paked "here" denormalized (JS specific)
  //var last;                   /* parent table entry */
  var last_bits, last_op, last_val; // paked "last" denormalized (JS specific)
  var len;                    /* length to copy for repeats, bits to drop */
  var ret;                    /* return code */
  var hbuf = new utils.Buf8(4);    /* buffer for gzip header crc calculation */
  var opts;

  var n; // temporary var for NEED_BITS

  var order = /* permutation of code lengths */
    [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];


  if (!strm || !strm.state || !strm.output ||
      (!strm.input && strm.avail_in !== 0)) {
    return Z_STREAM_ERROR;
  }

  state = strm.state;
  if (state.mode === TYPE) { state.mode = TYPEDO; }    /* skip check */


  //--- LOAD() ---
  put = strm.next_out;
  output = strm.output;
  left = strm.avail_out;
  next = strm.next_in;
  input = strm.input;
  have = strm.avail_in;
  hold = state.hold;
  bits = state.bits;
  //---

  _in = have;
  _out = left;
  ret = Z_OK;

  inf_leave: // goto emulation
  for (;;) {
    switch (state.mode) {
    case HEAD:
      if (state.wrap === 0) {
        state.mode = TYPEDO;
        break;
      }
      //=== NEEDBITS(16);
      while (bits < 16) {
        if (have === 0) { break inf_leave; }
        have--;
        hold += input[next++] << bits;
        bits += 8;
      }
      //===//
      if ((state.wrap & 2) && hold === 0x8b1f) {  /* gzip header */
        state.check = 0/*crc32(0L, Z_NULL, 0)*/;
        //=== CRC2(state.check, hold);
        hbuf[0] = hold & 0xff;
        hbuf[1] = (hold >>> 8) & 0xff;
        state.check = crc32(state.check, hbuf, 2, 0);
        //===//

        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
        state.mode = FLAGS;
        break;
      }
      state.flags = 0;           /* expect zlib header */
      if (state.head) {
        state.head.done = false;
      }
      if (!(state.wrap & 1) ||   /* check if zlib header allowed */
        (((hold & 0xff)/*BITS(8)*/ << 8) + (hold >> 8)) % 31) {
        strm.msg = 'incorrect header check';
        state.mode = BAD;
        break;
      }
      if ((hold & 0x0f)/*BITS(4)*/ !== Z_DEFLATED) {
        strm.msg = 'unknown compression method';
        state.mode = BAD;
        break;
      }
      //--- DROPBITS(4) ---//
      hold >>>= 4;
      bits -= 4;
      //---//
      len = (hold & 0x0f)/*BITS(4)*/ + 8;
      if (state.wbits === 0) {
        state.wbits = len;
      }
      else if (len > state.wbits) {
        strm.msg = 'invalid window size';
        state.mode = BAD;
        break;
      }
      state.dmax = 1 << len;
      //Tracev((stderr, "inflate:   zlib header ok\n"));
      strm.adler = state.check = 1/*adler32(0L, Z_NULL, 0)*/;
      state.mode = hold & 0x200 ? DICTID : TYPE;
      //=== INITBITS();
      hold = 0;
      bits = 0;
      //===//
      break;
    case FLAGS:
      //=== NEEDBITS(16); */
      while (bits < 16) {
        if (have === 0) { break inf_leave; }
        have--;
        hold += input[next++] << bits;
        bits += 8;
      }
      //===//
      state.flags = hold;
      if ((state.flags & 0xff) !== Z_DEFLATED) {
        strm.msg = 'unknown compression method';
        state.mode = BAD;
        break;
      }
      if (state.flags & 0xe000) {
        strm.msg = 'unknown header flags set';
        state.mode = BAD;
        break;
      }
      if (state.head) {
        state.head.text = ((hold >> 8) & 1);
      }
      if (state.flags & 0x0200) {
        //=== CRC2(state.check, hold);
        hbuf[0] = hold & 0xff;
        hbuf[1] = (hold >>> 8) & 0xff;
        state.check = crc32(state.check, hbuf, 2, 0);
        //===//
      }
      //=== INITBITS();
      hold = 0;
      bits = 0;
      //===//
      state.mode = TIME;
      /* falls through */
    case TIME:
      //=== NEEDBITS(32); */
      while (bits < 32) {
        if (have === 0) { break inf_leave; }
        have--;
        hold += input[next++] << bits;
        bits += 8;
      }
      //===//
      if (state.head) {
        state.head.time = hold;
      }
      if (state.flags & 0x0200) {
        //=== CRC4(state.check, hold)
        hbuf[0] = hold & 0xff;
        hbuf[1] = (hold >>> 8) & 0xff;
        hbuf[2] = (hold >>> 16) & 0xff;
        hbuf[3] = (hold >>> 24) & 0xff;
        state.check = crc32(state.check, hbuf, 4, 0);
        //===
      }
      //=== INITBITS();
      hold = 0;
      bits = 0;
      //===//
      state.mode = OS;
      /* falls through */
    case OS:
      //=== NEEDBITS(16); */
      while (bits < 16) {
        if (have === 0) { break inf_leave; }
        have--;
        hold += input[next++] << bits;
        bits += 8;
      }
      //===//
      if (state.head) {
        state.head.xflags = (hold & 0xff);
        state.head.os = (hold >> 8);
      }
      if (state.flags & 0x0200) {
        //=== CRC2(state.check, hold);
        hbuf[0] = hold & 0xff;
        hbuf[1] = (hold >>> 8) & 0xff;
        state.check = crc32(state.check, hbuf, 2, 0);
        //===//
      }
      //=== INITBITS();
      hold = 0;
      bits = 0;
      //===//
      state.mode = EXLEN;
      /* falls through */
    case EXLEN:
      if (state.flags & 0x0400) {
        //=== NEEDBITS(16); */
        while (bits < 16) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        state.length = hold;
        if (state.head) {
          state.head.extra_len = hold;
        }
        if (state.flags & 0x0200) {
          //=== CRC2(state.check, hold);
          hbuf[0] = hold & 0xff;
          hbuf[1] = (hold >>> 8) & 0xff;
          state.check = crc32(state.check, hbuf, 2, 0);
          //===//
        }
        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
      }
      else if (state.head) {
        state.head.extra = null/*Z_NULL*/;
      }
      state.mode = EXTRA;
      /* falls through */
    case EXTRA:
      if (state.flags & 0x0400) {
        copy = state.length;
        if (copy > have) { copy = have; }
        if (copy) {
          if (state.head) {
            len = state.head.extra_len - state.length;
            if (!state.head.extra) {
              // Use untyped array for more conveniend processing later
              state.head.extra = new Array(state.head.extra_len);
            }
            utils.arraySet(
              state.head.extra,
              input,
              next,
              // extra field is limited to 65536 bytes
              // - no need for additional size check
              copy,
              /*len + copy > state.head.extra_max - len ? state.head.extra_max : copy,*/
              len
            );
            //zmemcpy(state.head.extra + len, next,
            //        len + copy > state.head.extra_max ?
            //        state.head.extra_max - len : copy);
          }
          if (state.flags & 0x0200) {
            state.check = crc32(state.check, input, copy, next);
          }
          have -= copy;
          next += copy;
          state.length -= copy;
        }
        if (state.length) { break inf_leave; }
      }
      state.length = 0;
      state.mode = NAME;
      /* falls through */
    case NAME:
      if (state.flags & 0x0800) {
        if (have === 0) { break inf_leave; }
        copy = 0;
        do {
          // TODO: 2 or 1 bytes?
          len = input[next + copy++];
          /* use constant limit because in js we should not preallocate memory */
          if (state.head && len &&
              (state.length < 65536 /*state.head.name_max*/)) {
            state.head.name += String.fromCharCode(len);
          }
        } while (len && copy < have);

        if (state.flags & 0x0200) {
          state.check = crc32(state.check, input, copy, next);
        }
        have -= copy;
        next += copy;
        if (len) { break inf_leave; }
      }
      else if (state.head) {
        state.head.name = null;
      }
      state.length = 0;
      state.mode = COMMENT;
      /* falls through */
    case COMMENT:
      if (state.flags & 0x1000) {
        if (have === 0) { break inf_leave; }
        copy = 0;
        do {
          len = input[next + copy++];
          /* use constant limit because in js we should not preallocate memory */
          if (state.head && len &&
              (state.length < 65536 /*state.head.comm_max*/)) {
            state.head.comment += String.fromCharCode(len);
          }
        } while (len && copy < have);
        if (state.flags & 0x0200) {
          state.check = crc32(state.check, input, copy, next);
        }
        have -= copy;
        next += copy;
        if (len) { break inf_leave; }
      }
      else if (state.head) {
        state.head.comment = null;
      }
      state.mode = HCRC;
      /* falls through */
    case HCRC:
      if (state.flags & 0x0200) {
        //=== NEEDBITS(16); */
        while (bits < 16) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        if (hold !== (state.check & 0xffff)) {
          strm.msg = 'header crc mismatch';
          state.mode = BAD;
          break;
        }
        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
      }
      if (state.head) {
        state.head.hcrc = ((state.flags >> 9) & 1);
        state.head.done = true;
      }
      strm.adler = state.check = 0 /*crc32(0L, Z_NULL, 0)*/;
      state.mode = TYPE;
      break;
    case DICTID:
      //=== NEEDBITS(32); */
      while (bits < 32) {
        if (have === 0) { break inf_leave; }
        have--;
        hold += input[next++] << bits;
        bits += 8;
      }
      //===//
      strm.adler = state.check = ZSWAP32(hold);
      //=== INITBITS();
      hold = 0;
      bits = 0;
      //===//
      state.mode = DICT;
      /* falls through */
    case DICT:
      if (state.havedict === 0) {
        //--- RESTORE() ---
        strm.next_out = put;
        strm.avail_out = left;
        strm.next_in = next;
        strm.avail_in = have;
        state.hold = hold;
        state.bits = bits;
        //---
        return Z_NEED_DICT;
      }
      strm.adler = state.check = 1/*adler32(0L, Z_NULL, 0)*/;
      state.mode = TYPE;
      /* falls through */
    case TYPE:
      if (flush === Z_BLOCK || flush === Z_TREES) { break inf_leave; }
      /* falls through */
    case TYPEDO:
      if (state.last) {
        //--- BYTEBITS() ---//
        hold >>>= bits & 7;
        bits -= bits & 7;
        //---//
        state.mode = CHECK;
        break;
      }
      //=== NEEDBITS(3); */
      while (bits < 3) {
        if (have === 0) { break inf_leave; }
        have--;
        hold += input[next++] << bits;
        bits += 8;
      }
      //===//
      state.last = (hold & 0x01)/*BITS(1)*/;
      //--- DROPBITS(1) ---//
      hold >>>= 1;
      bits -= 1;
      //---//

      switch ((hold & 0x03)/*BITS(2)*/) {
      case 0:                             /* stored block */
        //Tracev((stderr, "inflate:     stored block%s\n",
        //        state.last ? " (last)" : ""));
        state.mode = STORED;
        break;
      case 1:                             /* fixed block */
        fixedtables(state);
        //Tracev((stderr, "inflate:     fixed codes block%s\n",
        //        state.last ? " (last)" : ""));
        state.mode = LEN_;             /* decode codes */
        if (flush === Z_TREES) {
          //--- DROPBITS(2) ---//
          hold >>>= 2;
          bits -= 2;
          //---//
          break inf_leave;
        }
        break;
      case 2:                             /* dynamic block */
        //Tracev((stderr, "inflate:     dynamic codes block%s\n",
        //        state.last ? " (last)" : ""));
        state.mode = TABLE;
        break;
      case 3:
        strm.msg = 'invalid block type';
        state.mode = BAD;
      }
      //--- DROPBITS(2) ---//
      hold >>>= 2;
      bits -= 2;
      //---//
      break;
    case STORED:
      //--- BYTEBITS() ---// /* go to byte boundary */
      hold >>>= bits & 7;
      bits -= bits & 7;
      //---//
      //=== NEEDBITS(32); */
      while (bits < 32) {
        if (have === 0) { break inf_leave; }
        have--;
        hold += input[next++] << bits;
        bits += 8;
      }
      //===//
      if ((hold & 0xffff) !== ((hold >>> 16) ^ 0xffff)) {
        strm.msg = 'invalid stored block lengths';
        state.mode = BAD;
        break;
      }
      state.length = hold & 0xffff;
      //Tracev((stderr, "inflate:       stored length %u\n",
      //        state.length));
      //=== INITBITS();
      hold = 0;
      bits = 0;
      //===//
      state.mode = COPY_;
      if (flush === Z_TREES) { break inf_leave; }
      /* falls through */
    case COPY_:
      state.mode = COPY;
      /* falls through */
    case COPY:
      copy = state.length;
      if (copy) {
        if (copy > have) { copy = have; }
        if (copy > left) { copy = left; }
        if (copy === 0) { break inf_leave; }
        //--- zmemcpy(put, next, copy); ---
        utils.arraySet(output, input, next, copy, put);
        //---//
        have -= copy;
        next += copy;
        left -= copy;
        put += copy;
        state.length -= copy;
        break;
      }
      //Tracev((stderr, "inflate:       stored end\n"));
      state.mode = TYPE;
      break;
    case TABLE:
      //=== NEEDBITS(14); */
      while (bits < 14) {
        if (have === 0) { break inf_leave; }
        have--;
        hold += input[next++] << bits;
        bits += 8;
      }
      //===//
      state.nlen = (hold & 0x1f)/*BITS(5)*/ + 257;
      //--- DROPBITS(5) ---//
      hold >>>= 5;
      bits -= 5;
      //---//
      state.ndist = (hold & 0x1f)/*BITS(5)*/ + 1;
      //--- DROPBITS(5) ---//
      hold >>>= 5;
      bits -= 5;
      //---//
      state.ncode = (hold & 0x0f)/*BITS(4)*/ + 4;
      //--- DROPBITS(4) ---//
      hold >>>= 4;
      bits -= 4;
      //---//
//#ifndef PKZIP_BUG_WORKAROUND
      if (state.nlen > 286 || state.ndist > 30) {
        strm.msg = 'too many length or distance symbols';
        state.mode = BAD;
        break;
      }
//#endif
      //Tracev((stderr, "inflate:       table sizes ok\n"));
      state.have = 0;
      state.mode = LENLENS;
      /* falls through */
    case LENLENS:
      while (state.have < state.ncode) {
        //=== NEEDBITS(3);
        while (bits < 3) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        state.lens[order[state.have++]] = (hold & 0x07);//BITS(3);
        //--- DROPBITS(3) ---//
        hold >>>= 3;
        bits -= 3;
        //---//
      }
      while (state.have < 19) {
        state.lens[order[state.have++]] = 0;
      }
      // We have separate tables & no pointers. 2 commented lines below not needed.
      //state.next = state.codes;
      //state.lencode = state.next;
      // Switch to use dynamic table
      state.lencode = state.lendyn;
      state.lenbits = 7;

      opts = {bits: state.lenbits};
      ret = inflate_table(CODES, state.lens, 0, 19, state.lencode, 0, state.work, opts);
      state.lenbits = opts.bits;

      if (ret) {
        strm.msg = 'invalid code lengths set';
        state.mode = BAD;
        break;
      }
      //Tracev((stderr, "inflate:       code lengths ok\n"));
      state.have = 0;
      state.mode = CODELENS;
      /* falls through */
    case CODELENS:
      while (state.have < state.nlen + state.ndist) {
        for (;;) {
          here = state.lencode[hold & ((1 << state.lenbits) - 1)];/*BITS(state.lenbits)*/
          here_bits = here >>> 24;
          here_op = (here >>> 16) & 0xff;
          here_val = here & 0xffff;

          if ((here_bits) <= bits) { break; }
          //--- PULLBYTE() ---//
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
          //---//
        }
        if (here_val < 16) {
          //--- DROPBITS(here.bits) ---//
          hold >>>= here_bits;
          bits -= here_bits;
          //---//
          state.lens[state.have++] = here_val;
        }
        else {
          if (here_val === 16) {
            //=== NEEDBITS(here.bits + 2);
            n = here_bits + 2;
            while (bits < n) {
              if (have === 0) { break inf_leave; }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            //===//
            //--- DROPBITS(here.bits) ---//
            hold >>>= here_bits;
            bits -= here_bits;
            //---//
            if (state.have === 0) {
              strm.msg = 'invalid bit length repeat';
              state.mode = BAD;
              break;
            }
            len = state.lens[state.have - 1];
            copy = 3 + (hold & 0x03);//BITS(2);
            //--- DROPBITS(2) ---//
            hold >>>= 2;
            bits -= 2;
            //---//
          }
          else if (here_val === 17) {
            //=== NEEDBITS(here.bits + 3);
            n = here_bits + 3;
            while (bits < n) {
              if (have === 0) { break inf_leave; }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            //===//
            //--- DROPBITS(here.bits) ---//
            hold >>>= here_bits;
            bits -= here_bits;
            //---//
            len = 0;
            copy = 3 + (hold & 0x07);//BITS(3);
            //--- DROPBITS(3) ---//
            hold >>>= 3;
            bits -= 3;
            //---//
          }
          else {
            //=== NEEDBITS(here.bits + 7);
            n = here_bits + 7;
            while (bits < n) {
              if (have === 0) { break inf_leave; }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            //===//
            //--- DROPBITS(here.bits) ---//
            hold >>>= here_bits;
            bits -= here_bits;
            //---//
            len = 0;
            copy = 11 + (hold & 0x7f);//BITS(7);
            //--- DROPBITS(7) ---//
            hold >>>= 7;
            bits -= 7;
            //---//
          }
          if (state.have + copy > state.nlen + state.ndist) {
            strm.msg = 'invalid bit length repeat';
            state.mode = BAD;
            break;
          }
          while (copy--) {
            state.lens[state.have++] = len;
          }
        }
      }

      /* handle error breaks in while */
      if (state.mode === BAD) { break; }

      /* check for end-of-block code (better have one) */
      if (state.lens[256] === 0) {
        strm.msg = 'invalid code -- missing end-of-block';
        state.mode = BAD;
        break;
      }

      /* build code tables -- note: do not change the lenbits or distbits
         values here (9 and 6) without reading the comments in inftrees.h
         concerning the ENOUGH constants, which depend on those values */
      state.lenbits = 9;

      opts = {bits: state.lenbits};
      ret = inflate_table(LENS, state.lens, 0, state.nlen, state.lencode, 0, state.work, opts);
      // We have separate tables & no pointers. 2 commented lines below not needed.
      // state.next_index = opts.table_index;
      state.lenbits = opts.bits;
      // state.lencode = state.next;

      if (ret) {
        strm.msg = 'invalid literal/lengths set';
        state.mode = BAD;
        break;
      }

      state.distbits = 6;
      //state.distcode.copy(state.codes);
      // Switch to use dynamic table
      state.distcode = state.distdyn;
      opts = {bits: state.distbits};
      ret = inflate_table(DISTS, state.lens, state.nlen, state.ndist, state.distcode, 0, state.work, opts);
      // We have separate tables & no pointers. 2 commented lines below not needed.
      // state.next_index = opts.table_index;
      state.distbits = opts.bits;
      // state.distcode = state.next;

      if (ret) {
        strm.msg = 'invalid distances set';
        state.mode = BAD;
        break;
      }
      //Tracev((stderr, 'inflate:       codes ok\n'));
      state.mode = LEN_;
      if (flush === Z_TREES) { break inf_leave; }
      /* falls through */
    case LEN_:
      state.mode = LEN;
      /* falls through */
    case LEN:
      if (have >= 6 && left >= 258) {
        //--- RESTORE() ---
        strm.next_out = put;
        strm.avail_out = left;
        strm.next_in = next;
        strm.avail_in = have;
        state.hold = hold;
        state.bits = bits;
        //---
        inflate_fast(strm, _out);
        //--- LOAD() ---
        put = strm.next_out;
        output = strm.output;
        left = strm.avail_out;
        next = strm.next_in;
        input = strm.input;
        have = strm.avail_in;
        hold = state.hold;
        bits = state.bits;
        //---

        if (state.mode === TYPE) {
          state.back = -1;
        }
        break;
      }
      state.back = 0;
      for (;;) {
        here = state.lencode[hold & ((1 << state.lenbits) -1)];  /*BITS(state.lenbits)*/
        here_bits = here >>> 24;
        here_op = (here >>> 16) & 0xff;
        here_val = here & 0xffff;

        if (here_bits <= bits) { break; }
        //--- PULLBYTE() ---//
        if (have === 0) { break inf_leave; }
        have--;
        hold += input[next++] << bits;
        bits += 8;
        //---//
      }
      if (here_op && (here_op & 0xf0) === 0) {
        last_bits = here_bits;
        last_op = here_op;
        last_val = here_val;
        for (;;) {
          here = state.lencode[last_val +
                  ((hold & ((1 << (last_bits + last_op)) -1))/*BITS(last.bits + last.op)*/ >> last_bits)];
          here_bits = here >>> 24;
          here_op = (here >>> 16) & 0xff;
          here_val = here & 0xffff;

          if ((last_bits + here_bits) <= bits) { break; }
          //--- PULLBYTE() ---//
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
          //---//
        }
        //--- DROPBITS(last.bits) ---//
        hold >>>= last_bits;
        bits -= last_bits;
        //---//
        state.back += last_bits;
      }
      //--- DROPBITS(here.bits) ---//
      hold >>>= here_bits;
      bits -= here_bits;
      //---//
      state.back += here_bits;
      state.length = here_val;
      if (here_op === 0) {
        //Tracevv((stderr, here.val >= 0x20 && here.val < 0x7f ?
        //        "inflate:         literal '%c'\n" :
        //        "inflate:         literal 0x%02x\n", here.val));
        state.mode = LIT;
        break;
      }
      if (here_op & 32) {
        //Tracevv((stderr, "inflate:         end of block\n"));
        state.back = -1;
        state.mode = TYPE;
        break;
      }
      if (here_op & 64) {
        strm.msg = 'invalid literal/length code';
        state.mode = BAD;
        break;
      }
      state.extra = here_op & 15;
      state.mode = LENEXT;
      /* falls through */
    case LENEXT:
      if (state.extra) {
        //=== NEEDBITS(state.extra);
        n = state.extra;
        while (bits < n) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        state.length += hold & ((1 << state.extra) -1)/*BITS(state.extra)*/;
        //--- DROPBITS(state.extra) ---//
        hold >>>= state.extra;
        bits -= state.extra;
        //---//
        state.back += state.extra;
      }
      //Tracevv((stderr, "inflate:         length %u\n", state.length));
      state.was = state.length;
      state.mode = DIST;
      /* falls through */
    case DIST:
      for (;;) {
        here = state.distcode[hold & ((1 << state.distbits) -1)];/*BITS(state.distbits)*/
        here_bits = here >>> 24;
        here_op = (here >>> 16) & 0xff;
        here_val = here & 0xffff;

        if ((here_bits) <= bits) { break; }
        //--- PULLBYTE() ---//
        if (have === 0) { break inf_leave; }
        have--;
        hold += input[next++] << bits;
        bits += 8;
        //---//
      }
      if ((here_op & 0xf0) === 0) {
        last_bits = here_bits;
        last_op = here_op;
        last_val = here_val;
        for (;;) {
          here = state.distcode[last_val +
                  ((hold & ((1 << (last_bits + last_op)) -1))/*BITS(last.bits + last.op)*/ >> last_bits)];
          here_bits = here >>> 24;
          here_op = (here >>> 16) & 0xff;
          here_val = here & 0xffff;

          if ((last_bits + here_bits) <= bits) { break; }
          //--- PULLBYTE() ---//
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
          //---//
        }
        //--- DROPBITS(last.bits) ---//
        hold >>>= last_bits;
        bits -= last_bits;
        //---//
        state.back += last_bits;
      }
      //--- DROPBITS(here.bits) ---//
      hold >>>= here_bits;
      bits -= here_bits;
      //---//
      state.back += here_bits;
      if (here_op & 64) {
        strm.msg = 'invalid distance code';
        state.mode = BAD;
        break;
      }
      state.offset = here_val;
      state.extra = (here_op) & 15;
      state.mode = DISTEXT;
      /* falls through */
    case DISTEXT:
      if (state.extra) {
        //=== NEEDBITS(state.extra);
        n = state.extra;
        while (bits < n) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        state.offset += hold & ((1 << state.extra) -1)/*BITS(state.extra)*/;
        //--- DROPBITS(state.extra) ---//
        hold >>>= state.extra;
        bits -= state.extra;
        //---//
        state.back += state.extra;
      }
//#ifdef INFLATE_STRICT
      if (state.offset > state.dmax) {
        strm.msg = 'invalid distance too far back';
        state.mode = BAD;
        break;
      }
//#endif
      //Tracevv((stderr, "inflate:         distance %u\n", state.offset));
      state.mode = MATCH;
      /* falls through */
    case MATCH:
      if (left === 0) { break inf_leave; }
      copy = _out - left;
      if (state.offset > copy) {         /* copy from window */
        copy = state.offset - copy;
        if (copy > state.whave) {
          if (state.sane) {
            strm.msg = 'invalid distance too far back';
            state.mode = BAD;
            break;
          }
// (!) This block is disabled in zlib defailts,
// don't enable it for binary compatibility
//#ifdef INFLATE_ALLOW_INVALID_DISTANCE_TOOFAR_ARRR
//          Trace((stderr, "inflate.c too far\n"));
//          copy -= state.whave;
//          if (copy > state.length) { copy = state.length; }
//          if (copy > left) { copy = left; }
//          left -= copy;
//          state.length -= copy;
//          do {
//            output[put++] = 0;
//          } while (--copy);
//          if (state.length === 0) { state.mode = LEN; }
//          break;
//#endif
        }
        if (copy > state.wnext) {
          copy -= state.wnext;
          from = state.wsize - copy;
        }
        else {
          from = state.wnext - copy;
        }
        if (copy > state.length) { copy = state.length; }
        from_source = state.window;
      }
      else {                              /* copy from output */
        from_source = output;
        from = put - state.offset;
        copy = state.length;
      }
      if (copy > left) { copy = left; }
      left -= copy;
      state.length -= copy;
      do {
        output[put++] = from_source[from++];
      } while (--copy);
      if (state.length === 0) { state.mode = LEN; }
      break;
    case LIT:
      if (left === 0) { break inf_leave; }
      output[put++] = state.length;
      left--;
      state.mode = LEN;
      break;
    case CHECK:
      if (state.wrap) {
        //=== NEEDBITS(32);
        while (bits < 32) {
          if (have === 0) { break inf_leave; }
          have--;
          // Use '|' insdead of '+' to make sure that result is signed
          hold |= input[next++] << bits;
          bits += 8;
        }
        //===//
        _out -= left;
        strm.total_out += _out;
        state.total += _out;
        if (_out) {
          strm.adler = state.check =
              /*UPDATE(state.check, put - _out, _out);*/
              (state.flags ? crc32(state.check, output, _out, put - _out) : adler32(state.check, output, _out, put - _out));

        }
        _out = left;
        // NB: crc32 stored as signed 32-bit int, ZSWAP32 returns signed too
        if ((state.flags ? hold : ZSWAP32(hold)) !== state.check) {
          strm.msg = 'incorrect data check';
          state.mode = BAD;
          break;
        }
        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
        //Tracev((stderr, "inflate:   check matches trailer\n"));
      }
      state.mode = LENGTH;
      /* falls through */
    case LENGTH:
      if (state.wrap && state.flags) {
        //=== NEEDBITS(32);
        while (bits < 32) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        if (hold !== (state.total & 0xffffffff)) {
          strm.msg = 'incorrect length check';
          state.mode = BAD;
          break;
        }
        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
        //Tracev((stderr, "inflate:   length matches trailer\n"));
      }
      state.mode = DONE;
      /* falls through */
    case DONE:
      ret = Z_STREAM_END;
      break inf_leave;
    case BAD:
      ret = Z_DATA_ERROR;
      break inf_leave;
    case MEM:
      return Z_MEM_ERROR;
    case SYNC:
      /* falls through */
    default:
      return Z_STREAM_ERROR;
    }
  }

  // inf_leave <- here is real place for "goto inf_leave", emulated via "break inf_leave"

  /*
     Return from inflate(), updating the total counts and the check value.
     If there was no progress during the inflate() call, return a buffer
     error.  Call updatewindow() to create and/or update the window state.
     Note: a memory error from inflate() is non-recoverable.
   */

  //--- RESTORE() ---
  strm.next_out = put;
  strm.avail_out = left;
  strm.next_in = next;
  strm.avail_in = have;
  state.hold = hold;
  state.bits = bits;
  //---

  if (state.wsize || (_out !== strm.avail_out && state.mode < BAD &&
                      (state.mode < CHECK || flush !== Z_FINISH))) {
    if (updatewindow(strm, strm.output, strm.next_out, _out - strm.avail_out)) {
      state.mode = MEM;
      return Z_MEM_ERROR;
    }
  }
  _in -= strm.avail_in;
  _out -= strm.avail_out;
  strm.total_in += _in;
  strm.total_out += _out;
  state.total += _out;
  if (state.wrap && _out) {
    strm.adler = state.check = /*UPDATE(state.check, strm.next_out - _out, _out);*/
      (state.flags ? crc32(state.check, output, _out, strm.next_out - _out) : adler32(state.check, output, _out, strm.next_out - _out));
  }
  strm.data_type = state.bits + (state.last ? 64 : 0) +
                    (state.mode === TYPE ? 128 : 0) +
                    (state.mode === LEN_ || state.mode === COPY_ ? 256 : 0);
  if (((_in === 0 && _out === 0) || flush === Z_FINISH) && ret === Z_OK) {
    ret = Z_BUF_ERROR;
  }
  return ret;
}

function inflateEnd(strm) {

  if (!strm || !strm.state /*|| strm->zfree == (free_func)0*/) {
    return Z_STREAM_ERROR;
  }

  var state = strm.state;
  if (state.window) {
    state.window = null;
  }
  strm.state = null;
  return Z_OK;
}

function inflateGetHeader(strm, head) {
  var state;

  /* check state */
  if (!strm || !strm.state) { return Z_STREAM_ERROR; }
  state = strm.state;
  if ((state.wrap & 2) === 0) { return Z_STREAM_ERROR; }

  /* save header structure */
  state.head = head;
  head.done = false;
  return Z_OK;
}


exports.inflateReset = inflateReset;
exports.inflateReset2 = inflateReset2;
exports.inflateResetKeep = inflateResetKeep;
exports.inflateInit = inflateInit;
exports.inflateInit2 = inflateInit2;
exports.inflate = inflate;
exports.inflateEnd = inflateEnd;
exports.inflateGetHeader = inflateGetHeader;
exports.inflateInfo = 'pako inflate (from Nodeca project)';

/* Not implemented
exports.inflateCopy = inflateCopy;
exports.inflateGetDictionary = inflateGetDictionary;
exports.inflateMark = inflateMark;
exports.inflatePrime = inflatePrime;
exports.inflateSetDictionary = inflateSetDictionary;
exports.inflateSync = inflateSync;
exports.inflateSyncPoint = inflateSyncPoint;
exports.inflateUndermine = inflateUndermine;
*/

},{"../utils/common":33,"./adler32":35,"./crc32":37,"./inffast":40,"./inftrees":42}],42:[function(require,module,exports){
'use strict';


var utils = require('../utils/common');

var MAXBITS = 15;
var ENOUGH_LENS = 852;
var ENOUGH_DISTS = 592;
//var ENOUGH = (ENOUGH_LENS+ENOUGH_DISTS);

var CODES = 0;
var LENS = 1;
var DISTS = 2;

var lbase = [ /* Length codes 257..285 base */
  3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31,
  35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0
];

var lext = [ /* Length codes 257..285 extra */
  16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18,
  19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78
];

var dbase = [ /* Distance codes 0..29 base */
  1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193,
  257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145,
  8193, 12289, 16385, 24577, 0, 0
];

var dext = [ /* Distance codes 0..29 extra */
  16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22,
  23, 23, 24, 24, 25, 25, 26, 26, 27, 27,
  28, 28, 29, 29, 64, 64
];

module.exports = function inflate_table(type, lens, lens_index, codes, table, table_index, work, opts)
{
  var bits = opts.bits;
      //here = opts.here; /* table entry for duplication */

  var len = 0;               /* a code's length in bits */
  var sym = 0;               /* index of code symbols */
  var min = 0, max = 0;          /* minimum and maximum code lengths */
  var root = 0;              /* number of index bits for root table */
  var curr = 0;              /* number of index bits for current table */
  var drop = 0;              /* code bits to drop for sub-table */
  var left = 0;                   /* number of prefix codes available */
  var used = 0;              /* code entries in table used */
  var huff = 0;              /* Huffman code */
  var incr;              /* for incrementing code, index */
  var fill;              /* index for replicating entries */
  var low;               /* low bits for current root entry */
  var mask;              /* mask for low root bits */
  var next;             /* next available space in table */
  var base = null;     /* base value table to use */
  var base_index = 0;
//  var shoextra;    /* extra bits table to use */
  var end;                    /* use base and extra for symbol > end */
  var count = new utils.Buf16(MAXBITS+1); //[MAXBITS+1];    /* number of codes of each length */
  var offs = new utils.Buf16(MAXBITS+1); //[MAXBITS+1];     /* offsets in table for each length */
  var extra = null;
  var extra_index = 0;

  var here_bits, here_op, here_val;

  /*
   Process a set of code lengths to create a canonical Huffman code.  The
   code lengths are lens[0..codes-1].  Each length corresponds to the
   symbols 0..codes-1.  The Huffman code is generated by first sorting the
   symbols by length from short to long, and retaining the symbol order
   for codes with equal lengths.  Then the code starts with all zero bits
   for the first code of the shortest length, and the codes are integer
   increments for the same length, and zeros are appended as the length
   increases.  For the deflate format, these bits are stored backwards
   from their more natural integer increment ordering, and so when the
   decoding tables are built in the large loop below, the integer codes
   are incremented backwards.

   This routine assumes, but does not check, that all of the entries in
   lens[] are in the range 0..MAXBITS.  The caller must assure this.
   1..MAXBITS is interpreted as that code length.  zero means that that
   symbol does not occur in this code.

   The codes are sorted by computing a count of codes for each length,
   creating from that a table of starting indices for each length in the
   sorted table, and then entering the symbols in order in the sorted
   table.  The sorted table is work[], with that space being provided by
   the caller.

   The length counts are used for other purposes as well, i.e. finding
   the minimum and maximum length codes, determining if there are any
   codes at all, checking for a valid set of lengths, and looking ahead
   at length counts to determine sub-table sizes when building the
   decoding tables.
   */

  /* accumulate lengths for codes (assumes lens[] all in 0..MAXBITS) */
  for (len = 0; len <= MAXBITS; len++) {
    count[len] = 0;
  }
  for (sym = 0; sym < codes; sym++) {
    count[lens[lens_index + sym]]++;
  }

  /* bound code lengths, force root to be within code lengths */
  root = bits;
  for (max = MAXBITS; max >= 1; max--) {
    if (count[max] !== 0) { break; }
  }
  if (root > max) {
    root = max;
  }
  if (max === 0) {                     /* no symbols to code at all */
    //table.op[opts.table_index] = 64;  //here.op = (var char)64;    /* invalid code marker */
    //table.bits[opts.table_index] = 1;   //here.bits = (var char)1;
    //table.val[opts.table_index++] = 0;   //here.val = (var short)0;
    table[table_index++] = (1 << 24) | (64 << 16) | 0;


    //table.op[opts.table_index] = 64;
    //table.bits[opts.table_index] = 1;
    //table.val[opts.table_index++] = 0;
    table[table_index++] = (1 << 24) | (64 << 16) | 0;

    opts.bits = 1;
    return 0;     /* no symbols, but wait for decoding to report error */
  }
  for (min = 1; min < max; min++) {
    if (count[min] !== 0) { break; }
  }
  if (root < min) {
    root = min;
  }

  /* check for an over-subscribed or incomplete set of lengths */
  left = 1;
  for (len = 1; len <= MAXBITS; len++) {
    left <<= 1;
    left -= count[len];
    if (left < 0) {
      return -1;
    }        /* over-subscribed */
  }
  if (left > 0 && (type === CODES || max !== 1)) {
    return -1;                      /* incomplete set */
  }

  /* generate offsets into symbol table for each length for sorting */
  offs[1] = 0;
  for (len = 1; len < MAXBITS; len++) {
    offs[len + 1] = offs[len] + count[len];
  }

  /* sort symbols by length, by symbol order within each length */
  for (sym = 0; sym < codes; sym++) {
    if (lens[lens_index + sym] !== 0) {
      work[offs[lens[lens_index + sym]]++] = sym;
    }
  }

  /*
   Create and fill in decoding tables.  In this loop, the table being
   filled is at next and has curr index bits.  The code being used is huff
   with length len.  That code is converted to an index by dropping drop
   bits off of the bottom.  For codes where len is less than drop + curr,
   those top drop + curr - len bits are incremented through all values to
   fill the table with replicated entries.

   root is the number of index bits for the root table.  When len exceeds
   root, sub-tables are created pointed to by the root entry with an index
   of the low root bits of huff.  This is saved in low to check for when a
   new sub-table should be started.  drop is zero when the root table is
   being filled, and drop is root when sub-tables are being filled.

   When a new sub-table is needed, it is necessary to look ahead in the
   code lengths to determine what size sub-table is needed.  The length
   counts are used for this, and so count[] is decremented as codes are
   entered in the tables.

   used keeps track of how many table entries have been allocated from the
   provided *table space.  It is checked for LENS and DIST tables against
   the constants ENOUGH_LENS and ENOUGH_DISTS to guard against changes in
   the initial root table size constants.  See the comments in inftrees.h
   for more information.

   sym increments through all symbols, and the loop terminates when
   all codes of length max, i.e. all codes, have been processed.  This
   routine permits incomplete codes, so another loop after this one fills
   in the rest of the decoding tables with invalid code markers.
   */

  /* set up for code type */
  // poor man optimization - use if-else instead of switch,
  // to avoid deopts in old v8
  if (type === CODES) {
    base = extra = work;    /* dummy value--not used */
    end = 19;

  } else if (type === LENS) {
    base = lbase;
    base_index -= 257;
    extra = lext;
    extra_index -= 257;
    end = 256;

  } else {                    /* DISTS */
    base = dbase;
    extra = dext;
    end = -1;
  }

  /* initialize opts for loop */
  huff = 0;                   /* starting code */
  sym = 0;                    /* starting code symbol */
  len = min;                  /* starting code length */
  next = table_index;              /* current table to fill in */
  curr = root;                /* current table index bits */
  drop = 0;                   /* current bits to drop from code for index */
  low = -1;                   /* trigger new sub-table when len > root */
  used = 1 << root;          /* use root table entries */
  mask = used - 1;            /* mask for comparing low */

  /* check available table space */
  if ((type === LENS && used > ENOUGH_LENS) ||
    (type === DISTS && used > ENOUGH_DISTS)) {
    return 1;
  }

  var i=0;
  /* process all codes and make table entries */
  for (;;) {
    i++;
    /* create table entry */
    here_bits = len - drop;
    if (work[sym] < end) {
      here_op = 0;
      here_val = work[sym];
    }
    else if (work[sym] > end) {
      here_op = extra[extra_index + work[sym]];
      here_val = base[base_index + work[sym]];
    }
    else {
      here_op = 32 + 64;         /* end of block */
      here_val = 0;
    }

    /* replicate for those indices with low len bits equal to huff */
    incr = 1 << (len - drop);
    fill = 1 << curr;
    min = fill;                 /* save offset to next table */
    do {
      fill -= incr;
      table[next + (huff >> drop) + fill] = (here_bits << 24) | (here_op << 16) | here_val |0;
    } while (fill !== 0);

    /* backwards increment the len-bit code huff */
    incr = 1 << (len - 1);
    while (huff & incr) {
      incr >>= 1;
    }
    if (incr !== 0) {
      huff &= incr - 1;
      huff += incr;
    } else {
      huff = 0;
    }

    /* go to next symbol, update count, len */
    sym++;
    if (--count[len] === 0) {
      if (len === max) { break; }
      len = lens[lens_index + work[sym]];
    }

    /* create new sub-table if needed */
    if (len > root && (huff & mask) !== low) {
      /* if first time, transition to sub-tables */
      if (drop === 0) {
        drop = root;
      }

      /* increment past last table */
      next += min;            /* here min is 1 << curr */

      /* determine length of next table */
      curr = len - drop;
      left = 1 << curr;
      while (curr + drop < max) {
        left -= count[curr + drop];
        if (left <= 0) { break; }
        curr++;
        left <<= 1;
      }

      /* check for enough space */
      used += 1 << curr;
      if ((type === LENS && used > ENOUGH_LENS) ||
        (type === DISTS && used > ENOUGH_DISTS)) {
        return 1;
      }

      /* point entry in root table to sub-table */
      low = huff & mask;
      /*table.op[low] = curr;
      table.bits[low] = root;
      table.val[low] = next - opts.table_index;*/
      table[low] = (root << 24) | (curr << 16) | (next - table_index) |0;
    }
  }

  /* fill in remaining table entry if code is incomplete (guaranteed to have
   at most one remaining entry, since if the code is incomplete, the
   maximum code length that was allowed to get this far is one bit) */
  if (huff !== 0) {
    //table.op[next + huff] = 64;            /* invalid code marker */
    //table.bits[next + huff] = len - drop;
    //table.val[next + huff] = 0;
    table[next + huff] = ((len - drop) << 24) | (64 << 16) |0;
  }

  /* set return parameters */
  //opts.table_index += used;
  opts.bits = root;
  return 0;
};

},{"../utils/common":33}],43:[function(require,module,exports){
'use strict';

module.exports = {
  '2':    'need dictionary',     /* Z_NEED_DICT       2  */
  '1':    'stream end',          /* Z_STREAM_END      1  */
  '0':    '',                    /* Z_OK              0  */
  '-1':   'file error',          /* Z_ERRNO         (-1) */
  '-2':   'stream error',        /* Z_STREAM_ERROR  (-2) */
  '-3':   'data error',          /* Z_DATA_ERROR    (-3) */
  '-4':   'insufficient memory', /* Z_MEM_ERROR     (-4) */
  '-5':   'buffer error',        /* Z_BUF_ERROR     (-5) */
  '-6':   'incompatible version' /* Z_VERSION_ERROR (-6) */
};

},{}],44:[function(require,module,exports){
'use strict';


var utils = require('../utils/common');

/* Public constants ==========================================================*/
/* ===========================================================================*/


//var Z_FILTERED          = 1;
//var Z_HUFFMAN_ONLY      = 2;
//var Z_RLE               = 3;
var Z_FIXED               = 4;
//var Z_DEFAULT_STRATEGY  = 0;

/* Possible values of the data_type field (though see inflate()) */
var Z_BINARY              = 0;
var Z_TEXT                = 1;
//var Z_ASCII             = 1; // = Z_TEXT
var Z_UNKNOWN             = 2;

/*============================================================================*/


function zero(buf) { var len = buf.length; while (--len >= 0) { buf[len] = 0; } }

// From zutil.h

var STORED_BLOCK = 0;
var STATIC_TREES = 1;
var DYN_TREES    = 2;
/* The three kinds of block type */

var MIN_MATCH    = 3;
var MAX_MATCH    = 258;
/* The minimum and maximum match lengths */

// From deflate.h
/* ===========================================================================
 * Internal compression state.
 */

var LENGTH_CODES  = 29;
/* number of length codes, not counting the special END_BLOCK code */

var LITERALS      = 256;
/* number of literal bytes 0..255 */

var L_CODES       = LITERALS + 1 + LENGTH_CODES;
/* number of Literal or Length codes, including the END_BLOCK code */

var D_CODES       = 30;
/* number of distance codes */

var BL_CODES      = 19;
/* number of codes used to transfer the bit lengths */

var HEAP_SIZE     = 2*L_CODES + 1;
/* maximum heap size */

var MAX_BITS      = 15;
/* All codes must not exceed MAX_BITS bits */

var Buf_size      = 16;
/* size of bit buffer in bi_buf */


/* ===========================================================================
 * Constants
 */

var MAX_BL_BITS = 7;
/* Bit length codes must not exceed MAX_BL_BITS bits */

var END_BLOCK   = 256;
/* end of block literal code */

var REP_3_6     = 16;
/* repeat previous bit length 3-6 times (2 bits of repeat count) */

var REPZ_3_10   = 17;
/* repeat a zero length 3-10 times  (3 bits of repeat count) */

var REPZ_11_138 = 18;
/* repeat a zero length 11-138 times  (7 bits of repeat count) */

var extra_lbits =   /* extra bits for each length code */
  [0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0];

var extra_dbits =   /* extra bits for each distance code */
  [0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13];

var extra_blbits =  /* extra bits for each bit length code */
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7];

var bl_order =
  [16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];
/* The lengths of the bit length codes are sent in order of decreasing
 * probability, to avoid transmitting the lengths for unused bit length codes.
 */

/* ===========================================================================
 * Local data. These are initialized only once.
 */

// We pre-fill arrays with 0 to avoid uninitialized gaps

var DIST_CODE_LEN = 512; /* see definition of array dist_code below */

// !!!! Use flat array insdead of structure, Freq = i*2, Len = i*2+1
var static_ltree  = new Array((L_CODES+2) * 2);
zero(static_ltree);
/* The static literal tree. Since the bit lengths are imposed, there is no
 * need for the L_CODES extra codes used during heap construction. However
 * The codes 286 and 287 are needed to build a canonical tree (see _tr_init
 * below).
 */

var static_dtree  = new Array(D_CODES * 2);
zero(static_dtree);
/* The static distance tree. (Actually a trivial tree since all codes use
 * 5 bits.)
 */

var _dist_code    = new Array(DIST_CODE_LEN);
zero(_dist_code);
/* Distance codes. The first 256 values correspond to the distances
 * 3 .. 258, the last 256 values correspond to the top 8 bits of
 * the 15 bit distances.
 */

var _length_code  = new Array(MAX_MATCH-MIN_MATCH+1);
zero(_length_code);
/* length code for each normalized match length (0 == MIN_MATCH) */

var base_length   = new Array(LENGTH_CODES);
zero(base_length);
/* First normalized length for each code (0 = MIN_MATCH) */

var base_dist     = new Array(D_CODES);
zero(base_dist);
/* First normalized distance for each code (0 = distance of 1) */


var StaticTreeDesc = function (static_tree, extra_bits, extra_base, elems, max_length) {

  this.static_tree  = static_tree;  /* static tree or NULL */
  this.extra_bits   = extra_bits;   /* extra bits for each code or NULL */
  this.extra_base   = extra_base;   /* base index for extra_bits */
  this.elems        = elems;        /* max number of elements in the tree */
  this.max_length   = max_length;   /* max bit length for the codes */

  // show if `static_tree` has data or dummy - needed for monomorphic objects
  this.has_stree    = static_tree && static_tree.length;
};


var static_l_desc;
var static_d_desc;
var static_bl_desc;


var TreeDesc = function(dyn_tree, stat_desc) {
  this.dyn_tree = dyn_tree;     /* the dynamic tree */
  this.max_code = 0;            /* largest code with non zero frequency */
  this.stat_desc = stat_desc;   /* the corresponding static tree */
};



function d_code(dist) {
  return dist < 256 ? _dist_code[dist] : _dist_code[256 + (dist >>> 7)];
}


/* ===========================================================================
 * Output a short LSB first on the stream.
 * IN assertion: there is enough room in pendingBuf.
 */
function put_short (s, w) {
//    put_byte(s, (uch)((w) & 0xff));
//    put_byte(s, (uch)((ush)(w) >> 8));
  s.pending_buf[s.pending++] = (w) & 0xff;
  s.pending_buf[s.pending++] = (w >>> 8) & 0xff;
}


/* ===========================================================================
 * Send a value on a given number of bits.
 * IN assertion: length <= 16 and value fits in length bits.
 */
function send_bits(s, value, length) {
  if (s.bi_valid > (Buf_size - length)) {
    s.bi_buf |= (value << s.bi_valid) & 0xffff;
    put_short(s, s.bi_buf);
    s.bi_buf = value >> (Buf_size - s.bi_valid);
    s.bi_valid += length - Buf_size;
  } else {
    s.bi_buf |= (value << s.bi_valid) & 0xffff;
    s.bi_valid += length;
  }
}


function send_code(s, c, tree) {
  send_bits(s, tree[c*2]/*.Code*/, tree[c*2 + 1]/*.Len*/);
}


/* ===========================================================================
 * Reverse the first len bits of a code, using straightforward code (a faster
 * method would use a table)
 * IN assertion: 1 <= len <= 15
 */
function bi_reverse(code, len) {
  var res = 0;
  do {
    res |= code & 1;
    code >>>= 1;
    res <<= 1;
  } while (--len > 0);
  return res >>> 1;
}


/* ===========================================================================
 * Flush the bit buffer, keeping at most 7 bits in it.
 */
function bi_flush(s) {
  if (s.bi_valid === 16) {
    put_short(s, s.bi_buf);
    s.bi_buf = 0;
    s.bi_valid = 0;

  } else if (s.bi_valid >= 8) {
    s.pending_buf[s.pending++] = s.bi_buf & 0xff;
    s.bi_buf >>= 8;
    s.bi_valid -= 8;
  }
}


/* ===========================================================================
 * Compute the optimal bit lengths for a tree and update the total bit length
 * for the current block.
 * IN assertion: the fields freq and dad are set, heap[heap_max] and
 *    above are the tree nodes sorted by increasing frequency.
 * OUT assertions: the field len is set to the optimal bit length, the
 *     array bl_count contains the frequencies for each bit length.
 *     The length opt_len is updated; static_len is also updated if stree is
 *     not null.
 */
function gen_bitlen(s, desc)
//    deflate_state *s;
//    tree_desc *desc;    /* the tree descriptor */
{
  var tree            = desc.dyn_tree;
  var max_code        = desc.max_code;
  var stree           = desc.stat_desc.static_tree;
  var has_stree       = desc.stat_desc.has_stree;
  var extra           = desc.stat_desc.extra_bits;
  var base            = desc.stat_desc.extra_base;
  var max_length      = desc.stat_desc.max_length;
  var h;              /* heap index */
  var n, m;           /* iterate over the tree elements */
  var bits;           /* bit length */
  var xbits;          /* extra bits */
  var f;              /* frequency */
  var overflow = 0;   /* number of elements with bit length too large */

  for (bits = 0; bits <= MAX_BITS; bits++) {
    s.bl_count[bits] = 0;
  }

  /* In a first pass, compute the optimal bit lengths (which may
   * overflow in the case of the bit length tree).
   */
  tree[s.heap[s.heap_max]*2 + 1]/*.Len*/ = 0; /* root of the heap */

  for (h = s.heap_max+1; h < HEAP_SIZE; h++) {
    n = s.heap[h];
    bits = tree[tree[n*2 +1]/*.Dad*/ * 2 + 1]/*.Len*/ + 1;
    if (bits > max_length) {
      bits = max_length;
      overflow++;
    }
    tree[n*2 + 1]/*.Len*/ = bits;
    /* We overwrite tree[n].Dad which is no longer needed */

    if (n > max_code) { continue; } /* not a leaf node */

    s.bl_count[bits]++;
    xbits = 0;
    if (n >= base) {
      xbits = extra[n-base];
    }
    f = tree[n * 2]/*.Freq*/;
    s.opt_len += f * (bits + xbits);
    if (has_stree) {
      s.static_len += f * (stree[n*2 + 1]/*.Len*/ + xbits);
    }
  }
  if (overflow === 0) { return; }

  // Trace((stderr,"\nbit length overflow\n"));
  /* This happens for example on obj2 and pic of the Calgary corpus */

  /* Find the first bit length which could increase: */
  do {
    bits = max_length-1;
    while (s.bl_count[bits] === 0) { bits--; }
    s.bl_count[bits]--;      /* move one leaf down the tree */
    s.bl_count[bits+1] += 2; /* move one overflow item as its brother */
    s.bl_count[max_length]--;
    /* The brother of the overflow item also moves one step up,
     * but this does not affect bl_count[max_length]
     */
    overflow -= 2;
  } while (overflow > 0);

  /* Now recompute all bit lengths, scanning in increasing frequency.
   * h is still equal to HEAP_SIZE. (It is simpler to reconstruct all
   * lengths instead of fixing only the wrong ones. This idea is taken
   * from 'ar' written by Haruhiko Okumura.)
   */
  for (bits = max_length; bits !== 0; bits--) {
    n = s.bl_count[bits];
    while (n !== 0) {
      m = s.heap[--h];
      if (m > max_code) { continue; }
      if (tree[m*2 + 1]/*.Len*/ !== bits) {
        // Trace((stderr,"code %d bits %d->%d\n", m, tree[m].Len, bits));
        s.opt_len += (bits - tree[m*2 + 1]/*.Len*/)*tree[m*2]/*.Freq*/;
        tree[m*2 + 1]/*.Len*/ = bits;
      }
      n--;
    }
  }
}


/* ===========================================================================
 * Generate the codes for a given tree and bit counts (which need not be
 * optimal).
 * IN assertion: the array bl_count contains the bit length statistics for
 * the given tree and the field len is set for all tree elements.
 * OUT assertion: the field code is set for all tree elements of non
 *     zero code length.
 */
function gen_codes(tree, max_code, bl_count)
//    ct_data *tree;             /* the tree to decorate */
//    int max_code;              /* largest code with non zero frequency */
//    ushf *bl_count;            /* number of codes at each bit length */
{
  var next_code = new Array(MAX_BITS+1); /* next code value for each bit length */
  var code = 0;              /* running code value */
  var bits;                  /* bit index */
  var n;                     /* code index */

  /* The distribution counts are first used to generate the code values
   * without bit reversal.
   */
  for (bits = 1; bits <= MAX_BITS; bits++) {
    next_code[bits] = code = (code + bl_count[bits-1]) << 1;
  }
  /* Check that the bit counts in bl_count are consistent. The last code
   * must be all ones.
   */
  //Assert (code + bl_count[MAX_BITS]-1 == (1<<MAX_BITS)-1,
  //        "inconsistent bit counts");
  //Tracev((stderr,"\ngen_codes: max_code %d ", max_code));

  for (n = 0;  n <= max_code; n++) {
    var len = tree[n*2 + 1]/*.Len*/;
    if (len === 0) { continue; }
    /* Now reverse the bits */
    tree[n*2]/*.Code*/ = bi_reverse(next_code[len]++, len);

    //Tracecv(tree != static_ltree, (stderr,"\nn %3d %c l %2d c %4x (%x) ",
    //     n, (isgraph(n) ? n : ' '), len, tree[n].Code, next_code[len]-1));
  }
}


/* ===========================================================================
 * Initialize the various 'constant' tables.
 */
function tr_static_init() {
  var n;        /* iterates over tree elements */
  var bits;     /* bit counter */
  var length;   /* length value */
  var code;     /* code value */
  var dist;     /* distance index */
  var bl_count = new Array(MAX_BITS+1);
  /* number of codes at each bit length for an optimal tree */

  // do check in _tr_init()
  //if (static_init_done) return;

  /* For some embedded targets, global variables are not initialized: */
/*#ifdef NO_INIT_GLOBAL_POINTERS
  static_l_desc.static_tree = static_ltree;
  static_l_desc.extra_bits = extra_lbits;
  static_d_desc.static_tree = static_dtree;
  static_d_desc.extra_bits = extra_dbits;
  static_bl_desc.extra_bits = extra_blbits;
#endif*/

  /* Initialize the mapping length (0..255) -> length code (0..28) */
  length = 0;
  for (code = 0; code < LENGTH_CODES-1; code++) {
    base_length[code] = length;
    for (n = 0; n < (1<<extra_lbits[code]); n++) {
      _length_code[length++] = code;
    }
  }
  //Assert (length == 256, "tr_static_init: length != 256");
  /* Note that the length 255 (match length 258) can be represented
   * in two different ways: code 284 + 5 bits or code 285, so we
   * overwrite length_code[255] to use the best encoding:
   */
  _length_code[length-1] = code;

  /* Initialize the mapping dist (0..32K) -> dist code (0..29) */
  dist = 0;
  for (code = 0 ; code < 16; code++) {
    base_dist[code] = dist;
    for (n = 0; n < (1<<extra_dbits[code]); n++) {
      _dist_code[dist++] = code;
    }
  }
  //Assert (dist == 256, "tr_static_init: dist != 256");
  dist >>= 7; /* from now on, all distances are divided by 128 */
  for (; code < D_CODES; code++) {
    base_dist[code] = dist << 7;
    for (n = 0; n < (1<<(extra_dbits[code]-7)); n++) {
      _dist_code[256 + dist++] = code;
    }
  }
  //Assert (dist == 256, "tr_static_init: 256+dist != 512");

  /* Construct the codes of the static literal tree */
  for (bits = 0; bits <= MAX_BITS; bits++) {
    bl_count[bits] = 0;
  }

  n = 0;
  while (n <= 143) {
    static_ltree[n*2 + 1]/*.Len*/ = 8;
    n++;
    bl_count[8]++;
  }
  while (n <= 255) {
    static_ltree[n*2 + 1]/*.Len*/ = 9;
    n++;
    bl_count[9]++;
  }
  while (n <= 279) {
    static_ltree[n*2 + 1]/*.Len*/ = 7;
    n++;
    bl_count[7]++;
  }
  while (n <= 287) {
    static_ltree[n*2 + 1]/*.Len*/ = 8;
    n++;
    bl_count[8]++;
  }
  /* Codes 286 and 287 do not exist, but we must include them in the
   * tree construction to get a canonical Huffman tree (longest code
   * all ones)
   */
  gen_codes(static_ltree, L_CODES+1, bl_count);

  /* The static distance tree is trivial: */
  for (n = 0; n < D_CODES; n++) {
    static_dtree[n*2 + 1]/*.Len*/ = 5;
    static_dtree[n*2]/*.Code*/ = bi_reverse(n, 5);
  }

  // Now data ready and we can init static trees
  static_l_desc = new StaticTreeDesc(static_ltree, extra_lbits, LITERALS+1, L_CODES, MAX_BITS);
  static_d_desc = new StaticTreeDesc(static_dtree, extra_dbits, 0,          D_CODES, MAX_BITS);
  static_bl_desc =new StaticTreeDesc(new Array(0), extra_blbits, 0,         BL_CODES, MAX_BL_BITS);

  //static_init_done = true;
}


/* ===========================================================================
 * Initialize a new block.
 */
function init_block(s) {
  var n; /* iterates over tree elements */

  /* Initialize the trees. */
  for (n = 0; n < L_CODES;  n++) { s.dyn_ltree[n*2]/*.Freq*/ = 0; }
  for (n = 0; n < D_CODES;  n++) { s.dyn_dtree[n*2]/*.Freq*/ = 0; }
  for (n = 0; n < BL_CODES; n++) { s.bl_tree[n*2]/*.Freq*/ = 0; }

  s.dyn_ltree[END_BLOCK*2]/*.Freq*/ = 1;
  s.opt_len = s.static_len = 0;
  s.last_lit = s.matches = 0;
}


/* ===========================================================================
 * Flush the bit buffer and align the output on a byte boundary
 */
function bi_windup(s)
{
  if (s.bi_valid > 8) {
    put_short(s, s.bi_buf);
  } else if (s.bi_valid > 0) {
    //put_byte(s, (Byte)s->bi_buf);
    s.pending_buf[s.pending++] = s.bi_buf;
  }
  s.bi_buf = 0;
  s.bi_valid = 0;
}

/* ===========================================================================
 * Copy a stored block, storing first the length and its
 * one's complement if requested.
 */
function copy_block(s, buf, len, header)
//DeflateState *s;
//charf    *buf;    /* the input data */
//unsigned len;     /* its length */
//int      header;  /* true if block header must be written */
{
  bi_windup(s);        /* align on byte boundary */

  if (header) {
    put_short(s, len);
    put_short(s, ~len);
  }
//  while (len--) {
//    put_byte(s, *buf++);
//  }
  utils.arraySet(s.pending_buf, s.window, buf, len, s.pending);
  s.pending += len;
}

/* ===========================================================================
 * Compares to subtrees, using the tree depth as tie breaker when
 * the subtrees have equal frequency. This minimizes the worst case length.
 */
function smaller(tree, n, m, depth) {
  var _n2 = n*2;
  var _m2 = m*2;
  return (tree[_n2]/*.Freq*/ < tree[_m2]/*.Freq*/ ||
         (tree[_n2]/*.Freq*/ === tree[_m2]/*.Freq*/ && depth[n] <= depth[m]));
}

/* ===========================================================================
 * Restore the heap property by moving down the tree starting at node k,
 * exchanging a node with the smallest of its two sons if necessary, stopping
 * when the heap property is re-established (each father smaller than its
 * two sons).
 */
function pqdownheap(s, tree, k)
//    deflate_state *s;
//    ct_data *tree;  /* the tree to restore */
//    int k;               /* node to move down */
{
  var v = s.heap[k];
  var j = k << 1;  /* left son of k */
  while (j <= s.heap_len) {
    /* Set j to the smallest of the two sons: */
    if (j < s.heap_len &&
      smaller(tree, s.heap[j+1], s.heap[j], s.depth)) {
      j++;
    }
    /* Exit if v is smaller than both sons */
    if (smaller(tree, v, s.heap[j], s.depth)) { break; }

    /* Exchange v with the smallest son */
    s.heap[k] = s.heap[j];
    k = j;

    /* And continue down the tree, setting j to the left son of k */
    j <<= 1;
  }
  s.heap[k] = v;
}


// inlined manually
// var SMALLEST = 1;

/* ===========================================================================
 * Send the block data compressed using the given Huffman trees
 */
function compress_block(s, ltree, dtree)
//    deflate_state *s;
//    const ct_data *ltree; /* literal tree */
//    const ct_data *dtree; /* distance tree */
{
  var dist;           /* distance of matched string */
  var lc;             /* match length or unmatched char (if dist == 0) */
  var lx = 0;         /* running index in l_buf */
  var code;           /* the code to send */
  var extra;          /* number of extra bits to send */

  if (s.last_lit !== 0) {
    do {
      dist = (s.pending_buf[s.d_buf + lx*2] << 8) | (s.pending_buf[s.d_buf + lx*2 + 1]);
      lc = s.pending_buf[s.l_buf + lx];
      lx++;

      if (dist === 0) {
        send_code(s, lc, ltree); /* send a literal byte */
        //Tracecv(isgraph(lc), (stderr," '%c' ", lc));
      } else {
        /* Here, lc is the match length - MIN_MATCH */
        code = _length_code[lc];
        send_code(s, code+LITERALS+1, ltree); /* send the length code */
        extra = extra_lbits[code];
        if (extra !== 0) {
          lc -= base_length[code];
          send_bits(s, lc, extra);       /* send the extra length bits */
        }
        dist--; /* dist is now the match distance - 1 */
        code = d_code(dist);
        //Assert (code < D_CODES, "bad d_code");

        send_code(s, code, dtree);       /* send the distance code */
        extra = extra_dbits[code];
        if (extra !== 0) {
          dist -= base_dist[code];
          send_bits(s, dist, extra);   /* send the extra distance bits */
        }
      } /* literal or match pair ? */

      /* Check that the overlay between pending_buf and d_buf+l_buf is ok: */
      //Assert((uInt)(s->pending) < s->lit_bufsize + 2*lx,
      //       "pendingBuf overflow");

    } while (lx < s.last_lit);
  }

  send_code(s, END_BLOCK, ltree);
}


/* ===========================================================================
 * Construct one Huffman tree and assigns the code bit strings and lengths.
 * Update the total bit length for the current block.
 * IN assertion: the field freq is set for all tree elements.
 * OUT assertions: the fields len and code are set to the optimal bit length
 *     and corresponding code. The length opt_len is updated; static_len is
 *     also updated if stree is not null. The field max_code is set.
 */
function build_tree(s, desc)
//    deflate_state *s;
//    tree_desc *desc; /* the tree descriptor */
{
  var tree     = desc.dyn_tree;
  var stree    = desc.stat_desc.static_tree;
  var has_stree = desc.stat_desc.has_stree;
  var elems    = desc.stat_desc.elems;
  var n, m;          /* iterate over heap elements */
  var max_code = -1; /* largest code with non zero frequency */
  var node;          /* new node being created */

  /* Construct the initial heap, with least frequent element in
   * heap[SMALLEST]. The sons of heap[n] are heap[2*n] and heap[2*n+1].
   * heap[0] is not used.
   */
  s.heap_len = 0;
  s.heap_max = HEAP_SIZE;

  for (n = 0; n < elems; n++) {
    if (tree[n * 2]/*.Freq*/ !== 0) {
      s.heap[++s.heap_len] = max_code = n;
      s.depth[n] = 0;

    } else {
      tree[n*2 + 1]/*.Len*/ = 0;
    }
  }

  /* The pkzip format requires that at least one distance code exists,
   * and that at least one bit should be sent even if there is only one
   * possible code. So to avoid special checks later on we force at least
   * two codes of non zero frequency.
   */
  while (s.heap_len < 2) {
    node = s.heap[++s.heap_len] = (max_code < 2 ? ++max_code : 0);
    tree[node * 2]/*.Freq*/ = 1;
    s.depth[node] = 0;
    s.opt_len--;

    if (has_stree) {
      s.static_len -= stree[node*2 + 1]/*.Len*/;
    }
    /* node is 0 or 1 so it does not have extra bits */
  }
  desc.max_code = max_code;

  /* The elements heap[heap_len/2+1 .. heap_len] are leaves of the tree,
   * establish sub-heaps of increasing lengths:
   */
  for (n = (s.heap_len >> 1/*int /2*/); n >= 1; n--) { pqdownheap(s, tree, n); }

  /* Construct the Huffman tree by repeatedly combining the least two
   * frequent nodes.
   */
  node = elems;              /* next internal node of the tree */
  do {
    //pqremove(s, tree, n);  /* n = node of least frequency */
    /*** pqremove ***/
    n = s.heap[1/*SMALLEST*/];
    s.heap[1/*SMALLEST*/] = s.heap[s.heap_len--];
    pqdownheap(s, tree, 1/*SMALLEST*/);
    /***/

    m = s.heap[1/*SMALLEST*/]; /* m = node of next least frequency */

    s.heap[--s.heap_max] = n; /* keep the nodes sorted by frequency */
    s.heap[--s.heap_max] = m;

    /* Create a new node father of n and m */
    tree[node * 2]/*.Freq*/ = tree[n * 2]/*.Freq*/ + tree[m * 2]/*.Freq*/;
    s.depth[node] = (s.depth[n] >= s.depth[m] ? s.depth[n] : s.depth[m]) + 1;
    tree[n*2 + 1]/*.Dad*/ = tree[m*2 + 1]/*.Dad*/ = node;

    /* and insert the new node in the heap */
    s.heap[1/*SMALLEST*/] = node++;
    pqdownheap(s, tree, 1/*SMALLEST*/);

  } while (s.heap_len >= 2);

  s.heap[--s.heap_max] = s.heap[1/*SMALLEST*/];

  /* At this point, the fields freq and dad are set. We can now
   * generate the bit lengths.
   */
  gen_bitlen(s, desc);

  /* The field len is now set, we can generate the bit codes */
  gen_codes(tree, max_code, s.bl_count);
}


/* ===========================================================================
 * Scan a literal or distance tree to determine the frequencies of the codes
 * in the bit length tree.
 */
function scan_tree(s, tree, max_code)
//    deflate_state *s;
//    ct_data *tree;   /* the tree to be scanned */
//    int max_code;    /* and its largest code of non zero frequency */
{
  var n;                     /* iterates over all tree elements */
  var prevlen = -1;          /* last emitted length */
  var curlen;                /* length of current code */

  var nextlen = tree[0*2 + 1]/*.Len*/; /* length of next code */

  var count = 0;             /* repeat count of the current code */
  var max_count = 7;         /* max repeat count */
  var min_count = 4;         /* min repeat count */

  if (nextlen === 0) {
    max_count = 138;
    min_count = 3;
  }
  tree[(max_code+1)*2 + 1]/*.Len*/ = 0xffff; /* guard */

  for (n = 0; n <= max_code; n++) {
    curlen = nextlen;
    nextlen = tree[(n+1)*2 + 1]/*.Len*/;

    if (++count < max_count && curlen === nextlen) {
      continue;

    } else if (count < min_count) {
      s.bl_tree[curlen * 2]/*.Freq*/ += count;

    } else if (curlen !== 0) {

      if (curlen !== prevlen) { s.bl_tree[curlen * 2]/*.Freq*/++; }
      s.bl_tree[REP_3_6*2]/*.Freq*/++;

    } else if (count <= 10) {
      s.bl_tree[REPZ_3_10*2]/*.Freq*/++;

    } else {
      s.bl_tree[REPZ_11_138*2]/*.Freq*/++;
    }

    count = 0;
    prevlen = curlen;

    if (nextlen === 0) {
      max_count = 138;
      min_count = 3;

    } else if (curlen === nextlen) {
      max_count = 6;
      min_count = 3;

    } else {
      max_count = 7;
      min_count = 4;
    }
  }
}


/* ===========================================================================
 * Send a literal or distance tree in compressed form, using the codes in
 * bl_tree.
 */
function send_tree(s, tree, max_code)
//    deflate_state *s;
//    ct_data *tree; /* the tree to be scanned */
//    int max_code;       /* and its largest code of non zero frequency */
{
  var n;                     /* iterates over all tree elements */
  var prevlen = -1;          /* last emitted length */
  var curlen;                /* length of current code */

  var nextlen = tree[0*2 + 1]/*.Len*/; /* length of next code */

  var count = 0;             /* repeat count of the current code */
  var max_count = 7;         /* max repeat count */
  var min_count = 4;         /* min repeat count */

  /* tree[max_code+1].Len = -1; */  /* guard already set */
  if (nextlen === 0) {
    max_count = 138;
    min_count = 3;
  }

  for (n = 0; n <= max_code; n++) {
    curlen = nextlen;
    nextlen = tree[(n+1)*2 + 1]/*.Len*/;

    if (++count < max_count && curlen === nextlen) {
      continue;

    } else if (count < min_count) {
      do { send_code(s, curlen, s.bl_tree); } while (--count !== 0);

    } else if (curlen !== 0) {
      if (curlen !== prevlen) {
        send_code(s, curlen, s.bl_tree);
        count--;
      }
      //Assert(count >= 3 && count <= 6, " 3_6?");
      send_code(s, REP_3_6, s.bl_tree);
      send_bits(s, count-3, 2);

    } else if (count <= 10) {
      send_code(s, REPZ_3_10, s.bl_tree);
      send_bits(s, count-3, 3);

    } else {
      send_code(s, REPZ_11_138, s.bl_tree);
      send_bits(s, count-11, 7);
    }

    count = 0;
    prevlen = curlen;
    if (nextlen === 0) {
      max_count = 138;
      min_count = 3;

    } else if (curlen === nextlen) {
      max_count = 6;
      min_count = 3;

    } else {
      max_count = 7;
      min_count = 4;
    }
  }
}


/* ===========================================================================
 * Construct the Huffman tree for the bit lengths and return the index in
 * bl_order of the last bit length code to send.
 */
function build_bl_tree(s) {
  var max_blindex;  /* index of last bit length code of non zero freq */

  /* Determine the bit length frequencies for literal and distance trees */
  scan_tree(s, s.dyn_ltree, s.l_desc.max_code);
  scan_tree(s, s.dyn_dtree, s.d_desc.max_code);

  /* Build the bit length tree: */
  build_tree(s, s.bl_desc);
  /* opt_len now includes the length of the tree representations, except
   * the lengths of the bit lengths codes and the 5+5+4 bits for the counts.
   */

  /* Determine the number of bit length codes to send. The pkzip format
   * requires that at least 4 bit length codes be sent. (appnote.txt says
   * 3 but the actual value used is 4.)
   */
  for (max_blindex = BL_CODES-1; max_blindex >= 3; max_blindex--) {
    if (s.bl_tree[bl_order[max_blindex]*2 + 1]/*.Len*/ !== 0) {
      break;
    }
  }
  /* Update opt_len to include the bit length tree and counts */
  s.opt_len += 3*(max_blindex+1) + 5+5+4;
  //Tracev((stderr, "\ndyn trees: dyn %ld, stat %ld",
  //        s->opt_len, s->static_len));

  return max_blindex;
}


/* ===========================================================================
 * Send the header for a block using dynamic Huffman trees: the counts, the
 * lengths of the bit length codes, the literal tree and the distance tree.
 * IN assertion: lcodes >= 257, dcodes >= 1, blcodes >= 4.
 */
function send_all_trees(s, lcodes, dcodes, blcodes)
//    deflate_state *s;
//    int lcodes, dcodes, blcodes; /* number of codes for each tree */
{
  var rank;                    /* index in bl_order */

  //Assert (lcodes >= 257 && dcodes >= 1 && blcodes >= 4, "not enough codes");
  //Assert (lcodes <= L_CODES && dcodes <= D_CODES && blcodes <= BL_CODES,
  //        "too many codes");
  //Tracev((stderr, "\nbl counts: "));
  send_bits(s, lcodes-257, 5); /* not +255 as stated in appnote.txt */
  send_bits(s, dcodes-1,   5);
  send_bits(s, blcodes-4,  4); /* not -3 as stated in appnote.txt */
  for (rank = 0; rank < blcodes; rank++) {
    //Tracev((stderr, "\nbl code %2d ", bl_order[rank]));
    send_bits(s, s.bl_tree[bl_order[rank]*2 + 1]/*.Len*/, 3);
  }
  //Tracev((stderr, "\nbl tree: sent %ld", s->bits_sent));

  send_tree(s, s.dyn_ltree, lcodes-1); /* literal tree */
  //Tracev((stderr, "\nlit tree: sent %ld", s->bits_sent));

  send_tree(s, s.dyn_dtree, dcodes-1); /* distance tree */
  //Tracev((stderr, "\ndist tree: sent %ld", s->bits_sent));
}


/* ===========================================================================
 * Check if the data type is TEXT or BINARY, using the following algorithm:
 * - TEXT if the two conditions below are satisfied:
 *    a) There are no non-portable control characters belonging to the
 *       "black list" (0..6, 14..25, 28..31).
 *    b) There is at least one printable character belonging to the
 *       "white list" (9 {TAB}, 10 {LF}, 13 {CR}, 32..255).
 * - BINARY otherwise.
 * - The following partially-portable control characters form a
 *   "gray list" that is ignored in this detection algorithm:
 *   (7 {BEL}, 8 {BS}, 11 {VT}, 12 {FF}, 26 {SUB}, 27 {ESC}).
 * IN assertion: the fields Freq of dyn_ltree are set.
 */
function detect_data_type(s) {
  /* black_mask is the bit mask of black-listed bytes
   * set bits 0..6, 14..25, and 28..31
   * 0xf3ffc07f = binary 11110011111111111100000001111111
   */
  var black_mask = 0xf3ffc07f;
  var n;

  /* Check for non-textual ("black-listed") bytes. */
  for (n = 0; n <= 31; n++, black_mask >>>= 1) {
    if ((black_mask & 1) && (s.dyn_ltree[n*2]/*.Freq*/ !== 0)) {
      return Z_BINARY;
    }
  }

  /* Check for textual ("white-listed") bytes. */
  if (s.dyn_ltree[9 * 2]/*.Freq*/ !== 0 || s.dyn_ltree[10 * 2]/*.Freq*/ !== 0 ||
      s.dyn_ltree[13 * 2]/*.Freq*/ !== 0) {
    return Z_TEXT;
  }
  for (n = 32; n < LITERALS; n++) {
    if (s.dyn_ltree[n * 2]/*.Freq*/ !== 0) {
      return Z_TEXT;
    }
  }

  /* There are no "black-listed" or "white-listed" bytes:
   * this stream either is empty or has tolerated ("gray-listed") bytes only.
   */
  return Z_BINARY;
}


var static_init_done = false;

/* ===========================================================================
 * Initialize the tree data structures for a new zlib stream.
 */
function _tr_init(s)
{

  if (!static_init_done) {
    tr_static_init();
    static_init_done = true;
  }

  s.l_desc  = new TreeDesc(s.dyn_ltree, static_l_desc);
  s.d_desc  = new TreeDesc(s.dyn_dtree, static_d_desc);
  s.bl_desc = new TreeDesc(s.bl_tree, static_bl_desc);

  s.bi_buf = 0;
  s.bi_valid = 0;

  /* Initialize the first block of the first file: */
  init_block(s);
}


/* ===========================================================================
 * Send a stored block
 */
function _tr_stored_block(s, buf, stored_len, last)
//DeflateState *s;
//charf *buf;       /* input block */
//ulg stored_len;   /* length of input block */
//int last;         /* one if this is the last block for a file */
{
  send_bits(s, (STORED_BLOCK<<1)+(last ? 1 : 0), 3);    /* send block type */
  copy_block(s, buf, stored_len, true); /* with header */
}


/* ===========================================================================
 * Send one empty static block to give enough lookahead for inflate.
 * This takes 10 bits, of which 7 may remain in the bit buffer.
 */
function _tr_align(s) {
  send_bits(s, STATIC_TREES<<1, 3);
  send_code(s, END_BLOCK, static_ltree);
  bi_flush(s);
}


/* ===========================================================================
 * Determine the best encoding for the current block: dynamic trees, static
 * trees or store, and output the encoded block to the zip file.
 */
function _tr_flush_block(s, buf, stored_len, last)
//DeflateState *s;
//charf *buf;       /* input block, or NULL if too old */
//ulg stored_len;   /* length of input block */
//int last;         /* one if this is the last block for a file */
{
  var opt_lenb, static_lenb;  /* opt_len and static_len in bytes */
  var max_blindex = 0;        /* index of last bit length code of non zero freq */

  /* Build the Huffman trees unless a stored block is forced */
  if (s.level > 0) {

    /* Check if the file is binary or text */
    if (s.strm.data_type === Z_UNKNOWN) {
      s.strm.data_type = detect_data_type(s);
    }

    /* Construct the literal and distance trees */
    build_tree(s, s.l_desc);
    // Tracev((stderr, "\nlit data: dyn %ld, stat %ld", s->opt_len,
    //        s->static_len));

    build_tree(s, s.d_desc);
    // Tracev((stderr, "\ndist data: dyn %ld, stat %ld", s->opt_len,
    //        s->static_len));
    /* At this point, opt_len and static_len are the total bit lengths of
     * the compressed block data, excluding the tree representations.
     */

    /* Build the bit length tree for the above two trees, and get the index
     * in bl_order of the last bit length code to send.
     */
    max_blindex = build_bl_tree(s);

    /* Determine the best encoding. Compute the block lengths in bytes. */
    opt_lenb = (s.opt_len+3+7) >>> 3;
    static_lenb = (s.static_len+3+7) >>> 3;

    // Tracev((stderr, "\nopt %lu(%lu) stat %lu(%lu) stored %lu lit %u ",
    //        opt_lenb, s->opt_len, static_lenb, s->static_len, stored_len,
    //        s->last_lit));

    if (static_lenb <= opt_lenb) { opt_lenb = static_lenb; }

  } else {
    // Assert(buf != (char*)0, "lost buf");
    opt_lenb = static_lenb = stored_len + 5; /* force a stored block */
  }

  if ((stored_len+4 <= opt_lenb) && (buf !== -1)) {
    /* 4: two words for the lengths */

    /* The test buf != NULL is only necessary if LIT_BUFSIZE > WSIZE.
     * Otherwise we can't have processed more than WSIZE input bytes since
     * the last block flush, because compression would have been
     * successful. If LIT_BUFSIZE <= WSIZE, it is never too late to
     * transform a block into a stored block.
     */
    _tr_stored_block(s, buf, stored_len, last);

  } else if (s.strategy === Z_FIXED || static_lenb === opt_lenb) {

    send_bits(s, (STATIC_TREES<<1) + (last ? 1 : 0), 3);
    compress_block(s, static_ltree, static_dtree);

  } else {
    send_bits(s, (DYN_TREES<<1) + (last ? 1 : 0), 3);
    send_all_trees(s, s.l_desc.max_code+1, s.d_desc.max_code+1, max_blindex+1);
    compress_block(s, s.dyn_ltree, s.dyn_dtree);
  }
  // Assert (s->compressed_len == s->bits_sent, "bad compressed size");
  /* The above check is made mod 2^32, for files larger than 512 MB
   * and uLong implemented on 32 bits.
   */
  init_block(s);

  if (last) {
    bi_windup(s);
  }
  // Tracev((stderr,"\ncomprlen %lu(%lu) ", s->compressed_len>>3,
  //       s->compressed_len-7*last));
}

/* ===========================================================================
 * Save the match info and tally the frequency counts. Return true if
 * the current block must be flushed.
 */
function _tr_tally(s, dist, lc)
//    deflate_state *s;
//    unsigned dist;  /* distance of matched string */
//    unsigned lc;    /* match length-MIN_MATCH or unmatched char (if dist==0) */
{
  //var out_length, in_length, dcode;

  s.pending_buf[s.d_buf + s.last_lit * 2]     = (dist >>> 8) & 0xff;
  s.pending_buf[s.d_buf + s.last_lit * 2 + 1] = dist & 0xff;

  s.pending_buf[s.l_buf + s.last_lit] = lc & 0xff;
  s.last_lit++;

  if (dist === 0) {
    /* lc is the unmatched char */
    s.dyn_ltree[lc*2]/*.Freq*/++;
  } else {
    s.matches++;
    /* Here, lc is the match length - MIN_MATCH */
    dist--;             /* dist = match distance - 1 */
    //Assert((ush)dist < (ush)MAX_DIST(s) &&
    //       (ush)lc <= (ush)(MAX_MATCH-MIN_MATCH) &&
    //       (ush)d_code(dist) < (ush)D_CODES,  "_tr_tally: bad match");

    s.dyn_ltree[(_length_code[lc]+LITERALS+1) * 2]/*.Freq*/++;
    s.dyn_dtree[d_code(dist) * 2]/*.Freq*/++;
  }

// (!) This block is disabled in zlib defailts,
// don't enable it for binary compatibility

//#ifdef TRUNCATE_BLOCK
//  /* Try to guess if it is profitable to stop the current block here */
//  if ((s.last_lit & 0x1fff) === 0 && s.level > 2) {
//    /* Compute an upper bound for the compressed length */
//    out_length = s.last_lit*8;
//    in_length = s.strstart - s.block_start;
//
//    for (dcode = 0; dcode < D_CODES; dcode++) {
//      out_length += s.dyn_dtree[dcode*2]/*.Freq*/ * (5 + extra_dbits[dcode]);
//    }
//    out_length >>>= 3;
//    //Tracev((stderr,"\nlast_lit %u, in %ld, out ~%ld(%ld%%) ",
//    //       s->last_lit, in_length, out_length,
//    //       100L - out_length*100L/in_length));
//    if (s.matches < (s.last_lit>>1)/*int /2*/ && out_length < (in_length>>1)/*int /2*/) {
//      return true;
//    }
//  }
//#endif

  return (s.last_lit === s.lit_bufsize-1);
  /* We avoid equality with lit_bufsize because of wraparound at 64K
   * on 16 bit machines and because stored blocks are restricted to
   * 64K-1 bytes.
   */
}

exports._tr_init  = _tr_init;
exports._tr_stored_block = _tr_stored_block;
exports._tr_flush_block  = _tr_flush_block;
exports._tr_tally = _tr_tally;
exports._tr_align = _tr_align;

},{"../utils/common":33}],45:[function(require,module,exports){
'use strict';


function ZStream() {
  /* next input byte */
  this.input = null; // JS specific, because we have no pointers
  this.next_in = 0;
  /* number of bytes available at input */
  this.avail_in = 0;
  /* total number of input bytes read so far */
  this.total_in = 0;
  /* next output byte should be put there */
  this.output = null; // JS specific, because we have no pointers
  this.next_out = 0;
  /* remaining free space at output */
  this.avail_out = 0;
  /* total number of bytes output so far */
  this.total_out = 0;
  /* last error message, NULL if no error */
  this.msg = ''/*Z_NULL*/;
  /* not visible by applications */
  this.state = null;
  /* best guess about the data type: binary or text */
  this.data_type = 2/*Z_UNKNOWN*/;
  /* adler32 value of the uncompressed data */
  this.adler = 0;
}

module.exports = ZStream;

},{}],46:[function(require,module,exports){
/*!
* screenfull
* v2.0.0 - 2014-12-22
* (c) Sindre Sorhus; MIT License
*/
(function () {
	'use strict';

	var isCommonjs = typeof module !== 'undefined' && module.exports;
	var keyboardAllowed = typeof Element !== 'undefined' && 'ALLOW_KEYBOARD_INPUT' in Element;

	var fn = (function () {
		var val;
		var valLength;

		var fnMap = [
			[
				'requestFullscreen',
				'exitFullscreen',
				'fullscreenElement',
				'fullscreenEnabled',
				'fullscreenchange',
				'fullscreenerror'
			],
			// new WebKit
			[
				'webkitRequestFullscreen',
				'webkitExitFullscreen',
				'webkitFullscreenElement',
				'webkitFullscreenEnabled',
				'webkitfullscreenchange',
				'webkitfullscreenerror'

			],
			// old WebKit (Safari 5.1)
			[
				'webkitRequestFullScreen',
				'webkitCancelFullScreen',
				'webkitCurrentFullScreenElement',
				'webkitCancelFullScreen',
				'webkitfullscreenchange',
				'webkitfullscreenerror'

			],
			[
				'mozRequestFullScreen',
				'mozCancelFullScreen',
				'mozFullScreenElement',
				'mozFullScreenEnabled',
				'mozfullscreenchange',
				'mozfullscreenerror'
			],
			[
				'msRequestFullscreen',
				'msExitFullscreen',
				'msFullscreenElement',
				'msFullscreenEnabled',
				'MSFullscreenChange',
				'MSFullscreenError'
			]
		];

		var i = 0;
		var l = fnMap.length;
		var ret = {};

		for (; i < l; i++) {
			val = fnMap[i];
			if (val && val[1] in document) {
				for (i = 0, valLength = val.length; i < valLength; i++) {
					ret[fnMap[0][i]] = val[i];
				}
				return ret;
			}
		}

		return false;
	})();

	var screenfull = {
		request: function (elem) {
			var request = fn.requestFullscreen;

			elem = elem || document.documentElement;

			// Work around Safari 5.1 bug: reports support for
			// keyboard in fullscreen even though it doesn't.
			// Browser sniffing, since the alternative with
			// setTimeout is even worse.
			if (/5\.1[\.\d]* Safari/.test(navigator.userAgent)) {
				elem[request]();
			} else {
				elem[request](keyboardAllowed && Element.ALLOW_KEYBOARD_INPUT);
			}
		},
		exit: function () {
			document[fn.exitFullscreen]();
		},
		toggle: function (elem) {
			if (this.isFullscreen) {
				this.exit();
			} else {
				this.request(elem);
			}
		},
		raw: fn
	};

	if (!fn) {
		if (isCommonjs) {
			module.exports = false;
		} else {
			window.screenfull = false;
		}

		return;
	}

	Object.defineProperties(screenfull, {
		isFullscreen: {
			get: function () {
				return !!document[fn.fullscreenElement];
			}
		},
		element: {
			enumerable: true,
			get: function () {
				return document[fn.fullscreenElement];
			}
		},
		enabled: {
			enumerable: true,
			get: function () {
				// Coerce to boolean in case of old WebKit
				return !!document[fn.fullscreenEnabled];
			}
		}
	});

	if (isCommonjs) {
		module.exports = screenfull;
	} else {
		window.screenfull = screenfull;
	}
})();

},{}],47:[function(require,module,exports){
var $ = require('jquery'), Utils = require('./Utils');
var AWT = {};
AWT.Font = function (family, size, bold, italic, variant) {
    if (family)
        this.family = family;
    if (typeof size === 'number')
        this.size = size;
    if (bold)
        this.bold = bold;
    if (italic)
        this.italic = italic;
    if (variant)
        this.variant = variant;
    this._metrics = {
        ascent: -1,
        descent: -1,
        height: -1
    };
};
AWT.Font.ALREADY_CALCULATED_FONTS = [];
AWT.Font.prototype = {
    constructor: AWT.Font,
    family: 'Arial',
    size: 17,
    bold: 0,
    italic: 0,
    variant: '',
    _metrics: {
        ascent: -1,
        descent: -1,
        height: -1
    },
    setProperties: function ($xml) {
        if ($xml.attr('family'))
            this.family = $xml.attr('family');
        if ($xml.attr('size'))
            this.size = Number($xml.attr('size'));
        if ($xml.attr('bold'))
            this.bold = Utils.getBoolean($xml.attr('bold'));
        if ($xml.attr('italic'))
            this.italic = Utils.getBoolean($xml.attr('italic'));
        if ($xml.attr('variant'))
            this.variant = $xml.attr('variant');
        return this;
    },
    setSize: function (size) {
        var currentSize = this.size;
        this.size = size;
        if (currentSize !== size)
            this._metrics.height = -1;
        return this;
    },
    getHeight: function () {
        if (this._metrics.height < 0) {
            for (var i = 0; i < AWT.Font.ALREADY_CALCULATED_FONTS.length; i++) {
                var font = AWT.Font.ALREADY_CALCULATED_FONTS[i];
                if (font.equals(this)) {
                    this._metrics.height = font._metrics.height;
                    this._metrics.ascent = font._metrics.ascent;
                    this._metrics.descent = font._metrics.descent;
                    break;
                }
            }
            if (this._metrics.height < 0) {
                this._calcHeight();
                if (this._metrics.height > 0)
                    AWT.Font.ALREADY_CALCULATED_FONTS.push(this);
            }
        }
        return this._metrics.height;
    },
    toCss: function (css) {
        if (!css)
            css = {};
        css['font-family'] = this.family;
        css['font-size'] = this.size + 'px';
        if (this.hasOwnProperty('bold'))
            css['font-weight'] = this.bold ? 'bold' : 'normal';
        if (this.hasOwnProperty('italic'))
            css['font-style'] = this.italic ? 'italic' : 'normal';
        if (this.hasOwnProperty('variant'))
            css['font-variant'] = this.variant;
        return css;
    },
    cssFont: function () {
        return (this.italic ? 'italic ' : 'normal') + ' ' + (this.variant === '' ? 'normal' : this.variant) + ' ' + (this.bold ? 'bold ' : 'normal') + ' ' + this.size + 'pt ' + this.family;
    },
    _calcHeight: function () {
        var text = $('<span>Hg</span>').css(this.toCss());
        var block = $('<div style="display: inline-block; width: 1px; height: 0px;"></div>');
        var div = $('<div></div>');
        div.append(text, block);
        var body = $('body');
        body.append(div);
        try {
            block.css({ verticalAlign: 'baseline' });
            this._metrics.ascent = block.offset().top - text.offset().top;
            block.css({ verticalAlign: 'bottom' });
            this._metrics.height = block.offset().top - text.offset().top;
            this._metrics.descent = this._metrics.height - this._metrics.ascent;
        } finally {
            div.remove();
        }
        return this;
    },
    equals: function (font) {
        return this.family === font.family && this.size === font.size && this.bold === font.bold && this.italic === font.italic && this.variant === font.variant;
    }
};
AWT.Gradient = function (c1, c2, angle, cycles) {
    if (c1)
        this.c1 = c1;
    if (c2)
        this.c2 = c2;
    if (typeof angle === 'number')
        this.angle = angle % 360;
    if (typeof cycles === 'number')
        this.cycles = cycles;
};
AWT.Gradient.prototype = {
    constructor: AWT.Gradient,
    c1: 'white',
    c2: 'black',
    angle: 0,
    cycles: 1,
    setProperties: function ($xml) {
        this.c1 = Utils.checkColor($xml.attr('source'), 'black');
        this.c2 = Utils.checkColor($xml.attr('dest'), 'white');
        this.angle = Number($xml.attr('angle') || 0) % 360;
        this.cycles = Number($xml.attr('cycles') || 1);
        return this;
    },
    getGradient: function (ctx, rect) {
        var p2 = rect.getOppositeVertex();
        var gradient = ctx.createLinearGradient(rect.pos.x, rect.pos.y, p2.x, p2.y);
        var step = 1 / Math.max(this.cycles, 1);
        for (var i = 0; i <= this.cycles; i++)
            gradient.addColorStop(i * step, i % 2 ? this.c1 : this.c2);
        return gradient;
    },
    getCss: function () {
        var result = 'linear-gradient(' + (this.angle + 90) + 'deg, ' + this.c1 + ', ' + this.c2;
        for (var i = 1; i < this.cycles; i++) {
            result += ', ' + (i % 2 > 0 ? this.c1 : this.c2);
        }
        result += ')';
        return result;
    },
    hasTransparency: function () {
        return Utils.colorHasTransparency(this.c1) || Utils.colorHasTransparency(this.c2);
    }
};
AWT.Stroke = function (lineWidth, lineCap, lineJoin, miterLimit) {
    if (typeof lineWidth === 'number')
        this.lineWidth = lineWidth;
    if (lineCap)
        this.lineCap = lineCap;
    if (lineJoin)
        this.lineJoin = lineJoin;
    if (typeof miterLimit === 'number')
        this.miterLimit = miterLimit;
};
AWT.Stroke.prototype = {
    constructor: AWT.Stroke,
    lineWidth: 1,
    lineCap: 'butt',
    lineJoin: 'miter',
    miterLimit: 10,
    setStroke: function (ctx) {
        ctx.lineWidth = this.lineWidth;
        ctx.lineCap = this.lineCap;
        ctx.lineJoin = this.lineJoin;
        ctx.miterLimit = this.miterLimit;
        return ctx;
    }
};
AWT.Point = function (x, y) {
    if (x instanceof AWT.Point) {
        this.x = x.x;
        this.y = x.y;
    } else {
        this.x = x ? x : 0;
        this.y = y ? y : 0;
    }
};
AWT.Point.prototype = {
    constructor: AWT.Point,
    x: 0,
    y: 0,
    setProperties: function ($xml) {
        this.x = Number($xml.attr('x'));
        this.y = Number($xml.attr('y'));
        return this;
    },
    moveBy: function (delta) {
        this.x += delta.x ? delta.x : delta.width ? delta.width : 0;
        this.y += delta.y ? delta.y : delta.height ? delta.height : 0;
        return this;
    },
    moveTo: function (newPos, y) {
        if (typeof newPos === 'number') {
            this.x = newPos;
            this.y = y;
        } else {
            this.x = newPos.x;
            this.y = newPos.y;
        }
        return this;
    },
    multBy: function (delta) {
        this.x *= delta.x ? delta.x : delta.width ? delta.width : 0;
        this.y *= delta.y ? delta.y : delta.height ? delta.height : 0;
        return this;
    },
    equals: function (p) {
        return this.x === p.x && this.y === p.y;
    },
    distanceTo: function (point) {
        return Math.sqrt(Math.pow(this.x - point.x, 2), Math.pow(this.y - point.y, 2));
    },
    clone: function () {
        return new AWT.Point(this);
    }
};
AWT.Dimension = function (w, h) {
    if (w instanceof AWT.Point && h instanceof AWT.Point) {
        this.width = h.x - w.x;
        this.height = h.y - w.y;
    } else {
        this.width = w ? w : 0;
        this.height = h ? h : 0;
    }
};
AWT.Dimension.prototype = {
    constructor: AWT.Dimension,
    width: 0,
    height: 0,
    setProperties: function ($xml) {
        this.width = Number($xml.attr('width'));
        this.height = Number($xml.attr('height'));
        return this;
    },
    equals: function (d) {
        return this.width === d.width && this.height === d.height;
    },
    multBy: function (delta) {
        this.width *= delta.x ? delta.x : delta.width ? delta.width : 0;
        this.height *= delta.y ? delta.y : delta.height ? delta.height : 0;
        return this;
    },
    setDimension: function (width, height) {
        if (width instanceof AWT.Dimension) {
            height = width.height;
            width = width.width;
        }
        this.width = width;
        this.height = height;
        return this;
    },
    getSurface: function () {
        return this.width * this.height;
    }
};
AWT.Shape = function (pos) {
    this.pos = pos ? pos : new AWT.Point();
};
AWT.Shape.prototype = {
    constructor: AWT.Shape,
    pos: new AWT.Point(),
    moveBy: function (delta) {
        this.pos.moveBy(delta);
        return this;
    },
    moveTo: function (newPos) {
        this.pos.moveTo(newPos);
        return this;
    },
    getBounds: function () {
        return new AWT.Rectangle(this.pos);
    },
    equals: function (p) {
        return this.pos.equals(p.pos);
    },
    scaleBy: function (delta) {
        return this;
    },
    getShape: function (rect) {
        var newShape = this.clone();
        return newShape.scaleBy(rect.dim).moveBy(rect.pos);
    },
    contains: function (p) {
        return false;
    },
    intersects: function (r) {
        return false;
    },
    fill: function (ctx, dirtyRegion) {
        ctx.save();
        if (dirtyRegion && dirtyRegion.getSurface() > 0) {
            ctx.beginPath();
            ctx.rect(dirtyRegion.pos.x, dirtyRegion.pos.y, dirtyRegion.dim.width, dirtyRegion.dim.height);
            ctx.clip();
        }
        this.preparePath(ctx);
        ctx.fill();
        ctx.restore();
        return ctx;
    },
    stroke: function (ctx) {
        this.preparePath(ctx);
        ctx.stroke();
        return ctx;
    },
    preparePath: function (ctx) {
        return ctx;
    },
    clip: function (ctx, fillRule) {
        this.preparePath(ctx);
        ctx.clip(fillRule ? fillRule : 'nonzero');
        return ctx;
    },
    isRect: function () {
        return false;
    }
};
AWT.Rectangle = function (pos, dim, w, h) {
    var p = pos, d = dim;
    if (pos instanceof AWT.Rectangle) {
        d = new AWT.Dimension(pos.dim.width, pos.dim.height);
        p = new AWT.Point(pos.pos.x, pos.pos.y);
    } else if (pos instanceof AWT.Point) {
        p = new AWT.Point(pos.x, pos.y);
        if (dim instanceof AWT.Dimension)
            d = new AWT.Dimension(dim.width, dim.height);
    } else if (pos instanceof Array) {
        p = new AWT.Point(pos[0], pos[1]);
        d = new AWT.Dimension(pos[2] - pos[0], pos[3] - pos[1]);
    } else if (typeof w === 'number' && typeof h === 'number') {
        p = new AWT.Point(pos, dim);
        d = new AWT.Dimension(w, h);
    }
    AWT.Shape.call(this, p);
    if (d instanceof AWT.Dimension)
        this.dim = d;
    else if (d instanceof AWT.Point)
        this.dim = new AWT.Dimension(d.x - this.pos.x, d.y - this.pos.y);
    else
        this.dim = new AWT.Dimension();
};
AWT.Rectangle.prototype = {
    constructor: AWT.Rectangle,
    dim: new AWT.Dimension(),
    getBounds: function () {
        return this;
    },
    setBounds: function (rect) {
        if (!rect)
            rect = new AWT.Rectangle();
        this.pos.x = rect.pos.x;
        this.pos.y = rect.pos.y;
        this.dim.width = rect.dim.width;
        this.dim.height = rect.dim.height;
        return this;
    },
    equals: function (r) {
        return r instanceof AWT.Rectangle && this.pos.equals(r.pos) && this.dim.equals(r.dim);
    },
    clone: function () {
        return new AWT.Rectangle(this);
    },
    scaleBy: function (delta) {
        this.pos.multBy(delta);
        this.dim.multBy(delta);
        return this;
    },
    grow: function (dx, dy) {
        this.pos.x -= dx;
        this.pos.y -= dy;
        this.dim.width += 2 * dx;
        this.dim.height += 2 * dy;
        return this;
    },
    getOppositeVertex: function () {
        return new AWT.Point(this.pos.x + this.dim.width, this.pos.y + this.dim.height);
    },
    add: function (shape) {
        var myP2 = this.getOppositeVertex();
        var rectP2 = shape.getBounds().getOppositeVertex();
        this.pos.moveTo(Math.min(this.pos.x, shape.getBounds().pos.x), Math.min(this.pos.y, shape.getBounds().pos.y));
        this.dim.setDimension(Math.max(myP2.x, rectP2.x) - this.pos.x, Math.max(myP2.y, rectP2.y) - this.pos.y);
        return this;
    },
    contains: function (p) {
        var p2 = this.getOppositeVertex();
        return p.x >= this.pos.x && p.x <= p2.x && p.y >= this.pos.y && p.y <= p2.y;
    },
    intersects: function (r) {
        var p1 = this.pos, p2 = this.getOppositeVertex();
        var r1 = r.pos, r2 = r.getOppositeVertex();
        return r2.x >= p1.x && r1.x <= p2.x && r2.y >= p1.y && r1.y <= p2.y;
    },
    preparePath: function (ctx) {
        ctx.beginPath();
        ctx.rect(this.pos.x, this.pos.y, this.dim.width, this.dim.height);
        return ctx;
    },
    getSurface: function () {
        return this.dim.getSurface();
    },
    isEmpty: function () {
        return this.getSurface() === 0;
    },
    isRect: function () {
        return true;
    }
};
AWT.Rectangle.prototype = $.extend(Object.create(AWT.Shape.prototype), AWT.Rectangle.prototype);
AWT.Ellipse = function (pos, dim, w, h) {
    AWT.Rectangle.call(this, pos, dim, w, h);
};
AWT.Ellipse.prototype = {
    constructor: AWT.Ellipse,
    preparePath: function (ctx) {
        var kappa = 0.5522848, ox = this.dim.width / 2 * kappa, oy = this.dim.height / 2 * kappa, xe = this.pos.x + this.dim.width, ye = this.pos.y + this.dim.height, xm = this.pos.x + this.dim.width / 2, ym = this.pos.y + this.dim.height / 2;
        ctx.beginPath();
        ctx.moveTo(this.pos.x, ym);
        ctx.bezierCurveTo(this.pos.x, ym - oy, xm - ox, this.pos.y, xm, this.pos.y);
        ctx.bezierCurveTo(xm + ox, this.pos.y, xe, ym - oy, xe, ym);
        ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
        ctx.bezierCurveTo(xm - ox, ye, this.pos.x, ym + oy, this.pos.x, ym);
        ctx.closePath();
        return ctx;
    },
    getSurface: function () {
        return Math.PI * this.dim.width / 2 * this.dim.height / 2;
    },
    equals: function (e) {
        return e instanceof AWT.Ellipse && AWT.Rectangle.prototype.equals.call(this, e);
    },
    clone: function () {
        return new AWT.Ellipse(this.pos, this.dim);
    },
    isRect: function () {
        return false;
    }
};
AWT.Ellipse.prototype = $.extend(Object.create(AWT.Rectangle.prototype), AWT.Ellipse.prototype);
AWT.Path = function (strokes) {
    if (strokes) {
        this.strokes = [];
        for (var n in strokes) {
            var str = strokes[n];
            str = new AWT.PathStroke(str.type ? str.type : str.action, str.points ? str.points : str.data);
            this.strokes.push(str);
        }
    }
    this.enclosing = new AWT.Rectangle();
    this.calcEnclosingRect();
    AWT.Shape.call(this, this.enclosing.pos);
};
AWT.Path.prototype = {
    constructor: AWT.Path,
    strokes: [],
    enclosing: new AWT.Rectangle(),
    clone: function () {
        var str = [];
        for (var i = 0; i < this.strokes.length; i++)
            str[i] = this.strokes[i].clone();
        return new AWT.Path(str);
    },
    addStroke: function (stroke) {
        this.strokes.push(stroke);
        return this;
    },
    calcEnclosingRect: function () {
        var p0, p1;
        for (var n in this.strokes) {
            var str = this.strokes[n];
            if (str.points)
                for (var m in str.points) {
                    var p = str.points[m];
                    if (!p0 || !p1) {
                        p0 = new AWT.Point(p);
                        p1 = new AWT.Point(p);
                    } else {
                        p0.x = Math.min(p.x, p0.x);
                        p0.y = Math.min(p.y, p0.y);
                        p1.x = Math.max(p.x, p1.x);
                        p1.y = Math.max(p.y, p1.y);
                    }
                }
        }
        this.enclosing.setBounds(new AWT.Rectangle(p0, new AWT.Dimension(p0, p1)));
        return this.enclosing;
    },
    getBounds: function () {
        return this.enclosing;
    },
    moveBy: function (delta) {
        for (var str in this.strokes)
            this.strokes[str].moveBy(delta);
        this.enclosing.moveBy(delta);
        return this;
    },
    moveTo: function (newPos) {
        var d = new AWT.Dimension(newPos.x - this.pos.x, newPos.y - this.pos.y);
        return this.moveBy(d);
    },
    equals: function (p) {
        return false;
    },
    scaleBy: function (delta) {
        for (var str in this.strokes)
            this.strokes[str].multBy(delta);
        this.enclosing.scaleBy(delta);
        return this;
    },
    contains: function (p) {
        return this.enclosing.contains(p);
    },
    intersects: function (r) {
        return this.enclosing.intersects(r);
    },
    preparePath: function (ctx) {
        ctx.beginPath();
        for (var n in this.strokes)
            this.strokes[n].stroke(ctx);
        return ctx;
    }
};
AWT.Path.prototype = $.extend(Object.create(AWT.Shape.prototype), AWT.Path.prototype);
AWT.PathStroke = function (type, points) {
    this.type = type;
    if (points && points.length > 0) {
        this.points = [];
        if (points[0] instanceof AWT.Point) {
            for (var p in points)
                this.points.push(new AWT.Point(points[p].x, points[p].y));
        } else {
            for (var i = 0; i < points.length; i += 2)
                this.points.push(new AWT.Point(points[i], points[i + 1]));
        }
    }
};
AWT.PathStroke.prototype = {
    constructor: AWT.PathStroke,
    type: 'X',
    points: null,
    clone: function () {
        return new AWT.PathStroke(this.type, this.points);
    },
    moveBy: function (delta) {
        if (this.points)
            for (var p in this.points)
                this.points[p].moveBy(delta);
        return this;
    },
    multBy: function (delta) {
        if (this.points)
            for (var p in this.points)
                this.points[p].multBy(delta);
        return this;
    },
    stroke: function (ctx) {
        switch (this.type) {
        case 'M':
            ctx.moveTo(this.points[0].x, this.points[0].y);
            break;
        case 'L':
            ctx.lineTo(this.points[0].x, this.points[0].y);
            break;
        case 'Q':
            ctx.quadraticCurveTo(this.points[0].x, this.points[0].y, this.points[1].x, this.points[1].y);
            break;
        case 'B':
            ctx.bezierCurveTo(this.points[0].x, this.points[0].y, this.points[1].x, this.points[1].y, this.points[2].x, this.points[2].y);
            break;
        case 'X':
            ctx.closePath();
            break;
        }
        return ctx;
    }
};
AWT.Action = function (name, actionPerformed) {
    this.name = name;
    this.actionPerformed = actionPerformed;
    this._statusListeners = [];
};
AWT.Action.prototype = {
    constructor: AWT.Action,
    name: null,
    description: null,
    enabled: false,
    _statusListeners: null,
    actionPerformed: function (thisAction, event) {
        return this;
    },
    processEvent: function (event) {
        return this.actionPerformed(this, event);
    },
    addStatusListener: function (listener) {
        this._statusListeners.push(listener);
    },
    removeStatusListener: function (listener) {
        this._statusListeners = $.grep(_statusListeners, function (item) {
            return item !== listener;
        });
    },
    setEnabled: function (enabled) {
        this.enabled = enabled;
        for (var i = 0; i < this._statusListeners.length; i++)
            this._statusListeners[i].call(this);
        return this;
    }
};
AWT.Timer = function (actionPerformed, interval, enabled) {
    this.actionPerformed = actionPerformed;
    this.interval = interval;
    this.setEnabled(enabled ? true : false);
};
AWT.Timer.prototype = {
    constructor: AWT.Timer,
    interval: 0,
    ticks: 0,
    timer: null,
    repeats: true,
    actionPerformed: function (thisTimer) {
        return this;
    },
    processTimer: function (event) {
        this.ticks++;
        if (!this.repeats)
            this.stop();
        return this.actionPerformed.call(this);
    },
    setEnabled: function (enabled, retainCounter) {
        if (!retainCounter)
            this.ticks = 0;
        if (enabled && this.timer !== null) {
            return;
        }
        if (enabled) {
            var self = this;
            this.timer = window.setInterval(function () {
                self.processTimer(null);
            }, this.interval);
        } else {
            if (this.timer !== null) {
                window.clearInterval(this.timer);
                this.timer = null;
            }
        }
        return this;
    },
    isRunning: function () {
        return this.timer !== null;
    },
    start: function (retainCounter) {
        return this.setEnabled(true, retainCounter);
    },
    stop: function (retainCounter) {
        return this.setEnabled(false, retainCounter);
    }
};
AWT.Container = function (pos, dim, w, h) {
    AWT.Rectangle.call(this, pos, dim, w, h);
};
AWT.Container.prototype = {
    constructor: AWT.Container,
    invalidatedRect: null,
    invalidate: function (rect) {
        if (rect) {
            if (this.invalidatedRect === null)
                this.invalidatedRect = rect.clone();
            else
                this.invalidatedRect.add(rect);
        } else
            this.invalidatedRect = null;
        return this;
    },
    update: function () {
        this.updateContent(this.invalidatedRect);
        if (this.invalidatedRect)
            this.invalidatedRect = null;
        return this;
    },
    updateContent: function (dirtyRegion) {
        return this;
    }
};
AWT.Container.prototype = $.extend(Object.create(AWT.Rectangle.prototype), AWT.Container.prototype);
module.exports = AWT;
},{"./Utils":53,"jquery":5}],48:[function(require,module,exports){
var $ = require('jquery'), Utils = require('./Utils'), AWT = require('./AWT'), EventSounds = require('./media/EventSounds'), ActiveBoxContent = require('./boxes/ActiveBoxContent'), ActiveBagContent = require('./boxes/ActiveBagContent'), BoxBase = require('./boxes/BoxBase'), AutoContentProvider = require('./automation/AutoContentProvider'), TextGridContent = require('./boxes/TextGridContent'), Evaluator = require('./activities/text/Evaluator'), TextActivityDocument = require('./activities/text/TextActivityDocument');
var K = Utils.settings;
var TOUCH_TEST_EVENT = 'touchstart';
var Activity = function (project) {
    this.project = project;
    this.eventSounds = new EventSounds(this.project.settings.eventSounds);
    this.messages = {};
    this.abc = {};
};
Activity.CLASSES = { '@panels.Menu': Activity };
Activity.getActivity = function ($xml, project) {
    var act = null;
    if ($xml && project) {
        var className = $xml.attr('class');
        var cl = Activity.CLASSES[className];
        if (cl) {
            act = new cl(project);
            act.setProperties($xml);
        } else
            console.log('[JClic] Unknown activity class: ' + className);
    }
    return act;
};
Activity.prototype = {
    constructor: Activity,
    project: null,
    name: K.DEFAULT_NAME,
    className: null,
    code: null,
    type: null,
    description: null,
    margin: K.DEFAULT_MARGIN,
    bgColor: K.DEFAULT_BG_COLOR,
    bgGradient: null,
    tiledBgImg: false,
    bgImageFile: null,
    border: true,
    absolutePositioned: false,
    absolutePosition: null,
    includeInReports: true,
    reportActions: false,
    helpWindow: false,
    showSolution: false,
    helpMsg: '',
    eventSounds: null,
    useOrder: false,
    dragCells: false,
    skinFileName: null,
    maxTime: 0,
    countDownTime: false,
    maxActions: 0,
    countDownActions: false,
    infoUrl: null,
    infoCmd: null,
    messages: null,
    windowSize: new AWT.Dimension(K.DEFAULT_WIDTH, K.DEFAULT_HEIGHT),
    transparentBg: false,
    activityBgColor: K.DEFAULT_BG_COLOR,
    activityBgGradient: null,
    bTimeCounter: true,
    bScoreCounter: true,
    bActionsCounter: true,
    acp: null,
    abc: null,
    tgc: null,
    boxGridPos: 'AB',
    shuffles: K.DEFAULT_SHUFFLES,
    scramble: {
        primary: true,
        secondary: true
    },
    invAss: false,
    setProperties: function ($xml) {
        var act = this;
        $.each($xml.get(0).attributes, function () {
            var name = this.name;
            var val = this.value;
            switch (name) {
            case 'name':
            case 'code':
            case 'type':
            case 'description':
                act[name] = val;
                break;
            case 'class':
                act.className = val;
                break;
            case 'inverse':
                act.invAss = Utils.getBoolean(val, false);
                break;
            case 'autoJump':
            case 'forceOkToAdvance':
            case 'amongParagraphs':
                act[name] = Utils.getBoolean(val, false);
                break;
            }
        });
        $xml.children().each(function () {
            var $node = $(this);
            switch (this.nodeName) {
            case 'settings':
                $.each($node.get(0).attributes, function () {
                    var name = this.name;
                    var val = this.value;
                    switch (name) {
                    case 'infoUrl':
                    case 'infoCmd':
                        act[name] = val;
                        break;
                    case 'margin':
                    case 'maxTime':
                    case 'maxActions':
                        act[name] = Number(val);
                        break;
                    case 'report':
                        act['includeInReports'] = Utils.getBoolean(val, false);
                        break;
                    case 'countDownTime':
                    case 'countDownActions':
                    case 'reportActions':
                    case 'useOrder':
                    case 'dragCells':
                        act[name] = Utils.getBoolean(val, false);
                        break;
                    }
                });
                $node.children().each(function () {
                    var $node = $(this);
                    switch (this.nodeName) {
                    case 'skin':
                        act.skinFileName = $node.attr('file');
                        break;
                    case 'helpWindow':
                        act.helpMsg = Utils.getXmlText(this);
                        act.showSolution = Utils.getBoolean($node.attr('showSolution'), false);
                        act.helpWindow = act.helpMsg !== null || act.showSolution;
                        break;
                    case 'container':
                        act.bgColor = Utils.checkColor($node.attr('bgColor'), Utils.settings.BoxBase.BACK_COLOR);
                        $node.children().each(function () {
                            var $child = $(this);
                            switch (this.nodeName) {
                            case 'image':
                                act.bgImageFile = $child.attr('name');
                                act.tiledBgImg = Utils.getBoolean($child.attr('tiled'), false);
                                break;
                            case 'counters':
                                act.bTimeCounter = Utils.getBoolean($child.attr('time'), true);
                                act.bActionsCounter = Utils.getBoolean($child.attr('actions'), true);
                                act.bScoreCounter = Utils.getBoolean($child.attr('score'), true);
                                break;
                            case 'gradient':
                                act.bgGradient = new AWT.Gradient().setProperties($child);
                                break;
                            }
                        });
                        break;
                    case 'window':
                        act.activityBgColor = Utils.checkColor($node.attr('bgColor'), K.DEFAULT_BG_COLOR);
                        act.transparentBg = Utils.getBoolean($node.attr('transparent'), false);
                        act.border = Utils.getBoolean($node.attr('border'), false);
                        $node.children().each(function () {
                            var $child = $(this);
                            switch (this.nodeName) {
                            case 'gradient':
                                act.activityBgGradient = new AWT.Gradient().setProperties($child);
                                break;
                            case 'position':
                                act.absolutePosition = new AWT.Point().setProperties($child);
                                act.absolutePositioned = true;
                                break;
                            case 'size':
                                act.windowSize = new AWT.Dimension().setProperties($child);
                                break;
                            }
                        });
                        break;
                    case 'eventSounds':
                        act.eventSounds.setProperties($node);
                        break;
                    }
                });
                break;
            case 'messages':
                $node.children('cell').each(function () {
                    var m = act.readMessage($(this));
                    act.messages[m.type] = m;
                });
                break;
            case 'automation':
                act.acp = AutoContentProvider.getProvider($node, act.project);
                break;
            case 'cells':
                var cellSet = new ActiveBagContent().setProperties($node, act.project.mediaBag);
                act.abc[cellSet.id] = cellSet;
                break;
            case 'scramble':
                act.shuffles = Number($node.attr('times'));
                act.scramble.primary = Utils.getBoolean($node.attr('primary'));
                act.scramble.secondary = Utils.getBoolean($node.attr('secondary'));
                break;
            case 'layout':
                $.each($node.get(0).attributes, function () {
                    var name = this.name;
                    var value = this.value;
                    switch (name) {
                    case 'position':
                        act.boxGridPos = value;
                        break;
                    case 'wildTransparent':
                    case 'upperCase':
                    case 'checkCase':
                        act[name] = Utils.getBoolean(value);
                    }
                });
                break;
            case 'textGrid':
                act.tgc = new TextGridContent().setProperties($node);
                break;
            case 'clues':
                act.clues = [];
                act.clueItems = [];
                var i = 0;
                $node.children('clue').each(function () {
                    act.clueItems[i] = Number($(this).attr('id'));
                    act.clues[i] = this.textContent;
                    i++;
                });
                break;
            case 'checkButton':
                act.checkButtonText = this.textContent;
                break;
            case 'prevScreen':
                $node.children().each(function () {
                    switch (this.nodeName) {
                    case 'style':
                        act.prevScreenStyle = new BoxBase().setProperties($(this));
                        break;
                    case 'p':
                        if (act.prevScreenText === null)
                            act.prevScreenText = '';
                        act.prevScreenText += '<p>' + this.textContent + '</p>';
                        break;
                    }
                });
                break;
            case 'evaluator':
                act.ev = Evaluator.getEvaluator($node);
                break;
            case 'document':
                act.document = new TextActivityDocument().setProperties($node, act.project.mediaBag);
                break;
            }
        });
        return this;
    },
    readMessage: function ($xml) {
        var msg = new ActiveBoxContent().setProperties($xml, this.project.mediaBag);
        msg.type = $xml.attr('type');
        if (Utils.isNullOrUndef(msg.bb))
            msg.bb = new BoxBase(null);
        return msg;
    },
    initAutoContentProvider: function () {
        if (this.acp !== null)
            this.acp.init();
    },
    prepareMedia: function (ps) {
        if (this.eventSounds !== null)
            this.eventSounds.realize(this.project.mediaBag);
        $.each(this.messages, function (key, msg) {
            if (msg !== null)
                msg.prepareMedia(ps);
        });
        $.each(this.abc, function (key, abc) {
            if (abc !== null)
                abc.prepareMedia(ps);
        });
        return true;
    },
    helpSolutionAllowed: function () {
        return false;
    },
    helpWindowAllowed: function () {
        return this.helpWindow && (this.helpSolutionAllowed() && this.showSolution || this.helpMsg !== null);
    },
    getMinNumActions: function () {
        return 0;
    },
    mustPauseSequence: function () {
        return this.getMinNumActions() !== 0;
    },
    canReinit: function () {
        return true;
    },
    hasInfo: function () {
        return this.infoUrl !== null && this.infoUrl.length > 0 || this.infoCmd !== null && this.infoCmd.length > 0;
    },
    hasRandom: function () {
        return false;
    },
    shuffleAlways: function () {
        return false;
    },
    needsKeyboard: function () {
        return false;
    },
    end: function () {
        if (this.eventSounds !== null) {
            this.eventSounds.close();
            this.eventSounds = null;
        }
        this.clear();
    },
    clear: function () {
    },
    getWindowSize: function () {
        return new AWT.Dimension(this.windowSize);
    },
    setWindowSize: function (windowSize) {
        this.windowSize = new AWT.Dimension(windowSize);
    },
    getActivityPanel: function (ps) {
        return new this.constructor.Panel(this, ps);
    }
};
Activity.Panel = function (act, ps, $div) {
    AWT.Container.call(this);
    this.act = act;
    this.ps = ps;
    this.minimumSize = new AWT.Dimension(100, 100);
    this.preferredSize = new AWT.Dimension(500, 400);
    if ($div)
        this.$div = $div;
    else
        this.$div = $('<div class="JClicActivity"/>');
    this.act.initAutoContentProvider();
};
Activity.Panel.prototype = {
    constructor: Activity.Panel,
    act: null,
    $div: null,
    skin: null,
    solved: false,
    bgImage: null,
    playing: false,
    firstRun: true,
    currentItem: 0,
    bc: null,
    ps: null,
    minimumSize: null,
    preferredSize: null,
    events: ['click'],
    backgroundColor: null,
    backgroundTransparent: false,
    border: null,
    setBounds: function (rect) {
        this.invalidate(rect);
        this.$div.css({
            position: 'relative',
            left: rect.pos.x,
            top: rect.pos.y,
            width: rect.dim.width,
            height: rect.dim.height
        });
    },
    buildVisualComponents: function () {
        this.playing = false;
        this.skin = null;
        if (this.act.skinFileName && this.act.skinFileName.length > 0)
            this.skin = this.act.project.mediaBag.getSkinElement(this.act.skinFileName);
        this.bgImage = null;
        if (this.act.bgImageFile && this.act.bgImageFile.length > 0) {
            var mbe = this.act.project.mediaBag.getElement(this.act.bgImageFile, true);
            if (mbe)
                this.bgImage = mbe.data;
        }
        this.backgroundColor = this.act.activityBgColor;
        if (this.act.transparentBg)
            this.backgroundTransparent = true;
        if (this.act.border)
            this.border = true;
        var cssAct = {
                display: 'block',
                'background-color': this.backgroundTransparent ? 'transparent' : this.backgroundColor
            };
        if (this.border) {
            cssAct['box-shadow'] = '0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12)';
            cssAct['border-radius'] = '2px';
            cssAct['color'] = '#272727';
        }
        if (this.act.activityBgGradient) {
            cssAct['background-image'] = this.act.activityBgGradient.getCss();
        }
        this.$div.css(cssAct);
    },
    updateContent: function (dirtyRegion) {
        return AWT.Container.prototype.updateContent.call(this, dirtyRegion);
    },
    playEvent: function (event) {
        if (this.act.eventSounds)
            this.act.eventSounds.play(event);
    },
    initActivity: function () {
        if (this.playing) {
            this.playing = false;
            this.ps.reportEndActivity(this.act, this.solved);
        }
        this.solved = false;
        this.ps.reportNewActivity(this.act, 0);
        this.attachEvents();
        this.ps.startActivity();
        this.enableCounters();
    },
    startActivity: function () {
        var msg = this.act.messages['initial'];
        if (msg)
            this.ps.setMsg(msg);
        this.playing = true;
    },
    activityReady: function () {
    },
    showHelp: function () {
    },
    setDimension: function (maxSize) {
        return new AWT.Dimension(Math.min(maxSize.width, this.act.windowSize.width), Math.min(maxSize.height, this.act.windowSize.height));
    },
    attachEvents: function () {
        for (var i = 0; i < this.events.length; i++) {
            this.attachEvent(this.$div, this.events[i]);
        }
        if (!K.TOUCH_DEVICE && $.inArray(TOUCH_TEST_EVENT, this.events) === -1)
            this.attachEvent(this.$div, TOUCH_TEST_EVENT);
    },
    attachEvent: function ($obj, evt) {
        var thisAct = this;
        $obj.on(evt, this, function (event) {
            if (event.type === TOUCH_TEST_EVENT) {
                if (!K.TOUCH_DEVICE)
                    K.TOUCH_DEVICE = true;
                if ($.inArray(TOUCH_TEST_EVENT, thisAct.events) === -1) {
                    $obj.off(TOUCH_TEST_EVENT);
                    return;
                }
            }
            return event.data.processEvent.call(event.data, event);
        });
    },
    processEvent: function (event) {
        if (this.playing)
            console.log('[JClic] Event fired: ' + event.type);
        return false;
    },
    fitTo: function (proposed, bounds) {
        var origin = new AWT.Point();
        if (this.act.absolutePositioned && this.act.absolutePosition !== null) {
            origin.x = Math.max(0, this.act.absolutePosition.x + proposed.pos.x);
            origin.y = Math.max(0, this.act.absolutePosition.y + proposed.pos.y);
            proposed.dim.width -= this.act.absolutePosition.x;
            proposed.dim.height -= this.act.absolutePosition.y;
        }
        var d = this.setDimension(new AWT.Dimension(Math.max(2 * this.act.margin + Utils.settings.MINIMUM_WIDTH, proposed.dim.width), Math.max(2 * this.act.margin + Utils.settings.MINIMUM_HEIGHT, proposed.dim.height)));
        if (!this.act.absolutePositioned) {
            origin.moveTo(Math.max(0, proposed.pos.x + (proposed.dim.width - d.width) / 2), Math.max(0, proposed.pos.y + (proposed.dim.height - d.height) / 2));
        }
        if (origin.x + d.width > bounds.dim.width)
            origin.x = Math.max(0, bounds.dim.width - d.width);
        if (origin.y + d.height > bounds.dim.height)
            origin.y = Math.max(0, bounds.dim.height - d.height);
        this.setBounds(new AWT.Rectangle(origin.x, origin.y, d.width, d.height));
    },
    forceFinishActivity: function () {
    },
    finishActivity: function (result) {
        this.playing = false;
        this.solved = result;
        if (this.bc !== null)
            this.bc.end();
        if (result) {
            this.setAndPlayMsg('final', 'finishedOk');
        } else {
            this.setAndPlayMsg('finalError', 'finishedError');
        }
        this.ps.activityFinished(this.solved);
        this.ps.reportEndActivity(this.act, this.solved);
    },
    setAndPlayMsg: function (msgCode, eventSoundsCode) {
        var msg = this.act.messages[msgCode];
        if (!msg)
            msg = null;
        this.ps.setMsg(msg);
        if (msg === null || msg.mediaContent === null)
            this.playEvent(eventSoundsCode);
        else
            this.ps.playMsg();
    },
    end: function () {
        this.forceFinishActivity();
        if (this.playing) {
            if (this.bc !== null)
                this.bc.end();
            this.ps.reportEndActivity(this.act, this.solved);
            this.playing = false;
            this.solved = false;
        }
        this.clear();
    },
    clear: function () {
    },
    enableCounters: function (eTime, eScore, eActions) {
        if (typeof eTime === 'undefined')
            eTime = this.act.bTimeCounter;
        if (typeof eScore === 'undefined')
            eTime = this.act.bScoreCounter;
        if (typeof eActions === 'undefined')
            eTime = this.act.bActionsCounter;
        this.ps.setCounterEnabled('time', eTime);
        if (this.act.countDownTime)
            this.ps.setCountDown('time', this.act.maxTime);
        this.ps.setCounterEnabled('score', eScore);
        this.ps.setCounterEnabled('actions', eActions);
        if (this.act.countDownActions)
            this.ps.setCountDown('actions', this.act.maxActions);
    },
    shuffle: function (bg, visible, fitInArea) {
        var steps = this.act.shuffles;
        var i = steps;
        while (i > 0) {
            var k = i > steps ? steps : i;
            for (var b = 0; b < bg.length; b++) {
                var abb = bg[b];
                if (abb !== null)
                    abb.scrambleCells(k, fitInArea);
            }
            i -= steps;
        }
    }
};
Activity.Panel.prototype = $.extend(Object.create(AWT.Container.prototype), Activity.Panel.prototype);
module.exports = Activity;
},{"./AWT":47,"./Utils":53,"./activities/text/Evaluator":64,"./activities/text/TextActivityDocument":69,"./automation/AutoContentProvider":73,"./boxes/ActiveBagContent":83,"./boxes/ActiveBoxContent":86,"./boxes/BoxBase":89,"./boxes/TextGridContent":92,"./media/EventSounds":95,"jquery":5}],49:[function(require,module,exports){
var a = require('./skins/DefaultSkin'), b = require('./shapers/Rectangular'), c = require('./shapers/Holes'), d = require('./shapers/JigSaw'), e = require('./shapers/TriangularJigSaw'), f = require('./shapers/ClassicJigSaw'), g = require('./automation/arith/Arith'), h = require('./activities/text/TextActivityBase'), i = require('./activities/text/FillInBlanks'), j = require('./activities/text/OrderText'), k = require('./activities/text/Complete'), l = require('./activities/text/IdentifyText'), m = require('./activities/text/WrittenAnswer'), n = require('./activities/panels/InformationScreen'), o = require('./activities/panels/Identify'), p = require('./activities/panels/Explore'), q = require('./activities/puzzles/DoublePuzzle'), r = require('./activities/puzzles/ExchangePuzzle'), s = require('./activities/puzzles/HolePuzzle'), t = require('./activities/memory/MemoryGame'), u = require('./activities/associations/SimpleAssociation'), v = require('./activities/associations/ComplexAssociation'), w = require('./activities/textGrid/WordSearch'), x = require('./activities/textGrid/CrossWord');
module.exports = 'Deep classes loaded!';
},{"./activities/associations/ComplexAssociation":54,"./activities/associations/SimpleAssociation":55,"./activities/memory/MemoryGame":56,"./activities/panels/Explore":57,"./activities/panels/Identify":58,"./activities/panels/InformationScreen":59,"./activities/puzzles/DoublePuzzle":60,"./activities/puzzles/ExchangePuzzle":61,"./activities/puzzles/HolePuzzle":62,"./activities/text/Complete":63,"./activities/text/FillInBlanks":65,"./activities/text/IdentifyText":66,"./activities/text/OrderText":67,"./activities/text/TextActivityBase":68,"./activities/text/WrittenAnswer":70,"./activities/textGrid/CrossWord":71,"./activities/textGrid/WordSearch":72,"./automation/arith/Arith":74,"./shapers/ClassicJigSaw":100,"./shapers/Holes":101,"./shapers/JigSaw":102,"./shapers/Rectangular":103,"./shapers/TriangularJigSaw":105,"./skins/DefaultSkin":106}],50:[function(require,module,exports){
var $ = require('jquery'), JClicPlayer = require('./JClicPlayer'), JClicProject = require('./project/JClicProject'), AWT = require('./AWT'), Utils = require('./Utils'), deps = require('./Deps');
var JClicObject = {
        JClicPlayer: JClicPlayer,
        JClicProject: JClicProject,
        AWT: AWT,
        Utils: Utils
    };
$(function () {
    var options = typeof JClicDataOptions === 'undefined' ? {} : JClicDataOptions;
    JClicObject.options = options;
    window.JClicObject = JClicObject;
    if (!options.noInit) {
        var projectName = typeof JClicDataProject === 'undefined' ? null : JClicDataProject;
        var $JClicDivs = $('div.JClic');
        $JClicDivs.each(function () {
            var $div = $(this);
            var prj = $div.data('project');
            if (prj)
                projectName = prj;
            var opt = $div.data('options');
            if (opt)
                options = $.extend(Object.create(options), opt);
            var player = new JClicPlayer($div, options);
            if (projectName)
                player.load(projectName);
            $(window).resize(function () {
                if (player.skin)
                    player.skin.fit();
            });
        });
    }
});
module.exports = JClicObject;
},{"./AWT":47,"./Deps":49,"./JClicPlayer":51,"./Utils":53,"./project/JClicProject":98,"jquery":5}],51:[function(require,module,exports){
var $ = require('jquery'), JSZip = require('jszip'), JSZipUtils = require('jszip-utils'), Utils = require('./Utils'), AWT = require('./AWT'), PlayerHistory = require('./PlayerHistory'), ActiveMediaBag = require('./media/ActiveMediaBag'), Skin = require('./skins/Skin'), EventSounds = require('./media/EventSounds'), JClicProject = require('./project/JClicProject'), JumpInfo = require('./bags/JumpInfo'), ActiveBoxContent = require('./boxes/ActiveBoxContent');
var JClicPlayer = function ($topDiv, options) {
    AWT.Container.call(this);
    if (!options)
        options = {};
    this.$topDiv = $topDiv;
    if (!options.height && !options.width) {
        if ($topDiv.height() > 0) {
            options.height = $topDiv.height();
            options.width = $topDiv.width();
        } else if (typeof options.autoFit === 'undefined')
            options.autoFit = true;
    }
    this.options = $.extend(Object.create(this.options), options);
    this.$div = $('<div class="JClicPlayer"/>');
    this.project = new JClicProject();
    this.activeMediaBag = new ActiveMediaBag();
    this.counterVal = {
        score: 0,
        actions: 0,
        time: 0
    };
    this.bgImageOrigin = new AWT.Point();
    this.buildActions();
    this.history = new PlayerHistory(this);
    this.audioEnabled = this.options.audioEnabled;
    this.navButtonsAlways = this.options.navButtonsAlways;
    this.defaultSkin = Skin.prototype.getSkin(null, this, this.$topDiv);
    this.setSkin(this.defaultSkin);
    this.createEventSounds();
    this.initTimers();
    this.setSystemMessage('ready');
};
JClicPlayer.prototype = {
    constructor: JClicPlayer,
    options: {
        maxWaitTime: 120000,
        infoUrlFrame: '_blank',
        exitUrl: null,
        audioEnabled: true,
        navButtonsAlways: true,
        width: 900,
        height: 600,
        autoFit: false,
        maxWidth: 9999,
        minWidth: 300,
        maxHeight: 9999,
        minHeight: 300,
        fade: 300
    },
    $div: null,
    $topDiv: null,
    project: null,
    basePath: '',
    zip: null,
    actPanel: null,
    history: null,
    skin: null,
    defaultSkin: null,
    activeMediaBag: null,
    reporter: null,
    eventSounds: null,
    actions: {},
    timer: null,
    delayedTimer: null,
    delayedAction: null,
    counterVal: {
        score: 0,
        actions: 0,
        time: 0
    },
    bgImageOrigin: null,
    audioEnabled: true,
    navButtonsDisabled: false,
    navButtonsAlways: false,
    buildActions: function () {
        var tp = this;
        this.actions = {
            'next': new AWT.Action('next', function () {
                tp.history.processJump(tp.project.activitySequence.getJump(false, tp.reporter), false);
            }),
            'prev': new AWT.Action('prev', function () {
                tp.history.processJump(tp.project.activitySequence.getJump(true, tp.reporter), false);
            }),
            'return': new AWT.Action('return', function () {
                tp.history.pop();
            }),
            'reset': new AWT.Action('reset', function () {
                if (tp.actPanel && tp.actPanel.act.canReinit())
                    tp.initActivity();
            }),
            'help': new AWT.Action('help', function () {
                if (tp.actPanel !== null)
                    tp.actPanel.showHelp();
            }),
            'info': new AWT.Action('info', function () {
                if (tp.actPanel && tp.actPanel.act.hasInfo()) {
                    if (tp.actPanel.act.infoUrl) {
                        tp.displayUrl(tp.act.infoUrl, true);
                    } else if (tp.actPanel.act.infoCmd) {
                        tp.runCmd(tp.actPanel.act.infoCmd);
                    }
                }
            }),
            'reports': new AWT.Action('reports', function (ev) {
                tp.showAbout(true);
            }),
            'audio': new AWT.Action('audio', function (ev) {
                tp.audioEnabled = !tp.audioEnabled;
                if (!tp.audioEnabled)
                    tp.stopMedia();
                EventSounds.prototype.globalEnabled = tp.audioEnabled;
            })
        };
        var thisPlayer = this;
        $.each(this.actions, function (key, value) {
            value.addStatusListener(function () {
                if (thisPlayer.skin)
                    thisPlayer.skin.actionStatusChanged(this);
            });
        });
    },
    activate: function () {
    },
    stop: function () {
        this.stopMedia(-1);
    },
    end: function () {
        this.stopMedia();
        this.closeHelpWindow();
        if (this.actPanel) {
            this.actPanel.end();
            this.actPanel.$div.remove();
            this.actPanel = null;
        }
        if (this.eventSounds) {
            this.eventSounds.close();
            this.eventSounds = null;
        }
        if (this.project) {
            this.project.end();
            this.project = null;
        }
        if (this.activeMediaBag)
            this.activeMediaBag.removeAll();
        if (this.reporter) {
            this.reporter.end();
            this.reporter = null;
        }
    },
    createEventSounds: function () {
        this.eventSounds = new EventSounds(null);
        this.eventSounds.realize(this.project.mediaBag);
        EventSounds.prototype.globalEnabled = true;
    },
    initReporter: function () {
        if (this.reporter) {
            this.reporter.end();
            this.reporter = null;
        }
    },
    initTimers: function () {
        if (this.timer)
            this.timer.stop();
        var thisPlayer = this;
        this.timer = new AWT.Timer(function () {
            thisPlayer.incCounterValue('time');
            if (thisPlayer.actPanel && thisPlayer.actPanel.act.maxTime > 0 && thisPlayer.actPanel.playing() && thisPlayer.counterVal['time'] >= thisPlayer.actPanel.act.maxTime) {
                thisPlayer.actPanel.finishActivity(false);
            }
        }, 1000, false);
        if (this.delayedTimer)
            this.delayedTimer.stop();
        this.delayedTimer = new AWT.Timer(function () {
            if (thisPlayer.delayedAction) {
                thisPlayer.delayedAction.processEvent(thisPlayer.delayedAction, null);
            }
        }, 1000, false);
        this.delayedTimer.repeats = false;
    },
    closeHelpWindow: function () {
        if (this.skin) {
            this.skin.showHelp(null);
            this.skin.showAbout(null);
        }
    },
    getTopComponent: function () {
        if (this.skin)
            return this.skin.$getTopComponent();
        else
            return this.$div;
    },
    setSkin: function (newSkin) {
        if (!newSkin)
            newSkin = this.defaultSkin;
        if (newSkin !== null && !newSkin.equals(this.skin)) {
            newSkin.attach(this);
            this.skin = newSkin;
            this.skin.doLayout();
        }
    },
    setProject: function (project) {
        if (this.project !== null) {
            if (this.project !== project)
                this.project.end();
            this.removeActivity();
        }
        this.project = project !== null ? project : new JClicProject();
        this.project.realize(this.eventSounds, this);
        if (this.project.skin !== null)
            this.defaultSkin = this.project.skin;
    },
    load: function (project, sequence, activity) {
        var tp = this;
        this.forceFinishActivity();
        this.skin.setWaitCursor(true);
        var actp = null;
        if (project) {
            if (typeof project === 'string') {
                var fullPath = Utils.getPath(this.basePath, project);
                if (Utils.endsWith(fullPath, '.jclic.zip')) {
                    tp.zip = null;
                    tp.setSystemMessage('Loading ZIP file', fullPath);
                    window.setTimeout(function () {
                        tp.skin.setWaitCursor(true);
                        JSZipUtils.getBinaryContent(fullPath, function (err, data) {
                            if (err) {
                                tp.setSystemMessage('Error loading ZIP file: ', err);
                                return;
                            }
                            try {
                                tp.zip = new JSZip(data);
                                tp.zip.fullZipPath = fullPath;
                                tp.zip.zipBasePath = Utils.getBasePath(fullPath);
                                var fileName = null;
                                for (var fn in tp.zip.files) {
                                    if (Utils.endsWith(fn, '.jclic')) {
                                        fileName = fn;
                                        break;
                                    }
                                }
                                if (fileName) {
                                    tp.load(Utils.getPath(tp.zip.zipBasePath, fileName), sequence, activity);
                                } else
                                    tp.setSystemMessage('Error: ZIP does not contain any valid jclic file!');
                            } catch (e) {
                                tp.setSystemMessage('Error reading ZIP file: ', e);
                            }
                        });
                        tp.skin.setWaitCursor(false);
                    }, 100);
                    this.skin.setWaitCursor(false);
                    return;
                }
                this.setSystemMessage('loading project', project);
                var fp = fullPath;
                if (tp.zip) {
                    var fName = Utils.getRelativePath(fp, tp.zip.zipBasePath);
                    if (tp.zip.files[fName]) {
                        fp = 'data:text/xml;charset=UTF-8,' + tp.zip.file(fName).asText();
                    }
                }
                $.get(fp, null, null, 'xml').done(function (data) {
                    if (typeof data !== 'object')
                        console.log('Project not loaded. Bad data!');
                    var prj = new JClicProject();
                    prj.setProperties($(data).find('JClicProject'), fullPath, tp.zip);
                    tp.setSystemMessage('Project file loaded and parsed', project);
                    prj.mediaBag.buildAll();
                    var loops = 0;
                    var interval = 500;
                    tp.skin.setWaitCursor(true);
                    var checkMedia = window.setInterval(function () {
                            if (++loops > tp.options.maxWaitTime / interval) {
                                window.clearInterval(checkMedia);
                                tp.skin.setWaitCursor(false);
                                tp.setSystemMessage('Error loading media!');
                            }
                            if (!prj.mediaBag.isWaiting()) {
                                window.clearInterval(checkMedia);
                                tp.skin.setWaitCursor(false);
                                tp.load(prj, sequence, activity);
                            }
                        }, interval);
                }).fail(function (jqXHR, textStatus, errorThrown) {
                    var errMsg = textStatus + ' (' + errorThrown + ') while loading ' + project;
                    tp.setSystemMessage('Error', errMsg);
                    alert('Error!\n' + errMsg);
                }).always(function () {
                    tp.skin.setWaitCursor(false);
                });
                return;
            }
            this.setProject(project);
            if (this.reporter !== null)
                this.reporter.newSession(project.name, this);
            if (!sequence && !activity)
                sequence = '0';
        }
        if (!Utils.isNullOrUndef(sequence)) {
            this.setSystemMessage('Loading sequence', sequence);
            this.navButtonsDisabled = false;
            var ase = null;
            if (typeof sequence === 'string')
                ase = this.project.activitySequence.getElementByTag(sequence, true);
            if (ase === null) {
                var n = parseInt(sequence, 10);
                if (typeof n === 'number')
                    ase = this.project.activitySequence.getElement(n, true);
            }
            if (ase !== null) {
                if (this.reporter)
                    this.reporter.newSequence(ase);
                activity = ase.activityName;
            }
        }
        if (activity) {
            var act = this.project.getActivity(activity);
            if (act) {
                this.setSystemMessage('Loading activity', activity);
                act.prepareMedia(this);
                this.project.activitySequence.checkCurrentActivity(act.name);
                actp = act.getActivityPanel(this);
                actp.buildVisualComponents();
            } else {
                this.setSystemMessage('Error: Missing activity', activity);
            }
        }
        if (this.actPanel !== null) {
            this.actPanel.end();
            this.actPanel.$div.remove();
            this.actPanel = null;
            this.setCounterValue('time', 0);
        }
        if (actp) {
            this.actPanel = actp;
            if (this.options.fade > 0) {
                this.actPanel.$div.css('display', 'none');
            }
            this.$div.prepend(this.actPanel.$div);
            if (this.skin)
                this.skin.resetAllCounters(false);
            if (this.actPanel.skin)
                this.setSkin(this.actPanel.skin);
            else if (this.project.skin)
                this.setSkin(this.project.skin);
            else
                this.setSkin(null);
            if (this.skin) {
                var hasReturn = this.history.storedElementsCount() > 0;
                var navBtnFlag = this.navButtonsAlways ? 'both' : this.navButtonsDisabled ? 'none' : this.project.activitySequence.getNavButtonsFlag();
                this.actions['next'].setEnabled((navBtnFlag === 'fwd' || navBtnFlag === 'both') && this.project.activitySequence.hasNextAct(hasReturn));
                this.actions['prev'].setEnabled((navBtnFlag === 'back' || navBtnFlag === 'both') && this.project.activitySequence.hasPrevAct(hasReturn));
                this.actions['return'].setEnabled(this.history.storedElementsCount() > 0);
                this.actions['help'].setEnabled(this.actPanel.act.helpWindowAllowed());
                this.actions['reset'].setEnabled(this.actPanel.act.canReinit());
                this.actions['info'].setEnabled(this.actPanel.act.hasInfo());
            }
            this.doLayout();
            this.initActivity();
            if (this.options.fade > 0) {
                this.actPanel.$div.fadeIn(this.options.fade, function () {
                    tp.activityReady();
                });
            }
        }
        this.skin.setWaitCursor(false);
    },
    forceFinishActivity: function () {
        this.timer.stop();
        this.delayedTimer.stop();
        if (this.actPanel) {
            this.closeHelpWindow();
            this.actPanel.forceFinishActivity();
            this.stopMedia();
            this.activeMediaBag.removeAll();
        }
    },
    removeActivity: function () {
        this.forceFinishActivity();
        if (this.actPanel) {
            this.actPanel.end();
            this.actPanel.$div.remove();
            this.actPanel = null;
            this.setMsg(null);
            this.doLayout();
        }
    },
    initActivity: function () {
        this.setWaitCursor(true);
        this.timer.stop();
        this.delayedTimer.stop();
        this.setCounterValue('time', 0);
        this.stopMedia();
        if (this.actPanel) {
            this.actPanel.initActivity();
            this.timer.start();
            if (!this.actPanel.act.mustPauseSequence())
                this.startAutoPassTimer();
            this.setSystemMessage('Activity running', this.actPanel.act.name);
        }
        this.setWaitCursor(false);
    },
    activityReady: function () {
        if (this.actPanel) {
            this.actPanel.activityReady();
            this.setSystemMessage('Activity ready');
        }
    },
    startActivity: function () {
        this.setWaitCursor(true);
        if (this.actPanel)
            this.actPanel.startActivity();
        this.setWaitCursor(false);
    },
    doLayout: function () {
        var width = this.dim.width = this.$div.width();
        var height = this.dim.height = this.$div.height();
        var mainCss = {
                'background-color': this.actPanel ? this.actPanel.act.bgColor : 'azure',
                'background-image': ''
            };
        if (this.actPanel) {
            var act = this.actPanel.act;
            if (act.bgGradient)
                mainCss['background-image'] = act.bgGradient.getCss();
            if (act.bgImageFile && act.bgImageFile.length > 0) {
                var bgImageUrl = this.project.mediaBag.getElement(act.bgImageFile, true).getFullPath();
                var repeat = act.tiledBgImg ? 'repeat' : 'no-repeat';
                mainCss['background-image'] = 'url(\'' + bgImageUrl + '\')';
                mainCss['background-repeat'] = repeat;
                if (repeat === 'no-repeat')
                    mainCss['background-position'] = 'center center';
                else
                    bgImageUrl = '';
            }
            var m = Utils.settings.BoxBase.AC_MARGIN;
            var proposedRect = new AWT.Rectangle(m, m, width - 2 * m, height - 2 * m);
            if (this.actPanel.bgImage && !act.tiledBgImg && act.absolutePositioned) {
                this.bgImageOrigin.x = (width - this.actPanel.bgImage.width) / 2;
                this.bgImageOrigin.y = (height - this.actPanel.bgImage.height) / 2;
                proposedRect.pos.moveTo(this.bgImageOrigin);
                proposedRect.dim.width -= this.bgImageOrigin.x - m;
                proposedRect.dim.height -= this.bgImageOrigin.y - m;
                proposedRect.dim.width = Math.min(proposedRect.dim.width, width);
                proposedRect.dim.height = Math.min(proposedRect.dim.height, height);
            }
            this.actPanel.fitTo(proposedRect, this);
        }
        this.$div.css(mainCss);
    },
    playMedia: function (mediaContent, mediaPlacement) {
        var thisPlayer = this;
        var ji = null;
        var fn = mediaContent.mediaFileName;
        window.setTimeout(function () {
            switch (mediaContent.mediaType) {
            case 'RUN_CLIC_PACKAGE':
                ji = new JumpInfo('JUMP', fn);
                if (mediaContent.externalParam)
                    ji.projectPath = Utils.getPath(thisPlayer.project.basePath, mediaContent.externalParam);
                thisPlayer.history.processJump(ji, true);
                break;
            case 'RUN_CLIC_ACTIVITY':
                thisPlayer.history.push();
                thisPlayer.load(null, null, fn);
                break;
            case 'RETURN':
                thisPlayer.history.pop();
                break;
            case 'EXIT':
                ji = new JumpInfo('EXIT', fn);
                thisPlayer.history.processJump(ji, false);
                break;
            case 'RUN_EXTERNAL':
                thisPlayer.runCmd(fn);
                break;
            case 'URL':
                if (fn)
                    thisPlayer.displayUrl(fn, true);
                break;
            case 'PLAY_AUDIO':
            case 'PLAY_VIDEO':
            case 'PLAY_MIDI':
            case 'RECORD_AUDIO':
            case 'PLAY_RECORDED_AUDIO':
                if (thisPlayer.audioEnabled) {
                    var amp = thisPlayer.activeMediaBag.getActiveMediaPlayer(mediaContent, thisPlayer.project.mediaBag, thisPlayer);
                    if (amp)
                        amp.play(mediaPlacement);
                }
                break;
            default:
                thisPlayer.setSystemMessage('unknown media type', mediaContent.mediaType);
                break;
            }
        }, 1);
    },
    stopMedia: function (level) {
        if (typeof level !== 'number')
            level = -1;
        var thisPlayer = this;
        thisPlayer.activeMediaBag.stopAll(level);
    },
    runCmd: function (cmd) {
        this.setSystemMessage('Unsupported call to external command', cmd);
    },
    activityFinished: function (completedOK) {
        this.closeHelpWindow();
        this.setSystemMessage('activity finished');
        this.timer.stop();
        this.startAutoPassTimer();
    },
    startAutoPassTimer: function () {
        var ase = this.project.activitySequence.getCurrentAct();
        if (ase !== null && ase.delay > 0 && !this.delayedTimer.isRunning() && !this.navButtonsDisabled) {
            this.delayedAction = this.actions['next'];
            this.delayedTimer.delay = ase.delay * 1000;
            this.delayedTimer.start();
        }
    },
    setMsg: function (abc) {
        var ab = null;
        if (this.skin)
            ab = this.skin.getMsgBox();
        if (ab !== null) {
            ab.clear();
            this.skin.invalidate(ab).update();
            ab.setContent(abc ? abc : ActiveBoxContent.prototype.EMPTY_CONTENT);
            this.skin.invalidate(ab).update();
            ab.playMedia(this);
        }
    },
    playMsg: function () {
        if (this.skin && this.skin.getMsgBox())
            this.skin.getMsgBox().playMedia(this);
    },
    setCounterValue: function (counter, newValue) {
        this.counterVal[counter] = newValue;
        if (this.skin && this.skin.counters[counter])
            this.skin.counters[counter].setValue(newValue);
    },
    getCounterValue: function (counter) {
        return this.counterVal[counter];
    },
    setCounterEnabled: function (counter, bEnabled) {
        if (this.skin) {
            this.skin.enableCounter(counter, bEnabled);
            this.setCountDown(counter, 0);
        }
    },
    incCounterValue: function (counter) {
        this.counterVal[counter]++;
        var actp = this.actPanel;
        var cnt = this.skin ? this.skin.counters[counter] : null;
        if (cnt)
            cnt.setValue(this.counterVal[counter]);
        if (counter === 'actions' && actp !== null && actp.act.maxActions > 0 && actp.isPlaying() && this.counterVal['actions'] >= actp.act.maxActions) {
            window.setTimeout(function () {
                actp.finishActivity(actp.solved);
            }, 0);
        }
    },
    setCountDown: function (counter, maxValue) {
        this.counterVal[counter] = maxValue;
        if (this.skin && this.skin.counters[counter])
            this.skin.counters[counter].setCountDown(maxValue);
    },
    setWaitCursor: function (status) {
        if (this.skin)
            this.skin.setWaitCursor(status);
    },
    setSystemMessage: function (msg1, msg2) {
        if (this.skin !== null)
            this.skin.setSystemMessage(msg1, msg2);
        else
            console.log((msg1 ? msg1 + ' - ' : '') + (msg2 ? msg2 : ''));
    },
    getActiveMediaPlayer: function (mediaContent) {
        if (this.activeMediaBag && mediaContent)
            return this.activeMediaBag.getActiveMediaPlayer(mediaContent, this.project.mediaBag, this);
        else
            return null;
    },
    reportNewActivity: function (act) {
        var ase = this.project.activitySequence.getCurrentAct();
        if (this.reporter) {
            if (ase.getTag() === this.reporter.getCurrentSequenceTag())
                this.reporter.newSequence(ase);
            if (act.includeInReports)
                this.reporter.newActivity(act);
        }
        this.setCounterValue('actions', 0);
        this.setCounterValue('score', 0);
    },
    reportNewAction: function (act, type, source, dest, ok, currentScore) {
        if (this.reporter && act.includeInReports && act.reportActions)
            this.reporter.newAction(type, source, dest, ok);
        if (currentScore >= 0) {
            this.incCounterValue('actions');
            this.setCounterValue('score', currentScore);
        }
    },
    reportEndActivity: function (act, solved) {
        if (this.reporter && act.includeInReports)
            this.reporter.endActivity(this.counterVal['score'], this.counterVal['actions'], solved);
    },
    showHelp: function ($hlpComponent) {
        if (this.skin) {
            return this.skin.showHelp($hlpComponent);
        }
        return false;
    },
    displayURL: function (url, inFrame) {
        if (url) {
            if (inFrame)
                window.open(url, this.options.infoUrlFrame);
            else
                window.location.href = url;
        }
    },
    exit: function (url) {
        if (!url)
            url = this.options.exitUrl;
        if (url)
            this.displayURL(url, false);
    },
    setWindowTitle: function (docTitle) {
        this.setSystemMessage('running', docTitle);
    }
};
JClicPlayer.prototype = $.extend(Object.create(AWT.Container.prototype), JClicPlayer.prototype);
module.exports = JClicPlayer;
},{"./AWT":47,"./PlayerHistory":52,"./Utils":53,"./bags/JumpInfo":79,"./boxes/ActiveBoxContent":86,"./media/ActiveMediaBag":93,"./media/EventSounds":95,"./project/JClicProject":98,"./skins/Skin":107,"jquery":5,"jszip":15,"jszip-utils":6}],52:[function(require,module,exports){
var Utils = require('./Utils');
var PlayerHistory = function (player) {
    this.player = player;
    this.sequenceStack = [];
};
PlayerHistory.prototype = {
    constructor: PlayerHistory,
    player: null,
    sequenceStack: [],
    testMode: false,
    storedElementsCount: function () {
        return this.sequenceStack.length;
    },
    clearHistory: function () {
        this.sequenceStack.length = 0;
    },
    HistoryElement: function (projectPath, sequence, activity, fullZipPath) {
        this.projectPath = projectPath;
        this.sequence = sequence;
        this.activity = activity;
        this.fullZipPath = fullZipPath;
    },
    push: function () {
        if (this.player.project !== null && this.player.project.path !== null) {
            var ase = this.player.project.activitySequence;
            var act = ase.currentAct;
            if (act >= 0) {
                if (this.sequenceStack.length > 0) {
                    var last = this.sequenceStack[this.sequenceStack.length - 1];
                    if (last.projectPath === this.player.project.path && last.activity === act)
                        return;
                }
                this.sequenceStack.push(new this.HistoryElement(this.player.project.path, ase.getSequenceForElement(act), act, this.player.zip ? this.player.zip.fullZipPath : null));
            }
        }
    },
    pop: function () {
        if (this.sequenceStack.length > 0) {
            var e = this.sequenceStack.pop();
            if (e.projectPath === this.player.project.path && Utils.isEquivalent(e.fullZipPath, this.player.zip ? this.player.zip.fullZipPath : null))
                this.player.load(null, e.activity, null);
            else {
                if (this.testMode && e.projectPath !== null && e.projectPath.length > 0) {
                    console.log('At this point, a jump to ' + e.projectPath + ' should be performed.');
                } else {
                    var prj = e.fullZipPath ? e.fullZipPath : e.projectPath;
                    this.player.load(prj, e.activity, null);
                }
            }
        }
        return true;
    },
    processJump: function (ji, allowReturn) {
        var result = false;
        if (ji !== null && this.player.project !== null) {
            switch (ji.action) {
            case 'STOP':
                break;
            case 'RETURN':
                result = this.pop();
                break;
            case 'EXIT':
                if (this.testMode) {
                    console.log('At this point, the program should exit');
                } else
                    this.player.exit(ji.sequence);
                break;
            case 'JUMP':
                if (!ji.sequence && !ji.projectPath) {
                    var ase = this.player.project.activitySequence.getElement(ji.actNum, true);
                    if (ase !== null) {
                        if (allowReturn)
                            this.push();
                        this.player.load(null, null, ase.activityName);
                        result = true;
                    }
                } else {
                    if (this.testMode && ji.projectPath !== null && ji.projectPath.length > 0) {
                        console.log('At this point, a jump to ' + ji.projectPath + ' should be performed.');
                    } else
                        result = this.jumpToSequence(ji.sequence, ji.projectPath, allowReturn);
                }
                break;
            }
        }
        return result;
    },
    jumpToSequence: function (sequence, path, allowReturn) {
        if (Utils.isNullOrUndef(sequence) && Utils.isNullOrUndef(path))
            return false;
        if (Utils.isNullOrUndef(path))
            path = this.player.project.path;
        if (this.sequenceStack.length > 0) {
            var e = this.sequenceStack[this.sequenceStack.length - 1];
            if (!Utils.isNullOrUndef(sequence) && path === e.projectPath) {
                var same = sequence === e.sequence;
                if (path === this.player.project.path) {
                    var ase = this.player.project.activitySequence.getElement(e.activity, false);
                    same = ase !== null && sequence === ase.tag;
                }
                if (same)
                    return this.pop();
            }
        }
        if (allowReturn)
            this.push();
        if (path === this.player.project.path)
            this.player.load(null, sequence, null);
        else
            this.player.load(path, sequence, null);
        return true;
    }
};
module.exports = PlayerHistory;
},{"./Utils":53}],53:[function(require,module,exports){
var $ = require('jquery');
var Utils = {
        getBoolean: function (val, defaultValue) {
            return Number(val === 'true' | defaultValue ? 1 : 0);
        },
        getVal: function (val, defaultValue) {
            return val === '' || val === null || typeof val === 'undefined' ? defaultValue : val;
        },
        getNumber: function (val, defaultValue) {
            return Number(Utils.getVal(val, defaultValue));
        },
        'FALSE': 0,
        'TRUE': 1,
        'DEFAULT': 2,
        getTriState: function (val) {
            return Number(val === 'true' ? Utils.TRUE : val === 'false' ? Utils.FALSE : Utils.DEFAULT);
        },
        fillString: function (tag, repeats) {
            var s = '';
            for (var i = 0; i < repeats; i++)
                s += tag;
            return s;
        },
        isNullOrUndef: function (val) {
            return typeof val === 'undefined' || val === null;
        },
        isEquivalent: function (a, b) {
            return (typeof a === 'undefined' || a === null) && (typeof b === 'undefined' || b === null) || a === b;
        },
        getXmlText: function (xml) {
            var text = '';
            $(xml).children('p').each(function () {
                text += '<p>' + this.textContent + '</p>';
            });
            return text;
        },
        cssToString: function (cssObj) {
            var s = '';
            $.each(cssObj, function (key, value) {
                s += key + ': ' + value + ';';
            });
            return s;
        },
        checkColor: function (color, defaultColor) {
            if (typeof color === 'undefined' || color === null) {
                color = defaultColor;
                if (typeof color === 'undefined' || color === null)
                    color = Utils.settings.BoxBase.BACK_COLOR;
            }
            var col = color.replace('0x', '#');
            if (col.charAt(0) === '#' && col.length > 7) {
                var alpha = parseInt(col.substring(1, 3), 16) / 255;
                col = 'rgba(' + parseInt(col.substring(3, 5), 16) + ',' + parseInt(col.substring(5, 7), 16) + ',' + parseInt(col.substring(7, 9), 16) + ',' + alpha + ')';
            }
            return col;
        },
        colorHasTransparency: function (color) {
            var result = false;
            if (color.indexOf('rgba(') === 0) {
                var p = color.lastIndexOf(',');
                var alpha = parseint(color.substr(p));
                result = typeof alpha === 'number' && alpha < 1;
            }
            return result;
        },
        cloneObject: function (obj) {
            return $.extend(true, {}, obj);
        },
        isSeparator: function (ch) {
            return ' .,;-|'.indexOf(ch) >= 0;
        },
        roundTo: function (v, n) {
            return Math.round(v / n) * n;
        },
        compareMultipleOptions: function (answer, check, checkCase) {
            if (answer === null || answer.length === 0 || check === null || check.length === 0)
                return false;
            if (!checkCase)
                answer = answer.toUpperCase();
            answer = answer.trim();
            var tokens = check.split('|');
            for (var i = 0; i < tokens.length; i++) {
                var s = checkCase ? tokens[i] : tokens[i].toUpperCase();
                if (s.trim() === answer)
                    return true;
            }
            return false;
        },
        endsWith: function (text, expr) {
            return text.indexOf(expr, text.length - expr.length) !== -1;
        },
        isURL: function (exp) {
            var path = /^(https?|file|ftps?):\/\//i;
            return path.test(exp);
        },
        getBasePath: function (path) {
            var result = '';
            var p = path.lastIndexOf('/');
            if (p >= 0)
                result = path.substring(0, p + 1);
            return result;
        },
        getRelativePath: function (file, path) {
            if (!path || path === '' | file.indexOf(path) !== 0)
                return file;
            else
                return file.substr(path.length);
        },
        getPath: function (basePath, path, zip) {
            if (Utils.isURL(path))
                return path;
            else if (zip) {
                var fName = Utils.getRelativePath(basePath + path, zip.zipBasePath);
                if (zip.files[fName]) {
                    var ext = path.toLowerCase().split('.').pop();
                    var mime = Utils.settings.MIME_TYPES[ext];
                    if (!mime)
                        mime = 'application/octet-stream';
                    return 'data:' + mime + ';base64,' + window.btoa(zip.file(fName).asBinary());
                }
            }
            return basePath + path;
        },
        settings: {
            AB: 0,
            BA: 1,
            AUB: 2,
            BUA: 3,
            LAYOUT_NAMES: [
                'AB',
                'BA',
                'AUB',
                'BUA'
            ],
            DEFAULT_WIDTH: 400,
            DEFAULT_HEIGHT: 300,
            MINIMUM_WIDTH: 40,
            MINIMUM_HEIGHT: 40,
            DEFAULT_NAME: '---',
            DEFAULT_MARGIN: 8,
            DEFAULT_SHUFFLES: 31,
            DEFAULT_GRID_ELEMENT_SIZE: 20,
            MIN_CELL_SIZE: 10,
            DEFAULT_BG_COLOR: '#C0C0C0',
            ACTIONS: {
                ACTION_MATCH: 'MATCH',
                ACTION_PLACE: 'PLACE',
                ACTION_WRITE: 'WRITE',
                ACTION_SELECT: 'SELECT',
                ACTION_HELP: 'HELP'
            },
            PREVIOUS: 0,
            MAIN: 1,
            END: 2,
            END_ERROR: 3,
            NUM_MSG: 4,
            MSG_TYPE: [
                'previous',
                'initial',
                'final',
                'finalError'
            ],
            RANDOM_CHARS: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
            NUM_COUNTERS: 3,
            MAX_RECORD_LENGTH: 20,
            BoxBase: {
                REDUCE_FONT_STEP: 1,
                MIN_FONT_SIZE: 8,
                STROKE: 1,
                AC_MARGIN: 6,
                BACK_COLOR: '#C0C0C0',
                TEXT_COLOR: 'black',
                SHADOW_COLOR: 'gray',
                INACTIVE_COLOR: 'gray',
                ALTERNATIVE_COLOR: 'gray',
                BORDER_COLOR: 'black',
                BORDER_STROKE_WIDTH: 0.75,
                MARKER_STROKE_WIDTH: 2.75
            },
            FILE_TYPES: {
                image: 'gif,jpg,png,jpeg,bmp,ico,svg',
                audio: 'wav,mp3,ogg,au,aiff',
                video: 'avi,mov,mpeg',
                font: 'ttf,otf,eot,woff,woff2',
                midi: 'mid,midi',
                xml: 'xml'
            },
            MIME_TYPES: {
                xml: 'text/xml',
                gif: 'image/gif',
                jpg: 'image/jpeg',
                jpeg: 'image/jpeg',
                png: 'image/png',
                bmp: 'image/bmp',
                svg: 'image/svg+xml',
                ico: 'image/x-icon',
                wav: 'audio/wav',
                mp3: 'audio/mpeg',
                ogg: 'audio/ogg',
                au: 'audio/basic',
                aiff: 'audio/x-aiff',
                avi: 'video/avi',
                mov: 'video/quicktime',
                mpeg: 'video/mpeg',
                ttf: 'application/font-sfnt',
                otf: 'application/font-sfnt',
                eot: ' application/vnd.ms-fontobject',
                woff: 'application/font-woff',
                woff2: 'application/font-woff2'
            },
            COMPRESS_IMAGES: true,
            VK: {
                LEFT: 37,
                UP: 38,
                RIGHT: 39,
                DOWN: 40
            },
            TOUCH_DEVICE: false
        },
        getCaretCharacterOffsetWithin: function (element) {
            var caretOffset = 0;
            var doc = element.ownerDocument || element.document;
            var win = doc.defaultView || doc.parentWindow;
            var sel;
            if (typeof win.getSelection !== 'undefined') {
                sel = win.getSelection();
                if (sel.rangeCount > 0) {
                    var range = win.getSelection().getRangeAt(0);
                    var preCaretRange = range.cloneRange();
                    preCaretRange.selectNodeContents(element);
                    preCaretRange.setEnd(range.endContainer, range.endOffset);
                    caretOffset = preCaretRange.toString().length;
                }
            } else if ((sel = doc.selection) && sel.type !== 'Control') {
                var textRange = sel.createRange();
                var preCaretTextRange = doc.body.createTextRange();
                preCaretTextRange.moveToElementText(element);
                preCaretTextRange.setEndPoint('EndToEnd', textRange);
                caretOffset = preCaretTextRange.text.length;
            }
            return caretOffset;
        },
        getTextNodesIn: function (node) {
            var textNodes = [];
            if (node.nodeType === 3) {
                textNodes.push(node);
            } else {
                var children = node.childNodes;
                for (var i = 0, len = children.length; i < len; ++i) {
                    textNodes.push.apply(textNodes, Utils.getTextNodesIn(children[i]));
                }
            }
            return textNodes;
        },
        setSelectionRange: function (el, start, end) {
            if (Utils.isNullOrUndef(end))
                end = start;
            if (document.createRange && window.getSelection) {
                var range = document.createRange();
                range.selectNodeContents(el);
                var textNodes = Utils.getTextNodesIn(el);
                var foundStart = false;
                var charCount = 0, endCharCount;
                for (var i = 0, textNode; textNode = textNodes[i++];) {
                    endCharCount = charCount + textNode.length;
                    if (!foundStart && start >= charCount && (start < endCharCount || start === endCharCount && i <= textNodes.length)) {
                        range.setStart(textNode, start - charCount);
                        foundStart = true;
                    }
                    if (foundStart && end <= endCharCount) {
                        range.setEnd(textNode, end - charCount);
                        break;
                    }
                    charCount = endCharCount;
                }
                var sel = window.getSelection();
                sel.removeAllRanges();
                sel.addRange(range);
            } else if (document.selection && document.body.createTextRange) {
                var textRange = document.body.createTextRange();
                textRange.moveToElementText(el);
                textRange.collapse(true);
                textRange.moveEnd('character', end);
                textRange.moveStart('character', start);
                textRange.select();
            }
        }
    };
module.exports = Utils;
},{"jquery":5}],54:[function(require,module,exports){
var $ = require('jquery'), Activity = require('../../Activity'), AWT = require('../../AWT'), SimpleAssociation = require('./SimpleAssociation');
var ComplexAssociation = function (project) {
    SimpleAssociation.call(this, project);
    this.useIdAss = true;
};
ComplexAssociation.prototype = {
    constructor: ComplexAssociation,
    nonAssignedCells: 0,
    useIdAss: false,
    setProperties: function ($xml) {
        SimpleAssociation.prototype.setProperties.call(this, $xml);
        this.abc['primary'].avoidAllIdsNull(this.abc['secondary'].getNumCells());
    },
    getMinNumActions: function () {
        if (this.invAss)
            return this.abc['secondary'].getNumCells();
        else
            return this.abc['primary'].getNumCells() - this.nonAssignedCells;
    }
};
ComplexAssociation.prototype = $.extend(Object.create(SimpleAssociation.prototype), ComplexAssociation.prototype);
ComplexAssociation.Panel = function (act, ps, $div) {
    SimpleAssociation.Panel.call(this, act, ps, $div);
};
var panelAncestor = SimpleAssociation.Panel.prototype;
ComplexAssociation.Panel.prototype = {
    constructor: ComplexAssociation.Panel,
    invAssCheck: null,
    buildVisualComponents: function () {
        panelAncestor.buildVisualComponents.call(this);
        var abcA = this.act.abc['primary'], abcB = this.act.abc['secondary'], i, n;
        if (abcA && abcB) {
            if (this.act.invAss) {
                this.invAssCheck = [];
                n = abcB.getNumCells();
                for (i = 0; i < n; i++)
                    this.invAssCheck[i] = false;
            }
            this.bgA.setDefaultIdAss();
            this.act.nonAssignedCells = 0;
            n = this.bgA.getNumCells();
            for (i = 0; i < n; i++) {
                var bx = this.bgA.getActiveBox(i);
                if (bx.idAss === -1) {
                    this.act.nonAssignedCells++;
                    bx.switchToAlt(this.ps);
                }
            }
        }
    },
    checkInvAss: function () {
        var i;
        if (!this.act.invAss || !this.invAssCheck)
            return false;
        for (i = 0; i < this.invAssCheck.length; i++)
            if (!this.invAssCheck[i])
                break;
        return i === this.invAssCheck.length;
    },
    processEvent: function (event) {
        if (this.bc && this.playing) {
            var p = null, bx1, bx2;
            if (event.type === 'touchend') {
                p = this.bc.active ? this.bc.dest.clone() : new AWT.Point();
            } else {
                var x = event.originalEvent.touches ? event.originalEvent.touches[0].pageX : event.pageX, y = event.originalEvent.touches ? event.originalEvent.touches[0].pageY : event.pageY;
                p = new AWT.Point(x - this.$div.offset().left, y - this.$div.offset().top);
            }
            var up = false, m = false, clickOnBg0 = false;
            switch (event.type) {
            case 'touchcancel':
                if (this.bc.active)
                    this.bc.end();
                break;
            case 'mouseup':
                if (this.bc.active && p.distanceTo(this.bc.origin) <= 3) {
                    break;
                }
                up = true;
            case 'touchend':
            case 'touchstart':
            case 'mousedown':
                this.ps.stopMedia(1);
                if (!this.bc.active) {
                    if (up)
                        break;
                    bx1 = this.bgA.findActiveBox(p);
                    bx2 = this.bgB.findActiveBox(p);
                    if (bx1 && bx1.idAss !== -1 && (!this.act.useOrder || bx1.idOrder === this.currentItem) || !this.act.useOrder && bx2) {
                        if (this.act.dragCells)
                            this.bc.begin(p, bx1 ? bx1 : bx2);
                        else
                            this.bc.begin(p);
                        m |= (bx1 ? bx1 : bx2).playMedia(this.ps);
                        if (!m)
                            this.playEvent('click');
                    }
                } else {
                    var origin = this.bc.origin;
                    this.bc.end();
                    bx1 = this.bgA.findActiveBox(origin);
                    if (bx1) {
                        bx2 = this.bgB.findActiveBox(p);
                    } else {
                        bx2 = this.bgB.findActiveBox(origin);
                        if (bx2) {
                            bx1 = this.bgA.findActiveBox(p);
                            clickOnBg0 = true;
                        }
                    }
                    if (bx1 && bx2 && bx1.idAss !== -1 && !bx2.isInactive()) {
                        var ok = false, src = bx1.getDescription(), dest = bx2.getDescription(), matchingDest = this.act.abc['secondary'].getActiveBoxContent(bx1.idAss);
                        if (bx1.idAss === bx2.idOrder || bx2.getContent().isEquivalent(matchingDest, true)) {
                            ok = true;
                            bx1.idAss = -1;
                            if (this.act.abc['solvedPrimary']) {
                                bx1.switchToAlt(this.ps);
                                m |= bx1.playMedia(this.ps);
                            } else {
                                if (clickOnBg0)
                                    m |= bx1.playMedia(this.ps);
                                else
                                    m |= bx2.playMedia(this.ps);
                                bx1.clear();
                            }
                            if (this.act.invAss) {
                                this.invAssCheck[bx2.idOrder] = true;
                                bx2.clear();
                            }
                            if (this.act.useOrder)
                                this.currentItem = this.bgA.getNextItem(this.currentItem);
                        }
                        var cellsPlaced = this.bgA.countCellsWithIdAss(-1);
                        this.ps.reportNewAction(this.act, 'MATCH', src, dest, ok, cellsPlaced - this.act.nonAssignedCells);
                        if (ok && (this.checkInvAss() || cellsPlaced === this.bgA.getNumCells()))
                            this.finishActivity(true);
                        else if (!m)
                            this.playEvent(ok ? 'actionOk' : 'actionError');
                    } else if (clickOnBg0 && this.bgA.contains(p) || !clickOnBg0 && this.bgB.contains(p)) {
                        var srcOut = bx1 ? bx1.getDescription() : bx2 ? bx2.getDescription() : 'null';
                        this.ps.reportNewAction(this.act, 'MATCH', srcOut, 'null', false, this.bgB.countCellsWithIdAss(-1));
                        this.playEvent('actionError');
                    }
                    this.update();
                }
                break;
            case 'mousemove':
            case 'touchmove':
                this.bc.moveTo(p);
                break;
            }
            event.preventDefault();
        }
    }
};
ComplexAssociation.Panel.prototype = $.extend(Object.create(panelAncestor), ComplexAssociation.Panel.prototype);
Activity.CLASSES['@associations.ComplexAssociation'] = ComplexAssociation;
module.exports = ComplexAssociation;
},{"../../AWT":47,"../../Activity":48,"./SimpleAssociation":55,"jquery":5}],55:[function(require,module,exports){
var $ = require('jquery'), Activity = require('../../Activity'), ActiveBoxGrid = require('../../boxes/ActiveBoxGrid'), BoxBag = require('../../boxes/BoxBag'), BoxConnector = require('../../boxes/BoxConnector'), AWT = require('../../AWT');
var SimpleAssociation = function (project) {
    Activity.call(this, project);
};
SimpleAssociation.prototype = {
    constructor: SimpleAssociation,
    useIdAss: false,
    getMinNumActions: function () {
        return this.abc.primary.getNumCells();
    },
    hasRandom: function () {
        return true;
    },
    shuffleAlways: function () {
        return true;
    },
    helpSolutionAllowed: function () {
        return true;
    }
};
SimpleAssociation.prototype = $.extend(Object.create(Activity.prototype), SimpleAssociation.prototype);
SimpleAssociation.Panel = function (act, ps, $div) {
    Activity.Panel.call(this, act, ps, $div);
};
var ActPanelAncestor = Activity.Panel.prototype;
SimpleAssociation.Panel.prototype = {
    constructor: SimpleAssociation.Panel,
    bgA: null,
    bgB: null,
    bc: null,
    events: [
        'mousedown',
        'mouseup',
        'mousemove',
        'touchstart',
        'touchend',
        'touchmove',
        'touchcancel'
    ],
    clear: function () {
        if (this.bgA) {
            this.bgA.end();
            this.bgA = null;
        }
        if (this.bgB) {
            this.bgB.end();
            this.bgB = null;
        }
    },
    buildVisualComponents: function () {
        if (this.firstRun)
            ActPanelAncestor.buildVisualComponents.call(this);
        this.clear();
        var abcA = this.act.abc['primary'], abcB = this.act.abc['secondary'], solved = this.act.abc['solvedPrimary'];
        if (abcA && abcB) {
            if (abcA.imgName)
                abcA.setImgContent(this.act.project.mediaBag, null, false);
            if (abcB.imgName)
                abcB.setImgContent(this.act.project.mediaBag, null, false);
            if (solved && solved.imgName)
                solved.setImgContent(this.act.project.mediaBag, null, false);
            if (this.act.acp !== null) {
                var contentKit = [
                        abcA,
                        abcB
                    ];
                if (solved)
                    contentKit.push(solved);
                this.act.acp.generateContent(abcA.nch, abcA.ncw, contentKit, false);
            }
            this.bgA = ActiveBoxGrid.createEmptyGrid(null, this, this.act.margin, this.act.margin, abcA);
            this.bgB = ActiveBoxGrid.createEmptyGrid(null, this, this.act.margin, this.act.margin, abcB);
            this.bgA.setContent(abcA, solved ? solved : null);
            this.bgB.setContent(abcB);
            this.bgA.setVisible(true);
            this.bgB.setVisible(true);
        }
    },
    initActivity: function () {
        ActPanelAncestor.initActivity.call(this);
        if (!this.firstRun)
            this.buildVisualComponents();
        else
            this.firstRun = false;
        if (this.bgA && this.bgB) {
            var scrambleArray = [];
            if (this.act.scramble.primary)
                scrambleArray.push(this.bgA);
            if (this.act.scramble.secondary)
                scrambleArray.push(this.bgB);
            if (scrambleArray.length > 0) {
                this.shuffle(scrambleArray, true, true);
            }
            if (this.useOrder)
                this.currentItem = this.bgA.getNextItem(-1);
            this.playing = true;
            this.invalidate().update();
        }
    },
    updateContent: function (dirtyRegion) {
        ActPanelAncestor.updateContent.call(this, dirtyRegion);
        if (this.bgA && this.bgB && this.$canvas) {
            var canvas = this.$canvas.get(0), ctx = canvas.getContext('2d');
            if (!dirtyRegion)
                dirtyRegion = new AWT.Rectangle(0, 0, canvas.width, canvas.height);
            ctx.clearRect(dirtyRegion.pos.x, dirtyRegion.pos.y, dirtyRegion.dim.width, dirtyRegion.dim.height);
            this.bgA.update(ctx, dirtyRegion, this);
            this.bgB.update(ctx, dirtyRegion, this);
        }
        return this;
    },
    setDimension: function (preferredMaxSize) {
        if (!this.bgA || !this.bgB || this.getBounds().equals(preferredMaxSize))
            return preferredMaxSize;
        return BoxBag.layoutDouble(preferredMaxSize, this.bgA, this.bgB, this.act.boxGridPos, this.act.margin);
    },
    setBounds: function (rect) {
        this.$div.empty();
        ActPanelAncestor.setBounds.call(this, rect);
        if (this.bgA || this.bgB) {
            this.$canvas = $('<canvas width="' + rect.dim.width + '" height="' + rect.dim.height + '"/>').css({
                position: 'absolute',
                top: 0,
                left: 0
            });
            this.$div.append(this.$canvas);
            this.bc = new BoxConnector(this, this.$canvas.get(0).getContext('2d'));
            this.invalidate().update();
        }
    },
    processEvent: function (event) {
        if (this.bc && this.playing) {
            var p = null, bx1, bx2;
            if (event.type === 'touchend') {
                p = this.bc.active ? this.bc.dest.clone() : new AWT.Point();
            } else {
                var x = event.originalEvent.touches ? event.originalEvent.touches[0].pageX : event.pageX, y = event.originalEvent.touches ? event.originalEvent.touches[0].pageY : event.pageY;
                p = new AWT.Point(x - this.$div.offset().left, y - this.$div.offset().top);
            }
            var up = false, m = false, clickOnBg0 = false;
            switch (event.type) {
            case 'touchcancel':
                if (this.bc.active)
                    this.bc.end();
                break;
            case 'mouseup':
                if (this.bc.active && p.distanceTo(this.bc.origin) <= 3) {
                    break;
                }
                up = true;
            case 'touchend':
            case 'touchstart':
            case 'mousedown':
                this.ps.stopMedia(1);
                if (!this.bc.active) {
                    if (up)
                        break;
                    bx1 = this.bgA.findActiveBox(p);
                    bx2 = this.bgB.findActiveBox(p);
                    if (bx1 && (!this.act.useOrder || bx1.idOrder === this.currentItem) || !this.act.useOrder && bx2 && bx2.idAss !== -1) {
                        if (this.act.dragCells)
                            this.bc.begin(p, bx1 ? bx1 : bx2);
                        else
                            this.bc.begin(p);
                        if (bx1)
                            m = bx1.playMedia(this.ps);
                        if (!m)
                            this.playEvent('click');
                    }
                } else {
                    var origin = this.bc.origin;
                    this.bc.end();
                    bx1 = this.bgA.findActiveBox(origin);
                    if (bx1) {
                        bx2 = this.bgB.findActiveBox(p);
                    } else {
                        bx2 = this.bgB.findActiveBox(origin);
                        if (bx2) {
                            bx1 = this.bgA.findActiveBox(p);
                            clickOnBg0 = true;
                        }
                    }
                    if (bx1 && bx2 && bx1.idAss !== -1 && bx2.idAss !== -1) {
                        var ok = false, src = bx1.getDescription(), dest = bx2.getDescription(), matchingDest = this.act.abc['secondary'].getActiveBoxContent(bx1.idOrder);
                        if (bx1.idOrder === bx2.idOrder || bx2.getContent().isEquivalent(matchingDest, true)) {
                            ok = true;
                            bx1.idAss = -1;
                            bx2.idAss = -1;
                            if (this.act.abc['solvedPrimary']) {
                                bx1.switchToAlt(this.ps);
                                m |= bx1.playMedia(this.ps);
                            } else {
                                if (clickOnBg0)
                                    m |= bx1.playMedia(this.ps);
                                else
                                    m |= bx2.playMedia(this.ps);
                                bx1.clear();
                            }
                            bx2.clear();
                            if (this.act.useOrder)
                                this.currentItem = this.bgA.getNextItem(this.currentItem);
                        }
                        var cellsPlaced = this.bgB.countCellsWithIdAss(-1);
                        this.ps.reportNewAction(this.act, 'MATCH', src, dest, ok, cellsPlaced);
                        if (ok && cellsPlaced === this.bgB.getNumCells())
                            this.finishActivity(true);
                        else if (!m)
                            this.playEvent(ok ? 'actionOk' : 'actionError');
                    }
                    this.update();
                }
                break;
            case 'mousemove':
            case 'touchmove':
                this.bc.moveTo(p);
                break;
            }
            event.preventDefault();
        }
    }
};
SimpleAssociation.Panel.prototype = $.extend(Object.create(ActPanelAncestor), SimpleAssociation.Panel.prototype);
Activity.CLASSES['@associations.SimpleAssociation'] = SimpleAssociation;
module.exports = SimpleAssociation;
},{"../../AWT":47,"../../Activity":48,"../../boxes/ActiveBoxGrid":87,"../../boxes/BoxBag":88,"../../boxes/BoxConnector":90,"jquery":5}],56:[function(require,module,exports){
var $ = require('jquery'), Activity = require('../../Activity'), ActiveBoxGrid = require('../../boxes/ActiveBoxGrid'), BoxBag = require('../../boxes/BoxBag'), BoxConnector = require('../../boxes/BoxConnector'), AWT = require('../../AWT'), Rectangular = require('../../shapers/Rectangular');
var MemoryGame = function (project) {
    Activity.call(this, project);
};
MemoryGame.prototype = {
    constructor: MemoryGame,
    getMinNumActions: function () {
        return this.abc.primary.getNumCells();
    },
    hasRandom: function () {
        return true;
    },
    shuffleAlways: function () {
        return true;
    }
};
MemoryGame.prototype = $.extend(Object.create(Activity.prototype), MemoryGame.prototype);
MemoryGame.Panel = function (act, ps, $div) {
    Activity.Panel.call(this, act, ps, $div);
};
var ActPanelAncestor = Activity.Panel.prototype;
MemoryGame.Panel.prototype = {
    constructor: MemoryGame.Panel,
    bg: null,
    bc: null,
    events: [
        'mousedown',
        'mouseup',
        'mousemove',
        'touchstart',
        'touchend',
        'touchmove',
        'touchcancel'
    ],
    clear: function () {
        if (this.bg) {
            this.bg.end();
            this.bg = null;
        }
    },
    buildVisualComponents: function () {
        if (this.firstRun)
            ActPanelAncestor.buildVisualComponents.call(this);
        this.clear();
        var abcA = this.act.abc['primary'];
        var abcB = this.act.abc['secondary'];
        if (abcA) {
            if (abcA.imgName)
                abcA.setImgContent(this.act.project.mediaBag, null, false);
            if (abcB && abcB.imgName)
                abcB.setImgContent(this.act.project.mediaBag, null, false);
            if (this.act.acp !== null) {
                var contentKit = [abcA];
                if (abcB)
                    contentKit.push(abcB);
                this.act.acp.generateContent(abcA.nch, abcA.ncw, contentKit, false);
            }
            var ncw = abcA.ncw;
            var nch = abcA.nch;
            if (this.act.boxGridPos === 'AB' || this.act.boxGridPos === 'BA')
                ncw *= 2;
            else
                nch *= 2;
            this.bg = new ActiveBoxGrid(null, this, abcA.bb, this.act.margin, this.act.margin, abcA.w * ncw, abcA.h * nch, new Rectangular(ncw, nch));
            var nc = abcA.getNumCells();
            this.bg.setBorder(abcA.border);
            this.bg.setContent(abcA, null, 0, 0, nc);
            this.bg.setContent(abcB ? abcB : abcA, null, 0, nc, nc);
            for (var i = 0; i < 2; i++) {
                for (var j = 0; j < nc; j++) {
                    var bx = this.bg.getActiveBox(i * nc + j);
                    bx.idAss = j;
                    bx.setInactive(true);
                }
            }
            this.bg.setVisible(true);
        }
    },
    initActivity: function () {
        ActPanelAncestor.initActivity.call(this);
        if (!this.firstRun)
            this.buildVisualComponents();
        else
            this.firstRun = false;
        if (this.bg) {
            this.shuffle([this.bg], true, true);
            this.playing = true;
            this.invalidate().update();
        }
    },
    updateContent: function (dirtyRegion) {
        ActPanelAncestor.updateContent.call(this, dirtyRegion);
        if (this.bg && this.$canvas) {
            var canvas = this.$canvas.get(0);
            var ctx = canvas.getContext('2d');
            if (!dirtyRegion)
                dirtyRegion = new AWT.Rectangle(0, 0, canvas.width, canvas.height);
            ctx.clearRect(dirtyRegion.pos.x, dirtyRegion.pos.y, dirtyRegion.dim.width, dirtyRegion.dim.height);
            this.bg.update(ctx, dirtyRegion, this);
        }
        return this;
    },
    setDimension: function (preferredMaxSize) {
        if (!this.bg || this.getBounds().equals(preferredMaxSize))
            return preferredMaxSize;
        return BoxBag.layoutSingle(preferredMaxSize, this.bg, this.act.margin);
    },
    setBounds: function (rect) {
        this.$div.empty();
        ActPanelAncestor.setBounds.call(this, rect);
        if (this.bg) {
            this.$canvas = $('<canvas width="' + rect.dim.width + '" height="' + rect.dim.height + '"/>').css({
                position: 'absolute',
                top: 0,
                left: 0
            });
            this.$div.append(this.$canvas);
            this.bc = new BoxConnector(this, this.$canvas.get(0).getContext('2d'));
            this.invalidate().update();
        }
    },
    processEvent: function (event) {
        if (this.bc && this.playing) {
            var p = null;
            var bx1, bx2;
            if (event.type === 'touchend') {
                p = this.bc.active ? this.bc.dest.clone() : new AWT.Point();
            } else {
                var x = event.originalEvent.touches ? event.originalEvent.touches[0].pageX : event.pageX;
                var y = event.originalEvent.touches ? event.originalEvent.touches[0].pageY : event.pageY;
                p = new AWT.Point(x - this.$div.offset().left, y - this.$div.offset().top);
            }
            var up = false;
            switch (event.type) {
            case 'touchcancel':
                if (this.bc.active)
                    this.bc.end();
                break;
            case 'mouseup':
            case 'touchend':
                if (this.bc.active && p.distanceTo(this.bc.origin) <= 3) {
                    break;
                }
                up = true;
            case 'touchstart':
            case 'mousedown':
                this.ps.stopMedia(1);
                if (!this.bc.active) {
                    if (up)
                        break;
                    bx1 = this.bg.findActiveBox(p);
                    if (bx1 && bx1.idAss !== -1) {
                        if (!bx1.playMedia(this.ps))
                            this.playEvent('click');
                        bx1.setInactive(false);
                        this.update();
                        if (this.act.dragCells)
                            this.bc.begin(p, bx1);
                        else
                            this.bc.begin(p);
                    }
                } else {
                    if (this.act.dragCells)
                        bx1 = this.bc.bx;
                    else
                        bx1 = this.bg.findActiveBox(this.bc.origin);
                    this.bc.end();
                    bx2 = this.bg.findActiveBox(p);
                    if (bx1 && bx1.idAss !== -1 && bx2 && bx2.idAss !== -1) {
                        if (bx1 !== bx2) {
                            var ok = false;
                            if (bx1.idAss === bx2.idAss || bx1.getContent().isEquivalent(bx2.getContent(), true)) {
                                ok = true;
                                bx1.idAss = -1;
                                bx1.setInactive(false);
                                bx2.idAss = -1;
                                bx2.setInactive(false);
                            } else {
                                bx1.setInactive(true);
                                if (this.act.dragCells)
                                    bx2.setInactive(true);
                                else {
                                    bx2.setInactive(false);
                                    this.update();
                                    if (this.act.dragCells)
                                        this.bc.begin(p, bx1);
                                    else
                                        this.bc.begin(p);
                                }
                            }
                            var m = bx2.playMedia(this.ps);
                            var cellsAtPlace = this.bg.countCellsWithIdAss(-1);
                            this.ps.reportNewAction(this.act, 'MATCH', bx1.getDescription(), bx2.getDescription(), ok, cellsAtPlace / 2);
                            if (ok && cellsAtPlace === this.bg.getNumCells())
                                this.finishActivity(true);
                            else if (!m)
                                this.playEvent(ok ? 'actionOk' : 'actionError');
                        } else {
                            this.playEvent('CLICK');
                            bx1.setInactive(true);
                        }
                    } else if (bx1 !== null) {
                        bx1.setInactive(true);
                    }
                    this.invalidate().update();
                }
                break;
            case 'mousemove':
            case 'touchmove':
                this.bc.moveTo(p);
                break;
            }
            event.preventDefault();
        }
    }
};
MemoryGame.Panel.prototype = $.extend(Object.create(ActPanelAncestor), MemoryGame.Panel.prototype);
Activity.CLASSES['@memory.MemoryGame'] = MemoryGame;
module.exports = MemoryGame;
},{"../../AWT":47,"../../Activity":48,"../../boxes/ActiveBoxGrid":87,"../../boxes/BoxBag":88,"../../boxes/BoxConnector":90,"../../shapers/Rectangular":103,"jquery":5}],57:[function(require,module,exports){
var $ = require('jquery'), Activity = require('../../Activity'), ActiveBoxGrid = require('../../boxes/ActiveBoxGrid'), BoxBag = require('../../boxes/BoxBag'), AWT = require('../../AWT'), Rectangular = require('../../shapers/Rectangular');
var Explore = function (project) {
    Activity.call(this, project);
};
Explore.prototype = {
    constructor: Explore,
    mustPauseSequence: function () {
        return true;
    },
    getMinNumActions: function () {
        return 0;
    },
    hasRandom: function () {
        return true;
    }
};
Explore.prototype = $.extend(Object.create(Activity.prototype), Explore.prototype);
Explore.Panel = function (act, ps, $div) {
    Activity.Panel.call(this, act, ps, $div);
};
var ActPanelAncestor = Activity.Panel.prototype;
Explore.Panel.prototype = {
    constructor: Explore.Panel,
    bgA: null,
    bgB: null,
    events: ['click'],
    clear: function () {
        if (this.bgA) {
            this.bgA.end();
            this.bgA = null;
        }
        if (this.bgB) {
            this.bgB.end();
            this.bgB = null;
        }
    },
    buildVisualComponents: function () {
        if (this.firstRun)
            ActPanelAncestor.buildVisualComponents.call(this);
        this.clear();
        var abcA = this.act.abc['primary'];
        var abcB = this.act.abc['secondary'];
        if (abcA && abcB) {
            if (abcA.imgName)
                abcA.setImgContent(this.act.project.mediaBag, null, false);
            if (abcB.imgName)
                abcB.setImgContent(this.act.project.mediaBag, null, false);
            if (this.act.acp !== null)
                this.act.acp.generateContent(abcA.nch, abcA.ncw, [
                    abcA,
                    abcB
                ], false);
            this.bgA = ActiveBoxGrid.createEmptyGrid(null, this, this.act.margin, this.act.margin, abcA);
            var w = abcB.w;
            if (this.act.boxGridPos === 'AUB' || this.act.boxGridPos === 'BUA')
                w = abcA.getTotalWidth();
            this.bgB = new ActiveBoxGrid(null, this, abcB.bb, this.act.margin, this.act.margin, w, abcB.h, new Rectangular(1, 1));
            this.bgA.setContent(abcA);
            this.bgA.setDefaultIdAss();
            this.bgB.getActiveBox(0).setInactive(false);
            this.bgA.setVisible(true);
            this.bgB.setVisible(true);
        }
    },
    initActivity: function () {
        ActPanelAncestor.initActivity.call(this);
        if (!this.firstRun)
            this.buildVisualComponents();
        else
            this.firstRun = false;
        if (this.bgA && this.bgB) {
            if (this.act.scramble.primary)
                this.shuffle([this.bgA], true, true);
            if (this.useOrder)
                this.currentItem = this.bgA.getNextItem(-1);
            this.playing = true;
            this.invalidate().update();
        }
    },
    updateContent: function (dirtyRegion) {
        ActPanelAncestor.updateContent.call(this, dirtyRegion);
        if (this.bgA && this.bgB && this.$canvas) {
            var canvas = this.$canvas.get(0);
            var ctx = canvas.getContext('2d');
            if (!dirtyRegion)
                dirtyRegion = new AWT.Rectangle(0, 0, canvas.width, canvas.height);
            ctx.clearRect(dirtyRegion.pos.x, dirtyRegion.pos.y, dirtyRegion.dim.width, dirtyRegion.dim.height);
            this.bgA.update(ctx, dirtyRegion, this);
            this.bgB.update(ctx, dirtyRegion, this);
        }
        return this;
    },
    setDimension: function (preferredMaxSize) {
        if (!this.bgA || !this.bgB || this.getBounds().equals(preferredMaxSize))
            return preferredMaxSize;
        return BoxBag.layoutDouble(preferredMaxSize, this.bgA, this.bgB, this.act.boxGridPos, this.act.margin);
    },
    setBounds: function (rect) {
        this.$div.empty();
        ActPanelAncestor.setBounds.call(this, rect);
        if (this.bgA || this.bgB) {
            this.$canvas = $('<canvas width="' + rect.dim.width + '" height="' + rect.dim.height + '"/>').css({
                position: 'absolute',
                top: 0,
                left: 0
            });
            this.$div.append(this.$canvas);
            this.invalidate().update();
        }
    },
    processEvent: function (event) {
        if (this.playing) {
            var bx1, bx2;
            var p = new AWT.Point(event.pageX - this.$div.offset().left, event.pageY - this.$div.offset().top);
            switch (event.type) {
            case 'click':
                this.ps.stopMedia(1);
                bx1 = this.bgA.findActiveBox(p);
                if (bx1) {
                    bx2 = this.bgB.getActiveBox(0);
                    if (bx1.idAss !== -1 && (!this.act.useOrder || bx1.idOrder === this.currentItem)) {
                        bx2.setContent(this.act.abc['secondary'], bx1.idAss);
                        if (!bx2.playMedia(this.ps) && !bx1.playMedia(this.ps))
                            this.playEvent('CLICK');
                        if (this.act.useOrder)
                            this.currentItem = this.bgA.getNextItem(this.currentItem);
                        this.ps.reportNewAction(this.act, 'SELECT', bx1.getDescription(), bx2.getDescription(), true, 0);
                    } else {
                        bx2.clear();
                        bx2.setInactive(false);
                    }
                    this.update();
                }
                break;
            }
            event.preventDefault();
        }
    }
};
Explore.Panel.prototype = $.extend(Object.create(ActPanelAncestor), Explore.Panel.prototype);
Activity.CLASSES['@panels.Explore'] = Explore;
module.exports = Explore;
},{"../../AWT":47,"../../Activity":48,"../../boxes/ActiveBoxGrid":87,"../../boxes/BoxBag":88,"../../shapers/Rectangular":103,"jquery":5}],58:[function(require,module,exports){
var $ = require('jquery'), Activity = require('../../Activity'), ActiveBoxGrid = require('../../boxes/ActiveBoxGrid'), BoxBag = require('../../boxes/BoxBag'), AWT = require('../../AWT');
var Identify = function (project) {
    Activity.call(this, project);
};
Identify.prototype = {
    constructor: Identify,
    nonAssignedCells: 0,
    cellsToMatch: 1,
    getMinNumActions: function () {
        return this.cellsToMatch;
    },
    hasRandom: function () {
        return true;
    }
};
Identify.prototype = $.extend(Object.create(Activity.prototype), Identify.prototype);
Identify.Panel = function (act, ps, $div) {
    Activity.Panel.call(this, act, ps, $div);
};
var ActPanelAncestor = Activity.Panel.prototype;
Identify.Panel.prototype = {
    constructor: Identify.Panel,
    bg: null,
    events: ['click'],
    clear: function () {
        if (this.bg) {
            this.bg.end();
            this.bg = null;
        }
    },
    buildVisualComponents: function () {
        if (this.firstRun)
            ActPanelAncestor.buildVisualComponents.call(this);
        this.clear();
        var abc = this.act.abc['primary'];
        var solved = this.act.abc['solvedPrimary'];
        if (abc) {
            if (abc.imgName)
                abc.setImgContent(this.act.project.mediaBag, null, false);
            if (solved && solved.imgName)
                solved.setImgContent(this.act.project.mediaBag, null, false);
            if (this.act.acp !== null) {
                var contentKit = [abc];
                if (solved) {
                    contentKit.push(null);
                    contentKit.push(solved);
                }
                this.act.acp.generateContent(abc.nch, abc.ncw, contentKit, false);
            }
            this.bg = ActiveBoxGrid.createEmptyGrid(null, this, this.act.margin, this.act.margin, abc);
            this.bg.setContent(abc, solved ? solved : null);
            this.bg.setAlternative(false);
            this.bg.setDefaultIdAss();
            this.nonAssignedCells = 0;
            this.cellsToMatch = 0;
            var n = this.bg.getNumCells();
            for (var i = 0; i < n; i++) {
                var bx = this.bg.getActiveBox(i);
                var id = bx.idAss;
                if (id === 1)
                    this.cellsToMatch++;
                else if (id === -1) {
                    this.nonAssignedCells++;
                    bx.switchToAlt(this.ps);
                }
            }
            this.bg.setVisible(true);
        }
    },
    initActivity: function () {
        ActPanelAncestor.initActivity.call(this);
        if (!this.firstRun)
            this.buildVisualComponents();
        else
            this.firstRun = false;
        if (this.bg) {
            if (this.act.scramble['primary'])
                this.shuffle([this.bg], true, true);
            if (this.useOrder)
                this.currentItem = this.bg.getNextItem(-1);
            this.playing = true;
            this.invalidate().update();
        }
    },
    updateContent: function (dirtyRegion) {
        if (this.bg && this.$canvas) {
            var canvas = this.$canvas.get(0);
            var ctx = canvas.getContext('2d');
            if (!dirtyRegion)
                dirtyRegion = new AWT.Rectangle(0, 0, canvas.width, canvas.height);
            ctx.clearRect(dirtyRegion.pos.x, dirtyRegion.pos.y, dirtyRegion.dim.width, dirtyRegion.dim.height);
            this.bg.update(ctx, dirtyRegion, this);
        }
        return ActPanelAncestor.updateContent.call(this, dirtyRegion);
    },
    setDimension: function (preferredMaxSize) {
        if (this.getBounds().equals(preferredMaxSize))
            return preferredMaxSize;
        return BoxBag.layoutSingle(preferredMaxSize, this.bg, this.act.margin);
    },
    setBounds: function (rect) {
        this.$div.empty();
        ActPanelAncestor.setBounds.call(this, rect);
        if (this.bg) {
            this.$canvas = $('<canvas width="' + rect.dim.width + '" height="' + rect.dim.height + '"/>');
            this.$div.append(this.$canvas);
            this.invalidate().update();
        }
    },
    processEvent: function (event) {
        if (this.playing) {
            var bx;
            var m = false;
            var p = new AWT.Point(event.pageX - this.$div.offset().left, event.pageY - this.$div.offset().top);
            switch (event.type) {
            case 'click':
                this.ps.stopMedia(1);
                bx = this.bg.findActiveBox(p);
                if (bx) {
                    if (bx.idAss !== -1) {
                        var ok = false;
                        var src = bx.getDescription();
                        m |= bx.playMedia(this.ps);
                        if (bx.idAss === 1 && (!this.act.useOrder || bx.idOrder === this.currentItem)) {
                            ok = true;
                            bx.idAss = -1;
                            if (bx.switchToAlt(this.ps))
                                m |= bx.playMedia(this.ps);
                            else
                                bx.clear();
                            if (this.act.useOrder)
                                this.currentItem = this.bg.getNextItem(this.currentItem, 1);
                        }
                        var cellsOk = this.bg.countCellsWithIdAss(-1);
                        this.ps.reportNewAction(this.act, 'SELECT', src, null, ok, cellsOk - this.nonAssignedCells);
                        if (ok && cellsOk === this.cellsToMatch + this.nonAssignedCells)
                            this.finishActivity(true);
                        else if (!m)
                            this.playEvent(ok ? 'actionOk' : 'actionError');
                        this.update();
                    } else {
                        this.playEvent('actionError');
                    }
                }
                break;
            }
            event.preventDefault();
        }
    }
};
Identify.Panel.prototype = $.extend(Object.create(ActPanelAncestor), Identify.Panel.prototype);
Activity.CLASSES['@panels.Identify'] = Identify;
module.exports = Identify;
},{"../../AWT":47,"../../Activity":48,"../../boxes/ActiveBoxGrid":87,"../../boxes/BoxBag":88,"jquery":5}],59:[function(require,module,exports){
var $ = require('jquery'), Activity = require('../../Activity'), ActiveBoxGrid = require('../../boxes/ActiveBoxGrid'), BoxBag = require('../../boxes/BoxBag'), AWT = require('../../AWT');
var InformationScreen = function (project) {
    Activity.call(this, project);
    this.includeInReports = false;
    this.reportActions = false;
};
InformationScreen.prototype = { constructor: InformationScreen };
InformationScreen.prototype = $.extend(Object.create(Activity.prototype), InformationScreen.prototype);
InformationScreen.Panel = function (act, ps, $div) {
    Activity.Panel.call(this, act, ps, $div);
};
var ActPanelAncestor = Activity.Panel.prototype;
InformationScreen.Panel.prototype = {
    constructor: InformationScreen.Panel,
    bg: null,
    events: ['click'],
    clear: function () {
        if (this.bg) {
            this.bg.end();
            this.bg = null;
        }
    },
    buildVisualComponents: function () {
        if (this.firstRun)
            ActPanelAncestor.buildVisualComponents.call(this);
        this.clear();
        var abc = this.act.abc['primary'];
        if (abc) {
            if (abc.imgName)
                abc.setImgContent(this.act.project.mediaBag, null, false);
            if (this.act.acp !== null)
                this.act.acp.generateContent(abc.nch, abc.ncw, [abc], false);
            this.bg = ActiveBoxGrid.createEmptyGrid(null, this, this.act.margin, this.act.margin, abc);
            this.bg.setContent(abc);
            this.bg.setVisible(true);
        }
    },
    updateContent: function (dirtyRegion) {
        ActPanelAncestor.updateContent.call(this, dirtyRegion);
        if (this.bg && this.$canvas) {
            var canvas = this.$canvas.get(0);
            var ctx = canvas.getContext('2d');
            if (!dirtyRegion)
                dirtyRegion = new AWT.Rectangle(0, 0, canvas.width, canvas.height);
            ctx.clearRect(dirtyRegion.pos.x, dirtyRegion.pos.y, dirtyRegion.dim.width, dirtyRegion.dim.height);
            this.bg.update(ctx, dirtyRegion, this);
        }
        return this;
    },
    setDimension: function (preferredMaxSize) {
        if (this.getBounds().equals(preferredMaxSize))
            return preferredMaxSize;
        return BoxBag.layoutSingle(preferredMaxSize, this.bg, this.act.margin);
    },
    setBounds: function (rect) {
        this.$div.empty();
        ActPanelAncestor.setBounds.call(this, rect);
        if (this.bg) {
            this.$canvas = $('<canvas width="' + rect.dim.width + '" height="' + rect.dim.height + '"/>').css({
                position: 'absolute',
                top: 0,
                left: 0
            });
            this.$div.append(this.$canvas);
            this.invalidate().update();
        }
    },
    processEvent: function (event) {
        if (this.playing) {
            var p = new AWT.Point(event.pageX - this.$div.offset().left, event.pageY - this.$div.offset().top);
            this.ps.stopMedia(1);
            var bx = this.bg.findActiveBox(p);
            if (bx) {
                if (!bx.playMedia(this.ps))
                    this.playEvent('click');
            }
            event.preventDefault();
        }
    }
};
InformationScreen.Panel.prototype = $.extend(Object.create(ActPanelAncestor), InformationScreen.Panel.prototype);
Activity.CLASSES['@panels.InformationScreen'] = InformationScreen;
module.exports = InformationScreen;
},{"../../AWT":47,"../../Activity":48,"../../boxes/ActiveBoxGrid":87,"../../boxes/BoxBag":88,"jquery":5}],60:[function(require,module,exports){
var $ = require('jquery'), Activity = require('../../Activity'), ActiveBoxGrid = require('../../boxes/ActiveBoxGrid'), BoxBag = require('../../boxes/BoxBag'), BoxConnector = require('../../boxes/BoxConnector'), AWT = require('../../AWT');
var DoublePuzzle = function (project) {
    Activity.call(this, project);
};
DoublePuzzle.prototype = {
    constructor: DoublePuzzle,
    getMinNumActions: function () {
        return this.abc.primary.getNumCells();
    },
    hasRandom: function () {
        return true;
    },
    shuffleAlways: function () {
        return true;
    },
    helpSolutionAllowed: function () {
        return true;
    }
};
DoublePuzzle.prototype = $.extend(Object.create(Activity.prototype), DoublePuzzle.prototype);
DoublePuzzle.Panel = function (act, ps, $div) {
    Activity.Panel.call(this, act, ps, $div);
};
var ActPanelAncestor = Activity.Panel.prototype;
DoublePuzzle.Panel.prototype = {
    constructor: DoublePuzzle.Panel,
    bgA: null,
    bgB: null,
    bc: null,
    events: [
        'mousedown',
        'mouseup',
        'mousemove',
        'touchstart',
        'touchend',
        'touchmove',
        'touchcancel'
    ],
    clear: function () {
        if (this.bgA) {
            this.bgA.end();
            this.bgA = null;
        }
        if (this.bgB) {
            this.bgB.end();
            this.bgB = null;
        }
    },
    buildVisualComponents: function () {
        if (this.firstRun)
            ActPanelAncestor.buildVisualComponents.call(this);
        this.clear();
        var abc = this.act.abc['primary'];
        if (abc) {
            if (abc.imgName)
                abc.setImgContent(this.act.project.mediaBag, null, false);
            if (this.act.acp !== null)
                this.act.acp.generateContent(abc.nch, abc.ncw, [abc], false);
            this.bgA = ActiveBoxGrid.createEmptyGrid(null, this, this.act.margin, this.act.margin, abc);
            this.bgB = ActiveBoxGrid.createEmptyGrid(null, this, this.act.margin, this.act.margin, abc);
            this.bgA.setContent(abc);
            this.bgA.setVisible(true);
            this.bgB.setVisible(true);
            var bgbA = this.bgA.getBackgroundActiveBox();
            var bgbB = this.bgB.getBackgroundActiveBox();
            if (bgbA && bgbB)
                bgbB.exchangeContent(bgbA);
        }
    },
    initActivity: function () {
        ActPanelAncestor.initActivity.call(this);
        if (!this.firstRun)
            this.buildVisualComponents();
        else
            this.firstRun = false;
        if (this.bgA && this.bgB) {
            this.shuffle([this.bgA], true, true);
            if (this.useOrder)
                this.currentItem = this.bgA.getNextItem(-1);
            this.playing = true;
            this.invalidate().update();
        }
    },
    updateContent: function (dirtyRegion) {
        ActPanelAncestor.updateContent.call(this, dirtyRegion);
        if (this.bgA && this.bgB && this.$canvas) {
            var canvas = this.$canvas.get(0);
            var ctx = canvas.getContext('2d');
            if (!dirtyRegion)
                dirtyRegion = new AWT.Rectangle(0, 0, canvas.width, canvas.height);
            ctx.clearRect(dirtyRegion.pos.x, dirtyRegion.pos.y, dirtyRegion.dim.width, dirtyRegion.dim.height);
            this.bgA.update(ctx, dirtyRegion, this);
            this.bgB.update(ctx, dirtyRegion, this);
        }
        return this;
    },
    setDimension: function (preferredMaxSize) {
        if (!this.bgA || !this.bgB || this.getBounds().equals(preferredMaxSize))
            return preferredMaxSize;
        return BoxBag.layoutDouble(preferredMaxSize, this.bgA, this.bgB, this.act.boxGridPos, this.act.margin);
    },
    setBounds: function (rect) {
        this.$div.empty();
        ActPanelAncestor.setBounds.call(this, rect);
        if (this.bgA || this.bgB) {
            this.$canvas = $('<canvas width="' + rect.dim.width + '" height="' + rect.dim.height + '"/>').css({
                position: 'absolute',
                top: 0,
                left: 0
            });
            this.$div.append(this.$canvas);
            this.bc = new BoxConnector(this, this.$canvas.get(0).getContext('2d'));
            this.invalidate().update();
        }
    },
    processEvent: function (event) {
        if (this.bc && this.playing) {
            var p = null;
            var bx1, bx2;
            if (event.type === 'touchend') {
                p = this.bc.active ? this.bc.dest.clone() : new AWT.Point();
            } else {
                var x = event.originalEvent.touches ? event.originalEvent.touches[0].pageX : event.pageX;
                var y = event.originalEvent.touches ? event.originalEvent.touches[0].pageY : event.pageY;
                p = new AWT.Point(x - this.$div.offset().left, y - this.$div.offset().top);
            }
            var up = false;
            switch (event.type) {
            case 'touchcancel':
                if (this.bc.active)
                    this.bc.end();
                break;
            case 'mouseup':
                if (this.bc.active && p.distanceTo(this.bc.origin) <= 3) {
                    break;
                }
                up = true;
            case 'touchend':
            case 'touchstart':
            case 'mousedown':
                this.ps.stopMedia(1);
                if (!this.bc.active) {
                    if (up)
                        break;
                    bx1 = this.bgA.findActiveBox(p);
                    if (bx1 && !bx1.isInactive() && (!this.act.useOrder || bx1.idOrder === this.currentItem)) {
                        if (this.act.dragCells)
                            this.bc.begin(p, bx1);
                        else
                            this.bc.begin(p);
                        if (!bx1.playMedia(this.ps))
                            this.playEvent('click');
                    }
                } else {
                    if (this.act.dragCells)
                        bx1 = this.bc.bx;
                    else
                        bx1 = this.bgA.findActiveBox(this.bc.origin);
                    bx2 = this.bgB.findActiveBox(p);
                    this.bc.end();
                    if (bx1 && bx2 && bx2.isInactive()) {
                        var ok = false;
                        var src = bx1.getDescription() + ' (' + bx1.idOrder + ')';
                        var dest = '(' + bx2.idOrder + ')';
                        var target = this.act.abc['primary'].getActiveBoxContent(bx2.idOrder);
                        if (bx1.getContent().isEquivalent(target, true)) {
                            ok = true;
                            bx1.exchangeContent(bx2);
                            bx1.setVisible(false);
                            if (this.act.useOrder)
                                this.currentItem = this.bgA.getNextItem(this.currentItem);
                        }
                        var cellsAtPlace = this.bgA.countInactiveCells();
                        this.ps.reportNewAction(this.act, 'PLACE', src, dest, ok, cellsAtPlace);
                        if (ok && cellsAtPlace === this.bgA.getNumCells())
                            this.finishActivity(true);
                        else
                            this.playEvent(ok ? 'actionOk' : 'actionError');
                    }
                    this.update();
                }
                break;
            case 'mousemove':
            case 'touchmove':
                this.bc.moveTo(p);
                break;
            }
            event.preventDefault();
        }
    }
};
DoublePuzzle.Panel.prototype = $.extend(Object.create(ActPanelAncestor), DoublePuzzle.Panel.prototype);
Activity.CLASSES['@puzzles.DoublePuzzle'] = DoublePuzzle;
module.exports = DoublePuzzle;
},{"../../AWT":47,"../../Activity":48,"../../boxes/ActiveBoxGrid":87,"../../boxes/BoxBag":88,"../../boxes/BoxConnector":90,"jquery":5}],61:[function(require,module,exports){
var $ = require('jquery'), Activity = require('../../Activity'), ActiveBoxGrid = require('../../boxes/ActiveBoxGrid'), BoxBag = require('../../boxes/BoxBag'), BoxConnector = require('../../boxes/BoxConnector'), AWT = require('../../AWT');
var ExchangePuzzle = function (project) {
    Activity.call(this, project);
};
ExchangePuzzle.prototype = {
    constructor: ExchangePuzzle,
    getMinNumActions: function () {
        return this.abc.primary.getNumCells();
    },
    hasRandom: function () {
        return true;
    },
    shuffleAlways: function () {
        return true;
    },
    helpSolutionAllowed: function () {
        return true;
    }
};
ExchangePuzzle.prototype = $.extend(Object.create(Activity.prototype), ExchangePuzzle.prototype);
ExchangePuzzle.Panel = function (act, ps, $div) {
    Activity.Panel.call(this, act, ps, $div);
};
var ActPanelAncestor = Activity.Panel.prototype;
ExchangePuzzle.Panel.prototype = {
    constructor: ExchangePuzzle.Panel,
    bg: null,
    bc: null,
    events: [
        'mousedown',
        'mouseup',
        'mousemove',
        'touchstart',
        'touchend',
        'touchmove',
        'touchcancel'
    ],
    clear: function () {
        if (this.bg) {
            this.bg.end();
            this.bg = null;
        }
    },
    buildVisualComponents: function () {
        if (this.firstRun)
            ActPanelAncestor.buildVisualComponents.call(this);
        this.clear();
        var abc = this.act.abc['primary'];
        if (abc) {
            if (abc.imgName)
                abc.setImgContent(this.act.project.mediaBag, null, false);
            if (this.act.acp !== null)
                this.act.acp.generateContent(abc.nch, abc.ncw, [abc], false);
            this.bg = ActiveBoxGrid.createEmptyGrid(null, this, this.act.margin, this.act.margin, abc);
            this.bg.setContent(abc);
            this.bg.setVisible(true);
        }
    },
    initActivity: function () {
        ActPanelAncestor.initActivity.call(this);
        if (!this.firstRun)
            this.buildVisualComponents();
        else
            this.firstRun = false;
        if (this.bg) {
            this.shuffle([this.bg], true, true);
            if (this.useOrder)
                this.currentItem = this.bg.getNextItem(-1);
            this.playing = true;
            this.invalidate().update();
        }
    },
    updateContent: function (dirtyRegion) {
        ActPanelAncestor.updateContent.call(this, dirtyRegion);
        if (this.bg && this.$canvas) {
            var canvas = this.$canvas.get(0);
            var ctx = canvas.getContext('2d');
            if (!dirtyRegion)
                dirtyRegion = new AWT.Rectangle(0, 0, canvas.width, canvas.height);
            ctx.clearRect(dirtyRegion.pos.x, dirtyRegion.pos.y, dirtyRegion.dim.width, dirtyRegion.dim.height);
            this.bg.update(ctx, dirtyRegion, this);
        }
        return this;
    },
    setDimension: function (preferredMaxSize) {
        if (!this.bg || this.getBounds().equals(preferredMaxSize))
            return preferredMaxSize;
        return BoxBag.layoutSingle(preferredMaxSize, this.bg, this.act.margin);
    },
    setBounds: function (rect) {
        this.$div.empty();
        ActPanelAncestor.setBounds.call(this, rect);
        if (this.bg) {
            this.$canvas = $('<canvas width="' + rect.dim.width + '" height="' + rect.dim.height + '"/>').css({
                position: 'absolute',
                top: 0,
                left: 0
            });
            this.$div.append(this.$canvas);
            this.bc = new BoxConnector(this, this.$canvas.get(0).getContext('2d'));
            this.invalidate().update();
        }
    },
    processEvent: function (event) {
        if (this.bc && this.playing) {
            var p = null;
            var bx1, bx2;
            if (event.type === 'touchend') {
                p = this.bc.active ? this.bc.dest.clone() : new AWT.Point();
            } else {
                var x = event.originalEvent.touches ? event.originalEvent.touches[0].pageX : event.pageX;
                var y = event.originalEvent.touches ? event.originalEvent.touches[0].pageY : event.pageY;
                p = new AWT.Point(x - this.$div.offset().left, y - this.$div.offset().top);
            }
            var up = false;
            switch (event.type) {
            case 'touchcancel':
                if (this.bc.active)
                    this.bc.end();
                break;
            case 'mouseup':
                if (this.bc.active && p.distanceTo(this.bc.origin) <= 3) {
                    break;
                }
                up = true;
            case 'touchend':
            case 'touchstart':
            case 'mousedown':
                this.ps.stopMedia(1);
                if (!this.bc.active) {
                    if (up)
                        break;
                    bx1 = this.bg.findActiveBox(p);
                    if (bx1) {
                        if (this.act.dragCells)
                            this.bc.begin(p, bx1);
                        else
                            this.bc.begin(p);
                        if (!bx1.playMedia(this.ps))
                            this.playEvent('click');
                    }
                } else {
                    if (this.act.dragCells)
                        bx1 = this.bc.bx;
                    else
                        bx1 = this.bg.findActiveBox(this.bc.origin);
                    this.bc.end();
                    bx2 = this.bg.findActiveBox(p);
                    if (bx1 && bx2) {
                        var ok = false;
                        var src = bx1.getDescription() + ' (' + bx1.idOrder + ')';
                        var dest = '(' + bx2.idLoc + ')';
                        ok = bx1.idOrder === bx2.idLoc;
                        bx1.exchangeLocation(bx2);
                        var cellsAtPlace = this.bg.countCellsAtEquivalentPlace(true);
                        this.ps.reportNewAction(this.act, 'PLACE', src, dest, ok, cellsAtPlace);
                        if (ok && cellsAtPlace === this.bg.getNumCells())
                            this.finishActivity(true);
                        else
                            this.playEvent(ok ? 'actionOk' : 'actionError');
                    }
                    this.update();
                }
                break;
            case 'mousemove':
            case 'touchmove':
                this.bc.moveTo(p);
                break;
            }
            event.preventDefault();
        }
    }
};
ExchangePuzzle.Panel.prototype = $.extend(Object.create(ActPanelAncestor), ExchangePuzzle.Panel.prototype);
Activity.CLASSES['@puzzles.ExchangePuzzle'] = ExchangePuzzle;
module.exports = ExchangePuzzle;
},{"../../AWT":47,"../../Activity":48,"../../boxes/ActiveBoxGrid":87,"../../boxes/BoxBag":88,"../../boxes/BoxConnector":90,"jquery":5}],62:[function(require,module,exports){
var $ = require('jquery'), Activity = require('../../Activity'), ActiveBoxGrid = require('../../boxes/ActiveBoxGrid'), BoxBag = require('../../boxes/BoxBag'), BoxConnector = require('../../boxes/BoxConnector'), AWT = require('../../AWT'), Rectangular = require('../../shapers/Rectangular');
var HolePuzzle = function (project) {
    Activity.call(this, project);
};
HolePuzzle.prototype = {
    constructor: HolePuzzle,
    getMinNumActions: function () {
        return this.abc.primary.getNumCells();
    },
    hasRandom: function () {
        return true;
    },
    shuffleAlways: function () {
        return true;
    },
    helpSolutionAllowed: function () {
        return true;
    }
};
HolePuzzle.prototype = $.extend(Object.create(Activity.prototype), HolePuzzle.prototype);
HolePuzzle.Panel = function (act, ps, $div) {
    Activity.Panel.call(this, act, ps, $div);
};
var ActPanelAncestor = Activity.Panel.prototype;
HolePuzzle.Panel.prototype = {
    constructor: HolePuzzle.Panel,
    bg: null,
    parkBg: null,
    hiddenBox: null,
    hiddenBoxIndex: -1,
    events: ['click'],
    clear: function () {
        if (this.bg) {
            this.bg.end();
            this.bg = null;
        }
        if (this.parkBg) {
            this.parkBg.end();
            this.parkBg = null;
        }
    },
    buildVisualComponents: function () {
        if (this.firstRun)
            ActPanelAncestor.buildVisualComponents.call(this);
        this.clear();
        var abc = this.act.abc['primary'];
        if (abc) {
            if (abc.imgName)
                abc.setImgContent(this.act.project.mediaBag, null, false);
            if (this.act.acp !== null)
                this.act.acp.generateContent(abc.nch, abc.ncw, [abc], false);
            this.bg = ActiveBoxGrid.createEmptyGrid(null, this, this.act.margin, this.act.margin, abc);
            this.bg.setContent(abc);
            this.bg.setVisible(true);
            this.hiddenBoxIndex = Math.floor(Math.random() * this.bg.getNumCells());
            this.hiddenBox = this.bg.getActiveBox(this.hiddenBoxIndex);
            this.hiddenBox.setVisible(false);
            this.parkBg = new ActiveBoxGrid(null, this, abc.bb, this.act.margin, this.act.margin, this.hiddenBox.dim.width, this.hiddenBox.dim.height, new Rectangular(1, 1));
            this.parkBg.setContent(abc, null, this.hiddenBoxIndex, 0, 1);
            this.parkBg.setBorder(this.bg.hasBorder());
            this.parkBg.setVisible(true);
        }
    },
    initActivity: function () {
        ActPanelAncestor.initActivity.call(this);
        if (!this.firstRun)
            this.buildVisualComponents();
        else
            this.firstRun = false;
        if (this.bg) {
            if (this.act.shuffles % 2 !== 1)
                this.act.shuffles++;
            for (var i = 0; i < this.act.shuffles; i++) {
                var pth = this.bg.getCoord(this.hiddenBox);
                var v = Math.floor(Math.random() * 2) === 0 ? 1 : -1;
                if (Math.floor(Math.random() * 2) === 0) {
                    pth.x += v;
                    if (pth.x < 0 || pth.x >= this.bg.nCols)
                        pth.x -= 2 * v;
                } else {
                    pth.y += v;
                    if (pth.y < 0 || pth.y >= this.bg.nRows)
                        pth.y -= 2 * v;
                }
                var dstBx = this.bg.getActiveBoxWithIdLoc(pth.y * this.bg.nCols + pth.x);
                if (dstBx !== null)
                    this.hiddenBox.exchangeLocation(dstBx);
            }
            this.playing = true;
            this.invalidate().update();
        }
    },
    updateContent: function (dirtyRegion) {
        ActPanelAncestor.updateContent.call(this, dirtyRegion);
        if (this.bg && this.parkBg && this.$canvas) {
            var canvas = this.$canvas.get(0);
            var ctx = canvas.getContext('2d');
            if (!dirtyRegion)
                dirtyRegion = new AWT.Rectangle(0, 0, canvas.width, canvas.height);
            ctx.clearRect(dirtyRegion.pos.x, dirtyRegion.pos.y, dirtyRegion.dim.width, dirtyRegion.dim.height);
            this.bg.update(ctx, dirtyRegion, this);
            this.parkBg.update(ctx, dirtyRegion, this);
        }
        return this;
    },
    setDimension: function (preferredMaxSize) {
        if (!this.bg || !this.parkBg || this.getBounds().equals(preferredMaxSize))
            return preferredMaxSize;
        return BoxBag.layoutDouble(preferredMaxSize, this.bg, this.parkBg, this.act.boxGridPos, this.act.margin);
    },
    setBounds: function (rect) {
        this.$div.empty();
        ActPanelAncestor.setBounds.call(this, rect);
        if (this.bg && this.parkBg) {
            this.$canvas = $('<canvas width="' + rect.dim.width + '" height="' + rect.dim.height + '"/>').css({
                position: 'absolute',
                top: 0,
                left: 0
            });
            this.$div.append(this.$canvas);
            this.invalidate().update();
        }
    },
    processEvent: function (event) {
        if (this.playing) {
            var bx;
            var p = new AWT.Point(event.pageX - this.$div.offset().left, event.pageY - this.$div.offset().top);
            switch (event.type) {
            case 'click':
                this.ps.stopMedia(1);
                bx = this.bg.findActiveBox(p);
                if (bx) {
                    if (bx.isVisible()) {
                        var pt = this.bg.getCoordDist(bx, this.hiddenBox);
                        if (Math.abs(pt.x) + Math.abs(pt.y) === 1) {
                            var m = bx.playMedia(this.ps);
                            var src = bx.getDescription() + '(' + bx.idOrder + ')';
                            var dest = '(' + this.hiddenBox.idLoc + ')';
                            bx.exchangeLocation(this.hiddenBox);
                            var ok = bx.idOrder === bx.idLoc;
                            var cellsAtPlace = this.bg.countCellsAtEquivalentPlace(true);
                            this.ps.reportNewAction(this.act, 'SELECT', src, dest, ok, cellsAtPlace);
                            if (ok && cellsAtPlace === this.bg.getNumCells()) {
                                this.hiddenBox.setVisible(true);
                                this.parkBg.setVisible(false);
                                this.finishActivity(true);
                            } else if (!m)
                                this.playEvent('click');
                        }
                        this.update();
                    } else {
                        this.playEvent('actionError');
                    }
                }
                break;
            }
            event.preventDefault();
        }
    }
};
HolePuzzle.Panel.prototype = $.extend(Object.create(ActPanelAncestor), HolePuzzle.Panel.prototype);
Activity.CLASSES['@puzzles.HolePuzzle'] = HolePuzzle;
module.exports = HolePuzzle;
},{"../../AWT":47,"../../Activity":48,"../../boxes/ActiveBoxGrid":87,"../../boxes/BoxBag":88,"../../boxes/BoxConnector":90,"../../shapers/Rectangular":103,"jquery":5}],63:[function(require,module,exports){
var $ = require('jquery'), Activity = require('../../Activity'), TextActivityBase = require('./TextActivityBase');
var Complete = function (project) {
    TextActivityBase.call(this, project);
};
Complete.prototype = { constructor: Complete };
Complete.prototype = $.extend(Object.create(TextActivityBase.prototype), Complete.prototype);
Complete.Panel = function (act, ps, $div) {
    TextActivityBase.Panel.call(this, act, ps, $div);
};
var ActPanelAncestor = TextActivityBase.Panel.prototype;
Complete.Panel.prototype = { constructor: Complete.Panel };
Complete.Panel.prototype = $.extend(Object.create(ActPanelAncestor), Complete.Panel.prototype);
Activity.CLASSES['@text.Complete'] = Complete;
module.exports = Complete;
},{"../../Activity":48,"./TextActivityBase":68,"jquery":5}],64:[function(require,module,exports){
var $ = require('jquery'), Utils = require('../../Utils');
var Evaluator = function (className) {
    this.className = className;
    if (window.Intl && window.Intl.Collator) {
        this.collator = new window.Intl.Collator();
    } else {
        this.collator = {
            compare: function (a, b) {
                var result = this.checkCase ? a === b : a.toUpperCase() === b.toUpperCase();
                return result;
            }
        };
    }
};
Evaluator.getEvaluator = function ($xml) {
    var ev = null;
    if ($xml) {
        var className = $xml.attr('class');
        var cl = Evaluator.CLASSES[className];
        if (cl) {
            ev = new cl(className);
            ev.setProperties($xml);
        } else
            console.log('[JClic] Unknown evaluator class: ' + className);
    }
    return ev;
};
Evaluator.prototype = {
    constructor: Evaluator,
    className: null,
    initiated: false,
    collator: null,
    checkCase: false,
    setProperties: function ($xml) {
        var evaluator = this;
        $.each($xml.get(0).attributes, function () {
            var name = this.name;
            var value = this.value;
            switch (name) {
            case 'class':
                evaluator.className = value;
                break;
            case 'checkCase':
            case 'checkAccents':
            case 'checkPunctuation':
            case 'checkDoubleSpaces':
            case 'detail':
                evaluator[name] = Utils.getBoolean(value);
                break;
            case 'checkSteps':
            case 'checkScope':
                evaluator[name] = Number(value);
                break;
            }
        });
        return this;
    },
    init: function () {
        this.initiated = true;
    },
    checkText: function (text, match) {
        if (match instanceof Array) {
            for (var i = 0; i < match.length; i++)
                if (this._checkText(text, match[i]))
                    return true;
        } else if (match)
            return this._checkText(text, match);
        return false;
    },
    _checkText: function (text, match) {
        return false;
    },
    evalText: function (text, match) {
        if (!(match instanceof Array))
            match = [match];
        return this._evalText(text, match);
    },
    _evalText: function (text, match) {
        return [];
    },
    isOk: function (flags) {
        for (var i = 0; i < flags.length; i++)
            if (flags[i] !== 0)
                return false;
        return true;
    }
};
Evaluator.BasicEvaluator = function (className) {
    Evaluator.call(this, className);
};
Evaluator.BasicEvaluator.prototype = {
    constructor: Evaluator.BasicEvaluator,
    checkAccents: true,
    checkPunctuation: true,
    checkDoubleSpaces: false,
    PUNCTUATION: '.,;:',
    init: function () {
        Evaluator.prototype.init.call(this);
        if (window.Intl && window.Intl.Collator) {
            this.collator = new window.Intl.Collator({
                sensitivity: this.checkAccents ? this.checkCase ? 'case' : 'accent' : 'base',
                ignorePunctuation: this.checkPunctuation
            });
        }
    },
    _checkText: function (text, match) {
        return this.collator.compare(this.getClearedText(text), this.getClearedText(match)) === 0;
    },
    _evalText: function (text, match) {
        var flags = [];
        var result = this._checkText(text, match[0]);
        for (var i = 0; i < text.length; i++) {
            flags[i] = result ? 0 : 1;
        }
        return flags;
    },
    getClearedText: function (src, skipped) {
        var i;
        if (!skipped) {
            skipped = [];
            for (i = 0; i < src.length; i++)
                skipped[i] = false;
        }
        if (this.checkPunctuation && this.checkDoubleSpaces)
            return src;
        var sb = '';
        var wasSpace = false;
        for (i = 0; i < src.length; i++) {
            var ch = src.charAt(i);
            if (this.PUNCTUATION.indexOf(ch) >= 0 && !this.checkPunctuation) {
                if (!wasSpace)
                    sb += ' ';
                else
                    skipped[i] = true;
                wasSpace = true;
            } else if (ch === ' ') {
                if (this.checkDoubleSpaces || !wasSpace)
                    sb += ch;
                else
                    skipped[i] = true;
                wasSpace = true;
            } else {
                wasSpace = false;
                sb += ch;
            }
        }
        return sb;
    }
};
Evaluator.BasicEvaluator.prototype = $.extend(Object.create(Evaluator.prototype), Evaluator.BasicEvaluator.prototype);
Evaluator.ComplexEvaluator = function (className) {
    Evaluator.BasicEvaluator.call(this, className);
};
Evaluator.ComplexEvaluator.prototype = {
    constructor: Evaluator.ComplexEvaluator,
    detail: true,
    checkSteps: 3,
    checkScope: 6,
    _evalText: function (text, match) {
        var i;
        if (!this.detail)
            return Evaluator.BasicEvaluator.prototype._evalText.call(this, text, match);
        var skipped = [];
        for (i = 0; i < text.length; i++) {
            skipped[i] = false;
        }
        var sText = this.getClearedText(text, skipped);
        var maxCheck = -1, maxCheckIndex = -1;
        var numChecks = [];
        var flags = [];
        for (i = 0; i < match.length; i++) {
            flags[i] = [];
            for (var j = 0; j < text.length; j++) {
                flags[i][j] = 0;
            }
            var ok = this.compareSegment(sText, sText.length, match[i], match[i].length, flags[i], false);
            numChecks[i] = this.countFlagsOk(flags[i]);
            if (ok) {
                maxCheckIndex = i;
                maxCheck = numChecks[i];
            }
        }
        if (maxCheckIndex === -1) {
            for (i = 0; i < match.length; i++) {
                if (numChecks[i] > maxCheck) {
                    maxCheck = numChecks[i];
                    maxCheckIndex = i;
                }
            }
        }
        var returnFlags = [];
        for (i = 0, k = 0; i < text.length; i++) {
            if (skipped[i])
                returnFlags[i] = 0;
            else
                returnFlags[i] = flags[maxCheckIndex][k++];
        }
        return returnFlags;
    },
    countFlagsOk: function (flags) {
        var r = 0;
        for (var i = 0; i < flags.length; i++)
            if (flags[i] === 0)
                r++;
        return r;
    },
    compareSegment: function (src, ls, ok, lok, attr, iterate) {
        var is = 0, iok = 0, lastIs = 0;
        var lastiok = true;
        var coinci = 0;
        var result = true;
        var chs = '', chok = '';
        if (ls === 0 || lok === 0 || src === null || ok === null)
            return false;
        for (; is < ls; is++, iok++) {
            chs = src.charAt(is);
            lastIs = is;
            if (iok >= 0 && iok < lok)
                chok = ok.charAt(iok);
            else
                chok = 0;
            if (this.collator.compare(chs, chok) === 0) {
                coinci++;
                attr[is] = 0;
                lastiok = true;
            } else {
                result = false;
                attr[is] = 1;
                if (!iterate && lastiok && chok !== 0 && this.checkSteps > 0 && this.checkScope > 0) {
                    var lbloc = 2 * this.checkSteps + 1;
                    var itcoinc = [];
                    var i = 0, j, is2, iok2, ls2, lok2, jmax;
                    for (j = 0; j < lbloc; j++) {
                        itcoinc[j] = 0;
                        i = iok + Math.floor((j + 1) / 2) * ((j & 1) !== 0 ? 1 : -1);
                        if (i >= lok)
                            continue;
                        is2 = i < 0 ? is - i : is;
                        if (is2 >= ls)
                            continue;
                        ls2 = (ls2 = ls - is2) > this.checkScope ? this.checkScope : ls2;
                        iok2 = i < 0 ? 0 : i;
                        lok2 = (lok2 = lok - iok2) > this.checkScope ? this.checkScope : lok2;
                        var flags2 = [];
                        for (var w = 0; w < src.length - is2; w++)
                            flags2[w] = 0;
                        var result2 = this.compareSegment(src.substring(is2), ls2, ok.substring(iok2), lok2, flags2, true);
                        itcoinc[j] = this.countFlagsOk(flags2);
                        if (result2)
                            break;
                    }
                    if (j === lbloc) {
                        jmax = this.checkSteps;
                        for (j = 0; j < lbloc; j++)
                            if (itcoinc[j] > itcoinc[jmax])
                                jmax = j;
                        i = iok + Math.floor((jmax + 1) / 2) * ((jmax & 1) !== 0 ? 1 : -1);
                    } else if (itcoinc[j] > 0)
                        coinci++;
                    iok = i;
                    lastiok = false;
                }
            }
        }
        if (iok !== lok) {
            result = false;
            attr[lastIs] = 1;
        }
        return result;
    }
};
Evaluator.ComplexEvaluator.prototype = $.extend(Object.create(Evaluator.BasicEvaluator.prototype), Evaluator.ComplexEvaluator.prototype);
Evaluator.CLASSES = {
    '@BasicEvaluator': Evaluator.BasicEvaluator,
    '@ComplexEvaluator': Evaluator.ComplexEvaluator
};
module.exports = Evaluator;
},{"../../Utils":53,"jquery":5}],65:[function(require,module,exports){
var $ = require('jquery'), Utils = require('../../Utils'), Activity = require('../../Activity'), TextActivityBase = require('./TextActivityBase');
var FillInBlanks = function (project) {
    TextActivityBase.call(this, project);
};
FillInBlanks.prototype = {
    constructor: FillInBlanks,
    autoJump: false,
    forceOkToAdvance: false,
    needsKeyboard: function () {
        return true;
    }
};
FillInBlanks.prototype = $.extend(Object.create(TextActivityBase.prototype), FillInBlanks.prototype);
FillInBlanks.Panel = function (act, ps, $div) {
    TextActivityBase.Panel.call(this, act, ps, $div);
};
var ActPanelAncestor = TextActivityBase.Panel.prototype;
FillInBlanks.Panel.prototype = {
    constructor: FillInBlanks.Panel,
    locked: true,
    $createTargetElement: function (target, $span) {
        var id = this.targets.length - 1;
        var idLabel = 'target' + ('000' + id).slice(-3);
        var thisPanel = this;
        $span.addClass('JClicTextTarget');
        if (target.isList && target.options) {
            $span = $('<select/>').attr({
                id: idLabel,
                name: idLabel
            });
            for (var i = 0; i < target.options.length; i++)
                $('<option/>', {
                    value: target.options[i],
                    text: target.options[i]
                }).appendTo($span);
            target.$comboList = $span.bind('focus change', function (event) {
                event.textTarget = target;
                thisPanel.processEvent(event);
            });
        } else {
            target.currentText = target.iniText ? target.iniText : Utils.fillString(target.iniChar, target.numIniChars);
            target.$span = $span.text(target.currentText).attr({
                contenteditable: 'true',
                id: idLabel,
                autocomplete: 'off',
                spellcheck: 'false'
            }).bind('focus input blur', function (event) {
                event.textTarget = target;
                thisPanel.processEvent(event);
            });
        }
        return $span;
    },
    checkTarget: function (target, onlyCheck, jumpDirection) {
        var result = this.act.ev.evalText(target.currentText, target.answers);
        var ok = this.act.ev.isOk(result);
        target.targetStatus = ok ? 'SOLVED' : 'WITH_ERROR';
        if (onlyCheck)
            return ok;
        this.markTarget(target, result);
        var targetsOk = this.countSolvedTargets(false);
        if (target.currentText.length > 0) {
            this.ps.reportNewAction(this.act, 'WRITE', target.currentText, target.getAnswers(), ok, targetsOk);
        }
        if (ok && targetsOk === this.targets.length) {
            this.finishActivity(true);
            return ok;
        } else if (target.currentText.length > 0)
            this.playEvent(ok ? 'actionOk' : 'actionError');
        if (jumpDirection && jumpDirection !== 0) {
            var p = target.num + jumpDirection;
            if (p >= this.targets.length)
                p = 0;
            else if (p < 0)
                p = this.targets.length - 1;
            target = this.targets[p];
            if (target.$span) {
                target.$span.focus();
                Utils.setSelectionRange(target.$span.get(0), 0, 0);
            } else if (target.$comboList)
                target.$comboList.focus();
        }
        return ok;
    },
    countSolvedTargets: function (checkNow) {
        var n = 0;
        for (var i = 0; i < this.targets.length; i++) {
            var target = this.targets[i];
            if (checkNow) {
                if (target.$span)
                    target.currentText = target.$span.text();
                else if (target.$comboList)
                    target.currentText = target.$comboList.val();
                this.checkTarget(target, true);
            }
            if (target.targetStatus === 'SOLVED')
                n++;
        }
        return n;
    },
    markTarget: function (target, attributes) {
        var i = 0;
        if (target.$comboList || this.act.ev.isOk(attributes))
            target.checkColors();
        else if (target.$span) {
            var txt = target.currentText;
            var fragments = [];
            var currentStatus = -1;
            var currentFragment = -1;
            for (; i < attributes.length && i < txt.length; i++) {
                if (attributes[i] !== currentStatus) {
                    fragments[++currentFragment] = '';
                    currentStatus = attributes[i];
                }
                fragments[currentFragment] += txt.charAt(i);
            }
            if (i < txt.length)
                fragments[currentFragment] += txt.substr(i);
            target.$span.empty();
            currentStatus = attributes[0];
            for (i = 0; i < fragments.length; i++) {
                $('<span/>').text(fragments[i]).css(target.doc.style[currentStatus === 0 ? 'target' : 'targetError'].css).appendTo(target.$span);
                currentStatus ^= 1;
            }
        }
        target.flagModified = false;
    },
    activityReady: function () {
        ActPanelAncestor.activityReady.call(this);
        $('.JClicTextTarget').css('white-space', 'normal');
        if (this.targets.length > 0 && this.targets[0].$span) {
            this.targets[0].$span.focus();
        }
    },
    finishActivity: function (result) {
        for (var i = 0; i < this.targets.length; i++) {
            var target = this.targets[i];
            if (target.$span)
                target.$span.removeAttr('contenteditable').blur();
            else if (target.$comboList)
                target.$comboList.attr('disabled', 'true').blur();
        }
        return ActPanelAncestor.finishActivity.call(this, result);
    },
    processEvent: function (event) {
        if (!ActPanelAncestor.processEvent.call(this, event))
            return false;
        var target = event.textTarget, $span = null, pos = 0;
        switch (event.type) {
        case 'focus':
            if (target) {
                if (target.$span && target.$span.children().length > 0) {
                    $span = target.$span;
                    pos = Math.min(target.currentText.length, Utils.getCaretCharacterOffsetWithin($span.get(0)));
                    $span.empty();
                    $span.text(target.currentText);
                    Utils.setSelectionRange($span.get(0), pos, pos);
                    target.flagModified = true;
                } else if (target.$comboList) {
                    target.$comboList.css(target.doc.style['target'].css);
                }
            }
            break;
        case 'blur':
            if (target.flagModified)
                this.checkTarget(target, false, 1);
            break;
        case 'input':
            if (target && target.$span) {
                $span = target.$span;
                var txt = $span.html();
                if (txt.indexOf('<br>') >= 0) {
                    txt = txt.replace(/<br>/g, '');
                    $span.html(txt);
                    target.currentText = $span.text();
                    return this.checkTarget(target, false, 1);
                }
                txt = $span.text();
                if (txt !== target.currentText) {
                    target.flagModified = true;
                    var added = txt.length - target.currentText.length;
                    if (added > 0) {
                        if (txt.indexOf(target.iniChar) >= 0) {
                            pos = Utils.getCaretCharacterOffsetWithin($span.get(0));
                            for (var i = 0; i < added; i++) {
                                var p = txt.indexOf(target.iniChar);
                                if (p < 0)
                                    break;
                                txt = txt.substr(0, p) + txt.substr(p + 1);
                                if (p < pos)
                                    pos--;
                            }
                            $span.text(txt);
                            Utils.setSelectionRange($span.get(0), pos, pos);
                        }
                        if (txt.length > target.maxLenResp) {
                            pos = Utils.getCaretCharacterOffsetWithin($span.get(0));
                            txt = txt.substr(0, target.maxLenResp);
                            pos = Math.min(pos, txt.length);
                            $span.text(txt);
                            Utils.setSelectionRange($span.get(0), pos, pos);
                        }
                    } else if (txt === '') {
                        txt = target.iniChar;
                        $span.text(txt);
                        Utils.setSelectionRange($span.get(0), 0, 0);
                    }
                    target.currentText = txt;
                }
            }
            break;
        case 'change':
            if (target && target.$comboList) {
                target.currentText = target.$comboList.val();
                target.flagModified = true;
                return this.checkTarget(target, false, 1);
            }
            break;
        default:
            break;
        }
        return true;
    }
};
FillInBlanks.Panel.prototype = $.extend(Object.create(ActPanelAncestor), FillInBlanks.Panel.prototype);
Activity.CLASSES['@text.FillInBlanks'] = FillInBlanks;
module.exports = FillInBlanks;
},{"../../Activity":48,"../../Utils":53,"./TextActivityBase":68,"jquery":5}],66:[function(require,module,exports){
var $ = require('jquery'), Activity = require('../../Activity'), TextActivityBase = require('./TextActivityBase');
var IdentifyText = function (project) {
    TextActivityBase.call(this, project);
};
IdentifyText.prototype = { constructor: IdentifyText };
IdentifyText.prototype = $.extend(Object.create(TextActivityBase.prototype), IdentifyText.prototype);
IdentifyText.Panel = function (act, ps, $div) {
    TextActivityBase.Panel.call(this, act, ps, $div);
};
var ActPanelAncestor = TextActivityBase.Panel.prototype;
IdentifyText.Panel.prototype = {
    constructor: IdentifyText.Panel,
    targetsMarked: false
};
IdentifyText.Panel.prototype = $.extend(Object.create(ActPanelAncestor), IdentifyText.Panel.prototype);
Activity.CLASSES['@text.Identify'] = IdentifyText;
module.exports = IdentifyText;
},{"../../Activity":48,"./TextActivityBase":68,"jquery":5}],67:[function(require,module,exports){
var $ = require('jquery'), Activity = require('../../Activity'), TextActivityBase = require('./TextActivityBase');
var OrderText = function (project) {
    TextActivityBase.call(this, project);
};
OrderText.prototype = {
    constructor: OrderText,
    amongParagraphs: false
};
OrderText.prototype = $.extend(Object.create(TextActivityBase.prototype), OrderText.prototype);
OrderText.Panel = function (act, ps, $div) {
    TextActivityBase.Panel.call(this, act, ps, $div);
};
var ActPanelAncestor = TextActivityBase.Panel.prototype;
OrderText.Panel.prototype = { constructor: OrderText.Panel };
OrderText.Panel.prototype = $.extend(Object.create(ActPanelAncestor), OrderText.Panel.prototype);
Activity.CLASSES['@text.Order'] = OrderText;
module.exports = OrderText;
},{"../../Activity":48,"./TextActivityBase":68,"jquery":5}],68:[function(require,module,exports){
var $ = require('jquery'), Activity = require('../../Activity'), AWT = require('../../AWT'), ActiveBox = require('../../boxes/ActiveBox');
var TextActivityBase = function (project) {
    Activity.call(this, project);
};
TextActivityBase.prototype = {
    constructor: TextActivityBase,
    tad: null,
    ev: null,
    checkButtonText: null,
    prevScreenText: null,
    prevScreenStyle: null,
    prevScreenMaxTime: -1
};
TextActivityBase.prototype = $.extend(Object.create(Activity.prototype), TextActivityBase.prototype);
TextActivityBase.Panel = function (act, ps, $div) {
    Activity.Panel.call(this, act, ps, $div);
    this.boxes = [];
    this.popups = [];
    this.targets = [];
};
var ActPanelAncestor = Activity.Panel.prototype;
TextActivityBase.Panel.prototype = {
    constructor: TextActivityBase.Panel,
    boxes: null,
    popups: null,
    targets: null,
    targetsMarked: true,
    buildVisualComponents: function () {
        ActPanelAncestor.buildVisualComponents.call(this);
        this.setDocContent(this.$div, this.act.document);
    },
    setDocContent: function ($dom, doc) {
        var thisPanel = this;
        $dom.empty().css(doc.style['default'].css).css('overflow', 'auto');
        var $html = $('<div class="JClicTextDocument"/>').css({ 'padding': 4 });
        $html.css(doc.style['default'].css);
        var currentPStyle = null;
        $.each(doc.p, function () {
            var $p = $('<p/>').css({ 'margin': 0 });
            var empty = true;
            if (this.style) {
                currentPStyle = doc.style[this.style].css;
                $p.css(currentPStyle);
            } else
                currentPStyle = null;
            if (this.Alignment) {
                var al = Number(this.Alignment);
                $p.css({ 'text-align': al === 1 ? 'center' : al === 2 ? 'right' : 'left' });
            }
            $.each(this.elements, function () {
                var $span = $('<span/>');
                switch (this.objectType) {
                case 'text':
                    if (this.attr) {
                        $span.html(this.text);
                        if (this.attr.style) {
                            $span.css(doc.style[this.attr.style].css);
                        }
                        if (this.attr.css) {
                            $span.css(this.attr.css);
                        }
                        $p.append($span);
                    } else {
                        $p.append(this.text);
                    }
                    break;
                case 'cell':
                    var box = ActiveBox.createCell($span, this);
                    thisPanel.boxes.push(box);
                    $span.css({
                        'display': 'inline-block',
                        'vertical-align': 'middle'
                    });
                    $p.append($span);
                    break;
                case 'target':
                    var target = this;
                    $span = thisPanel.$createTargetElement(target, $span);
                    target.num = thisPanel.targets.length;
                    thisPanel.targets.push(target);
                    $span.css(doc.style['default'].css);
                    if (currentPStyle)
                        $span.css(currentPStyle);
                    if (thisPanel.targetsMarked) {
                        if (target.attr) {
                            if (!target.attr.style)
                                target.attr.style = 'target';
                            $span.css(doc.style[target.attr.style].css);
                            if (target.attr.css)
                                $span.css(target.attr.css);
                        } else if (doc.style['target'])
                            $span.css(doc.style['target'].css);
                    }
                    $p.append($span);
                    break;
                }
                empty = false;
            });
            if (empty) {
                $p.html('&nbsp;');
            }
            $html.append($p);
        });
        $dom.append($html);
        return $dom;
    },
    $createTargetElement: function (target, $span) {
        $span.text(target.text);
        target.$span = $span;
        return $span;
    },
    processEvent: function (event) {
        if (this.playing) {
            switch (event.type) {
            case 'click':
                var p = new AWT.Point(event.pageX - this.$div.offset().left, event.pageY - this.$div.offset().top);
                for (var i = 0; i < this.boxes.length; i++) {
                    if (this.boxes[i].contains(p)) {
                        event.preventDefault();
                        this.ps.stopMedia(1);
                        this.boxes[i].playMedia(this.ps);
                        return false;
                    }
                }
            }
            return true;
        }
        return false;
    }
};
TextActivityBase.Panel.prototype = $.extend(Object.create(ActPanelAncestor), TextActivityBase.Panel.prototype);
module.exports = TextActivityBase;
},{"../../AWT":47,"../../Activity":48,"../../boxes/ActiveBox":84,"jquery":5}],69:[function(require,module,exports){
var $ = require('jquery'), Utils = require('../../Utils'), ActiveBoxContent = require('../../boxes/ActiveBoxContent'), MediaContent = require('../../media/MediaContent'), ActiveBagContent = require('../../boxes/ActiveBagContent');
var TextActivityDocument = function () {
    this.style = { 'default': $.extend(true, {}, TextActivityDocument.DEFAULT_DOC_STYLE) };
    this.p = [];
    this.boxesContent = new ActiveBagContent();
    this.popupsContent = new ActiveBagContent();
};
TextActivityDocument.prototype = {
    constructor: TextActivityDocument,
    tabSpc: 12,
    lastBoxId: 0,
    tmb: null,
    targetType: 'TT_FREE',
    boxesContent: null,
    popupsContent: null,
    style: null,
    p: null,
    setProperties: function ($xml, mediaBag) {
        var doc = this;
        $xml.children('style').each(function () {
            var attr = doc.readDocAttributes($(this));
            doc.style[attr.name] = attr;
        });
        $xml.find('section > p').each(function () {
            var p = { elements: [] };
            $.each(this.attributes, function () {
                var name = this.name;
                var value = this.value;
                switch (this.name) {
                case 'style':
                    p[name] = value;
                    break;
                case 'bidiLevel':
                case 'Alignment':
                    p[name] = Number(value);
                    break;
                }
            });
            $(this).children().each(function () {
                var obj;
                var $child = $(this);
                switch (this.nodeName) {
                case 'cell':
                    obj = new ActiveBoxContent().setProperties($child, mediaBag);
                    break;
                case 'text':
                    obj = { text: this.textContent.replace(/\t/g, '&#9;') };
                    var attr = doc.readDocAttributes($child);
                    if (!$.isEmptyObject(attr)) {
                        obj.attr = attr;
                    }
                    break;
                case 'target':
                    obj = new TextActivityDocument.TextTarget(doc, this.textContent.replace(/\t/g, '&#9;'));
                    obj.setProperties($child, mediaBag);
                    break;
                default:
                    console.log('[JClic] - Unknown object in activity document: ' + this.nodeName);
                }
                if (obj) {
                    obj.objectType = this.nodeName;
                    p.elements.push(obj);
                }
            });
            doc.p.push(p);
        });
        return this;
    },
    readDocAttributes: function ($xml) {
        var attr = {};
        var css = {};
        var thisDoc = this;
        $.each($xml.get(0).attributes, function () {
            var name = this.name;
            var val = this.value;
            switch (name) {
            case 'background':
                val = Utils.checkColor(val, 'white');
                attr[name] = val;
                css['background'] = val;
                break;
            case 'foreground':
                val = Utils.checkColor(val, 'black');
                attr[name] = val;
                css['color'] = val;
                break;
            case 'family':
                css['font-family'] = val;
            case 'name':
            case 'base':
            case 'style':
                attr[name] = val;
                break;
            case 'bold':
                val = Utils.getBoolean(val);
                attr[name] = val;
                css['font-weight'] = val ? 'bold' : 'normal';
                break;
            case 'italic':
                val = Utils.getBoolean(val);
                attr[name] = val;
                css['font-style'] = val ? 'italic' : 'normal';
                break;
            case 'target':
                attr[name] = Utils.getBoolean(val);
                break;
            case 'size':
                attr[name] = Number(val);
                css['font-size'] = val + 'px';
                break;
            case 'tabWidth':
                thisDoc.tabSpc = val;
                css['tab-size'] = thisDoc.tabSpc;
                css['white-space'] = 'pre-wrap';
                break;
            default:
                console.log('Unknown text attribute: ' + name + ': ' + val);
                attr[name] = val;
                break;
            }
        });
        if (!$.isEmptyObject(css))
            attr['css'] = css;
        return attr;
    }
};
TextActivityDocument.DEFAULT_DOC_STYLE = {
    background: 'white',
    foreground: 'black',
    family: 'Arial',
    size: 17,
    css: {
        'font-family': 'Arial,Helvetica,sans-serif',
        'font-size': '17px',
        'margin': '0px',
        padding: '0px',
        'text-align': 'center',
        'vertical-align': 'middle'
    }
};
TextActivityDocument.TextTarget = function (doc, text) {
    this.doc = doc;
    this.text = text;
    this.numIniChars = text.length;
    this.answers = [text];
    this.maxLenResp = this.numIniChars;
};
TextActivityDocument.TextTarget.prototype = {
    constructor: TextActivityDocument.TextTarget,
    doc: null,
    text: null,
    attr: null,
    isList: false,
    numIniChars: 1,
    iniChar: '_',
    maxLenResp: 0,
    answers: null,
    options: null,
    iniText: null,
    infoMode: 'no_info',
    popupContent: null,
    popupDelay: 0,
    popupMaxTime: 0,
    onlyPlay: false,
    $comboList: null,
    $span: null,
    currentText: '',
    num: 0,
    targetStatus: 'NOT_EDITED',
    flagModified: false,
    parentPane: null,
    reset: function () {
        this.targetStatus = 'NOT_EDITED';
        this.flagModified = false;
    },
    setProperties: function ($xml, mediaBag) {
        var tt = this;
        var firstAnswer = true;
        $xml.children().each(function () {
            var $node = $(this);
            switch (this.nodeName) {
            case 'answer':
                if (firstAnswer) {
                    firstAnswer = false;
                    tt.answers = [];
                }
                if (tt.answers === null)
                    tt.answers = [];
                tt.answers.push(this.textContent);
                break;
            case 'optionList':
                $node.children('option').each(function () {
                    tt.isList = true;
                    if (tt.options === null)
                        tt.options = [];
                    tt.options.push(this.textContent);
                });
                break;
            case 'response':
                tt.iniChar = Utils.getVal($node.attr('fill'), tt.iniChar).charAt(0);
                tt.numIniChars = Utils.getNumber($node.attr('length'), tt.numIniChars);
                tt.maxLenResp = Utils.getNumber($node.attr('maxLength'), tt.maxLenResp);
                tt.iniText = Utils.getVal($node.attr('show'), tt.iniText);
                break;
            case 'info':
                tt.infoMode = Utils.getVal($node.attr('mode'), 'always');
                tt.popupDelay = Utils.getNumber($node.attr('delay'), tt.popupDelay);
                tt.popupMaxTime = Utils.getNumber($node.attr('maxTime'), tt.popupMaxTime);
                $node.children('media').each(function () {
                    tt.onlyPlay = true;
                    tt.popupContent = new ActiveBoxContent();
                    tt.popupContent.mediaContent = new MediaContent().setProperties($(this));
                });
                if (!tt.popupContent) {
                    $node.children('cell').each(function () {
                        tt.popupContent = new ActiveBoxContent().setProperties($(this, mediaBag));
                    });
                }
                break;
            case 'text':
                tt.text = this.textContent.replace(/\t/g, '&#9;');
                var attr = TextActivityDocument.prototype.readDocAttributes($(this));
                if (!$.isEmptyObject(attr))
                    tt.attr = attr;
                break;
            default:
                break;
            }
        });
    },
    getAnswers: function () {
        return this.answers ? this.answers.join('|') : '';
    },
    checkColors: function () {
        var $element = this.$comboList ? this.$comboList : this.$span;
        if ($element) {
            var style = this.doc.style[this.targetStatus === 'WITH_ERROR' ? 'targetError' : 'target'];
            if (style && style.css) {
                $element.css(style.css);
            }
        }
    }
};
module.exports = TextActivityDocument;
},{"../../Utils":53,"../../boxes/ActiveBagContent":83,"../../boxes/ActiveBoxContent":86,"../../media/MediaContent":97,"jquery":5}],70:[function(require,module,exports){
var $ = require('jquery'), Activity = require('../../Activity'), ActiveBoxGrid = require('../../boxes/ActiveBoxGrid'), BoxBag = require('../../boxes/BoxBag'), AWT = require('../../AWT'), Utils = require('../../Utils'), Rectangular = require('../../shapers/Rectangular');
var WrittenAnswer = function (project) {
    Activity.call(this, project);
};
WrittenAnswer.prototype = {
    constructor: WrittenAnswer,
    nonAssignedCells: 0,
    useIdAss: true,
    setProperties: function ($xml) {
        Activity.prototype.setProperties.call(this, $xml);
        this.abc['primary'].avoidAllIdsNull(this.abc['answers'].getNumCells());
    },
    getMinNumActions: function () {
        if (this.invAss)
            return this.abc['answers'].getNumCells();
        else
            return this.abc['primary'].getNumCells() - this.nonAssignedCells;
    },
    hasRandom: function () {
        return true;
    },
    needsKeyboard: function () {
        return true;
    },
    helpSolutionAllowed: function () {
        return true;
    }
};
WrittenAnswer.prototype = $.extend(Object.create(Activity.prototype), WrittenAnswer.prototype);
WrittenAnswer.Panel = function (act, ps, $div) {
    Activity.Panel.call(this, act, ps, $div);
};
var ActPanelAncestor = Activity.Panel.prototype;
WrittenAnswer.Panel.prototype = {
    constructor: WrittenAnswer.Panel,
    $textField: null,
    invAssCheck: null,
    bgA: null,
    bgB: null,
    currentCell: -1,
    events: ['click'],
    clear: function () {
        if (this.bgA) {
            this.bgA.end();
            this.bgA = null;
        }
        if (this.bgB) {
            this.bgB.end();
            this.bgB = null;
        }
    },
    buildVisualComponents: function () {
        var n, i;
        if (this.firstRun)
            ActPanelAncestor.buildVisualComponents.call(this);
        this.clear();
        var abcA = this.act.abc['primary'];
        var abcB = this.act.abc['answers'];
        var solved = this.act.abc['solvedPrimary'];
        if (abcA && abcB) {
            if (this.act.invAss) {
                this.invAssCheck = [];
                n = abcB.getNumCells();
                for (i = 0; i < n; i++)
                    this.invAssCheck[i] = false;
            }
            if (abcA.imgName)
                abcA.setImgContent(this.act.project.mediaBag, null, false);
            if (solved && solved.imgName)
                solved.setImgContent(this.act.project.mediaBag, null, false);
            if (this.act.acp !== null) {
                var contentKit = [
                        abcA,
                        abcB
                    ];
                if (solved)
                    contentKit.push(solved);
                this.act.acp.generateContent(abcA.nch, abcA.ncw, contentKit, false);
            }
            this.bgA = ActiveBoxGrid.createEmptyGrid(null, this, this.act.margin, this.act.margin, abcA);
            var w = abcB.w;
            if (this.act.boxGridPos === 'AUB' || this.act.boxGridPos === 'BUA')
                w = abcA.getTotalWidth();
            this.bgB = new ActiveBoxGrid(null, this, abcB.bb, this.act.margin, this.act.margin, w, abcB.h, new Rectangular(1, 1));
            this.$form = $('<form id="form1" action="#"/>');
            var thisPanel = this;
            this.$form.submit(function (event) {
                event.preventDefault();
                if (thisPanel.playing) {
                    thisPanel.setCurrentCell(thisPanel.currentCell);
                }
            });
            this.$textField = $('<input type="text" size="200"/>').css(abcB.bb.getCSS()).css({
                position: 'absolute',
                top: 0,
                left: 0,
                border: 0,
                padding: 0,
                margin: 0,
                'text-align': 'center'
            });
            this.$form.append(this.$textField);
            this.bgA.setContent(abcA, solved ? solved : null);
            this.bgA.setDefaultIdAss();
            this.act.nonAssignedCells = 0;
            n = this.bgA.getNumCells();
            for (i = 0; i < n; i++) {
                var bx = this.bgA.getActiveBox(i);
                if (bx.idAss === -1) {
                    this.act.nonAssignedCells++;
                    bx.switchToAlt(this.ps);
                }
            }
            this.bgA.setVisible(true);
            this.bgB.setVisible(false);
        }
    },
    initActivity: function () {
        ActPanelAncestor.initActivity.call(this);
        if (!this.firstRun)
            this.buildVisualComponents();
        else
            this.firstRun = false;
        if (this.bgA && this.bgB) {
            if (this.act.scramble.primary)
                this.shuffle([this.bgA], true, true);
            if (this.useOrder)
                this.currentItem = this.bgA.getNextItem(-1);
            this.invalidate().update();
            this.playing = true;
        }
    },
    activityReady: function () {
        ActPanelAncestor.activityReady.call(this);
        this.setCurrentCell(0);
    },
    updateContent: function (dirtyRegion) {
        ActPanelAncestor.updateContent.call(this, dirtyRegion);
        if (this.bgA && this.$canvas) {
            var canvas = this.$canvas.get(0);
            var ctx = canvas.getContext('2d');
            if (!dirtyRegion)
                dirtyRegion = new AWT.Rectangle(0, 0, canvas.width, canvas.height);
            ctx.clearRect(dirtyRegion.pos.x, dirtyRegion.pos.y, dirtyRegion.dim.width, dirtyRegion.dim.height);
            this.bgA.update(ctx, dirtyRegion, this);
        }
        return this;
    },
    setDimension: function (preferredMaxSize) {
        if (!this.bgA || !this.bgB || this.getBounds().equals(preferredMaxSize))
            return preferredMaxSize;
        return BoxBag.layoutDouble(preferredMaxSize, this.bgA, this.bgB, this.act.boxGridPos, this.act.margin);
    },
    setBounds: function (rect) {
        this.$div.empty();
        ActPanelAncestor.setBounds.call(this, rect);
        if (this.bgA || this.bgB) {
            var r = rect.clone();
            if (this.act.boxGridPos === 'AUB')
                r.height -= this.bgB.pos.y + this.act.margin / 2;
            else if (this.act.boxGridPos === 'AB')
                r.width -= this.bgB.pos.x + this.act.margin / 2;
            this.$canvas = $('<canvas width="' + r.dim.width + '" height="' + r.dim.height + '"/>').css({
                position: 'absolute',
                top: 0,
                left: 0
            });
            this.$div.append(this.$canvas);
            if (this.$textField) {
                this.$textField.css({
                    top: this.bgB.pos.y,
                    left: this.bgB.pos.x,
                    width: this.bgB.dim.width,
                    height: this.bgB.dim.height,
                    zIndex: 9
                });
                this.$div.append(this.$form);
            }
            this.invalidate().update();
        }
    },
    checkInvAss: function () {
        var i;
        if (!this.act.invAss || !this.invAssCheck)
            return false;
        for (i = 0; i < this.invAssCheck.length; i++)
            if (!this.invAssCheck[i])
                break;
        return i === this.invAssCheck.length;
    },
    setCurrentCell: function (i) {
        var bx = null;
        var m = false;
        if (!this.playing)
            return;
        if (this.currentCell !== -1) {
            var ok = false;
            bx = this.bgA.getActiveBoxWithIdLoc(this.currentCell);
            var src = bx.getDescription();
            bx.setMarked(false);
            var id = bx.idAss;
            var txCheck = id >= 0 ? this.act.abc['answers'].getActiveBoxContent(id).text : '';
            var txAnswer = this.$textField.val().trim();
            if (Utils.compareMultipleOptions(txAnswer, txCheck, false)) {
                ok = true;
                bx.idAss = -1;
                var p = txCheck.indexOf('|');
                if (p >= 0)
                    this.$textField.val(txCheck.substring(0, p));
                if (this.act.abc['solvedPrimary']) {
                    bx.switchToAlt(this.ps);
                    m = bx.playMedia(this.ps);
                } else
                    bx.clear();
                if (this.act.invAss && id >= 0 && id < this.invAssCheck.length) {
                    this.invAssCheck[id] = true;
                }
                if (this.act.useOrder)
                    this.currentItem = this.bgA.getNextItem(this.currentItem);
            }
            var cellsPlaced = this.bgA.countCellsWithIdAss(-1);
            if (txAnswer.length > 0) {
                this.ps.reportNewAction(this.act, 'WRITE', src, txAnswer, ok, cellsPlaced);
            }
            if (ok && (this.checkInvAss() || cellsPlaced === this.bgA.getNumCells())) {
                this.finishActivity(true);
                this.$textField.prop('disabled', true);
                return;
            } else if (!m && txAnswer.length > 0)
                this.playEvent(ok ? 'actionOk' : 'actionError');
        }
        if (this.act.useOrder)
            bx = this.bgA.getBox(this.currentItem);
        else
            bx = this.bgA.getActiveBoxWithIdLoc(i);
        if (!bx || bx.idAss === -1) {
            for (var j = 0; j < this.bgA.getNumCells(); j++) {
                bx = this.bgA.getActiveBoxWithIdLoc(j);
                if (bx.idAss !== -1)
                    break;
            }
            if (bx && bx.idAss === -1) {
                this.finishActivity(false);
                this.$textField.prop('disabled', true);
                return;
            }
        }
        if (bx && this.bgA.getNumCells() > 1)
            bx.setMarked(true);
        if (bx)
            this.currentCell = bx.idLoc;
        this.$textField.val('');
        this.$textField.focus();
        this.invalidate().update();
        if (bx)
            bx.playMedia(this.ps);
    },
    processEvent: function (event) {
        if (this.playing) {
            switch (event.type) {
            case 'click':
                event.preventDefault();
                this.ps.stopMedia(1);
                var p = new AWT.Point(event.pageX - this.$div.offset().left, event.pageY - this.$div.offset().top);
                if (this.bgB.contains(p)) {
                    this.$textField.focus();
                    break;
                }
                var bx = this.bgA.findActiveBox(p);
                if (bx) {
                    if (bx.getContent() && bx.getContent().mediaContent === null)
                        this.playEvent('CLICK');
                    this.setCurrentCell(bx.idLoc);
                }
                break;
            case 'edit':
                event.preventDefault();
                this.setCurrentCell(this.currentCell);
                return false;
            }
        }
    }
};
WrittenAnswer.Panel.prototype = $.extend(Object.create(ActPanelAncestor), WrittenAnswer.Panel.prototype);
Activity.CLASSES['@text.WrittenAnswer'] = WrittenAnswer;
module.exports = WrittenAnswer;
},{"../../AWT":47,"../../Activity":48,"../../Utils":53,"../../boxes/ActiveBoxGrid":87,"../../boxes/BoxBag":88,"../../shapers/Rectangular":103,"jquery":5}],71:[function(require,module,exports){
var $ = require('jquery'), Activity = require('../../Activity'), BoxBase = require('../../boxes/BoxBase'), BoxBag = require('../../boxes/BoxBag'), TextGrid = require('../../boxes/TextGrid'), AbstractBox = require('../../boxes/AbstractBox'), ActiveBox = require('../../boxes/ActiveBox'), AWT = require('../../AWT'), Utils = require('../../Utils');
var K = Utils.settings;
var CrossWord = function (project) {
    Activity.call(this, project);
};
CrossWord.prototype = {
    constructor: CrossWord,
    upperCase: true,
    checkCase: true,
    wildTransparent: false,
    getMinNumActions: function () {
        return this.tgc.getNumChars() - this.tgc.countWildChars();
    },
    needsKeyboard: function () {
        return true;
    }
};
CrossWord.prototype = $.extend(Object.create(Activity.prototype), CrossWord.prototype);
CrossWord.Panel = function (act, ps, $div) {
    Activity.Panel.call(this, act, ps, $div);
};
var ActPanelAncestor = Activity.Panel.prototype;
CrossWord.Panel.prototype = {
    constructor: CrossWord.Panel,
    LABEL_WIDTH: 40,
    grid: null,
    bb: null,
    numLetters: 0,
    advance: 'NO_ADVANCE',
    hClue: null,
    vClue: null,
    hClueBtn: null,
    vClueBtn: null,
    events: [
        'click',
        'keydown',
        'keypress'
    ],
    clear: function () {
        if (this.grid) {
            this.grid.end();
            this.grid = null;
        }
        if (this.bb) {
            this.bb.end();
            this.bb = null;
        }
    },
    createBoxBag: function (type) {
        var bxb = new BoxBag(null, this, null);
        var sb = new AbstractBox(bxb, this, this.icoBB);
        sb.setBounds(0, 0, this.LABEL_WIDTH, this.act.abc[type].h);
        var $btn = $('<div/>').css({
                'width': this.LABEL_WIDTH,
                'height': this.act.abc[type].h,
                'background-image': 'url(' + (type === 'acrossClues' ? this.hIcon : this.vIcon) + ')',
                'background-repeat': 'no-repeat',
                'background-position': 'center',
                'border-radius': 6,
                'z-index': 10
            }).appendTo(this.$div);
        sb.setHostedComponent($btn);
        bxb.addBox(sb);
        var ab = new ActiveBox(bxb, null, null, type, new AWT.Rectangle(this.LABEL_WIDTH + this.act.margin, 0, this.act.abc[type].w, this.act.abc[type].h));
        bxb.addBox(ab);
        bxb.setBoxBase(this.act.abc[type].bb);
        if (type === 'acrossClues') {
            this.hClue = ab;
            this.hClueBtn = sb;
        } else {
            this.vClue = ab;
            this.vClueBtn = sb;
        }
        return bxb;
    },
    buildVisualComponents: function () {
        if (this.firstRun)
            ActPanelAncestor.buildVisualComponents.call(this);
        this.clear();
        var tgc = this.act.tgc;
        var abcH = this.act.abc['acrossClues'];
        if (abcH.imgName)
            abcH.setImgContent(this.act.project.mediaBag, null, false);
        var abcV = this.act.abc['downClues'];
        if (abcV.imgName)
            abcV.setImgContent(this.act.project.mediaBag, null, false);
        if (this.act.acp !== null) {
            this.act.acp.generateContent(0, 0, this.act.abc, false);
        }
        if (tgc) {
            this.grid = TextGrid.createEmptyGrid(null, this, this.act.margin, this.act.margin, tgc, this.act.wildTransparent);
            this.bb = new BoxBag(null, this, null);
            var bxbh = this.createBoxBag('acrossClues');
            var bxbv = this.createBoxBag('downClues');
            if (this.act.boxGridPos === 'AUB' || this.act.boxGridPos === 'BUA')
                bxbv.moveTo(new AWT.Point(bxbh.dim.width + this.act.margin, 0));
            else
                bxbv.moveTo(new AWT.Point(0, bxbh.dim.height + this.act.margin));
            this.bb.addBox(bxbh);
            this.bb.addBox(bxbv);
            this.grid.setVisible(true);
            this.bb.setVisible(true);
        }
    },
    initActivity: function () {
        ActPanelAncestor.initActivity.call(this);
        if (!this.firstRun)
            this.buildVisualComponents();
        else
            this.firstRun = false;
        if (this.grid) {
            this.grid.setChars(this.act.tgc.text);
            this.numLetters = this.act.getMinNumActions();
            this.grid.setCellAttributes(true, true);
            this.grid.setCursorEnabled(true);
            this.setCursorAt(0, 0);
            this.advance = 'ADVANCE_RIGHT';
            this.setBtnStatus();
            this.playing = true;
            this.invalidate().update();
            this.$div.attr('tabindex', 0);
            this.$div.focus();
        }
    },
    getCurrentScore: function () {
        return this.grid ? this.grid.countCoincidences(this.act.checkCase) : 0;
    },
    updateContent: function (dirtyRegion) {
        ActPanelAncestor.updateContent.call(this, dirtyRegion);
        if (this.grid && this.$canvas) {
            var canvas = this.$canvas.get(0);
            var ctx = canvas.getContext('2d');
            if (!dirtyRegion)
                dirtyRegion = new AWT.Rectangle(0, 0, canvas.width, canvas.height);
            ctx.clearRect(dirtyRegion.pos.x, dirtyRegion.pos.y, dirtyRegion.dim.width, dirtyRegion.dim.height);
            this.grid.update(ctx, dirtyRegion, this);
            this.bb.update(ctx, dirtyRegion, this);
        }
        return this;
    },
    setDimension: function (preferredMaxSize) {
        if (!this.grid || !this.bb || this.getBounds().equals(preferredMaxSize))
            return preferredMaxSize;
        else
            return BoxBag.layoutDouble(preferredMaxSize, this.grid, this.bb, this.act.boxGridPos, this.act.margin);
    },
    setBounds: function (rect) {
        if (this.$canvas) {
            this.$canvas.remove();
            this.$canvas = null;
        }
        ActPanelAncestor.setBounds.call(this, rect);
        if (this.grid) {
            this.$canvas = $('<canvas width="' + rect.dim.width + '" height="' + rect.dim.height + '"/>').css({
                position: 'absolute',
                top: 0,
                left: 0
            });
            this.$div.append(this.$canvas);
            this.invalidate().update();
        }
    },
    processEvent: function (event) {
        if (this.playing) {
            switch (event.type) {
            case 'click':
                var x = event.originalEvent && event.originalEvent.touches ? event.originalEvent.touches[0].pageX : event.pageX;
                var y = event.originalEvent && event.originalEvent.touches ? event.originalEvent.touches[0].pageY : event.pageY;
                var p = new AWT.Point(x - this.$div.offset().left, y - this.$div.offset().top);
                this.ps.stopMedia(1);
                if (this.grid.contains(p)) {
                    var pt = this.grid.getLogicalCoords(p);
                    if (pt !== null) {
                        this.setCursorAt(pt.x, pt.y);
                        if (K.TOUCH_DEVICE) {
                            var d = this.advance === 'ADVANCE_DOWN';
                            var txt = window.prompt((d ? 'Vertical' : 'Horizontal') + ' word:', '');
                            this.writeChars(txt);
                        }
                    }
                } else if (this.hClue.contains(p))
                    this.hClue.playMedia(this.ps);
                else if (this.vClue.contains(p))
                    this.vClue.playMedia(this.ps);
                else if (this.hClueBtn.contains(p)) {
                    if (this.advance === 'ADVANCE_RIGHT')
                        this.advance = 'NO_ADVANCE';
                    else
                        this.advance = 'ADVANCE_RIGHT';
                    this.setBtnStatus();
                } else if (this.vClueBtn.contains(p)) {
                    if (this.advance === 'ADVANCE_DOWN')
                        this.advance = 'NO_ADVANCE';
                    else
                        this.advance = 'ADVANCE_DOWN';
                    this.setBtnStatus();
                } else
                    break;
                this.update();
                break;
            case 'keypress':
                var code = event.charCode || event.keyCode;
                var cur = this.grid.getCursor();
                if (code && cur) {
                    event.preventDefault();
                    var ch = String.fromCharCode(code);
                    this.writeChars(ch);
                }
                break;
            case 'keydown':
                var dx = 0, dy = 0;
                switch (event.keyCode) {
                case K.VK.RIGHT:
                    dx = 1;
                    break;
                case K.VK.LEFT:
                    dx = -1;
                    break;
                case K.VK.DOWN:
                    dy = 1;
                    break;
                case K.VK.UP:
                    dy = -1;
                    break;
                }
                if (dx || dy) {
                    event.preventDefault();
                    this.moveCursor(dx, dy);
                    this.update();
                }
                break;
            }
        }
    },
    moveCursor: function (dx, dy) {
        if (this.grid) {
            this.grid.moveCursor(dx, dy, true);
            this.cursorPosChanged();
        }
    },
    setCursorAt: function (x, y) {
        this.grid.setCursorAt(x, y, true);
        this.cursorPosChanged();
    },
    cursorPosChanged: function () {
        var pt = this.grid.getCursor();
        if (pt !== null && this.bb !== null) {
            var items = this.grid.getItemFor(pt.x, pt.y);
            if (items !== null) {
                this.hClue.setContent(this.act.abc['acrossClues'].getActiveBoxContentWith(pt.y, items.x));
                this.vClue.setContent(this.act.abc['downClues'].getActiveBoxContentWith(pt.x, items.y));
            }
        }
    },
    writeChars: function (txt, x, y) {
        if (txt && txt.length > 0) {
            for (var i = 0; i < txt.length; i++) {
                var cur = this.grid.getCursor();
                var ch = txt.charAt(i);
                if (this.act.upperCase)
                    ch = ch.toLocaleUpperCase();
                this.grid.setCharAt(cur.x, cur.y, ch);
                var ok = this.grid.isCellOk(cur.x, cur.y, this.act.checkCase);
                var r = this.getCurrentScore();
                this.ps.reportNewAction(this.act, 'WRITE', ch, 'X:' + cur.x + ' Y:' + cur.y, ok, r);
                if (r === this.numLetters) {
                    this.grid.setCursorEnabled(false);
                    this.grid.stopCursorBlink();
                    this.finishActivity(true);
                } else {
                    this.playEvent('click');
                    if (this.advance === 'ADVANCE_DOWN')
                        this.moveCursor(0, 1);
                    else
                        this.moveCursor(1, 0);
                }
            }
        }
        this.update();
    },
    setBtnStatus: function () {
        if (this.hClueBtn)
            this.hClueBtn.setInactive(this.advance !== 'ADVANCE_RIGHT');
        if (this.vClueBtn)
            this.vClueBtn.setInactive(this.advance !== 'ADVANCE_DOWN');
    },
    hIcon: 'data:image/svg+xml;base64,' + 'PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIGZpbGw9IiNGRkZGRkYi' + 'IGhlaWdodD0iMzYiIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjM2IiB4bWxucz0iaHR0cDov' + 'L3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUi' + 'PjwvcGF0aD48cGF0aCBkPSJNNiAxMGMtMS4xIDAtMiAuOS0yIDJzLjkgMiAyIDIgMi0uOSAyLTIt' + 'LjktMi0yLTJ6bTEyIDBjLTEuMSAwLTIgLjktMiAycy45IDIgMiAyIDItLjkgMi0yLS45LTItMi0y' + 'em0tNiAwYy0xLjEgMC0yIC45LTIgMnMuOSAyIDIgMiAyLS45IDItMi0uOS0yLTItMnoiPjwvcGF0' + 'aD48L3N2Zz4K',
    vIcon: 'data:image/svg+xml;base64,' + 'PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIGZpbGw9IiNGRkZGRkYi' + 'IGhlaWdodD0iMzYiIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjM2IiB4bWxucz0iaHR0cDov' + 'L3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUi' + 'PjwvcGF0aD48cGF0aCBkPSJNMTIgOGMxLjEgMCAyLS45IDItMnMtLjktMi0yLTItMiAuOS0yIDIg' + 'LjkgMiAyIDJ6bTAgMmMtMS4xIDAtMiAuOS0yIDJzLjkgMiAyIDIgMi0uOSAyLTItLjktMi0yLTJ6' + 'bTAgNmMtMS4xIDAtMiAuOS0yIDJzLjkgMiAyIDIgMi0uOSAyLTItLjktMi0yLTJ6Ij48L3BhdGg+' + 'PC9zdmc+Cg==',
    icoSize: {
        w: 36,
        h: 36
    },
    icoBB: new BoxBase().set('backColor', '#4285F4').set('inactiveColor', '#70A2F6')
};
CrossWord.Panel.prototype = $.extend(Object.create(ActPanelAncestor), CrossWord.Panel.prototype);
Activity.CLASSES['@textGrid.CrossWord'] = CrossWord;
module.exports = CrossWord;
},{"../../AWT":47,"../../Activity":48,"../../Utils":53,"../../boxes/AbstractBox":82,"../../boxes/ActiveBox":84,"../../boxes/BoxBag":88,"../../boxes/BoxBase":89,"../../boxes/TextGrid":91,"jquery":5}],72:[function(require,module,exports){
var $ = require('jquery'), Activity = require('../../Activity'), ActiveBoxGrid = require('../../boxes/ActiveBoxGrid'), BoxBag = require('../../boxes/BoxBag'), BoxConnector = require('../../boxes/BoxConnector'), AWT = require('../../AWT'), TextGrid = require('../../boxes/TextGrid');
var WordSearch = function (project) {
    Activity.call(this, project);
};
WordSearch.prototype = {
    constructor: WordSearch,
    clues: null,
    clueItems: null,
    getMinNumActions: function () {
        return this.clues.length;
    },
    helpSolutionAllowed: function () {
        return true;
    },
    hasRandom: function () {
        return true;
    }
};
WordSearch.prototype = $.extend(Object.create(Activity.prototype), WordSearch.prototype);
WordSearch.Panel = function (act, ps, $div) {
    Activity.Panel.call(this, act, ps, $div);
    this.resolvedClues = [];
};
var ActPanelAncestor = Activity.Panel.prototype;
WordSearch.Panel.prototype = {
    constructor: WordSearch.Panel,
    grid: null,
    bgAlt: null,
    resolvedClues: null,
    bc: null,
    events: [
        'mousedown',
        'mouseup',
        'mousemove',
        'touchstart',
        'touchend',
        'touchmove',
        'touchcancel'
    ],
    clear: function () {
        if (this.grid) {
            this.grid.end();
            this.grid = null;
        }
        if (this.bgAlt) {
            this.bgAlt.end();
            this.bgAlt = null;
        }
    },
    buildVisualComponents: function () {
        if (this.firstRun)
            ActPanelAncestor.buildVisualComponents.call(this);
        this.clear();
        var tgc = this.act.tgc;
        var abcAlt = this.act.abc['secondary'];
        if (abcAlt) {
            if (abcAlt.imgName)
                abcAlt.setImgContent(this.act.project.mediaBag, null, false);
            if (this.act.acp !== null) {
                var contentKit = [abcAlt];
                this.act.acp.generateContent(0, 0, contentKit, false);
            }
        }
        if (tgc) {
            this.grid = TextGrid.createEmptyGrid(null, this, this.act.margin, this.act.margin, tgc, false);
            if (abcAlt)
                this.bgAlt = ActiveBoxGrid.createEmptyGrid(null, this, this.act.margin, this.act.margin, abcAlt);
            this.grid.setVisible(true);
        }
    },
    initActivity: function () {
        ActPanelAncestor.initActivity.call(this);
        if (!this.firstRun)
            this.buildVisualComponents();
        else
            this.firstRun = false;
        if (this.grid) {
            this.grid.setChars(this.act.tgc.text);
            this.grid.randomize();
            this.grid.setAllCellsAttribute(TextGrid.prototype.flags.INVERTED, false);
            for (var i = 0; i < this.act.clueItems.length; i++)
                this.resolvedClues[i] = false;
            if (this.bgAlt) {
                this.bgAlt.setContent(this.act.abc['secondary']);
                if (this.act.scramble[0]) {
                    var scrambleArray = [this.bgAlt];
                    this.act.shuffle(scrambleArray, true, true);
                }
                this.bgAlt.setVisible(false);
            }
            this.playing = true;
            this.invalidate().update();
        }
    },
    updateContent: function (dirtyRegion) {
        ActPanelAncestor.updateContent.call(this, dirtyRegion);
        if (this.grid && this.$canvas) {
            var canvas = this.$canvas.get(0);
            var ctx = canvas.getContext('2d');
            if (!dirtyRegion)
                dirtyRegion = new AWT.Rectangle(0, 0, canvas.width, canvas.height);
            ctx.clearRect(dirtyRegion.pos.x, dirtyRegion.pos.y, dirtyRegion.dim.width, dirtyRegion.dim.height);
            this.grid.update(ctx, dirtyRegion, this);
            if (this.bgAlt)
                this.bgAlt.update(ctx, dirtyRegion, this);
        }
        return this;
    },
    setDimension: function (preferredMaxSize) {
        if (!this.grid || this.getBounds().equals(preferredMaxSize))
            return preferredMaxSize;
        if (this.bgAlt)
            return BoxBag.layoutDouble(preferredMaxSize, this.grid, this.bgAlt, this.act.boxGridPos, this.act.margin);
        else
            return BoxBag.layoutSingle(preferredMaxSize, this.grid, this.act.margin);
    },
    setBounds: function (rect) {
        this.$div.empty();
        ActPanelAncestor.setBounds.call(this, rect);
        if (this.grid) {
            this.$canvas = $('<canvas width="' + rect.dim.width + '" height="' + rect.dim.height + '"/>').css({
                position: 'absolute',
                top: 0,
                left: 0
            });
            this.$div.append(this.$canvas);
            this.bc = new BoxConnector(this, this.$canvas.get(0).getContext('2d'));
            this.invalidate().update();
        }
    },
    getCurrentScore: function () {
        var result = 0;
        if (this.act.clues)
            for (var i = 0; i < this.act.clues.length; i++)
                if (this.resolvedClues[i])
                    result++;
        return result;
    },
    processEvent: function (event) {
        if (this.bc && this.playing) {
            var p = null;
            var bx1, bx2;
            if (event.type === 'touchend') {
                p = this.bc.active ? this.bc.dest.clone() : new AWT.Point();
            } else {
                var x = event.originalEvent.touches ? event.originalEvent.touches[0].pageX : event.pageX;
                var y = event.originalEvent.touches ? event.originalEvent.touches[0].pageY : event.pageY;
                p = new AWT.Point(x - this.$div.offset().left, y - this.$div.offset().top);
            }
            var up = false;
            var m = false;
            switch (event.type) {
            case 'touchcancel':
                if (this.bc.active)
                    this.bc.end();
                break;
            case 'mouseup':
                if (this.bc.active && p.distanceTo(this.bc.origin) <= 3) {
                    break;
                }
                up = true;
            case 'touchend':
            case 'touchstart':
            case 'mousedown':
                this.ps.stopMedia(1);
                if (!this.bc.active) {
                    if (up)
                        break;
                    if (this.grid.contains(p)) {
                        this.playEvent('click');
                        this.bc.begin(p);
                    }
                } else {
                    var pt1 = this.grid.getLogicalCoords(this.bc.origin);
                    var pt2 = this.grid.getLogicalCoords(this.bc.dest);
                    this.bc.end();
                    var s = this.grid.getStringBetween(pt1.x, pt1.y, pt2.x, pt2.y);
                    if (s !== null && s.length > 0) {
                        var ok = false;
                        for (var c = 0; c < this.act.clues.length; c++) {
                            if (s === this.act.clues[c]) {
                                ok = true;
                                break;
                            }
                        }
                        var repeated = this.resolvedClues[c];
                        if (ok && !repeated) {
                            this.resolvedClues[c] = true;
                            this.grid.setAttributeBetween(pt1.x, pt1.y, pt2.x, pt2.y, TextGrid.prototype.flags.INVERTED, true);
                            if (this.bgAlt !== null) {
                                var k = this.act.clueItems[c];
                                if (k >= 0 && k < this.bgAlt.getNumCells()) {
                                    var bx = this.bgAlt.getActiveBox(this.act.clueItems[c]);
                                    if (bx) {
                                        bx.setVisible(true);
                                        m = bx.playMedia(this.ps);
                                    }
                                }
                            }
                        }
                        if (!repeated) {
                            var r = this.getCurrentScore();
                            this.ps.reportNewAction(this.act, 'ACTION_SELECT', s, null, ok, r);
                            if (r === this.act.clues.length)
                                this.finishActivity(true);
                            else if (!m)
                                this.playEvent(ok ? 'actionOK' : 'actionError');
                            this.invalidate();
                        } else if (!ok && !m)
                            this.playEvent('actionError');
                    } else
                        this.playEvent('actionError');
                    this.update();
                }
                break;
            case 'mousemove':
            case 'touchmove':
                this.bc.moveTo(p);
                break;
            }
            event.preventDefault();
        }
    }
};
WordSearch.Panel.prototype = $.extend(Object.create(ActPanelAncestor), WordSearch.Panel.prototype);
Activity.CLASSES['@textGrid.WordSearch'] = WordSearch;
module.exports = WordSearch;
},{"../../AWT":47,"../../Activity":48,"../../boxes/ActiveBoxGrid":87,"../../boxes/BoxBag":88,"../../boxes/BoxConnector":90,"../../boxes/TextGrid":91,"jquery":5}],73:[function(require,module,exports){
var AutoContentProvider = function (project) {
    this.project = project;
};
AutoContentProvider.prototype = {
    constructor: AutoContentProvider,
    project: null,
    setProperties: function ($xml) {
        this.className = $xml.attr('class');
        return this;
    },
    init: function () {
    },
    generateContent: function (nRows, nCols, content, useIds) {
        var kit = new AutoContentProvider.ActiveBagContentKit(nRows, nCols, content, useIds);
        return this.process(kit);
    },
    process: function (kit) {
        return false;
    }
};
AutoContentProvider.ActiveBagContentKit = function (nRows, nCols, content, useIds) {
    this.nRows = nRows;
    this.nCols = nCols;
    this.content = content;
    this.useIds = useIds;
};
AutoContentProvider.CLASSES = { '@tagreplace.TagReplace': AutoContentProvider };
AutoContentProvider.getProvider = function ($xml, project) {
    var automation = null;
    if ($xml && project) {
        var className = $xml.attr('class');
        var cl = AutoContentProvider.CLASSES[className];
        if (cl) {
            automation = new cl(project);
            automation.setProperties($xml);
        } else
            console.log('Unknown AutoContentProvider class: ' + className);
    }
    return automation;
};
module.exports = AutoContentProvider;
},{}],74:[function(require,module,exports){
var $ = require('jquery'), AutoContentProvider = require('../AutoContentProvider'), Utils = require('../../Utils');
var Arith = function (project) {
    AutoContentProvider.call(this, project);
    this.opA = new Arith.Operator();
    this.opB = new Arith.Operator();
};
Arith.prototype = {
    constructor: Arith,
    NMAXLOOPS: 60,
    NOSORT: 0,
    SORTASC: 1,
    SORTDESC: 2,
    SUM: 1,
    REST: 2,
    MULT: 4,
    DIV: 8,
    NOPERACIONS: 4,
    OPSTR: [
        '+',
        '-',
        String.fromCharCode(215),
        ':'
    ],
    ABX: 1,
    AXC: 2,
    XBC: 4,
    AXBC: 8,
    CAXB: 16,
    NTIPUSEX: 5,
    INDIF: 0,
    AGB: 1,
    BGA: 2,
    RES: -12345,
    MAX_STR_LEN: 100,
    S: String.fromCharCode(160),
    opA: null,
    opB: null,
    use_add: true,
    use_subst: false,
    use_mult: false,
    use_div: false,
    exp_abx: true,
    exp_axc: false,
    exp_xbc: false,
    exp_axbc: false,
    exp_caxb: false,
    resultLimInf: 0,
    resultLimSup: 9999,
    resultCarry: false,
    resultNoDup: false,
    resultOrder: 'NOSORT',
    opCond: 'INDIF',
    setProperties: function ($xml) {
        var arith = this;
        $xml.children().each(function () {
            var $node = $(this);
            switch (this.nodeName) {
            case 'operand':
                switch ($node.attr('id')) {
                case 'A':
                    arith.opA.setProperties($node);
                    break;
                case 'B':
                    arith.opB.setProperties($node);
                    break;
                }
                break;
            case 'operations':
                arith.use_add = Utils.getBoolean($node.attr('plus'));
                arith.use_subst = Utils.getBoolean($node.attr('minus'));
                arith.use_mult = Utils.getBoolean($node.attr('multiply'));
                arith.use_div = Utils.getBoolean($node.attr('divide'));
                break;
            case 'unknown':
                arith.exp_abx = Utils.getBoolean($node.attr('result'));
                arith.exp_xbc = Utils.getBoolean($node.attr('first'));
                arith.exp_axc = Utils.getBoolean($node.attr('last'));
                arith.exp_axbc = Utils.getBoolean($node.attr('operand'));
                arith.exp_caxb = Utils.getBoolean($node.attr('inverse'));
                break;
            case 'result':
                arith.resultLimInf = Utils.getNumber($node.attr('from'), arith.resultLimInf);
                arith.resultLimSup = Utils.getNumber($node.attr('to'), arith.resultLimSup);
                arith.resultCarry = Utils.getBoolean($node.attr('notCarry'), arith.resultCarry);
                arith.resultNoDup = !Utils.getBoolean($node.attr('duplicates'), !arith.resultNoDup);
                var s = $node.attr('order');
                arith.resultOrder = s === 'ascending' ? 'SORTASC' : s === 'descending' ? 'SORTDESC' : 'NOSORT';
                s = $node.attr('condition');
                arith.opCond = s === 'firstBig' ? 'AGB' : s === 'lastBig' ? 'BGA' : 'INDIF';
                break;
            }
        });
        return this;
    },
    genNum: function (n, op, limInf2, limSup2) {
        var r, exp, rang, ls, li, k, v, solved = false;
        n.c = op.numDec;
        exp = n.c === 0 ? 1 : n.c === 1 ? 10 : 100;
        ls = op.limSup;
        if (limSup2 !== Arith.prototype.RES && limSup2 < ls)
            ls = limSup2;
        li = op.limInf;
        if (limInf2 !== Arith.prototype.RES && limInf2 > li)
            li = limInf2;
        solved = false;
        if (op.fromList > 0) {
            n.vf = op.lst[Math.floor(Math.random() * op.fromList)];
            solved = true;
        }
        if (!solved) {
            r = Math.floor(Math.random() * 100);
            if (op.wZero && r <= 10) {
                n.vf = 0;
                solved = true;
            } else if (op.wOne && r > 10 && r <= 20) {
                n.vf = 1;
                solved = true;
            } else if (op.wMinusOne && r > 20 && r <= 30) {
                n.vf = -1;
                solved = true;
            }
        }
        if (!solved) {
            if (li > ls) {
                k = li;
                li = ls;
                ls = k;
            }
            rang = Math.round(ls - li + 1);
            if (rang < 0)
                rang = 1;
            v = (Math.floor(Math.random(rang)) + li) * exp;
            v = Math.round((Math.floor(Math.random() * rang) + li) * exp);
            if (exp > 1)
                v += Math.floor(Math.random() * exp);
            n.vf = v / exp;
        }
        return true;
    },
    genOp: function (o) {
        var i, ops = [], nops, op, rlinf, rlsup, ri2, rs2, q, va, vb, bufa, bufb;
        rlinf = this.resultLimInf;
        rlsup = this.resultLimSup;
        nops = 0;
        if (this.use_add)
            ops[nops++] = 'SUM';
        if (this.use_subst)
            ops[nops++] = 'REST';
        if (this.use_mult)
            ops[nops++] = 'MULT';
        if (this.use_div)
            ops[nops++] = 'DIV';
        op = ops[Math.floor(Math.random() * nops)];
        switch (op) {
        case 'SUM':
            for (i = 0; i < this.NMAXLOOPS; i++) {
                this.genNum(o.numA, this.opA, this.RES, rlsup);
                ri2 = o.numA.vf < rlinf ? rlinf - Math.round(o.numA.vf) : this.RES;
                rs2 = rlsup - Math.round(o.numA.vf);
                switch (this.opCond) {
                case 'AGB':
                    if (rs2 === this.RES || rs2 > o.numA.vf)
                        rs2 = Math.round(o.numA.vf);
                    break;
                case 'BGA':
                    if (ri2 === this.RES || ri2 < o.numA.vf)
                        ri2 = Math.round(o.numA.vf);
                    break;
                }
                this.genNum(o.numB, this.opB, ri2, rs2);
                o.numR.vf = o.numA.vf + o.numB.vf;
                if (o.numR.vf >= rlinf && o.numR.vf <= rlsup)
                    break;
            }
            o.numR.c = o.numA.c > o.numB.c ? o.numA.c : o.numB.c;
            o.op = 0;
            if (this.resultCarry && o.numA.vf > 0 && o.numB.vf > 0) {
                q = o.numR.c === 2 ? 100 : o.numR.c === 1 ? 10 : 1;
                bufa = Arith.DecFormat(Math.round(o.numA.vf * q + 0.5), 0, 10).split('');
                bufb = Arith.DecFormat(Math.round(o.numB.vf * q + 0.5), 0, 10).split('');
                for (i = 0; i < 10; i++)
                    if (bufa[i] !== '0' || bufb[i] !== '0')
                        break;
                for (; i < 10; i++) {
                    va = parseInt(bufa[i]);
                    vb = parseInt(bufb[i]);
                    if (va + vb < 10)
                        continue;
                    while (va + vb > 9) {
                        if (va > vb)
                            va = va > 0 ? Math.floor(Math.random() * va) : 0;
                        else
                            vb = vb > 0 ? Math.floor(Math.random() * vb) : 0;
                    }
                    bufa[i] = va.toFixed(0);
                    bufb[i] = vb.toFixed(0);
                }
                o.numA.vf = parseInt(bufa.join()) / q;
                o.numB.vf = parseInt(bufb.join()) / q;
                o.numR.vf = Math.round(o.numA.vf + o.numB.vf + 0.5) / q;
            }
            break;
        case 'REST':
            for (i = 0; i < this.NMAXLOOPS; i++) {
                this.genNum(o.numA, this.opA, rlinf, this.RES);
                ri2 = o.numA.vf > rlsup ? Math.round(o.numA.vf - rlsup) : this.RES;
                rs2 = Math.round(o.numA.vf - rlinf);
                switch (this.opCond) {
                case 'AGB':
                    if (rs2 === this.RES || rs2 > o.numA.vf)
                        rs2 = Math.round(o.numA.vf);
                    break;
                case 'BGA':
                    if (ri2 === this.RES || ri2 < o.numA.vf)
                        ri2 = Math.round(o.numA.vf);
                    break;
                }
                this.genNum(o.numB, this.opB, ri2, rs2);
                o.numR.vf = o.numA.vf - o.numB.vf;
                if (o.numR.vf >= rlinf && o.numR.vf <= rlsup)
                    break;
            }
            o.numR.c = o.numA.c > o.numB.c ? o.numA.c : o.numB.c;
            o.op = 1;
            if (this.resultCarry && o.numA.vf > 0 && o.numB.vf > 0 && o.numA.vf >= o.numB.vf) {
                q = o.numR.c === 2 ? 100 : o.numR.c === 1 ? 10 : 1;
                bufa = Arith.DecFormat(Math.round(o.numA.vf * q + 0.5), 0, 10).split('');
                bufb = Arith.DecFormat(Math.round(o.numB.vf * q + 0.5), 0, 10).split('');
                for (i = 0; i < 10; i++)
                    if (bufb[i] !== '0')
                        break;
                for (; i < 10; i++) {
                    va = parseInt(bufa[i]);
                    vb = parseInt(bufb[i]);
                    if (va >= vb)
                        continue;
                    vb = va > 0 ? Math.floor(Math.random() * va) : 0;
                    bufb[i] = vb.toFixed(0);
                }
                o.numA.vf = parseInt(bufa.join()) / q;
                o.numB.vf = parseInt(bufb.join()) / q;
                o.numR.vf = Math.round(o.numA.vf - o.numB.vf + 0.5) / q;
            }
            break;
        case 'MULT':
            for (i = 0; i < this.NMAXLOOPS; i++) {
                this.genNum(o.numA, this.opA, this.RES, this.RES);
                ri2 = this.opB.limInf;
                rs2 = this.opB.limSup;
                switch (this.opCond) {
                case 'AGB':
                    if (rs2 > o.numA.vf)
                        rs2 = Math.round(o.numA.vf);
                    break;
                case 'BGA':
                    if (ri2 < o.numA.vf)
                        ri2 = Math.round(o.numA.vf);
                    break;
                }
                this.genNum(o.numB, this.opB, ri2, rs2);
                o.numR.vf = o.numA.vf * o.numB.vf;
                if (o.numR.vf >= rlinf && o.numR.vf <= rlsup)
                    break;
            }
            o.numR.c = o.numA.c + o.numB.c;
            o.op = 2;
            break;
        case 'DIV':
            for (i = 0; i < this.NMAXLOOPS; i++) {
                this.genNum(o.numA, this.opA, this.RES, this.RES);
                ri2 = this.opB.limInf;
                rs2 = this.opB.limSup;
                switch (this.opCond) {
                case 'AGB':
                    if (rs2 > o.numA.vf)
                        rs2 = Math.round(o.numA.vf);
                    break;
                case 'BGA':
                    if (ri2 < o.numA.vf)
                        ri2 = Math.round(o.numA.vf);
                    break;
                }
                this.genNum(o.numB, this.opB, ri2, rs2);
                if (o.numB.vf !== 0 && Math.abs(o.numA.vf) >= Math.abs(o.numB.vf) && (o.numR.vf = o.numA.vf / o.numB.vf) >= rlinf && o.numR.vf <= rlsup)
                    break;
            }
            if (o.numB.vf === 0)
                o.numB.vf = 1;
            o.numR.vf = o.numA.vf / o.numB.vf;
            i = o.numA.c - o.numB.c;
            q = Math.pow(10, i);
            o.numA.vf *= q;
            o.numR.vf *= q;
            o.numR.vf = Math.round(o.numR.vf);
            o.numA.vf = o.numR.vf * o.numB.vf;
            o.numA.vf /= q;
            o.numR.vf /= q;
            o.numR.c = i > 0 ? i : 0;
            o.op = 3;
            break;
        default:
            return false;
        }
        return true;
    },
    process: function (kit) {
        var nRows = kit.nRows, nCols = kit.nCols, content = kit.content, useIds = kit.useIds, i, j, k, o, op = [], S = this.S, tipus = [], numTipus, tipX, tipInv = this.exp_caxb, va = '', vb = '', vc = '', operator = '', stra = [], strb = [], strc = [], nColsB = nCols, nRowsB = nRows, nCells = nRows * nCols, ass = null;
        if (nRows <= 0 || nCols <= 0 || content === null || content.length < 1 || content[0] === null)
            return false;
        if (nCells < 2)
            return false;
        numTipus = 0;
        if (this.exp_abx)
            tipus[numTipus++] = 'ABX';
        if (this.exp_axc)
            tipus[numTipus++] = 'AXC';
        if (this.exp_xbc)
            tipus[numTipus++] = 'XBC';
        if (this.exp_axbc)
            tipus[numTipus++] = 'AXBC';
        if (numTipus === 0)
            return false;
        for (i = 0; i < nCells; i++) {
            o = new Arith.Operacio();
            for (j = 0; j < this.NMAXLOOPS; j++) {
                this.genOp(o);
                if (this.resultNoDup) {
                    for (k = 0; k < i; k++) {
                        if (o.numR.vf === op[k].numR.vf)
                            break;
                    }
                    if (k === i)
                        break;
                } else
                    break;
            }
            op[i] = o;
        }
        if (this.resultOrder !== 0) {
            for (i = nCells - 1; i > 0; i--) {
                for (j = 0; j < i; j++) {
                    if (this.resultOrder === 'SORTASC' && op[j].numR.vf > op[j + 1].numR.vf || this.resultOrder === 'SORTDESC' && op[j].numR.vf < op[j + 1].numR.vf) {
                        o = op[j];
                        op[j] = op[j + 1];
                        op[j + 1] = o;
                    }
                }
            }
        }
        for (i = 0; i < nCells; i++) {
            tipX = tipus[Math.floor(Math.random() * numTipus)];
            va = Arith.DecFormat(op[i].numA.vf, op[0].numA.c);
            vb = Arith.DecFormat(op[i].numB.vf, op[0].numB.c);
            vc = Arith.DecFormat(op[i].numR.vf, op[0].numR.c);
            operator = this.OPSTR[op[i].op];
            if (tipInv)
                strc[i] = vc + S + '=' + S + va + S + operator + S + vb;
            else
                strc[i] = va + S + operator + S + vb + S + '=' + S + vc;
            switch (tipX) {
            case 'AXC':
                strb[i] = vb;
                stra[i] = tipInv ? vc + S + '=' + S + va + S + operator + S + '?' : va + S + operator + S + '?' + S + '=' + S + vc;
                break;
            case 'XBC':
                strb[i] = va;
                stra[i] = tipInv ? vc + S + '=' + S + '?' + S + operator + S + vb : '?' + S + operator + S + vb + S + '=' + S + vc;
                break;
            case 'AXBC':
                strb[i] = operator;
                stra[i] = tipInv ? vc + S + '=' + S + va + S + '?' + S + vb : va + S + '?' + S + vb + S + '=' + S + vc;
                break;
            default:
                strb[i] = vc;
                stra[i] = tipInv ? '?' + S + '=' + S + va + S + operator + S + vb : va + S + operator + S + vb + S + '=';
                break;
            }
        }
        if (useIds) {
            ass = [];
            var strbx = [];
            k = 0;
            for (i = 0; i < nCells; i++) {
                for (j = 0; j < k; j++)
                    if (strb[i] === strbx[j])
                        break;
                if (j === k) {
                    strbx[k] = strb[i];
                    ass[i] = k;
                    k++;
                } else
                    ass[i] = j;
            }
            strb = [];
            for (i = 0; i < k; i++)
                strb[i] = strbx[i];
            if (nRowsB * nColsB !== k) {
                var distH = false;
                switch (k) {
                case 6:
                    nRowsB = distH ? 2 : 3;
                    nColsB = distH ? 3 : 2;
                    break;
                case 8:
                    nRowsB = distH ? 2 : 4;
                    nColsB = distH ? 4 : 2;
                    break;
                case 9:
                    nRowsB = 3;
                    nColsB = 3;
                    break;
                case 10:
                    nRowsB = distH ? 2 : 5;
                    nColsB = distH ? 5 : 2;
                    break;
                case 12:
                    nRowsB = distH ? 3 : 4;
                    nColsB = distH ? 4 : 3;
                    break;
                case 14:
                    nRowsB = distH ? 2 : 7;
                    nColsB = distH ? 7 : 2;
                    break;
                case 15:
                    nRowsB = distH ? 3 : 5;
                    nColsB = distH ? 3 : 5;
                    break;
                case 16:
                    nRowsB = 4;
                    nColsB = 4;
                    break;
                case 18:
                    nRowsB = distH ? 6 : 3;
                    nColsB = distH ? 3 : 6;
                    break;
                case 20:
                    nRowsB = distH ? 4 : 5;
                    nColsB = distH ? 5 : 4;
                    break;
                default:
                    nRowsB = distH ? 1 : k;
                    nColsB = distH ? k : 1;
                    break;
                }
            }
        }
        content[0].setTextContent(stra, nCols, nRows);
        if (ass !== null)
            content[0].setIds(ass);
        if (content.length > 1 && content[1] !== null) {
            content[1].setTextContent(strb, nColsB, nRowsB);
            content[1].getShaper().reset(nColsB, nRowsB);
        }
        if (content.length > 2 && content[2] !== null)
            content[2].setTextContent(strc, nCols, nRows);
        return true;
    }
};
Arith.DecFormat = function (val, dec, pre) {
    var result = val.toFixed(dec);
    if (pre) {
        var n = result.indexOf('.');
        if (n < 0)
            n = result.length;
        for (; n < pre; n++)
            result = '0' + result;
    }
    return result;
};
Arith.Operator = function () {
    this.limInf = this.LIM0;
    this.limSup = this.LIM10;
    this.lst = [];
};
Arith.Operator.prototype = {
    constructor: Arith.Operator,
    MAX_VALUE: 100000000,
    WZERO: 1,
    WONE: 2,
    WMINUSONE: 4,
    NLIMITS: 26,
    LIMITS: [
        0,
        -9999,
        -1000,
        -999,
        -100,
        -99,
        -50,
        -25,
        -20,
        -10,
        -9,
        -5,
        -1,
        0,
        1,
        5,
        9,
        10,
        20,
        25,
        50,
        99,
        100,
        999,
        1000,
        9999
    ],
    DEFAULT_LIMIT: 13,
    LIM0: 13,
    LIM10: 17,
    LIMI25: 7,
    LIMS25: 19,
    NOLIM: 25,
    LIM_CH: [
        'x',
        '-9999',
        '-1000',
        '-999',
        '-100',
        '-99',
        '-50',
        '-25',
        '-20',
        '-10',
        '-9',
        '-5',
        '-1',
        '0',
        '1',
        '5',
        '9',
        '10',
        '20',
        '25',
        '50',
        '99',
        '100',
        '999',
        '1000',
        '9999'
    ],
    NUMLST: 20,
    limInf: 0,
    limSup: 10,
    numDec: 0,
    wZero: false,
    wOne: false,
    wMinusOne: false,
    fromList: 0,
    lst: [],
    setProperties: function ($xml) {
        var op = this;
        $.each($xml.get(0).attributes, function () {
            var name = this.name, val = this.value;
            switch (name) {
            case 'decimals':
                op.numDec = Number(val);
                break;
            case 'values':
                var values = val.split(' ');
                for (var i = 0; i < values.length; i++)
                    op.lst[i] = Number(values[i]);
                op.fromList = op.lst.length;
                break;
            case 'from':
                op.limInf = Number(val);
                break;
            case 'to':
                op.limSup = Number(val);
                break;
            }
            $xml.children().each(function () {
                var $node = $(this);
                switch (this.nodeName) {
                case 'include':
                    op.wZero = Utils.getBoolean($node.attr('zero'));
                    op.wOne = Utils.getBoolean($node.attr('one'));
                    op.wMinusOne = Utils.getBoolean($node.attr('minusOne'));
                    break;
                }
            });
        });
        return this;
    }
};
Arith.Num = function () {
    this.vf = 0;
    this.c = 0;
};
Arith.Num.prototype.format = function () {
    return Arith.DecFormat(this.vf, this.c);
};
Arith.Operacio = function () {
    this.numA = new Arith.Num();
    this.numB = new Arith.Num();
    this.numR = new Arith.Num();
    this.op = 0;
};
Arith.prototype = $.extend(Object.create(AutoContentProvider.prototype), Arith.prototype);
AutoContentProvider.CLASSES['@arith.Arith'] = Arith;
module.exports = Arith;
},{"../../Utils":53,"../AutoContentProvider":73,"jquery":5}],75:[function(require,module,exports){
var $ = require('jquery'), JumpInfo = require('./JumpInfo'), ActivitySequenceElement = require('./ActivitySequenceElement');
var ActivitySequence = function (project) {
    this.project = project;
    this.elements = [];
};
ActivitySequence.prototype = {
    constructor: ActivitySequence,
    elements: null,
    project: null,
    currentAct: -1,
    setProperties: function ($xml) {
        var elements = this.elements;
        $xml.children('item').each(function (i, data) {
            var ase = new ActivitySequenceElement().setProperties($(data));
            elements.push(ase);
        });
        return this;
    },
    getElementIndex: function (ase) {
        return ase === null ? -1 : this.elements.indexOf(ase);
    },
    getElement: function (n, updateCurrentAct) {
        var result = null;
        if (n >= 0 && n < this.elements.length) {
            result = this.elements[n];
            if (updateCurrentAct)
                this.currentAct = n;
        }
        return result;
    },
    getElementByTag: function (tag, updateCurrentAct) {
        var result = null, resultIndex = -1;
        if (tag !== null) {
            this.elements.some(function (el, index) {
                if (el.tag === tag) {
                    result = el;
                    resultIndex = index;
                }
                return resultIndex !== -1;
            });
            if (resultIndex !== -1 && updateCurrentAct)
                this.currentAct = resultIndex;
        }
        return result;
    },
    getCurrentAct: function () {
        return this.getElement(this.currentAct, false);
    },
    hasNextAct: function (hasReturn) {
        var result = false;
        var ase = this.getCurrentAct();
        if (ase !== null) {
            if (ase.fwdJump === null)
                result = true;
            else
                switch (ase.fwdJump.action) {
                case 'STOP':
                    break;
                case 'RETURN':
                    result = hasReturn;
                    break;
                default:
                    result = true;
                }
        }
        return result;
    },
    hasPrevAct: function (hasReturn) {
        var result = false;
        var ase = this.getCurrentAct();
        if (ase !== null) {
            if (ase.backJump === null)
                result = true;
            else
                switch (ase.backJump.action) {
                case 'STOP':
                    break;
                case 'RETURN':
                    result = hasReturn;
                    break;
                default:
                    result = true;
                }
        }
        return result;
    },
    getNavButtonsFlag: function () {
        var flag = 'none';
        var ase = this.getCurrentAct();
        if (ase !== null)
            flag = ase.navButtons;
        return flag;
    },
    getJump: function (back, reporter) {
        var ase = this.getCurrentAct();
        var result = null;
        if (ase !== null) {
            var asj = back ? ase.backJump : ase.fwdJump;
            if (asj === null) {
                var i = this.currentAct + (back ? -1 : 1);
                if (i >= this.elements.length || i < 0)
                    i = 0;
                result = new JumpInfo('JUMP', i);
            } else {
                var rating = -1;
                var time = -1;
                if (reporter !== null) {
                    var seqRegInfo = reporter.getCurrentSequenceInfo();
                    if (seqRegInfo !== null) {
                        rating = int(seqRegInfo.tScore);
                        time = int(seqRegInfo.tTime / 1000);
                    }
                }
                result = asj.resolveJump(rating, time);
            }
        }
        return result;
    },
    getSequenceForElement: function (num) {
        var tag = null;
        if (num >= 0 && num < this.elements.length)
            for (var i = num; tag === null && i >= 0; i--) {
                tag = this.getElement(i, false).tag;
            }
        return tag;
    },
    getElementByActivityName: function (activityName) {
        var result = null;
        if (activityName !== null) {
            for (var i = 0; result === null && i < this.elements.length; i++) {
                var ase = getElement(i, false);
                if (ase.activityName.toLowerCase() === activityName.toLowerCase())
                    result = ase;
            }
        }
        return result;
    },
    checkCurrentActivity: function (activityName) {
    }
};
module.exports = ActivitySequence;
},{"./ActivitySequenceElement":76,"./JumpInfo":79,"jquery":5}],76:[function(require,module,exports){
var $ = require('jquery'), ActivitySequenceJump = require('./ActivitySequenceJump');
var ActivitySequenceElement = function () {
};
ActivitySequenceElement.prototype = {
    constructor: ActivitySequenceElement,
    tag: null,
    description: null,
    activityName: '',
    fwdJump: null,
    backJump: null,
    navButtons: 'both',
    delay: 0,
    setProperties: function ($xml) {
        var ase = this;
        $.each($xml.get(0).attributes, function () {
            var name = this.name;
            var val = this.value;
            switch (name) {
            case 'id':
                ase['tag'] = val;
                break;
            case 'name':
                ase['activityName'] = val;
                break;
            case 'description':
            case 'navButtons':
                ase[name] = val;
                break;
            case 'delay':
                ase[name] = Number(val);
                break;
            }
        });
        $xml.children('jump').each(function () {
            var jmp = new ActivitySequenceJump().setProperties($(this));
            if (jmp.id === 'forward')
                ase.fwdJump = jmp;
            else if (jmp.id === 'back')
                ase.backJump = jmp;
        });
        return this;
    }
};
module.exports = ActivitySequenceElement;
},{"./ActivitySequenceJump":77,"jquery":5}],77:[function(require,module,exports){
var $ = require('jquery'), JumpInfo = require('./JumpInfo'), ConditionalJumpInfo = require('./ConditionalJumpInfo');
var ActivitySequenceJump = function (action, sq) {
    JumpInfo.call(this, action, sq);
};
ActivitySequenceJump.prototype = {
    constructor: ActivitySequenceJump,
    upperJump: null,
    lowerJump: null,
    setProperties: function ($xml) {
        JumpInfo.prototype.setProperties.call(this, $xml);
        var asj = this;
        $xml.children('jump').each(function () {
            var condJmp = new ConditionalJumpInfo().setProperties($(this));
            if (condJmp.id === 'upper')
                asj.upperJump = condJmp;
            else if (condJmp.id === 'lower')
                asj.lowerJump = condJmp;
        });
        return this;
    },
    resolveJump: function (rating, time) {
        var result = this;
        if (rating >= 0 && time >= 0) {
            if (this.upperJump !== null && rating > this.upperJump.threshold && (this.upperJump.time <= 0 || time < this.upperJump.time)) {
                result = this.upperJump;
            } else if (this.lowerJump !== null && (rating < this.lowerJump.threshold || this.lowerJump.time > 0 && time > this.lowerJump.time)) {
                result = lowerJump;
            }
        }
        return result;
    }
};
ActivitySequenceJump.prototype = $.extend(Object.create(JumpInfo.prototype), ActivitySequenceJump.prototype);
module.exports = ActivitySequenceJump;
},{"./ConditionalJumpInfo":78,"./JumpInfo":79,"jquery":5}],78:[function(require,module,exports){
var $ = require('jquery'), JumpInfo = require('./JumpInfo');
var ConditionalJumpInfo = function (action, sq, threshold, time) {
    JumpInfo.call(this, action, sq);
    this.threshold = typeof threshold === 'number' ? threshold : -1;
    this.time = typeof threshold === 'number' ? time : -1;
};
ConditionalJumpInfo.prototype = {
    constructor: ConditionalJumpInfo,
    threshold: -1,
    time: -1,
    setProperties: function ($xml) {
        JumpInfo.prototype.setProperties.call(this, $xml);
        if ($xml.attr('threshold') !== undefined)
            this.threshold = $xml.attr('threshold');
        if ($xml.attr('time') !== undefined)
            this.time = $xml.attr('time');
        return this;
    }
};
ConditionalJumpInfo.prototype = $.extend(Object.create(JumpInfo.prototype), ConditionalJumpInfo.prototype);
module.exports = ConditionalJumpInfo;
},{"./JumpInfo":79,"jquery":5}],79:[function(require,module,exports){
var JumpInfo = function (action, sq) {
    this.action = action;
    switch (typeof sq) {
    case 'string':
        this.sequence = sq;
        break;
    case 'number':
        this.actNum = sq;
        break;
    }
};
JumpInfo.prototype = {
    constructor: JumpInfo,
    id: null,
    action: undefined,
    actNum: -1,
    sequence: undefined,
    projectPath: undefined,
    setProperties: function ($xml) {
        this.id = $xml.attr('id');
        this.action = $xml.attr('action') ? $xml.attr('action') : 'JUMP';
        this.sequence = $xml.attr('tag');
        this.projectPath = $xml.attr('project');
        return this;
    }
};
module.exports = JumpInfo;
},{}],80:[function(require,module,exports){
var $ = require('jquery'), MediaBagElement = require('./MediaBagElement'), Skin = require('../skins/Skin');
var MediaBag = function (project) {
    this.project = project;
    this.elements = {};
};
MediaBag.prototype = {
    constructor: MediaBag,
    elements: null,
    project: null,
    setProperties: function ($xml) {
        var thisMediaBag = this;
        $xml.children('media').each(function () {
            var mbe = new MediaBagElement(thisMediaBag.project.basePath, null, thisMediaBag.project.zip);
            mbe.setProperties($(this));
            thisMediaBag.elements[mbe.name] = mbe;
        });
        return this;
    },
    getElement: function (name, create) {
        var result = this.elements[name];
        if (create && !result)
            result = this.getElementByFileName(name, create);
        return result;
    },
    getElementByFileName: function (fileName, create) {
        var result = null;
        if (fileName) {
            for (var name in this.elements) {
                if (this.elements[name].fileName === fileName) {
                    result = this.elements[name];
                    break;
                }
            }
            if (!result && create) {
                result = new MediaBagElement(this.project.basePath, null, this.project.zip);
                result.name = fileName;
                result.fileName = fileName;
                result.ext = fileName.toLowerCase().split('#')[0].split('.').pop();
                result.type = result.getFileType(result.ext);
                this.elements[result.name] = result;
            }
        }
        return result;
    },
    buildAll: function (type) {
        $.each(this.elements, function (name, element) {
            if (!type || element.name === type) {
                element.build(function () {
                });
            }
        });
    },
    isWaiting: function () {
        var result = false;
        $.each(this.elements, function (name, element) {
            if (element.data && !element.ready) {
                console.log('... waiting for ' + name);
                result = true;
                return false;
            }
        });
        return result;
    },
    getSkinElement: function (name, ps) {
        return Skin.prototype.getSkin('default', ps);
    }
};
module.exports = MediaBag;
},{"../skins/Skin":107,"./MediaBagElement":81,"jquery":5}],81:[function(require,module,exports){
var $ = require('jquery'), Utils = require('../Utils'), AWT = require('../AWT');
var MediaBagElement = function (basePath, fileName, zip) {
    if (basePath)
        this.basePath = basePath;
    if (fileName) {
        this.fileName = fileName;
        this.name = fileName;
        this.ext = this.fileName.toLowerCase().split('.').pop();
        this.type = this.getFileType(this.ext);
    }
    if (zip)
        this.zip = zip;
    this._whenReady = [];
};
MediaBagElement.prototype = {
    constructor: MediaBagElement,
    name: '',
    fileName: '',
    basePath: '',
    zip: null,
    data: null,
    ready: false,
    _whenReady: null,
    ext: '',
    type: null,
    setProperties: function ($xml) {
        this.name = $xml.attr('name');
        this.fileName = $xml.attr('file');
        this.ext = this.fileName.toLowerCase().split('.').pop();
        this.type = this.getFileType(this.ext);
        return this;
    },
    isEmpty: function () {
        return this.data === null;
    },
    getFileType: function (ext) {
        var result = null;
        for (var type in Utils.settings.FILE_TYPES) {
            if (Utils.settings.FILE_TYPES[type].indexOf(ext) >= 0)
                result = type;
        }
        return result;
    },
    build: function (callback) {
        var media = this;
        if (callback)
            this._whenReady.push(callback);
        if (!this.data) {
            var fullPath = this.getFullPath();
            switch (this.type) {
            case 'font':
                var format = this.ext === 'ttf' ? 'truetype' : this.ext === 'otf' ? 'embedded-opentype' : this.ext;
                $('head').prepend('<style type="text/css">' + '@font-face{font-family:"' + this.name + '";' + 'src:url(' + fullPath + ') format("' + format + '");}' + '</style>');
                this.data = new AWT.Font(this.name);
                this.ready = true;
                break;
            case 'image':
                this.data = new Image();
                $(this.data).attr('src', fullPath);
                if (this.data.complete || this.data.readyState === 4 || this.data.readyState === 'complete')
                    this.ready = true;
                else
                    $(this.data).load(function (response, status, xhr) {
                        if (status !== 'error') {
                            media._onReady();
                        }
                    });
                break;
            case 'audio':
                this.data = new $('<audio />').attr('src', fullPath);
                this.ready = true;
                break;
            case 'video':
                this.data = $('<video />').attr('src', fullPath);
                this.ready = true;
                break;
            case 'xml':
                this.data = '';
                $.get(fullPath, null, null, 'xml').done(function (data) {
                    media.data = data;
                    media._onReady();
                }).fail(function () {
                    console.log('Error loading ' + media.name);
                    media.data = null;
                });
                break;
            default:
                return;
            }
        }
        if (this.ready)
            this._onReady();
        return this;
    },
    _onReady: function () {
        this.ready = true;
        for (var i = 0; i < this._whenReady.length; i++) {
            var callback = this._whenReady[i];
            callback.apply(this);
        }
        this._whenReady.length = 0;
    },
    getFullPath: function () {
        return Utils.getPath(this.basePath, this.fileName, this.zip);
    }
};
module.exports = MediaBagElement;
},{"../AWT":47,"../Utils":53,"jquery":5}],82:[function(require,module,exports){
var $ = require('jquery'), AWT = require('../AWT'), BoxBase = require('./BoxBase');
var AbstractBox = function (parent, container, boxBase) {
    AWT.Rectangle.call(this);
    this.container = container;
    this.parent = parent;
    this.boxBase = boxBase;
    this.shape = this;
    this.specialShape = false;
    this.visible = true;
};
AbstractBox.prototype = {
    constructor: AbstractBox,
    parent: null,
    container: null,
    boxBase: null,
    border: false,
    shape: null,
    specialShape: false,
    visible: true,
    temporaryHidden: false,
    inactive: false,
    inverted: false,
    alternative: false,
    marked: false,
    focused: false,
    $hostedComponent: null,
    setParent: function (parent) {
        this.parent = parent;
    },
    getParent: function () {
        return this.parent;
    },
    end: function () {
    },
    setContainer: function (newContainer) {
        this.container = newContainer;
        if (this.$hostedComponent && this.container && this.container.$div) {
            this.$hostedComponent.detach();
            this.container.$div.append(this.$hostedComponent);
        }
    },
    getContainerX: function () {
        return this.container;
    },
    getContainerResolve: function () {
        var ab = this;
        while (ab.container === null && ab.parent !== null)
            ab = ab.parent;
        return ab.container;
    },
    invalidate: function (rect) {
        var cnt = this.getContainerResolve();
        if (cnt)
            cnt.invalidate(rect);
    },
    setBoxBase: function (boxBase) {
        this.boxBase = boxBase;
        this.invalidate();
    },
    getBoxBaseResolve: function () {
        var ab = this;
        while (!ab.boxBase && ab.parent)
            ab = ab.parent;
        return ab.boxBase ? ab.boxBase : BoxBase.prototype.defaultBoxBase;
    },
    setShape: function (sh) {
        this.shape = sh;
        this.specialShape = true;
        this.invalidate();
        AWT.Rectangle.prototype.setBounds.call(this, sh.getBounds());
        this.invalidate();
    },
    getShape: function () {
        return this.shape;
    },
    contains: function (p) {
        return this.shape === this ? AWT.Rectangle.prototype.contains.call(this, p) : this.shape.contains(p);
    },
    setBounds: function (rect, y, w, h) {
        if (typeof rect === 'number')
            rect = new AWT.Rectangle(rect, y, w, h);
        if (this.equals(rect))
            return;
        if (this.specialShape) {
            if (!this.dim.equals(rect.dim)) {
                this.shape.scaleBy(new AWT.Dimension(rect.dim.width / this.dim.width, rect.dim.height / this.dim.height));
                this.setShape(this.shape);
            }
            if (!this.pos.equals(rect.pos)) {
                this.shape.moveTo(rect.pos);
            }
            this.setShape(this.shape);
        } else
            AWT.Rectangle.prototype.setBounds.call(this, rect);
        if (this.$hostedComponent)
            this.setHostedComponentBounds();
        return this;
    },
    moveTo: function (newPos, y) {
        if (typeof newPos === 'number')
            newPos = new AWT.Point(newPos, y);
        this.setBounds(new AWT.Rectangle(this).moveTo(newPos));
    },
    moveBy: function (dx, dy) {
        this.setBounds(new AWT.Rectangle(this).moveBy(dx, dy));
    },
    setSize: function (width, height) {
        this.setBounds(new AWT.Rectangle(this.pos, new AWT.Dimension(width, height)));
    },
    hasBorder: function () {
        return this.border;
    },
    setBorder: function (newVal) {
        if (!newVal)
            this.invalidate();
        this.border = newVal;
        if (newVal)
            this.invalidate();
    },
    isVisible: function () {
        return this.visible;
    },
    setVisible: function (newVal) {
        this.visible = newVal;
        this.setHostedComponentVisible();
        this.invalidate();
    },
    setHostedComponentVisible: function (val) {
        if (this.$hostedComponent) {
            if (val === false)
                this.$hostedComponent.css('visibility', 'hidden');
            else
                this.$hostedComponent.css('visibility', this.visible ? 'visible' : 'hidden');
        }
    },
    isTemporaryHidden: function () {
        return this.temporaryHidden;
    },
    setTemporaryHidden: function (newVal) {
        this.temporaryHidden = newVal;
    },
    isInactive: function () {
        return this.inactive;
    },
    setInactive: function (newVal) {
        this.inactive = newVal;
        if (this.$hostedComponent)
            this.setHostedComponentColors();
        else
            this.invalidate();
    },
    isInverted: function () {
        return this.inverted;
    },
    setInverted: function (newVal) {
        this.inverted = newVal;
        if (this.$hostedComponent)
            this.setHostedComponentColors();
        else
            this.invalidate();
    },
    isMarked: function () {
        return this.marked;
    },
    setMarked: function (newVal) {
        if (!newVal)
            this.invalidate();
        this.marked = newVal;
        if (this.$hostedComponent)
            this.setHostedComponentColors();
        else if (newVal)
            this.invalidate();
    },
    isFocused: function () {
        return this.focused;
    },
    setFocused: function (newVal) {
        if (!newVal)
            this.invalidate();
        this.focused = newVal;
        if (newVal)
            this.invalidate();
    },
    isAlternative: function () {
        return this.alternative;
    },
    setAlternative: function (newVal) {
        this.alternative = newVal;
        this.invalidate();
    },
    update: function (ctx, dirtyRegion) {
        if (this.isEmpty() || !this.isVisible() || this.isTemporaryHidden() || this.$hostedComponent)
            return false;
        if (dirtyRegion && !this.shape.intersects(dirtyRegion))
            return false;
        var bb = this.getBoxBaseResolve();
        if (!bb.transparent) {
            if (!bb.bgGradient || bb.bgGradient.hasTransparency()) {
                ctx.fillStyle = this.inactive ? bb.inactiveColor : this.inverted ? bb.textColor : bb.backColor;
                this.shape.fill(ctx, dirtyRegion);
            }
            if (bb.bgGradient) {
                ctx.fillStyle = bb.bgGradient.getGradient(ctx, this.shape.getBounds());
                this.shape.fill(ctx, dirtyRegion);
            }
            ctx.fillStyle = 'black';
        }
        this.updateContent(ctx, dirtyRegion);
        this.drawBorder(ctx);
        return true;
    },
    updateContent: function (ctx, dirtyRegion) {
    },
    drawBorder: function (ctx) {
        if (this.border || this.marked || this.focused) {
            var bb = this.getBoxBaseResolve();
            ctx.strokeStyle = bb.borderColor;
            bb[this.marked || this.focused ? 'markerStroke' : 'borderStroke'].setStroke(ctx);
            if (this.marked || this.focused)
                ctx.globalCompositeOperation = 'xor';
            this.shape.stroke(ctx);
            if (this.marked || this.focused)
                ctx.globalCompositeOperation = 'source-over';
            ctx.strokeStyle = 'black';
            AWT.Stroke.prototype.setStroke(ctx);
        }
    },
    getBorderBounds: function () {
        var result = new Rectangle(this.getBounds());
        if (this.border || this.marked || this.focused) {
            var bb = this.getBoxBaseResolve();
            var w = bb[this.marked || this.focused ? 'markerStroke' : 'borderStroke'].lineWidth;
            result.moveBy(-w / 2, -w / 2);
            result.dim.width += w;
            result.dim.height += w;
        }
        return result;
    },
    setHostedComponent: function ($hc) {
        this.$hostedComponent = $hc;
        if (this.$hostedComponent) {
            this.setHostedComponentVisible(false);
            this.setHostedComponentColors();
            this.setHostedComponentBorder();
            this.setHostedComponentBounds();
            this.setHostedComponentVisible();
        }
    },
    getHostedComponent: function () {
        return this.$hostedComponent;
    },
    setHostedComponentColors: function () {
        if (this.$hostedComponent) {
            var bb = this.getBoxBaseResolve();
            this.$hostedComponent.css(bb.getCSS(null, this.inactive, this.inverted, this.alternative));
        }
    },
    setHostedComponentBorder: function () {
    },
    setHostedComponentBounds: function () {
        if (this.$hostedComponent) {
            var r = this.getBounds();
            this.$hostedComponent.css({
                position: 'absolute',
                width: r.dim.width + 'px',
                height: r.dim.height + 'px',
                top: r.pos.y + 'px',
                left: r.pos.x + 'px'
            });
        }
    }
};
AbstractBox.prototype = $.extend(Object.create(AWT.Rectangle.prototype), AbstractBox.prototype);
module.exports = AbstractBox;
},{"../AWT":47,"./BoxBase":89,"jquery":5}],83:[function(require,module,exports){
var $ = require('jquery'), BoxBase = require('./BoxBase'), Utils = require('../Utils'), ActiveBoxContent = require('./ActiveBoxContent'), Shaper = require('../shapers/Shaper'), AWT = require('../AWT');
var ActiveBagContent = function (id, ncw, nch) {
    if (id)
        this.id = id;
    this.activeBoxContentArray = [];
    this.ncw = Math.max(1, ncw);
    this.nch = Math.max(1, nch);
};
ActiveBagContent.prototype = {
    constructor: ActiveBagContent,
    id: 'primary',
    imgName: null,
    img: null,
    ncw: 1,
    nch: 1,
    w: Utils.settings.DEFAULT_GRID_ELEMENT_SIZE,
    h: Utils.settings.DEFAULT_GRID_ELEMENT_SIZE,
    border: true,
    bb: null,
    shaper: null,
    backgroundContent: null,
    activeBoxContentArray: null,
    defaultIdValue: -1,
    setProperties: function ($xml, mediaBag) {
        var cellSet = this, bug = false, i, n;
        $.each($xml.get(0).attributes, function () {
            var name = this.name, val = this.value;
            switch (this.name) {
            case 'id':
                cellSet.id = val;
                break;
            case 'image':
                cellSet.imgName = val;
                break;
            case 'rows':
                cellSet.nch = Number(val);
                break;
            case 'columns':
                bug = true;
            case 'cols':
                cellSet.ncw = Number(val);
                break;
            case 'cellWidth':
                cellSet.w = Number(val);
                break;
            case 'cellHeight':
                cellSet.h = Number(val);
                break;
            case 'border':
                cellSet.border = Utils.getBoolean(val);
                break;
            }
        });
        if (bug) {
            n = cellSet.ncw;
            cellSet.ncw = cellSet.nch;
            cellSet.nch = n;
        }
        $xml.children().each(function () {
            var $node = $(this);
            switch (this.nodeName) {
            case 'style':
                cellSet.bb = new BoxBase(null).setProperties($node);
                break;
            case 'shaper':
                var shaperClassName = $node.attr('class'), nCols = Math.max(1, $node.attr('cols')), nRows = Math.max(1, $node.attr('rows'));
                cellSet.shaper = Shaper.getShaper(shaperClassName, nCols, nRows);
                cellSet.shaper.setProperties($node);
                break;
            case 'ids':
                var ids = this.textContent.split(' ');
                for (i = 0; i < ids.length; i++)
                    cellSet.activeBoxContentArray[i] = new ActiveBoxContent(Number(ids[i]));
                break;
            case 'cell':
                var abc = new ActiveBoxContent().setProperties($node, mediaBag);
                cellSet.activeBoxContentArray.push(abc);
                break;
            }
        });
        n = this.activeBoxContentArray.length;
        if (n > 0) {
            var empty = true;
            for (i = 0; i < n; i++) {
                var bxc = this.getActiveBoxContent(i);
                if (bxc.id !== -1 || bxc.item !== -1 || !bxc.isEmpty()) {
                    empty = false;
                    break;
                }
            }
            if (empty) {
                for (i = 0; i < n; i++)
                    this.getActiveBoxContent(i).id = i;
            }
        }
        if (cellSet.bb) {
            $.each(cellSet.activeBoxContentArray, function (i, cellContent) {
                if (cellContent.bb)
                    cellContent.bb.parent = cellSet.bb;
            });
        }
        return this;
    },
    prepareMedia: function (playStation) {
    },
    getTotalWidth: function () {
        return this.w * this.ncw;
    },
    getTotalHeight: function () {
        return this.h * this.nch;
    },
    getNumCells: function () {
        return this.activeBoxContentArray.length;
    },
    isEmpty: function () {
        return this.activeBoxContentArray.length === 0;
    },
    getShaper: function () {
        if (this.shaper === null)
            this.shaper = Shaper.getShaper('@Rectangular', this.ncw, this.nch);
        return this.shaper;
    },
    addActiveBoxContent: function (ab) {
        this.activeBoxContentArray.push(ab);
        if (this.ncw === 0 || this.nch === 0) {
            this.ncw = 1;
            this.nch = 1;
        }
    },
    getActiveBoxContent: function (i) {
        if (i >= this.activeBoxContentArray.length) {
            for (var j = this.activeBoxContentArray.length; j <= i; j++)
                this.activeBoxContentArray.push(new ActiveBoxContent());
        }
        return this.activeBoxContentArray[i];
    },
    getActiveBoxContentWith: function (id, item) {
        var result = null;
        for (var i = 0; i < this.activeBoxContentArray.length; i++) {
            var abxcnt = this.activeBoxContentArray[i];
            if (abxcnt.id === id && abxcnt.item === item) {
                result = abxcnt;
                break;
            }
        }
        return result;
    },
    setImgContent: function (mb, sh, roundSizes) {
        if (sh)
            this.setShaper(sh);
        if (this.shaper.className === '@Holes')
            this.shaper.hasRemainder = true;
        this.ncw = this.shaper.nCols;
        this.nch = this.shaper.nRows;
        if (mb && this.imgName && mb.elements[this.imgName] && mb.elements[this.imgName].ready) {
            this.img = mb.elements[this.imgName].data;
            this.w = this.img.width / this.ncw;
            this.h = this.img.height / this.nch;
            if (roundSizes) {
                this.w = Math.round(this.w);
                this.h = Math.round(this.h);
            }
        } else {
            this.img = null;
            this.w = Math.max(this.w, 10);
            this.h = Math.max(this.h, 10);
        }
        var r = new AWT.Rectangle(0, 0, this.w * this.ncw, this.h * this.nch);
        for (var i = 0; i < this.shaper.nCells; i++) {
            this.getActiveBoxContent(i).setImgContent(this.img, this.shaper.getShape(i, r));
        }
        if (this.shaper.hasRemainder) {
            this.backgroundContent = new ActiveBoxContent();
            this.backgroundContent.setImgContent(this.img, this.shaper.getRemainderShape(r));
        }
    },
    setTextContent: function (txt, setNcw, setNch) {
        this.ncw = Math.max(1, setNcw);
        this.nch = Math.max(1, setNch);
        var n = this.ncw * this.nch;
        for (var i = 0; i < n; i++) {
            this.getActiveBoxContent(i).setTextContent(i >= txt.length || txt[i] === null ? '' : txt[i]);
        }
    },
    setIds: function (ids) {
        for (var i = 0; i < this.activeBoxContentArray.length; i++)
            if (i < ids.length)
                this.getActiveBoxContent(i).id = ids[i];
    },
    setAllIdsTo: function (id) {
        for (var i = 0; i < this.activeBoxContentArray.length; i++)
            this.getActiveBoxContent(i).id = id;
    },
    avoidAllIdsNull: function (maxId) {
        var i, allIdsNull = true, numCells = this.activeBoxContentArray.length;
        for (i = 0; i < numCells; i++) {
            if (this.getActiveBoxContent(i).id !== -1) {
                allIdsNull = false;
                break;
            }
        }
        if (allIdsNull) {
            maxId = Math.max(1, maxId);
            for (i = 0; i < numCells; i++) {
                this.getActiveBoxContent(i).id = i % maxId;
            }
        }
    }
};
module.exports = ActiveBagContent;
},{"../AWT":47,"../Utils":53,"../shapers/Shaper":104,"./ActiveBoxContent":86,"./BoxBase":89,"jquery":5}],84:[function(require,module,exports){
var $ = require('jquery'), AbstractBox = require('./AbstractBox'), ActiveBoxContent = require('./ActiveBoxContent'), ActiveBagContent = require('./ActiveBagContent'), AWT = require('../AWT'), Utils = require('../Utils');
var ActiveBox = function (parent, container, boxBase, setIdLoc, rect) {
    AbstractBox.call(this, parent, container, boxBase);
    this.clear();
    if (typeof setIdLoc === 'number') {
        this.idLoc = setIdLoc;
        this.idAss = 0;
        this.idOrder = 0;
    }
    if (rect)
        this.setBounds(rect);
};
ActiveBox.createCell = function ($dom, abc) {
    if (abc && abc.dimension) {
        var box = new ActiveBox();
        box.setContent(abc);
        var $canvas = $('<canvas width="' + abc.dimension.width + '" height="' + abc.dimension.height + '"/>');
        var rect = new AWT.Rectangle(0, 0, abc.dimension.width, abc.dimension.height);
        box.setBounds(rect);
        $dom.append($canvas);
        box.update($canvas.get(0).getContext('2d'), rect);
        return box;
    }
};
ActiveBox.prototype = {
    constructor: ActiveBox,
    idOrder: -1,
    idLoc: -1,
    idAss: -1,
    content: null,
    altContent: null,
    hasHostedComponent: false,
    hostedMediaPlayer: null,
    isBackground: false,
    getCurrentContent: function () {
        return this.isAlternative() ? this.altContent : this.content;
    },
    getContent: function () {
        if (!this.content)
            this.setContent(new ActiveBoxContent());
        return this.content;
    },
    clear: function () {
        this.content = null;
        this.altContent = null;
        this.idOrder = -1;
        this.setInactive(true);
        if (!this.hasHostedComponent)
            this.setHostedComponent(null);
        this.setHostedMediaPlayer(null);
        this.invalidate();
    },
    isEquivalent: function (bx, checkCase) {
        return bx !== null && this.content !== null && this.content.isEquivalent(bx.content, checkCase);
    },
    isCurrentContentEquivalent: function (bx, checkCase) {
        return bx !== null && this.getCurrentContent() !== null && this.getCurrentContent().isEquivalent(bx.getCurrentContent(), checkCase);
    },
    exchangeLocation: function (bx) {
        var pt = new AWT.Point(this.pos);
        var idLoc0 = this.idLoc;
        this.moveTo(bx.pos);
        bx.moveTo(pt);
        this.idLoc = bx.idLoc;
        bx.idLoc = idLoc0;
    },
    copyContent: function (bx) {
        this.idOrder = bx.idOrder;
        this.idAss = bx.idAss;
        this.content = bx.content;
        this.altContent = bx.altContent;
        if (this.content) {
            if (this.content.bb)
                this.setBoxBase(this.content.bb);
            if (this.content.border !== null && bx.hasBorder() !== this.content.border)
                this.setBorder(this.content.border);
        }
        this.setInactive(bx.isInactive());
        this.setInverted(bx.isInverted());
        this.setAlternative(bx.isAlternative());
        this.setHostedComponent(bx.getHostedComponent());
        this.hasHostedComponent = bx.hasHostedComponent;
        this.setHostedMediaPlayer(bx.hostedMediaPlayer);
        if (this.hostedMediaPlayer)
            this.hostedMediaPlayer.setVisualComponentVisible(!isInactive() && isVisible());
    },
    exchangeContent: function (bx) {
        var bx0 = new ActiveBox(this.getParent(), this.getContainerX(), this.boxBase);
        bx0.copyContent(this);
        this.copyContent(bx);
        bx.copyContent(bx0);
    },
    setTextContent: function (tx) {
        if (!tx)
            tx = '';
        if (!this.content)
            this.content = new ActiveBoxContent();
        this.content.rawText = tx;
        this.content.text = tx;
        this.content.mediaContent = null;
        this.content.img = null;
        this.setHostedComponent(null);
        this.setInactive(false);
        this.checkHostedComponent();
        this.setHostedMediaPlayer(null);
    },
    setDefaultIdAss: function () {
        this.idAss = this.content === null ? -1 : this.content.id;
    },
    isAtPlace: function () {
        return this.idOrder === this.idLoc;
    },
    setContent: function (abc, i) {
        if (abc instanceof ActiveBagContent) {
            if (i < 0)
                i = this.idOrder;
            if (i >= abc.getNumCells())
                return;
            if (abc.bb !== this.boxBase)
                this.setBoxBase(abc.bb);
            abc = abc.getActiveBoxContent(i);
        }
        this.setHostedComponent(null);
        this.setHostedMediaPlayer(null);
        this.content = abc;
        if (abc) {
            if (abc.bb !== this.boxBase)
                this.setBoxBase(abc.bb);
            if (abc.hasOwnProperty('border') && this.hasBorder() !== abc.border)
                this.setBorder(abc.border);
            this.setInactive(false);
            this.checkHostedComponent();
            this.checkAutoStartMedia();
        } else
            this.clear();
        this.invalidate();
    },
    setAltContent: function (abc, i) {
        if (abc instanceof ActiveBagContent) {
            if (i < 0)
                i = this.idOrder;
            abc = abc.getActiveBoxContent(i);
        }
        this.altContent = abc;
        this.checkHostedComponent();
        if (this.isAlternative() && this.hostedMediaPlayer)
            this.setHostedMediaPlayer(null);
    },
    setCurrentContent: function (abc) {
        if (this.isAlternative())
            this.setAltContent(abc);
        else
            this.setContent(abc);
        this.invalidate();
    },
    switchToAlt: function () {
        if (this.isAlternative() || !this.altContent || this.altContent.isEmpty())
            return false;
        this.setHostedComponent(null);
        this.setHostedMediaPlayer(null);
        this.setAlternative(true);
        this.checkHostedComponent();
        this.checkAutoStartMedia();
        return true;
    },
    checkHostedComponent: function (ctx) {
        if (this.hasHostedComponent)
            return;
        var abc = this.getCurrentContent();
        var bb = this.getBoxBaseResolve();
        var jc = null;
        if (!this.isInactive() && abc && abc.htmlText) {
            var s = abc.htmlText;
            if (abc.innerHtmlText) {
                var css = bb.getCSS();
                css['text-align'] = abc.txtAlign.h.replace('middle', 'center');
            }
        }
    },
    checkAutoStartMedia: function () {
        var cnt = this.getContent();
        if (cnt && cnt.mediaContent && cnt.mediaContent.autoStart && cnt.amp) {
        }
    },
    updateContent: function (ctx, dirtyRegion) {
        var abc = this.getCurrentContent();
        var bb = this.getBoxBaseResolve();
        if (this.isInactive() || !abc || this.dim.width < 2 || this.dim.height < 2)
            return true;
        if (dirtyRegion && !this.intersects(dirtyRegion))
            return false;
        var imgRect = null;
        if (abc.img) {
            if (abc.imgClip) {
                var r = abc.imgClip.getBounds();
                var img = abc.img;
                if (!abc.imgClip.isRect()) {
                    var tmpCanvas = document.createElement('canvas');
                    tmpCanvas.width = r.pos.x + r.dim.width;
                    tmpCanvas.height = r.pos.y + r.dim.height;
                    var tmpCtx = tmpCanvas.getContext('2d');
                    abc.imgClip.clip(tmpCtx);
                    tmpCtx.drawImage(abc.img, 0, 0);
                    img = tmpCanvas;
                }
                ctx.drawImage(img, Math.max(0, r.pos.x), Math.max(0, r.pos.y), Math.min(img.width, r.dim.width), Math.min(img.height, r.dim.height), this.pos.x, this.pos.y, this.dim.width, this.dim.height);
            } else {
                var imgw, imgh;
                var compress = false;
                imgw = abc.img.naturalWidth;
                if (imgw === 0)
                    imgw = this.dim.width;
                imgh = abc.img.naturalHeight;
                if (imgh === 0)
                    imgh = this.dim.height;
                var scale = 1;
                if (Utils.settings.COMPRESS_IMAGES && (this.dim.width > 0 && this.dim.height > 0) && (imgw > this.dim.width || imgh > this.dim.height)) {
                    scale = Math.min(this.dim.width / imgw, this.dim.height / imgh);
                    imgw *= scale;
                    imgh *= scale;
                    compress = true;
                }
                var xs = abc.imgAlign.h === 'left' ? 0 : abc.imgAlign.h === 'right' ? this.dim.width - imgw : (this.dim.width - imgw) / 2;
                var ys = abc.imgAlign.v === 'top' ? 0 : abc.imgAlign.v === 'bottom' ? this.dim.height - imgh : (this.dim.height - imgh) / 2;
                if (compress) {
                    ctx.drawImage(abc.img, this.pos.x + xs, this.pos.y + ys, imgw, imgh);
                } else
                    ctx.drawImage(abc.img, this.pos.x + xs, this.pos.y + ys);
                if (abc.avoidOverlapping && abc.text)
                    imgRect = new AWT.Rectangle(Math.max(0, xs), Math.max(0, ys), Math.min(this.dim.width, imgw), Math.min(this.dim.height, imgh));
            }
        }
        if (abc.text && abc.text.length > 0) {
            var px = this.pos.x;
            var py = this.pos.y;
            var pWidth = this.dim.width;
            var pHeight = this.dim.height;
            if (imgRect) {
                var prx = [
                        0,
                        imgRect.pos.x,
                        imgRect.pos.x + imgRect.dim.width,
                        pWidth
                    ];
                var pry = [
                        0,
                        imgRect.pos.y,
                        imgRect.pos.y + imgRect.dim.height,
                        pHeight
                    ];
                var rr = [
                        new AWT.Rectangle(prx[0], pry[0], prx[3], pry[1]),
                        new AWT.Rectangle(prx[0], pry[2], prx[3], pry[3] - pry[2]),
                        new AWT.Rectangle(prx[0], pry[0], prx[1], pry[3]),
                        new AWT.Rectangle(prx[2], pry[0], prx[3] - prx[2], pry[3])
                    ];
                var rmax = rr[0];
                var maxSurface = rmax.dim.width * rmax.dim.height;
                for (var i = 1; i < rr.length; i++) {
                    var s = rr[i].dim.width * rr[i].dim.height;
                    if (s > maxSurface - 1) {
                        if (Math.abs(s - maxSurface) <= 1) {
                            var b = false;
                            switch (i) {
                            case 1:
                                b = abc.txtAlign.v === 'bottom';
                                break;
                            case 2:
                                b = abc.txtAlign.h === 'left';
                                break;
                            case 3:
                                b = abc.txtAlign.h === 'right';
                                break;
                            }
                            if (!b)
                                continue;
                        }
                        maxSurface = s;
                        rmax = rr[i];
                    }
                }
                px += rmax.pos.x;
                py += rmax.pos.y;
                pWidth = rmax.dim.width;
                pHeight = rmax.dim.height;
            }
            var availWidth = Math.max(5, pWidth - 2 * bb.textMargin);
            var availHeight = Math.max(5, pHeight - 2 * bb.textMargin);
            var lines = bb.prepareText(ctx, abc.text, availWidth, availHeight);
            ctx.font = bb.font.cssFont();
            ctx.textBaseline = 'hanging';
            var lineHeight = bb.font.getHeight();
            var totalHeight = lineHeight * lines.length;
            var y = py + bb.textMargin + (abc.txtAlign.v === 'top' ? 0 : abc.txtAlign.v === 'bottom' ? availHeight - totalHeight : (availHeight - totalHeight) / 2);
            for (var l = 0; l < lines.length; l++, y += lineHeight) {
                var x = px + bb.textMargin + (abc.txtAlign.h === 'left' ? 0 : abc.txtAlign.h === 'right' ? availWidth - lines[l].size.width : (availWidth - lines[l].size.width) / 2);
                if (bb.shadow) {
                    var d = Math.max(1, bb.font.size / 10);
                    ctx.fillStyle = bb.shadowColor;
                    ctx.fillText(lines[l].text, x + d, y + d);
                }
                ctx.fillStyle = this.isInverted() ? bb.backColor : this.isAlternative() ? bb.alternativeColor : bb.textColor;
                ctx.fillText(lines[l].text, x, y);
            }
        }
        return true;
    },
    getDescription: function () {
        return this.content ? this.content.getDescription() : '';
    },
    playMedia: function (ps) {
        var abc = this.getCurrentContent();
        if (abc && abc.mediaContent) {
            ps.playMedia(abc.mediaContent, this);
            return true;
        }
        return false;
    },
    setHostedMediaPlayer: function (amp) {
        var old = this.hostedMediaPlayer;
        this.hostedMediaPlayer = amp;
        if (old && old !== amp)
            old.linkTo(null);
    },
    setBounds: function (rect, y, w, h) {
        if (typeof rect === 'number')
            rect = new AWT.Rectangle(rect, y, w, h);
        if (this.equals(rect))
            return;
        AbstractBox.prototype.setBounds.call(this, rect);
        if (this.hostedMediaPlayer)
            this.hostedMediaPlayer.checkVisualComponentBounds(this);
    }
};
ActiveBox.prototype = $.extend(Object.create(AbstractBox.prototype), ActiveBox.prototype);
module.exports = ActiveBox;
},{"../AWT":47,"../Utils":53,"./AbstractBox":82,"./ActiveBagContent":83,"./ActiveBoxContent":86,"jquery":5}],85:[function(require,module,exports){
var $ = require('jquery'), BoxBag = require('./BoxBag'), AWT = require('../AWT');
var ActiveBoxBag = function (parent, container, boxBase) {
    BoxBag.call(this, parent, container, boxBase);
};
ActiveBoxBag.prototype = {
    constructor: ActiveBoxBag,
    addActiveBox: function (bx) {
        bx.idLoc = this.cells.length;
        bx.idOrder = bx.idLoc;
        return this.addBox(bx);
    },
    getActiveBox: function (idLoc) {
        return this.getBox(idLoc);
    },
    getBackgroundActiveBox: function () {
        return this.getBackgroundBox();
    },
    setContent: function (abc, altAbc, fromIndex, toCell, numCells) {
        var bx;
        if (!fromIndex)
            fromIndex = 0;
        if (!toCell)
            toCell = 0;
        if (!numCells)
            numCells = this.cells.length;
        for (var i = 0; i < numCells; i++) {
            bx = this.getActiveBox(toCell + i);
            bx.setContent(abc, fromIndex + i);
            bx.setAlternative(false);
            if (altAbc)
                bx.setAltContent(altAbc, fromIndex + i);
        }
        if (abc.backgroundContent !== null && this.getBackgroundActiveBox() !== null) {
            bx = this.getBackgroundActiveBox();
            bx.setContent(abc.backgroundContent);
            if (abc.bb !== bx.boxBase)
                bx.setBoxBase(abc.bb);
        }
    },
    findActiveBox: function (point) {
        return this.findBox(point);
    },
    clearAll: function () {
        for (var i = 0; i < this.cells.length; i++)
            this.getActiveBox(i).clear();
        if (this.backgroundBox !== null)
            this.getBackgroundActiveBox().clear();
    },
    countCellsAtPlace: function () {
        var cellsAtPlace = 0;
        for (var i = 0; i < this.cells.length; i++)
            if (this.getActiveBox(i).isAtPlace())
                cellsAtPlace++;
        return cellsAtPlace;
    },
    getActiveBoxWithIdLoc: function (idLoc) {
        var result = null;
        for (var bx, i = 0; i < this.cells.length; i++) {
            if ((bx = this.getActiveBox(i)).idLoc === idLoc) {
                result = bx;
                break;
            }
        }
        return result;
    },
    cellIsAtEquivalentPlace: function (bx, checkCase) {
        return bx.isAtPlace() || bx.isEquivalent(this.getActiveBoxWithIdLoc(bx.idOrder), checkCase);
    },
    countCellsAtEquivalentPlace: function (checkCase) {
        var cellsAtPlace = 0;
        for (var i = 0; i < this.cells.length; i++) {
            if (this.cellIsAtEquivalentPlace(this.getActiveBox(i), checkCase))
                cellsAtPlace++;
        }
        return cellsAtPlace;
    },
    countCellsWithIdAss: function (idAss) {
        var n = 0;
        for (var i = 0; i < this.cells.length; i++) {
            if (this.getActiveBox(i).idAss === idAss)
                n++;
        }
        return n;
    },
    countInactiveCells: function () {
        var n = 0;
        for (var i = 0; i < this.cells.length; i++) {
            if (this.getActiveBox(i).isInactive())
                n++;
        }
        return n;
    },
    setDefaultIdAss: function () {
        for (var i = 0; i < this.cells.length; i++)
            this.getActiveBox(i).setDefaultIdAss();
    },
    scrambleCells: function (times, fitInArea) {
        var nc = this.cells.length;
        if (nc >= 2) {
            var pos = [];
            var idLoc = [];
            var i, bx;
            for (i = 0; i < nc; i++) {
                bx = this.getActiveBox(i);
                pos[i] = new AWT.Point(bx.pos);
                idLoc[i] = bx.idLoc;
            }
            var p = new AWT.Point();
            var j;
            for (i = 0; i < times; i++) {
                var r1 = Math.floor(Math.random() * nc);
                var r2 = Math.floor(Math.random() * nc);
                if (r1 !== r2) {
                    p.moveTo(pos[r1]);
                    pos[r1].moveTo(pos[r2]);
                    pos[r2].moveTo(p);
                    j = idLoc[r1];
                    idLoc[r1] = idLoc[r2];
                    idLoc[r2] = j;
                }
            }
            var maxX = this.pos.x + this.dim.width;
            var maxY = this.pos.y + this.dim.height;
            for (i = 0; i < nc; i++) {
                bx = this.getActiveBox(i);
                var px = pos[i].x;
                var py = pos[i].y;
                if (fitInArea) {
                    px = Math.min(Math.max(px, this.pos.x), maxX - bx.dim.width);
                    py = Math.min(Math.max(py, this.pos.y), maxY - bx.dim.height);
                }
                bx.moveTo(new AWT.Point(px, py));
                bx.idLoc = idLoc[i];
            }
        }
    },
    resetIds: function () {
        for (var i = 0; i < this.cells.length; i++) {
            var bx = cells[i];
            if (bx) {
                bx.idOrder = i;
                bx.idAss = i;
                bx.idLoc = i;
            }
        }
    },
    getNextItem: function (currentItem, idAssValid) {
        var IDASSNOTUSED = -12345;
        if (!idAssValid)
            idAssValid = IDASSNOTUSED;
        var i;
        for (i = currentItem + 1; i < this.cells.length; i++) {
            var bx = this.cells[i];
            if (!bx)
                break;
            if (idAssValid !== IDASSNOTUSED) {
                if (idAssValid === bx.idAss)
                    break;
            } else if (bx.idAss >= 0)
                break;
        }
        return i;
    }
};
ActiveBoxBag.prototype = $.extend(Object.create(BoxBag.prototype), ActiveBoxBag.prototype);
module.exports = ActiveBoxBag;
},{"../AWT":47,"./BoxBag":88,"jquery":5}],86:[function(require,module,exports){
var $ = require('jquery'), AWT = require('../AWT'), Utils = require('../Utils'), BoxBase = require('./BoxBase'), MediaContent = require('../media/MediaContent');
var ActiveBoxContent = function (id) {
    if (typeof id !== 'undefined')
        this.id = id;
    this.imgAlign = {
        h: 'middle',
        v: 'middle'
    };
    this.txtAlign = {
        h: 'middle',
        v: 'middle'
    };
};
ActiveBoxContent.prototype = {
    constructor: ActiveBoxContent,
    bb: null,
    dimension: null,
    border: null,
    text: null,
    imgName: null,
    imgClip: null,
    mediaContent: null,
    imgAlign: null,
    txtAlign: null,
    avoidOverlapping: false,
    id: -1,
    item: -1,
    img: null,
    userData: null,
    rawText: null,
    htmlText: null,
    innerHtmlText: null,
    animated: false,
    amp: null,
    setProperties: function ($xml, mediaBag) {
        var content = this;
        $.each($xml.get(0).attributes, function () {
            var name = this.name;
            var val = this.value;
            switch (this.name) {
            case 'id':
            case 'item':
                content[name] = Number(val);
                break;
            case 'width':
            case 'height':
                if (content.dimension === null)
                    content.dimension = new AWT.Dimension(0, 0);
                content.dimension[name] = Number(val);
                break;
            case 'txtAlign':
            case 'imgAlign':
                content[name] = content.readAlign(val);
                break;
            case 'hAlign':
                content['txtAlign'] = content.readAlign(val + ',center');
                content['imgAlign'] = content.readAlign(val + ',center');
                break;
            case 'border':
            case 'avoidOverlapping':
                content[name] = Utils.getBoolean(val);
                break;
            case 'image':
                content.imgName = val;
                break;
            }
        });
        $xml.children().each(function () {
            var $node = $(this);
            switch (this.nodeName) {
            case 'style':
                content.bb = new BoxBase(null).setProperties($node);
                break;
            case 'media':
                content.mediaContent = new MediaContent().setProperties($node);
                break;
            case 'p':
                if (content.text === null)
                    content.text = '';
                else
                    content.text += '\n';
                content.text += this.textContent;
                break;
            }
        });
        if (mediaBag)
            this.realizeContent(mediaBag);
        return this;
    },
    readAlign: function (str) {
        var align = {
                h: 'center',
                v: 'center'
            };
        if (str) {
            var v = str.split(',');
            align.h = v[0].replace('middle', 'center');
            align.v = v[1].replace('middle', 'center');
        }
        return align;
    },
    isEmpty: function () {
        return this.text === null && this.img === null;
    },
    isEquivalent: function (abc, checkCase) {
        if (abc === this)
            return true;
        var result = false;
        if (abc !== null) {
            if (this.isEmpty() && abc.isEmpty())
                result = this.id === abc.id;
            else
                result = (this.text === null ? abc.text === null : checkCase ? this.text === abc.text : this.text.toLocaleLowerCase() === abc.text.toLocaleLowerCase()) && (this.mediaContent === null ? abc.mediaContent === null : this.mediaContent.isEquivalent(abc.mediaContent)) && this.img === abc.img && (this.imgClip === null ? abc.imgClip === null : this.imgClip.equals(abc.imgClip));
        }
        return result;
    },
    setTextContent: function (tx) {
        if (tx !== null) {
            this.rawText = tx;
            this.text = tx;
            this.checkHtmlText(null);
        } else {
            this.rawText = null;
            this.text = null;
            this.htmlText = null;
            this.innerHtmlText = null;
        }
    },
    checkHtmlText: function () {
        this.htmlText = null;
        this.innerHtmlText = null;
        if (this.text !== null && this.text.trim().toLocaleLowerCase().indexOf('<html>') === 0) {
            this.htmlText = this.text.trim();
            var s = this.htmlText.toLocaleLowerCase();
            if (s.indexOf('<body') === -1) {
                var s2 = s.indexOf('</html>');
                if (s2 >= 0) {
                    this.innerHtmlText = this.htmlText.substr(6, s2);
                }
            }
        }
    },
    setImgContent: function (img, imgClip) {
        this.img = img;
        this.imgName = null;
        this.imgClip = imgClip;
    },
    prepareMedia: function (playStation) {
    },
    realizeContent: function (mediaBag) {
        var thisContent = this;
        if (this.imgName !== null && this.imgName.length > 0) {
            var mbe = mediaBag.getElement(this.imgName, true);
            if (mbe) {
                mbe.build(function () {
                    thisContent.img = mbe.data;
                });
            }
        }
        if (this.mediaContent !== null) {
            if (this.imgName === null && (this.text === null || this.text.length === 0)) {
                this.img = this.mediaContent.getIcon();
            }
        }
        this.checkHtmlText(mediaBag);
    },
    getDescription: function () {
        var result = '';
        if (this.text && this.text.length > 0)
            result += this.text;
        else if (this.imgName)
            result += 'IMG:' + this.imgName;
        else if (this.imgClip) {
            var r = this.imgClip.getBounds();
            result += '[' + r.x + ',' + r.y + ',' + r.width + ',' + r.height + ']';
        }
        if (this.mediaContent) {
            if (result.length > 0)
                result += ' ';
            result += this.mediaContent.getDescription();
        }
        return result;
    },
    EMPTY_CONTENT: null
};
ActiveBoxContent.prototype.EMPTY_CONTENT = new ActiveBoxContent();
module.exports = ActiveBoxContent;
},{"../AWT":47,"../Utils":53,"../media/MediaContent":97,"./BoxBase":89,"jquery":5}],87:[function(require,module,exports){
var $ = require('jquery'), ActiveBoxBag = require('./ActiveBoxBag'), ActiveBox = require('./ActiveBox'), AWT = require('../AWT'), Utils = require('../Utils');
var ActiveBoxGrid = function (parent, container, boxBase, px, py, setWidth, setHeight, sh) {
    ActiveBoxBag.call(this, parent, container, boxBase);
    var i, tmpSh, bx;
    this.nCols = sh.nCols;
    this.nRows = sh.nRows;
    var r = new AWT.Rectangle(new AWT.Point(px, py), new AWT.Dimension(Math.round(setWidth / this.nCols) * this.nCols, Math.round(setHeight / this.nRows) * this.nRows));
    for (i = 0; i < sh.nCells; i++) {
        tmpSh = sh.getShape(i, r);
        bx = new ActiveBox(this, container, boxBase, i, tmpSh.getBounds());
        if (!sh.rectangularShapes)
            bx.setShape(tmpSh);
        this.addActiveBox(bx);
    }
    if (sh.hasRemainder) {
        tmpSh = sh.getRemainderShape(r);
        bx = new ActiveBox(this, container, boxBase, 0, tmpSh.getBounds());
        bx.setShape(tmpSh);
        this.setBackgroundBox(bx);
    }
};
ActiveBoxGrid.createEmptyGrid = function (parent, container, px, py, abc, sh, boxBase) {
    var result = null;
    if (abc) {
        result = new ActiveBoxGrid(parent, container, boxBase ? boxBase : abc.bb, px, py, abc.getTotalWidth(), abc.getTotalHeight(), sh ? sh : abc.getShaper());
        result.setBorder(abc.border);
    }
    return result;
};
ActiveBoxGrid.prototype = {
    constructor: ActiveBoxGrid,
    nCols: 1,
    nRows: 1,
    getMinimumSize: function () {
        return new AWT.Dimension(Utils.settings.MIN_CELL_SIZE * this.nCols, Utils.settings.MIN_CELL_SIZE * this.nRows);
    },
    getScaledSize: function (scale) {
        return new AWT.Dimension(Utils.roundTo(scale * this.preferredBounds.dim.width, this.nCols), Utils.roundTo(scale * this.preferredBounds.dim.height, this.nRows));
    },
    getCoord: function (bx) {
        var py = Math.floor(bx.idLoc / this.nCols);
        var px = bx.idLoc % this.nCols;
        return new AWT.Point(px, py);
    },
    getCoordDist: function (src, dest) {
        var ptSrc = this.getCoord(src);
        var ptDest = this.getCoord(dest);
        return new AWT.Point(ptDest.x - ptSrc.x, ptDest.y - ptSrc.y);
    }
};
ActiveBoxGrid.prototype = $.extend(Object.create(ActiveBoxBag.prototype), ActiveBoxGrid.prototype);
module.exports = ActiveBoxGrid;
},{"../AWT":47,"../Utils":53,"./ActiveBox":84,"./ActiveBoxBag":85,"jquery":5}],88:[function(require,module,exports){
var $ = require('jquery'), AbstractBox = require('./AbstractBox'), AWT = require('../AWT'), Utils = require('../Utils');
var BoxBag = function (parent, container, boxBase) {
    AbstractBox.call(this, parent, container, boxBase);
    this.preferredBounds = new AWT.Rectangle();
    this.cells = [];
};
BoxBag.prototype = {
    constructor: BoxBag,
    cells: [],
    preferredBounds: new AWT.Rectangle(),
    backgroundBox: null,
    getPreferredSize: function () {
        return this.preferredBounds.dim;
    },
    getMinimumSize: function () {
        var d = this.getPreferredSize();
        return new AWT.Dimension(Math.max(Utils.settings.MIN_CELL_SIZE, d.width), Math.max(Utils.settings.MIN_CELL_SIZE, d.height));
    },
    getScaledSize: function (scale) {
        var d = this.getPreferredSize();
        return new AWT.Dimension(Math.round(scale * d.width), Math.round(scale * d.height));
    },
    addBox: function (bx) {
        this.cells.push(bx);
        bx.setParent(this);
        if (this.cells.length === 1) {
            AWT.Rectangle.prototype.setBounds.call(this, bx);
        } else {
            this.add(bx);
        }
        this.preferredBounds.setBounds(this.getBounds());
    },
    boxIndex: function (bx) {
        return bx === null ? -1 : this.cells.indexOf(bx);
    },
    getBox: function (n) {
        return n < 0 || n >= this.cells.length ? null : this.cells[n];
    },
    getBackgroundBox: function () {
        return this.backgroundBox;
    },
    setBackgroundBox: function (bx) {
        this.backgroundBox = bx;
        if (bx !== null) {
            bx.setParent(this);
            bx.isBackground = true;
        }
        AWT.Rectangle.prototype.add.call(this, bx);
        this.preferredBounds.setBounds(this.getBounds());
    },
    recalcSize: function () {
        var r = null;
        if (this.backgroundBox)
            r = new AWT.Rectangle(this.backgroundBox.pos, this.backgroundBox.dim);
        for (var i = 0; i < this.cells.length; i++) {
            if (!r)
                r = new AWT.Rectangle(this.cells[i].pos, this.cells[i].dim);
            else
                r.add(this.cells[i]);
        }
        if (!r)
            r = new AWT.Rectangle(this.pos.x, this.pos.y, 0, 0);
        this.preferredBounds.setRect(r);
        this.x = r.pos.x;
        this.y = r.pos.y;
        this.dim.width = r.dim.width;
        this.dim.height = r.dim.height;
    },
    getNumCells: function () {
        return this.cells.length;
    },
    setBorder: function (newVal) {
        for (var i = 0; i < this.cells.length; i++)
            this.getBox(i).setBorder(newVal);
    },
    setVisible: function (newVal) {
        for (var i = 0; i < this.cells.length; i++)
            this.getBox(i).setVisible(newVal);
    },
    setAlternative: function (newVal) {
        AbstractBox.prototype.setAlternative.call(this, newVal);
        for (var i = 0; i < this.cells.length; i++)
            this.getBox(i).setAlternative(newVal);
    },
    setBounds: function (rect, ry, rw, rh) {
        if (typeof rect === 'number') {
            var rx = rect;
            rect = new AWT.Rectangle(rx, ry, rw, rh);
        }
        if (rect.getSurface() > 0 && !rect.equals(this)) {
            var scaleW = rect.dim.width / this.dim.width;
            var scaleH = rect.dim.height / this.dim.height;
            var dx = rect.pos.x - this.pos.x;
            var dy = rect.pos.y - this.pos.y;
            var p, bx;
            for (var i = 0; i < this.cells.length; i++) {
                bx = this.getBox(i);
                p = new AWT.Point(bx.pos.x - this.pos.x, bx.pos.y - this.pos.y);
                bx.setBounds(dx + this.pos.x + scaleW * p.x, dy + this.pos.y + scaleH * p.y, scaleW * bx.dim.width, scaleH * bx.dim.height);
            }
            if (this.backgroundBox !== null) {
                bx = this.backgroundBox;
                p = new AWT.Point(bx.pos.x - this.pos.x, bx.pos.y - this.pos.y);
                bx.setBounds(dx + this.pos.x + scaleW * p.x, dy + this.pos.y + scaleH * p.y, scaleW * bx.dim.width, scaleH * bx.dim.height);
            }
        }
        AbstractBox.prototype.setBounds.call(this, rect);
    },
    update: function (ctx, dirtyRegion) {
        if (this.isEmpty() || !this.isVisible() || this.isTemporaryHidden())
            return false;
        if (dirtyRegion && !this.intersects(dirtyRegion))
            return false;
        if (this.backgroundBox !== null)
            this.backgroundBox.update(ctx, dirtyRegion);
        var bx;
        for (var i = 0; i < this.cells.length; i++) {
            bx = this.getBox(i);
            if (!bx.isMarked())
                bx.update(ctx, dirtyRegion);
        }
        for (var l = 0; l < this.cells.length; l++) {
            bx = this.getBox(l);
            if (bx.isMarked())
                bx.update(ctx, dirtyRegion);
        }
        return true;
    },
    findBox: function (p) {
        var result = null;
        for (var i = this.cells.length - 1; i >= 0; i--) {
            var bx = this.getBox(i);
            if (bx.isVisible() && bx.contains(p)) {
                result = bx;
                break;
            }
        }
        return result;
    },
    countInactiveCells: function () {
        var n = 0;
        for (var i = 0; i < this.cells.length; i++) {
            if (this.getBox(i).isInactive())
                n++;
        }
        return n;
    }
};
BoxBag.prototype = $.extend(Object.create(AbstractBox.prototype), BoxBag.prototype);
BoxBag.layoutSingle = function (preferredMaxSize, rs, margin) {
    if (!rs)
        return preferredMaxSize;
    var d = rs.getPreferredSize();
    var minSize = rs.getMinimumSize();
    var maxSize = preferredMaxSize;
    maxSize.width -= 2 * margin;
    maxSize.height -= 2 * margin;
    if (minSize.width > maxSize.width || minSize.height > maxSize.height) {
        maxSize = minSize;
    }
    var scale = 1;
    if (d.width > maxSize.width) {
        scale = maxSize.width / d.width;
    }
    if (scale * d.height > maxSize.height) {
        scale = maxSize.height / d.height;
    }
    d = rs.getScaledSize(scale);
    rs.setBounds(margin, margin, d.width, d.height);
    d.width += 2 * margin;
    d.height += 2 * margin;
    return d;
};
BoxBag.layoutDouble = function (desiredMaxSize, rsA, rsB, boxGridPos, margin) {
    var isHLayout = false;
    var nbh = 1, nbv = 1;
    switch (boxGridPos) {
    case 'AB':
    case 'BA':
        nbh = 2;
        nbv = 1;
        isHLayout = true;
        break;
    case 'AUB':
    case 'BUA':
        nbh = 1;
        nbv = 2;
        isHLayout = false;
        break;
    }
    var ra = rsA.getBounds();
    var rb = rsB.getBounds();
    var da = rsA.getPreferredSize();
    var db = rsB.getPreferredSize();
    var d = new AWT.Dimension(isHLayout ? da.width + db.width : Math.max(da.width, db.width), isHLayout ? Math.max(da.height, db.height) : da.height + db.height);
    var minSizeA = rsA.getMinimumSize();
    var minSizeB = rsB.getMinimumSize();
    var minSize = new AWT.Dimension(isHLayout ? minSizeA.width + minSizeB.width : Math.max(minSizeA.width, minSizeB.width), isHLayout ? Math.max(minSizeA.height, minSizeB.height) : minSizeA.height + minSizeB.height);
    var maxSize = desiredMaxSize;
    maxSize.width -= (1 + nbh) * margin;
    maxSize.height -= (1 + nbv) * margin;
    if (minSize.width > maxSize.width || minSize.height > maxSize.height)
        maxSize.setDimension(minSize);
    var scale = 1;
    if (d.width > maxSize.width) {
        scale = maxSize.width / d.width;
    }
    if (scale * d.height > maxSize.height) {
        scale = maxSize.height / d.height;
    }
    da = rsA.getScaledSize(scale);
    db = rsB.getScaledSize(scale);
    var dah, dav, dbh, dbv;
    dah = db.width > da.width ? (db.width - da.width) / 2 : 0;
    dbh = da.width > db.width ? (da.width - db.width) / 2 : 0;
    dav = db.height > da.height ? (db.height - da.height) / 2 : 0;
    dbv = da.height > db.height ? (da.height - db.height) / 2 : 0;
    switch (boxGridPos) {
    case 'AB':
        rsA.setBounds(margin, margin + dav, da.width, da.height);
        rsB.setBounds(2 * margin + da.width, margin + dbv, db.width, db.height);
        break;
    case 'BA':
        rsB.setBounds(margin, margin + dbv, db.width, db.height);
        rsA.setBounds(2 * margin + db.width, margin + dav, da.width, da.height);
        break;
    case 'AUB':
        rsA.setBounds(margin + dah, margin, da.width, da.height);
        rsB.setBounds(margin + dbh, 2 * margin + da.height, db.width, db.height);
        break;
    case 'BUA':
        rsB.setBounds(margin + dbh, margin, db.width, db.height);
        rsA.setBounds(margin + dah, 2 * margin + db.height, da.width, da.height);
        break;
    default:
        rsA.setBounds(Math.round(margin + scale * ra.pos.x), Math.round(margin + scale * ra.pos.y), da.width, da.height);
        rsB.setBounds(Math.round(margin + scale * rb.pos.x), Math.round(margin + scale * rb.pos.y), da.width, da.height);
        break;
    }
    var r = new AWT.Rectangle(rsA.getBounds());
    r.add(rsB.getBounds());
    d.width = r.dim.width + 2 * margin;
    d.height = r.dim.height + 2 * margin;
    return d;
};
module.exports = BoxBag;
},{"../AWT":47,"../Utils":53,"./AbstractBox":82,"jquery":5}],89:[function(require,module,exports){
var $ = require('jquery'), Utils = require('../Utils'), AWT = require('../AWT');
var defaultValues = Utils.settings.BoxBase;
var BoxBase = function (parent) {
    this.parent = parent ? parent : null;
};
BoxBase.prototype = {
    constructor: BoxBase,
    parent: null,
    default: defaultValues,
    originalFont: new AWT.Font(),
    font: new AWT.Font(),
    dynFontSize: 0,
    resetFontCounter: 0,
    backColor: defaultValues.BACK_COLOR,
    bgGradient: null,
    textColor: defaultValues.TEXT_COLOR,
    shadowColor: defaultValues.SHADOW_COLOR,
    borderColor: defaultValues.BORDER_COLOR,
    inactiveColor: defaultValues.INACTIVE_COLOR,
    alternativeColor: defaultValues.ALTERNATIVE_COLOR,
    shadow: false,
    transparent: false,
    textMargin: defaultValues.AC_MARGIN,
    borderStroke: new AWT.Stroke(defaultValues.BORDER_STROKE_WIDTH),
    markerStroke: new AWT.Stroke(defaultValues.MARKER_STROKE_WIDTH),
    resetAllFontsCounter: 0,
    flagFontReduced: false,
    setProperties: function ($xml) {
        var bb = this;
        $.each($xml.get(0).attributes, function () {
            var name = this.name;
            var val = this.value;
            switch (this.name) {
            case 'shadow':
            case 'transparent':
                bb[name] = Utils.getBoolean(val, false);
                break;
            case 'margin':
                bb[name] = Number(val);
                break;
            case 'borderStroke':
                bb.borderStroke = new AWT.Stroke(Number(val));
                break;
            case 'markerStroke':
                bb.markerStroke = new AWT.Stroke(Number(val));
                break;
            }
        });
        $xml.children().each(function () {
            var $node = $(this);
            switch (this.nodeName) {
            case 'font':
                bb.font = new AWT.Font().setProperties($node);
                bb.originalFont = Utils.cloneObject(bb.font);
                break;
            case 'gradient':
                bb.bgGradient = new AWT.Gradient().setProperties($node);
                break;
            case 'color':
                bb.textColor = Utils.checkColor($node.attr('foreground'), bb.textColor);
                bb.backColor = Utils.checkColor($node.attr('background'), bb.backColor);
                bb.shadowColor = Utils.checkColor($node.attr('shadow'), bb.shadowColor);
                bb.inactiveColor = Utils.checkColor($node.attr('inactive'), bb.inactiveColor);
                bb.alternativeColor = Utils.checkColor($node.attr('alternative'), bb.alternativeColor);
                bb.borderColor = Utils.checkColor($node.attr('border'), bb.borderColor);
                break;
            }
        });
        return this;
    },
    get: function (property) {
        if (this.hasOwnProperty(property) || this.parent === null)
            return this[property];
        else
            return this.parent.get(property);
    },
    set: function (property, value) {
        this[property] = value;
        return this;
    },
    getCSS: function (css, inactive, inverse, alternative) {
        var font = this.get('font');
        css = font.toCss(css);
        css['color'] = inverse ? this.get('backColor') : alternative ? this.get('alternativeColor') : this.get('textColor');
        var transparent = this.get('transparent');
        css['background-color'] = transparent ? 'transparent' : inactive ? this.get('inactiveColor') : inverse ? this.get('textColor') : this.get('backColor');
        var bgGradient = this.get('bgGradient');
        if (bgGradient && !transparent)
            css['background-image'] = bgGradient.getCss();
        if (this.shadow === 1) {
            var delta = Math.max(1, Math.round(font.size / 10));
            var color = this.get('shadowColor');
            css['text-shadow'] = delta + 'px ' + delta + 'px 3px ' + color;
        }
        return css;
    },
    prepareText: function (ctx, text, maxWidth, maxHeight) {
        var result = [];
        var height = this.font.getHeight();
        var totalHeight = 0;
        var lines = text.trim().split('\n');
        ctx.font = this.font.cssFont();
        for (var l = 0; l < lines.length; l++) {
            var line = lines[l].trim();
            var width = ctx.measureText(line).width;
            if (width > maxWidth) {
                var lastOK = 0;
                var lastOKWidth = 0;
                for (var p = 0; p < line.length; p++) {
                    if (Utils.isSeparator(line[p])) {
                        var w = ctx.measureText(line.substr(0, p).trim()).width;
                        if (w > maxWidth)
                            break;
                        lastOK = p;
                        lastOKWidth = w;
                    }
                }
                if (lastOK > 0) {
                    lines.splice(l + 1, 0, line.substr(lastOK + 1).trim());
                    line = lines[l] = line.substr(0, lastOK).trim();
                    width = lastOKWidth;
                } else {
                    if (this.font.size > defaultValues.MIN_FONT_SIZE) {
                        this.font.setSize(this.font.size - 1);
                        this.flagFontReduced = true;
                        return this.prepareText(ctx, text, maxWidth, maxHeight);
                    }
                }
            }
            result.push({
                text: line,
                size: new AWT.Dimension(width, height)
            });
            totalHeight += height;
            if (totalHeight > maxHeight && this.font.size > defaultValues.MIN_FONT_SIZE) {
                this.font.setSize(this.font.size - 1);
                this.flagFontReduced = true;
                return this.prepareText(ctx, text, maxWidth, maxHeight);
            }
        }
        return result;
    }
};
BoxBase.prototype.defaultBoxBase = new BoxBase();
module.exports = BoxBase;
},{"../AWT":47,"../Utils":53,"jquery":5}],90:[function(require,module,exports){
var AWT = require('../AWT');
var BoxConnector = function (parent, ctx) {
    this.parent = parent;
    this.ctx = ctx;
    this.dim = new AWT.Dimension(ctx.canvas.width, ctx.canvas.height);
    this.origin = new AWT.Point();
    this.dest = new AWT.Point();
    this.relativePos = new AWT.Point();
};
var DEFAULT_COMPOSITE_OP = 'source-over';
BoxConnector.prototype = {
    constructor: BoxConnector,
    bgImg: null,
    bgRect: null,
    origin: null,
    dest: null,
    arrow: false,
    active: false,
    linePainted: false,
    arrowLength: 10,
    arrowAngle: Math.PI / 6,
    lineColor: 'black',
    xorColor: 'white',
    compositeOp: 'difference',
    DEFAULT_COMPOSITE_OP: DEFAULT_COMPOSITE_OP,
    relativePos: null,
    bx: null,
    ctx: null,
    dim: null,
    parent: null,
    lineWidth: 1.5,
    moveBy: function (dx, dy) {
        this.moveTo(AWT.Point(this.dest.x + dx, this.dest.y + dy));
    },
    moveTo: function (pt, forcePaint) {
        if (!this.active || !forcePaint && this.dest.equals(pt))
            return;
        if (this.bgRect && this.bgImg) {
            this.ctx.putImageData(this.bgImg, 0, 0, this.bgRect.pos.x, this.bgRect.pos.y, this.bgRect.dim.width, this.bgRect.dim.height);
        }
        this.dest.moveTo(pt);
        var pt1 = new AWT.Point(this.origin.x - this.relativePos.x, this.origin.y - this.relativePos.y);
        this.bgRect = new AWT.Rectangle(pt1, this.bx ? this.bx.dim : new AWT.Dimension());
        var pt2 = new AWT.Point(pt.x - this.relativePos.x, pt.y - this.relativePos.y);
        this.bgRect.add(new AWT.Rectangle(pt2, this.bx ? this.bx.dim : new AWT.Dimension()));
        this.bgRect.grow(10, 10);
        if (this.bx !== null) {
            this.bx.moveTo(new AWT.Point(pt.x - this.relativePos.x, pt.y - this.relativePos.y));
            this.bx.setTemporaryHidden(false);
            this.bx.update(this.ctx, null);
            this.bx.setTemporaryHidden(true);
        } else {
            this.drawLine();
            this.linePainted = true;
        }
    },
    begin: function (pt, box) {
        if (this.active)
            this.end();
        this.origin.moveTo(pt);
        this.dest.moveTo(pt);
        this.linePainted = false;
        this.active = true;
        if (box) {
            this.bx = box;
            this.relativePos.moveTo(pt.x - box.pos.x, pt.y - box.pos.y);
            this.bx.setTemporaryHidden(true);
            this.linePainted = false;
            this.parent.invalidate().update();
        }
        this.bgImg = this.ctx.getImageData(0, 0, this.dim.width, this.dim.height);
        this.bgRect = null;
        if (box)
            this.moveTo(pt, true);
    },
    end: function () {
        if (!this.active)
            return;
        this.active = false;
        this.linePainted = false;
        this.bgRect = null;
        this.bgImg = null;
        if (this.bx) {
            this.bx.moveTo(this.origin.x - this.relativePos.x, this.origin.y - this.relativePos.y);
            this.bx.setTemporaryHidden(false);
            this.bx = null;
            this.relativePos.moveTo(0, 0);
        }
        this.ctx.clearRect(0, 0, this.dim.width, this.dim.height);
        this.parent.invalidate().update();
    },
    drawLine: function () {
        if (this.compositeOp !== DEFAULT_COMPOSITE_OP) {
            this.ctx.strokeStyle = this.xorColor;
            this.ctx.globalCompositeOperation = this.compositeOp;
        } else
            this.ctx.strokeStyle = this.lineColor;
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.beginPath();
        this.ctx.moveTo(this.origin.x, this.origin.y);
        this.ctx.lineTo(this.dest.x, this.dest.y);
        this.ctx.stroke();
        if (this.arrow) {
            var beta = Math.atan2(this.origin.x - this.dest.x, this.dest.x - this.origin.x);
            var arp = new AWT.Point(this.dest.x - this.arrowLength * Math.cos(beta + this.arrowAngle), this.dest.y + this.arrowLength * Math.sin(beta + this.arrowAngle));
            this.ctx.beginPath();
            this.ctx.moveTo(this.dest.x, this.dest.y);
            this.ctx.lineTo(arp.x, arp.y);
            this.ctx.stroke();
            arp.moveTo(this.dest.x - this.arrowLength * Math.cos(beta - this.arrowAngle), this.dest.y + this.arrowLength * Math.sin(beta - this.arrowAngle));
            this.ctx.beginPath();
            this.ctx.moveTo(this.dest.x, this.dest.y);
            this.ctx.lineTo(arp.x, arp.y);
            this.ctx.stroke();
        }
        if (this.compositeOp !== DEFAULT_COMPOSITE_OP) {
            this.ctx.globalCompositeOperation = DEFAULT_COMPOSITE_OP;
        }
    }
};
module.exports = BoxConnector;
},{"../AWT":47}],91:[function(require,module,exports){
var $ = require('jquery'), AWT = require('../AWT'), Utils = require('../Utils'), AbstractBox = require('./AbstractBox'), TextGridContent = require('./TextGridContent');
var TextGrid = function (parent, container, boxBase, x, y, ncw, nch, cellW, cellH, border) {
    AbstractBox.call(this, parent, container, boxBase);
    var thisTG = this;
    this.pos.x = x;
    this.pos.y = y;
    this.nCols = Math.max(1, ncw);
    this.nRows = Math.max(1, nch);
    this.cellWidth = Math.max(cellW, this.defaults.MIN_CELL_SIZE);
    this.cellHeight = Math.max(cellH, this.defaults.MIN_CELL_SIZE);
    this.dim.width = cellW * this.nCols;
    this.dim.height = cellH * this.nRows;
    this.setChars(' ');
    this.preferredBounds = new AWT.Rectangle(this.pos, this.dim);
    this.setBorder(border);
    this.cursorTimer = new AWT.Timer(function () {
        thisTG.blink(0);
    }, 500, false);
    this.cursorEnabled = false;
    this.useCursor = false;
    this.wildTransparent = false;
    this.cursor = new AWT.Point();
};
TextGrid.createEmptyGrid = function (parent, container, x, y, tgc, wildTransparent) {
    var result = new TextGrid(parent, container, tgc.bb, x, y, tgc.ncw, tgc.nch, tgc.w, tgc.h, tgc.border);
    result.wild = tgc.wild;
    result.randomChars = tgc.randomChars;
    result.wildTransparent = wildTransparent;
    return result;
};
TextGrid.prototype = {
    constructor: TextGrid,
    nRows: 1,
    nCols: 1,
    chars: null,
    answers: null,
    attributes: null,
    cellWidth: 20,
    cellHeight: 20,
    preferredBounds: null,
    wild: TextGridContent.prototype.wild,
    randomChars: TextGridContent.prototype.randomChars,
    cursorEnabled: false,
    useCursor: false,
    cursor: null,
    cursorBlink: false,
    cursorTimer: null,
    wildTransparent: false,
    defaults: {
        MIN_CELL_SIZE: 12,
        DEFAULT_CELL_SIZE: 20,
        MIN_INTERNAL_MARGIN: 2
    },
    flags: {
        NORMAL: 0,
        INVERTED: 1,
        HIDDEN: 2,
        LOCKED: 4,
        MARKED: 8,
        TRANSPARENT: 16
    },
    setChars: function (text) {
        this.chars = [];
        this.answers = [];
        this.attributes = [];
        for (var py = 0; py < this.nRows; py++) {
            var line = py < text.length ? text[py] : '';
            this.chars[py] = line.split('');
            this.answers[py] = [];
            this.attributes[py] = [];
            for (var px = 0; px < this.nCols; px++) {
                if (px >= line.length)
                    this.chars[py][px] = ' ';
                this.answers[py][px] = this.chars[py][px];
                this.attributes[py][px] = this.flags.NORMAL;
            }
        }
    },
    randomize: function () {
        for (var py = 0; py < this.nRows; py++)
            for (var px = 0; px < this.nCols; px++)
                if (this.chars[py][px] === this.wild)
                    this.chars[py][px] = this.randomChars.charAt(Math.floor(Math.random() * this.randomChars.length));
    },
    setCellAttributes: function (lockWild, clearChars) {
        var atr = this.flags.LOCKED;
        if (this.wildTransparent)
            atr |= this.flags.TRANSPARENT;
        else
            atr |= this.flags.INVERTED | this.flags.HIDDEN;
        for (var py = 0; py < this.nRows; py++) {
            for (var px = 0; px < this.nCols; px++) {
                if (lockWild && this.chars[py][px] === this.wild)
                    this.attributes[py][px] = atr;
                else {
                    this.attributes[py][px] = this.flags.NORMAL;
                    if (clearChars)
                        this.chars[py][px] = ' ';
                }
            }
        }
    },
    setCellLocked: function (px, py, locked) {
        if (px >= 0 && px < this.nCols && py >= 0 && py < this.nRows) {
            this.attributes[py][px] = locked ? this.flags.LOCKED | (this.wildTransparent ? this.flags.TRANSPARENT : this.flags.INVERTED | this.flags.HIDDEN) : this.flags.NORMAL;
        }
    },
    getItemFor: function (rx, ry) {
        if (!this.isValidCell(rx, ry))
            return null;
        var point = new AWT.Point(), inBlack = false, startCount = false, px, py;
        for (px = 0; px < rx; px++) {
            if ((this.attributes[ry][px] & this.flags.LOCKED) !== 0) {
                if (!inBlack) {
                    if (startCount)
                        point.x++;
                    inBlack = true;
                }
            } else {
                startCount = true;
                inBlack = false;
            }
        }
        inBlack = false;
        startCount = false;
        for (py = 0; py < ry; py++) {
            if ((this.attributes[py][rx] & this.flags.LOCKED) !== 0) {
                if (!inBlack) {
                    if (startCount)
                        point.y++;
                    inBlack = true;
                }
            } else {
                startCount = true;
                inBlack = false;
            }
        }
        return point;
    },
    setCursorEnabled: function (status) {
        this.cursorEnabled = status;
        if (status === true)
            this.startCursorBlink();
        else
            this.stopCursorBlink();
    },
    startCursorBlink: function () {
        if (this.useCursor && this.cursorEnabled && this.cursorTimer && !this.cursorTimer.isRunning()) {
            this.blink(1);
            this.cursorTimer.start();
        }
    },
    stopCursorBlink: function () {
        if (this.cursorTimer && this.cursorTimer.isRunning()) {
            this.cursorTimer.stop();
            this.blink(-1);
        }
    },
    moveCursor: function (dx, dy, skipLocked) {
        if (this.useCursor) {
            var point = this.findNextCellWithAttr(this.cursor.x, this.cursor.y, skipLocked ? this.flags.LOCKED : this.flags.NORMAL, dx, dy, false);
            if (!this.cursor.equals(point))
                this.setCursorAt(point.x, point.y, skipLocked);
        }
    },
    findFreeCell: function (from, dx, dy) {
        var result = null;
        if (from && (dx !== 0 || dy !== 0)) {
            var scan = new AWT.Point(from);
            while (result === null) {
                scan.x += dx;
                scan.y += dy;
                if (scan.x < 0 || scan.x >= this.nCols || scan.y < 0 || scan.y >= this.nRows)
                    break;
                if (!this.getCellAttribute(scan.x, scan.y, this.flags.LOCKED))
                    result = scan;
            }
        }
        return result;
    },
    findNextCellWithAttr: function (startX, startY, attr, dx, dy, attrState) {
        var point = new AWT.Point(startX + dx, startY + dy);
        while (true) {
            if (point.x < 0) {
                point.x = this.nCols - 1;
                if (point.y > 0)
                    point.y--;
                else
                    point.y = this.nRows - 1;
            } else if (point.x >= this.nCols) {
                point.x = 0;
                if (point.y < this.nRows - 1)
                    point.y++;
                else
                    point.y = 0;
            }
            if (point.y < 0) {
                point.y = this.nRows - 1;
                if (point.x > 0)
                    point.x--;
                else
                    point.x = this.nCols - 1;
            } else if (point.y >= this.nRows) {
                point.y = 0;
                if (point.x < this.nCols - 1)
                    point.x++;
                else
                    point.x = 0;
            }
            if (point.x === startX && point.y === startY || this.getCellAttribute(point.x, point.y, attr) === attrState)
                break;
            point.x += dx;
            point.y += dy;
        }
        return point;
    },
    setCursorAt: function (px, py, skipLocked) {
        this.stopCursorBlink();
        if (this.isValidCell(px, py)) {
            this.cursor.x = px;
            this.cursor.y = py;
            this.useCursor = true;
            if (skipLocked && this.getCellAttribute(px, py, this.flags.LOCKED)) {
                this.moveCursor(1, 0, skipLocked);
            } else {
                if (this.cursorEnabled)
                    this.startCursorBlink();
            }
        }
    },
    setUseCursor: function (value) {
        this.useCursor = value;
    },
    getCursor: function () {
        return this.cursor;
    },
    countCharsLike: function (ch) {
        var result = 0, px, py;
        for (py = 0; py < this.nRows; py++)
            for (px = 0; px < this.nCols; px++)
                if (this.chars[py][px] === ch)
                    result++;
        return result;
    },
    getNumCells: function () {
        return this.nRows * this.nCols;
    },
    countCoincidences: function (checkCase) {
        var result = 0, px, py;
        if (this.answers)
            for (py = 0; py < this.nRows; py++)
                for (px = 0; px < this.nCols; px++)
                    if (this.isCellOk(px, py, checkCase))
                        result++;
        return result;
    },
    isCellOk: function (px, py, checkCase) {
        var result = false, ch, ch2;
        if (this.isValidCell(px, py)) {
            ch = this.chars[py][px];
            if (ch !== this.wild) {
                ch2 = this.answers[py][px];
                if (ch === ch2 || !checkCase && ch.toUpperCase() === ch2.toUpperCase())
                    result = true;
            }
        }
        return result;
    },
    getLogicalCoords: function (devicePoint) {
        if (!this.contains(devicePoint))
            return null;
        var px = Math.floor((devicePoint.x - this.pos.x) / this.cellWidth), py = Math.floor((devicePoint.y - this.pos.y) / this.cellHeight);
        if (this.isValidCell(px, py)) {
            return new AWT.Point(px, py);
        } else
            return null;
    },
    isValidCell: function (px, py) {
        return px < this.nCols && py < this.nRows && px >= 0 && py >= 0;
    },
    setCharAt: function (px, py, ch) {
        if (this.isValidCell(px, py)) {
            this.chars[py][px] = ch;
            this.repaintCell(px, py);
        }
    },
    getCharAt: function (px, py) {
        if (this.isValidCell(px, py))
            return this.chars[py][px];
        else
            return ' ';
    },
    getStringBetween: function (x0, y0, x1, y1) {
        var sb = '', i, dx, dy, steps;
        if (this.isValidCell(x0, y0) && this.isValidCell(x1, y1)) {
            dx = x1 - x0;
            dy = y1 - y0;
            if (dx === 0 || dy === 0 || Math.abs(dx) === Math.abs(dy)) {
                steps = Math.max(Math.abs(dx), Math.abs(dy));
                if (steps > 0) {
                    dx /= steps;
                    dy /= steps;
                }
                for (i = 0; i <= steps; i++)
                    sb += this.getCharAt(x0 + dx * i, y0 + dy * i);
            }
        }
        return sb;
    },
    setAttributeBetween: function (x0, y0, x1, y1, attribute, value) {
        if (this.isValidCell(x0, y0) && this.isValidCell(x1, y1)) {
            var dx = x1 - x0, dy = y1 - y0;
            if (dx === 0 || dy === 0 || Math.abs(dx) === Math.abs(dy)) {
                var steps = Math.max(Math.abs(dx), Math.abs(dy));
                if (steps > 0) {
                    dx /= steps;
                    dy /= steps;
                }
                for (var i = 0; i <= steps; i++)
                    this.setAttribute(x0 + dx * i, y0 + dy * i, attribute, value);
            }
        }
    },
    setAttribute: function (px, py, attribute, state) {
        if (this.isValidCell(px, py)) {
            if (this.attribute === this.flags.MARKED && !state)
                this.repaintCell(px, py);
            this.attributes[py][px] &= ~attribute;
            this.attributes[py][px] |= state ? attribute : 0;
            if (attribute !== this.flags.MARKED || state)
                this.repaintCell(px, py);
        }
    },
    setAllCellsAttribute: function (attribute, state) {
        for (var py = 0; py < this.nRows; py++)
            for (var px = 0; px < this.nCols; px++)
                this.setAttribute(px, py, attribute, state);
    },
    getCellAttribute: function (px, py, attribute) {
        if (this.isValidCell(px, py))
            return (this.attributes[py][px] & attribute) !== 0;
        else
            return false;
    },
    getCellRect: function (px, py) {
        return new AWT.Rectangle(this.pos.x + px * this.cellWidth, this.pos.y + py * this.cellHeight, this.cellWidth, this.cellHeight);
    },
    getCellBorderBounds: function (px, py) {
        var isMarked = this.getCellAttribute(px, py, this.flags.MARKED);
        if (!this.border && !isMarked)
            return this.getCellRect(px, py);
        var bb = this.getBoxBaseResolve(), strk = isMarked ? bb.markerStroke : bb.borderStroke;
        return this.getCellRect(px, py).grow(strk.lineWidth, strk.lineWidth);
    },
    repaintCell: function (px, py) {
        if (this.container) {
            this.container.invalidate(this.getCellBorderBounds(px, py)).update();
        }
    },
    getPreferredSize: function () {
        return this.preferredBounds.dim;
    },
    getMinimumSize: function () {
        return new AWT.Dimension(this.defaults.MIN_CELL_SIZE * this.nCols, this.defaults.MIN_CELL_SIZE * this.nRows);
    },
    getScaledSize: function (scale) {
        return new AWT.Dimension(Utils.roundTo(scale * this.preferredBounds.dim.width, this.nCols), Utils.roundTo(scale * this.preferredBounds.dim.height, this.nRows));
    },
    setBounds: function (rect, y, w, h) {
        AbstractBox.prototype.setBounds.call(this, rect, y, w, h);
        this.cellWidth = this.dim.width / this.nCols;
        this.cellHeight = this.dim.height / this.nRows;
    },
    updateContent: function (ctx, dirtyRegion) {
        var bb = this.getBoxBaseResolve();
        ctx.font = bb.font.cssFont();
        ctx.textBaseline = 'hanging';
        bb.prepareText(ctx, 'W', this.cellWidth - 2 * this.defaults.MIN_INTERNAL_MARGIN, this.cellHeight - 2 * this.defaults.MIN_INTERNAL_MARGIN);
        var ch = [], attr, isMarked, isInverted, isCursor, boxBounds, dx, dy, px, py, ry, bxr;
        ry = (this.cellHeight - bb.font.getHeight()) / 2;
        for (py = 0; py < this.nRows; py++) {
            for (px = 0; px < this.nCols; px++) {
                bxr = this.getCellBorderBounds(px, py);
                if (bxr.intersects(dirtyRegion)) {
                    attr = this.attributes[py][px];
                    if ((attr & this.flags.TRANSPARENT) === 0) {
                        isInverted = (attr & this.flags.INVERTED) !== 0;
                        isMarked = (attr & this.flags.MARKED) !== 0;
                        isCursor = this.useCursor && this.cursor.x === px && this.cursor.y === py;
                        boxBounds = this.getCellRect(px, py);
                        ctx.fillStyle = isCursor && this.cursorBlink ? bb.inactiveColor : isInverted ? bb.textColor : bb.backColor;
                        boxBounds.fill(ctx);
                        ctx.strokeStyle = 'black';
                        if ((attr & this.flags.HIDDEN) === 0) {
                            ch[0] = this.chars[py][px];
                            if (ch[0]) {
                                dx = boxBounds.pos.x + (this.cellWidth - ctx.measureText(ch[0]).width) / 2;
                                dy = boxBounds.pos.y + ry;
                                if (bb.shadow) {
                                    var d = Math.max(1, bb.font.size / 10);
                                    ctx.fillStyle = bb.shadowColor;
                                    ctx.fillText(ch[0], dx + d, dy + d);
                                }
                                ctx.fillStyle = isInverted ? bb.backColor : this.isAlternative() ? bb.alternativeColor : bb.textColor;
                                ctx.fillText(ch[0], dx, dy);
                            }
                        }
                        if (this.border || isMarked) {
                            ctx.strokeStyle = bb.borderColor;
                            bb[isMarked ? 'markerStroke' : 'borderStroke'].setStroke(ctx);
                            if (isMarked)
                                ctx.globalCompositeOperation = 'xor';
                            boxBounds.stroke(ctx);
                            if (isMarked)
                                ctx.globalCompositeOperation = 'source-over';
                        }
                        ctx.strokeStyle = 'black';
                        AWT.Stroke.prototype.setStroke(ctx);
                    }
                }
            }
        }
        return true;
    },
    blink: function (status) {
        if (this.useCursor) {
            this.cursorBlink = status === 1 ? true : status === -1 ? false : !this.cursorBlink;
            this.repaintCell(this.cursor.x, this.cursor.y);
        }
    },
    end: function () {
        if (this.cursorTimer) {
            this.cursorTimer.stop();
            this.cursorTimer = null;
        }
    }
};
TextGrid.prototype = $.extend(Object.create(AbstractBox.prototype), TextGrid.prototype);
module.exports = TextGrid;
},{"../AWT":47,"../Utils":53,"./AbstractBox":82,"./TextGridContent":92,"jquery":5}],92:[function(require,module,exports){
var $ = require('jquery'), Utils = require('../Utils'), BoxBase = require('./BoxBase');
var TextGridContent = function () {
    this.bb = new BoxBase(null);
    this.text = [];
};
TextGridContent.prototype = {
    constructor: TextGridContent,
    ncw: 1,
    nch: 1,
    w: 20,
    h: 20,
    border: false,
    bb: null,
    text: null,
    wild: '*',
    randomChars: Utils.settings.RANDOM_CHARS,
    setProperties: function ($xml) {
        var textGrid = this;
        $.each($xml.get(0).attributes, function () {
            var name = this.name;
            var val = this.value;
            switch (name) {
            case 'rows':
                textGrid.ncw = Number(val);
                break;
            case 'columns':
                textGrid.nch = Number(val);
                break;
            case 'cellWidth':
                textGrid.w = Number(val);
                break;
            case 'cellHeight':
                textGrid.h = Number(val);
                break;
            case 'border':
                textGrid.border = Utils.getBoolean(val);
                break;
            case 'wild':
            case 'randomChars':
                textGrid[name] = val;
                break;
            }
        });
        $xml.children('style:first').each(function () {
            textGrid.bb = new BoxBase().setProperties($(this));
        });
        $xml.find('text:first > row').each(function () {
            textGrid.text.push(this.textContent);
        });
        for (var i = textGrid.text.length; i < textGrid.nch; i++)
            textGrid.text[i] = '';
        return this;
    },
    countWildChars: function () {
        var result = 0;
        if (this.text)
            for (var y = 0; y < this.nch; y++)
                for (var x = 0; x < this.ncw; x++)
                    if (this.text[y].charAt(x) === this.wild)
                        result++;
        return result;
    },
    getNumChars: function () {
        return this.ncw * this.nch;
    },
    setCharAt: function (x, y, ch) {
        if (x >= 0 && x < this.ncw && y >= 0 && y < this.nch)
            this.text[y] = this.text[y].substring(0, x) + ch + this.text[y].substring(x + 1);
    }
};
module.exports = TextGridContent;
},{"../Utils":53,"./BoxBase":89,"jquery":5}],93:[function(require,module,exports){
var ActiveMediaPlayer = require('./ActiveMediaPlayer'), Utils = require('../Utils');
var ActiveMediaBag = function () {
    this.players = [];
};
ActiveMediaBag.prototype = {
    constructor: ActiveMediaBag,
    players: [],
    createActiveMediaPlayer: function (mc, mb, ps) {
        var amp = null;
        switch (mc.mediaType) {
        case 'RECORD_AUDIO':
            if (mc.length <= 0 || mc.length >= Utils.settings.MAX_RECORD_LENGTH)
                break;
        case 'PLAY_RECORDED_AUDIO':
            if (mc.recBuffer < 0 || mc.recBuffer >= 10)
                break;
        case 'PLAY_AUDIO':
        case 'PLAY_MIDI':
        case 'PLAY_VIDEO':
            amp = new ActiveMediaPlayer(mc, mb, ps);
            break;
        }
        if (amp !== null)
            this.players.push(amp);
        return amp;
    },
    getActiveMediaPlayer: function (mc, mb, ps) {
        var amp = null;
        for (var i = 0; i < this.players.length; i++) {
            amp = this.players[i];
            if (amp.mc === mc || amp.mc.isEquivalent(mc))
                break;
            amp = null;
        }
        if (amp === null)
            amp = this.createActiveMediaPlayer(mc, mb, ps);
        return amp;
    },
    removeActiveMediaPlayer: function (mc) {
        var amp = null;
        var i;
        for (i = 0; i < this.players.length; i++) {
            amp = this.players[i];
            if (amp.mc === mc)
                break;
            amp = null;
        }
        if (amp !== null) {
            amp.clear();
            this.players.splice(i, 1);
        }
    },
    realizeAll: function () {
        for (var i = 0; i < this.players.length; i++)
            this.players[i].realize();
    },
    stopAll: function (level) {
        if (typeof level === 'undefined')
            level = -1;
        for (var i = 0; i < this.players.length; i++) {
            var amp = this.players[i];
            if (level === -1 || amp.mc !== null && amp.mc.level <= level)
                amp.stop();
        }
    },
    removeAll: function () {
        for (var i = 0; i < this.players.length; i++)
            this.players[i].clear();
        this.players.length = 0;
        ActiveMediaPlayer.prototype.clearAllAudioBuffers();
    }
};
module.exports = ActiveMediaBag;
},{"../Utils":53,"./ActiveMediaPlayer":94}],94:[function(require,module,exports){
var $ = require('jquery'), AWT = require('../AWT');
var ActiveMediaPlayer = function (mc, mb, ps) {
    this.mc = mc;
    this.ps = ps;
    switch (mc.mediaType) {
    case 'RECORD_AUDIO':
        this.clearAudioBuffer(mc.recBuffer);
        ActiveMediaPlayer.AUDIO_BUFFERS[mc.recBuffer] = this.createAudioBuffer(mc.length);
    case 'PLAY_RECORDED_AUDIO':
        this.useAudioBuffer = true;
        break;
    case 'PLAY_AUDIO':
    case 'PLAY_VIDEO':
        var fn = mc.mediaFileName;
        this.mbe = mb.getElement(fn, true);
        break;
    case 'PLAY_MIDI':
        break;
    default:
        break;
    }
};
ActiveMediaPlayer.AUDIO_BUFFERS = [];
ActiveMediaPlayer.prototype = {
    constructor: ActiveMediaPlayer,
    mc: null,
    ps: null,
    bx: null,
    $visualComponent: null,
    useAudioBuffer: false,
    mbe: null,
    createAudioBuffer: function (seconds) {
    },
    realize: function () {
        if (this.mbe) {
            this.mbe.build(function () {
                this.data.trigger('pause');
            });
        }
    },
    playNow: function (setBx) {
        if (this.mbe) {
            var thisMP = this;
            this.mbe.build(function () {
                var armed = false;
                this.data.off();
                if (thisMP.mc.to > 0) {
                    this.data.on('timeupdate', function () {
                        if (armed && this.currentTime >= thisMP.mc.to / 1000) {
                            $(this).off('timeupdate');
                            this.pause();
                        }
                    });
                }
                var t = thisMP.mc.from > 0 ? thisMP.mc.from / 1000 : 0;
                if (this.data[0].readyState >= 4) {
                    armed = true;
                    this.data[0].pause();
                    this.data[0].currentTime = t;
                    this.data[0].play();
                } else {
                    this.data[0].load();
                    this.data.on('canplaythrough', function () {
                        $(this).off('canplaythrough');
                        armed = true;
                        this.pause();
                        this.currentTime = t;
                        this.play();
                    });
                }
            });
        }
    },
    play: function (setBx) {
        this.stopAllAudioBuffers();
        this.playNow(setBx);
    },
    stop: function () {
        if (this.useAudioBuffer)
            this.stopAudioBuffer(this.mc.recBuffer);
        else if (this.mbe && this.mbe.data && this.mbe.data.length > 0 && this.mbe.data[0].paused === false) {
            this.mbe.data[0].pause();
        }
    },
    clear: function () {
        this.stop();
        if (this.useAudioBuffer)
            this.clearAudioBuffer(this.mc.recBuffer);
    },
    clearAudioBuffer: function (buffer) {
        if (buffer >= 0 && buffer < ActiveMediaPlayer.AUDIO_BUFFERS.length && ActiveMediaPlayer.AUDIO_BUFFERS[buffer] !== null) {
            ActiveMediaPlayer.AUDIO_BUFFERS[buffer].clear();
            ActiveMediaPlayer.AUDIO_BUFFERS[buffer] = null;
        }
    },
    clearAllAudioBuffers: function () {
        for (var i = 0; i < ActiveMediaPlayer.AUDIO_BUFFERS.length; i++)
            this.clearAudioBuffer(i);
    },
    countActiveBuffers: function () {
        var c = 0;
        for (var i = 0; i < ActiveMediaPlayer.AUDIO_BUFFERS.length; i++)
            if (ActiveMediaPlayer.AUDIO_BUFFERS[i])
                c++;
        return c;
    },
    stopAllAudioBuffers: function () {
        for (var i = 0; i < ActiveMediaPlayer.AUDIO_BUFFERS.length; i++)
            if (ActiveMediaPlayer.AUDIO_BUFFERS[i])
                ActiveMediaPlayer.AUDIO_BUFFERS[i].stop();
    },
    stopAudioBuffer: function (buffer) {
        if (buffer >= 0 && buffer < ActiveMediaPlayer.AUDIO_BUFFERS.length && ActiveMediaPlayer.AUDIO_BUFFERS[buffer] !== null)
            ActiveMediaPlayer.AUDIO_BUFFERS[buffer].stop();
    },
    checkVisualComponentBounds: function (bxi) {
    },
    setVisualComponentVisible: function (state) {
    },
    linkTo: function (setBx) {
    }
};
module.exports = ActiveMediaPlayer;
},{"../AWT":47,"jquery":5}],95:[function(require,module,exports){
var $ = require('jquery'), EventSoundsElement = require('./EventSoundsElement'), Utils = require('../Utils');
var EventSounds = function (parent) {
    this.parent = parent;
    this.elements = [];
};
EventSounds.prototype = {
    constructor: EventSounds,
    eventSoundsParent: null,
    elements: null,
    enabled: Utils.DEFAULT,
    globalEnabled: true,
    setProperties: function ($xml) {
        var elements = this.elements;
        $xml.children().each(function () {
            elements[this.nodeName] = new EventSoundsElement(this.nodeName);
            elements[this.nodeName].setProperties($(this));
        });
        return this;
    },
    defaultEventSounds: null,
    realize: function (mediaBag) {
    },
    play: function (eventName) {
    }
};
EventSounds.prototype.defaultEventSounds = new EventSounds(null);
module.exports = EventSounds;
},{"../Utils":53,"./EventSoundsElement":96,"jquery":5}],96:[function(require,module,exports){
var Utils = require('../Utils');
var EventSoundsElement = function (id) {
    this.id = id;
};
EventSoundsElement.prototype = {
    constructor: EventSoundsElement,
    fileName: null,
    enabled: Utils.DEFAULT,
    setProperties: function ($xml) {
        this.fileName = $xml.attr('file');
        this.enabled = Utils.getTriState($xml.attr('enabled'));
        return this;
    }
};
module.exports = EventSoundsElement;
},{"../Utils":53}],97:[function(require,module,exports){
var $ = require('jquery'), AWT = require('../AWT'), Utils = require('../Utils');
var MediaContent = function (type) {
    this.mediaType = type;
};
MediaContent.prototype = {
    constructor: MediaContent,
    mediaType: 'UNKNOWN',
    level: 1,
    mediaFileName: null,
    externalParam: null,
    from: -1,
    to: -1,
    length: 3,
    recBuffer: 0,
    stretch: false,
    free: false,
    absLocation: null,
    absLocationFrom: null,
    catchMouseEvents: false,
    loop: false,
    autoStart: false,
    setProperties: function ($xml) {
        var media = this;
        $.each($xml.get(0).attributes, function () {
            var name = this.name;
            var val = this.value;
            switch (name) {
            case 'type':
                media['mediaType'] = val;
                break;
            case 'file':
                media['mediaFileName'] = val;
                break;
            case 'params':
                media['externalParam'] = val;
                break;
            case 'pFrom':
                media['absLocationFrom'] = val;
                break;
            case 'buffer':
                media['recBuffer'] = Number(val);
                break;
            case 'level':
            case 'from':
            case 'to':
            case 'length':
                media[name] = Number(val);
                break;
            case 'px':
            case 'py':
                if (media.absLocation === null)
                    media.absLocation = new AWT.Point(0, 0);
                if (name === 'px')
                    media.absLocation.x = Number(val);
                else
                    media.absLocation.y = Number(val);
                break;
            case 'stretch':
            case 'free':
            case 'catchMouseEvents':
            case 'loop':
            case 'autostart':
                media[name] = Utils.getBoolean(val);
                break;
            }
        });
        return this;
    },
    isEquivalent: function (mc) {
        return this.mediaType === mc.mediaType && this.mediaFileName.toLocaleLowerCase() === mc.mediaFileName.toLocaleLowerCase() && this.from === mc.from && this.to === mc.to && this.recBuffer === mc.recBuffer;
    },
    getDescription: function () {
        var result = '';
        result += this.mediaType;
        if (this.mediaFileName) {
            result += ' ' + this.mediaFileName;
            if (this.from >= 0)
                result += ' from:' + this.from;
            if (this.to >= 0)
                result += ' to:' + this.to;
        } else if (this.externalParam) {
            result += ' ' + this.externalParam;
        }
        return result;
    },
    getIcon: function () {
        var icon = null;
        switch (this.mediaType) {
        case 'PLAY_AUDIO':
        case 'PLAY_RECORDED_AUDIO':
            icon = 'audio';
            break;
        case 'RECORD_AUDIO':
            icon = 'mic';
            break;
        case 'PLAY_VIDEO':
            icon = 'movie';
            break;
        case 'PLAY_MIDI':
            icon = 'music';
            break;
        default:
            icon = 'default';
            break;
        }
        return icon ? MediaContent.icoImg[icon] : null;
    }
};
MediaContent.icoData = {
    default: 'data:image/svg+xml;base64,' + 'PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIGhlaWdodD0iNDgiIHZp' + 'ZXdCb3g9IjAgMCA0OCA0OCIgd2lkdGg9IjQ4IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAw' + 'MC9zdmciPjxwYXRoIGQ9Ik0yOC44IDEyTDI4IDhIMTB2MzRoNFYyOGgxMS4ybC44IDRoMTRWMTJ6' + 'Ij48L3BhdGg+PC9zdmc+Cg==',
    audio: 'data:image/svg+xml;base64,' + 'PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIGZpbGw9IiMwMDAwMDAi' + 'IGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjQ4IiB4bWxucz0iaHR0cDov' + 'L3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0zIDl2Nmg0bDUgNVY0TDcgOUgzem0xMy41' + 'IDNjMC0xLjc3LTEuMDItMy4yOS0yLjUtNC4wM3Y4LjA1YzEuNDgtLjczIDIuNS0yLjI1IDIuNS00' + 'LjAyek0xNCAzLjIzdjIuMDZjMi44OS44NiA1IDMuNTQgNSA2Ljcxcy0yLjExIDUuODUtNSA2Ljcx' + 'djIuMDZjNC4wMS0uOTEgNy00LjQ5IDctOC43N3MtMi45OS03Ljg2LTctOC43N3oiPjwvcGF0aD48' + 'cGF0aCBkPSJNMCAwaDI0djI0SDB6IiBmaWxsPSJub25lIj48L3BhdGg+PC9zdmc+Cg==',
    movie: 'data:image/svg+xml;base64,' + 'PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIGZpbGw9IiMwMDAwMDAi' + 'IGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjQ4IiB4bWxucz0iaHR0cDov' + 'L3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0xOCA0bDIgNGgtM2wtMi00aC0ybDIgNGgt' + 'M2wtMi00SDhsMiA0SDdMNSA0SDRjLTEuMSAwLTEuOTkuOS0xLjk5IDJMMiAxOGMwIDEuMS45IDIg' + 'MiAyaDE2YzEuMSAwIDItLjkgMi0yVjRoLTR6Ij48L3BhdGg+PHBhdGggZD0iTTAgMGgyNHYyNEgw' + 'eiIgZmlsbD0ibm9uZSI+PC9wYXRoPjwvc3ZnPgo=',
    mic: 'data:image/svg+xml;base64,' + 'PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIGZpbGw9IiMwMDAwMDAi' + 'IGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjQ4IiB4bWxucz0iaHR0cDov' + 'L3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0xMiAxNGMxLjY2IDAgMi45OS0xLjM0IDIu' + 'OTktM0wxNSA1YzAtMS42Ni0xLjM0LTMtMy0zUzkgMy4zNCA5IDV2NmMwIDEuNjYgMS4zNCAzIDMg' + 'M3ptNS4zLTNjMCAzLTIuNTQgNS4xLTUuMyA1LjFTNi43IDE0IDYuNyAxMUg1YzAgMy40MSAyLjcy' + 'IDYuMjMgNiA2LjcyVjIxaDJ2LTMuMjhjMy4yOC0uNDggNi0zLjMgNi02LjcyaC0xLjd6Ij48L3Bh' + 'dGg+PHBhdGggZD0iTTAgMGgyNHYyNEgweiIgZmlsbD0ibm9uZSI+PC9wYXRoPjwvc3ZnPgo=',
    music: 'data:image/svg+xml;base64,' + 'PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIGZpbGw9IiMwMDAwMDAi' + 'IGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjQ4IiB4bWxucz0iaHR0cDov' + 'L3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUi' + 'PjwvcGF0aD48cGF0aCBkPSJNMTIgM3YxMC41NWMtLjU5LS4zNC0xLjI3LS41NS0yLS41NS0yLjIx' + 'IDAtNCAxLjc5LTQgNHMxLjc5IDQgNCA0IDQtMS43OSA0LTRWN2g0VjNoLTZ6Ij48L3BhdGg+PC9z' + 'dmc+Cg=='
};
MediaContent.icoImg = {};
$.each(MediaContent.icoData, function (key, value) {
    var img = new Image();
    MediaContent.icoImg[key] = img;
    $(img).attr('src', value);
    $(img).load();
});
module.exports = MediaContent;
},{"../AWT":47,"../Utils":53,"jquery":5}],98:[function(require,module,exports){
var $ = require('jquery'), ProjectSettings = require('./ProjectSettings'), ActivitySequence = require('../bags/ActivitySequence'), MediaBag = require('../bags/MediaBag'), Activity = require('../Activity'), Utils = require('../Utils');
var JClicProject = function () {
    this.settings = new ProjectSettings(this);
    this.activitySequence = new ActivitySequence(this);
    this._activities = {};
    this.mediaBag = new MediaBag(this);
};
JClicProject.prototype = {
    constructor: JClicProject,
    name: 'unknown',
    version: '0.1.3',
    type: null,
    code: null,
    settings: null,
    activitySequence: null,
    _activities: null,
    mediaBag: null,
    skin: null,
    basePath: '',
    path: null,
    zip: null,
    setProperties: function ($xml, path, zip) {
        if (path) {
            this.path = path;
            if (path.file)
                this.basePath = path;
            else
                this.basePath = Utils.getBasePath(path);
        }
        this.zip = zip;
        this.name = $xml.attr('name');
        this.version = $xml.attr('version');
        this.type = $xml.attr('type');
        this.code = $xml.attr('code');
        this.settings.setProperties($xml.children('settings'));
        this.activitySequence.setProperties($xml.children('sequence'));
        this.mediaBag.setProperties($xml.children('mediaBag'));
        var prj = this;
        var $node = $xml.children('activities');
        var $acts = $node.children('activity');
        $acts.each(function () {
            prj._activities[$(this).attr('name')] = $(this);
        });
        return this;
    },
    getActivity: function (name) {
        return Activity.getActivity(this._activities[name], this);
    },
    realize: function (eventSoundsParent, ps) {
        if (this.skin === null && this.settings.skinFileName !== null && this.settings.skinFileName.length > 0)
            this.skin = this.mediaBag.getSkinElement(this.settings.skinFileName, ps);
        if (this.settings.eventSounds) {
            this.settings.eventSounds.setParent(eventSoundsParent);
            this.settings.eventSounds.realize(ps, this.mediaBag);
        }
        this.mediaBag.buildAll('font');
    },
    end: function () {
    }
};
module.exports = JClicProject;
},{"../Activity":48,"../Utils":53,"../bags/ActivitySequence":75,"../bags/MediaBag":80,"./ProjectSettings":99,"jquery":5}],99:[function(require,module,exports){
var $ = require('jquery'), EventSounds = require('../media/EventSounds');
var ProjectSettings = function (project) {
    this.project = project;
    this.languages = [];
};
ProjectSettings.prototype = {
    constructor: ProjectSettings,
    project: null,
    title: 'Untitled',
    description: '',
    languages: null,
    skinFileName: null,
    eventSounds: EventSounds.defaultEventSounds,
    setProperties: function ($xml) {
        var settings = this;
        $xml.children().each(function () {
            switch (this.nodeName) {
            case 'title':
                settings.title = this.textContent;
                break;
            case 'description':
                settings.description = this.textContent;
                break;
            case 'language':
                settings.languages.push(this.textContent);
                break;
            case 'eventSounds':
                settings.eventSounds = new EventSounds(EventSounds.defaultEventSounds);
                settings.eventSounds.setProperties($(this));
                break;
            case 'skin':
                settings.skinFileName = $(this).attr('file');
                break;
            }
        });
        return this;
    }
};
module.exports = ProjectSettings;
},{"../media/EventSounds":95,"jquery":5}],100:[function(require,module,exports){
var $ = require('jquery'), Shaper = require('./Shaper'), JigSaw = require('./JigSaw'), AWT = require('../AWT');
var ClassicJigSaw = function (nx, ny) {
    JigSaw.call(this, nx, ny);
};
ClassicJigSaw.prototype = {
    constructor: ClassicJigSaw,
    baseWidthFactor: 3 / 4,
    toothHeightFactor: 3 / 5,
    hLine: function (sd, type, x, y, w, h, inv) {
        var kx = inv ? -1 : 1;
        var ky = type === 1 ? 1 : -1;
        if (type === 0) {
            sd.addStroke(new AWT.PathStroke('L', [
                x + w * kx,
                y
            ]));
        } else {
            var x0 = x + (w - w * this.baseWidthFactor) / 2 * kx;
            var wb = w * (this.baseWidthFactor / 12) * kx;
            sd.addStroke(new AWT.PathStroke('L', [
                x0,
                y
            ]));
            var hb = h * this.toothHeightFactor * ky / 8;
            sd.addStroke(new AWT.PathStroke('B', [
                x0 + 4 * wb,
                y,
                x0 + 6 * wb,
                y - hb,
                x0 + 4 * wb,
                y - 3 * hb
            ]));
            sd.addStroke(new AWT.PathStroke('B', [
                x0 + 2 * wb,
                y - 5 * hb,
                x0 + 10 * wb,
                y - 5 * hb,
                x0 + 8 * wb,
                y - 3 * hb
            ]));
            sd.addStroke(new AWT.PathStroke('B', [
                x0 + 6 * wb,
                y - 1 * hb,
                x0 + 8 * wb,
                y,
                x0 + 12 * wb,
                y
            ]));
            sd.addStroke(new AWT.PathStroke('L', [
                x + w * kx,
                y
            ]));
        }
    },
    vLine: function (sd, type, x, y, w, h, inv) {
        var ky = inv ? -1 : 1;
        var kx = type === 1 ? 1 : -1;
        if (type === 0) {
            sd.addStroke(new AWT.PathStroke('L', [
                x,
                y + h * ky
            ]));
        } else {
            var y0 = y + (h - h * this.baseWidthFactor) / 2 * ky;
            var hb = h * this.baseWidthFactor / 12 * ky;
            sd.addStroke(new AWT.PathStroke('L', [
                x,
                y0
            ]));
            var wb = w * this.toothHeightFactor * kx / 8;
            sd.addStroke(new AWT.PathStroke('B', [
                x,
                y0 + 4 * hb,
                x - wb,
                y0 + 6 * hb,
                x - 3 * wb,
                y0 + 4 * hb
            ]));
            sd.addStroke(new AWT.PathStroke('B', [
                x - 5 * wb,
                y0 + 2 * hb,
                x - 5 * wb,
                y0 + 10 * hb,
                x - 3 * wb,
                y0 + 8 * hb
            ]));
            sd.addStroke(new AWT.PathStroke('B', [
                x - 1 * wb,
                y0 + 6 * hb,
                x,
                y0 + 8 * hb,
                x,
                y0 + 12 * hb
            ]));
            sd.addStroke(new AWT.PathStroke('L', [
                x,
                y + h * ky
            ]));
        }
    }
};
ClassicJigSaw.prototype = $.extend(Object.create(JigSaw.prototype), ClassicJigSaw.prototype);
Shaper.CLASSES['@ClassicJigSaw'] = ClassicJigSaw;
module.exports = ClassicJigSaw;
},{"../AWT":47,"./JigSaw":102,"./Shaper":104,"jquery":5}],101:[function(require,module,exports){
var $ = require('jquery'), Shaper = require('./Shaper');
var Holes = function (nx, ny) {
    Shaper.call(this, 1, 1);
    this.nCols = nx;
    this.nRows = ny;
    this.showEnclosure = true;
};
Holes.prototype = {
    constructor: Holes,
    buildShapes: function () {
        if (this.nCells > 0)
            this.initiated = true;
    },
    getEnclosingShapeData: function () {
        if (!this.showEnclosure)
            return null;
        return this.enclosing ? this.enclosing : Shaper.prototype.getEnclosingShapeData.call(this);
    }
};
Holes.prototype = $.extend(Object.create(Shaper.prototype), Holes.prototype);
Shaper.CLASSES['@Holes'] = Holes;
module.exports = Holes;
},{"./Shaper":104,"jquery":5}],102:[function(require,module,exports){
var $ = require('jquery'), Shaper = require('./Shaper'), AWT = require('../AWT');
var JigSaw = function (nx, ny) {
    Shaper.call(this, nx, ny);
};
JigSaw.prototype = {
    constructor: JigSaw,
    rectangularShapes: false,
    buildShapes: function () {
        var hLineType = [];
        var vLineType = [];
        for (var i = 0; i <= this.nRows; i++) {
            hLineType[i] = [];
            vLineType[i] = [];
        }
        for (var row = 0; row < this.nRows; row++) {
            for (var col = 0; col < this.nCols; col++) {
                if (row === 0) {
                    hLineType[row][col] = 0;
                } else {
                    hLineType[row][col] = 1 + (this.randomLines ? Math.round(Math.random() * 9) : row + col) % 2;
                }
                if (col === 0) {
                    vLineType[row][col] = 0;
                } else {
                    vLineType[row][col] = 1 + (this.randomLines ? Math.round(Math.random() * 9) : col + row + 1) % 2;
                }
                if (col === this.nCols - 1)
                    vLineType[row][col + 1] = 0;
                if (row === this.nRows - 1)
                    hLineType[row + 1][col] = 0;
            }
        }
        var w = 1 / this.nCols;
        var h = 1 / this.nRows;
        for (var r = 0; r < this.nRows; r++) {
            for (var c = 0; c < this.nCols; c++) {
                var x = w * c;
                var y = h * r;
                var sd = new AWT.Path([new AWT.PathStroke('M', [
                            x,
                            y
                        ])]);
                this.hLine(sd, hLineType[r][c], x + 0, y + 0, w, h, false);
                this.vLine(sd, vLineType[r][c + 1], x + w, y + 0, w, h, false);
                this.hLine(sd, hLineType[r + 1][c], x + w, y + h, w, h, true);
                this.vLine(sd, vLineType[r][c], x + 0, y + h, w, h, true);
                sd.addStroke(new AWT.PathStroke('X'));
                sd.calcEnclosingRect();
                this.shapeData[r * this.nCols + c] = sd;
            }
        }
        this.initiated = true;
    },
    hLine: function (sd, type, x, y, w, h, inv) {
        var kx = inv ? -1 : 1;
        var ky = type === 1 ? 1 : -1;
        if (type === 0) {
            sd.addStroke(new AWT.PathStroke('L', [
                x + w * kx,
                y
            ]));
        } else {
            var x0 = x + (w - w * this.baseWidthFactor) / 2 * kx;
            var wb = w * this.baseWidthFactor * kx;
            sd.addStroke(new AWT.PathStroke('L', [
                x0,
                y
            ]));
            var hb = h * this.toothHeightFactor * ky;
            sd.addStroke(new AWT.PathStroke('L', [
                x0,
                y + hb
            ]));
            sd.addStroke(new AWT.PathStroke('L', [
                x0 + wb,
                y + hb
            ]));
            sd.addStroke(new AWT.PathStroke('L', [
                x0 + wb,
                y
            ]));
            sd.addStroke(new AWT.PathStroke('L', [
                x + w * kx,
                y
            ]));
        }
    },
    vLine: function (sd, type, x, y, w, h, inv) {
        var ky = inv ? -1 : 1;
        var kx = type === 1 ? 1 : -1;
        if (type === 0) {
            sd.addStroke(new AWT.PathStroke('L', [
                x,
                y + h * ky
            ]));
        } else {
            var y0 = y + (h - h * this.baseWidthFactor) / 2 * ky;
            var hb = h * this.baseWidthFactor * ky;
            sd.addStroke(new AWT.PathStroke('L', [
                x,
                y0
            ]));
            var wb = w * this.toothHeightFactor * kx;
            sd.addStroke(new AWT.PathStroke('L', [
                x + wb,
                y0
            ]));
            sd.addStroke(new AWT.PathStroke('L', [
                x + wb,
                y0 + hb
            ]));
            sd.addStroke(new AWT.PathStroke('L', [
                x,
                y0 + hb
            ]));
            sd.addStroke(new AWT.PathStroke('L', [
                x,
                y + h * ky
            ]));
        }
    }
};
JigSaw.prototype = $.extend(Object.create(Shaper.prototype), JigSaw.prototype);
Shaper.CLASSES['@JigSaw'] = JigSaw;
module.exports = JigSaw;
},{"../AWT":47,"./Shaper":104,"jquery":5}],103:[function(require,module,exports){
var $ = require('jquery'), Shaper = require('./Shaper'), AWT = require('../AWT');
var Rectangular = function (nx, ny) {
    Shaper.call(this, nx, ny);
};
Rectangular.prototype = {
    constructor: Rectangular,
    rectangularShapes: true,
    buildShapes: function () {
        var w = 1 / this.nCols;
        var h = 1 / this.nRows;
        for (var y = 0; y < this.nRows; y++) {
            for (var x = 0; x < this.nCols; x++) {
                this.shapeData[y * this.nCols + x] = new AWT.Rectangle(new AWT.Point(x * w, y * h), new AWT.Dimension(w, h));
            }
        }
        this.initiated = true;
    }
};
Rectangular.prototype = $.extend(Object.create(Shaper.prototype), Rectangular.prototype);
Shaper.CLASSES['@Rectangular'] = Rectangular;
module.exports = Rectangular;
},{"../AWT":47,"./Shaper":104,"jquery":5}],104:[function(require,module,exports){
var $ = require('jquery'), Utils = require('../Utils'), AWT = require('../AWT');
var Shaper = function (nx, ny) {
    this.reset(nx, ny);
};
Shaper.CLASSES = {};
Shaper.getShaper = function (className, nx, ny) {
    var shaper = null;
    var cl = Shaper.CLASSES[className];
    if (cl) {
        shaper = new cl(nx, ny);
    } else
        console.log('Unknown shaper: ' + className);
    return shaper;
};
Shaper.prototype = {
    constructor: Shaper,
    className: 'Shaper',
    nCols: 0,
    nRows: 0,
    nCells: 0,
    shapeData: null,
    initiated: false,
    baseWidthFactor: 1 / 3,
    toothHeightFactor: 1 / 6,
    randomLines: false,
    scaleX: 1,
    scaleY: 1,
    enclosing: null,
    showEnclosure: false,
    rectangularShapes: false,
    reset: function (nCols, nRows) {
        this.nCols = nCols;
        this.nRows = nRows;
        this.nCells = nRows * nCols;
        this.initiated = false;
        this.shapeData = [];
        for (var i = 0; i < this.nCells; i++)
            this.shapeData[i] = new AWT.Shape();
    },
    setProperties: function ($xml) {
        var shaper = this;
        $.each($xml.get(0).attributes, function () {
            switch (this.name) {
            case 'class':
                shaper.className = this.value;
                break;
            case 'cols':
                shaper.nCols = Number(this.value);
                break;
            case 'rows':
                shaper.nRows = Number(this.value);
                break;
            case 'baseWidthFactor':
            case 'toothHeightFactor':
            case 'scaleX':
            case 'scaleY':
                shaper[this.name] = Number(this.value);
                break;
            case 'randomLines':
            case 'showEnclosure':
                shaper[this.name] = Utils.getBoolean(this.value, true);
                break;
            }
        });
        $xml.children('enclosing:first').each(function () {
            $(this).children('shape:first').each(function (data) {
                shaper.enclosing = shaper.readShapeData(this, shaper.scaleX, shaper.scaleY);
                shaper.showEnclosure = true;
                shaper.hasRemainder = true;
            });
        });
        $xml.children('shape').each(function (i, data) {
            shaper.shapeData[i] = shaper.readShapeData(data, shaper.scaleX, shaper.scaleY);
        });
        if (shaper.shapeData.length > 0 && shaper.shapeData.length !== shaper.nRows * shaper.nCols) {
            shaper.nCells = shaper.shapeData.length;
        }
        return this;
    },
    readShapeData: function ($xml, scaleX, scaleY) {
        var shd = [], result = null;
        $.each($xml.textContent.split('|'), function () {
            var sd = this.split(':');
            var data = sd.length > 1 ? sd[1].split(',') : null;
            if (data) {
                for (var i = 0; i < data.length; i++) {
                    data[i] /= i % 2 ? scaleY : scaleX;
                }
            }
            switch (sd[0]) {
            case 'rectangle':
                result = new AWT.Rectangle(data[0], data[1], data[2], data[3]);
                break;
            case 'ellipse':
                result = new AWT.Ellipse(data[0], data[1], data[2], data[3]);
                break;
            default:
                shd.push(new AWT.PathStroke(sd[0], data));
                break;
            }
        });
        if (!result && shd.length > 0)
            result = new AWT.Path(shd);
        return result;
    },
    buildShapes: function () {
    },
    getShape: function (n, rect) {
        if (!this.initiated)
            this.buildShapes();
        if (n >= this.nCells || this.shapeData[n] === null)
            return null;
        return this.shapeData[n].getShape(rect);
    },
    getShapeData: function (n) {
        return n >= 0 && n < this.shapeData.length ? this.shapeData[n] : null;
    },
    getEnclosingShapeData: function () {
        return new AWT.Rectangle(0, 0, 1, 1);
    },
    hasRemainder: false,
    getRemainderShape: function (rect) {
        var r = null;
        if (!this.hasRemainder)
            return null;
        if (!this.initiated)
            this.buildShapes();
        var sh = this.getEnclosingShapeData();
        if (sh)
            r = sh.getShape(rect);
        else
            r = new AWT.Rectangle();
        for (var i = 0; i < this.nCells; i++) {
            if (this.shapeData[i])
                r.add(this.shapeData[i].getShape(rect), false);
        }
        return r;
    }
};
module.exports = Shaper;
},{"../AWT":47,"../Utils":53,"jquery":5}],105:[function(require,module,exports){
var $ = require('jquery'), Shaper = require('./Shaper'), JigSaw = require('./JigSaw'), AWT = require('../AWT');
var TriangularJigSaw = function (nx, ny) {
    JigSaw.call(this, nx, ny);
};
TriangularJigSaw.prototype = {
    constructor: TriangularJigSaw,
    hLine: function (sd, type, x, y, w, h, inv) {
        var kx = inv ? -1 : 1;
        var ky = type === 1 ? 1 : -1;
        if (type === 0) {
            sd.addStroke(new AWT.PathStroke('L', [
                x + w * kx,
                y
            ]));
        } else {
            var x0 = x + (w - w * this.baseWidthFactor) / 2 * kx;
            var wb = w * this.baseWidthFactor * kx;
            sd.addStroke(new AWT.PathStroke('L', [
                x0,
                y
            ]));
            var hb = h * this.toothHeightFactor * ky;
            sd.addStroke(new AWT.PathStroke('L', [
                x0 + wb / 2,
                y + hb
            ]));
            sd.addStroke(new AWT.PathStroke('L', [
                x0 + wb,
                y
            ]));
            sd.addStroke(new AWT.PathStroke('L', [
                x + w * kx,
                y
            ]));
        }
    },
    vLine: function (sd, type, x, y, w, h, inv) {
        var ky = inv ? -1 : 1;
        var kx = type === 1 ? 1 : -1;
        if (type === 0) {
            sd.addStroke(new AWT.PathStroke('L', [
                x,
                y + h * ky
            ]));
        } else {
            var y0 = y + (h - h * this.baseWidthFactor) / 2 * ky;
            var hb = h * this.baseWidthFactor * ky;
            sd.addStroke(new AWT.PathStroke('L', [
                x,
                y0
            ]));
            var wb = w * this.toothHeightFactor * kx;
            sd.addStroke(new AWT.PathStroke('L', [
                x + wb,
                y0 + hb / 2
            ]));
            sd.addStroke(new AWT.PathStroke('L', [
                x,
                y0 + hb
            ]));
            sd.addStroke(new AWT.PathStroke('L', [
                x,
                y + h * ky
            ]));
        }
    }
};
TriangularJigSaw.prototype = $.extend(Object.create(JigSaw.prototype), TriangularJigSaw.prototype);
Shaper.CLASSES['@TriangularJigSaw'] = TriangularJigSaw;
module.exports = TriangularJigSaw;
},{"../AWT":47,"./JigSaw":102,"./Shaper":104,"jquery":5}],106:[function(require,module,exports){
var $ = require('jquery'), screenfull = require('screenfull'), AWT = require('../AWT'), Skin = require('./Skin'), ActiveBox = require('../boxes/ActiveBox');
if (!screenfull)
    screenfull = window.screenfull;
var DefaultSkin = function (ps, name, $div) {
    Skin.call(this, ps, name, $div);
    this.$msgBoxDiv = $div.children('.JClicMsgBox').first();
    if (this.$msgBoxDiv === null || this.$msgBoxDiv.length === 0) {
        this.$msgBoxDiv = $('<div class="JClicMsgBox"/>');
        this.$div.append(this.$msgBoxDiv);
    }
    this.$msgBoxDivCanvas = $('<canvas />');
    this.$msgBoxDiv.append(this.$msgBoxDivCanvas);
    this.msgBox = new ActiveBox();
    var thisSkin = this;
    this.buttons.prev = $('<img />').on('click', function (evt) {
        if (thisSkin.ps)
            thisSkin.ps.actions.prev.processEvent(evt);
    });
    this.buttons.prev.get(0).src = this.resources.prevBtn;
    this.$div.append(this.buttons.prev);
    this.buttons.next = $('<img />').on('click', function (evt) {
        if (thisSkin.ps)
            thisSkin.ps.actions.next.processEvent(evt);
    });
    this.buttons.next.get(0).src = this.resources.nextBtn;
    this.$div.append(this.buttons.next);
    if (screenfull && screenfull.enabled) {
        this.buttons.fullscreen = $('<img />').on('click', function () {
            if (screenfull && screenfull.enabled)
                screenfull.toggle(thisSkin.$div[0]);
        });
        this.buttons.fullscreen.get(0).src = this.resources.fullScreen;
        this.$div.append(this.buttons.fullscreen);
    }
    this.$waitPanel = $('<div />').css({
        'background-color': 'rgba(255, 255, 255, .60)',
        'background-image': 'url(' + this.resources.waitImg + ')',
        'background-repeat': 'no-repeat',
        'background-size': '20%',
        'background-position': 'center',
        'z-index': 99,
        display: 'none'
    });
    this.$div.append(this.$waitPanel);
};
DefaultSkin.prototype = {
    constructor: DefaultSkin,
    msgBox: null,
    $msgBoxDiv: null,
    $msgBoxDivCanvas: null,
    background: '#3F51B5',
    margin: 18,
    msgBoxHeight: 60,
    updateContent: function (dirtyRegion) {
        if (this.$msgBoxDivCanvas) {
            var ctx = this.$msgBoxDivCanvas.get(0).getContext('2d');
            ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
            this.msgBox.update(ctx, dirtyRegion);
        }
        return Skin.prototype.updateContent.call(this);
    },
    doLayout: function () {
        var margin = this.margin;
        var prv = this.resources.prevBtnSize;
        var nxt = this.resources.nextBtnSize;
        var full = this.resources.fullScreenSize;
        if (this.buttons.fullscreen) {
            this.buttons.fullscreen.get(0).src = this.resources[screenfull.isFullscreen ? 'fullScreenExit' : 'fullScreen'];
        } else {
            full = {
                w: 0,
                h: 0
            };
        }
        var autoFit = this.ps.options.autoFit | (screenfull && screenfull.enabled && screenfull.isFullscreen);
        var mainWidth = autoFit ? $(window).width() : this.ps.options.width;
        var mainHeight = autoFit ? $(window).height() : this.ps.options.height;
        this.$div.css({
            position: 'relative',
            width: Math.max(this.ps.options.minWidth, Math.min(this.ps.options.maxWidth, mainWidth)),
            height: Math.max(this.ps.options.minHeight, Math.min(this.ps.options.maxHeight, mainHeight)),
            'background-color': this.background
        });
        var actualSize = new AWT.Dimension(this.$div.width(), this.$div.height());
        var w = Math.max(100, actualSize.width - 2 * margin);
        var wMsgBox = w - prv.w - nxt.w - full.w;
        var h = this.msgBoxHeight;
        var playerHeight = Math.max(100, actualSize.height - 3 * margin - h);
        var playerCss = {
                position: 'absolute',
                width: w + 'px',
                height: playerHeight + 'px',
                top: margin + 'px',
                left: margin + 'px'
            };
        this.player.$div.css(playerCss).css({ 'background-color': 'olive' });
        this.player.doLayout();
        this.$waitPanel.css(playerCss);
        this.msgBox.ctx = null;
        this.$msgBoxDivCanvas.remove();
        this.$msgBoxDivCanvas = null;
        var msgBoxRect = new AWT.Rectangle(margin + prv.w, 2 * margin + playerHeight, wMsgBox, h);
        this.$msgBoxDiv.css({
            position: 'absolute',
            width: msgBoxRect.dim.width + 'px',
            height: msgBoxRect.dim.height + 'px',
            top: msgBoxRect.pos.y + 'px',
            left: msgBoxRect.pos.x + 'px',
            'background-color': 'lightblue'
        });
        this.buttons.prev.css({
            position: 'absolute',
            top: msgBoxRect.pos.y + (h - prv.h) / 2 + 'px',
            left: margin + 'px'
        });
        this.buttons.next.css({
            position: 'absolute',
            top: msgBoxRect.pos.y + (h - nxt.h) / 2 + 'px',
            left: msgBoxRect.pos.x + msgBoxRect.dim.width + 'px'
        });
        if (this.buttons.fullscreen) {
            this.buttons.fullscreen.css({
                position: 'absolute',
                top: msgBoxRect.pos.y + (h - full.h) / 2 + 'px',
                left: msgBoxRect.pos.x + msgBoxRect.dim.width + nxt.w + 'px'
            });
        }
        this.$msgBoxDivCanvas = $('<canvas width="' + wMsgBox + '" height="' + h + '"/>');
        this.$msgBoxDiv.append(this.$msgBoxDivCanvas);
        this.msgBox.setBounds(new AWT.Rectangle(0, 0, wMsgBox, h));
        this.add(msgBoxRect);
        this.invalidate(msgBoxRect);
        this.update();
    },
    getMsgBox: function () {
        return this.msgBox;
    },
    actionStatusChanged: function (act) {
        switch (act.name) {
        case 'next':
            this.setEnabled(this.buttons.next, act.enabled);
            break;
        case 'prev':
            this.setEnabled(this.buttons.prev, act.enabled);
            break;
        default:
            break;
        }
    },
    setEnabled: function ($object, enabled) {
        $object.css('opacity', enabled ? 1 : 0.3);
    },
    resources: {
        prevBtn: 'data:image/svg+xml;base64,' + 'PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIGZpbGw9IiNGRkZGRkYi' + 'IGhlaWdodD0iMzYiIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjM2IiB4bWxucz0iaHR0cDov' + 'L3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0xNS40MSA3LjQxTDE0IDZsLTYgNiA2IDYg' + 'MS40MS0xLjQxTDEwLjgzIDEyeiI+PC9wYXRoPjxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9' + 'Im5vbmUiPjwvcGF0aD48L3N2Zz4K',
        prevBtnSize: {
            w: 36,
            h: 36
        },
        nextBtn: 'data:image/svg+xml;base64,' + 'PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIGZpbGw9IiNGRkZGRkYi' + 'IGhlaWdodD0iMzYiIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjM2IiB4bWxucz0iaHR0cDov' + 'L3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0xMCA2TDguNTkgNy40MSAxMy4xNyAxMmwt' + 'NC41OCA0LjU5TDEwIDE4bDYtNnoiPjwvcGF0aD48cGF0aCBkPSJNMCAwaDI0djI0SDB6IiBmaWxs' + 'PSJub25lIj48L3BhdGg+PC9zdmc+Cg==',
        nextBtnSize: {
            w: 36,
            h: 36
        },
        waitImg: 'data:image/svg+xml;base64,' + 'PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIGNsYXNzPSJzdmctbG9h' + 'ZGVyIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCA4MCA4MCIgeD0iMHB4IiB4bWw6c3BhY2U9' + 'InByZXNlcnZlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5r' + 'PSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB5PSIwcHgiPjxwYXRoIGQ9Ik0xMCw0MGMw' + 'LDAsMC0wLjQsMC0xLjFjMC0wLjMsMC0wLjgsMC0xLjNjMC0wLjMsMC0wLjUsMC0wLjhjMC0wLjMs' + 'MC4xLTAuNiwwLjEtMC45YzAuMS0wLjYsMC4xLTEuNCwwLjItMi4xIGMwLjItMC44LDAuMy0xLjYs' + 'MC41LTIuNWMwLjItMC45LDAuNi0xLjgsMC44LTIuOGMwLjMtMSwwLjgtMS45LDEuMi0zYzAuNS0x' + 'LDEuMS0yLDEuNy0zLjFjMC43LTEsMS40LTIuMSwyLjItMy4xIGMxLjYtMi4xLDMuNy0zLjksNi01' + 'LjZjMi4zLTEuNyw1LTMsNy45LTQuMWMwLjctMC4yLDEuNS0wLjQsMi4yLTAuN2MwLjctMC4zLDEu' + 'NS0wLjMsMi4zLTAuNWMwLjgtMC4yLDEuNS0wLjMsMi4zLTAuNGwxLjItMC4xIGwwLjYtMC4xbDAu' + 'MywwbDAuMSwwbDAuMSwwbDAsMGMwLjEsMC0wLjEsMCwwLjEsMGMxLjUsMCwyLjktMC4xLDQuNSww' + 'LjJjMC44LDAuMSwxLjYsMC4xLDIuNCwwLjNjMC44LDAuMiwxLjUsMC4zLDIuMywwLjUgYzMsMC44' + 'LDUuOSwyLDguNSwzLjZjMi42LDEuNiw0LjksMy40LDYuOCw1LjRjMSwxLDEuOCwyLjEsMi43LDMu' + 'MWMwLjgsMS4xLDEuNSwyLjEsMi4xLDMuMmMwLjYsMS4xLDEuMiwyLjEsMS42LDMuMSBjMC40LDEs' + 'MC45LDIsMS4yLDNjMC4zLDEsMC42LDEuOSwwLjgsMi43YzAuMiwwLjksMC4zLDEuNiwwLjUsMi40' + 'YzAuMSwwLjQsMC4xLDAuNywwLjIsMWMwLDAuMywwLjEsMC42LDAuMSwwLjkgYzAuMSwwLjYsMC4x' + 'LDEsMC4xLDEuNEM3NCwzOS42LDc0LDQwLDc0LDQwYzAuMiwyLjItMS41LDQuMS0zLjcsNC4zcy00' + 'LjEtMS41LTQuMy0zLjdjMC0wLjEsMC0wLjIsMC0wLjNsMC0wLjRjMCwwLDAtMC4zLDAtMC45IGMw' + 'LTAuMywwLTAuNywwLTEuMWMwLTAuMiwwLTAuNSwwLTAuN2MwLTAuMi0wLjEtMC41LTAuMS0wLjhj' + 'LTAuMS0wLjYtMC4xLTEuMi0wLjItMS45Yy0wLjEtMC43LTAuMy0xLjQtMC40LTIuMiBjLTAuMi0w' + 'LjgtMC41LTEuNi0wLjctMi40Yy0wLjMtMC44LTAuNy0xLjctMS4xLTIuNmMtMC41LTAuOS0wLjkt' + 'MS44LTEuNS0yLjdjLTAuNi0wLjktMS4yLTEuOC0xLjktMi43Yy0xLjQtMS44LTMuMi0zLjQtNS4y' + 'LTQuOSBjLTItMS41LTQuNC0yLjctNi45LTMuNmMtMC42LTAuMi0xLjMtMC40LTEuOS0wLjZjLTAu' + 'Ny0wLjItMS4zLTAuMy0xLjktMC40Yy0xLjItMC4zLTIuOC0wLjQtNC4yLTAuNWwtMiwwYy0wLjcs' + 'MC0xLjQsMC4xLTIuMSwwLjEgYy0wLjcsMC4xLTEuNCwwLjEtMiwwLjNjLTAuNywwLjEtMS4zLDAu' + 'My0yLDAuNGMtMi42LDAuNy01LjIsMS43LTcuNSwzLjFjLTIuMiwxLjQtNC4zLDIuOS02LDQuN2Mt' + 'MC45LDAuOC0xLjYsMS44LTIuNCwyLjcgYy0wLjcsMC45LTEuMywxLjktMS45LDIuOGMtMC41LDEt' + 'MSwxLjktMS40LDIuOGMtMC40LDAuOS0wLjgsMS44LTEsMi42Yy0wLjMsMC45LTAuNSwxLjYtMC43' + 'LDIuNGMtMC4yLDAuNy0wLjMsMS40LTAuNCwyLjEgYy0wLjEsMC4zLTAuMSwwLjYtMC4yLDAuOWMw' + 'LDAuMy0wLjEsMC42LTAuMSwwLjhjMCwwLjUtMC4xLDAuOS0wLjEsMS4zQzEwLDM5LjYsMTAsNDAs' + 'MTAsNDB6IiBmaWxsPSIjM0Y1MUI1Ij48YW5pbWF0ZVRyYW5zZm9ybSBhdHRyaWJ1dGVOYW1lPSJ0' + 'cmFuc2Zvcm0iIGF0dHJpYnV0ZVR5cGU9InhtbCIgZHVyPSIwLjhzIiBmcm9tPSIwIDQwIDQwIiBy' + 'ZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgdG89IjM2MCA0MCA0MCIgdHlwZT0icm90YXRlIj48L2Fu' + 'aW1hdGVUcmFuc2Zvcm0+PC9wYXRoPjxwYXRoIGQ9Ik02Miw0MC4xYzAsMCwwLDAuMi0wLjEsMC43' + 'YzAsMC4yLDAsMC41LTAuMSwwLjhjMCwwLjIsMCwwLjMsMCwwLjVjMCwwLjItMC4xLDAuNC0wLjEs' + 'MC43IGMtMC4xLDAuNS0wLjIsMS0wLjMsMS42Yy0wLjIsMC41LTAuMywxLjEtMC41LDEuOGMtMC4y' + 'LDAuNi0wLjUsMS4zLTAuNywxLjljLTAuMywwLjctMC43LDEuMy0xLDIuMWMtMC40LDAuNy0wLjks' + 'MS40LTEuNCwyLjEgYy0wLjUsMC43LTEuMSwxLjQtMS43LDJjLTEuMiwxLjMtMi43LDIuNS00LjQs' + 'My42Yy0xLjcsMS0zLjYsMS44LTUuNSwyLjRjLTIsMC41LTQsMC43LTYuMiwwLjdjLTEuOS0wLjEt' + 'NC4xLTAuNC02LTEuMSBjLTEuOS0wLjctMy43LTEuNS01LjItMi42Yy0xLjUtMS4xLTIuOS0yLjMt' + 'NC0zLjdjLTAuNi0wLjYtMS0xLjQtMS41LTJjLTAuNC0wLjctMC44LTEuNC0xLjItMmMtMC4zLTAu' + 'Ny0wLjYtMS4zLTAuOC0yIGMtMC4yLTAuNi0wLjQtMS4yLTAuNi0xLjhjLTAuMS0wLjYtMC4zLTEu' + 'MS0wLjQtMS42Yy0wLjEtMC41LTAuMS0xLTAuMi0xLjRjLTAuMS0wLjktMC4xLTEuNS0wLjEtMmMw' + 'LTAuNSwwLTAuNywwLTAuNyBzMCwwLjIsMC4xLDAuN2MwLjEsMC41LDAsMS4xLDAuMiwyYzAuMSww' + 'LjQsMC4yLDAuOSwwLjMsMS40YzAuMSwwLjUsMC4zLDEsMC41LDEuNmMwLjIsMC42LDAuNCwxLjEs' + 'MC43LDEuOCBjMC4zLDAuNiwwLjYsMS4yLDAuOSwxLjljMC40LDAuNiwwLjgsMS4zLDEuMiwxLjlj' + 'MC41LDAuNiwxLDEuMywxLjYsMS44YzEuMSwxLjIsMi41LDIuMyw0LDMuMmMxLjUsMC45LDMuMiwx' + 'LjYsNSwyLjEgYzEuOCwwLjUsMy42LDAuNiw1LjYsMC42YzEuOC0wLjEsMy43LTAuNCw1LjQtMWMx' + 'LjctMC42LDMuMy0xLjQsNC43LTIuNGMxLjQtMSwyLjYtMi4xLDMuNi0zLjNjMC41LTAuNiwwLjkt' + 'MS4yLDEuMy0xLjggYzAuNC0wLjYsMC43LTEuMiwxLTEuOGMwLjMtMC42LDAuNi0xLjIsMC44LTEu' + 'OGMwLjItMC42LDAuNC0xLjEsMC41LTEuN2MwLjEtMC41LDAuMi0xLDAuMy0xLjVjMC4xLTAuNCww' + 'LjEtMC44LDAuMS0xLjIgYzAtMC4yLDAtMC40LDAuMS0wLjVjMC0wLjIsMC0wLjQsMC0wLjVjMC0w' + 'LjMsMC0wLjYsMC0wLjhjMC0wLjUsMC0wLjcsMC0wLjdjMC0xLjEsMC45LTIsMi0yczIsMC45LDIs' + 'MkM2Miw0MCw2Miw0MC4xLDYyLDQwLjF6IiBmaWxsPSIjM0Y1MUI1Ij48YW5pbWF0ZVRyYW5zZm9y' + 'bSBhdHRyaWJ1dGVOYW1lPSJ0cmFuc2Zvcm0iIGF0dHJpYnV0ZVR5cGU9InhtbCIgZHVyPSIwLjZz' + 'IiBmcm9tPSIwIDQwIDQwIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgdG89Ii0zNjAgNDAgNDAi' + 'IHR5cGU9InJvdGF0ZSI+PC9hbmltYXRlVHJhbnNmb3JtPjwvcGF0aD48L3N2Zz4K',
        waitImgSize: {
            w: 80,
            h: 80
        },
        fullScreen: 'data:image/svg+xml;base64,' + 'PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIGZpbGw9IiNGRkZGRkYi' + 'IGhlaWdodD0iMzYiIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjM2IiB4bWxucz0iaHR0cDov' + 'L3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUi' + 'PjwvcGF0aD48cGF0aCBkPSJNNyAxNEg1djVoNXYtMkg3di0zem0tMi00aDJWN2gzVjVINXY1em0x' + 'MiA3aC0zdjJoNXYtNWgtMnYzek0xNCA1djJoM3YzaDJWNWgtNXoiPjwvcGF0aD48L3N2Zz4K',
        fullScreenExit: 'data:image/svg+xml;base64,' + 'PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIGZpbGw9IiNGRkZGRkYi' + 'IGhlaWdodD0iMzYiIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjM2IiB4bWxucz0iaHR0cDov' + 'L3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUi' + 'PjwvcGF0aD48cGF0aCBkPSJNNSAxNmgzdjNoMnYtNUg1djJ6bTMtOEg1djJoNVY1SDh2M3ptNiAx' + 'MWgydi0zaDN2LTJoLTV2NXptMi0xMVY1aC0ydjVoNVY4aC0zeiI+PC9wYXRoPjwvc3ZnPgo=',
        fullScreenSize: {
            w: 36,
            h: 36
        }
    }
};
DefaultSkin.prototype = $.extend(Object.create(Skin.prototype), DefaultSkin.prototype);
Skin.CLASSES['DefaultSkin'] = DefaultSkin;
module.exports = DefaultSkin;
},{"../AWT":47,"../boxes/ActiveBox":84,"./Skin":107,"jquery":5,"screenfull":46}],107:[function(require,module,exports){
var $ = require('jquery'), Utils = require('../Utils'), AWT = require('../AWT');
var Skin = function (ps, name, $div) {
    AWT.Container.call(this);
    this.$div = $div ? $div : $('<div class="JClic"/>');
    this.buttons = Utils.cloneObject(Skin.prototype.buttons);
    this.counters = Utils.cloneObject(Skin.prototype.counters);
    this.msgArea = Utils.cloneObject(Skin.prototype.msgArea);
    if (ps)
        this.ps = ps;
    if (name)
        this.name = name;
    Skin.skinStack.push(this);
};
Skin.skinStack = [];
Skin.CLASSES = {};
Skin.prototype = {
    constructor: Skin,
    $div: null,
    name: 'default',
    fileName: '',
    $waitPanel: null,
    buttons: {
        'prev': null,
        'next': null,
        'return': null,
        'reset': null,
        'info': null,
        'help': null,
        'audio': null,
        'about': null,
        'fullscreen': null
    },
    counters: {
        'score': null,
        'actions': null,
        'time': null
    },
    msgArea: {
        'main': null,
        'aux': null,
        'mem': null
    },
    player: null,
    ps: null,
    waitCursorCount: 0,
    attach: function (player) {
        if (this.player !== null)
            this.detach();
        this.player = player;
        this.$div.prepend(this.player.$div);
    },
    detach: function () {
        if (this.player !== null) {
            this.player.$div.remove();
            this.player = null;
        }
        if (this.currentHelpWindow !== null)
            this.currentHelpWindow.$div.hide();
        if (this.currentAboutWindow !== null)
            this.currentAboutWindow.$div.hide();
        this.setEnabled(false);
    },
    getSkin: function (skinName, ps, $div, $xml) {
        var sk = null;
        if (skinName && ps) {
            for (var i = 0; i < Skin.skinStack; i++) {
                sk = Skin.skinStack[i];
                if (sk.name === skinName && sk.ps === ps)
                    return sk;
            }
        }
        var cl = Skin.CLASSES[skinName ? skinName : 'DefaultSkin'];
        if (cl) {
            sk = new cl(ps, skinName, $div);
            if ($xml)
                sk.setProperties($xml);
        } else
            console.log('Unknown skin class: ' + skinName);
        return sk;
    },
    setProperties: function ($xml) {
    },
    updateContent: function (dirtyRegion) {
        return AWT.Container.prototype.updateContent.call(this, dirtyRegion);
    },
    resetAllCounters: function (bEnabled) {
    },
    setSystemMessage: function (msg1, msg2) {
        var s = '[JClic: ';
        if (msg1)
            s += msg1;
        if (msg2)
            s += (msg1 ? ' - ' : '') + msg2;
        s += ']';
        console.log(s);
    },
    setWaitCursor: function (status) {
        if (typeof status === 'undefined') {
            if (this.$waitPanel)
                this.$waitPanel.css({ display: this.waitCursorCount > 0 ? 'inherit' : 'none' });
        } else {
            if (status)
                this.waitCursorCount++;
            else if (--this.waitCursorCount < 0)
                this.waitCursorCount = 0;
            this.setWaitCursor();
        }
    },
    showHelp: function ($hlpComponent) {
    },
    showAbout: function (tabName) {
    },
    enableCounter: function (counter, bEnabled) {
        if (this.counters[counter])
            this.counters[counter].setEnabled(bEnabled);
    },
    doLayout: function () {
    },
    fit: function () {
        this.ps.options.width = this.$div.width();
        this.ps.options.height = this.$div.height();
        this.doLayout();
        return new AWT.Dimension(this.$div.width(), this.$div.height());
    },
    equals: function (skin) {
        return skin && this.name === skin.name && this.ps === skin.ps;
    },
    getMsgBox: function () {
        return null;
    },
    $getTopComponent: function () {
        return this.$div;
    },
    actionStatusChanged: function (act) {
    }
};
Skin.prototype = $.extend(Object.create(AWT.Container.prototype), Skin.prototype);
module.exports = Skin;
},{"../AWT":47,"../Utils":53,"jquery":5}]},{},[50])
//# sourceMappingURL=jclic.js.map
