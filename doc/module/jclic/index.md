---
title: JClic
kind: module
longname: module:JClic
description: "This is the main method of JClic Executes on document.ready() . The method iterates over all div objects with JClic class and creates a {@link module:JClicPlayer.JClicPlayer JClicPlayer} within them. Each player loads the JClic project file specified in the data-project attribute of the div tag. The div elements must preferabily be empty. Inner content may become overlapped by objects created by the JClic player. This method exports the global variable window.JClicObject , useful when other scripts need to make direct calls to the main components of JClic. The main members of the global variable JClicObject are: JClicObject.JClicPlayer (the {@link module:JClicPlayer} object) JClicObject.JClicProject (the {@link module:JClicProject} object) JClicObject.AWT (the {@link module:AWT} object) JClicObject.Utils (the {@link module:Utils} object) JClicObject.$ (the JQuery object) JClicObject.options (the main options loaded at startup, usually the content of the global variable JClicDataOptions ) JClicObject.projectFiles (used by JSONP to store the content of some files when inaccessible to the browser because CORS or other restrictions) JClicObject.currentPlayers (array with references to the players currently running) JClicObject.loadProject (a function that starts a JClicPlayer on a specific div )"
---

# JClic

<SourceLink href="/source/jclic-js/#L85" label="JClic.js:85" />

This is the main method of JClic

Executes on `document.ready()`.

The method iterates over all `div` objects with `JClic` class and creates a [JClicPlayer](/module/jclicplayer#jclicplayer)\
within them. Each player loads the JClic project file specified in the `data-project` attribute of\
the `div` tag.

The `div` elements must preferabily be empty. Inner content may become overlapped by objects\
created by the JClic player.

This method exports the global variable `window.JClicObject`, useful when other scripts\
need to make direct calls to the main components of JClic.

The main members of the global variable `JClicObject` are:

- `JClicObject.JClicPlayer` (the [module:JClicPlayer](/module/jclicplayer) object)
- `JClicObject.JClicProject` (the [module:JClicProject](/module/project-jclicproject#jclicproject) object)
- `JClicObject.AWT` (the [module:AWT](/module/awt) object)
- `JClicObject.Utils` (the [module:Utils](/module/utils) object)
- `JClicObject.$` (the JQuery object)
- `JClicObject.options` (the main options loaded at startup, usually the content of the global variable `JClicDataOptions`)
- `JClicObject.projectFiles` (used by JSONP to store the content of some files when inaccessible to the browser because CORS or other restrictions)
- `JClicObject.currentPlayers` (array with references to the players currently running)
- `JClicObject.loadProject` (a function that starts a JClicPlayer on a specific `div`)

**Example**

Creates a JClic div and loads "myproject.jclic" on it:

```js
<div class ="JClic" data-project="myproject.jclic"></div>
```

Creates a JClic div that loads "myproject.jclic" with additional parameters, passed as a JSON string.
Note that `data-options` should be delimited by apostrophes `'` because quotation marks `"` are used
for JSON keys and values:

```js
<div class ="JClic" data-project="myproject.jclic" data-options='{"fade":"400","lang":"es","reporter":"TCPReporter","user":"test01","path":"localhost:9090"}'></div>
```

---

## Static Methods

<MemberHeading
  id="loadproject"
  depth="3"
  name="loadProject"
  sig="loadProject(
	div: external:HTMLElement,
	projectName: string,
	options?: object,
): module:JClicPlayer.JClicPlayer"
/>

<MemberMeta badges="static" sourceHref="/source/jclic-js/#L105" sourceLabel="JClic.js:105" />

Creates a new JClicPlayer hosted on the specified `div`, and loads an specific project on it.

**Parameters**

- `div` ([external:HTMLElement](/module/utils#htmlelement)) — The HTML element (usually a `<div/>`) that will be used as a main container of the player.
- `projectName` (string) — The file name or URL of the JClic project to be loaded
- `options` (object, optional) — An optional set of preferences

**Returns**

- [`module:JClicPlayer.JClicPlayer`](/module/jclicplayer#jclicplayer)
