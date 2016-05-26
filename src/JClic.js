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

/* global module, exports, JClicDataProject, JClicDataOptions */

define([
  "jquery",
  "./JClicPlayer",
  "./project/JClicProject",
  "./AWT",
  "./Utils",
  "./Deps"
], function ($, JClicPlayer, JClicProject, AWT, Utils, deps) {

  // Declaration of JSDoc external objects:

  /**
   * A jQuery object
   * @external jQuery
   * @see {@link http://api.jquery.com/jQuery/}
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


  // JClicObject will be exported as a result
  var JClicObject = {
    JClicPlayer: JClicPlayer,
    JClicProject: JClicProject,
    AWT: AWT,
    Utils: Utils,
    $: $,
    options: (typeof JClicDataOptions === 'undefined') ? {} : JClicDataOptions,
    projectFiles: {}    
  };
  
  // Make JClicObject global
  if(typeof window !== 'undefined'){
    window.JClicObject = JClicObject;
  }

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
   * The global variable `JClicObject` has four members:
   * - `JClicObject.JClicPlayer` (the {@link JClicPlayer} object)
   * - `JClicObject.JClicProject` (the {@link JClicProject} object)
   * - `JClicObject.AWT` (the {@link AWT} object)
   * - `JClicObject.Utils` (the {@link Utils} object)
   * - `JClicObject.options` (the main options loaded at startup, usually the content of the global variable `JClicDataOptions`)
   * - `JClicObject.$` (the JQuery object)
   * 
   * @module JClic
   * @example
   * // Creates a JClic div and loads "my-project.jclic" on it
   * <div class ="JClic" data-project="my-project.jclic"></div>
   * 
   */
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

      // Search DOM elements with class "JClic"
      var $JClicDivs = $('div.JClic');

      // Iterate over all JClic DOM elements, initializing players
      $JClicDivs.each(function () {
        var $div = $(this);

        var prj = $div.data('project');
        if (prj)
          projectName = prj;

        var opt = $div.data('options');
        if (opt)
          options = $.extend(Object.create(options), opt);

        var player = new JClicPlayer($div, Utils.normalizeObject(options));
        if (projectName)
          player.load(projectName);

        $(window).resize(function () {
          if (player.skin)
            player.skin.fit();
        });
      });
    }
  });
  return JClicObject;
});

// Exports npm module
if (typeof exports !== "undefined") {
  exports.JClicProject = require("./project/JClicProject");
  exports.JClicPlayer = require("./JClicPlayer");
  module.exports = exports;
}
