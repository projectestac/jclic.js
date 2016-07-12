### v0.1.31 (not yet released)
#### Bug fixes
- Apply `JClicPlayer.defaultSkin` only when `JClicProject.skin` not specified

### v0.1.30 (2016-07-11)
#### Improvements
- Skin and player windows fully styled with CSS
- Updated skin names. Expressions like '@___.xml' are no longer needed (but still supported)
- Added a `reset` method to `JClicPlayer`

#### Bug fixes
- Set color and size for _close_ icon

### v0.1.29 (2016-07-05)
#### Improvements
- Waiting image changed from SVG animation (deprecated) to CSS keyframes
- Skin support implemented with (almost) pure CSS
- Implemented support for stock skins (_standard_, _orange_, _blue_, _green_, _simple_ and _mini_)
- Created `loadProject` function in the global `JClicObject`, thus allowing the creation of JClic players from other scripts
- Allow JClic.js to be used as a [Node.js](https://nodejs.org) module
- Added example of Node.js usage in `test/nodejs`

### v0.1.28 (2016-06-22)
#### Improvements
- New class `TCPReporter` allows now to connect with external services like [JClic Reports](http://clic.xtec.cat/en/jclic/reports/index.htm) and [JClic module for Moodle](https://moodle.org/plugins/view.php?id=305)
- i18n: New messages waiting for translation in [Transifex](https://www.transifex.com/francesc/jclicjs/). Contributions welcome!
- Upgrade to jQuery 3.0
- Improved user interface in reports.
- Implemented `Skin.showDlg`

#### Bug fixes
- Use a `try` clause for `canvas.drawImage` to catch exceptions caused by `HTMLImageElement` objects in broken state

#### Code cleaning and documentation
- Updated documentation and code comments
- Unified `this` syntax in closures
- Added a [Gitter](https://gitter.im) badge to README.md

---

### v0.1.27 (2016-06-03)
#### Bug fixes
- Set always base attributes when setting target style in text activities

#### Improvements
- i18n: Opened new project in [Transifex](https://www.transifex.com/francesc/jclicjs/messages/) to help translating messages to any language and locale. Initially filled with partial translations to `ar`, `ast`, `bs`, `ca`, `ca@valencia`, `cs`, `da`, `de`, `el`, `en`, `es`, `eu`, `fr`, `gl`, `he`, `it`, `nl`, `pt`, `pt_BR`, `ru`, `tr`, `vec` and `zh_TW` found on the main [JClic translation project](https://translations.launchpad.net/jclic).

---

### v0.1.25 (2016-05-30)
#### Improvements
- Multi-language support using gettext (.po and .pot) files stored in `/locales`

---

### v0.1.24 (2016-05-25)
#### Improvements
- Improved UI in reports
- Added _copy to clipboard_ and improved UI in reports
- Optimized JQuery object builders
- New counters (time, actions, score) and reports system

---

### v0.1.23 (2016-04-29)
#### Improvements
- Use of [Google WebFonts](https://fonts.google.com/), with parameterizable font substitution list
- Automatic detection of animated GIFs
- Upgrade to [JSZip](https://stuk.github.io/jszip/) 3.0

#### Code cleaning and documentation
- Supressed 'test/lib' folder
- Added some badges to `README.md`

---

### v0.1.21 (2016-04-25)
#### Improvements
- Display animated GIFs out of canvas elements. Some complex paths will not be clipped, but native browser image animation is now used.

#### Bug fixes
- Adjust borders in `ActiveBox` hosted components
- Partially reverted commit [ba5330da](https://github.com/projectestac/jclic.js/commit/ba5330da229625fdb5bc077bf4559873d4e55c76) that caused misfunctions in text activities
- Hide `hostedComponent` when inactive

#### Code cleaning and documentation
- Script for exporting README.md to an HTML snippet, useful to update index.html in https://projectestac.github.io/jclic.js
- New CDN: JClic.js is now also available from [JSDelivr](http://www.jsdelivr.com/projects/jclic.js)
- Ignore `src` in Bower package. Now with just `dist` files
- Updated _readme_ and docs

---

### v0.1.20 (2016-03-07)
#### Improvements
- Audio recording is now possible in JClic.js (browser permissions should be accepted on request)
- Converted `wav` files to `mp3` in test activities
- Optimized [hit test](https://en.wikipedia.org/wiki/Hit-testing) on bezier curves, ellipses and complex paths
- ~~Link event handlers to cells in text activities~~ (reverted by [180c684](https://github.com/projectestac/jclic.js/commit/180c68415518ba2f5809985cccd7bea041bb43c8))

#### Bug fixes
- Solved bug in `MediaContent.isEquivalent`

---

### v0.1.19 (2016-02-25)
#### Improvements
- Implemented `ActivitySequence.checkCurrentActivity`

#### Code cleaning and documentation
- Updated `npm` dependencies

#### Bug fixes
- Solved error in `ActiveMediaPlayer.linkTo`

---

### v0.1.18 (2016-02-11)
#### Improvements
- Play video and Flash objects
- Optimized loading of audio
- Add `onClick` event to `msgBox` and process media content in the same thread where user gesture event is generated

#### Bug fixes
- Solved problems with `readyState` in media elements

---

### v0.1.15 (2016-01-28)
#### Improvements
- "Check" button in text activities
- `prevScreen` in text activities

#### Bug fixes
- Media content of type "URL" not working (fixes [Issue #1](https://github.com/projectestac/jclic.js/issues/1))
- Corrected error in `EventSounds` inheritance

---

### v0.1.12 (2016-01-21)
#### Improvements
- Use of event sounds
- Updated base versions of `npm` packages
- "Identify text" activities
- "Complete text" activities
- Draw connection lines in "order text" activities
- Compute relative paths in `PlayerHistory`
- Update `JClicPlayer` to support "file:" protocol

#### Bug fixes
- Correct the calculation of `nShapes` in "Holes" shaper
- Graphics workaround when working with local files

---

### v0.1.11 (2015-12-03)
#### Improvements
- "order text" activities
- Adjust automatic forwarding of activities

#### Bug fixes
- Avoid calls to unexistent functions

#### Code cleaning and documentation
- Updated API docs
- Normalize backslashes and avoid empty bags

---

### v0.1.7 (2015-10-25) and previous
#### Improvements
- Add 'close' button
- Implemented `Skin.fit`
- JClic exports now the global variable `JClicObject`
- Use of `text()` instead of `html()` in text activities
- Multiple JClic objects in same document
- Prevent browser spell-check in text activities
- Tabulators in text activities
- Allow passing project and options through global variables
- Support sequences with multiple chained ZIP files
- Chained calls to `PlayerHistory` push & pop
- Load `jclic.zip` files using [JSZip](https://stuk.github.io/jszip/)
- `activityReady` method
- "Fill-in blanks" text activities
- Implemented `BasicEvaluator` and `ComplexEvaluator`
- Moved `TextTarget` to `TextActivityDocument.js`
- Implemented `TextTarget`
- "Cross word" activities
- Blink cursor and optimized shape clipping
- Action status listeners
- "Word search" activities
- New runtime parameters: `autoFit`, `width` & `height`
- Updated media icons
- Activity panel fade-in
- Full screen is now supported
- "TextGrid" activities
- Improved responsive design and passing of options
- Seekable sounds
- Improvied waiting animation and activity borders
- Form submit in "Written answer" activity
- Support of touch devices
- Added support to relative paths when loading projects
- Added new test suite
- "Written answer" activities
- "Memory" activities
- "Explore" activity
- "Identify" activities
- "Complex Association" activities
- Improved `BoxConnector`
- "Simple Association"
- Implemented `AWT.Ellipse`
- "Hole" puzzle activity
- Adjust "Holes" shaper
- "Exchange" puzzle
- Created "Arith" (automatic content provider)
- Implemented `BoxConnector`
- Cell scrambling
- Clipping of multiple images into a single canvas
- "JigSaw" shapers
- "Double" Puzzle
- "Information Screen" activity
- Implemented `ActiveBoxGrid`
- Build `MediaContent`
- Implemented `TextActivityBase`
- Check CORS and HttpXMLRequest calls
- Created `JClicPlayer`
- Created `DefaultSkin`

#### Bug fixes
- Solved invalid assignment of `nCols` and `nRows` in "Holes" shaper
- Corrections in `PlayerHistory`
- Force `hasRemainer` in `shapers.Holes` with `bgImg`
- Avoid overlap of message boxes with transparent background
- Avoid breaking lines in targets when CSS 'white-space' is set to 'pre-wrap' (only in Chrome)
- Check origin 'pos' and 'dim' in ctx.drawImage (Firefox crashes when out-of-range)
- Check for availability of `fullscreen.enabled` prior to use it
- Solved problem with double events stopping media
- Solved problem with bad content type in $get
- Solved erroneous calculation of remainder shape
- Solved problem with `id` on empty cells
- Solved problems with parsing of shape data
- Swap the loading of rows and columns in `ActiveBagContent` due to an old JClic bug
- Solved problem with color gradients
- Activity start procedure revised

#### Code cleaning and documentation
- Updated class skeleton
- Generate just one sourcemap with Browserify
- Optimized build process
- Updated 'license' tag in package.json ('licenses' was deprecated)
- Updated npm module
- Updated documentation and comments
- Convert code comments to JSDoc format
- Move static methods from prototype to constructor
- Create scripts to convert svg and png files to inline data (in '/misc/scripts`)
