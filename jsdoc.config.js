/**
 * Suggested changes to make in node_modules/gc-jaguarjs-jsdoc
 * prior to build the documentation:
 * 
 * - Files `less/common.less` and `less/navigation.less`:
 *   Change all occurrences of `Helvetica` by `Helvetica,sans-serif`
 * 
 * - File `less/main.less`, starting at line 76, add to `span.type-signature`:
 *     background-color: @colorStaticBubbleBg;
 *     margin-right: 5px;
 * 
 * - Finish recompiling with:
 *     cd node_modules/gc-jaguarjs-jsdoc
 *     npm i
 *     grunt less
 *     (package `grunt-cli` mut be globally installed)
 * 
 */

const fs = require('fs-extra')

// Empty "doc" and copy "ico.png"
fs.emptyDirSync('doc')
fs.copySync('misc/jsdoc/ico.png', 'doc/ico.png')

module.exports = {
  source: {
    include: ['misc/jsdoc/index.md', 'src'],
    includePattern: '.+\\.js$',
    exclude: ['src/GlobalData.js']
  },  
  opts: {
    recurse: true,
    verbose: true,
    destination: 'doc',
    template: 'node_modules/gc-jaguarjs-jsdoc',
  },
  tags: {
    allowUnknownTags: true
  },
  plugins: ['plugins/markdown'],
  templates: {
    systemName: 'JClic.js',
    applicationName: 'JClic.js',
    footer: '',
    copyright: '',
    includeDate: false,
    dateFormat: 'ddd MMM Do YYYY',
    navType: 'inline',
    xtheme: 'yeti',
    theme: 'paper',
    linenums: true,
    collapseSymbols: false,
    inverseNav: true,
    outputSourceFiles: true,
    outputSourcePath: true,
    default: {
      outputSourceFiles: true
    },
    syntaxTheme: 'default',
    sort: true,
    search: true,
    
    logo: 'ico.png',
    cleverLinks: true,
    monospaceLinks: true,
    disqus: '',
    //analytics: { ua: 'UA-XXXXX-XXX', domain: 'XXXX' },
    googleAnalytics: '',
    highlightTutorialCode: true,
    protocol: 'html://',
    openGraph: {
      title: '',
      type: 'website',
      image: '',
      site_name: '',
      url: ''
    },
    meta: {
      title: '',
      description: '',
      keyword: ''
    }
  },
  markdown: {
    parser: 'gfm',
    hardwrap: true,
    tags: ['examples']
  }
}
