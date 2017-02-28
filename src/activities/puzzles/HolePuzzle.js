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

/* global define */

define([
  "jquery",
  "../../Activity",
  "../../boxes/ActiveBoxGrid",
  "../../boxes/BoxBag",
  "../../boxes/BoxConnector",
  "../../AWT",
  "../../shapers/Rectangular"
], function ($, Activity, ActiveBoxGrid, BoxBag, BoxConnector, AWT, Rectangular) {

  /**
   * This class of {@link Activity} shows only one panel with scrambled {@link ActiveBox} cells.
   *
   * One of the cells is out of the main panel, thus allowing its neighbors occupy their space.
   * Only immediate neighbors of the "hole" can move into it.
   *
   * When all cells are on place, the initially "expulsed" cell comes back home and the activity is done.
   * @exports HolePuzzle
   * @class
   * @extends Activity
   * @param {JClicProject} project - The {@link JClicProject} to which this activity belongs
   */
  var HolePuzzle = function (project) {
    Activity.call(this, project);
  };

  HolePuzzle.prototype = {
    constructor: HolePuzzle,
    /**
     *
     * Retrieves the minimum number of actions needed to solve this activity.
     * @returns {number}
     */
    getMinNumActions: function () {
      return this.abc.primary.getNumCells();
    },
    /**
     *
     * Whether or not the activity uses random to scramble internal components
     * @returns {boolean}
     */
    hasRandom: function () {
      return true;
    },
    /**
     *
     * When `true`, the activity must always be scrambled
     * @returns {boolean}
     */
    shuffleAlways: function () {
      return true;
    },
    /**
     *
     * Whether the activity allows the user to request help.
     * @returns {boolean}
     */
    helpSolutionAllowed: function () {
      return true;
    }
  };

  // InformationScreen extends Activity
  HolePuzzle.prototype = $.extend(Object.create(Activity.prototype), HolePuzzle.prototype);

  /**
   * The {@link Activity.Panel} where hole puzzle activities are played.
   * @class
   * @extends Activity.Panel
   * @param {Activity} act - The {@link Activity} to which this Panel belongs
   * @param {JClicPlayer} ps - Any object implementing the methods defined in the
   * [PlayStation](http://projectestac.github.io/jclic/apidoc/edu/xtec/jclic/PlayStation.html)
   * Java interface.
   * @param {external:jQuery=} $div - The jQuery DOM element where this Panel will deploy
   */
  HolePuzzle.Panel = function (act, ps, $div) {
    Activity.Panel.call(this, act, ps, $div);
  };

  var ActPanelAncestor = Activity.Panel.prototype;
  HolePuzzle.Panel.prototype = {
    constructor: HolePuzzle.Panel,
    /**
     * The {@link ActiveBoxBag} object containing the information to be displayed in the panel.
     * @type {ActiveBoxBag} */
    bg: null,
    /**
     * An auxiliary box bag with only one box, used to store the "missing piece" of
     * the puzzle.
     * @type {ActiveBoxGrid} */
    parkBg: null,
    /**
     * The hidden cell
     * @type {ActiveBox} */
    hiddenBox: null,
    /**
     * Index of the hidden cell on the ActiveBagContent
     * @type {number} */
    hiddenBoxIndex: -1,
    /**
     * List of mouse, touch and keyboard events intercepted by this panel
     * @type {string[]} */
    events: ['click'],
    /**
     *
     * Miscellaneous cleaning operations
     */
    clear: function () {
      if (this.bg) {
        this.bg.end();
        this.bg = null;
      }
      if (this.parkBg) {
        this.parkBg.end();
        this.parkBg = null;
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

      var abc = this.act.abc['primary'];
      if (abc) {

        if (abc.imgName)
          abc.setImgContent(this.act.project.mediaBag, null, false);

        if (this.act.acp !== null)
          this.act.acp.generateContent(abc.nch, abc.ncw, [abc], false);

        this.bg = ActiveBoxGrid.createEmptyGrid(null, this, this.act.margin, this.act.margin, abc);
        this.bg.setContent(abc);
        this.bg.setVisible(true);

        this.hiddenBoxIndex = Math.floor(Math.random() * this.bg.getNumCells());
        this.hiddenBox = this.bg.getActiveBox(this.hiddenBoxIndex);
        this.hiddenBox.setVisible(false);
        this.parkBg = new ActiveBoxGrid(null, this, abc.bb, this.act.margin, this.act.margin,
          this.hiddenBox.dim.width, this.hiddenBox.dim.height, new Rectangular(1, 1));
        this.parkBg.setContent(abc, null, this.hiddenBoxIndex, 0, 1);
        this.parkBg.setBorder(this.bg.hasBorder());
        this.parkBg.setVisible(true);
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

      if (this.bg) {
        //
        // This activity has an special shuffle method. Cells can move only to places near the 'hole'
        if (this.act.shuffles % 2 !== 1)
          this.act.shuffles++;
        for (var i = 0; i < this.act.shuffles; i++) {
          var pth = this.bg.getCoord(this.hiddenBox);
          var v = Math.floor(Math.random() * 2) === 0 ? 1 : -1;

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
    },
    /**
     * Updates the graphic content of this panel.
     * This method will be called from {@link AWT.Container#update} when needed.
     * @param {AWT.Rectangle} dirtyRegion - Specifies the area to be updated. When `null`,
     * it's the whole panel.
     */
    updateContent: function (dirtyRegion) {
      ActPanelAncestor.updateContent.call(this, dirtyRegion);
      if (this.bg && this.parkBg && this.$canvas) {
        var canvas = this.$canvas.get(0);
        var ctx = canvas.getContext('2d');
        if (!dirtyRegion)
          dirtyRegion = new AWT.Rectangle(0, 0, canvas.width, canvas.height);
        ctx.clearRect(dirtyRegion.pos.x, dirtyRegion.pos.y, dirtyRegion.dim.width, dirtyRegion.dim.height);
        this.bg.update(ctx, dirtyRegion);
        this.parkBg.update(ctx, dirtyRegion);
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
      if (!this.bg || !this.parkBg || this.getBounds().equals(preferredMaxSize))
        return preferredMaxSize;
      return BoxBag.layoutDouble(preferredMaxSize, this.bg, this.parkBg, this.act.boxGridPos, this.act.margin);
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
      if (this.bg && this.parkBg) {
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
      if (this.$canvas && this.accessibleCanvas && this.bg) {
        ActPanelAncestor.buildAccessibleComponents.call(this);
        this.bg.buildAccessibleElements(this.$canvas, this.$div);
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
        var bx;
        var p = new AWT.Point(
          event.pageX - this.$div.offset().left,
          event.pageY - this.$div.offset().top);

        switch (event.type) {
          case 'click':
            this.ps.stopMedia(1);
            // Find the box behind the clicked point
            bx = this.bg.findActiveBox(p);
            if (bx) {
              if (bx.isVisible()) {
                // Check if it's a valid move
                var pt = this.bg.getCoordDist(bx, this.hiddenBox);
                if (Math.abs(pt.x) + Math.abs(pt.y) === 1) {
                  // Ok, the cell is adjacent to the hole. Complete the move.
                  var m = bx.playMedia(this.ps);
                  var src = bx.getDescription() + '(' + bx.idOrder + ')';
                  var dest = '(' + this.hiddenBox.idLoc + ')';
                  bx.exchangeLocation(this.hiddenBox);
                  var ok = bx.idOrder === bx.idLoc;
                  // Check results and notify action
                  var cellsAtPlace = this.bg.countCellsAtEquivalentPlace(true);
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
        event.preventDefault();
      }
    }
  };

  // HolePuzzle.Panel extends Activity.Panel
  HolePuzzle.Panel.prototype = $.extend(Object.create(ActPanelAncestor), HolePuzzle.Panel.prototype);

  // Register class in Activity.prototype
  Activity.CLASSES['@puzzles.HolePuzzle'] = HolePuzzle;

  return HolePuzzle;

});
