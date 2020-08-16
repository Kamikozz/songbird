import React from 'react';
import PropTypes from 'prop-types';

import Player from '../Player/Player';

import './SongCard.scss';

const SongCardImage = (props) => {
  const { coverUrl } = props;

  return (
    <div
      className="song-card__image-container"
    >
      <img
        className="song-card__image"
        src={coverUrl}
        alt="correct artist"
      />
    </div>
  );
};

const Description = (props) => {
  const { description } = props;

  return (
    <p className="song-card__description">{description}</p>
  );
};

const DEFAULT_COVER = 'https://i.pinimg.com/736x/bc/7b/fa/bc7bfa3234eff0c9814939be6faac33c.jpg';

const SongCard = (props) => {
  const {
    data,
    isExtended,
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
  const songTitle = `${artist} - ${song}`;

  let { coverUrl } = data;

  coverUrl = isGuessed ? coverUrl : DEFAULT_COVER;

  console.log(coverUrl, isGuessed);

  return (
    <div
      style={{ backgroundImage: `url(${coverUrl})` }}
      className="song-card"
      key={spotifyId}
    >
      <div className="song-card__blur-wrapper">
        <div className="song-card__container">
          <div className="song-card__container-item">
            <SongCardImage coverUrl={coverUrl} />
            <div className="song-card__player-container">
              <h3 className="song-card__song-title">{songTitle}</h3>
              { isExtended && <h4 className="song-card__song-subtitle">{header}</h4> }
              <Player />
            </div>
          </div>
          { isExtended && (
            <div className="song-card__container-item">
              <Description description={description} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

SongCardImage.propTypes = {
  coverUrl: PropTypes.string,
};
SongCardImage.defaultProps = {
  coverUrl: '',
};

Description.propTypes = {
  description: PropTypes.string,
};
Description.defaultProps = {
  description: '<-- Нет данных -->',
};

SongCard.propTypes = {
  data: PropTypes.objectOf(PropTypes.string),
  isExtended: PropTypes.bool,
  isGuessed: PropTypes.bool,
};
SongCard.defaultProps = {
  data: {},
  isExtended: false,
  isGuessed: false,
};

export default SongCard;
