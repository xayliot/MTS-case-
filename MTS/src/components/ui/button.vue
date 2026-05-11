<template>
  <button 
    class="app-button" 
    :class="[`app-button--${variant}`, { 'is-disabled': disabled }]" 
    :disabled="disabled"
    type="button"
    @click="$emit('click', $event)"
  >
    <slot>{{ label }}</slot>
  </button>
</template>

<script setup lang="ts">
interface Props {
  label?: string;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
}

withDefaults(defineProps<Props>(), {
  label: 'Кнопка',
  variant: 'primary',
  disabled: false,
});

defineEmits<{
  (e: 'click', event: MouseEvent): void;
}>();
</script>

<style scoped>
.app-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  
  padding: 12px 28px;
  font-size: 16px;
  font-weight: 600;
  font-family: inherit;
  
  border: none;
  border-radius: 10px;
  cursor: pointer;
  user-select: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.app-button:active:not(:disabled) {
  transform: translateY(1px);
}

.app-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  filter: grayscale(0.5);
}

.app-button--primary {
  background: #42b883;
  color: white;
}
.app-button--primary:hover:not(:disabled) {
  background: #33a06f;
  box-shadow: 0 4px 12px rgba(66, 184, 131, 0.3);
}

.app-button--secondary {
  background: white;
  color: #4a5568;
  border: 1px solid #e2e8f0;
}
.app-button--secondary:hover:not(:disabled) {
  background: #f8fafc;
  border-color: #cbd5e0;
}

.app-button--danger {
  background: #ef4444;
  color: white;
}
.app-button--danger:hover:not(:disabled) {
  background: #dc2626;
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
}
</style>