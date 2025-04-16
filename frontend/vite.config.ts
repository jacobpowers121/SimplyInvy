import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import commonjs from "vite-plugin-commonjs"
import svgr from "@svgr/rollup";

export default defineConfig(({ mode }) => ({
  plugins: [react(), commonjs(), svgr()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    sourcemap: mode === "development" ? true : "hidden",
    minify: mode !== "development",
  },
  server: {
    open: true,
    proxy: {
      "/v1": {
        target: "http://localhost:3001",
        changeOrigin: true,
        secure: false,
      },
    },
  },
}));