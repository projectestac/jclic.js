/**
 *  File    : Deps.js
 *  Created : 19/05/2015
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
 *  (c) 2000-2021 Educational Telematic Network of Catalonia (XTEC)
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

// Declaration of JSDoc external objects:

/**
 * The Event interface represents an event which takes place in the DOM.
 * @external Event
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Event}
 */

/**
 * The HTMLElement interface represents any HTML element. Some elements directly implement this
 * interface, others implement it via an interface that inherits it.
 * @external HTMLElement
 * @see {@link https://developer.mozilla.org/ca/docs/Web/API/HTMLElement}
 */

/**
 * A jQuery object
 * @external jQuery
 * @see {@link http://api.jquery.com/jQuery/}
 */

/**
 * The jQuery XMLHttpRequest (jqXHR) object returned by `$.ajax()` as of jQuery 1.5 is a superset
 * of the browser's native [XMLHttpRequest](https://developer.mozilla.org/docs/XMLHttpRequest) object.
 * As of jQuery 1.5, jqXHR objects implement the Promise interface, giving them
 * all the properties, methods, and behavior of a Promise.
 * @external jqXHR
 * @see {@link https://api.jquery.com/jQuery.ajax/#jqXHR}
 */

/**
 * The CanvasRenderingContext2D interface provides the 2D rendering context for the drawing surface
 * of a &lt;canvas&gt; element.
 * @external CanvasRenderingContext2D
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D}
 */

/**
 * The HTMLImageElement interface provides special properties and methods (beyond the regular
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement HTMLElement} interface it
 * also has available to it by inheritance) for manipulating the layout and presentation of
 * &lt;img&gt; elements.
 * @external HTMLImageElement
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement}
 */

/**
 * The HTMLAudioElement interface provides access to the properties of &lt;audio&gt; elements, as
 * well as methods to manipulate them. It derives from the
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement HTMLMediaElement} interface.
 * @external HTMLAudioElement
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement}
 */

/**
 * The AudioContext interface represents an audio-processing graph built from audio modules linked together.
 * @external AudioContext
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/AudioContext}
 */

/**
 * The Intl.Collator object is a constructor for collators, objects that enable language sensitive
 * string comparison.
 * @external Collator
 * @see {@link https://developer.mozilla.org/ca/docs/Web/JavaScript/Reference/Global_Objects/Collator}
 */

/**
 * A JSZip object
 * @external JSZip
 * @see {@link https://stuk.github.io/jszip}
 */

/**
 * The MediaRecorder interface of the {@link https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder_API MediaRecorder API}
 * provides functionality to easily capture media.
 * @external MediaRecorder
 * @see {@link https://developer.mozilla.org/ca/docs/Web/API/MediaRecorder}
 */

/**
 * The Promise object is used for asynchronous computations. A Promise represents an operation
 * that hasn't completed yet, but is expected in the future.
 * @external Promise
 * @see {@link https://developer.mozilla.org/ca/docs/Web/JavaScript/Reference/Global_Objects/Promise}
 */

/**
* The Storage interface of the Web Storage API provides access to the session storage or local storage for a particular domain,
* allowing you to for example add, modify or delete stored data items.
* @external Storage
* @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Storage}
*/

/**
 * The NamedNodeMap interface represents a collection of Attr objects. Objects inside a NamedNodeMap are not in any particular
 * order, unlike NodeList, although they may be accessed by an index as in an array.
 * @external NamedNodeMap
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/NamedNodeMap}
 */

/**
 * MidiPlayerJS is a JavaScript library which reads standard MIDI files and emits JSON events in real time.
 * @external MidiPlayerJS
 * @see {@link https://github.com/grimmdude/MidiPlayerJS}
 */

/**
 * JavaScript Date objects represent a single moment in time in a platform-independent format.
 * @external Date
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date}
 */

/**
* The HTMLStyleElement interface represents a [style](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/style) element.
* It inherits properties and methods from its parent, HTMLElement, and from LinkStyle.
* @external HTMLStyleElement
* @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLStyleElement}
*/

/**
 * Type of MIDI instrument used by Soundfont Player
 * @external Instrument
 * @see {@link https://github.com/danigb/soundfont-player}
 */

//
// The purpose of this file is to ensure that certain classes derived from the main objects of
// JClic ([Activity](Activity.html), [Shaper](Shaper.html), [Skin](Skin.html) and
// [AutoContentProvider](AutoContentProvider.html)) are loaded at the beginning.

import DefaultSkin from './skins/DefaultSkin.js';
import OrangeSkin from './skins/OrangeSkin.js';
import GreenSkin from './skins/GreenSkin.js';
import BlueSkin from './skins/BlueSkin.js';
import SimpleSkin from './skins/SimpleSkin.js';
import MiniSkin from './skins/MiniSkin.js';
import EmptySkin from './skins/EmptySkin.js';
import CustomSkin from './skins/CustomSkin.js';
import Rectangular from './shapers/Rectangular.js';
import Holes from './shapers/Holes.js';
import JigSaw from './shapers/JigSaw.js';
import TriangularJigSaw from './shapers/TriangularJigSaw.js';
import ClassicJigSaw from './shapers/ClassicJigSaw.js';
import Arith from './automation/arith/Arith.js';
import TextActivityBase from './activities/text/TextActivityBase.js';
import FillInBlanks from './activities/text/FillInBlanks.js';
import OrderText from './activities/text/OrderText.js';
import Complete from './activities/text/Complete.js';
import IdentifyText from './activities/text/IdentifyText.js';
import WrittenAnswer from './activities/text/WrittenAnswer.js';
import InformationScreen from './activities/panels/InformationScreen.js';
import Identify from './activities/panels/Identify.js';
import Explore from './activities/panels/Explore.js';
import Menu from './activities/panels/Menu.js';
import DoublePuzzle from './activities/puzzles/DoublePuzzle.js';
import ExchangePuzzle from './activities/puzzles/ExchangePuzzle.js';
import HolePuzzle from './activities/puzzles/HolePuzzle.js';
import MemoryGame from './activities/memory/MemoryGame.js';
import SimpleAssociation from './activities/associations/SimpleAssociation.js';
import ComplexAssociation from './activities/associations/ComplexAssociation.js';
import WordSearch from './activities/textGrid/WordSearch.js';
import CrossWord from './activities/textGrid/CrossWord.js';
import TCPReporter from './report/TCPReporter.js';
import SessionStorageReporter from './report/SessionStorageReporter.js';

export default {
  DefaultSkin,
  OrangeSkin,
  GreenSkin,
  BlueSkin,
  SimpleSkin,
  MiniSkin,
  EmptySkin,
  CustomSkin,
  Rectangular,
  Holes,
  JigSaw,
  TriangularJigSaw,
  ClassicJigSaw,
  Arith,
  TextActivityBase,
  FillInBlanks,
  OrderText,
  Complete,
  IdentifyText,
  WrittenAnswer,
  InformationScreen,
  Identify,
  Explore,
  Menu,
  DoublePuzzle,
  ExchangePuzzle,
  HolePuzzle,
  MemoryGame,
  SimpleAssociation,
  ComplexAssociation,
  WordSearch,
  CrossWord,
  TCPReporter,
  SessionStorageReporter,
};
