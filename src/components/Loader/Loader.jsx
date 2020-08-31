import React from 'react';

import preloaderImage from '../../assets/img/loader.gif';

import './Loader.scss';

const Loader = () => (
  <div className="loader">
    <div className="bg_color_violet" />
    <div className="loader__container">
      <div className="loader__content">
        <p>Поглядите на котейку, который играется с моим приложением :3</p>
        <img
          className="loader__image"
          src={preloaderImage}
          alt="preloader cat playing phone"
        />
        <p className="loader__content-spoiler">(сайт грузится, там 100 песен прост ~20 сек.)</p>
      </div>
    </div>
  </div>
);

export default Loader;
