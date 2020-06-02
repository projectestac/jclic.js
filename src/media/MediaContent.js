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
 *  @license EUPL-1.2
 *  @licstart
 *  (c) 2000-2020 Educational Telematic Network of Catalonia (XTEC)
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
 *  @module
 */

/* global Image */

import $ from 'jquery';
import AWT from '../AWT';
import Utils from '../Utils';

/**
 * This object contains a description of any multimedia content (sound, video, MIDI, voice
 * recording..) or special actions (jump to another point in the sequence, link to an URL, etc.)
 * associated to an {@link ActiveBox} object.
 * @exports MediaContent
 * @class
 */
export class MediaContent {
  /**
   * MediaContent constructor
   * @param {string} type - The type of media. Valid values are: `UNKNOWN`, `PLAY_AUDIO`, `PLAY_VIDEO`,
   * `PLAY_MIDI`, `PLAY_CDAUDIO`, `RECORD_AUDIO`, `PLAY_RECORDED_AUDIO`, `RUN_CLIC_ACTIVITY`,
   * `RUN_CLIC_PACKAGE`, `RUN_EXTERNAL`, `URL`, `EXIT` and `RETURN`
   * @param {string} [file] - Optional parameter indicating the media file name
   */
  constructor(type, file) {
    this.type = type;
    if (file)
      this.file = file;
  }

  /**
   * Loads the MediaContent settings from a specific JQuery XML element
   * @param {external:jQuery} $xml
   */
  setProperties($xml) {
    Utils.attrForEach($xml.get(0).attributes, (name, val) => {
      switch (name) {
        case 'type':
          this.type = val;
          break;
        case 'file':
          this.file = Utils.nSlash(val);
          break;
        case 'params':
          this.externalParam = Utils.nSlash(val);
          break;

        case 'pFrom':
          this.absLocationFrom = val;
          break;

        case 'buffer':
          this.recBuffer = Number(val);
          break;
        case 'level':
        case 'from':
        case 'to':
        case 'length':
          this[name] = Number(val);
          break;

        case 'px':
        case 'py':
          if (this.absLocation === null)
            this.absLocation = new AWT.Point(0, 0);
          if (name === 'px')
            this.absLocation.x = Number(val);
          else
            this.absLocation.y = Number(val);
          break;

        case 'stretch':
        case 'free':
        case 'catchMouseEvents':
        case 'loop':
        case 'autostart':
          this[name] = Utils.getBoolean(val);
          break;
      }
    });
    return this;
  }

  /**
   * Gets a object with the basic attributes needed to rebuild this instance excluding functions,
   * parent references, constants and also attributes retaining the default value.
   * The resulting object is commonly usued to serialize elements in JSON format.
   * @returns {object} - The resulting object, with minimal attrributes
   */
  getAttributes() {
    return Utils.getAttr(this, [
      'type', 'file', 'externalParam',
      'absLocation', // -> AWT.Point
      'absLocationFrom', 'recBuffer',
      'level|1', 'from', 'to', 'length',
      'stretch', 'free', 'catchMouseEvents', 'loop', 'autostart'
    ]);
  }

  /**
   * Reads the properties of this MediaContent from a data object
   * @param {object} data - The data object to be parsed
   * @returns {MediaContent}
   */
  setAttributes(data) {
    return Utils.setAttr(this, data, [
      'type', 'file', 'externalParam',
      { key: 'absLocation', fn: AWT.Point },
      'absLocationFrom', 'recBuffer',
      'level', 'from', 'to', 'length',
      'stretch', 'free', 'catchMouseEvents', 'loop', 'autostart',
    ]);
  }

  /**
   * Compares this object with another MediaContent.
   * @param {MediaContent} mc - The Media Content to compare against to.
   * @returns {boolean} - `true` when both objects are equivalent.
   */
  isEquivalent(mc) {
    return this.type === mc.type &&
      (this.file === mc.file ||
        this.file !== null && mc.file !== null &&
        this.file.toLocaleLowerCase() === mc.file.toLocaleLowerCase()) &&
      this.from === mc.from &&
      this.to === mc.to &&
      this.recBuffer === mc.recBuffer;
  }

  /**
   * Gets a string representing this media content, useful for checking if two different elements
   * are equivalent.
   * @returns {string}
   */
  getDescription() {
    let result = `${this.type}`;
    if (this.file)
      result = `${result} ${this.file}${this.from >= 0 ? ` from:${this.from}` : ''}${this.to >= 0 ? ` to:${this.to}` : ''}`;
    else if (this.externalParam)
      result = `${result} ${this.externalParam}`;
    return result;
  }

  /**
   * Returns a simplified description of this media content. Useful for accessibility methods.
   * @returns {string} 
   */
  toString() {
    return `${this.type}${this.file ? ` ${this.file}` : ''}`;
  }

  /**
   * Returns an image to be used as icon for representing this media content.
   * @returns {external:HTMLImageElement}
   */
  getIcon() {
    let icon = null;
    switch (this.type) {
      case 'PLAY_AUDIO':
      case 'PLAY_RECORDED_AUDIO':
        icon = 'audio';
        break;
      case 'RECORD_AUDIO':
        icon = 'mic';
        break;
      case 'PLAY_VIDEO':
        icon = 'movie';
        break;
      case 'PLAY_MIDI':
        icon = 'music';
        break;
      case 'URL':
        icon = 'url';
        break;
      default:
        icon = 'default';
        break;
    }
    return icon ? MediaContent.ICONS[icon] : null;
  }
}

Object.assign(MediaContent.prototype, {
  /**
   * The type of media. Valid values are: `UNKNOWN`, `PLAY_AUDIO`, `PLAY_VIDEO`,
   * `PLAY_MIDI`, `PLAY_CDAUDIO`, `RECORD_AUDIO`, `PLAY_RECORDED_AUDIO`, `RUN_CLIC_ACTIVITY`,
   * `RUN_CLIC_PACKAGE`, `RUN_EXTERNAL`, `URL`, `EXIT` and `RETURN`
   * @name MediaContent#type
   * @type {string} */
  type: 'UNKNOWN',
  /**
   * The priority level is important when different medias want to play together. Objects with
   * highest priority level can mute lower ones.
   * @name MediaContent#level
   * @type {number} */
  level: 1,
  /**
   * Media file name
   * @name MediaContent#file
   * @type {String} */
  file: null,
  /**
   * Optional parameters passed to external calls
   * @name MediaContent#externalParams
   * @type {string} */
  externalParam: null,
  /**
   * Special setting used to play only a fragment of media. `-1` means not used (plays full
   * length, from the beginning)
   * @name MediaContent#from
   * @type {number} */
  from: -1,
  /**
   * Special setting used to play only a fragment of media. `-1` means not used (plays to the end
   * of the media)
   * @name MediaContent#to
   * @type {number} */
  to: -1,
  /**
   * When `type` is `RECORD_AUDIO`, this member stores the maximum length of the recorded
   * sound, in seconds.
   * @name MediaContent#length
   * @type {number} */
  length: 3,
  /**
   * When `type` is `RECORD_AUDIO`, this member stores the buffer ID where the recording
   * will be stored.
   * @name MediaContent#recBuffer
   * @type {number} */
  recBuffer: 0,
  /**
   * Whether to stretch or not the video size to fit the cell space.
   * @name MediaContent#stretch
   * @type {boolean} */
  stretch: false,
  /**
   * When `true`, the video plays out of the cell, centered on the activity window.
   * @name MediaContent#free
   * @type {boolean} */
  free: false,
  /**
   * Places the video window at a specific location.
   * @name MediaContent#absLocation
   * @type {AWT.Point} */
  absLocation: null,
  /**
   * When {@link MediaContent#absLocation} is not `null`, this field indicates from where to
   * measure its coordinates. Valid values are: `BOX`, `WINDOW` or `FRAME`.
   * @name MediaContent#absLocationFrom
   * @type {string} */
  absLocationFrom: null,
  /**
   * `true` when the video window must catch mouse clicks.
   * @name MediaContent#catchMouseEvents
   * @type {boolean} */
  catchMouseEvents: false,
  /**
   * Whether to repeat the media in loop, or just one time.
   * @name MediaContent#loop
   * @type {boolean} */
  loop: false,
  /**
   * When `true`, the media will automatically start playing when the associated {@link ActiveBox}
   * become active.
   * @name MediaContent#autoStart
   * @type {boolean} */
  autoStart: false,
});

/**
 * Default icons for media types.
 * @type {object} */
const ICONS = {
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
};

/**
 * Collection of icon {@link external:HTMLImageElement} objects
 * @name MediaContent.ICONS
 * @type {object} */
MediaContent.ICONS = {};

// Load the icons
$.each(ICONS, (key, value) => {
  const img = new Image();
  img.src = value;
  MediaContent.ICONS[key] = img;
});

export default MediaContent;
