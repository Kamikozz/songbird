import React from 'react';
import PropTypes from 'prop-types';

import WrapperContainer from '../Wrapper/Wrapper';
import MainSectionHeader from '../MainSectionHeader/MainSectionHeader';
import MainSectionBody from '../MainSectionBody/MainSectionBody';

import './Main.scss';

class Main extends React.Component {
  constructor(props) {
    super(props);

    // TODO: remove this
    this.nextCategory = this.nextCategory.bind(this);
  }

  // TODO: remove this
  nextCategory() {
    console.log(this);
  }

  render() {
    const {
      children,
      isGuessed,
      songItems,
      incorrectAnswers,
      guessedItemId,
      selectedItemId,
      onItemClick,
      onNextCategoryButtonClick,
    } = this.props;

    return (
      <main className="main-content">
        <WrapperContainer>
          <MainSectionHeader
            songItems={songItems}
            guessedItemId={guessedItemId}
            isGuessed={isGuessed}
          />
          <MainSectionBody
            songItems={songItems}
            incorrectAnswers={incorrectAnswers}
            guessedItemId={guessedItemId}
            selectedItemId={selectedItemId}
            onItemClick={onItemClick}
          />
          <button
            className="main-content__control-button"
            type="button"
            disabled={!isGuessed}
            onClick={onNextCategoryButtonClick}
          >
            Next Level
          </button>
          { children }
        </WrapperContainer>
      </main>
    );
  }
}

Main.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]),
  isGuessed: PropTypes.bool,
  songItems: PropTypes.arrayOf(PropTypes.object),
  incorrectAnswers: PropTypes.objectOf(PropTypes.any),
  guessedItemId: PropTypes.string,
  selectedItemId: PropTypes.string,
  onItemClick: PropTypes.func,
  onNextCategoryButtonClick: PropTypes.func,
};

Main.defaultProps = {
  children: null,
  isGuessed: false,
  songItems: [],
  incorrectAnswers: null,
  guessedItemId: '',
  selectedItemId: '',
  onItemClick: null,
  onNextCategoryButtonClick: null,
};

export default Main;
