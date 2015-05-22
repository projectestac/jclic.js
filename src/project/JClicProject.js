//    File    : JClicProject.js  
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
  "./ProjectSettings",
  "../bags/ActivitySequence",
  "../bags/MediaBag",
  "../Activity"
], function ($, ProjectSettings, ActivitySequence, MediaBag, Activity) {

// JClicProject encapsulates all the components of a JClic project:
// activities, sequences, media files, descriptors and metadata.  
// This encapsulation is achieved by three auxiliary objects:
// - ProjectSettings: stores metadata like full tiltle, description,
// authors, languages, educational topics...
// - ActivitySequence: defines the order in which the activities must be shown
// - MediaBag: contains the full list of media files used by the activities    
//
  var JClicProject = function () {
    this.settings = new ProjectSettings();
    this.activitySequence = new ActivitySequence(this);
    this._activities = {};
    this.mediaBag = new MediaBag();
  };

  JClicProject.prototype = {
    constructor: JClicProject,
    //
    name: 'unknown',
    version: '0.1.3',
    type: null,
    code: null,
    // 
    // ProjectSettings
    settings: null,
    // 
    // ActivitySequence
    activitySequence: null,
    // 
    // Activities stored as JQuery xml elements
    _activities: null,
    // 
    // MediaBag
    mediaBag: null,
    // 
    // Skin
    skin: null,
    //
    // Full path of this project
    path: null,
    // 
    // Loads the project settings from a main JQuery XML element 
    setProperties: function ($xml, path) {
      if (path)
        this.path = path;
      this.name = $xml.attr('name');
      this.version = $xml.attr('version');
      this.type = $xml.attr('type');
      this.code = $xml.attr('code');
      this.settings.setProperties($xml.children('settings'));
      this.activitySequence.setProperties($xml.children('sequence'));
      this.mediaBag.setProperties($xml.children('mediaBag'));
      var prj = this;
      var $node = $xml.children('activities');
      var $acts = $node.children('activity');
      $acts.each(function () {
        prj._activities[$(this).attr('name')] = $(this);
      });
      return this;
    },
    // 
    // Returns the [Activity](Activity.html) object named as requested
    getActivity: function(name){
      return Activity.prototype._getActivity(this._activities[name], this);
    },
    //
    // Builds skin, eventSounds and mediaBag fonts
    // eventSoundsParent (EventSounds) - The parent [EventSounds](EventSounds.html)
    // object. Can be `null`.
    // ps (PlayStation) - The PlayStation (usually a [JClicPlayer](JClicPlayer.html)
    // object) linked to this project.
    realize: function (eventSoundsParent, ps) {
      if (this.skin === null && this.settings.skinFileName !== null && this.settings.skinFileName.length > 0)
        this.skin = this.mediaBag.getSkinElement(this.settings.skinFileName, ps);

      if (this.settings.eventSounds) {
        this.settings.eventSounds.setParent(eventSoundsParent);
        this.settings.eventSounds.realize(ps, this.mediaBag);
      }

      // Build all elements of type `font`
      this.mediaBag.buildAll('font');
    },
    //
    // Run finalizers on realized objects
    end: function(){
      // TODO: Implement JClicProject.end()
    }
  };

  /* global module */
  return JClicProject;
});
