//    File    : ActiveBagContent.js  
//    Created : 13/04/2015  
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
  "jquery",
  "./BoxBase",
  "../Utils",
  "./ActiveBoxContent",
  "../shapers/Shaper"
], function ($, BoxBase, Utils, ActiveBoxContent, Shaper) {

//
//  This class stores a collection of [ActiveBoxContent](ActiveBoxContent.html)
//  objects, currently in an Array, and provides methods to manage it. The two
//  main members of `ActiveBagContent` are the [Shaper](Shaper.html), responsible
//  of determining the position and shape of each [ActiveBox](ActiveBox.html), 
//  and the [BoxBase](BoxBase.html) (field `bb`), provider of a common visual style.
//
  var ActiveBagContent = function (id) {
    if (!Utils.isNullOrUndef(id))
      this.id = id;
    this.activeBoxContentArray = [];
  };

  ActiveBagContent.prototype = {
    constructor: ActiveBagContent,
    //
    // The global identifier of this object: `primary`, `secondary`...
    id: 'primary',
    //
    // The filename of the main image of the bag
    imgName: null,
    //
    // Number of columns (ncw) and rows (nch) when cells are distributed in a table
    ncw: 0, nch: 0,
    //
    // Optimal cell width (w) and height (h)
    w: 0, h: 0,
    //
    // Cells have/don't have borders
    border: true,
    //
    // The [BoxBase](BoxBase.html) used for this bag of cell contents
    bb: null,
    // 
    // The [Shaper](Shaper.html) used to define the specific shape of each cell
    shaper: null,
    //
    // An optional [ActiveBoxContent](ActiveBoxContent.html) object with settings
    // for the background
    backgroundContent: null,
    //
    // The main Array of [ActiveBoxContent](ActiveBoxContent.html) objects
    activeBoxContentArray: null,
    //
    // The default value to assign to the 'id' field of children
    defaultIdValue: -1,
    //
    // Loads the object settings from a specific JQuery XML element 
    setProperties: function ($xml, mediaBag) {

      var cellSet = this;

      $.each($xml.get(0).attributes, function () {
        var name = this.name;
        var val = this.value;
        switch (this.name) {
          case 'id':
            cellSet.id = val;
            break;
          case 'image':
            cellSet.imgName = val;
            break;
          case 'rows':
            cellSet.nch = Number(val);
            break;
          case 'columns':
            cellSet.ncw = Number(val);
            break;
          case 'cellWidth':
            cellSet.w = Number(val);
            break;
          case 'cellHeight':
            cellSet.h = Number(val);
            break;
          case 'border':
            cellSet.border = Utils.getBoolean(val);
            break;
        }
      });

      $xml.children().each(function () {
        var $node = $(this);
        switch (this.nodeName) {
          case 'style':
            cellSet.bb = new BoxBase(null).setProperties($node);
            break;
          case 'shaper':
            var shaperClassName = $node.attr('class');
            var nCols = Math.max(1, $node.attr('cols'));
            var nRows = Math.max(1, $node.attr('rows'));
            cellSet.shaper = Shaper.prototype._getShaper(shaperClassName, nCols, nRows);
            cellSet.shaper.setProperties($node);
            break;
          case 'ids':
            // Used in special cases where all cells have empty content with only 'ids'
            var ids = this.textContent.split(' ');
            for (var i = 0; i < ids.length; i++)
              cellSet.activeBoxContentArray[i] = new ActiveBoxContent(ids[i]);
            break;
          case 'cell':
            var abc = new ActiveBoxContent().setProperties($node, mediaBag);
            cellSet.activeBoxContentArray.push(abc);
            break;
        }
      });

      // Link [BoxBase](BoxBase.html) objects of `activeBoxContentArray` elements
      // to `bb`
      if (cellSet.bb) {
        $.each(cellSet.activeBoxContentArray, function (i, cellContent) {
          if (cellContent.bb)
            cellContent.bb.parent = cellSet.bb;
        });
      }
      return this;
    },
    //
    // Prepares the media content of all elements
    prepareMedia: function (playStation) {
      // TODO: Implement ActiveBagContent.prepareMedia      
    }
  };

  return ActiveBagContent;

});
