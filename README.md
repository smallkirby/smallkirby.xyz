# smallkirby.xyz

Make Nirugiri Greater.

## Build
### Build of all
```build.sh
# pre-requisites: git, npm, node, cargo, wasm-pack
npm run build
```
### Build of wasms
```build.sh
cd wasm/xxx
wasm-pack --out-name index --release
```
## Deploy
```deploy.sh
git clone https://github.com/smallkirby/smallkirby.xyz.git
git fetch --all
git checkout --force origin/master
npm install
npm run build
```


# LICENSE

Most of code and assets are distributed under [MIT License](./LICENSE).
Below assets are created by others and might be distributed under other licenses.

- [hakatashi icon](./static/img/hakatashi.png): by [@hakatashi](https://github.com/hakatashi/icon). [MIT LICENSE](https://opensource.org/licenses/mit-license.php).
