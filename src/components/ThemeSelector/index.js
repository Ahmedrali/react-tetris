import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import actions from '../../actions';
import style from './index.less';

const themes = [
  { name: 'classic', label: 'Classic' },
  { name: 'neon', label: 'Neon' },
  { name: 'dark', label: 'Dark' },
];

// Keep it as a functional component, but receive dispatch function via props
const ThemeSelector = ({ setTheme }) => (
  <div className={style.selector}>
    {themes.map(theme => (
      <button
        key={theme.name}
        className={style.button}
        onClick={() => setTheme(theme.name)} // Use the prop function
        aria-label={`Switch to ${theme.label} theme`}
      >
        {theme.label}
      </button>
    ))}
  </div>
);

ThemeSelector.propTypes = {
  setTheme: PropTypes.func.isRequired, // Add prop type validation
};

// Map dispatch actions to props
const mapDispatchToProps = (dispatch) => ({
  setTheme: (themeName) => dispatch(actions.setTheme(themeName)),
});

// Connect the component to Redux
export default connect(null, mapDispatchToProps)(ThemeSelector);
