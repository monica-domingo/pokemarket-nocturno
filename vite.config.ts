import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    test: {
        globals: true, // Habilita `describe`, `it`, `expect` sin necesidad de importarlos
        environment: 'jsdom',
        setupFiles: './src/setupTests.ts', // Asegura que setupTests.ts se ejecute antes de los tests
    },
})
