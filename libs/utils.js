const {
  app,
  BrowserWindow,
  dialog,
  ipcMain,
  shell,
  Menu,
} = require('electron');

module.exports = {
  _app: app.name,
  _pid: process.pid,
  _isMac: process.platform === 'darwin',
  _isWin: process.platform === 'win32',
  _isLinux: process.platform === 'linux',
  _HomePath: app.getPath("home"),
  _appPath: app.getPath("appData"),
  _userPath: app.getPath("userData"),
  _sessionPath: app.getPath("sessionData"),
  _tempPath: app.getPath("temp"),
  _exePath: app.getPath("exe"),
  _modulePath: app.getPath("module"),
  _desktopPath: app.getPath("desktop"),
  _documentsPath: app.getPath("documents"),
  _downloadsPath: app.getPath("downloads"),
  _picturesPath: app.getPath("pictures"),
  _videosPath: app.getPath("videos"),
  _musicPath: app.getPath("music"),
  _logsPath: app.getPath("logs"),
  _crashDumpsPath: app.getPath("crashDumps"),
  
  isMac: function() {
    return this._isMac;
  },
  isWin: function() {
    return this._isWin;
  },
  isLinux: function() {
    return this._isLinux;
  },
  getAppName: function() {
    return this._app;
  },
  getPath: function() {
    return {
      documents: this._documentsPath,
      desktop: this._desktopPath,
      downloads: this._downloadsPath,
      home: this._HomePath,
      app: this._appPath,
      user: this._userPath,
      session: this._sessionPath,
      temp: this._tempPath,
      exe: this._exePath,
      module: this._modulePath,
      desktop: this._desktopPath,
      documents: this._documentsPath,
      downloads: this._downloadsPath,
      pictures: this._picturesPath,
      videos: this._videosPath,
      music: this._musicPath,
      logs: this._logsPath,
      crashDumps: this._crashDumpsPath,
    }
  },
  getPid: function() {
    return this._pid;
  },
  getWindow: function() {
    return BrowserWindow.getFocusedWindow() || BrowserWindow.getAllWindows()[0];
  },
  setEventLimit: function(n) {
    require('events').EventEmitter.defaultMaxListeners = n || 10; // default 10
  },
  alert: function(title, message) {
    if (!message) {
      dialog.showMessageBoxSync({
        message: title
      });
    } else {
      dialog.showMessageBoxSync({
        title: title,
        message: message
      });
    }
  },
  send: function(channel, data) {
    const win = this.getWindow();
    if (!win) {
      throw new Error("Window not found");
    }
    win.webContents.send(channel, data);
  },
  receive: function(channel, listener) {
    ipcMain.on(channel, listener);
  },
  handle: function(channel, listener) {
    ipcMain.handle(channel, listener);
  },
  getMenu: function(template) {
    return Menu.buildFromTemplate(template);
  },
  getMenuTemplate: function() {
    const menu = this._isMac ? {
      [app.name]: [
        { role: 'about' },
        { type: 'separator' },
        { role: 'services' },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideOthers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' }
      ],
      File: [
        { role: 'close' }
      ],
      Edit: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'pasteAndMatchStyle' },
        { role: 'delete' },
        { role: 'selectAll' },
        { type: 'separator' },
        {
          label: 'Speech',
          submenu: [
            { role: 'startSpeaking' },
            { role: 'stopSpeaking' }
          ]
        }
      ],
      View: [
        { role: 'reload' },
        { role: 'forceReload' },
        { role: 'toggleDevTools' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ],
      Window: [
        { role: 'minimize' },
        { role: 'zoom' },
        { type: 'separator' },
        { role: 'front' },
        { type: 'separator' },
        { role: 'window' }
      ],
      Help: [
        {
          label: 'Learn More',
          accelerator: "Cmd + H",
          click: async function() {
            const { shell } = require('electron');
            await shell.openExternal('https://electronjs.org')
          }
        }
      ]
    } : {
      File: [
        { role: 'quit' }
      ],
      Edit: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'delete' },
        { type: 'separator' },
        { role: 'selectAll' }
      ],
      View: [
        { role: 'reload' },
        { role: 'forceReload' },
        { role: 'toggleDevTools' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ],
      Window: [
        { role: 'minimize' },
        { role: 'zoom' },
        { role: 'close' }
      ],
      Help: [
        {
          label: 'Learn More',
          accelerator: "Ctrl + H",
          click: async function() {
            const { shell } = require('electron');
            await shell.openExternal('https://electronjs.org')
          }
        }
      ]
    };
    
    const template = [];
    for (const label of Object.keys(menu)) {
      template.push({
        label: label,
        submenu: menu[label],
      });
    }
    return template;
  },
  setMenu: function(menu) {
    Menu.setApplicationMenu(menu);
  },
}