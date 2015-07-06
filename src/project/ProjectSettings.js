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


// This class contains miscellaneous settings of JClic projects
  var ProjectSettings = function (project) {
    this.project = project;
    this.languages = [];    
  };

  ProjectSettings.prototype = {
    constructor: ProjectSettings,
    // 
    // The JClicProject this settings belongs to
    project: null,
    // 
    // The project title
    title: 'Untitled',
    // 
    // Description can have multiple paragraphs, separated by `<p>`
    description: '',
    // 
    // JClic projects can use more than one language, so we use
    // a string array
    languages: null,
    //
    // An optional 'skin' (visual aspect) can be set for the whole project,
    // or for each [Activity](Activity.html)
    skinFileName: null,
    // 
    // The main `media/EventSounds` object of the project
    eventSounds: EventSounds.defaultEventSounds,
    // 
    // Other properties present in JClic files but currently not loaded:
    // - iconFileName: null,
    // - descriptors: '',
    // - area: '',
    // - level: '',
    // - locale: null,
    // - authors: [],
    // - organizations: [],
    // - revisions: [],

    // 
    // Reads the ProjectSettings values from a JQuery XML element
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
            settings.eventSounds = new EventSounds(EventSounds.defaultEventSounds);
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

  /* global module */
  return ProjectSettings;
});
