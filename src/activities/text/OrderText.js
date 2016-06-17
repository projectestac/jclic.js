//    File    : Order.js  
//    Created : 20/06/2015  
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
  "./TextActivityBase",
  "../../boxes/BoxConnector",
  "../../AWT"
], function ($, Activity, TextActivityBase, BoxConnector, AWT) {

  /**
   * In this type of text activity users must put in order some words or paragrafs that have been
   * initially scrambled.
   * @exports OrderText
   * @class
   * @extends TextActivityBase
   * @param {JClicProject} project - The project to which this activity belongs
   */
  var OrderText = function (project) {
    TextActivityBase.call(this, project);
  };

  OrderText.prototype = {
    constructor: OrderText,
    /**
     * Whether to allow or not to scramble words among different paragraphs.
     * @type {boolean} */
    amongParagraphs: false,
    /**
     * The box connector
     * @type {BoxConnector} */
    bc: null,
    /**
     * 
     * Whether or not the activity uses random to scramble internal components
     * @returns {boolean}
     */
    hasRandom: function () {
      return true;
    },
    /**
     * 
     * When `true`, the activity mut always be scrambled
     * @returns {boolean}
     */
    shuffleAlways: function () {
      return true;
    },
    /**
     * 
     * Whether the activity allows the user to request help.
     * @returns {boolean}
     */
    helpSolutionAllowed: function () {
      return true;
    }
  };

  // OrderText extends TextActivityBase
  OrderText.prototype = $.extend(Object.create(TextActivityBase.prototype), OrderText.prototype);

  /**
   * The {@link TextActivityBase.Panel} where this kind of text activities are played.
   * @class
   * @extends TextActivityBase.Panel
   * @param {Activity} act - The {@link Activity} to wich this Panel belongs
   * @param {JClicPlayer} ps - Any object implementing the methods defined in the 
   * [PlayStation](http://projectestac.github.io/jclic/apidoc/edu/xtec/jclic/PlayStation.html)
   * Java interface.
   * @param {external:jQuery=} $div - The jQuery DOM element where this Panel will deploy
   */
  OrderText.Panel = function (act, ps, $div) {
    TextActivityBase.Panel.call(this, act, ps, $div);
  };

  // Properties and methods specific to OrderText.Panel
  var ActPanelAncestor = TextActivityBase.Panel.prototype;
  OrderText.Panel.prototype = {
    constructor: OrderText.Panel,
    /**
     * Currently selected text target
     * @type {TextActivityDocument.TextTarget} */
    currentTarget: null,
    /**
     * The box connector
     * @type {BoxConnector} */
    bc: null,
    /**
     * List of mouse, touch and keyboard events intercepted by this panel
     * @type {string[]} */
    events: ['click', 'mousemove'],
    /**
     * 
     * Prepares the text panel
     */
    buildVisualComponents: function () {
      this.act.document.style['target'].css.cursor = 'pointer';
      ActPanelAncestor.buildVisualComponents.call(this);
    },
    /**
     * 
     * Sets the size and position of this activity panel
     * @param {AWT.Rectangle} rect
     */
    setBounds: function (rect) {
      if (this.$canvas)
        this.$canvas.remove();
      
      ActPanelAncestor.setBounds.call(this, rect);
      if (!this.act.dragCells) {
        // Create the main canvas
        this.$canvas = $('<canvas width="' + rect.dim.width + '" height="' + rect.dim.height + '"/>').css({
          position: 'absolute',
          top: 0,
          left: 0,
          'pointer-events': 'none'
        });
        this.$div.append(this.$canvas);

        // Create a [BoxConnector](BoxConnector.html) and attach it to the canvas context
        this.bc = new BoxConnector(this, this.$canvas.get(0).getContext('2d'));
        this.bc.compositeOp = this.bc.DEFAULT_COMPOSITE_OP;

        // Repaint all
        this.invalidate().update();
      }
    },
    /**
     * 
     * Creates a target DOM element for the provided target.
     * @param {TextActivityDocument.TextTarget} target - The target related to the DOM object to be created
     * @param {external:jQuery} $span -  - An initial DOM object (usually a `span`) that can be used
     * to store the target, or replaced by another type of object.
     * @returns {external:jQuery} - The jQuery DOM element loaded with the target data.
     */
    $createTargetElement: function (target, $span) {

      ActPanelAncestor.$createTargetElement.call(this, target, $span);

      var id = this.targets.length - 1;
      var idLabel = 'target' + ('000' + id).slice(-3);
      var panel = this;

      $span.addClass('JClicTextTarget').bind('click', function (event) {
        event.textTarget = target;
        event.idLabel = idLabel;
        panel.processEvent(event);
      });

      return $span;
    },
    /**
     * Swaps the position of two targets in the document
     * @param {TextActivityDocument.TextTarget} t1 - One target
     * @param {TextActivityDocument.TextTarget} t2 - Another target
     */
    swapTargets: function (t1, t2) {
      var $span1 = t1.$span;
      var $span2 = t2.$span;
      var $marker = $('<span/>');
      $marker.insertAfter($span2);
      $span2.detach();
      $span2.insertAfter($span1);
      $span1.detach();
      $span1.insertAfter($marker);
      $marker.remove();

      var pos = t1.pos,
          $p = t1.$p;
      t1.pos = t2.pos;
      t1.$p = t2.$p;
      t2.pos = pos;
      t2.$p = $p;
    },
    /**
     * 
     * Basic initialization procedure
     */
    initActivity: function () {
      ActPanelAncestor.initActivity.call(this);

      if (!this.firstRun)
        this.buildVisualComponents();
      else
        this.firstRun = false;
    },
    /**
     * 
     * Called when the activity starts playing
     */
    startActivity: function () {
      ActPanelAncestor.startActivity.call(this);

      if (!this.showingPrevScreen) {
        if (this.act.type === 'orderWords' && !this.act.amongParagraphs) {
          // Group targets by paragraph
          var groups = [];
          var lastTarget = null;
          var currentGroup = [];

          for (var i in this.targets) {
            var t = this.targets[i];
            if (lastTarget !== null && lastTarget.$p !== t.$p) {
              groups.push(currentGroup);
              currentGroup = [];
            }
            currentGroup.push(t);
            lastTarget = t;
          }
          if (currentGroup.length > 0) {
            groups.push(currentGroup);
          }

          // Scramble group by group
          for (var g in groups) {
            this.shuffleTargets(groups[g], this.act.shuffles);
          }
        } else {
          this.shuffleTargets(this.targets, this.act.shuffles);
        }

        this.playing = true;
      }
      this.setBounds(this);
    },
    /**
     * 
     * Randomly shuffles a set of targets
     * @param {TextActivityDocument.TextTarget[]} targets - The set of targets to shuffle (can be all
     * document targets or just the targets belonging to the same paragraph, depending on the value of
     * `amongParagraphs` in {@link Activity}.
     * @param {number} steps - The number of times to shuffle the elements
     */
    shuffleTargets: function (targets, steps) {
      var nt = targets.length;
      if (nt > 1) {
        var repeatCount = 100;
        for (var i = 0; i < steps; i++) {
          var r1 = Math.floor(Math.random() * nt);
          var r2 = Math.floor(Math.random() * nt);
          if (r1 !== r2) {
            this.swapTargets(targets[r1], targets[r2]);
          } else {
            if (--repeatCount)
              i++;
          }
        }
      }
    },
    /**
     * 
     * Sets the current target
     * @param {TextActivityDocument.TextTarget} target - The currently selected target. Can be `null`.
     */
    setCurrentTarget: function (target) {
      var targetCss = this.act.document.getFullStyle('target').css;

      if (this.currentTarget && this.currentTarget.$span)
        this.currentTarget.$span.css(targetCss);

      if (target && target.$span) {
        target.$span.css({
          color: targetCss.background,
          background: targetCss.color});
      }

      this.currentTarget = target;
    },
    /**
     * 
     * Counts the number of targets that are at right position
     * @returns {number}
     */
    countSolvedTargets: function () {
      var solved = 0;
      var numTargets = this.targets.length;
      for (var i=0; i<numTargets; i++) {
        var t = this.targets[i];
        if (t.num === t.pos)
          solved++;
      }
      return solved;
    },
    /**
     * 
     * Evaluates all the targets in this panel. This method is usually called from the `Check` button.
     * @returns {boolean} - `true` when all targets are OK, `false` otherwise.
     */
    evaluatePanel: function () {
      
      if (this.bc && this.bc.active)
        this.bc.end();
      this.setCurrentTarget(null);
      
      var targetsOk = 0;
      var numTargets = this.targets.length;
      for (var i = 0; i < numTargets; i++) {
        var target = this.targets[i];
        var ok = (target.num === target.pos);
        target.targetStatus = ok ? 'SOLVED' : 'WITH_ERROR';
        if (ok)
          targetsOk++;
        target.checkColors();
        this.ps.reportNewAction(this.act, 'PLACE', target.text, target.pos, ok, targetsOk);
      }
      if (targetsOk === numTargets) {
        this.finishActivity(true);
        return true;
      } else {
        this.playEvent('finishedError');
      }
      return false;
    },
    /**
     * 
     * Ordinary ending of the activity, usually called form `processEvent`
     * @param {boolean} result - `true` if the activity was successfully completed, `false` otherwise
     */
    finishActivity: function (result) {
      $('.JClicTextTarget').css('cursor', 'pointer');
      return ActPanelAncestor.finishActivity.call(this, result);
    },
    /**
     * 
     * Main handler used to process mouse, touch, keyboard and edit events.
     * @param {HTMLEvent} event - The HTML event to be processed
     * @returns {boolean=} - When this event handler returns `false`, jQuery will stop its
     * propagation through the DOM tree. See: {@link http://api.jquery.com/on}
     */
    processEvent: function (event) {

      if (!ActPanelAncestor.processEvent.call(this, event))
        return false;

      var target = event.textTarget;

      var p = null;

      if (this.bc && this.playing && !this.showingPrevScreen) {

        // 
        // _touchend_ event don't provide pageX nor pageY information
        if (event.type === 'touchend') {
          p = this.bc.active ? this.bc.dest.clone() : new AWT.Point();
        } else {
          // Touch events can have more than one touch, so `pageX` must be obtained from `touches[0]`
          var x = event.originalEvent.touches ? event.originalEvent.touches[0].pageX : event.pageX,
              y = event.originalEvent.touches ? event.originalEvent.touches[0].pageY : event.pageY;
          p = new AWT.Point(x - this.$div.offset().left, y - this.$div.offset().top);
        }

        switch (event.type) {

          case 'click':
            if (target && target !== this.currentTarget) {
              if (this.currentTarget) {
                if (this.bc && this.bc.active)
                  this.bc.end();
                this.swapTargets(target, this.currentTarget);
                this.setCurrentTarget(null);

                if (!this.$checkButton) {
                  // Check and notify action
                  var cellsAtPlace = this.countSolvedTargets();
                  var ok = target.pos === target.num;
                  this.ps.reportNewAction(this.act, 'PLACE', target.text, target.pos, ok, cellsAtPlace);

                  // End activity or play event sound
                  if (ok && cellsAtPlace === this.targets.length)
                    this.finishActivity(true);
                  else
                    this.playEvent(ok ? 'actionOk' : 'actionError');
                }

              } else {
                this.setCurrentTarget(target);
                this.bc.begin(p);
                this.playEvent('click');
              }
            }
            break;

          case 'mousemove':
            this.bc.moveTo(p);
            break;

          default:
            break;
        }
        event.preventDefault();

        return true;
      }
    }
  };

  // OrderText.Panel extends TextActivityBase.Panel
  OrderText.Panel.prototype = $.extend(Object.create(ActPanelAncestor), OrderText.Panel.prototype);

  // Register class in Activity.prototype
  Activity.CLASSES['@text.Order'] = OrderText;

  return OrderText;
});
