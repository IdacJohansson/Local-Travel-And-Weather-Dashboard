/// <reference types="react-scripts" />

/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_WEATHER_API_KEY: string;
    // add more environment variables if needed
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  
