//    File    : CrossWord.js  
//    Created : 17/06/2015  
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

define([
  "jquery",
  "../../Activity",
  "../../boxes/BoxBase",
  "../../boxes/BoxBag",
  "../../boxes/TextGrid",
  "../../boxes/AbstractBox",
  "../../boxes/ActiveBox",
  "../../AWT",
  "../../Utils"
], function ($, Activity, BoxBase, BoxBag, TextGrid, AbstractBox, ActiveBox, AWT, Utils) {

  var K = Utils.settings;

  //
  // 
  var CrossWord = function (project) {
    Activity.call(this, project);
  };

  CrossWord.prototype = {
    constructor: CrossWord,
    /**
     * Whether all letters of the {@link TextGrid} should be displayed in upper case
     * @type {boolean} */
    upperCase: true,
    /**
     * Whether the case is significant to evaluate answers
     * @type {boolean} */
    checkCase: true,
    /**
     * When `true`, the wildchar of the {@link TextGrid} will be transparent.
     * @type {boolean} */
    wildTransparent: false,    
    // 
    // Retrieves the minimum number of actions needed to solve this activity
    getMinNumActions: function () {
      return this.tgc.getNumChars() - this.tgc.countWildChars();
    },
    //
    // Cross word activities need keyboard
    needsKeyboard: function () {
      return true;
    }
  };

  // 
  // WordSearch extends Activity
  CrossWord.prototype = $.extend(Object.create(Activity.prototype), CrossWord.prototype);

  //
  // Activity.Panel constructor
  CrossWord.Panel = function (act, ps, $div) {
    Activity.Panel.call(this, act, ps, $div);
  };


  // 
  // Properties and methods specific to InformationScreen.Panel
  var ActPanelAncestor = Activity.Panel.prototype;

  CrossWord.Panel.prototype = {
    constructor: CrossWord.Panel,
    //
    // The default width of the 'Horizontal' and 'Vertical' labels
    LABEL_WIDTH: 40,
    //
    // The [TextGrid](TextGrid.html) of this Activity.Panel
    grid: null,
    // 
    // A [BoxBag](BoxBag.html) used to place the across and down clues, and the
    // `toggle direction` button.
    bb: null,
    //
    // The total number of letters of this cross word
    numLetters: 0,
    //
    // Flag indicating the type of automatic advance of the cursor.
    // Possible values: `NO_ADVANCE` (default), 'ADVANCE_RIGHT' and 'ADVANCE_DOWN'
    // TODO: Implement 'ADVANCE_LEFT' for LTR languages
    advance: 'NO_ADVANCE',
    //
    // Two [ActiveBox](ActiveBox.html) objects used to display across and down clues
    hClue: null, vClue: null,
    //
    // Two buttons used to select the `advance` mode
    hClueBtn: null, vClueBtn: null,
    // 
    // Mouse and touch events intercepted by this panel
    events: ['click', 'keydown', 'keypress'],
    //
    // Clears the realized objects
    clear: function () {
      if (this.grid) {
        this.grid.end();
        this.grid = null;
      }
      if (this.bb) {
        this.bb.end();
        this.bb = null;
      }
    },
    //
    // Creates a [BoxBag](BoxBag.html) with a label ("Horizontal" or "Vertical") and an
    // [ActiveBox](ActiveBox.html) used to display clues.
    // type (String) - `acrossClues` for horizontal clues, 'downClues' for vertical.
    // Returns: [BoxBag](BoxBag.html)
    createBoxBag: function (type) {

      var bxb = new BoxBag(null, this, null);

      var sb = new AbstractBox(bxb, this, this.icoBB);
      sb.setBounds(0, 0, this.LABEL_WIDTH, this.act.abc[type].h);

      var $btn = $('<div/>').css({
        'width': this.LABEL_WIDTH,
        'height': this.act.abc[type].h,
        'background-image': 'url(' + (type === 'acrossClues' ? this.hIcon : this.vIcon) + ')',
        'background-repeat': 'no-repeat',
        'background-position': 'center',
        'border-radius': 6,
        'z-index': 10
      }).appendTo(this.$div);

      sb.setHostedComponent($btn);
      bxb.addBox(sb);

      var ab = new ActiveBox(bxb, null, null, type, new AWT.Rectangle(this.LABEL_WIDTH + this.act.margin, 0, this.act.abc[type].w, this.act.abc[type].h));
      bxb.addBox(ab);
      bxb.setBoxBase(this.act.abc[type].bb);

      if (type === 'acrossClues') { // Horizontal
        this.hClue = ab;
        this.hClueBtn = sb;
      }
      else {
        this.vClue = ab;
        this.vClueBtn = sb;
      }
      return bxb;
    },
    // 
    // Prepares the activity panel
    buildVisualComponents: function () {

      if (this.firstRun)
        ActPanelAncestor.buildVisualComponents.call(this);

      this.clear();

      var tgc = this.act.tgc;

      var abcH = this.act.abc['acrossClues'];
      if (abcH.imgName)
        abcH.setImgContent(this.act.project.mediaBag, null, false);

      var abcV = this.act.abc['downClues'];
      if (abcV.imgName)
        abcV.setImgContent(this.act.project.mediaBag, null, false);

      if (this.act.acp !== null) {
        this.act.acp.generateContent(0, 0, this.act.abc, false);
      }

      if (tgc) {
        this.grid = TextGrid.createEmptyGrid(null, this, this.act.margin, this.act.margin, tgc, this.act.wildTransparent);
        this.bb = new BoxBag(null, this, null);
        var bxbh = this.createBoxBag('acrossClues');
        var bxbv = this.createBoxBag('downClues');
        if (this.act.boxGridPos === 'AUB' || this.act.boxGridPos === 'BUA')
          bxbv.moveTo(new AWT.Point(bxbh.dim.width + this.act.margin, 0));
        else
          bxbv.moveTo(new AWT.Point(0, bxbh.dim.height + this.act.margin));
        this.bb.addBox(bxbh);
        this.bb.addBox(bxbv);

        this.grid.setVisible(true);
        this.bb.setVisible(true);
      }
    },
    // 
    // Basic initialization procedure
    initActivity: function () {
      ActPanelAncestor.initActivity.call(this);

      if (!this.firstRun)
        this.buildVisualComponents();
      else
        this.firstRun = false;

      //this.setAndPlayMsg('main', 'start');
      if (this.grid) {

        this.grid.setChars(this.act.tgc.text);
        this.numLetters = this.act.getMinNumActions();
        this.grid.setCellAttributes(true, true);
        this.grid.setCursorEnabled(true);
        this.setCursorAt(0, 0);
        this.advance = 'ADVANCE_RIGHT';
        this.setBtnStatus();
        this.playing = true;
        this.invalidate().update();

        this.$div.attr("tabindex", 0);
        this.$div.focus();
      }
    },
    //
    // Calculates the current score
    getCurrentScore: function () {
      return this.grid ? this.grid.countCoincidences(this.act.checkCase) : 0;
    },
    //
    // Overrides `Activity.Panel.updateContent`
    // Updates the graphic contents of its panel.
    // The method should be called from `Activity.Panel.update`
    // dirtyRect (AWT.Rectangle) - Specifies the area to be updated. When `null`, it's the whole panel.
    updateContent: function (dirtyRegion) {
      ActPanelAncestor.updateContent.call(this, dirtyRegion);
      if (this.grid && this.$canvas) {
        var canvas = this.$canvas.get(0);
        var ctx = canvas.getContext('2d');
        if (!dirtyRegion)
          dirtyRegion = new AWT.Rectangle(0, 0, canvas.width, canvas.height);
        ctx.clearRect(dirtyRegion.pos.x, dirtyRegion.pos.y, dirtyRegion.dim.width, dirtyRegion.dim.height);
        this.grid.update(ctx, dirtyRegion, this);
        this.bb.update(ctx, dirtyRegion, this);
      }
      return this;
    },
    //
    // Calculates the optimal dimension of this panel
    setDimension: function (preferredMaxSize) {
      if (!this.grid || !this.bb || this.getBounds().equals(preferredMaxSize))
        return preferredMaxSize;
      else
        return BoxBag.layoutDouble(preferredMaxSize, this.grid, this.bb, this.act.boxGridPos, this.act.margin);
    },
    //
    // Set the size and position of this activity panel
    setBounds: function (rect) {

      if (this.$canvas) {
        this.$canvas.remove();
        this.$canvas = null;
      }

      ActPanelAncestor.setBounds.call(this, rect);
      if (this.grid) {
        // Create the main canvas
        this.$canvas = $('<canvas width="' + rect.dim.width + '" height="' + rect.dim.height + '"/>').css({
          position: 'absolute',
          top: 0,
          left: 0
        });
        this.$div.append(this.$canvas);

        // Repaint all
        this.invalidate().update();
      }
    },
    // 
    // Main handler to receive mouse and key events
    // Overrides same function in Activity.Panel
    processEvent: function (event) {
      if (this.playing) {
        switch (event.type) {
          case 'click':
            // 
            // The [AWT.Point](AWT.html#Point) where the mouse or touch event has been originated
            // Touch events can have more than one touch, so `pageX` must be obtained from `touches[0]`
            var x = (event.originalEvent && event.originalEvent.touches) ? event.originalEvent.touches[0].pageX : event.pageX;
            var y = (event.originalEvent && event.originalEvent.touches) ? event.originalEvent.touches[0].pageY : event.pageY;
            var p = new AWT.Point(x - this.$div.offset().left, y - this.$div.offset().top);

            this.ps.stopMedia(1);
            if (this.grid.contains(p)) {
              var pt = this.grid.getLogicalCoords(p);
              if (pt !== null) {
                this.setCursorAt(pt.x, pt.y);
                if (K.TOUCH_DEVICE) {
                  // We are in a touch device, so prompt user to write text:
                  var d = (this.advance === 'ADVANCE_DOWN');
                  var txt = window.prompt((d ? 'Vertical' : 'Horizontal') + ' word:', '');
                  this.writeChars(txt);
                }
              }
            }
            else if (this.hClue.contains(p))
              this.hClue.playMedia(this.ps);
            else if (this.vClue.contains(p))
              this.vClue.playMedia(this.ps);
            else if (this.hClueBtn.contains(p)) {
              if (this.advance === 'ADVANCE_RIGHT')
                this.advance = 'NO_ADVANCE';
              else
                this.advance = 'ADVANCE_RIGHT';
              this.setBtnStatus();
            }
            else if (this.vClueBtn.contains(p)) {
              if (this.advance === 'ADVANCE_DOWN')
                this.advance = 'NO_ADVANCE';
              else
                this.advance = 'ADVANCE_DOWN';
              this.setBtnStatus();
            }
            else
              break;

            this.update();
            break;

          case 'keypress':
            var code = event.charCode || event.keyCode;
            var cur = this.grid.getCursor();
            if (code && cur) {
              event.preventDefault();
              var ch = String.fromCharCode(code);
              this.writeChars(ch);
            }
            break;

          case 'keydown':
            var dx = 0, dy = 0;
            switch (event.keyCode) {
              case K.VK.RIGHT:
                dx = 1;
                break;
              case K.VK.LEFT:
                dx = -1;
                break;
              case K.VK.DOWN:
                dy = 1;
                break;
              case K.VK.UP:
                dy = -1;
                break;
            }
            if (dx || dy) {
              event.preventDefault();
              this.moveCursor(dx, dy);
              this.update();
            }
            break;
        }
      }
    },
    //
    // Moves the cursor the specified dx and dy amount (in logical coordinates)
    // dx (Number)
    // dy (Number)
    moveCursor: function (dx, dy) {
      if (this.grid) {
        this.grid.moveCursor(dx, dy, true);
        this.cursorPosChanged();
      }
    },
    //
    // Places the cursor at the specified location (logical coordinates)
    setCursorAt: function (x, y) {
      this.grid.setCursorAt(x, y, true);
      this.cursorPosChanged();
    },
    //
    // Called when the cursor moves to a different location
    cursorPosChanged: function () {
      var pt = this.grid.getCursor();
      if (pt !== null && this.bb !== null) {
        var items = this.grid.getItemFor(pt.x, pt.y);
        if (items !== null) {
          this.hClue.setContent(this.act.abc['acrossClues'].getActiveBoxContentWith(pt.y, items.x));
          this.vClue.setContent(this.act.abc['downClues'].getActiveBoxContentWith(pt.x, items.y));
        }
      }
    },
    //
    // Writes a string on the grid
    writeChars: function (txt, x, y) {
      if (txt && txt.length > 0) {
        for (var i = 0; i < txt.length; i++) {
          var cur = this.grid.getCursor();
          var ch = txt.charAt(i);
          if (this.act.upperCase)
            ch = ch.toLocaleUpperCase();
          this.grid.setCharAt(cur.x, cur.y, ch);
          var ok = this.grid.isCellOk(cur.x, cur.y, this.act.checkCase);
          var r = this.getCurrentScore();
          this.ps.reportNewAction(this.act, 'WRITE', ch, 'X:' + cur.x + ' Y:' + cur.y, ok, r);
          // End activity or play event sound
          if (r === this.numLetters) {
            this.grid.setCursorEnabled(false);
            this.grid.stopCursorBlink();
            this.finishActivity(true);
          }
          else {
            this.playEvent('click');
            if (this.advance === 'ADVANCE_DOWN')
              this.moveCursor(0, 1);
            else
              this.moveCursor(1, 0);
          }
        }
      }
      this.update();
    },
    //
    // Sets the status of horizontal and vertical buttons based on the value of `advance`
    setBtnStatus: function () {
      if (this.hClueBtn)
        this.hClueBtn.setInactive(this.advance !== 'ADVANCE_RIGHT');
      if (this.vClueBtn)
        this.vClueBtn.setInactive(this.advance !== 'ADVANCE_DOWN');
    },
    //
    // Icons for horizontal and vertical directions:
    hIcon: 'data:image/svg+xml;base64,' +
        'PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIGZpbGw9IiNGRkZGRkYi' +
        'IGhlaWdodD0iMzYiIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjM2IiB4bWxucz0iaHR0cDov' +
        'L3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUi' +
        'PjwvcGF0aD48cGF0aCBkPSJNNiAxMGMtMS4xIDAtMiAuOS0yIDJzLjkgMiAyIDIgMi0uOSAyLTIt' +
        'LjktMi0yLTJ6bTEyIDBjLTEuMSAwLTIgLjktMiAycy45IDIgMiAyIDItLjkgMi0yLS45LTItMi0y' +
        'em0tNiAwYy0xLjEgMC0yIC45LTIgMnMuOSAyIDIgMiAyLS45IDItMi0uOS0yLTItMnoiPjwvcGF0' +
        'aD48L3N2Zz4K',
    vIcon: 'data:image/svg+xml;base64,' +
        'PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIGZpbGw9IiNGRkZGRkYi' +
        'IGhlaWdodD0iMzYiIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjM2IiB4bWxucz0iaHR0cDov' +
        'L3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUi' +
        'PjwvcGF0aD48cGF0aCBkPSJNMTIgOGMxLjEgMCAyLS45IDItMnMtLjktMi0yLTItMiAuOS0yIDIg' +
        'LjkgMiAyIDJ6bTAgMmMtMS4xIDAtMiAuOS0yIDJzLjkgMiAyIDIgMi0uOSAyLTItLjktMi0yLTJ6' +
        'bTAgNmMtMS4xIDAtMiAuOS0yIDJzLjkgMiAyIDIgMi0uOSAyLTItLjktMi0yLTJ6Ij48L3BhdGg+' +
        'PC9zdmc+Cg==',
    icoSize: {w: 36, h: 36},
    icoBB: new BoxBase().set('backColor', '#4285F4').set('inactiveColor', '#70A2F6')
  };

  // CrossWord.Panel extends Activity.Panel
  CrossWord.Panel.prototype = $.extend(Object.create(ActPanelAncestor), CrossWord.Panel.prototype);

  // 
  // Register class in Activity.prototype
  Activity.CLASSES['@textGrid.CrossWord'] = CrossWord;

  return CrossWord;

});
