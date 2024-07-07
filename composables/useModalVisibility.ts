import { onClickOutside } from '@vueuse/core';
import type { Ref } from 'vue';
import { mergeObjects } from '~/helpers/objects';

interface IOptions {
  hideOnOutsideClick: boolean;
}

const baseOptions: Partial<IOptions> = {
  hideOnOutsideClick: true,
};

export default function useModalVisibility(
  elementRef: Ref<HTMLElement | undefined>,
  options: Partial<IOptions> = {},
) {
  const mergedOptions = mergeObjects(baseOptions, options);

  const isShow = ref(false);

  const showModal = () => {
    isShow.value = true;
  };

  const hideModal = () => {
    isShow.value = false;
  };

  onMounted(() => {
    if (mergedOptions.hideOnOutsideClick && elementRef) {
      onClickOutside(elementRef, hideModal);
    }
  });

  return {
    isShow,
    showModal,
    hideModal,
  };
}
