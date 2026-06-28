import { defineConfig, searchForWorkspaceRoot } from "vite";
import banner from "vite-plugin-banner";
import eslint from 'vite-plugin-eslint';
import pkg from "./package.json";

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

WARNING: This is a compressed version of "${pkg?.name}".
The full source code is freely available at:
${pkg?.repository?.url || '---'}
`;

// Export default Vite config
export default ({ mode, isPreview }) => {
  return defineConfig({
    plugins: [
      banner(bannerText),
      eslint(),
      {
        name: 'html-transform',
        transformIndexHtml(html) {
          return (mode === 'development' && !isPreview)
            ? html.replaceAll('/preview-', '/dev-')
            : html;
        }
      }
    ],
    build: {
      minify: "oxc",
      assetsDir: "",
      assetsInlineLimit: 16384,
      chunkSizeWarningLimit: 2000000,
      cssCodeSplit: false,
      sourcemap: true,
      rolldownOptions: {
        output: {
          entryFileNames: `jclic.min.js`,
          format: "iife",
        },
      },
      license: { fileName: 'jclic.components.LICENSE' },
    },
    oxc: {
      legalComments: "none",
    },
    server: {
      port: 8000,
      fs: {
        allow: [
          searchForWorkspaceRoot(process.cwd()),
          '/test',
        ],
      }
    },
    preview: {
      port: 8000,
    },
  });
};
