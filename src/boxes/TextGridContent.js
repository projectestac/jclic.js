/**
 *  File    : boxes/TextGridContent.js
 *  Created : 14/04/2015
 *  By      : Francesc Busquets <francesc@gmail.com>
 *
 *  JClic.js
 *  An HTML5 player of JClic activities
 *  https://projectestac.github.io/jclic.js
 *
 *  @source https://github.com/projectestac/jclic.js
 *
 *  @license EUPL-1.1
 *  @licstart
 *  (c) 2000-2016 Catalan Educational Telematic Network (XTEC)
 *
 *  Licensed under the EUPL, Version 1.1 or -as soon they will be approved by
 *  the European Commission- subsequent versions of the EUPL (the "Licence");
 *  You may not use this work except in compliance with the Licence.
 *
 *  You may obtain a copy of the Licence at:
 *  https://joinup.ec.europa.eu/software/page/eupl
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the Licence is distributed on an "AS IS" basis, WITHOUT
 *  WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 *  Licence for the specific language governing permissions and limitations
 *  under the Licence.
 *  @licend
 */

/* global define */

define([
  "jquery",
  "../Utils",
  "./BoxBase"
], function ($, Utils, BoxBase) {

  /**
   * This class encapsulates the content of {@link TextGrid} objects.
   *
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
     * Whether the cells must be surrounded by a border or not
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
     * Counts the total number of characters, including wildcard characters.
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
