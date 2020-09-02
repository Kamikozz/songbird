import React from 'react';
import PropTypes from 'prop-types';

import AudioPlayer from 'react-h5-audio-player';

import 'react-h5-audio-player/src/styles.scss';

import './Player.scss';

class Player extends React.PureComponent {
  constructor(props) {
    super(props);
    this.stopPlayer = this.stopPlayer.bind(this);
  }

  stopPlayer(e) {
    const { isGuessed } = this.props;

    if (isGuessed) {
      const { target: audio } = e;

      audio.pause();
      audio.currentTime = 0;
    }
  }

  render() {
    const {
      src,
    } = this.props;

    return (
      <AudioPlayer
        className="player"
        src={src}
        volume={0.5}
        showJumpControls={false}
        autoPlayAfterSrcChange={false}
        onListen={this.stopPlayer}
      />
    );
  }
}

Player.propTypes = {
  src: PropTypes.string,
  isGuessed: PropTypes.bool,
};

Player.defaultProps = {
  src: '',
  isGuessed: false,
};

export default Player;
