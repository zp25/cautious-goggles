import {
  Group,
  ImageLoader,
  Modal,
  SwipeCarousel,
} from 'zp-ui';
import { dispatch } from 'zp-lib';

import {
  createHandler,
  createClickHandler,
} from './handlers';
import ui from './ui';
import {
  navObserver,
  backgroundObserver,
  counterObserver,
} from './observers/carousel';
import {
  modalObserver,
  dialogObserver,
  closeButtonObserver,
} from './observers/modal';
import menuObserver from './observers/menu';

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
  const carousel = new SwipeCarousel('main', { focus: 2, delay: 8000 });
  carousel.attach(navObserver.call(carousel));
  carousel.autoplay();

  const carouselLeft = new SwipeCarousel('left', { delay: 4000 });
  const bgRecorder = backgroundObserver();

  carouselLeft.attach([
    bgRecorder,
    counterObserver(carouselLeft.detach.bind(carouselLeft, bgRecorder)),
  ]);
  carouselLeft.autoplay();

  const carouselRight = new SwipeCarousel('right');
  carouselRight.attach(navObserver.call(carouselRight));
  carouselRight.play();

  // mask
  const modal = new Modal('main');
  modal.attach([
    modalObserver.call(modal),
    dialogObserver.call(modal),
    closeButtonObserver.call(modal),
  ]);
  modal.close();

  // menu
  const menu = new Group('menu');
  menu.attach(menuObserver.call(menu));
  menu.setState({ page: '2' });

  // event listener
  const clickHandler = createClickHandler({
    carousel,
    carouselRight,
    modal,
    menu,
  });
  document.body.addEventListener('click', dispatch(clickHandler), false);

  // image loader
  const handler = createHandler({ imageLoader: new ImageLoader() });

  window.addEventListener('scroll', handler.lazyload, false);
  window.addEventListener('resize', handler.lazyload, false);
  window.addEventListener('orientationChange', handler.lazyload, false);
}, false);
