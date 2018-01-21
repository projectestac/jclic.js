/**
 *  File    : media/MediaContent.js
 *  Created : 13/04/2015
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

/* global define */

define([
  "jquery",
  "../AWT",
  "../Utils"
], function ($, AWT, Utils) {

  /**
   * This object contains a description of any multimedia content (sound, video, MIDI, voice
   * recording..) or special actions (jump to another point in the sequence, link to an URL, etc.)
   * associated to an {@link ActiveBox} object.
   * @exports MediaContent
   * @class
   */
  class MediaContent {
    /**
     * MediaContent constructor
     * @param {string} type - The type of media. Valid values are: `UNKNOWN`, `PLAY_AUDIO`, `PLAY_VIDEO`,
     * `PLAY_MIDI`, `PLAY_CDAUDIO`, `RECORD_AUDIO`, `PLAY_RECORDED_AUDIO`, `RUN_CLIC_ACTIVITY`,
     * `RUN_CLIC_PACKAGE`, `RUN_EXTERNAL`, `URL`, `EXIT` and `RETURN`
     * @param {string=} mediaFileName - Optional parameter indicating the media file name
     */
    constructor(type, mediaFileName) {
      this.mediaType = type
      if (mediaFileName)
        this.mediaFileName = mediaFileName
    }

    /**
     * Loads the MediaContent settings from a specific JQuery XML element
     * @param {external:jQuery} $xml
     */
    setProperties($xml) {
      $.each($xml.get(0).attributes, (name, val) => {
        switch (name) {
          case 'type':
            this['mediaType'] = val
            break
          case 'file':
            this['mediaFileName'] = Utils.nSlash(val)
            break
          case 'params':
            this['externalParam'] = Utils.nSlash(val)
            break

          case 'pFrom':
            this['absLocationFrom'] = val
            break

          case 'buffer':
            this['recBuffer'] = Number(val)
            break
          case 'level':
          case 'from':
          case 'to':
          case 'length':
            this[name] = Number(val)
            break

          case 'px':
          case 'py':
            if (this.absLocation === null)
              this.absLocation = new AWT.Point(0, 0)
            if (name === 'px')
              this.absLocation.x = Number(val)
            else
              this.absLocation.y = Number(val)
            break

          case 'stretch':
          case 'free':
          case 'catchMouseEvents':
          case 'loop':
          case 'autostart':
            this[name] = Utils.getBoolean(val)
            break
        }
      })
      return this
    }

    /**
     * Compares this object with another MediaContent.
     * @param {MediaContent} mc - The Media Content to compare against to.
     * @returns {boolean} - `true` when both objects are equivalent.
     */
    isEquivalent(mc) {
      return this.mediaType === mc.mediaType &&
        (this.mediaFileName === mc.mediaFileName ||
          this.mediaFileName !== null && mc.mediaFileName !== null &&
          this.mediaFileName.toLocaleLowerCase() === mc.mediaFileName.toLocaleLowerCase()) &&
        this.from === mc.from &&
        this.to === mc.to &&
        this.recBuffer === mc.recBuffer
    }

    /**
     * Gets a string representing this media content, useful for checking if two different elements
     * are equivalent.
     * @returns {string}
     */
    getDescription() {
      let result = `${this.mediaType}`
      if (this.mediaFileName)
        result = `${result} ${this.mediaFileName}${this.from >= 0 ? ` from:${this.from}` : ''}${this.to >= 0 ? ` to:${this.to}` : ''}`
      else if (this.externalParam)
        result = `${result} ${this.externalParam}`
      return result
    }

    /**
     * Returns a simplified description of this media content. Useful for accessibility methods.
     * @returns {string} 
     */
    toString() {
      return `${this.mediaType}${this.mediaFileName ? ` ${this.mediaFileName}` : ''}`
    }

    /**
     * Returns an image to be used as icon for representing this media content.
     * @returns {external:HTMLImageElement}
     */
    getIcon() {
      let icon = null
      switch (this.mediaType) {
        case 'PLAY_AUDIO':
        case 'PLAY_RECORDED_AUDIO':
          icon = 'audio'
          break
        case 'RECORD_AUDIO':
          icon = 'mic'
          break
        case 'PLAY_VIDEO':
          icon = 'movie'
          break
        case 'PLAY_MIDI':
          icon = 'music'
          break
        case 'URL':
          icon = 'url'
          break
        default:
          icon = 'default'
          break
      }
      return icon ? MediaContent.icoImg[icon] : null
    }
  }

  Object.assign(MediaContent.prototype, {
    /**
     * The type of media. Valid values are: `UNKNOWN`, `PLAY_AUDIO`, `PLAY_VIDEO`,
     * `PLAY_MIDI`, `PLAY_CDAUDIO`, `RECORD_AUDIO`, `PLAY_RECORDED_AUDIO`, `RUN_CLIC_ACTIVITY`,
     * `RUN_CLIC_PACKAGE`, `RUN_EXTERNAL`, `URL`, `EXIT` and `RETURN`
     * @type {string} */
    mediaType: 'UNKNOWN',
    /**
     * The priority level is important when different medias want to play together. Objects with
     * highest priority level can mute lower ones.
     * @type {number} */
    level: 1,
    /**
     * Media file name
     * @type {String} */
    mediaFileName: null,
    /**
     * Optional parameters passed to external calls
     * @type {string} */
    externalParam: null,
    /**
     * Special setting used to play only a fragment of media. `-1` means not used (plays full
     * length, from the beginning)
     * @type {number} */
    from: -1,
    /**
     * Special setting used to play only a fragment of media. `-1` means not used (plays to the end
     * of the media)
     * @type {number} */
    to: -1,
    /**
     * When `mediaType` is `RECORD_AUDIO`, this member stores the maximum length of the recorded
     * sound, in seconds.
     * @type {number} */
    length: 3,
    /**
     * When `mediaType` is `RECORD_AUDIO`, this member stores the buffer ID where the recording
     * will be stored.
     * @type {number} */
    recBuffer: 0,
    /**
     * Whether to stretch or not the video size to fit the cell space.
     * @type {boolean} */
    stretch: false,
    /**
     * When `true`, the video plays out of the cell, centered on the activity window.
     * @type {boolean} */
    free: false,
    /**
     * Places the video window at a specific location.
     * @type {AWT.Point} */
    absLocation: null,
    /**
     * When {@link MediaContent#absLocation} is not `null`, this field indicates from where to
     * measure its coordinates. Valid values are: `BOX`, `WINDOW` or `FRAME`.
     * @type {string} */
    absLocationFrom: null,
    /**
     * `true` when the video window must catch mouse clicks.
     * @type {boolean} */
    catchMouseEvents: false,
    /**
     * Whether to repeat the media in loop, or just one time.
     * @type {boolean} */
    loop: false,
    /**
     * When `true`, the media will automatically start playing when the associated {@link ActiveBox}
     * become active.
     * @type {boolean} */
    autoStart: false,
  })

  /**
   * Default icons for media types.
   * @type {object} */
  MediaContent.icoData = {
    default: 'data:image/svg+xml;base64,' +
      'PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIGhlaWdodD0iNDgiIHZp' +
      'ZXdCb3g9IjAgMCA0OCA0OCIgd2lkdGg9IjQ4IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAw' +
      'MC9zdmciPjxwYXRoIGQ9Ik0yOC44IDEyTDI4IDhIMTB2MzRoNFYyOGgxMS4ybC44IDRoMTRWMTJ6' +
      'Ij48L3BhdGg+PC9zdmc+Cg==',
    audio: 'data:image/svg+xml;base64,' +
      'PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIGZpbGw9IiMwMDAwMDAi' +
      'IGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjQ4IiB4bWxucz0iaHR0cDov' +
      'L3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0zIDl2Nmg0bDUgNVY0TDcgOUgzem0xMy41' +
      'IDNjMC0xLjc3LTEuMDItMy4yOS0yLjUtNC4wM3Y4LjA1YzEuNDgtLjczIDIuNS0yLjI1IDIuNS00' +
      'LjAyek0xNCAzLjIzdjIuMDZjMi44OS44NiA1IDMuNTQgNSA2Ljcxcy0yLjExIDUuODUtNSA2Ljcx' +
      'djIuMDZjNC4wMS0uOTEgNy00LjQ5IDctOC43N3MtMi45OS03Ljg2LTctOC43N3oiPjwvcGF0aD48' +
      'cGF0aCBkPSJNMCAwaDI0djI0SDB6IiBmaWxsPSJub25lIj48L3BhdGg+PC9zdmc+Cg==',
    movie: 'data:image/svg+xml;base64,' +
      'PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIGZpbGw9IiMwMDAwMDAi' +
      'IGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjQ4IiB4bWxucz0iaHR0cDov' +
      'L3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0xOCA0bDIgNGgtM2wtMi00aC0ybDIgNGgt' +
      'M2wtMi00SDhsMiA0SDdMNSA0SDRjLTEuMSAwLTEuOTkuOS0xLjk5IDJMMiAxOGMwIDEuMS45IDIg' +
      'MiAyaDE2YzEuMSAwIDItLjkgMi0yVjRoLTR6Ij48L3BhdGg+PHBhdGggZD0iTTAgMGgyNHYyNEgw' +
      'eiIgZmlsbD0ibm9uZSI+PC9wYXRoPjwvc3ZnPgo=',
    mic: 'data:image/svg+xml;base64,' +
      'PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIGZpbGw9IiMwMDAwMDAi' +
      'IGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjQ4IiB4bWxucz0iaHR0cDov' +
      'L3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0xMiAxNGMxLjY2IDAgMi45OS0xLjM0IDIu' +
      'OTktM0wxNSA1YzAtMS42Ni0xLjM0LTMtMy0zUzkgMy4zNCA5IDV2NmMwIDEuNjYgMS4zNCAzIDMg' +
      'M3ptNS4zLTNjMCAzLTIuNTQgNS4xLTUuMyA1LjFTNi43IDE0IDYuNyAxMUg1YzAgMy40MSAyLjcy' +
      'IDYuMjMgNiA2LjcyVjIxaDJ2LTMuMjhjMy4yOC0uNDggNi0zLjMgNi02LjcyaC0xLjd6Ij48L3Bh' +
      'dGg+PHBhdGggZD0iTTAgMGgyNHYyNEgweiIgZmlsbD0ibm9uZSI+PC9wYXRoPjwvc3ZnPgo=',
    music: 'data:image/svg+xml;base64,' +
      'PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIGZpbGw9IiMwMDAwMDAi' +
      'IGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjQ4IiB4bWxucz0iaHR0cDov' +
      'L3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUi' +
      'PjwvcGF0aD48cGF0aCBkPSJNMTIgM3YxMC41NWMtLjU5LS4zNC0xLjI3LS41NS0yLS41NS0yLjIx' +
      'IDAtNCAxLjc5LTQgNHMxLjc5IDQgNCA0IDQtMS43OSA0LTRWN2g0VjNoLTZ6Ij48L3BhdGg+PC9z' +
      'dmc+Cg==',
    url: 'data:image/svg+xml;base64,' +
      'PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIGZpbGw9IiMwMDAwMDAi' +
      'IGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjQ4IiB4bWxucz0iaHR0cDov' +
      'L3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUi' +
      'PjwvcGF0aD48cGF0aCBkPSJNMTIgMkM2LjQ4IDIgMiA2LjQ4IDIgMTJzNC40OCAxMCAxMCAxMCAx' +
      'MC00LjQ4IDEwLTEwUzE3LjUyIDIgMTIgMnptLTEgMTcuOTNjLTMuOTUtLjQ5LTctMy44NS03LTcu' +
      'OTMgMC0uNjIuMDgtMS4yMS4yMS0xLjc5TDkgMTV2MWMwIDEuMS45IDIgMiAydjEuOTN6bTYuOS0y' +
      'LjU0Yy0uMjYtLjgxLTEtMS4zOS0xLjktMS4zOWgtMXYtM2MwLS41NS0uNDUtMS0xLTFIOHYtMmgy' +
      'Yy41NSAwIDEtLjQ1IDEtMVY3aDJjMS4xIDAgMi0uOSAyLTJ2LS40MWMyLjkzIDEuMTkgNSA0LjA2' +
      'IDUgNy40MSAwIDIuMDgtLjggMy45Ny0yLjEgNS4zOXoiPjwvcGF0aD48L3N2Zz4K'
  }

  /**
   * Collection of icon {@link external:HTMLImageElement} objects
   * @type {object} */
  MediaContent.icoImg = {}

  // Load the icons
  $.each(MediaContent.icoData, (key, value) => {
    const img = new Image()
    img.src = value
    MediaContent.icoImg[key] = img
  })

  return MediaContent
})
