/**
 * Menu
 */

import { templater } from '../lib';

const list = param => param.reduce((prev, d) => `${prev}<li>${d.content}</li>`, '');

const page = param => param.reduce((prev, d) => (
  `${prev}<div class="menu__nav" data-page="${d.id}">
    <a href="#menu" class="menu__anchor">${d.title}</a>
    <!-- nav实现的一种方式 -->
    <ol class="custom-detail">${list(d.data)}</ol>
  </div>`
), '');

page.displayName = 'page';

export default templater `
  <div class="app app--menu">
    <div class="menu" data-group="main">${page}</div>
  </div>
`;
