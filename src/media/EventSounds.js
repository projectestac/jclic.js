/**
 *  File    : media/EventSounds.js
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
import EventSoundsElement from './EventSoundsElement.js';
import { getTriState, getAttr, setAttr, DEFAULT } from '../Utils.js';

// Use Webpack to import MP3 files
import start from './sounds/start.mp3';
import click from './sounds/click.mp3';
import actionOk from './sounds/actionOk.mp3';
import actionError from './sounds/actionError.mp3';
import finishedOk from './sounds/finishedOk.mp3';
import finishedError from './sounds/finishedError.mp3';

/**
 * The EventSounds objects contains specific sounds to be played when JClic events are fired:
 * - start
 * - click
 * - actionError
 * - actionOk
 * - finishedError
 * - finishedOk
 *
 * The sounds are stored in an array of {@link module:media/EventSoundsElement EventSoundsElement} objects.
 */
export class EventSounds {
  /**
   * EventSounds constructor
   * @param {module:media/EventSounds.EventSounds} [parent] - Another EventSounds object that will act as a parent of this one,
   * used to resolve which sound must be played for events when not defined here.
   */
  constructor(parent) {
    if (parent) {
      this.elements = Object.assign({}, this.elements, parent.elements);
      this.enabled = parent.enabled;
    }
  }

  /**
   * Reads the object properties from an XML element
   * @param {external:jQuery} $xml - The XML element to be parsed
   */
  setProperties($xml) {
    this.enabled = getTriState($xml.attr('enabled'), this.enabled);
    $xml.children().each((_n, child) => {
      const id = child.getAttribute('id');
      this.elements[id] = new EventSoundsElement(id);
      this.elements[id].setProperties($(child));
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
    return getAttr(this, [
      `enabled|${DEFAULT}`,
      'elements',
    ]);
  }

  /**
   * Reads the properties of this EventSounds from a data object
   * @param {object} data - The data object to be parsed
   * @returns {module:media/EventSounds.EventSounds}
   */
  setAttributes(data) {
    return setAttr(this, data, [
      'enabled',
      { key: 'elements', fn: EventSoundsElement, group: 'object' },
    ]);
  }

  /**
   * Instantiates the audio objects needed to play event sounds
   * @param {module:JClicPlayer.JClicPlayer} ps
   * @param {module:bags/MediaBag.MediaBag} mediaBag
   */
  realize(ps, mediaBag) {
    // Values are {EventSoundElement} objects
    $.each(this.elements, (key, value) => value.realize(ps, mediaBag));
  }

  /**
   * Plays a specific event sound
   * @param {string} eventName - The identifier of the event to be played
   */
  play(eventName) {
    if (this.globalEnabled && this.enabled) {
      const sound = this.elements[eventName];
      if (sound && sound.enabled)
        sound.play();
    }
  }
}

/**
 * Audio data for default event sounds
 * @name module:media/EventSounds.EventSounds.MEDIA
 * @type {object} */
EventSounds.MEDIA = {
  start,
  click,
  actionOk,
  actionError,
  finishedOk,
  finishedError,
};

Object.assign(EventSounds.prototype, {
  /**
   * Collection of {@link module:media/EventSoundsElement EventSoundsElement} objects
   * @name module:media/EventSounds.EventSounds#elements
   * @type {object} */
  elements: {
    start: new EventSoundsElement('start', EventSounds.MEDIA.start),
    click: new EventSoundsElement('click', EventSounds.MEDIA.click),
    actionOk: new EventSoundsElement('actionOk', EventSounds.MEDIA.actionOk),
    actionError: new EventSoundsElement('actionError', EventSounds.MEDIA.actionError),
    finishedOk: new EventSoundsElement('finishedOk', EventSounds.MEDIA.finishedOk),
    finishedError: new EventSoundsElement('finishedError', EventSounds.MEDIA.finishedError)
  },
  /**
   * Whether this event sounds are enabled or not
   * @name module:media/EventSounds.EventSounds#enabled
   * @type {number} */
  enabled: DEFAULT,
  /**
   * This attribute is intended to be used at prototype level, to indicate a globally disabled
   * or enabled state.
   * @name module:media/EventSounds.EventSounds#globalEnabled
   * @type {boolean} */
  globalEnabled: true,
});

export default EventSounds;
