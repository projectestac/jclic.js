//    File    : Activity.js  
//    Created : 07/04/2015  
//    By      : Francesc Busquets  
//
//    JClic.js  
//    HTML5 player of [JClic](http://clic.xtec.cat) activities  
//    https://github.com/projectestac/jclic.js  
//    (c) 2000-2015 Catalan Educational Telematic Network (XTEC)  
//    This program is free software: you can redistribute it and/or modify it under the terms of
//    the GNU General Public License as published by the Free Software Foundation, version. This
//    program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without
//    even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
//    General Public License for more details. You should have received a copy of the GNU General
//    Public License along with this program. If not, see [http://www.gnu.org/licenses/].  

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

  var K = Utils.settings;

// Activity is the abstract base class for JClic activities. It defines also
// the inner class [ActivityPanel](ActivityPanel.html), wich is
// responsible of the user interaction with the activity content.
// Activities should extend both `Activity` and `ActivityPanel` classes in
// order to become fully operative.
// The Java version of JClic stores activities in memory as JDOM elements
// that must be parsed into Activity objects when requested in order to be
// usable. This implementation of the JavaScript player avoids this intermediate
// encapsulation, and uses only Activity objects.
//
  var Activity = function (project) {
    this.project = project;
    this.eventSounds = new EventSounds(this.project.settings.eventSounds);
    this.messages = {};
    this.abc = {};
  };

  Activity.prototype = {
    constructor: Activity,
    // 
    // `Activity.prototype._CLASSES` contains the list of classes derived from Activity. It
    // should be read-only and updated by real activity classes at creation.
    // TODO: When all activities are created, initialize _CLASSES as an empty object
    _CLASSES: {
      '@panels.Menu': Activity,
      '@textGrid.CrossWord': Activity,
      '@textGrid.WordSearch': Activity
    },
    //
    // Dynamic constructor that returns a specific type of Activity
    // based on the `class` attribute declared in the $xml element  
    // Should be called only from Activity.constructor
    _getActivity: function ($xml, project) {
      var act = null;
      if ($xml && project) {
        var className = $xml.attr('class');
        var cl = Activity.prototype._CLASSES[className];
        if (cl) {
          act = new cl(project);
          act.setProperties($xml);
        }
        else
          console.log('Unknown activity class: ' + className);
      }
      return act;
    },
    // 
    // The [JClicProject](JClicProject.html) this Activity belongs to
    project: null,
    // 
    // The Activity name
    name: K.DEFAULT_NAME,
    // 
    // The activity class name:
    class: null,
    // 
    // Code used in reports to filter queries. Default is `null`.
    code: null,
    // 
    // Type of activity, used in text activities to distinguish between
    // different variants of the same activity. Possible values are:
    // `orderWords`, `orderParagraphs`, `identifyWords`, `identifyChars`
    type: null,
    // 
    // Description of the activity
    description: null,
    // 
    // Space, measured in pixels, between the activity components.
    margin: K.DEFAULT_MARGIN,
    // 
    // Background color of the activity panel.
    bgColor: K.DEFAULT_BG_COLOR,
    // 
    // Object of type [Gradient](Gradient.html) used to draw the background
    // of the activity window.
    bgGradient: null,
    // 
    // Whether the bgImage (if any) has to be tiled across the panel background.
    tiledBgImg: false,
    // 
    // Filename of the image painted in the panel background.
    bgImageFile: null,
    // 
    // Whether to draw a border around the activity panel.
    border: true,
    // 
    // Whether to place the activity panel at the point specified by
    // `absolutePosition` or leave it centered in the main window of the player.
    absolutePositioned: false,
    // 
    // Object of type (Point)[Point.html] indicating the position of the
    // activity panel into the player.
    absolutePosition: null,
    // 
    // Whether to generate usage reports.
    includeInReports: true,
    // 
    // Whether to send action events to the Reporter.
    reportActions: false,
    // 
    // Whether to have a help window or not.
    helpWindow: false,
    // 
    // Whether to show the solution on the help window.
    showSolution: false,
    // 
    // Message to show in the help window when `showSolution` is `false`.
    helpMsg: '',
    // 
    // Specific set of [EventSounds](EventSounds.html) used in the activity.
    // The default is `null`, meaning to use the default sounds.
    eventSounds: null,
    // 
    // Wheter the activity must be solved in a specific order.
    useOrder: false,
    // 
    // Wheter the cells of the activity will be dragged across the screen.
    // When `false`, a line will be painted to link elements.
    dragCells: false,
    // 
    // File name of the Skin used by the activity. The default value is `null`,
    // meaning that the activity will use the skin specified for the project.
    skinFileName: null,
    // 
    // Maximum amount of time (seconds) to solve the activity. The default
    // value is 0, meaning unlimited time.
    maxTime: 0,
    // 
    // Whether the time counter should display a countdown when `maxTime > 0`
    countDownTime: false,
    // 
    // Maximum number of actions allowed to solve the activity. The default
    // value is 0, meaning unlimited actions.
    maxActions: 0,
    // 
    // Whether the actions counter should display a countdown when `maxActions > 0`
    countDownActions: false,
    // 
    // Strings with the URL or the system command to be displayed when the user
    // clicks on the 'info' button. Default is `null`.
    infoUrl: null, infoCmd: null,
    // 
    // Activity messages. Contains objects of type 
    // [ActiveBoxContent](ActiveBoxContent.html)
    messages: null,
    // 
    // Preferred dimension of the activity window
    windowSize: new AWT.Dimension(K.DEFAULT_WIDTH, K.DEFAULT_HEIGHT),
    // 
    // Has transparent background
    transparentBg: false,
    // 
    // Background color of the activity
    activityBgColor: K.DEFAULT_BG_COLOR,
    // 
    // Object of type [Gradient](Gradient.html) used to draw backgrounds
    // inside the activity.
    activityBgGradient: null,
    // 
    // Flags used to display or not the 'time', 'score' and 'actions' counters
    bTimeCounter: true, bScoreCounter: true, bActionsCounter: true,
    // 
    // Object of class [AutoContentProvider](AutoContentProvider.html) used
    // to generate random content in activities.
    acp: null,
    //    
    // Fields used only in certain activity types
    // ------------------------------------------
    //
    // Array of [ActiveBagContent](ActiveBagContent.html) objects with
    // the content of the cells
    abc: null,
    // 
    // Object of type [TextGridContent](TextGridContent.html), used in
    // crosswords and scrambled letters.
    tgc: null,
    // 
    // Position of the text grid (uses the same position codes as box grids)
    boxGridPos: 'AB',
    // 
    // Number of times to shuffle the cells at the beginning of the activity
    shuffles: K.DEFAULT_SHUFFLES,
    // 
    // Object that indicates if box grids A and B must be scrambled.
    scramble: {primary: true, secondary: true},
    // 
    // Flag to indicate "inverse resolution" of complex associations
    invAss: false,
    //
    // Settings specific of [CrossWord](CrossWord.html) activities:
    // 
    // All chars should be displayed in upper case:
    upperCase: true,
    // The case is significant to evaluate answers:
    checkCase: true,
    // The wildchar is transparent:
    wildTransparent: false,
    // In [WordSearch](WordSearch.html), a String array containing all
    // valid clues.
    clues: null,
    //
    // Settings specific of text activities:
    // 
    // Object of type [TextActivityDocument](TextActivityDocument.html)
    tad: null,
    // Object of type [Evaluator](Evaluator.html)
    ev: null,
    // Text activities can have a 'check' button, with a specific label
    checkButtonText: null,
    // Optional text to be shown before the beginning of the activity
    // The field `prevScreenStyle` is of type [BoxBase](BoxBase.html)
    prevScreenText: null, prevScreenStyle: null, prevScreenMaxTime: -1,
    // Jump to the next target when solved the current one
    autoJump: false,
    // Allow to go ahead only when the current target is solved
    forceOkToAdvance: false,
    // In scrambled words activities, allow to scramble among different paragraphs
    amongParagraphs: false,
    //
    // Loads the object settings from a specific JQuery XML element 
    setProperties: function ($xml) {

      var act = this;

      // Read attributes
      $.each($xml.get(0).attributes, function () {
        var name = this.name;
        var val = this.value;
        switch (name) {
          // Generic attributes:
          case 'name':
          case 'class':
          case 'code':
          case 'type':
          case 'description':
            act[name] = val;
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
                  act.helpWindow = (act.helpMsg !== null || act.showSolution);
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
            act.acp = AutoContentProvider.prototype._readAutomation($node, act.project);
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

            // Element specific to [CrossWord](CrossWord.html) and 
            // [WordSearch](WordSearch.html) activities:
          case 'textGrid':
            // Read the 'textGrid' element into a [TextGridContent](TextGridContent.html)
            act.tgc = new TextGridContent().setProperties($node);
            break;

            // Read the clues of [WordSearch](WordSearch.html) activities
          case 'clues':
            // Read the array of clues
            act.clues = [];
            $node.children('clue').each(function () {
              act.clues[Number($(this).attr('id'))] = this.textContent;
            });
            break;

            // Elements specific to text activities:           
          case 'checkButton':
            act.checkButtonText = this.textContent;
            break;

          case 'prevScreen':
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
            act.ev = new Evaluator().setProperties($node);
            break;

          case 'document':
            // Read main document of text activities
            act.document = new TextActivityDocument().setProperties($node, act.project.mediaBag);
            break;
        }
      });

      return this;
    },
    // Utility functions
    // 
    // Read an activity message from an XML element
    readMessage: function ($xml) {
      var msg = new ActiveBoxContent().setProperties($xml, this.project.mediaBag);
      // 
      // Allowed types are: `initial`, `final`, `previous`, `finalError`
      msg.type = $xml.attr('type');
      if (Utils.isNullOrUndef(msg.bb))
        msg.bb = new BoxBase(null);
      return msg;
    },
    //
    // Initialises the [AutoContentProvider](AutoContentProvider.html)
    // if defined
    initAutoContentProvider: function () {
      if (this.acp !== null)
        this.acp.init(this.project);
    },
    //
    // Preloads media content
    // ps (PlayStation)
    prepareMedia: function (ps) {
      if (this.eventSounds !== null)
        this.eventSounds.realize(this.project.mediaBag);

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
    //
    // The activity permits the user to display the solution
    helpSolutionAllowed: function () {
      return false;
    },
    //
    // The activity allows to pop-up a help window
    helpWindowAllowed: function () {
      return this.helpWindow &&
          ((this.helpSolutionAllowed() && this.showSolution) ||
              this.helpMsg !== null);
    },
    //
    // Retrieves the minimum number of actions needed to solve this activity
    getMinNumActions: function () {
      return 0;
    },
    //
    // When this method returns `true`, the automatic jump to the next activity must be paused
    // at this activity.
    mustPauseSequence: function () {
      return this.getMinNumActions() !== 0;
    },
    //
    // Activity can be reinitiated
    canReinit: function () {
      return true;
    },
    //
    // The activity has additional information to be shown
    hasInfo: function () {
      return(
          (this.infoUrl !== null && this.infoUrl.length > 0) ||
          (this.infoCmd !== null && this.infoCmd.length > 0));
    },
    //
    // The activity uses random to scramble internal components
    hasRandom: function () {
      return false;
    },
    //
    // The activity mut always be scrambled
    shuffleAlways: function () {
      return false;
    },
    //
    // The activity uses the keyboard
    needsKeyboard: function () {
      return false;
    },
    //
    // Called when the activity must be disposed
    end: function () {
      if (this.eventSounds !== null) {
        this.eventSounds.close();
        this.eventSounds = null;
      }
      this.clear();
    },
    //
    // Called when the activity must reinit its internal components    
    clear: function () {
    },
    //
    //  Getter and setter methods for  windowSize 
    getWindowSize: function () {
      return new AWT.Dimension(this.windowSize);
    },
    setWindowSize: function (windowSize) {
      this.windowSize = new AWT.Dimension(windowSize);
    },
    //
    // Builds the Activity.Panel object
    // Subclasses must update the `Panel` member of its prototypes
    // to produce specific panels.
    // ps (PlayStation) - See the description of the parameter `ps` in `Panel`
    getActivityPanel: function (ps) {
      return new this.Panel(this, ps);
    },
    //
    // Activity.Panel is the object responsible for rendering the contents of the
    // activity on the screen and managing user's interaction.
    // Each type of activity must implement its own `Activity.Panel`.
    // In JClic, [Activity.Panel](http://projectestac.github.io/jclic/apidoc/edu/xtec/jclic/Activity.Panel.html)
    // extends [javax.swing.JPanel](http://docs.oracle.com/javase/7/docs/api/javax/swing/JPanel.html).
    // In this implementation, the JPanel will be replaced by an HTML DIV tag.
    // The constructor takes two arguments:
    // act (Activity) - The Activity this Panel belongs to
    // ps (currently a [JClicPlayer](JClicPlayer.html) object) - Any object implementing
    // the methods defined in the 
    // [PlayStation](http://projectestac.github.io/jclic/apidoc/edu/xtec/jclic/PlayStation.html) 
    // Java interface.
    Panel: function (act, ps, $div) {
      // Activity.Panel extends AWT.Container
      AWT.Container.call(this);
      this.act = act;
      this.ps = ps;
      this.minimumSize = new AWT.Dimension(100, 100);
      this.preferredSize = new AWT.Dimension(500, 400);
      if ($div)
        this.$div = $div;
      else
        this.$div = $('<div class="JClicActivity"/>');
      this.act.initAutoContentProvider();
    }
  };

  Activity.prototype.Panel.prototype = {
    constructor: Activity.Panel,
    // 
    // The Activity this panel is related to
    act: null,
    //
    // The JQuery div element used by this panel
    $div: null,
    //
    // The realized skin
    skin: null,
    //
    // `true` when the activity is solved, `false` otherwise
    solved: false,
    //
    // The realized background image
    bgImage: null,
    //
    // `true` while the activity is playing
    playing: false,
    //
    // `true` if the activity is running for first time (not because the replay button)
    firstRun: true,
    //
    // Currently selected item. Used in some types of activities.
    currentItem: 0,
    //
    // A [BoxConnector](BoxConnector.html) object
    bc: null,
    //
    // The PlayStation used to display this activity
    ps: null,
    //
    // Fields used to simulate the basic JPanel operation
    minimumSize: null,
    preferredSize: null,
    //
    // current events are: 'keydown', 'keyup', 'keypress', 'mousedown', 'mouseup', 'click',
    // 'dblclick', 'mousemove', 'mouseenter', 'mouseleave', 'mouseover', 'mouseout',
    // 'touchstart', 'touchend', 'touchmove', 'touchcancel'
    events: ['click', 'keypress'],
    backgroundColor: null,
    backgroundTransparent: false,
    border: null,
    // 
    // Sets the size and position of this activity panel
    setBounds: function (rect) {
      AWT.Container.prototype.setBounds.call(this, rect);
      this.$div.css({
        position: 'relative',
        left: rect.pos.x,
        top: rect.pos.y,
        width: rect.dim.width,
        height: rect.dim.height
      });
    },
    //
    // Prepares the visual components of the activity
    buildVisualComponents: function () {
      this.playing = false;

      this.skin = null;
      if (this.act.skinFileName && this.act.skinFileName.length > 0)
        this.skin = this.act.project.mediaBag.getSkinElement(this.act.skinFileName);

      this.bgImage = null;
      if (this.act.bgImageFile && this.act.bgImageFile.length > 0) {
        var mbe = this.act.project.mediaBag.elements[this.act.bgImageFile];
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
        'background-color': this.backgroundTransparent ? 'transparent' : this.backgroundColor,
      };
      
      // Border shadow style Material Design, inspired in http://codepen.io/Stenvh/pen/EaeWqW
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
    //
    // Overrides `AWT.Container.updateContent`
    // Activities should implement this method to update the graphic contents of its panel.
    // The method should be called from AWT.Container.update
    // dirtyRegion (AWT.Rectangle) - Specifies the area to be updated. When `null`, it's the
    // whole panel.
    updateContent: function (dirtyRegion) {
      // To be overrided by subclasses. Does nothing.
      return AWT.Container.prototype.updateContent.call(this, dirtyRegion);
    },
    //
    // Plays the specified event sound
    playEvent: function (event) {
      if (this.act.eventSounds)
        this.act.eventSounds.play(event);
    },
    //
    // Basic init procedure common to all activities
    // (to be overrided by subclasses)
    initActivity: function () {
      if (this.playing) {
        this.playing = false;
        this.ps.reportEndActivity(this.act, this.solved);
      }
      this.solved = false;
      this.ps.reportNewActivity(this.act, 0);
      this.attachEvents();
      this.ps.startActivity();
      this.enableCounters();
    },
    //
    // Start process
    // (to be overrided by subclasses)
    startActivity: function () {
      var msg = this.act.messages['initial'];
      if (msg)
        this.ps.setMsg(msg);
      this.playing = true;
    },
    // 
    // Displays help
    // (to be overrided by subclasses)
    showHelp: function () {
    },
    //
    // Sets the real dimension of the Activity.Panel
    // (to be overrided by subclasses)
    // maxSize(AWT.Dimension)
    // Returns AWT.Dimension
    setDimension: function (maxSize) {
      return new AWT.Dimension(
          Math.min(maxSize.width, this.act.windowSize.width),
          Math.min(maxSize.height, this.act.windowSize.height));
    },
    //
    // Attaches the events specified in the `events` member (an array of String) to the `$div` member
    attachEvents: function () {
      for (var i = 0; i < this.events.length; i++) {
        this.attachEvent(this.$div, this.events[i]);
      }
    },
    //
    // Attaches a single event to the specified object
    // $obj - The JQuery object where the event is produced
    // evt - String with the event name
    attachEvent: function ($obj, evt) {
      $obj.on(evt, this, function (event) {
        return event.data.processEvent.call(event.data, event);
      });
    },
    // 
    // Main handler to receive mouse and key events
    processEvent: function (event) {
      if (this.playing)
        console.log('Event fired: ' + event.type);
      return false;
    },
    //
    // Fits the panel into the `proposed` rectangle, not surpassing the
    // `bounds` rectangle.
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
    },
    //
    // Forces the end of the activity
    // (to be overrided by subclasses)
    forceFinishActivity: function () {
    },
    //
    // Regular ending of the activity
    // reault (boolean) - Indicates if the activity was successfully done by the user
    finishActivity: function (result) {
      this.playing = false;
      this.solved = result;

      if (this.bc !== null)
        this.bc.end();

      if (result) {
        this.setAndPlayMsg('final', 'finishedOk');
      }
      else {
        this.setAndPlayMsg('finalError', 'finishedError');
      }
      this.ps.activityFinished(this.solved);
      this.ps.reportEndActivity(this.act, this.solved);
    },
    //
    // Sets a message in the main message box and optionally plays a sound event
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
    //
    // Ends the activity
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
    // Miscellaneous cleaning operations
    // (to be overrided by subclasses)
    clear: function () {
    },
    //
    // Enables or disables the three counters (time, score and actions)
    enableCounters: function (eTime, eScore, eActions) {
      if (typeof (eTime) === 'undefined')
        eTime = this.act.bTimeCounter;
      if (typeof (eScore) === 'undefined')
        eTime = this.act.bScoreCounter;
      if (typeof (eActions) === 'undefined')
        eTime = this.act.bActionsCounter;

      this.ps.setCounterEnabled('time', eTime);
      if (this.act.countDownTime)
        this.ps.setCountDown('time', this.act.maxTime);
      this.ps.setCounterEnabled('score', eScore);
      this.ps.setCounterEnabled('actions', eActions);
      if (this.act.countDownActions)
        this.ps.setCountDown('actions', this.act.maxActions);
    },
    //
    // Shuffles the contents of the activity
    // bg ((ActiveBoxBag)[ActiveBoxBag.html] array) - The box bag to be shuffled
    // visible (boolean) - The shuffling process must be animated (not implemented)
    // fitInArea (boolean) - Shuffled pieces cannot go out of the current area
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

  Activity.prototype.Panel.prototype = $.extend(Object.create(AWT.Container.prototype), Activity.prototype.Panel.prototype);

  return Activity;
});
