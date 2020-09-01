import React from 'react';

import Header from '../Header/Header';
import Score from '../Score/Score';
import Categories from '../Categories/Categories';
import Main from '../Main/Main';
import Loader from '../Loader/Loader';

import getSongData from '../../js/song-data-retrieve';

// eslint-disable-next-line import/no-unresolved
import './App.scss';

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
    };
  }

  componentDidMount() {
    const { activeIndex: activeCategoryIndex } = this.state;

    getSongData()
      .then((songGroups) => {
        console.log(songGroups);

        const songGenreNames = Object.keys(songGroups);
        const currentSongGenreName = songGenreNames[activeCategoryIndex];
        const songItems = songGroups[currentSongGenreName].slice(0, 6); // take 6 elements

        this.setState({
          categories: songGenreNames,
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
    }, this.changeGuessedItem);
  }

  handlerCheckGuessed(selectedItemId) {
    const { isGuessed: isAlreadyGuessed } = this.state;

    if (isAlreadyGuessed) return;

    const { incorrectAnswers } = this.state;
    const isAlreadyIncorrect = [...incorrectAnswers].some((item) => item === selectedItemId);

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
    } else {
      incorrectAnswers.add(selectedItemId);

      this.setState({
        incorrectAnswers,
      });
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
