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
 *  @license EUPL-1.2
 *  @licstart
 *  (c) 2000-2020 Educational Telematic Network of Catalonia (XTEC)
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
 *  @module
 */

/* global window */

import $ from 'jquery';
import EventSounds from '../media/EventSounds';
import { log, getXmlNodeText, parseXmlNode, reduceTextsToStrings, parseOldDate, cleanOldLanguageTag, getAttr, setAttr } from '../Utils';

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
 */
export class ProjectSettings {
  /**
   * ProjectSettings constructor
   * @param {module:project/JClicProject.JClicProject} project - The project to which this settings belongs
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
    const multiple_descriptions = [];

    $xml.children().each((_n, child) => {
      switch (child.nodeName) {
        case 'title':
          this.title = child.textContent;
          break;
        case 'description':
          single_description = getXmlNodeText(child);
          break;
        case 'descriptions':
          $(child).children().each((_n, desc) => multiple_descriptions.push(parseXmlNode(desc)));
          break;
        case 'author':
          this.authors.push(reduceTextsToStrings(parseXmlNode(child)));
          break;
        case 'organization':
          this.organizations.push(reduceTextsToStrings(parseXmlNode(child)));
          break;
        case 'revision':
          const revision = reduceTextsToStrings(parseXmlNode(child));
          if (revision.date)
            revision.date = parseOldDate(revision.date);
          this.revisions.push(revision);
          break;
        case 'language':
          this.languages.push(cleanOldLanguageTag(child.textContent));
          break;
        case 'eventSounds':
          this.eventSounds = new EventSounds();
          this.eventSounds.setProperties($(child));
          break;
        case 'skin':
          this.skinFileName = $(child).attr('file');
          break;
        case 'descriptors':
          this.tags = parseXmlNode(child, true);
          if (this.tags['#text']) {
            this.tags.other = this.tags['#text'].textContent;
            delete this.tags['#text'];
          }
          break;
        case 'license':
          this.license = getXmlNodeText(child);
          break;
        case 'cover':
        case 'thumb':
          const img = getXmlNodeText(child);
          if (img.file)
            this[child.nodeName] = img.file;
          break;
      }
    });

    this.buildLocales();

    multiple_descriptions.forEach(d => {
      if (d.language && d.text)
        this.description[d.language] = d.text;
    });

    if (single_description && this.languages.length > 0 && !this.description[this.languages[0]])
      this.description[this.languages[0]] = single_description;

    return this;
  }

  buildLocales() {
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
            log('error', `Invalid language: ${lang}`);
          }
        }
      });
    }
    return this;
  }

  /**
   * Gets a object with the basic attributes needed to rebuild this instance excluding functions,
   * parent references, constants and also attributes retaining the default value.
   * The resulting object is commonly usued to serialize elements in JSON format.
   * @returns {object} - The resulting object, with minimal attrributes
   */
  getAttributes() {
    return getAttr(this, [
      'title', 'description',
      'tags', 'languages', 'license',
      'authors', 'organizations',
      'revisions',
      'cover', 'thumb',
      'skinFileName', 'eventSounds'
    ]);
  }

  /**
   * Reads the properties of this ProjectSettings from a data object
   * @param {object} data - The data object to be parsed, or just the text content
   * @returns {ProjectSettings}
   */
  setAttributes(data) {
    setAttr(this, data, [
      'title', 'description',
      'tags', 'languages', 'license',
      'authors', 'organizations',
      'revisions',
      'cover', 'thumb',
      'skinFileName', 'eventSounds'
    ]);

    // Build Date objects in revisions
    if (this.revisions)
      this.revisions.forEach(rv => {
        if (rv.date)
          rv.date = new Date(rv.date);
      });

    return this.buildLocales();
  }
}

Object.assign(ProjectSettings.prototype, {
  /**
   * The JClicProject to which this ProjectSettings belongs
   * @name module:project/ProjectSettings.ProjectSettings#project
   * @type {JClicProject} */
  project: null,
  /**
   * The project title
   * @name module:project/ProjectSettings.ProjectSettings#title
   * @type {string} */
  title: 'Untitled',
  /**
   * The authors of this project.
   * Each author is represented by an object with the following attributes:
   * `name` (mandatory), `mail`, `rol`, `organization` and `url`
   * @name module:project/ProjectSettings.ProjectSettings#authors
   * @type {object[]} */
  authors: null,
  /**
   * Schools, companies and other institutions involved on this project.
   * Each organization is represented by an object with the following attributes:
   * `name` (mandatory), `mail`, `url`, `address`, `pc`, `city`, `state`, `country`, `comments`
   * @name module:project/ProjectSettings.ProjectSettings#organizations
   * @type {object[]} */
  organizations: null,
  /**
   * The history of revisions made to this project.
   * Revisions are represented by objects with the following attributes:
   * `date` (mandatory), `description`, `comments` and `author`
   * @name module:project/ProjectSettings.ProjectSettings#revisions
   * @type {object[]} */
  revisions: null,
  /**
   * Project's description, maybe in multiple languages.
   * @name module:project/ProjectSettings.ProjectSettings#description
   * @type {object} */
  description: null,
  /**
   * JClic projects can use more than one language, so use a string array
   * @name module:project/ProjectSettings.ProjectSettings#languages
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
   * @name module:project/ProjectSettings.ProjectSettings#locales
   * @type {string[]} */
  locales: null,
  /**
   * The name of an optional 'skin' (visual aspect) can be set for the whole project, or for each {@link module:Activity.Activity Activity}
   * @name module:project/ProjectSettings.ProjectSettings#skinFileName
   * @type {string} */
  skinFileName: null,
  /**
   * The main {@link module:media/EventSounds.EventSounds EventSounds} object of the project
   * @name module:project/ProjectSettings.ProjectSettings#eventSounds
   * @type {EventSounds} */
  eventSounds: new EventSounds(),
});

export default ProjectSettings;
