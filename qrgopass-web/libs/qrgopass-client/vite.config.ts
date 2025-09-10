// vite.config.ts
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/index.ts'),
            formats: ['es'],
            fileName: 'bundle',
        },
        outDir: 'bundle',
        rollupOptions: {
            external: [],
            output: {
                preserveModules: false,
            }
        }
    }
});
