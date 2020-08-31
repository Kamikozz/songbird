import React from 'react';
import PropTypes from 'prop-types';

import './Categories.scss';

const makeHumanReadableSongGenres = (sourceGenre) => {
  const MISCELANEOUS = 'misc'; // all of the others genres like OST from movie etc.
  const RHYTHM_AND_BLUES = 'rb';
  let ret;

  switch (sourceGenre) {
    case RHYTHM_AND_BLUES: {
      ret = 'r&b';
      break;
    }
    case MISCELANEOUS: {
      ret = 'other';
      break;
    }
    default: {
      ret = sourceGenre;
      break;
    }
  }

  return ret;
};

const Categories = (props) => {
  const {
    activeIndex,
    categories,
  } = props;

  const categoriesJsx = categories.map((item, index) => {
    const isSelected = index === activeIndex;

    const categoriesItemClassName = `categories__item${
      isSelected ? ' categories__item_active' : ''
    }`;

    return (
      <li
        className={categoriesItemClassName}
        key={item}
      >
        {makeHumanReadableSongGenres(item)}
      </li>
    );

    // return isSelected
    //   ? (
    //     <li
    //       className={categoriesItemClassName}
    //       key={item}
    //     >
    //       {item}
    //     </li>
    //   )
    //   : (
    //     <li
    //       className="categories__item"
    //       key={item}
    //     >
    //       {item}
    //     </li>
    //   );
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
