<template>
  <label class="app-toggle">
    <input 
      type="checkbox" 
      :checked="modelValue" 
      @change="$emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
    />
    <span class="slider"></span>
    <span class="label-text" v-if="label">{{ label }}</span>
  </label>
</template>

<script setup lang="ts">
defineProps<{ modelValue: boolean; label?: string; }>();
defineEmits(['update:modelValue']);
</script>

<style scoped>
.app-toggle { display: flex; align-items: center; gap: 10px; cursor: pointer; margin-bottom: 12px; }
.slider {
  width: 40px; height: 20px; background: #d1d5db; border-radius: 20px;
  position: relative; transition: 0.3s;
}
.slider:before {
  content: ""; position: absolute; height: 16px; width: 16px;
  left: 2px; bottom: 2px; background: white; border-radius: 50%; transition: 0.3s;
}
input:checked + .slider { background: #42b883; }
input:checked + .slider:before { transform: translateX(20px); }
input { display: none; }
.label-text { font-size: 14px; color: #374151; }
</style>