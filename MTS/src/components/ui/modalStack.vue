<template>
  <AppModal
    v-for="(modal, index) in modalStack"
    :key="modal.id"
    :modal="modal"
    :depth-index="index"
    @close="close"
  />
</template>

<script setup lang="ts">
import AppModal from './modal.vue';
import { useModal } from '@/composables/useModal';

const { modalStack, close } = useModal();
</script>