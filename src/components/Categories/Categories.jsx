import React from 'react';
import PropTypes from 'prop-types';

import './Categories.scss';

const Categories = (props) => {
  const {
    activeIndex,
    categories,
  } = props;

  const categoriesJsx = categories.map((item, index) => {
    const isSelected = index === activeIndex;

    return isSelected
      ? (
        <li
          className="categories__item categories__item_active"
          key={item}
        >
          {item}
        </li>
      )
      : (
        <li
          className="categories__item"
          key={item}
        >
          {item}
        </li>
      );
  });

  return (
    <ul className="categories header__categories">{ categoriesJsx }</ul>
  );
};

Categories.propTypes = {
  activeIndex: PropTypes.number,
  categories: PropTypes.arrayOf(PropTypes.string),
};

Categories.defaultProps = {
  activeIndex: 0,
  categories: [],
};

export default Categories;
