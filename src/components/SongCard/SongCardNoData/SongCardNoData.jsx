import React from 'react';
import PropTypes from 'prop-types';

import './SongCardNoData.scss';

const SongCardNoData = (props) => {
  const { isExtended, parentClassName } = props;

  const songCardClasses = `song-card${
    isExtended ? ` ${parentClassName}__song-card` : ''
  }`;
  const songCardContainerItemClasses = `song-card__container-item ${
    isExtended ? ` ${parentClassName}__song-card-container-item` : ''
  }`;

  return (
    <div className={songCardClasses}>
      <div className="song-card__container">
        <div className={songCardContainerItemClasses}>
          <div className="song-card__no-data-message">
            <p>Нажмите на кнопку &quot;Play&quot;, чтобы прослушать исполнителя.</p>
            <p>Затем, выберите в списке вариант ответа</p>
          </div>
        </div>
      </div>
    </div>
  );
};

SongCardNoData.propTypes = {
  isExtended: PropTypes.bool,
  parentClassName: PropTypes.string,
};
SongCardNoData.defaultProps = {
  isExtended: false,
  parentClassName: '',
};

export default SongCardNoData;
