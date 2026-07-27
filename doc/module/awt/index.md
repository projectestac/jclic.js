---
title: AWT
kind: module
longname: module:AWT
description: "File : AWT.js Created : 12/04/2015 By : Francesc Busquets francesc@gmail.com JClic.js An HTML5 player of JClic activities https://projectestac.github.io/jclic.js"
---

# AWT

<SourceLink href="/source/awt-js/#L32" label="AWT.js:32" />

File : AWT.js\
Created : 12/04/2015\
By : Francesc Busquets [francesc@gmail.com](mailto:francesc@gmail.com)

JClic.js\
An HTML5 player of JClic activities\
https\://projectestac.github.io/jclic.js

- **License:** EUPL-1.2

---

## Other

<MemberHeading id="font" depth="3" name="Font" sig="Font" />

<MemberMeta badges="static" sourceHref="/source/awt-js/#L38" sourceLabel="AWT.js:38" />

Font contains properties and provides methods to manage fonts

**Parameters**

- `family` (string, optional, default: "'Arial'")
- `size` (number, optional, default: 17)
- `bold` (number, optional, default: 0)
- `italic` (number, optional, default: 0)
- `variant` (string, optional, default: "''")

<MemberHeading id="gradient" depth="3" name="Gradient" sig="Gradient" />

<MemberMeta badges="static" sourceHref="/source/awt-js/#L385" sourceLabel="AWT.js:385" />

Contains parameters and methods to draw complex color gradients

**Parameters**

- `c1` (string) — The initial color, in any CSS-valid form.
- `c2` (string) — The final color, in any CSS-valid form.
- `angle` (number, optional, default: 0) — The inclination of the gradient relative to the horizontal line.
- `cycles` (number, optional, default: 1) — The number of times the gradient will be repeated.

<MemberHeading id="stroke" depth="3" name="Stroke" sig="Stroke" />

<MemberMeta badges="static" sourceHref="/source/awt-js/#L502" sourceLabel="AWT.js:502" />

Contains properties used to draw lines in HTML `canvas` elements.

**Parameters**

- `lineWidth` (number, optional, default: 1) — The line width of the stroke
- `lineCap` (string, optional, default: "'butt'") — The line ending type. Possible values are: `butt`, `round`\
  and `square`.
- `lineJoin` (string, optional, default: "'miter'") — The type of drawing used when two lines join. Possible\
  values are: `round`, `bevel` and `miter`.
- `miterLimit` (number, optional, default: 10) — The ratio between the miter length and half `lineWidth`.

* **See:**
  - [http://bucephalus.org/text/CanvasHandbook/CanvasHandbook.html#line-caps-and-joins](http://bucephalus.org/text/CanvasHandbook/CanvasHandbook.html#line-caps-and-joins)

<MemberHeading id="point" depth="3" name="Point" sig="Point" />

<MemberMeta badges="static" sourceHref="/source/awt-js/#L584" sourceLabel="AWT.js:584" />

Contains the `x` andy `y` coordinates of a point, and provides some useful methods.

**Parameters**

- `x` (number | [Point](/module/awt#point)) — When `x` is an `Point` object, a clone of it will be created.
- `y` (number, optional) — Not used when `x` is an `Point`

<MemberHeading id="dimension" depth="3" name="Dimension" sig="Dimension" />

<MemberMeta badges="static" sourceHref="/source/awt-js/#L711" sourceLabel="AWT.js:711" />

This class encapsulates `width` and `height` properties.

**Parameters**

- `w` (number | [Point](/module/awt#point)) — The width of this Dimension, or the upper-left vertex of a\
  virtual Rectangle
- `h` (number | [Point](/module/awt#point)) — The height of this Dimension, or the bottom-right vertex of a\
  virtual Rectangle

<MemberHeading id="shape" depth="3" name="Shape" sig="Shape" />

<MemberMeta badges="static,abstract" sourceHref="/source/awt-js/#L820" sourceLabel="AWT.js:820" />

Shape is a generic abstract class for rectangles, ellipses and stroke-free shapes.

**Parameters**

- `pos` ([module:AWT.Point](/module/awt#point)) — The top-left coordinates of this Shape

<MemberHeading id="rectangle" depth="3" name="Rectangle" sig="Rectangle" />

<MemberMeta badges="static" sourceHref="/source/awt-js/#L1038" sourceLabel="AWT.js:1038" />

**Extends:&#x20;**`module:AWT.Shape`

The rectangular [module:AWT.Shape](/module/awt#shape) accepts five different sets of parameters:

**Parameters**

- `pos` ([Point](/module/awt#point) | [Rectangle](/module/awt#rectangle) | number | Array.\<number>)
- `dim` ([Dimension](/module/awt#dimension) | number, optional)
- `w` (number, optional)
- `h` (number, optional)

**Example**

```js
<p>// Calling Rectangle() with different sets of parameters<br>
// A Point and a Dimension:<br>
new Rectangle(pos, dim)<br>
// Another Rectangle, to be cloned:<br>
new Rectangle(rect)<br>
// Two Point objects containing the coordinates of upper-left and lower-right vertexs:<br>
new Rectangle(p0, p1)<br>
// An array of four numbers with the coordinates of the same vertexs:<br>
new Rectangle([x0, y0, x1, y1])<br>
// Four single numbers, meaning the same coordinates as above:<br>
new Rectangle(x0, y0, x1, y1)</p>
```

<MemberHeading id="ellipse" depth="3" name="Ellipse" sig="Ellipse" />

<MemberMeta badges="static" sourceHref="/source/awt-js/#L1267" sourceLabel="AWT.js:1267" />

**Extends:&#x20;**`module:AWT.Rectangle`

The Ellipse shape has the same constructor options as [Rectangle](/module/awt#rectangle)

**Parameters**

- `pos` ([Point](/module/awt#point) | [Rectangle](/module/awt#rectangle) | number | Array.\<number>)
- `dim` ([Dimension](/module/awt#dimension) | number, optional)
- `w` (number, optional)
- `h` (number, optional)

<MemberHeading id="path" depth="3" name="Path" sig="Path" />

<MemberMeta badges="static" sourceHref="/source/awt-js/#L1370" sourceLabel="AWT.js:1370" />

**Extends:&#x20;**`module:AWT.Shape`

A `Path` is a [module:AWT.Shape](/module/awt#shape) formed by a serie of strokes, represented by\
[module:AWT.PathStroke](/module/awt#pathstroke) objects

**Parameters**

- `strokes` (Array.\<[module:AWT.PathStroke](/module/awt#pathstroke)>) — The array of [module:AWT.PathStroke](/module/awt#pathstroke) objects defining this Path.

<MemberHeading id="pathstroke" depth="3" name="PathStroke" sig="PathStroke" />

<MemberMeta badges="static" sourceHref="/source/awt-js/#L1586" sourceLabel="AWT.js:1586" />

PathStroke is the basic component of [module:AWT.Path](/module/awt#path) objects

**Parameters**

- `type` (string) — The type of stroke. Possible values are: `M` (move to), `L` (line to),\
  `Q` (quadratic to), `B` (bezier to) and `X` (close path).
- `points` (Array.\<[module:AWT.Point](/module/awt#point)>) — The array of [module:AWT.Point](/module/awt#point) objects used in this Stroke.

<MemberHeading id="action" depth="3" name="Action" sig="Action" />

<MemberMeta badges="static" sourceHref="/source/awt-js/#L1779" sourceLabel="AWT.js:1779" />

This class encapsulates actions that can be linked to buttons, menus and other active objects

**Parameters**

- `name` (string) — The name of this Action
- `actionPerformed` (function) — The callback to be triggered by this Action

<MemberHeading id="timer" depth="3" name="Timer" sig="Timer" />

<MemberMeta badges="static" sourceHref="/source/awt-js/#L1868" sourceLabel="AWT.js:1868" />

This class provides a timer that will launch a function at specific intervals

**Parameters**

- `actionPerformed` (function) — The function to be triggered when the timer is enabled.
- `interval` (number) — The interval between action calls, specified in milliseconds.
- `enabled` (boolean, optional, default: false) — Flag to indicate if the timer will be initially enabled.

<MemberHeading id="container" depth="3" name="Container" sig="Container" />

<MemberMeta badges="static" sourceHref="/source/awt-js/#L1978" sourceLabel="AWT.js:1978" />

**Extends:&#x20;**`module:AWT.Rectangle`

Logic object that takes care of an "invalidated" rectangle that will be repainted\
at the next update of a 2D object, usually an HTML Canvas.\
Container has the same constructor options as [Rectangle](/module/awt#rectangle)

**Parameters**

- `pos` ([Point](/module/awt#point) | [Rectangle](/module/awt#rectangle) | number | Array.\<number>)
- `dim` ([Dimension](/module/awt#dimension) | number, optional)
- `w` (number, optional)
- `h` (number, optional)
