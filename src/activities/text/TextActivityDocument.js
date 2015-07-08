//    File    : TextActivityDocument.js  
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
  "../../Utils",
  "../../boxes/ActiveBoxContent",
  "../../media/MediaContent",
  "../../boxes/ActiveBagContent"
], function ($, Utils, ActiveBoxContent, MediaContent, ActiveBagContent) {

  //   // #### <a name="TextTarget">TextTarget</a> ####
  // This class contains the properties and methods of the document elements that are the 
  // real targets of user actions in text activities.
  //
  var TextTarget = function (doc, text) {
    this.doc = doc;
    this.text = text;
    this.numIniChars = text.length;
    this.answers = [text];
    this.maxLenResp = this.numIniChars;
  };

  TextTarget.prototype = {
    constructor: TextTarget,
    // The TextActivityDocument to which this target belongs
    doc: null,
    //
    // The current text displayed by this TextTarget
    text: null,
    //
    // A set of optional attributes for `text`
    attr: null,
    // 
    // Target is a drop-down list
    isList: false,
    //
    // Number of characters initially displayed on the text field
    numIniChars: 1,
    //
    // Character used to fill-in the text field
    iniChar: '_',
    //
    // Maximum length of the answer
    maxLenResp: 0,
    //
    // Array of valid answers
    answers: null,
    //
    // Array of specific options
    options: null,
    //
    // Initial text
    iniText: null,
    //
    // Type of additional information offered to the user. Valid values are:
    // `no_info`, `always`, `onError`, `onDemand`
    infoMode: 'no_info',
    //
    // An optional [ActiveBoxContent](ActiveBoxContent.html) with information about this TextTarget
    popupContent: null,
    //
    // Time to wait before showing the additional information
    popupDelay: 0,
    //
    // Maximum amount of time the additional inforation will be shown
    popupMaxTime: 0,
    //
    // When this flag is `true` and `popupContent` contains audio, no visual feedback will be provided
    // (the audio will be just played)
    onlyPlay: false,
    //
    // TRANSIENT PROPERTIES
    //
    // The drop-down list or span element associated to this target
    $comboList: null,
    $span: null,
    // 
    // Current text in the $span element
    currentText: '',
    //
    // Ordinal number of this target into the activity collection of targets
    num: 0,
    //
    // Current target status. Valid values are: `NOT_EDITED`, `EDITED`, `SOLVED` and `WITH_ERROR`
    targetStatus: 'NOT_EDITED',
    //
    // Flag to control if the initial content of this TextTarget has been mofifed
    flagModified: false,
    //
    // Pointer to the TextActivityBase.Panel containing this TextTarget
    parentPane: null,
    //
    // Resets the TextTarget status
    reset: function () {
      this.targetStatus = 'NOT_EDITED';
      this.flagModified = false;
    },
    //
    // Loads the object settings from a specific JQuery XML element 
    setProperties: function ($xml, mediaBag) {
      var tt = this;
      var firstAnswer = true;
      // Read specific nodes
      $xml.children().each(function () {
        var $node = $(this);
        switch (this.nodeName) {
          case 'answer':
            if (firstAnswer) {
              firstAnswer = false;
              tt.answers = [];
            }
            if (tt.answers === null)
              tt.answers = [];
            tt.answers.push(this.textContent);
            break;

          case 'optionList':
            $node.children('option').each(function () {
              tt.isList = true;
              if (tt.options === null)
                tt.options = [];
              tt.options.push(this.textContent);
            });
            break;

          case 'response':
            tt.iniChar = Utils.getVal($node.attr('fill'), tt.iniChar).charAt(0);
            tt.numIniChars = Utils.getNumber($node.attr('length'), tt.numIniChars);
            tt.maxLenResp = Utils.getNumber($node.attr('maxLength'), tt.maxLenResp);
            tt.iniText = Utils.getVal($node.attr('show'), tt.iniText);
            break;

          case 'info':
            tt.infoMode = Utils.getVal($node.attr('mode'), 'always');
            tt.popupDelay = Utils.getNumber($node.attr('delay'), tt.popupDelay);
            tt.popupMaxTime = Utils.getNumber($node.attr('maxTime'), tt.popupMaxTime);
            $node.children('media').each(function () {
              tt.onlyPlay = true;
              tt.popupContent = new ActiveBoxContent();
              tt.popupContent.mediaContent = new MediaContent().setProperties($(this));
            });
            if (!tt.popupContent) {
              $node.children('cell').each(function () {
                tt.popupContent = new ActiveBoxContent().setProperties($(this, mediaBag));
              });
            }
            break;

          case 'text':
            tt.text = this.textContent.replace(/\t/g, '&#9;');
            var attr = TextActivityDocument.prototype.readDocAttributes($(this));
            if (!$.isEmptyObject(attr))
              tt.attr = attr;
            break;

          default:
            break;
        }
      });
    },
    //
    // Gets a string with all valid answers of this Texttarget. Useful for reporting users activity.
    getAnswers: function () {
      return this.answers ? this.answers.join('|') : '';
    },
    //
    // Sets specific colors to the target JQuery element, based on its `targetStatus` value.
    checkColors: function () {
      var $element = this.$comboList ? this.$comboList : this.$span;
      if ($element) {
        var style = this.doc.style[this.targetStatus === 'WITH_ERROR' ? 'targetError' : 'target'];
        if (style && style.css) {
          $element.css(style.css);
        }
      }
    }
  };

  //
  // TextActivityDocument is the main HTML document used in text activities
  var TextActivityDocument = function () {
    // Make a deep clone of the default style
    this.style = {'default': $.extend(true, {}, this.DEFAULT_DOC_STYLE)};
    this.p = [];
    //this.tmb=new TargetMarkerBag();
    this.boxesContent = new ActiveBagContent();
    this.popupsContent = new ActiveBagContent();
  };

  TextActivityDocument.prototype = {
    constructor: TextActivityDocument,
    //
    // Blank spaces between tabulators
    tabSpc: 12,
    //
    // Last ActiveBox activated
    lastBoxId: 0,
    //
    // A bag of TargetMarker objects
    tmb: null,
    //
    // Type of targets used in this activity.
    // Valid values are: `TT_FREE`, `TT_CHAR`, `TT_WORD`, `TT_PARAGRAPH`
    targetType: 'TT_FREE',
    //
    // Two [ActiveBagContent](ActiveBagContent.html) objects with the content of boxes and pop-ups
    boxesContent: null,
    popupsContent: null,
    //
    // Collection of named styles of the document
    style: null,
    //
    // The main document, represented as an array of DOM objects
    p: null,
    //
    // Loads the object settings from a specific JQuery XML element 
    setProperties: function ($xml, mediaBag) {

      var doc = this;

      // Read named styles
      $xml.children('style').each(function () {
        var attr = doc.readDocAttributes($(this));
        doc.style[attr.name] = attr;
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
              obj = new TextTarget(doc, this.textContent.replace(/\t/g, '&#9;'));
              obj.setProperties($child, mediaBag);
              break;

            default:
              console.log('[JClic] - Unknown object in activity document: ' + this.nodeName);
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
    //
    // Reads sets of text attributes, sometimes in form of named styles
    readDocAttributes: function ($xml) {
      var attr = {};
      var css = {};
      var thisDoc = this;
      $.each($xml.get(0).attributes, function () {
        var name = this.name;
        var val = this.value;
        switch (name) {
          case 'background':
            val = Utils.checkColor(val, 'white');
            attr[name] = val;
            css['background'] = val;
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
          case 'base':
          case 'style':
            // Attributes specific to named styles:
            attr[name] = val;
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
            // setting. It must be accompained of `white-space:pre` to successfully work.
            thisDoc.tabSpc = val;
            css['tab-size'] = thisDoc.tabSpc;
            css['white-space'] = 'pre-wrap';
            break;
          default:
            console.log('Unknown text attribute: ' + name + ': ' + val);
            attr[name] = val;
            break;
        }
      });

      if (!$.isEmptyObject(css))
        attr['css'] = css;

      return attr;
    },
    // 
    // Default style for new documents
    DEFAULT_DOC_STYLE: {background: 'white', foreground: 'black',
      family: 'Arial', size: 17,
      css: {'font-family': 'Arial,Helvetica,sans-serif', 'font-size': '17px',
        'margin': '0px', padding: '0px', 'text-align': 'center', 'vertical-align': 'middle'}
    },
    // 
    // A reference to the TextTarget class
    TextTarget: TextTarget
  };

  return TextActivityDocument;

});
