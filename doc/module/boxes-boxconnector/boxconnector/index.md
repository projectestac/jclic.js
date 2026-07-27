---
title: BoxConnector
kind: class
longname: module:boxes/BoxConnector.BoxConnector
description: "BoxConnector allows users to visually connect two {@link module:boxes/ActiveBox.ActiveBox ActiveBox} objects of an {@link module:Activity.ActivityPanel ActivityPanel}. There are two modes of operation: Drawing a line between an origin point (usually the point where the user clicks on) and a destination point. Dragging the ActiveBox from one location to another. The connecting lines can have arrowheads at its endings."
---

# BoxConnector

<SourceLink href="/source/boxes/boxconnector-js/#L46" label="BoxConnector.js:46" />

BoxConnector allows users to visually connect two [ActiveBox](/module/boxes-activebox#activebox) objects of an\
[ActivityPanel](/module/activity#activitypanel). There are two modes of operation:

- Drawing a line between an origin point (usually the point where the user clicks on) and a\
  destination point.
- Dragging the ActiveBox from one location to another.

The connecting lines can have arrowheads at its endings.

---

## Constructor

<Signature
  code="new BoxConnector(
	parent: module:AWT.Container,
	$canvas: external:jQuery,
): BoxConnector"
/>

BoxConnector constructor

**Parameters**

- `parent` ([module:AWT.Container](/module/awt#container)) — The Container to which this BoxConnector belongs
- `$canvas` ([external:jQuery](/module/utils#jquery)) — The HTML `canvas` element where this BoxConnector will draw.

---

## Instance Methods

<MemberHeading id="moveby" depth="3" name="moveBy" sig="moveBy(dx: number, dy: number)" />

<MemberMeta sourceHref="/source/boxes/boxconnector-js/#L66" sourceLabel="BoxConnector.js:66" />

Displaces the ending point of the connector

**Parameters**

- `dx` (number) — Displacement on the X axis
- `dy` (number) — Displacement on the Y axis

<MemberHeading id="moveto" depth="3" name="moveTo" sig="moveTo(pt: module:AWT.Point, forcePaint: boolean)" />

<MemberMeta sourceHref="/source/boxes/boxconnector-js/#L76" sourceLabel="BoxConnector.js:76" />

Moves the ending point of the connector to a new position

**Parameters**

- `pt` ([module:AWT.Point](/module/awt#point)) — The new position
- `forcePaint` (boolean) — When `true`, forces the repaint of all the area also if there is\
  no movement at all.

<MemberHeading
  id="begin"
  depth="3"
  name="begin"
  sig="begin(
	pt: module:AWT.Point,
	box?: module:boxes/ActiveBox.ActiveBox,
)"
/>

<MemberMeta sourceHref="/source/boxes/boxconnector-js/#L122" sourceLabel="BoxConnector.js:122" />

Starts the box connector operation

**Parameters**

- `pt` ([module:AWT.Point](/module/awt#point)) — Starting point
- `box` ([module:boxes/ActiveBox.ActiveBox](/module/boxes-activebox#activebox), optional) — Passed only when the BoxConnector runs in drag\&drop mode

<MemberHeading id="end" depth="3" name="end" sig="end()" />

<MemberMeta sourceHref="/source/boxes/boxconnector-js/#L158" sourceLabel="BoxConnector.js:158" />

Finalizes the operation of this box connector until a new call to `begin`

<MemberHeading id="drawline" depth="3" name="drawLine" sig="drawLine()" />

<MemberMeta sourceHref="/source/boxes/boxconnector-js/#L184" sourceLabel="BoxConnector.js:184" />

Strokes a line between `origin` and `dest`, optionally ended with an arrowhead.

## Instance Fields

<MemberHeading id="bgimg" depth="3" name="bgImg" sig="bgImg: external:HTMLImageElement" />

<MemberMeta sourceHref="/source/boxes/boxconnector-js/#L228" sourceLabel="BoxConnector.js:228" />

The background image, saved and redrawn on each movement

<MemberHeading id="bgrect" depth="3" name="bgRect" sig="bgRect: module:AWT.Rectangle" />

<MemberMeta sourceHref="/source/boxes/boxconnector-js/#L233" sourceLabel="BoxConnector.js:233" />

The rectangle of [ActivityPanel](/module/activity#activitypanel) saved in `bgImg`

<MemberHeading id="origin" depth="3" name="origin" sig="origin: module:AWT.Point" />

<MemberMeta sourceHref="/source/boxes/boxconnector-js/#L238" sourceLabel="BoxConnector.js:238" />

Initial position of the connector

<MemberHeading id="dest" depth="3" name="dest" sig="dest: module:AWT.Point" />

<MemberMeta sourceHref="/source/boxes/boxconnector-js/#L243" sourceLabel="BoxConnector.js:243" />

Current (while moving) and final position of the connector

<MemberHeading id="arrow" depth="3" name="arrow" sig="arrow: boolean" />

<MemberMeta sourceHref="/source/boxes/boxconnector-js/#L248" sourceLabel="BoxConnector.js:248" />

When `true`, the connector must end on arrowhead

<MemberHeading id="active" depth="3" name="active" sig="active: boolean" />

<MemberMeta sourceHref="/source/boxes/boxconnector-js/#L253" sourceLabel="BoxConnector.js:253" />

`true` while the connector is active

<MemberHeading id="linepainted" depth="3" name="linePainted" sig="linePainted: boolean" />

<MemberMeta sourceHref="/source/boxes/boxconnector-js/#L258" sourceLabel="BoxConnector.js:258" />

`true` while the line has already been painted (used for XOR expressions)

<MemberHeading id="arrowlength" depth="3" name="arrowLength" sig="arrowLength: number" />

<MemberMeta sourceHref="/source/boxes/boxconnector-js/#L263" sourceLabel="BoxConnector.js:263" />

The arrowhead length (in pixels)

<MemberHeading id="arrowangle" depth="3" name="arrowAngle" sig="arrowAngle: number" />

<MemberMeta sourceHref="/source/boxes/boxconnector-js/#L268" sourceLabel="BoxConnector.js:268" />

The arrowhead angle

<MemberHeading id="linecolor" depth="3" name="lineColor" sig="lineColor: string" />

<MemberMeta sourceHref="/source/boxes/boxconnector-js/#L273" sourceLabel="BoxConnector.js:273" />

The main color used in XOR operations

<MemberHeading id="xorcolor" depth="3" name="xorColor" sig="xorColor: string" />

<MemberMeta sourceHref="/source/boxes/boxconnector-js/#L278" sourceLabel="BoxConnector.js:278" />

The complementary color used in XOR operations

<MemberHeading id="compositeop" depth="3" name="compositeOp" sig="compositeOp: string" />

<MemberMeta sourceHref="/source/boxes/boxconnector-js/#L285" sourceLabel="BoxConnector.js:285" />

The global composite operator used when drawing in XOR mode. Default is "difference".\
For a list of possible values see:\
[https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation)

<MemberHeading id="defaultcompositeop" depth="3" name="DEFAULT_COMPOSITE_OP" sig="DEFAULT_COMPOSITE_OP: string" />

<MemberMeta sourceHref="/source/boxes/boxconnector-js/#L292" sourceLabel="BoxConnector.js:292" />

The default [composite operator](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation)\
("source-over").

<MemberHeading id="relativepos" depth="3" name="relativePos" sig="relativePos: module:AWT.Point" />

<MemberMeta sourceHref="/source/boxes/boxconnector-js/#L297" sourceLabel="BoxConnector.js:297" />

Relative position of point B regarding A

<MemberHeading id="bx" depth="3" name="bx" sig="bx: module:boxes/ActiveBox.ActiveBox" />

<MemberMeta sourceHref="/source/boxes/boxconnector-js/#L302" sourceLabel="BoxConnector.js:302" />

The ActiveBox to connect or move

<MemberHeading id="ctx" depth="3" name="ctx" sig="ctx: external:CanvasRenderingContext2D" />

<MemberMeta sourceHref="/source/boxes/boxconnector-js/#L307" sourceLabel="BoxConnector.js:307" />

The Graphics context where the BoxConnector will paint

<MemberHeading id="dim" depth="3" name="dim" sig="dim: module:AWT.Dimension" />

<MemberMeta sourceHref="/source/boxes/boxconnector-js/#L312" sourceLabel="BoxConnector.js:312" />

The dimension of the HTML canvas where to draw

<MemberHeading id="parent" depth="3" name="parent" sig="parent: module:AWT.Container" />

<MemberMeta sourceHref="/source/boxes/boxconnector-js/#L317" sourceLabel="BoxConnector.js:317" />

The container to which this connector belongs

<MemberHeading id="linewidth" depth="3" name="lineWidth" sig="lineWidth: number" />

<MemberMeta sourceHref="/source/boxes/boxconnector-js/#L322" sourceLabel="BoxConnector.js:322" />

Width of the connector line
