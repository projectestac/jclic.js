/**
 *  File    : activities/panels/Identify.js
 *  Created : 03/06/2015
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
  "../../Activity",
  "../../boxes/ActiveBoxGrid",
  "../../boxes/BoxBag",
  "../../AWT"
], function ($, Activity, ActiveBoxGrid, BoxBag, AWT) {

  /**
   * The aim of this type of {@link Activity} is to identify {@link ActiveBox} elements in a panel
   * that satisfy a specific condition, usually exposed in the main message.
   * @exports Identify
   * @class
   * @extends Activity
   */
  class Identify extends Activity {
    /**
     * Identify constructor
     * @param {JClicProject} project - The {@link JClicProject} to which this activity belongs
     */
    constructor(project) {
      super(project)
    }

    /**
     * Retrieves the minimum number of actions needed to solve this activity
     * @returns {number}
     */
    getMinNumActions() {
      return this.cellsToMatch
    }

    /**
     * Whether or not the activity uses random to scramble internal components
     * @returns {boolean}
     */
    hasRandom() {
      return true
    }
  }

  Object.assign(Identify.prototype, {
    /**
     * Number of not assigned cells (calculated in {@link Identify.Panel#buildVisualComponents})
     * @type {number} */
    nonAssignedCells: 0,
    /**
     * Number of cells the user must identify to complete the activity (calculated in
     * {@link Identify.Panel#buildVisualComponents})
     * @type {number} */
    cellsToMatch: 1,
  })

  /**
   * The {@link Activity.Panel} where identify activities are played.
   * @class
   * @extends Activity.Panel
   * @param {Activity} act - The {@link Activity} to which this Panel belongs
   * @param {JClicPlayer} ps - Any object implementing the methods defined in the
   * [PlayStation](http://projectestac.github.io/jclic/apidoc/edu/xtec/jclic/PlayStation.html)
   * Java interface.
   */
  Identify.Panel = class extends Activity.Panel {
    /**
     * Identify.Panel constructor
     * @param {external:jQuery=} $div - The jQuery DOM element where this Panel will deploy
     */
    constructor(act, ps, $div) {
      super(act, ps, $div)
    }

    /**
     * Miscellaneous cleaning operations
     */
    clear() {
      if (this.bg) {
        this.bg.end()
        this.bg = null
      }
    }

    /**
     * Prepares the visual components of the activity
     */
    buildVisualComponents() {
      if (this.firstRun)
        super.buildVisualComponents()
      this.clear()
      const
        abc = this.act.abc['primary'],
        solved = this.act.abc['solvedPrimary']
      if (abc) {
        if (abc.imgName) {
          abc.setImgContent(this.act.project.mediaBag, null, false)
          if (abc.animatedGifFile && !abc.shaper.rectangularShapes && !this.act.scramble['primary'])
            this.$animatedBg = $('<span/>').css({
              'background-image': `url(${abc.animatedGifFile})`,
              'background-position': 'center',
              'background-repeat': 'no-repeat',
              position: 'absolute'
            }).appendTo(this.$div)
        }

        if (solved && solved.imgName)
          solved.setImgContent(this.act.project.mediaBag, null, false)

        if (this.act.acp !== null) {
          const contentKit = [abc]
          if (solved) {
            contentKit.push(null)
            contentKit.push(solved)
          }
          this.act.acp.generateContent(abc.nch, abc.ncw, contentKit, false)
        }
        this.bg = ActiveBoxGrid.createEmptyGrid(null, this,
          this.act.margin, this.act.margin,
          abc)
        this.bg.setContent(abc, solved || null)
        this.bg.setAlternative(false)
        if (this.$animatedBg)
          this.bg.setCellAttr('tmpTrans', true)
        this.bg.setDefaultIdAss()
        this.act.nonAssignedCells = 0
        this.act.cellsToMatch = 0
        const n = this.bg.getNumCells()
        for (let i = 0; i < n; i++) {
          const
            bx = this.bg.getActiveBox(i),
            id = bx.idAss
          if (id === 1)
            this.act.cellsToMatch++
          else if (id === -1) {
            this.act.nonAssignedCells++
            bx.switchToAlt(this.ps)
          }
        }
        this.bg.setVisible(true)
      }
    }

    /**
     * Basic initialization procedure
     */
    initActivity() {
      super.initActivity()
      if (!this.firstRun)
        this.buildVisualComponents()
      else
        this.firstRun = false

      if (this.bg) {
        if (this.act.scramble['primary'])
          this.shuffle([this.bg], true, true)

        if (this.useOrder)
          this.currentItem = this.bg.getNextItem(-1)

        this.setAndPlayMsg('initial', 'start')
        this.invalidate().update()
        this.playing = true
      }
    }

    /**
     * Updates the graphic content of this panel.
     * This method will be called from {@link AWT.Container#update} when needed.
     * @param {AWT.Rectangle} dirtyRegion - Specifies the area to be updated. When `null`,
     * it's the whole panel.
     */
    updateContent(dirtyRegion) {
      super.updateContent(dirtyRegion)

      if (this.bg && this.$canvas) {
        const
          canvas = this.$canvas.get(-1),
          ctx = canvas.getContext('2d')
        if (!dirtyRegion)
          dirtyRegion = new AWT.Rectangle(0, 0, canvas.width, canvas.height)
        ctx.clearRect(dirtyRegion.pos.x, dirtyRegion.pos.y, dirtyRegion.dim.width, dirtyRegion.dim.height)
        this.bg.update(ctx, dirtyRegion)
      }
      return super.updateContent(dirtyRegion)
    }

    /**
     * Sets the real dimension of this panel.
     * @param {AWT.Dimension} preferredMaxSize - The maximum surface available for the activity panel
     * @returns {AWT.Dimension}
     */
    setDimension(preferredMaxSize) {
      return this.getBounds().equals(preferredMaxSize) ?
        preferredMaxSize :
        BoxBag.layoutSingle(preferredMaxSize, this.bg, this.act.margin)
    }

    /**
     * Sets the size and position of this activity panel
     * @param {AWT.Rectangle} rect
     */
    setBounds(rect) {
      if (this.$canvas)
        this.$canvas.remove()

      super.setBounds(rect)
      if (this.bg) {
        this.$canvas = $(`<canvas width="${rect.dim.width}" height="${rect.dim.height}"/>`).css({
          position: 'absolute',
          top: 0,
          left: 0
        })
        // Resize animated gif background
        if (this.$animatedBg) {
          const bgRect = this.bg.getBounds()
          this.$animatedBg.css({
            left: bgRect.pos.x,
            top: bgRect.pos.y,
            width: `${bgRect.dim.width}px`,
            height: `${bgRect.dim.height}px`,
            'background-size': `${bgRect.dim.width}px ${bgRect.dim.height}px`
          })
        }
        this.$div.append(this.$canvas)
        this.invalidate().update()
        setTimeout(() => {
          if (this.bg)
            this.bg.buildAccessibleElements(this.$canvas, this.$div)
        }, 0)
      }
    }

    /**
     * Builds the accessible components needed for this Activity.Panel
     * This method is called when all main elements are placed and visible, when the activity is ready
     * to start or when resized.
     */
    buildAccessibleComponents() {
      if (this.bg && this.$canvas && this.accessibleCanvas) {
        super.buildAccessibleComponents()
        this.bg.buildAccessibleElements(this.$canvas, this.$div)
      }
    }

    /**
     * Main handler used to process mouse, touch, keyboard and edit events
     * @param {Event} event - The HTML event to be processed
     * @returns {boolean=} - When this event handler returns `false`, jQuery will stop its
     * propagation through the DOM tree. See: {@link http://api.jquery.com/on}
     */
    processEvent(event) {
      if (this.playing) {
        const p = new AWT.Point(
          event.pageX - this.$div.offset().left,
          event.pageY - this.$div.offset().top)
        switch (event.type) {
          case 'click':
            this.ps.stopMedia(1)
            // Find the box behind the clicked point
            const bx = this.bg ? this.bg.findActiveBox(p) : null
            if (bx) {
              if (bx.idAss !== -1) {
                // Check if it's a valid move
                let ok = false
                const src = bx.getDescription()
                let m = m || bx.playMedia(this.ps)
                if (bx.idAss === 1 && (!this.act.useOrder || bx.idOrder === this.currentItem)) {
                  ok = true
                  bx.idAss = -1
                  if (bx.switchToAlt(this.ps))
                    m = m || bx.playMedia(this.ps)
                  else
                    bx.clear()
                  if (this.act.useOrder)
                    this.currentItem = this.bg.getNextItem(this.currentItem, 1)
                }
                const cellsOk = this.bg.countCellsWithIdAss(-1)
                this.ps.reportNewAction(this.act, 'SELECT', src, null, ok, cellsOk - this.act.nonAssignedCells)
                if (ok && cellsOk === this.act.cellsToMatch + this.act.nonAssignedCells)
                  this.finishActivity(true)
                else if (!m)
                  this.playEvent(ok ? 'actionOk' : 'actionError')
                this.update()
              } else {
                this.playEvent('actionError')
              }
            }
            break
        }
        event.preventDefault()
      }
    }
  }

  Object.assign(Identify.Panel.prototype, {
    /**
     * The {@link ActiveBoxBag} containing the information to be displayed on the panel.
     * @type {ActiveBoxBag} */
    bg: null,
    /**
     * List of mouse, touch and keyboard events intercepted by this panel
     * @type {string[]} */
    events: ['click'],
  })

  // Register class in Activity.prototype
  Activity.CLASSES['@panels.Identify'] = Identify

  return Identify
})
