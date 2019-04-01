/**
 *  File    : activities/text/WrittenAnswer.js
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

/* global define */

define([
  "jquery",
  "../../Activity",
  "../../boxes/ActiveBoxGrid",
  "../../boxes/BoxBag",
  "../../AWT",
  "../../Utils",
  "../../shapers/Rectangular"
], function ($, Activity, ActiveBoxGrid, BoxBag, AWT, Utils, Rectangular) {

  /**
   * This class of {@link Activity} shows a panel with {@link ActiveBox} objects acting as cells
   * with questions. The answers to these questions must be written in a separate text field.
   *
   * The ActiveBox objects are filled with data stored in {@link ActiveBagContent} repositories.
   *
   * A second {@link ActiveBagContent} can be used as alternative content, revealed as the questions
   * are solved.
   * @exports WrittenAnswer
   * @class
   * @extends Activity
   */
  class WrittenAnswer extends Activity {
    /**
     * WrittenAnswer constructor
     * @param {JClicProject} project - The JClic project to which this activity belongs
     */
    constructor(project) {
      super(project);
    }

    /**
     * Loads this object settings from an XML element
     * @override
     * @param {external:jQuery} $xml - The jQuery XML element to parse
     */
    $setProperties($xml) {
      super.$setProperties($xml);
      this.abc['primary'].avoidAllIdsNull(this.abc['answers'].getNumCells());
    }

    /**
     * Retrieves the minimum number of actions needed to solve this activity
     * @override
     * @returns {number}
     */
    getMinNumActions() {
      return this.invAss ?
        this.abc['answers'].getNumCells() :
        this.abc['primary'].getNumCells() - this.nonAssignedCells;
    }

    /**
     * This activity uses random values to scramble its internal components
     * @override
     * @returns {boolean}
     */
    hasRandom() {
      return true;
    }

    /**
     * This activity makes use of the keyboard
     * @override
     * @returns {boolean}
     */
    needsKeyboard() {
      return true;
    }

    /**
     * This activity can permit the user to display the solution
     * @override
     * @returns {boolean}
     */
    helpSolutionAllowed() {
      return true;
    }
  }

  Object.assign(WrittenAnswer.prototype, {
    /**
     * Number of unassigned cells
     * @name WrittenAnswer#nonAssignedCells
     * @type {number} */
    nonAssignedCells: 0,
    /**
     * Whether to use or not the cell's `idAss` field to check if pairings match
     * @name WrittenAnswer#useIdAss
     * @type {boolean} */
    useIdAss: true,
  });

  /**
   * The {@link ActivityPanel} where {@link WrittenAnswer} activities are played.
   * @class
   * @extends ActivityPanel
   */
  class WrittenAnswerPanel extends Activity.Panel {
    /**
     * WrittenAnswerPanel constructor
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
        abcB = this.act.abc['answers'],
        solved = this.act.abc['solvedPrimary'];

      if (abcA && abcB) {
        if (this.act.invAss)
          this.invAssCheck = Array(abcB.getNumCells()).fill(false);

        if (abcA.image) {
          abcA.setImgContent(this.act.project.mediaBag, null, false);
          if (abcA.animatedGifFile && !abcA.shaper.rectangularShapes && !this.act.scramble['primary'])
            this.$animatedBg = $('<span/>').css({
              'background-image': 'url(' + abcA.animatedGifFile + ')',
              'background-position': 'center',
              'background-repeat': 'no-repeat',
              position: 'absolute'
            }).appendTo(this.$div);
        }

        if (solved && solved.image)
          solved.setImgContent(this.act.project.mediaBag, null, false);

        if (this.act.acp !== null) {
          const contentKit = [abcA, abcB];
          if (solved)
            contentKit.push(solved);
          this.act.acp.generateContent(abcA.nch, abcA.ncw, contentKit, false);
        }

        this.bgA = ActiveBoxGrid.createEmptyGrid(null, this, this.act.margin, this.act.margin, abcA);

        let w = abcB.w;
        if (this.act.boxGridPos === 'AUB' || this.act.boxGridPos === 'BUA')
          w = abcA.getTotalWidth();
        //
        // bgB will be used only as a placeholder for `$textField`
        this.bgB = new ActiveBoxGrid(null, this, abcB.style, this.act.margin, this.act.margin, w, abcB.h, new Rectangular(1, 1));
        this.$form = $('<form/>', { id: 'form1', action: '#' });
        this.$form.submit(event => {
          event.preventDefault();
          if (this.playing) {
            this.setCurrentCell(this.currentCell);
          }
        });

        this.$textField = $('<input/>', { type: 'text', size: 200 }).css(abcB.style.getCSS()).css({
          position: 'absolute', top: 0, left: 0,
          border: 0, padding: 0, margin: 0,
          'text-align': 'center'
        });

        this.$div.append(this.$form.append(this.$textField));
        this.bgA.setContent(abcA, solved || null);
        this.bgA.setDefaultIdAss();
        if (this.$animatedBg)
          this.bgA.setCellAttr('tmpTrans', true);

        this.act.nonAssignedCells = 0;
        for (let i = 0; i < this.bgA.getNumCells(); i++) {
          var bx = this.bgA.getActiveBox(i);
          if (bx.idAss === -1) {
            this.act.nonAssignedCells++;
            bx.switchToAlt(this.ps);
          }
        }
        this.bgA.setVisible(true);
        this.bgB.setVisible(false);
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
        if (this.act.scramble.primary)
          this.shuffle([this.bgA], true, true);

        if (this.useOrder)
          this.currentItem = this.bgA.getNextItem(-1);

        this.setAndPlayMsg('initial', 'start');
        this.invalidate().update();
        this.playing = true;
      }
    }

    /**
     * Called by [JClicPlayer](JClicPlayer.html) when this activity panel is fully visible, just
     * after the initialization process.
     * @override
     */
    activityReady() {
      super.activityReady();
      this.setCurrentCell(0);
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
      if (this.bgA && this.$canvas) {
        const
          canvas = this.$canvas.get(-1),
          ctx = canvas.getContext('2d');
        if (!dirtyRegion)
          dirtyRegion = new AWT.Rectangle(0, 0, canvas.width, canvas.height);
        ctx.clearRect(dirtyRegion.pos.x, dirtyRegion.pos.y, dirtyRegion.dim.width, dirtyRegion.dim.height);
        this.bgA.update(ctx, dirtyRegion);
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
      return (!this.bgA || !this.bgB || this.getBounds().equals(preferredMaxSize)) ?
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
        const r = rect.clone();
        if (this.act.boxGridPos === 'AUB')
          r.height -= this.bgB.pos.y + this.act.margin / 2;
        else if (this.act.boxGridPos === 'AB')
          r.width -= this.bgB.pos.x + this.act.margin / 2;

        // Create the main canvas
        this.$canvas = $('<canvas width="' + r.dim.width + '" height="' + r.dim.height + '"/>').css({
          position: 'absolute',
          top: 0,
          left: 0
        });

        // Resize animated gif background
        if (this.bgA && this.$animatedBg) {
          var bgRect = this.bgA.getBounds();
          this.$animatedBg.css({
            left: bgRect.pos.x,
            top: bgRect.pos.y,
            width: bgRect.dim.width + 'px',
            height: bgRect.dim.height + 'px',
            'background-size': bgRect.dim.width + 'px ' + bgRect.dim.height + 'px'
          });
          this.$canvas.insertAfter(this.$animatedBg);
        } else
          this.$div.prepend(this.$canvas);

        if (this.$textField) {
          this.$textField.css({
            top: this.bgB.pos.y,
            left: this.bgB.pos.x,
            width: this.bgB.dim.width,
            height: this.bgB.dim.height,
            zIndex: 9
          });
        }
        // Repaint all
        this.invalidate().update();
      }
    }

    /**
     * Checks if all inverse associations are done
     * @returns {boolean}
     */
    checkInvAss() {
      return this.act.invAss && this.invAssCheck && this.invAssCheck.every(chk => chk);
    }

    /**
     * Updates the currently selected cell, evaluating the answer written by the user on the text field.
     * @param {number} i - Index into the {@link ActiveBoxBag} of the cell to make active
     * @param {function[]} delayedActions - If set, store the the action in this array for future execution
     */
    setCurrentCell(i, delayedActions = null) {
      if (!this.playing)
        return;

      let
        bx = null,
        m = false;

      if (this.currentCell !== -1) {
        let ok = false;
        bx = this.bgA ? this.bgA.getActiveBoxWithIdLoc(this.currentCell) : null;
        if (bx) {
          bx.setMarked(false);
          const
            src = bx.getDescription(),
            id = bx.idAss,
            txCheck = id >= 0 ? this.act.abc['answers'].getActiveBoxContent(id).text : '',
            txAnswer = this.$textField.val().trim();
          if (Utils.compareMultipleOptions(txAnswer, txCheck, false, this.act.numericContent)) {
            ok = true;
            bx.idAss = -1;
            // When in multiple-answer, fill-in textField with the first valid option:
            const p = txCheck.indexOf('|');
            if (p >= 0)
              this.$textField.val(txCheck.substring(0, p));

            if (this.act.abc['solvedPrimary']) {
              bx.switchToAlt(this.ps);
              m = bx.playMedia(this.ps, delayedActions);
            } else
              bx.clear();
            if (this.act.invAss && id >= 0 && id < this.invAssCheck.length) {
              this.invAssCheck[id] = true;
            }
            if (this.act.useOrder)
              this.currentItem = this.bgA.getNextItem(this.currentItem);
          }

          const cellsPlaced = this.bgA.countCellsWithIdAss(-1);
          if (txAnswer.length > 0) {
            this.ps.reportNewAction(this.act, 'WRITE', src, txAnswer, ok, cellsPlaced);
          }
          if (ok && (this.checkInvAss() || cellsPlaced === this.bgA.getNumCells())) {
            this.finishActivity(true);
            this.$textField.prop('disabled', true);
            this.invalidate().update();
            return;
          } else if (!m && txAnswer.length > 0)
            this.playEvent(ok ? 'actionOk' : 'actionError');
        }
      }

      bx = this.bgA ?
        this.act.useOrder ?
          this.bgA.getBox(this.currentItem) :
          this.bgA.getActiveBoxWithIdLoc(i) :
        null;

      if (this.bgA && (!bx || bx.idAss === -1)) {
        for (var j = 0; j < this.bgA.getNumCells(); j++) {
          bx = this.bgA.getActiveBoxWithIdLoc(j);
          if (bx.idAss !== -1)
            break;
        }
        if (bx && bx.idAss === -1) {
          this.finishActivity(false);
          this.$textField.prop('disabled', true);
          this.invalidate().update();
          return;
        }
      }
      // Draw border only if it has more than one cell
      if (bx && this.bgA && this.bgA.getNumCells() > 1)
        bx.setMarked(true);
      if (bx)
        this.currentCell = bx.idLoc;
      this.$textField.val('');
      this.$textField.focus();
      this.invalidate().update();
      if (bx)
        bx.playMedia(this.ps, delayedActions);
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
        // Array to be filled with actions to be executed at the end of event processing
        const delayedActions = [];
        switch (event.type) {
          case 'click':
            event.preventDefault();
            this.ps.stopMedia(1);
            const p = new AWT.Point(
              event.pageX - this.$div.offset().left,
              event.pageY - this.$div.offset().top);

            // Avoid clicks on the text field
            if (this.bgB.contains(p)) {
              this.$textField.focus();
              break;
            }

            const bx = this.bgA ? this.bgA.findActiveBox(p) : null;
            if (bx && !bx.isInactive()) {
              if (bx.getContent() && bx.getContent().mediaContent === null)
                this.playEvent('CLICK');
              this.setCurrentCell(bx.idLoc, delayedActions);
            }
            break;

          case 'change':
            event.preventDefault();
            this.setCurrentCell(this.currentCell, delayedActions);
            break;
        }
        delayedActions.forEach(action => action());
        return false;
      }
    }
  }

  Object.assign(WrittenAnswerPanel.prototype, {
    /**
     * The input text field where users write the answers
     * @name WrittenAnswerPanel#$textField
     * @type {external:jQuery} */
    $textField: null,
    /**
     * Array for storing checked associations
     * @name WrittenAnswerPanel#invAssCheck
     * @type {boolean[]} */
    invAssCheck: null,
    /**
     * The {@link ActiveBoxBag} object containing the questions
     * @name WrittenAnswerPanel#bgA
     * @type {ActiveBoxBag} */
    bgA: null,
    /**
     * An optional {@link ActiveBoxBag} with content displayed as cells are solved.
     * @name WrittenAnswerPanel#bgB
     * @type {ActiveBoxBag} */
    bgB: null,
    /**
     * The currently selected cell
     * @name WrittenAnswerPanel#currentCell
     * @type {number} */
    currentCell: -1,
    /**
     * Mouse events intercepted by this panel
     * @override
     * @name WrittenAnswerPanel#events
     * @type {string[]} */
    events: ['click', 'change'],
  });

  /**
   * Panel class associated to this type of activity: {@link WrittenAnswerPanel}
   * @type {class} */
  WrittenAnswer.Panel = WrittenAnswerPanel;

  // Register class in Activity.prototype
  Activity.CLASSES['@text.WrittenAnswer'] = WrittenAnswer;

  return WrittenAnswer;
});
