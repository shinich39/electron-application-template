const {
  app,
  BrowserWindow,
} = require('electron');
const path = require('path');
const fs = require('fs');
const {
  isMac,
  isWin,
  isLinux,
  getName,
  getPid,
  getPath,
  getWindow,
  setEventLimit,
  alert,
  send,
  receive,
  handle,
  getMenu,
  getMenuTemplate,
  setMenu,
} = require('./libs/utils');

const windowLoadHandler = function() {
  console.log("> electron window loaded");
}

const windowCloseHandler = function() {
  console.log("> electron window closed");
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: path.join(__dirname, "assets/icons/icon.png"),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      worldSafeExecuteJavaScript: true,
      contextIsolation: true, // https://www.electronjs.org/docs/latest/tutorial/security
      nodeIntegration: false,
    }
  });

  // and load the index.html of the app.
  mainWindow.loadFile('index.html');

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  // Set event listeners.
  mainWindow.webContents.on("did-finish-load", windowLoadHandler);
  mainWindow.webContents.on("close", windowCloseHandler);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.