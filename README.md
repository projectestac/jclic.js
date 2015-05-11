#JClic.js - HTML5 player for JClic activities (under construction!)

**WARNING: This project is just for testing purposes and not yet operational!!!**

[JClic.js](https://github.com/projectestac/jclic.js) is an HTML5 player for
[JClic](https://github.com/projectestac/jclic) activities

## How to set-up the development environtment

JClic.js uses [Node.js](https://nodejs.org/) modules encapsulated in [npm](https://www.npmjs.com/) 
packages. First of all, you must have Node.js (which includes 'npm' by default)
[installed](https://nodejs.org/download/) on your system.

To update `npm` to the latest version, run:

```
sudo npm install npm -g
```

We use [Grunt](http://gruntjs.com/) for automating tasks and [Browserify](http://browserify.org/)
for module dependency checking and grouping of all JavaScript sources into one single file.

You must globally install these two packages by running:

```
sudo npm install -g grunt-cli browserify
```

To install the remaining packages, just go to the root directory of JClic.js and run:

```
npm install
```

That's all!

To build the sources and the documentation, just run:

```
grunt
```
