import * as reducerType from '../../unit/reducerType';

// Define the initial theme (e.g., 'classic')
const initialState = 'classic';

const theme = (state = initialState, action) => {
  switch (action.type) {
    case reducerType.SET_THEME:
      return action.data; // Payload should be the new theme name (string)
    default:
      return state;
  }
};

export default theme;
