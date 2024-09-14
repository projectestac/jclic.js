/*!
 *  File    : jclic-node.js
 *  Created : 12/11/2024
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
 *  (c) 2000-2024 Educational Telematic Network of Catalonia (XTEC)
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

// Initialize fake DOM global variables like 'window' or 'document'.
import './init-jsdom.js';

import $ from 'jquery';
import AWT from './AWT.js';
import Activity from './Activity.js';
import GlobalData from './GlobalData.js';
import JClicPlayer from './JClicPlayer.js';
import Utils from './Utils.js';
import PlayerHistory from './PlayerHistory.js';
import ComplexAssociation from './activities/associations/ComplexAssociation.js';
import SimpleAssociation from './activities/associations/SimpleAssociation.js';
import MemoryGame from './activities/memory/MemoryGame.js';
import Explore from './activities/panels/Explore.js';
import Identify from './activities/panels/Identify.js';
import InformationScreen from './activities/panels/InformationScreen.js';
import Menu from './activities/panels/Menu.js';
import DoublePuzzle from './activities/puzzles/DoublePuzzle.js';
import ExchangePuzzle from './activities/puzzles/ExchangePuzzle.js';
import HolePuzzle from './activities/puzzles/HolePuzzle.js';
import Complete from './activities/text/Complete.js';
import Evaluator from './activities/text/Evaluator.js';
import FillInBlanks from './activities/text/FillInBlanks.js';
import CrossWord from './activities/textGrid/CrossWord.js';
import WordSearch from './activities/textGrid/WordSearch.js';
import IdentifyText from './activities/text/IdentifyText.js';
import OrderText from './activities/text/OrderText.js';
import TextActivityBase from './activities/text/TextActivityBase.js';
import TextActivityDocument from './activities/text/TextActivityDocument.js';
import WrittenAnswer from './activities/text/WrittenAnswer.js';
import Arith from './automation/arith/Arith.js';
import AutoContentProvider from './automation/AutoContentProvider.js';
import ActivitySequenceElement from './bags/ActivitySequenceElement.js';
import ActivitySequence from './bags/ActivitySequence.js';
import ActivitySequenceJump from './bags/ActivitySequenceJump.js';
import ConditionalJumpInfo from './bags/ConditionalJumpInfo.js';
import JumpInfo from './bags/JumpInfo.js';
import MediaBagElement from './bags/MediaBagElement.js';
import MediaBag from './bags/MediaBag.js';
import AbstractBox from './boxes/AbstractBox.js';
import ActiveBagContent from './boxes/ActiveBagContent.js';
import ActiveBoxBag from './boxes/ActiveBoxBag.js';
import ActiveBoxContent from './boxes/ActiveBoxContent.js';
import ActiveBoxGrid from './boxes/ActiveBoxGrid.js';
import ActiveBox from './boxes/ActiveBox.js';
import BoxBag from './boxes/BoxBag.js';
import BoxBase from './boxes/BoxBase.js';
import BoxConnector from './boxes/BoxConnector.js';
import TextGridContent from './boxes/TextGridContent.js';
import TextGrid from './boxes/TextGrid.js';
import ActiveMediaBag from './media/ActiveMediaBag.js';
import ActiveMediaPlayer from './media/ActiveMediaPlayer.js';
import AudioBuffer from './media/AudioBuffer.js';
import EventSoundsElement from './media/EventSoundsElement.js';
import EventSounds from './media/EventSounds.js';
import MediaContent from './media/MediaContent.js';
import MidiAudioPlayer from './media/MidiAudioPlayer.js';
import JClicProject from './project/JClicProject.js';
import ProjectSettings from './project/ProjectSettings.js';
import ActionReg from './report/ActionReg.js';
import ActivityReg from './report/ActivityReg.js';
import EncryptMin from './report/EncryptMin.js';
import Reporter from './report/Reporter.js';
import SCORM from './report/SCORM.js';
import SequenceReg from './report/SequenceReg.js';
import SessionReg from './report/SessionReg.js';
import SessionStorageReporter from './report/SessionStorageReporter.js';
import TCPReporter from './report/TCPReporter.js';
import ClassicJigSaw from './shapers/ClassicJigSaw.js';
import Holes from './shapers/Holes.js';
import JigSaw from './shapers/JigSaw.js';
import Rectangular from './shapers/Rectangular.js';
import Shaper from './shapers/Shaper.js';
import TriangularJigSaw from './shapers/TriangularJigSaw.js';
import BlueSkin from './skins/BlueSkin.js';
import Counter from './skins/Counter.js';
import CustomSkin from './skins/CustomSkin.js';
import DefaultSkin from './skins/DefaultSkin.js';
import EmptySkin from './skins/EmptySkin.js';
import GreenSkin from './skins/GreenSkin.js';
import MiniSkin from './skins/MiniSkin.js';
import OrangeSkin from './skins/OrangeSkin.js';
import SimpleSkin from './skins/SimpleSkin.js';
import Skin from './skins/Skin.js';

// Export all JClic core classes plus jQuery, so they can be used in NodeJS
export default ({
  $,
  AWT,
  Activity,
  GlobalData,
  JClicPlayer,
  Utils,
  PlayerHistory,
  JClicProject,
  activities: {
    ComplexAssociation,
    SimpleAssociation,
    MemoryGame,
    Explore,
    Identify,
    InformationScreen,
    Menu,
    DoublePuzzle,
    ExchangePuzzle,
    HolePuzzle,
    Complete,
    Evaluator,
    FillInBlanks,
    CrossWord,
    WordSearch,
    IdentifyText,
    OrderText,
    TextActivityBase,
    TextActivityDocument,
    WrittenAnswer,
  },
  automation: {
    Arith,
    AutoContentProvider,
  },
  bags: {
    ActivitySequenceElement,
    ActivitySequence,
    ActivitySequenceJump,
    ConditionalJumpInfo,
    JumpInfo,
    MediaBagElement,
    MediaBag,
  },
  boxes: {
    AbstractBox,
    ActiveBagContent,
    ActiveBoxBag,
    ActiveBoxContent,
    ActiveBoxGrid,
    ActiveBox,
    BoxBag,
    BoxBase,
    BoxConnector,
    TextGridContent,
    TextGrid,
  },
  media: {
    ActiveMediaBag,
    ActiveMediaPlayer,
    AudioBuffer,
    EventSoundsElement,
    EventSounds,
    MediaContent,
    MidiAudioPlayer,
  },
  project: {
    JClicProject,
    ProjectSettings,
  },
  report: {
    ActionReg,
    ActivityReg,
    EncryptMin,
    Reporter,
    SCORM,
    SequenceReg,
    SessionReg,
    SessionStorageReporter,
    TCPReporter,
  },
  shapers: {
    ClassicJigSaw,
    Holes,
    JigSaw,
    Rectangular,
    Shaper,
    TriangularJigSaw,
  },
  skins: {
    BlueSkin,
    Counter,
    CustomSkin,
    DefaultSkin,
    EmptySkin,
    GreenSkin,
    MiniSkin,
    OrangeSkin,
    SimpleSkin,
    Skin,
  },
});
