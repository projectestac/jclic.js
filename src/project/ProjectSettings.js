//    File    : ProjectSettings.js  
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
  "../media/EventSounds"
], function ($, EventSounds) {

  /**
   * This class contains miscellaneous settings of JClic projects.<br>
   * In addition to the members of this class, there can be other properties in JClic project files
   * that are not currently loaded:
   * - iconFileName
   * - descriptors
   * - area
   * - level
   * - locale
   * - authors
   * - organizations
   * - revisions
   * @exports ProjectSettings
   * @class
   * @param {JClicProject} project - The project to which this settings belongs
   */
  var ProjectSettings = function (project) {
    this.project = project;
    this.languages = [];
  };

  ProjectSettings.prototype = {
    constructor: ProjectSettings,
    /**
     * The JClicProject to which this ProjectSettings belongs
     * @type {JClicProject} */
    project: null,
    /**
     * The project title
     * @type {string} */
    title: 'Untitled',
    /**
     * Project's description. Can have multiple paragraphs, separated by `<p>`
     * @type {string} */
    description: '',
    /**
     * JClic projects can use more than one language, so we use a string array
     * @type {string[]} */
    languages: null,
    /**
     * The name of an optional 'skin' (visual aspect) can be set for the whole project, or for each {@link Activity}
     * @type {string} */
    skinFileName: null,
    /**
     * The main {@link EventSounds} object of the project
     * @type {EventSounds} */
    eventSounds: new EventSounds(),
    // 
    /**
     * 
     * Reads the ProjectSettings values from a JQuery XML element
     * @param {external:jQuery} $xml - The XML element to parse
     */
    setProperties: function ($xml) {
      var settings = this;
      $xml.children().each(function () {
        switch (this.nodeName) {
          case 'title':
            settings.title = this.textContent;
            break;
          case 'description':
            settings.description = this.textContent;
            break;
          case 'language':
            settings.languages.push(this.textContent);
            break;
          case 'eventSounds':
            settings.eventSounds = new EventSounds();
            settings.eventSounds.setProperties($(this));
            break;
          case 'skin':
            settings.skinFileName = $(this).attr('file');
            break;
        }
      });
      return this;
    }
  };

  return ProjectSettings;
});
