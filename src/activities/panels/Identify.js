//    File    : Identify.js  
//    Created : 03/06/2015  
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
  // 
  // 
  var Identify = function (project) {
    Activity.call(this, project);
    // This kind of activities are not reported
    this.includeInReports = false;
    this.reportActions = false;
  };

  Identify.prototype = {
    constructor: Identify,
    //
    // Number of not assigned cells
    // (calculed in Panel.buildVisualComponents)
    nonAssignedCells: 0,
    //
    // Number of cells to match to complete the activity
    // (calculed in Panel.buildVisualComponents)
    cellsToMatch: 1,
    //
    // Retrieves the minimum number of actions needed to solve this activity
    getMinNumActions: function () {
      return this.cellsToMatch;
    },
    //
    // The activity uses random to scramble internal components
    hasRandom: function () {
      return true;
    },
    //
    // Activity.Panel constructor
    Panel: function (act, ps, $div) {
      Activity.prototype.Panel.call(this, act, ps, $div);
    }
  };

  // 
  // Identify extends Activity
  Identify.prototype = $.extend(Object.create(Activity.prototype), Identify.prototype);

  // 
  // Properties and methods specific to InformationScreen.Panel
  var ActPanelAncestor = Activity.prototype.Panel.prototype;
  Identify.prototype.Panel.prototype = {
    constructor: Identify.prototype.Panel,
    //
    // The [ActiveBoxBag](ActiveBoxBag.html) containing the information to be displayed.
    bg: null,
    //
    // Mouse events intercepted by this panel
    events: ['click'],
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
      var solved = this.act.abc['solvedPrimary'];
      if (abc) {

        if (abc.imgName)
          abc.setImgContent(this.act.project.mediaBag, null, false);

        if (solved && solved.imgName)
          solved.setImgContent(this.act.project.mediaBag, null, false);

        if (this.act.acp !== null) {
          var contentKit = [abc];
          if (solved) {
            contentKit.push(null);
            contentKit.push(solved);
          }
          this.act.acp.generateContent(abc.nch, abc.ncw, contentKit, false);
        }
        this.bg = ActiveBoxGrid.prototype._createEmptyGrid(null, this,
            this.act.margin, this.act.margin,
            abc);
        this.bg.setContent(abc, solved ? solved : null);
        this.bg.setAlternative(false);
        this.bg.setDefaultIdAss();
        this.nonAssignedCells = 0;
        this.cellsToMatch = 0;
        var n = this.bg.getNumCells();
        for (var i = 0; i < n; i++) {
          var bx = this.bg.getActiveBox(i);
          var id = bx.idAss;
          if (id === 1)
            this.cellsToMatch++;
          else if (id === -1) {
            this.nonAssignedCells++;
            bx.switchToAlt(this.ps);
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
        if (this.act.scramble['primary'])
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
      if (this.bg && this.$canvas) {
        var canvas = this.$canvas.get(0);
        var ctx = canvas.getContext('2d');
        if (!dirtyRegion)
          dirtyRegion = new AWT.Rectangle(0, 0, canvas.width, canvas.height);
        ctx.clearRect(dirtyRegion.pos.x, dirtyRegion.pos.y, dirtyRegion.dim.width, dirtyRegion.dim.height);
        this.bg.update(ctx, dirtyRegion, this);
      }
      return ActPanelAncestor.updateContent.call(this, dirtyRegion);
    },
    //
    // Calculates the optimal dimension of this panel
    setDimension: function (preferredMaxSize) {
      if (this.getBounds().equals(preferredMaxSize))
        return preferredMaxSize;
      return BoxBag.prototype._layoutSingle(preferredMaxSize, this.bg, this.act.margin);
    },
    //
    // Sets the size and position of this activity panel
    setBounds: function (rect) {
      this.$div.empty();
      ActPanelAncestor.setBounds.call(this, rect);
      if (this.bg) {
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
        var bx;
        var m = false;
        var p = new AWT.Point(
            event.pageX - this.$div.offset().left,
            event.pageY - this.$div.offset().top);

        switch (event.type) {
          case 'click':
            this.ps.stopMedia(1);
            // Find the box behind the clicked point
            bx = this.bg.findActiveBox(p);
            if (bx) {
              if (bx.idAss !== -1) {
                // Check if it's a valid move
                var ok = false;
                var src = bx.getDescription();
                m |= bx.playMedia(this.ps);
                if (bx.idAss === 1 && (!this.act.useOrder || bx.idOrder === this.currentItem)) {
                  ok = true;
                  bx.idAss = -1;
                  if (bx.switchToAlt(this.ps))
                    m |= bx.playMedia(this.ps);
                  else
                    bx.clear();
                  if (this.act.useOrder)
                    this.currentItem = this.bg.getNextItem(this.currentItem, 1);
                }
                var cellsOk = this.bg.countCellsWithIdAss(-1);
                this.ps.reportNewAction(this.act, 'SELECT', src, null, ok, cellsOk - this.nonAssignedCells);
                if (ok && cellsOk === this.cellsToMatch + this.nonAssignedCells)
                  this.finishActivity(true);
                else if (!m)
                  this.playEvent(ok ? 'actionOk' : 'actionError');
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

  // Identify.Panel extends Activity.Panel
  Identify.prototype.Panel.prototype = $.extend(
      Object.create(ActPanelAncestor),
      Identify.prototype.Panel.prototype);

  // 
  // Register class in Activity.prototype
  Activity.prototype._CLASSES['@panels.Identify'] = Identify;

  return Identify;

});
