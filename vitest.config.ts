import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

import browserslist from 'browserslist'
import { browserslistToTargets, Features } from 'lightningcss'
export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    css: true,
    coverage: {
      all: false,
      include: ['app/**'],
      reporter: ['text', 'json-summary', 'json'],
      reportOnFailure: true,
    },
  },
  css: {
    transformer: 'lightningcss',
    lightningcss: {
      targets: browserslistToTargets(browserslist('>= 0.25%')),
      include: Features.LightDark | Features.Colors,
    },
  },
  build: {
    cssMinify: 'lightningcss',
  },
})
