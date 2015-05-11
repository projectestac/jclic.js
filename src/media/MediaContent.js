//    File    : MediaContent.js  
//    Created : 13/04/2015  
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
  "../AWT",
  "../Utils"
], function ($, AWT, Utils) {

//
// This object encapsulates a description of any multimedia content (sound,
// video, MIDI, voice recording..) or special actions (jump to another point in
// the sequence, link to an URL, etc.) associated to an [ActiveBox](ActiveBox.html)
// object.
//
  var MediaContent = function (type) {
    this.mediaType = type;
  };

  MediaContent.prototype = {
    constructor: MediaContent,
    // 
    // Valid `mediaType` values are: `UNKNOWN`, `PLAY_AUDIO`, `PLAY_VIDEO`, 
    // `PLAY_MIDI`, `PLAY_CDAUDIO`, `RECORD_AUDIO`, `PLAY_RECORDED_AUDIO`,
    // `RUN_CLIC_ACTIVITY`, `RUN_CLIC_PACKAGE`, `RUN_EXTERNAL`, `URL`, `EXIT`
    // and `RETURN`
    mediaType: 'UNKNOWN',
    //
    // Priority level, used when different medias want to play together. Higest
    // level objects silent lowest ones.
    level: 1,
    // 
    // Media file
    mediaFileName: null,
    //
    // Optional params passed to external calls
    externalParam: null,
    //
    // Special settings used to play only a fragment of media. `-1` means
    // not used (plays full length, from the beggining)
    from: -1,
    to: -1,
    //
    // When `mediaType` is `RECORD_AUDIO`, maximum time to record sound (in seconds),
    // and buffer ID where the recording must be stored
    length: 3,
    recBuffer: 0,
    // 
    // Stretch video size to fit cell space
    stretch: false,
    //
    // Play the video out of the cell, centered on the activity window
    free: false,
    //
    // Place the video window at specific location:
    // Location Point:
    absLocation: null,
    // Point measured from `BOX`, `WINDOW` or `FRAME`
    absLocationFrom: null,
    // Video window must catch mouse clicks
    catchMouseEvents: false,
    // 
    // Plays media in loop
    loop: false,
    //
    // Media automatically starts when its [ActiveBox](ActiveBox.html) becomes
    // active.
    autoStart: false,
    //
    // Loads the object settings from a specific JQuery XML element 
    setProperties: function ($xml) {
      var media = this;
      $.each($xml.get(0).attributes, function () {
        var name = this.name;
        var val = this.value;
        switch (name) {
          case 'type':
            media['mediaType'] = val;
            break;
          case 'file':
            media['mediaFileName'] = val;
            break;
          case 'params':
            media['externalParam'] = val;
            break;

          case 'pFrom':
            media['absLocationFrom'] = val;
            break;

          case 'buffer':
            media ['recBuffer'] = Number(val);
            break;
          case 'level':
          case 'from':
          case 'to':
          case 'length':
            media [name] = Number(val);
            break;

          case 'px':
          case 'py':
            if (media.absLocation === null)
              media.absLocation = new AWT.Point(0, 0);
            if (name === 'px')
              media.absLocation.x = Number(val);
            else
              media.absLocation.y = Number(val);
            break;

          case 'stretch':
          case 'free':
          case 'catchMouseEvents':
          case 'loop':
          case 'autostart':
            media[name] = Utils.getBoolean(val);
            break;
        }
      });
      return this;
    },
    //
    // Compare with another `MediaContent`
    isEquivalent: function (mc) {
      return this.mediaType === mc.mediaType &&
          this.mediaFileName.toLocaleLowerCase() === mc.mediaFileName.toLocaleLowerCase() &&
          this.from === mc.from &&
          this.to === mc.to &&
          this.recBuffer === mc.recBuffer;
    }
  };

  return MediaContent;
});
