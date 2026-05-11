<template>
  <div class="app-textarea-wrapper">
    <label v-if="label" class="app-label">{{ label }}</label>
    <textarea
      :value="modelValue"
      :placeholder="placeholder"
      :rows="rows"
      class="app-textarea"
      @input="handleInput"
    ></textarea>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: string;
  label?: string;
  placeholder?: string;
  rows?: number;
}

defineProps<Props>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const handleInput = (e: Event) => {
  const target = e.target as HTMLTextAreaElement;
  emit('update:modelValue', target.value);
};
</script>

<style scoped>
.app-textarea-wrapper {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
}

.app-label {
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  text-align: left;
}

.app-textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-family: inherit;
  font-size: 16px;
  line-height: 1.5;
  resize: vertical;
  transition: border-color 0.2s, box-shadow 0.2s;
  background: white;
  color: #1f2937;
}

.app-textarea:focus {
  outline: none;
  border-color: #42b883;
  box-shadow: 0 0 0 3px rgba(66, 184, 131, 0.1);
}

.app-textarea::placeholder {
  color: #9ca3af;
}
</style>