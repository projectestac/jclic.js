/**
 *  File    : JClicPlayer.js
 *  Created : 28/04/2015
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
 *  (c) 2000-2022 Educational Telematic Network of Catalonia (XTEC)
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

/* global JSON, Promise, location, window, document */

import $ from 'jquery';
import JSZip from 'jszip';
import JSZipUtils from 'jszip-utils';
import { log, init, settings, getPath, endsWith, getBasePath, getRelativePath, isNullOrUndef, mReplace, toCssSize } from './Utils';
import { Container, Point, Action, Timer, Rectangle } from './AWT';
import PlayerHistory from './PlayerHistory';
import ActiveMediaBag from './media/ActiveMediaBag';
import Skin from './skins/Skin';
import EventSounds from './media/EventSounds';
import JClicProject from './project/JClicProject';
import JumpInfo from './bags/JumpInfo';
import ActiveBoxContent from './boxes/ActiveBoxContent';
import Reporter from './report/Reporter';
import MediaBagElement from './bags/MediaBagElement';

/**
 * JClicPlayer is one of the the main classes of the JClic system. It implements the
 * {@link http://projectestac.github.io/jclic/apidoc/edu/xtec/jclic/PlayStation.html PlayStation}
 * interface, needed to host JClic activities.
 * JClicPlayer offers to {@link module:Activity.ActivityPanel ActivityPanel} objects all the necessary resources and functions:
 * media bags (to load and realize images and other media contents), sequence control, management
 * of the reporting system, user interface, display of system messages, etc.
 * @extends module:AWT.Container
 */
export class JClicPlayer extends Container {

  /**
   * JClicPlayer constructor
   * @param {external:jQuery} $topDiv - The HTML `div` element where this JClicPlayer will deploy.
   * @param {object} [options] - A set of optional customized options.
   */
  constructor($topDiv, options) {

    // JClicPlayer extends Container
    super();
    // Build cascading options
    options = init(options);
    this.options = $.extend(Object.create(this.options), options);
    // Generate unique ID
    this.id = `JC${(0x10000 + Math.round(Math.random() * 0xFFFF)).toString(16).toUpperCase().substring(1)}`;
    // Identify the HTML element where this player will deploy
    this.$topDiv = $topDiv || $('<div/>');
    // Avoid side effects of 'align=center' in old HTML pages
    this.$topDiv.css({ 'text-align': 'initial' });

    // Special case: $topDiv inside a TD (like in http://clic.xtec.cat/gali)
    if (this.$topDiv.parent().is('td')) {
      // Set explicit width and height to fill-in the TD
      this.$topDiv.css({
        width: toCssSize(this.options.width, null, null, '100%'),
        height: toCssSize(this.options.height, null, null, '100%'),
      });
    }

    // Build the main container
    this.$mainContainer = $('<div/>', { class: 'JClicContainer', id: this.id })
      .css({ width: '100%', height: '100%' })
      .appendTo(this.$topDiv);

    // Intitialize other elements
    this.localFS = location && location.protocol === 'file:';
    this.$div = $('<div/>', { class: 'JClicPlayer' });
    this.project = new JClicProject();
    this.activeMediaBag = new ActiveMediaBag();
    this.counterVal = { score: 0, actions: 0, time: 0 };
    this.bgImageOrigin = new Point();
    this.buildActions();
    this.history = new PlayerHistory(this);
    this.audioEnabled = this.options.audioEnabled;
    this.navButtonsAlways = this.options.navButtonsAlways;
    this.defaultSkin = Skin.getSkin(this.options.skin, this);
    this.setSkin(Skin.getSkin('@empty.xml', this));
    this.initTimers();
    this.listenTouchEvents();
    log('info', 'JClicPlayer ready');
  }

  /**
   *
   * Detects swipe-right, swipe-left and double touch gestures on touch devices,
   * associating them with 'next activity', 'previous activity' and 'toggle full screen' actions
   */
  listenTouchEvents() {

    // Enable listeners only in touch devices
    //if ('ontouchstart' in window) {

    let startTouch = null;
    let startTouchTime = 0;
    let thisDiv = this.$div[0];
    const { minSwipeX, maxSwipeY, rightToLeft } = this.options;

    // Generic handler for touch events
    const touchEventHandler = event => {
      // Process only single-finger events targeted to our main 'div'
      if (event.target === thisDiv && event.changedTouches && event.changedTouches.length === 1) {
        const touch = event.changedTouches[0];
        const dx = startTouch ? touch.clientX - startTouch.clientX : 0;
        const dy = startTouch ? touch.clientY - startTouch.clientY : 0;
        const dist = Math.sqrt(dx * dx + dy * dy);

        switch (event.type) {
          case 'touchstart':
            const currentTime = new Date();
            // Detect double taps, done in less than 800 ms and at short distance
            if (
              document && document.fullscreenEnabled
              && startTouch && startTouchTime
              && currentTime - startTouchTime < 800
              && dist < minSwipeX
            ) {
              event.preventDefault();
              log('info', 'Toggle full screen mode from double touch');
              this.skin.setScreenFull();
              startTouch = null;
            }
            else {
              startTouch = touch;
              startTouchTime = currentTime;
            }
            break;

          case 'touchend':
            // Discard non-horizontal gestures and those that do not have sufficient length
            if (startTouch && Math.abs(dx) > minSwipeX && Math.abs(dy) < maxSwipeY) {
              const actionName = dx < 0 && !rightToLeft ? 'next' : 'prev';
              const action = this.actions[actionName];
              if (action && action.enabled) {
                event.preventDefault();
                log('info', `Performing action "${actionName}" from touch gesture`);
                action.actionPerformed(event);
              }
              startTouch = null;
            }
            // Cancel double touch detection when long gestures detected
            else if (dist > minSwipeX)
              startTouch = null;
            break;

          case 'touchcancel':
            startTouch = null;
            break;
        }
      }
      else
        // Cancel any started gesture
        startTouch = null;
    };

    // Handle touch events
    thisDiv.addEventListener('touchstart', touchEventHandler);
    thisDiv.addEventListener('touchend', touchEventHandler);
    thisDiv.addEventListener('touchcancel', touchEventHandler);
    //}
  }

  /**
   * Generates an unique ID for elements being used with this player
   * @param {string} lb - The element's label
   * @returns {string}
   */
  getUniqueId(lb) {
    return `${this.id}-${lb}`;
  }

  /**
   * Builds the {@link module:AWT.Action} objects for this player
   */
  buildActions() {
    this.actions = {
      'next': new Action('next', () => this.history.processJump(this.project.activitySequence.getJump(false, this.reporter), false)),
      'prev': new Action('prev', () => this.history.processJump(this.project.activitySequence.getJump(true, this.reporter), false)),
      'return': new Action('return', () => this.history.pop()),
      'reset': new Action('reset', () => { if (this.actPanel && this.actPanel.act.canReinit()) this.initActivity(); }),
      'help': new Action('help', () => { if (this.actPanel) this.actPanel.showHelp(); }),
      'info': new Action('info', () => {
        if (this.actPanel && this.actPanel.act.hasInfo()) {
          if (this.actPanel.act.infoUrl)
            this.displayURL(this.act.infoUrl, true);
          else if (this.actPanel.act.infoCmd)
            this.runCmd(this.actPanel.act.infoCmd);
        }
      }),
      'reports': new Action('reports', () => this.showReports()),
      'audio': new Action('audio', () => {
        this.audioEnabled = !this.audioEnabled;
        if (!this.audioEnabled)
          this.stopMedia();
        EventSounds.prototype.globalEnabled = this.audioEnabled;
      })
    };

    $.each(this.actions, (key, value) => {
      value.addStatusListener(action => { if (this.skin) this.skin.actionStatusChanged(action); });
    });
  }

  /**
   * Resets the main components of this player
   */
  reset() {
    log('info', 'Restoring player');
    this.removeActivity();
    this.end();
    this.activeMediaBag = new ActiveMediaBag();
    this.history.clearHistory();
    this.setSkin(null);
    this.setMsg(null);
    this.setCounterValue('score', 0);
    this.setCounterValue('actions', 0);
    this.setCounterValue('time', 0);
    if (this.skin)
      this.skin.setWaitCursor('reset');
  }

  /**
   * Instructs the player to stop working
   */
  stop() {
    this.stopMedia(-1);
  }

  /**
   * Executes miscellaneous finalization routines.
   * @returns {external:Promise} - A promise to be fullfilled when all pending tasks are finished.
   */
  end() {
    let result = null;
    this.stopMedia();
    this.closeHelpWindow();
    if (this.reporter) {
      result = this.reporter.end();
      this.reporter = null;
    }
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
    return result || Promise.resolve(true);
  }

  /**
   * Creates and initializes the {@link module:Reporter.Reporter Reporter} member
   * @returns {external:Promise}
   */
  initReporter() {
    if (this.reporter) {
      this.reporter.end();
      this.reporter = null;
    }
    this.reporter = Reporter.getReporter(null, this);
    return this.reporter.init();
  }

  /**
   * Creates and initializes objects of type {@link module:AWT.Timer}
   */
  initTimers() {
    // Main timer
    if (this.timer)
      this.timer.stop();
    this.timer = new Timer(() => {
      this.incCounterValue('time');
      if (this.actPanel && this.actPanel.act.maxTime > 0
        && this.actPanel.playing
        && this.counterVal['time'] >= this.actPanel.act.maxTime)
        this.actPanel.finishActivity(false);
    }, 1000, false);

    // One-time timer, for delayed actions
    if (this.delayedTimer)
      this.delayedTimer.stop();
    this.delayedTimer = new Timer(() => {
      if (this.delayedAction)
        this.delayedAction.processEvent(this.delayedAction, null);
    }, 1000, false);
    this.delayedTimer.repeats = false;
  }

  /**
   * Opens the reports dialog
   */
  showReports() {
    if (this.skin) this.skin.showReports(this.reporter);
  }

  /**
   * Closes the help dialog window
   */
  closeHelpWindow() {
    if (this.skin) this.skin._closeDlg(false);
  }

  /**
   * Sets the current skin
   * @param {module:skins/Skin.Skin} [newSkin] - The skin to use. When `null`, `defaultSkin` will be used.
   */
  setSkin(newSkin) {
    newSkin = newSkin || (this.project && this.project.skin ? this.project.skin : this.defaultSkin);
    if (newSkin && (this.skin === null || newSkin.name !== this.skin.name)) {
      newSkin.attach(this);
      this.skin = newSkin;
      this.skin.doLayout();
    }
  }

  /**
   * Sets the current project of this player, without starting any activity
   * @param {module:project/JClicProject.JClicProject} project - The project to be set
   */
  setProject(project) {
    if (this.project) {
      if (this.project !== project)
        this.project.end();
      this.removeActivity();
    }
    this.project = project || new JClicProject();
    this.project.realize(this);
  }

  /**
   * Loads the specified project and starts playing at the specified activity or sequence tag.
   * @param {string|JClicProject} [project] - The project to load (if it's a string) or to use (if it's an object of type {@link module:project/JClicProject.JClicProject JClicProject}).
   * When it's a `string`, it can be the absolute or relative path to:
   * - A `.jclic` project file, in XML format
   * - A `.jclic.json` project file in JSON format
   * - A `.jclic.zip` compressed project file (containing one file of type '.jclic' or '.jclic.json')
   * - A `.scorm.zip` file, as exported by JClic Author.
   * - A `project.json` file, as exported by JClic Author
   * When `null` or `undefined`, refers to the current project.
   * @param {string|number} [sequence] - Sequence tag or numeric order in the {@link module:bags/ActivitySequence.ActivitySequence ActivitySequence}
   * to be loaded. If _sequence_ and _activity_ are both `null`, the first {@link module:bags/ActivitySequenceElement.ActivitySequenceElement ActivitySequenceElement}
   * will be loaded.
   * @param {string} [activity] - Name of the activity to be loaded (usually `null`)
   */
  load(project, sequence, activity) {

    this.forceFinishActivity();
    this.setWaitCursor(true);

    // The ActivityPanel object to be obtained as a result of the loading process
    let actp = null;

    // step one: load the project
    if (project) {
      if (typeof project === 'string') {

        // Param `project` is a file name or URL (otherwise, is a realized `JClicProject` object)
        const fullPath = getPath(this.basePath, project);

        // Previous step: Check if `project` points to a "project.json" file
        if (fullPath.endsWith('project.json')) {
          log('info', `Loading JSON info from: ${fullPath}`);
          $.getJSON(fullPath).done(({ mainFile }) => {
            // Read the `mainFile` field of `project.json`
            if (mainFile && endsWith(mainFile, '.jclic') || endsWith(mainFile, '.jclic.json')) {
              // Load project's main file
              this.load(getPath(getBasePath(fullPath), mainFile), sequence, activity);
            } else {
              log('error', `Invalid or null "mainFile" specified in ${fullPath} - "project.json".`);
            }
          }).fail((jqhxr, textStatus, error) => {
            const errMsg = `${textStatus} (${error}) while loading ${project}`;
            log(errMsg);
            window.alert(`Error!\n${errMsg}`);
          }).always(
            () => this.setWaitCursor(false)
          );
          return;
        }

        // Step 0: Check if `project` points to a ZIP file
        if (fullPath.endsWith('.zip')) {
          // TODO: Implement register of zip files in PlayerHistory
          this.zip = null;
          log('info', `Loading ZIP file: ${fullPath}`);

          // Launch loading of ZIP file in a separated thread
          JSZipUtils.getBinaryContent(fullPath, (err, data) => {
            if (err) {
              this.setWaitCursor(false);
              log('error', `Error loading ZIP file: ${err.toString()}`);
              return;
            }
            new JSZip().loadAsync(data).then(zip => {
              this.zip = zip;
              this.zip.fullZipPath = fullPath;
              this.zip.zipBasePath = getBasePath(fullPath);
              let fileName = null;
              // Check if ZIP contains a "project.json" file (as in the ".scorm.zip" files generated by JClic Author)
              if (this.zip.files['project.json']) {
                this.zip.files['project.json'].async('string').then(content => {
                  try {
                    const json = JSON.parse(content);
                    // Read the `mainFile` field of `project.json`
                    if (endsWith(json['mainFile'], '.jclic')) {
                      // Load project's main file
                      this.load(getPath(this.zip.zipBasePath, json['mainFile']), sequence, activity);
                    } else {
                      log('error', `Invalid or null "mainFile" specified in ${fullPath} - "project.json".`);
                    }
                  } catch (err) {
                    log('error', `Error reading "project.json" in ${fullPath}: ${err ? err.toString() : 'unknown error'}`);
                  }
                }).catch(reason => {
                  log('error', `Error reading ZIP file: ${reason ? reason.toString() : 'unknown reason'}`);
                });
              } else {
                // Find first file with extension '.jclic' inside the zip file
                fileName = Object.keys(this.zip.files).find(fn => fn.endsWith('.jclic')) || null;
                if (fileName)
                  this.load(getPath(this.zip.zipBasePath, fileName), sequence, activity);
                else
                  log('error', 'This ZIP file does not contain any JClic project!');
              }
              this.setWaitCursor(false);
            }).catch(reason => {
              log('error', `Error reading ZIP file: ${reason ? reason.toString() : 'unknown reason'}`);
              this.setWaitCursor(false);
            });
          });
          return;
        } else if (this.localFS && window.JClicObject && !window.JClicObject.projectFiles[fullPath]) {
          const scriptTag = document.createElement('script');
          scriptTag.src = `${fullPath}.js`;
          scriptTag.onload = () => {
            // 25 Mar 20201:
            // Workaround for a bug on Chrome and Firefox XML parsers, throwing errors whith hexadecimal character entities
            if (window.JClicObject.projectFiles[fullPath]) {
              window.JClicObject.projectFiles[fullPath] = mReplace([
                [/&#xD;/g, '\r'],
                [/&#xA;/g, '\n'],
                [/&#x9;/g, '\t'],
              ], window.JClicObject.projectFiles[fullPath]);
              this.load(project, sequence, activity);
            }
          };
          document.head.appendChild(scriptTag);
          this.setWaitCursor(false);
          return;
        }

        // Step one: load the project file
        const processProjectFile = fp => {
          const isXml = fp.indexOf('data:text/xml;') === 0 || fp.endsWith('.jclic');

          const loader = isXml ? $.get(fp, null, null, 'xml') : $.getJSON(fp);

          loader.done(data => {
            if (data === null || typeof data !== 'object') {
              log('error', `Bad data. Project not loaded: ${project}`);
              return;
            }
            const prj = new JClicProject();
            if (isXml)
              prj.setProperties($(data).find('JClicProject'), fullPath, this.zip, this.options);
            else
              prj.setAttributes(data, fullPath, this.zip, this.options);

            log('info', `Project file loaded and parsed: ${project}`);
            const elements = prj.mediaBag.buildAll(null, element => {
              log('trace', `"${element.name}" ready.`);
              this.incProgress(1);
            }, this);
            log('info', `Media elements to be loaded: ${elements}`);
            this.setProgress(0, elements);
            let loops = 0;
            const interval = 500;
            this.setWaitCursor(true);
            const checkMedia = window.setInterval(() => {
              // Wait for a maximum time of two minutes
              if (++loops > this.options.maxWaitTime / interval) {
                window.clearInterval(checkMedia);
                this.setProgress(-1);
                this.setWaitCursor(false);
                log('error', 'Error loading media');
              }
              const waitingObjects = prj.mediaBag.countWaitingElements();
              // player.setProgress(waiting)
              if (waitingObjects === -1) {
                window.clearInterval(checkMedia);
                this.setProgress(-1);
                this.setWaitCursor(false);
                // Call `load` again, passing the loaded [JClicProject](JClicProject.html) as a parameter
                this.load(prj, sequence, activity);
              }
            }, interval);
          }).fail((jqXHR, textStatus, errorThrown) => {
            const errMsg = `${textStatus} (${errorThrown}) while loading ${project}`;
            log(errMsg);
            window.alert(`Error!\n${errMsg}`);
          }).always(() => this.setWaitCursor(false));
        };


        log('info', `Loading project: ${project}`);
        let fp = fullPath;

        // Special case for ZIP files
        if (this.zip) {
          const fName = getRelativePath(fp, this.zip.zipBasePath);
          if (this.zip.files[fName]) {
            this.zip.file(fName).async('string').then(text => {
              processProjectFile(`data:${fName.endsWith('.jclic') ? 'text/xml' : 'application/json'};charset=UTF-8,${text}`);
            }).catch(reason => {
              log('error', `Unable to extract "${fName}" from ZIP file because of: ${reason ? reason.toString() : 'unknown reason'}`);
              this.setWaitCursor(false);
            });
            return;
          }
        }
        // Special case for local file systems (using `file` protocol)
        else if (this.localFS) {
          // Check if file is already loaded in the global variable `JClicObject`
          if (window.JClicObject && window.JClicObject.projectFiles[fullPath]) {
            fp = `data:${fullPath.endsWith('.jclic') ? 'text/xml' : 'application/json'};charset=UTF-8,${window.JClicObject.projectFiles[fullPath]}`;
          } else {
            log('error', `Unable to load: ${fullPath}.js`);
            this.setWaitCursor(false);
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
      if (this.reporter)
        this.reporter.newSession(project);

    }

    // Step two: load the ActivitySequenceElement
    if (!isNullOrUndef(sequence)) {
      log('info', `Loading sequence: ${sequence}`);
      this.navButtonsDisabled = false;
      // Try to load sequence by tag
      let ase = null;
      if (typeof sequence === 'string')
        ase = this.project.activitySequence.getElementByTag(sequence, true);
      if (ase === null) {
        // Try to treat 'sequence' as a number
        const n = parseInt(sequence, 10);
        if (typeof n === 'number')
          ase = this.project.activitySequence.getElement(n, true);
      }

      if (ase !== null) {
        // Success! We have a real [ActivitySequenceElement](ActivitySequenceElement.html)
        if (this.reporter)
          this.reporter.newSequence(ase);
        activity = ase.activity;
      }
    }

    // Step three: load the activity
    if (activity) {
      const act = this.project.getActivity(activity);
      if (act) {
        // Success! We have a real [Activity](Activity.html)
        log('info', `Loading activity: ${activity}`);
        // Clean static references to previous audio elements
        MediaBagElement.resetAudioElements();
        act.prepareMedia(this);
        this.project.activitySequence.checkCurrentActivity(act.name);
        actp = act.getActivityPanel(this);
        actp.buildVisualComponents();
      } else {
        log('error', `Missing activity: ${activity}`);
      }
    }

    // Step four: put the activity panel on place

    // Remove the current ActivityPanel
    if (this.actPanel !== null) {
      this.actPanel.end();
      this.actPanel.$div.remove();
      this.actPanel = null;
      this.setCounterValue('time', 0);
    }

    // Attach the new ActivityPanel
    if (actp) {
      // Sets the actPanel member to this ActivityPanel
      this.actPanel = actp;

      if (this.options.fade > 0)
        this.actPanel.$div.css('display', 'none');

      // Places the JQuery DOM element of actPanel within the player main panel
      this.$div.prepend(this.actPanel.$div);
      if (this.skin)
        this.skin.resetAllCounters(false);

      // Sets the current skin
      if (this.actPanel.skin)
        this.setSkin(this.actPanel.skin);
      else if (this.project.skin) {
        this.setSkin(this.project.skin);
        this.lastProjectSkin = this.project.skin;
      }
      else if (this.lastProjectSkin)
        this.setSkin(this.lastProjectSkin);
      else
        this.setSkin(null);

      if (this.skin) {
        // Enable or disable actions
        const hasReturn = this.history.storedElementsCount() > 0 || this.options.returnAsExit;
        const navBtnFlag = this.navButtonsAlways ?
          'both' : this.navButtonsDisabled ?
            'none' : this.project.activitySequence.getNavButtonsFlag();
        this.actions['next'].setEnabled((navBtnFlag === 'fwd' || navBtnFlag === 'both') &&
          this.project.activitySequence.hasNextAct(hasReturn));
        this.actions['prev'].setEnabled((navBtnFlag === 'back' || navBtnFlag === 'both') &&
          this.project.activitySequence.hasPrevAct(hasReturn));
        this.actions['return'].setEnabled(hasReturn);
        this.actions['help'].setEnabled(this.actPanel.act.helpWindowAllowed());
        this.actions['reset'].setEnabled(this.actPanel.act.canReinit());
        this.actions['info'].setEnabled(this.actPanel.act.hasInfo());
      }
      this.doLayout();
      this.initActivity();

      this.history.pushBrowserHistory();

      this.actPanel.$div.fadeIn(this.options.fade, () => this.activityReady());
    }
    this.setWaitCursor(false);
  }

  /**
   * Forces the current activity to stop playing.
   */
  forceFinishActivity() {
    this.timer.stop();
    this.delayedTimer.stop();
    if (this.actPanel) {
      this.closeHelpWindow();
      this.actPanel.forceFinishActivity();
      this.stopMedia();
      this.activeMediaBag.removeAll();
    }
  }

  /**
   *
   * Removes the current {@link module:Activity.ActivityPanel ActivityPanel} from this player
   */
  removeActivity() {
    this.forceFinishActivity();
    if (this.actPanel) {
      this.actPanel.end();
      this.actPanel.$div.remove();
      this.actPanel = null;
      this.setMsg(null);
      this.doLayout();
    }
  }

  /**
   *
   * Initializes the activity
   */
  initActivity() {
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
      log('info', `Activity "${this.actPanel.act.name}" running`);
    }
    this.setWaitCursor(false);
  }

  /**
   * Called by {@link module:JClicPlayer.JClicPlayer#load} when the {@link module:Activity.ActivityPanel ActivityPanel} is fully visible, just
   * after the JQuery animation effect.
   */
  activityReady() {
    if (this.actPanel) {
      this.actPanel.activityReady();
      log('info', 'Activity ready');
    }
  }

  /**
   * Starts the activity. This method is usually called from text activities with previous text.
   */
  startActivity() {
    this.setWaitCursor(true);
    if (this.actPanel)
      this.actPanel.startActivity();
    this.setWaitCursor(false);
  }

  /**
   * Configures the layout and visual aspect of the player area.
   */
  doLayout() {

    // Main player area settings
    const
      width = this.dim.width = this.$div.width(),
      height = this.dim.height = this.$div.height(),
      mainCss = {
        'background-color': this.actPanel ? this.actPanel.act.bgColor : 'azure',
        'background-image': ''
      };

    if (this.actPanel) {
      const act = this.actPanel.act;
      if (act.bgGradient)
        // Canvas version also available
        mainCss['background-image'] = act.bgGradient.getCss();

      if (act.bgImageFile && act.bgImageFile.length > 0) {
        this.project.mediaBag.getElement(act.bgImageFile, true).getFullPathPromise().then(bgImageUrl => {
          this.$div.css({
            'background-image': 'url(\'' + bgImageUrl + '\')',
            'background-repeat': act.tiledBgImg ? 'repeat' : 'no-repeat',
            'background-position': act.tiledBgImg ? '' : 'center center'
          });
        });
      }

      // Activity panel settings
      // Calc the maximum rectangle available for the activity panel
      const
        m = settings.BoxBase.AC_MARGIN,
        proposedRect = new Rectangle(m, m, width - 2 * m, height - 2 * m);

      if (this.actPanel.bgImage && !act.tiledBgImg && act.absolutePositioned) {
        // Special case: when the activity has a background image not tiled, and an absolute
        // position has been specified, the ActivityPanel must be placed at this absolute
        // position, relative to the background image
        this.bgImageOrigin.x = (width - this.actPanel.bgImage.width) / 2;
        this.bgImageOrigin.y = (height - this.actPanel.bgImage.height) / 2;
        proposedRect.pos.moveTo(this.bgImageOrigin);
        proposedRect.dim.width -= this.bgImageOrigin.x - m;
        proposedRect.dim.height -= this.bgImageOrigin.y - m;
        proposedRect.dim.width = Math.min(proposedRect.dim.width, width);
        proposedRect.dim.height = Math.min(proposedRect.dim.height, height);
      }

      // ActivityPanel will calculate and set its position and size based on the maximum and optimal
      // available space
      /* TODO: Try with a computed rectangle instead of "this", to avoid the loss of the right margin
       * in narrow displays */
      this.actPanel.fitTo(proposedRect, this);
    }
    this.$div.css(mainCss);
  }

  /**
   * Plays the specified media.
   * @param {module:media/MediaContent.MediaContent} mediaContent - The media to be played
   * @param {module:boxes/ActiveBox.ActiveBox} [mediaPlacement] - The cell where the graphic component of this media should be placed (used with video objects)
   * @param {function[]} [delayedActions] - If set, store the the action in this array for future execution
   */
  playMedia(mediaContent, mediaPlacement = null, delayedActions = null) {

    let ji = null;
    const fn = mediaContent.file;
    let action = null;

    switch (mediaContent.type) {
      case 'PLAY_AUDIO':
      case 'PLAY_VIDEO':
      case 'PLAY_MIDI':
      case 'RECORD_AUDIO':
      case 'PLAY_RECORDED_AUDIO':
        if (this.audioEnabled) {
          const amp = this.activeMediaBag.getActiveMediaPlayer(mediaContent, this.project.mediaBag, this);
          if (amp)
            action = () => amp.play(mediaPlacement);
        }
        break;

      case 'RUN_CLIC_PACKAGE':
        ji = new JumpInfo('JUMP', fn);
        if (mediaContent.externalParam) {
          // Relative path computed in History.processJump
          ji.projectPath = mediaContent.externalParam;
        }
        action = () => this.history.processJump(ji, true);
        break;

      case 'RUN_CLIC_ACTIVITY':
        this.history.push();
        action = () => this.load(null, null, fn);
        break;

      case 'RETURN':
        if (this.history.storedElementsCount() > 0 || !this.options.returnAsExit) {
          action = () => this.history.pop();
          break;
        }
      case 'EXIT':
        ji = new JumpInfo('EXIT', fn);
        action = () => this.history.processJump(ji, false);
        break;

      case 'RUN_EXTERNAL':
        action = () => this.runCmd(fn);
        break;

      case 'URL':
        if (fn)
          // When mediaContent.level is 2 or more, the URL will be opened in a separate window.
          action = () => this.displayURL(fn, mediaContent.level > 1);
        break;

      default:
        log('error', `Unknown media type: ${mediaContent.type}`);
        break;
    }

    // Execute the action or pass callback
    if (delayedActions && action)
      delayedActions.push(action);
    else if (action)
      action();
  }

  /**
   * Stops currently playing media
   * @param {number} [level=-1] - Sets the threshold above which all media objects with equal
   * or greater `level` will also also be muted.
   */
  stopMedia(level) {
    if (typeof level !== 'number')
      level = -1;
    this.activeMediaBag.stopAll(level);
  }

  /**
   * Launches the specified system command.
   * Currently not implemented.
   * @param {string} cmd
   */
  runCmd(cmd) {
    log('warn', `Unsupported call to external command: "${cmd}"`);
  }

  /**
   * Called from {@link module:Activity.Activity Activity} when finished.
   * @param {boolean} _completedOK - `true` when the activity was successfully completed, `false`
   * otherwise.
   */
  activityFinished(_completedOK) {
    this.closeHelpWindow();
    log('info', 'Activity finished');
    this.timer.stop();
    this.startAutoPassTimer();
  }

  /**
   * Starts the automatic jump to next activity, when applicable.
   */
  startAutoPassTimer() {
    const ase = this.project.activitySequence.getCurrentAct();
    if (ase !== null && ase.delay > 0 && !this.delayedTimer.isRunning() && !this.navButtonsDisabled) {
      this.delayedAction = this.actions['next'];
      this.delayedTimer.interval = ase.delay * 1000;
      this.delayedTimer.start();
    }
  }

  /**
   *
   * Sets the current main message.
   * @param {module:boxes/ActiveBoxContent.ActiveBoxContent} abc - The content of the message
   */
  setMsg(abc) {
    const ab = this.skin ? this.skin.getMsgBox() : null;
    if (ab) {
      ab.clear();
      this.skin.invalidate(ab).update();
      ab.setContent(abc ? abc : ActiveBoxContent.EMPTY_CONTENT);
      // TODO: Move this method to Skin
      this.skin.invalidate(ab).update();
      ab.playMedia(this);
    }
  }

  /**
   * Launches the active media content associated to the main message, if any.
   */
  playMsg() {
    if (this.skin && this.skin.getMsgBox())
      this.skin.getMsgBox().playMedia(this);
  }

  /**
   * Sets a value to the specified counter
   * @param {string} counter - The id of the counter ('score', 'actions' or 'time')
   * @param {number} newValue - The value to be set
   */
  setCounterValue(counter, newValue) {
    this.counterVal[counter] = newValue;
    if (this.skin && this.skin.counters[counter])
      this.skin.counters[counter].setValue(newValue);
  }

  /**
   * Gets the current value for the specified counter
   * @param {string} counter - The id of the counter ('score', 'actions' or 'time')
   * @returns {number}
   */
  getCounterValue(counter) {
    return this.counterVal[counter];
  }

  /**
   * Enables or disables a specific counter
   * @param {string} counter - The id of the counter ('score', 'actions' or 'time')
   * @param {boolean} bEnabled - When `true`, the counter will be enabled.
   */
  setCounterEnabled(counter, bEnabled) {
    if (this.skin) {
      this.skin.enableCounter(counter, bEnabled);
      this.setCountDown(counter, 0);
    }
  }

  /**
   * Increments by 1 the value of the specified counter
   * @param {string} counter - The id of the counter ('score', 'actions' or 'time')
   */
  incCounterValue(counter) {
    this.counterVal[counter]++;

    const
      actp = this.actPanel,
      cnt = this.skin ? this.skin.counters[counter] : null;

    if (cnt)
      cnt.setValue(this.counterVal[counter]);
    if (counter === 'actions' && actp !== null && actp.act.maxActions > 0 && actp.playing && this.counterVal['actions'] >= actp.act.maxActions)
      window.setTimeout(() => { actp.finishActivity(actp.solved); }, 0);
  }

  /**
   * Sets the specified counter in count-down status, starting at `maxValue`.
   * @param {string} counter - The id of the counter ('score', 'actions' or 'time')
   * @param {number} maxValue - The value from which to start counting down
   */
  setCountDown(counter, maxValue) {
    //this.counterVal[counter] = maxValue
    if (this.skin && this.skin.counters[counter])
      this.skin.counters[counter].setCountDown(maxValue);
  }

  /**
   * Set/unset the panel in 'wait' state
   * @param {boolean} status
   */
  setWaitCursor(status) {
    if (this.skin)
      this.skin.setWaitCursor(status);
  }

  /**
   * Sets the current value of the progress bar
   * @param {number} val - The current value. Should be less or equal than `max`. When -1, the progress bar will be hidden.
   * @param {number} [max] - Optional parameter representing the maximum value. When passed, the progress bar will be displayed.
   */
  setProgress(val, max) {
    if (this.skin)
      this.skin.setProgress(val, max);
  }

  /**
   * Increments the progress bar value by the specified amount, only when the progress bar is running.
   * @param {number} [val=1] - The amount to increment. When not defined, it's 1.
   */
  incProgress(val = 1) {
    if (this.skin)
      this.skin.incProgress(val);
  }

  /**
   * Builds an {@link module:media/ActiveMediaPlayer.ActiveMediaPlayer ActiveMediaPlayer} for the specified {@link module:media/MediaContent.MediaContent}
   * @param {module:media/MediaContent.MediaContent} mediaContent - The media content to be played
   * @returns {module:media/ActiveMediaPlayer.ActiveMediaPlayer}
   */
  getActiveMediaPlayer(mediaContent) {
    return this.activeMediaBag && mediaContent ? this.activeMediaBag.getActiveMediaPlayer(mediaContent, this.project.mediaBag, this) : null;
  }

  /**
   * Notifies the reporting system that a new activity has started
   * @param {module:Activity.Activity} act - The activity that is sending the notification
   */
  reportNewActivity(act) {
    const ase = this.project.activitySequence.getCurrentAct();
    if (this.reporter) {
      if (ase.tag === this.reporter.getCurrentSequenceTag())
        // Notify that the sequence has changed
        this.reporter.newSequence(ase);
      if (act.includeInReports)
        this.reporter.newActivity(act);
    }
    this.setCounterValue('actions', 0);
    this.setCounterValue('score', 0);
  }

  /**
   * Notifies the reporting system that a new action has been performed on the current activity
   * @param {module:Activity.Activity} act - The activity that is sending the notification
   * @param {string} type - Type of action (match, move, switch...)
   * @param {string} source - Object acting as a source of the action (cell, grid, clue...)
   * @param {string} dest - When applicable, object acting as a receiver of the action (cell, grid...)
   * @param {boolean} ok - Whether the action was OK or not
   * @param {number} currentScore - The current score of the activity
   */
  reportNewAction(act, type, source, dest, ok, currentScore) {
    if (this.reporter && act.includeInReports && act.reportActions)
      this.reporter.newAction(type, source, dest, ok);
    if (currentScore >= 0) {
      this.incCounterValue('actions');
      this.setCounterValue('score', currentScore);
    }
  }

  /**
   * Notifies the reporting system that the current activity has finished
   * @param {module:Activity.Activity} act - The activity that is sending the notification
   * @param {boolean} solved - Whether the activity was successfully completed or not.
   */
  reportEndActivity(act, solved) {
    if (this.reporter && act.includeInReports)
      this.reporter.endActivity(this.counterVal['score'], this.counterVal['actions'], solved);
  }

  /**
   * Shows the help info provided by the activity
   * @param {external:jQuery} $hlpComponent - The jQuery DOM component to be shown.
   * @returns {boolean} - True when the component was successfully displayed
   */
  showHelp($hlpComponent) {
    return this.skin ? this.skin.showHelp($hlpComponent) : false;
  }

  /**
   * Navigates to the requested URL
   * @param {string} url - The URL to navigate to
   * @param {boolean} inFrame - When `true` opens in a new frame
   */
  displayURL(url, inFrame) {
    if (url) {
      if (inFrame)
        window.open(url, this.options.infoUrlFrame);
      else {
        this.end().then(() => { window.location.href = url; });
      }
    }
  }

  /**
   * Only when `exitUrl` has been specified in `options`, navigates to the specified URL
   * @param {string} url - The URL to navigate to.
   */
  exit(url) {
    this.displayURL(url || this.options.exitUrl, false);
  }

  /**
   * Sets a title in a specific HTML element, if provided.
   * @param {string} docTitle
   */
  setWindowTitle(docTitle) {
    log('info', `running ${docTitle}`);
  }
}

Object.assign(JClicPlayer.prototype, {
  /**
   * Object with miscellaneous options.
   * @name module:JClicPlayer.JClicPlayer#options
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
    // When `true` and no elements on sequence stack, RETURN acts as EXIT
    returnAsExit: false,
    //
    // At the beginning, the audio should be enabled or disabled
    audioEnabled: true,
    //
    // Navigation buttons are always visible (for debugging purposes)
    navButtonsAlways: false,
    //
    // Time (milliseconds) of the fade-in animation of the activity panel. When 0, no animation
    // is performed
    fade: 300,
    // Minimum horizontal swipe length to be considered an activity change gesture
    minSwipeX: 40,
    // Maximum vertical swipe length to be considered an activity change gesture
    maxSwipeY: 100,
    // Read swipe gestures as in right-to-left languages (default is left-to-right)
    rightToLeft: false,
  },
  /**
   * Unique ID of this player, randomly generated by the constructor
   * @name module:JClicPlayer.JClicPlayer#id
   * @type {string} */
  id: 'JC0000',
  /**
   * The JQuery "div" element used by this player as stage for activities
   * @name module:JClicPlayer.JClicPlayer#$div
   * @type {external:jQuery} */
  $div: null,
  /**
   * The JQuery top container where this player will deploy
   * @name module:JClicPlayer.JClicPlayer#$topDiv
   * @type {external:jQuery} */
  $topDiv: null,
  /**
   * The main container of all JClic components
   * @name module:JClicPlayer.JClicPlayer#$mainContainer
   * @type {external:jQuery} */
  $mainContainer: null,
  /**
   * Flag indicatig that this player has switched to full screen at least once
   * @name module:JClicPlayer.JClicPlayer#fullScreenChecked
   * @type {boolean} */
  fullScreenChecked: false,
  /**
   * The {@link module:project/JClicProject.JClicProject JClicProject} currently hosted in this player
   * @name module:JClicPlayer.JClicPlayer#project
   * @type {module:project/JClicProject.JClicProject} */
  project: null,
  /**
   * Relative path or absolute URL to be used as a base to access files
   * @name module:JClicPlayer.JClicPlayer#basePath
   * @type {string} */
  basePath: '',
  /**
   * A {@link external:JSZip} object pointing to a `jclic.zip` or `jclic.scorm.zip` file containing
   * the current project.
   * Two extra properties will be added to this object when loaded:
   * - __zip.fullZipPath__ {string} - The full path of the ZIP file
   * - __zip.zipBasePath__ {string} - The path to the folder containing the ZIP file
   * @name module:JClicPlayer.JClicPlayer#zip
   * @type {external:JSZip} */
  zip: null,
  /**
   * This flag indicates if the player is running inside a document loaded by `file:` protocol
   * @name module:JClicPlayer.JClicPlayer#localFS
   * @type {boolean}
   */
  localFS: false,
  /**
   * The {@link module:Activity.ActivityPanel ActivityPanel} currently running on this player.
   * @name module:JClicPlayer.JClicPlayer#actPanel
   * @type {module:Activity.Activity#Panel} */
  actPanel: null,
  /**
   * This object records the list of the activities played during the current session.
   * @name module:JClicPlayer.JClicPlayer#history
   * @type {module:PlayerHistory.PlayerHistory} */
  history: null,
  /**
   * The Skin currently used by this player.
   * @name module:JClicPlayer.JClicPlayer#skin
   * @type {module:skins/Skin.Skin} */
  skin: null,
  /**
   * The default Skin to be used if none specified
   * @name module:JClicPlayer.JClicPlayer#defaultSkin
   * @type {module:skins/Skin.Skin} */
  defaultSkin: null,
  /**
   * The last skin directly specified by a {@link module:project/JClicProject.JClicProject JClicProject}
   * @name module:JClicPlayer.JClicPlayer#defaultSkin
   * @type {module:skins/Skin.Skin} */
  lastProjectSkin: null,
  /**
   * Object containing references to realized media objects, ready to play.
   * @name module:JClicPlayer.JClicPlayer#activeMediaBag
   * @type {module:media/ActiveMediaBag.ActiveMediaBag} */
  activeMediaBag: null,
  /**
   * Object responsible for passing the scores obtained by users to a external reporting systems
   * when playing activities.
   * @name module:JClicPlayer.JClicPlayer#reporter
   * @type {module:report/Reporter.Reporter} */
  reporter: null,
  /**
   * Collection of {@link module:AWT.Action} objects used by this player.
   * @name module:JClicPlayer.JClicPlayer#actions
   * @type {module:AWT.Action[]} */
  actions: {},
  /**
   * Main timer object used to feed the time counter. Ticks every second.
   * @name module:JClicPlayer.JClicPlayer#timer
   * @type {module:AWT.Timer} */
  timer: null,
  /**
   * Timer for delayed actions
   * @name module:JClicPlayer.JClicPlayer#delayedTimer
   * @type {module:AWT.Timer} */
  delayedTimer: null,
  /**
   * This variable holds the action to be executed by `delayedTimer`
   * @name module:JClicPlayer.JClicPlayer#delayedAction
   * @type {module:AWT.Action} */
  delayedAction: null,
  /**
   * @typedef JClicPlayer~counterValType
   * @type {object}
   * @property {number} score
   * @property {number} actions
   * @property {number} time */
  /**
   * Current values of the counters
   * @name module:JClicPlayer.JClicPlayer#counterVal
   * @type {module:JClicPlayer.JClicPlayer~counterValType} */
  counterVal: { score: 0, actions: 0, time: 0 },
  /**
   * Point indicating the upper-left corner of the current background image
   * @name module:JClicPlayer.JClicPlayer#bgImageOrigin
   * @type {module:AWT.Point} */
  bgImageOrigin: null,
  /**
   * Whether the player must play all sounds (including system sounds) and other media content
   * of the activities.
   * @name module:JClicPlayer.JClicPlayer#audioEnabled
   * @type {boolean} */
  audioEnabled: true,
  /**
   * Whether the navigation buttons `next` and `back` are enabled o disabled.
   * @name module:JClicPlayer.JClicPlayer#navButtonsDisabled
   * @type {boolean} */
  navButtonsDisabled: false,
  /**
   * When this flag is `true`, the navigation buttons are always enabled despite
   * of the indications made by the activities or the sequence control system.
   * This is used only to debug projects with complicated sequence chaining.
   * @name module:JClicPlayer.JClicPlayer#navButtonsAlways
   * @type {boolean} */
  navButtonsAlways: false,
});

export default JClicPlayer;
