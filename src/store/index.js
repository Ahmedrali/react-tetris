import { createStore } from 'redux';
// Import Map if your reducers expect an Immutable structure for initial state
// import { Map } from 'immutable';
import rootReducer from '../reducers';

const THEME_STORAGE_KEY = 'tetrisTheme'; // Key for localStorage

// Function to load the theme from localStorage
const loadThemeState = () => {
  try {
    const serializedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (serializedTheme === null) {
      return undefined; // Let reducer provide initial state ('classic')
    }
    // Return the state slice structure expected by the root reducer
    // Assuming the theme reducer is directly under the root and expects a plain JS object/string
    return {
        theme: JSON.parse(serializedTheme)
    };
  } catch (err) {
    console.error("Could not load theme state", err);
    return undefined;
  }
};

// Function to save the theme to localStorage
const saveThemeState = (state) => {
  try {
    // Extract the theme state - adjust if using Immutable.js: state.get('theme')
    // Assuming state passed in is { theme: 'actualThemeName' }
    const themeToSave = state.theme;
    const serializedTheme = JSON.stringify(themeToSave);
    localStorage.setItem(THEME_STORAGE_KEY, serializedTheme);
  } catch (err) {
    console.error("Could not save theme state", err);
  }
};

const preloadedState = loadThemeState();

const store = createStore(
    rootReducer,
    preloadedState, // Pass the loaded state slice
    window.devToolsExtension && window.devToolsExtension()
);

// Subscribe to store changes to save the theme
// Need to handle potential Immutable.js structure if rootReducer uses it
const getThemeFromState = (state) => {
    // Check if the state is an Immutable Map
    if (typeof state.get === 'function') {
        return state.get('theme');
    }
    // Otherwise, assume plain JS object
    return state.theme;
};

let currentTheme = getThemeFromState(store.getState());
store.subscribe(() => {
    let previousTheme = currentTheme;
    currentTheme = getThemeFromState(store.getState());

    if (previousTheme !== currentTheme) {
        // Pass the relevant slice to saveThemeState
        saveThemeState({ theme: currentTheme });
    }
});

export default store;
