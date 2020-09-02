import React from 'react';
import PropTypes from 'prop-types';

import BEMClasses from '../../js/bem-classes';

import SongListPlayer from './SongListPlayer/SongListPlayer';

import './SongList.scss';

const dirtyClasses = {
  ROOT: {
    _class: 'list-container',
    elements: {
      LIST: {
        _class: 'list',
      },
      ITEM: {
        _class: 'item',
        modifiers: {
          CORRECT: {
            _class: 'correct',
          },
          INCORRECT: {
            _class: 'incorrect',
          },
        },
      },
      BUTTON: {
        _class: 'button',
      },
      ARTIST: {
        _class: 'song-artist',
      },
      SONG_SEPARATOR: {
        _class: 'song-separator',
      },
      SONG: {
        _class: 'song-name',
      },
    },
    modifiers: {
      BLACKED: {
        _class: 'darken',
      },
    },
  },
  BLOCK: {
    _class: 'block',
  },
};

const bemClasses = new BEMClasses(dirtyClasses);
const { classes: c } = bemClasses;
const { getClassName } = bemClasses;

class SongList extends React.Component {
  constructor(props) {
    super(props);

    this.itemClick = this.itemClick.bind(this);
  }

  itemClick(event) {
    const { target } = event;
    const selectedItemId = target.getAttribute('data-id');

    const { onItemClick } = this.props;

    onItemClick(selectedItemId);
  }

  render() {
    const {
      lastClickedItemState,
      items,
      guessedItemId,
      selectedItemId,
      incorrectAnswers,
    } = this.props;

    const listItemsJsx = items.map(({
      artist,
      song,
      spotifyId,
    }) => {
      let itemClassName = getClassName(c.ROOT.ITEM);
      const isInitial = selectedItemId === '';

      if (!isInitial) {
        const isIncorrect = [...incorrectAnswers].some((item) => item === spotifyId);

        if (isIncorrect) {
          itemClassName = `${itemClassName} ${getClassName(c.ROOT.ITEM.INCORRECT)}`;
        } else {
          const isCurrentItemGuessedItem = spotifyId === guessedItemId;
          const isSelectedItemGuessedItem = selectedItemId === guessedItemId;
          const isCorrect = isCurrentItemGuessedItem && isSelectedItemGuessedItem;

          if (isCorrect) {
            itemClassName = `${itemClassName} ${getClassName(c.ROOT.ITEM.CORRECT)}`;
          }
        }
      }

      return (
        <li className={itemClassName} key={spotifyId}>
          <button
            className={getClassName(c.ROOT.BUTTON)}
            type="button"
            data-id={spotifyId}
            onClick={this.itemClick}
          >
            <span className={getClassName(c.ROOT.ARTIST)}>{artist}</span>
            <span className={getClassName(c.ROOT.SONG_SEPARATOR)}> - </span>
            <span className={getClassName(c.ROOT.SONG)}>{song}</span>
          </button>
        </li>
      );
    });

    return (
      <div className={getClassName(c.ROOT)}>
        <ul className={getClassName(c.ROOT.LIST)}>
          {listItemsJsx}
        </ul>

        <SongListPlayer lastClickedItemState={lastClickedItemState} />
      </div>
    );
  }
}

SongList.propTypes = {
  lastClickedItemState: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.object),
  incorrectAnswers: PropTypes.objectOf(PropTypes.any),
  guessedItemId: PropTypes.string,
  selectedItemId: PropTypes.string,
  onItemClick: PropTypes.func,
};

SongList.defaultProps = {
  lastClickedItemState: '',
  items: [],
  incorrectAnswers: null,
  guessedItemId: '',
  selectedItemId: '',
  onItemClick: null,
};

export default SongList;
