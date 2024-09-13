/**
 *  File    : skins/DefaultSkin.js
 *  Created : 12/05/2015
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

/* global document */

import $ from 'jquery';
import { Font } from '../AWT.js';
import Skin from './Skin.js';
import ActiveBox from '../boxes/ActiveBox.js';
import Counter from './Counter.js';
import { log, getMsg, getSvg, svgToURI } from '../Utils.js';

// Use Webpack to import CSS and SVG files
import mainCSS from './assets/main.css';
import mainCSSHalf from './assets/mainHalf.css';
import mainCSSTwoThirds from './assets/mainTwoThirds.css';
import prevIcon from './assets/prevIcon.svg';
import nextIcon from './assets/nextIcon.svg';
import fullScreenIcon from './assets/fullScreenIcon.svg';
import fullScreenExitIcon from './assets/fullScreenExitIcon.svg';
import closeIcon from './assets/closeIcon.svg';
import infoIcon from './assets/infoIcon.svg';
import reportsIcon from './assets/reportsIcon.svg';
import timeIcon from './assets/timeIcon.svg';
import scoreIcon from './assets/scoreIcon.svg';
import actionsIcon from './assets/actionsIcon.svg';

/**
 * This is the default {@link module:skins/Skin.Skin Skin} used by JClic.js
 * @extends module:skins/Skin.Skin
 */
export class DefaultSkin extends Skin {
  /**
   * DefaultSkin constructor
   * @param {module:JClicPlayer.JClicPlayer} ps - The PlayStation (currently a {@link module:JClicPlayer.JClicPlayer JClicPlayer}) used to load and
   * realize the media objects needed tot build the Skin.
   * @param {string} [name] - The skin class name
   * @param {object} [options] - Optional parameter with additional options, used by subclasses
   * this skin. When `null` or `undefined`, a new one will be created.
   */
  constructor(ps, name = null, options = {}) {
    // DefaultSkin extends [Skin](Skin.html)
    super(ps, name, options);
    let msg = '';

    Font.loadGoogleFonts(this.cssFonts);

    // Create the main container for buttons, counters and message box
    this.$ctrlCnt = $('<div/>', { class: 'JClicCtrlCnt unselectableText', role: 'navigation' });
    this.$div.append(this.$ctrlCnt);

    // Add `prev` button
    msg = getMsg('Previous activity');
    this.buttons.prev = $('<button/>', { class: 'JClicBtn', title: msg, 'aria-label': msg })
      .append($(getSvg(this.prevIcon, this.iconWidth, this.iconHeight, this.iconFill)))
      .on('click', evt => {
        if (this.ps)
          this.ps.actions.prev.processEvent(evt);
      });
    this.$ctrlCnt.append(this.buttons.prev);

    // Add message box
    this.msgBox = new ActiveBox();
    this.msgBox.role = 'message';
    this.$msgBoxDiv = $('<div/>', { class: 'JClicMsgBox' })
      .on('click', () => {
        this.msgBox.playMedia(ps);
        return false;
      });
    this.$ctrlCnt.append(this.$msgBoxDiv);

    // Add `next` button
    msg = getMsg('Next activity');
    this.buttons.next = $('<button/>', { class: 'JClicBtn', title: msg, 'aria-label': msg })
      .append($(getSvg(this.nextIcon, this.iconWidth, this.iconHeight, this.iconFill)))
      .on('click', evt => {
        if (this.ps)
          this.ps.actions.next.processEvent(evt);
      });
    this.$ctrlCnt.append(this.buttons.next);

    // Add counters
    if (false !== this.ps.options.counters && false !== options.counters) {
      // Create counters
      msg = getMsg('Reports');
      const $countCnt = $('<button/>', { class: 'JClicCountCnt', 'aria-label': msg })
        .on('click', evt => {
          if (this.ps)
            this.ps.actions.reports.processEvent(evt);
        });
      $.each(Skin.prototype.counters, (name, _val) => {
        msg = getMsg(name);
        this.counters[name] = new Counter(name, $('<div/>', { class: 'JClicCounter', title: msg, 'aria-label': msg })
          .css({
            'background-image': `url(${svgToURI(this[name + 'Icon'], this.counterIconWidth, this.counterIconHeight, this.counterIconFill)})`,
            color: this.counterIconFill
          })
          .html('000')
          .appendTo($countCnt));
      });
      this.$ctrlCnt.append($countCnt);
    }

    // Add info button
    if (true === this.ps.options.info || true === options.info) {
      msg = getMsg('Information');
      this.buttons.info = $('<button/>', { class: 'JClicBtn', title: msg, 'aria-label': msg })
        .append($(getSvg(this.infoIcon, this.iconWidth, this.iconHeight, this.iconFill)))
        .on('click', evt => {
          if (this.ps)
            this.ps.actions.info.processEvent(evt);
        });
      this.$ctrlCnt.append(this.buttons.info);
    }

    // Add reports button
    if (true === this.ps.options.reportsBtn || true === options.reportsBtn) {
      msg = getMsg('Reports');
      this.buttons.about = $('<button/>', { class: 'JClicBtn', title: msg, 'aria-label': msg })
        .append($(getSvg(this.reportsIcon, this.iconWidth, this.iconHeight, this.iconFill)))
        .on('click', evt => {
          if (this.ps)
            this.ps.actions.reports.processEvent(evt);
        });
      this.$ctrlCnt.append(this.buttons.about);
    }

    // Add `full screen` button
    if (document && document.fullscreenEnabled) {
      msg = getMsg('Toggle full screen');
      this.buttons.fullscreen = $('<button/>', { class: 'JClicBtn', title: msg, 'aria-label': msg })
        .append($('<img/>', { src: svgToURI(this.fullScreenIcon, this.iconWidth, this.iconHeight, this.iconFill) }))
        .on('click', () => {
          this.setScreenFull(null);
        });
      this.$ctrlCnt.append(this.buttons.fullscreen);
    }

    // Add `close` button
    if (typeof this.ps.options.closeFn === 'function') {
      msg = getMsg('Close');
      const closeFn = this.ps.options.closeFn;
      this.buttons.close = $('<button/>', { class: 'JClicBtn', title: msg, 'aria-label': msg })
        .append($(getSvg(this.closeIcon, this.iconWidth, this.iconHeight, this.iconFill)))
        .on('click', () => {
          log('info', 'Closing the player');
          closeFn();
        });
      this.$ctrlCnt.append(this.buttons.close);
    }

    // Workaround for a bug in Edge and Explorer: SVG objects not implementing `blur` and `focus` methods
    // See: [https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/8479637/]
    // This affects Polymer `iron-overlay-behavior`. See: [https://github.com/PolymerElements/iron-overlay-behavior/pull/211]
    let nilFunc = null;
    $.each(this.buttons, (_key, value) => {
      if (value && (typeof value[0].focus !== 'function' || typeof value[0].blur !== 'function')) {
        if (nilFunc === null)
          nilFunc = () => log('error', '"blur" and "focus" not defined for SVG objects in Explorer/Edge');
        value[0].focus = value[0].blur = nilFunc;
      }
    });
  }

  /**
   * Returns the CSS styles used by this skin. This method should be called only from
   * the `Skin` constructor, and overridded by subclasses if needed.
   * @param {string} media - A specific media size. Possible values are: 'default', 'half' and 'twoThirds'
   * @returns {string}
   */
  _getStyleSheets(media = 'default') {
    return `${super._getStyleSheets(media)}${media === 'default' ? this.mainCSS : media === 'half' ? this.mainCSSHalf : media === 'twoThirds' ? this.mainCSSTwoThirds : ''}`;
  }

  /**
   * Main method used to build the content of the skin. Resizes and places internal objects.
   * @override
   */
  doLayout() {
    // Call method on ancestor
    super.doLayout();

    // Set the fullScreen icon
    if (this.buttons.fullscreen)
      this.buttons.fullscreen.find('img').get(-1).src = svgToURI(
        this[(document && document.fullscreenElement) ? 'fullScreenExitIcon' : 'fullScreenIcon'],
        this.iconWidth, this.iconHeight, this.iconFill);
  }

  /**
   * Enables or disables the `tabindex` attribute of the main buttons. Useful when a modal dialog
   * overlay is active, to avoid direct access to controls not related with the dialog.
   * @param {boolean} status - `true` to make main controls navigable, `false` otherwise
   */
  enableMainButtons(status) {
    this.$ctrlCnt.find('.JClicBtn,.JClicCountCnt').attr('tabindex', status ? '0' : '-1');
  }
}

Object.assign(DefaultSkin.prototype, {
  /**
   * Class name of this skin. It will be used as a base selector in the definition of all CSS styles.
   * @name module:skins/DefaultSkin.DefaultSkin#skinId
   * @override
   * @type {string}
   */
  skinId: 'JClicDefaultSkin',
  /**
   * The HTML div where buttons, counters and message box are placed
   * @name module:skins/DefaultSkin.DefaultSkin#$ctrlCnt
   * @type {external:jQuery} */
  $ctrlCnt: null,
  /**
   * Space (pixels) between the components of this {@link module:skins/Skin.Skin Skin}
   * @name module:skins/DefaultSkin.DefaultSkin#margin
   * @type {number} */
  margin: 18,
  /**
   * Height of {@link module:skins/DefaultSkin.DefaultSkin#msgBox msgBox}
   * @name module:skins/DefaultSkin.DefaultSkin#msgBoxHeight
   * @type {number} */
  msgBoxHeight: 60,
  /**
   * Width of counters, in pixels
   * @name module:skins/DefaultSkin.DefaultSkin#countersWidth
   * @type {number} */
  countersWidth: 60,
  /**
   * Height of counters, in pixels
   * @name module:skins/DefaultSkin.DefaultSkin#countersHeight
   * @type {number} */
  countersHeight: 20,
  //
  //Buttons and other graphical resources used by this skin.
  //
  /**
   * Styles used in this skin
   * @name module:skins/DefaultSkin.DefaultSkin#mainCSS
   * @type {string} */
  mainCSS,
  /**
   * Styles used in this skin, sized to half its regular size
   * @name module:skins/DefaultSkin.DefaultSkin#mainCSSHalf
   * @type {string} */
  mainCSSHalf,
  /**
   * Styles used in this skin, sized to two thirds of its regular size
   * @name module:skins/DefaultSkin.DefaultSkin#mainCSSTwoThirds
   * @type {string} */
  mainCSSTwoThirds,
  /**
   * Fonts used in this skin
   * @name module:skins/DefaultSkin.DefaultSkin#cssFonts
   * @type {string[]} */
  cssFonts: ['Roboto'],
  //
  // Default settings for icons (can be overridden in subclasses):
  /**
   * Icon width
   * @name module:skins/DefaultSkin.DefaultSkin#iconWidth
   * @type {number} */
  iconWidth: 36,
  /**
   * Icon height
   * @name module:skins/DefaultSkin.DefaultSkin#iconHeight
   * @type {number} */
  iconHeight: 36,
  /**
   * Fill color for icons
   * @name module:skins/DefaultSkin.DefaultSkin#iconFill
   * @type {string} */
  iconFill: '#FFFFFF',
  //
  // SVG images for action buttons
  // Based on [Google Material design Icons](https://google.github.io/material-design-icons/)
  //
  /**
   * Icon for 'previous activity' button
   * @name module:skins/DefaultSkin.DefaultSkin#prevIcon
   * @type {string} */
  prevIcon,
  /**
   * Icon for 'next activity' button
   * @name module:skins/DefaultSkin.DefaultSkin#nextIcon
   * @type {string} */
  nextIcon,
  /**
   * Full screen on icon
   * @name module:skins/DefaultSkin.DefaultSkin#fullScreenIcon
   * @type {string} */
  fullScreenIcon,
  /**
   * Full screen off icon
   * @name module:skins/DefaultSkin.DefaultSkin#fullScreenExitIcon
   * @type {string} */
  fullScreenExitIcon,
  /**
   * Close button
   * @name module:skins/DefaultSkin.DefaultSkin#closeIcon
   * @type {string} */
  closeIcon,
  /**
   * Info button
   * @name module:skins/DefaultSkin.DefaultSkin#infoIcon
   * @type {string} */
  infoIcon,
  /**
   * Reports button
   * @name module:skins/DefaultSkin.DefaultSkin#reportsIcon
   * @type {string} */
  reportsIcon,
  //
  // Settings for counters:
  /**
   * Counter icon width
   * @name module:skins/DefaultSkin.DefaultSkin#counterIconWidth
   * @type {number} */
  counterIconWidth: 18,
  /**
   * Counter icon height
   * @name module:skins/DefaultSkin.DefaultSkin#counterIconHeight
   * @type {number} */
  counterIconHeight: 18,
  /**
   * Counter icon fill color
   * @name module:skins/DefaultSkin.DefaultSkin#counterIconFill
   * @type {string} */
  counterIconFill: '#FFFFFF',
  // Counters:
  /**
   * Time icon
   * @name module:skins/DefaultSkin.DefaultSkin#timeIcon
   * @type {string} */
  timeIcon,
  /**
   * Score icon
   * @name module:skins/DefaultSkin.DefaultSkin#scoreIcon
   * @type {string} */
  scoreIcon,
  /**
   * Actions icon
   * @name module:skins/DefaultSkin.DefaultSkin#actionsIcon
   * @type {string} */
  actionsIcon,
});

// Register this class in the list of available skins
export default Skin.registerClass('default', DefaultSkin);
