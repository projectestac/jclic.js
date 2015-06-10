// JSClic version 0.0.0 (2015-06-05)
// A JavaScript player of JClic activities
// (c) 2000-2015 Educational Telematic Network of Catalonia (XTEC)
// This program can be freely redistributed under the terms of the GNU General Public License
// This is a minified script. Full, commented source code available at:
// https://github.com/projectestac/jclic.js

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
var $ = require('jquery'), Utils = require('./Utils');
var Font = function (family, size, bold, italic, variant) {
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
};
Font.prototype = {
    constructor: Font,
    family: 'Arial',
    size: 17,
    bold: 0,
    italic: 0,
    variant: '',
    _ascent: -1,
    _descent: -1,
    _height: -1,
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
            this._height = -1;
        return this;
    },
    getHeight: function () {
        if (this._height < 0) {
            for (var i = 0; i < Font.prototype._ALREADY_CALCULED_FONTS.length; i++) {
                var font = Font.prototype._ALREADY_CALCULED_FONTS[i];
                if (font.equals(this)) {
                    this._height = font._height;
                    this._ascent = font._ascent;
                    this._descent = font._descent;
                    break;
                }
            }
            if (this._height < 0) {
                this._calcHeight();
                if (this._height > 0)
                    Font.prototype._ALREADY_CALCULED_FONTS.push(this);
            }
        }
        return this._height;
    },
    _ALREADY_CALCULED_FONTS: [],
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
            this._ascent = block.offset().top - text.offset().top;
            block.css({ verticalAlign: 'bottom' });
            this._height = block.offset().top - text.offset().top;
            this._descent = this._height - this._ascent;
        } finally {
            div.remove();
        }
        return this;
    },
    equals: function (font) {
        return this.family === font.family && this.size === font.size && this.bold === font.bold && this.italic === font.italic && this.variant === font.variant;
    }
};
var Gradient = function (c1, c2, angle, cycles) {
    if (c1)
        this.c1 = c1;
    if (c2)
        this.c2 = c2;
    if (typeof angle === 'number')
        this.angle = angle % 360;
    if (typeof cycles === 'number')
        this.cycles = cycles;
};
Gradient.prototype = {
    constructor: Gradient,
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
var Stroke = function (lineWidth, lineCap, lineJoin, miterLimit) {
    if (typeof lineWidth === 'number')
        this.lineWidth = lineWidth;
    if (lineCap)
        this.lineCap = lineCap;
    if (lineJoin)
        this.lineJoin = lineJoin;
    if (typeof miterLimit === 'number')
        this.miterLimit = miterLimit;
};
Stroke.prototype = {
    constructor: Stroke,
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
var Point = function (x, y) {
    if (x instanceof Point) {
        this.x = x.x;
        this.y = x.y;
    } else {
        this.x = x ? x : 0;
        this.y = y ? y : 0;
    }
};
Point.prototype = {
    constructor: Point,
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
    }
};
var Dimension = function (w, h) {
    if (w instanceof Point && h instanceof Point) {
        this.width = h.x - w.x;
        this.height = h.y - w.y;
    } else {
        this.width = w ? w : 0;
        this.height = h ? h : 0;
    }
};
Dimension.prototype = {
    constructor: Dimension,
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
        if (width instanceof Dimension) {
            height = width.heigth;
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
var Shape = function (pos) {
    this.pos = pos ? pos : new Point();
};
Shape.prototype = {
    constructor: Shape,
    pos: new Point(),
    moveBy: function (delta) {
        this.pos.moveBy(delta);
        return this;
    },
    moveTo: function (newPos) {
        this.pos.moveTo(newPos);
        return this;
    },
    getBounds: function () {
        return new Rectangle(this.pos);
    },
    equals: function (p) {
        return this.pos.equals(p);
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
    fill: function (ctx) {
        this.preparePath(ctx);
        ctx.fill();
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
var Rectangle = function (pos, dim, w, h) {
    var p = pos, d = dim;
    if (pos instanceof Rectangle) {
        d = new Dimension(pos.dim.width, pos.dim.height);
        p = new Point(pos.pos.x, pos.pos.y);
    } else if (pos instanceof Point) {
        p = new Point(pos.x, pos.y);
        if (dim instanceof Dimension)
            d = new Dimension(dim.width, dim.height);
    } else if (pos instanceof Array) {
        p = new Point(pos[0], pos[1]);
        d = new Dimension(pos[2] - pos[0], pos[3] - pos[1]);
    } else if (typeof w === 'number' && typeof h === 'number') {
        p = new Point(pos, dim);
        d = new Dimension(w, h);
    }
    Shape.call(this, p);
    if (d instanceof Dimension)
        this.dim = d;
    else if (d instanceof Point)
        this.dim = new Dimension(d.x - this.pos.x, d.y - this.pos.y);
    else
        this.dim = new Dimension();
};
Rectangle.prototype = {
    constructor: Rectangle,
    dim: new Dimension(),
    getBounds: function () {
        return this;
    },
    setBounds: function (rect) {
        if (!rect)
            rect = new Rectangle();
        this.pos.x = rect.pos.x;
        this.pos.y = rect.pos.y;
        this.dim.width = rect.dim.width;
        this.dim.height = rect.dim.height;
        return this;
    },
    equals: function (r) {
        return r instanceof Rectangle && this.pos.equals(r.pos) && this.dim.equals(r.dim);
    },
    clone: function () {
        return new Rectangle(this);
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
    },
    getOppositeVertex: function () {
        return new Point(this.pos.x + this.dim.width, this.pos.y + this.dim.height);
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
Rectangle.prototype = $.extend(Object.create(Shape.prototype), Rectangle.prototype);
var Ellipse = function (pos, dim, w, h) {
    Rectangle.call(this, pos, dim, w, h);
};
Ellipse.prototype = {
    constructor: Ellipse,
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
        return e instanceof Ellipse && Rectangle.prototype.equals.call(this, e);
    },
    clone: function () {
        return new Ellipse(this.pos, this.dim);
    },
    isRect: function () {
        return false;
    }
};
Ellipse.prototype = $.extend(Object.create(Rectangle.prototype), Ellipse.prototype);
var Path = function (strokes) {
    if (strokes) {
        this.strokes = [];
        for (var n in strokes) {
            var str = strokes[n];
            str = new PathStroke(str.type ? str.type : str.action, str.points ? str.points : str.data);
            this.strokes.push(str);
        }
    }
    this.enclosing = new Rectangle();
    this.calcEnclosingRect();
    Shape.call(this, this.enclosing.pos);
};
Path.prototype = {
    constructor: Path,
    strokes: [],
    enclosing: new Rectangle(),
    clone: function () {
        var str = [];
        for (var i = 0; i < this.strokes.length; i++)
            str[i] = this.strokes[i].clone();
        return new Path(str);
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
                        p0 = new Point(p);
                        p1 = new Point(p);
                    } else {
                        p0.x = Math.min(p.x, p0.x);
                        p0.y = Math.min(p.y, p0.y);
                        p1.x = Math.max(p.x, p1.x);
                        p1.y = Math.max(p.y, p1.y);
                    }
                }
        }
        this.enclosing.setBounds(new Rectangle(p0, new Dimension(p0, p1)));
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
        var d = new Dimension(newPos.x - this.pos.x, newPos.y - this.pos.y);
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
        for (n in this.strokes)
            this.strokes[n].stroke(ctx);
        return ctx;
    }
};
Path.prototype = $.extend(Object.create(Shape.prototype), Path.prototype);
var PathStroke = function (type, points) {
    this.type = type;
    if (points && points.length > 0) {
        this.points = [];
        if (points[0] instanceof Point) {
            for (var p in points)
                this.points.push(new Point(points[p].x, points[p].y));
        } else {
            for (var i = 0; i < points.length; i += 2)
                this.points.push(new Point(points[i], points[i + 1]));
        }
    }
};
PathStroke.prototype = {
    constructor: PathStroke,
    type: 'X',
    points: null,
    clone: function () {
        return new PathStroke(this.type, this.points);
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
var Action = function (name, actionPerformed) {
    this.name = name;
    this.actionPerformed = actionPerformed;
};
Action.prototype = {
    constructor: Action,
    name: null,
    description: null,
    enabled: false,
    actionPerformed: function (thisAction, event) {
        return this;
    },
    processEvent: function (event) {
        return this.actionPerformed(this, event);
    },
    setEnabled: function (enabled) {
        this.enabled = enabled;
        return this;
    }
};
var Timer = function (actionPerformed, interval, enabled) {
    this.actionPerformed = actionPerformed;
    this.interval = interval;
    this.setEnabled(enabled ? true : false);
};
Timer.prototype = {
    constructor: Timer,
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
var Container = function (pos, dim, w, h) {
    Rectangle.call(this, pos, dim, w, h);
};
Container.prototype = {
    constructor: Container,
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
        return this;
    },
    updateContent: function (dirtyRegion) {
        return this;
    }
};
Container.prototype = $.extend(Object.create(Rectangle.prototype), Container.prototype);
var AWT = {
        Font: Font,
        Gradient: Gradient,
        Stroke: Stroke,
        Point: Point,
        Dimension: Dimension,
        Shape: Shape,
        Rectangle: Rectangle,
        Ellipse: Ellipse,
        Path: Path,
        PathStroke: PathStroke,
        Action: Action,
        Timer: Timer,
        Container: Container
    };
module.exports = AWT;
},{"./Utils":8,"jquery":1}],3:[function(require,module,exports){
var $ = require('jquery'), Utils = require('./Utils'), AWT = require('./AWT'), EventSounds = require('./media/EventSounds'), ActiveBoxContent = require('./boxes/ActiveBoxContent'), ActiveBagContent = require('./boxes/ActiveBagContent'), BoxBase = require('./boxes/BoxBase'), AutoContentProvider = require('./automation/AutoContentProvider'), TextGridContent = require('./boxes/TextGridContent'), Evaluator = require('./activities/text/Evaluator'), TextActivityDocument = require('./activities/text/TextActivityDocument');
var K = Utils.settings;
var Activity = function (project) {
    this.project = project;
    this.eventSounds = new EventSounds(this.project.settings.eventSounds);
    this.messages = {};
    this.abc = {};
};
Activity.prototype = {
    constructor: Activity,
    _CLASSES: {
        '@panels.Menu': Activity,
        '@textGrid.CrossWord': Activity,
        '@textGrid.WordSearch': Activity
    },
    _getActivity: function ($xml, project) {
        var act = null;
        if ($xml && project) {
            var className = $xml.attr('class');
            var cl = Activity.prototype._CLASSES[className];
            if (cl) {
                act = new cl(project);
                act.setProperties($xml);
            } else
                console.log('Unknown activity class: ' + className);
        }
        return act;
    },
    project: null,
    name: K.DEFAULT_NAME,
    class: null,
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
    upperCase: true,
    checkCase: true,
    wildTransparent: false,
    clues: null,
    tad: null,
    ev: null,
    checkButtonText: null,
    prevScreenText: null,
    prevScreenStyle: null,
    prevScreenMaxTime: -1,
    autoJump: false,
    forceOkToAdvance: false,
    amongParagraphs: false,
    setProperties: function ($xml) {
        var act = this;
        $.each($xml.get(0).attributes, function () {
            var name = this.name;
            var val = this.value;
            switch (name) {
            case 'name':
            case 'class':
            case 'code':
            case 'type':
            case 'description':
                act[name] = val;
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
                        act.border = Utils.getBoolean($node.attr('border'), true);
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
                act.acp = AutoContentProvider.prototype._readAutomation($node, act.project);
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
                $node.children('clue').each(function () {
                    act.clues[Number($(this).attr('id'))] = this.textContent;
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
                act.ev = new Evaluator().setProperties($node);
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
            this.acp.init(this.project);
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
        return new this.Panel(this, ps);
    },
    Panel: function (act, ps, $div) {
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
    }
};
Activity.prototype.Panel.prototype = {
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
    events: [
        'click',
        'keypress'
    ],
    backgroundColor: null,
    backgroundTransparent: false,
    border: null,
    setBounds: function (rect) {
        AWT.Container.prototype.setBounds.call(this, rect);
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
            var mbe = this.act.project.mediaBag.elements[this.act.bgImageFile];
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
                'background-color': this.backgroundTransparent ? 'transparent' : this.backgroundColor,
                border: this.border ? 'solid' : 'none'
            };
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
    showHelp: function () {
    },
    setDimension: function (maxSize) {
        return new AWT.Dimension(Math.min(maxSize.width, this.act.windowSize.width), Math.min(maxSize.height, this.act.windowSize.height));
    },
    attachEvents: function () {
        for (var i = 0; i < this.events.length; i++) {
            this.attachEvent(this.$div, this.events[i]);
        }
    },
    attachEvent: function ($obj, evt) {
        $obj.on(evt, this, function (event) {
            event.data.processEvent.call(event.data, event);
        });
    },
    processEvent: function (event) {
        if (this.playing)
            console.log('Event fired: ' + event.type);
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
Activity.prototype.Panel.prototype = $.extend(Object.create(AWT.Container.prototype), Activity.prototype.Panel.prototype);
module.exports = Activity;
},{"./AWT":2,"./Utils":8,"./activities/text/Evaluator":18,"./activities/text/TextActivityDocument":20,"./automation/AutoContentProvider":22,"./boxes/ActiveBagContent":32,"./boxes/ActiveBoxContent":35,"./boxes/BoxBase":38,"./boxes/TextGridContent":41,"./media/EventSounds":44,"jquery":1}],4:[function(require,module,exports){
var a = require('./skins/DefaultSkin'), b = require('./shapers/Rectangular'), c = require('./shapers/Holes'), d = require('./shapers/JigSaw'), e = require('./shapers/TriangularJigSaw'), f = require('./shapers/ClassicJigSaw'), g = require('./automation/arith/Arith'), h = require('./activities/text/TextActivityBase'), i = require('./activities/text/WrittenAnswer'), j = require('./activities/panels/InformationScreen'), k = require('./activities/panels/Identify'), l = require('./activities/panels/Explore'), m = require('./activities/puzzles/DoublePuzzle'), n = require('./activities/puzzles/ExchangePuzzle'), o = require('./activities/puzzles/HolePuzzle'), p = require('./activities/memory/MemoryGame'), q = require('./activities/associations/SimpleAssociation'), r = require('./activities/associations/ComplexAssociation');
module.exports = 'Deep classes loaded!';
},{"./activities/associations/ComplexAssociation":9,"./activities/associations/SimpleAssociation":10,"./activities/memory/MemoryGame":11,"./activities/panels/Explore":12,"./activities/panels/Identify":13,"./activities/panels/InformationScreen":14,"./activities/puzzles/DoublePuzzle":15,"./activities/puzzles/ExchangePuzzle":16,"./activities/puzzles/HolePuzzle":17,"./activities/text/TextActivityBase":19,"./activities/text/WrittenAnswer":21,"./automation/arith/Arith":23,"./shapers/ClassicJigSaw":49,"./shapers/Holes":50,"./shapers/JigSaw":51,"./shapers/Rectangular":52,"./shapers/TriangularJigSaw":54,"./skins/DefaultSkin":55}],5:[function(require,module,exports){
var $ = require('jquery'), JClicPlayer = require('./JClicPlayer'), deps = require('./Deps');
$(function () {
    var $div = $('.JClic');
    if ($div.length) {
        var projectName = $div[0].getAttribute('data-project');
        var player = new JClicPlayer($div);
        player.load(projectName);
        $(window).resize(function () {
            if (player.skin)
                player.skin.doLayout();
        });
    }
});
module.exports = 'JClic armed';
},{"./Deps":4,"./JClicPlayer":6,"jquery":1}],6:[function(require,module,exports){
var $ = require('jquery'), Utils = require('./Utils'), AWT = require('./AWT'), PlayerHistory = require('./PlayerHistory'), ActiveMediaBag = require('./media/ActiveMediaBag'), Skin = require('./skins/Skin'), EventSounds = require('./media/EventSounds'), JClicProject = require('./project/JClicProject'), JumpInfo = require('./bags/JumpInfo'), ActiveBoxContent = require('./boxes/ActiveBoxContent');
var JClicPlayer = function ($topDiv, $div) {
    AWT.Container.call(this);
    this.$topDiv = $topDiv;
    this.$div = $div;
    if ($div)
        this.dim = new AWT.Dimension($div.width(), $div.height());
    else
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
    this.audioEnabled = this.options.AUDIO_ENABLED;
    this.navButtonsAlways = this.options.NAV_BUTTONS_ALWAYS;
    this.defaultSkin = Skin.prototype.getSkin(null, this, this.$topDiv);
    this.setSkin(this.defaultSkin);
    this.createEventSounds();
    this.initTimers();
    this.setSystemMessage('ready');
};
JClicPlayer.prototype = {
    constructor: JClicPlayer,
    options: {
        MAX_WAIT_TIME: 120000,
        INFO_URL_FRAME: '_blank',
        EXIT_URL: null,
        AUDIO_ENABLED: true,
        NAV_BUTTONS_ALWAYS: true
    },
    $div: null,
    $topDiv: null,
    project: null,
    basePath: '',
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
    splashImg: null,
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
            this.actPanel.$div.detach();
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
    createCursors: function () {
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
        this.forceFinishActivity();
        this.skin.setWaitCursor(true);
        var actp = null;
        if (project) {
            if (typeof project === 'string') {
                var fullPath = Utils.getPath(this.basePath, project);
                if (Utils.endsWith(fullPath, '.jclic.zip'))
                    fullPath = fullPath.substring(0, fullPath.length - 4);
                this.setSystemMessage('loading project', project);
                var tp = this;
                $.get(fullPath, null, 'text xml').done(function (data) {
                    var prj = new JClicProject();
                    prj.setProperties($(data).find('JClicProject'), fullPath);
                    tp.setSystemMessage('Project file loaded and parsed', project);
                    prj.mediaBag.buildAll();
                    var loops = 0;
                    var interval = 500;
                    var checkMedia = window.setInterval(function () {
                            if (++loops > tp.options.MAX_WAIT_TIME / interval) {
                                window.clearInterval(checkMedia);
                                tp.setSystemMessage('Error loading media!');
                            }
                            if (!prj.mediaBag.isWaiting()) {
                                window.clearInterval(checkMedia);
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
        if (sequence) {
            this.setSystemMessage('Loading sequence', sequence);
            this.navButtonsDisabled = false;
            var ase = null;
            if (typeof sequence === 'string')
                ase = this.project.activitySequence.getElementByTag(sequence, true);
            if (ase === null) {
                var n = parseInt(sequence);
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
            this.actPanel.$div.detach();
            this.actPanel = null;
            this.setCounterValue('time', 0);
        }
        if (actp) {
            this.actPanel = actp;
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
            this.setSystemMessage('activity ready');
            this.doLayout();
            this.initActivity();
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
            this.actPanel.$div.detach();
            this.actPanel = null;
            this.setMsg(null);
            this.setBackgroundSettings(null);
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
    startActivity: function (activityPanel) {
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
            if (act.bgImageFile) {
                var bgImageUrl = this.project.mediaBag.elements[act.bgImageFile].fileName;
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
        }, 0);
    },
    stopMedia: function (level) {
        if (typeof level !== 'number')
            level = -1;
        this.activeMediaBag.stopAll(level);
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
    setBackgroundSettings: function (act) {
        this.doLayout();
    },
    setMsg: function (abc) {
        var ab = null;
        if (this.skin)
            ab = this.skin.getMsgBox();
        if (ab !== null) {
            ab.clear();
            ab.setContent(abc ? abc : ActiveBoxContent.prototype.EMPTY_CONTENT);
            this.skin.invalidate().update();
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
            this.skin.showHelp($hlpComponent);
            return true;
        }
        return false;
    },
    displayURL: function (url, inFrame) {
        if (url) {
            if (inFrame)
                window.open(url, this.options.INFO_URL_FRAME);
            else
                window.location.href = url;
        }
    },
    exit: function (url) {
        if (!url)
            url = this.options.EXIT_URL;
        if (url)
            displayURL(url, false);
    },
    setWindowTitle: function (docTitle) {
        this.setSystemMessage('running', docTitle);
    }
};
JClicPlayer.prototype = $.extend(Object.create(AWT.Container.prototype), JClicPlayer.prototype);
module.exports = JClicPlayer;
},{"./AWT":2,"./PlayerHistory":7,"./Utils":8,"./bags/JumpInfo":28,"./boxes/ActiveBoxContent":35,"./media/ActiveMediaBag":42,"./media/EventSounds":44,"./project/JClicProject":47,"./skins/Skin":56,"jquery":1}],7:[function(require,module,exports){
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
    HistoryElement: function (projectPath, sequence, activity) {
        this.projectPath = projectPath;
        this.sequence = sequence;
        this.activity = activity;
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
                this.sequenceStack.push(new this.HistoryElement(this.player.project.path, ase.getSequenceForElement(act), act));
            }
        }
    },
    pop: function () {
        if (this.sequenceStack.length > 0) {
            var e = this.sequenceStack.pop();
            if (e.projectPath === this.player.project.path)
                this.player.load(null, e.activity, null, null);
            else {
                if (this.testMode && e.projectPath !== null && e.projectPath.length > 0) {
                    console.log('At this point, a jump to ' + e.projectPath + ' should be performed.');
                } else {
                    this.player.load(e.projectPath, e.activity, null, null);
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
                        this.player.load(null, null, ase.activityName, null);
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
        if (sequence === null && path === null)
            return false;
        if (path === null)
            path = this.player.project.path;
        if (this.sequenceStack.length > 0) {
            var e = this.sequenceStack[this.sequenceStack.length - 1];
            if (sequence !== null && path === e.projectPath) {
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
            this.player.load(null, sequence, null, null);
        else
            this.player.load(path, sequence, null, null);
        return true;
    }
};
module.exports = PlayerHistory;
},{}],8:[function(require,module,exports){
var $ = require('jquery');
var Utils = {
        getBoolean: function (val, defaultValue) {
            return Number(val === 'true' | defaultValue ? 1 : 0);
        },
        getNumber: function (val, defaultValue) {
            return val === '' || val === null || typeof val === 'undefined' ? defaultValue : Number(val);
        },
        'FALSE': 0,
        'TRUE': 1,
        'DEFAULT': 2,
        getTriState: function (val) {
            return Number(val === 'true' ? this.TRUE : val === 'false' ? this.FALSE : this.DEFAULT);
        },
        isNullOrUndef: function (variable) {
            return typeof variable === 'undefined' || variable === null;
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
                    color = this.settings.BoxBase.BACK_COLOR;
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
        getBasePath: function (exp) {
            var result = '';
            var p = exp.lastIndexOf('/');
            if (p >= 0)
                result = exp.substring(0, p + 1);
            return result;
        },
        getPath: function (basePath, path) {
            if (Utils.isURL(path))
                return path;
            else
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
            COMPRESS_IMAGES: true
        }
    };
module.exports = Utils;
},{"jquery":1}],9:[function(require,module,exports){
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
    },
    Panel: function (act, ps, $div) {
        SimpleAssociation.prototype.Panel.call(this, act, ps, $div);
    }
};
ComplexAssociation.prototype = $.extend(Object.create(SimpleAssociation.prototype), ComplexAssociation.prototype);
var panelAncestor = SimpleAssociation.prototype.Panel.prototype;
ComplexAssociation.prototype.Panel.prototype = {
    constructor: ComplexAssociation.prototype.Panel,
    invAssCheck: null,
    buildVisualComponents: function () {
        panelAncestor.buildVisualComponents.call(this);
        var abcA = this.act.abc['primary'];
        var abcB = this.act.abc['secondary'];
        if (abcA && abcB) {
            if (this.act.invAss) {
                this.invAssCheck = [];
                var n = abcB.getNumCells();
                for (var i = 0; i < n; i++)
                    this.invAssCheck[i] = false;
            }
            this.bgA.setDefaultIdAss();
            this.act.nonAssignedCells = 0;
            var n = this.bgA.getNumCells();
            for (var i = 0; i < n; i++) {
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
            var bx1, bx2;
            var p = new AWT.Point(event.pageX - this.$div.offset().left, event.pageY - this.$div.offset().top);
            var m = false;
            var clickOnBg0 = false;
            switch (event.type) {
            case 'mousedown':
                this.ps.stopMedia(1);
                if (!this.bc.active) {
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
                        var ok = false;
                        var src = bx1.getDescription();
                        var dest = bx2.getDescription();
                        var matchingDest = this.act.abc['secondary'].getActiveBoxContent(bx1.idAss);
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
                        var src = bx1 ? bx1.getDescription() : bx2 ? bx2.getDescription() : 'null';
                        this.ps.reportNewAction(this.act, 'MATCH', src, 'null', false, this.bgB.countCellsWithIdAss(-1));
                        this.playEvent('actionError');
                    }
                    this.update();
                }
                break;
            case 'mousemove':
                this.bc.moveTo(p);
                break;
            }
        }
    }
};
ComplexAssociation.prototype.Panel.prototype = $.extend(Object.create(panelAncestor), ComplexAssociation.prototype.Panel.prototype);
Activity.prototype._CLASSES['@associations.ComplexAssociation'] = ComplexAssociation;
module.exports = ComplexAssociation;
},{"../../AWT":2,"../../Activity":3,"./SimpleAssociation":10,"jquery":1}],10:[function(require,module,exports){
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
    },
    Panel: function (act, ps, $div) {
        Activity.prototype.Panel.call(this, act, ps, $div);
    }
};
SimpleAssociation.prototype = $.extend(Object.create(Activity.prototype), SimpleAssociation.prototype);
var ActPanelAncestor = Activity.prototype.Panel.prototype;
SimpleAssociation.prototype.Panel.prototype = {
    constructor: SimpleAssociation.prototype.Panel,
    bgA: null,
    bgB: null,
    bc: null,
    events: [
        'mousedown',
        'mouseup',
        'mousemove'
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
        var abcA = this.act.abc['primary'];
        var abcB = this.act.abc['secondary'];
        var solved = this.act.abc['solvedPrimary'];
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
                this.act.acp.generateContent(new this.act.acp.ActiveBagContentKit(abcA.nch, abcA.ncw, contentKit, false), this.ps);
            }
            this.bgA = ActiveBoxGrid.prototype._createEmptyGrid(null, this, this.act.margin, this.act.margin, abcA);
            this.bgB = ActiveBoxGrid.prototype._createEmptyGrid(null, this, this.act.margin, this.act.margin, abcB);
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
        return BoxBag.prototype._layoutDouble(preferredMaxSize, this.bgA, this.bgB, this.act.boxGridPos, this.act.margin);
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
            var bx1, bx2;
            var p = new AWT.Point(event.pageX - this.$div.offset().left, event.pageY - this.$div.offset().top);
            var m = false;
            var clickOnBg0 = false;
            switch (event.type) {
            case 'mousedown':
                this.ps.stopMedia(1);
                if (!this.bc.active) {
                    bx1 = this.bgA.findActiveBox(p);
                    bx2 = this.bgB.findActiveBox(p);
                    if (bx1 && (!this.act.useOrder || bx1.idOrder === this.currentItem) || !this.act.useOrder && bx2 && bx2.idAss !== -1) {
                        if (this.act.dragCells)
                            this.bc.begin(p, bx1 ? bx1 : bx2);
                        else
                            this.bc.begin(p);
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
                        var ok = false;
                        var src = bx1.getDescription();
                        var dest = bx2.getDescription();
                        var matchingDest = this.act.abc['secondary'].getActiveBoxContent(bx1.idOrder);
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
                this.bc.moveTo(p);
                break;
            }
        }
    }
};
SimpleAssociation.prototype.Panel.prototype = $.extend(Object.create(ActPanelAncestor), SimpleAssociation.prototype.Panel.prototype);
Activity.prototype._CLASSES['@associations.SimpleAssociation'] = SimpleAssociation;
module.exports = SimpleAssociation;
},{"../../AWT":2,"../../Activity":3,"../../boxes/ActiveBoxGrid":36,"../../boxes/BoxBag":37,"../../boxes/BoxConnector":39,"jquery":1}],11:[function(require,module,exports){
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
    },
    Panel: function (act, ps, $div) {
        Activity.prototype.Panel.call(this, act, ps, $div);
    }
};
MemoryGame.prototype = $.extend(Object.create(Activity.prototype), MemoryGame.prototype);
var ActPanelAncestor = Activity.prototype.Panel.prototype;
MemoryGame.prototype.Panel.prototype = {
    constructor: MemoryGame.prototype.Panel,
    bg: null,
    bc: null,
    events: [
        'mousedown',
        'mouseup',
        'mousemove'
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
                this.act.acp.generateContent(new this.act.acp.ActiveBagContentKit(abcA.nch, abcA.ncw, contentKit, false), this.ps);
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
        return BoxBag.prototype._layoutSingle(preferredMaxSize, this.bg, this.act.margin);
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
            var bx1, bx2;
            var p = new AWT.Point(event.pageX - this.$div.offset().left, event.pageY - this.$div.offset().top);
            switch (event.type) {
            case 'mousedown':
                this.ps.stopMedia(1);
                if (!this.bc.active) {
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
                this.bc.moveTo(p);
                break;
            }
        }
    }
};
MemoryGame.prototype.Panel.prototype = $.extend(Object.create(ActPanelAncestor), MemoryGame.prototype.Panel.prototype);
Activity.prototype._CLASSES['@memory.MemoryGame'] = MemoryGame;
module.exports = MemoryGame;
},{"../../AWT":2,"../../Activity":3,"../../boxes/ActiveBoxGrid":36,"../../boxes/BoxBag":37,"../../boxes/BoxConnector":39,"../../shapers/Rectangular":52,"jquery":1}],12:[function(require,module,exports){
var $ = require('jquery'), Activity = require('../../Activity'), ActiveBoxGrid = require('../../boxes/ActiveBoxGrid'), BoxBag = require('../../boxes/BoxBag'), BoxConnector = require('../../boxes/BoxConnector'), AWT = require('../../AWT'), Rectangular = require('../../shapers/Rectangular');
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
    },
    Panel: function (act, ps, $div) {
        Activity.prototype.Panel.call(this, act, ps, $div);
    }
};
Explore.prototype = $.extend(Object.create(Activity.prototype), Explore.prototype);
var ActPanelAncestor = Activity.prototype.Panel.prototype;
Explore.prototype.Panel.prototype = {
    constructor: Explore.prototype.Panel,
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
                this.act.acp.generateContent(new this.act.acp.ActiveBagContentKit(abcA.nch, abcA.ncw, [
                    abcA,
                    abcB
                ], false), this.ps);
            this.bgA = ActiveBoxGrid.prototype._createEmptyGrid(null, this, this.act.margin, this.act.margin, abcA);
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
        return BoxBag.prototype._layoutDouble(preferredMaxSize, this.bgA, this.bgB, this.act.boxGridPos, this.act.margin);
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
        }
    }
};
Explore.prototype.Panel.prototype = $.extend(Object.create(ActPanelAncestor), Explore.prototype.Panel.prototype);
Activity.prototype._CLASSES['@panels.Explore'] = Explore;
module.exports = Explore;
},{"../../AWT":2,"../../Activity":3,"../../boxes/ActiveBoxGrid":36,"../../boxes/BoxBag":37,"../../boxes/BoxConnector":39,"../../shapers/Rectangular":52,"jquery":1}],13:[function(require,module,exports){
var $ = require('jquery'), Activity = require('../../Activity'), ActiveBoxGrid = require('../../boxes/ActiveBoxGrid'), BoxBag = require('../../boxes/BoxBag'), AWT = require('../../AWT');
var Identify = function (project) {
    Activity.call(this, project);
    this.includeInReports = false;
    this.reportActions = false;
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
    },
    Panel: function (act, ps, $div) {
        Activity.prototype.Panel.call(this, act, ps, $div);
    }
};
Identify.prototype = $.extend(Object.create(Activity.prototype), Identify.prototype);
var ActPanelAncestor = Activity.prototype.Panel.prototype;
Identify.prototype.Panel.prototype = {
    constructor: Identify.prototype.Panel,
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
                this.act.acp.generateContent(new this.act.acp.ActiveBagContentKit(abc.nch, abc.ncw, contentKit, false), this.ps);
            }
            this.bg = ActiveBoxGrid.prototype._createEmptyGrid(null, this, this.act.margin, this.act.margin, abc);
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
        return BoxBag.prototype._layoutSingle(preferredMaxSize, this.bg, this.act.margin);
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
        }
    }
};
Identify.prototype.Panel.prototype = $.extend(Object.create(ActPanelAncestor), Identify.prototype.Panel.prototype);
Activity.prototype._CLASSES['@panels.Identify'] = Identify;
module.exports = Identify;
},{"../../AWT":2,"../../Activity":3,"../../boxes/ActiveBoxGrid":36,"../../boxes/BoxBag":37,"jquery":1}],14:[function(require,module,exports){
var $ = require('jquery'), Activity = require('../../Activity'), ActiveBoxGrid = require('../../boxes/ActiveBoxGrid'), BoxBag = require('../../boxes/BoxBag'), AWT = require('../../AWT');
var InformationScreen = function (project) {
    Activity.call(this, project);
    this.includeInReports = false;
    this.reportActions = false;
};
InformationScreen.prototype = {
    constructor: InformationScreen,
    Panel: function (act, ps, $div) {
        Activity.prototype.Panel.call(this, act, ps, $div);
    }
};
InformationScreen.prototype = $.extend(Object.create(Activity.prototype), InformationScreen.prototype);
var ActPanelAncestor = Activity.prototype.Panel.prototype;
InformationScreen.prototype.Panel.prototype = {
    constructor: InformationScreen.prototype.Panel,
    bg: null,
    buildVisualComponents: function () {
        if (this.firstRun)
            ActPanelAncestor.buildVisualComponents.call(this);
        this.clear();
        var abc = this.act.abc['primary'];
        if (abc) {
            if (abc.imgName)
                abc.setImgContent(this.act.project.mediaBag, null, false);
            if (this.act.acp !== null)
                this.act.acp.generateContent(new this.act.acp.ActiveBagContentKit(abc.nch, abc.ncw, [abc], false), this.ps);
            this.bg = ActiveBoxGrid.prototype._createEmptyGrid(null, this, this.act.margin, this.act.margin, abc);
            this.bg.setContent(abc);
            this.bg.setVisible(true);
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
        return BoxBag.prototype._layoutSingle(preferredMaxSize, this.bg, this.act.margin);
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
            var p = new AWT.Point(event.pageX - this.$div.offset().left, event.pageY - this.$div.offset().top);
            this.ps.stopMedia(1);
            var bx = this.bg.findActiveBox(p);
            if (bx) {
                if (!bx.playMedia(this.ps))
                    this.playEvent('click');
            }
        }
    }
};
InformationScreen.prototype.Panel.prototype = $.extend(Object.create(ActPanelAncestor), InformationScreen.prototype.Panel.prototype);
Activity.prototype._CLASSES['@panels.InformationScreen'] = InformationScreen;
module.exports = InformationScreen;
},{"../../AWT":2,"../../Activity":3,"../../boxes/ActiveBoxGrid":36,"../../boxes/BoxBag":37,"jquery":1}],15:[function(require,module,exports){
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
    },
    Panel: function (act, ps, $div) {
        Activity.prototype.Panel.call(this, act, ps, $div);
    }
};
DoublePuzzle.prototype = $.extend(Object.create(Activity.prototype), DoublePuzzle.prototype);
var ActPanelAncestor = Activity.prototype.Panel.prototype;
DoublePuzzle.prototype.Panel.prototype = {
    constructor: DoublePuzzle.prototype.Panel,
    bgA: null,
    bgB: null,
    bc: null,
    events: [
        'mousedown',
        'mouseup',
        'mousemove'
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
                this.act.acp.generateContent(new this.act.acp.ActiveBagContentKit(abc.nch, abc.ncw, [abc], false), this.ps);
            this.bgA = ActiveBoxGrid.prototype._createEmptyGrid(null, this, this.act.margin, this.act.margin, abc);
            this.bgB = ActiveBoxGrid.prototype._createEmptyGrid(null, this, this.act.margin, this.act.margin, abc);
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
        return BoxBag.prototype._layoutDouble(preferredMaxSize, this.bgA, this.bgB, this.act.boxGridPos, this.act.margin);
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
            var bx1, bx2;
            var p = new AWT.Point(event.pageX - this.$div.offset().left, event.pageY - this.$div.offset().top);
            switch (event.type) {
            case 'mousedown':
                this.ps.stopMedia(1);
                if (!this.bc.active) {
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
                this.bc.moveTo(p);
                break;
            }
        }
    }
};
DoublePuzzle.prototype.Panel.prototype = $.extend(Object.create(ActPanelAncestor), DoublePuzzle.prototype.Panel.prototype);
Activity.prototype._CLASSES['@puzzles.DoublePuzzle'] = DoublePuzzle;
module.exports = DoublePuzzle;
},{"../../AWT":2,"../../Activity":3,"../../boxes/ActiveBoxGrid":36,"../../boxes/BoxBag":37,"../../boxes/BoxConnector":39,"jquery":1}],16:[function(require,module,exports){
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
    },
    Panel: function (act, ps, $div) {
        Activity.prototype.Panel.call(this, act, ps, $div);
    }
};
ExchangePuzzle.prototype = $.extend(Object.create(Activity.prototype), ExchangePuzzle.prototype);
var ActPanelAncestor = Activity.prototype.Panel.prototype;
ExchangePuzzle.prototype.Panel.prototype = {
    constructor: ExchangePuzzle.prototype.Panel,
    bg: null,
    bc: null,
    events: [
        'mousedown',
        'mouseup',
        'mousemove'
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
                this.act.acp.generateContent(new this.act.acp.ActiveBagContentKit(abc.nch, abc.ncw, [abc], false), this.ps);
            this.bg = ActiveBoxGrid.prototype._createEmptyGrid(null, this, this.act.margin, this.act.margin, abc);
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
        return BoxBag.prototype._layoutSingle(preferredMaxSize, this.bg, this.act.margin);
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
            var bx1, bx2;
            var p = new AWT.Point(event.pageX - this.$div.offset().left, event.pageY - this.$div.offset().top);
            switch (event.type) {
            case 'mousedown':
                this.ps.stopMedia(1);
                if (!this.bc.active) {
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
                this.bc.moveTo(p);
                break;
            }
        }
    }
};
ExchangePuzzle.prototype.Panel.prototype = $.extend(Object.create(ActPanelAncestor), ExchangePuzzle.prototype.Panel.prototype);
Activity.prototype._CLASSES['@puzzles.ExchangePuzzle'] = ExchangePuzzle;
module.exports = ExchangePuzzle;
},{"../../AWT":2,"../../Activity":3,"../../boxes/ActiveBoxGrid":36,"../../boxes/BoxBag":37,"../../boxes/BoxConnector":39,"jquery":1}],17:[function(require,module,exports){
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
    },
    Panel: function (act, ps, $div) {
        Activity.prototype.Panel.call(this, act, ps, $div);
    }
};
HolePuzzle.prototype = $.extend(Object.create(Activity.prototype), HolePuzzle.prototype);
var ActPanelAncestor = Activity.prototype.Panel.prototype;
HolePuzzle.prototype.Panel.prototype = {
    constructor: HolePuzzle.prototype.Panel,
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
                this.act.acp.generateContent(new this.act.acp.ActiveBagContentKit(abc.nch, abc.ncw, [abc], false), this.ps);
            this.bg = ActiveBoxGrid.prototype._createEmptyGrid(null, this, this.act.margin, this.act.margin, abc);
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
        return BoxBag.prototype._layoutDouble(preferredMaxSize, this.bg, this.parkBg, this.act.boxGridPos, this.act.margin);
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
        }
    }
};
HolePuzzle.prototype.Panel.prototype = $.extend(Object.create(ActPanelAncestor), HolePuzzle.prototype.Panel.prototype);
Activity.prototype._CLASSES['@puzzles.HolePuzzle'] = HolePuzzle;
module.exports = HolePuzzle;
},{"../../AWT":2,"../../Activity":3,"../../boxes/ActiveBoxGrid":36,"../../boxes/BoxBag":37,"../../boxes/BoxConnector":39,"../../shapers/Rectangular":52,"jquery":1}],18:[function(require,module,exports){
var $ = require('jquery'), Utils = require('../../Utils');
var Evaluator = function (className) {
    this.className = className;
};
Evaluator.prototype = {
    constructor: Evaluator,
    className: null,
    checkCase: false,
    checkAccents: true,
    checkPunctuation: true,
    checkDoubleSpaces: false,
    detail: true,
    checkSteps: 3,
    checkScope: 6,
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
    }
};
module.exports = Evaluator;
},{"../../Utils":8,"jquery":1}],19:[function(require,module,exports){
var $ = require('jquery'), Activity = require('../../Activity'), ActiveBox = require('../../boxes/ActiveBox');
var TextActivityBase = function (project) {
    Activity.call(this, project);
};
TextActivityBase.prototype = {
    constructor: TextActivityBase,
    Panel: function (act, ps, $div) {
        Activity.prototype.Panel.call(this, act, ps, $div);
        this.boxes = [];
        this.popups = [];
        this.targets = [];
    }
};
TextActivityBase.prototype = $.extend(Object.create(Activity.prototype), TextActivityBase.prototype);
var ActPanelAncestor = Activity.prototype.Panel.prototype;
TextActivityBase.prototype.Panel.prototype = {
    constructor: TextActivityBase.prototype.Panel,
    boxes: null,
    popups: null,
    targets: null,
    buildVisualComponents: function () {
        ActPanelAncestor.buildVisualComponents.call(this);
        this.setDocContent(this.$div, this.act.document);
    },
    setDocContent: function ($dom, doc) {
        var thisPanel = this;
        $dom.empty().css(doc.style['default'].css).css('overflow', 'auto');
        var $html = $('<div/>').css({ 'padding': 4 });
        $html.css(doc.style['default'].css);
        $.each(doc.p, function () {
            var $p = $('<p/>').css({ 'margin': 0 });
            var empty = true;
            if (this.style) {
                $p.css(doc.style[this.style].css);
            }
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
                    var box = ActiveBox.prototype._createCell($span, this);
                    thisPanel.boxes.push(box);
                    $span.css({
                        'display': 'inline-block',
                        'vertical-align': 'middle'
                    });
                    $p.append($span);
                    break;
                case 'target':
                    thisPanel.targets.push(this);
                    $span.html(this.text);
                    if (this.attr) {
                        if (!this.attr.style)
                            this.attr.style = 'target';
                        $span.css(doc.style[this.attr.style].css);
                        if (this.attr.css)
                            $span.css(this.attr.css);
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
    }
};
TextActivityBase.prototype.Panel.prototype = $.extend(Object.create(ActPanelAncestor), TextActivityBase.prototype.Panel.prototype);
Activity.prototype._CLASSES['@text.Complete'] = TextActivityBase;
Activity.prototype._CLASSES['@text.FillInBlanks'] = TextActivityBase;
Activity.prototype._CLASSES['@text.Identify'] = TextActivityBase;
Activity.prototype._CLASSES['@text.Order'] = TextActivityBase;
module.exports = TextActivityBase;
},{"../../Activity":3,"../../boxes/ActiveBox":33,"jquery":1}],20:[function(require,module,exports){
var $ = require('jquery'), Utils = require('../../Utils'), ActiveBoxContent = require('../../boxes/ActiveBoxContent'), MediaContent = require('../../media/MediaContent');
var TextActivityDocument = function () {
    this.style = { 'default': $.extend(true, {}, this.DEFAULT_DOC_STYLE) };
    this.p = [];
};
TextActivityDocument.prototype = {
    constructor: TextActivityDocument,
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
                    obj = { text: this.textContent.replace(/\t/g, '&emsp;') };
                    var attr = doc.readDocAttributes($child);
                    if (!$.isEmptyObject(attr)) {
                        obj.attr = attr;
                    }
                    break;
                case 'target':
                    obj = { text: this.textContent.replace(/\t/g, '&emsp;') };
                    $child.children().each(function () {
                        var $child = $(this);
                        switch (this.nodeName) {
                        case 'answer':
                            obj.answer = this.textContent;
                            break;
                        case 'optionList':
                            obj.optionList = [];
                            $child.children('option').each(function () {
                                obj.optionList.push(this.textContent);
                            });
                            break;
                        case 'response':
                            obj.response = {};
                            $.each(this.attributes, function () {
                                switch (this.name) {
                                case 'fill':
                                case 'show':
                                    obj.response[this.name] = this.value;
                                    break;
                                case 'length':
                                case 'maxLenght':
                                    obj[this.name] = Number(this.value);
                                    break;
                                }
                            });
                            break;
                        case 'info':
                            obj.info = {};
                            $child.children('cell:first').each(function () {
                                switch (this.nodeName) {
                                case 'cell':
                                    obj.info.cell = new ActiveBoxContent().setProperties($(this), mediaBag);
                                    break;
                                case 'media':
                                    obj.info.media = new MediaContent.setProperties($(this), mediaBag);
                                    break;
                                }
                            });
                            obj.info.mode = $child.attr('mode');
                            obj.info.delay = Number($child.attr('delay') | 0);
                            obj.info.maxTime = Number($child.attr('maxTime') | 0);
                            break;
                        case 'text':
                            obj.text = this.textContent;
                            var attr = doc.readDocAttributes($child);
                            if (!$.isEmptyObject(attr))
                                obj.attr = attr;
                            break;
                        }
                    });
                    break;
                default:
                    console.log('Unknown object in activity document: ' + this.nodeName);
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
                attr[name] = Number(val);
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
    },
    DEFAULT_DOC_STYLE: {
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
    }
};
module.exports = TextActivityDocument;
},{"../../Utils":8,"../../boxes/ActiveBoxContent":35,"../../media/MediaContent":46,"jquery":1}],21:[function(require,module,exports){
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
    },
    Panel: function (act, ps, $div) {
        Activity.prototype.Panel.call(this, act, ps, $div);
    }
};
WrittenAnswer.prototype = $.extend(Object.create(Activity.prototype), WrittenAnswer.prototype);
var ActPanelAncestor = Activity.prototype.Panel.prototype;
WrittenAnswer.prototype.Panel.prototype = {
    constructor: WrittenAnswer.prototype.Panel,
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
        if (this.firstRun)
            ActPanelAncestor.buildVisualComponents.call(this);
        this.clear();
        var abcA = this.act.abc['primary'];
        var abcB = this.act.abc['answers'];
        var solved = this.act.abc['solvedPrimary'];
        if (abcA && abcB) {
            if (this.act.invAss) {
                this.invAssCheck = [];
                var n = abcB.getNumCells();
                for (var i = 0; i < n; i++)
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
                this.act.acp.generateContent(new this.act.acp.ActiveBagContentKit(abcA.nch, abcA.ncw, contentKit, false), this.ps);
            }
            this.bgA = ActiveBoxGrid.prototype._createEmptyGrid(null, this, this.act.margin, this.act.margin, abcA);
            var w = abcB.w;
            if (this.act.boxGridPos === 'AUB' || this.act.boxGridPos === 'BUA')
                w = abcA.getTotalWidth();
            this.bgB = new ActiveBoxGrid(null, this, abcB.bb, this.act.margin, this.act.margin, w, abcB.h, new Rectangular(1, 1));
            this.$textField = $('<input type="text" size="200"/>').css(abcB.bb.getCSS()).css({
                position: 'absolute',
                top: 0,
                left: 0,
                border: 0,
                padding: 0,
                margin: 0,
                'text-align': 'center'
            });
            this.attachEvent(this.$textField, 'keypress');
            this.bgA.setContent(abcA, solved ? solved : null);
            this.currentCell = 0;
            this.bgA.setDefaultIdAss();
            this.act.nonAssignedCells = 0;
            var n = this.bgA.getNumCells();
            for (var i = 0; i < n; i++) {
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
            this.playing = true;
            this.setCurrentCell(0);
            this.invalidate().update();
        }
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
        return BoxBag.prototype._layoutDouble(preferredMaxSize, this.bgA, this.bgB, this.act.boxGridPos, this.act.margin);
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
            if (this.$textField) {
                this.$textField.css({
                    top: this.bgB.pos.y,
                    left: this.bgB.pos.x,
                    width: this.bgB.dim.width,
                    height: this.bgB.dim.height
                });
                this.$div.append(this.$textField);
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
                this.ps.stopMedia(1);
                var p = new AWT.Point(event.pageX - this.$div.offset().left, event.pageY - this.$div.offset().top);
                var bx = this.bgA.findActiveBox(p);
                if (bx) {
                    if (bx.getContent() && bx.getContent().mediaContent === null)
                        this.playEvent('CLICK');
                    this.setCurrentCell(bx.idLoc);
                }
                break;
            case 'keypress':
                if (event.keyCode === 13 && this.currentCell !== -1) {
                    event.preventDefault();
                    this.setCurrentCell(this.currentCell);
                }
                break;
            }
        }
    }
};
WrittenAnswer.prototype.Panel.prototype = $.extend(Object.create(ActPanelAncestor), WrittenAnswer.prototype.Panel.prototype);
Activity.prototype._CLASSES['@text.WrittenAnswer'] = WrittenAnswer;
module.exports = WrittenAnswer;
},{"../../AWT":2,"../../Activity":3,"../../Utils":8,"../../boxes/ActiveBoxGrid":36,"../../boxes/BoxBag":37,"../../shapers/Rectangular":52,"jquery":1}],22:[function(require,module,exports){
var ActiveBagContentKit = function (nRows, nCols, content, useIds) {
    this.nRows = nRows;
    this.nCols = nCols;
    this.content = content;
    this.useIds = useIds;
};
var AutoContentProvider = function (project) {
    this.project = project;
};
AutoContentProvider.prototype = {
    constructor: AutoContentProvider,
    _CLASSES: { '@tagreplace.TagReplace': AutoContentProvider },
    ActiveBagContentKit: ActiveBagContentKit,
    project: null,
    setProperties: function ($xml) {
        this.className = $xml.attr('class');
        return this;
    },
    _readAutomation: function ($xml, project) {
        var automation = null;
        if ($xml && project) {
            var className = $xml.attr('class');
            var cl = AutoContentProvider.prototype._CLASSES[className];
            if (cl) {
                automation = new cl(project);
                automation.setProperties($xml);
            } else
                console.log('Unknown AutoContentProvider class: ' + className);
        }
        return automation;
    },
    init: function (resourceBridge, fileSystem) {
    },
    generateContent: function (kit, resourceBridge) {
        return false;
    }
};
module.exports = AutoContentProvider;
},{}],23:[function(require,module,exports){
var $ = require('jquery'), AutoContentProvider = require('../AutoContentProvider'), Utils = require('../../Utils');
var Operator = function () {
    this.limInf = this.LIM0;
    this.limSup = this.LIM10;
    this.lst = [];
};
Operator.prototype = {
    constructor: Operator,
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
    fromBlank: false,
    setProperties: function ($xml) {
        var op = this;
        $.each($xml.get(0).attributes, function () {
            var name = this.name;
            var val = this.value;
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
var DecFormat = function (val, dec, pre) {
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
var Num = function () {
    this.vf = 0;
    this.c = 0;
};
Num.prototype.format = function () {
    return DecFormat(this.vf, this.c);
};
var Operacio = function () {
    this.numA = new Num();
    this.numB = new Num();
    this.numR = new Num();
    this.op = 0;
};
var Arith = function (nRows, nCols, content, useIds) {
    AutoContentProvider.call(this, nRows, nCols, content, useIds);
    this.opA = new Operator();
    this.opB = new Operator();
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
        var r, exp, rang, ls, li, k, v;
        var solved = false;
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
        var i;
        var ops = [], nops, op;
        var rlinf, rlsup, ri2, rs2;
        var q;
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
                var va, vb;
                q = o.numR.c === 2 ? 100 : o.numR.c === 1 ? 10 : 1;
                var bufa = DecFormat(Math.round(o.numA.vf * q + 0.5), 0, 10).split('');
                var bufb = DecFormat(Math.round(o.numB.vf * q + 0.5), 0, 10).split('');
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
                var va, vb;
                q = o.numR.c === 2 ? 100 : o.numR.c === 1 ? 10 : 1;
                var bufa = DecFormat(Math.round(o.numA.vf * q + 0.5), 0, 10).split('');
                var bufb = DecFormat(Math.round(o.numB.vf * q + 0.5), 0, 10).split('');
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
    generateContent: function (kit, rb) {
        var nRows = kit.nRows;
        var nCols = kit.nCols;
        var content = kit.content;
        var useIds = kit.useIds;
        if (nRows <= 0 || nCols <= 0 || content === null || content.length < 1 || content[0] === null || rb === null)
            return false;
        var op = [];
        var S = this.S;
        var tipus = [];
        var numTipus, tipX;
        var tipInv = this.exp_caxb;
        var va = '', vb = '', vc = '', operator = '';
        var stra = [], strb = [], strc = [];
        var nColsB = nCols, nRowsB = nRows;
        var nCells = nRows * nCols;
        if (nCells < 2)
            return false;
        var ass = null;
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
        for (var i = 0; i < nCells; i++) {
            var o = new Operacio();
            for (var j = 0; j < this.NMAXLOOPS; j++) {
                this.genOp(o);
                if (this.resultNoDup) {
                    for (var k = 0; k < i; k++) {
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
            for (var i = nCells - 1; i > 0; i--) {
                for (var j = 0; j < i; j++) {
                    if (this.resultOrder === 'SORTASC' && op[j].numR.vf > op[j + 1].numR.vf || this.resultOrder === 'SORTDESC' && op[j].numR.vf < op[j + 1].numR.vf) {
                        var o = op[j];
                        op[j] = op[j + 1];
                        op[j + 1] = o;
                    }
                }
            }
        }
        for (var i = 0; i < nCells; i++) {
            tipX = tipus[Math.floor(Math.random() * numTipus)];
            va = DecFormat(op[i].numA.vf, op[0].numA.c);
            vb = DecFormat(op[i].numB.vf, op[0].numB.c);
            vc = DecFormat(op[i].numR.vf, op[0].numR.c);
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
            var k = 0;
            for (var i = 0; i < nCells; i++) {
                for (var j = 0; j < k; j++)
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
            for (var i = 0; i < k; i++)
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
    },
    Operator: Operator
};
Arith.prototype = $.extend(Object.create(AutoContentProvider.prototype), Arith.prototype);
AutoContentProvider.prototype._CLASSES['@arith.Arith'] = Arith;
module.exports = Arith;
},{"../../Utils":8,"../AutoContentProvider":22,"jquery":1}],24:[function(require,module,exports){
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
},{"./ActivitySequenceElement":25,"./JumpInfo":28,"jquery":1}],25:[function(require,module,exports){
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
},{"./ActivitySequenceJump":26,"jquery":1}],26:[function(require,module,exports){
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
},{"./ConditionalJumpInfo":27,"./JumpInfo":28,"jquery":1}],27:[function(require,module,exports){
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
},{"./JumpInfo":28,"jquery":1}],28:[function(require,module,exports){
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
},{}],29:[function(require,module,exports){
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
            var mbe = new MediaBagElement(thisMediaBag.project.basePath).setProperties($(this));
            thisMediaBag.elements[mbe.name] = mbe;
        });
        return this;
    },
    getElementByFileName: function (fileName) {
        var result = null;
        if (fileName) {
            for (var name in this.elements) {
                if (this.elements[name].fileName === fileName) {
                    result = this.elements[name];
                    break;
                }
            }
        }
        return result;
    },
    buildAll: function (type) {
        $.each(this.elements, function (name, element) {
            if (!type || element.name === type) {
                element.build(function () {
                    console.log(this.name + ' ready');
                });
            }
        });
    },
    isWaiting: function () {
        var result = false;
        return result;
    },
    getSkinElement: function (name, ps) {
        return Skin.prototype.getSkin('default', ps);
    }
};
module.exports = MediaBag;
},{"../skins/Skin":56,"./MediaBagElement":30,"jquery":1}],30:[function(require,module,exports){
var $ = require('jquery'), Utils = require('../Utils'), AWT = require('../AWT');
var MediaBagElement = function (basePath, fileName) {
    if (basePath)
        this.basePath = basePath;
    if (fileName) {
        this.fileName = fileName;
        this.name = fileName;
        this.ext = this.fileName.toLowerCase().split('.').pop();
        this.type = this.getFileType(this.ext);
    }
    this._whenReady = [];
};
MediaBagElement.prototype = {
    constructor: MediaBagElement,
    name: '',
    fileName: '',
    basePath: '',
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
            var fullPath = Utils.getPath(this.basePath, this.fileName);
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
                this.data = new Audio(fullPath);
                if (this.data.complete || this.data.readyState === 4 || this.data.readyState === 'complete')
                    this.ready = true;
                else
                    $(this.data).load(function (response, status, xhr) {
                        if (status !== 'error') {
                            media._onReady();
                        }
                    });
                break;
            case 'xml':
                this.data = '';
                $.get(fullPath, function (response, status, xhr) {
                    if (status !== 'error') {
                        media.data = response;
                        media._onReady();
                    }
                }, 'xml');
                break;
            default:
                this.ready = true;
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
    }
};
module.exports = MediaBagElement;
},{"../AWT":2,"../Utils":8,"jquery":1}],31:[function(require,module,exports){
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
        this.invalidate();
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
        this.invalidate();
    },
    isInverted: function () {
        return this.inverted;
    },
    setInverted: function (newVal) {
        this.inverted = newVal;
        this.invalidate();
    },
    isMarked: function () {
        return this.marked;
    },
    setMarked: function (newVal) {
        if (!newVal)
            this.invalidate();
        this.marked = newVal;
        if (newVal)
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
        if (this.isEmpty() || !this.isVisible() || this.isTemporaryHidden())
            return false;
        if (dirtyRegion && !this.shape.intersects(dirtyRegion))
            return false;
        var bb = this.getBoxBaseResolve();
        if (!bb.transparent) {
            if (!bb.bgGradient || bb.bgGradient.hasTransparency()) {
                ctx.fillStyle = this.inactive ? bb.inactiveColor : this.inverted ? bb.textColor : bb.backColor;
                this.shape.fill(ctx);
            }
            if (bb.bgGradient) {
                ctx.fillStyle = bb.bgGradient.getGradient(ctx, this.shape.getBounds());
                this.shape.fill(ctx);
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
    }
};
AbstractBox.prototype = $.extend(Object.create(AWT.Rectangle.prototype), AbstractBox.prototype);
module.exports = AbstractBox;
},{"../AWT":2,"./BoxBase":38,"jquery":1}],32:[function(require,module,exports){
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
        var cellSet = this;
        var bug = false;
        $.each($xml.get(0).attributes, function () {
            var name = this.name;
            var val = this.value;
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
            var n = cellSet.ncw;
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
                var shaperClassName = $node.attr('class');
                var nCols = Math.max(1, $node.attr('cols'));
                var nRows = Math.max(1, $node.attr('rows'));
                cellSet.shaper = Shaper.prototype._getShaper(shaperClassName, nCols, nRows);
                cellSet.shaper.setProperties($node);
                break;
            case 'ids':
                var ids = this.textContent.split(' ');
                for (var i = 0; i < ids.length; i++)
                    cellSet.activeBoxContentArray[i] = new ActiveBoxContent(Number(ids[i]));
                break;
            case 'cell':
                var abc = new ActiveBoxContent().setProperties($node, mediaBag);
                cellSet.activeBoxContentArray.push(abc);
                break;
            }
        });
        var n = this.activeBoxContentArray.length;
        if (n > 0) {
            var empty = true;
            for (var i = 0; i < n; i++) {
                var bxc = this.getActiveBoxContent(i);
                if (bxc.id !== -1 || bxc.item !== -1 || !bxc.isEmpty()) {
                    empty = false;
                    break;
                }
            }
            if (empty) {
                for (var i = 0; i < n; i++)
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
            this.shaper = Shaper.prototype._getShaper('@Rectangular', this.ncw, this.nch);
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
        var allIdsNull = true;
        var numCells = this.activeBoxContentArray.length;
        for (var i = 0; i < numCells; i++) {
            if (this.getActiveBoxContent(i).id !== -1) {
                allIdsNull = false;
                break;
            }
        }
        if (allIdsNull) {
            maxId = Math.max(1, maxId);
            for (var i = 0; i < numCells; i++) {
                this.getActiveBoxContent(i).id = i % maxId;
            }
        }
    }
};
module.exports = ActiveBagContent;
},{"../AWT":2,"../Utils":8,"../shapers/Shaper":53,"./ActiveBoxContent":35,"./BoxBase":38,"jquery":1}],33:[function(require,module,exports){
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
                var backColor = this.isInactive() ? bb.inactiveColor : this.isInverted() ? bb.textColor : bb.backColor;
                css['background-color'] = backColor;
                var foreColor = this.isInverted() ? bb.backColor : this.isAlternative() ? bb.alternativeColor : bb.textColor;
                css['color'] = foreColor;
                css['text-align'] = abc.txtAlign.h.replace('middle', 'center');
                var divHtml = '<div xmlns="http://www.w3.org/1999/xhtml" style="' + Utils.cssToString(css) + '">' + abc.innerHtmlText + '</div>';
                var svgData = '<svg xmlns="http://www.w3.org/2000/svg" width="' + this.dim.width + '" height="' + this.dim.height + '">' + '<foreignObject width="100%" height="100%">' + divHtml + '</foreignObject>' + '</svg>';
                var DOMURL = window.URL || window.webkitURL || window;
                var img = new Image();
                var svg = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
                var url = DOMURL.createObjectURL(svg);
                img.onload = function () {
                    ctx.drawImage(img, 0, 0);
                    DOMURL.revokeObjectURL(url);
                };
                img.src = url;
            }
        }
    },
    checkAutoStartMedia: function () {
        var cnt = this.getContent();
        if (cnt && cnt.mediaContent && cnt.mediaContent.autoStart && cnt.amp) {
        }
    },
    _createCell: function ($dom, abc) {
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
                ctx.drawImage(img, r.pos.x, r.pos.y, r.dim.width, r.dim.height, this.pos.x, this.pos.y, this.dim.width, this.dim.height);
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
    }
};
ActiveBox.prototype = $.extend(Object.create(AbstractBox.prototype), ActiveBox.prototype);
module.exports = ActiveBox;
},{"../AWT":2,"../Utils":8,"./AbstractBox":31,"./ActiveBagContent":32,"./ActiveBoxContent":35,"jquery":1}],34:[function(require,module,exports){
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
},{"../AWT":2,"./BoxBag":37,"jquery":1}],35:[function(require,module,exports){
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
        if (this.imgName !== null) {
            var mbe = mediaBag.elements[this.imgName];
            if (mbe !== null) {
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
},{"../AWT":2,"../Utils":8,"../media/MediaContent":46,"./BoxBase":38,"jquery":1}],36:[function(require,module,exports){
var $ = require('jquery'), ActiveBoxBag = require('./ActiveBoxBag'), ActiveBox = require('./ActiveBox'), AWT = require('../AWT'), Utils = require('../Utils');
var ActiveBoxGrid = function (parent, container, boxBase, px, py, setWidth, setHeight, sh) {
    ActiveBoxBag.call(this, parent, container, boxBase);
    this.nCols = sh.nCols;
    this.nRows = sh.nRows;
    var r = new AWT.Rectangle(new AWT.Point(px, py), new AWT.Dimension(Math.round(setWidth / this.nCols) * this.nCols, Math.round(setHeight / this.nRows) * this.nRows));
    for (var i = 0; i < sh.nCells; i++) {
        var tmpSh = sh.getShape(i, r);
        var bx = new ActiveBox(this, container, boxBase, i, tmpSh.getBounds());
        if (!sh.rectangularShapes)
            bx.setShape(tmpSh);
        this.addActiveBox(bx);
    }
    if (sh.hasRemainder) {
        var tmpSh = sh.getRemainderShape(r);
        var bx = new ActiveBox(this, container, boxBase, 0, tmpSh.getBounds());
        bx.setShape(tmpSh);
        this.setBackgroundBox(bx);
    }
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
    _createEmptyGrid: function (parent, container, px, py, abc, sh, boxBase) {
        var result = null;
        if (abc) {
            result = new ActiveBoxGrid(parent, container, boxBase ? boxBase : abc.bb, px, py, abc.getTotalWidth(), abc.getTotalHeight(), sh ? sh : abc.getShaper());
            result.setBorder(abc.border);
        }
        return result;
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
},{"../AWT":2,"../Utils":8,"./ActiveBox":33,"./ActiveBoxBag":34,"jquery":1}],37:[function(require,module,exports){
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
    updateContent: function (ctx, dirtyRegion) {
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
    },
    _layoutSingle: function (preferredMaxSize, rs, margin) {
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
    },
    _layoutDouble: function (desiredMaxSize, rsA, rsB, boxGridPos, margin) {
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
    }
};
BoxBag.prototype = $.extend(Object.create(AbstractBox.prototype), BoxBag.prototype);
module.exports = BoxBag;
},{"../AWT":2,"../Utils":8,"./AbstractBox":31,"jquery":1}],38:[function(require,module,exports){
var $ = require('jquery'), Utils = require('../Utils'), AWT = require('../AWT');
var defaultValues = Utils.settings.BoxBase;
var BoxBase = function (parent) {
    this.parent = parent ? parent : null;
};
BoxBase.prototype = {
    constructor: BoxBase,
    parent: null,
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
    default: defaultValues,
    resetAllFontsCounter: 0,
    flagFontReduced: false,
    getCSS: function (css) {
        var font = this.get('font');
        css = font.toCss(css);
        css['color'] = this.get('textColor');
        var transparent = this.get('transparent');
        css['background-color'] = transparent ? 'transparent' : this.get('backColor');
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
},{"../AWT":2,"../Utils":8,"jquery":1}],39:[function(require,module,exports){
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
            this.dest.moveTo(pt);
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
},{"../AWT":2}],40:[function(require,module,exports){
var $ = require('jquery'), AbstractBox = require('./AbstractBox');
var Counter = function (parent, container, rect, boxBase) {
    AbstractBox.call(this, parent, container, boxBase);
    this.setBounds(rect);
};
Counter.prototype = {
    constructor: Counter,
    value: 0,
    countDown: 0,
    enabled: false,
    img: null,
    dSize: null,
    origin: null,
    setEnabled: function (bEnabled) {
        this.enabled = bEnabled;
        this.container.invalidate(this.getBounds()).update();
    },
    isEnabled: function () {
        return this.enabled;
    },
    setCountDown: function (maxValue) {
        this.countDown = maxValue;
        this.container.invalidate(this.getBounds()).update();
    },
    setSource: function (setImg, setOrigin, setDigitSize) {
        this.img = setImg;
        this.origin = setOrigin;
        this.dSize = setDigitSize;
        this.container.invalidate(this.getBounds()).update();
    },
    incValue: function () {
        this.value++;
        if (this.enabled)
            this.container.invalidate(this.getBounds()).update();
    },
    setValue: function (newValue) {
        this.value = newValue;
        if (this.enabled)
            this.container.invalidate(this.getBounds()).update();
    },
    getValue: function () {
        return this.value;
    },
    updateContent: function (ctx, dirtyRegion) {
        if (this.img === null)
            return false;
        var w, d;
        var marginW = (this.dim.width - 3 * this.dSize.width) / 2;
        var marginH = (this.dim.height - this.dSize.height) / 2;
        var valr = value;
        if (this.countDown > 0)
            valr = Math.max(0, this.countDown - this.value);
        valr = Math.min(999, valr);
        for (var k = false, i = 0, j = 100; i < 3; i++, j /= 10) {
            if (!this.enabled)
                d = 1;
            else {
                w = valr / j % 10;
                if (w !== 0) {
                    k = true;
                    d = 11 - w;
                } else
                    d = k || i === 2 ? 11 : 1;
            }
            ctx.drawImage(img, this.origin.x, this.origin.y + this.dSize.height * d, this.origin.x + this.dSize.width, this.origin.y + this.dSize.height * (d + 1), this.pos.x + marginW + this.dSize.width * i, this.pos.y + marginH, this.pos.x + marginW + this.dSize.width * (i + 1), this.pos.y + marginH + this.dSize.height);
        }
        return true;
    }
};
Counter.prototype = $.extend(Object.create(AbstractBox.prototype), Counter.prototype);
module.exports = Counter;
},{"./AbstractBox":31,"jquery":1}],41:[function(require,module,exports){
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
                textGrid.nch = Number(val);
                break;
            case 'columns':
                textGrid.ncw = Number(val);
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
        return this;
    }
};
module.exports = TextGridContent;
},{"../Utils":8,"./BoxBase":38,"jquery":1}],42:[function(require,module,exports){
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
            if (amp.getMediaContent() === mc || amp.getMediaContent().isEquivalent(mc))
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
            if (amp.getMediaContent() === mc)
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
            if (level === -1 || amp.getMediaContent().level <= level)
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
},{"../Utils":8,"./ActiveMediaPlayer":43}],43:[function(require,module,exports){
var AWT = require('../AWT');
var ActiveMediaPlayer = function (mc, mb, ps) {
    this.mc = mc;
    this.ps = ps;
    switch (mc.mediaType) {
    case 'RECORD_AUDIO':
        this.clearAudioBuffer(mc.recBuffer);
        ActiveMediaPlayer.prototype._audioBuffer[mc.recBuffer] = this.createAudioBuffer(mc.length);
    case 'PLAY_RECORDED_AUDIO':
        this.useAudioBuffer = true;
        break;
    default:
        break;
    }
};
ActiveMediaPlayer.prototype = {
    constructor: ActiveMediaPlayer,
    _audioBuffer: [],
    mc: null,
    ps: null,
    bx: null,
    visualComponent: null,
    useAudioBuffer: false,
    createAudioBuffer: function (seconds) {
    },
    realize: function () {
    },
    playNow: function (setBx) {
    },
    play: function (setBx) {
        this.stopAllAudioBuffers();
        this.playNow(setBx);
    },
    stop: function () {
        if (this.useAudioBuffer)
            this.stopAudioBuffer(this.mc.recBuffer);
    },
    clear: function () {
        this.stop();
        if (this.useAudioBuffer)
            this.clearAudioBuffer(this.mc.recBuffer);
    },
    setTimeRanges: function () {
    },
    clearAudioBuffer: function (buffer) {
        if (buffer >= 0 && buffer < ActiveMediaPlayer.prototype._audioBuffer.length && ActiveMediaPlayer.prototype._audioBuffer[buffer] !== null) {
            ActiveMediaPlayer.prototype._audioBuffer[buffer].clear();
            ActiveMediaPlayer.prototype._audioBuffer[buffer] = null;
        }
    },
    clearAllAudioBuffers: function () {
        for (var i = 0; i < ActiveMediaPlayer.prototype._audioBuffer.length; i++)
            this.clearAudioBuffer(i);
    },
    countActiveBuffers: function () {
        var c = 0;
        for (var i = 0; i < ActiveMediaPlayer.prototype._audioBuffer.length; i++)
            if (ActiveMediaPlayer.prototype._audioBuffer[i])
                c++;
        return c;
    },
    stopAllAudioBuffers: function () {
        for (var i = 0; i < ActiveMediaPlayer.prototype._audioBuffer.length; i++)
            if (ActiveMediaPlayer.prototype._audioBuffer[i])
                ActiveMediaPlayer.prototype._audioBuffer[i].stop();
    },
    stopAudioBuffer: function (buffer) {
        if (buffer >= 0 && buffer < ActiveMediaPlayer.prototype._audioBuffer.length && ActiveMediaPlayer.prototype._audioBuffer[buffer] !== null)
            ActiveMediaPlayer.prototype._audioBuffer[buffer].stop();
    },
    checkVisualComponentBounds: function (bxi) {
    },
    setVisualComponentVisible: function (state) {
    },
    getVisualComponent: function () {
    },
    attachVisualComponent: function () {
    },
    destroyVisualComponent: function () {
    },
    linkTo: function (setBx) {
    },
    getMediaContent: function () {
        return this.mc;
    }
};
module.exports = ActiveMediaPlayer;
},{"../AWT":2}],44:[function(require,module,exports){
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
},{"../Utils":8,"./EventSoundsElement":45,"jquery":1}],45:[function(require,module,exports){
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
},{"../Utils":8}],46:[function(require,module,exports){
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
        default:
            icon = 'default';
            break;
        }
        return icon ? this._icoImg[icon] : null;
    },
    _icoData: { default: 'data:image/svg+xml;base64,' + 'PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIGhlaWdodD0iNDgiIHZp' + 'ZXdCb3g9IjAgMCA0OCA0OCIgd2lkdGg9IjQ4IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAw' + 'MC9zdmciPjxwYXRoIGQ9Ik0yOC44IDEyTDI4IDhIMTB2MzRoNFYyOGgxMS4ybC44IDRoMTRWMTJ6' + 'Ij48L3BhdGg+PC9zdmc+Cg==' },
    _icoImg: {}
};
$.each(MediaContent.prototype._icoData, function (key, value) {
    var img = new Image();
    MediaContent.prototype._icoImg[key] = img;
    $(img).attr('src', value);
    $(img).load();
});
module.exports = MediaContent;
},{"../AWT":2,"../Utils":8,"jquery":1}],47:[function(require,module,exports){
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
    setProperties: function ($xml, path) {
        if (path) {
            this.path = path;
            this.basePath = Utils.getBasePath(path);
        }
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
        return Activity.prototype._getActivity(this._activities[name], this);
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
},{"../Activity":3,"../Utils":8,"../bags/ActivitySequence":24,"../bags/MediaBag":29,"./ProjectSettings":48,"jquery":1}],48:[function(require,module,exports){
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
},{"../media/EventSounds":44,"jquery":1}],49:[function(require,module,exports){
var $ = require('jquery'), JigSaw = require('./JigSaw'), AWT = require('../AWT');
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
JigSaw.prototype._CLASSES['@ClassicJigSaw'] = ClassicJigSaw;
module.exports = ClassicJigSaw;
},{"../AWT":2,"./JigSaw":51,"jquery":1}],50:[function(require,module,exports){
var $ = require('jquery'), Shaper = require('./Shaper'), AWT = require('../AWT');
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
Shaper.prototype._CLASSES['@Holes'] = Holes;
module.exports = Holes;
},{"../AWT":2,"./Shaper":53,"jquery":1}],51:[function(require,module,exports){
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
Shaper.prototype._CLASSES['@JigSaw'] = JigSaw;
module.exports = JigSaw;
},{"../AWT":2,"./Shaper":53,"jquery":1}],52:[function(require,module,exports){
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
Shaper.prototype._CLASSES['@Rectangular'] = Rectangular;
module.exports = Rectangular;
},{"../AWT":2,"./Shaper":53,"jquery":1}],53:[function(require,module,exports){
var $ = require('jquery'), Utils = require('../Utils'), AWT = require('../AWT');
var Shaper = function (nx, ny) {
    this.reset(nx, ny);
};
Shaper.prototype = {
    constructor: Shaper,
    _CLASSES: {},
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
            shaper.nRows = shaper.shapeData.length;
            shaper.nCols = 1;
            shaper.nCells = shaper.nCols * shaper.nRows;
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
    _getShaper: function (className, nx, ny) {
        var shaper = null;
        var cl = Shaper.prototype._CLASSES[className];
        if (cl) {
            shaper = new cl(nx, ny);
        } else
            console.log('Unknown shaper: ' + className);
        return shaper;
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
},{"../AWT":2,"../Utils":8,"jquery":1}],54:[function(require,module,exports){
var $ = require('jquery'), JigSaw = require('./JigSaw'), AWT = require('../AWT');
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
JigSaw.prototype._CLASSES['@TriangularJigSaw'] = TriangularJigSaw;
module.exports = TriangularJigSaw;
},{"../AWT":2,"./JigSaw":51,"jquery":1}],55:[function(require,module,exports){
var $ = require('jquery'), AWT = require('../AWT'), Skin = require('./Skin'), ActiveBox = require('../boxes/ActiveBox'), Counter = require('../boxes/Counter');
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
};
DefaultSkin.prototype = {
    constructor: DefaultSkin,
    msgBox: null,
    $msgBoxDiv: null,
    $msgBoxDivCanvas: null,
    currentHelpWindow: null,
    currentAboutWindow: null,
    background: '#3F51B5',
    margin: 18,
    msgBoxHeight: 60,
    updateContent: function (dirtyRegion) {
        if (this.$msgBoxDivCanvas)
            this.msgBox.update(this.$msgBoxDivCanvas.get(0).getContext('2d'), dirtyRegion);
        return Skin.prototype.updateContent.call(this);
    },
    doLayout: function () {
        var margin = this.margin;
        var prv = this.resources.prevBtnSize;
        var nxt = this.resources.nextBtnSize;
        this.$div.css({
            position: 'relative',
            width: '100%',
            height: '600px',
            'background-color': this.background
        });
        var actualSize = new AWT.Dimension(this.$div.width(), this.$div.height());
        var w = Math.max(100, actualSize.width - 2 * margin);
        var wMsgBox = w - 2 * margin - prv.w - nxt.w;
        var h = this.msgBoxHeight;
        var playerHeight = Math.max(100, actualSize.height - 3 * margin - h);
        this.player.$div.css({
            position: 'absolute',
            width: w + 'px',
            height: playerHeight + 'px',
            top: margin + 'px',
            left: margin + 'px',
            'background-color': 'olive'
        });
        this.player.doLayout();
        this.msgBox.ctx = null;
        this.$msgBoxDivCanvas.remove();
        this.$msgBoxDivCanvas = null;
        var msgBoxRect = new AWT.Rectangle(2 * margin + prv.w, 2 * margin + playerHeight, wMsgBox, h);
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
            left: w + margin - nxt.w + 'px'
        });
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
    resources: {
        prevBtn: 'data:image/svg+xml;base64,' + 'PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIGhlaWdodD0iNDgiIGlk' + 'PSJzdmcyIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCA0OCA0OCIgd2lkdGg9IjQ4IiB4bWxu' + 'cz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOmNjPSJodHRwOi8vY3JlYXRpdmVj' + 'b21tb25zLm9yZy9ucyMiIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4x' + 'LyIgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMj' + 'IiB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48bWV0YWRhdGEgaWQ9Im1l' + 'dGFkYXRhMTIiPjxyZGY6UkRGPjxjYzpXb3JrIHJkZjphYm91dD0iIj48ZGM6Zm9ybWF0PmltYWdl' + 'L3N2Zyt4bWw8L2RjOmZvcm1hdD48ZGM6dHlwZSByZGY6cmVzb3VyY2U9Imh0dHA6Ly9wdXJsLm9y' + 'Zy9kYy9kY21pdHlwZS9TdGlsbEltYWdlIj48L2RjOnR5cGU+PGRjOnRpdGxlPjwvZGM6dGl0bGU+' + 'PC9jYzpXb3JrPjwvcmRmOlJERj48L21ldGFkYXRhPjxkZWZzIGlkPSJkZWZzMTAiPjwvZGVmcz48' + 'cGF0aCBkPSJNIDAsMCBIIDQ4IFYgNDggSCAwIHoiIGlkPSJwYXRoNCIgc3R5bGU9ImZpbGw6bm9u' + 'ZSI+PC9wYXRoPjxwYXRoIGQ9Ik0gMjQsNCBDIDM1LjA1LDQgNDQsMTIuOTUgNDQsMjQgNDQsMzUu' + 'MDUgMzUuMDUsNDQgMjQsNDQgMTIuOTUsNDQgNCwzNS4wNSA0LDI0IDQsMTIuOTUgMTIuOTUsNCAy' + 'NCw0IHogbSA0LDI5IFYgMTUgbCAtMTIsOSAxMiw5IHoiIGlkPSJwYXRoNiIgc3R5bGU9ImZpbGw6' + 'I2ZmZmZmZiI+PC9wYXRoPjwvc3ZnPgo=',
        prevBtnSize: {
            w: 48,
            h: 48
        },
        nextBtn: 'data:image/svg+xml;base64,' + 'PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIGhlaWdodD0iNDgiIGlk' + 'PSJzdmcyIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCA0OCA0OCIgd2lkdGg9IjQ4IiB4bWxu' + 'cz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOmNjPSJodHRwOi8vY3JlYXRpdmVj' + 'b21tb25zLm9yZy9ucyMiIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4x' + 'LyIgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMj' + 'IiB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48bWV0YWRhdGEgaWQ9Im1l' + 'dGFkYXRhMTIiPjxyZGY6UkRGPjxjYzpXb3JrIHJkZjphYm91dD0iIj48ZGM6Zm9ybWF0PmltYWdl' + 'L3N2Zyt4bWw8L2RjOmZvcm1hdD48ZGM6dHlwZSByZGY6cmVzb3VyY2U9Imh0dHA6Ly9wdXJsLm9y' + 'Zy9kYy9kY21pdHlwZS9TdGlsbEltYWdlIj48L2RjOnR5cGU+PGRjOnRpdGxlPjwvZGM6dGl0bGU+' + 'PC9jYzpXb3JrPjwvcmRmOlJERj48L21ldGFkYXRhPjxkZWZzIGlkPSJkZWZzMTAiPjwvZGVmcz48' + 'cGF0aCBkPSJNIDAsMCBIIDQ4IFYgNDggSCAwIHoiIGlkPSJwYXRoNCIgc3R5bGU9ImZpbGw6bm9u' + 'ZSI+PC9wYXRoPjxwYXRoIGQ9Ik0gMjQsNCBDIDEyLjk1LDQgNCwxMi45NSA0LDI0IDQsMzUuMDUg' + 'MTIuOTUsNDQgMjQsNDQgMzUuMDUsNDQgNDQsMzUuMDUgNDQsMjQgNDQsMTIuOTUgMzUuMDUsNCAy' + 'NCw0IHogTSAyMCwzMyBWIDE1IGwgMTIsOSAtMTIsOSB6IiBpZD0icGF0aDYiIHN0eWxlPSJmaWxs' + 'OiNmZmZmZmYiPjwvcGF0aD48L3N2Zz4K',
        nextBtnSize: {
            w: 48,
            h: 48
        }
    }
};
DefaultSkin.prototype = $.extend(Object.create(Skin.prototype), DefaultSkin.prototype);
Skin.prototype._CLASSES['DefaultSkin'] = DefaultSkin;
module.exports = DefaultSkin;
},{"../AWT":2,"../boxes/ActiveBox":33,"../boxes/Counter":40,"./Skin":56,"jquery":1}],56:[function(require,module,exports){
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
    Skin.prototype._skinStack.push(this);
};
Skin.prototype = {
    constructor: Skin,
    _CLASSES: {},
    _skinStack: [],
    $div: null,
    name: 'default',
    fileName: '',
    buttons: {
        'prev': null,
        'next': null,
        'return': null,
        'reset': null,
        'info': null,
        'help': null,
        'audio': null,
        'about': null
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
    readyToPaint: false,
    progressMax: 100,
    progress: 0,
    hasProgress: false,
    progressActive: false,
    progressStartTime: 0,
    attach: function (player) {
        if (this.player !== null)
            this.detach();
        this.player = player;
        this.$div.prepend(this.player.$div);
    },
    detach: function () {
        if (this.player !== null) {
            this.player.$div.detach();
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
            for (var i = 0; i < Skin.prototype._skinStack; i++) {
                sk = Skin.prototype._skinStack[i];
                if (sk.name === skinName && sk.ps === ps)
                    return sk;
            }
        }
        var cl = Skin.prototype._CLASSES[skinName ? skinName : 'DefaultSkin'];
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
        return AWT.Container.prototype.updateContent.call(this);
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
    equals: function (skin) {
        return skin && this.name === skin.name && this.ps === skin.ps;
    },
    getMsgBox: function () {
        return null;
    },
    $getTopComponent: function () {
        return this.$div;
    }
};
Skin.prototype = $.extend(Object.create(AWT.Container.prototype), Skin.prototype);
module.exports = Skin;
},{"../AWT":2,"../Utils":8,"jquery":1}]},{},[5]);
