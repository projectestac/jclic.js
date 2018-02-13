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
  "../Utils"
], function ($, Skin, Utils) {

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
     */
    constructor(ps, name) {
      // CustomSkin extends [Skin](Skin.html)
      super(ps, name)
    }
    /**
     * Loads the object settings from a specific jQuery XML element
     * @param {external:jQuery} _$xml - The XML element containing the properties of the skin
     */
    setProperties(_$xml) {
      this.imgName = _$xml.find('skin').attr('image')
      this.prop = Utils.parseXmlNode(_$xml[0].children[0])
      console.log(this.prop)
    }
    /**
     *
     * Returns the CSS styles used by this skin. This method should be called only from
     * `Skin` constructor, and overridden by subclasses if needed.
     * @override
     * @returns {string}
     */
    _getStyleSheets() {
      return super._getStyleSheets() + this.mainCSS
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
