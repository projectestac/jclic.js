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
 *  (c) 2000-2016 Catalan Educational Telematic Network (XTEC)
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

define([
  "jquery",
  "../../Activity",
  "../../boxes/ActiveBoxGrid",
  "../../boxes/BoxBag",
  "../../AWT",
  "../../shapers/Rectangular"
], function ($, Activity, ActiveBoxGrid, BoxBag, AWT, Rectangular) {

  /**
   *
   * This class of {@link Activity} shows a panel with {@link ActiveBox} objects. Users can click
   * on this objects to obtain associated information. This associated information, displayed in
   * a second panel, can be text graphics, sound, video... or a combination of them.
   * @exports Explore
   * @class
   * @extends Activity
   * @param {JClicProject} project - The {@link JClicProject} to which this activity belongs
   */
  var Explore = function (project) {
    Activity.call(this, project);
  };

  Explore.prototype = {
    constructor: Explore,
    /**
     *
     * Activities of this type never end, so automatic sequences must pause here
     * @returns {boolean}
     */
    mustPauseSequence: function () {
      return true;
    },
    /**
     *
     * Retrieves the minimum number of actions needed to solve this activity
     * @returns {number}
     */
    getMinNumActions: function () {
      return 0;
    },
    /**
     * Usually this activity don't use random to scramble internal components, but in some cases
     * can make use of it.
     * @returns {boolean}
     */
    hasRandom: function () {
      return true;
    }
  };

  // InformationScreen extends Activity
  Explore.prototype = $.extend(Object.create(Activity.prototype), Explore.prototype);

  /**
   * The {@link Activity.Panel} where exploration activities are played.
   * @class
   * @extends Activity.Panel
   * @param {Activity} act - The {@link Activity} to which this Panel belongs
   * @param {JClicPlayer} ps - Any object implementing the methods defined in the
   * [PlayStation](http://projectestac.github.io/jclic/apidoc/edu/xtec/jclic/PlayStation.html)
   * Java interface.
   * @param {external:jQuery=} $div - The jQuery DOM element where this Panel will deploy
   */
  Explore.Panel = function (act, ps, $div) {
    Activity.Panel.call(this, act, ps, $div);
  };

  var ActPanelAncestor = Activity.Panel.prototype;

  Explore.Panel.prototype = {
    constructor: Explore.Panel,
    /**
     * The {@link ActiveBoxBag} object containing the information to be displayed in the `primary` panel
     * @type {ActiveBoxBag} */
    bgA: null,
    /**
     * The {@link ActiveBoxBag} object containing the information associated to `primary` elements.
     * Only one of this elements will be showed for each click done in the `primary` panel.
     * @type {ActiveBoxBag} */
    bgB: null,
    /**
     * List of mouse, touch and keyboard events intercepted by this panel
     * @type {string[]} */
    events: ['click'],
    /**
     *
     * Miscellaneous cleaning operations
     */
    clear: function () {
      if (this.bgA) {
        this.bgA.end();
        this.bgA = null;
      }
      if (this.bgB) {
        this.bgB.end();
        this.bgB = null;
      }
    },
    /**
     *
     * Prepares the visual components of the activity
     */
    buildVisualComponents: function () {

      if (this.firstRun)
        ActPanelAncestor.buildVisualComponents.call(this);

      this.clear();

      var abcA = this.act.abc['primary'];
      var abcB = this.act.abc['secondary'];

      if (abcA && abcB) {

        if (abcA.imgName)
          abcA.setImgContent(this.act.project.mediaBag, null, false);

        if (abcB.imgName)
          abcB.setImgContent(this.act.project.mediaBag, null, false);

        if (this.act.acp !== null)
          this.act.acp.generateContent(abcA.nch, abcA.ncw, [abcA, abcB], false);

        this.bgA = ActiveBoxGrid.createEmptyGrid(null, this, this.act.margin, this.act.margin, abcA);
        var w = abcB.w;
        if (this.act.boxGridPos === 'AUB' || this.act.boxGridPos === 'BUA')
          w = abcA.getTotalWidth();
        this.bgB = new ActiveBoxGrid(null, this, abcB.bb, this.act.margin, this.act.margin, w, abcB.h, new Rectangular(1, 1));

        this.bgA.setContent(abcA);
        this.bgA.setDefaultIdAss();
        this.bgB.getActiveBox(0).setInactive(false);
        this.bgA.setVisible(true);
        this.bgB.setVisible(true);
      }
    },
    /**
     *
     * Basic initialization procedure
     */
    initActivity: function () {
      ActPanelAncestor.initActivity.call(this);

      if (!this.firstRun)
        this.buildVisualComponents();
      else
        this.firstRun = false;

      if (this.bgA && this.bgB) {
        // Scramble cells
        if (this.act.scramble.primary)
          this.shuffle([this.bgA], true, true);

        if (this.useOrder)
          this.currentItem = this.bgA.getNextItem(-1);

        this.setAndPlayMsg('initial', 'start');
        this.invalidate().update();
        this.playing = true;
      }
    },
    /**
     * Updates the graphic content of this panel.
     * This method will be called from {@link AWT.Container#update} when needed.
     * @param {AWT.Rectangle} dirtyRegion - Specifies the area to be updated. When `null`,
     * it's the whole panel.
     */
    updateContent: function (dirtyRegion) {
      ActPanelAncestor.updateContent.call(this, dirtyRegion);
      if (this.bgA && this.bgB && this.$canvas) {
        var canvas = this.$canvas.get(0);
        var ctx = canvas.getContext('2d');
        if (!dirtyRegion)
          dirtyRegion = new AWT.Rectangle(0, 0, canvas.width, canvas.height);
        ctx.clearRect(dirtyRegion.pos.x, dirtyRegion.pos.y, dirtyRegion.dim.width, dirtyRegion.dim.height);
        this.bgA.update(ctx, dirtyRegion, this);
        this.bgB.update(ctx, dirtyRegion, this);
      }
      return this;
    },
    /**
     *
     * Sets the real dimension of this panel.
     * @param {AWT.Dimension} preferredMaxSize - The maximum surface available for the activity panel
     * @returns {AWT.Dimension}
     */
    setDimension: function (preferredMaxSize) {
      if (!this.bgA || !this.bgB || this.getBounds().equals(preferredMaxSize))
        return preferredMaxSize;
      return BoxBag.layoutDouble(preferredMaxSize, this.bgA, this.bgB, this.act.boxGridPos, this.act.margin);
    },
    /**
     *
     * Sets the size and position of this activity panel
     * @param {AWT.Rectangle} rect
     */
    setBounds: function (rect) {
      if (this.$canvas)
        this.$canvas.remove();

      ActPanelAncestor.setBounds.call(this, rect);
      if (this.bgA || this.bgB) {
        // Create the main canvas
        this.$canvas = $('<canvas width="' + rect.dim.width + '" height="' + rect.dim.height + '"/>').css({
          position: 'absolute',
          top: 0,
          left: 0
        });
        this.$div.append(this.$canvas);

        // Repaint all
        this.invalidate().update();
      }
    },
    /**
     * 
     * Builds the accessible components needed for this Activity.Panel
     * This method is called when all main elements are placed and visible, when the activity is ready
     * to start or when resized.
     */
    buildAccessibleComponents: function () {
      if (this.$canvas && this.accessibleCanvas) {
        ActPanelAncestor.buildAccessibleComponents.call(this);
        this.bgA.buildAccessibleElements(this.$canvas, this.$div);
        this.bgB.buildAccessibleElements(this.$canvas, this.$div);
      }
    },    
    /**
     *
     * Main handler used to process mouse, touch, keyboard and edit events
     * @param {HTMLEvent} event - The HTML event to be processed
     * @returns {boolean=} - When this event handler returns `false`, jQuery will stop its
     * propagation through the DOM tree. See: {@link http://api.jquery.com/on}
     */
    processEvent: function (event) {
      if (this.playing) {
        var bx1, bx2;
        var p = new AWT.Point(
            event.pageX - this.$div.offset().left,
            event.pageY - this.$div.offset().top);

        switch (event.type) {
          case 'click':
            this.ps.stopMedia(1);
            bx1 = this.bgA.findActiveBox(p);
            if (bx1) {
              bx2 = this.bgB.getActiveBox(0);
              if (bx1.idAss !== -1 && (!this.act.useOrder || bx1.idOrder === this.currentItem)) {
                bx2.setContent(this.act.abc['secondary'], bx1.idAss);
                if (!bx2.playMedia(this.ps) && !bx1.playMedia(this.ps))
                  this.playEvent('CLICK');
                if (this.act.useOrder)
                  this.currentItem = this.bgA.getNextItem(this.currentItem);
                this.ps.reportNewAction(this.act, 'SELECT', bx1.getDescription(), bx2.getDescription(), true, 0);
                if(bx2.$accessibleElement)
                  bx2.$accessibleElement.focus();
              } else {
                bx2.clear();
                bx2.setInactive(false);
              }
              this.update();
            }
            break;
        }
        event.preventDefault();
      }
    }
  };

  // Explore.Panel extends Activity.Panel
  Explore.Panel.prototype = $.extend(Object.create(ActPanelAncestor), Explore.Panel.prototype);

  // Register class in Activity.prototype
  Activity.CLASSES['@panels.Explore'] = Explore;

  return Explore;

});
