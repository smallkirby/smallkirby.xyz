import crypto from 'crypto';
import { spawn } from 'child_process';
import { PassThrough } from 'stream';
import express from 'express';
import dotenv from 'dotenv';
import { get } from 'lodash';
import concat from 'concat-stream';
import pm2 from 'pm2';
import { scheduleJob } from 'node-schedule';

dotenv.config();
const app = express();

app.use('/github', express.raw({ type: 'application/json' }));

const commands = [
  ['git', 'fetch', '--all'],
  ['git', 'checkout', '--force'],
  ['npm', 'install'],
  ['npm', 'run', 'build'],
];

const updateCurrentHead = async () => {
  let current_head = '';
  const git = spawn('git', ['show', '--pretty=format:"%h"', '--no-patch']);
  git.stdout.on('data', (data) => {
    current_head = data.toString();
  });
  await new Promise<void>(resolve => git.on('close', () => resolve()));
  return current_head.slice(1, current_head.length - 1); // trim double quotes
};

const doDeployPrepare = async (target: string) => {
  for (const [command, ...args] of commands) {
    console.log(command, args);
    if (args.includes('checkout')) {
      args.push(target);
    }
    const proc = spawn(command, args, { cwd: process.cwd() });
    const muxed = new PassThrough();

    const observer = new Promise<number>(resolve => proc.on('close', (code) => {
      if (code !== 0) {
        console.error(`Error(code: ${code}) in '${command} ${args}`);
        resolve(code as number);
      } else {
        resolve(code);
      }
    }));

    proc.stdout.on('data', chunk => muxed.write(chunk));
    proc.stderr.on('data', chunk => muxed.write(chunk));

    Promise.all([
      new Promise<void>(resolve => proc.stdout.on('end', () => resolve())),
      new Promise<void>(resolve => proc.stderr.on('end', () => resolve())),
    ]).then(() => {
      muxed.end();
    });

    const output = await new Promise<Buffer>((resolve) => {
      muxed.pipe(concat({ encoding: 'buffer' }, (data: Buffer) => {
        resolve(data);
      }));
    });

    console.log(output.toString());

    const exit_code = await observer;
    if (exit_code !== 0) {
      return exit_code;
    }
  }
  return 0;
};

const updateDeploy = async () => {
  // check current HEAD
  const current_head = await updateCurrentHead();

  // execute deploy commands
  const exit_code = await doDeployPrepare('origin/master');
  if (exit_code !== 0) {
    console.error('Rolling back to previous HEAD...');
    if (await doDeployPrepare(current_head) !== 0) {
      // double fault
      console.error('もうむりぽ..........');
    } else {
      console.warn(`Success rolling back to ${current_head}`);
    }
    return;
  }

  // restart
  await new Promise<void>((resolve, reject) => {
    pm2.connect((error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });

  console.log('Restarting pm2...');
  await new Promise<void>((resolve, reject) => {
    pm2.restart('smallkirby.xyz', (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
};

app.post('/github', async (req, res) => {
  const event = req.headers['x-github-event'];
  console.log(`event: ${event}`);

  if (event === 'ping') {
    return 'pong';
  }
  if (event === 'push') {
    // validation
    const xsig = Buffer.from(get(req.headers, ['x-hub-signature-256']) as string, 'utf8');
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
    console.log('Received valid hook');
    res.status(200);
    res.send('OK');

    // deploy
    await updateDeploy();

    return;
  }

  res.status(501);
  res.send('not found: github');
});

scheduleJob('0 0 * * *', async () => await updateDeploy());

module.exports = app;
