import React from 'react';
import PropTypes from 'prop-types';

import SongList from '../SongList/SongList';
import SongCard from '../SongCard/SongCard';

import './MainSectionBody.scss';

const SONG_CARD_EXTENDED = true;

const MainSectionBody = (props) => {
  const { songItems, isGuessed } = props;

  const data = songItems[0];

  // songItems: [{
  //   artist: 'Madonna',
  //   song: 'Hello',
  //   description: 'cscsacasca',
  //   header: 'Delichon urbicum',
  //   spotifyId: '123123123',
  // }, {
  //   artist: 'Snoop Dogg',
  //   song: 'Doggystyle',
  //   spotifyId: '234234234',
  // }],

  return (
    <div className="main-content-body">
      <div className="main-content-body__container">
        <SongList items={songItems} />
        <SongCard
          parentClassName="main-content"
          data={data}
          isExtended={SONG_CARD_EXTENDED}
          isGuessed={isGuessed}
        />
      </div>
    </div>
  );
};

MainSectionBody.propTypes = {
  songItems: PropTypes.arrayOf(PropTypes.object),
  isGuessed: PropTypes.bool,
};

MainSectionBody.defaultProps = {
  songItems: [],
  isGuessed: true,
};

export default MainSectionBody;
