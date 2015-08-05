#JClic.js

[JClic.js](https://github.com/projectestac/jclic.js) is an HTML5 player
of [JClic](https://github.com/projectestac/jclic) activities.

## JClic

[JClic](http://clic.xtec.cat) is an open source authoring system promoted by the Catalan Ministry of
Education ([XTEC](http://www.xtec.cat)) that allows the creation of interactive learning __activities__.
These activities can be puzzles (with different shapes and distributions), associations, memory games,
scrambled letters, crosswords and several types of text activities (fill-in the gap, put in order
words or paragraphs, identify words or letters, etc.).

Groups of single activities are often grouped in __JClic projects__ and organized in one or more
__sequences__ (lists of activities that must be performed in a specific order). The resulting set of
activities, sequences and media elements are packaged into __JClic project files__ (files with
extension ".jclic.zip").

Since 1995, the JClic project has a huge community of users and a
[library](http://clic.xtec.cat/db/listact_en.jsp) of free JClic projects created by teachers of
different countries and shared under licenses of type _Creative Commons_.

JClic has been developed in Java and has multiple [components](http://clic.xtec.cat/en/jclic/download.htm):
authoring tool, standalone player, applet, packaging and reporting system. The
[source code](https://github.com/projectestac/jclic) and the [documentation](http://projectestac.github.io/jclic/)
of JClic are freely available on GitHub.

## Known issues

* This project is a work on progress. Only some basic features of JClic are implemented.
* Text activities of type "complete", "order" and "identify" are not yet implemented.
* Only a basic implementation of "skin" is provided, without counters nor buttons.
* The JClic reporting system is not yet implemented.
* Event sounds are not yet implemented.
* Video playing and recording/playing of sounds are not yet implemented.
* Playing of MIDI files is not yet implemented
* Loading of big (about 10MB) JClic project files from zipped files can crash on tablets
and mobile devices with low memory resources. This is due to a
[known issue](https://github.com/Stuk/jszip/issues/135) of JSZip.
* The project has been tested only with the latest versions of Chrome/Chromium and Firefox.

## How to build JClic.js

JClic.js uses [Node.js](https://nodejs.org/) modules encapsulated in
[npm](https://www.npmjs.com/) packages. First of all, you must have Node.js
(which includes 'npm' by default) [installed](https://nodejs.org/download/)
on your system.

To update `npm` to the latest version, run:

```
sudo npm install npm -g
```

We use [Grunt](http://gruntjs.com/) for automation of building tasks. You must globally install this
package running:

```
sudo npm install -g grunt-cli
```

To install the remaining packages, just go to the project's root directory and run:

```
npm install
```

This will install jQuery, Browserify and other needed components into `node_modules` 

To build jclic.js, just run:

```
grunt
```

This will generate the file `jclic.min.js` into the `dist` folder.

To test the module and see the demo in your browser, just launch the test server running:

```
grunt server
```

For full documentation of the API, see: [http://projectestac.github.io/jclic.js/doc/index.html]

