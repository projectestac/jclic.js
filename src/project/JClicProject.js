/**
 *  File    : project/JClicProject.js
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

import $ from 'jquery';
import ProjectSettings from './ProjectSettings';
import ActivitySequence from '../bags/ActivitySequence';
import MediaBag from '../bags/MediaBag';
import Activity from '../Activity';
import { getBasePath, nSlash, getAttr } from '../Utils';
import { Font } from '../AWT';

/**
 *  JClicProject contains all the components of a JClic project: activities, sequences, media
 *  files, descriptors and metadata.
 *
 *  This encapsulation is achieved by three auxiliary objects:
 *  - {@link module:project/ProjectSettings.ProjectSettings ProjectSettings}: stores metadata like full title, description, authors, languages,
 *  educational topics...
 *  - {@link module:bags/ActivitySequence.ActivitySequence ActivitySequence}: defines the order in which the activities must be shown.
 *  - {@link module:bags/MediaBag.MediaBag MediaBag}: contains the list of all media files used by the activities
 */
export class JClicProject {
  /**
   * JClicProject constructor
   */
  constructor() {
    this.settings = new ProjectSettings(this);
    this.activitySequence = new ActivitySequence(this);
    this._activities = {};
    this.mediaBag = new MediaBag(this);
  }

  /**
   * Loads the project settings from a main jQuery XML element
   * @param {external:jQuery} $xml - The XML element
   * @param {string} path - The full path of this project
   * @param {external:JSZip} [zip] - An optional JSZip object where this project is encapsulated
   * @param {object} [options] - An object with miscellaneous options
   * @returns {module:project/JClicProject.JClicProject}
   */
  setProperties($xml, path, zip, options) {
    if (path) {
      this.path = path;
      if (path.file)
        this.basePath = path;
      else
        this.basePath = getBasePath(path);
    }
    this.zip = zip;
    this.name = $xml.attr('name');
    this.version = $xml.attr('version');
    if ($xml.attr('type') !== undefined && $xml.attr('type') !== '')
      this.type = $xml.attr('type');
    if ($xml.attr('code') !== undefined && $xml.attr('code') !== '')
      this.code = $xml.attr('code');
    this.settings.setProperties($xml.children('settings'));
    this.activitySequence.setProperties($xml.children('sequence'));
    this.mediaBag.setProperties($xml.children('mediaBag'));
    this.reportableActs = 0;
    this._activities = {};
    const $node = $xml.children('activities');
    const $acts = $node.children('activity');
    const ownFonts = this.mediaBag.getElementsOfType('font');
    if (ownFonts.length > 0)
      options.ownFonts = (options.ownFonts || []).concat(ownFonts);
    Font.checkTree($acts, options);
    $acts.each((_n, act) => {
      const $act = $(act);
      this._activities[nSlash($act.attr('name'))] = $act;
      if ($act.children('settings').attr('report') === 'true')
        this.reportableActs++;
    });
    return this;
  }

  /**
   * Gets a object with the basic attributes needed to rebuild this instance excluding functions,
   * parent references, constants and also attributes retaining the default value.
   * The resulting object is commonly usued to serialize elements in JSON format.
   * @returns {object} - The resulting object, with minimal attrributes
   */
  getAttributes() {
    const keys = Object.keys(this._activities);
    this.activities = {};
    keys.forEach(k => {
      const act = this._activities[k];
      this.activities[k] = act.jquery ? Activity.getActivity(act, this) : act;
    });

    return getAttr(this, ['name', 'version', 'type', 'code', 'settings', 'activitySequence', 'activities', 'mediaBag']);
  }

  /**
   * Gets a JSON string representing the content of this project. This string can be transformed later into a data
   * object suitable for `setAttributes`.
   * @param {number} [space] - The number of white spaces to place between items. Defaults to zero (meaning all the JSON rendered in one single line)
   * @returns {string} - The JSON text
   */
  getJSON(space = 0) {
    return JSON.stringify(
      this.getAttributes(),
      (_key, val) => val.toFixed ? Number(val.toFixed(4)) : val,
      space
    );
  }

  /**
   * Loads the project settings from a data object
   * @param {object} data - The data object
   * @param {string} path - The full path of this project
   * @param {external:JSZip} [zip] - An optional JSZip object where this project is encapsulated
   * @param {object} [options] - An object with miscellaneous options
   * @returns {JClicProject}
   */
  setAttributes(data, path, zip, options) {
    if (path) {
      this.path = path;
      if (path.file)
        this.basePath = path;
      else
        this.basePath = getBasePath(path);
    }
    this.zip = zip;
    this.name = data.name;
    this.version = data.version;
    if (data.type)
      this.type = data.type;
    if (data.code)
      this.code = data.code;
    this.settings.setAttributes(data.settings);
    this.activitySequence.setAttributes(data.activitySequence);
    this.mediaBag.setAttributes(data.mediaBag);
    this.reportableActs = 0;
    this._activities = data.activities;

    const ownFonts = this.mediaBag.getElementsOfType('font');
    if (ownFonts.length > 0)
      options.ownFonts = (options.ownFonts || []).concat(ownFonts);
    // TODO: Check fonts
    Font.checkTree(this._activities, options);
    this.reportableActs = Object.keys(this._activities)
      .filter(k => this._activities[k].includeInReports)
      .length;
    return this;
  }

  /**
   * Finds activities by name and builds the corresponding {@link module:Activity.Activity Activity} object.
   * @param {string} name - The name of the requested activity
   * @returns {module:Activity.Activity}
   */
  getActivity(name) {
    return Activity.getActivity(this._activities[nSlash(name)], this);
  }

  /**
   *
   * Builds the {@link module:skins/Skin.Skin Skin}, {@link module:media/EventSounds.EventSounds EventSounds} and {@link module:bags/MediaBag.MediaBag MediaBag} fonts associated to this project.
   * @param {module:JClicPlayer.JClicPlayer} ps - The PlayStation (usually a {@link module:JClicPlayer.JClicPlayer JClicPlayer}) linked to this project.
   */
  realize(ps) {
    // Build skin
    if (this.skin === null && this.settings.skinFileName !== null && this.settings.skinFileName.length > 0)
      this.skin = this.mediaBag.getSkinElement(this.settings.skinFileName, ps);

    this.settings.eventSounds.realize(ps, this.mediaBag);

    // Build all elements of type `font`
    this.mediaBag.buildAll('font', null, ps);
  }

  /**
   * Run finalizers on realized objects
   */
  end() {
    // TODO: Implement JClicProject.end()
  }
}

Object.assign(JClicProject.prototype, {
  /**
   * The project's name
   * @name module:project/JClicProject.JClicProject#name
   * @type {string} */
  name: 'unknown',
  /**
   * The version of the XML file format used to save the project (currently 0.1.3)
   * @name module:project/JClicProject.JClicProject#version
   * @type {string} */
  version: '0.1.3',
  /**
   * Optional property that can be used by reporting systems
   * @name module:project/JClicProject.JClicProject#type
   * @type {string} */
  type: null,
  /**
   * Optional property that can be used by reporting systems
   * @name module:project/JClicProject.JClicProject#code
   * @type {string} */
  code: null,
  /**
   * Object containing the project settings
   * @name module:project/JClicProject.JClicProject#settings
   * @type {ProjectSettings} */
  settings: null,
  /**
   * Object containing the order in which the activities should be played
   * @name module:project/JClicProject.JClicProject#activitySequence
   * @type {ActivitySequence} */
  activitySequence: null,
  /**
   * Array of jQuery xml elements containing the data of each activity. Don't rely on this object
   * to retrieve real activities. Use the method {@link module:project/JClicProject.JClicProject#getActivity getActivity} instead.
   * @name module:project/JClicProject.JClicProject#_activities
   * @private
   * @type {external:jQuery[]} */
  _activities: null,
  /**
   * Number of activities suitable to be included reports
   * @name module:project/JClicProject.JClicProject#reportableActs
   * @type {number}
   */
  reportableActs: 0,
  /**
   * The collection of all media elements used in this project
   * @name module:project/JClicProject.JClicProject#mediaBag
   * @type {MediaBag} */
  mediaBag: null,
  /**
   * The object that builds and manages the visual interface presented to users
   * @name module:project/JClicProject.JClicProject#skin
   * @type {Skin} */
  skin: null,
  /**
   * Relative path or absolute URL to be used as a base to access files, usually in conjunction
   * with {@link module:JClicPlayer.JClicPlayer#basePath}
   * @name module:project/JClicProject.JClicProject#basePath
   * @type {string} */
  basePath: '',
  /**
   * Full path of this project
   * @name module:project/JClicProject.JClicProject#path
   * @type {string} */
  path: null,
  /**
   * The JSZip object where this project is stored (can be `null`)
   * @name module:project/JClicProject.JClicProject#zip
   * @type {external:JSZip} */
  zip: null,
});

export default JClicProject;
