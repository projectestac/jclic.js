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
 *  @license EUPL-1.2
 *  @licstart
 *  (c) 2000-2020 Educational Telematic Network of Catalonia (XTEC)
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
 *  @module
 */

import $ from 'jquery';
import BoxBase from './BoxBase';
import ActiveBoxContent from './ActiveBoxContent';
import Shaper from '../shapers/Shaper';
import { Rectangle } from '../AWT';
import { settings, attrForEach, nSlash, getBoolean, getAttr, setAttr } from '../Utils';

/**
 * This class packs a collection of {@link module:boxes/ActiveBoxContent.ActiveBoxContent ActiveBoxContent} objects and provides methods to access
 * and manage it. The two main members of `ActiveBagContent` are the {@link module:shapers/Shaper.Shaper Shaper}, responsible for
 * determining the position and shape of each {@link module:boxes/ActiveBox.ActiveBox ActiveBox}, and the {@link module:boxes/BoxBase.BoxBase BoxBase} (field `style`),
 * provider of a common visual style.
 */
export class ActiveBagContent {
  /**
   * ActiveBagContent constructor
   * @param {string} [id] - An optional text tag identifying this ActiveBagContent
   * @param {number} ncw - In grid-based distributions, number of columns.
   * @param {number} nch - In grid-based distributions, number of rows.
   */
  constructor(id, ncw, nch) {
    if (id)
      this.id = id;
    this.cells = [];
    this.ncw = Math.max(1, ncw);
    this.nch = Math.max(1, nch);
  }

  /**
   * Loads the object settings from a specific JQuery XML element
   * @param {external:jQuery} $xml - The XML element to parse
   * @param {MediaBag} mediaBag - The project's MediaBag
   */
  setProperties($xml, mediaBag) {
    let bug = false;
    attrForEach($xml.get(0).attributes, (name, val) => {
      switch (name) {
        case 'id':
          this.id = val;
          break;
        case 'image':
          this.image = nSlash(val);
          break;
        // Bug in JClic beta 1: "columns" is number of rows, and "rows" is number of columns.
        // Was corrected in beta 2: If "cols" is specified, "rows" are rows and "cols" are columns.
        case 'rows':
          this.nch = Number(val);
          break;
        case 'columns':
          bug = true;
        /* falls through */
        case 'cols':
          this.ncw = Number(val);
          break;
        case 'cellWidth':
          this.w = Number(val);
          break;
        case 'cellHeight':
          this.h = Number(val);
          break;
        case 'border':
          this.border = getBoolean(val);
          break;
      }
    });

    if (bug) {
      let n = this.ncw;
      this.ncw = this.nch;
      this.nch = n;
    }

    $xml.children().each((_n, child) => {
      const $node = $(child);
      switch (child.nodeName) {
        case 'style':
          this.style = new BoxBase(null).setProperties($node);
          break;
        case 'shaper':
          const shaperClassName = $node.attr('class'),
            nCols = Math.max(1, $node.attr('cols')),
            nRows = Math.max(1, $node.attr('rows'));
          this.shaper = Shaper.getShaper(shaperClassName, nCols, nRows);
          this.shaper.setProperties($node);
          break;
        case 'ids':
          // Used in special cases where all cells have empty content with only 'ids'
          this.ids = child.textContent;
          this.ids.split(' ').forEach((id, i) => { this.cells[i] = new ActiveBoxContent(Number(id)); });
          break;
        case 'cell':
          this.cells.push(new ActiveBoxContent().setProperties($node, mediaBag));
          break;
      }
    });

    let n = this.cells.length;

    // Create cells when `cells` is empty
    if (n === 0 && this.shaper && this.shaper.nCells > 0) {
      this.initiallyEmptyCells = true;
      n = this.shaper.nCells;
      this.getActiveBoxContent(n - 1);
    }

    // Assign ids when cells have empty content (they are just shapes)
    if (n > 0) {
      let empty = true;
      for (let i = 0; i < n; i++) {
        const bxc = this.getActiveBoxContent(i);
        if (bxc.id !== -1 || bxc.item !== -1 || !bxc.isEmpty()) {
          empty = false;
          break;
        }
      }
      if (empty) {
        for (let i = 0; i < n; i++)
          this.getActiveBoxContent(i).id = i;
      }
    }

    // Link [BoxBase](BoxBase.html) objects of `cells` elements to `style`
    if (this.style)
      this.cells.forEach((abc) => { if (abc.style) abc.style.parent = this.style; });

    return this;
  }

  /**
   * Gets a object with the basic attributes needed to rebuild this instance excluding functions,
   * parent references, constants and also attributes retaining the default value.
   * The resulting object is commonly usued to serialize elements in JSON format.
   * @returns {object} - The resulting object, with minimal attrributes
   */
  getAttributes() {
    const fields = [
      'id', 'image',
      'ncw', 'nch',
      'w', 'h', 'border',
      'style', // BoxBase
      'shaper', // Shaper
    ];
    if (!this.initiallyEmptyCells)
      fields.push(this.ids ? 'ids' : 'cells'); // ActiveBoxContent
    return getAttr(this, fields);
  }

  /**
   * Reads the properties of this ActiveBagContent from a data object
   * @param {object} data - The data object to be parsed
   * @param {MediaBag} mediaBag - The project's MediaBag
   * @returns {ActiveBagContent}
   */
  setAttributes(data, mediaBag) {
    setAttr(this, data, [
      'id', 'image',
      'ncw', 'nch',
      'w', 'h', 'border',
      { key: 'style', fn: BoxBase },
      { key: 'shaper', fn: Shaper },
      'ids',
      { key: 'cells', fn: ActiveBoxContent, group: 'array', params: [mediaBag] },
    ]);

    let n = this.cells.length;

    // Create cells when `cells` is empty
    if (n === 0 && this.shaper && this.shaper.nCells > 0) {
      this.initiallyEmptyCells = true;
      n = this.shaper.nCells;
      this.getActiveBoxContent(n - 1);
      if (this.ids)
        this.ids.split(' ').forEach((id, i) => { this.getActiveBoxContent(i).id = Number(id); });
    }

    // Assign ids when cells have empty content (they are just shapes)
    if (n > 0) {
      let empty = true;
      for (let i = 0; i < n; i++) {
        const bxc = this.getActiveBoxContent(i);
        if (bxc.id !== -1 || bxc.item !== -1 || !bxc.isEmpty()) {
          empty = false;
          break;
        }
      }
      if (empty) {
        for (let i = 0; i < n; i++)
          this.getActiveBoxContent(i).id = i;
      }
    }

    // Link [BoxBase](BoxBase.html) objects of `cells` elements to `style`
    if (this.style)
      this.cells.forEach(abc => { if (abc.style) abc.style.parent = this.style; });

    if (mediaBag)
      this.cells.forEach(abc => abc.realizeContent(mediaBag));

    return this;
  }

  /**
   * Prepares the media content of all elements
   * @param {PlayStation} playStation - The {@link module:JClicPlayer.JClicPlayer JClicPlayer}
   */
  prepareMedia(playStation) {
    this.cells.forEach(abc => abc.prepareMedia(playStation));
  }

  /**
   * Gets the estimated total width of this content bag
   * @returns {number}
   */
  getTotalWidth() {
    return this.w * this.ncw;
  }

  /**
   * Gets the estimated total height of this bag
   * @returns {number}
   */
  getTotalHeight() {
    return this.h * this.nch;
  }

  /**
   * Gets the total number of cells of this bag
   * @returns {number}
   */
  getNumCells() {
    return this.cells.length;
  }

  /**
   * Checks if the bag is empty
   * @returns {boolean}
   */
  isEmpty() {
    return this.cells.length === 0;
  }

  /**
   * Retrieves the {@link module:shapers/Shaper.Shaper Shaper} of this bag, creating a new one if it was _null_
   * @returns {Shaper}
   */
  getShaper() {
    if (this.shaper === null)
      this.shaper = Shaper.getShaper('@Rectangular', this.ncw, this.nch);
    return this.shaper;
  }

  /**
   * Retrieves the {@link module:boxes/BoxBase.BoxBase BoxBase} of this bag, creating a new one if it was _null_
   * @returns {BoxBase}
   */
  getBoxBase() {
    if (this.style === null)
      this.style = new BoxBase();
    return this.style;
  }

  /**
   * Adds a new {@link module:boxes/ActiveBoxContent.ActiveBoxContent ActiveBoxContent} to this bag
   * @param {ActiveBoxContent} ab - The ActiveBoxContent to add
   */
  addActiveBoxContent(ab) {
    this.cells.push(ab);
    if (this.ncw === 0 || this.nch === 0) {
      this.ncw = this.nch = 1;
    }
  }

  /**
   * Gets the nth {@link module:boxes/ActiveBoxContent.ActiveBoxContent ActiveBoxContent} in `cells`
   * @param {number} i - The index of the content to be retrieved
   * @returns {ActiveBoxContent}
   */
  getActiveBoxContent(i) {
    if (i >= this.cells.length) {
      for (let j = this.cells.length; j <= i; j++)
        this.cells.push(new ActiveBoxContent());
    }
    return this.cells[i];
  }

  /**
   * Finds the ActiveBoxContent with specific `id` and `item` values
   * @param {number} id
   * @param {number} item
   * @returns {ActiveBoxContent}
   */
  getActiveBoxContentWith(id, item) {
    return this.cells.find(bxc => bxc.id === id && bxc.item === item);
  }

  /**
   * Sets the content of the cells based on a image spliced by a shaper
   * @param {MediaBag} mb - The MediaBag used to retrieve the image
   * @param {Shaper} sh - The Shaper used to splice the image
   * @param {boolean} roundSizes - When `true`, the size and coordinates of cells will be rounded
   * to the nearest integer values.
   */
  setImgContent(mb, sh, roundSizes) {
    if (sh)
      this.setShaper(sh);

    if (this.shaper.className === '@Holes')
      this.shaper.hasRemainder = true;

    this.ncw = this.shaper.nCols;
    this.nch = this.shaper.nRows;
    const mbe = mb.elements[this.image];
    if (mb && this.image && mbe && mbe.ready) {
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

    const r = new Rectangle(0, 0, this.w * this.ncw, this.h * this.nch);
    for (let i = 0; i < this.shaper.nCells; i++)
      this.getActiveBoxContent(i).setImgContent(this.img, this.shaper.getShape(i, r), this.animatedGifFile);

    if (this.shaper.hasRemainder) {
      this.backgroundContent = new ActiveBoxContent();
      this.backgroundContent.setImgContent(this.img, this.shaper.getRemainderShape(r));
    }
  }

  /**
   * Sets the content of this bag based on an array of strings
   * @param {string[]} txt - The array of strings to be used as content.
   * @param {number} setNcw - Number of columns
   * @param {number} setNch - Number of rows
   */
  setTextContent(txt, setNcw, setNch) {
    this.ncw = Math.max(1, setNcw);
    this.nch = Math.max(1, setNch);
    const n = this.ncw * this.nch;
    for (let i = 0; i < n; i++)
      this.getActiveBoxContent(i).setTextContent(i >= txt.length || txt[i] === null ? '' : txt[i]);
  }

  /**
   * Sets `id` values to a all the {@link module:boxes/ActiveBoxContent.ActiveBoxContent ActiveBoxContent} elements of his bag.
   * @param {number[]} ids -Array of numeric identifiers
   */
  setIds(ids) {
    for (let i = 0; i < ids.length && i < this.cells.length; i++)
      this.getActiveBoxContent(i).id = ids[i];
  }

  /**
   * Sets `value` to the `key` attribute of all cells
   * @param {string} key - The key where the value will be stored
   * @param {*} value - The supplied value. Can be of any type.
   */
  setCellsAttribute(key, value) {
    this.cells.forEach(abc => abc[key] = value);
  }

  /**
   *
   * Cheks if the `id` values of all {@link module:boxes/ActiveBoxContent.ActiveBoxContent ActiveBoxContent} objects are -1 and, if true,
   * sets new ids to them, with values between 0 and `maxId`
   * @param {number} maxId - The maximum value of identifiers
   */
  avoidAllIdsNull(maxId) {
    if (this.cells.every(abc => abc.id === -1)) {
      maxId = Math.max(1, maxId);
      this.cells.forEach((abc, n) => { abc.id = n % maxId; });
    }
  }
}

Object.assign(ActiveBagContent.prototype, {
  /**
   * The global identifier of this object: `primary`, `secondary`...
   * @name ActiveBagContent#id
   * @type {string} */
  id: 'primary',
  /**
   * The name of the image file used as a common image of this bag
   * @name ActiveBagContent#image
   * @type {string} */
  image: null,
  /**
   * The built image object
   * @name ActiveBagContent#img
   * @type {external:HTMLImageElement} */
  img: null,
  /**
   * Name of the img source when is an animated GIF
   * @name ActiveBagContent#animatedGifFile
   * @type {string} */
  animatedGifFile: null,
  /**
   * Number of columns when cells are distributed in a grid
   * @name ActiveBagContent#ncw
   * @type {number} */
  ncw: 1,
  /**
   * Number of rows when cells are distributed in a grid
   * @name ActiveBagContent#nch
   * @type {number} */
  nch: 1,
  /**
   * Optimal cell width
   * @name ActiveBagContent#w
   * @type {number} */
  w: settings.DEFAULT_GRID_ELEMENT_SIZE,
  /**
   * Optimal cell height
   * @name ActiveBagContent#h
   * @type {number} */
  h: settings.DEFAULT_GRID_ELEMENT_SIZE,
  /**
   * Whether the cells must have a border or not
   * @name ActiveBagContent#border
   * @type {boolean} */
  border: true,
  /**
   * The BoxBase used for this bag of cell contents
   * @name ActiveBagContent#style
   * @type {BoxBase} */
  style: null,
  /**
   * The Shaper used to define the specific shape of each cell
   * @name ActiveBagContent#shaper
   * @type {Shaper} */
  shaper: null,
  /**
   * An optional ActiveBoxContent object with background settings.
   * @name ActiveBagContent#backgroundContent
   * @type {ActiveBoxContent} */
  backgroundContent: null,
  /**
   * The main Array of {@link module:boxes/ActiveBoxContent.ActiveBoxContent ActiveBoxContent} objects
   * @name ActiveBagContent#cells
   * @type {ActiveBoxContent[]} */
  cells: null,
  /**
   * The default value to be assigned at the 'id' field of children
   * @name ActiveBagContent#defaultIdValue
   * @type {number} */
  defaultIdValue: -1,
  /**
   * Used in special cases where all cells have empty content with only numeric identifiers
   * @name ActiveBagContent#ids
   * @type {string} */
  ids: null,
});

export default ActiveBagContent;
