import React from 'react';

import Header from '../Header/Header';
import Score from '../Score/Score';
import Categories from '../Categories/Categories';
import Main from '../Main/Main';
import Loader from '../Loader/Loader';

import getSongData from '../../js/song-data-retrieve';
import random from '../../js/utils/random';
import common from '../../js/common';

// eslint-disable-next-line import/no-unresolved
import './App.scss';

const {
  SONG_LIST_ITEM_STATES,
} = common;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.handlerUpdateScore = this.handlerUpdateScore.bind(this);
    this.handlerCheckGuessed = this.handlerCheckGuessed.bind(this);
    this.handlerNextCategory = this.handlerNextCategory.bind(this);

    this.state = {
      score: 0,
      activeIndex: 0,
      categories: [],
      songItems: [],
      incorrectAnswers: new Set(),
      isGuessed: false,
      guessedItemId: '',
      selectedItemId: '',
      isLoading: true,
      lastClickedItemState: SONG_LIST_ITEM_STATES.DEFAULT,
    };
  }

  componentDidMount() {
    const { activeIndex: activeCategoryIndex } = this.state;

    getSongData()
      .then((songGroups) => {
        console.log(songGroups);

        const popularSongGroups = {};
        const sourceSongGenres = Object.keys(songGroups);

        sourceSongGenres.forEach((genreName) => {
          const countSongsInGroup = songGroups[genreName].length;
          const countGroups = sourceSongGenres.length;
          const POPULARITY_PERCENTAGE = 6;
          const countOfPopularSongs = Math.floor(countGroups * (POPULARITY_PERCENTAGE / 100));
          const isPopular = countSongsInGroup > countOfPopularSongs;

          if (isPopular) {
            popularSongGroups[genreName] = songGroups[genreName];
          }
        });

        const shuffledPopularSongGenres = random.shuffle(Object.keys(popularSongGroups));
        const shuffledPopularSongGroups = {};

        shuffledPopularSongGenres.forEach((genreName) => {
          const genres = popularSongGroups[genreName];

          shuffledPopularSongGroups[genreName] = genres;
        });

        console.log(shuffledPopularSongGroups);

        const currentSongGenreName = shuffledPopularSongGenres[activeCategoryIndex];
        // take 6 elements
        const songItems = random
          .shuffle(shuffledPopularSongGroups[currentSongGenreName])
          .slice(0, 6);

        this.setState({
          categories: shuffledPopularSongGenres,
          songGroups,
          songItems,
          isLoading: false,
        }, this.changeGuessedItem);
      });
  }

  handlerNextCategory() {
    let { activeIndex } = this.state;

    activeIndex += 1;

    const { categories } = this.state;
    const isGameEnded = activeIndex === categories.length;

    if (isGameEnded) {
      alert('GAME ENDED! Retry?');
    } else {
      const { songGroups } = this.state;

      const currentSongGenreName = categories[activeIndex];
      const songItems = songGroups[currentSongGenreName].slice(0, 6); // take 6 elements;

      this.setState({
        activeIndex,
        songItems,
      });

      this.resetGame();
    }
  }

  resetGame() {
    this.setState({
      isGuessed: false,
      incorrectAnswers: new Set(),
      selectedItemId: '',
      lastClickedItemState: SONG_LIST_ITEM_STATES.DEFAULT,
    }, this.changeGuessedItem);
  }

  handlerCheckGuessed(selectedItemId) {
    const { isGuessed: isAlreadyGuessed } = this.state;

    if (isAlreadyGuessed) return;

    const {
      incorrectAnswers,
      lastClickedItemState,
    } = this.state;
    const isAlreadyIncorrect = [...incorrectAnswers].some((item) => item === selectedItemId);

    if (!SONG_LIST_ITEM_STATES.isDefault(lastClickedItemState)) {
      this.setState({
        lastClickedItemState: SONG_LIST_ITEM_STATES.DEFAULT,
      });
    }

    if (isAlreadyIncorrect) return;

    const { guessedItemId } = this.state;
    const isGuessed = guessedItemId === selectedItemId;

    this.setState({
      selectedItemId,
    });

    if (isGuessed) {
      this.handlerUpdateScore();

      this.setState({
        isGuessed,
      });

      if (!SONG_LIST_ITEM_STATES.isCorrect(lastClickedItemState)) {
        this.setState({
          lastClickedItemState: SONG_LIST_ITEM_STATES.CORRECT,
        });
      }
    } else {
      incorrectAnswers.add(selectedItemId);

      this.setState({
        incorrectAnswers,
      });

      if (!SONG_LIST_ITEM_STATES.isIncorrect(lastClickedItemState)) {
        this.setState({
          lastClickedItemState: SONG_LIST_ITEM_STATES.INCORRECT,
        });
      }
    }
  }

  handlerUpdateScore() {
    this.setState((state) => {
      const {
        score,
        songItems,
        incorrectAnswers,
      } = state;
      const POINTS_MINUS_MISTAKES = (songItems.length - 1 - incorrectAnswers.size);

      return {
        score: score + POINTS_MINUS_MISTAKES,
      };
    });
  }

  changeGuessedItem() {
    const { songItems } = this.state;

    console.log(songItems);

    const LENGTH = songItems.length;
    const RANDOM_INT = Math.floor(Math.random() * LENGTH);
    const guessedItemId = songItems[RANDOM_INT].spotifyId;

    this.setState({
      guessedItemId,
    });
  }

  render() {
    const {
      score,
      activeIndex,
      categories,
      songItems,
      incorrectAnswers,
      isGuessed,
      guessedItemId,
      selectedItemId,
      isLoading,
      lastClickedItemState,
    } = this.state;

    const scoreComponent = <Score score={score} onUpdateScore={this.handlerUpdateScore} />;

    return (
      <div className="app">
        {
          isLoading
            ? <Loader />
            : (
              <>
                <Header scoreComponent={scoreComponent}>
                  <Categories
                    activeIndex={activeIndex}
                    categories={categories}
                  />
                </Header>
                <Main
                  lastClickedItemState={lastClickedItemState}
                  songItems={songItems}
                  incorrectAnswers={incorrectAnswers}
                  isGuessed={isGuessed}
                  guessedItemId={guessedItemId}
                  selectedItemId={selectedItemId}
                  onItemClick={this.handlerCheckGuessed}
                  onNextCategoryButtonClick={this.handlerNextCategory}
                />
              </>
            )
        }
      </div>
    );
  }
}

export default App;
