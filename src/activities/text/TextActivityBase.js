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
  "../../AWT",
  "../../boxes/ActiveBox",
  "../../boxes/BoxBase"
], function ($, Activity, AWT, ActiveBox, BoxBase) {

  /**
   * This class and its visual component {@link TextActivityBase.Panel} are the base for text
   * activities like {@link FillInBlanks}, {@link IdentifyText}, {@link OrderText} and {@link Complete}.
   * @exports TextActivityBase
   * @class
   * @extends Activity
   * @param {JClicProject} project - The project to which this activity belongs
   */
  var TextActivityBase = function (project) {
    Activity.call(this, project);
  };

  TextActivityBase.prototype = {
    constructor: TextActivityBase,
    /**
     * This is the object used to evaluate user's answers in text activities.
     * @type {Evaluator} */
    ev: null,
    /**
     * This is the label used by text activities for the `check` button, when present.
     * @type {string} */
    checkButtonText: null,
    /**
     * When `true`, a text will be shown before the beginning of the activity.
     * @type {boolean} */
    prevScreen: false,
    /**
     * Optional text to be shown before the beginning of the activity. When `null`, this text is
     * the main document.
     * @type {string} */
    prevScreenText: null,
    /**
     * The style of the optional text to be shown before the beginning of the activity.
     * @type {BoxBase} */
    prevScreenStyle: null,
    /**
     * Maximum amount of time for showing the previous document text activities.
     * @type {number} */
    prevScreenMaxTime: -1,
    /**
     *
     * Retrieves the minimum number of actions needed to solve this activity
     * @returns {number}
     */
    getMinNumActions: function () {
      return this.document ? this.document.numTargets : 0;
    }
  };

  // TextActivityBase extends Activity
  TextActivityBase.prototype = $.extend(Object.create(Activity.prototype), TextActivityBase.prototype);

  /**
   * The {@link Activity.Panel} where text activities are played.
   * @class
   * @extends Activity.Panel
   * @param {Activity} act - The {@link Activity} to which this Panel belongs
   * @param {JClicPlayer} ps - Any object implementing the methods defined in the
   * [PlayStation](http://projectestac.github.io/jclic/apidoc/edu/xtec/jclic/PlayStation.html)
   * Java interface.
   * @param {external:jQuery=} $div - The jQuery DOM element where this Panel will deploy
   */
  TextActivityBase.Panel = function (act, ps, $div) {
    Activity.Panel.call(this, act, ps, $div);
    this.boxes = [];
    this.popups = [];
    this.targets = [];
  };

  var ActPanelAncestor = Activity.Panel.prototype;
  TextActivityBase.Panel.prototype = {
    constructor: TextActivityBase.Panel,
    /**
     * Array of ActiveBox objects contained in this Panel
     * @type {ActiveBox[]} */
    boxes: null,
    /**
     * Array of ActiveBox objects used as pop-up elements
     * @type {ActiveBox[]} */
    popups: null,
    /**
     * Array of jQuery DOM elements (usually of type 'span') containing the targets of this activity
     * @type {external.jQuery[]} */
    targets: null,
    /**
     * Flag indicating if targets must be visually marked at the beginning of the activity.
     * Should be `true` except for {@link IdentifyText} activities.
     * @type {boolean} */
    targetsMarked: true,
    /**
     * The button used to check the activity, only when `Activity.checkButtonText` is not null
     * @type {external:jQuery}*/
    $checkButton: null,
    /**
     *
     * Prepares the text panel
     */
    buildVisualComponents: function () {
      ActPanelAncestor.buildVisualComponents.call(this);
    },
    /**
     *
     * Fills a jQuery DOM element (usually a 'div') with the specified {@link TextActivityDocument}.
     * @param {external:jQuery} $dom - The jQuery DOM object to be filled with the document.
     * @param {TextActivityDocument} doc - The document
     */
    setDocContent: function ($dom, doc) {

      var panel = this;

      //
      // Empties the container of any pre-existing content
      // and sets the background and other attributes indicated by the main
      // style of the document.
      // It also sets the 'overflow' CSS attribute to 'auto', which will display a
      // vertical scroll bar when needed
      $dom.empty().css(doc.style['default'].css).css('overflow', 'auto');

      var $html = $('<div/>', { class: 'JClicTextDocument' }).css({ 'padding': 4 });

      //
      // Sets the default style
      $html.css(doc.style['default'].css);

      var currentPStyle = null;

      //
      // Process paragraphs
      $.each(doc.p, function () {
        // Creates a new DOM paragraph
        var $p = $('<p/>').css({ margin: 0 });
        var empty = true;

        // Check if the paragraph has its own style
        if (this.style) {
          currentPStyle = doc.style[this.style].css;
          $p.css(currentPStyle);
        } else
          currentPStyle = null;

        // Check if the paragraph has a special alignment
        if (this.Alignment) {
          var al = Number(this.Alignment);
          $p.css({ 'text-align': al === 1 ? 'center' : al === 2 ? 'right' : 'left' });
        }

        // Process the paragraph elements
        $.each(this.elements, function () {
          // Elements will be inserted as 'span' DOM elements, or as simple text if they don't
          // have specific attributes.
          var $span = $('<span/>');
          switch (this.objectType) {
            case 'text':
              if (this.attr) {
                // Text uses a specific style and/or individual attributes
                $span.html(this.text);
                if (this.attr.style) {
                  $span.css(doc.style[this.attr.style].css);
                }
                if (this.attr.css) {
                  $span.css(this.attr.css);
                }
                $p.append($span);
              } else {
                $p.append(this.text);
              }
              break;

            case 'cell':
              // Create a new ActiveBox based on this ActiveBoxContent
              var box = ActiveBox.createCell($span.css({ position: 'relative' }), this);
              // Save the box for future references
              panel.boxes.push(box);
              $span.css({ 'display': 'inline-block', 'vertical-align': 'middle' });
              if (this.mediaContent) {
                $span.on('click', function (event) {
                  event.preventDefault();
                  panel.ps.stopMedia(1);
                  box.playMedia(panel.ps);
                  return false;
                });
              }
              $p.append($span);
              break;

            case 'target':
              if (panel.showingPrevScreen) {
                $span.text(this.text);
                $p.append($span);
                break;
              }

              var target = this;
              $span = panel.$createTargetElement(target, $span);
              target.num = panel.targets.length;
              target.pos = target.num;
              panel.targets.push(target);
              if ($span) {
                $span.css(doc.style['default'].css);
                if (currentPStyle)
                  $span.css(currentPStyle);
                if (panel.targetsMarked) {
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
                $p.append($span);
              }
              target.$p = $p;
              break;
          }
          empty = false;
        });
        if (empty) {
          // Don't leave paragraphs empty
          $p.html('&nbsp;');
        }

        // Adds the paragraph to the DOM element
        $html.append($p);
      });

      $dom.append($html);

      if (this.act.checkButtonText && !this.showingPrevScreen) {
        this.$checkButton = $('<button/>', { class: 'StockBtn' })
          .html(this.act.checkButtonText)
          .css({ position: 'absolute', bottom: '0', left: '0', width: '100%' })
          .on('click', function () {
            panel.evaluatePanel();
          });
        $dom.append(this.$checkButton);
      }

      return $dom;
    },
    /**
     *
     * Creates a target DOM element.
     * This method can be overridden in subclasses to create specific types of targets.
     * @param {TextActivityDocument.TextTarget} target - The target related to the DOM object to be created
     * @param {external:jQuery} $span -  - An initial DOM object (usually a `span`) that can be used
     * to store the target, or replaced by another type of object.
     * @returns {external:jQuery} - The jQuery DOM element loaded with the target data.
     */
    $createTargetElement: function (target, $span) {
      $span.text(target.text);
      target.$span = $span;
      return $span;
    },
    /**
     *
     * Basic initialization procedure, common to all activities.
     */
    initActivity: function () {
      if (this.act.prevScreen)
        this.preInitActivity();
      else
        this.startActivity();
    },
    /**
     *
     * Called when the activity starts playing
     */
    startActivity: function () {
      ActPanelAncestor.initActivity.call(this);
      this.setAndPlayMsg('initial', 'start');
      this.setDocContent(this.$div, this.act.document);
      this.playing = true;
    },
    /**
     *
     * Called when the text activity has a 'previous screen' information to be shown before the
     * activity starts
     */
    preInitActivity: function () {
      if (!this.act.prevScreen)
        return;

      this.showingPrevScreen = true;
      this.$div.empty();

      if (!this.act.prevScreenText) {
        this.setDocContent(this.$div, this.act.document);
      } else {
        if (!this.act.prevScreenStyle)
          this.act.prevScreenStyle = new BoxBase();
        this.$div.css(this.act.prevScreenStyle.getCSS()).css('overflow', 'auto');
        var $html = $('<div/>', { class: 'JClicTextDocument' })
          .css({ 'padding': 4 })
          .css(this.act.prevScreenStyle.getCSS())
          .append(this.act.prevScreenText);
        this.$div.append($html);
      }

      this.enableCounters(true, false, false);
      this.ps.setCounterValue('time', 0);

      this.ps.setMsg(this.act.messages['previous']);
      if (this.prevScreenTimer) {
        this.ps.setCountDown('time', this.act.prevScreenMaxTime);
        this.prevScreenTimer.start();
      }

      var panel = this;
      this.$div.on('click', function () {
        panel.showingPrevScreen = false;
        panel.$div.unbind('click');
        panel.startActivity();
        return true;
      });

      this.ps.playMsg();
    },
    /**
     * Called when the user clicks on the check button
     * @returns {boolean} - `true` when the panel is OK, `false` otherwise.
     */
    evaluatePanel: function () {
      this.finishActivity(true);
      return true;
    },
    /**
     *
     * Ordinary ending of the activity, usually called form `processEvent`
     * @param {boolean} result - `true` if the activity was successfully completed, `false` otherwise
     */
    finishActivity: function (result) {
      if (this.$checkButton)
        this.$checkButton.prop('disabled', true);
      ActPanelAncestor.finishActivity.call(this, result);
    },
    /**
     *
     * Main handler used to process mouse, touch, keyboard and edit events
     * @param {HTMLEvent} _event - The HTML event to be processed
     * @returns {boolean=} - When this event handler returns `false`, jQuery will stop its
     * propagation through the DOM tree. See: {@link http://api.jquery.com/on}
     */
    processEvent: function (_event) {
      return this.playing;
    }
  };

  // TextActivityBase.Panel extends Activity.Panel
  TextActivityBase.Panel.prototype = $.extend(Object.create(ActPanelAncestor), TextActivityBase.Panel.prototype);

  return TextActivityBase;

});
