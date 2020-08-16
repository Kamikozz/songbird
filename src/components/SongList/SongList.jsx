import React from 'react';
import PropTypes from 'prop-types';

import './SongList.scss';

const SongList = (props) => {
  const { items } = props;

  const listItemsJsx = items.map(({
    artist,
    song,
    spotifyId,
  }) => {
    const option = `${artist} - ${song}`;

    return (
      <li className="list-container__item" key={spotifyId}>
        <button className="list-container__button" type="button">{option}</button>
      </li>
    );
  });

  return (
    <div className="list-container">
      <ul className="list-container__list">
        {listItemsJsx}
      </ul>
    </div>
  );
};

SongList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
};

SongList.defaultProps = {
  items: [],
};

export default SongList;
