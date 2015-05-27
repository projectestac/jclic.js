//    File    : DoublePuzzle.js  
//    Created : 22/05/2015  
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
  "../../boxes/BoxConnector",
  "../../AWT"
], function ($, Activity, ActiveBoxGrid, BoxBag, BoxConnector, AWT) {

  //
  // This class of [Activity](Activity.html) just shows a panel with [ActiveBox](ActiveBox.html)
  // objects.
  var DoublePuzzle = function (project) {
    Activity.call(this, project);
  };

  DoublePuzzle.prototype = {
    constructor: DoublePuzzle,
    //
    // Retrieves the minimum number of actions needed to solve this activity
    getMinNumActions: function () {
      return this.abc.primary.getNumCells();
    },
    //
    // The activity uses random to scramble internal components
    hasRandom: function () {
      return true;
    },
    //
    // The activity mut always be scrambled
    shuffleAlways: function () {
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
      this.bc = new BoxConnector(this);
    }
  };

  // 
  // InformationScreen extends Activity
  DoublePuzzle.prototype = $.extend(Object.create(Activity.prototype), DoublePuzzle.prototype);

  // 
  // Properties and methods specific to InformationScreen.Panel
  var ActPanelAncestor = Activity.prototype.Panel.prototype;
  DoublePuzzle.prototype.Panel.prototype = {
    constructor: DoublePuzzle.prototype.Panel,
    //
    // The [ActiveBoxBag](ActiveBoxBag.html) objects containing the information to be displayed.
    bgA: null,
    bgB: null,
    //
    // Possible events are: 'keydown', 'keyup', 'keypress', 'mousedown', 'mouseup', 'click',
    // 'dblclick', 'mousemove', 'mouseenter', 'mouseleave', 'mouseover', 'mouseout'
    events: ['mousedown', 'mouseup', 'mousemove'],
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

      var abc = this.act.abc['primary'];
      if (abc) {

        if (abc.imgName)
          abc.setImgContent(this.act.project.mediaBag, null, false);

        if (this.act.acp !== null)
          this.act.acp.generateContent(
              new this.act.acp.ActiveBagContentKit(abc.nch, abc.ncw, [abc], false), this.ps);

        this.bgA = ActiveBoxGrid.prototype._createEmptyGrid(null, this, this.act.margin, this.act.margin, abc);
        this.bgB = ActiveBoxGrid.prototype._createEmptyGrid(null, this, this.act.margin, this.act.margin, abc);

        this.bgA.setContent(abc);
        this.bgB.setInactive(true);

        this.bgA.setVisible(true);
        this.bgB.setVisible(true);

        var bgbA = this.bgA.getBackgroundActiveBox();
        var bgbB = this.bgB.getBackgroundActiveBox();
        if (bgbA && bgbB)
          bgbB.exchangeContent(bgbA);

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
        this.shuffle([this.bgA], true, true);
        if (this.useOrder)
          this.currentItem = this.bgA.getNextItem(-1);
        this.playing = true;
        this.invalidate().update();
      }
    },
    //
    // Overrides `Activity.Panel.updateContent`
    // Updates the graphic contents of its panel.
    // The method should be called from `Activity.Panel.update`
    // dirtyRect (AWT.Rectangle) - Specifies the area to be updated. When `null`, it's the whole panel.
    updateContent: function (dirtyRegion) {
      if (this.bgA && this.bgB && this.$canvas) {
        var canvas = this.$canvas.get(0);
        var ctx = canvas.getContext('2d');
        if (!dirtyRegion)
          dirtyRegion = new AWT.Rectangle(0, 0, canvas.width, canvas.height);
        ctx.clearRect(dirtyRegion.pos.x, dirtyRegion.pos.y, dirtyRegion.dim.width, dirtyRegion.dim.height);
        this.bgA.update(ctx, dirtyRegion, this);
        this.bgB.update(ctx, dirtyRegion, this);
        if (this.bc && this.bc.active)
          this.bc.update(ctx, dirtyRegion);
      }
      return ActPanelAncestor.updateContent.call(this, dirtyRegion);
    },
    //
    // Calculates the optimal dimension of this panel
    setDimension: function (preferredMaxSize) {
      if (!this.bgA || !this.bgB || this.getBounds().equals(preferredMaxSize))
        return preferredMaxSize;
      return BoxBag.prototype._layoutDouble(preferredMaxSize, this.bgA, this.bgB, this.act.boxGridPos, this.act.margin);
    },
    //
    // Sets the size and position of this activity panel
    setBounds: function (rect) {
      this.$div.empty();
      ActPanelAncestor.setBounds.call(this, rect);
      if (this.bgA || this.bgB) {
        this.$canvas = $('<canvas width="' + rect.dim.width + '" height="' + rect.dim.height + '"/>').css({
          position: 'absolute',
          top: 0,
          left: 0
        });
        this.$div.append(this.$canvas);
        // Create an additional Canvas for the BoxConnector
        /*
        this.$bcCanvas = $('<canvas width="' + rect.dim.width + '" height="' + rect.dim.height + '"/>').css({
          position: 'absolute',
          top: 0,
          left: 0
        });
        this.$div.append(this.$bcCanvas);
        this.bc.ctx = this.$bcCanvas.get(0).getContext('2d');
        */

        this.invalidate().update();
      }
    },
    // 
    // Main handler to receive mouse and key events
    // Overrides same function in Activity.Panel
    processEvent: function (event) {
      if (this.playing) {

        var bx1, bx2;
        var p = new AWT.Point(
            event.pageX - this.$div.offset().left,
            event.pageY - this.$div.offset().top);

        switch (event.type) {
          case 'mousedown':
            this.ps.stopMedia(1);
            if (this.bc.active) {
              if (this.act.dragCells)
                bx1 = this.bc.bx;
              else
                bx1 = this.bgA.findActiveBox(this.bc.origin);
              this.bc.end();
              bx2 = this.bgB.findActiveBox(p);
              if (bx1 && bx2 && bx2.isInactive()) {
                var ok = false;
                var src = bx1.getDescription() + " (" + bx1.idOrder + ")";
                var dest = "(" + bx2.idOrder + ")";
                if (bx1.getContent().isEquivalent(this.act.abc['primary'].getActiveBoxContent(bx2.idOrder), true)) {
                  ok = true;
                  bx1.exchangeContent(bx2);
                  bx1.setVisible(false);
                  if (this.act.useOrder)
                    this.currentItem = this.bgA.getNextItem(this.currentItem);
                }
                var cellsAtPlace = this.bgA.countInactiveCells();
                this.ps.reportNewAction(this.act, 'PLACE', src, dest, ok, cellsAtPlace);
                if (ok && cellsAtPlace === this.bgA.getNumCells())
                  this.finishActivity(true);
                else
                  this.playEvent(ok ? 'actionOk' : 'actionError');
              }
              this.update();
            }
            else {
              bx1 = this.bgA.findActiveBox(p);
              if (bx1 && !bx1.isInactive() && (!this.act.useOrder || bx1.idOrder === this.currentItem)) {
                if (this.act.dragCells)
                  this.bc.begin(p, bx1);
                else
                  this.bc.begin(p);
                if (!bx1.playMedia(this.ps))
                  this.playEvent('click');
              }
            }
            break;

          case 'mousemove':
            this.bc.moveTo(p);
            break;
        }
      }
    }
  };

  // DoublePuzzle.Panel extends Activity.Panel
  DoublePuzzle.prototype.Panel.prototype = $.extend(
      Object.create(ActPanelAncestor),
      DoublePuzzle.prototype.Panel.prototype);

  // 
  // Register class in Activity.prototype
  Activity.prototype._CLASSES['@puzzles.DoublePuzzle'] = DoublePuzzle;

  return DoublePuzzle;

});
