/**
 *  File    : activities/panels/Menu.js
 *  Created : 20/07/2017
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
 *  (c) 2000-2016 Catalan Educational Telematic Network (XTEC)
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

define([
  "jquery",
  "../../Activity",
  "../../media/MediaContent",
  "../../Utils"
], function ($, Activity, MediaContent, Utils) {

  /**
   * This class of {@link Activity} is only used in legacy JClic project libraries. It contains
   * one or more buttons pointing to specific JClic projects or to other `Menu` activity panels.
   * @exports Menu
   * @class
   * @extends Activity
   * @param {JClicProject} project - The {@link JClicProject} to which this activity belongs
   */
  var Menu = function (project) {
    Activity.call(this, project);
    this.menuElements = [];
    // This kind of activities are not reported
    this.includeInReports = false;
    this.reportActions = false;
  };

  Menu.prototype = {
    constructor: Menu
  };

  // InformationScreen extends Activity
  Menu.prototype = $.extend(Object.create(Activity.prototype), Menu.prototype);

  /**
   * The {@link Activity.Panel} where Menu will show its content.
   * @class
   * @extends Activity.Panel
   * @param {Activity} act - The {@link Activity} to which this Panel belongs
   * @param {JClicPlayer} ps - Any object implementing the methods defined in the
   * [PlayStation](http://projectestac.github.io/jclic/apidoc/edu/xtec/jclic/PlayStation.html)
   * Java interface.
   * @param {external:jQuery=} $div - The jQuery DOM element where this Panel will deploy
   */
  Menu.Panel = function (act, ps, $div) {
    Activity.Panel.call(this, act, ps, $div);
  };

  var ActPanelAncestor = Activity.Panel.prototype;

  Menu.Panel.prototype = {
    constructor: Menu.Panel,
    /**
     * 
     * Default icons used in buttons, inherited from JClic
     */
    icons: {
      '@ico00.png': 'data:image/png;base64,\
iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAB1UExURUxpcZVZAGyAAGyAAJVZAJVZAJVZAIhmAJVZAJVZAJVZAIhmAGyAAGyAAGyA\
AGyAAGyAAJVZAJVZAGyAAJVZANj+AP+ZAMFzAPWSALVsANyEAM57AJ66AOiLALXVAM3xAK1nAI6oAIabAJWwAMTnAKFgAGyAAIlz9xYAAAAVdFJOUwB9oCIiZpkRRKq7M4BVu9VmVd1EzJvdA7gAAAE0\
SURBVDjLjZPZkoMgEEVFFsHdZBQR3M38/ycOKQ1gJKnpV051nwtNEPyrsjBNom9AqNSapxn8CBRjXY+DmjXkbQSXeq9tWJe7ByhVberXqzCY8yGM6GVK9FQ4SpVUxAwnJ+A+2wkLBLLppYgJRgZIrcJY\
BKxvdLUdFzE4mHBzFNDUvKoVdFfI7YQ1q7gD7LowXNRwaM4R6AzQEXNRWZrPT2jLA9YaQOIXQHV0WIbFvKZImPNGmLCMCwY0lJQQS6vAzEXFjY7Of5iORXwKySHe8+kWWwVeGQUnmW3QTMgDONUbhQ+A\
BAZwozkTqH1Ox8za3Jz3drLZDMABquuM9nFaKXZpwfFpp+j0ZiHJ21pifiIkQ++Lix+9nc+Z5/tQwrt2fxEBvN8vooQJLgTDX74xSi6z/wAoQC7hWsslMgAAAABJRU5ErkJggg==',

      '@ico01.png': 'data:image/png;base64,\
iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAByUExURUxpcfzZt/rfw/pycvrcv/3UrJqf/QAAAP/hxPvOov9sbPqFhYmN/f7nz3V4\
+/3ky/+AgPrIl11g/P/Klf+Kiv9XV//q1vtHR/rCim1w//pcXISI//tfX5WY/VNT///Dh/86OvwhISUl/js7+klM+vq6e8H/VfEAAAABdFJOUwBA5thmAAABGElEQVQ4y62T23aCMBBFiU48iQlELoJW\
7b3//4udBIi0MqsvDU+w95yEGSiK/15YrlVhd1+C8Nk05+ribzcvCJlXklBV3u/8pToLAnMk3kiCh0Hkz4LA/NSC+YcgANTWYP4OqVGmtmAuC2St2Mn4EMbq9TaPvABpDborD+OB0QqG8hbo3HTNAikF\
CtEZBTcMx+t+ewC2U4IyMAFUTgVd5nukHYlrqYcxSBlw15k/gTlXx/ySPT5NLOkyP7IQq0PoOd/wSZLgmLtD5AMLsS70ZbnZEL+LTQmZv6aEQIkrpTUlwWX+FhNCyNzaOiVkHgXODyHzFr87ye/3g+Nx\
GrTgJ6zNa8nXJ04zf4Ew88ylr8KM/At//sB88w0/sBcK3bRRzgAAAABJRU5ErkJggg==',

      '@ico02.png': 'data:image/png;base64,\
iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAtUExURUxpcQAAAP///8zMzJmZmfrdwP/hxPvOov3UrP3JlvzZt/zlzf/p0/zBh/rD\
jUN28cYAAAABdFJOUwBA5thmAAAAyklEQVQ4y6WT6w6DIAxG/YS2XHTv/7grLshF0C1r+KE5n6fFpMvybQHt6bldbXfQcazNsTD4MdCV+S+AQcBUBYa5M4BfHrcB8oNA08HLg0EeAiwOuGtBzoE0Mje4\
AO4S7QwhgDhlZrcISiNoqxzFoGbSb5Uyozhs4ckdD4M+OfQtUmeKcUsGnaQEyoSp/6YJIr2LXAPqp4OH4BzJtUXyZy7iBwbl8eSDALUc/Z/Sv1DxHfVm5ao5hjtIme+YbOnJMdlj/vCJoB5HX97wIgms\
7CtjdwAAAABJRU5ErkJggg==',

      '@ico03.png': 'data:image/png;base64,\
iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAwUExURUxpcQAAAPrdwP/hxP7mz/8AAAAAmfvOov3UrAAA//3JlvzZtwCZAP8A//zC\
ifq6e7UN6GsAAAABdFJOUwBA5thmAAABA0lEQVQ4y5WS2RbDIAhEHdyTJv3/vy2osVj1oR6zeYcBDcb8NV6v9fp1NV7mgq8cMs/cDWYHhrmomsM1pcj9pgS7FL3IZ6AI8nazsCiCnPOG3wf0QpArfDno\
GATC6mwc9oi/AtMFgAFFLQhDCuZcQ0yAMghB+cuNUgJpSVM1zg7phGUFpv3VFdB5gqxolpwdTqYO5EaPJ57PgWOZWgvt0bl4u+LAbwmzv0Q7JxquJM2FSpwTBRHvRU7Mey/E16f4FwfeSkpUBD26CIQ+\
PMajODTmaw0Dr7/V1zRVQCNvAvNw6QbFb5iWwvRaWKE4Vh3H/6LxG+ueROfYdXXlb+zavg/++ADYLwfSmmk9oQAAAABJRU5ErkJggg==',

      '@icofolder.png': 'data:image/png;base64,\
iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAnUExURUxpcffvhP///2VlZczMZv//zPf39+/nc8zMzDMzmZmZZrW1tbWttcl3sA0A\
AAABdFJOUwBA5thmAAAAgklEQVQ4y9WSQQ6AIAwEsVtFwf+/14JGbcHeTHSuO9kFQggfBE8BFwLR+mBwFGYSZvh53zjzZTdkLTXCkS/ViDHBCLe8Gla48qpkGEHl+8pdYJo0yOouPA2GhLLiCCyC28DI\
cAXZ0IfsVKS3BTGUMDas0E9NfkO/ovmQBv2v0BJ+xAaYuQX2hCJNtwAAAABJRU5ErkJggg=='
    },
    /**
     *
     * Prepares the visual components of the activity
     */
    buildVisualComponents: function () {

      if (this.firstRun)
        ActPanelAncestor.buildVisualComponents.call(this);

      var thisPanel = this;

      // This `div` will contain the action buttons
      var $btnDiv = $('<div/>').css({
        'width': '100%',
        'max-height': '100%',
        'position': 'absolute',
        'top': '50%',
        'transform': 'translateY(-50%)',
        'display': 'flex',
        'flex-wrap': 'wrap',
        'overflow-y': 'auto',
        'place-content': 'center',
        'overflow-y': 'auto'
      });

      this.act.menuElements.forEach(function (me) {

        // Create a button for each menu element
        var caption = me.description || me.caption || 'JClic';
        var $btn = $('<button/>', {
          class: 'StockBtn',
          title: caption,
          'aria-label': caption
        }).css({
          'min-width': '80px',
          'max-width': '200px',
          'min-height': '80px',
          'margin': '4px',
          'padding': '4px',
          'display': 'flex',
          'flex-direction': 'column',
          'justify-content': 'center',
          'align-items': 'center'
        })

        // Set the button icon
        var iconSrc = thisPanel.icons[me.icon || '@ico00.png'];
        var $img = $('<img/>', { src: iconSrc || '' }).css({
          'max-width': '180px',
          'max-height': '100px',
          'margin': '4px'
        });
        if (!iconSrc) {
          // It's not a stock image, so load `src` when available
          var mbe = thisPanel.act.project.mediaBag.getElement(me.icon, true);
          mbe.getFullPathPromise().then(function (imgFullPath) {
            $img.attr('src', imgFullPath);
          });
        }
        $btn.append($img);

        // Set the button text
        $btn.append($('<span/>').css({
          'max-width': '180px',
          'overflow': 'hidden',
          'white-space': 'nowrap',
          'text-overflow': 'ellipsis'
        }).html(me.caption));

        // Set a click listener method
        // $btn.on('click', function...) does not work!
        $btn[0].addEventListener('click', function (_ev) {
          var mc = new MediaContent(me.projectPath ? 'RUN_CLIC_PACKAGE' : 'RUN_CLIC_ACTIVITY', me.sequence);
          if (me.projectPath)
            mc.externalParam = me.projectPath;
          Utils.log('info', 'Launching %s %s', me.projectPath || '', me.sequence || '');
          thisPanel.ps.playMedia(mc);
        });

        // Place the created button on the container
        $btnDiv.append($btn);
      });

      // Add the buttons container on the main panel `div`
      thisPanel.$div.empty().append($btnDiv);
    },
    /**
     *
     * Sets the real dimension of this panel.
     * @param {AWT.Dimension} preferredMaxSize - The maximum surface available for the activity panel
     * @returns {AWT.Dimension}
     */
    setDimension: function (preferredMaxSize) {
      return preferredMaxSize;
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

      this.setAndPlayMsg('initial', 'start');
      this.playing = true;
    }
  };

  // Menu.Panel extends Activity.Panel
  Menu.Panel.prototype = $.extend(Object.create(ActPanelAncestor), Menu.Panel.prototype);

  // Register class in Activity.prototype
  Activity.CLASSES['@panels.Menu'] = Menu;

  return Menu;

});
