import deno from '@deno/vite-plugin'
import tailwindcss from '@tailwindcss/vite'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		deno(),
		TanStackRouterVite({ target: 'react', autoCodeSplitting: true }),
		react(),
		tailwindcss(),
	],
	server: {
		proxy: {
			'/api': {
				target: 'http://localhost:3001/',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, ''),
			},
		},
	},
})
