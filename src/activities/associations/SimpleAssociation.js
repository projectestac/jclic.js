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

define([
  "jquery",
  "../../Activity",
  "../../boxes/ActiveBoxGrid",
  "../../boxes/BoxBag",
  "../../boxes/BoxConnector",
  "../../AWT"
], function ($, Activity, ActiveBoxGrid, BoxBag, BoxConnector, AWT) {

  /**
   *
   * This class of {@link Activity} uses two panels (`primary` and `secondary`) formed by
   * {@link ActiveBox} objects filled with data stored in {@link ActiveBagContent} repositories.
   *
   * Both panels have the same number of elements, associated one-to-one. A third {@link ActiveBagContent}
   * can be used as alternative content, that will be revealed in the `primary` panel as the pairings
   * of its cells are solved.
   * @exports SimpleAssociation
   * @class
   * @extends Activity
   * @param {JClicProject} project - The JClic project to which this activity belongs
   */
  var SimpleAssociation = function (project) {
    Activity.call(this, project);
  };

  SimpleAssociation.prototype = {
    constructor: SimpleAssociation,
    /**
     * When `true`, the cell's `idAss` field will be used to check pairing matches.
     * @type {boolean} */
    useIdAss: false,
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

  //
  // InformationScreen extends Activity
  SimpleAssociation.prototype = $.extend(Object.create(Activity.prototype), SimpleAssociation.prototype);

  /**
   * The {@link Activity.Panel} where simple association activities are played.
   * @class
   * @extends Activity.Panel
   * @param {Activity} act - The {@link Activity} to which this Panel belongs
   * @param {JClicPlayer} ps - Any object implementing the methods defined in the
   * [PlayStation](http://projectestac.github.io/jclic/apidoc/edu/xtec/jclic/PlayStation.html)
   * Java interface.
   * @param {external:jQuery=} $div - The jQuery DOM element where this Panel will deploy
   */
  SimpleAssociation.Panel = function (act, ps, $div) {
    Activity.Panel.call(this, act, ps, $div);
  };

  var ActPanelAncestor = Activity.Panel.prototype;

  SimpleAssociation.Panel.prototype = {
    constructor: SimpleAssociation.Panel,
    /**
     * The {@link ActiveBoxBag} object containing the information to be displayed in the `primary` panel
     * @type {ActiveBoxBag} */
    bgA: null,
    /**
     * The {@link ActiveBoxBag} object containing the information to be displayed in the `secondary` panel
     * @type {ActiveBoxBag} */
    bgB: null,
    /**
     * The box connector
     * @type {BoxConnector} */
    bc: null,
    /**
     * List of mouse, touch and keyboard events intercepted by this panel
     * @type {string[]} */
    events: ['mousedown', 'mouseup', 'mousemove', 'touchstart', 'touchend', 'touchmove', 'touchcancel'],
    /**
     *
     * Performs miscellaneous cleaning operations
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

      var abcA = this.act.abc['primary'],
          abcB = this.act.abc['secondary'],
          solved = this.act.abc['solvedPrimary'];

      if (abcA && abcB) {

        if (abcA.imgName) {
          abcA.setImgContent(this.act.project.mediaBag, null, false);
          if (abcA.animatedGifFile && !abcA.shaper.rectangularShapes && !this.act.scramble['primary'])
            this.$animatedBg = $('<span/>').css({
              'background-image': 'url(' + abcA.animatedGifFile + ')',
              'background-position': 'center',
              'background-repeat': 'no-repeat',
              position: 'absolute'}).appendTo(this.$div);
        }

        if (abcB.imgName) {
          abcB.setImgContent(this.act.project.mediaBag, null, false);
          if (abcB.animatedGifFile && !abcB.shaper.rectangularShapes && !this.act.scramble['secondary'])
            this.$animatedBgB = $('<span/>').css({
              'background-image': 'url(' + abcB.animatedGifFile + ')',
              'background-position': 'center',
              'background-repeat': 'no-repeat',
              position: 'absolute'}).appendTo(this.$div);
        }

        if (solved && solved.imgName)
          solved.setImgContent(this.act.project.mediaBag, null, false);

        if (this.act.acp !== null) {
          var contentKit = [abcA, abcB];
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
        var scrambleArray = [];
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
        var canvas = this.$canvas.get(0),
            ctx = canvas.getContext('2d');
        if (!dirtyRegion)
          dirtyRegion = new AWT.Rectangle(0, 0, canvas.width, canvas.height);
        ctx.clearRect(dirtyRegion.pos.x, dirtyRegion.pos.y, dirtyRegion.dim.width, dirtyRegion.dim.height);
        this.bgA.update(ctx, dirtyRegion);
        this.bgB.update(ctx, dirtyRegion);
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
        // Resize animated gif backgrounds
        if (this.$animatedBg) {
          var bgRect = this.bgA.getBounds();
          this.$animatedBg.css({
            left: bgRect.pos.x,
            top: bgRect.pos.y,
            width: bgRect.dim.width + 'px',
            height: bgRect.dim.height + 'px',
            'background-size': bgRect.dim.width + 'px ' + bgRect.dim.height + 'px'
          });
        }
        // Resize animated gif background
        if (this.$animatedBgB) {
          var bgRectB = this.bgB.getBounds();
          this.$animatedBgB.css({
            left: bgRectB.pos.x,
            top: bgRectB.pos.y,
            width: bgRectB.dim.width + 'px',
            height: bgRectB.dim.height + 'px',
            'background-size': bgRectB.dim.width + 'px ' + bgRectB.dim.height + 'px'
          });
        }
        this.$div.append(this.$canvas);

        // Create a [BoxConnector](BoxConnector.html) and attach it to the canvas context
        this.bc = new BoxConnector(this, this.$canvas.get(0).getContext('2d'));

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
        this.bgA.buildAccessibleElements(this.$canvas, this.$div, 'mousedown');
        this.bgB.buildAccessibleElements(this.$canvas, this.$div, 'mousedown');
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
      if (this.bc && this.playing) {
        //
        // The [AWT.Point](AWT.html#Point) where the mouse or touch event has been originated
        // and two [ActiveBox](ActiveBox.html) pointers used for the [BoxConnector](BoxConnector.html)
        // `origin` and `dest` points.
        var p = null,
            bx1, bx2;
        //
        // _touchend_ event don't provide pageX nor pageY information
        if (event.type === 'touchend') {
          p = this.bc.active ? this.bc.dest.clone() : new AWT.Point();
        } else {
          // Touch events can have more than one touch, so `pageX` must be obtained from `touches[0]`
          var x = event.originalEvent && event.originalEvent.touches ? event.originalEvent.touches[0].pageX : event.pageX,
              y = event.originalEvent && event.originalEvent.touches ? event.originalEvent.touches[0].pageY : event.pageY;
          p = new AWT.Point(x - this.$div.offset().left, y - this.$div.offset().top);
        }

        // Flag for tracking `mouseup` events
        var up = false,
            // Flag for assuring that only one media plays per event (avoid event sounds overlapping
            // cell's media sounds)
            m = false,
            // Flag for tracking clicks on the background of grid A
            clickOnBg0 = false;

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
              else
                this.ps.stopMedia(1);
              
              //
              // Determine if click was done on panel A or panel B
              bx1 = this.bgA.findActiveBox(p);
              bx2 = this.bgB.findActiveBox(p);
              if (bx1 && (!this.act.useOrder || bx1.idOrder === this.currentItem) ||
                  !this.act.useOrder && bx2 && bx2.idAss !== -1) {
                // Start the [BoxConnector](BoxConnector.html)
                if (this.act.dragCells)
                  this.bc.begin(p, bx1 || bx2);
                else
                  this.bc.begin(p);
                // Play cell media or event sound
                m |= (bx1 || bx2).playMedia(this.ps);
                if (!m)
                  this.playEvent('click');
                
                // Move the focus to the opposite accessible group
                var bg = bx1 ? this.bgA : this.bgB;
                if (bg.$accessibleDiv) {
                  bg = bx1 ? this.bgB : this.bgA;
                  if (bg.$accessibleDiv)
                    bg.$accessibleDiv.focus();
                }
              }
            } else {
              this.ps.stopMedia(1);
              // Pairing completed
              //
              // Find the active boxes behind `bc.origin` and `p`
              var origin = this.bc.origin;
              this.bc.end();
              bx1 = this.bgA.findActiveBox(origin);
              if (bx1) {
                bx2 = this.bgB.findActiveBox(p);
              } else {
                bx2 = this.bgB.findActiveBox(origin);
                if (bx2) {
                  bx1 = this.bgA.findActiveBox(p);
                  clickOnBg0 = true;
                }
              }
              // Check if the pairing was correct
              if (bx1 && bx2 && bx1.idAss !== -1 && bx2.idAss !== -1) {
                var ok = false,
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
                    m |= bx1.playMedia(this.ps);
                  } else {
                    if (clickOnBg0)
                      m |= bx1.playMedia(this.ps);
                    else
                      m |= bx2.playMedia(this.ps);
                    bx1.clear();
                  }
                  bx2.clear();

                  if (this.act.useOrder)
                    // Load next item
                    this.currentItem = this.bgA.getNextItem(this.currentItem);
                }
                // Check results and notify action
                var cellsPlaced = this.bgB.countCellsWithIdAss(-1);
                this.ps.reportNewAction(this.act, 'MATCH', src, dest, ok, cellsPlaced);
                // End activity or play event sound
                if (ok && cellsPlaced === this.bgB.getNumCells())
                  this.finishActivity(true);
                else if (!m)
                  this.playEvent(ok ? 'actionOk' : 'actionError');
              }
              this.update();

              // Move the focus to the `source` accessible group
              if (this.bgA.$accessibleDiv)
                this.bgA.$accessibleDiv.focus();
            }
            break;

          case 'mousemove':
          case 'touchmove':
            this.bc.moveTo(p);
            break;
        }
        event.preventDefault();
      }
    }
  };

  // SimpleAssociation.Panel extends Activity.Panel
  SimpleAssociation.Panel.prototype = $.extend(Object.create(ActPanelAncestor), SimpleAssociation.Panel.prototype);

  //
  // Register class in Activity.prototype
  Activity.CLASSES['@associations.SimpleAssociation'] = SimpleAssociation;

  return SimpleAssociation;

});
