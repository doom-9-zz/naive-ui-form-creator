<script setup lang="ts">
import { useStore } from 'vuex';
import { getParentElementId } from '../../../utils/index';

const store = useStore();
let dragId: string | null = null;
let dropId: string | null = null;

const handleDragOver = (e: DragEvent) => {
  let id = getParentElementId(e.target as HTMLElement);
  if (id !== null && dropId !== id) {
    dropId = id;
  }
};
const handleDragStart = (e: DragEvent) => {
  let id = getParentElementId(e.target as HTMLElement);
  if (id !== null) {
    dragId = id;
  }
};

const handleDragEnd = (e: DragEvent) => {
  if (dragId !== null && dropId !== null) {
    store.commit('exchange', {
      id1: dragId,
      id2: dropId,
    });
  }
};
</script>
<template>
  <div @dragover.prevent="handleDragOver" @dragstart="handleDragStart" @dragend="handleDragEnd">
    <slot></slot>
  </div>
</template>
<style scoped></style>
