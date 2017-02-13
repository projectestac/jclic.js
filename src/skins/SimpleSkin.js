/**
 *  File    : skins/SimpleSkin.js
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

/* global define */

define([
  "jquery",
  "./Skin",
  "./DefaultSkin"
], function ($, Skin, DefaultSkin) {

  /**
   * This is a variant of the default {@link Skin} used by JClic.js
   * It has the buttons at top, and don't has counters.
   * @exports SimpleSkin
   * @class
   * @extends DefaultSkin
   * @param {PlayStation} ps - The PlayStation (currently a {@link JClicPlayer}) used to load and
   * realize the media objects meeded tot build the Skin.
   * @param {string=} name - The skin class name
   */
  var SimpleSkin = function (ps, name) {
    // OrangeSkin extends [DefaultSkin](DefaultSkin.html)
    DefaultSkin.call(this, ps, name, { counters: false, reportsBtn: true });

    this.$ctrlCnt.detach().prependTo(this.$div);
    this.$msgBoxDiv.detach().appendTo(this.$div);
    // Add a spacing div in substitution of msgBox
    $('<div/>').css({ 'flex-grow': 1 }).insertAfter(this.$ctrlCnt.children(':nth-child(2)'));

  };

  SimpleSkin.prototype = {
    constructor: SimpleSkin,
    /**
     * Class name of this skin. It will be used as a base selector in the definition of all CSS styles.
     * @type {string}
     */
    skinId: 'JClicSimpleSkin',
    /**
     *
     * Returns the CSS styles used by this skin. This method should be called only from
     * `Skin` constructor, and overridden by subclasses if needed.
     * @returns {string}
     */
    _getStyleSheets: function () {
      return DefaultSkin.prototype._getStyleSheets() + this.skinCSS;
    },
    //
    // Buttons and other graphical resources used by this skin.
    //
    // Styles used in this skin
    skinCSS: '\
.SKINID {background-color:#888888;}\
.SKINID .JClicCtrlCnt {margin:9px;}\
.SKINID .JClicPlayerCnt {margin:0px 18px 18px;}\
.SKINID .JClicMsgBox {flex-grow:0; margin:0 18px 18px 18px;}'
  };

  // DefaultSkin extends [Skin](Skin.html)
  SimpleSkin.prototype = $.extend(Object.create(DefaultSkin.prototype), SimpleSkin.prototype);

  // Register this class in the list of available skins
  Skin.CLASSES['simple'] = SimpleSkin;
  return SimpleSkin;
});
