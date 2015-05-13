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
  "../AWT"
], function (AWT) {

  //
  // This kind of object encapsulates a realized [MediaContent](MediaContent.html)
  // and provides methods to start, stop, pause and record different types of
  // media (audio, video, MIDI, voice recording...)
  // 
  // TODO: This is only a skeleton of the class. Must be implemented!
  // mc ([MediaContent](MediaContent.html) - The content used by this player
  // mb ([MediaBag](MediaBag.html) - The project's MediaBag
  // ps (An object implementing the [PlayStation](http://projectestac.github.io/jclic/apidoc/edu/xtec/jclic/PlayStation.html)
  // interface, usually a [JClicPlayer](JClicPlayer.html)
  var ActiveMediaPlayer = function (mc, mb, ps) {
    this.mc = mc;
    this.ps = ps;
    switch (mc.mediaType) {
      case 'RECORD_AUDIO':
        this.clearAudioBuffer(mc.recBuffer);
        ActiveMediaPlayer.prototype._audioBuffer[mc.recBuffer] = this.createAudioBuffer(mc.length);
      case 'PLAY_RECORDED_AUDIO':
        this.useAudioBuffer = true;
        break;
      default:
        break;
    }
  };

  ActiveMediaPlayer.prototype = {
    constructor: ActiveMediaPlayer,
    //
    // The AudioBuffer is common to all ActiveMediaPlayer instances, so
    // it's stored in the prototype
    _audioBuffer: [],
    //
    // The [MediaContent](MediaContent.html) associated to this player
    mc: null,
    //
    // The [JClicPlayer](JClicPlayer.html) this player belongs to
    ps: null,
    //
    // MediaPlayers should be linked to an [ActiveBox](ActiveBox.html)
    bx: null,
    //
    // The visual component, usually an `audio` or `video` DOM element
    visualComponent: null,
    //
    // Indicates that this player uses a recording audio buffer
    useAudioBuffer: false,
    //
    // Creates a new AudioBuffer
    createAudioBuffer: function (seconds) {
      //TODO: Implement AudioBuffer      
    },
    //
    // Generates the real objects capable of playing media
    realize: function () {
      // TODO: Implement realize
    },
    //
    // Realizes and plays the media
    // setBx ([ActiveBox](ActiveBox.html) - The active box where this media
    // will be placed    
    playNow: function (setBx) {
      // TODO: Implement it
    },
    //
    // Plays the media when available, without blocking the current thread
    play: function (setBx) {
      // TODO: invoke in a separate thread, not blocking the current one
      // _In Java was javax.swing.SwingUtilities.invokeLater(new Runnable(){})_
      this.stopAllAudioBuffers();
      this.playNow(setBx);
    },
    //
    // TODO: Implement and document the following methods:
    stop: function () {
      if (this.useAudioBuffer)
        this.stopAudioBuffer(this.mc.recBuffer);
    },
    clear: function () {
      this.stop();
      if (this.useAudioBuffer)
        this.clearAudioBuffer(this.mc.recBuffer);
    },
    setTimeRanges: function () {
    },
    clearAudioBuffer: function (buffer) {
      if (buffer >= 0 && buffer < ActiveMediaPlayer.prototype._audioBuffer.length && ActiveMediaPlayer.prototype._audioBuffer[buffer] !== null) {
        ActiveMediaPlayer.prototype._audioBuffer[buffer].clear();
        ActiveMediaPlayer.prototype._audioBuffer[buffer] = null;
      }
    },
    clearAllAudioBuffers: function () {
      for (var i = 0; i < ActiveMediaPlayer.prototype._audioBuffer.length; i++)
        this.clearAudioBuffer(i);
    },
    countActiveBuffers: function () {
      var c = 0;
      for (var i = 0; i < ActiveMediaPlayer.prototype._audioBuffer.length; i++)
        if (ActiveMediaPlayer.prototype._audioBuffer[i])
          c++;
      return c;
    },
    stopAllAudioBuffers: function () {
      for (var i = 0; i < ActiveMediaPlayer.prototype._audioBuffer.length; i++)
        if (ActiveMediaPlayer.prototype._audioBuffer[i])
          ActiveMediaPlayer.prototype._audioBuffer[i].stop();
    },
    stopAudioBuffer: function (buffer) {
      if (buffer >= 0 && buffer < ActiveMediaPlayer.prototype._audioBuffer.length && ActiveMediaPlayer.prototype._audioBuffer[buffer] !== null)
        ActiveMediaPlayer.prototype._audioBuffer[buffer].stop();
    },
    checkVisualComponentBounds: function (bxi) {
    },
    setVisualComponentVisible: function (state) {
    },
    getVisualComponent: function () {
    },
    attachVisualComponent: function () {
    },
    destroyVisualComponent: function () {
    },
    linkTo: function (setBx) {
    },
    getMediaContent: function () {
      return this.mc;
    }
  };

  return ActiveMediaPlayer;

});


