import { createAction, createAsyncAction } from 'redux-promise-middleware-actions';
import ipcEvents from '../constants/ipcEvents';

const ipcRenderer = window.ipcRenderer || {
  send() {},
  on() {},
};

export const toggleLovenseModal = createAction('LOVENSE_TOGGLE_MODAL', () => {
  return true;
});

export const saveLovenseSettings = () => {};
export const testLovenseSettings = createAsyncAction(
  'LOVENSE_SETTINGS_TEST',
  (url, id) =>
    new Promise((res, rej) => {
      ipcRenderer.send(ipcEvents.LOVENSE_TEST_RUN, { url, id });
      ipcRenderer.on(ipcEvents.LOVENSE_TEST_COMPLETE, () => res());
      ipcRenderer.on(ipcEvents.LOVENSE_TEST_FAILED, () => rej());
    })
);
