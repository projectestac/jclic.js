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
 *  @license EUPL-1.1
 *  @licstart
 *  (c) 2000-2016 Catalan Educational Telematic Network (XTEC)
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

define([
  "jquery",
  "./ProjectSettings",
  "../bags/ActivitySequence",
  "../bags/MediaBag",
  "../Activity",
  "../Utils",
  "../AWT"
], function ($, ProjectSettings, ActivitySequence, MediaBag, Activity, Utils, AWT) {

  /**
   *
   *  JClicProject contains all the components of a JClic project: activities, sequences, media
   *  files, descriptors and metadata.
   *
   *  This encapsulation is achieved by three auxiliary objects:
   *  - {@link ProjectSettings}: stores metadata like full title, description, authors, languages,
   *  educational topics...
   *  - {@link ActivitySequence}: defines the order in which the activities must be shown.
   *  - {@link MediaBag}: contains the list of all media files used by the activities
   * @exports JClicProject
   * @class
   */
  var JClicProject = function () {
    this.settings = new ProjectSettings(this);
    this.activitySequence = new ActivitySequence(this);
    this._activities = {};
    this.mediaBag = new MediaBag(this);
  };

  JClicProject.prototype = {
    constructor: JClicProject,
    /**
     * The project's name
     * @type {string} */
    name: 'unknown',
    /**
     * The version of the XML file format used to save the project (currently 0.1.3)
     * @type {string} */
    version: '0.1.3',
    /**
     * Optional property that can be used by reporting systems
     * @type {string} */
    type: null,
    /**
     * Optional property that can be used by reporting systems
     * @type {string} */
    code: null,
    /**
     * Object containing the project settings
     * @type {ProjectSettings} */
    settings: null,
    /**
     * Object containing the order in which the activities must be presented
     * @type {ActivitySequence} */
    activitySequence: null,
    /**
     * Array of jQuery xml elements containing the data of each activity. Don't rely on this object
     * to retrieve real activities. Use the method {@link @JClicProject#getActivity} instead.
     * @private
     * @type {external:jQuery[]} */
    _activities: null,
    /**
     * Number of activities suitable to be included reports
     * @type {number}
     */
    reportableActs: 0,
    /**
     * The collection of all media elements used in this project
     * @type {MediaBag} */
    mediaBag: null,
    /**
     * The object that builds and manages the visual interface presented to users
     * @type {Skin} */
    skin: null,
    /**
     * Relative path or absolute URL to be used as a base to access files, usually in conjunction
     * with {@link JClicPlayer#basePath}
     * @type {string} */
    basePath: '',
    /**
     * Full path of this project
     * @type {string} */
    path: null,
    /**
     * The JSZip object where this project is stored (can be `null`)
     * @type {external:JSZip} */
    zip: null,
    /**
     *
     * Loads the project settings from a main jQuery XML element
     * @param {external:jQuery} $xml - The XML element
     * @param {string} path - The full path of this project
     * @param {?external:JSZip} zip - An optional JSZip object where this project is encapsulated
     * @param {?object} options - An object with miscellaneous options
     * @returns {JClicProject}
     */
    setProperties: function ($xml, path, zip, options) {
      if (path) {
        this.path = path;
        if (path.file)
          this.basePath = path;
        else
          this.basePath = Utils.getBasePath(path);
      }
      this.zip = zip;
      this.name = $xml.attr('name');
      this.version = $xml.attr('version');
      this.type = $xml.attr('type');
      this.code = $xml.attr('code');
      this.settings.setProperties($xml.children('settings'));
      this.activitySequence.setProperties($xml.children('sequence'));
      this.mediaBag.setProperties($xml.children('mediaBag'));
      this.reportableActs = 0;
      this._activities = {};
      var prj = this;
      var $node = $xml.children('activities');
      var $acts = $node.children('activity');
      var ownFonts = this.mediaBag.getElementsOfType('font');
      if (ownFonts.length > 0)
        options.ownFonts = (options.ownFonts || []).concat(ownFonts);
      AWT.Font.checkTree($acts, options);
      $acts.each(function () {
        prj._activities[Utils.nSlash($(this).attr('name'))] = $(this);
        if ($(this).children('settings').attr('report') === 'true')
          prj.reportableActs++;
      });
      return this;
    },
    /**
     *
     * Finds activities by name and builds the corresponding {@link Activity} object.
     * @param {string} name - The name of the requested activity
     * @returns {Activity}
     */
    getActivity: function (name) {
      return Activity.getActivity(this._activities[Utils.nSlash(name)], this);
    },
    /**
     *
     * Builds the {@link Skin}, {@link EventSounds} and {@link MediaBag} fonts associated to this project.
     * @param {PlayStation} ps - The PlayStation (usually a {@link JClicPlayer}) linked to this project.
     */
    realize: function (ps) {
      // Build skin
      if (this.skin === null && this.settings.skinFileName !== null && this.settings.skinFileName.length > 0)
        this.skin = this.mediaBag.getSkinElement(this.settings.skinFileName, ps);

      this.settings.eventSounds.realize(ps, this.mediaBag);

      // Build all elements of type `font`
      this.mediaBag.buildAll('font');
    },
    /**
     *
     * Run finalizers on realized objects
     */
    end: function () {
      // TODO: Implement JClicProject.end()
    }
  };

  return JClicProject;
});
