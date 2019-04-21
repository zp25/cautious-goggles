/**
 * Modal
 */

import { templater } from 'zp-lib';

const loading = () => {
  const arr = [...new Array(12).keys()].map(d => d + 1);

  const circles = arr.reduce((prev, d) => (
    `${prev}<span class="loading__circle loading__circle--${d}"></span>`
  ), '');

  return `<div class="loading">${circles}</div>`;
};

export default templater`
  <div class="modal modal--mask" data-group="main">
    <div class="modal__dialog modal__dialog--loading modal__dialog--switching">
      ${loading()}
    </div>

    <div class="modal__dialog modal__dialog--message">
      <p class="message">${'message'}</p>
    </div>

    <!-- 自定义关闭按钮 -->
    <a href="#close" class="btn close" data-trigger="close">close</a>
  </div>
`;
