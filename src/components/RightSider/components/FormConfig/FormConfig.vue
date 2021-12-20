<script setup lang="ts">
import { inject, ref, watch } from 'vue';
import { useStore } from 'vuex';
import { initialFormState } from '../../../../const/const';
import { State } from '../../../../store/index';
import { copyPropertyValue } from '../../../../utils/index';
import { appProvideKey } from '../../../../const/const';

const formValue = ref<State['formConfig']>({
  ...initialFormState,
});
const store = useStore();
watch(
  formValue,
  () => {
    store.commit('changeFormConfig', formValue.value);
  },
  {
    deep: true,
  },
);
const handleResetClick = () => {
  Object.keys(initialFormState).forEach(key => {
    copyPropertyValue(formValue.value, initialFormState, key as keyof State['formConfig']);
  });
};

const appProvideConfig = inject(appProvideKey);
</script>

<template>
  <n-form>
    <n-form-item :label="$t('model', appProvideConfig?.local.value)">
      <n-input v-model:value="formValue.model" type="text" />
    </n-form-item>
    <n-form-item :label="$t('size', appProvideConfig?.local.value)">
      <n-radio-group v-model:value="formValue.size">
        <n-space>
          <n-radio key="small" value="small">small</n-radio>
          <n-radio key="medium" value="medium">medium</n-radio>
          <n-radio key="large" value="large">large</n-radio>
        </n-space>
      </n-radio-group>
    </n-form-item>
    <n-form-item :label="$t('inline', appProvideConfig?.local.value)">
      <n-switch v-model:value="formValue.inline"></n-switch>
    </n-form-item>
    <n-form-item :label="$t('labelPlacement', appProvideConfig?.local.value)">
      <n-radio-group v-model:value="formValue.labelPlacement">
        <n-space>
          <n-radio key="left" value="left">left</n-radio>
          <n-radio key="top" value="top">top</n-radio>
        </n-space>
      </n-radio-group>
    </n-form-item>
    <n-form-item :label="$t('labelWidth', appProvideConfig?.local.value)">
      <n-input v-model:value="formValue.labelWidth" type="text" />
    </n-form-item>
    <n-form-item :label="$t('labelAlign', appProvideConfig?.local.value)">
      <n-radio-group v-model:value="formValue.labelAlign">
        <n-space>
          <n-radio key="left" value="left">left</n-radio>
          <n-radio key="right" value="right">right</n-radio>
        </n-space>
      </n-radio-group>
    </n-form-item>
    <n-form-item :label="$t('showFeedback', appProvideConfig?.local.value)">
      <n-switch v-model:value="formValue.showFeedback"></n-switch>
    </n-form-item>
    <n-form-item :label="$t('showLabel', appProvideConfig?.local.value)">
      <n-switch v-model:value="formValue.showLabel"></n-switch>
    </n-form-item>
    <n-form-item :label="$t('showRequireMark', appProvideConfig?.local.value)">
      <n-switch v-model:value="formValue.showRequireMark" />
    </n-form-item>
    <n-form-item :label="$t('requireMarkPlacement', appProvideConfig?.local.value)">
      <n-radio-group v-model:value="formValue.requireMarkPlacement">
        <n-space>
          <n-radio key="left" value="left">left</n-radio>
          <n-radio key="right" value="right">right</n-radio>
        </n-space>
      </n-radio-group>
    </n-form-item>
  </n-form>
  <n-space>
    <n-button type="warning" @click="handleResetClick">
      {{ $t('reset', appProvideConfig?.local.value) }}
    </n-button>
  </n-space>
</template>
<style></style>
