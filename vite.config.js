import { fileURLToPath, URL } from 'url'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest: {
        name: 'APPointments',
        short_name: 'APPointments',
        theme_color: '#1876d1',
        icons: [
          {
            "src": "/Loghi/icon_144.png",
            "sizes": "144x144",
            "type": "image/png"
         },
         {
            "src": "/Loghi/icon_512.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "any"
         },
         {
            "src": "/Loghi/icon_512.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "maskable"
          }
        ]
      }
    })
    
  ],
  build: {
    outDir: "build",
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@' : fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})


//npm run build
//npm run preview