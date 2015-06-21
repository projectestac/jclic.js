//    File    : TextActivityBase.js  
//    Created : 16/05/2015  
//    By      : fbusquet  
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
  "../../Activity",
  "../../Utils",
  "../../media/MediaContent",
  "../../boxes/ActiveBox",
  "../../boxes/ActiveBoxContent",
], function ($, Activity, Utils, MediaContent, ActiveBox, ActiveBoxContent) {

  //
  // This class acts as a base for all text activities
  var TextActivityBase = function (project) {
    Activity.call(this, project);
  };
  // TextActivityBase.prototype implemented after TextTarget. See below.

  // TextTarget is the hearth of most actions in text activities
  var TextTarget = function (text) {
    this.numIniChars = text.length;
    this.answer = [text];
    this.maxLenResp = this.numIniChars;
  };

  TextTarget.prototype = {
    constructor: TextTarget,
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
    answer: null,
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
    // The drop-down list showing the options
    $comboList: null,
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
      if (this.$comboList !== null)
        // TODO: Implement $comboList.checkColors
        this.$comboList.checkColors();
    },
    //
    // Loads the object settings from a specific JQuery XML element 
    setProperties: function ($xml, mediaBag) {
      var tt = this;
      // Read specific nodes
      $xml.children().each(function () {
        var $node = $(this);
        switch (this.nodeName) {
          case 'answer':
            if (tt.answer === null)
              tt.answer = [];
            tt.answer.push(this.text);
            break;

          case 'optionList':
            $node.children('option').each(function () {
              tt.isList = true;
              if (tt.options === null)
                tt.options = [];
              tt.options.push(this.text);
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

          default:
            break;
        }
      });
    }
  };

  TextActivityBase.prototype = {
    constructor: TextActivityBase,
    //
    // Constructor of this Activity.Panel object
    Panel: function (act, ps, $div) {
      Activity.prototype.Panel.call(this, act, ps, $div);
      this.boxes = [];
      this.popups = [];
      this.targets = [];
    }
  };

  // 
  // TextActivityBase extends Activity
  TextActivityBase.prototype = $.extend(Object.create(Activity.prototype), TextActivityBase.prototype);

  // 
  // Properties and methods specific to TextAvtivityBase.Panel
  var ActPanelAncestor = Activity.prototype.Panel.prototype;
  TextActivityBase.prototype.Panel.prototype = {
    constructor: TextActivityBase.prototype.Panel,
    // 
    // Array of ActiveBox objects contained in this Panel
    boxes: null,
    // 
    // Array of ActiveBox objects used as popup elements
    popups: null,
    // 
    // Array of target elements    
    targets: null,
    //
    // Prepares the text panel
    buildVisualComponents: function () {
      ActPanelAncestor.buildVisualComponents.call(this);
      this.setDocContent(this.$div, this.act.document);
    },
    // Fills a DOM element with the specified document
    // $dom (JQuery DOM object) - The DOM objject to be filled with the document
    // doc ([TextActivityDocument](TextActivityDocument.html)) - The document
    setDocContent: function ($dom, doc) {

      var thisPanel = this;

      // 
      // Empties the conainer of any pre-existing content
      // and sets the background and other attributes indicated by the main
      // style of the document.
      // It also sets the 'overflow' CSS attribute to 'auto', which will display a
      // vertical scroll bar when needed
      $dom.empty().css(doc.style['default'].css).css('overflow', 'auto');

      var $html = $('<div/>').css({'padding': 4});

      // 
      // Sets the default style
      $html.css(doc.style['default'].css);
      // 
      // Process paragraphs
      $.each(doc.p, function () {
        // Creates a new DOM paragraph
        var $p = $('<p/>').css({'margin': 0});
        var empty = true;

        // Check if the paragraph has its own style
        if (this.style) {
          $p.css(doc.style[this.style].css);
        }

        // Check if the paragraph has a special alignment
        if (this.Alignment) {
          var al = Number(this.Alignment);
          $p.css({'text-align': al === 1 ? 'center' : al === 2 ? 'right' : 'left'});
        }

        // Process the paragraph elements
        $.each(this.elements, function () {
          // Elements will be inserted as 'span' DOM elements, or as simple text if they don't 
          // have specific attributes.
          var $span = $('<span/>');
          switch (this.objectType) {
            case 'text':
              if (this.attr) {
                // Text uses a specific style and/or individual attributes
                $span.html(this.text);
                if (this.attr.style) {
                  $span.css(doc.style[this.attr.style].css);
                }
                if (this.attr.css) {
                  $span.css(this.attr.css);
                }
                $p.append($span);
              }
              else {
                $p.append(this.text);
              }
              break;

            case 'cell':
              // Create a new [ActiveBox] based on this [ActiveBoxContent]
              var box = ActiveBox.prototype._createCell($span, this);
              // Save the box for future references
              thisPanel.boxes.push(box);
              $span.css({'display': 'inline-block', 'vertical-align': 'middle'});
              $p.append($span);
              break;

            case 'target':
              // TODO: Create a TextTarget object
              //var target = new TextTarget(this.text);
              //target.setProperties($(this), thisPanel.act.project.mediaBag);
              
              $span.html(this.text);
              if (this.attr) {
                // Default style name for targets is 'target'
                if (!this.attr.style)
                  this.attr.style = 'target';
                $span.css(doc.style[this.attr.style].css);
                // Check if target has specific attributes
                if (this.attr.css)
                  $span.css(this.attr.css);
              }
              $p.append($span);
              //thisPanel.targets.push(target);
              break;
          }
          empty = false;
        });
        if (empty) {
          // Don't leave the empty paragraphs
          $p.html('&nbsp;');
        }

        // Adds the paragraph to the DOM element
        $html.append($p);
      });

      $dom.append($html);
      return $dom;
    }
  };

  // TextActivityBase.Panel extends Activity.Panel
  TextActivityBase.prototype.Panel.prototype = $.extend(
      Object.create(ActPanelAncestor),
      TextActivityBase.prototype.Panel.prototype);

  return TextActivityBase;

});
