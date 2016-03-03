//    File    : EventSoundsElement.js  
//    Created : 01/04/2015  
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

/* global MediaRecorder, navigator, window, URL */

define([
  "./ActiveMediaPlayer"
], function (ActiveMediaPlayer) {
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
     * Array of data chuncks collected during the recording
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
     * 
     * Starts playing the currently recorded audio, if any.
     */
    play: function () {
      var bufferStopped = this.stop();
      if (this.mediaPlayer) {
        this.mediaPlayer.currentTime = 0;
        this.mediaPlayer.play();
      } else if(bufferStopped) {        
        // Retry later if the current recording was stopped due to this call to "play"
        //window.setTimeout(2000, 
        //function(buffer){
        //  console.log('deferred play!');
        //  buffer.play();
        //}, this);
      }
    },
    /**
     * 
     * Stops the current operation, either recording or playing audio
     * @returns {boolean} - `true` when the current recording was stopped due to this call. `false` otherwise.
     */
    stop: function () {
      var result = false;
      if (this.mediaRecorder && this.mediaRecorder.state === 'recording') {
        this.mediaRecorder.stop();
        result = true;
      } else if (this.mediaPlayer && !this.mediaPlayer.paused) {
        this.mediaPlayer.pause();
      }
      return result;
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
        var thisBuffer = this;
        this.mediaPlayer = null;
        
        // TODO: update navigator.getUserMedia to navigator.mediaDevices.getUserMedia (with promises)
        // when supported in Chrome/Chromium
        // (in v. 49 this is supported only when "experimental web extensions" flag is enabled)
        // See: https://developer.mozilla.org/en-US/docs/Web/API/Navigator/getUserMedia

        navigator.getUserMedia(
            {audio: true},
            function (stream) {
              thisBuffer.mediaRecorder = new MediaRecorder(stream);
              thisBuffer.mediaRecorder.ondataavailable = function (e) {
                thisBuffer.chunks.push(e.data);
              };
              thisBuffer.mediaRecorder.onerror = function (e) {
                console.log('Error recording audio: ' + e);
                thisBuffer.mediaRecorder = null;
              };
              thisBuffer.mediaRecorder.onstart = function (e) {
                console.log('Recording audio started. Current status: ' + thisBuffer.mediaRecorder.state);
              };
              thisBuffer.mediaRecorder.onstop = function () {
                console.log('Recording audio stopped. Current status: ' + thisBuffer.mediaRecorder.state);

                if (thisBuffer.timeoutID) {
                  window.clearTimeout(thisBuffer.timeoutID);
                  thisBuffer.timeoutID = null;
                }

                var options = {};
                if (thisBuffer.chunks.length > 0 && thisBuffer.chunks[0].type)
                  options.type = thisBuffer.chunks[0].type;
                var blob = new Blob(thisBuffer.chunks, options);
                thisBuffer.chunks = [];
                thisBuffer.mediaPlayer = document.createElement('audio');
                var url = URL.createObjectURL(blob);
                thisBuffer.mediaPlayer.src = url;
                thisBuffer.mediaPlayer.pause();
                thisBuffer.mediaRecorder = null;
              };
              thisBuffer.mediaRecorder.onwarning = function (e) {
                console.log('Warning recording audio: ' + e);
              };

              thisBuffer.mediaRecorder.start();
              thisBuffer.timeoutID = window.setTimeout(function () {
                if (thisBuffer.mediaRecorder)
                  thisBuffer.mediaRecorder.stop();
              }, thisBuffer.seconds * 1000);

            },
            function (error) {
              console.log('Error recording audio: ' + error);
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