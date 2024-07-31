import { defineConfig } from "vite";
import solid from "vite-plugin-solid";

export default defineConfig({
  plugins: [solid()],
  server: {
    host: "0.0.0.0", // Listen on all network interfaces
    port: 3000, // You can change this to any port number you prefer
  },
});
