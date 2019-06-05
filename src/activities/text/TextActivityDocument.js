/**
 *  File    : activities/text/TextActivityDocument.js
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
  "../../Utils",
  "../../AWT",
  "../../boxes/ActiveBoxContent",
  "../../media/MediaContent",
  "../../boxes/ActiveBagContent"
], function ($, Utils, AWT, ActiveBoxContent, MediaContent, ActiveBagContent) {

  /**
   * This is the HTML DOM element used in text activities like {@link FillInBlanks},
   * {@link IdentifyText}, {@link OrderText} and {@link Complete}. It contains the main document of
   * the activity, usually with some elements marked as "targets". In {@link FillInBlanks}, this
   * targets are encapsulated in {@link TextTarget} objects.
   * @exports TextActivityDocument
   * @class
   */
  class TextActivityDocument {
    /**
     * TextActivityDocument constructor
     */
    constructor() {
      // Make a deep clone of the default style
      this.style = { 'default': $.extend(true, {}, TextActivityDocument.DEFAULT_DOC_STYLE) };
      this.p = [];
      //this.tmb=new TargetMarkerBag();
      this.boxesContent = new ActiveBagContent();
      this.popupsContent = new ActiveBagContent();
    }

    /**
     * Loads the document settings from a specific JQuery XML element
     * @param {external:jQuery} $xml - The XML element to parse
     * @param {MediaBag} mediaBag - The media bag used to load images and media content
     */
    setProperties($xml, mediaBag) {
      // Read named styles
      // Sort styles according to its "base" dependencies
      const styles = $xml.children('style').toArray().sort((a, b) => {
        var aName = a.getAttribute('name'), aBase = a.getAttribute('base') || null;
        var bName = b.getAttribute('name'), bBase = b.getAttribute('base') || null;
        // Put 'default' always first, then each style below their base (if any)
        return aName === 'default' ? -1 : bName === 'default' ? 1
          : aBase === bName ? 1 : bBase === aName ? -1
            : !aBase ? -1 : !bBase ? 1 : 0;
      });
      // Process the ordered list of styles
      styles.forEach(style => {
        const attr = this.readDocAttributes($(style));
        // Grant always that basic attributes are defined
        this.style[attr.name] = attr.name === 'default' ? $.extend(true, this.style.default, attr) : attr;
        //this.style[attr.name] = attr.name === 'default' ? Object.assign(this.style.default, attr) : attr
      });

      // Read paragraphs
      $xml.find('section > p').each((_n, par) => {

        const p = { elements: [] };

        // Read paragraph attributes
        Utils.attrForEach(par.attributes, (name, value) => {
          switch (name) {
            case 'style':
              p[name] = value;
              break;
            case 'bidiLevel':
            case 'Alignment':
              p[name] = Number(value);
              break;
          }
        });

        // Read paragraph objects
        $(par).children().each((_n, child) => {
          let obj;
          const $child = $(child);
          switch (child.nodeName) {

            case 'cell':
              obj = new ActiveBoxContent().setProperties($child, mediaBag);
              break;

            case 'text':
              obj = { text: child.textContent.replace(/\t/g, '&#9;') };
              const attr = this.readDocAttributes($child);
              if (!$.isEmptyObject(attr)) {
                obj.attr = attr;
              }
              break;

            case 'target':
              obj = new TextTarget(this, child.textContent.replace(/\t/g, '&#9;'));
              obj.setProperties($child, mediaBag);
              this.numTargets++;
              break;

            default:
              Utils.log('error', `Unknown object in activity document: "${child.nodeName}"`);
          }
          if (obj) {
            obj.objectType = child.nodeName;
            p.elements.push(obj);
          }
        });

        this.p.push(p);
      });
      return this;
    }

    /**
     * Reads sets of text attributes, sometimes in form of named styles
     * @param {external:jQuery} $xml - The XML element to parse
     * @returns {object}
     */
    readDocAttributes($xml) {
      let
        attr = {},
        css = {};
      Utils.attrForEach($xml.get(0).attributes, (name, val) => {
        switch (name) {
          case 'background':
            val = Utils.checkColor(val, 'white');
            attr[name] = val;
            css['background-color'] = val;
            break;
          case 'foreground':
            val = Utils.checkColor(val, 'black');
            attr[name] = val;
            css['color'] = val;
            break;
          case 'family':
            css['font-family'] = val;
          /* falls through */
          case 'name':
          case 'style':
            // Attributes specific to named styles:
            attr[name] = val;
            break;
          case 'base':
            attr[name] = val;
            // If base style exists, merge it with current settings
            if (this.style[val]) {
              //attr = Object.apply({}, this.style[val], attr)
              attr = $.extend(true, {}, this.style[val], attr);
              if (this.style[val].css)
                //css = Object.apply({}, this.style[val].css, css)
                css = $.extend({}, this.style[val].css, css);
            }
            break;
          case 'bold':
            val = Utils.getBoolean(val);
            attr[name] = val;
            css['font-weight'] = val ? 'bold' : 'normal';
            break;
          case 'italic':
            val = Utils.getBoolean(val);
            attr[name] = val;
            css['font-style'] = val ? 'italic' : 'normal';
            break;
          case 'target':
            attr[name] = Utils.getBoolean(val);
            break;
          case 'size':
            attr[name] = Number(val);
            css['font-size'] = `${val}px`;
            break;
          case 'tabWidth':
            // `tab-size` CSS attribute is only set when the document has a specific `tabWidth`
            // setting. It must be accompanied of `white-space:pre` to successfully work.
            this.tabSpc = val;
            css['tab-size'] = this.tabSpc;
            css['white-space'] = 'pre-wrap';
            break;
          default:
            Utils.log('warn', `Unknown text attribute: "${name}" = "${val}"`);
            attr[name] = val;
            break;
        }
      });

      if (!$.isEmptyObject(css))
        attr['css'] = css;

      return attr;
    }

    /**
     * Gets a object with the basic attributes needed to rebuild this instance excluding functions,
     * parent references, constants and also attributes retaining the default value.
     * The resulting object is commonly usued to serialize elements in JSON format.
     * @returns {object} - The resulting object, with minimal attrributes
     */
    getAttributes() {
      return Utils.getAttributes(this, [
        'style',
        'tabSpc', 'targetType',
        'p',
      ]);
    }

    /**
     * Gets the full text of this document in raw format
     * @returns {String} - The text of the document.
     */
    getRawText() {
      const $html = $('<div/>');
      // Process paragraphs
      this.p.forEach(p => {
        // Creates a new DOM paragraph
        const $p = $('<p/>');
        let empty = true;
        // Process the paragraph elements
        p.elements.forEach(element => {
          switch (element.objectType) {
            case 'text':
            case 'target':
              $p.append(element.text);
              break;
            case 'cell':
              // cells are not considered raw text of the document
              break;
            default:
              break;
          }
          empty = false;
        });
        if (empty) {
          // Don't leave paragraphs empty
          $p.html('&nbsp;');
        }
        // Adds the paragraph to the DOM element
        $html.append($p);
      });
      return $html.text().trim();
    }

    /**
     * Gets a `style` object filled with default attributes plus attributes present in the
     * requested style name.
     * @param {string} name - The requested style name
     * @returns {Object} - The result of combining `default` with the requested style
     */
    getFullStyle(name) {
      const st = $.extend(true, {}, this.style.default);
      return $.extend(true, st, this.style[name] ? this.style[name] : {});
      //return Object.assign({}, this.style.default, this.style[name] ? this.style[name] : {})
    }
  }

  Object.assign(TextActivityDocument.prototype, {
    /**
     * Number of blank spaces between tabulators.
     * @name TextActivityDocument#tabSpc
     * @type {number} */
    tabSpc: 12,
    /**
     * Index of the last {@link ActiveBox} activated.
     * @name TextActivityDocument#lastBoxId
     * @type {number} */
    lastBoxId: 0,
    /**
     * A bag of {@link TargetMarker} objects
     * @name TextActivityDocument#tmb
     * @type {object} */
    tmb: null,
    /**
     * Number of targets
     * @name TextActivityDocument#numTargets
     * @type {number} */
    numTargets: 0,
    /**
     * Type of targets used in this activity. Possible values are: `TT_FREE`, `TT_CHAR`, `TT_WORD`
     * and `TT_PARAGRAPH`.
     * @name TextActivityDocument#targetType
     * @type {string} */
    targetType: 'TT_FREE',
    /**
     * Bag with the content of the boxes embedded in the document.
     * @name TextActivityDocument#boxesContent
     * @type {ActiveBagContent} */
    boxesContent: null,
    /**
     * Bag with the content of the pop-ups used by this activity.
     * @name TextActivityDocument#popupsContent
     * @type {ActiveBagContent} */
    popupsContent: null,
    /**
     * Collection of named styles of the document
     * @name TextActivityDocument#style
     * @type {object} */
    style: null,
    /**
     * The main document, represented as a collection of DOM objects
     * @name TextActivityDocument#p
     * @type {object} */
    p: null,
  });

  /**
   * Default style for new documents
   * @type {object} */
  TextActivityDocument.DEFAULT_DOC_STYLE = {
    background: 'white',
    foreground: 'black',
    family: 'Arial',
    size: 17,
    css: {
      'font-family': 'Arial,Helvetica,sans-serif',
      'font-size': '17px',
      'background-color': 'white',
      color: 'black'
    }
  };

  /**
   * This class contains the properties and methods of the document elements that are the real
   * targets of user actions in text activities.
   * @class
   */
  class TextTarget {
    /**
     * TextTarget constructor
     * @param {TextActivityDocument} doc - The document to which this target belongs.
     * @param {string} text - Main text of this target.
     */
    constructor(doc, text) {
      this.doc = doc;
      this.text = text;
      this.numIniChars = text.length;
      this.answers = [text];
      this.maxLenResp = this.numIniChars;
    }

    /**
     * Resets the TextTarget status
     * @param {string=} status - The `targetStatus` to be established. Default is `NOT_EDITED`
     */
    reset(status) {
      this.targetStatus = status ? status : 'NOT_EDITED';
      this.flagModified = false;
    }

    /**
     * Loads the text target settings from a specific JQuery XML element
     * @param {external:jQuery} $xml - The XML element to parse
     * @param {MediaBag} mediaBag - The media bag used to load images and media content
     */
    setProperties($xml, mediaBag) {
      let firstAnswer = true;
      // Read specific nodes
      $xml.children().each((_n, child) => {
        const $node = $(child);
        switch (child.nodeName) {
          case 'answer':
            if (firstAnswer) {
              firstAnswer = false;
              this.answers = [];
            }
            if (this.answers === null)
              this.answers = [];
            this.answers.push(child.textContent);
            break;

          case 'optionList':
            $node.children('option').each((_n, opChild) => {
              this.isList = true;
              if (this.options === null)
                this.options = [];
              this.options.push(opChild.textContent);
            });
            break;

          case 'response':
            this.iniChar = Utils.getVal($node.attr('fill'), this.iniChar).charAt(0);
            this.numIniChars = Utils.getNumber($node.attr('length'), this.numIniChars);
            this.maxLenResp = Utils.getNumber($node.attr('maxLength'), this.maxLenResp);
            this.iniText = Utils.getVal($node.attr('show'), this.iniText);
            break;

          case 'info':
            this.infoMode = Utils.getVal($node.attr('mode'), 'always');
            this.popupDelay = Utils.getNumber($node.attr('delay'), this.popupDelay);
            this.popupMaxTime = Utils.getNumber($node.attr('maxTime'), this.popupMaxTime);
            $node.children('media').each((_n, media) => {
              this.onlyPlay = true;
              this.popupContent = new ActiveBoxContent();
              this.popupContent.mediaContent = new MediaContent().setProperties($(media));
            });
            if (!this.popupContent) {
              $node.children('cell').each((_n, cell) => {
                this.popupContent = new ActiveBoxContent().setProperties($(cell), mediaBag);
              });
            }
            break;

          case 'text':
            this.text = child.textContent.replace(/\t/g, '&#9;');
            const attr = this.doc.readDocAttributes($(child));
            if (!$.isEmptyObject(attr))
              this.attr = attr;
            break;

          default:
            break;
        }
      });
    }

    /**
     * Gets a object with the basic attributes needed to rebuild this instance excluding functions,
     * parent references, constants and also attributes retaining the default value.
     * The resulting object is commonly usued to serialize elements in JSON format.
     * @returns {object} - The resulting object, with minimal attrributes
     */
    getAttributes() {
      return Utils.getAttributes(this, [
        'text', 'attr',
        'answers', 'options', 'iniChar', 'numIniChars', 'maxLenResp', 'iniText',
        'infoMode', 'popupDelay', 'popupMaxTime', 'onlyPlay', 'popupContent',
      ]);
    }

    /**
     * Gets a string with all valid answers of this TextTarget. Useful for reporting users' activity.
     * @returns {string}
     */
    getAnswers() {
      return this.answers ? this.answers.join('|') : '';
    }

    /**
     * Sets specific colors to the target jQuery element, based on its `targetStatus` value. Red
     * color usually means error.
     */
    checkColors() {
      const $element = this.$comboList || this.$span;
      if ($element) {
        const style = this.doc.style[
          this.targetStatus === 'WITH_ERROR' ? 'targetError' :
            this.targetStatus === 'HIDDEN' ? 'default' : 'target'];
        if (style && style.css) {
          $element.css(style.css);
        }
      }
    }

    /**
     * Fills the `currentText` member with the text currently hosted in $span or selected in $comboList
     * @returns {String} - The current text of this target
     */
    readCurrentText() {
      if (this.$span)
        this.currentText = this.$span.text();
      else if (this.$comboList)
        this.currentText = this.$comboList.val();
      return this.currentText;
    }
  }

  Object.assign(TextTarget.prototype, {
    /**
     * The {@link TextActivityDocument} to which this target belongs
     * @name TextTarget#doc
     * @type {TextActivityDocument} */
    doc: null,
    /**
     * The current text displayed by this TextTarget
     * @name TextTarget#text
     * @type {string} */
    text: null,
    /**
     * A set of optional attributes for `text`
     * @name TextTarget#attr
     * @type {object} */
    attr: null,
    /**
     * `true` when the target is a drop-down list
     * @name TextTarget#isList
     * @type {boolean} */
    isList: false,
    /**
     * Number of characters initially displayed on the text field
     * @name TextTarget#numIniChars
     * @type {number} */
    numIniChars: 1,
    /**
     * Character used to fill-in the text field
     * @name TextTarget#iniChar
     * @type {string} */
    iniChar: '_',
    /**
     * Maximum length of the answer
     * @name TextTarget#maxLenResp
     * @type {number} */
    maxLenResp: 0,
    /**
     * Array of valid answers
     * @name TextTarget#answers
     * @type {string[]} */
    answers: null,
    /**
     * Set of specific options
     * @name TextTarget#options
     * @type {object} */
    options: null,
    /**
     * Text displayed by the target when the activity begins
     * @name TextTarget#iniText
     * @type {string} */
    iniText: null,
    /**
     * Type of additional information offered to the user. Possible values are: `no_info`, `always`,
     * `onError` and `onDemand`.
     * @name TextTarget#infoMode
     * @type {string} */
    infoMode: 'no_info',
    /**
     * Key that triggers the associated popup when `infoMode` is `onDemand`
     * @name TextTarget#popupKey
     * @type {string} */
    popupKey: 'F1',
    /**
     * An optional {@link ActiveBoxContent} with information about this TextTarget
     * @name TextTarget#popupContent
     * @type {ActiveBoxContent} */
    popupContent: null,
    /**
     * Time (seconds) to wait before showing the additional information
     * @name TextTarget#popupDelay
     * @type {number} */
    popupDelay: 0,
    /**
     * Maximum amount of time (seconds) that the additional information will be shown
     * @name TextTarget#popupMaxTime
     * @type {number} */
    popupMaxTime: 0,
    /**
     * When this flag is `true` and `popupContent` contains audio, no visual feedback will be
     * provided (meaning that audio will be just played)
     * @name TextTarget#onlyPlay
     * @type {boolean} */
    onlyPlay: false,
    //
    // TRANSIENT PROPERTIES
    //
    /**
     * The drop-down list associated to this target
     * @name TextTarget#$comboList
     * @type {external:jQuery} */
    $comboList: null,
    /**
     * The span element associated to this target
     * @name TextTarget#$span
     * @type {external:jQuery} */
    $span: null,
    /**
     * The paragraph element where $span is currently located
     * @name TextTarget#$p
     * @type {external:jQuery} */
    $p: null,
    /**
     * The span element containing the popup
     * @name TextTarget#$popup
     * @type {external:jQuery} */
    $popup: null,
    /**
     * Current text in the $span element
     * @name TextTarget#currentText
     * @type {string} */
    currentText: '',
    /**
     * Ordinal number of this target in the collection of targets
     * @name TextTarget#num
     * @type {number} */
    num: 0,
    /**
     * Current ordinal position of this target in the document
     * (used in {@link OrderText} activities)
     * @name TextTarget#pos
     * @type {number} */
    pos: 0,
    /**
     * Current status of the target. Valid values are: `NOT_EDITED`, `EDITED`, `SOLVED`, `WITH_ERROR` and `HIDDEN`
     * @name TextTarget#targetStatus
     * @type {string} */
    targetStatus: 'NOT_EDITED',
    /**
     * Flag to control if the initial content of this TextTarget has been modified
     * @name TextTarget#flagModified
     * @type {boolean} */
    flagModified: false,
    /**
     * Pointer to the activity panel containing this TextTarget
     * @name TextTarget#parentPane
     * @type {TextActivityBasePanel} */
    parentPane: null,
  });

  TextActivityDocument.TextTarget = TextTarget;

  return TextActivityDocument;
});
