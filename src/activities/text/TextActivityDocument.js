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
  "../../media/MediaContent"
], function ($, Utils, ActiveBoxContent, MediaContent) {

//
// This class encapsulates the main document of text activities
//
  var TextActivityDocument = function () {
    // Make a deep clone of the default style
    this.style = {'default': $.extend(true, {}, this.DEFAULT_DOC_STYLE)};
    this.p = [];
  };

  TextActivityDocument.prototype = {
    constructor: TextActivityDocument,
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
              obj = {text: this.textContent.replace(/\t/g, '&emsp;')};
              var attr = doc.readDocAttributes($child);
              if (!$.isEmptyObject(attr)) {
                obj.attr = attr;
              }
              break;

            case 'target':
              obj = {text: this.textContent.replace(/\t/g, '&emsp;')};

              $child.children().each(function () {
                var $child = $(this);
                switch (this.nodeName) {                  
                  case 'answer':
                    obj.answer = this.textContent;
                    break;

                  case 'optionList':
                    obj.optionList = [];
                    $child.children('option').each(function () {
                      obj.optionList.push(this.textContent);
                    });
                    break;

                  case 'response':
                    obj.response = {};
                    $.each(this.attributes, function () {
                      switch (this.name) {
                        case 'fill':
                        case 'show':
                          obj.response[this.name] = this.value;
                          break;
                        case 'length':
                        case 'maxLenght':
                          obj[this.name] = Number(this.value);
                          break;
                      }
                    });
                    break;

                  case 'info':
                    obj.info = {};
                    $child.children('cell:first').each(function () {
                      switch (this.nodeName) {
                        case 'cell':
                          obj.info.cell = new ActiveBoxContent().setProperties($(this), mediaBag);
                          break;
                        case 'media':
                          obj.info.media = new MediaContent.setProperties($(this), mediaBag);
                          break;
                      }
                    });
                    obj.info.mode = $child.attr('mode');
                    obj.info.delay = Number($child.attr('delay') | 0);
                    obj.info.maxTime = Number($child.attr('maxTime') | 0);
                    break;

                  case 'text':
                    obj.text = this.textContent;
                    var attr = doc.readDocAttributes($child);
                    if (!$.isEmptyObject(attr))
                      obj.attr = attr;
                    break;
                }
              });
              break;

            default:
              console.log('Unknown object in activity document: ' + this.nodeName);
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
            // Attributes specific to named styles:
          case 'name':
          case 'base':
          case 'style':
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
            attr[name] = Number(val);
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
    }
  };

  return TextActivityDocument;

});
