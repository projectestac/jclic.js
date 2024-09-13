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

import ActiveMediaPlayer from './ActiveMediaPlayer.js';
import { settings } from '../Utils.js';

/**
 * This class stores a collection of realized {@link module:media/ActiveMediaPlayer.ActiveMediaPlayer ActiveMediaPlayer} objects, related to a
 * {@link module:project/JClicProject.JClicProject JClicProject} or {@link module:Activity.Activity Activity}.
 */
export class ActiveMediaBag {
  /**
   * ActiveMediaBag constructor
   */
  constructor() {
    this.players = [];
  }

  /**
   * Creates a new {@link module:media/ActiveMediaPlayer.ActiveMediaPlayer ActiveMediaPlayer} linked to this media bag
   * @param {module:media/MediaContent.MediaContent} mc - The content used by the new player
   * @param {module:bags/MediaBag.MediaBag} mb - The project's MediaBag
   * @param {module:JClicPlayer.JClicPlayer} ps - An object implementing the
   * [PlayStation](http://projectestac.github.io/jclic/apidoc/edu/xtec/jclic/PlayStation.html) interface,
   * usually a {@link module:JClicPlayer.JClicPlayer JClicPlayer}.
   * @returns {module:media/ActiveMediaPlayer.ActiveMediaPlayer}
   */
  createActiveMediaPlayer(mc, mb, ps) {
    let amp = null;
    switch (mc.type) {
      case 'RECORD_AUDIO':
        if (mc.length <= 0 || mc.length >= settings.MAX_RECORD_LENGTH)
          break;
      /* falls through */
      case 'PLAY_RECORDED_AUDIO':
        if (mc.recBuffer < 0 || mc.recBuffer >= 10)
          break;
      /* falls through */
      case 'PLAY_AUDIO':
      case 'PLAY_MIDI':
      case 'PLAY_VIDEO':
        amp = new ActiveMediaPlayer(mc, mb, ps);
        break;
    }
    if (amp !== null)
      this.players.push(amp);
    return amp;
  }

  /**
   * Looks for an already existing {@link module:media/ActiveMediaPlayer.ActiveMediaPlayer ActiveMediaPlayer} equivalent to the requested.
   * When not found, a new one is created and and returned.
   * @param {module:media/MediaContent.MediaContent} mc - The content used by the new player
   * @param {module:bags/MediaBag.MediaBag} mb - The project's MediaBag
   * @param {module:JClicPlayer.JClicPlayer} ps - An object implementing the
   * {@link http://projectestac.github.io/jclic/apidoc/edu/xtec/jclic/PlayStation.html|PlayStation} interface,
   * usually a {@link module:JClicPlayer.JClicPlayer JClicPlayer}.
   * @returns {module:media/ActiveMediaPlayer.ActiveMediaPlayer}
   */
  getActiveMediaPlayer(mc, mb, ps) {
    return this.players.find(p => p.mc === mc || p.mc.isEquivalent(mc))
      || this.createActiveMediaPlayer(mc, mb, ps);
  }

  /**
   * Removes from the list of players the {@link module:media/ActiveMediaPlayer.ActiveMediaPlayer ActiveMediaPlayer} related to the specified {@link module:media/MediaContent.MediaContent}.
   * @param {module:media/MediaContent.MediaContent} mc - The media content to look for.
   */
  removeActiveMediaPlayer(mc) {
    const i = this.players.findIndex(p => p.mc === mc);
    if (i >= 0) {
      this.players[i].clear();
      // removes the element pointed by 'i'
      this.players.splice(i, 1);
    }
  }

  /**
   * Realizes all the media elements stored in this bag
   */
  realizeAll() {
    this.players.forEach(p => p.realize());
  }

  /**
   * Stops playing all media elements stored in this bag
   * @param {number} level - Level at and below what all media players will be muted.
   */
  stopAll(level) {
    if (typeof level === 'undefined')
      level = -1;
    this.players.forEach(amp => {
      if (level === -1 || amp.mc !== null && amp.mc.level <= level)
        amp.stop();
    });
  }

  /**
   * Removes all players from this media bag
   */
  removeAll() {
    this.players.forEach(p => p.clear());
    // Empty the `players` array
    this.players.length = 0;
    ActiveMediaPlayer.prototype.clearAllAudioBuffers();
  }
}

Object.assign(ActiveMediaBag.prototype, {
  /**
   * The collection of {@link module:media/ActiveMediaPlayer.ActiveMediaPlayer ActiveMediaPlayer} objects stored in this media bag.
   * @name module:media/ActiveMediaBag.ActiveMediaBag#players
   * @type {module:media/ActiveMediaPlayer.ActiveMediaPlayer[]} */
  players: [],
});

export default ActiveMediaBag;
