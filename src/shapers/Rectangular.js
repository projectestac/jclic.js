/**
 *  File    : shapers/Rectangular.js
 *  Created : 19/05/2015
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
 *  (c) 2000-2020 Catalan Educational Telematic Network (XTEC)
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

import Shaper from './Shaper';
import { Rectangle, Point, Dimension } from '../AWT';

/**
 *
 * This is the simplest {@link module:shapers/Shaper.Shaper Shaper}. It divides the graphic object in a set of rectangular
 * shapes distributed in the specified number of rows and columns.
 * @extends module:shapers/Shaper.Shaper
 */
export class Rectangular extends Shaper {
  /**
   * Rectangular constructor
   * @param {number} nx - Number of columns
   * @param {number} ny - Number of rows
   */
  constructor(nx, ny) {
    super(nx, ny);
  }

  /**
   * Builds the rectangular shapes based on the number of rows and columns
   * @override
   */
  buildShapes() {
    const
      w = 1 / this.nCols,
      h = 1 / this.nRows;
    for (let y = 0; y < this.nRows; y++) {
      for (let x = 0; x < this.nCols; x++) {
        this.shapeData[y * this.nCols + x] = new Rectangle(new Point(x * w, y * h), new Dimension(w, h));
      }
    }
    this.initiated = true;
  }
}

Object.assign(Rectangular.prototype, {
  /**
   * Overrides same flag in {@link module:/shapers/Shaper.Shaper#rectangularShapes Shaper#rectangularShapes}
   * @name module:shapers/Rectangular.Rectangular#rectangularShapes
   * @override
   * @type {boolean} */
  rectangularShapes: true,
});

// Register this class in the list of known shapers
export default Shaper.registerClass('@Rectangular', Rectangular);
