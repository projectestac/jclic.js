/**
 *  File    : activities/associations/SimpleAssociation.js
 *  Created : 02/06/2015
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
  "../../AWT"
], function ($, Activity, ActiveBoxGrid, BoxBag, BoxConnector, AWT) {

  /**
   * This class of {@link Activity} uses two panels (`primary` and `secondary`) formed by
   * {@link ActiveBox} objects filled with data stored in {@link ActiveBagContent} repositories.
   *
   * Both panels have the same number of elements, associated one-to-one. A third {@link ActiveBagContent}
   * can be used as alternative content, that will be revealed in the `primary` panel as the pairings
   * of its cells are solved.
   * @exports SimpleAssociation
   * @class
   * @extends Activity
   */
  class SimpleAssociation extends Activity {
    /**
     * SimpleAssociation constructor
     * @param {JClicProject} project - The JClic project to which this activity belongs
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
     * Whether or not the activity uses random to scramble internal components
     * @override
     * @returns {boolean}
     */
    hasRandom() {
      return true;
    }

    /**
     * When `true`, the activity must always be scrambled
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

  Object.assign(SimpleAssociation.prototype, {
    /**
     * When `true`, the cell's `idAss` field will be used to check pairing matches.
     * @name SimpleAssociation#useIdAss
     * @type {boolean} */
    useIdAss: false,
  });

  /**
   * The {@link ActivityPanel} where {@link SimpleAssociation} activities are played.
   * @class
   * @extends ActivityPanel
   */
  class SimpleAssociationPanel extends Activity.Panel {
    /**
     * SimpleAssociationPanel constructor
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
     * Performs miscellaneous cleaning operations
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
        abcB = this.act.abc['secondary'],
        solved = this.act.abc['solvedPrimary'];

      if (abcA && abcB) {
        if (abcA.imgName) {
          abcA.setImgContent(this.act.project.mediaBag, null, false);
          if (abcA.animatedGifFile && !abcA.shaper.rectangularShapes && !this.act.scramble['primary'])
            this.$animatedBg = $('<span/>').css({
              'background-image': `url(${abcA.animatedGifFile})`,
              'background-position': 'center',
              'background-repeat': 'no-repeat',
              position: 'absolute'
            }).appendTo(this.$div);
        }

        if (abcB.imgName) {
          abcB.setImgContent(this.act.project.mediaBag, null, false);
          if (abcB.animatedGifFile && !abcB.shaper.rectangularShapes && !this.act.scramble['secondary'])
            this.$animatedBgB = $('<span/>').css({
              'background-image': `url(${abcB.animatedGifFile})`,
              'background-position': 'center',
              'background-repeat': 'no-repeat',
              position: 'absolute'
            }).appendTo(this.$div);
        }

        if (solved && solved.imgName)
          solved.setImgContent(this.act.project.mediaBag, null, false);

        if (this.act.acp !== null) {
          const contentKit = [abcA, abcB];
          if (solved)
            contentKit.push(solved);
          this.act.acp.generateContent(abcA.nch, abcA.ncw, contentKit, false);
        }

        this.bgA = ActiveBoxGrid.createEmptyGrid(null, this, this.act.margin, this.act.margin, abcA);
        this.bgB = ActiveBoxGrid.createEmptyGrid(null, this, this.act.margin, this.act.margin, abcB);

        this.bgA.setContent(abcA, solved ? solved : null);
        if (this.$animatedBg)
          this.bgA.setCellAttr('tmpTrans', true);

        this.bgB.setContent(abcB);
        if (this.$animatedBgB)
          this.bgB.setCellAttr('tmpTrans', true);

        this.bgA.accessibleText = this.ps.getMsg('source');
        this.bgB.accessibleText = this.ps.getMsg('target');

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
        const scrambleArray = [];
        if (this.act.scramble.primary)
          scrambleArray.push(this.bgA);
        if (this.act.scramble.secondary)
          scrambleArray.push(this.bgB);
        if (scrambleArray.length > 0) {
          this.shuffle(scrambleArray, true, true);
        }

        if (this.useOrder)
          this.currentItem = this.bgA.getNextItem(-1);

        this.invalidate().update();
        this.setAndPlayMsg('initial', 'start');
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
        // Resize animated gif background A
        if (this.$animatedBg && this.bgA) {
          const bgRect = this.bgA.getBounds();
          this.$animatedBg.css({
            left: bgRect.pos.x,
            top: bgRect.pos.y,
            width: bgRect.dim.width + 'px',
            height: bgRect.dim.height + 'px',
            'background-size': `${bgRect.dim.width}px ${bgRect.dim.height}px`
          });
        }
        // Resize animated gif background B
        if (this.$animatedBgB && this.bgB) {
          const bgRectB = this.bgB.getBounds();
          this.$animatedBgB.css({
            left: bgRectB.pos.x,
            top: bgRectB.pos.y,
            width: bgRectB.dim.width + 'px',
            height: bgRectB.dim.height + 'px',
            'background-size': `${bgRectB.dim.width}px ${bgRectB.dim.height}px`
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
     * Builds the accessible components needed for this ActivityPanel
     * This method is called when all main elements are placed and visible, when the activity is ready
     * to start or when resized.
     * @override
     */
    buildAccessibleComponents() {
      if (this.$canvas && this.accessibleCanvas) {
        super.buildAccessibleComponents();
        if (this.bgA)
          this.bgA.buildAccessibleElements(this.$canvas, this.$div, 'mousedown');
        if (this.bgB)
          this.bgB.buildAccessibleElements(this.$canvas, this.$div, 'mousedown');
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
      if (this.bc && this.playing) {
        //
        // The [AWT.Point](AWT.html#Point) where the mouse or touch event has been originated
        // and two [ActiveBox](ActiveBox.html) pointers used for the [BoxConnector](BoxConnector.html)
        // `origin` and `dest` points.
        let p = null, bx1, bx2;
        //
        // _touchend_ event don't provide pageX nor pageY information
        if (event.type === 'touchend')
          p = this.bc.active ? this.bc.dest.clone() : new AWT.Point();
        else {
          // Touch events can have more than one touch, so `pageX` must be obtained from `touches[0]`
          const
            x = event.originalEvent && event.originalEvent.touches ? event.originalEvent.touches[0].pageX : event.pageX,
            y = event.originalEvent && event.originalEvent.touches ? event.originalEvent.touches[0].pageY : event.pageY;
          p = new AWT.Point(x - this.$div.offset().left, y - this.$div.offset().top);
        }

        // Flag for tracking `mouseup` events
        let up = false,
          // Flag for assuring that only one media plays per event (avoid event sounds overlapping
          // cell's media sounds)
          m = false,
          // Flag for tracking clicks on the background of grid A
          clickOnBg0 = false,
          // Array to be filled with actions to be executed at the end of event processing
          delayedActions = [];

        switch (event.type) {
          case 'touchcancel':
            // Canvel movement
            if (this.bc.active)
              this.bc.end();
            break;

          case 'mouseup':
            // Don't consider drag moves below 3 pixels. Can be a "trembling click"
            if (this.bc.active && p.distanceTo(this.bc.origin) <= 3) {
              break;
            }
            up = true;
          /* falls through */
          case 'touchend':
          case 'touchstart':
          case 'mousedown':
            if (!this.bc.active) {
              // A new pairing starts
              //
              // Pairings can never start with a `mouseup` event
              if (up)
                break;

              this.ps.stopMedia(1);
              //
              // Determine if click was done on panel A or panel B
              bx1 = this.bgA ? this.bgA.findActiveBox(p) : null;
              bx2 = this.bgB ? this.bgB.findActiveBox(p) : null;
              if (bx1 && (!this.act.useOrder || bx1.idOrder === this.currentItem) ||
                !this.act.useOrder && bx2 && bx2.idAss !== -1) {
                // Start the [BoxConnector](BoxConnector.html)
                if (this.act.dragCells)
                  this.bc.begin(p, bx1 || bx2);
                else
                  this.bc.begin(p);
                // Play cell media or event sound
                m = m || (bx1 || bx2).playMedia(this.ps, delayedActions);
                if (!m)
                  this.playEvent('click');

                // Move the focus to the opposite accessible group
                let bg = bx1 ? this.bgA : this.bgB;
                if (bg && bg.$accessibleDiv) {
                  bg = bx1 ? this.bgB : this.bgA;
                  if (bg && bg.$accessibleDiv)
                    bg.$accessibleDiv.focus();
                }
              }
            } else {
              this.ps.stopMedia(1);
              // Pairing completed
              //
              // Find the active boxes behind `bc.origin` and `p`
              const origin = this.bc.origin;
              this.bc.end();
              bx1 = this.bgA ? this.bgA.findActiveBox(origin) : null;
              if (bx1) {
                bx2 = this.bgB ? this.bgB.findActiveBox(p) : null;
              } else {
                bx2 = this.bgB ? this.bgB.findActiveBox(origin) : null;
                if (bx2) {
                  bx1 = this.bgA ? this.bgA.findActiveBox(p) : null;
                  clickOnBg0 = true;
                }
              }
              // Check if the pairing was correct
              if (bx1 && bx2 && bx1.idAss !== -1 && bx2.idAss !== -1 && this.act.abc['secondary']) {
                let ok = false;
                const
                  src = bx1.getDescription(),
                  dest = bx2.getDescription(),
                  matchingDest = this.act.abc['secondary'].getActiveBoxContent(bx1.idOrder);
                if (bx1.idOrder === bx2.idOrder || bx2.getContent().isEquivalent(matchingDest, true)) {
                  // Pairing is OK. Play media and disable involved cells
                  ok = true;
                  bx1.idAss = -1;
                  bx2.idAss = -1;
                  if (this.act.abc['solvedPrimary']) {
                    bx1.switchToAlt(this.ps);
                    m = m || bx1.playMedia(this.ps, delayedActions);
                  } else {
                    if (clickOnBg0)
                      m = m || bx1.playMedia(this.ps, delayedActions);
                    else
                      m = m || bx2.playMedia(this.ps, delayedActions);
                    bx1.clear();
                  }
                  bx2.clear();

                  if (this.act.useOrder && this.bgA)
                    // Load next item
                    this.currentItem = this.bgA.getNextItem(this.currentItem);
                }
                // Check results and notify action
                const cellsPlaced = this.bgB ? this.bgB.countCellsWithIdAss(-1) : 0;
                this.ps.reportNewAction(this.act, 'MATCH', src, dest, ok, cellsPlaced);
                // End activity or play event sound
                if (ok && cellsPlaced === this.bgB.getNumCells())
                  this.finishActivity(true);
                else if (!m)
                  this.playEvent(ok ? 'actionOk' : 'actionError');
              }
              this.update();

              // Move the focus to the `source` accessible group
              if (this.bgA && this.bgA.$accessibleDiv)
                this.bgA.$accessibleDiv.focus();
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

  Object.assign(SimpleAssociationPanel.prototype, {
    /**
     * The {@link ActiveBoxBag} object containing the information to be displayed in the `primary` panel
     * @name SimpleAssociationPanel#bgA
     * @type {ActiveBoxBag} */
    bgA: null,
    /**
     * The {@link ActiveBoxBag} object containing the information to be displayed in the `secondary` panel
     * @name SimpleAssociationPanel#bgB
     * @type {ActiveBoxBag} */
    bgB: null,
    /**
     * The box connector
     * @name SimpleAssociationPanel#bc
     * @type {BoxConnector} */
    bc: null,
    /**
     * List of mouse, touch and keyboard events intercepted by this panel
     * @override
     * @name SimpleAssociationPanel#events
     * @type {string[]} */
    events: ['mousedown', 'mouseup', 'mousemove', 'touchstart', 'touchend', 'touchmove', 'touchcancel'],
  });

  /**
   * Panel class associated to this type of activity: {@link SimpleAssociationPanel}
   * @type {class} */
  SimpleAssociation.Panel = SimpleAssociationPanel;

  //
  // Register class in Activity.prototype
  Activity.CLASSES['@associations.SimpleAssociation'] = SimpleAssociation;

  return SimpleAssociation;
});
