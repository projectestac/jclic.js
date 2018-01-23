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
 *  @license EUPL-1.1
 *  @licstart
 *  (c) 2000-2018 Catalan Educational Telematic Network (XTEC)
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
  "screenfull",
  "clipboard-js",
  "../Utils",
  "../AWT"
], function ($, screenfull, clipboard, Utils, AWT) {

  // In some cases, require.js does not return a valid value for screenfull. Check it:
  if (!screenfull)
    screenfull = window.screenfull

  /**
   * This abstract class manages the layout, position ans size of the visual components of JClic:
   * player window, message box, counters, buttons, status... and also the appearance of the main
   * container.
   * The basic implementation of Skin is {@link DefaultSkin}.
   * @exports Skin
   * @class
   * @abstract
   * @extends AWT.Container
   */
  class Skin extends AWT.Container {
    /**
     * Skin constructor
     * @param {PlayStation} ps - The `PlayStation` (currently a {@link JClicPlayer}) used to load and
     * realize the media objects needed tot build the Skin.
     * @param {string=} name - The skin name
     */
    constructor(ps, name) {

      // Skin extends [AWT.Container](AWT.html)
      super()

      if (!Skin.registerStyleSheet(this.skinId, ps))
        Utils.appendStyleAtHead(this._getStyleSheets().replace(/SKINID/g, this.skinId), ps)

      let msg = ''

      this.$div = $('<div/>', { class: this.skinId })
      this.$playerCnt = $('<div/>', { class: 'JClicPlayerCnt' })

      // Add waiting panel and progress bar
      this.$progress = $('<progress/>', { class: 'progressBar' })
        .css({ display: 'none' })
      this.$waitPanel = $('<div/>')
        .css({ display: 'none', 'background-color': 'rgba(255, 255, 255, .60)', 'z-index': 99 })
        .append($('<div/>', { class: 'waitPanel' }).css({ display: 'flex', 'flex-direction': 'column' })
          .append($('<div/>', { class: 'animImgBox' })
            .append($(this.waitImgBig), $(this.waitImgSmall)))
          .append(this.$progress))
      this.$playerCnt.append(this.$waitPanel)

      this.buttons = Utils.cloneObject(Skin.prototype.buttons)
      this.counters = Utils.cloneObject(Skin.prototype.counters)
      this.msgArea = Utils.cloneObject(Skin.prototype.msgArea)
      if (ps)
        this.ps = ps
      if (name)
        this.name = name

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
          this._closeDlg(true)
        return false
      })

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
        return false
      })

      this.$dlgMainPanel = $('<div/>', { class: 'dlgMainPanel', id: ps.getUniqueId('ReportsCnt') })
      this.$dlgBottomPanel = $('<div/>', { class: 'dlgBottomPanel', role: 'navigation' })

      // Basic dialog structure:
      this.$div.append(
        this.$playerCnt,
        this.$dlgOverlay.append(
          $dlgDiv.append(
            this.$dlgMainPanel,
            this.$dlgBottomPanel)))

      msg = ps.getMsg('JClic logo')
      this.$infoHead = $('<div/>', { class: 'infoHead' })
        .append($('<div/>', { class: 'headTitle unselectableText' })
          .append($(this.appLogo, { 'aria-label': msg }).css({ width: '1.5em', height: '1.5em', 'vertical-align': 'bottom' })
            .dblclick(() => {
              // Double click on JClic logo is a hidden method to increase verbosity on Javascript console
              Utils.setLogLevel('all')
              Utils.log('trace', 'Log level set to "trace"')
            }))
          .append($('<span/>').html('JClic.js')))
        .append($('<p/>').css({ 'margin-top': 0, 'margin-left': '3.5em' })
          .append($('<a/>', { href: 'http://clic.xtec.cat/repo/index.html?page=info' }).html('http://clic.xtec.cat'))
          .append($('<br>'))
          .append($('<span/>').html(ps.getMsg('Version') + ' ' + this.ps.JClicVersion)))

      this.$reportsPanel = $('<div/>', { class: 'reportsPanel', role: 'document' })

      msg = ps.getMsg('Copy data to clipboard')
      this.$copyBtn = $('<button/>', { title: msg, 'aria-label': msg })
        .append($(this.copyIcon).css({ width: '26px', height: '26px' }))
        .on('click', () => {
          clipboard.copy({
            'text/plain': `===> ${ps.getMsg('The data has been copied in HTML format. Please paste them into a spreadsheet or in a rich text editor')} <===`,
            'text/html': this.$reportsPanel.html()
          })
          this.$copyBtn.parent().append(
            $('<div/>', { class: 'smallPopup' })
              .html(ps.getMsg('The data has been copied to clipboard'))
              .fadeIn()
              .delay(3000)
              .fadeOut(function () { $(this).remove() }))
        })

      msg = ps.getMsg('Close')
      this.$closeDlgBtn = $('<button/>', { title: msg, 'aria-label': msg })
        .append($(this.closeDialogIcon).css({ width: '26px', height: '26px' }))
        .on('click', () => this._closeDlg(true))

      msg = ps.getMsg('OK')
      this.$okDlgBtn = $('<button/>', { title: msg, 'aria-label': msg })
        .append($(this.okDialogIcon).css({ width: '26px', height: '26px' }))
        .on('click', () => this._closeDlg(true))

      msg = ps.getMsg('Cancel')
      this.$cancelDlgBtn = $('<button/>', { title: msg, 'aria-label': msg })
        .append($(this.closeDialogIcon).css({ width: '26px', height: '26px' }))
        .on('click', () => this._closeDlg(false))

      // Registers this Skin in the list of realized Skin objects
      Skin.skinStack.push(this)
    }

    /**
     * Checks if the provided stylesheet ID is already registered in the root node where the current player is placed
     * @param {String} skinId - The unique identifier of the skin to check
     * @param {PlayStation=} ps - An optional `PlayStation` (currently a {@link JClicPlayer}) used as a base to find the root node
     * @returns {Boolean} - _true_ when the skin stylesheet is already defined in the current root node, _false_ otherwise
     */
    static registerStyleSheet(skinId, ps) {
      let result = false
      const root = Utils.getRootHead(ps)
      if (!root['__JClicID'])
        root.__JClicID = `SK${Skin.lastId++}`

      let styles = Skin.rootStyles[root.__JClicID]
      if (!styles) {
        styles = []
        Skin.rootStyles[root.__JClicID] = styles
      }

      if (styles.indexOf(skinId) < 0) {
        Utils.log('trace', `Stylesheet "${skinId}" has been registered for root node labeled as "${root.__JClicID}"`)
        styles.push(skinId)
      } else
        result = true

      return result
    }

    /**
     * Gets the specified Skin from `skinStack`, or creates a new one if not found.
     * This function should be used only through `Skin.getSkin`
     * @param {string} skinName - The name of the searched skin
     * @param {PlayStation} ps - The PlayStation (usually a {@link JClicPlayer}) used to build the new skin.
     * @param {external:jQuery} $xml - An XML element with the properties of the new skin
     * @returns {Skin}
     */
    static getSkin(skinName, ps, $xml) {
      let sk = null
      skinName = skinName || 'default'

      // Correct old skin names
      if (skinName.charAt(0, 1) === '@' && skinName.substr(-4) === '.xml')
        skinName = skinName.substr(1, skinName.length - 5)

      // look for the skin in the stack of realized skins
      if (skinName && ps) {
        sk = Skin.skinStack.find(s => s.name === skinName && s.ps === ps)
        if (sk)
          return sk
      }

      // Locates the class of the requested Skin (or [DefaultSkin](DefaultSkin.html)
      // if not specified). When not found, a new one is created and registered in `skinStack`
      let cl = Skin.CLASSES[skinName]
      if (!cl) {
        // TODO: Process custom skin XML files
        Utils.log('warn', `Unknown skin class: ${skinName}`)
        cl = Skin.CLASSES.default
      }
      sk = new cl(ps, skinName)
      if ($xml)
        sk.setProperties($xml)
      return sk
    }

    /**
     * Returns the CSS styles used by this skin. This method should be called only from
     * the `Skin` constructor, and overridded by subclasses if needed.
     * @returns {string}
     */
    _getStyleSheets() {
      return this.basicCSS + this.waitAnimCSS + this.reportsCSS
    }

    /**
     * Attaches a {@link JClicPlayer} object to this Skin
     * @param {JClicPlayer} player
     */
    attach(player) {
      this.detach()
      if (player !== null && player.skin !== null)
        player.skin.detach()
      this.player = player
      this.$playerCnt.prepend(player.$div)
      this.setSkinSizes()
      player.$mainContainer.append(this.$div)
    }

    /**
     * Sets the 'size' CSS values (max, min and compulsory) to the main `div` of this skin
     * @param {boolean} full - `true` when the skin is in full screen mode
     */
    setSkinSizes(full) {
      const
        css = {},
        topHeight = this.player.$topDiv.height(),
        nilValue = this.player.fullScreenChecked ? 'inherit' : null

      // When `full` no set, detect the current status with screenfull
      if (typeof full === 'undefined')
        full = screenfull && screenfull.enabled && screenfull.isFullscreen

      Utils.toCssSize(full ? '100vw' : this.ps.options.minWidth, css, 'min-width', nilValue)
      Utils.toCssSize(full ? '100vh' : this.ps.options.minHeight, css, 'min-height', nilValue)
      Utils.toCssSize(full ? '100vw' : this.ps.options.maxWidth, css, 'max-width', nilValue)
      Utils.toCssSize(full ? '100vh' : this.ps.options.maxHeight, css, 'max-height', nilValue)
      Utils.toCssSize(full ? '100vw' : this.ps.options.width, css, 'width', '100%')
      Utils.toCssSize(full ? '100vh' : this.ps.options.height, css, 'height', topHeight > 0 ? '100%' : '100vh')
      this.$div.css(css)
    }

    /**
     * Detaches the `player` element from this Skin
     */
    detach() {
      if (this.player !== null) {
        this.player.$div.remove()
        this.$div.detach()
        this.player = null
      }
    }

    /**
     * Loads the object settings from a specific jQuery XML element
     * @param {external:jQuery} _$xml - The XML element containing the properties of the skin
     */
    setProperties(_$xml) {
      // To be implemented by subclasses
    }

    /**
     * Updates the graphic content of this skin.
     * The method should be called from {@link Skin#update}
     * @param {AWT.Rectangle} dirtyRegion - The region to be painted. When `null`, refers to the full
     * skin area.
     */
    updateContent(dirtyRegion) {
      // To be overrided. Does nothing in abstract Skin.
      return super.updateContent(dirtyRegion)
    }

    /**
     * Resets all counters
     * @param {boolean} bEnabled - Leave it enabled/disabled
     */
    resetAllCounters(bEnabled) {
      $.each(this.counters, (_name, counter) => {
        if (counter !== null) {
          counter.value = 0
          counter.countDown = 0
          counter.enabled = bEnabled
          counter.refreshDisplay()
        }
      })
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
          })
      } else {
        switch (status) {
          case true:
            this.waitCursorCount++
            break
          case false:
            if (--this.waitCursorCount < 0)
              this.waitCursorCount = 0
            break
          case 'reset':
            this.waitCursorCount = 0
            break
        }
        this.setWaitCursor()
      }
    }

    /**
     * Sets the current value of the progress bar
     * @param {number} val - The current value. Should be less or equal than `max`. When -1, the progress bar will be hidden.
     * @param {number=} max - Optional parameter representing the maximum value. When passed, the progress bar will be displayed.
     */
    setProgress(val, max) {
      if (this.$progress) {
        this.currentProgress = val
        if (val < 0)
          this.$progress.css({ display: 'none' })
        else {
          if (max) {
            this.maxProgress = max
            this.$progress.attr('max', max).css({ display: 'initial' })
          }
          this.$progress.attr('value', val)
        }
        Utils.log('trace', `Progress: ${this.currentProgress}/${this.maxProgress}`)
      }
    }

    /**
     * Increments the progress bar value by the specified amount, only when the progress bar is running.
     * @param {number=} val - The amount to increment. When not defined, it's 1.
     */
    incProgress(val) {
      if (this.currentProgress >= 0)
        this.setProgress(this.currentProgress + (val || 1))
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
     * @returns {Promise} - A Promise that will be fulfilled when the dialog is closed.
     */
    showDlg(modal, options) {
      return new Promise((resolve, reject) => {
        this._dlgOkValue = 'ok'
        this._dlgCancelValue = 'cancelled'
        this._isModalDlg = modal

        this.$dlgMainPanel.children().detach()
        this.$dlgBottomPanel.children().detach()
        if (options.main)
          this.$dlgMainPanel.append(options.main)
        if (options.bottom)
          this.$dlgBottomPanel.append(options.bottom)

        this._closeDlg = resolved => {
          if (resolved && resolve)
            resolve(this._dlgOkValue)
          else if (!resolved && reject)
            reject(this._dlgCancelValue)
          this.$dlgOverlay.css({ display: 'none' })
          this.enableMainButtons(true)
          this._closeDlg = Skin.prototype._closeDlg
        }
        this.enableMainButtons(false)
        this.$dlgOverlay.css({ display: 'initial' })
      })
    }

    /**
     * Enables or disables the `tabindex` attribute of the main buttons. Useful when a modal dialog
     * overlay is active, to avoid direct access to controls not related with the dialog.
     * @param {boolean} status - `true` to make main controls navigable, `false` otherwise
     */
    enableMainButtons(status) {
      this.$playerCnt.find('button').attr('tabindex', status ? '0' : '-1')
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
     * @param {Reporter} reporter - The reporter system currently in use
     * @returns {Promise} - The Promise returned by {@link Skin.showDlg}.
     */
    showReports(reporter) {
      this.$reportsPanel.html(this.$printReport(reporter))
      return this.showDlg(false, {
        main: [this.$infoHead, this.$reportsPanel],
        bottom: [this.$copyBtn, this.$closeDlgBtn]
      })
    }

    /**
     * Formats the current report in a DOM tree, ready to be placed in `$reportsPanel`
     * @param {Reporter} reporter - The reporter system currently in use
     * @returns {external:jQuery[]} - An array of jQuery objects containing the full report
     */
    $printReport(reporter) {
      let result = []
      if (reporter) {
        const
          $html = Utils.$HTML,
          report = reporter.getData(),
          started = new Date(report.started)

        result.push($('<div/>', { class: 'subTitle', id: this.ps.getUniqueId('ReportsLb') }).html(this.ps.getMsg('Current results')))

        const $t = $('<table/>', { class: 'JCGlobalResults' })
        $t.append(
          $html.doubleCell(
            this.ps.getMsg('Session started:'),
            `${started.toLocaleDateString()} ${started.toLocaleTimeString()}`),
          $html.doubleCell(
            this.ps.getMsg('Reports system:'),
            `${this.ps.getMsg(report.descriptionKey)} ${report.descriptionDetail}`))
        if (report.userId)
          $t.append($html.doubleCell(
            this.ps.getMsg('User:'),
            report.userId))
        else if (report.user) // SCORM user
          $t.append($html.doubleCell(
            this.ps.getMsg('User:'),
            report.user))

        if (report.sequences > 0) {
          if (report.sessions.length > 1)
            $t.append($html.doubleCell(
              this.ps.getMsg('Projects:'),
              report.sessions.length))
          $t.append(
            $html.doubleCell(
              this.ps.getMsg('Sequences:'),
              report.sequences),
            $html.doubleCell(
              this.ps.getMsg('Activities done:'),
              report.activitiesDone),
            $html.doubleCell(
              this.ps.getMsg('Activities played at least once:'),
              `${report.playedOnce}/${report.reportable} (${Utils.getPercent(report.ratioPlayed / 100)})`))
          if (report.activitiesDone > 0) {
            $t.append($html.doubleCell(
              this.ps.getMsg('Activities solved:'),
              `${report.activitiesSolved} (${Utils.getPercent(report.ratioSolved / 100)})`))
            if (report.actScore > 0)
              $t.append(
                $html.doubleCell(
                  this.ps.getMsg('Partial score:'),
                  `${Utils.getPercent(report.partialScore / 100)} ${this.ps.getMsg('(out of played activities)')}`),
                $html.doubleCell(
                  this.ps.getMsg('Global score:'),
                  `${Utils.getPercent(report.globalScore / 100)} ${this.ps.getMsg('(out of all project activities)')}`))
            $t.append(
              $html.doubleCell(
                this.ps.getMsg('Total time in activities:'),
                Utils.getHMStime(report.time * 1000)),
              $html.doubleCell(
                this.ps.getMsg('Actions done:'),
                report.actions))
          }
          result.push($t)

          report.sessions.forEach(sr => {
            if (sr.sequences.length > 0) {
              const $t = $('<table/>', { class: 'JCDetailed' })
              result.push($('<p/>').html(report.sessions.length > 1 ? `${this.ps.getMsg('Project')} ${sr.projectName}` : ''))
              $t.append($('<thead/>').append($('<tr/>').append(
                $html.th(this.ps.getMsg('sequence')),
                $html.th(this.ps.getMsg('activity')),
                $html.th(this.ps.getMsg('OK')),
                $html.th(this.ps.getMsg('actions')),
                $html.th(this.ps.getMsg('score')),
                $html.th(this.ps.getMsg('time')))))

              sr.sequences.forEach(function (seq) {
                let $tr = $('<tr/>').append($('<td/>', { rowspan: seq.activities.length }).html(seq.sequence))
                seq.activities.forEach(act => {
                  if (act.closed) {
                    $tr.append($html.td(act.name))
                    $tr.append(act.solved ? $html.td(this.ps.getMsg('YES'), 'ok') : $html.td(this.ps.getMsg('NO'), 'no'))
                    $tr.append($html.td(act.actions))
                    $tr.append($html.td(Utils.getPercent(act.precision / 100)))
                    $tr.append($html.td(Utils.getHMStime(act.time * 1000)))
                  } else {
                    $tr.append($html.td(act.name, 'incomplete'))
                    for (let r = 0; r < 4; r++)
                      $tr.append($html.td('-', 'incomplete'))
                  }
                  $t.append($tr)
                  $tr = $('<tr/>')
                }, this)
              }, this)

              $t.append($('<tr/>').append(
                $html.td(this.ps.getMsg('Total:')),
                $html.td(`${sr.played} (${Utils.getPercent(sr.ratioPlayed / 100)})`),
                $html.td(`${sr.solved} (${Utils.getPercent(sr.ratioSolved / 100)})`),
                $html.td(sr.actions),
                $html.td(Utils.getPercent(sr.score / 100)),
                $html.td(Utils.getHMStime(sr.time * 1000))))

              result.push($t)
            }
          }, this)
        } else
          result.push($('<p/>').html(this.ps.getMsg('No activities done!')))
      }
      return result
    }

    /**
     *
     * Enables or disables a specific counter
     * @param {string} counter - Which counter
     * @param {boolean} bEnabled - When `true`, the counter will be enabled.
     */
    enableCounter(counter, bEnabled) {
      if (this.counters[counter])
        this.counters[counter].setEnabled(bEnabled)
    }

    /**
     * Main method, to be implemented by subclasses
     */
    doLayout() {
      // Resize player
      this.player.doLayout()
    }

    /**
     *
     * adjusts the skin to the dimension of its `$div` container
     * @returns {AWT.Dimension} the new dimension of the skin
     */
    fit() {
      this.doLayout()
      return new AWT.Dimension(this.$div.width(), this.$div.height())
    }

    /**
     * Sets or unsets the player in fullscreen mode, when allowed, using the
     * {@link https://github.com/sindresorhus/screenfull.js|screenfull.js} library.
     * @param {boolean} status - Whether to set or unset the player in fullscreen mode. When `null`
     * or `undefined`, the status toggles between fullscreen and windowed modes.
     * @returns {boolean} `true` if the request was successful, `false` otherwise.
     */
    setScreenFull(status) {
      if (screenfull && screenfull.enabled && (
        status === true && !screenfull.isFullscreen ||
        status === false && !screenfull.isFullScreen ||
        status !== true && status !== false)) {
        // Save current value of fullScreen for later use
        const full = screenfull.isFullscreen
        screenfull.toggle(this.player.$mainContainer.get(-1))
        this.player.fullScreenChecked = true
        // Firefox don't updates `document.fullscreenElement` in real time, so use the saved value instead
        this.setSkinSizes(!full)
      }
    }

    /**
     * Compares two Skin objects
     * @param {Skin} skin - The Skin to compare against this
     * @returns {boolean} - `true` if both skins are equivalent.
     */
    equals(skin) {
      return skin &&
        this.name === skin.name &&
        this.ps === skin.ps
    }

    /**
     * Gets the {@link ActiveBox} used to display the main messages of activities
     * @returns {ActiveBox}
     */
    getMsgBox() {
      // Method to be implemented by subclasses
      return null
    }

    /**
     *
     * Method used to notify this skin that a specific action has changed its enabled/disabled status
     * @param {AWT.Action} _action - The action originating the change event
     */
    actionStatusChanged(_action) {
      // To be implemented in subclasses
    }
  }

  /**
   * Collection of realized __Skin__ objects.
   * @type {Skin[]}
   */
  Skin.skinStack = []

  /**
   * Collection of skin style sheets already registered on the current document
   * @type {Object}
   */
  Skin.rootStyles = {}

  /**
   * Counter used to label root nodes with unique IDs
   * @type {Number}
   */
  Skin.lastId = 1

  /**
   * List of classes derived from Skin. It should be filled by real skin classes at declaration time.
   * @type {object}
   */
  Skin.CLASSES = {}

  Object.assign(Skin.prototype, {
    /**
     * Class name of this skin. It will be used as a base selector in the definition of all CSS styles.
     * @type {string}
     */
    skinId: 'JClicBasicSkin',
    /**
     * The HTML div object used by this Skin
     * @type {external:jQuery} */
    $div: null,
    /**
     * The HTML div where JClic Player will be placed
     * @type {external:jQuery} */
    $playerCnt: null,
    /**
     * Current name of the skin.
     * @type {string} */
    name: 'default',
    /**
     * Name of the XML file used to retrieve the skin settings.
     * @type {string} */
    fileName: '',
    /**
     * Waiting panel, displayed while loading resources.
     * @type {external:jQuery} */
    $waitPanel: null,
    /**
     * Graphic indicator of loading progress
     * @type {external:jQuery} */
    $progress: null,
    /**
     * Current value of the progress bar
     * @type {number} */
    currentProgress: -1,
    /**
     * Max value of the progress bar
     * @type {number} */
    maxProgress: 0,
    /**
     * Main panel used to display modal and non-modal dialogs
     * @type {external:jQuery} */
    $dlgOverlay: null,
    /**
     * Main panel of dialogs, where relevant information must be placed
     * @type {external:jQuery} */
    $dlgMainPanel: null,
    /**
     * Bottom panel of dialogs, used for action buttons
     * @type {external:jQuery} */
    $dlgBottomPanel: null,
    /**
     * Element usually used as header in dialogs, with JClic logo, name and version
     * @type {external:jQuery} */
    $infoHead: null,
    /**
     * Iconic button used to copy content to clipboard
     * @type {external:jQuery} */
    $copyBtn: null,
    /**
     * Iconic button used to close the dialog
     * @type {external:jQuery} */
    $closeDlgBtn: null,
    /**
     * OK dialog button
     * @type {external:jQuery} */
    $okDlgBtn: null,
    /**
     * Cancel dialog button
     * @type {external:jQuery} */
    $cancelDlgBtn: null,
    /**
     * Value to be returned by the dialog promise when the presented task is fulfilled
     * @type {Object} */
    _dlgOkValue: null,
    /**
     * Value to be returned in user-canceled dialogs
     * @type {Object} */
    _dlgCancelValue: null,
    /**
     * Flag indicating if the current dialog is modal or not
     * @type {boolean} */
    _isModalDlg: false,
    /**
     * Div inside {@link $dlgOverlay} where JClicPlayer will place the information to be shown
     * @type {external:jQuery} */
    $reportsPanel: null,
    /**
     * The basic collection of buttons that most skins implement
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
     * @type {object} */
    counters: {
      'actions': null,
      'score': null,
      'time': null
    },
    /**
     * The collection of message areas
     * @type {object} */
    msgArea: {
      'main': null,
      'aux': null,
      'mem': null
    },
    /**
     * The {@link JClicPlayer} object associated to this skin
     * @type {JClicPlayer} */
    player: null,
    /**
     * The {@link http://projectestac.github.io/jclic/apidoc/edu/xtec/jclic/PlayStation.html|PlayStation}
     * used by this Skin. Usually, the same as `player`
     * @type {PlayStation} */
    ps: null,
    /**
     * Counter to be incremented or decremented as `waitCursor` is requested or released.
     * @type {number} */
    waitCursorCount: 0,
    //
    // Buttons and other graphical resources used by this skin.
    //
    // Styles:
    basicCSS: '\
.SKINID {width:100%; background-color:#3F51B5; display:-webkit-flex; display:flex; -webkit-flex-direction:column; flex-direction:column;}\
.SKINID .JClicPlayerCnt {background-color:lightblue; margin:18px; -webkit-flex-grow:1; flex-grow:1; position:relative;}\
.SKINID .JClicPlayerCnt > div {position:absolute; width:100%; height:100%;}\
.SKINID button:not(.StockBtn) {background:transparent; padding:0; border:none;}\
.SKINID .unselectableText {-webkit-user-select:none; -moz-user-select:none; -ms-user-select:none; user-select: none;}\
.SKINID .progressBar {width: 250px}',
    waitAnimCSS: '\
.SKINID .waitPanel {display:-webkit-flex; display:flex; width:100%; height:100%; -webkit-justify-content:center; justify-content:center; -webkit-align-items:center; align-items:center;}\
.SKINID .animImgBox {position:relative; width:300px; height:300px; max-width:80%; max-height:80%;}\
.SKINID .animImgBox svg {position:absolute; width:100%; height:100%; animation-iteration-count:infinite; animation-timing-function:linear;}\
.SKINID #waitImgBig {animation-duration:0.8s; animation-name:rotate-right;}\
@keyframes rotate-right {from {transform:rotate(0);} to {transform:rotate(1turn);}}\
.SKINID #waitImgSmall {animation-duration:0.6s; animation-name:rotate-left;}\
@keyframes rotate-left {from {transform:rotate(0);} to {transform:rotate(-1turn);}}',
    //
    // Animated image displayed while loading resources
    // Based on Ryan Allen's [svg-spinner](http://articles.dappergentlemen.com/2015/01/13/svg-spinner/)
    waitImgBig: '<svg id="waitImgBig" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">\
<path fill="#3F51B5" d="m 65.99,40.19 c -0.42,5.33 7.80,4.94 8.11,0.20 C 74.50,34.37 66.35,8.59 42.92,\
7.98 15.90,7.29 9.96,29.50 9.94,39.41 15.33,-1.66 68.61,7.048 65.99,40.19 Z" />\
</svg>',
    waitImgSmall: '<svg id="waitImgSmall" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">\
<path fill="#3F51B5"d="m 57.00,39.43 c -0.28,-3.53 5.16,-3.27 5.37,-0.13 0.26,3.99 -5.13,21.04 -20.63,\
21.44 C 23.85,61.19 19.93,46.50 19.92,39.94 23.48,67.11 58.73,61.35 57.00,39.43 Z"/>\
</svg>',
    reportsCSS: '\
.SKINID .dlgDiv {background-color:#efefef; color:#757575; font-family:Roboto,sans-serif; font-size:10pt; line-height:normal;}\
.SKINID .dlgDiv a,a:visited,a:active,a:hover {text-decoration:none; color:inherit;}\
.SKINID .dlgMainPanel {padding:1em 2em; max-height:calc(100vh - 8em); max-width:calc(100vw - 2em); min-width:20em; overflow:auto;}\
.SKINID .dlgMainPanel .headTitle {font-size:2.5em; font-weight:bold; margin:auto;}\
.SKINID .dlgMainPanel .subTitle {font-size:1.4em; font-weight:bold; margin-bottom:0.5em;}\
.SKINID .dlgMainPanel p {font-size:1.1em; margin-bottom:0.5em;}\
.SKINID .dlgMainPanel table {table-layout:fixed; width:40em; margin:0.5em 0 1.7em 0; border-collapse:collapse;}\
.SKINID .dlgMainPanel select {min-width:20em; font-size:1.2em; font-family:Roboto,sans-serif; color:#757575;}\
.SKINID .dlgMainPanel input {margin-left:1em; font-size:1.2em; font-family:Roboto,sans-serif; border-color:lightgray;}\
.SKINID .infoHead {padding:1em 0em 0.5em;}\
.SKINID .JCGlobalResults td {padding:0.4em; border-bottom:1px solid #b6b6b6;}\
.SKINID .JCGlobalResults td:first-child {font-weight:600; width:14em;}\
.SKINID .JCDetailed td,th {border-bottom:1px solid #b6b6b6; padding:0.3em 0.4em; vertical-align:top; text-align:center; overflow:hidden; text-overflow:ellipsis;}\
.SKINID .JCDetailed thead {font-weight:600;}\
.SKINID .JCDetailed th:first-child {width:7em;}\
.SKINID .JCDetailed th:nth-last-child(4) {width:4em;}\
.SKINID .JCDetailed th:nth-last-child(-n+3) {width:4.1em; text-align:right;}\
.SKINID .JCDetailed td:nth-last-child(-n+3) {text-align:right;}\
.SKINID .JCDetailed .ok {color:#4bae4f; font-weight:600;}\
.SKINID .JCDetailed .no {color:#f34235; font-weight:600;}\
.SKINID .JCDetailed tr:last-child {font-weight:bold;}\
.SKINID .JCDetailed .incomplete {font-style:italic;}\
.SKINID .dlgBottomPanel {height:3.5em; background-color:white; padding:0.5em; font-weight:bold; text-align:right; border-top:1px solid #eee; position:relative;}\
.SKINID .dlgBottomPanel .smallPopup {background-color:#222; color:#ddd; padding:0.5em; font-size:0.9em; position:absolute; right:6em; top:1em;}\
.SKINID .dlgBottomPanel button {display:inline-block; padding:10px; cursor:pointer; line-height:0;}\
.SKINID .dlgBottomPanel button:hover {background-color:#eee; border-radius:80px;}\
.SKINID .dlgBottomPanel button:active {background-color:#b3e5fc;}',
    //
    // Icons used in buttons:
    //
    // Close dialog button
    closeDialogIcon: '<svg fill="#757575" viewBox="0 0 24 24" width="36" height="36" xmlns="http://www.w3.org/2000/svg">\
<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>\
</svg>',
    //
    //OK dialog button
    okDialogIcon: '<svg fill="#757575" viewBox="0 0 24 24" width="36" height="36" xmlns="http://www.w3.org/2000/svg">\
<path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>\
</svg>',
    //
    // Copy text button
    copyIcon: '<svg fill="#757575" viewBox="0 0 24 24" width="36" height="36" xmlns="http://www.w3.org/2000/svg">\
<path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>\
</svg>',
    //
    // JClic logo
    appLogo: '<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><g transform="matrix(.02081 0 0-.02081 5 62.33)">\
<path d="m1263 1297l270 1003 996-267-267-990c-427-1583-2420-1046-1999 519 3 11 999-266 999-266z" fill="none" stroke="#9d6329" stroke-linejoin="round" stroke-linecap="round" stroke-width="180" stroke-miterlimit="3.864"/>\
<path d="m1263 1297l270 1003 996-267-267-990c-427-1583-2420-1046-1998 519 3 11 999-266 999-266" fill="#f89c0e"/>\
<path d="m357 2850l1000-268-267-992-1000 266 267 994z" fill="none" stroke="#86882b" stroke-linejoin="round" stroke-linecap="round" stroke-width="180" stroke-miterlimit="3.864"/>\n\
<path d="m357 2850l1000-268-267-992-1000 266 267 994" fill="#d9e70c"/>\n\
</g></svg>'
  })

  return Skin
})
