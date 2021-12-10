<script lang="ts" setup>
import FormConfig from './components/FormConfig/FormConfig.vue';
import InputFormItemConfig from './components/FormItemConfig/InputFormItemConfig.vue';
import CheckBoxFormItemConfig from './components/FormItemConfig/CheckBoxFormItemConfig.vue';
import ColorPickerFormItemConfig from './components/FormItemConfig/ColorPickerFormItemConfig.vue';
import RadioFormItemConfig from './components/FormItemConfig/RadioFormItemConfig.vue';
import RateFormItemConfig from './components/FormItemConfig/RateFormItemConfig.vue';
import SelectFormItemConfig from './components/FormItemConfig/SelectFormItemConfig.vue';
import SliderFormItemConfig from './components/FormItemConfig/SliderFormItemConfig.vue';
import SwitchFormItemConfig from './components/FormItemConfig/SwitchFormItemConfig.vue';
import TimePickerFormItemConfig from './components/FormItemConfig/TimePickerFormItemConfig.vue';
import TreeSelectFormItemConfig from './components/FormItemConfig/TreeSelectFormItemConfig.vue';
import UploadFormItemConfig from './components/FormItemConfig/UploadFormItemConfig.vue';
import InputNumberFormItemConfig from './components/FormItemConfig/InputNumberFormItemConfig.vue';
import DividerConfig from './components/FormItemConfig/DividerConfig.vue';
import { useStore } from 'vuex';
import { computed } from 'vue';
const store = useStore();
const selectedFormItemType = computed(() => {
  return store.state.selectedFormItemType;
});
const selectedFormItem = computed(() => {
  return store.state.selectedFormItem;
});
const formItemArrayLength = computed(() => {
  return store.getters.formItemArrayLength;
});
const handleAddClick = () => {
  store.commit('addAndSelect', {
    value: '0',
    label: '文本输入',
  });
};
const showComponent = computed(() => {
  switch (selectedFormItemType.value) {
    case '0':
      return InputFormItemConfig;
    case '1':
      return InputNumberFormItemConfig;
    case '2':
      return RadioFormItemConfig;
    case '3':
      return RateFormItemConfig;
    case '4':
      return SelectFormItemConfig;
    case '5':
      return SliderFormItemConfig;
    case '6':
      return SwitchFormItemConfig;
    case '7':
      return TimePickerFormItemConfig;
    case '8':
      return TreeSelectFormItemConfig;
    case '9':
      return UploadFormItemConfig;
    case '10':
      return ColorPickerFormItemConfig;
    case '11':
      return CheckBoxFormItemConfig;
    case '12':
      return DividerConfig;

    default:
      break;
  }
});

const tabsValue = computed(() => {
  return store.state.tabsValue;
});
const handleTabsChange = (val: 'form' | 'formItem') => {
  store.commit('changeTabsValue', val);
};
</script>
<template>
  <n-divider title-placement="left">配置</n-divider>
  <n-tabs type="segment" :value="tabsValue">
    <n-tab-pane name="formItem" tab="表单项配置" @click="handleTabsChange('formItem')">
      <n-empty
        description="从最左侧添加表单项"
        v-if="formItemArrayLength === 0 || selectedFormItemType === ''"
      >
        <template #extra>
          <n-button @click="handleAddClick">试着添加一个并且选中它</n-button>
        </template>
      </n-empty>
      <component v-else :is="showComponent" :key="selectedFormItem"></component>
    </n-tab-pane>
    <n-tab-pane name="form" tab="表单配置" @click="handleTabsChange('form')">
      <FormConfig />
    </n-tab-pane>
  </n-tabs>
</template>
<style></style>
