import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import style from './index.less';

// Import theme CSS files directly
import '../themes/base.css';
import '../themes/classic.css';
import '../themes/neon.css';
import '../themes/dark.css';

import Matrix from '../components/matrix';
import Decorate from '../components/decorate';
import Number from '../components/number';
import Next from '../components/next';
import Music from '../components/music';
import Pause from '../components/pause';
import Point from '../components/point';
import Logo from '../components/logo';
import Keyboard from '../components/keyboard';
import Guide from '../components/guide';
import ThemeSelector from '../components/ThemeSelector';

import { i18n, lan } from '../unit/const';

class App extends React.Component {
  render() {
    let filling = 0;
    const size = (() => {
      const w = document.documentElement.clientWidth;
      const h = document.documentElement.clientHeight;
      const ratio = h / w;
      let scale;
      let css = {};
      if (ratio < 1.5) {
        scale = (h / 960) * 1.2;  // 20% zoom increase
      } else {
        scale = (w / 640) * 1.2;  // 20% zoom increase
        filling = (h - (960 * scale)) / scale / 3;
        css = {
          paddingTop: Math.floor(filling) + 42,
          paddingBottom: Math.floor(filling),
          marginTop: Math.floor(-480 - (filling * 1.5)),
        };
      }
      return css;
    })();

    const theme = this.props.theme;
    const keyboard = this.props.keyboard;
    const drop = this.props.drop;
    const themeClassName = `theme-${theme || 'classic'}`;

    return (
      <div
        className={classnames(style.app, themeClassName)}
        style={size}
      >
        <div
          className={classnames({
            [style.rect]: true,
            [style.drop]: drop,
          })}
        >
          <Decorate />
          <div className={style.screen}>
            <div className={style.panel}>
              <Matrix
                matrix={this.props.matrix}
                cur={this.props.cur}
                reset={this.props.reset}
              />
              <Logo cur={!!this.props.cur} reset={this.props.reset} />
              <div className={style.state}>
                <Point cur={!!this.props.cur} point={this.props.points} max={this.props.max} />
                <p>{ this.props.cur ? i18n.cleans[lan] : i18n.startLine[lan] }</p>
                <Number number={this.props.cur ? this.props.clearLines : this.props.startLines} />
                <p>{i18n.level[lan]}</p>
                <Number
                  number={this.props.cur ? this.props.speedRun : this.props.speedStart}
                  length={1}
                />
                <p>{i18n.next[lan]}</p>
                <Next data={this.props.next} />
                <div className={style.bottom}>
                  <Music data={this.props.music} />
                  <Pause data={this.props.pause} />
                  <Number time />
                </div>
              </div>
            </div>
          </div>
        </div>
        <ThemeSelector />
        <Keyboard filling={filling} keyboard={keyboard} />
        <Guide />
      </div>
    );
  }
}

App.propTypes = {
  music: PropTypes.bool.isRequired,
  pause: PropTypes.bool.isRequired,
  matrix: PropTypes.object.isRequired,
  next: PropTypes.string.isRequired,
  cur: PropTypes.object,
  speedStart: PropTypes.number.isRequired,
  speedRun: PropTypes.number.isRequired,
  startLines: PropTypes.number.isRequired,
  clearLines: PropTypes.number.isRequired,
  points: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  reset: PropTypes.bool.isRequired,
  drop: PropTypes.bool.isRequired,
  keyboard: PropTypes.object.isRequired,
  theme: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  pause: state.get('pause'),
  music: state.get('music'),
  matrix: state.get('matrix'),
  next: state.get('next'),
  cur: state.get('cur'),
  speedStart: state.get('speedStart'),
  speedRun: state.get('speedRun'),
  startLines: state.get('startLines'),
  clearLines: state.get('clearLines'),
  points: state.get('points'),
  max: state.get('max'),
  reset: state.get('reset'),
  drop: state.get('drop'),
  keyboard: state.get('keyboard'),
  theme: state.get('theme'),
});

export default connect(mapStateToProps)(App);
