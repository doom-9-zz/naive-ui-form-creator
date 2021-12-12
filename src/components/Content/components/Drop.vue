<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useStore } from 'vuex';
import { getParentElement } from '../../../utils/index';

const store = useStore();
let dragId = ref<string | null>(null);
const dropId = ref<string | null>(null);
const dropContainerElement = ref<HTMLDivElement | null>(null);
const dragElement = ref<HTMLElement | null>(null);
const dropElement = ref<HTMLElement | null>(null);

const config = { childList: true };
const callback = function (mutationsList: any) {
  for (let mutation of mutationsList) {
    if (mutation.type === 'childList') {
      if (dropContainerElement.value) {
        const children = Array.from(dropContainerElement.value.children);
        children.forEach((child, index) => {
          child.setAttribute('data-index', index.toString());
          child.setAttribute('data-dropenter', 'false');
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

const handleTranslate = () => {
  if (dropContainerElement.value !== null && dragElement.value !== null) {
    const children = Array.from(dropContainerElement.value.children);
    const index = children.findIndex(child => child.id === dropId.value);
    if (index === -1) return;
    const dropElement = children[index];
    dropElement.setAttribute('data-dropenter', 'true');

    const dropDataIndex = Number(dropElement.getAttribute('data-index'));
    const dragDataIndex = Number(dragElement.value.getAttribute('data-index'));

    if (dropDataIndex > dragDataIndex) {
      const transformStr = (dropElement as HTMLDivElement).style.transform;
      // 往下移动
      const str = `translateY(${dragElement.value.clientHeight + 15}px)`;
      if (transformStr === str) {
        (dropElement as HTMLDivElement).style.transform = `translateY(0px)`;
      } else {
        (dropElement as HTMLDivElement).style.transform = `translateY(-${
          dragElement.value.clientHeight + 15
        }px)`;
      }

      if (dragElement.value !== null) {
        dragElement.value.setAttribute('data-index', `${dropDataIndex}`);
        dropElement.setAttribute('data-index', `${dragDataIndex}`);
      }
      setTimeout(() => {
        dropElement.setAttribute('data-dropenter', 'false');
      }, 100);
    }
    if (dropDataIndex < dragDataIndex) {
      const transformStr = (dropElement as HTMLDivElement).style.transform;
      // 往上移动
      const str = `translateY(-${dragElement.value.clientHeight + 15}px)`;
      if (transformStr === str) {
        (dropElement as HTMLDivElement).style.transform = `translateY(0px)`;
      } else {
        (dropElement as HTMLDivElement).style.transform = `translateY(${
          dragElement.value.clientHeight + 15
        }px)`;
      }
      dragElement.value.setAttribute('data-index', `${dropDataIndex}`);
      dropElement.setAttribute('data-index', `${dragDataIndex}`);
      setTimeout(() => {
        dropElement.setAttribute('data-dropenter', 'false');
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
  if (ele !== null) {
    dropElement.value = ele;
    dropId.value = ele.id;
    console.log(dropElement.value.dataset);

    const isDropEnter = dropElement.value.dataset.dropenter === 'false';
    if (dropId.value !== dragId.value && isDropEnter) {
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
    dragElement.value.style.transform = `translateY(-99999px)`;
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
