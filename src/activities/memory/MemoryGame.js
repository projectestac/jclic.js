//    File    : MemoryGame.js  
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
  "../../boxes/BoxConnector",
  "../../AWT",
  "../../shapers/Rectangular"
], function ($, Activity, ActiveBoxGrid, BoxBag, BoxConnector, AWT, Rectangular) {

  //
  // This class of [Activity](Activity.html) shows a panel with duplicate [ActiveBox](ActiveBox.html)
  // objects initially hidden and scrambled. To complete the activity, all the pairs of objects must
  // be find. Only two objects are revealed in every move, so you must remember the content of each
  // cell.
  // The pairs of cells can have identical content, defined in the `primary` [ActiveBagContent](ActiveBagContent.html)
  // of the activity, or two different contents. In this case, the `secondary`
  // bag will contain the content related to each `primary` element.
  var MemoryGame = function (project) {
    Activity.call(this, project);
  };

  MemoryGame.prototype = {
    constructor: MemoryGame,
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
    }
  };

  // 
  // InformationScreen extends Activity
  MemoryGame.prototype = $.extend(Object.create(Activity.prototype), MemoryGame.prototype);
  
      //
    // Activity.Panel constructor
  MemoryGame.Panel=function (act, ps, $div) {
      Activity.Panel.call(this, act, ps, $div);
    };

  // 
  // Properties and methods specific to InformationScreen.Panel
  var ActPanelAncestor = Activity.Panel.prototype;
  
  MemoryGame.Panel.prototype = {
    constructor: MemoryGame.Panel,
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

      var abcA = this.act.abc['primary'];
      var abcB = this.act.abc['secondary'];

      if (abcA) {

        if (abcA.imgName)
          abcA.setImgContent(this.act.project.mediaBag, null, false);
        if (abcB && abcB.imgName)
          abcB.setImgContent(this.act.project.mediaBag, null, false);


        if (this.act.acp !== null) {
          var contentKit = [abcA];
          if (abcB)
            contentKit.push(abcB);
          this.act.acp.generateContent(abcA.nch, abcA.ncw, contentKit, false);
        }

        var ncw = abcA.ncw;
        var nch = abcA.nch;
        if (this.act.boxGridPos === 'AB' || this.act.boxGridPos === 'BA')
          ncw *= 2;
        else
          nch *= 2;

        this.bg = new ActiveBoxGrid(null, this, abcA.bb,
            this.act.margin, this.act.margin,
            abcA.w * ncw, abcA.h * nch, new Rectangular(ncw, nch));

        var nc = abcA.getNumCells();
        this.bg.setBorder(abcA.border);
        this.bg.setContent(abcA, null, 0, 0, nc);
        this.bg.setContent((abcB ? abcB : abcA), null, 0, nc, nc);
        for (var i = 0; i < 2; i++) {
          for (var j = 0; j < nc; j++) {
            var bx = this.bg.getActiveBox(i * nc + j);
            bx.idAss = j;
            bx.setInactive(true);
          }
        }
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
      return BoxBag.layoutSingle(preferredMaxSize, this.bg, this.act.margin);
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
          case 'touchend':
            // Don't consider drag moves below 3 pixels. Can be a "trembling click"
            if (this.bc.active && p.distanceTo(this.bc.origin) <= 3) {
              break;
            }
            up = true;
            /* falls through */
          case 'touchstart':
          case 'mousedown':
            this.ps.stopMedia(1);
            if (!this.bc.active) {
              // New pairing starts
              //
              // Pairings can never start with a `mouseup` event
              if (up)
                break;
              //
              // Find the ActiveBox behind the clicked point              
              bx1 = this.bg.findActiveBox(p);
              if (bx1 && bx1.idAss !== -1) {
                // Play cell media or event sound
                if (!bx1.playMedia(this.ps))
                  this.playEvent('click');
                bx1.setInactive(false);
                // Start the [BoxConnector](BoxConnector.html)
                this.update();
                if (this.act.dragCells)
                  this.bc.begin(p, bx1);
                else
                  this.bc.begin(p);
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
              if (bx1 && bx1.idAss !== -1 && bx2 && bx2.idAss !== -1) {
                if (bx1 !== bx2) {
                  var ok = false;
                  if (bx1.idAss === bx2.idAss ||
                      bx1.getContent().isEquivalent(bx2.getContent(), true)) {
                    ok = true;
                    bx1.idAss = -1;
                    bx1.setInactive(false);
                    bx2.idAss = -1;
                    bx2.setInactive(false);
                  }
                  else {
                    bx1.setInactive(true);
                    if (this.act.dragCells)
                      bx2.setInactive(true);
                    else {
                      bx2.setInactive(false);
                      // Start the [BoxConnector](BoxConnector.html)
                      this.update();
                      if (this.act.dragCells)
                        this.bc.begin(p, bx1);
                      else
                        this.bc.begin(p);
                    }
                  }
                  var m = bx2.playMedia(this.ps);
                  var cellsAtPlace = this.bg.countCellsWithIdAss(-1);
                  this.ps.reportNewAction(this.act, 'MATCH', bx1.getDescription(), bx2.getDescription(), ok, cellsAtPlace / 2);
                  if (ok && cellsAtPlace === this.bg.getNumCells())
                    this.finishActivity(true);
                  else if (!m)
                    this.playEvent(ok ? 'actionOk' : 'actionError');
                }
                else {
                  this.playEvent('CLICK');
                  bx1.setInactive(true);
                }
              }
              else if (bx1 !== null) {
                bx1.setInactive(true);
              }
              this.invalidate().update();
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

  // MemoryGame.Panel extends Activity.Panel
  MemoryGame.Panel.prototype = $.extend(Object.create(ActPanelAncestor), MemoryGame.Panel.prototype);

  // 
  // Register class in Activity.prototype
  Activity.CLASSES['@memory.MemoryGame'] = MemoryGame;

  return MemoryGame;

});
