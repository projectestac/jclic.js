/**
 *  File    : project/ProjectSettings.js
 *  Created : 01/04/2015
 *  By      : Francesc Busquets <francesc@gmail.com>
 *
 *  JClic.js
 *  An HTML5 player of JClic activities
 *  https://projectestac.github.io/jclic.js
 *
 *  @source https://github.com/projectestac/jclic.js
 *
 *  @license EUPL-1.1
 *  @licstart
 *  (c) 2000-2017 Catalan Educational Telematic Network (XTEC)
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
 */

/* global define, window */

define([
  "jquery",
  "../media/EventSounds",
  "../Utils"
], function ($, EventSounds, Utils) {

  /**
   * This class contains miscellaneous settings of JClic projects.
   *
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
    this.locales = [];
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
     * JClic projects can use more than one language, so use a string array
     * @type {string[]} */
    languages: null,
    /**
     * Array of canonical locales, as defined in 
     * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#Locale_identification_and_negotiation|Intl}
     */
    locales: null,
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

      // Try to find an array of valid locales
      // See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl
      if (this.languages.length > 0 && window.Intl && window.Intl.getCanonicalLocales) {
        this.locales = [];
        for (var p in this.languages) {
          // Languages usually are stored in the form: "English (en)"
          var matches = /\(([a-z,A-Z,-]+)\)/.exec(this.languages[p]);
          if (matches && matches.length > 1) {
            try {
              var canonicals = window.Intl.getCanonicalLocales(matches[1]);
              if (canonicals)
                this.locales = this.locales.concat(canonicals);
            } catch (err) {
              Utils.log('error', 'Invalid language: %s', this.languages[p]);
            }
          }
        }
      }

      return this;
    }
  };

  return ProjectSettings;
});
