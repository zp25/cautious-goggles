/**
 * carousel导航区域(jump)观察者
 */
function navObserver() {
  const btnActive = 'jump__btn--active';

  return {
    /**
     * nav样式切换
     * @param {Object} state - 状态
     * @param {number} state.focus - 聚焦页编号
     * @ignore
     */
    update: (state) => {
      const { focus } = state;

      Array.from(this.carousel.querySelectorAll('.jump__btn')).forEach((btn) => {
        const order = Number(btn.dataset.order);

        if (order === focus) {
          btn.classList.add(btnActive);
        } else {
          btn.classList.remove(btnActive);
        }
      });
    },
  };
}

/**
 * carouselLeft banner背景颜色切换观察者
 */
const backgroundObserver = () => ({
  update: (state) => {
    const color = ['blue', 'green', 'red'];
    const { focus } = state;

    console.log(`carouselLeft background color: %c${color[focus - 1]}`, `color: ${color[focus - 1]};`);
  },
});

/**
 * carouselLeft banner背景颜色切换次数观察者
 */
const counterObserver = (detach) => {
  let count = 0;

  return {
    update: () => {
      count += 1;

      if (count === 6) {
        const observerLeft = detach();

        console.log(`卸载backgroundObserver, 剩余observer数量: ${observerLeft}`);
      }
    },
  };
};

/**
 * modal dialog切换观察者，用于控制关闭按钮的显示
 */
const dialogSwitchingObserver = () => ({
  update: (state) => {
    const { hidden, panel } = state;

    const closeBtn = document.querySelector('.modal .close');
    const activeName = 'close--active';

    if (panel === 'switching' || hidden) {
      closeBtn.classList.remove(activeName);
    } else {
      closeBtn.classList.add(activeName);
    }
  },
});

/**
 * menu观察者
 * @param {Array.<Element>} anchors - Menu组件导航区域
 * @return {Observer}
 */
function menuObserver() {
  const activeName = 'menu__anchor--active';

  return {
    /**
     * 导航区域样式切换
     * @param {Object} state - 状态
     * @param {string} state.page - 当期聚焦页
     * @ignore
     */
    update: (state) => {
      const { page: currentPage } = state;

      const anchors = this.members()[0].querySelectorAll('.menu__anchor');

      anchors.forEach((anchor) => {
        const { page } = anchor.dataset;

        if (page === currentPage) {
          anchor.classList.add(activeName);
        } else {
          anchor.classList.remove(activeName);
        }
      });
    },
  };
}

export {
  navObserver,
  backgroundObserver,
  counterObserver,
  dialogSwitchingObserver,
  menuObserver,
};
