import React from 'react';
import PropTypes from 'prop-types';

import './Wrapper.scss';

const Wrapper = (props) => {
  const { children } = props;

  return (
    <div className="wrapper">
      { children }
    </div>
  );
};

Wrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
  ]),
};

Wrapper.defaultProps = {
  children: null,
};

export default Wrapper;
