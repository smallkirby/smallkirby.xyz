//import fastify from 'fastify';
import express from 'express';
import dotenv from 'dotenv';
import { get } from 'lodash';
import crypto from 'crypto';
import { spawn } from 'child_process';
import concat from 'concat-stream';
import { PassThrough } from 'stream';

dotenv.config();
export const app = express();

app.use('/hooks/github', express.raw({ type: 'application/json' }));

const commands = [
  ['git', 'fetch', '--all'],
  ['git', 'checkout', '--force', 'origin/master'],
  ['npm', 'install', '--production'],
  ['npm', 'run', 'build'],
  ['pm2', 'restart', 'smallkirby.xyz'],
];

app.post('/hooks/github', async (req, res) => {
  const event = req.headers['x-github-event'];
  if (event === 'ping') {
    return 'pong';
  }
  if (event === 'push') {
    // validation
    const xsig = Buffer.from(get(req.headers, ["x-hub-signature-256"]) as string, 'utf8');
    const hmac = crypto.createHmac('sha256', process.env.GITHUB_SECRET as string);
    const digest = Buffer.from('sha256=' + hmac.update(req.body).digest('hex'), 'utf8');
    if (!crypto.timingSafeEqual(digest, xsig)) {
      res.status(404);
      res.send('secret verification error.');
      return;
    }

    const preq = JSON.parse(req.body.toString('utf-8'));
    if (get(preq, ['repository', 'id']) !== 368909618) {
      res.status(404);
      res.send('repository ID is invalid.');
      return;
    }
    if (get(preq, ['ref']) !== 'refs/heads/master') {
      res.status(404);
      res.send('invalid refs.');
      return;
    }

    // send status
    console.log('received valid hook');
    res.status(200);
    res.send('OK');

    // deploy
    for (const [command, ...args] of commands) {
      console.log(command, args);
      const proc = spawn(command, args, { cwd: process.cwd() });
      const muxed = new PassThrough();

      proc.stdout.on('data', (chunk) => muxed.write(chunk));
      proc.stdout.on('data', (chunk) => muxed.write(chunk));

      Promise.all([
        new Promise<void>((resolve) => proc.stdout.on('end', () => resolve())),
        new Promise<void>((resolve) => proc.stdout.on('end', () => resolve())),
      ]).then(() => {
        muxed.end();
      });

      const output = await new Promise<Buffer>((resolve) => {
        muxed.pipe(concat({ encoding: 'buffer' }, (data: Buffer) => {
          resolve(data);
        }));
      })

      console.log(output.toString());
    }

    return;
  }
  res.status(501);
  res.send('not found');
});

app.listen(3001);
console.log("waiting @3001");
