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
  "jquery"
], function ($) {

// Miscellaneous utilities
  var Utils = {
    // 
    // Gets a boolean value (0 or 1) from a textual expression
    // - val: The value to be parsed ('true' for 1, otherwise for 'false')
    // - defaultValue: The value to be returned by default. Defaults to 1.
    getBoolean: function (val, defaultValue) {
      return Number(val === 'true' | defaultValue ? 1 : 0);
    },
    //
    // Gets a value from an given expression that can bel null, empty or undefined
    getVal: function (val, defaultValue) {
      return (val === '' || val === null || typeof val === 'undefined') ? defaultValue : val;
    },
    //
    // Gets a number from a string or another number
    getNumber: function (val, defaultValue) {
      return Number(this.getVal(val, defaultValue));
    },
    // 
    // Gets a tri-state value (0, 1 or 2) from a set of 'false', 'true' and
    // 'default' possible values.
    // - val: The text to be parsed.
    'FALSE': 0,
    'TRUE': 1,
    'DEFAULT': 2,
    getTriState: function (val) {
      return Number(val === 'true' ? this.TRUE
          : val === 'false' ? this.FALSE : this.DEFAULT);
    },
    // 
    // Checks if the provided variable name is 'null' or 'undefined'.
    // - variable: The variable name to be examined.
    isNullOrUndef: function (variable) {
      return (typeof variable === 'undefined' || variable === null);
    },
    // 
    // Reads 'p' blocks inside XML elements
    getXmlText: function (xml) {
      var text = '';
      $(xml).children('p').each(function () {
        text += '<p>' + this.textContent + '</p>';
      });
      return text;
    },
    //
    // Creates a String suitable to be used in 'style' attribute of HTML tags,
    // filled with the CSS attributes contained in an object
    cssToString: function (cssObj) {
      var s = '';
      $.each(cssObj, function (key, value) {
        s += key + ': ' + value + ';';
      });
      return s;
    },
    // 
    // Converts java-like color codes (like '0xRRGGBB') to valid CSS values
    // like '#RRGGBB' or 'rgba(r,g,b,a)'
    checkColor: function (color, defaultColor) {

      if (typeof color === 'undefined' || color === null) {
        color = defaultColor;
        if (typeof color === 'undefined' || color === null)
          color = this.settings.BoxBase.BACK_COLOR;
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
    //
    // Checks if the provided color (a String) has alpha value less than one
    colorHasTransparency: function (color) {
      var result = false;
      if (color.indexOf('rgba(') === 0) {
        var p = color.lastIndexOf(',');
        var alpha = parseint(color.substr(p));
        result = (typeof alpha === 'number') && alpha < 1.0;
      }
      return result;
    },
    // 
    // Clone object
    cloneObject: function (obj) {
      return $.extend(true, {}, obj);
    },
    // Check if the given char is a separator
    isSeparator: function (ch) {
      return ' .,;-|'.indexOf(ch) >= 0;
    },
    // Rounds `v` to the nearest multiple of `n`
    roundTo: function (v, n) {
      return (Math.round(v / n)) * n;
    },
    //
    // Compares the provided answer against multiple valid options. These valid options are
    // concatenated in a string, separed by pipe chars (`|`). The comparision can be case sensitive.
    // answer (String) - The text to check against to
    // check (String) - String containing one or multiple options, separed by `|`
    // checkCase (Boolean) - When true, the comparision must be case sensitive    
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
    //
    // Checks if the given string ends with the specified expression
    // text (String) - The string where to find the expression
    // expr (String) - The expression to search for
    endsWith: function (text, expr) {
      return text.indexOf(expr, text.length - expr.length) !== -1;
    },
    // 
    // Checks if the given expressin is an absolute URL
    // expr (String) - The expression to be checked
    isURL: function (exp) {
      var path = /^(https?|file|ftps?):\/\//i;
      return path.test(exp);
    },
    //
    // Get the base path of the given file path (absolute or full URL)
    // This base path always ends with `/`, meaning it can be concatenated with relative paths
    // without adding a separator.
    getBasePath: function (exp) {
      var result = '';
      var p = exp.lastIndexOf('/');
      if (p >= 0)
        result = exp.substring(0, p + 1);
      return result;
    },
    //
    // Get the complete path of a relative or absolute URL, using the provided `basePath`
    getPath: function (basePath, path) {
      if (Utils.isURL(path))
        return path;
      else
        return basePath + path;
    },
    // 
    // Global constants
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
        audio: 'wav,mp3,ogg,au,aiff',
        video: 'avi,mov,mpeg',
        font: 'ttf,otf,eot,woff,woff2',
        midi: 'mid,midi',
        // Used in custom skins
        xml: 'xml'
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
      // Flag to indicate if we are running on a touch device
      TOUCH_DEVICE: false
    }
  };

  return Utils;
});