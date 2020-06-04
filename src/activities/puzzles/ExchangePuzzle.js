/**
 *  File    : activities/puzzles/ExchangePuzzle.js
 *  Created : 30/05/2015
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
import { Activity, ActivityPanel } from '../../Activity';
import ActiveBoxGrid from '../../boxes/ActiveBoxGrid';
import BoxBag from '../../boxes/BoxBag';
import BoxConnector from '../../boxes/BoxConnector';
import { Rectangle, Point } from '../../AWT';

/**
 * This class of {@link module:Activity.Activity Activity} shows only one panel with shuffled {@link module:boxes/ActiveBox.ActiveBox ActiveBox} objects.
 * To solve the activity, each cell must exchange its location with another one. When all cells are
 * on place, the activity is done.
 * @extends module:Activity.Activity
 */
export class ExchangePuzzle extends Activity {
  /**
   * ExchangePuzzle constructor
   * @param {module:project/JClicProject.JClicProject} project - The {@link module:project/JClicProject.JClicProject JClicProject} to which this activity belongs
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
   * Whether the activity allows the user to request help.
   * @override
   * @returns {boolean}
   */
  helpSolutionAllowed() {
    return true;
  }
}

/**
 * The {@link module:Activity.ActivityPanel ActivityPanel} where activities of type {@link module:activities/puzzles/ExchangePuzzle.ExchangePuzzle ExchangePuzzle} are played.
 * @extends module:Activity.ActivityPanel
 */
class ExchangePuzzlePanel extends ActivityPanel {
  /**
   * ExchangePuzzlePanel constructor
   * @param {module:Activity.Activity} act - The {@link module:Activity.Activity Activity} to which this Panel belongs
   * @param {module:JClicPlayer.JClicPlayer} ps - Any object implementing the methods defined in the
   * [PlayStation](http://projectestac.github.io/jclic/apidoc/edu/xtec/jclic/PlayStation.html) Java interface.
   * @param {external:jQuery} [$div] - The jQuery DOM element where this Panel will deploy
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
      this.shuffle([this.bg], true, true);
      if (this.useOrder)
        this.currentItem = this.bg.getNextItem(-1);
      this.setAndPlayMsg('initial', 'start');
      this.invalidate().update();
      this.playing = true;
    }
  }

  /**
   * Updates the graphic content of this panel.
   * This method will be called from {@link module:AWT.Container#update} when needed.
   * @override
   * @param {module:AWT.Rectangle} dirtyRegion - Specifies the area to be updated. When `null`,
   * it's the whole panel.
   */
  updateContent(dirtyRegion) {
    super.updateContent(dirtyRegion);
    if (this.bg && this.$canvas) {
      const
        canvas = this.$canvas.get(-1),
        ctx = canvas.getContext('2d');
      if (!dirtyRegion)
        dirtyRegion = new Rectangle(0, 0, canvas.width, canvas.height);
      ctx.clearRect(dirtyRegion.pos.x, dirtyRegion.pos.y, dirtyRegion.dim.width, dirtyRegion.dim.height);
      this.bg.update(ctx, dirtyRegion);
    }
    return this;
  }

  /**
   * Sets the real dimension of this panel.
   * @override
   * @param {module:AWT.Dimension} preferredMaxSize - The maximum surface available for the activity panel
   * @returns {module:AWT.Dimension}
   */
  setDimension(preferredMaxSize) {
    return !this.bg || this.getBounds().equals(preferredMaxSize) ?
      preferredMaxSize :
      BoxBag.layoutSingle(preferredMaxSize, this.bg, this.act.margin);
  }

  /**
   * Sets the size and position of this activity panel
   * @override
   * @param {module:AWT.Rectangle} rect
   */
  setBounds(rect) {
    if (this.$canvas)
      this.$canvas.remove();

    super.setBounds(rect);
    if (this.bg) {
      // Create the main canvas
      this.$canvas = $(`<canvas width="${rect.dim.width}" height="${rect.dim.height}"/>`).css({
        position: 'absolute',
        top: 0,
        left: 0
      });
      this.$div.append(this.$canvas);

      // Create a [BoxConnector](BoxConnector.html) and attach it to the canvas context
      this.bc = new BoxConnector(this, this.$canvas.get(-1).getContext('2d'));

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
      this.bg.buildAccessibleElements(this.$canvas, this.$div, 'mousedown');
    }
  }

  /**
   * Main handler used to process mouse, touch, keyboard and edit events
   * @override
   * @param {external:Event} event - The HTML event to be processed
   * @returns {boolean} - When this event handler returns `false`, jQuery will stop its
   * propagation through the DOM tree. See: {@link http://api.jquery.com/on}
   */
  processEvent(event) {
    if (this.bc && this.playing) {

      //
      // The [AWT.Point](AWT.html#Point) where the mouse or touch event has been originated
      let p = null;
      //
      // Two [ActiveBox](ActiveBox.html) pointers used for the [BoxConnector](BoxConnector.html)
      // `origin` and `dest` points.
      let bx1, bx2;
      // Array to be filled with actions to be executed at the end of event processing
      const delayedActions = [];
      //
      // _touchend_ event don't provide pageX nor pageY information
      if (event.type === 'touchend')
        p = this.bc.active ? this.bc.dest.clone() : new Point();
      else {
        // Touch events can have more than one touch, so `pageX` must be obtained from `touches[0]`
        const
          x = event.originalEvent && event.originalEvent.touches ? event.originalEvent.touches[0].pageX : event.pageX,
          y = event.originalEvent && event.originalEvent.touches ? event.originalEvent.touches[0].pageY : event.pageY;
        p = new Point(x - this.$div.offset().left, y - this.$div.offset().top);
      }

      // Flag for tracking `mouseup` events
      let up = false;

      switch (event.type) {
        case 'touchcancel':
          // Canvel movement
          if (this.bc.active)
            this.bc.end();
          break;

        case 'mouseup':
          // Don't consider drag moves below 3 pixels. Can be a "trembling click"
          if (this.bc.active && p.distanceTo(this.bc.origin) <= 3)
            break;

          up = true;
        /* falls through */
        case 'touchend':
        case 'touchstart':
        case 'mousedown':
          if (!this.bc.active) {
            // New pairing starts
            //
            // Pairings never can start with a `mouseup` event
            if (up)
              break;

            this.ps.stopMedia(1);
            // Find the ActiveBox behind the clicked point
            bx1 = this.bg.findActiveBox(p);
            if (bx1) {
              // Start the [BoxConnector](BoxConnector.html)
              if (this.act.dragCells)
                this.bc.begin(p, bx1);
              else
                this.bc.begin(p);
              // Play cell media or event sound
              if (!bx1.playMedia(this.ps, delayedActions))
                this.playEvent('click');
            }
          } else {
            this.ps.stopMedia(1);
            // Pairing completed
            //
            // Find the active boxes behind `bc.origin` and `p`
            if (this.act.dragCells)
              bx1 = this.bc.bx;
            else
              bx1 = this.bg.findActiveBox(this.bc.origin);
            this.bc.end();
            bx2 = this.bg.findActiveBox(p);
            //
            // Check if the pairing was OK
            if (bx1 && bx2) {
              const
                src = `${bx1.getDescription()} (${bx1.idOrder})`,
                dest = `(${bx2.idLoc})`;
              let ok = (bx1.idOrder === bx2.idLoc);
              this.bg.swapCellPositions(bx1, bx2, true);
              // Check results and notify action
              const cellsAtPlace = this.bg.countCellsAtEquivalentPlace(true);
              this.ps.reportNewAction(this.act, 'PLACE', src, dest, ok, cellsAtPlace);
              // End activity or play event sound
              if (ok && cellsAtPlace === this.bg.getNumCells())
                this.finishActivity(true);
              else
                this.playEvent(ok ? 'actionOk' : 'actionError');
            }
            this.update();
          }
          break;

        case 'mousemove':
        case 'touchmove':
          this.bc.moveTo(p);
          break;
      }
      delayedActions.forEach(action => action());
      event.preventDefault();
    }
  }
}

Object.assign(ExchangePuzzlePanel.prototype, {
  /**
   * The {@link module:boxes/ActiveBoxbag.ActiveBoxBag ActiveBoxBag} object containing the information to be displayed in the panel.
   * @name module:activities/puzzles/ExchangePuzzle.ExchangePuzzlePanel#bg
   * @type {module:boxes/ActiveBoxBag.ActiveBoxBag} */
  bg: null,
  /**
   * The box connector
   * @name module:activities/puzzles/ExchangePuzzle.ExchangePuzzlePanel#bc
   * @type {module:boxes/BoxConnector.BoxConnector} */
  bc: null,
  /**
   * List of mouse, touch and keyboard events intercepted by this panel
   * @override
   * @name module:activities/puzzles/ExchangePuzzle.ExchangePuzzlePanel#events
   * @type {string[]} */
  events: ['mousedown', 'mouseup', 'mousemove', 'touchstart', 'touchend', 'touchmove', 'touchcancel'],
});

/**
 * Panel class associated to this type of activity: {@link module:activities/puzzles/ExchangePuzzle.ExchangePuzzlePanel ExchangePuzzlePanel}
 * @type {class} */
ExchangePuzzle.Panel = ExchangePuzzlePanel;

// Register activity class
export default Activity.registerClass('@puzzles.ExchangePuzzle', ExchangePuzzle);
