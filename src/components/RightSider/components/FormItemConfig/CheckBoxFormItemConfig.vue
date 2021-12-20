<script setup lang="ts">
import { useStore } from 'vuex';
import { useConfig } from '../../../../utils/hook/useConfig';
import { ruleOptions } from '../../../../const/const';
import { inject } from 'vue';
import { appProvideKey } from '../../../../const/const';

const formValue = useConfig<{
  label: string | undefined;
  name: string | undefined;
  max: number | undefined;
  min: number | undefined;
  options: Array<{
    label: string;
    value: string;
  }>;
  rules: Array<string>;
}>({
  sync: false,
});
const onCreate = () => {
  return {
    label: '',
    value: '',
  };
};
const store = useStore();
const handleSubmit = () => {
  store.commit('changeSelectedFormItemConfig', formValue.value);
};

const appProvideConfig = inject(appProvideKey);
</script>

<template>
  <n-form>
    <n-form-item :label="$t('id', appProvideConfig?.local.value)">
      <n-input v-model:value="formValue.name" type="text" />
    </n-form-item>
    <n-form-item :label="$t('name', appProvideConfig?.local.value)">
      <n-input v-model:value="formValue.label" type="text" />
    </n-form-item>
    <n-form-item :label="$t('rules', appProvideConfig?.local.value)">
      <n-select v-model:value="formValue.rules" multiple :options="ruleOptions" />
    </n-form-item>
    <n-form-item :label="$t('maxSelect', appProvideConfig?.local.value)">
      <n-input-number v-model:value="formValue.max" />
    </n-form-item>
    <n-form-item :label="$t('minSelect', appProvideConfig?.local.value)">
      <n-input-number v-model:value="formValue.min" />
    </n-form-item>
    <n-form-item :label="$t('addOptions', appProvideConfig?.local.value)">
      <n-dynamic-input
        item-style="margin-bottom: 0;"
        v-model:value="formValue.options"
        :on-create="onCreate"
        #default="{ index, value }"
      >
        <div style="display: flex">
          <n-form-item :show-label="false">
            <n-input
              placeholder="Label"
              @keydown.enter.prevent
              v-model:value="formValue.options[index].label"
            />
          </n-form-item>
          <div style="height: 34px; line-height: 34px; margin: 0 8px">-</div>
          <n-form-item :show-label="false">
            <n-input
              placeholder="Value"
              @keydown.enter.prevent
              v-model:value="formValue.options[index].value"
            />
          </n-form-item>
        </div>
      </n-dynamic-input>
    </n-form-item>
    <n-button @click="handleSubmit" type="primary">
      {{ $t('apply', appProvideConfig?.local.value) }}
    </n-button>
  </n-form>
</template>
<style></style>
