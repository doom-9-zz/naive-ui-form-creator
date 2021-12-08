<script setup lang="ts">
import { useStore } from 'vuex';
import { ref } from 'vue';
import { getParentElementId } from '../../../utils/index';

const store = useStore();
let dragged: HTMLDivElement | null = null;
let draggedParent = ref<HTMLDivElement | null>(null);
let dragOverId: string | null = '';

const dragOver = (e: DragEvent) => {
  e.preventDefault();
  e.stopPropagation();
  if (e.target !== null) {
    dragOverId = getParentElementId(e.target as HTMLElement);
    if (dragOverId !== null) {
      console.log(dragOverId);
    }
  }
};
const handleDragStart = (e: DragEvent) => {
  e.stopPropagation();
  if (e.target !== null) {
    dragged = e.target as HTMLDivElement;
  }
};

const handleDragEnd = (e: DragEvent) => {
  e.stopPropagation();
  if (dragged !== null) {
    draggedParent.value?.insertBefore(dragged, null);
    dragged = null;
  }
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
