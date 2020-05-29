/**
 *  File    : skins/GreenSkin.js
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
 *  (c) 2000-2019 Educational Telematic Network of Catalonia (XTEC)
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

import Skin from './Skin';
import DefaultSkin from './DefaultSkin';

/**
 * This is a variant of the default {@link Skin} used by JClic.js
 * It differs from {@link DefaultSkin} only in some colors
 * @exports GreenSkin
 * @class
 * @extends DefaultSkin
 */
export class GreenSkin extends DefaultSkin {
  /**
   * GreenSkin constructor
   * 
   * @param {PlayStation} ps - The PlayStation (currently a {@link JClicPlayer}) used to load and
   * realize the media objects needed to build this Skin.
   * @param {string=} name - The skin class name
   * @param {object=} options - Optional parameter with additional options
   */
  constructor(ps, name = null, options = {}) {
    // GreenSkin extends [DefaultSkin](DefaultSkin.html)
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

  // Class fields

  /**
   * Class name of this skin. It will be used as a base selector in the definition of all CSS styles.
   * @name GreenSkin#skinId
   * @override
   * @type {string}
   */
  skinId = 'JClicGreenSkin';

  //
  // Buttons and other graphical resources used by this skin:
  /**
   * Fill color for icons
   * @name GreenSkin#iconFill
   * @override
   * @type {string}
   */
  iconFill = '#20640E';

  /**
   * Fill-in color for counters
   * @name GreenSkin#counterIconFill
   * @override
   * @type {string}
   */
  counterIconFill = '#20640E';

  /**
   * Styles used in this skin
   * @name GreenSkin#skinCSS
   * @type {string}
   */
  skinCSS = '.ID {background-color:#4AFF19;}';
}

// Register this class in the list of available skins
export default Skin.registerClass('green', GreenSkin);
