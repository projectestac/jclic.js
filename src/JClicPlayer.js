//    File    : JClicPlayer.js  
//    Created : 28/04/2015  
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
  "./PlayerHistory",
  "./media/ActiveMediaBag",
  "./skins/Skin",
  "./media/EventSounds",
  "./project/JClicProject",
  "./bags/JumpInfo",
  "./boxes/ActiveBoxContent"
], function ($, Utils, AWT, PlayerHistory, ActiveMediaBag, Skin, EventSounds, JClicProject, 
             JumpInfo, ActiveBoxContent) {

//
//  JClicPlayer is one of the the main classes of the JClic system. It implements
//  the [PlayStation](http://projectestac.github.io/jclic/apidoc/edu/xtec/jclic/PlayStation.html)
//  interface, needed to read and play JClic projects.
//  JClicPlayer offers to [Activity.Panel](Activity.html) objects all the necessary
//  resources: media bags (to load and realize images and other media contents),
//  sequence control, management of the report system, user interface, displaying 
//  of system messages, etc.
  var JClicPlayer = function ($topDiv, $div) {

    // JClicPlayer extends AWT.Container
    AWT.Container.call(this);

    this.$topDiv = $topDiv;

    // $div usually is `undefined`
    this.$div = $div;
    if ($div)
      this.dim = new AWT.Dimension($div.width(), $div.height());
    else
      this.$div = $('<div class="JClicPlayer"/>');

    this.project = new JClicProject();
    this.activeMediaBag = new ActiveMediaBag();
    this.counterVal = {score: 0, actions: 0, time: 0};
    this.bgImageOrigin = new AWT.Point();
    this.buildActions();
    this.history = new PlayerHistory(this);
    this.audioEnabled = this.options.AUDIO_ENABLED;
    this.navButtonsAlways = this.options.NAV_BUTTONS_ALWAYS;
    this.defaultSkin = Skin.prototype.getSkin(null, this, this.$topDiv);
    this.setSkin(this.defaultSkin);
    this.createEventSounds();
    this.initTimers();
    this.setSystemMessage("ready");
  };

  JClicPlayer.prototype = {
    constructor: JClicPlayer,
    //
    // Miscellaneous options to be stored in the prototype
    options: {
      // Max waiting time to have all media loaded (milliseconds)
      MAX_WAIT_TIME: 120000,
      // Name of the frame where to open links
      INFO_URL_FRAME: '_blank',
      // URL where to navigate to on exit
      EXIT_URL: null,
      // At the beginning, audio should be enabled or disabled
      AUDIO_ENABLED: true,
      // Navigation buttons are always visible (for debugging purposes)
      NAV_BUTTONS_ALWAYS: true
    },
    //
    // The JQuery "div" element used by this player.
    $div: null,
    // 
    // The JQuery top container of all JClic components (also a 'div' DOM element)
    $topDiv: null,
    // 
    // The [JClicProject](JclicProject.html) currently hosted in this player
    project: null,
    // 
    // Object of type [Activity.Panel](Activity.html) linked to the `Activity`
    // currently running in this player.
    actPanel: null,
    // 
    // Object of type [PlayerHistory](PlayerHistory.html), responsible for recording
    // the list of the activities played in the current session.
    // TODO: Implement PlayerHistory!
    history: null,
    //
    // The current [Skin](Skin.html) used in this player
    skin: null,
    //
    // The default [Skin](Skin.html) to be used if none specified
    defaultSkin: null,
    // 
    // Object of type [ActiveMediaBag](ActiveMediaBag.html) containing references
    // to realized media objects, ready to play.
    // TODO: Implement ActiveMediaBag!
    activeMediaBag: null,
    //
    // Object of type [Reporter](Reporter.html), responsible of passing the scores
    // done in the activities to external reporting systems.
    // TODO: Implement Reporter!
    reporter: null,
    //
    // Object of type [EventSounds](EventSounds.html) with the current set of
    // system sonds used in this player.
    eventSounds: null,
    //
    // Collection of AWT.Action objects
    actions: {},
    //
    // Main timer object used to feed the time counter. Ticks every second.
    timer: null,
    // 
    // AWT.Timer for delayed actions
    delayedTimer: null,
    //
    // AWT.Action for delayed actions
    delayedAction: null,
    // 
    // Current values of the counters
    counterVal: {score: 0, actions: 0, time: 0},
    // 
    // Splash image to display while loading
    splashImg: null,
    //
    // An [AWT.Point](AWT.html) indicating the origin of the background image
    bgImageOrigin: null,
    // 
    // This flag indicates that the player must play all the sounds (including 
    // system sounds) and other media contents of the activities.
    audioEnabled: true,
    //
    // This flag indicates if the navigation buttons `next` and `back` are
    // enabled o disabled.
    navButtonsDisabled: false,
    //
    // When this flag is `true`, the navigation buttons are always enabled despite
    // of the indications made by the activities or the sequence control system.
    // Used only to debug projects with complicated sequence chaining.
    navButtonsAlways: false,
    // 
    // Builds actions for this player
    buildActions: function () {
      var tp = this;
      this.actions = {
        'next': new AWT.Action('next', function () {
          tp.history.processJump(tp.project.activitySequence.getJump(false, tp.reporter), false);
        }),
        'prev': new AWT.Action('prev', function () {
          tp.history.processJump(tp.project.activitySequence.getJump(true, tp.reporter), false);

        }),
        'return': new AWT.Action('return', function () {
          tp.history.pop();
        }),
        'reset': new AWT.Action('reset', function () {
          if (tp.actPanel && tp.actPanel.act.canReinit())
            tp.initActivity();
        }),
        'help': new AWT.Action('help', function () {
          if (tp.actPanel !== null)
            tp.actPanel.showHelp();
        }),
        'info': new AWT.Action('info', function () {
          if (tp.actPanel && tp.actPanel.act.hasInfo()) {
            if (tp.actPanel.act.infoUrl) {
              tp.displayUrl(tp.act.infoUrl, true);
            }
            else if (tp.actPanel.act.infoCmd) {
              tp.runCmd(tp.actPanel.act.infoCmd);
            }
          }
        }),
        'reports': new AWT.Action('reports', function (ev) {
          tp.showAbout(true);
        }),
        'audio': new AWT.Action('audio', function (ev) {
          tp.audioEnabled = !tp.audioEnabled;
          if (!tp.audioEnabled)
            tp.stopMedia();
          EventSounds.prototype.globalEnabled = tp.audioEnabled;
        })
      };
    },
    //
    // Starts the player loading a JClic project (if specified). When the
    // `sequence` parameter is not `null` or `undefined` the session will start 
    // at the specified sequence element tag (or at the nth element of the list
    // if `sequence` is a number)
    start: function (path, sequence) {
      this.initReporter();
      if (path !== null)
        return this.load(path, sequence);
      else
        return false;
    },
    // This method is called when the container gains the focus for the first
    // time or when losts it. Currently not used.
    activate: function () {
      // Do nothing
    },
    //
    // Instructs the player to stop working
    stop: function () {
      this.stopMedia(-1);
    },
    //
    // Executes miscellaneous finalization routines.
    end: function () {
      this.stopMedia();
      this.closeHelpWindow();
      if (this.actPanel) {
        this.actPanel.end();
        this.actPanel.$div.detach();
        this.actPanel = null;
      }
      if (this.eventSounds) {
        this.eventSounds.close();
        this.eventSounds = null;
      }
      if (this.project) {
        this.project.end();
        this.project = null;
      }
      if (this.activeMediaBag)
        this.activeMediaBag.removeAll();
      if (this.reporter) {
        this.reporter.end();
        this.reporter = null;
      }
    },
    //
    // Creates and initializes mouse cursors (currently not implemented)
    createCursors: function () {
    },
    //
    // Creates and initializes the `eventSounds` member
    createEventSounds: function () {

      this.eventSounds = new EventSounds(null);
      // TODO: Assign the default sound for each event
      this.eventSounds.realize(this.project.mediaBag);
      EventSounds.prototype.globalEnabled = true;
    },
    //
    // Creates and initializes the `reporter` member
    initReporter: function () {
      if (this.reporter) {
        this.reporter.end();
        this.reporter = null;
      }
      // TODO: Build a reporter and assign to this.reporter
    },
    //
    // Creates and initializes timers
    initTimers: function () {
      // Main timer
      if (this.timer)
        this.timer.stop();
      var thisPlayer = this;
      this.timer = new AWT.Timer(function () {
        thisPlayer.incCounterValue('time');
        if (thisPlayer.actPanel && thisPlayer.actPanel.act.maxTime > 0 &&
            thisPlayer.actPanel.isPlaying() &&
            thisPlayer.counterVal['time'] >= thisPlayer.actPanel.act.maxTime) {
          thisPlayer.actPanel.finishActivity(false);
        }
      }, 1000, false);

      // One-time timer, for delayed actions
      if (this.delayedTimer)
        this.delayedTimer.stop();

      this.delayedTimer = new AWT.Timer(function () {
        if (thisPlayer.delayedAction) {
          thisPlayer.delayedAction.processEvent(thisPlayer.delayedAction, null);
        }
      }, 1000, false);
      this.delayedTimer.repeats = false;
    },
    //
    // Closes the help dialog window
    closeHelpWindow: function () {
      if (this.skin) {
        this.skin.showHelp(null);
        this.skin.showAbout(null);
      }
    },
    //
    // Returns the JQuery DOM top component (usually, the [Skin](Skin.html) `$div` member)
    getTopComponent: function () {
      if (this.skin)
        return this.skin.$getTopComponent();
      else
        return this.$div;
    },
    //
    // Sets the current [Skin](Skin.html)
    setSkin: function (newSkin) {
      if (!newSkin)
        newSkin = this.defaultSkin;

      if (newSkin !== null && !newSkin.equals(this.skin)) {
        /*
         * TODO: Save and retrieve skin settings
         var top = null;
         var currentSkinSettings = null;
         
         if (this.skin !== null) {
         currentSkinSettings = this.skin.getCurrentSettings();
         this.skin.detach();
         top = this.skin.getParent();
         top.remove(this.skin);
         }
         */

        newSkin.attach(this);
        this.skin = newSkin;
        this.skin.doLayout();

        /*
         if (currentSkinSettings !== null && this.skin !== null)
         this.skin.setCurrentSettings(currentSkinSettings);
         */
      }
    },
    //
    // Sets the current project of this player, without starting any activity
    setProject: function (project) {
      if (this.project !== null) {
        if (this.project !== project)
          this.project.end();
        this.removeActivity();
      }
      this.project = (project !== null ? project : new JClicProject());
      this.project.realize(this.eventSounds, this);
      if (this.project.skin !== null)
        this.defaultSkin = this.project.skin;
    },
    //
    // Loads the specified project and starts playing at the specified activity
    // or sequence tag.
    // project (String, JClicProject or `null`) - The [JClicProject](JClicProject.html)
    // to be loaded (if it's a String) or used. When `null` or `undefined`, refers to
    // the current project.
    // sequence (String, Number or `null`) - Sequence tag or numeric order in the
    // [ActivitySequence](ActivitySequence.html) to be loaded. If
    // _sequence_ and _activity_ are both `null`, the first
    // [ActivitySequenceElement](ActivitySequenceElement.html) will be loaded.
    // activity (String or `null`) - Name of the activity to be loaded (usually `null`)
    load: function (project, sequence, activity) {

      this.forceFinishActivity();
      this.skin.setWaitCursor(true);

      // The Activity.Panel object to be obtained as a result of the loading process
      var actp = null;

      // step one: load the project
      if (project) {
        if (typeof project === 'string') {
          // Should be a file name or URL
          this.setSystemMessage('loading project', project);
          var tp = this;
          $.get(project, null, 'xml')
              .done(function (data) {
                var prj = new JClicProject();
                prj.setProperties($(data).find('JClicProject'), project);
                tp.setSystemMessage('Project file loaded and parsed', project);
                prj.mediaBag.buildAll();
                var loops = 0;
                var interval = 500;
                var checkMedia = window.setInterval(function () {
                  // Wait for a maximum time of two minutes
                  if (++loops > tp.options.MAX_WAIT_TIME / interval) {
                    window.clearInterval(checkMedia);
                    tp.setSystemMessage('Error loading media!');
                    // alert?                    
                  }
                  if (!prj.mediaBag.isWaiting()) {
                    window.clearInterval(checkMedia);
                    // Call again `load`, passing the loaded [JClicProject](JClicProject.html) object
                    tp.load(prj, sequence, activity);
                  }
                }, interval);
              })
              .fail(function (jqXHR, textStatus, errorThrown) {
                var errMsg = textStatus + ' (' + errorThrown + ') while loading ' + project;
                tp.setSystemMessage('Error', errMsg);
                alert('Error!\n' + errMsg);
              })
              .always(function () {
                tp.skin.setWaitCursor(false);
              });
          return;
        }

        // From here, assume that `project` is a [JClicProject](JClicProject.html)
        this.setProject(project);

        // init reporter
        if (this.reporter !== null)
          this.reporter.newSession(project.name, this);

        // If none specified, start with the first element of the sequence
        if (!sequence)
          sequence = '0';
      }

      // Step two: load the ActivitySequenceElement
      if (sequence) {
        this.setSystemMessage('Loading sequence', sequence);
        this.navButtonsDisabled = false;
        // Try to load sequence by tag
        var ase = null;
        if (typeof sequence === 'string')
          ase = this.project.activitySequence.getElementByTag(sequence, true);
        if (ase === null) {
          // Try to treat 'sequence' as a number
          var n = parseInt(sequence);
          if (typeof n === 'number')
            ase = this.project.activitySequence.getElement(n, true);
        }

        if (ase !== null) {
          // Success! We have a real [ActivitySequenceElement](ActivitySequenceElement.html)
          if (this.reporter)
            this.reporter.newSequence(ase);
          activity = ase.activityName;
        }
      }

      // Step three: load the activity
      if (activity) {
        var act = this.project.activities[activity];
        if (act) {
          // Success! We have a real [Activity](Activity.html)
          this.setSystemMessage('Loading activity', activity);
          act.prepareMedia(this);
          this.project.activitySequence.checkCurrentActivity(act.name);
          actp = act.getActivityPanel(this);
          actp.buildVisualComponents();
        }
        else {
          this.setSystemMessage('Error: Missing activity', activity);
          // Alert ?
        }
      }

      // Step four: put the activity panel on place

      // Remove the current Activity.Panel
      if (this.actPanel !== null) {
        this.actPanel.end();
        this.actPanel.$div.detach();
        this.actPanel = null;
        this.setCounterValue('time', 0);
      }

      // Attach the new Activity.Panel
      if (actp) {
        // Sets the actPanel member to this Activity.Panel
        this.actPanel = actp;
        // Places the JQuery DOM element of actPanel into the player's one
        this.$div.prepend(this.actPanel.$div);
        if (this.skin)
          this.skin.resetAllCounters(false);

        // Sets the current skin
        if (this.actPanel.skin)
          this.setSkin(this.actPanel.skin);
        else if (this.project.skin)
          this.setSkin(this.project.skin);
        else
          this.setSkin(null);
        
        if (this.skin) {
          // Enable or disable actions
          var hasReturn = this.history.storedElementsCount() > 0;
          var navBtnFlag = this.navButtonsAlways ? 
          'both' : this.navButtonsDisabled ? 
          'none' : this.project.activitySequence.getNavButtonsFlag();
          this.actions['next'].setEnabled((navBtnFlag === 'fwd' || navBtnFlag === 'both') &&
              this.project.activitySequence.hasNextAct(hasReturn));
          this.actions['prev'].setEnabled((navBtnFlag === 'back' || navBtnFlag === 'both') &&
              this.project.activitySequence.hasPrevAct(hasReturn));
          this.actions['return'].setEnabled(this.history.storedElementsCount() > 0);
          this.actions['help'].setEnabled(this.actPanel.act.helpWindowAllowed());
          this.actions['reset'].setEnabled(this.actPanel.act.canReinit());
          this.actions['info'].setEnabled(this.actPanel.act.hasInfo());
        }
        this.setSystemMessage('activity ready');
        this.doLayout();
        this.initActivity();
      }
      this.skin.setWaitCursor(false);
    },
    //
    // Forces to stop playing the current activity
    forceFinishActivity: function () {
      this.timer.stop();
      this.delayedTimer.stop();
      if (this.actPanel) {
        this.closeHelpWindow();
        this.actPanel.forceFinishActivity();
        this.stopMedia();
        this.activeMediaBag.removeAll();
      }
    },
    // 
    // Removes the current Activity.Panel of this player
    removeActivity: function () {
      this.forceFinishActivity();
      if (this.actPanel) {
        this.actPanel.end();
        this.actPanel.$div.detach();
        this.actPanel = null;
        this.setMsg(null);
        this.setBackgroundSettings(null);
        this.doLayout();
      }
    },
    // 
    // Initialises the activity
    initActivity: function () {
      this.setWaitCursor(true);
      this.timer.stop();
      this.delayedTimer.stop();
      this.setCounterValue('time', 0);
      this.stopMedia();
      if (this.actPanel) {
        this.actPanel.initActivity();
        this.timer.start();
        if (!this.actPanel.act.mustPauseSequence())
          this.startAutoPassTimer();
        this.setSystemMessage('Activity running', this.actPanel.act.name);
      }
      this.setWaitCursor(false);
    },
    // 
    // Just starts the activity (called from Text activities, when in prev screen)
    startActivity: function (activityPanel) {
      this.setWaitCursor(true);
      if (this.actPanel)
        this.actPanel.startActivity();
      this.setWaitCursor(false);
    },
    // 
    // Configures the layout and visual aspect of the player area
    doLayout: function () {
      
      // Main player area settings
      var width = this.dim.width = this.$div.width();
      var height = this.dim.height = this.$div.height();
      
      var mainCss = {
        'background-color': this.actPanel ? this.actPanel.act.bgColor : 'azure',
        'background-image': ''
      };
      if (this.actPanel) {
        var act = this.actPanel.act;
        if (act.bgGradient)
          // Canvas version also available
          mainCss['background-image'] = act.bgGradient.getCss();

        if (act.bgImageFile) {
          var bgImageUrl = this.project.mediaBag.elements[act.bgImageFile].fileName;
          var repeat = act.tiledBgImg ? 'repeat' : 'no-repeat';
          mainCss['background-image'] = 'url(\'' + bgImageUrl + '\')';
          mainCss['background-repeat'] = repeat;
          if (repeat === 'no-repeat')
            mainCss['background-position'] = 'center center';
          else
            bgImageUrl = '';
        }
        
        // Activity panel settings
        // Calc the maximum rectangle available for the activity panel
        var m = Utils.settings.BoxBase.AC_MARGIN;
        var proposedRect = new AWT.Rectangle(m, m, width-2*m, height-2*m);
        
        if(this.actPanel.bgImage && !act.tiledBgImg && act.absolutePositioned){
          // Special case: when the activity has a background image not tiled, and an absolute
          // position has been specified, the Activity.Panel must be placed at this absolute
          // position, relative to the background image
          this.bgImageOrigin.x = (width - this.actPanel.bgImage.width)/2;
          this.bgImageOrigin.y = (height - this.actPanel.bgImage.height)/2;
          proposedRect.pos.moveTo(this.bgImageOrigin);
          proposedRect.dim.width -= (this.bgImageOrigin.x - m);
          proposedRect.dim.height -= (this.bgImageOrigin.y - m);
          proposedRect.dim.width = Math.min(proposedRect.dim.width, width);
          proposedRect.dim.height = Math.min(proposedRect.dim.height, height);
        }
        
        // Activity.Panel will calc and set its position and size based on the maximum and optimal
        // available space
        this.actPanel.fitTo(proposedRect, this);
      }
      this.$div.css(mainCss);
    },
    //
    // Plays the specified media
    // * mediaContent([MediaContent](MediaContent)) - The media content to be played.
    // * mediaPlacement([ActiveBox](ActiveBox.html) - The visual placement of the media,
    // when applicable.
    playMedia: function (mediaContent, mediaPlacement) {

      // Run asyncronously to avoid UI locking. In Java this was achieved
      // with `SwingUtilities.invokeLater`.
      // Here we will use `setTimeout` better to use a
      // [WebWorker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)?
      var thisPlayer = this;
      var ji = null;
      var fn = mediaContent.mediaFileName;
      window.setTimeout(function () {
        switch (mediaContent.mediaType) {
          case 'RUN_CLIC_PACKAGE':
            ji = new JumpInfo('JUMP', fn);
            ji.projectPath = mediaContent.externalParam;
            thisPlayer.history.processJump(ji, true);
            break;

          case 'RUN_CLIC_ACTIVITY':
            thisPlayer.history.push();
            thisPlayer.load(null, null, fn);
            break;

          case 'RETURN':
            thisPlayer.history.pop();
            break;

          case 'EXIT':
            ji = new JumpInfo('EXIT', fn);
            thisPlayer.history.processJump(ji, false);
            break;

          case 'RUN_EXTERNAL':
            thisPlayer.runCmd(fn);
            break;

          case 'URL':
            if (fn)
              thisPlayer.displayUrl(fn, true);
            break;

          case 'PLAY_AUDIO':
          case 'PLAY_VIDEO':
          case 'PLAY_MIDI':
          case 'RECORD_AUDIO':
          case 'PLAY_RECORDED_AUDIO':
            if (thisPlayer.audioEnabled) {
              var amp = thisPlayer.activeMediaBag.getActiveMediaPlayer(
                  mediaContent,
                  thisPlayer.project.mediaBag,
                  thisPlayer);
              if (amp)
                amp.play(mediaPlacement);

            }
            break;
          default:
            thisPlayer.setSystemMessage('unknown media type', mediaContent.mediaType);
            break;
        }
      }, 0);
    },
    //
    // Stops currently playing media
    stopMedia: function (level) {
      if (typeof level !== 'number')
        level = -1;
      this.activeMediaBag.stopAll(level);
    },
    //
    // Launches the specified external command
    // (currently dues nothing)
    runCmd: function (cmd) {
      this.setSystemMessage('Unsupported call to external command', cmd);
    },
    // 
    // Called from [Activity](Activity.html) when finishing
    // * completedOK (boolean) - The user has successful completed the activity
    activityFinished: function (completedOK) {
      this.closehelpWindow();
      this.setSystemMessage('activity finished');
      this.timer.stop();
      this.startAutoPassTimer();
    },
    //
    // Starts the automatic passing to the next activity, if applicable
    startAutoPassTimer: function () {
      var ase = this.project.activitySequence.getCurrentAct();
      if (ase !== null && ase.delay > 0 && !this.delayedTimer.isRunning() && !this.navButtonsDisabled) {
        this.delayedAction = this.actions['next'];
        this.delayedTimer.delay = ase.delay * 1000;
        this.delayedTimer.start();
      }
    },
    //
    // Sets the background settings of this player
    setBackgroundSettings: function (act) {
      this.doLayout();
    },
    //
    // Sets the current main message
    setMsg: function (abc) {
      var ab = null;
      if (this.skin)
        ab = this.skin.getMsgBox();
      if (ab !== null) {
        ab.clear();
        ab.setContent(abc ? abc : ActiveBoxContent.prototype.EMPTY_CONTENT);
        ab.repaint();
      }
    },
    //
    // Launches the active media content present in the message box, if any 
    playMsg: function () {
      if (this.skin && this.skin.getMsgBox())
        this.skin.getMsgBox().playMedia(this);
    },
    // 
    // Sets the specified value to a counter
    setCounterValue: function (counter, newValue) {
      this.counterVal[counter] = newValue;
      if (this.skin && this.skin.counters[counter])
        this.skin.counters[counter].setValue(newValue);
    },
    //
    // Gets the current value of the specified counter
    getCounterValue: function (counter) {
      return this.counterVal[counter];
    },
    // 
    // Enables or disables a specific counter
    setCounterEnabled: function (counter, bEnabled) {
      if (this.skin) {
        this.skin.enableCounter(counter, bEnabled);
        this.setCountDown(counter, 0);
      }
    },
    // Increments the value of the specified counter
    incCounterValue: function (counter) {
      this.counterVal[counter]++;
      var actp = this.actPanel;
      var cnt = this.skin ? this.skin.counters[counter] : null;
      if (cnt)
        cnt.setValue(this.counterVal[counter]);
      if (counter === 'actions' &&
          actp !== null &&
          actp.act.maxActions > 0 &&
          actp.isPlaying() &&
          this.counterVal['actions'] >= actp.act.maxActions) {
        window.setTimeout(function () {
          actp.finishActivity(actp.solved);
        }, 0);
      }
    },
    // 
    // Sets the specified counter in count-down status, starting at maxValue
    setCountDown: function (counter, maxValue) {
      this.counterVal[counter] = maxValue;
      if (this.skin && this.skin.counters[counter])
        this.skin.counters[counter].setCountDown(maxValue);
    },
    // 
    // Sets / unsets the panel in 'wait' state
    setWaitCursor: function (status) {
      if (this.skin)
        this.skin.setWaitCursor(status);
    },
    // 
    // Displays system messages
    setSystemMessage: function (msg1, msg2) {
      if (this.skin !== null)
        this.skin.setSystemMessage(msg1, msg2);
      else
        console.log((msg1 ? msg1 + ' - ' : '') + (msg2 ? msg2 : ''));
    },
    //
    // Builds an [ActiveMediaPlayer](ActiveMediaPlayer.html) for the specified
    // [MediaContent](MediaContent.html)
    getActiveMediaPlayer: function (mediaContent) {
      if (this.activeMediaBag && mediaContent)
        return this.activeMediaBag.getActiveMediaPlayer(mediaContent, this.project.mediaBag, this);
      else
        return null;
    },
    // 
    // Notifies the reporting system that a new activity has started
    // * act ([Activity](Activity.html)) - The activity that is sending the notification
    reportNewActivity: function (act) {
      var ase = this.project.activitySequence.getCurrentAct();
      if (this.reporter) {
        if (ase.getTag() === this.reporter.getCurrentSequenceTag())
          // Notify that the sequence has changed
          this.reporter.newSequence(ase);
        if (act.includeInReports)
          this.reporter.newActivity(act);
      }
      this.setCounterValue('actions', 0);
      this.setCounterValue('score', 0);
    },
    //
    // Notifies the reporting system that a new action has been performed in the current activity
    // * act ([Activity](Activity.html)) - The activity that is sending the notification
    // * type (string) - Type of action (match, move, switch...)
    // * source (string) - Object acting as a source of the action (cell, grid, clue...)
    // * dest (string) - When applicable, object acting as a receiver of the action (cell, grid...)
    // * ok (boolean) - The action was OK
    // * currentScore (number) - The current score of the activity
    reportNewAction: function (act, type, source, dest, ok, currentScore) {
      if (this.reporter && act.includeInReports && act.reportActions)
        this.reporter.newAction(type, source, dest, ok);
      if (currentScore >= 0) {
        this.incCounterValue('actions');
        this.setCounterValue('score', currentScore);
      }
    },
    // 
    // Notifies the reporting system that the current activity has finished
    reportEndActivity: function (act, solved) {
      if (this.reporter && act.includeInReports)
        this.reporter.endActivity(this.counterVal['score'], this.counterVal['actions'], solved);
    },
    //
    // Shows the help info provided by the activity
    showHelp: function ($hlpComponent) {
      if (this.skin) {
        this.skin.showHelp($hlpComponent);
        return true;
      }
      return false;
    },
    //
    // Shows the requested URL
    // * url (string) - The URL to navigate to
    // * inFrame (boolean) - Opens in a new frame
    displayURL: function (url, inFrame) {
      if (url) {
        if (inFrame)
          window.open(url, this.options.INFO_URL_FRAME);
        else
          window.location.href = url;
      }
    },
    //
    // Exit function. Has effect only if `EXIT_URL` has been specified in `options`
    exit: function (url) {
      if (!url)
        url = this.options.EXIT_URL;
      if (url)
        displayURL(url, false);
    },
    //
    // Sets a title in a specific HTML element, if provided
    setWindowTitle: function (docTitle) {
      this.setSystemMessage('running', docTitle);
    }
  };

  // JClicPlayer extends AWT.Container
  JClicPlayer.prototype = $.extend(Object.create(AWT.Container.prototype), JClicPlayer.prototype);

  return JClicPlayer;
});
