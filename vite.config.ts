import { fileURLToPath, URL } from 'node:url'
import { copyFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

/**
 * Plugin para o GitHub Pages:
 * Copia automaticamente dist/index.html para dist/404.html após o build,
 * permitindo que rotas diretas do Vue Router (ex: /about) funcionem
 * sem retornar a tela 404 estática padrão do GitHub Pages.
 */
function githubPagesSpaPlugin() {
  return {
    name: 'github-pages-spa-404',
    closeBundle() {
      const distDir = resolve(fileURLToPath(new URL('.', import.meta.url)), 'dist')
      const indexHtml = resolve(distDir, 'index.html')
      const notFoundHtml = resolve(distDir, '404.html')

      if (existsSync(indexHtml)) {
        copyFileSync(indexHtml, notFoundHtml)
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/AboutMe2/' : '/',
  plugins: [
    vue(),
    vueDevTools(),
    githubPagesSpaPlugin(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 5173,
    host: true,
  },
  css: {
    devSourcemap: true,
  },
  build: {
    sourcemap: true,
  },
})
