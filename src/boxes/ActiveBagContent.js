/**
 *  File    : boxes/ActiveBagContent.js
 *  Created : 13/04/2015
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

define([
  "jquery",
  "./BoxBase",
  "./ActiveBoxContent",
  "../shapers/Shaper",
  "../AWT",
  "../Utils"
], function ($, BoxBase, ActiveBoxContent, Shaper, AWT, Utils) {

  /**
   * This class packs a collection of {@link ActiveBoxContent} objects and provides methods to access
   * and manage it. The two main members of `ActiveBagContent` are the {@link Shaper}, responsible for
   * determining the position and shape of each {@link ActiveBox}, and the {@link BoxBase} (field `bb`),
   * provider of a common visual style.
   * @exports ActiveBagContent
   * @class
   * @param {string=} id - An optional text tag identifying this ActiveBagContent
   * @param {number} ncw - In grid-based distributions, number of columns.
   * @param {number} nch - In grid-based distributions, number of rows.
   */
  var ActiveBagContent = function (id, ncw, nch) {
    if (id)
      this.id = id;
    this.activeBoxContentArray = [];
    this.ncw = Math.max(1, ncw);
    this.nch = Math.max(1, nch);
  };

  ActiveBagContent.prototype = {
    constructor: ActiveBagContent,
    /**
     * The global identifier of this object: `primary`, `secondary`...
     * @type {string} */
    id: 'primary',
    /**
     * The name of the image file used as a common image of this bag
     * @type {string} */
    imgName: null,
    /**
     * The built image object
     * @type {external:HTMLImageElement} */
    img: null,
    /**
     * Name of the img source when is an animated GIF
     * @type {string} */
    animatedGifFile: null,
    /**
     * Number of columns when cells are distributed in a grid
     * @type {number} */
    ncw: 1,
    /**
     * Number of rows when cells are distributed in a grid
     * @type {number} */
    nch: 1,
    /**
     * Optimal cell width
     * @type {number} */
    w: Utils.settings.DEFAULT_GRID_ELEMENT_SIZE,
    /**
     * Optimal cell height
     * @type {number} */
    h: Utils.settings.DEFAULT_GRID_ELEMENT_SIZE,
    /**
     * Whether the cells must have a border or not
     * @type {boolean} */
    border: true,
    /**
     * The BoxBase used for this bag of cell contents
     * @type {BoxBase} */
    bb: null,
    /**
     * The Shaper used to define the specific shape of each cell
     * @type {Shaper} */
    shaper: null,
    /**
     * An optional ActiveBoxContent object with background settings.
     * @type {ActiveBoxContent} */
    backgroundContent: null,
    /**
     * The main Array of {@link ActiveBoxContent} objects
     * @type {ActiveBoxContent[]} */
    activeBoxContentArray: null,
    /**
     * The default value to be assigned at the 'id' field of children
     * @type {number} */
    defaultIdValue: -1,
    /**
     *
     * Loads the object settings from a specific JQuery XML element
     * @param {external:jQuery} $xml - The XML element to parse
     * @param {MediaBag} mediaBag - The project's MediaBag
     */
    setProperties: function ($xml, mediaBag) {

      var cellSet = this,
          bug = false,
          i, n;

      $.each($xml.get(0).attributes, function () {
        var val = this.value;
        switch (this.name) {
          case 'id':
            cellSet.id = val;
            break;
          case 'image':
            cellSet.imgName = Utils.nSlash(val);
            break;
            // Bug in JClic beta 1: "columns" is number of rows, and "rows" is number of columns.
            // Was corrected in beta 2: If "cols" is specified, "rows" are rows and "cols" are columns.
          case 'rows':
            cellSet.nch = Number(val);
            break;
          case 'columns':
            bug = true;
            /* falls through */
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
            var shaperClassName = $node.attr('class'),
                nCols = Math.max(1, $node.attr('cols')),
                nRows = Math.max(1, $node.attr('rows'));
            cellSet.shaper = Shaper.getShaper(shaperClassName, nCols, nRows);
            cellSet.shaper.setProperties($node);
            break;
          case 'ids':
            // Used in special cases where all cells have empty content with only 'ids'
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

      // Create cells when `activeBoxContentArray` is empty
      if (n === 0 && cellSet.shaper && cellSet.shaper.nCells > 0) {
        n = cellSet.shaper.nCells;
        this.getActiveBoxContent(n - 1);
      }

      // Assign ids when cells have empty content (they are just shapes)
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

      // Link [BoxBase](BoxBase.html) objects of `activeBoxContentArray` elements to `bb`
      if (cellSet.bb) {
        $.each(cellSet.activeBoxContentArray, function (i, cellContent) {
          if (cellContent.bb)
            cellContent.bb.parent = cellSet.bb;
        });
      }
      return this;
    },
    /**
     *
     * Prepares the media content of all elements
     * @param {PlayStation} playStation - The {@link JClicPlayer}
     */
    prepareMedia: function (playStation) {
      for (var i = 0; i < this.activeBoxContentArray.length; i++) {
        this.activeBoxContentArray[i].prepareMedia(playStation);
      }
    },
    /**
     *
     * Gets the estimated total width of this content bag
     * @returns {number}
     */
    getTotalWidth: function () {
      return this.w * this.ncw;
    },
    /**
     *
     * Gets the estimated total height of this bag
     * @returns {number}
     */
    getTotalHeight: function () {
      return this.h * this.nch;
    },
    /**
     *
     * Gets the total number of cells of this bag
     * @returns {number}
     */
    getNumCells: function () {
      return this.activeBoxContentArray.length;
    },
    /**
     *
     * Checks if the bag is empty
     * @returns {boolean}
     */
    isEmpty: function () {
      return this.activeBoxContentArray.length === 0;
    },
    /**
     *
     * Retrieves the {@link Shaper} of this bag, creating a new one if it was _null_
     * @returns {Shaper}
     */
    getShaper: function () {
      if (this.shaper === null)
        this.shaper = Shaper.getShaper('@Rectangular', this.ncw, this.nch);
      return this.shaper;
    },
    /**
     * 
     * Retrieves the {@link BoxBase} of this bag, creating a new one if it was _null_
     * @returns {BoxBase}
     */
    getBoxBase: function() {
      if(this.bb === null)
        this.bb = new BoxBase();
      return this.bb;      
    },
    /**
     *
     * Adds a new {@link ActiveBoxContent} to this bag
     * @param {ActiveBoxContent} ab - The ActiveBoxContent to add
     */
    addActiveBoxContent: function (ab) {
      this.activeBoxContentArray.push(ab);
      if (this.ncw === 0 || this.nch === 0) {
        this.ncw = 1;
        this.nch = 1;
      }
    },
    /**
     *
     * Gets the nth {@link ActiveBoxContent} in `activeBoxContentArray`
     * @param {number} i - The index of the content to be retrieved
     * @returns {ActiveBoxContent}
     */
    getActiveBoxContent: function (i) {
      if (i >= this.activeBoxContentArray.length) {
        for (var j = this.activeBoxContentArray.length; j <= i; j++)
          this.activeBoxContentArray.push(new ActiveBoxContent());
      }
      return this.activeBoxContentArray[i];
    },
    /**
     *
     * Finds the ActiveBoxContent with specific `id` and `item` values
     * @param {number} id
     * @param {number} item
     * @returns {ActiveBoxContent}
     */
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
    /**
     *
     * Sets the content of the cells based on a image spliced by a shaper
     * @param {MediaBag} mb - The MediaBag used to retrieve the image
     * @param {Shaper} sh - The Shaper used to splice the image
     * @param {boolean} roundSizes - When `true`, the size and coordinates of cells will be rounded
     * to the nearest integer values.
     */
    setImgContent: function (mb, sh, roundSizes) {
      if (sh)
        this.setShaper(sh);

      if (this.shaper.className === '@Holes')
        this.shaper.hasRemainder = true;

      this.ncw = this.shaper.nCols;
      this.nch = this.shaper.nRows;
      var mbe = mb.elements[this.imgName];
      if (mb && this.imgName && mbe && mbe.ready) {
        this.img = mbe.data;
        if (mbe.animated)
          this.animatedGifFile = mbe.getFullPath();
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
        this.getActiveBoxContent(i).setImgContent(this.img, this.shaper.getShape(i, r), this.animatedGifFile);
      }
      if (this.shaper.hasRemainder) {
        this.backgroundContent = new ActiveBoxContent();
        this.backgroundContent.setImgContent(this.img, this.shaper.getRemainderShape(r));
      }
    },
    /**
     *
     * Sets the content of this bag based on an array of strings
     * @param {string[]} txt - The array of strings to be used as content.
     * @param {number} setNcw - Number of columns
     * @param {number} setNch - Number of rows
     */
    setTextContent: function (txt, setNcw, setNch) {
      this.ncw = Math.max(1, setNcw);
      this.nch = Math.max(1, setNch);
      var n = this.ncw * this.nch;
      for (var i = 0; i < n; i++) {
        this.getActiveBoxContent(i).setTextContent(
            i >= txt.length || txt[i] === null ? '' : txt[i]);
      }
    },
    /**
     *
     * Sets `id` values to a all the {@link ActiveBoxContent} elements of his bag.
     * @param {number[]} ids -Array of numeric identifiers
     */
    setIds: function (ids) {
      for (var i = 0; i < this.activeBoxContentArray.length; i++)
        if (i < ids.length)
          this.getActiveBoxContent(i).id = ids[i];
    },
    /**
     * 
     * Sets `value` to the `key` attribute of all cells
     * @param {string} key - The key where the value will be stored
     * @param {*} value - The supplied value. Can be of any type.
     */
    setCellsAttribute: function(key, value){
      for (var i = 0; i < this.activeBoxContentArray.length; i++)
        this.getActiveBoxContent(i)[key] = value;      
    },
    /**
     *
     * Cheks if the `id` values of all {@link ActiveBoxContent} objects are -1 and, if true,
     * sets new ids to them, with values between 0 and `maxId`
     * @param {number} maxId - The maximum value of identifiers
     */
    avoidAllIdsNull: function (maxId) {

      var i, allIdsNull = true,
          numCells = this.activeBoxContentArray.length;

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

  return ActiveBagContent;
});
