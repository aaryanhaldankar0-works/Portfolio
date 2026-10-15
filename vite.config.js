import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { cpSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

/**
 * The portfolio is a static multi-script site that predates Vite.
 * Classic (non-module) scripts and runtime-referenced media (GLB models,
 * renders, etc. referenced by string paths in JS) are not discovered by
 * Vite's bundler, so they are copied verbatim into the build output.
 */
function copyStaticFolders(folders) {
  return {
    name: 'copy-static-folders',
    apply: 'build',
    closeBundle() {
      folders.forEach((folder) => {
        const src = resolve(__dirname, folder);
        if (existsSync(src)) {
          cpSync(src, resolve(__dirname, 'dist', folder), { recursive: true });
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), copyStaticFolders(['assets', 'Media', 'js', 'css'])],
  // Existing static folders are served from the project root as-is.
  publicDir: false,
  build: {
    // Avoid colliding with the project's own /assets folder.
    assetsDir: '_app',
  },
  server: {
    open: true,
    watch: {
      ignored: ['**/assets/**', '**/Media/**'],
    },
  },
});
