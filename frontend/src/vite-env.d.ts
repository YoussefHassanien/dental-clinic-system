/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_LOGIN_API: string;
  readonly VITE_REGISTER_API: string;
  // Add other environment variables here...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
