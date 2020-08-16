import React from 'react';
import PropTypes from 'prop-types';

import SongCard from '../SongCard/SongCard';

import './MainSectionHeader.scss';

const MainSectionHeader = (props) => {
  const { songItems, isGuessed } = props;

  const data = songItems[0];

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
  isGuessed: PropTypes.bool,
};
MainSectionHeader.defaultProps = {
  songItems: [],
  isGuessed: false,
};

export default MainSectionHeader;
