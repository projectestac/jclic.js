JClic.js changelog
==============

### v0.1.28 (not yet released)
#### Improvements
- Connect reports system to external services [6105a3d] [63f6ba4] [5e3b65c] [f7c8154] [dc6f05b] [ea9c11d] [40e22a5] [aba4a5f] [6c14b70] [a6cc6c3] [bbd3f50] [da81359] [9f5fbae] [9ac83b7]
- Updated i18n [f263eee]
- Upgrade to jQuery 3.0 [14dc473]
- Improved UI with CSS [8859120]
- Implemented `Skin.showDlg` [8f1339a]

#### Code cleaning and documentation
- Unify `this` syntax in closures [6a9513f]
- Code linting [b8af775]
- Updated code comments [f178792] [39b6c85] [8966a9f]
- Updated README.md and TRANSLATIONS.md [b11db0a] 
- Add [Gitter](https://gitter.im) badge to README.md [3437765] [eea1677]

---
### v0.1.27 (2016-06-03)
#### Bug fixes
- Set always base attributes when setting target style in text activities [6d3922d]

#### Improvements
- Imported some translations from JClic (Launchpad) and set up Transifex as a i18n platform for JClic.js [0982c53] [d39cb84] [2aae33b] [7b38ae7] [76fd186]

---
### v0.1.25 (2016-05-30)
#### Improvements
- Multi-language support with gettext files (.po and .pot) [1a66593] [ac3c34f] [ad6adae] [4c34398] [6608234]
- Improved UI in reports [611b884] [b8c60f2] [00cea32]

---
### v0.1.24 (2016-05-25)
#### Improvements
- Improved UI in reports [0f5d18d] [43f5d0b] [20ec170] [e4e9095] [6acb931] [890ae98] [ee3eaba] [f9eb9fb] [967a1fe] [8494776]
- Added _copy to clipboard_ in reports [09f7107]
- Optimized JQuery object builders [1ef983a]
- Basic reports system [8547d55] [09bd87b] [a1338db] [40806e6] [d2bfd75] [81f8a7f]
- Counters [b10ce2e] [31b5507] [da63bb4]

---
### v0.1.23 (2016-04-29)
#### Improvements
- Updated font-substitution list [78a244b]
- Use of Google WebFonts [e4527f9] [1199535] [8df51bf]
- Automatic detection of animated GIFs [057a565]
- Upgrade to JSZip 3.0 [4d8a113] [13e6f26] [2fcf98a]

#### Code cleaning and documentation
- Supressed 'test/lib' folder [1be349e]
- Added some badges to README.md [13f6c3e]

---
### v0.1.21 (2016-04-25)
#### Improvements
- Allow animated GIFs [4fcf232] [c67be76] [9bc195c] [0868b27] [a351a00] [514e150] [95f1aac] [b4b1655] [bf6bd92]

#### Bug fixes
- Adjust borders in `ActiveBox` hosted components [14c388f]
- Partially revert commit [ba5330d] that caused misfunctions in text activities [180c684] [887a2d1] [9e6deaa]
- Hide `hostedComponent` when inactive [d25422d]

#### Code cleaning and documentation
- Script for exporting README.md to an HTML snippet, useful to update index.html in [https://projectestac.github.io/jclic.js] [d2e250f]
- New project proposal sent to [jsDelivr.com] [957768b]
- Ignore `src` in Bower package. Now with just `dist` files. [971ef68]
- Updated _readme_ and docs [72917e6]

---
### v0.1.20 (2016-03-07)
#### Improvements
- Audio recording [5ace0e7] [ac1aa67] [1299ae9]
- Convert `wav` to `mp3` in test activities [0df2a1a]
- Optimized hit test on bezier curves, ellipses and complex paths [3cb8744] [f6c19aa] [a2e3edd]
- ~~Link event handlers to cells in text activities~~ [ba5330d] (reverted by [180c684])

#### Bug fixes
- Solved bug in `MediaContent.isEquivalent` [8987900]

---
### v0.1.19 (2016-02-25)
#### Improvements
- Implemented `ActivitySequence.checkCurrentActivity` [4990b93]

#### Code cleaning and documentation
- Update `npm` dependencies [a021f13]

#### Bug fixes
- Solved error in `ActiveMediaPlayer.linkTo [d983e7f]

---
### v0.1.18 (2016-02-11)
#### Improvements
- Allow Macromedia Flash objects [4f37a10] [14a0267]
- Allow video objects [a830a8a] [3b71f70]
- Optimized loading of audio [3b5c06d]
- Add `onClick` event to `msgBox` and process media content in the same thread as user gesture event [0884ca1]

#### Bug fixes
- Solved problems with `readyState` in media elements [ef31923]

---
### v0.1.15 (2016-01-28)
#### Improvements
- "Check" button in text activities [0d9ef28] [4dd0d12]
- `prevScreen` in text activities [7615b96]

#### Bug fixes
- Media content of type "URL" not working [60a0484] (fixes #1)
- Correct error in `EventSounds` inheritance [b51bd26]

---
### v0.1.12 (2016-01-21)
#### Improvements
- Event sounds [aa2e669] [1390e35] [8a7da4c] [8356ba1] [88e54e0]
- Updated base versions of npm packages [d4b8265]
- "Identify text" activities [86b32f2] [314ecc3] [13c0bb0]
- "Complete text" activities [88f9c0a]
- Draw connection lines in "order text" activities [571468d]
- Compute relative paths in `PlayerHistory` [13cfe7d]
- Update `JClicPlayer` to support "file:" protocol [ca85e18] [f6fcb96]

#### Bug fixes
- Correct the calculation of `nShapes` in "Holes" shaper [bf2453a]
- Graphics workaround when working with local files [41c4abc]

---
### v0.1.11 (2015-12-03)
#### Improvements
- "order text" activities [f392be6] [e1567c4]
- Adjust automatic forwarding of activities [65c11fc]

#### Bug fixes
- Avoid calls to unexistent functions [bbbed75]

#### Code cleaning and documentation
- Updated API docs [a1a44f6]
- Normalize backslashes and avoid empty bags [2325290]

---
### v0.1.7 (2015-10-25) and previous
#### Improvements
- Add 'close' button [1d416c4]
- Implemented `Skin.fit` [c45c3ce]
- Export the global variable `JClicObject` [fc3a08d]
- Use of `text()` instead of `html()` in text activities [669be21]
- Multiple JClic objects in same document [6b5830f]
- Prevent browser spell-check in text activities [5af6edd]
- Tabulators in text activities [368c11f]
- Allow passing project and options through global variables [63619cc]
- Support sequences with multiple chained ZIP files [606f7ce]
- Chained calls to `PlayerHistory` push & pop [52572d3]
- Improved use of ZIP files [3ccca33]
- Read from ZIP files using JSZip [119962b]
- 'activityReady' method [cb88c69]
- "Fill-in blanks" text activities [08f4b22] [4c49cf2] [0ba144e] [fa7e1f0]
- Implement `BasicEvaluator` and `ComplexEvaluator` [51d26ac]
- Moved `TextTarget` to `TextActivityDocument.js` [1ba2caf]
- TextTarget [8cd5920]
- CrossWord activities [5312948] [8514aab] [269d238] [dd8c529]
- Blink cursor and optimized shape clipping [ab22976]
- Action status listeners [65a9799]
- WordSearch activities [ff454c3] [df77fa8] [308536a]
- New runtime parameters: `autoFit`, `width` & `height` [390a1de]
- Updated media icons [ba52ada]
- Activity panel fade-in [1e94486]
- Add icons for full screen [0b2b3a9]
- Fullscreen support [a13d97b]
- TextGrid activities [4ac1220] [fd3c138]
- Improved responsive design and options passing [940ae85]
- Test keystrokes [4baa48d]
- Deal with seekable sounds [3476947]
- Misc audio functions [6d309d2]
- Adjust wait screen [1b35539]
- Improvied waiting animation and activity borders [f6c624d]
- Display an animated GIF while downloading [f146d9a]
- Deal with form submit in "Written answer" activity [c78c4c7]
- Check input methods [7d87c70]
- Support of touch devices [6750eb2] [7bcdc69] [892d242]
- Add support to relative paths when loading projects [d0bfc0a]
- Add a new test suite [c56fd89]
- "WrittenAnswer" activities [d59b926] [cdd9f33] [3bce9d9]
- "Memory" activities [156c7fe]
- "Explore" activity [ed8c62f]
- "Identify" activities [7644b45]
- "Complex Association" activities [0e6fbe6]
- Improved `BoxConnector` [ffb7cdf]
- Test different composite operations [0cb3b38]
- "Simple Association" [1d41ae2] [e167987]
- Implement `AWT.Ellipse` [52f68c3]
- "Hole" puzzle activity [50ac525] [2b5cf5c] [d975811]
- Adjust clipping regions [102dc26] [7e4ea6e] [21a87a2]
- Adjust "Holes" shaper [b384629]
- "Exchange" Puzzle [239152c]
- Automatic content provider "Arith" [cf194e4] [c0fc5f5]
- Implement `BoxConnector` [4a7efd6] [f1597b5] [2594710]
- Adjust the update process of canvas objects [b0c5e4b]
- Cell scrambling [a04a7bf]
- Clipping of multiple images into a single canvas [d2adb8c]
- "JigSaw" shapers [7ac34e9] [0b98374]
- Optimized drawing of special shapes [ae3929f]
- Deal with shapers and ActiveBoxes [aaad125] [bbd66e3]
- "Double" Puzzle [7002568]
- "Information Screen" activity [0fd7abb] [e2d0610]
- Implement `ActiveBoxGrid` [676ad6c]
- Deal with shapers [78492de]
- Build `MediaContent` [778435f]
- Implement `TextActivityBase` [a89f3f3] [461e104]
- Declare JQuery in `ProjectSettings` [3bf6b96]
- Check CORS and HttpXMLRequest calls [368136c]
- Build `JClicPlayer` [a6f3caf] [a30a157]
- Build `DefaultSkin` [2315688] [99f631d]

#### Bug fixes
- Solved invalid assignment of nCols and nRows in Holes [85e3d2d]
- Corrections in PlayerHistory [07c6485]
- Force `hasRemainer` in `shapers.Holes` with `bgImg` [9e6c515]
- Avoid overlap of message boxes with transparent background [b1b79c8]
- Avoid breaking lines in targets when CSS 'white-space' is set to 'pre-wrap' (only in Chrome) [c4a035f]
- Check origin 'pos' and 'dim' in ctx.drawImage (Firefox crashes when out-of-range) [0c67161]
- Check for availability of `fullscreen.enabled` prior to use it [9e51c14]
- Solved problem with double events stopping media [945f993]
- Solved problem with bad content type in $get [d846419]
- Solved erroneous calculation of remainder shape [fbb0c51]
- Solved problem with `id` on empty cells [bdf571f]
- Solved problems with parsing of shape data [809d864]
- Swap the loading of rows and columns in `ActiveBagContent` due to an old JClic bug [ae97ed8]
- Solved problem with color gradients [2053592]
- Activity start procedure revised [fba2c1b]

#### Code cleaning and documentation
- Updated class skeleton and clean comments [a723c24]
- Generate just one sourcemap (from Browserify) [a6be121]
- Optimize build process [b4553f9] [9df2255]
- Updated 'license' tag in package.json ('licenses' was deprecated) [50bcba6]
- Updated npm module [cc24519]
- Updated documentation [b584434]
- Convert code comments to JSDoc format [9657eee] [84a07f6] [386d4c2] [13bc87d] [645065d] [4e82468] [106f374] [1a567e3] [7aa335b] [ed34a83] [656d966] [9458fed] [23d45b3] [426018d]
- Move static methods from prototype to constructor [48f1747] [ba5ceda]
- Clean and comment code [946e592] [2757491]
- Improve documentation [acc6498]
- Create scripts to convert svg and png files to inline data [af05355]
- Deal with Docco and Groc [02cd977]

---
- Initial commit [0899733]


