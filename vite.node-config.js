import { defineConfig } from "vite";
import { resolve } from 'node:path';
import banner from "vite-plugin-banner";
import eslint from 'vite-plugin-eslint';
import pkg from "./package.json" with { type: 'json' };
import buildLocales from './build-locales.js';

// Build `./src/GlobalData.js` from `./locales/*.po`
buildLocales();

const date = new Date();
const version = `${pkg.version} (${date.toISOString().substring(0, 10)})`;
const bannerText = `
${pkg.name} v${version}
${pkg.description}
${pkg.homepage}

(c) ${date.getFullYear()} ${pkg.author.name || pkg.author}

Licensed under the EUPL, Version 1.2 or -as soon they will be approved by
the European Commission- subsequent versions of the EUPL (the "Licence");
You may not use this work except in compliance with the Licence.

You may obtain a copy of the Licence at:
https://joinup.ec.europa.eu/collection/eupl/eupl-text-eupl-12

Unless required by applicable law or agreed to in writing, software
distributed under the Licence is distributed on an "AS IS" basis, WITHOUT
WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
Licence for the specific language governing permissions and limitations
under the Licence.

For full license information of included components please see: components.LICENSE

WARNING: This is a compressed version of "${pkg?.name}". Full source code is freely available at:
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
