import { onBeforeUnmount, onMounted } from 'vue';

export default function useDetectOutsideClick(component, callback) {
  if (!component) return;
  const listener = (event) => {
    console.log(event.target, component.value);
    if (event.target !== component.value && event.composedPath().includes(component.value)) {
      console.log('target');
      return;
    }
    if (typeof callback === 'function') {
      console.log('not target');
      callback();
    }
  };
  onMounted(() => {
    window.addEventListener('click', listener);
  });
  onBeforeUnmount(() => {
    window.removeEventListener('click', listener);
  });

  return { listener };
}
