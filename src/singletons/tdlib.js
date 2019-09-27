const { Client } = require('tglib');
const chalk = require('chalk');
const ipcEvents = require('../constants/ipcEvents');
const authSteps = require('../constants/authSteps');

module.exports = new (class {
  mainWindow = null;

  authCode = '';

  client = null;

  login(phoneNumber) {
    const authCode = new Promise(res => {
      const interval = setInterval(() => {
        if (this.authCode) {
          res(this.authCode);
          clearInterval(interval);
        }
      }, 1000);
    });

    this.client = new Client({
      apiId: 402920,
      apiHash: '',

      appDir: './tdlib/application',
      binaryPath: './tdlib/lib/libtdjson.1.4.0.dylib',
    });

    const defaultHandler = this.client.callbacks['td:getInput'];

    this.client.registerCallback('td:update', update => {
      console.log(JSON.stringify(update));
      if (update['@type'] === 'updateOption' && update.name === 'authorization_date') {
        this.mainWindow.send(ipcEvents.LOGIN_ALL_SUCCESS);
      }
    });

    this.client.registerCallback('td:error', error => {
      console.log(chalk.red(JSON.stringify(error)));
      if (error.message === 'PHONE_NUMBER_INVALID') {
        delete this.client;
        console.log('TDLib destroyed');
        this.mainWindow.send(ipcEvents.LOGIN_NUMBER_FAILURE);
      }
    });

    this.client.registerCallback('td:getInput', async args => {
      console.log(chalk.cyan(JSON.stringify(args)));
      if (args.string === 'tglib.input.AuthorizationType') {
        return 'user';
      }
      if (args.string === 'tglib.input.AuthorizationValue') {
        return `+${phoneNumber}`;
      }
      if (args.string === 'tglib.input.AuthorizationCode') {
        this.mainWindow.send(ipcEvents.LOGIN_NUMBER_SUCCESS, { step: authSteps.CODE });
        return authCode;
      }
      return defaultHandler(args);
    });
  }

  async getAllChats() {
    await this.client.tg.getAllChats();
  }

  constructor() {}
})();
