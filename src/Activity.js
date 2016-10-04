/**
 *  File    : Activity.js
 *  Created : 07/04/2015
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

define([
  "jquery",
  "./Utils",
  "./AWT",
  "./media/EventSounds",
  "./boxes/ActiveBoxContent",
  "./boxes/ActiveBagContent",
  "./boxes/BoxBase",
  "./automation/AutoContentProvider",
  "./boxes/TextGridContent",
  "./activities/text/Evaluator",
  "./activities/text/TextActivityDocument"], function (
    $, Utils, AWT, EventSounds, ActiveBoxContent, ActiveBagContent,
    BoxBase, AutoContentProvider, TextGridContent, Evaluator, TextActivityDocument) {

  // Direct access to global setings
  var K = Utils.settings;

  // Event used for detecting touch devices
  var TOUCH_TEST_EVENT = 'touchstart';

  /**
   * Activity is the abstract base class of JClic activities. It defines also the inner class
   * {@link Activity.ActivityPanel}, wich is responsible for user interaction with the activity
   * content.
   * Activities should extend both `Activity` and `ActivityPanel` classes in order to become fully
   * operative.
   * @exports Activity
   * @class
   * @abstract
   * @param {JClicProject} project - The {@link JClicProject} to which this activity belongs
   */
  var Activity = function (project) {
    this.project = project;
    this.eventSounds = new EventSounds(this.project.settings.eventSounds);
    this.messages = {};
    this.abc = {};
  };

  /**
   *
   * Classes derived from `Activity` should register themselves by adding a field to
   * `Activity.CLASSES` using its name as identifier and the class constructor as a value.
   * @example
   * // To be included at the end of MyActivity class:
   * Activity.CLASSES['custom@myActivity'] = MyActivity;
   * @type {object}
   */
  Activity.CLASSES = {
    '@panels.Menu': Activity
  };

  /**
   *
   * Factory constructor that returns a specific type of Activity based on the `class` attribute
   * declared in the $xml parameter.
   * @param {external:jQuery} $xml - The XML element to be parsed
   * @param {JClicProject} project - The {@link JClicProject} to which this activity belongs
   * @returns {Activity}
   */
  Activity.getActivity = function ($xml, project) {
    var act = null;
    if ($xml && project) {
      var className = $xml.attr('class');
      var cl = Activity.CLASSES[className];
      if (cl) {
        act = new cl(project);
        act.setProperties($xml);
      } else
        Utils.log('error', 'Unknown activity class: %s', className);
    }
    return act;
  };

  Activity.prototype = {
    constructor: Activity,
    /**
     * The {@link JClicProject} to which this activity belongs
     * @type {JClicProject} */
    project: null,
    /**
     * The Activity name
     * @type {string} */
    name: K.DEFAULT_NAME,
    /**
     * The class name of this Activity
     * @type {string} */
    className: null,
    /**
     * Code used in reports to filter queries. Default is `null`.
     * @type {string} */
    code: null,
    /**
     * Type of activity, used in text activities to distinguish between different variants of the
     * same activity. Possible values are: `orderWords`, `orderParagraphs`, `identifyWords` and
     * `identifyChars`.
     * @type {string} */
    type: null,
    /**
     * A short description of the activity
     * @type {string} */
    description: null,
    /**
     * The space between the activity components measured in pixels.
     * @type {number} */
    margin: K.DEFAULT_MARGIN,
    /**
     * The background color of the activity panel
     * @type {string} */
    bgColor: K.DEFAULT_BG_COLOR,
    /**
     * When set, gradient used to draw the activity window background
     * @type {AWT.Gradient} */
    bgGradient: null,
    /**
     * Whether the bgImage (if any) has to be tiled across the panel background
     * @type {boolean} */
    tiledBgImg: false,
    /**
     * Filename of the image used as a panel background.
     * @type {string} */
    bgImageFile: null,
    /**
     * Whether to draw a border around the activity panel
     * @type {boolean} */
    border: true,
    /**
     * Whether to place the activity panel at the point specified by `absolutePosition` or leave
     * it centered on the main player's window.
     * @type {boolean} */
    absolutePositioned: false,
    /**
     * The position of the activity panel on the player.
     * @type {AWT.Point} */
    absolutePosition: null,
    /**
     * Whether to generate usage reports
     * @type {boolean} */
    includeInReports: true,
    /**
     * Whether to send action events to the {@link Reporter}
     * @type {boolean} */
    reportActions: false,
    /**
     * Whether to allow help about the activity or not.
     * @type {boolean} */
    helpWindow: false,
    /**
     * Whether to show the solution on the help window.
     * @type {boolean} */
    showSolution: false,
    /**
     * Message to be shown in the help window when `showSolution` is `false`.
     * @type {string} */
    helpMsg: '',
    /**
     * Specific set of {@link EventSounds} used in the activity. The default is `null`, meaning
     * to use the default event sounds.
     * @type {EventSounds} */
    eventSounds: null,
    /**
     * Wheter the activity must be solved in a specific order or not.
     * @type {boolean} */
    useOrder: false,
    /**
     * Wheter the cells of the activity will be dragged across the screen.
     * When `false`, a line will be painted to link elements.
     * @type {boolean} */
    dragCells: false,
    /**
     * File name of the Skin used by the activity. The default value is `null`, meaning that the
     * activity will use the skin specified for the project.
     * @type {string} */
    skinFileName: null,
    /**
     * Maximum amount of time (seconds) to solve the activity. The default value is 0, meaning
     * unlimited time.
     * @type {number}*/
    maxTime: 0,
    /**
     * Whether the time counter should display a countdown when `maxTime > 0`
     * @type {boolean} */
    countDownTime: false,
    /**
     * Maximum number of actions allowed to solve the activity. The default value is 0, meaning
     * unlimited actions.
     * @type {number}*/
    maxActions: 0,
    /**
     * Whether the actions counter should display a countdown when `maxActions > 0`
     * @type {boolean} */
    countDownActions: false,
    /**
     * URL to be launched when the user clicks on the 'info' button. Default is `null`.
     * @type {string} */
    infoUrl: null,
    /**
     * System command to be launched when the user clicks on the 'info' button. Default is `null`.
     * Important: this parameter is currently not being used
     * @type {string} */
    infoCmd: null,
    /**
     * The content of the initial, final, previous and error messages shown by the activity.
     * @type {ActiveBoxContent[]}
     */
    messages: null,
    /**
     * Preferred dimension of the activity window
     * @type {AWT.Dimension} */
    windowSize: new AWT.Dimension(K.DEFAULT_WIDTH, K.DEFAULT_HEIGHT),
    /**
     * Whether the activity window has transparent background.
     * @type {boolean} */
    transparentBg: false,
    /**
     * The background color of the activity
     * @type {string} */
    activityBgColor: K.DEFAULT_BG_COLOR,
    /**
     * Gradient used to draw backgrounds inside the activity.
     * @type {AWT.Gradient} */
    activityBgGradient: null,
    /**
     * Whether to display or not the 'time' counter
     * @type {boolean} */
    bTimeCounter: true,
    /**
     * Whether to display or not the 'score' counter
     * @type {boolean} */
    bScoreCounter: true,
    /**
     * Whether to display or not the 'actions' counter
     * @type {boolean} */
    bActionsCounter: true,
    /**
     * Special object used to generate random content at the start of the activity
     * @type {AutoContentProvider} */
    acp: null,
    //
    // Fields used only in certain activity types
    // ------------------------------------------
    //
    /**
     * Array of bags with the description of the content to be displayed on panels and cells.
     * @type {ActiveBagContent[]} */
    abc: null,
    /**
     * Content of the grid of letters used in crosswords and scrambled letters
     * @type {TextGridContent} */
    tgc: null,
    /**
     * Relative position of the text grid (uses the same position codes as box grids)
     * @type {string} */
    boxGridPos: 'AB',
    /**
     * Number of times to shuffle the cells at the beginning of the activity
     * @type {number} */
    shuffles: K.DEFAULT_SHUFFLES,
    /**
     * @typedef Activity~scrambleType
     * @type {object}
     * @property {boolean} primary
     * @property {boolean} secondary */
    /**
     * Object that indicates if box grids A and B must be scrambled.
     * @type {Activity~scrambleType} */
    scramble: {primary: true, secondary: true},
    /**
     * Flag to indicate "inverse resolution" in complex associations
     * @type {boolean} */
    invAss: false,
    /**
     *
     * Loads this object settings from an XML element
     * @param {external:jQuery} $xml - The jQuery XML element to parse
     */
    setProperties: function ($xml) {

      var act = this;

      // Read attributes
      $.each($xml.get(0).attributes, function () {
        var name = this.name;
        var val = this.value;
        switch (name) {
          // Generic attributes:
          case 'name':
            val = Utils.nSlash(val);
            /* falls through */
          case 'code':
          case 'type':
          case 'description':
            act[name] = val;
            break;

          case 'class':
            act.className = val;
            break;

          case 'inverse':
            act.invAss = Utils.getBoolean(val, false);
            break;

          case 'autoJump':
          case 'forceOkToAdvance':
          case 'amongParagraphs':
            act[name] = Utils.getBoolean(val, false);
            break;
        }
      });

      // Read specific nodes
      $xml.children().each(function () {
        var $node = $(this);
        switch (this.nodeName) {
          case 'settings':
            // Read more attributes
            $.each($node.get(0).attributes, function () {
              var name = this.name;
              var val = this.value;
              switch (name) {
                case 'infoUrl':
                case 'infoCmd':
                  act[name] = val;
                  break;

                case 'margin':
                case 'maxTime':
                case 'maxActions':
                  act[name] = Number(val);
                  break;

                case 'report':
                  act['includeInReports'] = Utils.getBoolean(val, false);
                  break;
                case 'countDownTime':
                case 'countDownActions':
                case 'reportActions':
                case 'useOrder':
                case 'dragCells':
                  act[name] = Utils.getBoolean(val, false);
                  break;
              }
            });

            // Read elements of _settings_
            $node.children().each(function () {
              var $node = $(this);
              switch (this.nodeName) {
                case 'skin':
                  act.skinFileName = $node.attr('file');
                  break;

                case 'helpWindow':
                  act.helpMsg = Utils.getXmlText(this);
                  act.showSolution = Utils.getBoolean($node.attr('showSolution'), false);
                  act.helpWindow = act.helpMsg !== null || act.showSolution;
                  break;

                case 'container':
                  // Read settings related to the 'container'
                  // (the main panel containing the activity and other elements)
                  act.bgColor = Utils.checkColor($node.attr('bgColor'), Utils.settings.BoxBase.BACK_COLOR);

                  $node.children().each(function () {
                    var $child = $(this);
                    switch (this.nodeName) {
                      case 'image':
                        act.bgImageFile = $child.attr('name');
                        act.tiledBgImg = Utils.getBoolean($child.attr('tiled'), false);
                        break;
                      case 'counters':
                        act.bTimeCounter = Utils.getBoolean($child.attr('time'), true);
                        act.bActionsCounter = Utils.getBoolean($child.attr('actions'), true);
                        act.bScoreCounter = Utils.getBoolean($child.attr('score'), true);
                        break;
                      case 'gradient':
                        act.bgGradient = new AWT.Gradient().setProperties($child);
                        break;
                    }
                  });
                  break;

                case 'window':
                  // Read settings related to the 'window'
                  // (the panel where the activity deploys its content)
                  act.activityBgColor = Utils.checkColor($node.attr('bgColor'), K.DEFAULT_BG_COLOR);
                  act.transparentBg = Utils.getBoolean($node.attr('transparent'), false);
                  act.border = Utils.getBoolean($node.attr('border'), false);
                  $node.children().each(function () {
                    var $child = $(this);
                    switch (this.nodeName) {
                      case 'gradient':
                        act.activityBgGradient = new AWT.Gradient().setProperties($child);
                        break;
                      case 'position':
                        act.absolutePosition = new AWT.Point().setProperties($child);
                        act.absolutePositioned = true;
                        break;
                      case 'size':
                        act.windowSize = new AWT.Dimension().setProperties($child);
                        break;
                    }
                  });
                  break;

                case 'eventSounds':
                  // eventSounds is already created in constructor,
                  // just read properties
                  act.eventSounds.setProperties($node);
                  break;
              }
            });
            break;

          case 'messages':
            $node.children('cell').each(function () {
              var m = act.readMessage($(this));
              // Possible message types are: `initial`, `final`, `previous`, `finalError`
              act.messages[m.type] = m;
            });
            break;

          case 'automation':
            // Read the automation settings ('Arith' or other automation engines)
            act.acp = AutoContentProvider.getProvider($node, act.project);
            break;

            // Settings specific to panel-type activities (puzzles, associations...)
          case 'cells':
            // Read the [ActiveBagContent](ActiveBagContent.html) objects
            var cellSet = new ActiveBagContent().setProperties($node, act.project.mediaBag);
            // Valid ids:
            // - Panel activities: 'primary', 'secondary', solvedPrimary'
            // - Textpanel activities: 'acrossClues', 'downClues', 'answers'
            act.abc[cellSet.id] = cellSet;
            break;

          case 'scramble':
            // Read the 'scramble' mode
            act.shuffles = Number($node.attr('times'));
            act.scramble.primary = Utils.getBoolean($node.attr('primary'));
            act.scramble.secondary = Utils.getBoolean($node.attr('secondary'));
            break;

          case 'layout':
            $.each($node.get(0).attributes, function () {
              var name = this.name;
              var value = this.value;
              switch (name) {
                case 'position':
                  act.boxGridPos = value;
                  break;
                case 'wildTransparent':
                case 'upperCase':
                case 'checkCase':
                  act[name] = Utils.getBoolean(value);
              }
            });
            break;

            // Element specific to {@link CrossWord} and
            // {@link WordSearch} activities:
          case 'textGrid':
            // Read the 'textGrid' element into a {@link TextGridContent}
            act.tgc = new TextGridContent().setProperties($node);
            break;

            // Read the clues of {@link WordSearch} activities
          case 'clues':
            // Read the array of clues
            act.clues = [];
            act.clueItems = [];
            var i = 0;
            $node.children('clue').each(function () {
              act.clueItems[i] = Number($(this).attr('id'));
              act.clues[i] = this.textContent;
              i++;
            });
            break;

            // Elements specific to text activities:
          case 'checkButton':
            act.checkButtonText = this.textContent ? this.textContent : 'check';
            break;

          case 'prevScreen':
            act.prevScreen = true;
            $node.children().each(function () {
              switch (this.nodeName) {
                case 'style':
                  act.prevScreenStyle = new BoxBase().setProperties($(this));
                  break;
                case 'p':
                  if (act.prevScreenText === null)
                    act.prevScreenText = '';
                  act.prevScreenText += '<p>' + this.textContent + '</p>';
                  break;
              }
            });
            break;

          case 'evaluator':
            act.ev = Evaluator.getEvaluator($node);
            break;

          case 'document':
            // Read main document of text activities
            act.document = new TextActivityDocument().setProperties($node, act.project.mediaBag);
            break;
        }
      });

      return this;
    },
    /**
     *
     * Read an activity message from an XML element
     * @param {external:jQuery} $xml - The XML element to be parsed
     * @returns {ActiveBoxContent}
     */
    readMessage: function ($xml) {
      var msg = new ActiveBoxContent().setProperties($xml, this.project.mediaBag);
      //
      // Allowed types are: `initial`, `final`, `previous`, `finalError`
      msg.type = $xml.attr('type');
      if (Utils.isNullOrUndef(msg.bb))
        msg.bb = new BoxBase(null);
      return msg;
    },
    /**
     *
     * Initialises the {@link AutoContentProvider}, when defined.
     */
    initAutoContentProvider: function () {
      if (this.acp !== null)
        this.acp.init();
    },
    /**
     *
     * Preloads the media content of the activity.
     * @param {PlayStation} ps - The {@link PlayStation} used to realize the media objects.
     */
    prepareMedia: function (ps) {

      this.eventSounds.realize(ps, this.project.mediaBag);

      $.each(this.messages, function (key, msg) {
        if (msg !== null)
          msg.prepareMedia(ps);
      });

      $.each(this.abc, function (key, abc) {
        if (abc !== null)
          abc.prepareMedia(ps);
      });
      return true;
    },
    /**
     *
     * Whether the activity allows the user to request the solution.
     * @returns {boolean}
     */
    helpSolutionAllowed: function () {
      return false;
    },
    /**
     *
     * Whether the activity allows the user to request help.
     * @returns {boolean}
     */
    helpWindowAllowed: function () {
      return this.helpWindow &&
          (this.helpSolutionAllowed() && this.showSolution || this.helpMsg !== null);
    },
    /**
     *
     * Retrieves the minimum number of actions needed to solve this activity.
     * @returns {number}
     */
    getMinNumActions: function () {
      return 0;
    },
    /**
     *
     * When this method returns `true`, the automatic jump to the next activity must be paused at
     * this activity.
     * @returns {boolean}
     */
    mustPauseSequence: function () {
      return this.getMinNumActions() !== 0;
    },
    /**
     * Whether or not the activity can be reset
     * @returns {boolean}
     */
    canReinit: function () {
      return true;
    },
    /**
     *
     * Whether or not the activity has additional information to be shown.
     * @returns {boolean}
     */
    hasInfo: function () {
      return this.infoUrl !== null && this.infoUrl.length > 0 ||
          this.infoCmd !== null && this.infoCmd.length > 0;
    },
    /**
     *
     * Whether or not the activity uses random to scramble internal components
     * @returns {boolean}
     */
    hasRandom: function () {
      return false;
    },
    /**
     *
     * When `true`, the activity must always be scrambled
     * @returns {boolean}
     */
    shuffleAlways: function () {
      return false;
    },
    /**
     *
     * When `true`, the activity makes use of the keyboard
     * @returns {boolean}
     */
    needsKeyboard: function () {
      return false;
    },
    /**
     * Called when the activity must be disposed
     */
    end: function () {
      this.eventSounds.close();
      this.clear();
    },
    /**
     * Called when the activity must reset its internal components
     */
    clear: function () {
    },
    /**
     *
     * Getter method for `windowSize`
     * @returns {AWT.Dimension}
     */
    getWindowSize: function () {
      return new AWT.Dimension(this.windowSize);
    },
    /**
     *
     * Setter method for `windowSize`
     * @param {AWT.Dimension} windowSize
     */
    setWindowSize: function (windowSize) {
      this.windowSize = new AWT.Dimension(windowSize);
    },
    /**
     *
     * Builds the {@link Activity.Panel} object.
     * Subclasses must update the `Panel` member of its prototypes to produce specific panels.
     * @param {PlayStation} ps - The {@link PlayStation} used to build media objects.
     * @returns {Activity.Panel}
     */
    getActivityPanel: function (ps) {
      return new this.constructor.Panel(this, ps);
    }
  };

  /**
   *
   * This object is responsible for rendering the contents of the activity on the screen and
   * managing user's interaction.
   * Each type of Activity must implement its own `Activity.Panel`.
   * In JClic, {@link http://projectestac.github.io/jclic/apidoc/edu/xtec/jclic/Activity.Panel.html|Activity.Panel}
   * extends {@link http://docs.oracle.com/javase/7/docs/api/javax/swing/JPanel.html|javax.swing.JPanel}.
   * In this implementation, the JPanel will be replaced by an HTML `div` tag.
   * @class
   * @extends AWT.Container
   * @param {Activity} act - The {@link Activity} to which this Panel belongs
   * @param {JClicPlayer} ps - Any object implementing the methods defined in the
   * @link{http://projectestac.github.io/jclic/apidoc/edu/xtec/jclic/PlayStation.html|PlayStation}
   * Java interface.
   * @param {external:jQuery=} $div - The jQuery DOM element where this Panel will deploy
   */
  Activity.Panel = function (act, ps, $div) {
    // Activity.Panel extends AWT.Container
    AWT.Container.call(this);
    this.act = act;
    this.ps = ps;
    this.minimumSize = new AWT.Dimension(100, 100);
    this.preferredSize = new AWT.Dimension(500, 400);
    if ($div)
      this.$div = $div;
    else
      this.$div = $('<div/>', {class: 'JClicActivity', 'aria-label': ps.getMsg('Activity panel')});
    this.accessibleCanvas = Utils.settings.CANVAS_HITREGIONS;
    this.act.initAutoContentProvider();
  };

  Activity.Panel.prototype = {
    constructor: Activity.Panel,
    /**
     * The Activity this panel is related to
     * @type {Activity} */
    act: null,
    /**
     * The jQuery div element used by this panel
     * @type {external:jQuery} */
    $div: null,
    /**
     * The jQuery main canvas element used by this panel
     * @type {external:jQuery} */
    $canvas: null,
    /**
     * True when the navigator implements canvas hit regions
     * See: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Hit_regions_and_accessibility
     * @type {boolean}
     */
    accessibleCanvas: false,
    /**
     * The realized current {@link Skin}
     * @type {Skin} */
    skin: null,
    /**
     * `true` when the activity is solved, `false` otherwise
     * @type {boolean} */
    solved: false,
    /**
     * The realized image used as a background
     * @type {external:HTMLImageElement} */
    bgImage: null,
    /**
     * `true` while the activity is playing
     * @type {boolean} */
    playing: false,
    /**
     * `true` if the activity is running for first time (not due to a click on the `replay` button)
     * @type {boolean} */
    firstRun: true,
    /**
     * Currently selected item. Used in some types of activities.
     * @type {number} */
    currentItem: 0,
    /**
     * The object used to connect cells and other elements in some types of activity
     * @type {BoxConnector} */
    bc: null,
    /**
     * The PlayStation used to realize media objects and communicate with the player services
     * (usually a {@link JClicPlayer}
     * @type {PlayStation} */
    ps: null,
    /**
     * The minimum size of this kind of Activity.Panel
     * @type {AWT.Dimension} */
    minimumSize: null,
    /**
     * The preferred size of this kind of Activity.Panel
     * @type {AWT.Dimension} */
    preferredSize: null,
    /**
     * List of events intercepted by this Activity.Panel. Current events are: 'keydown', 'keyup',
     * 'keypress', 'mousedown', 'mouseup', 'click', 'dblclick', 'mousemove', 'mouseenter',
     * 'mouseleave', 'mouseover', 'mouseout', 'touchstart', 'touchend', 'touchmove' and 'touchcancel'.
     * @type {string[]} */
    events: ['click'],
    backgroundColor: null,
    backgroundTransparent: false,
    border: null,
    /**
     *
     * Sets the size and position of this activity panel
     * @param {AWT.Rectangle} rect
     */
    setBounds: function (rect) {

      this.pos.x = rect.pos.x;
      this.pos.y = rect.pos.y;
      this.dim.width = rect.dim.width;
      this.dim.height = rect.dim.height;

      this.invalidate(rect);
      this.$div.css({
        position: 'relative',
        left: rect.pos.x,
        top: rect.pos.y,
        width: rect.dim.width,
        height: rect.dim.height
      });
    },
    /**
     *
     * Prepares the visual components of the activity
     */
    buildVisualComponents: function () {
      this.playing = false;

      this.skin = null;
      if (this.act.skinFileName && this.act.skinFileName.length > 0 && this.act.skinFileName !== this.act.project.settings.skinFileName)
        this.skin = this.act.project.mediaBag.getSkinElement(this.act.skinFileName, this.ps);

      this.bgImage = null;
      if (this.act.bgImageFile && this.act.bgImageFile.length > 0) {
        var mbe = this.act.project.mediaBag.getElement(this.act.bgImageFile, true);
        if (mbe)
          this.bgImage = mbe.data;
      }

      this.backgroundColor = this.act.activityBgColor;

      if (this.act.transparentBg)
        this.backgroundTransparent = true;

      // TODO: fix bevel-border type
      if (this.act.border)
        this.border = true;

      var cssAct = {
        display: 'block',
        'background-color': this.backgroundTransparent ? 'transparent' : this.backgroundColor
      };

      // Border shadow style Material Design, inspired in [http://codepen.io/Stenvh/pen/EaeWqW]
      if (this.border) {
        cssAct['box-shadow'] = '0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12)';
        cssAct['border-radius'] = '2px';
        cssAct['color'] = '#272727';
      }

      if (this.act.activityBgGradient) {
        cssAct['background-image'] = this.act.activityBgGradient.getCss();
      }
      this.$div.css(cssAct);
    },
    /**
     * Activities should implement this method to update the graphic content of its panel. The method
     * will be called from {@link AWT.Container#update} when needed.
     * @param {AWT.Rectangle} dirtyRegion - Specifies the area to be updated. When `null`,
     * it's the whole panel.
     */
    updateContent: function (dirtyRegion) {
      // To be overridden by subclasses. Here does nothing.
      return AWT.Container.prototype.updateContent.call(this, dirtyRegion);
    },
    /**
     *
     * Plays the specified event sound
     * @param {string} event - The type of event to be performed
     */
    playEvent: function (event) {
      this.act.eventSounds.play(event);
    },
    /**
     *
     * Basic initialization procedure, common to all activities.
     */
    initActivity: function () {
      if (this.playing) {
        this.playing = false;
        this.ps.reportEndActivity(this.act, this.solved);
      }
      this.solved = false;
      this.ps.reportNewActivity(this.act, 0);
      this.attachEvents();
      this.enableCounters();
    },
    /**
     *
     * Called when the activity starts playing
     */
    startActivity: function () {
      //var msg = this.act.messages['initial'];
      //if (msg)
      //  this.ps.setMsg(msg);
      this.playing = true;
    },
    /**
     *
     * Called by {@link JClicPlayer} when this activity panel is fully visible, just after the
     * initialization process.
     */
    activityReady: function () {
      // To be overrided by subclasses
    },
    /**
     *
     * Displays help about the activity
     */
    showHelp: function () {
      // To be overrided by subclasses
    },
    /**
     *
     * Sets the real dimension of this Activity.Panel.
     * @param {AWT.Dimension} maxSize - The maximum surface available for the activity panel
     * @returns {AWT.Dimension}
     */
    setDimension: function (maxSize) {
      return new AWT.Dimension(
          Math.min(maxSize.width, this.act.windowSize.width),
          Math.min(maxSize.height, this.act.windowSize.height));
    },
    /**
     * Attaches the events specified in the `events` member to the `$div` member
     */
    attachEvents: function () {
      for (var i = 0; i < this.events.length; i++) {
        this.attachEvent(this.$div, this.events[i]);
      }
      // Prepare handler to check if we are in a touch device
      if (!K.TOUCH_DEVICE && $.inArray(TOUCH_TEST_EVENT, this.events) === -1)
        this.attachEvent(this.$div, TOUCH_TEST_EVENT);
    },
    /**
     *
     * Attaches a single event to the specified object
     * @param {external:jQuery} $obj - The object to which the event will be attached
     * @param {string} evt - The event name
     */
    attachEvent: function ($obj, evt) {
      var act = this;
      $obj.on(evt, this, function (event) {
        if (event.type === TOUCH_TEST_EVENT) {
          if (!K.TOUCH_DEVICE)
            K.TOUCH_DEVICE = true;
          if ($.inArray(TOUCH_TEST_EVENT, act.events) === -1) {
            // Disconnect handler
            $obj.off(TOUCH_TEST_EVENT);
            return;
          }
        }
        return event.data.processEvent.call(event.data, event);
      });
    },
    /**
     *
     * Main handler used to process mouse, touch, keyboard and edit events.
     * @param {HTMLEvent} event - The HTML event to be processed
     * @returns {boolean=} - When this event handler returns `false`, jQuery will stop its
     * propagation through the DOM tree. See: {@link http://api.jquery.com/on}
     */
    processEvent: function (event) {
      return false;
    },
    /**
     *
     * Fits the panel within the `proposed` rectangle. The panel can occupy more space, but always
     * not surpassing the `bounds` rectangle.
     * @param {AWT.Rectangle} proposed - The proposed rectangle
     * @param {AWT.Rectangle} bounds - The maximum allowed bounds
     */
    fitTo: function (proposed, bounds) {
      var origin = new AWT.Point();
      if (this.act.absolutePositioned && this.act.absolutePosition !== null) {
        origin.x = Math.max(0, this.act.absolutePosition.x + proposed.pos.x);
        origin.y = Math.max(0, this.act.absolutePosition.y + proposed.pos.y);
        proposed.dim.width -= this.act.absolutePosition.x;
        proposed.dim.height -= this.act.absolutePosition.y;
      }
      var d = this.setDimension(new AWT.Dimension(
          Math.max(2 * this.act.margin + Utils.settings.MINIMUM_WIDTH, proposed.dim.width),
          Math.max(2 * this.act.margin + Utils.settings.MINIMUM_HEIGHT, proposed.dim.height)));
      if (!this.act.absolutePositioned) {
        origin.moveTo(
            Math.max(0, proposed.pos.x + (proposed.dim.width - d.width) / 2),
            Math.max(0, proposed.pos.y + (proposed.dim.height - d.height) / 2));
      }
      if (origin.x + d.width > bounds.dim.width)
        origin.x = Math.max(0, bounds.dim.width - d.width);
      if (origin.y + d.height > bounds.dim.height)
        origin.y = Math.max(0, bounds.dim.height - d.height);
      this.setBounds(new AWT.Rectangle(origin.x, origin.y, d.width, d.height));
      
      // Build accessible components at the end of current tree
      var thisPanel = this;
      window.setTimeout(function(){
        thisPanel.buildAccessibleComponents();
      }, 0);
      
    },
    /**
     * 
     * Builds the accessible components needed for this Activity.Panel
     * This method is called when all main elements are placed and visible, when the activity is ready
     * to start or when resized.
     */
    buildAccessibleComponents: function() {
      // Clear existing elements
      if(this.accessibleCanvas && this.$canvas && this.$canvas.children().length > 0) {
        this.$canvas.get(0).getContext('2d').clearHitRegions();
        this.$canvas.empty();          
      }
      // Create accessible elements in subclasses
    },
    /**
     *
     *  Forces the ending of the activity.
     */
    forceFinishActivity: function () {
      // to be overrided by subclasses
    },
    /**
     *
     * Ordinary ending of the activity, usually called form `processEvent`
     * @param {boolean} result - `true` if the activity was successfully completed, `false` otherwise
     */
    finishActivity: function (result) {
      this.playing = false;
      this.solved = result;

      if (this.bc !== null)
        this.bc.end();

      if (result) {
        this.setAndPlayMsg('final', 'finishedOk');
      } else {
        this.setAndPlayMsg('finalError', 'finishedError');
      }
      this.ps.activityFinished(this.solved);
      this.ps.reportEndActivity(this.act, this.solved);
    },
    /**
     *
     * Sets the message to be displayed in the skin message box and optionally plays a sound event.
     * @param {string} msgCode - Type of message (initial, final, finalError...)
     * @param {string=} eventSoundsCode - Optional name of the event sound to be played.
     */
    setAndPlayMsg: function (msgCode, eventSoundsCode) {
      var msg = this.act.messages[msgCode];
      if (!msg)
        msg = null;
      this.ps.setMsg(msg);
      if (msg === null || msg.mediaContent === null)
        this.playEvent(eventSoundsCode);
      else
        this.ps.playMsg();
    },
    /**
     *
     * Ends the activity
     */
    end: function () {
      this.forceFinishActivity();
      if (this.playing) {
        if (this.bc !== null)
          this.bc.end();
        this.ps.reportEndActivity(this.act, this.solved);
        this.playing = false;
        this.solved = false;
      }
      this.clear();
    },
    /**
     *
     * Miscellaneous cleaning operations
     */
    clear: function () {
      // to be overridden by subclasses
    },
    /**
     *
     * Enables or disables the three counters (time, score and actions)
     * @param {boolean} eTime - Whether to enable or disable the time counter
     * @param {boolean} eScore - Whether to enable or disable the score counter
     * @param {boolean} eActions - Whether to enable or disable the actions counter
     */
    enableCounters: function (eTime, eScore, eActions) {
      if (typeof eTime === 'undefined')
        eTime = this.act.bTimeCounter;
      if (typeof eScore === 'undefined')
        eScore = this.act.bScoreCounter;
      if (typeof eActions === 'undefined')
        eActions = this.act.bActionsCounter;

      this.ps.setCounterEnabled('time', eTime);
      if (this.act.countDownTime)
        this.ps.setCountDown('time', this.act.maxTime);
      this.ps.setCounterEnabled('score', eScore);
      this.ps.setCounterEnabled('actions', eActions);
      if (this.act.countDownActions)
        this.ps.setCountDown('actions', this.act.maxActions);
    },
    /**
     *
     * Shuffles the contents of the activity
     * @param {ActiveBoxBag[]} bg - The sets of boxes to be shuffled
     * @param {boolean} visible - The shuffle process must be animated on the screen (not yet implemented!)
     * @param {boolean} fitInArea - Shuffled pieces cannot go out of the current area
     */
    shuffle: function (bg, visible, fitInArea) {
      var steps = this.act.shuffles;
      var i = steps;
      while (i > 0) {
        var k = i > steps ? steps : i;
        for (var b = 0; b < bg.length; b++) {
          var abb = bg[b];
          if (abb !== null)
            abb.scrambleCells(k, fitInArea);
        }
        i -= steps;
      }
    }
  };

  // Activity.Panel extends AWT.Container
  Activity.Panel.prototype = $.extend(Object.create(AWT.Container.prototype), Activity.Panel.prototype);

  return Activity;
});
