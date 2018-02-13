/**
 * Mask
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
  <div class="mask" data-group="main">
    <div class="mask__panel mask__panel--loading panel panel--black-reverse">
      <div class="panel__body">
        ${loading()}
      </div>
    </div>

    <div class="mask__panel mask__panel--message panel panel--black-reverse">
      <div class="panel__body">
        <p class="message">${'message'}</p>
      </div>
    </div>

    <!-- 自定义关闭按钮 -->
    <a href="#close" class="btn close" data-trigger="close">close</a>
  </div>
`;
