<template>
  <div class="app-field">
    <label v-if="label" class="app-label">{{ label }}</label>
    <input
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      class="app-input"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string | number;
  label?: string;
  type?: string;
  placeholder?: string;
}>();

defineEmits(['update:modelValue']);
</script>

<style scoped>
.app-field { margin-bottom: 16px; width: 100%; text-align: left; }
.app-label { display: block; font-size: 14px; font-weight: 500; margin-bottom: 6px; color: #374151; }
.app-input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.2s;
  outline: none;
}
.app-input:focus { border-color: #42b883; }
</style>