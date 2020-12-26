/**
 *  File    : PlayerHistory.js
 *  Created : 28/04/2015
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

/* global define, window */

define([
  "jquery",
  "./Utils"
], function ($, Utils) {
  /**
   *
   * PlayerHistory uses an array to store the list of projects and activities done by the user.
   * This class allows {@link JClicPlayer} objects to rewind a sequence or to go back to a caller menu.
   * @exports PlayerHistory
   * @class
   */
  class PlayerHistory {
    /**
     * PlayerHistory constructor
     * @param {JClicPlayer} player - The JClicPlayer associated to this history
     */
    constructor(player) {
      this.player = player
      this.sequenceStack = []
      if (window && window.history && player.options.browserHistory) {
        this.browserHistory = true;
        $(window).on('popstate', (ev) => {
          const state = ev.originalEvent.state;
          if (state)
            this.processPopStateEvent(state)
        })
      }
    }

    /**
     * Process the `state` object received in a `popstate` event
     * @param {PlayerHistory#HistoryElement} state - The previously stored state
     */
    processPopStateEvent(state) {
      Utils.log('info', 'Processing History popstate event with state:', state)
      this.processingPop = true;
      if (state.projectPath === this.player.project.path &&
        Utils.isEquivalent(state.fullZipPath, this.player.zip ? this.player.zip.fullZipPath : null))
        this.player.load(null, state.activity, null)
      else
        this.player.load(state.fullZipPath || state.projectPath, state.activity, null)
    }

    /**
     * Push a new entry on the window.History stack,
     * only when `browserHistory` is true and there is no `popstate` event in progress
     */
    pushBrowserHistory() {
      if (this.browserHistory) {

        if (this.processingPop) {
          // A 'popstate' event is currently being processed, so just clear this flag and return
          this.processingPop = false;
          return;
        }

        const
          ase = this.player.project.activitySequence,
          act = ase.currentAct,
          title = this.player.actPanel.act.name || 'No name',
          state = new this.HistoryElement(
            this.player.project.path,
            ase.getSequenceForElement(act),
            act,
            this.player.zip ? this.player.zip.fullZipPath : null)

        // Push a new history entry, or update the current one if it has no `state`
        if (!window.history.state)
          window.history.replaceState(state, title)
        else
          window.history.pushState(state, title)
      }
    }

    /**
     *
     * Counts the number of {@link PlayerHistory#HistoryElement HistoryElement} objects stored in
     * {@link PlayerHistory#sequenceStack sequenceStack}
     * @returns {number}
     */
    storedElementsCount() {
      return this.sequenceStack.length
    }

    /**
     *
     * Removes all elements from {@link PlayerHistory#sequenceStack sequenceStack}
     */
    clearHistory() {
      this.sequenceStack = [0]
    }

    /**
     * Adds the current project and activity to the top of the history stack.
     */
    push() {
      if (this.player.project !== null && this.player.project.path !== null) {
        const
          ase = this.player.project.activitySequence,
          act = ase.currentAct
        if (act >= 0) {
          if (this.sequenceStack.length > 0) {
            const last = this.sequenceStack[this.sequenceStack.length - 1]
            if (last.projectPath === this.player.project.path && last.activity === act)
              return
          }
          this.sequenceStack.push(
            new this.HistoryElement(
              this.player.project.path,
              ase.getSequenceForElement(act),
              act,
              this.player.zip ? this.player.zip.fullZipPath : null))
        }
      }
    }

    /**
     * Retrieves the {@link PlayerHistory#HistoryElement HistoryElement} placed at the top of the
     * stack (if any) and instructs {@link JClicPlayer} to load it. The obtained effect is to
     * "rewind" or "go back", usually to an activity that acts as a menu.
     * @returns {boolean}
     */
    pop() {
      // todo: check return value
      if (this.sequenceStack.length > 0) {
        const e = this.sequenceStack.pop()
        if (e.projectPath === this.player.project.path &&
          Utils.isEquivalent(e.fullZipPath, this.player.zip ? this.player.zip.fullZipPath : null))
          this.player.load(null, e.activity, null)
        else
          if (this.testMode && e.projectPath !== null && e.projectPath.length > 0)
            Utils.log('info', `At this point, a jump to "${e.projectPath}" should be performed.`)
          else
            this.player.load(e.fullZipPath || e.projectPath, e.activity, null)
      }
      return true
    }

    /**
     *
     * Processes the provided {@link JumpInfo} object, instructing {@link JClicPlayer} to go back,
     * stop or jump to another point in the sequence.
     * @param {JumpInfo} ji - The object to be processed
     * @param {boolean} allowReturn - When this parameter is `true`, the jump instructed by `ji` (if any)
     * will be recorded, thus allowing to return to the current activity.
     * @returns {boolean} - `true` if the jump can be processed without errors, `false` otherwise.
     */
    processJump(ji, allowReturn) {
      let result = false
      if (ji !== null && this.player.project !== null) {
        switch (ji.action) {
          case 'STOP':
            break
          case 'RETURN':
            if (this.sequenceStack.length > 0 || !this.player.options.returnAsExit) {
              result = this.pop()
              break
            }
          case 'EXIT':
            if (this.testMode)
              Utils.log('info', 'At this point, the program should exit.')
            else
              this.player.exit(ji.sequence)
            break
          case 'JUMP':
            if (!ji.sequence && !ji.projectPath) {
              const ase = this.player.project.activitySequence.getElement(ji.actNum, true)
              if (ase !== null) {
                if (allowReturn)
                  this.push()
                this.player.load(null, null, ase.activityName)
                result = true
              }
            } else {
              if (this.testMode && ji.projectPath !== null && ji.projectPath.length > 0) {
                Utils.log('info', `At this point, a jump to "${ji.projectPath}" should be performed.`)
              } else {
                result = this.jumpToSequence(ji.sequence,
                  ji.projectPath ? Utils.getPath(this.player.project.basePath, ji.projectPath) : null,
                  allowReturn)
              }
            }
            break
        }
      }
      return result
    }

    /**
     * Performs a jump to the specified sequence
     * @param {string} sequence - The {@link ActivitySequence} tag to jump to.
     * @param {?string} path - When not `null`, indicates a new project file that must be loaded.
     * Otherwise, the `sequence` parameter refers to a tag on the {@link ActivitySequence} of the
     * current project.
     * @param {boolean} allowReturn - When this parameter is `true`, the jump will be recorded, thus
     * allowing to return to the current activity.
     */
    jumpToSequence(sequence, path, allowReturn) {
      if (Utils.isNullOrUndef(sequence) && Utils.isNullOrUndef(path))
        return false
      if (Utils.isNullOrUndef(path))
        path = this.player.project.path
      if (this.sequenceStack.length > 0) {
        const e = this.sequenceStack[this.sequenceStack.length - 1]
        if (!Utils.isNullOrUndef(sequence) && path === e.projectPath) {
          let same = sequence === e.sequence
          if (path === this.player.project.path) {
            const ase = this.player.project.activitySequence.getElement(e.activity, false)
            same = ase !== null && sequence === ase.tag
          }
          if (same)
            return this.pop()
        }
      }
      if (allowReturn)
        this.push()
      if (path === this.player.project.path)
        this.player.load(null, sequence, null)
      else
        this.player.load(path, sequence, null)
      return true
    }
  }

  Object.assign(PlayerHistory.prototype, {
    /**
     * The {@link JClicPlayer} object to which this `PlayerHistory` belongs
     * @name PlayerHistory#player
     * @type {JClicPlayer} */
    player: null,
    /**
     * This is the main member of the class. PlayerHistory puts and retrieves
     * on it information about the proects and activities done by the current user.
     * @name PlayerHistory#sequenceStack
     * @type {PlayerHistory#HistoryElement[]} */
    sequenceStack: [],
    /**
     * When in test mode, jumps are only simulated.
     * @name PlayerHistory#testMode
     * @type {boolean} */
    testMode: false,
    /**
     * When true, JClic history is in sync with browser history
     * @name PlayerHistory#browserHistory
     * @type {boolean} */
    browserHistory: false,
    /**
     * When true, a window.history event is currently being processed, so window.pushState should not be performed
     * @name PlayerHistory#processingPop
     * @type {boolean} */
    processingPop: false,
    /**
     * Inner class used to store history elements.
     * @name PlayerHistory#HistoryElement
     * @class
     */
    HistoryElement: class {
      /**
       * HistoryElement constructor
       * @param {string} projectPath - The full path of the project file
       * @param {?string} sequence - The nearest sequence tag
       * @param {number} activity - The index of the current activity on the project's {@link ActivitySequence}
       * @param {?type} fullZipPath - If `projectPath` resides in a {@link external:JSZip JSZip} object,
       * the full path of the zip file.
       */
      constructor(projectPath, sequence, activity, fullZipPath) {
        this.projectPath = projectPath
        this.sequence = sequence
        this.activity = activity
        this.fullZipPath = fullZipPath
      }
    }
  })

  return PlayerHistory
})
