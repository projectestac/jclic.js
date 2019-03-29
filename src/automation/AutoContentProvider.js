/**
 *  File    : automation/AutoContentProvider.js
 *  Created : 13/04/2015
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

/* global define */

define([
  "../Utils"
], function (Utils) {

  /**
   * This abstract class is the base for classes that create on-time automatic content for JClic
   * activities, usually using random parameters to assure different content in each session.
   *
   * Activities with `AutoContentProvider` objects rely on them to build new content on every start.
   * @exports AutoContentProvider
   * @class
   */
  class AutoContentProvider {
    /**
     * AutoContentProvider constructor
     * @param {JClicProject} project - The JClic project to which this content provider belongs.
     */
    constructor(project) {
      this.project = project;
    }

    /**
     * Dynamic constructor that returns a specific type of AutoContentProvider based on the `class`
     * attribute declared on an $xml element.
     * It should be called only from {@link Activity#setproperties}
     * @param {external.jQuery} $xml - The XML element to parse
     * @param {JClicProject} project - The JClic project to which this object will be related
     * @returns {AutoContentProvider}
     */
    static getProvider($xml, project) {
      let automation = null;
      if ($xml && project) {
        const
          className = ($xml.attr('class') || '').replace(/^edu\.xtec\.jclic\.automation\./, '@'),
          cl = AutoContentProvider.CLASSES[className];
        if (cl) {
          automation = new cl(project);
          automation.setProperties($xml);
        } else
          Utils.log('error', `Unknown AutoContentProvider class: ${className}`);
      }
      return automation;
    }

    /**
     * Loads the object settings from a specific jQuery XML element
     * @param {external:jQuery} $xml - The XML element to parse
     */
    setProperties($xml) {
      this.className = ($xml.attr('class') || '').replace(/^edu\.xtec\.jclic\.automation\./, '@');
      return this;
    }

    // To be overrided!
    getData() {
      return Utils.getData(this, ['className']);
    }

    /**
     * Initializes the content provider
     */
    init() {
      // To be implemented in real content providers
    }

    /**
     * Builds an {@link AutoContentProvider.ActiveBagContentKit} and generates the automatized content.
     * @param {number} nRows - Number of rows to be processed
     * @param {number} nCols - Number of columns to be processed
     * @param {ActiveBagContent[]} content - Array with one or more containers of {@link ActiveBoxContent}
     * objects to be filled with new content.
     * @param {bolean} useIds - When `true`, the `id` field of {@link ActiveBoxContent} objects is significant
     * @returns {boolean} - `true` if the process was OK. `false` otherwise.
     */
    generateContent(nRows, nCols, content, useIds) {
      return this.process(new AutoContentProvider.ActiveBagContentKit(nRows, nCols, content, useIds));
    }

    /**
     * Generates the automatized content
     * @param {AutoContentProvider.ActiveBagContentKit} _kit - The objects to be filled with content
     * @returns {boolean} - `true` if the process was OK. `false` otherwise.
     */
    process(_kit) {
      // To be implemented in subclasses
      return false;
    }
  }

  Object.assign(AutoContentProvider.prototype, {
    /**
     * The JClic project to which AutoContentProvider belongs
     * @name AutoContentProvider#project
     * @type {JClicProject} */
    project: null,
    /**
     * This AutoContentProvider manages numeric expressions, so text literals should be
     * converted to numbers for comparisions, taking in account the
     * number format of the current locale (dot or comma as decimal separator)
     * @name AutoContentProvider#numericContent
     * @type {boolean} */
    numericContent: false,
  });

  /**
   * Utility class used to encapsulate multiple sets of box contents
   * @class
   * @param {number} nRows - Number of rows to be processed
   * @param {number} nCols - Number of columns to be processed
   * @param {ActiveBagContent[]} content - Array with one or more containers of {@link ActiveBoxContent}
   * objects to be filled with new content.
   * @param {bolean} useIds - `true` when the `id` field of {@link ActiveBoxContent} objects is significant.
   */
  AutoContentProvider.ActiveBagContentKit = class {
    constructor(nRows, nCols, content, useIds) {
      this.nRows = nRows;
      this.nCols = nCols;
      this.content = content;
      this.useIds = useIds;
    }
  };

  /**
   * Contains the current list of classes derived from AutoContentProvider.
   * This object should be updated by real automation classes at declaration time.
   * Currently, only two types of "AutoContentProvider" are defined: {@link Arith} and TagReplace.
   * @type {object} */
  AutoContentProvider.CLASSES = {
    // TODO: Implement TagReplace
    '@tagreplace.TagReplace': AutoContentProvider
  };

  return AutoContentProvider;
});
