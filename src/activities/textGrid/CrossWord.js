/**
 *  File    : activities/textGrid/CrossWord.js
 *  Created : 17/06/2015
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
 *  (c) 2000-2019 Educational Telematic Network of Catalonia (XTEC)
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

/* global window */

import $ from 'jquery';
import Activity from '../../Activity';
import BoxBase from '../../boxes/BoxBase';
import BoxBag from '../../boxes/BoxBag';
import TextGrid from '../../boxes/TextGrid';
import AbstractBox from '../../boxes/AbstractBox';
import ActiveBox from '../../boxes/ActiveBox';
import AWT from '../../AWT';
import Utils from '../../Utils';

const K = Utils.settings;

/**
 * This class of {@link Activity} shows a {@link TextGrid} initially empty, with some cells
 * marked in negative color that act as word stoppers. A blinking "cursor" indicates the cell that
 * will receive the next character entered by the user on the keyboard.
 *
 * The letter in each cell of the grid is always shared by two words: one in horizontal direction
 * and the other one in vertical direction. Two {@link ActiveBox} objects are placed next to the
 * {@link TextGrid}, hosting the definitions of the horizontal and vertical words crossing at the
 * cell currently marked by the cursor.
 *
 * Two special buttons placed near this boxes allow to write on the grid horizontally or vertically.
 * The aim of the activity is to fill all the text grid with the correct words.
 * @exports CrossWord
 * @class
 * @extends Activity
 */
export class CrossWord extends Activity {
  /**
   * CrossWord constructor
   * @param {JClicProject} project - The JClic project to which this activity belongs
   */
  constructor(project) {
    super(project);
  }

  /**
   * Retrieves the minimum number of actions needed to solve this activity
   * @override
   * @returns {number}
   */
  getMinNumActions() {
    return this.tgc.getNumChars() - this.tgc.countWildChars();
  }

  /**
   * Crossword activities always make use of the keyboard
   * @override
   * @returns {boolean}
   */
  needsKeyboard() {
    return true;
  }
}

Object.assign(CrossWord.prototype, {
  /**
   * Whether all letters of the {@link TextGrid} should be displayed in upper case
   * @name CrossWord#upperCase
   * @type {boolean} */
  upperCase: true,
  /**
   * Whether the case is significant to evaluate answers
   * @name CrossWord#checkCase
   * @type {boolean} */
  checkCase: true,
  /**
   * When `true`, the wildcard character of the {@link TextGrid} will be transparent.
   * @name CrossWord#wildTransparent
   * @type {boolean} */
  wildTransparent: false,
});

/**
 * The {@link ActivityPanel} where {@link CrossWord} activities are played.
 * @class
 * @extends ActivityPanel
 */
export class CrossWordPanel extends Activity.Panel {
  /**
   * CrossWordPanel constructor
   * @param {Activity} act - The {@link Activity} to which this Panel belongs
   * @param {JClicPlayer} ps - Any object implementing the methods defined in the
   * [PlayStation](http://projectestac.github.io/jclic/apidoc/edu/xtec/jclic/PlayStation.html)
   * Java interface.
   * @param {external:jQuery} [$div] - The jQuery DOM element where this Panel will deploy
   */
  constructor(act, ps, $div) {
    super(act, ps, $div);
  }

  /**
   * Performs miscellaneous cleaning operations
   * @override
   */
  clear() {
    if (this.grid) {
      this.grid.end();
      this.grid = null;
    }
    if (this.style) {
      this.style.end();
      this.style = null;
    }
  }

  /**
   * Creates a {@link BoxBag} with a label ("Horizontal" or "Vertical") and an {@link ActiveBox}
   * that will be used to display clues.
   * @param {string} type - `acrossClues` for horizontal clues, 'downClues' for vertical.
   * @returns {BoxBag}
   */
  createBoxBag(type) {
    const
      bxb = new BoxBag(null, this, null),
      sb = new AbstractBox(bxb, this, this.icoBB);

    sb.setBounds(0, 0, this.LABEL_WIDTH, this.act.abc[type].h);
    const $btn = $('<button/>', { class: 'StockBtn' }).css({
      'width': this.LABEL_WIDTH,
      'height': this.act.abc[type].h,
      'background-image': `url(${type === 'acrossClues' ? this.hIcon : this.vIcon})`,
      'background-repeat': 'no-repeat',
      'background-position': 'center',
      'border-radius': 6,
      'z-index': 10
    }).click(() => {
      this.advance = type === 'acrossClues' ?
        this.advance === 'ADVANCE_RIGHT' ?
          'NO_ADVANCE' : 'ADVANCE_RIGHT' :
        this.advance === 'ADVANCE_DOWN' ?
          'NO_ADVANCE' : 'ADVANCE_DOWN';
      this.setBtnStatus();
    }).on('keypress', event => {
      if (String.fromCharCode(event.charCode || event.keyCode) === ' ')
        event.stopPropagation();
    }).appendTo(this.$div);

    sb.setHostedComponent($btn);
    bxb.addBox(sb);

    const ab = new ActiveBox(bxb, null, null, type, new AWT.Rectangle(this.LABEL_WIDTH + this.act.margin, 0, this.act.abc[type].w, this.act.abc[type].h));
    bxb.addBox(ab);
    bxb.setBoxBase(this.act.abc[type].style);

    if (type === 'acrossClues') { // Horizontal
      this.hClue = ab;
      this.hClueBtn = sb;
    } else {
      this.vClue = ab;
      this.vClueBtn = sb;
    }
    return bxb;
  }

  /**
   * Prepares the visual components of the activity
   * @override
   */
  buildVisualComponents() {
    if (this.firstRun)
      super.buildVisualComponents();
    this.clear();

    const
      tgc = this.act.tgc,
      abcH = this.act.abc['acrossClues'],
      abcV = this.act.abc['downClues'];

    if (abcH.image)
      abcH.setImgContent(this.act.project.mediaBag, null, false);
    if (abcV.image)
      abcV.setImgContent(this.act.project.mediaBag, null, false);

    if (this.act.acp !== null) {
      this.act.acp.generateContent(0, 0, this.act.abc, false);
    }

    if (tgc) {
      this.grid = TextGrid.createEmptyGrid(null, this, this.act.margin, this.act.margin, tgc, this.act.wildTransparent);
      this.style = new BoxBag(null, this, null);
      const
        bxbh = this.createBoxBag('acrossClues'),
        bxbv = this.createBoxBag('downClues');
      if (this.act.boxGridPos === 'AUB' || this.act.boxGridPos === 'BUA')
        bxbv.moveTo(new AWT.Point(bxbh.dim.width + this.act.margin, 0));
      else
        bxbv.moveTo(new AWT.Point(0, bxbh.dim.height + this.act.margin));
      this.style.addBox(bxbh);
      this.style.addBox(bxbv);
      this.grid.setVisible(true);
      this.style.setVisible(true);
    }
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

    if (this.grid) {
      this.grid.setChars(this.act.tgc.text);
      this.numLetters = this.act.getMinNumActions();
      this.grid.setCellAttributes(true, true);
      this.grid.setCursorEnabled(true);
      this.setCursorAt(0, 0);
      this.advance = 'ADVANCE_RIGHT';
      this.setBtnStatus();
      this.setAndPlayMsg('initial', 'start');
      this.invalidate().update();
      this.$div.attr("tabindex", 0);
      this.$div.focus();
      this.playing = true;
    }
  }

  /**
   * Calculates the current score
   * @returns {number}
   */
  getCurrentScore() {
    return this.grid ? this.grid.countCoincidences(this.act.checkCase) : 0;
  }

  /**
   * Updates the graphic content of this panel.
   * This method will be called from {@link AWT.Container#update} when needed.
   * @override
   * @param {AWT.Rectangle} dirtyRegion - Specifies the area to be updated. When `null`,
   * it's the whole panel.
   */
  updateContent(dirtyRegion) {
    super.updateContent(dirtyRegion);
    if (this.grid && this.$canvas) {
      const
        canvas = this.$canvas.get(-1),
        ctx = canvas.getContext('2d');
      if (!dirtyRegion)
        dirtyRegion = new AWT.Rectangle(0, 0, canvas.width, canvas.height);
      ctx.clearRect(dirtyRegion.pos.x, dirtyRegion.pos.y, dirtyRegion.dim.width, dirtyRegion.dim.height);
      this.grid.update(ctx, dirtyRegion);
      this.style.update(ctx, dirtyRegion);
    }
    return this;
  }

  /**
   * Sets the real dimension of this panel.
   * @override
   * @param {AWT.Dimension} preferredMaxSize - The maximum surface available for the activity panel
   * @returns {AWT.Dimension}
   */
  setDimension(preferredMaxSize) {
    return !this.grid || !this.style || this.getBounds().equals(preferredMaxSize) ?
      preferredMaxSize :
      BoxBag.layoutDouble(preferredMaxSize, this.grid, this.style, this.act.boxGridPos, this.act.margin);
  }

  /**
   * Sets the size and position of this activity panel
   * @override
   * @param {AWT.Rectangle} rect
   */
  setBounds(rect) {
    if (this.$canvas) {
      this.$canvas.remove();
      this.$canvas = null;
    }
    super.setBounds(rect);

    if (this.grid) {
      // Create the main canvas
      this.$canvas = $(`<canvas width="${rect.dim.width}" height="${rect.dim.height}"/>`).css({
        position: 'absolute',
        top: 0,
        left: 0
      });
      this.$div.append(this.$canvas);
      // Repaint all
      this.invalidate().update();
    }
  }

  /**
   * Main handler used to process mouse, touch, keyboard and edit events
   * @override
   * @param {HTMLEvent} event - The HTML event to be processed
   * @returns {boolean} - When this event handler returns `false`, jQuery will stop its
   * propagation through the DOM tree. See: {@link http://api.jquery.com/on}
   */
  processEvent(event) {
    if (this.playing) {
      switch (event.type) {
        case 'click':
          //
          // The [AWT.Point](AWT.html#Point) where the mouse or touch event has been originated
          // Touch events can have more than one touch, so `pageX` must be obtained from `touches[0]`
          const
            x = event.originalEvent && event.originalEvent.touches ? event.originalEvent.touches[0].pageX : event.pageX,
            y = event.originalEvent && event.originalEvent.touches ? event.originalEvent.touches[0].pageY : event.pageY,
            p = new AWT.Point(x - this.$div.offset().left, y - this.$div.offset().top),
            // Array to be filled with actions to be executed at the end of event processing
            delayedActions = [];

          this.ps.stopMedia(1);
          if (this.grid.contains(p)) {
            const pt = this.grid.getLogicalCoords(p);
            if (pt !== null) {
              this.setCursorAt(pt.x, pt.y);
              if (K.TOUCH_DEVICE) {
                // We are in a touch device, so prompt user to write text:
                const d = this.advance === 'ADVANCE_DOWN';
                const txt = window.prompt(`${d ? 'Vertical' : 'Horizontal'} word:`, '');
                this.writeChars(txt);
              }
            }
          } else if (this.hClue.contains(p))
            this.hClue.playMedia(this.ps, delayedActions);
          else if (this.vClue.contains(p))
            this.vClue.playMedia(this.ps, delayedActions);
          else
            break;

          this.update();
          delayedActions.forEach(action => action());
          break;

        case 'keypress':
          const code = event.charCode || event.keyCode;
          if (code && this.grid.getCursor()) {
            event.preventDefault();
            this.writeChars(String.fromCharCode(code));
          }
          break;

        case 'keydown':
          let dx = 0, dy = 0;
          switch (event.keyCode) {
            case K.VK.RIGHT:
              dx = 1;
              break;
            case K.VK.LEFT:
              dx = -1;
              break;
            case K.VK.DOWN:
              dy = 1;
              break;
            case K.VK.UP:
              dy = -1;
              break;
          }
          if (dx || dy) {
            event.preventDefault();
            this.moveCursor(dx, dy);
            this.update();
          }
          break;
      }
    }
  }

  /**
   * Moves the cursor the specified `dx` and `dy` amount (in logical coordinates)
   * @param {number} dx - Amount of cells to horizontally move on
   * @param {number} dy - Amount of cells to vertically move on
   */
  moveCursor(dx, dy) {
    if (this.grid) {
      this.grid.moveCursor(dx, dy, true);
      this.cursorPosChanged();
    }
  }

  /**
   * Places the cursor at the specified location (in logical coordinates)
   * @param {number} x
   * @param {number} y
   */
  setCursorAt(x, y) {
    this.grid.setCursorAt(x, y, true);
    this.cursorPosChanged();
  }

  /**
   * Method called when the cursor moves to a different location
   */
  cursorPosChanged() {
    const pt = this.grid.getCursor();
    if (pt !== null && this.style !== null) {
      const items = this.grid.getItemFor(pt.x, pt.y);
      if (items !== null) {
        this.hClue.setContent(this.act.abc['acrossClues'].getActiveBoxContentWith(pt.y, items.x));
        this.vClue.setContent(this.act.abc['downClues'].getActiveBoxContentWith(pt.x, items.y));
      }
    }
  }

  /**
   * Writes a string on the grid starting at the current cursor position and
   * following the direction marked by the `advance` field
   * @param {string} txt - Text to write
   */
  writeChars(txt) {
    if (txt && txt.length > 0) {
      for (let i = 0; i < txt.length; i++) {
        const cur = this.grid.getCursor();
        let ch = txt.charAt(i);
        if (this.act.upperCase)
          ch = ch.toLocaleUpperCase();
        this.grid.setCharAt(cur.x, cur.y, ch);
        const
          ok = this.grid.isCellOk(cur.x, cur.y, this.act.checkCase),
          r = this.getCurrentScore();
        this.ps.reportNewAction(this.act, 'WRITE', ch, `X:${cur.x} Y:${cur.y}`, ok, r);
        // End activity or play event sound
        if (r === this.numLetters) {
          this.grid.setCursorEnabled(false);
          this.grid.stopCursorBlink();
          this.finishActivity(true);
        } else {
          this.playEvent('click');
          if (this.advance === 'ADVANCE_DOWN')
            this.moveCursor(0, 1);
          else if (this.advance === 'ADVANCE_RIGHT')
            this.moveCursor(1, 0);
        }
      }
    }
    this.update();
  }

  /**
   * Sets the status of horizontal and vertical buttons based on the value of `advance`
   */
  setBtnStatus() {
    if (this.hClueBtn)
      this.hClueBtn.setInactive(this.advance !== 'ADVANCE_RIGHT');
    if (this.vClueBtn)
      this.vClueBtn.setInactive(this.advance !== 'ADVANCE_DOWN');
  }
}

Object.assign(CrossWordPanel.prototype, {
  /**
   * The default width of the 'Horizontal' and 'Vertical' buttons (currently 40 pixels)
   * @name CrossWordPanel#LABEL_WIDTH
   * @type {number} */
  LABEL_WIDTH: 40,
  /**
   * The text grid of this ActivityPanel
   * @name CrossWordPanel#grid
   * @type {textGrid} */
  grid: null,
  /**
   * A BoxBag used to place the across and down clues, and the `toggle direction` button.
   * @name CrossWordPanel#style
   * @type {BoxBag} */
  style: null,
  /**
   * The total number of letters of this cross word
   * @name CrossWordPanel#numLetters
   * @type {number} */
  numLetters: 0,
  /**
   * Flag indicating the type of automatic advance of the cursor.
   * Possible values are: `NO_ADVANCE` (default), 'ADVANCE_RIGHT' and 'ADVANCE_DOWN'.
   * TODO: Implement 'ADVANCE_LEFT' for LTR languages
   * @name CrossWordPanel#advance
   * @type {string} */
  advance: 'NO_ADVANCE',
  /**
   * The ActiveBox object used to display the 'across' clues
   * @name CrossWordPanel#hClue
   * @type {ActiveBox} */
  hClue: null,
  /**
   * The ActiveBox object used to display the 'down' clues
   * @name CrossWordPanel#vClue
   * @type {ActiveBox} */
  vClue: null,
  /**
   * Button used to set the advance mode to 'ADVANCE_RIGHT'
   * @name CrossWordPanel#hClueBtn
   * @type {ActiveBox} */
  hClueBtn: null,
  /**
   * Button used to set the advance mode to 'ADVANCE_BOTTOM'
   * @name CrossWordPanel#vClueBtn
   * @type {ActiveBox} */
  vClueBtn: null,
  /**
   * Mouse and touch events intercepted by this panel
   * @override
   * @name CrossWordPanel#events
   * @type {string[]} */
  events: ['click', 'keydown', 'keypress'],
  /**
   * Graphic icon for the horizontal direction button, represented as a string containing
   * an SVG file codified in base64.
   * @name CrossWordPanel#hIcon
   * @type {string} */
  hIcon: 'data:image/svg+xml;base64,' +
    'PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIGZpbGw9IiNGRkZGRkYi' +
    'IGhlaWdodD0iMzYiIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjM2IiB4bWxucz0iaHR0cDov' +
    'L3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUi' +
    'PjwvcGF0aD48cGF0aCBkPSJNNiAxMGMtMS4xIDAtMiAuOS0yIDJzLjkgMiAyIDIgMi0uOSAyLTIt' +
    'LjktMi0yLTJ6bTEyIDBjLTEuMSAwLTIgLjktMiAycy45IDIgMiAyIDItLjkgMi0yLS45LTItMi0y' +
    'em0tNiAwYy0xLjEgMC0yIC45LTIgMnMuOSAyIDIgMiAyLS45IDItMi0uOS0yLTItMnoiPjwvcGF0' +
    'aD48L3N2Zz4K',
  /**
   * Graphic icon for the vertical direction button, represented as a string containing
   * an SVG file codified in base64.
   * @name CrossWordPanel#vIcon
   * @type {string} */
  vIcon: 'data:image/svg+xml;base64,' +
    'PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIGZpbGw9IiNGRkZGRkYi' +
    'IGhlaWdodD0iMzYiIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjM2IiB4bWxucz0iaHR0cDov' +
    'L3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUi' +
    'PjwvcGF0aD48cGF0aCBkPSJNMTIgOGMxLjEgMCAyLS45IDItMnMtLjktMi0yLTItMiAuOS0yIDIg' +
    'LjkgMiAyIDJ6bTAgMmMtMS4xIDAtMiAuOS0yIDJzLjkgMiAyIDIgMi0uOSAyLTItLjktMi0yLTJ6' +
    'bTAgNmMtMS4xIDAtMiAuOS0yIDJzLjkgMiAyIDIgMi0uOSAyLTItLjktMi0yLTJ6Ij48L3BhdGg+' +
    'PC9zdmc+Cg==',
  /**
   * Sizes of the icons (currently 36 x 36 pixel)
   * @name CrossWordPanel#icoSize
   * @type {Object} */
  icoSize: { w: 36, h: 36 },
  /**
   * BoxBase with the style to be used by the direction buttons.
   * @name CrossWordPanel#icoBB
   * @type {BoxBase} */
  icoBB: new BoxBase().set('backColor', '#4285F4').set('inactiveColor', '#70A2F6').set('dontFill', true)
});

/**
 * Panel class associated to this type of activity: {@link CrossWordPanel}
 * @type {class} */
CrossWord.Panel = CrossWordPanel;

// Register activity class
export default Activity.registerClass('@textGrid.CrossWord', CrossWord);
