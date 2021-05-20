//import fastify from 'fastify';
import express from 'express';
import dotenv from 'dotenv';
import { get } from 'lodash';
import crypto from 'crypto';
import bodyParser from 'body-parser';

dotenv.config();
export const app = express();

app.use('/hooks/github', express.raw({ type: 'application/json' }));

const commands = [
  ['git', 'fetch', '--all'],
  ['git', 'checkout', '--foce', 'origin/master'],
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
    console.log(get(req.headers, ["X-Hub-Signature-256"]));
    console.log("***");
    console.log(get(req.headers, "X-Hub-Signature-256"));
    const xsig = Buffer.from(get(req.headers, ["X-Hub-Signature-256"]) as string, 'utf8');
    const hmac = crypto.createHmac('sha256', process.env.GITHUB_SECRET as string);
    const digest = Buffer.from('sha256=' + hmac.update(req.body).digest('hex'), 'utf8');
    if (!crypto.timingSafeEqual(digest, xsig)) {
      console.log(digest);
      console.log(xsig);
      res.status(404);
      res.send('secret verification error.');
    }
    if(get)
    if (get(req.body, ['repository', 'id']) !== 386909618) {
      res.status(404);
      res.send('repository ID is invalid.');
    }
    if (get(req.body, ['ref']) !== 'refs/heads/master') {
      res.status(404);
      res.send('invalid refs.');
    }
  }
  res.status(501);
  return 'not found';
});

app.listen(3001);
