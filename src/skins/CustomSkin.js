/**
 *  File    : skins/CustomSkin.js
 *  Created : 12/02/2018
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
 *  (c) 2000-2018 Catalan Educational Telematic Network (XTEC)
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
  "./Skin",
  "../Utils",
  "../AWT"
], function ($, Skin, Utils, AWT) {

  /**
   * Custom {@link Skin} for JClic.js, built assembling specific cuts of a canvas (usually a PNG file) defined in a XML file
   * WARNING: This class is still under constuction!
   * @exports CustomSkin
   * @class
   * @extends Skin
   */
  class CustomSkin extends Skin {

    /**
     * CustomSkin constructor
     * 
     * @param {PlayStation} ps - The PlayStation (currently a {@link JClicPlayer}) used to load and
     * realize the media objects needed tot build the Skin.
     * @param {string=} name - The skin class name
     * @param {object=} options - Optional parameter with additional options
     */
    constructor(ps, name = null, options = null) {
      // CustomSkin extends [Skin](Skin.html)
      super(ps, name, options)
      console.log(this.options)

      this.$mainPanel = $('<div/>', { class: 'JClicCustomMainPanel' })
      this.$gridPanel = $('<div/>', { class: 'JClicGridPanel' })
      for (let i = 0; i < 9; i++)
        this.$gridPanel.append($('<div/>', { class: `JClicCell JClicCell${i + 1}` }))
      this.$mainPanel.append(this.$gridPanel)
      this.$playerCnt.detach().addClass('JClicPlayerCell').appendTo(this.$mainPanel)
      this.$div.prepend(this.$mainPanel)

      if (options.buttons) {
        if (options.buttons.button.next) {
          // Add `next` button
          const msg = ps.getMsg('Next activity')
          this.buttons.next = $('<button/>', { class: 'JClicBtn JClicCell JClicBtnNext', title: msg, 'aria-label': msg })
            .on('click', evt => ps.actions.next.processEvent(evt))
          this.$mainPanel.append(this.buttons.next)
        }
      }
    }

    /**
     *
     * Returns the CSS styles used by this skin. This method should be called only from
     * `Skin` constructor, and overridden by subclasses if needed.
     * @override
     * @returns {string}
     */
    _getStyleSheets() {
      const
        ph0 = this.options.rectangle.frame.left,
        ph1 = ph0 + this.options.rectangle.player.left,
        ph2 = ph0 + this.options.slicer.left,
        ph3 = ph0 + this.options.slicer.right,
        ph4 = ph1 + this.options.rectangle.player.width,
        ph5 = ph0 + this.options.rectangle.frame.width,
        pv0 = this.options.rectangle.frame.top,
        pv1 = pv0 + this.options.rectangle.player.top,
        pv2 = pv0 + this.options.slicer.top,
        pv3 = pv0 + this.options.slicer.bottom,
        pv4 = pv1 + this.options.rectangle.player.height,
        pv5 = pv0 + this.options.rectangle.frame.height,
        imgElement = this.ps.project.mediaBag.getElement(this.options.image, true),
        box1 = imgElement.data ? Utils.getImgClipUrl(imgElement.data, new AWT.Rectangle(ph2 - ph0, pv0, ph3 - ph2, pv2 - pv0)) : '',
        box2 = imgElement.data ? Utils.getImgClipUrl(imgElement.data, new AWT.Rectangle(ph0, pv2 - pv0, ph2 - ph0, pv3 - pv2)) : '',
        box3 = imgElement.data ? Utils.getImgClipUrl(imgElement.data, new AWT.Rectangle(ph3 - ph0, pv2 - pv0, ph5 - ph3, pv3 - pv2)) : '',
        box4 = imgElement.data ? Utils.getImgClipUrl(imgElement.data, new AWT.Rectangle(ph2 - ph0, pv3 - pv0, ph3 - ph2, pv5 - pv3)) : ''

      const skinLayout = `
.SKINID .JClicCustomMainPanel {flex-grow:1;position:relative;}
.SKINID .JClicGridPanel {position:absolute;width:100%;height:100%;display:grid;grid-template-columns:${ph2 - ph0}px 1fr ${ph5 - ph3}px;grid-template-rows:${pv2 - pv0}px 1fr ${pv5 - pv3}px;}
.SKINID .JClicCell {background:url(${this.options.image});background-repeat:no-repeat;background-color: ${Utils.checkColor(this.options.color.fill.value)}}
.SKINID .JClicPlayerCell {position:absolute;top:${pv1 - pv0}px;right:${ph5 - ph4}px;bottom:${pv5 - pv4}px;left:${ph1 - ph0}px;}
.SKINID .JClicCell1 {background-position:-${ph0}px -${pv0}px}
.SKINID .JClicCell2 {background-image:url(${box1});background-repeat:repeat-x;}
.SKINID .JClicCell3 {background-position:-${ph3}px -${pv0}px}
.SKINID .JClicCell4 {background-image:url(${box2});background-repeat:repeat-y;}
.SKINID .JClicCell5 {background-position:-${ph2}px -${pv2}px}
.SKINID .JClicCell6 {background-image:url(${box3});background-repeat:repeat-y;}
.SKINID .JClicCell7 {background-position:-${ph0}px -${pv3}px}
.SKINID .JClicCell8 {background-image:url(${box4});background-repeat:repeat-x;}
.SKINID .JClicCell9 {background-position:-${ph3}px -${pv3}px}`

      let btStyles = ''
      if (this.options.buttons) {
        const bt = this.options.buttons
        let w = 30, h = 30, offset = {}
        if (bt.settings) {
          if (bt.settings.dimension) {
            w = bt.settings.dimension.width || w
            h = bt.settings.dimension.height || h
          }
          offset = bt.settings.offset || offset
        }
        if (bt.button.next) {
          const
            btn = bt.button.next,
            x = btn.point.pos.left,
            xp = x < ph2 ? `left:${x}` : `right:${ph5 - x}`,
            y = btn.point.pos.top,
            yp = y < pv2 ? `top:${y}` : `bottom:${pv5 - y}`,
            xs = btn.point.source.left,
            ys = btn.point.source.top
          btStyles += `.SKINID .JClicBtnNext {position:absolute;${xp}px;${yp}px;width:${w}px;height:${h}px;background-position:-${xs}px -${ys}px;}`
        }
      }

      return `${super._getStyleSheets()}${this.mainCSS}${skinLayout}${btStyles}`
    }
  }

  Object.assign(CustomSkin.prototype, {
    /**
     * Class name of this skin. It will be used as a base selector in the definition of all CSS styles.
     * @name CustomSkin#skinId
     * @override
     * @type {string} */
    skinId: 'JClicCustomSkin',
    /**
     * The name of the image file to be used as a base of this skin.
     * @name CustomSkin#imgName
     * @type {string} */
    imgName: null,
    /**
     * Styles used in this skin
     * @name CustomSkin#skinCSS
     * @override
     * @type {string} */
    mainCSS: '.SKINID .JClicPlayerCnt {margin:0;}'
  })

  // Register this class in the list of available skins
  Skin.CLASSES['custom'] = CustomSkin

  return CustomSkin
})
