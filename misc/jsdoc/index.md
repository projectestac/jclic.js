<a href="https://github.com/projectestac/jclic.js"><img style="position: absolute; top: 0; right: 0; border: 0;" src="https://camo.githubusercontent.com/365986a132ccd6a44c23a9169022c0b5c890c387/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f7265645f6161303030302e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_red_aa0000.png"></a>

JClic.js
========

A JavaScript player of __JClic__ activities.<br>


## JClic and JClic-repo

[JClic](http://clic.xtec.cat) is a free software project from the [Catalan Educational Telematic Network](http://www.xtec.cat) (XTEC) for creating various types of interactive activities such as associations, puzzles, text activities, crosswords or puzzles, from elements of text, graphics and multimedia.

The program includes an authoring tool to create activities, a player and a reporting system that stores the results obtained by students. All these components, along with some guides and tutorials on how to create activities, are available in the [clicZone](http://clic.xtec.cat/en/jclic/download.htm).

JClic is a Java application that runs on Linux, Windows and Mac OS. Full [source code](https://github.com/projectestac/jclic) and [documentation](http://projectestac.github.io/jclic/) are available on GitHub.

Many teachers from different countries have used JClic to create interactive materials for a wide variety of levels, subjects, languages and curriculum areas. Some of these materials have been collected in a huge [library](http://clic.xtec.cat/repo) created with [jclic-repo](https://github.com/projectestac/jclic-repo), another open source project that will facilitate the publication of collections of JClic projects in static web hosting services.

## JClic project files

Groups of single __activities__ are often grouped in __JClic projects__ and organized in one or more __sequences__ (lists of activities that must be performed in a specific order). The resulting set of activities, sequences and media elements are packaged into __JClic project files__ (files with extension ".jclic.zip").

## JClic.js components

JClic.js makes use of:
* [jQuery](https://jquery.com/) to parse XML documents and manage DOM objects
* [JSZip](https://stuk.github.io/jszip/) to extract contents from "jclic.zip" files
* [clipboard.js](https://github.com/lgarron/clipboard.js) to copy reports data into the user's clipboard
* [i18next](https://github.com/i18next/i18next) to deal with messages translated into different languages
* [screenfull.js](https://github.com/sindresorhus/screenfull.js) to allow activities play at full screen
* [script.js](https://github.com/ded/script.js) to read JClic projects from local file systems as JSONP
* [webfontloader](https://github.com/typekit/webfontloader) to dynamically load web fonts as needed

The build brocess of JClic.js is based on:
* [npm](https://www.npmjs.com/) (the package manager of [Node.js](https://nodejs.org/)) to build, install,
update and track package dependencies.
* [webpack](https://webpack.js.org) to allow the use of npm modules in browsers and package all scripts and assets into a single, minified javascript file.
* [JSDoc](http://usejsdoc.org/) to generate this documentation.
* [JSHint](http://jshint.com/) to detect possible errors and check code quality.

## How to set-up the development environtment

JClic.js uses [Node.js](https://nodejs.org/) modules encapsulated in [npm](https://www.npmjs.com/) packages. First of all, you must have Node.js (which includes 'npm') [installed](https://nodejs.org/download/) on your system.

To install the required packages, just go to the project's root directory and write:

```
npm install
```

This will install jQuery, webpack and other needed components into `node_modules` 

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

You can also build this documentation running `npm run build-doc`

## JClic.js main classes

JClic.js is organized in three main groups of classes: _Player_, _Document_ and _Utilities_. In addition to this, the main [JClic](module-JClic.html) class provides methods to read JClic project documents, build players, launch activities and communicate with external reporting systems.

&nbsp;
#### Player

[JClicPlayer](JClicPlayer.html) loads JClic project files, manages the user interaction and acts as a interface between the browser and JClic classes for multiple functions. The player has:

* [Skin](Skin.html): manages the visual appareance. Can have up to three [Counter](Counter.html) objects.
  * [DefaultSkin](DefaultSkin.html): is the basic implementation of _Skin_.
  * [BlueSkin](BlueSkin.html), [OrangeSkin](OrangeSkin.html), [GreenSkin](GreenSkin.html), [MiniSkin](MiniSkin.html) and [SimpleSkin](SimpleSkin.html): are the implementations of the stock skins of JClic.
* [PlayerHistory](PlayerHistory.html): used to track the user's navigation between activities.
* [Reporter](Reporter.html): Used to collect and display scores, times and other data generated by users while playing activities.
  * [TCPReporter](TCPReporter.html): Special case of _Reporter_ used to connect with external reporting systems like [JClic Reports](http://clic.xtec.cat/en/jclic/reports/index.htm) or the [JClic module for Moodle](https://moodle.org/plugins/view.php?id=305).
  * [SCORM](SCORM.js): Utility functions to interact with SCORM 1.2 and 2004 when available

&nbsp;
#### Document classes

[JClicProject](JClicProject.html) encapsulates all data needed to play JClic activities. Its main components are:
* [ProjectSettings](ProjectSettings.html)
* A collection of [Activity](Activity.html) objects (see below)
* An [ActivitySequence](ActivitySequence.html) formed by [ActivitySequenceElement](ActivitySequenceElement.html) objects.
* A [MediaBag](MediaBag.html) formed by [MediaBagElement](MediaBagElement.html) objects.

The [Activity](Activity.html) class has the following subclasses:
* [SimpleAssociation](SimpleAssociation.html)
  * [ComplexAssociation](ComplexAssociation.html)
* [WrittenAnswer](WrittenAnswer.html)
* [MemoryGame](MemoryGame.html)
* [Explore](Explore.html)
* [Identify](Identify.html)
* [InformationScreen](InformationScreen.html)
* [DoublePuzzle](DoublePuzzle.html)
* [ExchangePuzzle](ExchangePuzzle.html)
* [HolePuzzle](HolePuzzle.html)
* [TextActivityBase](TextActivityBase.html) (see below)
  * [FillInBlanks](FillInBlanks.html)
  * [Complete](Complete.html)
  * [IdentifyText](IdentifyText.html)
  * [OrderText](OrderText.html)
* [CrossWord](CrossWord.html)
* [WordSearch](WordSearch.html)

All classes derived from [TextActivityBase](TextActivityBase.html) have:
* One [TextActivityDocument](TextActivityDocument.html)
* An [Evaluator](Evaluator.html)

At run time, all classes derived from [Activity](Activity.html) generate a specific [Activity.Panel](Activity.Panel.html), that is a real DOM object with wich users interact.

&nbsp;
#### Utility classes

__AWT:__
[AWT](AWT.html): contains some classes similar to those defined in Java's [Abstract Window Toolkit](http://docs.oracle.com/javase/7/docs/api/java/awt/package-summary.html):
* [AWT.Font](AWT.Font.html)
* [AWT.Gradient](AWT.Gradient.html)
* [AWT.Stroke](AWT.Stroke.html)
* [AWT.Point](AWT.Point.html)
* [AWT.Dimension](AWT.Dimension.html)
* [AWT.Shape](AWT.Shape.html)
  * [AWT.Rectangle](AWT.Rectangle.html)
  * [AWT.Ellipse](AWT.Ellipse.html)
  * [AWT.Path](AWT.Path.html): formed by [AWT.PathStroke](AWT.PathStroke.html) elements
* [AWT.Action](AWT.Action.html)
* [AWT.Timer](AWT.Timer.html)
* [AWT.Container](AWT.Container.html)

__Boxes:__
[AbstractBox](AbstractBox.html) is a special class derived from [AWT.Rectangle](AWT.Rectangle.html) that has the following subclasses:
* [ActiveBox](ActiveBox.html): an AbstractBox with active content (see below)
* [BoxBag](BoxBag.html): a collection of AbstractBox objects.
  * [ActiveBoxBag](ActiveBoxBag.html): a collection of [ActiveBox](ActiveBox.html) objects.
    * [ActiveBoxGrid](ActiveBoxGrid.html): a special case of ActiveBoxBag with boxes distributed in rows and columns.
* [TextGrid](TextGrid.html): a grid of single letters.

__Box content:__
* [ActiveBoxContent](ActiveBoxContent.html): encapsulates the content of a single _ActiveBox_.
* [BoxBase](BoxBase.html): contains style specs (color, gradient, border, font, size...) common to one or more _ActiveBoxContent_ objects. Also used by _TextActivityDocument_ to encapsulate text styles.
* [ActiveBagContent](ActiveBagContent.html): a collection of _ActiveBoxContent_ objects.
* [TextGridContent](TextGridContent.html): encapsulates the content of a _TextGrid_ object.

__Shapers:__
* [Shaper](Shaper.html): describes how to cut a panel in multiple cells.
  * [Rectangular](Rectangular.html): divides the panel in rectangular cells.
  * [Holes](Holes.html): a free-form shaper.
  * [JigSaw](JigSaw.html): generates cells with teeth and slots.
    * [ClassicJigSaw](ClassicJigSaw.html)
    * [TriangularJigSaw](TriangularJigSaw.html)

__Media:__
* [EventSounds](EventSounds.html): a collection of [EventSoundsElement](EventSoundsElement.html)
* [ActiveMediaBag](ActiveMediaBag.html): a collection of [MediaContent](MediaContent.html)
* [ActiveMediaPlayer](ActiveMediaPlayer.html): performs playing of _MediaContent_

__Automation:__
* [AutoContentProvider](AutoContentProvider.html): builds dynamic content for activities
  * [Arith](Arith.html): random generator of menthal arithmetics operations

__Jump between sequence points:__
* [JumpInfo](JumpInfo.html): stores information about what to do when an activity finishes or when the user clicks on a link or button.
  * [ActivitySequenceJump](ActivitySequenceJump.html): used by _ActivitySequenceElement_ objects.
  * [ConditionalJumpInfo](ConditionalJumpInfo.html): used to decide where to jump, based on the current timing and scoring

__Miscellaneous utility classes:__
* [BoxConnector](BoxConnector.html)
* [Utils](Utils.html)
* [i18n](i18n.js)

## Sponsors that make possible JClic.js

JClic is an open-source project supported by [XTEC](http://www.xtec.cat), the Telematic Network of the Catalan Ministry of Education

We use [Transifex](https://www.transifex.com/francesc/jclicjs) as a platform for translations of JClic.js into many languages. Please read [TRANSLATIONS.md](https://github.com/projectestac/jclic.js/blob/master/TRANSLATIONS.md) if you want to contribute to the project creating a new translation or improving the existing ones.

Checking the operation of JClic.js on different browsers and platforms is possible thanks to [BrowserStack](https://www.browserstack.com)

The production releases of JClic.js are smoothly distributed to the final users thanks to [JSDelivr](http://www.jsdelivr.com/projects/jclic.js) and [XTEC](http://www.xtec.cat)

__jclic.js__ is also available as a [NPM](https://www.npmjs.com/package/jclic) and [Bower](https://libraries.io/bower/jclic) packages.

[![Join the chat at https://gitter.im/projectestac/jclic.js](https://badges.gitter.im/projectestac/jclic.js.svg)](https://gitter.im/projectestac/jclic.js?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
