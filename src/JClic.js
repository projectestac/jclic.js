/*!
 *  File    : JClic.js
 *  Created : 01/04/2015
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
 *  (c) 2000-2021 Educational Telematic Network of Catalonia (XTEC)
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

/* global JClicDataProject, JClicDataOptions, window, document */

import $ from 'jquery';
import JClicPlayer from './JClicPlayer';
import JClicProject from './project/JClicProject';
import AWT from './AWT';
import Utils, { init, log } from './Utils';
import Deps from './Deps';

/**
 * This is the main method of JClic
 *
 * Executes on `document.ready()`.
 *
 * The method iterates over all `div` objects with `JClic` class and creates a {@link module:JClicPlayer.JClicPlayer JClicPlayer}
 * within them. Each player loads the JClic project file specified in the `data-project` attribute of
 * the `div` tag.
 *
 * The `div` elements must preferabily be empty. Inner content may become overlapped by objects
 * created by the JClic player.
 *
 * This method exports the global variable `window.JClicObject`, useful when other scripts
 * need to make direct calls to the main components of JClic.
 *
 * The main members of the global variable `JClicObject` are:
 * - `JClicObject.JClicPlayer` (the {@link module:JClicPlayer} object)
 * - `JClicObject.JClicProject` (the {@link module:JClicProject} object)
 * - `JClicObject.AWT` (the {@link module:AWT} object)
 * - `JClicObject.Utils` (the {@link module:Utils} object)
 * - `JClicObject.$` (the JQuery object)
 * - `JClicObject.options` (the main options loaded at startup, usually the content of the global variable `JClicDataOptions`)
 * - `JClicObject.projectFiles` (used by JSONP to store the content of some files when inaccessible to the browser because CORS or other restrictions)
 * - `JClicObject.currentPlayers` (array with references to the players currently running)
 * - `JClicObject.loadProject` (a function that starts a JClicPlayer on a specific `div`)
 *
 *  @module JClic
 * @example <caption>
 * Creates a JClic div and loads "myproject.jclic" on it:
 * </caption><div class ="JClic" data-project="myproject.jclic"></div>
 * @example <caption>
 * Creates a JClic div that loads "myproject.jclic" with additional parameters, passed as a JSON string.
 * Note that `data-options` should be delimited by apostrophes `'` because quotation marks `"` are used
 * for JSON keys and values:
 * </caption><div class ="JClic" data-project="myproject.jclic" data-options='{"fade":"400","lang":"es","reporter":"TCPReporter","user":"test01","path":"localhost:9090"}'></div>
 */
export const JClicObject = {
  Deps,
  JClicPlayer,
  JClicProject,
  AWT,
  Utils,
  $,
  options: typeof JClicDataOptions === 'undefined' ? {} : JClicDataOptions,
  projectFiles: {},
  currentPlayers: [],
  loadProject,
};

/**
 *
 * Creates a new JClicPlayer hosted on the specified `div`, and loads an specific project on it.
 * @param {external:HTMLElement} div - The HTML element (usually a `<div/>`) that will be used as a main container of the player.
 * @param {string} projectName - The file name or URL of the JClic project to be loaded
 * @param {object} [options] - An optional set of preferences
 * @returns {module:JClicPlayer.JClicPlayer}
 */
export function loadProject(div, projectName, options = {}) {

  options = init({ ...JClicObject.options, ...options }, true, false);
  let player = null;

  // Find if there is another player already running on 'div'
  for (const pl of JClicObject.currentPlayers) {
    if (pl && pl.$topDiv && pl.$topDiv.get(-1) === div) {
      // Player found! Check if it has the same options
      log('debug', 'Existing JClicPlayer found in div. I will try to reuse it.');
      player = pl;
      for (const prop of Object.getOwnPropertyNames(options)) {
        if (!player.options.hasOwnProperty(prop) || player.options[prop] !== options[prop]) {
          log('debug', 'Existing JClicPlayer has diferent options! Creating a new one from scratch.');
          player = null;
          break;
        }
      }
      break;
    }
  }

  if (player)
    player.reset();
  else {
    log('debug', 'Creating a new instance of JClicPlayer');
    player = new JClicPlayer($(div).empty(), options);
  }

  if (projectName)
    player.initReporter()
      .then(() => player.load(projectName))
      .catch(err => {
        log('error', `Unable to start reporting: ${err.toString()}.\n JClicPlayer will be removed.'`);
        $(div).empty().removeAttr('style').append($('<h2/>').html(player.getMsg('ERROR'))).append($('<p/>').html(err));
        const i = JClicObject.currentPlayers.indexOf(player);
        if (i >= 0)
          JClicObject.currentPlayers.splice(i, 1);
        player = null;
      });

  if (player && options.savePlayersRef !== false && JClicObject.currentPlayers.indexOf(player) === -1)
    JClicObject.currentPlayers.push(player);

  return player;
}

// Make JClicObject global and attach resize handler
if (typeof window !== 'undefined') {
  window.JClicObject = JClicObject;
  const fnFit = () => JClicObject.currentPlayers.forEach(player => {
    if (player && player.skin)
      player.skin.fit();
  });
  $(document).on('webkitfullscreenchange mozfullscreenchange fullscreenchange MSFullscreenChange', fnFit);
  $(window).on('resize', fnFit);
}

// Execute on document ready
$(function () {
  // If defined, load the global variable `JClicDataOptions`
  let options = typeof JClicDataOptions === 'undefined' ? {} : JClicDataOptions;
  JClicObject.options = options;

  if (!options.noInit) {
    // If defined, load the global variable `JClicDataProject` or `JClicObject.projectFile`
    let projectName =
      typeof JClicDataProject === 'string' ?
        JClicDataProject :
        typeof JClicObject.projectFile === 'string' ?
          JClicObject.projectFile :
          null;

    // Enable sync with browser history only when there is a single element of class 'JClic'.
    // This is done automatically when this element is a direct child of body, or when 'browserHistory' is
    // explicitly set
    options.browserHistory = $('body>div.JClic').length === 1 || options.browserHistory && $('.JClic').length === 1;

    // Search DOM elements with class "JClic" (usually of type 'div') and iterate over them
    // initializing players
    $('.JClic').each((_n, element) => {
      const $div = $(element);
      const prj = $div.data('project');
      if (prj)
        projectName = prj;

      const opt = $div.data('options');
      if (opt)
        options = $.extend(Object.create(options), opt);

      JClicObject.loadProject(element, projectName, options);
    });
  }
});

export default JClicObject;
