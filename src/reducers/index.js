import { combineReducers } from 'redux';
import currentTGAccount from './currentTGAccount';
import ui from './ui';
import lovenseSettings from './lovenseSettings';

export default combineReducers({
  currentTGAccount,
  ui,
  lovenseSettings,
});
