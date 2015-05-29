//    File    : Deps.js  
//    Created : 19/05/2015  
//    By      : fbusquet  
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


// 
// The purpose of this file is to ensure that certain classes derived from the main objects of 
// JClic ([Activity](Activity.html), [Shaper](Shaper.html), [Skin](Skin.html) and
// [AutoContentProvider](AutoContentProvider.html)) are loaded at the beginning.
define([
  "./skins/DefaultSkin",
  "./shapers/Rectangular",
  "./shapers/Holes",
  "./shapers/JigSaw",
  "./shapers/TriangularJigSaw",
  "./shapers/ClassicJigSaw",
  "./automation/arith/Arith",
  "./activities/text/TextActivityBase",
  "./activities/panels/InformationScreen",
  "./activities/puzzles/DoublePuzzle"
], function(a, b ,c, d, e, f, g, h, i, j){  
  return 'Deep classes loaded!';
});
