import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import { cloudflare } from '@cloudflare/vite-plugin'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    cloudflare({
      viteEnvironment: { name: 'ssr' },
    }),
    tailwindcss(),
    tanstackStart(),
    viteReact(),
  ],
  resolve: {
    alias: { '@': '/src' },
  },
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          // Normaliza separador Windows → Unix
          const path = id.replace(/\\/g, '/')

          // Só processa node_modules
          if (!path.includes('/node_modules/')) return

          // Three.js core (evita casar com three-stdlib, three-mesh-bvh etc.)
          if (path.includes('/node_modules/three/')) return 'three-core'
          // React Three Fiber
          if (path.includes('/node_modules/@react-three/fiber/')) return 'three-r3f'
          // Drei
          if (path.includes('/node_modules/@react-three/drei/')) return 'three-drei'
          // Deps do Three que são grandes
          if (path.includes('/node_modules/three-stdlib/')) return 'three-extra'
          if (path.includes('/node_modules/@react-spring/')) return 'three-extra'
          if (path.includes('/node_modules/@use-gesture/')) return 'three-extra'
          if (path.includes('/node_modules/troika-')) return 'three-extra'
          if (path.includes('/node_modules/maath/')) return 'three-extra'

          // Motion
          if (path.includes('/node_modules/motion/')) return 'motion'
          if (path.includes('/node_modules/framer-motion/')) return 'motion'

          // Lenis (smooth scroll)
          if (path.includes('/node_modules/lenis/')) return 'lenis'

          // Ícones (muitos módulos, separar ajuda)
          if (path.includes('/node_modules/react-icons/')) return 'icons'
          if (path.includes('/node_modules/lucide-react/')) return 'icons'

          // TanStack Router / Start
          if (path.includes('/node_modules/@tanstack/')) return 'tanstack'
        },
      },
    },
  },
})