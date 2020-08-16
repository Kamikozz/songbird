import React from 'react';

import Header from '../Header/Header';
import Score from '../Score/Score';
import Categories from '../Categories/Categories';
import Main from '../Main/Main';

// eslint-disable-next-line import/no-unresolved
import './App.scss';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.handlerUpdateScore = this.handlerUpdateScore.bind(this);
    this.handlerCheckGuessed = this.handlerCheckGuessed.bind(this);

    this.state = {
      score: 0,
      value: 0,
      categories: [],
      songItems: [],
      isGuessed: false,
    };
  }

  componentDidMount() {
    this.setState({
      categories: ['Pop', 'Hip-Hop', 'Rock', 'Russian', 'Swag'],
      songItems: [{
        artist: 'Madonna',
        song: 'Hello',
        description: 'Для ласточек характерно негромкое щебетание. Песни ласточек не смолкают на протяжении всего лета. Исследователи различают у птиц до 6 щебечущих звуков: «вит», «ви-вит», «чивит», «чиривит» и т.п. Ласточки любят петь дуэтом.',
        coverUrl: 'https://birds-quiz.netlify.app/static/media/bird.06a46938.jpg',
        header: 'Delichon urbicum',
        spotifyId: '123123123',
      }, {
        artist: 'Snoop Dogg',
        song: 'Doggystyle',
        description: '',
        coverUrl: 'https://avatars.mds.yandex.net/get-pdb/51720/91e24d4c-b631-4fa2-9ba0-33632a5903a2/s1200',
        header: '',
        spotifyId: '234234234',
      }],
    });
  }

  handlerUpdateScore() {
    this.setState((state) => {
      const { score } = state;

      return {
        score: score + 1,
      };
    });
  }

  handlerCheckGuessed() {
    console.log(this);
  }

  render() {
    const {
      score,
      value,
      categories,
      songItems,
      isGuessed,
    } = this.state;

    console.log('App', score);

    const scoreComponent = <Score score={score} onUpdateScore={this.handlerUpdateScore} />;

    return (
      <div className="app">
        <Header scoreComponent={scoreComponent}>
          <Categories value={value} categories={categories} />
        </Header>
        <Main songItems={songItems} isGuessed={isGuessed} />
      </div>
    );
  }
}

export default App;
