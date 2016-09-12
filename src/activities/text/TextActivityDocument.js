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
 *  (c) 2000-2016 Ministry of Education of Catalonia (http://xtec.cat)
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
   * targets are encapsulated in {@link TextActivityDocument.TextTarget} objects.
   * @exports TextActivityDocument
   * @class
   */
  var TextActivityDocument = function () {
    // Make a deep clone of the default style
    this.style = {'default': $.extend(true, {}, TextActivityDocument.DEFAULT_DOC_STYLE)};
    this.p = [];
    //this.tmb=new TargetMarkerBag();
    this.boxesContent = new ActiveBagContent();
    this.popupsContent = new ActiveBagContent();
  };

  TextActivityDocument.prototype = {
    constructor: TextActivityDocument,
    /**
     * Number of blank spaces between tabulators.
     * @type {number} */
    tabSpc: 12,
    /**
     * Index of the last {@link ActiveBox} activated.
     * @type {number} */
    lastBoxId: 0,
    /**
     * A bag of {@link TargetMarker} objects
     * @type {object} */
    tmb: null,
    /**
     * Number of targets
     * @type {number} */
    numTargets: 0,
    /**
     * Type of targets used in this activity. Possible values are: `TT_FREE`, `TT_CHAR`, `TT_WORD`
     * and `TT_PARAGRAPH`.
     * @type {string} */
    targetType: 'TT_FREE',
    /**
     * Bag with the content of the boxes embedded in the document.
     * @type {ActiveBagContent} */
    boxesContent: null,
    /**
     * Bag with the content of the pop-ups used by this activity.
     * @type {ActiveBagContent} */
    popupsContent: null,
    /**
     * Collection of named styles of the document
     * @type {object} */
    style: null,
    /**
     * The main document, represented as a collection of DOM objects
     * @type {object} */
    p: null,
    /**
     *
     * Loads the document settings from a specific JQuery XML element
     * @param {external:jQuery} $xml - The XML element to parse
     * @param {MediaBag} mediaBag - The media bag used to load images and media content
     */
    setProperties: function ($xml, mediaBag) {

      var doc = this;

      // Read named styles
      $xml.children('style').each(function () {
        var attr = doc.readDocAttributes($(this));
        // Grant always that basic attributes are defined
        doc.style[attr.name] = attr.name === 'default' ? $.extend(true, doc.style.default, attr) : attr;
      });

      // Read paragraphs
      $xml.find('section > p').each(function () {

        var p = {elements: []};

        // Read paragraph attributes
        $.each(this.attributes, function () {
          var name = this.name;
          var value = this.value;
          switch (this.name) {
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
        $(this).children().each(function () {
          var obj;
          var $child = $(this);
          switch (this.nodeName) {

            case 'cell':
              obj = new ActiveBoxContent().setProperties($child, mediaBag);
              break;

            case 'text':
              obj = {text: this.textContent.replace(/\t/g, '&#9;')};
              var attr = doc.readDocAttributes($child);
              if (!$.isEmptyObject(attr)) {
                obj.attr = attr;
              }
              break;

            case 'target':
              obj = new TextActivityDocument.TextTarget(doc, this.textContent.replace(/\t/g, '&#9;'));
              obj.setProperties($child, mediaBag);
              doc.numTargets++;
              break;

            default:
              Utils.log('error', 'Unknown object in activity document: "%s"', this.nodeName);
          }
          if (obj) {
            obj.objectType = this.nodeName;
            p.elements.push(obj);
          }
        });

        doc.p.push(p);
      });

      return this;
    },
    /**
     *
     * Reads sets of text attributes, sometimes in form of named styles
     * @param {external:jQuery} $xml - The XML element to parse
     * @returns {object}
     */
    readDocAttributes: function ($xml) {
      var attr = {};
      var css = {};
      var doc = this;
      $.each($xml.get(0).attributes, function () {
        var name = this.name;
        var val = this.value;
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
            if(doc.style[val]){
              attr = $.extend(true, {}, doc.style[val], attr);
              if(doc.style[val].css)
                css = $.extend({}, doc.style[val].css, css);
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
            css['font-size'] = val + 'px';
            break;
          case 'tabWidth':
            // `tab-size` CSS attribute is only set when the document has a specific `tabWidth`
            // setting. It must be accompanied of `white-space:pre` to successfully work.
            doc.tabSpc = val;
            css['tab-size'] = doc.tabSpc;
            css['white-space'] = 'pre-wrap';
            break;
          default:
            Utils.log('warn', 'Unknown text attribute: "%s" = "%s"', name, val);
            attr[name] = val;
            break;
        }
      });

      if (!$.isEmptyObject(css))
        attr['css'] = css;

      return attr;
    },
    /**
     *
     * Gets the full text of this document in raw format
     * @returns {String} - The text of the document.
     */
    getRawText: function () {
      var $html = $('<div/>');
      // Process paragraphs
      $.each(this.p, function () {
        // Creates a new DOM paragraph
        var $p = $('<p/>');
        var empty = true;
        // Process the paragraph elements
        $.each(this.elements, function () {
          switch (this.objectType) {
            case 'text':
            case 'target':
              $p.append(this.text);
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
    },
    /**
     * Gets a `style` object filled with default attributes plus attributes present in the
     * requested style name.
     * @param {string} name - The requested style name
     * @returns {Object} - The result of combining `default` with the requested style
     */
    getFullStyle: function (name) {
      var st = $.extend(true, {}, this.style.default);
      return $.extend(true, st, this.style[name] ? this.style[name] : {});
    }
  };

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
   * @param {TextActivityDocument} doc - The document to which this target belongs.
   * @param {string} text - Main text of this target.
   */
  TextActivityDocument.TextTarget = function (doc, text) {
    this.doc = doc;
    this.text = text;
    this.numIniChars = text.length;
    this.answers = [text];
    this.maxLenResp = this.numIniChars;
  };

  TextActivityDocument.TextTarget.prototype = {
    constructor: TextActivityDocument.TextTarget,
    /**
     * The {@link TextActivityDocument} to which this target belongs
     * @type {TextActivityDocument} */
    doc: null,
    /**
     * The current text displayed by this TextTarget
     * @type {string} */
    text: null,
    /**
     * A set of optional attributes for `text`
     * @type {object} */
    attr: null,
    /**
     * `true` when the target is a drop-down list
     * @type {boolean} */
    isList: false,
    /**
     * Number of characters initially displayed on the text field
     * @type {number} */
    numIniChars: 1,
    /**
     * Character used to fill-in the text field
     * @type {string} */
    iniChar: '_',
    /**
     * Maximum length of the answer
     * @type {number} */
    maxLenResp: 0,
    /**
     * Array of valid answers
     * @type {string[]} */
    answers: null,
    /**
     * Set of specific options
     * @type {object} */
    options: null,
    /**
     * Text displayed by the target when the activity begins
     * @type {string} */
    iniText: null,
    /**
     * Type of additional information offered to the user. Possible values are: `no_info`, `always`,
     * `onError` and `onDemand`.
     * @type {string} */
    infoMode: 'no_info',
    /**
     * An optional {@link ActiveBoxContent} with information about this TextTarget
     * @type {ActiveBoxContent} */
    popupContent: null,
    /**
     * Time (seconds) to wait before showing the additional information
     * @type {number} */
    popupDelay: 0,
    /**
     * Maximum amount of time (seconds) that the additional information will be shown
     * @type {number} */
    popupMaxTime: 0,
    /**
     * When this flag is `true` and `popupContent` contains audio, no visual feedback will be
     * provided (meaning that audio will be just played)
     * @type {boolean} */
    onlyPlay: false,
    //
    // TRANSIENT PROPERTIES
    //
    /**
     * The drop-down list associated to this target
     * @type {external:jQuery} */
    $comboList: null,
    /**
     * The span element associated to this target
     * @type {external:jQuery} */
    $span: null,
    /**
     * The paragraph element where $span is currently located
     * @type {external:jQuery} */
    $p: null,
    /**
     * Current text in the $span element
     * @type {string} */
    currentText: '',
    /**
     * Ordinal number of this target in the collection of targets
     * @type {number} */
    num: 0,
    /**
     * Current ordinal position of this target in the document
     * (used in {@link OrderText} activities)
     * @type {number} */
    pos: 0,
    /**
     * Current status of the target. Valid values are: `NOT_EDITED`, `EDITED`, `SOLVED`, `WITH_ERROR` and `HIDDEN`
     * @type {string} */
    targetStatus: 'NOT_EDITED',
    /**
     * Flag to control if the initial content of this TextTarget has been modified
     * @type {boolean} */
    flagModified: false,
    /**
     * Pointer to the activity panel containing this TextTarget
     * @type {TextActivityBase.Panel} */
    parentPane: null,
    /**
     *
     * Resets the TextTarget status
     * @param {string=} status - The `targetStatus` to be established. Default is `NOT_EDITED`
     */
    reset: function (status) {
      this.targetStatus = status ? status : 'NOT_EDITED';
      this.flagModified = false;
    },
    /**
     *
     * Loads the text target settings from a specific JQuery XML element
     * @param {external:jQuery} $xml - The XML element to parse
     * @param {MediaBag} mediaBag - The media bag used to load images and media content
     */
    setProperties: function ($xml, mediaBag) {
      var target = this;
      var firstAnswer = true;
      // Read specific nodes
      $xml.children().each(function () {
        var $node = $(this);
        switch (this.nodeName) {
          case 'answer':
            if (firstAnswer) {
              firstAnswer = false;
              target.answers = [];
            }
            if (target.answers === null)
              target.answers = [];
            target.answers.push(this.textContent);
            break;

          case 'optionList':
            $node.children('option').each(function () {
              target.isList = true;
              if (target.options === null)
                target.options = [];
              target.options.push(this.textContent);
            });
            break;

          case 'response':
            target.iniChar = Utils.getVal($node.attr('fill'), target.iniChar).charAt(0);
            target.numIniChars = Utils.getNumber($node.attr('length'), target.numIniChars);
            target.maxLenResp = Utils.getNumber($node.attr('maxLength'), target.maxLenResp);
            target.iniText = Utils.getVal($node.attr('show'), target.iniText);
            break;

          case 'info':
            target.infoMode = Utils.getVal($node.attr('mode'), 'always');
            target.popupDelay = Utils.getNumber($node.attr('delay'), target.popupDelay);
            target.popupMaxTime = Utils.getNumber($node.attr('maxTime'), target.popupMaxTime);
            $node.children('media').each(function () {
              target.onlyPlay = true;
              target.popupContent = new ActiveBoxContent();
              target.popupContent.mediaContent = new MediaContent().setProperties($(this));
            });
            if (!target.popupContent) {
              $node.children('cell').each(function () {
                target.popupContent = new ActiveBoxContent().setProperties($(this, mediaBag));
              });
            }
            break;

          case 'text':
            target.text = this.textContent.replace(/\t/g, '&#9;');
            var attr = TextActivityDocument.prototype.readDocAttributes($(this));
            if (!$.isEmptyObject(attr))
              target.attr = attr;
            break;

          default:
            break;
        }
      });
    },
    /**
     *
     * Gets a string with all valid answers of this TextTarget. Useful for reporting users' activity.
     * @returns {string}
     */
    getAnswers: function () {
      return this.answers ? this.answers.join('|') : '';
    },
    /**
     *
     * Sets specific colors to the target jQuery element, based on its `targetStatus` value. Red
     * color usually means error.
     */
    checkColors: function () {
      var $element = this.$comboList ? this.$comboList : this.$span;
      if ($element) {
        var style = this.doc.style[
            this.targetStatus === 'WITH_ERROR' ? 'targetError' :
            this.targetStatus === 'HIDDEN' ? 'default' : 'target'];
        if (style && style.css) {
          $element.css(style.css);
        }
      }
    },
    /**
     *
     * Fills the `currentText` member with the text currently hosted in $span or selected in $comboList
     * @returns {String} - The current text of this target
     */
    readCurrentText: function () {
      if (this.$span)
        this.currentText = this.$span.text();
      else if (this.$comboList)
        this.currentText = this.$comboList.val();
      return this.currentText;
    }
  };

  return TextActivityDocument;

});
