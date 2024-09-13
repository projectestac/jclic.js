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
 *  @license EUPL-1.2
 *  @licstart
 *  (c) 2000-2020 Educational Telematic Network of Catalonia (XTEC)
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
 *  @module
 */

import $ from 'jquery';
import { Activity, ActivityPanel } from '../../Activity.js';
import MediaContent from '../../media/MediaContent.js';
import { log } from '../../Utils.js';

// Use Webpack to import PNG files
import ico00 from './icons/ico00.png';
import ico01 from './icons/ico01.png';
import ico02 from './icons/ico02.png';
import ico03 from './icons/ico03.png';
import icoFolder from './icons/icofolder.png';

/**
 * This class of {@link module:Activity.Activity Activity} is only used in legacy JClic project libraries. It contains
 * one or more buttons pointing to specific JClic projects or to other `Menu` activity panels.
 * @extends module:Activity.Activity
 */
export class Menu extends Activity {
  /**
   * Menu constructor
   * @param {module:project/JClicProject.JClicProject} project - The {@link module:project/JClicProject.JClicProject JClicProject} to which this activity belongs
   */
  constructor(project) {
    super(project);
    this.menuElements = [];
    // This kind of activities are not reported
    this.includeInReports = false;
    this.reportActions = false;
  }
}

/**
 * The {@link module:Activity.ActivityPanel ActivityPanel} where Menu will show its content.
 * @extends module:Activity.ActivityPanel
 */
export class MenuPanel extends ActivityPanel {
  /**
   * MenuPanel constructor
   * @param {module:Activity.Activity} act - The {@link module:Activity.Activity Activity} to which this Panel belongs
   * @param {module:JClicPlayer.JClicPlayer} ps - Any object implementing the methods defined in the
   * [PlayStation](http://projectestac.github.io/jclic/apidoc/edu/xtec/jclic/PlayStation.html) Java interface.
   * @param {external:jQuery} [$div] - The jQuery DOM element where this Panel will deploy
   */
  constructor(act, ps, $div) {
    super(act, ps, $div);
    // This kind of activity will always clean the "last project skin" setting
    ps.lastProjectSkin = null;
  }

  /**
   * Prepares the visual components of the activity
   * @override
   */
  buildVisualComponents() {
    if (this.firstRun)
      super.buildVisualComponents();
    // This `div` will contain the action buttons
    const $btnDiv = $('<div/>').css({
      'width': '100%',
      'max-height': '100%',
      'position': 'absolute',
      'top': '50%',
      'transform': 'translateY(-50%)',
      'display': 'flex',
      'flex-wrap': 'wrap',
      'overflow-y': 'auto',
      'place-content': 'center',
      'overflow-y': 'auto'
    });
    this.act.menuElements.forEach((me) => {
      // Create a button for each menu element
      const caption = me.description || me.caption || 'JClic';
      const $btn = $('<button/>', {
        class: 'StockBtn',
        title: caption,
        'aria-label': caption
      }).css({
        'min-width': '80px',
        'max-width': '200px',
        'min-height': '80px',
        'margin': '4px',
        'padding': '4px',
        'display': 'flex',
        'flex-direction': 'column',
        'justify-content': 'center',
        'align-items': 'center'
      });

      // Set the button icon
      const
        iconSrc = MenuPanel.icons[me.icon || '@ico00.png'],
        $img = $('<img/>', { src: iconSrc || '' }).css({
          'max-width': '180px',
          'max-height': '100px',
          'margin': '4px'
        });
      if (!iconSrc) {
        // It's not a stock image, so load `src` when available
        const mbe = this.act.project.mediaBag.getElement(me.icon, true);
        mbe.getFullPathPromise().then(imgFullPath => $img.attr('src', imgFullPath));
      }
      $btn.append($img);

      // Set the button text
      $btn.append($('<span/>').css({
        'max-width': '180px',
        'overflow': 'hidden',
        'white-space': 'nowrap',
        'text-overflow': 'ellipsis'
      }).html(me.caption));

      // Set a click listener method
      // $btn.on('click', function...) does not work!
      $btn[0].addEventListener('click', (ev) => {
        const mc = new MediaContent(me.projectPath ? 'RUN_CLIC_PACKAGE' : 'RUN_CLIC_ACTIVITY', me.sequence);
        if (me.projectPath)
          mc.externalParam = me.projectPath;
        log('info', `Launching ${me.projectPath || ''} ${me.sequence || ''}`);
        this.ps.playMedia(mc);
        ev.preventDefault();
      });

      // Place the created button on the container
      $btnDiv.append($btn);
    });

    // Add the buttons container on the main panel `div`
    this.$div.empty().append($btnDiv);
  }

  /**
   * Sets the real dimension of this panel.
   * @override
   * @param {module:AWT.Dimension} preferredMaxSize - The maximum surface available for the activity panel
   * @returns {module:AWT.Dimension}
   */
  setDimension(preferredMaxSize) {
    return preferredMaxSize;
  }

  /**
   * Basic initialization procedure
   * @override
   */
  initActivity() {
    super.initActivity();

    if (!this.firstRun)
      this.buildVisualComponents();
    else
      this.firstRun = false;

    this.setAndPlayMsg('initial', 'start');
    this.playing = true;
  }
}

/**
 * Default icons used in buttons, inherited from JClic
 * @type {object}
 */
MenuPanel.icons = {
  '@ico00.png': ico00,
  '@ico01.png': ico01,
  '@ico02.png': ico02,
  '@ico03.png': ico03,
  '@icofolder.png': icoFolder,
};

/**
 * Panel class associated to this type of activity: {@link module:activities/panels/Menu.MenuPanel MenuPanel}
 * @type {class} */
Menu.Panel = MenuPanel;

// Register activity class
export default Activity.registerClass('@panels.Menu', Menu);


