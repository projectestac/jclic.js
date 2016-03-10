#JClic.js

[JClic.js](https://github.com/projectestac/jclic.js) is an HTML5 player of [JClic](https://github.com/projectestac/jclic) activities. See a [demo](http://clic.xtec.cat/repo/player.html?demo_eng/jclic.js/demo.jclic) on how it works.

## JClic and JClic-repo

[JClic](http://clic.xtec.cat) is a free software project from the [Catalan Educational Telematic Network](http://www.xtec.cat) 
(XTEC) for creating various types of interactive activities such as associations, puzzles, text activities,
crosswords or puzzles, from elements of text, graphics and multimedia.

The program includes an authoring tool to create activities, a player and a reporting system that stores
the results obtained by students. All these components, along with some guides and tutorials on how to
create activities, are available in the [clicZone](http://clic.xtec.cat/en/jclic/download.htm).

JClic is a Java application that runs on Linux, Windows and Mac OS. Full [source code](https://github.com/projectestac/jclic)
and [documentation](http://projectestac.github.io/jclic/) are available on GitHub.

Many teachers from different countries have used JClic to create interactive materials for a wide variety
of levels, subjects, languages and curriculum areas. Some of these materials have been collected in a 
huge [library](http://clic.xtec.cat/repo) created with [jclic-repo](https://github.com/projectestac/jclic-repo),
another open source project that will facilitate the publication of collections of JClic projects in
static web hosting services.


## Known issues

* This project is a work on progress. Some advanced features are not yet implemented.
* Only a basic implementation of "skin" is provided, without counters nor buttons.
* The JClic reporting system is not yet implemented.
* Playing of MIDI files is not yet implemented
* Loading of big (about 10MB) JClic project files from zipped files can crash on tablets
and mobile devices with low memory resources. This is due to a
[known issue](https://github.com/Stuk/jszip/issues/135) of JSZip.
* The project has been tested only with the latest versions of Chrome/Chromium and Firefox.

## How to build JClic.js

JClic.js uses [Node.js](https://nodejs.org/) modules encapsulated in [npm](https://www.npmjs.com/)
packages. First of all, you must have Node.js (which includes 'npm' by default) [installed](https://nodejs.org/download/)
on your system.

To update `npm` to the latest version, run:

```
sudo npm install -g npm
```

We use [Grunt](http://gruntjs.com/) for automation of building tasks. You must globally install this package:

```
sudo npm install -g grunt-cli
```

To install the remaining packages, just go to the project's root directory and launch:

```
npm install
```

This will install jQuery, Browserify and other needed components into `node_modules` 

To build jclic.js, just launch:

```
grunt
```

This will generate the file `jclic.min.js` on the `dist` folder.

To test the module and see the demo on your browser, just launch the test server running:

```
grunt server
```

Full API documentation of jclic.js is available at: http://projectestac.github.io/jclic.js/doc

__jclic.js__ is also available as a [NPM](https://www.npmjs.com/package/jclic) and [Bower](https://libraries.io/bower/jclic)
packages.
