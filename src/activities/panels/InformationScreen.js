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
  "../../AWT"
], function ($, Activity, ActiveBoxGrid, AWT) {

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
    // Prepares the text panel
    buildVisualComponents: function () {

      if (this.firstRun)
        ActPanelAncestor.buildVisualComponents.call(this);

      this.clear();
      this.$div.empty();
      var size = new AWT.Dimension(this.$div.width(), this.$div.height());
      this.$canvas = $('<canvas width="' + size.width + '" height="' + size.height + '"/>');
      this.$div.append(this.$canvas);
      this.ctx = this.$canvas.get(0).getContext('2d');

      var abc = this.act.abc['primary'];
      if (abc) {
        if (this.act.acp !== null)
          this.act.acp.generateContent(
            new this.act.acp.ActiveBagContentKit(abc.nch, abc.ncw, [abc], false), this.ps);
        this.bg = ActiveBoxGrid.prototype._createEmptyGrid(null, this,
            this.act.margin, this.act.margin,
            abc);
        this.bg.setContext2D(this.ctx);
        this.bg.setContent(abc);
        this.bg.setVisible(true);
        this.invalidate();
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
