declare module "*.svg" {
  import React = require("react");
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_API_BASE_URL: string;
  readonly VITE_APP_CONFIRMATION_TOKEN_EXPORES: string;
  readonly VITE_SESSION_TIMEOUT_INTERVAL: string;
  readonly VITE_SESSION_PROMPT_BEFORE_TIMEOUT_INTERVAL;
  string;
  readonly VITE_SESSION_SECRET_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
