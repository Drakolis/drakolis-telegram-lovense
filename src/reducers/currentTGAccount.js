import { createReducer } from 'redux-promise-middleware-actions';
import { loginNumberAction, loginCodeAction } from '../actions/login';
import authSteps from '../constants/authSteps';

const defaultState = {
  loggedIn: false,
  pending: false,
  step: authSteps.NUMBER,
  username: null,
  error: '',
};

export default createReducer(defaultState, handleAction => [
  handleAction(loginNumberAction.pending, state => {
    return { ...state, pending: true, step: authSteps.PENDING };
  }),
  handleAction(loginNumberAction.fulfilled, (state, { payload }) => {
    return { ...state, pending: false, step: payload.step, loggedIn: payload.loggedIn || false };
  }),
  handleAction(loginNumberAction.rejected, state => {
    return {
      ...state,
      pending: false,
      step: authSteps.NUMBER,
      error: 'Incorrect phone number',
    };
  }),
  handleAction(loginCodeAction.pending, state => {
    return { ...state, pending: true, step: authSteps.FINAL };
  }),
  handleAction(loginCodeAction.fulfilled, (state, { payload }) => {
    return { ...state, pending: false, step: payload.step, loggedIn: payload.loggedIn };
  }),
  handleAction(loginCodeAction.rejected, state => {
    return {
      ...state,
      pending: false,
      step: authSteps.NUMBER,
      error: 'Incorrect code',
    };
  }),
]);
