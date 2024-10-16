import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
        host: true,                     // Permite conexiones desde otras máquinas en la red local
        port: 5173,
  },
  plugins: [react()],
  build: {
        outDir: 'dist',
        assetsDir: 'assets',
        // minify: 'terser',               // VITE UTILIZA TERSER POR DEFECTO PARA MINIMIZAR EL CODIGO DE JS EN LA CONTRUCCION
        // terserOptions: {                // "terserOptions" DEFINE COMO QUIERO QUE SE MINIFIQUE EL CODIGO
        //     compress: {
        //         drop_console: true,     // Elimina console.log en producción
        //     },
        //     mangle: true,               // Cambia los nombres de variables y funciones para reducir el tamaño
        // },
    },
})