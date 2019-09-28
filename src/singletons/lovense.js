const axios = require('axios');

module.exports = new (class {
  url = '';

  deviceId = '';

  async sendVibrateCommand(power, url = this.url, deviceId = this.deviceId) {
    return axios.get(`${url}/Vibrate?v=${power}&t=${deviceId}`);
  }

  async vibrateAsNotification(power, timeoutSeconds = 1, url = this.url, deviceId = this.deviceId) {
    return new Promise(res => {
      this.sendVibrateCommand(power, url, deviceId).then(() => {
        setTimeout(
          () =>
            this.sendVibrateCommand(0, url, deviceId).then(() => {
              res();
            }),
          timeoutSeconds * 1000
        );
      });
    });
  }
})();
