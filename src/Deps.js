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

//
// The purpose of this file is to ensure that certain classes derived from the main objects of
// JClic ([Activity](Activity.html), [Shaper](Shaper.html), [Skin](Skin.html) and
// [AutoContentProvider](AutoContentProvider.html)) are loaded at the beginning.
define([
  "./skins/DefaultSkin",
  "./skins/OrangeSkin",
  "./skins/GreenSkin",
  "./skins/BlueSkin",
  "./skins/SimpleSkin",
  "./skins/MiniSkin",
  "./skins/EmptySkin",
  "./skins/CustomSkin",
  "./shapers/Rectangular",
  "./shapers/Holes",
  "./shapers/JigSaw",
  "./shapers/TriangularJigSaw",
  "./shapers/ClassicJigSaw",
  "./automation/arith/Arith",
  "./activities/text/TextActivityBase",
  "./activities/text/FillInBlanks",
  "./activities/text/OrderText",
  "./activities/text/Complete",
  "./activities/text/IdentifyText",
  "./activities/text/WrittenAnswer",
  "./activities/panels/InformationScreen",
  "./activities/panels/Identify",
  "./activities/panels/Explore",
  "./activities/panels/Menu",
  "./activities/puzzles/DoublePuzzle",
  "./activities/puzzles/ExchangePuzzle",
  "./activities/puzzles/HolePuzzle",
  "./activities/memory/MemoryGame",
  "./activities/associations/SimpleAssociation",
  "./activities/associations/ComplexAssociation",
  "./activities/textGrid/WordSearch",
  "./activities/textGrid/CrossWord",
  "./report/TCPReporter",
  "./report/SessionStorageReporter"
], () => 'Deep classes loaded!')

