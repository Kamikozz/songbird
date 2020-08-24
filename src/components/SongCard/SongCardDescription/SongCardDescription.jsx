import React from 'react';
import PropTypes from 'prop-types';

const SongCardDescription = (props) => {
  const { description } = props;

  return (
    <p className="song-card__description">{description}</p>
  );
};

SongCardDescription.propTypes = {
  description: PropTypes.string,
};
SongCardDescription.defaultProps = {
  description: '<-- Нет данных -->',
};

export default SongCardDescription;
