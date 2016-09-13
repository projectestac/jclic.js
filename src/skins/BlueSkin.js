/**
 *  File    : skins/BlueSkin.js
 *  Created : 04/07/2016
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
 *  (c) 2000-2016 Catalan Educational Telematic Network (XTEC)
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

define([
  "jquery",
  "./Skin",
  "./DefaultSkin"
], function ($, Skin, DefaultSkin) {

  /**
   * This is a variant of the default {@link Skin} used by JClic.js
   * It differs from {@link DefaultSkin} only in some colors
   * @exports BlueSkin
   * @class
   * @extends DefaultSkin
   * @param {PlayStation} ps - The PlayStation (currently a {@link JClicPlayer}) used to load and
   * realize the media objects needed to build the Skin.
   * @param {string=} name - The skin class name
   */
  var BlueSkin = function (ps, name) {
    // BlueSkin extends [DefaultSkin](DefaultSkin.html)
    DefaultSkin.call(this, ps, name);
  };

  BlueSkin.prototype = {
    constructor: BlueSkin,
    /**
     * Class name of this skin. It will be used as a base selector in the definition of all CSS styles.
     * @type {string}
     */
    skinId: 'JClicBlueSkin',
    /**
     *
     * Returns the CSS styles used by this skin. This method should be called only from
     * `Skin` constructor, and overridden by subclasses if needed.
     * @returns {string}
     */
    _getStyleSheets: function () {
      return DefaultSkin.prototype._getStyleSheets() + this.skinCSS;
    },
    // Buttons and other graphical resources used by this skin.
    //
    // Styles used in this skin
    skinCSS: '.SKINID {background-color:#1990FF;}'
  };

  // BlueSkin extends [DefaultSkin](DefaultSkin.html)
  BlueSkin.prototype = $.extend(Object.create(DefaultSkin.prototype), BlueSkin.prototype);

  // Register this class in the list of available skins
  Skin.CLASSES['blue'] = BlueSkin;
  return BlueSkin;
});
