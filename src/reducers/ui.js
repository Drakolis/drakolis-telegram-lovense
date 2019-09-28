import { toggleLovenseModal } from '../actions/lovense';

const defaultState = {
  lovenseModalVisible: false,
  authModalVisible: false,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case toggleLovenseModal.toString():
      return { ...state, lovenseModalVisible: !state.lovenseModalVisible };
    default:
      return state;
  }
};
