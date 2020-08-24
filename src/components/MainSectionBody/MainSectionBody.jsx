import React from 'react';
import PropTypes from 'prop-types';

import SongList from '../SongList/SongList';
import SongCard from '../SongCard/SongCard';

import './MainSectionBody.scss';

const SONG_CARD_EXTENDED = true;

class MainSectionBody extends React.Component {
  constructor(props) {
    super(props);

    this.onItemClick = this.onItemClick.bind(this);
  }

  // TODO: remove this shit & THINK OUT ABOUT HOW TO RERENDER STATE
  onItemClick(selectedItemId) {
    const { onItemClick } = this.props;

    onItemClick(selectedItemId);
  }

  render() {
    const {
      songItems,
      incorrectAnswers,
      isGuessed,
      guessedItemId,
      selectedItemId,
      // onItemClick,
    } = this.props;

    const data = songItems.find(({ spotifyId }) => selectedItemId === spotifyId);

    // const data = {
    //   artist: '',
    //   song: '',
    //   description: '',
    //   header: '',
    //   spotifyId: '',
    // };

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
          <SongList
            items={songItems}
            incorrectAnswers={incorrectAnswers}
            guessedItemId={guessedItemId}
            selectedItemId={selectedItemId}
            onItemClick={this.onItemClick}
          />
          <SongCard
            parentClassName="main-content"
            data={data}
            isExtended={SONG_CARD_EXTENDED}
            isGuessed={isGuessed}
          />
        </div>
      </div>
    );
  }
}

MainSectionBody.propTypes = {
  songItems: PropTypes.arrayOf(PropTypes.object),
  incorrectAnswers: PropTypes.objectOf(PropTypes.any),
  isGuessed: PropTypes.bool,
  guessedItemId: PropTypes.string,
  selectedItemId: PropTypes.string,
  onItemClick: PropTypes.func,
};

MainSectionBody.defaultProps = {
  songItems: [],
  incorrectAnswers: null,
  isGuessed: true,
  guessedItemId: '',
  selectedItemId: '',
  onItemClick: null,
};

export default MainSectionBody;
