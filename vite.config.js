import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig({
  plugins: [react()],
  server: { host: true, port: 5173 },
  optimizeDeps: {
    exclude: ['@mediapipe/pose', '@mediapipe/camera_utils', '@mediapipe/drawing_utils'],
  },
})
