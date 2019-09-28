const { ipcMain } = require('electron');
const ipcEvents = require('../constants/ipcEvents');
const TDLib = require('../singletons/tdlib');
const Lovense = require('../singletons/lovense');

function ipcBus(mainWindow) {
  TDLib.mainWindow = mainWindow;

  ipcMain.on(ipcEvents.LOGIN_NUMBER_REQUEST, (event, { number }) => {
    TDLib.login(number);
  });

  ipcMain.on(ipcEvents.LOGIN_CODE_REQUEST, (event, { code }) => {
    TDLib.authCode = code;
  });

  ipcMain.on(ipcEvents.LOVENSE_TEST_RUN, (event, { url, id }) => {
    Lovense.vibrateAsNotification(10, 1, url, id)
      .then(() => {
        mainWindow.send(ipcEvents.LOVENSE_TEST_COMPLETE);
      })
      .catch(() => {
        mainWindow.send(ipcEvents.LOVENSE_TEST_FAILED);
      });
  });
}

module.exports = ipcBus;
