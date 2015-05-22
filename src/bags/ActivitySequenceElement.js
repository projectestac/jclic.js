//    File    : ActivitySequenceElement.js  
//    Created : 05/04/2015  
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
  "./ActivitySequenceJump"
], function ($, ActivitySequenceJump) {

// This class defines a specific point into a JClic sequence of activities:
// what activity must run at this point, what to do or where to jump when
// the activity finishes, the behavior of the "next" and "prev" buttons, etc.
// It can also have a "tag", used to refer to this point of the sequence
// with a unique name. `ActivitySequenceElement` objects are always stored
// into [ActivitySequence](ActivitySequence.html) objects.
//
  var ActivitySequenceElement = function () {
  };

  ActivitySequenceElement.prototype = {
    constructor: ActivitySequenceElement,
    //
    // Unique identifier of this element in the [ActivitySequence](ActivitySequence.html)
    tag: null,
    description: null,
    //
    // Name of the [Activity](Activity.html) this element points to. Activities
    // are stored in the [JClicProject](JClicProject.html).
    activityName: '',
    // 
    // ActivitySequenceJump elements:
    fwdJump: null,
    backJump: null,
    //
    // What buttons should be active at this point of the sequence
    navButtons: 'both',
    //
    // Time delay (in seconds) before passing to the next/prev activity
    delay: 0,
    // 
    // Loads the object settings from a specific JQuery XML element 
    setProperties: function ($xml) {

      // Iterate on all provided attributes
      var ase = this;
      $.each($xml.get(0).attributes, function () {
        var name = this.name;
        var val = this.value;
        switch (name) {
          case 'id':
            ase['tag'] = val;
            break;
          case 'name':
            ase['activityName'] = val;
            break;
          case 'description':
            // possible navButtons values are: `none`, `fwd`, `back` or `both`
          case 'navButtons':
            ase[name] = val;
            break;
          case 'delay':
            ase[name] = Number(val);
            break;
        }
      });

      // Iterate on 'jump' elements to load fwdJump and/or backJump
      $xml.children('jump').each(function () {
        var jmp = new ActivitySequenceJump().setProperties($(this));
        if (jmp.id === 'forward')
          ase.fwdJump = jmp;
        else if (jmp.id === 'back')
          ase.backJump = jmp;
      });

      return this;
    }
  };

  return ActivitySequenceElement;

});
