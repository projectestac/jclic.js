//  File    : BlueSkin.js  
//  Created : 04/07/2016  
//  By      : fbusquet  
//
//  JClic.js  
//  HTML5 player of [JClic](http://clic.xtec.cat) activities  
//  http://projectestac.github.io/jclic.js  
//  (c) 2000-2015 Catalan Educational Telematic Network (XTEC)  
//  This program is free software: you can redistribute it and/or modify it under the terms of
//  the GNU General Public License as published by the Free Software Foundation, version. This
//  program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without
//  even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
//  General Public License for more details. You should have received a copy of the GNU General
//  Public License along with this program. If not, see [http://www.gnu.org/licenses/].  

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
   * realize the media objects meeded tot build the Skin.
   * @param {string=} name - The skin class name
   */
  var BlueSkin = function (ps, name) {
    // OrangeSkin extends [DefaultSkin](DefaultSkin.html)
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
     * Returns the CSS styles used by this skin. This methos should be called only from
     * `Skin` constructor, and overrided by subclasses if needed.
     * @returns {string}
     */
    _getStyleSheets: function () {
      return DefaultSkin.prototype._getStyleSheets() + this.resources.thisCSS;
    },
    /**
     * Buttons and other graphical resources used by this skin.
     * @type {object} */
    resources: {
      //
      // Styles used in this skin
      thisCSS: '.SKINID {background-color:#1990FF;}'
    }
  };
  // Inherit Skin resources prior to merge prototypes
  var resources = $.extend(Object.create(DefaultSkin.prototype.resources), BlueSkin.prototype.resources);
  // DefaultSkin extends [Skin](Skin.html)
  BlueSkin.prototype = $.extend(Object.create(DefaultSkin.prototype), BlueSkin.prototype);
  // Set resources
  BlueSkin.prototype.resources = resources;

  // Register this class in the list of available skins
  Skin.CLASSES['@blue.xml'] = BlueSkin;
  return BlueSkin;
});
