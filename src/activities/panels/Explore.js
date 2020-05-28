/**
 *  File    : activities/panels/Explore.js
 *  Created : 04/06/2015
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
import AWT from '../../AWT';
import Rectangular from '../../shapers/Rectangular';

/**
 * This class of {@link Activity} shows a panel with {@link ActiveBox} objects. Users can click
 * on this objects to obtain associated information. This associated information, displayed in
 * a second panel, can be text graphics, sound, video... or a combination of them.
 * @exports Explore
 * @class
 * @extends Activity
 */
export class Explore extends Activity {
  /**
   * Explore constructor
   * @param {JClicProject} project - The {@link JClicProject} to which this activity belongs
   */
  constructor(project) {
    super(project);
  }

  /**
   * Activities of this type never end, so automatic sequences must pause here
   * @override
   * @returns {boolean}
   */
  mustPauseSequence() {
    return true;
  }

  /**
   * Retrieves the minimum number of actions needed to solve this activity
   * @override
   * @returns {number}
   */
  getMinNumActions() {
    return 0;
  }

  /**
   * Usually this activity don't use random to shuffle internal components, but in some cases
   * can make use of it.
   * @override
   * @returns {boolean}
   */
  hasRandom() {
    return true;
  }

  // Class fields

  /**
   * Panel class associated to this type of activity: {@link ExplorePanel}
   * @type {class} */
  static Panel = ExplorePanel;
}

/**
 * The {@link ActivityPanel} where {@link Explore} activities are played.
 * @class
 * @extends ActivityPanel
 * @param {Activity} act - The {@link Activity} to which this Panel belongs
 * @param {JClicPlayer} ps - Any object implementing the methods defined in the
 * [PlayStation](http://projectestac.github.io/jclic/apidoc/edu/xtec/jclic/PlayStation.html)
 * Java interface.
 */
export class ExplorePanel extends Activity.Panel {
  /**
   * ExplorePanel constructor
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
    if (this.bgA) {
      this.bgA.end();
      this.bgA = null;
    }
    if (this.bgB) {
      this.bgB.end();
      this.bgB = null;
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
      abcA = this.act.abc['primary'],
      abcB = this.act.abc['secondary'];

    if (abcA && abcB) {
      if (abcA.image) {
        abcA.setImgContent(this.act.project.mediaBag, null, false);
        if (abcA.animatedGifFile && !abcA.shaper.rectangularShapes && !this.act.shuffleA)
          this.$animatedBg = $('<span/>').css({
            'background-image': `url(${abcA.animatedGifFile})`,
            'background-position': 'center',
            'background-repeat': 'no-repeat',
            position: 'absolute'
          }).appendTo(this.$div);
      }

      if (abcB.image)
        abcB.setImgContent(this.act.project.mediaBag, null, false);

      if (this.act.acp !== null)
        this.act.acp.generateContent(abcA.nch, abcA.ncw, [abcA, abcB], false);

      this.bgA = ActiveBoxGrid.createEmptyGrid(null, this, this.act.margin, this.act.margin, abcA);
      const w = (this.act.boxGridPos === 'AUB' || this.act.boxGridPos === 'BUA') ? abcA.getTotalWidth() : abcB.w;
      this.bgB = new ActiveBoxGrid(null, this, abcB.style, this.act.margin, this.act.margin, w, abcB.h, new Rectangular(1, 1));

      this.bgA.setContent(abcA);
      this.bgA.setDefaultIdAss();
      if (this.$animatedBg)
        this.bgA.setCellAttr('tmpTrans', true);
      this.bgB.getActiveBox(0).setInactive(false);
      this.bgA.setVisible(true);
      this.bgB.setVisible(true);
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

    if (this.bgA && this.bgB) {
      // Scramble cells
      if (this.act.shuffleA)
        this.shuffle([this.bgA], true, true);

      if (this.useOrder)
        this.currentItem = this.bgA.getNextItem(-1);

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
    if (this.bgA && this.bgB && this.$canvas) {
      const
        canvas = this.$canvas.get(-1),
        ctx = canvas.getContext('2d');
      if (!dirtyRegion)
        dirtyRegion = new AWT.Rectangle(0, 0, canvas.width, canvas.height);
      ctx.clearRect(dirtyRegion.pos.x, dirtyRegion.pos.y, dirtyRegion.dim.width, dirtyRegion.dim.height);
      this.bgA.update(ctx, dirtyRegion);
      this.bgB.update(ctx, dirtyRegion);
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
    return !this.bgA || !this.bgB || this.getBounds().equals(preferredMaxSize) ?
      preferredMaxSize :
      BoxBag.layoutDouble(preferredMaxSize, this.bgA, this.bgB, this.act.boxGridPos, this.act.margin);
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

    if (this.bgA || this.bgB) {
      // Create the main canvas
      this.$canvas = $(`<canvas width="${rect.dim.width}" height="${rect.dim.height}"/>`).css({
        position: 'absolute',
        top: 0,
        left: 0
      });
      // Resize animated gif background
      if (this.$animatedBg) {
        const bgRect = this.bgA.getBounds();
        this.$animatedBg.css({
          left: bgRect.pos.x,
          top: bgRect.pos.y,
          width: `${bgRect.dim.width}px`,
          height: `${bgRect.dim.height}px`,
          'background-size': `${bgRect.dim.width}px ${bgRect.dim.height}px`
        });
      }
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
    if (this.$canvas && this.accessibleCanvas) {
      super.buildAccessibleComponents();
      if (this.bgA)
        this.bgA.buildAccessibleElements(this.$canvas, this.$div);
      if (this.bgB)
        this.bgB.buildAccessibleElements(this.$canvas, this.$div);
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
        event.pageY - this.$div.offset().top),
        // Array to be filled with actions to be executed at the end of event processing
        delayedActions = [];

      switch (event.type) {
        case 'click':
          this.ps.stopMedia(1);
          const bx1 = this.bgA.findActiveBox(p);
          if (bx1) {
            const bx2 = this.bgB.getActiveBox(0);
            if (bx1.idAss !== -1 && (!this.act.useOrder || bx1.idOrder === this.currentItem)) {
              bx2.setContent(this.act.abc['secondary'], bx1.idAss);
              if (!bx2.playMedia(this.ps, delayedActions) && !bx1.playMedia(this.ps, delayedActions))
                this.playEvent('CLICK');
              if (this.act.useOrder)
                this.currentItem = this.bgA.getNextItem(this.currentItem);
              this.ps.reportNewAction(this.act, 'SELECT', bx1.getDescription(), bx2.getDescription(), true, 0);
              // Modified May 2020: Focusing `accessibleElement` will always draw a border on bx2
              // if (bx2.$accessibleElement)
              //   bx2.$accessibleElement.focus();
            } else {
              bx2.clear();
              bx2.setInactive(false);
            }
            this.update();
          }
          break;
      }
      delayedActions.forEach(action => action());
      event.preventDefault();
    }
  }

  // Class fields

  /**
   * The {@link ActiveBoxBag} object containing the information to be displayed in the `primary` panel
   * @name ExplorePanel#bgA
   * @type {ActiveBoxBag} */
  bgA = null;

  /**
   * The {@link ActiveBoxBag} object containing the information associated to `primary` elements.
   * Only one of this elements will be showed for each click done in the `primary` panel.
   * @name ExplorePanel#bgB
   * @type {ActiveBoxBag} */
  bgB = null;

  /**
   * List of mouse, touch and keyboard events intercepted by this panel
   * @override
   * @name ExplorePanel#events
   * @type {string[]} */
  events = ['click'];
}

// Register activity class
export default Activity.registerClass('@panels.Explore', Explore);
