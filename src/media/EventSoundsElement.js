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

define([
  "../Utils", 
  "./ActiveMediaPlayer", 
  "./MediaContent"
], function (Utils, ActiveMediaPlayer, MediaContent) {
  /**
   * The EventSoundsElement object contains the description of a specific sound to be played when
   * one of the JClic events are fired.<br>
   * For a full list of the JClic events see: {@link EventSounds}
   * @exports EventSoundsElement
   * @class
   * @param {string} id - The identifier of this media sound
   * @param {string=} fileName - An optional file name or URL containing the sound data
   */
  var EventSoundsElement = function (id, fileName) {
    this.id = id;
    if(fileName){
      if(fileName.indexOf('data:')===0){
        this.audio = new Audio(fileName);        
      }
      else
        this.fileName = fileName;
    }
  };

  EventSoundsElement.prototype = {
    constructor: EventSoundsElement,
    /**
     * The sound file used by this element
     * @type {string} */
    fileName: null,
    /**
     * Whether the sound for this event is enabled or not
     * @type {boolean} */
    enabled: Utils.DEFAULT,
    /**
     * Media player used to play this sound
     * @type {ActiveMediaPlayer} */
    player: null,
    /**
     * HTMLAudioElement used to play this sound
     * @type {HTMLAudioElement} */    
    audio: null,
    /**
     * Reads the properties of this object from an XML element
     * @param {external:jQuery} $xml - The XML element to be parsed
     */
    setProperties: function ($xml) {
      this.fileName = $xml.attr('file');
      this.enabled = Utils.getTriState($xml.attr('enabled'));
      return this;
    },
    /**
     * 
     * Instantiates this audio object
     * @param {PlayStation} ps
     * @param {MediaBag} mediaBag
     */    
    realize: function(ps, mediaBag){
      if(!this.audio && this.player === null && this.fileName!==null){
        this.player = new ActiveMediaPlayer(new MediaContent('PLAY_AUDIO', this.fileName), mediaBag, ps);      
        this.player.realize();
      }
    },
    /**
     * Plays the audioo associated to this event
     */
    play: function(){
      if(this.audio){
        this.audio.currentTime=0;
        this.audio.play();
      }
      else if(this.player)
        this.player.play();
    },
    /**
     * Stops playing the audio associated to this event
     */
    stop: function(){
      if(this.audio)
        this.audio.pause();
      else if(this.player)
        this.player.stop();
    }
  };
  return EventSoundsElement;
});