/**
 * Carousel精简版
 */

import { templater } from 'zp-lib';

const list = param => param.reduce(prev => `${prev}<div class="slide-banner"></div>`, '');

list.displayName = 'list';

export default templater`
  <div class="app app--carousel">
    <div class="carousel" data-group="lite">
      <div class="carousel__main">${list}</div>
    </div>
  </div>
`;
