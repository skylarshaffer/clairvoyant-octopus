/* eslint-disable @typescript-eslint/no-unused-vars -- Remove when used */
import 'dotenv/config';
import express, { response } from 'express';
import pg from 'pg';
import { ClientError, errorMiddleware } from './lib/index.js';
import { spawn } from 'child_process';
import { existsSync } from 'fs';

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
  res.send('okay');
});

app.get('/api/goctopus/:domain', (req, res) => {
  const domain = req.params.domain;
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Content-Encoding', 'none');
  let goctopusPath = 'goctopus';
  if (existsSync('/home/ec2-user/go/bin/goctopus')) {
    goctopusPath = '/home/ec2-user/go/bin/goctopus';
  } else if (existsSync('/home/dev/go/bin/goctopus')) {
    goctopusPath = '/home/dev/go/bin/goctopus';
  } else {
    console.log(
      'Goctopus can not be found. Will try to just call by name directly.'
    );
  }
  const endpointList = spawn(goctopusPath, ['-a', `${domain}`]);

  endpointList.stdout.on('data', function (data: Buffer) {
    console.log(data.toString());
  });

  endpointList.stderr.on('data', function (data: Buffer) {
    res.write(`data: ${data.toString()}\n`);
    console.log(data.toString());
  });

  endpointList.on('exit', () => {
    console.log('end');
    res.send();
    res.end();
  });
});

app.get('/api/clairvoyance/:endpoint(*)', (req, res) => {
  const endpoint = req.params.endpoint;
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Content-Encoding', 'none');
  const endpointSchema = spawn('clairvoyance', [`${endpoint}`]);

  endpointSchema.stdout.on('data', function (data: Buffer) {
    res.write(`data: ${data.toString()}\n`);
    console.log(data.toString());
  });

  endpointSchema.stderr.on('data', function (data: Buffer) {
    res.write(`data: ${data.toString()}\n`);
    console.log(data.toString());
  });

  endpointSchema.on('exit', () => {
    console.log('end');
    res.send();
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
