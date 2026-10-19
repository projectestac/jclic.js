## Exported objects in the 'jclic' NodeJS package

### Objects from jQuery
$
jQuery

### Objects from other packages, linked in `Utils.pkg`
pkg.$ (redundant)
pkg.JSZip
pkg.JSZipUtils

### JClic objects

#### Constants defined in Utils

// Possible values for `Utils.getTriState`
DEFAULT = 2
TRUE = 1
FALSE = 0

// Log system
LOG_LEVELS = ['none', 'error', 'warn', 'info', 'debug', 'trace', 'all']
LOG_OPTIONS = {
  level: 2, // warn
  prefix: 'JClic',
  timestamp: true,
  popupOnErrors: false,
  chainTo: null,
  pipeTo: null,
}
LOG_PRINT_LABELS = ['     ', 'ERROR', 'WARN ', 'INFO ', 'DEBUG', 'TRACE', 'ALL  ']

#### `settings` constant
settings = {
  // JClic.js Version
  VERSION: GlobalData.version,
  // Check if we are running on NodeJS with JSDOM
  NODEJS: typeof window === 'undefined' || window?.navigator?.userAgent?.includes('jsdom'),
  // layout constants
  AB: 0, BA: 1, AUB: 2, BUA: 3,
  LAYOUT_NAMES: ['AB', 'BA', 'AUB', 'BUA'],
  DEFAULT_WIDTH: 400,
  DEFAULT_HEIGHT: 300,
  MINIMUM_WIDTH: 40,
  MINIMUM_HEIGHT: 40,
  DEFAULT_NAME: '---',
  DEFAULT_MARGIN: 8,
  DEFAULT_SHUFFLES: 31,
  DEFAULT_GRID_ELEMENT_SIZE: 20,
  MIN_CELL_SIZE: 10,
  DEFAULT_BG_COLOR: '#C0C0C0', // LightGray
  ACTIONS: {
    ACTION_MATCH: 'MATCH', ACTION_PLACE: 'PLACE',
    ACTION_WRITE: 'WRITE', ACTION_SELECT: 'SELECT', ACTION_HELP: 'HELP'
  },
  PREVIOUS: 0, MAIN: 1, END: 2, END_ERROR: 3, NUM_MSG: 4,
  MSG_TYPE: ['previous', 'initial', 'final', 'finalError'],
  RANDOM_CHARS: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  NUM_COUNTERS: 3,
  MAX_RECORD_LENGTH: 180,
  // BoxBase defaults
  BoxBase: {
    REDUCE_FONT_STEP: 1.0,
    MIN_FONT_SIZE: 8,
    STROKE: 1,
    AC_MARGIN: 6,
    BACK_COLOR: '#C0C0C0',
    TEXT_COLOR: 'black',
    SHADOW_COLOR: 'gray',
    INACTIVE_COLOR: 'gray',
    ALTERNATIVE_COLOR: 'gray',
    BORDER_COLOR: 'black',
    BORDER_STROKE_WIDTH: 0.75,
    MARKER_STROKE_WIDTH: 2.75
  },
  FILE_TYPES: {
    image: 'gif,jpg,png,jpeg,bmp,ico,svg',
    audio: 'wav,mp3,ogg,oga,au,aiff,flac',
    video: 'avi,mov,mpeg,mp4,ogv,m4v,webm',
    font: 'ttf,otf,eot,woff,woff2',
    midi: 'mid,midi',
    anim: 'swf',
    // Used in custom skins
    xml: 'xml'
  },
  MIME_TYPES: {
    xml: 'text/xml',
    gif: 'image/gif',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    bmp: 'image/bmp',
    svg: 'image/svg+xml',
    ico: 'image/x-icon',
    wav: 'audio/wav',
    mp3: 'audio/mpeg',
    mp4: 'video/mp4',
    m4v: 'video/mp4',
    ogg: 'audio/ogg',
    oga: 'audio/ogg',
    ogv: 'video/ogg',
    webm: 'video/webm',
    au: 'audio/basic',
    aiff: 'audio/x-aiff',
    flac: 'audio/flac',
    avi: 'video/avi',
    mov: 'video/quicktime',
    mpeg: 'video/mpeg',
    ttf: 'application/font-sfnt',
    otf: 'application/font-sfnt',
    eot: ' application/vnd.ms-fontobject',
    woff: 'application/font-woff',
    woff2: 'application/font-woff2',
    swf: 'application/x-shockwave-flash',
    mid: 'audio/midi',
    midi: 'audio/midi'
  },
  // Global settings susceptible to be modified
  COMPRESS_IMAGES: true,
  // Keyboard key codes
  VK: {LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40},
  // Flag to indicate that we are running on a touch device
  TOUCH_DEVICE: false,
  // Amount of time (in milliseconds) to wait before a media resource is loaded
  LOAD_TIMEOUT: 10000,
  // Number of points to be calculated as polygon vertexs when simplifying bezier curves
  BEZIER_POINTS: 4,
  CANVAS_DRAW_FOCUS: typeof window !== 'undefined' && typeof window?.CanvasRenderingContext2D?.prototype?.drawFocusIfNeeded === 'function',
  WHITESPACES: '  \f\n\r\t\v\u00a0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u2028\u2029\u202f\u205f\u3000\ufeff',
  SEPARATORS: '  \f\n\r\t\v\u00a0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u2028\u2029\u202f\u205f\u3000\ufeff.,;-|',
  WORD_DELIMITERS: '  \f\n\r\t\v\u00a0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u2028\u2029\u202f\u205f\u3000\ufeff.,;-|…_<>"“”«»'\xB4\x60\u2018\u2019\u2022~+\u2013\u2014\u2015=%¿?¡!:/\\()[]{}$£€',
}

#### Functions defined in Utils
Utils
init
getMsg
normalizeLocale
checkPreferredLanguage
setLogLevel
log
getBoolean
getVal
getNumber
getPercent
zp
getHMStime
getDateTime
parseOldDate
cleanOldLanguageTag
getTriState
fillString
isNullOrUndef
isEquivalent
getXmlText
parseXmlNode
getXmlNodeText
reduceTextsToStrings
cssToString
checkColor
colorHasTransparency
cloneObject
normalizeObject
getAttr
getValue
isEmpty
setAttr
buildObj
isSeparator
isWordDelimiter
stringToWords
roundTo
fx
compareMultipleOptions
endsWith
startsWith
nSlash
isURL
getBasePath
getRelativePath
getPath
getPathPromise
$HTML
getSvg
svgToURI
toCssSize
getImgClipUrl
getRootHead
appendStyleAtHead
appendStylesheetAtHead
attrForEach
findParentsWithChild
getCaretCharacterOffsetWithin
getTextNodesIn
setSelectionRange
mReplace
settings

#### Objects exported by TextGrid
defaults = {
  MIN_CELL_SIZE: 12,
  DEFAULT_CELL_SIZE: 20,
  MIN_INTERNAL_MARGIN: 2
}
flags = {
  NORMAL: 0,
  INVERTED: 1,
  HIDDEN: 2,
  LOCKED: 4,
  MARKED: 8,
  TRANSPARENT: 16
}

#### Objects exported by AWT
Ellipse
Font
Gradient
Stroke
Point
Dimension
Shape
Rectangle
Path
PathStroke
Action
Timer
Container

#### Automation
Arith
AutoContentProvider

#### Bags
ActivitySequence
ActivitySequenceElement
ActivitySequenceJump
ConditionalJumpInfo
JumpInfo
MediaBag
MediaBagElement

#### Boxes
AbstractBox
ActiveBagContent
ActiveBox
ActiveBoxBag
ActiveBoxContent
ActiveBoxGrid
AlignType
BoxBag
BoxBase
BoxConnector
TextGridContent
TextGrid

#### Media
ActiveMediaBag
ActiveMediaPlayer
AudioBuffer
EventSounds
EventSoundsElement
MediaContent
MidiAudioPlayer


#### Report system
ActionReg
ReportBean
ActivityReg
Encryption
Reporter
SCORM
ReporterInfo
SequenceReg
SequenceRegInfo
SessionReg
SessionRegInfo
SessionStorageReporter
TCPReporter

#### Shapers
ClassicJigSaw
Holes
JigSaw
Rectangular
Shaper
TriangularJigSaw

#### Skins
BlueSkin
Counter
CustomSkin
DefaultSkin
EmptySkin
GreenSkin
MiniSkin
OrangeSkin
SimpleSkin
Skin

#### Structural classes
JClicPlayer
JClicProject
ProjectSettings
Activity
ActivityPanel
PlayerHistory
loadProject
JClicObject = {
  JClicPlayer,
  JClicProject,
  AWT,
  Utils,
  $,
  options: typeof JClicDataOptions === 'undefined' ? {} : JClicDataOptions,
  projectFiles: {},
  currentPlayers: [],
  loadProject
}

#### Activity auxiliary classes
Evaluator
BasicEvaluator
ComplexEvaluator
TextActivityDocument
TextTarget

#### Activities
Complete
ComplexAssociation
CrossWord
DoublePuzzle
ExchangePuzzle
Explore
FillInBlanks
HolePuzzle
Identify
IdentifyText
InformationScreen
MemoryGame
Menu
OrderText
SimpleAssociation
TextActivityBase
WordSearch
WrittenAnswer

#### Panels
CompletePanel
ComplexAssociationPanel
CrossWordPanel
DoublePuzzlePanel
ExplorePanel
FillInBlanksPanel
HolePuzzlePanel
IdentifyPanel
InformationScreenPanel
MemoryGamePanel
MenuPanel
OrderTextPanel
SimpleAssociationPanel
TextActivityBasePanel
WordSearchPanel
WrittenAnswerPanel
