/**
 *  File    : media/EventSoundsElement.js
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

 /* global Audio */

import Utils from '../Utils';
import ActiveMediaPlayer from './ActiveMediaPlayer';
import MediaContent from './MediaContent';

/**
 * The EventSoundsElement object contains the description of a specific sound to be played when
 * one of the JClic events are fired.
 * For a full list of the JClic events see: {@link EventSounds}
 * @exports EventSoundsElement
 * @class
 */
export class EventSoundsElement {
  /**
   * EventSoundsElement constructor
   * @param {string} id - The identifier of this media sound
   * @param {string=} file - An optional file name or URL containing the sound data
   */
  constructor(id, file) {
    this.id = id;
    if (file) {
      if (Utils.startsWith(file, 'data:'))
        this.audio = new Audio(file);
      else
        this.file = file;
    }
  }

  /**
   * Reads the properties of this object from an XML element
   * @param {external:jQuery} $xml - The XML element to be parsed
   */
  setProperties($xml) {
    this.file = $xml.attr('file');
    this.enabled = Utils.getTriState($xml.attr('enabled'));
    return this;
  }

  /**
   * Gets a object with the basic attributes needed to rebuild this instance excluding functions,
   * parent references, constants and also attributes retaining the default value.
   * The resulting object is commonly usued to serialize elements in JSON format.
   * @returns {object} - The resulting object, with minimal attrributes
   */
  getAttributes() {
    return Utils.getAttributes(this, [
      `enabled|${Utils.DEFAULT}`,
      'file',
    ]);
  }

  /**
   * Reads the properties of this EventSoundsElement from a data object
   * @param {object} data - The data object to be parsed
   * @returns {EventSoundsElement}
   */
  setAttributes(data) {
    return Utils.setAttr(this, data, [
      'enabled',
      'file',
    ]);
  }

  /**
   * Instantiates this audio object
   * @param {PlayStation} ps
   * @param {MediaBag} mediaBag
   */
  realize(ps, mediaBag) {
    if (!this.audio && this.player === null && this.file !== null) {
      this.player = new ActiveMediaPlayer(new MediaContent('PLAY_AUDIO', this.file), mediaBag, ps);
      this.player.realize();
    }
  }

  /**
   * Plays the audio associated to this event
   */
  play() {
    if (this.enabled) {
      if (this.audio) {
        this.audio.currentTime = 0;
        this.audio.play();
      } else if (this.player)
        this.player.play();
    }
  }

  /**
   * Stops playing the audio associated to this event
   */
  stop() {
    if (this.enabled) {
      if (this.audio)
        this.audio.pause();
      else if (this.player)
        this.player.stop();
    }
  }

  // Class fields

  /**
   * The name of the sound file used by this element
   * @name EventSoundsElement#file
   * @type {string}
   */
  file = null;

  /**
   * Whether the sound for this event is enabled or not
   * @name EventSoundsElement#enabled
   * @type {number}
   */
  enabled = Utils.DEFAULT;

  /**
   * Media player used to play this sound
   * @name EventSoundsElement#player
   * @type {ActiveMediaPlayer}
   */
  player = null;

  /**
   * HTMLAudioElement used to play this sound
   * @name EventSoundsElement#audio
   * @type {HTMLAudioElement}
   */
  audio = null;
}

export default EventSoundsElement;
