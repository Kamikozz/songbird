import React from 'react';
// import PropTypes from 'prop-types';

import AudioPlayer from 'react-h5-audio-player';

import 'react-h5-audio-player/src/styles.scss';

import './Player.scss';
import soundSource from '../../assets/audio/correct.mp3';

// const { children, songTitle } = props;

const Player = () => (
  <>
    <AudioPlayer
      className="player"
      // autoPlay
      src={soundSource}
      showJumpControls={false}
      autoPlayAfterSrcChange={false}
      // onPlay={(e) => console.log(e, 'onPlay')}
    />
  </>
);

// Main.propTypes = {
//   children: PropTypes.oneOfType([
//     PropTypes.arrayOf(PropTypes.element),
//     PropTypes.element,
//   ]),
//   songTitle: PropTypes.string,
// };

// Main.defaultProps = {
//   children: null,
//   songTitle: '*****',
// };

export default Player;
