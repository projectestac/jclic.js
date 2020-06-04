/**
 *  File    : media/ActiveMediaPlayer.js
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

/* global navigator */

import $ from 'jquery';
import AudioBuffer from './AudioBuffer';

/**
 * This kind of object encapsulates a realized {@link module:media/MediaContent.MediaContent} and provides methods to start,
 * stop, pause and record different types of media (audio, video, MIDI, voice recording...)
 */
export class ActiveMediaPlayer {
  /**
   * ActiveMediaPlayer constructor
   * @param {module:media/MediaContent.MediaContent} mc - - The content used by this player
   * @param {module:bags/MediaBag.MediaBag} mb - The project's MediaBag
   * @param {module:JClicPlayer.JClicPlayer} ps - An object implementing the
   * {@link http://projectestac.github.io/jclic/apidoc/edu/xtec/jclic/PlayStation.html PlayStation} interface,
   * usually a {@link module:JClicPlayer.JClicPlayer JClicPlayer}.
   */
  constructor(mc, mb, ps) {
    this.mc = mc;
    this.ps = ps;
    switch (mc.type) {
      case 'RECORD_AUDIO':
        if (ActiveMediaPlayer.AUDIO_BUFFERS) {
          this.clearAudioBuffer(mc.recBuffer);
          ActiveMediaPlayer.AUDIO_BUFFERS[mc.recBuffer] = new AudioBuffer(mc.length);
        }
      /* falls through */
      case 'PLAY_RECORDED_AUDIO':
        this.useAudioBuffer = true;
        break;
      case 'PLAY_AUDIO':
      case 'PLAY_VIDEO':
      case 'PLAY_MIDI':
        this.mbe = mb.getElement(mc.file, true);
        break;
      default:
        break;
    }
  }

  /**
   * Generates the objects that will play media
   */
  realize() {
    if (this.mbe) {
      this.mbe.build(mbe => {
        if (mbe.data && mbe.data.pause && !mbe.data.paused && !mbe.data.ended && mbe.data.currentTime)
          mbe.data.pause();
        if ((mbe.type === 'video' || mbe.type === 'anim') && mbe.data) {
          this.$visualComponent = $(mbe.data);
          this.$visualComponent.css('z-index', 20);
        }
      });
    }
  }

  /**
   * Plays the media, realizing it if needed.
   * @param {module:boxes/ActiveBox.ActiveBox} [_setBx] - The active box where this media will be placed (when video)
   */
  playNow(_setBx) {
    // TODO: Remove unused param "_setBx"
    if (this.useAudioBuffer) {
      if (ActiveMediaPlayer.AUDIO_BUFFERS) {
        const $div = this.ps && this.ps.$div;
        const buffer = ActiveMediaPlayer.AUDIO_BUFFERS[this.mc.recBuffer];
        if (buffer) {
          if (this.mc.type === 'RECORD_AUDIO') {
            buffer.record($div);
          } else {
            buffer.play();
          }
        }
      }
    } else if (this.mbe) {
      this.mbe.build(() => {
        if (this.mbe.data) {
          if (this.mbe.type === 'midi') {
            this.mbe.data.playTo = this.mc.to || 0;
          } else {
            let armed = false;
            const $player = $(this.mbe.data);
            // Clear previous event handlers
            $player.off();
            // If there is a time fragment specified, prepare to stop when the `to` position is reached
            if (this.mc.to > 0) {
              $player.on('timeupdate', () => {
                if (armed && this.mbe.data.currentTime >= this.mc.to / 1000) {
                  $player.off('timeupdate');
                  this.mbe.data.pause();
                }
              });
            }
            // Launch the media despite of its readyState
            armed = true;
          }
          if (!this.mbe.data.paused && !this.mbe.data.ended && this.mbe.data.currentTime)
            this.mbe.data.pause();
          // Seek the media position
          this.mbe.data.currentTime = this.mc.from > 0 ? this.mc.from / 1000 : 0;
          this.mbe.data.play();
        }
      });
    }
  }

  /**
   * Plays the media when available, without blocking the current thread.
   * @param {module:boxes/ActiveBox.ActiveBox} [setBx] - The active box where this media will be placed (when video)
   */
  play(setBx) {
    this.stopAllAudioBuffers();
    this.playNow(setBx);
  }

  /**
   * Stops the media playing
   */
  stop() {
    if (this.useAudioBuffer)
      this.stopAudioBuffer(this.mc.recBuffer);
    else if (this.mbe && this.mbe.data && this.mbe.data.pause && !this.mbe.data.paused && !this.mbe.data.ended && this.mbe.data.currentTime)
      this.mbe.data.pause();
  }

  /**
   * Frees all resources used by this player
   */
  clear() {
    this.stop();
    if (this.useAudioBuffer)
      this.clearAudioBuffer(this.mc.recBuffer);
  }

  /**
   * Clears the specified audio buffer
   * @param {number} buffer - Index of the buffer in {@link module:media/ActiveMediaPlayer.ActiveMediaPlayer#AUDIO_BUFFERS AUDIO_BUFFERS}
   */
  clearAudioBuffer(buffer) {
    if (ActiveMediaPlayer.AUDIO_BUFFERS &&
      buffer >= 0 && buffer < ActiveMediaPlayer.AUDIO_BUFFERS.length &&
      ActiveMediaPlayer.AUDIO_BUFFERS[buffer]) {
      ActiveMediaPlayer.AUDIO_BUFFERS[buffer].clear();
      ActiveMediaPlayer.AUDIO_BUFFERS[buffer] = null;
    }
  }

  /**
   * Clears all audio buffers
   */
  clearAllAudioBuffers() {
    if (ActiveMediaPlayer.AUDIO_BUFFERS)
      ActiveMediaPlayer.AUDIO_BUFFERS.forEach((_buffer, n) => this.clearAudioBuffer(n));
  }

  /**
   * Counts the number of active audio buffers
   * @returns {number}
   */
  countActiveBuffers() {
    return ActiveMediaPlayer.AUDIO_BUFFERS ? ActiveMediaPlayer.AUDIO_BUFFERS.reduce((c, ab) => c + ab ? 1 : 0, 0) : 0;
  }

  /**
   * Stops the playing or recording actions of all audio buffers
   */
  stopAllAudioBuffers() {
    if (ActiveMediaPlayer.AUDIO_BUFFERS)
      ActiveMediaPlayer.AUDIO_BUFFERS.forEach(ab => ab ? ab.stop() : null);
  }

  /**
   * Stops a specific audio buffer
   * @param {number} buffer - Index of the buffer in {@link module:media/ActiveMediaPlayer.ActiveMediaPlayer#AUDIO_BUFFERS AUDIO_BUFFERS}
   */
  stopAudioBuffer(buffer) {
    if (ActiveMediaPlayer.AUDIO_BUFFERS &&
      buffer >= 0 && buffer < ActiveMediaPlayer.AUDIO_BUFFERS.length &&
      ActiveMediaPlayer.AUDIO_BUFFERS[buffer])
      ActiveMediaPlayer.AUDIO_BUFFERS[buffer].stop();
  }

  /**
   * Checks the position of visual components after a displacement or resizing of its container
   * @param {module:boxes/ActiveBox.ActiveBox} _bxi - The container where this player is hosted
   */
  checkVisualComponentBounds(_bxi) {
    // does nothing
  }

  /**
   * Sets the visual component of this player visible or invisible
   * @param {boolean} _state - `true` for visible
   */
  setVisualComponentVisible(_state) {
    // TODO: Implement setVisualComponentVisible
  }

  /**
   * Sets the ActiveBox associated to this media player
   * @param {module:boxes/ActiveBox.ActiveBox} setBx - The new container of this media. Can be `null`.
   */
  linkTo(setBx) {
    this.bx = setBx;
    if (this.bx && this.$visualComponent)
      this.bx.setHostedComponent(this.$visualComponent);
  }
}

Object.assign(ActiveMediaPlayer.prototype, {
  /**
   * The MediaContent associated to this player.
   * @name module:media/ActiveMediaPlayer.ActiveMediaPlayer#mc
   * @type {module:media/MediaContent.MediaContent} */
  mc: null,
  /**
   * The player to which this player belongs.
   * @name module:media/ActiveMediaPlayer.ActiveMediaPlayer#ps
   * @type {module:JClicPlayer.JClicPlayer} */
  ps: null,
  /**
   * MediaPlayers should be linked to {@link module:boxes/ActiveBox.ActiveBox ActiveBox} objects.
   * @name module:media/ActiveMediaPlayer.ActiveMediaPlayer#bx
   * @type {module:boxes/ActiveBox.ActiveBox} */
  bx: null,
  /**
   * The visual component for videos, usually a `video` HTML element
   * @name module:media/ActiveMediaPlayer.ActiveMediaPlayer#$visualComponent
   * @type {external:jQuery} */
  $visualComponent: null,
  /**
   * When `true`, this player makes use of a recording audio buffer
   * @name module:media/ActiveMediaPlayer.ActiveMediaPlayer#useAudioBuffer
   * @type {boolean} */
  useAudioBuffer: false,
  /**
   * The {@link module:bads/MediaBagElement.MediaBagElement} containing the reference to the media to be played
   * @name module:media/ActiveMediaPlayer.ActiveMediaPlayer#mbe
   * @type {module:bags/MediaBagElement.MediaBagElement} */
  mbe: null,
});

/**
 * Recording of audio is enabled only when `navigator.getUserMedia` and `MediaRecorder` are defined
 * In 02-Mar-2016 this is implemented only in Firefox 41 and Chrome 49 or later.
 * See: {@link https://addpipe.com/blog/mediarecorder-api}
 * @type Boolean
 */
ActiveMediaPlayer.REC_ENABLED = typeof MediaRecorder !== 'undefined' && typeof navigator !== 'undefined';

if (ActiveMediaPlayer.REC_ENABLED) {
  navigator.getUserMedia = navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia;
}

/**
 * Audio buffers used for recording and playing voice are stored in a static array because
 * they are common to all instances of {@link module:media/ActiveMediaPlayer.ActiveMediaPlayer ActiveMediaPlayer}
 * Only initialized when {@link module:media/ActiveMediaPlayer.ActiveMediaPlayer#REC_ENABLED REC_ENABLED} is `true`.
 * @type {external:AudioBuffer[]} */
ActiveMediaPlayer.AUDIO_BUFFERS = ActiveMediaPlayer.REC_ENABLED ? [] : null;

export default ActiveMediaPlayer;
