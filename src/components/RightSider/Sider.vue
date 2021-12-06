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
    default:
      break;
  }
});
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
      <!-- <keep-alive> -->
      <component :is="showComponent"></component>
      <!-- </keep-alive> -->
    </n-tab-pane>
    <n-tab-pane name="the beatles" tab="表单配置">
      <FormConfig />
    </n-tab-pane>
  </n-tabs>
</template>
<style></style>
