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

// Main JClic method  
// 
// Looks for the first DOM element in the document with class "JClic", builds a new
// [JClicPlayer](JClicPlayer.html) object attached to this DOM element and loads the
// project file specified in the `data-project` attribute.  
// 
// Example: `<div class ="JClic" data-project="my-project.jclic"></div>`  
// This JClic `div` must preferabily be empty. Inner content may become overlapped by other objects.
//
define([
  "jquery",
  "./JClicPlayer",
  "./Deps"
], function ($, JClicPlayer, deps) {

  // Execute on document ready
  $(function () {
    var $div = $('.JClic');

    if ($div.length) {
      var projectName = $div[0].getAttribute('data-project');

      var player = new JClicPlayer($div);
      player.load(projectName, 0);

      $(window).resize(function () {
        if (player.skin)
          player.skin.doLayout();
      });
    }
  });

  return 'JClic armed';
});

/* global exports */
// Testing function for npm
// TODO: Remove npm testing function
if (typeof exports !== "undefined") {
  exports.printMsg = function () {
    console.log("This is a message from JClic");
  };
};

