export default {
  beforeMount(el, binding) {
    el.clickOutsideEvent = (event) => {
      // Проверяем, был ли клик вне элемента и его потомков
      if (!(el === event.target || el.contains(event.target))) {
        binding.value(event);
      }
    };
    document.body.addEventListener('click', el.clickOutsideEvent);
  },
  unmounted(el) {
    document.body.removeEventListener('click', el.clickOutsideEvent);
  },
}
