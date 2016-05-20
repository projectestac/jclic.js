/* global Promise */

//    File    : Utils.js  
//    Created : 01/04/2015  
//    By      : Francesc Busquets  
//
//    JClic.js  
//    HTML5 player of [JClic](http://clic.xtec.cat) activities  
//    https://github.com/projectestac/jclic.js  
//    (c) 2000-2015 Catalan Educational Telematic Network (XTEC)  
//    This program is free software: you can redistribute it and/or modify it under the terms of
//    the GNU General Public License as published by the Free Software Foundation, version. This
//    program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without
//    even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
//    General Public License for more details. You should have received a copy of the GNU General
//    Public License along with this program. If not, see [http://www.gnu.org/licenses/].  

define([
  "jquery",
  "screenfull"
], function ($, screenfull) {

  // In some cases, require.js does not return a valid value for screenfull. Check it:
  if (!screenfull)
    screenfull = window.screenfull;

  /**
   * 
   * Miscellaneous utility functions and constants
   * @exports Utils
   * @class
   * @abstract
   */
  var Utils = {
    /**
     * Gets a boolean value from a textual expression
     * @param {string} val - The value to be parsed (`true` for true, null or otherwise for `false`)
     * @param {boolean=} [defaultValue=false] - The default value to return when `val` is false
     * @returns {number}
     */
    getBoolean: function (val, defaultValue) {
      return val === 'true' ? true : val === 'false' ? false : defaultValue;
    },
    /**
     * Gets a value from an given expression that can bel `null`, `undefined` or empty string ('')
     * @param {?*} val - The expression to parse
     * @param {?*} defaultValue - The value to return when `val` is `null`, `''` or `undefined`
     * @returns {*}
     */
    getVal: function (val, defaultValue) {
      return (val === '' || val === null || typeof val === 'undefined')
          ? (defaultValue ? defaultValue : null)
          : val;
    },
    /**
     * Gets a number from a string or another number
     * @param {?*} val - The expression to parse
     * @param {number} defaultValue - The default value
     * @returns {number}
     */
    getNumber: function (val, defaultValue) {
      return Number(Utils.getVal(val, defaultValue));
    },
    /**
     * Gets the plain percent expression (without decimals) of the given value
     * @param {number} val - The value to be expressed as a percentile
     * @returns {string}
     */
    getPercent: function (val) {
      return Math.round(val * 100) + '%';
    },
    /**
     * Returns a given time in [00h 00'00"] format
     * @param {number} millis - Amount of milliseconds to be processed
     * @returns {string}
     */
    getHMStime: function (millis) {
      var d = new Date(millis);
      var h = d.getUTCHours(), m = d.getUTCMinutes(), s = d.getUTCSeconds();
      return (h ? h + 'h ' : '') + ((h || m) ? m + '\'' : '') + s + '"';
    },
    /** @const {number} */
    'FALSE': 0,
    /** @const {number} */
    'TRUE': 1,
    /** @const {number} */
    'DEFAULT': 2,
    /**
     * Gets a numeric value (0, 1 or 2) from a set of possible values: `false`, `true` and `default`.
     * @param {?string} val - The text to be parsed
     * @returns {number}
     */
    getTriState: function (val) {
      return Number(val === 'true' ? Utils.TRUE
          : val === 'false' ? Utils.FALSE : Utils.DEFAULT);
    },
    /**
     * Returns a string with the given `tag` repeated n times
     * @param {string} tag - The tag to be repeated
     * @param {number} repeats - The number of times to repeat the tag
     * @returns {string}
     */
    fillString: function (tag, repeats) {
      var s = '';
      for (var i = 0; i < repeats; i++)
        s += tag;
      return s;
    },
    /**
     * Checks if the provided value is 'null' or 'undefined'.
     * @param {*} val - The value to be parsed
     * @returns {boolean}
     */
    isNullOrUndef: function (val) {
      return (typeof val === 'undefined' || val === null);
    },
    /**
     * Checks if two expressions are equivalent.<br>
     * Returns `true` when both parameters are `null` or `undefined`, and also when both have
     * equivalent values.
     * @param {!*} a
     * @param {!*} b
     * @returns {boolean}
     */
    isEquivalent: function (a, b) {
      return ((typeof a === 'undefined' || a === null) && (typeof b === 'undefined' || b === null)) ||
          a === b;
    },
    /**
     * Reads paragraphs, identified by `<p></p>` elements, inside XML data
     * @param {object} xml - The DOM-XML element to be parsed
     * @returns {string}
     */
    getXmlText: function (xml) {
      var text = '';
      $(xml).children('p').each(function () {
        text += '<p>' + this.textContent + '</p>';
      });
      return text;
    },
    /**
     * Creates a string suitable to be used in the 'style' attribute of HTML tags, filled with the
     * CSS attributes contained in the provided object.
     * @param {object} cssObj
     * @returns {string}
     */
    cssToString: function (cssObj) {
      var s = '';
      $.each(cssObj, function (key, value) {
        s += key + ': ' + value + ';';
      });
      return s;
    },
    /**
     * Converts java-like color codes (like '0xRRGGBB') to valid CSS values like '#RRGGBB' or 'rgba(r,g,b,a)'
     * @param {?string} color - A color, as codified in java
     * @param {?string} defaultColor - The default color to be used
     * @returns {string}
     */
    checkColor: function (color, defaultColor) {

      if (typeof color === 'undefined' || color === null) {
        color = defaultColor;
        if (typeof color === 'undefined' || color === null)
          color = Utils.settings.BoxBase.BACK_COLOR;
      }

      var col = color.replace('0x', '#');

      // Check for Alpha value
      if (col.charAt(0) === '#' && col.length > 7) {
        var alpha = parseInt(col.substring(1, 3), 16) / 255.0;
        col = 'rgba(' +
            parseInt(col.substring(3, 5), 16) + ',' +
            parseInt(col.substring(5, 7), 16) + ',' +
            parseInt(col.substring(7, 9), 16) + ',' +
            alpha + ')';
      }
      return col;
    },
    /**
     * Checks if the provided color has an alpha value less than 1
     * @param {string} color - The color to be analyzed
     * @returns {boolean}
     */
    colorHasTransparency: function (color) {
      var result = false;
      if (color.indexOf('rgba(') === 0) {
        var p = color.lastIndexOf(',');
        var alpha = parseint(color.substr(p));
        result = (typeof alpha === 'number') && alpha < 1.0;
      }
      return result;
    },
    /**
     * Clones the provided object
     * @param {object} obj
     * @returns {object}
     */
    cloneObject: function (obj) {
      return $.extend(true, {}, obj);
    },
    /**
     * Converts string values to number or boolean when needed
     * @param {Object} obj - The object to be processed
     * @returns {Object} - A new object with normalized content
     */
    normalizeObject: function (obj) {
      var result = {};
      if (obj)
        $.each(obj, function (key, value) {
          var s;
          if (typeof value === 'string' && (s = value.trim().toLowerCase()) !== '') {
            value = s === 'true' ? true : s === 'false' ? false : isNaN(s) ? value : Number(s);
          }
          result[key] = value;
        });
      return result;
    },
    /**
     * Check if the given char is a separator
     * @param {string} ch - A string with a single character
     * @returns {boolean}
     */
    isSeparator: function (ch) {
      return ' .,;-|'.indexOf(ch) >= 0;
    },
    /**
     * Rounds `v` to the nearest multiple of `n`
     * @param {number} v
     * @param {number} n - Cannot be zero!
     * @returns {number}
     */
    roundTo: function (v, n) {
      return (Math.round(v / n)) * n;
    },
    /**
     * Compares the provided answer against multiple valid options. These valid options are
     * concatenated in a string, separed by pipe chars (`|`). The comparision can be case sensitive.
     * @param {string} answer - The text to check against to
     * @param {string} check - String containing one or multiple options, separed by `|`
     * @param {boolean} checkCase - When true, the comparision will be case-sensitive
     * @returns {boolean}
     */
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
    /**
     * Checks if the given string ends with the specified expression
     * @param {string} text - The string where to find the expression
     * @param {string} expr - The expression to search
     * @returns {boolean}
     */
    endsWith: function (text, expr) {
      return text.indexOf(expr, text.length - expr.length) !== -1;
    },
    /**
     * Replaces al occurrences of the backslash character (`\`) by a regular slash (`/`)
     * This is useful to normalize bad path names present in some old JClic projects
     * @param {String} str - The string to be normalized
     * @returns {string}
     */
    nSlash: function (str) {
      return str ? str.replace(/\\/g, '/') : str;
    },
    /**
     * Checks if the given expression is an absolute URL
     * @param {string} exp - The expression to be checked
     * @returns {boolean}
     */
    isURL: function (exp) {
      var path = /^(filesystem:)?(https?|file|data|ftps?):/i;
      return path.test(exp);
    },
    /**
     * Gets the base path of the given file path (absolute or full URL). This base path always ends
     * with `/`, meaning it can be concatenated with relative paths without adding a separator.
     * @param {type} path - The full path to be parsed
     * @returns {string}
     */
    getBasePath: function (path) {
      var result = '';
      var p = path.lastIndexOf('/');
      if (p >= 0)
        result = path.substring(0, p + 1);
      return result;
    },
    /**
     * Gets the full path of `file` relative to `basePath`
     * @param {string} file - The file name
     * @param {?string} path - The base path
     * @returns {string}
     */
    getRelativePath: function (file, path) {
      if (!path || path === '' | file.indexOf(path) !== 0)
        return file;
      else
        return file.substr(path.length);
    },
    /**
     * Gets the complete path of a relative or absolute URL, using the provided `basePath`
     * @param {string} basePath - The base URL
     * @param {string} path - The filename
     * @returns {string}
     */
    getPath: function (basePath, path) {
      return Utils.isURL(path) ? path : basePath + path;
    },
    /**
     * Gets a promise with the complete path of a relative or absolute URL, using the provided `basePath`
     * @param {string} basePath - The base URL
     * @param {string} path - The filename
     * @param {?JSZip} zip - An optional [JSZip](https://stuk.github.io/jszip/) object where to look
     * for the file
     * @returns {Promise}
     */
    getPathPromise: function (basePath, path, zip) {
      if (zip) {
        var fName = Utils.getRelativePath(basePath + path, zip.zipBasePath);
        if (zip.files[fName]) {
          return new Promise(function (resolve, reject) {
            zip.file(fName).async('base64').then(function (data) {
              var ext = path.toLowerCase().split('.').pop();
              var mime = Utils.settings.MIME_TYPES[ext];
              if (!mime)
                mime = 'application/octet-stream';
              resolve('data:' + mime + ';base64,' + data);
            }).catch(reject);
          });
        }
      }
      return Promise.resolve(Utils.getPath(basePath, path));
    },
    /**
     * Utility object that provides several methods to build simple and complex DOM objects
     * @type {object}
     */
    $HTML: {
      table: function () {
        return $('<table/>').css({border: '1px solid black'});
      },
      doubleCell: function (a, b) {
        return $('<tr/>').append($('<td/>').html(a)).append($('<td/>').html(b));
      },
      p: function (txt) {
        return $('<p/>').html(txt);
      },
      td: function(txt){
        return $('<td/>').html(txt);
      }
    },
    /**
     * Checks if the current browser allows to put HTML elements in full screen mode
     * @returns {boolean}
     */
    screenFullAllowed: function () {
      return screenfull && screenfull.enabled;
    },
    /**
     * Global constants
     * @const
     */
    settings: {
      // layout constants
      AB: 0, BA: 1, AUB: 2, BUA: 3,
      LAYOUT_NAMES: ['AB', 'BA', 'AUB', 'BUA'],
      DEFAULT_WIDTH: 400,
      DEFAULT_HEIGHT: 300,
      MINIMUM_WIDTH: 40,
      MINIMUM_HEIGHT: 40,
      DEFAULT_NAME: '---',
      DEFAULT_MARGIN: 8,
      DEFAULT_SHUFFLES: 31,
      DEFAULT_GRID_ELEMENT_SIZE: 20,
      MIN_CELL_SIZE: 10,
      //DEFAULT_BG_COLOR: '#D3D3D3', // LightGray
      DEFAULT_BG_COLOR: '#C0C0C0', // LightGray
      ACTIONS: {ACTION_MATCH: 'MATCH', ACTION_PLACE: 'PLACE',
        ACTION_WRITE: 'WRITE', ACTION_SELECT: 'SELECT', ACTION_HELP: 'HELP'},
      PREVIOUS: 0, MAIN: 1, END: 2, END_ERROR: 3, NUM_MSG: 4,
      MSG_TYPE: ['previous', 'initial', 'final', 'finalError'],
      RANDOM_CHARS: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      NUM_COUNTERS: 3,
      MAX_RECORD_LENGTH: 20,
      // BoxBase defaults
      BoxBase: {
        REDUCE_FONT_STEP: 1.0,
        MIN_FONT_SIZE: 8,
        STROKE: 1,
        AC_MARGIN: 6,
        //BACK_COLOR: 'lightgray',
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
        audio: 'wav,mp3,ogg,oga,au,aiff,flac',
        video: 'avi,mov,mpeg,mp4,ogv,m4v,webm',
        font: 'ttf,otf,eot,woff,woff2',
        midi: 'mid,midi',
        anim: 'swf',
        // Used in custom skins
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
        mp4: 'video/mp4',
        m4v: 'video/mp4',
        ogg: 'audio/ogg',
        oga: 'audio/ogg',
        ogv: 'video/ogg',
        webm: 'video/webm',
        au: 'audio/basic',
        aiff: 'audio/x-aiff',
        flac: 'audio/flac',
        avi: 'video/avi',
        mov: 'video/quicktime',
        mpeg: 'video/mpeg',
        ttf: 'application/font-sfnt',
        otf: 'application/font-sfnt',
        eot: ' application/vnd.ms-fontobject',
        woff: 'application/font-woff',
        woff2: 'application/font-woff2',
        swf: 'application/x-shockwave-flash'
      },
      // Global settings susceptible to be modified
      COMPRESS_IMAGES: true,
      // Keyboard key codes
      VK: {
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40
      },
      // Flag to indicate that we are running on a touch device
      TOUCH_DEVICE: false,
      // Amount of time (in milliseconds) to wait before a media resource is loaded
      LOAD_TIMEOUT: 10000,
      // Number of points to be calculated as polygon vertexs when simplifying bezier curves
      BEZIER_POINTS: 4
    },
    //
    // Functions useful to deal with caret position in `contentEditable` DOM elements
    //
    /**
     * Gets the caret position within the given element. Thanks to
     * {@link http://stackoverflow.com/users/96100/tim-down|Tim Down} answers in:
     * {@link http://stackoverflow.com/questions/4811822/get-a-ranges-start-and-end-offsets-relative-to-its-parent-container}
     * and {@link http://stackoverflow.com/questions/6240139/highlight-text-range-using-javascript/6242538}
     * @param {object} element - A DOM element
     * @returns {number}
     */
    getCaretCharacterOffsetWithin: function (element) {
      var caretOffset = 0;
      var doc = element.ownerDocument || element.document;
      var win = doc.defaultView || doc.parentWindow;
      var sel;
      if (typeof win.getSelection !== "undefined") {
        sel = win.getSelection();
        if (sel.rangeCount > 0) {
          var range = win.getSelection().getRangeAt(0);
          var preCaretRange = range.cloneRange();
          preCaretRange.selectNodeContents(element);
          preCaretRange.setEnd(range.endContainer, range.endOffset);
          caretOffset = preCaretRange.toString().length;
        }
      } else if ((sel = doc.selection) && sel.type !== "Control") {
        var textRange = sel.createRange();
        var preCaretTextRange = doc.body.createTextRange();
        preCaretTextRange.moveToElementText(element);
        preCaretTextRange.setEndPoint("EndToEnd", textRange);
        caretOffset = preCaretTextRange.text.length;
      }
      return caretOffset;
    },
    /**
     * Utility function called by {@link Utils~getCaretCharacterOffsetWithin}
     * @param {object} node - A text node
     * @returns {object[]}
     */
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
    /**
     * Sets the selection range (or the cursor position, when `start` and `end` are the same) to a
     * specific position inside a DOM element.
     * @param {object} el - The DOM element where to set the cursor
     * @param {number} start - The start position of the selection (or cursor position)
     * @param {type} end - The end position of the selection. When null or identical to `start`,
     * indicates a cursor position.
     */
    setSelectionRange: function (el, start, end) {
      if (Utils.isNullOrUndef(end))
        end = start;
      if (document.createRange && window.getSelection) {
        var range = document.createRange();
        range.selectNodeContents(el);
        var textNodes = Utils.getTextNodesIn(el);
        var foundStart = false;
        var charCount = 0, endCharCount;

        for (var i = 0, textNode; (textNode = textNodes[i++]); ) {
          endCharCount = charCount + textNode.length;
          if (!foundStart && start >= charCount &&
              (start < endCharCount ||
                  (start === endCharCount && i <= textNodes.length))) {
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
        textRange.moveEnd("character", end);
        textRange.moveStart("character", start);
        textRange.select();
      }
    }
  };
  return Utils;
});