/**
 *  File    : activities/panels/Identify.js
 *  Created : 03/06/2015
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
  "../../AWT"
], function ($, Activity, ActiveBoxGrid, BoxBag, AWT) {

  /**
   * The aim of this type of {@link Activity} is to identify {@link ActiveBox} elements in a panel
   * that satisfy a specific condition, usually exposed in the main message.
   * @exports Identify
   * @class
   * @extends Activity
   * @param {JClicProject} project - The {@link JClicProject} to which this activity belongs
   */
  var Identify = function (project) {
    Activity.call(this, project);
  };

  Identify.prototype = {
    constructor: Identify,
    /**
     * Number of not assigned cells (calculated in {@link Identify.Panel#buildVisualComponents})
     * @type {number} */
    nonAssignedCells: 0,
    /**
     * Number of cells the user must identify to complete the activity (calculated in
     * {@link Identify.Panel#buildVisualComponents})
     * @type {number} */
    cellsToMatch: 1,
    /**
     *
     * Retrieves the minimum number of actions needed to solve this activity
     * @returns {number}
     */
    getMinNumActions: function () {
      return this.cellsToMatch;
    },
    /**
     *
     * Whether or not the activity uses random to scramble internal components
     * @returns {boolean}
     */
    hasRandom: function () {
      return true;
    }
  };

  // Identify extends Activity
  Identify.prototype = $.extend(Object.create(Activity.prototype), Identify.prototype);

  /**
   * The {@link Activity.Panel} where identify activities are played.
   * @class
   * @extends Activity.Panel
   * @param {Activity} act - The {@link Activity} to which this Panel belongs
   * @param {JClicPlayer} ps - Any object implementing the methods defined in the
   * [PlayStation](http://projectestac.github.io/jclic/apidoc/edu/xtec/jclic/PlayStation.html)
   * Java interface.
   * @param {external:jQuery=} $div - The jQuery DOM element where this Panel will deploy
   */
  Identify.Panel = function (act, ps, $div) {
    Activity.Panel.call(this, act, ps, $div);
  };

  var ActPanelAncestor = Activity.Panel.prototype;

  Identify.Panel.prototype = {
    constructor: Identify.Panel,
    /**
     * The {@link ActiveBoxBag} containing the information to be displayed on the panel.
     */
    bg: null,
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
      var solved = this.act.abc['solvedPrimary'];
      if (abc) {
        if (abc.imgName) {
          abc.setImgContent(this.act.project.mediaBag, null, false);
          if (abc.animatedGifFile && !abc.shaper.rectangularShapes && !this.act.scramble['primary'])
            this.$animatedBg = $('<span/>').css({
              'background-image': 'url(' + abc.animatedGifFile + ')',
              'background-position': 'center',
              'background-repeat': 'no-repeat',
              position: 'absolute'
            }).appendTo(this.$div);
        }

        if (solved && solved.imgName)
          solved.setImgContent(this.act.project.mediaBag, null, false);

        if (this.act.acp !== null) {
          var contentKit = [abc];
          if (solved) {
            contentKit.push(null);
            contentKit.push(solved);
          }
          this.act.acp.generateContent(abc.nch, abc.ncw, contentKit, false);
        }
        this.bg = ActiveBoxGrid.createEmptyGrid(null, this,
          this.act.margin, this.act.margin,
          abc);
        this.bg.setContent(abc, solved || null);
        this.bg.setAlternative(false);
        if (this.$animatedBg)
          this.bg.setCellAttr('tmpTrans', true);
        this.bg.setDefaultIdAss();
        this.act.nonAssignedCells = 0;
        this.act.cellsToMatch = 0;
        var n = this.bg.getNumCells();
        for (var i = 0; i < n; i++) {
          var bx = this.bg.getActiveBox(i);
          var id = bx.idAss;
          if (id === 1)
            this.act.cellsToMatch++;
          else if (id === -1) {
            this.act.nonAssignedCells++;
            bx.switchToAlt(this.ps);
          }
        }
        this.bg.setVisible(true);
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
        if (this.act.scramble['primary'])
          this.shuffle([this.bg], true, true);

        if (this.useOrder)
          this.currentItem = this.bg.getNextItem(-1);

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

      if (this.bg && this.$canvas) {
        var canvas = this.$canvas.get(0);
        var ctx = canvas.getContext('2d');
        if (!dirtyRegion)
          dirtyRegion = new AWT.Rectangle(0, 0, canvas.width, canvas.height);
        ctx.clearRect(dirtyRegion.pos.x, dirtyRegion.pos.y, dirtyRegion.dim.width, dirtyRegion.dim.height);
        this.bg.update(ctx, dirtyRegion);
      }
      return ActPanelAncestor.updateContent.call(this, dirtyRegion);
    },
    /**
     *
     * Sets the real dimension of this panel.
     * @param {AWT.Dimension} preferredMaxSize - The maximum surface available for the activity panel
     * @returns {AWT.Dimension}
     */
    setDimension: function (preferredMaxSize) {
      if (this.getBounds().equals(preferredMaxSize))
        return preferredMaxSize;
      return BoxBag.layoutSingle(preferredMaxSize, this.bg, this.act.margin);
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
      if (this.bg) {
        this.$canvas = $('<canvas width="' + rect.dim.width + '" height="' + rect.dim.height + '"/>').css({
          position: 'absolute',
          top: 0,
          left: 0
        });
        // Resize animated gif background
        if (this.$animatedBg) {
          var bgRect = this.bg.getBounds();
          this.$animatedBg.css({
            left: bgRect.pos.x,
            top: bgRect.pos.y,
            width: bgRect.dim.width + 'px',
            height: bgRect.dim.height + 'px',
            'background-size': bgRect.dim.width + 'px ' + bgRect.dim.height + 'px'
          });
        }
        this.$div.append(this.$canvas);
        this.invalidate().update();
        var thisPanel = this;
        setTimeout(function () {
          if (thisPanel.bg)
            thisPanel.bg.buildAccessibleElements(thisPanel.$canvas, thisPanel.$div);
        }, 0);
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
        var m = false;
        var p = new AWT.Point(
          event.pageX - this.$div.offset().left,
          event.pageY - this.$div.offset().top);

        switch (event.type) {
          case 'click':
            this.ps.stopMedia(1);
            // Find the box behind the clicked point
            bx = this.bg.findActiveBox(p);
            if (bx) {
              if (bx.idAss !== -1) {
                // Check if it's a valid move
                var ok = false;
                var src = bx.getDescription();
                m |= bx.playMedia(this.ps);
                if (bx.idAss === 1 && (!this.act.useOrder || bx.idOrder === this.currentItem)) {
                  ok = true;
                  bx.idAss = -1;
                  if (bx.switchToAlt(this.ps))
                    m |= bx.playMedia(this.ps);
                  else
                    bx.clear();
                  if (this.act.useOrder)
                    this.currentItem = this.bg.getNextItem(this.currentItem, 1);
                }
                var cellsOk = this.bg.countCellsWithIdAss(-1);
                this.ps.reportNewAction(this.act, 'SELECT', src, null, ok, cellsOk - this.act.nonAssignedCells);
                if (ok && cellsOk === this.act.cellsToMatch + this.act.nonAssignedCells)
                  this.finishActivity(true);
                else if (!m)
                  this.playEvent(ok ? 'actionOk' : 'actionError');
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

  // Identify.Panel extends Activity.Panel
  Identify.Panel.prototype = $.extend(Object.create(ActPanelAncestor), Identify.Panel.prototype);

  // Register class in Activity.prototype
  Activity.CLASSES['@panels.Identify'] = Identify;

  return Identify;

});
