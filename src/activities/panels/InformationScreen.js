/**
 *  File    : activities/panels/InformationScreen.js
 *  Created : 19/05/2015
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

/**
 * This class of {@link Activity} just shows a panel with {@link ActiveBox} objects.
 * Because active boxes can act as a links to specific points in the project's sequence of
 * activities, this kind of activity is often used as a menu where users can choose from different
 * options.
 * @exports InformationScreen
 * @class
 * @extends Activity
 */
export class InformationScreen extends Activity {
  /**
   * InformationScreen constructor
   * @param {JClicProject} project - The {@link JClicProject} to which this activity belongs
   */
  constructor(project) {
    super(project);
    // This kind of activities are not reported
    this.includeInReports = false;
    this.reportActions = false;
  }

  // Class fields

  /**
  * Panel class associated to this type of activity: {@link InformationScreenPanel}
  * @type {class} */
  static Panel = InformationScreenPanel;
}

/**
 * The {@link ActivityPanel} where {@link InformationScreen} activities should display its content
 * @class
 * @extends ActivityPanel
 * @param {Activity} act - The {@link Activity} to which this Panel belongs
 * @param {JClicPlayer} ps - Any object implementing the methods defined in the
 * [PlayStation](http://projectestac.github.io/jclic/apidoc/edu/xtec/jclic/PlayStation.html)
 * Java interface.
 */
export class InformationScreenPanel extends Activity.Panel {
  /**
   * InformationScreenPanel constructor
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
      if (abc.image) {
        abc.setImgContent(this.act.project.mediaBag, null, false);
        if (abc.animatedGifFile && !abc.shaper.rectangularShapes)
          this.$animatedBg = $('<span/>').css({
            'background-image': `url(${abc.animatedGifFile})`,
            'background-position': 'center',
            'background-repeat': 'no-repeat',
            position: 'absolute'
          }).appendTo(this.$div);
      }

      if (this.act.acp !== null)
        this.act.acp.generateContent(abc.nch, abc.ncw, [abc], false);

      this.bg = ActiveBoxGrid.createEmptyGrid(null, this,
        this.act.margin, this.act.margin,
        abc);
      this.bg.setContent(abc);
      if (this.$animatedBg)
        this.bg.setCellAttr('tmpTrans', true);
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

    this.invalidate().update();
    this.setAndPlayMsg('initial', 'start');
    this.playing = true;
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
    if (this.bg && this.$canvas) {
      const
        canvas = this.$canvas.get(-1),
        ctx = canvas.getContext('2d');
      if (!dirtyRegion)
        dirtyRegion = new AWT.Rectangle(0, 0, canvas.width, canvas.height);
      ctx.clearRect(dirtyRegion.pos.x, dirtyRegion.pos.y, dirtyRegion.dim.width, dirtyRegion.dim.height);
      this.bg.update(ctx, dirtyRegion);
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
    return this.getBounds().equals(preferredMaxSize) ?
      preferredMaxSize :
      BoxBag.layoutSingle(preferredMaxSize, this.bg, this.act.margin);
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
    if (this.bg) {
      this.$canvas = $('<canvas width="' + rect.dim.width + '" height="' + rect.dim.height + '"/>').css({
        position: 'absolute',
        top: 0,
        left: 0
      });
      // Resize animated gif background
      if (this.$animatedBg) {
        const bgRect = this.bg.getBounds();
        this.$animatedBg.css({
          left: bgRect.pos.x,
          top: bgRect.pos.y,
          width: `${bgRect.dim.width}px`,
          height: `${bgRect.dim.height}px`,
          'background-size': `${bgRect.dim.width}px ${bgRect.dim.height}px`
        });
      }
      this.$div.append(this.$canvas);
      this.invalidate().update();
      setTimeout(() => this.bg ? this.bg.buildAccessibleElements(this.$canvas, this.$div) : null, 0);
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
      this.ps.stopMedia(1);
      const bx = this.bg.findActiveBox(p);
      if (bx) {
        if (!bx.playMedia(this.ps, delayedActions))
          this.playEvent('click');
      }
      delayedActions.forEach(action => action());
      event.preventDefault();
    }
  }

  // Class fields

  /**
   * The {@link ActiveBoxBag} containing the information to be displayed.
   * @name InformationScreenPanel#bg
   * @type {ActiveBoxBag} */
  bg = null;

  /**
   * List of mouse, touch and keyboard events intercepted by this panel
   * @override
   * @name InformationScreenPanel#events
   * @type {string[]} */
  events = ['click'];

}

// Register class in Activity.prototype
Activity.CLASSES['@panels.InformationScreen'] = InformationScreen;

export default InformationScreen;
