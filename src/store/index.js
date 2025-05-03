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
      theme: JSON.parse(serializedTheme), // Indent fixed, comma added
    };
  } catch (err) {
    console.error('Could not load theme state', err); // Quotes fixed
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
    console.error('Could not save theme state', err); // Quotes fixed
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
  if (typeof state.get === 'function') { // Indent fixed (2 spaces)
    return state.get('theme'); // Indent fixed (4 spaces)
  }
  // Otherwise, assume plain JS object
  return state.theme; // Indent fixed (2 spaces)
};

let currentTheme = getThemeFromState(store.getState());
store.subscribe(() => {
  const previousTheme = currentTheme; // Use const, Indent fixed (2 spaces)
  currentTheme = getThemeFromState(store.getState()); // Indent fixed (2 spaces)

  if (previousTheme !== currentTheme) { // Indent fixed (2 spaces)
    // Pass the relevant slice to saveThemeState
    saveThemeState({ theme: currentTheme }); // Indent fixed (4 spaces)
  }
});

export default store;
