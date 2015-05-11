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

define([
  "jquery",
  "./project/JClicProject",
  "./JClicPlayer"
], function ($, JClicProject, JClicPlayer) {

  // Execute on document ready
  $(function () {
    var $div = $('.JClic');

    if ($div.length) {
      var projectName = $div[0].getAttribute('data-project');

      var player = new JClicPlayer($div);
      player.load(projectName, 1);

      $(window).resize(function () {
        if (player.skin)
          player.skin.doLayout();
      });
    }
  });

  return JClicProject;
});

/* global exports */
if (typeof exports !== "undefined") {
  exports.printMsg = function () {
    console.log("This is a message from JClic");
  };
};
