import * as reducerType from '../../unit/reducerType';

const initialState = 'classic';

const theme = (state = initialState, action) => {
  switch (action.type) {
    case reducerType.SET_THEME:
      return action.data;
    default:
      return state;
  }
};

export default theme;
