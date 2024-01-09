import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		port: 8000,
		// Get rid of the CORS error
		proxy: {
			"/api": {
				target: "https://spare-brittaney-readicharge.koyeb.app",
				changeOrigin: true,
				secure: false,
			},
		},
	},
});
