import React from 'react';
import PropTypes from 'prop-types';

import SongCardNoData from './SongCardNoData/SongCardNoData';
import SongCardImage from './SongCardImage/SongCardImage';
import SongCardDescription from './SongCardDescription/SongCardDescription';

import Player from '../Player/Player';

import './SongCard.scss';

const DEFAULT_COVER = 'https://i.pinimg.com/736x/bc/7b/fa/bc7bfa3234eff0c9814939be6faac33c.jpg';

const SongCard = (props) => {
  const {
    data,
    isExtended,
    parentClassName,
  } = props;

  if (!data) {
    return (
      <SongCardNoData isExtended={isExtended} parentClassName={parentClassName} />
    );
  }

  const {
    isGuessed,
  } = props;

  //   artist: 'Madonna',
  //   song: 'Hello',
  //   description: 'cscsacasca',
  //   header: 'Delichon urbicum',
  //   spotifyId: '123123123',

  const {
    artist,
    song,
    description,
    header,
    spotifyId,
  } = data;
  let songTitle = `${artist} - ${song}`;

  songTitle = isGuessed ? songTitle : '*'.repeat(songTitle.length);

  let { coverUrl } = data;

  coverUrl = isGuessed ? coverUrl : DEFAULT_COVER;

  const songCardClasses = `song-card${
    isExtended ? ` ${parentClassName}__song-card` : ''
  }`;
  const songCardContainerItemClasses = `song-card__container-item ${
    isExtended ? ` ${parentClassName}__song-card-container-item` : ''
  }`;
  const songCardPlayerContainerClasses = `song-card__player-container${
    isExtended ? ` ${parentClassName}__song-card-player-container` : ''
  }`;

  return (
    <div
      style={{ backgroundImage: `url(${coverUrl})` }}
      className={songCardClasses}
      key={spotifyId}
    >
      <div className="song-card__blur-wrapper">
        <div className="song-card__container">
          <div className={songCardContainerItemClasses}>
            <SongCardImage coverUrl={coverUrl} />
            <div className={songCardPlayerContainerClasses}>
              <h3 className="song-card__song-title">{songTitle}</h3>
              { isExtended && <h4 className="song-card__song-subtitle">{header}</h4> }
              <Player />
            </div>
          </div>
          { isExtended && (
            <div className="song-card__container-item">
              <SongCardDescription description={description} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

SongCard.propTypes = {
  data: PropTypes.objectOf(PropTypes.string),
  isExtended: PropTypes.bool,
  isGuessed: PropTypes.bool,
  parentClassName: PropTypes.string,
};
SongCard.defaultProps = {
  data: null,
  isExtended: false,
  isGuessed: false,
  parentClassName: '',
};

export default SongCard;
