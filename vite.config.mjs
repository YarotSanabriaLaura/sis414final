// vite.config.mjs
import { defineConfig } from 'vite';
import angular from '@analogjs/vite-plugin-angular'; // o lo que ya tengas aquí

export default defineConfig({
  plugins: [angular()], // deja tus plugins tal como estén
  server: {
    host: true,        // escucha en 0.0.0.0
    port: 4200,        // puerto que estás usando con ng serve
    allowedHosts: true // ACEPTA CUALQUIER HOST (incluye todos los *.ngrok-free.dev)
  }
});
