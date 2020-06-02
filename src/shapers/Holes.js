/**
 *  File    : shapers/Holes.js
 *  Created : 20/05/2015
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

import Shaper from './Shaper';

/**
 * This {@link Shaper} consists of a set of arbitrary shapes placed over a main rectangle that
 * acts as a enclosure.
 * The components can be of type {@link AWT.Rectangle}, {@link AWT.Ellipse} or {@link AWT.Path}.
 * This components have internal dimension values relative to the horizontal and vertical
 * sizes of the enclosure. Its values (always between 0 and 1) must be scaled to real sizes
 * of graphic objects.
 * @exports Holes
 * @class
 * @extends Shaper
 */
export class Holes extends Shaper {
  /**
   * Holes constructor
   * @param {number} nx - Not used
   * @param {number} ny - Not used
   */
  constructor(nx, ny) {
    super(1, 1);
    this.customShapes = true;
    this.nCols = nx;
    this.nRows = ny;
    this.showEnclosure = true;
  }

  /**
   * Shapes are already loaded by {@link Shaper}, so this function just sets `initiated` to `true`
   * @override
   */
  buildShapes() {
    if (this.nCells > 0)
      this.initiated = true;
  }

  /**
   * Gets the rectangle that contains all shapes
   * @override
   * @returns {AWT.Rectangle}
   */
  getEnclosingShapeData() {
    return this.showEnclosure ? (this.enclosing || super.getEnclosingShapeData()) : null;
  }
}

// Register this class in the list of known shapers
export default Shaper.registerClass('@Holes', Holes);
