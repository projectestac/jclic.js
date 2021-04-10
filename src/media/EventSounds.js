/**
 *  File    : media/EventSounds.js
 *  Created : 01/04/2015
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

import $ from 'jquery';
import EventSoundsElement from './EventSoundsElement';
import { getTriState, getAttr, setAttr, DEFAULT } from '../Utils';

/**
 * The EventSounds objects contains specific sounds to be played when JClic events are fired:
 * - start
 * - click
 * - actionError
 * - actionOk
 * - finishedError
 * - finishedOk
 *
 * The sounds are stored in an array of {@link module:media/EventSoundsElement EventSoundsElement} objects.
 */
export class EventSounds {
  /**
   * EventSounds constructor
   * @param {module:media/EventSounds.EventSounds} [parent] - Another EventSounds object that will act as a parent of this one,
   * used to resolve which sound must be played for events when not defined here.
   */
  constructor(parent) {
    if (parent) {
      this.elements = Object.assign({}, this.elements, parent.elements);
      this.enabled = parent.enabled;
    }
  }

  /**
   * Reads the object properties from an XML element
   * @param {external:jQuery} $xml - The XML element to be parsed
   */
  setProperties($xml) {
    this.enabled = getTriState($xml.attr('enabled'), this.enabled);
    $xml.children().each((_n, child) => {
      const id = child.getAttribute('id');
      this.elements[id] = new EventSoundsElement(id);
      this.elements[id].setProperties($(child));
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
    return getAttr(this, [
      `enabled|${DEFAULT}`,
      'elements',
    ]);
  }

  /**
   * Reads the properties of this EventSounds from a data object
   * @param {object} data - The data object to be parsed
   * @returns {module:media/EventSounds.EventSounds}
   */
  setAttributes(data) {
    return setAttr(this, data, [
      'enabled',
      { key: 'elements', fn: EventSoundsElement, group: 'object' },
    ]);
  }

  /**
   * Instantiates the audio objects needed to play event sounds
   * @param {module:JClicPlayer.JClicPlayer} ps
   * @param {module:bags/MediaBag.MediaBag} mediaBag
   */
  realize(ps, mediaBag) {
    // Values are {EventSoundElement} objects
    $.each(this.elements, (key, value) => value.realize(ps, mediaBag));
  }

  /**
   * Plays a specific event sound
   * @param {string} eventName - The identifier of the event to be played
   */
  play(eventName) {
    if (this.globalEnabled && this.enabled) {
      const sound = this.elements[eventName];
      if (sound && sound.enabled)
        sound.play();
    }
  }
}

/**
 * Audio data for default event sounds
 * @name module:media/EventSounds.EventSounds.MEDIA
 * @type {object} */
EventSounds.MEDIA = {
  start: 'data:audio/mp3;base64,' +
    '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' +
    'qqqqqqqqqqqq',
  click: 'data:audio/mp3;base64,' +
    '//NAxAASsyJgIUEQAY///gX8///yfyHO/8hCEafoRp3nPQgAAEUAABBCEIT//QhCKQhNGyEIQhCN' +
    'ITU5//OQhCN7f/yEZQAAIynOc5CEIhGnABGY/4gAIQZ4h4h4d3Z2Z9Jba5XWhWP/80LEEBhJOxcf' +
    'iUAC9BEda+oiKFQsViiMpvHFC98pLjySjUNeKoYxMpwIT21HmHlEhx83A9K5vDAuZUQxzq7nJPgE' +
    'VWKQZ1Iu5oJH3UpGObWV/MfAgLC4Z/yhP/ULKnqHd/syOQenhOL/80DEChZpZs7rzBgAT3bBWub0' +
    'T/xNtn9nY5bvQdCA0TvnpXNC7EJ3iRPtebJ//7xK4IAqIii2AKbfkBAJxATDLN7wiUGv6VANBNjq' +
    'QwGCayGoaBAJaNC79/z5wP2IuJbfZsNFgBVo7P/zQsQLF0lGxvRJhlQVDyEmYldHXJGadquTRs6a' +
    'Ymq9VY1hqqt6xmqts2zGTvGNrl+u1IMBHREJREbkpaFQkFRoa2FYSDvBp6DwSf1lgFqfkQ0JcRCY' +
    'lKxKg0eEw8sKqgaEogGBH3EZpv/zQMQJEyEudaoIBoAf+HV2UBjoOsP2/IwrkezQ1Y4e2wVxgxlV' +
    'AqDQUSRUBRU6LrBY1lvxEdUBWBIOnZWOCrvlVnTsltWNOqPP4seUBcKgKpW44m3GkHLjaBS4ohHZ' +
    'dTGi6FXXVo6+//NCxBcNYAYyWAhEAJ3U+j3uXdl1z1Du30fCySCGablvUTrhwggLTomAAmrWsmWY' +
    '9ym89ZcvlwX/zf+a95ZLwXOar/LNrJ60LUl25Hs58yKRWIjSbt9DCIs0UtF/TOlm2cyNTpKysuCB' +
    '//NAxD0Rw1YliAhHPdmd9nYYQOsGCgAfmqIAXlnhbNZeUBQvyL/y6NlP/r1LLlEiSPL/7lE9SirM' +
    '5zxZEwCseMDL330yrtl8/8jJs6mt5dTloYsvNSGbmTkYQhpVpRpCG1yr9YSfr1b/80LEURFLZiWQ' +
    'CEc8v/rLXPzys+Z9z8v+H9qyCMpGLn3bla9qtcxYZXk9cbOUjb8t0q2ytz79ImM1R0ht3QdWK11m' +
    'yihIpt8SZBRAlbWq3CDpDKWUte/VHgJDH6k+lsqSPbRj+pHWWrL/80DEZxKjYh2ICIfhxIKhMBeL' +
    'PjgKlFRIKjCxIKjCukkFAKCSCxFtgTAQFIkisqIg2EngUVFg8FQCQUxBTUUzLjk5LjVVVVVVVVVV' +
    'VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQsR3EnAF9kgARgBVVVVVVVVVVVVVVVVVVVVV' +
    'VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV' +
    'VVVVVVVVVVVVVVVVVVVVVVVVVQ==',
  actionOk: 'data:audio/mp3;base64,' +
    '//NAxAAT+gKmPUFoAI81KAANYQZECuQAASjAD820006kC+buYDgGEGEKIcsCYAUQYA6JeI2JmS5w' +
    'cY5yXL6b1IJpp6kG////9X+h/oaaaadAvpvBA5/9QIDQQOQ+cbQllsQQAKTggvn/80LECxdCcupd' +
    'jFACwA8cFoNFZuosRJUe3E48kEhWIRueePjSdR4T9XMQ4SwB/BZ1GQNAtHHOPzOFryImV2zlb//r' +
    'ZV/6MYp56IY00sPgvi5vp1NN///3Q4ZlSUVV6wAAHLn//b/+Bv3/80DEChbo7s5fmGgA8cDgPEdP' +
    'slrmVdkwdsV66+p2vZktFECYbF0sxMc6XTyGfU7omIDWqTLdIdocopcSHkqkN/1OLnGEiTI5lQIH' +
    'z6F//h8+Aw////SWn6Ai////RQCALJttttthGP/zQsQJFgLXBl+PUAJpUBpuDr/a/Bn7vbuBpTSa' +
    'Ju9C26HLGnV05pymMa+52rjwoQl9HX5xkseQEWn/zR+C+CGcTN1IQsr/O/6N///////zyotv//Ul' +
    'b+WNu/4a/G/DAGASAsBQ86QpAv/zQMQNFyqWqFWaUACorGJ3w70JwQXdB1Iw8FBR6w8BkLlXmCwS' +
    'QKbRFEDGyFEFw/LiWNeT8eOSG/++3///5oEpv5wrF/RmoYsz////+yuLZ55GT//yosfyqj5gugAN' +
    'MBv///+Bt0Bw//NCxAsWul7hv49QAIAcsuZ3XnIKHgXVwYS+wjbgGuEvA8WjfAsaQmNk2QkZh551' +
    '7ceH7uZegsm5y///0VTDzzDz09dev/6IIMKcL8i/5CSjE3/oqRMBZpmk7R/RgAAbjwkkcZrZNKRG' +
    '//NAxAwW4j6pudpoAwwbDspelxARGBQ5l21KTHGz7RkyVSuLZ5l3/S9SQ1CutfuvPzIvF4HUFzRX' +
    'NkiXJVH+pv//mvMTVRJGyT6S29LRao2Wqj///UbLJxLHVPBVD9SWyADnc5p6REf/80LECxb6Uoxe' +
    '3A7SY0MyGLYtINLEx4dXVEEvywRGZ7pcZEtrkjRpam6yOArCCRZNX/W3WOoGKq04z/0I/nt/UCYZ' +
    'f6GfovMahvTn21oZ7KnY4oNhuRFQuLsBID8cKC5qSQAC9j29EzH/80DECxNZYoT+xuAyRLbuBA8W' +
    'RBNAN0Eq+mboAV7G62xjgCvi7cM0Ov1kOELDyoy/75RGdB8iaMZJ//S9SaPWe8oonsV4o5NO40K5' +
    'FG2xNQZo78WcFOwcZjQQYvlIW6mGkh0f0ZiOBv/zQsQYE8jiVBDfVogDF7hUFzGQhTgpeTFkKEeX' +
    'lL8syjVHZ03ZCDR2nSxR7Pq7np3LRaHB9adBZ07r018kdy3tjTX1KiSqekjtoMGlaAKNEYCZkOHz' +
    'pZziA0FmwmEDZhMwfvxGWFAY3P/zQMQkE5DaRAjW1ohECprRK1TRrKRtJsNpyJrNfLvndF7g+gSn' +
    'Ayt351B5obyX8r/u//////rqgBmlYGs01hNdBQpEQyNoHhEMuUtgytPS01oLy0hu6NVNabzryYxw' +
    'zfIqvKPaRFls//NCxDAQ+FYw8gjSKH7tHbMxfJlUtVpIB16SI0SEXBsf68/+/L//zfLll/nmj7F/' +
    '1pcpZ/+Z3Ur5Eq5WpbM9MfPljxeb9Lamv/nXIuOSkVXJVRmzRxLpVUlMiBhOahamKCgmCgSwVXHX' +
    '//NAxEgRU1YcAABGvSNI0Nzzp5SNpUj5aE3ZUqAvIkhEnnq1D3/yxFqrceAgEVIho8WKlhKVGBUJ' +
    'HjzvOh0JndVbtdYykkFQmdDoaDqCIaLKTEFNRTMuOTkuNaqqqqqqqqqqqqqqqqr/80LEXRFYBf5I' +
    'CEYAqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq' +
    'qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqo=',
  actionError: 'data:audio/mp3;base64,' +
    '//M4xAAUuVJUAUgYARcXFz4DgFAeKHAeChiIie7u+iaIibgYuAYGcTz3OIhf/Xd38v+J6J7u+gGB' +
    'iw8P8PDw8PDHRw8/+O6GADo/h78BEQz8HAHh5+v+A4A6H/8AAEfIiZmZBXlicwVCsWj1//M4xAwY' +
    'WvL/H4goAHY5EADTzSBEDUpfz/OhTMPGC+NAMWAgfAcAgHFSjhZD1PCRAUQFBjMUxMhGGuOVyndn' +
    'XzvlH2dGLp+jbHsUykMTTFkX/+ror2841v+k//+MIOdv/GUVmvrpkGSqAYta//M4xAkXMsLmN89o' +
    'Ag/iwxc/bCcqY374+ZYv8ms1WUWQHQlTUFCJgbIjvMcd6K1m71G+ttB9Pt32bR6OptTZxtV0l/ov' +
    '20P3b9/1/1f0dSCkh7FjKTdSRbQKiRLyBKFroXi7uP0CAvGOAWNk//M4xAsXwr7a/mPUwS+O1HXt' +
    'gEWD0qvqiuk8xOG4QoqkAU5eFUIMYl8WHoK3Hcq2dx5p5fTjLvlFtLucF2SuaciHhslc4JhNnm5X' +
    'U2pCS6c3n6+3/9GyFsk+xwWUQmSTumm7e5ggAEWsUBor//M4xAsXCrLXHntO7NUoPTkrtfAzt+Vm' +
    'c1QDhdvOk4mMiMaxzG9AERpgbNKfJVp0/lfOvjfl9SWj5XpoXfIYVep7R0WTaUAGDj1IkMHy1Oyr' +
    'fnfq2e37/22fJduLdKpFmVawABglJaFVG03L//M4xA0XurK+5HnLTJeQXpCP4L6DAO1L6jOnPOCx' +
    '/wVBu4nAIHEgOCbXJbP5R/74hGiwND1iw7BYtTsqM6viJ1aoa14o/kdXwsdo2K6nxravl7al1/t+' +
    'rUDz4J+IDtW7bbVAX+3gDwiUL8lI//M4xA0Xgq7qVnoO+zaBvGmHeGt1WGsEPh7RWPKQT82FEhiW' +
    'LGeUlRHjRERFE6UUhhATy9J5Lcv+PM+axpVIkaHDqqvi+yUHdjW3sp2vTv+rav9F/Kt+Lm9QJFdn' +
    'wrvt7SXHLLMAFKoGoNaO//M4xA4UurLyXkDFT5XYo5iQ9ckoWFh61037WowPpb5NVRWlrUmVVqxm' +
    'NV/b6q+xuJVfY1VVXfDHvnL7TGOFMb6ifdZf0etaP//lZH6FbyuK5MUAYWLKUvoamjS5tZpdNnrW' +
    'z2ASUXdsckcS//M4xBoUcVJ4IisMydfHkiAUZzmoyajzSOzOf1T9qlFq+ORkFFeC//HxXOxf/PKP' +
    'G/CNxYO4+WKbl+Lv4VBQU6KKhP/K/+vK3+WXVv/9SobSZ1b/lb9SshjN9S/Upahjf/LMahjv6qx/' +
    'DpAR//M4xCcS40IEABDN5DMaqqrVVVjWLGPjH7GpWZ/7dqr47Eq/7HQds4duAxGfzkjUTpoLSIv/' +
    '//qn///YxTAwQIGhyP/u7O/3P2eqNZ2k4so4sp2NFAYhnZ2couBNTEFNRTMuOTkuNVVVVVVV//M4' +
    'xDoKqz1wDACNy1VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV' +
    'VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV',
  finishedOk: 'data:audio/mp3;base64,' +
    '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' +
    '1f+MUXviFwhf5ESNESoACMgKy22UAf/oZWmPclPEoiClH5cGwN0IZce9FABAWFr/80LEchQJ8p2+' +
    'BhqSJMm0Y97b+IcHG7exHP1o1ozptGFJY96zeDFv2jvm5WapBNLZ6npCx39f9//xJxaUAGauYYNH' +
    '0NxP49ytAzAugiwASDuCaDUpRXKKAro0F7oKjNigqK2bCimismz/80DEfRPCbrJeUYsW2bJs07zh' +
    'UJE83J52vOGiuPNiokv/+//8tONhddJC82Fk8VX//+//+L/+X8vgX38/zyBLzXnwocMyMyN5mLPJ' +
    'siIzhs/AZfSMyzTJX/zT7ykZlXbe+/dxn2i68f/zQsSJFBiqZBYAXknZ3GPTCDzzqqXjKRMJwaRC' +
    '8G6IQU2nG4n4GGmXKsyZrv9S/Pz0LNbNUKz3/+L//YfmT5sn3CfNUKp/vzCv+a/PzXF+sMhBLEGQ' +
    'yJlrOq0Ao4kKJILAayo7MqEZp//zQMSUEvNmFAAIzcjp0sip/9jKz0mW6zFUj/RP6r+xkUjlR2Mj' +
    '/dbbIrGRyodjWKh2MrGEVYys5TKUSGhweBQ8NIQysZWMrlRxEYLh0SRVTEFNRTMuOTkuNVVVVVVV' +
    'VVVVVVVVVVVV//NCxKMQi2IeUAhHXVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV' +
    'VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV' +
    '//NAxLwR22HQAAgKnVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV' +
    'VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVU=',
  finishedError: 'data:audio/mp3;base64,' +
    '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' +
    'qqqqqqqqqqqq'
};

Object.assign(EventSounds.prototype, {
  /**
   * Collection of {@link module:media/EventSoundsElement EventSoundsElement} objects
   * @name module:media/EventSounds.EventSounds#elements
   * @type {object} */
  elements: {
    start: new EventSoundsElement('start', EventSounds.MEDIA.start),
    click: new EventSoundsElement('click', EventSounds.MEDIA.click),
    actionOk: new EventSoundsElement('actionOk', EventSounds.MEDIA.actionOk),
    actionError: new EventSoundsElement('actionError', EventSounds.MEDIA.actionError),
    finishedOk: new EventSoundsElement('finishedOk', EventSounds.MEDIA.finishedOk),
    finishedError: new EventSoundsElement('finishedError', EventSounds.MEDIA.finishedError)
  },
  /**
   * Whether this event sounds are enabled or not
   * @name module:media/EventSounds.EventSounds#enabled
   * @type {number} */
  enabled: DEFAULT,
  /**
   * This attribute is intended to be used at prototype level, to indicate a globally disabled
   * or enabled state.
   * @name module:media/EventSounds.EventSounds#globalEnabled
   * @type {boolean} */
  globalEnabled: true,
});

export default EventSounds;
