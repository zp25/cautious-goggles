import {
  Carousel,
  CarouselLite,
  ImageLoader,
  Modal,
  Menu,
} from 'zp-ui';
import { dispatch } from 'zp-lib';

import {
  createHandler,
  createClickHandler,
} from './handlers';
import ui from './ui';
import {
  backgroundObserver,
  counterObserver,
  dialogSwitchingObserver,
} from './observers';

/**
 * 首次呈现
 */
const render = () => {
  const sec = ui();

  Object.keys(sec).forEach((key) => {
    sec[key]();
  });
};

document.addEventListener('DOMContentLoaded', () => {
  render();

  // carousel
  const carousel = new Carousel('main', { focus: 2, delay: 8000 });
  carousel.autoplay();

  // carousel lite
  const carouselLite = new CarouselLite('lite', { delay: 4000 });
  const bgRecorder = backgroundObserver();

  carouselLite.attach([
    bgRecorder,
    counterObserver(carouselLite.detach.bind(carouselLite, bgRecorder)),
  ]);

  carouselLite.play();

  // image loader
  const imageLoader = new ImageLoader();

  // mask
  const modal = new Modal('main');
  modal.attach(dialogSwitchingObserver());
  modal.close();

  // menu
  const menu = new Menu('main');
  menu.open(2, true);

  // event listener
  const clickHandler = createClickHandler({ carousel, modal, menu });
  document.body.addEventListener('click', dispatch(clickHandler), false);

  const handler = createHandler({ imageLoader });
  window.addEventListener('scroll', handler.scroller, false);
  window.addEventListener('resize', handler.scroller, false);

  // carouselLite.main
}, false);
