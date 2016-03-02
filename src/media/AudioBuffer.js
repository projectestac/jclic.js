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
    mediaRecorder: null,
    chunks: null,
    mediaPlayer: null,
    timeoutFunc: null,
    play: function () {
      this.stop();
      if (this.mediaPlayer) {
        this.mediaPlayer.currentTime = 0;
        this.mediaPlayer.play();
      }
    },
    stop: function () {
      if (this.mediaRecorder && this.mediaRecorder.state === 'recording') {
        this.mediaRecorder.stop();
      } else if (this.mediaPlayer) {
        this.mediaPlayer.pause();
      }
    },
    record: function () {

      if (this.mediaRecorder && this.mediaRecorder.state === 'recording') {
        this.mediaRecorder.stop();
      } else {

        this.stop();
        var thisBuffer = this;
        this.mediaPlayer = null;

        navigator.getUserMedia({audio: true},
            function (stream) {
              thisBuffer.mediaRecorder = new MediaRecorder(stream);
              thisBuffer.mediaRecorder.ondataavailable = function (e) {
                console.log('recording data available!');
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

                if (thisBuffer.timeoutFunc) {
                  window.clearTimeout(thisBuffer.timeoutFunc);
                  thisBuffer.timeoutFunc = null;
                }

                var options = {};
                if (thisBuffer.chunks.length > 0 && thisBuffer.chunks[0].type)
                  options.type = thisBuffer.chunks[0].type;
                var blob = new Blob(thisBuffer.chunks, options);
                thisBuffer.chunks = [];
                thisBuffer.mediaPlayer = document.createElement('audio');
                thisBuffer.mediaPlayer.src = URL.createObjectURL(blob);
                thisBuffer.mediaPlayer.pause();
                thisBuffer.mediaRecorder = null;
              };
              thisBuffer.mediaRecorder.onwarning = function (e) {
                console.log('Warning recording audio: ' + e);
              };
              thisBuffer.mediaRecorder.start();
              thisBuffer.timeoutFunc = window.setTimeout(function () {
                if (thisBuffer.mediaRecorder)
                  thisBuffer.mediaRecorder.stop();
              }, thisBuffer.seconds * 1000);

            },
            function (error) {
              console.log('Error recording audio: ' + error);
            });
      }
    },
    clear: function () {
      this.stop();
      this.mediaPlayer = null;
    }
  };

  return AudioBuffer;
});