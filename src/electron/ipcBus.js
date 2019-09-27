const { ipcMain } = require('electron');
const ipcEvents = require('../constants/ipcEvents');
const TDLib = require('../singletons/tdlib');

function ipcBus(mainWindow) {
  TDLib.mainWindow = mainWindow;

  ipcMain.on(ipcEvents.LOGIN_NUMBER_REQUEST, (event, { number }) => {
    TDLib.login(number);
  });

  ipcMain.on(ipcEvents.LOGIN_CODE_REQUEST, (event, { code }) => {
    TDLib.authCode = code;
  });
}

module.exports = ipcBus;
