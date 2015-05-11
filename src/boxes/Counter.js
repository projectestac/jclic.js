//    File    : Counter.js  
//    Created : 07/05/2015  
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
  "./AbstractBox"
], function ($, AbstractBox) {

  //
  // This special case of [AbstractBox](AbstractBox.html) displays up to three
  // digits in an HTML Canvas.
  var Counter = function (parent, container, rect, boxBase) {
    AbstractBox.call(this, parent, container, boxBase);
    this.setBounds(rect);
  };

  Counter.prototype = {
    constructor: Counter,
    value: 0,
    countDown: 0,
    enabled: false,
    //
    // The Image object containing the representation of the digits
    img: null,
    // 
    // AWT.Dimension with the current size of the digits
    dSize: null,
    // 
    // AWT.Point indicating the origin of the digits in `img`
    origin: null,
    //
    // Enables or disables this counter
    setEnabled: function (bEnabled) {
      this.enabled = bEnabled;
      this.repaint();
    },
    //
    // Checks if the counter is enabled    
    isEnabled: function () {
      return this.enabled;
    },
    //
    // Sets the initial value of the counter
    setCountDown: function (maxValue) {
      this.countDown = maxValue;
      this.repaint();
    },
    //
    // Sets the image to be used as a source for drawing the counters
    // * img (Image)
    // * setOrigin (AWT.Point)
    // * setDigitSize (AWT.Dimension)
    setSource: function (setImg, setOrigin, setDigitSize) {
      this.img = setImg;
      this.origin = setOrigin;
      this.dSize = setDigitSize;
      this.repaint();
    },
    //
    // Increments the value of this counter    
    incValue: function () {
      this.value++;
      if (this.enabled)
        this.repaint();
    },
    //
    // Sets/ Gets the value of this counter
    setValue: function (newValue) {
      this.value = newValue;
      if (this.enabled)
        this.repaint();
    },
    getValue: function () {
      return this.value;
    },
    //
    // Draws the conunter in the provided Canvas context
    // * ctx (Canvas Context)
    // * dirtyRegion (AWT.rectangle) - The rectangular area to be updated
    updateContent: function (ctx, dirtyRegion) {
      // Todo: implement text mode
      if (this.img === null)
        return false;

      var w, d;
      var marginW = (this.dim.width - 3 * this.dSize.width) / 2;
      var marginH = (this.dim.height - this.dSize.height) / 2;


      var valr = value;
      if (this.countDown > 0)
        valr = Math.max(0, this.countDown - this.value);
      valr = Math.min(999, valr);

      for (var k = false, i = 0, j = 100; i < 3; i++, j /= 10) {
        if (!this.enabled)
          d = 1;
        else {
          w = (valr / j) % 10;
          if (w !== 0) {
            k = true;
            d = 11 - w;
          }
          else
            d = (k || i === 2 ? 11 : 1);
        }

        ctx.drawImage(img,
            this.origin.x,
            this.origin.y + this.dSize.height * d,
            this.origin.x + this.dSize.width,
            this.origin.y + this.dSize.height * (d + 1),
            this.pos.x + marginW + this.dSize.width * i,
            this.pos.y + marginH,
            this.pos.x + marginW + this.dSize.width * (i + 1),
            this.pos.y + marginH + this.dSize.height);
      }
      return true;
    }
  };

  // Counter extends AbstractBox
  Counter.prototype = $.extend(Object.create(AbstractBox.prototype), Counter.prototype);

  return Counter;

});
