<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { useStore } from 'vuex';
import { getParentElementId } from '../../../utils/index';

const store = useStore();
let dragId: string | null = null;
const dropId = ref<string | null>(null);
const dropContainerElement = ref<HTMLDivElement | null>(null);

watchEffect(() => {
  if (dropContainerElement.value !== null) {
    const children = dropContainerElement.value.children;
    for (let i = 0; i < children.length; i++) {
      const child = children[i] as HTMLDivElement;
      if (child.id === dropId.value) {
        child.style.border = '1px dotted rgb(24, 160, 88)';
      } else {
        child.style.border = 'none';
      }
    }
  }
});

const handleDragOver = (e: DragEvent) => {
  let id = getParentElementId(e.target as HTMLElement);
  if (id !== null && dropId.value !== id) {
    dropId.value = id;
  }
};
const handleDragStart = (e: DragEvent) => {
  e.dataTransfer!.effectAllowed = 'move';
  let id = getParentElementId(e.target as HTMLElement);
  if (id !== null) {
    dragId = id;
  }
};

const handleDragEnd = () => {
  if (dragId !== null && dropId !== null) {
    store.commit('exchange', {
      id1: dragId,
      id2: dropId.value,
    });
    dragId = null;
    dropId.value = null;
  }
};
</script>
<template>
  <div
    @dragover.prevent="handleDragOver"
    @dragstart="handleDragStart"
    @dragend="handleDragEnd"
    ref="dropContainerElement"
  >
    <slot></slot>
  </div>
</template>
<style scoped></style>
