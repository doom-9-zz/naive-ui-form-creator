<script setup lang="ts">
import { ref, watch } from 'vue'
import { useStore } from 'vuex'
import { initialFormState } from '../../../../const/const'
import type { State } from '../../../../store/index'
import { copyPropertyValue } from '../../../../utils/index'

const formValue = ref<State['formConfig']>({
  ...initialFormState,
})
const store = useStore()
watch(
  formValue,
  () => {
    store.commit('changeFormConfig', formValue.value)
  },
  {
    deep: true,
  },
)
const handleResetClick = () => {
  Object.keys(initialFormState).forEach((key) => {
    copyPropertyValue(formValue.value, initialFormState, key as keyof State['formConfig'])
  })
}
</script>

<template>
  <n-form>
    <n-form-item :label="$t('model')">
      <n-input v-model:value="formValue.model" type="text" />
    </n-form-item>
    <n-form-item :label="$t('size')">
      <n-radio-group v-model:value="formValue.size">
        <n-space>
          <n-radio key="small" value="small">
            small
          </n-radio>
          <n-radio key="medium" value="medium">
            medium
          </n-radio>
          <n-radio key="large" value="large">
            large
          </n-radio>
        </n-space>
      </n-radio-group>
    </n-form-item>
    <n-form-item :label="$t('inline')">
      <n-switch v-model:value="formValue.inline" />
    </n-form-item>
    <n-form-item :label="$t('labelPlacement')">
      <n-radio-group v-model:value="formValue.labelPlacement">
        <n-space>
          <n-radio key="left" value="left">
            left
          </n-radio>
          <n-radio key="top" value="top">
            top
          </n-radio>
        </n-space>
      </n-radio-group>
    </n-form-item>
    <n-form-item :label="$t('labelWidth')">
      <n-input v-model:value="formValue.labelWidth" type="text" />
    </n-form-item>
    <n-form-item :label="$t('labelAlign')">
      <n-radio-group v-model:value="formValue.labelAlign">
        <n-space>
          <n-radio key="left" value="left">
            left
          </n-radio>
          <n-radio key="right" value="right">
            right
          </n-radio>
        </n-space>
      </n-radio-group>
    </n-form-item>
    <n-form-item :label="$t('showFeedback')">
      <n-switch v-model:value="formValue.showFeedback" />
    </n-form-item>
    <n-form-item :label="$t('showLabel')">
      <n-switch v-model:value="formValue.showLabel" />
    </n-form-item>
    <n-form-item :label="$t('showRequireMark')">
      <n-switch v-model:value="formValue.showRequireMark" />
    </n-form-item>
    <n-form-item :label="$t('requireMarkPlacement')">
      <n-radio-group v-model:value="formValue.requireMarkPlacement">
        <n-space>
          <n-radio key="left" value="left">
            left
          </n-radio>
          <n-radio key="right" value="right">
            right
          </n-radio>
        </n-space>
      </n-radio-group>
    </n-form-item>
  </n-form>
  <n-space>
    <n-button type="warning" @click="handleResetClick">
      {{ $t('reset') }}
    </n-button>
  </n-space>
</template>

<style></style>
