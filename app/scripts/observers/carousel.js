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

    console.log(
      `carouselLeft background color: %c${color[focus - 1]}`,
      `color: ${color[focus - 1]};`,
    );
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
        const num = detach();

        console.log(`卸载backgroundObserver, 剩余observer数量: ${num}`);
      }
    },
  };
};

export {
  navObserver,
  backgroundObserver,
  counterObserver,
};
