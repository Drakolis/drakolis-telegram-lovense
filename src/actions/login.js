import { createAsyncAction } from 'redux-promise-middleware-actions';
import ipcEvents from '../constants/ipcEvents';
import authSteps from '../constants/authSteps';

const ipcRenderer = window.ipcRenderer || {
  send() {},
};

export const loginNumberAction = createAsyncAction(
  'LOGIN_NUMBER',
  number =>
    new Promise((res, rej) => {
      ipcRenderer.send(ipcEvents.LOGIN_NUMBER_REQUEST, { number });
      ipcRenderer.on(ipcEvents.LOGIN_NUMBER_SUCCESS, (_, data) => {
        res(data);
      });
      ipcRenderer.on(ipcEvents.LOGIN_ALL_SUCCESS, () => {
        res({
          loggedIn: true,
          step: authSteps.FINAL,
        });
      });
      ipcRenderer.on(ipcEvents.LOGIN_NUMBER_FAILURE, () => {
        rej();
      });
    })
);
export const loginCodeAction = createAsyncAction(
  'LOGIN_CODE',
  code =>
    new Promise((res, rej) => {
      ipcRenderer.send(ipcEvents.LOGIN_CODE_REQUEST, { code });
      ipcRenderer.on(ipcEvents.LOGIN_ALL_SUCCESS, () => {
        res({
          loggedIn: true,
          step: authSteps.FINAL,
        });
      });
      ipcRenderer.on(ipcEvents.LOGIN_CODE_FAILURE, () => {
        rej();
      });
    })
);
