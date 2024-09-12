/**
 *  File    : skins/Skin.js
 *  Created : 29/04/2015
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

/* global Promise, window, document, navigator, ClipboardItem, Blob */

import $ from 'jquery';
import { appendStyleAtHead, cloneObject, getMsg, setLogLevel, log, getRootHead, toCssSize, $HTML, getPercent, getHMStime, settings } from '../Utils';
import { Container, Dimension, Rectangle } from '../AWT';

// Use Webpack to import CSS and SVG files
import basicCSS from './assets/basic.css';
import waitAnimCSS from './assets/waitAnim.css';
import reportsCSS from './assets/reports.css';
import waitImgSmall from './assets/waitImgSmall.svg';
import waitImgBig from './assets/waitImgBig.svg';
import appLogo from './assets/appLogo.svg';
import closeDialogIcon from './assets/closeDialogIcon.svg';
import okDialogIcon from './assets/okDialogIcon.svg';
import copyIcon from './assets/copyIcon.svg';

/**
 * This abstract class manages the layout, position ans size of the visual components of JClic:
 * player window, message box, counters, buttons, status... and also the appearance of the main
 * container.
 * The basic implementation of Skin is {@link module:skins/DefaultSkin.DefaultSkin DefaultSkin}.
 * @abstract
 * @extends module:AWT.Container
 */
export class Skin extends Container {
  /**
   * Skin constructor
   * @param {module:JClicPlayer.JClicPlayer} ps - The `PlayStation` (currently a {@link module:JClicPlayer.JClicPlayer JClicPlayer}) used to load and
   * realize the media objects needed tot build the Skin.
   * @param {string} [name] - The skin name
   * @param {object} [options] - Optional parameter with additional options
   */
  constructor(ps, name = null, options = {}) {

    // Skin extends [AWT.Container](AWT.html)
    super();

    // Save parameters for later use
    this.ps = ps;
    if (name !== null)
      this.name = name;
    this.options = options;

    if (this.options.skinId)
      this.skinId = this.options.skinId;

    if (!Skin.registerStyleSheet(this.skinId, ps)) {
      let css = this._getStyleSheets('default');
      let twoThirds = this._getStyleSheets('twoThirds');
      if (twoThirds.length > 0)
        css += ` @media (max-width:${this.twoThirdsMedia.width}px),(max-height:${this.twoThirdsMedia.height}px){${twoThirds}}`;
      let half = this._getStyleSheets('half');
      if (half.length > 0)
        css += ` @media (max-width:${this.halfMedia.width}px),(max-height:${this.halfMedia.height}px){${half}}`;
      appendStyleAtHead(css.replace(/\.ID/g, `.${this.skinId}`), ps);
    }

    let msg = '';

    this.$div = $('<div/>', { class: this.skinId });
    this.$playerCnt = $('<div/>', { class: 'JClicPlayerCnt' });

    // Add waiting panel and progress bar
    this.$progress = $('<progress/>', { class: 'progressBar' })
      .css({ display: 'none' });
    this.$waitPanel = $('<div/>')
      .css({ display: 'none', 'background-color': 'rgba(255, 255, 255, .60)', 'z-index': 99 })
      .append($('<div/>', { class: 'waitPanel' }).css({ display: 'flex', 'flex-direction': 'column' })
        .append($('<div/>', { class: 'animImgBox' })
          .append($(this.waitImgBig), $(this.waitImgSmall)))
        .append(this.$progress));
    this.$playerCnt.append(this.$waitPanel);

    this.buttons = cloneObject(Skin.prototype.buttons);
    this.counters = cloneObject(Skin.prototype.counters);
    this.msgArea = cloneObject(Skin.prototype.msgArea);

    // Create dialog overlay and panel
    this.$dlgOverlay = $('<div/>', { class: 'dlgOverlay' }).css({
      'z-index': 98,
      position: 'fixed',
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      display: 'none',
      'background-color': 'rgba(30,30,30,0.7)'
    }).on('click', () => {
      if (!this._isModalDlg)
        // Non-modal dialogs are closed on click outside the main area
        this._closeDlg(true);
      return false;
    });

    const $dlgDiv = $('<div/>', {
      class: 'dlgDiv',
      role: 'dialog',
      'aria-labelledby': ps.getUniqueId('ReportsLb'),
      'aria-describedby': ps.getUniqueId('ReportsCnt')
    }).css({
      display: 'inline-block',
      position: 'relative',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    }).on('click', () => {
      // Clicks not passed to parent
      return false;
    });

    this.$dlgMainPanel = $('<div/>', { class: 'dlgMainPanel', id: ps.getUniqueId('ReportsCnt') });
    this.$dlgBottomPanel = $('<div/>', { class: 'dlgBottomPanel', role: 'navigation' });

    // Basic dialog structure:
    this.$div.append(
      this.$playerCnt,
      this.$dlgOverlay.append(
        $dlgDiv.append(
          this.$dlgMainPanel,
          this.$dlgBottomPanel)));

    msg = getMsg('JClic logo');
    this.$infoHead = $('<div/>', { class: 'infoHead' })
      .append($('<div/>', { class: 'headTitle unselectableText' })
        .append($(this.appLogo, { 'aria-label': msg }).css({ width: '1.5em', height: '1.5em', 'vertical-align': 'bottom' })
          .on('dblclick', () => {
            // Double click on JClic logo is a hidden method to increase verbosity on Javascript console
            setLogLevel('all');
            log('trace', 'Log level set to "trace"');
          }))
        .append($('<span/>').html('JClic.js')))
      .append($('<p/>').css({ 'margin-top': 0, 'margin-left': '3.5em' })
        .append($('<a/>', { href: 'http://clic.xtec.cat/repo/index.html?page=info' }).html('http://clic.xtec.cat'))
        .append($('<br>'))
        .append($('<span/>').html(`${getMsg('Version')} ${settings.VERSION}`)));

    this.$reportsPanel = $('<div/>', { class: 'reportsPanel', role: 'document' });

    msg = getMsg('Copy data to clipboard');
    this.$copyBtn = $('<button/>', { title: msg, 'aria-label': msg })
      .append($(this.copyIcon).css({ width: '26px', height: '26px' }))
      .on('click', () => {
        const item = new ClipboardItem({
          'text/plain': new Blob([`===> ${getMsg('The data has been copied in HTML format. Please paste them into a spreadsheet or in a rich text editor')} <===`], {type: 'text/plain'}),
          'text/html': new Blob([this.$reportsPanel.html()], {type: 'text/html'}),
        });
        navigator.clipboard.write([item])
          .then(() => this.$copyBtn.parent().append(
            $('<div/>', { class: 'smallPopup' })
              .html(getMsg('The data has been copied to clipboard'))
              .fadeIn()
              .delay(3000)
              .fadeOut(function () { $(this).remove(); })))
          .catch(err => this.$copyBtn.parent().append(
            $('<div/>', { class: 'smallPopup' })
              .html(`ERROR: Unable to write data into the clipboard: ${err}`)
              .fadeIn()
              .delay(3000)
              .fadeOut(function () { $(this).remove(); })));
      });

    msg = getMsg('Close');
    this.$closeDlgBtn = $('<button/>', { title: msg, 'aria-label': msg })
      .append($(this.closeDialogIcon).css({ width: '26px', height: '26px' }))
      .on('click', () => this._closeDlg(true));

    msg = getMsg('OK');
    this.$okDlgBtn = $('<button/>', { title: msg, 'aria-label': msg })
      .append($(this.okDialogIcon).css({ width: '26px', height: '26px' }))
      .on('click', () => this._closeDlg(true));

    msg = getMsg('Cancel');
    this.$cancelDlgBtn = $('<button/>', { title: msg, 'aria-label': msg })
      .append($(this.closeDialogIcon).css({ width: '26px', height: '26px' }))
      .on('click', () => this._closeDlg(false));

    // Registers this Skin in the list of realized Skin objects
    Skin.skinStack.push(this);
  }

  /**
   * Registers a new type of skin
   * @param {string} skinName - The name used to identify this skin
   * @param {function} skinClass - The skin class, usually extending Skin
   * @returns {module:skins/Skin.Skin} - The provided skin class
   */
  static registerClass(skinName, skinClass) {
    Skin.CLASSES[skinName] = skinClass;
    return skinClass;
  }

  /**
   * Checks if the provided stylesheet ID is already registered in the root node where the current player is placed
   * @param {string} skinId - The unique identifier of the skin to check
   * @param {module:JClicPlayer.JClicPlayer} [ps] - An optional `PlayStation` (currently a {@link module:JClicPlayer.JClicPlayer JClicPlayer}) used as a base to find the root node
   * @returns {boolean} - _true_ when the skin stylesheet is already defined in the current root node, _false_ otherwise
   */
  static registerStyleSheet(skinId, ps) {
    let result = false;
    const root = getRootHead(ps);
    if (!root['__JClicID'])
      root.__JClicID = `SK${Skin.lastId++}`;

    let styles = Skin.rootStyles[root.__JClicID];
    if (!styles) {
      styles = [];
      Skin.rootStyles[root.__JClicID] = styles;
    }

    if (styles.indexOf(skinId) < 0) {
      log('trace', `Stylesheet "${skinId}" has been registered for root node labeled as "${root.__JClicID}"`);
      styles.push(skinId);
    } else
      result = true;

    return result;
  }

  /**
   * Gets the specified Skin from `skinStack`, or creates a new one if not found.
   * This function should be used only through `Skin.getSkin`
   * @param {string} skinName - The name of the searched skin
   * @param {module:JClicPlayer.JClicPlayer} ps - The PlayStation (usually a {@link module:JClicPlayer.JClicPlayer JClicPlayer}) used to build the new skin.
   * @param {object} [options] - Optional parameter with additional options
   * @returns {module:skins/Skin.Skin}
   */
  static getSkin(skinName = 'default', ps, options = {}) {
    skinName = skinName || 'default';

    // Correct old skin names
    if (skinName.charAt(0, 1) === '@' && skinName.endsWith('.xml'))
      skinName = skinName.substring(1, skinName.length - 4);

    // look for the skin in the stack of realized skins
    if (skinName && ps) {
      // TODO: Check also `options`!
      const sk = Skin.skinStack.find(s => s.name === skinName && s.ps === ps);
      if (sk)
        return sk;
    }

    // Locates the class of the requested Skin (or [DefaultSkin](DefaultSkin.html)
    // if not specified). When not found, a new one is created and registered in `skinStack`
    let cl = Skin.CLASSES[skinName];
    if (!cl) {
      // Process custom skin XML files
      const mbe = ps.project.mediaBag.getElement(skinName, false);
      if (mbe && mbe.data) {
        options = Object.assign({}, options, mbe.data);
        options.skinId = `JClic-${skinName.replace('.xml', '')}`;
      }

      if (!ps.zip
        && options.class === 'edu.xtec.jclic.skins.BasicSkin'
        && options.image
        && ps.project.mediaBag.getElement(options.image, false)
        && ps.project.mediaBag.getElement(options.image, false).data)
        cl = Skin.CLASSES.custom;
      else {
        log('warn', `Unknown skin class: ${skinName}`);
        cl = Skin.CLASSES.default;
      }
    }

    // Build and return the requested skin
    return new cl(ps, skinName, options);
  }

  /**
   * Returns the CSS styles used by this skin. This method should be called only from
   * the `Skin` constructor, and overridded by subclasses if needed.
   * @param {string} media - A specific media size. Possible values are: 'default', 'half' and 'twoThirds'
   * @returns {string}
   */
  _getStyleSheets(media = 'default') {
    return media === 'default' ? (this.basicCSS + this.waitAnimCSS + this.reportsCSS) : '';
  }

  /**
   * Attaches a {@link module:JClicPlayer.JClicPlayer JClicPlayer} object to this Skin
   * @param {module:JClicPlayer.JClicPlayer} player
   */
  attach(player) {
    this.detach();
    if (player !== null && player.skin !== null)
      player.skin.detach();
    this.player = player;
    this.$playerCnt.prepend(player.$div);
    this.setSkinSizes();
    player.$mainContainer.append(this.$div);
  }

  /**
   * Sets the 'size' CSS values (max, min and compulsory) to the main `div` of this skin
   * @param {boolean} full - `true` when the skin is in full screen mode
   */
  setSkinSizes(full) {
    const
      css = {},
      topHeight = this.player?.$topDiv.height() || 0,
      nilValue = this.player.fullScreenChecked ? 'inherit' : null;

    // When `full` no set, detect the current status
    if (typeof full === 'undefined')
      full = document && document.fullscreenElement ? true : false;

    toCssSize(full ? '100vw' : this.ps.options.minWidth, css, 'min-width', nilValue);
    toCssSize(full ? '100vh' : this.ps.options.minHeight, css, 'min-height', nilValue);
    toCssSize(full ? '100vw' : this.ps.options.maxWidth, css, 'max-width', nilValue);
    toCssSize(full ? '100vh' : this.ps.options.maxHeight, css, 'max-height', nilValue);
    toCssSize(full ? '100vw' : this.ps.options.width, css, 'width', '100%');
    toCssSize(full ? '100vh' : this.ps.options.height, css, 'height', topHeight > 0 ? '100%' : '100vh');
    this.$div.css(css);
  }

  /**
   * Detaches the `player` element from this Skin
   */
  detach() {
    if (this.player !== null) {
      this.player.$div.remove();
      this.$div.detach();
      this.player = null;
    }
  }

  /**
   * Updates the graphic contents of this skin.
   * This method should be called from {@link module:skins/Skin.Skin#update}
   * @override
   * @param {module:AWT.Rectangle} dirtyRegion - Specifies the area to be updated. When `null`, it's the
   * whole panel.
   */
  updateContent(dirtyRegion) {
    if (this.$msgBoxDivCanvas) {
      const ctx = this.$msgBoxDivCanvas.get(-1).getContext('2d');
      ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
      this.msgBox.update(ctx, dirtyRegion);
    }
    return super.updateContent();
  }

  /**
   * Resets all counters
   * @param {boolean} bEnabled - Leave it enabled/disabled
   */
  resetAllCounters(bEnabled) {
    $.each(this.counters, (_name, counter) => {
      if (counter !== null) {
        counter.value = 0;
        counter.countDown = 0;
        counter.enabled = bEnabled;
        counter.refreshDisplay();
      }
    });
  }

  /**
   * Sets/unsets the 'wait' state
   * @param {boolean} status - Whether to set or unset the wait status. When `undefined`, the
   * `waitCursorCount` member is evaluated to decide if the wait state should be activated or deactivated.
   */
  setWaitCursor(status) {
    if (typeof status === 'undefined') {
      if (this.$waitPanel)
        this.$waitPanel.css({
          display: this.waitCursorCount > 0 ? 'initial' : 'none'
        });
    } else {
      switch (status) {
        case true:
          this.waitCursorCount++;
          break;
        case false:
          if (--this.waitCursorCount < 0)
            this.waitCursorCount = 0;
          break;
        case 'reset':
          this.waitCursorCount = 0;
          break;
      }
      this.setWaitCursor();
    }
  }

  /**
   * Sets the current value of the progress bar
   * @param {number} val - The current value. Should be less or equal than `max`. When -1, the progress bar will be hidden.
   * @param {number} [max] - Optional parameter representing the maximum value. When passed, the progress bar will be displayed.
   */
  setProgress(val, max) {
    if (this.$progress) {
      this.currentProgress = val;
      if (val < 0)
        this.$progress.css({ display: 'none' });
      else {
        if (max) {
          this.maxProgress = max;
          this.$progress.attr('max', max).css({ display: 'initial' });
        }
        this.$progress.attr('value', val);
      }
      log('trace', `Progress: ${this.currentProgress}/${this.maxProgress}`);
    }
  }

  /**
   * Increments the progress bar value by the specified amount, only when the progress bar is running.
   * @param {number} [val] - The amount to increment. When not defined, it's 1.
   */
  incProgress(val) {
    if (this.currentProgress >= 0)
      this.setProgress(this.currentProgress + (val || 1));
  }

  /**
   * Shows a window with clues or help for the current activity
   * @param {external:jQuery} _$hlpComponent - A JQuery DOM element with the information to be shown.
   * It can be a string or number. When `null`, the help window (if any) must be closed.
   */
  showHelp(_$hlpComponent) {
    // TODO: Implement HelpWindow
  }

  /**
   * Shows a "dialog" panel, useful for displaying information or prompt something to users
   * @param {boolean} modal - When `true`, the dialog should be closed by any click outside the main panel
   * @param {object} options - This object should have two components: `main` and `bottom`, both
   * containing a jQuery HTML element (or array of elements) to be placed on the main and bottom panels
   * of the dialog.
   * @returns {external:Promise} - A Promise that will be fulfilled when the dialog is closed.
   */
  showDlg(modal, options) {
    return new Promise((resolve, reject) => {
      this._dlgOkValue = 'ok';
      this._dlgCancelValue = 'cancelled';
      this._isModalDlg = modal;

      this.$dlgMainPanel.children().detach();
      this.$dlgBottomPanel.children().detach();
      if (options.main)
        this.$dlgMainPanel.append(options.main);
      if (options.bottom)
        this.$dlgBottomPanel.append(options.bottom);

      this._closeDlg = resolved => {
        if (resolved && resolve)
          resolve(this._dlgOkValue);
        else if (!resolved && reject)
          reject(this._dlgCancelValue);
        this.$dlgOverlay.css({ display: 'none' });
        this.enableMainButtons(true);
        this._closeDlg = Skin.prototype._closeDlg;
      };
      this.enableMainButtons(false);
      this.$dlgOverlay.css({ display: 'initial' });
    });
  }

  /**
   * Enables or disables the `tabindex` attribute of the main buttons. Useful when a modal dialog
   * overlay is active, to avoid direct access to controls not related with the dialog.
   * @param {boolean} status - `true` to make main controls navigable, `false` otherwise
   */
  enableMainButtons(status) {
    this.$playerCnt.find('button').attr('tabindex', status ? '0' : '-1');
  }

  /**
   * Called when the dialog must be closed, usually only by Skin members.
   * This method is re-defined on each call to `showDlg`, so the `resolve` and `reject`
   * functions can be safely called.
   */
  _closeDlg() {
    // Do nothing
  }

  /**
   * Displays a dialog with a report of the current results achieved by the user.
   * @param {module:report/Reporter.Reporter} reporter - The reporter system currently in use
   * @returns {external:Promise} - The Promise returned by {@link module:skins/Skin.Skin.showDlg}.
   */
  showReports(reporter) {
    this.$reportsPanel.html(this.$printReport(reporter));
    return this.showDlg(false, {
      main: [this.$infoHead, this.$reportsPanel],
      bottom: [this.$copyBtn, this.$closeDlgBtn]
    });
  }

  /**
   * Formats the current report in a DOM tree, ready to be placed in `$reportsPanel`
   * @param {module:report/Reporter.Reporter} reporter - The reporter system currently in use
   * @returns {external:jQuery[]} - An array of jQuery objects containing the full report
   */
  $printReport(reporter) {
    let result = [];
    if (reporter) {
      const
        report = reporter.getData(),
        started = new Date(report.started);

      result.push($('<div/>', { class: 'subTitle', id: this.ps.getUniqueId('ReportsLb') }).html(getMsg('Current results')));

      const $t = $('<table/>', { class: 'JCGlobalResults' });
      $t.append(
        $HTML.doubleCell(
          getMsg('Session started:'),
          `${started.toLocaleDateString()} ${started.toLocaleTimeString()}`),
        $HTML.doubleCell(
          getMsg('Reports system:'),
          `${getMsg(report.descriptionKey)} ${report.descriptionDetail}`));
      if (report.userId)
        $t.append($HTML.doubleCell(
          getMsg('User:'),
          report.userId));
      else if (report.user) // SCORM user
        $t.append($HTML.doubleCell(
          getMsg('User:'),
          report.user));

      if (report.sequences > 0) {
        if (report.sessions.length > 1)
          $t.append($HTML.doubleCell(
            getMsg('Projects:'),
            report.sessions.length));
        $t.append(
          $HTML.doubleCell(
            getMsg('Sequences:'),
            report.sequences),
          $HTML.doubleCell(
            getMsg('Activities done:'),
            report.activitiesDone),
          $HTML.doubleCell(
            getMsg('Activities played at least once:'),
            `${report.playedOnce}/${report.reportable} (${getPercent(report.ratioPlayed / 100)})`));
        if (report.activitiesDone > 0) {
          $t.append($HTML.doubleCell(
            getMsg('Activities solved:'),
            `${report.activitiesSolved} (${getPercent(report.ratioSolved / 100)})`));
          if (report.actScore > 0)
            $t.append(
              $HTML.doubleCell(
                getMsg('Partial score:'),
                `${getPercent(report.partialScore / 100)} ${getMsg('(out of played activities)')}`),
              $HTML.doubleCell(
                getMsg('Global score:'),
                `${getPercent(report.globalScore / 100)} ${getMsg('(out of all project activities)')}`));
          $t.append(
            $HTML.doubleCell(
              getMsg('Total time in activities:'),
              getHMStime(report.time * 1000)),
            $HTML.doubleCell(
              getMsg('Actions done:'),
              report.actions));
        }
        result.push($t);

        report.sessions.forEach(sr => {
          if (sr.sequences.length > 0) {
            const $t = $('<table/>', { class: 'JCDetailed' });
            result.push($('<p/>').html(report.sessions.length > 1 ? `${getMsg('Project')} ${sr.projectName}` : ''));
            $t.append($('<thead/>').append($('<tr/>').append(
              $HTML.th(getMsg('sequence')),
              $HTML.th(getMsg('activity')),
              $HTML.th(getMsg('OK')),
              $HTML.th(getMsg('actions')),
              $HTML.th(getMsg('score')),
              $HTML.th(getMsg('time')))));

            sr.sequences.forEach(seq => {
              let $tr = $('<tr/>').append($('<td/>', { rowspan: seq.activities.length }).html(seq.sequence));
              seq.activities.forEach(act => {
                if (act.closed) {
                  $tr.append($HTML.td(act.name));
                  $tr.append(act.solved ? $HTML.td(getMsg('YES'), 'ok') : $HTML.td(getMsg('NO'), 'no'));
                  $tr.append($HTML.td(act.actions));
                  $tr.append($HTML.td(getPercent(act.precision / 100)));
                  $tr.append($HTML.td(getHMStime(act.time * 1000)));
                } else {
                  $tr.append($HTML.td(act.name, 'incomplete'));
                  for (let r = 0; r < 4; r++)
                    $tr.append($HTML.td('-', 'incomplete'));
                }
                $t.append($tr);
                $tr = $('<tr/>');
              });
            });

            $t.append($('<tr/>').append(
              $HTML.td(getMsg('Total:')),
              $HTML.td(`${sr.played} (${getPercent(sr.ratioPlayed / 100)})`),
              $HTML.td(`${sr.solved} (${getPercent(sr.ratioSolved / 100)})`),
              $HTML.td(sr.actions),
              $HTML.td(getPercent(sr.score / 100)),
              $HTML.td(getHMStime(sr.time * 1000))));

            result.push($t);
          }
        }, this);
      } else
        result.push($('<p/>').html(getMsg('No activities done!')));
    }
    return result;
  }

  /**
   * Enables or disables a specific counter
   * @param {string} counter - Which counter
   * @param {boolean} bEnabled - When `true`, the counter will be enabled.
   */
  enableCounter(counter, bEnabled) {
    if (this.counters[counter])
      this.counters[counter].setEnabled(bEnabled);
  }

  /**
   * Main method used to build the content of the skin. Resizes and places internal objects.
   */
  doLayout() {
    // Resize player
    this.player.doLayout();

    // Build ths canvas at the end of current thread, thus avoiding
    // invalid sizes due to incomplete layout of DOM objects
    if (this.$msgBoxDiv)
      window.setTimeout(() => {

        // Temporary remove canvas to let div get its natural size:
        if (this.$msgBoxDivCanvas)
          this.$msgBoxDivCanvas.remove();

        // Get current size of message box div without canvas
        const
          msgWidth = this.$msgBoxDiv.outerWidth(),
          msgHeight = this.$msgBoxDiv.outerHeight();

        // Replace existing canvas if size has changed
        if (this.$msgBoxDivCanvas === null ||
          this.msgBox.dim.widht !== msgWidth ||
          this.msgBox.dim.height !== msgHeight) {
          this.$msgBoxDivCanvas = $(`<canvas width="${msgWidth}" height="${msgHeight}"/>`);
          this.msgBox.setBounds(new Rectangle(0, 0, msgWidth + 1, msgHeight));
          this.msgBox.buildAccessibleElement(this.$msgBoxDivCanvas, this.$msgBoxDiv);
        }
        // restore canvas
        this.$msgBoxDiv.append(this.$msgBoxDivCanvas);
        this.updateContent();
      }, 0);
  }

  /**
   * adjusts the skin to the dimension of its `$div` container
   * @returns {module:AWT.Dimension} the new dimension of the skin
   */
  fit() {
    this.doLayout();
    return new Dimension(this.$div.width(), this.$div.height());
  }

  /**
   * Sets or unsets the player in fullscreen mode, when allowed, using the
   * {@link https://github.com/sindresorhus/screenfull.js|screenfull.js} library.
   * @param {boolean} status - Whether to set or unset the player in fullscreen mode. When `null`
   * or `undefined`, the status toggles between fullscreen and windowed modes.
   * @returns {boolean} `true` if the request was successful, `false` otherwise.
   */
  setScreenFull(status) {
    if (document && document.fullscreenEnabled && (
      status === true && !document.fullscreenElement ||
      status === false && !document.fullscreenElement ||
      status !== true && status !== false)) {
      // Save current value of fullScreen for later use
      const full = document.fullscreenElement ? true : false;
      if (!document.fullscreenElement) {
        const element = this.player.$mainContainer.get(-1);
        if (element && element.requestFullscreen)
          element.requestFullscreen();
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
      this.player.fullScreenChecked = true;
      // Firefox don't updates `document.fullscreenElement` in real time, so use the saved value instead
      this.setSkinSizes(!full);
    }
  }

  /**
   * Method used to notify this skin that a specific action has changed its enabled/disabled status
   * @param {module:AWT.Action} _action - The action originating the change event
   */
  actionStatusChanged(act) {
    if (act.name && this.buttons[act.name])
      this.setEnabled(this.buttons[act.name], act.enabled);
  }

  /**
   * Enables or disables an object
   * @param {external:jQuery} $object - A JQuery DOM element
   * @override
   * @param {boolean} enabled
   */
  setEnabled($object, enabled) {
    if ($object && enabled)
      $object.removeAttr('disabled');
    else if ($object)
      $object.attr('disabled', true);
  }

  /**
   * Compares two Skin objects
   * @param {module:skins/Skin.Skin} skin - The Skin to compare against this
   * @returns {boolean} - `true` if both skins are equivalent.
   */
  equals(skin) {
    return skin &&
      this.name === skin.name &&
      this.ps === skin.ps;
  }

  /**
   * Gets the {@link module:boxes/ActiveBox.ActiveBox ActiveBox} used to display the main messages of activities
   * @returns {module:boxes/ActiveBox.ActiveBox}
   */
  getMsgBox() {
    return this.msgBox;
  }
}

/**
 * Collection of realized __Skin__ objects.
 * @type {module:skins/Skin.Skin[]}
 */
Skin.skinStack = [];

/**
 * Collection of skin style sheets already registered on the current document
 * @type {object}
 */
Skin.rootStyles = {};

/**
 * Counter used to label root nodes with unique IDs
 * @type {number}
 */
Skin.lastId = 1;

/**
 * List of classes derived from Skin. It should be filled by real skin classes at declaration time.
 * @type {object}
 */
Skin.CLASSES = {};

Object.assign(Skin.prototype, {
  /**
   * Class name of this skin. It will be used as a base selector in the definition of all CSS styles.
   * @name module:skins/Skin.Skin#skinId
   * @type {string} */
  skinId: 'JClicBasicSkin',
  /**
   * The HTML div object used by this Skin
   * @name module:skins/Skin.Skin#$div
   * @type {external:jQuery} */
  $div: null,
  /**
   * The HTML div where JClic Player will be placed
   * @name module:skins/Skin.Skin#$playerCnt
   * @type {external:jQuery} */
  $playerCnt: null,
  /**
   * Current name of the skin.
   * @name module:skins/Skin.Skin#name
   * @type {string} */
  name: 'default',
  /**
   * Specific options of this skin
   * @name module:skins/Skin.Skin#options
   * @type {object} */
  options: {},
  /**
   * Waiting panel, displayed while loading resources.
   * @name module:skins/Skin.Skin#$waitPanel
   * @type {external:jQuery} */
  $waitPanel: null,
  /**
   * Graphic indicator of loading progress
   * @name module:skins/Skin.Skin#$progress
   * @type {external:jQuery} */
  $progress: null,
  /**
   * Current value of the progress bar
   * @name module:skins/Skin.Skin#currentProgress
   * @type {number} */
  currentProgress: -1,
  /**
   * Max value of the progress bar
   * @name module:skins/Skin.Skin#maxProgress
   * @type {number} */
  maxProgress: 0,
  /**
   * The box used to display the main messages of JClic activities
   * @name module:skins/Skin.DefaultSkin#msgBox
   * @type {module:boxes/ActiveBox.ActiveBox} */
  msgBox: null,
  /**
   * The `div` DOM object where `msgBox` is located
   * @name module:skins/Skin.DefaultSkin#$msgBoxDiv
   * @type {external:jQuery} */
  $msgBoxDiv: null,
  /*
   * An HTML `canvas` object created in `$msgBoxDiv`
   * @name module:skins/Skin.DefaultSkin#$msgBoxDivCanvas
   * @type {external:jQuery} */
  $msgBoxDivCanvas: null,
  /**
   * Main panel used to display modal and non-modal dialogs
   * @name module:skins/Skin.Skin#$dlgOverlay
   * @type {external:jQuery} */
  $dlgOverlay: null,
  /**
   * Main panel of dialogs, where relevant information must be placed
   * @name module:skins/Skin.Skin#$dlgMainPanel
   * @type {external:jQuery} */
  $dlgMainPanel: null,
  /**
   * Bottom panel of dialogs, used for action buttons
   * @name module:skins/Skin.Skin#$dlgBottomPanel
   * @type {external:jQuery} */
  $dlgBottomPanel: null,
  /**
   * Element usually used as header in dialogs, with JClic logo, name and version
   * @name module:skins/Skin.Skin#infoHead
   * @type {external:jQuery} */
  $infoHead: null,
  /**
   * Iconic button used to copy content to clipboard
   * @name module:skins/Skin.Skin#$copyBtn
   * @type {external:jQuery} */
  $copyBtn: null,
  /**
   * Iconic button used to close the dialog
   * @name module:skins/Skin.Skin#$closeDlgBtn
   * @type {external:jQuery} */
  $closeDlgBtn: null,
  /**
   * OK dialog button
   * @name module:skins/Skin.Skin#$okDlgBtn
   * @type {external:jQuery} */
  $okDlgBtn: null,
  /**
   * Cancel dialog button
   * @name module:skins/Skin.Skin#$cancelDlgBtn
   * @type {external:jQuery} */
  $cancelDlgBtn: null,
  /**
   * Value to be returned by the dialog promise when the presented task is fulfilled
   * @name module:skins/Skin.Skin#_dlgOkValue
   * @type {object} */
  _dlgOkValue: null,
  /**
   * Value to be returned in user-canceled dialogs
   * @name module:skins/Skin.Skin#_dlgCancelValue
   * @type {object} */
  _dlgCancelValue: null,
  /**
   * Flag indicating if the current dialog is modal or not
   * @name module:skins/Skin.Skin#_isModalDlg
   * @type {boolean} */
  _isModalDlg: false,
  /**
   * Div inside {@link module:skins/Skin.Skin#$dlgOverlay $dlgOverlay} where JClicPlayer will place the information to be shown
   * @name module:skins/Skin.Skin#$reportsPanel
   * @type {external:jQuery} */
  $reportsPanel: null,
  /**
   * The basic collection of buttons that most skins implement
   * @name module:skins/Skin.Skin#buttons
   * @type {object} */
  buttons: {
    'prev': null,
    'next': null,
    'return': null,
    'reset': null,
    'info': null,
    'help': null,
    'audio': null,
    'about': null,
    'fullscreen': null,
    'close': null
  },
  /**
   * The collection of counters
   * @name module:skins/Skin.Skin#counters
   * @type {object} */
  counters: {
    'actions': null,
    'score': null,
    'time': null
  },
  /**
   * The collection of message areas
   * @name module:skins/Skin.Skin#msgArea
   * @type {object} */
  msgArea: {
    'main': null,
    'aux': null,
    'mem': null
  },
  /**
   * The {@link module:JClicPlayer.JClicPlayer JClicPlayer} object associated to this skin
   * @name module:skins/Skin.Skin#player
   * @type {module:JClicPlayer.JClicPlayer} */
  player: null,
  /**
   * The {@link http://projectestac.github.io/jclic/apidoc/edu/xtec/jclic/PlayStation.html|PlayStation}
   * used by this Skin. Usually, the same as `player`
   * @name module:skins/Skin.Skin#ps
   * @type {module:JClicPlayer.JClicPlayer} */
  ps: null,
  /**
   * Counter to be incremented or decremented as `waitCursor` is requested or released.
   * @name module:skins/Skin.Skin#waitCursorCount
   * @type {number} */
  waitCursorCount: 0,
  //
  // Buttons and other graphical resources used by this skin.
  //
  /**
   * Main styles
   * @name module:skins/Skin.Skin#basicCSS
   * @type {string} */
  basicCSS,
  /**
   * Waiting screen styles
   * @name module:skins/Skin.Skin#waitAnimCSS
   * @type {string} */
  waitAnimCSS,
  /**
   * Animated image displayed while loading resources
   * Based on Ryan Allen's [svg-spinner](http://articles.dappergentlemen.com/2015/01/13/svg-spinner/)
   * @name module:skins/Skin.Skin#waitImgBig
   * @type {string} */
  waitImgBig,
  /**
   * Animated image displayed while loading resources (small)
   * @name module:skins/Skin.Skin#waitImgSmall
   * @type {string} */
  waitImgSmall,
  /**
   * Reports screen styles
   * @name module:skins/Skin.Skin#reportsCSS
   * @type {string} */
  reportsCSS,
  //
  // Icons used in buttons:
  //
  /**
   * Icon for 'close dialog' button
   * @name module:skins/Skin.Skin#closeDialogIcon
   * @type {string} */
  closeDialogIcon,
  /**
   * Icon for 'ok' button
   * @name module:skins/Skin.Skin#okDialogIcon
   * @type {string} */
  okDialogIcon,
  /**
   * Icon for 'copy' button
   * @name module:skins/Skin.Skin#copyIcon
   * @type {string} */
  copyIcon,
  /**
   * JClic logo
   * @name module:skins/Skin.Skin#appLogo
   * @type {string} */
  appLogo,
  /**
   * Screen sizes (width and height) below which will half sized elements will be used
   * @name module:skins/Skin.DefaultSkin#halfMedia
   * @type {object} */
  halfMedia: { width: 376, height: 282 },
  /**
   * Screen sizes (width and height) below which will two-thirds sized elements will be used
   * @name module:skins/Skin.DefaultSkin#twoThirdsMedia
   * @type {object} */
  twoThirdsMedia: { width: 420, height: 315 },
});

export default Skin;
