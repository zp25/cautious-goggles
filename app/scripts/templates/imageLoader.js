import { templater } from 'zp-lib';

const loaders = data => data.reduce((prev, d) => (`${prev}
  <div
    class="image-loader replace"
    data-src="${d.src}"
    data-alt="${d.alt}"
    data-id="${d.id}"
  >
    <img src="${d.preview}" alt="${d.alt}" class="image image--thumbnail">
    <div class="aspect-ratio-fill" style="padding-bottom: ${d.ratio * 100}%;">
    </div>
  </div>
`), '');

loaders.displayName = 'loaders';

export default templater`
  <div class="app app--loaders">${loaders}</div>
`;
