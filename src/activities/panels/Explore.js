//    File    : Explore.js  
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
  "../../shapers/Rectangular"
], function ($, Activity, ActiveBoxGrid, BoxBag, AWT, Rectangular) {

  //
  // This class of [Activity](Activity.html) just shows a panel with [ActiveBox](ActiveBox.html)
  // objects.
  var Explore = function (project) {
    Activity.call(this, project);
  };

  Explore.prototype = {
    constructor: Explore,
    //
    // Activities of this type never end, so automatic sequences must pause here
    mustPauseSequence: function () {
      return true;
    },
    // 
    // Retrieves the minimum number of actions needed to solve this activity
    getMinNumActions: function () {
      return 0;
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
  // InformationScreen extends Activity
  Explore.prototype = $.extend(Object.create(Activity.prototype), Explore.prototype);

  // 
  // Properties and methods specific to InformationScreen.Panel
  var ActPanelAncestor = Activity.prototype.Panel.prototype;
  Explore.prototype.Panel.prototype = {
    constructor: Explore.prototype.Panel,
    //
    // The [ActiveBoxBag](ActiveBoxBag.html) objects containing the information to be displayed.
    bgA: null,
    bgB: null,
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
      var abcB = this.act.abc['secondary'];

      if (abcA && abcB) {

        if (abcA.imgName)
          abcA.setImgContent(this.act.project.mediaBag, null, false);

        if (abcB.imgName)
          abcB.setImgContent(this.act.project.mediaBag, null, false);

        if (this.act.acp !== null)
          this.act.acp.generateContent(abcA.nch, abcA.ncw, [abcA, abcB], false);

        this.bgA = ActiveBoxGrid.createEmptyGrid(null, this, this.act.margin, this.act.margin, abcA);
        var w = abcB.w;
        if (this.act.boxGridPos === 'AUB' || this.act.boxGridPos === 'BUA')
          w = abcA.getTotalWidth();
        this.bgB = new ActiveBoxGrid(null, this, abcB.bb, this.act.margin, this.act.margin, w, abcB.h, new Rectangular(1, 1));

        this.bgA.setContent(abcA);
        this.bgA.setDefaultIdAss();
        this.bgB.getActiveBox(0).setInactive(false);
        this.bgA.setVisible(true);
        this.bgB.setVisible(true);
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
      if (this.bgA && this.bgB && this.$canvas) {
        var canvas = this.$canvas.get(0);
        var ctx = canvas.getContext('2d');
        if (!dirtyRegion)
          dirtyRegion = new AWT.Rectangle(0, 0, canvas.width, canvas.height);
        ctx.clearRect(dirtyRegion.pos.x, dirtyRegion.pos.y, dirtyRegion.dim.width, dirtyRegion.dim.height);
        this.bgA.update(ctx, dirtyRegion, this);
        this.bgB.update(ctx, dirtyRegion, this);
      }
      return this;
    },
    //
    // Calculates the optimal dimension of this panel
    setDimension: function (preferredMaxSize) {
      if (!this.bgA || !this.bgB || this.getBounds().equals(preferredMaxSize))
        return preferredMaxSize;
      return BoxBag.layoutDouble(preferredMaxSize, this.bgA, this.bgB, this.act.boxGridPos, this.act.margin);
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

        // Repaint all
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
          case 'click':
            this.ps.stopMedia(1);
            bx1 = this.bgA.findActiveBox(p);
            if (bx1) {
              bx2 = this.bgB.getActiveBox(0);
              if (bx1.idAss !== -1 && (!this.act.useOrder || bx1.idOrder === this.currentItem)) {
                bx2.setContent(this.act.abc['secondary'], bx1.idAss);
                if (!bx2.playMedia(this.ps) && !bx1.playMedia(this.ps))
                  this.playEvent('CLICK');
                if (this.act.useOrder)
                  this.currentItem = this.bgA.getNextItem(this.currentItem);
                this.ps.reportNewAction(this.act, 'SELECT', bx1.getDescription(), bx2.getDescription(), true, 0);
              }
              else {
                bx2.clear();
                bx2.setInactive(false);
              }
              this.update();
            }
            break;
        }
        event.preventDefault();
      }
    }
  };

  // Explore.Panel extends Activity.Panel
  Explore.prototype.Panel.prototype = $.extend(
      Object.create(ActPanelAncestor),
      Explore.prototype.Panel.prototype);

  // 
  // Register class in Activity.prototype
  Activity.CLASSES['@panels.Explore'] = Explore;

  return Explore;

});
