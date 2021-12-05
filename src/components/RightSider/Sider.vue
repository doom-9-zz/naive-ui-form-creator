<script lang="ts" setup>
import FormConfig from './components/FormConfig/FormConfig.vue';
import InputFormItemConfig from './components/FormItemConfig/InputFormItemConfig.vue';
import { useStore } from 'vuex';
import { computed } from 'vue';
const store = useStore();
const selectedFormItemType = computed(() => {
  return store.state.selectedFormItemType;
});
const formItemArrayLength = computed(() => {
  return store.getters.formItemArrayLength;
});
const handleAddClick = () => {
  const id = store.commit('addAndSelect', {
    value: '0',
    label: '文本输入',
  });
};
</script>
<template>
  <n-divider title-placement="left">配置</n-divider>
  <n-tabs type="segment">
    <n-tab-pane name="oasis" tab="表单项配置">
      <n-empty
        description="从最左侧添加表单项"
        v-if="formItemArrayLength === 0 || selectedFormItemType === ''"
      >
        <template #extra>
          <n-button @click="handleAddClick">试着添加一个并且选中它</n-button>
        </template>
      </n-empty>
      <n-space>
        <InputFormItemConfig v-if="selectedFormItemType === '0'" />
      </n-space>
    </n-tab-pane>
    <n-tab-pane name="the beatles" tab="表单配置">
      <FormConfig />
    </n-tab-pane>
  </n-tabs>
</template>
<style></style>
