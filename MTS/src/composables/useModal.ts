import { ref, computed } from 'vue';
import type { ModalInstance, ModalOptions } from '@/types/modal';

const modalStack = ref<ModalInstance[]>([]);

export function useModal() {
  const show = (options: ModalOptions) => {
    const activeElement = document.activeElement as HTMLElement;

    const instance: ModalInstance = {
      ...options,
      id: crypto.randomUUID(),
      returnFocusTo: activeElement,
    };

    modalStack.value.push(instance);
  };

  const close = () => {
    const closingModal = modalStack.value.pop();
    if (!closingModal) return;

    closingModal.onClose?.();

    if (closingModal.returnFocusTo) {
      const el = closingModal.returnFocusTo;
      setTimeout(() => el.focus?.(), 0);
    }
  };

  const closeAll = () => {
    const firstModal = modalStack.value[0];
    const returnEl = firstModal?.returnFocusTo;

    modalStack.value = [];
    
    if (returnEl) {
      setTimeout(() => returnEl.focus?.(), 0);
    }
  };

  const activeModal = computed(() => modalStack.value[modalStack.value.length - 1]);

  const closeTopModal = () => {
    const topModal = modalStack.value[modalStack.value.length - 1];
    if (topModal) {
      close();
    }
  };

  return {
    modalStack,
    activeModal,
    show,
    close,
    closeAll,
    closeTopModal,
  };
}