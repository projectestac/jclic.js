//    File    : JClic.js  
//    Created : 01/04/2015  
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

// Declaration of JSDoc external objects:

/**
 * The HTMLElement interface represents any HTML element. Some elements directly implement this
 * interface, others implement it via an interface that inherits it.
 * @external HTMLElement
 * @see {@link https://developer.mozilla.org/ca/docs/Web/API/HTMLElement}
 */

/**
 * A jQuery object
 * @external jQuery
 * @see {@link http://api.jquery.com/jQuery/}
 */

/**
 * The jQuery XMLHttpRequest (jqXHR) object returned by `$.ajax()` as of jQuery 1.5 is a superset
 * of the browser's native [XMLHttpRequest](https://developer.mozilla.org/docs/XMLHttpRequest) object.
 * As of jQuery 1.5, jqXHR objects implement the {@link external:Promise} interface, giving them
 * all the properties, methods, and behavior of a Promise.
 * @external jqXHR
 * @see {@link https://api.jquery.com/jQuery.ajax/#jqXHR}
 */

/**
 * The CanvasRenderingContext2D interface provides the 2D rendering context for the drawing surface
 * of a &lt;canvas&gt; element.
 * @external CanvasRenderingContext2D
 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
 */

/**
 * The HTMLImageElement interface provides special properties and methods (beyond the regular
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement HTMLElement} interface it
 * also has available to it by inheritance) for manipulating the layout and presentation of
 * &lt;img&gt; elements.
 * @external HTMLImageElement
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement
 */

/**
 * The HTMLAudioElement interface provides access to the properties of &lt;audio&gt; elements, as
 * well as methods to manipulate them. It derives from the
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement HTMLMediaElement} interface.
 * @external HTMLAudioElement
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement
 */

/**
 * The Intl.Collator object is a constructor for collators, objects that enable language sensitive
 * string comparison.
 * @external Collator
 * @see https://developer.mozilla.org/ca/docs/Web/JavaScript/Reference/Global_Objects/Collator
 */

/**
 * A JSZip object
 * @external JSZip
 * @see {@link https://stuk.github.io/jszip}
 */

/**
 * The MediaRecorder interface of the {@link https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder_API MediaRecorder API}
 * provides functionality to easily capture media. 
 * @external MediaRecorder
 * @see https://developer.mozilla.org/ca/docs/Web/API/MediaRecorder
 */

/**
 * An i18next object, used to translate literals
 * @external i18next
 * @see {@link http://i18next.com}
 */

/**
 * The Promise object is used for asynchronous computations. A Promise represents an operation
 * that hasn't completed yet, but is expected in the future.
 * @external Promise
 * @see https://developer.mozilla.org/ca/docs/Web/JavaScript/Reference/Global_Objects/Promise
 */

/* global module, exports, JClicDataProject, JClicDataOptions */

// Override `define` when this file is called directly from node.js
if (typeof define === 'undefined') {
  define = function (dps, callback) {
    return callback.call(
        require("jquery"),
        require("./JClicPlayer"),
        require("./project/JClicProject"),
        require("./AWT"),
        require("./Utils"),
        require("./Deps"));
  };
}

// `JClicObject` Will be filled with real members on `define`
var JClicObject = {};

define([
  "jquery",
  "./JClicPlayer",
  "./project/JClicProject",
  "./AWT",
  "./Utils",
  "./Deps"
], function ($, JClicPlayer, JClicProject, AWT, Utils, deps) {


  /**
   * This is the main JClic method
   * 
   * Executes on `document.ready()`.
   * 
   * The method iterates over all `div` objects with `JClic` class and creates a {@link JClicPlayer}
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
   * - `JClicObject.JClicPlayer` (the {@link JClicPlayer} object)
   * - `JClicObject.JClicProject` (the {@link JClicProject} object)
   * - `JClicObject.AWT` (the {@link AWT} object)
   * - `JClicObject.Utils` (the {@link Utils} object)
   * - `JClicObject.$` (the JQuery object)
   * - `JClicObject.options` (the main options loaded at startup, usually the content of the global variable `JClicDataOptions`)
   * - `JClicObject.projectFiles` (used by JSONP to store the content of some files when inaccessible to the browser because CORS or other restrictions)
   * - `JClicObject.currentPlayers` (array with references to the players currently running)
   * - `JClicObject.loadProject` (a function that starts a JClicPlayer on a specifc `div`)
   * 
   * @module JClic
   * @example
   * Creates a JClic div and loads "myproject.jclic" on it:
   * `<div class ="JClic" data-project="myproject.jclic"></div>`
   * @example
   * Creates a JClic div that loads "myproject.jclic" with additional parameters, passed as a
   * JSON string. Note that `data-options` should be delimited by apostrophes `'` because quotation
   * marks `"` are used for JSON keys and values:
   * `<div class ="JClic" data-project="myproject.jclic" data-options='{"fade":"400","lang":"es","reporter":"TCPReporter","user":"test01","path":"localhost:9090"}'></div>`
   * 
   */

  JClicObject = {
    JClicPlayer: JClicPlayer,
    JClicProject: JClicProject,
    AWT: AWT,
    Utils: Utils,
    $: $,
    options: (typeof JClicDataOptions === 'undefined') ? {} : JClicDataOptions,
    projectFiles: {},
    currentPlayers: [],
    /**
     * 
     * Creates a new JClicPlayer hosted on the specified `div`, and loads an specific project on it.
     * @param {HTMLElement} div - The HTML element (usually a `<div/>`) that will be used as a main container of the player.
     * @param {string} projectName - The file name or URL of the JClic project to be loaded
     * @param {object=} options - An optional set of preferences
     * @returns {JClicPlayer}
     */
    loadProject: function (div, projectName, options) {

      options = $.extend(Object.create(JClicObject.options), options ? options : {});

      var player = new JClicPlayer($(div), Utils.normalizeObject(options));

      if (projectName)
        player.initReporter().then(function () {
          player.load(projectName);
        }).catch(function (err) {
          $(div).empty().removeAttr('style').append($('<h2/>').html(player.getMsg('ERROR'))).append($('<p/>').html(err));
          var i = JClicObject.currentPlayers.indexOf(player);
          if (i >= 0)
            JClicObject.currentPlayers.splice(i, 1);
          player = null;
        });

      if (player && options.savePlayersRef !== false)
        JClicObject.currentPlayers.push(player);

      return player;
    }
  };

  // Make JClicObject global and attach resize handler
  if (typeof window !== 'undefined') {
    window.JClicObject = JClicObject;
    $(window).resize(function () {
      for (var i = 0; i < JClicObject.currentPlayers.length; i++) {
        var player = JClicObject.currentPlayers[i];
        if (player && player.skin)
          player.skin.fit();
      }
    });
  }

  // Execute on document ready
  $(function () {

    // If defined, load the global variable `JClicDataOptions`
    var options = (typeof JClicDataOptions === 'undefined' ? {} : JClicDataOptions);
    JClicObject.options = options;

    if (!options.noInit) {
      // If defined, load the global variable `JClicDataProject` or `JClicObject.projectFile`
      var projectName =
          typeof JClicDataProject === 'string' ? JClicDataProject
          : typeof JClicObject.projectFile === 'string' ? JClicObject.projectFile
          : null;

      // Search DOM elements with class "JClic" (usually of type 'div') and iterate over them
      // initializing players
      $('.JClic').each(function () {
        var $div = $(this);

        var prj = $div.data('project');
        if (prj)
          projectName = prj;

        var opt = $div.data('options');
        if (opt)
          options = $.extend(Object.create(options), opt);

        JClicObject.loadProject(this, projectName, options);
      });
    }
  });
  return JClicObject;
});

// Export JClicObject as npm module
if (typeof module !== "undefined") {
  exports = JClicObject;
  module.exports = exports;
}
