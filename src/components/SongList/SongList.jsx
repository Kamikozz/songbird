import React from 'react';
import PropTypes from 'prop-types';

import BEMClasses from '../../js/bem-classes';

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
    // event.persist();
    // console.log(event, this);

    const { target } = event;
    const selectedItemId = target.getAttribute('data-id');
    // const { guessedItemId } = this.props;

    // // console.log(id);

    // const isGuessed = guessedItemId === selectedItemId;

    // if (isGuessed) {
    //   target.className = 'yoyoyo';
    // }

    const { onItemClick } = this.props;

    onItemClick(selectedItemId);
  }

  render() {
    const {
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
      const option = `${artist} - ${song}`;

      // // let itemClassName = getClassName(c.ROOT.ITEM);
      // let itemClassName;
      // const isInitial = selectedItemId === '';

      // if (isInitial) {
      //   itemClassName = getClassName(c.ROOT.ITEM);
      // } else {
      //   const isSelectedItem = selectedItemId === spotifyId;

      //   if (isSelectedItem) {
      //     const isCorrect = guessedItemId === spotifyId;

      //     itemClassName = `${getClassName(c.ROOT.ITEM)} ${isCorrect
      //       ? getClassName(c.ROOT.ITEM.CORRECT)
      //       : getClassName(c.ROOT.ITEM.INCORRECT)
      //     }`;
      //   } else {
      //     itemClassName =
      //   }
      // }

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
            {option}
          </button>
        </li>
      );
    });

    return (
      <div className={getClassName(c.ROOT)}>
        <ul className={getClassName(c.ROOT.LIST)}>
          {listItemsJsx}
        </ul>
      </div>
    );
  }
}

SongList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  incorrectAnswers: PropTypes.objectOf(PropTypes.any),
  guessedItemId: PropTypes.string,
  selectedItemId: PropTypes.string,
  onItemClick: PropTypes.func,
};

SongList.defaultProps = {
  items: [],
  incorrectAnswers: null,
  guessedItemId: '',
  selectedItemId: '',
  onItemClick: null,
};

export default SongList;
