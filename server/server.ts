/* eslint-disable @typescript-eslint/no-unused-vars -- Remove when used */
import 'dotenv/config';
import express, { response } from 'express';
import pg from 'pg';
import { ClientError, errorMiddleware } from './lib/index.js';
import { spawn } from 'child_process';

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const app = express();

// Create paths for static directories
const reactStaticDir = new URL('../client/dist', import.meta.url).pathname;
const uploadsStaticDir = new URL('public', import.meta.url).pathname;

app.use(express.static(reactStaticDir));
// Static directory for file uploads server/public/
app.use(express.static(uploadsStaticDir));
app.use(express.json());

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello, World!' });
});

/* app.post('/api/goctopus/:domain', async (req, res) => {
  const domain = req.params.domain
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Transfer-Encoding', 'chunked')
  res.write("Thinking...")
  await goctopus(res)
  console.log('done')
}); */

app.get('/api/goctopus', (req, res) => {
  res.send('okay')
});

app.get('/api/goctopus/:domain', (req, res) => {
  const domain = 'shawnkost.dev';
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Transfer-Encoding', 'chunked');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Content-Encoding', 'none');

  const endpointList = spawn('goctopus', ['-a', `${domain}`]);

  endpointList.stdout.on('data', function (data: Buffer) {
    res.write('starting');
    console.log(data.toString());
  });

  endpointList.stderr.on('data', function (data: Buffer) {
    res.write(data.toString());
    console.log(data.toString());
  });
  endpointList.on('close', () => {
    console.log('end');
    res.end();
  });
});

/*
 * Handles paths that aren't handled by any other route handler.
 * It responds with `index.html` to support page refreshes with React Router.
 * This must be the _last_ route, just before errorMiddleware.
 */
app.get('*', (req, res) => res.sendFile(`${reactStaticDir}/index.html`));

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log('Listening on port', process.env.PORT);
});
