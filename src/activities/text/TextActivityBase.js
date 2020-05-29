/**
 *  File    : activities/text/TextActivityBase.js
 *  Created : 16/05/2015
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

import { $ } from 'jquery';
import Activity from '../../Activity';
import ActiveBox from '../../boxes/ActiveBox';
import BoxBase from '../../boxes/BoxBase';

/**
 * This class and its visual component {@link TextActivityBasePanel} are the base for text
 * activities like {@link FillInBlanks}, {@link IdentifyText}, {@link OrderText} and {@link Complete}.
 * @exports TextActivityBase
 * @class
 * @extends Activity
 */
export class TextActivityBase extends Activity {
  /**
   * TextActivityBase constructor
   * @param {JClicProject} project - The project to which this activity belongs
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
    return this.document ? this.document.numTargets : 0;
  }

  // Class fields

  /**
   * This is the object used to evaluate user's answers in text activities.
   * @name TextActivityBase#ev
   * @type {Evaluator} */
  ev = null;

  /**
   * This is the label used by text activities for the `check` button, when present.
   * @name TextActivityBase#checkButtonText
   * @type {string} */
  checkButtonText = null;

  /**
   * When `true`, a text will be shown before the beginning of the activity.
   * @name TextActivityBase#prevScreen
   * @type {boolean} */
  prevScreen = false;

  /**
   * Optional text to be shown before the beginning of the activity. When `null`, this text is
   * the main document.
   * @name TextActivityBase#prevScreenText
   * @type {string} */
  prevScreenText = null;

  /**
   * The style of the optional text to be shown before the beginning of the activity.
   * @name TextActivityBase#prevScreenStyle
   * @type {BoxBase} */
  prevScreenStyle = null;

  /**
   * Maximum amount of time for showing the previous document.
   * @name TextActivityBase#prevScreenMaxTime
   * @type {number} */
  prevScreenMaxTime = -1;

  /**
   * Panel class associated to this type of activity: {@link TextActivityBasePanel}
   * @type {class} */
  static Panel = TextActivityBasePanel;
}

/**
 * The {@link ActivityPanel} where text activities (based on {@link TextActivityBase}) are played.
 * @class
 * @extends ActivityPanel
 */
export class TextActivityBasePanel extends Activity.Panel {
  /**
   * TextActivityBasePanel constructor
   * @param {Activity} act - The {@link Activity} to which this Panel belongs
   * @param {JClicPlayer} ps - Any object implementing the methods defined in the
   * [PlayStation](http://projectestac.github.io/jclic/apidoc/edu/xtec/jclic/PlayStation.html)
   * Java interface.
   * @param {external:jQuery=} $div - The jQuery DOM element where this Panel will deploy
   */
  constructor(act, ps, $div) {
    super(act, ps, $div);
    this.targets = [];
  }

  /**
   * Fills a jQuery DOM element (usually a 'div') with the specified {@link TextActivityDocument}.
   * @param {external:jQuery} $div - The jQuery DOM object to be filled with the document.
   * @param {TextActivityDocument} doc - The document
   */
  setDocContent($div, doc) {

    // Empties the container of any pre-existing content
    // and sets the background and other attributes indicated by the main
    // style of the document.
    // It also sets the 'overflow' CSS attribute to 'auto', which will display a
    // vertical scroll bar when needed
    $div.empty().css(doc.style['default'].css).css({ display: 'flex', 'flex-direction': 'column' });

    const $scroller = $('<div/>').css({ 'flex-grow': 1, overflow: 'auto' });
    const $doc = $('<div/>', { class: 'JClicTextDocument' }).css({ 'padding': 4 }).css(doc.style['default'].css);

    let currentPStyle = null;
    const popupSpans = [];

    //
    // Process paragraphs
    doc.p.forEach(p => {
      // Creates a new DOM paragraph
      const $p = $('<p/>').css({ margin: 0 });
      let empty = true;

      // Check if the paragraph has its own style
      if (p.style) {
        currentPStyle = doc.style[p.style].css;
        $p.css(currentPStyle);
      } else
        currentPStyle = null;

      // Check if the paragraph has a special alignment
      if (p.Alignment) {
        const al = Number(p.Alignment);
        $p.css({ 'text-align': al === 1 ? 'center' : al === 2 ? 'right' : 'left' });
      }

      // Process the paragraph elements
      p.elements.forEach(element => {
        // Elements will be inserted as 'span' DOM elements, or as simple text if they don't
        // have specific attributes.
        let $span = $('<span/>');
        switch (element.objectType) {
          case 'text':
            if (element.attr) {
              // Text uses a specific style and/or individual attributes
              $span.html(element.text);
              if (element.attr.style) {
                $span.css(doc.style[element.attr.style].css);
              }
              if (element.attr.css) {
                $span.css(element.attr.css);
              }
              $p.append($span);
            } else {
              $p.append(element.text);
            }
            break;

          case 'cell':
            // Create a new ActiveBox based on this ActiveBoxContent
            const box = ActiveBox.createCell($span.css({ position: 'relative' }), element);
            $span.css({ 'display': 'inline-block', 'vertical-align': 'middle' });
            if (element.mediaContent) {
              $span.on('click', event => {
                event.preventDefault();
                this.ps.stopMedia(1);
                box.playMedia(this.ps);
                return false;
              });
            }
            $p.append($span);
            break;

          case 'target':
            if (this.showingPrevScreen) {
              $span.text(element.text);
              $p.append($span);
              break;
            }

            const target = element;
            let $popup = null;
            // Process target popups
            if (target.infoMode !== 'no_info' && target.popupContent) {
              $popup = $('<span/>').css({ position: 'absolute', 'padding-top': '2pt', display: 'none' });
              // Create a new ActiveBox based on popupContent
              const popupBox = ActiveBox.createCell($popup, target.popupContent);
              if (target.popupContent.mediaContent) {
                $popup.on('click', event => {
                  event.preventDefault();
                  this.ps.stopMedia(1);
                  if (popupBox)
                    popupBox.playMedia(this.ps);
                  else if (target.popupContent.mediaContent)
                    this.ps.playMedia(target.popupContent.mediaContent);
                  return false;
                });
              }
              target.$popup = $popup;
              // Save for later setting of top-margin
              popupSpans.push({ p: $p, span: $popup, box: popupBox });
            }

            $span = this.$createTargetElement(target, $span);
            target.num = this.targets.length;
            target.pos = target.num;
            this.targets.push(target);
            if ($span) {
              $span.css(doc.style['default'].css);
              if (currentPStyle)
                $span.css(currentPStyle);
              if (this.targetsMarked) {
                if (target.attr) {
                  // Default style name for targets is 'target'
                  if (!target.attr.style)
                    target.attr.style = 'target';
                  $span.css(doc.style[target.attr.style].css);
                  // Check if target has specific attributes
                  if (target.attr.css)
                    $span.css(target.attr.css);
                } else if (doc.style['target'])
                  $span.css(doc.style['target'].css);
              } else {
                target.targetStatus = 'HIDDEN';
              }

              // Catch on-demand popups with `F1`, cancel with `Escape`
              if ($popup !== null && target.infoMode === 'onDemand') {
                $span.keydown(ev => {
                  if (ev.key === target.popupKey) {
                    ev.preventDefault();
                    this.showPopup($popup, target.popupMaxTime, target.popupDelay);
                  } else if (ev.key === 'Escape') {
                    ev.preventDefault();
                    this.showPopup(null);
                  }
                });
              }
            }

            if ($popup && $span) {
              if (target.isList)
                $p.append($span).append($popup);
              else
                $p.append($popup).append($span);
            } else if ($span)
              $p.append($span);

            target.$p = $p;
            break;
        }
        empty = false;
      });
      if (empty)
        // Don't leave paragraphs empty
        $p.html('&nbsp;');

      // Adds the paragraph to the DOM element
      $doc.append($p);
    });

    $div.append($scroller.append($doc));

    if (this.act.checkButtonText && !this.showingPrevScreen) {
      this.$checkButton = $('<button/>', { class: 'StockBtn' })
        .html(this.act.checkButtonText)
        .css({ width: '100%', 'flex-shrink': 0 })
        .on('click', () => this.evaluatePanel());
      $div.append(this.$checkButton);
    }

    // Place popups below its target baseline
    popupSpans.forEach(pspan => pspan.span.css({ 'margin-top': pspan.p.css('font-size') }));

    // Init Evaluator
    if (this.act.ev)
      this.act.ev.init(this.act.project.settings.locales);

    return $div;
  }

  /**
   * Creates a target DOM element.
   * This method can be overridden in subclasses to create specific types of targets.
   * @param {TextActivityDocument.TextTarget} target - The target related to the DOM object to be created
   * @param {external:jQuery} $span -  - An initial DOM object (usually a `span`) that can be used
   * to store the target, or replaced by another type of object.
   * @returns {external:jQuery} - The jQuery DOM element loaded with the target data.
   */
  $createTargetElement(target, $span) {
    $span.text(target.text);
    target.$span = $span;
    return $span;
  }

  /**
   * Basic initialization procedure, common to all activities.
   * @override
   */
  initActivity() {
    if (this.act.prevScreen)
      this.preInitActivity();
    else
      this.startActivity();
  }

  /**
   * Called when the activity starts playing
   * @override
   */
  startActivity() {
    super.initActivity();
    this.setAndPlayMsg('initial', 'start');
    this.setDocContent(this.$div, this.act.document);
    this.playing = true;
  }

  /**
   * Called when the text activity has a 'previous screen' information to be shown before the
   * activity starts
   */
  preInitActivity() {
    if (!this.act.prevScreen)
      return;

    const prevScreenEnd = () => {
      this.showingPrevScreen = false;
      this.$div.unbind('click');
      if (this.prevScreenTimer) {
        window.clearTimeout(this.prevScreenTimer);
        this.prevScreenTimer = null;
      }
      this.startActivity();
      return true;
    };

    this.showingPrevScreen = true;
    this.$div.empty();

    if (!this.act.prevScreenText) {
      this.setDocContent(this.$div, this.act.document);
    } else {
      if (!this.act.prevScreenStyle)
        this.act.prevScreenStyle = new BoxBase();
      this.$div.css(this.act.prevScreenStyle.getCSS()).css('overflow', 'auto');
      const $html = $('<div/>', { class: 'JClicTextDocument' })
        .css({ 'padding': 4 })
        .css(this.act.prevScreenStyle.getCSS())
        .append(this.act.prevScreenText);
      this.$div.append($html);
    }

    this.enableCounters(true, false, false);
    this.ps.setCounterValue('time', 0);

    this.ps.setMsg(this.act.messages['previous']);

    if (this.act.prevScreenMaxTime > 0) {
      this.ps.setCountDown('time', this.act.prevScreenMaxTime);
      this.prevScreenTimer = window.setTimeout(prevScreenEnd, this.act.prevScreenMaxTime * 1000);
    }

    this.$div.on('click', prevScreenEnd);
    this.ps.playMsg();
  }

  /**
   * Called when the user clicks on the check button
   * @returns {boolean} - `true` when the panel is OK, `false` otherwise.
   */
  evaluatePanel() {
    this.finishActivity(true);
    return true;
  }

  /**
   * Ordinary ending of the activity, usually called form `processEvent`
   * @override
   * @param {boolean} result - `true` if the activity was successfully completed, `false` otherwise
   */
  finishActivity(result) {
    if (this.$checkButton)
      this.$checkButton.prop('disabled', true);
    this.targets.forEach(t => {
      if (t.$comboList)
        t.$comboList.attr('disabled', true);
    });
    this.showPopup(null);
    super.finishActivity(result);
  }

  /**
   * Main handler used to process mouse, touch, keyboard and edit events
   * @override
   * @param {HTMLEvent} _event - The HTML event to be processed
   * @returns {boolean=} - When this event handler returns `false`, jQuery will stop its
   * propagation through the DOM tree. See: {@link http://api.jquery.com/on}
   */
  processEvent(_event) {
    return this.playing;
  }

  /**
   * @param {external:jQuery} $popup - The popup to display, or _null _ to just hide the current popup
   * @param {number} maxTime - The maximum time to mantain the popup on screen, in seconds
   * @param {number} waitTime - When set, indicates the number of seconds to wait before show the popup
   */
  showPopup($popup, maxTime, waitTime) {
    // Hide current popup
    if (this.$currentPopup) {
      this.$currentPopup.css({ display: 'none' });
      this.$currentPopup = null;
      if (this.currentPopupTimer) {
        window.clearTimeout(this.currentPopupTimer);
        this.currentPopupTimer = 0;
      }
    }

    // Clear popupWaitTimer
    if (this.popupWaitTimer) {
      window.clearTimeout(this.popupWaitTimer);
      this.popupWaitTimer = 0;
    }

    // Prepare popup timer
    if (waitTime) {
      this.popupWaitTimer = window.setTimeout(() => {
        this.showPopup($popup, maxTime);
      }, waitTime * 1000);
      return;
    }

    if ($popup) {
      $popup.css({ display: '' });
      $popup.click();

      this.$currentPopup = $popup;
      if (maxTime) {
        this.currentPopupTimer = window.setTimeout(() => {
          $popup.css({ display: 'none' });
          if (this.$currentPopup === $popup) {
            this.$currentPopup = null;
            this.currentPopupTimer = 0;
          }
        }, maxTime * 1000);
      }
    }
  }

  // Class fields

  /**
   * Array of jQuery DOM elements (usually of type 'span') containing the targets of this activity
   * @name TextActivityBasePanel#targets
   * @type {external:jQuery[]} */
  targets = null;

  /**
   * Flag indicating if targets must be visually marked at the beginning of the activity.
   * Should be `true` except for {@link IdentifyText} activities.
   * @name TextActivityBasePanel#targetsMarked
   * @type {boolean} */
  targetsMarked = true;

  /**
   * The button used to check the activity, only when `Activity.checkButtonText` is not null
   * @name TextActivityBasePanel#$checkButton
   * @type {external:jQuery}*/
  $checkButton = null;

  /**
   * System timer used to close the previous document when act.maxTime is reached.
   * @name TextActivityBasePanel#prevScreenTimer
   * @type {number} */
  prevScreenTimer = null;

  /**
   * The popup currently been displayed
   * @name TextActivityBasePanel#$currentPopup
   * @type {external:jQuery} */
  $currentPopup = null;

  /**
   * A timer controlling the time the current popup will be displayed
   * @name TextActivityBasePanel#currentPopupTimer
   * @type {number} */
  currentPopupTimer = 0;

  /**
   * A timer prepared to display a popup after a while
   * @name TextActivityBasePanel#popupWaitTimer
   * @type {number} */
  popupWaitTimer = 0;
}

export default TextActivityBase;
