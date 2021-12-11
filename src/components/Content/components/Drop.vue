<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useStore } from 'vuex';
import { getParentElement } from '../../../utils/index';

const store = useStore();
let dragId = ref<string | null>(null);
const dropId = ref<string | null>(null);
const dropContainerElement = ref<HTMLDivElement | null>(null);
const dragElement = ref<HTMLElement | null>(null);
let canRun = true;

const config = { childList: true };
const callback = function (mutationsList: any) {
  for (let mutation of mutationsList) {
    if (mutation.type === 'childList') {
      if (dropContainerElement.value) {
        const children = Array.from(dropContainerElement.value.children);
        children.forEach((child, index) => {
          child.setAttribute('data-index', index.toString());
        });
      }
    }
  }
};
const observer = new MutationObserver(callback);
onMounted(() => {
  if (dropContainerElement.value) {
    observer.observe(dropContainerElement.value, config);
  }
});
onUnmounted(() => {
  observer.disconnect();
});

if (dropContainerElement.value !== null) {
  const children = Array.from(dropContainerElement.value.children);
  children.forEach((child, index) => {
    child.setAttribute('data-index', index.toString());
  });
}

const handleTranslate = () => {
  if (dropContainerElement.value !== null && dragElement.value !== null) {
    const children = Array.from(dropContainerElement.value.children);
    const index = children.findIndex(child => child.id === dropId.value);
    if (index === -1) return;
    const dropElement = children[index];
    const dropDataIndex = Number(dropElement.getAttribute('data-index'));
    const dragDataIndex = Number(dragElement.value.getAttribute('data-index'));

    if (dropDataIndex > dragDataIndex) {
      canRun = false;
      const transformStr = (dropElement as HTMLDivElement).style.transform;
      const str = `translateY(${dragElement.value.clientHeight + 15}px)`;
      if (transformStr === str) {
        (dropElement as HTMLDivElement).style.transform = `translateY(0px)`;
      } else {
        (dropElement as HTMLDivElement).style.transform = `translateY(-${
          dragElement.value.clientHeight + 15
        }px)`;
      }
      setTimeout(() => {
        if (dragElement.value !== null) {
          dragElement.value.setAttribute('data-index', `${dropDataIndex}`);
          dropElement.setAttribute('data-index', `${dragDataIndex}`);
          canRun = true;
        }
      }, 100);
    }
    if (dropDataIndex < dragDataIndex) {
      canRun = false;
      const transformStr = (dropElement as HTMLDivElement).style.transform;
      const str = `translateY(-${dragElement.value.clientHeight + 15}px)`;

      if (transformStr === str) {
        (dropElement as HTMLDivElement).style.transform = `translateY(0px)`;
      } else {
        (dropElement as HTMLDivElement).style.transform = `translateY(${
          dragElement.value.clientHeight + 15
        }px)`;
      }
      setTimeout(() => {
        if (dragElement.value !== null) {
          dragElement.value.setAttribute('data-index', `${dropDataIndex}`);
          dropElement.setAttribute('data-index', `${dragDataIndex}`);
          canRun = true;
        }
      }, 100);
    }
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
  let ele = getParentElement(e.target as HTMLElement);
  if (ele !== null && canRun) {
    dropId.value = ele.id;
    handleTranslate();
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
