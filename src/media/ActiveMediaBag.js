//    File    : ActiveMediaBag.js  
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
  "./ActiveMediaPlayer",
  "../Utils"
], function (ActiveMediaPlayer, Utils) {

  //
  // This class stores a collection of realized [ActiveMediaPlayer](ActiveMediaPlayer.html)
  // objects, related to a [JClicProject](JClicProject.html) or [Activity](Activity.html)
  //
  var ActiveMediaBag = function () {
    this.players = [];
  };

  ActiveMediaBag.prototype = {
    constructor: ActiveMediaBag,
    // 
    // The collection of [ActiveMediaPlayer](ActiveMediaPlayer.html) objects
    // stored in this media bag
    players: [],
    //
    // Creates a new [ActiveMediaPlayer](ActiveMediaPlayer.html) linked to this media bag
    // mc ([MediaContent](MediaContent.html) - The content used by this player
    // mb ([MediaBag](MediaBag.html) - The project's MediaBag
    // ps (An object implementing the [PlayStation](http://projectestac.github.io/jclic/apidoc/edu/xtec/jclic/PlayStation.html)
    // interface, usually a [JClicPlayer](JClicPlayer.html)
    createActiveMediaPlayer: function (mc, mb, ps) {
      var amp = null;
      switch (mc.mediaType) {
        case 'RECORD_AUDIO':
          if (mc.length <= 0 || mc.length >= Utils.settings.MAX_RECORD_LENGTH)
            break;
        case 'PLAY_RECORDED_AUDIO':
          if (mc.recBuffer < 0 || mc.recBuffer >= 10)
            break;
        case 'PLAY_AUDIO':
        case 'PLAY_MIDI':
        case 'PLAY_VIDEO':
          amp = new ActiveMediaPlayer(mc, mb, ps);
          break;
      }
      if (amp !== null)
        this.players.push(amp);
      return amp;
    },
    //
    // Looks for an already existing [ActiveMediaPlayer](ActiveMediaPlayer.html)
    // being equivalent to the requested.
    // If not found, creates a new one and returns it.
    getActiveMediaPlayer: function (mc, mb, ps) {
      var amp = null;
      for (var i = 0; i < this.players.length; i++) {
        amp = this.players[i];
        if (amp.getMediaContent() === mc || amp.getMediaContent().isEquivalent(mc))
          break;
        amp = null;
      }
      if (amp === null)
        amp = this.createActiveMediaPlayer(mc, mb, ps);
      return amp;
    },
    //
    // Removes the [ActiveMediaPlayer](ActiveMediaPlayer.html) related to the
    // provided [MediaContent](MediaContent.html) from the list of players    
    removeActiveMediaPlayer: function (mc) {
      var amp = null;
      var i;
      for (i = 0; i < this.players.length; i++) {
        amp = this.players[i];
        if (amp.getMediaContent() === mc)
          break;
        amp = null;
      }
      if (amp !== null) {
        amp.clear();
        // removes the element pointed by 'i'
        this.players.splice(i, 1);
      }
    },
    //
    // Realizes all media elements stored in this bag
    realizeAll: function () {
      for (var i = 0; i < this.players.length; i++)
        this.players[i].realize();
    },
    stopAll: function (level) {
      if (typeof (level) === 'undefined')
        level = -1;
      for (var i = 0; i < this.players.length; i++) {
        var amp = this.players[i];
        if (level === -1 || amp.getMediaContent().level <= level)
          amp.stop();
      }
    },
    removeAll: function () {
      for (var i = 0; i < this.players.length; i++)
        this.players[i].clear();
      // Empty the `players` array
      this.players.length = 0;
      ActiveMediaPlayer.clearAllAudioBuffers();
    }
  };

  return ActiveMediaBag;

});
