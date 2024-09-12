### v2.1.18 (Not yet released)
#### Improvements
- Upgraded dependencies

### v2.1.17 (2024-08-12)
#### Improvements
- Removed dependency of 'clipboard-polyfill'. The clipboard API is now supported in all browsers.
- Reincorporation of `webpack-node-externals`, which is used when building the nodeJS package.
- Upgraded dependencies

### v2.1.16 (2023-12-12)
#### Improvements
- Upgraded dependencies
#### Bug fixes
- Uninstall `webpack-node-externals` due to an incompatibility with `clipboard-polyfill` version 4
- Avoid font checking when running on NodeJS due to an error of [JSDOM](https://github.com/jsdom/jsdom) with [jQuery](https://jquery.com/) XML node trees.

### v2.1.15 (2023-09-26)
#### Improvements
- Upgraded dependencies

### v2.1.14 (2023-09-16)
#### Improvements
- Upgraded dependencies
#### Bug fixes
- Replace calls to `substr` (deprecated) by `substring`

### v2.1.13 (2023-07-11)
#### Improvements
- Upgraded dependencies
- Use [clean-jsdoc-theme](https://ankdev.me/clean-jsdoc-theme/v4/index.html) instead of the outdated [ink-docstrap](https://www.npmjs.com/package/ink-docstrap) theme to generate the [technical documentation](http://projectestac.github.io/jclic.js/doc/index.html) with [JSDoc](https://jsdoc.app/).

### v2.1.12 (2022-11-26)
#### Improvements
- Upgraded dependencies
- Remove unnecessary dependencies: `scriptjs`
- Improve graphics performance setting [willReadFrequently](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext#willreadfrequently) to `true` when acquiring [CanvasRenderingContext2D](https://html.spec.whatwg.org/multipage/canvas.html#canvasrenderingcontext2d) in activities using [BoxConnector](https://github.com/projectestac/jclic.js/blob/master/src/boxes/BoxConnector.js).

### v2.1.11 (2022-08-04)
#### Improvements
- Upgraded dependencies
- Detect swipe gestures on touch devices to go back or forward in the sequence of activities.
- Toggle full screen with "double touch" gesture.

### v2.1.10 (2022-03-15)
#### Bug fixes
- Clear `pos0` attribute in `ActiveBox` after bag resize or move.

### v2.1.9 (2022-02-26)
#### Improvements
- Upgraded dependencies
#### Bug fixes
- Calling `patch-package` in `postinst` does not work with the NPM package. Moved to `prebuild`.

### v2.1.8 (2022-01-07)
#### Improvements
- Upgraded dependencies
- Allow "inverse resolution" in word search activities: clues are initially shown, and gradually hidden when the user identifies them.

#### Bug fixes
- Use of [patch-package](https://www.npmjs.com/package/patch-package) to avoid compilation warnings.

### v2.1.7 (2022-01-24)
#### Improvements
- Upgraded dependencies
- Use [ink-docstrap-template](https://www.npmjs.com/package/ink-docstrap-template) instead [ink-docstrap](https://www.npmjs.com/package/ink-docstrap) to deal with updated components, thus avoiding security warnings
- Direct use of [jsdom](https://www.npmjs.com/package/jsdom) instead of [mock-browser](https://www.npmjs.com/package/mock-browser) (outdated) in `test/nodejs`, to avoid security warnings

#### Bug fixes
- `IdentifyText` activities were not fully implemented: only targets could be selected. You can now select any word (or letter in `identifyChars` mode), although not part of a target. To be successful with the activity, only the targets must be selected.

### v2.1.5 (2021-11-07)
#### Improvements
- Upgraded dependencies

#### Bug fixes
- Avoid bad URLs in local files when running on NodeJS with JSDOM

### v2.1.3 (2021-07-28)
#### Improvements
- Recycle HTML audio elements instead of building one for each audio file at startup. This has been motivated by a breaking change
  introduced in Chrome 92+, limiting the maximum number of media player elements per document.
  (see: https://bugs.chromium.org/p/chromium/issues/detail?id=1144736).
  This improvement will reduce the startup time of JClic projects and the size of media bytes to be downloaded, but can have a side effect,
  introducing latency when playing audio because is now always fetched "on demand" (no more preloading)

### v2.1.2 (2021-06-10)
#### Improvements
- Added Romanian translation, thanks to Studio Davis Tutoriale Programe.
- Upgraded dependencies.
- Use real files instead of inline JS constants for CSS, SVG, PNG and MP3 assets. These files are finally codified and inlined by WebPack at compile time.

### v2.1.1 (2021-04-12)
#### Bug fixes
- Fixed an issue with i18n, which did not correctly apply the required language selection.

#### Improvements
- i18n has been written from scratch, simplifying its operation and supporting different "locale" encodings.

### v2.1.0 (2021-04-10)
#### Breaking changes
- JClic projects can be now encapsulated in JSON format (files with extension `.jclic.json`). Current files in XML format (`.jclic`) will be still supported, but JSON will be the default format from now. Both formats can also be packaged in ZIP files (files of type `.jclic.zip` and `.scorm.zip`). This will simplify the development of the upcoming new project _JClic Author HTML5_.
- JClic.js uses now [JavaScript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) instead of [AMD modules](https://github.com/amdjs/amdjs-api/wiki/AMD) and [RequireJS](https://requirejs.org/). All members of complex modules like [AWT](https://github.com/projectestac/jclic.js/blob/master/src/AWT.js) and [Utils](https://github.com/projectestac/jclic.js/blob/master/src/Utils.js) can now be imported directly.
- Static factory methods in classes with multiple descendants.
- New methods `getAttributes` and `setAttributes` in core classes, used to serialize and de-serialize projects data.
- Drop Bower support.
- Open source license updated to [European Union Public License 1.2](https://spdx.org/licenses/EUPL-1.2.html).

#### Bug fixes
- Check for numeric digits in _Arith_ activity answers before converting them to numbers.
- Page reloads when entering text to the first question on _Written Answer_ activities (jQuery related)- Use 'idempotent-babel-polyfill' instead of 'babel-polyfill' as a workaround to [this issue](https://github.com/babel/babel-loader/issues/401), causing problems in JClic module for Moodle.
- Use the `box-sizing` CSS attribute to compute the real with of the counters area in `DefaultSkin`.
- Audio recorder features now enabled for all modern browsers using [MediaDevices.getUserMedia](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia) instead of the deprecated method [navigator.getUserMedia](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/getUserMedia).
- Find [AudioContext](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext) with vendor prefix in MIDI audio player (needed for Safari)
- Unset `box-shadow` and `text-shadow` attributes in custom buttons.
- Accessible components for `canvas` regions should always be created since [`HitRegions`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/addHitRegion) have been deprecated. Also, [`CanvasRenderingContext2D.drawFocusIfNeeded`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawFocusIfNeeded) should be called on each call to `updateContent` on `ActiveBox` objects, not just at creation time.
- Parse new JClic project multiple descriptions in XML files.
- `AWT.Font.cssFont` should use `px` as `font-size` unit for consistency with JClic.
- Use underscore instead of blank space as filling character in `TextActivityDocument.TextTarget`
- Correct the vertical position of centered text in boxes and grid cells
- Workaround for a bug on Chrome and Firefox XML parsers, throwing errors whith hexadecimal character entities

#### Improvements
- Updated core components to their latest versions.
- Use of `package-lock` instead of `npm-shinkwrap` to lock version dependencies.
- Restored semicolons in all source files.
- Deliverable files are now minimized with [Terser](https://github.com/terser/terser) intead of [Uglifyjs](https://github.com/mishoo/UglifyJS2).
- Full screen mode now using direct calls to the [Full Screen API](https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API) instead of [screenfull](https://www.npmjs.com/package/screenfull).
- Upgraded components.
- Max audio recording time increased to 180".
- Provide visual feedback while recording audio.
- Map JDK logical fonts ("Dialog", "Serif", etc.) to [HTML5 generic font family names](https://developer.mozilla.org/en-US/docs/Web/CSS/font-family).
- Improved experience with screen readers like [ChromeVox](https://www.chromevox.com/) and [Chromevox Classic](https://chrome.google.com/webstore/detail/chromevox-classic-extensi/kgejglhpjiefppelpmljglcjbhoiplfn).
- Updated JSDoc comments. Published full [API Docs](http://projectestac.github.io/jclic.js/doc/index.html) with working links.
- Updated test suites.
- Implemented Clic 3.0 behavior on `panels/Explore` activities without buttons and automatic step forward.
- Added a hidden message box to `skins/EmptySkin`, thus allowing activities to play audio at start.
- Avoid browser's spell checking on written answer activities.
- Use the [History API](https://developer.mozilla.org/en-US/docs/Web/API/History) to record the list of played JClic activities, thus allowing to navigate between them with the browser's `back` and `forward` buttons.
- Interpret negative values as percentages when setting CSS sizes, useful for the [JClic module for Moodle](https://moodle.org/plugins/mod_jclic).

### v1.1.11 (2019-02-11)
#### Bug fixes
- Corrected a bug in `automation/arith/Arith.js` that affected operations with decimals with _do not carry_ option.

#### Improvements
- Numeric expressions generated by "Arith" (the mental arithmetics moduleof JClic) use now dot or comma as a decimal separator, depending on the browser's "locale" settings.
- The new `numericContent` activity flag is used by _Arith_ activities to check written answers. So expressions like "0.1", "0.10" and "00,100" (with dot or comma) are considered equivalent.

### v1.1.10 (2019-01-23)
#### Bug fixes
- Explicit call to `HTMLAudioElement.load` in `bags/MediaBagElement.build` to avoid the lack of `canplay` events
  when just setting the `src` attribute in Chrome on Android < 7. Now JClic always try to load audio content, also in Android!

### v1.1.9 (2018-10-15)
#### Improvements
- Basic support for MIDI files: Only one musical instrument (acoustic grand piano) is dynamically loaded
  and used for all tracks, in a single MIDI channel schema. No percussion sounds on channel 10. This feature must be
  improved on the future, but currently covers the basic necessities of most musical activities.

### v1.1.8 (2018-09-12)
#### Improvements
- JClic.js is now also available also in Polish, thanks to Waldemar Stoczkowski!
- Build scripts updated to work with [Babel 7](https://babeljs.io)

### v1.1.7 (2018-06-20)
#### Bug fixes
- Allow projects to have multiple custom skins defined in XML files

### v1.1.5 (2018-05-17)
#### Improvements
- Use of [Webpack 4](https://webpack.js.org/) to polyfill, transpile and build the main distributable file `jclic.min.js`

#### Bug fixes
- Avoid playing disabled event sounds
- Declare the `document` member in `Activity.prototype`
- Use of `Element.getAttribute` instead of `style.attributes.*`

### v1.1.4 (2018-02-27)
#### Improvements
- Full implementation of JClic "legacy custom skins" (see v1.1.3) including counters and progress animations. This feature makes use of CSS [animation](https://caniuse.com/#feat=css-animation) and [grid layout](https://caniuse.com/#feat=css-grid), so please update your web browser!

### v1.1.3 (2018-02-20)
#### Improvements
- Improved responsiveness: Now skin elements are reduced to 2/3 or 1/2 of its original size when running on mobile devices with small screens.
- Basic functionality of JClic "legacy custom skins" (based on XML files) are now supported in browsers compatible with [CSS Grid Layout](https://caniuse.com/#feat=css-grid). This feature is currently used in many great JClic projects created by [Imma Palahí](https://clic.xtec.cat/repo/index.html?lang=ca&author=Imma%20Palahi).

#### Bug fixes
- Solved a bug in Menu.js
- Check for null values on AUDIO_BUFFERS and mbe.data

### v1.1.0 (2018-02-08)
#### Improvements
- All the code has been updated to [ECMAScript6](http://es6-features.org) (ES6), taking advantage of new JavaScript features (classes, constants, arrow functions, array methods...) in modern browsers. The main file `jclic.min.js` will maintain compability with older browsers for some time, since it is transpiled to ES5 thanks to [Babel](https://babeljs.io/) and [Webpack](https://webpack.js.org).
- Updated test files.
- All media is now played at the end of the current event handling, so it's not blocked by mobile browsers (see [this thread](https://bugs.chromium.org/p/chromium/issues/detail?id=178297) for more information about this issue)
- New JSDoc-Bootstrap theme for the [API Docs](http://projectestac.github.io/jclic.js/doc/index.html)

#### Bug fixes
- Catch `Enter` key in written answer activities.
- Disable drop-down lists at the end of text activities

### v1.0.5 (2018-02-05)
#### Bug fixes
- WrittenAnswer activities: always update the alternative content off cells when done

### v1.0.4 (2018-01-22)
#### Improvements
- Text activities can now display pop-up windows and play helper sounds of targets, as in JClic Player.

#### Bug fixes
- Avoid false positives with empty responses in text activities.

### v1.0.3 (2018-01-15)
#### Bug fixes
- Check always the ordering of cascading styles text activities.
- Always detect carriage returns in activities of type "fill-in blanks".

### v1.0.2 (2017-12-12)
#### Bug fixes
- Corrected a bug detected in cell placement inside ActiveBoxBag, affecting some exchange puzzles with gigsaw and other special shapers.

### v1.0.1 (2017-11-10)
#### Improvements
- New startup parameter `returnAsExit` treats `ActivitySequence` elements of type `return` as if they where of type `exit`, only when `PlayerHistory.sequenceStack` is empty.

### v1.0.0 (2017-10-18)
#### Improvements
- Major version number updated to 1.x to be compliant with [semver](http://semver.org/). With this change, the project goes from _Initial development_ (0.x) to _Public API_ (1.x).
- New class `report/SessionStorageReporter`, storing report results in [`sessionStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage) or [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage).
- jclic.js is also available at [CDNJS](https://cdnjs.com/libraries/jclic.js), thanks to [Peter Dave Hello](https://github.com/PeterDaveHello) and [LboAnn](https://github.com/extend1994).

### v0.1.49 (2017-09-01)
#### Improvements
- New NPM scripts to build, debug and launch jclic.js, now based on [webpack](https://webpack.js.org/) instead of [Grunt](https://gruntjs.com/) and [Browserify](http://browserify.org/). See README.md for more information.

### v0.1.48 (2017-07-21)
#### Improvements
- Implemented the type of activity "Menu", used in legacy JClic libraries. Useful for JClic libraries hosted on school servers: now they can be served as HTML resources just placing an `index.html` in the root folder pointing to the `library.jclic` file, like in [this example](https://clic.xtec.cat/pub/2005/index.html).

### v0.1.47 (2017-05-16)
#### Improvements
- Updated French translation, thanks to [Heluga Valka](https://www.transifex.com/user/profile/Heluga/)

#### Bug fixes
- Control of the maximum display time of previous screen in text activities. This JClic feature was unimplemented until now. Probably closes #12.
- Backslashes in active media parameters and file names are now always converted to forward slashes. This avoids problems with chaining in big projects distributed among multiple folders.
- Set default value of `navButtonsAlways` to `false`. Closes #11.
- Avoid creating `AccessibleElement` when canvas has no surface.
- Double-check the existence of `ActiveBoxBag` elements before using them.
- Use index -1 in `jQuery.get` to avoid added `div style-scope` elements in Shadow DOM.
- Put stylesheets within shadow-root when in shadow DOM.

### v0.1.46 (2017-04-24)
#### Improvements
- Use HTTPS as defaul protocol in `TCPReporter`.
- Set an empty string as default value in dropdown lists on text activities.

#### Bug fixes
- Flush always pending tasks in `TCPReporter` before exiting.

### v0.1.45 (2017-03-20)
#### Improvements
- Display a progress bar (in addition to the rotating animation) while loading project media elements.

#### Bug fixes
- Transform full activity class names to `@className` expressions, so projects using this naming schema (like [GeoClic](https://clic.xtec.cat/repo/index.html?prj=geoclien)) can now make use of JClic.js.

### v0.1.44 (2017-03-15)
#### Improvements
- `EmptySkin` has been implemented and is now used as initial player skin.
- JClic java applets generated through `jclicplugin.js` are now always loaded as JClic.js HTML5 elements. This change has been motivated by the fact that [Firefox 52](https://www.mozilla.org/en-US/firefox/52.0/releasenotes/) has dropped support for Java applets.
- Updated NPM components.

#### Bug fixes
- Check `AWT.WebFont` to avoid conflicts with other webfont loader packages already loaded.
- Build always a skin for `JClicPlayer`, even when the requested one does no exist.
- Force main container width and height when inside a `TD`.
- Avoid incorrect placement of inner elements when parent container has the `align` attribute defined.

### v0.1.43 (2017-02-28)
#### Bug fixes
- Allow animated GIFs also over gradients.
- Solved incorrect startup of "complete text" activities with previous screen.
- Place "check" button always anchored at bottom of text activities.
- Properly initialize `Evaluator` with `Intl.Collator` in text activities.
- Solved problems when rounding and ceiling integers in Arith.
- Avoid calling `buildAccessibleElements` on null panels

### v0.1.42 (2017-02-20)
#### Miscellaneous
- Export third-party NPM packages in a new member of `Utils` called `pkg`, so external scripts can make use of it through the global vriable `JClicObject`. This change was needed to implement downloading of JClic projects in [JClic Repo](https://github.com/projectestac/jclic-repo).

### v0.1.41 (2017-02-13)
#### Improvements
- Use of [es6-promise](https://github.com/stefanpenner/es6-promise) polyfill to support `Promise` in IE11 and other outdated browsers.
- Explicit loading of fonts included in JClic projects. The `name` attribute of media elements is now used as `font-family` value.

#### Bug fixes
- Resolve dependencies and browserless issues affecting `listProjectContents.js` (in `test/nodejs`)

#### Miscellaneous
- Specific developer's settings for [VS-Code](https://code.visualstudio.com/), besides [NetBeans IDE](https://netbeans.org/).
- Use of [ESLint](http://eslint.org/) instead of [JSHint](http://jshint.com/). Same functionality, but better integration with [VS-Code](https://code.visualstudio.com/).

### v0.1.40 (2016-11-23)
#### Bug fixes
- Don't stop media on mouseup events
- Play sounds also in grid B, when available

### v0.1.39 (2016-11-11)
#### Improvements
- Animated GIF support extended to more activities: now panels with static (not scrambled) cells, using any type of shaper, can have an animated GIF as a main content. This applies to information screen, identify, associations, written answer and word search activities.

### v0.1.38 (2016-11-02)
#### Bug fixes
- Treat 'x' as zero when parsing data for Arith operators, thus avoiding "NaN" errors in some activities.
- Avoid keyboard hiding on tablets when in written answer activities.
- Ignore mouse events on accessible components.

### Improvements
- Added Japanese to the list of supported languages (thanks to Naofumi!)
- Improved log system

### v0.1.37 (2016-10-05)
#### Bug fixes
- Fixed incorrect calculation of score in __Identify__ activities

#### Improvements
- Improved accessibility based on [WAI-ARIA](https://en.wikipedia.org/wiki/WAI-ARIA) specifications (still in progress)
- Experimental use of [HTML canvas hit regions](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Hit_regions_and_accessibility). In order to use it, flags `ExperimentalCanvasFeatures` (Chrome) or `canvas.hitregions.enabled` (Firefox) must be enabled. Checked with [ChromeVox](http://www.chromevox.com/)

#### Code cleaning and documentation
- Miscellaneous optimizations: conditional operators, jQuery expressions, allow reuse of JClicPlayer objects, etc. See git log for details

### v0.1.36 (2016-09-19)
#### Bug fixes
- "Full screen" mode should work now as expected (when available)
- Avoid resizing of BoxBase prototype font attribute

#### Improvements
- Project license changed to EUPL-1.1 (compatible with GPL-2.0)

### v0.1.35 (2016-09-05)
#### Bug fixes
- Avoid "same-origin" policy exception when initializing SCORM from an embedded iFrame.

#### Improvements
- JClic.js can now directly open `project.json` files generated by [JClic Author](https://github.com/projectestac/jclic/releases)

### v0.1.34 (2016-09-02)
#### Bug fixes
- Merge styles with its base style (when defined) in `TextActivityDocument`
- Allow HTML text in `ActiveBox` cells
- Workaround for an [Edge/Explorer SVG bug](https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/8479637/) in 'close' button.
- Add `-webkit-flex-xxx` CSS properties for Safari 8 compatibility.

#### Improvements
- Now JClic.js opens the new `.scorm.zip` files generated by [JClic Author 0.3.2.0](https://github.com/projectestac/jclic/releases)
- More strict settings when checking code with [JSHint](http://jshint.com/)

### v0.1.31 (2016-07-20)
#### Bug fixes
- Apply `JClicPlayer.defaultSkin` only when `JClicProject.skin` is not specified

#### Improvements
- Implemented support for SCORM 1.2 and SCORM 2004. Now JClic reports global score and session time when a SCORM API is detected.
- New method to calculate scores for SCORM: now _"partial score"_ refers to the score average of all played activities and _"global score"_ multiplies it by the ratio between the number of activities played at least once and the total number of activities in the project. For example, when playing a project with 20 activities, a student that has successfully finished only one activity will have a _partial score_ of 100%, but its _global score_ will be only 5%. When all activities are played at least once, global and partial scores have the same value.
- New logging system. Verbosity on the JavaScript console can now be adjusted with a 'logLevel' parameter that can have one of the values: _all_, _trace_, _debug_, _info_, _warn_, _error_ and _none_. Default is: _warn_.

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
- Suppressed 'test/lib' folder
- Added some badges to `README.md`

---

### v0.1.21 (2016-04-25)
#### Improvements
- Display animated GIFs out of canvas elements. Some complex paths will not be clipped, but native browser image animation is now used.

#### Bug fixes
- Adjust borders in `ActiveBox` hosted components
- Partially reverted commit [ba5330da](https://github.com/projectestac/jclic.js/commit/ba5330da229625fdb5bc077bf4559873d4e55c76) that caused malfunctions in text activities
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
- Optimized [hit test](https://en.wikipedia.org/wiki/Hit-testing) on Bezier curves, ellipses and complex paths
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
- Avoid calls to nonexistent functions

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
- Improved waiting animation and activity borders
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
- Generate just one source map with Browserify
- Optimized build process
- Updated 'license' tag in package.json ('licenses' was deprecated)
- Updated npm module
- Updated documentation and comments
- Convert code comments to JSDoc format
- Move static methods from prototype to constructor
- Create scripts to convert svg and png files to inline data (in '/misc/scripts`)
