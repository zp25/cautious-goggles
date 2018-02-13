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
            console.log(`图片加载失败: ${errSrc.join(', ')}`);
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
    mask,
    menu,
  } = components;

  /**
   * 轮播自定义导航
   */
  const customNav = (e) => {
    e.preventDefault();

    const reverse = e.target.dataset.reverse === 'true';
    carousel.play(reverse);
  };

  /**
   * mask panel显示提示消息
   * @param {string} [msg='prompt'] - 提示消息
   */
  const message = (msg) => {
    mask.prompt('message', msg);
  };

  /**
   * 启动loading
   */
  const loading = () => {
    mask.loading();
  };

  /**
   * mask panel提示消息效果
   */
  const prompt = () => {
    message('可填写3行提示信息，每行6字');
  };

  /**
   * mask panel切换效果
   */
  const switching = () => {
    mask.loading();

    setTimeout(() => {
      message('Loading结束');
    }, 1500);
  };

  /**
   * 关闭mask
   */
  const close = (e) => {
    e.preventDefault();

    mask.hide();
  };

  /**
   * 切换list
   */
  const switchList = (e) => {
    const { page } = e.target.dataset;

    if (menu.page !== page) {
      menu.open(page);
    }
  };

  /**
   * 取消默认动作
   */
  const prevent = (e) => {
    e.preventDefault();
  };

  return {
    customNav,
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
