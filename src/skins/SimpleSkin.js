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
 *  @license EUPL-1.2
 *  @licstart
 *  (c) 2000-2020 Educational Telematic Network of Catalonia (XTEC)
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
 *  @module
 */

import $ from 'jquery';
import Skin from './Skin';
import DefaultSkin from './DefaultSkin';

/**
 * This is a variant of the default {@link Skin} used by JClic.js
 * It has the buttons at top, and don't has counters.
 * @exports SimpleSkin
 * @class
 * @extends DefaultSkin
 */
export class SimpleSkin extends DefaultSkin {
  /**
   * SimpleSkin constructor
   * @param {PlayStation} ps - The PlayStation (currently a {@link JClicPlayer}) used to load and
   * realize the media objects meeded tot build the Skin.
   * @param {string} [name] - The skin class name
   * @param {object} [options] - Optional parameter with additional options
   */
  constructor(ps, name = null, options = {}) {
    // OrangeSkin extends [DefaultSkin](DefaultSkin.html)
    super(ps, name, Object.assign({}, options, { counters: false, reportsBtn: true }));

    this.$ctrlCnt.detach().prependTo(this.$div);
    this.$msgBoxDiv.detach().appendTo(this.$div);
    // Add a spacing div in substitution of msgBox
    $('<div/>').css({ 'flex-grow': 1 }).insertAfter(this.$ctrlCnt.children(':nth-child(2)'));
  }

  /**
   * Returns the CSS styles used by this skin. This method should be called only from
   * the `Skin` constructor, and overridded by subclasses if needed.
   * @param {string} media - A specific media size. Possible values are: 'default', 'half' and 'twoThirds'
   * @returns {string}
   */
  _getStyleSheets(media = 'default') {
    return `${super._getStyleSheets(media)}${media === 'default' ? this.skinCSS : media === 'half' ? this.skinCSSHalf : media === 'twoThirds' ? this.skinCSSTwoThirds : ''}`;
  }
}

Object.assign(SimpleSkin.prototype, {
  /**
   * Class name of this skin. It will be used as a base selector in the definition of all CSS styles.
   * @name SimpleSkin#skinId
   * @override
   * @type {string} */
  skinId: 'JClicSimpleSkin',
  /**
   * Styles used in this skin
   * @name SimpleSkin#skinCSS
   * @type {string} */
  skinCSS: '\
.ID {background-color:#888888;}\
.ID .JClicCtrlCnt {margin:9px;}\
.ID .JClicPlayerCnt {margin:0px 18px 18px;}\
.ID .JClicMsgBox {flex-grow:0; margin:0 18px 18px 18px;}',
  skinCSSHalf: '\
.ID .JClicCtrlCnt {margin:4px;}\
.ID .JClicPlayerCnt {margin:0px 9px 9px;}\
.ID .JClicMsgBox {margin:0 9px 9px 9px;}',
  skinCSSTwoThirds: '\
.ID .JClicCtrlCnt {margin:6px;}\
.ID .JClicPlayerCnt {margin:0px 12px 12px;}\
.ID .JClicMsgBox {margin:0 12px 12px 12px;}',
});

// Register this class in the list of available skins
export default Skin.registerClass('simple', SimpleSkin);
