//    File    : ActiveBoxContent.js  
//    Created : 13/04/2015  
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
  "../AWT",
  "../Utils",
  "./BoxBase",
  "../media/MediaContent"
], function ($, AWT, Utils, BoxBase, MediaContent) {

// This class defines a content that can be displayed by [ActiveBox](ActiveBox.html)
// objects. This content can be a text, an image, a fragment of an image or a
// combination of text and images. The style (colours, font and size, borders,
// shadow, margins, etc.) are specified in the `bb` attribute, always
// pointing to a [BoxBase](BoxBase.html) object.
  var ActiveBoxContent = function (id) {
    this.id = id;
    this.imgAlign = {h: 'middle', v: 'middle'};
    this.txtAlign = {h: 'middle', v: 'middle'};
  };

  ActiveBoxContent.prototype = {
    constructor: ActiveBoxContent,
    //
    // The [BoxBase](BoxBase.html) attribute of this content
    bb: null,
    // 
    // Optimal [Dimension](AWT.html#Dimension) of the [ActiveBox](ActiveBox.html)
    dimension: null,
    // The [ActiveBox](ActiveBox.html) must have or not a border, despite the
    // setting in [BoxBase](BoxBase.html). The default value `null` means not to
    // take in consideration this setting.
    border: null,
    //
    // The text to display in the [ActiveBox](ActiveBox.html). Can have up
    // to two paragraphs.
    text: null,
    //
    // The image file to display to display in the [ActiveBox](ActiveBox.html)
    imgName: null,
    //
    // A [AWT.Shape](AWT.html) used to clip the image
    imgClip: null,
    //
    // The [MediaContent](MediaContent.html) associated with this object.
    mediaContent: null,
    //
    // The horizontal and vertical alignment of text and image inside the cell.
    // Valid values are: `left`, `middle`, `right`, `top`, `bottom`
    imgAlign: null,
    txtAlign: null,
    //
    // Avoid overlapping of image and text
    avoidOverlapping: false,
    // 
    // Miscellaneous identifiers used in activities and reporting:
    id: -1,
    item: -1,
    // 
    // Transient properties, build and modified at run-time
    img: null,
    userData: null,
    rawText: null,
    htmlText: null,
    innerHtmlText: null,
    animated: false,
    // ActiveMediaPlayer
    amp: null,
    // Loads the object settings from a specific JQuery XML element 
    // $xml (JQuery XML element) - The XML element to parse
    // mediaBag ([MediaBag](MediaBag.html)) - The media bag used to retrieve images and other media
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
            content['txtAlign'] = content.readAlign(val+',center');
            content['imgAlign'] = content.readAlign(val+',center');
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
      
      if(mediaBag)
        this.realizeContent(mediaBag);

      return this;
    },
    // 
    // Decode expressions with combined values of horizontal and vertical alugnments
    // in the form: "(left|middle|right),(top|middle|bottom)"
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
      return (this.text === null && this.img === null);
    },
    //
    // Checks if this content is equivalent to the provided one
    // abc (ActiveBoxContent) - The content to compare to
    isEquivalent: function (abc, checkCase) {
      if (abc === this)
        return true;
      var result = false;
      if (abc !== null) {
        if (this.isEmpty() && abc.isEmpty())
          result = (this.id === abc.id);
        else
          result = (this.text === null ? abc.text === null
              : (checkCase ? this.text === abc.text
                  : this.text.toLocaleLowerCase() === abc.text.toLocaleLowerCase())
              ) &&
              (this.mediaContent === null ? abc.mediaContent === null
                  : this.mediaContent.isEquivalent(abc.mediaContent)
                  ) &&
              (this.img === abc.img) &&
              (this.imgClip === null ? abc.imgClip === null
                  : this.imgClip.equals(abc.imgClip));
      }
      return result;
    },
    //
    // Sets the text content of this ActiveBox
    setTextContent: function (tx) {
      // only plain text!
      if (tx !== null) {
        this.rawText = tx;
        this.text = tx;
        this.checkHtmlText(null);
      }
      else {
        this.rawText = null;
        this.text = null;
        this.htmlText = null;
        this.innerHtmlText = null;
      }
    },
    // Checks HTML text inside cells
    checkHtmlText: function () {
      this.htmlText = null;
      this.innerHtmlText = null;
      if (this.text !== null && this.text.trim().toLocaleLowerCase().indexOf("<html>") === 0) {
        this.htmlText = this.text.trim();
        var s = this.htmlText.toLocaleLowerCase();
        if (s.indexOf("<body") === -1) {
          var s2 = s.indexOf("</html>");
          if (s2 >= 0) {
            this.innerHtmlText = this.htmlText.substr(6, s2);
          }
        }
      }
    },
    //
    // Prepares media content
    prepareMedia: function (playStation) {
      // TODO: Implement ActiveBoxContent.prepareMedia()
    },
    // 
    // Reads and initializes the image
    // mediaBag ([MediaBag](MediaBag.html)) - The MediaBag of the current project
    realizeContent: function (mediaBag) {
      var thisContent = this;
      if (this.imgName !== null) {
        var mbe = mediaBag.elements[this.imgName];
        if (mbe !== null) {
          mbe.build(function() {
            thisContent.img = mbe.data;
          });
        }
      }
      if (this.mediaContent !== null) {
        if (this.imgName === null && (this.text === null || this.text.length === 0)) {
          this.img = this.mediaContent.getIcon();
        }
      }
      this.checkHtmlText(mediaBag);
    },
    // Gets an empty ActiveBoxContent
    EMPTY_CONTENT: null
  };

  ActiveBoxContent.prototype.EMPTY_CONTENT = new ActiveBoxContent();

  return ActiveBoxContent;

});
