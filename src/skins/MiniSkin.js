/**
 *  File    : skins/MiniSkin.js
 *  Created : 05/07/2016
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
  "./DefaultSkin"
], function ($, Skin, DefaultSkin) {

  /**
   * This is a variant of the default {@link Skin} used by JClic.js
   * It differs from {@link DefaultSkin} in colors and sizes
   * @exports MiniSkin
   * @class
   * @extends DefaultSkin
   */
  class MiniSkin extends DefaultSkin {
    /**
     * MiniSkin constructor
     * 
     * @param {PlayStation} ps - The PlayStation (currently a {@link JClicPlayer}) used to load and
     * realize the media objects meeded tot build the Skin.
     * @param {string=} name - The skin class name
     * @param {object=} options - Optional parameter with additional options
     */
    constructor(ps, name = null, options = {}) {
      // MiniSkin extends [DefaultSkin](DefaultSkin.html)
      super(ps, name, Object.assign({}, options, { counters: false, reportsBtn: true }))
    }

    /**
     * Returns the CSS styles used by this skin. This method should be called only from
     * the `Skin` constructor, and overridded by subclasses if needed.
     * @param {string} media - A specific media size. Possible values are: 'default', 'half' and 'twoThirds'
     * @returns {string}
     */
    _getStyleSheets(media = 'default') {
      return super._getStyleSheets(media) + (media === 'default' ? this.skinCSS : '')
    }
  }

  Object.assign(MiniSkin.prototype, {
    /**
     * Class name of this skin. It will be used as a base selector in the definition of all CSS styles.
     * @name MiniSkin#skinId
     * @override
     * @type {string}
     */
    skinId: 'JClicMiniSkin',
    // Buttons and other graphical resources used by this skin.
    //
    /**
     * Icon width
     * @name MiniSkin#iconWidth
     * @override
     * @type {number} */
    iconWidth: 18,
    /**
     * Icon height
     * @name MiniSkin#iconHeight
     * @override
     * @type {number} */
    iconHeight: 18,
    /**
     * Fill color for icons
     * @name MiniSkin#iconFill
     * @override
     * @type {string} */
    iconFill: '#080808',
    /**
     * Fill-in color for counters
     * @name MiniSkin#counterIconFill
     * @override
     * @type {string} */
    counterIconFill: '#080808',
    /**
     * Default margin between elements
     * @name MiniSkin#margin
     * @override
     * @type {number} */
    margin: 8,
    /**
     * Styles used in this skin
     * @name MiniSkin#skinCSS
     * @type {string} */
    skinCSS: '\
.ID {background-color:#F4F4F4;}\
.ID .JClicPlayerCnt {margin:4px;}\
.ID .JClicCtrlCnt {margin:0 2px 4px 2px;}\
.ID .JClicMsgBox {height:25px;}',
    /**
     * Styles used in this skin, sized to half its regular size.
     * (_null_ here because MiniSkin it's already very small)
     * @name MiniSkin#mainCSSHalf
     * @override
     * @type {string} */
    mainCSSHalf: '',
    /**
     * Styles used in this skin, sized to two thirds of its regular size
     * (_null_ here because MiniSkin it's already very small)
     * @name MiniSkin#mainCSSTwoThirds
     * @override
     * @type {string} */
    mainCSSTwoThirds: '',
  })

  // Register this class in the list of available skins
  Skin.CLASSES['mini'] = MiniSkin

  return MiniSkin
})
