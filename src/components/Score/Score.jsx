import React from 'react';
import PropTypes from 'prop-types';

import './Score.scss';

// import '../../js/api/spotify-api';

class Score extends React.Component {
  constructor(props) {
    super(props);

    this.updateScore = this.updateScore.bind(this);

    console.log('Score constructor');
  }

  componentDidMount() {
    console.log('Component did mount');
    // setInterval(this.updateScore, 2500);
  }

  updateScore() {
    const { onUpdateScore } = this.props;

    onUpdateScore();
  }

  render() {
    const { score } = this.props;

    console.log('yo cyka', score);

    return (
      <p className="score">
        <span className="score__title">Score: </span>
        <span className="score__value">
          { score }
        </span>
      </p>
    );
  }
}

Score.propTypes = {
  score: PropTypes.number,
  onUpdateScore: PropTypes.func,
};

Score.defaultProps = {
  score: 0,
  onUpdateScore: null,
};

export default Score;
