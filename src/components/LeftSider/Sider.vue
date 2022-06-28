<script setup lang="ts">
import { useStore } from 'vuex'
import { useMessage } from 'naive-ui'
import { LayoutOptions, options } from '../../const/const'

const store = useStore()
window.$message = useMessage()
const handleAddClick = (value: string) => {
  store.commit('add', {
    value,
  })
}
const handleLayoutAddClick = (value: string) => {
  store.commit('add', {
    value,
  })
}
</script>

<template>
  <n-space vertical>
    <n-divider title-placement="center">
      {{ $t('formComponent') }}
    </n-divider>
    <n-button
      v-for="item in options"
      :key="item.value"
      type="primary"
      size="large"
      @click="handleAddClick(item.value)"
    >
      {{ $t(item.formItemConfig.label) }}
    </n-button>
    <n-divider title-placement="center">
      {{ $t('layoutComponent') }}
    </n-divider>
    <n-button
      v-for="item in LayoutOptions"
      :key="item.value"
      type="warning"
      size="large"
      @click="handleLayoutAddClick(item.value)"
    >
      {{ $t(item.formItemConfig.label) }}
    </n-button>
  </n-space>
</template>

<style></style>
