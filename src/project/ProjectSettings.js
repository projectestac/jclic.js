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
 *  (c) 2000-2018 Catalan Educational Telematic Network (XTEC)
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
   */
  class ProjectSettings {
    /**
     * ProjectSettings constructor
     * @param {JClicProject} project - The project to which this settings belongs
     */
    constructor(project) {
      this.project = project
      this.languages = []
      this.locales = []
    }

    /**
     * Reads the ProjectSettings values from a JQuery XML element
     * @param {external:jQuery} $xml - The XML element to parse
     */
    setProperties($xml) {
      $xml.children().each((_n, child) => {
        switch (this.nodeName) {
          case 'title':
            this.title = child.textContent
            break
          case 'description':
            this.description = child.textContent
            break
          case 'language':
            this.languages.push(child.textContent)
            break
          case 'eventSounds':
            this.eventSounds = new EventSounds()
            this.eventSounds.setProperties($(child))
            break
          case 'skin':
            this.skinFileName = $(child).attr('file')
            break
        }
      })

      // Try to find an array of valid locales
      // See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl
      if (this.languages.length > 0 && window.Intl && window.Intl.getCanonicalLocales) {
        this.locales = []
        this.languages.forEach(lang => {
          // Languages usually are stored in the form: "English (en)"
          const matches = /\(([a-z,A-Z,-]+)\)/.exec(lang)
          if (matches && matches.length > 1) {
            try {
              const canonicals = window.Intl.getCanonicalLocales(matches[1])
              if (canonicals)
                this.locales = this.locales.concat(canonicals)
            } catch (err) {
              Utils.log('error', `Invalid language: ${lang}`)
            }
          }
        })
      }
      return this
    }
  }

  Object.assign(ProjectSettings.prototype, {
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
  })

  return ProjectSettings
})
