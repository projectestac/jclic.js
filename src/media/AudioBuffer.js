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

/* global define, navigator */

define([
  "../Utils"
], function (Utils) {
  /**
   * The AudioBuffer object provides sound recording and replaying to activities.
   * @exports AudioBuffer
   * @class
   */
  class AudioBuffer {
    /**
     * AudioBuffer constructor
     * @param {number=} seconds - The maximum amount of time allowed to be recorded by this AudioBuffer
     */
    constructor(seconds) {
      if (navigator && navigator.mediaDevices && navigator.mediaDevices.getUserMedia)
        this.enabled = true;
      if (seconds)
        this.seconds = seconds;
      this.chunks = [];
    }

    /**
     * Starts playing the currently recorded audio, if any.
     */
    play() {
      this.stop();
      if (this.mediaPlayer) {
        this.mediaPlayer.currentTime = 0;
        this.mediaPlayer.play();
      } else {
        this.playWhenFinished = true;
      }
    }

    /**
     * Stops the current operation, either recording or playing audio
     */
    stop() {
      if (this.mediaRecorder && this.mediaRecorder.state === 'recording')
        this.mediaRecorder.stop();
      else if (this.mediaPlayer && !this.mediaPlayer.paused)
        this.mediaPlayer.pause();
    }

    /**
     * Starts recording audio, or stops the recording if already started.
     * @param {jQuery=} $div - Optional `div` element where the recording is performed, as a jQuery ref.
     */
    record($div) {
      if (this.mediaRecorder && this.mediaRecorder.state === 'recording')
        this.mediaRecorder.stop();
      else if (this.enabled) {
        this.stop();
        this.mediaPlayer = null;

        navigator.mediaDevices.getUserMedia({ audio: true, video: false })
          .then(mediaStream => {
            this.mediaRecorder = new MediaRecorder(mediaStream);
            this.mediaRecorder.ondataavailable = ev => this.chunks.push(ev.data);
            this.mediaRecorder.onerror = err => {
              Utils.log('error', `Error recording audio: ${err}`);
              this.mediaRecorder = null;
            }
            this.mediaRecorder.onstart = () => {
              Utils.log('debug', 'Recording audio started');
              this.visualFeedbak(true, $div);
            }
            this.mediaRecorder.onstop = () => {
              Utils.log('debug', 'Recording audio finished');
              this.visualFeedbak(false, $div);

              if (this.timeoutID) {
                window.clearTimeout(this.timeoutID);
                this.timeoutID = null;
              }

              const options = {};
              if (this.chunks.length > 0 && this.chunks[0].type)
                options.type = this.chunks[0].type;
              const blob = new Blob(this.chunks, options);
              this.chunks = [];
              this.mediaPlayer = document.createElement('audio');
              this.mediaPlayer.src = URL.createObjectURL(blob);
              this.mediaPlayer.pause();
              this.mediaRecorder = null;
              if (this.playWhenFinished) {
                this.playWhenFinished = false;
                this.mediaPlayer.play();
              }
            }
            this.mediaRecorder.onwarning = ev => Utils.log('warn', `Warning recording audio: ${ev}`);

            this.playWhenFinished = false;
            this.mediaRecorder.start();
            this.timeoutID = window.setTimeout(() => {
              if (this.mediaRecorder);
                this.mediaRecorder.stop();
            }, this.seconds * 1000);
          })
          .catch(err => {
            Utils.log('error', err.toString());
            this.visualFeedbak(false, $div);
          });
      }
    }

    /**
     * Set visual feedback to the user while the system is recording audio
     * Currently changes the cursor pointer associated to the HTML element
     * containing the recorder.
     * @param {boolean} enabled - Flag indicating if the visual feedback should be active or inactive
     * @param {jQuery=} $div - Optional `div` element where the recording is performed, as a jQuery ref.
     */
    visualFeedbak(enabled, $div) {
      if ($div)
        $div.css('cursor', enabled ? 'progress' : 'inherit');
    }

    /**
     * Clears all data associated to this AudioBuffer
     */
    clear() {
      this.stop();
      this.mediaPlayer = null;
    }
  }

  /**
   * Maximum amount of time allowed for recordings (in seconds)
   * @type {number}
   */
  AudioBuffer.MAX_RECORD_LENGTH = 180;

  Object.assign(AudioBuffer.prototype, {
    /**
     * AudioBuffer is enabled only in browsers with `navigator.MediaDevices.getuserMedia`
     * @name AudioBuffer#enabled
     * @type {boolean}
     */
    enabled: false,
    /**
     * Maximum length of recordings allowed to this AudioBuffer (in seconds)
     * @name AudioBuffer#seconds
     * @type {number}
     */
    seconds: 20,
    /**
     * The object used to record audio data and convert it to a valid stream for the {@link mediaPlayer}
     * @name AudioBuffer#mediaRecorder
     * @type {external:MediaRecorder}
     */
    mediaRecorder: null,
    /**
     * Array of data chunks collected during the recording
     * @name AudioBuffer#chunks
     * @type {Blob[]}
     */
    chunks: null,
    /**
     * The HTML audio element used to play the recorded sound
     * @name AudioBuffer#mediaPlayer
     * @type {external:HTMLAudioElement}
     */
    mediaPlayer: null,
    /**
     * The identifier of the timer launched to stop the recording when the maximum time is exceeded.
     * This member is `null` when no timeout function is associated to this AudioBuffer
     * @name AudioBuffer#timeoutID
     * @type {number}
     */
    timeoutID: null,
    /**
     * Instructs this AudioBuffer recorder to start playing the collected audio at the end of the
     * current `mediaRecorder` task.
     * @name AudioBuffer#playWhenFinished
     * @type {boolean}
     */
    playWhenFinished: false,
  });

  return AudioBuffer;
});
