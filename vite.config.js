import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default {
  plugins: [react(), tailwindcss()],
  base:"/glass-drive-main/"
  resolve: {
    alias: {
      "@": path.resolve("./src"),
    },
  },
  server: {
    port: 5173, // React dev server
    proxy: {
      // Proxy /car-rental to /Car-Rental for backend compatibility (servlet path is case-sensitive)
      "/car-rental": {
        target: "http://localhost:8082",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/car-rental/, "/Car-Rental"),
      },
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve("./src/main.jsx"),
      },
    },
  },
};
