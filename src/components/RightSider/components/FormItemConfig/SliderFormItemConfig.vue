<script setup lang="ts">
import { useStore } from 'vuex';
import { useConfig } from '../../../../utils/hook/useConfig';

const formValue = useConfig({
  label: undefined,
  name: undefined,
  max: undefined,
  min: undefined,
  step: '1',
  range: 'false',
  reverse: 'false',
  vertical: 'false',
  tooltip: 'false',
});
const store = useStore();
const handleApplyClick = () => {
  store.commit('changeSelectedFormItemConfig', formValue.value);
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
    <n-form-item label="是否选择范围值">
      <n-radio-group v-model:value="formValue.range">
        <n-space>
          <n-radio :key="0" value="true">是</n-radio>
          <n-radio :key="1" value="false">否</n-radio>
        </n-space>
      </n-radio-group>
    </n-form-item>
    <n-form-item label="是否倒转轨道">
      <n-radio-group v-model:value="formValue.reverse">
        <n-space>
          <n-radio :key="0" value="true">是</n-radio>
          <n-radio :key="1" value="false">否</n-radio>
        </n-space>
      </n-radio-group>
    </n-form-item>
    <n-form-item label="是否启用垂直模式">
      <n-radio-group v-model:value="formValue.vertical">
        <n-space>
          <n-radio :key="0" value="true">是</n-radio>
          <n-radio :key="1" value="false">否</n-radio>
        </n-space>
      </n-radio-group>
    </n-form-item>
    <n-form-item label="是否展示 tooltip">
      <n-radio-group v-model:value="formValue.tooltip">
        <n-space>
          <n-radio :key="0" value="true">是</n-radio>
          <n-radio :key="1" value="false">否</n-radio>
        </n-space>
      </n-radio-group>
    </n-form-item>
    <n-form-item label="最大值">
      <n-input v-model:value="formValue.max" type="text" placeholder="请输入最大值" />
    </n-form-item>
    <n-form-item label="最小值">
      <n-input v-model:value="formValue.min" type="text" placeholder="请输入最小值" />
    </n-form-item>
    <n-form-item label="步长">
      <n-input v-model:value="formValue.step" type="text" placeholder="请输入步长" />
    </n-form-item>
  </n-form>
  <n-space>
    <n-button type="primary" @click="handleApplyClick">应用</n-button>
  </n-space>
</template>
<style></style>
