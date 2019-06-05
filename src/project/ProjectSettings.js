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
 *  (c) 2000-2019 Educational Telematic Network of Catalonia (XTEC)
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
      this.project = project;
      this.authors = [];
      this.organizations = [];
      this.revisions = [];
      this.languages = [];
      this.locales = [];
      this.description = {};
      this.tags = {};
    }

    /**
     * Reads the ProjectSettings values from a JQuery XML element
     * @param {external:jQuery} $xml - The XML element to parse
     */
    setProperties($xml) {
      let single_description = null;
      let multiple_descriptions = null;

      $xml.children().each((_n, child) => {
        switch (child.nodeName) {
          case 'title':
            this.title = child.textContent;
            break;
          case 'description':
            single_description = Utils.getXmlNodeText(child);
            break;
          case 'descriptions':
            multiple_descriptions = Utils.getXmlNodeText(child);
            break;
          case 'author':
            this.authors.push(Utils.reduceTextsToStrings(Utils.parseXmlNode(child)));
            break;
          case 'organization':
            this.organizations.push(Utils.reduceTextsToStrings(Utils.parseXmlNode(child)));
            break;
          case 'revision':
            const revision = Utils.reduceTextsToStrings(Utils.parseXmlNode(child));
            if (revision.date)
              revision.date = Utils.parseOldDate(revision.date);
            this.revisions.push(revision);
            break;
          case 'language':
            this.languages.push(Utils.cleanOldLanguageTag(child.textContent));
            break;
          case 'eventSounds':
            this.eventSounds = new EventSounds();
            this.eventSounds.setProperties($(child));
            break;
          case 'skin':
            this.skinFileName = $(child).attr('file');
            break;
          case 'descriptors':
            this.tags = Utils.parseXmlNode(child, true);
            if (this.tags['#text']) {
              this.tags.other = this.tags['#text'].textContent;
              delete this.tags['#text'];
            }
            break;
          case 'license':
            this.license = Utils.getXmlNodeText(child);
            break;
          case 'cover':
          case 'thumb':
            const img = Utils.getXmlNodeText(child);
            if (img.file)
              this[child.nodeName] = img.file;
            break;
        }
      });

      // Try to find an array of valid locales
      // See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl
      if (this.languages.length > 0 && window.Intl && window.Intl.getCanonicalLocales) {
        this.locales = [];
        this.languages.forEach(lang => {
          // Languages usually are stored in the form: "English (en)"
          const matches = /\(([a-z,A-Z,-]+)\)/.exec(lang);
          if (matches && matches.length > 1) {
            try {
              const canonicals = window.Intl.getCanonicalLocales(matches[1]);
              if (canonicals)
                this.locales = this.locales.concat(canonicals);
            } catch (err) {
              Utils.log('error', `Invalid language: ${lang}`);
            }
          }
        });
      }

      if (multiple_descriptions && multiple_descriptions.description) {
        multiple_descriptions.description.forEach(d => {
          if (d.language && d.text)
            this.description[d.language] = d.text;
        });
      }

      if (single_description && this.languages.length > 0 && !this.description[this.languages[0]])
        this.description[this.languages[0]] = single_description;

      return this;
    }

    /**
     * Gets a object with the basic attributes needed to rebuild this instance excluding functions,
     * parent references, constants and also attributes retaining the default value.
     * The resulting object is commonly usued to serialize elements in JSON format.
     * @returns {object} - The resulting object, with minimal attrributes
     */
    getAttributes() {
      return Utils.getAttributes(this, ['title', 'description', 'tags', 'authors', 'organizations',
        'revisions', 'languages', 'cover', 'thumb', 'license', 'skinFileName', 'eventSounds']);
    }

    /**
     * Reads the ProjectSettings values from a data object
     * @param {object} data - The data object to parse
     */
    setAttributes(data) {
      Object.assign(this, JSON.parse(JSON.stringify(data)));
      if (this.revisions)
        this.revisions.forEach(rv => {
          if (rv.date)
            rv.date = new Date(rv.date);
        });
      return this;
    }

  }

  Object.assign(ProjectSettings.prototype, {
    /**
     * The JClicProject to which this ProjectSettings belongs
     * @name ProjectSettings#project
     * @type {JClicProject} */
    project: null,
    /**
     * The project title
     * @name ProjectSettings#title
     * @type {string} */
    title: 'Untitled',
    /**
     * The authors of this project.
     * Each author is represented by an object with the following attributes:
     * `name` (mandatory), `mail`, `rol`, `organization` and `url`
     * @name ProjectSettings#authors
     * @type {object[]} */
    authors: null,
    /**
     * Schools, companies and other institutions involved on this project.
     * Each organization is represented by an object with the following attributes:
     * `name` (mandatory), `mail`, `url`, `address`, `pc`, `city`, `state`, `country`, `comments`
     * @name ProjectSettings#organizations
     * @type {object[]} */
    organizations: null,
    /**
     * The history of revisions made to this project.
     * Revisions are represented by objects with the following attributes:
     * `date` (mandatory), `description`, `comments` and `author`
     * @name ProjectSettings#revisions
     * @type {object[]} */
    revisions: null,
    /**
     * Project's description, maybe in multiple languages.
     * @name ProjectSettings#description
     * @type {object} */
    description: null,
    /**
     * JClic projects can use more than one language, so use a string array
     * @name ProjectSettings#languages
     * @type {string[]} */
    languages: null,
    tags: null,
    cover: null,
    thumb: null,
    license: {
      type: 'by-nc-sa',
      url: 'https://creativecommons.org/licenses/by-nc-sa/4.0',
    },
    /**
     * Array of canonical locales, as defined in 
     * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#Locale_identification_and_negotiation|Intl}
     * @name ProjectSettings#locales
     * @type {string[]} */
    locales: null,
    /**
     * The name of an optional 'skin' (visual aspect) can be set for the whole project, or for each {@link Activity}
     * @name ProjectSettings#skinFileName
     * @type {string} */
    skinFileName: null,
    /**
     * The main {@link EventSounds} object of the project
     * @name ProjectSettings#eventSounds
     * @type {EventSounds} */
    eventSounds: new EventSounds(),
  });

  return ProjectSettings;
});
