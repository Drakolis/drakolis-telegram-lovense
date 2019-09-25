const { Client } = require('tglib/node');
const axios = require('axios');

const sendVibrateCommand = (v) => axios.get(`http://192.168.178.20:34567/Vibrate?v=${v}&t=c1ef18d8a353`);

async function main() {
  const client = new Client({
    apiId: 402920,
    apiHash: '',

    appDir: './tdlib/application',
    binaryPath: './tdlib/lib/libtdjson.1.4.0.dylib',
  });

  const defaultHandler = client.callbacks['td:getInput'];

  client.registerCallback('td:getInput', async (args) => {
    this.transportLogger.debugSyntax('json', JSON.stringify(args));
    if (args.string === 'tglib.input.AuthorizationType') {
      return 'user';
    }
    if (args.string === 'tglib.input.AuthorizationValue') {
      return '+';
    }
    return defaultHandler(args);
  });

  client.registerCallback('td:update', (update) => {
    console.log(JSON.stringify(update));
    if (update['@type'] === 'updateNewMessage' && !update.message.is_outgoing) {
      sendVibrateCommand(10).then(
        () => {
          setTimeout(
            () => sendVibrateCommand(0),
            1 * 1000,
          );
        },
      );
    }
  });

  client.registerCallback('td:error', (error) => {
    // console.log(JSON.stringify(error));
  });

  await client.ready;
}

main();
