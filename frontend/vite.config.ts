import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react({
      babel: {
        // only include babel plugins (strings/tuples).
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
    // Tailwind Vite plugin should be a Vite plugin, not a Babel plugin
    tailwindcss(),
  ],
});
