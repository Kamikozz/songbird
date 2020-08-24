import React from 'react';
import PropTypes from 'prop-types';

import SongCard from '../SongCard/SongCard';

import './MainSectionHeader.scss';

const MainSectionHeader = (props) => {
  const {
    songItems,
    isGuessed,
    guessedItemId,
  } = props;

  const data = songItems.find(({ spotifyId }) => guessedItemId === spotifyId);

  return (
    <div className="main-content-header">
      <div className="main-content-header__container">
        <SongCard data={data} isGuessed={isGuessed} />
      </div>
    </div>
  );
};

MainSectionHeader.propTypes = {
  songItems: PropTypes.arrayOf(PropTypes.object),
  guessedItemId: PropTypes.string,
  isGuessed: PropTypes.bool,
};
MainSectionHeader.defaultProps = {
  songItems: [],
  guessedItemId: '',
  isGuessed: false,
};

export default MainSectionHeader;
