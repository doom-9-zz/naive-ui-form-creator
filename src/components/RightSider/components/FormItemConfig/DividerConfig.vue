<script setup lang="ts">
import { useStore } from 'vuex';
import { useConfig } from '../../../../utils/hook/useConfig';

const formValue = useConfig({
  name: '虚线',
  dashed: false,
  vertical: false,
  titlePlacement: 'center',
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
    <n-form-item label="是否使用虚线分割">
      <n-radio-group v-model:value="formValue.dashed">
        <n-space>
          <n-radio :key="0" :value="true">是</n-radio>
          <n-radio :key="1" :value="false">否</n-radio>
        </n-space>
      </n-radio-group>
    </n-form-item>
    <n-form-item label="是否垂直分隔">
      <n-radio-group v-model:value="formValue.vertical">
        <n-space>
          <n-radio :key="0" :value="true">是</n-radio>
          <n-radio :key="1" :value="false">否</n-radio>
        </n-space>
      </n-radio-group>
    </n-form-item>
    <n-form-item label="标题的位置">
      <n-radio-group v-model:value="formValue.titlePlacement">
        <n-space>
          <n-radio :key="0" value="left">left</n-radio>
          <n-radio :key="2" value="center">center</n-radio>
          <n-radio :key="1" value="right">right</n-radio>
        </n-space>
      </n-radio-group>
    </n-form-item>
  </n-form>
  <n-space>
    <n-button type="primary" @click="handleApplyClick">应用</n-button>
  </n-space>
</template>
<style></style>
