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
