import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';

// https://vitejs.dev/config
export default defineConfig(() => {
    return {
        build: {
            outDir: 'working'
        },
        plugins: [reactRefresh()],
        esbuild: {
            // NOTE: Make sure you add this to Storybook's Vite config in `.storybook/main.js`.
            jsxInject: "import React from 'react';",
        },
    };
});
