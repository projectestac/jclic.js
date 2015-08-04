#JClic.js - HTML5 player for JClic activities (under construction!)

[JClic.js](https://github.com/projectestac/jclic.js) is an HTML5 player
for [JClic](https://github.com/projectestac/jclic) activities



## Known issues

* Text activities of type "complete", "order" and "identify" are not yet implemented.
* Only a basic implementation of "skin" is provided, without counters nor buttons.
* The JClic reporting system is not yet implemented.
* Event sounds are not yet implemented.
* Video playing and recording/playing of voice are not yet implemented.
* Playing of MIDI files is not yet implemented
* Loading of big (about 10MB) JClic project files from zipped files can crash on tablets
and mobile devices with low memory resources. This is due to a
[known issue](https://github.com/Stuk/jszip/issues/135) of JSZip.


## How to build JClic.js

JClic.js uses [Node.js](https://nodejs.org/) modules encapsulated in
[npm](https://www.npmjs.com/) packages. First of all, you must have Node.js
(which includes 'npm' by default) [installed](https://nodejs.org/download/)
on your system.

To update `npm` to the latest version run:

```
sudo npm install npm -g
```

We use [Grunt](http://gruntjs.com/) for automation of building tasks, and
[Browserify](http://browserify.org/) for dependency checking and grouping of
multiple JavaScript sources into one single file.

You must globally install these two packages by running:

```
sudo npm install -g grunt-cli browserify
```

To install the remaining packages, just go to the project's root directory and run:

```
npm install
```

This will install JQuery and other needed packages into `node_modules` 

To build jclic.js, just run:

```
grunt
```

This will generate the file `jclic. min.js` in the `dist` folder.

To test the module and see the demo in your browser, just launch the test server running:

```
grunt server
```
