const electron = require('electron');

const { Client } = require('tglib');

const { app } = electron;
const { BrowserWindow } = electron;
const path = require('path');
const url = require('url');
const { ipcMain } = require('electron');

let mainWindow;

ipcMain.on('LOGMEIN', () => {
  const client = new Client({
    apiId: 402920,
    apiHash: '33851a17de4a4038084636c09fcbfb51',

    appDir: './tdlib/application',
    binaryPath: './tdlib/lib/libtdjson.1.4.0.dylib',
  });
  const defaultHandler = client.callbacks['td:getInput'];
  mainWindow.blur();
  client.registerCallback('td:update', update => {
    console.log(JSON.stringify(update));
  });

  client.registerCallback('td:error', error => {
    console.log(JSON.stringify(error));
  });

  client.registerCallback('td:getInput', async args => {
    console.log(JSON.stringify(args));
    if (args.string === 'tglib.input.AuthorizationType') {
      return 'user';
    }
    if (args.string === 'tglib.input.AuthorizationValue') {
      return `+35796067031`;
    }
    return defaultHandler(args);
  });
});

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 400,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      preload: `${__dirname}/preload.js`,
    },
  });

  mainWindow.loadURL(
    process.env.ELECTRON_START_URL ||
      url.format({
        pathname: path.join(__dirname, '/../public/index.html'),
        protocol: 'file:',
        slashes: true,
      })
  );

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
