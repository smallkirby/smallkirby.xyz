import fs from 'fs';
import simpleGit, { SimpleGit } from 'simple-git';
import diffparser from 'parse-diff';

const run = async () => {
  let git: SimpleGit = simpleGit();

  if (!fs.existsSync('smallkirby')) {
    git.clone('https://github.com/smallkirby/smallkirby');
  }

  let counts = [];
  git = simpleGit('./smallkirby');
  git.fetch('--all');
  git.checkout('origin/master');
  const raw_logs = await git.raw(['--no-pager', 'log', '-p', '--invert-grep', '--author=smallkirby', '--oneline', '--decorate=short', 'README.md']);
  const logs = diffparser(raw_logs);
  for (const log of logs.reverse()) {
    const added = log.chunks[0].changes[1].content;
    const tmp1 = added.split("message=")[1];
    if (tmp1 != undefined) {
      const count = Number(tmp1.split("&")[0]);
      counts.push(count);
    } else {
      continue;
    }
  }

  const j = {
    counts: counts,
  };
  fs.writeFileSync('static/nirugiri.json', JSON.stringify(j));
};

run();

