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
  "../../AWT"
], function ($, Activity, ActiveBoxGrid, BoxBag, AWT) {

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
      //TODO: Build the BoxConnector object

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
        if(!dirtyRegion)
          dirtyRegion = new AWT.Rectangle(0, 0, canvas.width, canvas.height);
        ctx.clearRect(dirtyRegion.pos.x, dirtyRegion.pos.y, dirtyRegion.dim.width, dirtyRegion.dim.height);
        this.bgA.update(ctx, dirtyRegion, this);
        this.bgB.update(ctx, dirtyRegion, this);
        if (this.bc && this.bc.active)
          this.bc.update(ctx, dirtyRegion, this);
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
        this.$canvas = $('<canvas width="' + rect.dim.width + '" height="' + rect.dim.height + '"/>');
        this.$div.append(this.$canvas);
        this.invalidate().update();
      }
    },
    // 
    // Main handler to receive mouse and key events
    // Overrides same function in Activity.Panel
    processEvent: function (event) {
      if (this.playing) {
        var p = new AWT.Point(
            event.pageX - this.$div.offset().left,
            event.pageY - this.$div.offset().top);
        this.ps.stopMedia(1);
        var bx = this.bgA.findActiveBox(p);
        if (!bx)
          bx = this.bgB.findActiveBox(p);
        if (bx) {
          if (!bx.playMedia(this.ps))
            this.playEvent('click');
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
