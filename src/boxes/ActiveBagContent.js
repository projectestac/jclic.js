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
  "../shapers/Shaper",
  "../AWT"
], function ($, BoxBase, Utils, ActiveBoxContent, Shaper, AWT) {

//
//  This class stores a collection of [ActiveBoxContent](ActiveBoxContent.html)
//  objects, currently in an Array, and provides methods to manage it. The two
//  main members of `ActiveBagContent` are the [Shaper](Shaper.html), responsible
//  of determining the position and shape of each [ActiveBox](ActiveBox.html), 
//  and the [BoxBase](BoxBase.html) (field `bb`), provider of a common visual style.
//
  var ActiveBagContent = function (id, ncw, nch) {
    if (id)
      this.id = id;
    this.activeBoxContentArray = [];
    this.ncw = Math.max(1, ncw);
    this.nch = Math.max(1, nch);
  };

  ActiveBagContent.prototype = {
    constructor: ActiveBagContent,
    //
    // The global identifier of this object: `primary`, `secondary`...
    id: 'primary',
    //
    // The filename of the main image of the bag, and the realized Image object
    imgName: null,
    img: null,
    //
    // Number of columns (ncw) and rows (nch) when cells are distributed in a table
    ncw: 1, nch: 1,
    //
    // Optimal cell width (w) and height (h)
    w: Utils.settings.DEFAULT_GRID_ELEMENT_SIZE,
    h: Utils.settings.DEFAULT_GRID_ELEMENT_SIZE,
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
      var bug = false;

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
            // Bug in JClic beta 1: "columns" is number of rows, and "rows" is number of columns.
            // Was corrected in beta 2: If "cols" is specified, "rows" are rows and "cols" are columns.
          case 'rows':
            cellSet.nch = Number(val);
            break;
          case 'columns':
            bug=true;          
          case 'cols':
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
      
      if(bug){
        var n = cellSet.ncw;
        cellSet.ncw = cellSet.nch;
        cellSet.nch = n;
      }

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

      // Assign ids when cells have empty content (they are just shapes)
      var n = this.activeBoxContentArray.length;
      if (n > 0) {
        var empty = true;
        for (var i = 0; i < n; i++) {
          var bxc = this.getActiveBoxContent(i);
          if (bxc.id !== -1 || bxc.item !== -1 || !bxc.isEmpty()) {
            empty = false;
            break;
          }
        }
        if (empty) {
          for (var i = 0; i < n; i++)
            this.getActiveBoxContent(i).id = i;
        }
      }

      // Link [BoxBase](BoxBase.html) objects of `activeBoxContentArray` elements to `bb`
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
    },
    //
    // Gets the estimated total width and height of this bag
    getTotalWidth: function () {
      return this.w * this.ncw;
    },
    getTotalHeight: function () {
      return this.h * this.nch;
    },
    getNumCells: function () {
      return this.activeBoxContentArray.length;
    },
    isEmpty: function () {
      return this.activeBoxContentArray.length === 0;
    },
    //
    // Retrieves the bag [Shaper](Shaper.html), building a new one if needed
    getShaper: function () {
      if (this.shaper === null)
        this.shaper = Shaper.prototype._getShaper('@Rectangular', this.ncw, this.nch);
      return this.shaper;
    },
    //
    // Adds the provided [ActiveBoxContent](ActiveBoxContent.html) to this bag
    // ab (ActiveBoxContent)
    addActiveBoxContent: function (ab) {
      this.activeBoxContentArray.push(ab);
      if (this.ncw === 0 || this.nch === 0) {
        this.ncw = 1;
        this.nch = 1;
      }
    },
    //
    // Gets the nth [ActiveBoxContent](ActiveBoxContent.html)
    getActiveBoxContent: function (i) {
      if (i >= this.activeBoxContentArray.length) {
        for (var j = this.activeBoxContentArray.length; j <= i; j++)
          this.activeBoxContentArray.push(new ActiveBoxContent());
      }
      return this.activeBoxContentArray[i];
    },
    //
    // Finds the [ActiveBoxContent](ActiveBoxContent.html) with a specific `id` and `item` values
    getActiveBoxContentWith: function (id, item) {
      var result = null;
      for (var i = 0; i < this.activeBoxContentArray.length; i++) {
        var abxcnt = this.activeBoxContentArray[i];
        if (abxcnt.id === id && abxcnt.item === item) {
          result = abxcnt;
          break;
        }
      }
      return result;
    },
    //
    // Sets the content of the cells based on a image spliced by a shaper
    // mb ([MediaBag](MediaBag.html)) - The MediaBag used to retrieve the image
    // sh ([Shaper](Shaper.html)) - The Shaper used to splice the image
    // roundSizes (boolean) - When `true`, the cells size and coordinates will be rounded to its
    // nearest integer values.
    setImgContent: function (mb, sh, roundSizes) {
      if (sh)
        this.setShaper(sh);
      this.ncw = this.shaper.nCols;
      this.nch = this.shaper.nRows;
      if (mb && this.imgName && mb.elements[this.imgName] && mb.elements[this.imgName].ready) {
        this.img = mb.elements[this.imgName].data;
        this.w = this.img.width / this.ncw;
        this.h = this.img.height / this.nch;
        if (roundSizes) {
          this.w = Math.round(this.w);
          this.h = Math.round(this.h);
        }
      }
      else {
        this.img = null;
        this.w = Math.max(this.w, 10);
        this.h = Math.max(this.h, 10);
      }

      var r = new AWT.Rectangle(0, 0, this.w * this.ncw, this.h * this.nch);
      for (var i = 0; i < this.shaper.nCells; i++) {
        this.getActiveBoxContent(i).setImgContent(this.img, this.shaper.getShape(i, r));
      }
      if (this.shaper.hasRemainder) {
        this.backgroundContent = new ActiveBoxContent();
        this.backgroundContent.setImgContent(this.img, this.shaper.getRemainderShape(r));
      }
    },
    //
    // Sets an array of strings as content of this bag
    // txt (Array of String)
    // setNcw (number)
    // setNch (number)
    setTextContent: function (txt, setNcw, setNch) {
      this.ncw = Math.max(1, setNcw);
      this.nch = Math.max(1, setNch);
      var n = this.ncw * this.nch;
      for (var i = 0; i < n; i++) {
        this.getActiveBoxContent(i).setTextContent(
            (i >= txt.length || txt[i] === null) ? '' : txt[i]);
      }
    },
    //
    // Sets `id` values to a all [ActiveBoxContent](ActiveBoxContent,html) elements
    // ids (Array of Number)
    setIds: function (ids) {
      for (var i = 0; i < this.activeBoxContentArray.length; i++)
        if (i < ids.length)
          this.getActiveBoxContent(i).id = ids[i];
    },
    //
    // Resets all `id` values to the specified    
    setAllIdsTo: function (id) {
      for (var i = 0; i < this.activeBoxContentArray.length; i++)
        this.getActiveBoxContent(i).id = id;
    },
    //
    //
    avoidAllIdsNull: function (maxId) {
      var allIdsNull = true;
      var numCells = this.activeBoxContentArray.length;
      for (var i = 0; i < numCells; i++) {
        if (this.getActiveBoxContent(i).id !== -1) {
          allIdsNull = false;
          break;
        }
      }
      if (allIdsNull) {
        maxId = Math.max(1, maxId);
        for (var i = 0; i < numCells; i++) {
          this.getActiveBoxContent(i).id = i % maxId;
        }
      }
    }
  };

  return ActiveBagContent;
});
