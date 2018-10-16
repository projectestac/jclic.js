/**
 *  File    : media/MidiAudioPlayer.js
 *  Created : 11/10/2018
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
 *  (c) 2000-2018 Catalan Educational Telematic Network (XTEC)
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

/* global define, AudioContext */

define([
  "midi-player-js",
  "soundfont-player",
  "../Utils"
], function (MidiPlayer, Soundfont, Utils) {

  // TODO: Read and use "Note off" messages
  // TODO: Use multiple instruments, at least one for each track
  // TODO: Use multiple midi channels (currently flattened to a single channel)
  // TODO: Use of channel 10 for percussion instruments
  // TODO: Read tempo and control messages
  // TODO: ... build a real MIDI player!!

  /**
   * A simple MIDI player based on MidiPlayerJS
   * https://github.com/grimmdude/MidiPlayerJS
   * See also: http://www.midijs.net (https://github.com/babelsberg/babelsberg-js/tree/master/midijs)
   * @exports MidiAudioPlayer
   * @class
   */
  class MidiAudioPlayer {
    /**
     * MidiAudioPlayer constructor
     * @param {ArrayBuffer} data - The MIDI file content, in ArrayBuffer format
     */
    constructor(data) {
      // Build instrument on first call to constructor
      MidiAudioPlayer.prepareInstrument()
      this.data = data
      this.player = new MidiPlayer.Player(ev => this.playEvent(ev))
      this.player.loadArrayBuffer(data)
    }

    /**
     * Initializes the soundfont instrument, loading data from GitHub
     * NOTE: This will not work when off-line!
     * TODO: Provided a basic, simple, static soundfont
     */
    static prepareInstrument() {
      if (MidiAudioPlayer.loadingInstrument === false) {
        MidiAudioPlayer.loadingInstrument = true;
        MidiAudioPlayer.audioContext = new AudioContext()
        window.Soundfont.instrument(MidiAudioPlayer.audioContext, MidiAudioPlayer.SOUNDFONT_BASE)
          .then(instrument => {
            Utils.log('info', 'MIDI soundfont instrument loaded')
            MidiAudioPlayer.instrument = instrument
          })
          .catch(err => {
            Utils.log('error', `Error loading soundfont base instrument: ${err}`)
          })
      }
    }

    /**
     * Pauses the player
     */
    pause() {
      this.player.pause()
      this.startedNotes = []
    }

    /**
     * Starts or resumes playing
     */
    play() {
      this.startedNotes = []
      this.player.play()
    }

    /**
     * Gets the ' paused'  state of the current player
     * @returns boolean
     */
    get paused() {
      return !this.player.isPlaying()
    }

    /**
     * Checks if the current player has ended or is already playing
     * @returns boolean
     */
    get ended() {
      return this.player.getSongTimeRemaining() <= 0
    }

    /**
     * Gets the current time
     * @returns number
     */
    get currentTime() {
      return this.player.getSongTime() * 1000
    }

    /**
     * Sets the current time of this player (in milliseconds)
     * @param {number} time - The time position where the player pointer must be placed
     */
    set currentTime(time) {
      this.player.skipToSeconds(time / 1000)
    }

    /**
     * Plays a MIDI event
     * @param {object} ev - The event data. See http://grimmdude.com/MidiPlayerJS/docs/index.html for details
     */
    playEvent(ev) {
      if (MidiAudioPlayer.instrument) {
        // Check for specific interval
        if (this.playTo > 0 && this.currentTime >= this.playTo)
          this.pause()
        // Set main volume
        else if (ev.name === 'Controller Change' && ev.number === 7)
          this.mainVolume = ev.value / 127;
        // Process 'Note on' messages. Max gain set to 2.0 for better results with the used soundfont
        else if (ev.name === 'Note on' && ev.velocity > 0)
          this.startedNotes[ev.noteNumber] = MidiAudioPlayer.instrument.play(ev.noteName, MidiAudioPlayer.audioContext.currentTime, { gain: 2 * (this.mainVolume * ev.velocity / 100) })
        // Process 'Note off' messages
        else if (ev.name === 'Note off' && ev.noteNumber && this.startedNotes[ev.noteNumber]) {
          this.startedNotes[ev.noteNumber].stop()
          delete (this.startedNotes[ev.noteNumber])
        }
      }
    }
  }

  Object.assign(MidiAudioPlayer.prototype, {
    /**
     * The MIDI file data used by this MIDI player
     * @name MidiAudioPlayer#data
     * @type {ArrayBuffer} */
    data: null,
    /**
     * The grimmdude's MidiPlayer used by this player
     * @name MidiAudioPlayer#player
     * @type {MidiPlayer.Player} */
    player: null,
    /**
     * When >0, time position at which the music must end
     * @name MidiAudioPlayer#playTo
     * @type {number} */
    playTo: 0,
    /**
     * Main volume of this track (set with a MIDI message of type `Controller Change` #7)
     * @name MidiAudioPlayer#mainVolume
     * @type {number} */
    mainVolume: 1.0,
    /**
     * This array is used when processing 'Note off' events to stop notes that are currently playing.
     * It contains a collection of 'instrument.play' instances, one for each active note
     * @name MidiAudioPlayer#startedNotes
     * @type {function[]} */
    startedNotes: [],
  })

  /**
   * The {@link AudioContext} used by this MIDI player.
   * @type {AudioContext}
   */
  MidiAudioPlayer.audioContext = null;

  /**
   * The "Instrument" object used by this MIDI player.
   * See: https://github.com/danigb/soundfont-player
   * @type {Instrument}
   */
  MidiAudioPlayer.instrument = null

  /**
   * A flag used to avoid re-entrant calls to {@link MidiAudioPlayer.prepareInstrument}
   * @type {boolean}
   */
  MidiAudioPlayer.loadingInstrument = false

  /**
   * The type of soundfont used by this MIDI player
   * See: https://github.com/danigb/soundfont-player
   * @type {string}
   */
  //MidiAudioPlayer.SOUNDFONT_BASE = 'https://raw.githubusercontent.com/gleitz/midi-js-soundfonts/gh-pages/FluidR3_GM/acoustic_grand_piano-mp3.js'
  MidiAudioPlayer.SOUNDFONT_BASE = 'acoustic_grand_piano'

  return MidiAudioPlayer
})
