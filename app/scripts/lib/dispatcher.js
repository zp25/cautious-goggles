/**
 * 事件分发
 * @module dispatcher
 */

export default handlers => (e) => {
  const { trigger } = e.target.dataset;

  if (trigger && {}.hasOwnProperty.call(handlers, trigger)) {
    handlers[trigger](e);
  }
};
