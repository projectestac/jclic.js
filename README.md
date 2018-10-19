# JClic.js

[![Bower version](https://badge.fury.io/bo/jclic.svg)](https://badge.fury.io/bo/jclic)
[![npm version](https://badge.fury.io/js/jclic.svg)](https://badge.fury.io/js/jclic)
[![CDNJS version](https://img.shields.io/cdnjs/v/jclic.js.svg)](https://cdnjs.com/libraries/jclic.js)
[![Join the chat at https://gitter.im/projectestac/jclic.js](https://badges.gitter.im/projectestac/jclic.js.svg)](https://gitter.im/projectestac/jclic.js?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

[JClic.js](https://github.com/projectestac/jclic.js) is an HTML5 player of [JClic](https://github.com/projectestac/jclic) activities. See a [demo](https://clic.xtec.cat/projects/demo_eng/jclic.js/index.html) on how it works.

## JClic and JClic-repo

[JClic](http://clic.xtec.cat) is a free software project from the [Catalan Educational Telematic Network](http://www.xtec.cat) (XTEC) for creating various types of interactive activities such as associations, puzzles, text activities, crosswords or puzzles, from elements of text, graphics and multimedia.

The program includes an authoring tool to create activities, a player and a reporting system that stores the results obtained by students. All these components, along with some guides and tutorials on how to create activities, are available in the [clicZone](http://clic.xtec.cat/en/jclic/download.htm).

JClic is a Java application that runs on Linux, Windows and Mac OS. Full [source code](https://github.com/projectestac/jclic) and [documentation](http://projectestac.github.io/jclic/) are available on GitHub.

Many teachers from different countries have used JClic to create interactive materials for a wide variety of levels, subjects, languages and curriculum areas. Some of these materials have been collected in a huge [library](https://clic.xtec.cat/repo) created with [jclic-repo](https://github.com/projectestac/jclic-repo), another open source project that will facilitate the publication of collections of JClic projects in static web hosting services.

## How to build JClic.js

JClic.js uses [Node.js](https://nodejs.org/) modules encapsulated in [npm](https://www.npmjs.com/) packages. First of all, you must have Node.js (which includes 'npm') [installed](https://nodejs.org/download/) on your system.


To install the required packages, just go to the project's root directory and write:

```
npm ci
```

This will install jQuery, Webpack and other needed components into `node_modules`

To build jclic.js, just invoke:

```
npm run build
```

This will generate the main file `dist/jclic.min.js` (along with other files useful for development)

To test this resulting bundle and see the demo on your browser, launch the test server:

```
npm start
```

You can also launch the program in "unbundled" mode, directly invoking the source scripts. This is useful for debugging:

```
npm run debug
```

Full API documentation of jclic.js is available at: http://projectestac.github.io/jclic.js/doc

The project is also available as a [NPM](https://www.npmjs.com/package/jclic) and [Bower](https://libraries.io/bower/jclic) packages.

## Direct download

The latest version of the compiled and minified script `jclic.min.js` is currently available at the following locations:

- https://unpkg.com/jclic/dist/jclic.min.js
- https://clic.xtec.cat/dist/jclic.js/jclic.min.js
- https://cdn.jsdelivr.net/npm/jclic@latest/dist/jclic.min.js
- https://cdnjs.com/libraries/jclic.js

## Components

JClic.js makes use of:
* [jQuery](https://jquery.com/) to parse XML documents and manage DOM objects
* [JSZip](https://stuk.github.io/jszip/) to extract contents from "jclic.zip" files
* [clipboard.js](https://github.com/lgarron/clipboard.js) to copy reports data into the user's clipboard
* [i18next](https://github.com/i18next/i18next) to deal with messages translated into different languages
* [screenfull.js](https://github.com/sindresorhus/screenfull.js) to allow activities play at full screen
* [script.js](https://github.com/ded/script.js) to read JClic projects from local file systems as JSONP
* [webfontloader](https://github.com/typekit/webfontloader) to dynamically load web fonts as needed
* [MidiPlayerJS](https://github.com/grimmdude/MidiPlayerJS), [soundfont-player](https://github.com/danigb/soundfont-player), [audio-loader](https://github.com/audiojs/audio-loader) and [sample-player](https://github.com/danigb/sample-player) to process and play MIDI files

The build process of JClic.js makes use of:
* [npm](https://www.npmjs.com/) (the package manager of [Node.js](https://nodejs.org/)) to build, install, update and track package dependencies
* [ESLint](https://eslint.org/) to check for errors and lint the source code
* [webpack](https://webpack.js.org/) to bundle all components together
* [Babel](https://babeljs.io/) to make it also compatible with old versions of some browsers
* [UglifyJS](https://github.com/mishoo/UglifyJS2) to minimize the size of the final deliverable script
* [Live Server](https://github.com/tapio/live-server) to test and debug
* [JSDoc](http://usejsdoc.org/) and [ink-bootstrap](https://github.com/docstrap/docstrap) to build the [API docs](http://projectestac.github.io/jclic.js/doc)

## Sponsors that make possible JClic.js

[![XTEC](https://github.com/projectestac/jclic.js/blob/master/misc/graphics/logo-xtec.png?raw=true)](http://www.xtec.cat)<br>
JClic.js is an open-source project sustained by [XTEC](http://www.xtec.cat), the Telematic Network of the Catalan Ministry of Education.

[![BrowserStack](https://github.com/projectestac/jclic.js/blob/master/misc/graphics/logo-browserstack.png?raw=true)](https://www.browserstack.com)<br>
Checking the operation of JClic.js on different browsers and platforms is possible thanks to virtual machines provided by [BrowserStack](https://www.browserstack.com).

[![JSDelivr](https://github.com/projectestac/jclic.js/blob/master/misc/graphics/logo-jsdelivr.png?raw=true)](http://www.jsdelivr.com/projects/jclic.js)<br>
The production releases of JClic.js are smoothly distributed to the final users thanks to the [JSDelivr](http://www.jsdelivr.com/projects/jclic.js) network of servers.

[![cdnjs](https://github.com/projectestac/jclic.js/blob/master/misc/graphics/logo-cdnjs.png?raw=true)](https://cdnjs.com/libraries/jclic.js)<br>
All project files are also available through [cdnjs](https://cdnjs.com/about), a very powerful content delivery service powered by [Cloudflare](https://www.cloudflare.com).

[![Transifex](https://github.com/projectestac/jclic.js/blob/master/misc/graphics/logo-transifex.png?raw=true)](https://github.com/projectestac/jclic.js/blob/master/TRANSLATIONS.md)<br>
We use [Transifex](https://www.transifex.com/francesc/jclicjs) as a platform to translate JClic.js into many languages. Please read [TRANSLATIONS.md](https://github.com/projectestac/jclic.js/blob/master/TRANSLATIONS.md) if you want to contribute to the project creating a new translation or improving the existing ones.
