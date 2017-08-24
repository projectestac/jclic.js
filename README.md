# JClic.js

[![Bower version](https://badge.fury.io/bo/jclic.svg)](https://badge.fury.io/bo/jclic)
[![npm version](https://badge.fury.io/js/jclic.svg)](https://badge.fury.io/js/jclic)
[![Join the chat at https://gitter.im/projectestac/jclic.js](https://badges.gitter.im/projectestac/jclic.js.svg)](https://gitter.im/projectestac/jclic.js?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

[JClic.js](https://github.com/projectestac/jclic.js) is an HTML5 player of [JClic](https://github.com/projectestac/jclic) activities. See a [demo](http:s//clic.xtec.cat/projects/demo_eng/jclic.js/index.html) on how it works.

## JClic and JClic-repo

[JClic](http://clic.xtec.cat) is a free software project from the [Catalan Educational Telematic Network](http://www.xtec.cat) (XTEC) for creating various types of interactive activities such as associations, puzzles, text activities, crosswords or puzzles, from elements of text, graphics and multimedia.

The program includes an authoring tool to create activities, a player and a reporting system that stores the results obtained by students. All these components, along with some guides and tutorials on how to create activities, are available in the [clicZone](http://clic.xtec.cat/en/jclic/download.htm).

JClic is a Java application that runs on Linux, Windows and Mac OS. Full [source code](https://github.com/projectestac/jclic) and [documentation](http://projectestac.github.io/jclic/) are available on GitHub.

Many teachers from different countries have used JClic to create interactive materials for a wide variety of levels, subjects, languages and curriculum areas. Some of these materials have been collected in a huge [library](https://clic.xtec.cat/repo) created with [jclic-repo](https://github.com/projectestac/jclic-repo), another open source project that will facilitate the publication of collections of JClic projects in static web hosting services.

## Known issues

* Support for special skins are not yet implemented. Only stock skins are available.
* Playing of MIDI files not yet implemented
* Loading of big (about 10MB) JClic project files from zipped files can crash on tablets and mobile devices with low memory resources. This is due to a [known issue](https://github.com/Stuk/jszip/issues/135) of JSZip.
* The project has been tested only with the latest versions of Chrome/Chromium and Firefox.

## How to build JClic.js

JClic.js uses [Node.js](https://nodejs.org/) modules encapsulated in [npm](https://www.npmjs.com/) packages. First of all, you must have Node.js (which includes 'npm') [installed](https://nodejs.org/download/) on your system.


To install the required packages, just go to the project's root directory and write:

```
npm install
```

This will install jQuery, Webpack and other needed components into `node_modules`

To build jclic.js, just invoke:

```
npm run build
```

This will generate the file `dist/jclic.min.js`

To test this resulting bundle and see the demo on your browser, launch the test server:

```
npm start
```

You can also launch the program in "unbundled" mode, directly invoking the source scripts, useful for debug purposes:

```
npm run debug
```

Full API documentation of jclic.js is available at: http://projectestac.github.io/jclic.js/doc

The project is also available as a [NPM](https://www.npmjs.com/package/jclic) and [Bower](https://libraries.io/bower/jclic) packages.

## Direct download

The latest version of the compiled and minified script `jclic.min.js` is currently available at the following locations:

- https://unpkg.com/jclic/dist/jclic.min.js
- https://clic.xtec.cat/dist/jclic.js/jclic.min.js
- https://cdn.jsdelivr.net/jclic.js/latest/jclic.min.js

## Sponsors that make possible JClic.js

[![XTEC](https://github.com/projectestac/jclic.js/blob/master/misc/graphics/logo-xtec.png?raw=true)](http://www.xtec.cat)<br>
JClic.js is an open-source project sustained by [XTEC](http://www.xtec.cat), the Telematic Network of the Catalan Ministry of Education.

[![BrowserStack](https://github.com/projectestac/jclic.js/blob/master/misc/graphics/logo-browserstack.png?raw=true)](https://www.browserstack.com)<br>
Checking the operation of JClic.js on different browsers and platforms is now possible thanks to virtual machines provided by [BrowserStack](https://www.browserstack.com).

[![JSDelivr](https://github.com/projectestac/jclic.js/blob/master/misc/graphics/logo-jsdelivr.png?raw=true)](http://www.jsdelivr.com/projects/jclic.js)<br>
The production releases of JClic.js are smoothly distributed to the final users thanks to the [JSDelivr](http://www.jsdelivr.com/projects/jclic.js) network of servers.

[![Transifex](https://github.com/projectestac/jclic.js/blob/master/misc/graphics/logo-transifex.png?raw=true)](https://github.com/projectestac/jclic.js/blob/master/TRANSLATIONS.md)<br>
We use [Transifex](https://www.transifex.com/francesc/jclicjs) as a platform to translate JClic.js into many languages. Please read [TRANSLATIONS.md](https://github.com/projectestac/jclic.js/blob/master/TRANSLATIONS.md) if you want to contribute to the project creating a new translation or improving the existing ones.

