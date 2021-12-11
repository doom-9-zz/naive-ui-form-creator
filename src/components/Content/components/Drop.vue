<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from 'vuex';
import { getParentElement } from '../../../utils/index';

const store = useStore();
let dragId = ref<string | null>(null);
const dropId = ref<string | null>(null);
const dropContainerElement = ref<HTMLDivElement | null>(null);
const dragElement = ref<HTMLElement | null>(null);
const preIndex = ref<number>(0);
let time = 0;

const handleTranslate = () => {
  if (dropContainerElement.value !== null && dragElement.value !== null) {
    const children = Array.from(dropContainerElement.value.children);
    const index = children.findIndex(child => child.id === dropId.value);
    if (index !== -1) {
      if (preIndex.value < index) {
        (children[index] as HTMLDivElement).style.transform = `translateY(-${
          dragElement.value.clientHeight + 15
        }px)`;
      } else {
        (children[index] as HTMLDivElement).style.transform = `translateY(0px)`;
      }
    }
    preIndex.value = index;
  }
};

const handleResetTranslate = () => {
  if (dropContainerElement.value !== null && dragElement.value !== null) {
    dragElement.value!.style.opacity = '1';
    const children = Array.from(dropContainerElement.value.children);
    children.forEach(child => {
      (child as HTMLDivElement).style.transform = `translateY(0px)`;
    });
  }
};

const handleDragOver = (e: DragEvent) => {
  let now = Date.now();
  if (now - time > 200) {
    time = now;
    let ele = getParentElement(e.target as HTMLElement);
    if (ele !== null) {
      dropId.value = ele.id;
      handleTranslate();
    }
  }
};
const handleDragStart = (e: DragEvent) => {
  e.dataTransfer!.effectAllowed = 'move';
  let ele = getParentElement(e.target as HTMLElement);
  if (ele !== null) {
    dragId.value = ele.id;
    dragElement.value = ele;
    dragElement.value.style.opacity = '0';
  }
};

const handleDragEnd = () => {
  if (dragId !== null && dropId !== null) {
    handleResetTranslate();
    store.commit('exchange', {
      id1: dragId.value,
      id2: dropId.value,
    });
    dragId.value = null;
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
