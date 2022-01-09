# smallkirby.xyz

Make Nirugiri Greater.

![favicon](static/img/simple-transparent.png)

## Build
### Local Dev

```build.sh
# pre-requisites: git, npm, node, cargo, wasm-pack
npm ci
npm -w functions build -- --watch
npm run emulate
npm run dev
```
### Build of wasms

```build.sh
cd wasm/<target dir>
wasm-pack --out-name index --release
```
## Deploy

```deploy.sh
git clone https://github.com/smallkirby/smallkirby.xyz.git
git fetch --all
git checkout --force origin/master
npm ci
npm run build
```

## Necessary Info

- `GITHUB_SECRET`: to receive Github webhook for auto deploy. Should be kept secret.
- Firebase Project info: to identify Firebase project. No need to be kept secret.

## Coworking services

- Firebase: Firestore / Functions
- Google Spreadsheet
