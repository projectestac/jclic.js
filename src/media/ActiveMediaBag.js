/**
 *  File    : media/ActiveMediaBag.js
 *  Created : 28/04/2015
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
  "./ActiveMediaPlayer",
  "../Utils"
], function (ActiveMediaPlayer, Utils) {

  /**
   * This class stores a collection of realized {@link ActiveMediaPlayer} objects, related to a
   * {@link JClicProject} or {@link Activity}.
   * @exports ActiveMediaBag
   * @class
   */
  class ActiveMediaBag {
    /**
     * ActiveMediaBag constructor
     */
    constructor() {
      this.players = []
    }

    /**
     * Creates a new {@link ActiveMediaPlayer} linked to this media bag
     * @param {MediaContent} mc - The content used by the new player
     * @param {MediaBag} mb - The project's MediaBag
     * @param {PlayStation} ps - An object implementing the
     * [PlayStation](http://projectestac.github.io/jclic/apidoc/edu/xtec/jclic/PlayStation.html) interface,
     * usually a {@link JClicPlayer}.
     * @returns {ActiveMediaPlayer}
     */
    createActiveMediaPlayer(mc, mb, ps) {
      let amp = null
      switch (mc.mediaType) {
        case 'RECORD_AUDIO':
          if (mc.length <= 0 || mc.length >= Utils.settings.MAX_RECORD_LENGTH)
            break
        /* falls through */
        case 'PLAY_RECORDED_AUDIO':
          if (mc.recBuffer < 0 || mc.recBuffer >= 10)
            break
        /* falls through */
        case 'PLAY_AUDIO':
        case 'PLAY_MIDI':
        case 'PLAY_VIDEO':
          amp = new ActiveMediaPlayer(mc, mb, ps)
          break
      }
      if (amp !== null)
        this.players.push(amp)
      return amp
    }

    /**
     * Looks for an already existing {@link ActiveMediaPlayer} equivalent to the requested.
     * When not found, a new one is created and and returned.
     * @param {MediaContent} mc - The content used by the new player
     * @param {MediaBag} mb - The project's MediaBag
     * @param {PlayStation} ps - An object implementing the
     * {@link http://projectestac.github.io/jclic/apidoc/edu/xtec/jclic/PlayStation.html|PlayStation} interface,
     * usually a {@link JClicPlayer}.
     * @returns {ActiveMediaPlayer}
     */
    getActiveMediaPlayer(mc, mb, ps) {
      return this.players.find(p => p.mc === mc || p.mc.isEquivalent(mc))
        || this.createActiveMediaPlayer(mc, mb, ps)
    }

    /**
     * Removes from the list of players the {@link ActiveMediaPlayer} related to the specified {@link MediaContent}.
     * @param {MediaContent} mc - The media content to look for.
     */
    removeActiveMediaPlayer(mc) {
      const i = this.players.findIndex(p => p.mc === mc)
      if (i >= 0) {
        this.players[i].clear()
        // removes the element pointed by 'i'
        this.players.splice(i, 1)
      }
    }

    /**
     * Realizes all the media elements stored in this bag
     */
    realizeAll() {
      this.players.forEach(p => p.realize())
    }

    /**
     * Stops playing all media elements stored in this bag
     * @param {number} level - Level at and below what all media players will be muted.
     */
    stopAll(level) {
      if (typeof level === 'undefined')
        level = -1
      this.players.forEach(amp => {
        if (level === -1 || amp.mc !== null && amp.mc.level <= level)
          amp.stop()
      })
    }

    /**
     * Removes all players from this media bag
     */
    removeAll() {
      this.players.forEach(p => p.clear())
      // Empty the `players` array
      this.players.length = 0
      ActiveMediaPlayer.prototype.clearAllAudioBuffers()
    }
  }

  Object.assign(ActiveMediaBag.prototype, {
    /**
     * The collection of {@link ActiveMediaPlayer} objects stored in this media bag.
     * @name ActiveMediaBag#players
     * @type {ActiveMediaPlayer[]} */
    players: [],
  })

  return ActiveMediaBag
})
