/**
 * Menu
 */

import { templater } from 'zp-lib';

const list = param => param.reduce((prev, d) => `${prev}<li>${d.content}</li>`, '');

const page = param => param.reduce((prev, d) => (
  `${prev}<a class="menu__anchor" data-trigger="switchList" data-page="${d.id}">
    <div href="#menu" class="menu__item">${d.title}</div>
    <!-- nav实现的一种方式 -->
    <ol class="menu__page">${list(d.data)}</ol>
  </a>`
), '');

page.displayName = 'page';

export default templater`
  <div class="app app--menu">
    <div class="menu" data-group="main">${page}</div>
  </div>
`;
