import React from 'react';
import PropTypes from 'prop-types';

const SongCardImage = (props) => {
  const { coverUrl } = props;

  return (
    <div className="song-card__image-container">
      <img className="song-card__image" src={coverUrl} alt="correct artist" />
    </div>
  );
};

SongCardImage.propTypes = {
  coverUrl: PropTypes.string,
};
SongCardImage.defaultProps = {
  coverUrl: '',
};

export default SongCardImage;
