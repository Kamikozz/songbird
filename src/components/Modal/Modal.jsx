import React from 'react';
import PropTypes from 'prop-types';

import perfectResultImage from '../../assets/img/perfect-result.gif';

import './Modal.scss';

const reload = () => window.location.reload();

const Modal = (props) => {
  const { score, maxScore } = props;
  const isDefaultModal = score !== maxScore;
  const congratulationsText = isDefaultModal
    ? `А также погладили ${score} котеек из ${maxScore} :3`
    : `Вы погладили ${score} котеек из ${maxScore} :3`;

  return (
    <div className="modal">
      <div className="modal__container">
        <div className="modal__content">
          {
            isDefaultModal
              ? (
                <>
                  <p className="modal__text">Поздравляем! Вы угадали почти все песни!</p>
                  <p className="modal__text">{congratulationsText}</p>
                </>
              )
              : (
                <>
                  <p className="modal__text">Поздравляем! Вы правильно угадали все песни!</p>
                  <img
                    className="modal__image"
                    src={perfectResultImage}
                    alt="happy cat"
                  />
                  <p className="modal__text">{congratulationsText}</p>
                  <p className="modal__text">Все котята довольны! ❤ Спасибо вам!</p>
                </>
              )
          }
          <button
            className="modal__button"
            type="button"
            onClick={reload}
          >
            Сыграть ещё?
          </button>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  score: PropTypes.number,
  maxScore: PropTypes.number,
};

Modal.defaultProps = {
  score: 0,
  maxScore: 0,
};

export default Modal;
