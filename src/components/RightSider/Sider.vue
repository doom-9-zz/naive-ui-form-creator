<script lang="ts" setup>
import { ref } from 'vue';
import { useStore } from 'vuex';

const initialState = {
  labelPlacement: 'left',
  labelWidth: '80',
  labelAlign: 'left',
  requiredFlag: true,
  size: 'medium',
  inlineFlag: false,
  showFeedbackFlag: true,
  showLabelFlag: true,
  requiredMarkPlacement: 'right',
};
const formValue = ref({
  labelPlacement: 'left',
  labelWidth: '80',
  labelAlign: 'left',
  requiredFlag: true,
  size: 'medium',
  inlineFlag: false,
  showFeedbackFlag: true,
  showLabelFlag: true,
  requiredMarkPlacement: 'right',
});

const store = useStore();
const handleApplyClick = () => {
  store.commit('changeFormConfig', formValue.value);
};
const handleResetClick = () => {
  formValue.value = initialState;
};
</script>
<template>
  <n-divider title-placement="left">配置</n-divider>
  <n-tabs type="segment">
    <n-tab-pane name="oasis" tab="表单项配置">Wonderwall</n-tab-pane>
    <n-tab-pane name="the beatles" tab="表单配置">
      <n-form>
        <n-form-item label="表单尺寸">
          <n-radio-group v-model:value="formValue.size">
            <n-space>
              <n-radio key="small" value="small">small</n-radio>
              <n-radio key="medium" value="medium">medium</n-radio>
              <n-radio key="large" value="large">large</n-radio>
            </n-space>
          </n-radio-group>
        </n-form-item>
        <n-form-item label="是否展示为行内表单">
          <n-switch v-model="formValue.inlineFlag"></n-switch>
        </n-form-item>
        <n-form-item label="标签位置">
          <n-radio-group v-model:value="formValue.labelPlacement">
            <n-space>
              <n-radio key="left" value="left">left</n-radio>
              <n-radio key="top" value="top">top</n-radio>
            </n-space>
          </n-radio-group>
        </n-form-item>
        <n-form-item label="标签宽度">
          <n-input v-model:value="formValue.labelWidth" type="text" placeholder="请输入标签宽度" />
        </n-form-item>
        <n-form-item label="标签对其方式">
          <n-radio-group v-model:value="formValue.labelAlign">
            <n-space>
              <n-radio key="left" value="left">left</n-radio>
              <n-radio key="right" value="right">right</n-radio>
            </n-space>
          </n-radio-group>
        </n-form-item>
        <n-form-item label="是否展示校验反馈">
          <n-switch v-model="formValue.showFeedbackFlag"></n-switch>
        </n-form-item>
        <n-form-item label="是否展示标签">
          <n-switch v-model="formValue.showLabelFlag"></n-switch>
        </n-form-item>
        <n-form-item label="是否显示必填标志">
          <n-switch v-model:value="formValue.requiredFlag" />
        </n-form-item>
        <n-form-item label="必填标志的位置">
          <n-radio-group v-model:value="formValue.requiredMarkPlacement">
            <n-space>
              <n-radio key="left" value="left">left</n-radio>
              <n-radio key="right" value="right">right</n-radio>
            </n-space>
          </n-radio-group>
        </n-form-item>
      </n-form>
      <n-button type="primary" @click="handleApplyClick">应用</n-button>
      <n-button type="warning" @click="handleResetClick">重置</n-button>
    </n-tab-pane>
  </n-tabs>
</template>
<style></style>
