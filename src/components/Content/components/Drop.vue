<script setup lang="ts">
import { useStore } from 'vuex';
import { ref } from 'vue';
import { getParentElementId } from '../../../utils/index';

const store = useStore();
let dragged: HTMLDivElement | null = null;
let draggedParent = ref<HTMLDivElement | null>(null);
let dragId: string | null = '';
let dropId: string | null = '';

const dragOver = (e: DragEvent) => {
  e.preventDefault();
  e.stopPropagation();
  if (e.target !== null) {
    dropId = getParentElementId(e.target as HTMLElement);
  }
};
const handleDragStart = (e: DragEvent) => {
  e.stopPropagation();
  if (e.target !== null) {
    dragId = getParentElementId(e.target as HTMLDivElement);
  }
};

const handleDragEnd = (e: DragEvent) => {
  e.stopPropagation();
  console.log({
    id1: dragId,
    id2: dropId,
  });

  store.commit('exchange', {
    id1: dragId,
    id2: dropId,
  });
};
</script>
<template>
  <div
    @dragover="dragOver"
    @dragstart="handleDragStart"
    @dragend="handleDragEnd"
    ref="draggedParent"
  >
    <slot></slot>
  </div>
</template>
<style scoped></style>
