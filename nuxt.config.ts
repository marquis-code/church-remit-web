import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  // Force disable SSR since your original config had it as false
  // This will prevent the SSR rendering errors
  ssr: false,
  target: "static",

  app: {
    head: {
      title: "ChurchRemit - The Future of Church Administration and Finance",
      htmlAttrs: { lang: "en" },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "format-detection", content: "telephone=no" },
        {
          hid: "description",
          name: "description",
          content:
            "A revolutionary platform designed to simplify church operations, enhance financial transparency, and streamline payments.",
        },
        { name: "theme-color", content: "#4f46e5" },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap",
        },
      ],
      script: [
        {
          src: "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js",
          type: "text/javascript",
        },
      ],
      // title: "OLGNova",
      // htmlAttrs: { lang: "en" },
      // meta: [
      //   { charset: "utf-8" },
      //   { name: "viewport", content: "width=device-width, initial-scale=1" },
      //   { name: "format-detection", content: "telephone=no" },
      //   { name: "description", content: "OLGNova - Health research publications and resources for healthcare professionals in Africa" },
      //   { name: "keywords", content: "health research, publications, Africa, healthcare, medical research" },
      //   { name: "author", content: "OLGNova" },
      //   { property: "og:title", content: "OLGNova" },
      //   { property: "og:description", content: "Health research publications and resources for healthcare professionals in Africa" },
      //   { property: "og:type", content: "website" },
      //   { property: "og:url", content: "https://OLGNova.com" },
      //   { property: "og:image", content: "https://OLGNova.com/og-image.jpg" },
      //   { name: "twitter:card", content: "summary_large_image" },
      //   { name: "twitter:title", content: "OLGNova" },
      //   { name: "twitter:description", content: "Health research publications and resources for healthcare professionals in Africa" },
      //   { name: "twitter:image", content: "https://OLGNova.com/twitter-image.jpg" },
      // ],
      // link: [
      //   { rel: "icon", type: "image/x-icon", href: "/favicon.svg" },
      //   { rel: "canonical", href: "https://OLGNova.com" },
      // ],
    },
    pageTransition: { 
      name: 'page', 
      mode: 'out-in'
    }
  },
  
  build: {
    transpile: ['vuedraggable', 'marked', 'dompurify', 'lucide-vue-next']
  },
  
  // Remove problematic modules and keep only essential ones
  modules: [
    "@nuxtjs/tailwindcss",
    "@vueuse/nuxt",
  ],
  
  css: ["/assets/css/main.css"],

  tailwindcss: {
    cssPath: "@/assets/css/main.css",
  },
  
  transpile: [
    '@vueuse/motion'
  ],

  axios: {
    timeout: 10000,
  },
  
  // Set public runtime config
  runtimeConfig: {
    public: {
      siteUrl: 'https://OLGNova.com',
    }
  },

  // Disable prerendering to avoid the SSR errors
  nitro: {
    prerender: {
      enabled: false
    }
  },

  compatibilityDate: "2025-02-01",
});