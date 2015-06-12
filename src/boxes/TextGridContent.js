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

//
//  This class encapsulates the content [TextGrid](TextGrid.html) objects.
//  It implements methds to set and retrieve individual characters on the grid,
//  and to parse the content from XML objects. It also contains information
//  about the optimal size and graphic properties (font, colors, etc.) of the grid.
//
  var TextGridContent = function () {
    this.bb = new BoxBase(null);
    this.text = [];
  };

  TextGridContent.prototype = {
    constructor: TextGridContent,
    //
    // Number of rows and columns of the grid
    ncw: 1, nch: 1,
    //
    // Width and height of cells
    w: 20, h: 20,
    //
    // The cells must be surronded by a border
    border: false,
    //
    // The [BoxBase](BoxBase.html) object containing the visual settings of the
    // text grid
    bb: null,
    //
    // An array of String objects conteining the chars, one for each row
    text: null,
    //
    // The wildchar
    wild: '*',
    //
    // A String with the chars to take to randomly fill empty cells
    randomChars: Utils.settings.RANDOM_CHARS,
    //
    // Loads the object settings from a specific JQuery XML element 
    setProperties: function ($xml) {

      var textGrid = this;

      // Read attributes
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
    //
    // Counts the noumber of wildchars present in this TextGrid
    countWildChars: function () {
      var result = 0;
      if (this.text)
        for (var y = 0; y < this.nch; y++)
          for (var x = 0; x < this.ncw; x++)
            if (this.text[y].charAt(x) === this.wild)
              result++;
      return result;
    },
    //
    // Counts the total number of characters, including wildcards    
    getNumChars: function () {
      return this.ncw * this.nch;
    },
    //
    // Sets the provided character as a content of the cell located at the x & y coordinates
    // x (Number) - The X coordinate of the cell
    // y (Number) - The y coordinate of the cell
    // ch (String) - The character to place into the specified cell
    setCharAt: function (x, y, ch) {
      if (x >= 0 && x < this.ncw && y >= 0 && y < this.nch)
        this.text[y] = this.text[y].substring(0, x) + ch + this.text[y].substring(x + 1);
    }
  };

  return TextGridContent;

});
