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

/* global window */

import $ from 'jquery';
import { settings, log, getMsg, attrForEach, nSlash, getBoolean, getXmlText, checkColor, isNullOrUndef, getAttr, setAttr } from './Utils';
import { Rectangle, Gradient, Point, Dimension, Container } from './AWT';
import EventSounds from './media/EventSounds';
import ActiveBoxContent from './boxes/ActiveBoxContent';
import ActiveBagContent from './boxes/ActiveBagContent';
import BoxBase from './boxes/BoxBase';
import AutoContentProvider from './automation/AutoContentProvider';
import TextGridContent from './boxes/TextGridContent';
import Evaluator from './activities/text/Evaluator';
import TextActivityDocument from './activities/text/TextActivityDocument';

// Event used for detecting touch devices
const TOUCH_TEST_EVENT = 'touchstart';

/**
 * Activity is the abstract base class of JClic activities. It defines also the inner class
 * {@link module:Activity.ActivityPanel ActivityPanel}, wich is responsible for user interaction with the activity
 * content.
 * Activities should extend both `Activity` and `ActivityPanel` classes in order to become fully
 * operative.
 * @abstract
 */
export class Activity {
  /**
   * Activity constructor
   * @param {module:project/JClicProject.JClicProject} project - The {@link module:project/JClicProject.JClicProject JClicProject} to which this activity belongs
   */
  constructor(project) {
    this.project = project;
    this.eventSounds = new EventSounds(this.project.settings.eventSounds);
    this.messages = {};
    this.abc = {};
  }

  /**
   * Registers a new type of activity
   * @param {string} activityName - The name used to identify this activity
   * @param {function} activityClass - The activity class, usually extending Activity
   * @returns {module:Activity.Activity} - The provided activity class
   */
  static registerClass(activityName, activityClass) {
    Activity.CLASSES[activityName] = activityClass;
    return activityClass;
  }

  /**
   * Factory constructor that returns a specific type of Activity based on the `class` attribute
   * declared in `data`.
   * @param {object|external:jQuery} data - Can be a jQuery XML element, or an object obtained with a call to `getAttributes`
   * @param {module:project/JClicProject.JClicProject} project - The {@link module:project/JClicProject.JClicProject JClicProject} to which this activity belongs
   * @returns {module:Activity.Activity}
   */
  static getActivity(data, project) {
    let act = null;
    const isXml = data.jquery && true;
    if (data && project) {
      const className = isXml ? (data.attr('class') || '').replace(/^edu\.xtec\.jclic\.activities\./, '@') : data.className;
      const cl = Activity.CLASSES[className];
      if (cl) {
        act = new cl(project);
        if (isXml)
          act.setProperties(data);
        else
          act.setAttributes(data);
      } else
        log('error', `Unknown activity class: ${className}`);
    }
    return act;
  }

  /**
   * Loads this object settings from an XML element
   * @param {external:jQuery} $xml - The jQuery XML element to parse
   */
  setProperties($xml) {

    // Read attributes
    attrForEach($xml.get(0).attributes, (name, val) => {
      switch (name) {
        // Generic attributes:
        case 'name':
          val = nSlash(val);
        /* falls through */
        case 'code':
        case 'type':
        case 'description':
          this[name] = val;
          break;

        case 'class':
          this.className = val.replace(/^edu\.xtec\.jclic\.activities\./, '@');
          break;

        case 'inverse':
          this.invAss = getBoolean(val, false);
          break;

        case 'autoJump':
        case 'forceOkToAdvance':
        case 'amongParagraphs':
          this[name] = getBoolean(val, false);
          break;
      }
    });

    // Read specific nodes
    $xml.children().each((_n, child) => {
      const $node = $(child);
      switch (child.nodeName) {
        case 'settings':
          // Read more attributes
          attrForEach($node.get(0).attributes, (name, val) => {
            switch (name) {
              case 'infoUrl':
              case 'infoCmd':
                this[name] = val;
                break;

              case 'margin':
              case 'maxTime':
              case 'maxActions':
                this[name] = Number(val);
                break;

              case 'report':
                this.includeInReports = getBoolean(val, false);
                break;
              case 'countDownTime':
              case 'countDownActions':
              case 'reportActions':
              case 'useOrder':
              case 'dragCells':
                this[name] = getBoolean(val, false);
                break;
            }
          });

          // Read elements of _settings_
          $node.children().each((_n, child) => {
            const $node = $(child);
            switch (child.nodeName) {
              case 'skin':
                this.skinFileName = $node.attr('file');
                break;

              case 'helpWindow':
                this.helpMsg = getXmlText(this);
                this.showSolution = getBoolean($node.attr('showSolution'), false);
                this.helpWindow = this.helpMsg !== null || this.showSolution;
                break;

              case 'container':
                // Read settings related to the 'container'
                // (the main panel containing the activity and other elements)
                this.bgColor = checkColor($node.attr('bgColor'), settings.BoxBase.BACK_COLOR);

                $node.children().each((_n, child) => {
                  const $child = $(child);
                  switch (child.nodeName) {
                    case 'image':
                      this.bgImageFile = $child.attr('name');
                      this.tiledBgImg = getBoolean($child.attr('tiled'), false);
                      break;
                    case 'counters':
                      this.bTimeCounter = getBoolean($child.attr('time'), true);
                      this.bActionsCounter = getBoolean($child.attr('actions'), true);
                      this.bScoreCounter = getBoolean($child.attr('score'), true);
                      break;
                    case 'gradient':
                      this.bgGradient = new Gradient().setProperties($child);
                      break;
                  }
                });
                break;

              case 'window':
                // Read settings related to the 'window'
                // (the panel where the activity deploys its content)
                this.activityBgColor = checkColor($node.attr('bgColor'), settings.DEFAULT_BG_COLOR);
                this.transparentBg = getBoolean($node.attr('transparent'), false);
                this.border = getBoolean($node.attr('border'), false);
                $node.children().each((_n, child) => {
                  const $child = $(child);
                  switch (child.nodeName) {
                    case 'gradient':
                      this.activityBgGradient = new Gradient().setProperties($child);
                      break;
                    case 'position':
                      this.absolutePosition = new Point().setProperties($child);
                      this.absolutePositioned = true;
                      break;
                    case 'size':
                      this.windowSize = new Dimension().setProperties($child);
                      break;
                  }
                });
                break;

              case 'eventSounds':
                // eventSounds is already created in constructor,
                // just read properties
                this.eventSounds.setProperties($node);
                break;
            }
          });
          break;

        case 'messages':
          $node.children('cell').each((_n, child) => {
            const m = this.readMessage($(child));
            // Possible message types are: `initial`, `final`, `previous`, `finalError`
            this.messages[m.type] = m;
          });
          break;

        case 'automation':
          // Read the automation settings ('Arith' or other automation engines)
          this.acp = AutoContentProvider.getProvider($node, this.project);
          if (this.acp)
            this.numericContent = this.acp.numericContent;
          break;

        // Settings specific to panel-type activities (puzzles, associations...)
        case 'cells':
          // Read the [ActiveBagContent](ActiveBagContent.html) objects
          const cellSet = new ActiveBagContent().setProperties($node, this.project.mediaBag);
          // Valid ids:
          // - Panel activities: 'primary', 'secondary', solvedPrimary'
          // - Textpanel activities: 'acrossClues', 'downClues', 'answers'
          this.abc[cellSet.id] = cellSet;
          break;

        case 'scramble':
          // Read the 'shuffle' mode
          this.shuffles = Number($node.attr('times'));
          this.shuffleA = getBoolean($node.attr('primary'));
          this.shuffleB = getBoolean($node.attr('secondary'));
          break;

        case 'layout':
          attrForEach($node.get(0).attributes, (name, value) => {
            switch (name) {
              case 'position':
                this.boxGridPos = value;
                break;
              case 'wildTransparent':
              case 'upperCase':
              case 'checkCase':
                this[name] = getBoolean(value);
            }
          });
          break;

        // Element specific to 'Menu' activities:
        case 'menuElement':
          this.menuElements.push({
            caption: $node.attr('caption') || '',
            icon: $node.attr('icon') || null,
            projectPath: $node.attr('path') || null,
            sequence: $node.attr('sequence') || null,
            description: $node.attr('description') || ''
          });
          break;

        // Element specific to 'CrossWord' and
        // 'WordSearch' activities:
        case 'textGrid':
          // Read the 'textGrid' element into a 'TextGridContent'
          this.tgc = new TextGridContent().setProperties($node);
          break;

        // Read the clues of 'WordSearch' activities
        case 'clues':
          // Read the array of clues
          this.clues = [];
          this.clueItems = [];
          $node.children('clue').each((n, child) => {
            this.clueItems[n] = Number($(child).attr('id'));
            this.clues[n] = child.textContent;
          });
          break;

        // Elements specific to text activities:
        case 'checkButton':
          this.checkButtonText = child.textContent || 'check';
          break;

        case 'prevScreen':
          this.prevScreen = true;
          this.prevScreenMaxTime = $node.attr('maxTime') || -1;
          $node.children().each((_n, child) => {
            switch (child.nodeName) {
              case 'style':
                this.prevScreenStyle = new BoxBase().setProperties($(child));
                break;
              case 'p':
                if (this.prevScreenText === null)
                  this.prevScreenText = '';
                this.prevScreenText += `<p>${child.textContent}</p>`;
                break;
            }
          });
          break;

        case 'evaluator':
          this.ev = Evaluator.getEvaluator($node);
          break;

        case 'document':
          // Read main document of text activities
          this.document = new TextActivityDocument().setProperties($node, this.project.mediaBag);
          break;
      }
    });
    return this;
  }

  /**
   * Read an activity message from an XML element
   * @param {external:jQuery} $xml - The XML element to be parsed
   * @returns {module:boxes/ActiveBoxContent.ActiveBoxContent}
   */
  readMessage($xml) {
    const msg = new ActiveBoxContent().setProperties($xml, this.project.mediaBag);
    //
    // Allowed types are: `initial`, `final`, `previous`, `finalError`
    msg.type = $xml.attr('type');
    if (isNullOrUndef(msg.style))
      msg.style = new BoxBase(null);
    return msg;
  }

  /**
   * Gets a object with the basic attributes needed to rebuild this instance excluding functions,
   * parent references, constants and also attributes retaining the default value.
   * The resulting object is commonly usued to serialize elements in JSON format.
   * @returns {object} - The resulting object, with minimal attrributes
   */
  getAttributes() {
    return getAttr(this, [
      'name', 'className', 'code', 'type', 'description',
      'invAss', 'numericContent',
      'autoJump', 'forceOkToAdvance', 'amongParagraphs',
      'infoUrl', 'infoCmd',
      `margin|${settings.DEFAULT_MARGIN}`, 'maxTime', 'maxActions',
      'includeInReports|true', 'reportActions|false',
      'countDownTime', 'countDownActions',
      'useOrder', 'dragCells',
      'skinFileName',
      'showSolution|false', 'helpMsg',
      `bgColor|${settings.DEFAULT_BG_COLOR}`, 'bgImageFile', 'tiledBgImg',
      'bTimeCounter|true', 'bActionsCounter|true', 'bScoreCounter|true',
      `activityBgColor|${settings.DEFAULT_BG_COLOR}`, 'transparentBg|false', 'border|true',
      'shuffleA', 'shuffleB', 'shuffles', 'boxGridPos',
      'wildTransparent', 'upperCase', 'checkCase',
      'checkButtonText',
      'prevScreen', 'prevScreenMaxTime', 'prevScreenText',
      'bgGradient', 'activityBgGradient', // Gradient
      'absolutePosition', // Point
      'windowSize', // Dimension
      'eventSounds', // EventSounds
      'messages', // ActiveBoxContent{}
      'acp', // AutoContentProvider
      'abc', // ActiveBagContent{}
      'menuElements', // Activity~menuElement
      'tgc', // TextGridContent
      'clues', // string[]
      'clueItems', // number[]
      'prevScreenStyle', // BoxBase
      'ev', // Evaluator
      'document', // TextActivityDocument
    ]);
  }

  /**
   * Load the activity settings from a data object
   * @param {object} data - The data object to parse
   */
  setAttributes(data, mediaBag = this.project.mediaBag) {
    setAttr(this, data, [
      'name', 'className', 'code', 'type', 'description', 'invAss', 'numericContent',
      'autoJump', 'forceOkToAdvance', 'amongParagraphs', 'infoUrl', 'infoCmd',
      'margin', 'maxTime', 'maxActions', 'includeInReports', 'reportActions',
      'countDownTime', 'countDownActions', 'useOrder', 'dragCells', 'skinFileName',
      'showSolution', 'helpMsg', 'bgColor', 'bgImageFile', 'tiledBgImg',
      'bTimeCounter', 'bActionsCounter', 'bScoreCounter',
      'activityBgColor', 'transparentBg', 'border',
      'shuffleA', 'shuffleB', 'shuffles', 'boxGridPos',
      'wildTransparent', 'upperCase', 'checkCase', 'checkButtonText',
      'prevScreen', 'prevScreenMaxTime', 'prevScreenText',
      { key: 'bgGradient', fn: Gradient },
      { key: 'activityBgGradient', fn: Gradient },
      { key: 'absolutePosition', fn: Point },
      { key: 'windowSize', fn: Dimension },
      { key: 'messages', fn: ActiveBoxContent, group: 'object', init: 'key', params: [mediaBag] },
      { key: 'abc', fn: ActiveBagContent, group: 'object', init: 'key', params: [mediaBag] },
      { key: 'acp', fn: AutoContentProvider, params: [mediaBag] },
      'menuElements',
      { key: 'tgc', fn: TextGridContent },
      'clues',
      'clueItems',
      { key: 'prevScreenStyle', fn: BoxBase },
      { key: 'ev', fn: Evaluator },
      { key: 'document', fn: TextActivityDocument, params: [mediaBag] },
    ]);

    // Reused objects
    if (data.eventSounds)
      this.eventSounds.setAttributes(data.eventSounds);

    // Manual settings
    if (this.absolutePosition)
      this.absolutePositioned = true;

    return this;
  }

  /**
   * Initialises the {@link module:automation/AutoContentProvider.AutoContentProvider AutoContentProvider}, when defined.
   */
  initAutoContentProvider() {
    if (this.acp !== null)
      this.acp.init();
  }

  /**
   * Preloads the media content of the activity.
   * @param {module:JClicPlayer.JClicPlayer} ps - The {@link module:JClicPlayer.JClicPlayer} used to realize the media objects.
   */
  prepareMedia(ps) {
    this.eventSounds.realize(ps, this.project.mediaBag);
    $.each(this.messages, (_key, msg) => {
      if (msg !== null) msg.prepareMedia(ps);
    });
    $.each(this.abc, (_key, abc) => {
      if (abc !== null)
        abc.prepareMedia(ps);
    });
    return true;
  }

  /**
   * Whether the activity allows the user to request the solution.
   * @returns {boolean}
   */
  helpSolutionAllowed() {
    return false;
  }

  /**
   * Whether the activity allows the user to request help.
   * @returns {boolean}
   */
  helpWindowAllowed() {
    return this.helpWindow &&
      (this.helpSolutionAllowed() && this.showSolution || this.helpMsg !== null);
  }

  /**
   * Retrieves the minimum number of actions needed to solve this activity.
   * @returns {number}
   */
  getMinNumActions() {
    return 0;
  }

  /**
   * When this method returns `true`, the automatic jump to the next activity must be paused at
   * this activity.
   * @returns {boolean}
   */
  mustPauseSequence() {
    return this.getMinNumActions() !== 0;
  }

  /**
   * Whether or not the activity can be reset
   * @returns {boolean}
   */
  canReinit() {
    return true;
  }

  /**
   * Whether or not the activity has additional information to be shown.
   * @returns {boolean}
   */
  hasInfo() {
    return this.infoUrl !== null && this.infoUrl.length > 0 ||
      this.infoCmd !== null && this.infoCmd.length > 0;
  }

  /**
   * Whether or not the activity uses random to shuffle internal components
   * @returns {boolean}
   */
  hasRandom() {
    return false;
  }

  /**
   * When `true`, the activity must always be shuffled
   * @returns {boolean}
   */
  shuffleAlways() {
    return false;
  }

  /**
   * When `true`, the activity makes use of the keyboard
   * @returns {boolean}
   */
  needsKeyboard() {
    return false;
  }

  /**
   * Called when the activity must be disposed
   */
  end() {
    this.eventSounds.close();
    this.clear();
  }

  /**
   * Called when the activity must reset its internal components
   */
  clear() {
  }

  /**
   *
   * Getter method for `windowSize`
   * @returns {module:AWT.Dimension}
   */
  getWindowSize() {
    return new Dimension(this.windowSize);
  }

  /**
   * Setter method for `windowSize`
   * @param {module:AWT.Dimension} windowSize
   */
  setWindowSize(windowSize) {
    this.windowSize = new Dimension(windowSize);
  }

  /**
   * Builds the {@link module:Activity.ActivityPanel ActivityPanel} object.
   * Subclasses must update the `Panel` member of its prototypes to produce specific panels.
   * @param {module:JClicPlayer.JClicPlayer} ps - The {@link module:JClicPlayer.JClicPlayer JClicPlayer} used to build media objects.
   * @returns {module:Activity.ActivityPanel}
   */
  getActivityPanel(ps) {
    return new this.constructor.Panel(this, ps);
  }
}

/**
 * Classes derived from `Activity` should register themselves by adding a field to
 * `Activity.CLASSES` using `Activity.registerClass`
 * @type {object}
 */
Activity.CLASSES = {
  '@panels.Menu': Activity
};

Object.assign(Activity.prototype, {
  /**
   * The {@link module:project/JClicProject.JClicProject JClicProject} to which this activity belongs
   * @name module:Activity.Activity#project
   * @type {module:project/JClicProject.JClicProject} */
  project: null,
  /**
   * The Activity name
   * @name module:Activity.Activity#name
   * @type {string} */
  name: settings.DEFAULT_NAME,
  /**
   * The class name of this Activity
   * @name module:Activity.Activity#className
   * @type {string} */
  className: null,
  /**
   * Code used in reports to filter queries. Default is `null`.
   * @name module:Activity.Activity#code
   * @type {string} */
  code: null,
  /**
   * Type of activity, used in text activities to distinguish between different variants of the
   * same activity. Possible values are: `orderWords`, `orderParagraphs`, `identifyWords` and
   * `identifyChars`.
   * @name module:Activity.Activity#type
   * @type {string} */
  type: null,
  /**
   * A short description of the activity
   * @name module:Activity.Activity#description
   * @type {string} */
  description: null,
  /**
   * The space between the activity components measured in pixels.
   * @name module:Activity.Activity#margin
   * @type {number} */
  margin: settings.DEFAULT_MARGIN,
  /**
   * The background color of the activity panel
   * @name module:Activity.Activity#bgColor
   * @type {string} */
  bgColor: settings.DEFAULT_BG_COLOR,
  /**
   * When set, gradient used to draw the activity window background
   * @name module:Activity.Activity#bgGradient
   * @type {module:AWT.Gradient} */
  bgGradient: null,
  /**
   * Whether the bgImage (if any) has to be tiled across the panel background
   * @name module:Activity.Activity#tiledBgImg
   * @type {boolean} */
  tiledBgImg: false,
  /**
   * Filename of the image used as a panel background.
   * @name module:Activity.Activity#bgImageFile
   * @type {string} */
  bgImageFile: null,
  /**
   * Whether to draw a border around the activity panel
   * @name module:Activity.Activity#border
   * @type {boolean} */
  border: true,
  /**
   * Whether to place the activity panel at the point specified by `absolutePosition` or leave
   * it centered on the main player's window.
   * @name module:Activity.Activity#absolutePositioned
   * @type {boolean} */
  absolutePositioned: false,
  /**
   * The position of the activity panel on the player.
   * @name module:Activity.Activity#absolutePosition
   * @type {module:AWT.Point} */
  absolutePosition: null,
  /**
   * Whether to generate usage reports
   * @name module:Activity.Activity#includeInReports
   * @type {boolean} */
  includeInReports: true,
  /**
   * Whether to send action events to the {@link module:Reporter.Reporter Reporter}
   * @name module:Activity.Activity#reportActions
   * @type {boolean} */
  reportActions: false,
  /**
   * Whether to allow help about the activity or not.
   * @name module:Activity.Activity#helpWindow
   * @type {boolean} */
  helpWindow: false,
  /**
   * Whether to show the solution on the help window.
   * @name module:Activity.Activity#showSolution
   * @type {boolean} */
  showSolution: false,
  /**
   * Message to be shown in the help window when `showSolution` is `false`.
   * @name module:Activity.Activity#helpMsg
   * @type {string} */
  helpMsg: '',
  /**
   * Specific set of {@link module:media/EventSounds.EventSounds EventSounds} used in the activity. The default is `null`, meaning
   * to use the default event sounds.
   * @name module:Activity.Activity#eventSounds
   * @type {module:media/EventSounds.EventSounds} */
  eventSounds: null,
  /**
   * Wheter the activity must be solved in a specific order or not.
   * @name module:Activity.Activity#useOrder
   * @type {boolean} */
  useOrder: false,
  /**
   * Wheter the cells of the activity will be dragged across the screen.
   * When `false`, a line will be painted to link elements.
   * @name module:Activity.Activity#dragCells
   * @type {boolean} */
  dragCells: false,
  /**
   * File name of the Skin used by the activity. The default value is `null`, meaning that the
   * activity will use the skin specified for the project.
   * @name module:Activity.Activity#skinFileName
   * @type {string} */
  skinFileName: null,
  /**
   * Maximum amount of time (seconds) to solve the activity. The default value is 0, meaning
   * unlimited time.
   * @name module:Activity.Activity#maxTime
   * @type {number}*/
  maxTime: 0,
  /**
   * Whether the time counter should display a countdown when `maxTime > 0`
   * @name module:Activity.Activity#countDownTime
   * @type {boolean} */
  countDownTime: false,
  /**
   * Maximum number of actions allowed to solve the activity. The default value is 0, meaning
   * unlimited actions.
   * @name module:Activity.Activity#maxActions
   * @type {number}*/
  maxActions: 0,
  /**
   * Whether the actions counter should display a countdown when `maxActions > 0`
   * @name module:Activity.Activity#countDownActions
   * @type {boolean} */
  countDownActions: false,
  /**
   * URL to be launched when the user clicks on the 'info' button. Default is `null`.
   * @name module:Activity.Activity#infoUrl
   * @type {string} */
  infoUrl: null,
  /**
   * System command to be launched when the user clicks on the 'info' button. Default is `null`.
   * Important: this parameter is currently not being used
   * @name module:Activity.Activity#infoCmd
   * @type {string} */
  infoCmd: null,
  /**
   * The content of the initial, final, previous and error messages shown by the activity.
   * @name module:Activity.Activity#messages
   * @type {module:boxes/ActiveBoxContent.ActiveBoxContent[]} */
  messages: null,
  /**
   * Preferred dimension of the activity window
   * @name module:Activity.Activity#windowSize
   * @type {module:AWT.Dimension} */
  windowSize: new Dimension(settings.DEFAULT_WIDTH, settings.DEFAULT_HEIGHT),
  /**
   * Whether the activity window has transparent background.
   * @name module:Activity.Activity#transparentBg
   * @type {boolean} */
  transparentBg: false,
  /**
   * The background color of the activity
   * @name module:Activity.Activity#activityBgColor
   * @type {string} */
  activityBgColor: settings.DEFAULT_BG_COLOR,
  /**
   * Gradient used to draw backgrounds inside the activity.
   * @name module:Activity.Activity#activityBgGradient
   * @type {module:AWT.Gradient} */
  activityBgGradient: null,
  /**
   * Whether to display or not the 'time' counter
   * @name module:Activity.Activity#bTimeCounter
   * @type {boolean} */
  bTimeCounter: true,
  /**
   * Whether to display or not the 'score' counter
   * @name module:Activity.Activity#bScoreCounter
   * @type {boolean} */
  bScoreCounter: true,
  /**
   * Whether to display or not the 'actions' counter
   * @name module:Activity.Activity#bActionsCounter
   * @type {boolean} */
  bActionsCounter: true,
  /**
   * Special object used to generate random content at the start of the activity
   * @name module:Activity.Activity#acp
   * @type {module:automation/AutoContentProvider.AutoContentProvider} */
  acp: null,
  //
  // Fields used only in certain activity types
  // ------------------------------------------
  //
  /**
   * Array of bags with the description of the content to be displayed on panels and cells.
   * @name module:Activity.Activity#abc
   * @type {module:boxes/ActiveBagContent.ActiveBagContent[]} */
  abc: null,
  /**
   * Content of the grid of letters used in crosswords and shuffled letters
   * @name module:Activity.Activity#tgc
   * @type {module:boxes/TextGridContent.TextGridContent} */
  tgc: null,
  /**
   * The main document used in text activities
   * @name module:Activity.Activity#document
   * @type {module:activities/text/TextActivityDocument.TextActivityDocument} */
  document: null,
  /**
   * Relative position of the text grid (uses the same position codes as box grids)
   * @name module:Activity.Activity#boxGridPos
   * @type {string} */
  boxGridPos: 'AB',
  /**
   * Number of times to shuffle the cells at the beginning of the activity
   * @name module:Activity.Activity#shuffles
   * @type {number} */
  shuffles: settings.DEFAULT_SHUFFLES,
  /**
   * Box grid A must be shuffled.
   * @name module:Activity.Activity#shuffleA
   * @type {boolean} */
  shuffleA: true,
  /**
   * Box grid B must be shuffled.
   * @name module:Activity.Activity#shuffleB
   * @type {boolean} */
  shuffleB: true,
  /**
   * Flag to indicate "inverse resolution" in complex associations
   * @name module:Activity.Activity#invAss
   * @type {boolean} */
  invAss: false,
  /**
   * Array of menu elements, used in activities of type {@link module:activities/panels/Menu.Menu Menu}
   * @name module:Activity.Activity#menuElements
   * @type {object[]} */
  menuElements: null,
  /**
   * This activity uses numeric expressions, so text literals should be
   * converted to numbers for comparisions, taking in account the
   * number format of the current locale (dot or comma as decimal separator)
   * @name module:Activity.Activity#numericContent
   * @type {boolean} */
  numericContent: false,
});

/**
 * This object is responsible for rendering the contents of the activity on the screen and
 * managing user's interaction.
 * Each type of Activity must implement its own `ActivityPanel`.
 * In JClic, {@link http://projectestac.github.io/jclic/apidoc/edu/xtec/jclic/Activity.Panel.html Activity.Panel}
 * extends {@link http://docs.oracle.com/javase/7/docs/api/javax/swing/JPanel.html javax.swing.JPanel}.
 * On this implementation, the JPanel will be replaced by an HTML `div` tag.
 * @extends module:AWT.Container
 */
export class ActivityPanel extends Container {
  /**
   * ActivityPanel constructor
   * @param {module:Activity.Activity} act - The {@link module:Activity.Activity Activity} to which this Panel belongs
   * @param {module:JClicPlayer.JClicPlayer} ps - Any object implementing the methods defined in the
   * {@link http://projectestac.github.io/jclic/apidoc/edu/xtec/jclic/PlayStation.html PlayStation}
   * Java interface.
   * @param {external:jQuery} [$div] - The jQuery DOM element where this Panel will deploy
   */
  constructor(act, ps, $div) {
    // ActivityPanel extends Container
    super();
    this.act = act;
    this.ps = ps;
    this.minimumSize = new Dimension(100, 100);
    this.preferredSize = new Dimension(500, 400);
    if ($div)
      this.$div = $div;
    else
      this.$div = $('<div/>', { class: 'JClicActivity', 'aria-label': getMsg('Activity panel') });
    this.act.initAutoContentProvider();
  }

  /**
   * Sets the size and position of this activity panel
   * @param {module:AWT.Rectangle} rect
   */
  setBounds(rect) {
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
  }

  /**
   * Prepares the visual components of the activity
   */
  buildVisualComponents() {
    this.playing = false;
    this.skin = null;
    if (this.act.skinFileName && this.act.skinFileName.length > 0 && this.act.skinFileName !== this.act.project.settings.skinFileName)
      this.skin = this.act.project.mediaBag.getSkinElement(this.act.skinFileName, this.ps);

    this.bgImage = null;
    if (this.act.bgImageFile && this.act.bgImageFile.length > 0) {
      const mbe = this.act.project.mediaBag.getElement(this.act.bgImageFile, true);
      if (mbe)
        this.bgImage = mbe.data;
    }

    this.backgroundColor = this.act.activityBgColor;

    if (this.act.transparentBg)
      this.backgroundTransparent = true;

    // TODO: fix bevel-border type
    if (this.act.border)
      this.border = true;

    const cssAct = {
      display: 'block',
      'background-color': this.backgroundTransparent ? 'transparent' : this.backgroundColor
    };

    // Border shadow style Material Design, inspired in [http://codepen.io/Stenvh/pen/EaeWqW]
    if (this.border) {
      cssAct['box-shadow'] = '0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12)';
      cssAct['border-radius'] = '2px';
      cssAct['color'] = '#272727';
    }

    if (this.act.activityBgGradient)
      cssAct['background-image'] = this.act.activityBgGradient.getCss();

    this.$div.css(cssAct);
  }

  /**
   * Activities should implement this method to update the graphic content of its panel. The method
   * will be called from {@link module:AWT.Container#update} when needed.
   * @param {module:AWT.Rectangle} dirtyRegion - Specifies the area to be updated. When `null`,
   * it's the whole panel.
   */
  updateContent(dirtyRegion) {
    // To be overridden by subclasses. Here does nothing.
    return super.updateContent(dirtyRegion);
  }

  /**
   * Plays the specified event sound
   * @param {string} event - The type of event to be performed
   */
  playEvent(event) {
    this.act.eventSounds.play(event);
  }

  /**
   * Basic initialization procedure, common to all activities.
   */
  initActivity() {
    if (this.playing) {
      this.playing = false;
      this.ps.reportEndActivity(this.act, this.solved);
    }
    this.solved = false;
    this.ps.reportNewActivity(this.act, 0);
    this.attachEvents();
    this.enableCounters();
  }

  /**
   * Called when the activity starts playing
   */
  startActivity() {
    this.playing = true;
  }

  /**
   * Called by {@link module:JClicPlayer.JClicPlayer JClicPlayer} when this activity panel is fully visible, just after the
   * initialization process.
   */
  activityReady() {
    // To be overrided by subclasses
  }

  /**
   * Displays help about the activity
   */
  showHelp() {
    // To be overrided by subclasses
  }

  /**
   * Sets the real dimension of this ActivityPanel.
   * @param {module:AWT.Dimension} maxSize - The maximum surface available for the activity panel
   * @returns {module:AWT.Dimension}
   */
  setDimension(maxSize) {
    return new Dimension(
      Math.min(maxSize.width, this.act.windowSize.width),
      Math.min(maxSize.height, this.act.windowSize.height));
  }

  /**
   * Attaches the events specified in the `events` member to the `$div` member
   */
  attachEvents() {
    this.events.forEach(ev => this.attachEvent(this.$div, ev));
    // Prepare handler to check if we are in a touch device
    if (!settings.TOUCH_DEVICE && $.inArray(TOUCH_TEST_EVENT, this.events) === -1)
      this.attachEvent(this.$div, TOUCH_TEST_EVENT);
  }

  /**
   * Attaches a single event to the specified object
   * @param {external:jQuery} $obj - The object to which the event will be attached
   * @param {string} evt - The event name
   */
  attachEvent($obj, evt) {
    $obj.on(evt, this, event => {
      if (event.type === TOUCH_TEST_EVENT) {
        if (!settings.TOUCH_DEVICE)
          settings.TOUCH_DEVICE = true;
        if ($.inArray(TOUCH_TEST_EVENT, this.events) === -1) {
          // Disconnect handler
          $obj.off(TOUCH_TEST_EVENT);
          return;
        }
      }
      return event.data.processEvent.call(event.data, event);
    });
  }

  /**
   * Main handler used to process mouse, touch, keyboard and edit events.
   * @param {external:Event} event - The HTML event to be processed
   * @returns {boolean} - When this event handler returns `false`, jQuery will stop its
   * propagation through the DOM tree. See: {@link http://api.jquery.com/on}
   */
  processEvent(_event) {
    return false;
  }

  /**
   * Fits the panel within the `proposed` rectangle. The panel can occupy more space, but always
   * not surpassing the `bounds` rectangle.
   * @param {module:AWT.Rectangle} proposed - The proposed rectangle
   * @param {module:AWT.Rectangle} bounds - The maximum allowed bounds
   */
  fitTo(proposed, bounds) {
    const origin = new Point();
    if (this.act.absolutePositioned && this.act.absolutePosition !== null) {
      origin.x = Math.max(0, this.act.absolutePosition.x + proposed.pos.x);
      origin.y = Math.max(0, this.act.absolutePosition.y + proposed.pos.y);
      proposed.dim.width -= this.act.absolutePosition.x;
      proposed.dim.height -= this.act.absolutePosition.y;
    }
    const d = this.setDimension(new Dimension(
      Math.max(2 * this.act.margin + settings.MINIMUM_WIDTH, proposed.dim.width),
      Math.max(2 * this.act.margin + settings.MINIMUM_HEIGHT, proposed.dim.height)));
    if (!this.act.absolutePositioned) {
      origin.moveTo(
        Math.max(0, proposed.pos.x + (proposed.dim.width - d.width) / 2),
        Math.max(0, proposed.pos.y + (proposed.dim.height - d.height) / 2));
    }
    if (origin.x + d.width > bounds.dim.width)
      origin.x = Math.max(0, bounds.dim.width - d.width);
    if (origin.y + d.height > bounds.dim.height)
      origin.y = Math.max(0, bounds.dim.height - d.height);
    this.setBounds(new Rectangle(origin.x, origin.y, d.width, d.height));

    // Build accessible components at the end of current tree
    window.setTimeout(() => this.buildAccessibleComponents(), 0);
  }

  /**
   * 
   * Builds the accessible components needed for this ActivityPanel
   * This method is called when all main elements are placed and visible, when the activity is ready
   * to start or when resized.
   */
  buildAccessibleComponents() {
    // Clear existing elements
    if (this.accessibleCanvas && this.$canvas && this.$canvas.children().length > 0) {
      // UPDATED May 2020: clearHitRegions has been deprecated!
      // this.$canvas.get(-1).getContext('2d').clearHitRegions();
      this.$canvas.empty();
    }
    // Create accessible elements in subclasses
  }

  /**
   *  Forces the ending of the activity.
   */
  forceFinishActivity() {
    // to be overrided by subclasses
  }

  /**
   * Ordinary ending of the activity, usually called form `processEvent`
   * @param {boolean} result - `true` if the activity was successfully completed, `false` otherwise
   */
  finishActivity(result) {
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
  }

  /**
   * Sets the message to be displayed in the skin message box and optionally plays a sound event.
   * @param {string} msgCode - Type of message (initial, final, finalError...)
   * @param {string} [eventSoundsCode] - Optional name of the event sound to be played.
   */
  setAndPlayMsg(msgCode, eventSoundsCode) {
    const msg = this.act.messages[msgCode] || null;
    this.ps.setMsg(msg);
    if (msg === null || msg.mediaContent === null)
      this.playEvent(eventSoundsCode);
  }

  /**
   * Ends the activity
   */
  end() {
    this.forceFinishActivity();
    if (this.playing) {
      if (this.bc !== null)
        this.bc.end();
      this.ps.reportEndActivity(this.act, this.solved);
      this.playing = false;
      this.solved = false;
    }
    this.clear();
  }

  /**
   * Miscellaneous cleaning operations
   */
  clear() {
    // to be overridden by subclasses
  }

  /**
   * Enables or disables the three counters (time, score and actions)
   * @param {boolean} eTime - Whether to enable or disable the time counter
   * @param {boolean} eScore - Whether to enable or disable the score counter
   * @param {boolean} eActions - Whether to enable or disable the actions counter
   */
  enableCounters(eTime, eScore, eActions) {
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
  }

  /**
   * Shuffles the contents of the activity
   * @param {module:boxes/ActiveBoxBag.ActiveBoxBag[]} bg - The sets of boxes to be shuffled
   * @param {boolean} visible - The shuffle process must be animated on the screen (not yet implemented!)
   * @param {boolean} fitInArea - Shuffled pieces cannot go out of the current area
   */
  shuffle(bg, visible, fitInArea) {
    const steps = this.act.shuffles;
    let i = steps;
    while (i > 0) {
      const k = i > steps ? steps : i;
      bg.forEach(abb => { if (abb) abb.shuffleCells(k, fitInArea); });
      i -= steps;
    }
  }
}

Object.assign(ActivityPanel.prototype, {
  /**
   * The Activity this panel is related to
   * @name module:Activity.ActivityPanel#act
   * @type {module:Activity.Activity} */
  act: null,
  /**
   * The jQuery div element used by this panel
   * @name module:Activity.ActivityPanel#$div
   * @type {external:jQuery} */
  $div: null,
  /**
   * The jQuery main canvas element used by this panel
   * @name module:Activity.ActivityPanel#$canvas
   * @type {external:jQuery} */
  $canvas: null,
  /**
   * Always true, since canvas hit regions have been deprecated!
   * See: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Hit_regions_and_accessibility
   * @name module:Activity.ActivityPanel#accessibleCanvas
   * @type {boolean}
   */
  accessibleCanvas: true,
  /**
   * The realized current {@link module:skins/Skin.Skin Skin}
   * @name module:Activity.ActivityPanel#skin
   * @type {module:skins/Skin.Skin} */
  skin: null,
  /**
   * Background element (currently a `span`) used to place animated GIFs when needed
   * @name module:Activity.ActivityPanel#$animatedBg
   * @type {external:jQuery} */
  $animatedBg: null,
  /**
   * Additional background element for animated GIFs, used in associations
   * @name module:Activity.ActivityPanel#$animatedBgB
   * @type {external:jQuery} */
  $animatedBgB: null,
  /**
   * `true` when the activity is solved, `false` otherwise
   * @name module:Activity.ActivityPanel#solved
   * @type {boolean} */
  solved: false,
  /**
   * The realized image used as a background
   * @name module:Activity.ActivityPanel#bgImage
   * @type {external:HTMLImageElement} */
  bgImage: null,
  /**
   * `true` while the activity is playing
   * @name module:Activity.ActivityPanel#playing
   * @type {boolean} */
  playing: false,
  /**
   * `true` if the activity is running for first time (not due to a click on the `replay` button)
   * @name module:Activity.ActivityPanel#firstRun
   * @type {boolean} */
  firstRun: true,
  /**
   * Currently selected item. Used in some types of activities.
   * @name module:Activity.ActivityPanel#currentItem
   * @type {number} */
  currentItem: 0,
  /**
   * The object used to connect cells and other elements in some types of activity
   * @name module:Activity.ActivityPanel#bc
   * @type {module:boxes/BoxConnector.BoxConnector} */
  bc: null,
  /**
   * The PlayStation used to realize media objects and communicate with the player services
   * (usually a {@link module:JClicPlayer.JClicPlayer JClicPlayer}
   * @name module:Activity.ActivityPanel#ps
   * @type {module:JClicPlayer.JClicPlayer} */
  ps: null,
  /**
   * The minimum size of this kind of ActivityPanel
   * @name module:Activity.ActivityPanel#minimumSize
   * @type {module:AWT.Dimension} */
  minimumSize: null,
  /**
   * The preferred size of this kind of ActivityPanel
   * @name module:Activity.ActivityPanel#preferredSize
   * @type {module:AWT.Dimension} */
  preferredSize: null,
  /**
   * List of events intercepted by this ActivityPanel. Current events are: 'keydown', 'keyup',
   * 'keypress', 'mousedown', 'mouseup', 'click', 'dblclick', 'mousemove', 'mouseenter',
   * 'mouseleave', 'mouseover', 'mouseout', 'touchstart', 'touchend', 'touchmove' and 'touchcancel'.
   * @name module:Activity.ActivityPanel#events
   * @type {string[]} */
  events: ['click'],
  backgroundColor: null,
  backgroundTransparent: false,
  border: null,
});

/**
 * The panel class associated to each type of activity
 * @type {module:Activity.ActivityPanel} */
Activity.Panel = ActivityPanel;

export default Activity;
