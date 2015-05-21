//    File    : InformationScreen.js  
//    Created : 19/05/2015  
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
  var InformationScreen = function (project) {
    Activity.call(this, project);
    // This kind of activities are not reported
    this.includeInReports = false;
    this.reportActions = false;
  };

  InformationScreen.prototype = {
    constructor: InformationScreen,
    //
    // Activity.Panel constructor
    Panel: function (act, ps, $div) {
      Activity.prototype.Panel.call(this, act, ps, $div);

    }
  };

  // 
  // InformationScreen extends Activity
  InformationScreen.prototype = $.extend(Object.create(Activity.prototype), InformationScreen.prototype);

  // 
  // Properties and methods specific to InformationScreen.Panel
  var ActPanelAncestor = Activity.prototype.Panel.prototype;
  InformationScreen.prototype.Panel.prototype = {
    constructor: InformationScreen.prototype.Panel,
    //
    // The [ActiveBoxBag](ActiveBoxBag.html) containing the information to be displayed.
    bg: null,
    // 
    // Prepares the activity panel
    buildVisualComponents: function () {

      if (this.firstRun)
        ActPanelAncestor.buildVisualComponents.call(this);

      this.clear();

      var abc = this.act.abc['primary'];
      if (abc) {
        if (this.act.acp !== null)
          this.act.acp.generateContent(
              new this.act.acp.ActiveBagContentKit(abc.nch, abc.ncw, [abc], false), this.ps);
        this.bg = ActiveBoxGrid.prototype._createEmptyGrid(null, this,
            this.act.margin, this.act.margin,
            abc);
        this.bg.setContent(abc);
        this.bg.setVisible(true);
      }
    },
    render: function (ctx, dirtyRegion) {
      if (this.bg)
        this.bg.update(ctx, dirtyRegion, this);
    },
    //
    // Calculates the optimal dimension of this panel
    setDimension: function (preferredMaxSize) {
      if (this.getBounds().equals(preferredMaxSize))
        return preferredMaxSize;
      return BoxBag.prototype.layoutSingle(preferredMaxSize, this.bg, this.act.margin);
    },
    //
    // Sets the size and position of this activity panel
    setBounds: function (rect) {
      this.$div.empty();
      ActPanelAncestor.setBounds.call(this, rect);
      if (this.bg) {
        this.$canvas = $('<canvas width="' + rect.dim.width + '" height="' + rect.dim.height + '"/>');
        this.$div.append(this.$canvas);
        this.ctx = this.$canvas.get(0).getContext('2d');
        this.bg.setContext2D(this.ctx);
        this.invalidate();
        this.bg.update(this.ctx);
      }
    }
  };

  // InformationScreen.Panel extends Activity.Panel
  InformationScreen.prototype.Panel.prototype = $.extend(
      Object.create(ActPanelAncestor),
      InformationScreen.prototype.Panel.prototype);

  // 
  // Register class in Activity.prototype
  Activity.prototype._CLASSES['@panels.InformationScreen'] = InformationScreen;

  return InformationScreen;

});
