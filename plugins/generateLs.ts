import fs from 'fs';
import moment from 'moment';

interface Entry{
  pagename: string,
  perms: string,
  url: string,
  user: string,
  group: string,
  modified: string,
};

const genEntry = (pagename: string): Entry => {
  const s = fs.statSync(('pages/' + pagename));
  return {
    pagename: pagename.split('.')[0],
    perms: '-r--r--r--',
    url: `https://smallkirby.xyz/${pagename.split('.')[0]}`,
    user: 'skb',
    group: 'skb',
    modified: moment(s.ctime).format('MMM DD hh:mm'),
  };
};

fs.readdir('./pages', (err, files) => {
  if (err) { return; }
  const pagelist = files.filter((file) => {
    return fs.statSync('pages/' + file).isFile() && /.*\.vue$/.test(file);
  });

  const entries = pagelist.map(pagename => genEntry(pagename));
  fs.writeFileSync('static/ls.json', JSON.stringify(entries));
});
