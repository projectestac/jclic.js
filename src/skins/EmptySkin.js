/**
 *  File    : skins/EmptySkin.js
 *  Created : 14/03/2017
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
  "./Skin"
], function ($, Skin) {

  /**
   * A minimalist {@link Skin} for JClic.js with just the player, without messages, counters nor any button.
   * @exports EmptySkin
   * @class
   * @extends Skin
   */
  class EmptySkin extends Skin {

    /**
     * EmptySkin constructor
     * 
     * @param {PlayStation} ps - The PlayStation (currently a {@link JClicPlayer}) used to load and
     * realize the media objects needed tot build the Skin.
     * @param {string=} name - The skin class name
     */
    constructor(ps, name) {
      // EmptySkin extends [Skin](Skin.html)
      super(ps, name)
    }
    /**
     *
     * Returns the CSS styles used by this skin. This method should be called only from
     * `Skin` constructor, and overridden by subclasses if needed.
     * @returns {string}
     */
    _getStyleSheets() {
      return super._getStyleSheets() + this.mainCSS
    }
  }

  Object.assign(EmptySkin.prototype, {
    /**
     * Class name of this skin. It will be used as a base selector in the definition of all CSS styles.
     * @type {string}
     */
    skinId: 'JClicEmptySkin',
    //
    //Buttons and other graphical resources used by this skin.
    //
    // Styles used in this skin
    mainCSS: '.SKINID .JClicPlayerCnt {margin:0;}'
  })

  // Register this class in the list of available skins
  Skin.CLASSES['empty'] = EmptySkin

  return EmptySkin
})
