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

  /**
   * 
   * This class is the basic component of {@link ActivitySequence} objects. It represents a specific
   * point in the project's sequence of JClic activities.<br>
   * For each point of the sequence, some options can be set:
   * - What activity must run at this point
   * - What to do or where to jump when the activity finishes
   * - The behavior of the "next" button
   * - The behavior of the  "prev" button
   * 
   * Sequence points can also have a "tag", used to refer to them with a unique name.
   * @exports ActivitySequenceElement
   * @class
   */
  var ActivitySequenceElement = function () {
  };

  ActivitySequenceElement.prototype = {
    constructor: ActivitySequenceElement,
    /**
     * Optional unique identifier of this element in the {@link ActivitySequence}.
     * @type {string} */
    tag: null,
    /**
     * Optional description of this sequence element.
     * @type {string} */
    description: null,
    /**
     * Name of the {@link Activity} pointed by this element.
     * @type {string} */
    activityName: '',
    /**
     * Jump to be processed by the 'next' button action, or when in automatic mode and the associated
     * activity finishes.
     * @type {ActivitySequenceJump} */
    fwdJump: null,
    /**
     * Jump to be processed by the 'prev' button action.
     * @type {ActivitySequenceJump} */
    backJump: null,
    /**
     * What buttons should be active at this point of the sequence. Valid values are:
     * - 'none'
     * - 'fwd'
     * - 'back'
     * - 'both'
     * @type {string} */
    navButtons: 'both',
    /**
     * Time delay (in seconds) before passing to the next/prev activity
     * @type {number} */
    delay: 0,
    /**
     * 
     * Loads the object settings from a specific JQuery XML element 
     * @param {external:jQuery} $xml
     */
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
