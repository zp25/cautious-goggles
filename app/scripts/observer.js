/**
 * carouselLite banner背景颜色切换观察者
 */
const backgroundObserver = () => ({
  update: (state) => {
    const color = ['blue', 'green', 'red'];
    const { next } = state;

    console.log(`carouselLite background color: ${color[next - 1]}`); // eslint-disable-line no-console
  },
});

/**
 * panel切换观察者，用于控制关闭按钮的显示
 */
const panelSwitchingObserver = () => ({
  update: (state) => {
    const { hidden, panel } = state;

    const closeBtn = document.querySelector('.app--mask .close');
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
  panelSwitchingObserver,
};
