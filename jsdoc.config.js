

// Todo: clean 'doc' and copy icon
const fs = require('fs')
fs.createReadStream('misc/jsdoc/ico.png').pipe(fs.createWriteStream('doc/ico.png'));

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
    logo: 'ico.png',
    cleverLinks: true,
    monospaceLinks: true,
    dateFormat: 'ddd MMM Do YYYY',
    outputSourceFiles: true,
    outputSourcePath: true,
    default: {
      outputSourceFiles: true
    },
    systemName: 'JClic.js',
    applicationName: 'JClic.js',
    disqus: '',
    footer: '',
    copyright: '',
    navType: 'inline',
    theme: 'yeti',
    linenums: true,
    collapseSymbols: false,
    //analytics: { ua: 'UA-XXXXX-XXX', domain: 'XXXX' },
    googleAnalytics: '',
    inverseNav: true,
    highlightTutorialCode: true,
    syntaxTheme: 'default',
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
