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
   */
  class ComplexAssociation extends SimpleAssociation {
    /**
     * ComplexAssociation constructor
     * @param {JClicProject} project - The JClic project to which this activity belongs
     */
    constructor(project) {
      super(project);
      this.useIdAss = true;
    }

    /**
     * Loads this object settings from an XML element
     * @override
     * @param {external:jQuery} $xml - The jQuery XML element to parse
     */
    $setProperties($xml) {
      super.$setProperties($xml);
      this.abc['primary'].avoidAllIdsNull(this.abc['secondary'].getNumCells());
    }

    /**
     * Retrieves the minimum number of actions needed to solve this activity.
     * @override
     * @returns {number}
     */
    getMinNumActions() {
      if (this.invAss)
        return this.abc['secondary'].getNumCells();
      else
        return this.abc['primary'].getNumCells() - this.nonAssignedCells;
    }
  }

  Object.assign(ComplexAssociation.prototype, {
    /**
     * Number of unassigned cells
     * @name ComplexAssociation#nonAssignedCells
     * @type {number} */
    nonAssignedCells: 0,
    /**
     * Uses cell's `idAss` field to check if pairings match
     * @name ComplexAssociation#useIdAss
     * @type {boolean} */
    useIdAss: false,
  });

  /**
   * The {@link ActivityPanel} where {@link ComplexAssociation} activities are played.
   * @class
   * @extends SimpleAssociationPanel
   */
  class ComplexAssociationPanel extends SimpleAssociation.Panel {
    /**
     * ComplexAssociationPanel prototype
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
     * Prepares the visual components of the activity
     * @override
     */
    buildVisualComponents() {
      super.buildVisualComponents();

      const
        abcA = this.act.abc['primary'],
        abcB = this.act.abc['secondary'];

      if (abcA && abcB) {
        if (this.act.invAss)
          this.invAssCheck = Array(abcB.getNumCells()).fill(false);
        this.bgA.setDefaultIdAss();
        this.act.nonAssignedCells = 0;
        this.bgA.cells.forEach(bx => {
          if (bx.idAss === -1) {
            this.act.nonAssignedCells++;
            bx.switchToAlt(this.ps);
          }
        });
      }
    }

    /**
     * Checks if all inverse associations are done
     * @returns {boolean}
     */
    checkInvAss() {
      if (!this.act.invAss || !this.invAssCheck)
        return false;
      return this.invAssCheck.every(chk => chk);
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
        if (event.type === 'touchend') {
          p = this.bc.active ? this.bc.dest.clone() : new AWT.Point();
        } else {
          // Touch events can have more than one touch, so `pageX` must be obtained from `touches[0]`
          let
            x = event.originalEvent && event.originalEvent.touches ? event.originalEvent.touches[0].pageX : event.pageX,
            y = event.originalEvent && event.originalEvent.touches ? event.originalEvent.touches[0].pageY : event.pageY;
          p = new AWT.Point(x - this.$div.offset().left, y - this.$div.offset().top);
        }

        let
          // Flag for tracking `mouseup` events
          up = false,
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
              // New pairing starts
              //
              // Pairings can never start with a `mouseup` event
              if (up)
                break;

              this.ps.stopMedia(1);
              // Determine if click was done on panel A or panel B
              bx1 = this.bgA ? this.bgA.findActiveBox(p) : null;
              bx2 = this.bgB ? this.bgB.findActiveBox(p) : null;
              if (bx1 && bx1.idAss !== -1 && (!this.act.useOrder || bx1.idOrder === this.currentItem) ||
                !this.act.useOrder && bx2) {
                // Start the [BoxConnector](BoxConnector.html)
                if (this.act.dragCells)
                  this.bc.begin(p, bx1 || bx2);
                else
                  this.bc.begin(p);
                // Play cell media or event sound
                m = m || (bx1 || bx2).playMedia(this.ps, delayedActions);
                if (!m)
                  this.playEvent('click');
              }

              // Move the focus to the opposite accessible group
              let bg = bx1 ? this.bgA : this.bgB;
              if (bg && bg.$accessibleDiv) {
                bg = bx1 ? this.bgB : this.bgA;
                if (bg && bg.$accessibleDiv)
                  bg.$accessibleDiv.focus();
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
              if (bx1 && bx2 && bx1.idAss !== -1 && !bx2.isInactive() && this.act.abc['secondary']) {
                const
                  src = bx1.getDescription(),
                  dest = bx2.getDescription(),
                  matchingDest = this.act.abc['secondary'].getActiveBoxContent(bx1.idAss);
                let ok = false;

                if (bx1.idAss === bx2.idOrder || bx2.getContent().isEquivalent(matchingDest, true)) {
                  // Pairing was OK. Play media and disable involved cells
                  ok = true;
                  bx1.idAss = -1;
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
                  if (this.act.invAss) {
                    this.invAssCheck[bx2.idOrder] = true;
                    bx2.clear();
                  }
                  if (this.act.useOrder && this.bgA)
                    // Load next item
                    this.currentItem = this.bgA.getNextItem(this.currentItem);
                }
                // Check results and notify action
                if (this.bgA) {
                  const cellsPlaced = this.bgA.countCellsWithIdAss(-1);
                  this.ps.reportNewAction(this.act, 'MATCH', src, dest, ok, cellsPlaced - this.act.nonAssignedCells);
                  // End activity or play event sound
                  if (ok && (this.checkInvAss() || cellsPlaced === this.bgA.getNumCells()))
                    this.finishActivity(true);
                  else if (!m)
                    this.playEvent(ok ? 'actionOk' : 'actionError');
                }
              } else if (this.bgB && (clickOnBg0 && this.bgA && this.bgA.contains(p) || !clickOnBg0 && this.bgB.contains(p))) {
                // click on grid, out of cell
                const srcOut = bx1 ? bx1.getDescription() : bx2 ? bx2.getDescription() : 'null';
                this.ps.reportNewAction(this.act, 'MATCH', srcOut, 'null', false, this.bgB.countCellsWithIdAss(-1));
                this.playEvent('actionError');
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

  Object.assign(ComplexAssociationPanel.prototype, {
    /**
     * Array for storing checked associations
     * @name ComplexAssociation#Panel#invAssCheck
     * @type {boolean[]} */
    invAssCheck: null,
  });

  /**
   * Panel class associated to this type of activity: {@link ComplexAssociationPanel}
   * @type {class} */
  ComplexAssociation.Panel = ComplexAssociationPanel;

  // Register class in Activity.prototype
  Activity.CLASSES['@associations.ComplexAssociation'] = ComplexAssociation;

  return ComplexAssociation;
});
