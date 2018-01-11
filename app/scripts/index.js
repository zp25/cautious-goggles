import {
  Carousel,
  CarouselLite,
  Mask,
  Menu,
} from 'zp-ui';
import { dispatch } from 'zp-lib';

import createClickHandler from './handlers';
import ui from './ui';
import {
  backgroundObserver,
  panelSwitchingObserver,
} from './observer';

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
  carouselLite.attach(backgroundObserver());
  carouselLite.play();

  // mask
  const mask = new Mask('main');
  mask.attach(panelSwitchingObserver());
  mask.hide();

  // menu
  const menu = new Menu('main');
  menu.open(2);

  // event listener
  const handler = createClickHandler({ mask, carousel });
  document.body.addEventListener('click', dispatch(handler), false);
}, false);
