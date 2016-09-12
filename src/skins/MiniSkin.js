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
 *  (c) 2000-2016 Ministry of Education of Catalonia (http://xtec.cat)
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
   * It differs from {@link DefaultSkin} in colors and sizes
   * @exports MiniSkin
   * @class
   * @extends DefaultSkin
   * @param {PlayStation} ps - The PlayStation (currently a {@link JClicPlayer}) used to load and
   * realize the media objects meeded tot build the Skin.
   * @param {string=} name - The skin class name
   */
  var MiniSkin = function (ps, name) {
    // MiniSkin extends [DefaultSkin](DefaultSkin.html)
    DefaultSkin.call(this, ps, name, {counters: false, reportsBtn: true});
  };

  MiniSkin.prototype = {
    constructor: MiniSkin,
    /**
     * Class name of this skin. It will be used as a base selector in the definition of all CSS styles.
     * @type {string}
     */
    skinId: 'JClicMiniSkin',
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
    iconWidth: 18,
    iconHeight: 18,
    iconFill: '#080808',
    counterIconFill: '#080808',
    margin: 8,
    // Styles used in this skin
    skinCSS: '\
.SKINID {background-color:#F4F4F4;}\
.SKINID .JClicPlayerCnt {margin:4px;}\
.SKINID .JClicCtrlCnt {margin:0 2px 4px 2px;}\
.SKINID .JClicMsgBox {height:25px;}'
  };

  // MiniSkin extends [DefaultSkin](DefaultSkin.html)
  MiniSkin.prototype = $.extend(Object.create(DefaultSkin.prototype), MiniSkin.prototype);

  // Register this class in the list of available skins
  Skin.CLASSES['mini'] = MiniSkin;
  return MiniSkin;
});
