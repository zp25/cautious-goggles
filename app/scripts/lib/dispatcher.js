/**
 * 事件分发
 * @module dispatcher
 */

export default handlers => (e) => {
  const trigger = e.target.dataset.trigger;

  if (trigger && {}.hasOwnProperty.call(handlers, trigger)) {
    handlers[trigger](e);
  }
};
