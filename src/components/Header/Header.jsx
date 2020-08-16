import React from 'react';
import PropTypes from 'prop-types';

// import Score from '../Score/Score';
// import logo from '../../assets/img/logo.svg';
import WrapperContainer from '../Wrapper/Wrapper';

import './Header.scss';

const Header = (props) => {
  const { children, scoreComponent } = props;

  console.log('Header', children);

  return (
    <header className="header">
      <WrapperContainer>
        <div className="header__container">
          <h1 className="header__logo">
            <span>Guess</span>
            <span className="header__logo_colored">Melody</span>
          </h1>

          { scoreComponent }
        </div>

        { children }
      </WrapperContainer>
    </header>
  );
};

Header.propTypes = {
  // score: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]),
  scoreComponent: PropTypes.element,
};

Header.defaultProps = {
  // score: 0,
  children: null,
  scoreComponent: null,
};

export default Header;
