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

import Skin from './Skin';
import DefaultSkin from './DefaultSkin';


/**
 * This is a variant of the default {@link Skin} used by JClic.js
 * It differs from {@link DefaultSkin} only in some colors
 * @exports BlueSkin
 * @class
 * @extends DefaultSkin
 */
export class BlueSkin extends DefaultSkin {
  /**
   * BlueSkin constructor
   * @param {PlayStation} ps - The PlayStation (currently a {@link JClicPlayer}) used to load and
   * realize the media objects needed to build the Skin.
   * @param {string} [name] - The skin class name
   * @param {object} [options] - Optional parameter with additional options
   */
  constructor(ps, name = null, options = {}) {
    // BlueSkin extends [DefaultSkin](DefaultSkin.html)
    super(ps, name, options);
  }

  /**
   * Returns the CSS styles used by this skin. This method should be called only from
   * the `Skin` constructor, and overridded by subclasses if needed.
   * @param {string} media - A specific media size. Possible values are: 'default', 'half' and 'twoThirds'
   * @returns {string}
   */
  _getStyleSheets(media = 'default') {
    return super._getStyleSheets(media) + (media === 'default' ? this.skinCSS : '');
  }
}

Object.assign(BlueSkin.prototype, {
  /**
   * Class name of this skin. It will be used as a base selector in the definition of all CSS styles.
   * @name BlueSkin#skinId
   * @override
   * @type {string} */
  skinId: 'JClicBlueSkin',
  /**
   * Styles used in this skin
   * @name BlueSkin#skinCSS
   * @type {string} */
  skinCSS: '.ID {background-color:#1990FF;}',
});

// Register this class in the list of available skins
export default Skin.registerClass('blue', BlueSkin);
