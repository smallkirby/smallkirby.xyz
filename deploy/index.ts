import fastify from 'fastify';

export const app = fastify();

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
    console.log(req)
    res.code(202);
    return 'not yet';
  }
  res.code(501);
  return 'not found';
});

app.listen(3001, (err, addr) => {
  if (err) throw err;
  app.log.info(`server listening on ${addr}`);
})
