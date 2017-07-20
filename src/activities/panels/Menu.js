/**
 *  File    : activities/panels/Menu.js
 *  Created : 20/07/2017
 *  By      : Francesc Busquets <francesc@gmail.com>
 *
 *  JClic.js
 *  An HTML5 player of JClic activities
 *  https://projectestac.github.io/jclic.js
 *
 *  @source https://github.com/projectestac/jclic.js
 *
 *  @license EUPL-1.1
 *  @licstart
 *  (c) 2000-2016 Catalan Educational Telematic Network (XTEC)
 *
 *  Licensed under the EUPL, Version 1.1 or -as soon they will be approved by
 *  the European Commission- subsequent versions of the EUPL (the "Licence");
 *  You may not use this work except in compliance with the Licence.
 *
 *  You may obtain a copy of the Licence at:
 *  https://joinup.ec.europa.eu/software/page/eupl
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the Licence is distributed on an "AS IS" basis, WITHOUT
 *  WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 *  Licence for the specific language governing permissions and limitations
 *  under the Licence.
 *  @licend
 */

/* global define */

define([
  "jquery",
  "../../Activity",
  "../../boxes/ActiveBoxGrid",
  "../../boxes/BoxBag",
  "../../AWT",
  "../../media/MediaContent"
], function ($, Activity, ActiveBoxGrid, BoxBag, AWT, MediaContent) {

  /**
   * This class of {@link Activity} is only used in legacy JClic project libraries. It contains
   * one or more buttons pointing to specific JClic projects or to other `Menu` activity panels.
   * @exports Menu
   * @class
   * @extends Activity
   * @param {JClicProject} project - The {@link JClicProject} to which this activity belongs
   */
  var Menu = function (project) {
    Activity.call(this, project);
    this.menuElements = [];
    // This kind of activities are not reported
    this.includeInReports = false;
    this.reportActions = false;
  };

  Menu.prototype = {
    constructor: Menu
  };

  // InformationScreen extends Activity
  Menu.prototype = $.extend(Object.create(Activity.prototype), Menu.prototype);

  /**
   * The {@link Activity.Panel} where Menu will show its content.
   * @class
   * @extends Activity.Panel
   * @param {Activity} act - The {@link Activity} to which this Panel belongs
   * @param {JClicPlayer} ps - Any object implementing the methods defined in the
   * [PlayStation](http://projectestac.github.io/jclic/apidoc/edu/xtec/jclic/PlayStation.html)
   * Java interface.
   * @param {external:jQuery=} $div - The jQuery DOM element where this Panel will deploy
   */
  Menu.Panel = function (act, ps, $div) {
    Activity.Panel.call(this, act, ps, $div);
  };

  var ActPanelAncestor = Activity.Panel.prototype;

  Menu.Panel.prototype = {
    constructor: Menu.Panel,
    /**
     * The {@link ActiveBoxBag} containing the information to be displayed.
     * @type {ActiveBoxBag} */
    bg: null,
    /**
     * List of mouse, touch and keyboard events intercepted by this panel
     * @type {string[]} */
    events: [],
    /**
     *
     * Miscellaneous cleaning operations
     */
    clear: function () {
      if (this.bg) {
        this.bg.end();
        this.bg = null;
      }
    },
    /**
     *
     * Prepares the visual components of the activity
     */
    buildVisualComponents: function () {

      if (this.firstRun)
        ActPanelAncestor.buildVisualComponents.call(this);

      this.clear();

      var thisPanel = this;
      this.act.menuElements.forEach(function (me) {

        var $btn = $('<button/>', { class: 'StockBtn' }).css({
          'min-width': '80px',
          height: '80px',
          margin: '10px'
        })

        if (me.icon) {
          var mbe = thisPanel.act.project.mediaBag.getElement(me.icon, true);
          mbe.getFullPathPromise().then(function (imgFullPath) {
            $('<img/>', { src: imgFullPath }).appendTo($btn);
          });
        }


        $btn.append($('<span/>').html(me.caption));

        $btn.on('click', function (_ev) {
          console.log('click on button!');
          var mc = new MediaContent(me.projectPath ? 'RUN_CLIC_PACKAGE' : 'RUN_CLIC_ACTIVITY', me.sequence);
          if (me.projectPath)
            mc.externalParam = me.projectPath;
          console.log(mc);
          thisPanel.ps.playMedia(mc);
        });

        thisPanel.$div.append($btn);

        window.BTN = $btn;
      });

    },
    /**
     *
     * Basic initialization procedure
     */
    initActivity: function () {
      ActPanelAncestor.initActivity.call(this);

      if (!this.firstRun)
        this.buildVisualComponents();
      else
        this.firstRun = false;

      this.setAndPlayMsg('initial', 'start');
      this.playing = true;
    },
    /**
     * Updates the graphic content of this panel.
     * This method will be called from {@link AWT.Container#update} when needed.
     * @param {AWT.Rectangle} dirtyRegion - Specifies the area to be updated. When `null`,
     * it's the whole panel.
     */
    updateContent: function (dirtyRegion) {
      ActPanelAncestor.updateContent.call(this, dirtyRegion);
      return this;
    },
    /**
     *
     * Sets the real dimension of this panel.
     * @param {AWT.Dimension} preferredMaxSize - The maximum surface available for the activity panel
     * @returns {AWT.Dimension}
     */
    setDimension: function (preferredMaxSize) {
      return preferredMaxSize;
    },
    /**
     *
     * Sets the size and position of this activity panel
     * @param {AWT.Rectangle} rect
     */
    setBounds: function (rect) {
      ActPanelAncestor.setBounds.call(this, rect);
    },
    /**
     * 
     * Builds the accessible components needed for this Activity.Panel
     * This method is called when all main elements are placed and visible, when the activity is ready
     * to start or when resized.
     */
    buildAccessibleComponents: function () {
      ActPanelAncestor.buildAccessibleComponents.call(this);
    },
    /**
     *
     * Main handler used to process mouse, touch, keyboard and edit events
     * @param {HTMLEvent} event - The HTML event to be processed
     * @returns {boolean=} - When this event handler returns `false`, jQuery will stop its
     * propagation through the DOM tree. See: {@link http://api.jquery.com/on}
     */
    processEvent: function (event) {
    }
  };

  // Menu.Panel extends Activity.Panel
  Menu.Panel.prototype = $.extend(Object.create(ActPanelAncestor), Menu.Panel.prototype);

  // Register class in Activity.prototype
  Activity.CLASSES['@panels.Menu'] = Menu;

  return Menu;

});
