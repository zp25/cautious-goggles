import Template from './templates';

export default () => {
  const $ = document.querySelector.bind(document);

  // carousel banner配置
  const list = [
    {
      order: 1,
    },
    {
      order: 2,
    },
    {
      order: 3,
    },
  ];

  /**
   * 轮播
   */
  const carousel = () => {
    const result = Template.carousel({ list });
    $('.demo--carousel').insertAdjacentHTML('afterbegin', result);
  };

  /**
   * 轮播精简版
   */
  const carouselLeft = () => {
    const result = Template.carouselLite({
      list,
      group: 'left',
      nav: false,
    });
    $('.demo--carousel-lite').insertAdjacentHTML('beforeend', result);
  };

  const carouselRight = () => {
    const result = Template.carouselLite({
      list,
      group: 'right',
      nav: [1, 2, 3],
    });
    $('.demo--carousel-lite').insertAdjacentHTML('beforeend', result);
  };

  const panel = () => {
    const result = Template.panel({
      title: 'Header',
      body: 'Body',
    });

    $('.demo--panel').insertAdjacentHTML('afterbegin', result);
  };

  const menu = () => {
    const result = Template.menu({
      page: [
        {
          id: 1,
          title: 'List A',
          data: [
            {
              content: 'List A - 1',
            },
            {
              content: 'List A - 2',
            },
          ],
        },
        {
          id: 2,
          title: 'List B',
          data: [
            {
              content: 'List B - 1',
            },
            {
              content: 'List B - 2',
            },
          ],
        },
      ],
    });

    $('.demo--menu').insertAdjacentHTML('afterbegin', result);
  };

  /**
   * Progressive Image Loader
   */
  const imageLoader = () => {
    const loaders = [
      {
        id: 1,
        src: 'images/mf.jpg',
        preview: 'images/mf_preview.jpg',
        alt: 'Lego Millennium Falcon',
        ratio: (346 / 600).toPrecision(10),
      },
      {
        id: 2,
        src: 'error.png',
        preview: 'images/mf_preview.jpg',
        alt: 'Lego Millennium Falcon',
        ratio: (346 / 600).toPrecision(10),
      },
    ];

    const result = Template.imageLoader({ loaders });

    $('.demo--image-loader').insertAdjacentHTML('afterbegin', result);
  };

  return {
    carousel,
    carouselLeft,
    carouselRight,
    panel,
    menu,
    imageLoader,
  };
};
