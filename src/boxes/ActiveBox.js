//    File    : ActiveBox.js  
//    Created : 18/04/2015  
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
  "./AbstractBox",
  "./ActiveBoxContent",
  "./ActiveBagContent",
  "../AWT",
  "../Utils"
], function ($, AbstractBox, ActiveBoxContent, ActiveBagContent, AWT, Utils) {

//
// Objects of this class are widely used in JClic activities: cells in puzzles
// and associations, messages and other objects are active boxes. The specific
// content, size and location of `ActiveBox` objects is determined by its
// [ActiveBoxContent](ActiveBoxContent.html) members. Most ActiveBoxes have only
// one content, but some of them can have a secondary or "alternative" content,
// stored in the `altContent` field. This content is used only when the
// `alternative` flag of the ActiveBox is on.
// Active boxes can host video and interactive media content (specified in the
// `mediaContent` member of the [ActiveBoxContent](ActiveBoxContent.html) through
// the `hostedMediaPlayer` member.

  var ActiveBox = function (parent, container, boxBase, setIdLoc, rect) {
    
    // ActiveBox extends AbstractBox
    AbstractBox.call(this, parent, container, boxBase);
    
    if (setIdLoc)
      this.idLoc = setIdLoc;
    if (rect)
      this.setBounds(rect);
  };

  ActiveBox.prototype = {
    constructor: ActiveBox,
    // 
    // Numeric identifiers used in some activities
    idOrder: -1,
    idLoc: -1,
    idAss: -1,
    //
    // The [ActiveBoxContent](ActiveBoxContent.html) members, containing
    // the ral content of this box
    content: null,
    altContent: null,
    //
    // Flag to check if this box has a 'hosted component'
    hasHostedComponent: false,
    //
    // The media player (usually an HTML5 media tag) containing
    hostedMediaPlayer: null,
    //
    // Returns the current media content used by the box
    getCurrentContent: function () {
      return this.isAlternative() ? this.altContent : this.content;
    },
    //
    // Returns the current content
    getContent: function () {
      if (this.content === null)
        this.setContent(new ActiveBoxContent());
      return this.content;
    },
    //
    // Clears the current content
    clear: function () {
      this.content = null;
      this.altContent = null;
      this.idOrder = -1;
      this.setInactive(true);
      //
      //TODO: Implement hosted components
      //if (!this.hasHostedComponent)
      //  this.setHostedComponent(null);
      //this.setHostedMediaPlayer(null);
      this.invalidate();
    },
    //
    // Checks if two ActiveBox objects have equivalent content
    isEquivalent: function (bx, checkCase) {
      return bx !== null &&
          this.content !== null &&
          this.content.isEquivalent(bx.content, checkCase);
    },
    // 
    // Same functionality, but comparing the current content
    isCurrentContentEquivalent: function (bx, checkCase) {
      return bx !== null &&
          this.getCurrentContent() !== null &&
          this.getCurrentContent().isEquivalent(bx.getCurrentContent(), checkCase);
    },
    // 
    // Function used to swap the position of two `ActiveBox`
    exchangeLocation: function (bx) {
      var pt = new AWT.Point(this.pos);
      var idLoc0 = this.idLoc;
      this.moveTo(bx.pos);
      bx.moveTo(pt);
      this.idLoc = bx.idLoc;
      bx.idLoc = idLoc0;
    },
    //
    // Copy the content of another ActiveBox into this one
    copyContent: function (bx) {
      this.idOrder = bx.idOrder;
      this.idAss = bx.idAss;
      this.content = bx.content;
      this.altContent = bx.altContent;
      if (this.content !== null) {
        if (this.content.bb !== null)
          this.setBoxBase(this.content.bb);
        if (this.content.border !== null && bx.hasBorder() !== this.content.border)
          this.setBorder(this.content.border);
      }
      this.setInactive(bx.isInactive());
      this.setInverted(bx.isInverted());
      this.setAlternative(bx.isAlternative());
      this.setHostedComponent(bx.getHostedComponent());
      this.hasHostedComponent = bx.hasHostedComponent;
      //this.setHostedMediaPlayer(bx.hostedMediaPlayer);
      //if(this.hostedMediaPlayer!=null)
      //    this.hostedMediaPlayer.setVisualComponentVisible(!isInactive() && isVisible());
    },
    // 
    // Exhange the content of this ActiveBox with another
    exchangeContent: function (bx) {
      var bx0 = new ActiveBox(this.getParent(), this.getContainerX(), this.boxBase);
      bx0.copyContent(this);
      this.copyContent(bx);
      bx.copyContent(bx0);
    },
    //
    // Sets the text content of this ActiveBox
    setTextContent: function (tx) {
      // only plain text!
      if (tx === null)
        tx = '';
      if (this.content === null)
        this.content = new ActiveBoxContent();
      this.content.rawText = tx;
      this.content.text = tx;
      this.content.mediaContent = null;
      this.content.img = null;

      this.setHostedComponent(null);
      this.setInactive(false);
      this.checkHostedComponent();
      this.setHostedMediaPlayer(null);
    },
    //
    // Sets the default value for `idAss`
    setDefaultIdAss: function () {
      this.idAss = (this.content === null ? -1 : this.content.id);
    },
    //
    // Check if this ActiveBox is at its original place  
    isAtPlace: function () {
      return this.idOrder === this.idLoc;
    },
    //
    // Sets the [ActiveBoxContent](ActiveBoxContent.html) of this ActiveBox
    // `abc` can be both an [ActiveBoxContent](ActiveBoxContent.html) or an
    // [ActiveBagContent](ActiveBagContent.html) containing a collection of
    // content objects. In this second case, the parameter `i` indicates
    // the index of the ActiveBoxContent to be used.
    setContent: function (abc, i) {
      if (abc instanceof ActiveBagContent) {
        if (i < 0)
          i = this.idOrder;
        if (i >= abc.getNumCells())
          return;
        if (abc.bb !== this.boxBase)
          this.setBoxBase(abc.bb);

        // `abc` is now an [ActiveBoxContent](ActiveBoxContent.html)
        abc = abc.getActiveBoxContent(i);
      }
      // TODO: Implement hosted component
      // this.setHostedComponent(null);
      // TODO: Implement hosted media player
      // this.setHostedMediaPlayer(null);
      this.content = abc;
      if (abc !== null) {
        if (abc.bb !== this.boxBase)
          this.setBoxBase(abc.bb);
        if (abc.hasOwnProperty('border') && this.hasBorder() !== abc.border)
          this.setBorder(abc.border);
        this.setInactive(false);
        this.checkHostedComponent();
        this.checkAutoStartMedia();
      }
      else
        this.clear();
      
      this.invalidate();
    },
    //
    // Checks if the ActiveBox has a [MediaContent](MediaContent.html) in 
    // `autostart` mode
    checkAutoStartMedia: function () {
      var cnt = this.getContent();
      if (cnt !== null && cnt.mediaContent !== null &&
          cnt.mediaContent.autoStart && cnt.amp !== null) {
        cnt.amp.play(this);
      }
    },
    //
    // Sets the [ActiveBoxContent](ActiveBoxContent.html) that will act as a
    // alternative content (`altContent` field) of this ActiveBox
    // The parpameter `abc` can be an [ActiveBoxContent](ActiveBoxContent.html)
    // or an [ActiveBagContent](ActiveBagContent.html) containing a collection of
    // content objects. In this second case, the parameter `i` indicates
    // the index of the ActiveBoxContent to be used.
    setAltContent: function (abc, i) {
      if (abc instanceof ActiveBagContent) {
        if (i < 0)
          i = this.idOrder;
        // `abc` is now an [ActiveBoxContent](ActiveBoxContent.html)
        abc = abc.getActiveBoxContent(i);
      }
      this.altContent = abc;
      this.checkHostedComponent();
      if (this.isAlternative() && this.hostedMediaPlayer !== null)
        this.setHostedMediaPlayer(null);
    },
    //
    // Sets the current content of this ActiveBox    
    setCurrentContent: function (abc) {
      if (this.isAlternative())
        this.setAltContent(abc);
      else
        this.setContent(abc);
      this.invalidate();
    },
    // 
    // Puts this ActiveBox in "alternative" mode, meaning that `altContent` will
    // be used in place of `content`
    switchToAlt: function () {
      if (this.isAlternative() || this.altContent === null || this.altContent.isEmpty())
        return false;
      this.setHostedComponent(null);
      this.setHostedMediaPlayer(null);
      this.setAlternative(true);
      this.checkHostedComponent();
      this.checkAutoStartMedia();
      return true;
    },
    //
    // Checks the presence of content susceptible to be treated as HTML DOM
    // embedded into this ActiveBox
    // See: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Drawing_DOM_objects_into_a_canvas
    // ctx: The Context2D of the canvas object containing this ActiveBox
    checkHostedComponent: function (ctx) {
      if (this.hasHostedComponent)
        return;
      var abc = this.getCurrentContent();
      var bb = this.getBoxBaseResolve();
      var jc = null;
      if (!this.isInactive() && abc !== null && abc.htmlText !== null) {
        var s = abc.htmlText;
        if (abc.innerHtmlText !== null) {
          var css = bb.getCSS();

          var backColor = this.isInactive() ? bb.inactiveColor
              : this.isInverted() ? bb.textColor : bb.backColor;
          css['background-color'] = backColor;

          var foreColor = this.isInverted() ? bb.backColor
              : this.isAlternative() ? bb.alternativeColor : bb.textColor;
          css['color'] = foreColor;

          css['text-align'] = abc.txtAlign.h.replace('middle', 'center');

          var divHtml = '<div xmlns="http://www.w3.org/1999/xhtml" style="' +
              Utils.cssToString(css) + '">' +
              abc.innerHtmlText + '</div>';

          var svgData = '<svg xmlns="http://www.w3.org/2000/svg" width="' +
              this.dim.width + '" height="' + this.dim.height + '">' +
              '<foreignObject width="100%" height="100%">' +
              divHtml +
              '</foreignObject>' +
              '</svg>';

          var DOMURL = window.URL || window.webkitURL || window;

          var img = new Image();
          var svg = new Blob([svgData], {type: 'image/svg+xml;charset=utf-8'});
          var url = DOMURL.createObjectURL(svg);

          img.onload = function () {
            ctx.drawImage(img, 0, 0);
            DOMURL.revokeObjectURL(url);
          };
          img.src = url;
        }
      }
    },
    //
    // Creates a new cell inside a JQuery DOM element.  
    // Should be invoked throught `ActiveBox.prototype`
    // $dom (JQuery DOM element) - The element that will act as a container
    // abc ([ActiveBoxContent](ActiveBoxContent.html)) - The cell's content. Must not be null and
    // have the `dimension` member initialized.  
    // returns: The newly created ActiveBox
    _createCell: function($dom, abc){
      if(abc && abc.dimension){
        var box = new ActiveBox();
        box.setContent(abc);
        var $canvas = $('<canvas width="'+ abc.dimension.width +'" height="'+ abc.dimension.height + '"/>');
        box.setBounds(new AWT.Rectangle(0, 0, abc.dimension.width, abc.dimension.height));
        $dom.append($canvas);
        box.ctx = $canvas.get(0).getContext('2d');
        box.repaint();
        return box;
      }            
    },
    // Draws the content of this Activebox to the specified canvas context
    updateContent: function (ctx, dirtyRegion) {

      var abc = this.getCurrentContent();
      var bb = this.getBoxBaseResolve();

      if (this.isInactive() || abc === null || this.dim.width < 2 || this.dim.height < 2)
        return true;

      if (dirtyRegion && !this.intersects(dirtyRegion))
        return false;

      var imgRect = null;

      if (abc.img !== null) {
        if (abc.imgClip !== null) {
          var r = abc.imgClip.getBounds();
          ctx.drawImage(abc.img,
              r.pos.x, r.pos.y, r.dim.width, r.dim.height,
              this.pos.x, this.pos.y, this.dim.width, this.dim.height);
        }
        else {
          var imgw, imgh;
          var compress = false;
          imgw = abc.img.naturalWidth;
          if (imgw === 0)
            imgw = this.dim.width;
          imgh = abc.img.naturalHeight;
          if (imgh === 0)
            imgh = this.dim.height;
          var scale = 1.0;
          if (Utils.settings.COMPRESS_IMAGES &&
              (this.dim.width > 0 && this.dim.height > 0) &&
              (imgw > this.dim.width || imgh > this.dim.height)) {
            scale = Math.min(this.dim.width / imgw, this.dim.height / imgh);
            imgw *= scale;
            imgh *= scale;
            compress = true;
          }
          var xs = (abc.imgAlign.h === 'left' ? 0
              : abc.imgAlign.h === 'right' ? this.dim.width - imgw
              : (this.dim.width - imgw) / 2);
          var ys = (abc.imgAlign.v === 'top' ? 0
              : abc.imgAlign.v === 'bottom' ? this.dim.height - imgh
              : (this.dim.height - imgh) / 2);
          if (compress) {
            ctx.drawImage(abc.img, this.pos.x + xs, this.pos.y + ys, imgw, imgh);
          }
          else
            ctx.drawImage(abc.img, this.pos.x + xs, this.pos.y + ys);

          if (abc.avoidOverlapping && abc.text !== null)
            imgRect = new AWT.Rectangle(
                Math.max(0, xs), Math.max(0, ys),
                Math.min(this.dim.width, imgw), Math.min(this.dim.height, imgh));
        }
      }
      if (abc.text !== null && abc.text.length > 0) {
        var px = this.pos.x;
        var py = this.pos.y;
        var pWidth = this.dim.width;
        var pHeight = this.dim.height;
          if (imgRect !== null) {
          // There is an image in the ActiveBox
          // Try to compute the current space available for text
          var prx = [0, imgRect.pos.x, imgRect.pos.x + imgRect.dim.width, pWidth];
          var pry = [0, imgRect.pos.y, imgRect.pos.y + imgRect.dim.height, pHeight];
          var rr = [
            // Calc four rectangles inside BoxBag, sourronding imgRect
            // Top rectangle:
            new AWT.Rectangle(prx[0], pry[0], prx[3], pry[1]),
            // Bottom rectangle:
            new AWT.Rectangle(prx[0], pry[2], prx[3], pry[3] - pry[2]),
            // Left rectangle:
            new AWT.Rectangle(prx[0], pry[0], prx[1], pry[3]),
            // Right rectangle:
            new AWT.Rectangle(prx[2], pry[0], prx[3] - prx[2], pry[3])
          ];
          //
          // Find the rectangle with highest surface, and in accordance
          // with the `txtAlign` values of the current
          // [ActiveBoxContent](ActiveBoxContent)                  
          var rmax = rr[0];
          var maxSurface = rmax.dim.width * rmax.dim.height;
          for (var i = 1; i < rr.length; i++) {
            var s = rr[i].dim.width * rr[i].dim.height;
            if (s > maxSurface - 1) {
              if (Math.abs(s - maxSurface) <= 1) {
                var b = false;
                switch (i) {
                  case 1:
                    b = (abc.txtAlign.v === 'bottom');
                    break;
                  case 2:
                    b = (abc.txtAlign.h === 'left');
                    break;
                  case 3:
                    b = (abc.txtAlign.h === 'right');
                    break;
                }
                if (!b)
                  continue;
              }
              maxSurface = s;
              rmax = rr[i];
            }
          }
          // Finally, this is the surface available to draw text:
          px += rmax.pos.x;
          py += rmax.pos.y;
          pWidth = rmax.dim.width;
          pHeight = rmax.dim.height;
        }

        // Calc available width and height, discounting margins
        var availWidth = Math.max(5, pWidth - 2 * bb.textMargin);
        var availHeight = Math.max(5, pHeight - 2 * bb.textMargin);

        // Calc the size of each line
        var lines = bb.prepareText(ctx, abc.text, availWidth, availHeight);

        ctx.font = bb.font.cssFont();
        ctx.textBaseline = 'hanging';
        var lineHeight = bb.font.getHeight();
        var totalHeight = lineHeight * lines.length;

        // Calc the vertical co-ordinate of the first line
        // Default is 'middle'

        var y = py + bb.textMargin + (abc.txtAlign.v === 'top' ? 0
            : abc.txtAlign.v === 'bottom' ?
            availHeight - totalHeight : (availHeight - totalHeight) / 2);

        for (var l = 0; l < lines.length; l++, y += lineHeight) {
          // Calc the horizontal position of each line
          // Default is 'middle'
          var x = px + bb.textMargin + (abc.txtAlign.h === 'left' ? 0
              : abc.txtAlign.h === 'right' ?
              availWidth - lines[l].size.width
              : (availWidth - lines[l].size.width) / 2);

          if (bb.shadow) {
            // Rennder text shadow
            var d = Math.max(1, bb.font.size / 10);
            ctx.fillStyle = bb.shadowColor;
            ctx.fillText(lines[l].text, x + d, y + d);
          }
          // Render text
          ctx.fillStyle = this.isInverted() ? bb.backColor
              : this.isAlternative() ? bb.alternativeColor : bb.textColor;
          ctx.fillText(lines[l].text, x, y);
        }
      }
      return true;
    }
  };

  // ActiveBox extends AbstractBox
  ActiveBox.prototype = $.extend(Object.create(AbstractBox.prototype), ActiveBox.prototype);

  return ActiveBox;
});
