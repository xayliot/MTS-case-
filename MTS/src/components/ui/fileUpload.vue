<template>
  <div class="file-upload">
    <label v-if="label" class="app-label">{{ label }}</label>
    <div class="upload-zone" @click="triggerClick">
      <span v-if="!fileName">Нажмите для выбора файла</span>
      <span v-else class="file-name">✅ {{ fileName }}</span>
      <input 
        ref="fileInput" 
        type="file" 
        hidden 
        @change="handleFile" 
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

defineProps<{ label?: string }>();
const fileInput = ref<HTMLInputElement | null>(null);
const fileName = ref('');

const triggerClick = () => {
  fileInput.value?.click();
};

const handleFile = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    fileName.value = file.name;
  }
};
</script>

<style scoped>
.upload-zone {
  border: 2px dashed #d1d5db;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  background: #f9fafb;
  transition: 0.2s;
}
.upload-zone:hover { border-color: #42b883; background: #f0fdf4; }
.file-name { color: #065f46; font-weight: 600; }
</style>