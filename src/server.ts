import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';
import cors from 'cors';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

/**
 * CORS FIX ESENCIAL PARA NGROK
 */
app.use(
  cors({
    origin: '*',
    methods: 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

/**
 * Fix para proxies tipo ngrok que reescriben HTTPS a HTTP.
 * Evita bloqueos de Chrome al cargar SSR.
 */
app.set('trust proxy', true);

/**
 * Static files del build Angular
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Render SSR Angular para todas las demás rutas
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) => {
      if (response) {
        // Fix crítico: CORS + SSR
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Vary', 'Origin');

        writeResponseToNodeResponse(response, res);
      } else {
        next();
      }
    })
    .catch(next);
});

/**
 * Iniciar servidor local
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) throw error;

    console.log(`SSR server running on http://localhost:${port}`);
  });
}

/**
 * Exportar handler para Vite / Angular CLI
 */
export const reqHandler = createNodeRequestHandler(app);
