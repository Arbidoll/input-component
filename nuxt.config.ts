// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
          @import "@/assets/scss/_mixins.scss";
          @import "@/assets/scss/_variables.scss";
        `,
        },
      },
    },
    vue: {
      script: {
        defineModel: true,
        propsDestructure: true,
      },
    },
    esbuild: {
      tsconfigRaw: {
        compilerOptions: {
          experimentalDecorators: true,
        },
      },
    },
  },
  css: ['assets/base.css', 'assets/scss/_index.scss'],
  modules: ['@nuxtjs/eslint-module', '@nuxt/test-utils/module'],
  eslint: {
    cache: true,
    emitWarning: false,
    exclude: [
      '**/node_modules/**',
      '.output',
      './public',
      'commitlint.config.js',
    ],
  },
  devtools: { enabled: true },
});
