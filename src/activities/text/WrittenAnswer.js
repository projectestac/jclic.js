//    File    : WrittenAnswer.js  
//    Created : 04/06/2015  
//    By      : fbusquet  
//
//    JClic.js  
//    HTML5 player of [JClic](http://clic.xtec.cat) activities  
//    https://github.com/projectestac/jclic.js  
//    (c) 2000-2015 Catalan Educational Telematic Network (XTEC)  
//    This program is free software: you can redistribute it and/or modify it under the terms of
//    the GNU General Public License as published by the Free Software Foundation, version. This
//    program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without
//    even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
//    General Public License for more details. You should have received a copy of the GNU General
//    Public License along with this program. If not, see [http://www.gnu.org/licenses/].  


define([
  "jquery",
  "../../Activity",
  "../../boxes/ActiveBoxGrid",
  "../../boxes/BoxBag",
  "../../AWT",
  "../../Utils",
  "../../shapers/Rectangular"
], function ($, Activity, ActiveBoxGrid, BoxBag, AWT, Utils, Rectangular) {

  //
  // This class of [Activity](Activity.html) just shows a panel with [ActiveBox](ActiveBox.html)
  // objects.
  var WrittenAnswer = function (project) {
    Activity.call(this, project);
  };

  WrittenAnswer.prototype = {
    constructor: WrittenAnswer,
    //
    // Number of unassigned cells
    nonAssignedCells: 0,
    //
    // Uses cell's `idAss` field to check if a pairing match
    useIdAss: true,
    //
    // Overrides `setProperties` in Activity
    setProperties: function ($xml) {
      Activity.prototype.setProperties.call(this, $xml);
      this.abc['primary'].avoidAllIdsNull(this.abc['answers'].getNumCells());
    },
    //
    // Retrieves the minimum number of actions needed to solve this activity
    getMinNumActions: function () {
      if (this.invAss)
        return this.abc['answers'].getNumCells();
      else
        return this.abc['primary'].getNumCells() - this.nonAssignedCells;
    },
    //
    // The activity uses random to scramble internal components
    hasRandom: function () {
      return true;
    },
    //
    // The activity uses the keyboard
    needsKeyboard: function () {
      return true;
    },
    //
    // The activity permits the user to display the solution
    helpSolutionAllowed: function () {
      return true;
    },
    //
    // Activity.Panel constructor
    Panel: function (act, ps, $div) {
      Activity.prototype.Panel.call(this, act, ps, $div);
    }
  };

  // 
  // InformationScreen extends Activity
  WrittenAnswer.prototype = $.extend(Object.create(Activity.prototype), WrittenAnswer.prototype);

  // 
  // Properties and methods specific to InformationScreen.Panel
  var ActPanelAncestor = Activity.prototype.Panel.prototype;
  WrittenAnswer.prototype.Panel.prototype = {
    constructor: WrittenAnswer.prototype.Panel,
    //
    // The input text field where users write the answers
    $textField: null,
    //
    // Array for storing checked associations
    invAssCheck: null,
    //
    // The [ActiveBoxBag](ActiveBoxBag.html) object containing the questions
    bgA: null,
    bgB: null,
    //
    // The currently selected cell
    currentCell: -1,
    // 
    // Mouse events intercepted by this panel
    events: ['click'],
    //
    // Clears the realized objects
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
    // 
    // Prepares the activity panel
    buildVisualComponents: function () {

      if (this.firstRun)
        ActPanelAncestor.buildVisualComponents.call(this);

      this.clear();

      var abcA = this.act.abc['primary'];
      var abcB = this.act.abc['answers'];
      var solved = this.act.abc['solvedPrimary'];

      if (abcA && abcB) {

        if (this.act.invAss) {
          this.invAssCheck = [];
          var n = abcB.getNumCells();
          for (var i = 0; i < n; i++)
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
          this.act.acp.generateContent(
              new this.act.acp.ActiveBagContentKit(abcA.nch, abcA.ncw, contentKit, false), this.ps);
        }

        this.bgA = ActiveBoxGrid.prototype._createEmptyGrid(null, this, this.act.margin, this.act.margin, abcA);

        var w = abcB.w;
        if (this.act.boxGridPos === 'AUB' || this.act.boxGridPos === 'BUA')
          w = abcA.getTotalWidth();
        // 
        // bgB will be used only as a placeholder for `$textField`
        this.bgB = new ActiveBoxGrid(null, this, abcB.bb, this.act.margin, this.act.margin, w, abcB.h, new Rectangular(1, 1));
        this.$textField = $('<input type="text" size="200"/>').css(abcB.bb.getCSS()).css({
          position: 'absolute', top: 0, left: 0,
          border: 0, padding: 0, margin: 0,
          'text-align': 'center'
        });

        this.attachEvent(this.$textField, 'keypress');

        this.bgA.setContent(abcA, solved ? solved : null);
        this.currentCell = 0;

        this.bgA.setDefaultIdAss();

        this.act.nonAssignedCells = 0;
        var n = this.bgA.getNumCells();
        for (var i = 0; i < n; i++) {
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
    // 
    // Basic initialization procedure
    initActivity: function () {
      ActPanelAncestor.initActivity.call(this);

      if (!this.firstRun)
        this.buildVisualComponents();
      else
        this.firstRun = false;

      //this.setAndPlayMsg('main', 'start');
      if (this.bgA && this.bgB) {
        // Scramble cells
        if (this.act.scramble.primary)
          this.shuffle([this.bgA], true, true);

        if (this.useOrder)
          this.currentItem = this.bgA.getNextItem(-1);

        this.playing = true;
        this.setCurrentCell(0);
        this.invalidate().update();
      }
    },
    //
    // Overrides `Activity.Panel.updateContent`
    // Updates the graphic contents of its panel.
    // The method should be called from `Activity.Panel.update`
    // dirtyRect (AWT.Rectangle) - Specifies the area to be updated. When `null`, it's the whole panel.
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
    //
    // Calculates the optimal dimension of this panel
    setDimension: function (preferredMaxSize) {
      if (!this.bgA || !this.bgB || this.getBounds().equals(preferredMaxSize))
        return preferredMaxSize;
      return BoxBag.prototype._layoutDouble(preferredMaxSize, this.bgA, this.bgB, this.act.boxGridPos, this.act.margin);
    },
    //
    // Set the size and position of this activity panel
    setBounds: function (rect) {
      this.$div.empty();
      ActPanelAncestor.setBounds.call(this, rect);
      if (this.bgA || this.bgB) {
        // Create the main canvas
        this.$canvas = $('<canvas width="' + rect.dim.width + '" height="' + rect.dim.height + '"/>').css({
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
            height: this.bgB.dim.height
          });
          this.$div.append(this.$textField);
        }

        // Repaint all
        this.invalidate().update();
      }
    },
    // 
    // Check if all inverse associations are done
    checkInvAss: function () {
      var i;
      if (!this.act.invAss || !this.invAssCheck)
        return false;
      for (i = 0; i < this.invAssCheck.length; i++)
        if (!this.invAssCheck[i])
          break;
      return i === this.invAssCheck.length;
    },
    //
    // Changes the currently selected cell, evaluating the answer written by the user
    // i (Number)
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
        var txCheck = (id >= 0 ? this.act.abc['answers'].getActiveBoxContent(id).text : '');
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
          }
          else
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
        }
        else if (!m && txAnswer.length > 0)
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
    // 
    // Main handler to receive mouse and key events
    // Overrides same function in Activity.Panel
    processEvent: function (event) {
      if (this.playing) {
        switch (event.type) {
          case 'click':
            this.ps.stopMedia(1);
            var p = new AWT.Point(
                event.pageX - this.$div.offset().left,
                event.pageY - this.$div.offset().top);
            var bx = this.bgA.findActiveBox(p);
            if (bx) {
              if (bx.getContent() && bx.getContent().mediaContent === null)
                this.playEvent('CLICK');
              this.setCurrentCell(bx.idLoc);
            }
            break;

          case 'keypress':
            if (event.keyCode === 13 && this.currentCell !== -1) {
              event.preventDefault();
              this.setCurrentCell(this.currentCell);
            }
            break;
        }
      }
    }
  };

  // WrittenAnswer.Panel extends Activity.Panel
  WrittenAnswer.prototype.Panel.prototype = $.extend(
      Object.create(ActPanelAncestor),
      WrittenAnswer.prototype.Panel.prototype);

  // 
  // Register class in Activity.prototype
  Activity.prototype._CLASSES['@text.WrittenAnswer'] = WrittenAnswer;

  return WrittenAnswer;

});
