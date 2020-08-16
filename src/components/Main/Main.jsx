import React from 'react';
import PropTypes from 'prop-types';

import WrapperContainer from '../Wrapper/Wrapper';
import MainSectionHeader from '../MainSectionHeader/MainSectionHeader';
import MainSectionBody from '../MainSectionBody/MainSectionBody';

import './Main.scss';

const Main = (props) => {
  const {
    children,
    // songTitle,
    isGuessed,
    songItems,
  } = props;

  return (
    <main className="main-content">
      <WrapperContainer>
        <MainSectionHeader songItems={songItems} isGuessed={isGuessed} />
        <MainSectionBody songItems={songItems} />
        <button className="main-content__control-button" type="button">Next Level</button>
        { children }
      </WrapperContainer>
    </main>
  );
};

Main.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]),
  // songTitle: PropTypes.string,
  isGuessed: PropTypes.bool,
  songItems: PropTypes.arrayOf(PropTypes.object),
};

Main.defaultProps = {
  children: null,
  // songTitle: '*****',
  isGuessed: false,
  songItems: [],
};

export default Main;
