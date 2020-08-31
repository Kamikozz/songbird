import React from 'react';
import PropTypes from 'prop-types';

import WrapperContainer from '../Wrapper/Wrapper';

import './Header.scss';

const Header = (props) => {
  const { children, scoreComponent } = props;

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
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]),
  scoreComponent: PropTypes.element,
};

Header.defaultProps = {
  children: null,
  scoreComponent: null,
};

export default Header;
