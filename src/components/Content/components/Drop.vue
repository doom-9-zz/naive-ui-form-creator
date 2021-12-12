<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useStore } from 'vuex';
import { getParentElement } from '../../../utils/index';

const store = useStore();
const dragId = ref<string | null>(null);
const dropId = ref<string | null>(null);
const dropContainerElement = ref<HTMLDivElement | null>(null);
const dragElement = ref<HTMLElement | null>(null);
const dropElement = ref<HTMLElement | null>(null);
const initDragElementDataIndex = ref<number>(0);

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
  if (
    dropContainerElement.value !== null &&
    dragElement.value !== null &&
    dropElement.value !== null
  ) {
    const { value: dropElementValue } = dropElement;
    const { value: dragElementValue } = dragElement;
    // 进入drop元素
    dropElementValue.setAttribute('data-dropenter', 'true');
    const dropDataIndex = Number(dropElementValue.getAttribute('data-index'));
    const dragDataIndex = Number(dragElementValue.getAttribute('data-index'));
    const downStr = `translateY(${dragElementValue.clientHeight + 15}px)`;
    const upStr = `translateY(-${dragElementValue.clientHeight + 15}px)`;

    // 往下拖动
    if (dropDataIndex > dragDataIndex) {
      const transformStr = (dropElementValue as HTMLDivElement).style.transform;

      if (transformStr === downStr) {
        (dropElementValue as HTMLDivElement).style.transform = `translateY(0px)`;
      } else {
        (dropElementValue as HTMLDivElement).style.transform = `translateY(-${
          dragElementValue.clientHeight + 15
        }px)`;
      }
    }

    // 往上拖动
    if (dropDataIndex < dragDataIndex) {
      const transformStr = (dropElementValue as HTMLDivElement).style.transform;

      if (transformStr === upStr) {
        (dropElementValue as HTMLDivElement).style.transform = `translateY(0px)`;
      } else {
        (dropElementValue as HTMLDivElement).style.transform = `translateY(${
          dragElementValue.clientHeight + 15
        }px)`;
      }
    }

    if (dragElementValue !== null) {
      dragElementValue.setAttribute('data-index', `${dropDataIndex}`);
      dropElementValue.setAttribute('data-index', `${dragDataIndex}`);
    }

    // 动画执行期间不希望执行拖动事件
    setTimeout(() => {
      dropElementValue.setAttribute('data-dropenter', 'false');
    }, 100);
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

    const isDropEnter = dropElement.value.dataset.dropenter === 'true';
    if (dropId.value !== dragId.value && !isDropEnter) {
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
    dragElement.value!.style.opacity = '0';
    initDragElementDataIndex.value = Number(dragElement.value.getAttribute('data-index'));
  }
};

const handleDragEnd = () => {
  if (
    dragId !== null &&
    dropId !== null &&
    dropId.value !== dragId.value &&
    dragElement.value !== null
  ) {
    handleResetTranslate();

    const nowDragDataIndex = Number(dragElement.value.getAttribute('data-index'));
    if (nowDragDataIndex === initDragElementDataIndex.value) return;

    if (initDragElementDataIndex.value > nowDragDataIndex) {
      store.commit('insertBefore', {
        from: dragId.value,
        to: dropId.value,
      });
    } else {
      store.commit('insertAfter', {
        from: dragId.value,
        to: dropId.value,
      });
    }

    dragId.value = null;
    dropId.value = null;
    dragElement.value = null;
    dropElement.value = null;
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
