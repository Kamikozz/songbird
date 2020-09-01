import React from 'react';
import PropTypes from 'prop-types';

const SongCardDescription = (props) => {
  const { description } = props;

  return (
    <div className="song-card__description">{description}</div>
  );
};

SongCardDescription.propTypes = {
  description: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
    ]),
  ),
};
SongCardDescription.defaultProps = {
  description: null,
};

export default SongCardDescription;
