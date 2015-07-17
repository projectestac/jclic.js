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
  // This class of [Activity](Activity.html) shows only one panel with scrambled [ActiveBox](ActiveBox.html)
  // objects. To solve the activity, each cell must exchange its location with another one. When all cells
  // are on place, the activity is done.
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
    // Mouse and touch events intercepted by this panel
    events: ['mousedown', 'mouseup', 'mousemove', 'touchstart', 'touchend', 'touchmove', 'touchcancel'],
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
          this.act.acp.generateContent(abc.nch, abc.ncw, [abc], false);

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

        // Create a [BoxConnector](BoxConnector.html) and attach it to the canvas context        
        this.bc = new BoxConnector(this, this.$canvas.get(0).getContext('2d'));

        // Repaint all
        this.invalidate().update();
      }
    },
    // 
    // Main handler to receive mouse and key events
    // Overrides same function in Activity.Panel
    processEvent: function (event) {
      if (this.bc && this.playing) {

        // 
        // The [AWT.Point](AWT.html#Point) where the mouse or touch event has been originated
        var p = null;
        // 
        // Two [ActiveBox](ActiveBox.html) pointers used for the [BoxConnector](BoxConnector.html)
        // `origin` and `dest` points.
        var bx1, bx2;
        // 
        // _touchend_ event don't provide pageX nor pageY information
        if (event.type === 'touchend') {
          p = this.bc.active ? this.bc.dest.clone() : new AWT.Point();
        }
        else {
          // Touch events can have more than one touch, so `pageX` must be obtained from `touches[0]`
          var x = event.originalEvent.touches ? event.originalEvent.touches[0].pageX : event.pageX;
          var y = event.originalEvent.touches ? event.originalEvent.touches[0].pageY : event.pageY;
          p = new AWT.Point(x - this.$div.offset().left, y - this.$div.offset().top);
        }

        // Flag for tracking `mouseup` events
        var up = false;

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
            this.ps.stopMedia(1);
            if (!this.bc.active) {
              // New pairing starts
              //
              if (up)
                // Pairings never can start with a `mouseup` event
                break;
              // Find the ActiveBox behind the clicked point              
              bx1 = this.bg.findActiveBox(p);
              if (bx1) {
                // Start the [BoxConnector](BoxConnector.html)
                if (this.act.dragCells)
                  this.bc.begin(p, bx1);
                else
                  this.bc.begin(p);
                // Play cell media or event sound
                if (!bx1.playMedia(this.ps))
                  this.playEvent('click');
              }
            }
            else {
              // Pairing completed
              //
              // Find the active boxes behind `bc.origin` and `p`              
              if (this.act.dragCells)
                bx1 = this.bc.bx;
              else
                bx1 = this.bg.findActiveBox(this.bc.origin);
              this.bc.end();
              bx2 = this.bg.findActiveBox(p);
              //
              // Check if the pairing was OK
              if (bx1 && bx2) {
                var ok = false;
                var src = bx1.getDescription() + " (" + bx1.idOrder + ")";
                var dest = "(" + bx2.idLoc + ")";
                ok = (bx1.idOrder === bx2.idLoc);
                bx1.exchangeLocation(bx2);
                // Check results and notify action
                var cellsAtPlace = this.bg.countCellsAtEquivalentPlace(true);
                this.ps.reportNewAction(this.act, 'PLACE', src, dest, ok, cellsAtPlace);
                // End activity or play event sound
                if (ok && cellsAtPlace === this.bg.getNumCells())
                  this.finishActivity(true);
                else
                  this.playEvent(ok ? 'actionOk' : 'actionError');
              }
              this.update();
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

  // DoublePuzzle.Panel extends Activity.Panel
  ExchangePuzzle.prototype.Panel.prototype = $.extend(
      Object.create(ActPanelAncestor),
      ExchangePuzzle.prototype.Panel.prototype);

  // 
  // Register class in Activity.prototype
  Activity.prototype._CLASSES['@puzzles.ExchangePuzzle'] = ExchangePuzzle;

  return ExchangePuzzle;

});
