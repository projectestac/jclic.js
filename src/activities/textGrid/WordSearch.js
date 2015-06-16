//    File    : WordSearch.js  
//    Created : 15/06/2015  
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
  "../../boxes/TextGrid"
], function ($, Activity, ActiveBoxGrid, BoxBag, BoxConnector, AWT, TextGrid) {

  //
  // 
  var WordSearch = function (project) {
    Activity.call(this, project);
  };

  WordSearch.prototype = {
    constructor: WordSearch,
    // 
    // Retrieves the minimum number of actions needed to solve this activity
    getMinNumActions: function () {
      return this.clues.length;
    },
    //
    // The activity permits the user to display the solution
    helpSolutionAllowed: function () {
      return true;
    },
    //
    // The activity uses random to generate filling characters
    hasRandom: function () {
      return true;
    },
    //
    // Activity.Panel constructor
    Panel: function (act, ps, $div) {
      Activity.prototype.Panel.call(this, act, ps, $div);
      this.resolvedClues = [];
    }
  };

  // 
  // WordSearch extends Activity
  WordSearch.prototype = $.extend(Object.create(Activity.prototype), WordSearch.prototype);

  // 
  // Properties and methods specific to InformationScreen.Panel
  var ActPanelAncestor = Activity.prototype.Panel.prototype;
  WordSearch.prototype.Panel.prototype = {
    constructor: WordSearch.prototype.Panel,
    //
    // The [TextGrid](TextGrid.html) of this Activity.Panel
    grid: null,
    // The [ActiveBoxBag](ActiveBoxBag.html) object used to display information associated with clues.
    bgAlt: null,
    //
    // An array of boolean values indicating which clues have been found
    resolvedClues: null,
    //
    // The [BoxConnector](BoxConnector.html) obect
    bc: null,
    // 
    // Mouse and touch events intercepted by this panel
    events: ['mousedown', 'mouseup', 'mousemove', 'touchstart', 'touchend', 'touchmove', 'touchcancel'],
    //
    // Clears the realized objects
    clear: function () {
      if (this.grid) {
        this.grid.end();
        this.grid = null;
      }
      if (this.bgAlt) {
        this.bgAlt.end();
        this.bgAlt = null;
      }
    },
    // 
    // Prepares the activity panel
    buildVisualComponents: function () {

      if (this.firstRun)
        ActPanelAncestor.buildVisualComponents.call(this);

      this.clear();

      var tgc = this.act.tgc;
      var abcAlt = this.act.abc['secondary'];

      if (abcAlt) {
        if (abcAlt.imgName)
          abcAlt.setImgContent(this.act.project.mediaBag, null, false);

        if (this.act.acp !== null) {
          var contentKit = [abcAlt];
          this.act.acp.generateContent(
              new this.act.acp.ActiveBagContentKit(0, 0, contentKit, false), this.ps);
        }
      }

      if (tgc) {
        this.grid = TextGrid.prototype._createEmptyGrid(null, this, this.act.margin, this.act.margin, tgc, false);

        if (abcAlt)
          this.bgAlt = ActiveBoxGrid.prototype._createEmptyGrid(null, this, this.act.margin, this.act.margin, abcAlt);

        this.grid.setVisible(true);
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
      if (this.grid) {

        this.grid.setChars(this.act.tgc.text);
        this.grid.randomize();
        this.grid.setAllCellsAttribute(TextGrid.prototype.flags.INVERTED, false);

        for (var i = 0; i < this.act.clueItems.length; i++)
          this.resolvedClues[i] = false;

        if (this.bgAlt) {
          this.bgAlt.setContent(this.act.abc['secondary']);
          if (this.act.scramble[0]){
            var scrambleArray = [this.bgAlt];
            this.act.shuffle(scrambleArray, true, true);
          }
          this.bgAlt.setVisible(false);
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
      if (this.grid && this.$canvas) {
        var canvas = this.$canvas.get(0);
        var ctx = canvas.getContext('2d');
        if (!dirtyRegion)
          dirtyRegion = new AWT.Rectangle(0, 0, canvas.width, canvas.height);
        ctx.clearRect(dirtyRegion.pos.x, dirtyRegion.pos.y, dirtyRegion.dim.width, dirtyRegion.dim.height);
        this.grid.update(ctx, dirtyRegion, this);
        if (this.bgAlt)
          this.bgAlt.update(ctx, dirtyRegion, this);
      }
      return this;
    },
    //
    // Calculates the optimal dimension of this panel
    setDimension: function (preferredMaxSize) {
      if (!this.grid || this.getBounds().equals(preferredMaxSize))
        return preferredMaxSize;
      if (this.bgAlt)
        return BoxBag.prototype._layoutDouble(preferredMaxSize, this.grid, this.bgAlt, this.act.boxGridPos, this.act.margin);
      else
        return BoxBag.prototype._layoutSingle(preferredMaxSize, this.grid, this.act.margin);
    },
    //
    // Set the size and position of this activity panel
    setBounds: function (rect) {
      this.$div.empty();
      ActPanelAncestor.setBounds.call(this, rect);
      if (this.grid) {
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
    // 
    getCurrentScore: function () {
      var result = 0;
      if (this.act.clues)
        for (var i = 0; i < this.act.clues.length; i++)
          if (this.resolvedClues[i])
            result++;
      return result;
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
        // Flag for assuring that only one media plays per event (avoid event sounds overlapping
        // cell's media sounds)
        var m = false;

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
          case 'touchend':
          case 'touchstart':
          case 'mousedown':
            this.ps.stopMedia(1);
            if (!this.bc.active) {
              // A new word selection starts
              // 
              // Selection of words can never start with a `mouseup` event
              if (up)
                break;

              if (this.grid.contains(p)) {
                this.playEvent('click');
                this.bc.begin(p);
              }

            }
            else {
              // Word selection completed
              //
              // Find the active boxes behind `bc.origin` and `p`
              var pt1 = this.grid.getLogicalCoords(this.bc.origin);
              var pt2 = this.grid.getLogicalCoords(this.bc.dest);

              this.bc.end();

              var s = this.grid.getStringBetween(pt1.x, pt1.y, pt2.x, pt2.y);
              if (s !== null && s.length > 0) {
                var ok = false;
                for (var c = 0; c < this.act.clues.length; c++) {
                  if (s === this.act.clues[c]) {
                    ok = true;
                    break;
                  }
                }
                var repeated = this.resolvedClues[c];
                if (ok && !repeated) {
                  this.resolvedClues[c] = true;
                  this.grid.setAttributeBetween(pt1.x, pt1.y, pt2.x, pt2.y, TextGrid.prototype.flags.INVERTED, true);
                  if (this.bgAlt !== null) {
                    var k = this.act.clueItems[c];
                    if (k >= 0 && k < this.bgAlt.getNumCells()) {
                      var bx = this.bgAlt.getActiveBox(this.act.clueItems[c]);
                      if (bx) {
                        bx.setVisible(true);
                        m = bx.playMedia(this.ps);
                      }
                    }
                  }
                }
                if (!repeated) {                  
                  var r = this.getCurrentScore();
                  this.ps.reportNewAction(this.act, 'ACTION_SELECT', s, null, ok, r);
                  if (r === this.act.clues.length)
                    this.finishActivity(true);
                  else if (!m)
                    this.playEvent(ok ? 'actionOK' : 'actionError');
                  this.invalidate();
                }
                else if (!ok && !m)
                  this.playEvent('actionError');
              }
              else
                this.playEvent('actionError');

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

  // WordSearch.Panel extends Activity.Panel
  WordSearch.prototype.Panel.prototype = $.extend(
      Object.create(ActPanelAncestor),
      WordSearch.prototype.Panel.prototype);

  // 
  // Register class in Activity.prototype
  Activity.prototype._CLASSES['@textGrid.WordSearch'] = WordSearch;

  return WordSearch;

});
