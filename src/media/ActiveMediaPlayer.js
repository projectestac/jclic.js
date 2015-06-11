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
      case 'PLAY_AUDIO':
      case 'PLAY_VIDEO':
        var fn = mc.mediaFileName;
        //if (mc.from > 0 || mc.to > 0) {
          // TODO: Check media ranges. Currently not running always as expected.
        //  fn = fn + '#t=' + (mc.from > 0 ? mc.from / 1000 : 0) + ',' + (mc.to > 0 ? mc.to / 1000 : 9999);
        //}
        this.mbe = mb.getElementByFileName(fn, true);
        break;
      case 'PLAY_MIDI':
        // TODO: Implement MIDI playing
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
    // The [MediaBagElement] containing the reference to the data to be played
    mbe: null,
    // 
    // Creates a new AudioBuffer
    createAudioBuffer: function (seconds) {
      //TODO: Implement AudioBuffer      
    },
    //
    // Generates the real objects capable of playing media
    realize: function () {
      if (this.mbe) {
        this.mbe.build(function () {
          this.data.trigger('pause');
        });
      }
    },
    //
    // Realizes and plays the media
    // setBx ([ActiveBox](ActiveBox.html) - The active box where this media
    // will be placed    
    // TODO: Check error setting currentTime on Audio objects
    playNow: function (setBx) {
      if (this.mbe) {
        //if (this.mbe.data)
        //  this.mbe.data.trigger('pause');
        var thisMP = this;
        console.log(this.mbe.name + ' from: ' + this.mc.from + ' to:' + this.mc.to);
        this.mbe.build(function () {
          // `this` points here to the [MediaBagElement](MediaBagElement)
          
          var armed = false;
          var playing = false;
          
          // Clear previous event handlers and prepare the media to start playing when seeked
          this.data.off(); //.on('seeked', function () {
            // `this` points here to the HTML audio element
          //  console.log('seeked event fired! - armed: ' + armed + ' currentTime: ' + this.currentTime + ' readyState: ' + this.readyState);
          //  console.log('seeking: ' + this.seeking);
          //  if(armed && this.readyState === 4){
              //$(this).off('seeked');              
          //    if(!playing){
          //      playing = true;
          //      this.play();
          //    }
          //  }
          //});
          // 
          // If there is a time fragment specified, prepare to stop when the `to` position is reached
          if (thisMP.mc.to > 0) {
            this.data.on('timeupdate', function () {
              console.log('timeupdate event fired: ' + this.currentTime + ' armed: ' + armed);
              // `this` points here to the HTML audio element
              if (armed && this.currentTime >= thisMP.mc.to/1000) {
                $(this).off('timeupdate');
                this.pause();
              }
            });
          }
          //
          // Seek the media position. This will launch the `seeked` event
          var t = thisMP.mc.from > 0 ? thisMP.mc.from / 1000 : 0;
          console.log('readyState: ' + this.data.prop('readyState'));
          // CAN_PLAY_THROUGH is always 4 ?
          if (this.data[0].readyState >= 4) {
            console.log('seeking to ' + t);
            armed = true;
            this.data[0].pause();
            this.data[0].currentTime = t;
            this.data[0].play();
            //this.data[0].fastSeek(t);
            console.log('readyState after seeking: ' + this.data[0].readyState);            
            //this.data.prop('currentTime', t);
          }
          else{
            this.data[0].load();
            this.data.on('canplaythrough', function () {
              $(this).off('canplaythrough');
              console.log('readyState: ' + this.readyState);
              console.log('seeking to ' + t);
              armed = true;
              this.pause();
              this.currentTime = t;
              this.play();
              //this.fastSeek(t);
              console.log('readyState after seeking: ' + this.readyState);            
            });
          }
        });
      }
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
      //else if(this.mbe && this.mbe.data)
      //  this.mbe.data.trigger('pause');
    },
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
