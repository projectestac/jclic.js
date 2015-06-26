#JClic.js - HTML5 player for JClic activities (under construction!)

[JClic.js](https://github.com/projectestac/jclic.js) is an HTML5 player
for [JClic](https://github.com/projectestac/jclic) activities

## How to set-up the development environtment

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

To build jclic.js and the documentation, just run:

```
grunt
```

This will generate the file `jclic. min.js` in the `dist` folder, and the project
documentation in `doc`. 

To test the module and see the demo in your browser, just launch the test server running:

```
grunt server
```
