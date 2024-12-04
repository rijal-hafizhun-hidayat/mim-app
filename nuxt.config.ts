// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  css: ["vue-multiselect/dist/vue-multiselect.min.css"],
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxt/fonts",
    "@formkit/auto-animate/nuxt",
    "@nuxt/icon",
    "@vesp/nuxt-fontawesome",
  ],
  fontawesome: {
    icons: {
      solid: ["fa-ellipsis-vertical"],
    },
  },
});
