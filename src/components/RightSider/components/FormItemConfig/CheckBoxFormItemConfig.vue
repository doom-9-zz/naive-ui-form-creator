<script setup lang="ts">
import { useStore } from 'vuex'
import { useConfig } from '../../../../utils/hook/useConfig'
import { ruleOptions } from '../../../../const/const'

const formValue = useConfig<{
  label: string | undefined
  name: string | undefined
  max: number | undefined
  min: number | undefined
  options: Array<{
    label: string
    value: string
  }>
  rules: Array<string>
}>({
  sync: false,
})
const onCreate = () => {
  return {
    label: '',
    value: '',
  }
}
const store = useStore()
const handleSubmit = () => {
  store.commit('changeSelectedFormItemConfig', formValue.value)
}
</script>

<template>
  <n-form>
    <n-form-item :label="$t('id')">
      <n-input v-model:value="formValue.name" type="text" />
    </n-form-item>
    <n-form-item :label="$t('name')">
      <n-input v-model:value="formValue.label" type="text" />
    </n-form-item>
    <n-form-item :label="$t('rules')">
      <n-select v-model:value="formValue.rules" multiple :options="ruleOptions" />
    </n-form-item>
    <n-form-item :label="$t('maxSelect')">
      <n-input-number v-model:value="formValue.max" />
    </n-form-item>
    <n-form-item :label="$t('minSelect')">
      <n-input-number v-model:value="formValue.min" />
    </n-form-item>
    <n-form-item :label="$t('addOptions')">
      <n-dynamic-input
        v-slot="{ index }"
        v-model:value="formValue.options"
        item-style="margin-bottom: 0;"
        :on-create="onCreate"
      >
        <div style="display: flex">
          <n-form-item :show-label="false">
            <n-input
              v-model:value="formValue.options[index].label"
              placeholder="Label"
              @keydown.enter.prevent
            />
          </n-form-item>
          <div style="height: 34px; line-height: 34px; margin: 0 8px">
            -
          </div>
          <n-form-item :show-label="false">
            <n-input
              v-model:value="formValue.options[index].value"
              placeholder="Value"
              @keydown.enter.prevent
            />
          </n-form-item>
        </div>
      </n-dynamic-input>
    </n-form-item>
    <n-button type="primary" @click="handleSubmit">
      {{ $t('apply') }}
    </n-button>
  </n-form>
</template>

<style></style>
