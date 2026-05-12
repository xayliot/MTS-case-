<template>
  <Teleport to="body">
    <Transition name="modal" @after-leave="onAfterLeave">
      <div 
        v-if="!isLeaving"
        class="modal-overlay" 
        :class="{ 'is-active': isTopModal }"
        :style="{ zIndex: 1000 + depthIndex }"
        @mousedown.self="handleOverlayClick"
      >
        <div 
          ref="modalRef"
          class="modal-container"
          :class="{ 'is-dragging': isDragging }"
          :style="dragStyles"
          role="dialog"
          aria-modal="true"
          :aria-labelledby="`modal-title-${modal.id}`"
          tabindex="-1"
        >
          <div 
            class="modal-header drag-handle"
            @mousedown="startDrag"
            @dblclick="resetPosition"
          >
            <h2 :id="`modal-title-${modal.id}`" class="modal-title">{{ modal.title }}</h2>
            <button 
              class="modal-close-btn" 
              @click="handleClose" 
              aria-label="Закрыть"
              title="Закрыть (Esc)"
            >×</button>
          </div>

          <div class="modal-body">
            <component :is="modal.body" v-if="typeof modal.body !== 'string'" />
            <div v-else class="modal-body-text">
              {{ modal.body }}
            </div>
          </div>

          <div class="modal-footer" v-if="modal.footer">
            <component :is="modal.footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick, computed, watch } from 'vue';
import type { ModalInstance } from '@/types/modal';
import { useModal } from '@/composables/useModal';

const props = defineProps<{
  modal: ModalInstance;
  depthIndex: number; 
}>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const { modalStack, closeTopModal } = useModal();
const modalRef = ref<HTMLElement | null>(null);
const isLeaving = ref(false);

const isDragging = ref(false);
const dragStart = ref({ x: 0, y: 0 });
const position = ref({ x: 0, y: 0 });

const isTopModal = computed(() => {
  const top = modalStack.value[modalStack.value.length - 1];
  return top?.id === props.modal.id;
});

const dragStyles = computed(() => {
  return {
    transform: `translate(${position.value.x}px, ${position.value.y}px)`,
    transition: isDragging.value ? 'none' : 'transform 0.2s ease',
    cursor: isDragging.value ? 'grabbing' : 'grab',
  };
});

const startDrag = (e: MouseEvent) => {
  if (!isTopModal.value) return;
  
  const target = e.target as HTMLElement;
  if (target.closest('.modal-close-btn')) return;
  
  e.preventDefault();
  isDragging.value = true;
  
  dragStart.value = {
    x: e.clientX - position.value.x,
    y: e.clientY - position.value.y,
  };
  
  document.addEventListener('mousemove', onDrag);
  document.addEventListener('mouseup', stopDrag);
};

const onDrag = (e: MouseEvent) => {
  if (!isDragging.value) return;
  
  const newX = e.clientX - dragStart.value.x;
  const newY = e.clientY - dragStart.value.y;
  
  position.value = {
    x: newX,
    y: newY,
  };
};

const stopDrag = () => {
  isDragging.value = false;
  document.removeEventListener('mousemove', onDrag);
  document.removeEventListener('mouseup', stopDrag);
};

const resetPosition = () => {
  if (!isTopModal.value) return;
  position.value = { x: 0, y: 0 };
};

const onClose = () => emit('close');

const handleClose = () => {
  if (isTopModal.value) {
    isLeaving.value = true;
  }
};

const onAfterLeave = () => {
  onClose();
};

const handleOverlayClick = () => {
  if (isTopModal.value) handleClose();
};

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && isTopModal.value) {
    e.preventDefault();
    handleClose();
    return;
  }
  
  if (e.key !== 'Tab' || !modalRef.value || !isTopModal.value) return;
  
  const focusableSelectors = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';
  const focusableElements = Array.from(modalRef.value.querySelectorAll(focusableSelectors)) as HTMLElement[];
  
  if (focusableElements.length === 0) return;

  const firstEl = focusableElements[0];
  const lastEl = focusableElements[focusableElements.length - 1];

  if (!firstEl || !lastEl) return;
  
  if (e.shiftKey) {
    if (document.activeElement === firstEl) {
      e.preventDefault();
      lastEl.focus();
    }
  } else {
    if (document.activeElement === lastEl) {
      e.preventDefault();
      firstEl.focus();
    }
  }
};

watch(isTopModal, (newVal, oldVal) => {
  if (newVal && !oldVal) {
    nextTick(() => {
      const focusableSelectors = 'button:not([disabled]), [tabindex]:not([tabindex="-1"]), a[href]';
      const firstFocusable = modalRef.value?.querySelector(focusableSelectors) as HTMLElement;
      
      if (firstFocusable) {
        firstFocusable.focus();
      } else {
        modalRef.value?.focus();
      }
    });
  }
});

onMounted(() => {
  document.addEventListener('keydown', handleKeydown);
  
  if (modalStack.value.length === 1) {
    document.body.style.overflow = 'hidden';
  }

  nextTick(() => {
    if (isTopModal.value) {
      const focusableSelectors = 'button:not([disabled]), [tabindex]:not([tabindex="-1"]), a[href]';
      const firstFocusable = modalRef.value?.querySelector(focusableSelectors) as HTMLElement;
      
      if (firstFocusable) {
        firstFocusable.focus();
      } else {
        modalRef.value?.focus();
      }
    }
  });
});

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeydown);
  document.removeEventListener('mousemove', onDrag);
  document.removeEventListener('mouseup', stopDrag);
  
  if (modalStack.value.length === 0) {
    document.body.style.overflow = '';
  }
});
</script>

<style scoped>

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
  padding: 20px;
  pointer-events: none;
}

.modal-overlay.is-active {
  background-color: rgba(0, 0, 0, 0.4);
  pointer-events: auto;
}

.modal-container {
  background: white;
  border-radius: 12px;
  width: 100%;
  max-width: 500px;
  margin: auto;
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - 40px);
  outline: none;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  position: relative;

}

.modal-container.is-dragging {
  cursor: grabbing;
  user-select: none;
  opacity: 0.95;
  transition: none;
}

.drag-handle {
  cursor: grab;
  user-select: none;
}

.drag-handle:active {
  cursor: grabbing;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  border-bottom: 1px solid #e5e7eb;
  flex-shrink: 0;
  cursor: grab;
}

.modal-title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  flex: 1;
}

.modal-close-btn {
  background: none;
  border: none;
  font-size: 24px;
  color: #6b7280;
  cursor: pointer;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  transition: all 0.2s;
  position: relative;
  z-index: 1;
}

.modal-close-btn:hover {
  background-color: #f3f4f6;
  color: #111827;
}

.modal-body {
  padding: 24px;
  overflow-y: auto;
  flex-grow: 1;
  color: #1f2937;
  cursor:auto;
}

.modal-body-text {
  line-height: 1.5;
}

.modal-footer {
  padding: 16px 24px;
  border-top: 1px solid #e5e7eb;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  flex-shrink: 0;
}

.modal-body img {
  max-width: 100%;
  height: auto;
  max-height: 180px;
  object-fit: cover;
}

</style>