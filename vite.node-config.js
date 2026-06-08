import { defineConfig } from "vite";
import { resolve } from 'node:path';
import banner from "vite-plugin-banner";
import eslint from 'vite-plugin-eslint';
import pkg from "./package.json";
import buildLocales from './build-locales.js';

// Build `./src/GlobalData.js` from `./locales/*.po`
buildLocales();

const date = new Date();
const version = `${pkg.version} (${date.toISOString().substring(0, 10)})`;
const bannerText = `
${pkg.name} v${version}
${pkg.description}
${pkg.homepage}

MIT License

Copyright (c) ${date.getFullYear()} ${pkg?.author.name || pkg?.author}

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the " Software"), to deal in
the Software without restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the
Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice (including the next paragraph)
shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

WARNING: This is a bundled version of "${pkg?.name}".
The full source code is freely available at:
${pkg?.repository?.url || '---'}
`;

// Export Vite config for NodeJS
export default () => {
  return defineConfig({
    plugins: [banner(bannerText), eslint()],
    build: {
      lib: {
        entry: resolve(import.meta.dirname, 'src/jclic-node.js'),
        name: 'jclic',
        fileName: 'jclic-node',
      },
      outDir: 'dist-node',
      emptyOutDir: true,
      rolldownOptions: {
        // jQuery need a "window" object at import time, so we need to include it in the bundle
        // TODO: Externalize jQuery dependency
        external: ['@francesc/basic-midi-player-js', 'jszip', 'jszip-utils', 'jsdom', '@xmldom/xmldom', /* 'jquery' */],
        output: {
          // Global variables to use in the UMD build for externalized deps
          globals: {
            '@francesc/basic-midi-player-js': 'MidiPlayer',
            jszip: 'JSZip',
            'jszip-utils': 'JSZipUtils',
            jsdom: 'jsdom',
            '@xmldom/xmldom': 'XMLDOM',
            // $: 'jquery',
          },
          exports: "named",
        },
      },
    },
  });
};
