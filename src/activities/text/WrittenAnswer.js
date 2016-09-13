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
   * @param {JClicProject} project - The JClic project to which this activity belongs
   */
  var WrittenAnswer = function (project) {
    Activity.call(this, project);
  };

  WrittenAnswer.prototype = {
    constructor: WrittenAnswer,
    /**
     * Number of unassigned cells
     * @type {number} */
    nonAssignedCells: 0,
    /**
     * Whether to use or not the cell's `idAss` field to check if pairings match
     * @type {boolean} */
    useIdAss: true,
    /**
     *
     * Loads this object settings from an XML element
     * @param {external:jQuery} $xml - The jQuery XML element to parse
     */
    setProperties: function ($xml) {
      Activity.prototype.setProperties.call(this, $xml);
      this.abc['primary'].avoidAllIdsNull(this.abc['answers'].getNumCells());
    },
    /**
     *
     * Retrieves the minimum number of actions needed to solve this activity
     * @returns {number}
     */
    getMinNumActions: function () {
      if (this.invAss)
        return this.abc['answers'].getNumCells();
      else
        return this.abc['primary'].getNumCells() - this.nonAssignedCells;
    },
    /**
     *
     * This activity uses random values to scramble its internal components
     * @returns {boolean}
     */
    hasRandom: function () {
      return true;
    },
    /**
     *
     * This activity makes use of the keyboard
     * @returns {boolean}
     */
    needsKeyboard: function () {
      return true;
    },
    /**
     *
     * This activity can permit the user to display the solution
     * @returns {boolean}
     */
    helpSolutionAllowed: function () {
      return true;
    }
  };

  // InformationScreen extends Activity
  WrittenAnswer.prototype = $.extend(Object.create(Activity.prototype), WrittenAnswer.prototype);

  /**
   * The {@link Activity.Panel} where written answer activities are played.
   * @class
   * @extends Activity.Panel
   * @param {Activity} act - The {@link Activity} to which this Panel belongs
   * @param {JClicPlayer} ps - Any object implementing the methods defined in the
   * [PlayStation](http://projectestac.github.io/jclic/apidoc/edu/xtec/jclic/PlayStation.html)
   * Java interface.
   * @param {external:jQuery=} $div - The jQuery DOM element where this Panel will deploy
   */
  WrittenAnswer.Panel = function (act, ps, $div) {
    Activity.Panel.call(this, act, ps, $div);
  };


  var ActPanelAncestor = Activity.Panel.prototype;

  WrittenAnswer.Panel.prototype = {
    constructor: WrittenAnswer.Panel,
    /**
     * The input text field where users write the answers
     * @type {external:jQuery} */
    $textField: null,
    /**
     * Array for storing checked associations
     * @type {boolean[]} */
    invAssCheck: null,
    /**
     * The {@link ActiveBoxBag} object containing the questions
     * @type {ActiveBoxBag} */
    bgA: null,
    /**
     * An optional {@link ActiveBoxBag} with content displayed as cells are solved.
     * @type {ActiveBoxBag} */
    bgB: null,
    /**
     * The currently selected cell
     * @type {number} */
    currentCell: -1,
    /**
     * Mouse events intercepted by this panel
     * @type {string[]} */
    events: ['click'],
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

      var n, i;

      if (this.firstRun)
        ActPanelAncestor.buildVisualComponents.call(this);

      this.clear();

      var abcA = this.act.abc['primary'];
      var abcB = this.act.abc['answers'];
      var solved = this.act.abc['solvedPrimary'];

      if (abcA && abcB) {

        if (this.act.invAss) {
          this.invAssCheck = [];
          n = abcB.getNumCells();
          for (i = 0; i < n; i++)
            this.invAssCheck[i] = false;
        }

        if (abcA.imgName)
          abcA.setImgContent(this.act.project.mediaBag, null, false);

        if (solved && solved.imgName)
          solved.setImgContent(this.act.project.mediaBag, null, false);

        if (this.act.acp !== null) {
          var contentKit = [abcA, abcB];
          if (solved)
            contentKit.push(solved);
          this.act.acp.generateContent(abcA.nch, abcA.ncw, contentKit, false);
        }

        this.bgA = ActiveBoxGrid.createEmptyGrid(null, this, this.act.margin, this.act.margin, abcA);

        var w = abcB.w;
        if (this.act.boxGridPos === 'AUB' || this.act.boxGridPos === 'BUA')
          w = abcA.getTotalWidth();
        //
        // bgB will be used only as a placeholder for `$textField`
        this.bgB = new ActiveBoxGrid(null, this, abcB.bb, this.act.margin, this.act.margin, w, abcB.h, new Rectangular(1, 1));

        this.$form = $('<form/>', {id: 'form1', action: '#'});

        var panel = this;
        this.$form.submit(function (event) {
          event.preventDefault();
          if (panel.playing) {
            panel.setCurrentCell(panel.currentCell);
          }
        });

        this.$textField = $('<input/>', {type: 'text', size: 200}).css(abcB.bb.getCSS()).css({
          position: 'absolute', top: 0, left: 0,
          border: 0, padding: 0, margin: 0,
          'text-align': 'center'
        });

        this.$form.append(this.$textField);

        this.bgA.setContent(abcA, solved ? solved : null);

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
        this.bgA.setVisible(true);
        this.bgB.setVisible(false);
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
     *
     * Called by [JClicPlayer](JClicPlayer.html) when this activity panel is fully visible, just
     * after the initialization process.
     */
    activityReady: function () {
      ActPanelAncestor.activityReady.call(this);
      this.setCurrentCell(0);
    },
    /**
     * Updates the graphic content of this panel.
     * This method will be called from {@link AWT.Container#update} when needed.
     * @param {AWT.Rectangle} dirtyRegion - Specifies the area to be updated. When `null`,
     * it's the whole panel.
     */
    updateContent: function (dirtyRegion) {
      ActPanelAncestor.updateContent.call(this, dirtyRegion);
      if (this.bgA && this.$canvas) {
        var canvas = this.$canvas.get(0);
        var ctx = canvas.getContext('2d');
        if (!dirtyRegion)
          dirtyRegion = new AWT.Rectangle(0, 0, canvas.width, canvas.height);
        ctx.clearRect(dirtyRegion.pos.x, dirtyRegion.pos.y, dirtyRegion.dim.width, dirtyRegion.dim.height);
        this.bgA.update(ctx, dirtyRegion, this);
        //this.bgB.update(ctx, dirtyRegion, this);
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
      if (this.$form)
        this.$form.detach();

      ActPanelAncestor.setBounds.call(this, rect);
      if (this.bgA || this.bgB) {
        var r = rect.clone();
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
        this.$div.append(this.$canvas);

        if (this.$textField) {
          this.$textField.css({
            top: this.bgB.pos.y,
            left: this.bgB.pos.x,
            width: this.bgB.dim.width,
            height: this.bgB.dim.height,
            zIndex: 9
          });
          this.$div.append(this.$form);
        }

        // Repaint all
        this.invalidate().update();
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
     * Changes the currently selected cell, evaluating the answer written by the user on the text field.
     * @param {number} i - Index into the {@link ActiveBoxBag} of the cell to make active
     */
    setCurrentCell: function (i) {
      var bx = null;
      var m = false;

      if (!this.playing)
        return;
      if (this.currentCell !== -1) {
        var ok = false;
        bx = this.bgA.getActiveBoxWithIdLoc(this.currentCell);
        var src = bx.getDescription();
        bx.setMarked(false);
        var id = bx.idAss;
        var txCheck = id >= 0 ? this.act.abc['answers'].getActiveBoxContent(id).text : '';
        var txAnswer = this.$textField.val().trim();
        if (Utils.compareMultipleOptions(txAnswer, txCheck, false)) {
          ok = true;
          bx.idAss = -1;
          // When in multiple-answer, fill-in textField with the first valid option:
          var p = txCheck.indexOf('|');
          if (p >= 0)
            this.$textField.val(txCheck.substring(0, p));

          if (this.act.abc['solvedPrimary']) {
            bx.switchToAlt(this.ps);
            m = bx.playMedia(this.ps);
          } else
            bx.clear();
          if (this.act.invAss && id >= 0 && id < this.invAssCheck.length) {
            this.invAssCheck[id] = true;
          }
          if (this.act.useOrder)
            this.currentItem = this.bgA.getNextItem(this.currentItem);
        }

        var cellsPlaced = this.bgA.countCellsWithIdAss(-1);

        if (txAnswer.length > 0) {
          this.ps.reportNewAction(this.act, 'WRITE', src, txAnswer, ok, cellsPlaced);
        }
        if (ok && (this.checkInvAss() || cellsPlaced === this.bgA.getNumCells())) {
          this.finishActivity(true);
          this.$textField.prop('disabled', true);
          return;
        } else if (!m && txAnswer.length > 0)
          this.playEvent(ok ? 'actionOk' : 'actionError');
      }

      if (this.act.useOrder)
        bx = this.bgA.getBox(this.currentItem);
      else
        bx = this.bgA.getActiveBoxWithIdLoc(i);
      if (!bx || bx.idAss === -1) {
        for (var j = 0; j < this.bgA.getNumCells(); j++) {
          bx = this.bgA.getActiveBoxWithIdLoc(j);
          if (bx.idAss !== -1)
            break;
        }
        if (bx && bx.idAss === -1) {
          this.finishActivity(false);
          this.$textField.prop('disabled', true);
          return;
        }
      }
      // Draw border only if it has more than one cell
      if (bx && this.bgA.getNumCells() > 1)
        bx.setMarked(true);
      if (bx)
        this.currentCell = bx.idLoc;
      this.$textField.val('');
      this.$textField.focus();

      this.invalidate().update();

      if (bx)
        bx.playMedia(this.ps);
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
        switch (event.type) {
          case 'click':
            event.preventDefault();
            this.ps.stopMedia(1);
            var p = new AWT.Point(
                event.pageX - this.$div.offset().left,
                event.pageY - this.$div.offset().top);

            // Avoid clicks on the text field
            if (this.bgB.contains(p)) {
              this.$textField.focus();
              break;
            }

            var bx = this.bgA.findActiveBox(p);
            if (bx) {
              if (bx.getContent() && bx.getContent().mediaContent === null)
                this.playEvent('CLICK');
              this.setCurrentCell(bx.idLoc);
            }
            break;

          case 'edit':
            event.preventDefault();
            this.setCurrentCell(this.currentCell);
            return false;
        }
      }
    }
  };

  // WrittenAnswer.Panel extends Activity.Panel
  WrittenAnswer.Panel.prototype = $.extend(Object.create(ActPanelAncestor), WrittenAnswer.Panel.prototype);

  // Register class in Activity.prototype
  Activity.CLASSES['@text.WrittenAnswer'] = WrittenAnswer;

  return WrittenAnswer;
});
