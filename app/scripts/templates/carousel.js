/**
 * Carousel
 * 可自定义前后导航，Carousel.play(reverse)方法提供反向播放功能，但自动播放只能正向播放
 */

import { templater } from 'zp-lib';

const list = (type) => {
  /**
   * 制作banner
   * @return {function}
   */
  const main = param => param.reduce(prev => (
    `${prev}<div class="slide-banner"></div>`
  ), '');

  /**
   * 制作nav
   * @return {function}
   */
  const nav = param => param.reduce((prev, d, index) => (
    `${prev}<a href="#slide" class="jump__btn" data-trigger="jump" data-order="${index + 1}"></a>`
  ), '');

  return {
    name: 'list',
    content: type === 'main' ? main : nav,
  };
};

export default templater`
  <div class="app app--carousel">
    <div class="carousel" data-group="main">
      <div class="carousel__main">${list('main')}</div>

      <!-- 自定义导航 -->
      <div class="step">
        <button class="step__btn step__btn--l" data-trigger="step" data-reverse="true">cL</button>
        <button class="step__btn step__btn--r" data-trigger="step">cR</button>
      </div>

      <div class="jump">${list('nav')}</div>
    </div>
  </div>
`;
