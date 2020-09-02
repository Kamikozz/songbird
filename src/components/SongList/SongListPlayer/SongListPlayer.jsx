import React from 'react';
import PropTypes from 'prop-types';

import common from '../../../js/common';

import AUDIO_SRC_CORRECT from '../../../assets/audio/correct.mp3';
import AUDIO_SRC_INCORRECT from '../../../assets/audio/incorrect.mp3';

const { SONG_LIST_ITEM_STATES } = common;

class SongListPlayer extends React.Component {
  constructor(props) {
    super(props);

    this.audio = null;
    this.handlePlayAudio = this.handlePlayAudio.bind(this);
  }

  play() {
    const audioPromise = this.audio.play();

    if (audioPromise) {
      audioPromise
        .then(() => {
          // autoplay started
        })
        .catch((err) => {
          // catch dom exception
          console.info(err);
        });
    }
  }

  handlePlayAudio() {
    const {
      lastClickedItemState,
    } = this.props;

    let audioSrc;

    switch (lastClickedItemState) {
      case SONG_LIST_ITEM_STATES.CORRECT: {
        audioSrc = AUDIO_SRC_CORRECT;
        break;
      }
      case SONG_LIST_ITEM_STATES.INCORRECT: {
        audioSrc = AUDIO_SRC_INCORRECT;
        break;
      }
      case SONG_LIST_ITEM_STATES.DEFAULT:
      default:
        break;
    }

    if (audioSrc) {
      this.audio = new Audio(audioSrc);
      this.audio.volume = 0.5;
      this.play();
    }
  }

  render() {
    this.handlePlayAudio();

    return (
      <></>
    );
  }
}

SongListPlayer.propTypes = {
  lastClickedItemState: PropTypes.string,
};

SongListPlayer.defaultProps = {
  lastClickedItemState: '',
};

export default SongListPlayer;
