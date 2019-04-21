/**
 * 控制modal开关
 * @return {Observer}
 * @this {Modal}
 */
function modalObserver() {
  const activeName = 'modal--active';

  const modal = document.querySelector(`.modal[data-group='${this.group}']`);

  return {
    /**
     * modal样式切换
     * @param {Object} state - 状态
     * @param {boolean} state.modal - 是否显示
     * @param {string} [state.dialog] - 需显示的dialog
     * @ignore
     */
    update({
      modal: visible,
    }) {
      if (visible) {
        modal.classList.add(activeName);
      } else {
        modal.classList.remove(activeName);
      }
    },
  };
}

/**
 * 控制dialog
 * @return {Observer}
 * @this {Modal}
 */
function dialogObserver() {
  const dialogActive = 'modal__dialog--active';

  const modal = document.querySelector(`.modal[data-group='${this.group}']`);

  return {
    /**
     * 判断是否存在dialog
     * @param {Object} state - 状态
     * @param {(boolean|string)} state.modal - modal是否显示
     * @throws {Error} 不存在匹配元素.modal__dialog--{name}
     */
    update({
      modal: visible,
      dialog,
    }) {
      modal.querySelectorAll(`.${dialogActive}`).forEach((d) => {
        d.classList.remove(dialogActive);
      });

      if (visible && dialog) {
        const dialogName = `modal__dialog--${dialog}`;

        modal.querySelector(`.${dialogName}`).classList.add(dialogActive);
      }
    },
  };
}

/**
 * 控制关闭按钮的显示
 * @return {Observer}
 * @this {Modal}
 */
function closeButtonObserver() {
  const activeName = 'close--active';

  const modal = document.querySelector(`.modal[data-group='${this.group}']`);

  return {
    update({
      modal: visible,
      dialog,
    }) {
      const closeBtn = modal.querySelector('.close');

      if (visible && dialog !== 'switching') {
        closeBtn.classList.add(activeName);
      } else {
        closeBtn.classList.remove(activeName);
      }
    },
  };
}

export {
  modalObserver,
  dialogObserver,
  closeButtonObserver,
};
