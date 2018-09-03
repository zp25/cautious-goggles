import {
  Carousel,
  Group,
  ImageLoader,
  Modal,
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
  dialogSwitchingObserver,
  menuObserver,
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
  carousel.attach(navObserver.call(carousel));
  carousel.autoplay();

  // carousel lite
  const carouselLeft = new Carousel('left', { delay: 4000 });
  const bgRecorder = backgroundObserver();

  carouselLeft.attach([
    bgRecorder,
    counterObserver(carouselLeft.detach.bind(carouselLeft, bgRecorder)),
  ]);
  carouselLeft.autoplay();

  const carouselRight = new Carousel('right');
  carouselRight.attach(navObserver.call(carouselRight));
  carouselRight.play();

  // image loader
  const imageLoader = new ImageLoader();

  // mask
  const modal = new Modal('main');
  modal.attach(dialogSwitchingObserver());
  modal.close();

  // menu
  const menu = new Group('menu');
  menu.attach(menuObserver.call(menu));
  menu.update({ page: '2' });

  // event listener
  const clickHandler = createClickHandler({
    carousel,
    carouselRight,
    modal,
    menu,
  });
  document.body.addEventListener('click', dispatch(clickHandler), false);

  const handler = createHandler({ imageLoader });
  window.addEventListener('scroll', handler.scroller, false);
  window.addEventListener('resize', handler.scroller, false);

  // carouselLite.main
}, false);
