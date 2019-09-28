const { Client } = require('tdl');
const { TDLib } = require('tdl-tdlib-ffi');

module.exports = new (class {
  phoneForLogin = '';

  codeForLogin = '';

  passwordForLogin = '';

  firstNameForLogin = '';

  lastNameForLogin = '';

  constructor() {
    this.client = new Client(new TDLib('./tdlib/lib/libtdjson.1.4.0.dylib'), {
      apiId: 402920, // Your api_id
      apiHash: '', // Your api_hash

      databaseDirectory: './tdlib/application/db',
      filesDirectory: './tdlib/application/files',
    });

    this.client.on('update', d => console.log('UPDATE: ', JSON.stringify(d)));
    this.client.on('error', d => console.log('ERROR: ', JSON.stringify(d)));
    this.client.on('destroy', d => console.log('DESTROY: ', JSON.stringify(d)));
    this.client.on('auth-needed', d => console.log('AUTH-NEEDED: ', JSON.stringify(d)));
    this.client.on('auth-not-needed', d => console.log('AUTH-NOT-NEEDED: ', JSON.stringify(d)));
    this.client.on('response', d => console.log('RESPONSE: ', JSON.stringify(d)));
  }

  connect() {
    console.log('CONNECTING');
    return this.client.connect();
  }

  login() {
    const phonePromise = new Promise(res => {
      if (this.phoneForLogin) {
        res(this.phoneForLogin);
      }
    });
    const codePromise = new Promise(res => {
      if (this.codeForLogin) {
        res(this.codeForLogin);
      }
    });
    console.log('LOGGING IN');
    this.client.login(() => ({
      getPhoneNumber: retry =>
        retry ? Promise.reject('Invalid phone number') : Promise.resolve('+447594751680'),
      getAuthCode: retry =>
        retry ? Promise.reject('Invalid auth code') : Promise.resolve('22222'),
      // getPassword: (passwordHint, retry) =>
      //   retry ? Promise.reject('Invalid password') : Promise.resolve('abcdef'),
      // getName: () => Promise.resolve({ firstName: 'John', lastName: 'Doe' }),
    }));
  }

  send(message) {
    this.client.invoke(message);
  }
})();
