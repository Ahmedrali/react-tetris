import React from 'react';
import { useDispatch } from 'react-redux';
import actions from '../../actions';
import style from './index.less';

const themes = [
  { name: 'classic', label: 'Classic' },
  { name: 'neon', label: 'Neon' },
  { name: 'dark', label: 'Dark' },
];

const ThemeSelector = () => {
  const dispatch = useDispatch();

  return (
    <div className={style.selector}>
      {themes.map(theme => (
        <button
          key={theme.name}
          className={style.button}
          onClick={() => dispatch(actions.setTheme(theme.name))}
          aria-label={`Switch to ${theme.label} theme`}
        >
          {theme.label}
        </button>
      ))}
    </div>
  );
};

export default ThemeSelector;
