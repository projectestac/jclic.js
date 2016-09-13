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

define([
  "jquery",
  "../AWT",
  "../Utils",
  "./BoxBase",
  "../media/MediaContent"
], function ($, AWT, Utils, BoxBase, MediaContent) {

  /**
   * This class defines a content that can be displayed by {@link ActiveBox} objects. This content
   * can be a text, an image, a fragment of an image or a combination of text and images. The style
   * (colors, font and size, borders, shadows, margins, etc.) are specified in the `bb` attribute,
   * always pointing to a {@link BoxBase} object.
   * @exports ActiveBoxContent
   * @class
   * @param {string=} id - An optional identifier.
   */
  var ActiveBoxContent = function (id) {
    if (typeof id !== 'undefined')
      this.id = id;
    this.imgAlign = {h: 'middle', v: 'middle'};
    this.txtAlign = {h: 'middle', v: 'middle'};
  };

  ActiveBoxContent.prototype = {
    constructor: ActiveBoxContent,
    /**
     * The {@link BoxBase} attribute of this content. Can be `null`, meaning {@link ActiveBox} will
     * try to find a suitable style scanning down through its own BoxBase, their parent's and, finally,
     * the default values defined in `BoxBase.prototype`.
     * @type {BoxBase} */
    bb: null,
    /**
     * Optimal dimension of any {@link ActiveBox} taking this content.
     * @type {AWT.Dimension} */
    dimension: null,
    /**
     * The {@link ActiveBox} can have or not a border despite the settings of {@link BoxBase}.<br>
     * The default value `null` means not to take in consideration this setting.
     * @type {(null|boolean)} */
    border: null,
    /**
     * The text to display on the {@link ActiveBox}. It can have up to two paragraphs.
     * @type {string} */
    text: null,
    /**
     * The name of the image file to display on the {@link ActiveBox}.
     * @type {string} */
    imgName: null,
    /**
     * An optional shape used to clip the image.
     * @type {AWT.Shape} */
    imgClip: null,
    /**
     * The media content associated with this object.
     * @type {MediaContent} */
    mediaContent: null,
    /**
     * @typedef ActiveBoxContent~alignType
     * @type {object}
     * @property {string} h - Valid values are: `left`, `middle`, `right`
     * @property {string} v - Valud values are: `top`, `middle`, `bottom` */
    /**
     * The horizontal and vertical alignment of the image inside the cell.
     * @type {ActiveBoxContent~alignType} */
    imgAlign: null,
    /**
     * The horizontal and vertical alignment of the text inside the cell.<br>
     * Valid values are: `left`, `middle`, `right`, `top` and `bottom`.
     * @type {ActiveBoxContent~alignType} */
    txtAlign: null,
    /**
     * Whether to avoid overlapping of image and text inside the cell when both are present.
     * @type {boolean} */
    avoidOverlapping: false,
    /**
     * Numeric identifier used in activities to resolve relationships between cells
     * @type {number} */
    id: -1,
    /**
     * Numeric identifier used in activities to resolve relationships between cells
     * @type {number} */
    item: -1,
    //
    // Transient properties build and modified at run-time
    /**
     * The realized image used by this box content.
     * @type {external:HTMLImageElement} */
    img: null,
    /**
     * When `img` is an animated GIF file, this field should contain its file name
     */
    animatedGifFile: null,
    //
    //
    userData: null,
    rawText: null,
    htmlText: null,
    innerHtmlText: null,
    animated: false,
    // ActiveMediaPlayer
    amp: null,
    // MediaBagElement
    mbe: null,
    /**
     *
     * Loads settings from a specific JQuery XML element
     * @param {external:jQuery} $xml - The XML element to be parsed
     * @param {MediaBag} mediaBag - The media bag used to retrieve images and other media
     */
    setProperties: function ($xml, mediaBag) {
      var content = this;
      //
      // Read attributes
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
            // Old style
            content['txtAlign'] = content.readAlign(val + ',center');
            content['imgAlign'] = content.readAlign(val + ',center');
            break;

          case 'border':
          case 'avoidOverlapping':
            content [name] = Utils.getBoolean(val);
            break;

          case 'image':
            content.imgName = val;
            break;
        }
      });

      //
      // Read inner elements
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
            //content.text += '<p>' + this.textContent + '</p>';
            content.text += this.textContent;
            break;
        }
      });

      if (mediaBag)
        this.realizeContent(mediaBag);

      return this;
    },
    /**
     *
     * Decode expressions with combined values of horizontal and vertical alignments in the form:
     * "(left|middle|right),(top|middle|bottom)"
     * @param {string} str - The string to parse
     * @returns {ActiveBoxContent~alignType}
     */
    readAlign: function (str) {
      var align = {h: 'center', v: 'center'};
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
    /**
     *
     * Checks if two contents are equivalent
     * @param {ActiveBoxContent} abc - The content to compare with this.
     * @param {boolean} checkCase - When `true` the comparing will be case-sensitive.
     * @returns {boolean}
     */
    isEquivalent: function (abc, checkCase) {
      if (abc === this)
        return true;
      var result = false;
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
    },
    /**
     *
     * Sets the text content of this ActiveBox
     * @param {string} tx
     */
    setTextContent: function (tx) {
      // only plain text!
      if (tx !== null) {
        this.rawText = tx;
        this.text = tx;
        this.checkHtmlText();
      } else {
        this.rawText = null;
        this.text = null;
        this.htmlText = null;
        this.innerHtmlText = null;
      }
    },
    /**
     *
     * Checks if cell's text uses HTML, initializing the `innerHtmlText` member as needed.
     */
    checkHtmlText: function () {
      this.htmlText = null;
      this.innerHtmlText = null;
      if (Utils.startsWith(this.text, '<html>', true)) {
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
    /**
     *
     * Sets a fragment of a main image as a graphic content of this cell.
     * Cells cannot have two graphic contents, so `imgName` (the specific image of this cell) should
     * be cleared with this setting.
     * @param {external:HTMLImageElement} img - The image data
     * @param {AWT.Shape} imgClip - A shape that clips the portion of image assigned to this content.
     * @param {string=} animatedGifFile - When `img` is an animated GIF, its file name
     */
    setImgContent: function (img, imgClip, animatedGifFile) {
      this.img = img;
      this.imgName = null;
      this.imgClip = imgClip;
      if (animatedGifFile)
        this.animatedGifFile = animatedGifFile;
    },
    /**
     *
     * Prepares the media content
     * @param {PlayStation} playStation - Usually a {@link JClicPlayer}
     */
    prepareMedia: function (playStation) {
      if (!this.amp && this.mediaContent && this.mediaContent.mediaType === 'PLAY_VIDEO') {
        this.amp = playStation.getActiveMediaPlayer(this.mediaContent);
        this.amp.realize();
      }
    },
    /**
     *
     * Reads and initializes the image associated to this content
     * @param {MediaBag} mediaBag - The media bag of the current project.
     */
    realizeContent: function (mediaBag) {
      var content = this;
      if (this.imgName !== null && this.imgName.length > 0) {
        this.mbe = mediaBag.getElement(this.imgName, true);
        if (this.mbe) {
          this.mbe.build(function () {
            content.img = content.mbe.data;
            content.animatedGifFile = content.mbe.animated ? content.mbe.getFullPath() : null;
          });
        }
      }
      if (this.mediaContent !== null) {
        if (this.imgName === null && (this.text === null || this.text.length === 0)) {
          this.img = this.mediaContent.getIcon();
          this.animatedGifFile = null;
        }
      }
      this.checkHtmlText(mediaBag);
    },
    /**
     * Gets a string representing this content, useful for checking if two different contents are
     * equivalent.
     * @returns {string}
     */
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
    }
  };

  /**
   * An empty ActiveBoxContent
   * @type {ActiveBoxContent} */
  ActiveBoxContent.EMPTY_CONTENT = new ActiveBoxContent();

  return ActiveBoxContent;
});
