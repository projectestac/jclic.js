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
 *  (c) 2000-2016 Ministry of Education of Catalonia (http://xtec.cat)
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

/* global MediaRecorder, navigator, window, URL */

define([
  "../Utils"
], function (Utils) {
  /**
   * The AudioBuffer object provides sound recording and replaying to activities.
   * @exports AudioBuffer
   * @class
   * @param {number=} seconds - The maximum amount of time allowed to be recorded by this AudioBuffer
   */
  var AudioBuffer = function (seconds) {
    if (seconds)
      this.seconds = seconds;
    this.chunks = [];
  };

  /**
   * Maximum amount of time allowed for recordings (in seconds)
   * @type {number}
   */
  AudioBuffer.MAX_RECORD_LENGTH = 20;

  AudioBuffer.prototype = {
    constructor: AudioBuffer,
    /**
     * Maximum length of recordings allowed to this AudioBuffer (in seconds)
     * @type {number}
     */
    seconds: AudioBuffer.MAX_RECORD_LENGTH,
    /**
     * The object used to record audio data and convert it to a valid stream for the {@link mediaPlayer}
     * @type {external:MediaRecorder}
     */
    mediaRecorder: null,
    /**
     * Array of data chunks collected during the recording
     */
    chunks: null,
    /**
     * The HTML audio element used to play the recorded sound
     * @type {external:HTMLAudioElement}
     */
    mediaPlayer: null,
    /**
     * The identifier of the timer launched to stop the recording when the maximum time is exceeded.
     * This member is `null` when no timeout function is associated to this AudioBuffer
     * @type {number}
     */
    timeoutID: null,
    /**
     * Instructs this AudioBuffer recorder to start playing the collected audio at the end of the
     * current `mediaRecorder` task.
     * @type {boolean}
     */
    playWhenFinished: false,
    /**
     *
     * Starts playing the currently recorded audio, if any.
     */
    play: function () {
      this.stop();
      if (this.mediaPlayer) {
        this.mediaPlayer.currentTime = 0;
        this.mediaPlayer.play();
      } else {
        this.playWhenFinished = true;
      }
    },
    /**
     *
     * Stops the current operation, either recording or playing audio
     */
    stop: function () {
      if (this.mediaRecorder && this.mediaRecorder.state === 'recording')
        this.mediaRecorder.stop();
      else if (this.mediaPlayer && !this.mediaPlayer.paused)
        this.mediaPlayer.pause();
    },
    /**
     *
     * Starts recording audio, or stops the recording if already started.
     */
    record: function () {
      if (this.mediaRecorder && this.mediaRecorder.state === 'recording') {
        this.mediaRecorder.stop();
      } else {
        this.stop();
        var buffer = this;
        this.mediaPlayer = null;

        // TODO: update navigator.getUserMedia to navigator.mediaDevices.getUserMedia (with promises)
        // when supported in Chrome/Chromium
        // (in v. 49 this is supported only when "experimental web extensions" flag is enabled)
        // See: https://developer.mozilla.org/en-US/docs/Web/API/Navigator/getUserMedia

        navigator.getUserMedia(
            {audio: true},
            function (stream) {
              buffer.mediaRecorder = new MediaRecorder(stream);
              buffer.mediaRecorder.ondataavailable = function (e) {
                buffer.chunks.push(e.data);
              };
              buffer.mediaRecorder.onerror = function (e) {
                Utils.log('error', 'Error recording audio: %s', e);
                buffer.mediaRecorder = null;
              };
              buffer.mediaRecorder.onstart = function () {
                Utils.log('debug', 'Recording audio started');
              };
              buffer.mediaRecorder.onstop = function () {
                Utils.log('debug', 'Recording audio finished');

                if (buffer.timeoutID) {
                  window.clearTimeout(buffer.timeoutID);
                  buffer.timeoutID = null;
                }

                var options = {};
                if (buffer.chunks.length > 0 && buffer.chunks[0].type)
                  options.type = buffer.chunks[0].type;
                var blob = new Blob(buffer.chunks, options);
                buffer.chunks = [];
                buffer.mediaPlayer = document.createElement('audio');
                var url = URL.createObjectURL(blob);
                buffer.mediaPlayer.src = url;
                buffer.mediaPlayer.pause();
                buffer.mediaRecorder = null;
                if (buffer.playWhenFinished) {
                  buffer.playWhenFinished = false;
                  buffer.mediaPlayer.play();
                }
              };
              buffer.mediaRecorder.onwarning = function (e) {
                Utils.log('warn', 'Warning recording audio: %s', e);
              };

              buffer.playWhenFinished = false;
              buffer.mediaRecorder.start();
              buffer.timeoutID = window.setTimeout(function () {
                if (buffer.mediaRecorder)
                  buffer.mediaRecorder.stop();
              }, buffer.seconds * 1000);

            },
            function (error) {
              Utils.log('error', 'Error recording audio: %s', error);
            });
      }
    },
    /**
     *
     * Clears all data associated to this AudioBuffer
     */
    clear: function () {
      this.stop();
      this.mediaPlayer = null;
    }
  };

  return AudioBuffer;
});
