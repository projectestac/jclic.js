/**
 *  File    : activities/text/OrderText.js
 *  Created : 20/06/2015
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
  "./TextActivityBase",
  "../../boxes/BoxConnector",
  "../../AWT"
], function ($, Activity, TextActivityBase, BoxConnector, AWT) {

  /**
   * In this type of text activity users must put in order some words or paragraphs that have been
   * initially scrambled.
   * @exports OrderText
   * @class
   * @extends TextActivityBase
   */
  class OrderText extends TextActivityBase {
    /**
     * OrderText constructor
     * @param {JClicProject} project - The project to which this activity belongs
     */
    constructor(project) {
      super(project)
    }

    /**
     * Whether or not the activity uses random to scramble internal components
     * @returns {boolean}
     */
    hasRandom() {
      return true
    }

    /**
     * When `true`, the activity must always be scrambled
     * @returns {boolean}
     */
    shuffleAlways() {
      return true
    }

    /**
     * Whether the activity allows the user to request help.
     * @returns {boolean}
     */
    helpSolutionAllowed() {
      return true
    }
  }

  Object.assign(OrderText.prototype, {
    /**
     * Whether to allow or not to scramble words among different paragraphs.
     * @type {boolean} */
    amongParagraphs: false,
    /**
     * The box connector
     * @type {BoxConnector} */
    bc: null,
  })

  /**
   * The {@link TextActivityBasePanel} where this kind of text activities are played.
   * @class
   * @extends TextActivityBasePanel
   */
  class OrderTextPanel extends TextActivityBase.Panel {
    /**
     * OrderTextPanel constructor
     * @param {Activity} act - The {@link Activity} to which this Panel belongs
     * @param {JClicPlayer} ps - Any object implementing the methods defined in the
     * [PlayStation](http://projectestac.github.io/jclic/apidoc/edu/xtec/jclic/PlayStation.html)
     * Java interface.
     * @param {external:jQuery=} $div - The jQuery DOM element where this Panel will deploy
     */
    constructor(act, ps, $div) {
      super(act, ps, $div)
    }

    /**
     * Prepares the text panel
     */
    buildVisualComponents() {
      this.act.document.style['target'].css.cursor = 'pointer'
      super.buildVisualComponents()
    }

    /**
     * Sets the size and position of this activity panel
     * @param {AWT.Rectangle} rect
     */
    setBounds(rect) {
      if (this.$canvas)
        this.$canvas.remove()

      super.setBounds(rect)
      if (!this.act.dragCells) {
        // Create the main canvas
        this.$canvas = $(`<canvas width="${rect.dim.width}" height="${rect.dim.height}"/>`).css({
          position: 'absolute',
          top: 0,
          left: 0,
          'pointer-events': 'none'
        })
        this.$div.append(this.$canvas)

        // Create a [BoxConnector](BoxConnector.html) and attach it to the canvas context
        this.bc = new BoxConnector(this, this.$canvas.get(-1).getContext('2d'))
        this.bc.compositeOp = this.bc.DEFAULT_COMPOSITE_OP

        // Repaint all
        this.invalidate().update()
      }
    }

    /**
     * Creates a target DOM element for the provided target.
     * @param {TextActivityDocument.TextTarget} target - The target related to the DOM object to be created
     * @param {external:jQuery} $span -  - An initial DOM object (usually a `span`) that can be used
     * to store the target, or replaced by another type of object.
     * @returns {external:jQuery} - The jQuery DOM element loaded with the target data.
     */
    $createTargetElement(target, $span) {
      super.$createTargetElement(target, $span)
      const idLabel = `target${`000${this.targets.length - 1}`.slice(-3)}`
      $span.addClass('JClicTextTarget').bind('click', event => {
        event.textTarget = target
        event.idLabel = idLabel
        this.processEvent(event)
      })
      return $span
    }

    /**
     * Swaps the position of two targets in the document
     * @param {TextActivityDocument.TextTarget} t1 - One target
     * @param {TextActivityDocument.TextTarget} t2 - Another target
     */
    swapTargets(t1, t2) {
      const
        $span1 = t1.$span,
        $span2 = t2.$span,
        $marker = $('<span/>')
      $marker.insertAfter($span2)
      $span2.detach()
      $span2.insertAfter($span1)
      $span1.detach()
      $span1.insertAfter($marker)
      $marker.remove()

      const
        pos = t1.pos,
        $p = t1.$p
      t1.pos = t2.pos
      t1.$p = t2.$p
      t2.pos = pos
      t2.$p = $p
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
    }

    /**
     * Called when the activity starts playing
     */
    startActivity() {
      super.startActivity()
      if (!this.showingPrevScreen) {
        if (this.act.type === 'orderWords' && !this.act.amongParagraphs) {
          // Group targets by paragraph
          const groups = []
          let
            lastTarget = null,
            currentGroup = []
          this.targets.forEach(t => {
            if (lastTarget !== null && lastTarget.$p !== t.$p) {
              groups.push(currentGroup)
              currentGroup = []
            }
            currentGroup.push(t)
            lastTarget = t
          })
          if (currentGroup.length > 0)
            groups.push(currentGroup)

          // Scramble group by group
          groups.forEach(group => this.shuffleTargets(group, this.act.shuffles))
        } else
          this.shuffleTargets(this.targets, this.act.shuffles)

        this.playing = true
      }
      this.setBounds(this)
    }

    /**
     * Randomly shuffles a set of targets
     * @param {TextActivityDocument.TextTarget[]} targets - The set of targets to shuffle (can be all
     * document targets or just the targets belonging to the same paragraph, depending on the value of
     * `amongParagraphs` in {@link Activity}.
     * @param {number} steps - The number of times to shuffle the elements
     */
    shuffleTargets(targets, steps) {
      const nt = targets.length
      if (nt > 1) {
        let repeatCount = 100
        for (let i = 0; i < steps; i++) {
          const
            r1 = Math.floor(Math.random() * nt),
            r2 = Math.floor(Math.random() * nt)
          if (r1 !== r2) {
            this.swapTargets(targets[r1], targets[r2])
          } else {
            if (--repeatCount)
              i++
          }
        }
      }
    }

    /**
     * Sets the current target
     * @param {TextActivityDocument.TextTarget} target - The currently selected target. Can be `null`.
     */
    setCurrentTarget(target) {
      const targetCss = this.act.document.getFullStyle('target').css
      if (this.currentTarget && this.currentTarget.$span)
        this.currentTarget.$span.css(targetCss)
      if (target && target.$span) {
        target.$span.css({
          color: targetCss['background-color'],
          'background-color': targetCss.color
        })
      }
      this.currentTarget = target
    }

    /**
     * Counts the number of targets that are at right position
     * @returns {number}
     */
    countSolvedTargets() {
      return this.targets.reduce((n, target) => target.num === target.pos ? ++n : n, 0)
    }

    /**
     * Evaluates all the targets in this panel. This method is usually called from the `Check` button.
     * @returns {boolean} - `true` when all targets are OK, `false` otherwise.
     */
    evaluatePanel() {
      if (this.bc && this.bc.active)
        this.bc.end()
      this.setCurrentTarget(null)

      let targetsOk = 0
      this.targets.forEach(target => {
        const ok = target.num === target.pos
        target.targetStatus = ok ? 'SOLVED' : 'WITH_ERROR'
        if (ok)
          targetsOk++
        target.checkColors()
        this.ps.reportNewAction(this.act, 'PLACE', target.text, target.pos, ok, targetsOk)
      })
      if (targetsOk === this.targets.length) {
        this.finishActivity(true)
        return true
      } else {
        this.playEvent('finishedError')
      }
      return false
    }

    /**
     * Ordinary ending of the activity, usually called form `processEvent`
     * @param {boolean} result - `true` if the activity was successfully completed, `false` otherwise
     */
    finishActivity(result) {
      $('.JClicTextTarget').css('cursor', 'pointer')
      return super.finishActivity(result)
    }

    /**
     * Main handler used to process mouse, touch, keyboard and edit events.
     * @param {HTMLEvent} event - The HTML event to be processed
     * @returns {boolean=} - When this event handler returns `false`, jQuery will stop its
     * propagation through the DOM tree. See: {@link http://api.jquery.com/on}
     */
    processEvent(event) {
      if (!super.processEvent(event))
        return false

      const target = event.textTarget
      let p = null
      if (this.bc && this.playing && !this.showingPrevScreen) {
        //
        // _touchend_ event don't provide pageX nor pageY information
        if (event.type === 'touchend')
          p = this.bc.active ? this.bc.dest.clone() : new AWT.Point()
        else {
          // Touch events can have more than one touch, so `pageX` must be obtained from `touches[0]`
          const
            x = event.originalEvent.touches ? event.originalEvent.touches[0].pageX : event.pageX,
            y = event.originalEvent.touches ? event.originalEvent.touches[0].pageY : event.pageY
          p = new AWT.Point(x - this.$div.offset().left, y - this.$div.offset().top)
        }

        switch (event.type) {
          case 'click':
            if (target && target !== this.currentTarget) {
              if (this.currentTarget) {
                if (this.bc && this.bc.active)
                  this.bc.end()
                this.swapTargets(target, this.currentTarget)
                this.setCurrentTarget(null)

                if (!this.$checkButton) {
                  // Check and notify action
                  const
                    cellsAtPlace = this.countSolvedTargets(),
                    ok = target.pos === target.num
                  this.ps.reportNewAction(this.act, 'PLACE', target.text, target.pos, ok, cellsAtPlace)

                  // End activity or play event sound
                  if (ok && cellsAtPlace === this.targets.length)
                    this.finishActivity(true)
                  else
                    this.playEvent(ok ? 'actionOk' : 'actionError')
                }
              } else {
                this.setCurrentTarget(target)
                this.bc.begin(p)
                this.playEvent('click')
              }
            }
            break

          case 'mousemove':
            this.bc.moveTo(p)
            break

          default:
            break
        }
        event.preventDefault()
        return true
      }
    }
  }

  // Properties and methods specific to OrderTextPanel
  Object.assign(OrderTextPanel.prototype, {
    /**
     * Currently selected text target
     * @type {TextActivityDocument.TextTarget} */
    currentTarget: null,
    /**
     * The box connector
     * @type {BoxConnector} */
    bc: null,
    /**
     * List of mouse, touch and keyboard events intercepted by this panel
     * @type {string[]} */
    events: ['click', 'mousemove'],
  })

  OrderText.Panel = OrderTextPanel

  // Register class in Activity.prototype
  Activity.CLASSES['@text.Order'] = OrderText

  return OrderText
})
