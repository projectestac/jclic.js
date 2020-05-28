/**
 *  File    : boxes/ActiveBoxContent.js
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

import { $ } from 'jquery';
import AWT from '../AWT';
import Utils from '../Utils';
import BoxBase from './BoxBase';
import MediaContent from '../media/MediaContent';

/**
 * This class is used as a container for horizontal and vertical alignments of content inside a cell.
 */
export class AlignType {
  /**
   * AlignType constructor
   * @param {string*} h - Horizontal alignment. Possible values are `left`, `center` and `right`
   * @param {strong*} v - Vertical alignment. Possible values are `top`, `center` and `bottom`
   */
  constructor(h, v) {
    if (h)
      this.h = h;
    if (v)
      this.v = v;
  }

  /**
   * Gets a object with the basic attributes needed to rebuild this instance excluding functions,
   * parent references, constants and also attributes retaining the default value.
   * The resulting object is commonly usued to serialize elements in JSON format.
   * @returns {object} - The resulting object, with minimal attrributes
   */
  getAttributes() {
    return Utils.getAttributes(this, ['h|center', 'v|center']);
  }

  /**
   * Reads the properties of this AlignType from a data object
   * @param {object} data - The data object to be parsed
   * @returns {AlignType}
   */
  setAttributes(data) {
    return Utils.setAttr(this, data, ['h', 'v']);
  }

  // Class fields
  h = 'center';
  v = 'center';
}

/**
 * This class defines a content that can be displayed by {@link ActiveBox} objects. This content
 * can be a text, an image, a fragment of an image or a combination of text and images. The style
 * (colors, font and size, borders, shadows, margins, etc.) are specified in the `style` attribute,
 * always pointing to a {@link BoxBase} object.
 * @exports ActiveBoxContent
 * @class
 */
export class ActiveBoxContent {
  /**
   * ActiveBoxContent constructor
   * @param {string=} id - An optional identifier.
   */
  constructor(id) {
    if (typeof id !== 'undefined')
      this.id = id;
    this.imgAlign = new AlignType();
    this.txtAlign = new AlignType();
  }

  /**
   *
   * Loads settings from a specific JQuery XML element
   * @param {external:jQuery} $xml - The XML element to be parsed
   * @param {MediaBag} mediaBag - The media bag used to retrieve images and other media
   */
  setProperties($xml, mediaBag) {
    //
    // Read attributes
    Utils.attrForEach($xml.get(0).attributes, (name, val) => {
      switch (name) {
        case 'id':
        case 'item':
          this[name] = Number(val);
          break;

        case 'width':
        case 'height':
          if (this.dimension === null)
            this.dimension = new AWT.Dimension(0, 0);
          this.dimension[name] = Number(val);
          break;

        case 'txtAlign':
        case 'imgAlign':
          this[name] = this.readAlign(val);
          break;

        case 'hAlign':
          // Old style
          this['txtAlign'] = this.readAlign(val + ',center');
          this['imgAlign'] = this.readAlign(val + ',center');
          break;

        case 'border':
        case 'avoidOverlapping':
          this[name] = Utils.getBoolean(val);
          break;

        case 'image':
          this.image = Utils.nSlash(val);
          break;
      }
    });

    //
    // Read inner elements
    $xml.children().each((_n, child) => {
      const $node = $(child);
      switch (child.nodeName) {
        case 'style':
          this.style = new BoxBase(null).setProperties($node);
          break;
        case 'media':
          this.mediaContent = new MediaContent().setProperties($node);
          break;
        case 'p':
          if (this.text === null)
            this.text = '';
          else
            this.text += '\n';
          this.text += child.textContent;
          break;
      }
    });

    if (mediaBag)
      this.realizeContent(mediaBag);

    return this;
  }

  /**
   * Gets a object with the basic attributes needed to rebuild this instance excluding functions,
   * parent references, constants and also attributes retaining the default value.
   * The resulting object is commonly usued to serialize elements in JSON format.
   * @returns {object} - The resulting object, with minimal attrributes
   */
  getAttributes() {
    return Utils.getAttributes(this, [
      'id', 'item', 'dimension', 'border', 'avoidOverlapping', 'image', 'text',
      'objectType', // Used in TextActivityDocument
      'txtAlign', 'imgAlign', // AlignType        
      'style', // BoxBase
      'mediaContent', // MediaContent
    ]);
  }

  /**
   * Reads the properties of this ActiveBoxContent from a data object
   * @param {object|string} data - The data object to be parsed, or just the text content
   * @param {MediaBag} mediaBag - The media bag used to retrieve images and other media
   * @returns {ActiveBoxContent}
   */
  setAttributes(data, mediaBag) {

    if (typeof data === 'string')
      this.text = data;
    else
      Utils.setAttr(this, data, [
        'id', 'item', 'border', 'avoidOverlapping', 'image', 'text',
        'objectType',
        { key: 'dimension', fn: AWT.Dimension },
        { key: 'txAlign', fn: AlignType },
        { key: 'imgAlign', fn: AlignType },
        { key: 'style', fn: BoxBase },
        { key: 'mediaContent', fn: MediaContent },
      ]);

    if (mediaBag)
      this.realizeContent(mediaBag);

    return this;
  }

  /**
   * Decode expressions with combined values of horizontal and vertical alignments in the form:
   * "(left|middle|right),(top|middle|bottom)"
   * @param {string} str - The string to parse
   * @returns {ActiveBoxContent~alignType}
   */
  readAlign(str) {
    const align = new AlignType();
    if (str) {
      const v = str.split(',');
      align.h = v[0].replace('middle', 'center');
      align.v = v[1].replace('middle', 'center');
    }
    return align;
  }

  /**
   * Checks if this is an empty content (`text` and `img` are _null_)
   */
  isEmpty() {
    return this.text === null && this.img === null;
  }

  /**
   * Checks if two contents are equivalent
   * @param {ActiveBoxContent} abc - The content to compare with this.
   * @param {boolean} checkCase - When `true` the comparing will be case-sensitive.
   * @returns {boolean}
   */
  isEquivalent(abc, checkCase) {
    if (abc === this)
      return true;
    let result = false;
    if (abc !== null) {
      if (this.isEmpty() && abc.isEmpty())
        result = this.id === abc.id;
      else
        result = (this.text === null ? abc.text === null
          : checkCase ? this.text === abc.text
            : this.text.toLocaleLowerCase() === abc.text.toLocaleLowerCase()
        ) &&
          (this.mediaContent === null ? abc.mediaContent === null
            : this.mediaContent.isEquivalent(abc.mediaContent)
          ) &&
          this.img === abc.img &&
          (this.imgClip === null ? abc.imgClip === null
            : this.imgClip.equals(abc.imgClip));
    }
    return result;
  }

  /**
   * Sets the text content of this ActiveBox
   * @param {string} tx
   */
  setTextContent(tx) {
    // only plain text allowed!
    if (tx !== null) {
      this.text = tx;
      this.checkHtmlText();
    } else {
      this.text = null;
      this.innerHtmlText = null;
    }
  }

  /**
   * Checks if cell's text uses HTML, initializing the `innerHtmlText` member as needed.
   */
  checkHtmlText() {
    this.innerHtmlText = null;
    if (Utils.startsWith(this.text, '<html>', true)) {
      const htmlText = this.text.trim();
      const s = htmlText.toLocaleLowerCase();
      if (s.indexOf('<body') === -1) {
        const s2 = s.indexOf('</html>');
        if (s2 >= 0)
          this.innerHtmlText = htmlText.substr(6, s2);
      }
    }
  }

  /**
   * Sets a fragment of a main image as a graphic content of this cell.
   * Cells cannot have two graphic contents, so `image` (the specific image of this cell) should
   * be cleared with this setting.
   * @param {external:HTMLImageElement} img - The image data
   * @param {AWT.Shape} imgClip - A shape that clips the portion of image assigned to this content.
   * @param {string=} animatedGifFile - When `img` is an animated GIF, its file name
   */
  setImgContent(img, imgClip, animatedGifFile) {
    this.img = img;
    this.image = null;
    this.imgClip = imgClip;
    if (animatedGifFile)
      this.animatedGifFile = animatedGifFile;
  }

  /**
   * Prepares the media content
   * @param {PlayStation} playStation - Usually a {@link JClicPlayer}
   */
  prepareMedia(playStation) {
    if (!this.amp && this.mediaContent && this.mediaContent.type === 'PLAY_VIDEO') {
      this.amp = playStation.getActiveMediaPlayer(this.mediaContent);
      this.amp.realize();
    }
  }

  /**
   * Reads and initializes the image associated to this content
   * @param {MediaBag} mediaBag - The media bag of the current project.
   */
  realizeContent(mediaBag) {
    if (this.image !== null && this.image.length > 0) {
      this.mbe = mediaBag.getElement(this.image, true);
      if (this.mbe) {
        this.mbe.build(() => {
          this.img = this.mbe.data;
          this.animatedGifFile = this.mbe.animated ? this.mbe.getFullPath() : null;
        });
      }
    }
    if (this.mediaContent !== null) {
      if (this.image === null && (this.text === null || this.text.length === 0)) {
        this.img = this.mediaContent.getIcon();
        this.animatedGifFile = null;
      }
    }
    this.checkHtmlText(mediaBag);
  }

  /**
   * Gets a string representing this content, useful for checking if two different contents are
   * equivalent.
   * @returns {string}
   */
  getDescription() {
    const result = [];
    if (this.text && this.text.length)
      result.push(this.text);
    if (this.image)
      result.push(`${Utils.getMsg('image')} ${this.image}`);
    if (this.imgClip)
      result.push(this.imgClip.toString());
    if (this.mediaContent)
      result.push(this.mediaContent.getDescription());
    return result.join(' ');
  }

  /**
   * 
   * Overwrites the original `Object.toString` method, returning `getDescription` instead
   * @returns {String}
   */
  toString() {
    const result = [];
    if (this.text && this.text.length)
      result.push(this.text);
    if (this.image)
      result.push(`${Utils.getMsg('image')} ${this.image}`);
    if (this.imgClip)
      result.push(`${Utils.getMsg('image fragment')} ${(this.id >= 0 ? this.id : this.item) + 1}`);
    return result.join(' ') || Utils.getMsg('cell');
  }

  // Class fields

  /**
   * The {@link BoxBase} attribute of this content. Can be `null`, meaning {@link ActiveBox} will
   * try to find a suitable style scanning down through its own BoxBase, their parent's and, finally,
   * the default values defined in `BoxBase.prototype`.
   * @name ActiveBoxContent#style
   * @type {BoxBase}
   */
  style = null;

  /**
   * Optimal dimension of any {@link ActiveBox} taking this content.
   * @name ActiveBoxContent#dimension
   * @type {AWT.Dimension}
   */
  dimension = null;

  /**
   * The {@link ActiveBox} can have or not a border despite the settings of {@link BoxBase}.
   * The default value `null` means not to take in consideration this setting.
   * @name ActiveBoxContent#border
   * @type {(null|boolean)}
   */
  border = null;

  /**
   * The text to display on the {@link ActiveBox}. It can have up to two paragraphs.
   * @name ActiveBoxContent#text
   * @type {string}
   */
  text = null;

  /**
   * The name of the image file to display on the {@link ActiveBox}.
   * @name ActiveBoxContent#image
   * @type {string}
   */
  image = null;

  /**
   * An optional shape used to clip the image.
   * @name ActiveBoxContent#imgClip
   * @type {AWT.Shape}
   */
  imgClip = null;

  /**
   * The media content associated with this object.
   * @name ActiveBoxContent#mediaContent
   * @type {MediaContent}
   */
  mediaContent = null;

  /**
   * @typedef ActiveBoxContent~alignType
   * @type {object}
   * @property {string} h - Valid values are: `left`, `middle`, `right`
   * @property {string} v - Valud values are: `top`, `middle`, `bottom` */

  /**
   * The horizontal and vertical alignment of the image inside the cell.
   * @name ActiveBoxContent#imgAlign
   * @type {AlignType}
   */
  imgAlign = null;

  /**
   * The horizontal and vertical alignment of the text inside the cell.
   * Valid values are: `left`, `middle`, `right`, `top` and `bottom`.
   * @name ActiveBoxContent#txtAlign
   * @type {AlignType}
   */
  txtAlign = null;

  /**
   * Whether to avoid overlapping of image and text inside the cell when both are present.
   * @name ActiveBoxContent#avoidOverlapping
   * @type {boolean}
   */
  avoidOverlapping = false;

  /**
   * Numeric identifier used in activities to resolve relationships between cells
   * @name ActiveBoxContent#id
   * @type {number}
   */
  id = -1;

  /**
   * Numeric identifier used in activities to resolve relationships between cells
   * @name ActiveBoxContent#item
   * @type {number}
   */
  item = -1;

  //
  // Transient properties build and modified at run-time
  /**
   * The realized image used by this box content.
   * @name ActiveBoxContent#img
   * @type {external:HTMLImageElement}
   */
  img = null;

  /**
   * When `img` is an animated GIF file, this field should contain its file name
   * @name ActiveBoxContent#animatedGifFile
   * @type {string}
   */
  animatedGifFile = null;

  /**
   * When not null, this content should be treated as an HTML element
   * @name ActiveBoxContent#innerHtmlText
   * @type {string}
   */
  innerHtmlText = null;

  /**
   * The {@link ActiveMediaPlayer} associated with this content. Updated at run-time.
   * @name ActiveBoxContent#amp
   * @type {ActiveMediaPlayer}
   */
  amp = null;

  /**
   * The {@link MediaBagElement} associated with this content, if any. Updated at run-time.
   * @name ActiveBoxContent#mbe
   * @type {MediaBagElement}
   */
  mbe = null;

  /**
   * An empty ActiveBoxContent
   * @type {ActiveBoxContent}
   */
  static EMPTY_CONTENT = new ActiveBoxContent();
}

export default ActiveBoxContent;
