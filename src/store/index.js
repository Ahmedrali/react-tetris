import { createStore } from 'redux';
import { Map } from 'immutable';
import rootReducer from '../reducers';

const THEME_STORAGE_KEY = 'tetrisTheme';

const loadThemeState = () => {
  try {
    const serializedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (serializedTheme === null) {
      return Map();
    }
    return Map({
      theme: JSON.parse(serializedTheme)
    });
  } catch (err) {
    console.error('Could not load theme state', err);
    return Map();
  }
};

const saveThemeState = (state) => {
  try {
    const themeToSave = state.get('theme');
    const serializedTheme = JSON.stringify(themeToSave);
    localStorage.setItem(THEME_STORAGE_KEY, serializedTheme);
  } catch (err) {
    console.error('Could not save theme state', err);
  }
};

const preloadedState = loadThemeState();

const store = createStore(
  rootReducer,
  preloadedState,
  window.devToolsExtension && window.devToolsExtension()
);

let currentTheme = store.getState().get('theme');
store.subscribe(() => {
  const previousTheme = currentTheme;
  currentTheme = store.getState().get('theme');

  if (previousTheme !== currentTheme) {
    saveThemeState(store.getState());
  }
});

export default store;
