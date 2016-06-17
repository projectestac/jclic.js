//  File    : JClicPlayer.js  
//  Created : 28/04/2015  
//  By      : Francesc Busquets  
//
//  JClic.js  
//  HTML5 player of [JClic](http://clic.xtec.cat) activities  
//  https://github.com/projectestac/jclic.js  
//  (c) 2000-2015 Catalan Educational Telematic Network (XTEC)  
//  This program is free software: you can redistribute it and/or modify it under the terms of
//  the GNU General Public License as published by the Free Software Foundation, version. This
//  program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without
//  even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
//  General Public License for more details. You should have received a copy of the GNU General
//  Public License along with this program. If not, see [http://www.gnu.org/licenses/].  

/* global JClicObject */

define([
  "jquery",
  "jszip",
  "jszip-utils",
  "scriptjs",
  "./i18n",
  "./Utils",
  "./AWT",
  "./PlayerHistory",
  "./media/ActiveMediaBag",
  "./skins/Skin",
  "./media/EventSounds",
  "./project/JClicProject",
  "./bags/JumpInfo",
  "./boxes/ActiveBoxContent",
  "./report/Reporter"
], function ($, JSZip, JSZipUtils, ScriptJS, i18n, Utils, AWT, PlayerHistory, ActiveMediaBag, Skin, EventSounds,
    JClicProject, JumpInfo, ActiveBoxContent, Reporter) {

  /**
   * 
   * JClicPlayer is one of the the main classes of the JClic system. It implements the
   * [PlayStation](http://projectestac.github.io/jclic/apidoc/edu/xtec/jclic/PlayStation.html)
   * interface, needed to read and play JClic projects.<br>
   * JClicPlayer offers to {@link Activity#Panel} objects all the necessary resources and functions:
   * media bags (to load and realize images and other media contents), sequence control, management
   * of the reporting system, user interface, display of system messages, etc.
   * @exports JClicPlayer
   * @class
   * @extends AWT.Container
   * @param {external:jQuery} $topDiv - The HTML `div` element where this JClicPlayer will deploy.
   * @param {object=} options - A set of optional customized options.
   */
  var JClicPlayer = function ($topDiv, options) {

    // JClicPlayer extends AWT.Container
    AWT.Container.call(this);

    if (!options)
      options = {};

    this.$topDiv = $topDiv;

    if (!options.height && !options.width) {
      if ($topDiv.height() > 0) {
        options.height = $topDiv.height();
        options.width = $topDiv.width();
      } else if (typeof options.autoFit === 'undefined')
        options.autoFit = true;
    }

    this.options = $.extend(Object.create(this.options), options);

    i18n.init(this);

    /* global location */
    this.localFS = (location && location.protocol === 'file:');

    this.$div = $('<div/>', {class: 'JClicPlayer'});
    this.project = new JClicProject();
    this.activeMediaBag = new ActiveMediaBag();
    this.counterVal = {score: 0, actions: 0, time: 0};
    this.bgImageOrigin = new AWT.Point();
    this.buildActions();
    this.history = new PlayerHistory(this);
    this.audioEnabled = this.options.audioEnabled;
    this.navButtonsAlways = this.options.navButtonsAlways;
    this.defaultSkin = Skin.prototype.getSkin(null, this, this.$topDiv);
    this.setSkin(this.defaultSkin);
    this.initTimers();
    this.setSystemMessage("ready");
  };

  JClicPlayer.prototype = {
    constructor: JClicPlayer,
    /**
     * Current version will be updated by i18n.js
     * @type {string} */
    JClicVersion: '0',
    /**
     * Object with miscellaneous options.
     * @type {object} */
    options: {
      // 
      // Max waiting time to have all media loaded (milliseconds)
      maxWaitTime: 120000,
      // 
      // Name of the frame where to open links
      infoUrlFrame: '_blank',
      // 
      // URL where to navigate to on exit
      exitUrl: null,
      // 
      // At the beginning, the audio should be enabled or disabled
      audioEnabled: true,
      // 
      // Navigation buttons are always visible (for debugging purposes)
      navButtonsAlways: true,
      // 
      // Initial witdh and height of the JClicPlayer. When not specified, the size of the 
      // `div` element acting as a container will be used.
      width: 900, height: 600,
      //
      // When `true`, the JClicPlayer div element will try to take up all the available surface on
      // the browser's window.
      autoFit: false,
      //
      // Maximum and minimal size of the JClicPlayer element
      maxWidth: 9999, minWidth: 300,
      maxHeight: 9999, minHeight: 300,
      // 
      // Time (milliseconds) of the fade-in animation of the activity panel. When 0, no animation
      // is performed
      fade: 300
    },
    /**
     * The JQuery "div" element used by this player
     * @type {external:jQuery} */
    $div: null,
    /**
     * The JQuery top container of all JClic components (also a 'div' DOM element)
     * @type {external:jQuery} */
    $topDiv: null,
    /**
     * The {@link JClicProject} currently hosted in this player
     * @type {JClicProject} */
    project: null,
    /**
     * Relative path or absolute URL to be used as a base to access files
     * @type {string} */
    basePath: '',
    /**
     * A {@link external:JSZip} object pointing to a `jclic.zip` file containing the current project.<br>
     * Two extra properties will be added to this object when loaded:<br>
     * - __zip.fullZipPath__ {string} - The full path of the ZIP file
     * - __zip.zipBasePath__ {string} - The path to the folder containing the ZIP file
     * @type {external:JSZip} */
    zip: null,
    /**
     * This flag indicates if the player is running inside a document loaded by `file:` protocol
     * @type {boolean}
     */
    localFS: false,
    /**
     * The {@link Activity#Panel} currently running on this player.
     * @type {Activity#Panel} */
    actPanel: null,
    /**
     * This object records the list of the activities played during the current session.
     * @type {PlayerHistory} */
    history: null,
    /**
     * The Skin currently used by this player.
     * @type {Skin} */
    skin: null,
    /**
     * The default Skin to use if none specified
     * @type {Skin} */
    defaultSkin: null,
    /**
     * Object containing references to realized media objects, ready to play.
     * @type {ActiveMediaBag} */
    activeMediaBag: null,
    /**
     * Object responsible for passing the scores obtained by users to a external reporting systems
     * when playing activities.
     * @type {Reporter} */
    reporter: null,
    /**
     * Collection of {@link AWT.Action} objects used by this player.
     * @type {AWT.Action[]} */
    actions: {},
    /**
     * Main timer object used to feed the time counter. Ticks every second.
     * @type {AWT.Timer} */
    timer: null,
    /**
     * Timer for delayed actions
     * @type {AWT.Timer} */
    delayedTimer: null,
    /**
     * This variable holds the action to be executed by `delayedTimer`
     * @type {AWT.Action} */
    delayedAction: null,
    /**
     * @typedef JClicPlayer~counterValType
     * @type {object}
     * @property {number} score
     * @property {number} actions
     * @property {number} time */
    /**
     * Current values of the counters     
     * @type {JClicPlayer~counterValType} */
    counterVal: {score: 0, actions: 0, time: 0},
    /**
     * Point indicating the upper-left corner of the current background image
     * @type {AWT.Point} */
    bgImageOrigin: null,
    /**
     * Whether the player must play all sounds (including system sounds) and other media content
     * of the activities.
     * @type {boolean} */
    audioEnabled: true,
    /**
     * Whether the navigation buttons `next` and `back` are enabled o disabled.
     * @type {boolean} */
    navButtonsDisabled: false,
    /**
     * When this flag is `true`, the navigation buttons are always enabled despite
     * of the indications made by the activities or the sequence control system.<br>
     * This is used only to debug projects with complicated sequence chaining.
     * @type {boolean} */
    navButtonsAlways: false,
    /**
     * 
     * Builds the {@link AWT.Action} objects for this player
     */
    buildActions: function () {
      var player = this;
      this.actions = {
        'next': new AWT.Action('next', function () {
          player.history.processJump(player.project.activitySequence.getJump(false, player.reporter), false);
        }),
        'prev': new AWT.Action('prev', function () {
          player.history.processJump(player.project.activitySequence.getJump(true, player.reporter), false);

        }),
        'return': new AWT.Action('return', function () {
          player.history.pop();
        }),
        'reset': new AWT.Action('reset', function () {
          if (player.actPanel && player.actPanel.act.canReinit())
            player.initActivity();
        }),
        'help': new AWT.Action('help', function () {
          if (player.actPanel !== null)
            player.actPanel.showHelp();
        }),
        'info': new AWT.Action('info', function () {
          if (player.actPanel && player.actPanel.act.hasInfo()) {
            if (player.actPanel.act.infoUrl) {
              player.displayURL(player.act.infoUrl, true);
            } else if (player.actPanel.act.infoCmd) {
              player.runCmd(player.actPanel.act.infoCmd);
            }
          }
        }),
        'reports': new AWT.Action('reports', function (ev) {
          player.showReports();
        }),
        'audio': new AWT.Action('audio', function (ev) {
          player.audioEnabled = !player.audioEnabled;
          if (!player.audioEnabled)
            player.stopMedia();
          EventSounds.prototype.globalEnabled = player.audioEnabled;
        })
      };

      $.each(this.actions, function (key, value) {
        value.addStatusListener(function () {
          // `this` points here to the [AWT.Action](AWT.html#Action) object
          if (player.skin)
            player.skin.actionStatusChanged(this);
        });
      });
    },
    /**
     * 
     * This method is called when the container gains the focus for the first time.<br>
     * Currently not used.
     */
    activate: function () {
      // Do nothing
    },
    /**
     * 
     * Instructs the player to stop working
     */
    stop: function () {
      this.stopMedia(-1);
    },
    /**
     * 
     * Executes miscellaneous finalization routines.
     */
    end: function () {
      this.stopMedia();
      this.closeHelpWindow();
      if (this.actPanel) {
        this.actPanel.end();
        this.actPanel.$div.remove();
        this.actPanel = null;
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
    /**
     * 
     * Creates and initializes the {@link Reporter} member
     * @return {external:Promise}
     */
    initReporter: function () {
      if (this.reporter) {
        this.reporter.end();
        this.reporter = null;
      }
      this.reporter = Reporter.getReporter(null, this);
      return this.reporter.init();
    },
    /**
     * 
     * Creates and initializes objects of type {@link AWT.Timer}
     */
    initTimers: function () {
      // Main timer
      if (this.timer)
        this.timer.stop();
      var player = this;
      this.timer = new AWT.Timer(function () {
        player.incCounterValue('time');
        if (player.actPanel && player.actPanel.act.maxTime > 0 &&
            player.actPanel.playing &&
            player.counterVal['time'] >= player.actPanel.act.maxTime) {
          player.actPanel.finishActivity(false);
        }
      }, 1000, false);

      // One-time timer, for delayed actions
      if (this.delayedTimer)
        this.delayedTimer.stop();

      this.delayedTimer = new AWT.Timer(function () {
        if (player.delayedAction) {
          player.delayedAction.processEvent(player.delayedAction, null);
        }
      }, 1000, false);
      this.delayedTimer.repeats = false;
    },
    /**
     * Opens the reports dialog
     */
    showReports: function () {
      if (this.skin) {
        this.skin.showReports(this.reporter);
      }
    },
    /**
     * 
     * Closes the help dialog window
     */
    closeHelpWindow: function () {
      if (this.skin) {
        this.skin._closeDlg(false);
      }
    },
    /**
     * 
     * Returns the JQuery DOM top component (usually, the {@link Skin} `$div` member)
     * @returns {external:jQuery}
     */
    getTopComponent: function () {
      if (this.skin)
        return this.skin.$getTopComponent();
      else
        return this.$div;
    },
    /**
     * 
     * Sets the current skin
     * @param {?Skin} newSkin - The skin to use. When `null`, `defaultSkin` will be used.
     */
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
    /**
     * 
     * Sets the current project of this player, without starting any activity
     * @param {JClicProject} project - The project to be set
     */
    setProject: function (project) {
      if (this.project !== null) {
        if (this.project !== project)
          this.project.end();
        this.removeActivity();
      }
      this.project = (project !== null ? project : new JClicProject());
      this.project.realize(this);
      if (this.project.skin !== null)
        this.defaultSkin = this.project.skin;
    },
    /**
     * 
     * Loads the specified project and starts playing at the specified activity or sequence tag.
     * @param {?(string|JClicProject)} project - The project to load (if it's a string) or used.
     * When `null` or `undefined`, refers to the current project.
     * @param {(string|number)=} sequence - Sequence tag or numeric order in the {@link ActivitySequence}
     * to be loaded. If _sequence_ and _activity_ are both `null`, the first {@link ActivitySequenceElement}
     * will be loaded.
     * @param {string=} activity - Name of the activity to be loaded (usually `null`)
     */
    load: function (project, sequence, activity) {

      var player = this;

      this.forceFinishActivity();
      this.skin.setWaitCursor(true);

      // The Activity.Panel object to be obtained as a result of the loading process
      var actp = null;

      // step one: load the project
      if (project) {
        if (typeof project === 'string') {

          // Param `project` is a file name or URL (otherwise, is a realized `JClicProject` object)
          var fullPath = Utils.getPath(this.basePath, project);

          // Step 0: Check if `project` points to a ZIP file
          if (Utils.endsWith(fullPath, '.jclic.zip')) {
            // TODO: Implement register of zip files in PlayerHistory
            player.zip = null;
            player.setSystemMessage('Loading ZIP file', fullPath);

            // Launch loading of ZIP file in a separated thread
            window.setTimeout(function () {
              player.skin.setWaitCursor(true);

              JSZipUtils.getBinaryContent(fullPath, function (err, data) {
                if (err) {
                  player.setSystemMessage('Error loading ZIP file: ', err);
                  return;
                }
                new JSZip().loadAsync(data).then(function (zip) {
                  player.zip = zip;
                  player.zip.fullZipPath = fullPath;
                  player.zip.zipBasePath = Utils.getBasePath(fullPath);
                  // Find first file with extension '.jclic' inside the zip file
                  var fileName = null;
                  for (var fn in player.zip.files) {
                    if (Utils.endsWith(fn, '.jclic')) {
                      fileName = fn;
                      break;
                    }
                  }
                  if (fileName) {
                    player.load(Utils.getPath(player.zip.zipBasePath, fileName), sequence, activity);
                  } else {
                    player.setSystemMessage('Error: ZIP does not contain any valid jclic file!');
                  }
                }).catch(function (reason) {
                  player.setSystemMessage('Error reading ZIP file: ', reason);
                });
              });
              player.skin.setWaitCursor(false);
            }, 100);
            this.skin.setWaitCursor(false);
            return;
          } else if (player.localFS && JClicObject && !JClicObject.projectFiles[fullPath]) {
            ScriptJS(fullPath + '.js', function () {
              player.load(project, sequence, activity);
            });
            this.skin.setWaitCursor(false);
            return;
          }

          // Step one: load the project file
          var processProjectFile = function (fp) {
            $.get(fp, null, null, 'xml').done(function (data) {
              if (data === null || typeof data !== 'object') {
                player.setSystemMessage('ERROR: Project not loaded. Bad data!', project);
                return;
              }
              var prj = new JClicProject();
              prj.setProperties($(data).find('JClicProject'), fullPath, player.zip, player.options);
              player.setSystemMessage('Project file loaded and parsed', project);
              prj.mediaBag.buildAll();
              var loops = 0;
              var interval = 500;
              player.skin.setWaitCursor(true);
              var checkMedia = window.setInterval(function () {
                // Wait for a maximum time of two minutes
                if (++loops > player.options.maxWaitTime / interval) {
                  window.clearInterval(checkMedia);
                  player.skin.setWaitCursor(false);
                  player.setSystemMessage('Error loading media!');
                  // alert?                    
                }
                if (!prj.mediaBag.isWaiting()) {
                  window.clearInterval(checkMedia);
                  player.skin.setWaitCursor(false);
                  // Call again `load`, passing the loaded [JClicProject](JClicProject.html) object
                  player.load(prj, sequence, activity);
                }
              }, interval);
            }).fail(function (jqXHR, textStatus, errorThrown) {
              var errMsg = textStatus + ' (' + errorThrown + ') while loading ' + project;
              player.setSystemMessage('Error', errMsg);
              alert('Error!\n' + errMsg);
            }).always(function () {
              player.skin.setWaitCursor(false);
            });
          };

          this.setSystemMessage('loading project', project);
          var fp = fullPath;

          // Special case for ZIP files
          if (player.zip) {
            var fName = Utils.getRelativePath(fp, player.zip.zipBasePath);
            if (player.zip.files[fName]) {
              player.zip.file(fName).async('string').then(function (text) {
                processProjectFile('data:text/xml;charset=UTF-8,' + text);
              }).catch(function (reason) {
                player.setSystemMessage('Error: Unable to extract ', fName + ' from ZIP file: ' + reason);
                player.skin.setWaitCursor(false);
              });
              return;
            }
          }
          // Special case for local filesystems (`file:` protocol)
          else if (player.localFS) {
            // Check if file is already loaded in the global variable `JClicObject`
            if (JClicObject && JClicObject.projectFiles[fullPath]) {
              fp = 'data:text/xml;charset=UTF-8,' + JClicObject.projectFiles[fullPath];
            } else {
              player.setSystemMessage('Error: Unable to load', fullPath + '.js');
              player.skin.setWaitCursor(false);
              return;
            }
          }
          processProjectFile(fp);
          return;
        }

        // From here, assume that `project` is a [JClicProject](JClicProject.html)
        this.setProject(project);

        // If none specified, start with the first element of the sequence
        if (!sequence && !activity)
          sequence = '0';

        // start reporter session
        if (this.reporter !== null)
          this.reporter.newSession(project.name, this);

      }

      // Step two: load the ActivitySequenceElement
      if (!Utils.isNullOrUndef(sequence)) {
        this.setSystemMessage('Loading sequence', sequence);
        this.navButtonsDisabled = false;
        // Try to load sequence by tag
        var ase = null;
        if (typeof sequence === 'string')
          ase = this.project.activitySequence.getElementByTag(sequence, true);
        if (ase === null) {
          // Try to treat 'sequence' as a number
          var n = parseInt(sequence, 10);
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
        var act = this.project.getActivity(activity);
        if (act) {
          // Success! We have a real [Activity](Activity.html)
          this.setSystemMessage('Loading activity', activity);
          act.prepareMedia(this);
          this.project.activitySequence.checkCurrentActivity(act.name);
          actp = act.getActivityPanel(this);
          actp.buildVisualComponents();
        } else {
          this.setSystemMessage('Error: Missing activity', activity);
          // Alert ?
        }
      }

      // Step four: put the activity panel on place

      // Remove the current Activity.Panel
      if (this.actPanel !== null) {
        this.actPanel.end();
        this.actPanel.$div.remove();
        this.actPanel = null;
        this.setCounterValue('time', 0);
      }

      // Attach the new Activity.Panel
      if (actp) {
        // Sets the actPanel member to this Activity.Panel
        this.actPanel = actp;

        if (this.options.fade > 0) {
          this.actPanel.$div.css('display', 'none');
        }

        // Places the JQuery DOM element of actPanel within the player main panel
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
        this.doLayout();
        this.initActivity();

        if (this.options.fade > 0) {
          this.actPanel.$div.fadeIn(this.options.fade, function () {
            player.activityReady();
          });
        }
      }
      this.skin.setWaitCursor(false);
    },
    /**
     * 
     * Forces the current activity to stop playing.
     */
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
    /**
     * 
     * Removes the current {@link Activity#Panel} from this player
     */
    removeActivity: function () {
      this.forceFinishActivity();
      if (this.actPanel) {
        this.actPanel.end();
        this.actPanel.$div.remove();
        this.actPanel = null;
        this.setMsg(null);
        this.doLayout();
      }
    },
    /**
     * 
     * Initializes the activity
     */
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
    /**
     * 
     * Called by {@link JClicPlayer#load} when the {@link Activity#Panel} is fully visible, just
     * after the JQuery animation effect.
     */
    activityReady: function () {
      if (this.actPanel) {
        this.actPanel.activityReady();
        this.setSystemMessage('Activity ready');
      }
    },
    /**
     * 
     * Starts the activity. This method is usually called from text activities with previous text.
     */
    startActivity: function () {
      this.setWaitCursor(true);
      if (this.actPanel)
        this.actPanel.startActivity();
      this.setWaitCursor(false);
    },
    /**
     * 
     * Configures the layout and visual aspect of the player area.
     */
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

        if (act.bgImageFile && act.bgImageFile.length > 0) {
          var player = this;
          this.project.mediaBag.getElement(act.bgImageFile, true).getFullPathPromise().then(function (bgImageUrl) {
            player.$div.css({
              'background-image': 'url(\'' + bgImageUrl + '\')',
              'background-repeat': act.tiledBgImg ? 'repeat' : 'no-repeat',
              'background-position': act.tiledBgImg ? '' : 'center center'
            });
          });
        }

        // Activity panel settings
        // Calc the maximum rectangle available for the activity panel
        var m = Utils.settings.BoxBase.AC_MARGIN;
        var proposedRect = new AWT.Rectangle(m, m, width - 2 * m, height - 2 * m);

        if (this.actPanel.bgImage && !act.tiledBgImg && act.absolutePositioned) {
          // Special case: when the activity has a background image not tiled, and an absolute
          // position has been specified, the Activity.Panel must be placed at this absolute
          // position, relative to the background image
          this.bgImageOrigin.x = (width - this.actPanel.bgImage.width) / 2;
          this.bgImageOrigin.y = (height - this.actPanel.bgImage.height) / 2;
          proposedRect.pos.moveTo(this.bgImageOrigin);
          proposedRect.dim.width -= (this.bgImageOrigin.x - m);
          proposedRect.dim.height -= (this.bgImageOrigin.y - m);
          proposedRect.dim.width = Math.min(proposedRect.dim.width, width);
          proposedRect.dim.height = Math.min(proposedRect.dim.height, height);
        }

        // Activity.Panel will calc and set its position and size based on the maximum and optimal
        // available space
        /* Try with a computed rect instead of "this", to avoid the loss of the right margin
         * in narrow displays */
        this.actPanel.fitTo(proposedRect, this);
      }
      this.$div.css(mainCss);
    },
    /**
     * 
     * Plays the specified media.
     * @param {MediaContent} mediaContent - The media to be played
     * @param {ActiveBox=} mediaPlacement - The cell where the graphic component of this media
     * should be placed (used with video objects)
     */
    playMedia: function (mediaContent, mediaPlacement) {

      var player = this;
      var ji = null;
      var fn = mediaContent.mediaFileName;

      switch (mediaContent.mediaType) {
        case 'PLAY_AUDIO':
        case 'PLAY_VIDEO':
        case 'PLAY_MIDI':
        case 'RECORD_AUDIO':
        case 'PLAY_RECORDED_AUDIO':
          if (player.audioEnabled) {
            var amp = player.activeMediaBag.getActiveMediaPlayer(
                mediaContent,
                player.project.mediaBag,
                player);
            if (amp)
              amp.play(mediaPlacement);

          }
          break;

        case 'RUN_CLIC_PACKAGE':
          ji = new JumpInfo('JUMP', fn);
          if (mediaContent.externalParam) {
            // Relative path computed in History.processJump
            ji.projectPath = mediaContent.externalParam;
          }
          player.history.processJump(ji, true);
          break;

        case 'RUN_CLIC_ACTIVITY':
          player.history.push();
          player.load(null, null, fn);
          break;

        case 'RETURN':
          player.history.pop();
          break;

        case 'EXIT':
          ji = new JumpInfo('EXIT', fn);
          player.history.processJump(ji, false);
          break;

        case 'RUN_EXTERNAL':
          player.runCmd(fn);
          break;

        case 'URL':
          if (fn) {
            // When mediaContent.level is 2 or more, the URL will be opened in a separate window.
            player.displayURL(fn, mediaContent.level > 1);
          }
          break;

        default:
          player.setSystemMessage('unknown media type', mediaContent.mediaType);
          break;
      }
    },
    /**
     * 
     * Stops currently playing media
     * @param {number=} [level=-1] - Sets the threshold above which all media objects with equal
     * or greater `level` will also also be muted.
     */
    stopMedia: function (level) {
      if (typeof level !== 'number')
        level = -1;
      var player = this;
      //window.setTimeout(function () {      
      player.activeMediaBag.stopAll(level);
      //}, 0);
    },
    /**
     * 
     * Launches the specified system command.<br>
     * Currently not implemented.
     * @param {string} cmd
     */
    runCmd: function (cmd) {
      this.setSystemMessage('Unsupported call to external command', cmd);
    },
    /**
     * 
     * Called from {@link Activity} when finished.
     * @param {boolean} completedOK - `true` when the activity was successfully completed, `false`
     * otherwise.
     */
    activityFinished: function (completedOK) {
      this.closeHelpWindow();
      this.setSystemMessage('activity finished');
      this.timer.stop();
      this.startAutoPassTimer();
    },
    /**
     * Starts the automatic passing to the next activity, when applicable.
     */
    startAutoPassTimer: function () {
      var ase = this.project.activitySequence.getCurrentAct();
      if (ase !== null && ase.delay > 0 && !this.delayedTimer.isRunning() && !this.navButtonsDisabled) {
        this.delayedAction = this.actions['next'];
        this.delayedTimer.interval = ase.delay * 1000;
        this.delayedTimer.start();
      }
    },
    /**
     * Function obtained from `i18next` that will return the translation of the provided key
     * into the current language.
     * The real function will be initiated by constructor. Meanwhile, it returns always `key`.
     * @param {string} key - ID of the expression to be translated
     * @returns {string} - Translated text
     */
    getMsg: function (key) {
      return key;
    },
    /**
     * 
     * Sets the current main message
     * @param {ActiveBoxContent} abc - The content of the message
     */
    setMsg: function (abc) {
      var ab = this.skin ? this.skin.getMsgBox() : null;
      if (ab) {
        ab.clear();
        this.skin.invalidate(ab).update();
        ab.setContent(abc ? abc : ActiveBoxContent.prototype.EMPTY_CONTENT);
        // TODO: Transfer this method to Skin
        this.skin.invalidate(ab).update();
        ab.playMedia(this);
      }
    },
    /**
     * 
     * Launches the active media content associated to the main message, if any.
     */
    playMsg: function () {
      if (this.skin && this.skin.getMsgBox())
        this.skin.getMsgBox().playMedia(this);
    },
    /**
     * 
     * Sets a value to the specified counter
     * @param {string} counter - The id of the counter ('score', 'actions' or 'time')
     * @param {number} newValue - The value to be set
     */
    setCounterValue: function (counter, newValue) {
      this.counterVal[counter] = newValue;
      if (this.skin && this.skin.counters[counter])
        this.skin.counters[counter].setValue(newValue);
    },
    /**
     * 
     * Gets the current value for the specified counter
     * @param {string} counter - The id of the counter ('score', 'actions' or 'time')
     * @returns {number}
     */
    getCounterValue: function (counter) {
      return this.counterVal[counter];
    },
    /**
     * 
     * Enables or disables a specific counter
     * @param {string} counter - The id of the counter ('score', 'actions' or 'time')
     * @param {boolean} bEnabled - When `true`, the counter will be enabled.
     */
    setCounterEnabled: function (counter, bEnabled) {
      if (this.skin) {
        this.skin.enableCounter(counter, bEnabled);
        this.setCountDown(counter, 0);
      }
    },
    /**
     * 
     * Increments by 1 the value of the specified counter
     * @param {string} counter - The id of the counter ('score', 'actions' or 'time')
     */
    incCounterValue: function (counter) {
      this.counterVal[counter]++;
      var actp = this.actPanel;
      var cnt = this.skin ? this.skin.counters[counter] : null;
      if (cnt)
        cnt.setValue(this.counterVal[counter]);
      if (counter === 'actions' &&
          actp !== null &&
          actp.act.maxActions > 0 &&
          actp.playing &&
          this.counterVal['actions'] >= actp.act.maxActions) {
        window.setTimeout(function () {
          actp.finishActivity(actp.solved);
        }, 0);
      }
    },
    /**
     * 
     * Sets the specified counter in count-down status, starting at `maxValue`.
     * @param {string} counter - The id of the counter ('score', 'actions' or 'time')
     * @param {number} maxValue - The value from which to start counting down
     */
    setCountDown: function (counter, maxValue) {
      //this.counterVal[counter] = maxValue;
      if (this.skin && this.skin.counters[counter])
        this.skin.counters[counter].setCountDown(maxValue);
    },
    /**
     * 
     * Sets / unsets the panel in 'wait' state
     * @param {boolean} status
     */
    setWaitCursor: function (status) {
      if (this.skin)
        this.skin.setWaitCursor(status);
    },
    /**
     * 
     * Displays debug messages on the console
     * @param {string} msg1
     * @param {string} msg2
     */
    setSystemMessage: function (msg1, msg2) {
      if (this.skin !== null)
        this.skin.setSystemMessage(msg1, msg2);
      else
        console.log((msg1 ? msg1 + ' - ' : '') + (msg2 ? msg2 : ''));
    },
    /**
     * 
     * Builds an {@link ActiveMediaPlayer} for the specified {@link MediaContent}
     * @param {MediaContent} mediaContent - The media content to be played
     * @returns {ActiveMediaPlayer}
     */
    getActiveMediaPlayer: function (mediaContent) {
      if (this.activeMediaBag && mediaContent)
        return this.activeMediaBag.getActiveMediaPlayer(mediaContent, this.project.mediaBag, this);
      else
        return null;
    },
    /**
     * 
     * Notifies the reporting system that a new activity has started
     * @param {Activity} act - The activity that is sending the notification
     */
    reportNewActivity: function (act) {
      var ase = this.project.activitySequence.getCurrentAct();
      if (this.reporter) {
        if (ase.tag === this.reporter.getCurrentSequenceTag())
          // Notify that the sequence has changed
          this.reporter.newSequence(ase);
        if (act.includeInReports)
          this.reporter.newActivity(act);
      }
      this.setCounterValue('actions', 0);
      this.setCounterValue('score', 0);
    },
    /**
     * 
     * Notifies the reporting system that a new action has been performed on the current activity
     * @param {Activity} act - The activity that is sending the notification
     * @param {string} type - Type of action (match, move, switch...)
     * @param {?string} source - Object acting as a source of the action (cell, grid, clue...)
     * @param {?string} dest - When applicable, object acting as a receiver of the action (cell, grid...)
     * @param {boolean} ok - Whether the action was OK or not
     * @param {number} currentScore - The current score of the activity
     */
    reportNewAction: function (act, type, source, dest, ok, currentScore) {
      if (this.reporter && act.includeInReports && act.reportActions)
        this.reporter.newAction(type, source, dest, ok);
      if (currentScore >= 0) {
        this.incCounterValue('actions');
        this.setCounterValue('score', currentScore);
      }
    },
    /**
     * 
     * Notifies the reporting system that the current activity has finished
     * @param {Activity} act - The activity that is sending the notification
     * @param {boolean} solved - Whether the activity was successfully completed or not.
     */
    reportEndActivity: function (act, solved) {
      if (this.reporter && act.includeInReports)
        this.reporter.endActivity(this.counterVal['score'], this.counterVal['actions'], solved);
    },
    /**
     * 
     * Shows the help info provided by the activity
     * @param {external:jQuery} $hlpComponent - The jQuery DOM component to be shown.
     * @returns {boolean} - True when the component was successfully displayed
     */
    showHelp: function ($hlpComponent) {
      if (this.skin) {
        return this.skin.showHelp($hlpComponent);
      }
      return false;
    },
    /**
     * 
     * Navigates to the requested URL
     * @param {string} url - The URL to navigate to
     * @param {boolean} inFrame - When `true` opens in a new frame
     */
    displayURL: function (url, inFrame) {
      if (url) {
        if (inFrame)
          window.open(url, this.options.infoUrlFrame);
        else
          window.location.href = url;
      }
    },
    /**
     * 
     * Only when `exitUrl` has been specified in `options`, navigates to the specified URL
     * @param {string} url - The URL to navigate to.
     */
    exit: function (url) {
      if (!url)
        url = this.options.exitUrl;
      if (url)
        this.displayURL(url, false);
    },
    /**
     * Sets a title in a specific HTML element, if provided.
     * @param {string} docTitle
     */
    setWindowTitle: function (docTitle) {
      this.setSystemMessage('running', docTitle);
    }
  };

  // JClicPlayer extends AWT.Container
  JClicPlayer.prototype = $.extend(Object.create(AWT.Container.prototype), JClicPlayer.prototype);

  return JClicPlayer;
});
