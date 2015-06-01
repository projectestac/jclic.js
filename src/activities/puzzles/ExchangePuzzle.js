//    File    : ExchangePuzzle.js  
//    Created : 30/05/2015  
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
  var ExchangePuzzle = function (project) {
    Activity.call(this, project);
  };

  ExchangePuzzle.prototype = {
    constructor: ExchangePuzzle,
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
      //this.bc = new BoxConnector(this);
    }
  };

  // 
  // InformationScreen extends Activity
  ExchangePuzzle.prototype = $.extend(Object.create(Activity.prototype), ExchangePuzzle.prototype);

  // 
  // Properties and methods specific to InformationScreen.Panel
  var ActPanelAncestor = Activity.prototype.Panel.prototype;
  ExchangePuzzle.prototype.Panel.prototype = {
    constructor: ExchangePuzzle.prototype.Panel,
    //
    // The [ActiveBoxBag](ActiveBoxBag.html) object containing the information to be displayed.
    bg: null,
    //
    // The [BoxConnector](BoxConnector.html) obect
    bc: null,
    //
    // Possible events are: 'keydown', 'keyup', 'keypress', 'mousedown', 'mouseup', 'click',
    // 'dblclick', 'mousemove', 'mouseenter', 'mouseleave', 'mouseover', 'mouseout'
    events: ['mousedown', 'mouseup', 'mousemove'],
    //
    // Clears the realized objects
    clear: function () {
      if (this.bg) {
        this.bg.end();
        this.bg = null;
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

        this.bg = ActiveBoxGrid.prototype._createEmptyGrid(null, this, this.act.margin, this.act.margin, abc);
        this.bg.setContent(abc);
        this.bg.setVisible(true);
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
        this.shuffle([this.bg], true, true);
        if (this.useOrder)
          this.currentItem = this.bg.getNextItem(-1);
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
      if (this.bg && this.$canvas) {
        var canvas = this.$canvas.get(0);
        var ctx = canvas.getContext('2d');
        if (!dirtyRegion)
          dirtyRegion = new AWT.Rectangle(0, 0, canvas.width, canvas.height);
        ctx.clearRect(dirtyRegion.pos.x, dirtyRegion.pos.y, dirtyRegion.dim.width, dirtyRegion.dim.height);
        this.bg.update(ctx, dirtyRegion, this);
      }
      return this;
    },
    //
    // Calculates the optimal dimension of this panel
    setDimension: function (preferredMaxSize) {
      if (!this.bg || this.getBounds().equals(preferredMaxSize))
        return preferredMaxSize;
      return BoxBag.prototype._layoutSingle(preferredMaxSize, this.bg, this.act.margin);
    },
    //
    // Sets the size and position of this activity panel
    setBounds: function (rect) {
      this.$div.empty();
      ActPanelAncestor.setBounds.call(this, rect);
      if (this.bg) {
        // Create the main canvas
        this.$canvas = $('<canvas width="' + rect.dim.width + '" height="' + rect.dim.height + '"/>').css({
          position: 'absolute',
          top: 0,
          left: 0
        });
        this.$div.append(this.$canvas);
        // 
        // Add a canvas layer for the BoxConnector
        this.$bcCanvas = $('<canvas width="' + rect.dim.width + '" height="' + rect.dim.height + '"/>').css({
          position: 'absolute',
          top: 0,
          left: 0
        });
        this.$div.append(this.$bcCanvas);
        this.bc = new BoxConnector(this, this.$bcCanvas.get(0).getContext('2d'));

        this.invalidate().update();
      }
    },
    // 
    // Main handler to receive mouse and key events
    // Overrides same function in Activity.Panel
    processEvent: function (event) {
      if (this.bc && this.playing) {

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
                bx1 = this.bg.findActiveBox(this.bc.origin);
              this.bc.end();
              bx2 = this.bg.findActiveBox(p);
              if (bx1 && bx2) {
                var ok = false;
                var src = bx1.getDescription() + " (" + bx1.idOrder + ")";
                var dest = "(" + bx2.idLoc + ")";
                ok=(bx1.idOrder===bx2.idLoc);
                bx1.exchangeLocation(bx2);
                var cellsAtPlace = this.bg.countCellsAtEquivalentPlace(true);
                this.ps.reportNewAction(this.act, 'PLACE', src, dest, ok, cellsAtPlace);
                if (ok && cellsAtPlace === this.bg.getNumCells())
                  this.finishActivity(true);
                else
                  this.playEvent(ok ? 'actionOk' : 'actionError');
              }
              this.update();
            }
            else {
              bx1 = this.bg.findActiveBox(p);
              if (bx1) {
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
  ExchangePuzzle.prototype.Panel.prototype = $.extend(
      Object.create(ActPanelAncestor),
      ExchangePuzzle.prototype.Panel.prototype);

  // 
  // Register class in Activity.prototype
  Activity.prototype._CLASSES['@puzzles.ExchangePuzzle'] = ExchangePuzzle;

  return ExchangePuzzle;

});


