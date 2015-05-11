//    File    : ActivityBag.js  
//    Created : 07/04/2015  
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
  "./Activity"
], function (Activity) {

// This class stores the complete collection of activities of a
// [JClicProject](JClicProject.html). The collection is managed through a
// list of objects of type [Activity](Activity.html).
//
  var ActivityBag = function (project) {
    this.project = project;
    this.activities = {};
  };

  ActivityBag.prototype = {
    constructor: ActivityBag,
    //
    // Array of objects of type [Activity](Activity.html)
    activities: null,
    // Object of type [JClicProject](JClicProject.html) this ActivityBag
    // belongs to:
    project: null,
    //
    // Loads the object settings from a specific JQuery XML element 
    setProperties: function ($xml) {
      var activities = this.activities;
      var project = this.project;
      $xml.children('activity').each(function () {
        var act = new Activity(project).setProperties($(this));
        activities[act.name] = act;
      });
      return this;
    }
  };

  return ActivityBag;

});
