<script setup lang="ts">
import { useStore } from 'vuex';
import { getParentElementId } from '../../../utils/index';

const store = useStore();
let dragId: string | null = '';
let dropId: string | null = '';

const dragOver = (e: DragEvent) => {
  e.preventDefault();
  e.stopPropagation();
  if (e.target !== null) {
    let id = getParentElementId(e.target as HTMLElement);
    if (dropId !== id) {
      dropId = id;
      store.commit('exchange', {
        id1: dragId,
        id2: dropId,
      });
    }
  }
};
const handleDragStart = (e: DragEvent) => {
  e.stopPropagation();
  if (e.target !== null) {
    dragId = getParentElementId(e.target as HTMLDivElement);
  }
};
</script>
<template>
  <div @dragover="dragOver" @dragstart="handleDragStart">
    <slot></slot>
  </div>
</template>
<style scoped></style>
