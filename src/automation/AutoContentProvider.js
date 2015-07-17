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

  /**
   * This abstract class is the base for classes that create on-time automatic content for JClic
   * activities, usually using random parameters to assure different content in each session.<br>
   * Activities with `AutoContentProvider` objects rely on them to build new content on every start.
   * @exports AutoContentProvider
   * @class
   * @param {JClicProject} project - The JClic project to which this content provider belongs.
   */
  var AutoContentProvider = function (project) {
    this.project = project;
  };


  AutoContentProvider.prototype = {
    constructor: AutoContentProvider,
    /**
     * The JClic project to which AutoContentProvider belongs
     * @type {JClicProject} */
    project: null,
    /**
     * 
     * Loads the object settings from a specific jQuery XML element
     * @param {external:jQuery} $xml - The XML element to parse
     */
    setProperties: function ($xml) {
      this.className = $xml.attr('class');
      return this;
    },
    /**
     * 
     * Initializes the content provider
     */
    init: function () {
      // To be implemented in real content providers
    },
    /**
     * 
     * Builds an {@link AutoContentProvider.ActiveBagContentKit} and generates the automatized content.
     * @param {number} nRows - Number of rows to be processed
     * @param {number} nCols - Number of columns to be processed
     * @param {ActiveBagContent[]} content - Array with one or more containers of {@link ActiveBoxContent}
     * objects to be filled with new content.
     * @param {bolean} useIds - When `true`, the `id` field of {@link ActiveBoxContent} objects is significative
     * @returns {boolean} - `true` if the process was OK. `false` otherwise.
     */
    generateContent: function (nRows, nCols, content, useIds) {
      var kit = new AutoContentProvider.ActiveBagContentKit(nRows, nCols, content, useIds);
      return this.process(kit);
    },
    /**
     * 
     * Generates the automatized content
     * @param {AutoContentProvider.ActiveBagContentKit} kit - The objects to be filled with content
     * @returns {boolean} - `true` if the process was OK. `false` otherwise.
     */
    process: function (kit) {
      // To be implemented in subclasses
      return false;
    }
  };

  /**
   * Utility object used to encapsulate multiple sets of box contents
   * @class
   * @param {number} nRows - Number of rows to be processed
   * @param {number} nCols - Number of columns to be processed
   * @param {ActiveBagContent[]} content - Array with one or more containers of {@link ActiveBoxContent}
   * objects to be filled with new content.
   * @param {bolean} useIds - `true` when the `id` field of {@link ActiveBoxContent} objects is significative.
   */
  AutoContentProvider.ActiveBagContentKit = function (nRows, nCols, content, useIds) {
    this.nRows = nRows;
    this.nCols = nCols;
    this.content = content;
    this.useIds = useIds;
  };

  /**
   * Contains the current list of classes derived from AutoContentProvider.<br>
   * This object should be updated by real automation classes at declaration time.<br>
   * Currently, only two autocontentproviders are defined: {@link Arith} and TagReplace.
   * @type {object} */
  AutoContentProvider.CLASSES = {
    // TODO: Implement TagReplace
    '@tagreplace.TagReplace': AutoContentProvider
  };

  /**
   * Dynamic constructor that returns a specific type of AutoContentProvider based on the `class`
   * attribute declared on an $xml element.<br>
   * It should be called only from {@link Activity#setproperties}
   * @param {external.jQuery} $xml - The XML element to parse
   * @param {JClicProject} project - The JClic project to which this object will be related
   * @returns {AutoContentProvider}
   */
  AutoContentProvider.getProvider = function ($xml, project) {
    var automation = null;
    if ($xml && project) {
      var className = $xml.attr('class');
      var cl = AutoContentProvider.CLASSES[className];
      if (cl) {
        automation = new cl(project);
        automation.setProperties($xml);
      }
      else
        console.log('Unknown AutoContentProvider class: ' + className);
    }
    return automation;
  };

  return AutoContentProvider;

});
