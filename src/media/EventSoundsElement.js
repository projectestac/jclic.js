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
 *  (c) 2000-2018 Catalan Educational Telematic Network (XTEC)
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
  "../Utils",
  "./ActiveMediaPlayer",
  "./MediaContent"
], function (Utils, ActiveMediaPlayer, MediaContent) {

  /**
   * The EventSoundsElement object contains the description of a specific sound to be played when
   * one of the JClic events are fired.
   * For a full list of the JClic events see: {@link EventSounds}
   * @exports EventSoundsElement
   * @class
   */
  class EventSoundsElement {
    /**
     * EventSoundsElement constructor
     * @param {string} id - The identifier of this media sound
     * @param {string=} fileName - An optional file name or URL containing the sound data
     */
    constructor(id, fileName) {
      this.id = id
      if (fileName) {
        if (Utils.startsWith(fileName, 'data:'))
          this.audio = new Audio(fileName)
        else
          this.fileName = fileName
      }
    }

    /**
     * Reads the properties of this object from an XML element
     * @param {external:jQuery} $xml - The XML element to be parsed
     */
    setProperties($xml) {
      this.fileName = $xml.attr('file')
      this.enabled = Utils.getTriState($xml.attr('enabled'))
      return this
    }

    getData() {
      return Utils.getData(this, ['enabled', 'fileName'])
    }

    /**
     * Instantiates this audio object
     * @param {PlayStation} ps
     * @param {MediaBag} mediaBag
     */
    realize(ps, mediaBag) {
      if (!this.audio && this.player === null && this.fileName !== null) {
        this.player = new ActiveMediaPlayer(new MediaContent('PLAY_AUDIO', this.fileName), mediaBag, ps)
        this.player.realize()
      }
    }

    /**
     * Plays the audio associated to this event
     */
    play() {
      if (this.enabled) {
        if (this.audio) {
          this.audio.currentTime = 0
          this.audio.play()
        } else if (this.player)
          this.player.play()
      }
    }

    /**
     * Stops playing the audio associated to this event
     */
    stop() {
      if (this.enabled) {
        if (this.audio)
          this.audio.pause()
        else if (this.player)
          this.player.stop()
      }
    }
  }

  Object.assign(EventSoundsElement.prototype, {
    /**
     * The sound file used by this element
     * @name EventSoundsElement#fileName
     * @type {string} */
    fileName: null,
    /**
     * Whether the sound for this event is enabled or not
     * @name EventSoundsElement#enabled
     * @type {number} */
    enabled: Utils.DEFAULT,
    /**
     * Media player used to play this sound
     * @name EventSoundsElement#player
     * @type {ActiveMediaPlayer} */
    player: null,
    /**
     * HTMLAudioElement used to play this sound
     * @name EventSoundsElement#audio
     * @type {HTMLAudioElement} */
    audio: null,
  })

  return EventSoundsElement
})
