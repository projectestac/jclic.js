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
  // Utility object, useful for encapsulating multiple sets of box contents
  // nRows (number) - Number of rows to be processed
  // nCols (number) - Number of columns to be processed
  // content (array of [ActiveBagContent](ActiveBagContent.html)) - One or more containers of
  // [ActiveBoxContent](ActiveBoxContent.html) objects
  // useIds (boolean) - When `true`, the `id` field of the ActiveBoxContent objects is significative.
  var ActiveBagContentKit = function (nRows, nCols, content, useIds) {
    this.nRows = nRows;
    this.nCols = nCols;
    this.content = content;
    this.useIds = useIds;
  };

//
// This abstract class is the base for all the classes that provide contents to
// JClic activities, usually based on random values. Activities linked to an
// `AutoContentProvider` object rely on it to build its contents on every
// start.
  var AutoContentProvider = function (project) {
    this.project = project;
  };

  AutoContentProvider.prototype = {
    constructor: AutoContentProvider,
    // 
    // `AutoContentProvider.prototype._CLASSES` contains the list of classes derived from
    // AutoContentProvider. It should be read-only and updated by real automation classes at creation.
    // Currently, only two content providers are defined: `@arith.Arith` and `@tagreplace.TagReplace`
    // TODO: When all automation engines are created, initialize _CLASSES as an empty object
    _CLASSES: {
      '@tagreplace.TagReplace': AutoContentProvider
    },
    ActiveBagContentKit: ActiveBagContentKit,
    //
    // The [JClicProject](JClicProject.html) this AutoContentProvider belongs to
    project: null,
    // 
    // Loads the object settings from a specific JQuery XML element 
    setProperties: function ($xml) {
      this.className = $xml.attr('class');
      return this;
    },
    //
    // Dynamic constructor that returns a specific type of AutoContentProvider based on the `class`
    // attribute declared in the $xml element  
    // Should be called only from Activity.setProperties()
    _readAutomation: function ($xml, project) {
      var automation = null;
      if ($xml && project) {
        var className = $xml.attr('class');
        var cl = AutoContentProvider.prototype._CLASSES[className];
        if (cl) {
          automation = new cl(project);
          automation.setProperties($xml);
        }
        else
          console.log('Unknown AutoContentProvider class: ' + className);
      }
      return automation;
    },
    //
    // Functions to be implemented by real automatic content providers:
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
