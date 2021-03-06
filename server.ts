import 'zone.js/dist/zone-node';

import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import * as compression from 'compression';
import { join } from 'path';

import { AppServerModule } from './src/main.server';
import { APP_BASE_HREF } from '@angular/common';
import { existsSync } from 'fs';
import * as mcache from 'memory-cache';

export function app(): express.Express {
  const server = express();
  server.use(compression());

  const distFolder = join(__dirname, '../browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule,
  }));

  server.set('view engine', 'html');
  server.set('views', distFolder);

  // TODO: implement data requests securely
  server.get('/api/**', (req, res) => {
    res.status(404).send('data requests are not yet supported');
  });

  // Serve static files from /browser
  server.get('*.*', express.static(distFolder, {
    maxAge: '1y'
  }));

  server.get('*', (req, res, next) => {
    const url = req.originalUrl;
    if (url === '/clearcache') {
      mcache.clear();
      res.status(200).send('ok');
      return;
    }

    const preventCache =  url === '/404' || url.indexOf('/_') > -1;

    const cachedHtml = preventCache ? null : mcache.get('__express__' + req.originalUrl);
    if (cachedHtml) {
      res.send(cachedHtml);
    } else {
      next();
    }
  }, (req, res) => {
    const cacheKey = '__express__' + req.originalUrl;

    res.render(indexHtml, {
      req,
      res,
      providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }]
    }, (err: Error, html: string) => {
      if (!err) {
        mcache.put(cacheKey, html, 300000);
      }
      res.send(html);
    });
  });

  return server;
}

function run() {
  const port = process.env.PORT || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';
