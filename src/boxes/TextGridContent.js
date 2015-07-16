//    File    : TextGridContent.js  
//    Created : 14/04/2015  
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
  "../Utils",
  "./BoxBase"
], function ($, Utils, BoxBase) {

  /**
   * This class encapsulates the content of {@link TextGrid} objects.<br>
   * It implements methods to set and retrieve individual characters on the grid, and parsing of
   * XML objects. It also contains information about the optimal size and other graphic properties
   * (fonts, colors, etc.) of the grid.
   * @exports TextGridContent
   * @class
   */
  var TextGridContent = function () {
    this.bb = new BoxBase(null);
    this.text = [];
  };

  TextGridContent.prototype = {
    constructor: TextGridContent,
    /**
     * Grid columns
     * @type {number} */
    ncw: 1,
    /**
     * Grid rows
     * @type {number} */
    nch: 1,
    /**
     * Width of cells
     * @type {number} */
    w: 20,
    /**
     * Height of cells
     * @type {number} */
    h: 20,
    /**
     * Whether the cells must be surronded by a border or not
     * @type {boolean} */
    border: false,
    /**
     * The {@link BoxBase} object with visual settings of the text grid
     * @type {BoxBase} */
    bb: null,
    /**
     * An array of String objects containing the chars of cells. One string per row, one character of
     * this string per cell.
     * @type {string[]} */
    text: null,
    /**
     * The letter used as wildcard
     * @type {string} */
    wild: '*',
    /**
     * A String with the chars to take as source when randomly filling empty cells
     * @type {string} */
    randomChars: Utils.settings.RANDOM_CHARS,
    /**
     * 
     * Loads the object settings from a specific JQuery XML element
     * @param {external:jQuery} $xml
     */
    setProperties: function ($xml) {

      var textGrid = this;

      // Read attributes
      $.each($xml.get(0).attributes, function () {
        var name = this.name;
        var val = this.value;
        switch (name) {
          case 'rows':
            // WARNING: Due to a bug in JClic, the meaning of "rows" and "columns" must be
            // interchanged:
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

      // Read inner elements
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
    /**
     * 
     * Counts the number of wildcard characters present in this TextGrid
     * @returns {number}
     */
    countWildChars: function () {
      var result = 0;
      if (this.text)
        for (var y = 0; y < this.nch; y++)
          for (var x = 0; x < this.ncw; x++)
            if (this.text[y].charAt(x) === this.wild)
              result++;
      return result;
    },
    /**
     * 
     * Counts the total number of characters, including wildcards.
     * @returns {Number}
     */
    getNumChars: function () {
      return this.ncw * this.nch;
    },
    /**
     * 
     * Sets the specified character as a content of the cell located at specific coordinates
     * @param {number} x - The X coordinate of the cell
     * @param {number} y - The X coordinate of the cell
     * @param {string} ch - The character to be placed on the specified cell
     */
    setCharAt: function (x, y, ch) {
      if (x >= 0 && x < this.ncw && y >= 0 && y < this.nch)
        this.text[y] = this.text[y].substring(0, x) + ch + this.text[y].substring(x + 1);
    }
  };

  return TextGridContent;

});
