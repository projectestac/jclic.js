//    File    : HolePuzzle.js  
//    Created : 01/06/2015  
//    By      : francesc  
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
  "../../AWT",
  "../../shapers/Rectangular"
], function ($, Activity, ActiveBoxGrid, BoxBag, BoxConnector, AWT, Rectangular) {

  //
  // This class of [Activity](Activity.html) just shows a panel with [ActiveBox](ActiveBox.html)
  // objects.
  var HolePuzzle = function (project) {
    Activity.call(this, project);
  };

  HolePuzzle.prototype = {
    constructor: HolePuzzle,
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
    }
  };

  // 
  // InformationScreen extends Activity
  HolePuzzle.prototype = $.extend(Object.create(Activity.prototype), HolePuzzle.prototype);

  //
  // Activity.Panel constructor
  HolePuzzle.Panel = function (act, ps, $div) {
    Activity.Panel.call(this, act, ps, $div);
  };

  // 
  // Properties and methods specific to InformationScreen.Panel
  var ActPanelAncestor = Activity.Panel.prototype;
  HolePuzzle.Panel.prototype = {
    constructor: HolePuzzle.Panel,
    //
    // The [ActiveBoxGrid](ActiveBoxGrid.html) object containing the information to be displayed.
    bg: null,
    // An auxiliar [ActiveBoxGrid](ActiveBoxGrid.html) with only one box, used to store the
    // "missing piece" of the puzzle.
    parkBg: null,
    //
    // The hidden cell and its index on the ActiveBagContent
    hiddenBox: null,
    hiddenBoxIndex: -1,
    //
    // Mouse and touch events intercepted by this panel
    events: ['click'],
    //
    // Clears the realized objects
    clear: function () {
      if (this.bg) {
        this.bg.end();
        this.bg = null;
      }
      if (this.parkBg) {
        this.parkBg.end();
        this.parkBg = null;
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
          this.act.acp.generateContent(abc.nch, abc.ncw, [abc], false);

        this.bg = ActiveBoxGrid.createEmptyGrid(null, this, this.act.margin, this.act.margin, abc);
        this.bg.setContent(abc);
        this.bg.setVisible(true);

        this.hiddenBoxIndex = Math.floor(Math.random() * this.bg.getNumCells());
        this.hiddenBox = this.bg.getActiveBox(this.hiddenBoxIndex);
        this.hiddenBox.setVisible(false);
        this.parkBg = new ActiveBoxGrid(null, this, abc.bb, this.act.margin, this.act.margin,
            this.hiddenBox.dim.width, this.hiddenBox.dim.height, new Rectangular(1, 1));
        this.parkBg.setContent(abc, null, this.hiddenBoxIndex, 0, 1);
        this.parkBg.setBorder(this.bg.hasBorder());
        this.parkBg.setVisible(true);
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
      if (this.bg) {
        // 
        // This activity has an special shuffle method. Cells can move only to places near the 'hole'
        if (this.act.shuffles % 2 !== 1)
          this.act.shuffles++;
        for (var i = 0; i < this.act.shuffles; i++) {
          var pth = this.bg.getCoord(this.hiddenBox);
          var v = (Math.floor(Math.random() * 2)) === 0 ? 1 : -1;

          if ((Math.floor(Math.random() * 2)) === 0) {
            pth.x += v;
            if (pth.x < 0 || pth.x >= this.bg.nCols)
              pth.x -= 2 * v;
          } else {
            pth.y += v;
            if (pth.y < 0 || pth.y >= this.bg.nRows)
              pth.y -= 2 * v;
          }
          var dstBx = this.bg.getActiveBoxWithIdLoc(pth.y * this.bg.nCols + pth.x);
          if (dstBx !== null)
            this.hiddenBox.exchangeLocation(dstBx);
        }
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
      ActPanelAncestor.updateContent.call(this, dirtyRegion);
      if (this.bg && this.parkBg && this.$canvas) {
        var canvas = this.$canvas.get(0);
        var ctx = canvas.getContext('2d');
        if (!dirtyRegion)
          dirtyRegion = new AWT.Rectangle(0, 0, canvas.width, canvas.height);
        ctx.clearRect(dirtyRegion.pos.x, dirtyRegion.pos.y, dirtyRegion.dim.width, dirtyRegion.dim.height);
        this.bg.update(ctx, dirtyRegion, this);
        this.parkBg.update(ctx, dirtyRegion, this);
      }
      return this;
    },
    //
    // Calculates the optimal dimension of this panel
    setDimension: function (preferredMaxSize) {
      if (!this.bg || !this.parkBg || this.getBounds().equals(preferredMaxSize))
        return preferredMaxSize;
      return BoxBag.layoutDouble(preferredMaxSize, this.bg, this.parkBg, this.act.boxGridPos, this.act.margin);
    },
    //
    // Sets the size and position of this activity panel
    setBounds: function (rect) {
      this.$div.empty();
      ActPanelAncestor.setBounds.call(this, rect);
      if (this.bg && this.parkBg) {
        // Create the main canvas
        this.$canvas = $('<canvas width="' + rect.dim.width + '" height="' + rect.dim.height + '"/>').css({
          position: 'absolute',
          top: 0,
          left: 0
        });
        this.$div.append(this.$canvas);

        // Repaint all
        this.invalidate().update();
      }
    },
    // 
    // Main handler to receive mouse and key events
    // Overrides same function in Activity.Panel
    processEvent: function (event) {
      if (this.playing) {
        var bx;
        var p = new AWT.Point(
            event.pageX - this.$div.offset().left,
            event.pageY - this.$div.offset().top);

        switch (event.type) {
          case 'click':
            this.ps.stopMedia(1);
            // Find the box behind the clicked point
            bx = this.bg.findActiveBox(p);
            if (bx) {
              if (bx.isVisible()) {
                // Check if it's a valid move
                var pt = this.bg.getCoordDist(bx, this.hiddenBox);
                if (Math.abs(pt.x) + Math.abs(pt.y) === 1) {
                  // Ok, the cell is adjacent to the hole. Complete the move.
                  var m = bx.playMedia(this.ps);
                  var src = bx.getDescription() + '(' + bx.idOrder + ')';
                  var dest = '(' + this.hiddenBox.idLoc + ')';
                  bx.exchangeLocation(this.hiddenBox);
                  var ok = (bx.idOrder === bx.idLoc);
                  // Check results and notify action
                  var cellsAtPlace = this.bg.countCellsAtEquivalentPlace(true);
                  this.ps.reportNewAction(this.act, 'SELECT', src, dest, ok, cellsAtPlace);
                  if (ok && cellsAtPlace === this.bg.getNumCells()) {
                    // Activity completed!
                    this.hiddenBox.setVisible(true);
                    this.parkBg.setVisible(false);
                    this.finishActivity(true);
                  }
                  else
                  if (!m)
                    this.playEvent('click');
                }
                this.update();
              }
              else {
                this.playEvent('actionError');
              }
            }
            break;
        }
        event.preventDefault();
      }
    }
  };

  // HolePuzzle.Panel extends Activity.Panel
  HolePuzzle.Panel.prototype = $.extend(Object.create(ActPanelAncestor), HolePuzzle.Panel.prototype);

  // 
  // Register class in Activity.prototype
  Activity.CLASSES['@puzzles.HolePuzzle'] = HolePuzzle;

  return HolePuzzle;

});
