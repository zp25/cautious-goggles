/**
 * menu索引聚焦到指定项
 * @return {Observer}
 */
function menuObserver() {
  const activeName = 'menu__anchor--active';

  const menu = document.querySelector(`.menu[data-group='${this.group}']`);

  return {
    /**
     * 导航区域样式切换
     * @param {Object} state - 状态
     * @param {string} state.page - 当期聚焦页
     * @ignore
     */
    update({
      page: currentPage,
    }) {
      const anchors = menu.querySelectorAll('.menu__anchor');

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

export default menuObserver;
