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
      .then((data) => {
        console.log(data);
        const songGroups = {};

        data.forEach((item) => {
          const songGenres = Object.keys(songGroups);
          const { category } = item;
          const isExist = songGenres.some((genre) => genre === category);

          if (!isExist) {
            songGroups[category] = [];
          }

          songGroups[category].push(item);
        });

        console.log(songGroups);

        const songGenreNames = Object.keys(songGroups);
        const currentSongGenreName = songGenreNames[activeCategoryIndex];
        const songItems = songGroups[currentSongGenreName];

        this.setState({
          categories: songGenreNames,
          songGroups,
          songItems,
          isLoading: false,
          // songItems: [{
          //   artist: 'Madonna',
          //   song: 'Hello',
          //   description: 'Для ласточек характерно негромкое щебетание. Песни ласточек не
          // смолкают на протяжении всего лета. Исследователи различают у птиц до 6 щебечущих
          // звуков: «вит», «ви-вит», «чивит», «чиривит» и т.п. Ласточки любят петь дуэтом.',
          //   coverUrl: 'https://birds-quiz.netlify.app/static/media/bird.06a46938.jpg',
          //   header: 'Delichon urbicum',
          //   spotifyId: '123123123',
          // }, {
          //   artist: 'Snoop Dogg',
          //   song: 'Doggystyle',
          //   description: '',
          //   coverUrl: 'https://avatars.mds.yandex.net/get-pdb/51720/91e24d4c-b631-4fa2-9ba0-33632a5903a2/s1200',
          //   header: '',
          //   spotifyId: '234234234',
          // }, {
          //   artist: '2pac',
          //   song: 'DragonMoney',
          //   description: '',
          //   coverUrl: 'https://avatars.mds.yandex.net/get-pdb/2864819/b08ff1a1-514a-4523-9945-c99f7fd29b64/s1200',
          //   header: '',
          //   spotifyId: '4444444',
          // }],
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
      const songItems = songGroups[currentSongGenreName];

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
