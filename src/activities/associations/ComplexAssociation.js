/**
 *  File    : activities/associations/ComplexAssociation.js
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
  "../../AWT",
  "./SimpleAssociation"
], function ($, Activity, AWT, SimpleAssociation) {

  /**
   * This is a special case of {@link SimpleAssociation} where the elements of the 'secondary' panel
   * can have zero, one or more associated elements in the 'primary' panel.
   * @exports ComplexAssociation
   * @class
   * @extends SimpleAssociation
   * @param {JClicProject} project - The JClic project to which this activity belongs
   */
  var ComplexAssociation = function (project) {
    SimpleAssociation.call(this, project);
    this.useIdAss = true;
  };

  ComplexAssociation.prototype = {
    constructor: ComplexAssociation,
    /**
     * Number of unassigned cells
     * @type {number} */
    nonAssignedCells: 0,
    /**
     * Uses cell's `idAss` field to check if pairings match
     * @type {boolean} */
    useIdAss: false,
    /**
     *
     * Loads this object settings from an XML element
     * @param {external:jQuery} $xml - The jQuery XML element to parse
     */
    setProperties: function ($xml) {
      SimpleAssociation.prototype.setProperties.call(this, $xml);
      this.abc['primary'].avoidAllIdsNull(this.abc['secondary'].getNumCells());
    },
    /**
     *
     * Retrieves the minimum number of actions needed to solve this activity.
     * @returns {number}
     */
    getMinNumActions: function () {
      if (this.invAss)
        return this.abc['secondary'].getNumCells();
      else
        return this.abc['primary'].getNumCells() - this.nonAssignedCells;
    }
  };

  // ComplexAssociation extends SimpleAssociation
  ComplexAssociation.prototype = $.extend(Object.create(SimpleAssociation.prototype), ComplexAssociation.prototype);

  /**
   * The {@link Activity.Panel} where complex association activities are played.
   * @class
   * @extends SimpleAssociation.Panel
   * @param {Activity} act - The {@link Activity} to which this Panel belongs
   * @param {JClicPlayer} ps - Any object implementing the methods defined in the
   * [PlayStation](http://projectestac.github.io/jclic/apidoc/edu/xtec/jclic/PlayStation.html)
   * Java interface.
   * @param {external:jQuery=} $div - The jQuery DOM element where this Panel will deploy
   */
  ComplexAssociation.Panel = function (act, ps, $div) {
    SimpleAssociation.Panel.call(this, act, ps, $div);
  };

  var panelAncestor = SimpleAssociation.Panel.prototype;

  ComplexAssociation.Panel.prototype = {
    constructor: ComplexAssociation.Panel,
    /**
     * Array for storing checked associations
     * @type {boolean[]} */
    invAssCheck: null,
    /**
     *
     * Prepares the visual components of the activity
     */
    buildVisualComponents: function () {

      panelAncestor.buildVisualComponents.call(this);

      var abcA = this.act.abc['primary'],
        abcB = this.act.abc['secondary'],
        i, n;

      if (abcA && abcB) {
        if (this.act.invAss) {
          this.invAssCheck = [];
          n = abcB.getNumCells();
          for (i = 0; i < n; i++)
            this.invAssCheck[i] = false;
        }

        this.bgA.setDefaultIdAss();

        this.act.nonAssignedCells = 0;
        n = this.bgA.getNumCells();
        for (i = 0; i < n; i++) {
          var bx = this.bgA.getActiveBox(i);
          if (bx.idAss === -1) {
            this.act.nonAssignedCells++;
            bx.switchToAlt(this.ps);
          }
        }
      }
    },
    /**
     *
     * Checks if all inverse associations are done
     * @returns {boolean}
     */
    checkInvAss: function () {
      var i;
      if (!this.act.invAss || !this.invAssCheck)
        return false;
      for (i = 0; i < this.invAssCheck.length; i++)
        if (!this.invAssCheck[i])
          break;
      return i === this.invAssCheck.length;
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
        var p = null, bx1, bx2;

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
              // New pairing starts
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
              if (bx1 && bx1.idAss !== -1 && (!this.act.useOrder || bx1.idOrder === this.currentItem) ||
                !this.act.useOrder && bx2) {
                // Start the [BoxConnector](BoxConnector.html)
                if (this.act.dragCells)
                  this.bc.begin(p, bx1 || bx2);
                else
                  this.bc.begin(p);
                // Play cell media or event sound
                m |= (bx1 || bx2).playMedia(this.ps);
                if (!m)
                  this.playEvent('click');
              }

              // Move the focus to the opposite accessible group
              var bg = bx1 ? this.bgA : this.bgB;
              if (bg.$accessibleDiv) {
                bg = bx1 ? this.bgB : this.bgA;
                if (bg.$accessibleDiv)
                  bg.$accessibleDiv.focus();
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
              if (bx1 && bx2 && bx1.idAss !== -1 && !bx2.isInactive()) {
                var ok = false,
                  src = bx1.getDescription(),
                  dest = bx2.getDescription(),
                  matchingDest = this.act.abc['secondary'].getActiveBoxContent(bx1.idAss);

                if (bx1.idAss === bx2.idOrder || bx2.getContent().isEquivalent(matchingDest, true)) {
                  // Pairing was OK. Play media and disable involved cells
                  ok = true;
                  bx1.idAss = -1;
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
                  if (this.act.invAss) {
                    this.invAssCheck[bx2.idOrder] = true;
                    bx2.clear();
                  }
                  if (this.act.useOrder)
                    // Load next item
                    this.currentItem = this.bgA.getNextItem(this.currentItem);
                }
                // Check results and notify action
                var cellsPlaced = this.bgA.countCellsWithIdAss(-1);
                this.ps.reportNewAction(this.act, 'MATCH', src, dest, ok, cellsPlaced - this.act.nonAssignedCells);
                // End activity or play event sound
                if (ok && (this.checkInvAss() || cellsPlaced === this.bgA.getNumCells()))
                  this.finishActivity(true);
                else if (!m)
                  this.playEvent(ok ? 'actionOk' : 'actionError');
              } else if (clickOnBg0 && this.bgA.contains(p) || !clickOnBg0 && this.bgB.contains(p)) {
                // click on grid, out of cell
                var srcOut = bx1 ? bx1.getDescription() : bx2 ? bx2.getDescription() : 'null';
                this.ps.reportNewAction(this.act, 'MATCH', srcOut, 'null', false, this.bgB.countCellsWithIdAss(-1));
                this.playEvent('actionError');
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

  // ComplexAssociation.Panel extends SimpleAssociation.Panel
  ComplexAssociation.Panel.prototype = $.extend(Object.create(panelAncestor), ComplexAssociation.Panel.prototype);

  // Register class in Activity.prototype
  Activity.CLASSES['@associations.ComplexAssociation'] = ComplexAssociation;

  return ComplexAssociation;

});
