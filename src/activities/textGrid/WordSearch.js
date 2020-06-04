/**
 *  File    : activities/textGrid/WordSearch.js
 *  Created : 15/06/2015
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
import TextGrid from '../../boxes/TextGrid';

/**
 * This class of {@link module:Activity.Activity Activity} shows a {@link module:boxes/TextGrid.TextGrid TextGrid} with some words placed in horizontal,
 * vertical or diagonal direction, written right or upside down. The remaining grid cells will be
 * filled with randomly selected characters.
 *
 * The aim of the activity is to find all the words hidden on the text grid.
 * The content of an optional {@link module:boxes/ActiveBagContent.ActiveBagContent ActiveBagContent} can be revealed on an auxiliary panel as
 * words are found.
 * @extends module:Activity.Activity
 */
export class WordSearch extends Activity {
  /**
   * WordSearch constructor
   * @param {module:project/JClicProject.JClicProject} project - The JClic project to which this activity belongs
   */
  constructor(project) {
    super(project);
  }

  /**
   * Retrieves the minimum number of actions needed to solve this activity
   * @override
   * @returns {number}
   */
  getMinNumActions() {
    return this.clues.length;
  }

  /**
   * This type of activity permits the user to display the solution
   * @override
   * @returns {boolean}
   */
  helpSolutionAllowed() {
    return true;
  }

  /**
   * This kind of activity uses random numbers to generate the filling characters
   * @override
   * @returns {boolean}
   */
  hasRandom() {
    return true;
  }
}

Object.assign(WordSearch.prototype, {
  /**
   * String array containing all the valid clues.
   * @name module:activities/textGrid/WordSearch.WordSearch#clues
   * @type {string[]} */
  clues: null,
  /**
   * Array of integers containing __for each clue__ the index
   * of an associated {@link module:boxes/ActiveBoxContent.ActiveBoxContent ActiveBoxContent} located on the secondary {@link module:boxes/ActiveBoxbag.ActiveBoxBag ActiveBoxBag}.
   * This associated element is optional.
   * @name module:activities/textGrid/WordSearch.WordSearch#clueItems
   * @type {number[]} */
  clueItems: null,
  /**
   * Objects that indicate if box grids A and B must be shuffled.
   * (defaults to _false_ in WordSearch activities)
   * @name module:activities/textGrid/WordSearch.WordSearch#shuffleA
   * @type {boolean} */
  shuffleA: false,
  /**
   * Objects that indicate if box grids A and B must be shuffled.
   * (defaults to _false_ in WordSearch activities)
   * @name module:activities/textGrid/WordSearch.WordSearch#shuffleB
   * @type {boolean} */
  shuffleB: false,
});

/**
 * The {@link module:Activity.ActivityPanel ActivityPanel} where {@link module:activities/textGrid/WordSearch.WordSearch WordSearch} activities are played.
 * @extends module:Activity.ActivityPanel
 */
export class WordSearchPanel extends ActivityPanel {
  /**
   * WordSearchPanel constructor
   * @param {module:Activity.Activity} act - The {@link module:Activity.Activity Activity} to which this Panel belongs
   * @param {module:JClicPlayer.JClicPlayer} ps - Any object implementing the methods defined in the
   * [PlayStation](http://projectestac.github.io/jclic/apidoc/edu/xtec/jclic/PlayStation.html) Java interface.
   * @param {external:jQuery} [$div] - The jQuery DOM element where this Panel will deploy
   */
  constructor(act, ps, $div) {
    super(act, ps, $div);
    this.resolvedClues = [];
  }

  /**
   * Performs miscellaneous cleaning operations
   * @override
   */
  clear() {
    if (this.grid) {
      this.grid.end();
      this.grid = null;
    }
    if (this.bgAlt) {
      this.bgAlt.end();
      this.bgAlt = null;
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

    const
      tgc = this.act.tgc,
      abcAlt = this.act.abc['secondary'];
    if (abcAlt) {
      if (abcAlt.image) {
        abcAlt.setImgContent(this.act.project.mediaBag, null, false);
        if (abcAlt.animatedGifFile && !abcAlt.shaper.rectangularShapes && !this.act.shuffleB)
          this.$animatedBg = $('<span/>').css({
            'background-image': `url(${abcAlt.animatedGifFile})`,
            'background-position': 'center',
            'background-repeat': 'no-repeat',
            position: 'absolute'
          }).appendTo(this.$div);
      }

      if (this.act.acp !== null)
        this.act.acp.generateContent(0, 0, [abcAlt], false);
    }

    if (tgc) {
      this.grid = TextGrid.createEmptyGrid(null, this, this.act.margin, this.act.margin, tgc, false);
      if (abcAlt) {
        this.bgAlt = ActiveBoxGrid.createEmptyGrid(null, this, this.act.margin, this.act.margin, abcAlt);
        if (this.$animatedBg && this.bgAlt.backgroundBox)
          this.bgAlt.backgroundBox['tmpTrans'] = true;
      }
      this.grid.setVisible(true);
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

    if (this.grid) {
      this.grid.setChars(this.act.tgc.text);
      this.grid.randomize();
      this.grid.setAllCellsAttribute(TextGrid.flags.INVERTED, false);

      this.resolvedClues = Array(this.act.clueItems.length).fill(false);

      if (this.bgAlt) {
        this.bgAlt.setContent(this.act.abc['secondary']);
        if (this.$animatedBg)
          this.bgAlt.clearAllBoxes();
        if (this.act.shuffleB)
          this.shuffle([this.bgAlt], true, true);
        this.bgAlt.setVisible(this.$animatedBg !== null);
      }

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
    if (this.grid && this.$canvas) {
      const
        canvas = this.$canvas.get(-1),
        ctx = canvas.getContext('2d');
      if (!dirtyRegion)
        dirtyRegion = new Rectangle(0, 0, canvas.width, canvas.height);
      ctx.clearRect(dirtyRegion.pos.x, dirtyRegion.pos.y, dirtyRegion.dim.width, dirtyRegion.dim.height);
      this.grid.update(ctx, dirtyRegion);
      if (this.bgAlt)
        this.bgAlt.update(ctx, dirtyRegion);
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
    if (!this.grid || this.getBounds().equals(preferredMaxSize))
      return preferredMaxSize;
    if (this.bgAlt)
      return BoxBag.layoutDouble(preferredMaxSize, this.grid, this.bgAlt, this.act.boxGridPos, this.act.margin);
    else
      return BoxBag.layoutSingle(preferredMaxSize, this.grid, this.act.margin);
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
    if (this.grid) {
      // Create the main canvas
      this.$canvas = $(`<canvas width="${rect.dim.width}" height="${rect.dim.height}"/>`).css({
        position: 'absolute',
        top: 0,
        left: 0
      });
      // Resize animated gif background
      if (this.$animatedBg && this.bgAlt) {
        const bgRect = this.bgAlt.getBounds();
        this.$animatedBg.css({
          left: bgRect.pos.x,
          top: bgRect.pos.y,
          width: `${bgRect.dim.width}px`,
          height: `${bgRect.dim.height}px`,
          'background-size': `${bgRect.dim.width}px ${bgRect.dim.height}px`
        });
      }
      this.$div.append(this.$canvas);

      // Create a [BoxConnector](BoxConnector.html) and attach it to the canvas context
      this.bc = new BoxConnector(this, this.$canvas.get(-1).getContext('2d'));

      // Repaint all
      this.invalidate().update();
    }
  }

  /**
   * Calculates the current score
   * @returns {number}
   */
  getCurrentScore() {
    return this.resolvedClues.reduce((n, resolved) => resolved ? ++n : n, 0);
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
      // _touchend_ event don't provide pageX nor pageY information
      if (event.type === 'touchend')
        p = this.bc.active ? this.bc.dest.clone() : new Point();
      else {
        // Touch events can have more than one touch, so `pageX` must be obtained from `touches[0]`
        const
          x = event.originalEvent.touches ? event.originalEvent.touches[0].pageX : event.pageX,
          y = event.originalEvent.touches ? event.originalEvent.touches[0].pageY : event.pageY;
        p = new Point(x - this.$div.offset().left, y - this.$div.offset().top);
      }

      // Flag for tracking `mouseup` events
      let up = false;
      // Flag for assuring that only one media plays per event (avoid event sounds overlapping
      // cell's media sounds)
      let m = false;
      // Array to be filled with actions to be executed at the end of event processing
      const delayedActions = [];

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
            // A new word selection starts
            //
            // Selection of words can never start with a `mouseup` event
            if (up)
              break;

            this.ps.stopMedia(1);
            if (this.grid.contains(p)) {
              this.playEvent('click');
              this.bc.begin(p);
            }
          } else {
            this.ps.stopMedia(1);
            // Word selection completed
            //
            // Find the active boxes behind `bc.origin` and `p`
            const
              pt1 = this.grid.getLogicalCoords(this.bc.origin),
              pt2 = this.grid.getLogicalCoords(this.bc.dest);
            this.bc.end();
            const s = this.grid.getStringBetween(pt1.x, pt1.y, pt2.x, pt2.y);
            if (s !== null && s.length > 0) {
              let ok = false, c = 0;
              for (; c < this.act.clues.length; c++) {
                if (s === this.act.clues[c]) {
                  ok = true;
                  break;
                }
              }
              const repeated = this.resolvedClues[c];
              if (ok && !repeated) {
                this.resolvedClues[c] = true;
                this.grid.setAttributeBetween(pt1.x, pt1.y, pt2.x, pt2.y, TextGrid.flags.INVERTED, true);
                if (this.bgAlt !== null) {
                  const k = this.act.clueItems[c];
                  if (k >= 0 && k < this.bgAlt.getNumCells()) {
                    const bx = this.bgAlt.getActiveBox(this.act.clueItems[c]);
                    if (bx) {
                      bx.setVisible(this.$animatedBg === null);
                      m = bx.playMedia(this.ps, delayedActions);
                    }
                  }
                }
              }
              if (!repeated) {
                const r = this.getCurrentScore();
                this.ps.reportNewAction(this.act, 'ACTION_SELECT', s, null, ok, r);
                if (r === this.act.clues.length)
                  this.finishActivity(true);
                else if (!m)
                  this.playEvent(ok ? 'actionOK' : 'actionError');
                this.invalidate();
              } else if (!ok && !m)
                this.playEvent('actionError');
            } else
              this.playEvent('actionError');

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

Object.assign(WordSearchPanel.prototype, {
  /**
   * The {@link module:boxes/TextGrid.TextGrid TextGrid} object of this ActivityPanel
   * @name module:activities/textGrid/WordSearch.WordSearchPanel#grid
   * @type {TextGrid} */
  grid: null,
  /**
   * An optional {@link module:boxes/ActiveBoxbag.ActiveBoxBag ActiveBoxBag} used to display information associated with the hidden words.
   * @name module:activities/textGrid/WordSearch.WordSearchPanel#bgAlt
   * @type {ActiveBoxBag} */
  bgAlt: null,
  /**
   * An array of boolean values indicating which clues have been found
   * @name module:activities/textGrid/WordSearch.WordSearchPanel#resolvedClues
   * @type {boolean[]} */
  resolvedClues: null,
  /**
   * The box connector object
   * @name module:activities/textGrid/WordSearch.WordSearchPanel#bc
   * @type {BoxConnector} */
  bc: null,
  /**
   * Mouse and touch events intercepted by this panel
   * @override
   * @name module:activities/textGrid/WordSearch.WordSearchPanel#events
   * @type {string[]} */
  events: ['mousedown', 'mouseup', 'mousemove', 'touchstart', 'touchend', 'touchmove', 'touchcancel'],
});

/**
 * Panel class associated to this type of activity: {@link module:activities/textGrid/WordSearch.WordSearchPanel WordSearchPanel}
 * @type {class} */
WordSearch.Panel = WordSearchPanel;

// Register activity class
export default Activity.registerClass('@textGrid.WordSearch', WordSearch);
