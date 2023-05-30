import { defineConfig } from 'vite';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react({ include: '**/*.tsx' }), vanillaExtractPlugin()],
    server: {
        port: 5173,
        watch: {
            usePolling: true,
        },
    },
});
