<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from 'vuex';
// import { initialFormState } from '../../../../const/const';
// import { State } from '../../../../store/index';
// import { copyPropertyValue } from '../../../../utils/index';

const formValue = ref({
  label: undefined,
  name: undefined,
  round: 'true',
  size: 'medium',
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
    <n-form-item label="开关大小">
      <n-radio-group v-model:value="formValue.size">
        <n-space>
          <n-radio :key="0" value="small">small</n-radio>
          <n-radio :key="1" value="medium">medium</n-radio>
          <n-radio :key="2" value="large">large</n-radio>
        </n-space>
      </n-radio-group>
    </n-form-item>
    <n-form-item label="是否为圆形按钮">
      <n-radio-group v-model:value="formValue.round">
        <n-space>
          <n-radio :key="0" value="true">是</n-radio>
          <n-radio :key="1" value="false">否</n-radio>
        </n-space>
      </n-radio-group>
    </n-form-item>
  </n-form>
  <n-space>
    <n-button type="primary" @click="handleApplyClick">应用</n-button>
  </n-space>
</template>
<style></style>
