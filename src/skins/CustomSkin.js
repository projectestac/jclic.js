/**
 *  File    : skins/CustomSkin.js
 *  Created : 12/02/2018
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

/* global define */

define([
  "jquery",
  "./Skin",
  "./Counter",
  "../Utils",
  "../AWT",
  "../boxes/ActiveBox"
], function ($, Skin, Counter, Utils, AWT, ActiveBox) {

  /**
   * Custom {@link Skin} for JClic.js, built assembling specific cuts of a canvas (usually a PNG file) defined in an XML file
   * @exports CustomSkin
   * @class
   * @extends Skin
   */
  class CustomSkin extends Skin {

    /**
     * CustomSkin constructor
     * 
     * @param {PlayStation} ps - The PlayStation (currently a {@link JClicPlayer}) used to load and
     * realize the media objects needed tot build the Skin.
     * @param {string=} name - The skin class name
     * @param {object=} options - Optional parameter with additional options
     */
    constructor(ps, name = null, options = null) {
      // CustomSkin extends [Skin](Skin.html)
      super(ps, name, options);
      //console.log(this.options)

      this.$mainPanel = $('<div/>', { class: 'JClicCustomMainPanel' });
      this.$gridPanel = $('<div/>', { class: 'JClicGridPanel' });
      for (let i = 0; i < 9; i++)
        this.$gridPanel.append($('<div/>', { class: `JClicCell JClicCell${i + 1}` }));
      this.$mainPanel.append(this.$gridPanel);
      this.$playerCnt.detach().addClass('JClicPlayerCell').appendTo(this.$mainPanel);
      this.$div.prepend(this.$mainPanel);

      // Add buttons
      if (options.buttons) {
        Object.keys(options.buttons.button).forEach(k => {
          const k2 = k === 'about' ? 'reports' : k;
          const msg = ps.getMsg(this.msgKeys[k2] || k2);
          this.buttons[k2] = $('<button/>', { class: `JClicBtn JClicTransform Btn-${k2}`, title: msg, 'aria-label': msg, disabled: typeof this.msgKeys[k2] === 'undefined' })
            .on('click', evt => { if (ps.actions[k2]) ps.actions[k2].processEvent(evt); });
          this.$mainPanel.append(this.buttons[k2]);
        });
      }

      // Add message box
      if (options.rectangle.messages) {
        this.msgBox = new ActiveBox();
        this.msgBox.role = 'message';
        this.$msgBoxDiv = $('<div/>', { class: 'JClicMsgBox' })
          .click(() => {
            this.msgBox.playMedia(ps);
            return false;
          });
        this.$mainPanel.append(this.$msgBoxDiv);
      }

      // Add counters
      if (false !== this.ps.options.counters && options.counters && options.counters.counter) {
        $.each(Skin.prototype.counters, (name, _val) => {
          if (options.counters.counter[name]) {
            const msg = ps.getMsg(name);
            this.counters[name] = new Counter(name, $('<div/>', { class: `JClicCounter JClicTransform Counter-${name}`, title: msg, 'aria-label': msg })
              .html('000')
              .appendTo(this.$mainPanel));
          }
        });
      }

      // Add progress animation
      if (options.progressAnimation) {
        this.$progressAnimation = $('<div/>', { class: 'JClicProgressAnimation JClicTransform' });
        this.$mainPanel.append(this.$progressAnimation);
      }

    }

    /**
     * Enables or disables the `tabindex` attribute of the main buttons. Useful when a modal dialog
     * overlay is active, to avoid direct access to controls not related with the dialog.
     * @param {boolean} status - `true` to make main controls navigable, `false` otherwise
     */
    enableMainButtons(status) {
      this.$mainPanel.find('.JClicBtn').attr('tabindex', status ? '0' : '-1');
    }

    /**
     * Computes the CSS styles used by this skin in thre moodes: main, half ant twoThirds.
     * The resulting strings will be stored in `cssVariants`
     * @returns {string}
     */
    _computeStyleSheets() {
      const
        maxw = this.options.dimension.preferredSize.width,
        maxh = this.options.dimension.preferredSize.height;

      this.twoThirdsMedia = { width: maxw, height: maxh };
      this.halfMedia = {
        width: Math.round(2 * maxw / 3),
        height: Math.round(2 * maxh / 3)
      };

      // Panels:
      const
        ph0 = this.options.rectangle.frame.left,
        ph1 = ph0 + this.options.rectangle.player.left,
        ph2 = ph0 + this.options.slicer.left,
        ph3 = ph0 + this.options.slicer.right,
        ph4 = ph1 + this.options.rectangle.player.width,
        ph5 = ph0 + this.options.rectangle.frame.width,
        pv0 = this.options.rectangle.frame.top,
        pv1 = pv0 + this.options.rectangle.player.top,
        pv2 = pv0 + this.options.slicer.top,
        pv3 = pv0 + this.options.slicer.bottom,
        pv4 = pv1 + this.options.rectangle.player.height,
        pv5 = pv0 + this.options.rectangle.frame.height,
        imgElement = this.ps.project.mediaBag.getElement(this.options.image, true),
        imgUrl = imgElement.data && imgElement.data.src ? imgElement.data.src : '',
        box1 = imgElement.data ? Utils.getImgClipUrl(imgElement.data, new AWT.Rectangle(ph0, pv0, ph2 - ph0, pv2 - pv0)) : '',
        box2 = imgElement.data ? Utils.getImgClipUrl(imgElement.data, new AWT.Rectangle(ph2 - ph0, pv0, ph3 - ph2, pv2 - pv0)) : '',
        box3 = imgElement.data ? Utils.getImgClipUrl(imgElement.data, new AWT.Rectangle(ph3, pv0, ph5 - ph3, pv2 - pv0)) : '',
        box4 = imgElement.data ? Utils.getImgClipUrl(imgElement.data, new AWT.Rectangle(ph0, pv2 - pv0, ph2 - ph0, pv3 - pv2)) : '',
        box6 = imgElement.data ? Utils.getImgClipUrl(imgElement.data, new AWT.Rectangle(ph3 - ph0, pv2 - pv0, ph5 - ph3, pv3 - pv2)) : '',
        box7 = imgElement.data ? Utils.getImgClipUrl(imgElement.data, new AWT.Rectangle(ph0, pv3 - pv0, ph2 - ph0, pv5 - pv3)) : '',
        box8 = imgElement.data ? Utils.getImgClipUrl(imgElement.data, new AWT.Rectangle(ph2 - ph0, pv3 - pv0, ph3 - ph2, pv5 - pv3)) : '',
        box9 = imgElement.data ? Utils.getImgClipUrl(imgElement.data, new AWT.Rectangle(ph3, pv3 - pv0, ph5 - ph3, pv5 - pv3)) : '';

      let css = `
.ID .JClicCustomMainPanel {flex-grow:1;position:relative;background-color: ${Utils.checkColor(this.options.color.fill.value)};}
.ID .JClicGridPanel {position:absolute;width:100%;height:100%;display:grid;grid-template-columns:${ph2 - ph0}px 1fr ${ph5 - ph3}px;grid-template-rows:${pv2 - pv0}px 1fr ${pv5 - pv3}px;}
.ID .JClicCell {background-repeat:no-repeat;background-size:contain;}
.ID .JClicPlayerCell {position:absolute;top:${pv1 - pv0}px;right:${ph5 - ph4}px;bottom:${pv5 - pv4}px;left:${ph1 - ph0}px;}
.ID .JClicCell1 {background-image:url(${box1});}
.ID .JClicCell2 {background-image:url(${box2});background-repeat:repeat-x;}
.ID .JClicCell3 {background-image:url(${box3});}
.ID .JClicCell4 {background-image:url(${box4});background-repeat:repeat-y;}
.ID .JClicCell5 {}
.ID .JClicCell6 {background-image:url(${box6});background-repeat:repeat-y;}
.ID .JClicCell7 {background-image:url(${box7});}
.ID .JClicCell8 {background-image:url(${box8});background-repeat:repeat-x;}
.ID .JClicCell9 {background-image:url(${box9});}`;

      let cssHalf = `
.ID .JClicGridPanel {grid-template-columns:${Math.round((ph2 - ph0) / 2)}px 1fr ${Math.round((ph5 - ph3) / 2)}px;grid-template-rows:${Math.round((pv2 - pv0) / 2)}px 1fr ${Math.round((pv5 - pv3) / 2)}px;}
.ID .JClicPlayerCell {top:${Math.round((pv1 - pv0) / 2)}px;right:${Math.round((ph5 - ph4) / 2)}px;bottom:${Math.round((pv5 - pv4) / 2)}px;left:${Math.round((ph1 - ph0) / 2)}px;}
.ID .JClicTransform {transform: scale(0.5);}`;

      let cssTwoThirds = `
.ID .JClicGridPanel {grid-template-columns:${Math.round(2 * (ph2 - ph0) / 3)}px 1fr ${Math.round(2 * (ph5 - ph3) / 3)}px;grid-template-rows:${Math.round(2 * (pv2 - pv0) / 3)}px 1fr ${Math.round(2 * (pv5 - pv3) / 3)}px;}
.ID .JClicPlayerCell {top:${Math.round(2 * (pv1 - pv0) / 3)}px;right:${Math.round(2 * (ph5 - ph4) / 3)}px;bottom:${Math.round(2 * (pv5 - pv4) / 3)}px;left:${Math.round(2 * (ph1 - ph0) / 3)}px;}
.ID .JClicTransform {transform: scale(0.666);}`;

      // Buttons:
      if (this.options.buttons) {
        const bt = this.options.buttons;
        let wBase = 30, hBase = 30, offsetBase = {};
        if (bt.settings) {
          if (bt.settings.dimension) {
            wBase = bt.settings.dimension.width || wBase;
            hBase = bt.settings.dimension.height || hBase;
          }
          if (bt.settings.offset)
            Object.assign(offsetBase, bt.settings.offset);
        }
        Object.keys(this.options.buttons.button).forEach(k => {
          const
            btn = bt.button[k],
            k2 = k === 'about' ? 'reports' : k;
          let w = wBase, h = hBase, offset = offsetBase;
          if (btn.settings) {
            if (btn.settings.dimension) {
              w = btn.settings.dimension.width || w;
              h = btn.settings.dimension.height || h;
            }
            if (btn.settings.offset)
              offset = Object.assign({}, offsetBase, btn.settings.offset);
          }
          const
            x = btn.point.pos.left,
            xp = x < ph2 ? `left:${x}` : `right:${ph5 - x - w}`,
            xpHalf = x < ph2 ? `left:${Math.round(x / 2 - w / 4)}` : `right:${Math.round((ph5 - x - w) / 2 - w / 4)}`,
            xpTwoThirds = x < ph2 ? `left:${Math.round(2 * x / 3 - w / 6)}` : `right:${Math.round(2 * (ph5 - x - w) / 3 - w / 6)}`,
            y = btn.point.pos.top,
            yp = y < pv2 ? `top:${y}` : `bottom:${pv5 - y - h}`,
            ypHalf = y < pv2 ? `top:${Math.round(y / 2 - h / 4)}` : `bottom:${Math.round((pv5 - y - h) / 2 - h / 4)}`,
            ypTwoThirds = y < pv2 ? `top:${Math.round(2 * y / 3 - h / 6)}` : `bottom:${Math.round(2 * (pv5 - y - h) / 3 - h / 6)}`,
            xs = btn.point.source.left,
            ys = btn.point.source.top;
          css += `.ID .Btn-${k2} {position:absolute;${xp}px;${yp}px;width:${w}px;height:${h}px;background:url(${imgUrl}) !important;background-position:-${xs}px -${ys}px !important;}\n`;
          cssHalf += `.ID .Btn-${k2} {${xpHalf}px;${ypHalf}px;}\n`;
          cssTwoThirds += `.ID .Btn-${k2} {${xpTwoThirds}px;${ypTwoThirds}px;}\n`;
          if (offset.active)
            css += `.ID .Btn-${k2}:active {background-position:-${xs + offset.active.right}px -${ys + offset.active.down}px !important;}\n`;
          if (offset.over)
            css += `.ID .Btn-${k2}:hover {background-position:-${xs + offset.over.right}px -${ys + offset.over.down}px !important;}\n`;
          if (offset.disabled)
            css += `.ID .Btn-${k2}:disabled {background-position:-${xs + offset.disabled.right}px -${ys + offset.disabled.down}px !important;}\n`;
        });
      }

      // Counters:
      if (this.options.counters && this.options.counters.settings) {
        const cnt = this.options.counters;
        let wBase = 35, hBase = 20;
        if (cnt.settings.dimension && cnt.settings.dimension.counter) {
          wBase = (cnt.settings.dimension.counter.width || wBase);
          hBase = cnt.settings.dimension.counter.height || hBase;
        }
        let wLb = 37, hLb = 14;
        if (cnt.settings.dimension && cnt.settings.dimension.label) {
          wLb = (cnt.settings.dimension.label.width || wLb);
          hLb = cnt.settings.dimension.label.height || hLb;
        }
        let bColor = 'black';
        if (cnt.style && cnt.style.color && cnt.style.color.foreground)
          bColor = Utils.checkColor(cnt.style.color.foreground.value || bColor);
        let lbFntSize = hLb - 4;
        let lbFntFamily = 'Roboto';
        if (cnt.style && cnt.style.font && cnt.style.font.label) {
          lbFntSize = Math.max(8, cnt.style.font.label.size || lbFntSize);
          lbFntFamily = `${cnt.style.font.label.family || 'Roboto'},Roboto,sans-serif`;
        }

        css += `.ID .JClicCounter {font-size:${hBase - 2}px;color:${bColor}}\n`;
        Object.keys(this.options.counters.counter).forEach(k => {
          const
            counter = cnt.counter[k];
          let w = wBase, h = hBase;
          const
            x = counter.point.counter.left,
            xl = counter.point.label.left || (x - Math.round((wLb - wBase) / 2)),
            xp = x < ph2 ? `left:${x}` : `right:${ph5 - x - w}`,
            xpHalf = x < ph2 ? `left:${Math.round(x / 2 - w / 4)}` : `right:${Math.round((ph5 - x - w) / 2 - w / 4)}`,
            xpTwoThirds = x < ph2 ? `left:${Math.round(2 * x / 3 - w / 6)}` : `right:${Math.round(2 * (ph5 - x - w) / 3 - w / 6)}`,
            y = counter.point.counter.top,
            yl = counter.point.label.top || (y - hLb),
            yp = y < pv2 ? `top:${y}` : `bottom:${pv5 - y - h}`,
            ypHalf = y < pv2 ? `top:${Math.round(y / 2 - h / 4)}` : `bottom:${Math.round((pv5 - y - h) / 2 - h / 4)}`,
            ypTwoThirds = y < pv2 ? `top:${Math.round(2 * y / 3 - h / 6)}` : `bottom:${Math.round(2 * (pv5 - y - h) / 3 - h / 6)}`;
          // counter:
          css += `.ID .Counter-${k} {position:absolute;${xp}px;${yp}px;width:${w}px;height:${h}px;line-height:${h}px;}\n`;
          // label:
          css += `.ID .Counter-${k}:before {content:"${this.ps.getMsg(k)}";font-size:${lbFntSize}px;font-family:${lbFntFamily};width:${wLb}px;height:${hLb}px;line-height:${hLb}px;position:absolute;top:${yl - y}px;left:${xl - x}px;}`;
          // reduced sizes:
          cssHalf += `.ID .Counter-${k} {${xpHalf}px;${ypHalf}px;}\n`;
          cssTwoThirds += `.ID .Counter-${k} {${xpTwoThirds}px;${ypTwoThirds}px;}\n`;
        });
      }

      // Progress animation:
      if (this.options.progressAnimation) {
        const pa = this.options.progressAnimation;
        let w = 30, h = 30;
        if (pa.dimension) {
          w = pa.dimension.width || w;
          h = pa.dimension.height || h;
        }
        const
          x = pa.point.pos.left,
          xp = x < ph2 ? `left:${x}` : `right:${ph5 - x - w}`,
          xpHalf = x < ph2 ? `left:${Math.round(x / 2 - w / 4)}` : `right:${Math.round((ph5 - x - w) / 2 - w / 4)}`,
          xpTwoThirds = x < ph2 ? `left:${Math.round(2 * x / 3 - w / 6)}` : `right:${Math.round(2 * (ph5 - x - w) / 3 - w / 6)}`,
          y = pa.point.pos.top,
          yp = y < pv2 ? `top:${y}` : `bottom:${pv5 - y - h}`,
          ypHalf = y < pv2 ? `top:${Math.round(y / 2 - h / 4)}` : `bottom:${Math.round((pv5 - y - h) / 2 - h / 4)}`,
          ypTwoThirds = y < pv2 ? `top:${Math.round(2 * y / 3 - h / 6)}` : `bottom:${Math.round(2 * (pv5 - y - h) / 3 - h / 6)}`,
          xs = pa.point.source.left,
          ys = pa.point.source.top;
        css += `.ID .JClicProgressAnimation {position:absolute;${xp}px;${yp}px;width:${w}px;height:${h}px;background:url(${imgUrl});background-position:-${xs}px -${ys}px;}\n`;
        cssHalf += `.ID .JClicProgressAnimation {${xpHalf}px;${ypHalf}px;}\n`;
        cssTwoThirds += `.ID .JClicProgressAnimation {${xpTwoThirds}px;${ypTwoThirds}px;}\n`;

        if (pa.frames && pa.direction) {
          const
            dx = (pa.step || w) * (pa.direction === 'right' ? 1 : pa.direction === 'left' ? -1 : 0),
            dy = (pa.step || h) * (pa.direction === 'down' ? 1 : pa.direction === 'up' ? -1 : 0);
          css += `\n@keyframes anim {100% {background-position:${(xs + dx * pa.frames) * -1}px ${(ys + dy * pa.frames) * -1}px;}}\n.ID .JClicProgressAnimation {animation: anim ${pa.frames * pa.delay}ms steps(${pa.frames}) infinite;}`;
        }
      }

      // Messages box:
      if (this.options.rectangle.messages) {
        const
          bx = this.options.rectangle.messages,
          left = ph0 + bx.left,
          right = ph5 - bx.width - bx.left - ph0,
          tb = bx.top < pv2 ? `top:${bx.top}` : `bottom:${pv5 - bx.height - bx.top}`,
          tbHalf = bx.top < pv2 ? `top:${Math.round(bx.top / 2)}` : `bottom:${Math.round((pv5 - bx.height - bx.top) / 2)}`,
          tbTwoThirds = bx.top < pv2 ? `top:${Math.round(2 * bx.top / 3)}` : `bottom:${Math.round(2 * (pv5 - bx.height - bx.top) / 3)}`;

        css += `.ID .JClicMsgBox {position:absolute;left:${left}px;right:${right}px;height:${bx.height}px;${tb}px;}`;
        cssHalf += `.ID .JClicMsgBox {left:${Math.round(left / 2)}px;right:${Math.round(right / 2)}px;height:${Math.round(bx.height / 2)}px;${tbHalf}px;}`;
        cssTwoThirds += `.ID .JClicMsgBox {left:${Math.round(2 * left / 3)}px;right:${Math.round(2 * right / 3)}px;height:${Math.round(2 * bx.height / 3)}px;${tbTwoThirds}px;}`;
      }

      // TODO: Implement status messages?

      // Store results in `cssVariants`
      this.cssVariants = {
        default: this.mainCSS + css,
        half: cssHalf,
        twoThirds: cssTwoThirds
      };
    }

    /**
     * Returns the CSS styles used by this skin. This method should be called only from
     * the `Skin` constructor, and overridded by subclasses if needed.
     * @param {string} media - A specific media size. Possible values are: 'default', 'half' and 'twoThirds'
     * @override
     * @returns {string}
     */
    _getStyleSheets(media = 'default') {
      if (!this.cssVariants)
        this._computeStyleSheets();
      return `${super._getStyleSheets(media)}${this.cssVariants[media] || ''}`;
    }

    /**
     * Gets the {@link ActiveBox} used to display the main messages of activities
     * @returns {ActiveBox}
     */
    getMsgBox() {
      return this.msgBox;
    }

    /**
     * Sets/unsets the 'wait' state
     * @override
     * @param {boolean} status - Whether to set or unset the wait status. When `undefined`, the
     * `waitCursorCount` member is evaluated to decide if the wait state should be activated or deactivated.
     */
    setWaitCursor(status) {
      super.setWaitCursor(status);
      if (this.$progressAnimation)
        this.$progressAnimation.css('animation-play-state', this.waitCursorCount > 0 ? 'running' : 'paused');
    }

  }

  Object.assign(CustomSkin.prototype, {
    /**
     * Class name of this skin. It will be used as a base selector in the definition of all CSS styles.
     * @name CustomSkin#skinId
     * @override
     * @type {string} */
    skinId: 'JClicCustomSkin',
    /**
     * The name of the image file to be used as a base of this skin.
     * @name CustomSkin#imgName
     * @type {string} */
    imgName: null,
    /**
     * Styles used in this skin
     * @name CustomSkin#skinCSS
     * @override
     * @type {string} */
    mainCSS: '\
.ID .JClicPlayerCnt {margin:0;}\
.ID .JClicBtn:focus {outline:0;}\
.ID .JClicCounter {font-family:Roboto,sans-serif;text-align:center;}',
    /**
     * Specifc styles (`default`, `half` and `twoThirds`) computed at run-time,
     * based on the provided XML file
     * @name CustomSkin#cssVariants
     * @type {object} */
    cssVariants: null,
    /**
     * Key ids of currently supported buttons, associated with its helper literal
     * @name CustomSkin#msgKeys
     * @type {object} */
    msgKeys: {
      next: 'Next activity',
      prev: 'Previous activity',
      info: 'Information',
      help: 'Help',
      reports: 'Reports',
      // TODO: Implement audio on/off!
      audio: 'Audio on/off',
      reset: 'Reset activity',
    },
    /**
     * Graphic indicator of loading progress
     * @name Skin#$progressAnimation
     * @type {external:jQuery} */
    $progressAnimation: null,
  });

  // Register this class in the list of available skins
  Skin.CLASSES['custom'] = CustomSkin;

  return CustomSkin;
});
