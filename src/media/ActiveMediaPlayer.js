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
  "jquery",
  "./AudioBuffer"
], function ($, AudioBuffer) {

  /**
   * This kind of object encapsulates a realized {@link MediaContent} and provides methods to start,
   * stop, pause and record different types of media (audio, video, MIDI, voice recording...)
   * @exports ActiveMediaPlayer
   * @class
   */
  class ActiveMediaPlayer {
    /**
     * ActiveMediaPlayer constructor
     * @param {MediaContent} mc - - The content used by this player
     * @param {MediaBag} mb - The project's MediaBag
     * @param {PlayStation} ps - An object implementing the
     * {@link http://projectestac.github.io/jclic/apidoc/edu/xtec/jclic/PlayStation.html PlayStation} interface,
     * usually a {@link JClicPlayer}.
     */
    constructor(mc, mb, ps) {
      this.mc = mc
      this.ps = ps
      switch (mc.mediaType) {
        case 'RECORD_AUDIO':
          if (ActiveMediaPlayer.AUDIO_BUFFERS) {
            this.clearAudioBuffer(mc.recBuffer)
            ActiveMediaPlayer.AUDIO_BUFFERS[mc.recBuffer] = new AudioBuffer(mc.length)
          }
        /* falls through */
        case 'PLAY_RECORDED_AUDIO':
          this.useAudioBuffer = true
          break
        case 'PLAY_AUDIO':
        case 'PLAY_VIDEO':
          var fn = mc.mediaFileName
          //if (mc.from > 0 || mc.to > 0) {
          // TODO: Check media ranges. Currently not running always as expected.
          //  fn = fn + '#t=' + (mc.from > 0 ? mc.from / 1000 : 0) + ',' + (mc.to > 0 ? mc.to / 1000 : 9999);
          //}
          this.mbe = mb.getElement(fn, true)
          break
        case 'PLAY_MIDI':
          // TODO: Implement MIDI playing
          break
        default:
          break
      }
    }

    /**
     * Generates the objects that will play media
     */
    realize() {
      if (this.mbe) {
        this.mbe.build(mbe => {
          if (mbe.data.pause)
            mbe.data.pause()
          if ((mbe.type === 'video' || mbe.type === 'anim') && mbe.data) {
            this.$visualComponent = $(mbe.data)
            this.$visualComponent.css('z-index', 20)
          }
        })
      }
    }

    /**
     * Plays the media, realizing it if needed.
     * @param {ActiveBox=} _setBx - The active box where this media will be placed (when video)
     */
    playNow(_setBx) {
      // TODO: Remove unused param "_setBx"
      if (this.useAudioBuffer) {
        if (ActiveMediaPlayer.AUDIO_BUFFERS) {
          var buffer = ActiveMediaPlayer.AUDIO_BUFFERS[this.mc.recBuffer]
          if (buffer) {
            if (this.mc.mediaType === 'RECORD_AUDIO') {
              buffer.record()
            } else {
              buffer.play()
            }
          }
        }
      } else if (this.mbe) {
        //if (this.mbe.data)
        //  this.mbe.data.trigger('pause');
        var mediaplayer = this
        this.mbe.build(function () {
          var armed = false

          // `this` points here to the [MediaBagElement](MediaBagElement) object `mbe`
          var thisData = this.data
          var $thisData = $(thisData)

          // Clear previous event handlers
          $thisData.off()

          // If there is a time fragment specified, prepare to stop when the `to` position is reached
          if (mediaplayer.mc.to > 0) {
            $thisData.on('timeupdate', function () {
              // `this` points here to the HTML audio element
              if (armed && thisData.currentTime >= mediaplayer.mc.to / 1000) {
                $thisData.off('timeupdate')
                thisData.pause()
              }
            })
          }
          // Seek the media position
          var t = mediaplayer.mc.from > 0 ? mediaplayer.mc.from / 1000 : 0
          // Launch the media despite of its readyState
          armed = true
          thisData.pause()
          thisData.currentTime = t
          thisData.play()
        })
      }
    }

    /**
     * Plays the media when available, without blocking the current thread.
     * @param {ActiveBox=} setBx - The active box where this media will be placed (when video)
     */
    play(setBx) {
      // TODO: invoke in a separate thread, not blocking the current one
      // _In Java was javax.swing.SwingUtilities.invokeLater(new Runnable(){})_
      this.stopAllAudioBuffers()
      this.playNow(setBx)
    }

    /**
     * Stops the media playing
     */
    stop() {
      if (this.useAudioBuffer)
        this.stopAudioBuffer(this.mc.recBuffer)
      else if (this.mbe && this.mbe.data && !this.mbe.data.paused && this.mbe.data.pause)
        this.mbe.data.pause()

    }

    /**
     * Frees all resources used by this player
     */
    clear() {
      this.stop()
      if (this.useAudioBuffer)
        this.clearAudioBuffer(this.mc.recBuffer)
    }

    /**
     * Clears the specified audio buffer
     * @param {number} buffer - Index of the buffer in {@link ActiveMediaPlayer.AUDIO_BUFFERS}
     */
    clearAudioBuffer(buffer) {
      if (ActiveMediaPlayer.AUDIO_BUFFERS &&
        buffer >= 0 && buffer < ActiveMediaPlayer.AUDIO_BUFFERS.length &&
        ActiveMediaPlayer.AUDIO_BUFFERS[buffer]) {
        ActiveMediaPlayer.AUDIO_BUFFERS[buffer].clear()
        ActiveMediaPlayer.AUDIO_BUFFERS[buffer] = null
      }
    }

    /**
     * Clears all audio buffers
     */
    clearAllAudioBuffers() {
      if (ActiveMediaPlayer.AUDIO_BUFFERS)
        for (let i = 0; i < ActiveMediaPlayer.AUDIO_BUFFERS.length; i++)
          this.clearAudioBuffer(i)
    }

    /**
     * Counts the number of active audio buffers
     * @returns {number}
     */
    countActiveBuffers() {
      return ActiveMediaPlayer.AUDIO_BUFFERS.reduce((c, ab) => c + ab ? 1 : 0, 0)
    }

    /**
     * Stops the playing or recording actions of all audio buffers
     */
    stopAllAudioBuffers() {
      ActiveMediaPlayer.AUDIO_BUFFERS.forEach(ab => {
        if (ab)
          ab.stop()
      })
    }

    /**
     * Stops a specific audio buffer
     * @param {number} buffer - Index of the buffer in {@link ActiveMediaPlayer.AUDIO_BUFFERS}
     */
    stopAudioBuffer(buffer) {
      if (ActiveMediaPlayer.AUDIO_BUFFERS &&
        buffer >= 0 && buffer < ActiveMediaPlayer.AUDIO_BUFFERS.length &&
        ActiveMediaPlayer.AUDIO_BUFFERS[buffer])
        ActiveMediaPlayer.AUDIO_BUFFERS[buffer].stop()
    }

    /**
     * Checks the position of visual components after a displacement or resizing of its container
     * @param {ActiveBox} _bxi - The container where this player is hosted
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
     * @param {?ActiveBox} setBx - The new container of this media. Can be `null`.
     */
    linkTo(setBx) {
      this.bx = setBx
      if (this.bx && this.$visualComponent)
        this.bx.setHostedComponent(this.$visualComponent)
    }
  }

  /**
   * Recording of audio is enabled only when `navigator.getUserMedia` and `MediaRecorder` are defined
   * In 02-Mar-2016 this is implemented only in Firefox 41 and Chrome 49 or later.
   * See: {@link https://addpipe.com/blog/mediarecorder-api}
   * @type Boolean
   */
  ActiveMediaPlayer.REC_ENABLED = typeof MediaRecorder !== 'undefined' && typeof navigator !== 'undefined'

  if (ActiveMediaPlayer.REC_ENABLED) {
    navigator.getUserMedia = navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia
  }

  /**
   * Audio buffers used for recording and playing voice are stored in a static array because
   * they are common to all instances of {@link ActiveMediaPlayer}
   * Only initialized when {@link REC_ENABLED} is `true`.
   * @type {AudioBuffer[]} */
  ActiveMediaPlayer.AUDIO_BUFFERS = ActiveMediaPlayer.REC_ENABLED ? [] : null

  Object.assign(ActiveMediaPlayer.prototype, {
    /**
     * The MediaContent associated to this player.
     * @type {MediaContent} */
    mc: null,
    /**
     * The player to which this player belongs.
     * @type {JClicPlayer} */
    ps: null,
    /**
     * MediaPlayers should be linked to {@link ActiveBox} objects.
     * @type {ActiveBox} */
    bx: null,
    /**
     * The visual component for videos, usually a `video` HTML element
     * @type {external:jQuery} */
    $visualComponent: null,
    /**
     * When `true`, this player makes use of a recording audio buffer
     * @type {boolean} */
    useAudioBuffer: false,
    /**
     * The {@link MediaBagElement} containing the reference to the media to be played
     * @type {MediaBagElement} */
    mbe: null,
  })

  return ActiveMediaPlayer
})
