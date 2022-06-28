<script lang="ts" setup>
import { useStore } from 'vuex'
import { computed } from 'vue'
import FormConfig from './components/FormConfig/FormConfig.vue'
import InputFormItemConfig from './components/FormItemConfig/InputFormItemConfig.vue'
import CheckBoxFormItemConfig from './components/FormItemConfig/CheckBoxFormItemConfig.vue'
import ColorPickerFormItemConfig from './components/FormItemConfig/ColorPickerFormItemConfig.vue'
import RadioFormItemConfig from './components/FormItemConfig/RadioFormItemConfig.vue'
import RateFormItemConfig from './components/FormItemConfig/RateFormItemConfig.vue'
import SelectFormItemConfig from './components/FormItemConfig/SelectFormItemConfig.vue'
import SliderFormItemConfig from './components/FormItemConfig/SliderFormItemConfig.vue'
import SwitchFormItemConfig from './components/FormItemConfig/SwitchFormItemConfig.vue'
import TimePickerFormItemConfig from './components/FormItemConfig/TimePickerFormItemConfig.vue'
import DatePickerFormItemConfig from './components/FormItemConfig/DatePickerFormItemConfig.vue'
import TreeSelectFormItemConfig from './components/FormItemConfig/TreeSelectFormItemConfig.vue'
import UploadFormItemConfig from './components/FormItemConfig/UploadFormItemConfig.vue'
import InputNumberFormItemConfig from './components/FormItemConfig/InputNumberFormItemConfig.vue'
import DividerConfig from './components/FormItemConfig/DividerConfig.vue'

const store = useStore()
const selectedFormItemType = computed(() => {
  return store.state.selectedFormItemType
})
const selectedFormItem = computed(() => {
  return store.state.selectedFormItem
})
const formItemArrayLength = computed(() => {
  return store.getters.formItemArrayLength
})
const handleAddClick = () => {
  store.commit('addAndSelect', {
    value: '0',
  })
}
const showComponent = computed(() => {
  switch (selectedFormItemType.value) {
    case '0':
      return InputFormItemConfig
    case '1':
      return InputNumberFormItemConfig
    case '2':
      return RadioFormItemConfig
    case '3':
      return RateFormItemConfig
    case '4':
      return SelectFormItemConfig
    case '5':
      return SliderFormItemConfig
    case '6':
      return SwitchFormItemConfig
    case '7':
      return TimePickerFormItemConfig
    case '8':
      return TreeSelectFormItemConfig
    case '9':
      return UploadFormItemConfig
    case '10':
      return ColorPickerFormItemConfig
    case '11':
      return CheckBoxFormItemConfig
    case '12':
      return DatePickerFormItemConfig
    case '13':
      return DividerConfig
    default:
      return ''
  }
})

const tabsValue = computed(() => {
  return store.state.tabsValue
})
const handleTabsChange = (val: 'form' | 'formItem') => {
  store.commit('changeTabsValue', val)
}
</script>

<template>
  <n-divider title-placement="left">
    {{ $t('setUp') }}
  </n-divider>
  <n-tabs type="segment" :value="tabsValue" @update:value="handleTabsChange">
    <n-tab-pane name="formItem" :tab="$t('formItemConfiguration')">
      <n-empty
        v-if="formItemArrayLength === 0 || selectedFormItemType === ''"
        :description="$t('addFormItem')"
      >
        <template #extra>
          <n-button @click="handleAddClick">
            {{ $t('addFormItemAndSelect') }}
          </n-button>
        </template>
      </n-empty>
      <component :is="showComponent" v-else :key="selectedFormItem" />
    </n-tab-pane>
    <n-tab-pane name="form" :tab="$t('formConfiguration')">
      <FormConfig />
    </n-tab-pane>
  </n-tabs>
</template>

<style></style>
