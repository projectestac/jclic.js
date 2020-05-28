/**
 *  File    : activities/puzzles/HolePuzzle.js
 *  Created : 01/06/2015
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

import { $ } from 'jquery';
import Activity from '../../Activity';
import ActiveBoxGrid from '../../boxes/ActiveBoxGrid';
import BoxBag from '../../boxes/BoxBag';
import BoxConnector from '../../boxes/BoxConnector';
import AWT from '../../AWT';
import Rectangular from '../../shapers/Rectangular';

/**
 * This class of {@link Activity} shows only one panel with shuffled {@link ActiveBox} cells.
 *
 * One of the cells is out of the main panel, thus allowing its neighbors occupy their space.
 * Only immediate neighbors of the "hole" can move into it.
 *
 * When all cells are on place, the initially "expulsed" cell comes back home and the activity is done.
 * @exports HolePuzzle
 * @class
 * @extends Activity
 */
export class HolePuzzle extends Activity {
  /**
   * HolePuzzle constructor
   * @param {JClicProject} project - The {@link JClicProject} to which this activity belongs
   */
  constructor(project) {
    super(project);
  }

  /**
   * Retrieves the minimum number of actions needed to solve this activity.
   * @override
   * @returns {number}
   */
  getMinNumActions() {
    return this.abc.primary.getNumCells();
  }

  /**
   * Whether or not the activity uses random to shuffle internal components
   * @override
   * @returns {boolean}
   */
  hasRandom() {
    return true;
  }

  /**
   * When `true`, the activity must always be shuffled
   * @override
   * @returns {boolean}
   */
  shuffleAlways() {
    return true;
  }

  /**
   * Whether the activity allows the user to request help
   * @override
   * @returns {boolean}
   */
  helpSolutionAllowed() {
    return true;
  }

  // Class fields

  /**
   * Panel class associated to this type of activity: {@link HolePuzzlePanel}
   * @type {class} */
  static Panel = HolePuzzlePanel;
}

/**
 * The {@link ActivityPanel} where {@link HolePuzzle} activities are played
 * @class
 * @extends ActivityPanel
 */
export class HolePuzzlePanel extends Activity.Panel {
  /**
   * HolePuzzlePanel constructor
   * @param {Activity} act - The {@link Activity} to which this Panel belongs
   * @param {JClicPlayer} ps - Any object implementing the methods defined in the
   * [PlayStation](http://projectestac.github.io/jclic/apidoc/edu/xtec/jclic/PlayStation.html)
   * Java interface.
   * @param {external:jQuery=} $div - The jQuery DOM element where this Panel will deploy
   */
  constructor(act, ps, $div) {
    super(act, ps, $div);
  }

  /**
   * Miscellaneous cleaning operations
   * @override
   */
  clear() {
    if (this.bg) {
      this.bg.end();
      this.bg = null;
    }
    if (this.parkBg) {
      this.parkBg.end();
      this.parkBg = null;
    }
  }

  /**
   * Prepares the visual components of the activity
   * @override
   */
  buildVisualComponents() {
    if (this.firstRun)
      super.buildVisualComponents();
    this.clear();

    const abc = this.act.abc['primary'];
    if (abc) {
      if (abc.image)
        abc.setImgContent(this.act.project.mediaBag, null, false);

      if (this.act.acp !== null)
        this.act.acp.generateContent(abc.nch, abc.ncw, [abc], false);

      this.bg = ActiveBoxGrid.createEmptyGrid(null, this, this.act.margin, this.act.margin, abc);
      this.bg.setContent(abc);
      this.bg.setVisible(true);

      this.hiddenBoxIndex = Math.floor(Math.random() * this.bg.getNumCells());
      this.hiddenBox = this.bg.getActiveBox(this.hiddenBoxIndex);
      this.hiddenBox.setVisible(false);
      this.parkBg = new ActiveBoxGrid(null, this, abc.style, this.act.margin, this.act.margin,
        this.hiddenBox.dim.width, this.hiddenBox.dim.height, new Rectangular(1, 1));
      this.parkBg.setContent(abc, null, this.hiddenBoxIndex, 0, 1);
      this.parkBg.setBorder(this.bg.hasBorder());
      this.parkBg.setVisible(true);
    }
  }

  /**
   * Basic initialization procedure
   * @override
   */
  initActivity() {
    super.initActivity();
    if (!this.firstRun)
      this.buildVisualComponents();
    else
      this.firstRun = false;

    if (this.bg) {
      //
      // This activity has an special shuffle method. Cells can move only to places near the 'hole'
      if (this.act.shuffles % 2 !== 1)
        this.act.shuffles++;
      for (var i = 0; i < this.act.shuffles; i++) {
        const pth = this.bg.getCoord(this.hiddenBox);
        const v = Math.floor(Math.random() * 2) === 0 ? 1 : -1;

        if (Math.floor(Math.random() * 2) === 0) {
          pth.x += v;
          if (pth.x < 0 || pth.x >= this.bg.nCols)
            pth.x -= 2 * v;
        } else {
          pth.y += v;
          if (pth.y < 0 || pth.y >= this.bg.nRows)
            pth.y -= 2 * v;
        }
        var dstBx = this.bg.getActiveBoxWithIdLoc(pth.y * this.bg.nCols + pth.x);
        if (dstBx !== null)
          this.hiddenBox.exchangeLocation(dstBx);
      }
      this.setAndPlayMsg('initial', 'start');
      this.invalidate().update();
      this.playing = true;
    }
  }

  /**
   * Updates the graphic content of this panel.
   * This method will be called from {@link AWT.Container#update} when needed.
   * @override
   * @param {AWT.Rectangle} dirtyRegion - Specifies the area to be updated. When `null`,
   * it's the whole panel.
   */
  updateContent(dirtyRegion) {
    super.updateContent(dirtyRegion);
    if (this.bg && this.parkBg && this.$canvas) {
      const
        canvas = this.$canvas.get(-1),
        ctx = canvas.getContext('2d');
      if (!dirtyRegion)
        dirtyRegion = new AWT.Rectangle(0, 0, canvas.width, canvas.height);
      ctx.clearRect(dirtyRegion.pos.x, dirtyRegion.pos.y, dirtyRegion.dim.width, dirtyRegion.dim.height);
      this.bg.update(ctx, dirtyRegion);
      this.parkBg.update(ctx, dirtyRegion);
    }
    return this;
  }

  /**
   * Sets the real dimension of this panel.
   * @override
   * @param {AWT.Dimension} preferredMaxSize - The maximum surface available for the activity panel
   * @returns {AWT.Dimension}
   */
  setDimension(preferredMaxSize) {
    return !this.bg || !this.parkBg || this.getBounds().equals(preferredMaxSize) ?
      preferredMaxSize :
      BoxBag.layoutDouble(preferredMaxSize, this.bg, this.parkBg, this.act.boxGridPos, this.act.margin);
  }

  /**
   * Sets the size and position of this activity panel
   * @override
   * @param {AWT.Rectangle} rect
   */
  setBounds(rect) {
    if (this.$canvas)
      this.$canvas.remove();

    super.setBounds(rect);
    if (this.bg && this.parkBg) {
      // Create the main canvas
      this.$canvas = $(`<canvas width="${rect.dim.width}" height="${rect.dim.height}"/>`).css({
        position: 'absolute',
        top: 0,
        left: 0
      });
      this.$div.append(this.$canvas);

      // Repaint all
      this.invalidate().update();
    }
  }

  /**
   * Builds the accessible components needed for this ActivityPanel
   * This method is called when all main elements are placed and visible, when the activity is ready
   * to start or when resized.
   * @override
   */
  buildAccessibleComponents() {
    if (this.$canvas && this.accessibleCanvas && this.bg) {
      super.buildAccessibleComponents();
      this.bg.buildAccessibleElements(this.$canvas, this.$div);
    }
  }

  /**
   * Main handler used to process mouse, touch, keyboard and edit events
   * @override
   * @param {HTMLEvent} event - The HTML event to be processed
   * @returns {boolean=} - When this event handler returns `false`, jQuery will stop its
   * propagation through the DOM tree. See: {@link http://api.jquery.com/on}
   */
  processEvent(event) {
    if (this.playing) {
      const p = new AWT.Point(
        event.pageX - this.$div.offset().left,
        event.pageY - this.$div.offset().top);
      // Array to be filled with actions to be executed at the end of event processing
      const delayedActions = [];

      switch (event.type) {
        case 'click':
          this.ps.stopMedia(1);
          // Find the box behind the clicked point
          const bx = this.bg.findActiveBox(p);
          if (bx) {
            if (bx.isVisible()) {
              // Check if it's a valid move
              const pt = this.bg.getCoordDist(bx, this.hiddenBox);
              if (Math.abs(pt.x) + Math.abs(pt.y) === 1) {
                // Ok, the cell is adjacent to the hole. Complete the move.
                let m = bx.playMedia(this.ps, delayedActions);
                const
                  src = `${bx.getDescription()} (${bx.idOrder})`,
                  dest = `(${this.hiddenBox.idLoc})`;
                bx.exchangeLocation(this.hiddenBox);
                const ok = bx.idOrder === bx.idLoc;
                // Check results and notify action
                const cellsAtPlace = this.bg.countCellsAtEquivalentPlace(true);
                this.ps.reportNewAction(this.act, 'SELECT', src, dest, ok, cellsAtPlace);
                if (ok && cellsAtPlace === this.bg.getNumCells()) {
                  // Activity completed!
                  this.hiddenBox.setVisible(true);
                  this.parkBg.setVisible(false);
                  this.finishActivity(true);
                } else
                  if (!m)
                    this.playEvent('click');
              }
              this.update();
            } else {
              this.playEvent('actionError');
            }
          }
          break;
      }
      delayedActions.forEach(action => action());
      event.preventDefault();
    }
  }

  // Class fields

  /**
   * The {@link ActiveBoxBag} object containing the information to be displayed in the panel.
   * @name HolePuzzlePanel#bg
   * @type {ActiveBoxBag} */
  bg = null;

  /**
   * An auxiliary box bag with only one box, used to store the "missing piece" of
   * the puzzle.
   * @name HolePuzzlePanel#parkBg
   * @type {ActiveBoxGrid} */
  parkBg = null;

  /**
   * The hidden cell
   * @name HolePuzzlePanel#hiddenBox
   * @type {ActiveBox} */
  hiddenBox = null;

  /**
   * Index of the hidden cell on the ActiveBagContent
   * @name HolePuzzlePanel#hiddenBoxIndex
   * @type {number} */
  hiddenBoxIndex = -1;

  /**
   * List of mouse, touch and keyboard events intercepted by this panel
   * @override
   * @name HolePuzzlePanel#events
   * @type {string[]} */
  events = ['click'];
}

// Register activity class
export default Activity.registerClass('@puzzles.HolePuzzle', HolePuzzle);
