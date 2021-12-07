<script setup lang="ts">
import { useStore } from 'vuex';
import { useConfig } from '../../../../utils/hook/useConfig';

const formValue = useConfig<{
  label: string | undefined;
  name: string | undefined;
  max: string | undefined;
  min: string | undefined;
  options: Array<{
    label: string;
    value: string;
  }>;
}>({
  label: undefined,
  name: undefined,
  max: undefined,
  min: undefined,
  options: [],
});
const store = useStore();
const handleApplyClick = () => {
  store.commit('changeSelectedFormItemConfig', formValue.value);
};
const onCreate = () => {
  return {
    label: '',
    value: '',
  };
};
</script>

<template>
  <n-form>
    <n-form-item label="字段标识">
      <n-input v-model:value="formValue.name" type="text" placeholder="请输入字段标识" />
    </n-form-item>
    <n-form-item label="字段名称">
      <n-input v-model:value="formValue.label" type="text" placeholder="请输入字段名称" />
    </n-form-item>
    <n-form-item label="可被勾选的 checkbox 的最大数量">
      <n-input v-model:value="formValue.max" type="text" placeholder="请输入最大数量" />
    </n-form-item>
    <n-form-item label="可被勾选的 checkbox 的最小数量">
      <n-input v-model:value="formValue.min" type="text" placeholder="请输入最小数量" />
    </n-form-item>
    <n-form-item label="添加选项">
      <n-dynamic-input
        item-style="margin-bottom: 0;"
        v-model:value="formValue.options"
        :on-create="onCreate"
        #default="{ index, value }"
      >
        <div style="display: flex">
          <n-form-item :show-label="false">
            <n-input
              placeholder="Label"
              @keydown.enter.prevent
              v-model:value="formValue.options[index].label"
            />
          </n-form-item>
          <div style="height: 34px; line-height: 34px; margin: 0 8px">-</div>
          <n-form-item :show-label="false">
            <n-input
              placeholder="Value"
              @keydown.enter.prevent
              v-model:value="formValue.options[index].value"
            />
          </n-form-item>
        </div>
      </n-dynamic-input>
    </n-form-item>
  </n-form>
  <n-space>
    <n-button type="primary" @click="handleApplyClick">应用</n-button>
  </n-space>
</template>
<style></style>
