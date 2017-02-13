/**
 *  File    : bags/ActivitySequenceElement.js
 *  Created : 05/04/2015
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

/* global define */

define([
  "jquery",
  "./ActivitySequenceJump",
  "../Utils"
], function ($, ActivitySequenceJump, Utils) {

  /**
   *
   * This class is the basic component of {@link ActivitySequence} objects. It represents a specific
   * point in the project's sequence of JClic activities.
   *
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
     * Jump to be processed by the 'next' button action
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
            ase['tag'] = Utils.nSlash(val);
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
