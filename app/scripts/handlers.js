const createHandler = ({ imageLoader }) => {
  // scroller节拍器，避免频繁操作
  let timer = NaN;

  const scroller = () => {
    timer = timer || setTimeout(() => {
      timer = NaN;

      requestAnimationFrame(() => {
        imageLoader.lazyload().then((data) => {
          const errSrc = data.filter(d => d.error).map(d => d.src);

          if (errSrc.length > 0) {
            console.log(`第二张图片将加载失败: ${errSrc.join(', ')}`);
          }
        });
      });
    }, 300);
  };

  return {
    scroller,
  };
};

const createClickHandler = (components) => {
  const {
    carousel,
    carouselRight,
    modal,
    menu,
  } = components;

  /**
   * 轮播自定义导航
   */
  const step = (e) => {
    e.preventDefault();

    const reverse = e.target.dataset.reverse === 'true';
    carousel.play(reverse);
  };

  const jump = (e) => {
    e.preventDefault();

    const next = Number(e.target.dataset.order);
    carousel.play(next);
  };

  const jumpLite = (e) => {
    e.preventDefault();

    const next = Number(e.target.dataset.order);
    carouselRight.play(next);
  };

  /**
   * modal dialog显示提示消息
   * @param {string} [msg='prompt'] - 提示消息
   */
  const message = (msg) => {
    modal.prompt('message', msg);
  };

  /**
   * 启动loading
   */
  const loading = () => {
    modal.loading();
  };

  /**
   * modal dialog提示消息效果
   */
  const prompt = () => {
    message('可填写3行提示信息，每行6字');
  };

  /**
   * modal dialog切换效果
   */
  const switching = () => {
    modal.prompt('switching');

    setTimeout(() => {
      message('Loading结束');
    }, 1500);
  };

  /**
   * 关闭modal
   */
  const close = (e) => {
    e.preventDefault();

    modal.close();
  };

  /**
   * 切换list
   */
  const switchList = (e) => {
    const { page } = e.target.dataset;
    const { page: currentPage } = menu.getState();

    if (currentPage !== page) {
      menu.update({ page });
    }
  };

  /**
   * 取消默认动作
   */
  const prevent = (e) => {
    e.preventDefault();
  };

  return {
    step,
    jump,
    jumpLite,
    loading,
    prompt,
    switching,
    close,
    switchList,
    prevent,
  };
};

export {
  createHandler,
  createClickHandler,
};
