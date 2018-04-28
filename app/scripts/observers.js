/**
 * carouselLite banner背景颜色切换观察者
 */
const backgroundObserver = () => ({
  update: (state) => {
    const color = ['blue', 'green', 'red'];
    const { focus } = state;

    console.log(`carouselLite background color: %c${color[focus - 1]}`, `color: ${color[focus - 1]};`);
  },
});

/**
 * carouselLite banner背景颜色切换次数观察者
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

export {
  backgroundObserver,
  counterObserver,
  dialogSwitchingObserver,
};
