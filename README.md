## electron-application-template

.

## Usage

```console
git clone https://github.com/shinich39/electron-application-template.git && cd electron-application-template && npm install && npm run unlink && npm uninstall mkdirp rimraf
```

- Run as administrator

```json
// package.json
"build": {
  "win": {
    // add this line into "win"
    "requestedExecutionLevel": "requireAdministrator",
  },
  // add portable object
  "portable": {
    "requestExecutionLevel": "admin"
  },
}
```

## Icons

- ./resources/icons/128x128.ico
- ./resources/icons/256x256.ico
- ./resources/icons/256x256.png
- ./resources/icons/512x512.png
- ./resources/icons/512x512.icns