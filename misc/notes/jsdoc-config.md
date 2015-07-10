
JSDoc configuration
===================

Settings introduced in __Gruntfile.js__ to use [docstrap](https://github.com/terryweiss/docstrap)

```
template: 'node_modules/grunt-jsdoc/node_modules/ink-docstrap/template'
configure: 'jsdoc.conf.json'
```

Important settings in __jsdoc.conf.json__:

```
"plugins": ["plugins/markdown"],
...
"templates": {
  ...
  "systemName": "JClic.js",
  "theme": "yeti",
  ...  
},
```

See also the "lumen" theme.

### Changes made in _yeti_ theme ###

File: `node_modules/grunt-jsdoc/node_modules/ink-docstrap/template/static/styles/site.yeti.css`

_Line 1254:_
```
h4,
.h4 {
  font-size: 14pt;
  padding: 5px;
  background-color: lavender;
  border-radius: 5px;
}
```

_Line 1418:_
```
dt {
  //font - weight: bold;
}
```

_Line 3849:_
```
.nav > li > a {
  position: relative;
  display: block;
  padding: 2px 15px;
}
```

_Line 6944:_
```
code {
  background-color: lavender;
  border: none;
  color: darkcyan;
}
```
