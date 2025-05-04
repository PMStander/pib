// Import Tailwind CSS directly - Nuxt 3 has built-in support for Tailwind CSS
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    // Core modules first
    '@vueuse/nuxt',
    'nuxt-mcp',

    // UI and styling modules last
    '@nuxtjs/device',
    '@nuxtjs/color-mode',
    'nuxt-icons',
    '@nuxtjs/tailwindcss', // Add Tailwind CSS module
  ],
  colorMode: {
    preference: 'system', // default value
    fallback: 'light', // fallback value if not system preference found
    classSuffix: '', // optional
  },
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [],
    optimizeDeps: {
      exclude: ['fsevents'],
    },
    server: {
      watch: {
        usePolling: true,
        ignored: ['**/node_modules/**', '**/dist/**', '**/.git/**']
      }
    }
  },
  nitro: {
    esbuild: {
      options: {
        target: 'esnext'
      }
    },
    experimental: {
      websocket: true,
    },
  },
  // Changed from 'parcel' to 'chokidar' to avoid oxc-parser native binding issues
  experimental: {
    watcher: 'chokidar',
  },
  runtimeConfig: {
    // Private keys that are exposed to the server
    apiSecret: process.env.NUXT_API_SECRET,
    vertexProjectId: process.env.NUXT_VERTEX_PROJECT_ID,
    vertexLocation: process.env.NUXT_VERTEX_LOCATION,
    geminiApiKey: process.env.NUXT_GEMINI_API_KEY,
    geminiKey: process.env.NUXT_GEMINI_KEY,
    openaiKey: process.env.NUXT_OPENAI_KEY,
    openOrgId: process.env.NUXT_OPEN_ORG_ID,
    claudeKey: process.env.NUXT_CLAUDE_KEY,
    firecrawlApiKey: process.env.NUXT_FIRECRAWL_API_KEY,
    perplexity: process.env.NUXT_PERPLEXITY,
    wolfRamApiKey: process.env.NUXT_WOLFRAM_API_KEY,
    grokApiKey: process.env.NUXT_GROK_API_KEY || '',
    searchXNG: process.env.NUXT_SEARCH_XNG || '',
    ollama: process.env.NUXT_OLLAMA || '',
    googleFontsApiKey: process.env.NUXT_GOOGLE_FONTS_API_KEY,
    googleMapsKey: process.env.NUXT_GOOGLE_MAPS_KEY,
    tavilyKey: process.env.NUXT_TAVILY_KEY,
    functionsUrl: process.env.NODE_ENV === 'development'
      ? process.env.NUXT_FUNCTIONS_URL_DEV
      : process.env.NUXT_FUNCTIONS_URL_PROD,
    baseURL: process.env.NODE_ENV === 'development'
      ? process.env.NUXT_BASE_URL_DEV
      : process.env.NUXT_BASE_URL_PROD,
    baseURLPython: process.env.NODE_ENV === 'development'
      ? process.env.NUXT_BASE_URL_PYTHON_DEV
      : process.env.NUXT_BASE_URL_PYTHON_PROD,
    twilio: {
      accountSid: process.env.NUXT_TWILIO_ACCOUNT_SID,
      authToken: process.env.NUXT_TWILIO_AUTH_TOKEN,
      phoneNumber: process.env.NUXT_TWILIO_PHONE_NUMBER,
      messagingServiceSid: process.env.NUXT_TWILIO_MESSAGING_SERVICE_SID || '',
    },
    firebaseConfig: {
      apiKey: process.env.NUXT_FIREBASE_API_KEY,
      authDomain: process.env.NUXT_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NUXT_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NUXT_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NUXT_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NUXT_FIREBASE_APP_ID,
      measurementId: process.env.NUXT_FIREBASE_MEASUREMENT_ID,
    },
    cloudMessaging: {
      keypair: process.env.NUXT_CLOUD_MESSAGING_KEYPAIR,
    },
    firebaseAdmin: {
      type: process.env.NUXT_FIREBASE_ADMIN_TYPE,
      project_id: process.env.NUXT_FIREBASE_ADMIN_PROJECT_ID,
      private_key_id: process.env.NUXT_FIREBASE_ADMIN_PRIVATE_KEY_ID,
      private_key: process.env.NUXT_FIREBASE_ADMIN_PRIVATE_KEY,
      client_email: process.env.NUXT_FIREBASE_ADMIN_CLIENT_EMAIL,
      client_id: process.env.NUXT_FIREBASE_ADMIN_CLIENT_ID,
      auth_uri: process.env.NUXT_FIREBASE_ADMIN_AUTH_URI,
      token_uri: process.env.NUXT_FIREBASE_ADMIN_TOKEN_URI,
      auth_provider_x509_cert_url: process.env.NUXT_FIREBASE_ADMIN_AUTH_PROVIDER_X509_CERT_URL,
      client_x509_cert_url: process.env.NUXT_FIREBASE_ADMIN_CLIENT_X509_CERT_URL,
      universe_domain: process.env.NUXT_FIREBASE_ADMIN_UNIVERSE_DOMAIN,
    },
    public: {
      vertexProjectId: process.env.NUXT_VERTEX_PROJECT_ID,
      vertexLocation: process.env.NUXT_VERTEX_LOCATION,
      geminiApiKey: process.env.NUXT_GEMINI_API_KEY,
      geminiKey: process.env.NUXT_GEMINI_KEY,
      openaiKey: process.env.NUXT_OPENAI_KEY,
      openOrgId: process.env.NUXT_OPEN_ORG_ID,
      claudeKey: process.env.NUXT_CLAUDE_KEY,
      firecrawlApiKey: process.env.NUXT_FIRECRAWL_API_KEY,
      perplexity: process.env.NUXT_PERPLEXITY,
      wolfRamApiKey: process.env.NUXT_WOLFRAM_API_KEY,
      grokApiKey: process.env.NUXT_GROK_API_KEY || '',
      searchXNG: process.env.NUXT_SEARCH_XNG || '',
      ollama: process.env.NUXT_OLLAMA || '',
      googleFontsApiKey: process.env.NUXT_GOOGLE_FONTS_API_KEY,
      googleMapsKey: process.env.NUXT_GOOGLE_MAPS_KEY,
      tavilyKey: process.env.NUXT_TAVILY_KEY,
      functionsUrl: process.env.NODE_ENV === 'development'
        ? process.env.NUXT_FUNCTIONS_URL_DEV
        : process.env.NUXT_FUNCTIONS_URL_PROD,
      baseURL: process.env.NODE_ENV === 'development'
        ? process.env.NUXT_BASE_URL_DEV
        : process.env.NUXT_BASE_URL_PROD,
      baseURLPython: process.env.NODE_ENV === 'development'
        ? process.env.NUXT_BASE_URL_PYTHON_DEV
        : process.env.NUXT_BASE_URL_PYTHON_PROD,
      twilio: {
        accountSid: process.env.NUXT_TWILIO_ACCOUNT_SID,
        authToken: process.env.NUXT_TWILIO_AUTH_TOKEN,
        phoneNumber: process.env.NUXT_TWILIO_PHONE_NUMBER,
        messagingServiceSid: process.env.NUXT_TWILIO_MESSAGING_SERVICE_SID || '',
      },
      firebaseConfig: {
        apiKey: process.env.NUXT_FIREBASE_API_KEY,
        authDomain: process.env.NUXT_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.NUXT_FIREBASE_PROJECT_ID,
        storageBucket: process.env.NUXT_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.NUXT_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.NUXT_FIREBASE_APP_ID,
        measurementId: process.env.NUXT_FIREBASE_MEASUREMENT_ID,
      },
      cloudMessaging: {
        keypair: process.env.NUXT_CLOUD_MESSAGING_KEYPAIR,
      },
      firebaseAdmin: {
        type: process.env.NUXT_FIREBASE_ADMIN_TYPE,
        project_id: process.env.NUXT_FIREBASE_ADMIN_PROJECT_ID,
        private_key_id: process.env.NUXT_FIREBASE_ADMIN_PRIVATE_KEY_ID,
        private_key: process.env.NUXT_FIREBASE_ADMIN_PRIVATE_KEY,
        client_email: process.env.NUXT_FIREBASE_ADMIN_CLIENT_EMAIL,
        client_id: process.env.NUXT_FIREBASE_ADMIN_CLIENT_ID,
        auth_uri: process.env.NUXT_FIREBASE_ADMIN_AUTH_URI,
        token_uri: process.env.NUXT_FIREBASE_ADMIN_TOKEN_URI,
        auth_provider_x509_cert_url: process.env.NUXT_FIREBASE_ADMIN_AUTH_PROVIDER_X509_CERT_URL,
        client_x509_cert_url: process.env.NUXT_FIREBASE_ADMIN_CLIENT_X509_CERT_URL,
        universe_domain: process.env.NUXT_FIREBASE_ADMIN_UNIVERSE_DOMAIN,
      },
    },
    plotlyKey: process.env.NUXT_PLOTLY_KEY,
    googleTrendsKey: process.env.NUXT_GOOGLE_TRENDS_KEY,
    AI21_API_KEY: process.env.NUXT_AI21_API_KEY,
    ALEPHALPHA_API_KEY: process.env.NUXT_ALEPHALPHA_API_KEY,
    ARCJET_API_KEY: process.env.NUXT_ARCJET_API_KEY,
    AWS_ACCESS_KEY_ID: process.env.NUXT_AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.NUXT_AWS_SECRET_ACCESS_KEY,
    AWS_REGION: process.env.NUXT_AWS_REGION,
    AZURE_OPENAI_API_KEY: process.env.NUXT_AZURE_OPENAI_API_KEY,
    AZURE_OPENAI_API_INSTANCE_NAME: process.env.NUXT_AZURE_OPENAI_API_INSTANCE_NAME,
    AZURE_OPENAI_API_DEPLOYMENT_NAME: process.env.NUXT_AZURE_OPENAI_API_DEPLOYMENT_NAME,
    AZURE_OPENAI_API_VERSION: process.env.NUXT_AZURE_OPENAI_API_VERSION,
    COHERE_API_KEY: process.env.NUXT_COHERE_API_KEY,
    DEEPINFRA_API_KEY: process.env.NUXT_DEEPINFRA_API_KEY,
    FIREWORKS_API_KEY: process.env.NUXT_FIREWORKS_API_KEY,
    FRIENDLI_TOKEN: process.env.NUXT_FRIENDLI_TOKEN,
    GRADIENT_ACCESS_KEY: process.env.NUXT_GRADIENT_ACCESS_KEY,
    HUGGINGFACE_API_KEY: process.env.NUXT_HUGGINGFACE_API_KEY,
    MISTRAL_API_KEY: process.env.NUXT_MISTRAL_API_KEY,
    RAYCAST_API_KEY: process.env.NUXT_RAYCAST_API_KEY,
    SERPAPI_API_KEY: process.env.NUXT_SERPAPI_API_KEY,
    WOLFRAM_ALPHA_APPID: process.env.NUXT_WOLFRAM_ALPHA_APPID,
    ZAPIER_NLA_API_KEY: process.env.NUXT_ZAPIER_NLA_API_KEY,
    BROWSERLESS_API_KEY: process.env.NUXT_BROWSERLESS_API_KEY,
    TAVILY_API_KEY: process.env.NUXT_TAVILY_KEY,
  },
})