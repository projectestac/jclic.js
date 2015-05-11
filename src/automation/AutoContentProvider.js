//    File    : AutoContentProvider.js  
//    Created : 13/04/2015  
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

define([], function () {

//
// This abstract class is the base for all the classes that provide contents to
// JClic activities, usually based on random values. Activities linked to an
// `AutoContentProvider` object rely on it to build its contents on every
// start.
  var AutoContentProvider = function (className) {
    this.className = className;
  };

  AutoContentProvider.prototype = {
    constructor: AutoContentProvider,
    //
    // The class name of the object.
    // Currently, only two content providers are defined: `@arith.Arith` and `@tagreplace.TagReplace`
    className: null,
    // 
    // Loads the object settings from a specific JQuery XML element 
    setProperties: function ($xml) {
      this.className = $xml.attr('class');
      return this;
    },
    // 
    // TODO: Read and implement real 'automation' objects
    readAutomation: function ($xml) {
      var className = $xml.attr('class');
      var acp = null;
      switch (className) {
        case '@arith.Arith':
        case '@tagreplace.TagReplace':
          acp = new AutoContentProvider(className).setProperties($xml);
      }
      return acp;
    },
    //
    // Functions all `AutoContentProvider` objects must implement:
    //
    init: function (resourceBridge, fileSystem) {
    },
    //
    generateContent: function (kit, resourceBridge) {
      return false;
    }
  };

  return AutoContentProvider;

});
