//    File    : ActiveMediaPlayer.js  
//    Created : 28/04/2015  
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
  "../AWT"
], function ($, AWT) {
  /**
   * This kind of object encapsulates a realized {@link MediaContent} and provides methods to start,
   * stop, pause and record different types of media (audio, video, MIDI, voice recording...)
   * @exports ActiveMediaPlayer
   * @class
   * @param {MediaContent} mc - - The content used by this player
   * @param {MediaBag} mb - The project's MediaBag
   * @param {PlayStation} ps - An object implementing the
   * [PlayStation](http://projectestac.github.io/jclic/apidoc/edu/xtec/jclic/PlayStation.html) interface,
   * usually a {@link JClicPlayer}.
   */
  var ActiveMediaPlayer = function (mc, mb, ps) {
    this.mc = mc;
    this.ps = ps;
    switch (mc.mediaType) {
      case 'RECORD_AUDIO':
        this.clearAudioBuffer(mc.recBuffer);
        ActiveMediaPlayer.prototype._audioBuffer[mc.recBuffer] = this.createAudioBuffer(mc.length);
        /* falls through */
      case 'PLAY_RECORDED_AUDIO':
        this.useAudioBuffer = true;
        break;
      case 'PLAY_AUDIO':
      case 'PLAY_VIDEO':
        var fn = mc.mediaFileName;
        //if (mc.from > 0 || mc.to > 0) {
        // TODO: Check media ranges. Currently not running always as expected.
        //  fn = fn + '#t=' + (mc.from > 0 ? mc.from / 1000 : 0) + ',' + (mc.to > 0 ? mc.to / 1000 : 9999);
        //}
        this.mbe = mb.getElement(fn, true);
        break;
      case 'PLAY_MIDI':
        // TODO: Implement MIDI playing
        break;
      default:
        break;
    }
  };

  ActiveMediaPlayer.prototype = {
    constructor: ActiveMediaPlayer,
    /**
     * The audio buffers used for recording and playing voice are stored in the prototype because
     * are common to all instances of {@link ActiveMediaPlayer}
     * @protected
     * @type {AudioBuffer[]} */
    _audioBuffer: [],
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
    /**
     * 
     * Creates a new AudioBuffer
     * @param {number} seconds - Maximum duration of the buffer
     * @returns {AudioBuffer}
     */
    createAudioBuffer: function (seconds) {
      //TODO: Implement AudioBuffer      
    },
    /**
     * 
     * Generates the real objects capable of playing media
     */
    realize: function () {
      if (this.mbe) {
        this.mbe.build(function () {
          this.data.trigger('pause');
        });
      }
    },
    /**
     * 
     * Plays the media, realizing it if needed.
     * @param {ActiveBox=} setBx - The active box where this media will be placed (when video)
     */
    playNow: function (setBx) {

      // TODO: Check error setting currentTime on Audio objects

      if (this.mbe) {
        //if (this.mbe.data)
        //  this.mbe.data.trigger('pause');
        var thisMP = this;
        this.mbe.build(function () {
          var armed = false;

          // `this` points here to the [MediaBagElement](MediaBagElement) object `mbe`

          // Clear previous event handlers
          this.data.off();

          // If there is a time fragment specified, prepare to stop when the `to` position is reached
          if (thisMP.mc.to > 0) {
            this.data.on('timeupdate', function () {
              // `this` points here to the HTML audio element
              if (armed && this.currentTime >= thisMP.mc.to / 1000) {
                $(this).off('timeupdate');
                this.pause();
              }
            });
          }
          //
          // Seek the media position
          var t = thisMP.mc.from > 0 ? thisMP.mc.from / 1000 : 0;
          // CAN_PLAY_THROUGH is always 4 ?
          if (this.data[0].readyState >= 4) {
            armed = true;
            this.data[0].pause();
            this.data[0].currentTime = t;
            this.data[0].play();
          }
          else {
            this.data[0].load();
            this.data.on('canplaythrough', function () {
              $(this).off('canplaythrough');
              armed = true;
              this.pause();
              this.currentTime = t;
              this.play();
            });
          }
        });
      }
    },
    /**
     * 
     * Plays the media when available, without blocking the current thread.
     * @param {ActiveBox=} setBx - The active box where this media will be placed (when video)
     */
    play: function (setBx) {
      // TODO: invoke in a separate thread, not blocking the current one
      // _In Java was javax.swing.SwingUtilities.invokeLater(new Runnable(){})_
      this.stopAllAudioBuffers();
      this.playNow(setBx);
    },
    /**
     * 
     * Stops the media playing
     */
    stop: function () {
      if (this.useAudioBuffer)
        this.stopAudioBuffer(this.mc.recBuffer);
      else if (this.mbe && this.mbe.data && this.mbe.data.length > 0 && this.mbe.data[0].paused === false) {
        this.mbe.data[0].pause();
      }
    },
    /**
     * 
     * Frees all resources used by this player
     */
    clear: function () {
      this.stop();
      if (this.useAudioBuffer)
        this.clearAudioBuffer(this.mc.recBuffer);
      //else if(this.mbe && this.mbe.data){
      //  this.mbe.data.prop('src', '');
      //  this.mbe.data = null;
      //  this.mbe.ready = false;
      //}
    },
    /**
     * 
     * Clears the specified audio buffer
     * @param {number} buffer - Index of the buffer into {@link ActiveMediaPlayer#_audioBuffer}
     */
    clearAudioBuffer: function (buffer) {
      if (buffer >= 0 && buffer < ActiveMediaPlayer.prototype._audioBuffer.length && ActiveMediaPlayer.prototype._audioBuffer[buffer] !== null) {
        ActiveMediaPlayer.prototype._audioBuffer[buffer].clear();
        ActiveMediaPlayer.prototype._audioBuffer[buffer] = null;
      }
    },
    /**
     * 
     * Clears all audio buffers
     */
    clearAllAudioBuffers: function () {
      for (var i = 0; i < ActiveMediaPlayer.prototype._audioBuffer.length; i++)
        this.clearAudioBuffer(i);
    },
    /**
     * 
     * Counts the number of active audio buffers
     * @returns {number}
     */
    countActiveBuffers: function () {
      var c = 0;
      for (var i = 0; i < ActiveMediaPlayer.prototype._audioBuffer.length; i++)
        if (ActiveMediaPlayer.prototype._audioBuffer[i])
          c++;
      return c;
    },
    /**
     * 
     * Stops the playing or recording actions of all audio buffers
     */
    stopAllAudioBuffers: function () {
      for (var i = 0; i < ActiveMediaPlayer.prototype._audioBuffer.length; i++)
        if (ActiveMediaPlayer.prototype._audioBuffer[i])
          ActiveMediaPlayer.prototype._audioBuffer[i].stop();
    },
    /**
     * 
     * Stops a specific audio buffer
     * @param {number} buffer - Index of the buffer into {@link ActiveMediaPlayer#_audioBuffer}
     */
    stopAudioBuffer: function (buffer) {
      if (buffer >= 0 && buffer < ActiveMediaPlayer.prototype._audioBuffer.length && ActiveMediaPlayer.prototype._audioBuffer[buffer] !== null)
        ActiveMediaPlayer.prototype._audioBuffer[buffer].stop();
    },
    /**
     * 
     * Checks the position of visual components after a displacement or resizing of its container
     * @param {ActiveBox} bxi - The container where this player is hosted
     */
    checkVisualComponentBounds: function (bxi) {
      // TODO: Implement checkVisualComponents
    },
    /**
     * Sets the visual component of this player visible or invisible
     * @param {boolean} state - `true` for visible
     */
    setVisualComponentVisible: function (state) {
      // TODO: Implement setVisualComponentVisible
    },
    /**
     * 
     * Sets the ActiveBox associated to this media player
     * @param {?ActiveBox} setBx - The new container of this media. Can be `null`.
     */
    linkTo: function (setBx) {
    }
  };

  return ActiveMediaPlayer;

});
