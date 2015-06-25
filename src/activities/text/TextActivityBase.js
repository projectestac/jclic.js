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
  "../../AWT",
  "../../boxes/ActiveBox"
], function ($, Activity, AWT, ActiveBox) {

  //
  // This class acts as a base for all text activities
  var TextActivityBase = function (project) {
    Activity.call(this, project);
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
    // 
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

      var $html = $('<div class="JClicTextDocument"/>').css({'padding': 4});

      // 
      // Sets the default style
      $html.css(doc.style['default'].css);

      var currentPStyle = null;

      // 
      // Process paragraphs
      $.each(doc.p, function () {
        // Creates a new DOM paragraph
        var $p = $('<p/>').css({'margin': 0});
        var empty = true;

        // Check if the paragraph has its own style
        if (this.style) {
          currentPStyle = doc.style[this.style].css;
          $p.css(currentPStyle);
        }
        else
          currentPStyle = null;

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
                $span.html(this.text.replace(/ /g, '&nbsp;'));
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
              var target = this;
              $span = thisPanel.$createTarget(target, $span);
              target.num = thisPanel.targets.length;
              thisPanel.targets.push(target);
              $span.css(doc.style['default'].css);
              if (currentPStyle)
                $span.css(currentPStyle);
              if (target.attr) {
                // Default style name for targets is 'target'
                if (!target.attr.style)
                  target.attr.style = 'target';
                $span.css(doc.style[target.attr.style].css);
                // Check if target has specific attributes
                if (target.attr.css)
                  $span.css(target.attr.css);
              }
              $p.append($span);
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

      $dom.append($html);
      return $dom;
    },
    //
    // Creates the target DOM element
    // Function to be overrided in derivative classes to create specific types of targets
    // target (TextTarget) - The target related to the DOM object to be created
    // $span (JQuery DOM object) - An initial DOM object (usually a `span`) that can be used to
    // store the target, or replaced by another type of object.
    $createTarget: function (target, $span) {
      $span.html(target.text);
      target.$span = $span;
      return $span;
    },
    // 
    // Main handler to receive mouse and key events
    // Overrides same function in Activity.Panel
    processEvent: function (event) {
      if (this.playing) {
        switch (event.type) {
          case 'click':
            var p = new AWT.Point(
                event.pageX - this.$div.offset().left,
                event.pageY - this.$div.offset().top);
            for (var i = 0; i < this.boxes.length; i++) {
              if (this.boxes[i].contains(p)) {
                event.preventDefault();
                this.ps.stopMedia(1);
                this.boxes[i].playMedia(this.ps);
                return false;
              }
            }
        }
        return true;
      }
      return false;
    }
  };

  // TextActivityBase.Panel extends Activity.Panel
  TextActivityBase.prototype.Panel.prototype = $.extend(
      Object.create(ActPanelAncestor),
      TextActivityBase.prototype.Panel.prototype);

  return TextActivityBase;

});
