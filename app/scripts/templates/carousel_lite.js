/**
 * Carousel精简版
 */

import { templater } from 'zp-lib';

const list = param => param.reduce(prev => `${prev}<div class="slide-banner"></div>`, '');

list.displayName = 'list';

const nav = (param) => {
  if (param) {
    const result = param.reduce((prev, d) => (
      `${prev}<a href="#slide" class="jump__btn" data-trigger="jumpLite" data-order="${d}"></a>`
    ), '');

    return `<div class="jump">${result}</div>`;
  }

  return '';
};

nav.displayName = 'nav';

export default templater`
  <div class="app app--carousel-lite">
    <div class="carousel" data-group="${'group'}">
      <div class="carousel__main">${list}</div>

      ${nav}
    </div>
  </div>
`;
