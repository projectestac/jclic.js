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
 *  (c) 2000-2019 Educational Telematic Network of Catalonia (XTEC)
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
  class TextGridContent {
    /**
     * TextGridContent constructor
     */
    constructor() {
      this.bb = new BoxBase(null);
      this.text = [];
    }

    /**
     * Loads the object settings from a specific JQuery XML element
     * @param {external:jQuery} $xml
     */
    setProperties($xml) {
      // Read attributes
      Utils.attrForEach($xml.get(0).attributes, (name, val) => {
        switch (name) {
          case 'rows':
            // WARNING: Due to a bug in JClic, the meaning of "rows" and "columns" must be
            // interchanged:
            this.ncw = Number(val);
            break;
          case 'columns':
            this.nch = Number(val);
            break;
          case 'cellWidth':
            this.w = Number(val);
            break;
          case 'cellHeight':
            this.h = Number(val);
            break;
          case 'border':
            this.border = Utils.getBoolean(val);
            break;
          case 'wild':
          case 'randomChars':
            this[name] = val;
            break;
        }
      });

      // Read inner elements
      $xml.children('style:first').each((_n, child) => {
        this.bb = new BoxBase().setProperties($(child));
      });

      $xml.find('text:first > row').each((_n, el) => this.text.push(el.textContent));

      for (let i = this.text.length; i < this.nch; i++)
        this.text[i] = '';

      return this;
    }

    getData() {
      return Utils.getData(this, [
        'ncw', 'nch',
        'w', 'h',
        'text',
        'bb', 'border',
        'wild', 'randomChars'
      ]);
    }

    /**
     * Counts the number of wildcard characters present in this TextGrid
     * @returns {number}
     */
    countWildChars() {
      let result = 0;
      if (this.text)
        for (let y = 0; y < this.nch; y++)
          for (let x = 0; x < this.ncw; x++)
            if (this.text[y].charAt(x) === this.wild)
              result++;
      return result;
    }

    /**
     * Counts the total number of characters, including wildcard characters.
     * @returns {Number}
     */
    getNumChars() {
      return this.ncw * this.nch;
    }

    /**
     * Sets the specified character as a content of the cell located at specific coordinates
     * @param {number} x - The X coordinate of the cell
     * @param {number} y - The X coordinate of the cell
     * @param {string} ch - The character to be placed on the specified cell
     */
    setCharAt(x, y, ch) {
      if (x >= 0 && x < this.ncw && y >= 0 && y < this.nch)
        this.text[y] = this.text[y].substring(0, x) + ch + this.text[y].substring(x + 1);
    }
  }

  Object.assign(TextGridContent.prototype, {
    /**
     * Grid columns
     * @name TextGridContent#ncw
     * @type {number} */
    ncw: 1,
    /**
     * Grid rows
     * @name TextGridContent#nch
     * @type {number} */
    nch: 1,
    /**
     * Width of cells
     * @name TextGridContent#w
     * @type {number} */
    w: 20,
    /**
     * Height of cells
     * @name TextGridContent#h
     * @type {number} */
    h: 20,
    /**
     * Whether the cells must be surrounded by a border or not
     * @name TextGridContent#border
     * @type {boolean} */
    border: false,
    /**
     * The {@link BoxBase} object with visual settings of the text grid
     * @name TextGridContent#bb
     * @type {BoxBase} */
    bb: null,
    /**
     * An array of String objects containing the chars of cells. One string per row, one character of
     * this string per cell.
     * @name TextGridContent#text
     * @type {string[]} */
    text: null,
    /**
     * The letter used as wildcard
     * @name TextGridContent#wild
     * @type {string} */
    wild: '*',
    /**
     * A String with the chars to take as source when randomly filling empty cells
     * @name TextGridContent#randomChars
     * @type {string} */
    randomChars: Utils.settings.RANDOM_CHARS,
  });

  return TextGridContent;
});
