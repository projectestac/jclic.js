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
 *  @license EUPL-1.1
 *  @licstart
 *  (c) 2000-2019 Educational Telematic Network of Catalonia (XTEC)
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


//
// The purpose of this file is to ensure that certain classes derived from the main objects of
// JClic ([Activity](Activity.html), [Shaper](Shaper.html), [Skin](Skin.html) and
// [AutoContentProvider](AutoContentProvider.html)) are loaded at the beginning.

  import DefaultSkin from './skins/DefaultSkin';
  import OrangeSkin from './skins/OrangeSkin';
  import GreenSkin from './skins/GreenSkin';
  import BlueSkin from './skins/BlueSkin';
  import SimpleSkin from './skins/SimpleSkin';
  import MiniSkin from './skins/MiniSkin';
  import EmptySkin from './skins/EmptySkin';
  import CustomSkin from './skins/CustomSkin';
  import Rectangular from './shapers/Rectangular';
  import Holes from './shapers/Holes';
  import JigSaw from './shapers/JigSaw';
  import TriangularJigSaw from './shapers/TriangularJigSaw';
  import ClassicJigSaw from './shapers/ClassicJigSaw';
  import Arith from './automation/arith/Arith';
  import TextActivityBase from './activities/text/TextActivityBase';
  import FillInBlanks from './activities/text/FillInBlanks';
  import OrderText from './activities/text/OrderText';
  import Complete from './activities/text/Complete';
  import IdentifyText from './activities/text/IdentifyText';
  import WrittenAnswer from './activities/text/WrittenAnswer';
  import InformationScreen from './activities/panels/InformationScreen';
  import Identify from './activities/panels/Identify';
  import Explore from './activities/panels/Explore';
  import Menu from './activities/panels/Menu';
  import DoublePuzzle from './activities/puzzles/DoublePuzzle';
  import ExchangePuzzle from './activities/puzzles/ExchangePuzzle';
  import HolePuzzle from './activities/puzzles/HolePuzzle';
  import MemoryGame from './activities/memory/MemoryGame';
  import SimpleAssociation from './activities/associations/SimpleAssociation';
  import ComplexAssociation from './activities/associations/ComplexAssociation';
  import WordSearch from './activities/textGrid/WordSearch';
  import CrossWord from './activities/textGrid/CrossWord';
  import TCPReporter from './report/TCPReporter';
  import SessionStorageReporter from './report/SessionStorageReporter';

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
  }