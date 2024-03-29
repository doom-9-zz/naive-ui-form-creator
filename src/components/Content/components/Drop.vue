<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useStore } from 'vuex'
import { getParentElement } from '../../../utils/index'

const margin = 15
const store = useStore()
const dragId = ref<string | null>(null)
const dropId = ref<string | null>(null)
const dropContainerElement = ref<HTMLDivElement | null>(null)
const dragElement = ref<HTMLElement | null>(null)
const dropElement = ref<HTMLElement | null>(null)
const initDragElementDataIndex = ref<number>(0)

const config = { childList: true }
const callback = function (mutationsList: any) {
  for (const mutation of mutationsList) {
    if (mutation.type === 'childList') {
      if (dropContainerElement.value) {
        const children = Array.from(dropContainerElement.value.children)
        children.forEach((child, index) => {
          child.setAttribute('data-index', index.toString())
          child.setAttribute('data-dropenter', 'false')
        })
      }
    }
  }
}
const observer = new MutationObserver(callback)
onMounted(() => {
  if (dropContainerElement.value)
    observer.observe(dropContainerElement.value, config)
})
onUnmounted(() => {
  observer.disconnect()
})

const handleTranslate = () => {
  if (
    dropContainerElement.value !== null
    && dragElement.value !== null
    && dropElement.value !== null
  ) {
    const { value: dropElementValue } = dropElement
    const { value: dragElementValue } = dragElement
    // 进入drop元素
    dropElementValue.setAttribute('data-dropenter', 'true')
    const dropDataIndex = Number(dropElementValue.getAttribute('data-index'))
    const dragDataIndex = Number(dragElementValue.getAttribute('data-index'))
    const downStr = `translateY(${dragElementValue.clientHeight + margin}px)`
    const upStr = `translateY(-${dragElementValue.clientHeight + margin}px)`

    // 往下拖动
    if (dropDataIndex > dragDataIndex) {
      const transformStr = (dropElementValue as HTMLDivElement).style.transform

      if (transformStr === downStr)
        (dropElementValue as HTMLDivElement).style.transform = 'translateY(0px)'

      else
        (dropElementValue as HTMLDivElement).style.transform = upStr
    }

    // 往上拖动
    if (dropDataIndex < dragDataIndex) {
      const transformStr = (dropElementValue as HTMLDivElement).style.transform

      if (transformStr === upStr)
        (dropElementValue as HTMLDivElement).style.transform = 'translateY(0px)'

      else
        (dropElementValue as HTMLDivElement).style.transform = downStr
    }

    if (dragElementValue !== null) {
      dragElementValue.setAttribute('data-index', `${dropDataIndex}`)
      dropElementValue.setAttribute('data-index', `${dragDataIndex}`)
    }

    // 动画执行期间不希望执行拖动事件
    setTimeout(() => {
      dropElementValue.setAttribute('data-dropenter', 'false')
    }, 100)
  }
}

const handleDragOver = (e: DragEvent) => {
  const ele = getParentElement(e.target as HTMLElement)
  if (ele !== null) {
    dropElement.value = ele
    dropId.value = ele.id

    const isDropEnter = dropElement.value.dataset.dropenter === 'true'
    if (dropId.value !== dragId.value && !isDropEnter)
      handleTranslate()
  }
}
const handleDragStart = (e: DragEvent) => {
  e.dataTransfer!.effectAllowed = 'move'
  const ele = getParentElement(e.target as HTMLElement)
  if (ele !== null) {
    dragId.value = ele.id
    dragElement.value = ele
    dragElement.value!.style.visibility = 'hidden'
    initDragElementDataIndex.value = Number(dragElement.value.getAttribute('data-index'))
  }
}

const handleDragEnd = () => {
  if (dragId.value !== null && dropId.value !== null && dragElement.value !== null) {
    dragElement.value!.style.visibility = 'visible'
    const nowDragDataIndex = Number(dragElement.value.getAttribute('data-index'))
    if (nowDragDataIndex === initDragElementDataIndex.value)
      return

    store.commit('insertDrop', {
      from: initDragElementDataIndex.value,
      to: nowDragDataIndex,
    })

    dragId.value = null
    dropId.value = null
    dragElement.value = null
    dropElement.value = null
  }
}
</script>

<template>
  <div
    ref="dropContainerElement"
    @dragover.prevent="handleDragOver"
    @dragstart="handleDragStart"
    @dragend="handleDragEnd"
  >
    <slot />
  </div>
</template>

<style scoped></style>
